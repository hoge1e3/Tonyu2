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
      for (i = 1;  i<a.length ; i++) {
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
      var i;
      
      //$LASTPOS=2001639;//kernel.EventMod:1639
      if (null) {
        //$LASTPOS=2001663;//kernel.EventMod:1663
        args = [];
        //$LASTPOS=2001685;//kernel.EventMod:1685
        for (i = 0;  i<arguments.length ; i++) {
          {
            //$LASTPOS=2001737;//kernel.EventMod:1737
            if (arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=2001787;//kernel.EventMod:1787
            args.push(arguments[i]);
          }
        }
        //$LASTPOS=2001832;//kernel.EventMod:1832
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
      
      //$LASTPOS=2001639;//kernel.EventMod:1639
      if (_thread) {
        //$LASTPOS=2001663;//kernel.EventMod:1663
        args = [];
        //$LASTPOS=2001685;//kernel.EventMod:1685
        for (i = 0;  i<_arguments.length ; i++) {
          {
            //$LASTPOS=2001737;//kernel.EventMod:1737
            if (_arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=2001787;//kernel.EventMod:1787
            args.push(_arguments[i]);
          }
        }
        //$LASTPOS=2001832;//kernel.EventMod:1832
        _thread.waitEvent(_this,args);
        
      }
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_EventMod_waitFor(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2001895;//kernel.EventMod:1895
      if (null) {
        //$LASTPOS=2001919;//kernel.EventMod:1919
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_EventMod_f_waitFor(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2001895;//kernel.EventMod:1895
      if (_thread) {
        //$LASTPOS=2001919;//kernel.EventMod:1919
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
      
      
      //$LASTPOS=5000500;//kernel.MathMod:500
      a=_this.floor(a);
      //$LASTPOS=5000517;//kernel.MathMod:517
      b=_this.floor(b);
      //$LASTPOS=5000534;//kernel.MathMod:534
      if (a>=b) {
        //$LASTPOS=5000555;//kernel.MathMod:555
        c=(a-b)%360;
        //$LASTPOS=5000579;//kernel.MathMod:579
        if (c>=180) {
          //$LASTPOS=5000591;//kernel.MathMod:591
          c-=360;
        }
        
      } else {
        //$LASTPOS=5000622;//kernel.MathMod:622
        c=- ((b-a)%360);
        //$LASTPOS=5000649;//kernel.MathMod:649
        if (c<- 180) {
          //$LASTPOS=5000661;//kernel.MathMod:661
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
      
      //$LASTPOS=5000770;//kernel.MathMod:770
      if (typeof  dx=="object") {
        //$LASTPOS=5000806;//kernel.MathMod:806
        t = dx;
        //$LASTPOS=5000825;//kernel.MathMod:825
        dx=t.x-_this.x;
        //$LASTPOS=5000834;//kernel.MathMod:834
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=5000910;//kernel.MathMod:910
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
      
      //$LASTPOS=5001047;//kernel.MathMod:1047
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
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"atanxy":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true},"parseFloat":{"nowait":true}}}
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
      
      //$LASTPOS=6000091;//kernel.ObjectPool:91
      list = _this.poolList(key);
      //$LASTPOS=6000117;//kernel.ObjectPool:117
      o.objectPoolAge=(o.objectPoolAge||0)+1;
      //$LASTPOS=6000159;//kernel.ObjectPool:159
      list.push(o);
    },
    fiber$pool :function _trc_ObjectPool_f_pool(_thread,key,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var list;
      
      //$LASTPOS=6000091;//kernel.ObjectPool:91
      list = _this.poolList(key);
      //$LASTPOS=6000117;//kernel.ObjectPool:117
      o.objectPoolAge=(o.objectPoolAge||0)+1;
      //$LASTPOS=6000159;//kernel.ObjectPool:159
      list.push(o);
      
      _thread.retVal=_this;return;
    },
    withdraw :function _trc_ObjectPool_withdraw(key) {
      "use strict";
      var _this=this;
      var list;
      
      //$LASTPOS=6000196;//kernel.ObjectPool:196
      list = _this.poolList(key);
      return list.shift();
    },
    fiber$withdraw :function _trc_ObjectPool_f_withdraw(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var list;
      
      //$LASTPOS=6000196;//kernel.ObjectPool:196
      list = _this.poolList(key);
      _thread.retVal=list.shift();return;
      
      
      _thread.retVal=_this;return;
    },
    poolList :function _trc_ObjectPool_poolList(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      return _this.lists[key]=_this.lists[key]||[];
    },
    fiber$poolList :function _trc_ObjectPool_f_poolList(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      _thread.retVal=_this.lists[key]=_this.lists[key]||[];return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"pool":{"nowait":false},"withdraw":{"nowait":false},"poolList":{"nowait":false}}}
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
      
      //$LASTPOS=7000037;//kernel.T2Mod:37
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=7000037;//kernel.T2Mod:37
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
      
      //$LASTPOS=8000252;//kernel.ThreadGroupMod:252
      _this._threadGroup=g;
      //$LASTPOS=8000273;//kernel.ThreadGroupMod:273
      _this.tGrpObjectPoolAge=g.objectPoolAge;
    },
    fiber$setThreadGroup :function _trc_ThreadGroupMod_f_setThreadGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000252;//kernel.ThreadGroupMod:252
      _this._threadGroup=g;
      //$LASTPOS=8000273;//kernel.ThreadGroupMod:273
      _this.tGrpObjectPoolAge=g.objectPoolAge;
      
      _thread.retVal=_this;return;
    },
    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000338;//kernel.ThreadGroupMod:338
      _this._isDeadThreadGroup=true;
    },
    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000338;//kernel.ThreadGroupMod:338
      _this._isDeadThreadGroup=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"isDeadThreadGroup":{"nowait":false},"setThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}}}
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
      
      //$LASTPOS=9000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=9000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=9000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=9000123;//kernel.TObject:123
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
      
      //$LASTPOS=10000052;//kernel.TQuery:52
      _this.length=0;
    },
    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=10000095;//kernel.TQuery:95
      res = {};
      //$LASTPOS=10000112;//kernel.TQuery:112
      res.i=0;
      //$LASTPOS=10000126;//kernel.TQuery:126
      if (arity==1) {
        //$LASTPOS=10000151;//kernel.TQuery:151
        res.next=(function anonymous_160() {
          
          //$LASTPOS=10000187;//kernel.TQuery:187
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=10000238;//kernel.TQuery:238
          res[0]=_this[res.i];
          //$LASTPOS=10000271;//kernel.TQuery:271
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=10000341;//kernel.TQuery:341
        res.next=(function anonymous_350() {
          
          //$LASTPOS=10000377;//kernel.TQuery:377
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=10000428;//kernel.TQuery:428
          res[0]=res.i;
          //$LASTPOS=10000455;//kernel.TQuery:455
          res[1]=_this[res.i];
          //$LASTPOS=10000488;//kernel.TQuery:488
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
      
      //$LASTPOS=10000095;//kernel.TQuery:95
      res = {};
      //$LASTPOS=10000112;//kernel.TQuery:112
      res.i=0;
      //$LASTPOS=10000126;//kernel.TQuery:126
      if (arity==1) {
        //$LASTPOS=10000151;//kernel.TQuery:151
        res.next=(function anonymous_160() {
          
          //$LASTPOS=10000187;//kernel.TQuery:187
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=10000238;//kernel.TQuery:238
          res[0]=_this[res.i];
          //$LASTPOS=10000271;//kernel.TQuery:271
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=10000341;//kernel.TQuery:341
        res.next=(function anonymous_350() {
          
          //$LASTPOS=10000377;//kernel.TQuery:377
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=10000428;//kernel.TQuery:428
          res[0]=res.i;
          //$LASTPOS=10000455;//kernel.TQuery:455
          res[1]=_this[res.i];
          //$LASTPOS=10000488;//kernel.TQuery:488
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
      var _it_31;
      
      
      //$LASTPOS=10000595;//kernel.TQuery:595
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=10000623;//kernel.TQuery:623
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=10000734;//kernel.TQuery:734
      if (arguments.length>=2) {
        //$LASTPOS=10000770;//kernel.TQuery:770
        values={};
        //$LASTPOS=10000790;//kernel.TQuery:790
        for (i = 0;  i<arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=10000848;//kernel.TQuery:848
            values[arguments[i]]=arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=10000919;//kernel.TQuery:919
        values=arguments[0];
        
      }
      //$LASTPOS=10000952;//kernel.TQuery:952
      if (values) {
        //$LASTPOS=10000975;//kernel.TQuery:975
        _it_31=Tonyu.iterator(_this,1);
        while(_it_31.next()) {
          e=_it_31[0];
          
          //$LASTPOS=10001010;//kernel.TQuery:1010
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
      var _it_31;
      
      
      //$LASTPOS=10000595;//kernel.TQuery:595
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=10000623;//kernel.TQuery:623
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=10000734;//kernel.TQuery:734
      if (_arguments.length>=2) {
        //$LASTPOS=10000770;//kernel.TQuery:770
        values={};
        //$LASTPOS=10000790;//kernel.TQuery:790
        for (i = 0;  i<_arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=10000848;//kernel.TQuery:848
            values[_arguments[i]]=_arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=10000919;//kernel.TQuery:919
        values=_arguments[0];
        
      }
      //$LASTPOS=10000952;//kernel.TQuery:952
      if (values) {
        //$LASTPOS=10000975;//kernel.TQuery:975
        _it_31=Tonyu.iterator(_this,1);
        while(_it_31.next()) {
          e=_it_31[0];
          
          //$LASTPOS=10001010;//kernel.TQuery:1010
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10001075;//kernel.TQuery:1075
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
      
      //$LASTPOS=10001075;//kernel.TQuery:1075
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
      var _it_37;
      var v;
      
      //$LASTPOS=10001208;//kernel.TQuery:1208
      f = _this.genKeyfunc(key);
      //$LASTPOS=10001236;//kernel.TQuery:1236
      reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=10001266;//kernel.TQuery:1266
      _it_37=Tonyu.iterator(_this,1);
      while(_it_37.next()) {
        o=_it_37[0];
        
        //$LASTPOS=10001297;//kernel.TQuery:1297
        v = f(o);
        //$LASTPOS=10001318;//kernel.TQuery:1318
        if (res==null||v>=res) {
          //$LASTPOS=10001358;//kernel.TQuery:1358
          if (v>res) {
            //$LASTPOS=10001369;//kernel.TQuery:1369
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=10001399;//kernel.TQuery:1399
          reso.push(o);
          //$LASTPOS=10001426;//kernel.TQuery:1426
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
      var _it_37;
      var v;
      
      //$LASTPOS=10001208;//kernel.TQuery:1208
      f = _this.genKeyfunc(key);
      //$LASTPOS=10001236;//kernel.TQuery:1236
      reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=10001266;//kernel.TQuery:1266
      _it_37=Tonyu.iterator(_this,1);
      while(_it_37.next()) {
        o=_it_37[0];
        
        //$LASTPOS=10001297;//kernel.TQuery:1297
        v = f(o);
        //$LASTPOS=10001318;//kernel.TQuery:1318
        if (res==null||v>=res) {
          //$LASTPOS=10001358;//kernel.TQuery:1358
          if (v>res) {
            //$LASTPOS=10001369;//kernel.TQuery:1369
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=10001399;//kernel.TQuery:1399
          reso.push(o);
          //$LASTPOS=10001426;//kernel.TQuery:1426
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
      var _it_44;
      var v;
      
      //$LASTPOS=10001491;//kernel.TQuery:1491
      f = _this.genKeyfunc(key);
      //$LASTPOS=10001519;//kernel.TQuery:1519
      reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=10001549;//kernel.TQuery:1549
      _it_44=Tonyu.iterator(_this,1);
      while(_it_44.next()) {
        o=_it_44[0];
        
        //$LASTPOS=10001580;//kernel.TQuery:1580
        v = f(o);
        //$LASTPOS=10001601;//kernel.TQuery:1601
        if (res==null||v<=res) {
          //$LASTPOS=10001641;//kernel.TQuery:1641
          if (v<res) {
            //$LASTPOS=10001652;//kernel.TQuery:1652
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=10001682;//kernel.TQuery:1682
          reso.push(o);
          //$LASTPOS=10001709;//kernel.TQuery:1709
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
      var _it_44;
      var v;
      
      //$LASTPOS=10001491;//kernel.TQuery:1491
      f = _this.genKeyfunc(key);
      //$LASTPOS=10001519;//kernel.TQuery:1519
      reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=10001549;//kernel.TQuery:1549
      _it_44=Tonyu.iterator(_this,1);
      while(_it_44.next()) {
        o=_it_44[0];
        
        //$LASTPOS=10001580;//kernel.TQuery:1580
        v = f(o);
        //$LASTPOS=10001601;//kernel.TQuery:1601
        if (res==null||v<=res) {
          //$LASTPOS=10001641;//kernel.TQuery:1641
          if (v<res) {
            //$LASTPOS=10001652;//kernel.TQuery:1652
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=10001682;//kernel.TQuery:1682
          reso.push(o);
          //$LASTPOS=10001709;//kernel.TQuery:1709
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
      
      //$LASTPOS=10001868;//kernel.TQuery:1868
      if (typeof  x=="object") {
        //$LASTPOS=10001893;//kernel.TQuery:1893
        y=x.y;
        //$LASTPOS=10001899;//kernel.TQuery:1899
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
      
      //$LASTPOS=10001868;//kernel.TQuery:1868
      if (typeof  x=="object") {
        //$LASTPOS=10001893;//kernel.TQuery:1893
        y=x.y;
        //$LASTPOS=10001899;//kernel.TQuery:1899
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
      
      
      //$LASTPOS=10002067;//kernel.TQuery:2067
      if (typeof  xo=="object") {
        //$LASTPOS=10002103;//kernel.TQuery:2103
        x=xo.x;
        //$LASTPOS=10002110;//kernel.TQuery:2110
        y=xo.y;
        //$LASTPOS=10002117;//kernel.TQuery:2117
        d=yd;
        
      } else {
        //$LASTPOS=10002146;//kernel.TQuery:2146
        x=xo;
        //$LASTPOS=10002151;//kernel.TQuery:2151
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
      
      
      //$LASTPOS=10002067;//kernel.TQuery:2067
      if (typeof  xo=="object") {
        //$LASTPOS=10002103;//kernel.TQuery:2103
        x=xo.x;
        //$LASTPOS=10002110;//kernel.TQuery:2110
        y=xo.y;
        //$LASTPOS=10002117;//kernel.TQuery:2117
        d=yd;
        
      } else {
        //$LASTPOS=10002146;//kernel.TQuery:2146
        x=xo;
        //$LASTPOS=10002151;//kernel.TQuery:2151
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
      var _it_55;
      var v;
      
      //$LASTPOS=10002320;//kernel.TQuery:2320
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=10002362;//kernel.TQuery:2362
      _it_55=Tonyu.iterator(_this,1);
      while(_it_55.next()) {
        o=_it_55[0];
        
        //$LASTPOS=10002393;//kernel.TQuery:2393
        v = f(o);
        //$LASTPOS=10002414;//kernel.TQuery:2414
        if (res==null||v>res) {
          //$LASTPOS=10002438;//kernel.TQuery:2438
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
      var _it_55;
      var v;
      
      //$LASTPOS=10002320;//kernel.TQuery:2320
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=10002362;//kernel.TQuery:2362
      _it_55=Tonyu.iterator(_this,1);
      while(_it_55.next()) {
        o=_it_55[0];
        
        //$LASTPOS=10002393;//kernel.TQuery:2393
        v = f(o);
        //$LASTPOS=10002414;//kernel.TQuery:2414
        if (res==null||v>res) {
          //$LASTPOS=10002438;//kernel.TQuery:2438
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
      var _it_61;
      var v;
      
      //$LASTPOS=10002490;//kernel.TQuery:2490
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=10002532;//kernel.TQuery:2532
      _it_61=Tonyu.iterator(_this,1);
      while(_it_61.next()) {
        o=_it_61[0];
        
        //$LASTPOS=10002563;//kernel.TQuery:2563
        v = f(o);
        //$LASTPOS=10002584;//kernel.TQuery:2584
        if (res==null||v<res) {
          //$LASTPOS=10002608;//kernel.TQuery:2608
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
      var _it_61;
      var v;
      
      //$LASTPOS=10002490;//kernel.TQuery:2490
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=10002532;//kernel.TQuery:2532
      _it_61=Tonyu.iterator(_this,1);
      while(_it_61.next()) {
        o=_it_61[0];
        
        //$LASTPOS=10002563;//kernel.TQuery:2563
        v = f(o);
        //$LASTPOS=10002584;//kernel.TQuery:2584
        if (res==null||v<res) {
          //$LASTPOS=10002608;//kernel.TQuery:2608
          res=v;
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    push :function _trc_TQuery_push(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10002659;//kernel.TQuery:2659
      _this[_this.length]=e;
      //$LASTPOS=10002680;//kernel.TQuery:2680
      _this.length++;
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10002659;//kernel.TQuery:2659
      _this[_this.length]=e;
      //$LASTPOS=10002680;//kernel.TQuery:2680
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
      var _it_67;
      
      //$LASTPOS=10002736;//kernel.TQuery:2736
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=10002760;//kernel.TQuery:2760
      _it_67=Tonyu.iterator(_this,1);
      while(_it_67.next()) {
        o=_it_67[0];
        
        //$LASTPOS=10002791;//kernel.TQuery:2791
        if (f(o)) {
          //$LASTPOS=10002801;//kernel.TQuery:2801
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
      var _it_67;
      
      //$LASTPOS=10002736;//kernel.TQuery:2736
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=10002760;//kernel.TQuery:2760
      _it_67=Tonyu.iterator(_this,1);
      while(_it_67.next()) {
        o=_it_67[0];
        
        //$LASTPOS=10002791;//kernel.TQuery:2791
        if (f(o)) {
          //$LASTPOS=10002801;//kernel.TQuery:2801
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
      var _it_71;
      var f;
      
      
      //$LASTPOS=10002921;//kernel.TQuery:2921
      if (! args) {
        //$LASTPOS=10002932;//kernel.TQuery:2932
        args=[];
      }
      //$LASTPOS=10002946;//kernel.TQuery:2946
      _it_71=Tonyu.iterator(_this,1);
      while(_it_71.next()) {
        o=_it_71[0];
        
        //$LASTPOS=10002977;//kernel.TQuery:2977
        f = o[name];
        //$LASTPOS=10003001;//kernel.TQuery:3001
        if (typeof  f=="function") {
          //$LASTPOS=10003042;//kernel.TQuery:3042
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
      var _it_71;
      var f;
      
      
      //$LASTPOS=10002921;//kernel.TQuery:2921
      if (! args) {
        //$LASTPOS=10002932;//kernel.TQuery:2932
        args=[];
      }
      //$LASTPOS=10002946;//kernel.TQuery:2946
      _it_71=Tonyu.iterator(_this,1);
      while(_it_71.next()) {
        o=_it_71[0];
        
        //$LASTPOS=10002977;//kernel.TQuery:2977
        f = o[name];
        //$LASTPOS=10003001;//kernel.TQuery:3001
        if (typeof  f=="function") {
          //$LASTPOS=10003042;//kernel.TQuery:3042
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
      
      //$LASTPOS=10003249;//kernel.TQuery:3249
      a = _this.alive();
      //$LASTPOS=10003269;//kernel.TQuery:3269
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=10003305;//kernel.TQuery:3305
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=10003249;//kernel.TQuery:3249
      a = _this.alive();
      //$LASTPOS=10003269;//kernel.TQuery:3269
      if (a.length==0) {
        _thread.retVal=false;return;
        
      }
      //$LASTPOS=10003305;//kernel.TQuery:3305
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
      
      
      //$LASTPOS=11000078;//kernel.DialogMod:78
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
            //$LASTPOS=11000078;//kernel.DialogMod:78
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
      
      
      //$LASTPOS=11000173;//kernel.DialogMod:173
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
            //$LASTPOS=11000173;//kernel.DialogMod:173
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
      
      
      //$LASTPOS=11000255;//kernel.DialogMod:255
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
            //$LASTPOS=11000255;//kernel.DialogMod:255
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
      
      
      //$LASTPOS=11000333;//kernel.DialogMod:333
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
            //$LASTPOS=11000333;//kernel.DialogMod:333
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
      
      //$LASTPOS=12000091;//kernel.InputDevice:91
      _this.listeners=[];
      //$LASTPOS=12000110;//kernel.InputDevice:110
      _this.touchEmu=true;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      "use strict";
      var _this=this;
      var l;
      
      //$LASTPOS=12000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=12000177;//kernel.InputDevice:177
      _this.listeners=[];
      //$LASTPOS=12000196;//kernel.InputDevice:196
      while (l.length>0) {
        //$LASTPOS=12000217;//kernel.InputDevice:217
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=12000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=12000177;//kernel.InputDevice:177
      _this.listeners=[];
      
      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000196;//kernel.InputDevice:196
          case 1:
            if (!(l.length>0)) { __pc=2; break; }
            {
              //$LASTPOS=12000217;//kernel.InputDevice:217
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
      
      //$LASTPOS=12000267;//kernel.InputDevice:267
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000267;//kernel.InputDevice:267
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
      
      //$LASTPOS=12000320;//kernel.InputDevice:320
      cv = cvj[0];
      //$LASTPOS=12000340;//kernel.InputDevice:340
      Tonyu.globals.$handleMouse=(function anonymous_353(e) {
        var p;
        var mp;
        
        //$LASTPOS=12000369;//kernel.InputDevice:369
        p = cvj.offset();
        //$LASTPOS=12000398;//kernel.InputDevice:398
        mp = {x: e.clientX-p.left,y: e.clientY-p.top};
        //$LASTPOS=12000455;//kernel.InputDevice:455
        mp=Tonyu.globals.$Screen.canvas2buf(mp);
        //$LASTPOS=12000491;//kernel.InputDevice:491
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=12000514;//kernel.InputDevice:514
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=12000537;//kernel.InputDevice:537
        if (_this.touchEmu) {
          //$LASTPOS=12000566;//kernel.InputDevice:566
          Tonyu.globals.$touches[0].x=mp.x;
          //$LASTPOS=12000599;//kernel.InputDevice:599
          Tonyu.globals.$touches[0].y=mp.y;
          
        }
        //$LASTPOS=12000639;//kernel.InputDevice:639
        _this.handleListeners();
      });
      //$LASTPOS=12000671;//kernel.InputDevice:671
      Tonyu.globals.$touches=[{},{},{},{},{}];
      //$LASTPOS=12000703;//kernel.InputDevice:703
      Tonyu.globals.$touches.findById=(function anonymous_721(id) {
        var j;
        
        //$LASTPOS=12000738;//kernel.InputDevice:738
        for (j = 0;  j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=12000793;//kernel.InputDevice:793
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=12000903;//kernel.InputDevice:903
      Tonyu.globals.$handleTouch=(function anonymous_916(e) {
        var p;
        var ts;
        var i;
        var src;
        var dst;
        var j;
        
        //$LASTPOS=12000932;//kernel.InputDevice:932
        _this.touchEmu=false;
        //$LASTPOS=12000957;//kernel.InputDevice:957
        p = cvj.offset();
        //$LASTPOS=12000986;//kernel.InputDevice:986
        e.preventDefault();
        //$LASTPOS=12001015;//kernel.InputDevice:1015
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=12001063;//kernel.InputDevice:1063
        for (i = 0;  i<ts.length ; i++) {
          {
            //$LASTPOS=12001113;//kernel.InputDevice:1113
            src = ts[i];
            //$LASTPOS=12001141;//kernel.InputDevice:1141
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=12001197;//kernel.InputDevice:1197
            if (! dst) {
              //$LASTPOS=12001226;//kernel.InputDevice:1226
              for (j = 0;  j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=12001289;//kernel.InputDevice:1289
                  if (! Tonyu.globals.$touches[j].touched) {
                    //$LASTPOS=12001342;//kernel.InputDevice:1342
                    dst=Tonyu.globals.$touches[j];
                    //$LASTPOS=12001384;//kernel.InputDevice:1384
                    dst.identifier=src.identifier;
                    break;
                    
                    
                  }
                }
              }
              
            }
            //$LASTPOS=12001517;//kernel.InputDevice:1517
            if (dst) {
              //$LASTPOS=12001545;//kernel.InputDevice:1545
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
              //$LASTPOS=12001606;//kernel.InputDevice:1606
              _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
              //$LASTPOS=12001650;//kernel.InputDevice:1650
              dst.x=_this.mp.x;
              //$LASTPOS=12001679;//kernel.InputDevice:1679
              dst.y=_this.mp.y;
              //$LASTPOS=12001708;//kernel.InputDevice:1708
              if (! dst.touched) {
                //$LASTPOS=12001725;//kernel.InputDevice:1725
                dst.touched=1;
              }
              
            }
          }
        }
        //$LASTPOS=12001775;//kernel.InputDevice:1775
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=12001807;//kernel.InputDevice:1807
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=12001839;//kernel.InputDevice:1839
        _this.handleListeners();
      });
      //$LASTPOS=12001871;//kernel.InputDevice:1871
      Tonyu.globals.$handleTouchEnd=(function anonymous_1887(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=12001903;//kernel.InputDevice:1903
        T2MediaLib.activate();
        //$LASTPOS=12001935;//kernel.InputDevice:1935
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=12001983;//kernel.InputDevice:1983
        for (i = 0;  i<ts.length ; i++) {
          {
            //$LASTPOS=12002033;//kernel.InputDevice:2033
            src = ts[i];
            //$LASTPOS=12002061;//kernel.InputDevice:2061
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=12002117;//kernel.InputDevice:2117
            if (dst) {
              //$LASTPOS=12002145;//kernel.InputDevice:2145
              dst.touched=0;
              //$LASTPOS=12002177;//kernel.InputDevice:2177
              dst.identifier=- 1;
              
            }
          }
        }
        //$LASTPOS=12002231;//kernel.InputDevice:2231
        _this.handleListeners();
      });
      //$LASTPOS=12002263;//kernel.InputDevice:2263
      handleMouse = (function anonymous_2279(e) {
        
        //$LASTPOS=12002284;//kernel.InputDevice:2284
        Tonyu.globals.$handleMouse(e);
      });
      //$LASTPOS=12002308;//kernel.InputDevice:2308
      handleTouch = (function anonymous_2324(e) {
        
        //$LASTPOS=12002329;//kernel.InputDevice:2329
        Tonyu.globals.$handleTouch(e);
      });
      //$LASTPOS=12002353;//kernel.InputDevice:2353
      handleTouchEnd = (function anonymous_2372(e) {
        
        //$LASTPOS=12002377;//kernel.InputDevice:2377
        Tonyu.globals.$handleTouchEnd(e);
      });
      //$LASTPOS=12002404;//kernel.InputDevice:2404
      d = $.data(cv,"events");
      //$LASTPOS=12002436;//kernel.InputDevice:2436
      if (! d) {
        //$LASTPOS=12002455;//kernel.InputDevice:2455
        $.data(cv,"events","true");
        //$LASTPOS=12002492;//kernel.InputDevice:2492
        cvj.mousedown(handleMouse);
        //$LASTPOS=12002529;//kernel.InputDevice:2529
        cvj.mousemove(handleMouse);
        //$LASTPOS=12002566;//kernel.InputDevice:2566
        cvj.on("touchstart",handleTouch);
        //$LASTPOS=12002609;//kernel.InputDevice:2609
        cvj.on("touchmove",handleTouch);
        //$LASTPOS=12002651;//kernel.InputDevice:2651
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
      
      //$LASTPOS=12000320;//kernel.InputDevice:320
      cv = cvj[0];
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000340;//kernel.InputDevice:340
            Tonyu.globals.$handleMouse=(function anonymous_353(e) {
              var p;
              var mp;
              
              //$LASTPOS=12000369;//kernel.InputDevice:369
              p = cvj.offset();
              //$LASTPOS=12000398;//kernel.InputDevice:398
              mp = {x: e.clientX-p.left,y: e.clientY-p.top};
              //$LASTPOS=12000455;//kernel.InputDevice:455
              mp=Tonyu.globals.$Screen.canvas2buf(mp);
              //$LASTPOS=12000491;//kernel.InputDevice:491
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=12000514;//kernel.InputDevice:514
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=12000537;//kernel.InputDevice:537
              if (_this.touchEmu) {
                //$LASTPOS=12000566;//kernel.InputDevice:566
                Tonyu.globals.$touches[0].x=mp.x;
                //$LASTPOS=12000599;//kernel.InputDevice:599
                Tonyu.globals.$touches[0].y=mp.y;
                
              }
              //$LASTPOS=12000639;//kernel.InputDevice:639
              _this.handleListeners();
            });
            //$LASTPOS=12000671;//kernel.InputDevice:671
            Tonyu.globals.$touches=[{},{},{},{},{}];
            //$LASTPOS=12000703;//kernel.InputDevice:703
            Tonyu.globals.$touches.findById=(function anonymous_721(id) {
              var j;
              
              //$LASTPOS=12000738;//kernel.InputDevice:738
              for (j = 0;  j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=12000793;//kernel.InputDevice:793
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=12000903;//kernel.InputDevice:903
            Tonyu.globals.$handleTouch=(function anonymous_916(e) {
              var p;
              var ts;
              var i;
              var src;
              var dst;
              var j;
              
              //$LASTPOS=12000932;//kernel.InputDevice:932
              _this.touchEmu=false;
              //$LASTPOS=12000957;//kernel.InputDevice:957
              p = cvj.offset();
              //$LASTPOS=12000986;//kernel.InputDevice:986
              e.preventDefault();
              //$LASTPOS=12001015;//kernel.InputDevice:1015
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=12001063;//kernel.InputDevice:1063
              for (i = 0;  i<ts.length ; i++) {
                {
                  //$LASTPOS=12001113;//kernel.InputDevice:1113
                  src = ts[i];
                  //$LASTPOS=12001141;//kernel.InputDevice:1141
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=12001197;//kernel.InputDevice:1197
                  if (! dst) {
                    //$LASTPOS=12001226;//kernel.InputDevice:1226
                    for (j = 0;  j<Tonyu.globals.$touches.length ; j++) {
                      {
                        //$LASTPOS=12001289;//kernel.InputDevice:1289
                        if (! Tonyu.globals.$touches[j].touched) {
                          //$LASTPOS=12001342;//kernel.InputDevice:1342
                          dst=Tonyu.globals.$touches[j];
                          //$LASTPOS=12001384;//kernel.InputDevice:1384
                          dst.identifier=src.identifier;
                          break;
                          
                          
                        }
                      }
                    }
                    
                  }
                  //$LASTPOS=12001517;//kernel.InputDevice:1517
                  if (dst) {
                    //$LASTPOS=12001545;//kernel.InputDevice:1545
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                    //$LASTPOS=12001606;//kernel.InputDevice:1606
                    _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                    //$LASTPOS=12001650;//kernel.InputDevice:1650
                    dst.x=_this.mp.x;
                    //$LASTPOS=12001679;//kernel.InputDevice:1679
                    dst.y=_this.mp.y;
                    //$LASTPOS=12001708;//kernel.InputDevice:1708
                    if (! dst.touched) {
                      //$LASTPOS=12001725;//kernel.InputDevice:1725
                      dst.touched=1;
                    }
                    
                  }
                }
              }
              //$LASTPOS=12001775;//kernel.InputDevice:1775
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=12001807;//kernel.InputDevice:1807
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=12001839;//kernel.InputDevice:1839
              _this.handleListeners();
            });
            //$LASTPOS=12001871;//kernel.InputDevice:1871
            Tonyu.globals.$handleTouchEnd=(function anonymous_1887(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=12001903;//kernel.InputDevice:1903
              T2MediaLib.activate();
              //$LASTPOS=12001935;//kernel.InputDevice:1935
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=12001983;//kernel.InputDevice:1983
              for (i = 0;  i<ts.length ; i++) {
                {
                  //$LASTPOS=12002033;//kernel.InputDevice:2033
                  src = ts[i];
                  //$LASTPOS=12002061;//kernel.InputDevice:2061
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=12002117;//kernel.InputDevice:2117
                  if (dst) {
                    //$LASTPOS=12002145;//kernel.InputDevice:2145
                    dst.touched=0;
                    //$LASTPOS=12002177;//kernel.InputDevice:2177
                    dst.identifier=- 1;
                    
                  }
                }
              }
              //$LASTPOS=12002231;//kernel.InputDevice:2231
              _this.handleListeners();
            });
            //$LASTPOS=12002263;//kernel.InputDevice:2263
            handleMouse = (function anonymous_2279(e) {
              
              //$LASTPOS=12002284;//kernel.InputDevice:2284
              Tonyu.globals.$handleMouse(e);
            });
            //$LASTPOS=12002308;//kernel.InputDevice:2308
            handleTouch = (function anonymous_2324(e) {
              
              //$LASTPOS=12002329;//kernel.InputDevice:2329
              Tonyu.globals.$handleTouch(e);
            });
            //$LASTPOS=12002353;//kernel.InputDevice:2353
            handleTouchEnd = (function anonymous_2372(e) {
              
              //$LASTPOS=12002377;//kernel.InputDevice:2377
              Tonyu.globals.$handleTouchEnd(e);
            });
            //$LASTPOS=12002404;//kernel.InputDevice:2404
            d = $.data(cv,"events");
            //$LASTPOS=12002436;//kernel.InputDevice:2436
            if (! d) {
              //$LASTPOS=12002455;//kernel.InputDevice:2455
              $.data(cv,"events","true");
              //$LASTPOS=12002492;//kernel.InputDevice:2492
              cvj.mousedown(handleMouse);
              //$LASTPOS=12002529;//kernel.InputDevice:2529
              cvj.mousemove(handleMouse);
              //$LASTPOS=12002566;//kernel.InputDevice:2566
              cvj.on("touchstart",handleTouch);
              //$LASTPOS=12002609;//kernel.InputDevice:2609
              cvj.on("touchmove",handleTouch);
              //$LASTPOS=12002651;//kernel.InputDevice:2651
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
      var _it_109;
      
      //$LASTPOS=12002716;//kernel.InputDevice:2716
      _it_109=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_109.next()) {
        i=_it_109[0];
        
        //$LASTPOS=12002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=12002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=12002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=12002811;//kernel.InputDevice:2811
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
      var _it_109;
      
      //$LASTPOS=12002716;//kernel.InputDevice:2716
      _it_109=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_109.next()) {
        i=_it_109[0];
        
        //$LASTPOS=12002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=12002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=12002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=12002811;//kernel.InputDevice:2811
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
      
      //$LASTPOS=13000089;//kernel.Keys:89
      _this.stats={};
      //$LASTPOS=13000100;//kernel.Keys:100
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=13000222;//kernel.Keys:222
      for (i = 65;  i<65+26 ; i++) {
        {
          //$LASTPOS=13000259;//kernel.Keys:259
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
      }
      //$LASTPOS=13000310;//kernel.Keys:310
      for (i = 48;  i<58 ; i++) {
        {
          //$LASTPOS=13000344;//kernel.Keys:344
          _this.codes[String.fromCharCode(i)]=i;
        }
      }
      //$LASTPOS=13000381;//kernel.Keys:381
      if (! $.data(document,"key_event")) {
        //$LASTPOS=13000423;//kernel.Keys:423
        $.data(document,"key_event",true);
        //$LASTPOS=13000463;//kernel.Keys:463
        $(document).keydown((function anonymous_483(e) {
          
          //$LASTPOS=13000489;//kernel.Keys:489
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=13000514;//kernel.Keys:514
        $(document).keyup((function anonymous_532(e) {
          
          //$LASTPOS=13000538;//kernel.Keys:538
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=13000561;//kernel.Keys:561
        $(document).mousedown((function anonymous_583(e) {
          
          //$LASTPOS=13000599;//kernel.Keys:599
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=13000641;//kernel.Keys:641
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=13000684;//kernel.Keys:684
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=13000723;//kernel.Keys:723
        $(document).mouseup((function anonymous_743(e) {
          
          //$LASTPOS=13000759;//kernel.Keys:759
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=13000801;//kernel.Keys:801
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=13000844;//kernel.Keys:844
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
      
      //$LASTPOS=13000089;//kernel.Keys:89
      _this.stats={};
      //$LASTPOS=13000100;//kernel.Keys:100
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=13000222;//kernel.Keys:222
      for (i = 65;  i<65+26 ; i++) {
        {
          //$LASTPOS=13000259;//kernel.Keys:259
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
      }
      //$LASTPOS=13000310;//kernel.Keys:310
      for (i = 48;  i<58 ; i++) {
        {
          //$LASTPOS=13000344;//kernel.Keys:344
          _this.codes[String.fromCharCode(i)]=i;
        }
      }
      //$LASTPOS=13000381;//kernel.Keys:381
      if (! $.data(document,"key_event")) {
        //$LASTPOS=13000423;//kernel.Keys:423
        $.data(document,"key_event",true);
        //$LASTPOS=13000463;//kernel.Keys:463
        $(document).keydown((function anonymous_483(e) {
          
          //$LASTPOS=13000489;//kernel.Keys:489
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=13000514;//kernel.Keys:514
        $(document).keyup((function anonymous_532(e) {
          
          //$LASTPOS=13000538;//kernel.Keys:538
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=13000561;//kernel.Keys:561
        $(document).mousedown((function anonymous_583(e) {
          
          //$LASTPOS=13000599;//kernel.Keys:599
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=13000641;//kernel.Keys:641
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=13000684;//kernel.Keys:684
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=13000723;//kernel.Keys:723
        $(document).mouseup((function anonymous_743(e) {
          
          //$LASTPOS=13000759;//kernel.Keys:759
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=13000801;//kernel.Keys:801
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=13000844;//kernel.Keys:844
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000909;//kernel.Keys:909
      if (typeof  code=="string") {
        //$LASTPOS=13000947;//kernel.Keys:947
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=13000991;//kernel.Keys:991
      if (! code) {
        return 0;
      }
      //$LASTPOS=13001017;//kernel.Keys:1017
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=13001053;//kernel.Keys:1053
      if (! _this.stats[code]) {
        //$LASTPOS=13001071;//kernel.Keys:1071
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000909;//kernel.Keys:909
      if (typeof  code=="string") {
        //$LASTPOS=13000947;//kernel.Keys:947
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=13000991;//kernel.Keys:991
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=13001017;//kernel.Keys:1017
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=13001053;//kernel.Keys:1053
      if (! _this.stats[code]) {
        //$LASTPOS=13001071;//kernel.Keys:1071
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_117;
      
      //$LASTPOS=13001140;//kernel.Keys:1140
      _it_117=Tonyu.iterator(_this.stats,1);
      while(_it_117.next()) {
        i=_it_117[0];
        
        //$LASTPOS=13001172;//kernel.Keys:1172
        if (_this.stats[i]>0) {
          //$LASTPOS=13001189;//kernel.Keys:1189
          _this.stats[i]++;
          
        }
        //$LASTPOS=13001211;//kernel.Keys:1211
        if (_this.stats[i]==- 1) {
          //$LASTPOS=13001229;//kernel.Keys:1229
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
      var _it_117;
      
      //$LASTPOS=13001140;//kernel.Keys:1140
      _it_117=Tonyu.iterator(_this.stats,1);
      while(_it_117.next()) {
        i=_it_117[0];
        
        //$LASTPOS=13001172;//kernel.Keys:1172
        if (_this.stats[i]>0) {
          //$LASTPOS=13001189;//kernel.Keys:1189
          _this.stats[i]++;
          
        }
        //$LASTPOS=13001211;//kernel.Keys:1211
        if (_this.stats[i]==- 1) {
          //$LASTPOS=13001229;//kernel.Keys:1229
          _this.stats[i]=1;
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=13001271;//kernel.Keys:1271
      s = _this.stats[e.keyCode];
      //$LASTPOS=13001300;//kernel.Keys:1300
      if (! s) {
        //$LASTPOS=13001319;//kernel.Keys:1319
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=13001351;//kernel.Keys:1351
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=13001271;//kernel.Keys:1271
      s = _this.stats[e.keyCode];
      //$LASTPOS=13001300;//kernel.Keys:1300
      if (! s) {
        //$LASTPOS=13001319;//kernel.Keys:1319
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=13001351;//kernel.Keys:1351
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13001404;//kernel.Keys:1404
      _this.stats[e.keyCode]=0;
      //$LASTPOS=13001429;//kernel.Keys:1429
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13001404;//kernel.Keys:1404
      _this.stats[e.keyCode]=0;
      //$LASTPOS=13001429;//kernel.Keys:1429
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
      
      //$LASTPOS=14000226;//kernel.BaseActor:226
      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      //$LASTPOS=14000267;//kernel.BaseActor:267
      if (typeof  x=="object") {
        //$LASTPOS=14000291;//kernel.BaseActor:291
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=14000323;//kernel.BaseActor:323
        if (typeof  x=="number") {
          //$LASTPOS=14000358;//kernel.BaseActor:358
          _this.x=x;
          //$LASTPOS=14000377;//kernel.BaseActor:377
          _this.y=y;
          //$LASTPOS=14000396;//kernel.BaseActor:396
          _this.p=p;
          
        }
      }
      //$LASTPOS=14000420;//kernel.BaseActor:420
      if (_this.scaleX==null) {
        //$LASTPOS=14000438;//kernel.BaseActor:438
        _this.scaleX=1;
      }
      //$LASTPOS=14000453;//kernel.BaseActor:453
      if (_this.rotation==null) {
        //$LASTPOS=14000473;//kernel.BaseActor:473
        _this.rotation=0;
      }
      //$LASTPOS=14000490;//kernel.BaseActor:490
      if (_this.rotate==null) {
        //$LASTPOS=14000508;//kernel.BaseActor:508
        _this.rotate=0;
      }
      //$LASTPOS=14000523;//kernel.BaseActor:523
      if (_this.alpha==null) {
        //$LASTPOS=14000540;//kernel.BaseActor:540
        _this.alpha=255;
      }
      //$LASTPOS=14000556;//kernel.BaseActor:556
      if (_this.zOrder==null) {
        //$LASTPOS=14000574;//kernel.BaseActor:574
        _this.zOrder=0;
      }
      //$LASTPOS=14000589;//kernel.BaseActor:589
      if (_this.age==null) {
        //$LASTPOS=14000604;//kernel.BaseActor:604
        _this.age=0;
      }
      //$LASTPOS=14000616;//kernel.BaseActor:616
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=14000667;//kernel.BaseActor:667
        _this.animMode=true;
        //$LASTPOS=14000691;//kernel.BaseActor:691
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=14000725;//kernel.BaseActor:725
        _this.animMode=false;
        
      }
      //$LASTPOS=14000753;//kernel.BaseActor:753
      if (_this.animFps==null) {
        //$LASTPOS=14000772;//kernel.BaseActor:772
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
      
      //$LASTPOS=14000876;//kernel.BaseActor:876
      console.log.apply(console,arguments);
      //$LASTPOS=14000919;//kernel.BaseActor:919
      mergedArg = "";
      //$LASTPOS=14000942;//kernel.BaseActor:942
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=14000970;//kernel.BaseActor:970
        for (argCount = 0;  argCount<arguments.length ; argCount++) {
          {
            //$LASTPOS=14001041;//kernel.BaseActor:1041
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
        }
        //$LASTPOS=14001106;//kernel.BaseActor:1106
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=14001145;//kernel.BaseActor:1145
        for (printCount = 0;  printCount<_this.splits.length ; printCount++) {
          {
            //$LASTPOS=14001219;//kernel.BaseActor:1219
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=14001260;//kernel.BaseActor:1260
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=14001310;//kernel.BaseActor:1310
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14001433;//kernel.BaseActor:1433
      _this.animFps=f;
      //$LASTPOS=14001454;//kernel.BaseActor:1454
      _this.animFrame=0;
      //$LASTPOS=14001477;//kernel.BaseActor:1477
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14001527;//kernel.BaseActor:1527
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14001576;//kernel.BaseActor:1576
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14001618;//kernel.BaseActor:1618
      _this.onUpdate();
      //$LASTPOS=14001635;//kernel.BaseActor:1635
      if (null) {
        //$LASTPOS=14001658;//kernel.BaseActor:1658
        null.suspend();
        //$LASTPOS=14001686;//kernel.BaseActor:1686
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=14001702;//kernel.BaseActor:1702
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14001618;//kernel.BaseActor:1618
      _this.onUpdate();
      //$LASTPOS=14001635;//kernel.BaseActor:1635
      if (_thread) {
        //$LASTPOS=14001658;//kernel.BaseActor:1658
        _thread.suspend();
        //$LASTPOS=14001686;//kernel.BaseActor:1686
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=14001702;//kernel.BaseActor:1702
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
      
      //$LASTPOS=14001796;//kernel.BaseActor:1796
      for (updateCount = 0;  updateCount<updateT ; updateCount++) {
        {
          //$LASTPOS=14001863;//kernel.BaseActor:1863
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
            //$LASTPOS=14001796;//kernel.BaseActor:1796
            //$LASTPOS=14001800;//kernel.BaseActor:1800
            updateCount = 0;;
          case 1:
            if (!(updateCount<updateT)) { __pc=4; break; }
            //$LASTPOS=14001863;//kernel.BaseActor:1863
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
      
      //$LASTPOS=14002006;//kernel.BaseActor:2006
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=14002031;//kernel.BaseActor:2031
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=14002114;//kernel.BaseActor:2114
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2139(s) {
        
        //$LASTPOS=14002155;//kernel.BaseActor:2155
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=14002186;//kernel.BaseActor:2186
        if (! c||s instanceof c) {
          //$LASTPOS=14002227;//kernel.BaseActor:2227
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
      
      //$LASTPOS=14002334;//kernel.BaseActor:2334
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=14002359;//kernel.BaseActor:2359
      sp = _this;
      //$LASTPOS=14002396;//kernel.BaseActor:2396
      t1 = _this.getCrashRect();
      //$LASTPOS=14002424;//kernel.BaseActor:2424
      if (! t1) {
        return res;
      }
      //$LASTPOS=14002450;//kernel.BaseActor:2450
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2475(s) {
        var t2;
        
        
        //$LASTPOS=14002508;//kernel.BaseActor:2508
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=14002734;//kernel.BaseActor:2734
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14002814;//kernel.BaseActor:2814
      if (! t) {
        return false;
      }
      //$LASTPOS=14002841;//kernel.BaseActor:2841
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
      
      //$LASTPOS=14002964;//kernel.BaseActor:2964
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=14003092;//kernel.BaseActor:3092
      t1 = _this.getCrashRect();
      //$LASTPOS=14003120;//kernel.BaseActor:3120
      t2 = t.getCrashRect();
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_134;
      
      //$LASTPOS=14003429;//kernel.BaseActor:3429
      while (true) {
        //$LASTPOS=14003451;//kernel.BaseActor:3451
        if (typeof  d=="function") {
          //$LASTPOS=14003490;//kernel.BaseActor:3490
          _it_134=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_134.next()) {
            obj=_it_134[0];
            
            //$LASTPOS=14003532;//kernel.BaseActor:3532
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=14003589;//kernel.BaseActor:3589
          if (_this.crashTo(d)) {
            //$LASTPOS=14003618;//kernel.BaseActor:3618
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=14003663;//kernel.BaseActor:3663
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_134;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14003429;//kernel.BaseActor:3429
          case 1:
            //$LASTPOS=14003451;//kernel.BaseActor:3451
            if (!(typeof  d=="function")) { __pc=5; break; }
            //$LASTPOS=14003490;//kernel.BaseActor:3490
            _it_134=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_134.next())) { __pc=4; break; }
            obj=_it_134[0];
            
            //$LASTPOS=14003532;//kernel.BaseActor:3532
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            __pc=8;break;
          case 5:
            //$LASTPOS=14003589;//kernel.BaseActor:3589
            if (!(_this.crashTo(d))) { __pc=7; break; }
            //$LASTPOS=14003618;//kernel.BaseActor:3618
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=14003663;//kernel.BaseActor:3663
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
      
      //$LASTPOS=14003714;//kernel.BaseActor:3714
      actWidth = _this.width*_this.scaleX;
      //$LASTPOS=14003757;//kernel.BaseActor:3757
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=14003799;//kernel.BaseActor:3799
        actHeight=_this.height*_this.scaleX;
        
      } else {
        //$LASTPOS=14003845;//kernel.BaseActor:3845
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
      
      //$LASTPOS=14004106;//kernel.BaseActor:4106
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=14004131;//kernel.BaseActor:4131
      sp = _this;
      //$LASTPOS=14004168;//kernel.BaseActor:4168
      t1 = _this.getCrashRect();
      //$LASTPOS=14004196;//kernel.BaseActor:4196
      if (! t1) {
        return res;
      }
      //$LASTPOS=14004222;//kernel.BaseActor:4222
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_4247(s) {
        var t2;
        
        
        //$LASTPOS=14004280;//kernel.BaseActor:4280
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=14004463;//kernel.BaseActor:4463
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14004550;//kernel.BaseActor:4550
      if (! t) {
        return false;
      }
      //$LASTPOS=14004576;//kernel.BaseActor:4576
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14004722;//kernel.BaseActor:4722
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=14004761;//kernel.BaseActor:4761
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_144;
      
      //$LASTPOS=14004931;//kernel.BaseActor:4931
      while (true) {
        //$LASTPOS=14004953;//kernel.BaseActor:4953
        if (typeof  d=="function") {
          //$LASTPOS=14004992;//kernel.BaseActor:4992
          _it_144=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_144.next()) {
            obj=_it_144[0];
            
            //$LASTPOS=14005066;//kernel.BaseActor:5066
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=14005104;//kernel.BaseActor:5104
          if (_this.within(d,r)) {
            //$LASTPOS=14005134;//kernel.BaseActor:5134
            f(d);
            
          }
        }
        //$LASTPOS=14005160;//kernel.BaseActor:5160
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_144;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14004931;//kernel.BaseActor:4931
          case 1:
            //$LASTPOS=14004953;//kernel.BaseActor:4953
            if (typeof  d=="function") {
              //$LASTPOS=14004992;//kernel.BaseActor:4992
              _it_144=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_144.next()) {
                obj=_it_144[0];
                
                //$LASTPOS=14005066;//kernel.BaseActor:5066
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=14005104;//kernel.BaseActor:5104
              if (_this.within(d,r)) {
                //$LASTPOS=14005134;//kernel.BaseActor:5134
                f(d);
                
              }
            }
            //$LASTPOS=14005160;//kernel.BaseActor:5160
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
      
      //$LASTPOS=14005224;//kernel.BaseActor:5224
      Tonyu.globals.$Sprites.watchHit(typeA,typeB,(function anonymous_5257(a,b) {
        
        //$LASTPOS=14005275;//kernel.BaseActor:5275
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
      
      //$LASTPOS=14005429;//kernel.BaseActor:5429
      _this.killThreadGroup();
      //$LASTPOS=14005453;//kernel.BaseActor:5453
      _this.hide();
      //$LASTPOS=14005466;//kernel.BaseActor:5466
      _this.fireEvent("die");
      //$LASTPOS=14005489;//kernel.BaseActor:5489
      _this._isDead=true;
      //$LASTPOS=14005508;//kernel.BaseActor:5508
      if (_this._poolArray) {
        //$LASTPOS=14005535;//kernel.BaseActor:5535
        _this._poolArray.push(_this);
        //$LASTPOS=14005567;//kernel.BaseActor:5567
        _this.objectPoolAge=(_this.objectPoolAge||0)+1;
        
      }
    },
    hide :function _trc_BaseActor_hide() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14005636;//kernel.BaseActor:5636
      if (_this.layer&&typeof  _this.layer.remove=="function") {
        //$LASTPOS=14005691;//kernel.BaseActor:5691
        _this.layer.remove(_this);
        
      } else {
        //$LASTPOS=14005732;//kernel.BaseActor:5732
        Tonyu.globals.$Sprites.remove(_this);
        
      }
    },
    show :function _trc_BaseActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14005793;//kernel.BaseActor:5793
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=14005845;//kernel.BaseActor:5845
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=14005883;//kernel.BaseActor:5883
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=14005915;//kernel.BaseActor:5915
      if (x!=null) {
        //$LASTPOS=14005928;//kernel.BaseActor:5928
        _this.x=x;
      }
      //$LASTPOS=14005943;//kernel.BaseActor:5943
      if (y!=null) {
        //$LASTPOS=14005956;//kernel.BaseActor:5956
        _this.y=y;
      }
      //$LASTPOS=14005971;//kernel.BaseActor:5971
      if (p!=null) {
        //$LASTPOS=14005984;//kernel.BaseActor:5984
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14006029;//kernel.BaseActor:6029
      if (typeof  _this.p!="number") {
        //$LASTPOS=14006064;//kernel.BaseActor:6064
        if (_this.text!=null) {
          return _this;
        }
        //$LASTPOS=14006097;//kernel.BaseActor:6097
        _this.p=0;
        
      }
      //$LASTPOS=14006114;//kernel.BaseActor:6114
      _this.p=Math.floor(_this.p);
      //$LASTPOS=14006136;//kernel.BaseActor:6136
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
      //$LASTPOS=14006174;//kernel.BaseActor:6174
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=14006198;//kernel.BaseActor:6198
      _this.width=_this.pImg.width;
      //$LASTPOS=14006221;//kernel.BaseActor:6221
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
      
      //$LASTPOS=14006414;//kernel.BaseActor:6414
      _this.age++;
      //$LASTPOS=14006426;//kernel.BaseActor:6426
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=14006467;//kernel.BaseActor:6467
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=14006507;//kernel.BaseActor:6507
        _this.animFrame++;
        
      }
    },
    draw :function _trc_BaseActor_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=14006556;//kernel.BaseActor:6556
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=14006609;//kernel.BaseActor:6609
      _this.detectShape();
      //$LASTPOS=14006629;//kernel.BaseActor:6629
      if (_this.pImg) {
        //$LASTPOS=14006650;//kernel.BaseActor:6650
        ctx.save();
        //$LASTPOS=14006671;//kernel.BaseActor:6671
        ctx.translate(_this.x,_this.y);
        //$LASTPOS=14006815;//kernel.BaseActor:6815
        _this.animation();
        //$LASTPOS=14006837;//kernel.BaseActor:6837
        if (_this.rotation!=0) {
          //$LASTPOS=14006872;//kernel.BaseActor:6872
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=14006940;//kernel.BaseActor:6940
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=14006997;//kernel.BaseActor:6997
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=14007049;//kernel.BaseActor:7049
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=14007114;//kernel.BaseActor:7114
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=14007170;//kernel.BaseActor:7170
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=14007211;//kernel.BaseActor:7211
        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=14007343;//kernel.BaseActor:7343
        ctx.restore();
        
      } else {
        //$LASTPOS=14007370;//kernel.BaseActor:7370
        if (_this.text!==null&&_this.text!==undefined) {
          //$LASTPOS=14007418;//kernel.BaseActor:7418
          splitsText = (_this.text+"").split("\n");
          //$LASTPOS=14007465;//kernel.BaseActor:7465
          _this.drawY=_this.y;
          //$LASTPOS=14007483;//kernel.BaseActor:7483
          if (! _this.size) {
            //$LASTPOS=14007494;//kernel.BaseActor:7494
            _this.size=15;
          }
          //$LASTPOS=14007512;//kernel.BaseActor:7512
          if (! _this.align) {
            //$LASTPOS=14007524;//kernel.BaseActor:7524
            _this.align="center";
          }
          //$LASTPOS=14007549;//kernel.BaseActor:7549
          if (! _this.fillStyle) {
            //$LASTPOS=14007565;//kernel.BaseActor:7565
            _this.fillStyle="white";
          }
          //$LASTPOS=14007593;//kernel.BaseActor:7593
          if (_this.font) {
            //$LASTPOS=14007603;//kernel.BaseActor:7603
            ctx.font=_this.size+"px "+_this.font;
          }
          //$LASTPOS=14007638;//kernel.BaseActor:7638
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=14007672;//kernel.BaseActor:7672
          ctx.globalAlpha=_this.alpha/255;
          //$LASTPOS=14007713;//kernel.BaseActor:7713
          _this.height=0;
          //$LASTPOS=14007722;//kernel.BaseActor:7722
          _this.width=0;
          //$LASTPOS=14007740;//kernel.BaseActor:7740
          for (textCount = 0;  textCount<splitsText.length ; textCount++) {
            {
              //$LASTPOS=14007815;//kernel.BaseActor:7815
              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
              //$LASTPOS=14007911;//kernel.BaseActor:7911
              if (_this.width<rect.w) {
                //$LASTPOS=14007928;//kernel.BaseActor:7928
                _this.width=rect.w;
              }
              //$LASTPOS=14007955;//kernel.BaseActor:7955
              _this.height+=rect.h;
              //$LASTPOS=14007984;//kernel.BaseActor:7984
              _this.drawY+=_this.size;
            }
          }
          
        }
      }
      //$LASTPOS=14008020;//kernel.BaseActor:8020
      if (_this._fukidashi) {
        //$LASTPOS=14008047;//kernel.BaseActor:8047
        if (_this._fukidashi.c>0) {
          //$LASTPOS=14008082;//kernel.BaseActor:8082
          _this._fukidashi.c--;
          //$LASTPOS=14008111;//kernel.BaseActor:8111
          ctx.fillStyle="white";
          //$LASTPOS=14008147;//kernel.BaseActor:8147
          ctx.strokeStyle="black";
          //$LASTPOS=14008185;//kernel.BaseActor:8185
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14008392;//kernel.BaseActor:8392
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=14008464;//kernel.BaseActor:8464
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14008392;//kernel.BaseActor:8392
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=14008464;//kernel.BaseActor:8464
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      "use strict";
      var _this=this;
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=14008546;//kernel.BaseActor:8546
      if (! a) {
        //$LASTPOS=14008554;//kernel.BaseActor:8554
        a=0;
      }
      //$LASTPOS=14008564;//kernel.BaseActor:8564
      r = 0;
      //$LASTPOS=14008578;//kernel.BaseActor:8578
      viewX = Tonyu.globals.$Sprites.sx,viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=14008624;//kernel.BaseActor:8624
      if (_this.x<viewX+a) {
        //$LASTPOS=14008653;//kernel.BaseActor:8653
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=14008672;//kernel.BaseActor:8672
      if (_this.y<viewY+a) {
        //$LASTPOS=14008701;//kernel.BaseActor:8701
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=14008720;//kernel.BaseActor:8720
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=14008749;//kernel.BaseActor:8749
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=14008784;//kernel.BaseActor:8784
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=14008813;//kernel.BaseActor:8813
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
      
      //$LASTPOS=14008546;//kernel.BaseActor:8546
      if (! a) {
        //$LASTPOS=14008554;//kernel.BaseActor:8554
        a=0;
      }
      //$LASTPOS=14008564;//kernel.BaseActor:8564
      r = 0;
      //$LASTPOS=14008578;//kernel.BaseActor:8578
      viewX = Tonyu.globals.$Sprites.sx,viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=14008624;//kernel.BaseActor:8624
      if (_this.x<viewX+a) {
        //$LASTPOS=14008653;//kernel.BaseActor:8653
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=14008672;//kernel.BaseActor:8672
      if (_this.y<viewY+a) {
        //$LASTPOS=14008701;//kernel.BaseActor:8701
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=14008720;//kernel.BaseActor:8720
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=14008749;//kernel.BaseActor:8749
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=14008784;//kernel.BaseActor:8784
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=14008813;//kernel.BaseActor:8813
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      _thread.retVal=r;return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14008943;//kernel.BaseActor:8943
      while (true) {
        //$LASTPOS=14008965;//kernel.BaseActor:8965
        while (true) {
          //$LASTPOS=14008991;//kernel.BaseActor:8991
          if (_this.screenOut()>d) {
            //$LASTPOS=14009027;//kernel.BaseActor:9027
            f();
            break;
            
            
          }
          //$LASTPOS=14009084;//kernel.BaseActor:9084
          _this.update();
          
        }
        //$LASTPOS=14009114;//kernel.BaseActor:9114
        while (true) {
          //$LASTPOS=14009140;//kernel.BaseActor:9140
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=14009212;//kernel.BaseActor:9212
          _this.update();
          
        }
        //$LASTPOS=14009242;//kernel.BaseActor:9242
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
            //$LASTPOS=14008943;//kernel.BaseActor:8943
          case 1:
            //$LASTPOS=14008965;//kernel.BaseActor:8965
          case 2:
            //$LASTPOS=14008991;//kernel.BaseActor:8991
            if (!(_this.screenOut()>d)) { __pc=3; break; }
            //$LASTPOS=14009027;//kernel.BaseActor:9027
            f();
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=14009084;//kernel.BaseActor:9084
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=14009114;//kernel.BaseActor:9114
          case 6:
            //$LASTPOS=14009140;//kernel.BaseActor:9140
            if (!(_this.screenOut()<=d)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=14009212;//kernel.BaseActor:9212
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=14009242;//kernel.BaseActor:9242
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
      
      //$LASTPOS=14009282;//kernel.BaseActor:9282
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=14009324;//kernel.BaseActor:9324
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
      
      //$LASTPOS=14009282;//kernel.BaseActor:9282
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=14009324;//kernel.BaseActor:9324
      files = d.rel("files/");
      _thread.retVal=files.rel(path).setPolicy({topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14009433;//kernel.BaseActor:9433
      _this.runAsync((function anonymous_9442(f) {
        
        //$LASTPOS=14009457;//kernel.BaseActor:9457
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
            //$LASTPOS=14009433;//kernel.BaseActor:9433
            _this.fiber$runAsync(_thread, (function anonymous_9442(f) {
              
              //$LASTPOS=14009457;//kernel.BaseActor:9457
              Tonyu.globals.$InputDevice.addOnetimeListener(f);
            }));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    redrawScreen :function _trc_BaseActor_redrawScreen() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14009973;//kernel.BaseActor:9973
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=14010009;//kernel.BaseActor:10009
      Tonyu.globals.$Screen.draw();
    },
    fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14009973;//kernel.BaseActor:9973
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=14010009;//kernel.BaseActor:10009
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
      
      //$LASTPOS=14010718;//kernel.BaseActor:10718
      _this.all().die();
      //$LASTPOS=14010736;//kernel.BaseActor:10736
      new page(arg);
      //$LASTPOS=14010756;//kernel.BaseActor:10756
      _this.die();
    },
    fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14010718;//kernel.BaseActor:10718
      _this.all().die();
      //$LASTPOS=14010736;//kernel.BaseActor:10736
      new page(arg);
      //$LASTPOS=14010756;//kernel.BaseActor:10756
      _this.die();
      
      _thread.retVal=_this;return;
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14010791;//kernel.BaseActor:10791
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14010791;//kernel.BaseActor:10791
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    __setter__useObjectPool :function _trc_BaseActor___setter__useObjectPool(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14010840;//kernel.BaseActor:10840
      if (value) {
        //$LASTPOS=14010862;//kernel.BaseActor:10862
        _this._poolArray=Tonyu.globals.$ObjectPool.poolList(_this.getClassInfo().fullName);
        
      }
    },
    appear :function _trc_BaseActor_appear(o,param) {
      "use strict";
      var _this=this;
      var p;
      var k;
      var _it_158;
      
      //$LASTPOS=14010955;//kernel.BaseActor:10955
      if (typeof  o=="function") {
        //$LASTPOS=14010992;//kernel.BaseActor:10992
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        //$LASTPOS=14011046;//kernel.BaseActor:11046
        if (p) {
          //$LASTPOS=14011065;//kernel.BaseActor:11065
          _it_158=Tonyu.iterator(Object.keys(p),1);
          while(_it_158.next()) {
            k=_it_158[0];
            
            //$LASTPOS=14011110;//kernel.BaseActor:11110
            if (k!="objectPoolAge") {
              //$LASTPOS=14011134;//kernel.BaseActor:11134
              delete p[k];
            }
            
          }
          //$LASTPOS=14011163;//kernel.BaseActor:11163
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
      var _it_158;
      
      //$LASTPOS=14010955;//kernel.BaseActor:10955
      if (typeof  o=="function") {
        //$LASTPOS=14010992;//kernel.BaseActor:10992
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        //$LASTPOS=14011046;//kernel.BaseActor:11046
        if (p) {
          //$LASTPOS=14011065;//kernel.BaseActor:11065
          _it_158=Tonyu.iterator(Object.keys(p),1);
          while(_it_158.next()) {
            k=_it_158[0];
            
            //$LASTPOS=14011110;//kernel.BaseActor:11110
            if (k!="objectPoolAge") {
              //$LASTPOS=14011134;//kernel.BaseActor:11134
              delete p[k];
            }
            
          }
          //$LASTPOS=14011163;//kernel.BaseActor:11163
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
      
      //$LASTPOS=14011314;//kernel.BaseActor:11314
      if (null) {
        //$LASTPOS=14011337;//kernel.BaseActor:11337
        null.suspend();
        //$LASTPOS=14011365;//kernel.BaseActor:11365
        if (t) {
          //$LASTPOS=14011387;//kernel.BaseActor:11387
          null.waitCount=t;
          //$LASTPOS=14011421;//kernel.BaseActor:11421
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=14011437;//kernel.BaseActor:11437
            Tonyu.globals.$Scheduler.addToNext(null);
          }
          
        }
        
      } else {
        //$LASTPOS=14011491;//kernel.BaseActor:11491
        if (_this._th) {
          //$LASTPOS=14011511;//kernel.BaseActor:11511
          if (t) {
            //$LASTPOS=14011533;//kernel.BaseActor:11533
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=14011581;//kernel.BaseActor:11581
            if (_this._th.scheduled) {
              //$LASTPOS=14011600;//kernel.BaseActor:11600
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
      
      //$LASTPOS=14011314;//kernel.BaseActor:11314
      if (_thread) {
        //$LASTPOS=14011337;//kernel.BaseActor:11337
        _thread.suspend();
        //$LASTPOS=14011365;//kernel.BaseActor:11365
        if (t) {
          //$LASTPOS=14011387;//kernel.BaseActor:11387
          _thread.waitCount=t;
          //$LASTPOS=14011421;//kernel.BaseActor:11421
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=14011437;//kernel.BaseActor:11437
            Tonyu.globals.$Scheduler.addToNext(_thread);
          }
          
        }
        
      } else {
        //$LASTPOS=14011491;//kernel.BaseActor:11491
        if (_this._th) {
          //$LASTPOS=14011511;//kernel.BaseActor:11511
          if (t) {
            //$LASTPOS=14011533;//kernel.BaseActor:11533
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=14011581;//kernel.BaseActor:11581
            if (_this._th.scheduled) {
              //$LASTPOS=14011600;//kernel.BaseActor:11600
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
      
      //$LASTPOS=14011677;//kernel.BaseActor:11677
      if (_this._th) {
        //$LASTPOS=14011697;//kernel.BaseActor:11697
        if (_this._th.scheduled) {
          //$LASTPOS=14011732;//kernel.BaseActor:11732
          _this._th.waitCount=0;
          
        } else {
          //$LASTPOS=14011780;//kernel.BaseActor:11780
          if (Tonyu.globals.$Scheduler) {
            //$LASTPOS=14011796;//kernel.BaseActor:11796
            Tonyu.globals.$Scheduler.addToCur(_this._th);
          }
          
        }
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false},"__setter__useObjectPool":{"nowait":true},"appear":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":true}}}
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
      
      //$LASTPOS=15000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=15000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=15000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=15000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=15000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=15000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      return {remove: (function anonymous_337() {
        
        //$LASTPOS=15000352;//kernel.EventHandler:352
        _this.removeListener(f);
      })};
    },
    fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=15000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=15000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=15000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      
      _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            _thread.exit({remove: (function anonymous_337() {
              
              //$LASTPOS=15000352;//kernel.EventHandler:352
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
      
      //$LASTPOS=15000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=15000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
    },
    fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=15000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=15000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
      
      _thread.retVal=_this;return;
    },
    fire :function _trc_EventHandler_fire(args) {
      "use strict";
      var _this=this;
      var t;
      var h;
      var _it_163;
      
      //$LASTPOS=15000499;//kernel.EventHandler:499
      if (_this.released) {
        return _this;
      }
      
      //$LASTPOS=15000538;//kernel.EventHandler:538
      _it_163=Tonyu.iterator(_this.listeners,1);
      while(_it_163.next()) {
        h=_it_163[0];
        
        //$LASTPOS=15000782;//kernel.EventHandler:782
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
      
      //$LASTPOS=15000499;//kernel.EventHandler:499
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000538;//kernel.EventHandler:538
            _it_163=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_163.next())) { __pc=3; break; }
            h=_it_163[0];
            
            //$LASTPOS=15000782;//kernel.EventHandler:782
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
      
      //$LASTPOS=15000838;//kernel.EventHandler:838
      _this.released=true;
    },
    fiber$release :function _trc_EventHandler_f_release(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000838;//kernel.EventHandler:838
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
      
      //$LASTPOS=16000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      return {remove: (function anonymous_135() {
        
        //$LASTPOS=16000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_ScreenOutHandler_f_addListener(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=16000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      _thread.retVal={remove: (function anonymous_135() {
        
        //$LASTPOS=16000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000210;//kernel.ScreenOutHandler:210
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=16000228;//kernel.ScreenOutHandler:228
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
      
      //$LASTPOS=17000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      return {remove: (function anonymous_137() {
        
        //$LASTPOS=17000153;//kernel.WithinHandler:153
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_WithinHandler_f_addListener(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=17000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      _thread.retVal={remove: (function anonymous_137() {
        
        //$LASTPOS=17000153;//kernel.WithinHandler:153
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000213;//kernel.WithinHandler:213
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=17000232;//kernel.WithinHandler:232
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"new":{"nowait":false}}}
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
      
      //$LASTPOS=18000054;//kernel.OneframeSprite:54
      _this.extend(params);
      //$LASTPOS=18000075;//kernel.OneframeSprite:75
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=18000127;//kernel.OneframeSprite:127
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=18000165;//kernel.OneframeSprite:165
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
      
      //$LASTPOS=19000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=19000061;//kernel.NoviceActor:61
        n=1;
      }
      //$LASTPOS=19000071;//kernel.NoviceActor:71
      for (n;  n>0 ; n--) {
        //$LASTPOS=19000086;//kernel.NoviceActor:86
        _this.update();
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=19000061;//kernel.NoviceActor:61
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19000071;//kernel.NoviceActor:71
            //$LASTPOS=19000075;//kernel.NoviceActor:75
            n;;
          case 1:
            if (!(n>0)) { __pc=4; break; }
            //$LASTPOS=19000086;//kernel.NoviceActor:86
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
      
      //$LASTPOS=19000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=19000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=19000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=19000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=19000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=19000282;//kernel.NoviceActor:282
        size=15;
      }
      //$LASTPOS=19000296;//kernel.NoviceActor:296
      _this.initSprite();
      //$LASTPOS=19000315;//kernel.NoviceActor:315
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=19000282;//kernel.NoviceActor:282
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19000296;//kernel.NoviceActor:296
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=19000315;//kernel.NoviceActor:315
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000390;//kernel.NoviceActor:390
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
            //$LASTPOS=19000390;//kernel.NoviceActor:390
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
      
      //$LASTPOS=19000425;//kernel.NoviceActor:425
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000465;//kernel.NoviceActor:465
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
      
      //$LASTPOS=19000564;//kernel.NoviceActor:564
      _this.initSprite();
      //$LASTPOS=19000583;//kernel.NoviceActor:583
      _this._sprite.x=x;
      //$LASTPOS=19000601;//kernel.NoviceActor:601
      _this._sprite.y=y;
      //$LASTPOS=19000619;//kernel.NoviceActor:619
      if (p!=null) {
        //$LASTPOS=19000632;//kernel.NoviceActor:632
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
            //$LASTPOS=19000564;//kernel.NoviceActor:564
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=19000583;//kernel.NoviceActor:583
            _this._sprite.x=x;
            //$LASTPOS=19000601;//kernel.NoviceActor:601
            _this._sprite.y=y;
            //$LASTPOS=19000619;//kernel.NoviceActor:619
            if (p!=null) {
              //$LASTPOS=19000632;//kernel.NoviceActor:632
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
      
      //$LASTPOS=19000684;//kernel.NoviceActor:684
      _this.initSprite();
      //$LASTPOS=19000703;//kernel.NoviceActor:703
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
            //$LASTPOS=19000684;//kernel.NoviceActor:684
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=19000703;//kernel.NoviceActor:703
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
      
      //$LASTPOS=20000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=20000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=20000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2; break; }
            //$LASTPOS=20000134;//kernel.MML:134
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
      
      //$LASTPOS=20000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=20000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=20000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=20000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=20000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=20000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=20000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=20000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=20000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=20000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=20000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=20000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=20000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=20000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=20000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=20000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=20000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=20000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=20000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=20000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=20000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=20000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=20000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=20000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=20000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=20000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=20000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=20000616;//kernel.MML:616
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
      
      //$LASTPOS=20000755;//kernel.MML:755
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
      
      //$LASTPOS=20000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=20000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=20000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=20000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=20000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=20000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=20000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=20000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=20001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=20000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=20000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=20000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=20000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=20000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=20000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=20000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=20001056;//kernel.MML:1056
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
      
      //$LASTPOS=21000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=21000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=21000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=21000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=21000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=21000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=21000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=21000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=21000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_170;
      
      //$LASTPOS=21000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=21000343;//kernel.PlayMod:343
        _it_170=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_170.next()) {
          k=_it_170[0];
          v=_it_170[1];
          
          //$LASTPOS=21000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=21000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=21000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=21000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=21000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      "use strict";
      var _this=this;
      var mmls;
      var i;
      
      //$LASTPOS=21000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=21000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=21000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=21000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=21000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=21000647;//kernel.PlayMod:647
      for (i = 0;  i<arguments.length ; i++) {
        {
          //$LASTPOS=21000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=21000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=21000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=21000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=21000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=21000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=21000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=21000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=21000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=21000647;//kernel.PlayMod:647
      for (i = 0;  i<_arguments.length ; i++) {
        {
          //$LASTPOS=21000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
      }
      //$LASTPOS=21000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=21000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
            //$LASTPOS=21000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=21000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=21000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      //$LASTPOS=21000897;//kernel.PlayMod:897
      mmls = [];
      //$LASTPOS=21000915;//kernel.PlayMod:915
      for (i = 0;  i<arguments.length ; i++) {
        {
          //$LASTPOS=21000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=21001002;//kernel.PlayMod:1002
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
            if (!(typeof  T!=="undefined")) { __pc=3; break; }
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
            
          case 3:
            
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
      
      //$LASTPOS=23000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=23000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=23000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=23000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=23000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=23000156;//kernel.T1Line:156
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Line_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=23000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=23000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=23000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=23000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=23000156;//kernel.T1Line:156
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
      
      //$LASTPOS=24000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[Math.floor(_this.p||0)];
      //$LASTPOS=24000110;//kernel.T1Sprite:110
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=24000134;//kernel.T1Sprite:134
      ctx.save();
      //$LASTPOS=24000151;//kernel.T1Sprite:151
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=24000176;//kernel.T1Sprite:176
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=24000217;//kernel.T1Sprite:217
      sgn = (_this.f?- 1:1);
      //$LASTPOS=24000240;//kernel.T1Sprite:240
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=24000288;//kernel.T1Sprite:288
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=24000349;//kernel.T1Sprite:349
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=24000401;//kernel.T1Sprite:401
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=24000438;//kernel.T1Sprite:438
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=24000578;//kernel.T1Sprite:578
      ctx.restore();
      //$LASTPOS=24000598;//kernel.T1Sprite:598
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Sprite_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sgn;
      
      //$LASTPOS=24000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[Math.floor(_this.p||0)];
      //$LASTPOS=24000110;//kernel.T1Sprite:110
      if (! _this.pImg) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=24000134;//kernel.T1Sprite:134
      ctx.save();
      //$LASTPOS=24000151;//kernel.T1Sprite:151
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=24000176;//kernel.T1Sprite:176
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=24000217;//kernel.T1Sprite:217
      sgn = (_this.f?- 1:1);
      //$LASTPOS=24000240;//kernel.T1Sprite:240
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=24000288;//kernel.T1Sprite:288
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=24000349;//kernel.T1Sprite:349
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=24000401;//kernel.T1Sprite:401
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=24000438;//kernel.T1Sprite:438
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=24000578;//kernel.T1Sprite:578
      ctx.restore();
      //$LASTPOS=24000598;//kernel.T1Sprite:598
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
      
      //$LASTPOS=25000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=25000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      //$LASTPOS=25000145;//kernel.T1Text:145
      drawY = _this.y;
      //$LASTPOS=25000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=25000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=25000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=25000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=25000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=25000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=25000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=25000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=25000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=25000343;//kernel.T1Text:343
      for (textCount = 0;  textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=25000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          //$LASTPOS=25000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=25000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=25000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=25000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=25000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=25000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=25000646;//kernel.T1Text:646
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
      
      //$LASTPOS=25000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=25000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      //$LASTPOS=25000145;//kernel.T1Text:145
      drawY = _this.y;
      //$LASTPOS=25000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=25000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=25000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=25000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=25000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=25000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=25000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=25000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=25000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=25000343;//kernel.T1Text:343
      for (textCount = 0;  textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=25000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          //$LASTPOS=25000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=25000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=25000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=25000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=25000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=25000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=25000646;//kernel.T1Text:646
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}}}
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
      
      //$LASTPOS=26000064;//kernel.ParallelMod:64
      args = [];
      //$LASTPOS=26000083;//kernel.ParallelMod:83
      for (i = 1;  i<arguments.length ; i++) {
        {
          //$LASTPOS=26000134;//kernel.ParallelMod:134
          args.push(arguments[i]);
        }
      }
      //$LASTPOS=26000173;//kernel.ParallelMod:173
      name = arguments[0];
      
      //$LASTPOS=26000216;//kernel.ParallelMod:216
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
      
      //$LASTPOS=27000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=27000059;//kernel.Scheduler:59
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=27000059;//kernel.Scheduler:59
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
      
      //$LASTPOS=27000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=27000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=27000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=27000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      //$LASTPOS=27000316;//kernel.Scheduler:316
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=27000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=27000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=27000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=27000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000316;//kernel.Scheduler:316
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
      
      //$LASTPOS=27000371;//kernel.Scheduler:371
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=27000402;//kernel.Scheduler:402
      _this.cur.push(th);
      //$LASTPOS=27000421;//kernel.Scheduler:421
      th.scheduled=_this;
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000371;//kernel.Scheduler:371
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=27000402;//kernel.Scheduler:402
      _this.cur.push(th);
      //$LASTPOS=27000421;//kernel.Scheduler:421
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=27000466;//kernel.Scheduler:466
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=27000497;//kernel.Scheduler:497
      _this.next.push(th);
      //$LASTPOS=27000517;//kernel.Scheduler:517
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000466;//kernel.Scheduler:466
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=27000497;//kernel.Scheduler:497
      _this.next.push(th);
      //$LASTPOS=27000517;//kernel.Scheduler:517
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    unschedule :function _trc_Scheduler_unschedule(th) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=27000563;//kernel.Scheduler:563
      i = _this.cur.indexOf(th);
      //$LASTPOS=27000591;//kernel.Scheduler:591
      if (i>=0) {
        //$LASTPOS=27000612;//kernel.Scheduler:612
        _this.cur.splice(i,1);
        //$LASTPOS=27000638;//kernel.Scheduler:638
        delete th.scheduled;
        
      } else {
        //$LASTPOS=27000679;//kernel.Scheduler:679
        i=_this.next.indexOf(th);
        //$LASTPOS=27000705;//kernel.Scheduler:705
        if (i>=0) {
          //$LASTPOS=27000726;//kernel.Scheduler:726
          _this.next.splice(i,1);
          //$LASTPOS=27000756;//kernel.Scheduler:756
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
      
      //$LASTPOS=27000563;//kernel.Scheduler:563
      i = _this.cur.indexOf(th);
      //$LASTPOS=27000591;//kernel.Scheduler:591
      if (i>=0) {
        //$LASTPOS=27000612;//kernel.Scheduler:612
        _this.cur.splice(i,1);
        //$LASTPOS=27000638;//kernel.Scheduler:638
        delete th.scheduled;
        
      } else {
        //$LASTPOS=27000679;//kernel.Scheduler:679
        i=_this.next.indexOf(th);
        //$LASTPOS=27000705;//kernel.Scheduler:705
        if (i>=0) {
          //$LASTPOS=27000726;//kernel.Scheduler:726
          _this.next.splice(i,1);
          //$LASTPOS=27000756;//kernel.Scheduler:756
          delete th.scheduled;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      "use strict";
      var _this=this;
      var t;
      var _it_191;
      
      //$LASTPOS=27000815;//kernel.Scheduler:815
      _it_191=Tonyu.iterator(_this.cur,1);
      while(_it_191.next()) {
        t=_it_191[0];
        
        //$LASTPOS=27000842;//kernel.Scheduler:842
        delete t.scheduled;
        //$LASTPOS=27000868;//kernel.Scheduler:868
        if (t.waitCount) {
          //$LASTPOS=27000897;//kernel.Scheduler:897
          t.waitCount--;
          //$LASTPOS=27000925;//kernel.Scheduler:925
          _this.addToNext(t);
          
        } else {
          //$LASTPOS=27000967;//kernel.Scheduler:967
          t.steps();
          //$LASTPOS=27000991;//kernel.Scheduler:991
          if (t.preempted) {
            //$LASTPOS=27001076;//kernel.Scheduler:1076
            _this.addToNext(t);
            
          }
          
        }
        
      }
      //$LASTPOS=27001128;//kernel.Scheduler:1128
      _this.cur=_this.next;
      //$LASTPOS=27001143;//kernel.Scheduler:1143
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_191;
      
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000815;//kernel.Scheduler:815
            _it_191=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_191.next())) { __pc=7; break; }
            t=_it_191[0];
            
            //$LASTPOS=27000842;//kernel.Scheduler:842
            delete t.scheduled;
            //$LASTPOS=27000868;//kernel.Scheduler:868
            if (!(t.waitCount)) { __pc=3; break; }
            //$LASTPOS=27000897;//kernel.Scheduler:897
            t.waitCount--;
            //$LASTPOS=27000925;//kernel.Scheduler:925
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
            __pc=6;break;
          case 3:
            //$LASTPOS=27000967;//kernel.Scheduler:967
            t.steps();
            //$LASTPOS=27000991;//kernel.Scheduler:991
            if (!(t.preempted)) { __pc=5; break; }
            //$LASTPOS=27001076;//kernel.Scheduler:1076
            _this.fiber$addToNext(_thread, t);
            __pc=4;return;
          case 4:
            
          case 5:
            
          case 6:
            
            __pc=1;break;
          case 7:
            
            //$LASTPOS=27001128;//kernel.Scheduler:1128
            _this.cur=_this.next;
            //$LASTPOS=27001143;//kernel.Scheduler:1143
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
      
      //$LASTPOS=28000105;//kernel.Actor:105
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=28000147;//kernel.Actor:147
      _this.initSprite();
    },
    initSprite :function _trc_Actor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=28000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=28000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=28000308;//kernel.Actor:308
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=28000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=28000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=28000308;//kernel.Actor:308
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
      
      //$LASTPOS=29000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      return {remove: (function anonymous_133() {
        
        //$LASTPOS=29000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_CrashToHandler_f_addListener(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=29000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      _thread.retVal={remove: (function anonymous_133() {
        
        //$LASTPOS=29000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000209;//kernel.CrashToHandler:209
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=29000228;//kernel.CrashToHandler:228
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
      
      //$LASTPOS=30000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=30000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=30000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=30000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=30000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=30000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=30000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=30000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=30000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=30000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=30000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=30000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=30000655;//kernel.GameScreen:655
      b = _this.bounds;
      //$LASTPOS=30000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=30000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=30000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=30000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=30000878;//kernel.GameScreen:878
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
      
      //$LASTPOS=30000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=30000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=30001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=30001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=30001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=30001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=30001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=30001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=30001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=30001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=30001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=30001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30001265;//kernel.GameScreen:1265
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
      
      //$LASTPOS=31000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=31000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=31000082;//kernel.Map:82
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=31000101;//kernel.Map:101
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=31000173;//kernel.Map:173
      _this.mapObj=true;
      //$LASTPOS=31000191;//kernel.Map:191
      _this.mapTable=[];
      //$LASTPOS=31000211;//kernel.Map:211
      _this.mapOnTable=[];
      //$LASTPOS=31000233;//kernel.Map:233
      for (j = 0;  j<_this.row ; j++) {
        {
          //$LASTPOS=31000266;//kernel.Map:266
          _this.rows=[];
          //$LASTPOS=31000286;//kernel.Map:286
          for (i = 0;  i<_this.col ; i++) {
            {
              //$LASTPOS=31000323;//kernel.Map:323
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=31000358;//kernel.Map:358
          _this.mapTable.push(_this.rows);
        }
      }
      //$LASTPOS=31000391;//kernel.Map:391
      for (j = 0;  j<_this.row ; j++) {
        {
          //$LASTPOS=31000424;//kernel.Map:424
          _this.rows=[];
          //$LASTPOS=31000444;//kernel.Map:444
          for (i = 0;  i<_this.col ; i++) {
            {
              //$LASTPOS=31000481;//kernel.Map:481
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=31000516;//kernel.Map:516
          _this.mapOnTable.push(_this.rows);
        }
      }
      //$LASTPOS=31000616;//kernel.Map:616
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=31000648;//kernel.Map:648
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=31000674;//kernel.Map:674
      for (i = 0;  i<_this.row ; i++) {
        {
          //$LASTPOS=31000707;//kernel.Map:707
          for (j = 0;  j<_this.col ; j++) {
            {
              //$LASTPOS=31000744;//kernel.Map:744
              _this.set(j,i,_this.mapData[i][j]);
            }
          }
        }
      }
      //$LASTPOS=31000791;//kernel.Map:791
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=31000819;//kernel.Map:819
      for (i = 0;  i<_this.row ; i++) {
        {
          //$LASTPOS=31000852;//kernel.Map:852
          for (j = 0;  j<_this.col ; j++) {
            {
              //$LASTPOS=31000889;//kernel.Map:889
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
      
      //$LASTPOS=31000648;//kernel.Map:648
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31000674;//kernel.Map:674
            //$LASTPOS=31000678;//kernel.Map:678
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=7; break; }
            //$LASTPOS=31000707;//kernel.Map:707
            //$LASTPOS=31000711;//kernel.Map:711
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=5; break; }
            //$LASTPOS=31000744;//kernel.Map:744
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
            
            //$LASTPOS=31000791;//kernel.Map:791
            if (!(! _this.mapOnData)) { __pc=8; break; }
            _thread.exit(_this);return;
          case 8:
            
            //$LASTPOS=31000819;//kernel.Map:819
            //$LASTPOS=31000823;//kernel.Map:823
            i = 0;;
          case 9:
            if (!(i<_this.row)) { __pc=15; break; }
            //$LASTPOS=31000852;//kernel.Map:852
            //$LASTPOS=31000856;//kernel.Map:856
            j = 0;;
          case 10:
            if (!(j<_this.col)) { __pc=13; break; }
            //$LASTPOS=31000889;//kernel.Map:889
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
      
      //$LASTPOS=31000958;//kernel.Map:958
      if (! _this.mapTable) {
        return _this;
      }
      //$LASTPOS=31000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=31001057;//kernel.Map:1057
      for (i = 0;  i<_this.row ; i++) {
        {
          //$LASTPOS=31001090;//kernel.Map:1090
          for (j = 0;  j<_this.col ; j++) {
            {
              //$LASTPOS=31001127;//kernel.Map:1127
              _this.set(j,i,_this.mapTable[i][j]);
            }
          }
        }
      }
      //$LASTPOS=31001175;//kernel.Map:1175
      if (! _this.mapOnTable) {
        return _this;
      }
      //$LASTPOS=31001204;//kernel.Map:1204
      for (i = 0;  i<_this.row ; i++) {
        {
          //$LASTPOS=31001237;//kernel.Map:1237
          for (j = 0;  j<_this.col ; j++) {
            {
              //$LASTPOS=31001274;//kernel.Map:1274
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
      
      //$LASTPOS=31000958;//kernel.Map:958
      if (! _this.mapTable) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=31000985;//kernel.Map:985
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_redrawMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31001057;//kernel.Map:1057
            //$LASTPOS=31001061;//kernel.Map:1061
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=7; break; }
            //$LASTPOS=31001090;//kernel.Map:1090
            //$LASTPOS=31001094;//kernel.Map:1094
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=5; break; }
            //$LASTPOS=31001127;//kernel.Map:1127
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
            
            //$LASTPOS=31001175;//kernel.Map:1175
            if (!(! _this.mapOnTable)) { __pc=8; break; }
            _thread.exit(_this);return;
          case 8:
            
            //$LASTPOS=31001204;//kernel.Map:1204
            //$LASTPOS=31001208;//kernel.Map:1208
            i = 0;;
          case 9:
            if (!(i<_this.row)) { __pc=15; break; }
            //$LASTPOS=31001237;//kernel.Map:1237
            //$LASTPOS=31001241;//kernel.Map:1241
            j = 0;;
          case 10:
            if (!(j<_this.col)) { __pc=13; break; }
            //$LASTPOS=31001274;//kernel.Map:1274
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
      
      //$LASTPOS=31001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=31001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=31001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=31001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=31001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=31001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=31001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=31001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=31001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=31001612;//kernel.Map:1612
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=31001684;//kernel.Map:1684
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31001349;//kernel.Map:1349
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=31001401;//kernel.Map:1401
      if (! _this.baseData) {
        //$LASTPOS=31001415;//kernel.Map:1415
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=31001451;//kernel.Map:1451
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=31001478;//kernel.Map:1478
      _this.mapData=_this.mapTable;
      //$LASTPOS=31001501;//kernel.Map:1501
      _this.row=_this.mapTable.length;
      //$LASTPOS=31001527;//kernel.Map:1527
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=31001556;//kernel.Map:1556
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=31001585;//kernel.Map:1585
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=31001612;//kernel.Map:1612
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31001684;//kernel.Map:1684
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
      
      //$LASTPOS=31001727;//kernel.Map:1727
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=31001795;//kernel.Map:1795
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=31001866;//kernel.Map:1866
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=31001900;//kernel.Map:1900
      p=Math.floor(p);
      //$LASTPOS=31001922;//kernel.Map:1922
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=31001960;//kernel.Map:1960
      if (! _this.pImg) {
        //$LASTPOS=31001982;//kernel.Map:1982
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=31002083;//kernel.Map:2083
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=31002160;//kernel.Map:2160
      _this.ctx.save();
      //$LASTPOS=31002177;//kernel.Map:2177
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=31002321;//kernel.Map:2321
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31001727;//kernel.Map:1727
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=31001795;//kernel.Map:1795
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=31001866;//kernel.Map:1866
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=31001900;//kernel.Map:1900
      p=Math.floor(p);
      //$LASTPOS=31001922;//kernel.Map:1922
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=31001960;//kernel.Map:1960
      if (! _this.pImg) {
        //$LASTPOS=31001982;//kernel.Map:1982
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=31002083;//kernel.Map:2083
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=31002160;//kernel.Map:2160
      _this.ctx.save();
      //$LASTPOS=31002177;//kernel.Map:2177
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=31002321;//kernel.Map:2321
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31002370;//kernel.Map:2370
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=31002438;//kernel.Map:2438
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=31002488;//kernel.Map:2488
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=31002523;//kernel.Map:2523
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=31002557;//kernel.Map:2557
      p=Math.floor(p);
      //$LASTPOS=31002579;//kernel.Map:2579
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=31002617;//kernel.Map:2617
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=31002641;//kernel.Map:2641
      _this.ctx.save();
      //$LASTPOS=31002658;//kernel.Map:2658
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=31002802;//kernel.Map:2802
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31002370;//kernel.Map:2370
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31002438;//kernel.Map:2438
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=31002488;//kernel.Map:2488
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=31002523;//kernel.Map:2523
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=31002557;//kernel.Map:2557
            p=Math.floor(p);
            //$LASTPOS=31002579;//kernel.Map:2579
            _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
            //$LASTPOS=31002617;//kernel.Map:2617
            if (!(! _this.pImg)) { __pc=2; break; }
            _thread.exit(_this);return;
          case 2:
            
            //$LASTPOS=31002641;//kernel.Map:2641
            _this.ctx.save();
            //$LASTPOS=31002658;//kernel.Map:2658
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=31002802;//kernel.Map:2802
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31002849;//kernel.Map:2849
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
            //$LASTPOS=31002849;//kernel.Map:2849
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
      
      //$LASTPOS=31002944;//kernel.Map:2944
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
            //$LASTPOS=31002944;//kernel.Map:2944
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
      
      //$LASTPOS=31003037;//kernel.Map:3037
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
      
      //$LASTPOS=31003037;//kernel.Map:3037
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
      
      //$LASTPOS=31003269;//kernel.Map:3269
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
      
      //$LASTPOS=31003269;//kernel.Map:3269
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
      
      //$LASTPOS=31003512;//kernel.Map:3512
      _this.sx=- scrollX;
      //$LASTPOS=31003530;//kernel.Map:3530
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31003512;//kernel.Map:3512
      _this.sx=- scrollX;
      //$LASTPOS=31003530;//kernel.Map:3530
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31003565;//kernel.Map:3565
      _this.pImg=_this.buf[0];
      //$LASTPOS=31003583;//kernel.Map:3583
      ctx.save();
      //$LASTPOS=31003600;//kernel.Map:3600
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=31003712;//kernel.Map:3712
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
      
      //$LASTPOS=32000072;//kernel.Panel:72
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=32000089;//kernel.Panel:89
      _this.width=_this.width;
      //$LASTPOS=32000112;//kernel.Panel:112
      _this.height=_this.height;
      //$LASTPOS=32000137;//kernel.Panel:137
      if (_this.align==null) {
        //$LASTPOS=32000153;//kernel.Panel:153
        _this.align="center";
      }
      //$LASTPOS=32000174;//kernel.Panel:174
      if (_this.alpha==null) {
        //$LASTPOS=32000190;//kernel.Panel:190
        _this.alpha=255;
      }
      //$LASTPOS=32000206;//kernel.Panel:206
      if (_this._drawn==null) {
        //$LASTPOS=32000223;//kernel.Panel:223
        _this._drawn=false;
      }
      //$LASTPOS=32000242;//kernel.Panel:242
      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=32000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=32000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=32000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=32000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000432;//kernel.Panel:432
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
            //$LASTPOS=32000432;//kernel.Panel:432
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
      
      //$LASTPOS=32000480;//kernel.Panel:480
      _this._drawn=true;
      return _this.buf[0].getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000480;//kernel.Panel:480
      _this._drawn=true;
      _thread.retVal=_this.buf[0].getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000561;//kernel.Panel:561
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000561;//kernel.Panel:561
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000629;//kernel.Panel:629
      _this.ctx=_this.getContext();
      //$LASTPOS=32000652;//kernel.Panel:652
      _this.ctx.save();
      //$LASTPOS=32000719;//kernel.Panel:719
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=32000749;//kernel.Panel:749
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=32000794;//kernel.Panel:794
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
            //$LASTPOS=32000629;//kernel.Panel:629
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=32000652;//kernel.Panel:652
            _this.ctx.save();
            //$LASTPOS=32000719;//kernel.Panel:719
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=32000749;//kernel.Panel:749
            _this.ctx.fillRect(x,y,rectWidth,rectHeight);
            //$LASTPOS=32000794;//kernel.Panel:794
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
      
      //$LASTPOS=32000850;//kernel.Panel:850
      _this.ctx=_this.getContext();
      //$LASTPOS=32000873;//kernel.Panel:873
      _this.ctx.save();
      //$LASTPOS=32000890;//kernel.Panel:890
      text=text+"";
      //$LASTPOS=32000909;//kernel.Panel:909
      splits = text.split("\n");
      //$LASTPOS=32000995;//kernel.Panel:995
      _this.ctx.textAlign=align;
      //$LASTPOS=32001023;//kernel.Panel:1023
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=32001053;//kernel.Panel:1053
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=32001092;//kernel.Panel:1092
      for (colCount = 0;  colCount<splits.length ; colCount++) {
        {
          //$LASTPOS=32001156;//kernel.Panel:1156
          _this.ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=32001201;//kernel.Panel:1201
          y+=size;
        }
      }
      //$LASTPOS=32001222;//kernel.Panel:1222
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
            //$LASTPOS=32000850;//kernel.Panel:850
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=32000873;//kernel.Panel:873
            _this.ctx.save();
            //$LASTPOS=32000890;//kernel.Panel:890
            text=text+"";
            //$LASTPOS=32000909;//kernel.Panel:909
            splits = text.split("\n");
            //$LASTPOS=32000995;//kernel.Panel:995
            _this.ctx.textAlign=align;
            //$LASTPOS=32001023;//kernel.Panel:1023
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=32001053;//kernel.Panel:1053
            _this.ctx.font=size+"px 'Courier New'";
            //$LASTPOS=32001092;//kernel.Panel:1092
            for (colCount = 0;  colCount<splits.length ; colCount++) {
              {
                //$LASTPOS=32001156;//kernel.Panel:1156
                _this.ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=32001201;//kernel.Panel:1201
                y+=size;
              }
            }
            //$LASTPOS=32001222;//kernel.Panel:1222
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001287;//kernel.Panel:1287
      _this.ctx=_this.getContext();
      //$LASTPOS=32001310;//kernel.Panel:1310
      _this.ctx.save();
      //$LASTPOS=32001327;//kernel.Panel:1327
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=32001376;//kernel.Panel:1376
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
            //$LASTPOS=32001287;//kernel.Panel:1287
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=32001310;//kernel.Panel:1310
            _this.ctx.save();
            //$LASTPOS=32001327;//kernel.Panel:1327
            _this.ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=32001376;//kernel.Panel:1376
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32001422;//kernel.Panel:1422
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=32001521;//kernel.Panel:1521
        _this.ctx=_this.getContext();
        //$LASTPOS=32001548;//kernel.Panel:1548
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=32001600;//kernel.Panel:1600
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=32001740;//kernel.Panel:1740
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
            //$LASTPOS=32001422;//kernel.Panel:1422
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
            //$LASTPOS=32001521;//kernel.Panel:1521
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=32001548;//kernel.Panel:1548
            _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=32001600;//kernel.Panel:1600
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=32001740;//kernel.Panel:1740
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
      
      //$LASTPOS=32001827;//kernel.Panel:1827
      _this.ctx=_this.getContext();
      //$LASTPOS=32001850;//kernel.Panel:1850
      _this.ctx.save();
      //$LASTPOS=32001867;//kernel.Panel:1867
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=32001928;//kernel.Panel:1928
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=32001962;//kernel.Panel:1962
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=32002014;//kernel.Panel:2014
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
            //$LASTPOS=32001827;//kernel.Panel:1827
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=32001850;//kernel.Panel:1850
            _this.ctx.save();
            //$LASTPOS=32001867;//kernel.Panel:1867
            _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=32001928;//kernel.Panel:1928
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=32001962;//kernel.Panel:1962
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=32002014;//kernel.Panel:2014
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32002050;//kernel.Panel:2050
      if (_this._drawn) {
        //$LASTPOS=32002071;//kernel.Panel:2071
        _this.pImg=_this.buf[0];
        //$LASTPOS=32002093;//kernel.Panel:2093
        ctx.save();
        //$LASTPOS=32002114;//kernel.Panel:2114
        if (_this.align=="left") {
          //$LASTPOS=32002146;//kernel.Panel:2146
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=32002198;//kernel.Panel:2198
          if (_this.align=="center") {
            //$LASTPOS=32002232;//kernel.Panel:2232
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=32002267;//kernel.Panel:2267
            if (_this.align=="right") {
              //$LASTPOS=32002300;//kernel.Panel:2300
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=32002357;//kernel.Panel:2357
        if (_this.rotation!=0) {
          //$LASTPOS=32002392;//kernel.Panel:2392
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=32002460;//kernel.Panel:2460
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=32002517;//kernel.Panel:2517
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=32002558;//kernel.Panel:2558
        ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=32002662;//kernel.Panel:2662
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
      
      //$LASTPOS=33000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=33000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=33000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=33000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=33000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=33000257;//kernel.ScaledCanvas:257
      _this.color="rgb(20,80,180)";
      //$LASTPOS=33000291;//kernel.ScaledCanvas:291
      _this.sx=0;
      //$LASTPOS=33000302;//kernel.ScaledCanvas:302
      _this.sy=0;
      //$LASTPOS=33000313;//kernel.ScaledCanvas:313
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=33000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=33000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=33000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=33000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=33000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=33000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=33000632;//kernel.ScaledCanvas:632
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=33000666;//kernel.ScaledCanvas:666
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=33000704;//kernel.ScaledCanvas:704
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=33000732;//kernel.ScaledCanvas:732
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=33000793;//kernel.ScaledCanvas:793
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=33000834;//kernel.ScaledCanvas:834
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=33000876;//kernel.ScaledCanvas:876
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=33000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=33000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=33000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=33000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=33000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=33000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=33000632;//kernel.ScaledCanvas:632
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=33000666;//kernel.ScaledCanvas:666
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=33000704;//kernel.ScaledCanvas:704
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=33000732;//kernel.ScaledCanvas:732
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=33000793;//kernel.ScaledCanvas:793
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=33000834;//kernel.ScaledCanvas:834
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=33000876;//kernel.ScaledCanvas:876
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=33000998;//kernel.ScaledCanvas:998
      larger = 200;
      //$LASTPOS=33001019;//kernel.ScaledCanvas:1019
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
      
      //$LASTPOS=33000998;//kernel.ScaledCanvas:998
      larger = 200;
      //$LASTPOS=33001019;//kernel.ScaledCanvas:1019
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
      
      //$LASTPOS=33001154;//kernel.ScaledCanvas:1154
      _this.cw=_this.canvas.width();
      //$LASTPOS=33001178;//kernel.ScaledCanvas:1178
      _this.ch=_this.canvas.height();
      //$LASTPOS=33001203;//kernel.ScaledCanvas:1203
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=33001247;//kernel.ScaledCanvas:1247
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=33001291;//kernel.ScaledCanvas:1291
      if (calch>_this.ch) {
        //$LASTPOS=33001305;//kernel.ScaledCanvas:1305
        calch=_this.ch;
      }
      //$LASTPOS=33001320;//kernel.ScaledCanvas:1320
      if (calcw>_this.cw) {
        //$LASTPOS=33001334;//kernel.ScaledCanvas:1334
        calcw=_this.cw;
      }
      //$LASTPOS=33001349;//kernel.ScaledCanvas:1349
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=33001381;//kernel.ScaledCanvas:1381
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=33001437;//kernel.ScaledCanvas:1437
        calcw=_this.width;
        //$LASTPOS=33001449;//kernel.ScaledCanvas:1449
        calch=_this.height;
        
      }
      //$LASTPOS=33001475;//kernel.ScaledCanvas:1475
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=33001518;//kernel.ScaledCanvas:1518
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=33001561;//kernel.ScaledCanvas:1561
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=33001676;//kernel.ScaledCanvas:1676
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=33001720;//kernel.ScaledCanvas:1720
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=33001764;//kernel.ScaledCanvas:1764
      if (calch>_this.ch) {
        //$LASTPOS=33001778;//kernel.ScaledCanvas:1778
        calch=_this.ch;
      }
      //$LASTPOS=33001793;//kernel.ScaledCanvas:1793
      if (calcw>_this.cw) {
        //$LASTPOS=33001807;//kernel.ScaledCanvas:1807
        calcw=_this.cw;
      }
      //$LASTPOS=33001822;//kernel.ScaledCanvas:1822
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=33001878;//kernel.ScaledCanvas:1878
        calcw=_this.width;
        //$LASTPOS=33001890;//kernel.ScaledCanvas:1890
        calch=_this.height;
        
      }
      //$LASTPOS=33001916;//kernel.ScaledCanvas:1916
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=33001959;//kernel.ScaledCanvas:1959
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=33002055;//kernel.ScaledCanvas:2055
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
      
      //$LASTPOS=33001676;//kernel.ScaledCanvas:1676
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=33001720;//kernel.ScaledCanvas:1720
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=33001764;//kernel.ScaledCanvas:1764
      if (calch>_this.ch) {
        //$LASTPOS=33001778;//kernel.ScaledCanvas:1778
        calch=_this.ch;
      }
      //$LASTPOS=33001793;//kernel.ScaledCanvas:1793
      if (calcw>_this.cw) {
        //$LASTPOS=33001807;//kernel.ScaledCanvas:1807
        calcw=_this.cw;
      }
      //$LASTPOS=33001822;//kernel.ScaledCanvas:1822
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=33001878;//kernel.ScaledCanvas:1878
        calcw=_this.width;
        //$LASTPOS=33001890;//kernel.ScaledCanvas:1890
        calch=_this.height;
        
      }
      //$LASTPOS=33001916;//kernel.ScaledCanvas:1916
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=33001959;//kernel.ScaledCanvas:1959
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=33002055;//kernel.ScaledCanvas:2055
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33002228;//kernel.ScaledCanvas:2228
      _this.color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33002228;//kernel.ScaledCanvas:2228
      _this.color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=33002272;//kernel.ScaledCanvas:2272
      ctx = cv.getContext("2d");
      //$LASTPOS=33002306;//kernel.ScaledCanvas:2306
      ctx.save();
      //$LASTPOS=33002323;//kernel.ScaledCanvas:2323
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=33002357;//kernel.ScaledCanvas:2357
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=33002383;//kernel.ScaledCanvas:2383
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=33002426;//kernel.ScaledCanvas:2426
      if (_this.isDrawGrid) {
        //$LASTPOS=33002442;//kernel.ScaledCanvas:2442
        _this.drawGrid(cv);
      }
      //$LASTPOS=33002461;//kernel.ScaledCanvas:2461
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=33002272;//kernel.ScaledCanvas:2272
      ctx = cv.getContext("2d");
      //$LASTPOS=33002306;//kernel.ScaledCanvas:2306
      ctx.save();
      //$LASTPOS=33002323;//kernel.ScaledCanvas:2323
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=33002357;//kernel.ScaledCanvas:2357
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=33002383;//kernel.ScaledCanvas:2383
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=33002426;//kernel.ScaledCanvas:2426
      if (_this.isDrawGrid) {
        //$LASTPOS=33002442;//kernel.ScaledCanvas:2442
        _this.drawGrid(cv);
      }
      //$LASTPOS=33002461;//kernel.ScaledCanvas:2461
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33002805;//kernel.ScaledCanvas:2805
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33002805;//kernel.ScaledCanvas:2805
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
      
      //$LASTPOS=34000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=34000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=34000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=34000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=34000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=34000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=34000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=34000231;//kernel.Sprites:231
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=34000270;//kernel.Sprites:270
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=34000307;//kernel.Sprites:307
      if (_this.drawing) {
        //$LASTPOS=34000331;//kernel.Sprites:331
        s.draw(_this.drawing);
        return _this;
        
      }
      //$LASTPOS=34000377;//kernel.Sprites:377
      _this.sprites.push(s);
      //$LASTPOS=34000399;//kernel.Sprites:399
      if (s.__genId==null) {
        //$LASTPOS=34000429;//kernel.Sprites:429
        s.__genId=_this.objId;
        //$LASTPOS=34000455;//kernel.Sprites:455
        _this.objId++;
        
      }
      //$LASTPOS=34000476;//kernel.Sprites:476
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=34000231;//kernel.Sprites:231
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=34000270;//kernel.Sprites:270
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=34000307;//kernel.Sprites:307
      if (_this.drawing) {
        //$LASTPOS=34000331;//kernel.Sprites:331
        s.draw(_this.drawing);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=34000377;//kernel.Sprites:377
      _this.sprites.push(s);
      //$LASTPOS=34000399;//kernel.Sprites:399
      if (s.__genId==null) {
        //$LASTPOS=34000429;//kernel.Sprites:429
        s.__genId=_this.objId;
        //$LASTPOS=34000455;//kernel.Sprites:455
        _this.objId++;
        
      }
      //$LASTPOS=34000476;//kernel.Sprites:476
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      "use strict";
      var _this=this;
      var idx;
      
      //$LASTPOS=34000546;//kernel.Sprites:546
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=34000579;//kernel.Sprites:579
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=34000603;//kernel.Sprites:603
      _this.sprites.splice(idx,1);
      //$LASTPOS=34000631;//kernel.Sprites:631
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=34000546;//kernel.Sprites:546
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=34000579;//kernel.Sprites:579
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=34000603;//kernel.Sprites:603
      _this.sprites.splice(idx,1);
      //$LASTPOS=34000631;//kernel.Sprites:631
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes(drawn) {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      
      //$LASTPOS=34000765;//kernel.Sprites:765
      for (i = _this.sprites.length-1;  i>=0 ; i--) {
        {
          //$LASTPOS=34000818;//kernel.Sprites:818
          s=_this.sprites[i];
          //$LASTPOS=34000841;//kernel.Sprites:841
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=34001014;//kernel.Sprites:1014
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=34001086;//kernel.Sprites:1086
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
      
      
      //$LASTPOS=34000765;//kernel.Sprites:765
      for (i = _this.sprites.length-1;  i>=0 ; i--) {
        {
          //$LASTPOS=34000818;//kernel.Sprites:818
          s=_this.sprites[i];
          //$LASTPOS=34000841;//kernel.Sprites:841
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=34001014;//kernel.Sprites:1014
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=34001086;//kernel.Sprites:1086
            _this.sprites.splice(i,1);
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34001147;//kernel.Sprites:1147
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34001147;//kernel.Sprites:1147
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      "use strict";
      var _this=this;
      var val1;
      var val2;
      
      //$LASTPOS=34001220;//kernel.Sprites:1220
      val1 = obj1.zOrder||0;
      //$LASTPOS=34001250;//kernel.Sprites:1250
      val2 = obj2.zOrder||0;
      //$LASTPOS=34001280;//kernel.Sprites:1280
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=34001326;//kernel.Sprites:1326
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=34001371;//kernel.Sprites:1371
          if (val1==val2) {
            //$LASTPOS=34001396;//kernel.Sprites:1396
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
      
      //$LASTPOS=34001220;//kernel.Sprites:1220
      val1 = obj1.zOrder||0;
      //$LASTPOS=34001250;//kernel.Sprites:1250
      val2 = obj2.zOrder||0;
      //$LASTPOS=34001280;//kernel.Sprites:1280
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=34001326;//kernel.Sprites:1326
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=34001371;//kernel.Sprites:1371
          if (val1==val2) {
            //$LASTPOS=34001396;//kernel.Sprites:1396
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
      
      //$LASTPOS=34001556;//kernel.Sprites:1556
      ctx = cv.getContext("2d");
      //$LASTPOS=34001590;//kernel.Sprites:1590
      ctx.save();
      //$LASTPOS=34001607;//kernel.Sprites:1607
      orderArray = [];
      //$LASTPOS=34001631;//kernel.Sprites:1631
      if (_this.t1Sprites) {
        //$LASTPOS=34001657;//kernel.Sprites:1657
        _this.sprites.forEach((function anonymous_1673(s) {
          
          //$LASTPOS=34001693;//kernel.Sprites:1693
          if (s instanceof Tonyu.classes.kernel.PlainChar) {
            //$LASTPOS=34001740;//kernel.Sprites:1740
            s.draw();
            
          } else {
            //$LASTPOS=34001770;//kernel.Sprites:1770
            orderArray.push(s);
          }
        }));
        
      } else {
        //$LASTPOS=34001825;//kernel.Sprites:1825
        orderArray=orderArray.concat(_this.sprites);
        
      }
      //$LASTPOS=34001876;//kernel.Sprites:1876
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=34001909;//kernel.Sprites:1909
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=34001938;//kernel.Sprites:1938
      _this.drawing=ctx;
      //$LASTPOS=34001956;//kernel.Sprites:1956
      orderArray.forEach((function anonymous_1975(s) {
        
        //$LASTPOS=34001990;//kernel.Sprites:1990
        s.draw(ctx);
      }));
      //$LASTPOS=34002017;//kernel.Sprites:2017
      _this.drawing=null;
      //$LASTPOS=34002036;//kernel.Sprites:2036
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34002082;//kernel.Sprites:2082
      _this.hitWatchers.forEach((function anonymous_2102(w) {
        
        //$LASTPOS=34002126;//kernel.Sprites:2126
        _this.sprites.forEach((function anonymous_2142(a) {
          var a_owner;
          
          //$LASTPOS=34002214;//kernel.Sprites:2214
          a_owner = a;
          //$LASTPOS=34002256;//kernel.Sprites:2256
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=34002309;//kernel.Sprites:2309
          _this.sprites.forEach((function anonymous_2325(b) {
            var b_owner;
            
            //$LASTPOS=34002357;//kernel.Sprites:2357
            b_owner = b;
            //$LASTPOS=34002403;//kernel.Sprites:2403
            if (a===b) {
              return _this;
            }
            //$LASTPOS=34002439;//kernel.Sprites:2439
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=34002544;//kernel.Sprites:2544
            if (a.crashTo1(b)) {
              //$LASTPOS=34002647;//kernel.Sprites:2647
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
      
      //$LASTPOS=34002082;//kernel.Sprites:2082
      _this.hitWatchers.forEach((function anonymous_2102(w) {
        
        //$LASTPOS=34002126;//kernel.Sprites:2126
        _this.sprites.forEach((function anonymous_2142(a) {
          var a_owner;
          
          //$LASTPOS=34002214;//kernel.Sprites:2214
          a_owner = a;
          //$LASTPOS=34002256;//kernel.Sprites:2256
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=34002309;//kernel.Sprites:2309
          _this.sprites.forEach((function anonymous_2325(b) {
            var b_owner;
            
            //$LASTPOS=34002357;//kernel.Sprites:2357
            b_owner = b;
            //$LASTPOS=34002403;//kernel.Sprites:2403
            if (a===b) {
              return _this;
            }
            //$LASTPOS=34002439;//kernel.Sprites:2439
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=34002544;//kernel.Sprites:2544
            if (a.crashTo1(b)) {
              //$LASTPOS=34002647;//kernel.Sprites:2647
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
      
      //$LASTPOS=34002777;//kernel.Sprites:2777
      p = {A: typeA,B: typeB,h: onHit};
      //$LASTPOS=34002841;//kernel.Sprites:2841
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      "use strict";
      var _this=this;
      var ctx;
      var i;
      
      //$LASTPOS=34002894;//kernel.Sprites:2894
      ctx = c.getContext("2d");
      //$LASTPOS=34002927;//kernel.Sprites:2927
      ctx.textBaseline="top";
      //$LASTPOS=34002956;//kernel.Sprites:2956
      ctx.save();
      //$LASTPOS=34002973;//kernel.Sprites:2973
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=34003013;//kernel.Sprites:3013
      for (i = 0;  i<c.width ; i+=10) {
        {
          //$LASTPOS=34003058;//kernel.Sprites:3058
          ctx.beginPath();
          //$LASTPOS=34003084;//kernel.Sprites:3084
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=34003130;//kernel.Sprites:3130
          ctx.moveTo(i,0);
          //$LASTPOS=34003156;//kernel.Sprites:3156
          ctx.lineTo(i,c.height);
          //$LASTPOS=34003189;//kernel.Sprites:3189
          ctx.closePath();
          //$LASTPOS=34003215;//kernel.Sprites:3215
          ctx.stroke();
        }
      }
      //$LASTPOS=34003243;//kernel.Sprites:3243
      for (i = 0;  i<c.height ; i+=10) {
        {
          //$LASTPOS=34003289;//kernel.Sprites:3289
          ctx.beginPath();
          //$LASTPOS=34003315;//kernel.Sprites:3315
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=34003361;//kernel.Sprites:3361
          ctx.moveTo(0,i);
          //$LASTPOS=34003387;//kernel.Sprites:3387
          ctx.lineTo(c.width,i);
          //$LASTPOS=34003419;//kernel.Sprites:3419
          ctx.closePath();
          //$LASTPOS=34003445;//kernel.Sprites:3445
          ctx.stroke();
        }
      }
      //$LASTPOS=34003471;//kernel.Sprites:3471
      ctx.fillStyle="white";
      //$LASTPOS=34003499;//kernel.Sprites:3499
      ctx.font="15px monospaced";
      //$LASTPOS=34003532;//kernel.Sprites:3532
      for (i = 100;  i<c.width ; i+=100) {
        {
          //$LASTPOS=34003580;//kernel.Sprites:3580
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=34003614;//kernel.Sprites:3614
      for (i = 100;  i<c.height ; i+=100) {
        {
          //$LASTPOS=34003663;//kernel.Sprites:3663
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=34003697;//kernel.Sprites:3697
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=34002894;//kernel.Sprites:2894
      ctx = c.getContext("2d");
      //$LASTPOS=34002927;//kernel.Sprites:2927
      ctx.textBaseline="top";
      //$LASTPOS=34002956;//kernel.Sprites:2956
      ctx.save();
      //$LASTPOS=34002973;//kernel.Sprites:2973
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=34003013;//kernel.Sprites:3013
      for (i = 0;  i<c.width ; i+=10) {
        {
          //$LASTPOS=34003058;//kernel.Sprites:3058
          ctx.beginPath();
          //$LASTPOS=34003084;//kernel.Sprites:3084
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=34003130;//kernel.Sprites:3130
          ctx.moveTo(i,0);
          //$LASTPOS=34003156;//kernel.Sprites:3156
          ctx.lineTo(i,c.height);
          //$LASTPOS=34003189;//kernel.Sprites:3189
          ctx.closePath();
          //$LASTPOS=34003215;//kernel.Sprites:3215
          ctx.stroke();
        }
      }
      //$LASTPOS=34003243;//kernel.Sprites:3243
      for (i = 0;  i<c.height ; i+=10) {
        {
          //$LASTPOS=34003289;//kernel.Sprites:3289
          ctx.beginPath();
          //$LASTPOS=34003315;//kernel.Sprites:3315
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=34003361;//kernel.Sprites:3361
          ctx.moveTo(0,i);
          //$LASTPOS=34003387;//kernel.Sprites:3387
          ctx.lineTo(c.width,i);
          //$LASTPOS=34003419;//kernel.Sprites:3419
          ctx.closePath();
          //$LASTPOS=34003445;//kernel.Sprites:3445
          ctx.stroke();
        }
      }
      //$LASTPOS=34003471;//kernel.Sprites:3471
      ctx.fillStyle="white";
      //$LASTPOS=34003499;//kernel.Sprites:3499
      ctx.font="15px monospaced";
      //$LASTPOS=34003532;//kernel.Sprites:3532
      for (i = 100;  i<c.width ; i+=100) {
        {
          //$LASTPOS=34003580;//kernel.Sprites:3580
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=34003614;//kernel.Sprites:3614
      for (i = 100;  i<c.height ; i+=100) {
        {
          //$LASTPOS=34003663;//kernel.Sprites:3663
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=34003697;//kernel.Sprites:3697
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setImageList :function _trc_Sprites_setImageList(il) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34003749;//kernel.Sprites:3749
      _this.imageList=il;
    },
    fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34003749;//kernel.Sprites:3749
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
      
      //$LASTPOS=34003861;//kernel.Sprites:3861
      _this.sx=scrollX;
      //$LASTPOS=34003878;//kernel.Sprites:3878
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34003861;//kernel.Sprites:3861
      _this.sx=scrollX;
      //$LASTPOS=34003878;//kernel.Sprites:3878
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
      
      //$LASTPOS=35000069;//kernel.BodyActor:69
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=35000105;//kernel.BodyActor:105
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35000069;//kernel.BodyActor:69
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=35000105;//kernel.BodyActor:105
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
      
      //$LASTPOS=35000172;//kernel.BodyActor:172
      wworld = _this.getWorld();
      //$LASTPOS=35000200;//kernel.BodyActor:200
      _this.world=wworld.world;
      //$LASTPOS=35000225;//kernel.BodyActor:225
      _this.scale=wworld.scale;
      //$LASTPOS=35000250;//kernel.BodyActor:250
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35000294;//kernel.BodyActor:294
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=35000341;//kernel.BodyActor:341
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=35000382;//kernel.BodyActor:382
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=35000435;//kernel.BodyActor:435
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=35000482;//kernel.BodyActor:482
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=35000547;//kernel.BodyActor:547
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=35000616;//kernel.BodyActor:616
      fixDef = new b2FixtureDef;
      //$LASTPOS=35000652;//kernel.BodyActor:652
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=35000694;//kernel.BodyActor:694
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=35000738;//kernel.BodyActor:738
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=35000794;//kernel.BodyActor:794
      bodyDef = new b2BodyDef;
      //$LASTPOS=35000828;//kernel.BodyActor:828
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=35000916;//kernel.BodyActor:916
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=35000952;//kernel.BodyActor:952
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=35000988;//kernel.BodyActor:988
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=35001037;//kernel.BodyActor:1037
      w = _this.width,h = _this.height;
      //$LASTPOS=35001064;//kernel.BodyActor:1064
      if (! w) {
        //$LASTPOS=35001083;//kernel.BodyActor:1083
        _this.detectShape();
        //$LASTPOS=35001107;//kernel.BodyActor:1107
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=35001137;//kernel.BodyActor:1137
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=35001179;//kernel.BodyActor:1179
      if (_this.shape=="box") {
        //$LASTPOS=35001208;//kernel.BodyActor:1208
        if (! h) {
          //$LASTPOS=35001216;//kernel.BodyActor:1216
          h=w;
        }
        //$LASTPOS=35001230;//kernel.BodyActor:1230
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=35001274;//kernel.BodyActor:1274
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=35001378;//kernel.BodyActor:1378
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=35001415;//kernel.BodyActor:1415
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=35001492;//kernel.BodyActor:1492
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=35001528;//kernel.BodyActor:1528
      fps = wworld.fps;
      //$LASTPOS=35001553;//kernel.BodyActor:1553
      r = _this.rotation,ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0)),vr = _this.defv(_this.vrotation,0);
      //$LASTPOS=35001635;//kernel.BodyActor:1635
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=35001672;//kernel.BodyActor:1672
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=35001705;//kernel.BodyActor:1705
      _this.body.SetUserData(_this);
      //$LASTPOS=35001734;//kernel.BodyActor:1734
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=35001767;//kernel.BodyActor:1767
      _this.rotation=r;
      //$LASTPOS=35001784;//kernel.BodyActor:1784
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
      
      //$LASTPOS=35000172;//kernel.BodyActor:172
      wworld = _this.getWorld();
      //$LASTPOS=35000200;//kernel.BodyActor:200
      _this.world=wworld.world;
      //$LASTPOS=35000225;//kernel.BodyActor:225
      _this.scale=wworld.scale;
      //$LASTPOS=35000250;//kernel.BodyActor:250
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35000294;//kernel.BodyActor:294
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=35000341;//kernel.BodyActor:341
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=35000382;//kernel.BodyActor:382
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=35000435;//kernel.BodyActor:435
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=35000482;//kernel.BodyActor:482
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=35000547;//kernel.BodyActor:547
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=35000616;//kernel.BodyActor:616
      fixDef = new b2FixtureDef;
      
      _thread.enter(function _trc_BodyActor_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35000652;//kernel.BodyActor:652
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=1;return;
          case 1:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=35000694;//kernel.BodyActor:694
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=2;return;
          case 2:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=35000738;//kernel.BodyActor:738
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=3;return;
          case 3:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=35000794;//kernel.BodyActor:794
            bodyDef = new b2BodyDef;
            //$LASTPOS=35000828;//kernel.BodyActor:828
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=35000916;//kernel.BodyActor:916
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=35000952;//kernel.BodyActor:952
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=35000988;//kernel.BodyActor:988
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=35001037;//kernel.BodyActor:1037
            w = _this.width,h = _this.height;
            //$LASTPOS=35001064;//kernel.BodyActor:1064
            if (! w) {
              //$LASTPOS=35001083;//kernel.BodyActor:1083
              _this.detectShape();
              //$LASTPOS=35001107;//kernel.BodyActor:1107
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=35001137;//kernel.BodyActor:1137
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=35001179;//kernel.BodyActor:1179
            if (_this.shape=="box") {
              //$LASTPOS=35001208;//kernel.BodyActor:1208
              if (! h) {
                //$LASTPOS=35001216;//kernel.BodyActor:1216
                h=w;
              }
              //$LASTPOS=35001230;//kernel.BodyActor:1230
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=35001274;//kernel.BodyActor:1274
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=35001378;//kernel.BodyActor:1378
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=35001415;//kernel.BodyActor:1415
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=35001492;//kernel.BodyActor:1492
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=35001528;//kernel.BodyActor:1528
            fps = wworld.fps;
            //$LASTPOS=35001553;//kernel.BodyActor:1553
            r = _this.rotation,ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0)),vr = _this.defv(_this.vrotation,0);
            //$LASTPOS=35001635;//kernel.BodyActor:1635
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=35001672;//kernel.BodyActor:1672
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=35001705;//kernel.BodyActor:1705
            _this.body.SetUserData(_this);
            //$LASTPOS=35001734;//kernel.BodyActor:1734
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=35001767;//kernel.BodyActor:1767
            _this.rotation=r;
            //$LASTPOS=35001784;//kernel.BodyActor:1784
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
      
      //$LASTPOS=35001834;//kernel.BodyActor:1834
      res = [];
      //$LASTPOS=35001859;//kernel.BodyActor:1859
      w = _this.getWorld();
      //$LASTPOS=35001882;//kernel.BodyActor:1882
      for (c = _this.world.GetContactList();  c ; c=c.GetNext()) {
        {
          //$LASTPOS=35001944;//kernel.BodyActor:1944
          if (c.IsTouching()) {
            //$LASTPOS=35001976;//kernel.BodyActor:1976
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=35002048;//kernel.BodyActor:2048
            if (m.m_points[0]) {
              //$LASTPOS=35002086;//kernel.BodyActor:2086
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=35002160;//kernel.BodyActor:2160
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=35002335;//kernel.BodyActor:2335
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=35002437;//kernel.BodyActor:2437
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=35002463;//kernel.BodyActor:2463
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=35002523;//kernel.BodyActor:2523
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=35002583;//kernel.BodyActor:2583
            if (a===_this) {
              //$LASTPOS=35002616;//kernel.BodyActor:2616
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=35002686;//kernel.BodyActor:2686
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=35002779;//kernel.BodyActor:2779
              if (b===_this) {
                //$LASTPOS=35002812;//kernel.BodyActor:2812
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=35002882;//kernel.BodyActor:2882
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
      
      //$LASTPOS=35001834;//kernel.BodyActor:1834
      res = [];
      //$LASTPOS=35001859;//kernel.BodyActor:1859
      w = _this.getWorld();
      //$LASTPOS=35001882;//kernel.BodyActor:1882
      for (c = _this.world.GetContactList();  c ; c=c.GetNext()) {
        {
          //$LASTPOS=35001944;//kernel.BodyActor:1944
          if (c.IsTouching()) {
            //$LASTPOS=35001976;//kernel.BodyActor:1976
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=35002048;//kernel.BodyActor:2048
            if (m.m_points[0]) {
              //$LASTPOS=35002086;//kernel.BodyActor:2086
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=35002160;//kernel.BodyActor:2160
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=35002335;//kernel.BodyActor:2335
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=35002437;//kernel.BodyActor:2437
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=35002463;//kernel.BodyActor:2463
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=35002523;//kernel.BodyActor:2523
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=35002583;//kernel.BodyActor:2583
            if (a===_this) {
              //$LASTPOS=35002616;//kernel.BodyActor:2616
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=35002686;//kernel.BodyActor:2686
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=35002779;//kernel.BodyActor:2779
              if (b===_this) {
                //$LASTPOS=35002812;//kernel.BodyActor:2812
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=35002882;//kernel.BodyActor:2882
                  res.push({target: a,manifold: m,x: point.x,y: point.y});
                  
                }
                
              }
            }
            
          }
        }
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
      
      //$LASTPOS=35003158;//kernel.BodyActor:3158
      res = [];
      //$LASTPOS=35003175;//kernel.BodyActor:3175
      for (c = _this.world.GetContactList();  c ; c=c.GetNext()) {
        {
          //$LASTPOS=35003237;//kernel.BodyActor:3237
          if (c.IsTouching()) {
            //$LASTPOS=35003272;//kernel.BodyActor:3272
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=35003332;//kernel.BodyActor:3332
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=35003392;//kernel.BodyActor:3392
            if (a===_this) {
              //$LASTPOS=35003425;//kernel.BodyActor:3425
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=35003495;//kernel.BodyActor:3495
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=35003547;//kernel.BodyActor:3547
              if (b===_this) {
                //$LASTPOS=35003580;//kernel.BodyActor:3580
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=35003650;//kernel.BodyActor:3650
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
      
      //$LASTPOS=35003158;//kernel.BodyActor:3158
      res = [];
      //$LASTPOS=35003175;//kernel.BodyActor:3175
      for (c = _this.world.GetContactList();  c ; c=c.GetNext()) {
        {
          //$LASTPOS=35003237;//kernel.BodyActor:3237
          if (c.IsTouching()) {
            //$LASTPOS=35003272;//kernel.BodyActor:3272
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=35003332;//kernel.BodyActor:3332
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=35003392;//kernel.BodyActor:3392
            if (a===_this) {
              //$LASTPOS=35003425;//kernel.BodyActor:3425
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=35003495;//kernel.BodyActor:3495
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=35003547;//kernel.BodyActor:3547
              if (b===_this) {
                //$LASTPOS=35003580;//kernel.BodyActor:3580
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=35003650;//kernel.BodyActor:3650
                  res.push(a);
                  
                }
                
              }
            }
            
          }
        }
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
      
      //$LASTPOS=35003768;//kernel.BodyActor:3768
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35003812;//kernel.BodyActor:3812
      scale = _this.getWorld().scale;
      //$LASTPOS=35003845;//kernel.BodyActor:3845
      fps = 60;
      //$LASTPOS=35003862;//kernel.BodyActor:3862
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
      
      //$LASTPOS=35003768;//kernel.BodyActor:3768
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35003812;//kernel.BodyActor:3812
      scale = _this.getWorld().scale;
      //$LASTPOS=35003845;//kernel.BodyActor:3845
      fps = 60;
      //$LASTPOS=35003862;//kernel.BodyActor:3862
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=35003956;//kernel.BodyActor:3956
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35004000;//kernel.BodyActor:4000
      scale = _this.getWorld().scale;
      //$LASTPOS=35004033;//kernel.BodyActor:4033
      fps = 60;
      //$LASTPOS=35004050;//kernel.BodyActor:4050
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
      
      //$LASTPOS=35003956;//kernel.BodyActor:3956
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35004000;//kernel.BodyActor:4000
      scale = _this.getWorld().scale;
      //$LASTPOS=35004033;//kernel.BodyActor:4033
      fps = 60;
      //$LASTPOS=35004050;//kernel.BodyActor:4050
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35004137;//kernel.BodyActor:4137
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35004137;//kernel.BodyActor:4137
      _this.body.ApplyTorque(a);
      
      _thread.retVal=_this;return;
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=35004184;//kernel.BodyActor:4184
      pos = _this.body.GetPosition();
      //$LASTPOS=35004217;//kernel.BodyActor:4217
      pos.x+=dx/_this.scale;
      //$LASTPOS=35004239;//kernel.BodyActor:4239
      pos.y+=dy/_this.scale;
      //$LASTPOS=35004261;//kernel.BodyActor:4261
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      //$LASTPOS=35004184;//kernel.BodyActor:4184
      pos = _this.body.GetPosition();
      //$LASTPOS=35004217;//kernel.BodyActor:4217
      pos.x+=dx/_this.scale;
      //$LASTPOS=35004239;//kernel.BodyActor:4239
      pos.y+=dy/_this.scale;
      //$LASTPOS=35004261;//kernel.BodyActor:4261
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
      
      //$LASTPOS=35004352;//kernel.BodyActor:4352
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=35004370;//kernel.BodyActor:4370
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
      
      //$LASTPOS=35004462;//kernel.BodyActor:4462
      params=params||{};
      //$LASTPOS=35004486;//kernel.BodyActor:4486
      px = params.x||_this.x;
      //$LASTPOS=35004511;//kernel.BodyActor:4511
      py = params.y||_this.y;
      //$LASTPOS=35004536;//kernel.BodyActor:4536
      wworld = _this.getWorld();
      //$LASTPOS=35004578;//kernel.BodyActor:4578
      scale = wworld.scale;
      //$LASTPOS=35004607;//kernel.BodyActor:4607
      world = wworld.world;
      //$LASTPOS=35004636;//kernel.BodyActor:4636
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=35004683;//kernel.BodyActor:4683
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=35004724;//kernel.BodyActor:4724
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=35004779;//kernel.BodyActor:4779
      jd = new JDC;
      //$LASTPOS=35004800;//kernel.BodyActor:4800
      bodyDef = new b2BodyDef;
      //$LASTPOS=35004834;//kernel.BodyActor:4834
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=35004876;//kernel.BodyActor:4876
      bodyDef.position.x=px/scale;
      //$LASTPOS=35004913;//kernel.BodyActor:4913
      bodyDef.position.y=py/scale;
      //$LASTPOS=35004950;//kernel.BodyActor:4950
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=35004992;//kernel.BodyActor:4992
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35005036;//kernel.BodyActor:5036
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=35005099;//kernel.BodyActor:5099
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=35005153;//kernel.BodyActor:5153
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=35005201;//kernel.BodyActor:5201
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=35005249;//kernel.BodyActor:5249
        jd.enableLimit=true;
        
      }
      //$LASTPOS=35005284;//kernel.BodyActor:5284
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
      
      //$LASTPOS=35004462;//kernel.BodyActor:4462
      params=params||{};
      //$LASTPOS=35004486;//kernel.BodyActor:4486
      px = params.x||_this.x;
      //$LASTPOS=35004511;//kernel.BodyActor:4511
      py = params.y||_this.y;
      //$LASTPOS=35004536;//kernel.BodyActor:4536
      wworld = _this.getWorld();
      //$LASTPOS=35004578;//kernel.BodyActor:4578
      scale = wworld.scale;
      //$LASTPOS=35004607;//kernel.BodyActor:4607
      world = wworld.world;
      //$LASTPOS=35004636;//kernel.BodyActor:4636
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=35004683;//kernel.BodyActor:4683
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=35004724;//kernel.BodyActor:4724
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=35004779;//kernel.BodyActor:4779
      jd = new JDC;
      //$LASTPOS=35004800;//kernel.BodyActor:4800
      bodyDef = new b2BodyDef;
      //$LASTPOS=35004834;//kernel.BodyActor:4834
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=35004876;//kernel.BodyActor:4876
      bodyDef.position.x=px/scale;
      //$LASTPOS=35004913;//kernel.BodyActor:4913
      bodyDef.position.y=py/scale;
      //$LASTPOS=35004950;//kernel.BodyActor:4950
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=35004992;//kernel.BodyActor:4992
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=35005036;//kernel.BodyActor:5036
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=35005099;//kernel.BodyActor:5099
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=35005153;//kernel.BodyActor:5153
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=35005201;//kernel.BodyActor:5201
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=35005249;//kernel.BodyActor:5249
        jd.enableLimit=true;
        
      }
      //$LASTPOS=35005284;//kernel.BodyActor:5284
      world.CreateJoint(jd);
      
      _thread.retVal=_this;return;
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35005332;//kernel.BodyActor:5332
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35005436;//kernel.BodyActor:5436
      r=r||0;
      //$LASTPOS=35005449;//kernel.BodyActor:5449
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=35005503;//kernel.BodyActor:5503
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
      
      //$LASTPOS=35005698;//kernel.BodyActor:5698
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=35005725;//kernel.BodyActor:5725
      pos = _this.body.GetPosition();
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=35005794;//kernel.BodyActor:5794
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=35005823;//kernel.BodyActor:5823
      v=v||0;
      //$LASTPOS=35005836;//kernel.BodyActor:5836
      pos = _this.body.GetPosition();
      //$LASTPOS=35005869;//kernel.BodyActor:5869
      pos.x=v/_this.scale;
      //$LASTPOS=35005889;//kernel.BodyActor:5889
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=35005926;//kernel.BodyActor:5926
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=35005953;//kernel.BodyActor:5953
      pos = _this.body.GetPosition();
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=35006022;//kernel.BodyActor:6022
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=35006051;//kernel.BodyActor:6051
      v=v||0;
      //$LASTPOS=35006064;//kernel.BodyActor:6064
      pos = _this.body.GetPosition();
      //$LASTPOS=35006097;//kernel.BodyActor:6097
      pos.y=v/_this.scale;
      //$LASTPOS=35006117;//kernel.BodyActor:6117
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=35006157;//kernel.BodyActor:6157
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=35006185;//kernel.BodyActor:6185
      v = _this.body.GetLinearVelocity();
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=35006272;//kernel.BodyActor:6272
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=35006302;//kernel.BodyActor:6302
      v=v||0;
      //$LASTPOS=35006315;//kernel.BodyActor:6315
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=35006353;//kernel.BodyActor:6353
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=35006387;//kernel.BodyActor:6387
      if (v) {
        //$LASTPOS=35006394;//kernel.BodyActor:6394
        _this.body.SetAwake(true);
      }
      //$LASTPOS=35006420;//kernel.BodyActor:6420
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=35006465;//kernel.BodyActor:6465
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=35006493;//kernel.BodyActor:6493
      v = _this.body.GetLinearVelocity();
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=35006580;//kernel.BodyActor:6580
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=35006610;//kernel.BodyActor:6610
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=35006648;//kernel.BodyActor:6648
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=35006682;//kernel.BodyActor:6682
      if (v) {
        //$LASTPOS=35006689;//kernel.BodyActor:6689
        _this.body.SetAwake(true);
      }
      //$LASTPOS=35006715;//kernel.BodyActor:6715
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35006765;//kernel.BodyActor:6765
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=35006871;//kernel.BodyActor:6871
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=35006901;//kernel.BodyActor:6901
      v=v||0;
      //$LASTPOS=35006914;//kernel.BodyActor:6914
      if (v) {
        //$LASTPOS=35006921;//kernel.BodyActor:6921
        _this.body.SetAwake(true);
      }
      //$LASTPOS=35006947;//kernel.BodyActor:6947
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
      
      //$LASTPOS=36000150;//kernel.T2World:150
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
            //$LASTPOS=36000150;//kernel.T2World:150
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
      
      //$LASTPOS=36000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=36000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=36000133;//kernel.T2World:133
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
      
      //$LASTPOS=36000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=36000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=36000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=36000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      //$LASTPOS=36000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=36000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=36000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=36000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=36000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=36000572;//kernel.T2World:572
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
            //$LASTPOS=36000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=36000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=36000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=36000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            //$LASTPOS=36000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            //$LASTPOS=36000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=36000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=36000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=36000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=36000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=36000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=36000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=36000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=36000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=36000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=36000976;//kernel.T2World:976
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
            //$LASTPOS=36000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=36000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=36000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=36000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=36000976;//kernel.T2World:976
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
      
      //$LASTPOS=36001017;//kernel.T2World:1017
      for (b = _this.world.GetBodyList();  b ; b=b.GetNext()) {
        {
          //$LASTPOS=36001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=36001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=36001114;//kernel.T2World:1114
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
      
      //$LASTPOS=36001017;//kernel.T2World:1017
      for (b = _this.world.GetBodyList();  b ; b=b.GetNext()) {
        {
          //$LASTPOS=36001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=36001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=36001114;//kernel.T2World:1114
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
      
      //$LASTPOS=37000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        return _this;
      }
      //$LASTPOS=37000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=37000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=37000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=37000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=37000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=37000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    clearSEData :function _trc_T2MediaPlayer_clearSEData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=37000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=37000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000367;//kernel.T2MediaPlayer:367
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
            //$LASTPOS=37000367;//kernel.T2MediaPlayer:367
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
      
      //$LASTPOS=37000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
      "use strict";
      var _this=this;
      var data;
      
      //$LASTPOS=37000508;//kernel.T2MediaPlayer:508
      _this.runAsync((function anonymous_517(succ,err) {
        
        //$LASTPOS=37000567;//kernel.T2MediaPlayer:567
        T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
      }));
      //$LASTPOS=37000620;//kernel.T2MediaPlayer:620
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
            //$LASTPOS=37000508;//kernel.T2MediaPlayer:508
            _this.fiber$runAsync(_thread, (function anonymous_517(succ,err) {
              
              //$LASTPOS=37000567;//kernel.T2MediaPlayer:567
              T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
            }));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=37000620;//kernel.T2MediaPlayer:620
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
      var _it_295;
      var name;
      var url;
      var e;
      
      //$LASTPOS=37000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=37000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=37000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=37000974;//kernel.T2MediaPlayer:974
      _it_295=Tonyu.iterator(r.sounds,1);
      while(_it_295.next()) {
        s=_it_295[0];
        
        //$LASTPOS=37001010;//kernel.T2MediaPlayer:1010
        name = s.name,url = Tonyu.Assets.resolve(s.url,prj.getDir());
        //$LASTPOS=37001084;//kernel.T2MediaPlayer:1084
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=37001142;//kernel.T2MediaPlayer:1142
          _this.print("Loading Sound2: "+name);
          //$LASTPOS=37001187;//kernel.T2MediaPlayer:1187
          _this.loadSE(name,url);
          
        } catch (e) {
          //$LASTPOS=37001242;//kernel.T2MediaPlayer:1242
          _this.print("Fail");
          //$LASTPOS=37001270;//kernel.T2MediaPlayer:1270
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
      var _it_295;
      var name;
      var url;
      var e;
      
      //$LASTPOS=37000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=37000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=37000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000974;//kernel.T2MediaPlayer:974
            _it_295=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_295.next())) { __pc=5; break; }
            s=_it_295[0];
            
            //$LASTPOS=37001010;//kernel.T2MediaPlayer:1010
            name = s.name,url = Tonyu.Assets.resolve(s.url,prj.getDir());
            //$LASTPOS=37001084;//kernel.T2MediaPlayer:1084
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3);
            //$LASTPOS=37001142;//kernel.T2MediaPlayer:1142
            _this.print("Loading Sound2: "+name);
            //$LASTPOS=37001187;//kernel.T2MediaPlayer:1187
            _this.fiber$loadSE(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4;break;
          case 3:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=37001242;//kernel.T2MediaPlayer:1242
              _this.print("Fail");
              //$LASTPOS=37001270;//kernel.T2MediaPlayer:1270
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
      
      //$LASTPOS=37001408;//kernel.T2MediaPlayer:1408
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=37001467;//kernel.T2MediaPlayer:1467
      if (vol==null) {
        //$LASTPOS=37001484;//kernel.T2MediaPlayer:1484
        vol=128;
      }
      //$LASTPOS=37001573;//kernel.T2MediaPlayer:1573
      if (vol<0) {
        //$LASTPOS=37001593;//kernel.T2MediaPlayer:1593
        vol=0;
      } else {
        //$LASTPOS=37001614;//kernel.T2MediaPlayer:1614
        if (vol>128) {
          //$LASTPOS=37001629;//kernel.T2MediaPlayer:1629
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
      
      //$LASTPOS=37001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=37001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      //$LASTPOS=37002024;//kernel.T2MediaPlayer:2024
      while (data==null) {
        //$LASTPOS=37002056;//kernel.T2MediaPlayer:2056
        _this.update();
        //$LASTPOS=37002075;//kernel.T2MediaPlayer:2075
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
      
      //$LASTPOS=37001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=37001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37002024;//kernel.T2MediaPlayer:2024
          case 1:
            if (!(data==null)) { __pc=3; break; }
            //$LASTPOS=37002056;//kernel.T2MediaPlayer:2056
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=37002075;//kernel.T2MediaPlayer:2075
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
      
      //$LASTPOS=37002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=37002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=37002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=37002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=37002278;//kernel.T2MediaPlayer:2278
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=37002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=37002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=37002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=37002278;//kernel.T2MediaPlayer:2278
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
      
      //$LASTPOS=37002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=37002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=37002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=37002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=37002715;//kernel.T2MediaPlayer:2715
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
      
      //$LASTPOS=37002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=37002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=37002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=37002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=37002715;//kernel.T2MediaPlayer:2715
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
      
      //$LASTPOS=37003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=37003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=37003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=37003278;//kernel.T2MediaPlayer:3278
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=37003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=37003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=37003278;//kernel.T2MediaPlayer:3278
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
      
      //$LASTPOS=37003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=37003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=37003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=37003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=37003737;//kernel.T2MediaPlayer:3737
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
      
      //$LASTPOS=37003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=37003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=37003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=37003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=37003737;//kernel.T2MediaPlayer:3737
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
      
      //$LASTPOS=37004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=37004338;//kernel.T2MediaPlayer:4338
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=37004383;//kernel.T2MediaPlayer:4383
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37004338;//kernel.T2MediaPlayer:4338
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
            //$LASTPOS=37004383;//kernel.T2MediaPlayer:4383
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
      
      //$LASTPOS=37004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=37004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=37004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=37004501;//kernel.T2MediaPlayer:4501
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=37004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=37004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=37004501;//kernel.T2MediaPlayer:4501
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
      
      //$LASTPOS=37004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=37004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=37004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=37004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=37004861;//kernel.T2MediaPlayer:4861
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
      
      //$LASTPOS=37004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=37004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=37004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=37004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=37004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=37004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=37004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=37005013;//kernel.T2MediaPlayer:5013
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
      
      //$LASTPOS=37004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=37004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=37004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=37005013;//kernel.T2MediaPlayer:5013
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
      
      //$LASTPOS=38000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=38000096;//kernel.PlainChar:96
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=38000142;//kernel.PlainChar:142
        _this.initSprite();
        
      }
      //$LASTPOS=38000168;//kernel.PlainChar:168
      if (typeof  x=="object") {
        //$LASTPOS=38000192;//kernel.PlainChar:192
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=38000224;//kernel.PlainChar:224
        if (typeof  x=="number") {
          //$LASTPOS=38000259;//kernel.PlainChar:259
          _this.x=x;
          //$LASTPOS=38000278;//kernel.PlainChar:278
          _this.y=y;
          //$LASTPOS=38000297;//kernel.PlainChar:297
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000334;//kernel.PlainChar:334
      _this.onDraw();
      //$LASTPOS=38000349;//kernel.PlainChar:349
      if (_this._isInvisible) {
        return _this;
      }
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38000423;//kernel.PlainChar:423
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000423;//kernel.PlainChar:423
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
      
      //$LASTPOS=38000479;//kernel.PlainChar:479
      _this.onUpdate();
      //$LASTPOS=38000496;//kernel.PlainChar:496
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000479;//kernel.PlainChar:479
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000496;//kernel.PlainChar:496
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
      
      //$LASTPOS=38000557;//kernel.PlainChar:557
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=38000609;//kernel.PlainChar:609
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=38000647;//kernel.PlainChar:647
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=38000679;//kernel.PlainChar:679
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38000557;//kernel.PlainChar:557
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=38000609;//kernel.PlainChar:609
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=38000647;//kernel.PlainChar:647
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000679;//kernel.PlainChar:679
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
      
      //$LASTPOS=38000711;//kernel.PlainChar:711
      _this.main();
      //$LASTPOS=38000724;//kernel.PlainChar:724
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
            //$LASTPOS=38000711;//kernel.PlainChar:711
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=38000724;//kernel.PlainChar:724
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
      
      //$LASTPOS=39000038;//kernel.SecretChar:38
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
      
      //$LASTPOS=40000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=40000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=40000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=40000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=40000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=40000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=40000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=40000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=40000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=40000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000220;//kernel.SpriteChar:220
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=40000251;//kernel.SpriteChar:251
      _this.onDraw();
      //$LASTPOS=40000266;//kernel.SpriteChar:266
      _this.detectShape();
      //$LASTPOS=40000286;//kernel.SpriteChar:286
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
      
      //$LASTPOS=41000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=41000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=41000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=41000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=41000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=41000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=41000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=41000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=41000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=41000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=41000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=41000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=41000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=41000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=41000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=41000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=41000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=41000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=41000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=41000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=41000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=41000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=41000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=41000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=41000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=41000885;//kernel.T1Map:885
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
      
      //$LASTPOS=41000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=41000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=41000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=41000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=41001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=41001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=41001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=41001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=41001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=41000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=41000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=41000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=41000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=41001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=41001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=41001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=41001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=41001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=42000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=42000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=42000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=42000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=42000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=42000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=42000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=42000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=42000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=42000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=42000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=42000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000103;//kernel.T1Page:103
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=42000131;//kernel.T1Page:131
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=42000159;//kernel.T1Page:159
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=42000189;//kernel.T1Page:189
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=42000222;//kernel.T1Page:222
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=42000251;//kernel.T1Page:251
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=42000282;//kernel.T1Page:282
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=42000313;//kernel.T1Page:313
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=42000347;//kernel.T1Page:347
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
      
      //$LASTPOS=43000072;//kernel.TextChar:72
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=43000091;//kernel.TextChar:91
      _this.text=_this.text||"";
      //$LASTPOS=43000111;//kernel.TextChar:111
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=43000130;//kernel.TextChar:130
      _this.size=20;
      //$LASTPOS=43000144;//kernel.TextChar:144
      if (! _this.x) {
        //$LASTPOS=43000157;//kernel.TextChar:157
        _this.x=0;
      }
      //$LASTPOS=43000172;//kernel.TextChar:172
      if (! _this.y) {
        //$LASTPOS=43000185;//kernel.TextChar:185
        _this.y=0;
      }
      //$LASTPOS=43000200;//kernel.TextChar:200
      if (t) {
        //$LASTPOS=43000207;//kernel.TextChar:207
        _this.text=t;
      }
      //$LASTPOS=43000220;//kernel.TextChar:220
      if (c) {
        //$LASTPOS=43000227;//kernel.TextChar:227
        _this.fillStyle=c;
      }
      //$LASTPOS=43000245;//kernel.TextChar:245
      if (s) {
        //$LASTPOS=43000252;//kernel.TextChar:252
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43000282;//kernel.TextChar:282
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=43000313;//kernel.TextChar:313
      _this.onDraw();
      //$LASTPOS=43000328;//kernel.TextChar:328
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
      
      //$LASTPOS=44000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=44000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=44000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=44000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=44000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=44000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=44000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=44000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=44000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=44000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=44000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=44000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=44000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=44000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=44000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=44000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=44000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=44000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=44000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=44000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=44000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=44000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=44000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=44000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=44000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=44000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=44001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=44001049;//kernel.GameConsole:1049
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
      
      //$LASTPOS=44000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=44000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=44000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=44000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=44000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=44000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=44000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=44000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=44000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=44000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=44000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=44000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=44000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=44000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=44001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=44001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=44001159;//kernel.GameConsole:1159
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
      
      //$LASTPOS=45000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=45000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=45000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=45000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      //$LASTPOS=45000158;//kernel.MapEditor:158
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=45000186;//kernel.MapEditor:186
      if (_this.fileList.exists()) {
        //$LASTPOS=45000214;//kernel.MapEditor:214
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=45000257;//kernel.MapEditor:257
          f=f+"";
          //$LASTPOS=45000274;//kernel.MapEditor:274
          _this.fNames=f.split("/");
          //$LASTPOS=45000304;//kernel.MapEditor:304
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=45000345;//kernel.MapEditor:345
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=45000388;//kernel.MapEditor:388
      if (_this.fileExist) {
        //$LASTPOS=45000408;//kernel.MapEditor:408
        _this.print("Load Data?: Y or N");
        //$LASTPOS=45000442;//kernel.MapEditor:442
        while (true) {
          //$LASTPOS=45000464;//kernel.MapEditor:464
          if (_this.getkey("y")>0) {
            //$LASTPOS=45000496;//kernel.MapEditor:496
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=45000551;//kernel.MapEditor:551
          if (_this.getkey("n")>0) {
            //$LASTPOS=45000583;//kernel.MapEditor:583
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=45000639;//kernel.MapEditor:639
          _this.update();
          
        }
        //$LASTPOS=45000661;//kernel.MapEditor:661
        if (_this.loadMode) {
          //$LASTPOS=45000684;//kernel.MapEditor:684
          _this.fileName=_this.prompt("Input json file (*.json)","map.json");
          //$LASTPOS=45000749;//kernel.MapEditor:749
          if (_this.fileName) {
            //$LASTPOS=45000776;//kernel.MapEditor:776
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=45000840;//kernel.MapEditor:840
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=45000876;//kernel.MapEditor:876
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=45000917;//kernel.MapEditor:917
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=45000967;//kernel.MapEditor:967
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=45001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=45001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=45001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=45001149;//kernel.MapEditor:1149
          if (_this.baseData==undefined) {
            //$LASTPOS=45001187;//kernel.MapEditor:1187
            _this.print("Load failed");
            //$LASTPOS=45001222;//kernel.MapEditor:1222
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=45001253;//kernel.MapEditor:1253
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=45001298;//kernel.MapEditor:1298
              _this.mapData=_this.baseData[0];
              //$LASTPOS=45001332;//kernel.MapEditor:1332
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=45001368;//kernel.MapEditor:1368
              if (_this.baseData.length>2) {
                //$LASTPOS=45001408;//kernel.MapEditor:1408
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=45001464;//kernel.MapEditor:1464
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=45001541;//kernel.MapEditor:1541
      _this.update();
      //$LASTPOS=45001855;//kernel.MapEditor:1855
      if (! _this.loadMode) {
        //$LASTPOS=45001875;//kernel.MapEditor:1875
        _this.row=_this.prompt("input row");
        //$LASTPOS=45001905;//kernel.MapEditor:1905
        _this.col=_this.prompt("input col");
        //$LASTPOS=45001935;//kernel.MapEditor:1935
        _this.chipWidth=_this.prompt("input chipWidth");
        //$LASTPOS=45001977;//kernel.MapEditor:1977
        _this.chipHeight=_this.prompt("input chipHeight");
        //$LASTPOS=45002021;//kernel.MapEditor:2021
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=45002086;//kernel.MapEditor:2086
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=45002117;//kernel.MapEditor:2117
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=45002149;//kernel.MapEditor:2149
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=45002182;//kernel.MapEditor:2182
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=45002233;//kernel.MapEditor:2233
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=45002544;//kernel.MapEditor:2544
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=45002591;//kernel.MapEditor:2591
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=45002617;//kernel.MapEditor:2617
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=45002713;//kernel.MapEditor:2713
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=45002744;//kernel.MapEditor:2744
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=45002776;//kernel.MapEditor:2776
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=45002809;//kernel.MapEditor:2809
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=45002876;//kernel.MapEditor:2876
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=45002932;//kernel.MapEditor:2932
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=45002989;//kernel.MapEditor:2989
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=45003041;//kernel.MapEditor:3041
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=45003094;//kernel.MapEditor:3094
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=45003176;//kernel.MapEditor:3176
      _this.counter=0;
      //$LASTPOS=45003188;//kernel.MapEditor:3188
      for (i = 0;  i<Tonyu.globals.$mp.row ; i++) {
        {
          //$LASTPOS=45003221;//kernel.MapEditor:3221
          for (j = 0;  j<Tonyu.globals.$mp.col ; j++) {
            {
              //$LASTPOS=45003258;//kernel.MapEditor:3258
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=45003302;//kernel.MapEditor:3302
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=45003326;//kernel.MapEditor:3326
      Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=45003406;//kernel.MapEditor:3406
      _this.mode="get";
      //$LASTPOS=45003419;//kernel.MapEditor:3419
      _this.prevMode="set";
      //$LASTPOS=45003436;//kernel.MapEditor:3436
      _this.mapp=0;
      //$LASTPOS=45003445;//kernel.MapEditor:3445
      _this.maponp=- 1;
      //$LASTPOS=45003457;//kernel.MapEditor:3457
      _this.mx=- 40;
      //$LASTPOS=45003466;//kernel.MapEditor:3466
      _this.my=- 40;
      //$LASTPOS=45003475;//kernel.MapEditor:3475
      _this.chipX=- 40;
      //$LASTPOS=45003487;//kernel.MapEditor:3487
      _this.chipY=- 40;
      //$LASTPOS=45003499;//kernel.MapEditor:3499
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=45003528;//kernel.MapEditor:3528
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=45003559;//kernel.MapEditor:3559
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=45003584;//kernel.MapEditor:3584
      _this.initialWidth=Tonyu.globals.$map.chipWidth;
      //$LASTPOS=45003614;//kernel.MapEditor:3614
      _this.initialHeight=Tonyu.globals.$map.chipHeight;
      //$LASTPOS=45003646;//kernel.MapEditor:3646
      _this.layers=["base","on","all"];
      //$LASTPOS=45003675;//kernel.MapEditor:3675
      _this.lc=0;
      //$LASTPOS=45003682;//kernel.MapEditor:3682
      _this.selectedLayer=_this.layers[_this.lc];
      //$LASTPOS=45003709;//kernel.MapEditor:3709
      _this.drawPanel();
      //$LASTPOS=45003723;//kernel.MapEditor:3723
      _this.drawLetter(_this.mode);
      //$LASTPOS=45003744;//kernel.MapEditor:3744
      while (true) {
        //$LASTPOS=45003762;//kernel.MapEditor:3762
        _this.p=_this.mapp;
        //$LASTPOS=45003775;//kernel.MapEditor:3775
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=45003894;//kernel.MapEditor:3894
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=45003928;//kernel.MapEditor:3928
          _this.mode="erase";
          //$LASTPOS=45003983;//kernel.MapEditor:3983
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=45004013;//kernel.MapEditor:4013
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=45004132;//kernel.MapEditor:4132
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=45004166;//kernel.MapEditor:4166
          _this.mode="set";
          //$LASTPOS=45004187;//kernel.MapEditor:4187
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=45004217;//kernel.MapEditor:4217
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=45004338;//kernel.MapEditor:4338
          _this.lc++;
          //$LASTPOS=45004353;//kernel.MapEditor:4353
          _this.selectedLayer=_this.layers[_this.lc%3];
          //$LASTPOS=45004390;//kernel.MapEditor:4390
          _this.drawPanel();
          //$LASTPOS=45004444;//kernel.MapEditor:4444
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=45004567;//kernel.MapEditor:4567
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=45004688;//kernel.MapEditor:4688
          if (_this.mode!="get") {
            //$LASTPOS=45004718;//kernel.MapEditor:4718
            _this.prevMode=_this.mode;
            //$LASTPOS=45004746;//kernel.MapEditor:4746
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=45004782;//kernel.MapEditor:4782
            _this.mode="get";
            //$LASTPOS=45004807;//kernel.MapEditor:4807
            _this.chipX=- 40;
            //$LASTPOS=45004831;//kernel.MapEditor:4831
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=45004871;//kernel.MapEditor:4871
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=45004909;//kernel.MapEditor:4909
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=45004976;//kernel.MapEditor:4976
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=45005006;//kernel.MapEditor:5006
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=45005142;//kernel.MapEditor:5142
          if (_this.loadedFile) {
            //$LASTPOS=45005171;//kernel.MapEditor:5171
            _this.saveFileName=_this.prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=45005259;//kernel.MapEditor:5259
            _this.saveFileName=_this.prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=45005353;//kernel.MapEditor:5353
          if (_this.saveFileName) {
            //$LASTPOS=45005384;//kernel.MapEditor:5384
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=45005446;//kernel.MapEditor:5446
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=45005608;//kernel.MapEditor:5608
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=45005645;//kernel.MapEditor:5645
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=45005698;//kernel.MapEditor:5698
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=45005819;//kernel.MapEditor:5819
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=45005853;//kernel.MapEditor:5853
          _this.mode="copy";
          //$LASTPOS=45005907;//kernel.MapEditor:5907
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=45005937;//kernel.MapEditor:5937
        if (_this.mode!="get") {
          //$LASTPOS=45005963;//kernel.MapEditor:5963
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=45006069;//kernel.MapEditor:6069
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=45006087;//kernel.MapEditor:6087
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=45006218;//kernel.MapEditor:6218
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=45006236;//kernel.MapEditor:6236
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=45006349;//kernel.MapEditor:6349
            _this.my=_this.my-8;
          }
          //$LASTPOS=45006367;//kernel.MapEditor:6367
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=45006502;//kernel.MapEditor:6502
            _this.my=_this.my+8;
          }
          //$LASTPOS=45006520;//kernel.MapEditor:6520
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=45006563;//kernel.MapEditor:6563
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=45006669;//kernel.MapEditor:6669
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=45006693;//kernel.MapEditor:6693
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=45006824;//kernel.MapEditor:6824
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=45006848;//kernel.MapEditor:6848
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=45006961;//kernel.MapEditor:6961
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=45006985;//kernel.MapEditor:6985
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=45007120;//kernel.MapEditor:7120
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=45007144;//kernel.MapEditor:7144
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=45007217;//kernel.MapEditor:7217
        if (_this.getkey("i")==1) {
          //$LASTPOS=45007246;//kernel.MapEditor:7246
          if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
            //$LASTPOS=45007278;//kernel.MapEditor:7278
            Tonyu.globals.$map.chipWidth+=4;
          }
          //$LASTPOS=45007306;//kernel.MapEditor:7306
          if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
            //$LASTPOS=45007340;//kernel.MapEditor:7340
            Tonyu.globals.$map.chipHeight+=4;
          }
          //$LASTPOS=45007369;//kernel.MapEditor:7369
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=45007396;//kernel.MapEditor:7396
          _this.panel.die();
          //$LASTPOS=45007418;//kernel.MapEditor:7418
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=45007518;//kernel.MapEditor:7518
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=45007553;//kernel.MapEditor:7553
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=45007589;//kernel.MapEditor:7589
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=45007626;//kernel.MapEditor:7626
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=45007684;//kernel.MapEditor:7684
        if (_this.getkey("o")==1) {
          //$LASTPOS=45007713;//kernel.MapEditor:7713
          if (Tonyu.globals.$map.chipWidth>4) {
            //$LASTPOS=45007734;//kernel.MapEditor:7734
            Tonyu.globals.$map.chipWidth-=4;
          }
          //$LASTPOS=45007762;//kernel.MapEditor:7762
          if (Tonyu.globals.$map.chipHeight>4) {
            //$LASTPOS=45007784;//kernel.MapEditor:7784
            Tonyu.globals.$map.chipHeight-=4;
          }
          //$LASTPOS=45007813;//kernel.MapEditor:7813
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=45007840;//kernel.MapEditor:7840
          _this.panel.die();
          //$LASTPOS=45007862;//kernel.MapEditor:7862
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=45007962;//kernel.MapEditor:7962
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=45007997;//kernel.MapEditor:7997
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=45008033;//kernel.MapEditor:8033
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=45008070;//kernel.MapEditor:8070
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=45008162;//kernel.MapEditor:8162
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=45008193;//kernel.MapEditor:8193
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=45008225;//kernel.MapEditor:8225
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=45008278;//kernel.MapEditor:8278
          if (_this.selectedLayer=="base") {
            //$LASTPOS=45008318;//kernel.MapEditor:8318
            _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=45008374;//kernel.MapEditor:8374
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=45008427;//kernel.MapEditor:8427
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
            
          } else {
            //$LASTPOS=45008485;//kernel.MapEditor:8485
            if (_this.selectedLayer=="on") {
              //$LASTPOS=45008523;//kernel.MapEditor:8523
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=45008594;//kernel.MapEditor:8594
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=45008647;//kernel.MapEditor:8647
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
              
            }
          }
          
        } else {
          //$LASTPOS=45008713;//kernel.MapEditor:8713
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=45008768;//kernel.MapEditor:8768
            if (_this.selectedLayer=="base") {
              //$LASTPOS=45008808;//kernel.MapEditor:8808
              _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=45008864;//kernel.MapEditor:8864
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
              //$LASTPOS=45008915;//kernel.MapEditor:8915
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
              
            } else {
              //$LASTPOS=45008973;//kernel.MapEditor:8973
              if (_this.selectedLayer=="on") {
                //$LASTPOS=45009011;//kernel.MapEditor:9011
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              } else {
                //$LASTPOS=45009080;//kernel.MapEditor:9080
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=45009131;//kernel.MapEditor:9131
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              }
            }
            
          } else {
            //$LASTPOS=45009193;//kernel.MapEditor:9193
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=45009246;//kernel.MapEditor:9246
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=45009326;//kernel.MapEditor:9326
              _this.mode="set";
              //$LASTPOS=45009347;//kernel.MapEditor:9347
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=45009413;//kernel.MapEditor:9413
              _this.drawLetter(_this.mode);
              //$LASTPOS=45009440;//kernel.MapEditor:9440
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=45009465;//kernel.MapEditor:9465
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=45009520;//kernel.MapEditor:9520
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=45009573;//kernel.MapEditor:9573
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=45009627;//kernel.MapEditor:9627
                  if (_this.selectedLayer=="base") {
                    //$LASTPOS=45009667;//kernel.MapEditor:9667
                    _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                    //$LASTPOS=45009720;//kernel.MapEditor:9720
                    _this.maponp=- 1;
                    
                  } else {
                    //$LASTPOS=45009746;//kernel.MapEditor:9746
                    if (_this.selectedLayer=="on") {
                      //$LASTPOS=45009784;//kernel.MapEditor:9784
                      _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    } else {
                      //$LASTPOS=45009855;//kernel.MapEditor:9855
                      _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      //$LASTPOS=45009908;//kernel.MapEditor:9908
                      _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    }
                  }
                  //$LASTPOS=45010033;//kernel.MapEditor:10033
                  _this.mode="set";
                  //$LASTPOS=45010086;//kernel.MapEditor:10086
                  _this.drawLetter(_this.mode);
                  //$LASTPOS=45010113;//kernel.MapEditor:10113
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=45010139;//kernel.MapEditor:10139
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
      
      //$LASTPOS=45000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=45000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=45000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=45000110;//kernel.MapEditor:110
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000158;//kernel.MapEditor:158
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=45000186;//kernel.MapEditor:186
            if (_this.fileList.exists()) {
              //$LASTPOS=45000214;//kernel.MapEditor:214
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=45000257;//kernel.MapEditor:257
                f=f+"";
                //$LASTPOS=45000274;//kernel.MapEditor:274
                _this.fNames=f.split("/");
                //$LASTPOS=45000304;//kernel.MapEditor:304
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=45000345;//kernel.MapEditor:345
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=45000388;//kernel.MapEditor:388
            if (!(_this.fileExist)) { __pc=12; break; }
            //$LASTPOS=45000408;//kernel.MapEditor:408
            _this.print("Load Data?: Y or N");
            //$LASTPOS=45000442;//kernel.MapEditor:442
          case 2:
            //$LASTPOS=45000464;//kernel.MapEditor:464
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=45000496;//kernel.MapEditor:496
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=45000551;//kernel.MapEditor:551
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=45000583;//kernel.MapEditor:583
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=45000639;//kernel.MapEditor:639
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=45000661;//kernel.MapEditor:661
            if (!(_this.loadMode)) { __pc=11; break; }
            //$LASTPOS=45000684;//kernel.MapEditor:684
            _this.fiber$prompt(_thread, "Input json file (*.json)", "map.json");
            __pc=7;return;
          case 7:
            _this.fileName=_thread.retVal;
            
            //$LASTPOS=45000749;//kernel.MapEditor:749
            if (_this.fileName) {
              //$LASTPOS=45000776;//kernel.MapEditor:776
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=45000840;//kernel.MapEditor:840
            if (!(_this.mapDataFile.obj())) { __pc=8; break; }
            {
              //$LASTPOS=45000876;//kernel.MapEditor:876
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=45000917;//kernel.MapEditor:917
              _this.loadedFile=_this.fileName;
            }
            __pc=10;break;
          case 8:
            //$LASTPOS=45000967;//kernel.MapEditor:967
            _this.fiber$file(_thread, _this.fileName);
            __pc=9;return;
          case 9:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=45001008;//kernel.MapEditor:1008
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=45001048;//kernel.MapEditor:1048
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=45001093;//kernel.MapEditor:1093
              _this.loadedFile=_this.fileName;
              
            }
          case 10:
            
            //$LASTPOS=45001149;//kernel.MapEditor:1149
            if (_this.baseData==undefined) {
              //$LASTPOS=45001187;//kernel.MapEditor:1187
              _this.print("Load failed");
              //$LASTPOS=45001222;//kernel.MapEditor:1222
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=45001253;//kernel.MapEditor:1253
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=45001298;//kernel.MapEditor:1298
                _this.mapData=_this.baseData[0];
                //$LASTPOS=45001332;//kernel.MapEditor:1332
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=45001368;//kernel.MapEditor:1368
                if (_this.baseData.length>2) {
                  //$LASTPOS=45001408;//kernel.MapEditor:1408
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=45001464;//kernel.MapEditor:1464
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 11:
            
          case 12:
            
            //$LASTPOS=45001541;//kernel.MapEditor:1541
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=45001855;//kernel.MapEditor:1855
            if (!(! _this.loadMode)) { __pc=18; break; }
            //$LASTPOS=45001875;//kernel.MapEditor:1875
            _this.fiber$prompt(_thread, "input row");
            __pc=14;return;
          case 14:
            _this.row=_thread.retVal;
            
            //$LASTPOS=45001905;//kernel.MapEditor:1905
            _this.fiber$prompt(_thread, "input col");
            __pc=15;return;
          case 15:
            _this.col=_thread.retVal;
            
            //$LASTPOS=45001935;//kernel.MapEditor:1935
            _this.fiber$prompt(_thread, "input chipWidth");
            __pc=16;return;
          case 16:
            _this.chipWidth=_thread.retVal;
            
            //$LASTPOS=45001977;//kernel.MapEditor:1977
            _this.fiber$prompt(_thread, "input chipHeight");
            __pc=17;return;
          case 17:
            _this.chipHeight=_thread.retVal;
            
            //$LASTPOS=45002021;//kernel.MapEditor:2021
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=45002086;//kernel.MapEditor:2086
            _this.panel.x=_this.panel.width/2+40;
            //$LASTPOS=45002117;//kernel.MapEditor:2117
            _this.panel.y=_this.panel.height/2+40;
            //$LASTPOS=45002149;//kernel.MapEditor:2149
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=45002182;//kernel.MapEditor:2182
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=45002233;//kernel.MapEditor:2233
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
            __pc=19;break;
          case 18:
            {
              //$LASTPOS=45002544;//kernel.MapEditor:2544
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=45002591;//kernel.MapEditor:2591
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=45002617;//kernel.MapEditor:2617
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=45002713;//kernel.MapEditor:2713
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=45002744;//kernel.MapEditor:2744
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=45002776;//kernel.MapEditor:2776
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=45002809;//kernel.MapEditor:2809
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 19:
            
            //$LASTPOS=45002876;//kernel.MapEditor:2876
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=45002932;//kernel.MapEditor:2932
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=45002989;//kernel.MapEditor:2989
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=45003041;//kernel.MapEditor:3041
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=45003094;//kernel.MapEditor:3094
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=45003176;//kernel.MapEditor:3176
            _this.counter=0;
            //$LASTPOS=45003188;//kernel.MapEditor:3188
            for (i = 0;  i<Tonyu.globals.$mp.row ; i++) {
              {
                //$LASTPOS=45003221;//kernel.MapEditor:3221
                for (j = 0;  j<Tonyu.globals.$mp.col ; j++) {
                  {
                    //$LASTPOS=45003258;//kernel.MapEditor:3258
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=45003302;//kernel.MapEditor:3302
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=45003326;//kernel.MapEditor:3326
            Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=45003406;//kernel.MapEditor:3406
            _this.mode="get";
            //$LASTPOS=45003419;//kernel.MapEditor:3419
            _this.prevMode="set";
            //$LASTPOS=45003436;//kernel.MapEditor:3436
            _this.mapp=0;
            //$LASTPOS=45003445;//kernel.MapEditor:3445
            _this.maponp=- 1;
            //$LASTPOS=45003457;//kernel.MapEditor:3457
            _this.mx=- 40;
            //$LASTPOS=45003466;//kernel.MapEditor:3466
            _this.my=- 40;
            //$LASTPOS=45003475;//kernel.MapEditor:3475
            _this.chipX=- 40;
            //$LASTPOS=45003487;//kernel.MapEditor:3487
            _this.chipY=- 40;
            //$LASTPOS=45003499;//kernel.MapEditor:3499
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=45003528;//kernel.MapEditor:3528
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=45003559;//kernel.MapEditor:3559
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=45003584;//kernel.MapEditor:3584
            _this.initialWidth=Tonyu.globals.$map.chipWidth;
            //$LASTPOS=45003614;//kernel.MapEditor:3614
            _this.initialHeight=Tonyu.globals.$map.chipHeight;
            //$LASTPOS=45003646;//kernel.MapEditor:3646
            _this.layers=["base","on","all"];
            //$LASTPOS=45003675;//kernel.MapEditor:3675
            _this.lc=0;
            //$LASTPOS=45003682;//kernel.MapEditor:3682
            _this.selectedLayer=_this.layers[_this.lc];
            //$LASTPOS=45003709;//kernel.MapEditor:3709
            _this.fiber$drawPanel(_thread);
            __pc=20;return;
          case 20:
            
            //$LASTPOS=45003723;//kernel.MapEditor:3723
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=21;return;
          case 21:
            
            //$LASTPOS=45003744;//kernel.MapEditor:3744
          case 22:
            //$LASTPOS=45003762;//kernel.MapEditor:3762
            _this.p=_this.mapp;
            //$LASTPOS=45003775;//kernel.MapEditor:3775
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=24; break; }
            //$LASTPOS=45003894;//kernel.MapEditor:3894
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=45003928;//kernel.MapEditor:3928
            _this.mode="erase";
            //$LASTPOS=45003983;//kernel.MapEditor:3983
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=23;return;
          case 23:
            
          case 24:
            
            //$LASTPOS=45004013;//kernel.MapEditor:4013
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=26; break; }
            //$LASTPOS=45004132;//kernel.MapEditor:4132
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=45004166;//kernel.MapEditor:4166
            _this.mode="set";
            //$LASTPOS=45004187;//kernel.MapEditor:4187
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=25;return;
          case 25:
            
          case 26:
            
            //$LASTPOS=45004217;//kernel.MapEditor:4217
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=29; break; }
            //$LASTPOS=45004338;//kernel.MapEditor:4338
            _this.lc++;
            //$LASTPOS=45004353;//kernel.MapEditor:4353
            _this.selectedLayer=_this.layers[_this.lc%3];
            //$LASTPOS=45004390;//kernel.MapEditor:4390
            _this.fiber$drawPanel(_thread);
            __pc=27;return;
          case 27:
            
            //$LASTPOS=45004444;//kernel.MapEditor:4444
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=28;return;
          case 28:
            
          case 29:
            
            //$LASTPOS=45004567;//kernel.MapEditor:4567
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=31; break; }
            //$LASTPOS=45004688;//kernel.MapEditor:4688
            if (_this.mode!="get") {
              //$LASTPOS=45004718;//kernel.MapEditor:4718
              _this.prevMode=_this.mode;
              //$LASTPOS=45004746;//kernel.MapEditor:4746
              Tonyu.globals.$mp.scrollTo(- 40,- 40);
              //$LASTPOS=45004782;//kernel.MapEditor:4782
              _this.mode="get";
              //$LASTPOS=45004807;//kernel.MapEditor:4807
              _this.chipX=- 40;
              //$LASTPOS=45004831;//kernel.MapEditor:4831
              _this.chipY=- 40;
              
            } else {
              //$LASTPOS=45004871;//kernel.MapEditor:4871
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=45004909;//kernel.MapEditor:4909
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=45004976;//kernel.MapEditor:4976
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=30;return;
          case 30:
            
          case 31:
            
            //$LASTPOS=45005006;//kernel.MapEditor:5006
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=36; break; }
            //$LASTPOS=45005142;//kernel.MapEditor:5142
            if (!(_this.loadedFile)) { __pc=33; break; }
            //$LASTPOS=45005171;//kernel.MapEditor:5171
            _this.fiber$prompt(_thread, "input json file(*.json)", _this.loadedFile);
            __pc=32;return;
          case 32:
            _this.saveFileName=_thread.retVal;
            
            __pc=35;break;
          case 33:
            //$LASTPOS=45005259;//kernel.MapEditor:5259
            _this.fiber$prompt(_thread, "input json file(*.json)", "map.json");
            __pc=34;return;
          case 34:
            _this.saveFileName=_thread.retVal;
            
          case 35:
            
            //$LASTPOS=45005353;//kernel.MapEditor:5353
            if (_this.saveFileName) {
              //$LASTPOS=45005384;//kernel.MapEditor:5384
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=45005446;//kernel.MapEditor:5446
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
              //$LASTPOS=45005608;//kernel.MapEditor:5608
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=45005645;//kernel.MapEditor:5645
              _this.print(_this.saveFileName+" Saved");
              
            }
          case 36:
            
            //$LASTPOS=45005698;//kernel.MapEditor:5698
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=38; break; }
            //$LASTPOS=45005819;//kernel.MapEditor:5819
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=45005853;//kernel.MapEditor:5853
            _this.mode="copy";
            //$LASTPOS=45005907;//kernel.MapEditor:5907
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=37;return;
          case 37:
            
          case 38:
            
            //$LASTPOS=45005937;//kernel.MapEditor:5937
            if (_this.mode!="get") {
              //$LASTPOS=45005963;//kernel.MapEditor:5963
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=45006069;//kernel.MapEditor:6069
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=45006087;//kernel.MapEditor:6087
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=45006218;//kernel.MapEditor:6218
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=45006236;//kernel.MapEditor:6236
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=45006349;//kernel.MapEditor:6349
                _this.my=_this.my-8;
              }
              //$LASTPOS=45006367;//kernel.MapEditor:6367
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=45006502;//kernel.MapEditor:6502
                _this.my=_this.my+8;
              }
              //$LASTPOS=45006520;//kernel.MapEditor:6520
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=45006563;//kernel.MapEditor:6563
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=45006669;//kernel.MapEditor:6669
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=45006693;//kernel.MapEditor:6693
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=45006824;//kernel.MapEditor:6824
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=45006848;//kernel.MapEditor:6848
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=45006961;//kernel.MapEditor:6961
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=45006985;//kernel.MapEditor:6985
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=45007120;//kernel.MapEditor:7120
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=45007144;//kernel.MapEditor:7144
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=45007217;//kernel.MapEditor:7217
            if (_this.getkey("i")==1) {
              //$LASTPOS=45007246;//kernel.MapEditor:7246
              if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
                //$LASTPOS=45007278;//kernel.MapEditor:7278
                Tonyu.globals.$map.chipWidth+=4;
              }
              //$LASTPOS=45007306;//kernel.MapEditor:7306
              if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
                //$LASTPOS=45007340;//kernel.MapEditor:7340
                Tonyu.globals.$map.chipHeight+=4;
              }
              //$LASTPOS=45007369;//kernel.MapEditor:7369
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=45007396;//kernel.MapEditor:7396
              _this.panel.die();
              //$LASTPOS=45007418;//kernel.MapEditor:7418
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=45007518;//kernel.MapEditor:7518
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=45007553;//kernel.MapEditor:7553
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=45007589;//kernel.MapEditor:7589
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=45007626;//kernel.MapEditor:7626
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=45007684;//kernel.MapEditor:7684
            if (_this.getkey("o")==1) {
              //$LASTPOS=45007713;//kernel.MapEditor:7713
              if (Tonyu.globals.$map.chipWidth>4) {
                //$LASTPOS=45007734;//kernel.MapEditor:7734
                Tonyu.globals.$map.chipWidth-=4;
              }
              //$LASTPOS=45007762;//kernel.MapEditor:7762
              if (Tonyu.globals.$map.chipHeight>4) {
                //$LASTPOS=45007784;//kernel.MapEditor:7784
                Tonyu.globals.$map.chipHeight-=4;
              }
              //$LASTPOS=45007813;//kernel.MapEditor:7813
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=45007840;//kernel.MapEditor:7840
              _this.panel.die();
              //$LASTPOS=45007862;//kernel.MapEditor:7862
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=45007962;//kernel.MapEditor:7962
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=45007997;//kernel.MapEditor:7997
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=45008033;//kernel.MapEditor:8033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=45008070;//kernel.MapEditor:8070
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=45008162;//kernel.MapEditor:8162
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=45008193;//kernel.MapEditor:8193
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=45008225;//kernel.MapEditor:8225
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=39; break; }
            {
              //$LASTPOS=45008278;//kernel.MapEditor:8278
              if (_this.selectedLayer=="base") {
                //$LASTPOS=45008318;//kernel.MapEditor:8318
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=45008374;//kernel.MapEditor:8374
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=45008427;//kernel.MapEditor:8427
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=45008485;//kernel.MapEditor:8485
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=45008523;//kernel.MapEditor:8523
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  
                } else {
                  //$LASTPOS=45008594;//kernel.MapEditor:8594
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  //$LASTPOS=45008647;//kernel.MapEditor:8647
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
                  
                }
              }
            }
            __pc=51;break;
          case 39:
            //$LASTPOS=45008713;//kernel.MapEditor:8713
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=40; break; }
            {
              //$LASTPOS=45008768;//kernel.MapEditor:8768
              if (_this.selectedLayer=="base") {
                //$LASTPOS=45008808;//kernel.MapEditor:8808
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=45008864;//kernel.MapEditor:8864
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=45008915;//kernel.MapEditor:8915
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=45008973;//kernel.MapEditor:8973
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=45009011;//kernel.MapEditor:9011
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                } else {
                  //$LASTPOS=45009080;//kernel.MapEditor:9080
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  //$LASTPOS=45009131;//kernel.MapEditor:9131
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                }
              }
            }
            __pc=50;break;
          case 40:
            //$LASTPOS=45009193;//kernel.MapEditor:9193
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=43; break; }
            //$LASTPOS=45009246;//kernel.MapEditor:9246
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=45009326;//kernel.MapEditor:9326
            _this.mode="set";
            //$LASTPOS=45009347;//kernel.MapEditor:9347
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=45009413;//kernel.MapEditor:9413
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=41;return;
          case 41:
            
            //$LASTPOS=45009440;//kernel.MapEditor:9440
            _this.fiber$updateEx(_thread, 10);
            __pc=42;return;
          case 42:
            
            __pc=49;break;
          case 43:
            //$LASTPOS=45009465;//kernel.MapEditor:9465
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=44; break; }
            {
              //$LASTPOS=45009520;//kernel.MapEditor:9520
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=48;break;
          case 44:
            //$LASTPOS=45009573;//kernel.MapEditor:9573
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=47; break; }
            //$LASTPOS=45009627;//kernel.MapEditor:9627
            if (_this.selectedLayer=="base") {
              //$LASTPOS=45009667;//kernel.MapEditor:9667
              _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=45009720;//kernel.MapEditor:9720
              _this.maponp=- 1;
              
            } else {
              //$LASTPOS=45009746;//kernel.MapEditor:9746
              if (_this.selectedLayer=="on") {
                //$LASTPOS=45009784;//kernel.MapEditor:9784
                _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              } else {
                //$LASTPOS=45009855;//kernel.MapEditor:9855
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=45009908;//kernel.MapEditor:9908
                _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              }
            }
            //$LASTPOS=45010033;//kernel.MapEditor:10033
            _this.mode="set";
            //$LASTPOS=45010086;//kernel.MapEditor:10086
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=45;return;
          case 45:
            
            //$LASTPOS=45010113;//kernel.MapEditor:10113
            _this.fiber$updateEx(_thread, 10);
            __pc=46;return;
          case 46:
            
          case 47:
            
          case 48:
            
          case 49:
            
          case 50:
            
          case 51:
            
            //$LASTPOS=45010139;//kernel.MapEditor:10139
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
      
      //$LASTPOS=45010311;//kernel.MapEditor:10311
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=45010345;//kernel.MapEditor:10345
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=45010368;//kernel.MapEditor:10368
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=45010411;//kernel.MapEditor:10411
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=45010459;//kernel.MapEditor:10459
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=45010521;//kernel.MapEditor:10521
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=45010580;//kernel.MapEditor:10580
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=45010603;//kernel.MapEditor:10603
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45010657;//kernel.MapEditor:10657
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010707;//kernel.MapEditor:10707
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010759;//kernel.MapEditor:10759
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010811;//kernel.MapEditor:10811
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010863;//kernel.MapEditor:10863
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=45010912;//kernel.MapEditor:10912
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=45010963;//kernel.MapEditor:10963
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=45010998;//kernel.MapEditor:10998
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011049;//kernel.MapEditor:11049
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011101;//kernel.MapEditor:11101
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011153;//kernel.MapEditor:11153
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011205;//kernel.MapEditor:11205
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=45011255;//kernel.MapEditor:11255
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=45011306;//kernel.MapEditor:11306
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45011352;//kernel.MapEditor:11352
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=45011409;//kernel.MapEditor:11409
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=45011473;//kernel.MapEditor:11473
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=45011548;//kernel.MapEditor:11548
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=45011653;//kernel.MapEditor:11653
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45011730;//kernel.MapEditor:11730
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=45011815;//kernel.MapEditor:11815
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45011892;//kernel.MapEditor:11892
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45011968;//kernel.MapEditor:11968
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45012046;//kernel.MapEditor:12046
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45010311;//kernel.MapEditor:10311
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=45010345;//kernel.MapEditor:10345
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=45010368;//kernel.MapEditor:10368
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=45010411;//kernel.MapEditor:10411
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=45010459;//kernel.MapEditor:10459
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=45010521;//kernel.MapEditor:10521
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=45010580;//kernel.MapEditor:10580
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=45010603;//kernel.MapEditor:10603
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45010657;//kernel.MapEditor:10657
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010707;//kernel.MapEditor:10707
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010759;//kernel.MapEditor:10759
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010811;//kernel.MapEditor:10811
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45010863;//kernel.MapEditor:10863
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=45010912;//kernel.MapEditor:10912
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=45010963;//kernel.MapEditor:10963
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=45010998;//kernel.MapEditor:10998
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011049;//kernel.MapEditor:11049
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011101;//kernel.MapEditor:11101
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011153;//kernel.MapEditor:11153
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45011205;//kernel.MapEditor:11205
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=45011255;//kernel.MapEditor:11255
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=45011306;//kernel.MapEditor:11306
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45011352;//kernel.MapEditor:11352
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=45011409;//kernel.MapEditor:11409
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=45011473;//kernel.MapEditor:11473
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=45011548;//kernel.MapEditor:11548
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=45011653;//kernel.MapEditor:11653
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45011730;//kernel.MapEditor:11730
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=45011815;//kernel.MapEditor:11815
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45011892;//kernel.MapEditor:11892
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45011968;//kernel.MapEditor:11968
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45012046;//kernel.MapEditor:12046
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    drawLetter :function _trc_MapEditor_drawLetter(mode) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45012154;//kernel.MapEditor:12154
      if (mode=="set") {
        //$LASTPOS=45012170;//kernel.MapEditor:12170
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012208;//kernel.MapEditor:12208
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012243;//kernel.MapEditor:12243
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45012320;//kernel.MapEditor:12320
      if (mode=="get") {
        //$LASTPOS=45012336;//kernel.MapEditor:12336
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012374;//kernel.MapEditor:12374
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012409;//kernel.MapEditor:12409
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45012486;//kernel.MapEditor:12486
      if (mode=="erase") {
        //$LASTPOS=45012504;//kernel.MapEditor:12504
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012542;//kernel.MapEditor:12542
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012577;//kernel.MapEditor:12577
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45012655;//kernel.MapEditor:12655
      if (mode=="copy") {
        //$LASTPOS=45012672;//kernel.MapEditor:12672
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012710;//kernel.MapEditor:12710
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012745;//kernel.MapEditor:12745
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45012822;//kernel.MapEditor:12822
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45012857;//kernel.MapEditor:12857
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=45012942;//kernel.MapEditor:12942
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
    },
    fiber$drawLetter :function _trc_MapEditor_f_drawLetter(_thread,mode) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45012154;//kernel.MapEditor:12154
      if (mode=="set") {
        //$LASTPOS=45012170;//kernel.MapEditor:12170
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012208;//kernel.MapEditor:12208
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012243;//kernel.MapEditor:12243
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45012320;//kernel.MapEditor:12320
      if (mode=="get") {
        //$LASTPOS=45012336;//kernel.MapEditor:12336
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012374;//kernel.MapEditor:12374
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012409;//kernel.MapEditor:12409
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45012486;//kernel.MapEditor:12486
      if (mode=="erase") {
        //$LASTPOS=45012504;//kernel.MapEditor:12504
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012542;//kernel.MapEditor:12542
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012577;//kernel.MapEditor:12577
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45012655;//kernel.MapEditor:12655
      if (mode=="copy") {
        //$LASTPOS=45012672;//kernel.MapEditor:12672
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=45012710;//kernel.MapEditor:12710
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=45012745;//kernel.MapEditor:12745
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45012822;//kernel.MapEditor:12822
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45012857;//kernel.MapEditor:12857
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=45012942;//kernel.MapEditor:12942
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
      var i;
      var j;
      
      //$LASTPOS=46000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=46000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=46000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=46000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=46000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=46000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=46000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=46000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=46000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=46000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=46000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=46000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=46000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=46000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=46000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=46000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=46000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=46000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=46000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=46000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=46000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=46000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=46000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=46000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=46001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=46001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=46001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=46001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=46001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=46001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=46001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=46001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=46001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=46001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=46001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=46001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=46001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=46001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=46001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=46001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=46001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=46001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=46001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=46001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=46001973;//kernel.MapEditorOLD:1973
      for (i = 0;  i<16 ; i++) {
        {
          //$LASTPOS=46002001;//kernel.MapEditorOLD:2001
          for (j = 0;  j<8 ; j++) {
            {
              //$LASTPOS=46002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=46002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=46002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=46002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=46002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=46002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=46002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=46002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=46002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=46002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=46002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=46002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=46002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=46002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=46002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=46002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=46002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=46002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=46002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=46002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=46002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=46002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=46002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=46002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=46002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=46002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=46002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=46002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=46002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=46002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=46002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=46002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=46002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=46002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=46002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=46002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=46002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=46003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=46003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=46003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=46003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=46003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=46003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=46003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=46003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=46003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=46003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=46003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=46003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=46003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=46003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=46004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=46004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=46004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=46004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=46004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=46004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=46004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=46004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=46004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=46004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=46004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=46004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=46004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=46004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=46004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=46004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=46004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=46004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=46004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=46004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=46004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=46004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=46004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=46004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=46004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=46004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=46004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=46004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=46004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=46004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=46004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=46005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=46005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=46005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=46005123;//kernel.MapEditorOLD:5123
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
      
      //$LASTPOS=46000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=46000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=46000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2; break; }
            //$LASTPOS=46000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5; break;
            
          case 2:
            
            //$LASTPOS=46000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3; break; }
            //$LASTPOS=46000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=46000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=46000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9; break; }
            //$LASTPOS=46000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=46000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=46000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=46000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6; break; }
            {
              //$LASTPOS=46000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8;break;
          case 6:
            //$LASTPOS=46000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=46000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=46000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8:
            
            //$LASTPOS=46000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=46000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=46000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=46000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=46000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=46000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9:
            
            //$LASTPOS=46000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=46001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12; break; }
            //$LASTPOS=46001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=46001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=46001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=46001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=46001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=46001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=46001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=46001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=46001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13;break;
          case 12:
            {
              //$LASTPOS=46001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=46001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=46001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=46001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=46001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=46001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=46001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=46001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13:
            
            //$LASTPOS=46001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=46001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=46001973;//kernel.MapEditorOLD:1973
            for (i = 0;  i<16 ; i++) {
              {
                //$LASTPOS=46002001;//kernel.MapEditorOLD:2001
                for (j = 0;  j<8 ; j++) {
                  {
                    //$LASTPOS=46002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=46002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=46002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=46002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=46002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=46002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=46002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=46002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=46002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=46002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=46002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=46002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=46002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=46002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=46002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=46002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=46002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=46002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=46002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=46002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=46002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=46002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=46002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=46002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=46002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=46002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=46002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=46002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=46002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=46002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=46002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=46002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=46002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=46002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=46002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=46002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=46002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=46003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=46003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=46003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=46003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=46003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=46003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=46003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=46003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=46003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=46003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=46003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=46003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=46003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=46003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=46004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=46004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=46004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=46004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=46004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=46004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=46004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=46004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=46004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=46004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=46004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=46004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=46004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=46004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=46004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=46004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=46004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
            {
              //$LASTPOS=46004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=46004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=46004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
            {
              //$LASTPOS=46004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=46004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
            //$LASTPOS=46004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=46004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=46004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=46004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=46004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=46004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
            {
              //$LASTPOS=46004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=46004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
            //$LASTPOS=46004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=46005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=46005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=46005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=46005123;//kernel.MapEditorOLD:5123
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
      
      //$LASTPOS=47000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=47000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=47000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=47000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      //$LASTPOS=47000116;//kernel.MapEditorOLD2:116
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=47000144;//kernel.MapEditorOLD2:144
      if (_this.fileList.exists()) {
        //$LASTPOS=47000168;//kernel.MapEditorOLD2:168
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=47000207;//kernel.MapEditorOLD2:207
          f=f+"";
          //$LASTPOS=47000220;//kernel.MapEditorOLD2:220
          _this.fNames=f.split("/");
          //$LASTPOS=47000246;//kernel.MapEditorOLD2:246
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=47000283;//kernel.MapEditorOLD2:283
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=47000308;//kernel.MapEditorOLD2:308
      if (_this.fileExist) {
        //$LASTPOS=47000328;//kernel.MapEditorOLD2:328
        _this.print("Load Data?: Y or N");
        //$LASTPOS=47000362;//kernel.MapEditorOLD2:362
        while (true) {
          //$LASTPOS=47000384;//kernel.MapEditorOLD2:384
          if (_this.getkey("y")>0) {
            //$LASTPOS=47000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=47000471;//kernel.MapEditorOLD2:471
          if (_this.getkey("n")>0) {
            //$LASTPOS=47000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=47000559;//kernel.MapEditorOLD2:559
          _this.update();
          
        }
        //$LASTPOS=47000581;//kernel.MapEditorOLD2:581
        if (_this.loadMode) {
          //$LASTPOS=47000604;//kernel.MapEditorOLD2:604
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=47000669;//kernel.MapEditorOLD2:669
          if (_this.fileName) {
            //$LASTPOS=47000696;//kernel.MapEditorOLD2:696
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=47000760;//kernel.MapEditorOLD2:760
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=47000796;//kernel.MapEditorOLD2:796
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=47000837;//kernel.MapEditorOLD2:837
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=47000887;//kernel.MapEditorOLD2:887
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=47000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=47000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=47001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=47001069;//kernel.MapEditorOLD2:1069
          if (_this.baseData==undefined) {
            //$LASTPOS=47001107;//kernel.MapEditorOLD2:1107
            _this.print("Load failed");
            //$LASTPOS=47001142;//kernel.MapEditorOLD2:1142
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=47001173;//kernel.MapEditorOLD2:1173
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=47001218;//kernel.MapEditorOLD2:1218
              _this.mapData=_this.baseData[0];
              //$LASTPOS=47001252;//kernel.MapEditorOLD2:1252
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=47001288;//kernel.MapEditorOLD2:1288
              if (_this.baseData.length>2) {
                //$LASTPOS=47001328;//kernel.MapEditorOLD2:1328
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=47001384;//kernel.MapEditorOLD2:1384
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=47001461;//kernel.MapEditorOLD2:1461
      _this.update();
      //$LASTPOS=47001739;//kernel.MapEditorOLD2:1739
      if (! _this.loadMode) {
        //$LASTPOS=47001759;//kernel.MapEditorOLD2:1759
        _this.row=prompt("input row");
        //$LASTPOS=47001789;//kernel.MapEditorOLD2:1789
        _this.col=prompt("input col");
        //$LASTPOS=47001819;//kernel.MapEditorOLD2:1819
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=47001861;//kernel.MapEditorOLD2:1861
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=47001905;//kernel.MapEditorOLD2:1905
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=47001970;//kernel.MapEditorOLD2:1970
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=47002001;//kernel.MapEditorOLD2:2001
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=47002033;//kernel.MapEditorOLD2:2033
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=47002066;//kernel.MapEditorOLD2:2066
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=47002117;//kernel.MapEditorOLD2:2117
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=47002428;//kernel.MapEditorOLD2:2428
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=47002475;//kernel.MapEditorOLD2:2475
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=47002501;//kernel.MapEditorOLD2:2501
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=47002597;//kernel.MapEditorOLD2:2597
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=47002628;//kernel.MapEditorOLD2:2628
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=47002660;//kernel.MapEditorOLD2:2660
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=47002693;//kernel.MapEditorOLD2:2693
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=47002743;//kernel.MapEditorOLD2:2743
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=47002799;//kernel.MapEditorOLD2:2799
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=47002856;//kernel.MapEditorOLD2:2856
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=47002908;//kernel.MapEditorOLD2:2908
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=47002961;//kernel.MapEditorOLD2:2961
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=47003043;//kernel.MapEditorOLD2:3043
      _this.counter=0;
      //$LASTPOS=47003055;//kernel.MapEditorOLD2:3055
      for (i = 0;  i<Tonyu.globals.$mp.row ; i++) {
        {
          //$LASTPOS=47003088;//kernel.MapEditorOLD2:3088
          for (j = 0;  j<Tonyu.globals.$mp.col ; j++) {
            {
              //$LASTPOS=47003125;//kernel.MapEditorOLD2:3125
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=47003169;//kernel.MapEditorOLD2:3169
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=47003191;//kernel.MapEditorOLD2:3191
      _this.drawPanel();
      //$LASTPOS=47003205;//kernel.MapEditorOLD2:3205
      _this.mode="get";
      //$LASTPOS=47003218;//kernel.MapEditorOLD2:3218
      _this.prevMode="set";
      //$LASTPOS=47003235;//kernel.MapEditorOLD2:3235
      _this.mapp=0;
      //$LASTPOS=47003244;//kernel.MapEditorOLD2:3244
      _this.mx=- 40;
      //$LASTPOS=47003253;//kernel.MapEditorOLD2:3253
      _this.my=- 40;
      //$LASTPOS=47003262;//kernel.MapEditorOLD2:3262
      _this.chipX=- 40;
      //$LASTPOS=47003274;//kernel.MapEditorOLD2:3274
      _this.chipY=- 40;
      //$LASTPOS=47003286;//kernel.MapEditorOLD2:3286
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=47003315;//kernel.MapEditorOLD2:3315
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=47003346;//kernel.MapEditorOLD2:3346
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=47003369;//kernel.MapEditorOLD2:3369
      while (true) {
        //$LASTPOS=47003387;//kernel.MapEditorOLD2:3387
        _this.p=_this.mapp;
        //$LASTPOS=47003400;//kernel.MapEditorOLD2:3400
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=47003539;//kernel.MapEditorOLD2:3539
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47003573;//kernel.MapEditorOLD2:3573
          _this.mode="erase";
          //$LASTPOS=47003596;//kernel.MapEditorOLD2:3596
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=47003629;//kernel.MapEditorOLD2:3629
        if (_this.getkey("s")==1) {
          //$LASTPOS=47003658;//kernel.MapEditorOLD2:3658
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47003692;//kernel.MapEditorOLD2:3692
          if (_this.mode=="set") {
            //$LASTPOS=47003722;//kernel.MapEditorOLD2:3722
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=47003765;//kernel.MapEditorOLD2:3765
            _this.mode="set";
            
          }
          //$LASTPOS=47003797;//kernel.MapEditorOLD2:3797
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=47003830;//kernel.MapEditorOLD2:3830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=47003949;//kernel.MapEditorOLD2:3949
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47003983;//kernel.MapEditorOLD2:3983
          _this.mode="set";
          //$LASTPOS=47004004;//kernel.MapEditorOLD2:4004
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=47004037;//kernel.MapEditorOLD2:4037
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=47004158;//kernel.MapEditorOLD2:4158
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47004192;//kernel.MapEditorOLD2:4192
          _this.mode="setOn";
          //$LASTPOS=47004215;//kernel.MapEditorOLD2:4215
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=47004341;//kernel.MapEditorOLD2:4341
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=47004482;//kernel.MapEditorOLD2:4482
          if (_this.mode!="get") {
            //$LASTPOS=47004512;//kernel.MapEditorOLD2:4512
            _this.prevMode=_this.mode;
            //$LASTPOS=47004540;//kernel.MapEditorOLD2:4540
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=47004576;//kernel.MapEditorOLD2:4576
            _this.mode="get";
            //$LASTPOS=47004601;//kernel.MapEditorOLD2:4601
            _this.chipX=- 40;
            //$LASTPOS=47004625;//kernel.MapEditorOLD2:4625
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=47004665;//kernel.MapEditorOLD2:4665
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47004703;//kernel.MapEditorOLD2:4703
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=47004738;//kernel.MapEditorOLD2:4738
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=47004771;//kernel.MapEditorOLD2:4771
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=47004927;//kernel.MapEditorOLD2:4927
          if (_this.loadedFile) {
            //$LASTPOS=47004956;//kernel.MapEditorOLD2:4956
            _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=47005044;//kernel.MapEditorOLD2:5044
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=47005544;//kernel.MapEditorOLD2:5544
          if (_this.saveFileName) {
            //$LASTPOS=47005575;//kernel.MapEditorOLD2:5575
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=47005637;//kernel.MapEditorOLD2:5637
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=47005799;//kernel.MapEditorOLD2:5799
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=47005836;//kernel.MapEditorOLD2:5836
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=47005943;//kernel.MapEditorOLD2:5943
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=47006084;//kernel.MapEditorOLD2:6084
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=47006118;//kernel.MapEditorOLD2:6118
          _this.mode="copy";
          //$LASTPOS=47006140;//kernel.MapEditorOLD2:6140
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=47006173;//kernel.MapEditorOLD2:6173
        if (_this.mode!="get") {
          //$LASTPOS=47006199;//kernel.MapEditorOLD2:6199
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006305;//kernel.MapEditorOLD2:6305
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=47006323;//kernel.MapEditorOLD2:6323
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006454;//kernel.MapEditorOLD2:6454
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=47006472;//kernel.MapEditorOLD2:6472
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=47006585;//kernel.MapEditorOLD2:6585
            _this.my=_this.my+8;
          }
          //$LASTPOS=47006603;//kernel.MapEditorOLD2:6603
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=47006738;//kernel.MapEditorOLD2:6738
            _this.my=_this.my-8;
          }
          //$LASTPOS=47006756;//kernel.MapEditorOLD2:6756
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=47006799;//kernel.MapEditorOLD2:6799
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47006905;//kernel.MapEditorOLD2:6905
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=47006929;//kernel.MapEditorOLD2:6929
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=47007060;//kernel.MapEditorOLD2:7060
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=47007084;//kernel.MapEditorOLD2:7084
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=47007197;//kernel.MapEditorOLD2:7197
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=47007221;//kernel.MapEditorOLD2:7221
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=47007356;//kernel.MapEditorOLD2:7356
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=47007380;//kernel.MapEditorOLD2:7380
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=47007453;//kernel.MapEditorOLD2:7453
        if (_this.getkey("i")==1) {
          //$LASTPOS=47007482;//kernel.MapEditorOLD2:7482
          Tonyu.globals.$map.chipWidth+=4;
          //$LASTPOS=47007510;//kernel.MapEditorOLD2:7510
          Tonyu.globals.$map.chipHeight+=4;
          //$LASTPOS=47007539;//kernel.MapEditorOLD2:7539
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=47007566;//kernel.MapEditorOLD2:7566
          _this.panel.die();
          //$LASTPOS=47007588;//kernel.MapEditorOLD2:7588
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=47007688;//kernel.MapEditorOLD2:7688
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=47007723;//kernel.MapEditorOLD2:7723
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=47007759;//kernel.MapEditorOLD2:7759
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=47007796;//kernel.MapEditorOLD2:7796
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=47007854;//kernel.MapEditorOLD2:7854
        if (_this.getkey("o")==1) {
          //$LASTPOS=47007883;//kernel.MapEditorOLD2:7883
          Tonyu.globals.$map.chipWidth-=4;
          //$LASTPOS=47007911;//kernel.MapEditorOLD2:7911
          Tonyu.globals.$map.chipHeight-=4;
          //$LASTPOS=47007940;//kernel.MapEditorOLD2:7940
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=47007967;//kernel.MapEditorOLD2:7967
          _this.panel.die();
          //$LASTPOS=47007989;//kernel.MapEditorOLD2:7989
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=47008089;//kernel.MapEditorOLD2:8089
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=47008124;//kernel.MapEditorOLD2:8124
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=47008160;//kernel.MapEditorOLD2:8160
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=47008197;//kernel.MapEditorOLD2:8197
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=47008289;//kernel.MapEditorOLD2:8289
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=47008320;//kernel.MapEditorOLD2:8320
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=47008352;//kernel.MapEditorOLD2:8352
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=47008405;//kernel.MapEditorOLD2:8405
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=47008454;//kernel.MapEditorOLD2:8454
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=47008505;//kernel.MapEditorOLD2:8505
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=47008560;//kernel.MapEditorOLD2:8560
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=47008609;//kernel.MapEditorOLD2:8609
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=47008662;//kernel.MapEditorOLD2:8662
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=47008716;//kernel.MapEditorOLD2:8716
              _this.mode=_this.prevMode;
              //$LASTPOS=47008740;//kernel.MapEditorOLD2:8740
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47008774;//kernel.MapEditorOLD2:8774
              _this.print(_this.mode+" mode");
              //$LASTPOS=47008804;//kernel.MapEditorOLD2:8804
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=47008829;//kernel.MapEditorOLD2:8829
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=47008884;//kernel.MapEditorOLD2:8884
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=47008937;//kernel.MapEditorOLD2:8937
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=47008991;//kernel.MapEditorOLD2:8991
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=47009040;//kernel.MapEditorOLD2:9040
                  _this.mode="set";
                  //$LASTPOS=47009061;//kernel.MapEditorOLD2:9061
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=47009091;//kernel.MapEditorOLD2:9091
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=47009117;//kernel.MapEditorOLD2:9117
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
      
      //$LASTPOS=47000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=47000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=47000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=47000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditorOLD2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000116;//kernel.MapEditorOLD2:116
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=47000144;//kernel.MapEditorOLD2:144
            if (_this.fileList.exists()) {
              //$LASTPOS=47000168;//kernel.MapEditorOLD2:168
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=47000207;//kernel.MapEditorOLD2:207
                f=f+"";
                //$LASTPOS=47000220;//kernel.MapEditorOLD2:220
                _this.fNames=f.split("/");
                //$LASTPOS=47000246;//kernel.MapEditorOLD2:246
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=47000283;//kernel.MapEditorOLD2:283
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=47000308;//kernel.MapEditorOLD2:308
            if (!(_this.fileExist)) { __pc=11; break; }
            //$LASTPOS=47000328;//kernel.MapEditorOLD2:328
            _this.print("Load Data?: Y or N");
            //$LASTPOS=47000362;//kernel.MapEditorOLD2:362
          case 2:
            //$LASTPOS=47000384;//kernel.MapEditorOLD2:384
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=47000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=47000471;//kernel.MapEditorOLD2:471
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=47000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=47000559;//kernel.MapEditorOLD2:559
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=47000581;//kernel.MapEditorOLD2:581
            if (!(_this.loadMode)) { __pc=10; break; }
            //$LASTPOS=47000604;//kernel.MapEditorOLD2:604
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=47000669;//kernel.MapEditorOLD2:669
            if (_this.fileName) {
              //$LASTPOS=47000696;//kernel.MapEditorOLD2:696
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=47000760;//kernel.MapEditorOLD2:760
            if (!(_this.mapDataFile.obj())) { __pc=7; break; }
            {
              //$LASTPOS=47000796;//kernel.MapEditorOLD2:796
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=47000837;//kernel.MapEditorOLD2:837
              _this.loadedFile=_this.fileName;
            }
            __pc=9;break;
          case 7:
            //$LASTPOS=47000887;//kernel.MapEditorOLD2:887
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=47000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=47000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=47001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
          case 9:
            
            //$LASTPOS=47001069;//kernel.MapEditorOLD2:1069
            if (_this.baseData==undefined) {
              //$LASTPOS=47001107;//kernel.MapEditorOLD2:1107
              _this.print("Load failed");
              //$LASTPOS=47001142;//kernel.MapEditorOLD2:1142
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=47001173;//kernel.MapEditorOLD2:1173
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=47001218;//kernel.MapEditorOLD2:1218
                _this.mapData=_this.baseData[0];
                //$LASTPOS=47001252;//kernel.MapEditorOLD2:1252
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=47001288;//kernel.MapEditorOLD2:1288
                if (_this.baseData.length>2) {
                  //$LASTPOS=47001328;//kernel.MapEditorOLD2:1328
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=47001384;//kernel.MapEditorOLD2:1384
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10:
            
          case 11:
            
            //$LASTPOS=47001461;//kernel.MapEditorOLD2:1461
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=47001739;//kernel.MapEditorOLD2:1739
            if (! _this.loadMode) {
              //$LASTPOS=47001759;//kernel.MapEditorOLD2:1759
              _this.row=prompt("input row");
              //$LASTPOS=47001789;//kernel.MapEditorOLD2:1789
              _this.col=prompt("input col");
              //$LASTPOS=47001819;//kernel.MapEditorOLD2:1819
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=47001861;//kernel.MapEditorOLD2:1861
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=47001905;//kernel.MapEditorOLD2:1905
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=47001970;//kernel.MapEditorOLD2:1970
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47002001;//kernel.MapEditorOLD2:2001
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47002033;//kernel.MapEditorOLD2:2033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47002066;//kernel.MapEditorOLD2:2066
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=47002117;//kernel.MapEditorOLD2:2117
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=47002428;//kernel.MapEditorOLD2:2428
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=47002475;//kernel.MapEditorOLD2:2475
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=47002501;//kernel.MapEditorOLD2:2501
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=47002597;//kernel.MapEditorOLD2:2597
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47002628;//kernel.MapEditorOLD2:2628
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47002660;//kernel.MapEditorOLD2:2660
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47002693;//kernel.MapEditorOLD2:2693
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=47002743;//kernel.MapEditorOLD2:2743
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=47002799;//kernel.MapEditorOLD2:2799
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=47002856;//kernel.MapEditorOLD2:2856
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=47002908;//kernel.MapEditorOLD2:2908
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=47002961;//kernel.MapEditorOLD2:2961
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=47003043;//kernel.MapEditorOLD2:3043
            _this.counter=0;
            //$LASTPOS=47003055;//kernel.MapEditorOLD2:3055
            for (i = 0;  i<Tonyu.globals.$mp.row ; i++) {
              {
                //$LASTPOS=47003088;//kernel.MapEditorOLD2:3088
                for (j = 0;  j<Tonyu.globals.$mp.col ; j++) {
                  {
                    //$LASTPOS=47003125;//kernel.MapEditorOLD2:3125
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=47003169;//kernel.MapEditorOLD2:3169
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=47003191;//kernel.MapEditorOLD2:3191
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=47003205;//kernel.MapEditorOLD2:3205
            _this.mode="get";
            //$LASTPOS=47003218;//kernel.MapEditorOLD2:3218
            _this.prevMode="set";
            //$LASTPOS=47003235;//kernel.MapEditorOLD2:3235
            _this.mapp=0;
            //$LASTPOS=47003244;//kernel.MapEditorOLD2:3244
            _this.mx=- 40;
            //$LASTPOS=47003253;//kernel.MapEditorOLD2:3253
            _this.my=- 40;
            //$LASTPOS=47003262;//kernel.MapEditorOLD2:3262
            _this.chipX=- 40;
            //$LASTPOS=47003274;//kernel.MapEditorOLD2:3274
            _this.chipY=- 40;
            //$LASTPOS=47003286;//kernel.MapEditorOLD2:3286
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=47003315;//kernel.MapEditorOLD2:3315
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=47003346;//kernel.MapEditorOLD2:3346
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=47003369;//kernel.MapEditorOLD2:3369
          case 14:
            //$LASTPOS=47003387;//kernel.MapEditorOLD2:3387
            _this.p=_this.mapp;
            //$LASTPOS=47003400;//kernel.MapEditorOLD2:3400
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=47003539;//kernel.MapEditorOLD2:3539
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47003573;//kernel.MapEditorOLD2:3573
              _this.mode="erase";
              //$LASTPOS=47003596;//kernel.MapEditorOLD2:3596
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=47003629;//kernel.MapEditorOLD2:3629
            if (_this.getkey("s")==1) {
              //$LASTPOS=47003658;//kernel.MapEditorOLD2:3658
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47003692;//kernel.MapEditorOLD2:3692
              if (_this.mode=="set") {
                //$LASTPOS=47003722;//kernel.MapEditorOLD2:3722
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=47003765;//kernel.MapEditorOLD2:3765
                _this.mode="set";
                
              }
              //$LASTPOS=47003797;//kernel.MapEditorOLD2:3797
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=47003830;//kernel.MapEditorOLD2:3830
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=47003949;//kernel.MapEditorOLD2:3949
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47003983;//kernel.MapEditorOLD2:3983
              _this.mode="set";
              //$LASTPOS=47004004;//kernel.MapEditorOLD2:4004
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=47004037;//kernel.MapEditorOLD2:4037
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=47004158;//kernel.MapEditorOLD2:4158
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47004192;//kernel.MapEditorOLD2:4192
              _this.mode="setOn";
              //$LASTPOS=47004215;//kernel.MapEditorOLD2:4215
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=47004341;//kernel.MapEditorOLD2:4341
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=47004482;//kernel.MapEditorOLD2:4482
              if (_this.mode!="get") {
                //$LASTPOS=47004512;//kernel.MapEditorOLD2:4512
                _this.prevMode=_this.mode;
                //$LASTPOS=47004540;//kernel.MapEditorOLD2:4540
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=47004576;//kernel.MapEditorOLD2:4576
                _this.mode="get";
                //$LASTPOS=47004601;//kernel.MapEditorOLD2:4601
                _this.chipX=- 40;
                //$LASTPOS=47004625;//kernel.MapEditorOLD2:4625
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=47004665;//kernel.MapEditorOLD2:4665
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=47004703;//kernel.MapEditorOLD2:4703
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=47004738;//kernel.MapEditorOLD2:4738
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=47004771;//kernel.MapEditorOLD2:4771
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=47004927;//kernel.MapEditorOLD2:4927
              if (_this.loadedFile) {
                //$LASTPOS=47004956;//kernel.MapEditorOLD2:4956
                _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
                
              } else {
                //$LASTPOS=47005044;//kernel.MapEditorOLD2:5044
                _this.saveFileName=prompt("input json file(*.json)","map.json");
                
              }
              //$LASTPOS=47005544;//kernel.MapEditorOLD2:5544
              if (_this.saveFileName) {
                //$LASTPOS=47005575;//kernel.MapEditorOLD2:5575
                _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
                //$LASTPOS=47005637;//kernel.MapEditorOLD2:5637
                _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
                //$LASTPOS=47005799;//kernel.MapEditorOLD2:5799
                _this.saveDataFile.obj(_this.data);
                //$LASTPOS=47005836;//kernel.MapEditorOLD2:5836
                _this.print(_this.saveFileName+" Saved");
                
              }
              
            }
            //$LASTPOS=47005943;//kernel.MapEditorOLD2:5943
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=47006084;//kernel.MapEditorOLD2:6084
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=47006118;//kernel.MapEditorOLD2:6118
              _this.mode="copy";
              //$LASTPOS=47006140;//kernel.MapEditorOLD2:6140
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=47006173;//kernel.MapEditorOLD2:6173
            if (_this.mode!="get") {
              //$LASTPOS=47006199;//kernel.MapEditorOLD2:6199
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006305;//kernel.MapEditorOLD2:6305
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=47006323;//kernel.MapEditorOLD2:6323
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006454;//kernel.MapEditorOLD2:6454
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=47006472;//kernel.MapEditorOLD2:6472
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=47006585;//kernel.MapEditorOLD2:6585
                _this.my=_this.my+8;
              }
              //$LASTPOS=47006603;//kernel.MapEditorOLD2:6603
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=47006738;//kernel.MapEditorOLD2:6738
                _this.my=_this.my-8;
              }
              //$LASTPOS=47006756;//kernel.MapEditorOLD2:6756
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=47006799;//kernel.MapEditorOLD2:6799
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47006905;//kernel.MapEditorOLD2:6905
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=47006929;//kernel.MapEditorOLD2:6929
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=47007060;//kernel.MapEditorOLD2:7060
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=47007084;//kernel.MapEditorOLD2:7084
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=47007197;//kernel.MapEditorOLD2:7197
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=47007221;//kernel.MapEditorOLD2:7221
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=47007356;//kernel.MapEditorOLD2:7356
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=47007380;//kernel.MapEditorOLD2:7380
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=47007453;//kernel.MapEditorOLD2:7453
            if (_this.getkey("i")==1) {
              //$LASTPOS=47007482;//kernel.MapEditorOLD2:7482
              Tonyu.globals.$map.chipWidth+=4;
              //$LASTPOS=47007510;//kernel.MapEditorOLD2:7510
              Tonyu.globals.$map.chipHeight+=4;
              //$LASTPOS=47007539;//kernel.MapEditorOLD2:7539
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=47007566;//kernel.MapEditorOLD2:7566
              _this.panel.die();
              //$LASTPOS=47007588;//kernel.MapEditorOLD2:7588
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=47007688;//kernel.MapEditorOLD2:7688
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47007723;//kernel.MapEditorOLD2:7723
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47007759;//kernel.MapEditorOLD2:7759
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47007796;//kernel.MapEditorOLD2:7796
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=47007854;//kernel.MapEditorOLD2:7854
            if (_this.getkey("o")==1) {
              //$LASTPOS=47007883;//kernel.MapEditorOLD2:7883
              Tonyu.globals.$map.chipWidth-=4;
              //$LASTPOS=47007911;//kernel.MapEditorOLD2:7911
              Tonyu.globals.$map.chipHeight-=4;
              //$LASTPOS=47007940;//kernel.MapEditorOLD2:7940
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=47007967;//kernel.MapEditorOLD2:7967
              _this.panel.die();
              //$LASTPOS=47007989;//kernel.MapEditorOLD2:7989
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=47008089;//kernel.MapEditorOLD2:8089
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=47008124;//kernel.MapEditorOLD2:8124
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=47008160;//kernel.MapEditorOLD2:8160
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=47008197;//kernel.MapEditorOLD2:8197
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=47008289;//kernel.MapEditorOLD2:8289
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=47008320;//kernel.MapEditorOLD2:8320
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=47008352;//kernel.MapEditorOLD2:8352
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15; break; }
            {
              //$LASTPOS=47008405;//kernel.MapEditorOLD2:8405
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=47008454;//kernel.MapEditorOLD2:8454
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=47008505;//kernel.MapEditorOLD2:8505
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16; break; }
            {
              //$LASTPOS=47008560;//kernel.MapEditorOLD2:8560
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=47008609;//kernel.MapEditorOLD2:8609
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18; break; }
            //$LASTPOS=47008662;//kernel.MapEditorOLD2:8662
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=47008716;//kernel.MapEditorOLD2:8716
            _this.mode=_this.prevMode;
            //$LASTPOS=47008740;//kernel.MapEditorOLD2:8740
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=47008774;//kernel.MapEditorOLD2:8774
            _this.print(_this.mode+" mode");
            //$LASTPOS=47008804;//kernel.MapEditorOLD2:8804
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=47008829;//kernel.MapEditorOLD2:8829
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19; break; }
            {
              //$LASTPOS=47008884;//kernel.MapEditorOLD2:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=47008937;//kernel.MapEditorOLD2:8937
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21; break; }
            //$LASTPOS=47008991;//kernel.MapEditorOLD2:8991
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=47009040;//kernel.MapEditorOLD2:9040
            _this.mode="set";
            //$LASTPOS=47009061;//kernel.MapEditorOLD2:9061
            _this.print(_this.mode+" mode");
            //$LASTPOS=47009091;//kernel.MapEditorOLD2:9091
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=47009117;//kernel.MapEditorOLD2:9117
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
      
      //$LASTPOS=47009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=47009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=47009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=47009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=47009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=47010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=47010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=47010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditorOLD2_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=47009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=47009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=47009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=47009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=47009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=47009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=47009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=47009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=47010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=47010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=47010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=47010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=47010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=47010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=47010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=47010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=47011018;//kernel.MapEditorOLD2:11018
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
      
      //$LASTPOS=48001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=48003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=48003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=48003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=48001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=48003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=48003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=48003502;//kernel.Pad:3502
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
      
      //$LASTPOS=48000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=48000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=48000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=48000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=48000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=48000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=48000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=48000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=48000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=48000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=48001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=48001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=48001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=48001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=48001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=48001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=48001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=48001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=48001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=48001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=48001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=48001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=48001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=48001383;//kernel.Pad:1383
      for (i = 0;  i<5 ; i++) {
        {
          //$LASTPOS=48001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=48001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=48001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=48001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=48001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=48001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=48001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=48001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=48001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=48001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=48001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=48002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=48002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=48002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=48002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=48002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=48002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=48002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=48002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=48002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=48002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=48002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=48002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=48002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=48002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=48002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=48002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=48002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=48002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=48002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=48002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=48002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=48002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=48002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=48002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=48002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=48002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=48002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=48002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=48002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=48002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=48002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=48002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=48002739;//kernel.Pad:2739
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
      
      //$LASTPOS=48001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=48001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=48001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=48001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=48001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=48001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=48001383;//kernel.Pad:1383
      for (i = 0;  i<5 ; i++) {
        {
          //$LASTPOS=48001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=48001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=48001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=48001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=48001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=48001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=48001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=48001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=48001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=48001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=48001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=48002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=48002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=48002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=48002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=48002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=48002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=48002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=48002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=48002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=48002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=48002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=48002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=48002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=48002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=48002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=48002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=48002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=48002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=48002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=48002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=48002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=48002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=48002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=48002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=48002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=48002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=48002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=48002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=48002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=48002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=48002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=48002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=48002739;//kernel.Pad:2739
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
      
      
      //$LASTPOS=48002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=48002968;//kernel.Pad:2968
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
      
      
      //$LASTPOS=48002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=48002968;//kernel.Pad:2968
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
      
      
      //$LASTPOS=48003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=48003191;//kernel.Pad:3191
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
      
      
      //$LASTPOS=48003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=48003191;//kernel.Pad:3191
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
      
      //$LASTPOS=49002151;//kernel.Boot:2151
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=49002164;//kernel.Boot:2164
      _this.initEvents();
      //$LASTPOS=49002179;//kernel.Boot:2179
      _this.loadPlugins();
      //$LASTPOS=49002195;//kernel.Boot:2195
      _this.initSprites();
      //$LASTPOS=49002211;//kernel.Boot:2211
      _this.initSounds();
      //$LASTPOS=49002226;//kernel.Boot:2226
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=49002257;//kernel.Boot:2257
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=49002294;//kernel.Boot:2294
      _this.initThread();
      //$LASTPOS=49002311;//kernel.Boot:2311
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=49002340;//kernel.Boot:2340
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=49002357;//kernel.Boot:2357
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=49002374;//kernel.Boot:2374
      Tonyu.globals.$Math=Math;
      //$LASTPOS=49002387;//kernel.Boot:2387
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=49002497;//kernel.Boot:2497
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=49002521;//kernel.Boot:2521
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=49002661;//kernel.Boot:2661
      _this.initFPSParams();
      //$LASTPOS=49002681;//kernel.Boot:2681
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=49002702;//kernel.Boot:2702
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=49002723;//kernel.Boot:2723
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=49002761;//kernel.Boot:2761
        SplashScreen.hide();
      }
      //$LASTPOS=49002783;//kernel.Boot:2783
      while (true) {
        //$LASTPOS=49002800;//kernel.Boot:2800
        if (_this._useRAF) {
          //$LASTPOS=49002813;//kernel.Boot:2813
          _this.loopRAF();
        } else {
          //$LASTPOS=49002831;//kernel.Boot:2831
          _this.loopTimer();
        }
        //$LASTPOS=49002849;//kernel.Boot:2849
        _this.measureFps();
        //$LASTPOS=49002865;//kernel.Boot:2865
        _this.handlePause();
        
      }
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49002151;//kernel.Boot:2151
      Tonyu.globals.$Boot=_this;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49002164;//kernel.Boot:2164
            _this.fiber$initEvents(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=49002179;//kernel.Boot:2179
            _this.fiber$loadPlugins(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=49002195;//kernel.Boot:2195
            _this.fiber$initSprites(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=49002211;//kernel.Boot:2211
            _this.fiber$initSounds(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=49002226;//kernel.Boot:2226
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=49002257;//kernel.Boot:2257
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=49002294;//kernel.Boot:2294
            _this.fiber$initThread(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=49002311;//kernel.Boot:2311
            Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
            //$LASTPOS=49002340;//kernel.Boot:2340
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=49002357;//kernel.Boot:2357
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=49002374;//kernel.Boot:2374
            Tonyu.globals.$Math=Math;
            //$LASTPOS=49002387;//kernel.Boot:2387
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=49002497;//kernel.Boot:2497
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=49002521;//kernel.Boot:2521
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=49002661;//kernel.Boot:2661
            _this.initFPSParams();
            //$LASTPOS=49002681;//kernel.Boot:2681
            Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
            //$LASTPOS=49002702;//kernel.Boot:2702
            Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
            //$LASTPOS=49002723;//kernel.Boot:2723
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=49002761;//kernel.Boot:2761
              SplashScreen.hide();
            }
            //$LASTPOS=49002783;//kernel.Boot:2783
          case 6:
            //$LASTPOS=49002800;//kernel.Boot:2800
            if (!(_this._useRAF)) { __pc=8; break; }
            //$LASTPOS=49002813;//kernel.Boot:2813
            _this.fiber$loopRAF(_thread);
            __pc=7;return;
          case 7:
            
            __pc=10;break;
          case 8:
            //$LASTPOS=49002831;//kernel.Boot:2831
            _this.fiber$loopTimer(_thread);
            __pc=9;return;
          case 9:
            
          case 10:
            
            //$LASTPOS=49002849;//kernel.Boot:2849
            _this.measureFps();
            //$LASTPOS=49002865;//kernel.Boot:2865
            _this.fiber$handlePause(_thread);
            __pc=11;return;
          case 11:
            
            __pc=6;break;
          case 12:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Boot_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49000237;//kernel.Boot:237
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49000273;//kernel.Boot:273
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
            //$LASTPOS=49000273;//kernel.Boot:273
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
      
      //$LASTPOS=49000354;//kernel.Boot:354
      _this.print("Loading plugins..");
      //$LASTPOS=49000388;//kernel.Boot:388
      _this.runAsync((function anonymous_397(r) {
        
        //$LASTPOS=49000413;//kernel.Boot:413
        Tonyu.globals.$currentProject.loadPlugins(r);
      }));
    },
    fiber$loadPlugins :function _trc_Boot_f_loadPlugins(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49000354;//kernel.Boot:354
      _this.print("Loading plugins..");
      
      _thread.enter(function _trc_Boot_ent_loadPlugins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49000388;//kernel.Boot:388
            _this.fiber$runAsync(_thread, (function anonymous_397(r) {
              
              //$LASTPOS=49000413;//kernel.Boot:413
              Tonyu.globals.$currentProject.loadPlugins(r);
            }));
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
      var _it_331;
      
      //$LASTPOS=49000479;//kernel.Boot:479
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=49000508;//kernel.Boot:508
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=49000542;//kernel.Boot:542
      _this.cvj=$("canvas");
      //$LASTPOS=49000564;//kernel.Boot:564
      if (Tonyu.noviceMode) {
        //$LASTPOS=49000597;//kernel.Boot:597
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=49000681;//kernel.Boot:681
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
        
      }
      //$LASTPOS=49000754;//kernel.Boot:754
      _this.drawFrame();
      //$LASTPOS=49000772;//kernel.Boot:772
      _this.print("Loading pats..");
      //$LASTPOS=49000803;//kernel.Boot:803
      rs = Tonyu.globals.$currentProject.getResource();
      
      //$LASTPOS=49000858;//kernel.Boot:858
      r=_this.runAsync((function anonymous_869(succ) {
        
        //$LASTPOS=49000888;//kernel.Boot:888
        ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir()});
      }));
      //$LASTPOS=49000989;//kernel.Boot:989
      Tonyu.globals.$Sprites.setImageList(r[0]);
      //$LASTPOS=49001023;//kernel.Boot:1023
      _it_331=Tonyu.iterator(r[0].names,2);
      while(_it_331.next()) {
        name=_it_331[0];
        val=_it_331[1];
        
        //$LASTPOS=49001067;//kernel.Boot:1067
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=49001107;//kernel.Boot:1107
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
      var _it_331;
      
      //$LASTPOS=49000479;//kernel.Boot:479
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=49000508;//kernel.Boot:508
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=49000542;//kernel.Boot:542
      _this.cvj=$("canvas");
      //$LASTPOS=49000564;//kernel.Boot:564
      if (Tonyu.noviceMode) {
        //$LASTPOS=49000597;//kernel.Boot:597
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=49000681;//kernel.Boot:681
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
        
      }
      //$LASTPOS=49000754;//kernel.Boot:754
      _this.drawFrame();
      //$LASTPOS=49000772;//kernel.Boot:772
      _this.print("Loading pats..");
      //$LASTPOS=49000803;//kernel.Boot:803
      rs = Tonyu.globals.$currentProject.getResource();
      
      
      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49000858;//kernel.Boot:858
            _this.fiber$runAsync(_thread, (function anonymous_869(succ) {
              
              //$LASTPOS=49000888;//kernel.Boot:888
              ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir()});
            }));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=49000989;//kernel.Boot:989
            Tonyu.globals.$Sprites.setImageList(r[0]);
            //$LASTPOS=49001023;//kernel.Boot:1023
            _it_331=Tonyu.iterator(r[0].names,2);
            while(_it_331.next()) {
              name=_it_331[0];
              val=_it_331[1];
              
              //$LASTPOS=49001067;//kernel.Boot:1067
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=49001107;//kernel.Boot:1107
            _this.print("Loading pats done.");
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSounds :function _trc_Boot_initSounds() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49001162;//kernel.Boot:1162
      _this.print("Loading sounds...");
      //$LASTPOS=49001196;//kernel.Boot:1196
      _this.initT2MediaPlayer();
      //$LASTPOS=49001222;//kernel.Boot:1222
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=49001261;//kernel.Boot:1261
      _this.print("Loading sounds done.");
      //$LASTPOS=49001298;//kernel.Boot:1298
      _this.on("stop",(function anonymous_1308() {
        
        //$LASTPOS=49001320;//kernel.Boot:1320
        _this.clearSEData();
      }));
      //$LASTPOS=49001348;//kernel.Boot:1348
      Tonyu.globals.$sound=_this;
    },
    fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49001162;//kernel.Boot:1162
      _this.print("Loading sounds...");
      
      _thread.enter(function _trc_Boot_ent_initSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49001196;//kernel.Boot:1196
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=49001222;//kernel.Boot:1222
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=49001261;//kernel.Boot:1261
            _this.print("Loading sounds done.");
            //$LASTPOS=49001298;//kernel.Boot:1298
            _this.on("stop",(function anonymous_1308() {
              
              //$LASTPOS=49001320;//kernel.Boot:1320
              _this.clearSEData();
            }));
            //$LASTPOS=49001348;//kernel.Boot:1348
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
      
      //$LASTPOS=49001402;//kernel.Boot:1402
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=49001448;//kernel.Boot:1448
      mainClassName = o.run.mainClass;
      //$LASTPOS=49001488;//kernel.Boot:1488
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=49001529;//kernel.Boot:1529
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=49001575;//kernel.Boot:1575
      if (! _this.mainClass) {
        //$LASTPOS=49001602;//kernel.Boot:1602
        TError(mainClassName+" というクラスはありません","",0).raise();
        
      }
      //$LASTPOS=49001678;//kernel.Boot:1678
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=49001719;//kernel.Boot:1719
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot_f_initThread(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=49001402;//kernel.Boot:1402
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=49001448;//kernel.Boot:1448
      mainClassName = o.run.mainClass;
      //$LASTPOS=49001488;//kernel.Boot:1488
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=49001529;//kernel.Boot:1529
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=49001575;//kernel.Boot:1575
      if (! _this.mainClass) {
        //$LASTPOS=49001602;//kernel.Boot:1602
        TError(mainClassName+" というクラスはありません","",0).raise();
        
      }
      //$LASTPOS=49001678;//kernel.Boot:1678
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=49001719;//kernel.Boot:1719
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49001755;//kernel.Boot:1755
      _this.fireEvent("stop");
      //$LASTPOS=49001779;//kernel.Boot:1779
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49001755;//kernel.Boot:1755
      _this.fireEvent("stop");
      //$LASTPOS=49001779;//kernel.Boot:1779
      _this.die();
      
      _thread.retVal=_this;return;
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      "use strict";
      var _this=this;
      var th;
      
      //$LASTPOS=49001824;//kernel.Boot:1824
      method=method||"main";
      //$LASTPOS=49001852;//kernel.Boot:1852
      args=args||[];
      //$LASTPOS=49001872;//kernel.Boot:1872
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=49001924;//kernel.Boot:1924
      obj.setThreadGroup(_this);
      //$LASTPOS=49001955;//kernel.Boot:1955
      th.setThreadGroup(obj);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=49001824;//kernel.Boot:1824
      method=method||"main";
      //$LASTPOS=49001852;//kernel.Boot:1852
      args=args||[];
      //$LASTPOS=49001872;//kernel.Boot:1872
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=49001924;//kernel.Boot:1924
      obj.setThreadGroup(_this);
      //$LASTPOS=49001955;//kernel.Boot:1955
      th.setThreadGroup(obj);
      _thread.retVal=th;return;
      
      
      _thread.retVal=_this;return;
    },
    initEvents :function _trc_Boot_initEvents() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49002020;//kernel.Boot:2020
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
    },
    fiber$initEvents :function _trc_Boot_f_initEvents(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49002020;//kernel.Boot:2020
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=49002899;//kernel.Boot:2899
      start = _this.now();
      //$LASTPOS=49002926;//kernel.Boot:2926
      time = 1000/_this._fps;
      //$LASTPOS=49002965;//kernel.Boot:2965
      moves = 0;
      //$LASTPOS=49002980;//kernel.Boot:2980
      while (moves<_this.frameSkip) {
        //$LASTPOS=49003008;//kernel.Boot:3008
        _this.moveFrame();
        //$LASTPOS=49003024;//kernel.Boot:3024
        moves++;
        //$LASTPOS=49003036;//kernel.Boot:3036
        if (moves<_this.frameSkip) {
          //$LASTPOS=49003057;//kernel.Boot:3057
          _this.afterDraw(false);
        }
        
      }
      //$LASTPOS=49003081;//kernel.Boot:3081
      _this.drawFrame();
      //$LASTPOS=49003096;//kernel.Boot:3096
      _this.afterDraw(true);
      //$LASTPOS=49003115;//kernel.Boot:3115
      _this.waitRAF();
      //$LASTPOS=49003134;//kernel.Boot:3134
      elapsed=_this.now()-start;
      //$LASTPOS=49003162;//kernel.Boot:3162
      cnt = _this.rafCount-1;
      //$LASTPOS=49003187;//kernel.Boot:3187
      if (_this.rafResolution) {
        //$LASTPOS=49003258;//kernel.Boot:3258
        rafResMS = time/_this.rafResolution;
        //$LASTPOS=49003336;//kernel.Boot:3336
        elapsedRAF = _this.floor(elapsed/rafResMS+0.5);
        //$LASTPOS=49003396;//kernel.Boot:3396
        if (elapsedRAF>1) {
          //$LASTPOS=49003414;//kernel.Boot:3414
          cnt-=(elapsedRAF-1);
        }
        
      }
      //$LASTPOS=49003472;//kernel.Boot:3472
      _this.rafCntDebug=cnt;
      //$LASTPOS=49003491;//kernel.Boot:3491
      while (cnt>0) {
        //$LASTPOS=49003509;//kernel.Boot:3509
        _this.waitRAF();
        //$LASTPOS=49003523;//kernel.Boot:3523
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
      
      //$LASTPOS=49002899;//kernel.Boot:2899
      start = _this.now();
      //$LASTPOS=49002926;//kernel.Boot:2926
      time = 1000/_this._fps;
      //$LASTPOS=49002965;//kernel.Boot:2965
      moves = 0;
      
      _thread.enter(function _trc_Boot_ent_loopRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49002980;//kernel.Boot:2980
          case 1:
            if (!(moves<_this.frameSkip)) { __pc=2; break; }
            {
              //$LASTPOS=49003008;//kernel.Boot:3008
              _this.moveFrame();
              //$LASTPOS=49003024;//kernel.Boot:3024
              moves++;
              //$LASTPOS=49003036;//kernel.Boot:3036
              if (moves<_this.frameSkip) {
                //$LASTPOS=49003057;//kernel.Boot:3057
                _this.afterDraw(false);
              }
            }
            __pc=1;break;
          case 2:
            
            //$LASTPOS=49003081;//kernel.Boot:3081
            _this.drawFrame();
            //$LASTPOS=49003096;//kernel.Boot:3096
            _this.afterDraw(true);
            //$LASTPOS=49003115;//kernel.Boot:3115
            _this.fiber$waitRAF(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=49003134;//kernel.Boot:3134
            elapsed=_this.now()-start;
            //$LASTPOS=49003162;//kernel.Boot:3162
            cnt = _this.rafCount-1;
            //$LASTPOS=49003187;//kernel.Boot:3187
            if (_this.rafResolution) {
              //$LASTPOS=49003258;//kernel.Boot:3258
              rafResMS = time/_this.rafResolution;
              //$LASTPOS=49003336;//kernel.Boot:3336
              elapsedRAF = _this.floor(elapsed/rafResMS+0.5);
              //$LASTPOS=49003396;//kernel.Boot:3396
              if (elapsedRAF>1) {
                //$LASTPOS=49003414;//kernel.Boot:3414
                cnt-=(elapsedRAF-1);
              }
              
            }
            //$LASTPOS=49003472;//kernel.Boot:3472
            _this.rafCntDebug=cnt;
            //$LASTPOS=49003491;//kernel.Boot:3491
          case 4:
            if (!(cnt>0)) { __pc=6; break; }
            //$LASTPOS=49003509;//kernel.Boot:3509
            _this.fiber$waitRAF(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=49003523;//kernel.Boot:3523
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
      
      //$LASTPOS=49003559;//kernel.Boot:3559
      _this.waitFor(Tonyu.animationFrame());
      //$LASTPOS=49003597;//kernel.Boot:3597
      rafStart = _this.now();
      //$LASTPOS=49003622;//kernel.Boot:3622
      if (_this.pRafStart) {
        //$LASTPOS=49003637;//kernel.Boot:3637
        _this.detectRAFResolution(rafStart-_this.pRafStart);
      }
      //$LASTPOS=49003683;//kernel.Boot:3683
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
            //$LASTPOS=49003559;//kernel.Boot:3559
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=1;return;
          case 1:
            
            //$LASTPOS=49003597;//kernel.Boot:3597
            rafStart = _this.now();
            //$LASTPOS=49003622;//kernel.Boot:3622
            if (_this.pRafStart) {
              //$LASTPOS=49003637;//kernel.Boot:3637
              _this.detectRAFResolution(rafStart-_this.pRafStart);
            }
            //$LASTPOS=49003683;//kernel.Boot:3683
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
      
      //$LASTPOS=49003742;//kernel.Boot:3742
      if (_this.rafResolution) {
        return _this;
      }
      //$LASTPOS=49003825;//kernel.Boot:3825
      time = 1000/_this._fps;
      //$LASTPOS=49003847;//kernel.Boot:3847
      reso = time/t;
      //$LASTPOS=49003933;//kernel.Boot:3933
      if (reso>1) {
        //$LASTPOS=49003945;//kernel.Boot:3945
        reso=_this.floor(reso+0.5);
      } else {
        //$LASTPOS=49003986;//kernel.Boot:3986
        reso=1/_this.floor(1/reso+0.5);
      }
      //$LASTPOS=49004065;//kernel.Boot:4065
      _this.rafRess=_this.rafRess||{};
      //$LASTPOS=49004088;//kernel.Boot:4088
      if ((_this.rafRess[reso+""]=(_this.rafRess[reso+""]||0)+1)>10) {
        //$LASTPOS=49004150;//kernel.Boot:4150
        _this.rafResolution=reso;
        //$LASTPOS=49004173;//kernel.Boot:4173
        if (reso<1) {
          //$LASTPOS=49004191;//kernel.Boot:4191
          _this.frameSkip=_this.floor(1/reso+0.5);
          //$LASTPOS=49004224;//kernel.Boot:4224
          _this.rafCount=1;
          
        } else {
          //$LASTPOS=49004252;//kernel.Boot:4252
          _this.rafCount=reso;
          //$LASTPOS=49004271;//kernel.Boot:4271
          _this.frameSkip=1;
          
        }
        
      }
    },
    measureRAFInterval :function _trc_Boot_measureRAFInterval() {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      //$LASTPOS=49004325;//kernel.Boot:4325
      if (Tonyu.globals.$RAFInterval) {
        return _this;
      }
      //$LASTPOS=49004353;//kernel.Boot:4353
      s = _this.now();
      //$LASTPOS=49004368;//kernel.Boot:4368
      for (i = 0;  i<20 ; i++) {
        {
          //$LASTPOS=49004399;//kernel.Boot:4399
          _this.waitFor(Tonyu.animationFrame());
        }
      }
      //$LASTPOS=49004438;//kernel.Boot:4438
      Tonyu.globals.$RAFInterval=(_this.now()-s)/20;
    },
    fiber$measureRAFInterval :function _trc_Boot_f_measureRAFInterval(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var i;
      
      //$LASTPOS=49004325;//kernel.Boot:4325
      if (Tonyu.globals.$RAFInterval) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=49004353;//kernel.Boot:4353
      s = _this.now();
      
      _thread.enter(function _trc_Boot_ent_measureRAFInterval(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49004368;//kernel.Boot:4368
            //$LASTPOS=49004373;//kernel.Boot:4373
            i = 0;;
          case 1:
            if (!(i<20)) { __pc=4; break; }
            //$LASTPOS=49004399;//kernel.Boot:4399
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=2;return;
          case 2:
            
          case 3:
            i++;
            __pc=1;break;
          case 4:
            
            //$LASTPOS=49004438;//kernel.Boot:4438
            Tonyu.globals.$RAFInterval=(_this.now()-s)/20;
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopTimer :function _trc_Boot_loopTimer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49004489;//kernel.Boot:4489
      _this.moveFrame();
      //$LASTPOS=49004507;//kernel.Boot:4507
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=49004535;//kernel.Boot:4535
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=49004589;//kernel.Boot:4589
        _this.doDraw=true;
        //$LASTPOS=49004611;//kernel.Boot:4611
        _this.resetDeadLine();
        
      }
      //$LASTPOS=49004640;//kernel.Boot:4640
      if (_this.doDraw) {
        //$LASTPOS=49004677;//kernel.Boot:4677
        _this.drawFrame();
        //$LASTPOS=49004699;//kernel.Boot:4699
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=49004738;//kernel.Boot:4738
        _this.frameSkipped++;
        
      }
      //$LASTPOS=49004766;//kernel.Boot:4766
      _this.afterDraw(_this.doDraw);
      //$LASTPOS=49004790;//kernel.Boot:4790
      _this.waitFrame();
    },
    fiber$loopTimer :function _trc_Boot_f_loopTimer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49004489;//kernel.Boot:4489
      _this.moveFrame();
      //$LASTPOS=49004507;//kernel.Boot:4507
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=49004535;//kernel.Boot:4535
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=49004589;//kernel.Boot:4589
        _this.doDraw=true;
        //$LASTPOS=49004611;//kernel.Boot:4611
        _this.resetDeadLine();
        
      }
      //$LASTPOS=49004640;//kernel.Boot:4640
      if (_this.doDraw) {
        //$LASTPOS=49004677;//kernel.Boot:4677
        _this.drawFrame();
        //$LASTPOS=49004699;//kernel.Boot:4699
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=49004738;//kernel.Boot:4738
        _this.frameSkipped++;
        
      }
      //$LASTPOS=49004766;//kernel.Boot:4766
      _this.afterDraw(_this.doDraw);
      
      _thread.enter(function _trc_Boot_ent_loopTimer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49004790;//kernel.Boot:4790
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
      
      //$LASTPOS=49004838;//kernel.Boot:4838
      while (_this.paused) {
        //$LASTPOS=49004863;//kernel.Boot:4863
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=49004899;//kernel.Boot:4899
        if (! _this.paused) {
          //$LASTPOS=49004912;//kernel.Boot:4912
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
            //$LASTPOS=49004838;//kernel.Boot:4838
          case 1:
            if (!(_this.paused)) { __pc=3; break; }
            //$LASTPOS=49004863;//kernel.Boot:4863
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=49004899;//kernel.Boot:4899
            if (! _this.paused) {
              //$LASTPOS=49004912;//kernel.Boot:4912
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
      
      //$LASTPOS=49004964;//kernel.Boot:4964
      s = _this.now();
      //$LASTPOS=49004982;//kernel.Boot:4982
      Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=49005023;//kernel.Boot:5023
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=49005059;//kernel.Boot:5059
      Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=49005100;//kernel.Boot:5100
      Tonyu.globals.$Screen.draw();
      //$LASTPOS=49005121;//kernel.Boot:5121
      _this.drawTime=_this.now()-s;
      //$LASTPOS=49005144;//kernel.Boot:5144
      _this.fps_fpsCnt++;
    },
    moveFrame :function _trc_Boot_moveFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=49005187;//kernel.Boot:5187
      s = _this.now();
      //$LASTPOS=49005205;//kernel.Boot:5205
      _this.scheduler.stepsAll();
      //$LASTPOS=49005232;//kernel.Boot:5232
      Tonyu.globals.$Keys.update();
      //$LASTPOS=49005253;//kernel.Boot:5253
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=49005281;//kernel.Boot:5281
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=49005314;//kernel.Boot:5314
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=49005349;//kernel.Boot:5349
      _this.moveTime=_this.now()-s;
      //$LASTPOS=49005372;//kernel.Boot:5372
      _this.fps_rpsCnt++;
    },
    afterDraw :function _trc_Boot_afterDraw(drawn) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49005475;//kernel.Boot:5475
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=49005501;//kernel.Boot:5501
      Tonyu.globals.$Sprites.removeOneframes(drawn);
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49005588;//kernel.Boot:5588
      _this._fps=30;
      //$LASTPOS=49005604;//kernel.Boot:5604
      _this.maxFrameSkip=5;
      //$LASTPOS=49005627;//kernel.Boot:5627
      _this.minFrameSkip=1;
      //$LASTPOS=49005677;//kernel.Boot:5677
      _this.frameCnt=0;
      //$LASTPOS=49005696;//kernel.Boot:5696
      _this.resetDeadLine();
      //$LASTPOS=49005718;//kernel.Boot:5718
      _this.lastMeasured=_this.now();
      //$LASTPOS=49005743;//kernel.Boot:5743
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
      //$LASTPOS=49005789;//kernel.Boot:5789
      _this.drawTime=5;
      //$LASTPOS=49005800;//kernel.Boot:5800
      _this.moveTime=5;
      //$LASTPOS=49005814;//kernel.Boot:5814
      _this.rafAccept=1.1;
      //$LASTPOS=49005831;//kernel.Boot:5831
      _this.rafInterval=1000/60;
      //$LASTPOS=49005854;//kernel.Boot:5854
      _this._useRAF=true;
      //$LASTPOS=49005870;//kernel.Boot:5870
      _this.rafCount=2;
      //$LASTPOS=49005884;//kernel.Boot:5884
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
      
      //$LASTPOS=49005986;//kernel.Boot:5986
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=49006017;//kernel.Boot:6017
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      "use strict";
      var _this=this;
      var wt;
      
      //$LASTPOS=49006061;//kernel.Boot:6061
      wt = _this.deadLine-_this.now();
      //$LASTPOS=49006089;//kernel.Boot:6089
      if (wt<1) {
        //$LASTPOS=49006110;//kernel.Boot:6110
        if (wt<- 1000) {
          //$LASTPOS=49006124;//kernel.Boot:6124
          _this.resetDeadLine();
        }
        //$LASTPOS=49006150;//kernel.Boot:6150
        wt=1;
        
      }
      //$LASTPOS=49006168;//kernel.Boot:6168
      wt=_this.floor(wt);
      //$LASTPOS=49006187;//kernel.Boot:6187
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=49006220;//kernel.Boot:6220
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=49006061;//kernel.Boot:6061
      wt = _this.deadLine-_this.now();
      //$LASTPOS=49006089;//kernel.Boot:6089
      if (wt<1) {
        //$LASTPOS=49006110;//kernel.Boot:6110
        if (wt<- 1000) {
          //$LASTPOS=49006124;//kernel.Boot:6124
          _this.resetDeadLine();
        }
        //$LASTPOS=49006150;//kernel.Boot:6150
        wt=1;
        
      }
      //$LASTPOS=49006168;//kernel.Boot:6168
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49006187;//kernel.Boot:6187
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=49006220;//kernel.Boot:6220
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
      
      //$LASTPOS=49006377;//kernel.Boot:6377
      if (_this._fps!=fps) {
        //$LASTPOS=49006397;//kernel.Boot:6397
        _this.rafRess={};
        //$LASTPOS=49006412;//kernel.Boot:6412
        _this.rafResolution=null;
        //$LASTPOS=49006435;//kernel.Boot:6435
        _this.frameSkip=1;
        //$LASTPOS=49006451;//kernel.Boot:6451
        _this.rafCnt=_this.floor(60/fps+0.5);
        
      }
      //$LASTPOS=49006486;//kernel.Boot:6486
      _this._fps=fps;
      //$LASTPOS=49006503;//kernel.Boot:6503
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=49006538;//kernel.Boot:6538
        maxFrameSkip=5;
      }
      //$LASTPOS=49006559;//kernel.Boot:6559
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=49006598;//kernel.Boot:6598
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
      
      //$LASTPOS=49006877;//kernel.Boot:6877
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=49006917;//kernel.Boot:6917
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=49006946;//kernel.Boot:6946
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=49006975;//kernel.Boot:6975
        _this.fps_fpsCnt=0;
        //$LASTPOS=49006998;//kernel.Boot:6998
        _this.fps_rpsCnt=0;
        //$LASTPOS=49007021;//kernel.Boot:7021
        _this.lastMeasured=_this.now();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"loadPlugins":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"hide":{"nowait":true},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"initEvents":{"nowait":false},"loopRAF":{"nowait":false},"waitRAF":{"nowait":false},"detectRAFResolution":{"nowait":true},"measureRAFInterval":{"nowait":false},"loopTimer":{"nowait":false},"handlePause":{"nowait":false},"drawFrame":{"nowait":true},"moveFrame":{"nowait":true},"afterDraw":{"nowait":true},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"__getter__useRAF":{"nowait":true},"__setter__useRAF":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}
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
      
      //$LASTPOS=50000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=50000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=50000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=50000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=50000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=50000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=50000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=50000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=50000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=50000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000212;//kernel.DxChar:212
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=50000243;//kernel.DxChar:243
      _this.onDraw();
      //$LASTPOS=50000258;//kernel.DxChar:258
      _this.detectShape();
      //$LASTPOS=50000278;//kernel.DxChar:278
      _this.drawDxSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder,_this.angle,_this.alpha,_this.scaleX,_this.scaleY);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
