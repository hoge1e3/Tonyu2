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
      
      //$LASTPOS=1000064;//kernel.EventHandlerCaller:64
      t;
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
      
      //$LASTPOS=1000064;//kernel.EventHandlerCaller:64
      t;
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
      while(i<a.length) {
        {
          //$LASTPOS=2000412;//kernel.EventMod:412
          res.args.push(a[i]);
        }
        i++;
      }
      return res;
    },
    registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000535;//kernel.EventMod:535
      _this.initEventMod();
      //$LASTPOS=2000555;//kernel.EventMod:555
      if (typeof  type=="function") {
        //$LASTPOS=2000594;//kernel.EventMod:594
        obj=obj||new type({target: _this});
        //$LASTPOS=2000634;//kernel.EventMod:634
        type=obj.getClassInfo().fullName;
        
      } else {
        //$LASTPOS=2000690;//kernel.EventMod:690
        obj=obj||new Tonyu.classes.kernel.EventHandler({target: _this});
        //$LASTPOS=2000740;//kernel.EventMod:740
        obj.target=_this;
        
      }
      return _this._eventHandlers[type]=obj;
    },
    getEventHandler :function _trc_EventMod_getEventHandler(type) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=2000908;//kernel.EventMod:908
      _this.initEventMod();
      //$LASTPOS=2000928;//kernel.EventMod:928
      if (typeof  type=="function") {
        //$LASTPOS=2000967;//kernel.EventMod:967
        type=type.meta.fullName;
        
      }
      //$LASTPOS=2001002;//kernel.EventMod:1002
      res = _this._eventHandlers[type];
      return res;
    },
    getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=2001098;//kernel.EventMod:1098
      res = _this.getEventHandler(type)||_this.registerEventHandler(type);
      return res;
    },
    on :function _trc_EventMod_on() {
      "use strict";
      var _this=this;
      var a;
      var h;
      
      //$LASTPOS=2001201;//kernel.EventMod:1201
      a = _this.parseArgs(arguments);
      //$LASTPOS=2001234;//kernel.EventMod:1234
      h = _this.getOrRegisterEventHandler(a.type);
      return h.addListener.apply(h,a.args);
    },
    fireEvent :function _trc_EventMod_fireEvent(type,arg) {
      "use strict";
      var _this=this;
      var h;
      
      //$LASTPOS=2001419;//kernel.EventMod:1419
      h = _this.getEventHandler(type);
      //$LASTPOS=2001453;//kernel.EventMod:1453
      if (h) {
        //$LASTPOS=2001460;//kernel.EventMod:1460
        h.fire([arg]);
      }
    },
    sendEvent :function _trc_EventMod_sendEvent(type,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2001515;//kernel.EventMod:1515
      _this.fireEvent(type,arg);
    },
    waitEvent :function _trc_EventMod_waitEvent() {
      "use strict";
      var _this=this;
      var args;
      var i;
      
      //$LASTPOS=2001562;//kernel.EventMod:1562
      if (null) {
        //$LASTPOS=2001586;//kernel.EventMod:1586
        args = [];
        //$LASTPOS=2001608;//kernel.EventMod:1608
        //$LASTPOS=2001613;//kernel.EventMod:1613
        i = 0;
        while(i<arguments.length) {
          {
            //$LASTPOS=2001660;//kernel.EventMod:1660
            if (arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=2001710;//kernel.EventMod:1710
            args.push(arguments[i]);
          }
          i++;
        }
        //$LASTPOS=2001755;//kernel.EventMod:1755
        null.waitEvent(_this,args);
        
      }
    },
    fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var args;
      var i;
      
      //$LASTPOS=2001562;//kernel.EventMod:1562
      if (_thread) {
        //$LASTPOS=2001586;//kernel.EventMod:1586
        args = [];
        //$LASTPOS=2001608;//kernel.EventMod:1608
        //$LASTPOS=2001613;//kernel.EventMod:1613
        i = 0;
        while(i<_arguments.length) {
          {
            //$LASTPOS=2001660;//kernel.EventMod:1660
            if (_arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=2001710;//kernel.EventMod:1710
            args.push(_arguments[i]);
          }
          i++;
        }
        //$LASTPOS=2001755;//kernel.EventMod:1755
        _thread.waitEvent(_this,args);
        
      }
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_EventMod_waitFor(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2001818;//kernel.EventMod:1818
      if (null) {
        //$LASTPOS=2001842;//kernel.EventMod:1842
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_EventMod_f_waitFor(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2001818;//kernel.EventMod:1818
      if (_thread) {
        //$LASTPOS=2001842;//kernel.EventMod:1842
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
    drawText :function _trc_OneframeSpriteMod_drawText(x,y,text,col,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000060;//kernel.OneframeSpriteMod:60
      if (! size) {
        //$LASTPOS=3000071;//kernel.OneframeSpriteMod:71
        size=15;
      }
      //$LASTPOS=3000085;//kernel.OneframeSpriteMod:85
      if (! col) {
        //$LASTPOS=3000095;//kernel.OneframeSpriteMod:95
        col="cyan";
      }
      //$LASTPOS=3000112;//kernel.OneframeSpriteMod:112
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size,oneframeSprite: true});
    },
    drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000217;//kernel.OneframeSpriteMod:217
      if (! col) {
        //$LASTPOS=3000227;//kernel.OneframeSpriteMod:227
        col="white";
      }
      //$LASTPOS=3000245;//kernel.OneframeSpriteMod:245
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col,oneframeSprite: true});
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true}}}
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
      
      //$LASTPOS=4000090;//kernel.TextRectMod:90
      if (! align) {
        //$LASTPOS=4000102;//kernel.TextRectMod:102
        align="center";
      }
      //$LASTPOS=4000123;//kernel.TextRectMod:123
      ctx.textBaseline="top";
      //$LASTPOS=4000152;//kernel.TextRectMod:152
      _this.setFontSize(ctx,h);
      //$LASTPOS=4000178;//kernel.TextRectMod:178
      met = ctx.measureText(text);
      //$LASTPOS=4000214;//kernel.TextRectMod:214
      res = {y: topY,w: met.width,h: h};
      //$LASTPOS=4000256;//kernel.TextRectMod:256
      t = align.substring(0,1).toLowerCase();
      //$LASTPOS=4000303;//kernel.TextRectMod:303
      if (t=="l") {
        //$LASTPOS=4000315;//kernel.TextRectMod:315
        res.x=x;
      } else {
        //$LASTPOS=4000334;//kernel.TextRectMod:334
        if (t=="r") {
          //$LASTPOS=4000346;//kernel.TextRectMod:346
          res.x=x-met.width;
        } else {
          //$LASTPOS=4000375;//kernel.TextRectMod:375
          if (t=="c") {
            //$LASTPOS=4000387;//kernel.TextRectMod:387
            res.x=x-met.width/2;
          }
        }
      }
      //$LASTPOS=4000413;//kernel.TextRectMod:413
      if (type=="fill") {
        //$LASTPOS=4000431;//kernel.TextRectMod:431
        ctx.fillText(text,res.x,topY);
      }
      //$LASTPOS=4000468;//kernel.TextRectMod:468
      if (type=="stroke") {
        //$LASTPOS=4000488;//kernel.TextRectMod:488
        ctx.strokeText(text,res.x,topY);
      }
      return res;
    },
    setFontSize :function _trc_TextRectMod_setFontSize(ctx,sz) {
      "use strict";
      var _this=this;
      var post;
      
      //$LASTPOS=4000586;//kernel.TextRectMod:586
      post = ctx.font.replace(/^[0-9\.]+/,"");
      //$LASTPOS=4000634;//kernel.TextRectMod:634
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
      
      //$LASTPOS=4000712;//kernel.TextRectMod:712
      align = "c";
      //$LASTPOS=4000732;//kernel.TextRectMod:732
      theight = 20;
      //$LASTPOS=4000753;//kernel.TextRectMod:753
      margin = 5;
      //$LASTPOS=4000772;//kernel.TextRectMod:772
      r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
      //$LASTPOS=4000842;//kernel.TextRectMod:842
      ctx.beginPath();
      //$LASTPOS=4000864;//kernel.TextRectMod:864
      ctx.moveTo(x,y);
      //$LASTPOS=4000888;//kernel.TextRectMod:888
      ctx.lineTo(x+margin,y-theight);
      //$LASTPOS=4000927;//kernel.TextRectMod:927
      ctx.lineTo(x+r.w/2+margin,y-theight);
      //$LASTPOS=4000972;//kernel.TextRectMod:972
      ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
      //$LASTPOS=4001030;//kernel.TextRectMod:1030
      ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
      //$LASTPOS=4001088;//kernel.TextRectMod:1088
      ctx.lineTo(x-r.w/2-margin,y-theight);
      //$LASTPOS=4001133;//kernel.TextRectMod:1133
      ctx.lineTo(x-margin,y-theight);
      //$LASTPOS=4001172;//kernel.TextRectMod:1172
      ctx.closePath();
      //$LASTPOS=4001194;//kernel.TextRectMod:1194
      ctx.fill();
      //$LASTPOS=4001211;//kernel.TextRectMod:1211
      ctx.stroke();
      //$LASTPOS=4001236;//kernel.TextRectMod:1236
      fs = ctx.fillStyle;
      //$LASTPOS=4001263;//kernel.TextRectMod:1263
      ctx.fillStyle=ctx.strokeStyle;
      //$LASTPOS=4001299;//kernel.TextRectMod:1299
      _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
      //$LASTPOS=4001372;//kernel.TextRectMod:1372
      ctx.fillStyle=fs;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}
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
    atan2 :function _trc_MathMod_atan2(x,y) {
      "use strict";
      var _this=this;
      
      return _this.deg(Math.atan2(x,y));
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
      
      //$LASTPOS=5000436;//kernel.MathMod:436
      c;
      //$LASTPOS=5000448;//kernel.MathMod:448
      a=_this.floor(a);
      //$LASTPOS=5000465;//kernel.MathMod:465
      b=_this.floor(b);
      //$LASTPOS=5000482;//kernel.MathMod:482
      if (a>=b) {
        //$LASTPOS=5000503;//kernel.MathMod:503
        c=(a-b)%360;
        //$LASTPOS=5000527;//kernel.MathMod:527
        if (c>=180) {
          //$LASTPOS=5000539;//kernel.MathMod:539
          c-=360;
        }
        
      } else {
        //$LASTPOS=5000570;//kernel.MathMod:570
        c=- ((b-a)%360);
        //$LASTPOS=5000597;//kernel.MathMod:597
        if (c<- 180) {
          //$LASTPOS=5000609;//kernel.MathMod:609
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
      
      //$LASTPOS=5000718;//kernel.MathMod:718
      if (typeof  dx=="object") {
        //$LASTPOS=5000754;//kernel.MathMod:754
        t = dx;
        //$LASTPOS=5000773;//kernel.MathMod:773
        dx=t.x-_this.x;
        //$LASTPOS=5000782;//kernel.MathMod:782
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=5000858;//kernel.MathMod:858
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
      
      //$LASTPOS=5000995;//kernel.MathMod:995
      if (typeof  r=="number") {
        return Math.floor(Math.random()*r);
        
      }
      return Math.random();
    },
    parseFloat :function _trc_MathMod_parseFloat(s) {
      "use strict";
      var _this=this;
      
      return parseFloat(s);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true},"parseFloat":{"nowait":true}}}
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
      
      //$LASTPOS=6000037;//kernel.T2Mod:37
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=6000037;//kernel.T2Mod:37
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
    addThread :function _trc_ThreadGroupMod_addThread(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000038;//kernel.ThreadGroupMod:38
      _this.threads=_this.threads||[];
      //$LASTPOS=7000064;//kernel.ThreadGroupMod:64
      _this.threads.push(t);
    },
    fiber$addThread :function _trc_ThreadGroupMod_f_addThread(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000038;//kernel.ThreadGroupMod:38
      _this.threads=_this.threads||[];
      //$LASTPOS=7000064;//kernel.ThreadGroupMod:64
      _this.threads.push(t);
      
      _thread.retVal=_this;return;
    },
    addThreadGroup :function _trc_ThreadGroupMod_addThreadGroup(tg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000112;//kernel.ThreadGroupMod:112
      _this.threadGroups=_this.threadGroups||[];
      //$LASTPOS=7000148;//kernel.ThreadGroupMod:148
      _this.threadGroups.push(tg);
    },
    fiber$addThreadGroup :function _trc_ThreadGroupMod_f_addThreadGroup(_thread,tg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000112;//kernel.ThreadGroupMod:112
      _this.threadGroups=_this.threadGroups||[];
      //$LASTPOS=7000148;//kernel.ThreadGroupMod:148
      _this.threadGroups.push(tg);
      
      _thread.retVal=_this;return;
    },
    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
      "use strict";
      var _this=this;
      var thread;
      var _it_27;
      var threadGroup;
      var _it_28;
      
      //$LASTPOS=7000201;//kernel.ThreadGroupMod:201
      if (_this.threads) {
        //$LASTPOS=7000225;//kernel.ThreadGroupMod:225
        _it_27=Tonyu.iterator(_this.threads,1);
        while(_it_27.next()) {
          thread=_it_27[0];
          
          //$LASTPOS=7000268;//kernel.ThreadGroupMod:268
          thread.kill();
          
        }
        
      }
      //$LASTPOS=7000306;//kernel.ThreadGroupMod:306
      if (_this.threadGroups) {
        //$LASTPOS=7000335;//kernel.ThreadGroupMod:335
        _it_28=Tonyu.iterator(_this.threadGroups,1);
        while(_it_28.next()) {
          threadGroup=_it_28[0];
          
          //$LASTPOS=7000388;//kernel.ThreadGroupMod:388
          threadGroup.killThreadGroup();
          
        }
        
      }
    },
    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var thread;
      var _it_27;
      var threadGroup;
      var _it_28;
      
      //$LASTPOS=7000201;//kernel.ThreadGroupMod:201
      if (_this.threads) {
        //$LASTPOS=7000225;//kernel.ThreadGroupMod:225
        _it_27=Tonyu.iterator(_this.threads,1);
        while(_it_27.next()) {
          thread=_it_27[0];
          
          //$LASTPOS=7000268;//kernel.ThreadGroupMod:268
          thread.kill();
          
        }
        
      }
      //$LASTPOS=7000306;//kernel.ThreadGroupMod:306
      if (_this.threadGroups) {
        //$LASTPOS=7000335;//kernel.ThreadGroupMod:335
        _it_28=Tonyu.iterator(_this.threadGroups,1);
        while(_it_28.next()) {
          threadGroup=_it_28[0];
          
          //$LASTPOS=7000388;//kernel.ThreadGroupMod:388
          threadGroup.killThreadGroup();
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addThread":{"nowait":false},"addThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}}}
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
      
      //$LASTPOS=8000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=8000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=8000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=8000123;//kernel.TObject:123
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
      
      //$LASTPOS=9000052;//kernel.TQuery:52
      _this.length=0;
    },
    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=9000095;//kernel.TQuery:95
      res = {};
      //$LASTPOS=9000112;//kernel.TQuery:112
      res.i=0;
      //$LASTPOS=9000126;//kernel.TQuery:126
      if (arity==1) {
        //$LASTPOS=9000151;//kernel.TQuery:151
        res.next=(function anonymous_160() {
          
          //$LASTPOS=9000187;//kernel.TQuery:187
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=9000238;//kernel.TQuery:238
          res[0]=_this[res.i];
          //$LASTPOS=9000271;//kernel.TQuery:271
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=9000341;//kernel.TQuery:341
        res.next=(function anonymous_350() {
          
          //$LASTPOS=9000377;//kernel.TQuery:377
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=9000428;//kernel.TQuery:428
          res[0]=res.i;
          //$LASTPOS=9000455;//kernel.TQuery:455
          res[1]=_this[res.i];
          //$LASTPOS=9000488;//kernel.TQuery:488
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
      
      //$LASTPOS=9000095;//kernel.TQuery:95
      res = {};
      //$LASTPOS=9000112;//kernel.TQuery:112
      res.i=0;
      //$LASTPOS=9000126;//kernel.TQuery:126
      if (arity==1) {
        //$LASTPOS=9000151;//kernel.TQuery:151
        res.next=(function anonymous_160() {
          
          //$LASTPOS=9000187;//kernel.TQuery:187
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=9000238;//kernel.TQuery:238
          res[0]=_this[res.i];
          //$LASTPOS=9000271;//kernel.TQuery:271
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=9000341;//kernel.TQuery:341
        res.next=(function anonymous_350() {
          
          //$LASTPOS=9000377;//kernel.TQuery:377
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=9000428;//kernel.TQuery:428
          res[0]=res.i;
          //$LASTPOS=9000455;//kernel.TQuery:455
          res[1]=_this[res.i];
          //$LASTPOS=9000488;//kernel.TQuery:488
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
      var _it_34;
      
      //$LASTPOS=9000578;//kernel.TQuery:578
      values;
      //$LASTPOS=9000595;//kernel.TQuery:595
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=9000623;//kernel.TQuery:623
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=9000734;//kernel.TQuery:734
      if (arguments.length>=2) {
        //$LASTPOS=9000770;//kernel.TQuery:770
        values={};
        //$LASTPOS=9000790;//kernel.TQuery:790
        //$LASTPOS=9000795;//kernel.TQuery:795
        i = 0;
        while(i<arguments.length-1) {
          {
            //$LASTPOS=9000848;//kernel.TQuery:848
            values[arguments[i]]=arguments[i+1];
          }
          i+=2;
        }
        
      } else {
        //$LASTPOS=9000919;//kernel.TQuery:919
        values=arguments[0];
        
      }
      //$LASTPOS=9000952;//kernel.TQuery:952
      if (values) {
        //$LASTPOS=9000975;//kernel.TQuery:975
        _it_34=Tonyu.iterator(_this,1);
        while(_it_34.next()) {
          e=_it_34[0];
          
          //$LASTPOS=9001010;//kernel.TQuery:1010
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
      var _it_34;
      
      //$LASTPOS=9000578;//kernel.TQuery:578
      values;
      //$LASTPOS=9000595;//kernel.TQuery:595
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=9000623;//kernel.TQuery:623
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=9000734;//kernel.TQuery:734
      if (_arguments.length>=2) {
        //$LASTPOS=9000770;//kernel.TQuery:770
        values={};
        //$LASTPOS=9000790;//kernel.TQuery:790
        //$LASTPOS=9000795;//kernel.TQuery:795
        i = 0;
        while(i<_arguments.length-1) {
          {
            //$LASTPOS=9000848;//kernel.TQuery:848
            values[_arguments[i]]=_arguments[i+1];
          }
          i+=2;
        }
        
      } else {
        //$LASTPOS=9000919;//kernel.TQuery:919
        values=_arguments[0];
        
      }
      //$LASTPOS=9000952;//kernel.TQuery:952
      if (values) {
        //$LASTPOS=9000975;//kernel.TQuery:975
        _it_34=Tonyu.iterator(_this,1);
        while(_it_34.next()) {
          e=_it_34[0];
          
          //$LASTPOS=9001010;//kernel.TQuery:1010
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9001075;//kernel.TQuery:1075
      if (typeof  key!="function") {
        return (function anonymous_1121(o) {
          
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
      
      //$LASTPOS=9001075;//kernel.TQuery:1075
      if (typeof  key!="function") {
        _thread.retVal=(function anonymous_1121(o) {
          
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
      var _it_40;
      var v;
      
      //$LASTPOS=9001208;//kernel.TQuery:1208
      f = _this.genKeyfunc(key);
      //$LASTPOS=9001236;//kernel.TQuery:1236
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=9001266;//kernel.TQuery:1266
      _it_40=Tonyu.iterator(_this,1);
      while(_it_40.next()) {
        o=_it_40[0];
        
        //$LASTPOS=9001297;//kernel.TQuery:1297
        v = f(o);
        //$LASTPOS=9001318;//kernel.TQuery:1318
        if (res==null||v>=res) {
          //$LASTPOS=9001358;//kernel.TQuery:1358
          if (v>res) {
            //$LASTPOS=9001369;//kernel.TQuery:1369
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=9001399;//kernel.TQuery:1399
          reso.push(o);
          //$LASTPOS=9001426;//kernel.TQuery:1426
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
      var _it_40;
      var v;
      
      //$LASTPOS=9001208;//kernel.TQuery:1208
      f = _this.genKeyfunc(key);
      //$LASTPOS=9001236;//kernel.TQuery:1236
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=9001266;//kernel.TQuery:1266
      _it_40=Tonyu.iterator(_this,1);
      while(_it_40.next()) {
        o=_it_40[0];
        
        //$LASTPOS=9001297;//kernel.TQuery:1297
        v = f(o);
        //$LASTPOS=9001318;//kernel.TQuery:1318
        if (res==null||v>=res) {
          //$LASTPOS=9001358;//kernel.TQuery:1358
          if (v>res) {
            //$LASTPOS=9001369;//kernel.TQuery:1369
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=9001399;//kernel.TQuery:1399
          reso.push(o);
          //$LASTPOS=9001426;//kernel.TQuery:1426
          res=v;
          
        }
        
      }
      _thread.retVal=reso;return;
      
      
      _thread.retVal=_this;return;
    },
    mins :function _trc_TQuery_mins(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var reso;
      var o;
      var _it_47;
      var v;
      
      //$LASTPOS=9001491;//kernel.TQuery:1491
      f = _this.genKeyfunc(key);
      //$LASTPOS=9001519;//kernel.TQuery:1519
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=9001549;//kernel.TQuery:1549
      _it_47=Tonyu.iterator(_this,1);
      while(_it_47.next()) {
        o=_it_47[0];
        
        //$LASTPOS=9001580;//kernel.TQuery:1580
        v = f(o);
        //$LASTPOS=9001601;//kernel.TQuery:1601
        if (res==null||v<=res) {
          //$LASTPOS=9001641;//kernel.TQuery:1641
          if (v<res) {
            //$LASTPOS=9001652;//kernel.TQuery:1652
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=9001682;//kernel.TQuery:1682
          reso.push(o);
          //$LASTPOS=9001709;//kernel.TQuery:1709
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
      var _it_47;
      var v;
      
      //$LASTPOS=9001491;//kernel.TQuery:1491
      f = _this.genKeyfunc(key);
      //$LASTPOS=9001519;//kernel.TQuery:1519
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=9001549;//kernel.TQuery:1549
      _it_47=Tonyu.iterator(_this,1);
      while(_it_47.next()) {
        o=_it_47[0];
        
        //$LASTPOS=9001580;//kernel.TQuery:1580
        v = f(o);
        //$LASTPOS=9001601;//kernel.TQuery:1601
        if (res==null||v<=res) {
          //$LASTPOS=9001641;//kernel.TQuery:1641
          if (v<res) {
            //$LASTPOS=9001652;//kernel.TQuery:1652
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=9001682;//kernel.TQuery:1682
          reso.push(o);
          //$LASTPOS=9001709;//kernel.TQuery:1709
          res=v;
          
        }
        
      }
      _thread.retVal=reso;return;
      
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=9001868;//kernel.TQuery:1868
      if (typeof  x=="object") {
        //$LASTPOS=9001893;//kernel.TQuery:1893
        y=x.y;
        //$LASTPOS=9001899;//kernel.TQuery:1899
        x=x.x;
        
      }
      return _this.mins((function anonymous_1924(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));
    },
    fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9001868;//kernel.TQuery:1868
      if (typeof  x=="object") {
        //$LASTPOS=9001893;//kernel.TQuery:1893
        y=x.y;
        //$LASTPOS=9001899;//kernel.TQuery:1899
        x=x.x;
        
      }
      _thread.retVal=_this.mins((function anonymous_1924(o) {
        
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
      
      //$LASTPOS=9002053;//kernel.TQuery:2053
      x;y;
      //$LASTPOS=9002067;//kernel.TQuery:2067
      if (typeof  xo=="object") {
        //$LASTPOS=9002103;//kernel.TQuery:2103
        x=xo.x;
        //$LASTPOS=9002110;//kernel.TQuery:2110
        y=xo.y;
        //$LASTPOS=9002117;//kernel.TQuery:2117
        d=yd;
        
      } else {
        //$LASTPOS=9002146;//kernel.TQuery:2146
        x=xo;
        //$LASTPOS=9002151;//kernel.TQuery:2151
        y=yd;
        
      }
      return _this.find((function anonymous_2181(o) {
        
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
      
      //$LASTPOS=9002053;//kernel.TQuery:2053
      x;y;
      //$LASTPOS=9002067;//kernel.TQuery:2067
      if (typeof  xo=="object") {
        //$LASTPOS=9002103;//kernel.TQuery:2103
        x=xo.x;
        //$LASTPOS=9002110;//kernel.TQuery:2110
        y=xo.y;
        //$LASTPOS=9002117;//kernel.TQuery:2117
        d=yd;
        
      } else {
        //$LASTPOS=9002146;//kernel.TQuery:2146
        x=xo;
        //$LASTPOS=9002151;//kernel.TQuery:2151
        y=yd;
        
      }
      _thread.retVal=_this.find((function anonymous_2181(o) {
        
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
      var _it_58;
      var v;
      
      //$LASTPOS=9002320;//kernel.TQuery:2320
      f = _this.genKeyfunc(key);
      //$LASTPOS=9002348;//kernel.TQuery:2348
      res;
      //$LASTPOS=9002362;//kernel.TQuery:2362
      _it_58=Tonyu.iterator(_this,1);
      while(_it_58.next()) {
        o=_it_58[0];
        
        //$LASTPOS=9002393;//kernel.TQuery:2393
        v = f(o);
        //$LASTPOS=9002414;//kernel.TQuery:2414
        if (res==null||v>res) {
          //$LASTPOS=9002438;//kernel.TQuery:2438
          res=v;
        }
        
      }
      return res;
    },
    fiber$max :function _trc_TQuery_f_max(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var o;
      var _it_58;
      var v;
      
      //$LASTPOS=9002320;//kernel.TQuery:2320
      f = _this.genKeyfunc(key);
      //$LASTPOS=9002348;//kernel.TQuery:2348
      res;
      //$LASTPOS=9002362;//kernel.TQuery:2362
      _it_58=Tonyu.iterator(_this,1);
      while(_it_58.next()) {
        o=_it_58[0];
        
        //$LASTPOS=9002393;//kernel.TQuery:2393
        v = f(o);
        //$LASTPOS=9002414;//kernel.TQuery:2414
        if (res==null||v>res) {
          //$LASTPOS=9002438;//kernel.TQuery:2438
          res=v;
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    min :function _trc_TQuery_min(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var o;
      var _it_64;
      var v;
      
      //$LASTPOS=9002490;//kernel.TQuery:2490
      f = _this.genKeyfunc(key);
      //$LASTPOS=9002518;//kernel.TQuery:2518
      res;
      //$LASTPOS=9002532;//kernel.TQuery:2532
      _it_64=Tonyu.iterator(_this,1);
      while(_it_64.next()) {
        o=_it_64[0];
        
        //$LASTPOS=9002563;//kernel.TQuery:2563
        v = f(o);
        //$LASTPOS=9002584;//kernel.TQuery:2584
        if (res==null||v<res) {
          //$LASTPOS=9002608;//kernel.TQuery:2608
          res=v;
        }
        
      }
      return res;
    },
    fiber$min :function _trc_TQuery_f_min(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var o;
      var _it_64;
      var v;
      
      //$LASTPOS=9002490;//kernel.TQuery:2490
      f = _this.genKeyfunc(key);
      //$LASTPOS=9002518;//kernel.TQuery:2518
      res;
      //$LASTPOS=9002532;//kernel.TQuery:2532
      _it_64=Tonyu.iterator(_this,1);
      while(_it_64.next()) {
        o=_it_64[0];
        
        //$LASTPOS=9002563;//kernel.TQuery:2563
        v = f(o);
        //$LASTPOS=9002584;//kernel.TQuery:2584
        if (res==null||v<res) {
          //$LASTPOS=9002608;//kernel.TQuery:2608
          res=v;
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    push :function _trc_TQuery_push(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9002659;//kernel.TQuery:2659
      _this[_this.length]=e;
      //$LASTPOS=9002680;//kernel.TQuery:2680
      _this.length++;
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9002659;//kernel.TQuery:2659
      _this[_this.length]=e;
      //$LASTPOS=9002680;//kernel.TQuery:2680
      _this.length++;
      
      _thread.retVal=_this;return;
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
      var _it_70;
      
      //$LASTPOS=9002736;//kernel.TQuery:2736
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=9002760;//kernel.TQuery:2760
      _it_70=Tonyu.iterator(_this,1);
      while(_it_70.next()) {
        o=_it_70[0];
        
        //$LASTPOS=9002791;//kernel.TQuery:2791
        if (f(o)) {
          //$LASTPOS=9002801;//kernel.TQuery:2801
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
      var _it_70;
      
      //$LASTPOS=9002736;//kernel.TQuery:2736
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=9002760;//kernel.TQuery:2760
      _it_70=Tonyu.iterator(_this,1);
      while(_it_70.next()) {
        o=_it_70[0];
        
        //$LASTPOS=9002791;//kernel.TQuery:2791
        if (f(o)) {
          //$LASTPOS=9002801;//kernel.TQuery:2801
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
      var _it_74;
      var f;
      
      //$LASTPOS=9002907;//kernel.TQuery:2907
      res;
      //$LASTPOS=9002921;//kernel.TQuery:2921
      if (! args) {
        //$LASTPOS=9002932;//kernel.TQuery:2932
        args=[];
      }
      //$LASTPOS=9002946;//kernel.TQuery:2946
      _it_74=Tonyu.iterator(_this,1);
      while(_it_74.next()) {
        o=_it_74[0];
        
        //$LASTPOS=9002977;//kernel.TQuery:2977
        f = o[name];
        //$LASTPOS=9003001;//kernel.TQuery:3001
        if (typeof  f=="function") {
          //$LASTPOS=9003042;//kernel.TQuery:3042
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
      var _it_74;
      var f;
      
      //$LASTPOS=9002907;//kernel.TQuery:2907
      res;
      //$LASTPOS=9002921;//kernel.TQuery:2921
      if (! args) {
        //$LASTPOS=9002932;//kernel.TQuery:2932
        args=[];
      }
      //$LASTPOS=9002946;//kernel.TQuery:2946
      _it_74=Tonyu.iterator(_this,1);
      while(_it_74.next()) {
        o=_it_74[0];
        
        //$LASTPOS=9002977;//kernel.TQuery:2977
        f = o[name];
        //$LASTPOS=9003001;//kernel.TQuery:3001
        if (typeof  f=="function") {
          //$LASTPOS=9003042;//kernel.TQuery:3042
          res=f.apply(o,args);
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    alive :function _trc_TQuery_alive() {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_3187(o) {
        
        return ! o.isDead();
      }));
    },
    fiber$alive :function _trc_TQuery_f_alive(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3187(o) {
        
        return ! o.isDead();
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_TQuery_die() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=9003249;//kernel.TQuery:3249
      a = _this.alive();
      //$LASTPOS=9003269;//kernel.TQuery:3269
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=9003305;//kernel.TQuery:3305
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=9003249;//kernel.TQuery:3249
      a = _this.alive();
      //$LASTPOS=9003269;//kernel.TQuery:3269
      if (a.length==0) {
        _thread.retVal=false;return;
        
      }
      //$LASTPOS=9003305;//kernel.TQuery:3305
      a.apply("die");
      _thread.retVal=true;return;
      
      
      _thread.retVal=_this;return;
    },
    klass :function _trc_TQuery_klass(k) {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_3374(o) {
        
        return o instanceof k;
      }));
    },
    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3374(o) {
        
        return o instanceof k;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}
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
      
      //$LASTPOS=10000069;//kernel.DialogMod:69
      r;
      //$LASTPOS=10000078;//kernel.DialogMod:78
      r=_this.waitFor(UIDiag.prompt(mesg,val));
      return r;
    },
    fiber$prompt :function _trc_DialogMod_f_prompt(_thread,mesg,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      //$LASTPOS=10000069;//kernel.DialogMod:69
      r;
      
      _thread.enter(function _trc_DialogMod_ent_prompt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000078;//kernel.DialogMod:78
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
      
      //$LASTPOS=10000161;//kernel.DialogMod:161
      r;
      //$LASTPOS=10000173;//kernel.DialogMod:173
      r=_this.prompt(mesg,val);
      return _this.parseFloat(r);
    },
    fiber$promptNumber :function _trc_DialogMod_f_promptNumber(_thread,mesg,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      //$LASTPOS=10000161;//kernel.DialogMod:161
      r;
      
      _thread.enter(function _trc_DialogMod_ent_promptNumber(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000173;//kernel.DialogMod:173
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
      
      //$LASTPOS=10000246;//kernel.DialogMod:246
      r;
      //$LASTPOS=10000255;//kernel.DialogMod:255
      r=_this.waitFor(UIDiag.confirm(mesg));
      return r;
    },
    fiber$confirm :function _trc_DialogMod_f_confirm(_thread,mesg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      //$LASTPOS=10000246;//kernel.DialogMod:246
      r;
      
      _thread.enter(function _trc_DialogMod_ent_confirm(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000255;//kernel.DialogMod:255
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
      
      //$LASTPOS=10000324;//kernel.DialogMod:324
      r;
      //$LASTPOS=10000333;//kernel.DialogMod:333
      r=_this.waitFor(UIDiag.alert(mesg));
      return r;
    },
    fiber$alert :function _trc_DialogMod_f_alert(_thread,mesg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      //$LASTPOS=10000324;//kernel.DialogMod:324
      r;
      
      _thread.enter(function _trc_DialogMod_ent_alert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000333;//kernel.DialogMod:333
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
      
      //$LASTPOS=11000091;//kernel.InputDevice:91
      _this.listeners=[];
      //$LASTPOS=11000110;//kernel.InputDevice:110
      _this.touchEmu=true;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      "use strict";
      var _this=this;
      var l;
      
      //$LASTPOS=11000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=11000177;//kernel.InputDevice:177
      _this.listeners=[];
      //$LASTPOS=11000196;//kernel.InputDevice:196
      while (l.length>0) {
        //$LASTPOS=11000217;//kernel.InputDevice:217
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=11000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=11000177;//kernel.InputDevice:177
      _this.listeners=[];
      
      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000196;//kernel.InputDevice:196
          case 1:
            if (!(l.length>0)) { __pc=2; break; }
            {
              //$LASTPOS=11000217;//kernel.InputDevice:217
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
      
      //$LASTPOS=11000267;//kernel.InputDevice:267
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11000267;//kernel.InputDevice:267
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
      
      //$LASTPOS=11000320;//kernel.InputDevice:320
      cv = cvj[0];
      //$LASTPOS=11000340;//kernel.InputDevice:340
      Tonyu.globals.$handleMouse=(function anonymous_353(e) {
        var p;
        var mp;
        
        //$LASTPOS=11000369;//kernel.InputDevice:369
        p = cvj.offset();
        //$LASTPOS=11000398;//kernel.InputDevice:398
        mp = {x: e.clientX-p.left,y: e.clientY-p.top};
        //$LASTPOS=11000455;//kernel.InputDevice:455
        mp=Tonyu.globals.$Screen.canvas2buf(mp);
        //$LASTPOS=11000491;//kernel.InputDevice:491
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=11000514;//kernel.InputDevice:514
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=11000537;//kernel.InputDevice:537
        if (_this.touchEmu) {
          //$LASTPOS=11000566;//kernel.InputDevice:566
          Tonyu.globals.$touches[0].x=mp.x;
          //$LASTPOS=11000599;//kernel.InputDevice:599
          Tonyu.globals.$touches[0].y=mp.y;
          
        }
        //$LASTPOS=11000639;//kernel.InputDevice:639
        _this.handleListeners();
      });
      //$LASTPOS=11000671;//kernel.InputDevice:671
      Tonyu.globals.$touches=[{},{},{},{},{}];
      //$LASTPOS=11000703;//kernel.InputDevice:703
      Tonyu.globals.$touches.findById=(function anonymous_721(id) {
        var j;
        
        //$LASTPOS=11000738;//kernel.InputDevice:738
        //$LASTPOS=11000743;//kernel.InputDevice:743
        j = 0;
        while(j<Tonyu.globals.$touches.length) {
          {
            //$LASTPOS=11000793;//kernel.InputDevice:793
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
          j++;
        }
      });
      //$LASTPOS=11000903;//kernel.InputDevice:903
      Tonyu.globals.$handleTouch=(function anonymous_916(e) {
        var p;
        var ts;
        var i;
        var src;
        var dst;
        var j;
        
        //$LASTPOS=11000932;//kernel.InputDevice:932
        _this.touchEmu=false;
        //$LASTPOS=11000957;//kernel.InputDevice:957
        p = cvj.offset();
        //$LASTPOS=11000986;//kernel.InputDevice:986
        e.preventDefault();
        //$LASTPOS=11001015;//kernel.InputDevice:1015
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=11001063;//kernel.InputDevice:1063
        //$LASTPOS=11001068;//kernel.InputDevice:1068
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=11001113;//kernel.InputDevice:1113
            src = ts[i];
            //$LASTPOS=11001141;//kernel.InputDevice:1141
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=11001197;//kernel.InputDevice:1197
            if (! dst) {
              //$LASTPOS=11001226;//kernel.InputDevice:1226
              //$LASTPOS=11001231;//kernel.InputDevice:1231
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=11001289;//kernel.InputDevice:1289
                  if (! Tonyu.globals.$touches[j].touched) {
                    //$LASTPOS=11001342;//kernel.InputDevice:1342
                    dst=Tonyu.globals.$touches[j];
                    //$LASTPOS=11001384;//kernel.InputDevice:1384
                    dst.identifier=src.identifier;
                    break;
                    
                    
                  }
                }
                j++;
              }
              
            }
            //$LASTPOS=11001517;//kernel.InputDevice:1517
            if (dst) {
              //$LASTPOS=11001545;//kernel.InputDevice:1545
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
              //$LASTPOS=11001606;//kernel.InputDevice:1606
              _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
              //$LASTPOS=11001650;//kernel.InputDevice:1650
              dst.x=_this.mp.x;
              //$LASTPOS=11001679;//kernel.InputDevice:1679
              dst.y=_this.mp.y;
              //$LASTPOS=11001708;//kernel.InputDevice:1708
              if (! dst.touched) {
                //$LASTPOS=11001725;//kernel.InputDevice:1725
                dst.touched=1;
              }
              
            }
          }
          i++;
        }
        //$LASTPOS=11001775;//kernel.InputDevice:1775
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=11001807;//kernel.InputDevice:1807
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=11001839;//kernel.InputDevice:1839
        _this.handleListeners();
      });
      //$LASTPOS=11001871;//kernel.InputDevice:1871
      Tonyu.globals.$handleTouchEnd=(function anonymous_1887(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=11001903;//kernel.InputDevice:1903
        T2MediaLib.activate();
        //$LASTPOS=11001935;//kernel.InputDevice:1935
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=11001983;//kernel.InputDevice:1983
        //$LASTPOS=11001988;//kernel.InputDevice:1988
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=11002033;//kernel.InputDevice:2033
            src = ts[i];
            //$LASTPOS=11002061;//kernel.InputDevice:2061
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=11002117;//kernel.InputDevice:2117
            if (dst) {
              //$LASTPOS=11002145;//kernel.InputDevice:2145
              dst.touched=0;
              //$LASTPOS=11002177;//kernel.InputDevice:2177
              dst.identifier=- 1;
              
            }
          }
          i++;
        }
        //$LASTPOS=11002231;//kernel.InputDevice:2231
        _this.handleListeners();
      });
      //$LASTPOS=11002263;//kernel.InputDevice:2263
      handleMouse = (function anonymous_2279(e) {
        
        //$LASTPOS=11002284;//kernel.InputDevice:2284
        Tonyu.globals.$handleMouse(e);
      });
      //$LASTPOS=11002308;//kernel.InputDevice:2308
      handleTouch = (function anonymous_2324(e) {
        
        //$LASTPOS=11002329;//kernel.InputDevice:2329
        Tonyu.globals.$handleTouch(e);
      });
      //$LASTPOS=11002353;//kernel.InputDevice:2353
      handleTouchEnd = (function anonymous_2372(e) {
        
        //$LASTPOS=11002377;//kernel.InputDevice:2377
        Tonyu.globals.$handleTouchEnd(e);
      });
      //$LASTPOS=11002404;//kernel.InputDevice:2404
      d = $.data(cv,"events");
      //$LASTPOS=11002436;//kernel.InputDevice:2436
      if (! d) {
        //$LASTPOS=11002455;//kernel.InputDevice:2455
        $.data(cv,"events","true");
        //$LASTPOS=11002492;//kernel.InputDevice:2492
        cvj.mousedown(handleMouse);
        //$LASTPOS=11002529;//kernel.InputDevice:2529
        cvj.mousemove(handleMouse);
        //$LASTPOS=11002566;//kernel.InputDevice:2566
        cvj.on("touchstart",handleTouch);
        //$LASTPOS=11002609;//kernel.InputDevice:2609
        cvj.on("touchmove",handleTouch);
        //$LASTPOS=11002651;//kernel.InputDevice:2651
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
      
      //$LASTPOS=11000320;//kernel.InputDevice:320
      cv = cvj[0];
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000340;//kernel.InputDevice:340
            Tonyu.globals.$handleMouse=(function anonymous_353(e) {
              var p;
              var mp;
              
              //$LASTPOS=11000369;//kernel.InputDevice:369
              p = cvj.offset();
              //$LASTPOS=11000398;//kernel.InputDevice:398
              mp = {x: e.clientX-p.left,y: e.clientY-p.top};
              //$LASTPOS=11000455;//kernel.InputDevice:455
              mp=Tonyu.globals.$Screen.canvas2buf(mp);
              //$LASTPOS=11000491;//kernel.InputDevice:491
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=11000514;//kernel.InputDevice:514
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=11000537;//kernel.InputDevice:537
              if (_this.touchEmu) {
                //$LASTPOS=11000566;//kernel.InputDevice:566
                Tonyu.globals.$touches[0].x=mp.x;
                //$LASTPOS=11000599;//kernel.InputDevice:599
                Tonyu.globals.$touches[0].y=mp.y;
                
              }
              //$LASTPOS=11000639;//kernel.InputDevice:639
              _this.handleListeners();
            });
            //$LASTPOS=11000671;//kernel.InputDevice:671
            Tonyu.globals.$touches=[{},{},{},{},{}];
            //$LASTPOS=11000703;//kernel.InputDevice:703
            Tonyu.globals.$touches.findById=(function anonymous_721(id) {
              var j;
              
              //$LASTPOS=11000738;//kernel.InputDevice:738
              //$LASTPOS=11000743;//kernel.InputDevice:743
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=11000793;//kernel.InputDevice:793
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
                j++;
              }
            });
            //$LASTPOS=11000903;//kernel.InputDevice:903
            Tonyu.globals.$handleTouch=(function anonymous_916(e) {
              var p;
              var ts;
              var i;
              var src;
              var dst;
              var j;
              
              //$LASTPOS=11000932;//kernel.InputDevice:932
              _this.touchEmu=false;
              //$LASTPOS=11000957;//kernel.InputDevice:957
              p = cvj.offset();
              //$LASTPOS=11000986;//kernel.InputDevice:986
              e.preventDefault();
              //$LASTPOS=11001015;//kernel.InputDevice:1015
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=11001063;//kernel.InputDevice:1063
              //$LASTPOS=11001068;//kernel.InputDevice:1068
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=11001113;//kernel.InputDevice:1113
                  src = ts[i];
                  //$LASTPOS=11001141;//kernel.InputDevice:1141
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=11001197;//kernel.InputDevice:1197
                  if (! dst) {
                    //$LASTPOS=11001226;//kernel.InputDevice:1226
                    //$LASTPOS=11001231;//kernel.InputDevice:1231
                    j = 0;
                    while(j<Tonyu.globals.$touches.length) {
                      {
                        //$LASTPOS=11001289;//kernel.InputDevice:1289
                        if (! Tonyu.globals.$touches[j].touched) {
                          //$LASTPOS=11001342;//kernel.InputDevice:1342
                          dst=Tonyu.globals.$touches[j];
                          //$LASTPOS=11001384;//kernel.InputDevice:1384
                          dst.identifier=src.identifier;
                          break;
                          
                          
                        }
                      }
                      j++;
                    }
                    
                  }
                  //$LASTPOS=11001517;//kernel.InputDevice:1517
                  if (dst) {
                    //$LASTPOS=11001545;//kernel.InputDevice:1545
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                    //$LASTPOS=11001606;//kernel.InputDevice:1606
                    _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                    //$LASTPOS=11001650;//kernel.InputDevice:1650
                    dst.x=_this.mp.x;
                    //$LASTPOS=11001679;//kernel.InputDevice:1679
                    dst.y=_this.mp.y;
                    //$LASTPOS=11001708;//kernel.InputDevice:1708
                    if (! dst.touched) {
                      //$LASTPOS=11001725;//kernel.InputDevice:1725
                      dst.touched=1;
                    }
                    
                  }
                }
                i++;
              }
              //$LASTPOS=11001775;//kernel.InputDevice:1775
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=11001807;//kernel.InputDevice:1807
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=11001839;//kernel.InputDevice:1839
              _this.handleListeners();
            });
            //$LASTPOS=11001871;//kernel.InputDevice:1871
            Tonyu.globals.$handleTouchEnd=(function anonymous_1887(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=11001903;//kernel.InputDevice:1903
              T2MediaLib.activate();
              //$LASTPOS=11001935;//kernel.InputDevice:1935
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=11001983;//kernel.InputDevice:1983
              //$LASTPOS=11001988;//kernel.InputDevice:1988
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=11002033;//kernel.InputDevice:2033
                  src = ts[i];
                  //$LASTPOS=11002061;//kernel.InputDevice:2061
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=11002117;//kernel.InputDevice:2117
                  if (dst) {
                    //$LASTPOS=11002145;//kernel.InputDevice:2145
                    dst.touched=0;
                    //$LASTPOS=11002177;//kernel.InputDevice:2177
                    dst.identifier=- 1;
                    
                  }
                }
                i++;
              }
              //$LASTPOS=11002231;//kernel.InputDevice:2231
              _this.handleListeners();
            });
            //$LASTPOS=11002263;//kernel.InputDevice:2263
            handleMouse = (function anonymous_2279(e) {
              
              //$LASTPOS=11002284;//kernel.InputDevice:2284
              Tonyu.globals.$handleMouse(e);
            });
            //$LASTPOS=11002308;//kernel.InputDevice:2308
            handleTouch = (function anonymous_2324(e) {
              
              //$LASTPOS=11002329;//kernel.InputDevice:2329
              Tonyu.globals.$handleTouch(e);
            });
            //$LASTPOS=11002353;//kernel.InputDevice:2353
            handleTouchEnd = (function anonymous_2372(e) {
              
              //$LASTPOS=11002377;//kernel.InputDevice:2377
              Tonyu.globals.$handleTouchEnd(e);
            });
            //$LASTPOS=11002404;//kernel.InputDevice:2404
            d = $.data(cv,"events");
            //$LASTPOS=11002436;//kernel.InputDevice:2436
            if (! d) {
              //$LASTPOS=11002455;//kernel.InputDevice:2455
              $.data(cv,"events","true");
              //$LASTPOS=11002492;//kernel.InputDevice:2492
              cvj.mousedown(handleMouse);
              //$LASTPOS=11002529;//kernel.InputDevice:2529
              cvj.mousemove(handleMouse);
              //$LASTPOS=11002566;//kernel.InputDevice:2566
              cvj.on("touchstart",handleTouch);
              //$LASTPOS=11002609;//kernel.InputDevice:2609
              cvj.on("touchmove",handleTouch);
              //$LASTPOS=11002651;//kernel.InputDevice:2651
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
      var _it_112;
      
      //$LASTPOS=11002716;//kernel.InputDevice:2716
      _it_112=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_112.next()) {
        i=_it_112[0];
        
        //$LASTPOS=11002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=11002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=11002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=11002811;//kernel.InputDevice:2811
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
      var _it_112;
      
      //$LASTPOS=11002716;//kernel.InputDevice:2716
      _it_112=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_112.next()) {
        i=_it_112[0];
        
        //$LASTPOS=11002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=11002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=11002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=11002811;//kernel.InputDevice:2811
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
  fullName: 'kernel.Keys',
  shortName: 'Keys',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_Keys_main() {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=12000089;//kernel.Keys:89
      _this.stats={};
      //$LASTPOS=12000100;//kernel.Keys:100
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=12000222;//kernel.Keys:222
      //$LASTPOS=12000227;//kernel.Keys:227
      i = 65;
      while(i<65+26) {
        {
          //$LASTPOS=12000259;//kernel.Keys:259
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
        i++;
      }
      //$LASTPOS=12000310;//kernel.Keys:310
      //$LASTPOS=12000315;//kernel.Keys:315
      i = 48;
      while(i<58) {
        {
          //$LASTPOS=12000344;//kernel.Keys:344
          _this.codes[String.fromCharCode(i)]=i;
        }
        i++;
      }
      //$LASTPOS=12000381;//kernel.Keys:381
      if (! $.data(document,"key_event")) {
        //$LASTPOS=12000423;//kernel.Keys:423
        $.data(document,"key_event",true);
        //$LASTPOS=12000463;//kernel.Keys:463
        $(document).keydown((function anonymous_483(e) {
          
          //$LASTPOS=12000489;//kernel.Keys:489
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=12000514;//kernel.Keys:514
        $(document).keyup((function anonymous_532(e) {
          
          //$LASTPOS=12000538;//kernel.Keys:538
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=12000561;//kernel.Keys:561
        $(document).mousedown((function anonymous_583(e) {
          
          //$LASTPOS=12000599;//kernel.Keys:599
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=12000641;//kernel.Keys:641
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=12000684;//kernel.Keys:684
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=12000723;//kernel.Keys:723
        $(document).mouseup((function anonymous_743(e) {
          
          //$LASTPOS=12000759;//kernel.Keys:759
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=12000801;//kernel.Keys:801
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=12000844;//kernel.Keys:844
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
    },
    fiber$main :function _trc_Keys_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=12000089;//kernel.Keys:89
      _this.stats={};
      //$LASTPOS=12000100;//kernel.Keys:100
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=12000222;//kernel.Keys:222
      //$LASTPOS=12000227;//kernel.Keys:227
      i = 65;
      while(i<65+26) {
        {
          //$LASTPOS=12000259;//kernel.Keys:259
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
        i++;
      }
      //$LASTPOS=12000310;//kernel.Keys:310
      //$LASTPOS=12000315;//kernel.Keys:315
      i = 48;
      while(i<58) {
        {
          //$LASTPOS=12000344;//kernel.Keys:344
          _this.codes[String.fromCharCode(i)]=i;
        }
        i++;
      }
      //$LASTPOS=12000381;//kernel.Keys:381
      if (! $.data(document,"key_event")) {
        //$LASTPOS=12000423;//kernel.Keys:423
        $.data(document,"key_event",true);
        //$LASTPOS=12000463;//kernel.Keys:463
        $(document).keydown((function anonymous_483(e) {
          
          //$LASTPOS=12000489;//kernel.Keys:489
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=12000514;//kernel.Keys:514
        $(document).keyup((function anonymous_532(e) {
          
          //$LASTPOS=12000538;//kernel.Keys:538
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=12000561;//kernel.Keys:561
        $(document).mousedown((function anonymous_583(e) {
          
          //$LASTPOS=12000599;//kernel.Keys:599
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=12000641;//kernel.Keys:641
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=12000684;//kernel.Keys:684
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=12000723;//kernel.Keys:723
        $(document).mouseup((function anonymous_743(e) {
          
          //$LASTPOS=12000759;//kernel.Keys:759
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=12000801;//kernel.Keys:801
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=12000844;//kernel.Keys:844
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12000909;//kernel.Keys:909
      if (typeof  code=="string") {
        //$LASTPOS=12000947;//kernel.Keys:947
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=12000991;//kernel.Keys:991
      if (! code) {
        return 0;
      }
      //$LASTPOS=12001017;//kernel.Keys:1017
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=12001053;//kernel.Keys:1053
      if (! _this.stats[code]) {
        //$LASTPOS=12001071;//kernel.Keys:1071
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000909;//kernel.Keys:909
      if (typeof  code=="string") {
        //$LASTPOS=12000947;//kernel.Keys:947
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=12000991;//kernel.Keys:991
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=12001017;//kernel.Keys:1017
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=12001053;//kernel.Keys:1053
      if (! _this.stats[code]) {
        //$LASTPOS=12001071;//kernel.Keys:1071
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_120;
      
      //$LASTPOS=12001140;//kernel.Keys:1140
      _it_120=Tonyu.iterator(_this.stats,1);
      while(_it_120.next()) {
        i=_it_120[0];
        
        //$LASTPOS=12001172;//kernel.Keys:1172
        if (_this.stats[i]>0) {
          //$LASTPOS=12001189;//kernel.Keys:1189
          _this.stats[i]++;
          
        }
        //$LASTPOS=12001211;//kernel.Keys:1211
        if (_this.stats[i]==- 1) {
          //$LASTPOS=12001229;//kernel.Keys:1229
          _this.stats[i]=1;
        }
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_120;
      
      //$LASTPOS=12001140;//kernel.Keys:1140
      _it_120=Tonyu.iterator(_this.stats,1);
      while(_it_120.next()) {
        i=_it_120[0];
        
        //$LASTPOS=12001172;//kernel.Keys:1172
        if (_this.stats[i]>0) {
          //$LASTPOS=12001189;//kernel.Keys:1189
          _this.stats[i]++;
          
        }
        //$LASTPOS=12001211;//kernel.Keys:1211
        if (_this.stats[i]==- 1) {
          //$LASTPOS=12001229;//kernel.Keys:1229
          _this.stats[i]=1;
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=12001271;//kernel.Keys:1271
      s = _this.stats[e.keyCode];
      //$LASTPOS=12001300;//kernel.Keys:1300
      if (! s) {
        //$LASTPOS=12001319;//kernel.Keys:1319
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=12001351;//kernel.Keys:1351
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=12001271;//kernel.Keys:1271
      s = _this.stats[e.keyCode];
      //$LASTPOS=12001300;//kernel.Keys:1300
      if (! s) {
        //$LASTPOS=12001319;//kernel.Keys:1319
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=12001351;//kernel.Keys:1351
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12001404;//kernel.Keys:1404
      _this.stats[e.keyCode]=0;
      //$LASTPOS=12001429;//kernel.Keys:1429
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12001404;//kernel.Keys:1404
      _this.stats[e.keyCode]=0;
      //$LASTPOS=12001429;//kernel.Keys:1429
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
      
      //$LASTPOS=13000258;//kernel.BaseActor:258
      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      //$LASTPOS=13000303;//kernel.BaseActor:303
      _this.registerEventHandler("screenOut",new Tonyu.classes.kernel.ScreenOutHandler);
      //$LASTPOS=13000368;//kernel.BaseActor:368
      _this.registerEventHandler("crashTo",new Tonyu.classes.kernel.CrashToHandler);
      //$LASTPOS=13000429;//kernel.BaseActor:429
      _this.registerEventHandler("within",new Tonyu.classes.kernel.WithinHandler);
      //$LASTPOS=13000493;//kernel.BaseActor:493
      if (typeof  x=="object") {
        //$LASTPOS=13000517;//kernel.BaseActor:517
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=13000549;//kernel.BaseActor:549
        if (typeof  x=="number") {
          //$LASTPOS=13000584;//kernel.BaseActor:584
          _this.x=x;
          //$LASTPOS=13000603;//kernel.BaseActor:603
          _this.y=y;
          //$LASTPOS=13000622;//kernel.BaseActor:622
          _this.p=p;
          
        }
      }
      //$LASTPOS=13000644;//kernel.BaseActor:644
      if (_this.scaleX==null) {
        //$LASTPOS=13000662;//kernel.BaseActor:662
        _this.scaleX=1;
      }
      //$LASTPOS=13000677;//kernel.BaseActor:677
      if (_this.rotation==null) {
        //$LASTPOS=13000697;//kernel.BaseActor:697
        _this.rotation=0;
      }
      //$LASTPOS=13000714;//kernel.BaseActor:714
      if (_this.rotate==null) {
        //$LASTPOS=13000732;//kernel.BaseActor:732
        _this.rotate=0;
      }
      //$LASTPOS=13000747;//kernel.BaseActor:747
      if (_this.alpha==null) {
        //$LASTPOS=13000764;//kernel.BaseActor:764
        _this.alpha=255;
      }
      //$LASTPOS=13000780;//kernel.BaseActor:780
      if (_this.zOrder==null) {
        //$LASTPOS=13000798;//kernel.BaseActor:798
        _this.zOrder=0;
      }
      //$LASTPOS=13000813;//kernel.BaseActor:813
      if (_this.age==null) {
        //$LASTPOS=13000828;//kernel.BaseActor:828
        _this.age=0;
      }
      //$LASTPOS=13000840;//kernel.BaseActor:840
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=13000891;//kernel.BaseActor:891
        _this.animMode=true;
        //$LASTPOS=13000915;//kernel.BaseActor:915
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=13000949;//kernel.BaseActor:949
        _this.animMode=false;
        
      }
      //$LASTPOS=13000977;//kernel.BaseActor:977
      if (_this.animFps==null) {
        //$LASTPOS=13000996;//kernel.BaseActor:996
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
      
      //$LASTPOS=13001100;//kernel.BaseActor:1100
      console.log.apply(console,arguments);
      //$LASTPOS=13001143;//kernel.BaseActor:1143
      mergedArg = "";
      //$LASTPOS=13001166;//kernel.BaseActor:1166
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=13001194;//kernel.BaseActor:1194
        //$LASTPOS=13001198;//kernel.BaseActor:1198
        argCount = 0;
        while(argCount<arguments.length) {
          {
            //$LASTPOS=13001265;//kernel.BaseActor:1265
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
          argCount++;
        }
        //$LASTPOS=13001330;//kernel.BaseActor:1330
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=13001369;//kernel.BaseActor:1369
        //$LASTPOS=13001373;//kernel.BaseActor:1373
        printCount = 0;
        while(printCount<_this.splits.length) {
          {
            //$LASTPOS=13001443;//kernel.BaseActor:1443
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=13001484;//kernel.BaseActor:1484
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=13001534;//kernel.BaseActor:1534
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
          printCount++;
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13001657;//kernel.BaseActor:1657
      _this.animFps=f;
      //$LASTPOS=13001678;//kernel.BaseActor:1678
      _this.animFrame=0;
      //$LASTPOS=13001701;//kernel.BaseActor:1701
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13001751;//kernel.BaseActor:1751
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13001800;//kernel.BaseActor:1800
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13001842;//kernel.BaseActor:1842
      _this.onUpdate();
      //$LASTPOS=13001859;//kernel.BaseActor:1859
      if (null) {
        //$LASTPOS=13001882;//kernel.BaseActor:1882
        null.suspend();
        //$LASTPOS=13001910;//kernel.BaseActor:1910
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=13001926;//kernel.BaseActor:1926
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13001842;//kernel.BaseActor:1842
      _this.onUpdate();
      //$LASTPOS=13001859;//kernel.BaseActor:1859
      if (_thread) {
        //$LASTPOS=13001882;//kernel.BaseActor:1882
        _thread.suspend();
        //$LASTPOS=13001910;//kernel.BaseActor:1910
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=13001926;//kernel.BaseActor:1926
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
      
      //$LASTPOS=13002020;//kernel.BaseActor:2020
      //$LASTPOS=13002024;//kernel.BaseActor:2024
      updateCount = 0;
      while(updateCount<updateT) {
        {
          //$LASTPOS=13002087;//kernel.BaseActor:2087
          _this.update();
        }
        updateCount++;
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
            //$LASTPOS=13002020;//kernel.BaseActor:2020
            //$LASTPOS=13002024;//kernel.BaseActor:2024
            updateCount = 0;;
          case 1:
            if (!(updateCount<updateT)) { __pc=3; break; }
            //$LASTPOS=13002087;//kernel.BaseActor:2087
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            updateCount++;
            __pc=1;break;
          case 3:
            
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
      
      //$LASTPOS=13002230;//kernel.BaseActor:2230
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=13002255;//kernel.BaseActor:2255
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=13002338;//kernel.BaseActor:2338
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2363(s) {
        
        //$LASTPOS=13002379;//kernel.BaseActor:2379
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=13002410;//kernel.BaseActor:2410
        if (! c||s instanceof c) {
          //$LASTPOS=13002451;//kernel.BaseActor:2451
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
      
      //$LASTPOS=13002558;//kernel.BaseActor:2558
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=13002583;//kernel.BaseActor:2583
      sp = _this;
      //$LASTPOS=13002620;//kernel.BaseActor:2620
      t1 = _this.getCrashRect();
      //$LASTPOS=13002648;//kernel.BaseActor:2648
      if (! t1) {
        return res;
      }
      //$LASTPOS=13002674;//kernel.BaseActor:2674
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2699(s) {
        var t2;
        
        //$LASTPOS=13002715;//kernel.BaseActor:2715
        t2;
        //$LASTPOS=13002732;//kernel.BaseActor:2732
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=13002958;//kernel.BaseActor:2958
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13003038;//kernel.BaseActor:3038
      if (! t) {
        return false;
      }
      //$LASTPOS=13003065;//kernel.BaseActor:3065
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
      
      //$LASTPOS=13003188;//kernel.BaseActor:3188
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=13003316;//kernel.BaseActor:3316
      t1 = _this.getCrashRect();
      //$LASTPOS=13003344;//kernel.BaseActor:3344
      t2 = t.getCrashRect();
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_137;
      
      //$LASTPOS=13003653;//kernel.BaseActor:3653
      while (true) {
        //$LASTPOS=13003675;//kernel.BaseActor:3675
        if (typeof  d=="function") {
          //$LASTPOS=13003714;//kernel.BaseActor:3714
          _it_137=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_137.next()) {
            obj=_it_137[0];
            
            //$LASTPOS=13003756;//kernel.BaseActor:3756
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=13003813;//kernel.BaseActor:3813
          if (_this.crashTo(d)) {
            //$LASTPOS=13003842;//kernel.BaseActor:3842
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=13003887;//kernel.BaseActor:3887
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_137;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13003653;//kernel.BaseActor:3653
          case 1:
            //$LASTPOS=13003675;//kernel.BaseActor:3675
            if (!(typeof  d=="function")) { __pc=5; break; }
            //$LASTPOS=13003714;//kernel.BaseActor:3714
            _it_137=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_137.next())) { __pc=4; break; }
            obj=_it_137[0];
            
            //$LASTPOS=13003756;//kernel.BaseActor:3756
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            __pc=8;break;
          case 5:
            //$LASTPOS=13003813;//kernel.BaseActor:3813
            if (!(_this.crashTo(d))) { __pc=7; break; }
            //$LASTPOS=13003842;//kernel.BaseActor:3842
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=13003887;//kernel.BaseActor:3887
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
      
      //$LASTPOS=13003938;//kernel.BaseActor:3938
      actWidth = _this.width*_this.scaleX;actHeight;
      //$LASTPOS=13003981;//kernel.BaseActor:3981
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=13004023;//kernel.BaseActor:4023
        actHeight=_this.height*_this.scaleX;
        
      } else {
        //$LASTPOS=13004069;//kernel.BaseActor:4069
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
      
      //$LASTPOS=13004330;//kernel.BaseActor:4330
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=13004355;//kernel.BaseActor:4355
      sp = _this;
      //$LASTPOS=13004392;//kernel.BaseActor:4392
      t1 = _this.getCrashRect();
      //$LASTPOS=13004420;//kernel.BaseActor:4420
      if (! t1) {
        return res;
      }
      //$LASTPOS=13004446;//kernel.BaseActor:4446
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_4471(s) {
        var t2;
        
        //$LASTPOS=13004487;//kernel.BaseActor:4487
        t2;
        //$LASTPOS=13004504;//kernel.BaseActor:4504
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=13004687;//kernel.BaseActor:4687
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13004774;//kernel.BaseActor:4774
      if (! t) {
        return false;
      }
      //$LASTPOS=13004800;//kernel.BaseActor:4800
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13004946;//kernel.BaseActor:4946
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=13004985;//kernel.BaseActor:4985
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_147;
      
      //$LASTPOS=13005155;//kernel.BaseActor:5155
      while (true) {
        //$LASTPOS=13005177;//kernel.BaseActor:5177
        if (typeof  d=="function") {
          //$LASTPOS=13005216;//kernel.BaseActor:5216
          _it_147=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_147.next()) {
            obj=_it_147[0];
            
            //$LASTPOS=13005261;//kernel.BaseActor:5261
            _this.print(r);
            //$LASTPOS=13005288;//kernel.BaseActor:5288
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=13005326;//kernel.BaseActor:5326
          if (_this.within(d,r)) {
            //$LASTPOS=13005356;//kernel.BaseActor:5356
            f(d);
            
          }
        }
        //$LASTPOS=13005382;//kernel.BaseActor:5382
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_147;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13005155;//kernel.BaseActor:5155
          case 1:
            //$LASTPOS=13005177;//kernel.BaseActor:5177
            if (typeof  d=="function") {
              //$LASTPOS=13005216;//kernel.BaseActor:5216
              _it_147=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_147.next()) {
                obj=_it_147[0];
                
                //$LASTPOS=13005261;//kernel.BaseActor:5261
                _this.print(r);
                //$LASTPOS=13005288;//kernel.BaseActor:5288
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=13005326;//kernel.BaseActor:5326
              if (_this.within(d,r)) {
                //$LASTPOS=13005356;//kernel.BaseActor:5356
                f(d);
                
              }
            }
            //$LASTPOS=13005382;//kernel.BaseActor:5382
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
      
      //$LASTPOS=13005446;//kernel.BaseActor:5446
      Tonyu.globals.$Sprites.watchHit(typeA,typeB,(function anonymous_5479(a,b) {
        
        //$LASTPOS=13005497;//kernel.BaseActor:5497
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
      
      //$LASTPOS=13005651;//kernel.BaseActor:5651
      _this.killThreadGroup();
      //$LASTPOS=13005723;//kernel.BaseActor:5723
      _this.hide();
      //$LASTPOS=13005736;//kernel.BaseActor:5736
      _this.fireEvent("die");
      //$LASTPOS=13005759;//kernel.BaseActor:5759
      _this._isDead=true;
    },
    hide :function _trc_BaseActor_hide() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13005938;//kernel.BaseActor:5938
      if (_this.layer&&typeof  _this.layer.remove=="function") {
        //$LASTPOS=13005993;//kernel.BaseActor:5993
        _this.layer.remove(_this);
        
      } else {
        //$LASTPOS=13006034;//kernel.BaseActor:6034
        Tonyu.globals.$Sprites.remove(_this);
        
      }
    },
    show :function _trc_BaseActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13006095;//kernel.BaseActor:6095
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=13006147;//kernel.BaseActor:6147
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=13006185;//kernel.BaseActor:6185
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=13006217;//kernel.BaseActor:6217
      if (x!=null) {
        //$LASTPOS=13006230;//kernel.BaseActor:6230
        _this.x=x;
      }
      //$LASTPOS=13006245;//kernel.BaseActor:6245
      if (y!=null) {
        //$LASTPOS=13006258;//kernel.BaseActor:6258
        _this.y=y;
      }
      //$LASTPOS=13006273;//kernel.BaseActor:6273
      if (p!=null) {
        //$LASTPOS=13006286;//kernel.BaseActor:6286
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13006331;//kernel.BaseActor:6331
      if (typeof  _this.p!="number") {
        //$LASTPOS=13006366;//kernel.BaseActor:6366
        if (_this.text!=null) {
          return _this;
        }
        //$LASTPOS=13006399;//kernel.BaseActor:6399
        _this.p=0;
        
      }
      //$LASTPOS=13006416;//kernel.BaseActor:6416
      _this.p=Math.floor(_this.p);
      //$LASTPOS=13006438;//kernel.BaseActor:6438
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
      //$LASTPOS=13006476;//kernel.BaseActor:6476
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=13006500;//kernel.BaseActor:6500
      _this.width=_this.pImg.width;
      //$LASTPOS=13006523;//kernel.BaseActor:6523
      _this.height=_this.pImg.height;
    },
    isDead :function _trc_BaseActor_isDead() {
      "use strict";
      var _this=this;
      
      return _this._isDead;
    },
    animation :function _trc_BaseActor_animation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13006716;//kernel.BaseActor:6716
      _this.age++;
      //$LASTPOS=13006728;//kernel.BaseActor:6728
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=13006769;//kernel.BaseActor:6769
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=13006809;//kernel.BaseActor:6809
        _this.animFrame++;
        
      }
    },
    draw :function _trc_BaseActor_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=13006858;//kernel.BaseActor:6858
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=13006911;//kernel.BaseActor:6911
      _this.detectShape();
      //$LASTPOS=13006931;//kernel.BaseActor:6931
      if (_this.pImg) {
        //$LASTPOS=13006952;//kernel.BaseActor:6952
        ctx.save();
        //$LASTPOS=13006973;//kernel.BaseActor:6973
        ctx.translate(_this.x,_this.y);
        //$LASTPOS=13007117;//kernel.BaseActor:7117
        _this.animation();
        //$LASTPOS=13007139;//kernel.BaseActor:7139
        if (_this.rotation!=0) {
          //$LASTPOS=13007174;//kernel.BaseActor:7174
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=13007242;//kernel.BaseActor:7242
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=13007299;//kernel.BaseActor:7299
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=13007351;//kernel.BaseActor:7351
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=13007416;//kernel.BaseActor:7416
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=13007472;//kernel.BaseActor:7472
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=13007513;//kernel.BaseActor:7513
        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=13007645;//kernel.BaseActor:7645
        ctx.restore();
        
      } else {
        //$LASTPOS=13007672;//kernel.BaseActor:7672
        if (_this.text!==null&&_this.text!==undefined) {
          //$LASTPOS=13007720;//kernel.BaseActor:7720
          splitsText = (_this.text+"").split("\n");
          //$LASTPOS=13007767;//kernel.BaseActor:7767
          _this.drawY=_this.y;
          //$LASTPOS=13007785;//kernel.BaseActor:7785
          if (! _this.size) {
            //$LASTPOS=13007796;//kernel.BaseActor:7796
            _this.size=15;
          }
          //$LASTPOS=13007814;//kernel.BaseActor:7814
          if (! _this.align) {
            //$LASTPOS=13007826;//kernel.BaseActor:7826
            _this.align="center";
          }
          //$LASTPOS=13007851;//kernel.BaseActor:7851
          if (! _this.fillStyle) {
            //$LASTPOS=13007867;//kernel.BaseActor:7867
            _this.fillStyle="white";
          }
          //$LASTPOS=13007895;//kernel.BaseActor:7895
          if (_this.font) {
            //$LASTPOS=13007905;//kernel.BaseActor:7905
            ctx.font=_this.size+"px "+_this.font;
          }
          //$LASTPOS=13007940;//kernel.BaseActor:7940
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=13007974;//kernel.BaseActor:7974
          ctx.globalAlpha=_this.alpha/255;
          //$LASTPOS=13008015;//kernel.BaseActor:8015
          _this.height=0;
          //$LASTPOS=13008024;//kernel.BaseActor:8024
          _this.width=0;
          //$LASTPOS=13008042;//kernel.BaseActor:8042
          //$LASTPOS=13008046;//kernel.BaseActor:8046
          textCount = 0;
          while(textCount<splitsText.length) {
            {
              //$LASTPOS=13008117;//kernel.BaseActor:8117
              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
              //$LASTPOS=13008213;//kernel.BaseActor:8213
              if (_this.width<rect.w) {
                //$LASTPOS=13008230;//kernel.BaseActor:8230
                _this.width=rect.w;
              }
              //$LASTPOS=13008257;//kernel.BaseActor:8257
              _this.height+=rect.h;
              //$LASTPOS=13008286;//kernel.BaseActor:8286
              _this.drawY+=_this.size;
            }
            textCount++;
          }
          
        }
      }
      //$LASTPOS=13008322;//kernel.BaseActor:8322
      if (_this._fukidashi) {
        //$LASTPOS=13008349;//kernel.BaseActor:8349
        if (_this._fukidashi.c>0) {
          //$LASTPOS=13008384;//kernel.BaseActor:8384
          _this._fukidashi.c--;
          //$LASTPOS=13008413;//kernel.BaseActor:8413
          ctx.fillStyle="white";
          //$LASTPOS=13008449;//kernel.BaseActor:8449
          ctx.strokeStyle="black";
          //$LASTPOS=13008487;//kernel.BaseActor:8487
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    asyncResult :function _trc_BaseActor_asyncResult() {
      "use strict";
      var _this=this;
      
      return Tonyu.asyncResult();
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13008690;//kernel.BaseActor:8690
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=13008762;//kernel.BaseActor:8762
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13008690;//kernel.BaseActor:8690
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=13008762;//kernel.BaseActor:8762
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      "use strict";
      var _this=this;
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=13008844;//kernel.BaseActor:8844
      if (! a) {
        //$LASTPOS=13008852;//kernel.BaseActor:8852
        a=0;
      }
      //$LASTPOS=13008862;//kernel.BaseActor:8862
      r = 0;
      //$LASTPOS=13008876;//kernel.BaseActor:8876
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=13008922;//kernel.BaseActor:8922
      if (_this.x<viewX+a) {
        //$LASTPOS=13008951;//kernel.BaseActor:8951
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=13008970;//kernel.BaseActor:8970
      if (_this.y<viewY+a) {
        //$LASTPOS=13008999;//kernel.BaseActor:8999
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=13009018;//kernel.BaseActor:9018
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=13009047;//kernel.BaseActor:9047
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=13009082;//kernel.BaseActor:9082
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=13009111;//kernel.BaseActor:9111
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      return r;
    },
    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=13008844;//kernel.BaseActor:8844
      if (! a) {
        //$LASTPOS=13008852;//kernel.BaseActor:8852
        a=0;
      }
      //$LASTPOS=13008862;//kernel.BaseActor:8862
      r = 0;
      //$LASTPOS=13008876;//kernel.BaseActor:8876
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=13008922;//kernel.BaseActor:8922
      if (_this.x<viewX+a) {
        //$LASTPOS=13008951;//kernel.BaseActor:8951
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=13008970;//kernel.BaseActor:8970
      if (_this.y<viewY+a) {
        //$LASTPOS=13008999;//kernel.BaseActor:8999
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=13009018;//kernel.BaseActor:9018
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=13009047;//kernel.BaseActor:9047
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=13009082;//kernel.BaseActor:9082
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=13009111;//kernel.BaseActor:9111
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      _thread.retVal=r;return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13009241;//kernel.BaseActor:9241
      while (true) {
        //$LASTPOS=13009263;//kernel.BaseActor:9263
        while (true) {
          //$LASTPOS=13009289;//kernel.BaseActor:9289
          if (_this.screenOut()>d) {
            //$LASTPOS=13009325;//kernel.BaseActor:9325
            f();
            break;
            
            
          }
          //$LASTPOS=13009382;//kernel.BaseActor:9382
          _this.update();
          
        }
        //$LASTPOS=13009412;//kernel.BaseActor:9412
        while (true) {
          //$LASTPOS=13009438;//kernel.BaseActor:9438
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=13009510;//kernel.BaseActor:9510
          _this.update();
          
        }
        //$LASTPOS=13009540;//kernel.BaseActor:9540
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
            //$LASTPOS=13009241;//kernel.BaseActor:9241
          case 1:
            //$LASTPOS=13009263;//kernel.BaseActor:9263
          case 2:
            //$LASTPOS=13009289;//kernel.BaseActor:9289
            if (!(_this.screenOut()>d)) { __pc=3; break; }
            //$LASTPOS=13009325;//kernel.BaseActor:9325
            f();
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=13009382;//kernel.BaseActor:9382
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=13009412;//kernel.BaseActor:9412
          case 6:
            //$LASTPOS=13009438;//kernel.BaseActor:9438
            if (!(_this.screenOut()<=d)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=13009510;//kernel.BaseActor:9510
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=13009540;//kernel.BaseActor:9540
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
      
      //$LASTPOS=13009580;//kernel.BaseActor:9580
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=13009622;//kernel.BaseActor:9622
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
      
      //$LASTPOS=13009580;//kernel.BaseActor:9580
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=13009622;//kernel.BaseActor:9622
      files = d.rel("files/");
      _thread.retVal=files.rel(path).setPolicy({topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13009731;//kernel.BaseActor:9731
      if (fl!==false) {
        //$LASTPOS=13009758;//kernel.BaseActor:9758
        if (! _this.origTG) {
          
          
        }
        //$LASTPOS=13009910;//kernel.BaseActor:9910
        _this.a=_this.asyncResult();
        //$LASTPOS=13009936;//kernel.BaseActor:9936
        Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
        //$LASTPOS=13009990;//kernel.BaseActor:9990
        _this.waitFor(_this.a);
        
      } else {
        //$LASTPOS=13010025;//kernel.BaseActor:10025
        if (_this.origTG) {
          
          
        }
        
      }
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
            //$LASTPOS=13009731;//kernel.BaseActor:9731
            if (!(fl!==false)) { __pc=3; break; }
            //$LASTPOS=13009758;//kernel.BaseActor:9758
            if (!(! _this.origTG)) { __pc=1; break; }
            {
              //$LASTPOS=13009812;//kernel.BaseActor:9812
              _this.origTG=_thread.group;
              //$LASTPOS=13009851;//kernel.BaseActor:9851
              _thread.setGroup(null);
            }
          case 1:
            
            //$LASTPOS=13009910;//kernel.BaseActor:9910
            _this.a=_this.asyncResult();
            //$LASTPOS=13009936;//kernel.BaseActor:9936
            Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
            //$LASTPOS=13009990;//kernel.BaseActor:9990
            _this.fiber$waitFor(_thread, _this.a);
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            //$LASTPOS=13010025;//kernel.BaseActor:10025
            if (!(_this.origTG)) { __pc=4; break; }
            {
              //$LASTPOS=13010078;//kernel.BaseActor:10078
              _thread.setGroup(_this.origTG);
              //$LASTPOS=13010121;//kernel.BaseActor:10121
              _this.origTG=null;
            }
          case 4:
            
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    redrawScreen :function _trc_BaseActor_redrawScreen() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13010194;//kernel.BaseActor:10194
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=13010230;//kernel.BaseActor:10230
      Tonyu.globals.$Screen.draw();
    },
    fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13010194;//kernel.BaseActor:10194
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=13010230;//kernel.BaseActor:10230
      Tonyu.globals.$Screen.draw();
      
      _thread.retVal=_this;return;
    },
    color :function _trc_BaseActor_color(r,g,b) {
      "use strict";
      var _this=this;
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    fiber$color :function _trc_BaseActor_f_color(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    loadPage :function _trc_BaseActor_loadPage(page,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13010939;//kernel.BaseActor:10939
      _this.all().die();
      //$LASTPOS=13010957;//kernel.BaseActor:10957
      new page(arg);
      //$LASTPOS=13010977;//kernel.BaseActor:10977
      _this.die();
    },
    fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13010939;//kernel.BaseActor:10939
      _this.all().die();
      //$LASTPOS=13010957;//kernel.BaseActor:10957
      new page(arg);
      //$LASTPOS=13010977;//kernel.BaseActor:10977
      _this.die();
      
      _thread.retVal=_this;return;
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13011012;//kernel.BaseActor:11012
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13011012;//kernel.BaseActor:11012
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    appear :function _trc_BaseActor_appear(o) {
      "use strict";
      var _this=this;
      
      return o;
    },
    fiber$appear :function _trc_BaseActor_f_appear(_thread,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=o;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false},"appear":{"nowait":false}}}
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
    addListener :function _trc_EventHandler_addListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=14000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=14000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=14000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      return {remove: (function anonymous_337() {
        
        //$LASTPOS=14000352;//kernel.EventHandler:352
        _this.removeListener(f);
      })};
    },
    fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=14000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=14000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=14000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      
      _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            _thread.exit({remove: (function anonymous_337() {
              
              //$LASTPOS=14000352;//kernel.EventHandler:352
              _this.removeListener(f);
            })});return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    removeListener :function _trc_EventHandler_removeListener(f) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=14000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=14000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
    },
    fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=14000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=14000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
      
      _thread.retVal=_this;return;
    },
    fire :function _trc_EventHandler_fire(args) {
      "use strict";
      var _this=this;
      var t;
      var h;
      var _it_163;
      
      //$LASTPOS=14000499;//kernel.EventHandler:499
      if (_this.released) {
        return _this;
      }
      //$LASTPOS=14000526;//kernel.EventHandler:526
      t;
      //$LASTPOS=14000538;//kernel.EventHandler:538
      _it_163=Tonyu.iterator(_this.listeners,1);
      while(_it_163.next()) {
        h=_it_163[0];
        
        //$LASTPOS=14000782;//kernel.EventHandler:782
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
      var _it_163;
      
      //$LASTPOS=14000499;//kernel.EventHandler:499
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=14000526;//kernel.EventHandler:526
      t;
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000538;//kernel.EventHandler:538
            _it_163=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_163.next())) { __pc=3; break; }
            h=_it_163[0];
            
            //$LASTPOS=14000782;//kernel.EventHandler:782
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
      
      //$LASTPOS=14000838;//kernel.EventHandler:838
      _this.released=true;
    },
    fiber$release :function _trc_EventHandler_f_release(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000838;//kernel.EventHandler:838
      _this.released=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"removeListener":{"nowait":false},"fire":{"nowait":false},"release":{"nowait":false}}}
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
      retThread = _this.target.parallel("screenOutChecker",d,f);
      return {remove: (function anonymous_135() {
        
        //$LASTPOS=15000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_ScreenOutHandler_f_addListener(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=15000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      _thread.retVal={remove: (function anonymous_135() {
        
        //$LASTPOS=15000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000210;//kernel.ScreenOutHandler:210
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=15000228;//kernel.ScreenOutHandler:228
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}
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
      retThread = _this.target.parallel("withinChecker",d,r,f);
      return {remove: (function anonymous_137() {
        
        //$LASTPOS=16000153;//kernel.WithinHandler:153
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_WithinHandler_f_addListener(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=16000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      _thread.retVal={remove: (function anonymous_137() {
        
        //$LASTPOS=16000153;//kernel.WithinHandler:153
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000213;//kernel.WithinHandler:213
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=16000232;//kernel.WithinHandler:232
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}
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
      
      //$LASTPOS=17000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=17000061;//kernel.NoviceActor:61
        n=1;
      }
      //$LASTPOS=17000071;//kernel.NoviceActor:71
      //$LASTPOS=17000075;//kernel.NoviceActor:75
      n;
      while(n>0) {
        //$LASTPOS=17000086;//kernel.NoviceActor:86
        _this.update();
        n--;
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=17000061;//kernel.NoviceActor:61
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=17000071;//kernel.NoviceActor:71
            //$LASTPOS=17000075;//kernel.NoviceActor:75
            n;;
          case 1:
            if (!(n>0)) { __pc=3; break; }
            //$LASTPOS=17000086;//kernel.NoviceActor:86
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            n--;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprite :function _trc_NoviceActor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=17000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=17000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=17000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=17000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=17000282;//kernel.NoviceActor:282
        size=15;
      }
      //$LASTPOS=17000296;//kernel.NoviceActor:296
      _this.initSprite();
      //$LASTPOS=17000315;//kernel.NoviceActor:315
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=17000282;//kernel.NoviceActor:282
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=17000296;//kernel.NoviceActor:296
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=17000315;//kernel.NoviceActor:315
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000390;//kernel.NoviceActor:390
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
            //$LASTPOS=17000390;//kernel.NoviceActor:390
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
      
      //$LASTPOS=17000425;//kernel.NoviceActor:425
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000465;//kernel.NoviceActor:465
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
      
      //$LASTPOS=17000564;//kernel.NoviceActor:564
      _this.initSprite();
      //$LASTPOS=17000583;//kernel.NoviceActor:583
      _this._sprite.x=x;
      //$LASTPOS=17000601;//kernel.NoviceActor:601
      _this._sprite.y=y;
      //$LASTPOS=17000619;//kernel.NoviceActor:619
      if (p!=null) {
        //$LASTPOS=17000632;//kernel.NoviceActor:632
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
            //$LASTPOS=17000564;//kernel.NoviceActor:564
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=17000583;//kernel.NoviceActor:583
            _this._sprite.x=x;
            //$LASTPOS=17000601;//kernel.NoviceActor:601
            _this._sprite.y=y;
            //$LASTPOS=17000619;//kernel.NoviceActor:619
            if (p!=null) {
              //$LASTPOS=17000632;//kernel.NoviceActor:632
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
      
      //$LASTPOS=17000684;//kernel.NoviceActor:684
      _this.initSprite();
      //$LASTPOS=17000703;//kernel.NoviceActor:703
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
            //$LASTPOS=17000684;//kernel.NoviceActor:684
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=17000703;//kernel.NoviceActor:703
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
            if (!(! _this.isPlaying())) { __pc=2; break; }
            //$LASTPOS=18000134;//kernel.MML:134
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
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}
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
      
      //$LASTPOS=19000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=19000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=19000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=19000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=19000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=19000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=19000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=19000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=19000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_170;
      
      //$LASTPOS=19000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=19000343;//kernel.PlayMod:343
        _it_170=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_170.next()) {
          k=_it_170[0];
          v=_it_170[1];
          
          //$LASTPOS=19000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=19000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=19000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=19000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=19000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      "use strict";
      var _this=this;
      var mmls;
      var i;
      
      //$LASTPOS=19000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=19000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=19000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=19000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=19000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=19000647;//kernel.PlayMod:647
      //$LASTPOS=19000652;//kernel.PlayMod:652
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=19000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=19000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=19000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=19000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=19000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=19000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=19000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=19000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=19000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=19000647;//kernel.PlayMod:647
      //$LASTPOS=19000652;//kernel.PlayMod:652
      i = 0;
      while(i<_arguments.length) {
        {
          //$LASTPOS=19000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
        i++;
      }
      //$LASTPOS=19000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
            //$LASTPOS=19000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=19000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=19000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      //$LASTPOS=19000897;//kernel.PlayMod:897
      mmls = [];
      //$LASTPOS=19000915;//kernel.PlayMod:915
      //$LASTPOS=19000920;//kernel.PlayMod:920
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=19000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=19001002;//kernel.PlayMod:1002
      mml.play(mmls);
      return mml;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}
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
      
      //$LASTPOS=20000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=20000040;//kernel.WaveTable:40
      _this.env={};
      //$LASTPOS=20000335;//kernel.WaveTable:335
      if (typeof  T!=="undefined") {
        //$LASTPOS=20000416;//kernel.WaveTable:416
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=20000485;//kernel.WaveTable:485
        _this.setEnv(0,_this.env);
        //$LASTPOS=20000506;//kernel.WaveTable:506
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=20000040;//kernel.WaveTable:40
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20000335;//kernel.WaveTable:335
            if (!(typeof  T!=="undefined")) { __pc=3; break; }
            //$LASTPOS=20000416;//kernel.WaveTable:416
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=20000485;//kernel.WaveTable:485
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=20000506;//kernel.WaveTable:506
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
      
      //$LASTPOS=20000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000123;//kernel.WaveTable:123
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000123;//kernel.WaveTable:123
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      "use strict";
      var _this=this;
      var synth;
      
      //$LASTPOS=20000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=20000160;//kernel.WaveTable:160
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
      
      //$LASTPOS=21000064;//kernel.ParallelMod:64
      args = [];
      //$LASTPOS=21000083;//kernel.ParallelMod:83
      //$LASTPOS=21000088;//kernel.ParallelMod:88
      i = 1;
      while(i<arguments.length) {
        {
          //$LASTPOS=21000134;//kernel.ParallelMod:134
          args.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=21000173;//kernel.ParallelMod:173
      name = arguments[0];
      //$LASTPOS=21000202;//kernel.ParallelMod:202
      th;
      //$LASTPOS=21000216;//kernel.ParallelMod:216
      th=Tonyu.globals.$Boot.schedule(_this,name,args);
      return th;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}
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
      _this.cur.push(th);
      //$LASTPOS=22000390;//kernel.Scheduler:390
      th.scheduled=_this;
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000371;//kernel.Scheduler:371
      _this.cur.push(th);
      //$LASTPOS=22000390;//kernel.Scheduler:390
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=22000435;//kernel.Scheduler:435
      _this.next.push(th);
      //$LASTPOS=22000455;//kernel.Scheduler:455
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000435;//kernel.Scheduler:435
      _this.next.push(th);
      //$LASTPOS=22000455;//kernel.Scheduler:455
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      "use strict";
      var _this=this;
      var t;
      var _it_185;
      
      //$LASTPOS=22000497;//kernel.Scheduler:497
      _it_185=Tonyu.iterator(_this.cur,1);
      while(_it_185.next()) {
        t=_it_185[0];
        
        //$LASTPOS=22000524;//kernel.Scheduler:524
        delete t.scheduled;
        //$LASTPOS=22000553;//kernel.Scheduler:553
        t.steps();
        //$LASTPOS=22000573;//kernel.Scheduler:573
        if (t.preempted) {
          //$LASTPOS=22000650;//kernel.Scheduler:650
          _this.addToNext(t);
          
        }
        
      }
      //$LASTPOS=22000687;//kernel.Scheduler:687
      _this.cur=_this.next;
      //$LASTPOS=22000702;//kernel.Scheduler:702
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_185;
      
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22000497;//kernel.Scheduler:497
            _it_185=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_185.next())) { __pc=4; break; }
            t=_it_185[0];
            
            //$LASTPOS=22000524;//kernel.Scheduler:524
            delete t.scheduled;
            //$LASTPOS=22000553;//kernel.Scheduler:553
            t.steps();
            //$LASTPOS=22000573;//kernel.Scheduler:573
            if (!(t.preempted)) { __pc=3; break; }
            //$LASTPOS=22000650;//kernel.Scheduler:650
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=22000687;//kernel.Scheduler:687
            _this.cur=_this.next;
            //$LASTPOS=22000702;//kernel.Scheduler:702
            _this.next=[];
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"stepsAll":{"nowait":false}}}
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
      
      //$LASTPOS=23000105;//kernel.Actor:105
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=23000147;//kernel.Actor:147
      _this.initSprite();
    },
    initSprite :function _trc_Actor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=23000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=23000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=23000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=23000308;//kernel.Actor:308
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=23000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=23000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=23000308;//kernel.Actor:308
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
      
      //$LASTPOS=24000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      return {remove: (function anonymous_133() {
        
        //$LASTPOS=24000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_CrashToHandler_f_addListener(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=24000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      _thread.retVal={remove: (function anonymous_133() {
        
        //$LASTPOS=24000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=24000209;//kernel.CrashToHandler:209
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=24000228;//kernel.CrashToHandler:228
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}
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
      
      //$LASTPOS=25000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=25000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=25000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=25000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=25000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=25000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=25000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=25000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=25000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=25000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=25000655;//kernel.GameScreen:655
      b = _this.bounds;
      //$LASTPOS=25000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=25000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=25000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=25000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=25000878;//kernel.GameScreen:878
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
      
      //$LASTPOS=25000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=25000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=25001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=25001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=25001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=25001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=25001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=25001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=25001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=25001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=25001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=25001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=25001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25001265;//kernel.GameScreen:1265
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
      
      //$LASTPOS=26000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=26000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=26000082;//kernel.Map:82
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=26000101;//kernel.Map:101
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=26000173;//kernel.Map:173
      _this.mapObj=true;
      //$LASTPOS=26000191;//kernel.Map:191
      _this.mapTable=[];
      //$LASTPOS=26000211;//kernel.Map:211
      _this.mapOnTable=[];
      //$LASTPOS=26000233;//kernel.Map:233
      //$LASTPOS=26000237;//kernel.Map:237
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=26000266;//kernel.Map:266
          _this.rows=[];
          //$LASTPOS=26000286;//kernel.Map:286
          //$LASTPOS=26000290;//kernel.Map:290
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=26000323;//kernel.Map:323
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=26000358;//kernel.Map:358
          _this.mapTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=26000391;//kernel.Map:391
      //$LASTPOS=26000395;//kernel.Map:395
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=26000424;//kernel.Map:424
          _this.rows=[];
          //$LASTPOS=26000444;//kernel.Map:444
          //$LASTPOS=26000448;//kernel.Map:448
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=26000481;//kernel.Map:481
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=26000516;//kernel.Map:516
          _this.mapOnTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=26000616;//kernel.Map:616
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=26000648;//kernel.Map:648
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=26000674;//kernel.Map:674
      //$LASTPOS=26000678;//kernel.Map:678
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=26000707;//kernel.Map:707
          //$LASTPOS=26000711;//kernel.Map:711
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=26000744;//kernel.Map:744
              _this.set(j,i,_this.mapData[i][j]);
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=26000791;//kernel.Map:791
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=26000819;//kernel.Map:819
      //$LASTPOS=26000823;//kernel.Map:823
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=26000852;//kernel.Map:852
          //$LASTPOS=26000856;//kernel.Map:856
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=26000889;//kernel.Map:889
              _this.setOn(j,i,_this.mapOnData[i][j]);
            }
            j++;
          }
        }
        i++;
      }
    },
    fiber$initMap :function _trc_Map_f_initMap(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=26000648;//kernel.Map:648
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26000674;//kernel.Map:674
            //$LASTPOS=26000678;//kernel.Map:678
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=5; break; }
            //$LASTPOS=26000707;//kernel.Map:707
            //$LASTPOS=26000711;//kernel.Map:711
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=4; break; }
            //$LASTPOS=26000744;//kernel.Map:744
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
            j++;
            __pc=2;break;
          case 4:
            
            i++;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=26000791;//kernel.Map:791
            if (!(! _this.mapOnData)) { __pc=6; break; }
            _thread.exit(_this);return;
          case 6:
            
            //$LASTPOS=26000819;//kernel.Map:819
            //$LASTPOS=26000823;//kernel.Map:823
            i = 0;;
          case 7:
            if (!(i<_this.row)) { __pc=11; break; }
            //$LASTPOS=26000852;//kernel.Map:852
            //$LASTPOS=26000856;//kernel.Map:856
            j = 0;;
          case 8:
            if (!(j<_this.col)) { __pc=10; break; }
            //$LASTPOS=26000889;//kernel.Map:889
            _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);
            __pc=9;return;
          case 9:
            
            j++;
            __pc=8;break;
          case 10:
            
            i++;
            __pc=7;break;
          case 11:
            
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
      
      //$LASTPOS=26000958;//kernel.Map:958
      if (! _this.mapTable) {
        return _this;
      }
      //$LASTPOS=26000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=26001057;//kernel.Map:1057
      //$LASTPOS=26001061;//kernel.Map:1061
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=26001090;//kernel.Map:1090
          //$LASTPOS=26001094;//kernel.Map:1094
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=26001127;//kernel.Map:1127
              _this.set(j,i,_this.mapTable[i][j]);
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=26001175;//kernel.Map:1175
      if (! _this.mapOnTable) {
        return _this;
      }
      //$LASTPOS=26001204;//kernel.Map:1204
      //$LASTPOS=26001208;//kernel.Map:1208
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=26001237;//kernel.Map:1237
          //$LASTPOS=26001241;//kernel.Map:1241
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=26001274;//kernel.Map:1274
              _this.setOn(j,i,_this.mapOnTable[i][j]);
            }
            j++;
          }
        }
        i++;
      }
    },
    fiber$redrawMap :function _trc_Map_f_redrawMap(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=26000958;//kernel.Map:958
      if (! _this.mapTable) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=26000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_redrawMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26001057;//kernel.Map:1057
            //$LASTPOS=26001061;//kernel.Map:1061
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=5; break; }
            //$LASTPOS=26001090;//kernel.Map:1090
            //$LASTPOS=26001094;//kernel.Map:1094
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=4; break; }
            //$LASTPOS=26001127;//kernel.Map:1127
            _this.fiber$set(_thread, j, i, _this.mapTable[i][j]);
            __pc=3;return;
          case 3:
            
            j++;
            __pc=2;break;
          case 4:
            
            i++;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=26001175;//kernel.Map:1175
            if (!(! _this.mapOnTable)) { __pc=6; break; }
            _thread.exit(_this);return;
          case 6:
            
            //$LASTPOS=26001204;//kernel.Map:1204
            //$LASTPOS=26001208;//kernel.Map:1208
            i = 0;;
          case 7:
            if (!(i<_this.row)) { __pc=11; break; }
            //$LASTPOS=26001237;//kernel.Map:1237
            //$LASTPOS=26001241;//kernel.Map:1241
            j = 0;;
          case 8:
            if (!(j<_this.col)) { __pc=10; break; }
            //$LASTPOS=26001274;//kernel.Map:1274
            _this.fiber$setOn(_thread, j, i, _this.mapOnTable[i][j]);
            __pc=9;return;
          case 9:
            
            j++;
            __pc=8;break;
          case 10:
            
            i++;
            __pc=7;break;
          case 11:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    load :function _trc_Map_load(dataFile) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=26001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=26001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=26001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=26001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=26001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=26001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=26001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=26001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=26001612;//kernel.Map:1612
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=26001684;//kernel.Map:1684
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=26001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=26001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=26001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=26001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=26001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=26001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=26001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=26001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=26001612;//kernel.Map:1612
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26001684;//kernel.Map:1684
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
      
      //$LASTPOS=26001727;//kernel.Map:1727
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=26001795;//kernel.Map:1795
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=26001866;//kernel.Map:1866
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=26001900;//kernel.Map:1900
      p=Math.floor(p);
      //$LASTPOS=26001922;//kernel.Map:1922
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=26001960;//kernel.Map:1960
      if (! _this.pImg) {
        //$LASTPOS=26001982;//kernel.Map:1982
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=26002083;//kernel.Map:2083
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=26002160;//kernel.Map:2160
      _this.ctx.save();
      //$LASTPOS=26002177;//kernel.Map:2177
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=26002321;//kernel.Map:2321
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26001727;//kernel.Map:1727
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=26001795;//kernel.Map:1795
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=26001866;//kernel.Map:1866
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=26001900;//kernel.Map:1900
      p=Math.floor(p);
      //$LASTPOS=26001922;//kernel.Map:1922
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=26001960;//kernel.Map:1960
      if (! _this.pImg) {
        //$LASTPOS=26001982;//kernel.Map:1982
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=26002083;//kernel.Map:2083
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=26002160;//kernel.Map:2160
      _this.ctx.save();
      //$LASTPOS=26002177;//kernel.Map:2177
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=26002321;//kernel.Map:2321
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26002370;//kernel.Map:2370
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=26002438;//kernel.Map:2438
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=26002488;//kernel.Map:2488
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=26002523;//kernel.Map:2523
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=26002557;//kernel.Map:2557
      p=Math.floor(p);
      //$LASTPOS=26002579;//kernel.Map:2579
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=26002617;//kernel.Map:2617
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=26002641;//kernel.Map:2641
      _this.ctx.save();
      //$LASTPOS=26002658;//kernel.Map:2658
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=26002802;//kernel.Map:2802
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26002370;//kernel.Map:2370
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26002438;//kernel.Map:2438
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=26002488;//kernel.Map:2488
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=26002523;//kernel.Map:2523
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=26002557;//kernel.Map:2557
            p=Math.floor(p);
            //$LASTPOS=26002579;//kernel.Map:2579
            _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
            //$LASTPOS=26002617;//kernel.Map:2617
            if (!(! _this.pImg)) { __pc=2; break; }
            _thread.exit(_this);return;
          case 2:
            
            //$LASTPOS=26002641;//kernel.Map:2641
            _this.ctx.save();
            //$LASTPOS=26002658;//kernel.Map:2658
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=26002802;//kernel.Map:2802
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26002849;//kernel.Map:2849
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
            //$LASTPOS=26002849;//kernel.Map:2849
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
      
      //$LASTPOS=26002944;//kernel.Map:2944
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
            //$LASTPOS=26002944;//kernel.Map:2944
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
      
      //$LASTPOS=26003037;//kernel.Map:3037
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
      
      //$LASTPOS=26003037;//kernel.Map:3037
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
      
      //$LASTPOS=26003269;//kernel.Map:3269
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
      
      //$LASTPOS=26003269;//kernel.Map:3269
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
      
      //$LASTPOS=26003512;//kernel.Map:3512
      _this.sx=- scrollX;
      //$LASTPOS=26003530;//kernel.Map:3530
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26003512;//kernel.Map:3512
      _this.sx=- scrollX;
      //$LASTPOS=26003530;//kernel.Map:3530
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26003565;//kernel.Map:3565
      _this.pImg=_this.buf[0];
      //$LASTPOS=26003583;//kernel.Map:3583
      ctx.save();
      //$LASTPOS=26003600;//kernel.Map:3600
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=26003712;//kernel.Map:3712
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
      
      //$LASTPOS=27000072;//kernel.Panel:72
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=27000089;//kernel.Panel:89
      _this.width=_this.width;
      //$LASTPOS=27000112;//kernel.Panel:112
      _this.height=_this.height;
      //$LASTPOS=27000137;//kernel.Panel:137
      if (_this.align==null) {
        //$LASTPOS=27000153;//kernel.Panel:153
        _this.align="center";
      }
      //$LASTPOS=27000174;//kernel.Panel:174
      if (_this.alpha==null) {
        //$LASTPOS=27000190;//kernel.Panel:190
        _this.alpha=255;
      }
      //$LASTPOS=27000206;//kernel.Panel:206
      if (_this._drawn==null) {
        //$LASTPOS=27000223;//kernel.Panel:223
        _this._drawn=false;
      }
      //$LASTPOS=27000242;//kernel.Panel:242
      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=27000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=27000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=27000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=27000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000432;//kernel.Panel:432
      _this.setPanel(width,height);
    },
    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_resize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000432;//kernel.Panel:432
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
      
      //$LASTPOS=27000480;//kernel.Panel:480
      _this._drawn=true;
      return _this.buf[0].getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000480;//kernel.Panel:480
      _this._drawn=true;
      _thread.retVal=_this.buf[0].getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000561;//kernel.Panel:561
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000561;//kernel.Panel:561
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000629;//kernel.Panel:629
      _this.ctx=_this.getContext();
      //$LASTPOS=27000652;//kernel.Panel:652
      _this.ctx.save();
      //$LASTPOS=27000719;//kernel.Panel:719
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=27000749;//kernel.Panel:749
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=27000794;//kernel.Panel:794
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
            //$LASTPOS=27000629;//kernel.Panel:629
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=27000652;//kernel.Panel:652
            _this.ctx.save();
            //$LASTPOS=27000719;//kernel.Panel:719
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=27000749;//kernel.Panel:749
            _this.ctx.fillRect(x,y,rectWidth,rectHeight);
            //$LASTPOS=27000794;//kernel.Panel:794
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
      
      //$LASTPOS=27000850;//kernel.Panel:850
      _this.ctx=_this.getContext();
      //$LASTPOS=27000873;//kernel.Panel:873
      _this.ctx.save();
      //$LASTPOS=27000890;//kernel.Panel:890
      text=text+"";
      //$LASTPOS=27000909;//kernel.Panel:909
      splits = text.split("\n");
      //$LASTPOS=27000995;//kernel.Panel:995
      _this.ctx.textAlign=align;
      //$LASTPOS=27001023;//kernel.Panel:1023
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=27001053;//kernel.Panel:1053
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=27001092;//kernel.Panel:1092
      //$LASTPOS=27001096;//kernel.Panel:1096
      colCount = 0;
      while(colCount<splits.length) {
        {
          //$LASTPOS=27001156;//kernel.Panel:1156
          _this.ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=27001201;//kernel.Panel:1201
          y+=size;
        }
        colCount++;
      }
      //$LASTPOS=27001222;//kernel.Panel:1222
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
            //$LASTPOS=27000850;//kernel.Panel:850
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=27000873;//kernel.Panel:873
            _this.ctx.save();
            //$LASTPOS=27000890;//kernel.Panel:890
            text=text+"";
            //$LASTPOS=27000909;//kernel.Panel:909
            splits = text.split("\n");
            //$LASTPOS=27000995;//kernel.Panel:995
            _this.ctx.textAlign=align;
            //$LASTPOS=27001023;//kernel.Panel:1023
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=27001053;//kernel.Panel:1053
            _this.ctx.font=size+"px 'Courier New'";
            //$LASTPOS=27001092;//kernel.Panel:1092
            //$LASTPOS=27001096;//kernel.Panel:1096
            colCount = 0;
            while(colCount<splits.length) {
              {
                //$LASTPOS=27001156;//kernel.Panel:1156
                _this.ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=27001201;//kernel.Panel:1201
                y+=size;
              }
              colCount++;
            }
            //$LASTPOS=27001222;//kernel.Panel:1222
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27001287;//kernel.Panel:1287
      _this.ctx=_this.getContext();
      //$LASTPOS=27001310;//kernel.Panel:1310
      _this.ctx.save();
      //$LASTPOS=27001327;//kernel.Panel:1327
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=27001376;//kernel.Panel:1376
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
            //$LASTPOS=27001287;//kernel.Panel:1287
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=27001310;//kernel.Panel:1310
            _this.ctx.save();
            //$LASTPOS=27001327;//kernel.Panel:1327
            _this.ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=27001376;//kernel.Panel:1376
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27001422;//kernel.Panel:1422
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=27001521;//kernel.Panel:1521
        _this.ctx=_this.getContext();
        //$LASTPOS=27001548;//kernel.Panel:1548
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=27001600;//kernel.Panel:1600
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=27001740;//kernel.Panel:1740
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
            //$LASTPOS=27001422;//kernel.Panel:1422
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
            //$LASTPOS=27001521;//kernel.Panel:1521
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=27001548;//kernel.Panel:1548
            _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=27001600;//kernel.Panel:1600
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=27001740;//kernel.Panel:1740
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
      
      //$LASTPOS=27001827;//kernel.Panel:1827
      _this.ctx=_this.getContext();
      //$LASTPOS=27001850;//kernel.Panel:1850
      _this.ctx.save();
      //$LASTPOS=27001867;//kernel.Panel:1867
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=27001928;//kernel.Panel:1928
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=27001962;//kernel.Panel:1962
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=27002014;//kernel.Panel:2014
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
            //$LASTPOS=27001827;//kernel.Panel:1827
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=27001850;//kernel.Panel:1850
            _this.ctx.save();
            //$LASTPOS=27001867;//kernel.Panel:1867
            _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=27001928;//kernel.Panel:1928
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=27001962;//kernel.Panel:1962
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=27002014;//kernel.Panel:2014
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27002050;//kernel.Panel:2050
      if (_this._drawn) {
        //$LASTPOS=27002071;//kernel.Panel:2071
        _this.pImg=_this.buf[0];
        //$LASTPOS=27002093;//kernel.Panel:2093
        ctx.save();
        //$LASTPOS=27002114;//kernel.Panel:2114
        if (_this.align=="left") {
          //$LASTPOS=27002146;//kernel.Panel:2146
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=27002198;//kernel.Panel:2198
          if (_this.align=="center") {
            //$LASTPOS=27002232;//kernel.Panel:2232
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=27002267;//kernel.Panel:2267
            if (_this.align=="right") {
              //$LASTPOS=27002300;//kernel.Panel:2300
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=27002357;//kernel.Panel:2357
        if (_this.rotation!=0) {
          //$LASTPOS=27002392;//kernel.Panel:2392
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=27002460;//kernel.Panel:2460
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=27002517;//kernel.Panel:2517
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=27002558;//kernel.Panel:2558
        ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=27002662;//kernel.Panel:2662
        ctx.restore();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}
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
      
      //$LASTPOS=28000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=28000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=28000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=28000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=28000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=28000257;//kernel.ScaledCanvas:257
      _this.color="rgb(20,80,180)";
      //$LASTPOS=28000291;//kernel.ScaledCanvas:291
      _this.sx=0;
      //$LASTPOS=28000302;//kernel.ScaledCanvas:302
      _this.sy=0;
      //$LASTPOS=28000313;//kernel.ScaledCanvas:313
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=28000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=28000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=28000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=28000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=28000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=28000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=28000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=28000632;//kernel.ScaledCanvas:632
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=28000666;//kernel.ScaledCanvas:666
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=28000704;//kernel.ScaledCanvas:704
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=28000732;//kernel.ScaledCanvas:732
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=28000793;//kernel.ScaledCanvas:793
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=28000834;//kernel.ScaledCanvas:834
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=28000876;//kernel.ScaledCanvas:876
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=28000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=28000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=28000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=28000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=28000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=28000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=28000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=28000632;//kernel.ScaledCanvas:632
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=28000666;//kernel.ScaledCanvas:666
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=28000704;//kernel.ScaledCanvas:704
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=28000732;//kernel.ScaledCanvas:732
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=28000793;//kernel.ScaledCanvas:793
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=28000834;//kernel.ScaledCanvas:834
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=28000876;//kernel.ScaledCanvas:876
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=28000998;//kernel.ScaledCanvas:998
      larger = 200;
      //$LASTPOS=28001019;//kernel.ScaledCanvas:1019
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
      
      //$LASTPOS=28000998;//kernel.ScaledCanvas:998
      larger = 200;
      //$LASTPOS=28001019;//kernel.ScaledCanvas:1019
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
      
      //$LASTPOS=28001154;//kernel.ScaledCanvas:1154
      _this.cw=_this.canvas.width();
      //$LASTPOS=28001178;//kernel.ScaledCanvas:1178
      _this.ch=_this.canvas.height();
      //$LASTPOS=28001203;//kernel.ScaledCanvas:1203
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=28001247;//kernel.ScaledCanvas:1247
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=28001291;//kernel.ScaledCanvas:1291
      if (calch>_this.ch) {
        //$LASTPOS=28001305;//kernel.ScaledCanvas:1305
        calch=_this.ch;
      }
      //$LASTPOS=28001320;//kernel.ScaledCanvas:1320
      if (calcw>_this.cw) {
        //$LASTPOS=28001334;//kernel.ScaledCanvas:1334
        calcw=_this.cw;
      }
      //$LASTPOS=28001349;//kernel.ScaledCanvas:1349
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=28001381;//kernel.ScaledCanvas:1381
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=28001437;//kernel.ScaledCanvas:1437
        calcw=_this.width;
        //$LASTPOS=28001449;//kernel.ScaledCanvas:1449
        calch=_this.height;
        
      }
      //$LASTPOS=28001475;//kernel.ScaledCanvas:1475
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=28001518;//kernel.ScaledCanvas:1518
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=28001561;//kernel.ScaledCanvas:1561
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=28001676;//kernel.ScaledCanvas:1676
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=28001720;//kernel.ScaledCanvas:1720
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=28001764;//kernel.ScaledCanvas:1764
      if (calch>_this.ch) {
        //$LASTPOS=28001778;//kernel.ScaledCanvas:1778
        calch=_this.ch;
      }
      //$LASTPOS=28001793;//kernel.ScaledCanvas:1793
      if (calcw>_this.cw) {
        //$LASTPOS=28001807;//kernel.ScaledCanvas:1807
        calcw=_this.cw;
      }
      //$LASTPOS=28001822;//kernel.ScaledCanvas:1822
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=28001878;//kernel.ScaledCanvas:1878
        calcw=_this.width;
        //$LASTPOS=28001890;//kernel.ScaledCanvas:1890
        calch=_this.height;
        
      }
      //$LASTPOS=28001916;//kernel.ScaledCanvas:1916
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=28001959;//kernel.ScaledCanvas:1959
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=28002055;//kernel.ScaledCanvas:2055
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
      
      //$LASTPOS=28001676;//kernel.ScaledCanvas:1676
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=28001720;//kernel.ScaledCanvas:1720
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=28001764;//kernel.ScaledCanvas:1764
      if (calch>_this.ch) {
        //$LASTPOS=28001778;//kernel.ScaledCanvas:1778
        calch=_this.ch;
      }
      //$LASTPOS=28001793;//kernel.ScaledCanvas:1793
      if (calcw>_this.cw) {
        //$LASTPOS=28001807;//kernel.ScaledCanvas:1807
        calcw=_this.cw;
      }
      //$LASTPOS=28001822;//kernel.ScaledCanvas:1822
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=28001878;//kernel.ScaledCanvas:1878
        calcw=_this.width;
        //$LASTPOS=28001890;//kernel.ScaledCanvas:1890
        calch=_this.height;
        
      }
      //$LASTPOS=28001916;//kernel.ScaledCanvas:1916
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=28001959;//kernel.ScaledCanvas:1959
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=28002055;//kernel.ScaledCanvas:2055
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28002228;//kernel.ScaledCanvas:2228
      _this.color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28002228;//kernel.ScaledCanvas:2228
      _this.color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=28002272;//kernel.ScaledCanvas:2272
      ctx = cv.getContext("2d");
      //$LASTPOS=28002306;//kernel.ScaledCanvas:2306
      ctx.save();
      //$LASTPOS=28002323;//kernel.ScaledCanvas:2323
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=28002357;//kernel.ScaledCanvas:2357
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=28002383;//kernel.ScaledCanvas:2383
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=28002426;//kernel.ScaledCanvas:2426
      if (_this.isDrawGrid) {
        //$LASTPOS=28002442;//kernel.ScaledCanvas:2442
        _this.drawGrid(cv);
      }
      //$LASTPOS=28002461;//kernel.ScaledCanvas:2461
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=28002272;//kernel.ScaledCanvas:2272
      ctx = cv.getContext("2d");
      //$LASTPOS=28002306;//kernel.ScaledCanvas:2306
      ctx.save();
      //$LASTPOS=28002323;//kernel.ScaledCanvas:2323
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=28002357;//kernel.ScaledCanvas:2357
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=28002383;//kernel.ScaledCanvas:2383
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=28002426;//kernel.ScaledCanvas:2426
      if (_this.isDrawGrid) {
        //$LASTPOS=28002442;//kernel.ScaledCanvas:2442
        _this.drawGrid(cv);
      }
      //$LASTPOS=28002461;//kernel.ScaledCanvas:2461
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28002805;//kernel.ScaledCanvas:2805
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28002805;//kernel.ScaledCanvas:2805
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}
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
      
      //$LASTPOS=29000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=29000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=29000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=29000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=29000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=29000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=29000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=29000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=29000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=29000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=29000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=29000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=29000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=29000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=29000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=29000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=29000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      "use strict";
      var _this=this;
      var idx;
      
      //$LASTPOS=29000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=29000433;//kernel.Sprites:433
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=29000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=29000485;//kernel.Sprites:485
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=29000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=29000433;//kernel.Sprites:433
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=29000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=29000485;//kernel.Sprites:485
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes() {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=29000542;//kernel.Sprites:542
      //$LASTPOS=29000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=29000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=29000641;//kernel.Sprites:641
            _this.sprites.splice(i,1);
            
          }
        }
        i--;
      }
    },
    fiber$removeOneframes :function _trc_Sprites_f_removeOneframes(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=29000542;//kernel.Sprites:542
      //$LASTPOS=29000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=29000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=29000641;//kernel.Sprites:641
            _this.sprites.splice(i,1);
            
          }
        }
        i--;
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      "use strict";
      var _this=this;
      var val1;
      var val2;
      
      //$LASTPOS=29000775;//kernel.Sprites:775
      val1 = obj1.zOrder||0;
      //$LASTPOS=29000805;//kernel.Sprites:805
      val2 = obj2.zOrder||0;
      //$LASTPOS=29000835;//kernel.Sprites:835
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=29000881;//kernel.Sprites:881
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=29000926;//kernel.Sprites:926
          if (val1==val2) {
            //$LASTPOS=29000951;//kernel.Sprites:951
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
      
      //$LASTPOS=29000775;//kernel.Sprites:775
      val1 = obj1.zOrder||0;
      //$LASTPOS=29000805;//kernel.Sprites:805
      val2 = obj2.zOrder||0;
      //$LASTPOS=29000835;//kernel.Sprites:835
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=29000881;//kernel.Sprites:881
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=29000926;//kernel.Sprites:926
          if (val1==val2) {
            //$LASTPOS=29000951;//kernel.Sprites:951
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
    draw :function _trc_Sprites_draw(cv) {
      "use strict";
      var _this=this;
      var ctx;
      var orderArray;
      
      //$LASTPOS=29001111;//kernel.Sprites:1111
      ctx = cv.getContext("2d");
      //$LASTPOS=29001145;//kernel.Sprites:1145
      ctx.save();
      //$LASTPOS=29001290;//kernel.Sprites:1290
      orderArray = [];
      //$LASTPOS=29001314;//kernel.Sprites:1314
      orderArray=orderArray.concat(_this.sprites);
      //$LASTPOS=29001358;//kernel.Sprites:1358
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=29001391;//kernel.Sprites:1391
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=29001420;//kernel.Sprites:1420
      orderArray.forEach((function anonymous_1439(s) {
        
        //$LASTPOS=29001454;//kernel.Sprites:1454
        s.draw(ctx);
      }));
      //$LASTPOS=29001481;//kernel.Sprites:1481
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29001527;//kernel.Sprites:1527
      _this.hitWatchers.forEach((function anonymous_1547(w) {
        
        //$LASTPOS=29001571;//kernel.Sprites:1571
        _this.sprites.forEach((function anonymous_1587(a) {
          var a_owner;
          
          //$LASTPOS=29001659;//kernel.Sprites:1659
          a_owner = a;
          //$LASTPOS=29001701;//kernel.Sprites:1701
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=29001754;//kernel.Sprites:1754
          _this.sprites.forEach((function anonymous_1770(b) {
            var b_owner;
            
            //$LASTPOS=29001802;//kernel.Sprites:1802
            b_owner = b;
            //$LASTPOS=29001848;//kernel.Sprites:1848
            if (a===b) {
              return _this;
            }
            //$LASTPOS=29001884;//kernel.Sprites:1884
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=29001989;//kernel.Sprites:1989
            if (a.crashTo1(b)) {
              //$LASTPOS=29002092;//kernel.Sprites:2092
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
      
      //$LASTPOS=29001527;//kernel.Sprites:1527
      _this.hitWatchers.forEach((function anonymous_1547(w) {
        
        //$LASTPOS=29001571;//kernel.Sprites:1571
        _this.sprites.forEach((function anonymous_1587(a) {
          var a_owner;
          
          //$LASTPOS=29001659;//kernel.Sprites:1659
          a_owner = a;
          //$LASTPOS=29001701;//kernel.Sprites:1701
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=29001754;//kernel.Sprites:1754
          _this.sprites.forEach((function anonymous_1770(b) {
            var b_owner;
            
            //$LASTPOS=29001802;//kernel.Sprites:1802
            b_owner = b;
            //$LASTPOS=29001848;//kernel.Sprites:1848
            if (a===b) {
              return _this;
            }
            //$LASTPOS=29001884;//kernel.Sprites:1884
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=29001989;//kernel.Sprites:1989
            if (a.crashTo1(b)) {
              //$LASTPOS=29002092;//kernel.Sprites:2092
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
      
      //$LASTPOS=29002222;//kernel.Sprites:2222
      p = {A: typeA,B: typeB,h: onHit};
      //$LASTPOS=29002286;//kernel.Sprites:2286
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      "use strict";
      var _this=this;
      var ctx;
      var i;
      
      //$LASTPOS=29002339;//kernel.Sprites:2339
      ctx = c.getContext("2d");
      //$LASTPOS=29002372;//kernel.Sprites:2372
      ctx.textBaseline="top";
      //$LASTPOS=29002401;//kernel.Sprites:2401
      ctx.save();
      //$LASTPOS=29002418;//kernel.Sprites:2418
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=29002458;//kernel.Sprites:2458
      //$LASTPOS=29002463;//kernel.Sprites:2463
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=29002503;//kernel.Sprites:2503
          ctx.beginPath();
          //$LASTPOS=29002529;//kernel.Sprites:2529
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=29002575;//kernel.Sprites:2575
          ctx.moveTo(i,0);
          //$LASTPOS=29002601;//kernel.Sprites:2601
          ctx.lineTo(i,c.height);
          //$LASTPOS=29002634;//kernel.Sprites:2634
          ctx.closePath();
          //$LASTPOS=29002660;//kernel.Sprites:2660
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=29002692;//kernel.Sprites:2692
      //$LASTPOS=29002697;//kernel.Sprites:2697
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=29002738;//kernel.Sprites:2738
          ctx.beginPath();
          //$LASTPOS=29002764;//kernel.Sprites:2764
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=29002810;//kernel.Sprites:2810
          ctx.moveTo(0,i);
          //$LASTPOS=29002836;//kernel.Sprites:2836
          ctx.lineTo(c.width,i);
          //$LASTPOS=29002868;//kernel.Sprites:2868
          ctx.closePath();
          //$LASTPOS=29002894;//kernel.Sprites:2894
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=29002920;//kernel.Sprites:2920
      ctx.fillStyle="white";
      //$LASTPOS=29002948;//kernel.Sprites:2948
      ctx.font="15px monospaced";
      //$LASTPOS=29002981;//kernel.Sprites:2981
      //$LASTPOS=29002986;//kernel.Sprites:2986
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=29003029;//kernel.Sprites:3029
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=29003063;//kernel.Sprites:3063
      //$LASTPOS=29003068;//kernel.Sprites:3068
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=29003112;//kernel.Sprites:3112
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=29003146;//kernel.Sprites:3146
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=29002339;//kernel.Sprites:2339
      ctx = c.getContext("2d");
      //$LASTPOS=29002372;//kernel.Sprites:2372
      ctx.textBaseline="top";
      //$LASTPOS=29002401;//kernel.Sprites:2401
      ctx.save();
      //$LASTPOS=29002418;//kernel.Sprites:2418
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=29002458;//kernel.Sprites:2458
      //$LASTPOS=29002463;//kernel.Sprites:2463
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=29002503;//kernel.Sprites:2503
          ctx.beginPath();
          //$LASTPOS=29002529;//kernel.Sprites:2529
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=29002575;//kernel.Sprites:2575
          ctx.moveTo(i,0);
          //$LASTPOS=29002601;//kernel.Sprites:2601
          ctx.lineTo(i,c.height);
          //$LASTPOS=29002634;//kernel.Sprites:2634
          ctx.closePath();
          //$LASTPOS=29002660;//kernel.Sprites:2660
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=29002692;//kernel.Sprites:2692
      //$LASTPOS=29002697;//kernel.Sprites:2697
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=29002738;//kernel.Sprites:2738
          ctx.beginPath();
          //$LASTPOS=29002764;//kernel.Sprites:2764
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=29002810;//kernel.Sprites:2810
          ctx.moveTo(0,i);
          //$LASTPOS=29002836;//kernel.Sprites:2836
          ctx.lineTo(c.width,i);
          //$LASTPOS=29002868;//kernel.Sprites:2868
          ctx.closePath();
          //$LASTPOS=29002894;//kernel.Sprites:2894
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=29002920;//kernel.Sprites:2920
      ctx.fillStyle="white";
      //$LASTPOS=29002948;//kernel.Sprites:2948
      ctx.font="15px monospaced";
      //$LASTPOS=29002981;//kernel.Sprites:2981
      //$LASTPOS=29002986;//kernel.Sprites:2986
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=29003029;//kernel.Sprites:3029
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=29003063;//kernel.Sprites:3063
      //$LASTPOS=29003068;//kernel.Sprites:3068
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=29003112;//kernel.Sprites:3112
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=29003146;//kernel.Sprites:3146
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setImageList :function _trc_Sprites_setImageList(il) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29003198;//kernel.Sprites:3198
      _this.imageList=il;
    },
    fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29003198;//kernel.Sprites:3198
      _this.imageList=il;
      
      _thread.retVal=_this;return;
    },
    getImageList :function _trc_Sprites_getImageList() {
      "use strict";
      var _this=this;
      
      return _this.imageList;
    },
    fiber$getImageList :function _trc_Sprites_f_getImageList(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.imageList;return;
      
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29003310;//kernel.Sprites:3310
      _this.sx=scrollX;
      //$LASTPOS=29003327;//kernel.Sprites:3327
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29003310;//kernel.Sprites:3310
      _this.sx=scrollX;
      //$LASTPOS=29003327;//kernel.Sprites:3327
      _this.sy=scrollY;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}
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
    getWorld :function _trc_BodyActor_getWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000069;//kernel.BodyActor:69
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=30000105;//kernel.BodyActor:105
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000069;//kernel.BodyActor:69
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=30000105;//kernel.BodyActor:105
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      _thread.retVal=Tonyu.globals.$t2World;return;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_BodyActor_onAppear() {
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
      
      //$LASTPOS=30000172;//kernel.BodyActor:172
      wworld = _this.getWorld();
      //$LASTPOS=30000200;//kernel.BodyActor:200
      _this.world=wworld.world;
      //$LASTPOS=30000225;//kernel.BodyActor:225
      _this.scale=wworld.scale;
      //$LASTPOS=30000250;//kernel.BodyActor:250
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30000294;//kernel.BodyActor:294
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=30000341;//kernel.BodyActor:341
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=30000382;//kernel.BodyActor:382
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=30000435;//kernel.BodyActor:435
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=30000482;//kernel.BodyActor:482
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=30000547;//kernel.BodyActor:547
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=30000616;//kernel.BodyActor:616
      fixDef = new b2FixtureDef;
      //$LASTPOS=30000652;//kernel.BodyActor:652
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=30000694;//kernel.BodyActor:694
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=30000738;//kernel.BodyActor:738
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=30000794;//kernel.BodyActor:794
      bodyDef = new b2BodyDef;
      //$LASTPOS=30000828;//kernel.BodyActor:828
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=30000916;//kernel.BodyActor:916
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=30000952;//kernel.BodyActor:952
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=30000988;//kernel.BodyActor:988
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=30001037;//kernel.BodyActor:1037
      w = _this.width;h = _this.height;
      //$LASTPOS=30001064;//kernel.BodyActor:1064
      if (! w) {
        //$LASTPOS=30001083;//kernel.BodyActor:1083
        _this.detectShape();
        //$LASTPOS=30001107;//kernel.BodyActor:1107
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=30001137;//kernel.BodyActor:1137
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=30001179;//kernel.BodyActor:1179
      if (_this.shape=="box") {
        //$LASTPOS=30001208;//kernel.BodyActor:1208
        if (! h) {
          //$LASTPOS=30001216;//kernel.BodyActor:1216
          h=w;
        }
        //$LASTPOS=30001230;//kernel.BodyActor:1230
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=30001274;//kernel.BodyActor:1274
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=30001378;//kernel.BodyActor:1378
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=30001415;//kernel.BodyActor:1415
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=30001492;//kernel.BodyActor:1492
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=30001528;//kernel.BodyActor:1528
      fps = wworld.fps;
      //$LASTPOS=30001553;//kernel.BodyActor:1553
      r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
      //$LASTPOS=30001635;//kernel.BodyActor:1635
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=30001672;//kernel.BodyActor:1672
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=30001705;//kernel.BodyActor:1705
      _this.body.SetUserData(_this);
      //$LASTPOS=30001734;//kernel.BodyActor:1734
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=30001767;//kernel.BodyActor:1767
      _this.rotation=r;
      //$LASTPOS=30001784;//kernel.BodyActor:1784
      _this.vrotation=vr;
    },
    fiber$onAppear :function _trc_BodyActor_f_onAppear(_thread) {
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
      
      //$LASTPOS=30000172;//kernel.BodyActor:172
      wworld = _this.getWorld();
      //$LASTPOS=30000200;//kernel.BodyActor:200
      _this.world=wworld.world;
      //$LASTPOS=30000225;//kernel.BodyActor:225
      _this.scale=wworld.scale;
      //$LASTPOS=30000250;//kernel.BodyActor:250
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30000294;//kernel.BodyActor:294
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=30000341;//kernel.BodyActor:341
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=30000382;//kernel.BodyActor:382
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=30000435;//kernel.BodyActor:435
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=30000482;//kernel.BodyActor:482
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=30000547;//kernel.BodyActor:547
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=30000616;//kernel.BodyActor:616
      fixDef = new b2FixtureDef;
      
      _thread.enter(function _trc_BodyActor_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000652;//kernel.BodyActor:652
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=1;return;
          case 1:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=30000694;//kernel.BodyActor:694
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=2;return;
          case 2:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=30000738;//kernel.BodyActor:738
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=3;return;
          case 3:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=30000794;//kernel.BodyActor:794
            bodyDef = new b2BodyDef;
            //$LASTPOS=30000828;//kernel.BodyActor:828
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=30000916;//kernel.BodyActor:916
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=30000952;//kernel.BodyActor:952
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=30000988;//kernel.BodyActor:988
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=30001037;//kernel.BodyActor:1037
            w = _this.width;h = _this.height;
            //$LASTPOS=30001064;//kernel.BodyActor:1064
            if (! w) {
              //$LASTPOS=30001083;//kernel.BodyActor:1083
              _this.detectShape();
              //$LASTPOS=30001107;//kernel.BodyActor:1107
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=30001137;//kernel.BodyActor:1137
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=30001179;//kernel.BodyActor:1179
            if (_this.shape=="box") {
              //$LASTPOS=30001208;//kernel.BodyActor:1208
              if (! h) {
                //$LASTPOS=30001216;//kernel.BodyActor:1216
                h=w;
              }
              //$LASTPOS=30001230;//kernel.BodyActor:1230
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=30001274;//kernel.BodyActor:1274
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=30001378;//kernel.BodyActor:1378
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=30001415;//kernel.BodyActor:1415
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=30001492;//kernel.BodyActor:1492
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=30001528;//kernel.BodyActor:1528
            fps = wworld.fps;
            //$LASTPOS=30001553;//kernel.BodyActor:1553
            r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
            //$LASTPOS=30001635;//kernel.BodyActor:1635
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=30001672;//kernel.BodyActor:1672
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=30001705;//kernel.BodyActor:1705
            _this.body.SetUserData(_this);
            //$LASTPOS=30001734;//kernel.BodyActor:1734
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=30001767;//kernel.BodyActor:1767
            _this.rotation=r;
            //$LASTPOS=30001784;//kernel.BodyActor:1784
            _this.vrotation=vr;
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
      
      //$LASTPOS=30001834;//kernel.BodyActor:1834
      res = [];m;point;
      //$LASTPOS=30001859;//kernel.BodyActor:1859
      w = _this.getWorld();
      //$LASTPOS=30001882;//kernel.BodyActor:1882
      //$LASTPOS=30001887;//kernel.BodyActor:1887
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=30001944;//kernel.BodyActor:1944
          if (c.IsTouching()) {
            //$LASTPOS=30001976;//kernel.BodyActor:1976
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=30002048;//kernel.BodyActor:2048
            if (m.m_points[0]) {
              //$LASTPOS=30002086;//kernel.BodyActor:2086
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=30002160;//kernel.BodyActor:2160
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=30002335;//kernel.BodyActor:2335
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=30002437;//kernel.BodyActor:2437
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=30002463;//kernel.BodyActor:2463
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=30002523;//kernel.BodyActor:2523
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=30002583;//kernel.BodyActor:2583
            if (a===_this) {
              //$LASTPOS=30002616;//kernel.BodyActor:2616
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=30002686;//kernel.BodyActor:2686
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=30002779;//kernel.BodyActor:2779
              if (b===_this) {
                //$LASTPOS=30002812;//kernel.BodyActor:2812
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=30002882;//kernel.BodyActor:2882
                  res.push({target: a,manifold: m,x: point.x,y: point.y});
                  
                }
                
              }
            }
            
          }
        }
        c=c.GetNext();
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
      
      //$LASTPOS=30001834;//kernel.BodyActor:1834
      res = [];m;point;
      //$LASTPOS=30001859;//kernel.BodyActor:1859
      w = _this.getWorld();
      //$LASTPOS=30001882;//kernel.BodyActor:1882
      //$LASTPOS=30001887;//kernel.BodyActor:1887
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=30001944;//kernel.BodyActor:1944
          if (c.IsTouching()) {
            //$LASTPOS=30001976;//kernel.BodyActor:1976
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=30002048;//kernel.BodyActor:2048
            if (m.m_points[0]) {
              //$LASTPOS=30002086;//kernel.BodyActor:2086
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=30002160;//kernel.BodyActor:2160
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=30002335;//kernel.BodyActor:2335
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=30002437;//kernel.BodyActor:2437
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=30002463;//kernel.BodyActor:2463
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=30002523;//kernel.BodyActor:2523
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=30002583;//kernel.BodyActor:2583
            if (a===_this) {
              //$LASTPOS=30002616;//kernel.BodyActor:2616
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=30002686;//kernel.BodyActor:2686
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=30002779;//kernel.BodyActor:2779
              if (b===_this) {
                //$LASTPOS=30002812;//kernel.BodyActor:2812
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=30002882;//kernel.BodyActor:2882
                  res.push({target: a,manifold: m,x: point.x,y: point.y});
                  
                }
                
              }
            }
            
          }
        }
        c=c.GetNext();
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=30003158;//kernel.BodyActor:3158
      res = [];
      //$LASTPOS=30003175;//kernel.BodyActor:3175
      //$LASTPOS=30003180;//kernel.BodyActor:3180
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=30003237;//kernel.BodyActor:3237
          if (c.IsTouching()) {
            //$LASTPOS=30003272;//kernel.BodyActor:3272
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=30003332;//kernel.BodyActor:3332
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=30003392;//kernel.BodyActor:3392
            if (a===_this) {
              //$LASTPOS=30003425;//kernel.BodyActor:3425
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=30003495;//kernel.BodyActor:3495
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=30003547;//kernel.BodyActor:3547
              if (b===_this) {
                //$LASTPOS=30003580;//kernel.BodyActor:3580
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=30003650;//kernel.BodyActor:3650
                  res.push(a);
                  
                }
                
              }
            }
            
          }
        }
        c=c.GetNext();
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
      
      //$LASTPOS=30003158;//kernel.BodyActor:3158
      res = [];
      //$LASTPOS=30003175;//kernel.BodyActor:3175
      //$LASTPOS=30003180;//kernel.BodyActor:3180
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=30003237;//kernel.BodyActor:3237
          if (c.IsTouching()) {
            //$LASTPOS=30003272;//kernel.BodyActor:3272
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=30003332;//kernel.BodyActor:3332
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=30003392;//kernel.BodyActor:3392
            if (a===_this) {
              //$LASTPOS=30003425;//kernel.BodyActor:3425
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=30003495;//kernel.BodyActor:3495
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=30003547;//kernel.BodyActor:3547
              if (b===_this) {
                //$LASTPOS=30003580;//kernel.BodyActor:3580
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=30003650;//kernel.BodyActor:3650
                  res.push(a);
                  
                }
                
              }
            }
            
          }
        }
        c=c.GetNext();
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    applyForce :function _trc_BodyActor_applyForce(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=30003768;//kernel.BodyActor:3768
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30003812;//kernel.BodyActor:3812
      scale = _this.getWorld().scale;
      //$LASTPOS=30003845;//kernel.BodyActor:3845
      fps = 60;
      //$LASTPOS=30003862;//kernel.BodyActor:3862
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
      
      //$LASTPOS=30003768;//kernel.BodyActor:3768
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30003812;//kernel.BodyActor:3812
      scale = _this.getWorld().scale;
      //$LASTPOS=30003845;//kernel.BodyActor:3845
      fps = 60;
      //$LASTPOS=30003862;//kernel.BodyActor:3862
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=30003956;//kernel.BodyActor:3956
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30004000;//kernel.BodyActor:4000
      scale = _this.getWorld().scale;
      //$LASTPOS=30004033;//kernel.BodyActor:4033
      fps = 60;
      //$LASTPOS=30004050;//kernel.BodyActor:4050
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
      
      //$LASTPOS=30003956;//kernel.BodyActor:3956
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30004000;//kernel.BodyActor:4000
      scale = _this.getWorld().scale;
      //$LASTPOS=30004033;//kernel.BodyActor:4033
      fps = 60;
      //$LASTPOS=30004050;//kernel.BodyActor:4050
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30004137;//kernel.BodyActor:4137
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30004137;//kernel.BodyActor:4137
      _this.body.ApplyTorque(a);
      
      _thread.retVal=_this;return;
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=30004184;//kernel.BodyActor:4184
      pos = _this.body.GetPosition();
      //$LASTPOS=30004217;//kernel.BodyActor:4217
      pos.x+=dx/_this.scale;
      //$LASTPOS=30004239;//kernel.BodyActor:4239
      pos.y+=dy/_this.scale;
      //$LASTPOS=30004261;//kernel.BodyActor:4261
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      //$LASTPOS=30004184;//kernel.BodyActor:4184
      pos = _this.body.GetPosition();
      //$LASTPOS=30004217;//kernel.BodyActor:4217
      pos.x+=dx/_this.scale;
      //$LASTPOS=30004239;//kernel.BodyActor:4239
      pos.y+=dy/_this.scale;
      //$LASTPOS=30004261;//kernel.BodyActor:4261
      _this.body.SetPosition(pos);
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=30004352;//kernel.BodyActor:4352
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=30004370;//kernel.BodyActor:4370
      _this.world.DestroyBody(_this.body);
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
      
      //$LASTPOS=30004462;//kernel.BodyActor:4462
      params=params||{};
      //$LASTPOS=30004486;//kernel.BodyActor:4486
      px = params.x||_this.x;
      //$LASTPOS=30004511;//kernel.BodyActor:4511
      py = params.y||_this.y;
      //$LASTPOS=30004536;//kernel.BodyActor:4536
      wworld = _this.getWorld();
      //$LASTPOS=30004578;//kernel.BodyActor:4578
      scale = wworld.scale;
      //$LASTPOS=30004607;//kernel.BodyActor:4607
      world = wworld.world;
      //$LASTPOS=30004636;//kernel.BodyActor:4636
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=30004683;//kernel.BodyActor:4683
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=30004724;//kernel.BodyActor:4724
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=30004779;//kernel.BodyActor:4779
      jd = new JDC;
      //$LASTPOS=30004800;//kernel.BodyActor:4800
      bodyDef = new b2BodyDef;
      //$LASTPOS=30004834;//kernel.BodyActor:4834
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=30004876;//kernel.BodyActor:4876
      bodyDef.position.x=px/scale;
      //$LASTPOS=30004913;//kernel.BodyActor:4913
      bodyDef.position.y=py/scale;
      //$LASTPOS=30004950;//kernel.BodyActor:4950
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=30004992;//kernel.BodyActor:4992
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30005036;//kernel.BodyActor:5036
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=30005099;//kernel.BodyActor:5099
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=30005153;//kernel.BodyActor:5153
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=30005201;//kernel.BodyActor:5201
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=30005249;//kernel.BodyActor:5249
        jd.enableLimit=true;
        
      }
      //$LASTPOS=30005284;//kernel.BodyActor:5284
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
      
      //$LASTPOS=30004462;//kernel.BodyActor:4462
      params=params||{};
      //$LASTPOS=30004486;//kernel.BodyActor:4486
      px = params.x||_this.x;
      //$LASTPOS=30004511;//kernel.BodyActor:4511
      py = params.y||_this.y;
      //$LASTPOS=30004536;//kernel.BodyActor:4536
      wworld = _this.getWorld();
      //$LASTPOS=30004578;//kernel.BodyActor:4578
      scale = wworld.scale;
      //$LASTPOS=30004607;//kernel.BodyActor:4607
      world = wworld.world;
      //$LASTPOS=30004636;//kernel.BodyActor:4636
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=30004683;//kernel.BodyActor:4683
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=30004724;//kernel.BodyActor:4724
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=30004779;//kernel.BodyActor:4779
      jd = new JDC;
      //$LASTPOS=30004800;//kernel.BodyActor:4800
      bodyDef = new b2BodyDef;
      //$LASTPOS=30004834;//kernel.BodyActor:4834
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=30004876;//kernel.BodyActor:4876
      bodyDef.position.x=px/scale;
      //$LASTPOS=30004913;//kernel.BodyActor:4913
      bodyDef.position.y=py/scale;
      //$LASTPOS=30004950;//kernel.BodyActor:4950
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=30004992;//kernel.BodyActor:4992
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=30005036;//kernel.BodyActor:5036
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=30005099;//kernel.BodyActor:5099
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=30005153;//kernel.BodyActor:5153
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=30005201;//kernel.BodyActor:5201
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=30005249;//kernel.BodyActor:5249
        jd.enableLimit=true;
        
      }
      //$LASTPOS=30005284;//kernel.BodyActor:5284
      world.CreateJoint(jd);
      
      _thread.retVal=_this;return;
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30005332;//kernel.BodyActor:5332
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30005436;//kernel.BodyActor:5436
      r=r||0;
      //$LASTPOS=30005449;//kernel.BodyActor:5449
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=30005503;//kernel.BodyActor:5503
      _this.body.SetAngle(_this.rad(r));
    },
    updatePos :function _trc_BodyActor_updatePos() {
      "use strict";
      var _this=this;
      
    },
    fiber$updatePos :function _trc_BodyActor_f_updatePos(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__x :function _trc_BodyActor___getter__x() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=30005698;//kernel.BodyActor:5698
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=30005725;//kernel.BodyActor:5725
      pos = _this.body.GetPosition();
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=30005794;//kernel.BodyActor:5794
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=30005823;//kernel.BodyActor:5823
      v=v||0;
      //$LASTPOS=30005836;//kernel.BodyActor:5836
      pos = _this.body.GetPosition();
      //$LASTPOS=30005869;//kernel.BodyActor:5869
      pos.x=v/_this.scale;
      //$LASTPOS=30005889;//kernel.BodyActor:5889
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=30005926;//kernel.BodyActor:5926
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=30005953;//kernel.BodyActor:5953
      pos = _this.body.GetPosition();
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=30006022;//kernel.BodyActor:6022
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=30006051;//kernel.BodyActor:6051
      v=v||0;
      //$LASTPOS=30006064;//kernel.BodyActor:6064
      pos = _this.body.GetPosition();
      //$LASTPOS=30006097;//kernel.BodyActor:6097
      pos.y=v/_this.scale;
      //$LASTPOS=30006117;//kernel.BodyActor:6117
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=30006157;//kernel.BodyActor:6157
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=30006185;//kernel.BodyActor:6185
      v = _this.body.GetLinearVelocity();
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=30006272;//kernel.BodyActor:6272
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=30006302;//kernel.BodyActor:6302
      v=v||0;
      //$LASTPOS=30006315;//kernel.BodyActor:6315
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=30006353;//kernel.BodyActor:6353
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=30006387;//kernel.BodyActor:6387
      if (v) {
        //$LASTPOS=30006394;//kernel.BodyActor:6394
        _this.body.SetAwake(true);
      }
      //$LASTPOS=30006420;//kernel.BodyActor:6420
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=30006465;//kernel.BodyActor:6465
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=30006493;//kernel.BodyActor:6493
      v = _this.body.GetLinearVelocity();
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=30006580;//kernel.BodyActor:6580
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=30006610;//kernel.BodyActor:6610
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=30006648;//kernel.BodyActor:6648
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=30006682;//kernel.BodyActor:6682
      if (v) {
        //$LASTPOS=30006689;//kernel.BodyActor:6689
        _this.body.SetAwake(true);
      }
      //$LASTPOS=30006715;//kernel.BodyActor:6715
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30006765;//kernel.BodyActor:6765
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30006871;//kernel.BodyActor:6871
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=30006901;//kernel.BodyActor:6901
      v=v||0;
      //$LASTPOS=30006914;//kernel.BodyActor:6914
      if (v) {
        //$LASTPOS=30006921;//kernel.BodyActor:6921
        _this.body.SetAwake(true);
      }
      //$LASTPOS=30006947;//kernel.BodyActor:6947
      _this.body.SetAngularVelocity(_this.rad(v*_this.getWorld().fps));
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContactPoints":{"nowait":false},"contactPoint":{"nowait":false},"allContact":{"nowait":false},"allContacts":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"addRevoluteJoint":{"nowait":false},"__getter__rotation":{"nowait":true},"__setter__rotation":{"nowait":true},"updatePos":{"nowait":false},"__getter__x":{"nowait":true},"__setter__x":{"nowait":true},"__getter__y":{"nowait":true},"__setter__y":{"nowait":true},"__getter__vx":{"nowait":true},"__setter__vx":{"nowait":true},"__getter__vy":{"nowait":true},"__setter__vy":{"nowait":true},"__getter__vrotation":{"nowait":true},"__setter__vrotation":{"nowait":true}}}
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
      
      //$LASTPOS=31000150;//kernel.T2World:150
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
            //$LASTPOS=31000150;//kernel.T2World:150
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
      
      //$LASTPOS=31000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=31000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31000133;//kernel.T2World:133
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
      
      //$LASTPOS=31000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=31000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=31000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=31000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      //$LASTPOS=31000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=31000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=31000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=31000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=31000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=31000572;//kernel.T2World:572
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
            //$LASTPOS=31000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=31000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=31000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=31000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            //$LASTPOS=31000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            //$LASTPOS=31000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=31000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=31000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=31000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=31000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=31000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=31000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=31000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=31000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=31000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=31000976;//kernel.T2World:976
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
            //$LASTPOS=31000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=31000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=31000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=31000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=31000976;//kernel.T2World:976
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
      
      //$LASTPOS=31001017;//kernel.T2World:1017
      //$LASTPOS=31001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=31001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=31001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=31001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
        b=b.GetNext();
      }
    },
    fiber$updatePos :function _trc_T2World_f_updatePos(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      var d;
      
      //$LASTPOS=31001017;//kernel.T2World:1017
      //$LASTPOS=31001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=31001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=31001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=31001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
        b=b.GetNext();
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
      
      //$LASTPOS=32000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        return _this;
      }
      //$LASTPOS=32000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=32000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=32000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=32000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=32000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=32000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    clearSEData :function _trc_T2MediaPlayer_clearSEData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=32000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=32000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000367;//kernel.T2MediaPlayer:367
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
            //$LASTPOS=32000367;//kernel.T2MediaPlayer:367
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
      
      //$LASTPOS=32000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
      "use strict";
      var _this=this;
      var data;
      
      //$LASTPOS=32000508;//kernel.T2MediaPlayer:508
      _this.runAsync((function anonymous_517(succ,err) {
        
        //$LASTPOS=32000567;//kernel.T2MediaPlayer:567
        T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
      }));
      //$LASTPOS=32000620;//kernel.T2MediaPlayer:620
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
            //$LASTPOS=32000508;//kernel.T2MediaPlayer:508
            _this.fiber$runAsync(_thread, (function anonymous_517(succ,err) {
              
              //$LASTPOS=32000567;//kernel.T2MediaPlayer:567
              T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
            }));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=32000620;//kernel.T2MediaPlayer:620
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
      var _it_287;
      var name;
      var url;
      var e;
      
      //$LASTPOS=32000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=32000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=32000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=32000974;//kernel.T2MediaPlayer:974
      _it_287=Tonyu.iterator(r.sounds,1);
      while(_it_287.next()) {
        s=_it_287[0];
        
        //$LASTPOS=32001010;//kernel.T2MediaPlayer:1010
        name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
        //$LASTPOS=32001084;//kernel.T2MediaPlayer:1084
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=32001142;//kernel.T2MediaPlayer:1142
          _this.print("Loading Sound2: "+name);
          //$LASTPOS=32001187;//kernel.T2MediaPlayer:1187
          _this.loadSE(name,url);
          
        } catch (e) {
          //$LASTPOS=32001242;//kernel.T2MediaPlayer:1242
          _this.print("Fail");
          //$LASTPOS=32001270;//kernel.T2MediaPlayer:1270
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
      var _it_287;
      var name;
      var url;
      var e;
      
      //$LASTPOS=32000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=32000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=32000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32000974;//kernel.T2MediaPlayer:974
            _it_287=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_287.next())) { __pc=5; break; }
            s=_it_287[0];
            
            //$LASTPOS=32001010;//kernel.T2MediaPlayer:1010
            name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
            //$LASTPOS=32001084;//kernel.T2MediaPlayer:1084
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3);
            //$LASTPOS=32001142;//kernel.T2MediaPlayer:1142
            _this.print("Loading Sound2: "+name);
            //$LASTPOS=32001187;//kernel.T2MediaPlayer:1187
            _this.fiber$loadSE(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4;break;
          case 3:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=32001242;//kernel.T2MediaPlayer:1242
              _this.print("Fail");
              //$LASTPOS=32001270;//kernel.T2MediaPlayer:1270
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
      
      //$LASTPOS=32001408;//kernel.T2MediaPlayer:1408
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=32001467;//kernel.T2MediaPlayer:1467
      if (vol==null) {
        //$LASTPOS=32001484;//kernel.T2MediaPlayer:1484
        vol=128;
      }
      //$LASTPOS=32001573;//kernel.T2MediaPlayer:1573
      if (vol<0) {
        //$LASTPOS=32001593;//kernel.T2MediaPlayer:1593
        vol=0;
      } else {
        //$LASTPOS=32001614;//kernel.T2MediaPlayer:1614
        if (vol>128) {
          //$LASTPOS=32001629;//kernel.T2MediaPlayer:1629
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
      
      //$LASTPOS=32001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=32001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      //$LASTPOS=32002024;//kernel.T2MediaPlayer:2024
      while (data==null) {
        //$LASTPOS=32002056;//kernel.T2MediaPlayer:2056
        _this.update();
        //$LASTPOS=32002075;//kernel.T2MediaPlayer:2075
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
      
      //$LASTPOS=32001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=32001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32002024;//kernel.T2MediaPlayer:2024
          case 1:
            if (!(data==null)) { __pc=3; break; }
            //$LASTPOS=32002056;//kernel.T2MediaPlayer:2056
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=32002075;//kernel.T2MediaPlayer:2075
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
      
      //$LASTPOS=32002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=32002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=32002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=32002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=32002278;//kernel.T2MediaPlayer:2278
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=32002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=32002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=32002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=32002278;//kernel.T2MediaPlayer:2278
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
      
      //$LASTPOS=32002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=32002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=32002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=32002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=32002715;//kernel.T2MediaPlayer:2715
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
      
      //$LASTPOS=32002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=32002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=32002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=32002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=32002715;//kernel.T2MediaPlayer:2715
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
      
      //$LASTPOS=32003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=32003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=32003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=32003278;//kernel.T2MediaPlayer:3278
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=32003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=32003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=32003278;//kernel.T2MediaPlayer:3278
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
      
      //$LASTPOS=32003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=32003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=32003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=32003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=32003737;//kernel.T2MediaPlayer:3737
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
      
      //$LASTPOS=32003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=32003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=32003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=32003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=32003737;//kernel.T2MediaPlayer:3737
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
      
      //$LASTPOS=32004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=32004338;//kernel.T2MediaPlayer:4338
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=32004383;//kernel.T2MediaPlayer:4383
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32004338;//kernel.T2MediaPlayer:4338
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
            //$LASTPOS=32004383;//kernel.T2MediaPlayer:4383
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
      
      //$LASTPOS=32004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=32004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=32004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=32004501;//kernel.T2MediaPlayer:4501
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=32004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=32004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=32004501;//kernel.T2MediaPlayer:4501
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
      
      //$LASTPOS=32004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=32004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=32004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=32004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=32004861;//kernel.T2MediaPlayer:4861
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
      
      //$LASTPOS=32004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=32004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=32004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=32004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=32004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=32004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=32004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=32005013;//kernel.T2MediaPlayer:5013
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
      
      //$LASTPOS=32004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=32004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=32004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=32005013;//kernel.T2MediaPlayer:5013
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
      
      //$LASTPOS=33000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=33000309;//kernel.PlainChar:309
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=33000355;//kernel.PlainChar:355
        _this.initSprite();
        
      }
      //$LASTPOS=33000381;//kernel.PlainChar:381
      if (typeof  x=="object") {
        //$LASTPOS=33000405;//kernel.PlainChar:405
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=33000437;//kernel.PlainChar:437
        if (typeof  x=="number") {
          //$LASTPOS=33000472;//kernel.PlainChar:472
          _this.x=x;
          //$LASTPOS=33000491;//kernel.PlainChar:491
          _this.y=y;
          //$LASTPOS=33000510;//kernel.PlainChar:510
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000547;//kernel.PlainChar:547
      _this.onDraw();
      //$LASTPOS=33000562;//kernel.PlainChar:562
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=33000593;//kernel.PlainChar:593
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000634;//kernel.PlainChar:634
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000634;//kernel.PlainChar:634
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
      
      //$LASTPOS=33000690;//kernel.PlainChar:690
      _this.onUpdate();
      //$LASTPOS=33000707;//kernel.PlainChar:707
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000690;//kernel.PlainChar:690
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000707;//kernel.PlainChar:707
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
      
      //$LASTPOS=33000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=33000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=33000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=33000890;//kernel.PlainChar:890
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=33000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=33000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000890;//kernel.PlainChar:890
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
      
      //$LASTPOS=33000922;//kernel.PlainChar:922
      _this.main();
      //$LASTPOS=33000935;//kernel.PlainChar:935
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
            //$LASTPOS=33000922;//kernel.PlainChar:922
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=33000935;//kernel.PlainChar:935
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    appear :function _trc_PlainChar_appear(t) {
      "use strict";
      var _this=this;
      
      return t;
    },
    fiber$appear :function _trc_PlainChar_f_appear(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=t;return;
      
      
      _thread.retVal=_this;return;
    },
    loadPage :function _trc_PlainChar_loadPage(page,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33001677;//kernel.PlainChar:1677
      _this.all().die();
      //$LASTPOS=33001695;//kernel.PlainChar:1695
      new page(arg);
      //$LASTPOS=33001715;//kernel.PlainChar:1715
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001677;//kernel.PlainChar:1677
      _this.all().die();
      //$LASTPOS=33001695;//kernel.PlainChar:1695
      new page(arg);
      //$LASTPOS=33001715;//kernel.PlainChar:1715
      _this.die();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"appear":{"nowait":false},"loadPage":{"nowait":false}}}
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
      
      //$LASTPOS=34000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=34000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=34000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=34000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=34000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=34000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=34000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=34000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=34000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=34000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000220;//kernel.SpriteChar:220
      if (_this.f) {
        //$LASTPOS=34000238;//kernel.SpriteChar:238
        if (! _this.scaleY) {
          //$LASTPOS=34000251;//kernel.SpriteChar:251
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=34000275;//kernel.SpriteChar:275
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=34000299;//kernel.SpriteChar:299
      Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=34000319;//kernel.SpriteChar:319
      if (_this.f) {
        //$LASTPOS=34000326;//kernel.SpriteChar:326
        _this.scaleX*=- 1;
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Line',
  shortName: 'T1Line',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
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
      
      //$LASTPOS=35000034;//kernel.T1Line:34
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=35000065;//kernel.T1Line:65
      ctx.strokeStyle=_this.col;
      //$LASTPOS=35000091;//kernel.T1Line:91
      ctx.beginPath();
      //$LASTPOS=35000113;//kernel.T1Line:113
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=35000135;//kernel.T1Line:135
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=35000159;//kernel.T1Line:159
      ctx.stroke();
      //$LASTPOS=35000178;//kernel.T1Line:178
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
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
      
      //$LASTPOS=36000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=36000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=36000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=36000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=36000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=36000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=36000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=36000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=36000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=36000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=36000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=36000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=36000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=36000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=36000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=36000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=36000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=36000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=36000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=36000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=36000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=36000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=36000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=36000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=36000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=36000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=36000885;//kernel.T1Map:885
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
      
      //$LASTPOS=36000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=36000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=36000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=36000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=36001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=36001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=36001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=36001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=36001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=36000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=36000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=36000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=36000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=36001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=36001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=36001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=36001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=36001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=37000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=37000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=37000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=37000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=37000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=37000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=37000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=37000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=37000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=37000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=37000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=37000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000103;//kernel.T1Page:103
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=37000131;//kernel.T1Page:131
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=37000159;//kernel.T1Page:159
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=37000189;//kernel.T1Page:189
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=37000222;//kernel.T1Page:222
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=37000251;//kernel.T1Page:251
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=37000282;//kernel.T1Page:282
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=37000313;//kernel.T1Page:313
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=37000347;//kernel.T1Page:347
            Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Text',
  shortName: 'T1Text',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
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
    draw :function _trc_T1Text_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000032;//kernel.T1Text:32
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=38000057;//kernel.T1Text:57
      c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=38000097;//kernel.T1Text:97
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=38000117;//kernel.T1Text:117
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TextChar',
  shortName: 'TextChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [Tonyu.classes.kernel.TextRectMod],
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
      
      //$LASTPOS=39000070;//kernel.TextChar:70
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=39000089;//kernel.TextChar:89
      _this.text="";
      //$LASTPOS=39000103;//kernel.TextChar:103
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=39000122;//kernel.TextChar:122
      _this.size=20;
      //$LASTPOS=39000136;//kernel.TextChar:136
      if (! _this.x) {
        //$LASTPOS=39000149;//kernel.TextChar:149
        _this.x=0;
      }
      //$LASTPOS=39000164;//kernel.TextChar:164
      if (! _this.y) {
        //$LASTPOS=39000177;//kernel.TextChar:177
        _this.y=0;
      }
      //$LASTPOS=39000192;//kernel.TextChar:192
      if (t) {
        //$LASTPOS=39000199;//kernel.TextChar:199
        _this.text=t;
      }
      //$LASTPOS=39000212;//kernel.TextChar:212
      if (c) {
        //$LASTPOS=39000219;//kernel.TextChar:219
        _this.fillStyle=c;
      }
      //$LASTPOS=39000237;//kernel.TextChar:237
      if (s) {
        //$LASTPOS=39000244;//kernel.TextChar:244
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      var rect;
      
      //$LASTPOS=39000274;//kernel.TextChar:274
      if (! _this.size) {
        //$LASTPOS=39000285;//kernel.TextChar:285
        _this.size=15;
      }
      //$LASTPOS=39000299;//kernel.TextChar:299
      if (! _this.align) {
        //$LASTPOS=39000311;//kernel.TextChar:311
        _this.align="left";
      }
      //$LASTPOS=39000330;//kernel.TextChar:330
      if (! _this.fillStyle) {
        //$LASTPOS=39000346;//kernel.TextChar:346
        _this.fillStyle="white";
      }
      //$LASTPOS=39000370;//kernel.TextChar:370
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=39000400;//kernel.TextChar:400
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=39000437;//kernel.TextChar:437
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=39000473;//kernel.TextChar:473
      rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
      //$LASTPOS=39000540;//kernel.TextChar:540
      _this.width=rect.w;
      //$LASTPOS=39000559;//kernel.TextChar:559
      _this.height=rect.h;
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
      
      //$LASTPOS=40000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=40000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=40000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=40000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=40000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=40000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=40000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=40000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=40000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=40000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=40000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=40000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=40000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=40000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=40000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=40000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=40000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=40000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=40000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=40000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=40000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=40000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=40000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=40000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=40000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=40000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=40001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=40001049;//kernel.GameConsole:1049
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
      
      //$LASTPOS=40000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=40000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=40000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=40000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=40000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=40000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=40000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=40000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=40000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=40000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=40000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=40000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=40000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=40000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=40001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=40001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=40001159;//kernel.GameConsole:1159
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
      var i;
      var j;
      
      //$LASTPOS=41000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=41000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=41000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=41000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      //$LASTPOS=41000158;//kernel.MapEditor:158
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=41000186;//kernel.MapEditor:186
      if (_this.fileList.exists()) {
        //$LASTPOS=41000214;//kernel.MapEditor:214
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=41000257;//kernel.MapEditor:257
          f=f+"";
          //$LASTPOS=41000274;//kernel.MapEditor:274
          _this.fNames=f.split("/");
          //$LASTPOS=41000304;//kernel.MapEditor:304
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=41000345;//kernel.MapEditor:345
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=41000388;//kernel.MapEditor:388
      if (_this.fileExist) {
        //$LASTPOS=41000408;//kernel.MapEditor:408
        _this.print("Load Data?: Y or N");
        //$LASTPOS=41000442;//kernel.MapEditor:442
        while (true) {
          //$LASTPOS=41000464;//kernel.MapEditor:464
          if (_this.getkey("y")>0) {
            //$LASTPOS=41000496;//kernel.MapEditor:496
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=41000551;//kernel.MapEditor:551
          if (_this.getkey("n")>0) {
            //$LASTPOS=41000583;//kernel.MapEditor:583
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=41000639;//kernel.MapEditor:639
          _this.update();
          
        }
        //$LASTPOS=41000661;//kernel.MapEditor:661
        if (_this.loadMode) {
          //$LASTPOS=41000684;//kernel.MapEditor:684
          _this.fileName=_this.prompt("Input json file (*.json)","map.json");
          //$LASTPOS=41000749;//kernel.MapEditor:749
          if (_this.fileName) {
            //$LASTPOS=41000776;//kernel.MapEditor:776
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=41000840;//kernel.MapEditor:840
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=41000876;//kernel.MapEditor:876
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=41000917;//kernel.MapEditor:917
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=41000967;//kernel.MapEditor:967
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=41001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=41001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=41001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=41001149;//kernel.MapEditor:1149
          if (_this.baseData==undefined) {
            //$LASTPOS=41001187;//kernel.MapEditor:1187
            _this.print("Load failed");
            //$LASTPOS=41001222;//kernel.MapEditor:1222
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=41001253;//kernel.MapEditor:1253
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=41001298;//kernel.MapEditor:1298
              _this.mapData=_this.baseData[0];
              //$LASTPOS=41001332;//kernel.MapEditor:1332
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=41001368;//kernel.MapEditor:1368
              if (_this.baseData.length>2) {
                //$LASTPOS=41001408;//kernel.MapEditor:1408
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=41001464;//kernel.MapEditor:1464
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=41001541;//kernel.MapEditor:1541
      _this.update();
      //$LASTPOS=41001855;//kernel.MapEditor:1855
      if (! _this.loadMode) {
        //$LASTPOS=41001875;//kernel.MapEditor:1875
        _this.row=_this.prompt("input row");
        //$LASTPOS=41001905;//kernel.MapEditor:1905
        _this.col=_this.prompt("input col");
        //$LASTPOS=41001935;//kernel.MapEditor:1935
        _this.chipWidth=_this.prompt("input chipWidth");
        //$LASTPOS=41001977;//kernel.MapEditor:1977
        _this.chipHeight=_this.prompt("input chipHeight");
        //$LASTPOS=41002021;//kernel.MapEditor:2021
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=41002086;//kernel.MapEditor:2086
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=41002117;//kernel.MapEditor:2117
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=41002149;//kernel.MapEditor:2149
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=41002182;//kernel.MapEditor:2182
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=41002233;//kernel.MapEditor:2233
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=41002544;//kernel.MapEditor:2544
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=41002591;//kernel.MapEditor:2591
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=41002617;//kernel.MapEditor:2617
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=41002713;//kernel.MapEditor:2713
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=41002744;//kernel.MapEditor:2744
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=41002776;//kernel.MapEditor:2776
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=41002809;//kernel.MapEditor:2809
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=41002876;//kernel.MapEditor:2876
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=41002932;//kernel.MapEditor:2932
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=41002989;//kernel.MapEditor:2989
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=41003041;//kernel.MapEditor:3041
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=41003094;//kernel.MapEditor:3094
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=41003176;//kernel.MapEditor:3176
      _this.counter=0;
      //$LASTPOS=41003188;//kernel.MapEditor:3188
      //$LASTPOS=41003192;//kernel.MapEditor:3192
      i = 0;
      while(i<Tonyu.globals.$mp.row) {
        {
          //$LASTPOS=41003221;//kernel.MapEditor:3221
          //$LASTPOS=41003225;//kernel.MapEditor:3225
          j = 0;
          while(j<Tonyu.globals.$mp.col) {
            {
              //$LASTPOS=41003258;//kernel.MapEditor:3258
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=41003302;//kernel.MapEditor:3302
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=41003346;//kernel.MapEditor:3346
      _this.mode="get";
      //$LASTPOS=41003359;//kernel.MapEditor:3359
      _this.prevMode="set";
      //$LASTPOS=41003376;//kernel.MapEditor:3376
      _this.mapp=0;
      //$LASTPOS=41003385;//kernel.MapEditor:3385
      _this.maponp=- 1;
      //$LASTPOS=41003397;//kernel.MapEditor:3397
      _this.mx=- 40;
      //$LASTPOS=41003406;//kernel.MapEditor:3406
      _this.my=- 40;
      //$LASTPOS=41003415;//kernel.MapEditor:3415
      _this.chipX=- 40;
      //$LASTPOS=41003427;//kernel.MapEditor:3427
      _this.chipY=- 40;
      //$LASTPOS=41003439;//kernel.MapEditor:3439
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=41003468;//kernel.MapEditor:3468
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=41003499;//kernel.MapEditor:3499
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=41003524;//kernel.MapEditor:3524
      _this.initialWidth=Tonyu.globals.$map.chipWidth;
      //$LASTPOS=41003554;//kernel.MapEditor:3554
      _this.initialHeight=Tonyu.globals.$map.chipHeight;
      //$LASTPOS=41003586;//kernel.MapEditor:3586
      _this.layers=["base","on","all"];
      //$LASTPOS=41003615;//kernel.MapEditor:3615
      _this.lc=0;
      //$LASTPOS=41003622;//kernel.MapEditor:3622
      _this.selectedLayer=_this.layers[_this.lc];
      //$LASTPOS=41003649;//kernel.MapEditor:3649
      _this.drawPanel();
      //$LASTPOS=41003665;//kernel.MapEditor:3665
      while (true) {
        //$LASTPOS=41003683;//kernel.MapEditor:3683
        _this.p=_this.mapp;
        //$LASTPOS=41003696;//kernel.MapEditor:3696
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=41003815;//kernel.MapEditor:3815
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=41003849;//kernel.MapEditor:3849
          _this.mode="erase";
          //$LASTPOS=41003872;//kernel.MapEditor:3872
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=41003905;//kernel.MapEditor:3905
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=41004024;//kernel.MapEditor:4024
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=41004058;//kernel.MapEditor:4058
          _this.mode="set";
          
        }
        //$LASTPOS=41004082;//kernel.MapEditor:4082
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=41004203;//kernel.MapEditor:4203
          _this.lc++;
          //$LASTPOS=41004218;//kernel.MapEditor:4218
          _this.selectedLayer=_this.layers[_this.lc%3];
          //$LASTPOS=41004255;//kernel.MapEditor:4255
          _this.drawPanel();
          //$LASTPOS=41004277;//kernel.MapEditor:4277
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=41004403;//kernel.MapEditor:4403
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=41004524;//kernel.MapEditor:4524
          if (_this.mode!="get") {
            //$LASTPOS=41004554;//kernel.MapEditor:4554
            _this.prevMode=_this.mode;
            //$LASTPOS=41004582;//kernel.MapEditor:4582
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=41004618;//kernel.MapEditor:4618
            _this.mode="get";
            //$LASTPOS=41004643;//kernel.MapEditor:4643
            _this.chipX=- 40;
            //$LASTPOS=41004667;//kernel.MapEditor:4667
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=41004707;//kernel.MapEditor:4707
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=41004745;//kernel.MapEditor:4745
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=41004780;//kernel.MapEditor:4780
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=41004813;//kernel.MapEditor:4813
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=41004949;//kernel.MapEditor:4949
          if (_this.loadedFile) {
            //$LASTPOS=41004978;//kernel.MapEditor:4978
            _this.saveFileName=_this.prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=41005066;//kernel.MapEditor:5066
            _this.saveFileName=_this.prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=41005160;//kernel.MapEditor:5160
          if (_this.saveFileName) {
            //$LASTPOS=41005191;//kernel.MapEditor:5191
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=41005253;//kernel.MapEditor:5253
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=41005415;//kernel.MapEditor:5415
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=41005452;//kernel.MapEditor:5452
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=41005505;//kernel.MapEditor:5505
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=41005626;//kernel.MapEditor:5626
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=41005660;//kernel.MapEditor:5660
          _this.mode="copy";
          //$LASTPOS=41005682;//kernel.MapEditor:5682
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=41005715;//kernel.MapEditor:5715
        if (_this.mode!="get") {
          //$LASTPOS=41005741;//kernel.MapEditor:5741
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=41005847;//kernel.MapEditor:5847
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=41005865;//kernel.MapEditor:5865
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=41005996;//kernel.MapEditor:5996
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=41006014;//kernel.MapEditor:6014
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=41006127;//kernel.MapEditor:6127
            _this.my=_this.my-8;
          }
          //$LASTPOS=41006145;//kernel.MapEditor:6145
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=41006280;//kernel.MapEditor:6280
            _this.my=_this.my+8;
          }
          //$LASTPOS=41006298;//kernel.MapEditor:6298
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=41006341;//kernel.MapEditor:6341
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=41006447;//kernel.MapEditor:6447
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=41006471;//kernel.MapEditor:6471
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=41006602;//kernel.MapEditor:6602
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=41006626;//kernel.MapEditor:6626
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=41006739;//kernel.MapEditor:6739
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=41006763;//kernel.MapEditor:6763
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=41006898;//kernel.MapEditor:6898
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=41006922;//kernel.MapEditor:6922
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=41006995;//kernel.MapEditor:6995
        if (_this.getkey("i")==1) {
          //$LASTPOS=41007024;//kernel.MapEditor:7024
          if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
            //$LASTPOS=41007056;//kernel.MapEditor:7056
            Tonyu.globals.$map.chipWidth+=4;
          }
          //$LASTPOS=41007084;//kernel.MapEditor:7084
          if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
            //$LASTPOS=41007118;//kernel.MapEditor:7118
            Tonyu.globals.$map.chipHeight+=4;
          }
          //$LASTPOS=41007147;//kernel.MapEditor:7147
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=41007174;//kernel.MapEditor:7174
          _this.panel.die();
          //$LASTPOS=41007196;//kernel.MapEditor:7196
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=41007296;//kernel.MapEditor:7296
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=41007331;//kernel.MapEditor:7331
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=41007367;//kernel.MapEditor:7367
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=41007404;//kernel.MapEditor:7404
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=41007462;//kernel.MapEditor:7462
        if (_this.getkey("o")==1) {
          //$LASTPOS=41007491;//kernel.MapEditor:7491
          if (Tonyu.globals.$map.chipWidth>4) {
            //$LASTPOS=41007512;//kernel.MapEditor:7512
            Tonyu.globals.$map.chipWidth-=4;
          }
          //$LASTPOS=41007540;//kernel.MapEditor:7540
          if (Tonyu.globals.$map.chipHeight>4) {
            //$LASTPOS=41007562;//kernel.MapEditor:7562
            Tonyu.globals.$map.chipHeight-=4;
          }
          //$LASTPOS=41007591;//kernel.MapEditor:7591
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=41007618;//kernel.MapEditor:7618
          _this.panel.die();
          //$LASTPOS=41007640;//kernel.MapEditor:7640
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=41007740;//kernel.MapEditor:7740
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=41007775;//kernel.MapEditor:7775
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=41007811;//kernel.MapEditor:7811
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=41007848;//kernel.MapEditor:7848
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=41007940;//kernel.MapEditor:7940
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=41007971;//kernel.MapEditor:7971
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=41008003;//kernel.MapEditor:8003
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=41008056;//kernel.MapEditor:8056
          if (_this.selectedLayer=="base") {
            //$LASTPOS=41008096;//kernel.MapEditor:8096
            _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=41008152;//kernel.MapEditor:8152
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=41008205;//kernel.MapEditor:8205
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
            
          } else {
            //$LASTPOS=41008263;//kernel.MapEditor:8263
            if (_this.selectedLayer=="on") {
              //$LASTPOS=41008301;//kernel.MapEditor:8301
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=41008372;//kernel.MapEditor:8372
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=41008425;//kernel.MapEditor:8425
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
              
            }
          }
          
        } else {
          //$LASTPOS=41008491;//kernel.MapEditor:8491
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=41008546;//kernel.MapEditor:8546
            if (_this.selectedLayer=="base") {
              //$LASTPOS=41008586;//kernel.MapEditor:8586
              _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=41008642;//kernel.MapEditor:8642
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
              //$LASTPOS=41008693;//kernel.MapEditor:8693
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
              
            } else {
              //$LASTPOS=41008751;//kernel.MapEditor:8751
              if (_this.selectedLayer=="on") {
                //$LASTPOS=41008789;//kernel.MapEditor:8789
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              } else {
                //$LASTPOS=41008858;//kernel.MapEditor:8858
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=41008909;//kernel.MapEditor:8909
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              }
            }
            
          } else {
            //$LASTPOS=41008971;//kernel.MapEditor:8971
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=41009024;//kernel.MapEditor:9024
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=41009104;//kernel.MapEditor:9104
              _this.mode="set";
              //$LASTPOS=41009125;//kernel.MapEditor:9125
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=41009159;//kernel.MapEditor:9159
              _this.print(_this.mode+" mode");
              //$LASTPOS=41009189;//kernel.MapEditor:9189
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=41009214;//kernel.MapEditor:9214
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=41009269;//kernel.MapEditor:9269
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=41009322;//kernel.MapEditor:9322
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=41009376;//kernel.MapEditor:9376
                  if (_this.selectedLayer=="base") {
                    //$LASTPOS=41009416;//kernel.MapEditor:9416
                    _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                    //$LASTPOS=41009469;//kernel.MapEditor:9469
                    _this.maponp=- 1;
                    
                  } else {
                    //$LASTPOS=41009495;//kernel.MapEditor:9495
                    if (_this.selectedLayer=="on") {
                      //$LASTPOS=41009533;//kernel.MapEditor:9533
                      _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    } else {
                      //$LASTPOS=41009604;//kernel.MapEditor:9604
                      _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      //$LASTPOS=41009657;//kernel.MapEditor:9657
                      _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    }
                  }
                  //$LASTPOS=41009782;//kernel.MapEditor:9782
                  _this.mode="set";
                  //$LASTPOS=41009803;//kernel.MapEditor:9803
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=41009833;//kernel.MapEditor:9833
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=41009859;//kernel.MapEditor:9859
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=41000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=41000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=41000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=41000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000158;//kernel.MapEditor:158
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=41000186;//kernel.MapEditor:186
            if (_this.fileList.exists()) {
              //$LASTPOS=41000214;//kernel.MapEditor:214
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=41000257;//kernel.MapEditor:257
                f=f+"";
                //$LASTPOS=41000274;//kernel.MapEditor:274
                _this.fNames=f.split("/");
                //$LASTPOS=41000304;//kernel.MapEditor:304
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=41000345;//kernel.MapEditor:345
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=41000388;//kernel.MapEditor:388
            if (!(_this.fileExist)) { __pc=12; break; }
            //$LASTPOS=41000408;//kernel.MapEditor:408
            _this.print("Load Data?: Y or N");
            //$LASTPOS=41000442;//kernel.MapEditor:442
          case 2:
            //$LASTPOS=41000464;//kernel.MapEditor:464
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=41000496;//kernel.MapEditor:496
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=41000551;//kernel.MapEditor:551
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=41000583;//kernel.MapEditor:583
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=41000639;//kernel.MapEditor:639
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=41000661;//kernel.MapEditor:661
            if (!(_this.loadMode)) { __pc=11; break; }
            //$LASTPOS=41000684;//kernel.MapEditor:684
            _this.fiber$prompt(_thread, "Input json file (*.json)", "map.json");
            __pc=7;return;
          case 7:
            _this.fileName=_thread.retVal;
            
            //$LASTPOS=41000749;//kernel.MapEditor:749
            if (_this.fileName) {
              //$LASTPOS=41000776;//kernel.MapEditor:776
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=41000840;//kernel.MapEditor:840
            if (!(_this.mapDataFile.obj())) { __pc=8; break; }
            {
              //$LASTPOS=41000876;//kernel.MapEditor:876
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=41000917;//kernel.MapEditor:917
              _this.loadedFile=_this.fileName;
            }
            __pc=10;break;
          case 8:
            //$LASTPOS=41000967;//kernel.MapEditor:967
            _this.fiber$file(_thread, _this.fileName);
            __pc=9;return;
          case 9:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=41001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=41001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=41001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
          case 10:
            
            //$LASTPOS=41001149;//kernel.MapEditor:1149
            if (_this.baseData==undefined) {
              //$LASTPOS=41001187;//kernel.MapEditor:1187
              _this.print("Load failed");
              //$LASTPOS=41001222;//kernel.MapEditor:1222
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=41001253;//kernel.MapEditor:1253
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=41001298;//kernel.MapEditor:1298
                _this.mapData=_this.baseData[0];
                //$LASTPOS=41001332;//kernel.MapEditor:1332
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=41001368;//kernel.MapEditor:1368
                if (_this.baseData.length>2) {
                  //$LASTPOS=41001408;//kernel.MapEditor:1408
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=41001464;//kernel.MapEditor:1464
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 11:
            
          case 12:
            
            //$LASTPOS=41001541;//kernel.MapEditor:1541
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=41001855;//kernel.MapEditor:1855
            if (!(! _this.loadMode)) { __pc=18; break; }
            //$LASTPOS=41001875;//kernel.MapEditor:1875
            _this.fiber$prompt(_thread, "input row");
            __pc=14;return;
          case 14:
            _this.row=_thread.retVal;
            
            //$LASTPOS=41001905;//kernel.MapEditor:1905
            _this.fiber$prompt(_thread, "input col");
            __pc=15;return;
          case 15:
            _this.col=_thread.retVal;
            
            //$LASTPOS=41001935;//kernel.MapEditor:1935
            _this.fiber$prompt(_thread, "input chipWidth");
            __pc=16;return;
          case 16:
            _this.chipWidth=_thread.retVal;
            
            //$LASTPOS=41001977;//kernel.MapEditor:1977
            _this.fiber$prompt(_thread, "input chipHeight");
            __pc=17;return;
          case 17:
            _this.chipHeight=_thread.retVal;
            
            //$LASTPOS=41002021;//kernel.MapEditor:2021
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=41002086;//kernel.MapEditor:2086
            _this.panel.x=_this.panel.width/2+40;
            //$LASTPOS=41002117;//kernel.MapEditor:2117
            _this.panel.y=_this.panel.height/2+40;
            //$LASTPOS=41002149;//kernel.MapEditor:2149
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=41002182;//kernel.MapEditor:2182
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=41002233;//kernel.MapEditor:2233
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
            __pc=19;break;
          case 18:
            {
              //$LASTPOS=41002544;//kernel.MapEditor:2544
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=41002591;//kernel.MapEditor:2591
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=41002617;//kernel.MapEditor:2617
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=41002713;//kernel.MapEditor:2713
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=41002744;//kernel.MapEditor:2744
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=41002776;//kernel.MapEditor:2776
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=41002809;//kernel.MapEditor:2809
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 19:
            
            //$LASTPOS=41002876;//kernel.MapEditor:2876
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=41002932;//kernel.MapEditor:2932
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=41002989;//kernel.MapEditor:2989
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=41003041;//kernel.MapEditor:3041
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=41003094;//kernel.MapEditor:3094
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=41003176;//kernel.MapEditor:3176
            _this.counter=0;
            //$LASTPOS=41003188;//kernel.MapEditor:3188
            //$LASTPOS=41003192;//kernel.MapEditor:3192
            i = 0;
            while(i<Tonyu.globals.$mp.row) {
              {
                //$LASTPOS=41003221;//kernel.MapEditor:3221
                //$LASTPOS=41003225;//kernel.MapEditor:3225
                j = 0;
                while(j<Tonyu.globals.$mp.col) {
                  {
                    //$LASTPOS=41003258;//kernel.MapEditor:3258
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=41003302;//kernel.MapEditor:3302
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=41003346;//kernel.MapEditor:3346
            _this.mode="get";
            //$LASTPOS=41003359;//kernel.MapEditor:3359
            _this.prevMode="set";
            //$LASTPOS=41003376;//kernel.MapEditor:3376
            _this.mapp=0;
            //$LASTPOS=41003385;//kernel.MapEditor:3385
            _this.maponp=- 1;
            //$LASTPOS=41003397;//kernel.MapEditor:3397
            _this.mx=- 40;
            //$LASTPOS=41003406;//kernel.MapEditor:3406
            _this.my=- 40;
            //$LASTPOS=41003415;//kernel.MapEditor:3415
            _this.chipX=- 40;
            //$LASTPOS=41003427;//kernel.MapEditor:3427
            _this.chipY=- 40;
            //$LASTPOS=41003439;//kernel.MapEditor:3439
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=41003468;//kernel.MapEditor:3468
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=41003499;//kernel.MapEditor:3499
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=41003524;//kernel.MapEditor:3524
            _this.initialWidth=Tonyu.globals.$map.chipWidth;
            //$LASTPOS=41003554;//kernel.MapEditor:3554
            _this.initialHeight=Tonyu.globals.$map.chipHeight;
            //$LASTPOS=41003586;//kernel.MapEditor:3586
            _this.layers=["base","on","all"];
            //$LASTPOS=41003615;//kernel.MapEditor:3615
            _this.lc=0;
            //$LASTPOS=41003622;//kernel.MapEditor:3622
            _this.selectedLayer=_this.layers[_this.lc];
            //$LASTPOS=41003649;//kernel.MapEditor:3649
            _this.fiber$drawPanel(_thread);
            __pc=20;return;
          case 20:
            
            //$LASTPOS=41003665;//kernel.MapEditor:3665
          case 21:
            //$LASTPOS=41003683;//kernel.MapEditor:3683
            _this.p=_this.mapp;
            //$LASTPOS=41003696;//kernel.MapEditor:3696
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
              //$LASTPOS=41003815;//kernel.MapEditor:3815
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=41003849;//kernel.MapEditor:3849
              _this.mode="erase";
              //$LASTPOS=41003872;//kernel.MapEditor:3872
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=41003905;//kernel.MapEditor:3905
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=41004024;//kernel.MapEditor:4024
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=41004058;//kernel.MapEditor:4058
              _this.mode="set";
              
            }
            //$LASTPOS=41004082;//kernel.MapEditor:4082
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=23; break; }
            //$LASTPOS=41004203;//kernel.MapEditor:4203
            _this.lc++;
            //$LASTPOS=41004218;//kernel.MapEditor:4218
            _this.selectedLayer=_this.layers[_this.lc%3];
            //$LASTPOS=41004255;//kernel.MapEditor:4255
            _this.fiber$drawPanel(_thread);
            __pc=22;return;
          case 22:
            
            //$LASTPOS=41004277;//kernel.MapEditor:4277
            _this.print(_this.mode+" mode");
          case 23:
            
            //$LASTPOS=41004403;//kernel.MapEditor:4403
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=41004524;//kernel.MapEditor:4524
              if (_this.mode!="get") {
                //$LASTPOS=41004554;//kernel.MapEditor:4554
                _this.prevMode=_this.mode;
                //$LASTPOS=41004582;//kernel.MapEditor:4582
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=41004618;//kernel.MapEditor:4618
                _this.mode="get";
                //$LASTPOS=41004643;//kernel.MapEditor:4643
                _this.chipX=- 40;
                //$LASTPOS=41004667;//kernel.MapEditor:4667
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=41004707;//kernel.MapEditor:4707
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=41004745;//kernel.MapEditor:4745
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=41004780;//kernel.MapEditor:4780
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=41004813;//kernel.MapEditor:4813
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=28; break; }
            //$LASTPOS=41004949;//kernel.MapEditor:4949
            if (!(_this.loadedFile)) { __pc=25; break; }
            //$LASTPOS=41004978;//kernel.MapEditor:4978
            _this.fiber$prompt(_thread, "input json file(*.json)", _this.loadedFile);
            __pc=24;return;
          case 24:
            _this.saveFileName=_thread.retVal;
            
            __pc=27;break;
          case 25:
            //$LASTPOS=41005066;//kernel.MapEditor:5066
            _this.fiber$prompt(_thread, "input json file(*.json)", "map.json");
            __pc=26;return;
          case 26:
            _this.saveFileName=_thread.retVal;
            
          case 27:
            
            //$LASTPOS=41005160;//kernel.MapEditor:5160
            if (_this.saveFileName) {
              //$LASTPOS=41005191;//kernel.MapEditor:5191
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=41005253;//kernel.MapEditor:5253
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
              //$LASTPOS=41005415;//kernel.MapEditor:5415
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=41005452;//kernel.MapEditor:5452
              _this.print(_this.saveFileName+" Saved");
              
            }
          case 28:
            
            //$LASTPOS=41005505;//kernel.MapEditor:5505
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
              //$LASTPOS=41005626;//kernel.MapEditor:5626
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=41005660;//kernel.MapEditor:5660
              _this.mode="copy";
              //$LASTPOS=41005682;//kernel.MapEditor:5682
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=41005715;//kernel.MapEditor:5715
            if (_this.mode!="get") {
              //$LASTPOS=41005741;//kernel.MapEditor:5741
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=41005847;//kernel.MapEditor:5847
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=41005865;//kernel.MapEditor:5865
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=41005996;//kernel.MapEditor:5996
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=41006014;//kernel.MapEditor:6014
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=41006127;//kernel.MapEditor:6127
                _this.my=_this.my-8;
              }
              //$LASTPOS=41006145;//kernel.MapEditor:6145
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=41006280;//kernel.MapEditor:6280
                _this.my=_this.my+8;
              }
              //$LASTPOS=41006298;//kernel.MapEditor:6298
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=41006341;//kernel.MapEditor:6341
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=41006447;//kernel.MapEditor:6447
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=41006471;//kernel.MapEditor:6471
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=41006602;//kernel.MapEditor:6602
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=41006626;//kernel.MapEditor:6626
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=41006739;//kernel.MapEditor:6739
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=41006763;//kernel.MapEditor:6763
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=41006898;//kernel.MapEditor:6898
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=41006922;//kernel.MapEditor:6922
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=41006995;//kernel.MapEditor:6995
            if (_this.getkey("i")==1) {
              //$LASTPOS=41007024;//kernel.MapEditor:7024
              if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
                //$LASTPOS=41007056;//kernel.MapEditor:7056
                Tonyu.globals.$map.chipWidth+=4;
              }
              //$LASTPOS=41007084;//kernel.MapEditor:7084
              if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
                //$LASTPOS=41007118;//kernel.MapEditor:7118
                Tonyu.globals.$map.chipHeight+=4;
              }
              //$LASTPOS=41007147;//kernel.MapEditor:7147
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=41007174;//kernel.MapEditor:7174
              _this.panel.die();
              //$LASTPOS=41007196;//kernel.MapEditor:7196
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=41007296;//kernel.MapEditor:7296
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=41007331;//kernel.MapEditor:7331
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=41007367;//kernel.MapEditor:7367
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=41007404;//kernel.MapEditor:7404
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=41007462;//kernel.MapEditor:7462
            if (_this.getkey("o")==1) {
              //$LASTPOS=41007491;//kernel.MapEditor:7491
              if (Tonyu.globals.$map.chipWidth>4) {
                //$LASTPOS=41007512;//kernel.MapEditor:7512
                Tonyu.globals.$map.chipWidth-=4;
              }
              //$LASTPOS=41007540;//kernel.MapEditor:7540
              if (Tonyu.globals.$map.chipHeight>4) {
                //$LASTPOS=41007562;//kernel.MapEditor:7562
                Tonyu.globals.$map.chipHeight-=4;
              }
              //$LASTPOS=41007591;//kernel.MapEditor:7591
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=41007618;//kernel.MapEditor:7618
              _this.panel.die();
              //$LASTPOS=41007640;//kernel.MapEditor:7640
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=41007740;//kernel.MapEditor:7740
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=41007775;//kernel.MapEditor:7775
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=41007811;//kernel.MapEditor:7811
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=41007848;//kernel.MapEditor:7848
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=41007940;//kernel.MapEditor:7940
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=41007971;//kernel.MapEditor:7971
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=41008003;//kernel.MapEditor:8003
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=29; break; }
            {
              //$LASTPOS=41008056;//kernel.MapEditor:8056
              if (_this.selectedLayer=="base") {
                //$LASTPOS=41008096;//kernel.MapEditor:8096
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=41008152;//kernel.MapEditor:8152
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=41008205;//kernel.MapEditor:8205
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=41008263;//kernel.MapEditor:8263
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=41008301;//kernel.MapEditor:8301
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  
                } else {
                  //$LASTPOS=41008372;//kernel.MapEditor:8372
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  //$LASTPOS=41008425;//kernel.MapEditor:8425
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
                  
                }
              }
            }
            __pc=39;break;
          case 29:
            //$LASTPOS=41008491;//kernel.MapEditor:8491
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=30; break; }
            {
              //$LASTPOS=41008546;//kernel.MapEditor:8546
              if (_this.selectedLayer=="base") {
                //$LASTPOS=41008586;//kernel.MapEditor:8586
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=41008642;//kernel.MapEditor:8642
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=41008693;//kernel.MapEditor:8693
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=41008751;//kernel.MapEditor:8751
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=41008789;//kernel.MapEditor:8789
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                } else {
                  //$LASTPOS=41008858;//kernel.MapEditor:8858
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  //$LASTPOS=41008909;//kernel.MapEditor:8909
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                }
              }
            }
            __pc=38;break;
          case 30:
            //$LASTPOS=41008971;//kernel.MapEditor:8971
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=32; break; }
            //$LASTPOS=41009024;//kernel.MapEditor:9024
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=41009104;//kernel.MapEditor:9104
            _this.mode="set";
            //$LASTPOS=41009125;//kernel.MapEditor:9125
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=41009159;//kernel.MapEditor:9159
            _this.print(_this.mode+" mode");
            //$LASTPOS=41009189;//kernel.MapEditor:9189
            _this.fiber$updateEx(_thread, 10);
            __pc=31;return;
          case 31:
            
            __pc=37;break;
          case 32:
            //$LASTPOS=41009214;//kernel.MapEditor:9214
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=33; break; }
            {
              //$LASTPOS=41009269;//kernel.MapEditor:9269
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=36;break;
          case 33:
            //$LASTPOS=41009322;//kernel.MapEditor:9322
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=35; break; }
            //$LASTPOS=41009376;//kernel.MapEditor:9376
            if (_this.selectedLayer=="base") {
              //$LASTPOS=41009416;//kernel.MapEditor:9416
              _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=41009469;//kernel.MapEditor:9469
              _this.maponp=- 1;
              
            } else {
              //$LASTPOS=41009495;//kernel.MapEditor:9495
              if (_this.selectedLayer=="on") {
                //$LASTPOS=41009533;//kernel.MapEditor:9533
                _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              } else {
                //$LASTPOS=41009604;//kernel.MapEditor:9604
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=41009657;//kernel.MapEditor:9657
                _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              }
            }
            //$LASTPOS=41009782;//kernel.MapEditor:9782
            _this.mode="set";
            //$LASTPOS=41009803;//kernel.MapEditor:9803
            _this.print(_this.mode+" mode");
            //$LASTPOS=41009833;//kernel.MapEditor:9833
            _this.fiber$updateEx(_thread, 10);
            __pc=34;return;
          case 34:
            
          case 35:
            
          case 36:
            
          case 37:
            
          case 38:
            
          case 39:
            
            //$LASTPOS=41009859;//kernel.MapEditor:9859
            _this.fiber$update(_thread);
            __pc=40;return;
          case 40:
            
            __pc=21;break;
          case 41:
            
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
      
      //$LASTPOS=41010031;//kernel.MapEditor:10031
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=41010065;//kernel.MapEditor:10065
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=41010088;//kernel.MapEditor:10088
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=41010131;//kernel.MapEditor:10131
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=41010179;//kernel.MapEditor:10179
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=41010241;//kernel.MapEditor:10241
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=41010300;//kernel.MapEditor:10300
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=41010323;//kernel.MapEditor:10323
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=41010377;//kernel.MapEditor:10377
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010427;//kernel.MapEditor:10427
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010479;//kernel.MapEditor:10479
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010531;//kernel.MapEditor:10531
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010583;//kernel.MapEditor:10583
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=41010632;//kernel.MapEditor:10632
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=41010683;//kernel.MapEditor:10683
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=41010718;//kernel.MapEditor:10718
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010769;//kernel.MapEditor:10769
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010821;//kernel.MapEditor:10821
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010873;//kernel.MapEditor:10873
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010925;//kernel.MapEditor:10925
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=41010975;//kernel.MapEditor:10975
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=41011026;//kernel.MapEditor:11026
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=41011072;//kernel.MapEditor:11072
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=41011129;//kernel.MapEditor:11129
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=41011193;//kernel.MapEditor:11193
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=41011268;//kernel.MapEditor:11268
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=41011373;//kernel.MapEditor:11373
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=41011450;//kernel.MapEditor:11450
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=41011535;//kernel.MapEditor:11535
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=41011612;//kernel.MapEditor:11612
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=41011688;//kernel.MapEditor:11688
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=41011766;//kernel.MapEditor:11766
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41010031;//kernel.MapEditor:10031
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=41010065;//kernel.MapEditor:10065
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=41010088;//kernel.MapEditor:10088
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=41010131;//kernel.MapEditor:10131
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=41010179;//kernel.MapEditor:10179
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=41010241;//kernel.MapEditor:10241
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=41010300;//kernel.MapEditor:10300
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=41010323;//kernel.MapEditor:10323
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=41010377;//kernel.MapEditor:10377
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010427;//kernel.MapEditor:10427
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010479;//kernel.MapEditor:10479
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010531;//kernel.MapEditor:10531
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=41010583;//kernel.MapEditor:10583
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=41010632;//kernel.MapEditor:10632
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=41010683;//kernel.MapEditor:10683
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=41010718;//kernel.MapEditor:10718
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010769;//kernel.MapEditor:10769
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010821;//kernel.MapEditor:10821
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010873;//kernel.MapEditor:10873
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=41010925;//kernel.MapEditor:10925
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=41010975;//kernel.MapEditor:10975
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=41011026;//kernel.MapEditor:11026
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=41011072;//kernel.MapEditor:11072
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=41011129;//kernel.MapEditor:11129
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=41011193;//kernel.MapEditor:11193
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=41011268;//kernel.MapEditor:11268
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=41011373;//kernel.MapEditor:11373
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=41011450;//kernel.MapEditor:11450
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=41011535;//kernel.MapEditor:11535
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=41011612;//kernel.MapEditor:11612
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=41011688;//kernel.MapEditor:11688
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=41011766;//kernel.MapEditor:11766
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false}}}
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
      var i;
      var j;
      
      //$LASTPOS=42000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=42000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=42000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=42000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=42000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=42000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=42000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=42000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=42000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=42000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=42000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=42000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=42000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=42000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=42000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=42000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=42000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=42000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=42000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=42000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=42000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=42000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=42000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=42000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=42001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=42001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=42001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=42001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=42001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=42001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=42001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=42001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=42001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=42001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=42001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=42001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=42001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=42001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=42001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=42001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=42001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=42001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=42001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=42001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=42001973;//kernel.MapEditorOLD:1973
      //$LASTPOS=42001977;//kernel.MapEditorOLD:1977
      i = 0;
      while(i<16) {
        {
          //$LASTPOS=42002001;//kernel.MapEditorOLD:2001
          //$LASTPOS=42002005;//kernel.MapEditorOLD:2005
          j = 0;
          while(j<8) {
            {
              //$LASTPOS=42002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=42002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=42002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=42002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=42002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=42002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=42002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=42002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=42002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=42002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=42002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=42002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=42002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=42002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=42002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=42002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=42002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=42002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=42002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=42002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=42002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=42002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=42002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=42002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=42002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=42002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=42002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=42002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=42002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=42002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=42002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=42002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=42002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=42002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=42002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=42002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=42002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=42003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=42003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=42003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=42003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=42003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=42003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=42003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=42003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=42003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=42003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=42003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=42003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=42003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=42003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=42004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=42004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=42004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=42004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=42004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=42004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=42004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=42004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=42004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=42004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=42004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=42004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=42004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=42004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=42004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=42004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=42004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=42004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=42004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=42004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=42004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=42004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=42004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=42004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=42004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=42004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=42004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=42004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=42004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=42004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=42004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=42005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=42005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=42005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=42005123;//kernel.MapEditorOLD:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=42000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=42000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=42000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2; break; }
            //$LASTPOS=42000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5; break;
            
          case 2:
            
            //$LASTPOS=42000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3; break; }
            //$LASTPOS=42000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=42000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=42000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9; break; }
            //$LASTPOS=42000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=42000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=42000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=42000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6; break; }
            {
              //$LASTPOS=42000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8;break;
          case 6:
            //$LASTPOS=42000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=42000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=42000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8:
            
            //$LASTPOS=42000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=42000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=42000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=42000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=42000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=42000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9:
            
            //$LASTPOS=42000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=42001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12; break; }
            //$LASTPOS=42001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=42001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=42001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=42001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=42001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=42001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=42001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=42001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=42001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13;break;
          case 12:
            {
              //$LASTPOS=42001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=42001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=42001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=42001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=42001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=42001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=42001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=42001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13:
            
            //$LASTPOS=42001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=42001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=42001973;//kernel.MapEditorOLD:1973
            //$LASTPOS=42001977;//kernel.MapEditorOLD:1977
            i = 0;
            while(i<16) {
              {
                //$LASTPOS=42002001;//kernel.MapEditorOLD:2001
                //$LASTPOS=42002005;//kernel.MapEditorOLD:2005
                j = 0;
                while(j<8) {
                  {
                    //$LASTPOS=42002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=42002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=42002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=42002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=42002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=42002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=42002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=42002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=42002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=42002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=42002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=42002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=42002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=42002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=42002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=42002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=42002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=42002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=42002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=42002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=42002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=42002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=42002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=42002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=42002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=42002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=42002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=42002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=42002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=42002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=42002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=42002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=42002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=42002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=42002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=42002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=42002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=42003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=42003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=42003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=42003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=42003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=42003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=42003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=42003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=42003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=42003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=42003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=42003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=42003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=42003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=42004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=42004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=42004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=42004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=42004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=42004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=42004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=42004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=42004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=42004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=42004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=42004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=42004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=42004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=42004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=42004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=42004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
            {
              //$LASTPOS=42004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=42004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=42004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
            {
              //$LASTPOS=42004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=42004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
            //$LASTPOS=42004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=42004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=42004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=42004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=42004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=42004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
            {
              //$LASTPOS=42004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=42004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
            //$LASTPOS=42004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=42005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=42005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=42005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=42005123;//kernel.MapEditorOLD:5123
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
      var i;
      var j;
      
      //$LASTPOS=43000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=43000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=43000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=43000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      //$LASTPOS=43000116;//kernel.MapEditorOLD2:116
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=43000144;//kernel.MapEditorOLD2:144
      if (_this.fileList.exists()) {
        //$LASTPOS=43000168;//kernel.MapEditorOLD2:168
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=43000207;//kernel.MapEditorOLD2:207
          f=f+"";
          //$LASTPOS=43000220;//kernel.MapEditorOLD2:220
          _this.fNames=f.split("/");
          //$LASTPOS=43000246;//kernel.MapEditorOLD2:246
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=43000283;//kernel.MapEditorOLD2:283
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=43000308;//kernel.MapEditorOLD2:308
      if (_this.fileExist) {
        //$LASTPOS=43000328;//kernel.MapEditorOLD2:328
        _this.print("Load Data?: Y or N");
        //$LASTPOS=43000362;//kernel.MapEditorOLD2:362
        while (true) {
          //$LASTPOS=43000384;//kernel.MapEditorOLD2:384
          if (_this.getkey("y")>0) {
            //$LASTPOS=43000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=43000471;//kernel.MapEditorOLD2:471
          if (_this.getkey("n")>0) {
            //$LASTPOS=43000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=43000559;//kernel.MapEditorOLD2:559
          _this.update();
          
        }
        //$LASTPOS=43000581;//kernel.MapEditorOLD2:581
        if (_this.loadMode) {
          //$LASTPOS=43000604;//kernel.MapEditorOLD2:604
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=43000669;//kernel.MapEditorOLD2:669
          if (_this.fileName) {
            //$LASTPOS=43000696;//kernel.MapEditorOLD2:696
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=43000760;//kernel.MapEditorOLD2:760
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=43000796;//kernel.MapEditorOLD2:796
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=43000837;//kernel.MapEditorOLD2:837
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=43000887;//kernel.MapEditorOLD2:887
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=43000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=43000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=43001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=43001069;//kernel.MapEditorOLD2:1069
          if (_this.baseData==undefined) {
            //$LASTPOS=43001107;//kernel.MapEditorOLD2:1107
            _this.print("Load failed");
            //$LASTPOS=43001142;//kernel.MapEditorOLD2:1142
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=43001173;//kernel.MapEditorOLD2:1173
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=43001218;//kernel.MapEditorOLD2:1218
              _this.mapData=_this.baseData[0];
              //$LASTPOS=43001252;//kernel.MapEditorOLD2:1252
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=43001288;//kernel.MapEditorOLD2:1288
              if (_this.baseData.length>2) {
                //$LASTPOS=43001328;//kernel.MapEditorOLD2:1328
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=43001384;//kernel.MapEditorOLD2:1384
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=43001461;//kernel.MapEditorOLD2:1461
      _this.update();
      //$LASTPOS=43001739;//kernel.MapEditorOLD2:1739
      if (! _this.loadMode) {
        //$LASTPOS=43001759;//kernel.MapEditorOLD2:1759
        _this.row=prompt("input row");
        //$LASTPOS=43001789;//kernel.MapEditorOLD2:1789
        _this.col=prompt("input col");
        //$LASTPOS=43001819;//kernel.MapEditorOLD2:1819
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=43001861;//kernel.MapEditorOLD2:1861
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=43001905;//kernel.MapEditorOLD2:1905
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=43001970;//kernel.MapEditorOLD2:1970
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=43002001;//kernel.MapEditorOLD2:2001
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=43002033;//kernel.MapEditorOLD2:2033
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=43002066;//kernel.MapEditorOLD2:2066
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=43002117;//kernel.MapEditorOLD2:2117
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=43002428;//kernel.MapEditorOLD2:2428
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=43002475;//kernel.MapEditorOLD2:2475
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=43002501;//kernel.MapEditorOLD2:2501
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=43002597;//kernel.MapEditorOLD2:2597
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=43002628;//kernel.MapEditorOLD2:2628
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=43002660;//kernel.MapEditorOLD2:2660
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=43002693;//kernel.MapEditorOLD2:2693
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=43002743;//kernel.MapEditorOLD2:2743
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=43002799;//kernel.MapEditorOLD2:2799
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=43002856;//kernel.MapEditorOLD2:2856
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=43002908;//kernel.MapEditorOLD2:2908
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=43002961;//kernel.MapEditorOLD2:2961
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=43003043;//kernel.MapEditorOLD2:3043
      _this.counter=0;
      //$LASTPOS=43003055;//kernel.MapEditorOLD2:3055
      //$LASTPOS=43003059;//kernel.MapEditorOLD2:3059
      i = 0;
      while(i<Tonyu.globals.$mp.row) {
        {
          //$LASTPOS=43003088;//kernel.MapEditorOLD2:3088
          //$LASTPOS=43003092;//kernel.MapEditorOLD2:3092
          j = 0;
          while(j<Tonyu.globals.$mp.col) {
            {
              //$LASTPOS=43003125;//kernel.MapEditorOLD2:3125
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=43003169;//kernel.MapEditorOLD2:3169
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=43003191;//kernel.MapEditorOLD2:3191
      _this.drawPanel();
      //$LASTPOS=43003205;//kernel.MapEditorOLD2:3205
      _this.mode="get";
      //$LASTPOS=43003218;//kernel.MapEditorOLD2:3218
      _this.prevMode="set";
      //$LASTPOS=43003235;//kernel.MapEditorOLD2:3235
      _this.mapp=0;
      //$LASTPOS=43003244;//kernel.MapEditorOLD2:3244
      _this.mx=- 40;
      //$LASTPOS=43003253;//kernel.MapEditorOLD2:3253
      _this.my=- 40;
      //$LASTPOS=43003262;//kernel.MapEditorOLD2:3262
      _this.chipX=- 40;
      //$LASTPOS=43003274;//kernel.MapEditorOLD2:3274
      _this.chipY=- 40;
      //$LASTPOS=43003286;//kernel.MapEditorOLD2:3286
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=43003315;//kernel.MapEditorOLD2:3315
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=43003346;//kernel.MapEditorOLD2:3346
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=43003369;//kernel.MapEditorOLD2:3369
      while (true) {
        //$LASTPOS=43003387;//kernel.MapEditorOLD2:3387
        _this.p=_this.mapp;
        //$LASTPOS=43003400;//kernel.MapEditorOLD2:3400
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=43003539;//kernel.MapEditorOLD2:3539
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=43003573;//kernel.MapEditorOLD2:3573
          _this.mode="erase";
          //$LASTPOS=43003596;//kernel.MapEditorOLD2:3596
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=43003629;//kernel.MapEditorOLD2:3629
        if (_this.getkey("s")==1) {
          //$LASTPOS=43003658;//kernel.MapEditorOLD2:3658
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=43003692;//kernel.MapEditorOLD2:3692
          if (_this.mode=="set") {
            //$LASTPOS=43003722;//kernel.MapEditorOLD2:3722
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=43003765;//kernel.MapEditorOLD2:3765
            _this.mode="set";
            
          }
          //$LASTPOS=43003797;//kernel.MapEditorOLD2:3797
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=43003830;//kernel.MapEditorOLD2:3830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=43003949;//kernel.MapEditorOLD2:3949
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=43003983;//kernel.MapEditorOLD2:3983
          _this.mode="set";
          //$LASTPOS=43004004;//kernel.MapEditorOLD2:4004
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=43004037;//kernel.MapEditorOLD2:4037
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=43004158;//kernel.MapEditorOLD2:4158
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=43004192;//kernel.MapEditorOLD2:4192
          _this.mode="setOn";
          //$LASTPOS=43004215;//kernel.MapEditorOLD2:4215
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=43004341;//kernel.MapEditorOLD2:4341
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=43004482;//kernel.MapEditorOLD2:4482
          if (_this.mode!="get") {
            //$LASTPOS=43004512;//kernel.MapEditorOLD2:4512
            _this.prevMode=_this.mode;
            //$LASTPOS=43004540;//kernel.MapEditorOLD2:4540
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=43004576;//kernel.MapEditorOLD2:4576
            _this.mode="get";
            //$LASTPOS=43004601;//kernel.MapEditorOLD2:4601
            _this.chipX=- 40;
            //$LASTPOS=43004625;//kernel.MapEditorOLD2:4625
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=43004665;//kernel.MapEditorOLD2:4665
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=43004703;//kernel.MapEditorOLD2:4703
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=43004738;//kernel.MapEditorOLD2:4738
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=43004771;//kernel.MapEditorOLD2:4771
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=43004927;//kernel.MapEditorOLD2:4927
          if (_this.loadedFile) {
            //$LASTPOS=43004956;//kernel.MapEditorOLD2:4956
            _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=43005044;//kernel.MapEditorOLD2:5044
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=43005544;//kernel.MapEditorOLD2:5544
          if (_this.saveFileName) {
            //$LASTPOS=43005575;//kernel.MapEditorOLD2:5575
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=43005637;//kernel.MapEditorOLD2:5637
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=43005799;//kernel.MapEditorOLD2:5799
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=43005836;//kernel.MapEditorOLD2:5836
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=43005943;//kernel.MapEditorOLD2:5943
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=43006084;//kernel.MapEditorOLD2:6084
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=43006118;//kernel.MapEditorOLD2:6118
          _this.mode="copy";
          //$LASTPOS=43006140;//kernel.MapEditorOLD2:6140
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=43006173;//kernel.MapEditorOLD2:6173
        if (_this.mode!="get") {
          //$LASTPOS=43006199;//kernel.MapEditorOLD2:6199
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=43006305;//kernel.MapEditorOLD2:6305
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=43006323;//kernel.MapEditorOLD2:6323
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=43006454;//kernel.MapEditorOLD2:6454
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=43006472;//kernel.MapEditorOLD2:6472
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=43006585;//kernel.MapEditorOLD2:6585
            _this.my=_this.my+8;
          }
          //$LASTPOS=43006603;//kernel.MapEditorOLD2:6603
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=43006738;//kernel.MapEditorOLD2:6738
            _this.my=_this.my-8;
          }
          //$LASTPOS=43006756;//kernel.MapEditorOLD2:6756
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=43006799;//kernel.MapEditorOLD2:6799
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=43006905;//kernel.MapEditorOLD2:6905
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=43006929;//kernel.MapEditorOLD2:6929
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=43007060;//kernel.MapEditorOLD2:7060
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=43007084;//kernel.MapEditorOLD2:7084
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=43007197;//kernel.MapEditorOLD2:7197
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=43007221;//kernel.MapEditorOLD2:7221
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=43007356;//kernel.MapEditorOLD2:7356
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=43007380;//kernel.MapEditorOLD2:7380
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=43007453;//kernel.MapEditorOLD2:7453
        if (_this.getkey("i")==1) {
          //$LASTPOS=43007482;//kernel.MapEditorOLD2:7482
          Tonyu.globals.$map.chipWidth+=4;
          //$LASTPOS=43007510;//kernel.MapEditorOLD2:7510
          Tonyu.globals.$map.chipHeight+=4;
          //$LASTPOS=43007539;//kernel.MapEditorOLD2:7539
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=43007566;//kernel.MapEditorOLD2:7566
          _this.panel.die();
          //$LASTPOS=43007588;//kernel.MapEditorOLD2:7588
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=43007688;//kernel.MapEditorOLD2:7688
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=43007723;//kernel.MapEditorOLD2:7723
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=43007759;//kernel.MapEditorOLD2:7759
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=43007796;//kernel.MapEditorOLD2:7796
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=43007854;//kernel.MapEditorOLD2:7854
        if (_this.getkey("o")==1) {
          //$LASTPOS=43007883;//kernel.MapEditorOLD2:7883
          Tonyu.globals.$map.chipWidth-=4;
          //$LASTPOS=43007911;//kernel.MapEditorOLD2:7911
          Tonyu.globals.$map.chipHeight-=4;
          //$LASTPOS=43007940;//kernel.MapEditorOLD2:7940
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=43007967;//kernel.MapEditorOLD2:7967
          _this.panel.die();
          //$LASTPOS=43007989;//kernel.MapEditorOLD2:7989
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=43008089;//kernel.MapEditorOLD2:8089
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=43008124;//kernel.MapEditorOLD2:8124
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=43008160;//kernel.MapEditorOLD2:8160
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=43008197;//kernel.MapEditorOLD2:8197
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=43008289;//kernel.MapEditorOLD2:8289
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=43008320;//kernel.MapEditorOLD2:8320
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=43008352;//kernel.MapEditorOLD2:8352
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=43008405;//kernel.MapEditorOLD2:8405
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=43008454;//kernel.MapEditorOLD2:8454
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=43008505;//kernel.MapEditorOLD2:8505
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=43008560;//kernel.MapEditorOLD2:8560
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=43008609;//kernel.MapEditorOLD2:8609
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=43008662;//kernel.MapEditorOLD2:8662
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=43008716;//kernel.MapEditorOLD2:8716
              _this.mode=_this.prevMode;
              //$LASTPOS=43008740;//kernel.MapEditorOLD2:8740
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=43008774;//kernel.MapEditorOLD2:8774
              _this.print(_this.mode+" mode");
              //$LASTPOS=43008804;//kernel.MapEditorOLD2:8804
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=43008829;//kernel.MapEditorOLD2:8829
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=43008884;//kernel.MapEditorOLD2:8884
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=43008937;//kernel.MapEditorOLD2:8937
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=43008991;//kernel.MapEditorOLD2:8991
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=43009040;//kernel.MapEditorOLD2:9040
                  _this.mode="set";
                  //$LASTPOS=43009061;//kernel.MapEditorOLD2:9061
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=43009091;//kernel.MapEditorOLD2:9091
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=43009117;//kernel.MapEditorOLD2:9117
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=43000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=43000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=43000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=43000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditorOLD2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000116;//kernel.MapEditorOLD2:116
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=43000144;//kernel.MapEditorOLD2:144
            if (_this.fileList.exists()) {
              //$LASTPOS=43000168;//kernel.MapEditorOLD2:168
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=43000207;//kernel.MapEditorOLD2:207
                f=f+"";
                //$LASTPOS=43000220;//kernel.MapEditorOLD2:220
                _this.fNames=f.split("/");
                //$LASTPOS=43000246;//kernel.MapEditorOLD2:246
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=43000283;//kernel.MapEditorOLD2:283
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=43000308;//kernel.MapEditorOLD2:308
            if (!(_this.fileExist)) { __pc=11; break; }
            //$LASTPOS=43000328;//kernel.MapEditorOLD2:328
            _this.print("Load Data?: Y or N");
            //$LASTPOS=43000362;//kernel.MapEditorOLD2:362
          case 2:
            //$LASTPOS=43000384;//kernel.MapEditorOLD2:384
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=43000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=43000471;//kernel.MapEditorOLD2:471
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=43000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=43000559;//kernel.MapEditorOLD2:559
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=43000581;//kernel.MapEditorOLD2:581
            if (!(_this.loadMode)) { __pc=10; break; }
            //$LASTPOS=43000604;//kernel.MapEditorOLD2:604
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=43000669;//kernel.MapEditorOLD2:669
            if (_this.fileName) {
              //$LASTPOS=43000696;//kernel.MapEditorOLD2:696
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=43000760;//kernel.MapEditorOLD2:760
            if (!(_this.mapDataFile.obj())) { __pc=7; break; }
            {
              //$LASTPOS=43000796;//kernel.MapEditorOLD2:796
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=43000837;//kernel.MapEditorOLD2:837
              _this.loadedFile=_this.fileName;
            }
            __pc=9;break;
          case 7:
            //$LASTPOS=43000887;//kernel.MapEditorOLD2:887
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=43000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=43000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=43001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
          case 9:
            
            //$LASTPOS=43001069;//kernel.MapEditorOLD2:1069
            if (_this.baseData==undefined) {
              //$LASTPOS=43001107;//kernel.MapEditorOLD2:1107
              _this.print("Load failed");
              //$LASTPOS=43001142;//kernel.MapEditorOLD2:1142
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=43001173;//kernel.MapEditorOLD2:1173
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=43001218;//kernel.MapEditorOLD2:1218
                _this.mapData=_this.baseData[0];
                //$LASTPOS=43001252;//kernel.MapEditorOLD2:1252
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=43001288;//kernel.MapEditorOLD2:1288
                if (_this.baseData.length>2) {
                  //$LASTPOS=43001328;//kernel.MapEditorOLD2:1328
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=43001384;//kernel.MapEditorOLD2:1384
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10:
            
          case 11:
            
            //$LASTPOS=43001461;//kernel.MapEditorOLD2:1461
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=43001739;//kernel.MapEditorOLD2:1739
            if (! _this.loadMode) {
              //$LASTPOS=43001759;//kernel.MapEditorOLD2:1759
              _this.row=prompt("input row");
              //$LASTPOS=43001789;//kernel.MapEditorOLD2:1789
              _this.col=prompt("input col");
              //$LASTPOS=43001819;//kernel.MapEditorOLD2:1819
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=43001861;//kernel.MapEditorOLD2:1861
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=43001905;//kernel.MapEditorOLD2:1905
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=43001970;//kernel.MapEditorOLD2:1970
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=43002001;//kernel.MapEditorOLD2:2001
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=43002033;//kernel.MapEditorOLD2:2033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=43002066;//kernel.MapEditorOLD2:2066
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=43002117;//kernel.MapEditorOLD2:2117
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=43002428;//kernel.MapEditorOLD2:2428
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=43002475;//kernel.MapEditorOLD2:2475
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=43002501;//kernel.MapEditorOLD2:2501
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=43002597;//kernel.MapEditorOLD2:2597
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=43002628;//kernel.MapEditorOLD2:2628
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=43002660;//kernel.MapEditorOLD2:2660
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=43002693;//kernel.MapEditorOLD2:2693
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=43002743;//kernel.MapEditorOLD2:2743
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=43002799;//kernel.MapEditorOLD2:2799
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=43002856;//kernel.MapEditorOLD2:2856
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=43002908;//kernel.MapEditorOLD2:2908
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=43002961;//kernel.MapEditorOLD2:2961
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=43003043;//kernel.MapEditorOLD2:3043
            _this.counter=0;
            //$LASTPOS=43003055;//kernel.MapEditorOLD2:3055
            //$LASTPOS=43003059;//kernel.MapEditorOLD2:3059
            i = 0;
            while(i<Tonyu.globals.$mp.row) {
              {
                //$LASTPOS=43003088;//kernel.MapEditorOLD2:3088
                //$LASTPOS=43003092;//kernel.MapEditorOLD2:3092
                j = 0;
                while(j<Tonyu.globals.$mp.col) {
                  {
                    //$LASTPOS=43003125;//kernel.MapEditorOLD2:3125
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=43003169;//kernel.MapEditorOLD2:3169
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=43003191;//kernel.MapEditorOLD2:3191
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=43003205;//kernel.MapEditorOLD2:3205
            _this.mode="get";
            //$LASTPOS=43003218;//kernel.MapEditorOLD2:3218
            _this.prevMode="set";
            //$LASTPOS=43003235;//kernel.MapEditorOLD2:3235
            _this.mapp=0;
            //$LASTPOS=43003244;//kernel.MapEditorOLD2:3244
            _this.mx=- 40;
            //$LASTPOS=43003253;//kernel.MapEditorOLD2:3253
            _this.my=- 40;
            //$LASTPOS=43003262;//kernel.MapEditorOLD2:3262
            _this.chipX=- 40;
            //$LASTPOS=43003274;//kernel.MapEditorOLD2:3274
            _this.chipY=- 40;
            //$LASTPOS=43003286;//kernel.MapEditorOLD2:3286
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=43003315;//kernel.MapEditorOLD2:3315
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=43003346;//kernel.MapEditorOLD2:3346
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=43003369;//kernel.MapEditorOLD2:3369
          case 14:
            //$LASTPOS=43003387;//kernel.MapEditorOLD2:3387
            _this.p=_this.mapp;
            //$LASTPOS=43003400;//kernel.MapEditorOLD2:3400
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=43003539;//kernel.MapEditorOLD2:3539
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=43003573;//kernel.MapEditorOLD2:3573
              _this.mode="erase";
              //$LASTPOS=43003596;//kernel.MapEditorOLD2:3596
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=43003629;//kernel.MapEditorOLD2:3629
            if (_this.getkey("s")==1) {
              //$LASTPOS=43003658;//kernel.MapEditorOLD2:3658
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=43003692;//kernel.MapEditorOLD2:3692
              if (_this.mode=="set") {
                //$LASTPOS=43003722;//kernel.MapEditorOLD2:3722
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=43003765;//kernel.MapEditorOLD2:3765
                _this.mode="set";
                
              }
              //$LASTPOS=43003797;//kernel.MapEditorOLD2:3797
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=43003830;//kernel.MapEditorOLD2:3830
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=43003949;//kernel.MapEditorOLD2:3949
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=43003983;//kernel.MapEditorOLD2:3983
              _this.mode="set";
              //$LASTPOS=43004004;//kernel.MapEditorOLD2:4004
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=43004037;//kernel.MapEditorOLD2:4037
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=43004158;//kernel.MapEditorOLD2:4158
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=43004192;//kernel.MapEditorOLD2:4192
              _this.mode="setOn";
              //$LASTPOS=43004215;//kernel.MapEditorOLD2:4215
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=43004341;//kernel.MapEditorOLD2:4341
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=43004482;//kernel.MapEditorOLD2:4482
              if (_this.mode!="get") {
                //$LASTPOS=43004512;//kernel.MapEditorOLD2:4512
                _this.prevMode=_this.mode;
                //$LASTPOS=43004540;//kernel.MapEditorOLD2:4540
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=43004576;//kernel.MapEditorOLD2:4576
                _this.mode="get";
                //$LASTPOS=43004601;//kernel.MapEditorOLD2:4601
                _this.chipX=- 40;
                //$LASTPOS=43004625;//kernel.MapEditorOLD2:4625
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=43004665;//kernel.MapEditorOLD2:4665
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=43004703;//kernel.MapEditorOLD2:4703
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=43004738;//kernel.MapEditorOLD2:4738
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=43004771;//kernel.MapEditorOLD2:4771
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=43004927;//kernel.MapEditorOLD2:4927
              if (_this.loadedFile) {
                //$LASTPOS=43004956;//kernel.MapEditorOLD2:4956
                _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
                
              } else {
                //$LASTPOS=43005044;//kernel.MapEditorOLD2:5044
                _this.saveFileName=prompt("input json file(*.json)","map.json");
                
              }
              //$LASTPOS=43005544;//kernel.MapEditorOLD2:5544
              if (_this.saveFileName) {
                //$LASTPOS=43005575;//kernel.MapEditorOLD2:5575
                _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
                //$LASTPOS=43005637;//kernel.MapEditorOLD2:5637
                _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
                //$LASTPOS=43005799;//kernel.MapEditorOLD2:5799
                _this.saveDataFile.obj(_this.data);
                //$LASTPOS=43005836;//kernel.MapEditorOLD2:5836
                _this.print(_this.saveFileName+" Saved");
                
              }
              
            }
            //$LASTPOS=43005943;//kernel.MapEditorOLD2:5943
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=43006084;//kernel.MapEditorOLD2:6084
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=43006118;//kernel.MapEditorOLD2:6118
              _this.mode="copy";
              //$LASTPOS=43006140;//kernel.MapEditorOLD2:6140
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=43006173;//kernel.MapEditorOLD2:6173
            if (_this.mode!="get") {
              //$LASTPOS=43006199;//kernel.MapEditorOLD2:6199
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=43006305;//kernel.MapEditorOLD2:6305
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=43006323;//kernel.MapEditorOLD2:6323
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=43006454;//kernel.MapEditorOLD2:6454
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=43006472;//kernel.MapEditorOLD2:6472
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=43006585;//kernel.MapEditorOLD2:6585
                _this.my=_this.my+8;
              }
              //$LASTPOS=43006603;//kernel.MapEditorOLD2:6603
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=43006738;//kernel.MapEditorOLD2:6738
                _this.my=_this.my-8;
              }
              //$LASTPOS=43006756;//kernel.MapEditorOLD2:6756
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=43006799;//kernel.MapEditorOLD2:6799
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=43006905;//kernel.MapEditorOLD2:6905
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=43006929;//kernel.MapEditorOLD2:6929
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=43007060;//kernel.MapEditorOLD2:7060
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=43007084;//kernel.MapEditorOLD2:7084
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=43007197;//kernel.MapEditorOLD2:7197
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=43007221;//kernel.MapEditorOLD2:7221
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=43007356;//kernel.MapEditorOLD2:7356
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=43007380;//kernel.MapEditorOLD2:7380
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=43007453;//kernel.MapEditorOLD2:7453
            if (_this.getkey("i")==1) {
              //$LASTPOS=43007482;//kernel.MapEditorOLD2:7482
              Tonyu.globals.$map.chipWidth+=4;
              //$LASTPOS=43007510;//kernel.MapEditorOLD2:7510
              Tonyu.globals.$map.chipHeight+=4;
              //$LASTPOS=43007539;//kernel.MapEditorOLD2:7539
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=43007566;//kernel.MapEditorOLD2:7566
              _this.panel.die();
              //$LASTPOS=43007588;//kernel.MapEditorOLD2:7588
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=43007688;//kernel.MapEditorOLD2:7688
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=43007723;//kernel.MapEditorOLD2:7723
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=43007759;//kernel.MapEditorOLD2:7759
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=43007796;//kernel.MapEditorOLD2:7796
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=43007854;//kernel.MapEditorOLD2:7854
            if (_this.getkey("o")==1) {
              //$LASTPOS=43007883;//kernel.MapEditorOLD2:7883
              Tonyu.globals.$map.chipWidth-=4;
              //$LASTPOS=43007911;//kernel.MapEditorOLD2:7911
              Tonyu.globals.$map.chipHeight-=4;
              //$LASTPOS=43007940;//kernel.MapEditorOLD2:7940
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=43007967;//kernel.MapEditorOLD2:7967
              _this.panel.die();
              //$LASTPOS=43007989;//kernel.MapEditorOLD2:7989
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=43008089;//kernel.MapEditorOLD2:8089
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=43008124;//kernel.MapEditorOLD2:8124
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=43008160;//kernel.MapEditorOLD2:8160
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=43008197;//kernel.MapEditorOLD2:8197
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=43008289;//kernel.MapEditorOLD2:8289
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=43008320;//kernel.MapEditorOLD2:8320
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=43008352;//kernel.MapEditorOLD2:8352
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15; break; }
            {
              //$LASTPOS=43008405;//kernel.MapEditorOLD2:8405
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=43008454;//kernel.MapEditorOLD2:8454
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=43008505;//kernel.MapEditorOLD2:8505
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16; break; }
            {
              //$LASTPOS=43008560;//kernel.MapEditorOLD2:8560
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=43008609;//kernel.MapEditorOLD2:8609
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18; break; }
            //$LASTPOS=43008662;//kernel.MapEditorOLD2:8662
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=43008716;//kernel.MapEditorOLD2:8716
            _this.mode=_this.prevMode;
            //$LASTPOS=43008740;//kernel.MapEditorOLD2:8740
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=43008774;//kernel.MapEditorOLD2:8774
            _this.print(_this.mode+" mode");
            //$LASTPOS=43008804;//kernel.MapEditorOLD2:8804
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=43008829;//kernel.MapEditorOLD2:8829
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19; break; }
            {
              //$LASTPOS=43008884;//kernel.MapEditorOLD2:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=43008937;//kernel.MapEditorOLD2:8937
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21; break; }
            //$LASTPOS=43008991;//kernel.MapEditorOLD2:8991
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=43009040;//kernel.MapEditorOLD2:9040
            _this.mode="set";
            //$LASTPOS=43009061;//kernel.MapEditorOLD2:9061
            _this.print(_this.mode+" mode");
            //$LASTPOS=43009091;//kernel.MapEditorOLD2:9091
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=43009117;//kernel.MapEditorOLD2:9117
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
      
      //$LASTPOS=43009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=43009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=43009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=43009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=43009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=43009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=43009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=43009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=43009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=43009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=43009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=43009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=43010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=43010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=43010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=43010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=43010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=43010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=43010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=43010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=43010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=43010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=43010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=43011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditorOLD2_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=43009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=43009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=43009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=43009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=43009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=43009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=43009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=43009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=43009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=43009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=43009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=43009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=43010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=43010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=43010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=43010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=43010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=43010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=43010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=43010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=43010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=43010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=43010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=43010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=43011018;//kernel.MapEditorOLD2:11018
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
      
      //$LASTPOS=44001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=44003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=44003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=44003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=44003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=44003502;//kernel.Pad:3502
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
      
      //$LASTPOS=44000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=44000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=44000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=44000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=44000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=44000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=44000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=44000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=44000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=44000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=44001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=44001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=44001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=44001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=44001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=44001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=44001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=44001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=44001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=44001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=44001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=44001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=44001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=44001383;//kernel.Pad:1383
      //$LASTPOS=44001388;//kernel.Pad:1388
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=44001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=44001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=44001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=44001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=44001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=44001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=44001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=44001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=44001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=44001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=44001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=44002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=44002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=44002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
        i++;
      }
      //$LASTPOS=44002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=44002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=44002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=44002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=44002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=44002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=44002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=44002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=44002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=44002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=44002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=44002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=44002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=44002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=44002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=44002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=44002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=44002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=44002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=44002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=44002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=44002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=44002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=44002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=44002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=44002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=44002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=44002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=44002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=44002739;//kernel.Pad:2739
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
      
      //$LASTPOS=44001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=44001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=44001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=44001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=44001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=44001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=44001383;//kernel.Pad:1383
      //$LASTPOS=44001388;//kernel.Pad:1388
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=44001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=44001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=44001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=44001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=44001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=44001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=44001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=44001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=44001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=44001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=44001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=44002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=44002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=44002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
        i++;
      }
      //$LASTPOS=44002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=44002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=44002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=44002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=44002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=44002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=44002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=44002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=44002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=44002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=44002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=44002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=44002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=44002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=44002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=44002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=44002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=44002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=44002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=44002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=44002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=44002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=44002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=44002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=44002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=44002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=44002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=44002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=44002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=44002739;//kernel.Pad:2739
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
      
      //$LASTPOS=44002940;//kernel.Pad:2940
      value;
      //$LASTPOS=44002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=44002968;//kernel.Pad:2968
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
      
      //$LASTPOS=44002940;//kernel.Pad:2940
      value;
      //$LASTPOS=44002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=44002968;//kernel.Pad:2968
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
      
      //$LASTPOS=44003163;//kernel.Pad:3163
      value;
      //$LASTPOS=44003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=44003191;//kernel.Pad:3191
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
      
      //$LASTPOS=44003163;//kernel.Pad:3163
      value;
      //$LASTPOS=44003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=44003191;//kernel.Pad:3191
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
  fullName: 'kernel.Boot',
  shortName: 'Boot',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2MediaPlayer],
  methods: {
    main :function _trc_Boot_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45002000;//kernel.Boot:2000
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=45002013;//kernel.Boot:2013
      _this.loadPlugins();
      //$LASTPOS=45002029;//kernel.Boot:2029
      _this.initSprites();
      //$LASTPOS=45002045;//kernel.Boot:2045
      _this.initSounds();
      //$LASTPOS=45002060;//kernel.Boot:2060
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=45002091;//kernel.Boot:2091
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=45002128;//kernel.Boot:2128
      _this.initThread();
      //$LASTPOS=45002145;//kernel.Boot:2145
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=45002162;//kernel.Boot:2162
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=45002179;//kernel.Boot:2179
      Tonyu.globals.$Math=Math;
      //$LASTPOS=45002192;//kernel.Boot:2192
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=45002302;//kernel.Boot:2302
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=45002326;//kernel.Boot:2326
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=45002466;//kernel.Boot:2466
      _this.initFPSParams();
      //$LASTPOS=45002486;//kernel.Boot:2486
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=45002507;//kernel.Boot:2507
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=45002528;//kernel.Boot:2528
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=45002566;//kernel.Boot:2566
        SplashScreen.hide();
      }
      //$LASTPOS=45002588;//kernel.Boot:2588
      while (true) {
        //$LASTPOS=45002605;//kernel.Boot:2605
        if (_this._useRAF) {
          //$LASTPOS=45002618;//kernel.Boot:2618
          _this.loopRAF();
        } else {
          //$LASTPOS=45002636;//kernel.Boot:2636
          _this.loopTimer();
        }
        //$LASTPOS=45002654;//kernel.Boot:2654
        _this.measureFps();
        //$LASTPOS=45002670;//kernel.Boot:2670
        _this.handlePause();
        
      }
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45002000;//kernel.Boot:2000
      Tonyu.globals.$Boot=_this;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45002013;//kernel.Boot:2013
            _this.fiber$loadPlugins(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45002029;//kernel.Boot:2029
            _this.fiber$initSprites(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=45002045;//kernel.Boot:2045
            _this.fiber$initSounds(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=45002060;//kernel.Boot:2060
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=45002091;//kernel.Boot:2091
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=45002128;//kernel.Boot:2128
            _this.fiber$initThread(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=45002145;//kernel.Boot:2145
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=45002162;//kernel.Boot:2162
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=45002179;//kernel.Boot:2179
            Tonyu.globals.$Math=Math;
            //$LASTPOS=45002192;//kernel.Boot:2192
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=45002302;//kernel.Boot:2302
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=45002326;//kernel.Boot:2326
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=45002466;//kernel.Boot:2466
            _this.initFPSParams();
            //$LASTPOS=45002486;//kernel.Boot:2486
            Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
            //$LASTPOS=45002507;//kernel.Boot:2507
            Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
            //$LASTPOS=45002528;//kernel.Boot:2528
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=45002566;//kernel.Boot:2566
              SplashScreen.hide();
            }
            //$LASTPOS=45002588;//kernel.Boot:2588
          case 5:
            //$LASTPOS=45002605;//kernel.Boot:2605
            if (!(_this._useRAF)) { __pc=7; break; }
            //$LASTPOS=45002618;//kernel.Boot:2618
            _this.fiber$loopRAF(_thread);
            __pc=6;return;
          case 6:
            
            __pc=9;break;
          case 7:
            //$LASTPOS=45002636;//kernel.Boot:2636
            _this.fiber$loopTimer(_thread);
            __pc=8;return;
          case 8:
            
          case 9:
            
            //$LASTPOS=45002654;//kernel.Boot:2654
            _this.measureFps();
            //$LASTPOS=45002670;//kernel.Boot:2670
            _this.fiber$handlePause(_thread);
            __pc=10;return;
          case 10:
            
            __pc=5;break;
          case 11:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Boot_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000237;//kernel.Boot:237
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000273;//kernel.Boot:273
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
            //$LASTPOS=45000273;//kernel.Boot:273
            _this.fiber$waitFor(_thread, Tonyu.timeout(50));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadPlugins :function _trc_Boot_loadPlugins() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=45000354;//kernel.Boot:354
      _this.print("Loading plugins..");
      //$LASTPOS=45000388;//kernel.Boot:388
      a = _this.asyncResult();
      //$LASTPOS=45000414;//kernel.Boot:414
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      //$LASTPOS=45000460;//kernel.Boot:460
      _this.waitFor(a);
    },
    fiber$loadPlugins :function _trc_Boot_f_loadPlugins(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=45000354;//kernel.Boot:354
      _this.print("Loading plugins..");
      //$LASTPOS=45000388;//kernel.Boot:388
      a = _this.asyncResult();
      //$LASTPOS=45000414;//kernel.Boot:414
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      
      _thread.enter(function _trc_Boot_ent_loadPlugins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000460;//kernel.Boot:460
            _this.fiber$waitFor(_thread, a);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprites :function _trc_Boot_initSprites() {
      "use strict";
      var _this=this;
      var rs;
      var r;
      var name;
      var val;
      var _it_324;
      
      //$LASTPOS=45000498;//kernel.Boot:498
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=45000527;//kernel.Boot:527
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=45000561;//kernel.Boot:561
      _this.cvj=$("canvas");
      //$LASTPOS=45000583;//kernel.Boot:583
      if (Tonyu.noviceMode) {
        //$LASTPOS=45000616;//kernel.Boot:616
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=45000700;//kernel.Boot:700
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
        
      }
      //$LASTPOS=45000773;//kernel.Boot:773
      _this.drawFrame();
      //$LASTPOS=45000791;//kernel.Boot:791
      _this.print("Loading pats..");
      //$LASTPOS=45000822;//kernel.Boot:822
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=45000865;//kernel.Boot:865
      _this.a=_this.asyncResult();
      //$LASTPOS=45000887;//kernel.Boot:887
      ImageList.load(rs.images,_this.a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      //$LASTPOS=45000972;//kernel.Boot:972
      _this.waitFor(_this.a);
      //$LASTPOS=45000989;//kernel.Boot:989
      r = _this.a[0];
      //$LASTPOS=45001006;//kernel.Boot:1006
      Tonyu.globals.$Sprites.setImageList(r);
      //$LASTPOS=45001037;//kernel.Boot:1037
      _it_324=Tonyu.iterator(r.names,2);
      while(_it_324.next()) {
        name=_it_324[0];
        val=_it_324[1];
        
        //$LASTPOS=45001078;//kernel.Boot:1078
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=45001118;//kernel.Boot:1118
      _this.print("Loading pats done.");
    },
    fiber$initSprites :function _trc_Boot_f_initSprites(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rs;
      var r;
      var name;
      var val;
      var _it_324;
      
      //$LASTPOS=45000498;//kernel.Boot:498
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=45000527;//kernel.Boot:527
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=45000561;//kernel.Boot:561
      _this.cvj=$("canvas");
      //$LASTPOS=45000583;//kernel.Boot:583
      if (Tonyu.noviceMode) {
        //$LASTPOS=45000616;//kernel.Boot:616
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=45000700;//kernel.Boot:700
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
        
      }
      //$LASTPOS=45000773;//kernel.Boot:773
      _this.drawFrame();
      //$LASTPOS=45000791;//kernel.Boot:791
      _this.print("Loading pats..");
      //$LASTPOS=45000822;//kernel.Boot:822
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=45000865;//kernel.Boot:865
      _this.a=_this.asyncResult();
      //$LASTPOS=45000887;//kernel.Boot:887
      ImageList.load(rs.images,_this.a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      
      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000972;//kernel.Boot:972
            _this.fiber$waitFor(_thread, _this.a);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45000989;//kernel.Boot:989
            r = _this.a[0];
            //$LASTPOS=45001006;//kernel.Boot:1006
            Tonyu.globals.$Sprites.setImageList(r);
            //$LASTPOS=45001037;//kernel.Boot:1037
            _it_324=Tonyu.iterator(r.names,2);
            while(_it_324.next()) {
              name=_it_324[0];
              val=_it_324[1];
              
              //$LASTPOS=45001078;//kernel.Boot:1078
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=45001118;//kernel.Boot:1118
            _this.print("Loading pats done.");
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSounds :function _trc_Boot_initSounds() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45001173;//kernel.Boot:1173
      _this.print("Loading sounds...");
      //$LASTPOS=45001207;//kernel.Boot:1207
      _this.initT2MediaPlayer();
      //$LASTPOS=45001233;//kernel.Boot:1233
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=45001272;//kernel.Boot:1272
      _this.print("Loading sounds done.");
      //$LASTPOS=45001309;//kernel.Boot:1309
      _this.on("stop",(function anonymous_1319() {
        
        //$LASTPOS=45001331;//kernel.Boot:1331
        _this.clearSEData();
      }));
      //$LASTPOS=45001359;//kernel.Boot:1359
      Tonyu.globals.$sound=_this;
    },
    fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45001173;//kernel.Boot:1173
      _this.print("Loading sounds...");
      
      _thread.enter(function _trc_Boot_ent_initSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45001207;//kernel.Boot:1207
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45001233;//kernel.Boot:1233
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=45001272;//kernel.Boot:1272
            _this.print("Loading sounds done.");
            //$LASTPOS=45001309;//kernel.Boot:1309
            _this.on("stop",(function anonymous_1319() {
              
              //$LASTPOS=45001331;//kernel.Boot:1331
              _this.clearSEData();
            }));
            //$LASTPOS=45001359;//kernel.Boot:1359
            Tonyu.globals.$sound=_this;
            _thread.exit(_this);return;
          }
        }
      });
    },
    hide :function _trc_Boot_hide() {
      "use strict";
      var _this=this;
      
    },
    initThread :function _trc_Boot_initThread() {
      "use strict";
      var _this=this;
      var o;
      var mainClassName;
      
      //$LASTPOS=45001413;//kernel.Boot:1413
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=45001459;//kernel.Boot:1459
      mainClassName = o.run.mainClass;
      //$LASTPOS=45001499;//kernel.Boot:1499
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=45001540;//kernel.Boot:1540
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=45001586;//kernel.Boot:1586
      if (! _this.mainClass) {
        //$LASTPOS=45001613;//kernel.Boot:1613
        TError(mainClassName+" というクラスはありません","",0).raise();
        
      }
      //$LASTPOS=45001689;//kernel.Boot:1689
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=45001730;//kernel.Boot:1730
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot_f_initThread(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=45001413;//kernel.Boot:1413
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=45001459;//kernel.Boot:1459
      mainClassName = o.run.mainClass;
      //$LASTPOS=45001499;//kernel.Boot:1499
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=45001540;//kernel.Boot:1540
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=45001586;//kernel.Boot:1586
      if (! _this.mainClass) {
        //$LASTPOS=45001613;//kernel.Boot:1613
        TError(mainClassName+" というクラスはありません","",0).raise();
        
      }
      //$LASTPOS=45001689;//kernel.Boot:1689
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=45001730;//kernel.Boot:1730
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45001766;//kernel.Boot:1766
      _this.fireEvent("stop");
      //$LASTPOS=45001790;//kernel.Boot:1790
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45001766;//kernel.Boot:1766
      _this.fireEvent("stop");
      //$LASTPOS=45001790;//kernel.Boot:1790
      _this.die();
      
      _thread.retVal=_this;return;
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      "use strict";
      var _this=this;
      var th;
      
      //$LASTPOS=45001835;//kernel.Boot:1835
      method=method||"main";
      //$LASTPOS=45001863;//kernel.Boot:1863
      args=args||[];
      //$LASTPOS=45001883;//kernel.Boot:1883
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=45001935;//kernel.Boot:1935
      _this.addThreadGroup(obj);
      //$LASTPOS=45001961;//kernel.Boot:1961
      obj.addThread(th);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=45001835;//kernel.Boot:1835
      method=method||"main";
      //$LASTPOS=45001863;//kernel.Boot:1863
      args=args||[];
      //$LASTPOS=45001883;//kernel.Boot:1883
      th = _this.scheduler.newThread(obj,method,args);
      
      _thread.enter(function _trc_Boot_ent_schedule(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45001935;//kernel.Boot:1935
            _this.fiber$addThreadGroup(_thread, obj);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45001961;//kernel.Boot:1961
            obj.addThread(th);
            _thread.exit(th);return;
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
      
      //$LASTPOS=45002704;//kernel.Boot:2704
      start = _this.now();elapsed;
      //$LASTPOS=45002731;//kernel.Boot:2731
      time = 1000/_this._fps;
      //$LASTPOS=45002770;//kernel.Boot:2770
      moves = 0;
      //$LASTPOS=45002785;//kernel.Boot:2785
      while (moves<_this.frameSkip) {
        //$LASTPOS=45002813;//kernel.Boot:2813
        _this.moveFrame();
        //$LASTPOS=45002829;//kernel.Boot:2829
        moves++;
        //$LASTPOS=45002841;//kernel.Boot:2841
        if (moves<_this.frameSkip) {
          //$LASTPOS=45002862;//kernel.Boot:2862
          _this.afterDraw();
        }
        
      }
      //$LASTPOS=45002881;//kernel.Boot:2881
      _this.drawFrame();
      //$LASTPOS=45002896;//kernel.Boot:2896
      _this.afterDraw();
      //$LASTPOS=45002911;//kernel.Boot:2911
      _this.waitRAF();
      //$LASTPOS=45002930;//kernel.Boot:2930
      elapsed=_this.now()-start;
      //$LASTPOS=45002958;//kernel.Boot:2958
      cnt = _this.rafCount-1;
      //$LASTPOS=45002983;//kernel.Boot:2983
      if (_this.rafResolution) {
        //$LASTPOS=45003054;//kernel.Boot:3054
        rafResMS = time/_this.rafResolution;
        //$LASTPOS=45003132;//kernel.Boot:3132
        elapsedRAF = _this.floor(elapsed/rafResMS+0.5);
        //$LASTPOS=45003192;//kernel.Boot:3192
        if (elapsedRAF>1) {
          //$LASTPOS=45003210;//kernel.Boot:3210
          cnt-=(elapsedRAF-1);
        }
        
      }
      //$LASTPOS=45003268;//kernel.Boot:3268
      _this.rafCntDebug=cnt;
      //$LASTPOS=45003287;//kernel.Boot:3287
      while (cnt>0) {
        //$LASTPOS=45003305;//kernel.Boot:3305
        _this.waitRAF();
        //$LASTPOS=45003319;//kernel.Boot:3319
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
      
      //$LASTPOS=45002704;//kernel.Boot:2704
      start = _this.now();elapsed;
      //$LASTPOS=45002731;//kernel.Boot:2731
      time = 1000/_this._fps;
      //$LASTPOS=45002770;//kernel.Boot:2770
      moves = 0;
      
      _thread.enter(function _trc_Boot_ent_loopRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45002785;//kernel.Boot:2785
          case 1:
            if (!(moves<_this.frameSkip)) { __pc=2; break; }
            {
              //$LASTPOS=45002813;//kernel.Boot:2813
              _this.moveFrame();
              //$LASTPOS=45002829;//kernel.Boot:2829
              moves++;
              //$LASTPOS=45002841;//kernel.Boot:2841
              if (moves<_this.frameSkip) {
                //$LASTPOS=45002862;//kernel.Boot:2862
                _this.afterDraw();
              }
            }
            __pc=1;break;
          case 2:
            
            //$LASTPOS=45002881;//kernel.Boot:2881
            _this.drawFrame();
            //$LASTPOS=45002896;//kernel.Boot:2896
            _this.afterDraw();
            //$LASTPOS=45002911;//kernel.Boot:2911
            _this.fiber$waitRAF(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=45002930;//kernel.Boot:2930
            elapsed=_this.now()-start;
            //$LASTPOS=45002958;//kernel.Boot:2958
            cnt = _this.rafCount-1;
            //$LASTPOS=45002983;//kernel.Boot:2983
            if (_this.rafResolution) {
              //$LASTPOS=45003054;//kernel.Boot:3054
              rafResMS = time/_this.rafResolution;
              //$LASTPOS=45003132;//kernel.Boot:3132
              elapsedRAF = _this.floor(elapsed/rafResMS+0.5);
              //$LASTPOS=45003192;//kernel.Boot:3192
              if (elapsedRAF>1) {
                //$LASTPOS=45003210;//kernel.Boot:3210
                cnt-=(elapsedRAF-1);
              }
              
            }
            //$LASTPOS=45003268;//kernel.Boot:3268
            _this.rafCntDebug=cnt;
            //$LASTPOS=45003287;//kernel.Boot:3287
          case 4:
            if (!(cnt>0)) { __pc=6; break; }
            //$LASTPOS=45003305;//kernel.Boot:3305
            _this.fiber$waitRAF(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=45003319;//kernel.Boot:3319
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
      
      //$LASTPOS=45003355;//kernel.Boot:3355
      _this.waitFor(Tonyu.animationFrame());
      //$LASTPOS=45003393;//kernel.Boot:3393
      rafStart = _this.now();
      //$LASTPOS=45003418;//kernel.Boot:3418
      if (_this.pRafStart) {
        //$LASTPOS=45003433;//kernel.Boot:3433
        _this.detectRAFResolution(rafStart-_this.pRafStart);
      }
      //$LASTPOS=45003479;//kernel.Boot:3479
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
            //$LASTPOS=45003355;//kernel.Boot:3355
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45003393;//kernel.Boot:3393
            rafStart = _this.now();
            //$LASTPOS=45003418;//kernel.Boot:3418
            if (_this.pRafStart) {
              //$LASTPOS=45003433;//kernel.Boot:3433
              _this.detectRAFResolution(rafStart-_this.pRafStart);
            }
            //$LASTPOS=45003479;//kernel.Boot:3479
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
      
      //$LASTPOS=45003538;//kernel.Boot:3538
      if (_this.rafResolution) {
        return _this;
      }
      //$LASTPOS=45003621;//kernel.Boot:3621
      time = 1000/_this._fps;
      //$LASTPOS=45003643;//kernel.Boot:3643
      reso = time/t;
      //$LASTPOS=45003731;//kernel.Boot:3731
      if (reso>1) {
        //$LASTPOS=45003743;//kernel.Boot:3743
        reso=_this.floor(reso+0.5);
      } else {
        //$LASTPOS=45003784;//kernel.Boot:3784
        reso=1/_this.floor(1/reso+0.5);
      }
      //$LASTPOS=45003863;//kernel.Boot:3863
      _this.rafRess=_this.rafRess||{};
      //$LASTPOS=45003886;//kernel.Boot:3886
      if ((_this.rafRess[reso+""]=(_this.rafRess[reso+""]||0)+1)>10) {
        //$LASTPOS=45003948;//kernel.Boot:3948
        _this.rafResolution=reso;
        //$LASTPOS=45003971;//kernel.Boot:3971
        if (reso<1) {
          //$LASTPOS=45003989;//kernel.Boot:3989
          _this.frameSkip=_this.floor(1/reso+0.5);
          //$LASTPOS=45004022;//kernel.Boot:4022
          _this.rafCount=1;
          
        } else {
          //$LASTPOS=45004050;//kernel.Boot:4050
          _this.rafCount=reso;
          //$LASTPOS=45004069;//kernel.Boot:4069
          _this.frameSkip=1;
          
        }
        
      }
    },
    measureRAFInterval :function _trc_Boot_measureRAFInterval() {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      //$LASTPOS=45004123;//kernel.Boot:4123
      if (Tonyu.globals.$RAFInterval) {
        return _this;
      }
      //$LASTPOS=45004151;//kernel.Boot:4151
      s = _this.now();
      //$LASTPOS=45004166;//kernel.Boot:4166
      //$LASTPOS=45004171;//kernel.Boot:4171
      i = 0;
      while(i<20) {
        {
          //$LASTPOS=45004197;//kernel.Boot:4197
          _this.waitFor(Tonyu.animationFrame());
        }
        i++;
      }
      //$LASTPOS=45004236;//kernel.Boot:4236
      Tonyu.globals.$RAFInterval=(_this.now()-s)/20;
    },
    fiber$measureRAFInterval :function _trc_Boot_f_measureRAFInterval(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var i;
      
      //$LASTPOS=45004123;//kernel.Boot:4123
      if (Tonyu.globals.$RAFInterval) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45004151;//kernel.Boot:4151
      s = _this.now();
      
      _thread.enter(function _trc_Boot_ent_measureRAFInterval(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45004166;//kernel.Boot:4166
            //$LASTPOS=45004171;//kernel.Boot:4171
            i = 0;;
          case 1:
            if (!(i<20)) { __pc=3; break; }
            //$LASTPOS=45004197;//kernel.Boot:4197
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=45004236;//kernel.Boot:4236
            Tonyu.globals.$RAFInterval=(_this.now()-s)/20;
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopTimer :function _trc_Boot_loopTimer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45004287;//kernel.Boot:4287
      _this.moveFrame();
      //$LASTPOS=45004305;//kernel.Boot:4305
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=45004333;//kernel.Boot:4333
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=45004387;//kernel.Boot:4387
        _this.doDraw=true;
        //$LASTPOS=45004409;//kernel.Boot:4409
        _this.resetDeadLine();
        
      }
      //$LASTPOS=45004438;//kernel.Boot:4438
      if (_this.doDraw) {
        //$LASTPOS=45004475;//kernel.Boot:4475
        _this.drawFrame();
        //$LASTPOS=45004497;//kernel.Boot:4497
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=45004536;//kernel.Boot:4536
        _this.frameSkipped++;
        
      }
      //$LASTPOS=45004564;//kernel.Boot:4564
      _this.afterDraw();
      //$LASTPOS=45004582;//kernel.Boot:4582
      _this.waitFrame();
    },
    fiber$loopTimer :function _trc_Boot_f_loopTimer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45004287;//kernel.Boot:4287
      _this.moveFrame();
      //$LASTPOS=45004305;//kernel.Boot:4305
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=45004333;//kernel.Boot:4333
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=45004387;//kernel.Boot:4387
        _this.doDraw=true;
        //$LASTPOS=45004409;//kernel.Boot:4409
        _this.resetDeadLine();
        
      }
      //$LASTPOS=45004438;//kernel.Boot:4438
      if (_this.doDraw) {
        //$LASTPOS=45004475;//kernel.Boot:4475
        _this.drawFrame();
        //$LASTPOS=45004497;//kernel.Boot:4497
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=45004536;//kernel.Boot:4536
        _this.frameSkipped++;
        
      }
      //$LASTPOS=45004564;//kernel.Boot:4564
      _this.afterDraw();
      
      _thread.enter(function _trc_Boot_ent_loopTimer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45004582;//kernel.Boot:4582
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
      
      //$LASTPOS=45004630;//kernel.Boot:4630
      while (_this.paused) {
        //$LASTPOS=45004655;//kernel.Boot:4655
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=45004691;//kernel.Boot:4691
        if (! _this.paused) {
          //$LASTPOS=45004704;//kernel.Boot:4704
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
            //$LASTPOS=45004630;//kernel.Boot:4630
          case 1:
            if (!(_this.paused)) { __pc=3; break; }
            //$LASTPOS=45004655;//kernel.Boot:4655
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=45004691;//kernel.Boot:4691
            if (! _this.paused) {
              //$LASTPOS=45004704;//kernel.Boot:4704
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
      
      //$LASTPOS=45004756;//kernel.Boot:4756
      s = _this.now();
      //$LASTPOS=45004774;//kernel.Boot:4774
      Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=45004815;//kernel.Boot:4815
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=45004851;//kernel.Boot:4851
      Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=45004892;//kernel.Boot:4892
      Tonyu.globals.$Screen.draw();
      //$LASTPOS=45004913;//kernel.Boot:4913
      _this.drawTime=_this.now()-s;
      //$LASTPOS=45004936;//kernel.Boot:4936
      _this.fps_fpsCnt++;
    },
    moveFrame :function _trc_Boot_moveFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=45004979;//kernel.Boot:4979
      s = _this.now();
      //$LASTPOS=45004997;//kernel.Boot:4997
      _this.scheduler.stepsAll();
      //$LASTPOS=45005024;//kernel.Boot:5024
      Tonyu.globals.$Keys.update();
      //$LASTPOS=45005045;//kernel.Boot:5045
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=45005073;//kernel.Boot:5073
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=45005106;//kernel.Boot:5106
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=45005141;//kernel.Boot:5141
      _this.moveTime=_this.now()-s;
      //$LASTPOS=45005164;//kernel.Boot:5164
      _this.fps_rpsCnt++;
    },
    afterDraw :function _trc_Boot_afterDraw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45005262;//kernel.Boot:5262
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=45005288;//kernel.Boot:5288
      Tonyu.globals.$Sprites.removeOneframes();
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45005370;//kernel.Boot:5370
      _this._fps=30;
      //$LASTPOS=45005386;//kernel.Boot:5386
      _this.maxFrameSkip=5;
      //$LASTPOS=45005409;//kernel.Boot:5409
      _this.minFrameSkip=1;
      //$LASTPOS=45005459;//kernel.Boot:5459
      _this.frameCnt=0;
      //$LASTPOS=45005478;//kernel.Boot:5478
      _this.resetDeadLine();
      //$LASTPOS=45005500;//kernel.Boot:5500
      _this.lastMeasured=_this.now();
      //$LASTPOS=45005525;//kernel.Boot:5525
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
      //$LASTPOS=45005571;//kernel.Boot:5571
      _this.drawTime=5;
      //$LASTPOS=45005582;//kernel.Boot:5582
      _this.moveTime=5;
      //$LASTPOS=45005596;//kernel.Boot:5596
      _this.rafAccept=1.1;
      //$LASTPOS=45005613;//kernel.Boot:5613
      _this.rafInterval=1000/60;
      //$LASTPOS=45005636;//kernel.Boot:5636
      _this._useRAF=true;
      //$LASTPOS=45005652;//kernel.Boot:5652
      _this.rafCount=2;
      //$LASTPOS=45005666;//kernel.Boot:5666
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
      
      //$LASTPOS=45005768;//kernel.Boot:5768
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=45005799;//kernel.Boot:5799
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      "use strict";
      var _this=this;
      var wt;
      
      //$LASTPOS=45005843;//kernel.Boot:5843
      wt = _this.deadLine-_this.now();
      //$LASTPOS=45005871;//kernel.Boot:5871
      if (wt<1) {
        //$LASTPOS=45005892;//kernel.Boot:5892
        if (wt<- 1000) {
          //$LASTPOS=45005906;//kernel.Boot:5906
          _this.resetDeadLine();
        }
        //$LASTPOS=45005932;//kernel.Boot:5932
        wt=1;
        
      }
      //$LASTPOS=45005950;//kernel.Boot:5950
      wt=_this.floor(wt);
      //$LASTPOS=45005969;//kernel.Boot:5969
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=45006002;//kernel.Boot:6002
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=45005843;//kernel.Boot:5843
      wt = _this.deadLine-_this.now();
      //$LASTPOS=45005871;//kernel.Boot:5871
      if (wt<1) {
        //$LASTPOS=45005892;//kernel.Boot:5892
        if (wt<- 1000) {
          //$LASTPOS=45005906;//kernel.Boot:5906
          _this.resetDeadLine();
        }
        //$LASTPOS=45005932;//kernel.Boot:5932
        wt=1;
        
      }
      //$LASTPOS=45005950;//kernel.Boot:5950
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45005969;//kernel.Boot:5969
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45006002;//kernel.Boot:6002
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
      
      //$LASTPOS=45006159;//kernel.Boot:6159
      if (_this._fps!=fps) {
        //$LASTPOS=45006180;//kernel.Boot:6180
        _this.rafRess={};
        //$LASTPOS=45006196;//kernel.Boot:6196
        _this.rafResolution=null;
        //$LASTPOS=45006219;//kernel.Boot:6219
        _this.frameSkip=1;
        //$LASTPOS=45006235;//kernel.Boot:6235
        _this.rafCnt=_this.floor(60/fps+0.5);
        
      }
      //$LASTPOS=45006270;//kernel.Boot:6270
      _this._fps=fps;
      //$LASTPOS=45006287;//kernel.Boot:6287
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=45006322;//kernel.Boot:6322
        maxFrameSkip=5;
      }
      //$LASTPOS=45006343;//kernel.Boot:6343
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=45006382;//kernel.Boot:6382
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
      
      //$LASTPOS=45006661;//kernel.Boot:6661
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=45006701;//kernel.Boot:6701
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=45006730;//kernel.Boot:6730
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=45006759;//kernel.Boot:6759
        _this.fps_fpsCnt=0;
        //$LASTPOS=45006782;//kernel.Boot:6782
        _this.fps_rpsCnt=0;
        //$LASTPOS=45006805;//kernel.Boot:6805
        _this.lastMeasured=_this.now();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"loadPlugins":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"hide":{"nowait":true},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"loopRAF":{"nowait":false},"waitRAF":{"nowait":false},"detectRAFResolution":{"nowait":true},"measureRAFInterval":{"nowait":false},"loopTimer":{"nowait":false},"handlePause":{"nowait":false},"drawFrame":{"nowait":true},"moveFrame":{"nowait":true},"afterDraw":{"nowait":true},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"__getter__useRAF":{"nowait":true},"__setter__useRAF":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}
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
      
      //$LASTPOS=46000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=46000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=46000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=46000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=46000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=46000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=46000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=46000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=46000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=46000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000212;//kernel.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=46000233;//kernel.DxChar:233
      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
