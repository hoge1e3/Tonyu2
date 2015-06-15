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
      
      //$LASTPOS=1000063;//kernel.EventMod:63
      if (_this._eventHandlers) {
        return _this;
      }
      //$LASTPOS=1000156;//kernel.EventMod:156
      _this._eventHandlers={};
      //$LASTPOS=1000179;//kernel.EventMod:179
      _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
    },
    releaseEventMod :function _trc_EventMod_releaseEventMod() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var k;
      var v;
      var _it_1;
      
      //$LASTPOS=1000243;//kernel.EventMod:243
      _it_1=Tonyu.iterator(_this._eventHandlers,2);
      while(_it_1.next()) {
        k=_it_1[0];
        v=_it_1[1];
        
        //$LASTPOS=1000285;//kernel.EventMod:285
        v.release();
        
      }
    },
    parseArgs :function _trc_EventMod_parseArgs(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var i;
      
      //$LASTPOS=1000335;//kernel.EventMod:335
      res = {type: a[0],args: []};
      //$LASTPOS=1000369;//kernel.EventMod:369
      //$LASTPOS=1000374;//kernel.EventMod:374
      i = 1;
      while(i<a.length) {
        {
          //$LASTPOS=1000412;//kernel.EventMod:412
          res.args.push(a[i]);
        }
        i++;
      }
      return res;
    },
    registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000535;//kernel.EventMod:535
      _this.initEventMod();
      //$LASTPOS=1000555;//kernel.EventMod:555
      if (typeof  type=="function") {
        //$LASTPOS=1000594;//kernel.EventMod:594
        obj=obj||new type({target: _this});
        //$LASTPOS=1000634;//kernel.EventMod:634
        type=obj.getClassInfo().fullName;
        
      } else {
        //$LASTPOS=1000690;//kernel.EventMod:690
        obj=obj||new Tonyu.classes.kernel.EventHandler({target: _this});
        //$LASTPOS=1000740;//kernel.EventMod:740
        obj.target=_this;
        
      }
      return _this._eventHandlers[type]=obj;
    },
    getEventHandler :function _trc_EventMod_getEventHandler(type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=1000908;//kernel.EventMod:908
      _this.initEventMod();
      //$LASTPOS=1000928;//kernel.EventMod:928
      if (typeof  type=="function") {
        //$LASTPOS=1000967;//kernel.EventMod:967
        type=type.meta.fullName;
        
      }
      //$LASTPOS=1001002;//kernel.EventMod:1002
      res = _this._eventHandlers[type];
      return res;
    },
    getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=1001098;//kernel.EventMod:1098
      res = _this.getEventHandler(type)||_this.registerEventHandler(type);
      return res;
    },
    on :function _trc_EventMod_on() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var h;
      
      //$LASTPOS=1001201;//kernel.EventMod:1201
      a = _this.parseArgs(arguments);
      //$LASTPOS=1001234;//kernel.EventMod:1234
      h = _this.getOrRegisterEventHandler(a.type);
      return h.addListener.apply(h,a.args);
    },
    fireEvent :function _trc_EventMod_fireEvent(type,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var h;
      
      //$LASTPOS=1001419;//kernel.EventMod:1419
      h = _this.getEventHandler(type);
      //$LASTPOS=1001453;//kernel.EventMod:1453
      if (h) {
        //$LASTPOS=1001460;//kernel.EventMod:1460
        h.fire([arg]);
      }
    },
    sendEvent :function _trc_EventMod_sendEvent(type,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1001515;//kernel.EventMod:1515
      _this.fireEvent(type,arg);
    },
    waitEvent :function _trc_EventMod_waitEvent() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var args;
      var i;
      
      //$LASTPOS=1001562;//kernel.EventMod:1562
      if (null) {
        //$LASTPOS=1001586;//kernel.EventMod:1586
        args = [];
        //$LASTPOS=1001608;//kernel.EventMod:1608
        //$LASTPOS=1001613;//kernel.EventMod:1613
        i = 0;
        while(i<arguments.length) {
          {
            //$LASTPOS=1001660;//kernel.EventMod:1660
            if (arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=1001710;//kernel.EventMod:1710
            args.push(arguments[i]);
          }
          i++;
        }
        //$LASTPOS=1001755;//kernel.EventMod:1755
        null.waitEvent(_this,args);
        
      }
    },
    fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var args;
      var i;
      
      //$LASTPOS=1001562;//kernel.EventMod:1562
      if (_thread) {
        //$LASTPOS=1001586;//kernel.EventMod:1586
        args = [];
        //$LASTPOS=1001608;//kernel.EventMod:1608
        //$LASTPOS=1001613;//kernel.EventMod:1613
        i = 0;
        while(i<_arguments.length) {
          {
            //$LASTPOS=1001660;//kernel.EventMod:1660
            if (_arguments[i]===undefined) {
              break;
              
            }
            //$LASTPOS=1001710;//kernel.EventMod:1710
            args.push(_arguments[i]);
          }
          i++;
        }
        //$LASTPOS=1001755;//kernel.EventMod:1755
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
      
      //$LASTPOS=2000060;//kernel.OneframeSpriteMod:60
      if (! size) {
        //$LASTPOS=2000071;//kernel.OneframeSpriteMod:71
        size=15;
      }
      //$LASTPOS=2000085;//kernel.OneframeSpriteMod:85
      if (! col) {
        //$LASTPOS=2000095;//kernel.OneframeSpriteMod:95
        col="cyan";
      }
      //$LASTPOS=2000112;//kernel.OneframeSpriteMod:112
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size,oneframeSprite: true});
    },
    drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000217;//kernel.OneframeSpriteMod:217
      if (! col) {
        //$LASTPOS=2000227;//kernel.OneframeSpriteMod:227
        col="white";
      }
      //$LASTPOS=2000245;//kernel.OneframeSpriteMod:245
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
      
      //$LASTPOS=3000090;//kernel.TextRectMod:90
      if (! align) {
        //$LASTPOS=3000102;//kernel.TextRectMod:102
        align="center";
      }
      //$LASTPOS=3000123;//kernel.TextRectMod:123
      ctx.textBaseline="top";
      //$LASTPOS=3000152;//kernel.TextRectMod:152
      _this.setFontSize(ctx,h);
      //$LASTPOS=3000178;//kernel.TextRectMod:178
      met = ctx.measureText(text);
      //$LASTPOS=3000214;//kernel.TextRectMod:214
      res = {y: topY,w: met.width,h: h};
      //$LASTPOS=3000256;//kernel.TextRectMod:256
      t = align.substring(0,1).toLowerCase();
      //$LASTPOS=3000303;//kernel.TextRectMod:303
      if (t=="l") {
        //$LASTPOS=3000315;//kernel.TextRectMod:315
        res.x=x;
      } else {
        //$LASTPOS=3000334;//kernel.TextRectMod:334
        if (t=="r") {
          //$LASTPOS=3000346;//kernel.TextRectMod:346
          res.x=x-met.width;
        } else {
          //$LASTPOS=3000375;//kernel.TextRectMod:375
          if (t=="c") {
            //$LASTPOS=3000387;//kernel.TextRectMod:387
            res.x=x-met.width/2;
          }
        }
      }
      //$LASTPOS=3000413;//kernel.TextRectMod:413
      if (type=="fill") {
        //$LASTPOS=3000431;//kernel.TextRectMod:431
        ctx.fillText(text,res.x,topY);
      }
      //$LASTPOS=3000468;//kernel.TextRectMod:468
      if (type=="stroke") {
        //$LASTPOS=3000488;//kernel.TextRectMod:488
        ctx.strokeText(text,res.x,topY);
      }
      return res;
    },
    setFontSize :function _trc_TextRectMod_setFontSize(ctx,sz) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var post;
      
      //$LASTPOS=3000586;//kernel.TextRectMod:586
      post = ctx.font.replace(/^[0-9\.]+/,"");
      //$LASTPOS=3000634;//kernel.TextRectMod:634
      ctx.font=sz+post;
    },
    fukidashi :function _trc_TextRectMod_fukidashi(ctx,text,x,y,sz) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var align;
      var theight;
      var margin;
      var r;
      var fs;
      
      //$LASTPOS=3000712;//kernel.TextRectMod:712
      align = "c";
      //$LASTPOS=3000732;//kernel.TextRectMod:732
      theight = 20;
      //$LASTPOS=3000753;//kernel.TextRectMod:753
      margin = 5;
      //$LASTPOS=3000772;//kernel.TextRectMod:772
      r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
      //$LASTPOS=3000842;//kernel.TextRectMod:842
      ctx.beginPath();
      //$LASTPOS=3000864;//kernel.TextRectMod:864
      ctx.moveTo(x,y);
      //$LASTPOS=3000888;//kernel.TextRectMod:888
      ctx.lineTo(x+margin,y-theight);
      //$LASTPOS=3000927;//kernel.TextRectMod:927
      ctx.lineTo(x+r.w/2+margin,y-theight);
      //$LASTPOS=3000972;//kernel.TextRectMod:972
      ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
      //$LASTPOS=3001030;//kernel.TextRectMod:1030
      ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
      //$LASTPOS=3001088;//kernel.TextRectMod:1088
      ctx.lineTo(x-r.w/2-margin,y-theight);
      //$LASTPOS=3001133;//kernel.TextRectMod:1133
      ctx.lineTo(x-margin,y-theight);
      //$LASTPOS=3001172;//kernel.TextRectMod:1172
      ctx.closePath();
      //$LASTPOS=3001194;//kernel.TextRectMod:1194
      ctx.fill();
      //$LASTPOS=3001211;//kernel.TextRectMod:1211
      ctx.stroke();
      //$LASTPOS=3001236;//kernel.TextRectMod:1236
      fs = ctx.fillStyle;
      //$LASTPOS=3001263;//kernel.TextRectMod:1263
      ctx.fillStyle=ctx.strokeStyle;
      //$LASTPOS=3001299;//kernel.TextRectMod:1299
      _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
      //$LASTPOS=3001372;//kernel.TextRectMod:1372
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
      
      //$LASTPOS=4000416;//kernel.MathMod:416
      c;
      //$LASTPOS=4000428;//kernel.MathMod:428
      a=_this.floor(a);
      //$LASTPOS=4000445;//kernel.MathMod:445
      b=_this.floor(b);
      //$LASTPOS=4000462;//kernel.MathMod:462
      if (a>=b) {
        //$LASTPOS=4000483;//kernel.MathMod:483
        c=(a-b)%360;
        //$LASTPOS=4000507;//kernel.MathMod:507
        if (c>=180) {
          //$LASTPOS=4000519;//kernel.MathMod:519
          c-=360;
        }
        
      } else {
        //$LASTPOS=4000550;//kernel.MathMod:550
        c=- ((b-a)%360);
        //$LASTPOS=4000577;//kernel.MathMod:577
        if (c<- 180) {
          //$LASTPOS=4000589;//kernel.MathMod:589
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
      
      //$LASTPOS=4000698;//kernel.MathMod:698
      if (typeof  dx=="object") {
        //$LASTPOS=4000734;//kernel.MathMod:734
        t = dx;
        //$LASTPOS=4000753;//kernel.MathMod:753
        dx=t.x-_this.x;
        //$LASTPOS=4000762;//kernel.MathMod:762
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000838;//kernel.MathMod:838
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
      
      //$LASTPOS=4000975;//kernel.MathMod:975
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
      
      //$LASTPOS=5000034;//kernel.T2Mod:34
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=5000034;//kernel.T2Mod:34
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
      
      //$LASTPOS=6000038;//kernel.ThreadGroupMod:38
      _this.threads=_this.threads||[];
      //$LASTPOS=6000064;//kernel.ThreadGroupMod:64
      _this.threads.push(t);
    },
    fiber$addThread :function _trc_ThreadGroupMod_f_addThread(_thread,t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000038;//kernel.ThreadGroupMod:38
      _this.threads=_this.threads||[];
      //$LASTPOS=6000064;//kernel.ThreadGroupMod:64
      _this.threads.push(t);
      
      _thread.retVal=_this;return;
    },
    addThreadGroup :function _trc_ThreadGroupMod_addThreadGroup(tg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000112;//kernel.ThreadGroupMod:112
      _this.threadGroups=_this.threadGroups||[];
      //$LASTPOS=6000148;//kernel.ThreadGroupMod:148
      _this.threadGroups.push(tg);
    },
    fiber$addThreadGroup :function _trc_ThreadGroupMod_f_addThreadGroup(_thread,tg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000112;//kernel.ThreadGroupMod:112
      _this.threadGroups=_this.threadGroups||[];
      //$LASTPOS=6000148;//kernel.ThreadGroupMod:148
      _this.threadGroups.push(tg);
      
      _thread.retVal=_this;return;
    },
    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var thread;
      var _it_26;
      var threadGroup;
      var _it_27;
      
      //$LASTPOS=6000201;//kernel.ThreadGroupMod:201
      if (_this.threads) {
        //$LASTPOS=6000225;//kernel.ThreadGroupMod:225
        _it_26=Tonyu.iterator(_this.threads,1);
        while(_it_26.next()) {
          thread=_it_26[0];
          
          //$LASTPOS=6000268;//kernel.ThreadGroupMod:268
          thread.kill();
          
        }
        
      }
      //$LASTPOS=6000306;//kernel.ThreadGroupMod:306
      if (_this.threadGroups) {
        //$LASTPOS=6000335;//kernel.ThreadGroupMod:335
        _it_27=Tonyu.iterator(_this.threadGroups,1);
        while(_it_27.next()) {
          threadGroup=_it_27[0];
          
          //$LASTPOS=6000388;//kernel.ThreadGroupMod:388
          threadGroup.killThreadGroup();
          
        }
        
      }
    },
    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var thread;
      var _it_26;
      var threadGroup;
      var _it_27;
      
      //$LASTPOS=6000201;//kernel.ThreadGroupMod:201
      if (_this.threads) {
        //$LASTPOS=6000225;//kernel.ThreadGroupMod:225
        _it_26=Tonyu.iterator(_this.threads,1);
        while(_it_26.next()) {
          thread=_it_26[0];
          
          //$LASTPOS=6000268;//kernel.ThreadGroupMod:268
          thread.kill();
          
        }
        
      }
      //$LASTPOS=6000306;//kernel.ThreadGroupMod:306
      if (_this.threadGroups) {
        //$LASTPOS=6000335;//kernel.ThreadGroupMod:335
        _it_27=Tonyu.iterator(_this.threadGroups,1);
        while(_it_27.next()) {
          threadGroup=_it_27[0];
          
          //$LASTPOS=6000388;//kernel.ThreadGroupMod:388
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
      
      //$LASTPOS=7000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=7000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=7000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=7000123;//kernel.TObject:123
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
      
      //$LASTPOS=8000049;//kernel.TQuery:49
      _this.length=0;
    },
    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=8000089;//kernel.TQuery:89
      res = {};
      //$LASTPOS=8000105;//kernel.TQuery:105
      res.i=0;
      //$LASTPOS=8000118;//kernel.TQuery:118
      if (arity==1) {
        //$LASTPOS=8000142;//kernel.TQuery:142
        res.next=(function anonymous_151() {
          
          //$LASTPOS=8000177;//kernel.TQuery:177
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=8000227;//kernel.TQuery:227
          res[0]=_this[res.i];
          //$LASTPOS=8000259;//kernel.TQuery:259
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=8000325;//kernel.TQuery:325
        res.next=(function anonymous_334() {
          
          //$LASTPOS=8000360;//kernel.TQuery:360
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=8000410;//kernel.TQuery:410
          res[0]=res.i;
          //$LASTPOS=8000436;//kernel.TQuery:436
          res[1]=_this[res.i];
          //$LASTPOS=8000468;//kernel.TQuery:468
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
      
      //$LASTPOS=8000089;//kernel.TQuery:89
      res = {};
      //$LASTPOS=8000105;//kernel.TQuery:105
      res.i=0;
      //$LASTPOS=8000118;//kernel.TQuery:118
      if (arity==1) {
        //$LASTPOS=8000142;//kernel.TQuery:142
        res.next=(function anonymous_151() {
          
          //$LASTPOS=8000177;//kernel.TQuery:177
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=8000227;//kernel.TQuery:227
          res[0]=_this[res.i];
          //$LASTPOS=8000259;//kernel.TQuery:259
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=8000325;//kernel.TQuery:325
        res.next=(function anonymous_334() {
          
          //$LASTPOS=8000360;//kernel.TQuery:360
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=8000410;//kernel.TQuery:410
          res[0]=res.i;
          //$LASTPOS=8000436;//kernel.TQuery:436
          res[1]=_this[res.i];
          //$LASTPOS=8000468;//kernel.TQuery:468
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
      var _it_33;
      
      //$LASTPOS=8000551;//kernel.TQuery:551
      values;
      //$LASTPOS=8000567;//kernel.TQuery:567
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=8000594;//kernel.TQuery:594
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=8000702;//kernel.TQuery:702
      if (arguments.length>=2) {
        //$LASTPOS=8000737;//kernel.TQuery:737
        values={};
        //$LASTPOS=8000756;//kernel.TQuery:756
        //$LASTPOS=8000761;//kernel.TQuery:761
        i = 0;
        while(i<arguments.length-1) {
          {
            //$LASTPOS=8000813;//kernel.TQuery:813
            values[arguments[i]]=arguments[i+1];
          }
          i+=2;
        }
        
      } else {
        //$LASTPOS=8000881;//kernel.TQuery:881
        values=arguments[0];
        
      }
      //$LASTPOS=8000912;//kernel.TQuery:912
      if (values) {
        //$LASTPOS=8000934;//kernel.TQuery:934
        _it_33=Tonyu.iterator(_this,1);
        while(_it_33.next()) {
          e=_it_33[0];
          
          //$LASTPOS=8000968;//kernel.TQuery:968
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
      var _it_33;
      
      //$LASTPOS=8000551;//kernel.TQuery:551
      values;
      //$LASTPOS=8000567;//kernel.TQuery:567
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=8000594;//kernel.TQuery:594
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=8000702;//kernel.TQuery:702
      if (_arguments.length>=2) {
        //$LASTPOS=8000737;//kernel.TQuery:737
        values={};
        //$LASTPOS=8000756;//kernel.TQuery:756
        //$LASTPOS=8000761;//kernel.TQuery:761
        i = 0;
        while(i<_arguments.length-1) {
          {
            //$LASTPOS=8000813;//kernel.TQuery:813
            values[_arguments[i]]=_arguments[i+1];
          }
          i+=2;
        }
        
      } else {
        //$LASTPOS=8000881;//kernel.TQuery:881
        values=_arguments[0];
        
      }
      //$LASTPOS=8000912;//kernel.TQuery:912
      if (values) {
        //$LASTPOS=8000934;//kernel.TQuery:934
        _it_33=Tonyu.iterator(_this,1);
        while(_it_33.next()) {
          e=_it_33[0];
          
          //$LASTPOS=8000968;//kernel.TQuery:968
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=8001028;//kernel.TQuery:1028
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
      
      //$LASTPOS=8001028;//kernel.TQuery:1028
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
      var _it_39;
      var v;
      
      //$LASTPOS=8001154;//kernel.TQuery:1154
      f = _this.genKeyfunc(key);
      //$LASTPOS=8001181;//kernel.TQuery:1181
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=8001210;//kernel.TQuery:1210
      _it_39=Tonyu.iterator(_this,1);
      while(_it_39.next()) {
        o=_it_39[0];
        
        //$LASTPOS=8001240;//kernel.TQuery:1240
        v = f(o);
        //$LASTPOS=8001260;//kernel.TQuery:1260
        if (res==null||v>=res) {
          //$LASTPOS=8001299;//kernel.TQuery:1299
          if (v>res) {
            //$LASTPOS=8001310;//kernel.TQuery:1310
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=8001339;//kernel.TQuery:1339
          reso.push(o);
          //$LASTPOS=8001365;//kernel.TQuery:1365
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
      var _it_39;
      var v;
      
      //$LASTPOS=8001154;//kernel.TQuery:1154
      f = _this.genKeyfunc(key);
      //$LASTPOS=8001181;//kernel.TQuery:1181
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=8001210;//kernel.TQuery:1210
      _it_39=Tonyu.iterator(_this,1);
      while(_it_39.next()) {
        o=_it_39[0];
        
        //$LASTPOS=8001240;//kernel.TQuery:1240
        v = f(o);
        //$LASTPOS=8001260;//kernel.TQuery:1260
        if (res==null||v>=res) {
          //$LASTPOS=8001299;//kernel.TQuery:1299
          if (v>res) {
            //$LASTPOS=8001310;//kernel.TQuery:1310
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=8001339;//kernel.TQuery:1339
          reso.push(o);
          //$LASTPOS=8001365;//kernel.TQuery:1365
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
      var _it_46;
      var v;
      
      //$LASTPOS=8001424;//kernel.TQuery:1424
      f = _this.genKeyfunc(key);
      //$LASTPOS=8001451;//kernel.TQuery:1451
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=8001480;//kernel.TQuery:1480
      _it_46=Tonyu.iterator(_this,1);
      while(_it_46.next()) {
        o=_it_46[0];
        
        //$LASTPOS=8001510;//kernel.TQuery:1510
        v = f(o);
        //$LASTPOS=8001530;//kernel.TQuery:1530
        if (res==null||v<=res) {
          //$LASTPOS=8001569;//kernel.TQuery:1569
          if (v<res) {
            //$LASTPOS=8001580;//kernel.TQuery:1580
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=8001609;//kernel.TQuery:1609
          reso.push(o);
          //$LASTPOS=8001635;//kernel.TQuery:1635
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
      var _it_46;
      var v;
      
      //$LASTPOS=8001424;//kernel.TQuery:1424
      f = _this.genKeyfunc(key);
      //$LASTPOS=8001451;//kernel.TQuery:1451
      res;reso = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=8001480;//kernel.TQuery:1480
      _it_46=Tonyu.iterator(_this,1);
      while(_it_46.next()) {
        o=_it_46[0];
        
        //$LASTPOS=8001510;//kernel.TQuery:1510
        v = f(o);
        //$LASTPOS=8001530;//kernel.TQuery:1530
        if (res==null||v<=res) {
          //$LASTPOS=8001569;//kernel.TQuery:1569
          if (v<res) {
            //$LASTPOS=8001580;//kernel.TQuery:1580
            reso=new Tonyu.classes.kernel.TQuery;
          }
          //$LASTPOS=8001609;//kernel.TQuery:1609
          reso.push(o);
          //$LASTPOS=8001635;//kernel.TQuery:1635
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
      
      //$LASTPOS=8001782;//kernel.TQuery:1782
      if (typeof  x=="object") {
        //$LASTPOS=8001807;//kernel.TQuery:1807
        y=x.y;
        //$LASTPOS=8001813;//kernel.TQuery:1813
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
      
      //$LASTPOS=8001782;//kernel.TQuery:1782
      if (typeof  x=="object") {
        //$LASTPOS=8001807;//kernel.TQuery:1807
        y=x.y;
        //$LASTPOS=8001813;//kernel.TQuery:1813
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
      
      //$LASTPOS=8001958;//kernel.TQuery:1958
      x;y;
      //$LASTPOS=8001971;//kernel.TQuery:1971
      if (typeof  xo=="object") {
        //$LASTPOS=8002006;//kernel.TQuery:2006
        x=xo.x;
        //$LASTPOS=8002013;//kernel.TQuery:2013
        y=xo.y;
        //$LASTPOS=8002020;//kernel.TQuery:2020
        d=yd;
        
      } else {
        //$LASTPOS=8002047;//kernel.TQuery:2047
        x=xo;
        //$LASTPOS=8002052;//kernel.TQuery:2052
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
      
      //$LASTPOS=8001958;//kernel.TQuery:1958
      x;y;
      //$LASTPOS=8001971;//kernel.TQuery:1971
      if (typeof  xo=="object") {
        //$LASTPOS=8002006;//kernel.TQuery:2006
        x=xo.x;
        //$LASTPOS=8002013;//kernel.TQuery:2013
        y=xo.y;
        //$LASTPOS=8002020;//kernel.TQuery:2020
        d=yd;
        
      } else {
        //$LASTPOS=8002047;//kernel.TQuery:2047
        x=xo;
        //$LASTPOS=8002052;//kernel.TQuery:2052
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
      var _it_57;
      var v;
      
      //$LASTPOS=8002210;//kernel.TQuery:2210
      f = _this.genKeyfunc(key);
      //$LASTPOS=8002237;//kernel.TQuery:2237
      res;
      //$LASTPOS=8002250;//kernel.TQuery:2250
      _it_57=Tonyu.iterator(_this,1);
      while(_it_57.next()) {
        o=_it_57[0];
        
        //$LASTPOS=8002280;//kernel.TQuery:2280
        v = f(o);
        //$LASTPOS=8002300;//kernel.TQuery:2300
        if (res==null||v>res) {
          //$LASTPOS=8002324;//kernel.TQuery:2324
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
      var _it_57;
      var v;
      
      //$LASTPOS=8002210;//kernel.TQuery:2210
      f = _this.genKeyfunc(key);
      //$LASTPOS=8002237;//kernel.TQuery:2237
      res;
      //$LASTPOS=8002250;//kernel.TQuery:2250
      _it_57=Tonyu.iterator(_this,1);
      while(_it_57.next()) {
        o=_it_57[0];
        
        //$LASTPOS=8002280;//kernel.TQuery:2280
        v = f(o);
        //$LASTPOS=8002300;//kernel.TQuery:2300
        if (res==null||v>res) {
          //$LASTPOS=8002324;//kernel.TQuery:2324
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
      var _it_63;
      var v;
      
      //$LASTPOS=8002371;//kernel.TQuery:2371
      f = _this.genKeyfunc(key);
      //$LASTPOS=8002398;//kernel.TQuery:2398
      res;
      //$LASTPOS=8002411;//kernel.TQuery:2411
      _it_63=Tonyu.iterator(_this,1);
      while(_it_63.next()) {
        o=_it_63[0];
        
        //$LASTPOS=8002441;//kernel.TQuery:2441
        v = f(o);
        //$LASTPOS=8002461;//kernel.TQuery:2461
        if (res==null||v<res) {
          //$LASTPOS=8002485;//kernel.TQuery:2485
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
      var _it_63;
      var v;
      
      //$LASTPOS=8002371;//kernel.TQuery:2371
      f = _this.genKeyfunc(key);
      //$LASTPOS=8002398;//kernel.TQuery:2398
      res;
      //$LASTPOS=8002411;//kernel.TQuery:2411
      _it_63=Tonyu.iterator(_this,1);
      while(_it_63.next()) {
        o=_it_63[0];
        
        //$LASTPOS=8002441;//kernel.TQuery:2441
        v = f(o);
        //$LASTPOS=8002461;//kernel.TQuery:2461
        if (res==null||v<res) {
          //$LASTPOS=8002485;//kernel.TQuery:2485
          res=v;
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    push :function _trc_TQuery_push(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=8002531;//kernel.TQuery:2531
      _this[_this.length]=e;
      //$LASTPOS=8002551;//kernel.TQuery:2551
      _this.length++;
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8002531;//kernel.TQuery:2531
      _this[_this.length]=e;
      //$LASTPOS=8002551;//kernel.TQuery:2551
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
      var _it_69;
      
      //$LASTPOS=8002603;//kernel.TQuery:2603
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=8002626;//kernel.TQuery:2626
      _it_69=Tonyu.iterator(_this,1);
      while(_it_69.next()) {
        o=_it_69[0];
        
        //$LASTPOS=8002656;//kernel.TQuery:2656
        if (f(o)) {
          //$LASTPOS=8002666;//kernel.TQuery:2666
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
      var _it_69;
      
      //$LASTPOS=8002603;//kernel.TQuery:2603
      no = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=8002626;//kernel.TQuery:2626
      _it_69=Tonyu.iterator(_this,1);
      while(_it_69.next()) {
        o=_it_69[0];
        
        //$LASTPOS=8002656;//kernel.TQuery:2656
        if (f(o)) {
          //$LASTPOS=8002666;//kernel.TQuery:2666
          no.push(o);
        }
        
      }
      _thread.retVal=no;return;
      
      
      _thread.retVal=_this;return;
    },
    apply :function _trc_TQuery_apply(name,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var o;
      var _it_73;
      var f;
      
      //$LASTPOS=8002727;//kernel.TQuery:2727
      res;
      //$LASTPOS=8002740;//kernel.TQuery:2740
      if (! args) {
        //$LASTPOS=8002751;//kernel.TQuery:2751
        args=[];
      }
      //$LASTPOS=8002764;//kernel.TQuery:2764
      _it_73=Tonyu.iterator(_this,1);
      while(_it_73.next()) {
        o=_it_73[0];
        
        //$LASTPOS=8002794;//kernel.TQuery:2794
        f = o[name];
        //$LASTPOS=8002817;//kernel.TQuery:2817
        if (typeof  f=="function") {
          //$LASTPOS=8002857;//kernel.TQuery:2857
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
      var _it_73;
      var f;
      
      //$LASTPOS=8002727;//kernel.TQuery:2727
      res;
      //$LASTPOS=8002740;//kernel.TQuery:2740
      if (! args) {
        //$LASTPOS=8002751;//kernel.TQuery:2751
        args=[];
      }
      //$LASTPOS=8002764;//kernel.TQuery:2764
      _it_73=Tonyu.iterator(_this,1);
      while(_it_73.next()) {
        o=_it_73[0];
        
        //$LASTPOS=8002794;//kernel.TQuery:2794
        f = o[name];
        //$LASTPOS=8002817;//kernel.TQuery:2817
        if (typeof  f=="function") {
          //$LASTPOS=8002857;//kernel.TQuery:2857
          res=f.apply(o,args);
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    alive :function _trc_TQuery_alive() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.find((function anonymous_2995(o) {
        
        return ! o.isDead();
      }));
    },
    fiber$alive :function _trc_TQuery_f_alive(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_2995(o) {
        
        return ! o.isDead();
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_TQuery_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      
      //$LASTPOS=8003052;//kernel.TQuery:3052
      a = _this.alive();
      //$LASTPOS=8003071;//kernel.TQuery:3071
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=8003106;//kernel.TQuery:3106
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=8003052;//kernel.TQuery:3052
      a = _this.alive();
      //$LASTPOS=8003071;//kernel.TQuery:3071
      if (a.length==0) {
        _thread.retVal=false;return;
        
      }
      //$LASTPOS=8003106;//kernel.TQuery:3106
      a.apply("die");
      _thread.retVal=true;return;
      
      
      _thread.retVal=_this;return;
    },
    klass :function _trc_TQuery_klass(k) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.find((function anonymous_3170(o) {
        
        return o instanceof k;
      }));
    },
    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_3170(o) {
        
        return o instanceof k;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}
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
      
      //$LASTPOS=9000071;//kernel.InputDevice:71
      _this.listeners=[];
      //$LASTPOS=9000090;//kernel.InputDevice:90
      _this.touchEmu=true;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var l;
      
      //$LASTPOS=9000135;//kernel.InputDevice:135
      l = _this.listeners;
      //$LASTPOS=9000157;//kernel.InputDevice:157
      _this.listeners=[];
      //$LASTPOS=9000176;//kernel.InputDevice:176
      while (l.length>0) {
        //$LASTPOS=9000197;//kernel.InputDevice:197
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=9000135;//kernel.InputDevice:135
      l = _this.listeners;
      //$LASTPOS=9000157;//kernel.InputDevice:157
      _this.listeners=[];
      //$LASTPOS=9000176;//kernel.InputDevice:176
      while (l.length>0) {
        //$LASTPOS=9000197;//kernel.InputDevice:197
        (l.shift())();
        
      }
      
      _thread.retVal=_this;return;
    },
    addOnetimeListener :function _trc_InputDevice_addOnetimeListener(l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=9000247;//kernel.InputDevice:247
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000247;//kernel.InputDevice:247
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
      
      //$LASTPOS=9000300;//kernel.InputDevice:300
      cv = cvj[0];
      //$LASTPOS=9000320;//kernel.InputDevice:320
      Tonyu.globals.$handleMouse=(function anonymous_333(e) {
        var p;
        var mp;
        
        //$LASTPOS=9000349;//kernel.InputDevice:349
        p = cvj.offset();
        //$LASTPOS=9000378;//kernel.InputDevice:378
        mp = {x: e.clientX-p.left,y: e.clientY-p.top};
        //$LASTPOS=9000435;//kernel.InputDevice:435
        mp=Tonyu.globals.$Screen.canvas2buf(mp);
        //$LASTPOS=9000471;//kernel.InputDevice:471
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=9000494;//kernel.InputDevice:494
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=9000517;//kernel.InputDevice:517
        if (_this.touchEmu) {
          //$LASTPOS=9000546;//kernel.InputDevice:546
          Tonyu.globals.$touches[0].x=mp.x;
          //$LASTPOS=9000579;//kernel.InputDevice:579
          Tonyu.globals.$touches[0].y=mp.y;
          
        }
        //$LASTPOS=9000619;//kernel.InputDevice:619
        _this.handleListeners();
      });
      //$LASTPOS=9000651;//kernel.InputDevice:651
      Tonyu.globals.$touches=[{},{},{},{},{}];
      //$LASTPOS=9000683;//kernel.InputDevice:683
      Tonyu.globals.$touches.findById=(function anonymous_701(id) {
        var j;
        
        //$LASTPOS=9000718;//kernel.InputDevice:718
        //$LASTPOS=9000723;//kernel.InputDevice:723
        j = 0;
        while(j<Tonyu.globals.$touches.length) {
          {
            //$LASTPOS=9000773;//kernel.InputDevice:773
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
          j++;
        }
      });
      //$LASTPOS=9000883;//kernel.InputDevice:883
      Tonyu.globals.$handleTouch=(function anonymous_896(e) {
        var p;
        var ts;
        var i;
        var src;
        var dst;
        var j;
        
        //$LASTPOS=9000912;//kernel.InputDevice:912
        _this.touchEmu=false;
        //$LASTPOS=9000937;//kernel.InputDevice:937
        p = cvj.offset();
        //$LASTPOS=9000966;//kernel.InputDevice:966
        e.preventDefault();
        //$LASTPOS=9000995;//kernel.InputDevice:995
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=9001043;//kernel.InputDevice:1043
        //$LASTPOS=9001048;//kernel.InputDevice:1048
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=9001093;//kernel.InputDevice:1093
            src = ts[i];
            //$LASTPOS=9001121;//kernel.InputDevice:1121
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=9001177;//kernel.InputDevice:1177
            if (! dst) {
              //$LASTPOS=9001206;//kernel.InputDevice:1206
              //$LASTPOS=9001211;//kernel.InputDevice:1211
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=9001269;//kernel.InputDevice:1269
                  if (! Tonyu.globals.$touches[j].touched) {
                    //$LASTPOS=9001322;//kernel.InputDevice:1322
                    dst=Tonyu.globals.$touches[j];
                    //$LASTPOS=9001364;//kernel.InputDevice:1364
                    dst.identifier=src.identifier;
                    break;
                    
                    
                  }
                }
                j++;
              }
              
            }
            //$LASTPOS=9001497;//kernel.InputDevice:1497
            if (dst) {
              //$LASTPOS=9001525;//kernel.InputDevice:1525
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
              //$LASTPOS=9001586;//kernel.InputDevice:1586
              _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
              //$LASTPOS=9001630;//kernel.InputDevice:1630
              dst.x=_this.mp.x;
              //$LASTPOS=9001659;//kernel.InputDevice:1659
              dst.y=_this.mp.y;
              //$LASTPOS=9001688;//kernel.InputDevice:1688
              if (! dst.touched) {
                //$LASTPOS=9001705;//kernel.InputDevice:1705
                dst.touched=1;
              }
              
            }
          }
          i++;
        }
        //$LASTPOS=9001755;//kernel.InputDevice:1755
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=9001787;//kernel.InputDevice:1787
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=9001819;//kernel.InputDevice:1819
        _this.handleListeners();
      });
      //$LASTPOS=9001851;//kernel.InputDevice:1851
      Tonyu.globals.$handleTouchEnd=(function anonymous_1867(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=9001883;//kernel.InputDevice:1883
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=9001931;//kernel.InputDevice:1931
        //$LASTPOS=9001936;//kernel.InputDevice:1936
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=9001981;//kernel.InputDevice:1981
            src = ts[i];
            //$LASTPOS=9002009;//kernel.InputDevice:2009
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=9002065;//kernel.InputDevice:2065
            if (dst) {
              //$LASTPOS=9002093;//kernel.InputDevice:2093
              dst.touched=0;
              //$LASTPOS=9002125;//kernel.InputDevice:2125
              dst.identifier=- 1;
              
            }
          }
          i++;
        }
        //$LASTPOS=9002179;//kernel.InputDevice:2179
        _this.handleListeners();
      });
      //$LASTPOS=9002211;//kernel.InputDevice:2211
      handleMouse = (function anonymous_2227(e) {
        
        //$LASTPOS=9002232;//kernel.InputDevice:2232
        Tonyu.globals.$handleMouse(e);
      });
      //$LASTPOS=9002256;//kernel.InputDevice:2256
      handleTouch = (function anonymous_2272(e) {
        
        //$LASTPOS=9002277;//kernel.InputDevice:2277
        Tonyu.globals.$handleTouch(e);
      });
      //$LASTPOS=9002301;//kernel.InputDevice:2301
      handleTouchEnd = (function anonymous_2320(e) {
        
        //$LASTPOS=9002325;//kernel.InputDevice:2325
        Tonyu.globals.$handleTouchEnd(e);
      });
      //$LASTPOS=9002352;//kernel.InputDevice:2352
      d = $.data(cv,"events");
      //$LASTPOS=9002384;//kernel.InputDevice:2384
      if (! d) {
        //$LASTPOS=9002403;//kernel.InputDevice:2403
        $.data(cv,"events","true");
        //$LASTPOS=9002440;//kernel.InputDevice:2440
        cvj.mousedown(handleMouse);
        //$LASTPOS=9002477;//kernel.InputDevice:2477
        cvj.mousemove(handleMouse);
        //$LASTPOS=9002514;//kernel.InputDevice:2514
        cvj.on("touchstart",handleTouch);
        //$LASTPOS=9002557;//kernel.InputDevice:2557
        cvj.on("touchmove",handleTouch);
        //$LASTPOS=9002599;//kernel.InputDevice:2599
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
      
      //$LASTPOS=9000300;//kernel.InputDevice:300
      cv = cvj[0];
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000320;//kernel.InputDevice:320
            Tonyu.globals.$handleMouse=(function anonymous_333(e) {
              var p;
              var mp;
              
              //$LASTPOS=9000349;//kernel.InputDevice:349
              p = cvj.offset();
              //$LASTPOS=9000378;//kernel.InputDevice:378
              mp = {x: e.clientX-p.left,y: e.clientY-p.top};
              //$LASTPOS=9000435;//kernel.InputDevice:435
              mp=Tonyu.globals.$Screen.canvas2buf(mp);
              //$LASTPOS=9000471;//kernel.InputDevice:471
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=9000494;//kernel.InputDevice:494
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=9000517;//kernel.InputDevice:517
              if (_this.touchEmu) {
                //$LASTPOS=9000546;//kernel.InputDevice:546
                Tonyu.globals.$touches[0].x=mp.x;
                //$LASTPOS=9000579;//kernel.InputDevice:579
                Tonyu.globals.$touches[0].y=mp.y;
                
              }
              //$LASTPOS=9000619;//kernel.InputDevice:619
              _this.handleListeners();
            });
            //$LASTPOS=9000651;//kernel.InputDevice:651
            Tonyu.globals.$touches=[{},{},{},{},{}];
            //$LASTPOS=9000683;//kernel.InputDevice:683
            Tonyu.globals.$touches.findById=(function anonymous_701(id) {
              var j;
              
              //$LASTPOS=9000718;//kernel.InputDevice:718
              //$LASTPOS=9000723;//kernel.InputDevice:723
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=9000773;//kernel.InputDevice:773
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
                j++;
              }
            });
            //$LASTPOS=9000883;//kernel.InputDevice:883
            Tonyu.globals.$handleTouch=(function anonymous_896(e) {
              var p;
              var ts;
              var i;
              var src;
              var dst;
              var j;
              
              //$LASTPOS=9000912;//kernel.InputDevice:912
              _this.touchEmu=false;
              //$LASTPOS=9000937;//kernel.InputDevice:937
              p = cvj.offset();
              //$LASTPOS=9000966;//kernel.InputDevice:966
              e.preventDefault();
              //$LASTPOS=9000995;//kernel.InputDevice:995
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=9001043;//kernel.InputDevice:1043
              //$LASTPOS=9001048;//kernel.InputDevice:1048
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=9001093;//kernel.InputDevice:1093
                  src = ts[i];
                  //$LASTPOS=9001121;//kernel.InputDevice:1121
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=9001177;//kernel.InputDevice:1177
                  if (! dst) {
                    //$LASTPOS=9001206;//kernel.InputDevice:1206
                    //$LASTPOS=9001211;//kernel.InputDevice:1211
                    j = 0;
                    while(j<Tonyu.globals.$touches.length) {
                      {
                        //$LASTPOS=9001269;//kernel.InputDevice:1269
                        if (! Tonyu.globals.$touches[j].touched) {
                          //$LASTPOS=9001322;//kernel.InputDevice:1322
                          dst=Tonyu.globals.$touches[j];
                          //$LASTPOS=9001364;//kernel.InputDevice:1364
                          dst.identifier=src.identifier;
                          break;
                          
                          
                        }
                      }
                      j++;
                    }
                    
                  }
                  //$LASTPOS=9001497;//kernel.InputDevice:1497
                  if (dst) {
                    //$LASTPOS=9001525;//kernel.InputDevice:1525
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                    //$LASTPOS=9001586;//kernel.InputDevice:1586
                    _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                    //$LASTPOS=9001630;//kernel.InputDevice:1630
                    dst.x=_this.mp.x;
                    //$LASTPOS=9001659;//kernel.InputDevice:1659
                    dst.y=_this.mp.y;
                    //$LASTPOS=9001688;//kernel.InputDevice:1688
                    if (! dst.touched) {
                      //$LASTPOS=9001705;//kernel.InputDevice:1705
                      dst.touched=1;
                    }
                    
                  }
                }
                i++;
              }
              //$LASTPOS=9001755;//kernel.InputDevice:1755
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=9001787;//kernel.InputDevice:1787
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=9001819;//kernel.InputDevice:1819
              _this.handleListeners();
            });
            //$LASTPOS=9001851;//kernel.InputDevice:1851
            Tonyu.globals.$handleTouchEnd=(function anonymous_1867(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=9001883;//kernel.InputDevice:1883
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=9001931;//kernel.InputDevice:1931
              //$LASTPOS=9001936;//kernel.InputDevice:1936
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=9001981;//kernel.InputDevice:1981
                  src = ts[i];
                  //$LASTPOS=9002009;//kernel.InputDevice:2009
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=9002065;//kernel.InputDevice:2065
                  if (dst) {
                    //$LASTPOS=9002093;//kernel.InputDevice:2093
                    dst.touched=0;
                    //$LASTPOS=9002125;//kernel.InputDevice:2125
                    dst.identifier=- 1;
                    
                  }
                }
                i++;
              }
              //$LASTPOS=9002179;//kernel.InputDevice:2179
              _this.handleListeners();
            });
            //$LASTPOS=9002211;//kernel.InputDevice:2211
            handleMouse = (function anonymous_2227(e) {
              
              //$LASTPOS=9002232;//kernel.InputDevice:2232
              Tonyu.globals.$handleMouse(e);
            });
            //$LASTPOS=9002256;//kernel.InputDevice:2256
            handleTouch = (function anonymous_2272(e) {
              
              //$LASTPOS=9002277;//kernel.InputDevice:2277
              Tonyu.globals.$handleTouch(e);
            });
            //$LASTPOS=9002301;//kernel.InputDevice:2301
            handleTouchEnd = (function anonymous_2320(e) {
              
              //$LASTPOS=9002325;//kernel.InputDevice:2325
              Tonyu.globals.$handleTouchEnd(e);
            });
            //$LASTPOS=9002352;//kernel.InputDevice:2352
            d = $.data(cv,"events");
            //$LASTPOS=9002384;//kernel.InputDevice:2384
            if (! d) {
              //$LASTPOS=9002403;//kernel.InputDevice:2403
              $.data(cv,"events","true");
              //$LASTPOS=9002440;//kernel.InputDevice:2440
              cvj.mousedown(handleMouse);
              //$LASTPOS=9002477;//kernel.InputDevice:2477
              cvj.mousemove(handleMouse);
              //$LASTPOS=9002514;//kernel.InputDevice:2514
              cvj.on("touchstart",handleTouch);
              //$LASTPOS=9002557;//kernel.InputDevice:2557
              cvj.on("touchmove",handleTouch);
              //$LASTPOS=9002599;//kernel.InputDevice:2599
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
      var _it_107;
      
      //$LASTPOS=9002664;//kernel.InputDevice:2664
      _it_107=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_107.next()) {
        i=_it_107[0];
        
        //$LASTPOS=9002699;//kernel.InputDevice:2699
        if (i.touched>0) {
          //$LASTPOS=9002717;//kernel.InputDevice:2717
          i.touched++;
          
        }
        //$LASTPOS=9002740;//kernel.InputDevice:2740
        if (i.touched==- 1) {
          //$LASTPOS=9002759;//kernel.InputDevice:2759
          i.touched=1;
        }
        
      }
    },
    fiber$update :function _trc_InputDevice_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_107;
      
      //$LASTPOS=9002664;//kernel.InputDevice:2664
      _it_107=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_107.next()) {
        i=_it_107[0];
        
        //$LASTPOS=9002699;//kernel.InputDevice:2699
        if (i.touched>0) {
          //$LASTPOS=9002717;//kernel.InputDevice:2717
          i.touched++;
          
        }
        //$LASTPOS=9002740;//kernel.InputDevice:2740
        if (i.touched==- 1) {
          //$LASTPOS=9002759;//kernel.InputDevice:2759
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
      
      //$LASTPOS=10000084;//kernel.Keys:84
      _this.stats={};
      //$LASTPOS=10000094;//kernel.Keys:94
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=10000212;//kernel.Keys:212
      //$LASTPOS=10000217;//kernel.Keys:217
      i = 65;
      while(i<65+26) {
        {
          //$LASTPOS=10000248;//kernel.Keys:248
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
        i++;
      }
      //$LASTPOS=10000297;//kernel.Keys:297
      //$LASTPOS=10000302;//kernel.Keys:302
      i = 48;
      while(i<58) {
        {
          //$LASTPOS=10000330;//kernel.Keys:330
          _this.codes[String.fromCharCode(i)]=i;
        }
        i++;
      }
      //$LASTPOS=10000365;//kernel.Keys:365
      if (! $.data(document,"key_event")) {
        //$LASTPOS=10000406;//kernel.Keys:406
        $.data(document,"key_event",true);
        //$LASTPOS=10000445;//kernel.Keys:445
        $(document).keydown((function anonymous_465(e) {
          
          //$LASTPOS=10000471;//kernel.Keys:471
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=10000495;//kernel.Keys:495
        $(document).keyup((function anonymous_513(e) {
          
          //$LASTPOS=10000519;//kernel.Keys:519
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=10000541;//kernel.Keys:541
        $(document).mousedown((function anonymous_563(e) {
          
          //$LASTPOS=10000578;//kernel.Keys:578
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=10000619;//kernel.Keys:619
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=10000660;//kernel.Keys:660
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=10000697;//kernel.Keys:697
        $(document).mouseup((function anonymous_717(e) {
          
          //$LASTPOS=10000732;//kernel.Keys:732
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=10000773;//kernel.Keys:773
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=10000814;//kernel.Keys:814
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
    },
    fiber$main :function _trc_Keys_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=10000084;//kernel.Keys:84
      _this.stats={};
      //$LASTPOS=10000094;//kernel.Keys:94
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=10000212;//kernel.Keys:212
      //$LASTPOS=10000217;//kernel.Keys:217
      i = 65;
      while(i<65+26) {
        {
          //$LASTPOS=10000248;//kernel.Keys:248
          _this.codes[String.fromCharCode(i).toLowerCase()]=i;
        }
        i++;
      }
      //$LASTPOS=10000297;//kernel.Keys:297
      //$LASTPOS=10000302;//kernel.Keys:302
      i = 48;
      while(i<58) {
        {
          //$LASTPOS=10000330;//kernel.Keys:330
          _this.codes[String.fromCharCode(i)]=i;
        }
        i++;
      }
      //$LASTPOS=10000365;//kernel.Keys:365
      if (! $.data(document,"key_event")) {
        //$LASTPOS=10000406;//kernel.Keys:406
        $.data(document,"key_event",true);
        //$LASTPOS=10000445;//kernel.Keys:445
        $(document).keydown((function anonymous_465(e) {
          
          //$LASTPOS=10000471;//kernel.Keys:471
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=10000495;//kernel.Keys:495
        $(document).keyup((function anonymous_513(e) {
          
          //$LASTPOS=10000519;//kernel.Keys:519
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=10000541;//kernel.Keys:541
        $(document).mousedown((function anonymous_563(e) {
          
          //$LASTPOS=10000578;//kernel.Keys:578
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=10000619;//kernel.Keys:619
            Tonyu.globals.$touches[0].touched=1;
            
          }
          //$LASTPOS=10000660;//kernel.Keys:660
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=10000697;//kernel.Keys:697
        $(document).mouseup((function anonymous_717(e) {
          
          //$LASTPOS=10000732;//kernel.Keys:732
          if (Tonyu.globals.$InputDevice.touchEmu) {
            //$LASTPOS=10000773;//kernel.Keys:773
            Tonyu.globals.$touches[0].touched=0;
            
          }
          //$LASTPOS=10000814;//kernel.Keys:814
          Tonyu.globals.$Keys.keyup({keyCode: 1});
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000875;//kernel.Keys:875
      if (typeof  code=="string") {
        //$LASTPOS=10000912;//kernel.Keys:912
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=10000954;//kernel.Keys:954
      if (! code) {
        return 0;
      }
      //$LASTPOS=10000979;//kernel.Keys:979
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=10001014;//kernel.Keys:1014
      if (! _this.stats[code]) {
        //$LASTPOS=10001032;//kernel.Keys:1032
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000875;//kernel.Keys:875
      if (typeof  code=="string") {
        //$LASTPOS=10000912;//kernel.Keys:912
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=10000954;//kernel.Keys:954
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=10000979;//kernel.Keys:979
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=10001014;//kernel.Keys:1014
      if (! _this.stats[code]) {
        //$LASTPOS=10001032;//kernel.Keys:1032
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var _it_115;
      
      //$LASTPOS=10001097;//kernel.Keys:1097
      _it_115=Tonyu.iterator(_this.stats,1);
      while(_it_115.next()) {
        i=_it_115[0];
        
        //$LASTPOS=10001128;//kernel.Keys:1128
        if (_this.stats[i]>0) {
          //$LASTPOS=10001145;//kernel.Keys:1145
          _this.stats[i]++;
          
        }
        //$LASTPOS=10001166;//kernel.Keys:1166
        if (_this.stats[i]==- 1) {
          //$LASTPOS=10001184;//kernel.Keys:1184
          _this.stats[i]=1;
        }
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_115;
      
      //$LASTPOS=10001097;//kernel.Keys:1097
      _it_115=Tonyu.iterator(_this.stats,1);
      while(_it_115.next()) {
        i=_it_115[0];
        
        //$LASTPOS=10001128;//kernel.Keys:1128
        if (_this.stats[i]>0) {
          //$LASTPOS=10001145;//kernel.Keys:1145
          _this.stats[i]++;
          
        }
        //$LASTPOS=10001166;//kernel.Keys:1166
        if (_this.stats[i]==- 1) {
          //$LASTPOS=10001184;//kernel.Keys:1184
          _this.stats[i]=1;
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var s;
      
      //$LASTPOS=10001222;//kernel.Keys:1222
      s = _this.stats[e.keyCode];
      //$LASTPOS=10001250;//kernel.Keys:1250
      if (! s) {
        //$LASTPOS=10001268;//kernel.Keys:1268
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=10001298;//kernel.Keys:1298
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=10001222;//kernel.Keys:1222
      s = _this.stats[e.keyCode];
      //$LASTPOS=10001250;//kernel.Keys:1250
      if (! s) {
        //$LASTPOS=10001268;//kernel.Keys:1268
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=10001298;//kernel.Keys:1298
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10001348;//kernel.Keys:1348
      _this.stats[e.keyCode]=0;
      //$LASTPOS=10001372;//kernel.Keys:1372
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10001348;//kernel.Keys:1348
      _this.stats[e.keyCode]=0;
      //$LASTPOS=10001372;//kernel.Keys:1372
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
  includes: [Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod],
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
      
      //$LASTPOS=11000227;//kernel.BaseActor:227
      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      //$LASTPOS=11000272;//kernel.BaseActor:272
      _this.registerEventHandler("screenOut",new Tonyu.classes.kernel.ScreenOutHandler);
      //$LASTPOS=11000342;//kernel.BaseActor:342
      if (typeof  x=="object") {
        //$LASTPOS=11000366;//kernel.BaseActor:366
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=11000398;//kernel.BaseActor:398
        if (typeof  x=="number") {
          //$LASTPOS=11000433;//kernel.BaseActor:433
          _this.x=x;
          //$LASTPOS=11000452;//kernel.BaseActor:452
          _this.y=y;
          //$LASTPOS=11000471;//kernel.BaseActor:471
          _this.p=p;
          
        }
      }
      //$LASTPOS=11000493;//kernel.BaseActor:493
      if (_this.scaleX==null) {
        //$LASTPOS=11000511;//kernel.BaseActor:511
        _this.scaleX=1;
      }
      //$LASTPOS=11000526;//kernel.BaseActor:526
      if (_this.rotation==null) {
        //$LASTPOS=11000546;//kernel.BaseActor:546
        _this.rotation=0;
      }
      //$LASTPOS=11000563;//kernel.BaseActor:563
      if (_this.rotate==null) {
        //$LASTPOS=11000581;//kernel.BaseActor:581
        _this.rotate=0;
      }
      //$LASTPOS=11000596;//kernel.BaseActor:596
      if (_this.alpha==null) {
        //$LASTPOS=11000613;//kernel.BaseActor:613
        _this.alpha=255;
      }
      //$LASTPOS=11000629;//kernel.BaseActor:629
      if (_this.zOrder==null) {
        //$LASTPOS=11000647;//kernel.BaseActor:647
        _this.zOrder=0;
      }
      //$LASTPOS=11000662;//kernel.BaseActor:662
      if (_this.age==null) {
        //$LASTPOS=11000677;//kernel.BaseActor:677
        _this.age=0;
      }
      //$LASTPOS=11000689;//kernel.BaseActor:689
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=11000740;//kernel.BaseActor:740
        _this.animMode=true;
        //$LASTPOS=11000764;//kernel.BaseActor:764
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=11000798;//kernel.BaseActor:798
        _this.animMode=false;
        
      }
      //$LASTPOS=11000826;//kernel.BaseActor:826
      if (_this.animFps==null) {
        //$LASTPOS=11000845;//kernel.BaseActor:845
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
      
      //$LASTPOS=11000949;//kernel.BaseActor:949
      console.log.apply(console,arguments);
      //$LASTPOS=11000992;//kernel.BaseActor:992
      mergedArg = "";
      //$LASTPOS=11001015;//kernel.BaseActor:1015
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=11001043;//kernel.BaseActor:1043
        //$LASTPOS=11001047;//kernel.BaseActor:1047
        argCount = 0;
        while(argCount<arguments.length) {
          {
            //$LASTPOS=11001114;//kernel.BaseActor:1114
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
          argCount++;
        }
        //$LASTPOS=11001179;//kernel.BaseActor:1179
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=11001218;//kernel.BaseActor:1218
        //$LASTPOS=11001222;//kernel.BaseActor:1222
        printCount = 0;
        while(printCount<_this.splits.length) {
          {
            //$LASTPOS=11001292;//kernel.BaseActor:1292
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=11001333;//kernel.BaseActor:1333
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=11001383;//kernel.BaseActor:1383
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
          printCount++;
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001506;//kernel.BaseActor:1506
      _this.animFps=f;
      //$LASTPOS=11001527;//kernel.BaseActor:1527
      _this.animFrame=0;
      //$LASTPOS=11001550;//kernel.BaseActor:1550
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001600;//kernel.BaseActor:1600
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001649;//kernel.BaseActor:1649
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001691;//kernel.BaseActor:1691
      _this.onUpdate();
      //$LASTPOS=11001708;//kernel.BaseActor:1708
      if (null) {
        //$LASTPOS=11001731;//kernel.BaseActor:1731
        null.suspend();
        //$LASTPOS=11001759;//kernel.BaseActor:1759
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=11001775;//kernel.BaseActor:1775
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11001691;//kernel.BaseActor:1691
      _this.onUpdate();
      //$LASTPOS=11001708;//kernel.BaseActor:1708
      if (_thread) {
        //$LASTPOS=11001731;//kernel.BaseActor:1731
        _thread.suspend();
        //$LASTPOS=11001759;//kernel.BaseActor:1759
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=11001775;//kernel.BaseActor:1775
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
      
      //$LASTPOS=11001869;//kernel.BaseActor:1869
      //$LASTPOS=11001873;//kernel.BaseActor:1873
      updateCount = 0;
      while(updateCount<updateT) {
        {
          //$LASTPOS=11001936;//kernel.BaseActor:1936
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
            //$LASTPOS=11001869;//kernel.BaseActor:1869
            //$LASTPOS=11001873;//kernel.BaseActor:1873
            updateCount = 0;;
          case 1:
            if (!(updateCount<updateT)) { __pc=3; break; }
            //$LASTPOS=11001936;//kernel.BaseActor:1936
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
      
      //$LASTPOS=11002079;//kernel.BaseActor:2079
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=11002104;//kernel.BaseActor:2104
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2129(s) {
        
        //$LASTPOS=11002145;//kernel.BaseActor:2145
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=11002176;//kernel.BaseActor:2176
        if (! c||s instanceof c) {
          //$LASTPOS=11002217;//kernel.BaseActor:2217
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
      
      //$LASTPOS=11002324;//kernel.BaseActor:2324
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=11002349;//kernel.BaseActor:2349
      sp = _this;
      //$LASTPOS=11002386;//kernel.BaseActor:2386
      t1 = _this.getCrashRect();
      //$LASTPOS=11002414;//kernel.BaseActor:2414
      if (! t1) {
        return res;
      }
      //$LASTPOS=11002440;//kernel.BaseActor:2440
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2465(s) {
        var t2;
        
        //$LASTPOS=11002481;//kernel.BaseActor:2481
        t2;
        //$LASTPOS=11002498;//kernel.BaseActor:2498
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=11002724;//kernel.BaseActor:2724
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11002804;//kernel.BaseActor:2804
      if (! t) {
        return false;
      }
      //$LASTPOS=11002831;//kernel.BaseActor:2831
      if (typeof  t=="function") {
        return _this.allCrash(t)[0];
        
      }
      return _this.crashTo1(t);
    },
    crashTo1 :function _trc_BaseActor_crashTo1(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t1;
      var t2;
      
      //$LASTPOS=11002954;//kernel.BaseActor:2954
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=11003082;//kernel.BaseActor:3082
      t1 = _this.getCrashRect();
      //$LASTPOS=11003110;//kernel.BaseActor:3110
      t2 = t.getCrashRect();
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    getCrashRect :function _trc_BaseActor_getCrashRect() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var actWidth;
      var actHeight;
      
      //$LASTPOS=11003422;//kernel.BaseActor:3422
      actWidth = _this.width*_this.scaleX;actHeight;
      //$LASTPOS=11003465;//kernel.BaseActor:3465
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=11003507;//kernel.BaseActor:3507
        actHeight=_this.height*_this.scaleX;
        
      } else {
        //$LASTPOS=11003553;//kernel.BaseActor:3553
        actHeight=_this.height*_this.scaleY;
        
      }
      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
    },
    allWithin :function _trc_BaseActor_allWithin(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=11003794;//kernel.BaseActor:3794
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=11003819;//kernel.BaseActor:3819
      sp = _this;
      //$LASTPOS=11003856;//kernel.BaseActor:3856
      t1 = _this.getCrashRect();
      //$LASTPOS=11003884;//kernel.BaseActor:3884
      if (! t1) {
        return res;
      }
      //$LASTPOS=11003910;//kernel.BaseActor:3910
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_3935(s) {
        var t2;
        
        //$LASTPOS=11003951;//kernel.BaseActor:3951
        t2;
        //$LASTPOS=11003968;//kernel.BaseActor:3968
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=11004153;//kernel.BaseActor:4153
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11004244;//kernel.BaseActor:4244
      if (! t) {
        return false;
      }
      //$LASTPOS=11004270;//kernel.BaseActor:4270
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11004416;//kernel.BaseActor:4416
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=11004455;//kernel.BaseActor:4455
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    watchHit :function _trc_BaseActor_watchHit(typeA,typeB,onHit) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11004640;//kernel.BaseActor:4640
      Tonyu.globals.$Sprites.watchHit(typeA,typeB,(function anonymous_4673(a,b) {
        
        //$LASTPOS=11004691;//kernel.BaseActor:4691
        onHit.apply(_this,[a,b]);
      }));
    },
    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.globals.$Scheduler;
    },
    die :function _trc_BaseActor_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11004845;//kernel.BaseActor:4845
      _this.killThreadGroup();
      //$LASTPOS=11004917;//kernel.BaseActor:4917
      _this.hide();
      //$LASTPOS=11004930;//kernel.BaseActor:4930
      _this.fireEvent("die");
      //$LASTPOS=11004953;//kernel.BaseActor:4953
      _this._isDead=true;
    },
    hide :function _trc_BaseActor_hide() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11005132;//kernel.BaseActor:5132
      if (_this.layer&&typeof  _this.layer.remove=="function") {
        //$LASTPOS=11005187;//kernel.BaseActor:5187
        _this.layer.remove(_this);
        
      } else {
        //$LASTPOS=11005228;//kernel.BaseActor:5228
        Tonyu.globals.$Sprites.remove(_this);
        
      }
    },
    show :function _trc_BaseActor_show(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11005289;//kernel.BaseActor:5289
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=11005341;//kernel.BaseActor:5341
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=11005379;//kernel.BaseActor:5379
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=11005411;//kernel.BaseActor:5411
      if (x!=null) {
        //$LASTPOS=11005424;//kernel.BaseActor:5424
        _this.x=x;
      }
      //$LASTPOS=11005439;//kernel.BaseActor:5439
      if (y!=null) {
        //$LASTPOS=11005452;//kernel.BaseActor:5452
        _this.y=y;
      }
      //$LASTPOS=11005467;//kernel.BaseActor:5467
      if (p!=null) {
        //$LASTPOS=11005480;//kernel.BaseActor:5480
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11005525;//kernel.BaseActor:5525
      if (typeof  _this.p!="number") {
        //$LASTPOS=11005560;//kernel.BaseActor:5560
        if (_this.text!=null) {
          return _this;
        }
        //$LASTPOS=11005593;//kernel.BaseActor:5593
        _this.p=0;
        
      }
      //$LASTPOS=11005610;//kernel.BaseActor:5610
      _this.p=Math.floor(_this.p);
      //$LASTPOS=11005632;//kernel.BaseActor:5632
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
      //$LASTPOS=11005670;//kernel.BaseActor:5670
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=11005694;//kernel.BaseActor:5694
      _this.width=_this.pImg.width;
      //$LASTPOS=11005717;//kernel.BaseActor:5717
      _this.height=_this.pImg.height;
    },
    waitFor :function _trc_BaseActor_waitFor(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11005760;//kernel.BaseActor:5760
      if (null) {
        //$LASTPOS=11005784;//kernel.BaseActor:5784
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_BaseActor_f_waitFor(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11005760;//kernel.BaseActor:5760
      if (_thread) {
        //$LASTPOS=11005784;//kernel.BaseActor:5784
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
      
      //$LASTPOS=11005904;//kernel.BaseActor:5904
      _this.age++;
      //$LASTPOS=11005916;//kernel.BaseActor:5916
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=11005957;//kernel.BaseActor:5957
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=11005997;//kernel.BaseActor:5997
        _this.animFrame++;
        
      }
    },
    draw :function _trc_BaseActor_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=11006046;//kernel.BaseActor:6046
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=11006099;//kernel.BaseActor:6099
      _this.detectShape();
      //$LASTPOS=11006119;//kernel.BaseActor:6119
      if (_this.pImg) {
        //$LASTPOS=11006140;//kernel.BaseActor:6140
        ctx.save();
        //$LASTPOS=11006161;//kernel.BaseActor:6161
        ctx.translate(_this.x,_this.y);
        //$LASTPOS=11006305;//kernel.BaseActor:6305
        _this.animation();
        //$LASTPOS=11006327;//kernel.BaseActor:6327
        if (_this.rotation!=0) {
          //$LASTPOS=11006362;//kernel.BaseActor:6362
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=11006430;//kernel.BaseActor:6430
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=11006487;//kernel.BaseActor:6487
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=11006539;//kernel.BaseActor:6539
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=11006604;//kernel.BaseActor:6604
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=11006660;//kernel.BaseActor:6660
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=11006701;//kernel.BaseActor:6701
        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=11006833;//kernel.BaseActor:6833
        ctx.restore();
        
      } else {
        //$LASTPOS=11006860;//kernel.BaseActor:6860
        if (_this.text!==null&&_this.text!==undefined) {
          //$LASTPOS=11006908;//kernel.BaseActor:6908
          splitsText = (_this.text+"").split("\n");
          //$LASTPOS=11006955;//kernel.BaseActor:6955
          _this.drawY=_this.y;
          //$LASTPOS=11006973;//kernel.BaseActor:6973
          if (! _this.size) {
            //$LASTPOS=11006984;//kernel.BaseActor:6984
            _this.size=15;
          }
          //$LASTPOS=11007002;//kernel.BaseActor:7002
          if (! _this.align) {
            //$LASTPOS=11007014;//kernel.BaseActor:7014
            _this.align="center";
          }
          //$LASTPOS=11007039;//kernel.BaseActor:7039
          if (! _this.fillStyle) {
            //$LASTPOS=11007055;//kernel.BaseActor:7055
            _this.fillStyle="white";
          }
          //$LASTPOS=11007083;//kernel.BaseActor:7083
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=11007117;//kernel.BaseActor:7117
          ctx.globalAlpha=_this.alpha/255;
          //$LASTPOS=11007158;//kernel.BaseActor:7158
          _this.height=0;
          //$LASTPOS=11007167;//kernel.BaseActor:7167
          _this.width=0;
          //$LASTPOS=11007185;//kernel.BaseActor:7185
          //$LASTPOS=11007189;//kernel.BaseActor:7189
          textCount = 0;
          while(textCount<splitsText.length) {
            {
              //$LASTPOS=11007260;//kernel.BaseActor:7260
              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
              //$LASTPOS=11007356;//kernel.BaseActor:7356
              if (_this.width<rect.w) {
                //$LASTPOS=11007373;//kernel.BaseActor:7373
                _this.width=rect.w;
              }
              //$LASTPOS=11007400;//kernel.BaseActor:7400
              _this.height+=rect.h;
              //$LASTPOS=11007429;//kernel.BaseActor:7429
              _this.drawY+=_this.size;
            }
            textCount++;
          }
          
        }
      }
      //$LASTPOS=11007465;//kernel.BaseActor:7465
      if (_this._fukidashi) {
        //$LASTPOS=11007492;//kernel.BaseActor:7492
        if (_this._fukidashi.c>0) {
          //$LASTPOS=11007527;//kernel.BaseActor:7527
          _this._fukidashi.c--;
          //$LASTPOS=11007556;//kernel.BaseActor:7556
          ctx.fillStyle="white";
          //$LASTPOS=11007592;//kernel.BaseActor:7592
          ctx.strokeStyle="black";
          //$LASTPOS=11007630;//kernel.BaseActor:7630
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
      
      //$LASTPOS=11007833;//kernel.BaseActor:7833
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=11007905;//kernel.BaseActor:7905
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11007833;//kernel.BaseActor:7833
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=11007905;//kernel.BaseActor:7905
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=11007987;//kernel.BaseActor:7987
      if (! a) {
        //$LASTPOS=11007995;//kernel.BaseActor:7995
        a=0;
      }
      //$LASTPOS=11008005;//kernel.BaseActor:8005
      r = 0;
      //$LASTPOS=11008019;//kernel.BaseActor:8019
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=11008065;//kernel.BaseActor:8065
      if (_this.x<viewX+a) {
        //$LASTPOS=11008094;//kernel.BaseActor:8094
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=11008113;//kernel.BaseActor:8113
      if (_this.y<viewY+a) {
        //$LASTPOS=11008142;//kernel.BaseActor:8142
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=11008161;//kernel.BaseActor:8161
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=11008190;//kernel.BaseActor:8190
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=11008225;//kernel.BaseActor:8225
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=11008254;//kernel.BaseActor:8254
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
      
      //$LASTPOS=11007987;//kernel.BaseActor:7987
      if (! a) {
        //$LASTPOS=11007995;//kernel.BaseActor:7995
        a=0;
      }
      //$LASTPOS=11008005;//kernel.BaseActor:8005
      r = 0;
      //$LASTPOS=11008019;//kernel.BaseActor:8019
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=11008065;//kernel.BaseActor:8065
      if (_this.x<viewX+a) {
        //$LASTPOS=11008094;//kernel.BaseActor:8094
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=11008113;//kernel.BaseActor:8113
      if (_this.y<viewY+a) {
        //$LASTPOS=11008142;//kernel.BaseActor:8142
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=11008161;//kernel.BaseActor:8161
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=11008190;//kernel.BaseActor:8190
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=11008225;//kernel.BaseActor:8225
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=11008254;//kernel.BaseActor:8254
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      _thread.retVal=r;return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11008384;//kernel.BaseActor:8384
      while (true) {
        //$LASTPOS=11008406;//kernel.BaseActor:8406
        while (true) {
          //$LASTPOS=11008432;//kernel.BaseActor:8432
          if (_this.screenOut()>d) {
            //$LASTPOS=11008468;//kernel.BaseActor:8468
            f();
            break;
            
            
          }
          //$LASTPOS=11008525;//kernel.BaseActor:8525
          _this.update();
          
        }
        //$LASTPOS=11008555;//kernel.BaseActor:8555
        while (true) {
          //$LASTPOS=11008581;//kernel.BaseActor:8581
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=11008653;//kernel.BaseActor:8653
          _this.update();
          
        }
        //$LASTPOS=11008683;//kernel.BaseActor:8683
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
            //$LASTPOS=11008384;//kernel.BaseActor:8384
          case 1:
            //$LASTPOS=11008406;//kernel.BaseActor:8406
          case 2:
            //$LASTPOS=11008432;//kernel.BaseActor:8432
            if (!(_this.screenOut()>d)) { __pc=3; break; }
            //$LASTPOS=11008468;//kernel.BaseActor:8468
            f();
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=11008525;//kernel.BaseActor:8525
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=11008555;//kernel.BaseActor:8555
          case 6:
            //$LASTPOS=11008581;//kernel.BaseActor:8581
            if (!(_this.screenOut()<=d)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=11008653;//kernel.BaseActor:8653
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=11008683;//kernel.BaseActor:8683
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
      
      //$LASTPOS=11008723;//kernel.BaseActor:8723
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=11008765;//kernel.BaseActor:8765
      files = d.rel("files/");
      return FS.get(files.rel(path),{topDir: d});
    },
    fiber$file :function _trc_BaseActor_f_file(_thread,path) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var files;
      
      //$LASTPOS=11008723;//kernel.BaseActor:8723
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=11008765;//kernel.BaseActor:8765
      files = d.rel("files/");
      _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11008872;//kernel.BaseActor:8872
      if (fl!==false) {
        //$LASTPOS=11008899;//kernel.BaseActor:8899
        if (! _this.origTG) {
          
          
        }
        //$LASTPOS=11009051;//kernel.BaseActor:9051
        _this.a=_this.asyncResult();
        //$LASTPOS=11009077;//kernel.BaseActor:9077
        Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
        //$LASTPOS=11009131;//kernel.BaseActor:9131
        _this.waitFor(_this.a);
        
      } else {
        //$LASTPOS=11009166;//kernel.BaseActor:9166
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
            //$LASTPOS=11008872;//kernel.BaseActor:8872
            if (!(fl!==false)) { __pc=3; break; }
            //$LASTPOS=11008899;//kernel.BaseActor:8899
            if (!(! _this.origTG)) { __pc=1; break; }
            {
              //$LASTPOS=11008953;//kernel.BaseActor:8953
              _this.origTG=_thread.group;
              //$LASTPOS=11008992;//kernel.BaseActor:8992
              _thread.setGroup(null);
            }
          case 1:
            
            //$LASTPOS=11009051;//kernel.BaseActor:9051
            _this.a=_this.asyncResult();
            //$LASTPOS=11009077;//kernel.BaseActor:9077
            Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
            //$LASTPOS=11009131;//kernel.BaseActor:9131
            _this.fiber$waitFor(_thread, _this.a);
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            //$LASTPOS=11009166;//kernel.BaseActor:9166
            if (!(_this.origTG)) { __pc=4; break; }
            {
              //$LASTPOS=11009219;//kernel.BaseActor:9219
              _thread.setGroup(_this.origTG);
              //$LASTPOS=11009262;//kernel.BaseActor:9262
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
      
      //$LASTPOS=11009335;//kernel.BaseActor:9335
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=11009371;//kernel.BaseActor:9371
      Tonyu.globals.$Screen.draw();
    },
    fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11009335;//kernel.BaseActor:9335
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=11009371;//kernel.BaseActor:9371
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
      
      //$LASTPOS=11010080;//kernel.BaseActor:10080
      _this.all().die();
      //$LASTPOS=11010098;//kernel.BaseActor:10098
      new page(arg);
      //$LASTPOS=11010118;//kernel.BaseActor:10118
      _this.die();
    },
    fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11010080;//kernel.BaseActor:10080
      _this.all().die();
      //$LASTPOS=11010098;//kernel.BaseActor:10098
      new page(arg);
      //$LASTPOS=11010118;//kernel.BaseActor:10118
      _this.die();
      
      _thread.retVal=_this;return;
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11010153;//kernel.BaseActor:10153
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11010153;//kernel.BaseActor:10153
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
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false},"appear":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.EventHandler',
  shortName: 'EventHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_EventHandler_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=12000035;//kernel.EventHandler:35
      if (Tonyu.runMode) {
        //$LASTPOS=12000054;//kernel.EventHandler:54
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000035;//kernel.EventHandler:35
      if (Tonyu.runMode) {
        //$LASTPOS=12000054;//kernel.EventHandler:54
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=12000094;//kernel.EventHandler:94
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=12000141;//kernel.EventHandler:141
        f=_this.target[f];
        
      }
      //$LASTPOS=12000166;//kernel.EventHandler:166
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=12000255;//kernel.EventHandler:255
      _this.listeners.push(f);
      return {remove: (function anonymous_305() {
        
        //$LASTPOS=12000320;//kernel.EventHandler:320
        _this.removeListener(f);
      })};
    },
    fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000094;//kernel.EventHandler:94
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=12000141;//kernel.EventHandler:141
        f=_this.target[f];
        
      }
      //$LASTPOS=12000166;//kernel.EventHandler:166
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=12000255;//kernel.EventHandler:255
      _this.listeners.push(f);
      
      _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            _thread.exit({remove: (function anonymous_305() {
              
              //$LASTPOS=12000320;//kernel.EventHandler:320
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
      
      //$LASTPOS=12000388;//kernel.EventHandler:388
      i = _this.listeners.indexOf(f);
      //$LASTPOS=12000421;//kernel.EventHandler:421
      _this.listeners.splice(i,1);
    },
    fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=12000388;//kernel.EventHandler:388
      i = _this.listeners.indexOf(f);
      //$LASTPOS=12000421;//kernel.EventHandler:421
      _this.listeners.splice(i,1);
      
      _thread.retVal=_this;return;
    },
    fire :function _trc_EventHandler_fire(args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      var h;
      var _it_152;
      
      //$LASTPOS=12000467;//kernel.EventHandler:467
      if (_this.released) {
        return _this;
      }
      //$LASTPOS=12000494;//kernel.EventHandler:494
      t;
      //$LASTPOS=12000506;//kernel.EventHandler:506
      _it_152=Tonyu.iterator(_this.listeners,1);
      while(_it_152.next()) {
        h=_it_152[0];
        
        //$LASTPOS=12000542;//kernel.EventHandler:542
        if (h["fiber"]) {
          //$LASTPOS=12000573;//kernel.EventHandler:573
          t=Tonyu.thread();
          //$LASTPOS=12000604;//kernel.EventHandler:604
          h["fiber"].apply(_this.target,[t].concat(args));
          //$LASTPOS=12000662;//kernel.EventHandler:662
          t.steps();
          
        } else {
          //$LASTPOS=12000704;//kernel.EventHandler:704
          h.apply(_this.target,args);
          
        }
        
      }
    },
    fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var h;
      var _it_152;
      
      //$LASTPOS=12000467;//kernel.EventHandler:467
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=12000494;//kernel.EventHandler:494
      t;
      //$LASTPOS=12000506;//kernel.EventHandler:506
      _it_152=Tonyu.iterator(_this.listeners,1);
      while(_it_152.next()) {
        h=_it_152[0];
        
        //$LASTPOS=12000542;//kernel.EventHandler:542
        if (h["fiber"]) {
          //$LASTPOS=12000573;//kernel.EventHandler:573
          t=Tonyu.thread();
          //$LASTPOS=12000604;//kernel.EventHandler:604
          h["fiber"].apply(_this.target,[t].concat(args));
          //$LASTPOS=12000662;//kernel.EventHandler:662
          t.steps();
          
        } else {
          //$LASTPOS=12000704;//kernel.EventHandler:704
          h.apply(_this.target,args);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    release :function _trc_EventHandler_release() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=12000766;//kernel.EventHandler:766
      _this.released=true;
    },
    fiber$release :function _trc_EventHandler_f_release(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000766;//kernel.EventHandler:766
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
      
      //$LASTPOS=13000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      return {remove: (function anonymous_135() {
        
        //$LASTPOS=13000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_ScreenOutHandler_f_addListener(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=13000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,f);
      _thread.retVal={remove: (function anonymous_135() {
        
        //$LASTPOS=13000151;//kernel.ScreenOutHandler:151
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=13000210;//kernel.ScreenOutHandler:210
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=13000228;//kernel.ScreenOutHandler:228
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
      
      //$LASTPOS=14000050;//kernel.NoviceActor:50
      if (! n) {
        //$LASTPOS=14000057;//kernel.NoviceActor:57
        n=1;
      }
      //$LASTPOS=14000066;//kernel.NoviceActor:66
      //$LASTPOS=14000070;//kernel.NoviceActor:70
      n;
      while(n>0) {
        //$LASTPOS=14000081;//kernel.NoviceActor:81
        _this.update();
        n--;
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000050;//kernel.NoviceActor:50
      if (! n) {
        //$LASTPOS=14000057;//kernel.NoviceActor:57
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000066;//kernel.NoviceActor:66
            //$LASTPOS=14000070;//kernel.NoviceActor:70
            n;;
          case 1:
            if (!(n>0)) { __pc=3; break; }
            //$LASTPOS=14000081;//kernel.NoviceActor:81
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
      
      //$LASTPOS=14000113;//kernel.NoviceActor:113
      if (! _this._sprite) {
        //$LASTPOS=14000137;//kernel.NoviceActor:137
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=14000207;//kernel.NoviceActor:207
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000113;//kernel.NoviceActor:113
      if (! _this._sprite) {
        //$LASTPOS=14000137;//kernel.NoviceActor:137
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=14000207;//kernel.NoviceActor:207
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000257;//kernel.NoviceActor:257
      if (! size) {
        //$LASTPOS=14000268;//kernel.NoviceActor:268
        size=15;
      }
      //$LASTPOS=14000281;//kernel.NoviceActor:281
      _this.initSprite();
      //$LASTPOS=14000299;//kernel.NoviceActor:299
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000257;//kernel.NoviceActor:257
      if (! size) {
        //$LASTPOS=14000268;//kernel.NoviceActor:268
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000281;//kernel.NoviceActor:281
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=14000299;//kernel.NoviceActor:299
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000371;//kernel.NoviceActor:371
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
            //$LASTPOS=14000371;//kernel.NoviceActor:371
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
      
      //$LASTPOS=14000403;//kernel.NoviceActor:403
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000440;//kernel.NoviceActor:440
      _this._sprite.draw(ctx);
    },
    getCrashRect :function _trc_NoviceActor_getCrashRect() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this._sprite.getCrashRect();
    },
    go :function _trc_NoviceActor_go(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000533;//kernel.NoviceActor:533
      _this.initSprite();
      //$LASTPOS=14000551;//kernel.NoviceActor:551
      _this._sprite.x=x;
      //$LASTPOS=14000568;//kernel.NoviceActor:568
      _this._sprite.y=y;
      //$LASTPOS=14000585;//kernel.NoviceActor:585
      if (p!=null) {
        //$LASTPOS=14000598;//kernel.NoviceActor:598
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
            //$LASTPOS=14000533;//kernel.NoviceActor:533
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=14000551;//kernel.NoviceActor:551
            _this._sprite.x=x;
            //$LASTPOS=14000568;//kernel.NoviceActor:568
            _this._sprite.y=y;
            //$LASTPOS=14000585;//kernel.NoviceActor:585
            if (p!=null) {
              //$LASTPOS=14000598;//kernel.NoviceActor:598
              _this._sprite.p=p;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    change :function _trc_NoviceActor_change(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000646;//kernel.NoviceActor:646
      _this.initSprite();
      //$LASTPOS=14000664;//kernel.NoviceActor:664
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
            //$LASTPOS=14000646;//kernel.NoviceActor:646
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=14000664;//kernel.NoviceActor:664
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
      
      //$LASTPOS=15000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=15000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=15000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2; break; }
            //$LASTPOS=15000134;//kernel.MML:134
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
      
      //$LASTPOS=15000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=15000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=15000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=15000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=15000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=15000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=15000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=15000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=15000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=15000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=15000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=15000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=15000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=15000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=15000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=15000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=15000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=15000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=15000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=15000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=15000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=15000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=15000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=15000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=15000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=15000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=15000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=15000616;//kernel.MML:616
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
      
      //$LASTPOS=15000755;//kernel.MML:755
      if (_this.m) {
        return _this.m.currentTime+_this.cTimeBase;
      }
      return - 1;
    },
    fiber$currentTime :function _trc_MML_f_currentTime(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=15000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=15000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=15000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=15000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=15000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=15000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=15000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=15001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=15000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=15000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=15000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=15000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=15000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=15000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=15000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=15001056;//kernel.MML:1056
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
      
      //$LASTPOS=16000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=16000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=16000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=16000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=16000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=16000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=16000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=16000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=16000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var k;
      var v;
      var _it_158;
      
      //$LASTPOS=16000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=16000343;//kernel.PlayMod:343
        _it_158=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_158.next()) {
          k=_it_158[0];
          v=_it_158[1];
          
          //$LASTPOS=16000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=16000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=16000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=16000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=16000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var mmls;
      var i;
      
      //$LASTPOS=16000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=16000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=16000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=16000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=16000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=16000647;//kernel.PlayMod:647
      //$LASTPOS=16000652;//kernel.PlayMod:652
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=16000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=16000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=16000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=16000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=16000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=16000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=16000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=16000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=16000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=16000647;//kernel.PlayMod:647
      //$LASTPOS=16000652;//kernel.PlayMod:652
      i = 0;
      while(i<_arguments.length) {
        {
          //$LASTPOS=16000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
        i++;
      }
      //$LASTPOS=16000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=16000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
            //$LASTPOS=16000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=16000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=16000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      //$LASTPOS=16000897;//kernel.PlayMod:897
      mmls = [];
      //$LASTPOS=16000915;//kernel.PlayMod:915
      //$LASTPOS=16000920;//kernel.PlayMod:920
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=16000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=16001002;//kernel.PlayMod:1002
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
      
      //$LASTPOS=17000028;//kernel.WaveTable:28
      _this.wav={};
      //$LASTPOS=17000036;//kernel.WaveTable:36
      _this.env={};
      //$LASTPOS=17000313;//kernel.WaveTable:313
      if (typeof  T!=="undefined") {
        //$LASTPOS=17000392;//kernel.WaveTable:392
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=17000460;//kernel.WaveTable:460
        _this.setEnv(0,_this.env);
        //$LASTPOS=17000480;//kernel.WaveTable:480
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000028;//kernel.WaveTable:28
      _this.wav={};
      //$LASTPOS=17000036;//kernel.WaveTable:36
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=17000313;//kernel.WaveTable:313
            if (!(typeof  T!=="undefined")) { __pc=3; break; }
            //$LASTPOS=17000392;//kernel.WaveTable:392
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=17000460;//kernel.WaveTable:460
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=17000480;//kernel.WaveTable:480
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
      
      //$LASTPOS=17000070;//kernel.WaveTable:70
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000070;//kernel.WaveTable:70
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=17000114;//kernel.WaveTable:114
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000114;//kernel.WaveTable:114
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var synth;
      
      //$LASTPOS=17000148;//kernel.WaveTable:148
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=17000148;//kernel.WaveTable:148
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
      
      //$LASTPOS=18000064;//kernel.ParallelMod:64
      args = [];
      //$LASTPOS=18000083;//kernel.ParallelMod:83
      //$LASTPOS=18000088;//kernel.ParallelMod:88
      i = 1;
      while(i<arguments.length) {
        {
          //$LASTPOS=18000134;//kernel.ParallelMod:134
          args.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=18000173;//kernel.ParallelMod:173
      name = arguments[0];
      //$LASTPOS=18000202;//kernel.ParallelMod:202
      th;
      //$LASTPOS=18000409;//kernel.ParallelMod:409
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
      
      //$LASTPOS=19000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=19000059;//kernel.Scheduler:59
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=19000059;//kernel.Scheduler:59
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
      
      //$LASTPOS=19000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=19000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=19000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=19000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      //$LASTPOS=19000316;//kernel.Scheduler:316
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=19000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=19000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=19000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=19000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=19000316;//kernel.Scheduler:316
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
      
      //$LASTPOS=19000371;//kernel.Scheduler:371
      _this.cur.push(th);
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000371;//kernel.Scheduler:371
      _this.cur.push(th);
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=19000411;//kernel.Scheduler:411
      _this.next.push(th);
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=19000411;//kernel.Scheduler:411
      _this.next.push(th);
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      var _it_173;
      
      //$LASTPOS=19000449;//kernel.Scheduler:449
      _it_173=Tonyu.iterator(_this.cur,1);
      while(_it_173.next()) {
        t=_it_173[0];
        
        //$LASTPOS=19000479;//kernel.Scheduler:479
        t.steps();
        //$LASTPOS=19000499;//kernel.Scheduler:499
        if (t.preempted) {
          //$LASTPOS=19000576;//kernel.Scheduler:576
          _this.next.push(t);
          
        }
        
      }
      //$LASTPOS=19000613;//kernel.Scheduler:613
      _this.cur=_this.next;
      //$LASTPOS=19000628;//kernel.Scheduler:628
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_173;
      
      //$LASTPOS=19000449;//kernel.Scheduler:449
      _it_173=Tonyu.iterator(_this.cur,1);
      while(_it_173.next()) {
        t=_it_173[0];
        
        //$LASTPOS=19000479;//kernel.Scheduler:479
        t.steps();
        //$LASTPOS=19000499;//kernel.Scheduler:499
        if (t.preempted) {
          //$LASTPOS=19000576;//kernel.Scheduler:576
          _this.next.push(t);
          
        }
        
      }
      //$LASTPOS=19000613;//kernel.Scheduler:613
      _this.cur=_this.next;
      //$LASTPOS=19000628;//kernel.Scheduler:628
      _this.next=[];
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=20000105;//kernel.Actor:105
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=20000147;//kernel.Actor:147
      _this.initSprite();
    },
    initSprite :function _trc_Actor_initSprite() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=20000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=20000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=20000308;//kernel.Actor:308
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=20000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=20000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20000308;//kernel.Actor:308
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
      
      //$LASTPOS=21000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=21000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=21000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=21000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=21000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=21000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=21000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=21000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=21000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=21000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=21000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=21000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      
      //$LASTPOS=21000655;//kernel.GameScreen:655
      b = _this.bounds;
      //$LASTPOS=21000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=21000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=21000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      
      //$LASTPOS=21000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=21000878;//kernel.GameScreen:878
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
      
      //$LASTPOS=21000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=21000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      
      //$LASTPOS=21001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=21001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=21001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=21001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=21001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=21001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=21001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=21001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=21001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=21001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21001265;//kernel.GameScreen:1265
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
      
      //$LASTPOS=22000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=22000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=22000082;//kernel.Map:82
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=22000101;//kernel.Map:101
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=22000173;//kernel.Map:173
      _this.mapObj=true;
      //$LASTPOS=22000191;//kernel.Map:191
      _this.mapTable=[];
      //$LASTPOS=22000211;//kernel.Map:211
      _this.mapOnTable=[];
      //$LASTPOS=22000233;//kernel.Map:233
      //$LASTPOS=22000237;//kernel.Map:237
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=22000266;//kernel.Map:266
          _this.rows=[];
          //$LASTPOS=22000286;//kernel.Map:286
          //$LASTPOS=22000290;//kernel.Map:290
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=22000323;//kernel.Map:323
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=22000358;//kernel.Map:358
          _this.mapTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=22000391;//kernel.Map:391
      //$LASTPOS=22000395;//kernel.Map:395
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=22000424;//kernel.Map:424
          _this.rows=[];
          //$LASTPOS=22000444;//kernel.Map:444
          //$LASTPOS=22000448;//kernel.Map:448
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=22000481;//kernel.Map:481
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=22000516;//kernel.Map:516
          _this.mapOnTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=22000616;//kernel.Map:616
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=22000648;//kernel.Map:648
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=22000674;//kernel.Map:674
      //$LASTPOS=22000678;//kernel.Map:678
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=22000707;//kernel.Map:707
          //$LASTPOS=22000711;//kernel.Map:711
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=22000744;//kernel.Map:744
              _this.set(j,i,_this.mapData[i][j]);
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=22000791;//kernel.Map:791
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=22000819;//kernel.Map:819
      //$LASTPOS=22000823;//kernel.Map:823
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=22000852;//kernel.Map:852
          //$LASTPOS=22000856;//kernel.Map:856
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=22000889;//kernel.Map:889
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
      
      //$LASTPOS=22000648;//kernel.Map:648
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22000674;//kernel.Map:674
            //$LASTPOS=22000678;//kernel.Map:678
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=5; break; }
            //$LASTPOS=22000707;//kernel.Map:707
            //$LASTPOS=22000711;//kernel.Map:711
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=4; break; }
            //$LASTPOS=22000744;//kernel.Map:744
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
            j++;
            __pc=2;break;
          case 4:
            
            i++;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=22000791;//kernel.Map:791
            if (!(! _this.mapOnData)) { __pc=6; break; }
            _thread.exit(_this);return;
          case 6:
            
            //$LASTPOS=22000819;//kernel.Map:819
            //$LASTPOS=22000823;//kernel.Map:823
            i = 0;;
          case 7:
            if (!(i<_this.row)) { __pc=11; break; }
            //$LASTPOS=22000852;//kernel.Map:852
            //$LASTPOS=22000856;//kernel.Map:856
            j = 0;;
          case 8:
            if (!(j<_this.col)) { __pc=10; break; }
            //$LASTPOS=22000889;//kernel.Map:889
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
      
      //$LASTPOS=22000961;//kernel.Map:961
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=22001013;//kernel.Map:1013
      if (! _this.baseData) {
        //$LASTPOS=22001027;//kernel.Map:1027
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=22001063;//kernel.Map:1063
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=22001090;//kernel.Map:1090
      _this.mapData=_this.mapTable;
      //$LASTPOS=22001113;//kernel.Map:1113
      _this.row=_this.mapTable.length;
      //$LASTPOS=22001139;//kernel.Map:1139
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=22001168;//kernel.Map:1168
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=22001197;//kernel.Map:1197
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=22001224;//kernel.Map:1224
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=22001296;//kernel.Map:1296
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000961;//kernel.Map:961
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=22001013;//kernel.Map:1013
      if (! _this.baseData) {
        //$LASTPOS=22001027;//kernel.Map:1027
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=22001063;//kernel.Map:1063
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=22001090;//kernel.Map:1090
      _this.mapData=_this.mapTable;
      //$LASTPOS=22001113;//kernel.Map:1113
      _this.row=_this.mapTable.length;
      //$LASTPOS=22001139;//kernel.Map:1139
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=22001168;//kernel.Map:1168
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=22001197;//kernel.Map:1197
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=22001224;//kernel.Map:1224
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22001296;//kernel.Map:1296
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
      
      //$LASTPOS=22001339;//kernel.Map:1339
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=22001407;//kernel.Map:1407
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=22001478;//kernel.Map:1478
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=22001512;//kernel.Map:1512
      p=Math.floor(p);
      //$LASTPOS=22001534;//kernel.Map:1534
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=22001572;//kernel.Map:1572
      if (! _this.pImg) {
        //$LASTPOS=22001594;//kernel.Map:1594
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=22001695;//kernel.Map:1695
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=22001772;//kernel.Map:1772
      _this.ctx.save();
      //$LASTPOS=22001789;//kernel.Map:1789
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=22001933;//kernel.Map:1933
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22001339;//kernel.Map:1339
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=22001407;//kernel.Map:1407
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=22001478;//kernel.Map:1478
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=22001512;//kernel.Map:1512
      p=Math.floor(p);
      //$LASTPOS=22001534;//kernel.Map:1534
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=22001572;//kernel.Map:1572
      if (! _this.pImg) {
        //$LASTPOS=22001594;//kernel.Map:1594
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=22001695;//kernel.Map:1695
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=22001772;//kernel.Map:1772
      _this.ctx.save();
      //$LASTPOS=22001789;//kernel.Map:1789
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=22001933;//kernel.Map:1933
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=22001982;//kernel.Map:1982
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=22002050;//kernel.Map:2050
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=22002100;//kernel.Map:2100
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=22002135;//kernel.Map:2135
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=22002169;//kernel.Map:2169
      p=Math.floor(p);
      //$LASTPOS=22002191;//kernel.Map:2191
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=22002229;//kernel.Map:2229
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=22002253;//kernel.Map:2253
      _this.ctx.save();
      //$LASTPOS=22002270;//kernel.Map:2270
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=22002414;//kernel.Map:2414
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22001982;//kernel.Map:1982
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=22002050;//kernel.Map:2050
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=22002100;//kernel.Map:2100
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=22002135;//kernel.Map:2135
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=22002169;//kernel.Map:2169
            p=Math.floor(p);
            //$LASTPOS=22002191;//kernel.Map:2191
            _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
            //$LASTPOS=22002229;//kernel.Map:2229
            if (!(! _this.pImg)) { __pc=2; break; }
            _thread.exit(_this);return;
          case 2:
            
            //$LASTPOS=22002253;//kernel.Map:2253
            _this.ctx.save();
            //$LASTPOS=22002270;//kernel.Map:2270
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=22002414;//kernel.Map:2414
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=22002461;//kernel.Map:2461
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
            //$LASTPOS=22002461;//kernel.Map:2461
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
      
      //$LASTPOS=22002556;//kernel.Map:2556
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
            //$LASTPOS=22002556;//kernel.Map:2556
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
      
      //$LASTPOS=22002649;//kernel.Map:2649
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22002649;//kernel.Map:2649
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
      
      //$LASTPOS=22002881;//kernel.Map:2881
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapOnTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22002881;//kernel.Map:2881
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
      
      //$LASTPOS=22003124;//kernel.Map:3124
      _this.sx=- scrollX;
      //$LASTPOS=22003142;//kernel.Map:3142
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22003124;//kernel.Map:3124
      _this.sx=- scrollX;
      //$LASTPOS=22003142;//kernel.Map:3142
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=22003177;//kernel.Map:3177
      _this.pImg=_this.buf[0];
      //$LASTPOS=22003195;//kernel.Map:3195
      ctx.save();
      //$LASTPOS=22003212;//kernel.Map:3212
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=22003324;//kernel.Map:3324
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
      
      //$LASTPOS=23000072;//kernel.Panel:72
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=23000089;//kernel.Panel:89
      _this.width=_this.width;
      //$LASTPOS=23000112;//kernel.Panel:112
      _this.height=_this.height;
      //$LASTPOS=23000137;//kernel.Panel:137
      if (_this.align==null) {
        //$LASTPOS=23000153;//kernel.Panel:153
        _this.align="center";
      }
      //$LASTPOS=23000174;//kernel.Panel:174
      if (_this.alpha==null) {
        //$LASTPOS=23000190;//kernel.Panel:190
        _this.alpha=255;
      }
      //$LASTPOS=23000206;//kernel.Panel:206
      if (_this._drawn==null) {
        //$LASTPOS=23000223;//kernel.Panel:223
        _this._drawn=false;
      }
      //$LASTPOS=23000242;//kernel.Panel:242
      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=23000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=23000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000314;//kernel.Panel:314
      _this.width=width;
      //$LASTPOS=23000337;//kernel.Panel:337
      _this.height=height;
      //$LASTPOS=23000362;//kernel.Panel:362
      _this.buf=$("<canvas>").attr({width: width,height: height});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000432;//kernel.Panel:432
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
            //$LASTPOS=23000432;//kernel.Panel:432
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
      
      //$LASTPOS=23000480;//kernel.Panel:480
      _this._drawn=true;
      return _this.buf[0].getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000480;//kernel.Panel:480
      _this._drawn=true;
      _thread.retVal=_this.buf[0].getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000561;//kernel.Panel:561
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000561;//kernel.Panel:561
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000629;//kernel.Panel:629
      _this.ctx=_this.getContext();
      //$LASTPOS=23000652;//kernel.Panel:652
      _this.ctx.save();
      //$LASTPOS=23000719;//kernel.Panel:719
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=23000749;//kernel.Panel:749
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=23000794;//kernel.Panel:794
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
            //$LASTPOS=23000629;//kernel.Panel:629
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=23000652;//kernel.Panel:652
            _this.ctx.save();
            //$LASTPOS=23000719;//kernel.Panel:719
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=23000749;//kernel.Panel:749
            _this.ctx.fillRect(x,y,rectWidth,rectHeight);
            //$LASTPOS=23000794;//kernel.Panel:794
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
      
      //$LASTPOS=23000850;//kernel.Panel:850
      _this.ctx=_this.getContext();
      //$LASTPOS=23000873;//kernel.Panel:873
      _this.ctx.save();
      //$LASTPOS=23000890;//kernel.Panel:890
      text=text+"";
      //$LASTPOS=23000909;//kernel.Panel:909
      splits = text.split("\n");
      //$LASTPOS=23000995;//kernel.Panel:995
      _this.ctx.textAlign=align;
      //$LASTPOS=23001023;//kernel.Panel:1023
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=23001053;//kernel.Panel:1053
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=23001092;//kernel.Panel:1092
      //$LASTPOS=23001096;//kernel.Panel:1096
      colCount = 0;
      while(colCount<splits.length) {
        {
          //$LASTPOS=23001156;//kernel.Panel:1156
          _this.ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=23001201;//kernel.Panel:1201
          y+=size;
        }
        colCount++;
      }
      //$LASTPOS=23001222;//kernel.Panel:1222
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
            //$LASTPOS=23000850;//kernel.Panel:850
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=23000873;//kernel.Panel:873
            _this.ctx.save();
            //$LASTPOS=23000890;//kernel.Panel:890
            text=text+"";
            //$LASTPOS=23000909;//kernel.Panel:909
            splits = text.split("\n");
            //$LASTPOS=23000995;//kernel.Panel:995
            _this.ctx.textAlign=align;
            //$LASTPOS=23001023;//kernel.Panel:1023
            _this.ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=23001053;//kernel.Panel:1053
            _this.ctx.font=size+"px 'Courier New'";
            //$LASTPOS=23001092;//kernel.Panel:1092
            //$LASTPOS=23001096;//kernel.Panel:1096
            colCount = 0;
            while(colCount<splits.length) {
              {
                //$LASTPOS=23001156;//kernel.Panel:1156
                _this.ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=23001201;//kernel.Panel:1201
                y+=size;
              }
              colCount++;
            }
            //$LASTPOS=23001222;//kernel.Panel:1222
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23001287;//kernel.Panel:1287
      _this.ctx=_this.getContext();
      //$LASTPOS=23001310;//kernel.Panel:1310
      _this.ctx.save();
      //$LASTPOS=23001327;//kernel.Panel:1327
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=23001376;//kernel.Panel:1376
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
            //$LASTPOS=23001287;//kernel.Panel:1287
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=23001310;//kernel.Panel:1310
            _this.ctx.save();
            //$LASTPOS=23001327;//kernel.Panel:1327
            _this.ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=23001376;//kernel.Panel:1376
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23001422;//kernel.Panel:1422
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=23001521;//kernel.Panel:1521
        _this.ctx=_this.getContext();
        //$LASTPOS=23001548;//kernel.Panel:1548
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=23001600;//kernel.Panel:1600
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=23001740;//kernel.Panel:1740
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
            //$LASTPOS=23001422;//kernel.Panel:1422
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
            //$LASTPOS=23001521;//kernel.Panel:1521
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=23001548;//kernel.Panel:1548
            _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=23001600;//kernel.Panel:1600
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=23001740;//kernel.Panel:1740
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
      
      //$LASTPOS=23001827;//kernel.Panel:1827
      _this.ctx=_this.getContext();
      //$LASTPOS=23001850;//kernel.Panel:1850
      _this.ctx.save();
      //$LASTPOS=23001867;//kernel.Panel:1867
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=23001928;//kernel.Panel:1928
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=23001962;//kernel.Panel:1962
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=23002014;//kernel.Panel:2014
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
            //$LASTPOS=23001827;//kernel.Panel:1827
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            _this.ctx=_thread.retVal;
            
            //$LASTPOS=23001850;//kernel.Panel:1850
            _this.ctx.save();
            //$LASTPOS=23001867;//kernel.Panel:1867
            _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=23001928;//kernel.Panel:1928
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=23001962;//kernel.Panel:1962
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=23002014;//kernel.Panel:2014
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23002050;//kernel.Panel:2050
      if (_this._drawn) {
        //$LASTPOS=23002071;//kernel.Panel:2071
        _this.pImg=_this.buf[0];
        //$LASTPOS=23002093;//kernel.Panel:2093
        ctx.save();
        //$LASTPOS=23002114;//kernel.Panel:2114
        if (_this.align=="left") {
          //$LASTPOS=23002146;//kernel.Panel:2146
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=23002198;//kernel.Panel:2198
          if (_this.align=="center") {
            //$LASTPOS=23002232;//kernel.Panel:2232
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=23002267;//kernel.Panel:2267
            if (_this.align=="right") {
              //$LASTPOS=23002300;//kernel.Panel:2300
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=23002357;//kernel.Panel:2357
        if (_this.rotation!=0) {
          //$LASTPOS=23002392;//kernel.Panel:2392
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=23002460;//kernel.Panel:2460
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=23002517;//kernel.Panel:2517
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=23002558;//kernel.Panel:2558
        ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=23002662;//kernel.Panel:2662
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
      
      //$LASTPOS=24000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=24000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=24000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=24000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=24000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=24000257;//kernel.ScaledCanvas:257
      _this.color="rgb(20,80,180)";
      //$LASTPOS=24000291;//kernel.ScaledCanvas:291
      _this.sx=0;
      //$LASTPOS=24000302;//kernel.ScaledCanvas:302
      _this.sy=0;
      //$LASTPOS=24000313;//kernel.ScaledCanvas:313
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=24000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=24000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=24000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=24000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=24000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=24000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=24000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000378;//kernel.ScaledCanvas:378
      _this.width=width;
      //$LASTPOS=24000401;//kernel.ScaledCanvas:401
      _this.height=height;
      //$LASTPOS=24000426;//kernel.ScaledCanvas:426
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=24000469;//kernel.ScaledCanvas:469
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=24000505;//kernel.ScaledCanvas:505
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=24000530;//kernel.ScaledCanvas:530
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=24000557;//kernel.ScaledCanvas:557
      if (Tonyu.globals.$panel) {
        //$LASTPOS=24000578;//kernel.ScaledCanvas:578
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var larger;
      var smaller;
      
      //$LASTPOS=24000712;//kernel.ScaledCanvas:712
      larger = 200;
      //$LASTPOS=24000733;//kernel.ScaledCanvas:733
      smaller = 5;
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=24000712;//kernel.ScaledCanvas:712
      larger = 200;
      //$LASTPOS=24000733;//kernel.ScaledCanvas:733
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
      
      //$LASTPOS=24000868;//kernel.ScaledCanvas:868
      _this.cw=_this.canvas.width();
      //$LASTPOS=24000892;//kernel.ScaledCanvas:892
      _this.ch=_this.canvas.height();
      //$LASTPOS=24000917;//kernel.ScaledCanvas:917
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=24000961;//kernel.ScaledCanvas:961
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=24001005;//kernel.ScaledCanvas:1005
      if (calch>_this.ch) {
        //$LASTPOS=24001019;//kernel.ScaledCanvas:1019
        calch=_this.ch;
      }
      //$LASTPOS=24001034;//kernel.ScaledCanvas:1034
      if (calcw>_this.cw) {
        //$LASTPOS=24001048;//kernel.ScaledCanvas:1048
        calcw=_this.cw;
      }
      //$LASTPOS=24001063;//kernel.ScaledCanvas:1063
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=24001095;//kernel.ScaledCanvas:1095
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=24001151;//kernel.ScaledCanvas:1151
        calcw=_this.width;
        //$LASTPOS=24001163;//kernel.ScaledCanvas:1163
        calch=_this.height;
        
      }
      //$LASTPOS=24001189;//kernel.ScaledCanvas:1189
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=24001232;//kernel.ScaledCanvas:1232
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=24001275;//kernel.ScaledCanvas:1275
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=24001390;//kernel.ScaledCanvas:1390
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=24001434;//kernel.ScaledCanvas:1434
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=24001478;//kernel.ScaledCanvas:1478
      if (calch>_this.ch) {
        //$LASTPOS=24001492;//kernel.ScaledCanvas:1492
        calch=_this.ch;
      }
      //$LASTPOS=24001507;//kernel.ScaledCanvas:1507
      if (calcw>_this.cw) {
        //$LASTPOS=24001521;//kernel.ScaledCanvas:1521
        calcw=_this.cw;
      }
      //$LASTPOS=24001536;//kernel.ScaledCanvas:1536
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=24001592;//kernel.ScaledCanvas:1592
        calcw=_this.width;
        //$LASTPOS=24001604;//kernel.ScaledCanvas:1604
        calch=_this.height;
        
      }
      //$LASTPOS=24001630;//kernel.ScaledCanvas:1630
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=24001673;//kernel.ScaledCanvas:1673
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=24001769;//kernel.ScaledCanvas:1769
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
      
      //$LASTPOS=24001390;//kernel.ScaledCanvas:1390
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=24001434;//kernel.ScaledCanvas:1434
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=24001478;//kernel.ScaledCanvas:1478
      if (calch>_this.ch) {
        //$LASTPOS=24001492;//kernel.ScaledCanvas:1492
        calch=_this.ch;
      }
      //$LASTPOS=24001507;//kernel.ScaledCanvas:1507
      if (calcw>_this.cw) {
        //$LASTPOS=24001521;//kernel.ScaledCanvas:1521
        calcw=_this.cw;
      }
      //$LASTPOS=24001536;//kernel.ScaledCanvas:1536
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=24001592;//kernel.ScaledCanvas:1592
        calcw=_this.width;
        //$LASTPOS=24001604;//kernel.ScaledCanvas:1604
        calch=_this.height;
        
      }
      //$LASTPOS=24001630;//kernel.ScaledCanvas:1630
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=24001673;//kernel.ScaledCanvas:1673
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=24001769;//kernel.ScaledCanvas:1769
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24001942;//kernel.ScaledCanvas:1942
      _this.color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24001942;//kernel.ScaledCanvas:1942
      _this.color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      
      //$LASTPOS=24001986;//kernel.ScaledCanvas:1986
      ctx = cv.getContext("2d");
      //$LASTPOS=24002020;//kernel.ScaledCanvas:2020
      ctx.save();
      //$LASTPOS=24002037;//kernel.ScaledCanvas:2037
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=24002071;//kernel.ScaledCanvas:2071
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=24002097;//kernel.ScaledCanvas:2097
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=24002140;//kernel.ScaledCanvas:2140
      if (_this.isDrawGrid) {
        //$LASTPOS=24002156;//kernel.ScaledCanvas:2156
        _this.drawGrid(cv);
      }
      //$LASTPOS=24002175;//kernel.ScaledCanvas:2175
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=24001986;//kernel.ScaledCanvas:1986
      ctx = cv.getContext("2d");
      //$LASTPOS=24002020;//kernel.ScaledCanvas:2020
      ctx.save();
      //$LASTPOS=24002037;//kernel.ScaledCanvas:2037
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=24002071;//kernel.ScaledCanvas:2071
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=24002097;//kernel.ScaledCanvas:2097
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=24002140;//kernel.ScaledCanvas:2140
      if (_this.isDrawGrid) {
        //$LASTPOS=24002156;//kernel.ScaledCanvas:2156
        _this.drawGrid(cv);
      }
      //$LASTPOS=24002175;//kernel.ScaledCanvas:2175
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24002519;//kernel.ScaledCanvas:2519
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24002519;//kernel.ScaledCanvas:2519
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
      
      //$LASTPOS=25000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=25000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=25000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=25000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=25000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=25000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=25000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=25000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=25000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=25000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=25000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=25000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=25000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=25000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=25000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=25000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=25000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var idx;
      
      //$LASTPOS=25000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=25000433;//kernel.Sprites:433
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=25000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=25000485;//kernel.Sprites:485
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=25000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=25000433;//kernel.Sprites:433
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=25000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=25000485;//kernel.Sprites:485
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=25000542;//kernel.Sprites:542
      //$LASTPOS=25000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=25000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=25000641;//kernel.Sprites:641
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
      
      //$LASTPOS=25000542;//kernel.Sprites:542
      //$LASTPOS=25000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=25000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=25000641;//kernel.Sprites:641
            _this.sprites.splice(i,1);
            
          }
        }
        i--;
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var val1;
      var val2;
      
      //$LASTPOS=25000775;//kernel.Sprites:775
      val1 = obj1.zOrder;
      //$LASTPOS=25000802;//kernel.Sprites:802
      val2 = obj2.zOrder;
      //$LASTPOS=25000829;//kernel.Sprites:829
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=25000875;//kernel.Sprites:875
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=25000920;//kernel.Sprites:920
          if (val1==val2) {
            //$LASTPOS=25000945;//kernel.Sprites:945
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
      
      //$LASTPOS=25000775;//kernel.Sprites:775
      val1 = obj1.zOrder;
      //$LASTPOS=25000802;//kernel.Sprites:802
      val2 = obj2.zOrder;
      //$LASTPOS=25000829;//kernel.Sprites:829
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=25000875;//kernel.Sprites:875
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=25000920;//kernel.Sprites:920
          if (val1==val2) {
            //$LASTPOS=25000945;//kernel.Sprites:945
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
      
      //$LASTPOS=25001105;//kernel.Sprites:1105
      ctx = cv.getContext("2d");
      //$LASTPOS=25001139;//kernel.Sprites:1139
      ctx.save();
      //$LASTPOS=25001284;//kernel.Sprites:1284
      orderArray = [];
      //$LASTPOS=25001308;//kernel.Sprites:1308
      orderArray=orderArray.concat(_this.sprites);
      //$LASTPOS=25001352;//kernel.Sprites:1352
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=25001385;//kernel.Sprites:1385
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=25001414;//kernel.Sprites:1414
      orderArray.forEach((function anonymous_1433(s) {
        
        //$LASTPOS=25001448;//kernel.Sprites:1448
        s.draw(ctx);
      }));
      //$LASTPOS=25001475;//kernel.Sprites:1475
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25001521;//kernel.Sprites:1521
      _this.hitWatchers.forEach((function anonymous_1541(w) {
        
        //$LASTPOS=25001565;//kernel.Sprites:1565
        _this.sprites.forEach((function anonymous_1581(a) {
          var a_owner;
          
          //$LASTPOS=25001653;//kernel.Sprites:1653
          a_owner = a;
          //$LASTPOS=25001695;//kernel.Sprites:1695
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=25001748;//kernel.Sprites:1748
          _this.sprites.forEach((function anonymous_1764(b) {
            var b_owner;
            
            //$LASTPOS=25001796;//kernel.Sprites:1796
            b_owner = b;
            //$LASTPOS=25001842;//kernel.Sprites:1842
            if (a===b) {
              return _this;
            }
            //$LASTPOS=25001878;//kernel.Sprites:1878
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=25001983;//kernel.Sprites:1983
            if (a.crashTo1(b)) {
              //$LASTPOS=25002086;//kernel.Sprites:2086
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
      
      //$LASTPOS=25001521;//kernel.Sprites:1521
      _this.hitWatchers.forEach((function anonymous_1541(w) {
        
        //$LASTPOS=25001565;//kernel.Sprites:1565
        _this.sprites.forEach((function anonymous_1581(a) {
          var a_owner;
          
          //$LASTPOS=25001653;//kernel.Sprites:1653
          a_owner = a;
          //$LASTPOS=25001695;//kernel.Sprites:1695
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=25001748;//kernel.Sprites:1748
          _this.sprites.forEach((function anonymous_1764(b) {
            var b_owner;
            
            //$LASTPOS=25001796;//kernel.Sprites:1796
            b_owner = b;
            //$LASTPOS=25001842;//kernel.Sprites:1842
            if (a===b) {
              return _this;
            }
            //$LASTPOS=25001878;//kernel.Sprites:1878
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=25001983;//kernel.Sprites:1983
            if (a.crashTo1(b)) {
              //$LASTPOS=25002086;//kernel.Sprites:2086
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
      
      //$LASTPOS=25002216;//kernel.Sprites:2216
      p = {A: typeA,B: typeB,h: onHit};
      //$LASTPOS=25002280;//kernel.Sprites:2280
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      var i;
      
      //$LASTPOS=25002333;//kernel.Sprites:2333
      ctx = c.getContext("2d");
      //$LASTPOS=25002366;//kernel.Sprites:2366
      ctx.textBaseline="top";
      //$LASTPOS=25002395;//kernel.Sprites:2395
      ctx.save();
      //$LASTPOS=25002412;//kernel.Sprites:2412
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=25002452;//kernel.Sprites:2452
      //$LASTPOS=25002457;//kernel.Sprites:2457
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=25002497;//kernel.Sprites:2497
          ctx.beginPath();
          //$LASTPOS=25002523;//kernel.Sprites:2523
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=25002569;//kernel.Sprites:2569
          ctx.moveTo(i,0);
          //$LASTPOS=25002595;//kernel.Sprites:2595
          ctx.lineTo(i,c.height);
          //$LASTPOS=25002628;//kernel.Sprites:2628
          ctx.closePath();
          //$LASTPOS=25002654;//kernel.Sprites:2654
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=25002686;//kernel.Sprites:2686
      //$LASTPOS=25002691;//kernel.Sprites:2691
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=25002732;//kernel.Sprites:2732
          ctx.beginPath();
          //$LASTPOS=25002758;//kernel.Sprites:2758
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=25002804;//kernel.Sprites:2804
          ctx.moveTo(0,i);
          //$LASTPOS=25002830;//kernel.Sprites:2830
          ctx.lineTo(c.width,i);
          //$LASTPOS=25002862;//kernel.Sprites:2862
          ctx.closePath();
          //$LASTPOS=25002888;//kernel.Sprites:2888
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=25002914;//kernel.Sprites:2914
      ctx.fillStyle="white";
      //$LASTPOS=25002942;//kernel.Sprites:2942
      ctx.font="15px monospaced";
      //$LASTPOS=25002975;//kernel.Sprites:2975
      //$LASTPOS=25002980;//kernel.Sprites:2980
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=25003023;//kernel.Sprites:3023
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=25003057;//kernel.Sprites:3057
      //$LASTPOS=25003062;//kernel.Sprites:3062
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=25003106;//kernel.Sprites:3106
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=25003140;//kernel.Sprites:3140
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=25002333;//kernel.Sprites:2333
      ctx = c.getContext("2d");
      //$LASTPOS=25002366;//kernel.Sprites:2366
      ctx.textBaseline="top";
      //$LASTPOS=25002395;//kernel.Sprites:2395
      ctx.save();
      //$LASTPOS=25002412;//kernel.Sprites:2412
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=25002452;//kernel.Sprites:2452
      //$LASTPOS=25002457;//kernel.Sprites:2457
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=25002497;//kernel.Sprites:2497
          ctx.beginPath();
          //$LASTPOS=25002523;//kernel.Sprites:2523
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=25002569;//kernel.Sprites:2569
          ctx.moveTo(i,0);
          //$LASTPOS=25002595;//kernel.Sprites:2595
          ctx.lineTo(i,c.height);
          //$LASTPOS=25002628;//kernel.Sprites:2628
          ctx.closePath();
          //$LASTPOS=25002654;//kernel.Sprites:2654
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=25002686;//kernel.Sprites:2686
      //$LASTPOS=25002691;//kernel.Sprites:2691
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=25002732;//kernel.Sprites:2732
          ctx.beginPath();
          //$LASTPOS=25002758;//kernel.Sprites:2758
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=25002804;//kernel.Sprites:2804
          ctx.moveTo(0,i);
          //$LASTPOS=25002830;//kernel.Sprites:2830
          ctx.lineTo(c.width,i);
          //$LASTPOS=25002862;//kernel.Sprites:2862
          ctx.closePath();
          //$LASTPOS=25002888;//kernel.Sprites:2888
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=25002914;//kernel.Sprites:2914
      ctx.fillStyle="white";
      //$LASTPOS=25002942;//kernel.Sprites:2942
      ctx.font="15px monospaced";
      //$LASTPOS=25002975;//kernel.Sprites:2975
      //$LASTPOS=25002980;//kernel.Sprites:2980
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=25003023;//kernel.Sprites:3023
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=25003057;//kernel.Sprites:3057
      //$LASTPOS=25003062;//kernel.Sprites:3062
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=25003106;//kernel.Sprites:3106
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=25003140;//kernel.Sprites:3140
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setImageList :function _trc_Sprites_setImageList(il) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25003192;//kernel.Sprites:3192
      _this.imageList=il;
    },
    fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25003192;//kernel.Sprites:3192
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
      
      //$LASTPOS=25003304;//kernel.Sprites:3304
      _this.sx=scrollX;
      //$LASTPOS=25003321;//kernel.Sprites:3321
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25003304;//kernel.Sprites:3304
      _this.sx=scrollX;
      //$LASTPOS=25003321;//kernel.Sprites:3321
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
      
      //$LASTPOS=26000064;//kernel.BodyActor:64
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=26000099;//kernel.BodyActor:99
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26000064;//kernel.BodyActor:64
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=26000099;//kernel.BodyActor:99
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
      
      //$LASTPOS=26000162;//kernel.BodyActor:162
      wworld = _this.getWorld();
      //$LASTPOS=26000189;//kernel.BodyActor:189
      _this.world=wworld.world;
      //$LASTPOS=26000213;//kernel.BodyActor:213
      _this.scale=wworld.scale;
      //$LASTPOS=26000237;//kernel.BodyActor:237
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26000280;//kernel.BodyActor:280
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=26000326;//kernel.BodyActor:326
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=26000366;//kernel.BodyActor:366
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=26000418;//kernel.BodyActor:418
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=26000464;//kernel.BodyActor:464
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=26000528;//kernel.BodyActor:528
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=26000595;//kernel.BodyActor:595
      fixDef = new b2FixtureDef;
      //$LASTPOS=26000630;//kernel.BodyActor:630
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=26000671;//kernel.BodyActor:671
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=26000714;//kernel.BodyActor:714
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=26000768;//kernel.BodyActor:768
      bodyDef = new b2BodyDef;
      //$LASTPOS=26000801;//kernel.BodyActor:801
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=26000886;//kernel.BodyActor:886
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=26000921;//kernel.BodyActor:921
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=26000956;//kernel.BodyActor:956
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=26001004;//kernel.BodyActor:1004
      w = _this.width;h = _this.height;
      //$LASTPOS=26001030;//kernel.BodyActor:1030
      if (! w) {
        //$LASTPOS=26001048;//kernel.BodyActor:1048
        _this.detectShape();
        //$LASTPOS=26001071;//kernel.BodyActor:1071
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=26001100;//kernel.BodyActor:1100
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=26001140;//kernel.BodyActor:1140
      if (_this.shape=="box") {
        //$LASTPOS=26001168;//kernel.BodyActor:1168
        if (! h) {
          //$LASTPOS=26001176;//kernel.BodyActor:1176
          h=w;
        }
        //$LASTPOS=26001189;//kernel.BodyActor:1189
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=26001232;//kernel.BodyActor:1232
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=26001333;//kernel.BodyActor:1333
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=26001369;//kernel.BodyActor:1369
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=26001443;//kernel.BodyActor:1443
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=26001477;//kernel.BodyActor:1477
      fps = wworld.fps;
      //$LASTPOS=26001501;//kernel.BodyActor:1501
      r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
      //$LASTPOS=26001582;//kernel.BodyActor:1582
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=26001618;//kernel.BodyActor:1618
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=26001650;//kernel.BodyActor:1650
      _this.body.SetUserData(_this);
      //$LASTPOS=26001678;//kernel.BodyActor:1678
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=26001710;//kernel.BodyActor:1710
      _this.rotation=r;
      //$LASTPOS=26001726;//kernel.BodyActor:1726
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
      
      //$LASTPOS=26000162;//kernel.BodyActor:162
      wworld = _this.getWorld();
      //$LASTPOS=26000189;//kernel.BodyActor:189
      _this.world=wworld.world;
      //$LASTPOS=26000213;//kernel.BodyActor:213
      _this.scale=wworld.scale;
      //$LASTPOS=26000237;//kernel.BodyActor:237
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26000280;//kernel.BodyActor:280
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=26000326;//kernel.BodyActor:326
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=26000366;//kernel.BodyActor:366
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=26000418;//kernel.BodyActor:418
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=26000464;//kernel.BodyActor:464
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=26000528;//kernel.BodyActor:528
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=26000595;//kernel.BodyActor:595
      fixDef = new b2FixtureDef;
      
      _thread.enter(function _trc_BodyActor_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26000630;//kernel.BodyActor:630
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=1;return;
          case 1:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=26000671;//kernel.BodyActor:671
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=2;return;
          case 2:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=26000714;//kernel.BodyActor:714
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=3;return;
          case 3:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=26000768;//kernel.BodyActor:768
            bodyDef = new b2BodyDef;
            //$LASTPOS=26000801;//kernel.BodyActor:801
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=26000886;//kernel.BodyActor:886
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=26000921;//kernel.BodyActor:921
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=26000956;//kernel.BodyActor:956
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=26001004;//kernel.BodyActor:1004
            w = _this.width;h = _this.height;
            //$LASTPOS=26001030;//kernel.BodyActor:1030
            if (! w) {
              //$LASTPOS=26001048;//kernel.BodyActor:1048
              _this.detectShape();
              //$LASTPOS=26001071;//kernel.BodyActor:1071
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=26001100;//kernel.BodyActor:1100
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=26001140;//kernel.BodyActor:1140
            if (_this.shape=="box") {
              //$LASTPOS=26001168;//kernel.BodyActor:1168
              if (! h) {
                //$LASTPOS=26001176;//kernel.BodyActor:1176
                h=w;
              }
              //$LASTPOS=26001189;//kernel.BodyActor:1189
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=26001232;//kernel.BodyActor:1232
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=26001333;//kernel.BodyActor:1333
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=26001369;//kernel.BodyActor:1369
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=26001443;//kernel.BodyActor:1443
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=26001477;//kernel.BodyActor:1477
            fps = wworld.fps;
            //$LASTPOS=26001501;//kernel.BodyActor:1501
            r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
            //$LASTPOS=26001582;//kernel.BodyActor:1582
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=26001618;//kernel.BodyActor:1618
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=26001650;//kernel.BodyActor:1650
            _this.body.SetUserData(_this);
            //$LASTPOS=26001678;//kernel.BodyActor:1678
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=26001710;//kernel.BodyActor:1710
            _this.rotation=r;
            //$LASTPOS=26001726;//kernel.BodyActor:1726
            _this.vrotation=vr;
            _thread.exit(_this);return;
          }
        }
      });
    },
    allContact :function _trc_BodyActor_allContact(klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var c;
      var a;
      var b;
      
      //$LASTPOS=26001767;//kernel.BodyActor:1767
      res = [];
      //$LASTPOS=26001783;//kernel.BodyActor:1783
      //$LASTPOS=26001788;//kernel.BodyActor:1788
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=26001844;//kernel.BodyActor:1844
          if (c.IsTouching()) {
            //$LASTPOS=26001878;//kernel.BodyActor:1878
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=26001937;//kernel.BodyActor:1937
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=26001996;//kernel.BodyActor:1996
            if (a===_this) {
              //$LASTPOS=26002028;//kernel.BodyActor:2028
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=26002097;//kernel.BodyActor:2097
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=26002147;//kernel.BodyActor:2147
              if (b===_this) {
                //$LASTPOS=26002179;//kernel.BodyActor:2179
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=26002248;//kernel.BodyActor:2248
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
    fiber$allContact :function _trc_BodyActor_f_allContact(_thread,klass) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var c;
      var a;
      var b;
      
      //$LASTPOS=26001767;//kernel.BodyActor:1767
      res = [];
      //$LASTPOS=26001783;//kernel.BodyActor:1783
      //$LASTPOS=26001788;//kernel.BodyActor:1788
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=26001844;//kernel.BodyActor:1844
          if (c.IsTouching()) {
            //$LASTPOS=26001878;//kernel.BodyActor:1878
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=26001937;//kernel.BodyActor:1937
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=26001996;//kernel.BodyActor:1996
            if (a===_this) {
              //$LASTPOS=26002028;//kernel.BodyActor:2028
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=26002097;//kernel.BodyActor:2097
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=26002147;//kernel.BodyActor:2147
              if (b===_this) {
                //$LASTPOS=26002179;//kernel.BodyActor:2179
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=26002248;//kernel.BodyActor:2248
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
      
      //$LASTPOS=26002358;//kernel.BodyActor:2358
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26002401;//kernel.BodyActor:2401
      scale = _this.getWorld().scale;
      //$LASTPOS=26002433;//kernel.BodyActor:2433
      fps = 60;
      //$LASTPOS=26002449;//kernel.BodyActor:2449
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=26002358;//kernel.BodyActor:2358
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26002401;//kernel.BodyActor:2401
      scale = _this.getWorld().scale;
      //$LASTPOS=26002433;//kernel.BodyActor:2433
      fps = 60;
      //$LASTPOS=26002449;//kernel.BodyActor:2449
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=26002540;//kernel.BodyActor:2540
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26002583;//kernel.BodyActor:2583
      scale = _this.getWorld().scale;
      //$LASTPOS=26002615;//kernel.BodyActor:2615
      fps = 60;
      //$LASTPOS=26002631;//kernel.BodyActor:2631
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=26002540;//kernel.BodyActor:2540
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26002583;//kernel.BodyActor:2583
      scale = _this.getWorld().scale;
      //$LASTPOS=26002615;//kernel.BodyActor:2615
      fps = 60;
      //$LASTPOS=26002631;//kernel.BodyActor:2631
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26002714;//kernel.BodyActor:2714
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26002714;//kernel.BodyActor:2714
      _this.body.ApplyTorque(a);
      
      _thread.retVal=_this;return;
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=26002758;//kernel.BodyActor:2758
      pos = _this.body.GetPosition();
      //$LASTPOS=26002790;//kernel.BodyActor:2790
      pos.x+=dx/_this.scale;
      //$LASTPOS=26002811;//kernel.BodyActor:2811
      pos.y+=dy/_this.scale;
      //$LASTPOS=26002832;//kernel.BodyActor:2832
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      //$LASTPOS=26002758;//kernel.BodyActor:2758
      pos = _this.body.GetPosition();
      //$LASTPOS=26002790;//kernel.BodyActor:2790
      pos.x+=dx/_this.scale;
      //$LASTPOS=26002811;//kernel.BodyActor:2811
      pos.y+=dy/_this.scale;
      //$LASTPOS=26002832;//kernel.BodyActor:2832
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
      
      //$LASTPOS=26002917;//kernel.BodyActor:2917
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=26002934;//kernel.BodyActor:2934
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
      
      //$LASTPOS=26003022;//kernel.BodyActor:3022
      params=params||{};
      //$LASTPOS=26003045;//kernel.BodyActor:3045
      px = params.x||_this.x;
      //$LASTPOS=26003069;//kernel.BodyActor:3069
      py = params.y||_this.y;
      //$LASTPOS=26003093;//kernel.BodyActor:3093
      wworld = _this.getWorld();
      //$LASTPOS=26003134;//kernel.BodyActor:3134
      scale = wworld.scale;
      //$LASTPOS=26003162;//kernel.BodyActor:3162
      world = wworld.world;
      //$LASTPOS=26003190;//kernel.BodyActor:3190
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=26003236;//kernel.BodyActor:3236
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=26003276;//kernel.BodyActor:3276
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=26003330;//kernel.BodyActor:3330
      jd = new JDC;
      //$LASTPOS=26003350;//kernel.BodyActor:3350
      bodyDef = new b2BodyDef;
      //$LASTPOS=26003383;//kernel.BodyActor:3383
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=26003424;//kernel.BodyActor:3424
      bodyDef.position.x=px/scale;
      //$LASTPOS=26003460;//kernel.BodyActor:3460
      bodyDef.position.y=py/scale;
      //$LASTPOS=26003496;//kernel.BodyActor:3496
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=26003537;//kernel.BodyActor:3537
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26003580;//kernel.BodyActor:3580
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=26003642;//kernel.BodyActor:3642
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=26003695;//kernel.BodyActor:3695
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=26003742;//kernel.BodyActor:3742
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=26003789;//kernel.BodyActor:3789
        jd.enableLimit=true;
        
      }
      //$LASTPOS=26003822;//kernel.BodyActor:3822
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
      
      //$LASTPOS=26003022;//kernel.BodyActor:3022
      params=params||{};
      //$LASTPOS=26003045;//kernel.BodyActor:3045
      px = params.x||_this.x;
      //$LASTPOS=26003069;//kernel.BodyActor:3069
      py = params.y||_this.y;
      //$LASTPOS=26003093;//kernel.BodyActor:3093
      wworld = _this.getWorld();
      //$LASTPOS=26003134;//kernel.BodyActor:3134
      scale = wworld.scale;
      //$LASTPOS=26003162;//kernel.BodyActor:3162
      world = wworld.world;
      //$LASTPOS=26003190;//kernel.BodyActor:3190
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=26003236;//kernel.BodyActor:3236
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=26003276;//kernel.BodyActor:3276
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=26003330;//kernel.BodyActor:3330
      jd = new JDC;
      //$LASTPOS=26003350;//kernel.BodyActor:3350
      bodyDef = new b2BodyDef;
      //$LASTPOS=26003383;//kernel.BodyActor:3383
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=26003424;//kernel.BodyActor:3424
      bodyDef.position.x=px/scale;
      //$LASTPOS=26003460;//kernel.BodyActor:3460
      bodyDef.position.y=py/scale;
      //$LASTPOS=26003496;//kernel.BodyActor:3496
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=26003537;//kernel.BodyActor:3537
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=26003580;//kernel.BodyActor:3580
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=26003642;//kernel.BodyActor:3642
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=26003695;//kernel.BodyActor:3695
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=26003742;//kernel.BodyActor:3742
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=26003789;//kernel.BodyActor:3789
        jd.enableLimit=true;
        
      }
      //$LASTPOS=26003822;//kernel.BodyActor:3822
      world.CreateJoint(jd);
      
      _thread.retVal=_this;return;
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26003867;//kernel.BodyActor:3867
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26003967;//kernel.BodyActor:3967
      r=r||0;
      //$LASTPOS=26003979;//kernel.BodyActor:3979
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=26004032;//kernel.BodyActor:4032
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
      
      //$LASTPOS=26004215;//kernel.BodyActor:4215
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=26004241;//kernel.BodyActor:4241
      pos = _this.body.GetPosition();
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=26004306;//kernel.BodyActor:4306
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=26004334;//kernel.BodyActor:4334
      v=v||0;
      //$LASTPOS=26004346;//kernel.BodyActor:4346
      pos = _this.body.GetPosition();
      //$LASTPOS=26004378;//kernel.BodyActor:4378
      pos.x=v/_this.scale;
      //$LASTPOS=26004397;//kernel.BodyActor:4397
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=26004431;//kernel.BodyActor:4431
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=26004457;//kernel.BodyActor:4457
      pos = _this.body.GetPosition();
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=26004522;//kernel.BodyActor:4522
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=26004550;//kernel.BodyActor:4550
      v=v||0;
      //$LASTPOS=26004562;//kernel.BodyActor:4562
      pos = _this.body.GetPosition();
      //$LASTPOS=26004594;//kernel.BodyActor:4594
      pos.y=v/_this.scale;
      //$LASTPOS=26004613;//kernel.BodyActor:4613
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var v;
      
      //$LASTPOS=26004649;//kernel.BodyActor:4649
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=26004676;//kernel.BodyActor:4676
      v = _this.body.GetLinearVelocity();
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ve;
      
      //$LASTPOS=26004759;//kernel.BodyActor:4759
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=26004788;//kernel.BodyActor:4788
      v=v||0;
      //$LASTPOS=26004800;//kernel.BodyActor:4800
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=26004837;//kernel.BodyActor:4837
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=26004870;//kernel.BodyActor:4870
      if (v) {
        //$LASTPOS=26004877;//kernel.BodyActor:4877
        _this.body.SetAwake(true);
      }
      //$LASTPOS=26004902;//kernel.BodyActor:4902
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var v;
      
      //$LASTPOS=26004943;//kernel.BodyActor:4943
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=26004970;//kernel.BodyActor:4970
      v = _this.body.GetLinearVelocity();
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ve;
      
      //$LASTPOS=26005053;//kernel.BodyActor:5053
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=26005082;//kernel.BodyActor:5082
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=26005119;//kernel.BodyActor:5119
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=26005152;//kernel.BodyActor:5152
      if (v) {
        //$LASTPOS=26005159;//kernel.BodyActor:5159
        _this.body.SetAwake(true);
      }
      //$LASTPOS=26005184;//kernel.BodyActor:5184
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26005231;//kernel.BodyActor:5231
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26005333;//kernel.BodyActor:5333
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=26005362;//kernel.BodyActor:5362
      v=v||0;
      //$LASTPOS=26005374;//kernel.BodyActor:5374
      if (v) {
        //$LASTPOS=26005381;//kernel.BodyActor:5381
        _this.body.SetAwake(true);
      }
      //$LASTPOS=26005406;//kernel.BodyActor:5406
      _this.body.SetAngularVelocity(_this.rad(v*_this.getWorld().fps));
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"addRevoluteJoint":{"nowait":false},"__getter__rotation":{"nowait":true},"__setter__rotation":{"nowait":true},"updatePos":{"nowait":false},"__getter__x":{"nowait":true},"__setter__x":{"nowait":true},"__getter__y":{"nowait":true},"__setter__y":{"nowait":true},"__getter__vx":{"nowait":true},"__setter__vx":{"nowait":true},"__getter__vy":{"nowait":true},"__setter__vy":{"nowait":true},"__getter__vrotation":{"nowait":true},"__setter__vrotation":{"nowait":true}}}
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
      
      //$LASTPOS=27000150;//kernel.T2World:150
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
            //$LASTPOS=27000150;//kernel.T2World:150
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
      
      //$LASTPOS=27000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=27000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000133;//kernel.T2World:133
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
      
      //$LASTPOS=27000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=27000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=27000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=27000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      //$LASTPOS=27000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=27000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=27000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=27000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=27000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=27000572;//kernel.T2World:572
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
            //$LASTPOS=27000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=27000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=27000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=27000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            //$LASTPOS=27000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            //$LASTPOS=27000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=27000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=27000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=27000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=27000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=27000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=27000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=27000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=27000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=27000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=27000976;//kernel.T2World:976
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
            //$LASTPOS=27000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=27000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=27000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=27000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=27000976;//kernel.T2World:976
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
      
      //$LASTPOS=27001017;//kernel.T2World:1017
      //$LASTPOS=27001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=27001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=27001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=27001114;//kernel.T2World:1114
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
      
      //$LASTPOS=27001017;//kernel.T2World:1017
      //$LASTPOS=27001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=27001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=27001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=27001114;//kernel.T2World:1114
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
      
      //$LASTPOS=28000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=28000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        return _this;
      }
      //$LASTPOS=28000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=28000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=28000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=28000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=28000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=28000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    clearSEData :function _trc_T2MediaPlayer_clearSEData() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=28000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=28000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=28000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=28000367;//kernel.T2MediaPlayer:367
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
            //$LASTPOS=28000367;//kernel.T2MediaPlayer:367
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
      
      //$LASTPOS=28000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var data;
      
      //$LASTPOS=28000508;//kernel.T2MediaPlayer:508
      _this.runAsync((function anonymous_517(succ,err) {
        
        //$LASTPOS=28000567;//kernel.T2MediaPlayer:567
        T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
      }));
      //$LASTPOS=28000620;//kernel.T2MediaPlayer:620
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
            //$LASTPOS=28000508;//kernel.T2MediaPlayer:508
            _this.fiber$runAsync(_thread, (function anonymous_517(succ,err) {
              
              //$LASTPOS=28000567;//kernel.T2MediaPlayer:567
              T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
            }));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=28000620;//kernel.T2MediaPlayer:620
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
      var _it_265;
      var name;
      var url;
      var e;
      
      //$LASTPOS=28000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=28000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=28000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=28000974;//kernel.T2MediaPlayer:974
      _it_265=Tonyu.iterator(r.sounds,1);
      while(_it_265.next()) {
        s=_it_265[0];
        
        //$LASTPOS=28001010;//kernel.T2MediaPlayer:1010
        name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
        //$LASTPOS=28001084;//kernel.T2MediaPlayer:1084
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=28001142;//kernel.T2MediaPlayer:1142
          _this.print("Loading Sound2: "+name);
          //$LASTPOS=28001187;//kernel.T2MediaPlayer:1187
          _this.loadSE(name,url);
          
        } catch (e) {
          //$LASTPOS=28001242;//kernel.T2MediaPlayer:1242
          _this.print("Fail");
          //$LASTPOS=28001270;//kernel.T2MediaPlayer:1270
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
      var _it_265;
      var name;
      var url;
      var e;
      
      //$LASTPOS=28000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=28000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=28000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=28000974;//kernel.T2MediaPlayer:974
            _it_265=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_265.next())) { __pc=5; break; }
            s=_it_265[0];
            
            //$LASTPOS=28001010;//kernel.T2MediaPlayer:1010
            name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
            //$LASTPOS=28001084;//kernel.T2MediaPlayer:1084
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3);
            //$LASTPOS=28001142;//kernel.T2MediaPlayer:1142
            _this.print("Loading Sound2: "+name);
            //$LASTPOS=28001187;//kernel.T2MediaPlayer:1187
            _this.fiber$loadSE(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4;break;
          case 3:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=28001242;//kernel.T2MediaPlayer:1242
              _this.print("Fail");
              //$LASTPOS=28001270;//kernel.T2MediaPlayer:1270
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
      
      //$LASTPOS=28001408;//kernel.T2MediaPlayer:1408
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=28001467;//kernel.T2MediaPlayer:1467
      if (vol==null) {
        //$LASTPOS=28001484;//kernel.T2MediaPlayer:1484
        vol=128;
      }
      //$LASTPOS=28001573;//kernel.T2MediaPlayer:1573
      if (vol<0) {
        //$LASTPOS=28001593;//kernel.T2MediaPlayer:1593
        vol=0;
      } else {
        //$LASTPOS=28001614;//kernel.T2MediaPlayer:1614
        if (vol>128) {
          //$LASTPOS=28001629;//kernel.T2MediaPlayer:1629
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
      
      //$LASTPOS=28001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=28001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      //$LASTPOS=28002024;//kernel.T2MediaPlayer:2024
      while (data==null) {
        //$LASTPOS=28002056;//kernel.T2MediaPlayer:2056
        _this.update();
        //$LASTPOS=28002075;//kernel.T2MediaPlayer:2075
        data=T2MediaLib.getBGMData(idx);
        
      }
      return data;
    },
    fiber$loadBGM :function _trc_T2MediaPlayer_f_loadBGM(_thread,idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var data;
      
      //$LASTPOS=28001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=28001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=28002024;//kernel.T2MediaPlayer:2024
          case 1:
            if (!(data==null)) { __pc=3; break; }
            //$LASTPOS=28002056;//kernel.T2MediaPlayer:2056
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=28002075;//kernel.T2MediaPlayer:2075
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
      
      //$LASTPOS=28002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=28002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=28002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=28002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=28002278;//kernel.T2MediaPlayer:2278
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=28002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=28002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=28002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=28002278;//kernel.T2MediaPlayer:2278
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
      
      //$LASTPOS=28002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=28002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=28002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=28002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=28002715;//kernel.T2MediaPlayer:2715
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=28002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=28002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=28002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=28002715;//kernel.T2MediaPlayer:2715
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
      
      //$LASTPOS=28003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=28003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=28003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=28003278;//kernel.T2MediaPlayer:3278
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=28003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=28003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=28003278;//kernel.T2MediaPlayer:3278
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
      
      //$LASTPOS=28003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=28003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=28003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=28003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=28003737;//kernel.T2MediaPlayer:3737
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=28003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=28003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=28003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=28003737;//kernel.T2MediaPlayer:3737
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
      
      //$LASTPOS=28004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=28004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=28004338;//kernel.T2MediaPlayer:4338
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=28004383;//kernel.T2MediaPlayer:4383
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=28004338;//kernel.T2MediaPlayer:4338
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
            //$LASTPOS=28004383;//kernel.T2MediaPlayer:4383
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
      
      //$LASTPOS=28004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=28004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=28004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=28004501;//kernel.T2MediaPlayer:4501
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=28004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=28004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=28004501;//kernel.T2MediaPlayer:4501
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
      
      //$LASTPOS=28004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=28004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=28004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=28004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=28004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      return T2MediaLib.setAudioVolume(vol);
    },
    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=28004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=28004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=28004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=28004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=28004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=28004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=28004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=28005013;//kernel.T2MediaPlayer:5013
          tempo=0.5;
        }
      }
      return T2MediaLib.setAudioTempo(tempo);
    },
    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=28004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=28004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=28005013;//kernel.T2MediaPlayer:5013
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
      
      //$LASTPOS=29000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=29000309;//kernel.PlainChar:309
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=29000355;//kernel.PlainChar:355
        _this.initSprite();
        
      }
      //$LASTPOS=29000381;//kernel.PlainChar:381
      if (typeof  x=="object") {
        //$LASTPOS=29000405;//kernel.PlainChar:405
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=29000437;//kernel.PlainChar:437
        if (typeof  x=="number") {
          //$LASTPOS=29000472;//kernel.PlainChar:472
          _this.x=x;
          //$LASTPOS=29000491;//kernel.PlainChar:491
          _this.y=y;
          //$LASTPOS=29000510;//kernel.PlainChar:510
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000547;//kernel.PlainChar:547
      _this.onDraw();
      //$LASTPOS=29000562;//kernel.PlainChar:562
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=29000593;//kernel.PlainChar:593
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000634;//kernel.PlainChar:634
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000634;//kernel.PlainChar:634
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
      
      //$LASTPOS=29000690;//kernel.PlainChar:690
      _this.onUpdate();
      //$LASTPOS=29000707;//kernel.PlainChar:707
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000690;//kernel.PlainChar:690
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000707;//kernel.PlainChar:707
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
      
      //$LASTPOS=29000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=29000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=29000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=29000890;//kernel.PlainChar:890
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=29000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=29000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000890;//kernel.PlainChar:890
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
      
      //$LASTPOS=29000922;//kernel.PlainChar:922
      _this.main();
      //$LASTPOS=29000935;//kernel.PlainChar:935
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
            //$LASTPOS=29000922;//kernel.PlainChar:922
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=29000935;//kernel.PlainChar:935
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
      
      //$LASTPOS=29001673;//kernel.PlainChar:1673
      _this.all().die();
      //$LASTPOS=29001691;//kernel.PlainChar:1691
      new page(arg);
      //$LASTPOS=29001711;//kernel.PlainChar:1711
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29001673;//kernel.PlainChar:1673
      _this.all().die();
      //$LASTPOS=29001691;//kernel.PlainChar:1691
      new page(arg);
      //$LASTPOS=29001711;//kernel.PlainChar:1711
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
      
      //$LASTPOS=30000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=30000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=30000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=30000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=30000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=30000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=30000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=30000146;//kernel.SpriteChar:146
        _this.p=0;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30000176;//kernel.SpriteChar:176
      if (_this.f) {
        //$LASTPOS=30000194;//kernel.SpriteChar:194
        if (! _this.scaleY) {
          //$LASTPOS=30000207;//kernel.SpriteChar:207
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=30000231;//kernel.SpriteChar:231
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=30000255;//kernel.SpriteChar:255
      Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=30000275;//kernel.SpriteChar:275
      if (_this.f) {
        //$LASTPOS=30000282;//kernel.SpriteChar:282
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
      
      //$LASTPOS=31000034;//kernel.T1Line:34
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=31000065;//kernel.T1Line:65
      ctx.strokeStyle=_this.col;
      //$LASTPOS=31000091;//kernel.T1Line:91
      ctx.beginPath();
      //$LASTPOS=31000113;//kernel.T1Line:113
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=31000135;//kernel.T1Line:135
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=31000159;//kernel.T1Line:159
      ctx.stroke();
      //$LASTPOS=31000178;//kernel.T1Line:178
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
      
      //$LASTPOS=32000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=32000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var o;
      
      //$LASTPOS=32000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=32000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=32000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=32000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=32000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=32000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=32000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=32000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=32000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=32000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=32000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=32000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=32000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=32000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=32000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=32000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=32000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=32000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=32000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=32000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=32000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=32000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=32000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=32000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=32000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=32000885;//kernel.T1Map:885
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
      
      //$LASTPOS=32000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=32000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=32000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=32000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=32001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=32001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=32001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=32001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=32001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=32000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=32000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=32000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=32000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=32001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=32001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=32001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=32001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=32001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=33000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=33000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=33000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=33000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=33000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=33000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=33000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=33000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=33000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=33000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=33000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=33000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000103;//kernel.T1Page:103
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=33000131;//kernel.T1Page:131
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=33000159;//kernel.T1Page:159
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=33000189;//kernel.T1Page:189
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=33000222;//kernel.T1Page:222
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=33000251;//kernel.T1Page:251
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=33000282;//kernel.T1Page:282
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=33000313;//kernel.T1Page:313
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=33000347;//kernel.T1Page:347
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
      
      //$LASTPOS=34000032;//kernel.T1Text:32
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=34000057;//kernel.T1Text:57
      c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=34000097;//kernel.T1Text:97
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=34000117;//kernel.T1Text:117
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
      
      //$LASTPOS=35000070;//kernel.TextChar:70
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=35000089;//kernel.TextChar:89
      _this.text="";
      //$LASTPOS=35000103;//kernel.TextChar:103
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=35000122;//kernel.TextChar:122
      _this.size=20;
      //$LASTPOS=35000136;//kernel.TextChar:136
      if (! _this.x) {
        //$LASTPOS=35000149;//kernel.TextChar:149
        _this.x=0;
      }
      //$LASTPOS=35000164;//kernel.TextChar:164
      if (! _this.y) {
        //$LASTPOS=35000177;//kernel.TextChar:177
        _this.y=0;
      }
      //$LASTPOS=35000192;//kernel.TextChar:192
      if (t) {
        //$LASTPOS=35000199;//kernel.TextChar:199
        _this.text=t;
      }
      //$LASTPOS=35000212;//kernel.TextChar:212
      if (c) {
        //$LASTPOS=35000219;//kernel.TextChar:219
        _this.fillStyle=c;
      }
      //$LASTPOS=35000237;//kernel.TextChar:237
      if (s) {
        //$LASTPOS=35000244;//kernel.TextChar:244
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var rect;
      
      //$LASTPOS=35000274;//kernel.TextChar:274
      if (! _this.size) {
        //$LASTPOS=35000285;//kernel.TextChar:285
        _this.size=15;
      }
      //$LASTPOS=35000299;//kernel.TextChar:299
      if (! _this.align) {
        //$LASTPOS=35000311;//kernel.TextChar:311
        _this.align="left";
      }
      //$LASTPOS=35000330;//kernel.TextChar:330
      if (! _this.fillStyle) {
        //$LASTPOS=35000346;//kernel.TextChar:346
        _this.fillStyle="white";
      }
      //$LASTPOS=35000370;//kernel.TextChar:370
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=35000400;//kernel.TextChar:400
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=35000437;//kernel.TextChar:437
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=35000473;//kernel.TextChar:473
      rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
      //$LASTPOS=35000540;//kernel.TextChar:540
      _this.width=rect.w;
      //$LASTPOS=35000559;//kernel.TextChar:559
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
      
      //$LASTPOS=36000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=36000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=36000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=36000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=36000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=36000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=36000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=36000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var larger;
      var smaller;
      
      //$LASTPOS=36000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=36000469;//kernel.GameConsole:469
      smaller = 5;
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_GameConsole_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=36000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=36000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=36000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=36000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=36000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=36000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=36000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=36000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=36000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=36000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=36000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=36000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=36000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=36000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=36000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=36000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=36001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=36001049;//kernel.GameConsole:1049
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
      
      //$LASTPOS=36000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=36000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=36000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=36000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=36000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=36000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=36000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=36000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=36000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=36000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=36000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=36000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=36000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=36000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=36001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=36001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=36001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=36001159;//kernel.GameConsole:1159
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
      
      //$LASTPOS=37000032;//kernel.MapEditor:32
      _this.loadMode=false;
      //$LASTPOS=37000049;//kernel.MapEditor:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=37000079;//kernel.MapEditor:79
      while (true) {
        //$LASTPOS=37000097;//kernel.MapEditor:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=37000125;//kernel.MapEditor:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=37000168;//kernel.MapEditor:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=37000196;//kernel.MapEditor:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=37000240;//kernel.MapEditor:240
        _this.update();
        
      }
      //$LASTPOS=37000254;//kernel.MapEditor:254
      if (_this.loadMode) {
        //$LASTPOS=37000273;//kernel.MapEditor:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=37000334;//kernel.MapEditor:334
        if (_this.fileName) {
          //$LASTPOS=37000357;//kernel.MapEditor:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=37000413;//kernel.MapEditor:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=37000445;//kernel.MapEditor:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=37000494;//kernel.MapEditor:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=37000531;//kernel.MapEditor:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=37000567;//kernel.MapEditor:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=37000618;//kernel.MapEditor:618
        if (_this.baseData==undefined) {
          //$LASTPOS=37000652;//kernel.MapEditor:652
          _this.print("Load failed");
          //$LASTPOS=37000683;//kernel.MapEditor:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=37000710;//kernel.MapEditor:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=37000751;//kernel.MapEditor:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=37000781;//kernel.MapEditor:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=37000815;//kernel.MapEditor:815
      _this.update();
      //$LASTPOS=37001093;//kernel.MapEditor:1093
      if (! _this.loadMode) {
        //$LASTPOS=37001113;//kernel.MapEditor:1113
        _this.row=prompt("input row");
        //$LASTPOS=37001143;//kernel.MapEditor:1143
        _this.update();
        //$LASTPOS=37001158;//kernel.MapEditor:1158
        _this.col=prompt("input col");
        //$LASTPOS=37001188;//kernel.MapEditor:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=37001238;//kernel.MapEditor:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=37001269;//kernel.MapEditor:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=37001298;//kernel.MapEditor:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=37001331;//kernel.MapEditor:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=37001382;//kernel.MapEditor:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=37001445;//kernel.MapEditor:1445
        if (! _this.mapOnData) {
          //$LASTPOS=37001470;//kernel.MapEditor:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=37001582;//kernel.MapEditor:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=37001695;//kernel.MapEditor:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=37001766;//kernel.MapEditor:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=37001794;//kernel.MapEditor:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=37001823;//kernel.MapEditor:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=37001856;//kernel.MapEditor:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=37001906;//kernel.MapEditor:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=37001961;//kernel.MapEditor:1961
      _this.counter=0;
      //$LASTPOS=37001973;//kernel.MapEditor:1973
      //$LASTPOS=37001977;//kernel.MapEditor:1977
      i = 0;
      while(i<16) {
        {
          //$LASTPOS=37002001;//kernel.MapEditor:2001
          //$LASTPOS=37002005;//kernel.MapEditor:2005
          j = 0;
          while(j<8) {
            {
              //$LASTPOS=37002032;//kernel.MapEditor:2032
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=37002076;//kernel.MapEditor:2076
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=37002098;//kernel.MapEditor:2098
      _this.mode="get";
      //$LASTPOS=37002111;//kernel.MapEditor:2111
      _this.prevMode="set";
      //$LASTPOS=37002128;//kernel.MapEditor:2128
      _this.mapp=0;
      //$LASTPOS=37002137;//kernel.MapEditor:2137
      _this.mx=0;
      //$LASTPOS=37002144;//kernel.MapEditor:2144
      _this.my=0;
      //$LASTPOS=37002151;//kernel.MapEditor:2151
      _this.chipX=0;
      //$LASTPOS=37002161;//kernel.MapEditor:2161
      _this.chipY=0;
      //$LASTPOS=37002171;//kernel.MapEditor:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=37002191;//kernel.MapEditor:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=37002212;//kernel.MapEditor:2212
      while (true) {
        //$LASTPOS=37002230;//kernel.MapEditor:2230
        _this.p=_this.mapp;
        //$LASTPOS=37002243;//kernel.MapEditor:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=37002272;//kernel.MapEditor:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=37002306;//kernel.MapEditor:2306
          _this.mode="erase";
          //$LASTPOS=37002329;//kernel.MapEditor:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=37002362;//kernel.MapEditor:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=37002391;//kernel.MapEditor:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=37002425;//kernel.MapEditor:2425
          if (_this.mode=="set") {
            //$LASTPOS=37002455;//kernel.MapEditor:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=37002498;//kernel.MapEditor:2498
            _this.mode="set";
            
          }
          //$LASTPOS=37002530;//kernel.MapEditor:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=37002563;//kernel.MapEditor:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=37002592;//kernel.MapEditor:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=37002626;//kernel.MapEditor:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=37002652;//kernel.MapEditor:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=37002681;//kernel.MapEditor:2681
          if (_this.mode!="get") {
            //$LASTPOS=37002711;//kernel.MapEditor:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=37002739;//kernel.MapEditor:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=37002771;//kernel.MapEditor:2771
            _this.mode="get";
            //$LASTPOS=37002796;//kernel.MapEditor:2796
            _this.chipX=0;
            //$LASTPOS=37002818;//kernel.MapEditor:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=37002856;//kernel.MapEditor:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=37002894;//kernel.MapEditor:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=37002929;//kernel.MapEditor:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=37002962;//kernel.MapEditor:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=37003006;//kernel.MapEditor:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=37003495;//kernel.MapEditor:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=37003553;//kernel.MapEditor:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=37003668;//kernel.MapEditor:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=37003701;//kernel.MapEditor:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=37003793;//kernel.MapEditor:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=37003822;//kernel.MapEditor:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=37003856;//kernel.MapEditor:3856
          _this.mode="spuit";
          //$LASTPOS=37003879;//kernel.MapEditor:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=37003912;//kernel.MapEditor:3912
        if (_this.mode!="get") {
          //$LASTPOS=37003938;//kernel.MapEditor:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=37003959;//kernel.MapEditor:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=37003977;//kernel.MapEditor:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=37003999;//kernel.MapEditor:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=37004017;//kernel.MapEditor:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=37004036;//kernel.MapEditor:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=37004054;//kernel.MapEditor:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=37004075;//kernel.MapEditor:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=37004093;//kernel.MapEditor:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=37004136;//kernel.MapEditor:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=37004157;//kernel.MapEditor:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=37004181;//kernel.MapEditor:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=37004203;//kernel.MapEditor:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=37004227;//kernel.MapEditor:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=37004246;//kernel.MapEditor:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=37004270;//kernel.MapEditor:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=37004291;//kernel.MapEditor:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=37004315;//kernel.MapEditor:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=37004354;//kernel.MapEditor:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=37004385;//kernel.MapEditor:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=37004417;//kernel.MapEditor:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=37004458;//kernel.MapEditor:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=37004507;//kernel.MapEditor:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=37004558;//kernel.MapEditor:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=37004601;//kernel.MapEditor:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=37004650;//kernel.MapEditor:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=37004691;//kernel.MapEditor:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=37004745;//kernel.MapEditor:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=37004769;//kernel.MapEditor:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=37004803;//kernel.MapEditor:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=37004833;//kernel.MapEditor:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=37004858;//kernel.MapEditor:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=37004901;//kernel.MapEditor:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=37004954;//kernel.MapEditor:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=37004997;//kernel.MapEditor:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=37005046;//kernel.MapEditor:5046
                  _this.mode="set";
                  //$LASTPOS=37005067;//kernel.MapEditor:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=37005097;//kernel.MapEditor:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=37005123;//kernel.MapEditor:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=37000032;//kernel.MapEditor:32
      _this.loadMode=false;
      //$LASTPOS=37000049;//kernel.MapEditor:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=37000079;//kernel.MapEditor:79
          case 1:
            //$LASTPOS=37000097;//kernel.MapEditor:97
            if (!(_this.getkey("y")>0)) { __pc=2; break; }
            //$LASTPOS=37000125;//kernel.MapEditor:125
            _this.loadMode=true;
            __pc=5; break;
            
          case 2:
            
            //$LASTPOS=37000168;//kernel.MapEditor:168
            if (!(_this.getkey("n")>0)) { __pc=3; break; }
            //$LASTPOS=37000196;//kernel.MapEditor:196
            _this.loadMode=false;
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=37000240;//kernel.MapEditor:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=37000254;//kernel.MapEditor:254
            if (!(_this.loadMode)) { __pc=9; break; }
            //$LASTPOS=37000273;//kernel.MapEditor:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=37000334;//kernel.MapEditor:334
            if (_this.fileName) {
              //$LASTPOS=37000357;//kernel.MapEditor:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=37000413;//kernel.MapEditor:413
            if (!(_this.mapDataFile.obj())) { __pc=6; break; }
            {
              //$LASTPOS=37000445;//kernel.MapEditor:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8;break;
          case 6:
            //$LASTPOS=37000494;//kernel.MapEditor:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=37000531;//kernel.MapEditor:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=37000567;//kernel.MapEditor:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8:
            
            //$LASTPOS=37000618;//kernel.MapEditor:618
            if (_this.baseData==undefined) {
              //$LASTPOS=37000652;//kernel.MapEditor:652
              _this.print("Load failed");
              //$LASTPOS=37000683;//kernel.MapEditor:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=37000710;//kernel.MapEditor:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=37000751;//kernel.MapEditor:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=37000781;//kernel.MapEditor:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9:
            
            //$LASTPOS=37000815;//kernel.MapEditor:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=37001093;//kernel.MapEditor:1093
            if (!(! _this.loadMode)) { __pc=12; break; }
            //$LASTPOS=37001113;//kernel.MapEditor:1113
            _this.row=prompt("input row");
            //$LASTPOS=37001143;//kernel.MapEditor:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=37001158;//kernel.MapEditor:1158
            _this.col=prompt("input col");
            //$LASTPOS=37001188;//kernel.MapEditor:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=37001238;//kernel.MapEditor:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=37001269;//kernel.MapEditor:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=37001298;//kernel.MapEditor:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=37001331;//kernel.MapEditor:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=37001382;//kernel.MapEditor:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13;break;
          case 12:
            {
              //$LASTPOS=37001445;//kernel.MapEditor:1445
              if (! _this.mapOnData) {
                //$LASTPOS=37001470;//kernel.MapEditor:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=37001582;//kernel.MapEditor:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=37001695;//kernel.MapEditor:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=37001766;//kernel.MapEditor:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=37001794;//kernel.MapEditor:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=37001823;//kernel.MapEditor:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=37001856;//kernel.MapEditor:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13:
            
            //$LASTPOS=37001906;//kernel.MapEditor:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=37001961;//kernel.MapEditor:1961
            _this.counter=0;
            //$LASTPOS=37001973;//kernel.MapEditor:1973
            //$LASTPOS=37001977;//kernel.MapEditor:1977
            i = 0;
            while(i<16) {
              {
                //$LASTPOS=37002001;//kernel.MapEditor:2001
                //$LASTPOS=37002005;//kernel.MapEditor:2005
                j = 0;
                while(j<8) {
                  {
                    //$LASTPOS=37002032;//kernel.MapEditor:2032
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=37002076;//kernel.MapEditor:2076
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=37002098;//kernel.MapEditor:2098
            _this.mode="get";
            //$LASTPOS=37002111;//kernel.MapEditor:2111
            _this.prevMode="set";
            //$LASTPOS=37002128;//kernel.MapEditor:2128
            _this.mapp=0;
            //$LASTPOS=37002137;//kernel.MapEditor:2137
            _this.mx=0;
            //$LASTPOS=37002144;//kernel.MapEditor:2144
            _this.my=0;
            //$LASTPOS=37002151;//kernel.MapEditor:2151
            _this.chipX=0;
            //$LASTPOS=37002161;//kernel.MapEditor:2161
            _this.chipY=0;
            //$LASTPOS=37002171;//kernel.MapEditor:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=37002191;//kernel.MapEditor:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=37002212;//kernel.MapEditor:2212
          case 14:
            //$LASTPOS=37002230;//kernel.MapEditor:2230
            _this.p=_this.mapp;
            //$LASTPOS=37002243;//kernel.MapEditor:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=37002272;//kernel.MapEditor:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=37002306;//kernel.MapEditor:2306
              _this.mode="erase";
              //$LASTPOS=37002329;//kernel.MapEditor:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=37002362;//kernel.MapEditor:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=37002391;//kernel.MapEditor:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=37002425;//kernel.MapEditor:2425
              if (_this.mode=="set") {
                //$LASTPOS=37002455;//kernel.MapEditor:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=37002498;//kernel.MapEditor:2498
                _this.mode="set";
                
              }
              //$LASTPOS=37002530;//kernel.MapEditor:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=37002563;//kernel.MapEditor:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=37002592;//kernel.MapEditor:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=37002626;//kernel.MapEditor:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=37002652;//kernel.MapEditor:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=37002681;//kernel.MapEditor:2681
              if (_this.mode!="get") {
                //$LASTPOS=37002711;//kernel.MapEditor:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=37002739;//kernel.MapEditor:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=37002771;//kernel.MapEditor:2771
                _this.mode="get";
                //$LASTPOS=37002796;//kernel.MapEditor:2796
                _this.chipX=0;
                //$LASTPOS=37002818;//kernel.MapEditor:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=37002856;//kernel.MapEditor:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=37002894;//kernel.MapEditor:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=37002929;//kernel.MapEditor:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=37002962;//kernel.MapEditor:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=37003006;//kernel.MapEditor:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=37003495;//kernel.MapEditor:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=37003553;//kernel.MapEditor:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=37003668;//kernel.MapEditor:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=37003701;//kernel.MapEditor:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=37003793;//kernel.MapEditor:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=37003822;//kernel.MapEditor:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=37003856;//kernel.MapEditor:3856
              _this.mode="spuit";
              //$LASTPOS=37003879;//kernel.MapEditor:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=37003912;//kernel.MapEditor:3912
            if (_this.mode!="get") {
              //$LASTPOS=37003938;//kernel.MapEditor:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=37003959;//kernel.MapEditor:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=37003977;//kernel.MapEditor:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=37003999;//kernel.MapEditor:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=37004017;//kernel.MapEditor:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=37004036;//kernel.MapEditor:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=37004054;//kernel.MapEditor:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=37004075;//kernel.MapEditor:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=37004093;//kernel.MapEditor:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=37004136;//kernel.MapEditor:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=37004157;//kernel.MapEditor:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=37004181;//kernel.MapEditor:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=37004203;//kernel.MapEditor:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=37004227;//kernel.MapEditor:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=37004246;//kernel.MapEditor:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=37004270;//kernel.MapEditor:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=37004291;//kernel.MapEditor:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=37004315;//kernel.MapEditor:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=37004354;//kernel.MapEditor:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=37004385;//kernel.MapEditor:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=37004417;//kernel.MapEditor:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
            {
              //$LASTPOS=37004458;//kernel.MapEditor:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=37004507;//kernel.MapEditor:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=37004558;//kernel.MapEditor:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
            {
              //$LASTPOS=37004601;//kernel.MapEditor:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=37004650;//kernel.MapEditor:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
            //$LASTPOS=37004691;//kernel.MapEditor:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=37004745;//kernel.MapEditor:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=37004769;//kernel.MapEditor:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=37004803;//kernel.MapEditor:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=37004833;//kernel.MapEditor:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=37004858;//kernel.MapEditor:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
            {
              //$LASTPOS=37004901;//kernel.MapEditor:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=37004954;//kernel.MapEditor:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
            //$LASTPOS=37004997;//kernel.MapEditor:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=37005046;//kernel.MapEditor:5046
            _this.mode="set";
            //$LASTPOS=37005067;//kernel.MapEditor:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=37005097;//kernel.MapEditor:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=37005123;//kernel.MapEditor:5123
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
      
      //$LASTPOS=38001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=38003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=38003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=38003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=38003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=38003502;//kernel.Pad:3502
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
      
      //$LASTPOS=38000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=38000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=38000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=38000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=38000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=38000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=38000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=38000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=38000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=38000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=38001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=38001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=38001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=38001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=38001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=38001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=38001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=38001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var t;
      
      //$LASTPOS=38001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=38001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=38001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=38001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=38001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=38001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=38001383;//kernel.Pad:1383
      //$LASTPOS=38001388;//kernel.Pad:1388
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=38001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=38001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=38001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=38001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=38001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=38001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=38001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=38001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=38001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=38001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=38001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=38002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=38002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=38002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
        i++;
      }
      //$LASTPOS=38002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=38002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=38002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=38002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=38002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=38002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=38002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=38002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=38002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=38002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=38002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=38002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=38002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=38002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=38002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=38002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=38002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=38002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=38002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=38002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=38002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=38002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=38002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=38002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=38002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=38002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=38002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=38002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=38002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=38002739;//kernel.Pad:2739
        _this.jujiKeyPush1.hide();
      }
    },
    fiber$padUpdate :function _trc_Pad_f_padUpdate(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var t;
      
      //$LASTPOS=38001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=38001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=38001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=38001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=38001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=38001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=38001383;//kernel.Pad:1383
      //$LASTPOS=38001388;//kernel.Pad:1388
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=38001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=38001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=38001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=38001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=38001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=38001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=38001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=38001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=38001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=38001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=38001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=38002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=38002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=38002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
        i++;
      }
      //$LASTPOS=38002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=38002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=38002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=38002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=38002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=38002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=38002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=38002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=38002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=38002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=38002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=38002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=38002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=38002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=38002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=38002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=38002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=38002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=38002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=38002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=38002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=38002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=38002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=38002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=38002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=38002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=38002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=38002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=38002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=38002739;//kernel.Pad:2739
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
      
      //$LASTPOS=38002940;//kernel.Pad:2940
      value;
      //$LASTPOS=38002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=38002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      //$LASTPOS=38002940;//kernel.Pad:2940
      value;
      //$LASTPOS=38002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=38002968;//kernel.Pad:2968
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
      
      //$LASTPOS=38003163;//kernel.Pad:3163
      value;
      //$LASTPOS=38003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=38003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      //$LASTPOS=38003163;//kernel.Pad:3163
      value;
      //$LASTPOS=38003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=38003191;//kernel.Pad:3191
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
      
      //$LASTPOS=39002040;//kernel.Boot:2040
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=39002053;//kernel.Boot:2053
      _this.initSounds();
      //$LASTPOS=39002068;//kernel.Boot:2068
      _this.initSprites();
      //$LASTPOS=39002084;//kernel.Boot:2084
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=39002115;//kernel.Boot:2115
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=39002152;//kernel.Boot:2152
      _this.initThread();
      //$LASTPOS=39002169;//kernel.Boot:2169
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=39002186;//kernel.Boot:2186
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=39002203;//kernel.Boot:2203
      Tonyu.globals.$Math=Math;
      //$LASTPOS=39002216;//kernel.Boot:2216
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=39002326;//kernel.Boot:2326
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=39002350;//kernel.Boot:2350
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=39002490;//kernel.Boot:2490
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=39002528;//kernel.Boot:2528
        SplashScreen.hide();
      }
      //$LASTPOS=39002550;//kernel.Boot:2550
      _this.initFPSParams();
      //$LASTPOS=39002570;//kernel.Boot:2570
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=39002591;//kernel.Boot:2591
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=39002612;//kernel.Boot:2612
      while (true) {
        //$LASTPOS=39002652;//kernel.Boot:2652
        _this.scheduler.stepsAll();
        //$LASTPOS=39002679;//kernel.Boot:2679
        Tonyu.globals.$Keys.update();
        //$LASTPOS=39002700;//kernel.Boot:2700
        Tonyu.globals.$InputDevice.update();
        //$LASTPOS=39002728;//kernel.Boot:2728
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=39002761;//kernel.Boot:2761
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=39002796;//kernel.Boot:2796
        _this.doDraw=_this.now()<_this.deadLine;
        //$LASTPOS=39002824;//kernel.Boot:2824
        if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
          //$LASTPOS=39002878;//kernel.Boot:2878
          _this.doDraw=true;
          //$LASTPOS=39002900;//kernel.Boot:2900
          _this.resetDeadLine();
          
        }
        //$LASTPOS=39002929;//kernel.Boot:2929
        if (_this.doDraw) {
          //$LASTPOS=39002972;//kernel.Boot:2972
          Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=39003017;//kernel.Boot:3017
          Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=39003057;//kernel.Boot:3057
          Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=39003102;//kernel.Boot:3102
          Tonyu.globals.$Screen.draw();
          //$LASTPOS=39003127;//kernel.Boot:3127
          _this.fps_fpsCnt++;
          //$LASTPOS=39003151;//kernel.Boot:3151
          _this.frameSkipped=0;
          
        } else {
          //$LASTPOS=39003190;//kernel.Boot:3190
          _this.frameSkipped++;
          
        }
        //$LASTPOS=39003218;//kernel.Boot:3218
        Tonyu.globals.$Sprites.checkHit();
        //$LASTPOS=39003244;//kernel.Boot:3244
        Tonyu.globals.$Sprites.removeOneframes();
        //$LASTPOS=39003277;//kernel.Boot:3277
        _this.fps_rpsCnt++;
        //$LASTPOS=39003297;//kernel.Boot:3297
        _this.measureFps();
        //$LASTPOS=39003316;//kernel.Boot:3316
        _this.waitFrame();
        //$LASTPOS=39003343;//kernel.Boot:3343
        while (_this.paused) {
          //$LASTPOS=39003368;//kernel.Boot:3368
          _this.waitFor(Tonyu.timeout(1));
          //$LASTPOS=39003404;//kernel.Boot:3404
          if (! _this.paused) {
            //$LASTPOS=39003417;//kernel.Boot:3417
            _this.resetDeadLine();
          }
          
        }
        
      }
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39002040;//kernel.Boot:2040
      Tonyu.globals.$Boot=_this;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002053;//kernel.Boot:2053
            _this.fiber$initSounds(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39002068;//kernel.Boot:2068
            _this.fiber$initSprites(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=39002084;//kernel.Boot:2084
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=39002115;//kernel.Boot:2115
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=39002152;//kernel.Boot:2152
            _this.fiber$initThread(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=39002169;//kernel.Boot:2169
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=39002186;//kernel.Boot:2186
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=39002203;//kernel.Boot:2203
            Tonyu.globals.$Math=Math;
            //$LASTPOS=39002216;//kernel.Boot:2216
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=39002326;//kernel.Boot:2326
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=39002350;//kernel.Boot:2350
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=39002490;//kernel.Boot:2490
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=39002528;//kernel.Boot:2528
              SplashScreen.hide();
            }
            //$LASTPOS=39002550;//kernel.Boot:2550
            _this.initFPSParams();
            //$LASTPOS=39002570;//kernel.Boot:2570
            Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
            //$LASTPOS=39002591;//kernel.Boot:2591
            Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
            //$LASTPOS=39002612;//kernel.Boot:2612
          case 4:
            //$LASTPOS=39002652;//kernel.Boot:2652
            _this.scheduler.stepsAll();
            //$LASTPOS=39002679;//kernel.Boot:2679
            Tonyu.globals.$Keys.update();
            //$LASTPOS=39002700;//kernel.Boot:2700
            Tonyu.globals.$InputDevice.update();
            //$LASTPOS=39002728;//kernel.Boot:2728
            Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
            //$LASTPOS=39002761;//kernel.Boot:2761
            Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
            //$LASTPOS=39002796;//kernel.Boot:2796
            _this.doDraw=_this.now()<_this.deadLine;
            //$LASTPOS=39002824;//kernel.Boot:2824
            if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
              //$LASTPOS=39002878;//kernel.Boot:2878
              _this.doDraw=true;
              //$LASTPOS=39002900;//kernel.Boot:2900
              _this.resetDeadLine();
              
            }
            //$LASTPOS=39002929;//kernel.Boot:2929
            if (_this.doDraw) {
              //$LASTPOS=39002972;//kernel.Boot:2972
              Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=39003017;//kernel.Boot:3017
              Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=39003057;//kernel.Boot:3057
              Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=39003102;//kernel.Boot:3102
              Tonyu.globals.$Screen.draw();
              //$LASTPOS=39003127;//kernel.Boot:3127
              _this.fps_fpsCnt++;
              //$LASTPOS=39003151;//kernel.Boot:3151
              _this.frameSkipped=0;
              
            } else {
              //$LASTPOS=39003190;//kernel.Boot:3190
              _this.frameSkipped++;
              
            }
            //$LASTPOS=39003218;//kernel.Boot:3218
            Tonyu.globals.$Sprites.checkHit();
            //$LASTPOS=39003244;//kernel.Boot:3244
            Tonyu.globals.$Sprites.removeOneframes();
            //$LASTPOS=39003277;//kernel.Boot:3277
            _this.fps_rpsCnt++;
            //$LASTPOS=39003297;//kernel.Boot:3297
            _this.measureFps();
            //$LASTPOS=39003316;//kernel.Boot:3316
            _this.fiber$waitFrame(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=39003343;//kernel.Boot:3343
          case 6:
            if (!(_this.paused)) { __pc=8; break; }
            //$LASTPOS=39003368;//kernel.Boot:3368
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=7;return;
          case 7:
            
            //$LASTPOS=39003404;//kernel.Boot:3404
            if (! _this.paused) {
              //$LASTPOS=39003417;//kernel.Boot:3417
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
      
      //$LASTPOS=39000206;//kernel.Boot:206
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39000242;//kernel.Boot:242
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
            //$LASTPOS=39000242;//kernel.Boot:242
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
      var _it_295;
      
      //$LASTPOS=39000323;//kernel.Boot:323
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=39000352;//kernel.Boot:352
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=39000386;//kernel.Boot:386
      _this.print("Loading plugins..");
      //$LASTPOS=39000420;//kernel.Boot:420
      a = _this.asyncResult();
      //$LASTPOS=39000446;//kernel.Boot:446
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      //$LASTPOS=39000492;//kernel.Boot:492
      _this.waitFor(a);
      //$LASTPOS=39000509;//kernel.Boot:509
      _this.print("Loading pats..");
      //$LASTPOS=39000540;//kernel.Boot:540
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=39000583;//kernel.Boot:583
      a=_this.asyncResult();
      //$LASTPOS=39000605;//kernel.Boot:605
      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      //$LASTPOS=39000690;//kernel.Boot:690
      _this.waitFor(a);
      //$LASTPOS=39000707;//kernel.Boot:707
      r = a[0];
      //$LASTPOS=39000724;//kernel.Boot:724
      Tonyu.globals.$Sprites.setImageList(r);
      //$LASTPOS=39000755;//kernel.Boot:755
      _it_295=Tonyu.iterator(r.names,2);
      while(_it_295.next()) {
        name=_it_295[0];
        val=_it_295[1];
        
        //$LASTPOS=39000796;//kernel.Boot:796
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=39000836;//kernel.Boot:836
      _this.print("Loading pats done.");
      //$LASTPOS=39000871;//kernel.Boot:871
      _this.cvj=$("canvas");
      //$LASTPOS=39000893;//kernel.Boot:893
      if (Tonyu.noviceMode) {
        //$LASTPOS=39000926;//kernel.Boot:926
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=39001010;//kernel.Boot:1010
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
      var _it_295;
      
      //$LASTPOS=39000323;//kernel.Boot:323
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=39000352;//kernel.Boot:352
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=39000386;//kernel.Boot:386
      _this.print("Loading plugins..");
      //$LASTPOS=39000420;//kernel.Boot:420
      a = _this.asyncResult();
      //$LASTPOS=39000446;//kernel.Boot:446
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      
      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000492;//kernel.Boot:492
            _this.fiber$waitFor(_thread, a);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39000509;//kernel.Boot:509
            _this.print("Loading pats..");
            //$LASTPOS=39000540;//kernel.Boot:540
            rs = Tonyu.globals.$currentProject.getResource();
            //$LASTPOS=39000583;//kernel.Boot:583
            a=_this.asyncResult();
            //$LASTPOS=39000605;//kernel.Boot:605
            ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
            //$LASTPOS=39000690;//kernel.Boot:690
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=39000707;//kernel.Boot:707
            r = a[0];
            //$LASTPOS=39000724;//kernel.Boot:724
            Tonyu.globals.$Sprites.setImageList(r);
            //$LASTPOS=39000755;//kernel.Boot:755
            _it_295=Tonyu.iterator(r.names,2);
            while(_it_295.next()) {
              name=_it_295[0];
              val=_it_295[1];
              
              //$LASTPOS=39000796;//kernel.Boot:796
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=39000836;//kernel.Boot:836
            _this.print("Loading pats done.");
            //$LASTPOS=39000871;//kernel.Boot:871
            _this.cvj=$("canvas");
            //$LASTPOS=39000893;//kernel.Boot:893
            if (Tonyu.noviceMode) {
              //$LASTPOS=39000926;//kernel.Boot:926
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
              
            } else {
              //$LASTPOS=39001010;//kernel.Boot:1010
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSounds :function _trc_Boot_initSounds() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39001103;//kernel.Boot:1103
      _this.print("Loading sounds...");
      //$LASTPOS=39001137;//kernel.Boot:1137
      _this.initT2MediaPlayer();
      //$LASTPOS=39001163;//kernel.Boot:1163
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=39001202;//kernel.Boot:1202
      _this.print("Loading sounds done.");
      //$LASTPOS=39001239;//kernel.Boot:1239
      _this.on("stop",(function anonymous_1249() {
        
        //$LASTPOS=39001261;//kernel.Boot:1261
        _this.clearSEData();
      }));
      //$LASTPOS=39001289;//kernel.Boot:1289
      Tonyu.globals.$sound=_this;
    },
    fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39001103;//kernel.Boot:1103
      _this.print("Loading sounds...");
      
      _thread.enter(function _trc_Boot_ent_initSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39001137;//kernel.Boot:1137
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39001163;//kernel.Boot:1163
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=39001202;//kernel.Boot:1202
            _this.print("Loading sounds done.");
            //$LASTPOS=39001239;//kernel.Boot:1239
            _this.on("stop",(function anonymous_1249() {
              
              //$LASTPOS=39001261;//kernel.Boot:1261
              _this.clearSEData();
            }));
            //$LASTPOS=39001289;//kernel.Boot:1289
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
      
      //$LASTPOS=39001392;//kernel.Boot:1392
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=39001438;//kernel.Boot:1438
      mainClassName = o.run.mainClass;
      //$LASTPOS=39001478;//kernel.Boot:1478
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=39001519;//kernel.Boot:1519
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=39001565;//kernel.Boot:1565
      if (! _this.mainClass) {
        //$LASTPOS=39001592;//kernel.Boot:1592
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=39001729;//kernel.Boot:1729
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=39001770;//kernel.Boot:1770
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot_f_initThread(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=39001392;//kernel.Boot:1392
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=39001438;//kernel.Boot:1438
      mainClassName = o.run.mainClass;
      //$LASTPOS=39001478;//kernel.Boot:1478
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=39001519;//kernel.Boot:1519
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=39001565;//kernel.Boot:1565
      if (! _this.mainClass) {
        //$LASTPOS=39001592;//kernel.Boot:1592
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=39001729;//kernel.Boot:1729
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=39001770;//kernel.Boot:1770
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39001806;//kernel.Boot:1806
      _this.fireEvent("stop");
      //$LASTPOS=39001830;//kernel.Boot:1830
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39001806;//kernel.Boot:1806
      _this.fireEvent("stop");
      //$LASTPOS=39001830;//kernel.Boot:1830
      _this.die();
      
      _thread.retVal=_this;return;
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var th;
      
      //$LASTPOS=39001875;//kernel.Boot:1875
      method=method||"main";
      //$LASTPOS=39001903;//kernel.Boot:1903
      args=args||[];
      //$LASTPOS=39001923;//kernel.Boot:1923
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=39001975;//kernel.Boot:1975
      _this.addThreadGroup(obj);
      //$LASTPOS=39002001;//kernel.Boot:2001
      obj.addThread(th);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=39001875;//kernel.Boot:1875
      method=method||"main";
      //$LASTPOS=39001903;//kernel.Boot:1903
      args=args||[];
      //$LASTPOS=39001923;//kernel.Boot:1923
      th = _this.scheduler.newThread(obj,method,args);
      
      _thread.enter(function _trc_Boot_ent_schedule(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39001975;//kernel.Boot:1975
            _this.fiber$addThreadGroup(_thread, obj);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39002001;//kernel.Boot:2001
            obj.addThread(th);
            _thread.exit(th);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39003497;//kernel.Boot:3497
      _this._fps=30;
      //$LASTPOS=39003513;//kernel.Boot:3513
      _this.maxframeSkip=5;
      //$LASTPOS=39003563;//kernel.Boot:3563
      _this.frameCnt=0;
      //$LASTPOS=39003582;//kernel.Boot:3582
      _this.resetDeadLine();
      //$LASTPOS=39003604;//kernel.Boot:3604
      _this.lastMeasured=_this.now();
      //$LASTPOS=39003629;//kernel.Boot:3629
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
    },
    now :function _trc_Boot_now() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot_resetDeadLine() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=39003759;//kernel.Boot:3759
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=39003790;//kernel.Boot:3790
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var wt;
      
      //$LASTPOS=39003834;//kernel.Boot:3834
      wt = _this.deadLine-_this.now();
      //$LASTPOS=39003862;//kernel.Boot:3862
      if (wt<1) {
        //$LASTPOS=39003883;//kernel.Boot:3883
        if (wt<- 1000) {
          //$LASTPOS=39003897;//kernel.Boot:3897
          _this.resetDeadLine();
        }
        //$LASTPOS=39003923;//kernel.Boot:3923
        wt=1;
        
      }
      //$LASTPOS=39003941;//kernel.Boot:3941
      wt=_this.floor(wt);
      //$LASTPOS=39003960;//kernel.Boot:3960
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=39003993;//kernel.Boot:3993
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=39003834;//kernel.Boot:3834
      wt = _this.deadLine-_this.now();
      //$LASTPOS=39003862;//kernel.Boot:3862
      if (wt<1) {
        //$LASTPOS=39003883;//kernel.Boot:3883
        if (wt<- 1000) {
          //$LASTPOS=39003897;//kernel.Boot:3897
          _this.resetDeadLine();
        }
        //$LASTPOS=39003923;//kernel.Boot:3923
        wt=1;
        
      }
      //$LASTPOS=39003941;//kernel.Boot:3941
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39003960;//kernel.Boot:3960
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=39003993;//kernel.Boot:3993
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
      
      //$LASTPOS=39004153;//kernel.Boot:4153
      _this._fps=fps;
      //$LASTPOS=39004170;//kernel.Boot:4170
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=39004205;//kernel.Boot:4205
        maxFrameSkip=5;
      }
      //$LASTPOS=39004226;//kernel.Boot:4226
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=39004265;//kernel.Boot:4265
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
      
      //$LASTPOS=39004476;//kernel.Boot:4476
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=39004516;//kernel.Boot:4516
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=39004545;//kernel.Boot:4545
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=39004574;//kernel.Boot:4574
        _this.fps_fpsCnt=0;
        //$LASTPOS=39004597;//kernel.Boot:4597
        _this.fps_rpsCnt=0;
        //$LASTPOS=39004620;//kernel.Boot:4620
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
      
      //$LASTPOS=40000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=40000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=40000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=40000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=40000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=40000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=40000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=40000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=40000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=40000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000212;//kernel.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=40000233;//kernel.DxChar:233
      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
