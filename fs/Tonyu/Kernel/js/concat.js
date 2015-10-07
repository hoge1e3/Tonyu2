Tonyu.klass.define({
  fullName: 'kernel.EventHandlerCaller',
  shortName: 'EventHandlerCaller',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_EventHandlerCaller_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_EventHandlerCaller_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    callEventHandler :function _trc_EventHandlerCaller_callEventHandler(h,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      //$LASTPOS=9000064;//kernel.EventHandlerCaller:64
      t;
      //$LASTPOS=9000076;//kernel.EventHandlerCaller:76
      if (h["fiber"]) {
        //$LASTPOS=9000103;//kernel.EventHandlerCaller:103
        t=Tonyu.thread();
        //$LASTPOS=9000130;//kernel.EventHandlerCaller:130
        h["fiber"].apply(_this.target,[t].concat(args));
        //$LASTPOS=9000184;//kernel.EventHandlerCaller:184
        t.steps();
        
      } else {
        //$LASTPOS=9000218;//kernel.EventHandlerCaller:218
        h.apply(_this.target,args);
        
      }
    },
    fiber$callEventHandler :function _trc_EventHandlerCaller_f_callEventHandler(_thread,h,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      //$LASTPOS=9000064;//kernel.EventHandlerCaller:64
      t;
      //$LASTPOS=9000076;//kernel.EventHandlerCaller:76
      if (h["fiber"]) {
        //$LASTPOS=9000103;//kernel.EventHandlerCaller:103
        t=Tonyu.thread();
        //$LASTPOS=9000130;//kernel.EventHandlerCaller:130
        h["fiber"].apply(_this.target,[t].concat(args));
        //$LASTPOS=9000184;//kernel.EventHandlerCaller:184
        t.steps();
        
      } else {
        //$LASTPOS=9000218;//kernel.EventHandlerCaller:218
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_EventMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initEventMod :function _trc_EventMod_initEventMod() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000063;//kernel.EventMod:63
      if (_this._eventHandlers) {
        return _this;
      }
      //$LASTPOS=10000156;//kernel.EventMod:156
      _this._eventHandlers={};
      //$LASTPOS=10000179;//kernel.EventMod:179
      _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
    },
    releaseEventMod :function _trc_EventMod_releaseEventMod() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var k;
      var v;
      var _it_1301;
      
      //$LASTPOS=10000243;//kernel.EventMod:243
      _it_1301=Tonyu.iterator(_this._eventHandlers,2);
      while(_it_1301.next()) {
        k=_it_1301[0];
        v=_it_1301[1];
        
        //$LASTPOS=10000285;//kernel.EventMod:285
        v.release();
        
      }
    },
    parseArgs :function _trc_EventMod_parseArgs(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var i;
      
      //$LASTPOS=10000335;//kernel.EventMod:335
      res = {type: a[0],args: []};
      //$LASTPOS=10000369;//kernel.EventMod:369
      //$LASTPOS=10000374;//kernel.EventMod:374
      i = 1;
      while(i<a.length) {
        {
          //$LASTPOS=10000412;//kernel.EventMod:412
          res.args.push(a[i]);
        }
        i++;
      }
      return res;
    },
    registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000535;//kernel.EventMod:535
      _this.initEventMod();
      //$LASTPOS=10000555;//kernel.EventMod:555
      if (typeof  type=="function") {
        //$LASTPOS=10000594;//kernel.EventMod:594
        obj=obj||new type({target: _this});
        //$LASTPOS=10000634;//kernel.EventMod:634
        type=obj.getClassInfo().fullName;
        
      } else {
        //$LASTPOS=10000690;//kernel.EventMod:690
        obj=obj||new Tonyu.classes.kernel.EventHandler({target: _this});
        //$LASTPOS=10000740;//kernel.EventMod:740
        obj.target=_this;
        
      }
      return _this._eventHandlers[type]=obj;
    },
    getEventHandler :function _trc_EventMod_getEventHandler(type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=10000908;//kernel.EventMod:908
      _this.initEventMod();
      //$LASTPOS=10000928;//kernel.EventMod:928
      if (typeof  type=="function") {
        //$LASTPOS=10000967;//kernel.EventMod:967
        type=type.meta.fullName;
        
      }
      //$LASTPOS=10001002;//kernel.EventMod:1002
      res = _this._eventHandlers[type];
      return res;
    },
    getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=10001098;//kernel.EventMod:1098
      res = _this.getEventHandler(type)||_this.registerEventHandler(type);
      return res;
    },
    on :function _trc_EventMod_on() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var h;
      
      //$LASTPOS=10001201;//kernel.EventMod:1201
      a = _this.parseArgs(arguments);
      //$LASTPOS=10001234;//kernel.EventMod:1234
      h = _this.getOrRegisterEventHandler(a.type);
      return h.addListener.apply(h,a.args);
    },
    fireEvent :function _trc_EventMod_fireEvent(type,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var h;
      
      //$LASTPOS=10001419;//kernel.EventMod:1419
      h = _this.getEventHandler(type);
      //$LASTPOS=10001453;//kernel.EventMod:1453
      if (h) {
        //$LASTPOS=10001460;//kernel.EventMod:1460
        h.fire([arg]);
      }
    },
    sendEvent :function _trc_EventMod_sendEvent(type,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10001515;//kernel.EventMod:1515
      _this.fireEvent(type,arg);
    },
    waitEvent :function _trc_EventMod_waitEvent() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var args;
      var i;
      
      //$LASTPOS=10001562;//kernel.EventMod:1562
      if (null) {
        //$LASTPOS=10001586;//kernel.EventMod:1586
        args = [];
        //$LASTPOS=10001608;//kernel.EventMod:1608
        //$LASTPOS=10001613;//kernel.EventMod:1613
        i = 0;
        while(i<arguments.length) {
          {
            //$LASTPOS=10001660;//kernel.EventMod:1660
            if (arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=10001710;//kernel.EventMod:1710
            args.push(arguments[i]);
          }
          i++;
        }
        //$LASTPOS=10001755;//kernel.EventMod:1755
        null.waitEvent(_this,args);
        
      }
    },
    fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var args;
      var i;
      
      //$LASTPOS=10001562;//kernel.EventMod:1562
      if (_thread) {
        //$LASTPOS=10001586;//kernel.EventMod:1586
        args = [];
        //$LASTPOS=10001608;//kernel.EventMod:1608
        //$LASTPOS=10001613;//kernel.EventMod:1613
        i = 0;
        while(i<_arguments.length) {
          {
            //$LASTPOS=10001660;//kernel.EventMod:1660
            if (_arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=10001710;//kernel.EventMod:1710
            args.push(_arguments[i]);
          }
          i++;
        }
        //$LASTPOS=10001755;//kernel.EventMod:1755
        _thread.waitEvent(_this,args);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initEventMod":{"nowait":true},"releaseEventMod":{"nowait":true},"parseArgs":{"nowait":true},"registerEventHandler":{"nowait":true},"getEventHandler":{"nowait":true},"getOrRegisterEventHandler":{"nowait":true},"on":{"nowait":true},"fireEvent":{"nowait":true},"sendEvent":{"nowait":true},"waitEvent":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.OneframeSpriteMod',
  shortName: 'OneframeSpriteMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_OneframeSpriteMod_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_OneframeSpriteMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    drawText :function _trc_OneframeSpriteMod_drawText(x,y,text,col,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11000060;//kernel.OneframeSpriteMod:60
      if (! size) {
        //$LASTPOS=11000071;//kernel.OneframeSpriteMod:71
        size=15;
      }
      //$LASTPOS=11000085;//kernel.OneframeSpriteMod:85
      if (! col) {
        //$LASTPOS=11000095;//kernel.OneframeSpriteMod:95
        col="cyan";
      }
      //$LASTPOS=11000112;//kernel.OneframeSpriteMod:112
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size,oneframeSprite: true});
    },
    drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11000217;//kernel.OneframeSpriteMod:217
      if (! col) {
        //$LASTPOS=11000227;//kernel.OneframeSpriteMod:227
        col="white";
      }
      //$LASTPOS=11000245;//kernel.OneframeSpriteMod:245
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_TextRectMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    drawTextRect :function _trc_TextRectMod_drawTextRect(ctx,text,x,topY,h,align,type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var met;
      var res;
      var t;
      
      //$LASTPOS=12000090;//kernel.TextRectMod:90
      if (! align) {
        //$LASTPOS=12000102;//kernel.TextRectMod:102
        align="center";
      }
      //$LASTPOS=12000123;//kernel.TextRectMod:123
      ctx.textBaseline="top";
      //$LASTPOS=12000152;//kernel.TextRectMod:152
      _this.setFontSize(ctx,h);
      //$LASTPOS=12000178;//kernel.TextRectMod:178
      met = ctx.measureText(text);
      //$LASTPOS=12000214;//kernel.TextRectMod:214
      res = {y: topY,w: met.width,h: h};
      //$LASTPOS=12000256;//kernel.TextRectMod:256
      t = align.substring(0,1).toLowerCase();
      //$LASTPOS=12000303;//kernel.TextRectMod:303
      if (t=="l") {
        //$LASTPOS=12000315;//kernel.TextRectMod:315
        res.x=x;
      } else {
        //$LASTPOS=12000334;//kernel.TextRectMod:334
        if (t=="r") {
          //$LASTPOS=12000346;//kernel.TextRectMod:346
          res.x=x-met.width;
        } else {
          //$LASTPOS=12000375;//kernel.TextRectMod:375
          if (t=="c") {
            //$LASTPOS=12000387;//kernel.TextRectMod:387
            res.x=x-met.width/2;
          }
        }
      }
      //$LASTPOS=12000413;//kernel.TextRectMod:413
      if (type=="fill") {
        //$LASTPOS=12000431;//kernel.TextRectMod:431
        ctx.fillText(text,res.x,topY);
      }
      //$LASTPOS=12000468;//kernel.TextRectMod:468
      if (type=="stroke") {
        //$LASTPOS=12000488;//kernel.TextRectMod:488
        ctx.strokeText(text,res.x,topY);
      }
      return res;
    },
    setFontSize :function _trc_TextRectMod_setFontSize(ctx,sz) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var post;
      
      //$LASTPOS=12000586;//kernel.TextRectMod:586
      post = ctx.font.replace(/^[0-9\.]+/,"");
      //$LASTPOS=12000634;//kernel.TextRectMod:634
      ctx.font=sz+post;
    },
    fukidashi :function _trc_TextRectMod_fukidashi(ctx,text,x,y,sz) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var align;
      var theight;
      var margin;
      var r;
      var fs;
      
      //$LASTPOS=12000712;//kernel.TextRectMod:712
      align = "c";
      //$LASTPOS=12000732;//kernel.TextRectMod:732
      theight = 20;
      //$LASTPOS=12000753;//kernel.TextRectMod:753
      margin = 5;
      //$LASTPOS=12000772;//kernel.TextRectMod:772
      r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
      //$LASTPOS=12000842;//kernel.TextRectMod:842
      ctx.beginPath();
      //$LASTPOS=12000864;//kernel.TextRectMod:864
      ctx.moveTo(x,y);
      //$LASTPOS=12000888;//kernel.TextRectMod:888
      ctx.lineTo(x+margin,y-theight);
      //$LASTPOS=12000927;//kernel.TextRectMod:927
      ctx.lineTo(x+r.w/2+margin,y-theight);
      //$LASTPOS=12000972;//kernel.TextRectMod:972
      ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
      //$LASTPOS=12001030;//kernel.TextRectMod:1030
      ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
      //$LASTPOS=12001088;//kernel.TextRectMod:1088
      ctx.lineTo(x-r.w/2-margin,y-theight);
      //$LASTPOS=12001133;//kernel.TextRectMod:1133
      ctx.lineTo(x-margin,y-theight);
      //$LASTPOS=12001172;//kernel.TextRectMod:1172
      ctx.closePath();
      //$LASTPOS=12001194;//kernel.TextRectMod:1194
      ctx.fill();
      //$LASTPOS=12001211;//kernel.TextRectMod:1211
      ctx.stroke();
      //$LASTPOS=12001236;//kernel.TextRectMod:1236
      fs = ctx.fillStyle;
      //$LASTPOS=12001263;//kernel.TextRectMod:1263
      ctx.fillStyle=ctx.strokeStyle;
      //$LASTPOS=12001299;//kernel.TextRectMod:1299
      _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
      //$LASTPOS=12001372;//kernel.TextRectMod:1372
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_MathMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    sin :function _trc_MathMod_sin(d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.sin(_this.rad(d));
    },
    cos :function _trc_MathMod_cos(d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.cos(_this.rad(d));
    },
    rad :function _trc_MathMod_rad(d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return d/180*Math.PI;
    },
    deg :function _trc_MathMod_deg(d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return d/Math.PI*180;
    },
    abs :function _trc_MathMod_abs(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.abs(v);
    },
    atan2 :function _trc_MathMod_atan2(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.deg(Math.atan2(x,y));
    },
    floor :function _trc_MathMod_floor(x) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.floor(x);
    },
    angleDiff :function _trc_MathMod_angleDiff(a,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var c;
      
      //$LASTPOS=13000416;//kernel.MathMod:416
      c;
      //$LASTPOS=13000428;//kernel.MathMod:428
      a=_this.floor(a);
      //$LASTPOS=13000445;//kernel.MathMod:445
      b=_this.floor(b);
      //$LASTPOS=13000462;//kernel.MathMod:462
      if (a>=b) {
        //$LASTPOS=13000483;//kernel.MathMod:483
        c=(a-b)%360;
        //$LASTPOS=13000507;//kernel.MathMod:507
        if (c>=180) {
          //$LASTPOS=13000519;//kernel.MathMod:519
          c-=360;
        }
        
      } else {
        //$LASTPOS=13000550;//kernel.MathMod:550
        c=- ((b-a)%360);
        //$LASTPOS=13000577;//kernel.MathMod:577
        if (c<- 180) {
          //$LASTPOS=13000589;//kernel.MathMod:589
          c+=360;
        }
        
      }
      return c;
    },
    sqrt :function _trc_MathMod_sqrt(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.sqrt(t);
    },
    dist :function _trc_MathMod_dist(dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      //$LASTPOS=13000698;//kernel.MathMod:698
      if (typeof  dx=="object") {
        //$LASTPOS=13000734;//kernel.MathMod:734
        t = dx;
        //$LASTPOS=13000753;//kernel.MathMod:753
        dx=t.x-_this.x;
        //$LASTPOS=13000762;//kernel.MathMod:762
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=13000838;//kernel.MathMod:838
      if (f>=0) {
        return Math.floor(f);
      } else {
        return Math.ceil(f);
      }
    },
    ceil :function _trc_MathMod_ceil(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.ceil(f);
    },
    rnd :function _trc_MathMod_rnd(r) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=13000975;//kernel.MathMod:975
      if (typeof  r=="number") {
        return Math.floor(Math.random()*r);
        
      }
      return Math.random();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2Mod',
  shortName: 'T2Mod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_T2Mod_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T2Mod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    bvec :function _trc_T2Mod_bvec(tx,ty) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b2Vec2;
      
      //$LASTPOS=14000034;//kernel.T2Mod:34
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=14000034;//kernel.T2Mod:34
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
      
      
      _thread.retVal=_this;return;
    },
    defv :function _trc_T2Mod_defv(t,d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return (t===t&&(typeof  t)==="number")?t:d;
    },
    fiber$defv :function _trc_T2Mod_f_defv(_thread,t,d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_MediaPlayer_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MediaPlayer_play() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$play :function _trc_MediaPlayer_f_play(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MediaPlayer_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_MediaPlayer_playSE() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$playSE :function _trc_MediaPlayer_f_playSE(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setDelay :function _trc_MediaPlayer_setDelay() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setVolume :function _trc_MediaPlayer_setVolume() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_ThreadGroupMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addThread :function _trc_ThreadGroupMod_addThread(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000038;//kernel.ThreadGroupMod:38
      _this.threads=_this.threads||[];
      //$LASTPOS=15000064;//kernel.ThreadGroupMod:64
      _this.threads.push(t);
    },
    fiber$addThread :function _trc_ThreadGroupMod_f_addThread(_thread,t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000038;//kernel.ThreadGroupMod:38
      _this.threads=_this.threads||[];
      //$LASTPOS=15000064;//kernel.ThreadGroupMod:64
      _this.threads.push(t);
      
      _thread.retVal=_this;return;
    },
    addThreadGroup :function _trc_ThreadGroupMod_addThreadGroup(tg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000112;//kernel.ThreadGroupMod:112
      _this.threadGroups=_this.threadGroups||[];
      //$LASTPOS=15000148;//kernel.ThreadGroupMod:148
      _this.threadGroups.push(tg);
    },
    fiber$addThreadGroup :function _trc_ThreadGroupMod_f_addThreadGroup(_thread,tg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000112;//kernel.ThreadGroupMod:112
      _this.threadGroups=_this.threadGroups||[];
      //$LASTPOS=15000148;//kernel.ThreadGroupMod:148
      _this.threadGroups.push(tg);
      
      _thread.retVal=_this;return;
    },
    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var thread;
      var _it_1326;
      var threadGroup;
      var _it_1327;
      
      //$LASTPOS=15000201;//kernel.ThreadGroupMod:201
      if (_this.threads) {
        //$LASTPOS=15000225;//kernel.ThreadGroupMod:225
        _it_1326=Tonyu.iterator(_this.threads,1);
        while(_it_1326.next()) {
          thread=_it_1326[0];
          
          //$LASTPOS=15000268;//kernel.ThreadGroupMod:268
          thread.kill();
          
        }
        
      }
      //$LASTPOS=15000306;//kernel.ThreadGroupMod:306
      if (_this.threadGroups) {
        //$LASTPOS=15000335;//kernel.ThreadGroupMod:335
        _it_1327=Tonyu.iterator(_this.threadGroups,1);
        while(_it_1327.next()) {
          threadGroup=_it_1327[0];
          
          //$LASTPOS=15000388;//kernel.ThreadGroupMod:388
          threadGroup.killThreadGroup();
          
        }
        
      }
    },
    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var thread;
      var _it_1326;
      var threadGroup;
      var _it_1327;
      
      //$LASTPOS=15000201;//kernel.ThreadGroupMod:201
      if (_this.threads) {
        //$LASTPOS=15000225;//kernel.ThreadGroupMod:225
        _it_1326=Tonyu.iterator(_this.threads,1);
        while(_it_1326.next()) {
          thread=_it_1326[0];
          
          //$LASTPOS=15000268;//kernel.ThreadGroupMod:268
          thread.kill();
          
        }
        
      }
      //$LASTPOS=15000306;//kernel.ThreadGroupMod:306
      if (_this.threadGroups) {
        //$LASTPOS=15000335;//kernel.ThreadGroupMod:335
        _it_1327=Tonyu.iterator(_this.threadGroups,1);
        while(_it_1327.next()) {
          threadGroup=_it_1327[0];
          
          //$LASTPOS=15000388;//kernel.ThreadGroupMod:388
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_TObject_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TObject_initialize(options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=16000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=16000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=16000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=16000123;//kernel.TObject:123
        _this.main();
      }
    },
    extend :function _trc_TObject_extend(obj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_TQuery_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TQuery_initialize() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=17000049;//kernel.TQuery:49
      _this.length=0;
    },
    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=17000089;//kernel.TQuery:89
      res = {};
      //$LASTPOS=17000105;//kernel.TQuery:105
      res.i=0;
      //$LASTPOS=17000118;//kernel.TQuery:118
      if (arity==1) {
        //$LASTPOS=17000142;//kernel.TQuery:142
        res.next=(function anonymous_151() {
          
          //$LASTPOS=17000177;//kernel.TQuery:177
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=17000227;//kernel.TQuery:227
          res[0]=_this[res.i];
          //$LASTPOS=17000259;//kernel.TQuery:259
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=17000325;//kernel.TQuery:325
        res.next=(function anonymous_334() {
          
          //$LASTPOS=17000360;//kernel.TQuery:360
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=17000410;//kernel.TQuery:410
          res[0]=res.i;
          //$LASTPOS=17000436;//kernel.TQuery:436
          res[1]=_this[res.i];
          //$LASTPOS=17000468;//kernel.TQuery:468
          res.i++;
          return true;
        });
        
      }
      return res;
    },
    fiber$tonyuIterator :function _trc_TQuery_f_tonyuIterator(_thread,arity) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=17000089;//kernel.TQuery:89
      res = {};
      //$LASTPOS=17000105;//kernel.TQuery:105
      res.i=0;
      //$LASTPOS=17000118;//kernel.TQuery:118
      if (arity==1) {
        //$LASTPOS=17000142;//kernel.TQuery:142
        res.next=(function anonymous_151() {
          
          //$LASTPOS=17000177;//kernel.TQuery:177
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=17000227;//kernel.TQuery:227
          res[0]=_this[res.i];
          //$LASTPOS=17000259;//kernel.TQuery:259
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=17000325;//kernel.TQuery:325
        res.next=(function anonymous_334() {
          
          //$LASTPOS=17000360;//kernel.TQuery:360
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=17000410;//kernel.TQuery:410
          res[0]=res.i;
          //$LASTPOS=17000436;//kernel.TQuery:436
          res[1]=_this[res.i];
          //$LASTPOS=17000468;//kernel.TQuery:468
          res.i++;
          return true;
        });
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    attr :function _trc_TQuery_attr() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var values;
      var i;
      var e;
      var _it_1333;
      
      //$LASTPOS=17000551;//kernel.TQuery:551
      values;
      //$LASTPOS=17000567;//kernel.TQuery:567
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=17000594;//kernel.TQuery:594
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=17000702;//kernel.TQuery:702
      if (arguments.length>=2) {
        //$LASTPOS=17000737;//kernel.TQuery:737
        values={};
        //$LASTPOS=17000756;//kernel.TQuery:756
        //$LASTPOS=17000761;//kernel.TQuery:761
        i = 0;
        while(i<arguments.length-1) {
          {
            //$LASTPOS=17000813;//kernel.TQuery:813
            values[arguments[i]]=arguments[i+1];
          }
          i+=2;
        }
        
      } else {
        //$LASTPOS=17000881;//kernel.TQuery:881
        values=arguments[0];
        
      }
      //$LASTPOS=17000912;//kernel.TQuery:912
      if (values) {
        //$LASTPOS=17000934;//kernel.TQuery:934
        _it_1333=Tonyu.iterator(_this,1);
        while(_it_1333.next()) {
          e=_it_1333[0];
          
          //$LASTPOS=17000968;//kernel.TQuery:968
          e.extend(values);
          
        }
        
      }
    },
    fiber$attr :function _trc_TQuery_f_attr(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var values;
      var i;
      var e;
      var _it_1333;
      
      //$LASTPOS=17000551;//kernel.TQuery:551
      values;
      //$LASTPOS=17000567;//kernel.TQuery:567
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=17000594;//kernel.TQuery:594
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=17000702;//kernel.TQuery:702
      if (_arguments.length>=2) {
        //$LASTPOS=17000737;//kernel.TQuery:737
        values={};
        //$LASTPOS=17000756;//kernel.TQuery:756
        //$LASTPOS=17000761;//kernel.TQuery:761
        i = 0;
        while(i<_arguments.length-1) {
          {
            //$LASTPOS=17000813;//kernel.TQuery:813
            values[_arguments[i]]=_arguments[i+1];
          }
          i+=2;
        }
        
      } else {
        //$LASTPOS=17000881;//kernel.TQuery:881
        values=_arguments[0];
        
      }
      //$LASTPOS=17000912;//kernel.TQuery:912
      if (values) {
        //$LASTPOS=17000934;//kernel.TQuery:934
        _it_1333=Tonyu.iterator(_this,1);
        while(_it_1333.next()) {
          e=_it_1333[0];
          
          //$LASTPOS=17000968;//kernel.TQuery:968
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=17001028;//kernel.TQuery:1028
      if (typeof  key!="function") {
        return (function anonymous_1073(o) {
          
          return o[key];
        });
        
      } else {
        return key;
        
      }
    },
    fiber$genKeyfunc :function _trc_TQuery_f_genKeyfunc(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17001028;//kernel.TQuery:1028
      if (typeof  key!="function") {
        _thread.retVal=(function anonymous_1073(o) {
          
          return o[key];
        });return;
        
        
      } else {
        _thread.retVal=key;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    maxs :function _trc_TQuery_maxs(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var res;
      var reso;
      var o;
      var _it_1339;
      var v;
      
      //$LASTPOS=17001154;//kernel.TQuery:1154
      f = _this.genKeyfunc(key);
      //$LASTPOS=17001181;//kernel.TQuery:1181
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=17001210;//kernel.TQuery:1210
      _it_1339=Tonyu.iterator(_this,1);
      while(_it_1339.next()) {
        o=_it_1339[0];
        
        //$LASTPOS=17001240;//kernel.TQuery:1240
        v = f(o);
        //$LASTPOS=17001260;//kernel.TQuery:1260
        if (res==null||v>=res) {
          //$LASTPOS=17001299;//kernel.TQuery:1299
          if (v>res) {
            //$LASTPOS=17001310;//kernel.TQuery:1310
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=17001339;//kernel.TQuery:1339
          reso.push(o);
          //$LASTPOS=17001365;//kernel.TQuery:1365
          res=v;
          
        }
        
      }
      return reso;
    },
    fiber$maxs :function _trc_TQuery_f_maxs(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var reso;
      var o;
      var _it_1339;
      var v;
      
      //$LASTPOS=17001154;//kernel.TQuery:1154
      f = _this.genKeyfunc(key);
      //$LASTPOS=17001181;//kernel.TQuery:1181
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=17001210;//kernel.TQuery:1210
      _it_1339=Tonyu.iterator(_this,1);
      while(_it_1339.next()) {
        o=_it_1339[0];
        
        //$LASTPOS=17001240;//kernel.TQuery:1240
        v = f(o);
        //$LASTPOS=17001260;//kernel.TQuery:1260
        if (res==null||v>=res) {
          //$LASTPOS=17001299;//kernel.TQuery:1299
          if (v>res) {
            //$LASTPOS=17001310;//kernel.TQuery:1310
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=17001339;//kernel.TQuery:1339
          reso.push(o);
          //$LASTPOS=17001365;//kernel.TQuery:1365
          res=v;
          
        }
        
      }
      _thread.retVal=reso;return;
      
      
      _thread.retVal=_this;return;
    },
    mins :function _trc_TQuery_mins(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var res;
      var reso;
      var o;
      var _it_1346;
      var v;
      
      //$LASTPOS=17001424;//kernel.TQuery:1424
      f = _this.genKeyfunc(key);
      //$LASTPOS=17001451;//kernel.TQuery:1451
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=17001480;//kernel.TQuery:1480
      _it_1346=Tonyu.iterator(_this,1);
      while(_it_1346.next()) {
        o=_it_1346[0];
        
        //$LASTPOS=17001510;//kernel.TQuery:1510
        v = f(o);
        //$LASTPOS=17001530;//kernel.TQuery:1530
        if (res==null||v<=res) {
          //$LASTPOS=17001569;//kernel.TQuery:1569
          if (v<res) {
            //$LASTPOS=17001580;//kernel.TQuery:1580
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=17001609;//kernel.TQuery:1609
          reso.push(o);
          //$LASTPOS=17001635;//kernel.TQuery:1635
          res=v;
          
        }
        
      }
      return reso;
    },
    fiber$mins :function _trc_TQuery_f_mins(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var reso;
      var o;
      var _it_1346;
      var v;
      
      //$LASTPOS=17001424;//kernel.TQuery:1424
      f = _this.genKeyfunc(key);
      //$LASTPOS=17001451;//kernel.TQuery:1451
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=17001480;//kernel.TQuery:1480
      _it_1346=Tonyu.iterator(_this,1);
      while(_it_1346.next()) {
        o=_it_1346[0];
        
        //$LASTPOS=17001510;//kernel.TQuery:1510
        v = f(o);
        //$LASTPOS=17001530;//kernel.TQuery:1530
        if (res==null||v<=res) {
          //$LASTPOS=17001569;//kernel.TQuery:1569
          if (v<res) {
            //$LASTPOS=17001580;//kernel.TQuery:1580
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=17001609;//kernel.TQuery:1609
          reso.push(o);
          //$LASTPOS=17001635;//kernel.TQuery:1635
          res=v;
          
        }
        
      }
      _thread.retVal=reso;return;
      
      
      _thread.retVal=_this;return;
    },
    minObj :function _trc_TQuery_minObj(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.mins(key)[0];
    },
    fiber$minObj :function _trc_TQuery_f_minObj(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.mins(key)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    maxObj :function _trc_TQuery_maxObj(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.maxs(key)[0];
    },
    fiber$maxObj :function _trc_TQuery_f_maxObj(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.maxs(key)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    nearests :function _trc_TQuery_nearests(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=17001782;//kernel.TQuery:1782
      if (typeof  x=="object") {
        //$LASTPOS=17001807;//kernel.TQuery:1807
        y=x.y;
        //$LASTPOS=17001813;//kernel.TQuery:1813
        x=x.x;
        
      }
      return _this.mins((function anonymous_1837(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));
    },
    fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17001782;//kernel.TQuery:1782
      if (typeof  x=="object") {
        //$LASTPOS=17001807;//kernel.TQuery:1807
        y=x.y;
        //$LASTPOS=17001813;//kernel.TQuery:1813
        x=x.x;
        
      }
      _thread.retVal=_this.mins((function anonymous_1837(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    nearest :function _trc_TQuery_nearest(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.nearests(x,y)[0];
    },
    fiber$nearest :function _trc_TQuery_f_nearest(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.nearests(x,y)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    withins :function _trc_TQuery_withins(xo,yd,d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var x;
      var y;
      
      //$LASTPOS=17001958;//kernel.TQuery:1958
      x;y;
      //$LASTPOS=17001971;//kernel.TQuery:1971
      if (typeof  xo=="object") {
        //$LASTPOS=17002006;//kernel.TQuery:2006
        x=xo.x;
        //$LASTPOS=17002013;//kernel.TQuery:2013
        y=xo.y;
        //$LASTPOS=17002020;//kernel.TQuery:2020
        d=yd;
        
      } else {
        //$LASTPOS=17002047;//kernel.TQuery:2047
        x=xo;
        //$LASTPOS=17002052;//kernel.TQuery:2052
        y=yd;
        
      }
      return _this.find((function anonymous_2080(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));
    },
    fiber$withins :function _trc_TQuery_f_withins(_thread,xo,yd,d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      
      //$LASTPOS=17001958;//kernel.TQuery:1958
      x;y;
      //$LASTPOS=17001971;//kernel.TQuery:1971
      if (typeof  xo=="object") {
        //$LASTPOS=17002006;//kernel.TQuery:2006
        x=xo.x;
        //$LASTPOS=17002013;//kernel.TQuery:2013
        y=xo.y;
        //$LASTPOS=17002020;//kernel.TQuery:2020
        d=yd;
        
      } else {
        //$LASTPOS=17002047;//kernel.TQuery:2047
        x=xo;
        //$LASTPOS=17002052;//kernel.TQuery:2052
        y=yd;
        
      }
      _thread.retVal=_this.find((function anonymous_2080(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    within :function _trc_TQuery_within(xo,yd,d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.withins(xo,yd,d).nearest();
    },
    fiber$within :function _trc_TQuery_f_within(_thread,xo,yd,d) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.withins(xo,yd,d).nearest();return;
      
      
      _thread.retVal=_this;return;
    },
    max :function _trc_TQuery_max(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var res;
      var o;
      var _it_1357;
      var v;
      
      //$LASTPOS=17002210;//kernel.TQuery:2210
      f = _this.genKeyfunc(key);
      //$LASTPOS=17002237;//kernel.TQuery:2237
      res;
      //$LASTPOS=17002250;//kernel.TQuery:2250
      _it_1357=Tonyu.iterator(_this,1);
      while(_it_1357.next()) {
        o=_it_1357[0];
        
        //$LASTPOS=17002280;//kernel.TQuery:2280
        v = f(o);
        //$LASTPOS=17002300;//kernel.TQuery:2300
        if (res==null||v>res) {
          //$LASTPOS=17002324;//kernel.TQuery:2324
          res=v;
        }
        
      }
      return res;
    },
    fiber$max :function _trc_TQuery_f_max(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var o;
      var _it_1357;
      var v;
      
      //$LASTPOS=17002210;//kernel.TQuery:2210
      f = _this.genKeyfunc(key);
      //$LASTPOS=17002237;//kernel.TQuery:2237
      res;
      //$LASTPOS=17002250;//kernel.TQuery:2250
      _it_1357=Tonyu.iterator(_this,1);
      while(_it_1357.next()) {
        o=_it_1357[0];
        
        //$LASTPOS=17002280;//kernel.TQuery:2280
        v = f(o);
        //$LASTPOS=17002300;//kernel.TQuery:2300
        if (res==null||v>res) {
          //$LASTPOS=17002324;//kernel.TQuery:2324
          res=v;
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    min :function _trc_TQuery_min(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var res;
      var o;
      var _it_1363;
      var v;
      
      //$LASTPOS=17002371;//kernel.TQuery:2371
      f = _this.genKeyfunc(key);
      //$LASTPOS=17002398;//kernel.TQuery:2398
      res;
      //$LASTPOS=17002411;//kernel.TQuery:2411
      _it_1363=Tonyu.iterator(_this,1);
      while(_it_1363.next()) {
        o=_it_1363[0];
        
        //$LASTPOS=17002441;//kernel.TQuery:2441
        v = f(o);
        //$LASTPOS=17002461;//kernel.TQuery:2461
        if (res==null||v<res) {
          //$LASTPOS=17002485;//kernel.TQuery:2485
          res=v;
        }
        
      }
      return res;
    },
    fiber$min :function _trc_TQuery_f_min(_thread,key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var o;
      var _it_1363;
      var v;
      
      //$LASTPOS=17002371;//kernel.TQuery:2371
      f = _this.genKeyfunc(key);
      //$LASTPOS=17002398;//kernel.TQuery:2398
      res;
      //$LASTPOS=17002411;//kernel.TQuery:2411
      _it_1363=Tonyu.iterator(_this,1);
      while(_it_1363.next()) {
        o=_it_1363[0];
        
        //$LASTPOS=17002441;//kernel.TQuery:2441
        v = f(o);
        //$LASTPOS=17002461;//kernel.TQuery:2461
        if (res==null||v<res) {
          //$LASTPOS=17002485;//kernel.TQuery:2485
          res=v;
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    push :function _trc_TQuery_push(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=17002531;//kernel.TQuery:2531
      _this[_this.length]=e;
      //$LASTPOS=17002551;//kernel.TQuery:2551
      _this.length++;
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17002531;//kernel.TQuery:2531
      _this[_this.length]=e;
      //$LASTPOS=17002551;//kernel.TQuery:2551
      _this.length++;
      
      _thread.retVal=_this;return;
    },
    size :function _trc_TQuery_size() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.length;
    },
    fiber$size :function _trc_TQuery_f_size(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.length;return;
      
      
      _thread.retVal=_this;return;
    },
    find :function _trc_TQuery_find(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var no;
      var o;
      var _it_1369;
      
      //$LASTPOS=17002603;//kernel.TQuery:2603
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=17002626;//kernel.TQuery:2626
      _it_1369=Tonyu.iterator(_this,1);
      while(_it_1369.next()) {
        o=_it_1369[0];
        
        //$LASTPOS=17002656;//kernel.TQuery:2656
        if (f(o)) {
          //$LASTPOS=17002666;//kernel.TQuery:2666
          no.push(o);
        }
        
      }
      return no;
    },
    fiber$find :function _trc_TQuery_f_find(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var no;
      var o;
      var _it_1369;
      
      //$LASTPOS=17002603;//kernel.TQuery:2603
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=17002626;//kernel.TQuery:2626
      _it_1369=Tonyu.iterator(_this,1);
      while(_it_1369.next()) {
        o=_it_1369[0];
        
        //$LASTPOS=17002656;//kernel.TQuery:2656
        if (f(o)) {
          //$LASTPOS=17002666;//kernel.TQuery:2666
          no.push(o);
        }
        
      }
      _thread.retVal=no;return;
      
      
      _thread.retVal=_this;return;
    },
    find1 :function _trc_TQuery_find1(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.find(f)[0];
    },
    fiber$find1 :function _trc_TQuery_f_find1(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find(f)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    apply :function _trc_TQuery_apply(name,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var o;
      var _it_1373;
      var f;
      
      //$LASTPOS=17002764;//kernel.TQuery:2764
      res;
      //$LASTPOS=17002777;//kernel.TQuery:2777
      if (! args) {
        //$LASTPOS=17002788;//kernel.TQuery:2788
        args=[];
      }
      //$LASTPOS=17002801;//kernel.TQuery:2801
      _it_1373=Tonyu.iterator(_this,1);
      while(_it_1373.next()) {
        o=_it_1373[0];
        
        //$LASTPOS=17002831;//kernel.TQuery:2831
        f = o[name];
        //$LASTPOS=17002854;//kernel.TQuery:2854
        if (typeof  f=="function") {
          //$LASTPOS=17002894;//kernel.TQuery:2894
          res=f.apply(o,args);
          
        }
        
      }
      return res;
    },
    fiber$apply :function _trc_TQuery_f_apply(_thread,name,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var o;
      var _it_1373;
      var f;
      
      //$LASTPOS=17002764;//kernel.TQuery:2764
      res;
      //$LASTPOS=17002777;//kernel.TQuery:2777
      if (! args) {
        //$LASTPOS=17002788;//kernel.TQuery:2788
        args=[];
      }
      //$LASTPOS=17002801;//kernel.TQuery:2801
      _it_1373=Tonyu.iterator(_this,1);
      while(_it_1373.next()) {
        o=_it_1373[0];
        
        //$LASTPOS=17002831;//kernel.TQuery:2831
        f = o[name];
        //$LASTPOS=17002854;//kernel.TQuery:2854
        if (typeof  f=="function") {
          //$LASTPOS=17002894;//kernel.TQuery:2894
          res=f.apply(o,args);
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    alive :function _trc_TQuery_alive() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.find((function anonymous_3032(o) {
        
        return ! o.isDead();
      }));
    },
    fiber$alive :function _trc_TQuery_f_alive(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3032(o) {
        
        return ! o.isDead();
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_TQuery_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      
      //$LASTPOS=17003089;//kernel.TQuery:3089
      a = _this.alive();
      //$LASTPOS=17003108;//kernel.TQuery:3108
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=17003143;//kernel.TQuery:3143
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=17003089;//kernel.TQuery:3089
      a = _this.alive();
      //$LASTPOS=17003108;//kernel.TQuery:3108
      if (a.length==0) {
        _thread.retVal=false;return;
        
      }
      //$LASTPOS=17003143;//kernel.TQuery:3143
      a.apply("die");
      _thread.retVal=true;return;
      
      
      _thread.retVal=_this;return;
    },
    klass :function _trc_TQuery_klass(k) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.find((function anonymous_3207(o) {
        
        return o instanceof k;
      }));
    },
    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3207(o) {
        
        return o instanceof k;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.InputDevice',
  shortName: 'InputDevice',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_InputDevice_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_InputDevice_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_InputDevice_initialize() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=18000091;//kernel.InputDevice:91
      _this.listeners=[];
      //$LASTPOS=18000110;//kernel.InputDevice:110
      _this.touchEmu=true;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var l;
      
      //$LASTPOS=18000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=18000177;//kernel.InputDevice:177
      _this.listeners=[];
      //$LASTPOS=18000196;//kernel.InputDevice:196
      while (l.length>0) {
        //$LASTPOS=18000217;//kernel.InputDevice:217
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=18000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=18000177;//kernel.InputDevice:177
      _this.listeners=[];
      
      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18000196;//kernel.InputDevice:196
          case 1:
            if (!(l.length>0)) { __pc=2; break; }
            {
              //$LASTPOS=18000217;//kernel.InputDevice:217
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=18000267;//kernel.InputDevice:267
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000267;//kernel.InputDevice:267
      _this.listeners.push(l);
      
      _thread.retVal=_this;return;
    },
    initCanvasEvents :function _trc_InputDevice_initCanvasEvents(cvj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var cv;
      var handleMouse;
      var handleTouch;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=18000320;//kernel.InputDevice:320
      cv = cvj[0];
      //$LASTPOS=18000340;//kernel.InputDevice:340
      Tonyu.globals.$handleMouse=(function anonymous_353(e) {
        var p;
        var mp;
        
        //$LASTPOS=18000369;//kernel.InputDevice:369
        p = cvj.offset();
        //$LASTPOS=18000398;//kernel.InputDevice:398
        mp = {x: e.clientX-p.left,y: e.clientY-p.top};
        //$LASTPOS=18000455;//kernel.InputDevice:455
        mp=Tonyu.globals.$Screen.canvas2buf(mp);
        //$LASTPOS=18000491;//kernel.InputDevice:491
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=18000514;//kernel.InputDevice:514
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=18000537;//kernel.InputDevice:537
        if (_this.touchEmu) {
          //$LASTPOS=18000566;//kernel.InputDevice:566
          Tonyu.globals.$touches[0].x=mp.x;
          //$LASTPOS=18000599;//kernel.InputDevice:599
          Tonyu.globals.$touches[0].y=mp.y;
          
        }
        //$LASTPOS=18000639;//kernel.InputDevice:639
        _this.handleListeners();
      });
      //$LASTPOS=18000671;//kernel.InputDevice:671
      Tonyu.globals.$touches=[{},{},{},{},{}];
      //$LASTPOS=18000703;//kernel.InputDevice:703
      Tonyu.globals.$touches.findById=(function anonymous_721(id) {
        var j;
        
        //$LASTPOS=18000738;//kernel.InputDevice:738
        //$LASTPOS=18000743;//kernel.InputDevice:743
        j = 0;
        while(j<Tonyu.globals.$touches.length) {
          {
            //$LASTPOS=18000793;//kernel.InputDevice:793
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
          j++;
        }
      });
      //$LASTPOS=18000903;//kernel.InputDevice:903
      Tonyu.globals.$handleTouch=(function anonymous_916(e) {
        var p;
        var ts;
        var i;
        var src;
        var dst;
        var j;
        
        //$LASTPOS=18000932;//kernel.InputDevice:932
        T2MediaLib.activate();
        //$LASTPOS=18000964;//kernel.InputDevice:964
        _this.touchEmu=false;
        //$LASTPOS=18000989;//kernel.InputDevice:989
        p = cvj.offset();
        //$LASTPOS=18001018;//kernel.InputDevice:1018
        e.preventDefault();
        //$LASTPOS=18001047;//kernel.InputDevice:1047
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=18001095;//kernel.InputDevice:1095
        //$LASTPOS=18001100;//kernel.InputDevice:1100
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=18001145;//kernel.InputDevice:1145
            src = ts[i];
            //$LASTPOS=18001173;//kernel.InputDevice:1173
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=18001229;//kernel.InputDevice:1229
            if (! dst) {
              //$LASTPOS=18001258;//kernel.InputDevice:1258
              //$LASTPOS=18001263;//kernel.InputDevice:1263
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=18001321;//kernel.InputDevice:1321
                  if (! Tonyu.globals.$touches[j].touched) {
                    //$LASTPOS=18001374;//kernel.InputDevice:1374
                    dst=Tonyu.globals.$touches[j];
                    //$LASTPOS=18001416;//kernel.InputDevice:1416
                    dst.identifier=src.identifier;
                    break;
                    
                    
                  }
                }
                j++;
              }
              
            }
            //$LASTPOS=18001549;//kernel.InputDevice:1549
            if (dst) {
              //$LASTPOS=18001577;//kernel.InputDevice:1577
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
              //$LASTPOS=18001638;//kernel.InputDevice:1638
              _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
              //$LASTPOS=18001682;//kernel.InputDevice:1682
              dst.x=_this.mp.x;
              //$LASTPOS=18001711;//kernel.InputDevice:1711
              dst.y=_this.mp.y;
              //$LASTPOS=18001740;//kernel.InputDevice:1740
              if (! dst.touched) {
                //$LASTPOS=18001757;//kernel.InputDevice:1757
                dst.touched=1;
              }
              
            }
          }
          i++;
        }
        //$LASTPOS=18001807;//kernel.InputDevice:1807
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=18001839;//kernel.InputDevice:1839
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=18001871;//kernel.InputDevice:1871
        _this.handleListeners();
      });
      //$LASTPOS=18001903;//kernel.InputDevice:1903
      Tonyu.globals.$handleTouchEnd=(function anonymous_1919(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=18001935;//kernel.InputDevice:1935
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=18001983;//kernel.InputDevice:1983
        //$LASTPOS=18001988;//kernel.InputDevice:1988
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=18002033;//kernel.InputDevice:2033
            src = ts[i];
            //$LASTPOS=18002061;//kernel.InputDevice:2061
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=18002117;//kernel.InputDevice:2117
            if (dst) {
              //$LASTPOS=18002145;//kernel.InputDevice:2145
              dst.touched=0;
              //$LASTPOS=18002177;//kernel.InputDevice:2177
              dst.identifier=- 1;
              
            }
          }
          i++;
        }
        //$LASTPOS=18002231;//kernel.InputDevice:2231
        _this.handleListeners();
      });
      //$LASTPOS=18002263;//kernel.InputDevice:2263
      handleMouse = (function anonymous_2279(e) {
        
        //$LASTPOS=18002284;//kernel.InputDevice:2284
        Tonyu.globals.$handleMouse(e);
      });
      //$LASTPOS=18002308;//kernel.InputDevice:2308
      handleTouch = (function anonymous_2324(e) {
        
        //$LASTPOS=18002329;//kernel.InputDevice:2329
        Tonyu.globals.$handleTouch(e);
      });
      //$LASTPOS=18002353;//kernel.InputDevice:2353
      handleTouchEnd = (function anonymous_2372(e) {
        
        //$LASTPOS=18002377;//kernel.InputDevice:2377
        Tonyu.globals.$handleTouchEnd(e);
      });
      //$LASTPOS=18002404;//kernel.InputDevice:2404
      d = $.data(cv,"events");
      //$LASTPOS=18002436;//kernel.InputDevice:2436
      if (! d) {
        //$LASTPOS=18002455;//kernel.InputDevice:2455
        $.data(cv,"events","true");
        //$LASTPOS=18002492;//kernel.InputDevice:2492
        cvj.mousedown(handleMouse);
        //$LASTPOS=18002529;//kernel.InputDevice:2529
        cvj.mousemove(handleMouse);
        //$LASTPOS=18002566;//kernel.InputDevice:2566
        cvj.on("touchstart",handleTouch);
        //$LASTPOS=18002609;//kernel.InputDevice:2609
        cvj.on("touchmove",handleTouch);
        //$LASTPOS=18002651;//kernel.InputDevice:2651
        cvj.on("touchend",handleTouchEnd);
        
      }
    },
    fiber$initCanvasEvents :function _trc_InputDevice_f_initCanvasEvents(_thread,cvj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cv;
      var handleMouse;
      var handleTouch;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=18000320;//kernel.InputDevice:320
      cv = cvj[0];
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18000340;//kernel.InputDevice:340
            Tonyu.globals.$handleMouse=(function anonymous_353(e) {
              var p;
              var mp;
              
              //$LASTPOS=18000369;//kernel.InputDevice:369
              p = cvj.offset();
              //$LASTPOS=18000398;//kernel.InputDevice:398
              mp = {x: e.clientX-p.left,y: e.clientY-p.top};
              //$LASTPOS=18000455;//kernel.InputDevice:455
              mp=Tonyu.globals.$Screen.canvas2buf(mp);
              //$LASTPOS=18000491;//kernel.InputDevice:491
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=18000514;//kernel.InputDevice:514
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=18000537;//kernel.InputDevice:537
              if (_this.touchEmu) {
                //$LASTPOS=18000566;//kernel.InputDevice:566
                Tonyu.globals.$touches[0].x=mp.x;
                //$LASTPOS=18000599;//kernel.InputDevice:599
                Tonyu.globals.$touches[0].y=mp.y;
                
              }
              //$LASTPOS=18000639;//kernel.InputDevice:639
              _this.handleListeners();
            });
            //$LASTPOS=18000671;//kernel.InputDevice:671
            Tonyu.globals.$touches=[{},{},{},{},{}];
            //$LASTPOS=18000703;//kernel.InputDevice:703
            Tonyu.globals.$touches.findById=(function anonymous_721(id) {
              var j;
              
              //$LASTPOS=18000738;//kernel.InputDevice:738
              //$LASTPOS=18000743;//kernel.InputDevice:743
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=18000793;//kernel.InputDevice:793
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
                j++;
              }
            });
            //$LASTPOS=18000903;//kernel.InputDevice:903
            Tonyu.globals.$handleTouch=(function anonymous_916(e) {
              var p;
              var ts;
              var i;
              var src;
              var dst;
              var j;
              
              //$LASTPOS=18000932;//kernel.InputDevice:932
              T2MediaLib.activate();
              //$LASTPOS=18000964;//kernel.InputDevice:964
              _this.touchEmu=false;
              //$LASTPOS=18000989;//kernel.InputDevice:989
              p = cvj.offset();
              //$LASTPOS=18001018;//kernel.InputDevice:1018
              e.preventDefault();
              //$LASTPOS=18001047;//kernel.InputDevice:1047
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=18001095;//kernel.InputDevice:1095
              //$LASTPOS=18001100;//kernel.InputDevice:1100
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=18001145;//kernel.InputDevice:1145
                  src = ts[i];
                  //$LASTPOS=18001173;//kernel.InputDevice:1173
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=18001229;//kernel.InputDevice:1229
                  if (! dst) {
                    //$LASTPOS=18001258;//kernel.InputDevice:1258
                    //$LASTPOS=18001263;//kernel.InputDevice:1263
                    j = 0;
                    while(j<Tonyu.globals.$touches.length) {
                      {
                        //$LASTPOS=18001321;//kernel.InputDevice:1321
                        if (! Tonyu.globals.$touches[j].touched) {
                          //$LASTPOS=18001374;//kernel.InputDevice:1374
                          dst=Tonyu.globals.$touches[j];
                          //$LASTPOS=18001416;//kernel.InputDevice:1416
                          dst.identifier=src.identifier;
                          break;
                          
                          
                        }
                      }
                      j++;
                    }
                    
                  }
                  //$LASTPOS=18001549;//kernel.InputDevice:1549
                  if (dst) {
                    //$LASTPOS=18001577;//kernel.InputDevice:1577
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                    //$LASTPOS=18001638;//kernel.InputDevice:1638
                    _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                    //$LASTPOS=18001682;//kernel.InputDevice:1682
                    dst.x=_this.mp.x;
                    //$LASTPOS=18001711;//kernel.InputDevice:1711
                    dst.y=_this.mp.y;
                    //$LASTPOS=18001740;//kernel.InputDevice:1740
                    if (! dst.touched) {
                      //$LASTPOS=18001757;//kernel.InputDevice:1757
                      dst.touched=1;
                    }
                    
                  }
                }
                i++;
              }
              //$LASTPOS=18001807;//kernel.InputDevice:1807
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=18001839;//kernel.InputDevice:1839
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=18001871;//kernel.InputDevice:1871
              _this.handleListeners();
            });
            //$LASTPOS=18001903;//kernel.InputDevice:1903
            Tonyu.globals.$handleTouchEnd=(function anonymous_1919(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=18001935;//kernel.InputDevice:1935
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=18001983;//kernel.InputDevice:1983
              //$LASTPOS=18001988;//kernel.InputDevice:1988
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=18002033;//kernel.InputDevice:2033
                  src = ts[i];
                  //$LASTPOS=18002061;//kernel.InputDevice:2061
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=18002117;//kernel.InputDevice:2117
                  if (dst) {
                    //$LASTPOS=18002145;//kernel.InputDevice:2145
                    dst.touched=0;
                    //$LASTPOS=18002177;//kernel.InputDevice:2177
                    dst.identifier=- 1;
                    
                  }
                }
                i++;
              }
              //$LASTPOS=18002231;//kernel.InputDevice:2231
              _this.handleListeners();
            });
            //$LASTPOS=18002263;//kernel.InputDevice:2263
            handleMouse = (function anonymous_2279(e) {
              
              //$LASTPOS=18002284;//kernel.InputDevice:2284
              Tonyu.globals.$handleMouse(e);
            });
            //$LASTPOS=18002308;//kernel.InputDevice:2308
            handleTouch = (function anonymous_2324(e) {
              
              //$LASTPOS=18002329;//kernel.InputDevice:2329
              Tonyu.globals.$handleTouch(e);
            });
            //$LASTPOS=18002353;//kernel.InputDevice:2353
            handleTouchEnd = (function anonymous_2372(e) {
              
              //$LASTPOS=18002377;//kernel.InputDevice:2377
              Tonyu.globals.$handleTouchEnd(e);
            });
            //$LASTPOS=18002404;//kernel.InputDevice:2404
            d = $.data(cv,"events");
            //$LASTPOS=18002436;//kernel.InputDevice:2436
            if (! d) {
              //$LASTPOS=18002455;//kernel.InputDevice:2455
              $.data(cv,"events","true");
              //$LASTPOS=18002492;//kernel.InputDevice:2492
              cvj.mousedown(handleMouse);
              //$LASTPOS=18002529;//kernel.InputDevice:2529
              cvj.mousemove(handleMouse);
              //$LASTPOS=18002566;//kernel.InputDevice:2566
              cvj.on("touchstart",handleTouch);
              //$LASTPOS=18002609;//kernel.InputDevice:2609
              cvj.on("touchmove",handleTouch);
              //$LASTPOS=18002651;//kernel.InputDevice:2651
              cvj.on("touchend",handleTouchEnd);
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    update :function _trc_InputDevice_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var _it_1407;
      
      //$LASTPOS=18002716;//kernel.InputDevice:2716
      _it_1407=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_1407.next()) {
        i=_it_1407[0];
        
        //$LASTPOS=18002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=18002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=18002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=18002811;//kernel.InputDevice:2811
          i.touched=1;
        }
        
      }
    },
    fiber$update :function _trc_InputDevice_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_1407;
      
      //$LASTPOS=18002716;//kernel.InputDevice:2716
      _it_1407=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_1407.next()) {
        i=_it_1407[0];
        
        //$LASTPOS=18002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=18002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=18002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=18002811;//kernel.InputDevice:2811
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=19000084;//kernel.Keys:84
      _this.stats={};
      //$LASTPOS=19000094;//kernel.Keys:94
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=19000212;//kernel.Keys:212
      //$LASTPOS=19000217;//kernel.Keys:217
      i = 65;
      while(i<65+26) {
        {
          //$LASTPOS=19000248;//kernel.Keys:248
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
        i++;
      }
      //$LASTPOS=19000297;//kernel.Keys:297
      //$LASTPOS=19000302;//kernel.Keys:302
      i = 48;
      while(i<58) {
        {
          //$LASTPOS=19000330;//kernel.Keys:330
          _this.codes[String.fromCharCode(i)]=i;
        }
        i++;
      }
      //$LASTPOS=19000365;//kernel.Keys:365
      if (! $.data(document,"key_event")) {
        //$LASTPOS=19000406;//kernel.Keys:406
        $.data(document,"key_event",true);
        //$LASTPOS=19000445;//kernel.Keys:445
        $(document).keydown((function anonymous_465(e) {
          
          //$LASTPOS=19000471;//kernel.Keys:471
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=19000495;//kernel.Keys:495
        $(document).keyup((function anonymous_513(e) {
          
          //$LASTPOS=19000519;//kernel.Keys:519
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=19000541;//kernel.Keys:541
        $(document).mousedown((function anonymous_563(e) {
          
          //$LASTPOS=19000578;//kernel.Keys:578
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=19000619;//kernel.Keys:619
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=19000660;//kernel.Keys:660
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=19000697;//kernel.Keys:697
        $(document).mouseup((function anonymous_717(e) {
          
          //$LASTPOS=19000732;//kernel.Keys:732
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=19000773;//kernel.Keys:773
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=19000814;//kernel.Keys:814
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
    },
    fiber$main :function _trc_Keys_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=19000084;//kernel.Keys:84
      _this.stats={};
      //$LASTPOS=19000094;//kernel.Keys:94
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=19000212;//kernel.Keys:212
      //$LASTPOS=19000217;//kernel.Keys:217
      i = 65;
      while(i<65+26) {
        {
          //$LASTPOS=19000248;//kernel.Keys:248
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
        i++;
      }
      //$LASTPOS=19000297;//kernel.Keys:297
      //$LASTPOS=19000302;//kernel.Keys:302
      i = 48;
      while(i<58) {
        {
          //$LASTPOS=19000330;//kernel.Keys:330
          _this.codes[String.fromCharCode(i)]=i;
        }
        i++;
      }
      //$LASTPOS=19000365;//kernel.Keys:365
      if (! $.data(document,"key_event")) {
        //$LASTPOS=19000406;//kernel.Keys:406
        $.data(document,"key_event",true);
        //$LASTPOS=19000445;//kernel.Keys:445
        $(document).keydown((function anonymous_465(e) {
          
          //$LASTPOS=19000471;//kernel.Keys:471
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=19000495;//kernel.Keys:495
        $(document).keyup((function anonymous_513(e) {
          
          //$LASTPOS=19000519;//kernel.Keys:519
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=19000541;//kernel.Keys:541
        $(document).mousedown((function anonymous_563(e) {
          
          //$LASTPOS=19000578;//kernel.Keys:578
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=19000619;//kernel.Keys:619
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=19000660;//kernel.Keys:660
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=19000697;//kernel.Keys:697
        $(document).mouseup((function anonymous_717(e) {
          
          //$LASTPOS=19000732;//kernel.Keys:732
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=19000773;//kernel.Keys:773
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=19000814;//kernel.Keys:814
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=19000875;//kernel.Keys:875
      if (typeof  code=="string") {
        //$LASTPOS=19000912;//kernel.Keys:912
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=19000954;//kernel.Keys:954
      if (! code) {
        return 0;
      }
      //$LASTPOS=19000979;//kernel.Keys:979
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=19001014;//kernel.Keys:1014
      if (! _this.stats[code]) {
        //$LASTPOS=19001032;//kernel.Keys:1032
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000875;//kernel.Keys:875
      if (typeof  code=="string") {
        //$LASTPOS=19000912;//kernel.Keys:912
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=19000954;//kernel.Keys:954
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=19000979;//kernel.Keys:979
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=19001014;//kernel.Keys:1014
      if (! _this.stats[code]) {
        //$LASTPOS=19001032;//kernel.Keys:1032
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var _it_1415;
      
      //$LASTPOS=19001097;//kernel.Keys:1097
      _it_1415=Tonyu.iterator(_this.stats,1);
      while(_it_1415.next()) {
        i=_it_1415[0];
        
        //$LASTPOS=19001128;//kernel.Keys:1128
        if (_this.stats[i]>0) {
          //$LASTPOS=19001145;//kernel.Keys:1145
          _this.stats[i]++;
          
        }
        //$LASTPOS=19001166;//kernel.Keys:1166
        if (_this.stats[i]==- 1) {
          //$LASTPOS=19001184;//kernel.Keys:1184
          _this.stats[i]=1;
        }
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_1415;
      
      //$LASTPOS=19001097;//kernel.Keys:1097
      _it_1415=Tonyu.iterator(_this.stats,1);
      while(_it_1415.next()) {
        i=_it_1415[0];
        
        //$LASTPOS=19001128;//kernel.Keys:1128
        if (_this.stats[i]>0) {
          //$LASTPOS=19001145;//kernel.Keys:1145
          _this.stats[i]++;
          
        }
        //$LASTPOS=19001166;//kernel.Keys:1166
        if (_this.stats[i]==- 1) {
          //$LASTPOS=19001184;//kernel.Keys:1184
          _this.stats[i]=1;
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var s;
      
      //$LASTPOS=19001222;//kernel.Keys:1222
      s = _this.stats[e.keyCode];
      //$LASTPOS=19001250;//kernel.Keys:1250
      if (! s) {
        //$LASTPOS=19001268;//kernel.Keys:1268
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=19001298;//kernel.Keys:1298
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=19001222;//kernel.Keys:1222
      s = _this.stats[e.keyCode];
      //$LASTPOS=19001250;//kernel.Keys:1250
      if (! s) {
        //$LASTPOS=19001268;//kernel.Keys:1268
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=19001298;//kernel.Keys:1298
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=19001348;//kernel.Keys:1348
      _this.stats[e.keyCode]=0;
      //$LASTPOS=19001372;//kernel.Keys:1372
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19001348;//kernel.Keys:1348
      _this.stats[e.keyCode]=0;
      //$LASTPOS=19001372;//kernel.Keys:1372
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
  includes: [Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod,Tonyu.classes.kernel.EventHandlerCaller],
  methods: {
    main :function _trc_BaseActor_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_BaseActor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_BaseActor_initialize(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20000248;//kernel.BaseActor:248
      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      //$LASTPOS=20000293;//kernel.BaseActor:293
      _this.registerEventHandler("screenOut",new Tonyu.classes.kernel.ScreenOutHandler);
      //$LASTPOS=20000358;//kernel.BaseActor:358
      _this.registerEventHandler("crashTo",new Tonyu.classes.kernel.CrashToHandler);
      //$LASTPOS=20000419;//kernel.BaseActor:419
      _this.registerEventHandler("within",new Tonyu.classes.kernel.WithinHandler);
      //$LASTPOS=20000483;//kernel.BaseActor:483
      if (typeof  x=="object") {
        //$LASTPOS=20000507;//kernel.BaseActor:507
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=20000539;//kernel.BaseActor:539
        if (typeof  x=="number") {
          //$LASTPOS=20000574;//kernel.BaseActor:574
          _this.x=x;
          //$LASTPOS=20000593;//kernel.BaseActor:593
          _this.y=y;
          //$LASTPOS=20000612;//kernel.BaseActor:612
          _this.p=p;
          
        }
      }
      //$LASTPOS=20000634;//kernel.BaseActor:634
      if (_this.scaleX==null) {
        //$LASTPOS=20000652;//kernel.BaseActor:652
        _this.scaleX=1;
      }
      //$LASTPOS=20000667;//kernel.BaseActor:667
      if (_this.rotation==null) {
        //$LASTPOS=20000687;//kernel.BaseActor:687
        _this.rotation=0;
      }
      //$LASTPOS=20000704;//kernel.BaseActor:704
      if (_this.rotate==null) {
        //$LASTPOS=20000722;//kernel.BaseActor:722
        _this.rotate=0;
      }
      //$LASTPOS=20000737;//kernel.BaseActor:737
      if (_this.alpha==null) {
        //$LASTPOS=20000754;//kernel.BaseActor:754
        _this.alpha=255;
      }
      //$LASTPOS=20000770;//kernel.BaseActor:770
      if (_this.zOrder==null) {
        //$LASTPOS=20000788;//kernel.BaseActor:788
        _this.zOrder=0;
      }
      //$LASTPOS=20000803;//kernel.BaseActor:803
      if (_this.age==null) {
        //$LASTPOS=20000818;//kernel.BaseActor:818
        _this.age=0;
      }
      //$LASTPOS=20000830;//kernel.BaseActor:830
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=20000881;//kernel.BaseActor:881
        _this.animMode=true;
        //$LASTPOS=20000905;//kernel.BaseActor:905
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=20000939;//kernel.BaseActor:939
        _this.animMode=false;
        
      }
      //$LASTPOS=20000967;//kernel.BaseActor:967
      if (_this.animFps==null) {
        //$LASTPOS=20000986;//kernel.BaseActor:986
        _this.animFps=1;
      }
    },
    extend :function _trc_BaseActor_extend(obj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.extend(_this,obj);
    },
    print :function _trc_BaseActor_print(pt) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var mergedArg;
      var argCount;
      var printCount;
      
      //$LASTPOS=20001090;//kernel.BaseActor:1090
      console.log.apply(console,arguments);
      //$LASTPOS=20001133;//kernel.BaseActor:1133
      mergedArg = "";
      //$LASTPOS=20001156;//kernel.BaseActor:1156
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=20001184;//kernel.BaseActor:1184
        //$LASTPOS=20001188;//kernel.BaseActor:1188
        argCount = 0;
        while(argCount<arguments.length) {
          {
            //$LASTPOS=20001255;//kernel.BaseActor:1255
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
          argCount++;
        }
        //$LASTPOS=20001320;//kernel.BaseActor:1320
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=20001359;//kernel.BaseActor:1359
        //$LASTPOS=20001363;//kernel.BaseActor:1363
        printCount = 0;
        while(printCount<_this.splits.length) {
          {
            //$LASTPOS=20001433;//kernel.BaseActor:1433
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=20001474;//kernel.BaseActor:1474
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=20001524;//kernel.BaseActor:1524
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
          printCount++;
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20001647;//kernel.BaseActor:1647
      _this.animFps=f;
      //$LASTPOS=20001668;//kernel.BaseActor:1668
      _this.animFrame=0;
      //$LASTPOS=20001691;//kernel.BaseActor:1691
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20001741;//kernel.BaseActor:1741
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20001790;//kernel.BaseActor:1790
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20001832;//kernel.BaseActor:1832
      _this.onUpdate();
      //$LASTPOS=20001849;//kernel.BaseActor:1849
      if (null) {
        //$LASTPOS=20001872;//kernel.BaseActor:1872
        null.suspend();
        //$LASTPOS=20001900;//kernel.BaseActor:1900
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=20001916;//kernel.BaseActor:1916
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20001832;//kernel.BaseActor:1832
      _this.onUpdate();
      //$LASTPOS=20001849;//kernel.BaseActor:1849
      if (_thread) {
        //$LASTPOS=20001872;//kernel.BaseActor:1872
        _thread.suspend();
        //$LASTPOS=20001900;//kernel.BaseActor:1900
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=20001916;//kernel.BaseActor:1916
          Tonyu.globals.$Scheduler.addToNext(_thread);
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    onUpdate :function _trc_BaseActor_onUpdate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    updateEx :function _trc_BaseActor_updateEx(updateT) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var updateCount;
      
      //$LASTPOS=20002010;//kernel.BaseActor:2010
      //$LASTPOS=20002014;//kernel.BaseActor:2014
      updateCount = 0;
      while(updateCount<updateT) {
        {
          //$LASTPOS=20002077;//kernel.BaseActor:2077
          _this.update();
        }
        updateCount++;
      }
    },
    fiber$updateEx :function _trc_BaseActor_f_updateEx(_thread,updateT) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var updateCount;
      
      
      _thread.enter(function _trc_BaseActor_ent_updateEx(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20002010;//kernel.BaseActor:2010
            //$LASTPOS=20002014;//kernel.BaseActor:2014
            updateCount = 0;;
          case 1:
            if (!(updateCount<updateT)) { __pc=3; break; }
            //$LASTPOS=20002077;//kernel.BaseActor:2077
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.globals.$Keys.getkey(k);
    },
    hitTo :function _trc_BaseActor_hitTo(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.crashTo(t);
    },
    all :function _trc_BaseActor_all(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=20002220;//kernel.BaseActor:2220
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=20002245;//kernel.BaseActor:2245
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=20002328;//kernel.BaseActor:2328
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2353(s) {
        
        //$LASTPOS=20002369;//kernel.BaseActor:2369
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=20002400;//kernel.BaseActor:2400
        if (! c||s instanceof c) {
          //$LASTPOS=20002441;//kernel.BaseActor:2441
          res.push(s);
          
        }
      }));
      return res;
    },
    allCrash :function _trc_BaseActor_allCrash(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=20002548;//kernel.BaseActor:2548
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=20002573;//kernel.BaseActor:2573
      sp = _this;
      //$LASTPOS=20002610;//kernel.BaseActor:2610
      t1 = _this.getCrashRect();
      //$LASTPOS=20002638;//kernel.BaseActor:2638
      if (! t1) {
        return res;
      }
      //$LASTPOS=20002664;//kernel.BaseActor:2664
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2689(s) {
        var t2;
        
        //$LASTPOS=20002705;//kernel.BaseActor:2705
        t2;
        //$LASTPOS=20002722;//kernel.BaseActor:2722
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=20002948;//kernel.BaseActor:2948
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20003028;//kernel.BaseActor:3028
      if (! t) {
        return false;
      }
      //$LASTPOS=20003055;//kernel.BaseActor:3055
      if (typeof  t=="function") {
        return _this.allCrash(t)[0];
        
      }
      return _this.crashTo1(t);
    },
    crashTo1 :function _trc_BaseActor_crashTo1(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t1;
      var t2;
      
      //$LASTPOS=20003178;//kernel.BaseActor:3178
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=20003306;//kernel.BaseActor:3306
      t1 = _this.getCrashRect();
      //$LASTPOS=20003334;//kernel.BaseActor:3334
      t2 = t.getCrashRect();
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var obj;
      var _it_1432;
      
      //$LASTPOS=20003643;//kernel.BaseActor:3643
      while (true) {
        //$LASTPOS=20003665;//kernel.BaseActor:3665
        if (typeof  d=="function") {
          //$LASTPOS=20003704;//kernel.BaseActor:3704
          _it_1432=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_1432.next()) {
            obj=_it_1432[0];
            
            //$LASTPOS=20003746;//kernel.BaseActor:3746
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=20003803;//kernel.BaseActor:3803
          if (_this.crashTo(d)) {
            //$LASTPOS=20003832;//kernel.BaseActor:3832
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=20003877;//kernel.BaseActor:3877
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_1432;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20003643;//kernel.BaseActor:3643
          case 1:
            //$LASTPOS=20003665;//kernel.BaseActor:3665
            if (!(typeof  d=="function")) { __pc=5; break; }
            //$LASTPOS=20003704;//kernel.BaseActor:3704
            _it_1432=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_1432.next())) { __pc=4; break; }
            obj=_it_1432[0];
            
            //$LASTPOS=20003746;//kernel.BaseActor:3746
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            __pc=8;break;
          case 5:
            //$LASTPOS=20003803;//kernel.BaseActor:3803
            if (!(_this.crashTo(d))) { __pc=7; break; }
            //$LASTPOS=20003832;//kernel.BaseActor:3832
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=20003877;//kernel.BaseActor:3877
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var actWidth;
      var actHeight;
      
      //$LASTPOS=20003928;//kernel.BaseActor:3928
      actWidth = _this.width*_this.scaleX;actHeight;
      //$LASTPOS=20003971;//kernel.BaseActor:3971
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=20004013;//kernel.BaseActor:4013
        actHeight=_this.height*_this.scaleX;
        
      } else {
        //$LASTPOS=20004059;//kernel.BaseActor:4059
        actHeight=_this.height*_this.scaleY;
        
      }
      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: Math.abs(actWidth),height: Math.abs(actHeight)};
    },
    allWithin :function _trc_BaseActor_allWithin(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=20004320;//kernel.BaseActor:4320
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=20004345;//kernel.BaseActor:4345
      sp = _this;
      //$LASTPOS=20004382;//kernel.BaseActor:4382
      t1 = _this.getCrashRect();
      //$LASTPOS=20004410;//kernel.BaseActor:4410
      if (! t1) {
        return res;
      }
      //$LASTPOS=20004436;//kernel.BaseActor:4436
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_4461(s) {
        var t2;
        
        //$LASTPOS=20004477;//kernel.BaseActor:4477
        t2;
        //$LASTPOS=20004494;//kernel.BaseActor:4494
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=20004679;//kernel.BaseActor:4679
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20004770;//kernel.BaseActor:4770
      if (! t) {
        return false;
      }
      //$LASTPOS=20004796;//kernel.BaseActor:4796
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20004942;//kernel.BaseActor:4942
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=20004981;//kernel.BaseActor:4981
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var obj;
      var _it_1442;
      
      //$LASTPOS=20005151;//kernel.BaseActor:5151
      while (true) {
        //$LASTPOS=20005173;//kernel.BaseActor:5173
        if (typeof  d=="function") {
          //$LASTPOS=20005212;//kernel.BaseActor:5212
          _it_1442=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_1442.next()) {
            obj=_it_1442[0];
            
            //$LASTPOS=20005257;//kernel.BaseActor:5257
            _this.print(r);
            //$LASTPOS=20005284;//kernel.BaseActor:5284
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=20005322;//kernel.BaseActor:5322
          if (_this.within(d,r)) {
            //$LASTPOS=20005352;//kernel.BaseActor:5352
            f(d);
            
          }
        }
        //$LASTPOS=20005378;//kernel.BaseActor:5378
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_1442;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20005151;//kernel.BaseActor:5151
          case 1:
            //$LASTPOS=20005173;//kernel.BaseActor:5173
            if (typeof  d=="function") {
              //$LASTPOS=20005212;//kernel.BaseActor:5212
              _it_1442=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_1442.next()) {
                obj=_it_1442[0];
                
                //$LASTPOS=20005257;//kernel.BaseActor:5257
                _this.print(r);
                //$LASTPOS=20005284;//kernel.BaseActor:5284
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=20005322;//kernel.BaseActor:5322
              if (_this.within(d,r)) {
                //$LASTPOS=20005352;//kernel.BaseActor:5352
                f(d);
                
              }
            }
            //$LASTPOS=20005378;//kernel.BaseActor:5378
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20005442;//kernel.BaseActor:5442
      Tonyu.globals.$Sprites.watchHit(typeA,typeB,(function anonymous_5475(a,b) {
        
        //$LASTPOS=20005493;//kernel.BaseActor:5493
        onHit.apply(_this,[a,b]);
      }));
    },
    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.globals.$Scheduler;
    },
    die :function _trc_BaseActor_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20005647;//kernel.BaseActor:5647
      _this.killThreadGroup();
      //$LASTPOS=20005719;//kernel.BaseActor:5719
      _this.hide();
      //$LASTPOS=20005732;//kernel.BaseActor:5732
      _this.fireEvent("die");
      //$LASTPOS=20005755;//kernel.BaseActor:5755
      _this._isDead=true;
    },
    hide :function _trc_BaseActor_hide() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20005934;//kernel.BaseActor:5934
      if (_this.layer&&typeof  _this.layer.remove=="function") {
        //$LASTPOS=20005989;//kernel.BaseActor:5989
        _this.layer.remove(_this);
        
      } else {
        //$LASTPOS=20006030;//kernel.BaseActor:6030
        Tonyu.globals.$Sprites.remove(_this);
        
      }
    },
    show :function _trc_BaseActor_show(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20006091;//kernel.BaseActor:6091
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=20006143;//kernel.BaseActor:6143
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=20006181;//kernel.BaseActor:6181
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=20006213;//kernel.BaseActor:6213
      if (x!=null) {
        //$LASTPOS=20006226;//kernel.BaseActor:6226
        _this.x=x;
      }
      //$LASTPOS=20006241;//kernel.BaseActor:6241
      if (y!=null) {
        //$LASTPOS=20006254;//kernel.BaseActor:6254
        _this.y=y;
      }
      //$LASTPOS=20006269;//kernel.BaseActor:6269
      if (p!=null) {
        //$LASTPOS=20006282;//kernel.BaseActor:6282
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20006327;//kernel.BaseActor:6327
      if (typeof  _this.p!="number") {
        //$LASTPOS=20006362;//kernel.BaseActor:6362
        if (_this.text!=null) {
          return _this;
        }
        //$LASTPOS=20006395;//kernel.BaseActor:6395
        _this.p=0;
        
      }
      //$LASTPOS=20006412;//kernel.BaseActor:6412
      _this.p=Math.floor(_this.p);
      //$LASTPOS=20006434;//kernel.BaseActor:6434
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
      //$LASTPOS=20006472;//kernel.BaseActor:6472
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=20006496;//kernel.BaseActor:6496
      _this.width=_this.pImg.width;
      //$LASTPOS=20006519;//kernel.BaseActor:6519
      _this.height=_this.pImg.height;
    },
    waitFor :function _trc_BaseActor_waitFor(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20006562;//kernel.BaseActor:6562
      if (null) {
        //$LASTPOS=20006586;//kernel.BaseActor:6586
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_BaseActor_f_waitFor(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20006562;//kernel.BaseActor:6562
      if (_thread) {
        //$LASTPOS=20006586;//kernel.BaseActor:6586
        _thread.waitFor(f);
        
      }
      
      _thread.retVal=_this;return;
    },
    isDead :function _trc_BaseActor_isDead() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this._isDead;
    },
    animation :function _trc_BaseActor_animation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20006706;//kernel.BaseActor:6706
      _this.age++;
      //$LASTPOS=20006718;//kernel.BaseActor:6718
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=20006759;//kernel.BaseActor:6759
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=20006799;//kernel.BaseActor:6799
        _this.animFrame++;
        
      }
    },
    draw :function _trc_BaseActor_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=20006848;//kernel.BaseActor:6848
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=20006901;//kernel.BaseActor:6901
      _this.detectShape();
      //$LASTPOS=20006921;//kernel.BaseActor:6921
      if (_this.pImg) {
        //$LASTPOS=20006942;//kernel.BaseActor:6942
        ctx.save();
        //$LASTPOS=20006963;//kernel.BaseActor:6963
        ctx.translate(_this.x,_this.y);
        //$LASTPOS=20007107;//kernel.BaseActor:7107
        _this.animation();
        //$LASTPOS=20007129;//kernel.BaseActor:7129
        if (_this.rotation!=0) {
          //$LASTPOS=20007164;//kernel.BaseActor:7164
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=20007232;//kernel.BaseActor:7232
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=20007289;//kernel.BaseActor:7289
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=20007341;//kernel.BaseActor:7341
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=20007406;//kernel.BaseActor:7406
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=20007462;//kernel.BaseActor:7462
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=20007503;//kernel.BaseActor:7503
        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=20007635;//kernel.BaseActor:7635
        ctx.restore();
        
      } else {
        //$LASTPOS=20007662;//kernel.BaseActor:7662
        if (_this.text!==null&&_this.text!==undefined) {
          //$LASTPOS=20007710;//kernel.BaseActor:7710
          splitsText = (_this.text+"").split("\n");
          //$LASTPOS=20007757;//kernel.BaseActor:7757
          _this.drawY=_this.y;
          //$LASTPOS=20007775;//kernel.BaseActor:7775
          if (! _this.size) {
            //$LASTPOS=20007786;//kernel.BaseActor:7786
            _this.size=15;
          }
          //$LASTPOS=20007804;//kernel.BaseActor:7804
          if (! _this.align) {
            //$LASTPOS=20007816;//kernel.BaseActor:7816
            _this.align="center";
          }
          //$LASTPOS=20007841;//kernel.BaseActor:7841
          if (! _this.fillStyle) {
            //$LASTPOS=20007857;//kernel.BaseActor:7857
            _this.fillStyle="white";
          }
          //$LASTPOS=20007885;//kernel.BaseActor:7885
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=20007919;//kernel.BaseActor:7919
          ctx.globalAlpha=_this.alpha/255;
          //$LASTPOS=20007960;//kernel.BaseActor:7960
          _this.height=0;
          //$LASTPOS=20007969;//kernel.BaseActor:7969
          _this.width=0;
          //$LASTPOS=20007987;//kernel.BaseActor:7987
          //$LASTPOS=20007991;//kernel.BaseActor:7991
          textCount = 0;
          while(textCount<splitsText.length) {
            {
              //$LASTPOS=20008062;//kernel.BaseActor:8062
              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
              //$LASTPOS=20008158;//kernel.BaseActor:8158
              if (_this.width<rect.w) {
                //$LASTPOS=20008175;//kernel.BaseActor:8175
                _this.width=rect.w;
              }
              //$LASTPOS=20008202;//kernel.BaseActor:8202
              _this.height+=rect.h;
              //$LASTPOS=20008231;//kernel.BaseActor:8231
              _this.drawY+=_this.size;
            }
            textCount++;
          }
          
        }
      }
      //$LASTPOS=20008267;//kernel.BaseActor:8267
      if (_this._fukidashi) {
        //$LASTPOS=20008294;//kernel.BaseActor:8294
        if (_this._fukidashi.c>0) {
          //$LASTPOS=20008329;//kernel.BaseActor:8329
          _this._fukidashi.c--;
          //$LASTPOS=20008358;//kernel.BaseActor:8358
          ctx.fillStyle="white";
          //$LASTPOS=20008394;//kernel.BaseActor:8394
          ctx.strokeStyle="black";
          //$LASTPOS=20008432;//kernel.BaseActor:8432
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    asyncResult :function _trc_BaseActor_asyncResult() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.asyncResult();
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20008635;//kernel.BaseActor:8635
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=20008707;//kernel.BaseActor:8707
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20008635;//kernel.BaseActor:8635
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=20008707;//kernel.BaseActor:8707
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=20008789;//kernel.BaseActor:8789
      if (! a) {
        //$LASTPOS=20008797;//kernel.BaseActor:8797
        a=0;
      }
      //$LASTPOS=20008807;//kernel.BaseActor:8807
      r = 0;
      //$LASTPOS=20008821;//kernel.BaseActor:8821
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=20008867;//kernel.BaseActor:8867
      if (_this.x<viewX+a) {
        //$LASTPOS=20008896;//kernel.BaseActor:8896
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=20008915;//kernel.BaseActor:8915
      if (_this.y<viewY+a) {
        //$LASTPOS=20008944;//kernel.BaseActor:8944
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=20008963;//kernel.BaseActor:8963
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=20008992;//kernel.BaseActor:8992
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=20009027;//kernel.BaseActor:9027
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=20009056;//kernel.BaseActor:9056
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      return r;
    },
    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=20008789;//kernel.BaseActor:8789
      if (! a) {
        //$LASTPOS=20008797;//kernel.BaseActor:8797
        a=0;
      }
      //$LASTPOS=20008807;//kernel.BaseActor:8807
      r = 0;
      //$LASTPOS=20008821;//kernel.BaseActor:8821
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=20008867;//kernel.BaseActor:8867
      if (_this.x<viewX+a) {
        //$LASTPOS=20008896;//kernel.BaseActor:8896
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=20008915;//kernel.BaseActor:8915
      if (_this.y<viewY+a) {
        //$LASTPOS=20008944;//kernel.BaseActor:8944
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=20008963;//kernel.BaseActor:8963
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=20008992;//kernel.BaseActor:8992
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=20009027;//kernel.BaseActor:9027
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=20009056;//kernel.BaseActor:9056
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      _thread.retVal=r;return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20009186;//kernel.BaseActor:9186
      while (true) {
        //$LASTPOS=20009208;//kernel.BaseActor:9208
        while (true) {
          //$LASTPOS=20009234;//kernel.BaseActor:9234
          if (_this.screenOut()>d) {
            //$LASTPOS=20009270;//kernel.BaseActor:9270
            f();
            break;
            
            
          }
          //$LASTPOS=20009327;//kernel.BaseActor:9327
          _this.update();
          
        }
        //$LASTPOS=20009357;//kernel.BaseActor:9357
        while (true) {
          //$LASTPOS=20009383;//kernel.BaseActor:9383
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=20009455;//kernel.BaseActor:9455
          _this.update();
          
        }
        //$LASTPOS=20009485;//kernel.BaseActor:9485
        _this.update();
        
      }
    },
    fiber$screenOutChecker :function _trc_BaseActor_f_screenOutChecker(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BaseActor_ent_screenOutChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20009186;//kernel.BaseActor:9186
          case 1:
            //$LASTPOS=20009208;//kernel.BaseActor:9208
          case 2:
            //$LASTPOS=20009234;//kernel.BaseActor:9234
            if (!(_this.screenOut()>d)) { __pc=3; break; }
            //$LASTPOS=20009270;//kernel.BaseActor:9270
            f();
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=20009327;//kernel.BaseActor:9327
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=20009357;//kernel.BaseActor:9357
          case 6:
            //$LASTPOS=20009383;//kernel.BaseActor:9383
            if (!(_this.screenOut()<=d)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=20009455;//kernel.BaseActor:9455
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=20009485;//kernel.BaseActor:9485
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var d;
      var files;
      
      //$LASTPOS=20009525;//kernel.BaseActor:9525
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=20009567;//kernel.BaseActor:9567
      files = d.rel("files/");
      return FS.get(files.rel(path),{topDir: d});
    },
    fiber$file :function _trc_BaseActor_f_file(_thread,path) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var files;
      
      //$LASTPOS=20009525;//kernel.BaseActor:9525
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=20009567;//kernel.BaseActor:9567
      files = d.rel("files/");
      _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20009674;//kernel.BaseActor:9674
      if (fl!==false) {
        //$LASTPOS=20009701;//kernel.BaseActor:9701
        if (! _this.origTG) {
          
          
        }
        //$LASTPOS=20009853;//kernel.BaseActor:9853
        _this.a=_this.asyncResult();
        //$LASTPOS=20009879;//kernel.BaseActor:9879
        Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
        //$LASTPOS=20009933;//kernel.BaseActor:9933
        _this.waitFor(_this.a);
        
      } else {
        //$LASTPOS=20009968;//kernel.BaseActor:9968
        if (_this.origTG) {
          
          
        }
        
      }
    },
    fiber$waitInputDevice :function _trc_BaseActor_f_waitInputDevice(_thread,fl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BaseActor_ent_waitInputDevice(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20009674;//kernel.BaseActor:9674
            if (!(fl!==false)) { __pc=3; break; }
            //$LASTPOS=20009701;//kernel.BaseActor:9701
            if (!(! _this.origTG)) { __pc=1; break; }
            {
              //$LASTPOS=20009755;//kernel.BaseActor:9755
              _this.origTG=_thread.group;
              //$LASTPOS=20009794;//kernel.BaseActor:9794
              _thread.setGroup(null);
            }
          case 1:
            
            //$LASTPOS=20009853;//kernel.BaseActor:9853
            _this.a=_this.asyncResult();
            //$LASTPOS=20009879;//kernel.BaseActor:9879
            Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
            //$LASTPOS=20009933;//kernel.BaseActor:9933
            _this.fiber$waitFor(_thread, _this.a);
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            //$LASTPOS=20009968;//kernel.BaseActor:9968
            if (!(_this.origTG)) { __pc=4; break; }
            {
              //$LASTPOS=20010021;//kernel.BaseActor:10021
              _thread.setGroup(_this.origTG);
              //$LASTPOS=20010064;//kernel.BaseActor:10064
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20010137;//kernel.BaseActor:10137
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=20010173;//kernel.BaseActor:10173
      Tonyu.globals.$Screen.draw();
    },
    fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20010137;//kernel.BaseActor:10137
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=20010173;//kernel.BaseActor:10173
      Tonyu.globals.$Screen.draw();
      
      _thread.retVal=_this;return;
    },
    color :function _trc_BaseActor_color(r,g,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    fiber$color :function _trc_BaseActor_f_color(_thread,r,g,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    loadPage :function _trc_BaseActor_loadPage(page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20010882;//kernel.BaseActor:10882
      _this.all().die();
      //$LASTPOS=20010900;//kernel.BaseActor:10900
      new page(arg);
      //$LASTPOS=20010920;//kernel.BaseActor:10920
      _this.die();
    },
    fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20010882;//kernel.BaseActor:10882
      _this.all().die();
      //$LASTPOS=20010900;//kernel.BaseActor:10900
      new page(arg);
      //$LASTPOS=20010920;//kernel.BaseActor:10920
      _this.die();
      
      _thread.retVal=_this;return;
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20010955;//kernel.BaseActor:10955
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20010955;//kernel.BaseActor:10955
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    appear :function _trc_BaseActor_appear(o) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return o;
    },
    fiber$appear :function _trc_BaseActor_f_appear(_thread,o) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=o;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false},"appear":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.EventHandler',
  shortName: 'EventHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.EventHandlerCaller],
  methods: {
    main :function _trc_EventHandler_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=21000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=21000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=21000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=21000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=21000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      return {remove: (function anonymous_337() {
        
        //$LASTPOS=21000352;//kernel.EventHandler:352
        _this.removeListener(f);
      })};
    },
    fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=21000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=21000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=21000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      
      _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            _thread.exit({remove: (function anonymous_337() {
              
              //$LASTPOS=21000352;//kernel.EventHandler:352
              _this.removeListener(f);
            })});return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    removeListener :function _trc_EventHandler_removeListener(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=21000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=21000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
    },
    fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=21000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=21000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
      
      _thread.retVal=_this;return;
    },
    fire :function _trc_EventHandler_fire(args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      var h;
      var _it_1458;
      
      //$LASTPOS=21000499;//kernel.EventHandler:499
      if (_this.released) {
        return _this;
      }
      //$LASTPOS=21000526;//kernel.EventHandler:526
      t;
      //$LASTPOS=21000538;//kernel.EventHandler:538
      _it_1458=Tonyu.iterator(_this.listeners,1);
      while(_it_1458.next()) {
        h=_it_1458[0];
        
        //$LASTPOS=21000782;//kernel.EventHandler:782
        _this.callEventHandler(h,args);
        
      }
    },
    fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var h;
      var _it_1458;
      
      //$LASTPOS=21000499;//kernel.EventHandler:499
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=21000526;//kernel.EventHandler:526
      t;
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=21000538;//kernel.EventHandler:538
            _it_1458=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_1458.next())) { __pc=3; break; }
            h=_it_1458[0];
            
            //$LASTPOS=21000782;//kernel.EventHandler:782
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21000838;//kernel.EventHandler:838
      _this.released=true;
    },
    fiber$release :function _trc_EventHandler_f_release(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000838;//kernel.EventHandler:838
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_ScreenOutHandler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_ScreenOutHandler_addListener(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var retThread;
      
      //$LASTPOS=22000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      return {remove: (function anonymous_135() {
        
        //$LASTPOS=22000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_ScreenOutHandler_f_addListener(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=22000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      _thread.retVal={remove: (function anonymous_135() {
        
        //$LASTPOS=22000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=22000210;//kernel.ScreenOutHandler:210
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=22000228;//kernel.ScreenOutHandler:228
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_WithinHandler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_WithinHandler_addListener(d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var retThread;
      
      //$LASTPOS=23000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      return {remove: (function anonymous_137() {
        
        //$LASTPOS=23000153;//kernel.WithinHandler:153
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_WithinHandler_f_addListener(_thread,d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=23000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      _thread.retVal={remove: (function anonymous_137() {
        
        //$LASTPOS=23000153;//kernel.WithinHandler:153
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000213;//kernel.WithinHandler:213
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=23000232;//kernel.WithinHandler:232
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_NoviceActor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    sleep :function _trc_NoviceActor_sleep(n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000050;//kernel.NoviceActor:50
      if (! n) {
        //$LASTPOS=24000057;//kernel.NoviceActor:57
        n=1;
      }
      //$LASTPOS=24000066;//kernel.NoviceActor:66
      //$LASTPOS=24000070;//kernel.NoviceActor:70
      n;
      while(n>0) {
        //$LASTPOS=24000081;//kernel.NoviceActor:81
        _this.update();
        n--;
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000050;//kernel.NoviceActor:50
      if (! n) {
        //$LASTPOS=24000057;//kernel.NoviceActor:57
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000066;//kernel.NoviceActor:66
            //$LASTPOS=24000070;//kernel.NoviceActor:70
            n;;
          case 1:
            if (!(n>0)) { __pc=3; break; }
            //$LASTPOS=24000081;//kernel.NoviceActor:81
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000113;//kernel.NoviceActor:113
      if (! _this._sprite) {
        //$LASTPOS=24000137;//kernel.NoviceActor:137
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=24000207;//kernel.NoviceActor:207
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000113;//kernel.NoviceActor:113
      if (! _this._sprite) {
        //$LASTPOS=24000137;//kernel.NoviceActor:137
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=24000207;//kernel.NoviceActor:207
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000257;//kernel.NoviceActor:257
      if (! size) {
        //$LASTPOS=24000268;//kernel.NoviceActor:268
        size=15;
      }
      //$LASTPOS=24000281;//kernel.NoviceActor:281
      _this.initSprite();
      //$LASTPOS=24000299;//kernel.NoviceActor:299
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000257;//kernel.NoviceActor:257
      if (! size) {
        //$LASTPOS=24000268;//kernel.NoviceActor:268
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000281;//kernel.NoviceActor:281
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=24000299;//kernel.NoviceActor:299
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000371;//kernel.NoviceActor:371
      _this.go(x,y,p);
    },
    fiber$sprite :function _trc_NoviceActor_f_sprite(_thread,x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_sprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000371;//kernel.NoviceActor:371
            _this.fiber$go(_thread, x, y, p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    show :function _trc_NoviceActor_show(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000403;//kernel.NoviceActor:403
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000440;//kernel.NoviceActor:440
      _this._sprite.draw(ctx);
    },
    getCrashRect :function _trc_NoviceActor_getCrashRect() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this._sprite.getCrashRect();
    },
    go :function _trc_NoviceActor_go(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000533;//kernel.NoviceActor:533
      _this.initSprite();
      //$LASTPOS=24000551;//kernel.NoviceActor:551
      _this._sprite.x=x;
      //$LASTPOS=24000568;//kernel.NoviceActor:568
      _this._sprite.y=y;
      //$LASTPOS=24000585;//kernel.NoviceActor:585
      if (p!=null) {
        //$LASTPOS=24000598;//kernel.NoviceActor:598
        _this._sprite.p=p;
      }
    },
    fiber$go :function _trc_NoviceActor_f_go(_thread,x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_go(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000533;//kernel.NoviceActor:533
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=24000551;//kernel.NoviceActor:551
            _this._sprite.x=x;
            //$LASTPOS=24000568;//kernel.NoviceActor:568
            _this._sprite.y=y;
            //$LASTPOS=24000585;//kernel.NoviceActor:585
            if (p!=null) {
              //$LASTPOS=24000598;//kernel.NoviceActor:598
              _this._sprite.p=p;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    change :function _trc_NoviceActor_change(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000646;//kernel.NoviceActor:646
      _this.initSprite();
      //$LASTPOS=24000664;//kernel.NoviceActor:664
      _this._sprite.p=p;
    },
    fiber$change :function _trc_NoviceActor_f_change(_thread,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_change(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000646;//kernel.NoviceActor:646
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=24000664;//kernel.NoviceActor:664
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=25000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=25000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2; break; }
            //$LASTPOS=25000134;//kernel.MML:134
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var mml;
      
      //$LASTPOS=25000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=25000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=25000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=25000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=25000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=25000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=25000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=25000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=25000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=25000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=25000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=25000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=25000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=25000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=25000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=25000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=25000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=25000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=25000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=25000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=25000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=25000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=25000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=25000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=25000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=25000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=25000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=25000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      _thread.retVal=_this._id;return;
      
      
      _thread.retVal=_this;return;
    },
    bufferCount :function _trc_MML_bufferCount() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.mmlBuf.length;
    },
    fiber$bufferCount :function _trc_MML_f_bufferCount(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.mmlBuf.length;return;
      
      
      _thread.retVal=_this;return;
    },
    isPlaying :function _trc_MML_isPlaying() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.m;
    },
    fiber$isPlaying :function _trc_MML_f_isPlaying(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.m;return;
      
      
      _thread.retVal=_this;return;
    },
    currentTime :function _trc_MML_currentTime() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000755;//kernel.MML:755
      if (_this.m) {
        return _this.m.currentTime+_this.cTimeBase;
      }
      return - 1;
    },
    fiber$currentTime :function _trc_MML_f_currentTime(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=25000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=25000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=25000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=25000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=25000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=25000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=25000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=25001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=25000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=25000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=25000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=25000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=25000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=25000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=25000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=25001056;//kernel.MML:1056
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_PlayMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initMML :function _trc_PlayMod_initMML() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=26000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=26000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=26000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=26000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=26000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=26000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=26000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=26000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var k;
      var v;
      var _it_1465;
      
      //$LASTPOS=26000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=26000343;//kernel.PlayMod:343
        _it_1465=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_1465.next()) {
          k=_it_1465[0];
          v=_it_1465[1];
          
          //$LASTPOS=26000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=26000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=26000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=26000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=26000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var mmls;
      var i;
      
      //$LASTPOS=26000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=26000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=26000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=26000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=26000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=26000647;//kernel.PlayMod:647
      //$LASTPOS=26000652;//kernel.PlayMod:652
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=26000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=26000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=26000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=26000796;//kernel.PlayMod:796
        _this.update();
        
      }
      return _this._mml;
    },
    fiber$play :function _trc_PlayMod_f_play(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mmls;
      var i;
      
      //$LASTPOS=26000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=26000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=26000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=26000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=26000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=26000647;//kernel.PlayMod:647
      //$LASTPOS=26000652;//kernel.PlayMod:652
      i = 0;
      while(i<_arguments.length) {
        {
          //$LASTPOS=26000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
        i++;
      }
      //$LASTPOS=26000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
            //$LASTPOS=26000796;//kernel.PlayMod:796
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var mml;
      var mmls;
      var i;
      
      //$LASTPOS=26000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=26000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      //$LASTPOS=26000897;//kernel.PlayMod:897
      mmls = [];
      //$LASTPOS=26000915;//kernel.PlayMod:915
      //$LASTPOS=26000920;//kernel.PlayMod:920
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=26000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=26001002;//kernel.PlayMod:1002
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000028;//kernel.WaveTable:28
      _this.wav={};
      //$LASTPOS=27000036;//kernel.WaveTable:36
      _this.env={};
      //$LASTPOS=27000313;//kernel.WaveTable:313
      if (typeof  T!=="undefined") {
        //$LASTPOS=27000392;//kernel.WaveTable:392
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=27000460;//kernel.WaveTable:460
        _this.setEnv(0,_this.env);
        //$LASTPOS=27000480;//kernel.WaveTable:480
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000028;//kernel.WaveTable:28
      _this.wav={};
      //$LASTPOS=27000036;//kernel.WaveTable:36
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000313;//kernel.WaveTable:313
            if (!(typeof  T!=="undefined")) { __pc=3; break; }
            //$LASTPOS=27000392;//kernel.WaveTable:392
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=27000460;//kernel.WaveTable:460
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=27000480;//kernel.WaveTable:480
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000070;//kernel.WaveTable:70
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000070;//kernel.WaveTable:70
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000114;//kernel.WaveTable:114
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000114;//kernel.WaveTable:114
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var synth;
      
      //$LASTPOS=27000148;//kernel.WaveTable:148
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=27000148;//kernel.WaveTable:148
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      _thread.retVal=synth;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_WaveTable_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$stop :function _trc_WaveTable_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_ParallelMod_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    parallel :function _trc_ParallelMod_parallel() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var args;
      var i;
      var name;
      var th;
      
      //$LASTPOS=28000064;//kernel.ParallelMod:64
      args = [];
      //$LASTPOS=28000083;//kernel.ParallelMod:83
      //$LASTPOS=28000088;//kernel.ParallelMod:88
      i = 1;
      while(i<arguments.length) {
        {
          //$LASTPOS=28000134;//kernel.ParallelMod:134
          args.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=28000173;//kernel.ParallelMod:173
      name = arguments[0];
      //$LASTPOS=28000202;//kernel.ParallelMod:202
      th;
      //$LASTPOS=28000216;//kernel.ParallelMod:216
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=29000059;//kernel.Scheduler:59
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=29000059;//kernel.Scheduler:59
      _this.next=[];
      
      _thread.retVal=_this;return;
    },
    addObj :function _trc_Scheduler_addObj(obj,name,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.newThread(obj,name,args);
    },
    fiber$addObj :function _trc_Scheduler_f_addObj(_thread,obj,name,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.newThread(obj,name,args);return;
      
      
      _thread.retVal=_this;return;
    },
    newThread :function _trc_Scheduler_newThread(obj,name,args,options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var th;
      
      //$LASTPOS=29000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=29000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=29000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=29000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      //$LASTPOS=29000316;//kernel.Scheduler:316
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=29000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=29000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=29000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=29000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000316;//kernel.Scheduler:316
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000371;//kernel.Scheduler:371
      _this.cur.push(th);
      //$LASTPOS=29000390;//kernel.Scheduler:390
      th.scheduled=_this;
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000371;//kernel.Scheduler:371
      _this.cur.push(th);
      //$LASTPOS=29000390;//kernel.Scheduler:390
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000435;//kernel.Scheduler:435
      _this.next.push(th);
      //$LASTPOS=29000455;//kernel.Scheduler:455
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000435;//kernel.Scheduler:435
      _this.next.push(th);
      //$LASTPOS=29000455;//kernel.Scheduler:455
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      var _it_1480;
      
      //$LASTPOS=29000497;//kernel.Scheduler:497
      _it_1480=Tonyu.iterator(_this.cur,1);
      while(_it_1480.next()) {
        t=_it_1480[0];
        
        //$LASTPOS=29000524;//kernel.Scheduler:524
        delete t.scheduled;
        //$LASTPOS=29000553;//kernel.Scheduler:553
        t.steps();
        //$LASTPOS=29000573;//kernel.Scheduler:573
        if (t.preempted) {
          //$LASTPOS=29000650;//kernel.Scheduler:650
          _this.addToNext(t);
          
        }
        
      }
      //$LASTPOS=29000687;//kernel.Scheduler:687
      _this.cur=_this.next;
      //$LASTPOS=29000702;//kernel.Scheduler:702
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_1480;
      
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000497;//kernel.Scheduler:497
            _it_1480=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_1480.next())) { __pc=4; break; }
            t=_it_1480[0];
            
            //$LASTPOS=29000524;//kernel.Scheduler:524
            delete t.scheduled;
            //$LASTPOS=29000553;//kernel.Scheduler:553
            t.steps();
            //$LASTPOS=29000573;//kernel.Scheduler:573
            if (!(t.preempted)) { __pc=3; break; }
            //$LASTPOS=29000650;//kernel.Scheduler:650
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=29000687;//kernel.Scheduler:687
            _this.cur=_this.next;
            //$LASTPOS=29000702;//kernel.Scheduler:702
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Actor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Actor_initialize(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30000105;//kernel.Actor:105
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=30000147;//kernel.Actor:147
      _this.initSprite();
    },
    initSprite :function _trc_Actor_initSprite() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=30000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=30000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=30000308;//kernel.Actor:308
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=30000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=30000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000308;//kernel.Actor:308
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_Actor_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$onAppear :function _trc_Actor_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_CrashToHandler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_CrashToHandler_addListener(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var retThread;
      
      //$LASTPOS=31000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      return {remove: (function anonymous_133() {
        
        //$LASTPOS=31000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_CrashToHandler_f_addListener(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=31000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      _thread.retVal={remove: (function anonymous_133() {
        
        //$LASTPOS=31000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=31000209;//kernel.CrashToHandler:209
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=31000228;//kernel.CrashToHandler:228
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_GameScreen_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_GameScreen_initialize(opt) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=32000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=32000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=32000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=32000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=32000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=32000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=32000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=32000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=32000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=32000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=32000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=32000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=32000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=32000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      
      //$LASTPOS=32000655;//kernel.GameScreen:655
      b = _this.bounds;
      //$LASTPOS=32000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=32000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=32000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      
      //$LASTPOS=32000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=32000878;//kernel.GameScreen:878
      if (! b) {
        return point;
      }
      return {x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};
    },
    fiber$canvas2buf :function _trc_GameScreen_f_canvas2buf(_thread,point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      
      //$LASTPOS=32000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=32000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=32001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      
      //$LASTPOS=32001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=32001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=32001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=32001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=32001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=32001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=32001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=32001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=32001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=32001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=32001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32001265;//kernel.GameScreen:1265
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Map_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Map_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var j;
      var i;
      
      //$LASTPOS=33000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=33000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=33000082;//kernel.Map:82
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=33000101;//kernel.Map:101
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=33000173;//kernel.Map:173
      _this.mapObj=true;
      //$LASTPOS=33000191;//kernel.Map:191
      _this.mapTable=[];
      //$LASTPOS=33000211;//kernel.Map:211
      _this.mapOnTable=[];
      //$LASTPOS=33000233;//kernel.Map:233
      //$LASTPOS=33000237;//kernel.Map:237
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=33000266;//kernel.Map:266
          _this.rows=[];
          //$LASTPOS=33000286;//kernel.Map:286
          //$LASTPOS=33000290;//kernel.Map:290
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=33000323;//kernel.Map:323
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=33000358;//kernel.Map:358
          _this.mapTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=33000391;//kernel.Map:391
      //$LASTPOS=33000395;//kernel.Map:395
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=33000424;//kernel.Map:424
          _this.rows=[];
          //$LASTPOS=33000444;//kernel.Map:444
          //$LASTPOS=33000448;//kernel.Map:448
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=33000481;//kernel.Map:481
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=33000516;//kernel.Map:516
          _this.mapOnTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=33000616;//kernel.Map:616
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=33000648;//kernel.Map:648
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=33000674;//kernel.Map:674
      //$LASTPOS=33000678;//kernel.Map:678
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=33000707;//kernel.Map:707
          //$LASTPOS=33000711;//kernel.Map:711
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=33000744;//kernel.Map:744
              _this.set(j,i,_this.mapData[i][j]);
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=33000791;//kernel.Map:791
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=33000819;//kernel.Map:819
      //$LASTPOS=33000823;//kernel.Map:823
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=33000852;//kernel.Map:852
          //$LASTPOS=33000856;//kernel.Map:856
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=33000889;//kernel.Map:889
              _this.setOn(j,i,_this.mapOnData[i][j]);
            }
            j++;
          }
        }
        i++;
      }
    },
    fiber$initMap :function _trc_Map_f_initMap(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=33000648;//kernel.Map:648
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000674;//kernel.Map:674
            //$LASTPOS=33000678;//kernel.Map:678
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=5; break; }
            //$LASTPOS=33000707;//kernel.Map:707
            //$LASTPOS=33000711;//kernel.Map:711
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=4; break; }
            //$LASTPOS=33000744;//kernel.Map:744
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
            j++;
            __pc=2;break;
          case 4:
            
            i++;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=33000791;//kernel.Map:791
            if (!(! _this.mapOnData)) { __pc=6; break; }
            _thread.exit(_this);return;
          case 6:
            
            //$LASTPOS=33000819;//kernel.Map:819
            //$LASTPOS=33000823;//kernel.Map:823
            i = 0;;
          case 7:
            if (!(i<_this.row)) { __pc=11; break; }
            //$LASTPOS=33000852;//kernel.Map:852
            //$LASTPOS=33000856;//kernel.Map:856
            j = 0;;
          case 8:
            if (!(j<_this.col)) { __pc=10; break; }
            //$LASTPOS=33000889;//kernel.Map:889
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
    load :function _trc_Map_load(dataFile) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33000961;//kernel.Map:961
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=33001013;//kernel.Map:1013
      if (! _this.baseData) {
        //$LASTPOS=33001027;//kernel.Map:1027
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=33001063;//kernel.Map:1063
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=33001090;//kernel.Map:1090
      _this.mapData=_this.mapTable;
      //$LASTPOS=33001113;//kernel.Map:1113
      _this.row=_this.mapTable.length;
      //$LASTPOS=33001139;//kernel.Map:1139
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=33001168;//kernel.Map:1168
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=33001197;//kernel.Map:1197
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=33001224;//kernel.Map:1224
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=33001296;//kernel.Map:1296
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000961;//kernel.Map:961
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=33001013;//kernel.Map:1013
      if (! _this.baseData) {
        //$LASTPOS=33001027;//kernel.Map:1027
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=33001063;//kernel.Map:1063
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=33001090;//kernel.Map:1090
      _this.mapData=_this.mapTable;
      //$LASTPOS=33001113;//kernel.Map:1113
      _this.row=_this.mapTable.length;
      //$LASTPOS=33001139;//kernel.Map:1139
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=33001168;//kernel.Map:1168
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=33001197;//kernel.Map:1197
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=33001224;//kernel.Map:1224
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33001296;//kernel.Map:1296
            _this.fiber$initMap(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    set :function _trc_Map_set(setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33001339;//kernel.Map:1339
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=33001407;//kernel.Map:1407
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=33001478;//kernel.Map:1478
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33001512;//kernel.Map:1512
      p=Math.floor(p);
      //$LASTPOS=33001534;//kernel.Map:1534
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=33001572;//kernel.Map:1572
      if (! _this.pImg) {
        //$LASTPOS=33001594;//kernel.Map:1594
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=33001695;//kernel.Map:1695
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=33001772;//kernel.Map:1772
      _this.ctx.save();
      //$LASTPOS=33001789;//kernel.Map:1789
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=33001933;//kernel.Map:1933
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001339;//kernel.Map:1339
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=33001407;//kernel.Map:1407
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=33001478;//kernel.Map:1478
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33001512;//kernel.Map:1512
      p=Math.floor(p);
      //$LASTPOS=33001534;//kernel.Map:1534
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=33001572;//kernel.Map:1572
      if (! _this.pImg) {
        //$LASTPOS=33001594;//kernel.Map:1594
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=33001695;//kernel.Map:1695
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=33001772;//kernel.Map:1772
      _this.ctx.save();
      //$LASTPOS=33001789;//kernel.Map:1789
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=33001933;//kernel.Map:1933
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33001982;//kernel.Map:1982
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=33002050;//kernel.Map:2050
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=33002100;//kernel.Map:2100
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=33002135;//kernel.Map:2135
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=33002169;//kernel.Map:2169
      p=Math.floor(p);
      //$LASTPOS=33002191;//kernel.Map:2191
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=33002229;//kernel.Map:2229
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=33002253;//kernel.Map:2253
      _this.ctx.save();
      //$LASTPOS=33002270;//kernel.Map:2270
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=33002414;//kernel.Map:2414
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33001982;//kernel.Map:1982
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33002050;//kernel.Map:2050
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=33002100;//kernel.Map:2100
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=33002135;//kernel.Map:2135
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=33002169;//kernel.Map:2169
            p=Math.floor(p);
            //$LASTPOS=33002191;//kernel.Map:2191
            _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
            //$LASTPOS=33002229;//kernel.Map:2229
            if (!(! _this.pImg)) { __pc=2; break; }
            _thread.exit(_this);return;
          case 2:
            
            //$LASTPOS=33002253;//kernel.Map:2253
            _this.ctx.save();
            //$LASTPOS=33002270;//kernel.Map:2270
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=33002414;//kernel.Map:2414
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33002461;//kernel.Map:2461
      _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
    },
    fiber$setOnAt :function _trc_Map_f_setOnAt(_thread,setX,setY,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Map_ent_setOnAt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33002461;//kernel.Map:2461
            _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAt :function _trc_Map_setAt(setX,setY,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33002556;//kernel.Map:2556
      _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
    },
    fiber$setAt :function _trc_Map_f_setAt(_thread,setX,setY,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Map_ent_setAt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33002556;//kernel.Map:2556
            _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    get :function _trc_Map_get(getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33002649;//kernel.Map:2649
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33002649;//kernel.Map:2649
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getAt :function _trc_Map_getAt(getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
    },
    fiber$getAt :function _trc_Map_f_getAt(_thread,getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    getOn :function _trc_Map_getOn(getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33002881;//kernel.Map:2881
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapOnTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33002881;//kernel.Map:2881
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapOnTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getOnAt :function _trc_Map_getOnAt(getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
    },
    fiber$getOnAt :function _trc_Map_f_getOnAt(_thread,getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Map_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33003124;//kernel.Map:3124
      _this.sx=- scrollX;
      //$LASTPOS=33003142;//kernel.Map:3142
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33003124;//kernel.Map:3124
      _this.sx=- scrollX;
      //$LASTPOS=33003142;//kernel.Map:3142
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=33003177;//kernel.Map:3177
      _this.pImg=_this.buf[0];
      //$LASTPOS=33003195;//kernel.Map:3195
      ctx.save();
      //$LASTPOS=33003212;//kernel.Map:3212
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=33003324;//kernel.Map:3324
      ctx.restore();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Panel',
  shortName: 'Panel',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Panel_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Panel_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Panel_initialize(opt) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34000072;//kernel.Panel:72
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=34000089;//kernel.Panel:89
      _this.width=_this.width;
      //$LASTPOS=34000112;//kernel.Panel:112
      _this.height=_this.height;
      //$LASTPOS=34000137;//kernel.Panel:137
      if (_this.align==null) {
        //$LASTPOS=34000153;//kernel.Panel:153
        _this.align="center";
      }
      //$LASTPOS=34000174;//kernel.Panel:174
      if (_this.alpha==null) {
        //$LASTPOS=34000190;//kernel.Panel:190
        _this.alpha=255;
      }
      //$LASTPOS=34000206;//kernel.Panel:206
      if (_this._drawn==null) {
        //$LASTPOS=34000223;//kernel.Panel:223
        _this._drawn=false;
      }
      //$LASTPOS=34000242;//kernel.Panel:242
      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=34000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=34000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=34000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=34000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34000432;//kernel.Panel:432
      _this.setPanel(width,height);
    },
    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_resize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000432;//kernel.Panel:432
            _this.fiber$setPanel(_thread, width, height);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getContext :function _trc_Panel_getContext() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34000480;//kernel.Panel:480
      _this._drawn=true;
      return _this.buf[0].getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000480;//kernel.Panel:480
      _this._drawn=true;
      _thread.retVal=_this.buf[0].getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34000561;//kernel.Panel:561
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000561;//kernel.Panel:561
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34000629;//kernel.Panel:629
      _this.ctx=_this.getContext();
      //$LASTPOS=34000652;//kernel.Panel:652
      _this.ctx.save();
      //$LASTPOS=34000719;//kernel.Panel:719
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=34000749;//kernel.Panel:749
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=34000794;//kernel.Panel:794
      _this.ctx.restore();
    },
    fiber$fillRect :function _trc_Panel_f_fillRect(_thread,x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_fillRect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000629;//kernel.Panel:629
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=34000652;//kernel.Panel:652
            _this.ctx.save();
            //$LASTPOS=34000719;//kernel.Panel:719
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=34000749;//kernel.Panel:749
            _this.ctx.fillRect(x,y,rectWidth,rectHeight);
            //$LASTPOS=34000794;//kernel.Panel:794
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var splits;
      var colCount;
      
      //$LASTPOS=34000850;//kernel.Panel:850
      _this.ctx=_this.getContext();
      //$LASTPOS=34000873;//kernel.Panel:873
      _this.ctx.save();
      //$LASTPOS=34000890;//kernel.Panel:890
      text=text+"";
      //$LASTPOS=34000909;//kernel.Panel:909
      splits = text.split("\n");
      //$LASTPOS=34000995;//kernel.Panel:995
      _this.ctx.textAlign=align;
      //$LASTPOS=34001023;//kernel.Panel:1023
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=34001053;//kernel.Panel:1053
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=34001092;//kernel.Panel:1092
      //$LASTPOS=34001096;//kernel.Panel:1096
      colCount = 0;
      while(colCount<splits.length) {
        {
          //$LASTPOS=34001156;//kernel.Panel:1156
          _this.ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=34001201;//kernel.Panel:1201
          y+=size;
        }
        colCount++;
      }
      //$LASTPOS=34001222;//kernel.Panel:1222
      _this.ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var splits;
      var colCount;
      
      
      _thread.enter(function _trc_Panel_ent_fillText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000850;//kernel.Panel:850
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=34000873;//kernel.Panel:873
            _this.ctx.save();
            //$LASTPOS=34000890;//kernel.Panel:890
            text=text+"";
            //$LASTPOS=34000909;//kernel.Panel:909
            splits = text.split("\n");
            //$LASTPOS=34000995;//kernel.Panel:995
            _this.ctx.textAlign=align;
            //$LASTPOS=34001023;//kernel.Panel:1023
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=34001053;//kernel.Panel:1053
            _this.ctx.font=size+"px 'Courier New'";
            //$LASTPOS=34001092;//kernel.Panel:1092
            //$LASTPOS=34001096;//kernel.Panel:1096
            colCount = 0;
            while(colCount<splits.length) {
              {
                //$LASTPOS=34001156;//kernel.Panel:1156
                _this.ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=34001201;//kernel.Panel:1201
                y+=size;
              }
              colCount++;
            }
            //$LASTPOS=34001222;//kernel.Panel:1222
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34001287;//kernel.Panel:1287
      _this.ctx=_this.getContext();
      //$LASTPOS=34001310;//kernel.Panel:1310
      _this.ctx.save();
      //$LASTPOS=34001327;//kernel.Panel:1327
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=34001376;//kernel.Panel:1376
      _this.ctx.restore();
    },
    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_clearRect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34001287;//kernel.Panel:1287
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=34001310;//kernel.Panel:1310
            _this.ctx.save();
            //$LASTPOS=34001327;//kernel.Panel:1327
            _this.ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=34001376;//kernel.Panel:1376
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34001422;//kernel.Panel:1422
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=34001521;//kernel.Panel:1521
        _this.ctx=_this.getContext();
        //$LASTPOS=34001548;//kernel.Panel:1548
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=34001600;//kernel.Panel:1600
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=34001740;//kernel.Panel:1740
        _this.colordata=[0,0,0,0];
        
      }
      return (_this.colordata);
    },
    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_getPixel(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34001422;//kernel.Panel:1422
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
            //$LASTPOS=34001521;//kernel.Panel:1521
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=34001548;//kernel.Panel:1548
            _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=34001600;//kernel.Panel:1600
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=34001740;//kernel.Panel:1740
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34001827;//kernel.Panel:1827
      _this.ctx=_this.getContext();
      //$LASTPOS=34001850;//kernel.Panel:1850
      _this.ctx.save();
      //$LASTPOS=34001867;//kernel.Panel:1867
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=34001928;//kernel.Panel:1928
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=34001962;//kernel.Panel:1962
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=34002014;//kernel.Panel:2014
      _this.ctx.restore();
    },
    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_scroll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34001827;//kernel.Panel:1827
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=34001850;//kernel.Panel:1850
            _this.ctx.save();
            //$LASTPOS=34001867;//kernel.Panel:1867
            _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=34001928;//kernel.Panel:1928
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=34001962;//kernel.Panel:1962
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=34002014;//kernel.Panel:2014
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=34002050;//kernel.Panel:2050
      if (_this._drawn) {
        //$LASTPOS=34002071;//kernel.Panel:2071
        _this.pImg=_this.buf[0];
        //$LASTPOS=34002093;//kernel.Panel:2093
        ctx.save();
        //$LASTPOS=34002114;//kernel.Panel:2114
        if (_this.align=="left") {
          //$LASTPOS=34002146;//kernel.Panel:2146
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=34002198;//kernel.Panel:2198
          if (_this.align=="center") {
            //$LASTPOS=34002232;//kernel.Panel:2232
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=34002267;//kernel.Panel:2267
            if (_this.align=="right") {
              //$LASTPOS=34002300;//kernel.Panel:2300
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=34002357;//kernel.Panel:2357
        if (_this.rotation!=0) {
          //$LASTPOS=34002392;//kernel.Panel:2392
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=34002460;//kernel.Panel:2460
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=34002517;//kernel.Panel:2517
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=34002558;//kernel.Panel:2558
        ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=34002662;//kernel.Panel:2662
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_ScaledCanvas_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScaledCanvas_initialize(opt) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=35000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=35000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=35000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=35000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=35000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=35000257;//kernel.ScaledCanvas:257
      _this.color="rgb(20,80,180)";
      //$LASTPOS=35000291;//kernel.ScaledCanvas:291
      _this.sx=0;
      //$LASTPOS=35000302;//kernel.ScaledCanvas:302
      _this.sy=0;
      //$LASTPOS=35000313;//kernel.ScaledCanvas:313
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=35000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=35000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=35000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=35000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=35000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=35000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=35000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=35000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=35000632;//kernel.ScaledCanvas:632
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=35000666;//kernel.ScaledCanvas:666
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=35000704;//kernel.ScaledCanvas:704
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=35000732;//kernel.ScaledCanvas:732
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=35000793;//kernel.ScaledCanvas:793
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=35000834;//kernel.ScaledCanvas:834
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=35000876;//kernel.ScaledCanvas:876
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=35000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=35000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=35000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=35000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=35000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=35000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=35000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=35000632;//kernel.ScaledCanvas:632
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=35000666;//kernel.ScaledCanvas:666
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=35000704;//kernel.ScaledCanvas:704
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=35000732;//kernel.ScaledCanvas:732
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=35000793;//kernel.ScaledCanvas:793
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=35000834;//kernel.ScaledCanvas:834
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=35000876;//kernel.ScaledCanvas:876
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var larger;
      var smaller;
      
      //$LASTPOS=35000998;//kernel.ScaledCanvas:998
      larger = 200;
      //$LASTPOS=35001019;//kernel.ScaledCanvas:1019
      smaller = 5;
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=35000998;//kernel.ScaledCanvas:998
      larger = 200;
      //$LASTPOS=35001019;//kernel.ScaledCanvas:1019
      smaller = 5;
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_ScaledCanvas_draw() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=35001154;//kernel.ScaledCanvas:1154
      _this.cw=_this.canvas.width();
      //$LASTPOS=35001178;//kernel.ScaledCanvas:1178
      _this.ch=_this.canvas.height();
      //$LASTPOS=35001203;//kernel.ScaledCanvas:1203
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=35001247;//kernel.ScaledCanvas:1247
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=35001291;//kernel.ScaledCanvas:1291
      if (calch>_this.ch) {
        //$LASTPOS=35001305;//kernel.ScaledCanvas:1305
        calch=_this.ch;
      }
      //$LASTPOS=35001320;//kernel.ScaledCanvas:1320
      if (calcw>_this.cw) {
        //$LASTPOS=35001334;//kernel.ScaledCanvas:1334
        calcw=_this.cw;
      }
      //$LASTPOS=35001349;//kernel.ScaledCanvas:1349
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=35001381;//kernel.ScaledCanvas:1381
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=35001437;//kernel.ScaledCanvas:1437
        calcw=_this.width;
        //$LASTPOS=35001449;//kernel.ScaledCanvas:1449
        calch=_this.height;
        
      }
      //$LASTPOS=35001475;//kernel.ScaledCanvas:1475
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=35001518;//kernel.ScaledCanvas:1518
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=35001561;//kernel.ScaledCanvas:1561
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=35001676;//kernel.ScaledCanvas:1676
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=35001720;//kernel.ScaledCanvas:1720
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=35001764;//kernel.ScaledCanvas:1764
      if (calch>_this.ch) {
        //$LASTPOS=35001778;//kernel.ScaledCanvas:1778
        calch=_this.ch;
      }
      //$LASTPOS=35001793;//kernel.ScaledCanvas:1793
      if (calcw>_this.cw) {
        //$LASTPOS=35001807;//kernel.ScaledCanvas:1807
        calcw=_this.cw;
      }
      //$LASTPOS=35001822;//kernel.ScaledCanvas:1822
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=35001878;//kernel.ScaledCanvas:1878
        calcw=_this.width;
        //$LASTPOS=35001890;//kernel.ScaledCanvas:1890
        calch=_this.height;
        
      }
      //$LASTPOS=35001916;//kernel.ScaledCanvas:1916
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=35001959;//kernel.ScaledCanvas:1959
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=35002055;//kernel.ScaledCanvas:2055
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
    },
    fiber$canvas2buf :function _trc_ScaledCanvas_f_canvas2buf(_thread,point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=35001676;//kernel.ScaledCanvas:1676
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=35001720;//kernel.ScaledCanvas:1720
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=35001764;//kernel.ScaledCanvas:1764
      if (calch>_this.ch) {
        //$LASTPOS=35001778;//kernel.ScaledCanvas:1778
        calch=_this.ch;
      }
      //$LASTPOS=35001793;//kernel.ScaledCanvas:1793
      if (calcw>_this.cw) {
        //$LASTPOS=35001807;//kernel.ScaledCanvas:1807
        calcw=_this.cw;
      }
      //$LASTPOS=35001822;//kernel.ScaledCanvas:1822
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=35001878;//kernel.ScaledCanvas:1878
        calcw=_this.width;
        //$LASTPOS=35001890;//kernel.ScaledCanvas:1890
        calch=_this.height;
        
      }
      //$LASTPOS=35001916;//kernel.ScaledCanvas:1916
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=35001959;//kernel.ScaledCanvas:1959
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=35002055;//kernel.ScaledCanvas:2055
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=35002228;//kernel.ScaledCanvas:2228
      _this.color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35002228;//kernel.ScaledCanvas:2228
      _this.color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      
      //$LASTPOS=35002272;//kernel.ScaledCanvas:2272
      ctx = cv.getContext("2d");
      //$LASTPOS=35002306;//kernel.ScaledCanvas:2306
      ctx.save();
      //$LASTPOS=35002323;//kernel.ScaledCanvas:2323
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=35002357;//kernel.ScaledCanvas:2357
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=35002383;//kernel.ScaledCanvas:2383
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=35002426;//kernel.ScaledCanvas:2426
      if (_this.isDrawGrid) {
        //$LASTPOS=35002442;//kernel.ScaledCanvas:2442
        _this.drawGrid(cv);
      }
      //$LASTPOS=35002461;//kernel.ScaledCanvas:2461
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=35002272;//kernel.ScaledCanvas:2272
      ctx = cv.getContext("2d");
      //$LASTPOS=35002306;//kernel.ScaledCanvas:2306
      ctx.save();
      //$LASTPOS=35002323;//kernel.ScaledCanvas:2323
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=35002357;//kernel.ScaledCanvas:2357
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=35002383;//kernel.ScaledCanvas:2383
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=35002426;//kernel.ScaledCanvas:2426
      if (_this.isDrawGrid) {
        //$LASTPOS=35002442;//kernel.ScaledCanvas:2442
        _this.drawGrid(cv);
      }
      //$LASTPOS=35002461;//kernel.ScaledCanvas:2461
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=35002805;//kernel.ScaledCanvas:2805
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35002805;//kernel.ScaledCanvas:2805
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Sprites_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Sprites_initialize() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=36000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=36000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=36000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=36000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=36000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=36000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=36000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=36000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=36000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=36000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=36000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var idx;
      
      //$LASTPOS=36000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=36000433;//kernel.Sprites:433
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=36000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=36000485;//kernel.Sprites:485
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=36000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=36000433;//kernel.Sprites:433
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=36000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=36000485;//kernel.Sprites:485
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=36000542;//kernel.Sprites:542
      //$LASTPOS=36000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=36000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=36000641;//kernel.Sprites:641
            _this.sprites.splice(i,1);
            
          }
        }
        i--;
      }
    },
    fiber$removeOneframes :function _trc_Sprites_f_removeOneframes(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=36000542;//kernel.Sprites:542
      //$LASTPOS=36000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=36000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=36000641;//kernel.Sprites:641
            _this.sprites.splice(i,1);
            
          }
        }
        i--;
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=36000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var val1;
      var val2;
      
      //$LASTPOS=36000775;//kernel.Sprites:775
      val1 = obj1.zOrder||0;
      //$LASTPOS=36000805;//kernel.Sprites:805
      val2 = obj2.zOrder||0;
      //$LASTPOS=36000835;//kernel.Sprites:835
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=36000881;//kernel.Sprites:881
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=36000926;//kernel.Sprites:926
          if (val1==val2) {
            //$LASTPOS=36000951;//kernel.Sprites:951
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var val1;
      var val2;
      
      //$LASTPOS=36000775;//kernel.Sprites:775
      val1 = obj1.zOrder||0;
      //$LASTPOS=36000805;//kernel.Sprites:805
      val2 = obj2.zOrder||0;
      //$LASTPOS=36000835;//kernel.Sprites:835
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=36000881;//kernel.Sprites:881
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=36000926;//kernel.Sprites:926
          if (val1==val2) {
            //$LASTPOS=36000951;//kernel.Sprites:951
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      var orderArray;
      
      //$LASTPOS=36001111;//kernel.Sprites:1111
      ctx = cv.getContext("2d");
      //$LASTPOS=36001145;//kernel.Sprites:1145
      ctx.save();
      //$LASTPOS=36001290;//kernel.Sprites:1290
      orderArray = [];
      //$LASTPOS=36001314;//kernel.Sprites:1314
      orderArray=orderArray.concat(_this.sprites);
      //$LASTPOS=36001358;//kernel.Sprites:1358
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=36001391;//kernel.Sprites:1391
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=36001420;//kernel.Sprites:1420
      orderArray.forEach((function anonymous_1439(s) {
        
        //$LASTPOS=36001454;//kernel.Sprites:1454
        s.draw(ctx);
      }));
      //$LASTPOS=36001481;//kernel.Sprites:1481
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=36001527;//kernel.Sprites:1527
      _this.hitWatchers.forEach((function anonymous_1547(w) {
        
        //$LASTPOS=36001571;//kernel.Sprites:1571
        _this.sprites.forEach((function anonymous_1587(a) {
          var a_owner;
          
          //$LASTPOS=36001659;//kernel.Sprites:1659
          a_owner = a;
          //$LASTPOS=36001701;//kernel.Sprites:1701
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=36001754;//kernel.Sprites:1754
          _this.sprites.forEach((function anonymous_1770(b) {
            var b_owner;
            
            //$LASTPOS=36001802;//kernel.Sprites:1802
            b_owner = b;
            //$LASTPOS=36001848;//kernel.Sprites:1848
            if (a===b) {
              return _this;
            }
            //$LASTPOS=36001884;//kernel.Sprites:1884
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=36001989;//kernel.Sprites:1989
            if (a.crashTo1(b)) {
              //$LASTPOS=36002092;//kernel.Sprites:2092
              w.h(a_owner,b_owner);
              
            }
          }));
        }));
      }));
    },
    fiber$checkHit :function _trc_Sprites_f_checkHit(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36001527;//kernel.Sprites:1527
      _this.hitWatchers.forEach((function anonymous_1547(w) {
        
        //$LASTPOS=36001571;//kernel.Sprites:1571
        _this.sprites.forEach((function anonymous_1587(a) {
          var a_owner;
          
          //$LASTPOS=36001659;//kernel.Sprites:1659
          a_owner = a;
          //$LASTPOS=36001701;//kernel.Sprites:1701
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=36001754;//kernel.Sprites:1754
          _this.sprites.forEach((function anonymous_1770(b) {
            var b_owner;
            
            //$LASTPOS=36001802;//kernel.Sprites:1802
            b_owner = b;
            //$LASTPOS=36001848;//kernel.Sprites:1848
            if (a===b) {
              return _this;
            }
            //$LASTPOS=36001884;//kernel.Sprites:1884
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=36001989;//kernel.Sprites:1989
            if (a.crashTo1(b)) {
              //$LASTPOS=36002092;//kernel.Sprites:2092
              w.h(a_owner,b_owner);
              
            }
          }));
        }));
      }));
      
      _thread.retVal=_this;return;
    },
    watchHit :function _trc_Sprites_watchHit(typeA,typeB,onHit) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var p;
      
      //$LASTPOS=36002222;//kernel.Sprites:2222
      p = {A: typeA,B: typeB,h: onHit};
      //$LASTPOS=36002286;//kernel.Sprites:2286
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      var i;
      
      //$LASTPOS=36002339;//kernel.Sprites:2339
      ctx = c.getContext("2d");
      //$LASTPOS=36002372;//kernel.Sprites:2372
      ctx.textBaseline="top";
      //$LASTPOS=36002401;//kernel.Sprites:2401
      ctx.save();
      //$LASTPOS=36002418;//kernel.Sprites:2418
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=36002458;//kernel.Sprites:2458
      //$LASTPOS=36002463;//kernel.Sprites:2463
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=36002503;//kernel.Sprites:2503
          ctx.beginPath();
          //$LASTPOS=36002529;//kernel.Sprites:2529
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36002575;//kernel.Sprites:2575
          ctx.moveTo(i,0);
          //$LASTPOS=36002601;//kernel.Sprites:2601
          ctx.lineTo(i,c.height);
          //$LASTPOS=36002634;//kernel.Sprites:2634
          ctx.closePath();
          //$LASTPOS=36002660;//kernel.Sprites:2660
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=36002692;//kernel.Sprites:2692
      //$LASTPOS=36002697;//kernel.Sprites:2697
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=36002738;//kernel.Sprites:2738
          ctx.beginPath();
          //$LASTPOS=36002764;//kernel.Sprites:2764
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36002810;//kernel.Sprites:2810
          ctx.moveTo(0,i);
          //$LASTPOS=36002836;//kernel.Sprites:2836
          ctx.lineTo(c.width,i);
          //$LASTPOS=36002868;//kernel.Sprites:2868
          ctx.closePath();
          //$LASTPOS=36002894;//kernel.Sprites:2894
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=36002920;//kernel.Sprites:2920
      ctx.fillStyle="white";
      //$LASTPOS=36002948;//kernel.Sprites:2948
      ctx.font="15px monospaced";
      //$LASTPOS=36002981;//kernel.Sprites:2981
      //$LASTPOS=36002986;//kernel.Sprites:2986
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=36003029;//kernel.Sprites:3029
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=36003063;//kernel.Sprites:3063
      //$LASTPOS=36003068;//kernel.Sprites:3068
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=36003112;//kernel.Sprites:3112
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=36003146;//kernel.Sprites:3146
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=36002339;//kernel.Sprites:2339
      ctx = c.getContext("2d");
      //$LASTPOS=36002372;//kernel.Sprites:2372
      ctx.textBaseline="top";
      //$LASTPOS=36002401;//kernel.Sprites:2401
      ctx.save();
      //$LASTPOS=36002418;//kernel.Sprites:2418
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=36002458;//kernel.Sprites:2458
      //$LASTPOS=36002463;//kernel.Sprites:2463
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=36002503;//kernel.Sprites:2503
          ctx.beginPath();
          //$LASTPOS=36002529;//kernel.Sprites:2529
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36002575;//kernel.Sprites:2575
          ctx.moveTo(i,0);
          //$LASTPOS=36002601;//kernel.Sprites:2601
          ctx.lineTo(i,c.height);
          //$LASTPOS=36002634;//kernel.Sprites:2634
          ctx.closePath();
          //$LASTPOS=36002660;//kernel.Sprites:2660
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=36002692;//kernel.Sprites:2692
      //$LASTPOS=36002697;//kernel.Sprites:2697
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=36002738;//kernel.Sprites:2738
          ctx.beginPath();
          //$LASTPOS=36002764;//kernel.Sprites:2764
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=36002810;//kernel.Sprites:2810
          ctx.moveTo(0,i);
          //$LASTPOS=36002836;//kernel.Sprites:2836
          ctx.lineTo(c.width,i);
          //$LASTPOS=36002868;//kernel.Sprites:2868
          ctx.closePath();
          //$LASTPOS=36002894;//kernel.Sprites:2894
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=36002920;//kernel.Sprites:2920
      ctx.fillStyle="white";
      //$LASTPOS=36002948;//kernel.Sprites:2948
      ctx.font="15px monospaced";
      //$LASTPOS=36002981;//kernel.Sprites:2981
      //$LASTPOS=36002986;//kernel.Sprites:2986
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=36003029;//kernel.Sprites:3029
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=36003063;//kernel.Sprites:3063
      //$LASTPOS=36003068;//kernel.Sprites:3068
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=36003112;//kernel.Sprites:3112
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=36003146;//kernel.Sprites:3146
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setImageList :function _trc_Sprites_setImageList(il) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=36003198;//kernel.Sprites:3198
      _this.imageList=il;
    },
    fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36003198;//kernel.Sprites:3198
      _this.imageList=il;
      
      _thread.retVal=_this;return;
    },
    getImageList :function _trc_Sprites_getImageList() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.imageList;
    },
    fiber$getImageList :function _trc_Sprites_f_getImageList(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.imageList;return;
      
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=36003310;//kernel.Sprites:3310
      _this.sx=scrollX;
      //$LASTPOS=36003327;//kernel.Sprites:3327
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36003310;//kernel.Sprites:3310
      _this.sx=scrollX;
      //$LASTPOS=36003327;//kernel.Sprites:3327
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_BodyActor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    getWorld :function _trc_BodyActor_getWorld() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37000064;//kernel.BodyActor:64
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=37000099;//kernel.BodyActor:99
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000064;//kernel.BodyActor:64
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=37000099;//kernel.BodyActor:99
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      _thread.retVal=Tonyu.globals.$t2World;return;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_BodyActor_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      
      //$LASTPOS=37000162;//kernel.BodyActor:162
      wworld = _this.getWorld();
      //$LASTPOS=37000189;//kernel.BodyActor:189
      _this.world=wworld.world;
      //$LASTPOS=37000213;//kernel.BodyActor:213
      _this.scale=wworld.scale;
      //$LASTPOS=37000237;//kernel.BodyActor:237
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37000280;//kernel.BodyActor:280
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=37000326;//kernel.BodyActor:326
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=37000366;//kernel.BodyActor:366
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=37000418;//kernel.BodyActor:418
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=37000464;//kernel.BodyActor:464
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=37000528;//kernel.BodyActor:528
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=37000595;//kernel.BodyActor:595
      fixDef = new b2FixtureDef;
      //$LASTPOS=37000630;//kernel.BodyActor:630
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=37000671;//kernel.BodyActor:671
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=37000714;//kernel.BodyActor:714
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=37000768;//kernel.BodyActor:768
      bodyDef = new b2BodyDef;
      //$LASTPOS=37000801;//kernel.BodyActor:801
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=37000886;//kernel.BodyActor:886
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=37000921;//kernel.BodyActor:921
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=37000956;//kernel.BodyActor:956
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=37001004;//kernel.BodyActor:1004
      w = _this.width;h = _this.height;
      //$LASTPOS=37001030;//kernel.BodyActor:1030
      if (! w) {
        //$LASTPOS=37001048;//kernel.BodyActor:1048
        _this.detectShape();
        //$LASTPOS=37001071;//kernel.BodyActor:1071
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=37001100;//kernel.BodyActor:1100
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=37001140;//kernel.BodyActor:1140
      if (_this.shape=="box") {
        //$LASTPOS=37001168;//kernel.BodyActor:1168
        if (! h) {
          //$LASTPOS=37001176;//kernel.BodyActor:1176
          h=w;
        }
        //$LASTPOS=37001189;//kernel.BodyActor:1189
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=37001232;//kernel.BodyActor:1232
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=37001333;//kernel.BodyActor:1333
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=37001369;//kernel.BodyActor:1369
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=37001443;//kernel.BodyActor:1443
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=37001477;//kernel.BodyActor:1477
      fps = wworld.fps;
      //$LASTPOS=37001501;//kernel.BodyActor:1501
      r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
      //$LASTPOS=37001582;//kernel.BodyActor:1582
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=37001618;//kernel.BodyActor:1618
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=37001650;//kernel.BodyActor:1650
      _this.body.SetUserData(_this);
      //$LASTPOS=37001678;//kernel.BodyActor:1678
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=37001710;//kernel.BodyActor:1710
      _this.rotation=r;
      //$LASTPOS=37001726;//kernel.BodyActor:1726
      _this.vrotation=vr;
    },
    fiber$onAppear :function _trc_BodyActor_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      
      //$LASTPOS=37000162;//kernel.BodyActor:162
      wworld = _this.getWorld();
      //$LASTPOS=37000189;//kernel.BodyActor:189
      _this.world=wworld.world;
      //$LASTPOS=37000213;//kernel.BodyActor:213
      _this.scale=wworld.scale;
      //$LASTPOS=37000237;//kernel.BodyActor:237
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37000280;//kernel.BodyActor:280
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=37000326;//kernel.BodyActor:326
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=37000366;//kernel.BodyActor:366
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=37000418;//kernel.BodyActor:418
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=37000464;//kernel.BodyActor:464
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=37000528;//kernel.BodyActor:528
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=37000595;//kernel.BodyActor:595
      fixDef = new b2FixtureDef;
      
      _thread.enter(function _trc_BodyActor_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000630;//kernel.BodyActor:630
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=1;return;
          case 1:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=37000671;//kernel.BodyActor:671
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=2;return;
          case 2:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=37000714;//kernel.BodyActor:714
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=3;return;
          case 3:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=37000768;//kernel.BodyActor:768
            bodyDef = new b2BodyDef;
            //$LASTPOS=37000801;//kernel.BodyActor:801
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=37000886;//kernel.BodyActor:886
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=37000921;//kernel.BodyActor:921
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=37000956;//kernel.BodyActor:956
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=37001004;//kernel.BodyActor:1004
            w = _this.width;h = _this.height;
            //$LASTPOS=37001030;//kernel.BodyActor:1030
            if (! w) {
              //$LASTPOS=37001048;//kernel.BodyActor:1048
              _this.detectShape();
              //$LASTPOS=37001071;//kernel.BodyActor:1071
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=37001100;//kernel.BodyActor:1100
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=37001140;//kernel.BodyActor:1140
            if (_this.shape=="box") {
              //$LASTPOS=37001168;//kernel.BodyActor:1168
              if (! h) {
                //$LASTPOS=37001176;//kernel.BodyActor:1176
                h=w;
              }
              //$LASTPOS=37001189;//kernel.BodyActor:1189
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=37001232;//kernel.BodyActor:1232
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=37001333;//kernel.BodyActor:1333
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=37001369;//kernel.BodyActor:1369
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=37001443;//kernel.BodyActor:1443
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=37001477;//kernel.BodyActor:1477
            fps = wworld.fps;
            //$LASTPOS=37001501;//kernel.BodyActor:1501
            r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
            //$LASTPOS=37001582;//kernel.BodyActor:1582
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=37001618;//kernel.BodyActor:1618
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=37001650;//kernel.BodyActor:1650
            _this.body.SetUserData(_this);
            //$LASTPOS=37001678;//kernel.BodyActor:1678
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=37001710;//kernel.BodyActor:1710
            _this.rotation=r;
            //$LASTPOS=37001726;//kernel.BodyActor:1726
            _this.vrotation=vr;
            _thread.exit(_this);return;
          }
        }
      });
    },
    allContactPoints :function _trc_BodyActor_allContactPoints(klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var m;
      var point;
      var w;
      var c;
      var a;
      var b;
      
      //$LASTPOS=37001773;//kernel.BodyActor:1773
      res = [];m;point;
      //$LASTPOS=37001797;//kernel.BodyActor:1797
      w = _this.getWorld();
      //$LASTPOS=37001819;//kernel.BodyActor:1819
      //$LASTPOS=37001824;//kernel.BodyActor:1824
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=37001880;//kernel.BodyActor:1880
          if (c.IsTouching()) {
            //$LASTPOS=37001911;//kernel.BodyActor:1911
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=37001982;//kernel.BodyActor:1982
            if (m.m_points[0]) {
              //$LASTPOS=37002019;//kernel.BodyActor:2019
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=37002092;//kernel.BodyActor:2092
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=37002263;//kernel.BodyActor:2263
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=37002363;//kernel.BodyActor:2363
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=37002388;//kernel.BodyActor:2388
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=37002447;//kernel.BodyActor:2447
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=37002506;//kernel.BodyActor:2506
            if (a===_this) {
              //$LASTPOS=37002538;//kernel.BodyActor:2538
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=37002607;//kernel.BodyActor:2607
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=37002698;//kernel.BodyActor:2698
              if (b===_this) {
                //$LASTPOS=37002730;//kernel.BodyActor:2730
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=37002799;//kernel.BodyActor:2799
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var m;
      var point;
      var w;
      var c;
      var a;
      var b;
      
      //$LASTPOS=37001773;//kernel.BodyActor:1773
      res = [];m;point;
      //$LASTPOS=37001797;//kernel.BodyActor:1797
      w = _this.getWorld();
      //$LASTPOS=37001819;//kernel.BodyActor:1819
      //$LASTPOS=37001824;//kernel.BodyActor:1824
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=37001880;//kernel.BodyActor:1880
          if (c.IsTouching()) {
            //$LASTPOS=37001911;//kernel.BodyActor:1911
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=37001982;//kernel.BodyActor:1982
            if (m.m_points[0]) {
              //$LASTPOS=37002019;//kernel.BodyActor:2019
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=37002092;//kernel.BodyActor:2092
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=37002263;//kernel.BodyActor:2263
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=37002363;//kernel.BodyActor:2363
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=37002388;//kernel.BodyActor:2388
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=37002447;//kernel.BodyActor:2447
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=37002506;//kernel.BodyActor:2506
            if (a===_this) {
              //$LASTPOS=37002538;//kernel.BodyActor:2538
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=37002607;//kernel.BodyActor:2607
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=37002698;//kernel.BodyActor:2698
              if (b===_this) {
                //$LASTPOS=37002730;//kernel.BodyActor:2730
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=37002799;//kernel.BodyActor:2799
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.allContactPoints(klass)[0];
    },
    fiber$contactPoint :function _trc_BodyActor_f_contactPoint(_thread,klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContactPoints(klass)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    allContact :function _trc_BodyActor_allContact(klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.allContacts(klass);
    },
    fiber$allContact :function _trc_BodyActor_f_allContact(_thread,klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContacts(klass);return;
      
      
      _thread.retVal=_this;return;
    },
    allContacts :function _trc_BodyActor_allContacts(klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var c;
      var a;
      var b;
      
      //$LASTPOS=37003061;//kernel.BodyActor:3061
      res = [];
      //$LASTPOS=37003077;//kernel.BodyActor:3077
      //$LASTPOS=37003082;//kernel.BodyActor:3082
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=37003138;//kernel.BodyActor:3138
          if (c.IsTouching()) {
            //$LASTPOS=37003172;//kernel.BodyActor:3172
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=37003231;//kernel.BodyActor:3231
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=37003290;//kernel.BodyActor:3290
            if (a===_this) {
              //$LASTPOS=37003322;//kernel.BodyActor:3322
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=37003391;//kernel.BodyActor:3391
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=37003441;//kernel.BodyActor:3441
              if (b===_this) {
                //$LASTPOS=37003473;//kernel.BodyActor:3473
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=37003542;//kernel.BodyActor:3542
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var c;
      var a;
      var b;
      
      //$LASTPOS=37003061;//kernel.BodyActor:3061
      res = [];
      //$LASTPOS=37003077;//kernel.BodyActor:3077
      //$LASTPOS=37003082;//kernel.BodyActor:3082
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=37003138;//kernel.BodyActor:3138
          if (c.IsTouching()) {
            //$LASTPOS=37003172;//kernel.BodyActor:3172
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=37003231;//kernel.BodyActor:3231
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=37003290;//kernel.BodyActor:3290
            if (a===_this) {
              //$LASTPOS=37003322;//kernel.BodyActor:3322
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=37003391;//kernel.BodyActor:3391
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=37003441;//kernel.BodyActor:3441
              if (b===_this) {
                //$LASTPOS=37003473;//kernel.BodyActor:3473
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=37003542;//kernel.BodyActor:3542
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=37003652;//kernel.BodyActor:3652
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37003695;//kernel.BodyActor:3695
      scale = _this.getWorld().scale;
      //$LASTPOS=37003727;//kernel.BodyActor:3727
      fps = 60;
      //$LASTPOS=37003743;//kernel.BodyActor:3743
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=37003652;//kernel.BodyActor:3652
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37003695;//kernel.BodyActor:3695
      scale = _this.getWorld().scale;
      //$LASTPOS=37003727;//kernel.BodyActor:3727
      fps = 60;
      //$LASTPOS=37003743;//kernel.BodyActor:3743
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=37003834;//kernel.BodyActor:3834
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37003877;//kernel.BodyActor:3877
      scale = _this.getWorld().scale;
      //$LASTPOS=37003909;//kernel.BodyActor:3909
      fps = 60;
      //$LASTPOS=37003925;//kernel.BodyActor:3925
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=37003834;//kernel.BodyActor:3834
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37003877;//kernel.BodyActor:3877
      scale = _this.getWorld().scale;
      //$LASTPOS=37003909;//kernel.BodyActor:3909
      fps = 60;
      //$LASTPOS=37003925;//kernel.BodyActor:3925
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37004008;//kernel.BodyActor:4008
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37004008;//kernel.BodyActor:4008
      _this.body.ApplyTorque(a);
      
      _thread.retVal=_this;return;
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=37004052;//kernel.BodyActor:4052
      pos = _this.body.GetPosition();
      //$LASTPOS=37004084;//kernel.BodyActor:4084
      pos.x+=dx/_this.scale;
      //$LASTPOS=37004105;//kernel.BodyActor:4105
      pos.y+=dy/_this.scale;
      //$LASTPOS=37004126;//kernel.BodyActor:4126
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      //$LASTPOS=37004052;//kernel.BodyActor:4052
      pos = _this.body.GetPosition();
      //$LASTPOS=37004084;//kernel.BodyActor:4084
      pos.x+=dx/_this.scale;
      //$LASTPOS=37004105;//kernel.BodyActor:4105
      pos.y+=dy/_this.scale;
      //$LASTPOS=37004126;//kernel.BodyActor:4126
      _this.body.SetPosition(pos);
      
      _thread.retVal=_this;return;
    },
    contactTo :function _trc_BodyActor_contactTo(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.allContact(t)[0];
    },
    fiber$contactTo :function _trc_BodyActor_f_contactTo(_thread,t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContact(t)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_BodyActor_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37004211;//kernel.BodyActor:4211
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=37004228;//kernel.BodyActor:4228
      _this.world.DestroyBody(_this.body);
    },
    addRevoluteJoint :function _trc_BodyActor_addRevoluteJoint(params) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      
      //$LASTPOS=37004316;//kernel.BodyActor:4316
      params=params||{};
      //$LASTPOS=37004339;//kernel.BodyActor:4339
      px = params.x||_this.x;
      //$LASTPOS=37004363;//kernel.BodyActor:4363
      py = params.y||_this.y;
      //$LASTPOS=37004387;//kernel.BodyActor:4387
      wworld = _this.getWorld();
      //$LASTPOS=37004428;//kernel.BodyActor:4428
      scale = wworld.scale;
      //$LASTPOS=37004456;//kernel.BodyActor:4456
      world = wworld.world;
      //$LASTPOS=37004484;//kernel.BodyActor:4484
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=37004530;//kernel.BodyActor:4530
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=37004570;//kernel.BodyActor:4570
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=37004624;//kernel.BodyActor:4624
      jd = new JDC;
      //$LASTPOS=37004644;//kernel.BodyActor:4644
      bodyDef = new b2BodyDef;
      //$LASTPOS=37004677;//kernel.BodyActor:4677
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=37004718;//kernel.BodyActor:4718
      bodyDef.position.x=px/scale;
      //$LASTPOS=37004754;//kernel.BodyActor:4754
      bodyDef.position.y=py/scale;
      //$LASTPOS=37004790;//kernel.BodyActor:4790
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=37004831;//kernel.BodyActor:4831
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37004874;//kernel.BodyActor:4874
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=37004936;//kernel.BodyActor:4936
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=37004989;//kernel.BodyActor:4989
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=37005036;//kernel.BodyActor:5036
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=37005083;//kernel.BodyActor:5083
        jd.enableLimit=true;
        
      }
      //$LASTPOS=37005116;//kernel.BodyActor:5116
      world.CreateJoint(jd);
    },
    fiber$addRevoluteJoint :function _trc_BodyActor_f_addRevoluteJoint(_thread,params) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      
      //$LASTPOS=37004316;//kernel.BodyActor:4316
      params=params||{};
      //$LASTPOS=37004339;//kernel.BodyActor:4339
      px = params.x||_this.x;
      //$LASTPOS=37004363;//kernel.BodyActor:4363
      py = params.y||_this.y;
      //$LASTPOS=37004387;//kernel.BodyActor:4387
      wworld = _this.getWorld();
      //$LASTPOS=37004428;//kernel.BodyActor:4428
      scale = wworld.scale;
      //$LASTPOS=37004456;//kernel.BodyActor:4456
      world = wworld.world;
      //$LASTPOS=37004484;//kernel.BodyActor:4484
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=37004530;//kernel.BodyActor:4530
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=37004570;//kernel.BodyActor:4570
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=37004624;//kernel.BodyActor:4624
      jd = new JDC;
      //$LASTPOS=37004644;//kernel.BodyActor:4644
      bodyDef = new b2BodyDef;
      //$LASTPOS=37004677;//kernel.BodyActor:4677
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=37004718;//kernel.BodyActor:4718
      bodyDef.position.x=px/scale;
      //$LASTPOS=37004754;//kernel.BodyActor:4754
      bodyDef.position.y=py/scale;
      //$LASTPOS=37004790;//kernel.BodyActor:4790
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=37004831;//kernel.BodyActor:4831
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=37004874;//kernel.BodyActor:4874
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=37004936;//kernel.BodyActor:4936
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=37004989;//kernel.BodyActor:4989
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=37005036;//kernel.BodyActor:5036
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=37005083;//kernel.BodyActor:5083
        jd.enableLimit=true;
        
      }
      //$LASTPOS=37005116;//kernel.BodyActor:5116
      world.CreateJoint(jd);
      
      _thread.retVal=_this;return;
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37005161;//kernel.BodyActor:5161
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37005261;//kernel.BodyActor:5261
      r=r||0;
      //$LASTPOS=37005273;//kernel.BodyActor:5273
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=37005326;//kernel.BodyActor:5326
      _this.body.SetAngle(_this.rad(r));
    },
    updatePos :function _trc_BodyActor_updatePos() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$updatePos :function _trc_BodyActor_f_updatePos(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__x :function _trc_BodyActor___getter__x() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=37005509;//kernel.BodyActor:5509
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=37005535;//kernel.BodyActor:5535
      pos = _this.body.GetPosition();
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=37005600;//kernel.BodyActor:5600
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=37005628;//kernel.BodyActor:5628
      v=v||0;
      //$LASTPOS=37005640;//kernel.BodyActor:5640
      pos = _this.body.GetPosition();
      //$LASTPOS=37005672;//kernel.BodyActor:5672
      pos.x=v/_this.scale;
      //$LASTPOS=37005691;//kernel.BodyActor:5691
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=37005725;//kernel.BodyActor:5725
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=37005751;//kernel.BodyActor:5751
      pos = _this.body.GetPosition();
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=37005816;//kernel.BodyActor:5816
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=37005844;//kernel.BodyActor:5844
      v=v||0;
      //$LASTPOS=37005856;//kernel.BodyActor:5856
      pos = _this.body.GetPosition();
      //$LASTPOS=37005888;//kernel.BodyActor:5888
      pos.y=v/_this.scale;
      //$LASTPOS=37005907;//kernel.BodyActor:5907
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var v;
      
      //$LASTPOS=37005943;//kernel.BodyActor:5943
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=37005970;//kernel.BodyActor:5970
      v = _this.body.GetLinearVelocity();
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ve;
      
      //$LASTPOS=37006053;//kernel.BodyActor:6053
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=37006082;//kernel.BodyActor:6082
      v=v||0;
      //$LASTPOS=37006094;//kernel.BodyActor:6094
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=37006131;//kernel.BodyActor:6131
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=37006164;//kernel.BodyActor:6164
      if (v) {
        //$LASTPOS=37006171;//kernel.BodyActor:6171
        _this.body.SetAwake(true);
      }
      //$LASTPOS=37006196;//kernel.BodyActor:6196
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var v;
      
      //$LASTPOS=37006237;//kernel.BodyActor:6237
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=37006264;//kernel.BodyActor:6264
      v = _this.body.GetLinearVelocity();
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ve;
      
      //$LASTPOS=37006347;//kernel.BodyActor:6347
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=37006376;//kernel.BodyActor:6376
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=37006413;//kernel.BodyActor:6413
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=37006446;//kernel.BodyActor:6446
      if (v) {
        //$LASTPOS=37006453;//kernel.BodyActor:6453
        _this.body.SetAwake(true);
      }
      //$LASTPOS=37006478;//kernel.BodyActor:6478
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37006525;//kernel.BodyActor:6525
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=37006627;//kernel.BodyActor:6627
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=37006656;//kernel.BodyActor:6656
      v=v||0;
      //$LASTPOS=37006668;//kernel.BodyActor:6668
      if (v) {
        //$LASTPOS=37006675;//kernel.BodyActor:6675
        _this.body.SetAwake(true);
      }
      //$LASTPOS=37006700;//kernel.BodyActor:6700
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T2Body_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=38000150;//kernel.T2World:150
      _this.loop();
    },
    fiber$main :function _trc_T2World_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=38000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=38000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=38000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=38000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      var d;
      
      //$LASTPOS=38001017;//kernel.T2World:1017
      //$LASTPOS=38001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=38001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=38001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=38001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
        b=b.GetNext();
      }
    },
    fiber$updatePos :function _trc_T2World_f_updatePos(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      var d;
      
      //$LASTPOS=38001017;//kernel.T2World:1017
      //$LASTPOS=38001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=38001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=38001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=38001114;//kernel.T2World:1114
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T2MediaPlayer_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_T2MediaPlayer_initialize() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=39000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=39000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39000367;//kernel.T2MediaPlayer:367
      _this.clearSEData();
    },
    fiber$clearBGMData :function _trc_T2MediaPlayer_f_clearBGMData(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return ! ! T2MediaLib.context;
    },
    loadFromProject :function _trc_T2MediaPlayer_loadFromProject(prj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var r;
      var s;
      var _it_1580;
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
      _it_1580=Tonyu.iterator(r.sounds,1);
      while(_it_1580.next()) {
        s=_it_1580[0];
        
        //$LASTPOS=39001010;//kernel.T2MediaPlayer:1010
        name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
        //$LASTPOS=39001084;//kernel.T2MediaPlayer:1084
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=39001142;//kernel.T2MediaPlayer:1142
          _this.print("Loading Sound2: "+name);
          //$LASTPOS=39001187;//kernel.T2MediaPlayer:1187
          _this.loadSE(name,url);
          
        } catch (e) {
          //$LASTPOS=39001242;//kernel.T2MediaPlayer:1242
          _this.print("Fail");
          //$LASTPOS=39001270;//kernel.T2MediaPlayer:1270
          Tonyu.setGlobal(name,"ERROR");
          
        }
        
      }
    },
    fiber$loadFromProject :function _trc_T2MediaPlayer_f_loadFromProject(_thread,prj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      var s;
      var _it_1580;
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
            _it_1580=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_1580.next())) { __pc=5; break; }
            s=_it_1580[0];
            
            //$LASTPOS=39001010;//kernel.T2MediaPlayer:1010
            name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
            //$LASTPOS=39001084;//kernel.T2MediaPlayer:1084
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3);
            //$LASTPOS=39001142;//kernel.T2MediaPlayer:1142
            _this.print("Loading Sound2: "+name);
            //$LASTPOS=39001187;//kernel.T2MediaPlayer:1187
            _this.fiber$loadSE(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4;break;
          case 3:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=39001242;//kernel.T2MediaPlayer:1242
              _this.print("Fail");
              //$LASTPOS=39001270;//kernel.T2MediaPlayer:1270
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39001408;//kernel.T2MediaPlayer:1408
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=39001467;//kernel.T2MediaPlayer:1467
      if (vol==null) {
        //$LASTPOS=39001484;//kernel.T2MediaPlayer:1484
        vol=128;
      }
      //$LASTPOS=39001573;//kernel.T2MediaPlayer:1573
      if (vol<0) {
        //$LASTPOS=39001593;//kernel.T2MediaPlayer:1593
        vol=0;
      } else {
        //$LASTPOS=39001614;//kernel.T2MediaPlayer:1614
        if (vol>128) {
          //$LASTPOS=39001629;//kernel.T2MediaPlayer:1629
          vol=128;
        }
      }
      return T2MediaLib.playSE(idx,vol/128,rate,offset,loop,loopStart,loopEnd);
    },
    stopSE :function _trc_T2MediaPlayer_stopSE(sourceObj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.stopSE(sourceObj);
    },
    fiber$stopSE :function _trc_T2MediaPlayer_f_stopSE(_thread,sourceObj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopSE(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEData :function _trc_T2MediaPlayer_getSEData(idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getSEData(idx);
    },
    fiber$getSEData :function _trc_T2MediaPlayer_f_getSEData(_thread,idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getSEData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    loadBGM :function _trc_T2MediaPlayer_loadBGM(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var data;
      
      //$LASTPOS=39001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=39001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      //$LASTPOS=39002024;//kernel.T2MediaPlayer:2024
      while (data==null) {
        //$LASTPOS=39002056;//kernel.T2MediaPlayer:2056
        _this.update();
        //$LASTPOS=39002075;//kernel.T2MediaPlayer:2075
        data=T2MediaLib.getBGMData(idx);
        
      }
      return data;
    },
    fiber$loadBGM :function _trc_T2MediaPlayer_f_loadBGM(_thread,idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var data;
      
      //$LASTPOS=39001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=39001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002024;//kernel.T2MediaPlayer:2024
          case 1:
            if (!(data==null)) { __pc=3; break; }
            //$LASTPOS=39002056;//kernel.T2MediaPlayer:2056
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=39002075;//kernel.T2MediaPlayer:2075
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=39002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=39002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=39002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=39002278;//kernel.T2MediaPlayer:2278
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=39002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=39002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=39002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=39002278;//kernel.T2MediaPlayer:2278
        offset=0;
      }
      _thread.retVal=T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGM :function _trc_T2MediaPlayer_stopBGM() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.stopBGM(0);
    },
    fiber$stopBGM :function _trc_T2MediaPlayer_f_stopBGM(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGM :function _trc_T2MediaPlayer_pauseBGM() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.pauseBGM(0);
    },
    fiber$pauseBGM :function _trc_T2MediaPlayer_f_pauseBGM(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.pauseBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGM :function _trc_T2MediaPlayer_resumeBGM() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.resumeBGM(0);
    },
    fiber$resumeBGM :function _trc_T2MediaPlayer_f_resumeBGM(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.resumeBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolume :function _trc_T2MediaPlayer_setBGMVolume(vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=39002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=39002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=39002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=39002715;//kernel.T2MediaPlayer:2715
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=39002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=39002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=39002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=39002715;//kernel.T2MediaPlayer:2715
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempo :function _trc_T2MediaPlayer_setBGMTempo(tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.setBGMTempo(0,tempo);
    },
    fiber$setBGMTempo :function _trc_T2MediaPlayer_f_setBGMTempo(_thread,tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMTempo(0,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTime :function _trc_T2MediaPlayer_getBGMCurrentTime() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getBGMCurrentTime(0);
    },
    fiber$getBGMCurrentTime :function _trc_T2MediaPlayer_f_getBGMCurrentTime(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMCurrentTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLength :function _trc_T2MediaPlayer_getBGMLength() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getBGMLength(0);
    },
    fiber$getBGMLength :function _trc_T2MediaPlayer_f_getBGMLength(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLength(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMData :function _trc_T2MediaPlayer_getBGMData(idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getBGMData(idx);
    },
    fiber$getBGMData :function _trc_T2MediaPlayer_f_getBGMData(_thread,idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    playBGMID :function _trc_T2MediaPlayer_playBGMID(id,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=39003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=39003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=39003278;//kernel.T2MediaPlayer:3278
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=39003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=39003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=39003278;//kernel.T2MediaPlayer:3278
        offset=0;
      }
      _thread.retVal=T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGMID :function _trc_T2MediaPlayer_stopBGMID(id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.stopBGM(id);
    },
    fiber$stopBGMID :function _trc_T2MediaPlayer_f_stopBGMID(_thread,id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGMID :function _trc_T2MediaPlayer_pauseBGMID(id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.pauseBGM(id);
    },
    fiber$pauseBGMID :function _trc_T2MediaPlayer_f_pauseBGMID(_thread,id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.pauseBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGMID :function _trc_T2MediaPlayer_resumeBGMID(id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.resumeBGM(id);
    },
    fiber$resumeBGMID :function _trc_T2MediaPlayer_f_resumeBGMID(_thread,id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.resumeBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolumeID :function _trc_T2MediaPlayer_setBGMVolumeID(id,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=39003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=39003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=39003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=39003737;//kernel.T2MediaPlayer:3737
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=39003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=39003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=39003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=39003737;//kernel.T2MediaPlayer:3737
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempoID :function _trc_T2MediaPlayer_setBGMTempoID(id,tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.setBGMTempo(id,tempo);
    },
    fiber$setBGMTempoID :function _trc_T2MediaPlayer_f_setBGMTempoID(_thread,id,tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setBGMTempo(id,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTimeID :function _trc_T2MediaPlayer_getBGMCurrentTimeID(id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getBGMCurrentTime(id);
    },
    fiber$getBGMCurrentTimeID :function _trc_T2MediaPlayer_f_getBGMCurrentTimeID(_thread,id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMCurrentTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLengthID :function _trc_T2MediaPlayer_getBGMLengthID(id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getBGMLength(id);
    },
    fiber$getBGMLengthID :function _trc_T2MediaPlayer_f_getBGMLengthID(_thread,id) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMLength(id);return;
      
      
      _thread.retVal=_this;return;
    },
    sizeBGMID :function _trc_T2MediaPlayer_sizeBGMID() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getBGMPlayerMax();
    },
    fiber$sizeBGMID :function _trc_T2MediaPlayer_f_sizeBGMID(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getBGMPlayerMax();return;
      
      
      _thread.retVal=_this;return;
    },
    allStopBGM :function _trc_T2MediaPlayer_allStopBGM() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=39004338;//kernel.T2MediaPlayer:4338
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=39004383;//kernel.T2MediaPlayer:4383
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39004338;//kernel.T2MediaPlayer:4338
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
            //$LASTPOS=39004383;//kernel.T2MediaPlayer:4383
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=39004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=39004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=39004501;//kernel.T2MediaPlayer:4501
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=39004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=39004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=39004501;//kernel.T2MediaPlayer:4501
        startTime=0;
      }
      _thread.retVal=T2MediaLib.playAudio(idx,loop,startTime);return;
      
      
      _thread.retVal=_this;return;
    },
    stopAudio :function _trc_T2MediaPlayer_stopAudio() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.stopAudio();
    },
    fiber$stopAudio :function _trc_T2MediaPlayer_f_stopAudio(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.stopAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    pauseAudio :function _trc_T2MediaPlayer_pauseAudio() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.pauseAudio();
    },
    fiber$pauseAudio :function _trc_T2MediaPlayer_f_pauseAudio(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.pauseAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    resumeAudio :function _trc_T2MediaPlayer_resumeAudio() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.resumeAudio();
    },
    fiber$resumeAudio :function _trc_T2MediaPlayer_f_resumeAudio(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.resumeAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioVolume :function _trc_T2MediaPlayer_setAudioVolume(vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=39004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=39004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=39004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=39004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      return T2MediaLib.setAudioVolume(vol);
    },
    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=39004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=39004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=39004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=39004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=39004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=39004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=39005013;//kernel.T2MediaPlayer:5013
          tempo=0.5;
        }
      }
      return T2MediaLib.setAudioTempo(tempo);
    },
    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=39004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=39004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=39005013;//kernel.T2MediaPlayer:5013
          tempo=0.5;
        }
      }
      _thread.retVal=T2MediaLib.setAudioTempo(tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioPosition :function _trc_T2MediaPlayer_setAudioPosition(time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.setAudioPosition(time);
    },
    fiber$setAudioPosition :function _trc_T2MediaPlayer_f_setAudioPosition(_thread,time) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.setAudioPosition(time);return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioCurrentTime :function _trc_T2MediaPlayer_getAudioCurrentTime() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getAudioCurrentTime();
    },
    fiber$getAudioCurrentTime :function _trc_T2MediaPlayer_f_getAudioCurrentTime(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getAudioCurrentTime();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioLength :function _trc_T2MediaPlayer_getAudioLength() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getAudioLength();
    },
    fiber$getAudioLength :function _trc_T2MediaPlayer_f_getAudioLength(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=T2MediaLib.getAudioLength();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioData :function _trc_T2MediaPlayer_getAudioData(idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return T2MediaLib.getAudioData(idx);
    },
    fiber$getAudioData :function _trc_T2MediaPlayer_f_getAudioData(_thread,idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_PlainChar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_PlainChar_initialize(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=40000309;//kernel.PlainChar:309
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=40000355;//kernel.PlainChar:355
        _this.initSprite();
        
      }
      //$LASTPOS=40000381;//kernel.PlainChar:381
      if (typeof  x=="object") {
        //$LASTPOS=40000405;//kernel.PlainChar:405
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=40000437;//kernel.PlainChar:437
        if (typeof  x=="number") {
          //$LASTPOS=40000472;//kernel.PlainChar:472
          _this.x=x;
          //$LASTPOS=40000491;//kernel.PlainChar:491
          _this.y=y;
          //$LASTPOS=40000510;//kernel.PlainChar:510
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000547;//kernel.PlainChar:547
      _this.onDraw();
      //$LASTPOS=40000562;//kernel.PlainChar:562
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=40000593;//kernel.PlainChar:593
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000634;//kernel.PlainChar:634
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000634;//kernel.PlainChar:634
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    onDraw :function _trc_PlainChar_onDraw() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$onDraw :function _trc_PlainChar_f_onDraw(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_PlainChar_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000690;//kernel.PlainChar:690
      _this.onUpdate();
      //$LASTPOS=40000707;//kernel.PlainChar:707
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000690;//kernel.PlainChar:690
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000707;//kernel.PlainChar:707
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_PlainChar_onUpdate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    initSprite :function _trc_PlainChar_initSprite() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=40000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=40000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=40000890;//kernel.PlainChar:890
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=40000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=40000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000890;//kernel.PlainChar:890
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    tMain :function _trc_PlainChar_tMain() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000922;//kernel.PlainChar:922
      _this.main();
      //$LASTPOS=40000935;//kernel.PlainChar:935
      _this.die();
    },
    fiber$tMain :function _trc_PlainChar_f_tMain(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_PlainChar_ent_tMain(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000922;//kernel.PlainChar:922
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40000935;//kernel.PlainChar:935
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    appear :function _trc_PlainChar_appear(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return t;
    },
    fiber$appear :function _trc_PlainChar_f_appear(_thread,t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=t;return;
      
      
      _thread.retVal=_this;return;
    },
    trunc :function _trc_PlainChar_trunc(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Math.trunc(f);
    },
    loadPage :function _trc_PlainChar_loadPage(page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40001673;//kernel.PlainChar:1673
      _this.all().die();
      //$LASTPOS=40001691;//kernel.PlainChar:1691
      new page(arg);
      //$LASTPOS=40001711;//kernel.PlainChar:1711
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001673;//kernel.PlainChar:1673
      _this.all().die();
      //$LASTPOS=40001691;//kernel.PlainChar:1691
      new page(arg);
      //$LASTPOS=40001711;//kernel.PlainChar:1711
      _this.die();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.SecretChar',
  shortName: 'SecretChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SecretChar_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_SecretChar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_SecretChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_SpriteChar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_SpriteChar_initialize(x,y,p,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=41000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=41000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=41000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=41000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=41000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=41000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=41000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=41000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=41000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000220;//kernel.SpriteChar:220
      if (_this.f) {
        //$LASTPOS=41000238;//kernel.SpriteChar:238
        if (! _this.scaleY) {
          //$LASTPOS=41000251;//kernel.SpriteChar:251
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=41000275;//kernel.SpriteChar:275
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=41000299;//kernel.SpriteChar:299
      Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=41000319;//kernel.SpriteChar:319
      if (_this.f) {
        //$LASTPOS=41000326;//kernel.SpriteChar:326
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T1Line_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Line_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000034;//kernel.T1Line:34
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=42000065;//kernel.T1Line:65
      ctx.strokeStyle=_this.col;
      //$LASTPOS=42000091;//kernel.T1Line:91
      ctx.beginPath();
      //$LASTPOS=42000113;//kernel.T1Line:113
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=42000135;//kernel.T1Line:135
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=42000159;//kernel.T1Line:159
      ctx.stroke();
      //$LASTPOS=42000178;//kernel.T1Line:178
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T1Map_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_T1Map_setBGColor(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=43000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T1Page_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initGlobals :function _trc_T1Page_initGlobals() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=44000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000103;//kernel.T1Page:103
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=44000131;//kernel.T1Page:131
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=44000159;//kernel.T1Page:159
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=44000189;//kernel.T1Page:189
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=44000222;//kernel.T1Page:222
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=44000251;//kernel.T1Page:251
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=44000282;//kernel.T1Page:282
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=44000313;//kernel.T1Page:313
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=44000347;//kernel.T1Page:347
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_T1Text_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Text_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000032;//kernel.T1Text:32
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=45000057;//kernel.T1Text:57
      c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=45000097;//kernel.T1Text:97
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=45000117;//kernel.T1Text:117
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_TextChar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TextChar_initialize(xx,yy,t,c,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000070;//kernel.TextChar:70
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=46000089;//kernel.TextChar:89
      _this.text="";
      //$LASTPOS=46000103;//kernel.TextChar:103
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=46000122;//kernel.TextChar:122
      _this.size=20;
      //$LASTPOS=46000136;//kernel.TextChar:136
      if (! _this.x) {
        //$LASTPOS=46000149;//kernel.TextChar:149
        _this.x=0;
      }
      //$LASTPOS=46000164;//kernel.TextChar:164
      if (! _this.y) {
        //$LASTPOS=46000177;//kernel.TextChar:177
        _this.y=0;
      }
      //$LASTPOS=46000192;//kernel.TextChar:192
      if (t) {
        //$LASTPOS=46000199;//kernel.TextChar:199
        _this.text=t;
      }
      //$LASTPOS=46000212;//kernel.TextChar:212
      if (c) {
        //$LASTPOS=46000219;//kernel.TextChar:219
        _this.fillStyle=c;
      }
      //$LASTPOS=46000237;//kernel.TextChar:237
      if (s) {
        //$LASTPOS=46000244;//kernel.TextChar:244
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var rect;
      
      //$LASTPOS=46000274;//kernel.TextChar:274
      if (! _this.size) {
        //$LASTPOS=46000285;//kernel.TextChar:285
        _this.size=15;
      }
      //$LASTPOS=46000299;//kernel.TextChar:299
      if (! _this.align) {
        //$LASTPOS=46000311;//kernel.TextChar:311
        _this.align="left";
      }
      //$LASTPOS=46000330;//kernel.TextChar:330
      if (! _this.fillStyle) {
        //$LASTPOS=46000346;//kernel.TextChar:346
        _this.fillStyle="white";
      }
      //$LASTPOS=46000370;//kernel.TextChar:370
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=46000400;//kernel.TextChar:400
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=46000437;//kernel.TextChar:437
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=46000473;//kernel.TextChar:473
      rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
      //$LASTPOS=46000540;//kernel.TextChar:540
      _this.width=rect.w;
      //$LASTPOS=46000559;//kernel.TextChar:559
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_GameConsole_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_GameConsole_initialize(opt) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=47000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=47000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=47000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=47000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=47000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=47000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=47000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var larger;
      var smaller;
      
      //$LASTPOS=47000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=47000469;//kernel.GameConsole:469
      smaller = 5;
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_GameConsole_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=47000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=47000469;//kernel.GameConsole:469
      smaller = 5;
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    layout :function _trc_GameConsole_layout() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var width;
      var height;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=47000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=47000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=47000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=47000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=47000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=47000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=47000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=47000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=47000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=47000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=47000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=47000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=47000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=47000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=47001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=47001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
    },
    fiber$layout :function _trc_GameConsole_f_layout(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var width;
      var height;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=47000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=47000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=47000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=47000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=47000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=47000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=47000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=47000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=47000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=47000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=47000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=47000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=47000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=47000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=47001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=47001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=47001159;//kernel.GameConsole:1159
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=48000030;//kernel.MapEditor:30
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=48000055;//kernel.MapEditor:55
      _this.loadMode=false;
      //$LASTPOS=48000071;//kernel.MapEditor:71
      _this.fileExist=false;
      //$LASTPOS=48000088;//kernel.MapEditor:88
      _this.print("map file(s)");
      //$LASTPOS=48000110;//kernel.MapEditor:110
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=48000137;//kernel.MapEditor:137
      _this.fileList.recursive((function a(f) {
        
        //$LASTPOS=48000175;//kernel.MapEditor:175
        f=f+"";
        //$LASTPOS=48000187;//kernel.MapEditor:187
        _this.fNames=f.split("/");
        //$LASTPOS=48000212;//kernel.MapEditor:212
        _this.print(_this.fNames[_this.fNames.length-1]);
        //$LASTPOS=48000248;//kernel.MapEditor:248
        _this.fileExist=true;
      }));
      //$LASTPOS=48000268;//kernel.MapEditor:268
      if (_this.fileExist) {
        //$LASTPOS=48000287;//kernel.MapEditor:287
        _this.print("Load Data?: Y or N");
        //$LASTPOS=48000320;//kernel.MapEditor:320
        while (true) {
          //$LASTPOS=48000341;//kernel.MapEditor:341
          if (_this.getkey("y")>0) {
            //$LASTPOS=48000372;//kernel.MapEditor:372
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=48000424;//kernel.MapEditor:424
          if (_this.getkey("n")>0) {
            //$LASTPOS=48000455;//kernel.MapEditor:455
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=48000508;//kernel.MapEditor:508
          _this.update();
          
        }
        //$LASTPOS=48000528;//kernel.MapEditor:528
        if (_this.loadMode) {
          //$LASTPOS=48000550;//kernel.MapEditor:550
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=48000614;//kernel.MapEditor:614
          if (_this.fileName) {
            //$LASTPOS=48000640;//kernel.MapEditor:640
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=48000702;//kernel.MapEditor:702
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=48000737;//kernel.MapEditor:737
            _this.baseData=_this.mapDataFile.obj();
            
          } else {
            //$LASTPOS=48000792;//kernel.MapEditor:792
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=48000832;//kernel.MapEditor:832
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=48000871;//kernel.MapEditor:871
              _this.baseData=_this.mapDataFile.obj();
              
            }
            
          }
          //$LASTPOS=48000931;//kernel.MapEditor:931
          if (_this.baseData==undefined) {
            //$LASTPOS=48000968;//kernel.MapEditor:968
            _this.print("Load failed");
            //$LASTPOS=48001002;//kernel.MapEditor:1002
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=48001032;//kernel.MapEditor:1032
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=48001076;//kernel.MapEditor:1076
              _this.mapData=_this.baseData[0];
              //$LASTPOS=48001109;//kernel.MapEditor:1109
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=48001144;//kernel.MapEditor:1144
              if (_this.baseData.length>2) {
                //$LASTPOS=48001183;//kernel.MapEditor:1183
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=48001238;//kernel.MapEditor:1238
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=48001310;//kernel.MapEditor:1310
      _this.update();
      //$LASTPOS=48001573;//kernel.MapEditor:1573
      if (! _this.loadMode) {
        //$LASTPOS=48001592;//kernel.MapEditor:1592
        _this.row=prompt("input row");
        //$LASTPOS=48001621;//kernel.MapEditor:1621
        _this.col=prompt("input col");
        //$LASTPOS=48001650;//kernel.MapEditor:1650
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=48001691;//kernel.MapEditor:1691
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=48001734;//kernel.MapEditor:1734
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=48001798;//kernel.MapEditor:1798
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=48001828;//kernel.MapEditor:1828
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=48001859;//kernel.MapEditor:1859
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=48001891;//kernel.MapEditor:1891
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=48001941;//kernel.MapEditor:1941
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=48002245;//kernel.MapEditor:2245
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=48002291;//kernel.MapEditor:2291
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=48002316;//kernel.MapEditor:2316
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=48002411;//kernel.MapEditor:2411
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=48002441;//kernel.MapEditor:2441
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=48002472;//kernel.MapEditor:2472
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=48002504;//kernel.MapEditor:2504
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=48002552;//kernel.MapEditor:2552
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=48002606;//kernel.MapEditor:2606
      _this.counter=0;
      //$LASTPOS=48002617;//kernel.MapEditor:2617
      //$LASTPOS=48002621;//kernel.MapEditor:2621
      i = 0;
      while(i<16) {
        {
          //$LASTPOS=48002644;//kernel.MapEditor:2644
          //$LASTPOS=48002648;//kernel.MapEditor:2648
          j = 0;
          while(j<8) {
            {
              //$LASTPOS=48002674;//kernel.MapEditor:2674
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=48002717;//kernel.MapEditor:2717
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=48002736;//kernel.MapEditor:2736
      _this.drawPanel();
      //$LASTPOS=48002749;//kernel.MapEditor:2749
      _this.mode="get";
      //$LASTPOS=48002761;//kernel.MapEditor:2761
      _this.prevMode="set";
      //$LASTPOS=48002777;//kernel.MapEditor:2777
      _this.mapp=0;
      //$LASTPOS=48002785;//kernel.MapEditor:2785
      _this.mx=- 40;
      //$LASTPOS=48002793;//kernel.MapEditor:2793
      _this.my=- 40;
      //$LASTPOS=48002801;//kernel.MapEditor:2801
      _this.chipX=- 40;
      //$LASTPOS=48002812;//kernel.MapEditor:2812
      _this.chipY=- 40;
      //$LASTPOS=48002823;//kernel.MapEditor:2823
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=48002851;//kernel.MapEditor:2851
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=48002881;//kernel.MapEditor:2881
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=48002903;//kernel.MapEditor:2903
      while (true) {
        //$LASTPOS=48002920;//kernel.MapEditor:2920
        _this.p=_this.mapp;
        //$LASTPOS=48002932;//kernel.MapEditor:2932
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=48003070;//kernel.MapEditor:3070
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48003103;//kernel.MapEditor:3103
          _this.mode="erase";
          //$LASTPOS=48003125;//kernel.MapEditor:3125
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48003156;//kernel.MapEditor:3156
        if (_this.getkey("s")==1) {
          //$LASTPOS=48003184;//kernel.MapEditor:3184
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48003217;//kernel.MapEditor:3217
          if (_this.mode=="set") {
            //$LASTPOS=48003246;//kernel.MapEditor:3246
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=48003287;//kernel.MapEditor:3287
            _this.mode="set";
            
          }
          //$LASTPOS=48003317;//kernel.MapEditor:3317
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48003348;//kernel.MapEditor:3348
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=48003466;//kernel.MapEditor:3466
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48003499;//kernel.MapEditor:3499
          _this.mode="set";
          //$LASTPOS=48003519;//kernel.MapEditor:3519
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48003550;//kernel.MapEditor:3550
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=48003670;//kernel.MapEditor:3670
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48003703;//kernel.MapEditor:3703
          _this.mode="setOn";
          //$LASTPOS=48003725;//kernel.MapEditor:3725
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48003756;//kernel.MapEditor:3756
        if (_this.getkey("o")==1) {
          //$LASTPOS=48003784;//kernel.MapEditor:3784
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48003817;//kernel.MapEditor:3817
          _this.mode="setOn";
          
        }
        //$LASTPOS=48003841;//kernel.MapEditor:3841
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=48003981;//kernel.MapEditor:3981
          if (_this.mode!="get") {
            //$LASTPOS=48004010;//kernel.MapEditor:4010
            _this.prevMode=_this.mode;
            //$LASTPOS=48004037;//kernel.MapEditor:4037
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=48004072;//kernel.MapEditor:4072
            _this.mode="get";
            //$LASTPOS=48004096;//kernel.MapEditor:4096
            _this.chipX=- 40;
            //$LASTPOS=48004119;//kernel.MapEditor:4119
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=48004157;//kernel.MapEditor:4157
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=48004194;//kernel.MapEditor:4194
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=48004227;//kernel.MapEditor:4227
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48004258;//kernel.MapEditor:4258
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=48004412;//kernel.MapEditor:4412
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=48004885;//kernel.MapEditor:4885
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=48004942;//kernel.MapEditor:4942
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
          //$LASTPOS=48005084;//kernel.MapEditor:5084
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=48005116;//kernel.MapEditor:5116
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=48005205;//kernel.MapEditor:5205
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=48005345;//kernel.MapEditor:5345
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=48005378;//kernel.MapEditor:5378
          _this.mode="copy";
          //$LASTPOS=48005399;//kernel.MapEditor:5399
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=48005430;//kernel.MapEditor:5430
        if (_this.mode!="get") {
          //$LASTPOS=48005455;//kernel.MapEditor:5455
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=48005561;//kernel.MapEditor:5561
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=48005578;//kernel.MapEditor:5578
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=48005709;//kernel.MapEditor:5709
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=48005726;//kernel.MapEditor:5726
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=48005839;//kernel.MapEditor:5839
            _this.my=_this.my+8;
          }
          //$LASTPOS=48005856;//kernel.MapEditor:5856
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=48005991;//kernel.MapEditor:5991
            _this.my=_this.my-8;
          }
          //$LASTPOS=48006008;//kernel.MapEditor:6008
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=48006049;//kernel.MapEditor:6049
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=48006155;//kernel.MapEditor:6155
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=48006178;//kernel.MapEditor:6178
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=48006309;//kernel.MapEditor:6309
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=48006332;//kernel.MapEditor:6332
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=48006445;//kernel.MapEditor:6445
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=48006468;//kernel.MapEditor:6468
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=48006603;//kernel.MapEditor:6603
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=48006626;//kernel.MapEditor:6626
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=48006663;//kernel.MapEditor:6663
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=48006693;//kernel.MapEditor:6693
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=48006724;//kernel.MapEditor:6724
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=48006776;//kernel.MapEditor:6776
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=48006824;//kernel.MapEditor:6824
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=48006874;//kernel.MapEditor:6874
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=48006928;//kernel.MapEditor:6928
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=48006976;//kernel.MapEditor:6976
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=48007028;//kernel.MapEditor:7028
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=48007081;//kernel.MapEditor:7081
              _this.mode=_this.prevMode;
              //$LASTPOS=48007104;//kernel.MapEditor:7104
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48007137;//kernel.MapEditor:7137
              _this.print(_this.mode+" mode");
              //$LASTPOS=48007166;//kernel.MapEditor:7166
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=48007190;//kernel.MapEditor:7190
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=48007244;//kernel.MapEditor:7244
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=48007296;//kernel.MapEditor:7296
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=48007349;//kernel.MapEditor:7349
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=48007397;//kernel.MapEditor:7397
                  _this.mode="set";
                  //$LASTPOS=48007417;//kernel.MapEditor:7417
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=48007446;//kernel.MapEditor:7446
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=48007470;//kernel.MapEditor:7470
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=48000030;//kernel.MapEditor:30
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=48000055;//kernel.MapEditor:55
      _this.loadMode=false;
      //$LASTPOS=48000071;//kernel.MapEditor:71
      _this.fileExist=false;
      //$LASTPOS=48000088;//kernel.MapEditor:88
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=48000110;//kernel.MapEditor:110
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=48000137;//kernel.MapEditor:137
            _this.fileList.recursive((function a(f) {
              
              //$LASTPOS=48000175;//kernel.MapEditor:175
              f=f+"";
              //$LASTPOS=48000187;//kernel.MapEditor:187
              _this.fNames=f.split("/");
              //$LASTPOS=48000212;//kernel.MapEditor:212
              _this.print(_this.fNames[_this.fNames.length-1]);
              //$LASTPOS=48000248;//kernel.MapEditor:248
              _this.fileExist=true;
            }));
            //$LASTPOS=48000268;//kernel.MapEditor:268
            if (!(_this.fileExist)) { __pc=11; break; }
            //$LASTPOS=48000287;//kernel.MapEditor:287
            _this.print("Load Data?: Y or N");
            //$LASTPOS=48000320;//kernel.MapEditor:320
          case 2:
            //$LASTPOS=48000341;//kernel.MapEditor:341
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=48000372;//kernel.MapEditor:372
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=48000424;//kernel.MapEditor:424
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=48000455;//kernel.MapEditor:455
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=48000508;//kernel.MapEditor:508
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=48000528;//kernel.MapEditor:528
            if (!(_this.loadMode)) { __pc=10; break; }
            //$LASTPOS=48000550;//kernel.MapEditor:550
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=48000614;//kernel.MapEditor:614
            if (_this.fileName) {
              //$LASTPOS=48000640;//kernel.MapEditor:640
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=48000702;//kernel.MapEditor:702
            if (!(_this.mapDataFile.obj())) { __pc=7; break; }
            {
              //$LASTPOS=48000737;//kernel.MapEditor:737
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=9;break;
          case 7:
            //$LASTPOS=48000792;//kernel.MapEditor:792
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=48000832;//kernel.MapEditor:832
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=48000871;//kernel.MapEditor:871
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 9:
            
            //$LASTPOS=48000931;//kernel.MapEditor:931
            if (_this.baseData==undefined) {
              //$LASTPOS=48000968;//kernel.MapEditor:968
              _this.print("Load failed");
              //$LASTPOS=48001002;//kernel.MapEditor:1002
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=48001032;//kernel.MapEditor:1032
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=48001076;//kernel.MapEditor:1076
                _this.mapData=_this.baseData[0];
                //$LASTPOS=48001109;//kernel.MapEditor:1109
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=48001144;//kernel.MapEditor:1144
                if (_this.baseData.length>2) {
                  //$LASTPOS=48001183;//kernel.MapEditor:1183
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=48001238;//kernel.MapEditor:1238
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10:
            
          case 11:
            
            //$LASTPOS=48001310;//kernel.MapEditor:1310
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=48001573;//kernel.MapEditor:1573
            if (! _this.loadMode) {
              //$LASTPOS=48001592;//kernel.MapEditor:1592
              _this.row=prompt("input row");
              //$LASTPOS=48001621;//kernel.MapEditor:1621
              _this.col=prompt("input col");
              //$LASTPOS=48001650;//kernel.MapEditor:1650
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=48001691;//kernel.MapEditor:1691
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=48001734;//kernel.MapEditor:1734
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=48001798;//kernel.MapEditor:1798
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=48001828;//kernel.MapEditor:1828
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=48001859;//kernel.MapEditor:1859
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=48001891;//kernel.MapEditor:1891
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=48001941;//kernel.MapEditor:1941
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=48002245;//kernel.MapEditor:2245
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=48002291;//kernel.MapEditor:2291
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=48002316;//kernel.MapEditor:2316
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=48002411;//kernel.MapEditor:2411
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=48002441;//kernel.MapEditor:2441
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=48002472;//kernel.MapEditor:2472
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=48002504;//kernel.MapEditor:2504
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=48002552;//kernel.MapEditor:2552
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=48002606;//kernel.MapEditor:2606
            _this.counter=0;
            //$LASTPOS=48002617;//kernel.MapEditor:2617
            //$LASTPOS=48002621;//kernel.MapEditor:2621
            i = 0;
            while(i<16) {
              {
                //$LASTPOS=48002644;//kernel.MapEditor:2644
                //$LASTPOS=48002648;//kernel.MapEditor:2648
                j = 0;
                while(j<8) {
                  {
                    //$LASTPOS=48002674;//kernel.MapEditor:2674
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=48002717;//kernel.MapEditor:2717
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=48002736;//kernel.MapEditor:2736
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=48002749;//kernel.MapEditor:2749
            _this.mode="get";
            //$LASTPOS=48002761;//kernel.MapEditor:2761
            _this.prevMode="set";
            //$LASTPOS=48002777;//kernel.MapEditor:2777
            _this.mapp=0;
            //$LASTPOS=48002785;//kernel.MapEditor:2785
            _this.mx=- 40;
            //$LASTPOS=48002793;//kernel.MapEditor:2793
            _this.my=- 40;
            //$LASTPOS=48002801;//kernel.MapEditor:2801
            _this.chipX=- 40;
            //$LASTPOS=48002812;//kernel.MapEditor:2812
            _this.chipY=- 40;
            //$LASTPOS=48002823;//kernel.MapEditor:2823
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=48002851;//kernel.MapEditor:2851
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=48002881;//kernel.MapEditor:2881
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=48002903;//kernel.MapEditor:2903
          case 14:
            //$LASTPOS=48002920;//kernel.MapEditor:2920
            _this.p=_this.mapp;
            //$LASTPOS=48002932;//kernel.MapEditor:2932
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=48003070;//kernel.MapEditor:3070
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48003103;//kernel.MapEditor:3103
              _this.mode="erase";
              //$LASTPOS=48003125;//kernel.MapEditor:3125
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48003156;//kernel.MapEditor:3156
            if (_this.getkey("s")==1) {
              //$LASTPOS=48003184;//kernel.MapEditor:3184
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48003217;//kernel.MapEditor:3217
              if (_this.mode=="set") {
                //$LASTPOS=48003246;//kernel.MapEditor:3246
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=48003287;//kernel.MapEditor:3287
                _this.mode="set";
                
              }
              //$LASTPOS=48003317;//kernel.MapEditor:3317
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48003348;//kernel.MapEditor:3348
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=48003466;//kernel.MapEditor:3466
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48003499;//kernel.MapEditor:3499
              _this.mode="set";
              //$LASTPOS=48003519;//kernel.MapEditor:3519
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48003550;//kernel.MapEditor:3550
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=48003670;//kernel.MapEditor:3670
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48003703;//kernel.MapEditor:3703
              _this.mode="setOn";
              //$LASTPOS=48003725;//kernel.MapEditor:3725
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48003756;//kernel.MapEditor:3756
            if (_this.getkey("o")==1) {
              //$LASTPOS=48003784;//kernel.MapEditor:3784
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48003817;//kernel.MapEditor:3817
              _this.mode="setOn";
              
            }
            //$LASTPOS=48003841;//kernel.MapEditor:3841
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=48003981;//kernel.MapEditor:3981
              if (_this.mode!="get") {
                //$LASTPOS=48004010;//kernel.MapEditor:4010
                _this.prevMode=_this.mode;
                //$LASTPOS=48004037;//kernel.MapEditor:4037
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=48004072;//kernel.MapEditor:4072
                _this.mode="get";
                //$LASTPOS=48004096;//kernel.MapEditor:4096
                _this.chipX=- 40;
                //$LASTPOS=48004119;//kernel.MapEditor:4119
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=48004157;//kernel.MapEditor:4157
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=48004194;//kernel.MapEditor:4194
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=48004227;//kernel.MapEditor:4227
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48004258;//kernel.MapEditor:4258
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=48004412;//kernel.MapEditor:4412
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=48004885;//kernel.MapEditor:4885
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=48004942;//kernel.MapEditor:4942
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
              //$LASTPOS=48005084;//kernel.MapEditor:5084
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=48005116;//kernel.MapEditor:5116
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=48005205;//kernel.MapEditor:5205
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=48005345;//kernel.MapEditor:5345
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=48005378;//kernel.MapEditor:5378
              _this.mode="copy";
              //$LASTPOS=48005399;//kernel.MapEditor:5399
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=48005430;//kernel.MapEditor:5430
            if (_this.mode!="get") {
              //$LASTPOS=48005455;//kernel.MapEditor:5455
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=48005561;//kernel.MapEditor:5561
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=48005578;//kernel.MapEditor:5578
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=48005709;//kernel.MapEditor:5709
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=48005726;//kernel.MapEditor:5726
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=48005839;//kernel.MapEditor:5839
                _this.my=_this.my+8;
              }
              //$LASTPOS=48005856;//kernel.MapEditor:5856
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=48005991;//kernel.MapEditor:5991
                _this.my=_this.my-8;
              }
              //$LASTPOS=48006008;//kernel.MapEditor:6008
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=48006049;//kernel.MapEditor:6049
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=48006155;//kernel.MapEditor:6155
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=48006178;//kernel.MapEditor:6178
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=48006309;//kernel.MapEditor:6309
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=48006332;//kernel.MapEditor:6332
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=48006445;//kernel.MapEditor:6445
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=48006468;//kernel.MapEditor:6468
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=48006603;//kernel.MapEditor:6603
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=48006626;//kernel.MapEditor:6626
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=48006663;//kernel.MapEditor:6663
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=48006693;//kernel.MapEditor:6693
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=48006724;//kernel.MapEditor:6724
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15; break; }
            {
              //$LASTPOS=48006776;//kernel.MapEditor:6776
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=48006824;//kernel.MapEditor:6824
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=48006874;//kernel.MapEditor:6874
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16; break; }
            {
              //$LASTPOS=48006928;//kernel.MapEditor:6928
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=48006976;//kernel.MapEditor:6976
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18; break; }
            //$LASTPOS=48007028;//kernel.MapEditor:7028
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=48007081;//kernel.MapEditor:7081
            _this.mode=_this.prevMode;
            //$LASTPOS=48007104;//kernel.MapEditor:7104
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=48007137;//kernel.MapEditor:7137
            _this.print(_this.mode+" mode");
            //$LASTPOS=48007166;//kernel.MapEditor:7166
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=48007190;//kernel.MapEditor:7190
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19; break; }
            {
              //$LASTPOS=48007244;//kernel.MapEditor:7244
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=48007296;//kernel.MapEditor:7296
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21; break; }
            //$LASTPOS=48007349;//kernel.MapEditor:7349
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=48007397;//kernel.MapEditor:7397
            _this.mode="set";
            //$LASTPOS=48007417;//kernel.MapEditor:7417
            _this.print(_this.mode+" mode");
            //$LASTPOS=48007446;//kernel.MapEditor:7446
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=48007470;//kernel.MapEditor:7470
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
    inRect :function _trc_MapEditor_inRect() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;
    },
    fiber$inRect :function _trc_MapEditor_f_inRect(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;return;
      
      
      _thread.retVal=_this;return;
    },
    drawPanel :function _trc_MapEditor_drawPanel() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=48007635;//kernel.MapEditor:7635
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=48007668;//kernel.MapEditor:7668
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=48007690;//kernel.MapEditor:7690
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=48007732;//kernel.MapEditor:7732
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=48007779;//kernel.MapEditor:7779
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=48007840;//kernel.MapEditor:7840
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=48007898;//kernel.MapEditor:7898
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=48007920;//kernel.MapEditor:7920
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=48007972;//kernel.MapEditor:7972
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008021;//kernel.MapEditor:8021
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008072;//kernel.MapEditor:8072
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008123;//kernel.MapEditor:8123
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008174;//kernel.MapEditor:8174
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=48008222;//kernel.MapEditor:8222
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=48008272;//kernel.MapEditor:8272
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=48008306;//kernel.MapEditor:8306
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008356;//kernel.MapEditor:8356
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008407;//kernel.MapEditor:8407
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008458;//kernel.MapEditor:8458
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008509;//kernel.MapEditor:8509
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=48008558;//kernel.MapEditor:8558
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=48008608;//kernel.MapEditor:8608
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=48008652;//kernel.MapEditor:8652
      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=48008708;//kernel.MapEditor:8708
      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=48008771;//kernel.MapEditor:8771
      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=48008845;//kernel.MapEditor:8845
      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=48008948;//kernel.MapEditor:8948
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=48009024;//kernel.MapEditor:9024
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=48009102;//kernel.MapEditor:9102
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=48009178;//kernel.MapEditor:9178
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=48009253;//kernel.MapEditor:9253
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=48009330;//kernel.MapEditor:9330
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=48007635;//kernel.MapEditor:7635
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=48007668;//kernel.MapEditor:7668
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=48007690;//kernel.MapEditor:7690
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=48007732;//kernel.MapEditor:7732
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=48007779;//kernel.MapEditor:7779
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=48007840;//kernel.MapEditor:7840
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=48007898;//kernel.MapEditor:7898
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=48007920;//kernel.MapEditor:7920
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=48007972;//kernel.MapEditor:7972
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008021;//kernel.MapEditor:8021
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008072;//kernel.MapEditor:8072
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008123;//kernel.MapEditor:8123
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=48008174;//kernel.MapEditor:8174
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=48008222;//kernel.MapEditor:8222
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=48008272;//kernel.MapEditor:8272
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=48008306;//kernel.MapEditor:8306
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008356;//kernel.MapEditor:8356
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008407;//kernel.MapEditor:8407
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008458;//kernel.MapEditor:8458
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=48008509;//kernel.MapEditor:8509
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=48008558;//kernel.MapEditor:8558
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=48008608;//kernel.MapEditor:8608
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=48008652;//kernel.MapEditor:8652
      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=48008708;//kernel.MapEditor:8708
      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=48008771;//kernel.MapEditor:8771
      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=48008845;//kernel.MapEditor:8845
      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=48008948;//kernel.MapEditor:8948
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=48009024;//kernel.MapEditor:9024
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=48009102;//kernel.MapEditor:9102
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=48009178;//kernel.MapEditor:9178
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=48009253;//kernel.MapEditor:9253
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=48009330;//kernel.MapEditor:9330
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=49000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=49000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=49000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=49000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=49000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=49000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=49000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=49000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=49000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=49000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=49000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=49000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=49000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=49000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=49000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=49000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=49000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=49000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=49000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=49000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=49000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=49000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=49000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=49000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=49001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=49001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=49001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=49001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=49001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=49001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=49001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=49001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=49001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=49001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=49001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=49001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=49001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=49001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=49001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=49001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=49001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=49001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=49001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=49001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=49001973;//kernel.MapEditorOLD:1973
      //$LASTPOS=49001977;//kernel.MapEditorOLD:1977
      i = 0;
      while(i<16) {
        {
          //$LASTPOS=49002001;//kernel.MapEditorOLD:2001
          //$LASTPOS=49002005;//kernel.MapEditorOLD:2005
          j = 0;
          while(j<8) {
            {
              //$LASTPOS=49002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=49002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=49002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=49002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=49002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=49002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=49002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=49002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=49002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=49002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=49002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=49002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=49002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=49002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=49002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=49002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=49002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=49002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=49002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=49002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=49002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=49002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=49002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=49002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=49002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=49002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=49002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=49002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=49002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=49002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=49002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=49003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=49003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=49003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=49003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=49003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=49003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=49003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=49003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=49003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=49003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=49003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=49003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=49003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=49003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=49004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=49004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=49004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=49004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=49004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=49004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=49004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=49004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=49004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=49004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=49004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=49004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=49004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=49004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=49004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=49004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=49004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=49004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=49004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=49004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=49004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=49004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=49004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=49004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=49004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=49004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=49004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=49004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=49004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=49004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=49005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=49005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=49005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=49005123;//kernel.MapEditorOLD:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=49000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=49000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=49000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2; break; }
            //$LASTPOS=49000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5; break;
            
          case 2:
            
            //$LASTPOS=49000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3; break; }
            //$LASTPOS=49000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=49000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=49000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9; break; }
            //$LASTPOS=49000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=49000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=49000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=49000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6; break; }
            {
              //$LASTPOS=49000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8;break;
          case 6:
            //$LASTPOS=49000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=49000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=49000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8:
            
            //$LASTPOS=49000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=49000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=49000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=49000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=49000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=49000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9:
            
            //$LASTPOS=49000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=49001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12; break; }
            //$LASTPOS=49001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=49001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=49001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=49001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=49001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=49001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=49001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=49001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=49001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13;break;
          case 12:
            {
              //$LASTPOS=49001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=49001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=49001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=49001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=49001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=49001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=49001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=49001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13:
            
            //$LASTPOS=49001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=49001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=49001973;//kernel.MapEditorOLD:1973
            //$LASTPOS=49001977;//kernel.MapEditorOLD:1977
            i = 0;
            while(i<16) {
              {
                //$LASTPOS=49002001;//kernel.MapEditorOLD:2001
                //$LASTPOS=49002005;//kernel.MapEditorOLD:2005
                j = 0;
                while(j<8) {
                  {
                    //$LASTPOS=49002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=49002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=49002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=49002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=49002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=49002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=49002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=49002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=49002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=49002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=49002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=49002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=49002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=49002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=49002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=49002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=49002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=49002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=49002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=49002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=49002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=49002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=49002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=49002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=49002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=49002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=49002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=49002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=49002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=49002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=49002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=49003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=49003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=49003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=49003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=49003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=49003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=49003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=49003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=49003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=49003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=49003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=49003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=49003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=49003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=49004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=49004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=49004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=49004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=49004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=49004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=49004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=49004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=49004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=49004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=49004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=49004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=49004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=49004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=49004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=49004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=49004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
            {
              //$LASTPOS=49004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=49004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=49004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
            {
              //$LASTPOS=49004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=49004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
            //$LASTPOS=49004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=49004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=49004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=49004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=49004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=49004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
            {
              //$LASTPOS=49004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=49004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
            //$LASTPOS=49004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=49005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=49005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=49005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=49005123;//kernel.MapEditorOLD:5123
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
  fullName: 'kernel.Pad',
  shortName: 'Pad',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Pad_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      while(i<5) {
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
        i++;
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      while(i<5) {
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
        i++;
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntU;
    },
    fiber$getPadUp :function _trc_Pad_f_getPadUp(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntU;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadDown :function _trc_Pad_getPadDown() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntD;
    },
    fiber$getPadDown :function _trc_Pad_f_getPadDown(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntD;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadLeft :function _trc_Pad_getPadLeft() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntL;
    },
    fiber$getPadLeft :function _trc_Pad_f_getPadLeft(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntL;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadRight :function _trc_Pad_getPadRight() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntR;
    },
    fiber$getPadRight :function _trc_Pad_f_getPadRight(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntR;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadButton :function _trc_Pad_getPadButton(i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var value;
      
      //$LASTPOS=50002940;//kernel.Pad:2940
      value;
      //$LASTPOS=50002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=50002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      //$LASTPOS=50002940;//kernel.Pad:2940
      value;
      //$LASTPOS=50002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=50002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      _thread.retVal=value;return;
      
      
      _thread.retVal=_this;return;
    },
    getUp :function _trc_Pad_getUp() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntU;
    },
    fiber$getUp :function _trc_Pad_f_getUp(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntU;return;
      
      
      _thread.retVal=_this;return;
    },
    getDown :function _trc_Pad_getDown() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntD;
    },
    fiber$getDown :function _trc_Pad_f_getDown(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntD;return;
      
      
      _thread.retVal=_this;return;
    },
    getLeft :function _trc_Pad_getLeft() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntL;
    },
    fiber$getLeft :function _trc_Pad_f_getLeft(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntL;return;
      
      
      _thread.retVal=_this;return;
    },
    getRight :function _trc_Pad_getRight() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.keyCntR;
    },
    fiber$getRight :function _trc_Pad_f_getRight(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntR;return;
      
      
      _thread.retVal=_this;return;
    },
    getButton :function _trc_Pad_getButton(i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var value;
      
      //$LASTPOS=50003163;//kernel.Pad:3163
      value;
      //$LASTPOS=50003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=50003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      //$LASTPOS=50003163;//kernel.Pad:3163
      value;
      //$LASTPOS=50003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=50003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      _thread.retVal=value;return;
      
      
      _thread.retVal=_this;return;
    },
    isOnRect :function _trc_Pad_isOnRect(mx,my,rx,ry,rx2,ry2) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
    },
    fiber$isOnRect :function _trc_Pad_f_isOnRect(_thread,mx,my,rx,ry,rx2,ry2) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
      
      
      _thread.retVal=_this;return;
    },
    isOnRectWH :function _trc_Pad_isOnRectWH(mx,my,rx,ry,rw,rh) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
    },
    fiber$isOnRectWH :function _trc_Pad_f_isOnRectWH(_thread,mx,my,rx,ry,rw,rh) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51002040;//kernel.Boot:2040
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=51002053;//kernel.Boot:2053
      _this.initSounds();
      //$LASTPOS=51002068;//kernel.Boot:2068
      _this.initSprites();
      //$LASTPOS=51002084;//kernel.Boot:2084
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=51002115;//kernel.Boot:2115
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=51002152;//kernel.Boot:2152
      _this.initThread();
      //$LASTPOS=51002169;//kernel.Boot:2169
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=51002186;//kernel.Boot:2186
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=51002203;//kernel.Boot:2203
      Tonyu.globals.$Math=Math;
      //$LASTPOS=51002216;//kernel.Boot:2216
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=51002326;//kernel.Boot:2326
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=51002350;//kernel.Boot:2350
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=51002490;//kernel.Boot:2490
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=51002528;//kernel.Boot:2528
        SplashScreen.hide();
      }
      //$LASTPOS=51002550;//kernel.Boot:2550
      _this.initFPSParams();
      //$LASTPOS=51002570;//kernel.Boot:2570
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=51002591;//kernel.Boot:2591
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=51002612;//kernel.Boot:2612
      while (true) {
        //$LASTPOS=51002652;//kernel.Boot:2652
        _this.scheduler.stepsAll();
        //$LASTPOS=51002679;//kernel.Boot:2679
        Tonyu.globals.$Keys.update();
        //$LASTPOS=51002700;//kernel.Boot:2700
        Tonyu.globals.$InputDevice.update();
        //$LASTPOS=51002728;//kernel.Boot:2728
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=51002761;//kernel.Boot:2761
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=51002796;//kernel.Boot:2796
        _this.doDraw=_this.now()<_this.deadLine;
        //$LASTPOS=51002824;//kernel.Boot:2824
        if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
          //$LASTPOS=51002878;//kernel.Boot:2878
          _this.doDraw=true;
          //$LASTPOS=51002900;//kernel.Boot:2900
          _this.resetDeadLine();
          
        }
        //$LASTPOS=51002929;//kernel.Boot:2929
        if (_this.doDraw) {
          //$LASTPOS=51002972;//kernel.Boot:2972
          Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=51003017;//kernel.Boot:3017
          Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=51003057;//kernel.Boot:3057
          Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=51003102;//kernel.Boot:3102
          Tonyu.globals.$Screen.draw();
          //$LASTPOS=51003127;//kernel.Boot:3127
          _this.fps_fpsCnt++;
          //$LASTPOS=51003151;//kernel.Boot:3151
          _this.frameSkipped=0;
          
        } else {
          //$LASTPOS=51003190;//kernel.Boot:3190
          _this.frameSkipped++;
          
        }
        //$LASTPOS=51003218;//kernel.Boot:3218
        Tonyu.globals.$Sprites.checkHit();
        //$LASTPOS=51003244;//kernel.Boot:3244
        Tonyu.globals.$Sprites.removeOneframes();
        //$LASTPOS=51003277;//kernel.Boot:3277
        _this.fps_rpsCnt++;
        //$LASTPOS=51003297;//kernel.Boot:3297
        _this.measureFps();
        //$LASTPOS=51003316;//kernel.Boot:3316
        _this.waitFrame();
        //$LASTPOS=51003343;//kernel.Boot:3343
        while (_this.paused) {
          //$LASTPOS=51003368;//kernel.Boot:3368
          _this.waitFor(Tonyu.timeout(1));
          //$LASTPOS=51003404;//kernel.Boot:3404
          if (! _this.paused) {
            //$LASTPOS=51003417;//kernel.Boot:3417
            _this.resetDeadLine();
          }
          
        }
        
      }
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51002040;//kernel.Boot:2040
      Tonyu.globals.$Boot=_this;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51002053;//kernel.Boot:2053
            _this.fiber$initSounds(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=51002068;//kernel.Boot:2068
            _this.fiber$initSprites(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=51002084;//kernel.Boot:2084
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=51002115;//kernel.Boot:2115
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=51002152;//kernel.Boot:2152
            _this.fiber$initThread(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=51002169;//kernel.Boot:2169
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=51002186;//kernel.Boot:2186
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=51002203;//kernel.Boot:2203
            Tonyu.globals.$Math=Math;
            //$LASTPOS=51002216;//kernel.Boot:2216
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=51002326;//kernel.Boot:2326
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=51002350;//kernel.Boot:2350
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=51002490;//kernel.Boot:2490
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=51002528;//kernel.Boot:2528
              SplashScreen.hide();
            }
            //$LASTPOS=51002550;//kernel.Boot:2550
            _this.initFPSParams();
            //$LASTPOS=51002570;//kernel.Boot:2570
            Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
            //$LASTPOS=51002591;//kernel.Boot:2591
            Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
            //$LASTPOS=51002612;//kernel.Boot:2612
          case 4:
            //$LASTPOS=51002652;//kernel.Boot:2652
            _this.scheduler.stepsAll();
            //$LASTPOS=51002679;//kernel.Boot:2679
            Tonyu.globals.$Keys.update();
            //$LASTPOS=51002700;//kernel.Boot:2700
            Tonyu.globals.$InputDevice.update();
            //$LASTPOS=51002728;//kernel.Boot:2728
            Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
            //$LASTPOS=51002761;//kernel.Boot:2761
            Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
            //$LASTPOS=51002796;//kernel.Boot:2796
            _this.doDraw=_this.now()<_this.deadLine;
            //$LASTPOS=51002824;//kernel.Boot:2824
            if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
              //$LASTPOS=51002878;//kernel.Boot:2878
              _this.doDraw=true;
              //$LASTPOS=51002900;//kernel.Boot:2900
              _this.resetDeadLine();
              
            }
            //$LASTPOS=51002929;//kernel.Boot:2929
            if (_this.doDraw) {
              //$LASTPOS=51002972;//kernel.Boot:2972
              Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=51003017;//kernel.Boot:3017
              Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=51003057;//kernel.Boot:3057
              Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=51003102;//kernel.Boot:3102
              Tonyu.globals.$Screen.draw();
              //$LASTPOS=51003127;//kernel.Boot:3127
              _this.fps_fpsCnt++;
              //$LASTPOS=51003151;//kernel.Boot:3151
              _this.frameSkipped=0;
              
            } else {
              //$LASTPOS=51003190;//kernel.Boot:3190
              _this.frameSkipped++;
              
            }
            //$LASTPOS=51003218;//kernel.Boot:3218
            Tonyu.globals.$Sprites.checkHit();
            //$LASTPOS=51003244;//kernel.Boot:3244
            Tonyu.globals.$Sprites.removeOneframes();
            //$LASTPOS=51003277;//kernel.Boot:3277
            _this.fps_rpsCnt++;
            //$LASTPOS=51003297;//kernel.Boot:3297
            _this.measureFps();
            //$LASTPOS=51003316;//kernel.Boot:3316
            _this.fiber$waitFrame(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=51003343;//kernel.Boot:3343
          case 6:
            if (!(_this.paused)) { __pc=8; break; }
            //$LASTPOS=51003368;//kernel.Boot:3368
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=7;return;
          case 7:
            
            //$LASTPOS=51003404;//kernel.Boot:3404
            if (! _this.paused) {
              //$LASTPOS=51003417;//kernel.Boot:3417
              _this.resetDeadLine();
            }
            __pc=6;break;
          case 8:
            
            __pc=4;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Boot_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51000206;//kernel.Boot:206
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51000242;//kernel.Boot:242
      _this.waitFor(Tonyu.timeout(50));
    },
    fiber$update :function _trc_Boot_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51000242;//kernel.Boot:242
            _this.fiber$waitFor(_thread, Tonyu.timeout(50));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprites :function _trc_Boot_initSprites() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var rs;
      var r;
      var name;
      var val;
      var _it_1613;
      
      //$LASTPOS=51000323;//kernel.Boot:323
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=51000352;//kernel.Boot:352
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=51000386;//kernel.Boot:386
      _this.print("Loading plugins..");
      //$LASTPOS=51000420;//kernel.Boot:420
      a = _this.asyncResult();
      //$LASTPOS=51000446;//kernel.Boot:446
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      //$LASTPOS=51000492;//kernel.Boot:492
      _this.waitFor(a);
      //$LASTPOS=51000509;//kernel.Boot:509
      _this.print("Loading pats..");
      //$LASTPOS=51000540;//kernel.Boot:540
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=51000583;//kernel.Boot:583
      a=_this.asyncResult();
      //$LASTPOS=51000605;//kernel.Boot:605
      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      //$LASTPOS=51000690;//kernel.Boot:690
      _this.waitFor(a);
      //$LASTPOS=51000707;//kernel.Boot:707
      r = a[0];
      //$LASTPOS=51000724;//kernel.Boot:724
      Tonyu.globals.$Sprites.setImageList(r);
      //$LASTPOS=51000755;//kernel.Boot:755
      _it_1613=Tonyu.iterator(r.names,2);
      while(_it_1613.next()) {
        name=_it_1613[0];
        val=_it_1613[1];
        
        //$LASTPOS=51000796;//kernel.Boot:796
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=51000836;//kernel.Boot:836
      _this.print("Loading pats done.");
      //$LASTPOS=51000871;//kernel.Boot:871
      _this.cvj=$("canvas");
      //$LASTPOS=51000893;//kernel.Boot:893
      if (Tonyu.noviceMode) {
        //$LASTPOS=51000926;//kernel.Boot:926
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=51001010;//kernel.Boot:1010
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
        
      }
    },
    fiber$initSprites :function _trc_Boot_f_initSprites(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var rs;
      var r;
      var name;
      var val;
      var _it_1613;
      
      //$LASTPOS=51000323;//kernel.Boot:323
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=51000352;//kernel.Boot:352
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=51000386;//kernel.Boot:386
      _this.print("Loading plugins..");
      //$LASTPOS=51000420;//kernel.Boot:420
      a = _this.asyncResult();
      //$LASTPOS=51000446;//kernel.Boot:446
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      
      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51000492;//kernel.Boot:492
            _this.fiber$waitFor(_thread, a);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=51000509;//kernel.Boot:509
            _this.print("Loading pats..");
            //$LASTPOS=51000540;//kernel.Boot:540
            rs = Tonyu.globals.$currentProject.getResource();
            //$LASTPOS=51000583;//kernel.Boot:583
            a=_this.asyncResult();
            //$LASTPOS=51000605;//kernel.Boot:605
            ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
            //$LASTPOS=51000690;//kernel.Boot:690
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=51000707;//kernel.Boot:707
            r = a[0];
            //$LASTPOS=51000724;//kernel.Boot:724
            Tonyu.globals.$Sprites.setImageList(r);
            //$LASTPOS=51000755;//kernel.Boot:755
            _it_1613=Tonyu.iterator(r.names,2);
            while(_it_1613.next()) {
              name=_it_1613[0];
              val=_it_1613[1];
              
              //$LASTPOS=51000796;//kernel.Boot:796
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=51000836;//kernel.Boot:836
            _this.print("Loading pats done.");
            //$LASTPOS=51000871;//kernel.Boot:871
            _this.cvj=$("canvas");
            //$LASTPOS=51000893;//kernel.Boot:893
            if (Tonyu.noviceMode) {
              //$LASTPOS=51000926;//kernel.Boot:926
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
              
            } else {
              //$LASTPOS=51001010;//kernel.Boot:1010
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSounds :function _trc_Boot_initSounds() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51001103;//kernel.Boot:1103
      _this.print("Loading sounds...");
      //$LASTPOS=51001137;//kernel.Boot:1137
      _this.initT2MediaPlayer();
      //$LASTPOS=51001163;//kernel.Boot:1163
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=51001202;//kernel.Boot:1202
      _this.print("Loading sounds done.");
      //$LASTPOS=51001239;//kernel.Boot:1239
      _this.on("stop",(function anonymous_1249() {
        
        //$LASTPOS=51001261;//kernel.Boot:1261
        _this.clearSEData();
      }));
      //$LASTPOS=51001289;//kernel.Boot:1289
      Tonyu.globals.$sound=_this;
    },
    fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51001103;//kernel.Boot:1103
      _this.print("Loading sounds...");
      
      _thread.enter(function _trc_Boot_ent_initSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51001137;//kernel.Boot:1137
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=51001163;//kernel.Boot:1163
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=51001202;//kernel.Boot:1202
            _this.print("Loading sounds done.");
            //$LASTPOS=51001239;//kernel.Boot:1239
            _this.on("stop",(function anonymous_1249() {
              
              //$LASTPOS=51001261;//kernel.Boot:1261
              _this.clearSEData();
            }));
            //$LASTPOS=51001289;//kernel.Boot:1289
            Tonyu.globals.$sound=_this;
            _thread.exit(_this);return;
          }
        }
      });
    },
    hide :function _trc_Boot_hide() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    initThread :function _trc_Boot_initThread() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var o;
      var mainClassName;
      
      //$LASTPOS=51001392;//kernel.Boot:1392
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=51001438;//kernel.Boot:1438
      mainClassName = o.run.mainClass;
      //$LASTPOS=51001478;//kernel.Boot:1478
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=51001519;//kernel.Boot:1519
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=51001565;//kernel.Boot:1565
      if (! _this.mainClass) {
        //$LASTPOS=51001592;//kernel.Boot:1592
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=51001729;//kernel.Boot:1729
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=51001770;//kernel.Boot:1770
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot_f_initThread(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=51001392;//kernel.Boot:1392
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=51001438;//kernel.Boot:1438
      mainClassName = o.run.mainClass;
      //$LASTPOS=51001478;//kernel.Boot:1478
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=51001519;//kernel.Boot:1519
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=51001565;//kernel.Boot:1565
      if (! _this.mainClass) {
        //$LASTPOS=51001592;//kernel.Boot:1592
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=51001729;//kernel.Boot:1729
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=51001770;//kernel.Boot:1770
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51001806;//kernel.Boot:1806
      _this.fireEvent("stop");
      //$LASTPOS=51001830;//kernel.Boot:1830
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51001806;//kernel.Boot:1806
      _this.fireEvent("stop");
      //$LASTPOS=51001830;//kernel.Boot:1830
      _this.die();
      
      _thread.retVal=_this;return;
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var th;
      
      //$LASTPOS=51001875;//kernel.Boot:1875
      method=method||"main";
      //$LASTPOS=51001903;//kernel.Boot:1903
      args=args||[];
      //$LASTPOS=51001923;//kernel.Boot:1923
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=51001975;//kernel.Boot:1975
      _this.addThreadGroup(obj);
      //$LASTPOS=51002001;//kernel.Boot:2001
      obj.addThread(th);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=51001875;//kernel.Boot:1875
      method=method||"main";
      //$LASTPOS=51001903;//kernel.Boot:1903
      args=args||[];
      //$LASTPOS=51001923;//kernel.Boot:1923
      th = _this.scheduler.newThread(obj,method,args);
      
      _thread.enter(function _trc_Boot_ent_schedule(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51001975;//kernel.Boot:1975
            _this.fiber$addThreadGroup(_thread, obj);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=51002001;//kernel.Boot:2001
            obj.addThread(th);
            _thread.exit(th);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51003497;//kernel.Boot:3497
      _this._fps=30;
      //$LASTPOS=51003513;//kernel.Boot:3513
      _this.maxframeSkip=5;
      //$LASTPOS=51003563;//kernel.Boot:3563
      _this.frameCnt=0;
      //$LASTPOS=51003582;//kernel.Boot:3582
      _this.resetDeadLine();
      //$LASTPOS=51003604;//kernel.Boot:3604
      _this.lastMeasured=_this.now();
      //$LASTPOS=51003629;//kernel.Boot:3629
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
    },
    now :function _trc_Boot_now() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot_resetDeadLine() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51003759;//kernel.Boot:3759
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=51003790;//kernel.Boot:3790
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var wt;
      
      //$LASTPOS=51003834;//kernel.Boot:3834
      wt = _this.deadLine-_this.now();
      //$LASTPOS=51003862;//kernel.Boot:3862
      if (wt<1) {
        //$LASTPOS=51003883;//kernel.Boot:3883
        if (wt<- 1000) {
          //$LASTPOS=51003897;//kernel.Boot:3897
          _this.resetDeadLine();
        }
        //$LASTPOS=51003923;//kernel.Boot:3923
        wt=1;
        
      }
      //$LASTPOS=51003941;//kernel.Boot:3941
      wt=_this.floor(wt);
      //$LASTPOS=51003960;//kernel.Boot:3960
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=51003993;//kernel.Boot:3993
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=51003834;//kernel.Boot:3834
      wt = _this.deadLine-_this.now();
      //$LASTPOS=51003862;//kernel.Boot:3862
      if (wt<1) {
        //$LASTPOS=51003883;//kernel.Boot:3883
        if (wt<- 1000) {
          //$LASTPOS=51003897;//kernel.Boot:3897
          _this.resetDeadLine();
        }
        //$LASTPOS=51003923;//kernel.Boot:3923
        wt=1;
        
      }
      //$LASTPOS=51003941;//kernel.Boot:3941
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51003960;//kernel.Boot:3960
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=51003993;//kernel.Boot:3993
            _this.deadLine+=1000/_this._fps;
            _thread.exit(_this);return;
          }
        }
      });
    },
    getFrameRate :function _trc_Boot_getFrameRate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this._fps;
    },
    setFrameRate :function _trc_Boot_setFrameRate(fps,maxFrameSkip) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51004153;//kernel.Boot:4153
      _this._fps=fps;
      //$LASTPOS=51004170;//kernel.Boot:4170
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=51004205;//kernel.Boot:4205
        maxFrameSkip=5;
      }
      //$LASTPOS=51004226;//kernel.Boot:4226
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=51004265;//kernel.Boot:4265
      _this.resetDeadLine();
    },
    getMeasuredFps :function _trc_Boot_getMeasuredFps() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.fps_fps;
    },
    getMeasuredRps :function _trc_Boot_getMeasuredRps() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.fps_rps;
    },
    measureFps :function _trc_Boot_measureFps() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51004476;//kernel.Boot:4476
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=51004516;//kernel.Boot:4516
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=51004545;//kernel.Boot:4545
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=51004574;//kernel.Boot:4574
        _this.fps_fpsCnt=0;
        //$LASTPOS=51004597;//kernel.Boot:4597
        _this.fps_rpsCnt=0;
        //$LASTPOS=51004620;//kernel.Boot:4620
        _this.lastMeasured=_this.now();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"hide":{"nowait":true},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.DxChar',
  shortName: 'DxChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_DxChar_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_DxChar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_DxChar_initialize(xx,yy,pp,ff,sz,rt,al) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=52000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=52000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=52000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=52000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=52000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=52000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=52000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=52000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=52000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=52000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=52000212;//kernel.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=52000233;//kernel.DxChar:233
      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
