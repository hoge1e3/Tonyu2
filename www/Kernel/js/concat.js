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
  decls: {"methods":{"main":{"nowait":false},"callEventHandler":{"nowait":false}},"fields":{"target":{}}}
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
  decls: {"methods":{"main":{"nowait":false},"initEventMod":{"nowait":true},"releaseEventMod":{"nowait":true},"parseArgs":{"nowait":true},"registerEventHandler":{"nowait":true},"getEventHandler":{"nowait":true},"getOrRegisterEventHandler":{"nowait":true},"on":{"nowait":true},"fireEvent":{"nowait":true},"sendEvent":{"nowait":true},"waitEvent":{"nowait":false},"waitFor":{"nowait":false}},"fields":{"_eventHandlers":{}}}
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
    fillRect :function _trc_OneframeSpriteMod_fillRect(x,y,w,h,col,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000353;//kernel.OneframeSpriteMod:353
      _this.appear(Tonyu.classes.kernel.T1Rect,{x: x,y: y,w: w,h: h,col: col,zOrder: zOrder,owner: _this});
    },
    drawSprite :function _trc_OneframeSpriteMod_drawSprite(x,y,p,f,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000450;//kernel.OneframeSpriteMod:450
      _this.drawDxSprite(x,y,p,f,zOrder,0,255,1,1);
    },
    drawDxSprite :function _trc_OneframeSpriteMod_drawDxSprite(x,y,p,f,zOrder,angle,alpha,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000564;//kernel.OneframeSpriteMod:564
      _this.appear(Tonyu.classes.kernel.T1Sprite,{x: x,y: y,p: p,f: f,zOrder: zOrder,angle: angle,alpha: alpha,scaleX: scaleX,scaleY: scaleY,owner: _this});
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true},"fillRect":{"nowait":true},"drawSprite":{"nowait":true},"drawDxSprite":{"nowait":true}},"fields":{"appear":{}}}
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
  decls: {"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}},"fields":{}}
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
  decls: {"methods":{"main":{"nowait":false},"bvec":{"nowait":false},"defv":{"nowait":false}},"fields":{"scale":{}}}
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
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}},"fields":{}}
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
  decls: {"methods":{"main":{"nowait":false},"isDeadThreadGroup":{"nowait":false},"setThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}},"fields":{"_isDeadThreadGroup":{},"_threadGroup":{},"tGrpObjectPoolAge":{}}}
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
            if (!(l.length>0)) { __pc=2     ; break; }
            {
              //$LASTPOS=7000244;//kernel.InputDevice:244
              (l.shift())();
            }
            __pc=1;break;
          case 2     :
            
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
    newTouch :function _trc_InputDevice_newTouch(i) {
      "use strict";
      var _this=this;
      
      return {index: i,x: 0,y: 0,vx: 0,vy: 0,touched: 0,identifier: - 1,ended: false};
    },
    fiber$newTouch :function _trc_InputDevice_f_newTouch(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal={index: i,x: 0,y: 0,vx: 0,vy: 0,touched: 0,identifier: - 1,ended: false};return;
      
      
      _thread.retVal=_this;return;
    },
    initCanvasEvents :function _trc_InputDevice_initCanvasEvents(cvj) {
      "use strict";
      var _this=this;
      var cv;
      var ID_MOUSE;
      var i;
      var handleMouseDown;
      var handleMouseMove;
      var handleMouseUp;
      var handleTouchStart;
      var handleTouchMove;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=7000443;//kernel.InputDevice:443
      cv = cvj[0];
      
      //$LASTPOS=7000463;//kernel.InputDevice:463
      ID_MOUSE = 31238612;
      
      //$LASTPOS=7000491;//kernel.InputDevice:491
      Tonyu.globals.$handleMouseDown=(function anonymous_508(e) {
        var p;
        var mp;
        
        //$LASTPOS=7000524;//kernel.InputDevice:524
        p = cvj.offset();
        
        //$LASTPOS=7000553;//kernel.InputDevice:553
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7000630;//kernel.InputDevice:630
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7000702;//kernel.InputDevice:702
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7000725;//kernel.InputDevice:725
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7000748;//kernel.InputDevice:748
        _this.isMouseDown=true;
        //$LASTPOS=7000775;//kernel.InputDevice:775
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7000817;//kernel.InputDevice:817
          Tonyu.globals.$handleTouchStart({preventDefault: (function anonymous_869() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
        //$LASTPOS=7001184;//kernel.InputDevice:1184
        _this.handleListeners();
      });
      //$LASTPOS=7001216;//kernel.InputDevice:1216
      Tonyu.globals.$handleMouseMove=(function anonymous_1233(e) {
        var p;
        var mp;
        
        //$LASTPOS=7001249;//kernel.InputDevice:1249
        p = cvj.offset();
        
        //$LASTPOS=7001278;//kernel.InputDevice:1278
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7001355;//kernel.InputDevice:1355
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7001427;//kernel.InputDevice:1427
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7001450;//kernel.InputDevice:1450
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7001473;//kernel.InputDevice:1473
        if (_this.isMouseDown&&Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7001530;//kernel.InputDevice:1530
          Tonyu.globals.$handleTouchMove({preventDefault: (function anonymous_1581() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
        //$LASTPOS=7001896;//kernel.InputDevice:1896
        _this.handleListeners();
      });
      //$LASTPOS=7001983;//kernel.InputDevice:1983
      Tonyu.globals.$handleMouseUp=(function anonymous_1998(e) {
        
        //$LASTPOS=7002014;//kernel.InputDevice:2014
        _this.isMouseDown=false;
        //$LASTPOS=7002042;//kernel.InputDevice:2042
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7002084;//kernel.InputDevice:2084
          Tonyu.globals.$handleTouchEnd({preventDefault: (function anonymous_2134() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
      });
      //$LASTPOS=7002453;//kernel.InputDevice:2453
      Tonyu.globals.$touches=[];
      //$LASTPOS=7002471;//kernel.InputDevice:2471
      //$LASTPOS=7002476;//kernel.InputDevice:2476
      i = 0;
      for (; i<5 ; i++) {
        //$LASTPOS=7002492;//kernel.InputDevice:2492
        Tonyu.globals.$touches.push(_this.newTouch(i));
      }
      //$LASTPOS=7002525;//kernel.InputDevice:2525
      Tonyu.globals.$touches.findById=(function anonymous_2543(id) {
        var j;
        
        //$LASTPOS=7002560;//kernel.InputDevice:2560
        //$LASTPOS=7002565;//kernel.InputDevice:2565
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7002615;//kernel.InputDevice:2615
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7002725;//kernel.InputDevice:2725
      Tonyu.globals.$touches.findWithin=(function anonymous_2745(o,d) {
        var j;
        
        //$LASTPOS=7002771;//kernel.InputDevice:2771
        //$LASTPOS=7002776;//kernel.InputDevice:2776
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7002826;//kernel.InputDevice:2826
            if (o.within(Tonyu.globals.$touches[j],d)) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7002933;//kernel.InputDevice:2933
      Tonyu.globals.$handleTouchStart=(function anonymous_2951(e) {
        var p;
        var ts;
        var dst;
        var i;
        var src;
        var j;
        
        //$LASTPOS=7002967;//kernel.InputDevice:2967
        T2MediaLib.activate();
        //$LASTPOS=7002999;//kernel.InputDevice:2999
        p = cvj.offset();
        
        //$LASTPOS=7003028;//kernel.InputDevice:3028
        e.preventDefault();
        //$LASTPOS=7003057;//kernel.InputDevice:3057
        ts = e.originalEvent.changedTouches;
        
        
        //$LASTPOS=7003123;//kernel.InputDevice:3123
        //$LASTPOS=7003128;//kernel.InputDevice:3128
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7003173;//kernel.InputDevice:3173
            src = ts[i];
            
            //$LASTPOS=7003201;//kernel.InputDevice:3201
            //$LASTPOS=7003206;//kernel.InputDevice:3206
            j = 0;
            for (; j<Tonyu.globals.$touches.length ; j++) {
              {
                //$LASTPOS=7003260;//kernel.InputDevice:3260
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=7003309;//kernel.InputDevice:3309
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=7003347;//kernel.InputDevice:3347
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
            }
            //$LASTPOS=7003453;//kernel.InputDevice:3453
            if (dst) {
              //$LASTPOS=7003481;//kernel.InputDevice:3481
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7003562;//kernel.InputDevice:3562
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
              //$LASTPOS=7003641;//kernel.InputDevice:3641
              dst.px=dst.x=_this.mp.x;
              //$LASTPOS=7003677;//kernel.InputDevice:3677
              dst.py=dst.y=_this.mp.y;
              //$LASTPOS=7003713;//kernel.InputDevice:3713
              dst.touched=1;
              
            }
          }
        }
        //$LASTPOS=7003763;//kernel.InputDevice:3763
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7003795;//kernel.InputDevice:3795
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7003827;//kernel.InputDevice:3827
        _this.handleListeners();
      });
      //$LASTPOS=7003859;//kernel.InputDevice:3859
      Tonyu.globals.$handleTouchMove=(function anonymous_3876(e) {
        var p;
        var ts;
        var dst;
        var i;
        var src;
        
        //$LASTPOS=7003892;//kernel.InputDevice:3892
        T2MediaLib.activate();
        //$LASTPOS=7003924;//kernel.InputDevice:3924
        p = cvj.offset();
        
        //$LASTPOS=7003953;//kernel.InputDevice:3953
        e.preventDefault();
        //$LASTPOS=7003982;//kernel.InputDevice:3982
        ts = e.originalEvent.changedTouches;
        
        
        //$LASTPOS=7004048;//kernel.InputDevice:4048
        //$LASTPOS=7004053;//kernel.InputDevice:4053
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7004098;//kernel.InputDevice:4098
            src = ts[i];
            
            //$LASTPOS=7004126;//kernel.InputDevice:4126
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7004182;//kernel.InputDevice:4182
            if (dst) {
              //$LASTPOS=7004210;//kernel.InputDevice:4210
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7004291;//kernel.InputDevice:4291
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
              //$LASTPOS=7004370;//kernel.InputDevice:4370
              dst.x=_this.mp.x;
              //$LASTPOS=7004399;//kernel.InputDevice:4399
              dst.y=_this.mp.y;
              
            }
          }
        }
        //$LASTPOS=7004446;//kernel.InputDevice:4446
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7004478;//kernel.InputDevice:4478
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7004510;//kernel.InputDevice:4510
        _this.handleListeners();
      });
      //$LASTPOS=7004542;//kernel.InputDevice:4542
      Tonyu.globals.$handleTouchEnd=(function anonymous_4558(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=7004574;//kernel.InputDevice:4574
        T2MediaLib.activate();
        //$LASTPOS=7004606;//kernel.InputDevice:4606
        ts = e.originalEvent.changedTouches;
        
        //$LASTPOS=7004654;//kernel.InputDevice:4654
        //$LASTPOS=7004659;//kernel.InputDevice:4659
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7004704;//kernel.InputDevice:4704
            src = ts[i];
            
            //$LASTPOS=7004732;//kernel.InputDevice:4732
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7004788;//kernel.InputDevice:4788
            if (dst) {
              //$LASTPOS=7004816;//kernel.InputDevice:4816
              Tonyu.globals.$touches[dst.index]=Tonyu.globals.$InputDevice.newTouch(dst.index);
              //$LASTPOS=7004887;//kernel.InputDevice:4887
              Tonyu.globals.$touches[dst.index].x=dst.x;
              //$LASTPOS=7004933;//kernel.InputDevice:4933
              Tonyu.globals.$touches[dst.index].y=dst.y;
              //$LASTPOS=7004979;//kernel.InputDevice:4979
              dst.ended=true;
              
            }
          }
        }
        //$LASTPOS=7005136;//kernel.InputDevice:5136
        _this.handleListeners();
      });
      //$LASTPOS=7005168;//kernel.InputDevice:5168
      Tonyu.globals.$unsetTouchEmu=(function anonymous_5183() {
        var i;
        var t;
        var _it_67;
        
        //$LASTPOS=7005198;//kernel.InputDevice:5198
        Tonyu.globals.$InputDevice.touchEmu=false;
        //$LASTPOS=7005236;//kernel.InputDevice:5236
        _it_67=Tonyu.iterator(Tonyu.globals.$touches,2);
        while(_it_67.next()) {
          i=_it_67[0];
          t=_it_67[1];
          
          //$LASTPOS=7005277;//kernel.InputDevice:5277
          if (t.identifier==ID_MOUSE) {
            //$LASTPOS=7005324;//kernel.InputDevice:5324
            t[i]=Tonyu.globals.$InputDevice.newTouch(i);
            
          }
          
        }
      });
      //$LASTPOS=7005394;//kernel.InputDevice:5394
      handleMouseDown = (function anonymous_5414(e) {
        
        //$LASTPOS=7005419;//kernel.InputDevice:5419
        Tonyu.globals.$handleMouseDown(e);
      });
      
      //$LASTPOS=7005447;//kernel.InputDevice:5447
      handleMouseMove = (function anonymous_5467(e) {
        
        //$LASTPOS=7005472;//kernel.InputDevice:5472
        Tonyu.globals.$handleMouseMove(e);
      });
      
      //$LASTPOS=7005500;//kernel.InputDevice:5500
      handleMouseUp = (function anonymous_5518(e) {
        
        //$LASTPOS=7005523;//kernel.InputDevice:5523
        Tonyu.globals.$handleMouseUp(e);
      });
      
      //$LASTPOS=7005549;//kernel.InputDevice:5549
      handleTouchStart = (function anonymous_5570(e) {
        
        //$LASTPOS=7005575;//kernel.InputDevice:5575
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7005592;//kernel.InputDevice:5592
        Tonyu.globals.$handleTouchStart(e);
      });
      
      //$LASTPOS=7005621;//kernel.InputDevice:5621
      handleTouchMove = (function anonymous_5641(e) {
        
        //$LASTPOS=7005646;//kernel.InputDevice:5646
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7005663;//kernel.InputDevice:5663
        Tonyu.globals.$handleTouchMove(e);
      });
      
      //$LASTPOS=7005691;//kernel.InputDevice:5691
      handleTouchEnd = (function anonymous_5710(e) {
        
        //$LASTPOS=7005715;//kernel.InputDevice:5715
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7005732;//kernel.InputDevice:5732
        Tonyu.globals.$handleTouchEnd(e);
      });
      
      //$LASTPOS=7005759;//kernel.InputDevice:5759
      d = $.data(cv,"events");
      
      //$LASTPOS=7005791;//kernel.InputDevice:5791
      if (! d) {
        //$LASTPOS=7005810;//kernel.InputDevice:5810
        $.data(cv,"events","true");
        //$LASTPOS=7005847;//kernel.InputDevice:5847
        cvj.mousedown(handleMouseDown);
        //$LASTPOS=7005888;//kernel.InputDevice:5888
        cvj.mousemove(handleMouseMove);
        //$LASTPOS=7005929;//kernel.InputDevice:5929
        cvj.mouseup(handleMouseUp);
        //$LASTPOS=7005966;//kernel.InputDevice:5966
        cvj.on("touchstart",handleTouchStart);
        //$LASTPOS=7006014;//kernel.InputDevice:6014
        cvj.on("touchmove",handleTouchMove);
        //$LASTPOS=7006060;//kernel.InputDevice:6060
        cvj.on("touchend",handleTouchEnd);
        
      }
    },
    fiber$initCanvasEvents :function _trc_InputDevice_f_initCanvasEvents(_thread,cvj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cv;
      var ID_MOUSE;
      var i;
      var handleMouseDown;
      var handleMouseMove;
      var handleMouseUp;
      var handleTouchStart;
      var handleTouchMove;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=7000443;//kernel.InputDevice:443
      cv = cvj[0];
      
      //$LASTPOS=7000463;//kernel.InputDevice:463
      ID_MOUSE = 31238612;
      
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000491;//kernel.InputDevice:491
            Tonyu.globals.$handleMouseDown=(function anonymous_508(e) {
              var p;
              var mp;
              
              //$LASTPOS=7000524;//kernel.InputDevice:524
              p = cvj.offset();
              
              //$LASTPOS=7000553;//kernel.InputDevice:553
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7000630;//kernel.InputDevice:630
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7000702;//kernel.InputDevice:702
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7000725;//kernel.InputDevice:725
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7000748;//kernel.InputDevice:748
              _this.isMouseDown=true;
              //$LASTPOS=7000775;//kernel.InputDevice:775
              if (Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7000817;//kernel.InputDevice:817
                Tonyu.globals.$handleTouchStart({preventDefault: (function anonymous_869() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
              //$LASTPOS=7001184;//kernel.InputDevice:1184
              _this.handleListeners();
            });
            //$LASTPOS=7001216;//kernel.InputDevice:1216
            Tonyu.globals.$handleMouseMove=(function anonymous_1233(e) {
              var p;
              var mp;
              
              //$LASTPOS=7001249;//kernel.InputDevice:1249
              p = cvj.offset();
              
              //$LASTPOS=7001278;//kernel.InputDevice:1278
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7001355;//kernel.InputDevice:1355
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7001427;//kernel.InputDevice:1427
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7001450;//kernel.InputDevice:1450
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7001473;//kernel.InputDevice:1473
              if (_this.isMouseDown&&Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7001530;//kernel.InputDevice:1530
                Tonyu.globals.$handleTouchMove({preventDefault: (function anonymous_1581() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
              //$LASTPOS=7001896;//kernel.InputDevice:1896
              _this.handleListeners();
            });
            //$LASTPOS=7001983;//kernel.InputDevice:1983
            Tonyu.globals.$handleMouseUp=(function anonymous_1998(e) {
              
              //$LASTPOS=7002014;//kernel.InputDevice:2014
              _this.isMouseDown=false;
              //$LASTPOS=7002042;//kernel.InputDevice:2042
              if (Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7002084;//kernel.InputDevice:2084
                Tonyu.globals.$handleTouchEnd({preventDefault: (function anonymous_2134() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
            });
            //$LASTPOS=7002453;//kernel.InputDevice:2453
            Tonyu.globals.$touches=[];
            //$LASTPOS=7002471;//kernel.InputDevice:2471
            //$LASTPOS=7002476;//kernel.InputDevice:2476
            i = 0;
            for (; i<5 ; i++) {
              //$LASTPOS=7002492;//kernel.InputDevice:2492
              Tonyu.globals.$touches.push(_this.newTouch(i));
            }
            //$LASTPOS=7002525;//kernel.InputDevice:2525
            Tonyu.globals.$touches.findById=(function anonymous_2543(id) {
              var j;
              
              //$LASTPOS=7002560;//kernel.InputDevice:2560
              //$LASTPOS=7002565;//kernel.InputDevice:2565
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7002615;//kernel.InputDevice:2615
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7002725;//kernel.InputDevice:2725
            Tonyu.globals.$touches.findWithin=(function anonymous_2745(o,d) {
              var j;
              
              //$LASTPOS=7002771;//kernel.InputDevice:2771
              //$LASTPOS=7002776;//kernel.InputDevice:2776
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7002826;//kernel.InputDevice:2826
                  if (o.within(Tonyu.globals.$touches[j],d)) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7002933;//kernel.InputDevice:2933
            Tonyu.globals.$handleTouchStart=(function anonymous_2951(e) {
              var p;
              var ts;
              var dst;
              var i;
              var src;
              var j;
              
              //$LASTPOS=7002967;//kernel.InputDevice:2967
              T2MediaLib.activate();
              //$LASTPOS=7002999;//kernel.InputDevice:2999
              p = cvj.offset();
              
              //$LASTPOS=7003028;//kernel.InputDevice:3028
              e.preventDefault();
              //$LASTPOS=7003057;//kernel.InputDevice:3057
              ts = e.originalEvent.changedTouches;
              
              
              //$LASTPOS=7003123;//kernel.InputDevice:3123
              //$LASTPOS=7003128;//kernel.InputDevice:3128
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7003173;//kernel.InputDevice:3173
                  src = ts[i];
                  
                  //$LASTPOS=7003201;//kernel.InputDevice:3201
                  //$LASTPOS=7003206;//kernel.InputDevice:3206
                  j = 0;
                  for (; j<Tonyu.globals.$touches.length ; j++) {
                    {
                      //$LASTPOS=7003260;//kernel.InputDevice:3260
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=7003309;//kernel.InputDevice:3309
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=7003347;//kernel.InputDevice:3347
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                  }
                  //$LASTPOS=7003453;//kernel.InputDevice:3453
                  if (dst) {
                    //$LASTPOS=7003481;//kernel.InputDevice:3481
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7003562;//kernel.InputDevice:3562
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
                    //$LASTPOS=7003641;//kernel.InputDevice:3641
                    dst.px=dst.x=_this.mp.x;
                    //$LASTPOS=7003677;//kernel.InputDevice:3677
                    dst.py=dst.y=_this.mp.y;
                    //$LASTPOS=7003713;//kernel.InputDevice:3713
                    dst.touched=1;
                    
                  }
                }
              }
              //$LASTPOS=7003763;//kernel.InputDevice:3763
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7003795;//kernel.InputDevice:3795
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7003827;//kernel.InputDevice:3827
              _this.handleListeners();
            });
            //$LASTPOS=7003859;//kernel.InputDevice:3859
            Tonyu.globals.$handleTouchMove=(function anonymous_3876(e) {
              var p;
              var ts;
              var dst;
              var i;
              var src;
              
              //$LASTPOS=7003892;//kernel.InputDevice:3892
              T2MediaLib.activate();
              //$LASTPOS=7003924;//kernel.InputDevice:3924
              p = cvj.offset();
              
              //$LASTPOS=7003953;//kernel.InputDevice:3953
              e.preventDefault();
              //$LASTPOS=7003982;//kernel.InputDevice:3982
              ts = e.originalEvent.changedTouches;
              
              
              //$LASTPOS=7004048;//kernel.InputDevice:4048
              //$LASTPOS=7004053;//kernel.InputDevice:4053
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7004098;//kernel.InputDevice:4098
                  src = ts[i];
                  
                  //$LASTPOS=7004126;//kernel.InputDevice:4126
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7004182;//kernel.InputDevice:4182
                  if (dst) {
                    //$LASTPOS=7004210;//kernel.InputDevice:4210
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7004291;//kernel.InputDevice:4291
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
                    //$LASTPOS=7004370;//kernel.InputDevice:4370
                    dst.x=_this.mp.x;
                    //$LASTPOS=7004399;//kernel.InputDevice:4399
                    dst.y=_this.mp.y;
                    
                  }
                }
              }
              //$LASTPOS=7004446;//kernel.InputDevice:4446
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7004478;//kernel.InputDevice:4478
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7004510;//kernel.InputDevice:4510
              _this.handleListeners();
            });
            //$LASTPOS=7004542;//kernel.InputDevice:4542
            Tonyu.globals.$handleTouchEnd=(function anonymous_4558(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=7004574;//kernel.InputDevice:4574
              T2MediaLib.activate();
              //$LASTPOS=7004606;//kernel.InputDevice:4606
              ts = e.originalEvent.changedTouches;
              
              //$LASTPOS=7004654;//kernel.InputDevice:4654
              //$LASTPOS=7004659;//kernel.InputDevice:4659
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7004704;//kernel.InputDevice:4704
                  src = ts[i];
                  
                  //$LASTPOS=7004732;//kernel.InputDevice:4732
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7004788;//kernel.InputDevice:4788
                  if (dst) {
                    //$LASTPOS=7004816;//kernel.InputDevice:4816
                    Tonyu.globals.$touches[dst.index]=Tonyu.globals.$InputDevice.newTouch(dst.index);
                    //$LASTPOS=7004887;//kernel.InputDevice:4887
                    Tonyu.globals.$touches[dst.index].x=dst.x;
                    //$LASTPOS=7004933;//kernel.InputDevice:4933
                    Tonyu.globals.$touches[dst.index].y=dst.y;
                    //$LASTPOS=7004979;//kernel.InputDevice:4979
                    dst.ended=true;
                    
                  }
                }
              }
              //$LASTPOS=7005136;//kernel.InputDevice:5136
              _this.handleListeners();
            });
            //$LASTPOS=7005168;//kernel.InputDevice:5168
            Tonyu.globals.$unsetTouchEmu=(function anonymous_5183() {
              var i;
              var t;
              var _it_67;
              
              //$LASTPOS=7005198;//kernel.InputDevice:5198
              Tonyu.globals.$InputDevice.touchEmu=false;
              //$LASTPOS=7005236;//kernel.InputDevice:5236
              _it_67=Tonyu.iterator(Tonyu.globals.$touches,2);
              while(_it_67.next()) {
                i=_it_67[0];
                t=_it_67[1];
                
                //$LASTPOS=7005277;//kernel.InputDevice:5277
                if (t.identifier==ID_MOUSE) {
                  //$LASTPOS=7005324;//kernel.InputDevice:5324
                  t[i]=Tonyu.globals.$InputDevice.newTouch(i);
                  
                }
                
              }
            });
            //$LASTPOS=7005394;//kernel.InputDevice:5394
            handleMouseDown = (function anonymous_5414(e) {
              
              //$LASTPOS=7005419;//kernel.InputDevice:5419
              Tonyu.globals.$handleMouseDown(e);
            });
            
            //$LASTPOS=7005447;//kernel.InputDevice:5447
            handleMouseMove = (function anonymous_5467(e) {
              
              //$LASTPOS=7005472;//kernel.InputDevice:5472
              Tonyu.globals.$handleMouseMove(e);
            });
            
            //$LASTPOS=7005500;//kernel.InputDevice:5500
            handleMouseUp = (function anonymous_5518(e) {
              
              //$LASTPOS=7005523;//kernel.InputDevice:5523
              Tonyu.globals.$handleMouseUp(e);
            });
            
            //$LASTPOS=7005549;//kernel.InputDevice:5549
            handleTouchStart = (function anonymous_5570(e) {
              
              //$LASTPOS=7005575;//kernel.InputDevice:5575
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7005592;//kernel.InputDevice:5592
              Tonyu.globals.$handleTouchStart(e);
            });
            
            //$LASTPOS=7005621;//kernel.InputDevice:5621
            handleTouchMove = (function anonymous_5641(e) {
              
              //$LASTPOS=7005646;//kernel.InputDevice:5646
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7005663;//kernel.InputDevice:5663
              Tonyu.globals.$handleTouchMove(e);
            });
            
            //$LASTPOS=7005691;//kernel.InputDevice:5691
            handleTouchEnd = (function anonymous_5710(e) {
              
              //$LASTPOS=7005715;//kernel.InputDevice:5715
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7005732;//kernel.InputDevice:5732
              Tonyu.globals.$handleTouchEnd(e);
            });
            
            //$LASTPOS=7005759;//kernel.InputDevice:5759
            d = $.data(cv,"events");
            
            //$LASTPOS=7005791;//kernel.InputDevice:5791
            if (! d) {
              //$LASTPOS=7005810;//kernel.InputDevice:5810
              $.data(cv,"events","true");
              //$LASTPOS=7005847;//kernel.InputDevice:5847
              cvj.mousedown(handleMouseDown);
              //$LASTPOS=7005888;//kernel.InputDevice:5888
              cvj.mousemove(handleMouseMove);
              //$LASTPOS=7005929;//kernel.InputDevice:5929
              cvj.mouseup(handleMouseUp);
              //$LASTPOS=7005966;//kernel.InputDevice:5966
              cvj.on("touchstart",handleTouchStart);
              //$LASTPOS=7006014;//kernel.InputDevice:6014
              cvj.on("touchmove",handleTouchMove);
              //$LASTPOS=7006060;//kernel.InputDevice:6060
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
      var _it_77;
      
      //$LASTPOS=7006125;//kernel.InputDevice:6125
      _it_77=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_77.next()) {
        i=_it_77[0];
        
        //$LASTPOS=7006160;//kernel.InputDevice:6160
        if (i.touched>0) {
          //$LASTPOS=7006178;//kernel.InputDevice:6178
          i.touched++;
          
        } else {
          //$LASTPOS=7006206;//kernel.InputDevice:6206
          if (i.touched==- 1) {
            //$LASTPOS=7006225;//kernel.InputDevice:6225
            i.touched=1;
          } else {
            //$LASTPOS=7006267;//kernel.InputDevice:6267
            i.vx=i.vy=0;
            //$LASTPOS=7006293;//kernel.InputDevice:6293
            i.px=null;
            
          }
        }
        //$LASTPOS=7006324;//kernel.InputDevice:6324
        if (i.touched>0) {
          //$LASTPOS=7006356;//kernel.InputDevice:6356
          if (typeof  i.px=="number") {
            //$LASTPOS=7006402;//kernel.InputDevice:6402
            i.vx=i.x-i.px||0;
            //$LASTPOS=7006439;//kernel.InputDevice:6439
            i.vy=i.y-i.py||0;
            
          }
          //$LASTPOS=7006487;//kernel.InputDevice:6487
          i.px=i.x;
          //$LASTPOS=7006510;//kernel.InputDevice:6510
          i.py=i.y;
          
        }
        
      }
    },
    fiber$update :function _trc_InputDevice_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_77;
      
      //$LASTPOS=7006125;//kernel.InputDevice:6125
      _it_77=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_77.next()) {
        i=_it_77[0];
        
        //$LASTPOS=7006160;//kernel.InputDevice:6160
        if (i.touched>0) {
          //$LASTPOS=7006178;//kernel.InputDevice:6178
          i.touched++;
          
        } else {
          //$LASTPOS=7006206;//kernel.InputDevice:6206
          if (i.touched==- 1) {
            //$LASTPOS=7006225;//kernel.InputDevice:6225
            i.touched=1;
          } else {
            //$LASTPOS=7006267;//kernel.InputDevice:6267
            i.vx=i.vy=0;
            //$LASTPOS=7006293;//kernel.InputDevice:6293
            i.px=null;
            
          }
        }
        //$LASTPOS=7006324;//kernel.InputDevice:6324
        if (i.touched>0) {
          //$LASTPOS=7006356;//kernel.InputDevice:6356
          if (typeof  i.px=="number") {
            //$LASTPOS=7006402;//kernel.InputDevice:6402
            i.vx=i.x-i.px||0;
            //$LASTPOS=7006439;//kernel.InputDevice:6439
            i.vy=i.y-i.py||0;
            
          }
          //$LASTPOS=7006487;//kernel.InputDevice:6487
          i.px=i.x;
          //$LASTPOS=7006510;//kernel.InputDevice:6510
          i.py=i.y;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"newTouch":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}},"fields":{"listeners":{},"touchEmu":{},"defaultLayer":{},"isMouseDown":{},"mp":{}}}
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
            if (!(_this.length>0)) { __pc=3     ; break; }
            //$LASTPOS=8000181;//kernel.ArgParser:181
            if (!(_this.a[_this.length-1]!==_this._undef)) { __pc=2     ; break; }
            __pc=3     ; break;
            
          case 2     :
            
            //$LASTPOS=8000223;//kernel.ArgParser:223
            _this.length--;
            //$LASTPOS=8000242;//kernel.ArgParser:242
            delete _this.a[_this.length];
            __pc=1;break;
          case 3     :
            
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"push":{"nowait":false},"trimUndefs":{"nowait":false},"shift":{"nowait":false},"toArray":{"nowait":false}},"fields":{"length":{},"a":{},"_undef":{}}}
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
    sgn :function _trc_MathMod_sgn(v) {
      "use strict";
      var _this=this;
      
      return (v>0?1:v<0?- 1:0);
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
      
      
      //$LASTPOS=9000551;//kernel.MathMod:551
      a=_this.floor(a);
      //$LASTPOS=9000568;//kernel.MathMod:568
      b=_this.floor(b);
      //$LASTPOS=9000585;//kernel.MathMod:585
      if (a>=b) {
        //$LASTPOS=9000606;//kernel.MathMod:606
        c=(a-b)%360;
        //$LASTPOS=9000630;//kernel.MathMod:630
        if (c>=180) {
          //$LASTPOS=9000642;//kernel.MathMod:642
          c-=360;
        }
        
      } else {
        //$LASTPOS=9000673;//kernel.MathMod:673
        c=- ((b-a)%360);
        //$LASTPOS=9000700;//kernel.MathMod:700
        if (c<- 180) {
          //$LASTPOS=9000712;//kernel.MathMod:712
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
      
      //$LASTPOS=9000821;//kernel.MathMod:821
      if (typeof  dx=="object") {
        //$LASTPOS=9000857;//kernel.MathMod:857
        t = dx;
        
        //$LASTPOS=9000876;//kernel.MathMod:876
        dx=t.x-_this.x;
        //$LASTPOS=9000885;//kernel.MathMod:885
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9000961;//kernel.MathMod:961
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
      
      //$LASTPOS=9001098;//kernel.MathMod:1098
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
      
      //$LASTPOS=9001302;//kernel.MathMod:1302
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
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"sgn":{"nowait":true},"atan2":{"nowait":true},"atanxy":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true},"parseFloat":{"nowait":true},"clamp":{"nowait":true},"clamped":{"nowait":true},"min":{"nowait":true},"max":{"nowait":true}},"fields":{"x":{},"y":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Navigator',
  shortName: 'Navigator',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_Navigator_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Navigator_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    getUserAgent :function _trc_Navigator_getUserAgent() {
      "use strict";
      var _this=this;
      
      return navigator.userAgent;
    },
    fiber$getUserAgent :function _trc_Navigator_f_getUserAgent(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=navigator.userAgent;return;
      
      
      _thread.retVal=_this;return;
    },
    isTablet :function _trc_Navigator_isTablet() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10000263;//kernel.Navigator:263
      u = _this.getUserAgent().toLowerCase();
      
      return ((u.indexOf("windows")!=- 1&&u.indexOf("touch")!=- 1&&u.indexOf("tablet pc")==- 1)||u.indexOf("ipad")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")==- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("tablet")!=- 1)||u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1||u.indexOf("playbook")!=- 1||u.indexOf('a1_07')!=- 1||u.indexOf('sc-01c')!=- 1);
    },
    fiber$isTablet :function _trc_Navigator_f_isTablet(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10000263;//kernel.Navigator:263
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=((u.indexOf("windows")!=- 1&&u.indexOf("touch")!=- 1&&u.indexOf("tablet pc")==- 1)||u.indexOf("ipad")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")==- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("tablet")!=- 1)||u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1||u.indexOf("playbook")!=- 1||u.indexOf('a1_07')!=- 1||u.indexOf('sc-01c')!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isMobile :function _trc_Navigator_isMobile() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10000800;//kernel.Navigator:800
      u = _this.getUserAgent().toLowerCase();
      
      return ((u.indexOf("windows")!=- 1&&u.indexOf("phone")!=- 1)||u.indexOf("iphone")!=- 1||u.indexOf("ipod")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("blackberry")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1)));
    },
    fiber$isMobile :function _trc_Navigator_f_isMobile(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10000800;//kernel.Navigator:800
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=((u.indexOf("windows")!=- 1&&u.indexOf("phone")!=- 1)||u.indexOf("iphone")!=- 1||u.indexOf("ipod")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("blackberry")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1)));return;
      
      
      _thread.retVal=_this;return;
    },
    isWindows :function _trc_Navigator_isWindows() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10001274;//kernel.Navigator:1274
      u = _this.getUserAgent().toLowerCase();
      
      return u.indexOf("windows")!=- 1;
    },
    fiber$isWindows :function _trc_Navigator_f_isWindows(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10001274;//kernel.Navigator:1274
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=u.indexOf("windows")!=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    isAndroid :function _trc_Navigator_isAndroid() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10001378;//kernel.Navigator:1378
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1);
    },
    fiber$isAndroid :function _trc_Navigator_f_isAndroid(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10001378;//kernel.Navigator:1378
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isIOS :function _trc_Navigator_isIOS() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10001522;//kernel.Navigator:1522
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("iphone")!=- 1||u.indexOf("ipad")!=- 1||u.indexOf("ipod")!=- 1);
    },
    fiber$isIOS :function _trc_Navigator_f_isIOS(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10001522;//kernel.Navigator:1522
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("iphone")!=- 1||u.indexOf("ipad")!=- 1||u.indexOf("ipod")!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isFirefoxOS :function _trc_Navigator_isFirefoxOS() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10001705;//kernel.Navigator:1705
      u = _this.getUserAgent().toLowerCase();
      
      return u.indexOf("firefox")!=1;
    },
    fiber$isFirefoxOS :function _trc_Navigator_f_isFirefoxOS(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10001705;//kernel.Navigator:1705
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=u.indexOf("firefox")!=1;return;
      
      
      _thread.retVal=_this;return;
    },
    isKindle :function _trc_Navigator_isKindle() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10001807;//kernel.Navigator:1807
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1);
    },
    fiber$isKindle :function _trc_Navigator_f_isKindle(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10001807;//kernel.Navigator:1807
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isBlackBerry :function _trc_Navigator_isBlackBerry() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=10001959;//kernel.Navigator:1959
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("blackberry")!=- 1||u.indexOf("playbook")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1));
    },
    fiber$isBlackBerry :function _trc_Navigator_f_isBlackBerry(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=10001959;//kernel.Navigator:1959
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("blackberry")!=- 1||u.indexOf("playbook")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getUserAgent":{"nowait":false},"isTablet":{"nowait":false},"isMobile":{"nowait":false},"isWindows":{"nowait":false},"isAndroid":{"nowait":false},"isIOS":{"nowait":false},"isFirefoxOS":{"nowait":false},"isKindle":{"nowait":false},"isBlackBerry":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=11000091;//kernel.ObjectPool:91
      list = _this.poolList(key);
      
      //$LASTPOS=11000117;//kernel.ObjectPool:117
      o.objectPoolAge=(o.objectPoolAge||0)+1;
      //$LASTPOS=11000159;//kernel.ObjectPool:159
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
            //$LASTPOS=11000091;//kernel.ObjectPool:91
            _this.fiber$poolList(_thread, key);
            __pc=1;return;
          case 1:
            list=_thread.retVal;
            
            //$LASTPOS=11000117;//kernel.ObjectPool:117
            o.objectPoolAge=(o.objectPoolAge||0)+1;
            //$LASTPOS=11000159;//kernel.ObjectPool:159
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
      
      //$LASTPOS=11000196;//kernel.ObjectPool:196
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
            //$LASTPOS=11000196;//kernel.ObjectPool:196
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
      
      //$LASTPOS=11000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      return _this.lists[key]=_this.lists[key]||[];
    },
    fiber$poolList :function _trc_ObjectPool_f_poolList(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      _thread.retVal=_this.lists[key]=_this.lists[key]||[];return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"pool":{"nowait":false},"withdraw":{"nowait":false},"poolList":{"nowait":false}},"fields":{"lists":{}}}
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
      
      //$LASTPOS=12000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=12000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=12000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=12000123;//kernel.TObject:123
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}},"fields":{}}
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
      
      //$LASTPOS=13000052;//kernel.TQuery:52
      _this.length=0;
    },
    contains :function _trc_TQuery_contains(t) {
      "use strict";
      var _this=this;
      var o;
      var _it_97;
      
      //$LASTPOS=13000086;//kernel.TQuery:86
      _it_97=Tonyu.iterator(_this,1);
      while(_it_97.next()) {
        o=_it_97[0];
        
        //$LASTPOS=13000117;//kernel.TQuery:117
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
      var _it_97;
      
      //$LASTPOS=13000086;//kernel.TQuery:86
      _it_97=Tonyu.iterator(_this,1);
      while(_it_97.next()) {
        o=_it_97[0];
        
        //$LASTPOS=13000117;//kernel.TQuery:117
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
      
      //$LASTPOS=13000200;//kernel.TQuery:200
      res = {};
      
      //$LASTPOS=13000217;//kernel.TQuery:217
      res.i=0;
      //$LASTPOS=13000231;//kernel.TQuery:231
      if (arity==1) {
        //$LASTPOS=13000256;//kernel.TQuery:256
        res.next=(function anonymous_265() {
          
          //$LASTPOS=13000292;//kernel.TQuery:292
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=13000343;//kernel.TQuery:343
          res[0]=_this[res.i];
          //$LASTPOS=13000376;//kernel.TQuery:376
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=13000446;//kernel.TQuery:446
        res.next=(function anonymous_455() {
          
          //$LASTPOS=13000482;//kernel.TQuery:482
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=13000533;//kernel.TQuery:533
          res[0]=res.i;
          //$LASTPOS=13000560;//kernel.TQuery:560
          res[1]=_this[res.i];
          //$LASTPOS=13000593;//kernel.TQuery:593
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
      
      //$LASTPOS=13000200;//kernel.TQuery:200
      res = {};
      
      //$LASTPOS=13000217;//kernel.TQuery:217
      res.i=0;
      //$LASTPOS=13000231;//kernel.TQuery:231
      if (arity==1) {
        //$LASTPOS=13000256;//kernel.TQuery:256
        res.next=(function anonymous_265() {
          
          //$LASTPOS=13000292;//kernel.TQuery:292
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=13000343;//kernel.TQuery:343
          res[0]=_this[res.i];
          //$LASTPOS=13000376;//kernel.TQuery:376
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=13000446;//kernel.TQuery:446
        res.next=(function anonymous_455() {
          
          //$LASTPOS=13000482;//kernel.TQuery:482
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=13000533;//kernel.TQuery:533
          res[0]=res.i;
          //$LASTPOS=13000560;//kernel.TQuery:560
          res[1]=_this[res.i];
          //$LASTPOS=13000593;//kernel.TQuery:593
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
      var _it_101;
      
      
      //$LASTPOS=13000700;//kernel.TQuery:700
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=13000728;//kernel.TQuery:728
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=13000839;//kernel.TQuery:839
      if (arguments.length>=2) {
        //$LASTPOS=13000875;//kernel.TQuery:875
        values={};
        //$LASTPOS=13000895;//kernel.TQuery:895
        //$LASTPOS=13000900;//kernel.TQuery:900
        i = 0;
        for (; i<arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=13000953;//kernel.TQuery:953
            values[arguments[i]]=arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=13001024;//kernel.TQuery:1024
        values=arguments[0];
        
      }
      //$LASTPOS=13001057;//kernel.TQuery:1057
      if (values) {
        //$LASTPOS=13001080;//kernel.TQuery:1080
        _it_101=Tonyu.iterator(_this,1);
        while(_it_101.next()) {
          e=_it_101[0];
          
          //$LASTPOS=13001115;//kernel.TQuery:1115
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
      var _it_101;
      
      
      //$LASTPOS=13000700;//kernel.TQuery:700
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=13000728;//kernel.TQuery:728
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=13000839;//kernel.TQuery:839
      if (_arguments.length>=2) {
        //$LASTPOS=13000875;//kernel.TQuery:875
        values={};
        //$LASTPOS=13000895;//kernel.TQuery:895
        //$LASTPOS=13000900;//kernel.TQuery:900
        i = 0;
        for (; i<_arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=13000953;//kernel.TQuery:953
            values[_arguments[i]]=_arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=13001024;//kernel.TQuery:1024
        values=_arguments[0];
        
      }
      //$LASTPOS=13001057;//kernel.TQuery:1057
      if (values) {
        //$LASTPOS=13001080;//kernel.TQuery:1080
        _it_101=Tonyu.iterator(_this,1);
        while(_it_101.next()) {
          e=_it_101[0];
          
          //$LASTPOS=13001115;//kernel.TQuery:1115
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13001180;//kernel.TQuery:1180
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
      
      //$LASTPOS=13001180;//kernel.TQuery:1180
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
      var _it_107;
      var v;
      
      //$LASTPOS=13001313;//kernel.TQuery:1313
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=13001341;//kernel.TQuery:1341
      reso = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=13001371;//kernel.TQuery:1371
      _it_107=Tonyu.iterator(_this,1);
      while(_it_107.next()) {
        o=_it_107[0];
        
        //$LASTPOS=13001402;//kernel.TQuery:1402
        v = f(o);
        
        //$LASTPOS=13001423;//kernel.TQuery:1423
        if (res==null||v>=res) {
          //$LASTPOS=13001463;//kernel.TQuery:1463
          if (v>res) {
            //$LASTPOS=13001474;//kernel.TQuery:1474
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=13001504;//kernel.TQuery:1504
          reso.push(o);
          //$LASTPOS=13001531;//kernel.TQuery:1531
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
      var _it_107;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_maxs(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13001313;//kernel.TQuery:1313
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=13001341;//kernel.TQuery:1341
            reso = new Tonyu.classes.kernel.TQuery;
            
            //$LASTPOS=13001371;//kernel.TQuery:1371
            _it_107=Tonyu.iterator(_this,1);
            while(_it_107.next()) {
              o=_it_107[0];
              
              //$LASTPOS=13001402;//kernel.TQuery:1402
              v = f(o);
              
              //$LASTPOS=13001423;//kernel.TQuery:1423
              if (res==null||v>=res) {
                //$LASTPOS=13001463;//kernel.TQuery:1463
                if (v>res) {
                  //$LASTPOS=13001474;//kernel.TQuery:1474
                  reso=new Tonyu.classes.kernel.TQuery;
                }
                //$LASTPOS=13001504;//kernel.TQuery:1504
                reso.push(o);
                //$LASTPOS=13001531;//kernel.TQuery:1531
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
      var _it_114;
      var v;
      
      //$LASTPOS=13001596;//kernel.TQuery:1596
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=13001624;//kernel.TQuery:1624
      reso = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=13001654;//kernel.TQuery:1654
      _it_114=Tonyu.iterator(_this,1);
      while(_it_114.next()) {
        o=_it_114[0];
        
        //$LASTPOS=13001685;//kernel.TQuery:1685
        v = f(o);
        
        //$LASTPOS=13001706;//kernel.TQuery:1706
        if (res==null||v<=res) {
          //$LASTPOS=13001746;//kernel.TQuery:1746
          if (v<res) {
            //$LASTPOS=13001757;//kernel.TQuery:1757
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=13001787;//kernel.TQuery:1787
          reso.push(o);
          //$LASTPOS=13001814;//kernel.TQuery:1814
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
      var _it_114;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_mins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13001596;//kernel.TQuery:1596
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=13001624;//kernel.TQuery:1624
            reso = new Tonyu.classes.kernel.TQuery;
            
            //$LASTPOS=13001654;//kernel.TQuery:1654
            _it_114=Tonyu.iterator(_this,1);
            while(_it_114.next()) {
              o=_it_114[0];
              
              //$LASTPOS=13001685;//kernel.TQuery:1685
              v = f(o);
              
              //$LASTPOS=13001706;//kernel.TQuery:1706
              if (res==null||v<=res) {
                //$LASTPOS=13001746;//kernel.TQuery:1746
                if (v<res) {
                  //$LASTPOS=13001757;//kernel.TQuery:1757
                  reso=new Tonyu.classes.kernel.TQuery;
                }
                //$LASTPOS=13001787;//kernel.TQuery:1787
                reso.push(o);
                //$LASTPOS=13001814;//kernel.TQuery:1814
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
      
      //$LASTPOS=13001973;//kernel.TQuery:1973
      if (typeof  x=="object") {
        //$LASTPOS=13001998;//kernel.TQuery:1998
        y=x.y;
        //$LASTPOS=13002004;//kernel.TQuery:2004
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
      
      //$LASTPOS=13001973;//kernel.TQuery:1973
      if (typeof  x=="object") {
        //$LASTPOS=13001998;//kernel.TQuery:1998
        y=x.y;
        //$LASTPOS=13002004;//kernel.TQuery:2004
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
      
      
      //$LASTPOS=13002172;//kernel.TQuery:2172
      if (typeof  xo=="object") {
        //$LASTPOS=13002208;//kernel.TQuery:2208
        x=xo.x;
        //$LASTPOS=13002215;//kernel.TQuery:2215
        y=xo.y;
        //$LASTPOS=13002222;//kernel.TQuery:2222
        d=yd;
        
      } else {
        //$LASTPOS=13002251;//kernel.TQuery:2251
        x=xo;
        //$LASTPOS=13002256;//kernel.TQuery:2256
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
      
      
      //$LASTPOS=13002172;//kernel.TQuery:2172
      if (typeof  xo=="object") {
        //$LASTPOS=13002208;//kernel.TQuery:2208
        x=xo.x;
        //$LASTPOS=13002215;//kernel.TQuery:2215
        y=xo.y;
        //$LASTPOS=13002222;//kernel.TQuery:2222
        d=yd;
        
      } else {
        //$LASTPOS=13002251;//kernel.TQuery:2251
        x=xo;
        //$LASTPOS=13002256;//kernel.TQuery:2256
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
      var _it_125;
      var v;
      
      //$LASTPOS=13002425;//kernel.TQuery:2425
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=13002467;//kernel.TQuery:2467
      _it_125=Tonyu.iterator(_this,1);
      while(_it_125.next()) {
        o=_it_125[0];
        
        //$LASTPOS=13002498;//kernel.TQuery:2498
        v = f(o);
        
        //$LASTPOS=13002519;//kernel.TQuery:2519
        if (res==null||v>res) {
          //$LASTPOS=13002543;//kernel.TQuery:2543
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
      var _it_131;
      var v;
      
      //$LASTPOS=13002595;//kernel.TQuery:2595
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=13002637;//kernel.TQuery:2637
      _it_131=Tonyu.iterator(_this,1);
      while(_it_131.next()) {
        o=_it_131[0];
        
        //$LASTPOS=13002668;//kernel.TQuery:2668
        v = f(o);
        
        //$LASTPOS=13002689;//kernel.TQuery:2689
        if (res==null||v<res) {
          //$LASTPOS=13002713;//kernel.TQuery:2713
          res=v;
        }
        
      }
      return res;
    },
    push :function _trc_TQuery_push(e) {
      "use strict";
      var _this=this;
      var ee;
      var _it_137;
      
      //$LASTPOS=13002764;//kernel.TQuery:2764
      if (e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array) {
        //$LASTPOS=13002806;//kernel.TQuery:2806
        _it_137=Tonyu.iterator(e,1);
        while(_it_137.next()) {
          ee=_it_137[0];
          
          //$LASTPOS=13002824;//kernel.TQuery:2824
          _this.push(ee);
        }
        
      } else {
        //$LASTPOS=13002857;//kernel.TQuery:2857
        _this[_this.length]=e;
        //$LASTPOS=13002882;//kernel.TQuery:2882
        _this.length++;
        
      }
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ee;
      var _it_137;
      
      
      _thread.enter(function _trc_TQuery_ent_push(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13002764;//kernel.TQuery:2764
            if (!(e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array)) { __pc=4     ; break; }
            //$LASTPOS=13002806;//kernel.TQuery:2806
            _it_137=Tonyu.iterator(e,1);
          case 1:
            if (!(_it_137.next())) { __pc=3     ; break; }
            ee=_it_137[0];
            
            //$LASTPOS=13002824;//kernel.TQuery:2824
            _this.fiber$push(_thread, ee);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            __pc=5     ;break;
          case 4     :
            {
              //$LASTPOS=13002857;//kernel.TQuery:2857
              _this[_this.length]=e;
              //$LASTPOS=13002882;//kernel.TQuery:2882
              _this.length++;
            }
          case 5     :
            
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
      var _it_140;
      
      //$LASTPOS=13002945;//kernel.TQuery:2945
      no = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=13002969;//kernel.TQuery:2969
      _it_140=Tonyu.iterator(_this,1);
      while(_it_140.next()) {
        o=_it_140[0];
        
        //$LASTPOS=13003000;//kernel.TQuery:3000
        if (f(o)) {
          //$LASTPOS=13003010;//kernel.TQuery:3010
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
      var _it_140;
      
      //$LASTPOS=13002945;//kernel.TQuery:2945
      no = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=13002969;//kernel.TQuery:2969
      _it_140=Tonyu.iterator(_this,1);
      while(_it_140.next()) {
        o=_it_140[0];
        
        //$LASTPOS=13003000;//kernel.TQuery:3000
        if (f(o)) {
          //$LASTPOS=13003010;//kernel.TQuery:3010
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
      var _it_144;
      var f;
      
      
      //$LASTPOS=13003130;//kernel.TQuery:3130
      if (! args) {
        //$LASTPOS=13003141;//kernel.TQuery:3141
        args=[];
      }
      //$LASTPOS=13003155;//kernel.TQuery:3155
      _it_144=Tonyu.iterator(_this,1);
      while(_it_144.next()) {
        o=_it_144[0];
        
        //$LASTPOS=13003186;//kernel.TQuery:3186
        f = o[name];
        
        //$LASTPOS=13003210;//kernel.TQuery:3210
        if (typeof  f=="function") {
          //$LASTPOS=13003251;//kernel.TQuery:3251
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
      var _it_144;
      var f;
      
      
      //$LASTPOS=13003130;//kernel.TQuery:3130
      if (! args) {
        //$LASTPOS=13003141;//kernel.TQuery:3141
        args=[];
      }
      //$LASTPOS=13003155;//kernel.TQuery:3155
      _it_144=Tonyu.iterator(_this,1);
      while(_it_144.next()) {
        o=_it_144[0];
        
        //$LASTPOS=13003186;//kernel.TQuery:3186
        f = o[name];
        
        //$LASTPOS=13003210;//kernel.TQuery:3210
        if (typeof  f=="function") {
          //$LASTPOS=13003251;//kernel.TQuery:3251
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
      
      //$LASTPOS=13003458;//kernel.TQuery:3458
      a = _this.alive();
      
      //$LASTPOS=13003478;//kernel.TQuery:3478
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=13003514;//kernel.TQuery:3514
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
            //$LASTPOS=13003458;//kernel.TQuery:3458
            _this.fiber$alive(_thread);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=13003478;//kernel.TQuery:3478
            if (!(a.length==0)) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            //$LASTPOS=13003514;//kernel.TQuery:3514
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"contains":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":true},"min":{"nowait":true},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}},"fields":{"length":{}}}
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
      
      //$LASTPOS=14000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=14000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=14000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    toListener :function _trc_EventHandler_toListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000132;//kernel.EventHandler:132
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=14000179;//kernel.EventHandler:179
        f=_this.target[f];
        
      }
      //$LASTPOS=14000204;//kernel.EventHandler:204
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      return f;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000341;//kernel.EventHandler:341
      _this.listeners.push(_this.toListener(f));
      return {remove: (function anonymous_403() {
        
        //$LASTPOS=14000418;//kernel.EventHandler:418
        _this.removeListener(f);
      })};
    },
    removeListener :function _trc_EventHandler_removeListener(f) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=14000493;//kernel.EventHandler:493
      i = _this.listeners.indexOf(f);
      
      //$LASTPOS=14000526;//kernel.EventHandler:526
      _this.listeners.splice(i,1);
    },
    fire :function _trc_EventHandler_fire(args) {
      "use strict";
      var _this=this;
      var t;
      var h;
      var _it_153;
      
      //$LASTPOS=14000572;//kernel.EventHandler:572
      if (_this.released) {
        return _this;
      }
      
      //$LASTPOS=14000611;//kernel.EventHandler:611
      _it_153=Tonyu.iterator(_this.listeners,1);
      while(_it_153.next()) {
        h=_it_153[0];
        
        //$LASTPOS=14000855;//kernel.EventHandler:855
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
      var _it_153;
      
      //$LASTPOS=14000572;//kernel.EventHandler:572
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000611;//kernel.EventHandler:611
            _it_153=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_153.next())) { __pc=3     ; break; }
            h=_it_153[0];
            
            //$LASTPOS=14000855;//kernel.EventHandler:855
            _this.fiber$callEventHandler(_thread, h, args);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    release :function _trc_EventHandler_release() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000918;//kernel.EventHandler:918
      _this.released=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"toListener":{"nowait":true},"addListener":{"nowait":true},"removeListener":{"nowait":true},"fire":{"nowait":false},"release":{"nowait":true}},"fields":{"listeners":{},"released":{}}}
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
      
      //$LASTPOS=15000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_147() {
        
        //$LASTPOS=15000163;//kernel.ScreenOutHandler:163
        retThread.kill();
      })};
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000222;//kernel.ScreenOutHandler:222
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=15000240;//kernel.ScreenOutHandler:240
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
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
      
      //$LASTPOS=16000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,_this.toListener(f));
      
      return {remove: (function anonymous_149() {
        
        //$LASTPOS=16000165;//kernel.WithinHandler:165
        retThread.kill();
      })};
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000225;//kernel.WithinHandler:225
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=16000244;//kernel.WithinHandler:244
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
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
      
      //$LASTPOS=17000054;//kernel.OneframeSprite:54
      _this.extend(params);
      //$LASTPOS=17000075;//kernel.OneframeSprite:75
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=17000127;//kernel.OneframeSprite:127
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=17000165;//kernel.OneframeSprite:165
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":false},"isDead":{"nowait":false}},"fields":{"layer":{}}}
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
      
      //$LASTPOS=18000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=18000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=18000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2     ; break; }
            //$LASTPOS=18000134;//kernel.MML:134
            _this.fiber$playNext(_thread);
            __pc=1;return;
          case 1:
            
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playNext :function _trc_MML_playNext() {
      "use strict";
      var _this=this;
      var mml;
      
      //$LASTPOS=18000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=18000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=18000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=18000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=18000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=18000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=18000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=18000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=18000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=18000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=18000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=18000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=18000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=18000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=18000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=18000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=18000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=18000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=18000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=18000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=18000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=18000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=18000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=18000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=18000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=18000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=18000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=18000616;//kernel.MML:616
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
      
      //$LASTPOS=18000755;//kernel.MML:755
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
      
      //$LASTPOS=18000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=18000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=18000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=18000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=18000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=18000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=18000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=18000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=18001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=18000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=18000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=18000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=18000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=18000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=18000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=18000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=18001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}},"fields":{"mmlBuf":{},"cTimeBase":{},"m":{},"mwav":{},"_id":{}}}
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
      
      //$LASTPOS=19000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=19000040;//kernel.WaveTable:40
      _this.env={};
      //$LASTPOS=19000335;//kernel.WaveTable:335
      if (typeof  T!=="undefined") {
        //$LASTPOS=19000416;//kernel.WaveTable:416
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=19000485;//kernel.WaveTable:485
        _this.setEnv(0,_this.env);
        //$LASTPOS=19000506;//kernel.WaveTable:506
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=19000040;//kernel.WaveTable:40
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19000335;//kernel.WaveTable:335
            if (!(typeof  T!=="undefined")) { __pc=3     ; break; }
            //$LASTPOS=19000416;//kernel.WaveTable:416
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=19000485;//kernel.WaveTable:485
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=19000506;//kernel.WaveTable:506
            _this.fiber$setWav(_thread, 0, T("pulse"));
            __pc=2;return;
          case 2:
            
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setWav :function _trc_WaveTable_setWav(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000123;//kernel.WaveTable:123
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000123;//kernel.WaveTable:123
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      "use strict";
      var _this=this;
      var synth;
      
      //$LASTPOS=19000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=19000160;//kernel.WaveTable:160
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
  decls: {"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}},"fields":{"wav":{},"env":{}}}
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
      
      //$LASTPOS=20000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=20000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=20000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=20000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=20000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=20000156;//kernel.T1Line:156
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Line_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=20000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=20000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=20000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=20000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=20000156;//kernel.T1Line:156
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"col":{},"x":{},"y":{},"tx":{},"ty":{},"drawn":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Rect',
  shortName: 'T1Rect',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [],
  methods: {
    main :function _trc_T1Rect_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Rect_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Rect_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000041;//kernel.T1Rect:41
      ctx.fillStyle=_this.col;
      //$LASTPOS=21000064;//kernel.T1Rect:64
      ctx.fillRect(_this.x,_this.y,_this.w,_this.h);
      //$LASTPOS=21000094;//kernel.T1Rect:94
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Rect_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000041;//kernel.T1Rect:41
      ctx.fillStyle=_this.col;
      //$LASTPOS=21000064;//kernel.T1Rect:64
      ctx.fillRect(_this.x,_this.y,_this.w,_this.h);
      //$LASTPOS=21000094;//kernel.T1Rect:94
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"col":{},"x":{},"y":{},"w":{},"h":{},"drawn":{}}}
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
      
      //$LASTPOS=22000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=22000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=22000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=22000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=22000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=22000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=22000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=22000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=22000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=22000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=22000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=22000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=22000585;//kernel.T1Sprite:585
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Sprite_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sgn;
      
      //$LASTPOS=22000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=22000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=22000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=22000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=22000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=22000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=22000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=22000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=22000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=22000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=22000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=22000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=22000585;//kernel.T1Sprite:585
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"pImg":{},"p":{},"x":{},"y":{},"f":{},"drawn":{}}}
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
      
      //$LASTPOS=23000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=23000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=23000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=23000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=23000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=23000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=23000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=23000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=23000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=23000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=23000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=23000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=23000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=23000343;//kernel.T1Text:343
      //$LASTPOS=23000347;//kernel.T1Text:347
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=23000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=23000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=23000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=23000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=23000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=23000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=23000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=23000646;//kernel.T1Text:646
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
      
      //$LASTPOS=23000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=23000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=23000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=23000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=23000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=23000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=23000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=23000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=23000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=23000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=23000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=23000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=23000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=23000343;//kernel.T1Text:343
      //$LASTPOS=23000347;//kernel.T1Text:347
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=23000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=23000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=23000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=23000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=23000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=23000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=23000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=23000646;//kernel.T1Text:646
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"size":{},"text":{},"y":{},"align":{},"fillStyle":{},"col":{},"height":{},"width":{},"x":{},"owner":{},"drawn":{}}}
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
      
      //$LASTPOS=24000064;//kernel.Scheduler:64
      _this.cur=[];
      //$LASTPOS=24000073;//kernel.Scheduler:73
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000064;//kernel.Scheduler:64
      _this.cur=[];
      //$LASTPOS=24000073;//kernel.Scheduler:73
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
      
      //$LASTPOS=24000228;//kernel.Scheduler:228
      name=name||"main";
      //$LASTPOS=24000252;//kernel.Scheduler:252
      args=args||[];
      //$LASTPOS=24000272;//kernel.Scheduler:272
      th = Tonyu.thread();
      
      //$LASTPOS=24000300;//kernel.Scheduler:300
      th.apply(obj,name,args);
      //$LASTPOS=24000330;//kernel.Scheduler:330
      th.name=(obj.getClassInfo?obj.getClassInfo().shortName:"Unknown")+"::"+name;
      //$LASTPOS=24000413;//kernel.Scheduler:413
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=24000228;//kernel.Scheduler:228
      name=name||"main";
      //$LASTPOS=24000252;//kernel.Scheduler:252
      args=args||[];
      //$LASTPOS=24000272;//kernel.Scheduler:272
      th = Tonyu.thread();
      
      //$LASTPOS=24000300;//kernel.Scheduler:300
      th.apply(obj,name,args);
      //$LASTPOS=24000330;//kernel.Scheduler:330
      th.name=(obj.getClassInfo?obj.getClassInfo().shortName:"Unknown")+"::"+name;
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000413;//kernel.Scheduler:413
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
      
      //$LASTPOS=24000468;//kernel.Scheduler:468
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=24000499;//kernel.Scheduler:499
      _this.cur.push(th);
      //$LASTPOS=24000518;//kernel.Scheduler:518
      th.scheduled=_this;
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000468;//kernel.Scheduler:468
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=24000499;//kernel.Scheduler:499
      _this.cur.push(th);
      //$LASTPOS=24000518;//kernel.Scheduler:518
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=24000563;//kernel.Scheduler:563
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=24000594;//kernel.Scheduler:594
      _this.next.push(th);
      //$LASTPOS=24000614;//kernel.Scheduler:614
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000563;//kernel.Scheduler:563
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=24000594;//kernel.Scheduler:594
      _this.next.push(th);
      //$LASTPOS=24000614;//kernel.Scheduler:614
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    unschedule :function _trc_Scheduler_unschedule(th) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=24000660;//kernel.Scheduler:660
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=24000688;//kernel.Scheduler:688
      if (i>=0) {
        //$LASTPOS=24000709;//kernel.Scheduler:709
        _this.cur.splice(i,1);
        //$LASTPOS=24000735;//kernel.Scheduler:735
        delete th.scheduled;
        
      } else {
        //$LASTPOS=24000776;//kernel.Scheduler:776
        i=_this.next.indexOf(th);
        //$LASTPOS=24000802;//kernel.Scheduler:802
        if (i>=0) {
          //$LASTPOS=24000823;//kernel.Scheduler:823
          _this.next.splice(i,1);
          //$LASTPOS=24000853;//kernel.Scheduler:853
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
      
      //$LASTPOS=24000660;//kernel.Scheduler:660
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=24000688;//kernel.Scheduler:688
      if (i>=0) {
        //$LASTPOS=24000709;//kernel.Scheduler:709
        _this.cur.splice(i,1);
        //$LASTPOS=24000735;//kernel.Scheduler:735
        delete th.scheduled;
        
      } else {
        //$LASTPOS=24000776;//kernel.Scheduler:776
        i=_this.next.indexOf(th);
        //$LASTPOS=24000802;//kernel.Scheduler:802
        if (i>=0) {
          //$LASTPOS=24000823;//kernel.Scheduler:823
          _this.next.splice(i,1);
          //$LASTPOS=24000853;//kernel.Scheduler:853
          delete th.scheduled;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    checkTimeout :function _trc_Scheduler_checkTimeout() {
      "use strict";
      var _this=this;
      var now;
      
      //$LASTPOS=24000916;//kernel.Scheduler:916
      now = new Date().getTime();
      
      //$LASTPOS=24000951;//kernel.Scheduler:951
      if (now-_this.lastSteps>1000) {
        throw new Error("待機不能モードでupdateが呼ばれています．ブラウザが固まるのを防ぐために停止します．");
        
        
      }
    },
    fiber$checkTimeout :function _trc_Scheduler_f_checkTimeout(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var now;
      
      //$LASTPOS=24000916;//kernel.Scheduler:916
      now = new Date().getTime();
      
      //$LASTPOS=24000951;//kernel.Scheduler:951
      if (now-_this.lastSteps>1000) {
        throw new Error("待機不能モードでupdateが呼ばれています．ブラウザが固まるのを防ぐために停止します．");
        
        
      }
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      "use strict";
      var _this=this;
      var t;
      var _it_169;
      
      //$LASTPOS=24001081;//kernel.Scheduler:1081
      _this.lastSteps=new Date().getTime();
      //$LASTPOS=24001118;//kernel.Scheduler:1118
      _it_169=Tonyu.iterator(_this.cur,1);
      while(_it_169.next()) {
        t=_it_169[0];
        
        //$LASTPOS=24001145;//kernel.Scheduler:1145
        delete t.scheduled;
        //$LASTPOS=24001171;//kernel.Scheduler:1171
        if (t.waitCount) {
          //$LASTPOS=24001200;//kernel.Scheduler:1200
          t.waitCount--;
          //$LASTPOS=24001228;//kernel.Scheduler:1228
          _this.addToNext(t);
          
        } else {
          //$LASTPOS=24001317;//kernel.Scheduler:1317
          t.steps();
          //$LASTPOS=24001391;//kernel.Scheduler:1391
          if (t.preempted) {
            //$LASTPOS=24001476;//kernel.Scheduler:1476
            _this.addToNext(t);
            
          }
          
        }
        
      }
      //$LASTPOS=24001528;//kernel.Scheduler:1528
      _this.cur=_this.next;
      //$LASTPOS=24001543;//kernel.Scheduler:1543
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_169;
      
      //$LASTPOS=24001081;//kernel.Scheduler:1081
      _this.lastSteps=new Date().getTime();
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24001118;//kernel.Scheduler:1118
            _it_169=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_169.next())) { __pc=7     ; break; }
            t=_it_169[0];
            
            //$LASTPOS=24001145;//kernel.Scheduler:1145
            delete t.scheduled;
            //$LASTPOS=24001171;//kernel.Scheduler:1171
            if (!(t.waitCount)) { __pc=3     ; break; }
            //$LASTPOS=24001200;//kernel.Scheduler:1200
            t.waitCount--;
            //$LASTPOS=24001228;//kernel.Scheduler:1228
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
            __pc=6     ;break;
          case 3     :
            //$LASTPOS=24001317;//kernel.Scheduler:1317
            t.steps();
            //$LASTPOS=24001391;//kernel.Scheduler:1391
            if (!(t.preempted)) { __pc=5     ; break; }
            //$LASTPOS=24001476;//kernel.Scheduler:1476
            _this.fiber$addToNext(_thread, t);
            __pc=4;return;
          case 4:
            
          case 5     :
            
          case 6     :
            
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=24001528;//kernel.Scheduler:1528
            _this.cur=_this.next;
            //$LASTPOS=24001543;//kernel.Scheduler:1543
            _this.next=[];
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"unschedule":{"nowait":false},"checkTimeout":{"nowait":false},"stepsAll":{"nowait":false}},"fields":{"cur":{},"next":{},"lastSteps":{}}}
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
      
      
      //$LASTPOS=25000078;//kernel.DialogMod:78
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
            //$LASTPOS=25000078;//kernel.DialogMod:78
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
      
      
      //$LASTPOS=25000173;//kernel.DialogMod:173
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
            //$LASTPOS=25000173;//kernel.DialogMod:173
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
      
      
      //$LASTPOS=25000255;//kernel.DialogMod:255
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
            //$LASTPOS=25000255;//kernel.DialogMod:255
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
      
      
      //$LASTPOS=25000333;//kernel.DialogMod:333
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
            //$LASTPOS=25000333;//kernel.DialogMod:333
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
  decls: {"methods":{"main":{"nowait":false},"prompt":{"nowait":false},"promptNumber":{"nowait":false},"confirm":{"nowait":false},"alert":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=26000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=26000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=26000239;//kernel.Keys:239
      //$LASTPOS=26000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=26000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=26000327;//kernel.Keys:327
      //$LASTPOS=26000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=26000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=26000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=26000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=26000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=26000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=26000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=26000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=26000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=26000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=26000787;//kernel.Keys:787
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=26000826;//kernel.Keys:826
        $(document).mouseup((function anonymous_846(e) {
          var a;
          
          //$LASTPOS=26000862;//kernel.Keys:862
          a = (function anonymous_868() {
            
            //$LASTPOS=26001035;//kernel.Keys:1035
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=26001080;//kernel.Keys:1080
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=26001146;//kernel.Keys:1146
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=26001221;//kernel.Keys:1221
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
      
      //$LASTPOS=26000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=26000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=26000239;//kernel.Keys:239
      //$LASTPOS=26000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=26000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=26000327;//kernel.Keys:327
      //$LASTPOS=26000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=26000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=26000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=26000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=26000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=26000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=26000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=26000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=26000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=26000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=26000787;//kernel.Keys:787
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=26000826;//kernel.Keys:826
        $(document).mouseup((function anonymous_846(e) {
          var a;
          
          //$LASTPOS=26000862;//kernel.Keys:862
          a = (function anonymous_868() {
            
            //$LASTPOS=26001035;//kernel.Keys:1035
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=26001080;//kernel.Keys:1080
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=26001146;//kernel.Keys:1146
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=26001221;//kernel.Keys:1221
            a();
            
          }
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26001278;//kernel.Keys:1278
      if (typeof  code=="string") {
        //$LASTPOS=26001316;//kernel.Keys:1316
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=26001360;//kernel.Keys:1360
      if (! code) {
        return 0;
      }
      //$LASTPOS=26001386;//kernel.Keys:1386
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=26001422;//kernel.Keys:1422
      if (! _this.stats[code]) {
        //$LASTPOS=26001440;//kernel.Keys:1440
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26001278;//kernel.Keys:1278
      if (typeof  code=="string") {
        //$LASTPOS=26001316;//kernel.Keys:1316
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=26001360;//kernel.Keys:1360
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=26001386;//kernel.Keys:1386
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=26001422;//kernel.Keys:1422
      if (! _this.stats[code]) {
        //$LASTPOS=26001440;//kernel.Keys:1440
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_181;
      
      //$LASTPOS=26001509;//kernel.Keys:1509
      _it_181=Tonyu.iterator(_this.stats,1);
      while(_it_181.next()) {
        i=_it_181[0];
        
        //$LASTPOS=26001541;//kernel.Keys:1541
        if (_this.stats[i]>0) {
          //$LASTPOS=26001558;//kernel.Keys:1558
          _this.stats[i]++;
          
        }
        //$LASTPOS=26001580;//kernel.Keys:1580
        if (_this.stats[i]==- 1) {
          //$LASTPOS=26001598;//kernel.Keys:1598
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=26001622;//kernel.Keys:1622
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=26001687;//kernel.Keys:1687
        _this.reservedAction.action();
        //$LASTPOS=26001721;//kernel.Keys:1721
        _this.reservedAction=null;
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_181;
      
      //$LASTPOS=26001509;//kernel.Keys:1509
      _it_181=Tonyu.iterator(_this.stats,1);
      while(_it_181.next()) {
        i=_it_181[0];
        
        //$LASTPOS=26001541;//kernel.Keys:1541
        if (_this.stats[i]>0) {
          //$LASTPOS=26001558;//kernel.Keys:1558
          _this.stats[i]++;
          
        }
        //$LASTPOS=26001580;//kernel.Keys:1580
        if (_this.stats[i]==- 1) {
          //$LASTPOS=26001598;//kernel.Keys:1598
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=26001622;//kernel.Keys:1622
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=26001687;//kernel.Keys:1687
        _this.reservedAction.action();
        //$LASTPOS=26001721;//kernel.Keys:1721
        _this.reservedAction=null;
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=26001772;//kernel.Keys:1772
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=26001801;//kernel.Keys:1801
      if (! s) {
        //$LASTPOS=26001820;//kernel.Keys:1820
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=26001852;//kernel.Keys:1852
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=26001772;//kernel.Keys:1772
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=26001801;//kernel.Keys:1801
      if (! s) {
        //$LASTPOS=26001820;//kernel.Keys:1820
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=26001852;//kernel.Keys:1852
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26001905;//kernel.Keys:1905
      _this.stats[e.keyCode]=0;
      //$LASTPOS=26001930;//kernel.Keys:1930
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26001905;//kernel.Keys:1905
      _this.stats[e.keyCode]=0;
      //$LASTPOS=26001930;//kernel.Keys:1930
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}},"fields":{"stats":{},"codes":{},"i":{},"lastMouseDown":{},"reservedAction":{}}}
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
      
      //$LASTPOS=27000226;//kernel.BaseActor:226
      if (Tonyu.runMode) {
        //$LASTPOS=27000245;//kernel.BaseActor:245
        _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      }
      //$LASTPOS=27000286;//kernel.BaseActor:286
      if (typeof  x=="object") {
        //$LASTPOS=27000310;//kernel.BaseActor:310
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=27000342;//kernel.BaseActor:342
        if (typeof  x=="number") {
          //$LASTPOS=27000377;//kernel.BaseActor:377
          _this.x=x;
          //$LASTPOS=27000396;//kernel.BaseActor:396
          _this.y=y;
          //$LASTPOS=27000415;//kernel.BaseActor:415
          _this.p=p;
          
        }
      }
      //$LASTPOS=27000437;//kernel.BaseActor:437
      _this.layer=_this.layer||Tonyu.globals.$mainLayer;
      //$LASTPOS=27000467;//kernel.BaseActor:467
      _this.crashScale=1;
      //$LASTPOS=27000486;//kernel.BaseActor:486
      if (_this.scaleX==null) {
        //$LASTPOS=27000504;//kernel.BaseActor:504
        _this.scaleX=1;
      }
      //$LASTPOS=27000519;//kernel.BaseActor:519
      if (_this.rotation==null) {
        //$LASTPOS=27000539;//kernel.BaseActor:539
        _this.rotation=0;
      }
      //$LASTPOS=27000601;//kernel.BaseActor:601
      if (_this.alpha==null) {
        //$LASTPOS=27000618;//kernel.BaseActor:618
        _this.alpha=255;
      }
      //$LASTPOS=27000634;//kernel.BaseActor:634
      if (_this.zOrder==null) {
        //$LASTPOS=27000652;//kernel.BaseActor:652
        _this.zOrder=0;
      }
      //$LASTPOS=27000667;//kernel.BaseActor:667
      if (_this.age==null) {
        //$LASTPOS=27000682;//kernel.BaseActor:682
        _this.age=0;
      }
      //$LASTPOS=27000694;//kernel.BaseActor:694
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=27000745;//kernel.BaseActor:745
        _this.animMode=true;
        //$LASTPOS=27000769;//kernel.BaseActor:769
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=27000803;//kernel.BaseActor:803
        _this.animMode=false;
        
      }
      //$LASTPOS=27000831;//kernel.BaseActor:831
      if (_this.animFps==null) {
        //$LASTPOS=27000850;//kernel.BaseActor:850
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
      
      //$LASTPOS=27000954;//kernel.BaseActor:954
      console.log.apply(console,arguments);
      //$LASTPOS=27000997;//kernel.BaseActor:997
      mergedArg = "";
      
      //$LASTPOS=27001020;//kernel.BaseActor:1020
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=27001048;//kernel.BaseActor:1048
        //$LASTPOS=27001052;//kernel.BaseActor:1052
        argCount = 0;
        for (; argCount<arguments.length ; argCount++) {
          {
            //$LASTPOS=27001119;//kernel.BaseActor:1119
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
        }
        //$LASTPOS=27001184;//kernel.BaseActor:1184
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=27001223;//kernel.BaseActor:1223
        //$LASTPOS=27001227;//kernel.BaseActor:1227
        printCount = 0;
        for (; printCount<_this.splits.length ; printCount++) {
          {
            //$LASTPOS=27001297;//kernel.BaseActor:1297
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=27001338;//kernel.BaseActor:1338
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=27001388;//kernel.BaseActor:1388
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27001511;//kernel.BaseActor:1511
      _this.animFps=f;
      //$LASTPOS=27001532;//kernel.BaseActor:1532
      _this.animFrame=0;
      //$LASTPOS=27001555;//kernel.BaseActor:1555
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27001605;//kernel.BaseActor:1605
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27001654;//kernel.BaseActor:1654
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27001696;//kernel.BaseActor:1696
      _this.onUpdate();
      //$LASTPOS=27001713;//kernel.BaseActor:1713
      if (null) {
        //$LASTPOS=27001736;//kernel.BaseActor:1736
        null.suspend();
        //$LASTPOS=27001764;//kernel.BaseActor:1764
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=27001780;//kernel.BaseActor:1780
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      } else {
        //$LASTPOS=27001834;//kernel.BaseActor:1834
        Tonyu.globals.$Scheduler.checkTimeout();
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27001696;//kernel.BaseActor:1696
      _this.onUpdate();
      //$LASTPOS=27001713;//kernel.BaseActor:1713
      if (_thread) {
        //$LASTPOS=27001736;//kernel.BaseActor:1736
        _thread.suspend();
        //$LASTPOS=27001764;//kernel.BaseActor:1764
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=27001780;//kernel.BaseActor:1780
          Tonyu.globals.$Scheduler.addToNext(_thread);
        }
        
      } else {
        //$LASTPOS=27001834;//kernel.BaseActor:1834
        Tonyu.globals.$Scheduler.checkTimeout();
        
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
      
      //$LASTPOS=27001924;//kernel.BaseActor:1924
      //$LASTPOS=27001928;//kernel.BaseActor:1928
      updateCount = 0;
      for (; updateCount<updateT ; updateCount++) {
        {
          //$LASTPOS=27001991;//kernel.BaseActor:1991
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
            //$LASTPOS=27001924;//kernel.BaseActor:1924
            //$LASTPOS=27001928;//kernel.BaseActor:1928
            updateCount = 0;
            
          case 1:
            if (!(updateCount<updateT)) { __pc=4     ; break; }
            //$LASTPOS=27001991;//kernel.BaseActor:1991
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3     :
            updateCount++;
            __pc=1;break;
          case 4     :
            
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
      
      //$LASTPOS=27002202;//kernel.BaseActor:2202
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=27002227;//kernel.BaseActor:2227
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=27002310;//kernel.BaseActor:2310
      _this.layer.sprites.forEach((function anonymous_2332(s) {
        
        //$LASTPOS=27002348;//kernel.BaseActor:2348
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=27002379;//kernel.BaseActor:2379
        if (! c||s instanceof c) {
          //$LASTPOS=27002420;//kernel.BaseActor:2420
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
      
      //$LASTPOS=27002500;//kernel.BaseActor:2500
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=27002525;//kernel.BaseActor:2525
      sp = _this;
      
      //$LASTPOS=27002562;//kernel.BaseActor:2562
      t1 = _this.getCrashRect();
      
      //$LASTPOS=27002590;//kernel.BaseActor:2590
      if (! t1) {
        return res;
      }
      //$LASTPOS=27002616;//kernel.BaseActor:2616
      _this.layer.sprites.forEach((function anonymous_2638(s) {
        var t2;
        
        
        //$LASTPOS=27002671;//kernel.BaseActor:2671
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=27002897;//kernel.BaseActor:2897
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27002977;//kernel.BaseActor:2977
      if (! t) {
        return false;
      }
      //$LASTPOS=27003004;//kernel.BaseActor:3004
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
      
      //$LASTPOS=27003127;//kernel.BaseActor:3127
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=27003167;//kernel.BaseActor:3167
      t1 = _this.getCrashRect();
      
      //$LASTPOS=27003195;//kernel.BaseActor:3195
      t2 = t.getCrashRect();
      
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_198;
      
      //$LASTPOS=27003504;//kernel.BaseActor:3504
      while (true) {
        //$LASTPOS=27003526;//kernel.BaseActor:3526
        if (typeof  d=="function") {
          //$LASTPOS=27003565;//kernel.BaseActor:3565
          _it_198=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_198.next()) {
            obj=_it_198[0];
            
            //$LASTPOS=27003607;//kernel.BaseActor:3607
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=27003664;//kernel.BaseActor:3664
          if (_this.crashTo(d)) {
            //$LASTPOS=27003693;//kernel.BaseActor:3693
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=27003738;//kernel.BaseActor:3738
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_198;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27003504;//kernel.BaseActor:3504
          case 1:
            //$LASTPOS=27003526;//kernel.BaseActor:3526
            if (!(typeof  d=="function")) { __pc=5     ; break; }
            //$LASTPOS=27003565;//kernel.BaseActor:3565
            _it_198=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_198.next())) { __pc=4     ; break; }
            obj=_it_198[0];
            
            //$LASTPOS=27003607;//kernel.BaseActor:3607
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            __pc=8     ;break;
          case 5     :
            //$LASTPOS=27003664;//kernel.BaseActor:3664
            if (!(_this.crashTo(d))) { __pc=7     ; break; }
            //$LASTPOS=27003693;//kernel.BaseActor:3693
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7     :
            
          case 8     :
            
            //$LASTPOS=27003738;//kernel.BaseActor:3738
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10    :
            
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
      
      //$LASTPOS=27003789;//kernel.BaseActor:3789
      actWidth = (_this.width||_this.radius*2)*_this.scaleX*_this.crashScale;
      
      //$LASTPOS=27003855;//kernel.BaseActor:3855
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=27003897;//kernel.BaseActor:3897
        actHeight=(_this.height||_this.radius*2)*_this.scaleX*_this.crashScale;
        
      } else {
        //$LASTPOS=27003966;//kernel.BaseActor:3966
        actHeight=(_this.height||_this.radius*2)*_this.scaleY*_this.crashScale;
        
      }
      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  actWidth=="number"&&typeof  actHeight=="number"&&{x: _this.x,y: _this.y,width: Math.abs(actWidth),height: Math.abs(actHeight)};
    },
    allWithin :function _trc_BaseActor_allWithin(t,distance) {
      "use strict";
      var _this=this;
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=27004256;//kernel.BaseActor:4256
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=27004281;//kernel.BaseActor:4281
      sp = _this;
      
      //$LASTPOS=27004318;//kernel.BaseActor:4318
      t1 = _this.getCrashRect();
      
      //$LASTPOS=27004346;//kernel.BaseActor:4346
      if (! t1) {
        return res;
      }
      //$LASTPOS=27004372;//kernel.BaseActor:4372
      _this.layer.sprites.forEach((function anonymous_4394(s) {
        var t2;
        
        
        //$LASTPOS=27004427;//kernel.BaseActor:4427
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=27004610;//kernel.BaseActor:4610
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27004697;//kernel.BaseActor:4697
      if (! t) {
        return false;
      }
      //$LASTPOS=27004723;//kernel.BaseActor:4723
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27004869;//kernel.BaseActor:4869
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=27004908;//kernel.BaseActor:4908
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_208;
      
      //$LASTPOS=27005078;//kernel.BaseActor:5078
      while (true) {
        //$LASTPOS=27005100;//kernel.BaseActor:5100
        if (typeof  d=="function") {
          //$LASTPOS=27005139;//kernel.BaseActor:5139
          _it_208=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_208.next()) {
            obj=_it_208[0];
            
            //$LASTPOS=27005213;//kernel.BaseActor:5213
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=27005251;//kernel.BaseActor:5251
          if (_this.within(d,r)) {
            //$LASTPOS=27005281;//kernel.BaseActor:5281
            f(d);
            
          }
        }
        //$LASTPOS=27005307;//kernel.BaseActor:5307
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_208;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27005078;//kernel.BaseActor:5078
          case 1:
            //$LASTPOS=27005100;//kernel.BaseActor:5100
            if (typeof  d=="function") {
              //$LASTPOS=27005139;//kernel.BaseActor:5139
              _it_208=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_208.next()) {
                obj=_it_208[0];
                
                //$LASTPOS=27005213;//kernel.BaseActor:5213
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=27005251;//kernel.BaseActor:5251
              if (_this.within(d,r)) {
                //$LASTPOS=27005281;//kernel.BaseActor:5281
                f(d);
                
              }
            }
            //$LASTPOS=27005307;//kernel.BaseActor:5307
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    watchHit :function _trc_BaseActor_watchHit(typeA,typeB,onHit) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27005371;//kernel.BaseActor:5371
      _this.layer.watchHit(typeA,typeB,(function anonymous_5401(a,b) {
        
        //$LASTPOS=27005419;//kernel.BaseActor:5419
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
      
      //$LASTPOS=27005573;//kernel.BaseActor:5573
      _this.killThreadGroup();
      //$LASTPOS=27005597;//kernel.BaseActor:5597
      _this.hide();
      //$LASTPOS=27005610;//kernel.BaseActor:5610
      _this.fireEvent("die");
      //$LASTPOS=27005633;//kernel.BaseActor:5633
      _this._isDead=true;
      //$LASTPOS=27005652;//kernel.BaseActor:5652
      if (_this._poolArray) {
        //$LASTPOS=27005679;//kernel.BaseActor:5679
        _this._poolArray.push(_this);
        //$LASTPOS=27005711;//kernel.BaseActor:5711
        _this.objectPoolAge=(_this.objectPoolAge||0)+1;
        
      }
    },
    hide :function _trc_BaseActor_hide() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27005780;//kernel.BaseActor:5780
      _this.layer.remove(_this);
    },
    show :function _trc_BaseActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27005831;//kernel.BaseActor:5831
      _this.layer.add(_this);
      //$LASTPOS=27005853;//kernel.BaseActor:5853
      if (x!=null) {
        //$LASTPOS=27005866;//kernel.BaseActor:5866
        _this.x=x;
      }
      //$LASTPOS=27005881;//kernel.BaseActor:5881
      if (y!=null) {
        //$LASTPOS=27005894;//kernel.BaseActor:5894
        _this.y=y;
      }
      //$LASTPOS=27005909;//kernel.BaseActor:5909
      if (p!=null) {
        //$LASTPOS=27005922;//kernel.BaseActor:5922
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27005967;//kernel.BaseActor:5967
      if (typeof  _this.p!="number") {
        //$LASTPOS=27006002;//kernel.BaseActor:6002
        _this.p=0;
        
      }
      //$LASTPOS=27006019;//kernel.BaseActor:6019
      _this.p=Math.floor(_this.p);
      //$LASTPOS=27006041;//kernel.BaseActor:6041
      _this.pImg=Tonyu.globals.$imageList[_this.p];
      //$LASTPOS=27006066;//kernel.BaseActor:6066
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=27006090;//kernel.BaseActor:6090
      _this.width=_this.pImg.width;
      //$LASTPOS=27006113;//kernel.BaseActor:6113
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
      
      //$LASTPOS=27006210;//kernel.BaseActor:6210
      _this.age++;
      //$LASTPOS=27006222;//kernel.BaseActor:6222
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=27006263;//kernel.BaseActor:6263
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=27006303;//kernel.BaseActor:6303
        _this.animFrame++;
        
      }
    },
    performTransform :function _trc_BaseActor_performTransform(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27006364;//kernel.BaseActor:6364
      if (_this.x!==_this.x||_this.y!==_this.y||_this.x==null||_this.y==null) {
        
        
      }
      //$LASTPOS=27006493;//kernel.BaseActor:6493
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=27006518;//kernel.BaseActor:6518
      if (_this.rotation!=0) {
        //$LASTPOS=27006549;//kernel.BaseActor:6549
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=27006609;//kernel.BaseActor:6609
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=27006658;//kernel.BaseActor:6658
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=27006706;//kernel.BaseActor:6706
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=27006763;//kernel.BaseActor:6763
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=27006811;//kernel.BaseActor:6811
      ctx.globalAlpha=_this.alpha/255;
    },
    draw :function _trc_BaseActor_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=27006872;//kernel.BaseActor:6872
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=27006925;//kernel.BaseActor:6925
      if (_this.text!=null) {
        //$LASTPOS=27006952;//kernel.BaseActor:6952
        splitsText = (_this.text+"").split("\n");
        
        //$LASTPOS=27006999;//kernel.BaseActor:6999
        _this.drawY=_this.y;
        //$LASTPOS=27007017;//kernel.BaseActor:7017
        if (! _this.size) {
          //$LASTPOS=27007028;//kernel.BaseActor:7028
          _this.size=15;
        }
        //$LASTPOS=27007046;//kernel.BaseActor:7046
        if (! _this.align) {
          //$LASTPOS=27007058;//kernel.BaseActor:7058
          _this.align="center";
        }
        //$LASTPOS=27007083;//kernel.BaseActor:7083
        if (! _this.fillStyle) {
          //$LASTPOS=27007099;//kernel.BaseActor:7099
          _this.fillStyle="white";
        }
        //$LASTPOS=27007127;//kernel.BaseActor:7127
        if (_this.font) {
          //$LASTPOS=27007137;//kernel.BaseActor:7137
          ctx.font=_this.size+"px "+_this.font;
        }
        //$LASTPOS=27007172;//kernel.BaseActor:7172
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=27007206;//kernel.BaseActor:7206
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=27007247;//kernel.BaseActor:7247
        _this.height=0;
        //$LASTPOS=27007256;//kernel.BaseActor:7256
        _this.width=0;
        //$LASTPOS=27007274;//kernel.BaseActor:7274
        //$LASTPOS=27007278;//kernel.BaseActor:7278
        textCount = 0;
        for (; textCount<splitsText.length ; textCount++) {
          {
            //$LASTPOS=27007349;//kernel.BaseActor:7349
            rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
            
            //$LASTPOS=27007445;//kernel.BaseActor:7445
            if (_this.width<rect.w) {
              //$LASTPOS=27007462;//kernel.BaseActor:7462
              _this.width=rect.w;
            }
            //$LASTPOS=27007489;//kernel.BaseActor:7489
            _this.height+=rect.h;
            //$LASTPOS=27007518;//kernel.BaseActor:7518
            _this.drawY+=_this.size;
          }
        }
        
      } else {
        //$LASTPOS=27007554;//kernel.BaseActor:7554
        if (_this.fillStyle!=null) {
          //$LASTPOS=27007586;//kernel.BaseActor:7586
          ctx.save();
          //$LASTPOS=27007607;//kernel.BaseActor:7607
          _this.performTransform(ctx);
          //$LASTPOS=27007639;//kernel.BaseActor:7639
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=27007673;//kernel.BaseActor:7673
          if (_this.radius) {
            //$LASTPOS=27007700;//kernel.BaseActor:7700
            ctx.beginPath();
            //$LASTPOS=27007730;//kernel.BaseActor:7730
            ctx.arc(0,0,_this.radius,0,2*Math.PI);
            //$LASTPOS=27007776;//kernel.BaseActor:7776
            ctx.fill();
            
          } else {
            //$LASTPOS=27007819;//kernel.BaseActor:7819
            ctx.fillRect(- _this.width/2,- _this.height/2,_this.width,_this.height);
            
          }
          //$LASTPOS=27007886;//kernel.BaseActor:7886
          ctx.restore();
          
        } else {
          //$LASTPOS=27007924;//kernel.BaseActor:7924
          _this.detectShape();
          //$LASTPOS=27007948;//kernel.BaseActor:7948
          if (_this.pImg) {
            //$LASTPOS=27007973;//kernel.BaseActor:7973
            _this._animation();
            //$LASTPOS=27008000;//kernel.BaseActor:8000
            ctx.save();
            //$LASTPOS=27008025;//kernel.BaseActor:8025
            _this.performTransform(ctx);
            //$LASTPOS=27008061;//kernel.BaseActor:8061
            ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
            //$LASTPOS=27008205;//kernel.BaseActor:8205
            ctx.restore();
            
          }
          
        }
      }
      //$LASTPOS=27008243;//kernel.BaseActor:8243
      if (_this._fukidashi) {
        //$LASTPOS=27008270;//kernel.BaseActor:8270
        if (_this._fukidashi.c>0) {
          //$LASTPOS=27008305;//kernel.BaseActor:8305
          _this._fukidashi.c--;
          //$LASTPOS=27008334;//kernel.BaseActor:8334
          ctx.fillStyle="white";
          //$LASTPOS=27008370;//kernel.BaseActor:8370
          ctx.strokeStyle="black";
          //$LASTPOS=27008408;//kernel.BaseActor:8408
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27008536;//kernel.BaseActor:8536
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=27008608;//kernel.BaseActor:8608
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27008536;//kernel.BaseActor:8536
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=27008608;//kernel.BaseActor:8608
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      "use strict";
      var _this=this;
      var cp;
      
      //$LASTPOS=27008690;//kernel.BaseActor:8690
      if (! a) {
        //$LASTPOS=27008698;//kernel.BaseActor:8698
        a=0;
      }
      //$LASTPOS=27008724;//kernel.BaseActor:8724
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      return _this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));
    },
    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cp;
      
      //$LASTPOS=27008690;//kernel.BaseActor:8690
      if (! a) {
        //$LASTPOS=27008698;//kernel.BaseActor:8698
        a=0;
      }
      //$LASTPOS=27008724;//kernel.BaseActor:8724
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      _thread.retVal=_this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27009182;//kernel.BaseActor:9182
      while (true) {
        //$LASTPOS=27009204;//kernel.BaseActor:9204
        while (true) {
          //$LASTPOS=27009230;//kernel.BaseActor:9230
          if (_this.screenOut()>d) {
            //$LASTPOS=27009266;//kernel.BaseActor:9266
            f();
            break;
            
            
          }
          //$LASTPOS=27009323;//kernel.BaseActor:9323
          _this.update();
          
        }
        //$LASTPOS=27009353;//kernel.BaseActor:9353
        while (true) {
          //$LASTPOS=27009379;//kernel.BaseActor:9379
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=27009451;//kernel.BaseActor:9451
          _this.update();
          
        }
        //$LASTPOS=27009481;//kernel.BaseActor:9481
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
            //$LASTPOS=27009182;//kernel.BaseActor:9182
          case 1:
            //$LASTPOS=27009204;//kernel.BaseActor:9204
          case 2:
            //$LASTPOS=27009230;//kernel.BaseActor:9230
            if (!(_this.screenOut()>d)) { __pc=3     ; break; }
            //$LASTPOS=27009266;//kernel.BaseActor:9266
            f();
            __pc=5     ; break;
            
          case 3     :
            
            //$LASTPOS=27009323;//kernel.BaseActor:9323
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5     :
            
            //$LASTPOS=27009353;//kernel.BaseActor:9353
          case 6:
            //$LASTPOS=27009379;//kernel.BaseActor:9379
            if (!(_this.screenOut()<=d)) { __pc=7     ; break; }
            __pc=9     ; break;
            
          case 7     :
            
            //$LASTPOS=27009451;//kernel.BaseActor:9451
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9     :
            
            //$LASTPOS=27009481;//kernel.BaseActor:9481
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            __pc=1;break;
          case 11    :
            
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
      
      //$LASTPOS=27009521;//kernel.BaseActor:9521
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=27009563;//kernel.BaseActor:9563
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
      
      //$LASTPOS=27009521;//kernel.BaseActor:9521
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=27009563;//kernel.BaseActor:9563
      files = d.rel("files/");
      
      _thread.retVal=files.rel(path).setPolicy({topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27009672;//kernel.BaseActor:9672
      _this.runAsync((function anonymous_9681(f) {
        
        //$LASTPOS=27009696;//kernel.BaseActor:9696
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
            //$LASTPOS=27009672;//kernel.BaseActor:9672
            _this.fiber$runAsync(_thread, (function anonymous_9681(f) {
              
              //$LASTPOS=27009696;//kernel.BaseActor:9696
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
      
      //$LASTPOS=27009942;//kernel.BaseActor:9942
      Tonyu.globals.$Boot.loadPage.apply(Tonyu.globals.$Boot,arguments);
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27010067;//kernel.BaseActor:10067
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27010067;//kernel.BaseActor:10067
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    __setter__useObjectPool :function _trc_BaseActor___setter__useObjectPool(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27010116;//kernel.BaseActor:10116
      if (value) {
        //$LASTPOS=27010138;//kernel.BaseActor:10138
        _this._poolArray=Tonyu.globals.$ObjectPool.poolList(_this.getClassInfo().fullName);
        
      }
    },
    appear :function _trc_BaseActor_appear(o,param) {
      "use strict";
      var _this=this;
      var p;
      var k;
      var _it_220;
      
      //$LASTPOS=27010231;//kernel.BaseActor:10231
      if (typeof  o=="function") {
        //$LASTPOS=27010268;//kernel.BaseActor:10268
        if (param) {
          //$LASTPOS=27010281;//kernel.BaseActor:10281
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=27010324;//kernel.BaseActor:10324
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=27010378;//kernel.BaseActor:10378
        if (p) {
          //$LASTPOS=27010397;//kernel.BaseActor:10397
          _it_220=Tonyu.iterator(Object.keys(p),1);
          while(_it_220.next()) {
            k=_it_220[0];
            
            //$LASTPOS=27010442;//kernel.BaseActor:10442
            if (k!="objectPoolAge") {
              //$LASTPOS=27010466;//kernel.BaseActor:10466
              delete p[k];
            }
            
          }
          //$LASTPOS=27010495;//kernel.BaseActor:10495
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
      var _it_220;
      
      //$LASTPOS=27010231;//kernel.BaseActor:10231
      if (typeof  o=="function") {
        //$LASTPOS=27010268;//kernel.BaseActor:10268
        if (param) {
          //$LASTPOS=27010281;//kernel.BaseActor:10281
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=27010324;//kernel.BaseActor:10324
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=27010378;//kernel.BaseActor:10378
        if (p) {
          //$LASTPOS=27010397;//kernel.BaseActor:10397
          _it_220=Tonyu.iterator(Object.keys(p),1);
          while(_it_220.next()) {
            k=_it_220[0];
            
            //$LASTPOS=27010442;//kernel.BaseActor:10442
            if (k!="objectPoolAge") {
              //$LASTPOS=27010466;//kernel.BaseActor:10466
              delete p[k];
            }
            
          }
          //$LASTPOS=27010495;//kernel.BaseActor:10495
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
      
      //$LASTPOS=27010646;//kernel.BaseActor:10646
      if (null) {
        //$LASTPOS=27010669;//kernel.BaseActor:10669
        null.suspend();
        //$LASTPOS=27010697;//kernel.BaseActor:10697
        if (t) {
          //$LASTPOS=27010719;//kernel.BaseActor:10719
          null.waitCount=t;
          //$LASTPOS=27010753;//kernel.BaseActor:10753
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=27010769;//kernel.BaseActor:10769
            Tonyu.globals.$Scheduler.addToNext(null);
          }
          
        }
        
      } else {
        //$LASTPOS=27010823;//kernel.BaseActor:10823
        if (_this._th) {
          //$LASTPOS=27010843;//kernel.BaseActor:10843
          if (t) {
            //$LASTPOS=27010865;//kernel.BaseActor:10865
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=27010913;//kernel.BaseActor:10913
            if (_this._th.scheduled) {
              //$LASTPOS=27010932;//kernel.BaseActor:10932
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
      
      //$LASTPOS=27010646;//kernel.BaseActor:10646
      if (_thread) {
        //$LASTPOS=27010669;//kernel.BaseActor:10669
        _thread.suspend();
        //$LASTPOS=27010697;//kernel.BaseActor:10697
        if (t) {
          //$LASTPOS=27010719;//kernel.BaseActor:10719
          _thread.waitCount=t;
          //$LASTPOS=27010753;//kernel.BaseActor:10753
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=27010769;//kernel.BaseActor:10769
            Tonyu.globals.$Scheduler.addToNext(_thread);
          }
          
        }
        
      } else {
        //$LASTPOS=27010823;//kernel.BaseActor:10823
        if (_this._th) {
          //$LASTPOS=27010843;//kernel.BaseActor:10843
          if (t) {
            //$LASTPOS=27010865;//kernel.BaseActor:10865
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=27010913;//kernel.BaseActor:10913
            if (_this._th.scheduled) {
              //$LASTPOS=27010932;//kernel.BaseActor:10932
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
      
      //$LASTPOS=27011009;//kernel.BaseActor:11009
      if (_this._th) {
        //$LASTPOS=27011029;//kernel.BaseActor:11029
        if (_this._th.scheduled) {
          //$LASTPOS=27011064;//kernel.BaseActor:11064
          _this._th.waitCount=0;
          
        } else {
          //$LASTPOS=27011112;//kernel.BaseActor:11112
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=27011128;//kernel.BaseActor:11128
            Tonyu.globals.$Scheduler.addToCur(_this._th);
          }
          
        }
        
      }
    },
    findTouch :function _trc_BaseActor_findTouch(params) {
      "use strict";
      var _this=this;
      var r;
      var t;
      var _it_224;
      
      //$LASTPOS=27011209;//kernel.BaseActor:11209
      if (typeof  params==="number") {
        //$LASTPOS=27011239;//kernel.BaseActor:11239
        params={scale: params};
      }
      //$LASTPOS=27011267;//kernel.BaseActor:11267
      params=params||{};
      //$LASTPOS=27011291;//kernel.BaseActor:11291
      params.scale=params.scale||2;
      //$LASTPOS=27011326;//kernel.BaseActor:11326
      r = _this.getCrashRect();
      
      //$LASTPOS=27011353;//kernel.BaseActor:11353
      if (! r) {
        return null;
      }
      //$LASTPOS=27011379;//kernel.BaseActor:11379
      r.width*=params.scale;
      //$LASTPOS=27011407;//kernel.BaseActor:11407
      r.height*=params.scale;
      //$LASTPOS=27011436;//kernel.BaseActor:11436
      _it_224=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_224.next()) {
        t=_it_224[0];
        
        //$LASTPOS=27011471;//kernel.BaseActor:11471
        if (params.pickup||t.touched==1) {
          //$LASTPOS=27011521;//kernel.BaseActor:11521
          if (Math.abs(r.x-t.x)<r.width/2&&Math.abs(r.y-t.y)<r.height/2) {
            return t;
            
          }
          
        }
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"isDead":{"nowait":true},"_animation":{"nowait":true},"performTransform":{"nowait":true},"draw":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"color":{"nowait":true},"loadPage":{"nowait":true},"setVisible":{"nowait":false},"__setter__useObjectPool":{"nowait":true},"appear":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":true},"findTouch":{"nowait":true}},"fields":{"_th":{},"layer":{},"crashScale":{},"scaleX":{},"rotation":{},"alpha":{},"zOrder":{},"age":{},"anim":{},"animMode":{},"animFrame":{},"animFps":{},"splits":{},"width":{},"radius":{},"scaleY":{},"height":{},"_isDead":{},"_poolArray":{},"objectPoolAge":{},"p":{},"pImg":{},"_isInvisible":{},"text":{},"drawY":{},"size":{},"align":{},"fillStyle":{},"font":{},"_fukidashi":{},"getClassInfo":{}}}
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
      
      //$LASTPOS=28000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_145() {
        
        //$LASTPOS=28000161;//kernel.CrashToHandler:161
        retThread.kill();
      })};
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28000221;//kernel.CrashToHandler:221
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=28000240;//kernel.CrashToHandler:240
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
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
      
      //$LASTPOS=29000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=29000061;//kernel.NoviceActor:61
        n=1;
      }
      //$LASTPOS=29000071;//kernel.NoviceActor:71
      //$LASTPOS=29000075;//kernel.NoviceActor:75
      n;for (; n>0 ; n--) {
        //$LASTPOS=29000086;//kernel.NoviceActor:86
        _this.update();
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=29000061;//kernel.NoviceActor:61
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000071;//kernel.NoviceActor:71
            //$LASTPOS=29000075;//kernel.NoviceActor:75
            n;
          case 1:
            if (!(n>0)) { __pc=4     ; break; }
            //$LASTPOS=29000086;//kernel.NoviceActor:86
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3     :
            n--;
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprite :function _trc_NoviceActor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=29000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=29000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=29000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=29000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=29000282;//kernel.NoviceActor:282
        size=15;
      }
      //$LASTPOS=29000296;//kernel.NoviceActor:296
      _this.initSprite();
      //$LASTPOS=29000315;//kernel.NoviceActor:315
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=29000282;//kernel.NoviceActor:282
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000296;//kernel.NoviceActor:296
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=29000315;//kernel.NoviceActor:315
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000390;//kernel.NoviceActor:390
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
            //$LASTPOS=29000390;//kernel.NoviceActor:390
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
      
      //$LASTPOS=29000425;//kernel.NoviceActor:425
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000465;//kernel.NoviceActor:465
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
      
      //$LASTPOS=29000564;//kernel.NoviceActor:564
      _this.initSprite();
      //$LASTPOS=29000583;//kernel.NoviceActor:583
      _this._sprite.x=x;
      //$LASTPOS=29000601;//kernel.NoviceActor:601
      _this._sprite.y=y;
      //$LASTPOS=29000619;//kernel.NoviceActor:619
      if (p!=null) {
        //$LASTPOS=29000632;//kernel.NoviceActor:632
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
            //$LASTPOS=29000564;//kernel.NoviceActor:564
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=29000583;//kernel.NoviceActor:583
            _this._sprite.x=x;
            //$LASTPOS=29000601;//kernel.NoviceActor:601
            _this._sprite.y=y;
            //$LASTPOS=29000619;//kernel.NoviceActor:619
            if (p!=null) {
              //$LASTPOS=29000632;//kernel.NoviceActor:632
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
      
      //$LASTPOS=29000684;//kernel.NoviceActor:684
      _this.initSprite();
      //$LASTPOS=29000703;//kernel.NoviceActor:703
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
            //$LASTPOS=29000684;//kernel.NoviceActor:684
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=29000703;//kernel.NoviceActor:703
            _this._sprite.p=p;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}},"fields":{"_sprite":{}}}
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
      
      //$LASTPOS=30000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=30000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=30000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=30000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=30000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=30000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=30000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=30000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=30000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_229;
      
      //$LASTPOS=30000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=30000343;//kernel.PlayMod:343
        _it_229=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_229.next()) {
          k=_it_229[0];
          v=_it_229[1];
          
          //$LASTPOS=30000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=30000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=30000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=30000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=30000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      "use strict";
      var _this=this;
      var mmls;
      var i;
      
      //$LASTPOS=30000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=30000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=30000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=30000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=30000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=30000647;//kernel.PlayMod:647
      //$LASTPOS=30000652;//kernel.PlayMod:652
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=30000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=30000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=30000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=30000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=30000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=30000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=30000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=30000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=30000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=30000647;//kernel.PlayMod:647
      //$LASTPOS=30000652;//kernel.PlayMod:652
      i = 0;
      for (; i<_arguments.length ; i++) {
        {
          //$LASTPOS=30000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
      }
      //$LASTPOS=30000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3     ; break; }
            //$LASTPOS=30000796;//kernel.PlayMod:796
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
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
      
      //$LASTPOS=30000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=30000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      
      //$LASTPOS=30000897;//kernel.PlayMod:897
      mmls = [];
      
      //$LASTPOS=30000915;//kernel.PlayMod:915
      //$LASTPOS=30000920;//kernel.PlayMod:920
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=30000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=30001002;//kernel.PlayMod:1002
      mml.play(mmls);
      return mml;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}},"fields":{"mmlInited":{},"_mml":{}}}
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
      
      //$LASTPOS=31000049;//kernel.ParallelMod:49
      args = [];
      
      //$LASTPOS=31000068;//kernel.ParallelMod:68
      //$LASTPOS=31000073;//kernel.ParallelMod:73
      i = 1;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=31000119;//kernel.ParallelMod:119
          args.push(arguments[i]);
        }
      }
      //$LASTPOS=31000158;//kernel.ParallelMod:158
      name = arguments[0];
      
      
      //$LASTPOS=31000201;//kernel.ParallelMod:201
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
      
      //$LASTPOS=31000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=31000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=31000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=31000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=31000379;//kernel.ParallelMod:379
      if (! f) {
        throw new Error("メソッド"+n+"が見つかりません");
        
        
      }
      //$LASTPOS=31000448;//kernel.ParallelMod:448
      ag2 = a.toArray();
      
      //$LASTPOS=31000474;//kernel.ParallelMod:474
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
      
      //$LASTPOS=31000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=31000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=31000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=31000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=31000379;//kernel.ParallelMod:379
      if (! f) {
        throw new Error("メソッド"+n+"が見つかりません");
        
        
      }
      //$LASTPOS=31000448;//kernel.ParallelMod:448
      ag2 = a.toArray();
      
      //$LASTPOS=31000474;//kernel.ParallelMod:474
      ag2.unshift(_thread);
      _thread.retVal=f.apply(t,ag2);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"parallel":{"nowait":true},"call":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=32000088;//kernel.Actor:88
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=32000107;//kernel.Actor:107
      if (Tonyu.runMode) {
        //$LASTPOS=32000126;//kernel.Actor:126
        _this.initSprite();
      }
    },
    initSprite :function _trc_Actor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=32000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=32000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=32000287;//kernel.Actor:287
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=32000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=32000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32000287;//kernel.Actor:287
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    changeLayer :function _trc_Actor_changeLayer(l) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000326;//kernel.Actor:326
      if (typeof  l.add!=="function") {
        return _this;
      }
      //$LASTPOS=32000370;//kernel.Actor:370
      if (_this.layer) {
        //$LASTPOS=32000381;//kernel.Actor:381
        _this.layer.remove(_this);
      }
      //$LASTPOS=32000406;//kernel.Actor:406
      l.add(_this);
      //$LASTPOS=32000424;//kernel.Actor:424
      _this.layer=l;
    },
    fiber$changeLayer :function _trc_Actor_f_changeLayer(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000326;//kernel.Actor:326
      if (typeof  l.add!=="function") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=32000370;//kernel.Actor:370
      if (_this.layer) {
        //$LASTPOS=32000381;//kernel.Actor:381
        _this.layer.remove(_this);
      }
      //$LASTPOS=32000406;//kernel.Actor:406
      l.add(_this);
      //$LASTPOS=32000424;//kernel.Actor:424
      _this.layer=l;
      
      _thread.retVal=_this;return;
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"changeLayer":{"nowait":false},"onAppear":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=33000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=33000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=33000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=33000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=33000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=33000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=33000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=33000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=33000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=33000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=33000655;//kernel.GameScreen:655
      b = _this.bounds;
      
      //$LASTPOS=33000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=33000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=33000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=33000859;//kernel.GameScreen:859
      b = _this.bounds;
      
      //$LASTPOS=33000878;//kernel.GameScreen:878
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
      
      //$LASTPOS=33000859;//kernel.GameScreen:859
      b = _this.bounds;
      
      //$LASTPOS=33000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=33001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=33001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=33001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=33001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=33001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=33001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=33001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=33001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=33001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=33001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"setBounds":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}},"fields":{"isDrawGrid":{},"buf":{},"ctx":{},"bounds":{},"sprites":{},"bgColor":{}}}
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
      
      //$LASTPOS=34000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=34000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=34000082;//kernel.Map:82
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=34000101;//kernel.Map:101
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=34000173;//kernel.Map:173
      _this.mapObj=true;
      //$LASTPOS=34000191;//kernel.Map:191
      _this.mapTable=[];
      //$LASTPOS=34000211;//kernel.Map:211
      _this.mapOnTable=[];
      //$LASTPOS=34000233;//kernel.Map:233
      //$LASTPOS=34000237;//kernel.Map:237
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=34000266;//kernel.Map:266
          _this.rows=[];
          //$LASTPOS=34000286;//kernel.Map:286
          //$LASTPOS=34000290;//kernel.Map:290
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=34000323;//kernel.Map:323
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=34000358;//kernel.Map:358
          _this.mapTable.push(_this.rows);
        }
      }
      //$LASTPOS=34000391;//kernel.Map:391
      //$LASTPOS=34000395;//kernel.Map:395
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=34000424;//kernel.Map:424
          _this.rows=[];
          //$LASTPOS=34000444;//kernel.Map:444
          //$LASTPOS=34000448;//kernel.Map:448
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=34000481;//kernel.Map:481
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=34000516;//kernel.Map:516
          _this.mapOnTable.push(_this.rows);
        }
      }
      //$LASTPOS=34000616;//kernel.Map:616
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=34000648;//kernel.Map:648
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=34000674;//kernel.Map:674
      //$LASTPOS=34000678;//kernel.Map:678
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=34000707;//kernel.Map:707
          //$LASTPOS=34000711;//kernel.Map:711
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=34000744;//kernel.Map:744
              _this.set(j,i,_this.mapData[i][j]);
            }
          }
        }
      }
      //$LASTPOS=34000791;//kernel.Map:791
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=34000819;//kernel.Map:819
      //$LASTPOS=34000823;//kernel.Map:823
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=34000852;//kernel.Map:852
          //$LASTPOS=34000856;//kernel.Map:856
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=34000889;//kernel.Map:889
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
      
      //$LASTPOS=34000648;//kernel.Map:648
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000674;//kernel.Map:674
            //$LASTPOS=34000678;//kernel.Map:678
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7     ; break; }
            //$LASTPOS=34000707;//kernel.Map:707
            //$LASTPOS=34000711;//kernel.Map:711
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5     ; break; }
            //$LASTPOS=34000744;//kernel.Map:744
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
          case 4     :
            j++;
            __pc=2;break;
          case 5     :
            
          case 6     :
            i++;
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=34000791;//kernel.Map:791
            if (!(! _this.mapOnData)) { __pc=8     ; break; }
            _thread.exit(_this);return;
          case 8     :
            
            //$LASTPOS=34000819;//kernel.Map:819
            //$LASTPOS=34000823;//kernel.Map:823
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15    ; break; }
            //$LASTPOS=34000852;//kernel.Map:852
            //$LASTPOS=34000856;//kernel.Map:856
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13    ; break; }
            //$LASTPOS=34000889;//kernel.Map:889
            _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);
            __pc=11;return;
          case 11:
            
          case 12    :
            j++;
            __pc=10;break;
          case 13    :
            
          case 14    :
            i++;
            __pc=9;break;
          case 15    :
            
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
      
      //$LASTPOS=34000958;//kernel.Map:958
      if (! _this.mapTable) {
        return _this;
      }
      //$LASTPOS=34000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=34001057;//kernel.Map:1057
      //$LASTPOS=34001061;//kernel.Map:1061
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=34001090;//kernel.Map:1090
          //$LASTPOS=34001094;//kernel.Map:1094
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=34001127;//kernel.Map:1127
              _this.set(j,i,_this.mapTable[i][j]);
            }
          }
        }
      }
      //$LASTPOS=34001175;//kernel.Map:1175
      if (! _this.mapOnTable) {
        return _this;
      }
      //$LASTPOS=34001204;//kernel.Map:1204
      //$LASTPOS=34001208;//kernel.Map:1208
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=34001237;//kernel.Map:1237
          //$LASTPOS=34001241;//kernel.Map:1241
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=34001274;//kernel.Map:1274
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
      
      //$LASTPOS=34000958;//kernel.Map:958
      if (! _this.mapTable) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=34000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_redrawMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34001057;//kernel.Map:1057
            //$LASTPOS=34001061;//kernel.Map:1061
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7     ; break; }
            //$LASTPOS=34001090;//kernel.Map:1090
            //$LASTPOS=34001094;//kernel.Map:1094
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5     ; break; }
            //$LASTPOS=34001127;//kernel.Map:1127
            _this.fiber$set(_thread, j, i, _this.mapTable[i][j]);
            __pc=3;return;
          case 3:
            
          case 4     :
            j++;
            __pc=2;break;
          case 5     :
            
          case 6     :
            i++;
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=34001175;//kernel.Map:1175
            if (!(! _this.mapOnTable)) { __pc=8     ; break; }
            _thread.exit(_this);return;
          case 8     :
            
            //$LASTPOS=34001204;//kernel.Map:1204
            //$LASTPOS=34001208;//kernel.Map:1208
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15    ; break; }
            //$LASTPOS=34001237;//kernel.Map:1237
            //$LASTPOS=34001241;//kernel.Map:1241
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13    ; break; }
            //$LASTPOS=34001274;//kernel.Map:1274
            _this.fiber$setOn(_thread, j, i, _this.mapOnTable[i][j]);
            __pc=11;return;
          case 11:
            
          case 12    :
            j++;
            __pc=10;break;
          case 13    :
            
          case 14    :
            i++;
            __pc=9;break;
          case 15    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    load :function _trc_Map_load(dataFile) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=34001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=34001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=34001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=34001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=34001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=34001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=34001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=34001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=34001612;//kernel.Map:1612
      if (! _this.chipWidth&&typeof  _this.baseData[2]=="number") {
        //$LASTPOS=34001660;//kernel.Map:1660
        _this.chipWidth=_this.baseData[2];
      }
      //$LASTPOS=34001688;//kernel.Map:1688
      if (! _this.chipHeight&&typeof  _this.baseData[3]=="number") {
        //$LASTPOS=34001737;//kernel.Map:1737
        _this.chipHeight=_this.baseData[3];
      }
      //$LASTPOS=34001766;//kernel.Map:1766
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=34001838;//kernel.Map:1838
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=34001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=34001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=34001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=34001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=34001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=34001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=34001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=34001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=34001612;//kernel.Map:1612
      if (! _this.chipWidth&&typeof  _this.baseData[2]=="number") {
        //$LASTPOS=34001660;//kernel.Map:1660
        _this.chipWidth=_this.baseData[2];
      }
      //$LASTPOS=34001688;//kernel.Map:1688
      if (! _this.chipHeight&&typeof  _this.baseData[3]=="number") {
        //$LASTPOS=34001737;//kernel.Map:1737
        _this.chipHeight=_this.baseData[3];
      }
      //$LASTPOS=34001766;//kernel.Map:1766
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34001838;//kernel.Map:1838
            _this.fiber$initMap(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    save :function _trc_Map_save(saveFileName) {
      "use strict";
      var _this=this;
      var saveDataFile;
      var data;
      
      //$LASTPOS=34001880;//kernel.Map:1880
      saveDataFile = _this.file("../maps/").rel(saveFileName);
      
      //$LASTPOS=34001938;//kernel.Map:1938
      data = [_this.mapTable,_this.mapOnTable,_this.chipWidth,_this.chipHeight];
      
      //$LASTPOS=34001996;//kernel.Map:1996
      saveDataFile.obj(data);
    },
    fiber$save :function _trc_Map_f_save(_thread,saveFileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var saveDataFile;
      var data;
      
      //$LASTPOS=34001880;//kernel.Map:1880
      saveDataFile = _this.file("../maps/").rel(saveFileName);
      
      //$LASTPOS=34001938;//kernel.Map:1938
      data = [_this.mapTable,_this.mapOnTable,_this.chipWidth,_this.chipHeight];
      
      //$LASTPOS=34001996;//kernel.Map:1996
      saveDataFile.obj(data);
      
      _thread.retVal=_this;return;
    },
    set :function _trc_Map_set(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34002052;//kernel.Map:2052
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=34002120;//kernel.Map:2120
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=34002191;//kernel.Map:2191
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=34002225;//kernel.Map:2225
      p=Math.floor(p);
      //$LASTPOS=34002247;//kernel.Map:2247
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=34002272;//kernel.Map:2272
      if (! _this.pImg) {
        //$LASTPOS=34002294;//kernel.Map:2294
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=34002395;//kernel.Map:2395
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=34002472;//kernel.Map:2472
      _this.ctx.save();
      //$LASTPOS=34002489;//kernel.Map:2489
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=34002633;//kernel.Map:2633
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34002052;//kernel.Map:2052
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=34002120;//kernel.Map:2120
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=34002191;//kernel.Map:2191
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=34002225;//kernel.Map:2225
      p=Math.floor(p);
      //$LASTPOS=34002247;//kernel.Map:2247
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=34002272;//kernel.Map:2272
      if (! _this.pImg) {
        //$LASTPOS=34002294;//kernel.Map:2294
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=34002395;//kernel.Map:2395
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=34002472;//kernel.Map:2472
      _this.ctx.save();
      //$LASTPOS=34002489;//kernel.Map:2489
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=34002633;//kernel.Map:2633
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34002682;//kernel.Map:2682
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=34002750;//kernel.Map:2750
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=34002800;//kernel.Map:2800
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=34002835;//kernel.Map:2835
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=34002869;//kernel.Map:2869
      p=Math.floor(p);
      //$LASTPOS=34002891;//kernel.Map:2891
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=34002916;//kernel.Map:2916
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=34002940;//kernel.Map:2940
      _this.ctx.save();
      //$LASTPOS=34002957;//kernel.Map:2957
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=34003101;//kernel.Map:3101
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34002682;//kernel.Map:2682
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34002750;//kernel.Map:2750
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=34002800;//kernel.Map:2800
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=34002835;//kernel.Map:2835
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=34002869;//kernel.Map:2869
            p=Math.floor(p);
            //$LASTPOS=34002891;//kernel.Map:2891
            _this.pImg=Tonyu.globals.$imageList[p];
            //$LASTPOS=34002916;//kernel.Map:2916
            if (!(! _this.pImg)) { __pc=2     ; break; }
            _thread.exit(_this);return;
          case 2     :
            
            //$LASTPOS=34002940;//kernel.Map:2940
            _this.ctx.save();
            //$LASTPOS=34002957;//kernel.Map:2957
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=34003101;//kernel.Map:3101
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34003148;//kernel.Map:3148
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
            //$LASTPOS=34003148;//kernel.Map:3148
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
      
      //$LASTPOS=34003243;//kernel.Map:3243
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
            //$LASTPOS=34003243;//kernel.Map:3243
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
      
      //$LASTPOS=34003336;//kernel.Map:3336
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
      
      //$LASTPOS=34003336;//kernel.Map:3336
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
      
      //$LASTPOS=34003568;//kernel.Map:3568
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
      
      //$LASTPOS=34003568;//kernel.Map:3568
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
      
      //$LASTPOS=34003811;//kernel.Map:3811
      _this.sx=- scrollX;
      //$LASTPOS=34003829;//kernel.Map:3829
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34003811;//kernel.Map:3811
      _this.sx=- scrollX;
      //$LASTPOS=34003829;//kernel.Map:3829
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34003864;//kernel.Map:3864
      _this.pImg=_this.buf[0];
      //$LASTPOS=34003882;//kernel.Map:3882
      ctx.save();
      //$LASTPOS=34003899;//kernel.Map:3899
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=34004011;//kernel.Map:4011
      ctx.restore();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"redrawMap":{"nowait":false},"load":{"nowait":false},"save":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}},"fields":{"sx":{},"sy":{},"buf":{},"col":{},"chipWidth":{},"row":{},"chipHeight":{},"mapObj":{},"mapTable":{},"mapOnTable":{},"rows":{},"mapData":{},"mapOnData":{},"baseData":{},"ctx":{}}}
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
      
      //$LASTPOS=35000087;//kernel.Panel:87
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=35000156;//kernel.Panel:156
      if (_this.canvas) {
        //$LASTPOS=35000179;//kernel.Panel:179
        _this.width=_this.canvas.width;
        //$LASTPOS=35000208;//kernel.Panel:208
        _this.height=_this.canvas.height;
        //$LASTPOS=35000239;//kernel.Panel:239
        _this.parallel("watchResize");
        
      } else {
        //$LASTPOS=35000287;//kernel.Panel:287
        _this.setPanel(_this.width||Tonyu.globals.$screenWidth||465,_this.height||Tonyu.globals.$screenHeight||465);
        
      }
      //$LASTPOS=35000411;//kernel.Panel:411
      _this.x=_this.x||_this.width/2;
      //$LASTPOS=35000430;//kernel.Panel:430
      _this.y=_this.y||_this.height/2;
      //$LASTPOS=35000450;//kernel.Panel:450
      if (_this.align==null) {
        //$LASTPOS=35000466;//kernel.Panel:466
        _this.align="center";
      }
      //$LASTPOS=35000487;//kernel.Panel:487
      if (_this.alpha==null) {
        //$LASTPOS=35000503;//kernel.Panel:503
        _this.alpha=255;
      }
      //$LASTPOS=35000519;//kernel.Panel:519
      if (_this._drawn==null) {
        //$LASTPOS=35000536;//kernel.Panel:536
        _this._drawn=false;
      }
    },
    watchResize :function _trc_Panel_watchResize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35000576;//kernel.Panel:576
      while (true) {
        //$LASTPOS=35000599;//kernel.Panel:599
        if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
          //$LASTPOS=35000664;//kernel.Panel:664
          _this.width=_this.canvas.width;
          //$LASTPOS=35000683;//kernel.Panel:683
          _this.height=_this.canvas.height;
          //$LASTPOS=35000718;//kernel.Panel:718
          _this.fireEvent("resize",{width: _this.width,height: _this.height});
          
        }
        //$LASTPOS=35000774;//kernel.Panel:774
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
            //$LASTPOS=35000576;//kernel.Panel:576
          case 1:
            //$LASTPOS=35000599;//kernel.Panel:599
            if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
              //$LASTPOS=35000664;//kernel.Panel:664
              _this.width=_this.canvas.width;
              //$LASTPOS=35000683;//kernel.Panel:683
              _this.height=_this.canvas.height;
              //$LASTPOS=35000718;//kernel.Panel:718
              _this.fireEvent("resize",{width: _this.width,height: _this.height});
              
            }
            //$LASTPOS=35000774;//kernel.Panel:774
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35000854;//kernel.Panel:854
      _this.width=_this.trunc(width);
      //$LASTPOS=35000884;//kernel.Panel:884
      _this.height=_this.trunc(height);
      //$LASTPOS=35000916;//kernel.Panel:916
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=35000959;//kernel.Panel:959
      _this.canvas=_this.buf[0];
      //$LASTPOS=35000979;//kernel.Panel:979
      _this.fireEvent("resize",{width: width,height: height,force: true});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35000854;//kernel.Panel:854
      _this.width=_this.trunc(width);
      //$LASTPOS=35000884;//kernel.Panel:884
      _this.height=_this.trunc(height);
      //$LASTPOS=35000916;//kernel.Panel:916
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=35000959;//kernel.Panel:959
      _this.canvas=_this.buf[0];
      //$LASTPOS=35000979;//kernel.Panel:979
      _this.fireEvent("resize",{width: width,height: height,force: true});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001058;//kernel.Panel:1058
      if (_this.width==width&&_this.height==height) {
        return _this;
      }
      //$LASTPOS=35001117;//kernel.Panel:1117
      _this.setPanel(width,height);
    },
    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001058;//kernel.Panel:1058
      if (_this.width==width&&_this.height==height) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Panel_ent_resize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35001117;//kernel.Panel:1117
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
      
      //$LASTPOS=35001165;//kernel.Panel:1165
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001165;//kernel.Panel:1165
      _this._drawn=true;
      _thread.retVal=_this.canvas.getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    __getter__context :function _trc_Panel___getter__context() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001235;//kernel.Panel:1235
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    __getter__image :function _trc_Panel___getter__image() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001303;//kernel.Panel:1303
      _this._drawn=true;
      return _this.canvas;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35001367;//kernel.Panel:1367
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35001367;//kernel.Panel:1367
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=35001435;//kernel.Panel:1435
      ctx = _this.getContext();
      
      //$LASTPOS=35001462;//kernel.Panel:1462
      ctx.save();
      //$LASTPOS=35001529;//kernel.Panel:1529
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=35001559;//kernel.Panel:1559
      ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=35001604;//kernel.Panel:1604
      ctx.restore();
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      "use strict";
      var _this=this;
      var ctx;
      var splits;
      var colCount;
      
      //$LASTPOS=35001660;//kernel.Panel:1660
      ctx = _this.getContext();
      
      //$LASTPOS=35001687;//kernel.Panel:1687
      ctx.save();
      //$LASTPOS=35001704;//kernel.Panel:1704
      text=text+"";
      //$LASTPOS=35001723;//kernel.Panel:1723
      splits = text.split("\n");
      
      //$LASTPOS=35001809;//kernel.Panel:1809
      ctx.textAlign=align;
      //$LASTPOS=35001837;//kernel.Panel:1837
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=35001867;//kernel.Panel:1867
      ctx.font=size+"px 'Courier New'";
      //$LASTPOS=35001906;//kernel.Panel:1906
      //$LASTPOS=35001910;//kernel.Panel:1910
      colCount = 0;
      for (; colCount<splits.length ; colCount++) {
        {
          //$LASTPOS=35001970;//kernel.Panel:1970
          ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=35002015;//kernel.Panel:2015
          y+=size;
        }
      }
      //$LASTPOS=35002036;//kernel.Panel:2036
      ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var splits;
      var colCount;
      
      
      _thread.enter(function _trc_Panel_ent_fillText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35001660;//kernel.Panel:1660
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=35001687;//kernel.Panel:1687
            ctx.save();
            //$LASTPOS=35001704;//kernel.Panel:1704
            text=text+"";
            //$LASTPOS=35001723;//kernel.Panel:1723
            splits = text.split("\n");
            
            //$LASTPOS=35001809;//kernel.Panel:1809
            ctx.textAlign=align;
            //$LASTPOS=35001837;//kernel.Panel:1837
            ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=35001867;//kernel.Panel:1867
            ctx.font=size+"px 'Courier New'";
            //$LASTPOS=35001906;//kernel.Panel:1906
            //$LASTPOS=35001910;//kernel.Panel:1910
            colCount = 0;
            for (; colCount<splits.length ; colCount++) {
              {
                //$LASTPOS=35001970;//kernel.Panel:1970
                ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=35002015;//kernel.Panel:2015
                y+=size;
              }
            }
            //$LASTPOS=35002036;//kernel.Panel:2036
            ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=35002101;//kernel.Panel:2101
      ctx = _this.getContext();
      
      //$LASTPOS=35002128;//kernel.Panel:2128
      ctx.save();
      //$LASTPOS=35002145;//kernel.Panel:2145
      ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=35002194;//kernel.Panel:2194
      ctx.restore();
    },
    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      
      _thread.enter(function _trc_Panel_ent_clearRect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35002101;//kernel.Panel:2101
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=35002128;//kernel.Panel:2128
            ctx.save();
            //$LASTPOS=35002145;//kernel.Panel:2145
            ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=35002194;//kernel.Panel:2194
            ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      "use strict";
      var _this=this;
      var ctx;
      
      
      //$LASTPOS=35002254;//kernel.Panel:2254
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=35002352;//kernel.Panel:2352
        ctx=_this.getContext();
        //$LASTPOS=35002379;//kernel.Panel:2379
        _this.imagedata=ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=35002431;//kernel.Panel:2431
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=35002571;//kernel.Panel:2571
        _this.colordata=[0,0,0,0];
        
      }
      return (_this.colordata);
    },
    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      
      
      _thread.enter(function _trc_Panel_ent_getPixel(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35002254;//kernel.Panel:2254
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2     ; break; }
            //$LASTPOS=35002352;//kernel.Panel:2352
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=35002379;//kernel.Panel:2379
            _this.imagedata=ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=35002431;//kernel.Panel:2431
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3     ;break;
          case 2     :
            {
              //$LASTPOS=35002571;//kernel.Panel:2571
              _this.colordata=[0,0,0,0];
            }
          case 3     :
            
            _thread.exit((_this.colordata));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    scroll :function _trc_Panel_scroll(scrollX,scrollY) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=35002658;//kernel.Panel:2658
      ctx = _this.getContext();
      
      //$LASTPOS=35002685;//kernel.Panel:2685
      ctx.save();
      //$LASTPOS=35002702;//kernel.Panel:2702
      _this.imagedata=ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=35002763;//kernel.Panel:2763
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=35002797;//kernel.Panel:2797
      ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=35002849;//kernel.Panel:2849
      ctx.restore();
    },
    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      
      _thread.enter(function _trc_Panel_ent_scroll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35002658;//kernel.Panel:2658
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=35002685;//kernel.Panel:2685
            ctx.save();
            //$LASTPOS=35002702;//kernel.Panel:2702
            _this.imagedata=ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=35002763;//kernel.Panel:2763
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=35002797;//kernel.Panel:2797
            ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=35002849;//kernel.Panel:2849
            ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      "use strict";
      var _this=this;
      var pImg;
      
      //$LASTPOS=35002885;//kernel.Panel:2885
      if (_this._drawn) {
        //$LASTPOS=35002906;//kernel.Panel:2906
        pImg = _this.canvas;
        
        //$LASTPOS=35002932;//kernel.Panel:2932
        ctx.save();
        //$LASTPOS=35002953;//kernel.Panel:2953
        if (_this.align=="left") {
          //$LASTPOS=35002985;//kernel.Panel:2985
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=35003037;//kernel.Panel:3037
          if (_this.align=="center") {
            //$LASTPOS=35003071;//kernel.Panel:3071
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=35003106;//kernel.Panel:3106
            if (_this.align=="right") {
              //$LASTPOS=35003139;//kernel.Panel:3139
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=35003196;//kernel.Panel:3196
        if (_this.rotation!=0) {
          //$LASTPOS=35003231;//kernel.Panel:3231
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=35003299;//kernel.Panel:3299
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=35003356;//kernel.Panel:3356
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=35003408;//kernel.Panel:3408
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=35003473;//kernel.Panel:3473
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=35003529;//kernel.Panel:3529
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=35003570;//kernel.Panel:3570
        ctx.drawImage(pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=35003674;//kernel.Panel:3674
        ctx.restore();
        
      }
    },
    drawSprite :function _trc_Panel_drawSprite(x,y,p,options) {
      "use strict";
      var _this=this;
      var pImg;
      var scaleX;
      var scaleY;
      var rotation;
      var ctx;
      
      //$LASTPOS=35003741;//kernel.Panel:3741
      pImg = Tonyu.globals.$imageList[p];
      
      //$LASTPOS=35003770;//kernel.Panel:3770
      if (options===true) {
        //$LASTPOS=35003790;//kernel.Panel:3790
        options={f: true};
      }
      //$LASTPOS=35003813;//kernel.Panel:3813
      options=options||{};
      //$LASTPOS=35003839;//kernel.Panel:3839
      scaleX = typeof  (options.scaleX)==="number"?options.scaleX:1;
      
      //$LASTPOS=35003908;//kernel.Panel:3908
      scaleY = typeof  (options.scaleY)==="number"?options.scaleY:scaleX;
      
      //$LASTPOS=35003982;//kernel.Panel:3982
      rotation = options.rotation||options.angle||0;
      
      //$LASTPOS=35004036;//kernel.Panel:4036
      ctx = _this.context;
      
      //$LASTPOS=35004058;//kernel.Panel:4058
      if (options.f) {
        //$LASTPOS=35004073;//kernel.Panel:4073
        scaleX*=- 1;
      }
      //$LASTPOS=35004092;//kernel.Panel:4092
      ctx.save();
      //$LASTPOS=35004109;//kernel.Panel:4109
      ctx.translate(x,y);
      //$LASTPOS=35004134;//kernel.Panel:4134
      ctx.rotate(rotation/180*Math.PI);
      //$LASTPOS=35004173;//kernel.Panel:4173
      ctx.scale(scaleX,scaleY);
      //$LASTPOS=35004204;//kernel.Panel:4204
      ctx.drawImage(pImg.image,pImg.x,pImg.y,pImg.width,pImg.height,- pImg.width/2,- pImg.height/2,pImg.width,pImg.height);
      //$LASTPOS=35004344;//kernel.Panel:4344
      ctx.restore();
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
      
      
      //$LASTPOS=35004582;//kernel.Panel:4582
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=35004619;//kernel.Panel:4619
      srcPanel = a.shift(Tonyu.classes.kernel.Panel)||_this;
      
      //$LASTPOS=35004661;//kernel.Panel:4661
      if (a.length<=4) {
        //$LASTPOS=35004689;//kernel.Panel:4689
        dx=a.shift();
        //$LASTPOS=35004712;//kernel.Panel:4712
        dy=a.shift();
        //$LASTPOS=35004735;//kernel.Panel:4735
        if (a.length==0) {
          //$LASTPOS=35004767;//kernel.Panel:4767
          _this.context.drawImage(srcPanel.image,dx,dy);
          
        } else {
          //$LASTPOS=35004840;//kernel.Panel:4840
          dw=a.shift();
          //$LASTPOS=35004867;//kernel.Panel:4867
          dh=a.shift();
          //$LASTPOS=35004894;//kernel.Panel:4894
          if (dw*dh!=0) {
            //$LASTPOS=35004927;//kernel.Panel:4927
            _this.context.drawImage(srcPanel.image,dx,dy,dw,dh);
            
          }
          
        }
        
      } else {
        //$LASTPOS=35005023;//kernel.Panel:5023
        sx=a.shift();
        //$LASTPOS=35005046;//kernel.Panel:5046
        sy=a.shift();
        //$LASTPOS=35005069;//kernel.Panel:5069
        sw=a.shift();
        //$LASTPOS=35005092;//kernel.Panel:5092
        sh=a.shift();
        //$LASTPOS=35005115;//kernel.Panel:5115
        dx=a.shift();
        //$LASTPOS=35005138;//kernel.Panel:5138
        dy=a.shift();
        //$LASTPOS=35005161;//kernel.Panel:5161
        dw=a.shift()||sw;
        //$LASTPOS=35005190;//kernel.Panel:5190
        dh=a.shift()||sh;
        //$LASTPOS=35005269;//kernel.Panel:5269
        if (sw*sh*dw*dh!=0) {
          //$LASTPOS=35005304;//kernel.Panel:5304
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
      
      //$LASTPOS=35005422;//kernel.Panel:5422
      if (toLayer==null) {
        //$LASTPOS=35005441;//kernel.Panel:5441
        toLayer=_this;
      }
      //$LASTPOS=35005460;//kernel.Panel:5460
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=35005497;//kernel.Panel:5497
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=35005552;//kernel.Panel:5552
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=35005604;//kernel.Panel:5604
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=35005635;//kernel.Panel:5635
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=35005667;//kernel.Panel:5667
        rt = _this.rotation;
        
        //$LASTPOS=35005865;//kernel.Panel:5865
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=35005922;//kernel.Panel:5922
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};
        
      } else {
        //$LASTPOS=35006109;//kernel.Panel:6109
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=35006161;//kernel.Panel:6161
          rt = - _this.rotation;
          
          //$LASTPOS=35006188;//kernel.Panel:6188
          dx = obj.x-(_this.x);
          
          //$LASTPOS=35006220;//kernel.Panel:6220
          dy = obj.y-(_this.y);
          
          //$LASTPOS=35006476;//kernel.Panel:6476
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=35006536;//kernel.Panel:6536
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          return {x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};
          
        } else {
          //$LASTPOS=35006727;//kernel.Panel:6727
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
      
      //$LASTPOS=35005422;//kernel.Panel:5422
      if (toLayer==null) {
        //$LASTPOS=35005441;//kernel.Panel:5441
        toLayer=_this;
      }
      //$LASTPOS=35005460;//kernel.Panel:5460
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=35005497;//kernel.Panel:5497
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=35005552;//kernel.Panel:5552
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=35005604;//kernel.Panel:5604
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=35005635;//kernel.Panel:5635
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=35005667;//kernel.Panel:5667
        rt = _this.rotation;
        
        //$LASTPOS=35005865;//kernel.Panel:5865
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=35005922;//kernel.Panel:5922
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        _thread.retVal={x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};return;
        
        
      } else {
        //$LASTPOS=35006109;//kernel.Panel:6109
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=35006161;//kernel.Panel:6161
          rt = - _this.rotation;
          
          //$LASTPOS=35006188;//kernel.Panel:6188
          dx = obj.x-(_this.x);
          
          //$LASTPOS=35006220;//kernel.Panel:6220
          dy = obj.y-(_this.y);
          
          //$LASTPOS=35006476;//kernel.Panel:6476
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=35006536;//kernel.Panel:6536
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          _thread.retVal={x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};return;
          
          
        } else {
          //$LASTPOS=35006727;//kernel.Panel:6727
          _this.print("no support",obj.layer,toLayer);
          throw new Error("not support");
          
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"watchResize":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"__getter__context":{"nowait":true},"__getter__image":{"nowait":true},"setFillStyle":{"nowait":false},"fillRect":{"nowait":true},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true},"drawSprite":{"nowait":true},"copy":{"nowait":true},"convert":{"nowait":false}},"fields":{"canvas":{},"_drawn":{},"buf":{},"imagedata":{},"colordata":{},"context":{}}}
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
      
      //$LASTPOS=36000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=36000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=36000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=36000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=36000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=36000257;//kernel.ScaledCanvas:257
      _this._color="rgb(20,80,180)";
      //$LASTPOS=36000292;//kernel.ScaledCanvas:292
      _this.sx=0;
      //$LASTPOS=36000303;//kernel.ScaledCanvas:303
      _this.sy=0;
      //$LASTPOS=36000314;//kernel.ScaledCanvas:314
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=36000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=36000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=36000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=36000506;//kernel.ScaledCanvas:506
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=36000531;//kernel.ScaledCanvas:531
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=36000558;//kernel.ScaledCanvas:558
      if (Tonyu.globals.$panel) {
        //$LASTPOS=36000579;//kernel.ScaledCanvas:579
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=36000633;//kernel.ScaledCanvas:633
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=36000667;//kernel.ScaledCanvas:667
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=36000705;//kernel.ScaledCanvas:705
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=36000733;//kernel.ScaledCanvas:733
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=36000794;//kernel.ScaledCanvas:794
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=36000835;//kernel.ScaledCanvas:835
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=36000877;//kernel.ScaledCanvas:877
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=36000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=36000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=36000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=36000506;//kernel.ScaledCanvas:506
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=36000531;//kernel.ScaledCanvas:531
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=36000558;//kernel.ScaledCanvas:558
      if (Tonyu.globals.$panel) {
        //$LASTPOS=36000579;//kernel.ScaledCanvas:579
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=36000633;//kernel.ScaledCanvas:633
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=36000667;//kernel.ScaledCanvas:667
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=36000705;//kernel.ScaledCanvas:705
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=36000733;//kernel.ScaledCanvas:733
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=36000794;//kernel.ScaledCanvas:794
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=36000835;//kernel.ScaledCanvas:835
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=36000877;//kernel.ScaledCanvas:877
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=36000999;//kernel.ScaledCanvas:999
      larger = 200;
      
      //$LASTPOS=36001020;//kernel.ScaledCanvas:1020
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
      
      //$LASTPOS=36000999;//kernel.ScaledCanvas:999
      larger = 200;
      
      //$LASTPOS=36001020;//kernel.ScaledCanvas:1020
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
      
      //$LASTPOS=36001155;//kernel.ScaledCanvas:1155
      _this.cw=_this.canvas.width();
      //$LASTPOS=36001179;//kernel.ScaledCanvas:1179
      _this.ch=_this.canvas.height();
      //$LASTPOS=36001204;//kernel.ScaledCanvas:1204
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=36001248;//kernel.ScaledCanvas:1248
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=36001292;//kernel.ScaledCanvas:1292
      if (calch>_this.ch) {
        //$LASTPOS=36001306;//kernel.ScaledCanvas:1306
        calch=_this.ch;
      }
      //$LASTPOS=36001321;//kernel.ScaledCanvas:1321
      if (calcw>_this.cw) {
        //$LASTPOS=36001335;//kernel.ScaledCanvas:1335
        calcw=_this.cw;
      }
      //$LASTPOS=36001350;//kernel.ScaledCanvas:1350
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=36001382;//kernel.ScaledCanvas:1382
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=36001438;//kernel.ScaledCanvas:1438
        calcw=_this.width;
        //$LASTPOS=36001450;//kernel.ScaledCanvas:1450
        calch=_this.height;
        
      }
      //$LASTPOS=36001476;//kernel.ScaledCanvas:1476
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=36001519;//kernel.ScaledCanvas:1519
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=36001562;//kernel.ScaledCanvas:1562
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=36001677;//kernel.ScaledCanvas:1677
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=36001721;//kernel.ScaledCanvas:1721
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=36001765;//kernel.ScaledCanvas:1765
      if (calch>_this.ch) {
        //$LASTPOS=36001779;//kernel.ScaledCanvas:1779
        calch=_this.ch;
      }
      //$LASTPOS=36001794;//kernel.ScaledCanvas:1794
      if (calcw>_this.cw) {
        //$LASTPOS=36001808;//kernel.ScaledCanvas:1808
        calcw=_this.cw;
      }
      //$LASTPOS=36001823;//kernel.ScaledCanvas:1823
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=36001879;//kernel.ScaledCanvas:1879
        calcw=_this.width;
        //$LASTPOS=36001891;//kernel.ScaledCanvas:1891
        calch=_this.height;
        
      }
      //$LASTPOS=36001917;//kernel.ScaledCanvas:1917
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=36001960;//kernel.ScaledCanvas:1960
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=36002056;//kernel.ScaledCanvas:2056
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
      
      //$LASTPOS=36001677;//kernel.ScaledCanvas:1677
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=36001721;//kernel.ScaledCanvas:1721
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=36001765;//kernel.ScaledCanvas:1765
      if (calch>_this.ch) {
        //$LASTPOS=36001779;//kernel.ScaledCanvas:1779
        calch=_this.ch;
      }
      //$LASTPOS=36001794;//kernel.ScaledCanvas:1794
      if (calcw>_this.cw) {
        //$LASTPOS=36001808;//kernel.ScaledCanvas:1808
        calcw=_this.cw;
      }
      //$LASTPOS=36001823;//kernel.ScaledCanvas:1823
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=36001879;//kernel.ScaledCanvas:1879
        calcw=_this.width;
        //$LASTPOS=36001891;//kernel.ScaledCanvas:1891
        calch=_this.height;
        
      }
      //$LASTPOS=36001917;//kernel.ScaledCanvas:1917
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=36001960;//kernel.ScaledCanvas:1960
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=36002056;//kernel.ScaledCanvas:2056
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36002229;//kernel.ScaledCanvas:2229
      _this._color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36002229;//kernel.ScaledCanvas:2229
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=36002274;//kernel.ScaledCanvas:2274
      ctx = cv.getContext("2d");
      
      //$LASTPOS=36002308;//kernel.ScaledCanvas:2308
      ctx.save();
      //$LASTPOS=36002325;//kernel.ScaledCanvas:2325
      ctx.fillStyle=_this._color;
      //$LASTPOS=36002352;//kernel.ScaledCanvas:2352
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=36002395;//kernel.ScaledCanvas:2395
      if (_this.isDrawGrid) {
        //$LASTPOS=36002411;//kernel.ScaledCanvas:2411
        _this.drawGrid(cv);
      }
      //$LASTPOS=36002430;//kernel.ScaledCanvas:2430
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=36002274;//kernel.ScaledCanvas:2274
      ctx = cv.getContext("2d");
      
      //$LASTPOS=36002308;//kernel.ScaledCanvas:2308
      ctx.save();
      //$LASTPOS=36002325;//kernel.ScaledCanvas:2325
      ctx.fillStyle=_this._color;
      //$LASTPOS=36002352;//kernel.ScaledCanvas:2352
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=36002395;//kernel.ScaledCanvas:2395
      if (_this.isDrawGrid) {
        //$LASTPOS=36002411;//kernel.ScaledCanvas:2411
        _this.drawGrid(cv);
      }
      //$LASTPOS=36002430;//kernel.ScaledCanvas:2430
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36002774;//kernel.ScaledCanvas:2774
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36002774;//kernel.ScaledCanvas:2774
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}},"fields":{"cw":{},"canvas":{},"ch":{},"cctx":{},"sx":{},"sy":{},"isDrawGrid":{},"buf":{},"ctx":{},"_ret":{},"_color":{},"drawGrid":{}}}
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
      
      //$LASTPOS=37000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=37000049;//kernel.Screen:49
      _this._color="black";
    },
    fiber$onAppear :function _trc_Screen_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=37000049;//kernel.Screen:49
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
      
      //$LASTPOS=37000088;//kernel.Screen:88
      if (! _this._drawing) {
        //$LASTPOS=37000113;//kernel.Screen:113
        if (! _this.canvas) {
          throw new Error("canvas is null");
          
          
        }
        //$LASTPOS=37000193;//kernel.Screen:193
        _this._drawing=true;
        //$LASTPOS=37000216;//kernel.Screen:216
        _this.fillStyle=_this._color;
        //$LASTPOS=37000242;//kernel.Screen:242
        _this.fillRect(0,0,_this.width,_this.height);
        //$LASTPOS=37000278;//kernel.Screen:278
        c = _this.getContext();
        
        //$LASTPOS=37000306;//kernel.Screen:306
        //$LASTPOS=37000311;//kernel.Screen:311
        i = _this.layers.length-1;
        for (; i>=0 ; i--) {
          {
            //$LASTPOS=37000357;//kernel.Screen:357
            l = _this.layers[i];
            
            //$LASTPOS=37000386;//kernel.Screen:386
            group = l.group;
            
            //$LASTPOS=37000417;//kernel.Screen:417
            c.save();
            //$LASTPOS=37000439;//kernel.Screen:439
            wpx = l.wpx;
            wpy = l.wpy;
            
            //$LASTPOS=37000476;//kernel.Screen:476
            spx = l.spx;
            spy = l.spy;
            
            //$LASTPOS=37000513;//kernel.Screen:513
            rt = l.rotation;
            sc = l.scale;
            
            //$LASTPOS=37000639;//kernel.Screen:639
            wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
            
            //$LASTPOS=37000695;//kernel.Screen:695
            wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
            
            //$LASTPOS=37000793;//kernel.Screen:793
            c.translate(- wpOnSX+spx,- wpOnSY+spy);
            //$LASTPOS=37000843;//kernel.Screen:843
            c.rotate(_this.rad(rt));
            //$LASTPOS=37000874;//kernel.Screen:874
            c.scale(sc,sc);
            //$LASTPOS=37000902;//kernel.Screen:902
            group.draw(c);
            //$LASTPOS=37000929;//kernel.Screen:929
            c.restore();
          }
        }
        //$LASTPOS=37000960;//kernel.Screen:960
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
            //$LASTPOS=37000088;//kernel.Screen:88
            if (!(! _this._drawing)) { __pc=2     ; break; }
            //$LASTPOS=37000113;//kernel.Screen:113
            if (! _this.canvas) {
              throw new Error("canvas is null");
              
              
            }
            //$LASTPOS=37000193;//kernel.Screen:193
            _this._drawing=true;
            //$LASTPOS=37000216;//kernel.Screen:216
            _this.fillStyle=_this._color;
            //$LASTPOS=37000242;//kernel.Screen:242
            _this.fillRect(0,0,_this.width,_this.height);
            //$LASTPOS=37000278;//kernel.Screen:278
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            c=_thread.retVal;
            
            //$LASTPOS=37000306;//kernel.Screen:306
            //$LASTPOS=37000311;//kernel.Screen:311
            i = _this.layers.length-1;
            for (; i>=0 ; i--) {
              {
                //$LASTPOS=37000357;//kernel.Screen:357
                l = _this.layers[i];
                
                //$LASTPOS=37000386;//kernel.Screen:386
                group = l.group;
                
                //$LASTPOS=37000417;//kernel.Screen:417
                c.save();
                //$LASTPOS=37000439;//kernel.Screen:439
                wpx = l.wpx;
                wpy = l.wpy;
                
                //$LASTPOS=37000476;//kernel.Screen:476
                spx = l.spx;
                spy = l.spy;
                
                //$LASTPOS=37000513;//kernel.Screen:513
                rt = l.rotation;
                sc = l.scale;
                
                //$LASTPOS=37000639;//kernel.Screen:639
                wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
                
                //$LASTPOS=37000695;//kernel.Screen:695
                wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
                
                //$LASTPOS=37000793;//kernel.Screen:793
                c.translate(- wpOnSX+spx,- wpOnSY+spy);
                //$LASTPOS=37000843;//kernel.Screen:843
                c.rotate(_this.rad(rt));
                //$LASTPOS=37000874;//kernel.Screen:874
                c.scale(sc,sc);
                //$LASTPOS=37000902;//kernel.Screen:902
                group.draw(c);
                //$LASTPOS=37000929;//kernel.Screen:929
                c.restore();
              }
            }
            //$LASTPOS=37000960;//kernel.Screen:960
            _this._drawing=false;
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Screen_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37001001;//kernel.Screen:1001
      _this.drawLayers();
      //$LASTPOS=37001019;//kernel.Screen:1019
      Tonyu.classes.kernel.Panel.prototype.draw.apply( _this, [ctx]);
    },
    addLayer :function _trc_Screen_addLayer(group) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37001061;//kernel.Screen:1061
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=37001091;//kernel.Screen:1091
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      return _this.layers.length-1;
    },
    fiber$addLayer :function _trc_Screen_f_addLayer(_thread,group) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37001061;//kernel.Screen:1061
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=37001091;//kernel.Screen:1091
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      _thread.retVal=_this.layers.length-1;return;
      
      
      _thread.retVal=_this;return;
    },
    selectLayer :function _trc_Screen_selectLayer(i) {
      "use strict";
      var _this=this;
      var r;
      
      //$LASTPOS=37001252;//kernel.Screen:1252
      r = _this.findLayer(i);
      
      //$LASTPOS=37001276;//kernel.Screen:1276
      if (r!=null) {
        //$LASTPOS=37001289;//kernel.Screen:1289
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
            //$LASTPOS=37001252;//kernel.Screen:1252
            _this.fiber$findLayer(_thread, i);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=37001276;//kernel.Screen:1276
            if (r!=null) {
              //$LASTPOS=37001289;//kernel.Screen:1289
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
      
      //$LASTPOS=37001320;//kernel.Screen:1320
      if (typeof  i=="number") {
        //$LASTPOS=37001354;//kernel.Screen:1354
        if (_this.layers[i]) {
          return i;
        }
        
      } else {
        //$LASTPOS=37001400;//kernel.Screen:1400
        //$LASTPOS=37001405;//kernel.Screen:1405
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=37001449;//kernel.Screen:1449
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
      
      //$LASTPOS=37001320;//kernel.Screen:1320
      if (typeof  i=="number") {
        //$LASTPOS=37001354;//kernel.Screen:1354
        if (_this.layers[i]) {
          _thread.retVal=i;return;
          
        }
        
      } else {
        //$LASTPOS=37001400;//kernel.Screen:1400
        //$LASTPOS=37001405;//kernel.Screen:1405
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=37001449;//kernel.Screen:1449
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
      
      //$LASTPOS=37001570;//kernel.Screen:1570
      _this.layers[_this.index].spx=x;
      //$LASTPOS=37001599;//kernel.Screen:1599
      _this.layers[_this.index].spy=y;
    },
    fiber$setPivot :function _trc_Screen_f_setPivot(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37001570;//kernel.Screen:1570
      _this.layers[_this.index].spx=x;
      //$LASTPOS=37001599;//kernel.Screen:1599
      _this.layers[_this.index].spy=y;
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Screen_scrollTo(x,y,scl,rot) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37001655;//kernel.Screen:1655
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=37001684;//kernel.Screen:1684
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=37001713;//kernel.Screen:1713
      if (typeof  scl=="number") {
        //$LASTPOS=37001739;//kernel.Screen:1739
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=37001772;//kernel.Screen:1772
      if (typeof  rot=="number") {
        //$LASTPOS=37001798;//kernel.Screen:1798
        _this.layers[_this.index].rotation=rot;
      }
    },
    fiber$scrollTo :function _trc_Screen_f_scrollTo(_thread,x,y,scl,rot) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37001655;//kernel.Screen:1655
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=37001684;//kernel.Screen:1684
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=37001713;//kernel.Screen:1713
      if (typeof  scl=="number") {
        //$LASTPOS=37001739;//kernel.Screen:1739
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=37001772;//kernel.Screen:1772
      if (typeof  rot=="number") {
        //$LASTPOS=37001798;//kernel.Screen:1798
        _this.layers[_this.index].rotation=rot;
      }
      
      _thread.retVal=_this;return;
    },
    canvas2buf :function _trc_Screen_canvas2buf(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37001853;//kernel.Screen:1853
      p.layer=_this.layer;
      return _this.convert(p,_this);
    },
    fiber$canvas2buf :function _trc_Screen_f_canvas2buf(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37001853;//kernel.Screen:1853
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
      
      //$LASTPOS=37002065;//kernel.Screen:2065
      if (toLayer==null) {
        //$LASTPOS=37002084;//kernel.Screen:2084
        toLayer=_this;
      }
      //$LASTPOS=37002102;//kernel.Screen:2102
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=37002156;//kernel.Screen:2156
      if (obj.layer!==_this&&toLayer!==_this) {
        //$LASTPOS=37002206;//kernel.Screen:2206
        p = _this.convert(obj,_this);
        
        return _this.convert(p,toLayer);
        
      } else {
        //$LASTPOS=37002277;//kernel.Screen:2277
        if (obj.layer!==_this&&toLayer===_this) {
          //$LASTPOS=37002327;//kernel.Screen:2327
          l = _this.findLayer(obj.layer);
          
          //$LASTPOS=37002363;//kernel.Screen:2363
          if (l!=null) {
            //$LASTPOS=37002421;//kernel.Screen:2421
            l=_this.layers[l];
            //$LASTPOS=37002446;//kernel.Screen:2446
            dx = obj.x-l.wpx;
            
            //$LASTPOS=37002478;//kernel.Screen:2478
            dy = obj.y-l.wpy;
            
            //$LASTPOS=37002510;//kernel.Screen:2510
            rt = l.rotation;
            
            //$LASTPOS=37002725;//kernel.Screen:2725
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=37002787;//kernel.Screen:2787
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this};
            
          } else {
            return Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]);
            
          }
          
        } else {
          //$LASTPOS=37003058;//kernel.Screen:3058
          if (obj.layer===_this&&toLayer!==_this) {
            //$LASTPOS=37003108;//kernel.Screen:3108
            l = _this.findLayer(toLayer);
            
            //$LASTPOS=37003142;//kernel.Screen:3142
            if (l!=null) {
              //$LASTPOS=37003200;//kernel.Screen:3200
              l=_this.layers[l];
              //$LASTPOS=37003238;//kernel.Screen:3238
              rt = - l.rotation;
              
              //$LASTPOS=37003270;//kernel.Screen:3270
              dx = obj.x-l.spx;
              
              //$LASTPOS=37003302;//kernel.Screen:3302
              dy = obj.y-l.spy;
              
              //$LASTPOS=37003518;//kernel.Screen:3518
              x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
              
              //$LASTPOS=37003580;//kernel.Screen:3580
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
      
      //$LASTPOS=37002065;//kernel.Screen:2065
      if (toLayer==null) {
        //$LASTPOS=37002084;//kernel.Screen:2084
        toLayer=_this;
      }
      //$LASTPOS=37002102;//kernel.Screen:2102
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      
      _thread.enter(function _trc_Screen_ent_convert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37002156;//kernel.Screen:2156
            if (!(obj.layer!==_this&&toLayer!==_this)) { __pc=2     ; break; }
            //$LASTPOS=37002206;//kernel.Screen:2206
            _this.fiber$convert(_thread, obj, _this);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            _thread.exit(_this.convert(p,toLayer));return;
            __pc=13    ;break;
          case 2     :
            //$LASTPOS=37002277;//kernel.Screen:2277
            if (!(obj.layer!==_this&&toLayer===_this)) { __pc=6     ; break; }
            //$LASTPOS=37002327;//kernel.Screen:2327
            _this.fiber$findLayer(_thread, obj.layer);
            __pc=3;return;
          case 3:
            l=_thread.retVal;
            
            //$LASTPOS=37002363;//kernel.Screen:2363
            if (!(l!=null)) { __pc=4     ; break; }
            //$LASTPOS=37002421;//kernel.Screen:2421
            l=_this.layers[l];
            //$LASTPOS=37002446;//kernel.Screen:2446
            dx = obj.x-l.wpx;
            
            //$LASTPOS=37002478;//kernel.Screen:2478
            dy = obj.y-l.wpy;
            
            //$LASTPOS=37002510;//kernel.Screen:2510
            rt = l.rotation;
            
            //$LASTPOS=37002725;//kernel.Screen:2725
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=37002787;//kernel.Screen:2787
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            _thread.exit({x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this});return;
            __pc=5     ;break;
          case 4     :
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]));return;
          case 5     :
            
            __pc=12    ;break;
          case 6     :
            //$LASTPOS=37003058;//kernel.Screen:3058
            if (!(obj.layer===_this&&toLayer!==_this)) { __pc=10    ; break; }
            //$LASTPOS=37003108;//kernel.Screen:3108
            _this.fiber$findLayer(_thread, toLayer);
            __pc=7;return;
          case 7:
            l=_thread.retVal;
            
            //$LASTPOS=37003142;//kernel.Screen:3142
            if (!(l!=null)) { __pc=8     ; break; }
            //$LASTPOS=37003200;//kernel.Screen:3200
            l=_this.layers[l];
            //$LASTPOS=37003238;//kernel.Screen:3238
            rt = - l.rotation;
            
            //$LASTPOS=37003270;//kernel.Screen:3270
            dx = obj.x-l.spx;
            
            //$LASTPOS=37003302;//kernel.Screen:3302
            dy = obj.y-l.spy;
            
            //$LASTPOS=37003518;//kernel.Screen:3518
            x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
            
            //$LASTPOS=37003580;//kernel.Screen:3580
            y = l.wpy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/l.scale;
            
            _thread.exit({x: x,y: y,rotation: rt,scale: 1/l.scale,layer: toLayer});return;
            __pc=9     ;break;
          case 8     :
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,toLayer]));return;
          case 9     :
            
            __pc=11    ;break;
          case 10    :
            _thread.exit(obj);return;
          case 11    :
            
          case 12    :
            
          case 13    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setBGColor :function _trc_Screen_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37003885;//kernel.Screen:3885
      _this._color=color;
    },
    fiber$setBGColor :function _trc_Screen_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37003885;//kernel.Screen:3885
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Screen_all() {
      "use strict";
      var _this=this;
      var res;
      var l;
      var _it_319;
      var q;
      
      //$LASTPOS=37003919;//kernel.Screen:3919
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=37003943;//kernel.Screen:3943
      _it_319=Tonyu.iterator(_this.layers,1);
      while(_it_319.next()) {
        l=_it_319[0];
        
        //$LASTPOS=37003975;//kernel.Screen:3975
        q = l.group.all.apply(l.group,arguments);
        
        //$LASTPOS=37004027;//kernel.Screen:4027
        res.push(q);
        
      }
      return res;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"drawLayers":{"nowait":false},"draw":{"nowait":true},"addLayer":{"nowait":false},"selectLayer":{"nowait":false},"findLayer":{"nowait":false},"setPivot":{"nowait":false},"scrollTo":{"nowait":false},"canvas2buf":{"nowait":false},"convert":{"nowait":false},"setBGColor":{"nowait":false},"all":{"nowait":true}},"fields":{"layers":{},"_color":{},"_drawing":{},"index":{}}}
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
      
      //$LASTPOS=38000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=38000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=38000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=38000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=38000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=38000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=38000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=38000231;//kernel.Sprites:231
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=38000270;//kernel.Sprites:270
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=38000307;//kernel.Sprites:307
      if (_this.drawing) {
        //$LASTPOS=38000331;//kernel.Sprites:331
        s.draw(_this.drawing);
        return _this;
        
      }
      //$LASTPOS=38000377;//kernel.Sprites:377
      _this.sprites.push(s);
      //$LASTPOS=38000399;//kernel.Sprites:399
      if (s.__genId==null) {
        //$LASTPOS=38000429;//kernel.Sprites:429
        s.__genId=_this.objId;
        //$LASTPOS=38000455;//kernel.Sprites:455
        _this.objId++;
        
      }
      //$LASTPOS=38000476;//kernel.Sprites:476
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=38000231;//kernel.Sprites:231
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=38000270;//kernel.Sprites:270
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=38000307;//kernel.Sprites:307
      if (_this.drawing) {
        //$LASTPOS=38000331;//kernel.Sprites:331
        s.draw(_this.drawing);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=38000377;//kernel.Sprites:377
      _this.sprites.push(s);
      //$LASTPOS=38000399;//kernel.Sprites:399
      if (s.__genId==null) {
        //$LASTPOS=38000429;//kernel.Sprites:429
        s.__genId=_this.objId;
        //$LASTPOS=38000455;//kernel.Sprites:455
        _this.objId++;
        
      }
      //$LASTPOS=38000476;//kernel.Sprites:476
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      "use strict";
      var _this=this;
      var idx;
      
      //$LASTPOS=38000546;//kernel.Sprites:546
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=38000579;//kernel.Sprites:579
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=38000603;//kernel.Sprites:603
      _this.sprites.splice(idx,1);
      //$LASTPOS=38000631;//kernel.Sprites:631
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=38000546;//kernel.Sprites:546
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=38000579;//kernel.Sprites:579
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=38000603;//kernel.Sprites:603
      _this.sprites.splice(idx,1);
      //$LASTPOS=38000631;//kernel.Sprites:631
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes(drawn) {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      
      //$LASTPOS=38000765;//kernel.Sprites:765
      //$LASTPOS=38000770;//kernel.Sprites:770
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=38000818;//kernel.Sprites:818
          s=_this.sprites[i];
          //$LASTPOS=38000841;//kernel.Sprites:841
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=38001014;//kernel.Sprites:1014
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=38001086;//kernel.Sprites:1086
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
      
      
      //$LASTPOS=38000765;//kernel.Sprites:765
      //$LASTPOS=38000770;//kernel.Sprites:770
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=38000818;//kernel.Sprites:818
          s=_this.sprites[i];
          //$LASTPOS=38000841;//kernel.Sprites:841
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=38001014;//kernel.Sprites:1014
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=38001086;//kernel.Sprites:1086
            _this.sprites.splice(i,1);
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38001147;//kernel.Sprites:1147
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38001147;//kernel.Sprites:1147
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      "use strict";
      var _this=this;
      var val1;
      var val2;
      
      //$LASTPOS=38001220;//kernel.Sprites:1220
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=38001250;//kernel.Sprites:1250
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=38001280;//kernel.Sprites:1280
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=38001326;//kernel.Sprites:1326
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=38001371;//kernel.Sprites:1371
          if (val1==val2) {
            //$LASTPOS=38001396;//kernel.Sprites:1396
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
      
      //$LASTPOS=38001220;//kernel.Sprites:1220
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=38001250;//kernel.Sprites:1250
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=38001280;//kernel.Sprites:1280
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=38001326;//kernel.Sprites:1326
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=38001371;//kernel.Sprites:1371
          if (val1==val2) {
            //$LASTPOS=38001396;//kernel.Sprites:1396
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
      
      //$LASTPOS=38001593;//kernel.Sprites:1593
      ctx.save();
      //$LASTPOS=38001610;//kernel.Sprites:1610
      orderArray = [];
      
      //$LASTPOS=38001634;//kernel.Sprites:1634
      if (_this.t1Sprites) {
        //$LASTPOS=38001660;//kernel.Sprites:1660
        _this.sprites.forEach((function anonymous_1676(s) {
          
          //$LASTPOS=38001696;//kernel.Sprites:1696
          if (s instanceof Tonyu.classes.kernel.PlainChar) {
            //$LASTPOS=38001743;//kernel.Sprites:1743
            s.draw();
            
          } else {
            //$LASTPOS=38001773;//kernel.Sprites:1773
            orderArray.push(s);
          }
        }));
        
      } else {
        //$LASTPOS=38001828;//kernel.Sprites:1828
        orderArray=orderArray.concat(_this.sprites);
        
      }
      //$LASTPOS=38001879;//kernel.Sprites:1879
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=38001912;//kernel.Sprites:1912
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=38001941;//kernel.Sprites:1941
      _this.drawing=ctx;
      //$LASTPOS=38001959;//kernel.Sprites:1959
      orderArray.forEach((function anonymous_1978(s) {
        
        //$LASTPOS=38001993;//kernel.Sprites:1993
        s.draw(ctx);
      }));
      //$LASTPOS=38002020;//kernel.Sprites:2020
      _this.drawing=null;
      //$LASTPOS=38002039;//kernel.Sprites:2039
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38002085;//kernel.Sprites:2085
      _this.hitWatchers.forEach((function anonymous_2105(w) {
        
        //$LASTPOS=38002129;//kernel.Sprites:2129
        _this.sprites.forEach((function anonymous_2145(a) {
          var a_owner;
          
          //$LASTPOS=38002217;//kernel.Sprites:2217
          a_owner = a;
          
          //$LASTPOS=38002259;//kernel.Sprites:2259
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=38002312;//kernel.Sprites:2312
          _this.sprites.forEach((function anonymous_2328(b) {
            var b_owner;
            
            //$LASTPOS=38002360;//kernel.Sprites:2360
            b_owner = b;
            
            //$LASTPOS=38002406;//kernel.Sprites:2406
            if (a===b) {
              return _this;
            }
            //$LASTPOS=38002442;//kernel.Sprites:2442
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=38002547;//kernel.Sprites:2547
            if (a.crashTo1(b)) {
              //$LASTPOS=38002650;//kernel.Sprites:2650
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
      
      //$LASTPOS=38002085;//kernel.Sprites:2085
      _this.hitWatchers.forEach((function anonymous_2105(w) {
        
        //$LASTPOS=38002129;//kernel.Sprites:2129
        _this.sprites.forEach((function anonymous_2145(a) {
          var a_owner;
          
          //$LASTPOS=38002217;//kernel.Sprites:2217
          a_owner = a;
          
          //$LASTPOS=38002259;//kernel.Sprites:2259
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=38002312;//kernel.Sprites:2312
          _this.sprites.forEach((function anonymous_2328(b) {
            var b_owner;
            
            //$LASTPOS=38002360;//kernel.Sprites:2360
            b_owner = b;
            
            //$LASTPOS=38002406;//kernel.Sprites:2406
            if (a===b) {
              return _this;
            }
            //$LASTPOS=38002442;//kernel.Sprites:2442
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=38002547;//kernel.Sprites:2547
            if (a.crashTo1(b)) {
              //$LASTPOS=38002650;//kernel.Sprites:2650
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
      
      //$LASTPOS=38002780;//kernel.Sprites:2780
      p = {A: typeA,B: typeB,h: onHit};
      
      //$LASTPOS=38002844;//kernel.Sprites:2844
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      "use strict";
      var _this=this;
      var ctx;
      var i;
      
      //$LASTPOS=38002897;//kernel.Sprites:2897
      ctx = c.getContext("2d");
      
      //$LASTPOS=38002930;//kernel.Sprites:2930
      ctx.textBaseline="top";
      //$LASTPOS=38002959;//kernel.Sprites:2959
      ctx.save();
      //$LASTPOS=38002976;//kernel.Sprites:2976
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=38003016;//kernel.Sprites:3016
      //$LASTPOS=38003021;//kernel.Sprites:3021
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=38003061;//kernel.Sprites:3061
          ctx.beginPath();
          //$LASTPOS=38003087;//kernel.Sprites:3087
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=38003133;//kernel.Sprites:3133
          ctx.moveTo(i,0);
          //$LASTPOS=38003159;//kernel.Sprites:3159
          ctx.lineTo(i,c.height);
          //$LASTPOS=38003192;//kernel.Sprites:3192
          ctx.closePath();
          //$LASTPOS=38003218;//kernel.Sprites:3218
          ctx.stroke();
        }
      }
      //$LASTPOS=38003246;//kernel.Sprites:3246
      //$LASTPOS=38003251;//kernel.Sprites:3251
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=38003292;//kernel.Sprites:3292
          ctx.beginPath();
          //$LASTPOS=38003318;//kernel.Sprites:3318
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=38003364;//kernel.Sprites:3364
          ctx.moveTo(0,i);
          //$LASTPOS=38003390;//kernel.Sprites:3390
          ctx.lineTo(c.width,i);
          //$LASTPOS=38003422;//kernel.Sprites:3422
          ctx.closePath();
          //$LASTPOS=38003448;//kernel.Sprites:3448
          ctx.stroke();
        }
      }
      //$LASTPOS=38003474;//kernel.Sprites:3474
      ctx.fillStyle="white";
      //$LASTPOS=38003502;//kernel.Sprites:3502
      ctx.font="15px monospaced";
      //$LASTPOS=38003535;//kernel.Sprites:3535
      //$LASTPOS=38003540;//kernel.Sprites:3540
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=38003583;//kernel.Sprites:3583
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=38003617;//kernel.Sprites:3617
      //$LASTPOS=38003622;//kernel.Sprites:3622
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=38003666;//kernel.Sprites:3666
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=38003700;//kernel.Sprites:3700
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=38002897;//kernel.Sprites:2897
      ctx = c.getContext("2d");
      
      //$LASTPOS=38002930;//kernel.Sprites:2930
      ctx.textBaseline="top";
      //$LASTPOS=38002959;//kernel.Sprites:2959
      ctx.save();
      //$LASTPOS=38002976;//kernel.Sprites:2976
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=38003016;//kernel.Sprites:3016
      //$LASTPOS=38003021;//kernel.Sprites:3021
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=38003061;//kernel.Sprites:3061
          ctx.beginPath();
          //$LASTPOS=38003087;//kernel.Sprites:3087
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=38003133;//kernel.Sprites:3133
          ctx.moveTo(i,0);
          //$LASTPOS=38003159;//kernel.Sprites:3159
          ctx.lineTo(i,c.height);
          //$LASTPOS=38003192;//kernel.Sprites:3192
          ctx.closePath();
          //$LASTPOS=38003218;//kernel.Sprites:3218
          ctx.stroke();
        }
      }
      //$LASTPOS=38003246;//kernel.Sprites:3246
      //$LASTPOS=38003251;//kernel.Sprites:3251
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=38003292;//kernel.Sprites:3292
          ctx.beginPath();
          //$LASTPOS=38003318;//kernel.Sprites:3318
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=38003364;//kernel.Sprites:3364
          ctx.moveTo(0,i);
          //$LASTPOS=38003390;//kernel.Sprites:3390
          ctx.lineTo(c.width,i);
          //$LASTPOS=38003422;//kernel.Sprites:3422
          ctx.closePath();
          //$LASTPOS=38003448;//kernel.Sprites:3448
          ctx.stroke();
        }
      }
      //$LASTPOS=38003474;//kernel.Sprites:3474
      ctx.fillStyle="white";
      //$LASTPOS=38003502;//kernel.Sprites:3502
      ctx.font="15px monospaced";
      //$LASTPOS=38003535;//kernel.Sprites:3535
      //$LASTPOS=38003540;//kernel.Sprites:3540
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=38003583;//kernel.Sprites:3583
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=38003617;//kernel.Sprites:3617
      //$LASTPOS=38003622;//kernel.Sprites:3622
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=38003666;//kernel.Sprites:3666
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=38003700;//kernel.Sprites:3700
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003868;//kernel.Sprites:3868
      _this.sx=scrollX;
      //$LASTPOS=38003885;//kernel.Sprites:3885
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38003868;//kernel.Sprites:3868
      _this.sx=scrollX;
      //$LASTPOS=38003885;//kernel.Sprites:3885
      _this.sy=scrollY;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Sprites_all(c) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=38003925;//kernel.Sprites:3925
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=38003950;//kernel.Sprites:3950
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=38004033;//kernel.Sprites:4033
      _this.sprites.forEach((function anonymous_4049(s) {
        
        //$LASTPOS=38004065;//kernel.Sprites:4065
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=38004096;//kernel.Sprites:4096
        if (! c||s instanceof c) {
          //$LASTPOS=38004137;//kernel.Sprites:4137
          res.push(s);
          
        }
      }));
      return res;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"scrollTo":{"nowait":false},"all":{"nowait":true}},"fields":{"sprites":{},"imageList":{},"hitWatchers":{},"isDrawGrid":{},"sx":{},"sy":{},"objId":{},"t1Sprites":{},"drawing":{}}}
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
      
      //$LASTPOS=39000065;//kernel.BodyActor:65
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
      //$LASTPOS=39000080;//kernel.BodyActor:80
      _this._th.on("end",Tonyu.bindFunc(_this,_this.initBody));
    },
    getWorld :function _trc_BodyActor_getWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=39000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=39000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      _thread.retVal=Tonyu.globals.$t2World;return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_BodyActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000229;//kernel.BodyActor:229
      _this.initBody();
      //$LASTPOS=39000246;//kernel.BodyActor:246
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
            //$LASTPOS=39000229;//kernel.BodyActor:229
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39000246;//kernel.BodyActor:246
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
      
      //$LASTPOS=39000285;//kernel.BodyActor:285
      if (_this.body) {
        return _this;
      }
      //$LASTPOS=39000308;//kernel.BodyActor:308
      wworld = _this.getWorld();
      
      //$LASTPOS=39000336;//kernel.BodyActor:336
      _this.world=wworld.world;
      //$LASTPOS=39000361;//kernel.BodyActor:361
      _this.scale=wworld.scale;
      //$LASTPOS=39000386;//kernel.BodyActor:386
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=39000430;//kernel.BodyActor:430
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=39000477;//kernel.BodyActor:477
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=39000518;//kernel.BodyActor:518
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      
      //$LASTPOS=39000571;//kernel.BodyActor:571
      b2Fixture = Box2D.Dynamics.b2Fixture;
      
      //$LASTPOS=39000618;//kernel.BodyActor:618
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      
      //$LASTPOS=39000683;//kernel.BodyActor:683
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      
      //$LASTPOS=39000752;//kernel.BodyActor:752
      fixDef = new b2FixtureDef;
      
      //$LASTPOS=39000788;//kernel.BodyActor:788
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=39000830;//kernel.BodyActor:830
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=39000874;//kernel.BodyActor:874
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=39000930;//kernel.BodyActor:930
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=39000964;//kernel.BodyActor:964
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=39001052;//kernel.BodyActor:1052
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=39001088;//kernel.BodyActor:1088
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=39001124;//kernel.BodyActor:1124
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=39001173;//kernel.BodyActor:1173
      w = _this.width;
      h = _this.height;
      
      //$LASTPOS=39001200;//kernel.BodyActor:1200
      if (! w) {
        //$LASTPOS=39001219;//kernel.BodyActor:1219
        _this.detectShape();
        //$LASTPOS=39001243;//kernel.BodyActor:1243
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=39001273;//kernel.BodyActor:1273
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=39001315;//kernel.BodyActor:1315
      if (_this.shape=="box") {
        //$LASTPOS=39001344;//kernel.BodyActor:1344
        if (! h) {
          //$LASTPOS=39001352;//kernel.BodyActor:1352
          h=w;
        }
        //$LASTPOS=39001366;//kernel.BodyActor:1366
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=39001410;//kernel.BodyActor:1410
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=39001514;//kernel.BodyActor:1514
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=39001551;//kernel.BodyActor:1551
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=39001628;//kernel.BodyActor:1628
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=39001664;//kernel.BodyActor:1664
      fps = wworld.fps;
      
      //$LASTPOS=39001689;//kernel.BodyActor:1689
      r = _this.rotation;
      ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));
      vr = _this.defv(_this.vrotation,0);
      
      //$LASTPOS=39001771;//kernel.BodyActor:1771
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=39001808;//kernel.BodyActor:1808
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=39001841;//kernel.BodyActor:1841
      _this.body.SetUserData(_this);
      //$LASTPOS=39001870;//kernel.BodyActor:1870
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=39001903;//kernel.BodyActor:1903
      _this.rotation=r;
      //$LASTPOS=39001920;//kernel.BodyActor:1920
      _this.vrotation=vr;
      //$LASTPOS=39001939;//kernel.BodyActor:1939
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
      
      //$LASTPOS=39000285;//kernel.BodyActor:285
      if (_this.body) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_BodyActor_ent_initBody(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000308;//kernel.BodyActor:308
            _this.fiber$getWorld(_thread);
            __pc=1;return;
          case 1:
            wworld=_thread.retVal;
            
            //$LASTPOS=39000336;//kernel.BodyActor:336
            _this.world=wworld.world;
            //$LASTPOS=39000361;//kernel.BodyActor:361
            _this.scale=wworld.scale;
            //$LASTPOS=39000386;//kernel.BodyActor:386
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=39000430;//kernel.BodyActor:430
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=39000477;//kernel.BodyActor:477
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=39000518;//kernel.BodyActor:518
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
            
            //$LASTPOS=39000571;//kernel.BodyActor:571
            b2Fixture = Box2D.Dynamics.b2Fixture;
            
            //$LASTPOS=39000618;//kernel.BodyActor:618
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            
            //$LASTPOS=39000683;//kernel.BodyActor:683
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
            
            //$LASTPOS=39000752;//kernel.BodyActor:752
            fixDef = new b2FixtureDef;
            
            //$LASTPOS=39000788;//kernel.BodyActor:788
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=2;return;
          case 2:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=39000830;//kernel.BodyActor:830
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=3;return;
          case 3:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=39000874;//kernel.BodyActor:874
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=4;return;
          case 4:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=39000930;//kernel.BodyActor:930
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=39000964;//kernel.BodyActor:964
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=39001052;//kernel.BodyActor:1052
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=39001088;//kernel.BodyActor:1088
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=39001124;//kernel.BodyActor:1124
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=39001173;//kernel.BodyActor:1173
            w = _this.width;
            h = _this.height;
            
            //$LASTPOS=39001200;//kernel.BodyActor:1200
            if (! w) {
              //$LASTPOS=39001219;//kernel.BodyActor:1219
              _this.detectShape();
              //$LASTPOS=39001243;//kernel.BodyActor:1243
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=39001273;//kernel.BodyActor:1273
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=39001315;//kernel.BodyActor:1315
            if (_this.shape=="box") {
              //$LASTPOS=39001344;//kernel.BodyActor:1344
              if (! h) {
                //$LASTPOS=39001352;//kernel.BodyActor:1352
                h=w;
              }
              //$LASTPOS=39001366;//kernel.BodyActor:1366
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=39001410;//kernel.BodyActor:1410
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=39001514;//kernel.BodyActor:1514
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=39001551;//kernel.BodyActor:1551
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=39001628;//kernel.BodyActor:1628
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=39001664;//kernel.BodyActor:1664
            fps = wworld.fps;
            
            //$LASTPOS=39001689;//kernel.BodyActor:1689
            r = _this.rotation;
            _this.fiber$bvec(_thread, _this.defv(_this.vx*fps,0), _this.defv(_this.vy*fps,0));
            __pc=5;return;
          case 5:
            ve=_thread.retVal;
            _this.fiber$defv(_thread, _this.vrotation, 0);
            __pc=6;return;
          case 6:
            vr=_thread.retVal;
            
            //$LASTPOS=39001771;//kernel.BodyActor:1771
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=39001808;//kernel.BodyActor:1808
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=39001841;//kernel.BodyActor:1841
            _this.body.SetUserData(_this);
            //$LASTPOS=39001870;//kernel.BodyActor:1870
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=39001903;//kernel.BodyActor:1903
            _this.rotation=r;
            //$LASTPOS=39001920;//kernel.BodyActor:1920
            _this.vrotation=vr;
            //$LASTPOS=39001939;//kernel.BodyActor:1939
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
      
      //$LASTPOS=39002000;//kernel.BodyActor:2000
      _this.initBody();
      //$LASTPOS=39002017;//kernel.BodyActor:2017
      res = [];
      
      //$LASTPOS=39002042;//kernel.BodyActor:2042
      w = _this.getWorld();
      
      //$LASTPOS=39002065;//kernel.BodyActor:2065
      //$LASTPOS=39002070;//kernel.BodyActor:2070
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=39002127;//kernel.BodyActor:2127
          if (c.IsTouching()) {
            //$LASTPOS=39002159;//kernel.BodyActor:2159
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=39002231;//kernel.BodyActor:2231
            if (m.m_points[0]) {
              //$LASTPOS=39002269;//kernel.BodyActor:2269
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=39002343;//kernel.BodyActor:2343
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=39002518;//kernel.BodyActor:2518
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=39002620;//kernel.BodyActor:2620
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=39002646;//kernel.BodyActor:2646
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=39002706;//kernel.BodyActor:2706
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=39002766;//kernel.BodyActor:2766
            if (a===_this) {
              //$LASTPOS=39002799;//kernel.BodyActor:2799
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=39002869;//kernel.BodyActor:2869
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=39002962;//kernel.BodyActor:2962
              if (b===_this) {
                //$LASTPOS=39002995;//kernel.BodyActor:2995
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=39003065;//kernel.BodyActor:3065
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
            //$LASTPOS=39002000;//kernel.BodyActor:2000
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39002017;//kernel.BodyActor:2017
            res = [];
            
            //$LASTPOS=39002042;//kernel.BodyActor:2042
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            w=_thread.retVal;
            
            //$LASTPOS=39002065;//kernel.BodyActor:2065
            //$LASTPOS=39002070;//kernel.BodyActor:2070
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=39002127;//kernel.BodyActor:2127
                if (c.IsTouching()) {
                  //$LASTPOS=39002159;//kernel.BodyActor:2159
                  c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
                  //$LASTPOS=39002231;//kernel.BodyActor:2231
                  if (m.m_points[0]) {
                    //$LASTPOS=39002269;//kernel.BodyActor:2269
                    if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                      //$LASTPOS=39002343;//kernel.BodyActor:2343
                      point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                      
                    } else {
                      //$LASTPOS=39002518;//kernel.BodyActor:2518
                      point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                      
                    }
                    
                  } else {
                    //$LASTPOS=39002620;//kernel.BodyActor:2620
                    point={x: _this.x,y: _this.y};
                  }
                  //$LASTPOS=39002646;//kernel.BodyActor:2646
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=39002706;//kernel.BodyActor:2706
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=39002766;//kernel.BodyActor:2766
                  if (a===_this) {
                    //$LASTPOS=39002799;//kernel.BodyActor:2799
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=39002869;//kernel.BodyActor:2869
                      res.push({target: b,manifold: m,x: point.x,y: point.y});
                      
                    }
                    
                  } else {
                    //$LASTPOS=39002962;//kernel.BodyActor:2962
                    if (b===_this) {
                      //$LASTPOS=39002995;//kernel.BodyActor:2995
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=39003065;//kernel.BodyActor:3065
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
      
      //$LASTPOS=39003341;//kernel.BodyActor:3341
      _this.initBody();
      //$LASTPOS=39003358;//kernel.BodyActor:3358
      res = [];
      
      //$LASTPOS=39003375;//kernel.BodyActor:3375
      //$LASTPOS=39003380;//kernel.BodyActor:3380
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=39003437;//kernel.BodyActor:3437
          if (c.IsTouching()) {
            //$LASTPOS=39003472;//kernel.BodyActor:3472
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=39003532;//kernel.BodyActor:3532
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=39003592;//kernel.BodyActor:3592
            if (a===_this) {
              //$LASTPOS=39003625;//kernel.BodyActor:3625
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=39003695;//kernel.BodyActor:3695
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=39003747;//kernel.BodyActor:3747
              if (b===_this) {
                //$LASTPOS=39003780;//kernel.BodyActor:3780
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=39003850;//kernel.BodyActor:3850
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
            //$LASTPOS=39003341;//kernel.BodyActor:3341
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39003358;//kernel.BodyActor:3358
            res = [];
            
            //$LASTPOS=39003375;//kernel.BodyActor:3375
            //$LASTPOS=39003380;//kernel.BodyActor:3380
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=39003437;//kernel.BodyActor:3437
                if (c.IsTouching()) {
                  //$LASTPOS=39003472;//kernel.BodyActor:3472
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=39003532;//kernel.BodyActor:3532
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=39003592;//kernel.BodyActor:3592
                  if (a===_this) {
                    //$LASTPOS=39003625;//kernel.BodyActor:3625
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=39003695;//kernel.BodyActor:3695
                      res.push(b);
                      
                    }
                    
                  } else {
                    //$LASTPOS=39003747;//kernel.BodyActor:3747
                    if (b===_this) {
                      //$LASTPOS=39003780;//kernel.BodyActor:3780
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=39003850;//kernel.BodyActor:3850
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
      
      //$LASTPOS=39003968;//kernel.BodyActor:3968
      _this.initBody();
      //$LASTPOS=39003985;//kernel.BodyActor:3985
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=39004029;//kernel.BodyActor:4029
      scale = _this.getWorld().scale;
      
      //$LASTPOS=39004062;//kernel.BodyActor:4062
      fps = 60;
      
      //$LASTPOS=39004079;//kernel.BodyActor:4079
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
            //$LASTPOS=39003968;//kernel.BodyActor:3968
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39003985;//kernel.BodyActor:3985
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=39004029;//kernel.BodyActor:4029
            scale = _this.getWorld().scale;
            
            //$LASTPOS=39004062;//kernel.BodyActor:4062
            fps = 60;
            
            //$LASTPOS=39004079;//kernel.BodyActor:4079
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
      
      //$LASTPOS=39004173;//kernel.BodyActor:4173
      _this.initBody();
      //$LASTPOS=39004190;//kernel.BodyActor:4190
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=39004234;//kernel.BodyActor:4234
      scale = _this.getWorld().scale;
      
      //$LASTPOS=39004267;//kernel.BodyActor:4267
      fps = 60;
      
      //$LASTPOS=39004284;//kernel.BodyActor:4284
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
            //$LASTPOS=39004173;//kernel.BodyActor:4173
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39004190;//kernel.BodyActor:4190
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=39004234;//kernel.BodyActor:4234
            scale = _this.getWorld().scale;
            
            //$LASTPOS=39004267;//kernel.BodyActor:4267
            fps = 60;
            
            //$LASTPOS=39004284;//kernel.BodyActor:4284
            _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39004371;//kernel.BodyActor:4371
      _this.initBody();
      //$LASTPOS=39004388;//kernel.BodyActor:4388
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
            //$LASTPOS=39004371;//kernel.BodyActor:4371
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39004388;//kernel.BodyActor:4388
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
      
      //$LASTPOS=39004435;//kernel.BodyActor:4435
      _this.initBody();
      //$LASTPOS=39004452;//kernel.BodyActor:4452
      pos = _this.body.GetPosition();
      
      //$LASTPOS=39004485;//kernel.BodyActor:4485
      pos.x+=dx/_this.scale;
      //$LASTPOS=39004507;//kernel.BodyActor:4507
      pos.y+=dy/_this.scale;
      //$LASTPOS=39004529;//kernel.BodyActor:4529
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
            //$LASTPOS=39004435;//kernel.BodyActor:4435
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39004452;//kernel.BodyActor:4452
            pos = _this.body.GetPosition();
            
            //$LASTPOS=39004485;//kernel.BodyActor:4485
            pos.x+=dx/_this.scale;
            //$LASTPOS=39004507;//kernel.BodyActor:4507
            pos.y+=dy/_this.scale;
            //$LASTPOS=39004529;//kernel.BodyActor:4529
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
      
      //$LASTPOS=39004620;//kernel.BodyActor:4620
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=39004638;//kernel.BodyActor:4638
      if (_this.world) {
        //$LASTPOS=39004649;//kernel.BodyActor:4649
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
      
      //$LASTPOS=39004711;//kernel.BodyActor:4711
      _this.initBody();
      //$LASTPOS=39004758;//kernel.BodyActor:4758
      params=params||{};
      //$LASTPOS=39004782;//kernel.BodyActor:4782
      px = params.x||_this.x;
      
      //$LASTPOS=39004807;//kernel.BodyActor:4807
      py = params.y||_this.y;
      
      //$LASTPOS=39004832;//kernel.BodyActor:4832
      wworld = _this.getWorld();
      
      //$LASTPOS=39004874;//kernel.BodyActor:4874
      scale = wworld.scale;
      
      //$LASTPOS=39004903;//kernel.BodyActor:4903
      world = wworld.world;
      
      //$LASTPOS=39004932;//kernel.BodyActor:4932
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=39004979;//kernel.BodyActor:4979
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=39005020;//kernel.BodyActor:5020
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      
      //$LASTPOS=39005075;//kernel.BodyActor:5075
      jd = new JDC;
      
      //$LASTPOS=39005096;//kernel.BodyActor:5096
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=39005130;//kernel.BodyActor:5130
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=39005172;//kernel.BodyActor:5172
      bodyDef.position.x=px/scale;
      //$LASTPOS=39005209;//kernel.BodyActor:5209
      bodyDef.position.y=py/scale;
      //$LASTPOS=39005246;//kernel.BodyActor:5246
      bodyB = world.CreateBody(bodyDef);
      
      //$LASTPOS=39005288;//kernel.BodyActor:5288
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=39005332;//kernel.BodyActor:5332
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=39005395;//kernel.BodyActor:5395
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=39005449;//kernel.BodyActor:5449
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=39005497;//kernel.BodyActor:5497
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=39005545;//kernel.BodyActor:5545
        jd.enableLimit=true;
        
      }
      //$LASTPOS=39005580;//kernel.BodyActor:5580
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
            //$LASTPOS=39004711;//kernel.BodyActor:4711
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39004758;//kernel.BodyActor:4758
            params=params||{};
            //$LASTPOS=39004782;//kernel.BodyActor:4782
            px = params.x||_this.x;
            
            //$LASTPOS=39004807;//kernel.BodyActor:4807
            py = params.y||_this.y;
            
            //$LASTPOS=39004832;//kernel.BodyActor:4832
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            wworld=_thread.retVal;
            
            //$LASTPOS=39004874;//kernel.BodyActor:4874
            scale = wworld.scale;
            
            //$LASTPOS=39004903;//kernel.BodyActor:4903
            world = wworld.world;
            
            //$LASTPOS=39004932;//kernel.BodyActor:4932
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=39004979;//kernel.BodyActor:4979
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=39005020;//kernel.BodyActor:5020
            JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
            
            //$LASTPOS=39005075;//kernel.BodyActor:5075
            jd = new JDC;
            
            //$LASTPOS=39005096;//kernel.BodyActor:5096
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=39005130;//kernel.BodyActor:5130
            bodyDef.type=b2Body.b2_staticBody;
            //$LASTPOS=39005172;//kernel.BodyActor:5172
            bodyDef.position.x=px/scale;
            //$LASTPOS=39005209;//kernel.BodyActor:5209
            bodyDef.position.y=py/scale;
            //$LASTPOS=39005246;//kernel.BodyActor:5246
            bodyB = world.CreateBody(bodyDef);
            
            //$LASTPOS=39005288;//kernel.BodyActor:5288
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=39005332;//kernel.BodyActor:5332
            jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
            //$LASTPOS=39005395;//kernel.BodyActor:5395
            if (params.lowerAngle&&params.upperAngle) {
              //$LASTPOS=39005449;//kernel.BodyActor:5449
              jd.lowerAngle=_this.rad(params.lowerAngle);
              //$LASTPOS=39005497;//kernel.BodyActor:5497
              jd.upperAngle=_this.rad(params.upperAngle);
              //$LASTPOS=39005545;//kernel.BodyActor:5545
              jd.enableLimit=true;
              
            }
            //$LASTPOS=39005580;//kernel.BodyActor:5580
            world.CreateJoint(jd);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39005628;//kernel.BodyActor:5628
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39005732;//kernel.BodyActor:5732
      r=r||0;
      //$LASTPOS=39005745;//kernel.BodyActor:5745
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=39005799;//kernel.BodyActor:5799
      _this.body.SetAngle(_this.rad(r));
    },
    __getter__x :function _trc_BodyActor___getter__x() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=39005839;//kernel.BodyActor:5839
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=39005866;//kernel.BodyActor:5866
      pos = _this.body.GetPosition();
      
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=39005935;//kernel.BodyActor:5935
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=39005964;//kernel.BodyActor:5964
      v=v||0;
      //$LASTPOS=39005977;//kernel.BodyActor:5977
      pos = _this.body.GetPosition();
      
      //$LASTPOS=39006010;//kernel.BodyActor:6010
      pos.x=v/_this.scale;
      //$LASTPOS=39006030;//kernel.BodyActor:6030
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=39006067;//kernel.BodyActor:6067
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=39006094;//kernel.BodyActor:6094
      pos = _this.body.GetPosition();
      
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=39006163;//kernel.BodyActor:6163
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=39006192;//kernel.BodyActor:6192
      v=v||0;
      //$LASTPOS=39006205;//kernel.BodyActor:6205
      pos = _this.body.GetPosition();
      
      //$LASTPOS=39006238;//kernel.BodyActor:6238
      pos.y=v/_this.scale;
      //$LASTPOS=39006258;//kernel.BodyActor:6258
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=39006298;//kernel.BodyActor:6298
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=39006326;//kernel.BodyActor:6326
      v = _this.body.GetLinearVelocity();
      
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=39006413;//kernel.BodyActor:6413
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=39006443;//kernel.BodyActor:6443
      v=v||0;
      //$LASTPOS=39006456;//kernel.BodyActor:6456
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=39006494;//kernel.BodyActor:6494
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=39006528;//kernel.BodyActor:6528
      if (v) {
        //$LASTPOS=39006535;//kernel.BodyActor:6535
        _this.body.SetAwake(true);
      }
      //$LASTPOS=39006561;//kernel.BodyActor:6561
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=39006606;//kernel.BodyActor:6606
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=39006634;//kernel.BodyActor:6634
      v = _this.body.GetLinearVelocity();
      
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=39006721;//kernel.BodyActor:6721
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=39006751;//kernel.BodyActor:6751
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=39006789;//kernel.BodyActor:6789
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=39006823;//kernel.BodyActor:6823
      if (v) {
        //$LASTPOS=39006830;//kernel.BodyActor:6830
        _this.body.SetAwake(true);
      }
      //$LASTPOS=39006856;//kernel.BodyActor:6856
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39006906;//kernel.BodyActor:6906
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39007012;//kernel.BodyActor:7012
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=39007042;//kernel.BodyActor:7042
      v=v||0;
      //$LASTPOS=39007055;//kernel.BodyActor:7055
      if (v) {
        //$LASTPOS=39007062;//kernel.BodyActor:7062
        _this.body.SetAwake(true);
      }
      //$LASTPOS=39007088;//kernel.BodyActor:7088
      _this.body.SetAngularVelocity(_this.rad(v*_this.getWorld().fps));
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"getWorld":{"nowait":false},"update":{"nowait":false},"initBody":{"nowait":false},"allContactPoints":{"nowait":false},"contactPoint":{"nowait":false},"allContact":{"nowait":false},"allContacts":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"addRevoluteJoint":{"nowait":false},"__getter__rotation":{"nowait":true},"__setter__rotation":{"nowait":true},"__getter__x":{"nowait":true},"__setter__x":{"nowait":true},"__getter__y":{"nowait":true},"__setter__y":{"nowait":true},"__getter__vx":{"nowait":true},"__setter__vx":{"nowait":true},"__getter__vy":{"nowait":true},"__setter__vy":{"nowait":true},"__getter__vrotation":{"nowait":true},"__setter__vrotation":{"nowait":true}},"fields":{"body":{},"world":{},"density":{},"friction":{},"restitution":{},"isStatic":{},"shape":{},"vx":{},"vy":{},"vrotation":{},"manualRotation":{},"_rotation":{},"_x":{},"_y":{},"_vx":{},"_vy":{},"_vr":{}}}
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=40000150;//kernel.T2World:150
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
            //$LASTPOS=40000150;//kernel.T2World:150
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
      
      //$LASTPOS=40000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=40000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000133;//kernel.T2World:133
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
      
      //$LASTPOS=40000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=40000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=40000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=40000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      
      //$LASTPOS=40000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=40000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=40000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=40000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=40000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=40000572;//kernel.T2World:572
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
            //$LASTPOS=40000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=40000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=40000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=40000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            
            //$LASTPOS=40000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=40000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=40000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=40000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=40000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=40000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=40000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=40000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=40000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=40000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=40000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=40000976;//kernel.T2World:976
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
            //$LASTPOS=40000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=40000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=40000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=40000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=40000976;//kernel.T2World:976
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
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
      
      //$LASTPOS=40001017;//kernel.T2World:1017
      //$LASTPOS=40001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=40001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=40001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=40001114;//kernel.T2World:1114
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
      
      //$LASTPOS=40001017;//kernel.T2World:1017
      //$LASTPOS=40001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=40001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=40001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=40001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}},"fields":{"gravity":{},"gravityX":{},"fps":{},"world":{}}}
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
      
      //$LASTPOS=41000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        return _this;
      }
      //$LASTPOS=41000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=41000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=41000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=41000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=41000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=41000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    clearSEData :function _trc_T2MediaPlayer_clearSEData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allResetBGM();
      //$LASTPOS=41000312;//kernel.T2MediaPlayer:312
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allResetBGM();
      //$LASTPOS=41000312;//kernel.T2MediaPlayer:312
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000368;//kernel.T2MediaPlayer:368
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
            //$LASTPOS=41000368;//kernel.T2MediaPlayer:368
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
      
      //$LASTPOS=41000415;//kernel.T2MediaPlayer:415
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000415;//kernel.T2MediaPlayer:415
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    getMasterVolume :function _trc_T2MediaPlayer_getMasterVolume() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getMasterVolume()*128;
    },
    fiber$getMasterVolume :function _trc_T2MediaPlayer_f_getMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setMasterVolume :function _trc_T2MediaPlayer_setMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000552;//kernel.T2MediaPlayer:552
      if (typeof  vol==="number") {
        //$LASTPOS=41000592;//kernel.T2MediaPlayer:592
        vol/=128;
        //$LASTPOS=41000613;//kernel.T2MediaPlayer:613
        if (vol<0) {
          //$LASTPOS=41000628;//kernel.T2MediaPlayer:628
          vol=0;
        }
        
      } else {
        return T2MediaLib.setMasterVolume(T2MediaLib.getMasterVolume());
        
      }
      return T2MediaLib.setMasterVolume(vol);
    },
    fiber$setMasterVolume :function _trc_T2MediaPlayer_f_setMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000552;//kernel.T2MediaPlayer:552
      if (typeof  vol==="number") {
        //$LASTPOS=41000592;//kernel.T2MediaPlayer:592
        vol/=128;
        //$LASTPOS=41000613;//kernel.T2MediaPlayer:613
        if (vol<0) {
          //$LASTPOS=41000628;//kernel.T2MediaPlayer:628
          vol=0;
        }
        
      } else {
        _thread.retVal=T2MediaLib.setMasterVolume(T2MediaLib.getMasterVolume());return;
        
        
      }
      _thread.retVal=T2MediaLib.setMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    loadSound :function _trc_T2MediaPlayer_loadSound(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000839;//kernel.T2MediaPlayer:839
      _this.runAsync((function anonymous_848(succ,err) {
        
        //$LASTPOS=41000898;//kernel.T2MediaPlayer:898
        T2MediaLib.loadSound(idx,src,{succ: succ,err: err});
      }));
    },
    fiber$loadSound :function _trc_T2MediaPlayer_f_loadSound(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadSound(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000839;//kernel.T2MediaPlayer:839
            _this.fiber$runAsync(_thread, (function anonymous_848(succ,err) {
              
              //$LASTPOS=41000898;//kernel.T2MediaPlayer:898
              T2MediaLib.loadSound(idx,src,{succ: succ,err: err});
            }));
            __pc=1;return;
          case 1:
            
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
      var _it_402;
      var name;
      var url;
      var e;
      
      //$LASTPOS=41001047;//kernel.T2MediaPlayer:1047
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=41001076;//kernel.T2MediaPlayer:1076
      r = prj.getResource();
      
      //$LASTPOS=41001106;//kernel.T2MediaPlayer:1106
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=41001140;//kernel.T2MediaPlayer:1140
      _it_402=Tonyu.iterator(r.sounds,1);
      while(_it_402.next()) {
        s=_it_402[0];
        
        //$LASTPOS=41001176;//kernel.T2MediaPlayer:1176
        name = s.name;
        url = Tonyu.Assets.resolve(s.url,prj);
        
        //$LASTPOS=41001241;//kernel.T2MediaPlayer:1241
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=41001346;//kernel.T2MediaPlayer:1346
          _this.loadSound(name,url);
          
        } catch (e) {
          //$LASTPOS=41001404;//kernel.T2MediaPlayer:1404
          _this.print("Failed to load",name);
          //$LASTPOS=41001447;//kernel.T2MediaPlayer:1447
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
      var _it_402;
      var name;
      var url;
      var e;
      
      //$LASTPOS=41001047;//kernel.T2MediaPlayer:1047
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=41001076;//kernel.T2MediaPlayer:1076
      r = prj.getResource();
      
      //$LASTPOS=41001106;//kernel.T2MediaPlayer:1106
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41001140;//kernel.T2MediaPlayer:1140
            _it_402=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_402.next())) { __pc=5     ; break; }
            s=_it_402[0];
            
            //$LASTPOS=41001176;//kernel.T2MediaPlayer:1176
            name = s.name;
            url = Tonyu.Assets.resolve(s.url,prj);
            
            //$LASTPOS=41001241;//kernel.T2MediaPlayer:1241
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3     );
            //$LASTPOS=41001346;//kernel.T2MediaPlayer:1346
            _this.fiber$loadSound(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4     ;break;
          case 3     :
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=41001404;//kernel.T2MediaPlayer:1404
              _this.print("Failed to load",name);
              //$LASTPOS=41001447;//kernel.T2MediaPlayer:1447
              Tonyu.setGlobal(name,"ERROR");
            }
          case 4     :
            
            __pc=1;break;
          case 5     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getSoundData :function _trc_T2MediaPlayer_getSoundData(idx) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSoundData(idx);
    },
    fiber$getSoundData :function _trc_T2MediaPlayer_f_getSoundData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSoundData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_T2MediaPlayer_playSE(idx,vol,pan,rate,offset,loop,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41001690;//kernel.T2MediaPlayer:1690
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=41001814;//kernel.T2MediaPlayer:1814
      if (vol==null) {
        //$LASTPOS=41001831;//kernel.T2MediaPlayer:1831
        vol=128;
      }
      //$LASTPOS=41001847;//kernel.T2MediaPlayer:1847
      if (typeof  vol==="number") {
        //$LASTPOS=41001887;//kernel.T2MediaPlayer:1887
        vol/=128;
        //$LASTPOS=41001908;//kernel.T2MediaPlayer:1908
        if (vol<0) {
          //$LASTPOS=41001923;//kernel.T2MediaPlayer:1923
          vol=0;
        }
        
      } else {
        //$LASTPOS=41001957;//kernel.T2MediaPlayer:1957
        vol=1;
        
      }
      return T2MediaLib.playSE(idx,vol,pan,rate,offset,loop,loopStart,loopEnd);
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
    getSEMasterVolume :function _trc_T2MediaPlayer_getSEMasterVolume() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSEMasterVolume()*128;
    },
    fiber$getSEMasterVolume :function _trc_T2MediaPlayer_f_getSEMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSEMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setSEMasterVolume :function _trc_T2MediaPlayer_setSEMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41002246;//kernel.T2MediaPlayer:2246
      if (typeof  vol==="number") {
        //$LASTPOS=41002286;//kernel.T2MediaPlayer:2286
        vol/=128;
        //$LASTPOS=41002307;//kernel.T2MediaPlayer:2307
        if (vol<0) {
          //$LASTPOS=41002322;//kernel.T2MediaPlayer:2322
          vol=0;
        }
        
      } else {
        return T2MediaLib.setSEMasterVolume(T2MediaLib.getSEMasterVolume());
        
      }
      return T2MediaLib.setSEMasterVolume(vol);
    },
    fiber$setSEMasterVolume :function _trc_T2MediaPlayer_f_setSEMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41002246;//kernel.T2MediaPlayer:2246
      if (typeof  vol==="number") {
        //$LASTPOS=41002286;//kernel.T2MediaPlayer:2286
        vol/=128;
        //$LASTPOS=41002307;//kernel.T2MediaPlayer:2307
        if (vol<0) {
          //$LASTPOS=41002322;//kernel.T2MediaPlayer:2322
          vol=0;
        }
        
      } else {
        _thread.retVal=T2MediaLib.setSEMasterVolume(T2MediaLib.getSEMasterVolume());return;
        
        
      }
      _thread.retVal=T2MediaLib.setSEMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEVolume :function _trc_T2MediaPlayer_getSEVolume(sourceObj) {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=41002553;//kernel.T2MediaPlayer:2553
      vol = T2MediaLib.getSEVolume(sourceObj);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getSEVolume :function _trc_T2MediaPlayer_f_getSEVolume(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=41002553;//kernel.T2MediaPlayer:2553
      vol = T2MediaLib.getSEVolume(sourceObj);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setSEVolume :function _trc_T2MediaPlayer_setSEVolume(sourceObj,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41002695;//kernel.T2MediaPlayer:2695
      if (typeof  vol==="number") {
        //$LASTPOS=41002735;//kernel.T2MediaPlayer:2735
        vol/=128;
        //$LASTPOS=41002756;//kernel.T2MediaPlayer:2756
        if (vol<0) {
          //$LASTPOS=41002771;//kernel.T2MediaPlayer:2771
          vol=0;
        }
        
      } else {
        return T2MediaLib.setSEVolume(sourceObj,T2MediaLib.getSEVolume(sourceObj));
        
      }
      return T2MediaLib.setSEVolume(sourceObj,vol);
    },
    fiber$setSEVolume :function _trc_T2MediaPlayer_f_setSEVolume(_thread,sourceObj,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41002695;//kernel.T2MediaPlayer:2695
      if (typeof  vol==="number") {
        //$LASTPOS=41002735;//kernel.T2MediaPlayer:2735
        vol/=128;
        //$LASTPOS=41002756;//kernel.T2MediaPlayer:2756
        if (vol<0) {
          //$LASTPOS=41002771;//kernel.T2MediaPlayer:2771
          vol=0;
        }
        
      } else {
        _thread.retVal=T2MediaLib.setSEVolume(sourceObj,T2MediaLib.getSEVolume(sourceObj));return;
        
        
      }
      _thread.retVal=T2MediaLib.setSEVolume(sourceObj,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getSERate :function _trc_T2MediaPlayer_getSERate(sourceObj) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSERate(sourceObj);
    },
    fiber$getSERate :function _trc_T2MediaPlayer_f_getSERate(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSERate(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSERate :function _trc_T2MediaPlayer_setSERate(sourceObj,rate) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setSERate(sourceObj,rate);
    },
    fiber$setSERate :function _trc_T2MediaPlayer_f_setSERate(_thread,sourceObj,rate) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setSERate(sourceObj,rate);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEPan :function _trc_T2MediaPlayer_getSEPan(sourceObj) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSEPan(sourceObj);
    },
    fiber$getSEPan :function _trc_T2MediaPlayer_f_getSEPan(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSEPan(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSEPan :function _trc_T2MediaPlayer_setSEPan(sourceObj,pan) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setSEPan(sourceObj,pan);
    },
    fiber$setSEPan :function _trc_T2MediaPlayer_f_setSEPan(_thread,sourceObj,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setSEPan(sourceObj,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isSELoop :function _trc_T2MediaPlayer_isSELoop(sourceObj) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.isSELoop(sourceObj);
    },
    fiber$isSELoop :function _trc_T2MediaPlayer_f_isSELoop(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.isSELoop(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoop :function _trc_T2MediaPlayer_setSELoop(sourceObj,loop) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setSELoop(sourceObj,loop);
    },
    fiber$setSELoop :function _trc_T2MediaPlayer_f_setSELoop(_thread,sourceObj,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setSELoop(sourceObj,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getSELoopStartTime :function _trc_T2MediaPlayer_getSELoopStartTime(sourceObj) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSELoopStartTime(sourceObj);
    },
    fiber$getSELoopStartTime :function _trc_T2MediaPlayer_f_getSELoopStartTime(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSELoopStartTime(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoopStartTime :function _trc_T2MediaPlayer_setSELoopStartTime(sourceObj,loopStart) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setSELoopStartTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopStart);
    },
    fiber$setSELoopStartTime :function _trc_T2MediaPlayer_f_setSELoopStartTime(_thread,sourceObj,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setSELoopStartTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getSELoopEndTime :function _trc_T2MediaPlayer_getSELoopEndTime(sourceObj) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getSELoopEndTime(sourceObj);
    },
    fiber$getSELoopEndTime :function _trc_T2MediaPlayer_f_getSELoopEndTime(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSELoopEndTime(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoopEndTime :function _trc_T2MediaPlayer_setSELoopEndTime(sourceObj,loopEnd) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setSELoopEndTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopEnd);
    },
    fiber$setSELoopEndTime :function _trc_T2MediaPlayer_f_setSELoopEndTime(_thread,sourceObj,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setSELoopEndTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    playBGM :function _trc_T2MediaPlayer_playBGM(idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41003950;//kernel.T2MediaPlayer:3950
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=41003973;//kernel.T2MediaPlayer:3973
      if (loop==null) {
        //$LASTPOS=41003991;//kernel.T2MediaPlayer:3991
        loop=false;
      }
      //$LASTPOS=41004010;//kernel.T2MediaPlayer:4010
      if (offset==null) {
        //$LASTPOS=41004030;//kernel.T2MediaPlayer:4030
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41003950;//kernel.T2MediaPlayer:3950
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=41003973;//kernel.T2MediaPlayer:3973
      if (loop==null) {
        //$LASTPOS=41003991;//kernel.T2MediaPlayer:3991
        loop=false;
      }
      //$LASTPOS=41004010;//kernel.T2MediaPlayer:4010
      if (offset==null) {
        //$LASTPOS=41004030;//kernel.T2MediaPlayer:4030
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
      
      //$LASTPOS=41004252;//kernel.T2MediaPlayer:4252
      if (_this.mute) {
        return _this;
      }
      return T2MediaLib.resumeBGM(0);
    },
    fiber$resumeBGM :function _trc_T2MediaPlayer_f_resumeBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41004252;//kernel.T2MediaPlayer:4252
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=T2MediaLib.resumeBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMMasterVolume :function _trc_T2MediaPlayer_getBGMMasterVolume() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMMasterVolume()*128;
    },
    fiber$getBGMMasterVolume :function _trc_T2MediaPlayer_f_getBGMMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMMasterVolume :function _trc_T2MediaPlayer_setBGMMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41004426;//kernel.T2MediaPlayer:4426
      if (typeof  vol==="number") {
        //$LASTPOS=41004466;//kernel.T2MediaPlayer:4466
        vol/=128;
        //$LASTPOS=41004487;//kernel.T2MediaPlayer:4487
        if (vol<0) {
          //$LASTPOS=41004502;//kernel.T2MediaPlayer:4502
          vol=0;
        }
        
      } else {
        return T2MediaLib.setBGMMasterVolume(T2MediaLib.getBGMMasterVolume());
        
      }
      return T2MediaLib.setBGMMasterVolume(vol);
    },
    fiber$setBGMMasterVolume :function _trc_T2MediaPlayer_f_setBGMMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41004426;//kernel.T2MediaPlayer:4426
      if (typeof  vol==="number") {
        //$LASTPOS=41004466;//kernel.T2MediaPlayer:4466
        vol/=128;
        //$LASTPOS=41004487;//kernel.T2MediaPlayer:4487
        if (vol<0) {
          //$LASTPOS=41004502;//kernel.T2MediaPlayer:4502
          vol=0;
        }
        
      } else {
        _thread.retVal=T2MediaLib.setBGMMasterVolume(T2MediaLib.getBGMMasterVolume());return;
        
        
      }
      _thread.retVal=T2MediaLib.setBGMMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMVolume :function _trc_T2MediaPlayer_getBGMVolume() {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=41004728;//kernel.T2MediaPlayer:4728
      vol = T2MediaLib.getBGMVolume(0);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getBGMVolume :function _trc_T2MediaPlayer_f_getBGMVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=41004728;//kernel.T2MediaPlayer:4728
      vol = T2MediaLib.getBGMVolume(0);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolume :function _trc_T2MediaPlayer_setBGMVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41004949;//kernel.T2MediaPlayer:4949
      if (typeof  vol==="number") {
        //$LASTPOS=41004989;//kernel.T2MediaPlayer:4989
        vol/=128;
        //$LASTPOS=41005010;//kernel.T2MediaPlayer:5010
        if (vol<0) {
          //$LASTPOS=41005025;//kernel.T2MediaPlayer:5025
          vol=0;
        }
        
      } else {
        return T2MediaLib.setBGMVolume(0,T2MediaLib.getBGMVolume(0));
        
      }
      return T2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41004949;//kernel.T2MediaPlayer:4949
      if (typeof  vol==="number") {
        //$LASTPOS=41004989;//kernel.T2MediaPlayer:4989
        vol/=128;
        //$LASTPOS=41005010;//kernel.T2MediaPlayer:5010
        if (vol<0) {
          //$LASTPOS=41005025;//kernel.T2MediaPlayer:5025
          vol=0;
        }
        
      } else {
        _thread.retVal=T2MediaLib.setBGMVolume(0,T2MediaLib.getBGMVolume(0));return;
        
        
      }
      _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMTempo :function _trc_T2MediaPlayer_getBGMTempo() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMTempo(0);
    },
    fiber$getBGMTempo :function _trc_T2MediaPlayer_f_getBGMTempo(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMTempo(0);return;
      
      
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
    getBGMPan :function _trc_T2MediaPlayer_getBGMPan() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMPan(0);
    },
    fiber$getBGMPan :function _trc_T2MediaPlayer_f_getBGMPan(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMPan(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMPan :function _trc_T2MediaPlayer_setBGMPan(pan) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMPan(0,pan);
    },
    fiber$setBGMPan :function _trc_T2MediaPlayer_f_setBGMPan(_thread,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMPan(0,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isBGMLoop :function _trc_T2MediaPlayer_isBGMLoop() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.isBGMLoop(0);
    },
    fiber$isBGMLoop :function _trc_T2MediaPlayer_f_isBGMLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.isBGMLoop(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoop :function _trc_T2MediaPlayer_setBGMLoop(loop) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMLoop(0,loop);
    },
    fiber$setBGMLoop :function _trc_T2MediaPlayer_f_setBGMLoop(_thread,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMLoop(0,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopStartTime :function _trc_T2MediaPlayer_getBGMLoopStartTime() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMLoopStartTime(0);
    },
    fiber$getBGMLoopStartTime :function _trc_T2MediaPlayer_f_getBGMLoopStartTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLoopStartTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopStartTime :function _trc_T2MediaPlayer_setBGMLoopStartTime(loopStart) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMLoopStartTime(0,loopStart);
    },
    fiber$setBGMLoopStartTime :function _trc_T2MediaPlayer_f_setBGMLoopStartTime(_thread,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMLoopStartTime(0,loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopEndTime :function _trc_T2MediaPlayer_getBGMLoopEndTime() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMLoopEndTime(0);
    },
    fiber$getBGMLoopEndTime :function _trc_T2MediaPlayer_f_getBGMLoopEndTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLoopEndTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopEndTime :function _trc_T2MediaPlayer_setBGMLoopEndTime(loopEnd) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMLoopEndTime(0,loopEnd);
    },
    fiber$setBGMLoopEndTime :function _trc_T2MediaPlayer_f_setBGMLoopEndTime(_thread,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMLoopEndTime(0,loopEnd);return;
      
      
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
    getPlayingBGMName :function _trc_T2MediaPlayer_getPlayingBGMName() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getPlayingBGMName(0);
    },
    fiber$getPlayingBGMName :function _trc_T2MediaPlayer_f_getPlayingBGMName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getPlayingBGMName(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMOnSongEndListener :function _trc_T2MediaPlayer_setBGMOnSongEndListener() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getPlayingBGMName(0);
    },
    fiber$setBGMOnSongEndListener :function _trc_T2MediaPlayer_f_setBGMOnSongEndListener(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getPlayingBGMName(0);return;
      
      
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
      
      //$LASTPOS=41006383;//kernel.T2MediaPlayer:6383
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=41006406;//kernel.T2MediaPlayer:6406
      if (loop==null) {
        //$LASTPOS=41006424;//kernel.T2MediaPlayer:6424
        loop=false;
      }
      //$LASTPOS=41006443;//kernel.T2MediaPlayer:6443
      if (offset==null) {
        //$LASTPOS=41006463;//kernel.T2MediaPlayer:6463
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41006383;//kernel.T2MediaPlayer:6383
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=41006406;//kernel.T2MediaPlayer:6406
      if (loop==null) {
        //$LASTPOS=41006424;//kernel.T2MediaPlayer:6424
        loop=false;
      }
      //$LASTPOS=41006443;//kernel.T2MediaPlayer:6443
      if (offset==null) {
        //$LASTPOS=41006463;//kernel.T2MediaPlayer:6463
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
      
      //$LASTPOS=41006700;//kernel.T2MediaPlayer:6700
      if (_this.mute) {
        return _this;
      }
      return T2MediaLib.resumeBGM(id);
    },
    fiber$resumeBGMID :function _trc_T2MediaPlayer_f_resumeBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41006700;//kernel.T2MediaPlayer:6700
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=T2MediaLib.resumeBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMVolumeID :function _trc_T2MediaPlayer_getBGMVolumeID(id) {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=41006789;//kernel.T2MediaPlayer:6789
      vol = T2MediaLib.getBGMVolume(id);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getBGMVolumeID :function _trc_T2MediaPlayer_f_getBGMVolumeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=41006789;//kernel.T2MediaPlayer:6789
      vol = T2MediaLib.getBGMVolume(id);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolumeID :function _trc_T2MediaPlayer_setBGMVolumeID(id,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41007017;//kernel.T2MediaPlayer:7017
      if (typeof  vol==="number") {
        //$LASTPOS=41007057;//kernel.T2MediaPlayer:7057
        vol/=128;
        //$LASTPOS=41007078;//kernel.T2MediaPlayer:7078
        if (vol<0) {
          //$LASTPOS=41007093;//kernel.T2MediaPlayer:7093
          vol=0;
        }
        
      } else {
        return T2MediaLib.setBGMVolume(id,T2MediaLib.getBGMVolume(id));
        
      }
      return T2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41007017;//kernel.T2MediaPlayer:7017
      if (typeof  vol==="number") {
        //$LASTPOS=41007057;//kernel.T2MediaPlayer:7057
        vol/=128;
        //$LASTPOS=41007078;//kernel.T2MediaPlayer:7078
        if (vol<0) {
          //$LASTPOS=41007093;//kernel.T2MediaPlayer:7093
          vol=0;
        }
        
      } else {
        _thread.retVal=T2MediaLib.setBGMVolume(id,T2MediaLib.getBGMVolume(id));return;
        
        
      }
      _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMTempoID :function _trc_T2MediaPlayer_getBGMTempoID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMTempo(id);
    },
    fiber$getBGMTempoID :function _trc_T2MediaPlayer_f_getBGMTempoID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMTempo(id);return;
      
      
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
    getBGMPanID :function _trc_T2MediaPlayer_getBGMPanID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMPan(id);
    },
    fiber$getBGMPanID :function _trc_T2MediaPlayer_f_getBGMPanID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMPan(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMPanID :function _trc_T2MediaPlayer_setBGMPanID(id,pan) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMPan(id,pan);
    },
    fiber$setBGMPanID :function _trc_T2MediaPlayer_f_setBGMPanID(_thread,id,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMPan(id,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isBGMLoopID :function _trc_T2MediaPlayer_isBGMLoopID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.isBGMLoop(id);
    },
    fiber$isBGMLoopID :function _trc_T2MediaPlayer_f_isBGMLoopID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.isBGMLoop(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopID :function _trc_T2MediaPlayer_setBGMLoopID(id,loop) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMLoop(id,loop);
    },
    fiber$setBGMLoopID :function _trc_T2MediaPlayer_f_setBGMLoopID(_thread,id,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMLoop(id,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopStartTimeID :function _trc_T2MediaPlayer_getBGMLoopStartTimeID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMLoopStartTime(id);
    },
    fiber$getBGMLoopStartTimeID :function _trc_T2MediaPlayer_f_getBGMLoopStartTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLoopStartTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopStartTimeID :function _trc_T2MediaPlayer_setBGMLoopStartTimeID(id,loopStart) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMLoopStartTime(id,loopStart);
    },
    fiber$setBGMLoopStartTimeID :function _trc_T2MediaPlayer_f_setBGMLoopStartTimeID(_thread,id,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMLoopStartTime(id,loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopEndTimeID :function _trc_T2MediaPlayer_getBGMLoopEndTimeID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMLoopEndTime(id);
    },
    fiber$getBGMLoopEndTimeID :function _trc_T2MediaPlayer_f_getBGMLoopEndTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLoopEndTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopEndTimeID :function _trc_T2MediaPlayer_setBGMLoopEndTimeID(id,loopEnd) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.setBGMLoopEndTime(id,loopEnd);
    },
    fiber$setBGMLoopEndTimeID :function _trc_T2MediaPlayer_f_setBGMLoopEndTimeID(_thread,id,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMLoopEndTime(id,loopEnd);return;
      
      
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
    getPlayingBGMNameID :function _trc_T2MediaPlayer_getPlayingBGMNameID(id) {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getPlayingBGMName(id);
    },
    fiber$getPlayingBGMNameID :function _trc_T2MediaPlayer_f_getPlayingBGMNameID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getPlayingBGMName(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPlayerMax :function _trc_T2MediaPlayer_getBGMPlayerMax() {
      "use strict";
      var _this=this;
      
      return T2MediaLib.getBGMPlayerMax();
    },
    fiber$getBGMPlayerMax :function _trc_T2MediaPlayer_f_getBGMPlayerMax(_thread) {
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
      
      //$LASTPOS=41008393;//kernel.T2MediaPlayer:8393
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41008393;//kernel.T2MediaPlayer:8393
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    allResetBGM :function _trc_T2MediaPlayer_allResetBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41008446;//kernel.T2MediaPlayer:8446
      T2MediaLib.allResetBGM();
    },
    fiber$allResetBGM :function _trc_T2MediaPlayer_f_allResetBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41008446;//kernel.T2MediaPlayer:8446
      T2MediaLib.allResetBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41008526;//kernel.T2MediaPlayer:8526
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=41008588;//kernel.T2MediaPlayer:8588
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=41008633;//kernel.T2MediaPlayer:8633
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41008526;//kernel.T2MediaPlayer:8526
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41008588;//kernel.T2MediaPlayer:8588
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3     ; break; }
            //$LASTPOS=41008633;//kernel.T2MediaPlayer:8633
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playAudio :function _trc_T2MediaPlayer_playAudio(idx,loop,startTime) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41008689;//kernel.T2MediaPlayer:8689
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=41008712;//kernel.T2MediaPlayer:8712
      if (loop==null) {
        //$LASTPOS=41008730;//kernel.T2MediaPlayer:8730
        loop=false;
      }
      //$LASTPOS=41008749;//kernel.T2MediaPlayer:8749
      if (startTime==null) {
        //$LASTPOS=41008772;//kernel.T2MediaPlayer:8772
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41008689;//kernel.T2MediaPlayer:8689
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=41008712;//kernel.T2MediaPlayer:8712
      if (loop==null) {
        //$LASTPOS=41008730;//kernel.T2MediaPlayer:8730
        loop=false;
      }
      //$LASTPOS=41008749;//kernel.T2MediaPlayer:8749
      if (startTime==null) {
        //$LASTPOS=41008772;//kernel.T2MediaPlayer:8772
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
      
      //$LASTPOS=41008987;//kernel.T2MediaPlayer:8987
      if (_this.mute) {
        return _this;
      }
      return T2MediaLib.resumeAudio();
    },
    fiber$resumeAudio :function _trc_T2MediaPlayer_f_resumeAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41008987;//kernel.T2MediaPlayer:8987
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=T2MediaLib.resumeAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioVolume :function _trc_T2MediaPlayer_setAudioVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41009077;//kernel.T2MediaPlayer:9077
      vol=vol/128;
      //$LASTPOS=41009099;//kernel.T2MediaPlayer:9099
      if (vol>1) {
        //$LASTPOS=41009119;//kernel.T2MediaPlayer:9119
        vol=1;
      } else {
        //$LASTPOS=41009140;//kernel.T2MediaPlayer:9140
        if (vol<0) {
          //$LASTPOS=41009155;//kernel.T2MediaPlayer:9155
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
      
      //$LASTPOS=41009077;//kernel.T2MediaPlayer:9077
      vol=vol/128;
      //$LASTPOS=41009099;//kernel.T2MediaPlayer:9099
      if (vol>1) {
        //$LASTPOS=41009119;//kernel.T2MediaPlayer:9119
        vol=1;
      } else {
        //$LASTPOS=41009140;//kernel.T2MediaPlayer:9140
        if (vol<0) {
          //$LASTPOS=41009155;//kernel.T2MediaPlayer:9155
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41009245;//kernel.T2MediaPlayer:9245
      if (tempo>4) {
        //$LASTPOS=41009267;//kernel.T2MediaPlayer:9267
        tempo=4;
      } else {
        //$LASTPOS=41009290;//kernel.T2MediaPlayer:9290
        if (tempo<0.5) {
          //$LASTPOS=41009307;//kernel.T2MediaPlayer:9307
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
      
      //$LASTPOS=41009245;//kernel.T2MediaPlayer:9245
      if (tempo>4) {
        //$LASTPOS=41009267;//kernel.T2MediaPlayer:9267
        tempo=4;
      } else {
        //$LASTPOS=41009290;//kernel.T2MediaPlayer:9290
        if (tempo<0.5) {
          //$LASTPOS=41009307;//kernel.T2MediaPlayer:9307
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"clearSEData":{"nowait":false},"clearBGMData":{"nowait":false},"deleteSEData":{"nowait":false},"getMasterVolume":{"nowait":false},"setMasterVolume":{"nowait":false},"loadSound":{"nowait":false},"__getter__available":{"nowait":true},"loadFromProject":{"nowait":false},"getSoundData":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEMasterVolume":{"nowait":false},"setSEMasterVolume":{"nowait":false},"getSEVolume":{"nowait":false},"setSEVolume":{"nowait":false},"getSERate":{"nowait":false},"setSERate":{"nowait":false},"getSEPan":{"nowait":false},"setSEPan":{"nowait":false},"isSELoop":{"nowait":false},"setSELoop":{"nowait":false},"getSELoopStartTime":{"nowait":false},"setSELoopStartTime":{"nowait":false},"getSELoopEndTime":{"nowait":false},"setSELoopEndTime":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"getBGMMasterVolume":{"nowait":false},"setBGMMasterVolume":{"nowait":false},"getBGMVolume":{"nowait":false},"setBGMVolume":{"nowait":false},"getBGMTempo":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMPan":{"nowait":false},"setBGMPan":{"nowait":false},"isBGMLoop":{"nowait":false},"setBGMLoop":{"nowait":false},"getBGMLoopStartTime":{"nowait":false},"setBGMLoopStartTime":{"nowait":false},"getBGMLoopEndTime":{"nowait":false},"setBGMLoopEndTime":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getPlayingBGMName":{"nowait":false},"setBGMOnSongEndListener":{"nowait":false},"getBGMData":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"getBGMVolumeID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"getBGMTempoID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMPanID":{"nowait":false},"setBGMPanID":{"nowait":false},"isBGMLoopID":{"nowait":false},"setBGMLoopID":{"nowait":false},"getBGMLoopStartTimeID":{"nowait":false},"setBGMLoopStartTimeID":{"nowait":false},"getBGMLoopEndTimeID":{"nowait":false},"setBGMLoopEndTimeID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"getPlayingBGMNameID":{"nowait":false},"getBGMPlayerMax":{"nowait":false},"allStopBGM":{"nowait":false},"allResetBGM":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}},"fields":{"bgmPlayerMax":{},"available":{},"mute":{}}}
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
      
      //$LASTPOS=42000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=42000096;//kernel.PlainChar:96
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=42000142;//kernel.PlainChar:142
        _this.initSprite();
        
      }
      //$LASTPOS=42000168;//kernel.PlainChar:168
      _this.layer=_this.layer||Tonyu.globals.$mainLayer;
      //$LASTPOS=42000198;//kernel.PlainChar:198
      if (typeof  x=="object") {
        //$LASTPOS=42000222;//kernel.PlainChar:222
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=42000254;//kernel.PlainChar:254
        if (typeof  x=="number") {
          //$LASTPOS=42000289;//kernel.PlainChar:289
          _this.x=x;
          //$LASTPOS=42000308;//kernel.PlainChar:308
          _this.y=y;
          //$LASTPOS=42000327;//kernel.PlainChar:327
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42000364;//kernel.PlainChar:364
      _this.onDraw();
      //$LASTPOS=42000379;//kernel.PlainChar:379
      if (_this._isInvisible) {
        return _this;
      }
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42000453;//kernel.PlainChar:453
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000453;//kernel.PlainChar:453
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
      
      //$LASTPOS=42000509;//kernel.PlainChar:509
      _this.onUpdate();
      //$LASTPOS=42000526;//kernel.PlainChar:526
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000509;//kernel.PlainChar:509
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000526;//kernel.PlainChar:526
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
      
      //$LASTPOS=42000587;//kernel.PlainChar:587
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=42000639;//kernel.PlainChar:639
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=42000677;//kernel.PlainChar:677
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=42000709;//kernel.PlainChar:709
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000587;//kernel.PlainChar:587
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=42000639;//kernel.PlainChar:639
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=42000677;//kernel.PlainChar:677
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000709;//kernel.PlainChar:709
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
      
      //$LASTPOS=42000741;//kernel.PlainChar:741
      _this.main();
      //$LASTPOS=42000754;//kernel.PlainChar:754
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
            //$LASTPOS=42000741;//kernel.PlainChar:741
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=42000754;//kernel.PlainChar:754
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=43000038;//kernel.SecretChar:38
      _this.onDraw();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}},"fields":{}}
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
      
      //$LASTPOS=44000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=44000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=44000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=44000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=44000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=44000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=44000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=44000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=44000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=44000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000220;//kernel.SpriteChar:220
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=44000251;//kernel.SpriteChar:251
      _this.onDraw();
      //$LASTPOS=44000266;//kernel.SpriteChar:266
      _this.detectShape();
      //$LASTPOS=44000286;//kernel.SpriteChar:286
      _this.drawSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"f":{}}}
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
      
      //$LASTPOS=45000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=45000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=45000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=45000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=45000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=45000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=45000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=45000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=45000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=45000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=45000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=45000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=45000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=45000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=45000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=45000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=45000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=45000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=45000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=45000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=45000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=45000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=45000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=45000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=45000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=45000885;//kernel.T1Map:885
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
      
      //$LASTPOS=45000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=45000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=45000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=45000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=45001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=45001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=45001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=45001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=45001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=45000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=45000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=45000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=45000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=45001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=45001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=45001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=45001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=45001165;//kernel.T1Map:1165
            rrow.push(dat[1]);
          }
        }));
      }));
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=46000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=46000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=46000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=46000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=46000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=46000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=46000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=46000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=46000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=46000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=46000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=46000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=46000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=46000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=46000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=46000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=46000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=46000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=46000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=46000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=46000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=47000072;//kernel.TextChar:72
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=47000091;//kernel.TextChar:91
      _this.text=_this.text||"";
      //$LASTPOS=47000111;//kernel.TextChar:111
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=47000130;//kernel.TextChar:130
      _this.size=20;
      //$LASTPOS=47000144;//kernel.TextChar:144
      if (! _this.x) {
        //$LASTPOS=47000157;//kernel.TextChar:157
        _this.x=0;
      }
      //$LASTPOS=47000172;//kernel.TextChar:172
      if (! _this.y) {
        //$LASTPOS=47000185;//kernel.TextChar:185
        _this.y=0;
      }
      //$LASTPOS=47000200;//kernel.TextChar:200
      if (t) {
        //$LASTPOS=47000207;//kernel.TextChar:207
        _this.text=t;
      }
      //$LASTPOS=47000220;//kernel.TextChar:220
      if (c) {
        //$LASTPOS=47000227;//kernel.TextChar:227
        _this.fillStyle=c;
      }
      //$LASTPOS=47000245;//kernel.TextChar:245
      if (s) {
        //$LASTPOS=47000252;//kernel.TextChar:252
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000282;//kernel.TextChar:282
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=47000313;//kernel.TextChar:313
      _this.onDraw();
      //$LASTPOS=47000328;//kernel.TextChar:328
      _this.drawText(_this.x,_this.y,_this.text,_this.col,_this.size);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"col":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Button',
  shortName: 'Button',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Button_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48000535;//kernel.Button:535
      while (true) {
        //$LASTPOS=48000554;//kernel.Button:554
        if (! _this.disabled) {
          //$LASTPOS=48000580;//kernel.Button:580
          _this.clicked=_this.checkTouch();
          //$LASTPOS=48000611;//kernel.Button:611
          if (_this.clicked==1) {
            //$LASTPOS=48000642;//kernel.Button:642
            Tonyu.classes.kernel.Button.last=_this;
            //$LASTPOS=48000673;//kernel.Button:673
            if (_this.onClick) {
              //$LASTPOS=48000686;//kernel.Button:686
              _this.onClick();
            }
            
          }
          
        } else {
          //$LASTPOS=48000734;//kernel.Button:734
          _this.clicked=0;
          
        }
        //$LASTPOS=48001079;//kernel.Button:1079
        _this.update();
        
      }
    },
    fiber$main :function _trc_Button_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Button_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=48000535;//kernel.Button:535
          case 1:
            //$LASTPOS=48000554;//kernel.Button:554
            if (!(! _this.disabled)) { __pc=3     ; break; }
            //$LASTPOS=48000580;//kernel.Button:580
            _this.fiber$checkTouch(_thread);
            __pc=2;return;
          case 2:
            _this.clicked=_thread.retVal;
            
            //$LASTPOS=48000611;//kernel.Button:611
            if (_this.clicked==1) {
              //$LASTPOS=48000642;//kernel.Button:642
              Tonyu.classes.kernel.Button.last=_this;
              //$LASTPOS=48000673;//kernel.Button:673
              if (_this.onClick) {
                //$LASTPOS=48000686;//kernel.Button:686
                _this.onClick();
              }
              
            }
            __pc=4     ;break;
          case 3     :
            {
              //$LASTPOS=48000734;//kernel.Button:734
              _this.clicked=0;
            }
          case 4     :
            
            //$LASTPOS=48001079;//kernel.Button:1079
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=1;break;
          case 6     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Button_initialize(options) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48000121;//kernel.Button:121
      options.layer=options.layer||Tonyu.globals.$frontLayer;
      //$LASTPOS=48000168;//kernel.Button:168
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=48000189;//kernel.Button:189
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=48000235;//kernel.Button:235
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=48000274;//kernel.Button:274
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=48000315;//kernel.Button:315
      _this.disabledStrokeStyle=_this.disabledStrokeStyle||"#ddd";
      //$LASTPOS=48000369;//kernel.Button:369
      _this.padding=typeof  (_this.padding)=="number"?_this.padding:5;
      //$LASTPOS=48000420;//kernel.Button:420
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=48000460;//kernel.Button:460
      _this.height=_this.height||50;
      //$LASTPOS=48000488;//kernel.Button:488
      _this.left=typeof  (_this.left)=="number"?_this.left:50;
    },
    checkTouch :function _trc_Button_checkTouch() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48001114;//kernel.Button:1114
      //$LASTPOS=48001119;//kernel.Button:1119
      _this.i=0;for (; _this.i<2 ; _this.i++) {
        {
          //$LASTPOS=48001146;//kernel.Button:1146
          if (Tonyu.globals.$touches[_this.i].touched>0&&_this.inRect(Tonyu.globals.$touches[_this.i])) {
            return Tonyu.globals.$touches[_this.i].touched;
            
          }
        }
      }
      return 0;
    },
    fiber$checkTouch :function _trc_Button_f_checkTouch(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=48001114;//kernel.Button:1114
      //$LASTPOS=48001119;//kernel.Button:1119
      _this.i=0;for (; _this.i<2 ; _this.i++) {
        {
          //$LASTPOS=48001146;//kernel.Button:1146
          if (Tonyu.globals.$touches[_this.i].touched>0&&_this.inRect(Tonyu.globals.$touches[_this.i])) {
            _thread.retVal=Tonyu.globals.$touches[_this.i].touched;return;
            
            
          }
        }
      }
      _thread.retVal=0;return;
      
      
      _thread.retVal=_this;return;
    },
    inRect :function _trc_Button_inRect(p) {
      "use strict";
      var _this=this;
      
      return p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;
    },
    fiber$inRect :function _trc_Button_f_inRect(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Button_draw(c) {
      "use strict";
      var _this=this;
      var size;
      var f;
      var r;
      
      //$LASTPOS=48001382;//kernel.Button:1382
      c.fillStyle=_this.fillStyle||"gray";
      //$LASTPOS=48001420;//kernel.Button:1420
      c.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=48001463;//kernel.Button:1463
      if (_this.disabled) {
        //$LASTPOS=48001477;//kernel.Button:1477
        c.strokeStyle=_this.disabledStrokeStyle;
      }
      //$LASTPOS=48001517;//kernel.Button:1517
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=48001560;//kernel.Button:1560
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=48001605;//kernel.Button:1605
      size = _this.height-_this.padding*2;
      
      //$LASTPOS=48001637;//kernel.Button:1637
      f = c.font.replace(/^[0-9]+px /,"");
      
      //$LASTPOS=48001681;//kernel.Button:1681
      c.font=size+"px "+f;
      //$LASTPOS=48001720;//kernel.Button:1720
      c.textBaseline="top";
      //$LASTPOS=48001747;//kernel.Button:1747
      c.fillStyle=_this.clicked?_this.clickedStyle:_this.disabled?_this.disabledStrokeStyle:_this.strokeStyle;
      //$LASTPOS=48001833;//kernel.Button:1833
      r = c.measureText(_this.text);
      
      //$LASTPOS=48001865;//kernel.Button:1865
      c.fillText(_this.text,_this.left+_this.width/2-r.width/2,_this.top+_this.padding);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"checkTouch":{"nowait":false},"inRect":{"nowait":false},"draw":{"nowait":true}},"fields":{"disabled":{},"clicked":{},"onClick":{},"strokeStyle":{},"clickedStyle":{},"disabledStrokeStyle":{},"padding":{},"left":{},"i":{},"top":{}}}
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
      
      //$LASTPOS=49000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=49000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=49000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=49000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=49000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=49000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=49000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=49000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=49000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=49000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=49000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=49000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=49000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=49000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=49000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=49000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=49000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=49000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=49000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=49000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=49000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=49000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=49000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=49000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=49000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=49000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=49001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=49001049;//kernel.GameConsole:1049
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
      
      //$LASTPOS=49000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=49000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=49000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=49000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=49000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=49000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=49000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=49000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=49000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=49000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=49000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=49000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=49000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=49000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=49001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=49001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=49001159;//kernel.GameConsole:1159
      _this.sprites.draw(_this.canvas[0]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"shouldDraw1x1":{"nowait":false},"layout":{"nowait":false},"draw":{"nowait":true}},"fields":{"cw":{},"canvas":{},"ch":{},"gameScreen":{},"sprites":{},"cctx":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Label',
  shortName: 'Label',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Label_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Label_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Label_initialize(x,y,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000049;//kernel.Label:49
      if (typeof  x=="object") {
        //$LASTPOS=50000084;//kernel.Label:84
        x.layer=x.layer||Tonyu.globals.$frontLayer;
        
      }
      //$LASTPOS=50000126;//kernel.Label:126
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=50000146;//kernel.Label:146
      if (x==null) {
        //$LASTPOS=50000159;//kernel.Label:159
        x=50;
      }
      //$LASTPOS=50000170;//kernel.Label:170
      if (y==null) {
        //$LASTPOS=50000183;//kernel.Label:183
        y=50;
      }
      //$LASTPOS=50000194;//kernel.Label:194
      if (! _this.template&&! _this._text) {
        //$LASTPOS=50000230;//kernel.Label:230
        _this.text="text";
        
      }
    },
    __getter__text :function _trc_Label___getter__text() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000268;//kernel.Label:268
      if (! _this.template) {
        return _this._text;
      }
      return _this.template.replace(/[\$\@][A-Za-z0-9\.]* ?/g,(function anonymous_353(v) {
        
        //$LASTPOS=50000369;//kernel.Label:369
        v=v.replace(/ $/,"");
        //$LASTPOS=50000400;//kernel.Label:400
        if (v=="") {
          return "$";
        }
        //$LASTPOS=50000432;//kernel.Label:432
        if (v.match(/^@/)) {
          return _this.exapndVal(_this.target,v.substring(1).split("."));
          
        } else {
          return _this.expandVal(Tonyu.globals,v.split("."));
          
        }
      }));
    },
    expandVal :function _trc_Label_expandVal(obj,flds) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000654;//kernel.Label:654
      while (flds.length>0) {
        //$LASTPOS=50000687;//kernel.Label:687
        if (! obj) {
          return "";
        }
        //$LASTPOS=50000717;//kernel.Label:717
        obj=obj[flds.shift()];
        
      }
      return obj;
    },
    fiber$expandVal :function _trc_Label_f_expandVal(_thread,obj,flds) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Label_ent_expandVal(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=50000654;//kernel.Label:654
          case 1:
            if (!(flds.length>0)) { __pc=3     ; break; }
            //$LASTPOS=50000687;//kernel.Label:687
            if (!(! obj)) { __pc=2     ; break; }
            _thread.exit("");return;
          case 2     :
            
            //$LASTPOS=50000717;//kernel.Label:717
            obj=obj[flds.shift()];
            __pc=1;break;
          case 3     :
            
            _thread.exit(obj);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __setter__text :function _trc_Label___setter__text(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000783;//kernel.Label:783
      delete _this.template;
      //$LASTPOS=50000805;//kernel.Label:805
      _this._text=v;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"__getter__text":{"nowait":true},"expandVal":{"nowait":false},"__setter__text":{"nowait":true}},"fields":{"template":{},"_text":{},"exapndVal":{}}}
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
      
      //$LASTPOS=51000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=51000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=51000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=51000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      //$LASTPOS=51000158;//kernel.MapEditor:158
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=51000186;//kernel.MapEditor:186
      if (_this.fileList.exists()) {
        //$LASTPOS=51000214;//kernel.MapEditor:214
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=51000257;//kernel.MapEditor:257
          f=f+"";
          //$LASTPOS=51000274;//kernel.MapEditor:274
          _this.fNames=f.split("/");
          //$LASTPOS=51000304;//kernel.MapEditor:304
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=51000345;//kernel.MapEditor:345
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=51000388;//kernel.MapEditor:388
      if (_this.fileExist) {
        //$LASTPOS=51000408;//kernel.MapEditor:408
        _this.print("Load Data?: Y or N");
        //$LASTPOS=51000442;//kernel.MapEditor:442
        while (true) {
          //$LASTPOS=51000464;//kernel.MapEditor:464
          if (_this.getkey("y")>0) {
            //$LASTPOS=51000496;//kernel.MapEditor:496
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=51000551;//kernel.MapEditor:551
          if (_this.getkey("n")>0) {
            //$LASTPOS=51000583;//kernel.MapEditor:583
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=51000639;//kernel.MapEditor:639
          _this.update();
          
        }
        //$LASTPOS=51000661;//kernel.MapEditor:661
        if (_this.loadMode) {
          //$LASTPOS=51000684;//kernel.MapEditor:684
          _this.fileName=_this.prompt("Input json file (*.json)","map.json");
          //$LASTPOS=51000749;//kernel.MapEditor:749
          if (_this.fileName) {
            //$LASTPOS=51000776;//kernel.MapEditor:776
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=51000840;//kernel.MapEditor:840
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=51000876;//kernel.MapEditor:876
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=51000917;//kernel.MapEditor:917
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=51000967;//kernel.MapEditor:967
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=51001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=51001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=51001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=51001149;//kernel.MapEditor:1149
          if (_this.baseData==undefined) {
            //$LASTPOS=51001187;//kernel.MapEditor:1187
            _this.print("Load failed");
            //$LASTPOS=51001222;//kernel.MapEditor:1222
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=51001253;//kernel.MapEditor:1253
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=51001298;//kernel.MapEditor:1298
              _this.mapData=_this.baseData[0];
              //$LASTPOS=51001332;//kernel.MapEditor:1332
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=51001368;//kernel.MapEditor:1368
              if (_this.baseData.length>2) {
                //$LASTPOS=51001408;//kernel.MapEditor:1408
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=51001464;//kernel.MapEditor:1464
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=51001541;//kernel.MapEditor:1541
      _this.update();
      //$LASTPOS=51001855;//kernel.MapEditor:1855
      if (! _this.loadMode) {
        //$LASTPOS=51001875;//kernel.MapEditor:1875
        _this.row=_this.prompt("input row");
        //$LASTPOS=51001905;//kernel.MapEditor:1905
        _this.col=_this.prompt("input col");
        //$LASTPOS=51001935;//kernel.MapEditor:1935
        _this.chipWidth=_this.prompt("input chipWidth");
        //$LASTPOS=51001977;//kernel.MapEditor:1977
        _this.chipHeight=_this.prompt("input chipHeight");
        //$LASTPOS=51002021;//kernel.MapEditor:2021
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=51002086;//kernel.MapEditor:2086
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=51002117;//kernel.MapEditor:2117
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=51002149;//kernel.MapEditor:2149
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=51002182;//kernel.MapEditor:2182
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=51002233;//kernel.MapEditor:2233
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=51002544;//kernel.MapEditor:2544
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=51002591;//kernel.MapEditor:2591
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=51002617;//kernel.MapEditor:2617
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=51002713;//kernel.MapEditor:2713
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=51002744;//kernel.MapEditor:2744
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=51002776;//kernel.MapEditor:2776
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=51002809;//kernel.MapEditor:2809
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=51002876;//kernel.MapEditor:2876
      _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=51002919;//kernel.MapEditor:2919
      _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=51002963;//kernel.MapEditor:2963
      _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=51003002;//kernel.MapEditor:3002
      _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=51003042;//kernel.MapEditor:3042
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=51003124;//kernel.MapEditor:3124
      _this.counter=0;
      //$LASTPOS=51003136;//kernel.MapEditor:3136
      //$LASTPOS=51003140;//kernel.MapEditor:3140
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=51003169;//kernel.MapEditor:3169
          //$LASTPOS=51003173;//kernel.MapEditor:3173
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=51003206;//kernel.MapEditor:3206
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=51003250;//kernel.MapEditor:3250
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=51003274;//kernel.MapEditor:3274
      Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=51003354;//kernel.MapEditor:3354
      _this.mode="get";
      //$LASTPOS=51003367;//kernel.MapEditor:3367
      _this.prevMode="set";
      //$LASTPOS=51003384;//kernel.MapEditor:3384
      _this.mapp=0;
      //$LASTPOS=51003393;//kernel.MapEditor:3393
      _this.maponp=- 1;
      //$LASTPOS=51003405;//kernel.MapEditor:3405
      _this.mx=- 40;
      //$LASTPOS=51003414;//kernel.MapEditor:3414
      _this.my=- 40;
      //$LASTPOS=51003423;//kernel.MapEditor:3423
      _this.chipX=- 40;
      //$LASTPOS=51003435;//kernel.MapEditor:3435
      _this.chipY=- 40;
      //$LASTPOS=51003447;//kernel.MapEditor:3447
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=51003476;//kernel.MapEditor:3476
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=51003507;//kernel.MapEditor:3507
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=51003532;//kernel.MapEditor:3532
      _this.initialWidth=Tonyu.globals.$map.chipWidth;
      //$LASTPOS=51003562;//kernel.MapEditor:3562
      _this.initialHeight=Tonyu.globals.$map.chipHeight;
      //$LASTPOS=51003594;//kernel.MapEditor:3594
      _this.layers=["base","on","all"];
      //$LASTPOS=51003623;//kernel.MapEditor:3623
      _this.lc=0;
      //$LASTPOS=51003630;//kernel.MapEditor:3630
      _this.selectedLayer=_this.layers[_this.lc];
      //$LASTPOS=51003657;//kernel.MapEditor:3657
      _this.drawPanel();
      //$LASTPOS=51003671;//kernel.MapEditor:3671
      _this.drawLetter(_this.mode);
      //$LASTPOS=51003692;//kernel.MapEditor:3692
      while (true) {
        //$LASTPOS=51003710;//kernel.MapEditor:3710
        _this.p=_this.mapp;
        //$LASTPOS=51003723;//kernel.MapEditor:3723
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=51003842;//kernel.MapEditor:3842
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=51003876;//kernel.MapEditor:3876
          _this.mode="erase";
          //$LASTPOS=51003931;//kernel.MapEditor:3931
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=51003961;//kernel.MapEditor:3961
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=51004080;//kernel.MapEditor:4080
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=51004114;//kernel.MapEditor:4114
          _this.mode="set";
          //$LASTPOS=51004135;//kernel.MapEditor:4135
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=51004165;//kernel.MapEditor:4165
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=51004286;//kernel.MapEditor:4286
          _this.lc++;
          //$LASTPOS=51004301;//kernel.MapEditor:4301
          _this.selectedLayer=_this.layers[_this.lc%3];
          //$LASTPOS=51004338;//kernel.MapEditor:4338
          _this.drawPanel();
          //$LASTPOS=51004392;//kernel.MapEditor:4392
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=51004515;//kernel.MapEditor:4515
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=51004636;//kernel.MapEditor:4636
          if (_this.mode!="get") {
            //$LASTPOS=51004666;//kernel.MapEditor:4666
            _this.prevMode=_this.mode;
            //$LASTPOS=51004694;//kernel.MapEditor:4694
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=51004730;//kernel.MapEditor:4730
            _this.mode="get";
            //$LASTPOS=51004755;//kernel.MapEditor:4755
            _this.chipX=- 40;
            //$LASTPOS=51004779;//kernel.MapEditor:4779
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=51004819;//kernel.MapEditor:4819
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=51004857;//kernel.MapEditor:4857
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=51004924;//kernel.MapEditor:4924
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=51004954;//kernel.MapEditor:4954
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=51005090;//kernel.MapEditor:5090
          if (_this.loadedFile) {
            //$LASTPOS=51005119;//kernel.MapEditor:5119
            _this.saveFileName=_this.prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=51005207;//kernel.MapEditor:5207
            _this.saveFileName=_this.prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=51005301;//kernel.MapEditor:5301
          if (_this.saveFileName) {
            //$LASTPOS=51005332;//kernel.MapEditor:5332
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=51005394;//kernel.MapEditor:5394
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=51005556;//kernel.MapEditor:5556
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=51005593;//kernel.MapEditor:5593
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=51005646;//kernel.MapEditor:5646
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=51005767;//kernel.MapEditor:5767
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=51005801;//kernel.MapEditor:5801
          _this.mode="copy";
          //$LASTPOS=51005855;//kernel.MapEditor:5855
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=51005885;//kernel.MapEditor:5885
        if (_this.mode!="get") {
          //$LASTPOS=51005911;//kernel.MapEditor:5911
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=51006017;//kernel.MapEditor:6017
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=51006035;//kernel.MapEditor:6035
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=51006166;//kernel.MapEditor:6166
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=51006184;//kernel.MapEditor:6184
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=51006297;//kernel.MapEditor:6297
            _this.my=_this.my-8;
          }
          //$LASTPOS=51006315;//kernel.MapEditor:6315
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=51006450;//kernel.MapEditor:6450
            _this.my=_this.my+8;
          }
          //$LASTPOS=51006468;//kernel.MapEditor:6468
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=51006511;//kernel.MapEditor:6511
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=51006617;//kernel.MapEditor:6617
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=51006641;//kernel.MapEditor:6641
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=51006772;//kernel.MapEditor:6772
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=51006796;//kernel.MapEditor:6796
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=51006909;//kernel.MapEditor:6909
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=51006933;//kernel.MapEditor:6933
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=51007068;//kernel.MapEditor:7068
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=51007092;//kernel.MapEditor:7092
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=51007165;//kernel.MapEditor:7165
        if (_this.getkey("i")==1) {
          //$LASTPOS=51007194;//kernel.MapEditor:7194
          if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
            //$LASTPOS=51007226;//kernel.MapEditor:7226
            Tonyu.globals.$map.chipWidth+=4;
          }
          //$LASTPOS=51007254;//kernel.MapEditor:7254
          if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
            //$LASTPOS=51007288;//kernel.MapEditor:7288
            Tonyu.globals.$map.chipHeight+=4;
          }
          //$LASTPOS=51007317;//kernel.MapEditor:7317
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=51007344;//kernel.MapEditor:7344
          _this.panel.die();
          //$LASTPOS=51007366;//kernel.MapEditor:7366
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=51007466;//kernel.MapEditor:7466
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=51007501;//kernel.MapEditor:7501
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=51007537;//kernel.MapEditor:7537
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=51007574;//kernel.MapEditor:7574
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=51007632;//kernel.MapEditor:7632
        if (_this.getkey("o")==1) {
          //$LASTPOS=51007661;//kernel.MapEditor:7661
          if (Tonyu.globals.$map.chipWidth>4) {
            //$LASTPOS=51007682;//kernel.MapEditor:7682
            Tonyu.globals.$map.chipWidth-=4;
          }
          //$LASTPOS=51007710;//kernel.MapEditor:7710
          if (Tonyu.globals.$map.chipHeight>4) {
            //$LASTPOS=51007732;//kernel.MapEditor:7732
            Tonyu.globals.$map.chipHeight-=4;
          }
          //$LASTPOS=51007761;//kernel.MapEditor:7761
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=51007788;//kernel.MapEditor:7788
          _this.panel.die();
          //$LASTPOS=51007810;//kernel.MapEditor:7810
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=51007910;//kernel.MapEditor:7910
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=51007945;//kernel.MapEditor:7945
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=51007981;//kernel.MapEditor:7981
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=51008018;//kernel.MapEditor:8018
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=51008110;//kernel.MapEditor:8110
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=51008141;//kernel.MapEditor:8141
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=51008173;//kernel.MapEditor:8173
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=51008226;//kernel.MapEditor:8226
          if (_this.selectedLayer=="base") {
            //$LASTPOS=51008266;//kernel.MapEditor:8266
            _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=51008322;//kernel.MapEditor:8322
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=51008375;//kernel.MapEditor:8375
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
            
          } else {
            //$LASTPOS=51008433;//kernel.MapEditor:8433
            if (_this.selectedLayer=="on") {
              //$LASTPOS=51008471;//kernel.MapEditor:8471
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=51008542;//kernel.MapEditor:8542
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=51008595;//kernel.MapEditor:8595
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
              
            }
          }
          
        } else {
          //$LASTPOS=51008661;//kernel.MapEditor:8661
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=51008716;//kernel.MapEditor:8716
            if (_this.selectedLayer=="base") {
              //$LASTPOS=51008756;//kernel.MapEditor:8756
              _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=51008812;//kernel.MapEditor:8812
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
              //$LASTPOS=51008863;//kernel.MapEditor:8863
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
              
            } else {
              //$LASTPOS=51008921;//kernel.MapEditor:8921
              if (_this.selectedLayer=="on") {
                //$LASTPOS=51008959;//kernel.MapEditor:8959
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              } else {
                //$LASTPOS=51009028;//kernel.MapEditor:9028
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=51009079;//kernel.MapEditor:9079
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              }
            }
            
          } else {
            //$LASTPOS=51009141;//kernel.MapEditor:9141
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=51009194;//kernel.MapEditor:9194
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=51009274;//kernel.MapEditor:9274
              _this.mode="set";
              //$LASTPOS=51009295;//kernel.MapEditor:9295
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=51009361;//kernel.MapEditor:9361
              _this.drawLetter(_this.mode);
              //$LASTPOS=51009388;//kernel.MapEditor:9388
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=51009413;//kernel.MapEditor:9413
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=51009468;//kernel.MapEditor:9468
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=51009521;//kernel.MapEditor:9521
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=51009575;//kernel.MapEditor:9575
                  if (_this.selectedLayer=="base") {
                    //$LASTPOS=51009615;//kernel.MapEditor:9615
                    _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                    //$LASTPOS=51009668;//kernel.MapEditor:9668
                    _this.maponp=- 1;
                    
                  } else {
                    //$LASTPOS=51009694;//kernel.MapEditor:9694
                    if (_this.selectedLayer=="on") {
                      //$LASTPOS=51009732;//kernel.MapEditor:9732
                      _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    } else {
                      //$LASTPOS=51009803;//kernel.MapEditor:9803
                      _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      //$LASTPOS=51009856;//kernel.MapEditor:9856
                      _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    }
                  }
                  //$LASTPOS=51009981;//kernel.MapEditor:9981
                  _this.mode="set";
                  //$LASTPOS=51010034;//kernel.MapEditor:10034
                  _this.drawLetter(_this.mode);
                  //$LASTPOS=51010061;//kernel.MapEditor:10061
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=51010087;//kernel.MapEditor:10087
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=51000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=51000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=51000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51000158;//kernel.MapEditor:158
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=51000186;//kernel.MapEditor:186
            if (_this.fileList.exists()) {
              //$LASTPOS=51000214;//kernel.MapEditor:214
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=51000257;//kernel.MapEditor:257
                f=f+"";
                //$LASTPOS=51000274;//kernel.MapEditor:274
                _this.fNames=f.split("/");
                //$LASTPOS=51000304;//kernel.MapEditor:304
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=51000345;//kernel.MapEditor:345
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=51000388;//kernel.MapEditor:388
            if (!(_this.fileExist)) { __pc=12    ; break; }
            //$LASTPOS=51000408;//kernel.MapEditor:408
            _this.print("Load Data?: Y or N");
            //$LASTPOS=51000442;//kernel.MapEditor:442
          case 2:
            //$LASTPOS=51000464;//kernel.MapEditor:464
            if (!(_this.getkey("y")>0)) { __pc=3     ; break; }
            //$LASTPOS=51000496;//kernel.MapEditor:496
            _this.loadMode=true;
            __pc=6     ; break;
            
          case 3     :
            
            //$LASTPOS=51000551;//kernel.MapEditor:551
            if (!(_this.getkey("n")>0)) { __pc=4     ; break; }
            //$LASTPOS=51000583;//kernel.MapEditor:583
            _this.loadMode=false;
            __pc=6     ; break;
            
          case 4     :
            
            //$LASTPOS=51000639;//kernel.MapEditor:639
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6     :
            
            //$LASTPOS=51000661;//kernel.MapEditor:661
            if (!(_this.loadMode)) { __pc=11    ; break; }
            //$LASTPOS=51000684;//kernel.MapEditor:684
            _this.fiber$prompt(_thread, "Input json file (*.json)", "map.json");
            __pc=7;return;
          case 7:
            _this.fileName=_thread.retVal;
            
            //$LASTPOS=51000749;//kernel.MapEditor:749
            if (_this.fileName) {
              //$LASTPOS=51000776;//kernel.MapEditor:776
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=51000840;//kernel.MapEditor:840
            if (!(_this.mapDataFile.obj())) { __pc=8     ; break; }
            {
              //$LASTPOS=51000876;//kernel.MapEditor:876
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=51000917;//kernel.MapEditor:917
              _this.loadedFile=_this.fileName;
            }
            __pc=10    ;break;
          case 8     :
            //$LASTPOS=51000967;//kernel.MapEditor:967
            _this.fiber$file(_thread, _this.fileName);
            __pc=9;return;
          case 9:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=51001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=51001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=51001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
          case 10    :
            
            //$LASTPOS=51001149;//kernel.MapEditor:1149
            if (_this.baseData==undefined) {
              //$LASTPOS=51001187;//kernel.MapEditor:1187
              _this.print("Load failed");
              //$LASTPOS=51001222;//kernel.MapEditor:1222
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=51001253;//kernel.MapEditor:1253
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=51001298;//kernel.MapEditor:1298
                _this.mapData=_this.baseData[0];
                //$LASTPOS=51001332;//kernel.MapEditor:1332
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=51001368;//kernel.MapEditor:1368
                if (_this.baseData.length>2) {
                  //$LASTPOS=51001408;//kernel.MapEditor:1408
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=51001464;//kernel.MapEditor:1464
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 11    :
            
          case 12    :
            
            //$LASTPOS=51001541;//kernel.MapEditor:1541
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=51001855;//kernel.MapEditor:1855
            if (!(! _this.loadMode)) { __pc=18    ; break; }
            //$LASTPOS=51001875;//kernel.MapEditor:1875
            _this.fiber$prompt(_thread, "input row");
            __pc=14;return;
          case 14:
            _this.row=_thread.retVal;
            
            //$LASTPOS=51001905;//kernel.MapEditor:1905
            _this.fiber$prompt(_thread, "input col");
            __pc=15;return;
          case 15:
            _this.col=_thread.retVal;
            
            //$LASTPOS=51001935;//kernel.MapEditor:1935
            _this.fiber$prompt(_thread, "input chipWidth");
            __pc=16;return;
          case 16:
            _this.chipWidth=_thread.retVal;
            
            //$LASTPOS=51001977;//kernel.MapEditor:1977
            _this.fiber$prompt(_thread, "input chipHeight");
            __pc=17;return;
          case 17:
            _this.chipHeight=_thread.retVal;
            
            //$LASTPOS=51002021;//kernel.MapEditor:2021
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=51002086;//kernel.MapEditor:2086
            _this.panel.x=_this.panel.width/2+40;
            //$LASTPOS=51002117;//kernel.MapEditor:2117
            _this.panel.y=_this.panel.height/2+40;
            //$LASTPOS=51002149;//kernel.MapEditor:2149
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=51002182;//kernel.MapEditor:2182
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=51002233;//kernel.MapEditor:2233
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
            __pc=19    ;break;
          case 18    :
            {
              //$LASTPOS=51002544;//kernel.MapEditor:2544
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=51002591;//kernel.MapEditor:2591
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=51002617;//kernel.MapEditor:2617
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=51002713;//kernel.MapEditor:2713
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=51002744;//kernel.MapEditor:2744
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=51002776;//kernel.MapEditor:2776
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=51002809;//kernel.MapEditor:2809
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 19    :
            
            //$LASTPOS=51002876;//kernel.MapEditor:2876
            _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=51002919;//kernel.MapEditor:2919
            _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=51002963;//kernel.MapEditor:2963
            _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=51003002;//kernel.MapEditor:3002
            _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=51003042;//kernel.MapEditor:3042
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=51003124;//kernel.MapEditor:3124
            _this.counter=0;
            //$LASTPOS=51003136;//kernel.MapEditor:3136
            //$LASTPOS=51003140;//kernel.MapEditor:3140
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=51003169;//kernel.MapEditor:3169
                //$LASTPOS=51003173;//kernel.MapEditor:3173
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=51003206;//kernel.MapEditor:3206
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=51003250;//kernel.MapEditor:3250
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=51003274;//kernel.MapEditor:3274
            Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=51003354;//kernel.MapEditor:3354
            _this.mode="get";
            //$LASTPOS=51003367;//kernel.MapEditor:3367
            _this.prevMode="set";
            //$LASTPOS=51003384;//kernel.MapEditor:3384
            _this.mapp=0;
            //$LASTPOS=51003393;//kernel.MapEditor:3393
            _this.maponp=- 1;
            //$LASTPOS=51003405;//kernel.MapEditor:3405
            _this.mx=- 40;
            //$LASTPOS=51003414;//kernel.MapEditor:3414
            _this.my=- 40;
            //$LASTPOS=51003423;//kernel.MapEditor:3423
            _this.chipX=- 40;
            //$LASTPOS=51003435;//kernel.MapEditor:3435
            _this.chipY=- 40;
            //$LASTPOS=51003447;//kernel.MapEditor:3447
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=51003476;//kernel.MapEditor:3476
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=51003507;//kernel.MapEditor:3507
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=51003532;//kernel.MapEditor:3532
            _this.initialWidth=Tonyu.globals.$map.chipWidth;
            //$LASTPOS=51003562;//kernel.MapEditor:3562
            _this.initialHeight=Tonyu.globals.$map.chipHeight;
            //$LASTPOS=51003594;//kernel.MapEditor:3594
            _this.layers=["base","on","all"];
            //$LASTPOS=51003623;//kernel.MapEditor:3623
            _this.lc=0;
            //$LASTPOS=51003630;//kernel.MapEditor:3630
            _this.selectedLayer=_this.layers[_this.lc];
            //$LASTPOS=51003657;//kernel.MapEditor:3657
            _this.fiber$drawPanel(_thread);
            __pc=20;return;
          case 20:
            
            //$LASTPOS=51003671;//kernel.MapEditor:3671
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=21;return;
          case 21:
            
            //$LASTPOS=51003692;//kernel.MapEditor:3692
          case 22:
            //$LASTPOS=51003710;//kernel.MapEditor:3710
            _this.p=_this.mapp;
            //$LASTPOS=51003723;//kernel.MapEditor:3723
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=24    ; break; }
            //$LASTPOS=51003842;//kernel.MapEditor:3842
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=51003876;//kernel.MapEditor:3876
            _this.mode="erase";
            //$LASTPOS=51003931;//kernel.MapEditor:3931
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=23;return;
          case 23:
            
          case 24    :
            
            //$LASTPOS=51003961;//kernel.MapEditor:3961
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=26    ; break; }
            //$LASTPOS=51004080;//kernel.MapEditor:4080
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=51004114;//kernel.MapEditor:4114
            _this.mode="set";
            //$LASTPOS=51004135;//kernel.MapEditor:4135
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=25;return;
          case 25:
            
          case 26    :
            
            //$LASTPOS=51004165;//kernel.MapEditor:4165
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=29    ; break; }
            //$LASTPOS=51004286;//kernel.MapEditor:4286
            _this.lc++;
            //$LASTPOS=51004301;//kernel.MapEditor:4301
            _this.selectedLayer=_this.layers[_this.lc%3];
            //$LASTPOS=51004338;//kernel.MapEditor:4338
            _this.fiber$drawPanel(_thread);
            __pc=27;return;
          case 27:
            
            //$LASTPOS=51004392;//kernel.MapEditor:4392
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=28;return;
          case 28:
            
          case 29    :
            
            //$LASTPOS=51004515;//kernel.MapEditor:4515
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=31    ; break; }
            //$LASTPOS=51004636;//kernel.MapEditor:4636
            if (_this.mode!="get") {
              //$LASTPOS=51004666;//kernel.MapEditor:4666
              _this.prevMode=_this.mode;
              //$LASTPOS=51004694;//kernel.MapEditor:4694
              Tonyu.globals.$mp.scrollTo(- 40,- 40);
              //$LASTPOS=51004730;//kernel.MapEditor:4730
              _this.mode="get";
              //$LASTPOS=51004755;//kernel.MapEditor:4755
              _this.chipX=- 40;
              //$LASTPOS=51004779;//kernel.MapEditor:4779
              _this.chipY=- 40;
              
            } else {
              //$LASTPOS=51004819;//kernel.MapEditor:4819
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=51004857;//kernel.MapEditor:4857
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=51004924;//kernel.MapEditor:4924
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=30;return;
          case 30:
            
          case 31    :
            
            //$LASTPOS=51004954;//kernel.MapEditor:4954
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=36    ; break; }
            //$LASTPOS=51005090;//kernel.MapEditor:5090
            if (!(_this.loadedFile)) { __pc=33    ; break; }
            //$LASTPOS=51005119;//kernel.MapEditor:5119
            _this.fiber$prompt(_thread, "input json file(*.json)", _this.loadedFile);
            __pc=32;return;
          case 32:
            _this.saveFileName=_thread.retVal;
            
            __pc=35    ;break;
          case 33    :
            //$LASTPOS=51005207;//kernel.MapEditor:5207
            _this.fiber$prompt(_thread, "input json file(*.json)", "map.json");
            __pc=34;return;
          case 34:
            _this.saveFileName=_thread.retVal;
            
          case 35    :
            
            //$LASTPOS=51005301;//kernel.MapEditor:5301
            if (_this.saveFileName) {
              //$LASTPOS=51005332;//kernel.MapEditor:5332
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=51005394;//kernel.MapEditor:5394
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
              //$LASTPOS=51005556;//kernel.MapEditor:5556
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=51005593;//kernel.MapEditor:5593
              _this.print(_this.saveFileName+" Saved");
              
            }
          case 36    :
            
            //$LASTPOS=51005646;//kernel.MapEditor:5646
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=38    ; break; }
            //$LASTPOS=51005767;//kernel.MapEditor:5767
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=51005801;//kernel.MapEditor:5801
            _this.mode="copy";
            //$LASTPOS=51005855;//kernel.MapEditor:5855
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=37;return;
          case 37:
            
          case 38    :
            
            //$LASTPOS=51005885;//kernel.MapEditor:5885
            if (_this.mode!="get") {
              //$LASTPOS=51005911;//kernel.MapEditor:5911
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=51006017;//kernel.MapEditor:6017
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=51006035;//kernel.MapEditor:6035
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=51006166;//kernel.MapEditor:6166
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=51006184;//kernel.MapEditor:6184
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=51006297;//kernel.MapEditor:6297
                _this.my=_this.my-8;
              }
              //$LASTPOS=51006315;//kernel.MapEditor:6315
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=51006450;//kernel.MapEditor:6450
                _this.my=_this.my+8;
              }
              //$LASTPOS=51006468;//kernel.MapEditor:6468
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=51006511;//kernel.MapEditor:6511
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=51006617;//kernel.MapEditor:6617
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=51006641;//kernel.MapEditor:6641
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=51006772;//kernel.MapEditor:6772
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=51006796;//kernel.MapEditor:6796
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=51006909;//kernel.MapEditor:6909
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=51006933;//kernel.MapEditor:6933
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=51007068;//kernel.MapEditor:7068
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=51007092;//kernel.MapEditor:7092
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=51007165;//kernel.MapEditor:7165
            if (_this.getkey("i")==1) {
              //$LASTPOS=51007194;//kernel.MapEditor:7194
              if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
                //$LASTPOS=51007226;//kernel.MapEditor:7226
                Tonyu.globals.$map.chipWidth+=4;
              }
              //$LASTPOS=51007254;//kernel.MapEditor:7254
              if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
                //$LASTPOS=51007288;//kernel.MapEditor:7288
                Tonyu.globals.$map.chipHeight+=4;
              }
              //$LASTPOS=51007317;//kernel.MapEditor:7317
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=51007344;//kernel.MapEditor:7344
              _this.panel.die();
              //$LASTPOS=51007366;//kernel.MapEditor:7366
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=51007466;//kernel.MapEditor:7466
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=51007501;//kernel.MapEditor:7501
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=51007537;//kernel.MapEditor:7537
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=51007574;//kernel.MapEditor:7574
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=51007632;//kernel.MapEditor:7632
            if (_this.getkey("o")==1) {
              //$LASTPOS=51007661;//kernel.MapEditor:7661
              if (Tonyu.globals.$map.chipWidth>4) {
                //$LASTPOS=51007682;//kernel.MapEditor:7682
                Tonyu.globals.$map.chipWidth-=4;
              }
              //$LASTPOS=51007710;//kernel.MapEditor:7710
              if (Tonyu.globals.$map.chipHeight>4) {
                //$LASTPOS=51007732;//kernel.MapEditor:7732
                Tonyu.globals.$map.chipHeight-=4;
              }
              //$LASTPOS=51007761;//kernel.MapEditor:7761
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=51007788;//kernel.MapEditor:7788
              _this.panel.die();
              //$LASTPOS=51007810;//kernel.MapEditor:7810
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=51007910;//kernel.MapEditor:7910
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=51007945;//kernel.MapEditor:7945
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=51007981;//kernel.MapEditor:7981
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=51008018;//kernel.MapEditor:8018
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=51008110;//kernel.MapEditor:8110
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=51008141;//kernel.MapEditor:8141
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=51008173;//kernel.MapEditor:8173
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=39    ; break; }
            {
              //$LASTPOS=51008226;//kernel.MapEditor:8226
              if (_this.selectedLayer=="base") {
                //$LASTPOS=51008266;//kernel.MapEditor:8266
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=51008322;//kernel.MapEditor:8322
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=51008375;//kernel.MapEditor:8375
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=51008433;//kernel.MapEditor:8433
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=51008471;//kernel.MapEditor:8471
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  
                } else {
                  //$LASTPOS=51008542;//kernel.MapEditor:8542
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  //$LASTPOS=51008595;//kernel.MapEditor:8595
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
                  
                }
              }
            }
            __pc=51    ;break;
          case 39    :
            //$LASTPOS=51008661;//kernel.MapEditor:8661
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=40    ; break; }
            {
              //$LASTPOS=51008716;//kernel.MapEditor:8716
              if (_this.selectedLayer=="base") {
                //$LASTPOS=51008756;//kernel.MapEditor:8756
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=51008812;//kernel.MapEditor:8812
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=51008863;//kernel.MapEditor:8863
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=51008921;//kernel.MapEditor:8921
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=51008959;//kernel.MapEditor:8959
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                } else {
                  //$LASTPOS=51009028;//kernel.MapEditor:9028
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  //$LASTPOS=51009079;//kernel.MapEditor:9079
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                }
              }
            }
            __pc=50    ;break;
          case 40    :
            //$LASTPOS=51009141;//kernel.MapEditor:9141
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=43    ; break; }
            //$LASTPOS=51009194;//kernel.MapEditor:9194
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=51009274;//kernel.MapEditor:9274
            _this.mode="set";
            //$LASTPOS=51009295;//kernel.MapEditor:9295
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=51009361;//kernel.MapEditor:9361
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=41;return;
          case 41:
            
            //$LASTPOS=51009388;//kernel.MapEditor:9388
            _this.fiber$updateEx(_thread, 10);
            __pc=42;return;
          case 42:
            
            __pc=49    ;break;
          case 43    :
            //$LASTPOS=51009413;//kernel.MapEditor:9413
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=44    ; break; }
            {
              //$LASTPOS=51009468;//kernel.MapEditor:9468
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=48    ;break;
          case 44    :
            //$LASTPOS=51009521;//kernel.MapEditor:9521
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=47    ; break; }
            //$LASTPOS=51009575;//kernel.MapEditor:9575
            if (_this.selectedLayer=="base") {
              //$LASTPOS=51009615;//kernel.MapEditor:9615
              _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=51009668;//kernel.MapEditor:9668
              _this.maponp=- 1;
              
            } else {
              //$LASTPOS=51009694;//kernel.MapEditor:9694
              if (_this.selectedLayer=="on") {
                //$LASTPOS=51009732;//kernel.MapEditor:9732
                _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              } else {
                //$LASTPOS=51009803;//kernel.MapEditor:9803
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=51009856;//kernel.MapEditor:9856
                _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              }
            }
            //$LASTPOS=51009981;//kernel.MapEditor:9981
            _this.mode="set";
            //$LASTPOS=51010034;//kernel.MapEditor:10034
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=45;return;
          case 45:
            
            //$LASTPOS=51010061;//kernel.MapEditor:10061
            _this.fiber$updateEx(_thread, 10);
            __pc=46;return;
          case 46:
            
          case 47    :
            
          case 48    :
            
          case 49    :
            
          case 50    :
            
          case 51    :
            
            //$LASTPOS=51010087;//kernel.MapEditor:10087
            _this.fiber$update(_thread);
            __pc=52;return;
          case 52:
            
            __pc=22;break;
          case 53    :
            
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
      
      //$LASTPOS=51010259;//kernel.MapEditor:10259
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=51010293;//kernel.MapEditor:10293
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=51010316;//kernel.MapEditor:10316
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=51010359;//kernel.MapEditor:10359
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=51010407;//kernel.MapEditor:10407
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=51010469;//kernel.MapEditor:10469
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=51010528;//kernel.MapEditor:10528
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=51010551;//kernel.MapEditor:10551
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=51010605;//kernel.MapEditor:10605
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010655;//kernel.MapEditor:10655
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010707;//kernel.MapEditor:10707
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010759;//kernel.MapEditor:10759
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010811;//kernel.MapEditor:10811
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=51010860;//kernel.MapEditor:10860
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=51010911;//kernel.MapEditor:10911
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=51010946;//kernel.MapEditor:10946
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51010997;//kernel.MapEditor:10997
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51011049;//kernel.MapEditor:11049
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51011101;//kernel.MapEditor:11101
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51011153;//kernel.MapEditor:11153
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=51011203;//kernel.MapEditor:11203
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=51011254;//kernel.MapEditor:11254
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=51011300;//kernel.MapEditor:11300
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=51011357;//kernel.MapEditor:11357
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=51011421;//kernel.MapEditor:11421
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=51011496;//kernel.MapEditor:11496
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=51011601;//kernel.MapEditor:11601
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51011678;//kernel.MapEditor:11678
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=51011763;//kernel.MapEditor:11763
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51011840;//kernel.MapEditor:11840
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51011916;//kernel.MapEditor:11916
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=51011994;//kernel.MapEditor:11994
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51010259;//kernel.MapEditor:10259
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=51010293;//kernel.MapEditor:10293
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=51010316;//kernel.MapEditor:10316
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=51010359;//kernel.MapEditor:10359
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=51010407;//kernel.MapEditor:10407
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=51010469;//kernel.MapEditor:10469
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=51010528;//kernel.MapEditor:10528
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=51010551;//kernel.MapEditor:10551
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=51010605;//kernel.MapEditor:10605
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010655;//kernel.MapEditor:10655
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010707;//kernel.MapEditor:10707
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010759;//kernel.MapEditor:10759
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=51010811;//kernel.MapEditor:10811
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=51010860;//kernel.MapEditor:10860
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=51010911;//kernel.MapEditor:10911
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=51010946;//kernel.MapEditor:10946
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51010997;//kernel.MapEditor:10997
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51011049;//kernel.MapEditor:11049
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51011101;//kernel.MapEditor:11101
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=51011153;//kernel.MapEditor:11153
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=51011203;//kernel.MapEditor:11203
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=51011254;//kernel.MapEditor:11254
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=51011300;//kernel.MapEditor:11300
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=51011357;//kernel.MapEditor:11357
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=51011421;//kernel.MapEditor:11421
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=51011496;//kernel.MapEditor:11496
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=51011601;//kernel.MapEditor:11601
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51011678;//kernel.MapEditor:11678
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=51011763;//kernel.MapEditor:11763
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51011840;//kernel.MapEditor:11840
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51011916;//kernel.MapEditor:11916
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=51011994;//kernel.MapEditor:11994
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    drawLetter :function _trc_MapEditor_drawLetter(mode) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=51012102;//kernel.MapEditor:12102
      if (mode=="set") {
        //$LASTPOS=51012118;//kernel.MapEditor:12118
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012156;//kernel.MapEditor:12156
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012191;//kernel.MapEditor:12191
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51012268;//kernel.MapEditor:12268
      if (mode=="get") {
        //$LASTPOS=51012284;//kernel.MapEditor:12284
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012322;//kernel.MapEditor:12322
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012357;//kernel.MapEditor:12357
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51012434;//kernel.MapEditor:12434
      if (mode=="erase") {
        //$LASTPOS=51012452;//kernel.MapEditor:12452
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012490;//kernel.MapEditor:12490
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012525;//kernel.MapEditor:12525
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=51012603;//kernel.MapEditor:12603
      if (mode=="copy") {
        //$LASTPOS=51012620;//kernel.MapEditor:12620
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012658;//kernel.MapEditor:12658
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012693;//kernel.MapEditor:12693
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=51012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=51012805;//kernel.MapEditor:12805
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=51012890;//kernel.MapEditor:12890
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
    },
    fiber$drawLetter :function _trc_MapEditor_f_drawLetter(_thread,mode) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51012102;//kernel.MapEditor:12102
      if (mode=="set") {
        //$LASTPOS=51012118;//kernel.MapEditor:12118
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012156;//kernel.MapEditor:12156
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012191;//kernel.MapEditor:12191
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51012268;//kernel.MapEditor:12268
      if (mode=="get") {
        //$LASTPOS=51012284;//kernel.MapEditor:12284
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012322;//kernel.MapEditor:12322
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012357;//kernel.MapEditor:12357
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=51012434;//kernel.MapEditor:12434
      if (mode=="erase") {
        //$LASTPOS=51012452;//kernel.MapEditor:12452
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012490;//kernel.MapEditor:12490
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012525;//kernel.MapEditor:12525
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=51012603;//kernel.MapEditor:12603
      if (mode=="copy") {
        //$LASTPOS=51012620;//kernel.MapEditor:12620
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=51012658;//kernel.MapEditor:12658
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=51012693;//kernel.MapEditor:12693
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=51012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=51012805;//kernel.MapEditor:12805
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=51012890;//kernel.MapEditor:12890
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false},"drawLetter":{"nowait":false}},"fields":{"loadMode":{},"fileExist":{},"fileList":{},"fNames":{},"fileName":{},"mapDataFile":{},"baseData":{},"loadedFile":{},"mapData":{},"mapOnData":{},"chipWidth":{},"chipHeight":{},"row":{},"col":{},"panel":{},"mIW":{},"mIH":{},"mCW":{},"mCH":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"maponp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"initialWidth":{},"initialHeight":{},"layers":{},"lc":{},"selectedLayer":{},"saveFileName":{},"saveDataFile":{},"data":{},"tmpon":{}}}
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
      
      //$LASTPOS=52000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=52000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=52000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=52000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=52000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=52000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=52000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=52000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=52000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=52000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=52000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=52000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=52000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=52000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=52000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=52000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=52000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=52000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=52000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=52000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=52000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=52000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=52000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=52000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=52001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=52001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=52001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=52001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=52001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=52001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=52001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=52001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=52001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=52001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=52001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=52001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=52001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=52001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=52001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=52001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=52001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=52001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=52001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=52001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=52001973;//kernel.MapEditorOLD:1973
      //$LASTPOS=52001977;//kernel.MapEditorOLD:1977
      _this.i = 0;
      for (; _this.i<16 ; _this.i++) {
        {
          //$LASTPOS=52002001;//kernel.MapEditorOLD:2001
          //$LASTPOS=52002005;//kernel.MapEditorOLD:2005
          _this.j = 0;
          for (; _this.j<8 ; _this.j++) {
            {
              //$LASTPOS=52002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=52002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=52002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=52002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=52002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=52002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=52002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=52002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=52002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=52002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=52002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=52002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=52002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=52002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=52002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=52002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=52002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=52002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=52002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=52002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=52002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=52002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=52002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=52002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=52002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=52002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=52002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=52002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=52002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=52002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=52002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=52002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=52002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=52002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=52002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=52002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=52002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=52003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=52003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=52003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=52003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=52003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=52003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=52003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=52003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=52003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=52003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=52003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=52003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=52003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=52003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=52004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=52004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=52004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=52004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=52004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=52004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=52004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=52004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=52004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=52004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=52004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=52004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=52004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=52004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=52004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=52004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=52004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=52004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=52004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=52004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=52004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=52004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=52004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=52004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=52004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=52004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=52004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=52004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=52004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=52004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=52004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=52005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=52005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=52005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=52005123;//kernel.MapEditorOLD:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=52000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=52000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=52000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2     ; break; }
            //$LASTPOS=52000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5     ; break;
            
          case 2     :
            
            //$LASTPOS=52000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3     ; break; }
            //$LASTPOS=52000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5     ; break;
            
          case 3     :
            
            //$LASTPOS=52000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5     :
            
            //$LASTPOS=52000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9     ; break; }
            //$LASTPOS=52000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=52000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=52000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=52000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6     ; break; }
            {
              //$LASTPOS=52000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8     ;break;
          case 6     :
            //$LASTPOS=52000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=52000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=52000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8     :
            
            //$LASTPOS=52000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=52000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=52000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=52000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=52000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=52000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9     :
            
            //$LASTPOS=52000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=52001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12    ; break; }
            //$LASTPOS=52001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=52001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=52001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=52001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=52001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=52001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=52001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=52001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=52001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13    ;break;
          case 12    :
            {
              //$LASTPOS=52001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=52001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=52001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=52001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=52001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=52001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=52001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=52001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13    :
            
            //$LASTPOS=52001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=52001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=52001973;//kernel.MapEditorOLD:1973
            //$LASTPOS=52001977;//kernel.MapEditorOLD:1977
            _this.i = 0;
            for (; _this.i<16 ; _this.i++) {
              {
                //$LASTPOS=52002001;//kernel.MapEditorOLD:2001
                //$LASTPOS=52002005;//kernel.MapEditorOLD:2005
                _this.j = 0;
                for (; _this.j<8 ; _this.j++) {
                  {
                    //$LASTPOS=52002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=52002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=52002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=52002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=52002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=52002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=52002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=52002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=52002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=52002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=52002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=52002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=52002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=52002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=52002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=52002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=52002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=52002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=52002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=52002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=52002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=52002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=52002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=52002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=52002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=52002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=52002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=52002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=52002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=52002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=52002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=52002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=52002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=52002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=52002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=52002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=52002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=52003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=52003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=52003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=52003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=52003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=52003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=52003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=52003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=52003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=52003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=52003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=52003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=52003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=52003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=52004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=52004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=52004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=52004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=52004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=52004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=52004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=52004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=52004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=52004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=52004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=52004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=52004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=52004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=52004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=52004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=52004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15    ; break; }
            {
              //$LASTPOS=52004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=52004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25    ;break;
          case 15    :
            //$LASTPOS=52004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16    ; break; }
            {
              //$LASTPOS=52004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24    ;break;
          case 16    :
            //$LASTPOS=52004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18    ; break; }
            //$LASTPOS=52004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=52004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=52004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=52004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=52004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23    ;break;
          case 18    :
            //$LASTPOS=52004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19    ; break; }
            {
              //$LASTPOS=52004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22    ;break;
          case 19    :
            //$LASTPOS=52004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21    ; break; }
            //$LASTPOS=52004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=52005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=52005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=52005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21    :
            
          case 22    :
            
          case 23    :
            
          case 24    :
            
          case 25    :
            
            //$LASTPOS=52005123;//kernel.MapEditorOLD:5123
            _this.fiber$update(_thread);
            __pc=26;return;
          case 26:
            
            __pc=14;break;
          case 27    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"loadMode":{},"fileName":{},"mapDataFile":{},"baseData":{},"mapData":{},"mapOnData":{},"row":{},"col":{},"panel":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"saveFileName":{},"saveDataFile":{},"data":{}}}
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
      
      //$LASTPOS=53000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=53000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=53000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=53000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      //$LASTPOS=53000116;//kernel.MapEditorOLD2:116
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=53000144;//kernel.MapEditorOLD2:144
      if (_this.fileList.exists()) {
        //$LASTPOS=53000168;//kernel.MapEditorOLD2:168
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=53000207;//kernel.MapEditorOLD2:207
          f=f+"";
          //$LASTPOS=53000220;//kernel.MapEditorOLD2:220
          _this.fNames=f.split("/");
          //$LASTPOS=53000246;//kernel.MapEditorOLD2:246
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=53000283;//kernel.MapEditorOLD2:283
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=53000308;//kernel.MapEditorOLD2:308
      if (_this.fileExist) {
        //$LASTPOS=53000328;//kernel.MapEditorOLD2:328
        _this.print("Load Data?: Y or N");
        //$LASTPOS=53000362;//kernel.MapEditorOLD2:362
        while (true) {
          //$LASTPOS=53000384;//kernel.MapEditorOLD2:384
          if (_this.getkey("y")>0) {
            //$LASTPOS=53000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=53000471;//kernel.MapEditorOLD2:471
          if (_this.getkey("n")>0) {
            //$LASTPOS=53000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=53000559;//kernel.MapEditorOLD2:559
          _this.update();
          
        }
        //$LASTPOS=53000581;//kernel.MapEditorOLD2:581
        if (_this.loadMode) {
          //$LASTPOS=53000604;//kernel.MapEditorOLD2:604
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=53000669;//kernel.MapEditorOLD2:669
          if (_this.fileName) {
            //$LASTPOS=53000696;//kernel.MapEditorOLD2:696
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=53000760;//kernel.MapEditorOLD2:760
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=53000796;//kernel.MapEditorOLD2:796
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=53000837;//kernel.MapEditorOLD2:837
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=53000887;//kernel.MapEditorOLD2:887
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=53000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=53000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=53001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=53001069;//kernel.MapEditorOLD2:1069
          if (_this.baseData==undefined) {
            //$LASTPOS=53001107;//kernel.MapEditorOLD2:1107
            _this.print("Load failed");
            //$LASTPOS=53001142;//kernel.MapEditorOLD2:1142
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=53001173;//kernel.MapEditorOLD2:1173
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=53001218;//kernel.MapEditorOLD2:1218
              _this.mapData=_this.baseData[0];
              //$LASTPOS=53001252;//kernel.MapEditorOLD2:1252
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=53001288;//kernel.MapEditorOLD2:1288
              if (_this.baseData.length>2) {
                //$LASTPOS=53001328;//kernel.MapEditorOLD2:1328
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=53001384;//kernel.MapEditorOLD2:1384
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=53001461;//kernel.MapEditorOLD2:1461
      _this.update();
      //$LASTPOS=53001739;//kernel.MapEditorOLD2:1739
      if (! _this.loadMode) {
        //$LASTPOS=53001759;//kernel.MapEditorOLD2:1759
        _this.row=prompt("input row");
        //$LASTPOS=53001789;//kernel.MapEditorOLD2:1789
        _this.col=prompt("input col");
        //$LASTPOS=53001819;//kernel.MapEditorOLD2:1819
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=53001861;//kernel.MapEditorOLD2:1861
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=53001905;//kernel.MapEditorOLD2:1905
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=53001970;//kernel.MapEditorOLD2:1970
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=53002001;//kernel.MapEditorOLD2:2001
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=53002033;//kernel.MapEditorOLD2:2033
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=53002066;//kernel.MapEditorOLD2:2066
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=53002117;//kernel.MapEditorOLD2:2117
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=53002428;//kernel.MapEditorOLD2:2428
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=53002475;//kernel.MapEditorOLD2:2475
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=53002501;//kernel.MapEditorOLD2:2501
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=53002597;//kernel.MapEditorOLD2:2597
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=53002628;//kernel.MapEditorOLD2:2628
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=53002660;//kernel.MapEditorOLD2:2660
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=53002693;//kernel.MapEditorOLD2:2693
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=53002743;//kernel.MapEditorOLD2:2743
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=53002799;//kernel.MapEditorOLD2:2799
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=53002856;//kernel.MapEditorOLD2:2856
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=53002908;//kernel.MapEditorOLD2:2908
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=53002961;//kernel.MapEditorOLD2:2961
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=53003043;//kernel.MapEditorOLD2:3043
      _this.counter=0;
      //$LASTPOS=53003055;//kernel.MapEditorOLD2:3055
      //$LASTPOS=53003059;//kernel.MapEditorOLD2:3059
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=53003088;//kernel.MapEditorOLD2:3088
          //$LASTPOS=53003092;//kernel.MapEditorOLD2:3092
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=53003125;//kernel.MapEditorOLD2:3125
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=53003169;//kernel.MapEditorOLD2:3169
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=53003191;//kernel.MapEditorOLD2:3191
      _this.drawPanel();
      //$LASTPOS=53003205;//kernel.MapEditorOLD2:3205
      _this.mode="get";
      //$LASTPOS=53003218;//kernel.MapEditorOLD2:3218
      _this.prevMode="set";
      //$LASTPOS=53003235;//kernel.MapEditorOLD2:3235
      _this.mapp=0;
      //$LASTPOS=53003244;//kernel.MapEditorOLD2:3244
      _this.mx=- 40;
      //$LASTPOS=53003253;//kernel.MapEditorOLD2:3253
      _this.my=- 40;
      //$LASTPOS=53003262;//kernel.MapEditorOLD2:3262
      _this.chipX=- 40;
      //$LASTPOS=53003274;//kernel.MapEditorOLD2:3274
      _this.chipY=- 40;
      //$LASTPOS=53003286;//kernel.MapEditorOLD2:3286
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=53003315;//kernel.MapEditorOLD2:3315
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=53003346;//kernel.MapEditorOLD2:3346
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=53003369;//kernel.MapEditorOLD2:3369
      while (true) {
        //$LASTPOS=53003387;//kernel.MapEditorOLD2:3387
        _this.p=_this.mapp;
        //$LASTPOS=53003400;//kernel.MapEditorOLD2:3400
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=53003539;//kernel.MapEditorOLD2:3539
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=53003573;//kernel.MapEditorOLD2:3573
          _this.mode="erase";
          //$LASTPOS=53003596;//kernel.MapEditorOLD2:3596
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=53003629;//kernel.MapEditorOLD2:3629
        if (_this.getkey("s")==1) {
          //$LASTPOS=53003658;//kernel.MapEditorOLD2:3658
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=53003692;//kernel.MapEditorOLD2:3692
          if (_this.mode=="set") {
            //$LASTPOS=53003722;//kernel.MapEditorOLD2:3722
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=53003765;//kernel.MapEditorOLD2:3765
            _this.mode="set";
            
          }
          //$LASTPOS=53003797;//kernel.MapEditorOLD2:3797
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=53003830;//kernel.MapEditorOLD2:3830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=53003949;//kernel.MapEditorOLD2:3949
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=53003983;//kernel.MapEditorOLD2:3983
          _this.mode="set";
          //$LASTPOS=53004004;//kernel.MapEditorOLD2:4004
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=53004037;//kernel.MapEditorOLD2:4037
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=53004158;//kernel.MapEditorOLD2:4158
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=53004192;//kernel.MapEditorOLD2:4192
          _this.mode="setOn";
          //$LASTPOS=53004215;//kernel.MapEditorOLD2:4215
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=53004341;//kernel.MapEditorOLD2:4341
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=53004482;//kernel.MapEditorOLD2:4482
          if (_this.mode!="get") {
            //$LASTPOS=53004512;//kernel.MapEditorOLD2:4512
            _this.prevMode=_this.mode;
            //$LASTPOS=53004540;//kernel.MapEditorOLD2:4540
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=53004576;//kernel.MapEditorOLD2:4576
            _this.mode="get";
            //$LASTPOS=53004601;//kernel.MapEditorOLD2:4601
            _this.chipX=- 40;
            //$LASTPOS=53004625;//kernel.MapEditorOLD2:4625
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=53004665;//kernel.MapEditorOLD2:4665
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=53004703;//kernel.MapEditorOLD2:4703
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=53004738;//kernel.MapEditorOLD2:4738
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=53004771;//kernel.MapEditorOLD2:4771
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=53004927;//kernel.MapEditorOLD2:4927
          if (_this.loadedFile) {
            //$LASTPOS=53004956;//kernel.MapEditorOLD2:4956
            _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=53005044;//kernel.MapEditorOLD2:5044
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=53005544;//kernel.MapEditorOLD2:5544
          if (_this.saveFileName) {
            //$LASTPOS=53005575;//kernel.MapEditorOLD2:5575
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=53005637;//kernel.MapEditorOLD2:5637
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=53005799;//kernel.MapEditorOLD2:5799
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=53005836;//kernel.MapEditorOLD2:5836
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=53005943;//kernel.MapEditorOLD2:5943
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=53006084;//kernel.MapEditorOLD2:6084
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=53006118;//kernel.MapEditorOLD2:6118
          _this.mode="copy";
          //$LASTPOS=53006140;//kernel.MapEditorOLD2:6140
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=53006173;//kernel.MapEditorOLD2:6173
        if (_this.mode!="get") {
          //$LASTPOS=53006199;//kernel.MapEditorOLD2:6199
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=53006305;//kernel.MapEditorOLD2:6305
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=53006323;//kernel.MapEditorOLD2:6323
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=53006454;//kernel.MapEditorOLD2:6454
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=53006472;//kernel.MapEditorOLD2:6472
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=53006585;//kernel.MapEditorOLD2:6585
            _this.my=_this.my+8;
          }
          //$LASTPOS=53006603;//kernel.MapEditorOLD2:6603
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=53006738;//kernel.MapEditorOLD2:6738
            _this.my=_this.my-8;
          }
          //$LASTPOS=53006756;//kernel.MapEditorOLD2:6756
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=53006799;//kernel.MapEditorOLD2:6799
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=53006905;//kernel.MapEditorOLD2:6905
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=53006929;//kernel.MapEditorOLD2:6929
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=53007060;//kernel.MapEditorOLD2:7060
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=53007084;//kernel.MapEditorOLD2:7084
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=53007197;//kernel.MapEditorOLD2:7197
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=53007221;//kernel.MapEditorOLD2:7221
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=53007356;//kernel.MapEditorOLD2:7356
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=53007380;//kernel.MapEditorOLD2:7380
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=53007453;//kernel.MapEditorOLD2:7453
        if (_this.getkey("i")==1) {
          //$LASTPOS=53007482;//kernel.MapEditorOLD2:7482
          Tonyu.globals.$map.chipWidth+=4;
          //$LASTPOS=53007510;//kernel.MapEditorOLD2:7510
          Tonyu.globals.$map.chipHeight+=4;
          //$LASTPOS=53007539;//kernel.MapEditorOLD2:7539
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=53007566;//kernel.MapEditorOLD2:7566
          _this.panel.die();
          //$LASTPOS=53007588;//kernel.MapEditorOLD2:7588
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=53007688;//kernel.MapEditorOLD2:7688
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=53007723;//kernel.MapEditorOLD2:7723
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=53007759;//kernel.MapEditorOLD2:7759
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=53007796;//kernel.MapEditorOLD2:7796
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=53007854;//kernel.MapEditorOLD2:7854
        if (_this.getkey("o")==1) {
          //$LASTPOS=53007883;//kernel.MapEditorOLD2:7883
          Tonyu.globals.$map.chipWidth-=4;
          //$LASTPOS=53007911;//kernel.MapEditorOLD2:7911
          Tonyu.globals.$map.chipHeight-=4;
          //$LASTPOS=53007940;//kernel.MapEditorOLD2:7940
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=53007967;//kernel.MapEditorOLD2:7967
          _this.panel.die();
          //$LASTPOS=53007989;//kernel.MapEditorOLD2:7989
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=53008089;//kernel.MapEditorOLD2:8089
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=53008124;//kernel.MapEditorOLD2:8124
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=53008160;//kernel.MapEditorOLD2:8160
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=53008197;//kernel.MapEditorOLD2:8197
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=53008289;//kernel.MapEditorOLD2:8289
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=53008320;//kernel.MapEditorOLD2:8320
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=53008352;//kernel.MapEditorOLD2:8352
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=53008405;//kernel.MapEditorOLD2:8405
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=53008454;//kernel.MapEditorOLD2:8454
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=53008505;//kernel.MapEditorOLD2:8505
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=53008560;//kernel.MapEditorOLD2:8560
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=53008609;//kernel.MapEditorOLD2:8609
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=53008662;//kernel.MapEditorOLD2:8662
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=53008716;//kernel.MapEditorOLD2:8716
              _this.mode=_this.prevMode;
              //$LASTPOS=53008740;//kernel.MapEditorOLD2:8740
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=53008774;//kernel.MapEditorOLD2:8774
              _this.print(_this.mode+" mode");
              //$LASTPOS=53008804;//kernel.MapEditorOLD2:8804
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=53008829;//kernel.MapEditorOLD2:8829
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=53008884;//kernel.MapEditorOLD2:8884
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=53008937;//kernel.MapEditorOLD2:8937
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=53008991;//kernel.MapEditorOLD2:8991
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=53009040;//kernel.MapEditorOLD2:9040
                  _this.mode="set";
                  //$LASTPOS=53009061;//kernel.MapEditorOLD2:9061
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=53009091;//kernel.MapEditorOLD2:9091
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=53009117;//kernel.MapEditorOLD2:9117
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=53000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=53000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=53000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=53000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditorOLD2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=53000116;//kernel.MapEditorOLD2:116
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=53000144;//kernel.MapEditorOLD2:144
            if (_this.fileList.exists()) {
              //$LASTPOS=53000168;//kernel.MapEditorOLD2:168
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=53000207;//kernel.MapEditorOLD2:207
                f=f+"";
                //$LASTPOS=53000220;//kernel.MapEditorOLD2:220
                _this.fNames=f.split("/");
                //$LASTPOS=53000246;//kernel.MapEditorOLD2:246
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=53000283;//kernel.MapEditorOLD2:283
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=53000308;//kernel.MapEditorOLD2:308
            if (!(_this.fileExist)) { __pc=11    ; break; }
            //$LASTPOS=53000328;//kernel.MapEditorOLD2:328
            _this.print("Load Data?: Y or N");
            //$LASTPOS=53000362;//kernel.MapEditorOLD2:362
          case 2:
            //$LASTPOS=53000384;//kernel.MapEditorOLD2:384
            if (!(_this.getkey("y")>0)) { __pc=3     ; break; }
            //$LASTPOS=53000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            __pc=6     ; break;
            
          case 3     :
            
            //$LASTPOS=53000471;//kernel.MapEditorOLD2:471
            if (!(_this.getkey("n")>0)) { __pc=4     ; break; }
            //$LASTPOS=53000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            __pc=6     ; break;
            
          case 4     :
            
            //$LASTPOS=53000559;//kernel.MapEditorOLD2:559
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6     :
            
            //$LASTPOS=53000581;//kernel.MapEditorOLD2:581
            if (!(_this.loadMode)) { __pc=10    ; break; }
            //$LASTPOS=53000604;//kernel.MapEditorOLD2:604
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=53000669;//kernel.MapEditorOLD2:669
            if (_this.fileName) {
              //$LASTPOS=53000696;//kernel.MapEditorOLD2:696
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=53000760;//kernel.MapEditorOLD2:760
            if (!(_this.mapDataFile.obj())) { __pc=7     ; break; }
            {
              //$LASTPOS=53000796;//kernel.MapEditorOLD2:796
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=53000837;//kernel.MapEditorOLD2:837
              _this.loadedFile=_this.fileName;
            }
            __pc=9     ;break;
          case 7     :
            //$LASTPOS=53000887;//kernel.MapEditorOLD2:887
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=53000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=53000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=53001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
          case 9     :
            
            //$LASTPOS=53001069;//kernel.MapEditorOLD2:1069
            if (_this.baseData==undefined) {
              //$LASTPOS=53001107;//kernel.MapEditorOLD2:1107
              _this.print("Load failed");
              //$LASTPOS=53001142;//kernel.MapEditorOLD2:1142
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=53001173;//kernel.MapEditorOLD2:1173
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=53001218;//kernel.MapEditorOLD2:1218
                _this.mapData=_this.baseData[0];
                //$LASTPOS=53001252;//kernel.MapEditorOLD2:1252
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=53001288;//kernel.MapEditorOLD2:1288
                if (_this.baseData.length>2) {
                  //$LASTPOS=53001328;//kernel.MapEditorOLD2:1328
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=53001384;//kernel.MapEditorOLD2:1384
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10    :
            
          case 11    :
            
            //$LASTPOS=53001461;//kernel.MapEditorOLD2:1461
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=53001739;//kernel.MapEditorOLD2:1739
            if (! _this.loadMode) {
              //$LASTPOS=53001759;//kernel.MapEditorOLD2:1759
              _this.row=prompt("input row");
              //$LASTPOS=53001789;//kernel.MapEditorOLD2:1789
              _this.col=prompt("input col");
              //$LASTPOS=53001819;//kernel.MapEditorOLD2:1819
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=53001861;//kernel.MapEditorOLD2:1861
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=53001905;//kernel.MapEditorOLD2:1905
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=53001970;//kernel.MapEditorOLD2:1970
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=53002001;//kernel.MapEditorOLD2:2001
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=53002033;//kernel.MapEditorOLD2:2033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=53002066;//kernel.MapEditorOLD2:2066
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=53002117;//kernel.MapEditorOLD2:2117
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=53002428;//kernel.MapEditorOLD2:2428
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=53002475;//kernel.MapEditorOLD2:2475
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=53002501;//kernel.MapEditorOLD2:2501
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=53002597;//kernel.MapEditorOLD2:2597
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=53002628;//kernel.MapEditorOLD2:2628
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=53002660;//kernel.MapEditorOLD2:2660
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=53002693;//kernel.MapEditorOLD2:2693
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=53002743;//kernel.MapEditorOLD2:2743
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=53002799;//kernel.MapEditorOLD2:2799
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=53002856;//kernel.MapEditorOLD2:2856
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=53002908;//kernel.MapEditorOLD2:2908
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=53002961;//kernel.MapEditorOLD2:2961
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=53003043;//kernel.MapEditorOLD2:3043
            _this.counter=0;
            //$LASTPOS=53003055;//kernel.MapEditorOLD2:3055
            //$LASTPOS=53003059;//kernel.MapEditorOLD2:3059
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=53003088;//kernel.MapEditorOLD2:3088
                //$LASTPOS=53003092;//kernel.MapEditorOLD2:3092
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=53003125;//kernel.MapEditorOLD2:3125
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=53003169;//kernel.MapEditorOLD2:3169
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=53003191;//kernel.MapEditorOLD2:3191
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=53003205;//kernel.MapEditorOLD2:3205
            _this.mode="get";
            //$LASTPOS=53003218;//kernel.MapEditorOLD2:3218
            _this.prevMode="set";
            //$LASTPOS=53003235;//kernel.MapEditorOLD2:3235
            _this.mapp=0;
            //$LASTPOS=53003244;//kernel.MapEditorOLD2:3244
            _this.mx=- 40;
            //$LASTPOS=53003253;//kernel.MapEditorOLD2:3253
            _this.my=- 40;
            //$LASTPOS=53003262;//kernel.MapEditorOLD2:3262
            _this.chipX=- 40;
            //$LASTPOS=53003274;//kernel.MapEditorOLD2:3274
            _this.chipY=- 40;
            //$LASTPOS=53003286;//kernel.MapEditorOLD2:3286
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=53003315;//kernel.MapEditorOLD2:3315
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=53003346;//kernel.MapEditorOLD2:3346
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=53003369;//kernel.MapEditorOLD2:3369
          case 14:
            //$LASTPOS=53003387;//kernel.MapEditorOLD2:3387
            _this.p=_this.mapp;
            //$LASTPOS=53003400;//kernel.MapEditorOLD2:3400
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=53003539;//kernel.MapEditorOLD2:3539
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=53003573;//kernel.MapEditorOLD2:3573
              _this.mode="erase";
              //$LASTPOS=53003596;//kernel.MapEditorOLD2:3596
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=53003629;//kernel.MapEditorOLD2:3629
            if (_this.getkey("s")==1) {
              //$LASTPOS=53003658;//kernel.MapEditorOLD2:3658
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=53003692;//kernel.MapEditorOLD2:3692
              if (_this.mode=="set") {
                //$LASTPOS=53003722;//kernel.MapEditorOLD2:3722
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=53003765;//kernel.MapEditorOLD2:3765
                _this.mode="set";
                
              }
              //$LASTPOS=53003797;//kernel.MapEditorOLD2:3797
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=53003830;//kernel.MapEditorOLD2:3830
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=53003949;//kernel.MapEditorOLD2:3949
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=53003983;//kernel.MapEditorOLD2:3983
              _this.mode="set";
              //$LASTPOS=53004004;//kernel.MapEditorOLD2:4004
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=53004037;//kernel.MapEditorOLD2:4037
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=53004158;//kernel.MapEditorOLD2:4158
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=53004192;//kernel.MapEditorOLD2:4192
              _this.mode="setOn";
              //$LASTPOS=53004215;//kernel.MapEditorOLD2:4215
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=53004341;//kernel.MapEditorOLD2:4341
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=53004482;//kernel.MapEditorOLD2:4482
              if (_this.mode!="get") {
                //$LASTPOS=53004512;//kernel.MapEditorOLD2:4512
                _this.prevMode=_this.mode;
                //$LASTPOS=53004540;//kernel.MapEditorOLD2:4540
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=53004576;//kernel.MapEditorOLD2:4576
                _this.mode="get";
                //$LASTPOS=53004601;//kernel.MapEditorOLD2:4601
                _this.chipX=- 40;
                //$LASTPOS=53004625;//kernel.MapEditorOLD2:4625
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=53004665;//kernel.MapEditorOLD2:4665
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=53004703;//kernel.MapEditorOLD2:4703
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=53004738;//kernel.MapEditorOLD2:4738
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=53004771;//kernel.MapEditorOLD2:4771
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=53004927;//kernel.MapEditorOLD2:4927
              if (_this.loadedFile) {
                //$LASTPOS=53004956;//kernel.MapEditorOLD2:4956
                _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
                
              } else {
                //$LASTPOS=53005044;//kernel.MapEditorOLD2:5044
                _this.saveFileName=prompt("input json file(*.json)","map.json");
                
              }
              //$LASTPOS=53005544;//kernel.MapEditorOLD2:5544
              if (_this.saveFileName) {
                //$LASTPOS=53005575;//kernel.MapEditorOLD2:5575
                _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
                //$LASTPOS=53005637;//kernel.MapEditorOLD2:5637
                _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
                //$LASTPOS=53005799;//kernel.MapEditorOLD2:5799
                _this.saveDataFile.obj(_this.data);
                //$LASTPOS=53005836;//kernel.MapEditorOLD2:5836
                _this.print(_this.saveFileName+" Saved");
                
              }
              
            }
            //$LASTPOS=53005943;//kernel.MapEditorOLD2:5943
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=53006084;//kernel.MapEditorOLD2:6084
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=53006118;//kernel.MapEditorOLD2:6118
              _this.mode="copy";
              //$LASTPOS=53006140;//kernel.MapEditorOLD2:6140
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=53006173;//kernel.MapEditorOLD2:6173
            if (_this.mode!="get") {
              //$LASTPOS=53006199;//kernel.MapEditorOLD2:6199
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=53006305;//kernel.MapEditorOLD2:6305
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=53006323;//kernel.MapEditorOLD2:6323
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=53006454;//kernel.MapEditorOLD2:6454
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=53006472;//kernel.MapEditorOLD2:6472
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=53006585;//kernel.MapEditorOLD2:6585
                _this.my=_this.my+8;
              }
              //$LASTPOS=53006603;//kernel.MapEditorOLD2:6603
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=53006738;//kernel.MapEditorOLD2:6738
                _this.my=_this.my-8;
              }
              //$LASTPOS=53006756;//kernel.MapEditorOLD2:6756
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=53006799;//kernel.MapEditorOLD2:6799
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=53006905;//kernel.MapEditorOLD2:6905
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=53006929;//kernel.MapEditorOLD2:6929
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=53007060;//kernel.MapEditorOLD2:7060
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=53007084;//kernel.MapEditorOLD2:7084
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=53007197;//kernel.MapEditorOLD2:7197
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=53007221;//kernel.MapEditorOLD2:7221
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=53007356;//kernel.MapEditorOLD2:7356
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=53007380;//kernel.MapEditorOLD2:7380
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=53007453;//kernel.MapEditorOLD2:7453
            if (_this.getkey("i")==1) {
              //$LASTPOS=53007482;//kernel.MapEditorOLD2:7482
              Tonyu.globals.$map.chipWidth+=4;
              //$LASTPOS=53007510;//kernel.MapEditorOLD2:7510
              Tonyu.globals.$map.chipHeight+=4;
              //$LASTPOS=53007539;//kernel.MapEditorOLD2:7539
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=53007566;//kernel.MapEditorOLD2:7566
              _this.panel.die();
              //$LASTPOS=53007588;//kernel.MapEditorOLD2:7588
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=53007688;//kernel.MapEditorOLD2:7688
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=53007723;//kernel.MapEditorOLD2:7723
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=53007759;//kernel.MapEditorOLD2:7759
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=53007796;//kernel.MapEditorOLD2:7796
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=53007854;//kernel.MapEditorOLD2:7854
            if (_this.getkey("o")==1) {
              //$LASTPOS=53007883;//kernel.MapEditorOLD2:7883
              Tonyu.globals.$map.chipWidth-=4;
              //$LASTPOS=53007911;//kernel.MapEditorOLD2:7911
              Tonyu.globals.$map.chipHeight-=4;
              //$LASTPOS=53007940;//kernel.MapEditorOLD2:7940
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=53007967;//kernel.MapEditorOLD2:7967
              _this.panel.die();
              //$LASTPOS=53007989;//kernel.MapEditorOLD2:7989
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=53008089;//kernel.MapEditorOLD2:8089
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=53008124;//kernel.MapEditorOLD2:8124
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=53008160;//kernel.MapEditorOLD2:8160
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=53008197;//kernel.MapEditorOLD2:8197
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=53008289;//kernel.MapEditorOLD2:8289
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=53008320;//kernel.MapEditorOLD2:8320
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=53008352;//kernel.MapEditorOLD2:8352
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15    ; break; }
            {
              //$LASTPOS=53008405;//kernel.MapEditorOLD2:8405
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=53008454;//kernel.MapEditorOLD2:8454
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25    ;break;
          case 15    :
            //$LASTPOS=53008505;//kernel.MapEditorOLD2:8505
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16    ; break; }
            {
              //$LASTPOS=53008560;//kernel.MapEditorOLD2:8560
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24    ;break;
          case 16    :
            //$LASTPOS=53008609;//kernel.MapEditorOLD2:8609
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18    ; break; }
            //$LASTPOS=53008662;//kernel.MapEditorOLD2:8662
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=53008716;//kernel.MapEditorOLD2:8716
            _this.mode=_this.prevMode;
            //$LASTPOS=53008740;//kernel.MapEditorOLD2:8740
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=53008774;//kernel.MapEditorOLD2:8774
            _this.print(_this.mode+" mode");
            //$LASTPOS=53008804;//kernel.MapEditorOLD2:8804
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23    ;break;
          case 18    :
            //$LASTPOS=53008829;//kernel.MapEditorOLD2:8829
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19    ; break; }
            {
              //$LASTPOS=53008884;//kernel.MapEditorOLD2:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22    ;break;
          case 19    :
            //$LASTPOS=53008937;//kernel.MapEditorOLD2:8937
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21    ; break; }
            //$LASTPOS=53008991;//kernel.MapEditorOLD2:8991
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=53009040;//kernel.MapEditorOLD2:9040
            _this.mode="set";
            //$LASTPOS=53009061;//kernel.MapEditorOLD2:9061
            _this.print(_this.mode+" mode");
            //$LASTPOS=53009091;//kernel.MapEditorOLD2:9091
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21    :
            
          case 22    :
            
          case 23    :
            
          case 24    :
            
          case 25    :
            
            //$LASTPOS=53009117;//kernel.MapEditorOLD2:9117
            _this.fiber$update(_thread);
            __pc=26;return;
          case 26:
            
            __pc=14;break;
          case 27    :
            
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
      
      //$LASTPOS=53009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=53009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=53009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=53009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=53009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=53009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=53009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=53009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=53009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=53009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=53009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=53009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=53010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=53010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=53010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=53010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=53010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=53010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=53010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=53010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=53010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=53010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=53010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=53011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditorOLD2_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=53009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=53009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=53009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=53009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=53009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=53009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=53009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=53009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=53009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=53009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=53009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=53009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=53009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=53010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=53010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=53010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=53010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=53010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=53010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=53010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=53010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=53010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=53010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=53010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=53010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=53011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false}},"fields":{"loadMode":{},"fileExist":{},"fileList":{},"fNames":{},"fileName":{},"mapDataFile":{},"baseData":{},"loadedFile":{},"mapData":{},"mapOnData":{},"chipWidth":{},"chipHeight":{},"row":{},"col":{},"panel":{},"mIW":{},"mIH":{},"mCW":{},"mCH":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"saveFileName":{},"saveDataFile":{},"data":{}}}
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
      
      //$LASTPOS=54001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=54003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=54003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=54003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=54001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=54003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=54003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=54003502;//kernel.Pad:3502
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Pad_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=54000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=54000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=54000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=54000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=54000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=54000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=54000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=54000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=54000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=54000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=54001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=54001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=54001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=54001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=54001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=54001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=54001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=54001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=54001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=54001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=54001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=54001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=54001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=54001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=54001383;//kernel.Pad:1383
      //$LASTPOS=54001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=54001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=54001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=54001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=54001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=54001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=54001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=54001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=54001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=54001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=54001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=54001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=54002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=54002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=54002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=54002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=54002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=54002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=54002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=54002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=54002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=54002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=54002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=54002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=54002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=54002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=54002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=54002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=54002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=54002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=54002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=54002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=54002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=54002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=54002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=54002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=54002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=54002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=54002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=54002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=54002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=54002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=54002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=54002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=54002739;//kernel.Pad:2739
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
      
      //$LASTPOS=54001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=54001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=54001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=54001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=54001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=54001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=54001383;//kernel.Pad:1383
      //$LASTPOS=54001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=54001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=54001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=54001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=54001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=54001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=54001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=54001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=54001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=54001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=54001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=54001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=54002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=54002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=54002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=54002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=54002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=54002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=54002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=54002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=54002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=54002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=54002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=54002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=54002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=54002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=54002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=54002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=54002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=54002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=54002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=54002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=54002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=54002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=54002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=54002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=54002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=54002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=54002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=54002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=54002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=54002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=54002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=54002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=54002739;//kernel.Pad:2739
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
      
      
      //$LASTPOS=54002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=54002968;//kernel.Pad:2968
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
      
      
      //$LASTPOS=54002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=54002968;//kernel.Pad:2968
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
      
      
      //$LASTPOS=54003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=54003191;//kernel.Pad:3191
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
      
      
      //$LASTPOS=54003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=54003191;//kernel.Pad:3191
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}},"fields":{"APAD_DIAG_SIZE":{},"padImageP":{},"jujiKey":{},"no1Key":{},"jujiKeyPushU":{},"jujiKeyPushL":{},"jujiKeyPushR":{},"jujiKeyPushD":{},"jujiKeyPush1":{},"keyPushL":{},"keyPushR":{},"keyPushU":{},"keyPushD":{},"keyPush1":{},"padKeyNotapCnt":{},"padKeySW":{},"keyCntL":{},"keyCntR":{},"keyCntU":{},"keyCntD":{},"keyCnt1":{}}}
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
      
      //$LASTPOS=55000018;//kernel.UILayout:18
      _this.doLayout();
      //$LASTPOS=55000031;//kernel.UILayout:31
      Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
      //$LASTPOS=55000063;//kernel.UILayout:63
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
            //$LASTPOS=55000018;//kernel.UILayout:18
            _this.fiber$doLayout(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=55000031;//kernel.UILayout:31
            Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
            //$LASTPOS=55000063;//kernel.UILayout:63
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
      var isPC;
      
      //$LASTPOS=55000116;//kernel.UILayout:116
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=55000145;//kernel.UILayout:145
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=55000175;//kernel.UILayout:175
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=55000205;//kernel.UILayout:205
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=55000243;//kernel.UILayout:243
      calcw = ch/height*width;
      
      //$LASTPOS=55000295;//kernel.UILayout:295
      calch = cw/width*height;
      
      //$LASTPOS=55000347;//kernel.UILayout:347
      if (calch>ch) {
        //$LASTPOS=55000361;//kernel.UILayout:361
        calch=ch;
      }
      //$LASTPOS=55000376;//kernel.UILayout:376
      if (calcw>cw) {
        //$LASTPOS=55000390;//kernel.UILayout:390
        calcw=cw;
      }
      //$LASTPOS=55000405;//kernel.UILayout:405
      scl = 1;
      
      //$LASTPOS=55000421;//kernel.UILayout:421
      isPC = ! (Tonyu.globals.$Navigator.isTablet()||Tonyu.globals.$Navigator.isMobile());
      
      //$LASTPOS=55000486;//kernel.UILayout:486
      if (isPC&&_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=55000548;//kernel.UILayout:548
        calcw=width;
        //$LASTPOS=55000560;//kernel.UILayout:560
        calch=height;
        //$LASTPOS=55000583;//kernel.UILayout:583
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=55000624;//kernel.UILayout:624
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=55000668;//kernel.UILayout:668
      Tonyu.globals.$Screen.x=_this.trunc(cw/2)+width/2%1;
      //$LASTPOS=55000706;//kernel.UILayout:706
      Tonyu.globals.$Screen.y=_this.trunc(ch/2)+height/2%1;
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
      var isPC;
      
      //$LASTPOS=55000116;//kernel.UILayout:116
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=55000145;//kernel.UILayout:145
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=55000175;//kernel.UILayout:175
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=55000205;//kernel.UILayout:205
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=55000243;//kernel.UILayout:243
      calcw = ch/height*width;
      
      //$LASTPOS=55000295;//kernel.UILayout:295
      calch = cw/width*height;
      
      //$LASTPOS=55000347;//kernel.UILayout:347
      if (calch>ch) {
        //$LASTPOS=55000361;//kernel.UILayout:361
        calch=ch;
      }
      //$LASTPOS=55000376;//kernel.UILayout:376
      if (calcw>cw) {
        //$LASTPOS=55000390;//kernel.UILayout:390
        calcw=cw;
      }
      //$LASTPOS=55000405;//kernel.UILayout:405
      scl = 1;
      
      //$LASTPOS=55000421;//kernel.UILayout:421
      isPC = ! (Tonyu.globals.$Navigator.isTablet()||Tonyu.globals.$Navigator.isMobile());
      
      //$LASTPOS=55000486;//kernel.UILayout:486
      if (isPC&&_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=55000548;//kernel.UILayout:548
        calcw=width;
        //$LASTPOS=55000560;//kernel.UILayout:560
        calch=height;
        //$LASTPOS=55000583;//kernel.UILayout:583
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=55000624;//kernel.UILayout:624
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=55000668;//kernel.UILayout:668
      Tonyu.globals.$Screen.x=_this.trunc(cw/2)+width/2%1;
      //$LASTPOS=55000706;//kernel.UILayout:706
      Tonyu.globals.$Screen.y=_this.trunc(ch/2)+height/2%1;
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_UILayout_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=55000832;//kernel.UILayout:832
      larger = 100;
      
      //$LASTPOS=55000853;//kernel.UILayout:853
      smaller = 0;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_UILayout_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=55000832;//kernel.UILayout:832
      larger = 100;
      
      //$LASTPOS=55000853;//kernel.UILayout:853
      smaller = 0;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"doLayout":{"nowait":false},"shouldDraw1x1":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.WebPage',
  shortName: 'WebPage',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_WebPage_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56000080;//kernel.WebPage:80
      _this.eventWindowOpen=(function anonymous_98(e) {
        
        //$LASTPOS=56000110;//kernel.WebPage:110
        window.console.log("evtwinopen",_this.postUrl);
        //$LASTPOS=56000163;//kernel.WebPage:163
        window.open(_this.postUrl);
        //$LASTPOS=56000190;//kernel.WebPage:190
        if (_this.canvas.removeEventListener) {
          //$LASTPOS=56000233;//kernel.WebPage:233
          _this.canvas.removeEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=56000303;//kernel.WebPage:303
          _this.canvas.removeEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=56000376;//kernel.WebPage:376
          _this.listenerExists=false;
          
        } else {
          //$LASTPOS=56000412;//kernel.WebPage:412
          if (_this.canvas.detachEvent) {
            //$LASTPOS=56000446;//kernel.WebPage:446
            _this.canvas.detachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=56000503;//kernel.WebPage:503
            _this.canvas.detachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=56000561;//kernel.WebPage:561
            _this.listenerExists=false;
            
          }
        }
      });
    },
    fiber$main :function _trc_WebPage_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56000080;//kernel.WebPage:80
      _this.eventWindowOpen=(function anonymous_98(e) {
        
        //$LASTPOS=56000110;//kernel.WebPage:110
        window.console.log("evtwinopen",_this.postUrl);
        //$LASTPOS=56000163;//kernel.WebPage:163
        window.open(_this.postUrl);
        //$LASTPOS=56000190;//kernel.WebPage:190
        if (_this.canvas.removeEventListener) {
          //$LASTPOS=56000233;//kernel.WebPage:233
          _this.canvas.removeEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=56000303;//kernel.WebPage:303
          _this.canvas.removeEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=56000376;//kernel.WebPage:376
          _this.listenerExists=false;
          
        } else {
          //$LASTPOS=56000412;//kernel.WebPage:412
          if (_this.canvas.detachEvent) {
            //$LASTPOS=56000446;//kernel.WebPage:446
            _this.canvas.detachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=56000503;//kernel.WebPage:503
            _this.canvas.detachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=56000561;//kernel.WebPage:561
            _this.listenerExists=false;
            
          }
        }
      });
      
      _thread.retVal=_this;return;
    },
    openNewWindow :function _trc_WebPage_openNewWindow(url) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56000626;//kernel.WebPage:626
      _this.postUrl=url;
      //$LASTPOS=56000706;//kernel.WebPage:706
      _this.canvas=document.getElementsByTagName("canvas")[0];
      //$LASTPOS=56000762;//kernel.WebPage:762
      if (! _this.listenerExists) {
        //$LASTPOS=56000794;//kernel.WebPage:794
        if (_this.canvas.addEventListener) {
          //$LASTPOS=56000838;//kernel.WebPage:838
          _this.canvas.addEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=56000909;//kernel.WebPage:909
          _this.canvas.addEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=56001052;//kernel.WebPage:1052
          _this.listenerExists=true;
          
        } else {
          //$LASTPOS=56001091;//kernel.WebPage:1091
          if (_this.canvas.attachEvent) {
            //$LASTPOS=56001129;//kernel.WebPage:1129
            _this.canvas.attachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=56001190;//kernel.WebPage:1190
            _this.canvas.attachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=56001252;//kernel.WebPage:1252
            _this.listenerExists=true;
            
          }
        }
        
      }
    },
    fiber$openNewWindow :function _trc_WebPage_f_openNewWindow(_thread,url) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56000626;//kernel.WebPage:626
      _this.postUrl=url;
      //$LASTPOS=56000706;//kernel.WebPage:706
      _this.canvas=document.getElementsByTagName("canvas")[0];
      //$LASTPOS=56000762;//kernel.WebPage:762
      if (! _this.listenerExists) {
        //$LASTPOS=56000794;//kernel.WebPage:794
        if (_this.canvas.addEventListener) {
          //$LASTPOS=56000838;//kernel.WebPage:838
          _this.canvas.addEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=56000909;//kernel.WebPage:909
          _this.canvas.addEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=56001052;//kernel.WebPage:1052
          _this.listenerExists=true;
          
        } else {
          //$LASTPOS=56001091;//kernel.WebPage:1091
          if (_this.canvas.attachEvent) {
            //$LASTPOS=56001129;//kernel.WebPage:1129
            _this.canvas.attachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=56001190;//kernel.WebPage:1190
            _this.canvas.attachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=56001252;//kernel.WebPage:1252
            _this.listenerExists=true;
            
          }
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    openPage :function _trc_WebPage_openPage(url) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56001321;//kernel.WebPage:1321
      window.location.href=url;
    },
    fiber$openPage :function _trc_WebPage_f_openPage(_thread,url) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56001321;//kernel.WebPage:1321
      window.location.href=url;
      
      _thread.retVal=_this;return;
    },
    openTweet :function _trc_WebPage_openTweet(text) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56001379;//kernel.WebPage:1379
      _this.url="https://twitter.com/intent/tweet?text="+encodeURIComponent(text);
      //$LASTPOS=56001459;//kernel.WebPage:1459
      _this.openNewWindow(_this.url);
    },
    fiber$openTweet :function _trc_WebPage_f_openTweet(_thread,text) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56001379;//kernel.WebPage:1379
      _this.url="https://twitter.com/intent/tweet?text="+encodeURIComponent(text);
      
      _thread.enter(function _trc_WebPage_ent_openTweet(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=56001459;//kernel.WebPage:1459
            _this.fiber$openNewWindow(_thread, _this.url);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    openShareTweet :function _trc_WebPage_openShareTweet(url,text) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56001518;//kernel.WebPage:1518
      if (arguments.length<2) {
        //$LASTPOS=56001553;//kernel.WebPage:1553
        text=url;
        //$LASTPOS=56001562;//kernel.WebPage:1562
        url=null;
        
      }
      //$LASTPOS=56001584;//kernel.WebPage:1584
      if (url==null) {
        //$LASTPOS=56001612;//kernel.WebPage:1612
        url=window.location.href;
        
      }
      //$LASTPOS=56001652;//kernel.WebPage:1652
      _this.tempUrl="http://twitter.com/intent/tweet?"+"text="+encodeURIComponent(text)+"&"+"url="+encodeURIComponent(url);
      //$LASTPOS=56001787;//kernel.WebPage:1787
      _this.openNewWindow(_this.tempUrl);
    },
    fiber$openShareTweet :function _trc_WebPage_f_openShareTweet(_thread,url,text) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56001518;//kernel.WebPage:1518
      if (_arguments.length<2) {
        //$LASTPOS=56001553;//kernel.WebPage:1553
        text=url;
        //$LASTPOS=56001562;//kernel.WebPage:1562
        url=null;
        
      }
      //$LASTPOS=56001584;//kernel.WebPage:1584
      if (url==null) {
        //$LASTPOS=56001612;//kernel.WebPage:1612
        url=window.location.href;
        
      }
      //$LASTPOS=56001652;//kernel.WebPage:1652
      _this.tempUrl="http://twitter.com/intent/tweet?"+"text="+encodeURIComponent(text)+"&"+"url="+encodeURIComponent(url);
      
      _thread.enter(function _trc_WebPage_ent_openShareTweet(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=56001787;//kernel.WebPage:1787
            _this.fiber$openNewWindow(_thread, _this.tempUrl);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"openNewWindow":{"nowait":false},"openPage":{"nowait":false},"openTweet":{"nowait":false},"openShareTweet":{"nowait":false}},"fields":{"eventWindowOpen":{},"postUrl":{},"canvas":{},"listenerExists":{},"url":{},"tempUrl":{}}}
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
      
      //$LASTPOS=57000234;//kernel.Boot:234
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=57000247;//kernel.Boot:247
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=57000284;//kernel.Boot:284
      _this.initEvents();
      //$LASTPOS=57000299;//kernel.Boot:299
      _this.initLayers();
      //$LASTPOS=57000314;//kernel.Boot:314
      _this.initPeripherals();
      //$LASTPOS=57000334;//kernel.Boot:334
      _this.loadPlugins();
      //$LASTPOS=57000350;//kernel.Boot:350
      _this.loadImages();
      //$LASTPOS=57000365;//kernel.Boot:365
      _this.loadSounds();
      //$LASTPOS=57000380;//kernel.Boot:380
      _this.createMainObject();
      //$LASTPOS=57000401;//kernel.Boot:401
      _this.progress();
      //$LASTPOS=57000414;//kernel.Boot:414
      _this.mainLoop();
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000234;//kernel.Boot:234
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=57000247;//kernel.Boot:247
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000284;//kernel.Boot:284
            _this.fiber$initEvents(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57000299;//kernel.Boot:299
            _this.fiber$initLayers(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=57000314;//kernel.Boot:314
            _this.fiber$initPeripherals(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=57000334;//kernel.Boot:334
            _this.fiber$loadPlugins(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=57000350;//kernel.Boot:350
            _this.fiber$loadImages(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=57000365;//kernel.Boot:365
            _this.fiber$loadSounds(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=57000380;//kernel.Boot:380
            _this.fiber$createMainObject(_thread);
            __pc=7;return;
          case 7:
            
            //$LASTPOS=57000401;//kernel.Boot:401
            _this.fiber$progress(_thread);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=57000414;//kernel.Boot:414
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
      
      //$LASTPOS=57000448;//kernel.Boot:448
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57000484;//kernel.Boot:484
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
            //$LASTPOS=57000484;//kernel.Boot:484
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
      
      //$LASTPOS=57000589;//kernel.Boot:589
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
    },
    fiber$initEvents :function _trc_Boot_f_initEvents(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000589;//kernel.Boot:589
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
      
      _thread.retVal=_this;return;
    },
    initPeripherals :function _trc_Boot_initPeripherals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57000746;//kernel.Boot:746
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=57000781;//kernel.Boot:781
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=57000822;//kernel.Boot:822
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=57000855;//kernel.Boot:855
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=57000876;//kernel.Boot:876
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=57000897;//kernel.Boot:897
      Tonyu.globals.$Math=Math;
      //$LASTPOS=57000914;//kernel.Boot:914
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=57001028;//kernel.Boot:1028
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=57001056;//kernel.Boot:1056
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=57001200;//kernel.Boot:1200
      _this.initFPSParams();
      //$LASTPOS=57001222;//kernel.Boot:1222
      Tonyu.globals.$WebPage=new Tonyu.classes.kernel.WebPage;
      //$LASTPOS=57001249;//kernel.Boot:1249
      Tonyu.globals.$Navigator=new Tonyu.classes.kernel.Navigator;
      //$LASTPOS=57001280;//kernel.Boot:1280
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=57001305;//kernel.Boot:1305
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=57001330;//kernel.Boot:1330
      _this.debugCnt=50;
    },
    fiber$initPeripherals :function _trc_Boot_f_initPeripherals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000746;//kernel.Boot:746
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=57000781;//kernel.Boot:781
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=57000822;//kernel.Boot:822
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=57000855;//kernel.Boot:855
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=57000876;//kernel.Boot:876
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=57000897;//kernel.Boot:897
      Tonyu.globals.$Math=Math;
      //$LASTPOS=57000914;//kernel.Boot:914
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=57001028;//kernel.Boot:1028
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=57001056;//kernel.Boot:1056
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=57001200;//kernel.Boot:1200
      _this.initFPSParams();
      //$LASTPOS=57001222;//kernel.Boot:1222
      Tonyu.globals.$WebPage=new Tonyu.classes.kernel.WebPage;
      //$LASTPOS=57001249;//kernel.Boot:1249
      Tonyu.globals.$Navigator=new Tonyu.classes.kernel.Navigator;
      //$LASTPOS=57001280;//kernel.Boot:1280
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=57001305;//kernel.Boot:1305
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=57001330;//kernel.Boot:1330
      _this.debugCnt=50;
      
      _thread.retVal=_this;return;
    },
    initLayers :function _trc_Boot_initLayers() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57001368;//kernel.Boot:1368
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001408;//kernel.Boot:1408
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001454;//kernel.Boot:1454
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001485;//kernel.Boot:1485
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001514;//kernel.Boot:1514
      _this.cvj=$("canvas");
      //$LASTPOS=57001536;//kernel.Boot:1536
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=57001559;//kernel.Boot:1559
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=57001583;//kernel.Boot:1583
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=57001666;//kernel.Boot:1666
      Tonyu.globals.$Screen.on("resize",(function anonymous_1687() {
        
        //$LASTPOS=57001699;//kernel.Boot:1699
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=57001736;//kernel.Boot:1736
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=57001775;//kernel.Boot:1775
        if (Tonyu.globals.$panel) {
          //$LASTPOS=57001800;//kernel.Boot:1800
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=57001858;//kernel.Boot:1858
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=57001896;//kernel.Boot:1896
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=57001942;//kernel.Boot:1942
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=57001974;//kernel.Boot:1974
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=57002039;//kernel.Boot:2039
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=57002084;//kernel.Boot:2084
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=57002130;//kernel.Boot:2130
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=57002187;//kernel.Boot:2187
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=57002223;//kernel.Boot:2223
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=57002258;//kernel.Boot:2258
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=57002293;//kernel.Boot:2293
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=57002336;//kernel.Boot:2336
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=57002374;//kernel.Boot:2374
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57002405;//kernel.Boot:2405
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=57002472;//kernel.Boot:2472
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=57002507;//kernel.Boot:2507
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=57002542;//kernel.Boot:2542
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
    },
    fiber$initLayers :function _trc_Boot_f_initLayers(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57001368;//kernel.Boot:1368
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001408;//kernel.Boot:1408
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001454;//kernel.Boot:1454
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001485;//kernel.Boot:1485
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57001514;//kernel.Boot:1514
      _this.cvj=$("canvas");
      //$LASTPOS=57001536;//kernel.Boot:1536
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=57001559;//kernel.Boot:1559
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=57001583;//kernel.Boot:1583
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=57001666;//kernel.Boot:1666
      Tonyu.globals.$Screen.on("resize",(function anonymous_1687() {
        
        //$LASTPOS=57001699;//kernel.Boot:1699
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=57001736;//kernel.Boot:1736
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=57001775;//kernel.Boot:1775
        if (Tonyu.globals.$panel) {
          //$LASTPOS=57001800;//kernel.Boot:1800
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=57001858;//kernel.Boot:1858
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=57001896;//kernel.Boot:1896
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=57001942;//kernel.Boot:1942
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=57001974;//kernel.Boot:1974
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=57002039;//kernel.Boot:2039
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=57002084;//kernel.Boot:2084
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=57002130;//kernel.Boot:2130
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=57002187;//kernel.Boot:2187
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=57002223;//kernel.Boot:2223
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=57002258;//kernel.Boot:2258
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=57002293;//kernel.Boot:2293
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=57002336;//kernel.Boot:2336
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=57002374;//kernel.Boot:2374
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=57002405;//kernel.Boot:2405
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=57002472;//kernel.Boot:2472
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=57002507;//kernel.Boot:2507
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=57002542;//kernel.Boot:2542
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
      
      _thread.retVal=_this;return;
    },
    debug :function _trc_Boot_debug() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=57002627;//kernel.Boot:2627
      if (! _this.debugCnt) {
        return _this;
      }
      //$LASTPOS=57002655;//kernel.Boot:2655
      _this.debugCnt--;
      //$LASTPOS=57002672;//kernel.Boot:2672
      a = Array.prototype.slice.call(arguments);
      
      //$LASTPOS=57002722;//kernel.Boot:2722
      a.unshift(_this.debugCnt);
      //$LASTPOS=57002748;//kernel.Boot:2748
      a.unshift("DEBUG");
      //$LASTPOS=57002773;//kernel.Boot:2773
      console.log.apply(console,a);
    },
    fiber$debug :function _trc_Boot_f_debug(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=57002627;//kernel.Boot:2627
      if (! _this.debugCnt) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=57002655;//kernel.Boot:2655
      _this.debugCnt--;
      //$LASTPOS=57002672;//kernel.Boot:2672
      a = Array.prototype.slice.call(_arguments);
      
      //$LASTPOS=57002722;//kernel.Boot:2722
      a.unshift(_this.debugCnt);
      //$LASTPOS=57002748;//kernel.Boot:2748
      a.unshift("DEBUG");
      //$LASTPOS=57002773;//kernel.Boot:2773
      console.log.apply(console,a);
      
      _thread.retVal=_this;return;
    },
    loadPlugins :function _trc_Boot_loadPlugins() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57003114;//kernel.Boot:3114
      _this.progress("Loading plugins..");
      //$LASTPOS=57003150;//kernel.Boot:3150
      _this.runAsync((function anonymous_3159(r) {
        
        //$LASTPOS=57003175;//kernel.Boot:3175
        Tonyu.globals.$currentProject.loadPlugins(r);
      }));
      //$LASTPOS=57003220;//kernel.Boot:3220
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
            //$LASTPOS=57003114;//kernel.Boot:3114
            _this.fiber$progress(_thread, "Loading plugins..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57003150;//kernel.Boot:3150
            _this.fiber$runAsync(_thread, (function anonymous_3159(r) {
              
              //$LASTPOS=57003175;//kernel.Boot:3175
              Tonyu.globals.$currentProject.loadPlugins(r);
            }));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=57003220;//kernel.Boot:3220
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
      var _it_450;
      
      //$LASTPOS=57003279;//kernel.Boot:3279
      _this.progress("Loading pats..");
      //$LASTPOS=57003312;//kernel.Boot:3312
      rs = Tonyu.globals.$currentProject.getResource();
      
      
      //$LASTPOS=57003367;//kernel.Boot:3367
      r=_this.runAsync((function anonymous_3378(succ) {
        
        //$LASTPOS=57003397;//kernel.Boot:3397
        ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir(),prj: Tonyu.globals.$currentProject});
      }));
      //$LASTPOS=57003556;//kernel.Boot:3556
      Tonyu.globals.$imageList=r[0];
      //$LASTPOS=57003614;//kernel.Boot:3614
      _it_450=Tonyu.iterator(r[0].names,2);
      while(_it_450.next()) {
        name=_it_450[0];
        val=_it_450[1];
        
        //$LASTPOS=57003658;//kernel.Boot:3658
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=57003698;//kernel.Boot:3698
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
      var _it_450;
      
      
      _thread.enter(function _trc_Boot_ent_loadImages(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57003279;//kernel.Boot:3279
            _this.fiber$progress(_thread, "Loading pats..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57003312;//kernel.Boot:3312
            rs = Tonyu.globals.$currentProject.getResource();
            
            
            //$LASTPOS=57003367;//kernel.Boot:3367
            _this.fiber$runAsync(_thread, (function anonymous_3378(succ) {
              
              //$LASTPOS=57003397;//kernel.Boot:3397
              ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir(),prj: Tonyu.globals.$currentProject});
            }));
            __pc=2;return;
          case 2:
            r=_thread.retVal;
            
            //$LASTPOS=57003556;//kernel.Boot:3556
            Tonyu.globals.$imageList=r[0];
            //$LASTPOS=57003614;//kernel.Boot:3614
            _it_450=Tonyu.iterator(r[0].names,2);
            while(_it_450.next()) {
              name=_it_450[0];
              val=_it_450[1];
              
              //$LASTPOS=57003658;//kernel.Boot:3658
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=57003698;//kernel.Boot:3698
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
      
      //$LASTPOS=57003755;//kernel.Boot:3755
      _this.progress("Loading sounds...");
      //$LASTPOS=57003791;//kernel.Boot:3791
      _this.initT2MediaPlayer();
      //$LASTPOS=57003817;//kernel.Boot:3817
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=57003856;//kernel.Boot:3856
      _this.progress("Loading sounds done.");
      //$LASTPOS=57003895;//kernel.Boot:3895
      _this.on("stop",(function anonymous_3905() {
        
        //$LASTPOS=57003917;//kernel.Boot:3917
        _this.clearSEData();
      }));
      //$LASTPOS=57003945;//kernel.Boot:3945
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
            //$LASTPOS=57003755;//kernel.Boot:3755
            _this.fiber$progress(_thread, "Loading sounds...");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57003791;//kernel.Boot:3791
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=57003817;//kernel.Boot:3817
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=57003856;//kernel.Boot:3856
            _this.fiber$progress(_thread, "Loading sounds done.");
            __pc=4;return;
          case 4:
            
            //$LASTPOS=57003895;//kernel.Boot:3895
            _this.on("stop",(function anonymous_3905() {
              
              //$LASTPOS=57003917;//kernel.Boot:3917
              _this.clearSEData();
            }));
            //$LASTPOS=57003945;//kernel.Boot:3945
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
      
      //$LASTPOS=57003991;//kernel.Boot:3991
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=57004037;//kernel.Boot:4037
      mainClassName = o.run.mainClass;
      
      //$LASTPOS=57004077;//kernel.Boot:4077
      _this.progress("MainClass= "+mainClassName);
      //$LASTPOS=57004121;//kernel.Boot:4121
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=57004167;//kernel.Boot:4167
      if (! _this.mainClass) {
        throw new Error(mainClassName+" というクラスはありません");
        
        
      }
      //$LASTPOS=57004255;//kernel.Boot:4255
      Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
      //$LASTPOS=57004291;//kernel.Boot:4291
      new _this.mainClass();
    },
    fiber$createMainObject :function _trc_Boot_f_createMainObject(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=57003991;//kernel.Boot:3991
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=57004037;//kernel.Boot:4037
      mainClassName = o.run.mainClass;
      
      
      _thread.enter(function _trc_Boot_ent_createMainObject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57004077;//kernel.Boot:4077
            _this.fiber$progress(_thread, "MainClass= "+mainClassName);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57004121;//kernel.Boot:4121
            _this.mainClass=Tonyu.getClass(mainClassName);
            //$LASTPOS=57004167;//kernel.Boot:4167
            if (! _this.mainClass) {
              throw new Error(mainClassName+" というクラスはありません");
              
              
            }
            //$LASTPOS=57004255;//kernel.Boot:4255
            Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
            //$LASTPOS=57004291;//kernel.Boot:4291
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
      
      //$LASTPOS=57004339;//kernel.Boot:4339
      a = Tonyu.globals.$Screen.all();
      
      //$LASTPOS=57004365;//kernel.Boot:4365
      a=a.find((function anonymous_4374(e) {
        
        return ! Tonyu.globals.$excludeFromAll.contains(e);
      }));
      //$LASTPOS=57004426;//kernel.Boot:4426
      a.die();
      //$LASTPOS=57004440;//kernel.Boot:4440
      new page(arg);
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57004474;//kernel.Boot:4474
      _this.fireEvent("stop");
      //$LASTPOS=57004498;//kernel.Boot:4498
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57004474;//kernel.Boot:4474
      _this.fireEvent("stop");
      //$LASTPOS=57004498;//kernel.Boot:4498
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
      
      //$LASTPOS=57004557;//kernel.Boot:4557
      if (! method) {
        throw new Error("指定されたメソッドは定義されていません:"+method);
        
      }
      //$LASTPOS=57004623;//kernel.Boot:4623
      args=args||[];
      //$LASTPOS=57004643;//kernel.Boot:4643
      th = _this.scheduler.newThread(obj,method,args);
      
      //$LASTPOS=57004695;//kernel.Boot:4695
      obj.setThreadGroup(_this);
      //$LASTPOS=57004726;//kernel.Boot:4726
      th.setThreadGroup(obj);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=57004557;//kernel.Boot:4557
      if (! method) {
        throw new Error("指定されたメソッドは定義されていません:"+method);
        
      }
      //$LASTPOS=57004623;//kernel.Boot:4623
      args=args||[];
      //$LASTPOS=57004643;//kernel.Boot:4643
      th = _this.scheduler.newThread(obj,method,args);
      
      //$LASTPOS=57004695;//kernel.Boot:4695
      obj.setThreadGroup(_this);
      //$LASTPOS=57004726;//kernel.Boot:4726
      th.setThreadGroup(obj);
      _thread.retVal=th;return;
      
      
      _thread.retVal=_this;return;
    },
    progress :function _trc_Boot_progress(m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57004790;//kernel.Boot:4790
      if (typeof  SplashScreen=="undefined") {
        return _this;
      }
      //$LASTPOS=57004841;//kernel.Boot:4841
      if (m) {
        //$LASTPOS=57004859;//kernel.Boot:4859
        console.log.apply(console,arguments);
        //$LASTPOS=57004906;//kernel.Boot:4906
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=57004944;//kernel.Boot:4944
        SplashScreen.hide();
      }
    },
    fiber$progress :function _trc_Boot_f_progress(_thread,m) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57004790;//kernel.Boot:4790
      if (typeof  SplashScreen=="undefined") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=57004841;//kernel.Boot:4841
      if (m) {
        //$LASTPOS=57004859;//kernel.Boot:4859
        console.log.apply(console,_arguments);
        //$LASTPOS=57004906;//kernel.Boot:4906
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=57004944;//kernel.Boot:4944
        SplashScreen.hide();
      }
      
      _thread.retVal=_this;return;
    },
    mainLoop :function _trc_Boot_mainLoop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57004990;//kernel.Boot:4990
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=57005010;//kernel.Boot:5010
      Tonyu.globals.$drawnFrameCount=0;
      //$LASTPOS=57005035;//kernel.Boot:5035
      while (true) {
        //$LASTPOS=57005056;//kernel.Boot:5056
        if (_this._useRAF) {
          //$LASTPOS=57005069;//kernel.Boot:5069
          _this.loopRAF();
        } else {
          //$LASTPOS=57005091;//kernel.Boot:5091
          _this.loopTimer();
        }
        //$LASTPOS=57005113;//kernel.Boot:5113
        _this.measureFps();
        //$LASTPOS=57005133;//kernel.Boot:5133
        _this.handlePause();
        //$LASTPOS=57005157;//kernel.Boot:5157
        Tonyu.globals.$drawnFrameCount++;
        
      }
    },
    fiber$mainLoop :function _trc_Boot_f_mainLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57004990;//kernel.Boot:4990
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=57005010;//kernel.Boot:5010
      Tonyu.globals.$drawnFrameCount=0;
      
      _thread.enter(function _trc_Boot_ent_mainLoop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57005035;//kernel.Boot:5035
          case 1:
            //$LASTPOS=57005056;//kernel.Boot:5056
            if (!(_this._useRAF)) { __pc=3     ; break; }
            //$LASTPOS=57005069;//kernel.Boot:5069
            _this.fiber$loopRAF(_thread);
            __pc=2;return;
          case 2:
            
            __pc=5     ;break;
          case 3     :
            //$LASTPOS=57005091;//kernel.Boot:5091
            _this.fiber$loopTimer(_thread);
            __pc=4;return;
          case 4:
            
          case 5     :
            
            //$LASTPOS=57005113;//kernel.Boot:5113
            _this.measureFps();
            //$LASTPOS=57005133;//kernel.Boot:5133
            _this.fiber$handlePause(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=57005157;//kernel.Boot:5157
            Tonyu.globals.$drawnFrameCount++;
            __pc=1;break;
          case 7     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopRAF :function _trc_Boot_loopRAF() {
      "use strict";
      var _this=this;
      var nowTime;
      var frameTime;
      var moves;
      var bufferTime;
      
      //$LASTPOS=57005206;//kernel.Boot:5206
      nowTime = _this.now();
      
      //$LASTPOS=57005247;//kernel.Boot:5247
      frameTime = 1000/_this._fps;
      
      //$LASTPOS=57005291;//kernel.Boot:5291
      moves = 0;
      
      
      //$LASTPOS=57005370;//kernel.Boot:5370
      _this.subTime=_this.trunc(nowTime-_this.rafProcNowTime);
      //$LASTPOS=57005418;//kernel.Boot:5418
      _this.procCnt=_this.subTime/frameTime;
      //$LASTPOS=57005470;//kernel.Boot:5470
      bufferTime=(0.5*_this._fps/60);
      //$LASTPOS=57005563;//kernel.Boot:5563
      if (_this.procCnt>=1-bufferTime&&_this.procCnt<=1+bufferTime) {
        //$LASTPOS=57005623;//kernel.Boot:5623
        _this.procCnt=1;
      }
      //$LASTPOS=57005643;//kernel.Boot:5643
      _this.procCnt=_this.floor(_this.procCnt);
      //$LASTPOS=57005674;//kernel.Boot:5674
      if (_this.procCnt>_this.maxFrameSkip) {
        //$LASTPOS=57005713;//kernel.Boot:5713
        _this.procCnt=_this.maxFrameSkip;
        //$LASTPOS=57005746;//kernel.Boot:5746
        _this.rafProcNowTime=nowTime;
        
      } else {
        //$LASTPOS=57005795;//kernel.Boot:5795
        _this.rafProcNowTime+=_this.procCnt*frameTime;
        
      }
      //$LASTPOS=57005892;//kernel.Boot:5892
      while (moves<_this.procCnt) {
        //$LASTPOS=57005918;//kernel.Boot:5918
        _this.moveFrame();
        //$LASTPOS=57005934;//kernel.Boot:5934
        moves++;
        //$LASTPOS=57005949;//kernel.Boot:5949
        if (moves<_this.procCnt) {
          //$LASTPOS=57005968;//kernel.Boot:5968
          _this.afterDraw(false);
        }
        
      }
      //$LASTPOS=57006021;//kernel.Boot:6021
      if (moves>0) {
        //$LASTPOS=57006047;//kernel.Boot:6047
        _this.drawFrame();
        //$LASTPOS=57006069;//kernel.Boot:6069
        _this.afterDraw(true);
        
      }
      //$LASTPOS=57006126;//kernel.Boot:6126
      _this.waitRAF();
    },
    fiber$loopRAF :function _trc_Boot_f_loopRAF(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var nowTime;
      var frameTime;
      var moves;
      var bufferTime;
      
      //$LASTPOS=57005206;//kernel.Boot:5206
      nowTime = _this.now();
      
      //$LASTPOS=57005247;//kernel.Boot:5247
      frameTime = 1000/_this._fps;
      
      //$LASTPOS=57005291;//kernel.Boot:5291
      moves = 0;
      
      
      //$LASTPOS=57005370;//kernel.Boot:5370
      _this.subTime=_this.trunc(nowTime-_this.rafProcNowTime);
      //$LASTPOS=57005418;//kernel.Boot:5418
      _this.procCnt=_this.subTime/frameTime;
      //$LASTPOS=57005470;//kernel.Boot:5470
      bufferTime=(0.5*_this._fps/60);
      //$LASTPOS=57005563;//kernel.Boot:5563
      if (_this.procCnt>=1-bufferTime&&_this.procCnt<=1+bufferTime) {
        //$LASTPOS=57005623;//kernel.Boot:5623
        _this.procCnt=1;
      }
      //$LASTPOS=57005643;//kernel.Boot:5643
      _this.procCnt=_this.floor(_this.procCnt);
      //$LASTPOS=57005674;//kernel.Boot:5674
      if (_this.procCnt>_this.maxFrameSkip) {
        //$LASTPOS=57005713;//kernel.Boot:5713
        _this.procCnt=_this.maxFrameSkip;
        //$LASTPOS=57005746;//kernel.Boot:5746
        _this.rafProcNowTime=nowTime;
        
      } else {
        //$LASTPOS=57005795;//kernel.Boot:5795
        _this.rafProcNowTime+=_this.procCnt*frameTime;
        
      }
      
      _thread.enter(function _trc_Boot_ent_loopRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57005892;//kernel.Boot:5892
          case 1:
            if (!(moves<_this.procCnt)) { __pc=2     ; break; }
            {
              //$LASTPOS=57005918;//kernel.Boot:5918
              _this.moveFrame();
              //$LASTPOS=57005934;//kernel.Boot:5934
              moves++;
              //$LASTPOS=57005949;//kernel.Boot:5949
              if (moves<_this.procCnt) {
                //$LASTPOS=57005968;//kernel.Boot:5968
                _this.afterDraw(false);
              }
            }
            __pc=1;break;
          case 2     :
            
            //$LASTPOS=57006021;//kernel.Boot:6021
            if (moves>0) {
              //$LASTPOS=57006047;//kernel.Boot:6047
              _this.drawFrame();
              //$LASTPOS=57006069;//kernel.Boot:6069
              _this.afterDraw(true);
              
            }
            //$LASTPOS=57006126;//kernel.Boot:6126
            _this.fiber$waitRAF(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    waitRAF :function _trc_Boot_waitRAF() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57006565;//kernel.Boot:6565
      _this.waitFor(Tonyu.animationFrame());
    },
    fiber$waitRAF :function _trc_Boot_f_waitRAF(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_waitRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57006565;//kernel.Boot:6565
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopTimer :function _trc_Boot_loopTimer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57007511;//kernel.Boot:7511
      _this.moveFrame();
      //$LASTPOS=57007529;//kernel.Boot:7529
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=57007557;//kernel.Boot:7557
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=57007611;//kernel.Boot:7611
        _this.doDraw=true;
        //$LASTPOS=57007633;//kernel.Boot:7633
        _this.resetDeadLine();
        
      }
      //$LASTPOS=57007662;//kernel.Boot:7662
      if (_this.doDraw) {
        //$LASTPOS=57007699;//kernel.Boot:7699
        _this.drawFrame();
        //$LASTPOS=57007721;//kernel.Boot:7721
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=57007760;//kernel.Boot:7760
        _this.frameSkipped++;
        
      }
      //$LASTPOS=57007788;//kernel.Boot:7788
      _this.afterDraw(_this.doDraw);
      //$LASTPOS=57007812;//kernel.Boot:7812
      _this.waitFrame();
    },
    fiber$loopTimer :function _trc_Boot_f_loopTimer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57007511;//kernel.Boot:7511
      _this.moveFrame();
      //$LASTPOS=57007529;//kernel.Boot:7529
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=57007557;//kernel.Boot:7557
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=57007611;//kernel.Boot:7611
        _this.doDraw=true;
        //$LASTPOS=57007633;//kernel.Boot:7633
        _this.resetDeadLine();
        
      }
      //$LASTPOS=57007662;//kernel.Boot:7662
      if (_this.doDraw) {
        //$LASTPOS=57007699;//kernel.Boot:7699
        _this.drawFrame();
        //$LASTPOS=57007721;//kernel.Boot:7721
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=57007760;//kernel.Boot:7760
        _this.frameSkipped++;
        
      }
      //$LASTPOS=57007788;//kernel.Boot:7788
      _this.afterDraw(_this.doDraw);
      
      _thread.enter(function _trc_Boot_ent_loopTimer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57007812;//kernel.Boot:7812
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
      
      //$LASTPOS=57007860;//kernel.Boot:7860
      while (_this.paused) {
        //$LASTPOS=57007885;//kernel.Boot:7885
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=57007921;//kernel.Boot:7921
        if (! _this.paused) {
          //$LASTPOS=57007934;//kernel.Boot:7934
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
            //$LASTPOS=57007860;//kernel.Boot:7860
          case 1:
            if (!(_this.paused)) { __pc=3     ; break; }
            //$LASTPOS=57007885;//kernel.Boot:7885
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=57007921;//kernel.Boot:7921
            if (! _this.paused) {
              //$LASTPOS=57007934;//kernel.Boot:7934
              _this.resetDeadLine();
            }
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    drawFrame :function _trc_Boot_drawFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=57007989;//kernel.Boot:7989
      s = _this.now();
      
      //$LASTPOS=57008007;//kernel.Boot:8007
      Tonyu.globals.$uiScreen.drawLayers();
      //$LASTPOS=57008036;//kernel.Boot:8036
      _this.drawTime=_this.now()-s;
      //$LASTPOS=57008059;//kernel.Boot:8059
      _this.fps_fpsCnt++;
    },
    moveFrame :function _trc_Boot_moveFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=57008388;//kernel.Boot:8388
      s = _this.now();
      
      //$LASTPOS=57008435;//kernel.Boot:8435
      _this.scheduler.stepsAll();
      //$LASTPOS=57008491;//kernel.Boot:8491
      Tonyu.globals.$Keys.update();
      //$LASTPOS=57008541;//kernel.Boot:8541
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=57008598;//kernel.Boot:8598
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=57008631;//kernel.Boot:8631
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=57008666;//kernel.Boot:8666
      _this.moveTime=_this.now()-s;
      //$LASTPOS=57008689;//kernel.Boot:8689
      _this.fps_rpsCnt++;
      //$LASTPOS=57008709;//kernel.Boot:8709
      Tonyu.globals.$frameCount=_this.fps_rpsCnt;
    },
    afterDraw :function _trc_Boot_afterDraw(drawn) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57008850;//kernel.Boot:8850
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=57008905;//kernel.Boot:8905
      Tonyu.globals.$Sprites.removeOneframes(drawn);
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57009021;//kernel.Boot:9021
      _this._fps=30;
      //$LASTPOS=57009037;//kernel.Boot:9037
      _this.maxFrameSkip=5;
      //$LASTPOS=57009060;//kernel.Boot:9060
      _this.minFrameSkip=1;
      //$LASTPOS=57009110;//kernel.Boot:9110
      _this.frameCnt=0;
      //$LASTPOS=57009129;//kernel.Boot:9129
      _this.resetDeadLine();
      //$LASTPOS=57009151;//kernel.Boot:9151
      _this.lastMeasured=_this.now();
      //$LASTPOS=57009176;//kernel.Boot:9176
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
      //$LASTPOS=57009222;//kernel.Boot:9222
      _this.drawTime=5;
      //$LASTPOS=57009233;//kernel.Boot:9233
      _this.moveTime=5;
      //$LASTPOS=57009291;//kernel.Boot:9291
      _this._useRAF=true;
      //$LASTPOS=57009345;//kernel.Boot:9345
      _this.rafProcNowTime=_this.now();
    },
    now :function _trc_Boot_now() {
      "use strict";
      var _this=this;
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot_resetDeadLine() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57009456;//kernel.Boot:9456
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=57009487;//kernel.Boot:9487
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      "use strict";
      var _this=this;
      var wt;
      
      //$LASTPOS=57009531;//kernel.Boot:9531
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=57009559;//kernel.Boot:9559
      if (wt<1) {
        //$LASTPOS=57009580;//kernel.Boot:9580
        if (wt<- 1000) {
          //$LASTPOS=57009594;//kernel.Boot:9594
          _this.resetDeadLine();
        }
        //$LASTPOS=57009620;//kernel.Boot:9620
        wt=1;
        
      }
      //$LASTPOS=57009638;//kernel.Boot:9638
      wt=_this.floor(wt);
      //$LASTPOS=57009657;//kernel.Boot:9657
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=57009690;//kernel.Boot:9690
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=57009531;//kernel.Boot:9531
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=57009559;//kernel.Boot:9559
      if (wt<1) {
        //$LASTPOS=57009580;//kernel.Boot:9580
        if (wt<- 1000) {
          //$LASTPOS=57009594;//kernel.Boot:9594
          _this.resetDeadLine();
        }
        //$LASTPOS=57009620;//kernel.Boot:9620
        wt=1;
        
      }
      //$LASTPOS=57009638;//kernel.Boot:9638
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57009657;//kernel.Boot:9657
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57009690;//kernel.Boot:9690
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
      
      //$LASTPOS=57009974;//kernel.Boot:9974
      _this._fps=fps;
      //$LASTPOS=57009991;//kernel.Boot:9991
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=57010026;//kernel.Boot:10026
        maxFrameSkip=5;
      }
      //$LASTPOS=57010047;//kernel.Boot:10047
      if (maxFrameSkip<=0) {
        //$LASTPOS=57010068;//kernel.Boot:10068
        maxFrameSkip=1;
      }
      //$LASTPOS=57010089;//kernel.Boot:10089
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=57010128;//kernel.Boot:10128
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
      
      //$LASTPOS=57010232;//kernel.Boot:10232
      if (v) {
        //$LASTPOS=57010250;//kernel.Boot:10250
        _this.rafProcNowTime=_this.now();
        
      } else {
        //$LASTPOS=57010295;//kernel.Boot:10295
        _this.resetDeadLine();
        
      }
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
      var nowTime;
      
      //$LASTPOS=57010533;//kernel.Boot:10533
      nowTime = _this.now();
      
      //$LASTPOS=57010559;//kernel.Boot:10559
      if (nowTime>=_this.lastMeasured+1000) {
        //$LASTPOS=57010602;//kernel.Boot:10602
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=57010631;//kernel.Boot:10631
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=57010660;//kernel.Boot:10660
        _this.fps_fpsCnt=0;
        //$LASTPOS=57010683;//kernel.Boot:10683
        _this.fps_rpsCnt=0;
        //$LASTPOS=57010706;//kernel.Boot:10706
        _this.lastMeasured=nowTime;
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"initEvents":{"nowait":false},"initPeripherals":{"nowait":false},"initLayers":{"nowait":false},"debug":{"nowait":false},"loadPlugins":{"nowait":false},"loadImages":{"nowait":false},"loadSounds":{"nowait":false},"createMainObject":{"nowait":false},"loadPage":{"nowait":true},"stop":{"nowait":false},"hide":{"nowait":true},"schedule":{"nowait":false},"progress":{"nowait":false},"mainLoop":{"nowait":false},"loopRAF":{"nowait":false},"waitRAF":{"nowait":false},"loopTimer":{"nowait":false},"handlePause":{"nowait":false},"drawFrame":{"nowait":true},"moveFrame":{"nowait":true},"afterDraw":{"nowait":true},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"__getter__useRAF":{"nowait":true},"__setter__useRAF":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}},"fields":{"scheduler":{},"eventTypes":{},"cvj":{},"debugCnt":{},"mainClass":{},"_useRAF":{},"_fps":{},"subTime":{},"rafProcNowTime":{},"procCnt":{},"maxFrameSkip":{},"doDraw":{},"deadLine":{},"frameSkipped":{},"paused":{},"drawTime":{},"fps_fpsCnt":{},"moveTime":{},"fps_rpsCnt":{},"minFrameSkip":{},"frameCnt":{},"lastMeasured":{},"fps_fps":{},"fps_rps":{}}}
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
      
      //$LASTPOS=58000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=58000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=58000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=58000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=58000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=58000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=58000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=58000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=58000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=58000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=58000212;//kernel.DxChar:212
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=58000243;//kernel.DxChar:243
      _this.onDraw();
      //$LASTPOS=58000258;//kernel.DxChar:258
      _this.detectShape();
      //$LASTPOS=58000278;//kernel.DxChar:278
      _this.drawDxSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder,_this.angle,_this.alpha,_this.scaleX,_this.scaleY);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"angle":{}}}
});

//# sourceMappingURL=concat.js.map