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
      var r;
      
      //$LASTPOS=2002006;//kernel.EventMod:2006
      if (null) {
        //$LASTPOS=2002030;//kernel.EventMod:2030
        r = null.waitFor(f);
        
        return r;
        
      }
      return f;
    },
    fiber$waitFor :function _trc_EventMod_f_waitFor(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      //$LASTPOS=2002006;//kernel.EventMod:2006
      if (_thread) {
        //$LASTPOS=2002030;//kernel.EventMod:2030
        r = _thread.waitFor(f);
        
        _thread.retVal=r;return;
        
        
      }
      _thread.retVal=f;return;
      
      
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
      
      return {index: i,px: 0,py: 0,x: 0,y: 0,vx: 0,vy: 0,touched: 0,identifier: - 1,ended: false,layer: _this.defaultLayer};
    },
    fiber$newTouch :function _trc_InputDevice_f_newTouch(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal={index: i,px: 0,py: 0,x: 0,y: 0,vx: 0,vy: 0,touched: 0,identifier: - 1,ended: false,layer: _this.defaultLayer};return;
      
      
      _thread.retVal=_this;return;
    },
    changeTouchLayer :function _trc_InputDevice_changeTouchLayer(t,toLayer) {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=7000478;//kernel.InputDevice:478
      p = Tonyu.globals.$Screen.convert(t,toLayer);
      
      //$LASTPOS=7000517;//kernel.InputDevice:517
      t.x=p.x;
      //$LASTPOS=7000531;//kernel.InputDevice:531
      t.y=p.y;
      //$LASTPOS=7000545;//kernel.InputDevice:545
      t.layer=p.layer;
      //$LASTPOS=7000567;//kernel.InputDevice:567
      t.px=t.x;
      //$LASTPOS=7000582;//kernel.InputDevice:582
      t.py=t.y;
      //$LASTPOS=7000597;//kernel.InputDevice:597
      t.vx=t.vy=0;
    },
    fiber$changeTouchLayer :function _trc_InputDevice_f_changeTouchLayer(_thread,t,toLayer) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      //$LASTPOS=7000478;//kernel.InputDevice:478
      p = Tonyu.globals.$Screen.convert(t,toLayer);
      
      //$LASTPOS=7000517;//kernel.InputDevice:517
      t.x=p.x;
      //$LASTPOS=7000531;//kernel.InputDevice:531
      t.y=p.y;
      //$LASTPOS=7000545;//kernel.InputDevice:545
      t.layer=p.layer;
      //$LASTPOS=7000567;//kernel.InputDevice:567
      t.px=t.x;
      //$LASTPOS=7000582;//kernel.InputDevice:582
      t.py=t.y;
      //$LASTPOS=7000597;//kernel.InputDevice:597
      t.vx=t.vy=0;
      
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
      
      //$LASTPOS=7000644;//kernel.InputDevice:644
      cv = cvj[0];
      
      //$LASTPOS=7000664;//kernel.InputDevice:664
      ID_MOUSE = 31238612;
      
      //$LASTPOS=7000692;//kernel.InputDevice:692
      Tonyu.globals.$handleMouseDown=(function anonymous_709(e) {
        var p;
        var mp;
        
        //$LASTPOS=7000725;//kernel.InputDevice:725
        Tonyu.resetLoopCheck();
        //$LASTPOS=7000758;//kernel.InputDevice:758
        p = cvj.offset();
        
        //$LASTPOS=7000787;//kernel.InputDevice:787
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7000864;//kernel.InputDevice:864
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7000936;//kernel.InputDevice:936
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7000959;//kernel.InputDevice:959
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7000982;//kernel.InputDevice:982
        _this.isMouseDown=true;
        //$LASTPOS=7001009;//kernel.InputDevice:1009
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7001051;//kernel.InputDevice:1051
          Tonyu.globals.$handleTouchStart({preventDefault: (function anonymous_1103() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
        //$LASTPOS=7001418;//kernel.InputDevice:1418
        _this.handleListeners();
      });
      //$LASTPOS=7001450;//kernel.InputDevice:1450
      Tonyu.globals.$handleMouseMove=(function anonymous_1467(e) {
        var p;
        var mp;
        
        //$LASTPOS=7001483;//kernel.InputDevice:1483
        Tonyu.resetLoopCheck();
        //$LASTPOS=7001516;//kernel.InputDevice:1516
        p = cvj.offset();
        
        //$LASTPOS=7001545;//kernel.InputDevice:1545
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7001622;//kernel.InputDevice:1622
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7001694;//kernel.InputDevice:1694
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7001717;//kernel.InputDevice:1717
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7001740;//kernel.InputDevice:1740
        if (_this.isMouseDown&&Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7001797;//kernel.InputDevice:1797
          Tonyu.globals.$handleTouchMove({preventDefault: (function anonymous_1848() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
        //$LASTPOS=7002163;//kernel.InputDevice:2163
        _this.handleListeners();
      });
      //$LASTPOS=7002250;//kernel.InputDevice:2250
      Tonyu.globals.$handleMouseUp=(function anonymous_2265(e) {
        
        //$LASTPOS=7002281;//kernel.InputDevice:2281
        Tonyu.resetLoopCheck();
        //$LASTPOS=7002314;//kernel.InputDevice:2314
        _this.isMouseDown=false;
        //$LASTPOS=7002342;//kernel.InputDevice:2342
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7002384;//kernel.InputDevice:2384
          Tonyu.globals.$handleTouchEnd({preventDefault: (function anonymous_2434() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
      });
      //$LASTPOS=7002753;//kernel.InputDevice:2753
      Tonyu.globals.$touches=[];
      //$LASTPOS=7002771;//kernel.InputDevice:2771
      //$LASTPOS=7002776;//kernel.InputDevice:2776
      i = 0;
      for (; i<5 ; i++) {
        //$LASTPOS=7002792;//kernel.InputDevice:2792
        Tonyu.globals.$touches.push(_this.newTouch(i));
      }
      //$LASTPOS=7002825;//kernel.InputDevice:2825
      Tonyu.globals.$touches.findById=(function anonymous_2843(id) {
        var j;
        
        //$LASTPOS=7002860;//kernel.InputDevice:2860
        //$LASTPOS=7002865;//kernel.InputDevice:2865
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7002915;//kernel.InputDevice:2915
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7003025;//kernel.InputDevice:3025
      Tonyu.globals.$touches.findWithin=(function anonymous_3045(o,d) {
        var j;
        
        //$LASTPOS=7003071;//kernel.InputDevice:3071
        //$LASTPOS=7003076;//kernel.InputDevice:3076
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7003126;//kernel.InputDevice:3126
            if (o.within(Tonyu.globals.$touches[j],d)) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7003233;//kernel.InputDevice:3233
      Tonyu.globals.$handleTouchStart=(function anonymous_3251(e) {
        var p;
        var ts;
        var dst;
        var i;
        var src;
        var j;
        
        //$LASTPOS=7003267;//kernel.InputDevice:3267
        Tonyu.resetLoopCheck();
        //$LASTPOS=7003300;//kernel.InputDevice:3300
        Tonyu.globals.$t2MediaLib.activate();
        //$LASTPOS=7003333;//kernel.InputDevice:3333
        p = cvj.offset();
        
        //$LASTPOS=7003362;//kernel.InputDevice:3362
        e.preventDefault();
        //$LASTPOS=7003391;//kernel.InputDevice:3391
        ts = e.originalEvent.changedTouches;
        
        
        //$LASTPOS=7003457;//kernel.InputDevice:3457
        //$LASTPOS=7003462;//kernel.InputDevice:3462
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7003507;//kernel.InputDevice:3507
            src = ts[i];
            
            //$LASTPOS=7003535;//kernel.InputDevice:3535
            //$LASTPOS=7003540;//kernel.InputDevice:3540
            j = 0;
            for (; j<Tonyu.globals.$touches.length ; j++) {
              {
                //$LASTPOS=7003594;//kernel.InputDevice:3594
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=7003643;//kernel.InputDevice:3643
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=7003681;//kernel.InputDevice:3681
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
            }
            //$LASTPOS=7003787;//kernel.InputDevice:3787
            if (dst) {
              //$LASTPOS=7003815;//kernel.InputDevice:3815
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7003896;//kernel.InputDevice:3896
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
              //$LASTPOS=7003975;//kernel.InputDevice:3975
              dst.px=dst.x=_this.mp.x;
              //$LASTPOS=7004011;//kernel.InputDevice:4011
              dst.py=dst.y=_this.mp.y;
              //$LASTPOS=7004047;//kernel.InputDevice:4047
              dst.layer=_this.mp.layer;
              //$LASTPOS=7004084;//kernel.InputDevice:4084
              dst.touched=1;
              
            }
          }
        }
        //$LASTPOS=7004134;//kernel.InputDevice:4134
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7004166;//kernel.InputDevice:4166
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7004198;//kernel.InputDevice:4198
        _this.handleListeners();
      });
      //$LASTPOS=7004230;//kernel.InputDevice:4230
      Tonyu.globals.$handleTouchMove=(function anonymous_4247(e) {
        var p;
        var ts;
        var dst;
        var i;
        var src;
        
        //$LASTPOS=7004263;//kernel.InputDevice:4263
        Tonyu.resetLoopCheck();
        //$LASTPOS=7004296;//kernel.InputDevice:4296
        Tonyu.globals.$t2MediaLib.activate();
        //$LASTPOS=7004329;//kernel.InputDevice:4329
        p = cvj.offset();
        
        //$LASTPOS=7004358;//kernel.InputDevice:4358
        e.preventDefault();
        //$LASTPOS=7004387;//kernel.InputDevice:4387
        ts = e.originalEvent.changedTouches;
        
        
        //$LASTPOS=7004453;//kernel.InputDevice:4453
        //$LASTPOS=7004458;//kernel.InputDevice:4458
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7004503;//kernel.InputDevice:4503
            src = ts[i];
            
            //$LASTPOS=7004531;//kernel.InputDevice:4531
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7004587;//kernel.InputDevice:4587
            if (dst) {
              //$LASTPOS=7004615;//kernel.InputDevice:4615
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7004696;//kernel.InputDevice:4696
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,dst.layer||_this.defaultLayer);
              //$LASTPOS=7004786;//kernel.InputDevice:4786
              dst.x=_this.mp.x;
              //$LASTPOS=7004815;//kernel.InputDevice:4815
              dst.y=_this.mp.y;
              //$LASTPOS=7004844;//kernel.InputDevice:4844
              dst.layer=_this.mp.layer;
              
            }
          }
        }
        //$LASTPOS=7004899;//kernel.InputDevice:4899
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7004931;//kernel.InputDevice:4931
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7004963;//kernel.InputDevice:4963
        _this.handleListeners();
      });
      //$LASTPOS=7004995;//kernel.InputDevice:4995
      Tonyu.globals.$handleTouchEnd=(function anonymous_5011(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=7005027;//kernel.InputDevice:5027
        Tonyu.resetLoopCheck();
        //$LASTPOS=7005060;//kernel.InputDevice:5060
        Tonyu.globals.$t2MediaLib.activate();
        //$LASTPOS=7005093;//kernel.InputDevice:5093
        ts = e.originalEvent.changedTouches;
        
        //$LASTPOS=7005141;//kernel.InputDevice:5141
        //$LASTPOS=7005146;//kernel.InputDevice:5146
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7005191;//kernel.InputDevice:5191
            src = ts[i];
            
            //$LASTPOS=7005219;//kernel.InputDevice:5219
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7005275;//kernel.InputDevice:5275
            if (dst) {
              //$LASTPOS=7005303;//kernel.InputDevice:5303
              Tonyu.globals.$touches[dst.index]=Tonyu.globals.$InputDevice.newTouch(dst.index);
              //$LASTPOS=7005374;//kernel.InputDevice:5374
              Tonyu.globals.$touches[dst.index].x=dst.x;
              //$LASTPOS=7005420;//kernel.InputDevice:5420
              Tonyu.globals.$touches[dst.index].y=dst.y;
              //$LASTPOS=7005466;//kernel.InputDevice:5466
              Tonyu.globals.$touches[dst.index].layer=_this.defaultLayer;
              //$LASTPOS=7005523;//kernel.InputDevice:5523
              dst.ended=true;
              
            }
          }
        }
        //$LASTPOS=7005680;//kernel.InputDevice:5680
        _this.handleListeners();
      });
      //$LASTPOS=7005712;//kernel.InputDevice:5712
      Tonyu.globals.$unsetTouchEmu=(function anonymous_5727() {
        var i;
        var t;
        var _it_69;
        
        //$LASTPOS=7005742;//kernel.InputDevice:5742
        Tonyu.resetLoopCheck();
        //$LASTPOS=7005775;//kernel.InputDevice:5775
        Tonyu.globals.$InputDevice.touchEmu=false;
        //$LASTPOS=7005813;//kernel.InputDevice:5813
        _it_69=Tonyu.iterator(Tonyu.globals.$touches,2);
        while(_it_69.next()) {
          i=_it_69[0];
          t=_it_69[1];
          
          //$LASTPOS=7005854;//kernel.InputDevice:5854
          if (t.identifier==ID_MOUSE) {
            //$LASTPOS=7005901;//kernel.InputDevice:5901
            t[i]=Tonyu.globals.$InputDevice.newTouch(i);
            
          }
          
        }
      });
      //$LASTPOS=7005971;//kernel.InputDevice:5971
      handleMouseDown = (function anonymous_5991(e) {
        
        //$LASTPOS=7005996;//kernel.InputDevice:5996
        Tonyu.globals.$handleMouseDown(e);
      });
      
      //$LASTPOS=7006024;//kernel.InputDevice:6024
      handleMouseMove = (function anonymous_6044(e) {
        
        //$LASTPOS=7006049;//kernel.InputDevice:6049
        Tonyu.globals.$handleMouseMove(e);
      });
      
      //$LASTPOS=7006077;//kernel.InputDevice:6077
      handleMouseUp = (function anonymous_6095(e) {
        
        //$LASTPOS=7006100;//kernel.InputDevice:6100
        Tonyu.globals.$handleMouseUp(e);
      });
      
      //$LASTPOS=7006126;//kernel.InputDevice:6126
      handleTouchStart = (function anonymous_6147(e) {
        
        //$LASTPOS=7006152;//kernel.InputDevice:6152
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7006169;//kernel.InputDevice:6169
        Tonyu.globals.$handleTouchStart(e);
      });
      
      //$LASTPOS=7006198;//kernel.InputDevice:6198
      handleTouchMove = (function anonymous_6218(e) {
        
        //$LASTPOS=7006223;//kernel.InputDevice:6223
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7006240;//kernel.InputDevice:6240
        Tonyu.globals.$handleTouchMove(e);
      });
      
      //$LASTPOS=7006268;//kernel.InputDevice:6268
      handleTouchEnd = (function anonymous_6287(e) {
        
        //$LASTPOS=7006292;//kernel.InputDevice:6292
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7006309;//kernel.InputDevice:6309
        Tonyu.globals.$handleTouchEnd(e);
      });
      
      //$LASTPOS=7006336;//kernel.InputDevice:6336
      d = $.data(cv,"events");
      
      //$LASTPOS=7006368;//kernel.InputDevice:6368
      if (! d) {
        //$LASTPOS=7006387;//kernel.InputDevice:6387
        $.data(cv,"events","true");
        //$LASTPOS=7006424;//kernel.InputDevice:6424
        cvj.mousedown(handleMouseDown);
        //$LASTPOS=7006465;//kernel.InputDevice:6465
        cvj.mousemove(handleMouseMove);
        //$LASTPOS=7006506;//kernel.InputDevice:6506
        cvj.mouseup(handleMouseUp);
        //$LASTPOS=7006543;//kernel.InputDevice:6543
        cvj.on("touchstart",handleTouchStart);
        //$LASTPOS=7006591;//kernel.InputDevice:6591
        cvj.on("touchmove",handleTouchMove);
        //$LASTPOS=7006637;//kernel.InputDevice:6637
        cvj.on("touchend",handleTouchEnd);
        //$LASTPOS=7006681;//kernel.InputDevice:6681
        cvj.on("touchcancel",handleTouchEnd);
        
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
      
      //$LASTPOS=7000644;//kernel.InputDevice:644
      cv = cvj[0];
      
      //$LASTPOS=7000664;//kernel.InputDevice:664
      ID_MOUSE = 31238612;
      
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000692;//kernel.InputDevice:692
            Tonyu.globals.$handleMouseDown=(function anonymous_709(e) {
              var p;
              var mp;
              
              //$LASTPOS=7000725;//kernel.InputDevice:725
              Tonyu.resetLoopCheck();
              //$LASTPOS=7000758;//kernel.InputDevice:758
              p = cvj.offset();
              
              //$LASTPOS=7000787;//kernel.InputDevice:787
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7000864;//kernel.InputDevice:864
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7000936;//kernel.InputDevice:936
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7000959;//kernel.InputDevice:959
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7000982;//kernel.InputDevice:982
              _this.isMouseDown=true;
              //$LASTPOS=7001009;//kernel.InputDevice:1009
              if (Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7001051;//kernel.InputDevice:1051
                Tonyu.globals.$handleTouchStart({preventDefault: (function anonymous_1103() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
              //$LASTPOS=7001418;//kernel.InputDevice:1418
              _this.handleListeners();
            });
            //$LASTPOS=7001450;//kernel.InputDevice:1450
            Tonyu.globals.$handleMouseMove=(function anonymous_1467(e) {
              var p;
              var mp;
              
              //$LASTPOS=7001483;//kernel.InputDevice:1483
              Tonyu.resetLoopCheck();
              //$LASTPOS=7001516;//kernel.InputDevice:1516
              p = cvj.offset();
              
              //$LASTPOS=7001545;//kernel.InputDevice:1545
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7001622;//kernel.InputDevice:1622
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7001694;//kernel.InputDevice:1694
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7001717;//kernel.InputDevice:1717
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7001740;//kernel.InputDevice:1740
              if (_this.isMouseDown&&Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7001797;//kernel.InputDevice:1797
                Tonyu.globals.$handleTouchMove({preventDefault: (function anonymous_1848() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
              //$LASTPOS=7002163;//kernel.InputDevice:2163
              _this.handleListeners();
            });
            //$LASTPOS=7002250;//kernel.InputDevice:2250
            Tonyu.globals.$handleMouseUp=(function anonymous_2265(e) {
              
              //$LASTPOS=7002281;//kernel.InputDevice:2281
              Tonyu.resetLoopCheck();
              //$LASTPOS=7002314;//kernel.InputDevice:2314
              _this.isMouseDown=false;
              //$LASTPOS=7002342;//kernel.InputDevice:2342
              if (Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7002384;//kernel.InputDevice:2384
                Tonyu.globals.$handleTouchEnd({preventDefault: (function anonymous_2434() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
            });
            //$LASTPOS=7002753;//kernel.InputDevice:2753
            Tonyu.globals.$touches=[];
            //$LASTPOS=7002771;//kernel.InputDevice:2771
            //$LASTPOS=7002776;//kernel.InputDevice:2776
            i = 0;
            for (; i<5 ; i++) {
              //$LASTPOS=7002792;//kernel.InputDevice:2792
              Tonyu.globals.$touches.push(_this.newTouch(i));
            }
            //$LASTPOS=7002825;//kernel.InputDevice:2825
            Tonyu.globals.$touches.findById=(function anonymous_2843(id) {
              var j;
              
              //$LASTPOS=7002860;//kernel.InputDevice:2860
              //$LASTPOS=7002865;//kernel.InputDevice:2865
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7002915;//kernel.InputDevice:2915
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7003025;//kernel.InputDevice:3025
            Tonyu.globals.$touches.findWithin=(function anonymous_3045(o,d) {
              var j;
              
              //$LASTPOS=7003071;//kernel.InputDevice:3071
              //$LASTPOS=7003076;//kernel.InputDevice:3076
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7003126;//kernel.InputDevice:3126
                  if (o.within(Tonyu.globals.$touches[j],d)) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7003233;//kernel.InputDevice:3233
            Tonyu.globals.$handleTouchStart=(function anonymous_3251(e) {
              var p;
              var ts;
              var dst;
              var i;
              var src;
              var j;
              
              //$LASTPOS=7003267;//kernel.InputDevice:3267
              Tonyu.resetLoopCheck();
              //$LASTPOS=7003300;//kernel.InputDevice:3300
              Tonyu.globals.$t2MediaLib.activate();
              //$LASTPOS=7003333;//kernel.InputDevice:3333
              p = cvj.offset();
              
              //$LASTPOS=7003362;//kernel.InputDevice:3362
              e.preventDefault();
              //$LASTPOS=7003391;//kernel.InputDevice:3391
              ts = e.originalEvent.changedTouches;
              
              
              //$LASTPOS=7003457;//kernel.InputDevice:3457
              //$LASTPOS=7003462;//kernel.InputDevice:3462
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7003507;//kernel.InputDevice:3507
                  src = ts[i];
                  
                  //$LASTPOS=7003535;//kernel.InputDevice:3535
                  //$LASTPOS=7003540;//kernel.InputDevice:3540
                  j = 0;
                  for (; j<Tonyu.globals.$touches.length ; j++) {
                    {
                      //$LASTPOS=7003594;//kernel.InputDevice:3594
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=7003643;//kernel.InputDevice:3643
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=7003681;//kernel.InputDevice:3681
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                  }
                  //$LASTPOS=7003787;//kernel.InputDevice:3787
                  if (dst) {
                    //$LASTPOS=7003815;//kernel.InputDevice:3815
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7003896;//kernel.InputDevice:3896
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
                    //$LASTPOS=7003975;//kernel.InputDevice:3975
                    dst.px=dst.x=_this.mp.x;
                    //$LASTPOS=7004011;//kernel.InputDevice:4011
                    dst.py=dst.y=_this.mp.y;
                    //$LASTPOS=7004047;//kernel.InputDevice:4047
                    dst.layer=_this.mp.layer;
                    //$LASTPOS=7004084;//kernel.InputDevice:4084
                    dst.touched=1;
                    
                  }
                }
              }
              //$LASTPOS=7004134;//kernel.InputDevice:4134
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7004166;//kernel.InputDevice:4166
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7004198;//kernel.InputDevice:4198
              _this.handleListeners();
            });
            //$LASTPOS=7004230;//kernel.InputDevice:4230
            Tonyu.globals.$handleTouchMove=(function anonymous_4247(e) {
              var p;
              var ts;
              var dst;
              var i;
              var src;
              
              //$LASTPOS=7004263;//kernel.InputDevice:4263
              Tonyu.resetLoopCheck();
              //$LASTPOS=7004296;//kernel.InputDevice:4296
              Tonyu.globals.$t2MediaLib.activate();
              //$LASTPOS=7004329;//kernel.InputDevice:4329
              p = cvj.offset();
              
              //$LASTPOS=7004358;//kernel.InputDevice:4358
              e.preventDefault();
              //$LASTPOS=7004387;//kernel.InputDevice:4387
              ts = e.originalEvent.changedTouches;
              
              
              //$LASTPOS=7004453;//kernel.InputDevice:4453
              //$LASTPOS=7004458;//kernel.InputDevice:4458
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7004503;//kernel.InputDevice:4503
                  src = ts[i];
                  
                  //$LASTPOS=7004531;//kernel.InputDevice:4531
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7004587;//kernel.InputDevice:4587
                  if (dst) {
                    //$LASTPOS=7004615;//kernel.InputDevice:4615
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7004696;//kernel.InputDevice:4696
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,dst.layer||_this.defaultLayer);
                    //$LASTPOS=7004786;//kernel.InputDevice:4786
                    dst.x=_this.mp.x;
                    //$LASTPOS=7004815;//kernel.InputDevice:4815
                    dst.y=_this.mp.y;
                    //$LASTPOS=7004844;//kernel.InputDevice:4844
                    dst.layer=_this.mp.layer;
                    
                  }
                }
              }
              //$LASTPOS=7004899;//kernel.InputDevice:4899
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7004931;//kernel.InputDevice:4931
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7004963;//kernel.InputDevice:4963
              _this.handleListeners();
            });
            //$LASTPOS=7004995;//kernel.InputDevice:4995
            Tonyu.globals.$handleTouchEnd=(function anonymous_5011(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=7005027;//kernel.InputDevice:5027
              Tonyu.resetLoopCheck();
              //$LASTPOS=7005060;//kernel.InputDevice:5060
              Tonyu.globals.$t2MediaLib.activate();
              //$LASTPOS=7005093;//kernel.InputDevice:5093
              ts = e.originalEvent.changedTouches;
              
              //$LASTPOS=7005141;//kernel.InputDevice:5141
              //$LASTPOS=7005146;//kernel.InputDevice:5146
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7005191;//kernel.InputDevice:5191
                  src = ts[i];
                  
                  //$LASTPOS=7005219;//kernel.InputDevice:5219
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7005275;//kernel.InputDevice:5275
                  if (dst) {
                    //$LASTPOS=7005303;//kernel.InputDevice:5303
                    Tonyu.globals.$touches[dst.index]=Tonyu.globals.$InputDevice.newTouch(dst.index);
                    //$LASTPOS=7005374;//kernel.InputDevice:5374
                    Tonyu.globals.$touches[dst.index].x=dst.x;
                    //$LASTPOS=7005420;//kernel.InputDevice:5420
                    Tonyu.globals.$touches[dst.index].y=dst.y;
                    //$LASTPOS=7005466;//kernel.InputDevice:5466
                    Tonyu.globals.$touches[dst.index].layer=_this.defaultLayer;
                    //$LASTPOS=7005523;//kernel.InputDevice:5523
                    dst.ended=true;
                    
                  }
                }
              }
              //$LASTPOS=7005680;//kernel.InputDevice:5680
              _this.handleListeners();
            });
            //$LASTPOS=7005712;//kernel.InputDevice:5712
            Tonyu.globals.$unsetTouchEmu=(function anonymous_5727() {
              var i;
              var t;
              var _it_69;
              
              //$LASTPOS=7005742;//kernel.InputDevice:5742
              Tonyu.resetLoopCheck();
              //$LASTPOS=7005775;//kernel.InputDevice:5775
              Tonyu.globals.$InputDevice.touchEmu=false;
              //$LASTPOS=7005813;//kernel.InputDevice:5813
              _it_69=Tonyu.iterator(Tonyu.globals.$touches,2);
              while(_it_69.next()) {
                i=_it_69[0];
                t=_it_69[1];
                
                //$LASTPOS=7005854;//kernel.InputDevice:5854
                if (t.identifier==ID_MOUSE) {
                  //$LASTPOS=7005901;//kernel.InputDevice:5901
                  t[i]=Tonyu.globals.$InputDevice.newTouch(i);
                  
                }
                
              }
            });
            //$LASTPOS=7005971;//kernel.InputDevice:5971
            handleMouseDown = (function anonymous_5991(e) {
              
              //$LASTPOS=7005996;//kernel.InputDevice:5996
              Tonyu.globals.$handleMouseDown(e);
            });
            
            //$LASTPOS=7006024;//kernel.InputDevice:6024
            handleMouseMove = (function anonymous_6044(e) {
              
              //$LASTPOS=7006049;//kernel.InputDevice:6049
              Tonyu.globals.$handleMouseMove(e);
            });
            
            //$LASTPOS=7006077;//kernel.InputDevice:6077
            handleMouseUp = (function anonymous_6095(e) {
              
              //$LASTPOS=7006100;//kernel.InputDevice:6100
              Tonyu.globals.$handleMouseUp(e);
            });
            
            //$LASTPOS=7006126;//kernel.InputDevice:6126
            handleTouchStart = (function anonymous_6147(e) {
              
              //$LASTPOS=7006152;//kernel.InputDevice:6152
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7006169;//kernel.InputDevice:6169
              Tonyu.globals.$handleTouchStart(e);
            });
            
            //$LASTPOS=7006198;//kernel.InputDevice:6198
            handleTouchMove = (function anonymous_6218(e) {
              
              //$LASTPOS=7006223;//kernel.InputDevice:6223
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7006240;//kernel.InputDevice:6240
              Tonyu.globals.$handleTouchMove(e);
            });
            
            //$LASTPOS=7006268;//kernel.InputDevice:6268
            handleTouchEnd = (function anonymous_6287(e) {
              
              //$LASTPOS=7006292;//kernel.InputDevice:6292
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7006309;//kernel.InputDevice:6309
              Tonyu.globals.$handleTouchEnd(e);
            });
            
            //$LASTPOS=7006336;//kernel.InputDevice:6336
            d = $.data(cv,"events");
            
            //$LASTPOS=7006368;//kernel.InputDevice:6368
            if (! d) {
              //$LASTPOS=7006387;//kernel.InputDevice:6387
              $.data(cv,"events","true");
              //$LASTPOS=7006424;//kernel.InputDevice:6424
              cvj.mousedown(handleMouseDown);
              //$LASTPOS=7006465;//kernel.InputDevice:6465
              cvj.mousemove(handleMouseMove);
              //$LASTPOS=7006506;//kernel.InputDevice:6506
              cvj.mouseup(handleMouseUp);
              //$LASTPOS=7006543;//kernel.InputDevice:6543
              cvj.on("touchstart",handleTouchStart);
              //$LASTPOS=7006591;//kernel.InputDevice:6591
              cvj.on("touchmove",handleTouchMove);
              //$LASTPOS=7006637;//kernel.InputDevice:6637
              cvj.on("touchend",handleTouchEnd);
              //$LASTPOS=7006681;//kernel.InputDevice:6681
              cvj.on("touchcancel",handleTouchEnd);
              
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
      var _it_79;
      
      //$LASTPOS=7006749;//kernel.InputDevice:6749
      _it_79=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_79.next()) {
        i=_it_79[0];
        
        //$LASTPOS=7006784;//kernel.InputDevice:6784
        if (i.touched>0) {
          //$LASTPOS=7006802;//kernel.InputDevice:6802
          i.touched++;
          
        } else {
          //$LASTPOS=7006830;//kernel.InputDevice:6830
          if (i.touched==- 1) {
            //$LASTPOS=7006849;//kernel.InputDevice:6849
            i.touched=1;
          } else {
            //$LASTPOS=7006891;//kernel.InputDevice:6891
            i.vx=i.vy=0;
            //$LASTPOS=7006917;//kernel.InputDevice:6917
            i.px=null;
            
          }
        }
        //$LASTPOS=7006948;//kernel.InputDevice:6948
        if (i.touched>0) {
          //$LASTPOS=7006980;//kernel.InputDevice:6980
          if (typeof  i.px=="number") {
            //$LASTPOS=7007026;//kernel.InputDevice:7026
            i.vx=i.x-i.px||0;
            //$LASTPOS=7007063;//kernel.InputDevice:7063
            i.vy=i.y-i.py||0;
            
          }
          //$LASTPOS=7007111;//kernel.InputDevice:7111
          i.px=i.x;
          //$LASTPOS=7007134;//kernel.InputDevice:7134
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
      var _it_79;
      
      //$LASTPOS=7006749;//kernel.InputDevice:6749
      _it_79=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_79.next()) {
        i=_it_79[0];
        
        //$LASTPOS=7006784;//kernel.InputDevice:6784
        if (i.touched>0) {
          //$LASTPOS=7006802;//kernel.InputDevice:6802
          i.touched++;
          
        } else {
          //$LASTPOS=7006830;//kernel.InputDevice:6830
          if (i.touched==- 1) {
            //$LASTPOS=7006849;//kernel.InputDevice:6849
            i.touched=1;
          } else {
            //$LASTPOS=7006891;//kernel.InputDevice:6891
            i.vx=i.vy=0;
            //$LASTPOS=7006917;//kernel.InputDevice:6917
            i.px=null;
            
          }
        }
        //$LASTPOS=7006948;//kernel.InputDevice:6948
        if (i.touched>0) {
          //$LASTPOS=7006980;//kernel.InputDevice:6980
          if (typeof  i.px=="number") {
            //$LASTPOS=7007026;//kernel.InputDevice:7026
            i.vx=i.x-i.px||0;
            //$LASTPOS=7007063;//kernel.InputDevice:7063
            i.vy=i.y-i.py||0;
            
          }
          //$LASTPOS=7007111;//kernel.InputDevice:7111
          i.px=i.x;
          //$LASTPOS=7007134;//kernel.InputDevice:7134
          i.py=i.y;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"newTouch":{"nowait":false},"changeTouchLayer":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}},"fields":{"listeners":{},"touchEmu":{},"defaultLayer":{},"isMouseDown":{},"mp":{}}}
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
      if (! asrc) {
        throw new Error("Use as: new ArgParser(arguments)");
        
      }
      //$LASTPOS=8000087;//kernel.ArgParser:87
      _this.length=0;
      //$LASTPOS=8000102;//kernel.ArgParser:102
      _this.a=_this;
      //$LASTPOS=8000115;//kernel.ArgParser:115
      //$LASTPOS=8000120;//kernel.ArgParser:120
      i = 0;
      for (; i<asrc.length ; i++) {
        //$LASTPOS=8000148;//kernel.ArgParser:148
        _this.push(asrc[i]);
      }
    },
    push :function _trc_ArgParser_push(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000183;//kernel.ArgParser:183
      _this.a[_this.length++]=v;
    },
    fiber$push :function _trc_ArgParser_f_push(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000183;//kernel.ArgParser:183
      _this.a[_this.length++]=v;
      
      _thread.retVal=_this;return;
    },
    trimUndefs :function _trc_ArgParser_trimUndefs() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000223;//kernel.ArgParser:223
      while (_this.length>0) {
        //$LASTPOS=8000250;//kernel.ArgParser:250
        if (_this.a[_this.length-1]!==_this._undef) {
          break;
          
        }
        //$LASTPOS=8000292;//kernel.ArgParser:292
        _this.length--;
        //$LASTPOS=8000311;//kernel.ArgParser:311
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
            //$LASTPOS=8000223;//kernel.ArgParser:223
          case 1:
            if (!(_this.length>0)) { __pc=3     ; break; }
            //$LASTPOS=8000250;//kernel.ArgParser:250
            if (!(_this.a[_this.length-1]!==_this._undef)) { __pc=2     ; break; }
            __pc=3     ; break;
            
          case 2     :
            
            //$LASTPOS=8000292;//kernel.ArgParser:292
            _this.length--;
            //$LASTPOS=8000311;//kernel.ArgParser:311
            delete _this.a[_this.length];
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    peek :function _trc_ArgParser_peek(i) {
      "use strict";
      var _this=this;
      
      return _this.a[i];
    },
    fiber$peek :function _trc_ArgParser_f_peek(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.a[i];return;
      
      
      _thread.retVal=_this;return;
    },
    shift :function _trc_ArgParser_shift(type) {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=8000393;//kernel.ArgParser:393
      if (typeof  type=="number") {
        //$LASTPOS=8000431;//kernel.ArgParser:431
        res = [];
        
        //$LASTPOS=8000452;//kernel.ArgParser:452
        //$LASTPOS=8000457;//kernel.ArgParser:457
        i = 0;
        for (; i<type ; i++) {
          //$LASTPOS=8000478;//kernel.ArgParser:478
          res.push(_this.shift());
        }
        return res;
        
      } else {
        //$LASTPOS=8000530;//kernel.ArgParser:530
        if (typeof  type=="string") {
          //$LASTPOS=8000568;//kernel.ArgParser:568
          if (_this.a[0]==null) {
            return _this._undef;
          }
          //$LASTPOS=8000654;//kernel.ArgParser:654
          if (typeof  _this.a[0]===type) {
            return _this.shift();
          }
          return _this._undef;
          
        } else {
          //$LASTPOS=8000730;//kernel.ArgParser:730
          if (type) {
            //$LASTPOS=8000751;//kernel.ArgParser:751
            if (_this.a[0] instanceof type) {
              return _this.shift();
            }
            return _this._undef;
            
          }
        }
      }
      //$LASTPOS=8000821;//kernel.ArgParser:821
      res = _this.a[0];
      
      //$LASTPOS=8000840;//kernel.ArgParser:840
      //$LASTPOS=8000845;//kernel.ArgParser:845
      i = 1;
      for (; i<_this.length ; i++) {
        {
          //$LASTPOS=8000882;//kernel.ArgParser:882
          _this.a[i-1]=_this.a[i];
        }
      }
      //$LASTPOS=8000907;//kernel.ArgParser:907
      _this.length--;
      //$LASTPOS=8000938;//kernel.ArgParser:938
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
      
      //$LASTPOS=8000393;//kernel.ArgParser:393
      if (typeof  type=="number") {
        //$LASTPOS=8000431;//kernel.ArgParser:431
        res = [];
        
        //$LASTPOS=8000452;//kernel.ArgParser:452
        //$LASTPOS=8000457;//kernel.ArgParser:457
        i = 0;
        for (; i<type ; i++) {
          //$LASTPOS=8000478;//kernel.ArgParser:478
          res.push(_this.shift());
        }
        _thread.retVal=res;return;
        
        
      } else {
        //$LASTPOS=8000530;//kernel.ArgParser:530
        if (typeof  type=="string") {
          //$LASTPOS=8000568;//kernel.ArgParser:568
          if (_this.a[0]==null) {
            _thread.retVal=_this._undef;return;
            
          }
          //$LASTPOS=8000654;//kernel.ArgParser:654
          if (typeof  _this.a[0]===type) {
            _thread.retVal=_this.shift();return;
            
          }
          _thread.retVal=_this._undef;return;
          
          
        } else {
          //$LASTPOS=8000730;//kernel.ArgParser:730
          if (type) {
            //$LASTPOS=8000751;//kernel.ArgParser:751
            if (_this.a[0] instanceof type) {
              _thread.retVal=_this.shift();return;
              
            }
            _thread.retVal=_this._undef;return;
            
            
          }
        }
      }
      //$LASTPOS=8000821;//kernel.ArgParser:821
      res = _this.a[0];
      
      //$LASTPOS=8000840;//kernel.ArgParser:840
      //$LASTPOS=8000845;//kernel.ArgParser:845
      i = 1;
      for (; i<_this.length ; i++) {
        {
          //$LASTPOS=8000882;//kernel.ArgParser:882
          _this.a[i-1]=_this.a[i];
        }
      }
      //$LASTPOS=8000907;//kernel.ArgParser:907
      _this.length--;
      //$LASTPOS=8000938;//kernel.ArgParser:938
      delete _this.a[_this.length];
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    toArray :function _trc_ArgParser_toArray() {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=8001000;//kernel.ArgParser:1000
      res = [];
      
      //$LASTPOS=8001017;//kernel.ArgParser:1017
      //$LASTPOS=8001022;//kernel.ArgParser:1022
      i = 0;
      for (; i<_this.a.length ; i++) {
        //$LASTPOS=8001048;//kernel.ArgParser:1048
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
      
      //$LASTPOS=8001000;//kernel.ArgParser:1000
      res = [];
      
      //$LASTPOS=8001017;//kernel.ArgParser:1017
      //$LASTPOS=8001022;//kernel.ArgParser:1022
      i = 0;
      for (; i<_this.a.length ; i++) {
        //$LASTPOS=8001048;//kernel.ArgParser:1048
        res.push(_this.a[i]);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    parseOptions :function _trc_ArgParser_parseOptions(spec) {
      "use strict";
      var _this=this;
      var speca;
      var res;
      var name;
      var opt;
      var notOption;
      var k;
      var v;
      var _it_87;
      var _it_88;
      
      //$LASTPOS=8001112;//kernel.ArgParser:1112
      speca = spec.split(",");
      
      //$LASTPOS=8001144;//kernel.ArgParser:1144
      res = {};
      
      //$LASTPOS=8001161;//kernel.ArgParser:1161
      if (_this.length>speca.length) {
        throw new Error("# of arguments("+_this.length+") is more than spec("+speca.length+").");
        
        
      }
      //$LASTPOS=8001303;//kernel.ArgParser:1303
      while (_this.length>1) {
        //$LASTPOS=8001330;//kernel.ArgParser:1330
        name = speca.shift();
        
        //$LASTPOS=8001363;//kernel.ArgParser:1363
        res[name]=_this.shift();
        
      }
      //$LASTPOS=8001394;//kernel.ArgParser:1394
      opt = _this.shift();
      
      //$LASTPOS=8001426;//kernel.ArgParser:1426
      if (typeof  opt!=="object") {
        //$LASTPOS=8001464;//kernel.ArgParser:1464
        notOption=true;
        
      } else {
        //$LASTPOS=8001503;//kernel.ArgParser:1503
        _it_87=Tonyu.iterator(opt,2);
        while(_it_87.next()) {
          k=_it_87[0];
          v=_it_87[1];
          
          //$LASTPOS=8001539;//kernel.ArgParser:1539
          if (speca.indexOf(k)<0) {
            //$LASTPOS=8001582;//kernel.ArgParser:1582
            notOption=true;
            break;
            
            
          }
          
        }
        
      }
      //$LASTPOS=8001660;//kernel.ArgParser:1660
      if (notOption) {
        //$LASTPOS=8001686;//kernel.ArgParser:1686
        res[speca.shift()]=opt;
        
      } else {
        //$LASTPOS=8001733;//kernel.ArgParser:1733
        _it_88=Tonyu.iterator(opt,2);
        while(_it_88.next()) {
          k=_it_88[0];
          v=_it_88[1];
          
          //$LASTPOS=8001769;//kernel.ArgParser:1769
          res[k]=v;
          
        }
        
      }
      return res;
    },
    fiber$parseOptions :function _trc_ArgParser_f_parseOptions(_thread,spec) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var speca;
      var res;
      var name;
      var opt;
      var notOption;
      var k;
      var v;
      var _it_87;
      var _it_88;
      
      //$LASTPOS=8001112;//kernel.ArgParser:1112
      speca = spec.split(",");
      
      //$LASTPOS=8001144;//kernel.ArgParser:1144
      res = {};
      
      //$LASTPOS=8001161;//kernel.ArgParser:1161
      if (_this.length>speca.length) {
        throw new Error("# of arguments("+_this.length+") is more than spec("+speca.length+").");
        
        
      }
      
      _thread.enter(function _trc_ArgParser_ent_parseOptions(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8001303;//kernel.ArgParser:1303
          case 1:
            if (!(_this.length>1)) { __pc=3     ; break; }
            //$LASTPOS=8001330;//kernel.ArgParser:1330
            name = speca.shift();
            
            //$LASTPOS=8001363;//kernel.ArgParser:1363
            _this.fiber$shift(_thread);
            __pc=2;return;
          case 2:
            res[name]=_thread.retVal;
            
            __pc=1;break;
          case 3     :
            
            //$LASTPOS=8001394;//kernel.ArgParser:1394
            _this.fiber$shift(_thread);
            __pc=4;return;
          case 4:
            opt=_thread.retVal;
            
            //$LASTPOS=8001426;//kernel.ArgParser:1426
            if (!(typeof  opt!=="object")) { __pc=5     ; break; }
            {
              //$LASTPOS=8001464;//kernel.ArgParser:1464
              notOption=true;
            }
            __pc=6     ;break;
          case 5     :
            //$LASTPOS=8001503;//kernel.ArgParser:1503
            _it_87=Tonyu.iterator(opt,2);
            while(_it_87.next()) {
              k=_it_87[0];
              v=_it_87[1];
              
              //$LASTPOS=8001539;//kernel.ArgParser:1539
              if (speca.indexOf(k)<0) {
                //$LASTPOS=8001582;//kernel.ArgParser:1582
                notOption=true;
                break;
                
                
              }
              
            }
          case 6     :
            
            //$LASTPOS=8001660;//kernel.ArgParser:1660
            if (notOption) {
              //$LASTPOS=8001686;//kernel.ArgParser:1686
              res[speca.shift()]=opt;
              
            } else {
              //$LASTPOS=8001733;//kernel.ArgParser:1733
              _it_88=Tonyu.iterator(opt,2);
              while(_it_88.next()) {
                k=_it_88[0];
                v=_it_88[1];
                
                //$LASTPOS=8001769;//kernel.ArgParser:1769
                res[k]=v;
                
              }
              
            }
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"push":{"nowait":false},"trimUndefs":{"nowait":false},"peek":{"nowait":false},"shift":{"nowait":false},"toArray":{"nowait":false},"parseOptions":{"nowait":false}},"fields":{"length":{},"a":{},"_undef":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.FileMod',
  shortName: 'FileMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_FileMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_FileMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    file :function _trc_FileMod_file(path) {
      "use strict";
      var _this=this;
      var d;
      var files;
      
      //$LASTPOS=9000034;//kernel.FileMod:34
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=9000076;//kernel.FileMod:76
      if (path.isSFile&&path.isSFile()) {
        return path;
      }
      //$LASTPOS=9000130;//kernel.FileMod:130
      files = d.rel("files/");
      
      return files.rel(path).setPolicy({topDir: d});
    },
    fiber$file :function _trc_FileMod_f_file(_thread,path) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var files;
      
      //$LASTPOS=9000034;//kernel.FileMod:34
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=9000076;//kernel.FileMod:76
      if (path.isSFile&&path.isSFile()) {
        _thread.retVal=path;return;
        
      }
      //$LASTPOS=9000130;//kernel.FileMod:130
      files = d.rel("files/");
      
      _thread.retVal=files.rel(path).setPolicy({topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"file":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.GeneratorMod',
  shortName: 'GeneratorMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_GeneratorMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_GeneratorMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    generator :function _trc_GeneratorMod_generator() {
      "use strict";
      var _this=this;
      var a;
      var methodName;
      var th;
      var res;
      
      //$LASTPOS=10000035;//kernel.GeneratorMod:35
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=10000072;//kernel.GeneratorMod:72
      methodName = a.shift();
      
      //$LASTPOS=10000103;//kernel.GeneratorMod:103
      th = Tonyu.thread();
      
      //$LASTPOS=10000131;//kernel.GeneratorMod:131
      a = a.toArray();
      
      //$LASTPOS=10000155;//kernel.GeneratorMod:155
      a.unshift(_this.yielder);
      //$LASTPOS=10000180;//kernel.GeneratorMod:180
      res = {tonyuIterator: (function anonymous_214() {
        
      })};
      
      //$LASTPOS=10000243;//kernel.GeneratorMod:243
      th.apply(_this,methodName,a);
    },
    fiber$generator :function _trc_GeneratorMod_f_generator(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var methodName;
      var th;
      var res;
      
      //$LASTPOS=10000035;//kernel.GeneratorMod:35
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=10000072;//kernel.GeneratorMod:72
      methodName = a.shift();
      
      //$LASTPOS=10000103;//kernel.GeneratorMod:103
      th = Tonyu.thread();
      
      //$LASTPOS=10000131;//kernel.GeneratorMod:131
      a = a.toArray();
      
      //$LASTPOS=10000155;//kernel.GeneratorMod:155
      a.unshift(_this.yielder);
      //$LASTPOS=10000180;//kernel.GeneratorMod:180
      res = {tonyuIterator: (function anonymous_214() {
        
      })};
      
      //$LASTPOS=10000243;//kernel.GeneratorMod:243
      th.apply(_this,methodName,a);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"generator":{"nowait":false}},"fields":{"yielder":{}}}
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
    sgn :function _trc_MathMod_sgn(v,base) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000324;//kernel.MathMod:324
      base=base||0;
      return (v>base?1:v<- base?- 1:0);
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
      
      
      //$LASTPOS=11000582;//kernel.MathMod:582
      a=_this.floor(a);
      //$LASTPOS=11000599;//kernel.MathMod:599
      b=_this.floor(b);
      //$LASTPOS=11000616;//kernel.MathMod:616
      if (a>=b) {
        //$LASTPOS=11000637;//kernel.MathMod:637
        c=(a-b)%360;
        //$LASTPOS=11000661;//kernel.MathMod:661
        if (c>=180) {
          //$LASTPOS=11000673;//kernel.MathMod:673
          c-=360;
        }
        
      } else {
        //$LASTPOS=11000704;//kernel.MathMod:704
        c=- ((b-a)%360);
        //$LASTPOS=11000731;//kernel.MathMod:731
        if (c<- 180) {
          //$LASTPOS=11000743;//kernel.MathMod:743
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
      
      //$LASTPOS=11000852;//kernel.MathMod:852
      if (typeof  dx=="object") {
        //$LASTPOS=11000888;//kernel.MathMod:888
        t = dx;
        
        //$LASTPOS=11000907;//kernel.MathMod:907
        dx=t.x-_this.x;
        //$LASTPOS=11000916;//kernel.MathMod:916
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000992;//kernel.MathMod:992
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
    rndFloat :function _trc_MathMod_rndFloat(r,m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11001134;//kernel.MathMod:1134
      if (typeof  r!=="number") {
        //$LASTPOS=11001159;//kernel.MathMod:1159
        r=0;
      }
      //$LASTPOS=11001169;//kernel.MathMod:1169
      if (typeof  m!=="number") {
        //$LASTPOS=11001194;//kernel.MathMod:1194
        m=1;
      }
      //$LASTPOS=11001204;//kernel.MathMod:1204
      if (r<m) {
        return Math.random()*(m-r)+r;
        
      } else {
        return Math.random()*(r-m)+m;
        
      }
    },
    rnd :function _trc_MathMod_rnd(r,m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11001344;//kernel.MathMod:1344
      if (typeof  r=="number") {
        //$LASTPOS=11001379;//kernel.MathMod:1379
        if (typeof  m=="number") {
          //$LASTPOS=11001418;//kernel.MathMod:1418
          if (r<m) {
            return Math.floor(Math.random()*(m-r)+r);
            
          } else {
            return Math.floor(Math.random()*(r-m)+m);
            
          }
          
        } else {
          return Math.floor(Math.random()*(r>0?r:0));
          
        }
        
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
      
      //$LASTPOS=11001795;//kernel.MathMod:1795
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
    amod :function _trc_MathMod_amod(v,d) {
      "use strict";
      var _this=this;
      
      return (v%d+d)%d;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"sgn":{"nowait":true},"atan2":{"nowait":true},"atanxy":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rndFloat":{"nowait":true},"rnd":{"nowait":true},"parseFloat":{"nowait":true},"clamp":{"nowait":true},"clamped":{"nowait":true},"min":{"nowait":true},"max":{"nowait":true},"amod":{"nowait":true}},"fields":{"x":{},"y":{}}}
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
      
      //$LASTPOS=12000263;//kernel.Navigator:263
      u = _this.getUserAgent().toLowerCase();
      
      return ((u.indexOf("windows")!=- 1&&u.indexOf("touch")!=- 1&&u.indexOf("tablet pc")==- 1)||u.indexOf("ipad")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")==- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("tablet")!=- 1)||u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1||u.indexOf("playbook")!=- 1||u.indexOf('a1_07')!=- 1||u.indexOf('sc-01c')!=- 1);
    },
    fiber$isTablet :function _trc_Navigator_f_isTablet(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12000263;//kernel.Navigator:263
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=((u.indexOf("windows")!=- 1&&u.indexOf("touch")!=- 1&&u.indexOf("tablet pc")==- 1)||u.indexOf("ipad")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")==- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("tablet")!=- 1)||u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1||u.indexOf("playbook")!=- 1||u.indexOf('a1_07')!=- 1||u.indexOf('sc-01c')!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isMobile :function _trc_Navigator_isMobile() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12000800;//kernel.Navigator:800
      u = _this.getUserAgent().toLowerCase();
      
      return ((u.indexOf("windows")!=- 1&&u.indexOf("phone")!=- 1)||u.indexOf("iphone")!=- 1||u.indexOf("ipod")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("blackberry")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1)));
    },
    fiber$isMobile :function _trc_Navigator_f_isMobile(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12000800;//kernel.Navigator:800
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=((u.indexOf("windows")!=- 1&&u.indexOf("phone")!=- 1)||u.indexOf("iphone")!=- 1||u.indexOf("ipod")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("blackberry")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1)));return;
      
      
      _thread.retVal=_this;return;
    },
    isWindows :function _trc_Navigator_isWindows() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12001274;//kernel.Navigator:1274
      u = _this.getUserAgent().toLowerCase();
      
      return u.indexOf("windows")!=- 1;
    },
    fiber$isWindows :function _trc_Navigator_f_isWindows(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12001274;//kernel.Navigator:1274
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=u.indexOf("windows")!=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    isAndroid :function _trc_Navigator_isAndroid() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12001378;//kernel.Navigator:1378
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1);
    },
    fiber$isAndroid :function _trc_Navigator_f_isAndroid(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12001378;//kernel.Navigator:1378
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isIOS :function _trc_Navigator_isIOS() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12001522;//kernel.Navigator:1522
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("iphone")!=- 1||u.indexOf("ipad")!=- 1||u.indexOf("ipod")!=- 1);
    },
    fiber$isIOS :function _trc_Navigator_f_isIOS(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12001522;//kernel.Navigator:1522
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("iphone")!=- 1||u.indexOf("ipad")!=- 1||u.indexOf("ipod")!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isFirefoxOS :function _trc_Navigator_isFirefoxOS() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12001705;//kernel.Navigator:1705
      u = _this.getUserAgent().toLowerCase();
      
      return u.indexOf("firefox")!=1;
    },
    fiber$isFirefoxOS :function _trc_Navigator_f_isFirefoxOS(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12001705;//kernel.Navigator:1705
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=u.indexOf("firefox")!=1;return;
      
      
      _thread.retVal=_this;return;
    },
    isKindle :function _trc_Navigator_isKindle() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12001807;//kernel.Navigator:1807
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1);
    },
    fiber$isKindle :function _trc_Navigator_f_isKindle(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12001807;//kernel.Navigator:1807
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isBlackBerry :function _trc_Navigator_isBlackBerry() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=12001959;//kernel.Navigator:1959
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("blackberry")!=- 1||u.indexOf("playbook")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1));
    },
    fiber$isBlackBerry :function _trc_Navigator_f_isBlackBerry(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=12001959;//kernel.Navigator:1959
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
      
      //$LASTPOS=13000091;//kernel.ObjectPool:91
      list = _this.poolList(key);
      
      //$LASTPOS=13000117;//kernel.ObjectPool:117
      o.objectPoolAge=(o.objectPoolAge||0)+1;
      //$LASTPOS=13000159;//kernel.ObjectPool:159
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
            //$LASTPOS=13000091;//kernel.ObjectPool:91
            _this.fiber$poolList(_thread, key);
            __pc=1;return;
          case 1:
            list=_thread.retVal;
            
            //$LASTPOS=13000117;//kernel.ObjectPool:117
            o.objectPoolAge=(o.objectPoolAge||0)+1;
            //$LASTPOS=13000159;//kernel.ObjectPool:159
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
      
      //$LASTPOS=13000196;//kernel.ObjectPool:196
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
            //$LASTPOS=13000196;//kernel.ObjectPool:196
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
      
      //$LASTPOS=13000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      return _this.lists[key]=_this.lists[key]||[];
    },
    fiber$poolList :function _trc_ObjectPool_f_poolList(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000266;//kernel.ObjectPool:266
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
      
      //$LASTPOS=14000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=14000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=14000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=14000123;//kernel.TObject:123
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
    initialize :function _trc_TQuery_initialize(parent) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000058;//kernel.TQuery:58
      _this.length=0;
      //$LASTPOS=15000073;//kernel.TQuery:73
      _this.parent=parent;
    },
    create :function _trc_TQuery_create() {
      "use strict";
      var _this=this;
      
      return new Tonyu.classes.kernel.TQuery(_this.parent);
    },
    fiber$create :function _trc_TQuery_f_create(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=new Tonyu.classes.kernel.TQuery(_this.parent);return;
      
      
      _thread.retVal=_this;return;
    },
    contains :function _trc_TQuery_contains(t) {
      "use strict";
      var _this=this;
      var o;
      var _it_116;
      
      //$LASTPOS=15000165;//kernel.TQuery:165
      _it_116=Tonyu.iterator(_this,1);
      while(_it_116.next()) {
        o=_it_116[0];
        
        //$LASTPOS=15000196;//kernel.TQuery:196
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
      var _it_116;
      
      //$LASTPOS=15000165;//kernel.TQuery:165
      _it_116=Tonyu.iterator(_this,1);
      while(_it_116.next()) {
        o=_it_116[0];
        
        //$LASTPOS=15000196;//kernel.TQuery:196
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
      
      //$LASTPOS=15000279;//kernel.TQuery:279
      res = {};
      
      //$LASTPOS=15000296;//kernel.TQuery:296
      res.i=0;
      //$LASTPOS=15000310;//kernel.TQuery:310
      if (arity==1) {
        //$LASTPOS=15000335;//kernel.TQuery:335
        res.next=(function anonymous_344() {
          
          //$LASTPOS=15000371;//kernel.TQuery:371
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=15000422;//kernel.TQuery:422
          res[0]=_this[res.i];
          //$LASTPOS=15000455;//kernel.TQuery:455
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=15000525;//kernel.TQuery:525
        res.next=(function anonymous_534() {
          
          //$LASTPOS=15000561;//kernel.TQuery:561
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=15000612;//kernel.TQuery:612
          res[0]=res.i;
          //$LASTPOS=15000639;//kernel.TQuery:639
          res[1]=_this[res.i];
          //$LASTPOS=15000672;//kernel.TQuery:672
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
      
      //$LASTPOS=15000279;//kernel.TQuery:279
      res = {};
      
      //$LASTPOS=15000296;//kernel.TQuery:296
      res.i=0;
      //$LASTPOS=15000310;//kernel.TQuery:310
      if (arity==1) {
        //$LASTPOS=15000335;//kernel.TQuery:335
        res.next=(function anonymous_344() {
          
          //$LASTPOS=15000371;//kernel.TQuery:371
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=15000422;//kernel.TQuery:422
          res[0]=_this[res.i];
          //$LASTPOS=15000455;//kernel.TQuery:455
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=15000525;//kernel.TQuery:525
        res.next=(function anonymous_534() {
          
          //$LASTPOS=15000561;//kernel.TQuery:561
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=15000612;//kernel.TQuery:612
          res[0]=res.i;
          //$LASTPOS=15000639;//kernel.TQuery:639
          res[1]=_this[res.i];
          //$LASTPOS=15000672;//kernel.TQuery:672
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
      var _it_120;
      
      
      //$LASTPOS=15000779;//kernel.TQuery:779
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=15000807;//kernel.TQuery:807
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=15000918;//kernel.TQuery:918
      if (arguments.length>=2) {
        //$LASTPOS=15000954;//kernel.TQuery:954
        values={};
        //$LASTPOS=15000974;//kernel.TQuery:974
        //$LASTPOS=15000979;//kernel.TQuery:979
        i = 0;
        for (; i<arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=15001032;//kernel.TQuery:1032
            values[arguments[i]]=arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=15001103;//kernel.TQuery:1103
        values=arguments[0];
        
      }
      //$LASTPOS=15001136;//kernel.TQuery:1136
      if (values) {
        //$LASTPOS=15001159;//kernel.TQuery:1159
        _it_120=Tonyu.iterator(_this,1);
        while(_it_120.next()) {
          e=_it_120[0];
          
          //$LASTPOS=15001194;//kernel.TQuery:1194
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
      var _it_120;
      
      
      //$LASTPOS=15000779;//kernel.TQuery:779
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=15000807;//kernel.TQuery:807
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=15000918;//kernel.TQuery:918
      if (_arguments.length>=2) {
        //$LASTPOS=15000954;//kernel.TQuery:954
        values={};
        //$LASTPOS=15000974;//kernel.TQuery:974
        //$LASTPOS=15000979;//kernel.TQuery:979
        i = 0;
        for (; i<_arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=15001032;//kernel.TQuery:1032
            values[_arguments[i]]=_arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=15001103;//kernel.TQuery:1103
        values=_arguments[0];
        
      }
      //$LASTPOS=15001136;//kernel.TQuery:1136
      if (values) {
        //$LASTPOS=15001159;//kernel.TQuery:1159
        _it_120=Tonyu.iterator(_this,1);
        while(_it_120.next()) {
          e=_it_120[0];
          
          //$LASTPOS=15001194;//kernel.TQuery:1194
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15001259;//kernel.TQuery:1259
      if (typeof  key!="function") {
        return (function anonymous_1305(o) {
          
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
      
      //$LASTPOS=15001259;//kernel.TQuery:1259
      if (typeof  key!="function") {
        _thread.retVal=(function anonymous_1305(o) {
          
          return o[key];
        });return;
        
        
      } else {
        _thread.retVal=key;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    applyArrayMethod :function _trc_TQuery_applyArrayMethod(name,args) {
      "use strict";
      var _this=this;
      var res;
      var a;
      var r;
      
      //$LASTPOS=15001410;//kernel.TQuery:1410
      res = _this.create();
      
      //$LASTPOS=15001433;//kernel.TQuery:1433
      a = _this.toArray();
      
      //$LASTPOS=15001455;//kernel.TQuery:1455
      r = a[name].apply(a,args);
      
      //$LASTPOS=15001489;//kernel.TQuery:1489
      res.push(r);
      return res;
    },
    fiber$applyArrayMethod :function _trc_TQuery_f_applyArrayMethod(_thread,name,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var a;
      var r;
      
      
      _thread.enter(function _trc_TQuery_ent_applyArrayMethod(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15001410;//kernel.TQuery:1410
            _this.fiber$create(_thread);
            __pc=1;return;
          case 1:
            res=_thread.retVal;
            
            //$LASTPOS=15001433;//kernel.TQuery:1433
            _this.fiber$toArray(_thread);
            __pc=2;return;
          case 2:
            a=_thread.retVal;
            
            //$LASTPOS=15001455;//kernel.TQuery:1455
            r = a[name].apply(a,args);
            
            //$LASTPOS=15001489;//kernel.TQuery:1489
            res.push(r);
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    toArray :function _trc_TQuery_toArray() {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=15001541;//kernel.TQuery:1541
      res = [];
      
      //$LASTPOS=15001558;//kernel.TQuery:1558
      //$LASTPOS=15001562;//kernel.TQuery:1562
      i = 0;
      for (; i<_this.length ; i++) {
        //$LASTPOS=15001584;//kernel.TQuery:1584
        res.push(_this[i]);
      }
      return res;
    },
    fiber$toArray :function _trc_TQuery_f_toArray(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var i;
      
      //$LASTPOS=15001541;//kernel.TQuery:1541
      res = [];
      
      //$LASTPOS=15001558;//kernel.TQuery:1558
      //$LASTPOS=15001562;//kernel.TQuery:1562
      i = 0;
      for (; i<_this.length ; i++) {
        //$LASTPOS=15001584;//kernel.TQuery:1584
        res.push(_this[i]);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    sort :function _trc_TQuery_sort() {
      "use strict";
      var _this=this;
      
      return _this.applyArrayMethod("sort",arguments);
    },
    fiber$sort :function _trc_TQuery_f_sort(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.applyArrayMethod("sort",_arguments);return;
      
      
      _thread.retVal=_this;return;
    },
    slice :function _trc_TQuery_slice() {
      "use strict";
      var _this=this;
      
      return _this.applyArrayMethod("slice",arguments);
    },
    fiber$slice :function _trc_TQuery_f_slice(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.applyArrayMethod("slice",_arguments);return;
      
      
      _thread.retVal=_this;return;
    },
    maxs :function _trc_TQuery_maxs(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var reso;
      var o;
      var _it_131;
      var v;
      
      //$LASTPOS=15001768;//kernel.TQuery:1768
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=15001796;//kernel.TQuery:1796
      reso = _this.create();
      
      //$LASTPOS=15001824;//kernel.TQuery:1824
      _it_131=Tonyu.iterator(_this,1);
      while(_it_131.next()) {
        o=_it_131[0];
        
        //$LASTPOS=15001855;//kernel.TQuery:1855
        v = f(o);
        
        //$LASTPOS=15001876;//kernel.TQuery:1876
        if (res==null||v>=res) {
          //$LASTPOS=15001916;//kernel.TQuery:1916
          if (v>res) {
            //$LASTPOS=15001927;//kernel.TQuery:1927
            reso=_this.create();
          }
          //$LASTPOS=15001955;//kernel.TQuery:1955
          reso.push(o);
          //$LASTPOS=15001982;//kernel.TQuery:1982
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
      var _it_131;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_maxs(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15001768;//kernel.TQuery:1768
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=15001796;//kernel.TQuery:1796
            _this.fiber$create(_thread);
            __pc=2;return;
          case 2:
            reso=_thread.retVal;
            
            //$LASTPOS=15001824;//kernel.TQuery:1824
            _it_131=Tonyu.iterator(_this,1);
          case 3:
            if (!(_it_131.next())) { __pc=7     ; break; }
            o=_it_131[0];
            
            //$LASTPOS=15001855;//kernel.TQuery:1855
            v = f(o);
            
            //$LASTPOS=15001876;//kernel.TQuery:1876
            if (!(res==null||v>=res)) { __pc=6     ; break; }
            //$LASTPOS=15001916;//kernel.TQuery:1916
            if (!(v>res)) { __pc=5     ; break; }
            //$LASTPOS=15001927;//kernel.TQuery:1927
            _this.fiber$create(_thread);
            __pc=4;return;
          case 4:
            reso=_thread.retVal;
            
          case 5     :
            
            //$LASTPOS=15001955;//kernel.TQuery:1955
            reso.push(o);
            //$LASTPOS=15001982;//kernel.TQuery:1982
            res=v;
          case 6     :
            
            __pc=3;break;
          case 7     :
            
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
      var _it_138;
      var v;
      
      //$LASTPOS=15002047;//kernel.TQuery:2047
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=15002075;//kernel.TQuery:2075
      reso = _this.create();
      
      //$LASTPOS=15002103;//kernel.TQuery:2103
      _it_138=Tonyu.iterator(_this,1);
      while(_it_138.next()) {
        o=_it_138[0];
        
        //$LASTPOS=15002134;//kernel.TQuery:2134
        v = f(o);
        
        //$LASTPOS=15002155;//kernel.TQuery:2155
        if (res==null||v<=res) {
          //$LASTPOS=15002195;//kernel.TQuery:2195
          if (v<res) {
            //$LASTPOS=15002206;//kernel.TQuery:2206
            reso=_this.create();
          }
          //$LASTPOS=15002234;//kernel.TQuery:2234
          reso.push(o);
          //$LASTPOS=15002261;//kernel.TQuery:2261
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
      var _it_138;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_mins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15002047;//kernel.TQuery:2047
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=15002075;//kernel.TQuery:2075
            _this.fiber$create(_thread);
            __pc=2;return;
          case 2:
            reso=_thread.retVal;
            
            //$LASTPOS=15002103;//kernel.TQuery:2103
            _it_138=Tonyu.iterator(_this,1);
          case 3:
            if (!(_it_138.next())) { __pc=7     ; break; }
            o=_it_138[0];
            
            //$LASTPOS=15002134;//kernel.TQuery:2134
            v = f(o);
            
            //$LASTPOS=15002155;//kernel.TQuery:2155
            if (!(res==null||v<=res)) { __pc=6     ; break; }
            //$LASTPOS=15002195;//kernel.TQuery:2195
            if (!(v<res)) { __pc=5     ; break; }
            //$LASTPOS=15002206;//kernel.TQuery:2206
            _this.fiber$create(_thread);
            __pc=4;return;
          case 4:
            reso=_thread.retVal;
            
          case 5     :
            
            //$LASTPOS=15002234;//kernel.TQuery:2234
            reso.push(o);
            //$LASTPOS=15002261;//kernel.TQuery:2261
            res=v;
          case 6     :
            
            __pc=3;break;
          case 7     :
            
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
      
      //$LASTPOS=15002420;//kernel.TQuery:2420
      if (x==null) {
        //$LASTPOS=15002434;//kernel.TQuery:2434
        x=_this.parent.x;
        //$LASTPOS=15002445;//kernel.TQuery:2445
        y=_this.parent.y;
        
      }
      //$LASTPOS=15002463;//kernel.TQuery:2463
      if (typeof  x=="object") {
        //$LASTPOS=15002488;//kernel.TQuery:2488
        y=x.y;
        //$LASTPOS=15002494;//kernel.TQuery:2494
        x=x.x;
        
      }
      return _this.mins((function anonymous_2519(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));
    },
    fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15002420;//kernel.TQuery:2420
      if (x==null) {
        //$LASTPOS=15002434;//kernel.TQuery:2434
        x=_this.parent.x;
        //$LASTPOS=15002445;//kernel.TQuery:2445
        y=_this.parent.y;
        
      }
      //$LASTPOS=15002463;//kernel.TQuery:2463
      if (typeof  x=="object") {
        //$LASTPOS=15002488;//kernel.TQuery:2488
        y=x.y;
        //$LASTPOS=15002494;//kernel.TQuery:2494
        x=x.x;
        
      }
      _thread.retVal=_this.mins((function anonymous_2519(o) {
        
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
      
      
      //$LASTPOS=15002662;//kernel.TQuery:2662
      if (arguments.length==1) {
        //$LASTPOS=15002698;//kernel.TQuery:2698
        x=_this.parent.x;
        //$LASTPOS=15002719;//kernel.TQuery:2719
        y=_this.parent.y;
        //$LASTPOS=15002740;//kernel.TQuery:2740
        d=xo;
        
      } else {
        //$LASTPOS=15002758;//kernel.TQuery:2758
        if (typeof  xo=="object") {
          //$LASTPOS=15002794;//kernel.TQuery:2794
          x=xo.x;
          //$LASTPOS=15002801;//kernel.TQuery:2801
          y=xo.y;
          //$LASTPOS=15002808;//kernel.TQuery:2808
          d=yd;
          
        } else {
          //$LASTPOS=15002837;//kernel.TQuery:2837
          x=xo;
          //$LASTPOS=15002842;//kernel.TQuery:2842
          y=yd;
          
        }
      }
      return _this.find((function anonymous_2872(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));
    },
    fiber$withins :function _trc_TQuery_f_withins(_thread,xo,yd,d) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      
      
      //$LASTPOS=15002662;//kernel.TQuery:2662
      if (_arguments.length==1) {
        //$LASTPOS=15002698;//kernel.TQuery:2698
        x=_this.parent.x;
        //$LASTPOS=15002719;//kernel.TQuery:2719
        y=_this.parent.y;
        //$LASTPOS=15002740;//kernel.TQuery:2740
        d=xo;
        
      } else {
        //$LASTPOS=15002758;//kernel.TQuery:2758
        if (typeof  xo=="object") {
          //$LASTPOS=15002794;//kernel.TQuery:2794
          x=xo.x;
          //$LASTPOS=15002801;//kernel.TQuery:2801
          y=xo.y;
          //$LASTPOS=15002808;//kernel.TQuery:2808
          d=yd;
          
        } else {
          //$LASTPOS=15002837;//kernel.TQuery:2837
          x=xo;
          //$LASTPOS=15002842;//kernel.TQuery:2842
          y=yd;
          
        }
      }
      _thread.retVal=_this.find((function anonymous_2872(o) {
        
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
      var _it_149;
      var v;
      
      //$LASTPOS=15003011;//kernel.TQuery:3011
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=15003053;//kernel.TQuery:3053
      _it_149=Tonyu.iterator(_this,1);
      while(_it_149.next()) {
        o=_it_149[0];
        
        //$LASTPOS=15003084;//kernel.TQuery:3084
        v = f(o);
        
        //$LASTPOS=15003105;//kernel.TQuery:3105
        if (res==null||v>res) {
          //$LASTPOS=15003129;//kernel.TQuery:3129
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
      var _it_155;
      var v;
      
      //$LASTPOS=15003181;//kernel.TQuery:3181
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=15003223;//kernel.TQuery:3223
      _it_155=Tonyu.iterator(_this,1);
      while(_it_155.next()) {
        o=_it_155[0];
        
        //$LASTPOS=15003254;//kernel.TQuery:3254
        v = f(o);
        
        //$LASTPOS=15003275;//kernel.TQuery:3275
        if (res==null||v<res) {
          //$LASTPOS=15003299;//kernel.TQuery:3299
          res=v;
        }
        
      }
      return res;
    },
    push :function _trc_TQuery_push(e) {
      "use strict";
      var _this=this;
      var ee;
      var _it_161;
      
      //$LASTPOS=15003350;//kernel.TQuery:3350
      if (e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array) {
        //$LASTPOS=15003392;//kernel.TQuery:3392
        _it_161=Tonyu.iterator(e,1);
        while(_it_161.next()) {
          ee=_it_161[0];
          
          //$LASTPOS=15003410;//kernel.TQuery:3410
          _this.push(ee);
        }
        
      } else {
        //$LASTPOS=15003443;//kernel.TQuery:3443
        _this[_this.length]=e;
        //$LASTPOS=15003468;//kernel.TQuery:3468
        _this.length++;
        
      }
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ee;
      var _it_161;
      
      
      _thread.enter(function _trc_TQuery_ent_push(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15003350;//kernel.TQuery:3350
            if (!(e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array)) { __pc=4     ; break; }
            //$LASTPOS=15003392;//kernel.TQuery:3392
            _it_161=Tonyu.iterator(e,1);
          case 1:
            if (!(_it_161.next())) { __pc=3     ; break; }
            ee=_it_161[0];
            
            //$LASTPOS=15003410;//kernel.TQuery:3410
            _this.fiber$push(_thread, ee);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            __pc=5     ;break;
          case 4     :
            {
              //$LASTPOS=15003443;//kernel.TQuery:3443
              _this[_this.length]=e;
              //$LASTPOS=15003468;//kernel.TQuery:3468
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
      var _it_164;
      
      //$LASTPOS=15003531;//kernel.TQuery:3531
      no = _this.create();
      
      //$LASTPOS=15003553;//kernel.TQuery:3553
      _it_164=Tonyu.iterator(_this,1);
      while(_it_164.next()) {
        o=_it_164[0];
        
        //$LASTPOS=15003584;//kernel.TQuery:3584
        if (f(o)) {
          //$LASTPOS=15003594;//kernel.TQuery:3594
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
      var _it_164;
      
      
      _thread.enter(function _trc_TQuery_ent_find(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15003531;//kernel.TQuery:3531
            _this.fiber$create(_thread);
            __pc=1;return;
          case 1:
            no=_thread.retVal;
            
            //$LASTPOS=15003553;//kernel.TQuery:3553
            _it_164=Tonyu.iterator(_this,1);
            while(_it_164.next()) {
              o=_it_164[0];
              
              //$LASTPOS=15003584;//kernel.TQuery:3584
              if (f(o)) {
                //$LASTPOS=15003594;//kernel.TQuery:3594
                no.push(o);
              }
              
            }
            _thread.exit(no);return;
            _thread.exit(_this);return;
          }
        }
      });
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
    random :function _trc_TQuery_random() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15003690;//kernel.TQuery:3690
      if (_this.length===0) {
        return null;
      }
      return _this[_this.rnd(_this.length)];
    },
    fiber$random :function _trc_TQuery_f_random(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15003690;//kernel.TQuery:3690
      if (_this.length===0) {
        _thread.retVal=null;return;
        
      }
      _thread.retVal=_this[_this.rnd(_this.length)];return;
      
      
      _thread.retVal=_this;return;
    },
    apply :function _trc_TQuery_apply(name,args) {
      "use strict";
      var _this=this;
      var res;
      var o;
      var _it_168;
      var f;
      
      
      //$LASTPOS=15003794;//kernel.TQuery:3794
      if (! args) {
        //$LASTPOS=15003805;//kernel.TQuery:3805
        args=[];
      }
      //$LASTPOS=15003819;//kernel.TQuery:3819
      _it_168=Tonyu.iterator(_this,1);
      while(_it_168.next()) {
        o=_it_168[0];
        
        //$LASTPOS=15003850;//kernel.TQuery:3850
        f = o[name];
        
        //$LASTPOS=15003874;//kernel.TQuery:3874
        if (typeof  f=="function") {
          //$LASTPOS=15003915;//kernel.TQuery:3915
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
      var _it_168;
      var f;
      
      
      //$LASTPOS=15003794;//kernel.TQuery:3794
      if (! args) {
        //$LASTPOS=15003805;//kernel.TQuery:3805
        args=[];
      }
      //$LASTPOS=15003819;//kernel.TQuery:3819
      _it_168=Tonyu.iterator(_this,1);
      while(_it_168.next()) {
        o=_it_168[0];
        
        //$LASTPOS=15003850;//kernel.TQuery:3850
        f = o[name];
        
        //$LASTPOS=15003874;//kernel.TQuery:3874
        if (typeof  f=="function") {
          //$LASTPOS=15003915;//kernel.TQuery:3915
          res=f.apply(o,args);
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    alive :function _trc_TQuery_alive() {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_4060(o) {
        
        return ! o.isDead();
      }));
    },
    fiber$alive :function _trc_TQuery_f_alive(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_4060(o) {
        
        return ! o.isDead();
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_TQuery_die() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=15004122;//kernel.TQuery:4122
      a = _this.alive();
      
      //$LASTPOS=15004142;//kernel.TQuery:4142
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=15004178;//kernel.TQuery:4178
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
            //$LASTPOS=15004122;//kernel.TQuery:4122
            _this.fiber$alive(_thread);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=15004142;//kernel.TQuery:4142
            if (!(a.length==0)) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            //$LASTPOS=15004178;//kernel.TQuery:4178
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
      
      return _this.find((function anonymous_4247(o) {
        
        return o instanceof k;
      }));
    },
    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_4247(o) {
        
        return o instanceof k;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"create":{"nowait":false},"contains":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"applyArrayMethod":{"nowait":false},"toArray":{"nowait":false},"sort":{"nowait":false},"slice":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":true},"min":{"nowait":true},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"random":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}},"fields":{"length":{},"parent":{}}}
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
      
      //$LASTPOS=16000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=16000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=16000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    toListener :function _trc_EventHandler_toListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000132;//kernel.EventHandler:132
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=16000179;//kernel.EventHandler:179
        f=_this.target[f];
        
      }
      //$LASTPOS=16000204;//kernel.EventHandler:204
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      return f;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000341;//kernel.EventHandler:341
      _this.listeners.push(_this.toListener(f));
      return {remove: (function anonymous_403() {
        
        //$LASTPOS=16000418;//kernel.EventHandler:418
        _this.removeListener(f);
      })};
    },
    removeListener :function _trc_EventHandler_removeListener(f) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=16000493;//kernel.EventHandler:493
      i = _this.listeners.indexOf(f);
      
      //$LASTPOS=16000526;//kernel.EventHandler:526
      _this.listeners.splice(i,1);
    },
    fire :function _trc_EventHandler_fire(args) {
      "use strict";
      var _this=this;
      var t;
      var h;
      var _it_177;
      
      //$LASTPOS=16000572;//kernel.EventHandler:572
      if (_this.released) {
        return _this;
      }
      
      //$LASTPOS=16000611;//kernel.EventHandler:611
      _it_177=Tonyu.iterator(_this.listeners,1);
      while(_it_177.next()) {
        h=_it_177[0];
        
        //$LASTPOS=16000855;//kernel.EventHandler:855
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
      var _it_177;
      
      //$LASTPOS=16000572;//kernel.EventHandler:572
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=16000611;//kernel.EventHandler:611
            _it_177=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_177.next())) { __pc=3     ; break; }
            h=_it_177[0];
            
            //$LASTPOS=16000855;//kernel.EventHandler:855
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
      
      //$LASTPOS=16000918;//kernel.EventHandler:918
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
      
      //$LASTPOS=17000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_147() {
        
        //$LASTPOS=17000163;//kernel.ScreenOutHandler:163
        retThread.kill();
      })};
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000222;//kernel.ScreenOutHandler:222
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=17000240;//kernel.ScreenOutHandler:240
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
      
      //$LASTPOS=18000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,_this.toListener(f));
      
      return {remove: (function anonymous_149() {
        
        //$LASTPOS=18000165;//kernel.WithinHandler:165
        retThread.kill();
      })};
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18000225;//kernel.WithinHandler:225
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=18000244;//kernel.WithinHandler:244
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Color',
  shortName: 'Color',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_Color_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Color_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Color_initialize() {
      "use strict";
      var _this=this;
      var a;
      var s;
      var rgba;
      var p;
      var x;
      var y;
      
      //$LASTPOS=19000061;//kernel.Color:61
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      
      
      //$LASTPOS=19000116;//kernel.Color:116
      _this.maxs={r: 255,g: 255,b: 255,a: 255,h: 360,s: 1,l: 1};
      //$LASTPOS=19000164;//kernel.Color:164
      p = a.peek(0);
      
      //$LASTPOS=19000183;//kernel.Color:183
      if (p&&p.height&&p.width&&p.data) {
        //$LASTPOS=19000228;//kernel.Color:228
        _this.imageData=a.shift();
        //$LASTPOS=19000252;//kernel.Color:252
        x = a.shift();
        
        //$LASTPOS=19000272;//kernel.Color:272
        y = a.shift();
        
        //$LASTPOS=19000292;//kernel.Color:292
        _this.index=(x+y*p.width)*4;
        //$LASTPOS=19000318;//kernel.Color:318
        _this.value={};
        return _this;
        
      }
      //$LASTPOS=19000345;//kernel.Color:345
      if (s=a.shift("string")) {
        //$LASTPOS=19000375;//kernel.Color:375
        _this.type="name";
        //$LASTPOS=19000391;//kernel.Color:391
        _this.value={name: s};
        
      } else {
        //$LASTPOS=19000416;//kernel.Color:416
        if (s=a.shift("object")) {
          //$LASTPOS=19000446;//kernel.Color:446
          if (typeof  s.r=="number") {
            //$LASTPOS=19000478;//kernel.Color:478
            _this.type="rgba";
            //$LASTPOS=19000495;//kernel.Color:495
            _this.value=s;
            //$LASTPOS=19000508;//kernel.Color:508
            _this.fillNum("g","b","a");
            
          } else {
            //$LASTPOS=19000540;//kernel.Color:540
            if (typeof  s.h=="number") {
              //$LASTPOS=19000572;//kernel.Color:572
              _this.type="hsl";
              //$LASTPOS=19000588;//kernel.Color:588
              _this.value=s;
              //$LASTPOS=19000601;//kernel.Color:601
              _this.fillNum("s","l","a");
              
            } else {
              throw new Error("Invalid color spec");
              
              
            }
          }
          
        } else {
          //$LASTPOS=19000692;//kernel.Color:692
          if ((s=a.shift("number"))!=null) {
            //$LASTPOS=19000732;//kernel.Color:732
            _this.type="rgba";
            //$LASTPOS=19000748;//kernel.Color:748
            _this.value={r: s};
            //$LASTPOS=19000764;//kernel.Color:764
            _this.value.g=a.shift();
            //$LASTPOS=19000786;//kernel.Color:786
            _this.value.b=a.shift();
            //$LASTPOS=19000808;//kernel.Color:808
            _this.value.a=a.shift();
            //$LASTPOS=19000830;//kernel.Color:830
            _this.fillNum("g","b","a");
            
          } else {
            throw new Error("Invalid color spec");
            
            
          }
        }
      }
    },
    fillNum :function _trc_Color_fillNum() {
      "use strict";
      var _this=this;
      var a;
      var k;
      var _it_189;
      
      //$LASTPOS=19000928;//kernel.Color:928
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=19000962;//kernel.Color:962
      _it_189=Tonyu.iterator(a.toArray(),1);
      while(_it_189.next()) {
        k=_it_189[0];
        
        //$LASTPOS=19000994;//kernel.Color:994
        if (_this.value[k]==null) {
          //$LASTPOS=19001014;//kernel.Color:1014
          _this.value[k]=(k=="a"?_this.maxs.a:0);
        }
        
      }
    },
    fiber$fillNum :function _trc_Color_f_fillNum(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var k;
      var _it_189;
      
      //$LASTPOS=19000928;//kernel.Color:928
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=19000962;//kernel.Color:962
      _it_189=Tonyu.iterator(a.toArray(),1);
      while(_it_189.next()) {
        k=_it_189[0];
        
        //$LASTPOS=19000994;//kernel.Color:994
        if (_this.value[k]==null) {
          //$LASTPOS=19001014;//kernel.Color:1014
          _this.value[k]=(k=="a"?_this.maxs.a:0);
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    __getter__r :function _trc_Color___getter__r() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001057;//kernel.Color:1057
      _this.makeRGBA();
      //$LASTPOS=19001071;//kernel.Color:1071
      if (_this.imageData) {
        return _this.imageData.data[_this.index];
      }
      return _this.value.r;
    },
    __getter__g :function _trc_Color___getter__g() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001145;//kernel.Color:1145
      _this.makeRGBA();
      //$LASTPOS=19001159;//kernel.Color:1159
      if (_this.imageData) {
        return _this.imageData.data[_this.index+1];
      }
      return _this.value.g;
    },
    __getter__b :function _trc_Color___getter__b() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001235;//kernel.Color:1235
      _this.makeRGBA();
      //$LASTPOS=19001249;//kernel.Color:1249
      if (_this.imageData) {
        return _this.imageData.data[_this.index+2];
      }
      return _this.value.b;
    },
    __getter__a :function _trc_Color___getter__a() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001325;//kernel.Color:1325
      if (_this.imageData) {
        return _this.imageData.data[_this.index+3];
      }
      return _this.value.a;
    },
    __setter__a :function _trc_Color___setter__a(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001403;//kernel.Color:1403
      _this.clearName();
      //$LASTPOS=19001418;//kernel.Color:1418
      v=_this.clamp(v,0,_this.maxs.a);
      //$LASTPOS=19001441;//kernel.Color:1441
      if (_this.imageData) {
        //$LASTPOS=19001456;//kernel.Color:1456
        _this.imageData.data[_this.index+3]=v;
      } else {
        //$LASTPOS=19001490;//kernel.Color:1490
        _this.value.a=v;
      }
    },
    __setter__r :function _trc_Color___setter__r(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001516;//kernel.Color:1516
      _this.makeRGBA();
      //$LASTPOS=19001530;//kernel.Color:1530
      _this.clearName();
      //$LASTPOS=19001545;//kernel.Color:1545
      _this.clearHSLA();
      //$LASTPOS=19001560;//kernel.Color:1560
      v=_this.clamp(v,0,_this.maxs.r);
      //$LASTPOS=19001583;//kernel.Color:1583
      if (_this.imageData) {
        //$LASTPOS=19001598;//kernel.Color:1598
        _this.imageData.data[_this.index]=v;
      } else {
        //$LASTPOS=19001630;//kernel.Color:1630
        _this.value.r=v;
      }
    },
    __setter__g :function _trc_Color___setter__g(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001654;//kernel.Color:1654
      _this.makeRGBA();
      //$LASTPOS=19001668;//kernel.Color:1668
      _this.clearName();
      //$LASTPOS=19001683;//kernel.Color:1683
      _this.clearHSLA();
      //$LASTPOS=19001698;//kernel.Color:1698
      v=_this.clamp(v,0,_this.maxs.g);
      //$LASTPOS=19001721;//kernel.Color:1721
      if (_this.imageData) {
        //$LASTPOS=19001736;//kernel.Color:1736
        _this.imageData.data[_this.index+1]=v;
      }
      //$LASTPOS=19001765;//kernel.Color:1765
      _this.value.g=v;
    },
    __setter__b :function _trc_Color___setter__b(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001789;//kernel.Color:1789
      _this.makeRGBA();
      //$LASTPOS=19001803;//kernel.Color:1803
      _this.clearName();
      //$LASTPOS=19001818;//kernel.Color:1818
      _this.clearHSLA();
      //$LASTPOS=19001833;//kernel.Color:1833
      v=_this.clamp(v,0,_this.maxs.b);
      //$LASTPOS=19001856;//kernel.Color:1856
      if (_this.imageData) {
        //$LASTPOS=19001871;//kernel.Color:1871
        _this.imageData.data[_this.index+2]=v;
      }
      //$LASTPOS=19001900;//kernel.Color:1900
      _this.value.b=v;
    },
    __getter__h :function _trc_Color___getter__h() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001924;//kernel.Color:1924
      _this.makeHSLA();
      return _this.value.h;
    },
    __getter__s :function _trc_Color___getter__s() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19001965;//kernel.Color:1965
      _this.makeHSLA();
      return _this.value.s;
    },
    __getter__l :function _trc_Color___getter__l() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19002006;//kernel.Color:2006
      _this.makeHSLA();
      return _this.value.l;
    },
    __setter__h :function _trc_Color___setter__h(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19002049;//kernel.Color:2049
      _this.makeHSLA();
      //$LASTPOS=19002063;//kernel.Color:2063
      _this.clearName();
      //$LASTPOS=19002078;//kernel.Color:2078
      _this.value.h=_this.amod(v,360);
      //$LASTPOS=19002101;//kernel.Color:2101
      if (_this.imageData) {
        //$LASTPOS=19002116;//kernel.Color:2116
        _this.makeRGBA(true);
      } else {
        //$LASTPOS=19002139;//kernel.Color:2139
        _this.clearRGBA();
      }
    },
    __setter__s :function _trc_Color___setter__s(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19002165;//kernel.Color:2165
      _this.makeHSLA();
      //$LASTPOS=19002179;//kernel.Color:2179
      _this.clearName();
      //$LASTPOS=19002194;//kernel.Color:2194
      _this.value.s=_this.clamp(v,0,_this.maxs.s);
      //$LASTPOS=19002223;//kernel.Color:2223
      if (_this.imageData) {
        //$LASTPOS=19002238;//kernel.Color:2238
        _this.makeRGBA(true);
      } else {
        //$LASTPOS=19002261;//kernel.Color:2261
        _this.clearRGBA();
      }
    },
    __setter__l :function _trc_Color___setter__l(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19002287;//kernel.Color:2287
      _this.makeHSLA();
      //$LASTPOS=19002301;//kernel.Color:2301
      _this.clearName();
      //$LASTPOS=19002316;//kernel.Color:2316
      _this.value.l=_this.clamp(v,0,_this.maxs.l);
      //$LASTPOS=19002345;//kernel.Color:2345
      if (_this.imageData) {
        //$LASTPOS=19002360;//kernel.Color:2360
        _this.makeRGBA(true);
      } else {
        //$LASTPOS=19002383;//kernel.Color:2383
        _this.clearRGBA();
      }
    },
    setHSLA :function _trc_Color_setHSLA(h,s,l,a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19002422;//kernel.Color:2422
      _this.value.h=h;
      //$LASTPOS=19002435;//kernel.Color:2435
      _this.value.s=s;
      //$LASTPOS=19002448;//kernel.Color:2448
      _this.value.l=l;
      //$LASTPOS=19002461;//kernel.Color:2461
      if (typeof  a==="number") {
        //$LASTPOS=19002490;//kernel.Color:2490
        if (_this.imageData) {
          //$LASTPOS=19002511;//kernel.Color:2511
          _this.imageData.data[_this.index+3]=a;
          
        } else {
          //$LASTPOS=19002548;//kernel.Color:2548
          _this.value.a=a;
        }
        
      }
      //$LASTPOS=19002565;//kernel.Color:2565
      if (_this.imageData) {
        //$LASTPOS=19002580;//kernel.Color:2580
        _this.makeRGBA(true);
      } else {
        //$LASTPOS=19002603;//kernel.Color:2603
        _this.clearRGBA();
      }
      return true;
    },
    fiber$setHSLA :function _trc_Color_f_setHSLA(_thread,h,s,l,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19002422;//kernel.Color:2422
      _this.value.h=h;
      //$LASTPOS=19002435;//kernel.Color:2435
      _this.value.s=s;
      //$LASTPOS=19002448;//kernel.Color:2448
      _this.value.l=l;
      //$LASTPOS=19002461;//kernel.Color:2461
      if (typeof  a==="number") {
        //$LASTPOS=19002490;//kernel.Color:2490
        if (_this.imageData) {
          //$LASTPOS=19002511;//kernel.Color:2511
          _this.imageData.data[_this.index+3]=a;
          
        } else {
          //$LASTPOS=19002548;//kernel.Color:2548
          _this.value.a=a;
        }
        
      }
      
      _thread.enter(function _trc_Color_ent_setHSLA(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19002565;//kernel.Color:2565
            if (!(_this.imageData)) { __pc=2     ; break; }
            //$LASTPOS=19002580;//kernel.Color:2580
            _this.fiber$makeRGBA(_thread, true);
            __pc=1;return;
          case 1:
            
            __pc=4     ;break;
          case 2     :
            //$LASTPOS=19002603;//kernel.Color:2603
            _this.fiber$clearRGBA(_thread);
            __pc=3;return;
          case 3:
            
          case 4     :
            
            _thread.exit(true);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    setRGBA :function _trc_Color_setRGBA(r,g,b,a) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=19002657;//kernel.Color:2657
      if (_this.imageData) {
        //$LASTPOS=19002677;//kernel.Color:2677
        //$LASTPOS=19002681;//kernel.Color:2681
        i = 0;
        for (; i<4 ; i++) {
          //$LASTPOS=19002698;//kernel.Color:2698
          _this.imageData.data[_this.index+i]=[r,g,b,a][i];
        }
        
      } else {
        //$LASTPOS=19002750;//kernel.Color:2750
        _this.value.r=r;
        //$LASTPOS=19002764;//kernel.Color:2764
        _this.value.g=g;
        //$LASTPOS=19002778;//kernel.Color:2778
        _this.value.b=b;
        //$LASTPOS=19002792;//kernel.Color:2792
        if (typeof  a==="number") {
          //$LASTPOS=19002816;//kernel.Color:2816
          _this.value.a=a;
        }
        //$LASTPOS=19002830;//kernel.Color:2830
        _this.clearHSLA();
        //$LASTPOS=19002846;//kernel.Color:2846
        _this.clearName();
        
      }
    },
    fiber$setRGBA :function _trc_Color_f_setRGBA(_thread,r,g,b,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Color_ent_setRGBA(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19002657;//kernel.Color:2657
            if (!(_this.imageData)) { __pc=1     ; break; }
            {
              //$LASTPOS=19002677;//kernel.Color:2677
              //$LASTPOS=19002681;//kernel.Color:2681
              i = 0;
              for (; i<4 ; i++) {
                //$LASTPOS=19002698;//kernel.Color:2698
                _this.imageData.data[_this.index+i]=[r,g,b,a][i];
              }
            }
            __pc=4     ;break;
          case 1     :
            //$LASTPOS=19002750;//kernel.Color:2750
            _this.value.r=r;
            //$LASTPOS=19002764;//kernel.Color:2764
            _this.value.g=g;
            //$LASTPOS=19002778;//kernel.Color:2778
            _this.value.b=b;
            //$LASTPOS=19002792;//kernel.Color:2792
            if (typeof  a==="number") {
              //$LASTPOS=19002816;//kernel.Color:2816
              _this.value.a=a;
            }
            //$LASTPOS=19002830;//kernel.Color:2830
            _this.fiber$clearHSLA(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=19002846;//kernel.Color:2846
            _this.fiber$clearName(_thread);
            __pc=3;return;
          case 3:
            
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    hasRGBA :function _trc_Color_hasRGBA() {
      "use strict";
      var _this=this;
      
      return _this.imageData||typeof  (_this.value.r)==="number";
    },
    fiber$hasRGBA :function _trc_Color_f_hasRGBA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.imageData||typeof  (_this.value.r)==="number";return;
      
      
      _thread.retVal=_this;return;
    },
    hasHSLA :function _trc_Color_hasHSLA() {
      "use strict";
      var _this=this;
      
      return typeof  (_this.value.h)==="number";
    },
    fiber$hasHSLA :function _trc_Color_f_hasHSLA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=typeof  (_this.value.h)==="number";return;
      
      
      _thread.retVal=_this;return;
    },
    hasName :function _trc_Color_hasName() {
      "use strict";
      var _this=this;
      
      return typeof  (_this.value.name)==="string";
    },
    fiber$hasName :function _trc_Color_f_hasName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=typeof  (_this.value.name)==="string";return;
      
      
      _thread.retVal=_this;return;
    },
    clearRGBA :function _trc_Color_clearRGBA() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19003067;//kernel.Color:3067
      delete _this.value.r;
    },
    fiber$clearRGBA :function _trc_Color_f_clearRGBA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19003067;//kernel.Color:3067
      delete _this.value.r;
      
      _thread.retVal=_this;return;
    },
    clearHSLA :function _trc_Color_clearHSLA() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19003104;//kernel.Color:3104
      delete _this.value.h;
    },
    fiber$clearHSLA :function _trc_Color_f_clearHSLA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19003104;//kernel.Color:3104
      delete _this.value.h;
      
      _thread.retVal=_this;return;
    },
    clearName :function _trc_Color_clearName() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19003141;//kernel.Color:3141
      delete _this.value.name;
    },
    fiber$clearName :function _trc_Color_f_clearName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19003141;//kernel.Color:3141
      delete _this.value.name;
      
      _thread.retVal=_this;return;
    },
    distRGBA :function _trc_Color_distRGBA(other) {
      "use strict";
      var _this=this;
      var dr;
      var dg;
      var db;
      var da;
      
      //$LASTPOS=19003185;//kernel.Color:3185
      if (other instanceof Tonyu.classes.kernel.Color) {
        
        
      } else {
        //$LASTPOS=19003217;//kernel.Color:3217
        other=new Tonyu.classes.kernel.Color(other+"");
        
      }
      //$LASTPOS=19003250;//kernel.Color:3250
      dr = (_this.r/_this.maxs.r-other.r/other.maxs.r);
      
      //$LASTPOS=19003292;//kernel.Color:3292
      dg = (_this.g/_this.maxs.g-other.g/other.maxs.g);
      
      //$LASTPOS=19003334;//kernel.Color:3334
      db = (_this.b/_this.maxs.b-other.b/other.maxs.b);
      
      //$LASTPOS=19003376;//kernel.Color:3376
      da = (_this.a/_this.maxs.a-other.a/other.maxs.a);
      
      return _this.sqrt(dr*dr+dg*dg+db*db+da*da);
    },
    fiber$distRGBA :function _trc_Color_f_distRGBA(_thread,other) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dr;
      var dg;
      var db;
      var da;
      
      //$LASTPOS=19003185;//kernel.Color:3185
      if (other instanceof Tonyu.classes.kernel.Color) {
        
        
      } else {
        //$LASTPOS=19003217;//kernel.Color:3217
        other=new Tonyu.classes.kernel.Color(other+"");
        
      }
      //$LASTPOS=19003250;//kernel.Color:3250
      dr = (_this.r/_this.maxs.r-other.r/other.maxs.r);
      
      //$LASTPOS=19003292;//kernel.Color:3292
      dg = (_this.g/_this.maxs.g-other.g/other.maxs.g);
      
      //$LASTPOS=19003334;//kernel.Color:3334
      db = (_this.b/_this.maxs.b-other.b/other.maxs.b);
      
      //$LASTPOS=19003376;//kernel.Color:3376
      da = (_this.a/_this.maxs.a-other.a/other.maxs.a);
      
      _thread.retVal=_this.sqrt(dr*dr+dg*dg+db*db+da*da);return;
      
      
      _thread.retVal=_this;return;
    },
    distHSLA :function _trc_Color_distHSLA(other) {
      "use strict";
      var _this=this;
      var dh;
      var ds;
      var dl;
      var da;
      
      //$LASTPOS=19003481;//kernel.Color:3481
      if (other instanceof Tonyu.classes.kernel.Color) {
        
        
      } else {
        //$LASTPOS=19003513;//kernel.Color:3513
        other=new Tonyu.classes.kernel.Color(other+"");
        
      }
      //$LASTPOS=19003546;//kernel.Color:3546
      dh = _this.angleDiff(_this.h,other.h)/180;
      
      //$LASTPOS=19003581;//kernel.Color:3581
      ds = (_this.s/_this.maxs.s-other.s/other.maxs.s);
      
      //$LASTPOS=19003623;//kernel.Color:3623
      dl = (_this.l/_this.maxs.l-other.l/other.maxs.l);
      
      //$LASTPOS=19003665;//kernel.Color:3665
      da = (_this.a/_this.maxs.a-other.a/other.maxs.a);
      
      return _this.sqrt(dh*dh+ds*ds+dl*dl+da*da);
    },
    fiber$distHSLA :function _trc_Color_f_distHSLA(_thread,other) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var dh;
      var ds;
      var dl;
      var da;
      
      //$LASTPOS=19003481;//kernel.Color:3481
      if (other instanceof Tonyu.classes.kernel.Color) {
        
        
      } else {
        //$LASTPOS=19003513;//kernel.Color:3513
        other=new Tonyu.classes.kernel.Color(other+"");
        
      }
      //$LASTPOS=19003546;//kernel.Color:3546
      dh = _this.angleDiff(_this.h,other.h)/180;
      
      //$LASTPOS=19003581;//kernel.Color:3581
      ds = (_this.s/_this.maxs.s-other.s/other.maxs.s);
      
      //$LASTPOS=19003623;//kernel.Color:3623
      dl = (_this.l/_this.maxs.l-other.l/other.maxs.l);
      
      //$LASTPOS=19003665;//kernel.Color:3665
      da = (_this.a/_this.maxs.a-other.a/other.maxs.a);
      
      _thread.retVal=_this.sqrt(dh*dh+ds*ds+dl*dl+da*da);return;
      
      
      _thread.retVal=_this;return;
    },
    makeRGBA :function _trc_Color_makeRGBA(force) {
      "use strict";
      var _this=this;
      var rgb;
      var i;
      
      //$LASTPOS=19003774;//kernel.Color:3774
      if (! force&&_this.hasRGBA()) {
        return _this;
      }
      //$LASTPOS=19003809;//kernel.Color:3809
      if (_this.hasHSLA()) {
        //$LASTPOS=19003829;//kernel.Color:3829
        rgb = _this.HSLToRGB(_this.value.h,_this.value.s,_this.value.l);
        
        //$LASTPOS=19003875;//kernel.Color:3875
        if (_this.imageData) {
          //$LASTPOS=19003896;//kernel.Color:3896
          //$LASTPOS=19003900;//kernel.Color:3900
          i = 0;
          for (; i<3 ; i++) {
            //$LASTPOS=19003917;//kernel.Color:3917
            _this.imageData.data[_this.index+i]=rgb[i]*_this.maxs.r;
          }
          
        } else {
          //$LASTPOS=19004011;//kernel.Color:4011
          _this.value.r=rgb[0]*_this.maxs.r;
          //$LASTPOS=19004038;//kernel.Color:4038
          _this.value.g=rgb[1]*_this.maxs.g;
          //$LASTPOS=19004065;//kernel.Color:4065
          _this.value.b=rgb[2]*_this.maxs.b;
          
        }
        return _this;
        
      }
      //$LASTPOS=19004110;//kernel.Color:4110
      _this.nameToRGB();
    },
    fiber$makeRGBA :function _trc_Color_f_makeRGBA(_thread,force) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rgb;
      var i;
      
      //$LASTPOS=19003774;//kernel.Color:3774
      if (! force&&_this.hasRGBA()) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Color_ent_makeRGBA(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19003809;//kernel.Color:3809
            if (!(_this.hasHSLA())) { __pc=2     ; break; }
            //$LASTPOS=19003829;//kernel.Color:3829
            _this.fiber$HSLToRGB(_thread, _this.value.h, _this.value.s, _this.value.l);
            __pc=1;return;
          case 1:
            rgb=_thread.retVal;
            
            //$LASTPOS=19003875;//kernel.Color:3875
            if (_this.imageData) {
              //$LASTPOS=19003896;//kernel.Color:3896
              //$LASTPOS=19003900;//kernel.Color:3900
              i = 0;
              for (; i<3 ; i++) {
                //$LASTPOS=19003917;//kernel.Color:3917
                _this.imageData.data[_this.index+i]=rgb[i]*_this.maxs.r;
              }
              
            } else {
              //$LASTPOS=19004011;//kernel.Color:4011
              _this.value.r=rgb[0]*_this.maxs.r;
              //$LASTPOS=19004038;//kernel.Color:4038
              _this.value.g=rgb[1]*_this.maxs.g;
              //$LASTPOS=19004065;//kernel.Color:4065
              _this.value.b=rgb[2]*_this.maxs.b;
              
            }
            _thread.exit(_this);return;
          case 2     :
            
            //$LASTPOS=19004110;//kernel.Color:4110
            _this.fiber$nameToRGB(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    nameToRGB :function _trc_Color_nameToRGB() {
      "use strict";
      var _this=this;
      var ctx;
      var d;
      var i;
      
      //$LASTPOS=19004144;//kernel.Color:4144
      ctx = _this.tmpCanvas();
      
      //$LASTPOS=19004167;//kernel.Color:4167
      ctx.fillStyle=_this.value.name;
      //$LASTPOS=19004195;//kernel.Color:4195
      ctx.fillRect(0,0,1,1);
      //$LASTPOS=19004220;//kernel.Color:4220
      d = ctx.getImageData(0,0,1,1);
      
      //$LASTPOS=19004255;//kernel.Color:4255
      d=d.data;
      //$LASTPOS=19004267;//kernel.Color:4267
      if (_this.imageData) {
        //$LASTPOS=19004287;//kernel.Color:4287
        //$LASTPOS=19004291;//kernel.Color:4291
        i = 0;
        for (; i<4 ; i++) {
          //$LASTPOS=19004308;//kernel.Color:4308
          _this.imageData.data[_this.index+i]=d[i];
        }
        
      } else {
        //$LASTPOS=19004352;//kernel.Color:4352
        _this.value.r=d[0];
        //$LASTPOS=19004369;//kernel.Color:4369
        _this.value.g=d[1];
        //$LASTPOS=19004386;//kernel.Color:4386
        _this.value.b=d[2];
        //$LASTPOS=19004403;//kernel.Color:4403
        _this.value.a=d[3];
        
      }
    },
    fiber$nameToRGB :function _trc_Color_f_nameToRGB(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var d;
      var i;
      
      
      _thread.enter(function _trc_Color_ent_nameToRGB(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19004144;//kernel.Color:4144
            _this.fiber$tmpCanvas(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=19004167;//kernel.Color:4167
            ctx.fillStyle=_this.value.name;
            //$LASTPOS=19004195;//kernel.Color:4195
            ctx.fillRect(0,0,1,1);
            //$LASTPOS=19004220;//kernel.Color:4220
            d = ctx.getImageData(0,0,1,1);
            
            //$LASTPOS=19004255;//kernel.Color:4255
            d=d.data;
            //$LASTPOS=19004267;//kernel.Color:4267
            if (_this.imageData) {
              //$LASTPOS=19004287;//kernel.Color:4287
              //$LASTPOS=19004291;//kernel.Color:4291
              i = 0;
              for (; i<4 ; i++) {
                //$LASTPOS=19004308;//kernel.Color:4308
                _this.imageData.data[_this.index+i]=d[i];
              }
              
            } else {
              //$LASTPOS=19004352;//kernel.Color:4352
              _this.value.r=d[0];
              //$LASTPOS=19004369;//kernel.Color:4369
              _this.value.g=d[1];
              //$LASTPOS=19004386;//kernel.Color:4386
              _this.value.b=d[2];
              //$LASTPOS=19004403;//kernel.Color:4403
              _this.value.a=d[3];
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    makeHSLA :function _trc_Color_makeHSLA() {
      "use strict";
      var _this=this;
      var hsl;
      
      //$LASTPOS=19004441;//kernel.Color:4441
      if (_this.hasHSLA()) {
        return _this;
      }
      //$LASTPOS=19004466;//kernel.Color:4466
      if (! _this.hasRGBA()) {
        //$LASTPOS=19004482;//kernel.Color:4482
        _this.nameToRGB();
      }
      //$LASTPOS=19004497;//kernel.Color:4497
      hsl = _this.RGBToHSL(_this.value.r/_this.maxs.r,_this.value.g/_this.maxs.g,_this.value.b/_this.maxs.b);
      
      //$LASTPOS=19004563;//kernel.Color:4563
      _this.value.h=hsl[0];
      //$LASTPOS=19004581;//kernel.Color:4581
      _this.value.s=hsl[1];
      //$LASTPOS=19004599;//kernel.Color:4599
      _this.value.l=hsl[2];
      return _this;
    },
    fiber$makeHSLA :function _trc_Color_f_makeHSLA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var hsl;
      
      //$LASTPOS=19004441;//kernel.Color:4441
      if (_this.hasHSLA()) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Color_ent_makeHSLA(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19004466;//kernel.Color:4466
            if (!(! _this.hasRGBA())) { __pc=2     ; break; }
            //$LASTPOS=19004482;//kernel.Color:4482
            _this.fiber$nameToRGB(_thread);
            __pc=1;return;
          case 1:
            
          case 2     :
            
            //$LASTPOS=19004497;//kernel.Color:4497
            _this.fiber$RGBToHSL(_thread, _this.value.r/_this.maxs.r, _this.value.g/_this.maxs.g, _this.value.b/_this.maxs.b);
            __pc=3;return;
          case 3:
            hsl=_thread.retVal;
            
            //$LASTPOS=19004563;//kernel.Color:4563
            _this.value.h=hsl[0];
            //$LASTPOS=19004581;//kernel.Color:4581
            _this.value.s=hsl[1];
            //$LASTPOS=19004599;//kernel.Color:4599
            _this.value.l=hsl[2];
            _thread.exit(_this);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    makeName :function _trc_Color_makeName(type) {
      "use strict";
      var _this=this;
      function p(r) {
        
        return _this.floor(r*100)+"%";
      }
      //$LASTPOS=19004649;//kernel.Color:4649
      if (_this.hasName()) {
        return _this;
      }
      //$LASTPOS=19004674;//kernel.Color:4674
      type=type||"rgb";
      //$LASTPOS=19004694;//kernel.Color:4694
      if (type=="rgb") {
        //$LASTPOS=19004716;//kernel.Color:4716
        _this.makeRGBA();
        //$LASTPOS=19004731;//kernel.Color:4731
        if (_this.imageData) {
          //$LASTPOS=19004752;//kernel.Color:4752
          _this.value.name="rgba("+[_this.floor(_this.imageData.data[_this.index]),_this.floor(_this.imageData.data[_this.index+1]),_this.floor(_this.imageData.data[_this.index+2]),_this.imageData.data[_this.index+3]/_this.maxs.a].join(",")+")";
          
        } else {
          //$LASTPOS=19004926;//kernel.Color:4926
          _this.value.name="rgba("+[_this.floor(_this.value.r),_this.floor(_this.value.g),_this.floor(_this.value.b),_this.value.a/_this.maxs.a].join(",")+")";
          
        }
        
      }
      //$LASTPOS=19005033;//kernel.Color:5033
      if (type=="hsl") {
        //$LASTPOS=19005055;//kernel.Color:5055
        _this.makeHSLA();
        //$LASTPOS=19005070;//kernel.Color:5070
        _this.value.name="hsla("+[_this.floor(_this.value.h),p(_this.value.s),p(_this.value.l),_this.value.a/_this.maxs.a].join(",")+")";
        
      }
      
    },
    fiber$makeName :function _trc_Color_f_makeName(_thread,type) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      function p(r) {
        
        return _this.floor(r*100)+"%";
      }
      //$LASTPOS=19004649;//kernel.Color:4649
      if (_this.hasName()) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=19004674;//kernel.Color:4674
      type=type||"rgb";
      
      _thread.enter(function _trc_Color_ent_makeName(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19004694;//kernel.Color:4694
            if (!(type=="rgb")) { __pc=2     ; break; }
            //$LASTPOS=19004716;//kernel.Color:4716
            _this.fiber$makeRGBA(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=19004731;//kernel.Color:4731
            if (_this.imageData) {
              //$LASTPOS=19004752;//kernel.Color:4752
              _this.value.name="rgba("+[_this.floor(_this.imageData.data[_this.index]),_this.floor(_this.imageData.data[_this.index+1]),_this.floor(_this.imageData.data[_this.index+2]),_this.imageData.data[_this.index+3]/_this.maxs.a].join(",")+")";
              
            } else {
              //$LASTPOS=19004926;//kernel.Color:4926
              _this.value.name="rgba("+[_this.floor(_this.value.r),_this.floor(_this.value.g),_this.floor(_this.value.b),_this.value.a/_this.maxs.a].join(",")+")";
              
            }
          case 2     :
            
            //$LASTPOS=19005033;//kernel.Color:5033
            if (!(type=="hsl")) { __pc=4     ; break; }
            //$LASTPOS=19005055;//kernel.Color:5055
            _this.fiber$makeHSLA(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=19005070;//kernel.Color:5070
            _this.value.name="hsla("+[_this.floor(_this.value.h),p(_this.value.s),p(_this.value.l),_this.value.a/_this.maxs.a].join(",")+")";
          case 4     :
            
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    toString :function _trc_Color_toString() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19005231;//kernel.Color:5231
      _this.makeName();
      return _this.value.name;
    },
    tmpCanvas :function _trc_Color_tmpCanvas() {
      "use strict";
      var _this=this;
      var cv;
      
      //$LASTPOS=19005285;//kernel.Color:5285
      if (Tonyu.classes.kernel.Color.ctx) {
        return Tonyu.classes.kernel.Color.ctx;
      }
      //$LASTPOS=19005320;//kernel.Color:5320
      cv = $("<canvas>").attr({width: 1,height: 1}).css({display: "none"}).appendTo("body");
      
      //$LASTPOS=19005404;//kernel.Color:5404
      Tonyu.classes.kernel.Color.ctx=cv[0].getContext("2d");
      return Tonyu.classes.kernel.Color.ctx;
    },
    fiber$tmpCanvas :function _trc_Color_f_tmpCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cv;
      
      //$LASTPOS=19005285;//kernel.Color:5285
      if (Tonyu.classes.kernel.Color.ctx) {
        _thread.retVal=Tonyu.classes.kernel.Color.ctx;return;
        
      }
      //$LASTPOS=19005320;//kernel.Color:5320
      cv = $("<canvas>").attr({width: 1,height: 1}).css({display: "none"}).appendTo("body");
      
      //$LASTPOS=19005404;//kernel.Color:5404
      Tonyu.classes.kernel.Color.ctx=cv[0].getContext("2d");
      _thread.retVal=Tonyu.classes.kernel.Color.ctx;return;
      
      
      _thread.retVal=_this;return;
    },
    RGBToHSL :function _trc_Color_RGBToHSL(r,g,b) {
      "use strict";
      var _this=this;
      var min;
      var max;
      var diff;
      var h;
      var s;
      var l;
      
      //$LASTPOS=19005544;//kernel.Color:5544
      min = Tonyu.globals.$Math.min(r,g,b);
      max = Tonyu.globals.$Math.max(r,g,b);
      diff = max-min;
      h = 0;
      s = 0;
      l = (min+max)/2;
      
      //$LASTPOS=19005665;//kernel.Color:5665
      if (diff!=0) {
        //$LASTPOS=19005685;//kernel.Color:5685
        s=l<0.5?diff/(max+min):diff/(2-max-min);
        //$LASTPOS=19005749;//kernel.Color:5749
        h=(r==max?(g-b)/diff:g==max?2+(b-r)/diff:4+(r-g)/diff)*60;
        
      }
      return [h,s,l];
    },
    fiber$RGBToHSL :function _trc_Color_f_RGBToHSL(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var min;
      var max;
      var diff;
      var h;
      var s;
      var l;
      
      //$LASTPOS=19005544;//kernel.Color:5544
      min = Tonyu.globals.$Math.min(r,g,b);
      max = Tonyu.globals.$Math.max(r,g,b);
      diff = max-min;
      h = 0;
      s = 0;
      l = (min+max)/2;
      
      //$LASTPOS=19005665;//kernel.Color:5665
      if (diff!=0) {
        //$LASTPOS=19005685;//kernel.Color:5685
        s=l<0.5?diff/(max+min):diff/(2-max-min);
        //$LASTPOS=19005749;//kernel.Color:5749
        h=(r==max?(g-b)/diff:g==max?2+(b-r)/diff:4+(r-g)/diff)*60;
        
      }
      _thread.retVal=[h,s,l];return;
      
      
      _thread.retVal=_this;return;
    },
    HSLToRGB :function _trc_Color_HSLToRGB(h,s,l) {
      "use strict";
      var _this=this;
      var temp2;
      var temp1;
      var rtemp;
      var gtemp;
      var btemp;
      var rgb;
      var i;
      
      //$LASTPOS=19005903;//kernel.Color:5903
      if (s==0) {
        return [l,l,l];
        
      }
      //$LASTPOS=19005946;//kernel.Color:5946
      temp2 = l<0.5?l*(1+s):l+s-l*s;
      
      //$LASTPOS=19005999;//kernel.Color:5999
      temp1 = 2*l-temp2;
      
      //$LASTPOS=19006030;//kernel.Color:6030
      h/=360;
      //$LASTPOS=19006044;//kernel.Color:6044
      rtemp = (h+1/3)%1;
      gtemp = h;
      btemp = (h+2/3)%1;
      rgb = [rtemp,gtemp,btemp];
      i = 0;
      
      //$LASTPOS=19006159;//kernel.Color:6159
      ;
      
      while(i<3) {
        {
          //$LASTPOS=19006183;//kernel.Color:6183
          rgb[i]=rgb[i]<1/6?temp1+(temp2-temp1)*6*rgb[i]:rgb[i]<1/2?temp2:rgb[i]<2/3?temp1+(temp2-temp1)*6*(2/3-rgb[i]):temp1;
        }
        ++ i;
      }
      return rgb;
    },
    fiber$HSLToRGB :function _trc_Color_f_HSLToRGB(_thread,h,s,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var temp2;
      var temp1;
      var rtemp;
      var gtemp;
      var btemp;
      var rgb;
      var i;
      
      //$LASTPOS=19005903;//kernel.Color:5903
      if (s==0) {
        _thread.retVal=[l,l,l];return;
        
        
      }
      //$LASTPOS=19005946;//kernel.Color:5946
      temp2 = l<0.5?l*(1+s):l+s-l*s;
      
      //$LASTPOS=19005999;//kernel.Color:5999
      temp1 = 2*l-temp2;
      
      //$LASTPOS=19006030;//kernel.Color:6030
      h/=360;
      //$LASTPOS=19006044;//kernel.Color:6044
      rtemp = (h+1/3)%1;
      gtemp = h;
      btemp = (h+2/3)%1;
      rgb = [rtemp,gtemp,btemp];
      i = 0;
      
      //$LASTPOS=19006159;//kernel.Color:6159
      ;
      
      while(i<3) {
        {
          //$LASTPOS=19006183;//kernel.Color:6183
          rgb[i]=rgb[i]<1/6?temp1+(temp2-temp1)*6*rgb[i]:rgb[i]<1/2?temp2:rgb[i]<2/3?temp1+(temp2-temp1)*6*(2/3-rgb[i]):temp1;
        }
        ++ i;
      }
      _thread.retVal=rgb;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"fillNum":{"nowait":false},"__getter__r":{"nowait":true},"__getter__g":{"nowait":true},"__getter__b":{"nowait":true},"__getter__a":{"nowait":true},"__setter__a":{"nowait":true},"__setter__r":{"nowait":true},"__setter__g":{"nowait":true},"__setter__b":{"nowait":true},"__getter__h":{"nowait":true},"__getter__s":{"nowait":true},"__getter__l":{"nowait":true},"__setter__h":{"nowait":true},"__setter__s":{"nowait":true},"__setter__l":{"nowait":true},"setHSLA":{"nowait":false},"setRGBA":{"nowait":false},"hasRGBA":{"nowait":false},"hasHSLA":{"nowait":false},"hasName":{"nowait":false},"clearRGBA":{"nowait":false},"clearHSLA":{"nowait":false},"clearName":{"nowait":false},"distRGBA":{"nowait":false},"distHSLA":{"nowait":false},"makeRGBA":{"nowait":false},"nameToRGB":{"nowait":false},"makeHSLA":{"nowait":false},"makeName":{"nowait":false},"toString":{"nowait":true},"tmpCanvas":{"nowait":false},"RGBToHSL":{"nowait":false},"HSLToRGB":{"nowait":false}},"fields":{"maxs":{},"imageData":{},"index":{},"value":{},"type":{},"r":{},"g":{},"b":{},"a":{},"h":{},"s":{},"l":{}}}
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
      
      //$LASTPOS=20000054;//kernel.OneframeSprite:54
      _this.extend(params);
      //$LASTPOS=20000075;//kernel.OneframeSprite:75
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=20000127;//kernel.OneframeSprite:127
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=20000165;//kernel.OneframeSprite:165
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
      
      //$LASTPOS=21000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=21000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=21000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=21000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2     ; break; }
            //$LASTPOS=21000134;//kernel.MML:134
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
      
      //$LASTPOS=21000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=21000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=21000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=21000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=21000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=21000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=21000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=21000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=21000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=21000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=21000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=21000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=21000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=21000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=21000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=21000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=21000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=21000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=21000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=21000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=21000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=21000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=21000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=21000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=21000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=21000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=21000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=21000616;//kernel.MML:616
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
      
      //$LASTPOS=21000755;//kernel.MML:755
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
      
      //$LASTPOS=21000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=21000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=21000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=21000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=21000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=21000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=21000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=21000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=21001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=21000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=21000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=21000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=21000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=21000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=21000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=21000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=21001056;//kernel.MML:1056
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
      
      //$LASTPOS=22000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=22000040;//kernel.WaveTable:40
      _this.env={};
      //$LASTPOS=22000335;//kernel.WaveTable:335
      if (typeof  T!=="undefined") {
        //$LASTPOS=22000416;//kernel.WaveTable:416
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=22000485;//kernel.WaveTable:485
        _this.setEnv(0,_this.env);
        //$LASTPOS=22000506;//kernel.WaveTable:506
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=22000040;//kernel.WaveTable:40
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22000335;//kernel.WaveTable:335
            if (!(typeof  T!=="undefined")) { __pc=3     ; break; }
            //$LASTPOS=22000416;//kernel.WaveTable:416
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=22000485;//kernel.WaveTable:485
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=22000506;//kernel.WaveTable:506
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
      
      //$LASTPOS=22000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=22000123;//kernel.WaveTable:123
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000123;//kernel.WaveTable:123
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      "use strict";
      var _this=this;
      var synth;
      
      //$LASTPOS=22000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=22000160;//kernel.WaveTable:160
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
      
      //$LASTPOS=23000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col+"";
      //$LASTPOS=23000072;//kernel.T1Line:72
      ctx.beginPath();
      //$LASTPOS=23000094;//kernel.T1Line:94
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=23000116;//kernel.T1Line:116
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=23000140;//kernel.T1Line:140
      ctx.stroke();
      //$LASTPOS=23000159;//kernel.T1Line:159
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Line_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col+"";
      //$LASTPOS=23000072;//kernel.T1Line:72
      ctx.beginPath();
      //$LASTPOS=23000094;//kernel.T1Line:94
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=23000116;//kernel.T1Line:116
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=23000140;//kernel.T1Line:140
      ctx.stroke();
      //$LASTPOS=23000159;//kernel.T1Line:159
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
      
      //$LASTPOS=24000041;//kernel.T1Rect:41
      ctx.fillStyle=_this.col+"";
      //$LASTPOS=24000067;//kernel.T1Rect:67
      ctx.fillRect(_this.x,_this.y,_this.w,_this.h);
      //$LASTPOS=24000094;//kernel.T1Rect:94
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Rect_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000041;//kernel.T1Rect:41
      ctx.fillStyle=_this.col+"";
      //$LASTPOS=24000067;//kernel.T1Rect:67
      ctx.fillRect(_this.x,_this.y,_this.w,_this.h);
      //$LASTPOS=24000094;//kernel.T1Rect:94
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
      
      //$LASTPOS=25000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=25000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=25000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=25000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=25000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=25000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=25000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=25000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=25000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=25000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=25000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=25000585;//kernel.T1Sprite:585
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Sprite_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sgn;
      
      //$LASTPOS=25000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=25000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=25000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=25000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=25000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=25000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=25000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=25000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=25000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=25000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=25000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=25000585;//kernel.T1Sprite:585
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
      
      //$LASTPOS=26000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=26000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=26000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=26000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=26000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=26000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=26000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=26000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=26000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=26000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col+"";
      //$LASTPOS=26000286;//kernel.T1Text:286
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=26000323;//kernel.T1Text:323
      _this.height=0;
      //$LASTPOS=26000332;//kernel.T1Text:332
      _this.width=0;
      //$LASTPOS=26000346;//kernel.T1Text:346
      //$LASTPOS=26000350;//kernel.T1Text:350
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=26000417;//kernel.T1Text:417
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=26000509;//kernel.T1Text:509
          if (_this.width<rect.w) {
            //$LASTPOS=26000526;//kernel.T1Text:526
            _this.width=rect.w;
          }
          //$LASTPOS=26000549;//kernel.T1Text:549
          _this.height+=rect.h;
          //$LASTPOS=26000574;//kernel.T1Text:574
          drawY+=_this.size;
        }
      }
      //$LASTPOS=26000599;//kernel.T1Text:599
      _this.owner.width=_this.width;
      //$LASTPOS=26000623;//kernel.T1Text:623
      _this.owner.height=_this.height;
      //$LASTPOS=26000649;//kernel.T1Text:649
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
      
      //$LASTPOS=26000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=26000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=26000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=26000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=26000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=26000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=26000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=26000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=26000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=26000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col+"";
      //$LASTPOS=26000286;//kernel.T1Text:286
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=26000323;//kernel.T1Text:323
      _this.height=0;
      //$LASTPOS=26000332;//kernel.T1Text:332
      _this.width=0;
      //$LASTPOS=26000346;//kernel.T1Text:346
      //$LASTPOS=26000350;//kernel.T1Text:350
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=26000417;//kernel.T1Text:417
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=26000509;//kernel.T1Text:509
          if (_this.width<rect.w) {
            //$LASTPOS=26000526;//kernel.T1Text:526
            _this.width=rect.w;
          }
          //$LASTPOS=26000549;//kernel.T1Text:549
          _this.height+=rect.h;
          //$LASTPOS=26000574;//kernel.T1Text:574
          drawY+=_this.size;
        }
      }
      //$LASTPOS=26000599;//kernel.T1Text:599
      _this.owner.width=_this.width;
      //$LASTPOS=26000623;//kernel.T1Text:623
      _this.owner.height=_this.height;
      //$LASTPOS=26000649;//kernel.T1Text:649
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
      
      //$LASTPOS=27000064;//kernel.Scheduler:64
      _this.cur=[];
      //$LASTPOS=27000073;//kernel.Scheduler:73
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000064;//kernel.Scheduler:64
      _this.cur=[];
      //$LASTPOS=27000073;//kernel.Scheduler:73
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
      
      //$LASTPOS=27000228;//kernel.Scheduler:228
      name=name||"main";
      //$LASTPOS=27000252;//kernel.Scheduler:252
      args=args||[];
      //$LASTPOS=27000272;//kernel.Scheduler:272
      th = Tonyu.thread();
      
      //$LASTPOS=27000300;//kernel.Scheduler:300
      th.apply(obj,name,args);
      //$LASTPOS=27000330;//kernel.Scheduler:330
      th.name=(obj.getClassInfo?obj.getClassInfo().shortName:"Unknown")+"::"+name;
      //$LASTPOS=27000413;//kernel.Scheduler:413
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=27000228;//kernel.Scheduler:228
      name=name||"main";
      //$LASTPOS=27000252;//kernel.Scheduler:252
      args=args||[];
      //$LASTPOS=27000272;//kernel.Scheduler:272
      th = Tonyu.thread();
      
      //$LASTPOS=27000300;//kernel.Scheduler:300
      th.apply(obj,name,args);
      //$LASTPOS=27000330;//kernel.Scheduler:330
      th.name=(obj.getClassInfo?obj.getClassInfo().shortName:"Unknown")+"::"+name;
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000413;//kernel.Scheduler:413
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
      
      //$LASTPOS=27000468;//kernel.Scheduler:468
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=27000499;//kernel.Scheduler:499
      _this.cur.push(th);
      //$LASTPOS=27000518;//kernel.Scheduler:518
      th.scheduled=_this;
      //$LASTPOS=27000542;//kernel.Scheduler:542
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=27000573;//kernel.Scheduler:573
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=27000605;//kernel.Scheduler:605
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのスレッドを作りすぎています");
          
        }
        
      }
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000468;//kernel.Scheduler:468
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=27000499;//kernel.Scheduler:499
      _this.cur.push(th);
      //$LASTPOS=27000518;//kernel.Scheduler:518
      th.scheduled=_this;
      //$LASTPOS=27000542;//kernel.Scheduler:542
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=27000573;//kernel.Scheduler:573
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=27000605;//kernel.Scheduler:605
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのスレッドを作りすぎています");
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000708;//kernel.Scheduler:708
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=27000739;//kernel.Scheduler:739
      _this.next.push(th);
      //$LASTPOS=27000759;//kernel.Scheduler:759
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000708;//kernel.Scheduler:708
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=27000739;//kernel.Scheduler:739
      _this.next.push(th);
      //$LASTPOS=27000759;//kernel.Scheduler:759
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    unschedule :function _trc_Scheduler_unschedule(th) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=27000805;//kernel.Scheduler:805
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=27000833;//kernel.Scheduler:833
      if (i>=0) {
        //$LASTPOS=27000854;//kernel.Scheduler:854
        _this.cur.splice(i,1);
        //$LASTPOS=27000880;//kernel.Scheduler:880
        delete th.scheduled;
        
      } else {
        //$LASTPOS=27000921;//kernel.Scheduler:921
        i=_this.next.indexOf(th);
        //$LASTPOS=27000947;//kernel.Scheduler:947
        if (i>=0) {
          //$LASTPOS=27000968;//kernel.Scheduler:968
          _this.next.splice(i,1);
          //$LASTPOS=27000998;//kernel.Scheduler:998
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
      
      //$LASTPOS=27000805;//kernel.Scheduler:805
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=27000833;//kernel.Scheduler:833
      if (i>=0) {
        //$LASTPOS=27000854;//kernel.Scheduler:854
        _this.cur.splice(i,1);
        //$LASTPOS=27000880;//kernel.Scheduler:880
        delete th.scheduled;
        
      } else {
        //$LASTPOS=27000921;//kernel.Scheduler:921
        i=_this.next.indexOf(th);
        //$LASTPOS=27000947;//kernel.Scheduler:947
        if (i>=0) {
          //$LASTPOS=27000968;//kernel.Scheduler:968
          _this.next.splice(i,1);
          //$LASTPOS=27000998;//kernel.Scheduler:998
          delete th.scheduled;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    checkTimeout :function _trc_Scheduler_checkTimeout() {
      "use strict";
      var _this=this;
      var now;
      
      //$LASTPOS=27001061;//kernel.Scheduler:1061
      now = new Date().getTime();
      
      //$LASTPOS=27001096;//kernel.Scheduler:1096
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
      
      //$LASTPOS=27001061;//kernel.Scheduler:1061
      now = new Date().getTime();
      
      //$LASTPOS=27001096;//kernel.Scheduler:1096
      if (now-_this.lastSteps>1000) {
        throw new Error("待機不能モードでupdateが呼ばれています．ブラウザが固まるのを防ぐために停止します．");
        
        
      }
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      "use strict";
      var _this=this;
      var t;
      var _it_234;
      
      //$LASTPOS=27001226;//kernel.Scheduler:1226
      _this.lastSteps=new Date().getTime();
      //$LASTPOS=27001263;//kernel.Scheduler:1263
      _it_234=Tonyu.iterator(_this.cur,1);
      while(_it_234.next()) {
        t=_it_234[0];
        
        //$LASTPOS=27001290;//kernel.Scheduler:1290
        delete t.scheduled;
        //$LASTPOS=27001316;//kernel.Scheduler:1316
        if (t.waitCount) {
          //$LASTPOS=27001345;//kernel.Scheduler:1345
          t.waitCount--;
          //$LASTPOS=27001373;//kernel.Scheduler:1373
          _this.addToNext(t);
          
        } else {
          //$LASTPOS=27001462;//kernel.Scheduler:1462
          t.steps();
          //$LASTPOS=27001536;//kernel.Scheduler:1536
          if (t.preempted) {
            //$LASTPOS=27001621;//kernel.Scheduler:1621
            _this.addToNext(t);
            
          }
          
        }
        
      }
      //$LASTPOS=27001673;//kernel.Scheduler:1673
      _this.cur=_this.next;
      //$LASTPOS=27001688;//kernel.Scheduler:1688
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_234;
      
      //$LASTPOS=27001226;//kernel.Scheduler:1226
      _this.lastSteps=new Date().getTime();
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27001263;//kernel.Scheduler:1263
            _it_234=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_234.next())) { __pc=7     ; break; }
            t=_it_234[0];
            
            //$LASTPOS=27001290;//kernel.Scheduler:1290
            delete t.scheduled;
            //$LASTPOS=27001316;//kernel.Scheduler:1316
            if (!(t.waitCount)) { __pc=3     ; break; }
            //$LASTPOS=27001345;//kernel.Scheduler:1345
            t.waitCount--;
            //$LASTPOS=27001373;//kernel.Scheduler:1373
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
            __pc=6     ;break;
          case 3     :
            //$LASTPOS=27001462;//kernel.Scheduler:1462
            t.steps();
            //$LASTPOS=27001536;//kernel.Scheduler:1536
            if (!(t.preempted)) { __pc=5     ; break; }
            //$LASTPOS=27001621;//kernel.Scheduler:1621
            _this.fiber$addToNext(_thread, t);
            __pc=4;return;
          case 4:
            
          case 5     :
            
          case 6     :
            
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=27001673;//kernel.Scheduler:1673
            _this.cur=_this.next;
            //$LASTPOS=27001688;//kernel.Scheduler:1688
            _this.next=[];
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__allThreads :function _trc_Scheduler___getter__allThreads() {
      "use strict";
      var _this=this;
      
      return _this.cur.concat(_this.next);
    },
    findByThreadGroup :function _trc_Scheduler_findByThreadGroup(o) {
      "use strict";
      var _this=this;
      
      return _this.allThreads.filter((function anonymous_1803(t) {
        
        return t._threadGroup===o;
      }));
    },
    fiber$findByThreadGroup :function _trc_Scheduler_f_findByThreadGroup(_thread,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allThreads.filter((function anonymous_1803(t) {
        
        return t._threadGroup===o;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"unschedule":{"nowait":false},"checkTimeout":{"nowait":false},"stepsAll":{"nowait":false},"__getter__allThreads":{"nowait":true},"findByThreadGroup":{"nowait":false}},"fields":{"cur":{},"next":{},"lastSteps":{},"allThreads":{}}}
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
      
      
      //$LASTPOS=28000078;//kernel.DialogMod:78
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
            //$LASTPOS=28000078;//kernel.DialogMod:78
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
      
      
      //$LASTPOS=28000173;//kernel.DialogMod:173
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
            //$LASTPOS=28000173;//kernel.DialogMod:173
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
      
      
      //$LASTPOS=28000255;//kernel.DialogMod:255
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
            //$LASTPOS=28000255;//kernel.DialogMod:255
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
      
      
      //$LASTPOS=28000333;//kernel.DialogMod:333
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
            //$LASTPOS=28000333;//kernel.DialogMod:333
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
      
      //$LASTPOS=29000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=29000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=29000239;//kernel.Keys:239
      //$LASTPOS=29000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=29000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=29000327;//kernel.Keys:327
      //$LASTPOS=29000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=29000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=29000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=29000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=29000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=29000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=29000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=29000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=29000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=29000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=29000787;//kernel.Keys:787
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=29000826;//kernel.Keys:826
        $(document).mouseup((function anonymous_846(e) {
          var a;
          
          //$LASTPOS=29000862;//kernel.Keys:862
          a = (function anonymous_868() {
            
            //$LASTPOS=29001035;//kernel.Keys:1035
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=29001080;//kernel.Keys:1080
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=29001146;//kernel.Keys:1146
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=29001221;//kernel.Keys:1221
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
      
      //$LASTPOS=29000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=29000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=29000239;//kernel.Keys:239
      //$LASTPOS=29000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=29000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=29000327;//kernel.Keys:327
      //$LASTPOS=29000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=29000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=29000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=29000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=29000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=29000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=29000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=29000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=29000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=29000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=29000787;//kernel.Keys:787
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=29000826;//kernel.Keys:826
        $(document).mouseup((function anonymous_846(e) {
          var a;
          
          //$LASTPOS=29000862;//kernel.Keys:862
          a = (function anonymous_868() {
            
            //$LASTPOS=29001035;//kernel.Keys:1035
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=29001080;//kernel.Keys:1080
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=29001146;//kernel.Keys:1146
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=29001221;//kernel.Keys:1221
            a();
            
          }
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29001278;//kernel.Keys:1278
      if (typeof  code=="string") {
        //$LASTPOS=29001316;//kernel.Keys:1316
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=29001360;//kernel.Keys:1360
      if (! code) {
        return 0;
      }
      //$LASTPOS=29001386;//kernel.Keys:1386
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=29001422;//kernel.Keys:1422
      if (! _this.stats[code]) {
        //$LASTPOS=29001440;//kernel.Keys:1440
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29001278;//kernel.Keys:1278
      if (typeof  code=="string") {
        //$LASTPOS=29001316;//kernel.Keys:1316
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=29001360;//kernel.Keys:1360
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=29001386;//kernel.Keys:1386
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=29001422;//kernel.Keys:1422
      if (! _this.stats[code]) {
        //$LASTPOS=29001440;//kernel.Keys:1440
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_247;
      
      //$LASTPOS=29001509;//kernel.Keys:1509
      _it_247=Tonyu.iterator(_this.stats,1);
      while(_it_247.next()) {
        i=_it_247[0];
        
        //$LASTPOS=29001541;//kernel.Keys:1541
        if (_this.stats[i]>0) {
          //$LASTPOS=29001558;//kernel.Keys:1558
          _this.stats[i]++;
          
        }
        //$LASTPOS=29001580;//kernel.Keys:1580
        if (_this.stats[i]==- 1) {
          //$LASTPOS=29001598;//kernel.Keys:1598
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=29001622;//kernel.Keys:1622
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=29001687;//kernel.Keys:1687
        _this.reservedAction.action();
        //$LASTPOS=29001721;//kernel.Keys:1721
        _this.reservedAction=null;
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_247;
      
      //$LASTPOS=29001509;//kernel.Keys:1509
      _it_247=Tonyu.iterator(_this.stats,1);
      while(_it_247.next()) {
        i=_it_247[0];
        
        //$LASTPOS=29001541;//kernel.Keys:1541
        if (_this.stats[i]>0) {
          //$LASTPOS=29001558;//kernel.Keys:1558
          _this.stats[i]++;
          
        }
        //$LASTPOS=29001580;//kernel.Keys:1580
        if (_this.stats[i]==- 1) {
          //$LASTPOS=29001598;//kernel.Keys:1598
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=29001622;//kernel.Keys:1622
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=29001687;//kernel.Keys:1687
        _this.reservedAction.action();
        //$LASTPOS=29001721;//kernel.Keys:1721
        _this.reservedAction=null;
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=29001772;//kernel.Keys:1772
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=29001801;//kernel.Keys:1801
      if (! s) {
        //$LASTPOS=29001820;//kernel.Keys:1820
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=29001852;//kernel.Keys:1852
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=29001772;//kernel.Keys:1772
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=29001801;//kernel.Keys:1801
      if (! s) {
        //$LASTPOS=29001820;//kernel.Keys:1820
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=29001852;//kernel.Keys:1852
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29001905;//kernel.Keys:1905
      _this.stats[e.keyCode]=0;
      //$LASTPOS=29001930;//kernel.Keys:1930
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29001905;//kernel.Keys:1905
      _this.stats[e.keyCode]=0;
      //$LASTPOS=29001930;//kernel.Keys:1930
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}},"fields":{"stats":{},"codes":{},"i":{},"lastMouseDown":{},"reservedAction":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Vec3',
  shortName: 'Vec3',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_Vec3_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Vec3_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Vec3_initialize(x,y,z) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000080;//kernel.Vec3:80
      _this.x=x||0;
      //$LASTPOS=30000098;//kernel.Vec3:98
      _this.y=y||0;
      //$LASTPOS=30000116;//kernel.Vec3:116
      _this.z=z||0;
    },
    checkNum :function _trc_Vec3_checkNum(o) {
      "use strict";
      var _this=this;
      var name;
      var val;
      var _it_251;
      
      //$LASTPOS=30000153;//kernel.Vec3:153
      _it_251=Tonyu.iterator(o,2);
      while(_it_251.next()) {
        name=_it_251[0];
        val=_it_251[1];
        
        //$LASTPOS=30000188;//kernel.Vec3:188
        if (typeof  val!=="number") {
          throw new Error(name+"("+val+")は数値ではありません．");
          
          
        }
        
      }
    },
    fiber$checkNum :function _trc_Vec3_f_checkNum(_thread,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var name;
      var val;
      var _it_251;
      
      //$LASTPOS=30000153;//kernel.Vec3:153
      _it_251=Tonyu.iterator(o,2);
      while(_it_251.next()) {
        name=_it_251[0];
        val=_it_251[1];
        
        //$LASTPOS=30000188;//kernel.Vec3:188
        if (typeof  val!=="number") {
          throw new Error(name+"("+val+")は数値ではありません．");
          
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    parsePointArgs :function _trc_Vec3_parsePointArgs(args) {
      "use strict";
      var _this=this;
      var a;
      var p;
      
      //$LASTPOS=30000327;//kernel.Vec3:327
      a = new Tonyu.classes.kernel.ArgParser(args);
      
      //$LASTPOS=30000359;//kernel.Vec3:359
      p = a.shift(Object);
      
      //$LASTPOS=30000387;//kernel.Vec3:387
      if (! p) {
        //$LASTPOS=30000406;//kernel.Vec3:406
        p={};
        //$LASTPOS=30000421;//kernel.Vec3:421
        p.x=a.shift();
        //$LASTPOS=30000445;//kernel.Vec3:445
        p.y=a.shift();
        //$LASTPOS=30000469;//kernel.Vec3:469
        p.z=a.shift();
        
      }
      return p;
    },
    fiber$parsePointArgs :function _trc_Vec3_f_parsePointArgs(_thread,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var p;
      
      //$LASTPOS=30000327;//kernel.Vec3:327
      a = new Tonyu.classes.kernel.ArgParser(args);
      
      //$LASTPOS=30000359;//kernel.Vec3:359
      p = a.shift(Object);
      
      //$LASTPOS=30000387;//kernel.Vec3:387
      if (! p) {
        //$LASTPOS=30000406;//kernel.Vec3:406
        p={};
        //$LASTPOS=30000421;//kernel.Vec3:421
        p.x=a.shift();
        //$LASTPOS=30000445;//kernel.Vec3:445
        p.y=a.shift();
        //$LASTPOS=30000469;//kernel.Vec3:469
        p.z=a.shift();
        
      }
      _thread.retVal=p;return;
      
      
      _thread.retVal=_this;return;
    },
    addX :function _trc_Vec3_addX() {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=30000533;//kernel.Vec3:533
      p = _this.parsePointArgs(arguments);
      
      //$LASTPOS=30000571;//kernel.Vec3:571
      _this.x+=p.x;
      //$LASTPOS=30000584;//kernel.Vec3:584
      _this.y+=p.y;
      //$LASTPOS=30000597;//kernel.Vec3:597
      _this.z+=p.z;
      return _this;
    },
    fiber$addX :function _trc_Vec3_f_addX(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      
      _thread.enter(function _trc_Vec3_ent_addX(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000533;//kernel.Vec3:533
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            //$LASTPOS=30000571;//kernel.Vec3:571
            _this.x+=p.x;
            //$LASTPOS=30000584;//kernel.Vec3:584
            _this.y+=p.y;
            //$LASTPOS=30000597;//kernel.Vec3:597
            _this.z+=p.z;
            _thread.exit(_this);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    subX :function _trc_Vec3_subX() {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=30000650;//kernel.Vec3:650
      p = _this.parsePointArgs(arguments);
      
      //$LASTPOS=30000688;//kernel.Vec3:688
      _this.x-=p.x;
      //$LASTPOS=30000701;//kernel.Vec3:701
      _this.y-=p.y;
      //$LASTPOS=30000714;//kernel.Vec3:714
      _this.z-=p.z;
      return _this;
    },
    fiber$subX :function _trc_Vec3_f_subX(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      
      _thread.enter(function _trc_Vec3_ent_subX(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000650;//kernel.Vec3:650
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            //$LASTPOS=30000688;//kernel.Vec3:688
            _this.x-=p.x;
            //$LASTPOS=30000701;//kernel.Vec3:701
            _this.y-=p.y;
            //$LASTPOS=30000714;//kernel.Vec3:714
            _this.z-=p.z;
            _thread.exit(_this);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    mulX :function _trc_Vec3_mulX(k) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000770;//kernel.Vec3:770
      _this.x=_this.x*k;
      //$LASTPOS=30000782;//kernel.Vec3:782
      _this.y=_this.y*k;
      //$LASTPOS=30000794;//kernel.Vec3:794
      _this.z=_this.z*k;
      return _this;
    },
    fiber$mulX :function _trc_Vec3_f_mulX(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000770;//kernel.Vec3:770
      _this.x=_this.x*k;
      //$LASTPOS=30000782;//kernel.Vec3:782
      _this.y=_this.y*k;
      //$LASTPOS=30000794;//kernel.Vec3:794
      _this.z=_this.z*k;
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    divX :function _trc_Vec3_divX(k) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000847;//kernel.Vec3:847
      _this.x=_this.x/k;
      //$LASTPOS=30000859;//kernel.Vec3:859
      _this.y=_this.y/k;
      //$LASTPOS=30000871;//kernel.Vec3:871
      _this.z=_this.z/k;
      return _this;
    },
    fiber$divX :function _trc_Vec3_f_divX(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000847;//kernel.Vec3:847
      _this.x=_this.x/k;
      //$LASTPOS=30000859;//kernel.Vec3:859
      _this.y=_this.y/k;
      //$LASTPOS=30000871;//kernel.Vec3:871
      _this.z=_this.z/k;
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    add :function _trc_Vec3_add(x,y,z) {
      "use strict";
      var _this=this;
      
      return _this.clone().addX(x,y,z);
    },
    fiber$add :function _trc_Vec3_f_add(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().addX(x,y,z);return;
      
      
      _thread.retVal=_this;return;
    },
    sub :function _trc_Vec3_sub(x,y,z) {
      "use strict";
      var _this=this;
      
      return _this.clone().subX(x,y,z);
    },
    fiber$sub :function _trc_Vec3_f_sub(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().subX(x,y,z);return;
      
      
      _thread.retVal=_this;return;
    },
    mul :function _trc_Vec3_mul(k) {
      "use strict";
      var _this=this;
      
      return _this.clone().mulX(k);
    },
    fiber$mul :function _trc_Vec3_f_mul(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().mulX(k);return;
      
      
      _thread.retVal=_this;return;
    },
    div :function _trc_Vec3_div(k) {
      "use strict";
      var _this=this;
      
      return _this.clone().divX(k);
    },
    fiber$div :function _trc_Vec3_f_div(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().divX(k);return;
      
      
      _thread.retVal=_this;return;
    },
    clone :function _trc_Vec3_clone() {
      "use strict";
      var _this=this;
      
      return new Tonyu.classes.kernel.Vec3(_this.x,_this.y,_this.z);
    },
    fiber$clone :function _trc_Vec3_f_clone(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=new Tonyu.classes.kernel.Vec3(_this.x,_this.y,_this.z);return;
      
      
      _thread.retVal=_this;return;
    },
    set :function _trc_Vec3_set(x,y,z) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30002339;//kernel.Vec3:2339
      if (typeof  x==="object") {
        //$LASTPOS=30002375;//kernel.Vec3:2375
        y=x.y;
        //$LASTPOS=30002391;//kernel.Vec3:2391
        z=x.z;
        //$LASTPOS=30002407;//kernel.Vec3:2407
        x=x.x;
        
      }
      //$LASTPOS=30002426;//kernel.Vec3:2426
      if (typeof  x==="number") {
        //$LASTPOS=30002451;//kernel.Vec3:2451
        _this.x=x;
      }
      //$LASTPOS=30002466;//kernel.Vec3:2466
      if (typeof  y==="number") {
        //$LASTPOS=30002491;//kernel.Vec3:2491
        _this.y=y;
      }
      //$LASTPOS=30002506;//kernel.Vec3:2506
      if (typeof  z==="number") {
        //$LASTPOS=30002531;//kernel.Vec3:2531
        _this.z=z;
      }
      return _this;
    },
    fiber$set :function _trc_Vec3_f_set(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30002339;//kernel.Vec3:2339
      if (typeof  x==="object") {
        //$LASTPOS=30002375;//kernel.Vec3:2375
        y=x.y;
        //$LASTPOS=30002391;//kernel.Vec3:2391
        z=x.z;
        //$LASTPOS=30002407;//kernel.Vec3:2407
        x=x.x;
        
      }
      //$LASTPOS=30002426;//kernel.Vec3:2426
      if (typeof  x==="number") {
        //$LASTPOS=30002451;//kernel.Vec3:2451
        _this.x=x;
      }
      //$LASTPOS=30002466;//kernel.Vec3:2466
      if (typeof  y==="number") {
        //$LASTPOS=30002491;//kernel.Vec3:2491
        _this.y=y;
      }
      //$LASTPOS=30002506;//kernel.Vec3:2506
      if (typeof  z==="number") {
        //$LASTPOS=30002531;//kernel.Vec3:2531
        _this.z=z;
      }
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    setTo :function _trc_Vec3_setTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30001274;//kernel.Vec3:1274
      t.x=_this.x;
      //$LASTPOS=30001286;//kernel.Vec3:1286
      t.y=_this.y;
      //$LASTPOS=30001298;//kernel.Vec3:1298
      t.z=_this.z;
    },
    fiber$setTo :function _trc_Vec3_f_setTo(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30001274;//kernel.Vec3:1274
      t.x=_this.x;
      //$LASTPOS=30001286;//kernel.Vec3:1286
      t.y=_this.y;
      //$LASTPOS=30001298;//kernel.Vec3:1298
      t.z=_this.z;
      
      _thread.retVal=_this;return;
    },
    addTo :function _trc_Vec3_addTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30001326;//kernel.Vec3:1326
      t.x+=_this.x;
      //$LASTPOS=30001339;//kernel.Vec3:1339
      t.y+=_this.y;
      //$LASTPOS=30001352;//kernel.Vec3:1352
      t.z+=_this.z;
    },
    fiber$addTo :function _trc_Vec3_f_addTo(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30001326;//kernel.Vec3:1326
      t.x+=_this.x;
      //$LASTPOS=30001339;//kernel.Vec3:1339
      t.y+=_this.y;
      //$LASTPOS=30001352;//kernel.Vec3:1352
      t.z+=_this.z;
      
      _thread.retVal=_this;return;
    },
    dist :function _trc_Vec3_dist() {
      "use strict";
      var _this=this;
      
      return _this.sqrt(_this.x*_this.x+_this.y*_this.y+_this.z*_this.z);
    },
    __getter__length :function _trc_Vec3___getter__length() {
      "use strict";
      var _this=this;
      
      return _this.sqrt(_this.x*_this.x+_this.y*_this.y+_this.z*_this.z);
    },
    __setter__length :function _trc_Vec3___setter__length(l) {
      "use strict";
      var _this=this;
      
      return _this.normalizeX().mulX(l);
    },
    normalizeX :function _trc_Vec3_normalizeX(len) {
      "use strict";
      var _this=this;
      var l;
      
      //$LASTPOS=30001528;//kernel.Vec3:1528
      l = _this.length;
      
      //$LASTPOS=30001544;//kernel.Vec3:1544
      if (l==0) {
        return _this;
      }
      //$LASTPOS=30001569;//kernel.Vec3:1569
      len=(typeof  len==="number")?len:1;
      //$LASTPOS=30001609;//kernel.Vec3:1609
      _this.x*=len/l;
      //$LASTPOS=30001624;//kernel.Vec3:1624
      _this.y*=len/l;
      //$LASTPOS=30001639;//kernel.Vec3:1639
      _this.z*=len/l;
      return _this;
    },
    fiber$normalizeX :function _trc_Vec3_f_normalizeX(_thread,len) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=30001528;//kernel.Vec3:1528
      l = _this.length;
      
      //$LASTPOS=30001544;//kernel.Vec3:1544
      if (l==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=30001569;//kernel.Vec3:1569
      len=(typeof  len==="number")?len:1;
      //$LASTPOS=30001609;//kernel.Vec3:1609
      _this.x*=len/l;
      //$LASTPOS=30001624;//kernel.Vec3:1624
      _this.y*=len/l;
      //$LASTPOS=30001639;//kernel.Vec3:1639
      _this.z*=len/l;
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    normalize :function _trc_Vec3_normalize(len) {
      "use strict";
      var _this=this;
      
      return _this.clone().normalizeX(len);
    },
    fiber$normalize :function _trc_Vec3_f_normalize(_thread,len) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().normalizeX(len);return;
      
      
      _thread.retVal=_this;return;
    },
    productX :function _trc_Vec3_productX() {
      "use strict";
      var _this=this;
      var a;
      var b;
      var i;
      var j;
      var k;
      
      //$LASTPOS=30001746;//kernel.Vec3:1746
      a = _this.parsePointArgs(arguments);
      
      //$LASTPOS=30001784;//kernel.Vec3:1784
      b = _this;
      
      //$LASTPOS=30001801;//kernel.Vec3:1801
      i = a.y*b.z-a.z*b.y;
      
      //$LASTPOS=30001829;//kernel.Vec3:1829
      j = a.z*b.x-a.x*b.z;
      
      //$LASTPOS=30001857;//kernel.Vec3:1857
      k = a.x*b.y-a.y*b.x;
      
      //$LASTPOS=30001885;//kernel.Vec3:1885
      b.x=i;
      //$LASTPOS=30001897;//kernel.Vec3:1897
      b.y=j;
      //$LASTPOS=30001909;//kernel.Vec3:1909
      b.z=k;
      return b;
    },
    fiber$productX :function _trc_Vec3_f_productX(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var b;
      var i;
      var j;
      var k;
      
      
      _thread.enter(function _trc_Vec3_ent_productX(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30001746;//kernel.Vec3:1746
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=30001784;//kernel.Vec3:1784
            b = _this;
            
            //$LASTPOS=30001801;//kernel.Vec3:1801
            i = a.y*b.z-a.z*b.y;
            
            //$LASTPOS=30001829;//kernel.Vec3:1829
            j = a.z*b.x-a.x*b.z;
            
            //$LASTPOS=30001857;//kernel.Vec3:1857
            k = a.x*b.y-a.y*b.x;
            
            //$LASTPOS=30001885;//kernel.Vec3:1885
            b.x=i;
            //$LASTPOS=30001897;//kernel.Vec3:1897
            b.y=j;
            //$LASTPOS=30001909;//kernel.Vec3:1909
            b.z=k;
            _thread.exit(b);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    product :function _trc_Vec3_product(x,y,z) {
      "use strict";
      var _this=this;
      
      return _this.clone().productX(x,y,z);
    },
    fiber$product :function _trc_Vec3_f_product(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().productX(x,y,z);return;
      
      
      _thread.retVal=_this;return;
    },
    innerProduct :function _trc_Vec3_innerProduct() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=30002017;//kernel.Vec3:2017
      a = _this.parsePointArgs(arguments);
      
      return _this.x*a.x+_this.y*a.y+_this.z*a.z;
    },
    fiber$innerProduct :function _trc_Vec3_f_innerProduct(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      
      _thread.enter(function _trc_Vec3_ent_innerProduct(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30002017;//kernel.Vec3:2017
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            _thread.exit(_this.x*a.x+_this.y*a.y+_this.z*a.z);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    rotate :function _trc_Vec3_rotate(angle,axis) {
      "use strict";
      var _this=this;
      var v90;
      
      //$LASTPOS=30002113;//kernel.Vec3:2113
      if (! axis) {
        //$LASTPOS=30002124;//kernel.Vec3:2124
        axis=new Tonyu.classes.kernel.Vec3(0,0,1);
      }
      //$LASTPOS=30002151;//kernel.Vec3:2151
      v90 = _this.product(axis);
      
      //$LASTPOS=30002179;//kernel.Vec3:2179
      v90.length=_this.length;
      return _this.mul(_this.cos(angle)).add(v90.mul(_this.sin(angle)));
    },
    fiber$rotate :function _trc_Vec3_f_rotate(_thread,angle,axis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var v90;
      
      //$LASTPOS=30002113;//kernel.Vec3:2113
      if (! axis) {
        //$LASTPOS=30002124;//kernel.Vec3:2124
        axis=new Tonyu.classes.kernel.Vec3(0,0,1);
      }
      
      _thread.enter(function _trc_Vec3_ent_rotate(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30002151;//kernel.Vec3:2151
            _this.fiber$product(_thread, axis);
            __pc=1;return;
          case 1:
            v90=_thread.retVal;
            
            //$LASTPOS=30002179;//kernel.Vec3:2179
            v90.length=_this.length;
            _thread.exit(_this.mul(_this.cos(angle)).add(v90.mul(_this.sin(angle))));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    rotateX :function _trc_Vec3_rotateX(angle,axis) {
      "use strict";
      var _this=this;
      
      return _this.set(_this.rotate(angle,axis));
    },
    fiber$rotateX :function _trc_Vec3_f_rotateX(_thread,angle,axis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.set(_this.rotate(angle,axis));return;
      
      
      _thread.retVal=_this;return;
    },
    toString :function _trc_Vec3_toString() {
      "use strict";
      var _this=this;
      
      return "("+[_this.x,_this.y,_this.z].join(",")+")";
    },
    fiber$toString :function _trc_Vec3_f_toString(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="("+[_this.x,_this.y,_this.z].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"checkNum":{"nowait":false},"parsePointArgs":{"nowait":false},"addX":{"nowait":false},"subX":{"nowait":false},"mulX":{"nowait":false},"divX":{"nowait":false},"add":{"nowait":false},"sub":{"nowait":false},"mul":{"nowait":false},"div":{"nowait":false},"clone":{"nowait":false},"set":{"nowait":false},"setTo":{"nowait":false},"addTo":{"nowait":false},"dist":{"nowait":true},"__getter__length":{"nowait":true},"__setter__length":{"nowait":true},"normalizeX":{"nowait":false},"normalize":{"nowait":false},"productX":{"nowait":false},"product":{"nowait":false},"innerProduct":{"nowait":false},"rotate":{"nowait":false},"rotateX":{"nowait":false},"toString":{"nowait":false}},"fields":{"z":{},"length":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Vec3View',
  shortName: 'Vec3View',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Vec3,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_Vec3View_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Vec3View_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Vec3View_initialize(target,attrs) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000060;//kernel.Vec3View:60
      _this.target=target;
      //$LASTPOS=31000085;//kernel.Vec3View:85
      _this.attrs=attrs||{x: "x",y: "y",z: "z"};
    },
    __getter__x :function _trc_Vec3View___getter__x() {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.x]||0;
    },
    __getter__y :function _trc_Vec3View___getter__y() {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.y]||0;
    },
    __getter__z :function _trc_Vec3View___getter__z() {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.z]||0;
    },
    __setter__x :function _trc_Vec3View___setter__x(v) {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.x]=v;
    },
    __setter__y :function _trc_Vec3View___setter__y(v) {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.y]=v;
    },
    __setter__z :function _trc_Vec3View___setter__z(v) {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.z]=v;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"__getter__x":{"nowait":true},"__getter__y":{"nowait":true},"__getter__z":{"nowait":true},"__setter__x":{"nowait":true},"__setter__y":{"nowait":true},"__setter__z":{"nowait":true}},"fields":{"target":{},"attrs":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.BaseActor',
  shortName: 'BaseActor',
  namespace: 'kernel',
  includes: [Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod,Tonyu.classes.kernel.EventHandlerCaller,Tonyu.classes.kernel.DialogMod,Tonyu.classes.kernel.FileMod],
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
    __getter__defaultLayer :function _trc_BaseActor___getter__defaultLayer() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$mainLayer;
    },
    initialize :function _trc_BaseActor_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000278;//kernel.BaseActor:278
      if (typeof  x=="object") {
        //$LASTPOS=32000302;//kernel.BaseActor:302
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=32000334;//kernel.BaseActor:334
        if (typeof  x=="number") {
          //$LASTPOS=32000369;//kernel.BaseActor:369
          _this.x=x;
          //$LASTPOS=32000388;//kernel.BaseActor:388
          _this.y=y;
          //$LASTPOS=32000407;//kernel.BaseActor:407
          _this.p=p;
          
        }
      }
      //$LASTPOS=32000429;//kernel.BaseActor:429
      _this._scheduler=_this._scheduler||Tonyu.globals.$Scheduler;
      //$LASTPOS=32000469;//kernel.BaseActor:469
      if (Tonyu.runMode) {
        //$LASTPOS=32000488;//kernel.BaseActor:488
        _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      }
      //$LASTPOS=32000529;//kernel.BaseActor:529
      _this.layer=_this.layer||_this.defaultLayer;
      //$LASTPOS=32000561;//kernel.BaseActor:561
      _this.crashScale=1;
      //$LASTPOS=32000580;//kernel.BaseActor:580
      _this.position=new Tonyu.classes.kernel.Vec3View(_this);
      //$LASTPOS=32000614;//kernel.BaseActor:614
      if (_this.scaleX==null) {
        //$LASTPOS=32000632;//kernel.BaseActor:632
        _this.scaleX=1;
      }
      //$LASTPOS=32000647;//kernel.BaseActor:647
      if (_this.rotation==null) {
        //$LASTPOS=32000667;//kernel.BaseActor:667
        _this.rotation=0;
      }
      //$LASTPOS=32000729;//kernel.BaseActor:729
      if (_this.alpha==null) {
        //$LASTPOS=32000746;//kernel.BaseActor:746
        _this.alpha=255;
      }
      //$LASTPOS=32000762;//kernel.BaseActor:762
      if (_this.zOrder==null) {
        //$LASTPOS=32000780;//kernel.BaseActor:780
        _this.zOrder=0;
      }
      //$LASTPOS=32000795;//kernel.BaseActor:795
      if (_this.age==null) {
        //$LASTPOS=32000810;//kernel.BaseActor:810
        _this.age=0;
      }
      //$LASTPOS=32000822;//kernel.BaseActor:822
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=32000873;//kernel.BaseActor:873
        _this.animMode=true;
        //$LASTPOS=32000897;//kernel.BaseActor:897
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=32000931;//kernel.BaseActor:931
        _this.animMode=false;
        
      }
      //$LASTPOS=32000959;//kernel.BaseActor:959
      if (_this.animFps==null) {
        //$LASTPOS=32000978;//kernel.BaseActor:978
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
      
      //$LASTPOS=32001082;//kernel.BaseActor:1082
      Tonyu.globals.$_printCount++;
      //$LASTPOS=32001098;//kernel.BaseActor:1098
      if (Tonyu.globals.$_printCount>Tonyu.globals.$printLimit) {
        throw new Error("printをしすぎています.");
        
      }
      //$LASTPOS=32001168;//kernel.BaseActor:1168
      console.log.apply(console,arguments);
      //$LASTPOS=32001211;//kernel.BaseActor:1211
      mergedArg = "";
      
      //$LASTPOS=32001234;//kernel.BaseActor:1234
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=32001262;//kernel.BaseActor:1262
        //$LASTPOS=32001266;//kernel.BaseActor:1266
        argCount = 0;
        for (; argCount<arguments.length ; argCount++) {
          {
            //$LASTPOS=32001333;//kernel.BaseActor:1333
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
        }
        //$LASTPOS=32001398;//kernel.BaseActor:1398
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=32001437;//kernel.BaseActor:1437
        //$LASTPOS=32001441;//kernel.BaseActor:1441
        printCount = 0;
        for (; printCount<_this.splits.length ; printCount++) {
          {
            //$LASTPOS=32001511;//kernel.BaseActor:1511
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=32001552;//kernel.BaseActor:1552
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=32001602;//kernel.BaseActor:1602
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001725;//kernel.BaseActor:1725
      _this.animFps=f;
      //$LASTPOS=32001746;//kernel.BaseActor:1746
      _this.animFrame=0;
      //$LASTPOS=32001769;//kernel.BaseActor:1769
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001819;//kernel.BaseActor:1819
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001868;//kernel.BaseActor:1868
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001910;//kernel.BaseActor:1910
      _this.onUpdate();
      //$LASTPOS=32001927;//kernel.BaseActor:1927
      if (null) {
        //$LASTPOS=32001950;//kernel.BaseActor:1950
        null.suspend();
        //$LASTPOS=32001978;//kernel.BaseActor:1978
        if (_this._scheduler) {
          //$LASTPOS=32001994;//kernel.BaseActor:1994
          _this._scheduler.addToNext(null);
        }
        
      } else {
        //$LASTPOS=32002048;//kernel.BaseActor:2048
        _this._scheduler.checkTimeout();
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32001910;//kernel.BaseActor:1910
      _this.onUpdate();
      //$LASTPOS=32001927;//kernel.BaseActor:1927
      if (_thread) {
        //$LASTPOS=32001950;//kernel.BaseActor:1950
        _thread.suspend();
        //$LASTPOS=32001978;//kernel.BaseActor:1978
        if (_this._scheduler) {
          //$LASTPOS=32001994;//kernel.BaseActor:1994
          _this._scheduler.addToNext(_thread);
        }
        
      } else {
        //$LASTPOS=32002048;//kernel.BaseActor:2048
        _this._scheduler.checkTimeout();
        
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
      
      //$LASTPOS=32002138;//kernel.BaseActor:2138
      //$LASTPOS=32002142;//kernel.BaseActor:2142
      updateCount = 0;
      for (; updateCount<updateT ; updateCount++) {
        {
          //$LASTPOS=32002205;//kernel.BaseActor:2205
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
            //$LASTPOS=32002138;//kernel.BaseActor:2138
            //$LASTPOS=32002142;//kernel.BaseActor:2142
            updateCount = 0;
            
          case 1:
            if (!(updateCount<updateT)) { __pc=4     ; break; }
            //$LASTPOS=32002205;//kernel.BaseActor:2205
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
      
      //$LASTPOS=32002416;//kernel.BaseActor:2416
      res = new Tonyu.classes.kernel.TQuery(_this);
      
      //$LASTPOS=32002447;//kernel.BaseActor:2447
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=32002530;//kernel.BaseActor:2530
      _this.layer.sprites.forEach((function anonymous_2552(s) {
        
        //$LASTPOS=32002568;//kernel.BaseActor:2568
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=32002599;//kernel.BaseActor:2599
        if (! c||s instanceof c) {
          //$LASTPOS=32002640;//kernel.BaseActor:2640
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
      
      //$LASTPOS=32002720;//kernel.BaseActor:2720
      res = new Tonyu.classes.kernel.TQuery(_this);
      
      //$LASTPOS=32002751;//kernel.BaseActor:2751
      sp = _this;
      
      //$LASTPOS=32002788;//kernel.BaseActor:2788
      t1 = _this.getCrashRect();
      
      //$LASTPOS=32002816;//kernel.BaseActor:2816
      if (! t1) {
        return res;
      }
      //$LASTPOS=32002842;//kernel.BaseActor:2842
      _this.layer.sprites.forEach((function anonymous_2864(s) {
        var t2;
        
        
        //$LASTPOS=32002897;//kernel.BaseActor:2897
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=32003123;//kernel.BaseActor:3123
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32003203;//kernel.BaseActor:3203
      if (! t) {
        return false;
      }
      //$LASTPOS=32003230;//kernel.BaseActor:3230
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
      
      //$LASTPOS=32003353;//kernel.BaseActor:3353
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=32003393;//kernel.BaseActor:3393
      t1 = _this.getCrashRect();
      
      //$LASTPOS=32003421;//kernel.BaseActor:3421
      t2 = t.getCrashRect();
      
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_280;
      
      //$LASTPOS=32003730;//kernel.BaseActor:3730
      while (true) {
        //$LASTPOS=32003752;//kernel.BaseActor:3752
        if (typeof  d=="function") {
          //$LASTPOS=32003791;//kernel.BaseActor:3791
          _it_280=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_280.next()) {
            obj=_it_280[0];
            
            //$LASTPOS=32003833;//kernel.BaseActor:3833
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=32003890;//kernel.BaseActor:3890
          if (_this.crashTo(d)) {
            //$LASTPOS=32003919;//kernel.BaseActor:3919
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=32003964;//kernel.BaseActor:3964
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_280;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32003730;//kernel.BaseActor:3730
          case 1:
            //$LASTPOS=32003752;//kernel.BaseActor:3752
            if (!(typeof  d=="function")) { __pc=5     ; break; }
            //$LASTPOS=32003791;//kernel.BaseActor:3791
            _it_280=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_280.next())) { __pc=4     ; break; }
            obj=_it_280[0];
            
            //$LASTPOS=32003833;//kernel.BaseActor:3833
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            __pc=8     ;break;
          case 5     :
            //$LASTPOS=32003890;//kernel.BaseActor:3890
            if (!(_this.crashTo(d))) { __pc=7     ; break; }
            //$LASTPOS=32003919;//kernel.BaseActor:3919
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7     :
            
          case 8     :
            
            //$LASTPOS=32003964;//kernel.BaseActor:3964
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
      
      //$LASTPOS=32004015;//kernel.BaseActor:4015
      actWidth = (_this.width||_this.radius*2)*_this.scaleX*_this.crashScale;
      
      //$LASTPOS=32004081;//kernel.BaseActor:4081
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=32004123;//kernel.BaseActor:4123
        actHeight=(_this.height||_this.radius*2)*_this.scaleX*_this.crashScale;
        
      } else {
        //$LASTPOS=32004192;//kernel.BaseActor:4192
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
      
      //$LASTPOS=32004482;//kernel.BaseActor:4482
      res = new Tonyu.classes.kernel.TQuery(_this);
      
      //$LASTPOS=32004513;//kernel.BaseActor:4513
      sp = _this;
      
      //$LASTPOS=32004550;//kernel.BaseActor:4550
      t1 = _this.getCrashRect();
      
      //$LASTPOS=32004578;//kernel.BaseActor:4578
      if (! t1) {
        return res;
      }
      //$LASTPOS=32004604;//kernel.BaseActor:4604
      _this.layer.sprites.forEach((function anonymous_4626(s) {
        var t2;
        
        
        //$LASTPOS=32004659;//kernel.BaseActor:4659
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=32004842;//kernel.BaseActor:4842
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32004929;//kernel.BaseActor:4929
      if (! t) {
        return false;
      }
      //$LASTPOS=32004955;//kernel.BaseActor:4955
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32005101;//kernel.BaseActor:5101
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=32005140;//kernel.BaseActor:5140
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_290;
      
      //$LASTPOS=32005310;//kernel.BaseActor:5310
      while (true) {
        //$LASTPOS=32005332;//kernel.BaseActor:5332
        if (typeof  d=="function") {
          //$LASTPOS=32005371;//kernel.BaseActor:5371
          _it_290=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_290.next()) {
            obj=_it_290[0];
            
            //$LASTPOS=32005445;//kernel.BaseActor:5445
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=32005483;//kernel.BaseActor:5483
          if (_this.within(d,r)) {
            //$LASTPOS=32005513;//kernel.BaseActor:5513
            f(d);
            
          }
        }
        //$LASTPOS=32005539;//kernel.BaseActor:5539
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_290;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32005310;//kernel.BaseActor:5310
          case 1:
            //$LASTPOS=32005332;//kernel.BaseActor:5332
            if (typeof  d=="function") {
              //$LASTPOS=32005371;//kernel.BaseActor:5371
              _it_290=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_290.next()) {
                obj=_it_290[0];
                
                //$LASTPOS=32005445;//kernel.BaseActor:5445
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=32005483;//kernel.BaseActor:5483
              if (_this.within(d,r)) {
                //$LASTPOS=32005513;//kernel.BaseActor:5513
                f(d);
                
              }
            }
            //$LASTPOS=32005539;//kernel.BaseActor:5539
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
      
      //$LASTPOS=32005603;//kernel.BaseActor:5603
      _this.layer.watchHit(typeA,typeB,(function anonymous_5633(a,b) {
        
        //$LASTPOS=32005651;//kernel.BaseActor:5651
        onHit.apply(_this,[a,b]);
      }));
    },
    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
      "use strict";
      var _this=this;
      
      return _this._scheduler;
    },
    die :function _trc_BaseActor_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32005805;//kernel.BaseActor:5805
      _this.killThreadGroup();
      //$LASTPOS=32005829;//kernel.BaseActor:5829
      _this.hide();
      //$LASTPOS=32005842;//kernel.BaseActor:5842
      if (! _this._isDead) {
        //$LASTPOS=32005867;//kernel.BaseActor:5867
        _this.fireEvent("die");
        //$LASTPOS=32005894;//kernel.BaseActor:5894
        _this._isDead=true;
        //$LASTPOS=32005917;//kernel.BaseActor:5917
        if (_this._poolArray) {
          //$LASTPOS=32005948;//kernel.BaseActor:5948
          _this._poolArray.push(_this);
          //$LASTPOS=32005984;//kernel.BaseActor:5984
          _this.objectPoolAge=(_this.objectPoolAge||0)+1;
          
        }
        
      }
    },
    __setter__lifeKeeper :function _trc_BaseActor___setter__lifeKeeper(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32006063;//kernel.BaseActor:6063
      _this._lifeKeeper=v;
      //$LASTPOS=32006083;//kernel.BaseActor:6083
      if (v&&typeof  v.on==="function") {
        //$LASTPOS=32006129;//kernel.BaseActor:6129
        v.on("die",Tonyu.bindFunc(_this,_this.die));
        
      }
    },
    __getter__lifeKeeper :function _trc_BaseActor___getter__lifeKeeper() {
      "use strict";
      var _this=this;
      
      return _this._lifeKeeper;
    },
    hide :function _trc_BaseActor_hide() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32006222;//kernel.BaseActor:6222
      _this.layer.remove(_this);
    },
    show :function _trc_BaseActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32006273;//kernel.BaseActor:6273
      _this.layer.add(_this);
      //$LASTPOS=32006295;//kernel.BaseActor:6295
      if (x!=null) {
        //$LASTPOS=32006308;//kernel.BaseActor:6308
        _this.x=x;
      }
      //$LASTPOS=32006323;//kernel.BaseActor:6323
      if (y!=null) {
        //$LASTPOS=32006336;//kernel.BaseActor:6336
        _this.y=y;
      }
      //$LASTPOS=32006351;//kernel.BaseActor:6351
      if (p!=null) {
        //$LASTPOS=32006364;//kernel.BaseActor:6364
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32006409;//kernel.BaseActor:6409
      if (typeof  _this.p!="number") {
        //$LASTPOS=32006444;//kernel.BaseActor:6444
        _this.p=0;
        
      }
      //$LASTPOS=32006461;//kernel.BaseActor:6461
      _this.p=Math.floor(_this.p);
      //$LASTPOS=32006483;//kernel.BaseActor:6483
      _this.pImg=Tonyu.globals.$imageList[_this.p];
      //$LASTPOS=32006508;//kernel.BaseActor:6508
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=32006532;//kernel.BaseActor:6532
      _this.width=_this.pImg.width;
      //$LASTPOS=32006555;//kernel.BaseActor:6555
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
      
      //$LASTPOS=32006652;//kernel.BaseActor:6652
      _this.age++;
      //$LASTPOS=32006664;//kernel.BaseActor:6664
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=32006705;//kernel.BaseActor:6705
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=32006745;//kernel.BaseActor:6745
        _this.animFrame++;
        
      }
    },
    performTransform :function _trc_BaseActor_performTransform(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32006806;//kernel.BaseActor:6806
      if (_this.x!==_this.x||_this.y!==_this.y||_this.x==null||_this.y==null) {
        
        
      }
      //$LASTPOS=32006935;//kernel.BaseActor:6935
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=32006960;//kernel.BaseActor:6960
      if (_this.rotation!=0) {
        //$LASTPOS=32006991;//kernel.BaseActor:6991
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=32007051;//kernel.BaseActor:7051
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=32007100;//kernel.BaseActor:7100
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=32007148;//kernel.BaseActor:7148
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=32007205;//kernel.BaseActor:7205
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=32007253;//kernel.BaseActor:7253
      ctx.globalAlpha=(_this.alpha<0?0:_this.alpha>255?255:_this.alpha)/255;
    },
    draw :function _trc_BaseActor_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=32007335;//kernel.BaseActor:7335
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=32007388;//kernel.BaseActor:7388
      if (_this.text!=null) {
        //$LASTPOS=32007415;//kernel.BaseActor:7415
        splitsText = (_this.text+"").split("\n");
        
        //$LASTPOS=32007462;//kernel.BaseActor:7462
        _this.drawY=_this.y;
        //$LASTPOS=32007480;//kernel.BaseActor:7480
        if (! _this.size) {
          //$LASTPOS=32007491;//kernel.BaseActor:7491
          _this.size=15;
        }
        //$LASTPOS=32007509;//kernel.BaseActor:7509
        if (! _this.align) {
          //$LASTPOS=32007521;//kernel.BaseActor:7521
          _this.align="center";
        }
        //$LASTPOS=32007546;//kernel.BaseActor:7546
        if (! _this.fillStyle) {
          //$LASTPOS=32007562;//kernel.BaseActor:7562
          _this.fillStyle="white";
        }
        //$LASTPOS=32007590;//kernel.BaseActor:7590
        if (_this.font) {
          //$LASTPOS=32007600;//kernel.BaseActor:7600
          ctx.font=_this.size+"px "+_this.font;
        }
        //$LASTPOS=32007635;//kernel.BaseActor:7635
        ctx.fillStyle=_this.fillStyle+"";
        //$LASTPOS=32007672;//kernel.BaseActor:7672
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=32007713;//kernel.BaseActor:7713
        _this.height=0;
        //$LASTPOS=32007722;//kernel.BaseActor:7722
        _this.width=0;
        //$LASTPOS=32007740;//kernel.BaseActor:7740
        //$LASTPOS=32007744;//kernel.BaseActor:7744
        textCount = 0;
        for (; textCount<splitsText.length ; textCount++) {
          {
            //$LASTPOS=32007815;//kernel.BaseActor:7815
            rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
            
            //$LASTPOS=32007911;//kernel.BaseActor:7911
            if (_this.width<rect.w) {
              //$LASTPOS=32007928;//kernel.BaseActor:7928
              _this.width=rect.w;
            }
            //$LASTPOS=32007955;//kernel.BaseActor:7955
            _this.height+=rect.h;
            //$LASTPOS=32007984;//kernel.BaseActor:7984
            _this.drawY+=_this.size;
          }
        }
        
      } else {
        //$LASTPOS=32008020;//kernel.BaseActor:8020
        if (_this.fillStyle!=null) {
          //$LASTPOS=32008052;//kernel.BaseActor:8052
          ctx.save();
          //$LASTPOS=32008073;//kernel.BaseActor:8073
          _this.performTransform(ctx);
          //$LASTPOS=32008105;//kernel.BaseActor:8105
          ctx.fillStyle=_this.fillStyle+"";
          //$LASTPOS=32008142;//kernel.BaseActor:8142
          if (_this.radius) {
            //$LASTPOS=32008169;//kernel.BaseActor:8169
            ctx.beginPath();
            //$LASTPOS=32008199;//kernel.BaseActor:8199
            ctx.arc(0,0,_this.radius,0,2*Math.PI);
            //$LASTPOS=32008245;//kernel.BaseActor:8245
            ctx.fill();
            
          } else {
            //$LASTPOS=32008288;//kernel.BaseActor:8288
            ctx.fillRect(- _this.width/2,- _this.height/2,_this.width,_this.height);
            
          }
          //$LASTPOS=32008355;//kernel.BaseActor:8355
          ctx.restore();
          
        } else {
          //$LASTPOS=32008393;//kernel.BaseActor:8393
          _this.detectShape();
          //$LASTPOS=32008417;//kernel.BaseActor:8417
          if (_this.pImg) {
            //$LASTPOS=32008442;//kernel.BaseActor:8442
            _this._animation();
            //$LASTPOS=32008469;//kernel.BaseActor:8469
            ctx.save();
            //$LASTPOS=32008494;//kernel.BaseActor:8494
            _this.performTransform(ctx);
            //$LASTPOS=32008530;//kernel.BaseActor:8530
            ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
            //$LASTPOS=32008674;//kernel.BaseActor:8674
            ctx.restore();
            
          }
          
        }
      }
      //$LASTPOS=32008712;//kernel.BaseActor:8712
      if (_this._fukidashi) {
        //$LASTPOS=32008739;//kernel.BaseActor:8739
        if (_this._fukidashi.c>0) {
          //$LASTPOS=32008774;//kernel.BaseActor:8774
          _this._fukidashi.c--;
          //$LASTPOS=32008803;//kernel.BaseActor:8803
          ctx.fillStyle="white";
          //$LASTPOS=32008839;//kernel.BaseActor:8839
          ctx.strokeStyle="black";
          //$LASTPOS=32008877;//kernel.BaseActor:8877
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32009005;//kernel.BaseActor:9005
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=32009077;//kernel.BaseActor:9077
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32009005;//kernel.BaseActor:9005
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=32009077;//kernel.BaseActor:9077
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      "use strict";
      var _this=this;
      var cp;
      
      //$LASTPOS=32009159;//kernel.BaseActor:9159
      if (! a) {
        //$LASTPOS=32009167;//kernel.BaseActor:9167
        a=0;
      }
      //$LASTPOS=32009193;//kernel.BaseActor:9193
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      return _this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));
    },
    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cp;
      
      //$LASTPOS=32009159;//kernel.BaseActor:9159
      if (! a) {
        //$LASTPOS=32009167;//kernel.BaseActor:9167
        a=0;
      }
      //$LASTPOS=32009193;//kernel.BaseActor:9193
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      _thread.retVal=_this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32009651;//kernel.BaseActor:9651
      while (true) {
        //$LASTPOS=32009673;//kernel.BaseActor:9673
        while (true) {
          //$LASTPOS=32009699;//kernel.BaseActor:9699
          if (_this.screenOut()>d) {
            //$LASTPOS=32009735;//kernel.BaseActor:9735
            f();
            break;
            
            
          }
          //$LASTPOS=32009792;//kernel.BaseActor:9792
          _this.update();
          
        }
        //$LASTPOS=32009822;//kernel.BaseActor:9822
        while (true) {
          //$LASTPOS=32009848;//kernel.BaseActor:9848
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=32009920;//kernel.BaseActor:9920
          _this.update();
          
        }
        //$LASTPOS=32009950;//kernel.BaseActor:9950
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
            //$LASTPOS=32009651;//kernel.BaseActor:9651
          case 1:
            //$LASTPOS=32009673;//kernel.BaseActor:9673
          case 2:
            //$LASTPOS=32009699;//kernel.BaseActor:9699
            if (!(_this.screenOut()>d)) { __pc=3     ; break; }
            //$LASTPOS=32009735;//kernel.BaseActor:9735
            f();
            __pc=5     ; break;
            
          case 3     :
            
            //$LASTPOS=32009792;//kernel.BaseActor:9792
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5     :
            
            //$LASTPOS=32009822;//kernel.BaseActor:9822
          case 6:
            //$LASTPOS=32009848;//kernel.BaseActor:9848
            if (!(_this.screenOut()<=d)) { __pc=7     ; break; }
            __pc=9     ; break;
            
          case 7     :
            
            //$LASTPOS=32009920;//kernel.BaseActor:9920
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9     :
            
            //$LASTPOS=32009950;//kernel.BaseActor:9950
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
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32009999;//kernel.BaseActor:9999
      _this.runAsync((function anonymous_10008(f) {
        
        //$LASTPOS=32010023;//kernel.BaseActor:10023
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
            //$LASTPOS=32009999;//kernel.BaseActor:9999
            _this.fiber$runAsync(_thread, (function anonymous_10008(f) {
              
              //$LASTPOS=32010023;//kernel.BaseActor:10023
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
      
      //$LASTPOS=32010269;//kernel.BaseActor:10269
      Tonyu.globals.$Boot.loadPage.apply(Tonyu.globals.$Boot,arguments);
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32010394;//kernel.BaseActor:10394
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32010394;//kernel.BaseActor:10394
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    __setter__useObjectPool :function _trc_BaseActor___setter__useObjectPool(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32010443;//kernel.BaseActor:10443
      if (value) {
        //$LASTPOS=32010465;//kernel.BaseActor:10465
        _this._poolArray=Tonyu.globals.$ObjectPool.poolList(_this.getClassInfo().fullName);
        
      }
    },
    appear :function _trc_BaseActor_appear(o,param) {
      "use strict";
      var _this=this;
      var p;
      var k;
      var _it_300;
      
      //$LASTPOS=32010558;//kernel.BaseActor:10558
      if (typeof  o=="function") {
        //$LASTPOS=32010595;//kernel.BaseActor:10595
        if (param) {
          //$LASTPOS=32010608;//kernel.BaseActor:10608
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=32010651;//kernel.BaseActor:10651
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=32010705;//kernel.BaseActor:10705
        if (p) {
          //$LASTPOS=32010724;//kernel.BaseActor:10724
          _it_300=Tonyu.iterator(Object.keys(p),1);
          while(_it_300.next()) {
            k=_it_300[0];
            
            //$LASTPOS=32010769;//kernel.BaseActor:10769
            if (k!="objectPoolAge") {
              //$LASTPOS=32010793;//kernel.BaseActor:10793
              delete p[k];
            }
            
          }
          //$LASTPOS=32010822;//kernel.BaseActor:10822
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
      var _it_300;
      
      //$LASTPOS=32010558;//kernel.BaseActor:10558
      if (typeof  o=="function") {
        //$LASTPOS=32010595;//kernel.BaseActor:10595
        if (param) {
          //$LASTPOS=32010608;//kernel.BaseActor:10608
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=32010651;//kernel.BaseActor:10651
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=32010705;//kernel.BaseActor:10705
        if (p) {
          //$LASTPOS=32010724;//kernel.BaseActor:10724
          _it_300=Tonyu.iterator(Object.keys(p),1);
          while(_it_300.next()) {
            k=_it_300[0];
            
            //$LASTPOS=32010769;//kernel.BaseActor:10769
            if (k!="objectPoolAge") {
              //$LASTPOS=32010793;//kernel.BaseActor:10793
              delete p[k];
            }
            
          }
          //$LASTPOS=32010822;//kernel.BaseActor:10822
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
      
      //$LASTPOS=32010973;//kernel.BaseActor:10973
      if (null) {
        //$LASTPOS=32010996;//kernel.BaseActor:10996
        null.suspend();
        //$LASTPOS=32011024;//kernel.BaseActor:11024
        if (t) {
          //$LASTPOS=32011046;//kernel.BaseActor:11046
          null.waitCount=t;
          //$LASTPOS=32011080;//kernel.BaseActor:11080
          if (_this._scheduler) {
            //$LASTPOS=32011096;//kernel.BaseActor:11096
            _this._scheduler.addToNext(null);
          }
          
        }
        
      } else {
        //$LASTPOS=32011150;//kernel.BaseActor:11150
        if (_this._th) {
          //$LASTPOS=32011170;//kernel.BaseActor:11170
          if (t) {
            //$LASTPOS=32011192;//kernel.BaseActor:11192
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=32011240;//kernel.BaseActor:11240
            if (_this._th.scheduled) {
              //$LASTPOS=32011259;//kernel.BaseActor:11259
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
      
      //$LASTPOS=32010973;//kernel.BaseActor:10973
      if (_thread) {
        //$LASTPOS=32010996;//kernel.BaseActor:10996
        _thread.suspend();
        //$LASTPOS=32011024;//kernel.BaseActor:11024
        if (t) {
          //$LASTPOS=32011046;//kernel.BaseActor:11046
          _thread.waitCount=t;
          //$LASTPOS=32011080;//kernel.BaseActor:11080
          if (_this._scheduler) {
            //$LASTPOS=32011096;//kernel.BaseActor:11096
            _this._scheduler.addToNext(_thread);
          }
          
        }
        
      } else {
        //$LASTPOS=32011150;//kernel.BaseActor:11150
        if (_this._th) {
          //$LASTPOS=32011170;//kernel.BaseActor:11170
          if (t) {
            //$LASTPOS=32011192;//kernel.BaseActor:11192
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=32011240;//kernel.BaseActor:11240
            if (_this._th.scheduled) {
              //$LASTPOS=32011259;//kernel.BaseActor:11259
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
      
      //$LASTPOS=32011336;//kernel.BaseActor:11336
      if (_this._th) {
        //$LASTPOS=32011356;//kernel.BaseActor:11356
        if (_this._th.scheduled) {
          //$LASTPOS=32011391;//kernel.BaseActor:11391
          _this._th.waitCount=0;
          
        } else {
          //$LASTPOS=32011439;//kernel.BaseActor:11439
          if (_this._scheduler) {
            //$LASTPOS=32011455;//kernel.BaseActor:11455
            _this._scheduler.addToCur(_this._th);
          }
          
        }
        
      }
    },
    findTouch :function _trc_BaseActor_findTouch(params) {
      "use strict";
      var _this=this;
      var r;
      var t;
      var _it_304;
      var tt;
      
      //$LASTPOS=32011536;//kernel.BaseActor:11536
      if (typeof  params==="number") {
        //$LASTPOS=32011566;//kernel.BaseActor:11566
        params={scale: params};
      }
      //$LASTPOS=32011594;//kernel.BaseActor:11594
      params=params||{};
      
      //$LASTPOS=32011630;//kernel.BaseActor:11630
      if (params.width&&params.height) {
        //$LASTPOS=32011676;//kernel.BaseActor:11676
        r={x: _this.x,y: _this.y,width: params.width,height: params.height};
        
      } else {
        //$LASTPOS=32011749;//kernel.BaseActor:11749
        params.scale=params.scale||2;
        //$LASTPOS=32011788;//kernel.BaseActor:11788
        r=_this.getCrashRect();
        //$LASTPOS=32011815;//kernel.BaseActor:11815
        if (! r) {
          return null;
        }
        //$LASTPOS=32011845;//kernel.BaseActor:11845
        r={x: _this.x,y: _this.y,width: r.width*params.scale,height: r.height*params.scale};
        
      }
      //$LASTPOS=32011974;//kernel.BaseActor:11974
      _it_304=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_304.next()) {
        t=_it_304[0];
        
        //$LASTPOS=32012009;//kernel.BaseActor:12009
        if (params.pickup||t.touched==1) {
          //$LASTPOS=32012059;//kernel.BaseActor:12059
          tt = Tonyu.globals.$Screen.convert(t,_this.layer);
          
          //$LASTPOS=32012105;//kernel.BaseActor:12105
          if (Math.abs(r.x-tt.x)<r.width/2&&Math.abs(r.y-tt.y)<r.height/2) {
            //$LASTPOS=32012208;//kernel.BaseActor:12208
            Tonyu.globals.$InputDevice.changeTouchLayer(t,_this.layer);
            return t;
            
          }
          
        }
        
      }
    },
    timeStop :function _trc_BaseActor_timeStop() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$Boot.timeStop(_this);
    },
    fiber$timeStop :function _trc_BaseActor_f_timeStop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$Boot.timeStop(_this);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__defaultLayer":{"nowait":true},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"__setter__lifeKeeper":{"nowait":true},"__getter__lifeKeeper":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"isDead":{"nowait":true},"_animation":{"nowait":true},"performTransform":{"nowait":true},"draw":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"waitInputDevice":{"nowait":false},"color":{"nowait":true},"loadPage":{"nowait":true},"setVisible":{"nowait":false},"__setter__useObjectPool":{"nowait":true},"appear":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":true},"findTouch":{"nowait":true},"timeStop":{"nowait":false}},"fields":{"_scheduler":{},"_th":{},"layer":{},"defaultLayer":{},"crashScale":{},"position":{},"scaleX":{},"rotation":{},"alpha":{},"zOrder":{},"age":{},"anim":{},"animMode":{},"animFrame":{},"animFps":{},"splits":{},"width":{},"radius":{},"scaleY":{},"height":{},"_isDead":{},"_poolArray":{},"objectPoolAge":{},"_lifeKeeper":{},"p":{},"pImg":{},"_isInvisible":{},"text":{},"drawY":{},"size":{},"align":{},"fillStyle":{},"font":{},"_fukidashi":{},"getClassInfo":{}}}
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
      
      //$LASTPOS=33000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_145() {
        
        //$LASTPOS=33000161;//kernel.CrashToHandler:161
        retThread.kill();
      })};
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000221;//kernel.CrashToHandler:221
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=33000240;//kernel.CrashToHandler:240
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
      
      //$LASTPOS=34000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=34000061;//kernel.NoviceActor:61
        n=1;
      }
      //$LASTPOS=34000071;//kernel.NoviceActor:71
      //$LASTPOS=34000075;//kernel.NoviceActor:75
      n;for (; n>0 ; n--) {
        //$LASTPOS=34000086;//kernel.NoviceActor:86
        _this.update();
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=34000061;//kernel.NoviceActor:61
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000071;//kernel.NoviceActor:71
            //$LASTPOS=34000075;//kernel.NoviceActor:75
            n;
          case 1:
            if (!(n>0)) { __pc=4     ; break; }
            //$LASTPOS=34000086;//kernel.NoviceActor:86
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
      
      //$LASTPOS=34000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=34000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=34000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=34000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=34000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=34000282;//kernel.NoviceActor:282
        size=15;
      }
      //$LASTPOS=34000296;//kernel.NoviceActor:296
      _this.initSprite();
      //$LASTPOS=34000315;//kernel.NoviceActor:315
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=34000282;//kernel.NoviceActor:282
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000296;//kernel.NoviceActor:296
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=34000315;//kernel.NoviceActor:315
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000390;//kernel.NoviceActor:390
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
            //$LASTPOS=34000390;//kernel.NoviceActor:390
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
      
      //$LASTPOS=34000425;//kernel.NoviceActor:425
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000465;//kernel.NoviceActor:465
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
      
      //$LASTPOS=34000564;//kernel.NoviceActor:564
      _this.initSprite();
      //$LASTPOS=34000583;//kernel.NoviceActor:583
      _this._sprite.x=x;
      //$LASTPOS=34000601;//kernel.NoviceActor:601
      _this._sprite.y=y;
      //$LASTPOS=34000619;//kernel.NoviceActor:619
      if (p!=null) {
        //$LASTPOS=34000632;//kernel.NoviceActor:632
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
            //$LASTPOS=34000564;//kernel.NoviceActor:564
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=34000583;//kernel.NoviceActor:583
            _this._sprite.x=x;
            //$LASTPOS=34000601;//kernel.NoviceActor:601
            _this._sprite.y=y;
            //$LASTPOS=34000619;//kernel.NoviceActor:619
            if (p!=null) {
              //$LASTPOS=34000632;//kernel.NoviceActor:632
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
      
      //$LASTPOS=34000684;//kernel.NoviceActor:684
      _this.initSprite();
      //$LASTPOS=34000703;//kernel.NoviceActor:703
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
            //$LASTPOS=34000684;//kernel.NoviceActor:684
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=34000703;//kernel.NoviceActor:703
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
      
      //$LASTPOS=35000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=35000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=35000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=35000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=35000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=35000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=35000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=35000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=35000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_310;
      
      //$LASTPOS=35000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=35000343;//kernel.PlayMod:343
        _it_310=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_310.next()) {
          k=_it_310[0];
          v=_it_310[1];
          
          //$LASTPOS=35000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=35000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=35000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=35000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=35000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      "use strict";
      var _this=this;
      var mmls;
      var i;
      
      //$LASTPOS=35000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=35000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=35000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=35000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=35000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=35000647;//kernel.PlayMod:647
      //$LASTPOS=35000652;//kernel.PlayMod:652
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=35000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=35000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=35000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=35000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=35000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=35000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=35000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=35000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=35000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=35000647;//kernel.PlayMod:647
      //$LASTPOS=35000652;//kernel.PlayMod:652
      i = 0;
      for (; i<_arguments.length ; i++) {
        {
          //$LASTPOS=35000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
      }
      //$LASTPOS=35000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3     ; break; }
            //$LASTPOS=35000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=35000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=35000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      
      //$LASTPOS=35000897;//kernel.PlayMod:897
      mmls = [];
      
      //$LASTPOS=35000915;//kernel.PlayMod:915
      //$LASTPOS=35000920;//kernel.PlayMod:920
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=35000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=35001002;//kernel.PlayMod:1002
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
      
      //$LASTPOS=36000049;//kernel.ParallelMod:49
      args = [];
      
      //$LASTPOS=36000068;//kernel.ParallelMod:68
      //$LASTPOS=36000073;//kernel.ParallelMod:73
      i = 1;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=36000119;//kernel.ParallelMod:119
          args.push(arguments[i]);
        }
      }
      //$LASTPOS=36000158;//kernel.ParallelMod:158
      name = arguments[0];
      
      
      //$LASTPOS=36000201;//kernel.ParallelMod:201
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
      
      //$LASTPOS=36000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=36000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=36000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=36000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=36000379;//kernel.ParallelMod:379
      if (! f) {
        throw new Error("メソッド"+n+"が見つかりません");
        
        
      }
      //$LASTPOS=36000448;//kernel.ParallelMod:448
      ag2 = a.toArray();
      
      //$LASTPOS=36000474;//kernel.ParallelMod:474
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
      
      //$LASTPOS=36000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=36000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=36000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=36000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=36000379;//kernel.ParallelMod:379
      if (! f) {
        throw new Error("メソッド"+n+"が見つかりません");
        
        
      }
      //$LASTPOS=36000448;//kernel.ParallelMod:448
      ag2 = a.toArray();
      
      //$LASTPOS=36000474;//kernel.ParallelMod:474
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
      
      //$LASTPOS=37000088;//kernel.Actor:88
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=37000107;//kernel.Actor:107
      if (Tonyu.runMode) {
        //$LASTPOS=37000126;//kernel.Actor:126
        _this.initSprite();
      }
    },
    initSprite :function _trc_Actor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=37000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=37000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=37000287;//kernel.Actor:287
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=37000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=37000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000287;//kernel.Actor:287
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
      
      //$LASTPOS=37000326;//kernel.Actor:326
      if (typeof  l.add!=="function") {
        return _this;
      }
      //$LASTPOS=37000370;//kernel.Actor:370
      if (_this.layer) {
        //$LASTPOS=37000381;//kernel.Actor:381
        _this.layer.remove(_this);
      }
      //$LASTPOS=37000406;//kernel.Actor:406
      l.add(_this);
      //$LASTPOS=37000424;//kernel.Actor:424
      _this.layer=l;
    },
    fiber$changeLayer :function _trc_Actor_f_changeLayer(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000326;//kernel.Actor:326
      if (typeof  l.add!=="function") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=37000370;//kernel.Actor:370
      if (_this.layer) {
        //$LASTPOS=37000381;//kernel.Actor:381
        _this.layer.remove(_this);
      }
      //$LASTPOS=37000406;//kernel.Actor:406
      l.add(_this);
      //$LASTPOS=37000424;//kernel.Actor:424
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
      
      //$LASTPOS=38000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=38000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=38000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=38000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=38000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=38000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=38000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=38000385;//kernel.GameScreen:385
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=38000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=38000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=38000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=38000385;//kernel.GameScreen:385
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000620;//kernel.GameScreen:620
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000620;//kernel.GameScreen:620
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=38000653;//kernel.GameScreen:653
      b = _this.bounds;
      
      //$LASTPOS=38000672;//kernel.GameScreen:672
      _this.fillCanvas();
      //$LASTPOS=38000691;//kernel.GameScreen:691
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=38000718;//kernel.GameScreen:718
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=38000856;//kernel.GameScreen:856
      b = _this.bounds;
      
      //$LASTPOS=38000875;//kernel.GameScreen:875
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
      
      //$LASTPOS=38000856;//kernel.GameScreen:856
      b = _this.bounds;
      
      //$LASTPOS=38000875;//kernel.GameScreen:875
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38001012;//kernel.GameScreen:1012
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38001012;//kernel.GameScreen:1012
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=38001052;//kernel.GameScreen:1052
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=38001090;//kernel.GameScreen:1090
      ctx.save();
      //$LASTPOS=38001107;//kernel.GameScreen:1107
      ctx.fillStyle=_this.bgColor+"";
      //$LASTPOS=38001138;//kernel.GameScreen:1138
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=38001212;//kernel.GameScreen:1212
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=38001052;//kernel.GameScreen:1052
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=38001090;//kernel.GameScreen:1090
      ctx.save();
      //$LASTPOS=38001107;//kernel.GameScreen:1107
      ctx.fillStyle=_this.bgColor+"";
      //$LASTPOS=38001138;//kernel.GameScreen:1138
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=38001212;//kernel.GameScreen:1212
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38001264;//kernel.GameScreen:1264
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38001264;//kernel.GameScreen:1264
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
      
      //$LASTPOS=39000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=39000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=39000082;//kernel.Map:82
      _this.alpha=255;
      //$LASTPOS=39000098;//kernel.Map:98
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=39000117;//kernel.Map:117
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=39000189;//kernel.Map:189
      _this.mapObj=true;
      //$LASTPOS=39000207;//kernel.Map:207
      _this.mapTable=[];
      //$LASTPOS=39000227;//kernel.Map:227
      _this.mapOnTable=[];
      //$LASTPOS=39000249;//kernel.Map:249
      //$LASTPOS=39000253;//kernel.Map:253
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=39000282;//kernel.Map:282
          _this.rows=[];
          //$LASTPOS=39000302;//kernel.Map:302
          //$LASTPOS=39000306;//kernel.Map:306
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=39000339;//kernel.Map:339
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=39000374;//kernel.Map:374
          _this.mapTable.push(_this.rows);
        }
      }
      //$LASTPOS=39000407;//kernel.Map:407
      //$LASTPOS=39000411;//kernel.Map:411
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=39000440;//kernel.Map:440
          _this.rows=[];
          //$LASTPOS=39000460;//kernel.Map:460
          //$LASTPOS=39000464;//kernel.Map:464
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=39000497;//kernel.Map:497
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=39000532;//kernel.Map:532
          _this.mapOnTable.push(_this.rows);
        }
      }
      //$LASTPOS=39000632;//kernel.Map:632
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=39000664;//kernel.Map:664
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=39000690;//kernel.Map:690
      //$LASTPOS=39000694;//kernel.Map:694
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=39000723;//kernel.Map:723
          //$LASTPOS=39000727;//kernel.Map:727
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=39000760;//kernel.Map:760
              _this.set(j,i,_this.mapData[i][j]);
            }
          }
        }
      }
      //$LASTPOS=39000807;//kernel.Map:807
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=39000835;//kernel.Map:835
      //$LASTPOS=39000839;//kernel.Map:839
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=39000868;//kernel.Map:868
          //$LASTPOS=39000872;//kernel.Map:872
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=39000905;//kernel.Map:905
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
      
      //$LASTPOS=39000664;//kernel.Map:664
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000690;//kernel.Map:690
            //$LASTPOS=39000694;//kernel.Map:694
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7     ; break; }
            //$LASTPOS=39000723;//kernel.Map:723
            //$LASTPOS=39000727;//kernel.Map:727
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5     ; break; }
            //$LASTPOS=39000760;//kernel.Map:760
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
            
            //$LASTPOS=39000807;//kernel.Map:807
            if (!(! _this.mapOnData)) { __pc=8     ; break; }
            _thread.exit(_this);return;
          case 8     :
            
            //$LASTPOS=39000835;//kernel.Map:835
            //$LASTPOS=39000839;//kernel.Map:839
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15    ; break; }
            //$LASTPOS=39000868;//kernel.Map:868
            //$LASTPOS=39000872;//kernel.Map:872
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13    ; break; }
            //$LASTPOS=39000905;//kernel.Map:905
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
      
      //$LASTPOS=39000974;//kernel.Map:974
      if (! _this.mapTable) {
        return _this;
      }
      //$LASTPOS=39001001;//kernel.Map:1001
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=39001073;//kernel.Map:1073
      //$LASTPOS=39001077;//kernel.Map:1077
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=39001106;//kernel.Map:1106
          //$LASTPOS=39001110;//kernel.Map:1110
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=39001143;//kernel.Map:1143
              _this.set(j,i,_this.mapTable[i][j]);
            }
          }
        }
      }
      //$LASTPOS=39001191;//kernel.Map:1191
      if (! _this.mapOnTable) {
        return _this;
      }
      //$LASTPOS=39001220;//kernel.Map:1220
      //$LASTPOS=39001224;//kernel.Map:1224
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=39001253;//kernel.Map:1253
          //$LASTPOS=39001257;//kernel.Map:1257
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=39001290;//kernel.Map:1290
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
      
      //$LASTPOS=39000974;//kernel.Map:974
      if (! _this.mapTable) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=39001001;//kernel.Map:1001
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_redrawMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39001073;//kernel.Map:1073
            //$LASTPOS=39001077;//kernel.Map:1077
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7     ; break; }
            //$LASTPOS=39001106;//kernel.Map:1106
            //$LASTPOS=39001110;//kernel.Map:1110
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5     ; break; }
            //$LASTPOS=39001143;//kernel.Map:1143
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
            
            //$LASTPOS=39001191;//kernel.Map:1191
            if (!(! _this.mapOnTable)) { __pc=8     ; break; }
            _thread.exit(_this);return;
          case 8     :
            
            //$LASTPOS=39001220;//kernel.Map:1220
            //$LASTPOS=39001224;//kernel.Map:1224
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15    ; break; }
            //$LASTPOS=39001253;//kernel.Map:1253
            //$LASTPOS=39001257;//kernel.Map:1257
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13    ; break; }
            //$LASTPOS=39001290;//kernel.Map:1290
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
      
      //$LASTPOS=39001365;//kernel.Map:1365
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=39001417;//kernel.Map:1417
      if (! _this.baseData) {
        //$LASTPOS=39001431;//kernel.Map:1431
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=39001467;//kernel.Map:1467
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=39001494;//kernel.Map:1494
      _this.mapData=_this.mapTable;
      //$LASTPOS=39001517;//kernel.Map:1517
      _this.row=_this.mapTable.length;
      //$LASTPOS=39001543;//kernel.Map:1543
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=39001572;//kernel.Map:1572
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=39001601;//kernel.Map:1601
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=39001628;//kernel.Map:1628
      if (! _this.chipWidth&&typeof  _this.baseData[2]=="number") {
        //$LASTPOS=39001676;//kernel.Map:1676
        _this.chipWidth=_this.baseData[2];
      }
      //$LASTPOS=39001704;//kernel.Map:1704
      if (! _this.chipHeight&&typeof  _this.baseData[3]=="number") {
        //$LASTPOS=39001753;//kernel.Map:1753
        _this.chipHeight=_this.baseData[3];
      }
      //$LASTPOS=39001782;//kernel.Map:1782
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=39001854;//kernel.Map:1854
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39001365;//kernel.Map:1365
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=39001417;//kernel.Map:1417
      if (! _this.baseData) {
        //$LASTPOS=39001431;//kernel.Map:1431
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=39001467;//kernel.Map:1467
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=39001494;//kernel.Map:1494
      _this.mapData=_this.mapTable;
      //$LASTPOS=39001517;//kernel.Map:1517
      _this.row=_this.mapTable.length;
      //$LASTPOS=39001543;//kernel.Map:1543
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=39001572;//kernel.Map:1572
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=39001601;//kernel.Map:1601
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=39001628;//kernel.Map:1628
      if (! _this.chipWidth&&typeof  _this.baseData[2]=="number") {
        //$LASTPOS=39001676;//kernel.Map:1676
        _this.chipWidth=_this.baseData[2];
      }
      //$LASTPOS=39001704;//kernel.Map:1704
      if (! _this.chipHeight&&typeof  _this.baseData[3]=="number") {
        //$LASTPOS=39001753;//kernel.Map:1753
        _this.chipHeight=_this.baseData[3];
      }
      //$LASTPOS=39001782;//kernel.Map:1782
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39001854;//kernel.Map:1854
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
      
      //$LASTPOS=39001896;//kernel.Map:1896
      saveDataFile = _this.file("../maps/").rel(saveFileName);
      
      //$LASTPOS=39001954;//kernel.Map:1954
      data = [_this.mapTable,_this.mapOnTable,_this.chipWidth,_this.chipHeight];
      
      //$LASTPOS=39002012;//kernel.Map:2012
      saveDataFile.obj(data);
    },
    fiber$save :function _trc_Map_f_save(_thread,saveFileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var saveDataFile;
      var data;
      
      //$LASTPOS=39001896;//kernel.Map:1896
      saveDataFile = _this.file("../maps/").rel(saveFileName);
      
      //$LASTPOS=39001954;//kernel.Map:1954
      data = [_this.mapTable,_this.mapOnTable,_this.chipWidth,_this.chipHeight];
      
      //$LASTPOS=39002012;//kernel.Map:2012
      saveDataFile.obj(data);
      
      _thread.retVal=_this;return;
    },
    set :function _trc_Map_set(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39002068;//kernel.Map:2068
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=39002136;//kernel.Map:2136
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=39002207;//kernel.Map:2207
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=39002241;//kernel.Map:2241
      p=Math.floor(p);
      //$LASTPOS=39002263;//kernel.Map:2263
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=39002288;//kernel.Map:2288
      if (! _this.pImg) {
        //$LASTPOS=39002310;//kernel.Map:2310
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=39002411;//kernel.Map:2411
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=39002488;//kernel.Map:2488
      _this.ctx.save();
      //$LASTPOS=39002505;//kernel.Map:2505
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=39002649;//kernel.Map:2649
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002068;//kernel.Map:2068
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=39002136;//kernel.Map:2136
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=39002207;//kernel.Map:2207
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=39002241;//kernel.Map:2241
      p=Math.floor(p);
      //$LASTPOS=39002263;//kernel.Map:2263
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=39002288;//kernel.Map:2288
      if (! _this.pImg) {
        //$LASTPOS=39002310;//kernel.Map:2310
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=39002411;//kernel.Map:2411
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=39002488;//kernel.Map:2488
      _this.ctx.save();
      //$LASTPOS=39002505;//kernel.Map:2505
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=39002649;//kernel.Map:2649
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39002698;//kernel.Map:2698
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=39002766;//kernel.Map:2766
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=39002816;//kernel.Map:2816
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=39002851;//kernel.Map:2851
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=39002885;//kernel.Map:2885
      p=Math.floor(p);
      //$LASTPOS=39002907;//kernel.Map:2907
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=39002932;//kernel.Map:2932
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=39002956;//kernel.Map:2956
      _this.ctx.save();
      //$LASTPOS=39002973;//kernel.Map:2973
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=39003117;//kernel.Map:3117
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002698;//kernel.Map:2698
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002766;//kernel.Map:2766
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39002816;//kernel.Map:2816
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=39002851;//kernel.Map:2851
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=39002885;//kernel.Map:2885
            p=Math.floor(p);
            //$LASTPOS=39002907;//kernel.Map:2907
            _this.pImg=Tonyu.globals.$imageList[p];
            //$LASTPOS=39002932;//kernel.Map:2932
            if (!(! _this.pImg)) { __pc=2     ; break; }
            _thread.exit(_this);return;
          case 2     :
            
            //$LASTPOS=39002956;//kernel.Map:2956
            _this.ctx.save();
            //$LASTPOS=39002973;//kernel.Map:2973
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=39003117;//kernel.Map:3117
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39003164;//kernel.Map:3164
      _this.setOn(Math.floor((setX-_this.sx)/_this.chipWidth),Math.floor((setY-_this.sy)/_this.chipHeight),p);
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
            //$LASTPOS=39003164;//kernel.Map:3164
            _this.fiber$setOn(_thread, Math.floor((setX-_this.sx)/_this.chipWidth), Math.floor((setY-_this.sy)/_this.chipHeight), p);
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
      
      //$LASTPOS=39003269;//kernel.Map:3269
      _this.set(Math.floor((setX-_this.sx)/_this.chipWidth),Math.floor((setY-_this.sy)/_this.chipHeight),p);
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
            //$LASTPOS=39003269;//kernel.Map:3269
            _this.fiber$set(_thread, Math.floor((setX-_this.sx)/_this.chipWidth), Math.floor((setY-_this.sy)/_this.chipHeight), p);
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
      
      //$LASTPOS=39003372;//kernel.Map:3372
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
      
      //$LASTPOS=39003372;//kernel.Map:3372
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getAt :function _trc_Map_getAt(getX,getY) {
      "use strict";
      var _this=this;
      
      return _this.get(Math.floor((getX-_this.sx)/_this.chipWidth),Math.floor((getY-_this.sy)/_this.chipHeight));
    },
    fiber$getAt :function _trc_Map_f_getAt(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.get(Math.floor((getX-_this.sx)/_this.chipWidth),Math.floor((getY-_this.sy)/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    getOn :function _trc_Map_getOn(getCol,getRow) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39003614;//kernel.Map:3614
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
      
      //$LASTPOS=39003614;//kernel.Map:3614
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapOnTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getOnAt :function _trc_Map_getOnAt(getX,getY) {
      "use strict";
      var _this=this;
      
      return _this.getOn(Math.floor((getX-_this.sx)/_this.chipWidth),Math.floor((getY-_this.sy)/_this.chipHeight));
    },
    fiber$getOnAt :function _trc_Map_f_getOnAt(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getOn(Math.floor((getX-_this.sx)/_this.chipWidth),Math.floor((getY-_this.sy)/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Map_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39003867;//kernel.Map:3867
      _this.sx=- scrollX;
      //$LASTPOS=39003885;//kernel.Map:3885
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39003867;//kernel.Map:3867
      _this.sx=- scrollX;
      //$LASTPOS=39003885;//kernel.Map:3885
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39003920;//kernel.Map:3920
      _this.pImg=_this.buf[0];
      //$LASTPOS=39003938;//kernel.Map:3938
      ctx.save();
      //$LASTPOS=39003955;//kernel.Map:3955
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=39003987;//kernel.Map:3987
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=39004099;//kernel.Map:4099
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
      
      //$LASTPOS=40000102;//kernel.Panel:102
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=40000171;//kernel.Panel:171
      if (_this.canvas) {
        //$LASTPOS=40000194;//kernel.Panel:194
        _this.width=_this.canvas.width;
        //$LASTPOS=40000223;//kernel.Panel:223
        _this.height=_this.canvas.height;
        //$LASTPOS=40000254;//kernel.Panel:254
        _this.parallel("watchResize");
        
      } else {
        //$LASTPOS=40000302;//kernel.Panel:302
        _this.setPanel(_this.width||Tonyu.globals.$screenWidth||465,_this.height||Tonyu.globals.$screenHeight||465);
        
      }
      //$LASTPOS=40000426;//kernel.Panel:426
      if (_this._fillStyle&&_this.canvas) {
        //$LASTPOS=40000452;//kernel.Panel:452
        _this.canvas.getContext("2d").fillStyle=_this._fillStyle+"";
      }
      //$LASTPOS=40000506;//kernel.Panel:506
      _this.x=_this.x||_this.width/2;
      //$LASTPOS=40000525;//kernel.Panel:525
      _this.y=_this.y||_this.height/2;
      //$LASTPOS=40000545;//kernel.Panel:545
      if (_this.align==null) {
        //$LASTPOS=40000561;//kernel.Panel:561
        _this.align="center";
      }
      //$LASTPOS=40000582;//kernel.Panel:582
      if (_this.alpha==null) {
        //$LASTPOS=40000598;//kernel.Panel:598
        _this.alpha=255;
      }
      //$LASTPOS=40000614;//kernel.Panel:614
      if (_this._drawn==null) {
        //$LASTPOS=40000631;//kernel.Panel:631
        _this._drawn=false;
      }
    },
    watchResize :function _trc_Panel_watchResize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000671;//kernel.Panel:671
      while (true) {
        //$LASTPOS=40000694;//kernel.Panel:694
        if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
          //$LASTPOS=40000759;//kernel.Panel:759
          _this.width=_this.canvas.width;
          //$LASTPOS=40000778;//kernel.Panel:778
          _this.height=_this.canvas.height;
          //$LASTPOS=40000813;//kernel.Panel:813
          _this.fireEvent("resize",{width: _this.width,height: _this.height});
          
        }
        //$LASTPOS=40000869;//kernel.Panel:869
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
            //$LASTPOS=40000671;//kernel.Panel:671
          case 1:
            //$LASTPOS=40000694;//kernel.Panel:694
            if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
              //$LASTPOS=40000759;//kernel.Panel:759
              _this.width=_this.canvas.width;
              //$LASTPOS=40000778;//kernel.Panel:778
              _this.height=_this.canvas.height;
              //$LASTPOS=40000813;//kernel.Panel:813
              _this.fireEvent("resize",{width: _this.width,height: _this.height});
              
            }
            //$LASTPOS=40000869;//kernel.Panel:869
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
      
      //$LASTPOS=40000949;//kernel.Panel:949
      _this.width=_this.trunc(width);
      //$LASTPOS=40000979;//kernel.Panel:979
      _this.height=_this.trunc(height);
      //$LASTPOS=40001011;//kernel.Panel:1011
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=40001054;//kernel.Panel:1054
      _this.canvas=_this.buf[0];
      //$LASTPOS=40001074;//kernel.Panel:1074
      _this.fireEvent("resize",{width: width,height: height,force: true});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000949;//kernel.Panel:949
      _this.width=_this.trunc(width);
      //$LASTPOS=40000979;//kernel.Panel:979
      _this.height=_this.trunc(height);
      //$LASTPOS=40001011;//kernel.Panel:1011
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=40001054;//kernel.Panel:1054
      _this.canvas=_this.buf[0];
      //$LASTPOS=40001074;//kernel.Panel:1074
      _this.fireEvent("resize",{width: width,height: height,force: true});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001153;//kernel.Panel:1153
      if (_this.width==width&&_this.height==height) {
        return _this;
      }
      //$LASTPOS=40001212;//kernel.Panel:1212
      _this.setPanel(width,height);
    },
    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001153;//kernel.Panel:1153
      if (_this.width==width&&_this.height==height) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Panel_ent_resize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40001212;//kernel.Panel:1212
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
      
      //$LASTPOS=40001260;//kernel.Panel:1260
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001260;//kernel.Panel:1260
      _this._drawn=true;
      _thread.retVal=_this.canvas.getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    __getter__context :function _trc_Panel___getter__context() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001330;//kernel.Panel:1330
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    __getter__image :function _trc_Panel___getter__image() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001398;//kernel.Panel:1398
      _this._drawn=true;
      return _this.canvas;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001462;//kernel.Panel:1462
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001462;//kernel.Panel:1462
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    __getter__fillStyle :function _trc_Panel___getter__fillStyle() {
      "use strict";
      var _this=this;
      
      return _this._fillStyle;
    },
    __setter__fillStyle :function _trc_Panel___setter__fillStyle(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001546;//kernel.Panel:1546
      _this._fillStyle=val;
      //$LASTPOS=40001567;//kernel.Panel:1567
      if (! _this.canvas) {
        return _this;
      }
      //$LASTPOS=40001593;//kernel.Panel:1593
      _this.context.fillStyle=val+"";
    },
    __setter__strokeStyle :function _trc_Panel___setter__strokeStyle(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001647;//kernel.Panel:1647
      _this.context.strokeStyle=val+"";
    },
    __setter__lineWidth :function _trc_Panel___setter__lineWidth(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001701;//kernel.Panel:1701
      _this.context.lineWidth=val;
    },
    fillCircle :function _trc_Panel_fillCircle(x,y,r) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=40001754;//kernel.Panel:1754
      ctx = _this.context;
      
      //$LASTPOS=40001776;//kernel.Panel:1776
      ctx.fillStyle=_this.fillStyle+"";
      //$LASTPOS=40001809;//kernel.Panel:1809
      ctx.beginPath();
      //$LASTPOS=40001831;//kernel.Panel:1831
      ctx.arc(x,y,r,0,2*Tonyu.globals.$Math.PI);
      //$LASTPOS=40001865;//kernel.Panel:1865
      ctx.closePath();
      //$LASTPOS=40001887;//kernel.Panel:1887
      ctx.fill();
    },
    fiber$fillCircle :function _trc_Panel_f_fillCircle(_thread,x,y,r) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=40001754;//kernel.Panel:1754
      ctx = _this.context;
      
      //$LASTPOS=40001776;//kernel.Panel:1776
      ctx.fillStyle=_this.fillStyle+"";
      //$LASTPOS=40001809;//kernel.Panel:1809
      ctx.beginPath();
      //$LASTPOS=40001831;//kernel.Panel:1831
      ctx.arc(x,y,r,0,2*Tonyu.globals.$Math.PI);
      //$LASTPOS=40001865;//kernel.Panel:1865
      ctx.closePath();
      //$LASTPOS=40001887;//kernel.Panel:1887
      ctx.fill();
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=40001945;//kernel.Panel:1945
      ctx = _this.getContext();
      
      //$LASTPOS=40001972;//kernel.Panel:1972
      ctx.save();
      //$LASTPOS=40002039;//kernel.Panel:2039
      ctx.fillStyle=_this.fillStyle+"";
      //$LASTPOS=40002072;//kernel.Panel:2072
      ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=40002117;//kernel.Panel:2117
      ctx.restore();
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      "use strict";
      var _this=this;
      var ctx;
      var splits;
      var f;
      var colCount;
      
      //$LASTPOS=40002173;//kernel.Panel:2173
      ctx = _this.getContext();
      
      //$LASTPOS=40002200;//kernel.Panel:2200
      ctx.save();
      //$LASTPOS=40002217;//kernel.Panel:2217
      text=text+"";
      //$LASTPOS=40002236;//kernel.Panel:2236
      splits = text.split("\n");
      
      //$LASTPOS=40002322;//kernel.Panel:2322
      ctx.textAlign=align||"center";
      //$LASTPOS=40002361;//kernel.Panel:2361
      size=size||15;
      //$LASTPOS=40002381;//kernel.Panel:2381
      ctx.fillStyle=_this.fillStyle+"";
      //$LASTPOS=40002414;//kernel.Panel:2414
      f = ctx.font.replace(/^[0-9\.]+/,"");
      
      //$LASTPOS=40002459;//kernel.Panel:2459
      ctx.font=size+f;
      //$LASTPOS=40002481;//kernel.Panel:2481
      //$LASTPOS=40002485;//kernel.Panel:2485
      colCount = 0;
      for (; colCount<splits.length ; colCount++) {
        {
          //$LASTPOS=40002545;//kernel.Panel:2545
          ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=40002590;//kernel.Panel:2590
          y+=size;
        }
      }
      //$LASTPOS=40002611;//kernel.Panel:2611
      ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var splits;
      var f;
      var colCount;
      
      
      _thread.enter(function _trc_Panel_ent_fillText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40002173;//kernel.Panel:2173
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=40002200;//kernel.Panel:2200
            ctx.save();
            //$LASTPOS=40002217;//kernel.Panel:2217
            text=text+"";
            //$LASTPOS=40002236;//kernel.Panel:2236
            splits = text.split("\n");
            
            //$LASTPOS=40002322;//kernel.Panel:2322
            ctx.textAlign=align||"center";
            //$LASTPOS=40002361;//kernel.Panel:2361
            size=size||15;
            //$LASTPOS=40002381;//kernel.Panel:2381
            ctx.fillStyle=_this.fillStyle+"";
            //$LASTPOS=40002414;//kernel.Panel:2414
            f = ctx.font.replace(/^[0-9\.]+/,"");
            
            //$LASTPOS=40002459;//kernel.Panel:2459
            ctx.font=size+f;
            //$LASTPOS=40002481;//kernel.Panel:2481
            //$LASTPOS=40002485;//kernel.Panel:2485
            colCount = 0;
            for (; colCount<splits.length ; colCount++) {
              {
                //$LASTPOS=40002545;//kernel.Panel:2545
                ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=40002590;//kernel.Panel:2590
                y+=size;
              }
            }
            //$LASTPOS=40002611;//kernel.Panel:2611
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
      
      //$LASTPOS=40002676;//kernel.Panel:2676
      ctx = _this.getContext();
      
      //$LASTPOS=40002703;//kernel.Panel:2703
      ctx.save();
      //$LASTPOS=40002720;//kernel.Panel:2720
      ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=40002769;//kernel.Panel:2769
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
            //$LASTPOS=40002676;//kernel.Panel:2676
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=40002703;//kernel.Panel:2703
            ctx.save();
            //$LASTPOS=40002720;//kernel.Panel:2720
            ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=40002769;//kernel.Panel:2769
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
      
      
      //$LASTPOS=40002829;//kernel.Panel:2829
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=40002927;//kernel.Panel:2927
        ctx=_this.getContext();
        //$LASTPOS=40002954;//kernel.Panel:2954
        _this.imagedata=ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=40003006;//kernel.Panel:3006
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=40003146;//kernel.Panel:3146
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
            //$LASTPOS=40002829;//kernel.Panel:2829
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2     ; break; }
            //$LASTPOS=40002927;//kernel.Panel:2927
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=40002954;//kernel.Panel:2954
            _this.imagedata=ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=40003006;//kernel.Panel:3006
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3     ;break;
          case 2     :
            {
              //$LASTPOS=40003146;//kernel.Panel:3146
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
      
      //$LASTPOS=40003233;//kernel.Panel:3233
      ctx = _this.getContext();
      
      //$LASTPOS=40003260;//kernel.Panel:3260
      ctx.save();
      //$LASTPOS=40003277;//kernel.Panel:3277
      _this.imagedata=ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=40003338;//kernel.Panel:3338
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=40003372;//kernel.Panel:3372
      ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=40003424;//kernel.Panel:3424
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
            //$LASTPOS=40003233;//kernel.Panel:3233
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=40003260;//kernel.Panel:3260
            ctx.save();
            //$LASTPOS=40003277;//kernel.Panel:3277
            _this.imagedata=ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=40003338;//kernel.Panel:3338
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40003372;//kernel.Panel:3372
            ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=40003424;//kernel.Panel:3424
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
      
      //$LASTPOS=40003460;//kernel.Panel:3460
      if (_this._drawn) {
        //$LASTPOS=40003481;//kernel.Panel:3481
        pImg = _this.canvas;
        
        //$LASTPOS=40003507;//kernel.Panel:3507
        ctx.save();
        //$LASTPOS=40003528;//kernel.Panel:3528
        if (_this.align=="left") {
          //$LASTPOS=40003560;//kernel.Panel:3560
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=40003612;//kernel.Panel:3612
          if (_this.align=="center") {
            //$LASTPOS=40003646;//kernel.Panel:3646
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=40003681;//kernel.Panel:3681
            if (_this.align=="right") {
              //$LASTPOS=40003714;//kernel.Panel:3714
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=40003771;//kernel.Panel:3771
        if (_this.rotation!=0) {
          //$LASTPOS=40003806;//kernel.Panel:3806
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=40003874;//kernel.Panel:3874
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=40003931;//kernel.Panel:3931
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=40003983;//kernel.Panel:3983
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=40004048;//kernel.Panel:4048
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=40004104;//kernel.Panel:4104
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=40004145;//kernel.Panel:4145
        ctx.drawImage(pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=40004249;//kernel.Panel:4249
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
      
      //$LASTPOS=40004316;//kernel.Panel:4316
      pImg = Tonyu.globals.$imageList[p];
      
      //$LASTPOS=40004345;//kernel.Panel:4345
      if (options===true) {
        //$LASTPOS=40004365;//kernel.Panel:4365
        options={f: true};
      }
      //$LASTPOS=40004388;//kernel.Panel:4388
      options=options||{};
      //$LASTPOS=40004414;//kernel.Panel:4414
      scaleX = typeof  (options.scaleX)==="number"?options.scaleX:1;
      
      //$LASTPOS=40004483;//kernel.Panel:4483
      scaleY = typeof  (options.scaleY)==="number"?options.scaleY:scaleX;
      
      //$LASTPOS=40004557;//kernel.Panel:4557
      rotation = options.rotation||options.angle||0;
      
      //$LASTPOS=40004611;//kernel.Panel:4611
      ctx = _this.context;
      
      //$LASTPOS=40004633;//kernel.Panel:4633
      if (options.f) {
        //$LASTPOS=40004648;//kernel.Panel:4648
        scaleX*=- 1;
      }
      //$LASTPOS=40004667;//kernel.Panel:4667
      ctx.save();
      //$LASTPOS=40004684;//kernel.Panel:4684
      ctx.translate(x,y);
      //$LASTPOS=40004709;//kernel.Panel:4709
      ctx.rotate(rotation/180*Math.PI);
      //$LASTPOS=40004748;//kernel.Panel:4748
      ctx.scale(scaleX,scaleY);
      //$LASTPOS=40004779;//kernel.Panel:4779
      ctx.drawImage(pImg.image,pImg.x,pImg.y,pImg.width,pImg.height,- pImg.width/2,- pImg.height/2,pImg.width,pImg.height);
      //$LASTPOS=40004919;//kernel.Panel:4919
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
      var params;
      
      
      //$LASTPOS=40005157;//kernel.Panel:5157
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=40005194;//kernel.Panel:5194
      srcPanel = a.shift(Tonyu.classes.kernel.Panel)||_this;
      
      //$LASTPOS=40005236;//kernel.Panel:5236
      if (a.length<=4) {
        //$LASTPOS=40005264;//kernel.Panel:5264
        dx=a.shift();
        //$LASTPOS=40005287;//kernel.Panel:5287
        dy=a.shift();
        //$LASTPOS=40005310;//kernel.Panel:5310
        if (a.length==0) {
          //$LASTPOS=40005342;//kernel.Panel:5342
          _this.context.drawImage(srcPanel.image,dx,dy);
          
        } else {
          //$LASTPOS=40005415;//kernel.Panel:5415
          dw=a.shift();
          //$LASTPOS=40005442;//kernel.Panel:5442
          dh=a.shift();
          //$LASTPOS=40005469;//kernel.Panel:5469
          if (dw*dh!=0) {
            //$LASTPOS=40005502;//kernel.Panel:5502
            _this.context.drawImage(srcPanel.image,dx,dy,dw,dh);
            
          }
          
        }
        
      } else {
        //$LASTPOS=40005598;//kernel.Panel:5598
        sx=a.shift();
        //$LASTPOS=40005621;//kernel.Panel:5621
        sy=a.shift();
        //$LASTPOS=40005644;//kernel.Panel:5644
        sw=a.shift();
        //$LASTPOS=40005667;//kernel.Panel:5667
        sh=a.shift();
        //$LASTPOS=40005690;//kernel.Panel:5690
        dx=a.shift();
        //$LASTPOS=40005713;//kernel.Panel:5713
        if (typeof  dx==="object") {
          //$LASTPOS=40005754;//kernel.Panel:5754
          params = dx;
          
          
        }
        //$LASTPOS=40005840;//kernel.Panel:5840
        dy=a.shift();
        //$LASTPOS=40005863;//kernel.Panel:5863
        dw=a.shift()||sw;
        //$LASTPOS=40005892;//kernel.Panel:5892
        dh=a.shift()||sh;
        //$LASTPOS=40005971;//kernel.Panel:5971
        if (sw*sh*dw*dh!=0) {
          //$LASTPOS=40006006;//kernel.Panel:6006
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
      
      //$LASTPOS=40006124;//kernel.Panel:6124
      if (toLayer==null) {
        //$LASTPOS=40006143;//kernel.Panel:6143
        toLayer=_this;
      }
      //$LASTPOS=40006162;//kernel.Panel:6162
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=40006199;//kernel.Panel:6199
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=40006254;//kernel.Panel:6254
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=40006306;//kernel.Panel:6306
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=40006337;//kernel.Panel:6337
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=40006369;//kernel.Panel:6369
        rt = _this.rotation;
        
        //$LASTPOS=40006567;//kernel.Panel:6567
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=40006624;//kernel.Panel:6624
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};
        
      } else {
        //$LASTPOS=40006811;//kernel.Panel:6811
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=40006863;//kernel.Panel:6863
          rt = - _this.rotation;
          
          //$LASTPOS=40006890;//kernel.Panel:6890
          dx = obj.x-(_this.x);
          
          //$LASTPOS=40006922;//kernel.Panel:6922
          dy = obj.y-(_this.y);
          
          //$LASTPOS=40007178;//kernel.Panel:7178
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=40007238;//kernel.Panel:7238
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          return {x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};
          
        } else {
          //$LASTPOS=40007429;//kernel.Panel:7429
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
      
      //$LASTPOS=40006124;//kernel.Panel:6124
      if (toLayer==null) {
        //$LASTPOS=40006143;//kernel.Panel:6143
        toLayer=_this;
      }
      //$LASTPOS=40006162;//kernel.Panel:6162
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=40006199;//kernel.Panel:6199
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=40006254;//kernel.Panel:6254
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=40006306;//kernel.Panel:6306
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=40006337;//kernel.Panel:6337
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=40006369;//kernel.Panel:6369
        rt = _this.rotation;
        
        //$LASTPOS=40006567;//kernel.Panel:6567
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=40006624;//kernel.Panel:6624
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        _thread.retVal={x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};return;
        
        
      } else {
        //$LASTPOS=40006811;//kernel.Panel:6811
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=40006863;//kernel.Panel:6863
          rt = - _this.rotation;
          
          //$LASTPOS=40006890;//kernel.Panel:6890
          dx = obj.x-(_this.x);
          
          //$LASTPOS=40006922;//kernel.Panel:6922
          dy = obj.y-(_this.y);
          
          //$LASTPOS=40007178;//kernel.Panel:7178
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=40007238;//kernel.Panel:7238
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          _thread.retVal={x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};return;
          
          
        } else {
          //$LASTPOS=40007429;//kernel.Panel:7429
          _this.print("no support",obj.layer,toLayer);
          throw new Error("not support");
          
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Panel_drawLine(x,y,dx,dy) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40007549;//kernel.Panel:7549
      if (dx==null&&dy==null) {
        //$LASTPOS=40007586;//kernel.Panel:7586
        if (x==null&&y==null) {
          //$LASTPOS=40007625;//kernel.Panel:7625
          _this.px=null;
          //$LASTPOS=40007633;//kernel.Panel:7633
          _this.py=null;
          return _this;
          
        }
        //$LASTPOS=40007669;//kernel.Panel:7669
        if (_this.px==null&&_this.py==null) {
          //$LASTPOS=40007710;//kernel.Panel:7710
          _this.px=x;
          //$LASTPOS=40007715;//kernel.Panel:7715
          _this.py=y;
          return _this;
          
        }
        //$LASTPOS=40007748;//kernel.Panel:7748
        dx=x;
        //$LASTPOS=40007753;//kernel.Panel:7753
        dy=y;
        //$LASTPOS=40007758;//kernel.Panel:7758
        x=_this.px;
        //$LASTPOS=40007763;//kernel.Panel:7763
        y=_this.py;
        //$LASTPOS=40007768;//kernel.Panel:7768
        _this.px=dx;
        //$LASTPOS=40007774;//kernel.Panel:7774
        _this.py=dy;
        
      }
      //$LASTPOS=40007793;//kernel.Panel:7793
      _this.context.beginPath();
      //$LASTPOS=40007819;//kernel.Panel:7819
      _this.context.moveTo(x,y);
      //$LASTPOS=40007845;//kernel.Panel:7845
      _this.context.lineTo(dx,dy);
      //$LASTPOS=40007873;//kernel.Panel:7873
      _this.context.stroke();
    },
    slicePattern :function _trc_Panel_slicePattern(x,y,width,height) {
      "use strict";
      var _this=this;
      
      return {image: _this.canvas,x: x,y: y,width: width,height: height};
    },
    fiber$slicePattern :function _trc_Panel_f_slicePattern(_thread,x,y,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal={image: _this.canvas,x: x,y: y,width: width,height: height};return;
      
      
      _thread.retVal=_this;return;
    },
    addPattern :function _trc_Panel_addPattern(x,y,width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40008015;//kernel.Panel:8015
      Tonyu.globals.$imageList.push(_this.slicePattern(x,y,width,height));
      return Tonyu.globals.$imageList.length-1;
    },
    fiber$addPattern :function _trc_Panel_f_addPattern(_thread,x,y,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40008015;//kernel.Panel:8015
      Tonyu.globals.$imageList.push(_this.slicePattern(x,y,width,height));
      _thread.retVal=Tonyu.globals.$imageList.length-1;return;
      
      
      _thread.retVal=_this;return;
    },
    getImageData :function _trc_Panel_getImageData(x,y,width,height) {
      "use strict";
      var _this=this;
      
      return _this.context.getImageData(x,y,width,height);
    },
    fiber$getImageData :function _trc_Panel_f_getImageData(_thread,x,y,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.context.getImageData(x,y,width,height);return;
      
      
      _thread.retVal=_this;return;
    },
    putImageData :function _trc_Panel_putImageData(data,x,y) {
      "use strict";
      var _this=this;
      
      return _this.context.putImageData(data,x,y);
    },
    fiber$putImageData :function _trc_Panel_f_putImageData(_thread,data,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.context.putImageData(data,x,y);return;
      
      
      _thread.retVal=_this;return;
    },
    replace :function _trc_Panel_replace(x,y,width,height,replacement) {
      "use strict";
      var _this=this;
      
    },
    fiber$replace :function _trc_Panel_f_replace(_thread,x,y,width,height,replacement) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    save :function _trc_Panel_save(fn) {
      "use strict";
      var _this=this;
      var url;
      
      //$LASTPOS=40008331;//kernel.Panel:8331
      url = _this.buf[0].toDataURL();
      
      //$LASTPOS=40008364;//kernel.Panel:8364
      if (typeof  fn==="string") {
        //$LASTPOS=40008390;//kernel.Panel:8390
        fn=_this.file(fn);
      }
      return fn.text(url);
    },
    fiber$save :function _trc_Panel_f_save(_thread,fn) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      
      //$LASTPOS=40008331;//kernel.Panel:8331
      url = _this.buf[0].toDataURL();
      
      
      _thread.enter(function _trc_Panel_ent_save(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40008364;//kernel.Panel:8364
            if (!(typeof  fn==="string")) { __pc=2     ; break; }
            //$LASTPOS=40008390;//kernel.Panel:8390
            _this.fiber$file(_thread, fn);
            __pc=1;return;
          case 1:
            fn=_thread.retVal;
            
          case 2     :
            
            _thread.exit(fn.text(url));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    load :function _trc_Panel_load(fn) {
      "use strict";
      var _this=this;
      var d;
      var url;
      var element;
      
      //$LASTPOS=40008452;//kernel.Panel:8452
      if (typeof  fn==="string") {
        //$LASTPOS=40008478;//kernel.Panel:8478
        fn=_this.file(fn);
      }
      //$LASTPOS=40008496;//kernel.Panel:8496
      d = new $.Deferred();
      
      //$LASTPOS=40008525;//kernel.Panel:8525
      url = fn.text();
      
      //$LASTPOS=40008549;//kernel.Panel:8549
      element = $("<img>").css({display: "none"}).appendTo("body");
      
      //$LASTPOS=40008615;//kernel.Panel:8615
      element.on("load",(function anonymous_8634() {
        var img;
        var width;
        var height;
        
        //$LASTPOS=40008646;//kernel.Panel:8646
        img = new Image();
        
        //$LASTPOS=40008678;//kernel.Panel:8678
        img.src=element.attr('src');
        //$LASTPOS=40008718;//kernel.Panel:8718
        width = img.width;
        
        //$LASTPOS=40008750;//kernel.Panel:8750
        height = img.height;
        
        //$LASTPOS=40008816;//kernel.Panel:8816
        _this.resize(width,height);
        //$LASTPOS=40008847;//kernel.Panel:8847
        _this.context.drawImage(img,0,0);
        //$LASTPOS=40008885;//kernel.Panel:8885
        d.resolve(_this);
      }));
      //$LASTPOS=40008915;//kernel.Panel:8915
      element.attr({src: url});
      return d.promise();
    },
    fiber$load :function _trc_Panel_f_load(_thread,fn) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var url;
      var element;
      
      
      _thread.enter(function _trc_Panel_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40008452;//kernel.Panel:8452
            if (!(typeof  fn==="string")) { __pc=2     ; break; }
            //$LASTPOS=40008478;//kernel.Panel:8478
            _this.fiber$file(_thread, fn);
            __pc=1;return;
          case 1:
            fn=_thread.retVal;
            
          case 2     :
            
            //$LASTPOS=40008496;//kernel.Panel:8496
            d = new $.Deferred();
            
            //$LASTPOS=40008525;//kernel.Panel:8525
            url = fn.text();
            
            //$LASTPOS=40008549;//kernel.Panel:8549
            element = $("<img>").css({display: "none"}).appendTo("body");
            
            //$LASTPOS=40008615;//kernel.Panel:8615
            element.on("load",(function anonymous_8634() {
              var img;
              var width;
              var height;
              
              //$LASTPOS=40008646;//kernel.Panel:8646
              img = new Image();
              
              //$LASTPOS=40008678;//kernel.Panel:8678
              img.src=element.attr('src');
              //$LASTPOS=40008718;//kernel.Panel:8718
              width = img.width;
              
              //$LASTPOS=40008750;//kernel.Panel:8750
              height = img.height;
              
              //$LASTPOS=40008816;//kernel.Panel:8816
              _this.resize(width,height);
              //$LASTPOS=40008847;//kernel.Panel:8847
              _this.context.drawImage(img,0,0);
              //$LASTPOS=40008885;//kernel.Panel:8885
              d.resolve(_this);
            }));
            //$LASTPOS=40008915;//kernel.Panel:8915
            element.attr({src: url});
            _thread.exit(d.promise());return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"watchResize":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"__getter__context":{"nowait":true},"__getter__image":{"nowait":true},"setFillStyle":{"nowait":false},"__getter__fillStyle":{"nowait":true},"__setter__fillStyle":{"nowait":true},"__setter__strokeStyle":{"nowait":true},"__setter__lineWidth":{"nowait":true},"fillCircle":{"nowait":false},"fillRect":{"nowait":true},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true},"drawSprite":{"nowait":true},"copy":{"nowait":true},"convert":{"nowait":false},"drawLine":{"nowait":true},"slicePattern":{"nowait":false},"addPattern":{"nowait":false},"getImageData":{"nowait":false},"putImageData":{"nowait":false},"replace":{"nowait":false},"save":{"nowait":false},"load":{"nowait":false}},"fields":{"canvas":{},"_fillStyle":{},"_drawn":{},"buf":{},"context":{},"imagedata":{},"colordata":{},"px":{},"py":{}}}
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
      
      //$LASTPOS=41000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=41000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=41000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=41000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=41000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=41000257;//kernel.ScaledCanvas:257
      _this._color="rgb(20,80,180)";
      //$LASTPOS=41000292;//kernel.ScaledCanvas:292
      _this.sx=0;
      //$LASTPOS=41000303;//kernel.ScaledCanvas:303
      _this.sy=0;
      //$LASTPOS=41000314;//kernel.ScaledCanvas:314
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=41000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=41000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=41000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=41000504;//kernel.ScaledCanvas:504
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=41000529;//kernel.ScaledCanvas:529
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=41000556;//kernel.ScaledCanvas:556
      if (Tonyu.globals.$panel) {
        //$LASTPOS=41000577;//kernel.ScaledCanvas:577
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=41000631;//kernel.ScaledCanvas:631
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=41000665;//kernel.ScaledCanvas:665
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=41000703;//kernel.ScaledCanvas:703
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=41000731;//kernel.ScaledCanvas:731
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=41000792;//kernel.ScaledCanvas:792
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=41000833;//kernel.ScaledCanvas:833
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=41000875;//kernel.ScaledCanvas:875
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=41000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=41000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=41000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=41000504;//kernel.ScaledCanvas:504
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=41000529;//kernel.ScaledCanvas:529
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=41000556;//kernel.ScaledCanvas:556
      if (Tonyu.globals.$panel) {
        //$LASTPOS=41000577;//kernel.ScaledCanvas:577
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=41000631;//kernel.ScaledCanvas:631
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=41000665;//kernel.ScaledCanvas:665
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=41000703;//kernel.ScaledCanvas:703
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=41000731;//kernel.ScaledCanvas:731
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=41000792;//kernel.ScaledCanvas:792
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=41000833;//kernel.ScaledCanvas:833
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=41000875;//kernel.ScaledCanvas:875
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=41000997;//kernel.ScaledCanvas:997
      larger = 200;
      
      //$LASTPOS=41001018;//kernel.ScaledCanvas:1018
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
      
      //$LASTPOS=41000997;//kernel.ScaledCanvas:997
      larger = 200;
      
      //$LASTPOS=41001018;//kernel.ScaledCanvas:1018
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
      
      //$LASTPOS=41001153;//kernel.ScaledCanvas:1153
      _this.cw=_this.canvas.width();
      //$LASTPOS=41001177;//kernel.ScaledCanvas:1177
      _this.ch=_this.canvas.height();
      //$LASTPOS=41001202;//kernel.ScaledCanvas:1202
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=41001246;//kernel.ScaledCanvas:1246
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=41001290;//kernel.ScaledCanvas:1290
      if (calch>_this.ch) {
        //$LASTPOS=41001304;//kernel.ScaledCanvas:1304
        calch=_this.ch;
      }
      //$LASTPOS=41001319;//kernel.ScaledCanvas:1319
      if (calcw>_this.cw) {
        //$LASTPOS=41001333;//kernel.ScaledCanvas:1333
        calcw=_this.cw;
      }
      //$LASTPOS=41001348;//kernel.ScaledCanvas:1348
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=41001380;//kernel.ScaledCanvas:1380
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=41001436;//kernel.ScaledCanvas:1436
        calcw=_this.width;
        //$LASTPOS=41001448;//kernel.ScaledCanvas:1448
        calch=_this.height;
        
      }
      //$LASTPOS=41001474;//kernel.ScaledCanvas:1474
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=41001517;//kernel.ScaledCanvas:1517
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=41001560;//kernel.ScaledCanvas:1560
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=41001674;//kernel.ScaledCanvas:1674
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=41001718;//kernel.ScaledCanvas:1718
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=41001762;//kernel.ScaledCanvas:1762
      if (calch>_this.ch) {
        //$LASTPOS=41001776;//kernel.ScaledCanvas:1776
        calch=_this.ch;
      }
      //$LASTPOS=41001791;//kernel.ScaledCanvas:1791
      if (calcw>_this.cw) {
        //$LASTPOS=41001805;//kernel.ScaledCanvas:1805
        calcw=_this.cw;
      }
      //$LASTPOS=41001820;//kernel.ScaledCanvas:1820
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=41001876;//kernel.ScaledCanvas:1876
        calcw=_this.width;
        //$LASTPOS=41001888;//kernel.ScaledCanvas:1888
        calch=_this.height;
        
      }
      //$LASTPOS=41001914;//kernel.ScaledCanvas:1914
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=41001957;//kernel.ScaledCanvas:1957
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=41002053;//kernel.ScaledCanvas:2053
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
      
      //$LASTPOS=41001674;//kernel.ScaledCanvas:1674
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=41001718;//kernel.ScaledCanvas:1718
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=41001762;//kernel.ScaledCanvas:1762
      if (calch>_this.ch) {
        //$LASTPOS=41001776;//kernel.ScaledCanvas:1776
        calch=_this.ch;
      }
      //$LASTPOS=41001791;//kernel.ScaledCanvas:1791
      if (calcw>_this.cw) {
        //$LASTPOS=41001805;//kernel.ScaledCanvas:1805
        calcw=_this.cw;
      }
      //$LASTPOS=41001820;//kernel.ScaledCanvas:1820
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=41001876;//kernel.ScaledCanvas:1876
        calcw=_this.width;
        //$LASTPOS=41001888;//kernel.ScaledCanvas:1888
        calch=_this.height;
        
      }
      //$LASTPOS=41001914;//kernel.ScaledCanvas:1914
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=41001957;//kernel.ScaledCanvas:1957
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=41002053;//kernel.ScaledCanvas:2053
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41002225;//kernel.ScaledCanvas:2225
      _this._color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41002225;//kernel.ScaledCanvas:2225
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=41002270;//kernel.ScaledCanvas:2270
      ctx = cv.getContext("2d");
      
      //$LASTPOS=41002304;//kernel.ScaledCanvas:2304
      ctx.save();
      //$LASTPOS=41002321;//kernel.ScaledCanvas:2321
      ctx.fillStyle=_this._color+"";
      //$LASTPOS=41002351;//kernel.ScaledCanvas:2351
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=41002394;//kernel.ScaledCanvas:2394
      if (_this.isDrawGrid) {
        //$LASTPOS=41002410;//kernel.ScaledCanvas:2410
        _this.drawGrid(cv);
      }
      //$LASTPOS=41002429;//kernel.ScaledCanvas:2429
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=41002270;//kernel.ScaledCanvas:2270
      ctx = cv.getContext("2d");
      
      //$LASTPOS=41002304;//kernel.ScaledCanvas:2304
      ctx.save();
      //$LASTPOS=41002321;//kernel.ScaledCanvas:2321
      ctx.fillStyle=_this._color+"";
      //$LASTPOS=41002351;//kernel.ScaledCanvas:2351
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=41002394;//kernel.ScaledCanvas:2394
      if (_this.isDrawGrid) {
        //$LASTPOS=41002410;//kernel.ScaledCanvas:2410
        _this.drawGrid(cv);
      }
      //$LASTPOS=41002429;//kernel.ScaledCanvas:2429
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41002773;//kernel.ScaledCanvas:2773
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41002773;//kernel.ScaledCanvas:2773
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
      
      //$LASTPOS=42000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=42000049;//kernel.Screen:49
      _this._color="black";
    },
    fiber$onAppear :function _trc_Screen_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=42000049;//kernel.Screen:49
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
      
      //$LASTPOS=42000088;//kernel.Screen:88
      if (! _this._drawing) {
        //$LASTPOS=42000113;//kernel.Screen:113
        if (! _this.canvas) {
          throw new Error("canvas is null");
          
          
        }
        //$LASTPOS=42000193;//kernel.Screen:193
        _this._drawing=true;
        //$LASTPOS=42000216;//kernel.Screen:216
        _this.fillStyle=_this._color+"";
        //$LASTPOS=42000245;//kernel.Screen:245
        _this.fillRect(0,0,_this.width,_this.height);
        //$LASTPOS=42000281;//kernel.Screen:281
        c = _this.getContext();
        
        //$LASTPOS=42000309;//kernel.Screen:309
        //$LASTPOS=42000314;//kernel.Screen:314
        i = _this.layers.length-1;
        for (; i>=0 ; i--) {
          {
            //$LASTPOS=42000360;//kernel.Screen:360
            l = _this.layers[i];
            
            //$LASTPOS=42000389;//kernel.Screen:389
            group = l.group;
            
            //$LASTPOS=42000420;//kernel.Screen:420
            c.save();
            //$LASTPOS=42000442;//kernel.Screen:442
            wpx = l.wpx;
            wpy = l.wpy;
            
            //$LASTPOS=42000479;//kernel.Screen:479
            spx = l.spx;
            spy = l.spy;
            
            //$LASTPOS=42000516;//kernel.Screen:516
            rt = l.rotation;
            sc = l.scale;
            
            //$LASTPOS=42000641;//kernel.Screen:641
            wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
            
            //$LASTPOS=42000697;//kernel.Screen:697
            wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
            
            //$LASTPOS=42000795;//kernel.Screen:795
            c.translate(- wpOnSX+spx,- wpOnSY+spy);
            //$LASTPOS=42000845;//kernel.Screen:845
            c.rotate(_this.rad(rt));
            //$LASTPOS=42000876;//kernel.Screen:876
            c.scale(sc,sc);
            //$LASTPOS=42000904;//kernel.Screen:904
            group.draw(c);
            //$LASTPOS=42000931;//kernel.Screen:931
            c.restore();
          }
        }
        //$LASTPOS=42000962;//kernel.Screen:962
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
            //$LASTPOS=42000088;//kernel.Screen:88
            if (!(! _this._drawing)) { __pc=2     ; break; }
            //$LASTPOS=42000113;//kernel.Screen:113
            if (! _this.canvas) {
              throw new Error("canvas is null");
              
              
            }
            //$LASTPOS=42000193;//kernel.Screen:193
            _this._drawing=true;
            //$LASTPOS=42000216;//kernel.Screen:216
            _this.fillStyle=_this._color+"";
            //$LASTPOS=42000245;//kernel.Screen:245
            _this.fillRect(0,0,_this.width,_this.height);
            //$LASTPOS=42000281;//kernel.Screen:281
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            c=_thread.retVal;
            
            //$LASTPOS=42000309;//kernel.Screen:309
            //$LASTPOS=42000314;//kernel.Screen:314
            i = _this.layers.length-1;
            for (; i>=0 ; i--) {
              {
                //$LASTPOS=42000360;//kernel.Screen:360
                l = _this.layers[i];
                
                //$LASTPOS=42000389;//kernel.Screen:389
                group = l.group;
                
                //$LASTPOS=42000420;//kernel.Screen:420
                c.save();
                //$LASTPOS=42000442;//kernel.Screen:442
                wpx = l.wpx;
                wpy = l.wpy;
                
                //$LASTPOS=42000479;//kernel.Screen:479
                spx = l.spx;
                spy = l.spy;
                
                //$LASTPOS=42000516;//kernel.Screen:516
                rt = l.rotation;
                sc = l.scale;
                
                //$LASTPOS=42000641;//kernel.Screen:641
                wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
                
                //$LASTPOS=42000697;//kernel.Screen:697
                wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
                
                //$LASTPOS=42000795;//kernel.Screen:795
                c.translate(- wpOnSX+spx,- wpOnSY+spy);
                //$LASTPOS=42000845;//kernel.Screen:845
                c.rotate(_this.rad(rt));
                //$LASTPOS=42000876;//kernel.Screen:876
                c.scale(sc,sc);
                //$LASTPOS=42000904;//kernel.Screen:904
                group.draw(c);
                //$LASTPOS=42000931;//kernel.Screen:931
                c.restore();
              }
            }
            //$LASTPOS=42000962;//kernel.Screen:962
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
      
      //$LASTPOS=42001003;//kernel.Screen:1003
      _this.drawLayers();
      //$LASTPOS=42001021;//kernel.Screen:1021
      Tonyu.classes.kernel.Panel.prototype.draw.apply( _this, [ctx]);
    },
    addLayer :function _trc_Screen_addLayer(group) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42001063;//kernel.Screen:1063
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=42001093;//kernel.Screen:1093
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      return _this.layers.length-1;
    },
    fiber$addLayer :function _trc_Screen_f_addLayer(_thread,group) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42001063;//kernel.Screen:1063
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=42001093;//kernel.Screen:1093
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      _thread.retVal=_this.layers.length-1;return;
      
      
      _thread.retVal=_this;return;
    },
    selectLayer :function _trc_Screen_selectLayer(i) {
      "use strict";
      var _this=this;
      var r;
      
      //$LASTPOS=42001251;//kernel.Screen:1251
      r = _this.findLayer(i);
      
      //$LASTPOS=42001275;//kernel.Screen:1275
      if (r!=null) {
        //$LASTPOS=42001288;//kernel.Screen:1288
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
            //$LASTPOS=42001251;//kernel.Screen:1251
            _this.fiber$findLayer(_thread, i);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=42001275;//kernel.Screen:1275
            if (r!=null) {
              //$LASTPOS=42001288;//kernel.Screen:1288
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
      
      //$LASTPOS=42001319;//kernel.Screen:1319
      if (typeof  i=="number") {
        //$LASTPOS=42001353;//kernel.Screen:1353
        if (_this.layers[i]) {
          return i;
        }
        
      } else {
        //$LASTPOS=42001399;//kernel.Screen:1399
        //$LASTPOS=42001404;//kernel.Screen:1404
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=42001448;//kernel.Screen:1448
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
      
      //$LASTPOS=42001319;//kernel.Screen:1319
      if (typeof  i=="number") {
        //$LASTPOS=42001353;//kernel.Screen:1353
        if (_this.layers[i]) {
          _thread.retVal=i;return;
          
        }
        
      } else {
        //$LASTPOS=42001399;//kernel.Screen:1399
        //$LASTPOS=42001404;//kernel.Screen:1404
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=42001448;//kernel.Screen:1448
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
      
      //$LASTPOS=42001569;//kernel.Screen:1569
      _this.layers[_this.index].spx=x;
      //$LASTPOS=42001594;//kernel.Screen:1594
      _this.layers[_this.index].spy=y;
    },
    fiber$setPivot :function _trc_Screen_f_setPivot(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42001569;//kernel.Screen:1569
      _this.layers[_this.index].spx=x;
      //$LASTPOS=42001594;//kernel.Screen:1594
      _this.layers[_this.index].spy=y;
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Screen_scrollTo(x,y,scl,rot) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42001646;//kernel.Screen:1646
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=42001671;//kernel.Screen:1671
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=42001696;//kernel.Screen:1696
      if (typeof  scl=="number") {
        //$LASTPOS=42001722;//kernel.Screen:1722
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=42001751;//kernel.Screen:1751
      if (typeof  rot=="number") {
        //$LASTPOS=42001777;//kernel.Screen:1777
        _this.layers[_this.index].rotation=rot;
      }
    },
    fiber$scrollTo :function _trc_Screen_f_scrollTo(_thread,x,y,scl,rot) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42001646;//kernel.Screen:1646
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=42001671;//kernel.Screen:1671
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=42001696;//kernel.Screen:1696
      if (typeof  scl=="number") {
        //$LASTPOS=42001722;//kernel.Screen:1722
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=42001751;//kernel.Screen:1751
      if (typeof  rot=="number") {
        //$LASTPOS=42001777;//kernel.Screen:1777
        _this.layers[_this.index].rotation=rot;
      }
      
      _thread.retVal=_this;return;
    },
    canvas2buf :function _trc_Screen_canvas2buf(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42001828;//kernel.Screen:1828
      p.layer=_this.layer;
      return _this.convert(p,_this);
    },
    fiber$canvas2buf :function _trc_Screen_f_canvas2buf(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42001828;//kernel.Screen:1828
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
      
      //$LASTPOS=42002040;//kernel.Screen:2040
      if (toLayer==null) {
        //$LASTPOS=42002059;//kernel.Screen:2059
        toLayer=_this;
      }
      //$LASTPOS=42002077;//kernel.Screen:2077
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=42002131;//kernel.Screen:2131
      if (obj.layer!==_this&&toLayer!==_this) {
        //$LASTPOS=42002181;//kernel.Screen:2181
        p = _this.convert(obj,_this);
        
        return _this.convert(p,toLayer);
        
      } else {
        //$LASTPOS=42002252;//kernel.Screen:2252
        if (obj.layer!==_this&&toLayer===_this) {
          //$LASTPOS=42002302;//kernel.Screen:2302
          l = _this.findLayer(obj.layer);
          
          //$LASTPOS=42002338;//kernel.Screen:2338
          if (l!=null) {
            //$LASTPOS=42002396;//kernel.Screen:2396
            l=_this.layers[l];
            //$LASTPOS=42002421;//kernel.Screen:2421
            dx = obj.x-l.wpx;
            
            //$LASTPOS=42002453;//kernel.Screen:2453
            dy = obj.y-l.wpy;
            
            //$LASTPOS=42002485;//kernel.Screen:2485
            rt = l.rotation;
            
            //$LASTPOS=42002697;//kernel.Screen:2697
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=42002759;//kernel.Screen:2759
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this};
            
          } else {
            return Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]);
            
          }
          
        } else {
          //$LASTPOS=42003030;//kernel.Screen:3030
          if (obj.layer===_this&&toLayer!==_this) {
            //$LASTPOS=42003080;//kernel.Screen:3080
            l = _this.findLayer(toLayer);
            
            //$LASTPOS=42003114;//kernel.Screen:3114
            if (l!=null) {
              //$LASTPOS=42003172;//kernel.Screen:3172
              l=_this.layers[l];
              //$LASTPOS=42003198;//kernel.Screen:3198
              rt = - l.rotation;
              
              //$LASTPOS=42003230;//kernel.Screen:3230
              dx = obj.x-l.spx;
              
              //$LASTPOS=42003262;//kernel.Screen:3262
              dy = obj.y-l.spy;
              
              //$LASTPOS=42003475;//kernel.Screen:3475
              x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
              
              //$LASTPOS=42003537;//kernel.Screen:3537
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
      
      //$LASTPOS=42002040;//kernel.Screen:2040
      if (toLayer==null) {
        //$LASTPOS=42002059;//kernel.Screen:2059
        toLayer=_this;
      }
      //$LASTPOS=42002077;//kernel.Screen:2077
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      
      _thread.enter(function _trc_Screen_ent_convert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42002131;//kernel.Screen:2131
            if (!(obj.layer!==_this&&toLayer!==_this)) { __pc=2     ; break; }
            //$LASTPOS=42002181;//kernel.Screen:2181
            _this.fiber$convert(_thread, obj, _this);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            _thread.exit(_this.convert(p,toLayer));return;
            __pc=13    ;break;
          case 2     :
            //$LASTPOS=42002252;//kernel.Screen:2252
            if (!(obj.layer!==_this&&toLayer===_this)) { __pc=6     ; break; }
            //$LASTPOS=42002302;//kernel.Screen:2302
            _this.fiber$findLayer(_thread, obj.layer);
            __pc=3;return;
          case 3:
            l=_thread.retVal;
            
            //$LASTPOS=42002338;//kernel.Screen:2338
            if (!(l!=null)) { __pc=4     ; break; }
            //$LASTPOS=42002396;//kernel.Screen:2396
            l=_this.layers[l];
            //$LASTPOS=42002421;//kernel.Screen:2421
            dx = obj.x-l.wpx;
            
            //$LASTPOS=42002453;//kernel.Screen:2453
            dy = obj.y-l.wpy;
            
            //$LASTPOS=42002485;//kernel.Screen:2485
            rt = l.rotation;
            
            //$LASTPOS=42002697;//kernel.Screen:2697
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=42002759;//kernel.Screen:2759
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            _thread.exit({x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this});return;
            __pc=5     ;break;
          case 4     :
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]));return;
          case 5     :
            
            __pc=12    ;break;
          case 6     :
            //$LASTPOS=42003030;//kernel.Screen:3030
            if (!(obj.layer===_this&&toLayer!==_this)) { __pc=10    ; break; }
            //$LASTPOS=42003080;//kernel.Screen:3080
            _this.fiber$findLayer(_thread, toLayer);
            __pc=7;return;
          case 7:
            l=_thread.retVal;
            
            //$LASTPOS=42003114;//kernel.Screen:3114
            if (!(l!=null)) { __pc=8     ; break; }
            //$LASTPOS=42003172;//kernel.Screen:3172
            l=_this.layers[l];
            //$LASTPOS=42003198;//kernel.Screen:3198
            rt = - l.rotation;
            
            //$LASTPOS=42003230;//kernel.Screen:3230
            dx = obj.x-l.spx;
            
            //$LASTPOS=42003262;//kernel.Screen:3262
            dy = obj.y-l.spy;
            
            //$LASTPOS=42003475;//kernel.Screen:3475
            x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
            
            //$LASTPOS=42003537;//kernel.Screen:3537
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
      
      //$LASTPOS=42003842;//kernel.Screen:3842
      _this._color=color;
    },
    fiber$setBGColor :function _trc_Screen_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42003842;//kernel.Screen:3842
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Screen_all() {
      "use strict";
      var _this=this;
      var res;
      var l;
      var _it_410;
      var q;
      
      //$LASTPOS=42003876;//kernel.Screen:3876
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=42003900;//kernel.Screen:3900
      _it_410=Tonyu.iterator(_this.layers,1);
      while(_it_410.next()) {
        l=_it_410[0];
        
        //$LASTPOS=42003932;//kernel.Screen:3932
        q = l.group.all.apply(l.group,arguments);
        
        //$LASTPOS=42003984;//kernel.Screen:3984
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
      
      //$LASTPOS=43000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=43000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=43000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=43000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=43000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=43000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=43000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43000194;//kernel.Sprites:194
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=43000225;//kernel.Sprites:225
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=43000257;//kernel.Sprites:257
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのオブジェクトを作りすぎています");
          
        }
        
      }
      //$LASTPOS=43000341;//kernel.Sprites:341
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=43000378;//kernel.Sprites:378
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=43000417;//kernel.Sprites:417
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=43000454;//kernel.Sprites:454
      if (_this.drawing) {
        //$LASTPOS=43000478;//kernel.Sprites:478
        s.draw(_this.drawing);
        return _this;
        
      }
      //$LASTPOS=43000524;//kernel.Sprites:524
      _this.sprites.push(s);
      //$LASTPOS=43000546;//kernel.Sprites:546
      if (s.__genId==null) {
        //$LASTPOS=43000576;//kernel.Sprites:576
        s.__genId=_this.objId;
        //$LASTPOS=43000602;//kernel.Sprites:602
        _this.objId++;
        
      }
      //$LASTPOS=43000623;//kernel.Sprites:623
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000194;//kernel.Sprites:194
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=43000225;//kernel.Sprites:225
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=43000257;//kernel.Sprites:257
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのオブジェクトを作りすぎています");
          
        }
        
      }
      //$LASTPOS=43000341;//kernel.Sprites:341
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=43000378;//kernel.Sprites:378
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=43000417;//kernel.Sprites:417
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=43000454;//kernel.Sprites:454
      if (_this.drawing) {
        //$LASTPOS=43000478;//kernel.Sprites:478
        s.draw(_this.drawing);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=43000524;//kernel.Sprites:524
      _this.sprites.push(s);
      //$LASTPOS=43000546;//kernel.Sprites:546
      if (s.__genId==null) {
        //$LASTPOS=43000576;//kernel.Sprites:576
        s.__genId=_this.objId;
        //$LASTPOS=43000602;//kernel.Sprites:602
        _this.objId++;
        
      }
      //$LASTPOS=43000623;//kernel.Sprites:623
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      "use strict";
      var _this=this;
      var idx;
      
      //$LASTPOS=43000693;//kernel.Sprites:693
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=43000726;//kernel.Sprites:726
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=43000750;//kernel.Sprites:750
      _this.sprites.splice(idx,1);
      //$LASTPOS=43000778;//kernel.Sprites:778
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=43000693;//kernel.Sprites:693
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=43000726;//kernel.Sprites:726
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=43000750;//kernel.Sprites:750
      _this.sprites.splice(idx,1);
      //$LASTPOS=43000778;//kernel.Sprites:778
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes(drawn) {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      
      //$LASTPOS=43000912;//kernel.Sprites:912
      //$LASTPOS=43000917;//kernel.Sprites:917
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=43000965;//kernel.Sprites:965
          s=_this.sprites[i];
          //$LASTPOS=43000988;//kernel.Sprites:988
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=43001161;//kernel.Sprites:1161
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=43001233;//kernel.Sprites:1233
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
      
      
      //$LASTPOS=43000912;//kernel.Sprites:912
      //$LASTPOS=43000917;//kernel.Sprites:917
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=43000965;//kernel.Sprites:965
          s=_this.sprites[i];
          //$LASTPOS=43000988;//kernel.Sprites:988
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=43001161;//kernel.Sprites:1161
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=43001233;//kernel.Sprites:1233
            _this.sprites.splice(i,1);
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43001294;//kernel.Sprites:1294
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43001294;//kernel.Sprites:1294
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      "use strict";
      var _this=this;
      var val1;
      var val2;
      
      //$LASTPOS=43001367;//kernel.Sprites:1367
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=43001397;//kernel.Sprites:1397
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=43001427;//kernel.Sprites:1427
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=43001473;//kernel.Sprites:1473
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=43001518;//kernel.Sprites:1518
          if (val1==val2) {
            //$LASTPOS=43001543;//kernel.Sprites:1543
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
      
      //$LASTPOS=43001367;//kernel.Sprites:1367
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=43001397;//kernel.Sprites:1397
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=43001427;//kernel.Sprites:1427
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=43001473;//kernel.Sprites:1473
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=43001518;//kernel.Sprites:1518
          if (val1==val2) {
            //$LASTPOS=43001543;//kernel.Sprites:1543
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
      
      //$LASTPOS=43001740;//kernel.Sprites:1740
      ctx.save();
      //$LASTPOS=43001757;//kernel.Sprites:1757
      orderArray = [];
      
      //$LASTPOS=43001781;//kernel.Sprites:1781
      if (_this.t1Sprites) {
        //$LASTPOS=43001807;//kernel.Sprites:1807
        _this.sprites.forEach((function anonymous_1823(s) {
          
          //$LASTPOS=43001843;//kernel.Sprites:1843
          if (s instanceof Tonyu.classes.kernel.PlainChar) {
            //$LASTPOS=43001890;//kernel.Sprites:1890
            s.draw();
            
          } else {
            //$LASTPOS=43001920;//kernel.Sprites:1920
            orderArray.push(s);
          }
        }));
        
      } else {
        //$LASTPOS=43001975;//kernel.Sprites:1975
        orderArray=orderArray.concat(_this.sprites);
        
      }
      //$LASTPOS=43002026;//kernel.Sprites:2026
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=43002059;//kernel.Sprites:2059
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=43002088;//kernel.Sprites:2088
      _this.drawing=ctx;
      //$LASTPOS=43002106;//kernel.Sprites:2106
      orderArray.forEach((function anonymous_2125(s) {
        
        //$LASTPOS=43002140;//kernel.Sprites:2140
        s.draw(ctx);
      }));
      //$LASTPOS=43002167;//kernel.Sprites:2167
      _this.drawing=null;
      //$LASTPOS=43002186;//kernel.Sprites:2186
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43002232;//kernel.Sprites:2232
      _this.hitWatchers.forEach((function anonymous_2252(w) {
        
        //$LASTPOS=43002276;//kernel.Sprites:2276
        _this.sprites.forEach((function anonymous_2292(a) {
          var a_owner;
          
          //$LASTPOS=43002364;//kernel.Sprites:2364
          a_owner = a;
          
          //$LASTPOS=43002406;//kernel.Sprites:2406
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=43002459;//kernel.Sprites:2459
          _this.sprites.forEach((function anonymous_2475(b) {
            var b_owner;
            
            //$LASTPOS=43002507;//kernel.Sprites:2507
            b_owner = b;
            
            //$LASTPOS=43002553;//kernel.Sprites:2553
            if (a===b) {
              return _this;
            }
            //$LASTPOS=43002589;//kernel.Sprites:2589
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=43002694;//kernel.Sprites:2694
            if (a.crashTo1(b)) {
              //$LASTPOS=43002797;//kernel.Sprites:2797
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
      
      //$LASTPOS=43002232;//kernel.Sprites:2232
      _this.hitWatchers.forEach((function anonymous_2252(w) {
        
        //$LASTPOS=43002276;//kernel.Sprites:2276
        _this.sprites.forEach((function anonymous_2292(a) {
          var a_owner;
          
          //$LASTPOS=43002364;//kernel.Sprites:2364
          a_owner = a;
          
          //$LASTPOS=43002406;//kernel.Sprites:2406
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=43002459;//kernel.Sprites:2459
          _this.sprites.forEach((function anonymous_2475(b) {
            var b_owner;
            
            //$LASTPOS=43002507;//kernel.Sprites:2507
            b_owner = b;
            
            //$LASTPOS=43002553;//kernel.Sprites:2553
            if (a===b) {
              return _this;
            }
            //$LASTPOS=43002589;//kernel.Sprites:2589
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=43002694;//kernel.Sprites:2694
            if (a.crashTo1(b)) {
              //$LASTPOS=43002797;//kernel.Sprites:2797
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
      
      //$LASTPOS=43002927;//kernel.Sprites:2927
      p = {A: typeA,B: typeB,h: onHit};
      
      //$LASTPOS=43002991;//kernel.Sprites:2991
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      "use strict";
      var _this=this;
      var ctx;
      var i;
      
      //$LASTPOS=43003044;//kernel.Sprites:3044
      ctx = c.getContext("2d");
      
      //$LASTPOS=43003077;//kernel.Sprites:3077
      ctx.textBaseline="top";
      //$LASTPOS=43003106;//kernel.Sprites:3106
      ctx.save();
      //$LASTPOS=43003123;//kernel.Sprites:3123
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=43003163;//kernel.Sprites:3163
      //$LASTPOS=43003168;//kernel.Sprites:3168
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=43003208;//kernel.Sprites:3208
          ctx.beginPath();
          //$LASTPOS=43003234;//kernel.Sprites:3234
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=43003280;//kernel.Sprites:3280
          ctx.moveTo(i,0);
          //$LASTPOS=43003306;//kernel.Sprites:3306
          ctx.lineTo(i,c.height);
          //$LASTPOS=43003339;//kernel.Sprites:3339
          ctx.closePath();
          //$LASTPOS=43003365;//kernel.Sprites:3365
          ctx.stroke();
        }
      }
      //$LASTPOS=43003393;//kernel.Sprites:3393
      //$LASTPOS=43003398;//kernel.Sprites:3398
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=43003439;//kernel.Sprites:3439
          ctx.beginPath();
          //$LASTPOS=43003465;//kernel.Sprites:3465
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=43003511;//kernel.Sprites:3511
          ctx.moveTo(0,i);
          //$LASTPOS=43003537;//kernel.Sprites:3537
          ctx.lineTo(c.width,i);
          //$LASTPOS=43003569;//kernel.Sprites:3569
          ctx.closePath();
          //$LASTPOS=43003595;//kernel.Sprites:3595
          ctx.stroke();
        }
      }
      //$LASTPOS=43003621;//kernel.Sprites:3621
      ctx.fillStyle="white";
      //$LASTPOS=43003649;//kernel.Sprites:3649
      ctx.font="15px monospaced";
      //$LASTPOS=43003682;//kernel.Sprites:3682
      //$LASTPOS=43003687;//kernel.Sprites:3687
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=43003730;//kernel.Sprites:3730
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=43003764;//kernel.Sprites:3764
      //$LASTPOS=43003769;//kernel.Sprites:3769
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=43003813;//kernel.Sprites:3813
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=43003847;//kernel.Sprites:3847
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=43003044;//kernel.Sprites:3044
      ctx = c.getContext("2d");
      
      //$LASTPOS=43003077;//kernel.Sprites:3077
      ctx.textBaseline="top";
      //$LASTPOS=43003106;//kernel.Sprites:3106
      ctx.save();
      //$LASTPOS=43003123;//kernel.Sprites:3123
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=43003163;//kernel.Sprites:3163
      //$LASTPOS=43003168;//kernel.Sprites:3168
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=43003208;//kernel.Sprites:3208
          ctx.beginPath();
          //$LASTPOS=43003234;//kernel.Sprites:3234
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=43003280;//kernel.Sprites:3280
          ctx.moveTo(i,0);
          //$LASTPOS=43003306;//kernel.Sprites:3306
          ctx.lineTo(i,c.height);
          //$LASTPOS=43003339;//kernel.Sprites:3339
          ctx.closePath();
          //$LASTPOS=43003365;//kernel.Sprites:3365
          ctx.stroke();
        }
      }
      //$LASTPOS=43003393;//kernel.Sprites:3393
      //$LASTPOS=43003398;//kernel.Sprites:3398
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=43003439;//kernel.Sprites:3439
          ctx.beginPath();
          //$LASTPOS=43003465;//kernel.Sprites:3465
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=43003511;//kernel.Sprites:3511
          ctx.moveTo(0,i);
          //$LASTPOS=43003537;//kernel.Sprites:3537
          ctx.lineTo(c.width,i);
          //$LASTPOS=43003569;//kernel.Sprites:3569
          ctx.closePath();
          //$LASTPOS=43003595;//kernel.Sprites:3595
          ctx.stroke();
        }
      }
      //$LASTPOS=43003621;//kernel.Sprites:3621
      ctx.fillStyle="white";
      //$LASTPOS=43003649;//kernel.Sprites:3649
      ctx.font="15px monospaced";
      //$LASTPOS=43003682;//kernel.Sprites:3682
      //$LASTPOS=43003687;//kernel.Sprites:3687
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=43003730;//kernel.Sprites:3730
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=43003764;//kernel.Sprites:3764
      //$LASTPOS=43003769;//kernel.Sprites:3769
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=43003813;//kernel.Sprites:3813
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=43003847;//kernel.Sprites:3847
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43004015;//kernel.Sprites:4015
      _this.sx=scrollX;
      //$LASTPOS=43004032;//kernel.Sprites:4032
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43004015;//kernel.Sprites:4015
      _this.sx=scrollX;
      //$LASTPOS=43004032;//kernel.Sprites:4032
      _this.sy=scrollY;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Sprites_all(c) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=43004072;//kernel.Sprites:4072
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=43004097;//kernel.Sprites:4097
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=43004180;//kernel.Sprites:4180
      _this.sprites.forEach((function anonymous_4196(s) {
        
        //$LASTPOS=43004212;//kernel.Sprites:4212
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=43004243;//kernel.Sprites:4243
        if (! c||s instanceof c) {
          //$LASTPOS=43004284;//kernel.Sprites:4284
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
      
      //$LASTPOS=44000065;//kernel.BodyActor:65
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
      //$LASTPOS=44000080;//kernel.BodyActor:80
      _this._th.on("end",Tonyu.bindFunc(_this,_this.initBody));
    },
    getWorld :function _trc_BodyActor_getWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=44000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=44000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      _thread.retVal=Tonyu.globals.$t2World;return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_BodyActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000229;//kernel.BodyActor:229
      _this.initBody();
      //$LASTPOS=44000246;//kernel.BodyActor:246
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
            //$LASTPOS=44000229;//kernel.BodyActor:229
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44000246;//kernel.BodyActor:246
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
      
      //$LASTPOS=44000285;//kernel.BodyActor:285
      if (_this.body) {
        return _this;
      }
      //$LASTPOS=44000308;//kernel.BodyActor:308
      wworld = _this.getWorld();
      
      //$LASTPOS=44000336;//kernel.BodyActor:336
      _this.world=wworld.world;
      //$LASTPOS=44000361;//kernel.BodyActor:361
      _this.scale=wworld.scale;
      //$LASTPOS=44000386;//kernel.BodyActor:386
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=44000430;//kernel.BodyActor:430
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=44000477;//kernel.BodyActor:477
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=44000518;//kernel.BodyActor:518
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      
      //$LASTPOS=44000571;//kernel.BodyActor:571
      b2Fixture = Box2D.Dynamics.b2Fixture;
      
      //$LASTPOS=44000618;//kernel.BodyActor:618
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      
      //$LASTPOS=44000683;//kernel.BodyActor:683
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      
      //$LASTPOS=44000748;//kernel.BodyActor:748
      fixDef = new b2FixtureDef;
      
      //$LASTPOS=44000784;//kernel.BodyActor:784
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=44000826;//kernel.BodyActor:826
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=44000870;//kernel.BodyActor:870
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=44000922;//kernel.BodyActor:922
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=44000956;//kernel.BodyActor:956
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=44001040;//kernel.BodyActor:1040
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=44001076;//kernel.BodyActor:1076
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=44001112;//kernel.BodyActor:1112
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=44001161;//kernel.BodyActor:1161
      w = _this.width;
      h = _this.height;
      
      //$LASTPOS=44001188;//kernel.BodyActor:1188
      if (! w) {
        //$LASTPOS=44001207;//kernel.BodyActor:1207
        _this.detectShape();
        //$LASTPOS=44001231;//kernel.BodyActor:1231
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=44001261;//kernel.BodyActor:1261
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=44001303;//kernel.BodyActor:1303
      if (_this.shape=="box") {
        //$LASTPOS=44001332;//kernel.BodyActor:1332
        if (! h) {
          //$LASTPOS=44001340;//kernel.BodyActor:1340
          h=w;
        }
        //$LASTPOS=44001354;//kernel.BodyActor:1354
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=44001398;//kernel.BodyActor:1398
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=44001502;//kernel.BodyActor:1502
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=44001539;//kernel.BodyActor:1539
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=44001616;//kernel.BodyActor:1616
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=44001651;//kernel.BodyActor:1651
      fps = wworld.fps;
      
      //$LASTPOS=44001676;//kernel.BodyActor:1676
      r = _this.rotation;
      ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));
      vr = _this.defv(_this.vrotation,0);
      
      //$LASTPOS=44001758;//kernel.BodyActor:1758
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=44001795;//kernel.BodyActor:1795
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=44001828;//kernel.BodyActor:1828
      _this.body.SetUserData(_this);
      //$LASTPOS=44001857;//kernel.BodyActor:1857
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=44001890;//kernel.BodyActor:1890
      _this.rotation=r;
      //$LASTPOS=44001907;//kernel.BodyActor:1907
      _this.vrotation=vr;
      //$LASTPOS=44001926;//kernel.BodyActor:1926
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
      
      //$LASTPOS=44000285;//kernel.BodyActor:285
      if (_this.body) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_BodyActor_ent_initBody(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000308;//kernel.BodyActor:308
            _this.fiber$getWorld(_thread);
            __pc=1;return;
          case 1:
            wworld=_thread.retVal;
            
            //$LASTPOS=44000336;//kernel.BodyActor:336
            _this.world=wworld.world;
            //$LASTPOS=44000361;//kernel.BodyActor:361
            _this.scale=wworld.scale;
            //$LASTPOS=44000386;//kernel.BodyActor:386
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=44000430;//kernel.BodyActor:430
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=44000477;//kernel.BodyActor:477
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=44000518;//kernel.BodyActor:518
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
            
            //$LASTPOS=44000571;//kernel.BodyActor:571
            b2Fixture = Box2D.Dynamics.b2Fixture;
            
            //$LASTPOS=44000618;//kernel.BodyActor:618
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            
            //$LASTPOS=44000683;//kernel.BodyActor:683
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
            
            //$LASTPOS=44000748;//kernel.BodyActor:748
            fixDef = new b2FixtureDef;
            
            //$LASTPOS=44000784;//kernel.BodyActor:784
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=2;return;
          case 2:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=44000826;//kernel.BodyActor:826
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=3;return;
          case 3:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=44000870;//kernel.BodyActor:870
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=4;return;
          case 4:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=44000922;//kernel.BodyActor:922
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=44000956;//kernel.BodyActor:956
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=44001040;//kernel.BodyActor:1040
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=44001076;//kernel.BodyActor:1076
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=44001112;//kernel.BodyActor:1112
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=44001161;//kernel.BodyActor:1161
            w = _this.width;
            h = _this.height;
            
            //$LASTPOS=44001188;//kernel.BodyActor:1188
            if (! w) {
              //$LASTPOS=44001207;//kernel.BodyActor:1207
              _this.detectShape();
              //$LASTPOS=44001231;//kernel.BodyActor:1231
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=44001261;//kernel.BodyActor:1261
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=44001303;//kernel.BodyActor:1303
            if (_this.shape=="box") {
              //$LASTPOS=44001332;//kernel.BodyActor:1332
              if (! h) {
                //$LASTPOS=44001340;//kernel.BodyActor:1340
                h=w;
              }
              //$LASTPOS=44001354;//kernel.BodyActor:1354
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=44001398;//kernel.BodyActor:1398
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=44001502;//kernel.BodyActor:1502
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=44001539;//kernel.BodyActor:1539
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=44001616;//kernel.BodyActor:1616
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=44001651;//kernel.BodyActor:1651
            fps = wworld.fps;
            
            //$LASTPOS=44001676;//kernel.BodyActor:1676
            r = _this.rotation;
            _this.fiber$bvec(_thread, _this.defv(_this.vx*fps,0), _this.defv(_this.vy*fps,0));
            __pc=5;return;
          case 5:
            ve=_thread.retVal;
            _this.fiber$defv(_thread, _this.vrotation, 0);
            __pc=6;return;
          case 6:
            vr=_thread.retVal;
            
            //$LASTPOS=44001758;//kernel.BodyActor:1758
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=44001795;//kernel.BodyActor:1795
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=44001828;//kernel.BodyActor:1828
            _this.body.SetUserData(_this);
            //$LASTPOS=44001857;//kernel.BodyActor:1857
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=44001890;//kernel.BodyActor:1890
            _this.rotation=r;
            //$LASTPOS=44001907;//kernel.BodyActor:1907
            _this.vrotation=vr;
            //$LASTPOS=44001926;//kernel.BodyActor:1926
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
      
      //$LASTPOS=44001987;//kernel.BodyActor:1987
      _this.initBody();
      //$LASTPOS=44002004;//kernel.BodyActor:2004
      res = [];
      
      //$LASTPOS=44002029;//kernel.BodyActor:2029
      w = _this.getWorld();
      
      //$LASTPOS=44002052;//kernel.BodyActor:2052
      //$LASTPOS=44002057;//kernel.BodyActor:2057
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=44002114;//kernel.BodyActor:2114
          if (c.IsTouching()) {
            //$LASTPOS=44002146;//kernel.BodyActor:2146
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=44002218;//kernel.BodyActor:2218
            if (m.m_points[0]) {
              //$LASTPOS=44002256;//kernel.BodyActor:2256
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=44002330;//kernel.BodyActor:2330
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=44002504;//kernel.BodyActor:2504
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=44002605;//kernel.BodyActor:2605
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=44002631;//kernel.BodyActor:2631
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=44002691;//kernel.BodyActor:2691
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=44002751;//kernel.BodyActor:2751
            if (a===_this) {
              //$LASTPOS=44002784;//kernel.BodyActor:2784
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=44002854;//kernel.BodyActor:2854
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=44002947;//kernel.BodyActor:2947
              if (b===_this) {
                //$LASTPOS=44002980;//kernel.BodyActor:2980
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=44003050;//kernel.BodyActor:3050
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
            //$LASTPOS=44001987;//kernel.BodyActor:1987
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44002004;//kernel.BodyActor:2004
            res = [];
            
            //$LASTPOS=44002029;//kernel.BodyActor:2029
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            w=_thread.retVal;
            
            //$LASTPOS=44002052;//kernel.BodyActor:2052
            //$LASTPOS=44002057;//kernel.BodyActor:2057
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=44002114;//kernel.BodyActor:2114
                if (c.IsTouching()) {
                  //$LASTPOS=44002146;//kernel.BodyActor:2146
                  c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
                  //$LASTPOS=44002218;//kernel.BodyActor:2218
                  if (m.m_points[0]) {
                    //$LASTPOS=44002256;//kernel.BodyActor:2256
                    if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                      //$LASTPOS=44002330;//kernel.BodyActor:2330
                      point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                      
                    } else {
                      //$LASTPOS=44002504;//kernel.BodyActor:2504
                      point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                      
                    }
                    
                  } else {
                    //$LASTPOS=44002605;//kernel.BodyActor:2605
                    point={x: _this.x,y: _this.y};
                  }
                  //$LASTPOS=44002631;//kernel.BodyActor:2631
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=44002691;//kernel.BodyActor:2691
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=44002751;//kernel.BodyActor:2751
                  if (a===_this) {
                    //$LASTPOS=44002784;//kernel.BodyActor:2784
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=44002854;//kernel.BodyActor:2854
                      res.push({target: b,manifold: m,x: point.x,y: point.y});
                      
                    }
                    
                  } else {
                    //$LASTPOS=44002947;//kernel.BodyActor:2947
                    if (b===_this) {
                      //$LASTPOS=44002980;//kernel.BodyActor:2980
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=44003050;//kernel.BodyActor:3050
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
      
      //$LASTPOS=44003326;//kernel.BodyActor:3326
      _this.initBody();
      //$LASTPOS=44003343;//kernel.BodyActor:3343
      res = [];
      
      //$LASTPOS=44003360;//kernel.BodyActor:3360
      //$LASTPOS=44003365;//kernel.BodyActor:3365
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=44003422;//kernel.BodyActor:3422
          if (c.IsTouching()) {
            //$LASTPOS=44003457;//kernel.BodyActor:3457
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=44003517;//kernel.BodyActor:3517
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=44003577;//kernel.BodyActor:3577
            if (a===_this) {
              //$LASTPOS=44003610;//kernel.BodyActor:3610
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=44003680;//kernel.BodyActor:3680
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=44003732;//kernel.BodyActor:3732
              if (b===_this) {
                //$LASTPOS=44003765;//kernel.BodyActor:3765
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=44003835;//kernel.BodyActor:3835
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
            //$LASTPOS=44003326;//kernel.BodyActor:3326
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44003343;//kernel.BodyActor:3343
            res = [];
            
            //$LASTPOS=44003360;//kernel.BodyActor:3360
            //$LASTPOS=44003365;//kernel.BodyActor:3365
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=44003422;//kernel.BodyActor:3422
                if (c.IsTouching()) {
                  //$LASTPOS=44003457;//kernel.BodyActor:3457
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=44003517;//kernel.BodyActor:3517
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=44003577;//kernel.BodyActor:3577
                  if (a===_this) {
                    //$LASTPOS=44003610;//kernel.BodyActor:3610
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=44003680;//kernel.BodyActor:3680
                      res.push(b);
                      
                    }
                    
                  } else {
                    //$LASTPOS=44003732;//kernel.BodyActor:3732
                    if (b===_this) {
                      //$LASTPOS=44003765;//kernel.BodyActor:3765
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=44003835;//kernel.BodyActor:3835
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
      
      //$LASTPOS=44003953;//kernel.BodyActor:3953
      _this.initBody();
      //$LASTPOS=44003970;//kernel.BodyActor:3970
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=44004014;//kernel.BodyActor:4014
      scale = _this.getWorld().scale;
      
      //$LASTPOS=44004047;//kernel.BodyActor:4047
      fps = 60;
      
      //$LASTPOS=44004064;//kernel.BodyActor:4064
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
            //$LASTPOS=44003953;//kernel.BodyActor:3953
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44003970;//kernel.BodyActor:3970
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=44004014;//kernel.BodyActor:4014
            scale = _this.getWorld().scale;
            
            //$LASTPOS=44004047;//kernel.BodyActor:4047
            fps = 60;
            
            //$LASTPOS=44004064;//kernel.BodyActor:4064
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
      
      //$LASTPOS=44004158;//kernel.BodyActor:4158
      _this.initBody();
      //$LASTPOS=44004175;//kernel.BodyActor:4175
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=44004219;//kernel.BodyActor:4219
      scale = _this.getWorld().scale;
      
      //$LASTPOS=44004252;//kernel.BodyActor:4252
      fps = 60;
      
      //$LASTPOS=44004269;//kernel.BodyActor:4269
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
            //$LASTPOS=44004158;//kernel.BodyActor:4158
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44004175;//kernel.BodyActor:4175
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=44004219;//kernel.BodyActor:4219
            scale = _this.getWorld().scale;
            
            //$LASTPOS=44004252;//kernel.BodyActor:4252
            fps = 60;
            
            //$LASTPOS=44004269;//kernel.BodyActor:4269
            _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44004356;//kernel.BodyActor:4356
      _this.initBody();
      //$LASTPOS=44004373;//kernel.BodyActor:4373
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
            //$LASTPOS=44004356;//kernel.BodyActor:4356
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44004373;//kernel.BodyActor:4373
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
      
      //$LASTPOS=44004420;//kernel.BodyActor:4420
      _this.initBody();
      //$LASTPOS=44004437;//kernel.BodyActor:4437
      pos = _this.body.GetPosition();
      
      //$LASTPOS=44004470;//kernel.BodyActor:4470
      pos.x+=dx/_this.scale;
      //$LASTPOS=44004492;//kernel.BodyActor:4492
      pos.y+=dy/_this.scale;
      //$LASTPOS=44004514;//kernel.BodyActor:4514
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
            //$LASTPOS=44004420;//kernel.BodyActor:4420
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44004437;//kernel.BodyActor:4437
            pos = _this.body.GetPosition();
            
            //$LASTPOS=44004470;//kernel.BodyActor:4470
            pos.x+=dx/_this.scale;
            //$LASTPOS=44004492;//kernel.BodyActor:4492
            pos.y+=dy/_this.scale;
            //$LASTPOS=44004514;//kernel.BodyActor:4514
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
      
      //$LASTPOS=44004605;//kernel.BodyActor:4605
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=44004623;//kernel.BodyActor:4623
      if (_this.world) {
        //$LASTPOS=44004634;//kernel.BodyActor:4634
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
      var bodyB;
      var bodyDef;
      var b2Vec2;
      
      //$LASTPOS=44004696;//kernel.BodyActor:4696
      _this.initBody();
      //$LASTPOS=44004743;//kernel.BodyActor:4743
      params=params||{};
      //$LASTPOS=44004767;//kernel.BodyActor:4767
      px = params.x||_this.x;
      
      //$LASTPOS=44004792;//kernel.BodyActor:4792
      py = params.y||_this.y;
      
      //$LASTPOS=44004817;//kernel.BodyActor:4817
      wworld = _this.getWorld();
      
      //$LASTPOS=44004859;//kernel.BodyActor:4859
      scale = wworld.scale;
      
      //$LASTPOS=44004888;//kernel.BodyActor:4888
      world = wworld.world;
      
      //$LASTPOS=44004917;//kernel.BodyActor:4917
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=44004964;//kernel.BodyActor:4964
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=44005005;//kernel.BodyActor:5005
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      
      //$LASTPOS=44005060;//kernel.BodyActor:5060
      jd = new JDC;
      
      
      //$LASTPOS=44005097;//kernel.BodyActor:5097
      if (params.other&&params.other instanceof Tonyu.classes.kernel.BodyActor) {
        //$LASTPOS=44005155;//kernel.BodyActor:5155
        params.other.initBody();
        //$LASTPOS=44005189;//kernel.BodyActor:5189
        bodyB=params.other.body;
        
      } else {
        //$LASTPOS=44005237;//kernel.BodyActor:5237
        bodyDef = new b2BodyDef;
        
        //$LASTPOS=44005275;//kernel.BodyActor:5275
        bodyDef.type=b2Body.b2_staticBody;
        //$LASTPOS=44005321;//kernel.BodyActor:5321
        bodyDef.position.x=px/scale;
        //$LASTPOS=44005362;//kernel.BodyActor:5362
        bodyDef.position.y=py/scale;
        //$LASTPOS=44005403;//kernel.BodyActor:5403
        bodyB=world.CreateBody(bodyDef);
        
      }
      //$LASTPOS=44005448;//kernel.BodyActor:5448
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=44005492;//kernel.BodyActor:5492
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=44005555;//kernel.BodyActor:5555
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=44005609;//kernel.BodyActor:5609
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=44005657;//kernel.BodyActor:5657
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=44005705;//kernel.BodyActor:5705
        jd.enableLimit=true;
        
      }
      //$LASTPOS=44005740;//kernel.BodyActor:5740
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
      var bodyB;
      var bodyDef;
      var b2Vec2;
      
      
      _thread.enter(function _trc_BodyActor_ent_addRevoluteJoint(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44004696;//kernel.BodyActor:4696
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44004743;//kernel.BodyActor:4743
            params=params||{};
            //$LASTPOS=44004767;//kernel.BodyActor:4767
            px = params.x||_this.x;
            
            //$LASTPOS=44004792;//kernel.BodyActor:4792
            py = params.y||_this.y;
            
            //$LASTPOS=44004817;//kernel.BodyActor:4817
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            wworld=_thread.retVal;
            
            //$LASTPOS=44004859;//kernel.BodyActor:4859
            scale = wworld.scale;
            
            //$LASTPOS=44004888;//kernel.BodyActor:4888
            world = wworld.world;
            
            //$LASTPOS=44004917;//kernel.BodyActor:4917
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=44004964;//kernel.BodyActor:4964
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=44005005;//kernel.BodyActor:5005
            JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
            
            //$LASTPOS=44005060;//kernel.BodyActor:5060
            jd = new JDC;
            
            
            //$LASTPOS=44005097;//kernel.BodyActor:5097
            if (params.other&&params.other instanceof Tonyu.classes.kernel.BodyActor) {
              //$LASTPOS=44005155;//kernel.BodyActor:5155
              params.other.initBody();
              //$LASTPOS=44005189;//kernel.BodyActor:5189
              bodyB=params.other.body;
              
            } else {
              //$LASTPOS=44005237;//kernel.BodyActor:5237
              bodyDef = new b2BodyDef;
              
              //$LASTPOS=44005275;//kernel.BodyActor:5275
              bodyDef.type=b2Body.b2_staticBody;
              //$LASTPOS=44005321;//kernel.BodyActor:5321
              bodyDef.position.x=px/scale;
              //$LASTPOS=44005362;//kernel.BodyActor:5362
              bodyDef.position.y=py/scale;
              //$LASTPOS=44005403;//kernel.BodyActor:5403
              bodyB=world.CreateBody(bodyDef);
              
            }
            //$LASTPOS=44005448;//kernel.BodyActor:5448
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=44005492;//kernel.BodyActor:5492
            jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
            //$LASTPOS=44005555;//kernel.BodyActor:5555
            if (params.lowerAngle&&params.upperAngle) {
              //$LASTPOS=44005609;//kernel.BodyActor:5609
              jd.lowerAngle=_this.rad(params.lowerAngle);
              //$LASTPOS=44005657;//kernel.BodyActor:5657
              jd.upperAngle=_this.rad(params.upperAngle);
              //$LASTPOS=44005705;//kernel.BodyActor:5705
              jd.enableLimit=true;
              
            }
            //$LASTPOS=44005740;//kernel.BodyActor:5740
            world.CreateJoint(jd);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44005784;//kernel.BodyActor:5784
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44005888;//kernel.BodyActor:5888
      r=r||0;
      //$LASTPOS=44005901;//kernel.BodyActor:5901
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=44005955;//kernel.BodyActor:5955
      _this.body.SetAngle(_this.rad(r));
    },
    __getter__x :function _trc_BodyActor___getter__x() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=44005994;//kernel.BodyActor:5994
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=44006021;//kernel.BodyActor:6021
      pos = _this.body.GetPosition();
      
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=44006090;//kernel.BodyActor:6090
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=44006119;//kernel.BodyActor:6119
      v=v||0;
      //$LASTPOS=44006132;//kernel.BodyActor:6132
      pos = _this.body.GetPosition();
      
      //$LASTPOS=44006165;//kernel.BodyActor:6165
      pos.x=v/_this.scale;
      //$LASTPOS=44006185;//kernel.BodyActor:6185
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=44006222;//kernel.BodyActor:6222
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=44006249;//kernel.BodyActor:6249
      pos = _this.body.GetPosition();
      
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=44006318;//kernel.BodyActor:6318
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=44006347;//kernel.BodyActor:6347
      v=v||0;
      //$LASTPOS=44006360;//kernel.BodyActor:6360
      pos = _this.body.GetPosition();
      
      //$LASTPOS=44006393;//kernel.BodyActor:6393
      pos.y=v/_this.scale;
      //$LASTPOS=44006413;//kernel.BodyActor:6413
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=44006453;//kernel.BodyActor:6453
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=44006481;//kernel.BodyActor:6481
      v = _this.body.GetLinearVelocity();
      
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=44006568;//kernel.BodyActor:6568
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=44006598;//kernel.BodyActor:6598
      v=v||0;
      //$LASTPOS=44006611;//kernel.BodyActor:6611
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=44006649;//kernel.BodyActor:6649
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=44006683;//kernel.BodyActor:6683
      if (v) {
        //$LASTPOS=44006690;//kernel.BodyActor:6690
        _this.body.SetAwake(true);
      }
      //$LASTPOS=44006716;//kernel.BodyActor:6716
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=44006761;//kernel.BodyActor:6761
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=44006789;//kernel.BodyActor:6789
      v = _this.body.GetLinearVelocity();
      
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=44006876;//kernel.BodyActor:6876
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=44006906;//kernel.BodyActor:6906
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=44006944;//kernel.BodyActor:6944
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=44006978;//kernel.BodyActor:6978
      if (v) {
        //$LASTPOS=44006985;//kernel.BodyActor:6985
        _this.body.SetAwake(true);
      }
      //$LASTPOS=44007011;//kernel.BodyActor:7011
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44007061;//kernel.BodyActor:7061
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44007167;//kernel.BodyActor:7167
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=44007197;//kernel.BodyActor:7197
      v=v||0;
      //$LASTPOS=44007210;//kernel.BodyActor:7210
      if (v) {
        //$LASTPOS=44007217;//kernel.BodyActor:7217
        _this.body.SetAwake(true);
      }
      //$LASTPOS=44007243;//kernel.BodyActor:7243
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
      
      //$LASTPOS=45000150;//kernel.T2World:150
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
            //$LASTPOS=45000150;//kernel.T2World:150
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
      
      //$LASTPOS=45000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=45000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000133;//kernel.T2World:133
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
      
      //$LASTPOS=45000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=45000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=45000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=45000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      
      //$LASTPOS=45000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=45000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=45000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=45000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=45000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=45000572;//kernel.T2World:572
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
            //$LASTPOS=45000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=45000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=45000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=45000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            
            //$LASTPOS=45000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=45000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=45000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=45000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=45000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=45000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=45000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=45000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=45000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=45000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=45000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=45000976;//kernel.T2World:976
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
            //$LASTPOS=45000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=45000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=45000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=45000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=45000976;//kernel.T2World:976
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
      
      //$LASTPOS=45001017;//kernel.T2World:1017
      //$LASTPOS=45001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=45001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=45001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=45001114;//kernel.T2World:1114
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
      
      //$LASTPOS=45001017;//kernel.T2World:1017
      //$LASTPOS=45001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=45001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=45001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=45001114;//kernel.T2World:1114
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
      
      //$LASTPOS=46000086;//kernel.T2MediaPlayer:86
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000141;//kernel.T2MediaPlayer:141
      if (! Tonyu.globals.$t2MediaLib) {
        //$LASTPOS=46000170;//kernel.T2MediaPlayer:170
        Tonyu.globals.$t2MediaLib=new T2MediaLib();
        
      }
      //$LASTPOS=46000214;//kernel.T2MediaPlayer:214
      _this.bgmPlayerMax=Tonyu.globals.$t2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000141;//kernel.T2MediaPlayer:141
      if (! Tonyu.globals.$t2MediaLib) {
        //$LASTPOS=46000170;//kernel.T2MediaPlayer:170
        Tonyu.globals.$t2MediaLib=new T2MediaLib();
        
      }
      //$LASTPOS=46000214;//kernel.T2MediaPlayer:214
      _this.bgmPlayerMax=Tonyu.globals.$t2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    allClearSoundData :function _trc_T2MediaPlayer_allClearSoundData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000289;//kernel.T2MediaPlayer:289
      Tonyu.globals.$t2MediaLib.allResetBGM();
      //$LASTPOS=46000321;//kernel.T2MediaPlayer:321
      Tonyu.globals.$t2MediaLib.allClearSoundData();
    },
    fiber$allClearSoundData :function _trc_T2MediaPlayer_f_allClearSoundData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000289;//kernel.T2MediaPlayer:289
      Tonyu.globals.$t2MediaLib.allResetBGM();
      //$LASTPOS=46000321;//kernel.T2MediaPlayer:321
      Tonyu.globals.$t2MediaLib.allClearSoundData();
      
      _thread.retVal=_this;return;
    },
    clearSoundData :function _trc_T2MediaPlayer_clearSoundData(idx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000388;//kernel.T2MediaPlayer:388
      Tonyu.globals.$t2MediaLib.clearSoundData(idx);
    },
    fiber$clearSoundData :function _trc_T2MediaPlayer_f_clearSoundData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000388;//kernel.T2MediaPlayer:388
      Tonyu.globals.$t2MediaLib.clearSoundData(idx);
      
      _thread.retVal=_this;return;
    },
    allRemoveDecodedSoundData :function _trc_T2MediaPlayer_allRemoveDecodedSoundData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000463;//kernel.T2MediaPlayer:463
      Tonyu.globals.$t2MediaLib.allRemoveDecodedSoundData();
    },
    fiber$allRemoveDecodedSoundData :function _trc_T2MediaPlayer_f_allRemoveDecodedSoundData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000463;//kernel.T2MediaPlayer:463
      Tonyu.globals.$t2MediaLib.allRemoveDecodedSoundData();
      
      _thread.retVal=_this;return;
    },
    removeDecodedSoundData :function _trc_T2MediaPlayer_removeDecodedSoundData(idx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000546;//kernel.T2MediaPlayer:546
      Tonyu.globals.$t2MediaLib.removeDecodedSoundData(idx);
    },
    fiber$removeDecodedSoundData :function _trc_T2MediaPlayer_f_removeDecodedSoundData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000546;//kernel.T2MediaPlayer:546
      Tonyu.globals.$t2MediaLib.removeDecodedSoundData(idx);
      
      _thread.retVal=_this;return;
    },
    getMasterVolume :function _trc_T2MediaPlayer_getMasterVolume() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getMasterVolume()*128;
    },
    fiber$getMasterVolume :function _trc_T2MediaPlayer_f_getMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setMasterVolume :function _trc_T2MediaPlayer_setMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000698;//kernel.T2MediaPlayer:698
      if (typeof  vol==="number") {
        //$LASTPOS=46000738;//kernel.T2MediaPlayer:738
        vol/=128;
        //$LASTPOS=46000759;//kernel.T2MediaPlayer:759
        if (vol<0) {
          //$LASTPOS=46000774;//kernel.T2MediaPlayer:774
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setMasterVolume(Tonyu.globals.$t2MediaLib.getMasterVolume());
        
      }
      return Tonyu.globals.$t2MediaLib.setMasterVolume(vol);
    },
    fiber$setMasterVolume :function _trc_T2MediaPlayer_f_setMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000698;//kernel.T2MediaPlayer:698
      if (typeof  vol==="number") {
        //$LASTPOS=46000738;//kernel.T2MediaPlayer:738
        vol/=128;
        //$LASTPOS=46000759;//kernel.T2MediaPlayer:759
        if (vol<0) {
          //$LASTPOS=46000774;//kernel.T2MediaPlayer:774
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setMasterVolume(Tonyu.globals.$t2MediaLib.getMasterVolume());return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    loadSound :function _trc_T2MediaPlayer_loadSound(idx,src,callbacks) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000983;//kernel.T2MediaPlayer:983
      Tonyu.globals.$t2MediaLib.loadSound(idx,src,callbacks);
    },
    fiber$loadSound :function _trc_T2MediaPlayer_f_loadSound(_thread,idx,src,callbacks) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000983;//kernel.T2MediaPlayer:983
      Tonyu.globals.$t2MediaLib.loadSound(idx,src,callbacks);
      
      _thread.retVal=_this;return;
    },
    __getter__available :function _trc_T2MediaPlayer___getter__available() {
      "use strict";
      var _this=this;
      
      return ! ! Tonyu.globals.$t2MediaLib.context;
    },
    loadFromProject :function _trc_T2MediaPlayer_loadFromProject(prj) {
      "use strict";
      var _this=this;
      var r;
      var jobs;
      var cnt;
      var callbacks;
      var s;
      var name;
      var url;
      var func;
      var i;
      
      //$LASTPOS=46001126;//kernel.T2MediaPlayer:1126
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=46001155;//kernel.T2MediaPlayer:1155
      r = prj.getResource();
      
      //$LASTPOS=46001185;//kernel.T2MediaPlayer:1185
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=46001219;//kernel.T2MediaPlayer:1219
      if (r.sounds<=0) {
        return _this;
      }
      //$LASTPOS=46001253;//kernel.T2MediaPlayer:1253
      _this.progressNoLog("Loading sounds...[0/"+r.sounds.length+"]");
      //$LASTPOS=46001334;//kernel.T2MediaPlayer:1334
      jobs = 6;
      
      //$LASTPOS=46001351;//kernel.T2MediaPlayer:1351
      cnt = 0;
      
      //$LASTPOS=46001367;//kernel.T2MediaPlayer:1367
      callbacks = {};
      
      
      //$LASTPOS=46001413;//kernel.T2MediaPlayer:1413
      func = (function anonymous_1424(idx,errorID) {
        var s;
        var name;
        var url;
        
        //$LASTPOS=46001457;//kernel.T2MediaPlayer:1457
        if (errorID) {
          //$LASTPOS=46001485;//kernel.T2MediaPlayer:1485
          console.log(errorID);
          //$LASTPOS=46001564;//kernel.T2MediaPlayer:1564
          Tonyu.setGlobal(idx,"ERROR");
          
        } else {
          //$LASTPOS=46001672;//kernel.T2MediaPlayer:1672
          Tonyu.setGlobal(idx,idx);
          
        }
        //$LASTPOS=46001721;//kernel.T2MediaPlayer:1721
        cnt++;
        //$LASTPOS=46001738;//kernel.T2MediaPlayer:1738
        if (cnt>=r.sounds.length) {
          return _this;
        }
        //$LASTPOS=46001783;//kernel.T2MediaPlayer:1783
        _this.progressNoLog("Loading sounds...["+(cnt+1)+"/"+r.sounds.length+"]");
        //$LASTPOS=46001861;//kernel.T2MediaPlayer:1861
        s = r.sounds[cnt];
        
        //$LASTPOS=46001893;//kernel.T2MediaPlayer:1893
        name = s.name;
        
        //$LASTPOS=46001919;//kernel.T2MediaPlayer:1919
        url = Tonyu.Assets.resolve(s.url,prj);
        
        //$LASTPOS=46001970;//kernel.T2MediaPlayer:1970
        _this.loadSound(name,url,callbacks);
      });
      
      //$LASTPOS=46002016;//kernel.T2MediaPlayer:2016
      callbacks.succ=func;
      //$LASTPOS=46002042;//kernel.T2MediaPlayer:2042
      callbacks.err=func;
      //$LASTPOS=46002067;//kernel.T2MediaPlayer:2067
      //$LASTPOS=46002072;//kernel.T2MediaPlayer:2072
      i = 0;
      for (; i<jobs ; i++) {
        {
          //$LASTPOS=46002105;//kernel.T2MediaPlayer:2105
          if (i>=r.sounds.length) {
            break;
            
          }
          //$LASTPOS=46002147;//kernel.T2MediaPlayer:2147
          s=r.sounds[i];
          //$LASTPOS=46002173;//kernel.T2MediaPlayer:2173
          name=s.name;
          //$LASTPOS=46002195;//kernel.T2MediaPlayer:2195
          url=Tonyu.Assets.resolve(s.url,prj);
          //$LASTPOS=46002242;//kernel.T2MediaPlayer:2242
          _this.loadSound(name,url,callbacks);
        }
      }
      //$LASTPOS=46002287;//kernel.T2MediaPlayer:2287
      while (cnt<r.sounds.length) {
        //$LASTPOS=46002328;//kernel.T2MediaPlayer:2328
        _this.update();
        
      }
    },
    fiber$loadFromProject :function _trc_T2MediaPlayer_f_loadFromProject(_thread,prj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      var jobs;
      var cnt;
      var callbacks;
      var s;
      var name;
      var url;
      var func;
      var i;
      
      //$LASTPOS=46001126;//kernel.T2MediaPlayer:1126
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=46001155;//kernel.T2MediaPlayer:1155
      r = prj.getResource();
      
      //$LASTPOS=46001185;//kernel.T2MediaPlayer:1185
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=46001219;//kernel.T2MediaPlayer:1219
      if (r.sounds<=0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=46001253;//kernel.T2MediaPlayer:1253
      _this.progressNoLog("Loading sounds...[0/"+r.sounds.length+"]");
      //$LASTPOS=46001334;//kernel.T2MediaPlayer:1334
      jobs = 6;
      
      //$LASTPOS=46001351;//kernel.T2MediaPlayer:1351
      cnt = 0;
      
      //$LASTPOS=46001367;//kernel.T2MediaPlayer:1367
      callbacks = {};
      
      
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46001413;//kernel.T2MediaPlayer:1413
            func = (function anonymous_1424(idx,errorID) {
              var s;
              var name;
              var url;
              
              //$LASTPOS=46001457;//kernel.T2MediaPlayer:1457
              if (errorID) {
                //$LASTPOS=46001485;//kernel.T2MediaPlayer:1485
                console.log(errorID);
                //$LASTPOS=46001564;//kernel.T2MediaPlayer:1564
                Tonyu.setGlobal(idx,"ERROR");
                
              } else {
                //$LASTPOS=46001672;//kernel.T2MediaPlayer:1672
                Tonyu.setGlobal(idx,idx);
                
              }
              //$LASTPOS=46001721;//kernel.T2MediaPlayer:1721
              cnt++;
              //$LASTPOS=46001738;//kernel.T2MediaPlayer:1738
              if (cnt>=r.sounds.length) {
                return _this;
              }
              //$LASTPOS=46001783;//kernel.T2MediaPlayer:1783
              _this.progressNoLog("Loading sounds...["+(cnt+1)+"/"+r.sounds.length+"]");
              //$LASTPOS=46001861;//kernel.T2MediaPlayer:1861
              s = r.sounds[cnt];
              
              //$LASTPOS=46001893;//kernel.T2MediaPlayer:1893
              name = s.name;
              
              //$LASTPOS=46001919;//kernel.T2MediaPlayer:1919
              url = Tonyu.Assets.resolve(s.url,prj);
              
              //$LASTPOS=46001970;//kernel.T2MediaPlayer:1970
              _this.loadSound(name,url,callbacks);
            });
            
            //$LASTPOS=46002016;//kernel.T2MediaPlayer:2016
            callbacks.succ=func;
            //$LASTPOS=46002042;//kernel.T2MediaPlayer:2042
            callbacks.err=func;
            //$LASTPOS=46002067;//kernel.T2MediaPlayer:2067
            //$LASTPOS=46002072;//kernel.T2MediaPlayer:2072
            i = 0;
            
          case 1:
            if (!(i<jobs)) { __pc=5     ; break; }
            //$LASTPOS=46002105;//kernel.T2MediaPlayer:2105
            if (!(i>=r.sounds.length)) { __pc=2     ; break; }
            __pc=5     ; break;
            
          case 2     :
            
            //$LASTPOS=46002147;//kernel.T2MediaPlayer:2147
            s=r.sounds[i];
            //$LASTPOS=46002173;//kernel.T2MediaPlayer:2173
            name=s.name;
            //$LASTPOS=46002195;//kernel.T2MediaPlayer:2195
            url=Tonyu.Assets.resolve(s.url,prj);
            //$LASTPOS=46002242;//kernel.T2MediaPlayer:2242
            _this.fiber$loadSound(_thread, name, url, callbacks);
            __pc=3;return;
          case 3:
            
          case 4     :
            i++;
            __pc=1;break;
          case 5     :
            
            //$LASTPOS=46002287;//kernel.T2MediaPlayer:2287
          case 6:
            if (!(cnt<r.sounds.length)) { __pc=8     ; break; }
            //$LASTPOS=46002328;//kernel.T2MediaPlayer:2328
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    decodeSound :function _trc_T2MediaPlayer_decodeSound(idx,callbacks) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46002412;//kernel.T2MediaPlayer:2412
      Tonyu.globals.$t2MediaLib.decodeSound(idx,callbacks);
    },
    fiber$decodeSound :function _trc_T2MediaPlayer_f_decodeSound(_thread,idx,callbacks) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46002412;//kernel.T2MediaPlayer:2412
      Tonyu.globals.$t2MediaLib.decodeSound(idx,callbacks);
      
      _thread.retVal=_this;return;
    },
    getSoundFileData :function _trc_T2MediaPlayer_getSoundFileData(idx) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSoundFileData(idx);
    },
    fiber$getSoundFileData :function _trc_T2MediaPlayer_f_getSoundFileData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSoundFileData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    getSoundDecodedData :function _trc_T2MediaPlayer_getSoundDecodedData(idx) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSoundDecodedData(idx);
    },
    fiber$getSoundDecodedData :function _trc_T2MediaPlayer_f_getSoundDecodedData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSoundDecodedData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    getCurrentTime :function _trc_T2MediaPlayer_getCurrentTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getCurrentTime();
    },
    fiber$getCurrentTime :function _trc_T2MediaPlayer_f_getCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getCurrentTime();return;
      
      
      _thread.retVal=_this;return;
    },
    getContext :function _trc_T2MediaPlayer_getContext() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.context;
    },
    fiber$getContext :function _trc_T2MediaPlayer_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.context;return;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_T2MediaPlayer_playSE(idx,vol,pan,rate,offset,loop,loopStart,loopEnd,start,duration) {
      "use strict";
      var _this=this;
      var o;
      
      //$LASTPOS=46002908;//kernel.T2MediaPlayer:2908
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=46002931;//kernel.T2MediaPlayer:2931
      if (vol&&typeof  vol==="object") {
        //$LASTPOS=46002986;//kernel.T2MediaPlayer:2986
        o = vol;
        
        //$LASTPOS=46003006;//kernel.T2MediaPlayer:3006
        vol=o.vol;
        //$LASTPOS=46003026;//kernel.T2MediaPlayer:3026
        pan=o.pan;
        //$LASTPOS=46003046;//kernel.T2MediaPlayer:3046
        rate=o.rate;
        //$LASTPOS=46003068;//kernel.T2MediaPlayer:3068
        offset=o.offset;
        //$LASTPOS=46003094;//kernel.T2MediaPlayer:3094
        loop=o.loop;
        //$LASTPOS=46003116;//kernel.T2MediaPlayer:3116
        loopStart=o.loopStart;
        //$LASTPOS=46003148;//kernel.T2MediaPlayer:3148
        loopEnd=o.loopEnd;
        //$LASTPOS=46003176;//kernel.T2MediaPlayer:3176
        start=o.start;
        //$LASTPOS=46003200;//kernel.T2MediaPlayer:3200
        duration=o.duration;
        
      }
      //$LASTPOS=46003368;//kernel.T2MediaPlayer:3368
      if (vol==null) {
        //$LASTPOS=46003385;//kernel.T2MediaPlayer:3385
        vol=128;
      }
      //$LASTPOS=46003401;//kernel.T2MediaPlayer:3401
      if (typeof  vol==="number") {
        //$LASTPOS=46003441;//kernel.T2MediaPlayer:3441
        vol/=128;
        //$LASTPOS=46003462;//kernel.T2MediaPlayer:3462
        if (vol<0) {
          //$LASTPOS=46003477;//kernel.T2MediaPlayer:3477
          vol=0;
        }
        
      } else {
        //$LASTPOS=46003511;//kernel.T2MediaPlayer:3511
        vol=1;
        
      }
      return Tonyu.globals.$t2MediaLib.playSE(idx,vol,pan,rate,offset,loop,loopStart,loopEnd,start,duration);
    },
    stopSE :function _trc_T2MediaPlayer_stopSE(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopSE(sourceObj);
    },
    fiber$stopSE :function _trc_T2MediaPlayer_f_stopSE(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopSE(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEMasterVolume :function _trc_T2MediaPlayer_getSEMasterVolume() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSEMasterVolume()*128;
    },
    fiber$getSEMasterVolume :function _trc_T2MediaPlayer_f_getSEMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSEMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setSEMasterVolume :function _trc_T2MediaPlayer_setSEMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46003828;//kernel.T2MediaPlayer:3828
      if (typeof  vol==="number") {
        //$LASTPOS=46003868;//kernel.T2MediaPlayer:3868
        vol/=128;
        //$LASTPOS=46003889;//kernel.T2MediaPlayer:3889
        if (vol<0) {
          //$LASTPOS=46003904;//kernel.T2MediaPlayer:3904
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setSEMasterVolume(Tonyu.globals.$t2MediaLib.getSEMasterVolume());
        
      }
      return Tonyu.globals.$t2MediaLib.setSEMasterVolume(vol);
    },
    fiber$setSEMasterVolume :function _trc_T2MediaPlayer_f_setSEMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46003828;//kernel.T2MediaPlayer:3828
      if (typeof  vol==="number") {
        //$LASTPOS=46003868;//kernel.T2MediaPlayer:3868
        vol/=128;
        //$LASTPOS=46003889;//kernel.T2MediaPlayer:3889
        if (vol<0) {
          //$LASTPOS=46003904;//kernel.T2MediaPlayer:3904
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setSEMasterVolume(Tonyu.globals.$t2MediaLib.getSEMasterVolume());return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSEMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEVolume :function _trc_T2MediaPlayer_getSEVolume(sourceObj) {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=46004138;//kernel.T2MediaPlayer:4138
      vol = Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getSEVolume :function _trc_T2MediaPlayer_f_getSEVolume(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=46004138;//kernel.T2MediaPlayer:4138
      vol = Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setSEVolume :function _trc_T2MediaPlayer_setSEVolume(sourceObj,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46004281;//kernel.T2MediaPlayer:4281
      if (typeof  vol==="number") {
        //$LASTPOS=46004321;//kernel.T2MediaPlayer:4321
        vol/=128;
        //$LASTPOS=46004342;//kernel.T2MediaPlayer:4342
        if (vol<0) {
          //$LASTPOS=46004357;//kernel.T2MediaPlayer:4357
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj));
        
      }
      return Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,vol);
    },
    fiber$setSEVolume :function _trc_T2MediaPlayer_f_setSEVolume(_thread,sourceObj,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46004281;//kernel.T2MediaPlayer:4281
      if (typeof  vol==="number") {
        //$LASTPOS=46004321;//kernel.T2MediaPlayer:4321
        vol/=128;
        //$LASTPOS=46004342;//kernel.T2MediaPlayer:4342
        if (vol<0) {
          //$LASTPOS=46004357;//kernel.T2MediaPlayer:4357
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj));return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getSERate :function _trc_T2MediaPlayer_getSERate(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSERate(sourceObj);
    },
    fiber$getSERate :function _trc_T2MediaPlayer_f_getSERate(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSERate(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSERate :function _trc_T2MediaPlayer_setSERate(sourceObj,rate) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSERate(sourceObj,rate);
    },
    fiber$setSERate :function _trc_T2MediaPlayer_f_setSERate(_thread,sourceObj,rate) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSERate(sourceObj,rate);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEPan :function _trc_T2MediaPlayer_getSEPan(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSEPan(sourceObj);
    },
    fiber$getSEPan :function _trc_T2MediaPlayer_f_getSEPan(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSEPan(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSEPan :function _trc_T2MediaPlayer_setSEPan(sourceObj,pan) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSEPan(sourceObj,pan);
    },
    fiber$setSEPan :function _trc_T2MediaPlayer_f_setSEPan(_thread,sourceObj,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSEPan(sourceObj,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isSELoop :function _trc_T2MediaPlayer_isSELoop(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.isSELoop(sourceObj);
    },
    fiber$isSELoop :function _trc_T2MediaPlayer_f_isSELoop(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.isSELoop(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoop :function _trc_T2MediaPlayer_setSELoop(sourceObj,loop) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSELoop(sourceObj,loop);
    },
    fiber$setSELoop :function _trc_T2MediaPlayer_f_setSELoop(_thread,sourceObj,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSELoop(sourceObj,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getSELoopStartTime :function _trc_T2MediaPlayer_getSELoopStartTime(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSELoopStartTime(sourceObj);
    },
    fiber$getSELoopStartTime :function _trc_T2MediaPlayer_f_getSELoopStartTime(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSELoopStartTime(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoopStartTime :function _trc_T2MediaPlayer_setSELoopStartTime(sourceObj,loopStart) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSELoopStartTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopStart);
    },
    fiber$setSELoopStartTime :function _trc_T2MediaPlayer_f_setSELoopStartTime(_thread,sourceObj,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSELoopStartTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getSELoopEndTime :function _trc_T2MediaPlayer_getSELoopEndTime(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSELoopEndTime(sourceObj);
    },
    fiber$getSELoopEndTime :function _trc_T2MediaPlayer_f_getSELoopEndTime(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSELoopEndTime(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoopEndTime :function _trc_T2MediaPlayer_setSELoopEndTime(sourceObj,loopEnd) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSELoopEndTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopEnd);
    },
    fiber$setSELoopEndTime :function _trc_T2MediaPlayer_f_setSELoopEndTime(_thread,sourceObj,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSELoopEndTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    playBGM :function _trc_T2MediaPlayer_playBGM(idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46005553;//kernel.T2MediaPlayer:5553
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=46005576;//kernel.T2MediaPlayer:5576
      if (loop==null) {
        //$LASTPOS=46005594;//kernel.T2MediaPlayer:5594
        loop=false;
      }
      //$LASTPOS=46005613;//kernel.T2MediaPlayer:5613
      if (offset==null) {
        //$LASTPOS=46005633;//kernel.T2MediaPlayer:5633
        offset=0;
      }
      return Tonyu.globals.$t2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46005553;//kernel.T2MediaPlayer:5553
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=46005576;//kernel.T2MediaPlayer:5576
      if (loop==null) {
        //$LASTPOS=46005594;//kernel.T2MediaPlayer:5594
        loop=false;
      }
      //$LASTPOS=46005613;//kernel.T2MediaPlayer:5613
      if (offset==null) {
        //$LASTPOS=46005633;//kernel.T2MediaPlayer:5633
        offset=0;
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGM :function _trc_T2MediaPlayer_stopBGM() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopBGM(0);
    },
    fiber$stopBGM :function _trc_T2MediaPlayer_f_stopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGM :function _trc_T2MediaPlayer_pauseBGM() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.pauseBGM(0);
    },
    fiber$pauseBGM :function _trc_T2MediaPlayer_f_pauseBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.pauseBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGM :function _trc_T2MediaPlayer_resumeBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46005858;//kernel.T2MediaPlayer:5858
      if (_this.mute) {
        return _this;
      }
      return Tonyu.globals.$t2MediaLib.resumeBGM(0);
    },
    fiber$resumeBGM :function _trc_T2MediaPlayer_f_resumeBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46005858;//kernel.T2MediaPlayer:5858
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.resumeBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMMasterVolume :function _trc_T2MediaPlayer_getBGMMasterVolume() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMMasterVolume()*128;
    },
    fiber$getBGMMasterVolume :function _trc_T2MediaPlayer_f_getBGMMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMMasterVolume :function _trc_T2MediaPlayer_setBGMMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46006034;//kernel.T2MediaPlayer:6034
      if (typeof  vol==="number") {
        //$LASTPOS=46006074;//kernel.T2MediaPlayer:6074
        vol/=128;
        //$LASTPOS=46006095;//kernel.T2MediaPlayer:6095
        if (vol<0) {
          //$LASTPOS=46006110;//kernel.T2MediaPlayer:6110
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setBGMMasterVolume(Tonyu.globals.$t2MediaLib.getBGMMasterVolume());
        
      }
      return Tonyu.globals.$t2MediaLib.setBGMMasterVolume(vol);
    },
    fiber$setBGMMasterVolume :function _trc_T2MediaPlayer_f_setBGMMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46006034;//kernel.T2MediaPlayer:6034
      if (typeof  vol==="number") {
        //$LASTPOS=46006074;//kernel.T2MediaPlayer:6074
        vol/=128;
        //$LASTPOS=46006095;//kernel.T2MediaPlayer:6095
        if (vol<0) {
          //$LASTPOS=46006110;//kernel.T2MediaPlayer:6110
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMMasterVolume(Tonyu.globals.$t2MediaLib.getBGMMasterVolume());return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMVolume :function _trc_T2MediaPlayer_getBGMVolume() {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=46006339;//kernel.T2MediaPlayer:6339
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(0);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getBGMVolume :function _trc_T2MediaPlayer_f_getBGMVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=46006339;//kernel.T2MediaPlayer:6339
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(0);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolume :function _trc_T2MediaPlayer_setBGMVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46006561;//kernel.T2MediaPlayer:6561
      if (typeof  vol==="number") {
        //$LASTPOS=46006601;//kernel.T2MediaPlayer:6601
        vol/=128;
        //$LASTPOS=46006622;//kernel.T2MediaPlayer:6622
        if (vol<0) {
          //$LASTPOS=46006637;//kernel.T2MediaPlayer:6637
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setBGMVolume(0,Tonyu.globals.$t2MediaLib.getBGMVolume(0));
        
      }
      return Tonyu.globals.$t2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46006561;//kernel.T2MediaPlayer:6561
      if (typeof  vol==="number") {
        //$LASTPOS=46006601;//kernel.T2MediaPlayer:6601
        vol/=128;
        //$LASTPOS=46006622;//kernel.T2MediaPlayer:6622
        if (vol<0) {
          //$LASTPOS=46006637;//kernel.T2MediaPlayer:6637
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(0,Tonyu.globals.$t2MediaLib.getBGMVolume(0));return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(0,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMTempo :function _trc_T2MediaPlayer_getBGMTempo() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMTempo(0);
    },
    fiber$getBGMTempo :function _trc_T2MediaPlayer_f_getBGMTempo(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMTempo(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempo :function _trc_T2MediaPlayer_setBGMTempo(tempo) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMTempo(0,tempo);
    },
    fiber$setBGMTempo :function _trc_T2MediaPlayer_f_setBGMTempo(_thread,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMTempo(0,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPan :function _trc_T2MediaPlayer_getBGMPan() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPan(0);
    },
    fiber$getBGMPan :function _trc_T2MediaPlayer_f_getBGMPan(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPan(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMPan :function _trc_T2MediaPlayer_setBGMPan(pan) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMPan(0,pan);
    },
    fiber$setBGMPan :function _trc_T2MediaPlayer_f_setBGMPan(_thread,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMPan(0,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isBGMLoop :function _trc_T2MediaPlayer_isBGMLoop() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.isBGMLoop(0);
    },
    fiber$isBGMLoop :function _trc_T2MediaPlayer_f_isBGMLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.isBGMLoop(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoop :function _trc_T2MediaPlayer_setBGMLoop(loop) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoop(0,loop);
    },
    fiber$setBGMLoop :function _trc_T2MediaPlayer_f_setBGMLoop(_thread,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoop(0,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopStartTime :function _trc_T2MediaPlayer_getBGMLoopStartTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(0);
    },
    fiber$getBGMLoopStartTime :function _trc_T2MediaPlayer_f_getBGMLoopStartTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopStartTime :function _trc_T2MediaPlayer_setBGMLoopStartTime(loopStart) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(0,loopStart);
    },
    fiber$setBGMLoopStartTime :function _trc_T2MediaPlayer_f_setBGMLoopStartTime(_thread,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(0,loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopEndTime :function _trc_T2MediaPlayer_getBGMLoopEndTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(0);
    },
    fiber$getBGMLoopEndTime :function _trc_T2MediaPlayer_f_getBGMLoopEndTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopEndTime :function _trc_T2MediaPlayer_setBGMLoopEndTime(loopEnd) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(0,loopEnd);
    },
    fiber$setBGMLoopEndTime :function _trc_T2MediaPlayer_f_setBGMLoopEndTime(_thread,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(0,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTime :function _trc_T2MediaPlayer_getBGMCurrentTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMCurrentTime(0);
    },
    fiber$getBGMCurrentTime :function _trc_T2MediaPlayer_f_getBGMCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMCurrentTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLength :function _trc_T2MediaPlayer_getBGMLength() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLength(0);
    },
    fiber$getBGMLength :function _trc_T2MediaPlayer_f_getBGMLength(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLength(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getPlayingBGMName :function _trc_T2MediaPlayer_getPlayingBGMName() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getPlayingBGMName(0);
    },
    fiber$getPlayingBGMName :function _trc_T2MediaPlayer_f_getPlayingBGMName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getPlayingBGMName(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setOnBGMEndListener :function _trc_T2MediaPlayer_setOnBGMEndListener() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setOnBGMEndListener(0);
    },
    fiber$setOnBGMEndListener :function _trc_T2MediaPlayer_f_setOnBGMEndListener(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setOnBGMEndListener(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getPlayingBGMState :function _trc_T2MediaPlayer_getPlayingBGMState(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getPlayingBGMState(id);
    },
    fiber$getPlayingBGMState :function _trc_T2MediaPlayer_f_getPlayingBGMState(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getPlayingBGMState(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPicoAudio :function _trc_T2MediaPlayer_getBGMPicoAudio(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPicoAudio(id);
    },
    fiber$getBGMPicoAudio :function _trc_T2MediaPlayer_f_getBGMPicoAudio(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPicoAudio(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPlayerMax :function _trc_T2MediaPlayer_getBGMPlayerMax() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPlayerMax();
    },
    fiber$getBGMPlayerMax :function _trc_T2MediaPlayer_f_getBGMPlayerMax(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPlayerMax();return;
      
      
      _thread.retVal=_this;return;
    },
    allStopBGM :function _trc_T2MediaPlayer_allStopBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46008103;//kernel.T2MediaPlayer:8103
      Tonyu.globals.$t2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46008103;//kernel.T2MediaPlayer:8103
      Tonyu.globals.$t2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    allResetBGM :function _trc_T2MediaPlayer_allResetBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46008157;//kernel.T2MediaPlayer:8157
      Tonyu.globals.$t2MediaLib.allResetBGM();
    },
    fiber$allResetBGM :function _trc_T2MediaPlayer_f_allResetBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46008157;//kernel.T2MediaPlayer:8157
      Tonyu.globals.$t2MediaLib.allResetBGM();
      
      _thread.retVal=_this;return;
    },
    playBGMID :function _trc_T2MediaPlayer_playBGMID(id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46008267;//kernel.T2MediaPlayer:8267
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=46008290;//kernel.T2MediaPlayer:8290
      if (loop==null) {
        //$LASTPOS=46008308;//kernel.T2MediaPlayer:8308
        loop=false;
      }
      //$LASTPOS=46008327;//kernel.T2MediaPlayer:8327
      if (offset==null) {
        //$LASTPOS=46008347;//kernel.T2MediaPlayer:8347
        offset=0;
      }
      return Tonyu.globals.$t2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46008267;//kernel.T2MediaPlayer:8267
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=46008290;//kernel.T2MediaPlayer:8290
      if (loop==null) {
        //$LASTPOS=46008308;//kernel.T2MediaPlayer:8308
        loop=false;
      }
      //$LASTPOS=46008327;//kernel.T2MediaPlayer:8327
      if (offset==null) {
        //$LASTPOS=46008347;//kernel.T2MediaPlayer:8347
        offset=0;
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGMID :function _trc_T2MediaPlayer_stopBGMID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopBGM(id);
    },
    fiber$stopBGMID :function _trc_T2MediaPlayer_f_stopBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGMID :function _trc_T2MediaPlayer_pauseBGMID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.pauseBGM(id);
    },
    fiber$pauseBGMID :function _trc_T2MediaPlayer_f_pauseBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.pauseBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGMID :function _trc_T2MediaPlayer_resumeBGMID(id) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46008587;//kernel.T2MediaPlayer:8587
      if (_this.mute) {
        return _this;
      }
      return Tonyu.globals.$t2MediaLib.resumeBGM(id);
    },
    fiber$resumeBGMID :function _trc_T2MediaPlayer_f_resumeBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46008587;//kernel.T2MediaPlayer:8587
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.resumeBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMVolumeID :function _trc_T2MediaPlayer_getBGMVolumeID(id) {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=46008677;//kernel.T2MediaPlayer:8677
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(id);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getBGMVolumeID :function _trc_T2MediaPlayer_f_getBGMVolumeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=46008677;//kernel.T2MediaPlayer:8677
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(id);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolumeID :function _trc_T2MediaPlayer_setBGMVolumeID(id,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46008906;//kernel.T2MediaPlayer:8906
      if (typeof  vol==="number") {
        //$LASTPOS=46008946;//kernel.T2MediaPlayer:8946
        vol/=128;
        //$LASTPOS=46008967;//kernel.T2MediaPlayer:8967
        if (vol<0) {
          //$LASTPOS=46008982;//kernel.T2MediaPlayer:8982
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setBGMVolume(id,Tonyu.globals.$t2MediaLib.getBGMVolume(id));
        
      }
      return Tonyu.globals.$t2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46008906;//kernel.T2MediaPlayer:8906
      if (typeof  vol==="number") {
        //$LASTPOS=46008946;//kernel.T2MediaPlayer:8946
        vol/=128;
        //$LASTPOS=46008967;//kernel.T2MediaPlayer:8967
        if (vol<0) {
          //$LASTPOS=46008982;//kernel.T2MediaPlayer:8982
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(id,Tonyu.globals.$t2MediaLib.getBGMVolume(id));return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(id,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMTempoID :function _trc_T2MediaPlayer_getBGMTempoID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMTempo(id);
    },
    fiber$getBGMTempoID :function _trc_T2MediaPlayer_f_getBGMTempoID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMTempo(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempoID :function _trc_T2MediaPlayer_setBGMTempoID(id,tempo) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMTempo(id,tempo);
    },
    fiber$setBGMTempoID :function _trc_T2MediaPlayer_f_setBGMTempoID(_thread,id,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMTempo(id,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPanID :function _trc_T2MediaPlayer_getBGMPanID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPan(id);
    },
    fiber$getBGMPanID :function _trc_T2MediaPlayer_f_getBGMPanID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPan(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMPanID :function _trc_T2MediaPlayer_setBGMPanID(id,pan) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMPan(id,pan);
    },
    fiber$setBGMPanID :function _trc_T2MediaPlayer_f_setBGMPanID(_thread,id,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMPan(id,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isBGMLoopID :function _trc_T2MediaPlayer_isBGMLoopID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.isBGMLoop(id);
    },
    fiber$isBGMLoopID :function _trc_T2MediaPlayer_f_isBGMLoopID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.isBGMLoop(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopID :function _trc_T2MediaPlayer_setBGMLoopID(id,loop) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoop(id,loop);
    },
    fiber$setBGMLoopID :function _trc_T2MediaPlayer_f_setBGMLoopID(_thread,id,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoop(id,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopStartTimeID :function _trc_T2MediaPlayer_getBGMLoopStartTimeID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(id);
    },
    fiber$getBGMLoopStartTimeID :function _trc_T2MediaPlayer_f_getBGMLoopStartTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopStartTimeID :function _trc_T2MediaPlayer_setBGMLoopStartTimeID(id,loopStart) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(id,loopStart);
    },
    fiber$setBGMLoopStartTimeID :function _trc_T2MediaPlayer_f_setBGMLoopStartTimeID(_thread,id,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(id,loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopEndTimeID :function _trc_T2MediaPlayer_getBGMLoopEndTimeID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(id);
    },
    fiber$getBGMLoopEndTimeID :function _trc_T2MediaPlayer_f_getBGMLoopEndTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopEndTimeID :function _trc_T2MediaPlayer_setBGMLoopEndTimeID(id,loopEnd) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(id,loopEnd);
    },
    fiber$setBGMLoopEndTimeID :function _trc_T2MediaPlayer_f_setBGMLoopEndTimeID(_thread,id,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(id,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTimeID :function _trc_T2MediaPlayer_getBGMCurrentTimeID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMCurrentTime(id);
    },
    fiber$getBGMCurrentTimeID :function _trc_T2MediaPlayer_f_getBGMCurrentTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMCurrentTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLengthID :function _trc_T2MediaPlayer_getBGMLengthID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLength(id);
    },
    fiber$getBGMLengthID :function _trc_T2MediaPlayer_f_getBGMLengthID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLength(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getPlayingBGMNameID :function _trc_T2MediaPlayer_getPlayingBGMNameID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getPlayingBGMName(id);
    },
    fiber$getPlayingBGMNameID :function _trc_T2MediaPlayer_f_getPlayingBGMNameID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getPlayingBGMName(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMOnSongEndListener :function _trc_T2MediaPlayer_setBGMOnSongEndListener(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setOnBGMEndListener(id);
    },
    fiber$setBGMOnSongEndListener :function _trc_T2MediaPlayer_f_setBGMOnSongEndListener(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setOnBGMEndListener(id);return;
      
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46010509;//kernel.T2MediaPlayer:10509
      Tonyu.globals.$t2MediaLib.loadAudio(idx,src);
      //$LASTPOS=46010572;//kernel.T2MediaPlayer:10572
      while (Tonyu.globals.$t2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=46010618;//kernel.T2MediaPlayer:10618
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46010509;//kernel.T2MediaPlayer:10509
      Tonyu.globals.$t2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46010572;//kernel.T2MediaPlayer:10572
          case 1:
            if (!(Tonyu.globals.$t2MediaLib.getAudioData(idx)==null)) { __pc=3     ; break; }
            //$LASTPOS=46010618;//kernel.T2MediaPlayer:10618
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
      
      //$LASTPOS=46010674;//kernel.T2MediaPlayer:10674
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=46010697;//kernel.T2MediaPlayer:10697
      if (loop==null) {
        //$LASTPOS=46010715;//kernel.T2MediaPlayer:10715
        loop=false;
      }
      //$LASTPOS=46010734;//kernel.T2MediaPlayer:10734
      if (startTime==null) {
        //$LASTPOS=46010757;//kernel.T2MediaPlayer:10757
        startTime=0;
      }
      return Tonyu.globals.$t2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46010674;//kernel.T2MediaPlayer:10674
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=46010697;//kernel.T2MediaPlayer:10697
      if (loop==null) {
        //$LASTPOS=46010715;//kernel.T2MediaPlayer:10715
        loop=false;
      }
      //$LASTPOS=46010734;//kernel.T2MediaPlayer:10734
      if (startTime==null) {
        //$LASTPOS=46010757;//kernel.T2MediaPlayer:10757
        startTime=0;
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.playAudio(idx,loop,startTime);return;
      
      
      _thread.retVal=_this;return;
    },
    stopAudio :function _trc_T2MediaPlayer_stopAudio() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopAudio();
    },
    fiber$stopAudio :function _trc_T2MediaPlayer_f_stopAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    pauseAudio :function _trc_T2MediaPlayer_pauseAudio() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.pauseAudio();
    },
    fiber$pauseAudio :function _trc_T2MediaPlayer_f_pauseAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.pauseAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    resumeAudio :function _trc_T2MediaPlayer_resumeAudio() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46010975;//kernel.T2MediaPlayer:10975
      if (_this.mute) {
        return _this;
      }
      return Tonyu.globals.$t2MediaLib.resumeAudio();
    },
    fiber$resumeAudio :function _trc_T2MediaPlayer_f_resumeAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46010975;//kernel.T2MediaPlayer:10975
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.resumeAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioVolume :function _trc_T2MediaPlayer_setAudioVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46011066;//kernel.T2MediaPlayer:11066
      vol=vol/128;
      //$LASTPOS=46011088;//kernel.T2MediaPlayer:11088
      if (vol>1) {
        //$LASTPOS=46011108;//kernel.T2MediaPlayer:11108
        vol=1;
      } else {
        //$LASTPOS=46011129;//kernel.T2MediaPlayer:11129
        if (vol<0) {
          //$LASTPOS=46011144;//kernel.T2MediaPlayer:11144
          vol=0;
        }
      }
      return Tonyu.globals.$t2MediaLib.setAudioVolume(vol);
    },
    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46011066;//kernel.T2MediaPlayer:11066
      vol=vol/128;
      //$LASTPOS=46011088;//kernel.T2MediaPlayer:11088
      if (vol>1) {
        //$LASTPOS=46011108;//kernel.T2MediaPlayer:11108
        vol=1;
      } else {
        //$LASTPOS=46011129;//kernel.T2MediaPlayer:11129
        if (vol<0) {
          //$LASTPOS=46011144;//kernel.T2MediaPlayer:11144
          vol=0;
        }
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46011235;//kernel.T2MediaPlayer:11235
      if (tempo>4) {
        //$LASTPOS=46011257;//kernel.T2MediaPlayer:11257
        tempo=4;
      } else {
        //$LASTPOS=46011280;//kernel.T2MediaPlayer:11280
        if (tempo<0.5) {
          //$LASTPOS=46011297;//kernel.T2MediaPlayer:11297
          tempo=0.5;
        }
      }
      return Tonyu.globals.$t2MediaLib.setAudioTempo(tempo);
    },
    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46011235;//kernel.T2MediaPlayer:11235
      if (tempo>4) {
        //$LASTPOS=46011257;//kernel.T2MediaPlayer:11257
        tempo=4;
      } else {
        //$LASTPOS=46011280;//kernel.T2MediaPlayer:11280
        if (tempo<0.5) {
          //$LASTPOS=46011297;//kernel.T2MediaPlayer:11297
          tempo=0.5;
        }
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setAudioTempo(tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioPosition :function _trc_T2MediaPlayer_setAudioPosition(time) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setAudioPosition(time);
    },
    fiber$setAudioPosition :function _trc_T2MediaPlayer_f_setAudioPosition(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setAudioPosition(time);return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioCurrentTime :function _trc_T2MediaPlayer_getAudioCurrentTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getAudioCurrentTime();
    },
    fiber$getAudioCurrentTime :function _trc_T2MediaPlayer_f_getAudioCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getAudioCurrentTime();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioLength :function _trc_T2MediaPlayer_getAudioLength() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getAudioLength();
    },
    fiber$getAudioLength :function _trc_T2MediaPlayer_f_getAudioLength(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getAudioLength();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioData :function _trc_T2MediaPlayer_getAudioData(idx) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getAudioData(idx);
    },
    fiber$getAudioData :function _trc_T2MediaPlayer_f_getAudioData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getAudioData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"allClearSoundData":{"nowait":false},"clearSoundData":{"nowait":false},"allRemoveDecodedSoundData":{"nowait":false},"removeDecodedSoundData":{"nowait":false},"getMasterVolume":{"nowait":false},"setMasterVolume":{"nowait":false},"loadSound":{"nowait":false},"__getter__available":{"nowait":true},"loadFromProject":{"nowait":false},"decodeSound":{"nowait":false},"getSoundFileData":{"nowait":false},"getSoundDecodedData":{"nowait":false},"getCurrentTime":{"nowait":false},"getContext":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEMasterVolume":{"nowait":false},"setSEMasterVolume":{"nowait":false},"getSEVolume":{"nowait":false},"setSEVolume":{"nowait":false},"getSERate":{"nowait":false},"setSERate":{"nowait":false},"getSEPan":{"nowait":false},"setSEPan":{"nowait":false},"isSELoop":{"nowait":false},"setSELoop":{"nowait":false},"getSELoopStartTime":{"nowait":false},"setSELoopStartTime":{"nowait":false},"getSELoopEndTime":{"nowait":false},"setSELoopEndTime":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"getBGMMasterVolume":{"nowait":false},"setBGMMasterVolume":{"nowait":false},"getBGMVolume":{"nowait":false},"setBGMVolume":{"nowait":false},"getBGMTempo":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMPan":{"nowait":false},"setBGMPan":{"nowait":false},"isBGMLoop":{"nowait":false},"setBGMLoop":{"nowait":false},"getBGMLoopStartTime":{"nowait":false},"setBGMLoopStartTime":{"nowait":false},"getBGMLoopEndTime":{"nowait":false},"setBGMLoopEndTime":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getPlayingBGMName":{"nowait":false},"setOnBGMEndListener":{"nowait":false},"getPlayingBGMState":{"nowait":false},"getBGMPicoAudio":{"nowait":false},"getBGMPlayerMax":{"nowait":false},"allStopBGM":{"nowait":false},"allResetBGM":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"getBGMVolumeID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"getBGMTempoID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMPanID":{"nowait":false},"setBGMPanID":{"nowait":false},"isBGMLoopID":{"nowait":false},"setBGMLoopID":{"nowait":false},"getBGMLoopStartTimeID":{"nowait":false},"setBGMLoopStartTimeID":{"nowait":false},"getBGMLoopEndTimeID":{"nowait":false},"setBGMLoopEndTimeID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"getPlayingBGMNameID":{"nowait":false},"setBGMOnSongEndListener":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}},"fields":{"bgmPlayerMax":{},"available":{},"progressNoLog":{},"mute":{}}}
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
      
      //$LASTPOS=47000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=47000096;//kernel.PlainChar:96
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=47000142;//kernel.PlainChar:142
        _this.initSprite();
        
      }
      //$LASTPOS=47000168;//kernel.PlainChar:168
      _this.layer=_this.layer||Tonyu.globals.$mainLayer;
      //$LASTPOS=47000198;//kernel.PlainChar:198
      _this._scheduler=_this._scheduler||Tonyu.globals.$Scheduler;
      //$LASTPOS=47000238;//kernel.PlainChar:238
      _this.crashScale=1;
      //$LASTPOS=47000257;//kernel.PlainChar:257
      if (typeof  x=="object") {
        //$LASTPOS=47000281;//kernel.PlainChar:281
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=47000313;//kernel.PlainChar:313
        if (typeof  x=="number") {
          //$LASTPOS=47000348;//kernel.PlainChar:348
          _this.x=x;
          //$LASTPOS=47000367;//kernel.PlainChar:367
          _this.y=y;
          //$LASTPOS=47000386;//kernel.PlainChar:386
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000423;//kernel.PlainChar:423
      _this.onDraw();
      //$LASTPOS=47000438;//kernel.PlainChar:438
      if (_this._isInvisible) {
        return _this;
      }
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000512;//kernel.PlainChar:512
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000512;//kernel.PlainChar:512
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
      
      //$LASTPOS=47000568;//kernel.PlainChar:568
      _this.onUpdate();
      //$LASTPOS=47000585;//kernel.PlainChar:585
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000568;//kernel.PlainChar:568
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000585;//kernel.PlainChar:585
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
      
      //$LASTPOS=47000646;//kernel.PlainChar:646
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=47000698;//kernel.PlainChar:698
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=47000736;//kernel.PlainChar:736
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=47000768;//kernel.PlainChar:768
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000646;//kernel.PlainChar:646
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=47000698;//kernel.PlainChar:698
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=47000736;//kernel.PlainChar:736
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000768;//kernel.PlainChar:768
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
      
      //$LASTPOS=47000800;//kernel.PlainChar:800
      _this.main();
      //$LASTPOS=47000813;//kernel.PlainChar:813
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
            //$LASTPOS=47000800;//kernel.PlainChar:800
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=47000813;//kernel.PlainChar:813
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
      
      //$LASTPOS=48000038;//kernel.SecretChar:38
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
      
      //$LASTPOS=49000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=49000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=49000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=49000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=49000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=49000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=49000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=49000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=49000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=49000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49000220;//kernel.SpriteChar:220
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=49000251;//kernel.SpriteChar:251
      _this.onDraw();
      //$LASTPOS=49000266;//kernel.SpriteChar:266
      _this.detectShape();
      //$LASTPOS=49000286;//kernel.SpriteChar:286
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
      
      //$LASTPOS=50000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=50000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=50000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=50000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=50000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=50000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=50000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=50000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=50000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=50000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=50000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=50000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=50000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=50000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=50000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=50000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=50000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=50000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=50000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=50000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=50000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=50000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=50000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=50000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=50000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=50000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=50000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=50000885;//kernel.T1Map:885
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
      
      //$LASTPOS=50000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=50000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=50000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=50000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=50001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=50001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=50001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=50001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=50001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=50000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=50000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=50000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=50000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=50001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=50001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=50001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=50001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=50001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=51000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=51000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=51000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=51000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=51000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=51000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=51000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=51000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=51000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=51000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=51000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=51000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=51000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=51000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=51000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=51000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=51000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=51000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=51000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=51000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=51000347;//kernel.T1Page:347
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
      
      //$LASTPOS=52000072;//kernel.TextChar:72
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=52000091;//kernel.TextChar:91
      _this.text=_this.text||"";
      //$LASTPOS=52000111;//kernel.TextChar:111
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=52000130;//kernel.TextChar:130
      _this.size=20;
      //$LASTPOS=52000144;//kernel.TextChar:144
      if (! _this.x) {
        //$LASTPOS=52000157;//kernel.TextChar:157
        _this.x=0;
      }
      //$LASTPOS=52000172;//kernel.TextChar:172
      if (! _this.y) {
        //$LASTPOS=52000185;//kernel.TextChar:185
        _this.y=0;
      }
      //$LASTPOS=52000200;//kernel.TextChar:200
      if (t) {
        //$LASTPOS=52000207;//kernel.TextChar:207
        _this.text=t;
      }
      //$LASTPOS=52000220;//kernel.TextChar:220
      if (c) {
        //$LASTPOS=52000227;//kernel.TextChar:227
        _this.fillStyle=c;
      }
      //$LASTPOS=52000245;//kernel.TextChar:245
      if (s) {
        //$LASTPOS=52000252;//kernel.TextChar:252
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000282;//kernel.TextChar:282
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=52000313;//kernel.TextChar:313
      _this.onDraw();
      //$LASTPOS=52000328;//kernel.TextChar:328
      _this.drawText(_this.x,_this.y,_this.text,_this.col,_this.size);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"col":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.APad',
  shortName: 'APad',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_APad_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000862;//kernel.APad:862
      if (! _this.auto) {
        //$LASTPOS=53000873;//kernel.APad:873
        _this.loop();
      }
    },
    fiber$main :function _trc_APad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_APad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=53000862;//kernel.APad:862
            if (!(! _this.auto)) { __pc=2     ; break; }
            //$LASTPOS=53000873;//kernel.APad:873
            _this.fiber$loop(_thread);
            __pc=1;return;
          case 1:
            
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_APad_initialize(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000033;//kernel.APad:33
      p=p||{};
      //$LASTPOS=53000047;//kernel.APad:47
      if (! p.alpha) {
        //$LASTPOS=53000061;//kernel.APad:61
        p.alpha=128;
      }
      //$LASTPOS=53000079;//kernel.APad:79
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
      //$LASTPOS=53000094;//kernel.APad:94
      _this.vx=0;
      //$LASTPOS=53000099;//kernel.APad:99
      _this.vy=0;
      //$LASTPOS=53000110;//kernel.APad:110
      _this.outerRadius=_this.outerRadius||50;
      //$LASTPOS=53000144;//kernel.APad:144
      _this.fillStyle=_this.fillStyle||"white";
      //$LASTPOS=53000179;//kernel.APad:179
      _this.strokeStyle=_this.strokeStyle||"white";
      //$LASTPOS=53000218;//kernel.APad:218
      _this.innerRadius=_this.innerRadius||10;
      //$LASTPOS=53000252;//kernel.APad:252
      if (typeof  _this.keys==="object") {
        //$LASTPOS=53000291;//kernel.APad:291
        _this.leftKey=_this.keys.left;
        //$LASTPOS=53000319;//kernel.APad:319
        _this.rightKey=_this.keys.right;
        //$LASTPOS=53000349;//kernel.APad:349
        _this.upKey=_this.keys.up;
        //$LASTPOS=53000373;//kernel.APad:373
        _this.downKey=_this.keys.down;
        
      }
      //$LASTPOS=53000404;//kernel.APad:404
      _this.keySpeed=_this.keySpeed||15/50;
      //$LASTPOS=53000435;//kernel.APad:435
      _this.leftKey=_this.leftKey||"left";
      //$LASTPOS=53000465;//kernel.APad:465
      _this.rightKey=_this.rightKey||"right";
      //$LASTPOS=53000498;//kernel.APad:498
      _this.upKey=_this.upKey||"up";
      //$LASTPOS=53000522;//kernel.APad:522
      _this.downKey=_this.downKey||"down";
      //$LASTPOS=53000552;//kernel.APad:552
      _this.decay=_this.decay||0.8;
      //$LASTPOS=53000575;//kernel.APad:575
      _this.velocity=new Tonyu.classes.kernel.Vec3View(_this,{x: "vx",y: "vy",z: "vz"});
      //$LASTPOS=53000632;//kernel.APad:632
      if ((typeof  _this.x!=="number")||_this.x!==_this.x) {
        //$LASTPOS=53000679;//kernel.APad:679
        _this.x=Tonyu.globals.$screenWidth/2;
        
      }
      //$LASTPOS=53000709;//kernel.APad:709
      if ((typeof  _this.y!=="number")||_this.y!==_this.y) {
        //$LASTPOS=53000756;//kernel.APad:756
        _this.y=Tonyu.globals.$screenHeight-_this.outerRadius-_this.innerRadius;
        
      }
      //$LASTPOS=53000847;//kernel.APad:847
      _this.ix=_this.x;
      //$LASTPOS=53000852;//kernel.APad:852
      _this.iy=_this.y;
    },
    __getter__defaultLayer :function _trc_APad___getter__defaultLayer() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$frontLayer;
    },
    draw :function _trc_APad_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000968;//kernel.APad:968
      if (_this.auto) {
        //$LASTPOS=53000989;//kernel.APad:989
        _this.ix=_this.x+_this.vx*_this.outerRadius;
        //$LASTPOS=53001019;//kernel.APad:1019
        _this.iy=_this.y+_this.vy*_this.outerRadius;
        
      }
      //$LASTPOS=53001052;//kernel.APad:1052
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=53001084;//kernel.APad:1084
      ctx.fillStyle=_this.fillStyle+"";
      //$LASTPOS=53001117;//kernel.APad:1117
      ctx.beginPath();
      //$LASTPOS=53001139;//kernel.APad:1139
      ctx.arc(_this.ix,_this.iy,_this.innerRadius,0,Tonyu.globals.$Math.PI*2);
      //$LASTPOS=53001185;//kernel.APad:1185
      ctx.closePath();
      //$LASTPOS=53001207;//kernel.APad:1207
      ctx.fill();
      //$LASTPOS=53001224;//kernel.APad:1224
      ctx.strokeStyle=_this.strokeStyle;
      //$LASTPOS=53001258;//kernel.APad:1258
      ctx.beginPath();
      //$LASTPOS=53001280;//kernel.APad:1280
      ctx.arc(_this.x,_this.y,_this.outerRadius,0,Tonyu.globals.$Math.PI*2);
      //$LASTPOS=53001324;//kernel.APad:1324
      ctx.closePath();
      //$LASTPOS=53001346;//kernel.APad:1346
      ctx.stroke();
    },
    findTouch :function _trc_APad_findTouch() {
      "use strict";
      var _this=this;
      var t;
      var _it_516;
      
      //$LASTPOS=53001384;//kernel.APad:1384
      _it_516=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_516.next()) {
        t=_it_516[0];
        
        //$LASTPOS=53001419;//kernel.APad:1419
        if ((! _this.touchRadius||_this.dist(t)<_this.touchRadius)&&t.touched==1) {
          return t;
          
        }
        
      }
    },
    loop :function _trc_APad_loop() {
      "use strict";
      var _this=this;
      var vx;
      var vy;
      
      //$LASTPOS=53001544;//kernel.APad:1544
      vx = 0;
      vy = 0;
      
      //$LASTPOS=53001564;//kernel.APad:1564
      while (true) {
        //$LASTPOS=53001587;//kernel.APad:1587
        if (! _this.t||_this.t.ended) {
          //$LASTPOS=53001606;//kernel.APad:1606
          _this.t=_this.findTouch();
        }
        //$LASTPOS=53001630;//kernel.APad:1630
        if (_this.t) {
          //$LASTPOS=53001652;//kernel.APad:1652
          vx+=_this.t.vx;
          //$LASTPOS=53001675;//kernel.APad:1675
          vy+=_this.t.vy;
          
        } else {
          //$LASTPOS=53001716;//kernel.APad:1716
          vx*=_this.decay;
          //$LASTPOS=53001740;//kernel.APad:1740
          vy*=_this.decay;
          
        }
        //$LASTPOS=53001835;//kernel.APad:1835
        if (_this.getkey(_this.leftKey)) {
          //$LASTPOS=53001856;//kernel.APad:1856
          vx-=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=53001891;//kernel.APad:1891
        if (_this.getkey(_this.rightKey)) {
          //$LASTPOS=53001913;//kernel.APad:1913
          vx+=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=53001948;//kernel.APad:1948
        if (_this.getkey(_this.upKey)) {
          //$LASTPOS=53001967;//kernel.APad:1967
          vy-=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=53002002;//kernel.APad:2002
        if (_this.getkey(_this.downKey)) {
          //$LASTPOS=53002023;//kernel.APad:2023
          vy+=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=53002058;//kernel.APad:2058
        _this.d=_this.dist(vx,vy);
        //$LASTPOS=53002082;//kernel.APad:2082
        if (_this.d>_this.outerRadius) {
          //$LASTPOS=53002116;//kernel.APad:2116
          vx=vx/_this.d*_this.outerRadius;
          //$LASTPOS=53002150;//kernel.APad:2150
          vy=vy/_this.d*_this.outerRadius;
          
        }
        //$LASTPOS=53002191;//kernel.APad:2191
        _this.ix=_this.x+vx;
        //$LASTPOS=53002209;//kernel.APad:2209
        _this.iy=_this.y+vy;
        //$LASTPOS=53002227;//kernel.APad:2227
        _this.vx=_this.clamp(vx/_this.outerRadius,- 1,1);
        //$LASTPOS=53002272;//kernel.APad:2272
        _this.vy=_this.clamp(vy/_this.outerRadius,- 1,1);
        //$LASTPOS=53002317;//kernel.APad:2317
        _this.update();
        
      }
    },
    fiber$loop :function _trc_APad_f_loop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vx;
      var vy;
      
      //$LASTPOS=53001544;//kernel.APad:1544
      vx = 0;
      vy = 0;
      
      
      _thread.enter(function _trc_APad_ent_loop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=53001564;//kernel.APad:1564
          case 1:
            //$LASTPOS=53001587;//kernel.APad:1587
            if (! _this.t||_this.t.ended) {
              //$LASTPOS=53001606;//kernel.APad:1606
              _this.t=_this.findTouch();
            }
            //$LASTPOS=53001630;//kernel.APad:1630
            if (_this.t) {
              //$LASTPOS=53001652;//kernel.APad:1652
              vx+=_this.t.vx;
              //$LASTPOS=53001675;//kernel.APad:1675
              vy+=_this.t.vy;
              
            } else {
              //$LASTPOS=53001716;//kernel.APad:1716
              vx*=_this.decay;
              //$LASTPOS=53001740;//kernel.APad:1740
              vy*=_this.decay;
              
            }
            //$LASTPOS=53001835;//kernel.APad:1835
            if (_this.getkey(_this.leftKey)) {
              //$LASTPOS=53001856;//kernel.APad:1856
              vx-=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=53001891;//kernel.APad:1891
            if (_this.getkey(_this.rightKey)) {
              //$LASTPOS=53001913;//kernel.APad:1913
              vx+=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=53001948;//kernel.APad:1948
            if (_this.getkey(_this.upKey)) {
              //$LASTPOS=53001967;//kernel.APad:1967
              vy-=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=53002002;//kernel.APad:2002
            if (_this.getkey(_this.downKey)) {
              //$LASTPOS=53002023;//kernel.APad:2023
              vy+=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=53002058;//kernel.APad:2058
            _this.d=_this.dist(vx,vy);
            //$LASTPOS=53002082;//kernel.APad:2082
            if (_this.d>_this.outerRadius) {
              //$LASTPOS=53002116;//kernel.APad:2116
              vx=vx/_this.d*_this.outerRadius;
              //$LASTPOS=53002150;//kernel.APad:2150
              vy=vy/_this.d*_this.outerRadius;
              
            }
            //$LASTPOS=53002191;//kernel.APad:2191
            _this.ix=_this.x+vx;
            //$LASTPOS=53002209;//kernel.APad:2209
            _this.iy=_this.y+vy;
            //$LASTPOS=53002227;//kernel.APad:2227
            _this.vx=_this.clamp(vx/_this.outerRadius,- 1,1);
            //$LASTPOS=53002272;//kernel.APad:2272
            _this.vy=_this.clamp(vy/_this.outerRadius,- 1,1);
            //$LASTPOS=53002317;//kernel.APad:2317
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
    __getter__speed :function _trc_APad___getter__speed() {
      "use strict";
      var _this=this;
      
      return _this.sqrt(_this.vx*_this.vx+_this.vy*_this.vy);
    },
    __getter__direction :function _trc_APad___getter__direction() {
      "use strict";
      var _this=this;
      
      return _this.atanxy(_this.vx,_this.vy);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"__getter__defaultLayer":{"nowait":true},"draw":{"nowait":true},"findTouch":{"nowait":true},"loop":{"nowait":false},"__getter__speed":{"nowait":true},"__getter__direction":{"nowait":true}},"fields":{"auto":{},"vx":{},"vy":{},"outerRadius":{},"strokeStyle":{},"innerRadius":{},"keys":{},"leftKey":{},"rightKey":{},"upKey":{},"downKey":{},"keySpeed":{},"decay":{},"velocity":{},"ix":{},"iy":{},"touchRadius":{},"t":{},"d":{}}}
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
      
      //$LASTPOS=54000575;//kernel.Button:575
      while (true) {
        //$LASTPOS=54000594;//kernel.Button:594
        if (! _this.disabled) {
          //$LASTPOS=54000620;//kernel.Button:620
          _this.clicked=_this.checkTouch();
          //$LASTPOS=54000651;//kernel.Button:651
          if (_this.clicked==1) {
            //$LASTPOS=54000682;//kernel.Button:682
            Tonyu.classes.kernel.Button.last=_this;
            //$LASTPOS=54000713;//kernel.Button:713
            if (_this.onClick) {
              //$LASTPOS=54000726;//kernel.Button:726
              _this.onClick(_this);
            }
            
          }
          
        } else {
          //$LASTPOS=54000775;//kernel.Button:775
          _this.clicked=0;
          
        }
        //$LASTPOS=54000798;//kernel.Button:798
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
            //$LASTPOS=54000575;//kernel.Button:575
          case 1:
            //$LASTPOS=54000594;//kernel.Button:594
            if (!(! _this.disabled)) { __pc=3     ; break; }
            //$LASTPOS=54000620;//kernel.Button:620
            _this.fiber$checkTouch(_thread);
            __pc=2;return;
          case 2:
            _this.clicked=_thread.retVal;
            
            //$LASTPOS=54000651;//kernel.Button:651
            if (_this.clicked==1) {
              //$LASTPOS=54000682;//kernel.Button:682
              Tonyu.classes.kernel.Button.last=_this;
              //$LASTPOS=54000713;//kernel.Button:713
              if (_this.onClick) {
                //$LASTPOS=54000726;//kernel.Button:726
                _this.onClick(_this);
              }
              
            }
            __pc=4     ;break;
          case 3     :
            {
              //$LASTPOS=54000775;//kernel.Button:775
              _this.clicked=0;
            }
          case 4     :
            
            //$LASTPOS=54000798;//kernel.Button:798
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
      
      //$LASTPOS=54000121;//kernel.Button:121
      options.layer=options.layer||Tonyu.globals.$frontLayer;
      //$LASTPOS=54000168;//kernel.Button:168
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=54000189;//kernel.Button:189
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=54000235;//kernel.Button:235
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=54000274;//kernel.Button:274
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=54000315;//kernel.Button:315
      _this.disabledStrokeStyle=_this.disabledStrokeStyle||"#ddd";
      //$LASTPOS=54000369;//kernel.Button:369
      _this.alpha=typeof  (_this.alpha)=="number"?_this.alpha:255;
      //$LASTPOS=54000415;//kernel.Button:415
      _this.padding=typeof  (_this.padding)=="number"?_this.padding:5;
      //$LASTPOS=54000466;//kernel.Button:466
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=54000506;//kernel.Button:506
      _this.height=_this.height||50;
      //$LASTPOS=54000534;//kernel.Button:534
      _this.left=typeof  (_this.left)=="number"?_this.left:50;
    },
    checkTouch :function _trc_Button_checkTouch() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=54000833;//kernel.Button:833
      //$LASTPOS=54000838;//kernel.Button:838
      _this.i=0;for (; _this.i<2 ; _this.i++) {
        {
          //$LASTPOS=54000865;//kernel.Button:865
          if (Tonyu.globals.$touches[_this.i].touched>0&&_this.inRect(Tonyu.globals.$touches[_this.i])) {
            return Tonyu.globals.$touches[_this.i].touched;
            
          }
        }
      }
      //$LASTPOS=54000981;//kernel.Button:981
      if (_this.key) {
        return _this.getkey(_this.key);
      }
      return 0;
    },
    fiber$checkTouch :function _trc_Button_f_checkTouch(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=54000833;//kernel.Button:833
      //$LASTPOS=54000838;//kernel.Button:838
      _this.i=0;for (; _this.i<2 ; _this.i++) {
        {
          //$LASTPOS=54000865;//kernel.Button:865
          if (Tonyu.globals.$touches[_this.i].touched>0&&_this.inRect(Tonyu.globals.$touches[_this.i])) {
            _thread.retVal=Tonyu.globals.$touches[_this.i].touched;return;
            
            
          }
        }
      }
      //$LASTPOS=54000981;//kernel.Button:981
      if (_this.key) {
        _thread.retVal=_this.getkey(_this.key);return;
        
      }
      _thread.retVal=0;return;
      
      
      _thread.retVal=_this;return;
    },
    inRect :function _trc_Button_inRect(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=54001047;//kernel.Button:1047
      p=Tonyu.globals.$Screen.convert(p,_this.layer);
      return p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;
    },
    fiber$inRect :function _trc_Button_f_inRect(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=54001047;//kernel.Button:1047
      p=Tonyu.globals.$Screen.convert(p,_this.layer);
      _thread.retVal=p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Button_draw(c) {
      "use strict";
      var _this=this;
      var size;
      var f;
      var r;
      
      //$LASTPOS=54001168;//kernel.Button:1168
      c.globalAlpha=_this.alpha/255;
      //$LASTPOS=54001198;//kernel.Button:1198
      c.fillStyle=_this.fillStyle?_this.fillStyle+"":"gray";
      //$LASTPOS=54001250;//kernel.Button:1250
      c.strokeStyle=_this.strokeStyle?_this.strokeStyle+"":"black";
      //$LASTPOS=54001309;//kernel.Button:1309
      if (_this.disabled) {
        //$LASTPOS=54001323;//kernel.Button:1323
        c.strokeStyle=_this.disabledStrokeStyle+"";
      }
      //$LASTPOS=54001366;//kernel.Button:1366
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=54001409;//kernel.Button:1409
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=54001454;//kernel.Button:1454
      size = _this.height-_this.padding*2;
      
      //$LASTPOS=54001486;//kernel.Button:1486
      f = c.font.replace(/^[0-9]+px /,"");
      
      //$LASTPOS=54001530;//kernel.Button:1530
      c.font=size+"px "+f;
      //$LASTPOS=54001569;//kernel.Button:1569
      c.textBaseline="top";
      //$LASTPOS=54001596;//kernel.Button:1596
      c.fillStyle=_this.clicked?_this.clickedStyle+"":_this.disabled?_this.disabledStrokeStyle+"":_this.strokeStyle+"";
      //$LASTPOS=54001691;//kernel.Button:1691
      r = c.measureText(_this.text);
      
      //$LASTPOS=54001723;//kernel.Button:1723
      c.fillText(_this.text,_this.left+_this.width/2-r.width/2,_this.top+_this.padding);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"checkTouch":{"nowait":false},"inRect":{"nowait":false},"draw":{"nowait":true}},"fields":{"disabled":{},"clicked":{},"onClick":{},"strokeStyle":{},"clickedStyle":{},"disabledStrokeStyle":{},"padding":{},"left":{},"i":{},"key":{},"top":{}}}
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
      
      //$LASTPOS=55000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=55000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=55000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=55000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=55000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=55000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=55000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=55000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=55000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=55000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=55000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=55000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=55000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=55000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=55000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=55000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=55000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=55000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=55000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=55000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=55000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=55000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=55000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=55000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=55000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=55000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=55001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=55001049;//kernel.GameConsole:1049
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
      
      //$LASTPOS=55000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=55000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=55000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=55000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=55000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=55000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=55000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=55000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=55000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=55000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=55000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=55000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=55000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=55000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=55001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=55001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=55001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=55001159;//kernel.GameConsole:1159
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
      
      //$LASTPOS=56000049;//kernel.Label:49
      if (typeof  x=="object") {
        //$LASTPOS=56000084;//kernel.Label:84
        x.layer=x.layer||Tonyu.globals.$frontLayer;
        
      }
      //$LASTPOS=56000126;//kernel.Label:126
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=56000146;//kernel.Label:146
      if (x==null) {
        //$LASTPOS=56000159;//kernel.Label:159
        x=50;
      }
      //$LASTPOS=56000170;//kernel.Label:170
      if (y==null) {
        //$LASTPOS=56000183;//kernel.Label:183
        y=50;
      }
      //$LASTPOS=56000194;//kernel.Label:194
      if (typeof  _this.template!=="string"&&_this._text==null) {
        //$LASTPOS=56000252;//kernel.Label:252
        _this.text="text";
        
      }
    },
    __getter__text :function _trc_Label___getter__text() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56000289;//kernel.Label:289
      if (typeof  _this.template!=="string") {
        return _this._text;
      }
      return _this.template.replace(/[\$\@][A-Za-z0-9\.]* ?/g,(function anonymous_391(v) {
        
        //$LASTPOS=56000407;//kernel.Label:407
        v=v.replace(/ $/,"");
        //$LASTPOS=56000438;//kernel.Label:438
        if (v=="") {
          return "$";
        }
        //$LASTPOS=56000470;//kernel.Label:470
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
      
      //$LASTPOS=56000685;//kernel.Label:685
      while (flds.length>0) {
        //$LASTPOS=56000718;//kernel.Label:718
        if (! obj) {
          return "";
        }
        //$LASTPOS=56000748;//kernel.Label:748
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
            //$LASTPOS=56000685;//kernel.Label:685
          case 1:
            if (!(flds.length>0)) { __pc=3     ; break; }
            //$LASTPOS=56000718;//kernel.Label:718
            if (!(! obj)) { __pc=2     ; break; }
            _thread.exit("");return;
          case 2     :
            
            //$LASTPOS=56000748;//kernel.Label:748
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
      
      //$LASTPOS=56000814;//kernel.Label:814
      delete _this.template;
      //$LASTPOS=56000836;//kernel.Label:836
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
      
      //$LASTPOS=57000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=57000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=57000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=57000110;//kernel.MapEditor:110
      Tonyu.globals.$Boot.on("stop",(function anonymous_127(e) {
        
        //$LASTPOS=57000179;//kernel.MapEditor:179
        if (_this.modified) {
          //$LASTPOS=57000204;//kernel.MapEditor:204
          e.preventDefault();
          //$LASTPOS=57000233;//kernel.MapEditor:233
          _this.parallel(Tonyu.bindFunc(_this,_this.st),e);
          
        }
      }));
      //$LASTPOS=57000646;//kernel.MapEditor:646
      _this.print("map file(s)");
      //$LASTPOS=57000694;//kernel.MapEditor:694
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=57000722;//kernel.MapEditor:722
      if (_this.fileList.exists()) {
        //$LASTPOS=57000750;//kernel.MapEditor:750
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=57000844;//kernel.MapEditor:844
          _this.print(f.name());
          //$LASTPOS=57000900;//kernel.MapEditor:900
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=57000943;//kernel.MapEditor:943
      if (_this.fileExist) {
        //$LASTPOS=57000963;//kernel.MapEditor:963
        _this.print("Load Data?: Y or N");
        //$LASTPOS=57000997;//kernel.MapEditor:997
        while (true) {
          //$LASTPOS=57001019;//kernel.MapEditor:1019
          if (_this.getkey("y")>0) {
            //$LASTPOS=57001051;//kernel.MapEditor:1051
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=57001106;//kernel.MapEditor:1106
          if (_this.getkey("n")>0) {
            //$LASTPOS=57001138;//kernel.MapEditor:1138
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=57001194;//kernel.MapEditor:1194
          _this.update();
          
        }
        //$LASTPOS=57001216;//kernel.MapEditor:1216
        if (_this.loadMode) {
          //$LASTPOS=57001239;//kernel.MapEditor:1239
          _this.fileName=_this.prompt("Input json file (*.json)","map.json");
          //$LASTPOS=57001304;//kernel.MapEditor:1304
          if (_this.fileName) {
            //$LASTPOS=57001331;//kernel.MapEditor:1331
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=57001395;//kernel.MapEditor:1395
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=57001431;//kernel.MapEditor:1431
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=57001472;//kernel.MapEditor:1472
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=57001522;//kernel.MapEditor:1522
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=57001563;//kernel.MapEditor:1563
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=57001603;//kernel.MapEditor:1603
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=57001648;//kernel.MapEditor:1648
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=57001704;//kernel.MapEditor:1704
          if (_this.baseData==undefined) {
            //$LASTPOS=57001742;//kernel.MapEditor:1742
            _this.print("Load failed");
            //$LASTPOS=57001777;//kernel.MapEditor:1777
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=57001808;//kernel.MapEditor:1808
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=57001853;//kernel.MapEditor:1853
              _this.modified=false;
              //$LASTPOS=57001882;//kernel.MapEditor:1882
              _this.mapData=_this.baseData[0];
              //$LASTPOS=57001916;//kernel.MapEditor:1916
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=57001952;//kernel.MapEditor:1952
              if (_this.baseData.length>2) {
                //$LASTPOS=57001992;//kernel.MapEditor:1992
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=57002048;//kernel.MapEditor:2048
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=57002125;//kernel.MapEditor:2125
      _this.update();
      //$LASTPOS=57002170;//kernel.MapEditor:2170
      if (! _this.loadMode) {
        //$LASTPOS=57002190;//kernel.MapEditor:2190
        _this.row=_this.prompt("input row");
        //$LASTPOS=57002220;//kernel.MapEditor:2220
        _this.col=_this.prompt("input col");
        //$LASTPOS=57002250;//kernel.MapEditor:2250
        _this.chipWidth=_this.prompt("input chipWidth");
        //$LASTPOS=57002292;//kernel.MapEditor:2292
        _this.chipHeight=_this.prompt("input chipHeight");
        //$LASTPOS=57002336;//kernel.MapEditor:2336
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=57002401;//kernel.MapEditor:2401
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=57002432;//kernel.MapEditor:2432
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=57002464;//kernel.MapEditor:2464
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=57002497;//kernel.MapEditor:2497
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=57002548;//kernel.MapEditor:2548
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=57002859;//kernel.MapEditor:2859
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=57002906;//kernel.MapEditor:2906
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=57002932;//kernel.MapEditor:2932
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=57003028;//kernel.MapEditor:3028
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=57003059;//kernel.MapEditor:3059
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=57003091;//kernel.MapEditor:3091
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=57003124;//kernel.MapEditor:3124
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=57003191;//kernel.MapEditor:3191
      _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=57003234;//kernel.MapEditor:3234
      _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=57003278;//kernel.MapEditor:3278
      _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=57003317;//kernel.MapEditor:3317
      _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=57003357;//kernel.MapEditor:3357
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=57003439;//kernel.MapEditor:3439
      _this.counter=0;
      //$LASTPOS=57003451;//kernel.MapEditor:3451
      //$LASTPOS=57003455;//kernel.MapEditor:3455
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=57003484;//kernel.MapEditor:3484
          //$LASTPOS=57003488;//kernel.MapEditor:3488
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=57003521;//kernel.MapEditor:3521
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=57003565;//kernel.MapEditor:3565
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=57003589;//kernel.MapEditor:3589
      Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=57003669;//kernel.MapEditor:3669
      _this.mode="get";
      //$LASTPOS=57003682;//kernel.MapEditor:3682
      _this.prevMode="set";
      //$LASTPOS=57003699;//kernel.MapEditor:3699
      _this.mapp=0;
      //$LASTPOS=57003708;//kernel.MapEditor:3708
      _this.maponp=- 1;
      //$LASTPOS=57003720;//kernel.MapEditor:3720
      _this.mx=- 40;
      //$LASTPOS=57003729;//kernel.MapEditor:3729
      _this.my=- 40;
      //$LASTPOS=57003738;//kernel.MapEditor:3738
      _this.chipX=- 40;
      //$LASTPOS=57003750;//kernel.MapEditor:3750
      _this.chipY=- 40;
      //$LASTPOS=57003762;//kernel.MapEditor:3762
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=57003791;//kernel.MapEditor:3791
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=57003822;//kernel.MapEditor:3822
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=57003847;//kernel.MapEditor:3847
      _this.initialWidth=Tonyu.globals.$map.chipWidth;
      //$LASTPOS=57003877;//kernel.MapEditor:3877
      _this.initialHeight=Tonyu.globals.$map.chipHeight;
      //$LASTPOS=57003909;//kernel.MapEditor:3909
      _this.layers=["base","on","all"];
      //$LASTPOS=57003938;//kernel.MapEditor:3938
      _this.lc=0;
      //$LASTPOS=57003945;//kernel.MapEditor:3945
      _this.selectedLayer=_this.layers[_this.lc];
      //$LASTPOS=57003972;//kernel.MapEditor:3972
      _this.drawPanel();
      //$LASTPOS=57003986;//kernel.MapEditor:3986
      _this.drawLetter(_this.mode);
      //$LASTPOS=57004007;//kernel.MapEditor:4007
      while (true) {
        //$LASTPOS=57004025;//kernel.MapEditor:4025
        _this.p=_this.mapp;
        //$LASTPOS=57004038;//kernel.MapEditor:4038
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=57004157;//kernel.MapEditor:4157
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57004191;//kernel.MapEditor:4191
          _this.mode="erase";
          //$LASTPOS=57004246;//kernel.MapEditor:4246
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=57004276;//kernel.MapEditor:4276
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=57004395;//kernel.MapEditor:4395
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57004429;//kernel.MapEditor:4429
          _this.mode="set";
          //$LASTPOS=57004450;//kernel.MapEditor:4450
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=57004480;//kernel.MapEditor:4480
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=57004601;//kernel.MapEditor:4601
          _this.lc++;
          //$LASTPOS=57004616;//kernel.MapEditor:4616
          _this.selectedLayer=_this.layers[_this.lc%3];
          //$LASTPOS=57004653;//kernel.MapEditor:4653
          _this.drawPanel();
          //$LASTPOS=57004707;//kernel.MapEditor:4707
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=57004830;//kernel.MapEditor:4830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=57004951;//kernel.MapEditor:4951
          if (_this.mode!="get") {
            //$LASTPOS=57004981;//kernel.MapEditor:4981
            _this.prevMode=_this.mode;
            //$LASTPOS=57005009;//kernel.MapEditor:5009
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=57005045;//kernel.MapEditor:5045
            _this.mode="get";
            //$LASTPOS=57005070;//kernel.MapEditor:5070
            _this.chipX=- 40;
            //$LASTPOS=57005094;//kernel.MapEditor:5094
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=57005134;//kernel.MapEditor:5134
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57005172;//kernel.MapEditor:5172
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=57005239;//kernel.MapEditor:5239
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=57005269;//kernel.MapEditor:5269
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=57005405;//kernel.MapEditor:5405
          if (_this.loadedFile) {
            //$LASTPOS=57005434;//kernel.MapEditor:5434
            _this.saveFileName=_this.prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=57005522;//kernel.MapEditor:5522
            _this.saveFileName=_this.prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=57005616;//kernel.MapEditor:5616
          if (_this.saveFileName) {
            //$LASTPOS=57005647;//kernel.MapEditor:5647
            _this.save(_this.saveFileName);
            
          }
          
        }
        //$LASTPOS=57005947;//kernel.MapEditor:5947
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=57006068;//kernel.MapEditor:6068
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57006102;//kernel.MapEditor:6102
          _this.mode="copy";
          //$LASTPOS=57006156;//kernel.MapEditor:6156
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=57006186;//kernel.MapEditor:6186
        if (_this.mode!="get") {
          //$LASTPOS=57006212;//kernel.MapEditor:6212
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=57006318;//kernel.MapEditor:6318
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=57006336;//kernel.MapEditor:6336
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=57006467;//kernel.MapEditor:6467
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=57006485;//kernel.MapEditor:6485
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=57006598;//kernel.MapEditor:6598
            _this.my=_this.my-8;
          }
          //$LASTPOS=57006616;//kernel.MapEditor:6616
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=57006751;//kernel.MapEditor:6751
            _this.my=_this.my+8;
          }
          //$LASTPOS=57006769;//kernel.MapEditor:6769
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=57006812;//kernel.MapEditor:6812
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=57006918;//kernel.MapEditor:6918
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=57006942;//kernel.MapEditor:6942
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=57007073;//kernel.MapEditor:7073
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=57007097;//kernel.MapEditor:7097
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=57007210;//kernel.MapEditor:7210
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=57007234;//kernel.MapEditor:7234
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=57007369;//kernel.MapEditor:7369
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=57007393;//kernel.MapEditor:7393
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=57007462;//kernel.MapEditor:7462
        if (_this.getkey("i")==1) {
          //$LASTPOS=57007491;//kernel.MapEditor:7491
          if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
            //$LASTPOS=57007523;//kernel.MapEditor:7523
            Tonyu.globals.$map.chipWidth+=4;
          }
          //$LASTPOS=57007551;//kernel.MapEditor:7551
          if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
            //$LASTPOS=57007585;//kernel.MapEditor:7585
            Tonyu.globals.$map.chipHeight+=4;
          }
          //$LASTPOS=57007614;//kernel.MapEditor:7614
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=57007641;//kernel.MapEditor:7641
          _this.panel.die();
          //$LASTPOS=57007663;//kernel.MapEditor:7663
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=57007763;//kernel.MapEditor:7763
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=57007798;//kernel.MapEditor:7798
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=57007834;//kernel.MapEditor:7834
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=57007871;//kernel.MapEditor:7871
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=57007929;//kernel.MapEditor:7929
        if (_this.getkey("o")==1) {
          //$LASTPOS=57007958;//kernel.MapEditor:7958
          if (Tonyu.globals.$map.chipWidth>4) {
            //$LASTPOS=57007979;//kernel.MapEditor:7979
            Tonyu.globals.$map.chipWidth-=4;
          }
          //$LASTPOS=57008007;//kernel.MapEditor:8007
          if (Tonyu.globals.$map.chipHeight>4) {
            //$LASTPOS=57008029;//kernel.MapEditor:8029
            Tonyu.globals.$map.chipHeight-=4;
          }
          //$LASTPOS=57008058;//kernel.MapEditor:8058
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=57008085;//kernel.MapEditor:8085
          _this.panel.die();
          //$LASTPOS=57008107;//kernel.MapEditor:8107
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=57008207;//kernel.MapEditor:8207
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=57008242;//kernel.MapEditor:8242
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=57008278;//kernel.MapEditor:8278
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=57008315;//kernel.MapEditor:8315
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=57008399;//kernel.MapEditor:8399
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=57008430;//kernel.MapEditor:8430
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=57008462;//kernel.MapEditor:8462
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=57008515;//kernel.MapEditor:8515
          if (_this.selectedLayer=="base") {
            //$LASTPOS=57008555;//kernel.MapEditor:8555
            _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=57008611;//kernel.MapEditor:8611
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=57008664;//kernel.MapEditor:8664
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
            
          } else {
            //$LASTPOS=57008722;//kernel.MapEditor:8722
            if (_this.selectedLayer=="on") {
              //$LASTPOS=57008760;//kernel.MapEditor:8760
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=57008831;//kernel.MapEditor:8831
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=57008884;//kernel.MapEditor:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
              
            }
          }
          //$LASTPOS=57008948;//kernel.MapEditor:8948
          _this.modified=true;
          
        } else {
          //$LASTPOS=57008974;//kernel.MapEditor:8974
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=57009029;//kernel.MapEditor:9029
            if (_this.selectedLayer=="base") {
              //$LASTPOS=57009069;//kernel.MapEditor:9069
              _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=57009125;//kernel.MapEditor:9125
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
              //$LASTPOS=57009176;//kernel.MapEditor:9176
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
              
            } else {
              //$LASTPOS=57009234;//kernel.MapEditor:9234
              if (_this.selectedLayer=="on") {
                //$LASTPOS=57009272;//kernel.MapEditor:9272
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              } else {
                //$LASTPOS=57009341;//kernel.MapEditor:9341
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=57009392;//kernel.MapEditor:9392
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              }
            }
            //$LASTPOS=57009452;//kernel.MapEditor:9452
            _this.modified=true;
            
          } else {
            //$LASTPOS=57009478;//kernel.MapEditor:9478
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=57009531;//kernel.MapEditor:9531
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=57009611;//kernel.MapEditor:9611
              _this.mode="set";
              //$LASTPOS=57009632;//kernel.MapEditor:9632
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57009698;//kernel.MapEditor:9698
              _this.drawLetter(_this.mode);
              //$LASTPOS=57009725;//kernel.MapEditor:9725
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=57009750;//kernel.MapEditor:9750
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=57009805;//kernel.MapEditor:9805
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=57009856;//kernel.MapEditor:9856
                _this.modified=true;
                
              } else {
                //$LASTPOS=57009882;//kernel.MapEditor:9882
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=57009936;//kernel.MapEditor:9936
                  if (_this.selectedLayer=="base") {
                    //$LASTPOS=57009976;//kernel.MapEditor:9976
                    _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                    //$LASTPOS=57010029;//kernel.MapEditor:10029
                    _this.maponp=- 1;
                    
                  } else {
                    //$LASTPOS=57010055;//kernel.MapEditor:10055
                    if (_this.selectedLayer=="on") {
                      //$LASTPOS=57010093;//kernel.MapEditor:10093
                      _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    } else {
                      //$LASTPOS=57010164;//kernel.MapEditor:10164
                      _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      //$LASTPOS=57010217;//kernel.MapEditor:10217
                      _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    }
                  }
                  //$LASTPOS=57010334;//kernel.MapEditor:10334
                  _this.mode="set";
                  //$LASTPOS=57010387;//kernel.MapEditor:10387
                  _this.drawLetter(_this.mode);
                  //$LASTPOS=57010414;//kernel.MapEditor:10414
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=57010440;//kernel.MapEditor:10440
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=57000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=57000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=57000110;//kernel.MapEditor:110
      Tonyu.globals.$Boot.on("stop",(function anonymous_127(e) {
        
        //$LASTPOS=57000179;//kernel.MapEditor:179
        if (_this.modified) {
          //$LASTPOS=57000204;//kernel.MapEditor:204
          e.preventDefault();
          //$LASTPOS=57000233;//kernel.MapEditor:233
          _this.parallel(Tonyu.bindFunc(_this,_this.st),e);
          
        }
      }));
      //$LASTPOS=57000646;//kernel.MapEditor:646
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000694;//kernel.MapEditor:694
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=57000722;//kernel.MapEditor:722
            if (_this.fileList.exists()) {
              //$LASTPOS=57000750;//kernel.MapEditor:750
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=57000844;//kernel.MapEditor:844
                _this.print(f.name());
                //$LASTPOS=57000900;//kernel.MapEditor:900
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=57000943;//kernel.MapEditor:943
            if (!(_this.fileExist)) { __pc=12    ; break; }
            //$LASTPOS=57000963;//kernel.MapEditor:963
            _this.print("Load Data?: Y or N");
            //$LASTPOS=57000997;//kernel.MapEditor:997
          case 2:
            //$LASTPOS=57001019;//kernel.MapEditor:1019
            if (!(_this.getkey("y")>0)) { __pc=3     ; break; }
            //$LASTPOS=57001051;//kernel.MapEditor:1051
            _this.loadMode=true;
            __pc=6     ; break;
            
          case 3     :
            
            //$LASTPOS=57001106;//kernel.MapEditor:1106
            if (!(_this.getkey("n")>0)) { __pc=4     ; break; }
            //$LASTPOS=57001138;//kernel.MapEditor:1138
            _this.loadMode=false;
            __pc=6     ; break;
            
          case 4     :
            
            //$LASTPOS=57001194;//kernel.MapEditor:1194
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6     :
            
            //$LASTPOS=57001216;//kernel.MapEditor:1216
            if (!(_this.loadMode)) { __pc=11    ; break; }
            //$LASTPOS=57001239;//kernel.MapEditor:1239
            _this.fiber$prompt(_thread, "Input json file (*.json)", "map.json");
            __pc=7;return;
          case 7:
            _this.fileName=_thread.retVal;
            
            //$LASTPOS=57001304;//kernel.MapEditor:1304
            if (_this.fileName) {
              //$LASTPOS=57001331;//kernel.MapEditor:1331
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=57001395;//kernel.MapEditor:1395
            if (!(_this.mapDataFile.obj())) { __pc=8     ; break; }
            {
              //$LASTPOS=57001431;//kernel.MapEditor:1431
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=57001472;//kernel.MapEditor:1472
              _this.loadedFile=_this.fileName;
            }
            __pc=10    ;break;
          case 8     :
            //$LASTPOS=57001522;//kernel.MapEditor:1522
            _this.fiber$file(_thread, _this.fileName);
            __pc=9;return;
          case 9:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=57001563;//kernel.MapEditor:1563
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=57001603;//kernel.MapEditor:1603
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=57001648;//kernel.MapEditor:1648
              _this.loadedFile=_this.fileName;
              
            }
          case 10    :
            
            //$LASTPOS=57001704;//kernel.MapEditor:1704
            if (_this.baseData==undefined) {
              //$LASTPOS=57001742;//kernel.MapEditor:1742
              _this.print("Load failed");
              //$LASTPOS=57001777;//kernel.MapEditor:1777
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=57001808;//kernel.MapEditor:1808
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=57001853;//kernel.MapEditor:1853
                _this.modified=false;
                //$LASTPOS=57001882;//kernel.MapEditor:1882
                _this.mapData=_this.baseData[0];
                //$LASTPOS=57001916;//kernel.MapEditor:1916
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=57001952;//kernel.MapEditor:1952
                if (_this.baseData.length>2) {
                  //$LASTPOS=57001992;//kernel.MapEditor:1992
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=57002048;//kernel.MapEditor:2048
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 11    :
            
          case 12    :
            
            //$LASTPOS=57002125;//kernel.MapEditor:2125
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=57002170;//kernel.MapEditor:2170
            if (!(! _this.loadMode)) { __pc=18    ; break; }
            //$LASTPOS=57002190;//kernel.MapEditor:2190
            _this.fiber$prompt(_thread, "input row");
            __pc=14;return;
          case 14:
            _this.row=_thread.retVal;
            
            //$LASTPOS=57002220;//kernel.MapEditor:2220
            _this.fiber$prompt(_thread, "input col");
            __pc=15;return;
          case 15:
            _this.col=_thread.retVal;
            
            //$LASTPOS=57002250;//kernel.MapEditor:2250
            _this.fiber$prompt(_thread, "input chipWidth");
            __pc=16;return;
          case 16:
            _this.chipWidth=_thread.retVal;
            
            //$LASTPOS=57002292;//kernel.MapEditor:2292
            _this.fiber$prompt(_thread, "input chipHeight");
            __pc=17;return;
          case 17:
            _this.chipHeight=_thread.retVal;
            
            //$LASTPOS=57002336;//kernel.MapEditor:2336
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=57002401;//kernel.MapEditor:2401
            _this.panel.x=_this.panel.width/2+40;
            //$LASTPOS=57002432;//kernel.MapEditor:2432
            _this.panel.y=_this.panel.height/2+40;
            //$LASTPOS=57002464;//kernel.MapEditor:2464
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=57002497;//kernel.MapEditor:2497
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=57002548;//kernel.MapEditor:2548
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
            __pc=19    ;break;
          case 18    :
            {
              //$LASTPOS=57002859;//kernel.MapEditor:2859
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=57002906;//kernel.MapEditor:2906
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=57002932;//kernel.MapEditor:2932
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=57003028;//kernel.MapEditor:3028
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=57003059;//kernel.MapEditor:3059
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=57003091;//kernel.MapEditor:3091
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=57003124;//kernel.MapEditor:3124
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 19    :
            
            //$LASTPOS=57003191;//kernel.MapEditor:3191
            _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=57003234;//kernel.MapEditor:3234
            _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=57003278;//kernel.MapEditor:3278
            _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=57003317;//kernel.MapEditor:3317
            _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=57003357;//kernel.MapEditor:3357
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=57003439;//kernel.MapEditor:3439
            _this.counter=0;
            //$LASTPOS=57003451;//kernel.MapEditor:3451
            //$LASTPOS=57003455;//kernel.MapEditor:3455
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=57003484;//kernel.MapEditor:3484
                //$LASTPOS=57003488;//kernel.MapEditor:3488
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=57003521;//kernel.MapEditor:3521
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=57003565;//kernel.MapEditor:3565
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=57003589;//kernel.MapEditor:3589
            Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=57003669;//kernel.MapEditor:3669
            _this.mode="get";
            //$LASTPOS=57003682;//kernel.MapEditor:3682
            _this.prevMode="set";
            //$LASTPOS=57003699;//kernel.MapEditor:3699
            _this.mapp=0;
            //$LASTPOS=57003708;//kernel.MapEditor:3708
            _this.maponp=- 1;
            //$LASTPOS=57003720;//kernel.MapEditor:3720
            _this.mx=- 40;
            //$LASTPOS=57003729;//kernel.MapEditor:3729
            _this.my=- 40;
            //$LASTPOS=57003738;//kernel.MapEditor:3738
            _this.chipX=- 40;
            //$LASTPOS=57003750;//kernel.MapEditor:3750
            _this.chipY=- 40;
            //$LASTPOS=57003762;//kernel.MapEditor:3762
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=57003791;//kernel.MapEditor:3791
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=57003822;//kernel.MapEditor:3822
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=57003847;//kernel.MapEditor:3847
            _this.initialWidth=Tonyu.globals.$map.chipWidth;
            //$LASTPOS=57003877;//kernel.MapEditor:3877
            _this.initialHeight=Tonyu.globals.$map.chipHeight;
            //$LASTPOS=57003909;//kernel.MapEditor:3909
            _this.layers=["base","on","all"];
            //$LASTPOS=57003938;//kernel.MapEditor:3938
            _this.lc=0;
            //$LASTPOS=57003945;//kernel.MapEditor:3945
            _this.selectedLayer=_this.layers[_this.lc];
            //$LASTPOS=57003972;//kernel.MapEditor:3972
            _this.fiber$drawPanel(_thread);
            __pc=20;return;
          case 20:
            
            //$LASTPOS=57003986;//kernel.MapEditor:3986
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=21;return;
          case 21:
            
            //$LASTPOS=57004007;//kernel.MapEditor:4007
          case 22:
            //$LASTPOS=57004025;//kernel.MapEditor:4025
            _this.p=_this.mapp;
            //$LASTPOS=57004038;//kernel.MapEditor:4038
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=24    ; break; }
            //$LASTPOS=57004157;//kernel.MapEditor:4157
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57004191;//kernel.MapEditor:4191
            _this.mode="erase";
            //$LASTPOS=57004246;//kernel.MapEditor:4246
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=23;return;
          case 23:
            
          case 24    :
            
            //$LASTPOS=57004276;//kernel.MapEditor:4276
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=26    ; break; }
            //$LASTPOS=57004395;//kernel.MapEditor:4395
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57004429;//kernel.MapEditor:4429
            _this.mode="set";
            //$LASTPOS=57004450;//kernel.MapEditor:4450
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=25;return;
          case 25:
            
          case 26    :
            
            //$LASTPOS=57004480;//kernel.MapEditor:4480
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=29    ; break; }
            //$LASTPOS=57004601;//kernel.MapEditor:4601
            _this.lc++;
            //$LASTPOS=57004616;//kernel.MapEditor:4616
            _this.selectedLayer=_this.layers[_this.lc%3];
            //$LASTPOS=57004653;//kernel.MapEditor:4653
            _this.fiber$drawPanel(_thread);
            __pc=27;return;
          case 27:
            
            //$LASTPOS=57004707;//kernel.MapEditor:4707
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=28;return;
          case 28:
            
          case 29    :
            
            //$LASTPOS=57004830;//kernel.MapEditor:4830
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=31    ; break; }
            //$LASTPOS=57004951;//kernel.MapEditor:4951
            if (_this.mode!="get") {
              //$LASTPOS=57004981;//kernel.MapEditor:4981
              _this.prevMode=_this.mode;
              //$LASTPOS=57005009;//kernel.MapEditor:5009
              Tonyu.globals.$mp.scrollTo(- 40,- 40);
              //$LASTPOS=57005045;//kernel.MapEditor:5045
              _this.mode="get";
              //$LASTPOS=57005070;//kernel.MapEditor:5070
              _this.chipX=- 40;
              //$LASTPOS=57005094;//kernel.MapEditor:5094
              _this.chipY=- 40;
              
            } else {
              //$LASTPOS=57005134;//kernel.MapEditor:5134
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57005172;//kernel.MapEditor:5172
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=57005239;//kernel.MapEditor:5239
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=30;return;
          case 30:
            
          case 31    :
            
            //$LASTPOS=57005269;//kernel.MapEditor:5269
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=38    ; break; }
            //$LASTPOS=57005405;//kernel.MapEditor:5405
            if (!(_this.loadedFile)) { __pc=33    ; break; }
            //$LASTPOS=57005434;//kernel.MapEditor:5434
            _this.fiber$prompt(_thread, "input json file(*.json)", _this.loadedFile);
            __pc=32;return;
          case 32:
            _this.saveFileName=_thread.retVal;
            
            __pc=35    ;break;
          case 33    :
            //$LASTPOS=57005522;//kernel.MapEditor:5522
            _this.fiber$prompt(_thread, "input json file(*.json)", "map.json");
            __pc=34;return;
          case 34:
            _this.saveFileName=_thread.retVal;
            
          case 35    :
            
            //$LASTPOS=57005616;//kernel.MapEditor:5616
            if (!(_this.saveFileName)) { __pc=37    ; break; }
            //$LASTPOS=57005647;//kernel.MapEditor:5647
            _this.fiber$save(_thread, _this.saveFileName);
            __pc=36;return;
          case 36:
            
          case 37    :
            
          case 38    :
            
            //$LASTPOS=57005947;//kernel.MapEditor:5947
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=40    ; break; }
            //$LASTPOS=57006068;//kernel.MapEditor:6068
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57006102;//kernel.MapEditor:6102
            _this.mode="copy";
            //$LASTPOS=57006156;//kernel.MapEditor:6156
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=39;return;
          case 39:
            
          case 40    :
            
            //$LASTPOS=57006186;//kernel.MapEditor:6186
            if (_this.mode!="get") {
              //$LASTPOS=57006212;//kernel.MapEditor:6212
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=57006318;//kernel.MapEditor:6318
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=57006336;//kernel.MapEditor:6336
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=57006467;//kernel.MapEditor:6467
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=57006485;//kernel.MapEditor:6485
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=57006598;//kernel.MapEditor:6598
                _this.my=_this.my-8;
              }
              //$LASTPOS=57006616;//kernel.MapEditor:6616
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=57006751;//kernel.MapEditor:6751
                _this.my=_this.my+8;
              }
              //$LASTPOS=57006769;//kernel.MapEditor:6769
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=57006812;//kernel.MapEditor:6812
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=57006918;//kernel.MapEditor:6918
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=57006942;//kernel.MapEditor:6942
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=57007073;//kernel.MapEditor:7073
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=57007097;//kernel.MapEditor:7097
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=57007210;//kernel.MapEditor:7210
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=57007234;//kernel.MapEditor:7234
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=57007369;//kernel.MapEditor:7369
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=57007393;//kernel.MapEditor:7393
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=57007462;//kernel.MapEditor:7462
            if (_this.getkey("i")==1) {
              //$LASTPOS=57007491;//kernel.MapEditor:7491
              if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
                //$LASTPOS=57007523;//kernel.MapEditor:7523
                Tonyu.globals.$map.chipWidth+=4;
              }
              //$LASTPOS=57007551;//kernel.MapEditor:7551
              if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
                //$LASTPOS=57007585;//kernel.MapEditor:7585
                Tonyu.globals.$map.chipHeight+=4;
              }
              //$LASTPOS=57007614;//kernel.MapEditor:7614
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=57007641;//kernel.MapEditor:7641
              _this.panel.die();
              //$LASTPOS=57007663;//kernel.MapEditor:7663
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=57007763;//kernel.MapEditor:7763
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=57007798;//kernel.MapEditor:7798
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=57007834;//kernel.MapEditor:7834
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=57007871;//kernel.MapEditor:7871
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=57007929;//kernel.MapEditor:7929
            if (_this.getkey("o")==1) {
              //$LASTPOS=57007958;//kernel.MapEditor:7958
              if (Tonyu.globals.$map.chipWidth>4) {
                //$LASTPOS=57007979;//kernel.MapEditor:7979
                Tonyu.globals.$map.chipWidth-=4;
              }
              //$LASTPOS=57008007;//kernel.MapEditor:8007
              if (Tonyu.globals.$map.chipHeight>4) {
                //$LASTPOS=57008029;//kernel.MapEditor:8029
                Tonyu.globals.$map.chipHeight-=4;
              }
              //$LASTPOS=57008058;//kernel.MapEditor:8058
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=57008085;//kernel.MapEditor:8085
              _this.panel.die();
              //$LASTPOS=57008107;//kernel.MapEditor:8107
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=57008207;//kernel.MapEditor:8207
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=57008242;//kernel.MapEditor:8242
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=57008278;//kernel.MapEditor:8278
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=57008315;//kernel.MapEditor:8315
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=57008399;//kernel.MapEditor:8399
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=57008430;//kernel.MapEditor:8430
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=57008462;//kernel.MapEditor:8462
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=41    ; break; }
            {
              //$LASTPOS=57008515;//kernel.MapEditor:8515
              if (_this.selectedLayer=="base") {
                //$LASTPOS=57008555;//kernel.MapEditor:8555
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=57008611;//kernel.MapEditor:8611
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=57008664;//kernel.MapEditor:8664
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=57008722;//kernel.MapEditor:8722
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=57008760;//kernel.MapEditor:8760
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  
                } else {
                  //$LASTPOS=57008831;//kernel.MapEditor:8831
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  //$LASTPOS=57008884;//kernel.MapEditor:8884
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
                  
                }
              }
              //$LASTPOS=57008948;//kernel.MapEditor:8948
              _this.modified=true;
            }
            __pc=53    ;break;
          case 41    :
            //$LASTPOS=57008974;//kernel.MapEditor:8974
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=42    ; break; }
            {
              //$LASTPOS=57009029;//kernel.MapEditor:9029
              if (_this.selectedLayer=="base") {
                //$LASTPOS=57009069;//kernel.MapEditor:9069
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=57009125;//kernel.MapEditor:9125
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=57009176;//kernel.MapEditor:9176
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=57009234;//kernel.MapEditor:9234
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=57009272;//kernel.MapEditor:9272
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                } else {
                  //$LASTPOS=57009341;//kernel.MapEditor:9341
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  //$LASTPOS=57009392;//kernel.MapEditor:9392
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                }
              }
              //$LASTPOS=57009452;//kernel.MapEditor:9452
              _this.modified=true;
            }
            __pc=52    ;break;
          case 42    :
            //$LASTPOS=57009478;//kernel.MapEditor:9478
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=45    ; break; }
            //$LASTPOS=57009531;//kernel.MapEditor:9531
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=57009611;//kernel.MapEditor:9611
            _this.mode="set";
            //$LASTPOS=57009632;//kernel.MapEditor:9632
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57009698;//kernel.MapEditor:9698
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=43;return;
          case 43:
            
            //$LASTPOS=57009725;//kernel.MapEditor:9725
            _this.fiber$updateEx(_thread, 10);
            __pc=44;return;
          case 44:
            
            __pc=51    ;break;
          case 45    :
            //$LASTPOS=57009750;//kernel.MapEditor:9750
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=46    ; break; }
            {
              //$LASTPOS=57009805;//kernel.MapEditor:9805
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=57009856;//kernel.MapEditor:9856
              _this.modified=true;
            }
            __pc=50    ;break;
          case 46    :
            //$LASTPOS=57009882;//kernel.MapEditor:9882
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=49    ; break; }
            //$LASTPOS=57009936;//kernel.MapEditor:9936
            if (_this.selectedLayer=="base") {
              //$LASTPOS=57009976;//kernel.MapEditor:9976
              _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=57010029;//kernel.MapEditor:10029
              _this.maponp=- 1;
              
            } else {
              //$LASTPOS=57010055;//kernel.MapEditor:10055
              if (_this.selectedLayer=="on") {
                //$LASTPOS=57010093;//kernel.MapEditor:10093
                _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              } else {
                //$LASTPOS=57010164;//kernel.MapEditor:10164
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=57010217;//kernel.MapEditor:10217
                _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              }
            }
            //$LASTPOS=57010334;//kernel.MapEditor:10334
            _this.mode="set";
            //$LASTPOS=57010387;//kernel.MapEditor:10387
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=47;return;
          case 47:
            
            //$LASTPOS=57010414;//kernel.MapEditor:10414
            _this.fiber$updateEx(_thread, 10);
            __pc=48;return;
          case 48:
            
          case 49    :
            
          case 50    :
            
          case 51    :
            
          case 52    :
            
          case 53    :
            
            //$LASTPOS=57010440;//kernel.MapEditor:10440
            _this.fiber$update(_thread);
            __pc=54;return;
          case 54:
            
            __pc=22;break;
          case 55    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getCurFileName :function _trc_MapEditor_getCurFileName() {
      "use strict";
      var _this=this;
      
      return _this.saveFileName||_this.loadedFile;
    },
    fiber$getCurFileName :function _trc_MapEditor_f_getCurFileName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.saveFileName||_this.loadedFile;return;
      
      
      _thread.retVal=_this;return;
    },
    st :function _trc_MapEditor_st(e) {
      "use strict";
      var _this=this;
      var curFileName;
      var r;
      
      //$LASTPOS=57000337;//kernel.MapEditor:337
      curFileName = _this.getCurFileName()||"map.json";
      
      //$LASTPOS=57000388;//kernel.MapEditor:388
      r = _this.confirm("Save "+curFileName+"?");
      
      //$LASTPOS=57000433;//kernel.MapEditor:433
      if (r) {
        //$LASTPOS=57000451;//kernel.MapEditor:451
        _this.save(curFileName);
        //$LASTPOS=57000479;//kernel.MapEditor:479
        _this.update();
        //$LASTPOS=57000498;//kernel.MapEditor:498
        e.die();
        
      } else {
        //$LASTPOS=57000530;//kernel.MapEditor:530
        r=_this.confirm("Discard changes?");
        //$LASTPOS=57000570;//kernel.MapEditor:570
        if (r) {
          //$LASTPOS=57000592;//kernel.MapEditor:592
          _this.update();
          //$LASTPOS=57000615;//kernel.MapEditor:615
          e.die();
          
        }
        
      }
    },
    fiber$st :function _trc_MapEditor_f_st(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var curFileName;
      var r;
      
      //$LASTPOS=57000337;//kernel.MapEditor:337
      curFileName = _this.getCurFileName()||"map.json";
      
      
      _thread.enter(function _trc_MapEditor_ent_st(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000388;//kernel.MapEditor:388
            _this.fiber$confirm(_thread, "Save "+curFileName+"?");
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=57000433;//kernel.MapEditor:433
            if (!(r)) { __pc=4     ; break; }
            //$LASTPOS=57000451;//kernel.MapEditor:451
            _this.fiber$save(_thread, curFileName);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=57000479;//kernel.MapEditor:479
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=57000498;//kernel.MapEditor:498
            e.die();
            __pc=8     ;break;
          case 4     :
            //$LASTPOS=57000530;//kernel.MapEditor:530
            _this.fiber$confirm(_thread, "Discard changes?");
            __pc=5;return;
          case 5:
            r=_thread.retVal;
            
            //$LASTPOS=57000570;//kernel.MapEditor:570
            if (!(r)) { __pc=7     ; break; }
            //$LASTPOS=57000592;//kernel.MapEditor:592
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=57000615;//kernel.MapEditor:615
            e.die();
          case 7     :
            
          case 8     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    save :function _trc_MapEditor_save(fileName) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57010477;//kernel.MapEditor:10477
      _this.saveDataFile=_this.file("../maps/").rel(fileName);
      //$LASTPOS=57010527;//kernel.MapEditor:10527
      _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
      //$LASTPOS=57010601;//kernel.MapEditor:10601
      _this.saveDataFile.obj(_this.data);
      //$LASTPOS=57010630;//kernel.MapEditor:10630
      _this.modified=false;
      //$LASTPOS=57010651;//kernel.MapEditor:10651
      _this.print(fileName+" Saved");
    },
    fiber$save :function _trc_MapEditor_f_save(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57010477;//kernel.MapEditor:10477
      _this.saveDataFile=_this.file("../maps/").rel(fileName);
      //$LASTPOS=57010527;//kernel.MapEditor:10527
      _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
      //$LASTPOS=57010601;//kernel.MapEditor:10601
      _this.saveDataFile.obj(_this.data);
      //$LASTPOS=57010630;//kernel.MapEditor:10630
      _this.modified=false;
      //$LASTPOS=57010651;//kernel.MapEditor:10651
      _this.print(fileName+" Saved");
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=57010838;//kernel.MapEditor:10838
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=57010872;//kernel.MapEditor:10872
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=57010895;//kernel.MapEditor:10895
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=57010938;//kernel.MapEditor:10938
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=57010986;//kernel.MapEditor:10986
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=57011048;//kernel.MapEditor:11048
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=57011107;//kernel.MapEditor:11107
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=57011130;//kernel.MapEditor:11130
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=57011184;//kernel.MapEditor:11184
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011234;//kernel.MapEditor:11234
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011286;//kernel.MapEditor:11286
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011338;//kernel.MapEditor:11338
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011390;//kernel.MapEditor:11390
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=57011439;//kernel.MapEditor:11439
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=57011490;//kernel.MapEditor:11490
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=57011525;//kernel.MapEditor:11525
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011576;//kernel.MapEditor:11576
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011628;//kernel.MapEditor:11628
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011680;//kernel.MapEditor:11680
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011732;//kernel.MapEditor:11732
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=57011782;//kernel.MapEditor:11782
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=57011833;//kernel.MapEditor:11833
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=57011879;//kernel.MapEditor:11879
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=57011936;//kernel.MapEditor:11936
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=57012000;//kernel.MapEditor:12000
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=57012075;//kernel.MapEditor:12075
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=57012180;//kernel.MapEditor:12180
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012257;//kernel.MapEditor:12257
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=57012342;//kernel.MapEditor:12342
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012419;//kernel.MapEditor:12419
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012495;//kernel.MapEditor:12495
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=57012573;//kernel.MapEditor:12573
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57010838;//kernel.MapEditor:10838
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=57010872;//kernel.MapEditor:10872
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=57010895;//kernel.MapEditor:10895
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=57010938;//kernel.MapEditor:10938
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=57010986;//kernel.MapEditor:10986
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=57011048;//kernel.MapEditor:11048
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=57011107;//kernel.MapEditor:11107
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=57011130;//kernel.MapEditor:11130
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=57011184;//kernel.MapEditor:11184
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011234;//kernel.MapEditor:11234
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011286;//kernel.MapEditor:11286
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011338;//kernel.MapEditor:11338
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=57011390;//kernel.MapEditor:11390
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=57011439;//kernel.MapEditor:11439
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=57011490;//kernel.MapEditor:11490
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=57011525;//kernel.MapEditor:11525
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011576;//kernel.MapEditor:11576
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011628;//kernel.MapEditor:11628
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011680;//kernel.MapEditor:11680
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=57011732;//kernel.MapEditor:11732
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=57011782;//kernel.MapEditor:11782
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=57011833;//kernel.MapEditor:11833
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=57011879;//kernel.MapEditor:11879
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=57011936;//kernel.MapEditor:11936
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=57012000;//kernel.MapEditor:12000
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=57012075;//kernel.MapEditor:12075
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=57012180;//kernel.MapEditor:12180
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012257;//kernel.MapEditor:12257
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=57012342;//kernel.MapEditor:12342
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012419;//kernel.MapEditor:12419
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012495;//kernel.MapEditor:12495
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=57012573;//kernel.MapEditor:12573
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    drawLetter :function _trc_MapEditor_drawLetter(mode) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57012681;//kernel.MapEditor:12681
      if (mode=="set") {
        //$LASTPOS=57012697;//kernel.MapEditor:12697
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57012735;//kernel.MapEditor:12735
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012847;//kernel.MapEditor:12847
      if (mode=="get") {
        //$LASTPOS=57012863;//kernel.MapEditor:12863
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57012901;//kernel.MapEditor:12901
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57012936;//kernel.MapEditor:12936
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57013013;//kernel.MapEditor:13013
      if (mode=="erase") {
        //$LASTPOS=57013031;//kernel.MapEditor:13031
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57013069;//kernel.MapEditor:13069
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57013104;//kernel.MapEditor:13104
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=57013182;//kernel.MapEditor:13182
      if (mode=="copy") {
        //$LASTPOS=57013199;//kernel.MapEditor:13199
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57013237;//kernel.MapEditor:13237
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57013272;//kernel.MapEditor:13272
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=57013349;//kernel.MapEditor:13349
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=57013384;//kernel.MapEditor:13384
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=57013469;//kernel.MapEditor:13469
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
    },
    fiber$drawLetter :function _trc_MapEditor_f_drawLetter(_thread,mode) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57012681;//kernel.MapEditor:12681
      if (mode=="set") {
        //$LASTPOS=57012697;//kernel.MapEditor:12697
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57012735;//kernel.MapEditor:12735
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57012847;//kernel.MapEditor:12847
      if (mode=="get") {
        //$LASTPOS=57012863;//kernel.MapEditor:12863
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57012901;//kernel.MapEditor:12901
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57012936;//kernel.MapEditor:12936
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=57013013;//kernel.MapEditor:13013
      if (mode=="erase") {
        //$LASTPOS=57013031;//kernel.MapEditor:13031
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57013069;//kernel.MapEditor:13069
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57013104;//kernel.MapEditor:13104
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=57013182;//kernel.MapEditor:13182
      if (mode=="copy") {
        //$LASTPOS=57013199;//kernel.MapEditor:13199
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=57013237;//kernel.MapEditor:13237
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=57013272;//kernel.MapEditor:13272
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=57013349;//kernel.MapEditor:13349
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=57013384;//kernel.MapEditor:13384
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=57013469;//kernel.MapEditor:13469
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getCurFileName":{"nowait":false},"st":{"nowait":false},"save":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false},"drawLetter":{"nowait":false}},"fields":{"loadMode":{},"fileExist":{},"modified":{},"fileList":{},"fileName":{},"mapDataFile":{},"baseData":{},"loadedFile":{},"mapData":{},"mapOnData":{},"chipWidth":{},"chipHeight":{},"row":{},"col":{},"panel":{},"mIW":{},"mIH":{},"mCW":{},"mCH":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"maponp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"initialWidth":{},"initialHeight":{},"layers":{},"lc":{},"selectedLayer":{},"saveFileName":{},"tmpon":{},"saveDataFile":{},"data":{}}}
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
      
      //$LASTPOS=58000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=58000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=58000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=58000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=58000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=58000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=58000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=58000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=58000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=58000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=58000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=58000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=58000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=58000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=58000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=58000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=58000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=58000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=58000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=58000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=58000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=58000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=58000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=58000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=58001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=58001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=58001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=58001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=58001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=58001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=58001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=58001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=58001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=58001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=58001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=58001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=58001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=58001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=58001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=58001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=58001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=58001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=58001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=58001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=58001973;//kernel.MapEditorOLD:1973
      //$LASTPOS=58001977;//kernel.MapEditorOLD:1977
      _this.i = 0;
      for (; _this.i<16 ; _this.i++) {
        {
          //$LASTPOS=58002001;//kernel.MapEditorOLD:2001
          //$LASTPOS=58002005;//kernel.MapEditorOLD:2005
          _this.j = 0;
          for (; _this.j<8 ; _this.j++) {
            {
              //$LASTPOS=58002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=58002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=58002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=58002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=58002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=58002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=58002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=58002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=58002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=58002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=58002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=58002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=58002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=58002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=58002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=58002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=58002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=58002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=58002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=58002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=58002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=58002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=58002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=58002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=58002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=58002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=58002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=58002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=58002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=58002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=58002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=58003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=58003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=58003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=58003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=58003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=58003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=58003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=58003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=58003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=58003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=58003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=58003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=58004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=58004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=58004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=58004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=58004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=58004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=58004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=58004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=58004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=58004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=58004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=58004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=58004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=58004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=58004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=58004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=58004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=58004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=58004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=58004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=58004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=58004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=58004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=58004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=58004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=58004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=58004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=58004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=58004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=58004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=58005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=58005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=58005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=58005123;//kernel.MapEditorOLD:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=58000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=58000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=58000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=58000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2     ; break; }
            //$LASTPOS=58000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5     ; break;
            
          case 2     :
            
            //$LASTPOS=58000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3     ; break; }
            //$LASTPOS=58000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5     ; break;
            
          case 3     :
            
            //$LASTPOS=58000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5     :
            
            //$LASTPOS=58000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9     ; break; }
            //$LASTPOS=58000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=58000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=58000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=58000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6     ; break; }
            {
              //$LASTPOS=58000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8     ;break;
          case 6     :
            //$LASTPOS=58000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=58000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=58000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8     :
            
            //$LASTPOS=58000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=58000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=58000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=58000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=58000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=58000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9     :
            
            //$LASTPOS=58000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=58001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12    ; break; }
            //$LASTPOS=58001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=58001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=58001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=58001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=58001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=58001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=58001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=58001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=58001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13    ;break;
          case 12    :
            {
              //$LASTPOS=58001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=58001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=58001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=58001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=58001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=58001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=58001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=58001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13    :
            
            //$LASTPOS=58001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=58001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=58001973;//kernel.MapEditorOLD:1973
            //$LASTPOS=58001977;//kernel.MapEditorOLD:1977
            _this.i = 0;
            for (; _this.i<16 ; _this.i++) {
              {
                //$LASTPOS=58002001;//kernel.MapEditorOLD:2001
                //$LASTPOS=58002005;//kernel.MapEditorOLD:2005
                _this.j = 0;
                for (; _this.j<8 ; _this.j++) {
                  {
                    //$LASTPOS=58002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=58002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=58002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=58002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=58002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=58002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=58002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=58002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=58002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=58002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=58002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=58002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=58002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=58002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=58002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=58002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=58002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=58002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=58002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=58002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=58002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=58002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=58002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=58002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=58002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=58002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=58002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=58002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=58002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=58002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=58002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=58003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=58003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=58003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=58003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=58003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=58003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=58003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=58003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=58003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=58003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=58003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=58003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=58004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=58004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=58004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=58004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=58004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=58004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=58004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=58004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=58004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=58004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=58004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=58004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=58004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=58004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=58004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=58004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=58004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15    ; break; }
            {
              //$LASTPOS=58004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=58004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25    ;break;
          case 15    :
            //$LASTPOS=58004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16    ; break; }
            {
              //$LASTPOS=58004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24    ;break;
          case 16    :
            //$LASTPOS=58004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18    ; break; }
            //$LASTPOS=58004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=58004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=58004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=58004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=58004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23    ;break;
          case 18    :
            //$LASTPOS=58004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19    ; break; }
            {
              //$LASTPOS=58004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22    ;break;
          case 19    :
            //$LASTPOS=58004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21    ; break; }
            //$LASTPOS=58004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=58005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=58005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=58005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21    :
            
          case 22    :
            
          case 23    :
            
          case 24    :
            
          case 25    :
            
            //$LASTPOS=58005123;//kernel.MapEditorOLD:5123
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
      
      //$LASTPOS=59000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=59000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=59000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=59000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      //$LASTPOS=59000116;//kernel.MapEditorOLD2:116
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=59000144;//kernel.MapEditorOLD2:144
      if (_this.fileList.exists()) {
        //$LASTPOS=59000168;//kernel.MapEditorOLD2:168
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=59000207;//kernel.MapEditorOLD2:207
          f=f+"";
          //$LASTPOS=59000220;//kernel.MapEditorOLD2:220
          _this.fNames=f.split("/");
          //$LASTPOS=59000246;//kernel.MapEditorOLD2:246
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=59000283;//kernel.MapEditorOLD2:283
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=59000308;//kernel.MapEditorOLD2:308
      if (_this.fileExist) {
        //$LASTPOS=59000328;//kernel.MapEditorOLD2:328
        _this.print("Load Data?: Y or N");
        //$LASTPOS=59000362;//kernel.MapEditorOLD2:362
        while (true) {
          //$LASTPOS=59000384;//kernel.MapEditorOLD2:384
          if (_this.getkey("y")>0) {
            //$LASTPOS=59000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=59000471;//kernel.MapEditorOLD2:471
          if (_this.getkey("n")>0) {
            //$LASTPOS=59000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=59000559;//kernel.MapEditorOLD2:559
          _this.update();
          
        }
        //$LASTPOS=59000581;//kernel.MapEditorOLD2:581
        if (_this.loadMode) {
          //$LASTPOS=59000604;//kernel.MapEditorOLD2:604
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=59000669;//kernel.MapEditorOLD2:669
          if (_this.fileName) {
            //$LASTPOS=59000696;//kernel.MapEditorOLD2:696
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=59000760;//kernel.MapEditorOLD2:760
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=59000796;//kernel.MapEditorOLD2:796
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=59000837;//kernel.MapEditorOLD2:837
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=59000887;//kernel.MapEditorOLD2:887
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=59000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=59000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=59001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=59001069;//kernel.MapEditorOLD2:1069
          if (_this.baseData==undefined) {
            //$LASTPOS=59001107;//kernel.MapEditorOLD2:1107
            _this.print("Load failed");
            //$LASTPOS=59001142;//kernel.MapEditorOLD2:1142
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=59001173;//kernel.MapEditorOLD2:1173
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=59001218;//kernel.MapEditorOLD2:1218
              _this.mapData=_this.baseData[0];
              //$LASTPOS=59001252;//kernel.MapEditorOLD2:1252
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=59001288;//kernel.MapEditorOLD2:1288
              if (_this.baseData.length>2) {
                //$LASTPOS=59001328;//kernel.MapEditorOLD2:1328
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=59001384;//kernel.MapEditorOLD2:1384
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=59001461;//kernel.MapEditorOLD2:1461
      _this.update();
      //$LASTPOS=59001739;//kernel.MapEditorOLD2:1739
      if (! _this.loadMode) {
        //$LASTPOS=59001759;//kernel.MapEditorOLD2:1759
        _this.row=prompt("input row");
        //$LASTPOS=59001789;//kernel.MapEditorOLD2:1789
        _this.col=prompt("input col");
        //$LASTPOS=59001819;//kernel.MapEditorOLD2:1819
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=59001861;//kernel.MapEditorOLD2:1861
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=59001905;//kernel.MapEditorOLD2:1905
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=59001970;//kernel.MapEditorOLD2:1970
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=59002001;//kernel.MapEditorOLD2:2001
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=59002033;//kernel.MapEditorOLD2:2033
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=59002066;//kernel.MapEditorOLD2:2066
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=59002117;//kernel.MapEditorOLD2:2117
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=59002428;//kernel.MapEditorOLD2:2428
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=59002475;//kernel.MapEditorOLD2:2475
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=59002501;//kernel.MapEditorOLD2:2501
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=59002597;//kernel.MapEditorOLD2:2597
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=59002628;//kernel.MapEditorOLD2:2628
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=59002660;//kernel.MapEditorOLD2:2660
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=59002693;//kernel.MapEditorOLD2:2693
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=59002743;//kernel.MapEditorOLD2:2743
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=59002799;//kernel.MapEditorOLD2:2799
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=59002856;//kernel.MapEditorOLD2:2856
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=59002908;//kernel.MapEditorOLD2:2908
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=59002961;//kernel.MapEditorOLD2:2961
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=59003043;//kernel.MapEditorOLD2:3043
      _this.counter=0;
      //$LASTPOS=59003055;//kernel.MapEditorOLD2:3055
      //$LASTPOS=59003059;//kernel.MapEditorOLD2:3059
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=59003088;//kernel.MapEditorOLD2:3088
          //$LASTPOS=59003092;//kernel.MapEditorOLD2:3092
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=59003125;//kernel.MapEditorOLD2:3125
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=59003169;//kernel.MapEditorOLD2:3169
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=59003191;//kernel.MapEditorOLD2:3191
      _this.drawPanel();
      //$LASTPOS=59003205;//kernel.MapEditorOLD2:3205
      _this.mode="get";
      //$LASTPOS=59003218;//kernel.MapEditorOLD2:3218
      _this.prevMode="set";
      //$LASTPOS=59003235;//kernel.MapEditorOLD2:3235
      _this.mapp=0;
      //$LASTPOS=59003244;//kernel.MapEditorOLD2:3244
      _this.mx=- 40;
      //$LASTPOS=59003253;//kernel.MapEditorOLD2:3253
      _this.my=- 40;
      //$LASTPOS=59003262;//kernel.MapEditorOLD2:3262
      _this.chipX=- 40;
      //$LASTPOS=59003274;//kernel.MapEditorOLD2:3274
      _this.chipY=- 40;
      //$LASTPOS=59003286;//kernel.MapEditorOLD2:3286
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=59003315;//kernel.MapEditorOLD2:3315
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=59003346;//kernel.MapEditorOLD2:3346
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=59003369;//kernel.MapEditorOLD2:3369
      while (true) {
        //$LASTPOS=59003387;//kernel.MapEditorOLD2:3387
        _this.p=_this.mapp;
        //$LASTPOS=59003400;//kernel.MapEditorOLD2:3400
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=59003539;//kernel.MapEditorOLD2:3539
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=59003573;//kernel.MapEditorOLD2:3573
          _this.mode="erase";
          //$LASTPOS=59003596;//kernel.MapEditorOLD2:3596
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=59003629;//kernel.MapEditorOLD2:3629
        if (_this.getkey("s")==1) {
          //$LASTPOS=59003658;//kernel.MapEditorOLD2:3658
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=59003692;//kernel.MapEditorOLD2:3692
          if (_this.mode=="set") {
            //$LASTPOS=59003722;//kernel.MapEditorOLD2:3722
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=59003765;//kernel.MapEditorOLD2:3765
            _this.mode="set";
            
          }
          //$LASTPOS=59003797;//kernel.MapEditorOLD2:3797
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=59003830;//kernel.MapEditorOLD2:3830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=59003949;//kernel.MapEditorOLD2:3949
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=59003983;//kernel.MapEditorOLD2:3983
          _this.mode="set";
          //$LASTPOS=59004004;//kernel.MapEditorOLD2:4004
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=59004037;//kernel.MapEditorOLD2:4037
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=59004158;//kernel.MapEditorOLD2:4158
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=59004192;//kernel.MapEditorOLD2:4192
          _this.mode="setOn";
          //$LASTPOS=59004215;//kernel.MapEditorOLD2:4215
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=59004341;//kernel.MapEditorOLD2:4341
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=59004482;//kernel.MapEditorOLD2:4482
          if (_this.mode!="get") {
            //$LASTPOS=59004512;//kernel.MapEditorOLD2:4512
            _this.prevMode=_this.mode;
            //$LASTPOS=59004540;//kernel.MapEditorOLD2:4540
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=59004576;//kernel.MapEditorOLD2:4576
            _this.mode="get";
            //$LASTPOS=59004601;//kernel.MapEditorOLD2:4601
            _this.chipX=- 40;
            //$LASTPOS=59004625;//kernel.MapEditorOLD2:4625
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=59004665;//kernel.MapEditorOLD2:4665
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=59004703;//kernel.MapEditorOLD2:4703
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=59004738;//kernel.MapEditorOLD2:4738
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=59004771;//kernel.MapEditorOLD2:4771
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=59004927;//kernel.MapEditorOLD2:4927
          if (_this.loadedFile) {
            //$LASTPOS=59004956;//kernel.MapEditorOLD2:4956
            _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=59005044;//kernel.MapEditorOLD2:5044
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=59005544;//kernel.MapEditorOLD2:5544
          if (_this.saveFileName) {
            //$LASTPOS=59005575;//kernel.MapEditorOLD2:5575
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=59005637;//kernel.MapEditorOLD2:5637
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=59005799;//kernel.MapEditorOLD2:5799
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=59005836;//kernel.MapEditorOLD2:5836
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=59005943;//kernel.MapEditorOLD2:5943
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=59006084;//kernel.MapEditorOLD2:6084
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=59006118;//kernel.MapEditorOLD2:6118
          _this.mode="copy";
          //$LASTPOS=59006140;//kernel.MapEditorOLD2:6140
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=59006173;//kernel.MapEditorOLD2:6173
        if (_this.mode!="get") {
          //$LASTPOS=59006199;//kernel.MapEditorOLD2:6199
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=59006305;//kernel.MapEditorOLD2:6305
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=59006323;//kernel.MapEditorOLD2:6323
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=59006454;//kernel.MapEditorOLD2:6454
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=59006472;//kernel.MapEditorOLD2:6472
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=59006585;//kernel.MapEditorOLD2:6585
            _this.my=_this.my+8;
          }
          //$LASTPOS=59006603;//kernel.MapEditorOLD2:6603
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=59006738;//kernel.MapEditorOLD2:6738
            _this.my=_this.my-8;
          }
          //$LASTPOS=59006756;//kernel.MapEditorOLD2:6756
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=59006799;//kernel.MapEditorOLD2:6799
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=59006905;//kernel.MapEditorOLD2:6905
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=59006929;//kernel.MapEditorOLD2:6929
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=59007060;//kernel.MapEditorOLD2:7060
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=59007084;//kernel.MapEditorOLD2:7084
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=59007197;//kernel.MapEditorOLD2:7197
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=59007221;//kernel.MapEditorOLD2:7221
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=59007356;//kernel.MapEditorOLD2:7356
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=59007380;//kernel.MapEditorOLD2:7380
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=59007453;//kernel.MapEditorOLD2:7453
        if (_this.getkey("i")==1) {
          //$LASTPOS=59007482;//kernel.MapEditorOLD2:7482
          Tonyu.globals.$map.chipWidth+=4;
          //$LASTPOS=59007510;//kernel.MapEditorOLD2:7510
          Tonyu.globals.$map.chipHeight+=4;
          //$LASTPOS=59007539;//kernel.MapEditorOLD2:7539
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=59007566;//kernel.MapEditorOLD2:7566
          _this.panel.die();
          //$LASTPOS=59007588;//kernel.MapEditorOLD2:7588
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=59007688;//kernel.MapEditorOLD2:7688
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=59007723;//kernel.MapEditorOLD2:7723
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=59007759;//kernel.MapEditorOLD2:7759
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=59007796;//kernel.MapEditorOLD2:7796
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=59007854;//kernel.MapEditorOLD2:7854
        if (_this.getkey("o")==1) {
          //$LASTPOS=59007883;//kernel.MapEditorOLD2:7883
          Tonyu.globals.$map.chipWidth-=4;
          //$LASTPOS=59007911;//kernel.MapEditorOLD2:7911
          Tonyu.globals.$map.chipHeight-=4;
          //$LASTPOS=59007940;//kernel.MapEditorOLD2:7940
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=59007967;//kernel.MapEditorOLD2:7967
          _this.panel.die();
          //$LASTPOS=59007989;//kernel.MapEditorOLD2:7989
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=59008089;//kernel.MapEditorOLD2:8089
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=59008124;//kernel.MapEditorOLD2:8124
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=59008160;//kernel.MapEditorOLD2:8160
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=59008197;//kernel.MapEditorOLD2:8197
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=59008289;//kernel.MapEditorOLD2:8289
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=59008320;//kernel.MapEditorOLD2:8320
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=59008352;//kernel.MapEditorOLD2:8352
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=59008405;//kernel.MapEditorOLD2:8405
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=59008454;//kernel.MapEditorOLD2:8454
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=59008505;//kernel.MapEditorOLD2:8505
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=59008560;//kernel.MapEditorOLD2:8560
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=59008609;//kernel.MapEditorOLD2:8609
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=59008662;//kernel.MapEditorOLD2:8662
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=59008716;//kernel.MapEditorOLD2:8716
              _this.mode=_this.prevMode;
              //$LASTPOS=59008740;//kernel.MapEditorOLD2:8740
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=59008774;//kernel.MapEditorOLD2:8774
              _this.print(_this.mode+" mode");
              //$LASTPOS=59008804;//kernel.MapEditorOLD2:8804
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=59008829;//kernel.MapEditorOLD2:8829
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=59008884;//kernel.MapEditorOLD2:8884
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=59008937;//kernel.MapEditorOLD2:8937
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=59008991;//kernel.MapEditorOLD2:8991
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=59009040;//kernel.MapEditorOLD2:9040
                  _this.mode="set";
                  //$LASTPOS=59009061;//kernel.MapEditorOLD2:9061
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=59009091;//kernel.MapEditorOLD2:9091
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=59009117;//kernel.MapEditorOLD2:9117
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=59000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=59000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=59000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=59000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditorOLD2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=59000116;//kernel.MapEditorOLD2:116
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=59000144;//kernel.MapEditorOLD2:144
            if (_this.fileList.exists()) {
              //$LASTPOS=59000168;//kernel.MapEditorOLD2:168
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=59000207;//kernel.MapEditorOLD2:207
                f=f+"";
                //$LASTPOS=59000220;//kernel.MapEditorOLD2:220
                _this.fNames=f.split("/");
                //$LASTPOS=59000246;//kernel.MapEditorOLD2:246
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=59000283;//kernel.MapEditorOLD2:283
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=59000308;//kernel.MapEditorOLD2:308
            if (!(_this.fileExist)) { __pc=11    ; break; }
            //$LASTPOS=59000328;//kernel.MapEditorOLD2:328
            _this.print("Load Data?: Y or N");
            //$LASTPOS=59000362;//kernel.MapEditorOLD2:362
          case 2:
            //$LASTPOS=59000384;//kernel.MapEditorOLD2:384
            if (!(_this.getkey("y")>0)) { __pc=3     ; break; }
            //$LASTPOS=59000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            __pc=6     ; break;
            
          case 3     :
            
            //$LASTPOS=59000471;//kernel.MapEditorOLD2:471
            if (!(_this.getkey("n")>0)) { __pc=4     ; break; }
            //$LASTPOS=59000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            __pc=6     ; break;
            
          case 4     :
            
            //$LASTPOS=59000559;//kernel.MapEditorOLD2:559
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6     :
            
            //$LASTPOS=59000581;//kernel.MapEditorOLD2:581
            if (!(_this.loadMode)) { __pc=10    ; break; }
            //$LASTPOS=59000604;//kernel.MapEditorOLD2:604
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=59000669;//kernel.MapEditorOLD2:669
            if (_this.fileName) {
              //$LASTPOS=59000696;//kernel.MapEditorOLD2:696
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=59000760;//kernel.MapEditorOLD2:760
            if (!(_this.mapDataFile.obj())) { __pc=7     ; break; }
            {
              //$LASTPOS=59000796;//kernel.MapEditorOLD2:796
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=59000837;//kernel.MapEditorOLD2:837
              _this.loadedFile=_this.fileName;
            }
            __pc=9     ;break;
          case 7     :
            //$LASTPOS=59000887;//kernel.MapEditorOLD2:887
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=59000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=59000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=59001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
          case 9     :
            
            //$LASTPOS=59001069;//kernel.MapEditorOLD2:1069
            if (_this.baseData==undefined) {
              //$LASTPOS=59001107;//kernel.MapEditorOLD2:1107
              _this.print("Load failed");
              //$LASTPOS=59001142;//kernel.MapEditorOLD2:1142
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=59001173;//kernel.MapEditorOLD2:1173
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=59001218;//kernel.MapEditorOLD2:1218
                _this.mapData=_this.baseData[0];
                //$LASTPOS=59001252;//kernel.MapEditorOLD2:1252
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=59001288;//kernel.MapEditorOLD2:1288
                if (_this.baseData.length>2) {
                  //$LASTPOS=59001328;//kernel.MapEditorOLD2:1328
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=59001384;//kernel.MapEditorOLD2:1384
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10    :
            
          case 11    :
            
            //$LASTPOS=59001461;//kernel.MapEditorOLD2:1461
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=59001739;//kernel.MapEditorOLD2:1739
            if (! _this.loadMode) {
              //$LASTPOS=59001759;//kernel.MapEditorOLD2:1759
              _this.row=prompt("input row");
              //$LASTPOS=59001789;//kernel.MapEditorOLD2:1789
              _this.col=prompt("input col");
              //$LASTPOS=59001819;//kernel.MapEditorOLD2:1819
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=59001861;//kernel.MapEditorOLD2:1861
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=59001905;//kernel.MapEditorOLD2:1905
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=59001970;//kernel.MapEditorOLD2:1970
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=59002001;//kernel.MapEditorOLD2:2001
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=59002033;//kernel.MapEditorOLD2:2033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=59002066;//kernel.MapEditorOLD2:2066
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=59002117;//kernel.MapEditorOLD2:2117
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=59002428;//kernel.MapEditorOLD2:2428
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=59002475;//kernel.MapEditorOLD2:2475
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=59002501;//kernel.MapEditorOLD2:2501
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=59002597;//kernel.MapEditorOLD2:2597
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=59002628;//kernel.MapEditorOLD2:2628
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=59002660;//kernel.MapEditorOLD2:2660
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=59002693;//kernel.MapEditorOLD2:2693
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=59002743;//kernel.MapEditorOLD2:2743
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=59002799;//kernel.MapEditorOLD2:2799
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=59002856;//kernel.MapEditorOLD2:2856
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=59002908;//kernel.MapEditorOLD2:2908
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=59002961;//kernel.MapEditorOLD2:2961
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=59003043;//kernel.MapEditorOLD2:3043
            _this.counter=0;
            //$LASTPOS=59003055;//kernel.MapEditorOLD2:3055
            //$LASTPOS=59003059;//kernel.MapEditorOLD2:3059
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=59003088;//kernel.MapEditorOLD2:3088
                //$LASTPOS=59003092;//kernel.MapEditorOLD2:3092
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=59003125;//kernel.MapEditorOLD2:3125
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=59003169;//kernel.MapEditorOLD2:3169
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=59003191;//kernel.MapEditorOLD2:3191
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=59003205;//kernel.MapEditorOLD2:3205
            _this.mode="get";
            //$LASTPOS=59003218;//kernel.MapEditorOLD2:3218
            _this.prevMode="set";
            //$LASTPOS=59003235;//kernel.MapEditorOLD2:3235
            _this.mapp=0;
            //$LASTPOS=59003244;//kernel.MapEditorOLD2:3244
            _this.mx=- 40;
            //$LASTPOS=59003253;//kernel.MapEditorOLD2:3253
            _this.my=- 40;
            //$LASTPOS=59003262;//kernel.MapEditorOLD2:3262
            _this.chipX=- 40;
            //$LASTPOS=59003274;//kernel.MapEditorOLD2:3274
            _this.chipY=- 40;
            //$LASTPOS=59003286;//kernel.MapEditorOLD2:3286
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=59003315;//kernel.MapEditorOLD2:3315
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=59003346;//kernel.MapEditorOLD2:3346
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=59003369;//kernel.MapEditorOLD2:3369
          case 14:
            //$LASTPOS=59003387;//kernel.MapEditorOLD2:3387
            _this.p=_this.mapp;
            //$LASTPOS=59003400;//kernel.MapEditorOLD2:3400
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=59003539;//kernel.MapEditorOLD2:3539
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=59003573;//kernel.MapEditorOLD2:3573
              _this.mode="erase";
              //$LASTPOS=59003596;//kernel.MapEditorOLD2:3596
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=59003629;//kernel.MapEditorOLD2:3629
            if (_this.getkey("s")==1) {
              //$LASTPOS=59003658;//kernel.MapEditorOLD2:3658
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=59003692;//kernel.MapEditorOLD2:3692
              if (_this.mode=="set") {
                //$LASTPOS=59003722;//kernel.MapEditorOLD2:3722
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=59003765;//kernel.MapEditorOLD2:3765
                _this.mode="set";
                
              }
              //$LASTPOS=59003797;//kernel.MapEditorOLD2:3797
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=59003830;//kernel.MapEditorOLD2:3830
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=59003949;//kernel.MapEditorOLD2:3949
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=59003983;//kernel.MapEditorOLD2:3983
              _this.mode="set";
              //$LASTPOS=59004004;//kernel.MapEditorOLD2:4004
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=59004037;//kernel.MapEditorOLD2:4037
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=59004158;//kernel.MapEditorOLD2:4158
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=59004192;//kernel.MapEditorOLD2:4192
              _this.mode="setOn";
              //$LASTPOS=59004215;//kernel.MapEditorOLD2:4215
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=59004341;//kernel.MapEditorOLD2:4341
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=59004482;//kernel.MapEditorOLD2:4482
              if (_this.mode!="get") {
                //$LASTPOS=59004512;//kernel.MapEditorOLD2:4512
                _this.prevMode=_this.mode;
                //$LASTPOS=59004540;//kernel.MapEditorOLD2:4540
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=59004576;//kernel.MapEditorOLD2:4576
                _this.mode="get";
                //$LASTPOS=59004601;//kernel.MapEditorOLD2:4601
                _this.chipX=- 40;
                //$LASTPOS=59004625;//kernel.MapEditorOLD2:4625
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=59004665;//kernel.MapEditorOLD2:4665
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=59004703;//kernel.MapEditorOLD2:4703
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=59004738;//kernel.MapEditorOLD2:4738
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=59004771;//kernel.MapEditorOLD2:4771
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=59004927;//kernel.MapEditorOLD2:4927
              if (_this.loadedFile) {
                //$LASTPOS=59004956;//kernel.MapEditorOLD2:4956
                _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
                
              } else {
                //$LASTPOS=59005044;//kernel.MapEditorOLD2:5044
                _this.saveFileName=prompt("input json file(*.json)","map.json");
                
              }
              //$LASTPOS=59005544;//kernel.MapEditorOLD2:5544
              if (_this.saveFileName) {
                //$LASTPOS=59005575;//kernel.MapEditorOLD2:5575
                _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
                //$LASTPOS=59005637;//kernel.MapEditorOLD2:5637
                _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
                //$LASTPOS=59005799;//kernel.MapEditorOLD2:5799
                _this.saveDataFile.obj(_this.data);
                //$LASTPOS=59005836;//kernel.MapEditorOLD2:5836
                _this.print(_this.saveFileName+" Saved");
                
              }
              
            }
            //$LASTPOS=59005943;//kernel.MapEditorOLD2:5943
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=59006084;//kernel.MapEditorOLD2:6084
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=59006118;//kernel.MapEditorOLD2:6118
              _this.mode="copy";
              //$LASTPOS=59006140;//kernel.MapEditorOLD2:6140
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=59006173;//kernel.MapEditorOLD2:6173
            if (_this.mode!="get") {
              //$LASTPOS=59006199;//kernel.MapEditorOLD2:6199
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=59006305;//kernel.MapEditorOLD2:6305
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=59006323;//kernel.MapEditorOLD2:6323
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=59006454;//kernel.MapEditorOLD2:6454
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=59006472;//kernel.MapEditorOLD2:6472
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=59006585;//kernel.MapEditorOLD2:6585
                _this.my=_this.my+8;
              }
              //$LASTPOS=59006603;//kernel.MapEditorOLD2:6603
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=59006738;//kernel.MapEditorOLD2:6738
                _this.my=_this.my-8;
              }
              //$LASTPOS=59006756;//kernel.MapEditorOLD2:6756
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=59006799;//kernel.MapEditorOLD2:6799
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=59006905;//kernel.MapEditorOLD2:6905
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=59006929;//kernel.MapEditorOLD2:6929
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=59007060;//kernel.MapEditorOLD2:7060
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=59007084;//kernel.MapEditorOLD2:7084
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=59007197;//kernel.MapEditorOLD2:7197
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=59007221;//kernel.MapEditorOLD2:7221
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=59007356;//kernel.MapEditorOLD2:7356
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=59007380;//kernel.MapEditorOLD2:7380
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=59007453;//kernel.MapEditorOLD2:7453
            if (_this.getkey("i")==1) {
              //$LASTPOS=59007482;//kernel.MapEditorOLD2:7482
              Tonyu.globals.$map.chipWidth+=4;
              //$LASTPOS=59007510;//kernel.MapEditorOLD2:7510
              Tonyu.globals.$map.chipHeight+=4;
              //$LASTPOS=59007539;//kernel.MapEditorOLD2:7539
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=59007566;//kernel.MapEditorOLD2:7566
              _this.panel.die();
              //$LASTPOS=59007588;//kernel.MapEditorOLD2:7588
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=59007688;//kernel.MapEditorOLD2:7688
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=59007723;//kernel.MapEditorOLD2:7723
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=59007759;//kernel.MapEditorOLD2:7759
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=59007796;//kernel.MapEditorOLD2:7796
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=59007854;//kernel.MapEditorOLD2:7854
            if (_this.getkey("o")==1) {
              //$LASTPOS=59007883;//kernel.MapEditorOLD2:7883
              Tonyu.globals.$map.chipWidth-=4;
              //$LASTPOS=59007911;//kernel.MapEditorOLD2:7911
              Tonyu.globals.$map.chipHeight-=4;
              //$LASTPOS=59007940;//kernel.MapEditorOLD2:7940
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=59007967;//kernel.MapEditorOLD2:7967
              _this.panel.die();
              //$LASTPOS=59007989;//kernel.MapEditorOLD2:7989
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=59008089;//kernel.MapEditorOLD2:8089
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=59008124;//kernel.MapEditorOLD2:8124
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=59008160;//kernel.MapEditorOLD2:8160
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=59008197;//kernel.MapEditorOLD2:8197
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=59008289;//kernel.MapEditorOLD2:8289
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=59008320;//kernel.MapEditorOLD2:8320
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=59008352;//kernel.MapEditorOLD2:8352
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15    ; break; }
            {
              //$LASTPOS=59008405;//kernel.MapEditorOLD2:8405
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=59008454;//kernel.MapEditorOLD2:8454
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25    ;break;
          case 15    :
            //$LASTPOS=59008505;//kernel.MapEditorOLD2:8505
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16    ; break; }
            {
              //$LASTPOS=59008560;//kernel.MapEditorOLD2:8560
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24    ;break;
          case 16    :
            //$LASTPOS=59008609;//kernel.MapEditorOLD2:8609
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18    ; break; }
            //$LASTPOS=59008662;//kernel.MapEditorOLD2:8662
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=59008716;//kernel.MapEditorOLD2:8716
            _this.mode=_this.prevMode;
            //$LASTPOS=59008740;//kernel.MapEditorOLD2:8740
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=59008774;//kernel.MapEditorOLD2:8774
            _this.print(_this.mode+" mode");
            //$LASTPOS=59008804;//kernel.MapEditorOLD2:8804
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23    ;break;
          case 18    :
            //$LASTPOS=59008829;//kernel.MapEditorOLD2:8829
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19    ; break; }
            {
              //$LASTPOS=59008884;//kernel.MapEditorOLD2:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22    ;break;
          case 19    :
            //$LASTPOS=59008937;//kernel.MapEditorOLD2:8937
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21    ; break; }
            //$LASTPOS=59008991;//kernel.MapEditorOLD2:8991
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=59009040;//kernel.MapEditorOLD2:9040
            _this.mode="set";
            //$LASTPOS=59009061;//kernel.MapEditorOLD2:9061
            _this.print(_this.mode+" mode");
            //$LASTPOS=59009091;//kernel.MapEditorOLD2:9091
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21    :
            
          case 22    :
            
          case 23    :
            
          case 24    :
            
          case 25    :
            
            //$LASTPOS=59009117;//kernel.MapEditorOLD2:9117
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
      
      //$LASTPOS=59009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=59009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=59009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=59009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=59009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=59009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=59009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=59009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=59009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=59009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=59009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=59009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=59010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=59010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=59010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=59010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=59010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=59010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=59010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=59010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=59010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=59010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=59010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=59011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditorOLD2_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=59009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=59009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=59009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=59009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=59009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=59009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=59009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=59009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=59009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=59009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=59009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=59009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=59009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=59010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=59010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=59010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=59010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=59010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=59010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=59010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=59010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=59010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=59010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=59010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=59010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=59011018;//kernel.MapEditorOLD2:11018
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
      
      //$LASTPOS=60001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=60003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=60003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=60003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=60001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=60003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=60003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=60003502;//kernel.Pad:3502
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
      
      //$LASTPOS=60000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=60000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=60000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=60000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=60000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=60000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=60000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=60000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=60000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=60000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=60001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=60001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=60001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=60001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=60001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=60001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=60001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=60001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=60001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=60001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=60001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=60001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=60001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=60001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=60001383;//kernel.Pad:1383
      //$LASTPOS=60001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=60001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=60001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=60001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=60001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=60001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=60001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=60001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=60001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=60001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=60001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=60001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=60002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=60002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=60002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=60002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=60002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=60002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=60002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=60002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=60002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=60002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=60002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=60002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=60002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=60002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=60002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=60002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=60002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=60002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=60002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=60002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=60002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=60002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=60002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=60002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=60002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=60002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=60002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=60002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=60002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=60002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=60002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=60002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=60002739;//kernel.Pad:2739
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
      
      //$LASTPOS=60001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=60001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=60001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=60001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=60001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=60001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=60001383;//kernel.Pad:1383
      //$LASTPOS=60001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=60001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=60001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=60001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=60001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=60001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=60001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=60001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=60001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=60001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=60001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=60001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=60002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=60002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=60002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=60002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=60002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=60002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=60002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=60002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=60002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=60002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=60002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=60002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=60002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=60002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=60002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=60002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=60002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=60002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=60002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=60002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=60002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=60002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=60002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=60002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=60002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=60002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=60002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=60002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=60002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=60002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=60002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=60002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=60002739;//kernel.Pad:2739
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
      
      
      //$LASTPOS=60002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=60002968;//kernel.Pad:2968
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
      
      
      //$LASTPOS=60002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=60002968;//kernel.Pad:2968
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
      
      
      //$LASTPOS=60003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=60003191;//kernel.Pad:3191
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
      
      
      //$LASTPOS=60003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=60003191;//kernel.Pad:3191
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
      
      //$LASTPOS=61000018;//kernel.UILayout:18
      _this.doLayout();
      //$LASTPOS=61000031;//kernel.UILayout:31
      Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
      //$LASTPOS=61000063;//kernel.UILayout:63
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
            //$LASTPOS=61000018;//kernel.UILayout:18
            _this.fiber$doLayout(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=61000031;//kernel.UILayout:31
            Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
            //$LASTPOS=61000063;//kernel.UILayout:63
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
      
      //$LASTPOS=61000116;//kernel.UILayout:116
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=61000145;//kernel.UILayout:145
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=61000175;//kernel.UILayout:175
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=61000205;//kernel.UILayout:205
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=61000243;//kernel.UILayout:243
      calcw = ch/height*width;
      
      //$LASTPOS=61000295;//kernel.UILayout:295
      calch = cw/width*height;
      
      //$LASTPOS=61000347;//kernel.UILayout:347
      if (calch>ch) {
        //$LASTPOS=61000361;//kernel.UILayout:361
        calch=ch;
      }
      //$LASTPOS=61000376;//kernel.UILayout:376
      if (calcw>cw) {
        //$LASTPOS=61000390;//kernel.UILayout:390
        calcw=cw;
      }
      //$LASTPOS=61000405;//kernel.UILayout:405
      scl = 1;
      
      //$LASTPOS=61000421;//kernel.UILayout:421
      isPC = ! (Tonyu.globals.$Navigator.isTablet()||Tonyu.globals.$Navigator.isMobile());
      
      //$LASTPOS=61000486;//kernel.UILayout:486
      if (isPC&&_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=61000548;//kernel.UILayout:548
        calcw=width;
        //$LASTPOS=61000560;//kernel.UILayout:560
        calch=height;
        //$LASTPOS=61000583;//kernel.UILayout:583
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=61000624;//kernel.UILayout:624
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=61000668;//kernel.UILayout:668
      Tonyu.globals.$Screen.x=_this.trunc(cw/2)+width/2%1;
      //$LASTPOS=61000706;//kernel.UILayout:706
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
      
      //$LASTPOS=61000116;//kernel.UILayout:116
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=61000145;//kernel.UILayout:145
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=61000175;//kernel.UILayout:175
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=61000205;//kernel.UILayout:205
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=61000243;//kernel.UILayout:243
      calcw = ch/height*width;
      
      //$LASTPOS=61000295;//kernel.UILayout:295
      calch = cw/width*height;
      
      //$LASTPOS=61000347;//kernel.UILayout:347
      if (calch>ch) {
        //$LASTPOS=61000361;//kernel.UILayout:361
        calch=ch;
      }
      //$LASTPOS=61000376;//kernel.UILayout:376
      if (calcw>cw) {
        //$LASTPOS=61000390;//kernel.UILayout:390
        calcw=cw;
      }
      //$LASTPOS=61000405;//kernel.UILayout:405
      scl = 1;
      
      //$LASTPOS=61000421;//kernel.UILayout:421
      isPC = ! (Tonyu.globals.$Navigator.isTablet()||Tonyu.globals.$Navigator.isMobile());
      
      //$LASTPOS=61000486;//kernel.UILayout:486
      if (isPC&&_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=61000548;//kernel.UILayout:548
        calcw=width;
        //$LASTPOS=61000560;//kernel.UILayout:560
        calch=height;
        //$LASTPOS=61000583;//kernel.UILayout:583
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=61000624;//kernel.UILayout:624
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=61000668;//kernel.UILayout:668
      Tonyu.globals.$Screen.x=_this.trunc(cw/2)+width/2%1;
      //$LASTPOS=61000706;//kernel.UILayout:706
      Tonyu.globals.$Screen.y=_this.trunc(ch/2)+height/2%1;
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_UILayout_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=61000832;//kernel.UILayout:832
      larger = 100;
      
      //$LASTPOS=61000853;//kernel.UILayout:853
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
      
      //$LASTPOS=61000832;//kernel.UILayout:832
      larger = 100;
      
      //$LASTPOS=61000853;//kernel.UILayout:853
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
      
      //$LASTPOS=62000080;//kernel.WebPage:80
      _this.eventWindowOpen=(function anonymous_98(e) {
        
        //$LASTPOS=62000161;//kernel.WebPage:161
        window.open(_this.postUrl);
        //$LASTPOS=62000188;//kernel.WebPage:188
        if (_this.canvas.removeEventListener) {
          //$LASTPOS=62000231;//kernel.WebPage:231
          _this.canvas.removeEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=62000301;//kernel.WebPage:301
          _this.canvas.removeEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=62000374;//kernel.WebPage:374
          _this.listenerExists=false;
          
        } else {
          //$LASTPOS=62000410;//kernel.WebPage:410
          if (_this.canvas.detachEvent) {
            //$LASTPOS=62000444;//kernel.WebPage:444
            _this.canvas.detachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=62000501;//kernel.WebPage:501
            _this.canvas.detachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=62000559;//kernel.WebPage:559
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
      
      //$LASTPOS=62000080;//kernel.WebPage:80
      _this.eventWindowOpen=(function anonymous_98(e) {
        
        //$LASTPOS=62000161;//kernel.WebPage:161
        window.open(_this.postUrl);
        //$LASTPOS=62000188;//kernel.WebPage:188
        if (_this.canvas.removeEventListener) {
          //$LASTPOS=62000231;//kernel.WebPage:231
          _this.canvas.removeEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=62000301;//kernel.WebPage:301
          _this.canvas.removeEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=62000374;//kernel.WebPage:374
          _this.listenerExists=false;
          
        } else {
          //$LASTPOS=62000410;//kernel.WebPage:410
          if (_this.canvas.detachEvent) {
            //$LASTPOS=62000444;//kernel.WebPage:444
            _this.canvas.detachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=62000501;//kernel.WebPage:501
            _this.canvas.detachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=62000559;//kernel.WebPage:559
            _this.listenerExists=false;
            
          }
        }
      });
      
      _thread.retVal=_this;return;
    },
    openNewWindow :function _trc_WebPage_openNewWindow(url) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62000624;//kernel.WebPage:624
      _this.postUrl=url;
      //$LASTPOS=62000704;//kernel.WebPage:704
      _this.canvas=document.getElementsByTagName("canvas")[0];
      //$LASTPOS=62000760;//kernel.WebPage:760
      if (! _this.listenerExists) {
        //$LASTPOS=62000792;//kernel.WebPage:792
        if (_this.canvas.addEventListener) {
          //$LASTPOS=62000836;//kernel.WebPage:836
          _this.canvas.addEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=62000907;//kernel.WebPage:907
          _this.canvas.addEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=62001050;//kernel.WebPage:1050
          _this.listenerExists=true;
          
        } else {
          //$LASTPOS=62001089;//kernel.WebPage:1089
          if (_this.canvas.attachEvent) {
            //$LASTPOS=62001127;//kernel.WebPage:1127
            _this.canvas.attachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=62001188;//kernel.WebPage:1188
            _this.canvas.attachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=62001250;//kernel.WebPage:1250
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
      
      //$LASTPOS=62000624;//kernel.WebPage:624
      _this.postUrl=url;
      //$LASTPOS=62000704;//kernel.WebPage:704
      _this.canvas=document.getElementsByTagName("canvas")[0];
      //$LASTPOS=62000760;//kernel.WebPage:760
      if (! _this.listenerExists) {
        //$LASTPOS=62000792;//kernel.WebPage:792
        if (_this.canvas.addEventListener) {
          //$LASTPOS=62000836;//kernel.WebPage:836
          _this.canvas.addEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=62000907;//kernel.WebPage:907
          _this.canvas.addEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=62001050;//kernel.WebPage:1050
          _this.listenerExists=true;
          
        } else {
          //$LASTPOS=62001089;//kernel.WebPage:1089
          if (_this.canvas.attachEvent) {
            //$LASTPOS=62001127;//kernel.WebPage:1127
            _this.canvas.attachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=62001188;//kernel.WebPage:1188
            _this.canvas.attachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=62001250;//kernel.WebPage:1250
            _this.listenerExists=true;
            
          }
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    openPage :function _trc_WebPage_openPage(url) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62001319;//kernel.WebPage:1319
      window.location.href=url;
    },
    fiber$openPage :function _trc_WebPage_f_openPage(_thread,url) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62001319;//kernel.WebPage:1319
      window.location.href=url;
      
      _thread.retVal=_this;return;
    },
    openTweet :function _trc_WebPage_openTweet(text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      var sendUrl;
      
      //$LASTPOS=62001902;//kernel.WebPage:1902
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=62001958;//kernel.WebPage:1958
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=62002010;//kernel.WebPage:2010
      if (url!=null) {
        //$LASTPOS=62002038;//kernel.WebPage:2038
        sendUrl+="&";
        //$LASTPOS=62002063;//kernel.WebPage:2063
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=62002120;//kernel.WebPage:2120
      if (hashtags!=null) {
        //$LASTPOS=62002153;//kernel.WebPage:2153
        sendUrl+="&";
        //$LASTPOS=62002178;//kernel.WebPage:2178
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=62002245;//kernel.WebPage:2245
      if (via!=null) {
        //$LASTPOS=62002273;//kernel.WebPage:2273
        sendUrl+="&";
        //$LASTPOS=62002298;//kernel.WebPage:2298
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=62002355;//kernel.WebPage:2355
      if (related!=null) {
        //$LASTPOS=62002387;//kernel.WebPage:2387
        sendUrl+="&";
        //$LASTPOS=62002412;//kernel.WebPage:2412
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=62002477;//kernel.WebPage:2477
      if (tl) {
        //$LASTPOS=62002496;//kernel.WebPage:2496
        sendUrl+="&";
        //$LASTPOS=62002521;//kernel.WebPage:2521
        sendUrl+="source=webclient";
        
      }
      //$LASTPOS=62002564;//kernel.WebPage:2564
      _this.openNewWindow(sendUrl);
    },
    fiber$openTweet :function _trc_WebPage_f_openTweet(_thread,text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sendUrl;
      
      //$LASTPOS=62001902;//kernel.WebPage:1902
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=62001958;//kernel.WebPage:1958
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=62002010;//kernel.WebPage:2010
      if (url!=null) {
        //$LASTPOS=62002038;//kernel.WebPage:2038
        sendUrl+="&";
        //$LASTPOS=62002063;//kernel.WebPage:2063
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=62002120;//kernel.WebPage:2120
      if (hashtags!=null) {
        //$LASTPOS=62002153;//kernel.WebPage:2153
        sendUrl+="&";
        //$LASTPOS=62002178;//kernel.WebPage:2178
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=62002245;//kernel.WebPage:2245
      if (via!=null) {
        //$LASTPOS=62002273;//kernel.WebPage:2273
        sendUrl+="&";
        //$LASTPOS=62002298;//kernel.WebPage:2298
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=62002355;//kernel.WebPage:2355
      if (related!=null) {
        //$LASTPOS=62002387;//kernel.WebPage:2387
        sendUrl+="&";
        //$LASTPOS=62002412;//kernel.WebPage:2412
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=62002477;//kernel.WebPage:2477
      if (tl) {
        //$LASTPOS=62002496;//kernel.WebPage:2496
        sendUrl+="&";
        //$LASTPOS=62002521;//kernel.WebPage:2521
        sendUrl+="source=webclient";
        
      }
      
      _thread.enter(function _trc_WebPage_ent_openTweet(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62002564;//kernel.WebPage:2564
            _this.fiber$openNewWindow(_thread, sendUrl);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    openShareTweet :function _trc_WebPage_openShareTweet(text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      var sendUrl;
      var tempText;
      
      //$LASTPOS=62003505;//kernel.WebPage:3505
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=62003620;//kernel.WebPage:3620
      if (arguments.length==2) {
        //$LASTPOS=62003656;//kernel.WebPage:3656
        if (text==null||text.match(/^http/)) {
          //$LASTPOS=62003710;//kernel.WebPage:3710
          tempText = text;
          
          //$LASTPOS=62003742;//kernel.WebPage:3742
          text=url;
          //$LASTPOS=62003751;//kernel.WebPage:3751
          url=tempText;
          
        }
        
      }
      //$LASTPOS=62003788;//kernel.WebPage:3788
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=62003840;//kernel.WebPage:3840
      sendUrl+="&";
      //$LASTPOS=62003861;//kernel.WebPage:3861
      if (url==null) {
        //$LASTPOS=62003889;//kernel.WebPage:3889
        sendUrl+="url="+window.location.href;
        
      } else {
        //$LASTPOS=62003954;//kernel.WebPage:3954
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=62004011;//kernel.WebPage:4011
      if (hashtags!=null) {
        //$LASTPOS=62004044;//kernel.WebPage:4044
        sendUrl+="&";
        //$LASTPOS=62004069;//kernel.WebPage:4069
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=62004136;//kernel.WebPage:4136
      if (via!=null) {
        //$LASTPOS=62004164;//kernel.WebPage:4164
        sendUrl+="&";
        //$LASTPOS=62004189;//kernel.WebPage:4189
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=62004246;//kernel.WebPage:4246
      if (related!=null) {
        //$LASTPOS=62004278;//kernel.WebPage:4278
        sendUrl+="&";
        //$LASTPOS=62004303;//kernel.WebPage:4303
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=62004368;//kernel.WebPage:4368
      if (tl) {
        //$LASTPOS=62004387;//kernel.WebPage:4387
        sendUrl+="&";
        //$LASTPOS=62004412;//kernel.WebPage:4412
        sendUrl+="source=webclient";
        
      }
      //$LASTPOS=62004455;//kernel.WebPage:4455
      _this.openNewWindow(sendUrl);
    },
    fiber$openShareTweet :function _trc_WebPage_f_openShareTweet(_thread,text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sendUrl;
      var tempText;
      
      //$LASTPOS=62003505;//kernel.WebPage:3505
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=62003620;//kernel.WebPage:3620
      if (_arguments.length==2) {
        //$LASTPOS=62003656;//kernel.WebPage:3656
        if (text==null||text.match(/^http/)) {
          //$LASTPOS=62003710;//kernel.WebPage:3710
          tempText = text;
          
          //$LASTPOS=62003742;//kernel.WebPage:3742
          text=url;
          //$LASTPOS=62003751;//kernel.WebPage:3751
          url=tempText;
          
        }
        
      }
      //$LASTPOS=62003788;//kernel.WebPage:3788
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=62003840;//kernel.WebPage:3840
      sendUrl+="&";
      //$LASTPOS=62003861;//kernel.WebPage:3861
      if (url==null) {
        //$LASTPOS=62003889;//kernel.WebPage:3889
        sendUrl+="url="+window.location.href;
        
      } else {
        //$LASTPOS=62003954;//kernel.WebPage:3954
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=62004011;//kernel.WebPage:4011
      if (hashtags!=null) {
        //$LASTPOS=62004044;//kernel.WebPage:4044
        sendUrl+="&";
        //$LASTPOS=62004069;//kernel.WebPage:4069
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=62004136;//kernel.WebPage:4136
      if (via!=null) {
        //$LASTPOS=62004164;//kernel.WebPage:4164
        sendUrl+="&";
        //$LASTPOS=62004189;//kernel.WebPage:4189
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=62004246;//kernel.WebPage:4246
      if (related!=null) {
        //$LASTPOS=62004278;//kernel.WebPage:4278
        sendUrl+="&";
        //$LASTPOS=62004303;//kernel.WebPage:4303
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=62004368;//kernel.WebPage:4368
      if (tl) {
        //$LASTPOS=62004387;//kernel.WebPage:4387
        sendUrl+="&";
        //$LASTPOS=62004412;//kernel.WebPage:4412
        sendUrl+="source=webclient";
        
      }
      
      _thread.enter(function _trc_WebPage_ent_openShareTweet(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62004455;//kernel.WebPage:4455
            _this.fiber$openNewWindow(_thread, sendUrl);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"openNewWindow":{"nowait":false},"openPage":{"nowait":false},"openTweet":{"nowait":false},"openShareTweet":{"nowait":false}},"fields":{"eventWindowOpen":{},"postUrl":{},"canvas":{},"listenerExists":{}}}
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
      
      //$LASTPOS=63000234;//kernel.Boot:234
      Tonyu.resetLoopCheck(10000);
      //$LASTPOS=63000264;//kernel.Boot:264
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=63000277;//kernel.Boot:277
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=63000315;//kernel.Boot:315
      _this.initEvents();
      //$LASTPOS=63000330;//kernel.Boot:330
      _this.initLayers();
      //$LASTPOS=63000345;//kernel.Boot:345
      _this.initPeripherals();
      //$LASTPOS=63000365;//kernel.Boot:365
      _this.loadPlugins();
      //$LASTPOS=63000381;//kernel.Boot:381
      _this.loadImages();
      //$LASTPOS=63000396;//kernel.Boot:396
      _this.loadSounds();
      //$LASTPOS=63000411;//kernel.Boot:411
      _this.createMainObject();
      //$LASTPOS=63000432;//kernel.Boot:432
      _this.progress();
      //$LASTPOS=63000445;//kernel.Boot:445
      _this.mainLoop();
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63000234;//kernel.Boot:234
      Tonyu.resetLoopCheck(10000);
      //$LASTPOS=63000264;//kernel.Boot:264
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=63000277;//kernel.Boot:277
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63000315;//kernel.Boot:315
            _this.fiber$initEvents(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=63000330;//kernel.Boot:330
            _this.fiber$initLayers(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=63000345;//kernel.Boot:345
            _this.fiber$initPeripherals(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=63000365;//kernel.Boot:365
            _this.fiber$loadPlugins(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=63000381;//kernel.Boot:381
            _this.fiber$loadImages(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=63000396;//kernel.Boot:396
            _this.fiber$loadSounds(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=63000411;//kernel.Boot:411
            _this.fiber$createMainObject(_thread);
            __pc=7;return;
          case 7:
            
            //$LASTPOS=63000432;//kernel.Boot:432
            _this.fiber$progress(_thread);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=63000445;//kernel.Boot:445
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
      
      //$LASTPOS=63000479;//kernel.Boot:479
      _this.extend(param);
      //$LASTPOS=63000499;//kernel.Boot:499
      _this._th=Tonyu.thread();
      //$LASTPOS=63000524;//kernel.Boot:524
      _this._th.apply(_this,"main");
      //$LASTPOS=63000553;//kernel.Boot:553
      _this._th.stepsLoop();
      //$LASTPOS=63000575;//kernel.Boot:575
      _this.on("die",(function anonymous_586() {
        
        //$LASTPOS=63000598;//kernel.Boot:598
        if (_this._th) {
          //$LASTPOS=63000607;//kernel.Boot:607
          _this._th.kill();
        }
      }));
    },
    timeStop :function _trc_Boot_timeStop(except) {
      "use strict";
      var _this=this;
      var oldS;
      var newS;
      var res;
      
      //$LASTPOS=63000656;//kernel.Boot:656
      oldS = _this._scheduler;
      
      //$LASTPOS=63000682;//kernel.Boot:682
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=63000724;//kernel.Boot:724
      newS = _this._scheduler;
      
      //$LASTPOS=63000750;//kernel.Boot:750
      res = {release: (function anonymous_778(a) {
        
        //$LASTPOS=63000798;//kernel.Boot:798
        a._scheduler=newS;
        //$LASTPOS=63000830;//kernel.Boot:830
        oldS.findByThreadGroup(a).forEach((function anonymous_864(th) {
          
          //$LASTPOS=63000889;//kernel.Boot:889
          if (th.scheduled===newS) {
            return _this;
          }
          //$LASTPOS=63000939;//kernel.Boot:939
          th.scheduled=null;
          //$LASTPOS=63000975;//kernel.Boot:975
          newS.addToNext(th);
        }));
      }),releaseAll: (function anonymous_1044() {
        var a;
        var e;
        var _it_561;
        
        //$LASTPOS=63001060;//kernel.Boot:1060
        a = Tonyu.globals.$Screen.all();
        
        //$LASTPOS=63001094;//kernel.Boot:1094
        _it_561=Tonyu.iterator(a,1);
        while(_it_561.next()) {
          e=_it_561[0];
          
          //$LASTPOS=63001130;//kernel.Boot:1130
          res.release(e);
          
        }
      })};
      
      //$LASTPOS=63001185;//kernel.Boot:1185
      res.release(except);
      return res;
    },
    fiber$timeStop :function _trc_Boot_f_timeStop(_thread,except) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var oldS;
      var newS;
      var res;
      
      //$LASTPOS=63000656;//kernel.Boot:656
      oldS = _this._scheduler;
      
      //$LASTPOS=63000682;//kernel.Boot:682
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=63000724;//kernel.Boot:724
      newS = _this._scheduler;
      
      //$LASTPOS=63000750;//kernel.Boot:750
      res = {release: (function anonymous_778(a) {
        
        //$LASTPOS=63000798;//kernel.Boot:798
        a._scheduler=newS;
        //$LASTPOS=63000830;//kernel.Boot:830
        oldS.findByThreadGroup(a).forEach((function anonymous_864(th) {
          
          //$LASTPOS=63000889;//kernel.Boot:889
          if (th.scheduled===newS) {
            return _this;
          }
          //$LASTPOS=63000939;//kernel.Boot:939
          th.scheduled=null;
          //$LASTPOS=63000975;//kernel.Boot:975
          newS.addToNext(th);
        }));
      }),releaseAll: (function anonymous_1044() {
        var a;
        var e;
        var _it_561;
        
        //$LASTPOS=63001060;//kernel.Boot:1060
        a = Tonyu.globals.$Screen.all();
        
        //$LASTPOS=63001094;//kernel.Boot:1094
        _it_561=Tonyu.iterator(a,1);
        while(_it_561.next()) {
          e=_it_561[0];
          
          //$LASTPOS=63001130;//kernel.Boot:1130
          res.release(e);
          
        }
      })};
      
      //$LASTPOS=63001185;//kernel.Boot:1185
      res.release(except);
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Boot_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63001244;//kernel.Boot:1244
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
            //$LASTPOS=63001244;//kernel.Boot:1244
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
      
      //$LASTPOS=63001349;//kernel.Boot:1349
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
    },
    fiber$initEvents :function _trc_Boot_f_initEvents(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63001349;//kernel.Boot:1349
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
      
      _thread.retVal=_this;return;
    },
    initPeripherals :function _trc_Boot_initPeripherals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63001506;//kernel.Boot:1506
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=63001541;//kernel.Boot:1541
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=63001582;//kernel.Boot:1582
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=63001615;//kernel.Boot:1615
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=63001636;//kernel.Boot:1636
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=63001657;//kernel.Boot:1657
      Tonyu.globals.$Math=Math;
      //$LASTPOS=63001674;//kernel.Boot:1674
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=63001788;//kernel.Boot:1788
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=63001816;//kernel.Boot:1816
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=63001960;//kernel.Boot:1960
      _this.initFPSParams();
      //$LASTPOS=63001982;//kernel.Boot:1982
      Tonyu.globals.$WebPage=new Tonyu.classes.kernel.WebPage;
      //$LASTPOS=63002009;//kernel.Boot:2009
      Tonyu.globals.$Navigator=new Tonyu.classes.kernel.Navigator;
      //$LASTPOS=63002040;//kernel.Boot:2040
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=63002065;//kernel.Boot:2065
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=63002090;//kernel.Boot:2090
      _this.debugCnt=50;
      //$LASTPOS=63002108;//kernel.Boot:2108
      _this.newLimit=1000;
      //$LASTPOS=63002128;//kernel.Boot:2128
      Tonyu.globals.$printLimit=100;
    },
    fiber$initPeripherals :function _trc_Boot_f_initPeripherals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63001506;//kernel.Boot:1506
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=63001541;//kernel.Boot:1541
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=63001582;//kernel.Boot:1582
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=63001615;//kernel.Boot:1615
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=63001636;//kernel.Boot:1636
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=63001657;//kernel.Boot:1657
      Tonyu.globals.$Math=Math;
      //$LASTPOS=63001674;//kernel.Boot:1674
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=63001788;//kernel.Boot:1788
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=63001816;//kernel.Boot:1816
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=63001960;//kernel.Boot:1960
      _this.initFPSParams();
      //$LASTPOS=63001982;//kernel.Boot:1982
      Tonyu.globals.$WebPage=new Tonyu.classes.kernel.WebPage;
      //$LASTPOS=63002009;//kernel.Boot:2009
      Tonyu.globals.$Navigator=new Tonyu.classes.kernel.Navigator;
      //$LASTPOS=63002040;//kernel.Boot:2040
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=63002065;//kernel.Boot:2065
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=63002090;//kernel.Boot:2090
      _this.debugCnt=50;
      //$LASTPOS=63002108;//kernel.Boot:2108
      _this.newLimit=1000;
      //$LASTPOS=63002128;//kernel.Boot:2128
      Tonyu.globals.$printLimit=100;
      
      _thread.retVal=_this;return;
    },
    initLayers :function _trc_Boot_initLayers() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63002170;//kernel.Boot:2170
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002210;//kernel.Boot:2210
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002256;//kernel.Boot:2256
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002287;//kernel.Boot:2287
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002316;//kernel.Boot:2316
      _this.cvj=$("canvas");
      //$LASTPOS=63002338;//kernel.Boot:2338
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=63002361;//kernel.Boot:2361
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=63002385;//kernel.Boot:2385
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=63002468;//kernel.Boot:2468
      Tonyu.globals.$Screen.on("resize",(function anonymous_2489() {
        
        //$LASTPOS=63002501;//kernel.Boot:2501
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=63002538;//kernel.Boot:2538
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=63002577;//kernel.Boot:2577
        if (Tonyu.globals.$panel) {
          //$LASTPOS=63002602;//kernel.Boot:2602
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=63002660;//kernel.Boot:2660
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=63002698;//kernel.Boot:2698
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=63002744;//kernel.Boot:2744
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=63002776;//kernel.Boot:2776
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=63002841;//kernel.Boot:2841
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=63002886;//kernel.Boot:2886
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=63002932;//kernel.Boot:2932
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=63002989;//kernel.Boot:2989
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=63003025;//kernel.Boot:3025
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=63003060;//kernel.Boot:3060
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=63003095;//kernel.Boot:3095
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=63003138;//kernel.Boot:3138
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=63003176;//kernel.Boot:3176
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63003207;//kernel.Boot:3207
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=63003274;//kernel.Boot:3274
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=63003309;//kernel.Boot:3309
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=63003344;//kernel.Boot:3344
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
    },
    fiber$initLayers :function _trc_Boot_f_initLayers(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63002170;//kernel.Boot:2170
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002210;//kernel.Boot:2210
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002256;//kernel.Boot:2256
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002287;//kernel.Boot:2287
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63002316;//kernel.Boot:2316
      _this.cvj=$("canvas");
      //$LASTPOS=63002338;//kernel.Boot:2338
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=63002361;//kernel.Boot:2361
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=63002385;//kernel.Boot:2385
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=63002468;//kernel.Boot:2468
      Tonyu.globals.$Screen.on("resize",(function anonymous_2489() {
        
        //$LASTPOS=63002501;//kernel.Boot:2501
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=63002538;//kernel.Boot:2538
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=63002577;//kernel.Boot:2577
        if (Tonyu.globals.$panel) {
          //$LASTPOS=63002602;//kernel.Boot:2602
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=63002660;//kernel.Boot:2660
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=63002698;//kernel.Boot:2698
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=63002744;//kernel.Boot:2744
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=63002776;//kernel.Boot:2776
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=63002841;//kernel.Boot:2841
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=63002886;//kernel.Boot:2886
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=63002932;//kernel.Boot:2932
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=63002989;//kernel.Boot:2989
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=63003025;//kernel.Boot:3025
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=63003060;//kernel.Boot:3060
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=63003095;//kernel.Boot:3095
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=63003138;//kernel.Boot:3138
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=63003176;//kernel.Boot:3176
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=63003207;//kernel.Boot:3207
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=63003274;//kernel.Boot:3274
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=63003309;//kernel.Boot:3309
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=63003344;//kernel.Boot:3344
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
      
      _thread.retVal=_this;return;
    },
    debug :function _trc_Boot_debug() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=63003429;//kernel.Boot:3429
      if (! _this.debugCnt) {
        return _this;
      }
      //$LASTPOS=63003457;//kernel.Boot:3457
      _this.debugCnt--;
      //$LASTPOS=63003474;//kernel.Boot:3474
      a = Array.prototype.slice.call(arguments);
      
      //$LASTPOS=63003524;//kernel.Boot:3524
      a.unshift(_this.debugCnt);
      //$LASTPOS=63003550;//kernel.Boot:3550
      a.unshift("DEBUG");
      //$LASTPOS=63003575;//kernel.Boot:3575
      console.log.apply(console,a);
    },
    fiber$debug :function _trc_Boot_f_debug(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=63003429;//kernel.Boot:3429
      if (! _this.debugCnt) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=63003457;//kernel.Boot:3457
      _this.debugCnt--;
      //$LASTPOS=63003474;//kernel.Boot:3474
      a = Array.prototype.slice.call(_arguments);
      
      //$LASTPOS=63003524;//kernel.Boot:3524
      a.unshift(_this.debugCnt);
      //$LASTPOS=63003550;//kernel.Boot:3550
      a.unshift("DEBUG");
      //$LASTPOS=63003575;//kernel.Boot:3575
      console.log.apply(console,a);
      
      _thread.retVal=_this;return;
    },
    loadPlugins :function _trc_Boot_loadPlugins() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63003916;//kernel.Boot:3916
      _this.progress("Loading plugins..");
      //$LASTPOS=63003952;//kernel.Boot:3952
      _this.runAsync((function anonymous_3961(r) {
        
        //$LASTPOS=63003977;//kernel.Boot:3977
        Tonyu.globals.$currentProject.loadPlugins(r);
      }));
      //$LASTPOS=63004022;//kernel.Boot:4022
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
            //$LASTPOS=63003916;//kernel.Boot:3916
            _this.fiber$progress(_thread, "Loading plugins..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=63003952;//kernel.Boot:3952
            _this.fiber$runAsync(_thread, (function anonymous_3961(r) {
              
              //$LASTPOS=63003977;//kernel.Boot:3977
              Tonyu.globals.$currentProject.loadPlugins(r);
            }));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=63004022;//kernel.Boot:4022
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
      var _it_567;
      
      //$LASTPOS=63004081;//kernel.Boot:4081
      _this.progress("Loading pats..");
      //$LASTPOS=63004114;//kernel.Boot:4114
      rs = Tonyu.globals.$currentProject.getResource();
      
      
      //$LASTPOS=63004169;//kernel.Boot:4169
      r=_this.runAsync((function anonymous_4180(succ) {
        
        //$LASTPOS=63004199;//kernel.Boot:4199
        ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir(),prj: Tonyu.globals.$currentProject});
      }));
      //$LASTPOS=63004358;//kernel.Boot:4358
      Tonyu.globals.$imageList=r[0];
      //$LASTPOS=63004416;//kernel.Boot:4416
      _it_567=Tonyu.iterator(r[0].names,2);
      while(_it_567.next()) {
        name=_it_567[0];
        val=_it_567[1];
        
        //$LASTPOS=63004460;//kernel.Boot:4460
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=63004500;//kernel.Boot:4500
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
      var _it_567;
      
      
      _thread.enter(function _trc_Boot_ent_loadImages(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63004081;//kernel.Boot:4081
            _this.fiber$progress(_thread, "Loading pats..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=63004114;//kernel.Boot:4114
            rs = Tonyu.globals.$currentProject.getResource();
            
            
            //$LASTPOS=63004169;//kernel.Boot:4169
            _this.fiber$runAsync(_thread, (function anonymous_4180(succ) {
              
              //$LASTPOS=63004199;//kernel.Boot:4199
              ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir(),prj: Tonyu.globals.$currentProject});
            }));
            __pc=2;return;
          case 2:
            r=_thread.retVal;
            
            //$LASTPOS=63004358;//kernel.Boot:4358
            Tonyu.globals.$imageList=r[0];
            //$LASTPOS=63004416;//kernel.Boot:4416
            _it_567=Tonyu.iterator(r[0].names,2);
            while(_it_567.next()) {
              name=_it_567[0];
              val=_it_567[1];
              
              //$LASTPOS=63004460;//kernel.Boot:4460
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=63004500;//kernel.Boot:4500
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
      
      //$LASTPOS=63004557;//kernel.Boot:4557
      _this.progress("Loading sounds...");
      //$LASTPOS=63004593;//kernel.Boot:4593
      _this.initT2MediaPlayer();
      //$LASTPOS=63004619;//kernel.Boot:4619
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=63004658;//kernel.Boot:4658
      _this.progress("Loading sounds done.");
      //$LASTPOS=63004697;//kernel.Boot:4697
      _this.on("stop",(function anonymous_4707() {
        
        //$LASTPOS=63004719;//kernel.Boot:4719
        _this.allClearSoundData();
      }));
      //$LASTPOS=63004753;//kernel.Boot:4753
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
            //$LASTPOS=63004557;//kernel.Boot:4557
            _this.fiber$progress(_thread, "Loading sounds...");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=63004593;//kernel.Boot:4593
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=63004619;//kernel.Boot:4619
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=63004658;//kernel.Boot:4658
            _this.fiber$progress(_thread, "Loading sounds done.");
            __pc=4;return;
          case 4:
            
            //$LASTPOS=63004697;//kernel.Boot:4697
            _this.on("stop",(function anonymous_4707() {
              
              //$LASTPOS=63004719;//kernel.Boot:4719
              _this.allClearSoundData();
            }));
            //$LASTPOS=63004753;//kernel.Boot:4753
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
      
      //$LASTPOS=63004799;//kernel.Boot:4799
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=63004845;//kernel.Boot:4845
      mainClassName = o.run.mainClass;
      
      //$LASTPOS=63004885;//kernel.Boot:4885
      _this.progress("MainClass= "+mainClassName);
      //$LASTPOS=63004929;//kernel.Boot:4929
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=63004975;//kernel.Boot:4975
      if (! _this.mainClass) {
        throw new Error(mainClassName+" というクラスはありません");
        
        
      }
      //$LASTPOS=63005063;//kernel.Boot:5063
      Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
      //$LASTPOS=63005099;//kernel.Boot:5099
      new _this.mainClass();
    },
    fiber$createMainObject :function _trc_Boot_f_createMainObject(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=63004799;//kernel.Boot:4799
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=63004845;//kernel.Boot:4845
      mainClassName = o.run.mainClass;
      
      
      _thread.enter(function _trc_Boot_ent_createMainObject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63004885;//kernel.Boot:4885
            _this.fiber$progress(_thread, "MainClass= "+mainClassName);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=63004929;//kernel.Boot:4929
            _this.mainClass=Tonyu.getClass(mainClassName);
            //$LASTPOS=63004975;//kernel.Boot:4975
            if (! _this.mainClass) {
              throw new Error(mainClassName+" というクラスはありません");
              
              
            }
            //$LASTPOS=63005063;//kernel.Boot:5063
            Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
            //$LASTPOS=63005099;//kernel.Boot:5099
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
      
      //$LASTPOS=63005147;//kernel.Boot:5147
      a = Tonyu.globals.$Screen.all();
      
      //$LASTPOS=63005173;//kernel.Boot:5173
      a=a.find((function anonymous_5182(e) {
        
        return ! Tonyu.globals.$excludeFromAll.contains(e);
      }));
      //$LASTPOS=63005234;//kernel.Boot:5234
      a.die();
      //$LASTPOS=63005248;//kernel.Boot:5248
      new page(arg);
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      var res;
      var evt;
      var r;
      
      //$LASTPOS=63005282;//kernel.Boot:5282
      res = new $.Deferred();
      
      //$LASTPOS=63005313;//kernel.Boot:5313
      evt = {die: (function anonymous_5337() {
        
        //$LASTPOS=63005353;//kernel.Boot:5353
        _this.die();
        //$LASTPOS=63005373;//kernel.Boot:5373
        res.resolve();
      }),preventDefault: (function anonymous_5425() {
        
        //$LASTPOS=63005427;//kernel.Boot:5427
        evt.defaultPrevented=true;
      })};
      
      //$LASTPOS=63005468;//kernel.Boot:5468
      r = _this.fireEvent("stop",evt);
      
      //$LASTPOS=63005502;//kernel.Boot:5502
      if (! evt.defaultPrevented) {
        //$LASTPOS=63005539;//kernel.Boot:5539
        evt.die();
        //$LASTPOS=63005559;//kernel.Boot:5559
        res.resolve();
        
      }
      return res;
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var evt;
      var r;
      
      //$LASTPOS=63005282;//kernel.Boot:5282
      res = new $.Deferred();
      
      //$LASTPOS=63005313;//kernel.Boot:5313
      evt = {die: (function anonymous_5337() {
        
        //$LASTPOS=63005353;//kernel.Boot:5353
        _this.die();
        //$LASTPOS=63005373;//kernel.Boot:5373
        res.resolve();
      }),preventDefault: (function anonymous_5425() {
        
        //$LASTPOS=63005427;//kernel.Boot:5427
        evt.defaultPrevented=true;
      })};
      
      //$LASTPOS=63005468;//kernel.Boot:5468
      r = _this.fireEvent("stop",evt);
      
      //$LASTPOS=63005502;//kernel.Boot:5502
      if (! evt.defaultPrevented) {
        //$LASTPOS=63005539;//kernel.Boot:5539
        evt.die();
        //$LASTPOS=63005559;//kernel.Boot:5559
        res.resolve();
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    hide :function _trc_Boot_hide() {
      "use strict";
      var _this=this;
      
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      "use strict";
      var _this=this;
      var s;
      var th;
      
      //$LASTPOS=63005650;//kernel.Boot:5650
      if (! method) {
        throw new Error("指定されたメソッドは定義されていません:"+method);
        
      }
      //$LASTPOS=63005716;//kernel.Boot:5716
      args=args||[];
      //$LASTPOS=63005736;//kernel.Boot:5736
      s = obj._scheduler||_this._scheduler;
      
      //$LASTPOS=63005775;//kernel.Boot:5775
      th = s.newThread(obj,method,args);
      
      //$LASTPOS=63005819;//kernel.Boot:5819
      obj.setThreadGroup(_this);
      //$LASTPOS=63005850;//kernel.Boot:5850
      th.setThreadGroup(obj);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var th;
      
      //$LASTPOS=63005650;//kernel.Boot:5650
      if (! method) {
        throw new Error("指定されたメソッドは定義されていません:"+method);
        
      }
      //$LASTPOS=63005716;//kernel.Boot:5716
      args=args||[];
      //$LASTPOS=63005736;//kernel.Boot:5736
      s = obj._scheduler||_this._scheduler;
      
      //$LASTPOS=63005775;//kernel.Boot:5775
      th = s.newThread(obj,method,args);
      
      //$LASTPOS=63005819;//kernel.Boot:5819
      obj.setThreadGroup(_this);
      //$LASTPOS=63005850;//kernel.Boot:5850
      th.setThreadGroup(obj);
      _thread.retVal=th;return;
      
      
      _thread.retVal=_this;return;
    },
    progress :function _trc_Boot_progress(m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63005914;//kernel.Boot:5914
      if (typeof  SplashScreen=="undefined") {
        return _this;
      }
      //$LASTPOS=63005965;//kernel.Boot:5965
      if (m) {
        //$LASTPOS=63005983;//kernel.Boot:5983
        console.log.apply(console,arguments);
        //$LASTPOS=63006030;//kernel.Boot:6030
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=63006068;//kernel.Boot:6068
        SplashScreen.hide();
      }
    },
    fiber$progress :function _trc_Boot_f_progress(_thread,m) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63005914;//kernel.Boot:5914
      if (typeof  SplashScreen=="undefined") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=63005965;//kernel.Boot:5965
      if (m) {
        //$LASTPOS=63005983;//kernel.Boot:5983
        console.log.apply(console,_arguments);
        //$LASTPOS=63006030;//kernel.Boot:6030
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=63006068;//kernel.Boot:6068
        SplashScreen.hide();
      }
      
      _thread.retVal=_this;return;
    },
    progressNoLog :function _trc_Boot_progressNoLog(m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63006118;//kernel.Boot:6118
      if (typeof  SplashScreen=="undefined") {
        return _this;
      }
      //$LASTPOS=63006169;//kernel.Boot:6169
      if (m) {
        //$LASTPOS=63006187;//kernel.Boot:6187
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=63006225;//kernel.Boot:6225
        SplashScreen.hide();
      }
    },
    fiber$progressNoLog :function _trc_Boot_f_progressNoLog(_thread,m) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63006118;//kernel.Boot:6118
      if (typeof  SplashScreen=="undefined") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=63006169;//kernel.Boot:6169
      if (m) {
        //$LASTPOS=63006187;//kernel.Boot:6187
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=63006225;//kernel.Boot:6225
        SplashScreen.hide();
      }
      
      _thread.retVal=_this;return;
    },
    mainLoop :function _trc_Boot_mainLoop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63006271;//kernel.Boot:6271
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=63006291;//kernel.Boot:6291
      Tonyu.globals.$drawnFrameCount=0;
      //$LASTPOS=63006316;//kernel.Boot:6316
      while (true) {
        //$LASTPOS=63006337;//kernel.Boot:6337
        if (_this._useRAF) {
          //$LASTPOS=63006350;//kernel.Boot:6350
          _this.loopRAF();
        } else {
          //$LASTPOS=63006372;//kernel.Boot:6372
          _this.loopTimer();
        }
        //$LASTPOS=63006394;//kernel.Boot:6394
        _this.measureFps();
        //$LASTPOS=63006414;//kernel.Boot:6414
        _this.handlePause();
        //$LASTPOS=63006438;//kernel.Boot:6438
        Tonyu.globals.$drawnFrameCount++;
        
      }
    },
    fiber$mainLoop :function _trc_Boot_f_mainLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63006271;//kernel.Boot:6271
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=63006291;//kernel.Boot:6291
      Tonyu.globals.$drawnFrameCount=0;
      
      _thread.enter(function _trc_Boot_ent_mainLoop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63006316;//kernel.Boot:6316
          case 1:
            //$LASTPOS=63006337;//kernel.Boot:6337
            if (!(_this._useRAF)) { __pc=3     ; break; }
            //$LASTPOS=63006350;//kernel.Boot:6350
            _this.fiber$loopRAF(_thread);
            __pc=2;return;
          case 2:
            
            __pc=5     ;break;
          case 3     :
            //$LASTPOS=63006372;//kernel.Boot:6372
            _this.fiber$loopTimer(_thread);
            __pc=4;return;
          case 4:
            
          case 5     :
            
            //$LASTPOS=63006394;//kernel.Boot:6394
            _this.measureFps();
            //$LASTPOS=63006414;//kernel.Boot:6414
            _this.fiber$handlePause(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=63006438;//kernel.Boot:6438
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
      
      //$LASTPOS=63006487;//kernel.Boot:6487
      nowTime = _this.now();
      
      //$LASTPOS=63006528;//kernel.Boot:6528
      frameTime = 1000/_this._fps;
      
      //$LASTPOS=63006572;//kernel.Boot:6572
      moves = 0;
      
      
      //$LASTPOS=63006651;//kernel.Boot:6651
      _this.subTime=_this.trunc(nowTime-_this.rafProcNowTime);
      //$LASTPOS=63006699;//kernel.Boot:6699
      _this.procCnt=_this.subTime/frameTime;
      //$LASTPOS=63006751;//kernel.Boot:6751
      bufferTime=(0.5*_this._fps/60);
      //$LASTPOS=63006844;//kernel.Boot:6844
      if (_this.procCnt>=1-bufferTime&&_this.procCnt<=1+bufferTime) {
        //$LASTPOS=63006904;//kernel.Boot:6904
        _this.procCnt=1;
      }
      //$LASTPOS=63006924;//kernel.Boot:6924
      _this.procCnt=_this.floor(_this.procCnt);
      //$LASTPOS=63006955;//kernel.Boot:6955
      if (_this.procCnt>_this.maxFrameSkip) {
        //$LASTPOS=63006994;//kernel.Boot:6994
        _this.procCnt=_this.maxFrameSkip;
        //$LASTPOS=63007027;//kernel.Boot:7027
        _this.rafProcNowTime=nowTime;
        
      } else {
        //$LASTPOS=63007076;//kernel.Boot:7076
        _this.rafProcNowTime+=_this.procCnt*frameTime;
        
      }
      //$LASTPOS=63007173;//kernel.Boot:7173
      while (moves<_this.procCnt) {
        //$LASTPOS=63007199;//kernel.Boot:7199
        _this.moveFrame();
        //$LASTPOS=63007215;//kernel.Boot:7215
        moves++;
        //$LASTPOS=63007230;//kernel.Boot:7230
        if (moves<_this.procCnt) {
          //$LASTPOS=63007249;//kernel.Boot:7249
          _this.afterDraw(false);
        }
        
      }
      //$LASTPOS=63007302;//kernel.Boot:7302
      if (moves>0) {
        //$LASTPOS=63007328;//kernel.Boot:7328
        _this.drawFrame();
        //$LASTPOS=63007350;//kernel.Boot:7350
        _this.afterDraw(true);
        
      }
      //$LASTPOS=63007407;//kernel.Boot:7407
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
      
      //$LASTPOS=63006487;//kernel.Boot:6487
      nowTime = _this.now();
      
      //$LASTPOS=63006528;//kernel.Boot:6528
      frameTime = 1000/_this._fps;
      
      //$LASTPOS=63006572;//kernel.Boot:6572
      moves = 0;
      
      
      //$LASTPOS=63006651;//kernel.Boot:6651
      _this.subTime=_this.trunc(nowTime-_this.rafProcNowTime);
      //$LASTPOS=63006699;//kernel.Boot:6699
      _this.procCnt=_this.subTime/frameTime;
      //$LASTPOS=63006751;//kernel.Boot:6751
      bufferTime=(0.5*_this._fps/60);
      //$LASTPOS=63006844;//kernel.Boot:6844
      if (_this.procCnt>=1-bufferTime&&_this.procCnt<=1+bufferTime) {
        //$LASTPOS=63006904;//kernel.Boot:6904
        _this.procCnt=1;
      }
      //$LASTPOS=63006924;//kernel.Boot:6924
      _this.procCnt=_this.floor(_this.procCnt);
      //$LASTPOS=63006955;//kernel.Boot:6955
      if (_this.procCnt>_this.maxFrameSkip) {
        //$LASTPOS=63006994;//kernel.Boot:6994
        _this.procCnt=_this.maxFrameSkip;
        //$LASTPOS=63007027;//kernel.Boot:7027
        _this.rafProcNowTime=nowTime;
        
      } else {
        //$LASTPOS=63007076;//kernel.Boot:7076
        _this.rafProcNowTime+=_this.procCnt*frameTime;
        
      }
      
      _thread.enter(function _trc_Boot_ent_loopRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63007173;//kernel.Boot:7173
          case 1:
            if (!(moves<_this.procCnt)) { __pc=2     ; break; }
            {
              //$LASTPOS=63007199;//kernel.Boot:7199
              _this.moveFrame();
              //$LASTPOS=63007215;//kernel.Boot:7215
              moves++;
              //$LASTPOS=63007230;//kernel.Boot:7230
              if (moves<_this.procCnt) {
                //$LASTPOS=63007249;//kernel.Boot:7249
                _this.afterDraw(false);
              }
            }
            __pc=1;break;
          case 2     :
            
            //$LASTPOS=63007302;//kernel.Boot:7302
            if (moves>0) {
              //$LASTPOS=63007328;//kernel.Boot:7328
              _this.drawFrame();
              //$LASTPOS=63007350;//kernel.Boot:7350
              _this.afterDraw(true);
              
            }
            //$LASTPOS=63007407;//kernel.Boot:7407
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
      
      //$LASTPOS=63007846;//kernel.Boot:7846
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
            //$LASTPOS=63007846;//kernel.Boot:7846
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
      
      //$LASTPOS=63008792;//kernel.Boot:8792
      _this.moveFrame();
      //$LASTPOS=63008810;//kernel.Boot:8810
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=63008838;//kernel.Boot:8838
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=63008892;//kernel.Boot:8892
        _this.doDraw=true;
        //$LASTPOS=63008914;//kernel.Boot:8914
        _this.resetDeadLine();
        
      }
      //$LASTPOS=63008943;//kernel.Boot:8943
      if (_this.doDraw) {
        //$LASTPOS=63008980;//kernel.Boot:8980
        _this.drawFrame();
        //$LASTPOS=63009002;//kernel.Boot:9002
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=63009041;//kernel.Boot:9041
        _this.frameSkipped++;
        
      }
      //$LASTPOS=63009069;//kernel.Boot:9069
      _this.afterDraw(_this.doDraw);
      //$LASTPOS=63009093;//kernel.Boot:9093
      _this.waitFrame();
    },
    fiber$loopTimer :function _trc_Boot_f_loopTimer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=63008792;//kernel.Boot:8792
      _this.moveFrame();
      //$LASTPOS=63008810;//kernel.Boot:8810
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=63008838;//kernel.Boot:8838
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=63008892;//kernel.Boot:8892
        _this.doDraw=true;
        //$LASTPOS=63008914;//kernel.Boot:8914
        _this.resetDeadLine();
        
      }
      //$LASTPOS=63008943;//kernel.Boot:8943
      if (_this.doDraw) {
        //$LASTPOS=63008980;//kernel.Boot:8980
        _this.drawFrame();
        //$LASTPOS=63009002;//kernel.Boot:9002
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=63009041;//kernel.Boot:9041
        _this.frameSkipped++;
        
      }
      //$LASTPOS=63009069;//kernel.Boot:9069
      _this.afterDraw(_this.doDraw);
      
      _thread.enter(function _trc_Boot_ent_loopTimer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63009093;//kernel.Boot:9093
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
      
      //$LASTPOS=63009141;//kernel.Boot:9141
      while (_this.paused) {
        //$LASTPOS=63009166;//kernel.Boot:9166
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=63009202;//kernel.Boot:9202
        if (! _this.paused) {
          //$LASTPOS=63009215;//kernel.Boot:9215
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
            //$LASTPOS=63009141;//kernel.Boot:9141
          case 1:
            if (!(_this.paused)) { __pc=3     ; break; }
            //$LASTPOS=63009166;//kernel.Boot:9166
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=63009202;//kernel.Boot:9202
            if (! _this.paused) {
              //$LASTPOS=63009215;//kernel.Boot:9215
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
      
      //$LASTPOS=63009270;//kernel.Boot:9270
      s = _this.now();
      
      //$LASTPOS=63009288;//kernel.Boot:9288
      Tonyu.globals.$uiScreen.drawLayers();
      //$LASTPOS=63009317;//kernel.Boot:9317
      _this.drawTime=_this.now()-s;
      //$LASTPOS=63009340;//kernel.Boot:9340
      _this.fps_fpsCnt++;
    },
    moveFrame :function _trc_Boot_moveFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=63009669;//kernel.Boot:9669
      s = _this.now();
      
      //$LASTPOS=63009687;//kernel.Boot:9687
      Tonyu.globals.$_printCount=0;
      //$LASTPOS=63009708;//kernel.Boot:9708
      Tonyu.resetLoopCheck();
      //$LASTPOS=63009737;//kernel.Boot:9737
      if (_this.newLimit) {
        //$LASTPOS=63009751;//kernel.Boot:9751
        _this.newLimitCount=_this.newLimit;
      }
      //$LASTPOS=63009809;//kernel.Boot:9809
      _this._scheduler.stepsAll();
      //$LASTPOS=63009866;//kernel.Boot:9866
      Tonyu.globals.$Keys.update();
      //$LASTPOS=63009916;//kernel.Boot:9916
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=63009973;//kernel.Boot:9973
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=63010006;//kernel.Boot:10006
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=63010041;//kernel.Boot:10041
      _this.moveTime=_this.now()-s;
      //$LASTPOS=63010064;//kernel.Boot:10064
      _this.fps_rpsCnt++;
      //$LASTPOS=63010084;//kernel.Boot:10084
      Tonyu.globals.$frameCount++;
    },
    afterDraw :function _trc_Boot_afterDraw(drawn) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63010230;//kernel.Boot:10230
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=63010285;//kernel.Boot:10285
      Tonyu.globals.$Sprites.removeOneframes(drawn);
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63010401;//kernel.Boot:10401
      _this._fps=30;
      //$LASTPOS=63010417;//kernel.Boot:10417
      _this.maxFrameSkip=5;
      //$LASTPOS=63010440;//kernel.Boot:10440
      _this.minFrameSkip=1;
      //$LASTPOS=63010490;//kernel.Boot:10490
      _this.frameCnt=0;
      //$LASTPOS=63010509;//kernel.Boot:10509
      _this.resetDeadLine();
      //$LASTPOS=63010531;//kernel.Boot:10531
      _this.lastMeasured=_this.now();
      //$LASTPOS=63010556;//kernel.Boot:10556
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
      //$LASTPOS=63010602;//kernel.Boot:10602
      _this.drawTime=5;
      //$LASTPOS=63010613;//kernel.Boot:10613
      _this.moveTime=5;
      //$LASTPOS=63010671;//kernel.Boot:10671
      _this._useRAF=true;
      //$LASTPOS=63010725;//kernel.Boot:10725
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
      
      //$LASTPOS=63010836;//kernel.Boot:10836
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=63010867;//kernel.Boot:10867
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      "use strict";
      var _this=this;
      var wt;
      
      //$LASTPOS=63010911;//kernel.Boot:10911
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=63010939;//kernel.Boot:10939
      if (wt<1) {
        //$LASTPOS=63010960;//kernel.Boot:10960
        if (wt<- 1000) {
          //$LASTPOS=63010974;//kernel.Boot:10974
          _this.resetDeadLine();
        }
        //$LASTPOS=63011000;//kernel.Boot:11000
        wt=1;
        
      }
      //$LASTPOS=63011018;//kernel.Boot:11018
      wt=_this.floor(wt);
      //$LASTPOS=63011037;//kernel.Boot:11037
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=63011070;//kernel.Boot:11070
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=63010911;//kernel.Boot:10911
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=63010939;//kernel.Boot:10939
      if (wt<1) {
        //$LASTPOS=63010960;//kernel.Boot:10960
        if (wt<- 1000) {
          //$LASTPOS=63010974;//kernel.Boot:10974
          _this.resetDeadLine();
        }
        //$LASTPOS=63011000;//kernel.Boot:11000
        wt=1;
        
      }
      //$LASTPOS=63011018;//kernel.Boot:11018
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=63011037;//kernel.Boot:11037
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=63011070;//kernel.Boot:11070
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
      
      //$LASTPOS=63011354;//kernel.Boot:11354
      _this._fps=fps;
      //$LASTPOS=63011371;//kernel.Boot:11371
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=63011406;//kernel.Boot:11406
        maxFrameSkip=5;
      }
      //$LASTPOS=63011427;//kernel.Boot:11427
      if (maxFrameSkip<=0) {
        //$LASTPOS=63011448;//kernel.Boot:11448
        maxFrameSkip=1;
      }
      //$LASTPOS=63011469;//kernel.Boot:11469
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=63011508;//kernel.Boot:11508
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
      
      //$LASTPOS=63011612;//kernel.Boot:11612
      if (v) {
        //$LASTPOS=63011630;//kernel.Boot:11630
        _this.rafProcNowTime=_this.now();
        
      } else {
        //$LASTPOS=63011675;//kernel.Boot:11675
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
      
      //$LASTPOS=63011913;//kernel.Boot:11913
      nowTime = _this.now();
      
      //$LASTPOS=63011939;//kernel.Boot:11939
      if (nowTime>=_this.lastMeasured+1000) {
        //$LASTPOS=63011982;//kernel.Boot:11982
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=63012011;//kernel.Boot:12011
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=63012040;//kernel.Boot:12040
        _this.fps_fpsCnt=0;
        //$LASTPOS=63012063;//kernel.Boot:12063
        _this.fps_rpsCnt=0;
        //$LASTPOS=63012086;//kernel.Boot:12086
        _this.lastMeasured=nowTime;
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"timeStop":{"nowait":false},"update":{"nowait":false},"initEvents":{"nowait":false},"initPeripherals":{"nowait":false},"initLayers":{"nowait":false},"debug":{"nowait":false},"loadPlugins":{"nowait":false},"loadImages":{"nowait":false},"loadSounds":{"nowait":false},"createMainObject":{"nowait":false},"loadPage":{"nowait":true},"stop":{"nowait":false},"hide":{"nowait":true},"schedule":{"nowait":false},"progress":{"nowait":false},"progressNoLog":{"nowait":false},"mainLoop":{"nowait":false},"loopRAF":{"nowait":false},"waitRAF":{"nowait":false},"loopTimer":{"nowait":false},"handlePause":{"nowait":false},"drawFrame":{"nowait":true},"moveFrame":{"nowait":true},"afterDraw":{"nowait":true},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"__getter__useRAF":{"nowait":true},"__setter__useRAF":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}},"fields":{"eventTypes":{},"cvj":{},"debugCnt":{},"newLimit":{},"mainClass":{},"_useRAF":{},"_fps":{},"subTime":{},"rafProcNowTime":{},"procCnt":{},"maxFrameSkip":{},"doDraw":{},"deadLine":{},"frameSkipped":{},"paused":{},"drawTime":{},"fps_fpsCnt":{},"newLimitCount":{},"moveTime":{},"fps_rpsCnt":{},"minFrameSkip":{},"frameCnt":{},"lastMeasured":{},"fps_fps":{},"fps_rps":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.FadeEffect',
  shortName: 'FadeEffect',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Panel,
  includes: [],
  methods: {
    main :function _trc_FadeEffect_main() {
      "use strict";
      var _this=this;
      
      
      
      
      //$LASTPOS=64000070;//kernel.FadeEffect:70
      _this.fillStyle = _this.fillStyle||"black";
      
      
      
      //$LASTPOS=64000159;//kernel.FadeEffect:159
      _this.duration = _this.duration||30;
      
      switch (_this.type) {
      case "in":
        //$LASTPOS=64000228;//kernel.FadeEffect:228
        _this.alpha=255;
        //$LASTPOS=64000238;//kernel.FadeEffect:238
        _this.alphaTo=0;
        break;
        
      case "out":
        //$LASTPOS=64000275;//kernel.FadeEffect:275
        _this.alpha=0;
        //$LASTPOS=64000283;//kernel.FadeEffect:283
        _this.alphaTo=255;
        break;
        
      }
      //$LASTPOS=64000304;//kernel.FadeEffect:304
      _this.fillRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=64000346;//kernel.FadeEffect:346
      _this.sa=_this.alpha;
      //$LASTPOS=64000356;//kernel.FadeEffect:356
      //$LASTPOS=64000361;//kernel.FadeEffect:361
      _this.i=0;for (; _this.i<_this.duration ; _this.i++) {
        {
          //$LASTPOS=64000387;//kernel.FadeEffect:387
          _this.progress=_this.i/(_this.duration-1);
          //$LASTPOS=64000416;//kernel.FadeEffect:416
          _this.alpha=_this.alphaTo*_this.progress+_this.sa*(1-_this.progress);
          //$LASTPOS=64000460;//kernel.FadeEffect:460
          _this.update();
        }
      }
      //$LASTPOS=64000472;//kernel.FadeEffect:472
      _this.sendEvent("complete");
      //$LASTPOS=64000495;//kernel.FadeEffect:495
      if (_this.page) {
        //$LASTPOS=64000511;//kernel.FadeEffect:511
        _this.loadPage(_this.page,_this.params||{});
        
      }
    },
    fiber$main :function _trc_FadeEffect_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      
      
      //$LASTPOS=64000070;//kernel.FadeEffect:70
      _this.fillStyle = _this.fillStyle||"black";
      
      
      
      //$LASTPOS=64000159;//kernel.FadeEffect:159
      _this.duration = _this.duration||30;
      
      switch (_this.type) {
      case "in":
        //$LASTPOS=64000228;//kernel.FadeEffect:228
        _this.alpha=255;
        //$LASTPOS=64000238;//kernel.FadeEffect:238
        _this.alphaTo=0;
        break;
        
      case "out":
        //$LASTPOS=64000275;//kernel.FadeEffect:275
        _this.alpha=0;
        //$LASTPOS=64000283;//kernel.FadeEffect:283
        _this.alphaTo=255;
        break;
        
      }
      //$LASTPOS=64000304;//kernel.FadeEffect:304
      _this.fillRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=64000346;//kernel.FadeEffect:346
      _this.sa=_this.alpha;
      
      _thread.enter(function _trc_FadeEffect_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=64000356;//kernel.FadeEffect:356
            //$LASTPOS=64000361;//kernel.FadeEffect:361
            _this.i=0;
          case 1:
            if (!(_this.i<_this.duration)) { __pc=4     ; break; }
            //$LASTPOS=64000387;//kernel.FadeEffect:387
            _this.progress=_this.i/(_this.duration-1);
            //$LASTPOS=64000416;//kernel.FadeEffect:416
            _this.alpha=_this.alphaTo*_this.progress+_this.sa*(1-_this.progress);
            //$LASTPOS=64000460;//kernel.FadeEffect:460
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3     :
            _this.i++;
            __pc=1;break;
          case 4     :
            
            //$LASTPOS=64000472;//kernel.FadeEffect:472
            _this.sendEvent("complete");
            //$LASTPOS=64000495;//kernel.FadeEffect:495
            if (_this.page) {
              //$LASTPOS=64000511;//kernel.FadeEffect:511
              _this.loadPage(_this.page,_this.params||{});
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__defaultLayer :function _trc_FadeEffect___getter__defaultLayer() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$frontLayer;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__defaultLayer":{"nowait":true}},"fields":{"type":{},"alphaTo":{},"alpha":{},"fillStyle":{},"page":{},"params":{},"duration":{},"sa":{},"i":{},"progress":{}}}
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
      
      //$LASTPOS=65000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=65000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=65000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=65000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=65000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=65000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=65000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=65000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=65000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=65000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=65000212;//kernel.DxChar:212
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=65000243;//kernel.DxChar:243
      _this.onDraw();
      //$LASTPOS=65000258;//kernel.DxChar:258
      _this.detectShape();
      //$LASTPOS=65000278;//kernel.DxChar:278
      _this.drawDxSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder,_this.angle,_this.alpha,_this.scaleX,_this.scaleY);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"angle":{}}}
});

//# sourceMappingURL=concat.js.map