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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=2001098;//kernel.EventMod:1098
      res = _this.getEventHandler(type)||_this.registerEventHandler(type);
      return res;
    },
    on :function _trc_EventMod_on() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var h;
      
      //$LASTPOS=2001201;//kernel.EventMod:1201
      a = _this.parseArgs(arguments);
      //$LASTPOS=2001234;//kernel.EventMod:1234
      h = _this.getOrRegisterEventHandler(a.type);
      return h.addListener.apply(h,a.args);
    },
    fireEvent :function _trc_EventMod_fireEvent(type,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2001515;//kernel.EventMod:1515
      _this.fireEvent(type,arg);
    },
    waitEvent :function _trc_EventMod_waitEvent() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var post;
      
      //$LASTPOS=4000586;//kernel.TextRectMod:586
      post = ctx.font.replace(/^[0-9\.]+/,"");
      //$LASTPOS=4000634;//kernel.TextRectMod:634
      ctx.font=sz+post;
    },
    fukidashi :function _trc_TextRectMod_fukidashi(ctx,text,x,y,sz) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
      
      //$LASTPOS=5000416;//kernel.MathMod:416
      c;
      //$LASTPOS=5000428;//kernel.MathMod:428
      a=_this.floor(a);
      //$LASTPOS=5000445;//kernel.MathMod:445
      b=_this.floor(b);
      //$LASTPOS=5000462;//kernel.MathMod:462
      if (a>=b) {
        //$LASTPOS=5000483;//kernel.MathMod:483
        c=(a-b)%360;
        //$LASTPOS=5000507;//kernel.MathMod:507
        if (c>=180) {
          //$LASTPOS=5000519;//kernel.MathMod:519
          c-=360;
        }
        
      } else {
        //$LASTPOS=5000550;//kernel.MathMod:550
        c=- ((b-a)%360);
        //$LASTPOS=5000577;//kernel.MathMod:577
        if (c<- 180) {
          //$LASTPOS=5000589;//kernel.MathMod:589
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
      
      //$LASTPOS=5000698;//kernel.MathMod:698
      if (typeof  dx=="object") {
        //$LASTPOS=5000734;//kernel.MathMod:734
        t = dx;
        //$LASTPOS=5000753;//kernel.MathMod:753
        dx=t.x-_this.x;
        //$LASTPOS=5000762;//kernel.MathMod:762
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=5000838;//kernel.MathMod:838
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
      
      //$LASTPOS=5000975;//kernel.MathMod:975
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
      var _it_73;
      var f;
      
      //$LASTPOS=8002764;//kernel.TQuery:2764
      res;
      //$LASTPOS=8002777;//kernel.TQuery:2777
      if (! args) {
        //$LASTPOS=8002788;//kernel.TQuery:2788
        args=[];
      }
      //$LASTPOS=8002801;//kernel.TQuery:2801
      _it_73=Tonyu.iterator(_this,1);
      while(_it_73.next()) {
        o=_it_73[0];
        
        //$LASTPOS=8002831;//kernel.TQuery:2831
        f = o[name];
        //$LASTPOS=8002854;//kernel.TQuery:2854
        if (typeof  f=="function") {
          //$LASTPOS=8002894;//kernel.TQuery:2894
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
      
      //$LASTPOS=8002764;//kernel.TQuery:2764
      res;
      //$LASTPOS=8002777;//kernel.TQuery:2777
      if (! args) {
        //$LASTPOS=8002788;//kernel.TQuery:2788
        args=[];
      }
      //$LASTPOS=8002801;//kernel.TQuery:2801
      _it_73=Tonyu.iterator(_this,1);
      while(_it_73.next()) {
        o=_it_73[0];
        
        //$LASTPOS=8002831;//kernel.TQuery:2831
        f = o[name];
        //$LASTPOS=8002854;//kernel.TQuery:2854
        if (typeof  f=="function") {
          //$LASTPOS=8002894;//kernel.TQuery:2894
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
      
      //$LASTPOS=8003089;//kernel.TQuery:3089
      a = _this.alive();
      //$LASTPOS=8003108;//kernel.TQuery:3108
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=8003143;//kernel.TQuery:3143
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=8003089;//kernel.TQuery:3089
      a = _this.alive();
      //$LASTPOS=8003108;//kernel.TQuery:3108
      if (a.length==0) {
        _thread.retVal=false;return;
        
      }
      //$LASTPOS=8003143;//kernel.TQuery:3143
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
      
      //$LASTPOS=9000091;//kernel.InputDevice:91
      _this.listeners=[];
      //$LASTPOS=9000110;//kernel.InputDevice:110
      _this.touchEmu=true;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var l;
      
      //$LASTPOS=9000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=9000177;//kernel.InputDevice:177
      _this.listeners=[];
      //$LASTPOS=9000196;//kernel.InputDevice:196
      while (l.length>0) {
        //$LASTPOS=9000217;//kernel.InputDevice:217
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=9000155;//kernel.InputDevice:155
      l = _this.listeners;
      //$LASTPOS=9000177;//kernel.InputDevice:177
      _this.listeners=[];
      
      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000196;//kernel.InputDevice:196
          case 1:
            if (!(l.length>0)) { __pc=2; break; }
            {
              //$LASTPOS=9000217;//kernel.InputDevice:217
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
      
      //$LASTPOS=9000267;//kernel.InputDevice:267
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000267;//kernel.InputDevice:267
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
      
      //$LASTPOS=9000320;//kernel.InputDevice:320
      cv = cvj[0];
      //$LASTPOS=9000340;//kernel.InputDevice:340
      Tonyu.globals.$handleMouse=(function anonymous_353(e) {
        var p;
        var mp;
        
        //$LASTPOS=9000369;//kernel.InputDevice:369
        p = cvj.offset();
        //$LASTPOS=9000398;//kernel.InputDevice:398
        mp = {x: e.clientX-p.left,y: e.clientY-p.top};
        //$LASTPOS=9000455;//kernel.InputDevice:455
        mp=Tonyu.globals.$Screen.canvas2buf(mp);
        //$LASTPOS=9000491;//kernel.InputDevice:491
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=9000514;//kernel.InputDevice:514
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=9000537;//kernel.InputDevice:537
        if (_this.touchEmu) {
          //$LASTPOS=9000566;//kernel.InputDevice:566
          Tonyu.globals.$touches[0].x=mp.x;
          //$LASTPOS=9000599;//kernel.InputDevice:599
          Tonyu.globals.$touches[0].y=mp.y;
          
        }
        //$LASTPOS=9000639;//kernel.InputDevice:639
        _this.handleListeners();
      });
      //$LASTPOS=9000671;//kernel.InputDevice:671
      Tonyu.globals.$touches=[{},{},{},{},{}];
      //$LASTPOS=9000703;//kernel.InputDevice:703
      Tonyu.globals.$touches.findById=(function anonymous_721(id) {
        var j;
        
        //$LASTPOS=9000738;//kernel.InputDevice:738
        //$LASTPOS=9000743;//kernel.InputDevice:743
        j = 0;
        while(j<Tonyu.globals.$touches.length) {
          {
            //$LASTPOS=9000793;//kernel.InputDevice:793
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
          j++;
        }
      });
      //$LASTPOS=9000903;//kernel.InputDevice:903
      Tonyu.globals.$handleTouch=(function anonymous_916(e) {
        var p;
        var ts;
        var i;
        var src;
        var dst;
        var j;
        
        //$LASTPOS=9000932;//kernel.InputDevice:932
        T2MediaLib.activate();
        //$LASTPOS=9000964;//kernel.InputDevice:964
        _this.touchEmu=false;
        //$LASTPOS=9000989;//kernel.InputDevice:989
        p = cvj.offset();
        //$LASTPOS=9001018;//kernel.InputDevice:1018
        e.preventDefault();
        //$LASTPOS=9001047;//kernel.InputDevice:1047
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=9001095;//kernel.InputDevice:1095
        //$LASTPOS=9001100;//kernel.InputDevice:1100
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=9001145;//kernel.InputDevice:1145
            src = ts[i];
            //$LASTPOS=9001173;//kernel.InputDevice:1173
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=9001229;//kernel.InputDevice:1229
            if (! dst) {
              //$LASTPOS=9001258;//kernel.InputDevice:1258
              //$LASTPOS=9001263;//kernel.InputDevice:1263
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=9001321;//kernel.InputDevice:1321
                  if (! Tonyu.globals.$touches[j].touched) {
                    //$LASTPOS=9001374;//kernel.InputDevice:1374
                    dst=Tonyu.globals.$touches[j];
                    //$LASTPOS=9001416;//kernel.InputDevice:1416
                    dst.identifier=src.identifier;
                    break;
                    
                    
                  }
                }
                j++;
              }
              
            }
            //$LASTPOS=9001549;//kernel.InputDevice:1549
            if (dst) {
              //$LASTPOS=9001577;//kernel.InputDevice:1577
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
              //$LASTPOS=9001638;//kernel.InputDevice:1638
              _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
              //$LASTPOS=9001682;//kernel.InputDevice:1682
              dst.x=_this.mp.x;
              //$LASTPOS=9001711;//kernel.InputDevice:1711
              dst.y=_this.mp.y;
              //$LASTPOS=9001740;//kernel.InputDevice:1740
              if (! dst.touched) {
                //$LASTPOS=9001757;//kernel.InputDevice:1757
                dst.touched=1;
              }
              
            }
          }
          i++;
        }
        //$LASTPOS=9001807;//kernel.InputDevice:1807
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=9001839;//kernel.InputDevice:1839
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=9001871;//kernel.InputDevice:1871
        _this.handleListeners();
      });
      //$LASTPOS=9001903;//kernel.InputDevice:1903
      Tonyu.globals.$handleTouchEnd=(function anonymous_1919(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=9001935;//kernel.InputDevice:1935
        ts = e.originalEvent.changedTouches;
        //$LASTPOS=9001983;//kernel.InputDevice:1983
        //$LASTPOS=9001988;//kernel.InputDevice:1988
        i = 0;
        while(i<ts.length) {
          {
            //$LASTPOS=9002033;//kernel.InputDevice:2033
            src = ts[i];
            //$LASTPOS=9002061;//kernel.InputDevice:2061
            dst = Tonyu.globals.$touches.findById(src.identifier);
            //$LASTPOS=9002117;//kernel.InputDevice:2117
            if (dst) {
              //$LASTPOS=9002145;//kernel.InputDevice:2145
              dst.touched=0;
              //$LASTPOS=9002177;//kernel.InputDevice:2177
              dst.identifier=- 1;
              
            }
          }
          i++;
        }
        //$LASTPOS=9002231;//kernel.InputDevice:2231
        _this.handleListeners();
      });
      //$LASTPOS=9002263;//kernel.InputDevice:2263
      handleMouse = (function anonymous_2279(e) {
        
        //$LASTPOS=9002284;//kernel.InputDevice:2284
        Tonyu.globals.$handleMouse(e);
      });
      //$LASTPOS=9002308;//kernel.InputDevice:2308
      handleTouch = (function anonymous_2324(e) {
        
        //$LASTPOS=9002329;//kernel.InputDevice:2329
        Tonyu.globals.$handleTouch(e);
      });
      //$LASTPOS=9002353;//kernel.InputDevice:2353
      handleTouchEnd = (function anonymous_2372(e) {
        
        //$LASTPOS=9002377;//kernel.InputDevice:2377
        Tonyu.globals.$handleTouchEnd(e);
      });
      //$LASTPOS=9002404;//kernel.InputDevice:2404
      d = $.data(cv,"events");
      //$LASTPOS=9002436;//kernel.InputDevice:2436
      if (! d) {
        //$LASTPOS=9002455;//kernel.InputDevice:2455
        $.data(cv,"events","true");
        //$LASTPOS=9002492;//kernel.InputDevice:2492
        cvj.mousedown(handleMouse);
        //$LASTPOS=9002529;//kernel.InputDevice:2529
        cvj.mousemove(handleMouse);
        //$LASTPOS=9002566;//kernel.InputDevice:2566
        cvj.on("touchstart",handleTouch);
        //$LASTPOS=9002609;//kernel.InputDevice:2609
        cvj.on("touchmove",handleTouch);
        //$LASTPOS=9002651;//kernel.InputDevice:2651
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
      
      //$LASTPOS=9000320;//kernel.InputDevice:320
      cv = cvj[0];
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000340;//kernel.InputDevice:340
            Tonyu.globals.$handleMouse=(function anonymous_353(e) {
              var p;
              var mp;
              
              //$LASTPOS=9000369;//kernel.InputDevice:369
              p = cvj.offset();
              //$LASTPOS=9000398;//kernel.InputDevice:398
              mp = {x: e.clientX-p.left,y: e.clientY-p.top};
              //$LASTPOS=9000455;//kernel.InputDevice:455
              mp=Tonyu.globals.$Screen.canvas2buf(mp);
              //$LASTPOS=9000491;//kernel.InputDevice:491
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=9000514;//kernel.InputDevice:514
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=9000537;//kernel.InputDevice:537
              if (_this.touchEmu) {
                //$LASTPOS=9000566;//kernel.InputDevice:566
                Tonyu.globals.$touches[0].x=mp.x;
                //$LASTPOS=9000599;//kernel.InputDevice:599
                Tonyu.globals.$touches[0].y=mp.y;
                
              }
              //$LASTPOS=9000639;//kernel.InputDevice:639
              _this.handleListeners();
            });
            //$LASTPOS=9000671;//kernel.InputDevice:671
            Tonyu.globals.$touches=[{},{},{},{},{}];
            //$LASTPOS=9000703;//kernel.InputDevice:703
            Tonyu.globals.$touches.findById=(function anonymous_721(id) {
              var j;
              
              //$LASTPOS=9000738;//kernel.InputDevice:738
              //$LASTPOS=9000743;//kernel.InputDevice:743
              j = 0;
              while(j<Tonyu.globals.$touches.length) {
                {
                  //$LASTPOS=9000793;//kernel.InputDevice:793
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
                j++;
              }
            });
            //$LASTPOS=9000903;//kernel.InputDevice:903
            Tonyu.globals.$handleTouch=(function anonymous_916(e) {
              var p;
              var ts;
              var i;
              var src;
              var dst;
              var j;
              
              //$LASTPOS=9000932;//kernel.InputDevice:932
              T2MediaLib.activate();
              //$LASTPOS=9000964;//kernel.InputDevice:964
              _this.touchEmu=false;
              //$LASTPOS=9000989;//kernel.InputDevice:989
              p = cvj.offset();
              //$LASTPOS=9001018;//kernel.InputDevice:1018
              e.preventDefault();
              //$LASTPOS=9001047;//kernel.InputDevice:1047
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=9001095;//kernel.InputDevice:1095
              //$LASTPOS=9001100;//kernel.InputDevice:1100
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=9001145;//kernel.InputDevice:1145
                  src = ts[i];
                  //$LASTPOS=9001173;//kernel.InputDevice:1173
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=9001229;//kernel.InputDevice:1229
                  if (! dst) {
                    //$LASTPOS=9001258;//kernel.InputDevice:1258
                    //$LASTPOS=9001263;//kernel.InputDevice:1263
                    j = 0;
                    while(j<Tonyu.globals.$touches.length) {
                      {
                        //$LASTPOS=9001321;//kernel.InputDevice:1321
                        if (! Tonyu.globals.$touches[j].touched) {
                          //$LASTPOS=9001374;//kernel.InputDevice:1374
                          dst=Tonyu.globals.$touches[j];
                          //$LASTPOS=9001416;//kernel.InputDevice:1416
                          dst.identifier=src.identifier;
                          break;
                          
                          
                        }
                      }
                      j++;
                    }
                    
                  }
                  //$LASTPOS=9001549;//kernel.InputDevice:1549
                  if (dst) {
                    //$LASTPOS=9001577;//kernel.InputDevice:1577
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                    //$LASTPOS=9001638;//kernel.InputDevice:1638
                    _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                    //$LASTPOS=9001682;//kernel.InputDevice:1682
                    dst.x=_this.mp.x;
                    //$LASTPOS=9001711;//kernel.InputDevice:1711
                    dst.y=_this.mp.y;
                    //$LASTPOS=9001740;//kernel.InputDevice:1740
                    if (! dst.touched) {
                      //$LASTPOS=9001757;//kernel.InputDevice:1757
                      dst.touched=1;
                    }
                    
                  }
                }
                i++;
              }
              //$LASTPOS=9001807;//kernel.InputDevice:1807
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=9001839;//kernel.InputDevice:1839
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=9001871;//kernel.InputDevice:1871
              _this.handleListeners();
            });
            //$LASTPOS=9001903;//kernel.InputDevice:1903
            Tonyu.globals.$handleTouchEnd=(function anonymous_1919(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=9001935;//kernel.InputDevice:1935
              ts = e.originalEvent.changedTouches;
              //$LASTPOS=9001983;//kernel.InputDevice:1983
              //$LASTPOS=9001988;//kernel.InputDevice:1988
              i = 0;
              while(i<ts.length) {
                {
                  //$LASTPOS=9002033;//kernel.InputDevice:2033
                  src = ts[i];
                  //$LASTPOS=9002061;//kernel.InputDevice:2061
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  //$LASTPOS=9002117;//kernel.InputDevice:2117
                  if (dst) {
                    //$LASTPOS=9002145;//kernel.InputDevice:2145
                    dst.touched=0;
                    //$LASTPOS=9002177;//kernel.InputDevice:2177
                    dst.identifier=- 1;
                    
                  }
                }
                i++;
              }
              //$LASTPOS=9002231;//kernel.InputDevice:2231
              _this.handleListeners();
            });
            //$LASTPOS=9002263;//kernel.InputDevice:2263
            handleMouse = (function anonymous_2279(e) {
              
              //$LASTPOS=9002284;//kernel.InputDevice:2284
              Tonyu.globals.$handleMouse(e);
            });
            //$LASTPOS=9002308;//kernel.InputDevice:2308
            handleTouch = (function anonymous_2324(e) {
              
              //$LASTPOS=9002329;//kernel.InputDevice:2329
              Tonyu.globals.$handleTouch(e);
            });
            //$LASTPOS=9002353;//kernel.InputDevice:2353
            handleTouchEnd = (function anonymous_2372(e) {
              
              //$LASTPOS=9002377;//kernel.InputDevice:2377
              Tonyu.globals.$handleTouchEnd(e);
            });
            //$LASTPOS=9002404;//kernel.InputDevice:2404
            d = $.data(cv,"events");
            //$LASTPOS=9002436;//kernel.InputDevice:2436
            if (! d) {
              //$LASTPOS=9002455;//kernel.InputDevice:2455
              $.data(cv,"events","true");
              //$LASTPOS=9002492;//kernel.InputDevice:2492
              cvj.mousedown(handleMouse);
              //$LASTPOS=9002529;//kernel.InputDevice:2529
              cvj.mousemove(handleMouse);
              //$LASTPOS=9002566;//kernel.InputDevice:2566
              cvj.on("touchstart",handleTouch);
              //$LASTPOS=9002609;//kernel.InputDevice:2609
              cvj.on("touchmove",handleTouch);
              //$LASTPOS=9002651;//kernel.InputDevice:2651
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
      
      //$LASTPOS=9002716;//kernel.InputDevice:2716
      _it_107=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_107.next()) {
        i=_it_107[0];
        
        //$LASTPOS=9002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=9002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=9002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=9002811;//kernel.InputDevice:2811
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
      
      //$LASTPOS=9002716;//kernel.InputDevice:2716
      _it_107=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_107.next()) {
        i=_it_107[0];
        
        //$LASTPOS=9002751;//kernel.InputDevice:2751
        if (i.touched>0) {
          //$LASTPOS=9002769;//kernel.InputDevice:2769
          i.touched++;
          
        }
        //$LASTPOS=9002792;//kernel.InputDevice:2792
        if (i.touched==- 1) {
          //$LASTPOS=9002811;//kernel.InputDevice:2811
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
      
      //$LASTPOS=11000248;//kernel.BaseActor:248
      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      //$LASTPOS=11000293;//kernel.BaseActor:293
      _this.registerEventHandler("screenOut",new Tonyu.classes.kernel.ScreenOutHandler);
      //$LASTPOS=11000358;//kernel.BaseActor:358
      _this.registerEventHandler("crashTo",new Tonyu.classes.kernel.CrashToHandler);
      //$LASTPOS=11000419;//kernel.BaseActor:419
      _this.registerEventHandler("within",new Tonyu.classes.kernel.WithinHandler);
      //$LASTPOS=11000483;//kernel.BaseActor:483
      if (typeof  x=="object") {
        //$LASTPOS=11000507;//kernel.BaseActor:507
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=11000539;//kernel.BaseActor:539
        if (typeof  x=="number") {
          //$LASTPOS=11000574;//kernel.BaseActor:574
          _this.x=x;
          //$LASTPOS=11000593;//kernel.BaseActor:593
          _this.y=y;
          //$LASTPOS=11000612;//kernel.BaseActor:612
          _this.p=p;
          
        }
      }
      //$LASTPOS=11000634;//kernel.BaseActor:634
      if (_this.scaleX==null) {
        //$LASTPOS=11000652;//kernel.BaseActor:652
        _this.scaleX=1;
      }
      //$LASTPOS=11000667;//kernel.BaseActor:667
      if (_this.rotation==null) {
        //$LASTPOS=11000687;//kernel.BaseActor:687
        _this.rotation=0;
      }
      //$LASTPOS=11000704;//kernel.BaseActor:704
      if (_this.rotate==null) {
        //$LASTPOS=11000722;//kernel.BaseActor:722
        _this.rotate=0;
      }
      //$LASTPOS=11000737;//kernel.BaseActor:737
      if (_this.alpha==null) {
        //$LASTPOS=11000754;//kernel.BaseActor:754
        _this.alpha=255;
      }
      //$LASTPOS=11000770;//kernel.BaseActor:770
      if (_this.zOrder==null) {
        //$LASTPOS=11000788;//kernel.BaseActor:788
        _this.zOrder=0;
      }
      //$LASTPOS=11000803;//kernel.BaseActor:803
      if (_this.age==null) {
        //$LASTPOS=11000818;//kernel.BaseActor:818
        _this.age=0;
      }
      //$LASTPOS=11000830;//kernel.BaseActor:830
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=11000881;//kernel.BaseActor:881
        _this.animMode=true;
        //$LASTPOS=11000905;//kernel.BaseActor:905
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=11000939;//kernel.BaseActor:939
        _this.animMode=false;
        
      }
      //$LASTPOS=11000967;//kernel.BaseActor:967
      if (_this.animFps==null) {
        //$LASTPOS=11000986;//kernel.BaseActor:986
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
      
      //$LASTPOS=11001090;//kernel.BaseActor:1090
      console.log.apply(console,arguments);
      //$LASTPOS=11001133;//kernel.BaseActor:1133
      mergedArg = "";
      //$LASTPOS=11001156;//kernel.BaseActor:1156
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=11001184;//kernel.BaseActor:1184
        //$LASTPOS=11001188;//kernel.BaseActor:1188
        argCount = 0;
        while(argCount<arguments.length) {
          {
            //$LASTPOS=11001255;//kernel.BaseActor:1255
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
          argCount++;
        }
        //$LASTPOS=11001320;//kernel.BaseActor:1320
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=11001359;//kernel.BaseActor:1359
        //$LASTPOS=11001363;//kernel.BaseActor:1363
        printCount = 0;
        while(printCount<_this.splits.length) {
          {
            //$LASTPOS=11001433;//kernel.BaseActor:1433
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=11001474;//kernel.BaseActor:1474
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=11001524;//kernel.BaseActor:1524
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
          printCount++;
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001647;//kernel.BaseActor:1647
      _this.animFps=f;
      //$LASTPOS=11001668;//kernel.BaseActor:1668
      _this.animFrame=0;
      //$LASTPOS=11001691;//kernel.BaseActor:1691
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001741;//kernel.BaseActor:1741
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001790;//kernel.BaseActor:1790
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11001832;//kernel.BaseActor:1832
      _this.onUpdate();
      //$LASTPOS=11001849;//kernel.BaseActor:1849
      if (null) {
        //$LASTPOS=11001872;//kernel.BaseActor:1872
        null.suspend();
        //$LASTPOS=11001900;//kernel.BaseActor:1900
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=11001916;//kernel.BaseActor:1916
          Tonyu.globals.$Scheduler.addToNext(null);
        }
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11001832;//kernel.BaseActor:1832
      _this.onUpdate();
      //$LASTPOS=11001849;//kernel.BaseActor:1849
      if (_thread) {
        //$LASTPOS=11001872;//kernel.BaseActor:1872
        _thread.suspend();
        //$LASTPOS=11001900;//kernel.BaseActor:1900
        if (Tonyu.globals.$Scheduler) {
          //$LASTPOS=11001916;//kernel.BaseActor:1916
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
      
      //$LASTPOS=11002010;//kernel.BaseActor:2010
      //$LASTPOS=11002014;//kernel.BaseActor:2014
      updateCount = 0;
      while(updateCount<updateT) {
        {
          //$LASTPOS=11002077;//kernel.BaseActor:2077
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
            //$LASTPOS=11002010;//kernel.BaseActor:2010
            //$LASTPOS=11002014;//kernel.BaseActor:2014
            updateCount = 0;;
          case 1:
            if (!(updateCount<updateT)) { __pc=3; break; }
            //$LASTPOS=11002077;//kernel.BaseActor:2077
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
      
      //$LASTPOS=11002220;//kernel.BaseActor:2220
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=11002245;//kernel.BaseActor:2245
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=11002328;//kernel.BaseActor:2328
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2353(s) {
        
        //$LASTPOS=11002369;//kernel.BaseActor:2369
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=11002400;//kernel.BaseActor:2400
        if (! c||s instanceof c) {
          //$LASTPOS=11002441;//kernel.BaseActor:2441
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
      
      //$LASTPOS=11002548;//kernel.BaseActor:2548
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=11002573;//kernel.BaseActor:2573
      sp = _this;
      //$LASTPOS=11002610;//kernel.BaseActor:2610
      t1 = _this.getCrashRect();
      //$LASTPOS=11002638;//kernel.BaseActor:2638
      if (! t1) {
        return res;
      }
      //$LASTPOS=11002664;//kernel.BaseActor:2664
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_2689(s) {
        var t2;
        
        //$LASTPOS=11002705;//kernel.BaseActor:2705
        t2;
        //$LASTPOS=11002722;//kernel.BaseActor:2722
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=11002948;//kernel.BaseActor:2948
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11003028;//kernel.BaseActor:3028
      if (! t) {
        return false;
      }
      //$LASTPOS=11003055;//kernel.BaseActor:3055
      if (typeof  t=="function") {
        return _this.allCrash(t)[0];
        
      }
      return _this.crashTo1(t);
    },
    crashTo1 :function _trc_BaseActor_crashTo1(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t1;
      var t2;
      
      //$LASTPOS=11003178;//kernel.BaseActor:3178
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=11003306;//kernel.BaseActor:3306
      t1 = _this.getCrashRect();
      //$LASTPOS=11003334;//kernel.BaseActor:3334
      t2 = t.getCrashRect();
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var obj;
      var _it_132;
      
      //$LASTPOS=11003643;//kernel.BaseActor:3643
      while (true) {
        //$LASTPOS=11003665;//kernel.BaseActor:3665
        if (typeof  d=="function") {
          //$LASTPOS=11003704;//kernel.BaseActor:3704
          _it_132=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_132.next()) {
            obj=_it_132[0];
            
            //$LASTPOS=11003746;//kernel.BaseActor:3746
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=11003803;//kernel.BaseActor:3803
          if (_this.crashTo(d)) {
            //$LASTPOS=11003832;//kernel.BaseActor:3832
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=11003877;//kernel.BaseActor:3877
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_132;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11003643;//kernel.BaseActor:3643
          case 1:
            //$LASTPOS=11003665;//kernel.BaseActor:3665
            if (!(typeof  d=="function")) { __pc=5; break; }
            //$LASTPOS=11003704;//kernel.BaseActor:3704
            _it_132=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_132.next())) { __pc=4; break; }
            obj=_it_132[0];
            
            //$LASTPOS=11003746;//kernel.BaseActor:3746
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            __pc=8;break;
          case 5:
            //$LASTPOS=11003803;//kernel.BaseActor:3803
            if (!(_this.crashTo(d))) { __pc=7; break; }
            //$LASTPOS=11003832;//kernel.BaseActor:3832
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=11003877;//kernel.BaseActor:3877
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
      
      //$LASTPOS=11003928;//kernel.BaseActor:3928
      actWidth = _this.width*_this.scaleX;actHeight;
      //$LASTPOS=11003971;//kernel.BaseActor:3971
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=11004013;//kernel.BaseActor:4013
        actHeight=_this.height*_this.scaleX;
        
      } else {
        //$LASTPOS=11004059;//kernel.BaseActor:4059
        actHeight=_this.height*_this.scaleY;
        
      }
      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: Math.abs(actWidth),height: Math.abs(actHeight)};
    },
    allWithin :function _trc_BaseActor_allWithin(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=11004320;//kernel.BaseActor:4320
      res = new Tonyu.classes.kernel.TQuery;
      //$LASTPOS=11004345;//kernel.BaseActor:4345
      sp = _this;
      //$LASTPOS=11004382;//kernel.BaseActor:4382
      t1 = _this.getCrashRect();
      //$LASTPOS=11004410;//kernel.BaseActor:4410
      if (! t1) {
        return res;
      }
      //$LASTPOS=11004436;//kernel.BaseActor:4436
      Tonyu.globals.$Sprites.sprites.forEach((function anonymous_4461(s) {
        var t2;
        
        //$LASTPOS=11004477;//kernel.BaseActor:4477
        t2;
        //$LASTPOS=11004494;//kernel.BaseActor:4494
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=11004679;//kernel.BaseActor:4679
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11004770;//kernel.BaseActor:4770
      if (! t) {
        return false;
      }
      //$LASTPOS=11004796;//kernel.BaseActor:4796
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11004942;//kernel.BaseActor:4942
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=11004981;//kernel.BaseActor:4981
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var obj;
      var _it_142;
      
      //$LASTPOS=11005151;//kernel.BaseActor:5151
      while (true) {
        //$LASTPOS=11005173;//kernel.BaseActor:5173
        if (typeof  d=="function") {
          //$LASTPOS=11005212;//kernel.BaseActor:5212
          _it_142=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_142.next()) {
            obj=_it_142[0];
            
            //$LASTPOS=11005257;//kernel.BaseActor:5257
            _this.print(r);
            //$LASTPOS=11005284;//kernel.BaseActor:5284
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=11005322;//kernel.BaseActor:5322
          if (_this.within(d,r)) {
            //$LASTPOS=11005352;//kernel.BaseActor:5352
            f(d);
            
          }
        }
        //$LASTPOS=11005378;//kernel.BaseActor:5378
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_142;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11005151;//kernel.BaseActor:5151
          case 1:
            //$LASTPOS=11005173;//kernel.BaseActor:5173
            if (typeof  d=="function") {
              //$LASTPOS=11005212;//kernel.BaseActor:5212
              _it_142=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_142.next()) {
                obj=_it_142[0];
                
                //$LASTPOS=11005257;//kernel.BaseActor:5257
                _this.print(r);
                //$LASTPOS=11005284;//kernel.BaseActor:5284
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=11005322;//kernel.BaseActor:5322
              if (_this.within(d,r)) {
                //$LASTPOS=11005352;//kernel.BaseActor:5352
                f(d);
                
              }
            }
            //$LASTPOS=11005378;//kernel.BaseActor:5378
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
      
      //$LASTPOS=11005442;//kernel.BaseActor:5442
      Tonyu.globals.$Sprites.watchHit(typeA,typeB,(function anonymous_5475(a,b) {
        
        //$LASTPOS=11005493;//kernel.BaseActor:5493
        onHit.apply(_this,[a,b]);
      }));
    },
    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return Tonyu.globals.$Scheduler;
    },
    die :function _trc_BaseActor_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11005647;//kernel.BaseActor:5647
      _this.killThreadGroup();
      //$LASTPOS=11005719;//kernel.BaseActor:5719
      _this.hide();
      //$LASTPOS=11005732;//kernel.BaseActor:5732
      _this.fireEvent("die");
      //$LASTPOS=11005755;//kernel.BaseActor:5755
      _this._isDead=true;
    },
    hide :function _trc_BaseActor_hide() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11005934;//kernel.BaseActor:5934
      if (_this.layer&&typeof  _this.layer.remove=="function") {
        //$LASTPOS=11005989;//kernel.BaseActor:5989
        _this.layer.remove(_this);
        
      } else {
        //$LASTPOS=11006030;//kernel.BaseActor:6030
        Tonyu.globals.$Sprites.remove(_this);
        
      }
    },
    show :function _trc_BaseActor_show(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11006091;//kernel.BaseActor:6091
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=11006143;//kernel.BaseActor:6143
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=11006181;//kernel.BaseActor:6181
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=11006213;//kernel.BaseActor:6213
      if (x!=null) {
        //$LASTPOS=11006226;//kernel.BaseActor:6226
        _this.x=x;
      }
      //$LASTPOS=11006241;//kernel.BaseActor:6241
      if (y!=null) {
        //$LASTPOS=11006254;//kernel.BaseActor:6254
        _this.y=y;
      }
      //$LASTPOS=11006269;//kernel.BaseActor:6269
      if (p!=null) {
        //$LASTPOS=11006282;//kernel.BaseActor:6282
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11006327;//kernel.BaseActor:6327
      if (typeof  _this.p!="number") {
        //$LASTPOS=11006362;//kernel.BaseActor:6362
        if (_this.text!=null) {
          return _this;
        }
        //$LASTPOS=11006395;//kernel.BaseActor:6395
        _this.p=0;
        
      }
      //$LASTPOS=11006412;//kernel.BaseActor:6412
      _this.p=Math.floor(_this.p);
      //$LASTPOS=11006434;//kernel.BaseActor:6434
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
      //$LASTPOS=11006472;//kernel.BaseActor:6472
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=11006496;//kernel.BaseActor:6496
      _this.width=_this.pImg.width;
      //$LASTPOS=11006519;//kernel.BaseActor:6519
      _this.height=_this.pImg.height;
    },
    waitFor :function _trc_BaseActor_waitFor(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11006562;//kernel.BaseActor:6562
      if (null) {
        //$LASTPOS=11006586;//kernel.BaseActor:6586
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_BaseActor_f_waitFor(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11006562;//kernel.BaseActor:6562
      if (_thread) {
        //$LASTPOS=11006586;//kernel.BaseActor:6586
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
      
      //$LASTPOS=11006706;//kernel.BaseActor:6706
      _this.age++;
      //$LASTPOS=11006718;//kernel.BaseActor:6718
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=11006759;//kernel.BaseActor:6759
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=11006799;//kernel.BaseActor:6799
        _this.animFrame++;
        
      }
    },
    draw :function _trc_BaseActor_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=11006848;//kernel.BaseActor:6848
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=11006901;//kernel.BaseActor:6901
      _this.detectShape();
      //$LASTPOS=11006921;//kernel.BaseActor:6921
      if (_this.pImg) {
        //$LASTPOS=11006942;//kernel.BaseActor:6942
        ctx.save();
        //$LASTPOS=11006963;//kernel.BaseActor:6963
        ctx.translate(_this.x,_this.y);
        //$LASTPOS=11007107;//kernel.BaseActor:7107
        _this.animation();
        //$LASTPOS=11007129;//kernel.BaseActor:7129
        if (_this.rotation!=0) {
          //$LASTPOS=11007164;//kernel.BaseActor:7164
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=11007232;//kernel.BaseActor:7232
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=11007289;//kernel.BaseActor:7289
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=11007341;//kernel.BaseActor:7341
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=11007406;//kernel.BaseActor:7406
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=11007462;//kernel.BaseActor:7462
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=11007503;//kernel.BaseActor:7503
        ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=11007635;//kernel.BaseActor:7635
        ctx.restore();
        
      } else {
        //$LASTPOS=11007662;//kernel.BaseActor:7662
        if (_this.text!==null&&_this.text!==undefined) {
          //$LASTPOS=11007710;//kernel.BaseActor:7710
          splitsText = (_this.text+"").split("\n");
          //$LASTPOS=11007757;//kernel.BaseActor:7757
          _this.drawY=_this.y;
          //$LASTPOS=11007775;//kernel.BaseActor:7775
          if (! _this.size) {
            //$LASTPOS=11007786;//kernel.BaseActor:7786
            _this.size=15;
          }
          //$LASTPOS=11007804;//kernel.BaseActor:7804
          if (! _this.align) {
            //$LASTPOS=11007816;//kernel.BaseActor:7816
            _this.align="center";
          }
          //$LASTPOS=11007841;//kernel.BaseActor:7841
          if (! _this.fillStyle) {
            //$LASTPOS=11007857;//kernel.BaseActor:7857
            _this.fillStyle="white";
          }
          //$LASTPOS=11007885;//kernel.BaseActor:7885
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=11007919;//kernel.BaseActor:7919
          ctx.globalAlpha=_this.alpha/255;
          //$LASTPOS=11007960;//kernel.BaseActor:7960
          _this.height=0;
          //$LASTPOS=11007969;//kernel.BaseActor:7969
          _this.width=0;
          //$LASTPOS=11007987;//kernel.BaseActor:7987
          //$LASTPOS=11007991;//kernel.BaseActor:7991
          textCount = 0;
          while(textCount<splitsText.length) {
            {
              //$LASTPOS=11008062;//kernel.BaseActor:8062
              rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
              //$LASTPOS=11008158;//kernel.BaseActor:8158
              if (_this.width<rect.w) {
                //$LASTPOS=11008175;//kernel.BaseActor:8175
                _this.width=rect.w;
              }
              //$LASTPOS=11008202;//kernel.BaseActor:8202
              _this.height+=rect.h;
              //$LASTPOS=11008231;//kernel.BaseActor:8231
              _this.drawY+=_this.size;
            }
            textCount++;
          }
          
        }
      }
      //$LASTPOS=11008267;//kernel.BaseActor:8267
      if (_this._fukidashi) {
        //$LASTPOS=11008294;//kernel.BaseActor:8294
        if (_this._fukidashi.c>0) {
          //$LASTPOS=11008329;//kernel.BaseActor:8329
          _this._fukidashi.c--;
          //$LASTPOS=11008358;//kernel.BaseActor:8358
          ctx.fillStyle="white";
          //$LASTPOS=11008394;//kernel.BaseActor:8394
          ctx.strokeStyle="black";
          //$LASTPOS=11008432;//kernel.BaseActor:8432
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
      
      //$LASTPOS=11008635;//kernel.BaseActor:8635
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=11008707;//kernel.BaseActor:8707
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11008635;//kernel.BaseActor:8635
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=11008707;//kernel.BaseActor:8707
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var r;
      var viewX;
      var viewY;
      
      //$LASTPOS=11008789;//kernel.BaseActor:8789
      if (! a) {
        //$LASTPOS=11008797;//kernel.BaseActor:8797
        a=0;
      }
      //$LASTPOS=11008807;//kernel.BaseActor:8807
      r = 0;
      //$LASTPOS=11008821;//kernel.BaseActor:8821
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=11008867;//kernel.BaseActor:8867
      if (_this.x<viewX+a) {
        //$LASTPOS=11008896;//kernel.BaseActor:8896
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=11008915;//kernel.BaseActor:8915
      if (_this.y<viewY+a) {
        //$LASTPOS=11008944;//kernel.BaseActor:8944
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=11008963;//kernel.BaseActor:8963
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=11008992;//kernel.BaseActor:8992
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=11009027;//kernel.BaseActor:9027
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=11009056;//kernel.BaseActor:9056
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
      
      //$LASTPOS=11008789;//kernel.BaseActor:8789
      if (! a) {
        //$LASTPOS=11008797;//kernel.BaseActor:8797
        a=0;
      }
      //$LASTPOS=11008807;//kernel.BaseActor:8807
      r = 0;
      //$LASTPOS=11008821;//kernel.BaseActor:8821
      viewX = Tonyu.globals.$Sprites.sx;viewY = Tonyu.globals.$Sprites.sy;
      //$LASTPOS=11008867;//kernel.BaseActor:8867
      if (_this.x<viewX+a) {
        //$LASTPOS=11008896;//kernel.BaseActor:8896
        r+=viewX+a-_this.x;
      }
      //$LASTPOS=11008915;//kernel.BaseActor:8915
      if (_this.y<viewY+a) {
        //$LASTPOS=11008944;//kernel.BaseActor:8944
        r+=viewY+a-_this.y;
      }
      //$LASTPOS=11008963;//kernel.BaseActor:8963
      if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
        //$LASTPOS=11008992;//kernel.BaseActor:8992
        r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
      }
      //$LASTPOS=11009027;//kernel.BaseActor:9027
      if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
        //$LASTPOS=11009056;//kernel.BaseActor:9056
        r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
      }
      _thread.retVal=r;return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11009186;//kernel.BaseActor:9186
      while (true) {
        //$LASTPOS=11009208;//kernel.BaseActor:9208
        while (true) {
          //$LASTPOS=11009234;//kernel.BaseActor:9234
          if (_this.screenOut()>d) {
            //$LASTPOS=11009270;//kernel.BaseActor:9270
            f();
            break;
            
            
          }
          //$LASTPOS=11009327;//kernel.BaseActor:9327
          _this.update();
          
        }
        //$LASTPOS=11009357;//kernel.BaseActor:9357
        while (true) {
          //$LASTPOS=11009383;//kernel.BaseActor:9383
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=11009455;//kernel.BaseActor:9455
          _this.update();
          
        }
        //$LASTPOS=11009485;//kernel.BaseActor:9485
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
            //$LASTPOS=11009186;//kernel.BaseActor:9186
          case 1:
            //$LASTPOS=11009208;//kernel.BaseActor:9208
          case 2:
            //$LASTPOS=11009234;//kernel.BaseActor:9234
            if (!(_this.screenOut()>d)) { __pc=3; break; }
            //$LASTPOS=11009270;//kernel.BaseActor:9270
            f();
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=11009327;//kernel.BaseActor:9327
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=11009357;//kernel.BaseActor:9357
          case 6:
            //$LASTPOS=11009383;//kernel.BaseActor:9383
            if (!(_this.screenOut()<=d)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=11009455;//kernel.BaseActor:9455
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=11009485;//kernel.BaseActor:9485
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
      
      //$LASTPOS=11009525;//kernel.BaseActor:9525
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=11009567;//kernel.BaseActor:9567
      files = d.rel("files/");
      return FS.get(files.rel(path),{topDir: d});
    },
    fiber$file :function _trc_BaseActor_f_file(_thread,path) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var files;
      
      //$LASTPOS=11009525;//kernel.BaseActor:9525
      d = Tonyu.currentProject.getDir();
      //$LASTPOS=11009567;//kernel.BaseActor:9567
      files = d.rel("files/");
      _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11009674;//kernel.BaseActor:9674
      if (fl!==false) {
        //$LASTPOS=11009701;//kernel.BaseActor:9701
        if (! _this.origTG) {
          
          
        }
        //$LASTPOS=11009853;//kernel.BaseActor:9853
        _this.a=_this.asyncResult();
        //$LASTPOS=11009879;//kernel.BaseActor:9879
        Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
        //$LASTPOS=11009933;//kernel.BaseActor:9933
        _this.waitFor(_this.a);
        
      } else {
        //$LASTPOS=11009968;//kernel.BaseActor:9968
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
            //$LASTPOS=11009674;//kernel.BaseActor:9674
            if (!(fl!==false)) { __pc=3; break; }
            //$LASTPOS=11009701;//kernel.BaseActor:9701
            if (!(! _this.origTG)) { __pc=1; break; }
            {
              //$LASTPOS=11009755;//kernel.BaseActor:9755
              _this.origTG=_thread.group;
              //$LASTPOS=11009794;//kernel.BaseActor:9794
              _thread.setGroup(null);
            }
          case 1:
            
            //$LASTPOS=11009853;//kernel.BaseActor:9853
            _this.a=_this.asyncResult();
            //$LASTPOS=11009879;//kernel.BaseActor:9879
            Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
            //$LASTPOS=11009933;//kernel.BaseActor:9933
            _this.fiber$waitFor(_thread, _this.a);
            __pc=2;return;
          case 2:
            
            __pc=5;break;
          case 3:
            //$LASTPOS=11009968;//kernel.BaseActor:9968
            if (!(_this.origTG)) { __pc=4; break; }
            {
              //$LASTPOS=11010021;//kernel.BaseActor:10021
              _thread.setGroup(_this.origTG);
              //$LASTPOS=11010064;//kernel.BaseActor:10064
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
      
      //$LASTPOS=11010137;//kernel.BaseActor:10137
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=11010173;//kernel.BaseActor:10173
      Tonyu.globals.$Screen.draw();
    },
    fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11010137;//kernel.BaseActor:10137
      Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
      //$LASTPOS=11010173;//kernel.BaseActor:10173
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
      
      //$LASTPOS=11010882;//kernel.BaseActor:10882
      _this.all().die();
      //$LASTPOS=11010900;//kernel.BaseActor:10900
      new page(arg);
      //$LASTPOS=11010920;//kernel.BaseActor:10920
      _this.die();
    },
    fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11010882;//kernel.BaseActor:10882
      _this.all().die();
      //$LASTPOS=11010900;//kernel.BaseActor:10900
      new page(arg);
      //$LASTPOS=11010920;//kernel.BaseActor:10920
      _this.die();
      
      _thread.retVal=_this;return;
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11010955;//kernel.BaseActor:10955
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11010955;//kernel.BaseActor:10955
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
      
      //$LASTPOS=12000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=12000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=12000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=12000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=12000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=12000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=12000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      return {remove: (function anonymous_337() {
        
        //$LASTPOS=12000352;//kernel.EventHandler:352
        _this.removeListener(f);
      })};
    },
    fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000126;//kernel.EventHandler:126
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=12000173;//kernel.EventHandler:173
        f=_this.target[f];
        
      }
      //$LASTPOS=12000198;//kernel.EventHandler:198
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      //$LASTPOS=12000287;//kernel.EventHandler:287
      _this.listeners.push(f);
      
      _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            _thread.exit({remove: (function anonymous_337() {
              
              //$LASTPOS=12000352;//kernel.EventHandler:352
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
      
      //$LASTPOS=12000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=12000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
    },
    fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=12000420;//kernel.EventHandler:420
      i = _this.listeners.indexOf(f);
      //$LASTPOS=12000453;//kernel.EventHandler:453
      _this.listeners.splice(i,1);
      
      _thread.retVal=_this;return;
    },
    fire :function _trc_EventHandler_fire(args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      var h;
      var _it_158;
      
      //$LASTPOS=12000499;//kernel.EventHandler:499
      if (_this.released) {
        return _this;
      }
      //$LASTPOS=12000526;//kernel.EventHandler:526
      t;
      //$LASTPOS=12000538;//kernel.EventHandler:538
      _it_158=Tonyu.iterator(_this.listeners,1);
      while(_it_158.next()) {
        h=_it_158[0];
        
        //$LASTPOS=12000782;//kernel.EventHandler:782
        _this.callEventHandler(h,args);
        
      }
    },
    fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var h;
      var _it_158;
      
      //$LASTPOS=12000499;//kernel.EventHandler:499
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=12000526;//kernel.EventHandler:526
      t;
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000538;//kernel.EventHandler:538
            _it_158=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_158.next())) { __pc=3; break; }
            h=_it_158[0];
            
            //$LASTPOS=12000782;//kernel.EventHandler:782
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
      
      //$LASTPOS=12000838;//kernel.EventHandler:838
      _this.released=true;
    },
    fiber$release :function _trc_EventHandler_f_release(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000838;//kernel.EventHandler:838
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
      
      //$LASTPOS=14000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      return {remove: (function anonymous_137() {
        
        //$LASTPOS=14000153;//kernel.WithinHandler:153
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_WithinHandler_f_addListener(_thread,d,r,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=14000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,f);
      _thread.retVal={remove: (function anonymous_137() {
        
        //$LASTPOS=14000153;//kernel.WithinHandler:153
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000213;//kernel.WithinHandler:213
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=14000232;//kernel.WithinHandler:232
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
      
      //$LASTPOS=15000050;//kernel.NoviceActor:50
      if (! n) {
        //$LASTPOS=15000057;//kernel.NoviceActor:57
        n=1;
      }
      //$LASTPOS=15000066;//kernel.NoviceActor:66
      //$LASTPOS=15000070;//kernel.NoviceActor:70
      n;
      while(n>0) {
        //$LASTPOS=15000081;//kernel.NoviceActor:81
        _this.update();
        n--;
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000050;//kernel.NoviceActor:50
      if (! n) {
        //$LASTPOS=15000057;//kernel.NoviceActor:57
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000066;//kernel.NoviceActor:66
            //$LASTPOS=15000070;//kernel.NoviceActor:70
            n;;
          case 1:
            if (!(n>0)) { __pc=3; break; }
            //$LASTPOS=15000081;//kernel.NoviceActor:81
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
      
      //$LASTPOS=15000113;//kernel.NoviceActor:113
      if (! _this._sprite) {
        //$LASTPOS=15000137;//kernel.NoviceActor:137
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=15000207;//kernel.NoviceActor:207
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000113;//kernel.NoviceActor:113
      if (! _this._sprite) {
        //$LASTPOS=15000137;//kernel.NoviceActor:137
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=15000207;//kernel.NoviceActor:207
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000257;//kernel.NoviceActor:257
      if (! size) {
        //$LASTPOS=15000268;//kernel.NoviceActor:268
        size=15;
      }
      //$LASTPOS=15000281;//kernel.NoviceActor:281
      _this.initSprite();
      //$LASTPOS=15000299;//kernel.NoviceActor:299
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000257;//kernel.NoviceActor:257
      if (! size) {
        //$LASTPOS=15000268;//kernel.NoviceActor:268
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000281;//kernel.NoviceActor:281
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=15000299;//kernel.NoviceActor:299
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000371;//kernel.NoviceActor:371
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
            //$LASTPOS=15000371;//kernel.NoviceActor:371
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
      
      //$LASTPOS=15000403;//kernel.NoviceActor:403
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000440;//kernel.NoviceActor:440
      _this._sprite.draw(ctx);
    },
    getCrashRect :function _trc_NoviceActor_getCrashRect() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this._sprite.getCrashRect();
    },
    go :function _trc_NoviceActor_go(x,y,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000533;//kernel.NoviceActor:533
      _this.initSprite();
      //$LASTPOS=15000551;//kernel.NoviceActor:551
      _this._sprite.x=x;
      //$LASTPOS=15000568;//kernel.NoviceActor:568
      _this._sprite.y=y;
      //$LASTPOS=15000585;//kernel.NoviceActor:585
      if (p!=null) {
        //$LASTPOS=15000598;//kernel.NoviceActor:598
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
            //$LASTPOS=15000533;//kernel.NoviceActor:533
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=15000551;//kernel.NoviceActor:551
            _this._sprite.x=x;
            //$LASTPOS=15000568;//kernel.NoviceActor:568
            _this._sprite.y=y;
            //$LASTPOS=15000585;//kernel.NoviceActor:585
            if (p!=null) {
              //$LASTPOS=15000598;//kernel.NoviceActor:598
              _this._sprite.p=p;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    change :function _trc_NoviceActor_change(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000646;//kernel.NoviceActor:646
      _this.initSprite();
      //$LASTPOS=15000664;//kernel.NoviceActor:664
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
            //$LASTPOS=15000646;//kernel.NoviceActor:646
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=15000664;//kernel.NoviceActor:664
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
      
      //$LASTPOS=16000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=16000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=16000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=16000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=16000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2; break; }
            //$LASTPOS=16000134;//kernel.MML:134
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
      
      //$LASTPOS=16000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=16000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=16000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=16000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=16000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=16000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=16000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=16000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=16000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=16000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=16000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=16000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=16000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=16000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=16000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=16000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=16000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=16000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      //$LASTPOS=16000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=16000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=16000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=16000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=16000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=16000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=16000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=16000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=16000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=16000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=16000616;//kernel.MML:616
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
      
      //$LASTPOS=16000755;//kernel.MML:755
      if (_this.m) {
        return _this.m.currentTime+_this.cTimeBase;
      }
      return - 1;
    },
    fiber$currentTime :function _trc_MML_f_currentTime(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=16000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=16000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=16000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=16000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=16000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=16000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=16000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=16000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=16001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=16000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=16000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=16000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=16000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=16000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=16000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=16000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=16001056;//kernel.MML:1056
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
      
      //$LASTPOS=17000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=17000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=17000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=17000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=17000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=17000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=17000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=17000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=17000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var k;
      var v;
      var _it_165;
      
      //$LASTPOS=17000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=17000343;//kernel.PlayMod:343
        _it_165=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_165.next()) {
          k=_it_165[0];
          v=_it_165[1];
          
          //$LASTPOS=17000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=17000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=17000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=17000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=17000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var mmls;
      var i;
      
      //$LASTPOS=17000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=17000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=17000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=17000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=17000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=17000647;//kernel.PlayMod:647
      //$LASTPOS=17000652;//kernel.PlayMod:652
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=17000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=17000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=17000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=17000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=17000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=17000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=17000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=17000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=17000629;//kernel.PlayMod:629
      mmls = [];
      //$LASTPOS=17000647;//kernel.PlayMod:647
      //$LASTPOS=17000652;//kernel.PlayMod:652
      i = 0;
      while(i<_arguments.length) {
        {
          //$LASTPOS=17000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
        i++;
      }
      //$LASTPOS=17000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=17000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
            //$LASTPOS=17000796;//kernel.PlayMod:796
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
      
      //$LASTPOS=17000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=17000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      //$LASTPOS=17000897;//kernel.PlayMod:897
      mmls = [];
      //$LASTPOS=17000915;//kernel.PlayMod:915
      //$LASTPOS=17000920;//kernel.PlayMod:920
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=17000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=17001002;//kernel.PlayMod:1002
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
      
      //$LASTPOS=18000028;//kernel.WaveTable:28
      _this.wav={};
      //$LASTPOS=18000036;//kernel.WaveTable:36
      _this.env={};
      //$LASTPOS=18000313;//kernel.WaveTable:313
      if (typeof  T!=="undefined") {
        //$LASTPOS=18000392;//kernel.WaveTable:392
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=18000460;//kernel.WaveTable:460
        _this.setEnv(0,_this.env);
        //$LASTPOS=18000480;//kernel.WaveTable:480
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000028;//kernel.WaveTable:28
      _this.wav={};
      //$LASTPOS=18000036;//kernel.WaveTable:36
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18000313;//kernel.WaveTable:313
            if (!(typeof  T!=="undefined")) { __pc=3; break; }
            //$LASTPOS=18000392;//kernel.WaveTable:392
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=18000460;//kernel.WaveTable:460
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=18000480;//kernel.WaveTable:480
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
      
      //$LASTPOS=18000070;//kernel.WaveTable:70
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000070;//kernel.WaveTable:70
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=18000114;//kernel.WaveTable:114
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000114;//kernel.WaveTable:114
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var synth;
      
      //$LASTPOS=18000148;//kernel.WaveTable:148
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=18000148;//kernel.WaveTable:148
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
      
      //$LASTPOS=19000064;//kernel.ParallelMod:64
      args = [];
      //$LASTPOS=19000083;//kernel.ParallelMod:83
      //$LASTPOS=19000088;//kernel.ParallelMod:88
      i = 1;
      while(i<arguments.length) {
        {
          //$LASTPOS=19000134;//kernel.ParallelMod:134
          args.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=19000173;//kernel.ParallelMod:173
      name = arguments[0];
      //$LASTPOS=19000202;//kernel.ParallelMod:202
      th;
      //$LASTPOS=19000216;//kernel.ParallelMod:216
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
      
      //$LASTPOS=20000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=20000059;//kernel.Scheduler:59
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000050;//kernel.Scheduler:50
      _this.cur=[];
      //$LASTPOS=20000059;//kernel.Scheduler:59
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
      
      //$LASTPOS=20000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=20000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=20000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=20000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      //$LASTPOS=20000316;//kernel.Scheduler:316
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=20000214;//kernel.Scheduler:214
      name=name||"main";
      //$LASTPOS=20000238;//kernel.Scheduler:238
      args=args||[];
      //$LASTPOS=20000258;//kernel.Scheduler:258
      th = Tonyu.thread();
      //$LASTPOS=20000286;//kernel.Scheduler:286
      th.apply(obj,name,args);
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20000316;//kernel.Scheduler:316
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
      
      //$LASTPOS=20000371;//kernel.Scheduler:371
      _this.cur.push(th);
      //$LASTPOS=20000390;//kernel.Scheduler:390
      th.scheduled=_this;
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000371;//kernel.Scheduler:371
      _this.cur.push(th);
      //$LASTPOS=20000390;//kernel.Scheduler:390
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=20000435;//kernel.Scheduler:435
      _this.next.push(th);
      //$LASTPOS=20000455;//kernel.Scheduler:455
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000435;//kernel.Scheduler:435
      _this.next.push(th);
      //$LASTPOS=20000455;//kernel.Scheduler:455
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      var _it_180;
      
      //$LASTPOS=20000497;//kernel.Scheduler:497
      _it_180=Tonyu.iterator(_this.cur,1);
      while(_it_180.next()) {
        t=_it_180[0];
        
        //$LASTPOS=20000524;//kernel.Scheduler:524
        delete t.scheduled;
        //$LASTPOS=20000553;//kernel.Scheduler:553
        t.steps();
        //$LASTPOS=20000573;//kernel.Scheduler:573
        if (t.preempted) {
          //$LASTPOS=20000650;//kernel.Scheduler:650
          _this.addToNext(t);
          
        }
        
      }
      //$LASTPOS=20000687;//kernel.Scheduler:687
      _this.cur=_this.next;
      //$LASTPOS=20000702;//kernel.Scheduler:702
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_180;
      
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20000497;//kernel.Scheduler:497
            _it_180=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_180.next())) { __pc=4; break; }
            t=_it_180[0];
            
            //$LASTPOS=20000524;//kernel.Scheduler:524
            delete t.scheduled;
            //$LASTPOS=20000553;//kernel.Scheduler:553
            t.steps();
            //$LASTPOS=20000573;//kernel.Scheduler:573
            if (!(t.preempted)) { __pc=3; break; }
            //$LASTPOS=20000650;//kernel.Scheduler:650
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=20000687;//kernel.Scheduler:687
            _this.cur=_this.next;
            //$LASTPOS=20000702;//kernel.Scheduler:702
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
      
      //$LASTPOS=21000105;//kernel.Actor:105
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=21000147;//kernel.Actor:147
      _this.initSprite();
    },
    initSprite :function _trc_Actor_initSprite() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=21000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=21000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=21000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=21000308;//kernel.Actor:308
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000186;//kernel.Actor:186
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=21000238;//kernel.Actor:238
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=21000276;//kernel.Actor:276
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=21000308;//kernel.Actor:308
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
      
      //$LASTPOS=22000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      return {remove: (function anonymous_133() {
        
        //$LASTPOS=22000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};
    },
    fiber$addListener :function _trc_CrashToHandler_f_addListener(_thread,d,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var retThread;
      
      //$LASTPOS=22000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,f);
      _thread.retVal={remove: (function anonymous_133() {
        
        //$LASTPOS=22000149;//kernel.CrashToHandler:149
        retThread.kill();
      })};return;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=22000209;//kernel.CrashToHandler:209
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=22000228;//kernel.CrashToHandler:228
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
      
      //$LASTPOS=23000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=23000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=23000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=23000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=23000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=23000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=23000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=23000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=23000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=23000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=23000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=23000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      
      //$LASTPOS=23000655;//kernel.GameScreen:655
      b = _this.bounds;
      //$LASTPOS=23000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=23000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=23000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      
      //$LASTPOS=23000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=23000878;//kernel.GameScreen:878
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
      
      //$LASTPOS=23000859;//kernel.GameScreen:859
      b = _this.bounds;
      //$LASTPOS=23000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      
      //$LASTPOS=23001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=23001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=23001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=23001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=23001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=23001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      //$LASTPOS=23001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=23001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=23001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=23001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=23001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23001265;//kernel.GameScreen:1265
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
      
      //$LASTPOS=24000056;//kernel.Map:56
      _this.sx=0;
      //$LASTPOS=24000066;//kernel.Map:66
      _this.sy=0;
      //$LASTPOS=24000076;//kernel.Map:76
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=24000094;//kernel.Map:94
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=24000165;//kernel.Map:165
      _this.mapObj=true;
      //$LASTPOS=24000182;//kernel.Map:182
      _this.mapTable=[];
      //$LASTPOS=24000201;//kernel.Map:201
      _this.mapOnTable=[];
      //$LASTPOS=24000222;//kernel.Map:222
      //$LASTPOS=24000226;//kernel.Map:226
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=24000254;//kernel.Map:254
          _this.rows=[];
          //$LASTPOS=24000273;//kernel.Map:273
          //$LASTPOS=24000277;//kernel.Map:277
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=24000309;//kernel.Map:309
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=24000342;//kernel.Map:342
          _this.mapTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=24000373;//kernel.Map:373
      //$LASTPOS=24000377;//kernel.Map:377
      j = 0;
      while(j<_this.row) {
        {
          //$LASTPOS=24000405;//kernel.Map:405
          _this.rows=[];
          //$LASTPOS=24000424;//kernel.Map:424
          //$LASTPOS=24000428;//kernel.Map:428
          i = 0;
          while(i<_this.col) {
            {
              //$LASTPOS=24000460;//kernel.Map:460
              _this.rows.push(- 1);
            }
            i++;
          }
          //$LASTPOS=24000493;//kernel.Map:493
          _this.mapOnTable.push(_this.rows);
        }
        j++;
      }
      //$LASTPOS=24000588;//kernel.Map:588
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=24000617;//kernel.Map:617
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=24000642;//kernel.Map:642
      //$LASTPOS=24000646;//kernel.Map:646
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=24000674;//kernel.Map:674
          //$LASTPOS=24000678;//kernel.Map:678
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=24000710;//kernel.Map:710
              _this.set(j,i,_this.mapData[i][j]);
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=24000754;//kernel.Map:754
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=24000781;//kernel.Map:781
      //$LASTPOS=24000785;//kernel.Map:785
      i = 0;
      while(i<_this.row) {
        {
          //$LASTPOS=24000813;//kernel.Map:813
          //$LASTPOS=24000817;//kernel.Map:817
          j = 0;
          while(j<_this.col) {
            {
              //$LASTPOS=24000849;//kernel.Map:849
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
      
      //$LASTPOS=24000617;//kernel.Map:617
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24000642;//kernel.Map:642
            //$LASTPOS=24000646;//kernel.Map:646
            i = 0;;
          case 1:
            if (!(i<_this.row)) { __pc=5; break; }
            //$LASTPOS=24000674;//kernel.Map:674
            //$LASTPOS=24000678;//kernel.Map:678
            j = 0;;
          case 2:
            if (!(j<_this.col)) { __pc=4; break; }
            //$LASTPOS=24000710;//kernel.Map:710
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
            j++;
            __pc=2;break;
          case 4:
            
            i++;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=24000754;//kernel.Map:754
            if (!(! _this.mapOnData)) { __pc=6; break; }
            _thread.exit(_this);return;
          case 6:
            
            //$LASTPOS=24000781;//kernel.Map:781
            //$LASTPOS=24000785;//kernel.Map:785
            i = 0;;
          case 7:
            if (!(i<_this.row)) { __pc=11; break; }
            //$LASTPOS=24000813;//kernel.Map:813
            //$LASTPOS=24000817;//kernel.Map:817
            j = 0;;
          case 8:
            if (!(j<_this.col)) { __pc=10; break; }
            //$LASTPOS=24000849;//kernel.Map:849
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
      
      //$LASTPOS=24000916;//kernel.Map:916
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=24000967;//kernel.Map:967
      if (! _this.baseData) {
        //$LASTPOS=24000981;//kernel.Map:981
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=24001016;//kernel.Map:1016
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=24001042;//kernel.Map:1042
      _this.mapData=_this.mapTable;
      //$LASTPOS=24001064;//kernel.Map:1064
      _this.row=_this.mapTable.length;
      //$LASTPOS=24001089;//kernel.Map:1089
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=24001117;//kernel.Map:1117
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=24001145;//kernel.Map:1145
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=24001171;//kernel.Map:1171
      if (_this.baseData.length>2&&_this.baseData[_this.baseData.length-1]!=_this.isNaN&&_this.baseData[_this.baseData.length-2]!=_this.isNaN) {
        //$LASTPOS=24001282;//kernel.Map:1282
        _this.chipWidth=_this.baseData[_this.baseData.length-2];
        //$LASTPOS=24001329;//kernel.Map:1329
        _this.chipHeight=_this.baseData[_this.baseData.length-1];
        
      }
      //$LASTPOS=24001379;//kernel.Map:1379
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=24001450;//kernel.Map:1450
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24000916;//kernel.Map:916
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=24000967;//kernel.Map:967
      if (! _this.baseData) {
        //$LASTPOS=24000981;//kernel.Map:981
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=24001016;//kernel.Map:1016
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=24001042;//kernel.Map:1042
      _this.mapData=_this.mapTable;
      //$LASTPOS=24001064;//kernel.Map:1064
      _this.row=_this.mapTable.length;
      //$LASTPOS=24001089;//kernel.Map:1089
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=24001117;//kernel.Map:1117
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=24001145;//kernel.Map:1145
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=24001171;//kernel.Map:1171
      if (_this.baseData.length>2&&_this.baseData[_this.baseData.length-1]!=_this.isNaN&&_this.baseData[_this.baseData.length-2]!=_this.isNaN) {
        //$LASTPOS=24001282;//kernel.Map:1282
        _this.chipWidth=_this.baseData[_this.baseData.length-2];
        //$LASTPOS=24001329;//kernel.Map:1329
        _this.chipHeight=_this.baseData[_this.baseData.length-1];
        
      }
      //$LASTPOS=24001379;//kernel.Map:1379
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24001450;//kernel.Map:1450
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
      
      //$LASTPOS=24001490;//kernel.Map:1490
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=24001557;//kernel.Map:1557
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=24001626;//kernel.Map:1626
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=24001659;//kernel.Map:1659
      p=Math.floor(p);
      //$LASTPOS=24001680;//kernel.Map:1680
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=24001717;//kernel.Map:1717
      if (! _this.pImg) {
        //$LASTPOS=24001738;//kernel.Map:1738
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=24001836;//kernel.Map:1836
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=24001912;//kernel.Map:1912
      _this.ctx.save();
      //$LASTPOS=24001928;//kernel.Map:1928
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=24002069;//kernel.Map:2069
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24001490;//kernel.Map:1490
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=24001557;//kernel.Map:1557
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=24001626;//kernel.Map:1626
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=24001659;//kernel.Map:1659
      p=Math.floor(p);
      //$LASTPOS=24001680;//kernel.Map:1680
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=24001717;//kernel.Map:1717
      if (! _this.pImg) {
        //$LASTPOS=24001738;//kernel.Map:1738
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=24001836;//kernel.Map:1836
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=24001912;//kernel.Map:1912
      _this.ctx.save();
      //$LASTPOS=24001928;//kernel.Map:1928
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=24002069;//kernel.Map:2069
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24002115;//kernel.Map:2115
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=24002182;//kernel.Map:2182
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=24002231;//kernel.Map:2231
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=24002265;//kernel.Map:2265
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=24002298;//kernel.Map:2298
      p=Math.floor(p);
      //$LASTPOS=24002319;//kernel.Map:2319
      _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
      //$LASTPOS=24002356;//kernel.Map:2356
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=24002379;//kernel.Map:2379
      _this.ctx.save();
      //$LASTPOS=24002395;//kernel.Map:2395
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=24002536;//kernel.Map:2536
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24002115;//kernel.Map:2115
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=24002182;//kernel.Map:2182
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=24002231;//kernel.Map:2231
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=24002265;//kernel.Map:2265
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=24002298;//kernel.Map:2298
            p=Math.floor(p);
            //$LASTPOS=24002319;//kernel.Map:2319
            _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
            //$LASTPOS=24002356;//kernel.Map:2356
            if (!(! _this.pImg)) { __pc=2; break; }
            _thread.exit(_this);return;
          case 2:
            
            //$LASTPOS=24002379;//kernel.Map:2379
            _this.ctx.save();
            //$LASTPOS=24002395;//kernel.Map:2395
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=24002536;//kernel.Map:2536
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24002580;//kernel.Map:2580
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
            //$LASTPOS=24002580;//kernel.Map:2580
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
      
      //$LASTPOS=24002672;//kernel.Map:2672
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
            //$LASTPOS=24002672;//kernel.Map:2672
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
      
      //$LASTPOS=24002762;//kernel.Map:2762
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24002762;//kernel.Map:2762
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
      
      //$LASTPOS=24002987;//kernel.Map:2987
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapOnTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24002987;//kernel.Map:2987
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
      
      //$LASTPOS=24003223;//kernel.Map:3223
      _this.sx=- scrollX;
      //$LASTPOS=24003240;//kernel.Map:3240
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=24003223;//kernel.Map:3223
      _this.sx=- scrollX;
      //$LASTPOS=24003240;//kernel.Map:3240
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=24003272;//kernel.Map:3272
      _this.pImg=_this.buf[0];
      //$LASTPOS=24003289;//kernel.Map:3289
      ctx.save();
      //$LASTPOS=24003305;//kernel.Map:3305
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=24003414;//kernel.Map:3414
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
      
      //$LASTPOS=25000067;//kernel.Panel:67
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=25000083;//kernel.Panel:83
      _this.width=_this.width;
      //$LASTPOS=25000105;//kernel.Panel:105
      _this.height=_this.height;
      //$LASTPOS=25000129;//kernel.Panel:129
      if (_this.align==null) {
        //$LASTPOS=25000145;//kernel.Panel:145
        _this.align="center";
      }
      //$LASTPOS=25000165;//kernel.Panel:165
      if (_this.alpha==null) {
        //$LASTPOS=25000181;//kernel.Panel:181
        _this.alpha=255;
      }
      //$LASTPOS=25000196;//kernel.Panel:196
      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000265;//kernel.Panel:265
      _this.width=width;
      //$LASTPOS=25000287;//kernel.Panel:287
      _this.height=height;
      //$LASTPOS=25000311;//kernel.Panel:311
      _this.buf=$("<canvas>").attr({width: width,height: height});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000265;//kernel.Panel:265
      _this.width=width;
      //$LASTPOS=25000287;//kernel.Panel:287
      _this.height=height;
      //$LASTPOS=25000311;//kernel.Panel:311
      _this.buf=$("<canvas>").attr({width: width,height: height});
      
      _thread.retVal=_this;return;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000377;//kernel.Panel:377
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000377;//kernel.Panel:377
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000442;//kernel.Panel:442
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25000475;//kernel.Panel:475
      _this.ctx.save();
      //$LASTPOS=25000540;//kernel.Panel:540
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=25000569;//kernel.Panel:569
      _this.ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000605;//kernel.Panel:605
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=25000649;//kernel.Panel:649
      _this.ctx.restore();
    },
    fiber$fillRect :function _trc_Panel_f_fillRect(_thread,x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000442;//kernel.Panel:442
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25000475;//kernel.Panel:475
      _this.ctx.save();
      //$LASTPOS=25000540;//kernel.Panel:540
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=25000569;//kernel.Panel:569
      _this.ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000605;//kernel.Panel:605
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=25000649;//kernel.Panel:649
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25000702;//kernel.Panel:702
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25000735;//kernel.Panel:735
      _this.ctx.save();
      //$LASTPOS=25000800;//kernel.Panel:800
      _this.ctx.textAlign=align;
      //$LASTPOS=25000827;//kernel.Panel:827
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=25000856;//kernel.Panel:856
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=25000894;//kernel.Panel:894
      _this.ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000930;//kernel.Panel:930
      _this.ctx.fillText(text,x,y);
      //$LASTPOS=25000958;//kernel.Panel:958
      _this.ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25000702;//kernel.Panel:702
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25000735;//kernel.Panel:735
      _this.ctx.save();
      //$LASTPOS=25000800;//kernel.Panel:800
      _this.ctx.textAlign=align;
      //$LASTPOS=25000827;//kernel.Panel:827
      _this.ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=25000856;//kernel.Panel:856
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=25000894;//kernel.Panel:894
      _this.ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000930;//kernel.Panel:930
      _this.ctx.fillText(text,x,y);
      //$LASTPOS=25000958;//kernel.Panel:958
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25001020;//kernel.Panel:1020
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25001053;//kernel.Panel:1053
      _this.ctx.save();
      //$LASTPOS=25001069;//kernel.Panel:1069
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=25001117;//kernel.Panel:1117
      _this.ctx.restore();
    },
    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25001020;//kernel.Panel:1020
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25001053;//kernel.Panel:1053
      _this.ctx.save();
      //$LASTPOS=25001069;//kernel.Panel:1069
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=25001117;//kernel.Panel:1117
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25001160;//kernel.Panel:1160
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=25001257;//kernel.Panel:1257
        _this.ctx=_this.buf[0].getContext("2d");
        //$LASTPOS=25001294;//kernel.Panel:1294
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=25001345;//kernel.Panel:1345
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=25001482;//kernel.Panel:1482
        _this.colordata=[0,0,0,0];
        
      }
      return (_this.colordata);
    },
    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25001160;//kernel.Panel:1160
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=25001257;//kernel.Panel:1257
        _this.ctx=_this.buf[0].getContext("2d");
        //$LASTPOS=25001294;//kernel.Panel:1294
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=25001345;//kernel.Panel:1345
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=25001482;//kernel.Panel:1482
        _this.colordata=[0,0,0,0];
        
      }
      _thread.retVal=(_this.colordata);return;
      
      
      _thread.retVal=_this;return;
    },
    scroll :function _trc_Panel_scroll(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25001564;//kernel.Panel:1564
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25001597;//kernel.Panel:1597
      _this.ctx.save();
      //$LASTPOS=25001613;//kernel.Panel:1613
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=25001673;//kernel.Panel:1673
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=25001706;//kernel.Panel:1706
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=25001757;//kernel.Panel:1757
      _this.ctx.restore();
    },
    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=25001564;//kernel.Panel:1564
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=25001597;//kernel.Panel:1597
      _this.ctx.save();
      //$LASTPOS=25001613;//kernel.Panel:1613
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      
      _thread.enter(function _trc_Panel_ent_scroll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=25001673;//kernel.Panel:1673
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=25001706;//kernel.Panel:1706
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=25001757;//kernel.Panel:1757
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=25001790;//kernel.Panel:1790
      _this.pImg=_this.buf[0];
      //$LASTPOS=25001807;//kernel.Panel:1807
      ctx.save();
      //$LASTPOS=25001823;//kernel.Panel:1823
      if (_this.align=="left") {
        //$LASTPOS=25001850;//kernel.Panel:1850
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=25001897;//kernel.Panel:1897
        if (_this.align=="center") {
          //$LASTPOS=25001926;//kernel.Panel:1926
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=25001956;//kernel.Panel:1956
          if (_this.align=="right") {
            //$LASTPOS=25001984;//kernel.Panel:1984
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=25002031;//kernel.Panel:2031
      if (_this.rotation!=0) {
        //$LASTPOS=25002061;//kernel.Panel:2061
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=25002119;//kernel.Panel:2119
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=25002204;//kernel.Panel:2204
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=25002293;//kernel.Panel:2293
      ctx.restore();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}
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
      
      //$LASTPOS=26000089;//kernel.ScaledCanvas:89
      _this.extend(opt);
      //$LASTPOS=26000134;//kernel.ScaledCanvas:134
      _this.resize(_this.width,_this.height);
      //$LASTPOS=26000161;//kernel.ScaledCanvas:161
      _this.cw=_this.canvas.width();
      //$LASTPOS=26000184;//kernel.ScaledCanvas:184
      _this.ch=_this.canvas.height();
      //$LASTPOS=26000208;//kernel.ScaledCanvas:208
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=26000245;//kernel.ScaledCanvas:245
      _this.color="rgb(20,80,180)";
      //$LASTPOS=26000278;//kernel.ScaledCanvas:278
      _this.sx=0;
      //$LASTPOS=26000288;//kernel.ScaledCanvas:288
      _this.sy=0;
      //$LASTPOS=26000298;//kernel.ScaledCanvas:298
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26000360;//kernel.ScaledCanvas:360
      _this.width=width;
      //$LASTPOS=26000382;//kernel.ScaledCanvas:382
      _this.height=height;
      //$LASTPOS=26000406;//kernel.ScaledCanvas:406
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=26000448;//kernel.ScaledCanvas:448
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=26000483;//kernel.ScaledCanvas:483
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=26000507;//kernel.ScaledCanvas:507
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=26000533;//kernel.ScaledCanvas:533
      if (Tonyu.globals.$panel) {
        //$LASTPOS=26000553;//kernel.ScaledCanvas:553
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=26000606;//kernel.ScaledCanvas:606
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=26000639;//kernel.ScaledCanvas:639
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=26000675;//kernel.ScaledCanvas:675
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=26000702;//kernel.ScaledCanvas:702
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=26000762;//kernel.ScaledCanvas:762
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=26000802;//kernel.ScaledCanvas:802
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=26000843;//kernel.ScaledCanvas:843
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26000360;//kernel.ScaledCanvas:360
      _this.width=width;
      //$LASTPOS=26000382;//kernel.ScaledCanvas:382
      _this.height=height;
      //$LASTPOS=26000406;//kernel.ScaledCanvas:406
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=26000448;//kernel.ScaledCanvas:448
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=26000483;//kernel.ScaledCanvas:483
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=26000507;//kernel.ScaledCanvas:507
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=26000533;//kernel.ScaledCanvas:533
      if (Tonyu.globals.$panel) {
        //$LASTPOS=26000553;//kernel.ScaledCanvas:553
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=26000606;//kernel.ScaledCanvas:606
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=26000639;//kernel.ScaledCanvas:639
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=26000675;//kernel.ScaledCanvas:675
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=26000702;//kernel.ScaledCanvas:702
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=26000762;//kernel.ScaledCanvas:762
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=26000802;//kernel.ScaledCanvas:802
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=26000843;//kernel.ScaledCanvas:843
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var larger;
      var smaller;
      
      //$LASTPOS=26000960;//kernel.ScaledCanvas:960
      larger = 200;
      //$LASTPOS=26000980;//kernel.ScaledCanvas:980
      smaller = 5;
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=26000960;//kernel.ScaledCanvas:960
      larger = 200;
      //$LASTPOS=26000980;//kernel.ScaledCanvas:980
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
      
      //$LASTPOS=26001110;//kernel.ScaledCanvas:1110
      _this.cw=_this.canvas.width();
      //$LASTPOS=26001133;//kernel.ScaledCanvas:1133
      _this.ch=_this.canvas.height();
      //$LASTPOS=26001157;//kernel.ScaledCanvas:1157
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=26001200;//kernel.ScaledCanvas:1200
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=26001243;//kernel.ScaledCanvas:1243
      if (calch>_this.ch) {
        //$LASTPOS=26001257;//kernel.ScaledCanvas:1257
        calch=_this.ch;
      }
      //$LASTPOS=26001271;//kernel.ScaledCanvas:1271
      if (calcw>_this.cw) {
        //$LASTPOS=26001285;//kernel.ScaledCanvas:1285
        calcw=_this.cw;
      }
      //$LASTPOS=26001299;//kernel.ScaledCanvas:1299
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=26001330;//kernel.ScaledCanvas:1330
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=26001385;//kernel.ScaledCanvas:1385
        calcw=_this.width;
        //$LASTPOS=26001397;//kernel.ScaledCanvas:1397
        calch=_this.height;
        
      }
      //$LASTPOS=26001421;//kernel.ScaledCanvas:1421
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=26001463;//kernel.ScaledCanvas:1463
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=26001505;//kernel.ScaledCanvas:1505
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=26001615;//kernel.ScaledCanvas:1615
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=26001658;//kernel.ScaledCanvas:1658
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=26001701;//kernel.ScaledCanvas:1701
      if (calch>_this.ch) {
        //$LASTPOS=26001715;//kernel.ScaledCanvas:1715
        calch=_this.ch;
      }
      //$LASTPOS=26001729;//kernel.ScaledCanvas:1729
      if (calcw>_this.cw) {
        //$LASTPOS=26001743;//kernel.ScaledCanvas:1743
        calcw=_this.cw;
      }
      //$LASTPOS=26001757;//kernel.ScaledCanvas:1757
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=26001812;//kernel.ScaledCanvas:1812
        calcw=_this.width;
        //$LASTPOS=26001824;//kernel.ScaledCanvas:1824
        calch=_this.height;
        
      }
      //$LASTPOS=26001848;//kernel.ScaledCanvas:1848
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=26001890;//kernel.ScaledCanvas:1890
      marginh = Math.floor((_this.ch-calch)/2);
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
      
      //$LASTPOS=26001615;//kernel.ScaledCanvas:1615
      calcw = _this.ch/_this.height*_this.width;
      //$LASTPOS=26001658;//kernel.ScaledCanvas:1658
      calch = _this.cw/_this.width*_this.height;
      //$LASTPOS=26001701;//kernel.ScaledCanvas:1701
      if (calch>_this.ch) {
        //$LASTPOS=26001715;//kernel.ScaledCanvas:1715
        calch=_this.ch;
      }
      //$LASTPOS=26001729;//kernel.ScaledCanvas:1729
      if (calcw>_this.cw) {
        //$LASTPOS=26001743;//kernel.ScaledCanvas:1743
        calcw=_this.cw;
      }
      //$LASTPOS=26001757;//kernel.ScaledCanvas:1757
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=26001812;//kernel.ScaledCanvas:1812
        calcw=_this.width;
        //$LASTPOS=26001824;//kernel.ScaledCanvas:1824
        calch=_this.height;
        
      }
      //$LASTPOS=26001848;//kernel.ScaledCanvas:1848
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=26001890;//kernel.ScaledCanvas:1890
      marginh = Math.floor((_this.ch-calch)/2);
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26002046;//kernel.ScaledCanvas:2046
      _this.color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26002046;//kernel.ScaledCanvas:2046
      _this.color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      
      //$LASTPOS=26002087;//kernel.ScaledCanvas:2087
      ctx = cv.getContext("2d");
      //$LASTPOS=26002120;//kernel.ScaledCanvas:2120
      ctx.save();
      //$LASTPOS=26002136;//kernel.ScaledCanvas:2136
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=26002169;//kernel.ScaledCanvas:2169
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=26002194;//kernel.ScaledCanvas:2194
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=26002236;//kernel.ScaledCanvas:2236
      if (_this.isDrawGrid) {
        //$LASTPOS=26002252;//kernel.ScaledCanvas:2252
        _this.drawGrid(cv);
      }
      //$LASTPOS=26002270;//kernel.ScaledCanvas:2270
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=26002087;//kernel.ScaledCanvas:2087
      ctx = cv.getContext("2d");
      //$LASTPOS=26002120;//kernel.ScaledCanvas:2120
      ctx.save();
      //$LASTPOS=26002136;//kernel.ScaledCanvas:2136
      ctx.fillStyle=Tonyu.globals.$Screen.color;
      //$LASTPOS=26002169;//kernel.ScaledCanvas:2169
      ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=26002194;//kernel.ScaledCanvas:2194
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=26002236;//kernel.ScaledCanvas:2236
      if (_this.isDrawGrid) {
        //$LASTPOS=26002252;//kernel.ScaledCanvas:2252
        _this.drawGrid(cv);
      }
      //$LASTPOS=26002270;//kernel.ScaledCanvas:2270
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=26002600;//kernel.ScaledCanvas:2600
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26002600;//kernel.ScaledCanvas:2600
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
      
      //$LASTPOS=27000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=27000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=27000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=27000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=27000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=27000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=27000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=27000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=27000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=27000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=27000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=27000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000194;//kernel.Sprites:194
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=27000231;//kernel.Sprites:231
      _this.sprites.push(s);
      //$LASTPOS=27000253;//kernel.Sprites:253
      if (s.__genId==null) {
        //$LASTPOS=27000283;//kernel.Sprites:283
        s.__genId=_this.objId;
        //$LASTPOS=27000309;//kernel.Sprites:309
        _this.objId++;
        
      }
      //$LASTPOS=27000330;//kernel.Sprites:330
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var idx;
      
      //$LASTPOS=27000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=27000433;//kernel.Sprites:433
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=27000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=27000485;//kernel.Sprites:485
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=27000400;//kernel.Sprites:400
      idx = _this.sprites.indexOf(s);
      //$LASTPOS=27000433;//kernel.Sprites:433
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=27000457;//kernel.Sprites:457
      _this.sprites.splice(idx,1);
      //$LASTPOS=27000485;//kernel.Sprites:485
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=27000542;//kernel.Sprites:542
      //$LASTPOS=27000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=27000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=27000641;//kernel.Sprites:641
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
      
      //$LASTPOS=27000542;//kernel.Sprites:542
      //$LASTPOS=27000547;//kernel.Sprites:547
      i = _this.sprites.length-1;
      while(i>=0) {
        {
          //$LASTPOS=27000595;//kernel.Sprites:595
          if (_this.sprites[i].oneframeSprite) {
            //$LASTPOS=27000641;//kernel.Sprites:641
            _this.sprites.splice(i,1);
            
          }
        }
        i--;
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27000702;//kernel.Sprites:702
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var val1;
      var val2;
      
      //$LASTPOS=27000775;//kernel.Sprites:775
      val1 = obj1.zOrder;
      //$LASTPOS=27000802;//kernel.Sprites:802
      val2 = obj2.zOrder;
      //$LASTPOS=27000829;//kernel.Sprites:829
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=27000875;//kernel.Sprites:875
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=27000920;//kernel.Sprites:920
          if (val1==val2) {
            //$LASTPOS=27000945;//kernel.Sprites:945
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
      
      //$LASTPOS=27000775;//kernel.Sprites:775
      val1 = obj1.zOrder;
      //$LASTPOS=27000802;//kernel.Sprites:802
      val2 = obj2.zOrder;
      //$LASTPOS=27000829;//kernel.Sprites:829
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=27000875;//kernel.Sprites:875
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=27000920;//kernel.Sprites:920
          if (val1==val2) {
            //$LASTPOS=27000945;//kernel.Sprites:945
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
      
      //$LASTPOS=27001105;//kernel.Sprites:1105
      ctx = cv.getContext("2d");
      //$LASTPOS=27001139;//kernel.Sprites:1139
      ctx.save();
      //$LASTPOS=27001284;//kernel.Sprites:1284
      orderArray = [];
      //$LASTPOS=27001308;//kernel.Sprites:1308
      orderArray=orderArray.concat(_this.sprites);
      //$LASTPOS=27001352;//kernel.Sprites:1352
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=27001385;//kernel.Sprites:1385
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=27001414;//kernel.Sprites:1414
      orderArray.forEach((function anonymous_1433(s) {
        
        //$LASTPOS=27001448;//kernel.Sprites:1448
        s.draw(ctx);
      }));
      //$LASTPOS=27001475;//kernel.Sprites:1475
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27001521;//kernel.Sprites:1521
      _this.hitWatchers.forEach((function anonymous_1541(w) {
        
        //$LASTPOS=27001565;//kernel.Sprites:1565
        _this.sprites.forEach((function anonymous_1581(a) {
          var a_owner;
          
          //$LASTPOS=27001653;//kernel.Sprites:1653
          a_owner = a;
          //$LASTPOS=27001695;//kernel.Sprites:1695
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=27001748;//kernel.Sprites:1748
          _this.sprites.forEach((function anonymous_1764(b) {
            var b_owner;
            
            //$LASTPOS=27001796;//kernel.Sprites:1796
            b_owner = b;
            //$LASTPOS=27001842;//kernel.Sprites:1842
            if (a===b) {
              return _this;
            }
            //$LASTPOS=27001878;//kernel.Sprites:1878
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=27001983;//kernel.Sprites:1983
            if (a.crashTo1(b)) {
              //$LASTPOS=27002086;//kernel.Sprites:2086
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
      
      //$LASTPOS=27001521;//kernel.Sprites:1521
      _this.hitWatchers.forEach((function anonymous_1541(w) {
        
        //$LASTPOS=27001565;//kernel.Sprites:1565
        _this.sprites.forEach((function anonymous_1581(a) {
          var a_owner;
          
          //$LASTPOS=27001653;//kernel.Sprites:1653
          a_owner = a;
          //$LASTPOS=27001695;//kernel.Sprites:1695
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=27001748;//kernel.Sprites:1748
          _this.sprites.forEach((function anonymous_1764(b) {
            var b_owner;
            
            //$LASTPOS=27001796;//kernel.Sprites:1796
            b_owner = b;
            //$LASTPOS=27001842;//kernel.Sprites:1842
            if (a===b) {
              return _this;
            }
            //$LASTPOS=27001878;//kernel.Sprites:1878
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=27001983;//kernel.Sprites:1983
            if (a.crashTo1(b)) {
              //$LASTPOS=27002086;//kernel.Sprites:2086
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
      
      //$LASTPOS=27002216;//kernel.Sprites:2216
      p = {A: typeA,B: typeB,h: onHit};
      //$LASTPOS=27002280;//kernel.Sprites:2280
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ctx;
      var i;
      
      //$LASTPOS=27002333;//kernel.Sprites:2333
      ctx = c.getContext("2d");
      //$LASTPOS=27002366;//kernel.Sprites:2366
      ctx.textBaseline="top";
      //$LASTPOS=27002395;//kernel.Sprites:2395
      ctx.save();
      //$LASTPOS=27002412;//kernel.Sprites:2412
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=27002452;//kernel.Sprites:2452
      //$LASTPOS=27002457;//kernel.Sprites:2457
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=27002497;//kernel.Sprites:2497
          ctx.beginPath();
          //$LASTPOS=27002523;//kernel.Sprites:2523
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=27002569;//kernel.Sprites:2569
          ctx.moveTo(i,0);
          //$LASTPOS=27002595;//kernel.Sprites:2595
          ctx.lineTo(i,c.height);
          //$LASTPOS=27002628;//kernel.Sprites:2628
          ctx.closePath();
          //$LASTPOS=27002654;//kernel.Sprites:2654
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=27002686;//kernel.Sprites:2686
      //$LASTPOS=27002691;//kernel.Sprites:2691
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=27002732;//kernel.Sprites:2732
          ctx.beginPath();
          //$LASTPOS=27002758;//kernel.Sprites:2758
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=27002804;//kernel.Sprites:2804
          ctx.moveTo(0,i);
          //$LASTPOS=27002830;//kernel.Sprites:2830
          ctx.lineTo(c.width,i);
          //$LASTPOS=27002862;//kernel.Sprites:2862
          ctx.closePath();
          //$LASTPOS=27002888;//kernel.Sprites:2888
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=27002914;//kernel.Sprites:2914
      ctx.fillStyle="white";
      //$LASTPOS=27002942;//kernel.Sprites:2942
      ctx.font="15px monospaced";
      //$LASTPOS=27002975;//kernel.Sprites:2975
      //$LASTPOS=27002980;//kernel.Sprites:2980
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=27003023;//kernel.Sprites:3023
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=27003057;//kernel.Sprites:3057
      //$LASTPOS=27003062;//kernel.Sprites:3062
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=27003106;//kernel.Sprites:3106
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=27003140;//kernel.Sprites:3140
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=27002333;//kernel.Sprites:2333
      ctx = c.getContext("2d");
      //$LASTPOS=27002366;//kernel.Sprites:2366
      ctx.textBaseline="top";
      //$LASTPOS=27002395;//kernel.Sprites:2395
      ctx.save();
      //$LASTPOS=27002412;//kernel.Sprites:2412
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=27002452;//kernel.Sprites:2452
      //$LASTPOS=27002457;//kernel.Sprites:2457
      i = 0;
      while(i<c.width) {
        {
          //$LASTPOS=27002497;//kernel.Sprites:2497
          ctx.beginPath();
          //$LASTPOS=27002523;//kernel.Sprites:2523
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=27002569;//kernel.Sprites:2569
          ctx.moveTo(i,0);
          //$LASTPOS=27002595;//kernel.Sprites:2595
          ctx.lineTo(i,c.height);
          //$LASTPOS=27002628;//kernel.Sprites:2628
          ctx.closePath();
          //$LASTPOS=27002654;//kernel.Sprites:2654
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=27002686;//kernel.Sprites:2686
      //$LASTPOS=27002691;//kernel.Sprites:2691
      i = 0;
      while(i<c.height) {
        {
          //$LASTPOS=27002732;//kernel.Sprites:2732
          ctx.beginPath();
          //$LASTPOS=27002758;//kernel.Sprites:2758
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=27002804;//kernel.Sprites:2804
          ctx.moveTo(0,i);
          //$LASTPOS=27002830;//kernel.Sprites:2830
          ctx.lineTo(c.width,i);
          //$LASTPOS=27002862;//kernel.Sprites:2862
          ctx.closePath();
          //$LASTPOS=27002888;//kernel.Sprites:2888
          ctx.stroke();
        }
        i+=10;
      }
      //$LASTPOS=27002914;//kernel.Sprites:2914
      ctx.fillStyle="white";
      //$LASTPOS=27002942;//kernel.Sprites:2942
      ctx.font="15px monospaced";
      //$LASTPOS=27002975;//kernel.Sprites:2975
      //$LASTPOS=27002980;//kernel.Sprites:2980
      i = 100;
      while(i<c.width) {
        {
          //$LASTPOS=27003023;//kernel.Sprites:3023
          ctx.fillText(i,i,0);
        }
        i+=100;
      }
      //$LASTPOS=27003057;//kernel.Sprites:3057
      //$LASTPOS=27003062;//kernel.Sprites:3062
      i = 100;
      while(i<c.height) {
        {
          //$LASTPOS=27003106;//kernel.Sprites:3106
          ctx.fillText(i,0,i);
        }
        i+=100;
      }
      //$LASTPOS=27003140;//kernel.Sprites:3140
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setImageList :function _trc_Sprites_setImageList(il) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=27003192;//kernel.Sprites:3192
      _this.imageList=il;
    },
    fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27003192;//kernel.Sprites:3192
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
      
      //$LASTPOS=27003304;//kernel.Sprites:3304
      _this.sx=scrollX;
      //$LASTPOS=27003321;//kernel.Sprites:3321
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=27003304;//kernel.Sprites:3304
      _this.sx=scrollX;
      //$LASTPOS=27003321;//kernel.Sprites:3321
      _this.sy=scrollY;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2Mod',
  shortName: 'T2Mod',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
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
      
      //$LASTPOS=28000034;//kernel.T2Mod:34
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=28000034;//kernel.T2Mod:34
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
  fullName: 'kernel.T2World',
  shortName: 'T2World',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2Mod],
  methods: {
    main :function _trc_T2World_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000150;//kernel.T2World:150
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
            //$LASTPOS=29000150;//kernel.T2World:150
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
      
      //$LASTPOS=29000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=29000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000133;//kernel.T2World:133
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
      
      //$LASTPOS=29000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=29000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=29000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=29000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      //$LASTPOS=29000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=29000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=29000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=29000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=29000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=29000572;//kernel.T2World:572
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
            //$LASTPOS=29000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=29000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=29000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=29000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            //$LASTPOS=29000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            //$LASTPOS=29000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=29000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=29000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=29000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=29000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=29000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=29000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=29000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=29000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=29000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=29000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=29000976;//kernel.T2World:976
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
            //$LASTPOS=29000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=29000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=29000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=29000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=29000976;//kernel.T2World:976
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
      
      //$LASTPOS=29001017;//kernel.T2World:1017
      //$LASTPOS=29001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=29001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=29001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=29001114;//kernel.T2World:1114
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
      
      //$LASTPOS=29001017;//kernel.T2World:1017
      //$LASTPOS=29001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      while(b) {
        {
          //$LASTPOS=29001076;//kernel.T2World:1076
          d = b.GetUserData();
          //$LASTPOS=29001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=29001114;//kernel.T2World:1114
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
  fullName: 'kernel.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
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
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}
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
      
      //$LASTPOS=30000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        return _this;
      }
      //$LASTPOS=30000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=30000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=30000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000124;//kernel.T2MediaPlayer:124
      if (T2MediaLib.inited) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=30000160;//kernel.T2MediaPlayer:160
      T2MediaLib.init();
      //$LASTPOS=30000184;//kernel.T2MediaPlayer:184
      T2MediaLib.inited=true;
      //$LASTPOS=30000213;//kernel.T2MediaPlayer:213
      _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    clearSEData :function _trc_T2MediaPlayer_clearSEData() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=30000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
    },
    fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000281;//kernel.T2MediaPlayer:281
      T2MediaLib.allStopBGM();
      //$LASTPOS=30000311;//kernel.T2MediaPlayer:311
      T2MediaLib.allClearData();
      
      _thread.retVal=_this;return;
    },
    clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30000367;//kernel.T2MediaPlayer:367
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
            //$LASTPOS=30000367;//kernel.T2MediaPlayer:367
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
      
      //$LASTPOS=30000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
    },
    fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30000414;//kernel.T2MediaPlayer:414
      T2MediaLib.clearData(idx);
      
      _thread.retVal=_this;return;
    },
    loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var data;
      
      //$LASTPOS=30000508;//kernel.T2MediaPlayer:508
      _this.runAsync((function anonymous_517(succ,err) {
        
        //$LASTPOS=30000567;//kernel.T2MediaPlayer:567
        T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
      }));
      //$LASTPOS=30000620;//kernel.T2MediaPlayer:620
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
            //$LASTPOS=30000508;//kernel.T2MediaPlayer:508
            _this.fiber$runAsync(_thread, (function anonymous_517(succ,err) {
              
              //$LASTPOS=30000567;//kernel.T2MediaPlayer:567
              T2MediaLib.loadSE(idx,src,{succ: succ,err: err});
            }));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=30000620;//kernel.T2MediaPlayer:620
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
      var _it_225;
      var name;
      var url;
      var e;
      
      //$LASTPOS=30000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=30000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=30000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=30000974;//kernel.T2MediaPlayer:974
      _it_225=Tonyu.iterator(r.sounds,1);
      while(_it_225.next()) {
        s=_it_225[0];
        
        //$LASTPOS=30001010;//kernel.T2MediaPlayer:1010
        name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
        //$LASTPOS=30001084;//kernel.T2MediaPlayer:1084
        Tonyu.setGlobal(name,name);
        try {
          //$LASTPOS=30001142;//kernel.T2MediaPlayer:1142
          _this.print("Loading Sound2: "+name);
          //$LASTPOS=30001187;//kernel.T2MediaPlayer:1187
          _this.loadSE(name,url);
          
        } catch (e) {
          //$LASTPOS=30001242;//kernel.T2MediaPlayer:1242
          _this.print("Fail");
          //$LASTPOS=30001270;//kernel.T2MediaPlayer:1270
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
      var _it_225;
      var name;
      var url;
      var e;
      
      //$LASTPOS=30000881;//kernel.T2MediaPlayer:881
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=30000910;//kernel.T2MediaPlayer:910
      r = prj.getResource();
      //$LASTPOS=30000940;//kernel.T2MediaPlayer:940
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30000974;//kernel.T2MediaPlayer:974
            _it_225=Tonyu.iterator(r.sounds,1);
          case 1:
            if (!(_it_225.next())) { __pc=5; break; }
            s=_it_225[0];
            
            //$LASTPOS=30001010;//kernel.T2MediaPlayer:1010
            name = s.name;url = Tonyu.Assets.resolve(s.url,prj.getDir());
            //$LASTPOS=30001084;//kernel.T2MediaPlayer:1084
            Tonyu.setGlobal(name,name);
            _thread.enterTry(3);
            //$LASTPOS=30001142;//kernel.T2MediaPlayer:1142
            _this.print("Loading Sound2: "+name);
            //$LASTPOS=30001187;//kernel.T2MediaPlayer:1187
            _this.fiber$loadSE(_thread, name, url);
            __pc=2;return;
          case 2:
            _thread.exitTry();
            __pc=4;break;
          case 3:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=30001242;//kernel.T2MediaPlayer:1242
              _this.print("Fail");
              //$LASTPOS=30001270;//kernel.T2MediaPlayer:1270
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
      
      //$LASTPOS=30001408;//kernel.T2MediaPlayer:1408
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=30001467;//kernel.T2MediaPlayer:1467
      if (vol==null) {
        //$LASTPOS=30001484;//kernel.T2MediaPlayer:1484
        vol=128;
      }
      //$LASTPOS=30001573;//kernel.T2MediaPlayer:1573
      if (vol<0) {
        //$LASTPOS=30001593;//kernel.T2MediaPlayer:1593
        vol=0;
      } else {
        //$LASTPOS=30001614;//kernel.T2MediaPlayer:1614
        if (vol>128) {
          //$LASTPOS=30001629;//kernel.T2MediaPlayer:1629
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
      
      //$LASTPOS=30001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=30001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      //$LASTPOS=30002024;//kernel.T2MediaPlayer:2024
      while (data==null) {
        //$LASTPOS=30002056;//kernel.T2MediaPlayer:2056
        _this.update();
        //$LASTPOS=30002075;//kernel.T2MediaPlayer:2075
        data=T2MediaLib.getBGMData(idx);
        
      }
      return data;
    },
    fiber$loadBGM :function _trc_T2MediaPlayer_f_loadBGM(_thread,idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var data;
      
      //$LASTPOS=30001920;//kernel.T2MediaPlayer:1920
      T2MediaLib.loadBGM(idx,src);
      //$LASTPOS=30001980;//kernel.T2MediaPlayer:1980
      data = T2MediaLib.getBGMData(idx);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30002024;//kernel.T2MediaPlayer:2024
          case 1:
            if (!(data==null)) { __pc=3; break; }
            //$LASTPOS=30002056;//kernel.T2MediaPlayer:2056
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=30002075;//kernel.T2MediaPlayer:2075
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
      
      //$LASTPOS=30002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=30002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=30002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=30002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=30002278;//kernel.T2MediaPlayer:2278
        offset=0;
      }
      return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30002196;//kernel.T2MediaPlayer:2196
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=30002219;//kernel.T2MediaPlayer:2219
      if (loop===null) {
        //$LASTPOS=30002238;//kernel.T2MediaPlayer:2238
        loop=false;
      }
      //$LASTPOS=30002257;//kernel.T2MediaPlayer:2257
      if (offset===null) {
        //$LASTPOS=30002278;//kernel.T2MediaPlayer:2278
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
      
      //$LASTPOS=30002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=30002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=30002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=30002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=30002715;//kernel.T2MediaPlayer:2715
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30002564;//kernel.T2MediaPlayer:2564
      vol=vol/128;
      //$LASTPOS=30002659;//kernel.T2MediaPlayer:2659
      if (vol>1) {
        //$LASTPOS=30002679;//kernel.T2MediaPlayer:2679
        vol=1;
      } else {
        //$LASTPOS=30002700;//kernel.T2MediaPlayer:2700
        if (vol<0) {
          //$LASTPOS=30002715;//kernel.T2MediaPlayer:2715
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
      
      //$LASTPOS=30003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=30003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=30003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=30003278;//kernel.T2MediaPlayer:3278
        offset=0;
      }
      return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30003219;//kernel.T2MediaPlayer:3219
      if (loop===null) {
        //$LASTPOS=30003238;//kernel.T2MediaPlayer:3238
        loop=false;
      }
      //$LASTPOS=30003257;//kernel.T2MediaPlayer:3257
      if (offset===null) {
        //$LASTPOS=30003278;//kernel.T2MediaPlayer:3278
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
      
      //$LASTPOS=30003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=30003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=30003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=30003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=30003737;//kernel.T2MediaPlayer:3737
          vol=0;
        }
      }
      return T2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30003586;//kernel.T2MediaPlayer:3586
      vol=vol/128;
      //$LASTPOS=30003681;//kernel.T2MediaPlayer:3681
      if (vol>1) {
        //$LASTPOS=30003701;//kernel.T2MediaPlayer:3701
        vol=1;
      } else {
        //$LASTPOS=30003722;//kernel.T2MediaPlayer:3722
        if (vol<0) {
          //$LASTPOS=30003737;//kernel.T2MediaPlayer:3737
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
      
      //$LASTPOS=30004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30004197;//kernel.T2MediaPlayer:4197
      T2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      //$LASTPOS=30004338;//kernel.T2MediaPlayer:4338
      while (T2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=30004383;//kernel.T2MediaPlayer:4383
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30004276;//kernel.T2MediaPlayer:4276
      T2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=30004338;//kernel.T2MediaPlayer:4338
          case 1:
            if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
            //$LASTPOS=30004383;//kernel.T2MediaPlayer:4383
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
      
      //$LASTPOS=30004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=30004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=30004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=30004501;//kernel.T2MediaPlayer:4501
        startTime=0;
      }
      return T2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30004439;//kernel.T2MediaPlayer:4439
      if (loop===null) {
        //$LASTPOS=30004458;//kernel.T2MediaPlayer:4458
        loop=false;
      }
      //$LASTPOS=30004477;//kernel.T2MediaPlayer:4477
      if (startTime===null) {
        //$LASTPOS=30004501;//kernel.T2MediaPlayer:4501
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
      
      //$LASTPOS=30004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=30004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=30004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=30004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=30004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      return T2MediaLib.setAudioVolume(vol);
    },
    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30004783;//kernel.T2MediaPlayer:4783
      vol=vol/128;
      //$LASTPOS=30004805;//kernel.T2MediaPlayer:4805
      if (vol>1) {
        //$LASTPOS=30004825;//kernel.T2MediaPlayer:4825
        vol=1;
      } else {
        //$LASTPOS=30004846;//kernel.T2MediaPlayer:4846
        if (vol<0) {
          //$LASTPOS=30004861;//kernel.T2MediaPlayer:4861
          vol=0;
        }
      }
      _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=30004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=30004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=30004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=30005013;//kernel.T2MediaPlayer:5013
          tempo=0.5;
        }
      }
      return T2MediaLib.setAudioTempo(tempo);
    },
    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=30004951;//kernel.T2MediaPlayer:4951
      if (tempo>4) {
        //$LASTPOS=30004973;//kernel.T2MediaPlayer:4973
        tempo=4;
      } else {
        //$LASTPOS=30004996;//kernel.T2MediaPlayer:4996
        if (tempo<0.5) {
          //$LASTPOS=30005013;//kernel.T2MediaPlayer:5013
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
      
      //$LASTPOS=31000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=31000309;//kernel.PlainChar:309
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=31000355;//kernel.PlainChar:355
        _this.initSprite();
        
      }
      //$LASTPOS=31000381;//kernel.PlainChar:381
      if (typeof  x=="object") {
        //$LASTPOS=31000405;//kernel.PlainChar:405
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=31000437;//kernel.PlainChar:437
        if (typeof  x=="number") {
          //$LASTPOS=31000472;//kernel.PlainChar:472
          _this.x=x;
          //$LASTPOS=31000491;//kernel.PlainChar:491
          _this.y=y;
          //$LASTPOS=31000510;//kernel.PlainChar:510
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=31000547;//kernel.PlainChar:547
      _this.onDraw();
      //$LASTPOS=31000562;//kernel.PlainChar:562
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=31000593;//kernel.PlainChar:593
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=31000634;//kernel.PlainChar:634
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000634;//kernel.PlainChar:634
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
      
      //$LASTPOS=31000690;//kernel.PlainChar:690
      _this.onUpdate();
      //$LASTPOS=31000707;//kernel.PlainChar:707
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000690;//kernel.PlainChar:690
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31000707;//kernel.PlainChar:707
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
      
      //$LASTPOS=31000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=31000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=31000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=31000890;//kernel.PlainChar:890
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31000768;//kernel.PlainChar:768
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=31000820;//kernel.PlainChar:820
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=31000858;//kernel.PlainChar:858
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31000890;//kernel.PlainChar:890
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
      
      //$LASTPOS=31000922;//kernel.PlainChar:922
      _this.main();
      //$LASTPOS=31000935;//kernel.PlainChar:935
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
            //$LASTPOS=31000922;//kernel.PlainChar:922
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=31000935;//kernel.PlainChar:935
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
      
      //$LASTPOS=31001673;//kernel.PlainChar:1673
      _this.all().die();
      //$LASTPOS=31001691;//kernel.PlainChar:1691
      new page(arg);
      //$LASTPOS=31001711;//kernel.PlainChar:1711
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31001673;//kernel.PlainChar:1673
      _this.all().die();
      //$LASTPOS=31001691;//kernel.PlainChar:1691
      new page(arg);
      //$LASTPOS=31001711;//kernel.PlainChar:1711
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
      
      //$LASTPOS=32000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=32000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=32000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=32000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=32000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=32000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=32000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=32000146;//kernel.SpriteChar:146
        _this.p=0;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=32000176;//kernel.SpriteChar:176
      if (_this.f) {
        //$LASTPOS=32000194;//kernel.SpriteChar:194
        if (! _this.scaleY) {
          //$LASTPOS=32000207;//kernel.SpriteChar:207
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=32000231;//kernel.SpriteChar:231
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=32000255;//kernel.SpriteChar:255
      Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=32000275;//kernel.SpriteChar:275
      if (_this.f) {
        //$LASTPOS=32000282;//kernel.SpriteChar:282
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
      
      //$LASTPOS=33000034;//kernel.T1Line:34
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=33000065;//kernel.T1Line:65
      ctx.strokeStyle=_this.col;
      //$LASTPOS=33000091;//kernel.T1Line:91
      ctx.beginPath();
      //$LASTPOS=33000113;//kernel.T1Line:113
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=33000135;//kernel.T1Line:135
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=33000159;//kernel.T1Line:159
      ctx.stroke();
      //$LASTPOS=33000178;//kernel.T1Line:178
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
      
      //$LASTPOS=34000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=34000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var o;
      
      //$LASTPOS=34000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=34000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=34000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=34000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=34000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=34000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=34000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=34000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=34000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=34000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=34000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=34000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=34000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=34000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=34000512;//kernel.T1Map:512
      o = f.obj();
      //$LASTPOS=34000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=34000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=34000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=34000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=34000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=34000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=34000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=34000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=34000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=34000885;//kernel.T1Map:885
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
      
      //$LASTPOS=34000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=34000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=34000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=34000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=34001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=34001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=34001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=34001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=34001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=34000926;//kernel.T1Map:926
      res = [];
      //$LASTPOS=34000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=34000973;//kernel.T1Map:973
        rrow = [];
        //$LASTPOS=34000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=34001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=34001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=34001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=34001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=34001165;//kernel.T1Map:1165
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
      
      //$LASTPOS=35000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=35000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=35000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=35000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=35000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=35000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=35000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=35000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=35000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=35000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=35000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=35000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=35000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=35000103;//kernel.T1Page:103
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=35000131;//kernel.T1Page:131
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=35000159;//kernel.T1Page:159
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=35000189;//kernel.T1Page:189
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=35000222;//kernel.T1Page:222
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=35000251;//kernel.T1Page:251
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=35000282;//kernel.T1Page:282
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=35000313;//kernel.T1Page:313
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=35000347;//kernel.T1Page:347
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
      
      //$LASTPOS=36000032;//kernel.T1Text:32
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=36000057;//kernel.T1Text:57
      c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=36000097;//kernel.T1Text:97
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=36000117;//kernel.T1Text:117
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
      
      //$LASTPOS=37000070;//kernel.TextChar:70
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=37000089;//kernel.TextChar:89
      _this.text="";
      //$LASTPOS=37000103;//kernel.TextChar:103
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=37000122;//kernel.TextChar:122
      _this.size=20;
      //$LASTPOS=37000136;//kernel.TextChar:136
      if (! _this.x) {
        //$LASTPOS=37000149;//kernel.TextChar:149
        _this.x=0;
      }
      //$LASTPOS=37000164;//kernel.TextChar:164
      if (! _this.y) {
        //$LASTPOS=37000177;//kernel.TextChar:177
        _this.y=0;
      }
      //$LASTPOS=37000192;//kernel.TextChar:192
      if (t) {
        //$LASTPOS=37000199;//kernel.TextChar:199
        _this.text=t;
      }
      //$LASTPOS=37000212;//kernel.TextChar:212
      if (c) {
        //$LASTPOS=37000219;//kernel.TextChar:219
        _this.fillStyle=c;
      }
      //$LASTPOS=37000237;//kernel.TextChar:237
      if (s) {
        //$LASTPOS=37000244;//kernel.TextChar:244
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var rect;
      
      //$LASTPOS=37000274;//kernel.TextChar:274
      if (! _this.size) {
        //$LASTPOS=37000285;//kernel.TextChar:285
        _this.size=15;
      }
      //$LASTPOS=37000299;//kernel.TextChar:299
      if (! _this.align) {
        //$LASTPOS=37000311;//kernel.TextChar:311
        _this.align="left";
      }
      //$LASTPOS=37000330;//kernel.TextChar:330
      if (! _this.fillStyle) {
        //$LASTPOS=37000346;//kernel.TextChar:346
        _this.fillStyle="white";
      }
      //$LASTPOS=37000370;//kernel.TextChar:370
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=37000400;//kernel.TextChar:400
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=37000437;//kernel.TextChar:437
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=37000473;//kernel.TextChar:473
      rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
      //$LASTPOS=37000540;//kernel.TextChar:540
      _this.width=rect.w;
      //$LASTPOS=37000559;//kernel.TextChar:559
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
      
      //$LASTPOS=38000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=38000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=38000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=38000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=38000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=38000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=38000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=38000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var larger;
      var smaller;
      
      //$LASTPOS=38000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=38000469;//kernel.GameConsole:469
      smaller = 5;
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_GameConsole_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=38000448;//kernel.GameConsole:448
      larger = 200;
      //$LASTPOS=38000469;//kernel.GameConsole:469
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
      
      //$LASTPOS=38000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=38000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=38000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=38000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=38000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=38000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=38000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=38000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=38000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=38000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=38000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=38000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=38000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=38000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=38001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=38001049;//kernel.GameConsole:1049
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
      
      //$LASTPOS=38000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=38000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=38000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      //$LASTPOS=38000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      //$LASTPOS=38000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      //$LASTPOS=38000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      //$LASTPOS=38000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=38000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=38000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=38000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=38000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=38000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=38000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=38000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      //$LASTPOS=38001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      //$LASTPOS=38001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=38001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=38001159;//kernel.GameConsole:1159
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
      
      //$LASTPOS=39000030;//kernel.MapEditor:30
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=39000055;//kernel.MapEditor:55
      _this.loadMode=false;
      //$LASTPOS=39000071;//kernel.MapEditor:71
      _this.fileExist=false;
      //$LASTPOS=39000088;//kernel.MapEditor:88
      _this.print("map file(s)");
      //$LASTPOS=39000110;//kernel.MapEditor:110
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=39000137;//kernel.MapEditor:137
      _this.fileList.recursive((function a(f) {
        
        //$LASTPOS=39000175;//kernel.MapEditor:175
        f=f+"";
        //$LASTPOS=39000187;//kernel.MapEditor:187
        _this.fNames=f.split("/");
        //$LASTPOS=39000212;//kernel.MapEditor:212
        _this.print(_this.fNames[_this.fNames.length-1]);
        //$LASTPOS=39000248;//kernel.MapEditor:248
        _this.fileExist=true;
      }));
      //$LASTPOS=39000268;//kernel.MapEditor:268
      if (_this.fileExist) {
        //$LASTPOS=39000287;//kernel.MapEditor:287
        _this.print("Load Data?: Y or N");
        //$LASTPOS=39000320;//kernel.MapEditor:320
        while (true) {
          //$LASTPOS=39000341;//kernel.MapEditor:341
          if (_this.getkey("y")>0) {
            //$LASTPOS=39000372;//kernel.MapEditor:372
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=39000424;//kernel.MapEditor:424
          if (_this.getkey("n")>0) {
            //$LASTPOS=39000455;//kernel.MapEditor:455
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=39000508;//kernel.MapEditor:508
          _this.update();
          
        }
        //$LASTPOS=39000528;//kernel.MapEditor:528
        if (_this.loadMode) {
          //$LASTPOS=39000550;//kernel.MapEditor:550
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=39000614;//kernel.MapEditor:614
          if (_this.fileName) {
            //$LASTPOS=39000640;//kernel.MapEditor:640
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=39000702;//kernel.MapEditor:702
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=39000737;//kernel.MapEditor:737
            _this.baseData=_this.mapDataFile.obj();
            
          } else {
            //$LASTPOS=39000792;//kernel.MapEditor:792
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=39000832;//kernel.MapEditor:832
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=39000871;//kernel.MapEditor:871
              _this.baseData=_this.mapDataFile.obj();
              
            }
            
          }
          //$LASTPOS=39000931;//kernel.MapEditor:931
          if (_this.baseData==undefined) {
            //$LASTPOS=39000968;//kernel.MapEditor:968
            _this.print("Load failed");
            //$LASTPOS=39001002;//kernel.MapEditor:1002
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=39001032;//kernel.MapEditor:1032
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=39001076;//kernel.MapEditor:1076
              _this.mapData=_this.baseData[0];
              //$LASTPOS=39001109;//kernel.MapEditor:1109
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=39001144;//kernel.MapEditor:1144
              if (_this.baseData.length>2) {
                //$LASTPOS=39001183;//kernel.MapEditor:1183
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=39001238;//kernel.MapEditor:1238
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=39001310;//kernel.MapEditor:1310
      _this.update();
      //$LASTPOS=39001573;//kernel.MapEditor:1573
      if (! _this.loadMode) {
        //$LASTPOS=39001592;//kernel.MapEditor:1592
        _this.row=prompt("input row");
        //$LASTPOS=39001621;//kernel.MapEditor:1621
        _this.col=prompt("input col");
        //$LASTPOS=39001650;//kernel.MapEditor:1650
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=39001691;//kernel.MapEditor:1691
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=39001734;//kernel.MapEditor:1734
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=39001798;//kernel.MapEditor:1798
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=39001828;//kernel.MapEditor:1828
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=39001859;//kernel.MapEditor:1859
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=39001891;//kernel.MapEditor:1891
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=39001941;//kernel.MapEditor:1941
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=39002245;//kernel.MapEditor:2245
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=39002291;//kernel.MapEditor:2291
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=39002316;//kernel.MapEditor:2316
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=39002411;//kernel.MapEditor:2411
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=39002441;//kernel.MapEditor:2441
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=39002472;//kernel.MapEditor:2472
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=39002504;//kernel.MapEditor:2504
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=39002552;//kernel.MapEditor:2552
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=39002606;//kernel.MapEditor:2606
      _this.counter=0;
      //$LASTPOS=39002617;//kernel.MapEditor:2617
      //$LASTPOS=39002621;//kernel.MapEditor:2621
      i = 0;
      while(i<16) {
        {
          //$LASTPOS=39002644;//kernel.MapEditor:2644
          //$LASTPOS=39002648;//kernel.MapEditor:2648
          j = 0;
          while(j<8) {
            {
              //$LASTPOS=39002674;//kernel.MapEditor:2674
              Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=39002717;//kernel.MapEditor:2717
              _this.counter++;
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=39002736;//kernel.MapEditor:2736
      _this.drawPanel();
      //$LASTPOS=39002749;//kernel.MapEditor:2749
      _this.mode="get";
      //$LASTPOS=39002761;//kernel.MapEditor:2761
      _this.prevMode="set";
      //$LASTPOS=39002777;//kernel.MapEditor:2777
      _this.mapp=0;
      //$LASTPOS=39002785;//kernel.MapEditor:2785
      _this.mx=- 40;
      //$LASTPOS=39002793;//kernel.MapEditor:2793
      _this.my=- 40;
      //$LASTPOS=39002801;//kernel.MapEditor:2801
      _this.chipX=- 40;
      //$LASTPOS=39002812;//kernel.MapEditor:2812
      _this.chipY=- 40;
      //$LASTPOS=39002823;//kernel.MapEditor:2823
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=39002851;//kernel.MapEditor:2851
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=39002881;//kernel.MapEditor:2881
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=39002903;//kernel.MapEditor:2903
      while (true) {
        //$LASTPOS=39002920;//kernel.MapEditor:2920
        _this.p=_this.mapp;
        //$LASTPOS=39002932;//kernel.MapEditor:2932
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=39003070;//kernel.MapEditor:3070
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=39003103;//kernel.MapEditor:3103
          _this.mode="erase";
          //$LASTPOS=39003125;//kernel.MapEditor:3125
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=39003156;//kernel.MapEditor:3156
        if (_this.getkey("s")==1) {
          //$LASTPOS=39003184;//kernel.MapEditor:3184
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=39003217;//kernel.MapEditor:3217
          if (_this.mode=="set") {
            //$LASTPOS=39003246;//kernel.MapEditor:3246
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=39003287;//kernel.MapEditor:3287
            _this.mode="set";
            
          }
          //$LASTPOS=39003317;//kernel.MapEditor:3317
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=39003348;//kernel.MapEditor:3348
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=39003466;//kernel.MapEditor:3466
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=39003499;//kernel.MapEditor:3499
          _this.mode="set";
          //$LASTPOS=39003519;//kernel.MapEditor:3519
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=39003550;//kernel.MapEditor:3550
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=39003670;//kernel.MapEditor:3670
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=39003703;//kernel.MapEditor:3703
          _this.mode="setOn";
          //$LASTPOS=39003725;//kernel.MapEditor:3725
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=39003756;//kernel.MapEditor:3756
        if (_this.getkey("o")==1) {
          //$LASTPOS=39003784;//kernel.MapEditor:3784
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=39003817;//kernel.MapEditor:3817
          _this.mode="setOn";
          
        }
        //$LASTPOS=39003841;//kernel.MapEditor:3841
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=39003981;//kernel.MapEditor:3981
          if (_this.mode!="get") {
            //$LASTPOS=39004010;//kernel.MapEditor:4010
            _this.prevMode=_this.mode;
            //$LASTPOS=39004037;//kernel.MapEditor:4037
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=39004072;//kernel.MapEditor:4072
            _this.mode="get";
            //$LASTPOS=39004096;//kernel.MapEditor:4096
            _this.chipX=- 40;
            //$LASTPOS=39004119;//kernel.MapEditor:4119
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=39004157;//kernel.MapEditor:4157
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=39004194;//kernel.MapEditor:4194
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=39004227;//kernel.MapEditor:4227
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=39004258;//kernel.MapEditor:4258
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=39004412;//kernel.MapEditor:4412
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=39004885;//kernel.MapEditor:4885
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=39004942;//kernel.MapEditor:4942
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
          //$LASTPOS=39005084;//kernel.MapEditor:5084
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=39005116;//kernel.MapEditor:5116
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=39005205;//kernel.MapEditor:5205
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=39005345;//kernel.MapEditor:5345
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=39005378;//kernel.MapEditor:5378
          _this.mode="copy";
          //$LASTPOS=39005399;//kernel.MapEditor:5399
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=39005430;//kernel.MapEditor:5430
        if (_this.mode!="get") {
          //$LASTPOS=39005455;//kernel.MapEditor:5455
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=39005561;//kernel.MapEditor:5561
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=39005578;//kernel.MapEditor:5578
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=39005709;//kernel.MapEditor:5709
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=39005726;//kernel.MapEditor:5726
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=39005839;//kernel.MapEditor:5839
            _this.my=_this.my+8;
          }
          //$LASTPOS=39005856;//kernel.MapEditor:5856
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=39005991;//kernel.MapEditor:5991
            _this.my=_this.my-8;
          }
          //$LASTPOS=39006008;//kernel.MapEditor:6008
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=39006049;//kernel.MapEditor:6049
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=39006155;//kernel.MapEditor:6155
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=39006178;//kernel.MapEditor:6178
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=39006309;//kernel.MapEditor:6309
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=39006332;//kernel.MapEditor:6332
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=39006445;//kernel.MapEditor:6445
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=39006468;//kernel.MapEditor:6468
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=39006603;//kernel.MapEditor:6603
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=39006626;//kernel.MapEditor:6626
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=39006663;//kernel.MapEditor:6663
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=39006693;//kernel.MapEditor:6693
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=39006724;//kernel.MapEditor:6724
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=39006776;//kernel.MapEditor:6776
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=39006824;//kernel.MapEditor:6824
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=39006874;//kernel.MapEditor:6874
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=39006928;//kernel.MapEditor:6928
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=39006976;//kernel.MapEditor:6976
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=39007028;//kernel.MapEditor:7028
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=39007081;//kernel.MapEditor:7081
              _this.mode=_this.prevMode;
              //$LASTPOS=39007104;//kernel.MapEditor:7104
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39007137;//kernel.MapEditor:7137
              _this.print(_this.mode+" mode");
              //$LASTPOS=39007166;//kernel.MapEditor:7166
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=39007190;//kernel.MapEditor:7190
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=39007244;//kernel.MapEditor:7244
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=39007296;//kernel.MapEditor:7296
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=39007349;//kernel.MapEditor:7349
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=39007397;//kernel.MapEditor:7397
                  _this.mode="set";
                  //$LASTPOS=39007417;//kernel.MapEditor:7417
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=39007446;//kernel.MapEditor:7446
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=39007470;//kernel.MapEditor:7470
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=39000030;//kernel.MapEditor:30
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=39000055;//kernel.MapEditor:55
      _this.loadMode=false;
      //$LASTPOS=39000071;//kernel.MapEditor:71
      _this.fileExist=false;
      //$LASTPOS=39000088;//kernel.MapEditor:88
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000110;//kernel.MapEditor:110
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=39000137;//kernel.MapEditor:137
            _this.fileList.recursive((function a(f) {
              
              //$LASTPOS=39000175;//kernel.MapEditor:175
              f=f+"";
              //$LASTPOS=39000187;//kernel.MapEditor:187
              _this.fNames=f.split("/");
              //$LASTPOS=39000212;//kernel.MapEditor:212
              _this.print(_this.fNames[_this.fNames.length-1]);
              //$LASTPOS=39000248;//kernel.MapEditor:248
              _this.fileExist=true;
            }));
            //$LASTPOS=39000268;//kernel.MapEditor:268
            if (!(_this.fileExist)) { __pc=11; break; }
            //$LASTPOS=39000287;//kernel.MapEditor:287
            _this.print("Load Data?: Y or N");
            //$LASTPOS=39000320;//kernel.MapEditor:320
          case 2:
            //$LASTPOS=39000341;//kernel.MapEditor:341
            if (!(_this.getkey("y")>0)) { __pc=3; break; }
            //$LASTPOS=39000372;//kernel.MapEditor:372
            _this.loadMode=true;
            __pc=6; break;
            
          case 3:
            
            //$LASTPOS=39000424;//kernel.MapEditor:424
            if (!(_this.getkey("n")>0)) { __pc=4; break; }
            //$LASTPOS=39000455;//kernel.MapEditor:455
            _this.loadMode=false;
            __pc=6; break;
            
          case 4:
            
            //$LASTPOS=39000508;//kernel.MapEditor:508
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=39000528;//kernel.MapEditor:528
            if (!(_this.loadMode)) { __pc=10; break; }
            //$LASTPOS=39000550;//kernel.MapEditor:550
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=39000614;//kernel.MapEditor:614
            if (_this.fileName) {
              //$LASTPOS=39000640;//kernel.MapEditor:640
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=39000702;//kernel.MapEditor:702
            if (!(_this.mapDataFile.obj())) { __pc=7; break; }
            {
              //$LASTPOS=39000737;//kernel.MapEditor:737
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=9;break;
          case 7:
            //$LASTPOS=39000792;//kernel.MapEditor:792
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=39000832;//kernel.MapEditor:832
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=39000871;//kernel.MapEditor:871
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 9:
            
            //$LASTPOS=39000931;//kernel.MapEditor:931
            if (_this.baseData==undefined) {
              //$LASTPOS=39000968;//kernel.MapEditor:968
              _this.print("Load failed");
              //$LASTPOS=39001002;//kernel.MapEditor:1002
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=39001032;//kernel.MapEditor:1032
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=39001076;//kernel.MapEditor:1076
                _this.mapData=_this.baseData[0];
                //$LASTPOS=39001109;//kernel.MapEditor:1109
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=39001144;//kernel.MapEditor:1144
                if (_this.baseData.length>2) {
                  //$LASTPOS=39001183;//kernel.MapEditor:1183
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=39001238;//kernel.MapEditor:1238
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10:
            
          case 11:
            
            //$LASTPOS=39001310;//kernel.MapEditor:1310
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=39001573;//kernel.MapEditor:1573
            if (! _this.loadMode) {
              //$LASTPOS=39001592;//kernel.MapEditor:1592
              _this.row=prompt("input row");
              //$LASTPOS=39001621;//kernel.MapEditor:1621
              _this.col=prompt("input col");
              //$LASTPOS=39001650;//kernel.MapEditor:1650
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=39001691;//kernel.MapEditor:1691
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=39001734;//kernel.MapEditor:1734
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=39001798;//kernel.MapEditor:1798
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=39001828;//kernel.MapEditor:1828
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=39001859;//kernel.MapEditor:1859
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=39001891;//kernel.MapEditor:1891
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=39001941;//kernel.MapEditor:1941
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=39002245;//kernel.MapEditor:2245
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=39002291;//kernel.MapEditor:2291
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=39002316;//kernel.MapEditor:2316
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=39002411;//kernel.MapEditor:2411
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=39002441;//kernel.MapEditor:2441
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=39002472;//kernel.MapEditor:2472
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=39002504;//kernel.MapEditor:2504
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=39002552;//kernel.MapEditor:2552
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=39002606;//kernel.MapEditor:2606
            _this.counter=0;
            //$LASTPOS=39002617;//kernel.MapEditor:2617
            //$LASTPOS=39002621;//kernel.MapEditor:2621
            i = 0;
            while(i<16) {
              {
                //$LASTPOS=39002644;//kernel.MapEditor:2644
                //$LASTPOS=39002648;//kernel.MapEditor:2648
                j = 0;
                while(j<8) {
                  {
                    //$LASTPOS=39002674;//kernel.MapEditor:2674
                    Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=39002717;//kernel.MapEditor:2717
                    _this.counter++;
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=39002736;//kernel.MapEditor:2736
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=39002749;//kernel.MapEditor:2749
            _this.mode="get";
            //$LASTPOS=39002761;//kernel.MapEditor:2761
            _this.prevMode="set";
            //$LASTPOS=39002777;//kernel.MapEditor:2777
            _this.mapp=0;
            //$LASTPOS=39002785;//kernel.MapEditor:2785
            _this.mx=- 40;
            //$LASTPOS=39002793;//kernel.MapEditor:2793
            _this.my=- 40;
            //$LASTPOS=39002801;//kernel.MapEditor:2801
            _this.chipX=- 40;
            //$LASTPOS=39002812;//kernel.MapEditor:2812
            _this.chipY=- 40;
            //$LASTPOS=39002823;//kernel.MapEditor:2823
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=39002851;//kernel.MapEditor:2851
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=39002881;//kernel.MapEditor:2881
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=39002903;//kernel.MapEditor:2903
          case 14:
            //$LASTPOS=39002920;//kernel.MapEditor:2920
            _this.p=_this.mapp;
            //$LASTPOS=39002932;//kernel.MapEditor:2932
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=39003070;//kernel.MapEditor:3070
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39003103;//kernel.MapEditor:3103
              _this.mode="erase";
              //$LASTPOS=39003125;//kernel.MapEditor:3125
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=39003156;//kernel.MapEditor:3156
            if (_this.getkey("s")==1) {
              //$LASTPOS=39003184;//kernel.MapEditor:3184
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39003217;//kernel.MapEditor:3217
              if (_this.mode=="set") {
                //$LASTPOS=39003246;//kernel.MapEditor:3246
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=39003287;//kernel.MapEditor:3287
                _this.mode="set";
                
              }
              //$LASTPOS=39003317;//kernel.MapEditor:3317
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=39003348;//kernel.MapEditor:3348
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=39003466;//kernel.MapEditor:3466
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39003499;//kernel.MapEditor:3499
              _this.mode="set";
              //$LASTPOS=39003519;//kernel.MapEditor:3519
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=39003550;//kernel.MapEditor:3550
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=39003670;//kernel.MapEditor:3670
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39003703;//kernel.MapEditor:3703
              _this.mode="setOn";
              //$LASTPOS=39003725;//kernel.MapEditor:3725
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=39003756;//kernel.MapEditor:3756
            if (_this.getkey("o")==1) {
              //$LASTPOS=39003784;//kernel.MapEditor:3784
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39003817;//kernel.MapEditor:3817
              _this.mode="setOn";
              
            }
            //$LASTPOS=39003841;//kernel.MapEditor:3841
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=39003981;//kernel.MapEditor:3981
              if (_this.mode!="get") {
                //$LASTPOS=39004010;//kernel.MapEditor:4010
                _this.prevMode=_this.mode;
                //$LASTPOS=39004037;//kernel.MapEditor:4037
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=39004072;//kernel.MapEditor:4072
                _this.mode="get";
                //$LASTPOS=39004096;//kernel.MapEditor:4096
                _this.chipX=- 40;
                //$LASTPOS=39004119;//kernel.MapEditor:4119
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=39004157;//kernel.MapEditor:4157
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=39004194;//kernel.MapEditor:4194
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=39004227;//kernel.MapEditor:4227
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=39004258;//kernel.MapEditor:4258
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=39004412;//kernel.MapEditor:4412
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=39004885;//kernel.MapEditor:4885
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=39004942;//kernel.MapEditor:4942
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
              //$LASTPOS=39005084;//kernel.MapEditor:5084
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=39005116;//kernel.MapEditor:5116
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=39005205;//kernel.MapEditor:5205
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=39005345;//kernel.MapEditor:5345
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=39005378;//kernel.MapEditor:5378
              _this.mode="copy";
              //$LASTPOS=39005399;//kernel.MapEditor:5399
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=39005430;//kernel.MapEditor:5430
            if (_this.mode!="get") {
              //$LASTPOS=39005455;//kernel.MapEditor:5455
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=39005561;//kernel.MapEditor:5561
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=39005578;//kernel.MapEditor:5578
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=39005709;//kernel.MapEditor:5709
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=39005726;//kernel.MapEditor:5726
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=39005839;//kernel.MapEditor:5839
                _this.my=_this.my+8;
              }
              //$LASTPOS=39005856;//kernel.MapEditor:5856
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=39005991;//kernel.MapEditor:5991
                _this.my=_this.my-8;
              }
              //$LASTPOS=39006008;//kernel.MapEditor:6008
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=39006049;//kernel.MapEditor:6049
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=39006155;//kernel.MapEditor:6155
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=39006178;//kernel.MapEditor:6178
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=39006309;//kernel.MapEditor:6309
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=39006332;//kernel.MapEditor:6332
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=39006445;//kernel.MapEditor:6445
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=39006468;//kernel.MapEditor:6468
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=39006603;//kernel.MapEditor:6603
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=39006626;//kernel.MapEditor:6626
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=39006663;//kernel.MapEditor:6663
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=39006693;//kernel.MapEditor:6693
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=39006724;//kernel.MapEditor:6724
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15; break; }
            {
              //$LASTPOS=39006776;//kernel.MapEditor:6776
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=39006824;//kernel.MapEditor:6824
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25;break;
          case 15:
            //$LASTPOS=39006874;//kernel.MapEditor:6874
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16; break; }
            {
              //$LASTPOS=39006928;//kernel.MapEditor:6928
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24;break;
          case 16:
            //$LASTPOS=39006976;//kernel.MapEditor:6976
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18; break; }
            //$LASTPOS=39007028;//kernel.MapEditor:7028
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=39007081;//kernel.MapEditor:7081
            _this.mode=_this.prevMode;
            //$LASTPOS=39007104;//kernel.MapEditor:7104
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=39007137;//kernel.MapEditor:7137
            _this.print(_this.mode+" mode");
            //$LASTPOS=39007166;//kernel.MapEditor:7166
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23;break;
          case 18:
            //$LASTPOS=39007190;//kernel.MapEditor:7190
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19; break; }
            {
              //$LASTPOS=39007244;//kernel.MapEditor:7244
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22;break;
          case 19:
            //$LASTPOS=39007296;//kernel.MapEditor:7296
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21; break; }
            //$LASTPOS=39007349;//kernel.MapEditor:7349
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=39007397;//kernel.MapEditor:7397
            _this.mode="set";
            //$LASTPOS=39007417;//kernel.MapEditor:7417
            _this.print(_this.mode+" mode");
            //$LASTPOS=39007446;//kernel.MapEditor:7446
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21:
            
          case 22:
            
          case 23:
            
          case 24:
            
          case 25:
            
            //$LASTPOS=39007470;//kernel.MapEditor:7470
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
      
      //$LASTPOS=39007635;//kernel.MapEditor:7635
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=39007668;//kernel.MapEditor:7668
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=39007690;//kernel.MapEditor:7690
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=39007732;//kernel.MapEditor:7732
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=39007779;//kernel.MapEditor:7779
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=39007840;//kernel.MapEditor:7840
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=39007898;//kernel.MapEditor:7898
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=39007920;//kernel.MapEditor:7920
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=39007972;//kernel.MapEditor:7972
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008021;//kernel.MapEditor:8021
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008072;//kernel.MapEditor:8072
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008123;//kernel.MapEditor:8123
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008174;//kernel.MapEditor:8174
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=39008222;//kernel.MapEditor:8222
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=39008272;//kernel.MapEditor:8272
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=39008306;//kernel.MapEditor:8306
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008356;//kernel.MapEditor:8356
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008407;//kernel.MapEditor:8407
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008458;//kernel.MapEditor:8458
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008509;//kernel.MapEditor:8509
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=39008558;//kernel.MapEditor:8558
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=39008608;//kernel.MapEditor:8608
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=39008652;//kernel.MapEditor:8652
      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=39008708;//kernel.MapEditor:8708
      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=39008771;//kernel.MapEditor:8771
      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=39008845;//kernel.MapEditor:8845
      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=39008948;//kernel.MapEditor:8948
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=39009024;//kernel.MapEditor:9024
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=39009102;//kernel.MapEditor:9102
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=39009178;//kernel.MapEditor:9178
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=39009253;//kernel.MapEditor:9253
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=39009330;//kernel.MapEditor:9330
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39007635;//kernel.MapEditor:7635
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=39007668;//kernel.MapEditor:7668
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=39007690;//kernel.MapEditor:7690
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=39007732;//kernel.MapEditor:7732
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=39007779;//kernel.MapEditor:7779
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=39007840;//kernel.MapEditor:7840
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=39007898;//kernel.MapEditor:7898
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=39007920;//kernel.MapEditor:7920
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=39007972;//kernel.MapEditor:7972
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008021;//kernel.MapEditor:8021
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008072;//kernel.MapEditor:8072
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008123;//kernel.MapEditor:8123
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=39008174;//kernel.MapEditor:8174
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=39008222;//kernel.MapEditor:8222
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=39008272;//kernel.MapEditor:8272
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=39008306;//kernel.MapEditor:8306
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008356;//kernel.MapEditor:8356
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008407;//kernel.MapEditor:8407
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008458;//kernel.MapEditor:8458
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=39008509;//kernel.MapEditor:8509
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=39008558;//kernel.MapEditor:8558
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=39008608;//kernel.MapEditor:8608
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=39008652;//kernel.MapEditor:8652
      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=39008708;//kernel.MapEditor:8708
      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=39008771;//kernel.MapEditor:8771
      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=39008845;//kernel.MapEditor:8845
      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=39008948;//kernel.MapEditor:8948
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=39009024;//kernel.MapEditor:9024
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=39009102;//kernel.MapEditor:9102
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=39009178;//kernel.MapEditor:9178
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=39009253;//kernel.MapEditor:9253
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=39009330;//kernel.MapEditor:9330
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=40003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=40003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=40003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=40003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40003502;//kernel.Pad:3502
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
      
      //$LASTPOS=40000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=40000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=40000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=40000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=40000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=40000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=40000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=40000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=40000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=40001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=40001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=40001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=40001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=40001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=40001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=40001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var t;
      
      //$LASTPOS=40001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=40001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=40001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=40001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=40001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=40001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=40001383;//kernel.Pad:1383
      //$LASTPOS=40001388;//kernel.Pad:1388
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=40001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=40001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=40001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=40001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=40001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=40001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=40001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=40001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=40001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=40001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=40001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=40002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=40002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=40002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
        i++;
      }
      //$LASTPOS=40002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=40002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=40002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=40002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=40002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=40002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=40002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=40002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=40002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=40002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=40002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=40002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=40002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=40002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=40002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=40002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=40002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=40002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=40002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=40002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=40002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=40002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=40002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=40002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=40002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=40002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=40002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=40002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=40002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=40002739;//kernel.Pad:2739
        _this.jujiKeyPush1.hide();
      }
    },
    fiber$padUpdate :function _trc_Pad_f_padUpdate(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var t;
      
      //$LASTPOS=40001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=40001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=40001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=40001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=40001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=40001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=40001383;//kernel.Pad:1383
      //$LASTPOS=40001388;//kernel.Pad:1388
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=40001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          //$LASTPOS=40001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=40001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=40001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=40001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=40001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=40001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=40001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=40001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=40001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=40001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=40002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=40002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=40002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
        i++;
      }
      //$LASTPOS=40002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=40002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=40002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=40002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=40002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=40002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=40002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=40002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=40002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=40002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=40002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=40002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=40002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=40002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=40002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=40002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=40002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=40002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=40002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=40002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=40002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=40002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=40002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=40002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=40002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=40002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=40002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=40002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=40002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=40002739;//kernel.Pad:2739
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
      
      //$LASTPOS=40002940;//kernel.Pad:2940
      value;
      //$LASTPOS=40002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=40002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      //$LASTPOS=40002940;//kernel.Pad:2940
      value;
      //$LASTPOS=40002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=40002968;//kernel.Pad:2968
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
      
      //$LASTPOS=40003163;//kernel.Pad:3163
      value;
      //$LASTPOS=40003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=40003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      //$LASTPOS=40003163;//kernel.Pad:3163
      value;
      //$LASTPOS=40003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=40003191;//kernel.Pad:3191
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
  fullName: 'kernel.Button',
  shortName: 'Button',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Button_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000361;//kernel.Button:361
      while (true) {
        //$LASTPOS=41000379;//kernel.Button:379
        if (_this.getkey(1)||Tonyu.globals.$touches[0].touched) {
          //$LASTPOS=41000428;//kernel.Button:428
          if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
            //$LASTPOS=41000475;//kernel.Button:475
            _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
            
          }
          //$LASTPOS=41000535;//kernel.Button:535
          if (_this.clicked==1) {
            //$LASTPOS=41000565;//kernel.Button:565
            Tonyu.classes.kernel.Button.last=_this;
            //$LASTPOS=41000595;//kernel.Button:595
            if (_this.onClick) {
              //$LASTPOS=41000608;//kernel.Button:608
              _this.onClick();
            }
            
          }
          
        } else {
          //$LASTPOS=41000650;//kernel.Button:650
          _this.clicked=0;
          
        }
        //$LASTPOS=41000671;//kernel.Button:671
        _this.update();
        
      }
    },
    fiber$main :function _trc_Button_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Button_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000361;//kernel.Button:361
          case 1:
            //$LASTPOS=41000379;//kernel.Button:379
            if (_this.getkey(1)||Tonyu.globals.$touches[0].touched) {
              //$LASTPOS=41000428;//kernel.Button:428
              if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
                //$LASTPOS=41000475;//kernel.Button:475
                _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
                
              }
              //$LASTPOS=41000535;//kernel.Button:535
              if (_this.clicked==1) {
                //$LASTPOS=41000565;//kernel.Button:565
                Tonyu.classes.kernel.Button.last=_this;
                //$LASTPOS=41000595;//kernel.Button:595
                if (_this.onClick) {
                  //$LASTPOS=41000608;//kernel.Button:608
                  _this.onClick();
                }
                
              }
              
            } else {
              //$LASTPOS=41000650;//kernel.Button:650
              _this.clicked=0;
              
            }
            //$LASTPOS=41000671;//kernel.Button:671
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
    initialize :function _trc_Button_initialize(options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000101;//kernel.Button:101
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=41000121;//kernel.Button:121
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=41000166;//kernel.Button:166
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=41000204;//kernel.Button:204
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=41000244;//kernel.Button:244
      _this.padding=_this.padding||5;
      //$LASTPOS=41000271;//kernel.Button:271
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=41000310;//kernel.Button:310
      _this.height=_this.height||50;
      //$LASTPOS=41000337;//kernel.Button:337
      _this.left=_this.left||50;
    },
    inRect :function _trc_Button_inRect(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;
    },
    fiber$inRect :function _trc_Button_f_inRect(_thread,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Button_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var size;
      var f;
      var r;
      
      //$LASTPOS=41000785;//kernel.Button:785
      c.fillStyle=_this.fillStyle||"gray";
      //$LASTPOS=41000822;//kernel.Button:822
      c.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=41000864;//kernel.Button:864
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=41000906;//kernel.Button:906
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=41000950;//kernel.Button:950
      size = _this.height-_this.padding*2;
      //$LASTPOS=41000981;//kernel.Button:981
      f = c.font.replace(/^[0-9]+px /,"");
      //$LASTPOS=41001024;//kernel.Button:1024
      c.font=size+"px "+f;
      //$LASTPOS=41001062;//kernel.Button:1062
      c.textBaseline="top";
      //$LASTPOS=41001088;//kernel.Button:1088
      c.fillStyle=_this.clicked?_this.clickedStyle:_this.strokeStyle;
      //$LASTPOS=41001138;//kernel.Button:1138
      r = c.measureText(_this.text);
      //$LASTPOS=41001169;//kernel.Button:1169
      c.fillText(_this.text,_this.left+_this.width/2-r.width/2,_this.top+_this.padding);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"inRect":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Main',
  shortName: 'Main',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000026;//kernel.Main:26
      new Tonyu.classes.kernel.Button({left: 200,top: 100,width: 200,height: 50,padding: 10,text: "ボタン1",onClick: Tonyu.bindFunc(_this,_this.button1Click),fillStyle: "#fe8"});
      //$LASTPOS=42000145;//kernel.Main:145
      new Tonyu.classes.kernel.Button({left: 200,top: 200,width: 200,height: 50,padding: 10,text: "ボタン2",onClick: Tonyu.bindFunc(_this,_this.button2Click),fillStyle: "#8ef"});
      //$LASTPOS=42000264;//kernel.Main:264
      new Tonyu.classes.kernel.Button({left: 200,top: 300,width: 200,height: 50,padding: 10,text: "他のサンプル",onClick: Tonyu.bindFunc(_this,_this.button3Click),fillStyle: "#999"});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000026;//kernel.Main:26
      new Tonyu.classes.kernel.Button({left: 200,top: 100,width: 200,height: 50,padding: 10,text: "ボタン1",onClick: Tonyu.bindFunc(_this,_this.button1Click),fillStyle: "#fe8"});
      //$LASTPOS=42000145;//kernel.Main:145
      new Tonyu.classes.kernel.Button({left: 200,top: 200,width: 200,height: 50,padding: 10,text: "ボタン2",onClick: Tonyu.bindFunc(_this,_this.button2Click),fillStyle: "#8ef"});
      //$LASTPOS=42000264;//kernel.Main:264
      new Tonyu.classes.kernel.Button({left: 200,top: 300,width: 200,height: 50,padding: 10,text: "他のサンプル",onClick: Tonyu.bindFunc(_this,_this.button3Click),fillStyle: "#999"});
      
      _thread.retVal=_this;return;
    },
    button1Click :function _trc_Main_button1Click() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000459;//kernel.Main:459
      _this.print("ボタン１が押されました");
    },
    fiber$button1Click :function _trc_Main_f_button1Click(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000459;//kernel.Main:459
      _this.print("ボタン１が押されました");
      
      _thread.retVal=_this;return;
    },
    button2Click :function _trc_Main_button2Click() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000505;//kernel.Main:505
      _this.print("ボタン２が押されました");
    },
    fiber$button2Click :function _trc_Main_f_button2Click(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000505;//kernel.Main:505
      _this.print("ボタン２が押されました");
      
      _thread.retVal=_this;return;
    },
    button3Click :function _trc_Main_button3Click() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000567;//kernel.Main:567
      _this.all().die();
      //$LASTPOS=42000584;//kernel.Main:584
      new Tonyu.classes.kernel.Main2;
      //$LASTPOS=42000599;//kernel.Main:599
      _this.die();
    },
    fiber$button3Click :function _trc_Main_f_button3Click(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000567;//kernel.Main:567
      _this.all().die();
      //$LASTPOS=42000584;//kernel.Main:584
      new Tonyu.classes.kernel.Main2;
      //$LASTPOS=42000599;//kernel.Main:599
      _this.die();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"button1Click":{"nowait":false},"button2Click":{"nowait":false},"button3Click":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Main2',
  shortName: 'Main2',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=43000034;//kernel.Main2:34
      _this.fight=new Tonyu.classes.kernel.Button({left: 200,top: 100,width: 200,height: 50,padding: 10,text: "たたかう",onClick: _this.button1Click,strokeStyle: "brown"});
      //$LASTPOS=43000176;//kernel.Main2:176
      _this.esc=new Tonyu.classes.kernel.Button({left: 200,top: 200,width: 200,height: 50,padding: 10,text: "にげる",onClick: _this.button2Click,strokeStyle: "blue"});
      //$LASTPOS=43000301;//kernel.Main2:301
      _this.print("てきだ！");
      //$LASTPOS=43000316;//kernel.Main2:316
      _this.p=Tonyu.globals.$pat_sample+2;
      //$LASTPOS=43000333;//kernel.Main2:333
      _this.t=0;
      //$LASTPOS=43000338;//kernel.Main2:338
      Tonyu.classes.kernel.Button.last=null;
      //$LASTPOS=43000391;//kernel.Main2:391
      while (! Tonyu.classes.kernel.Button.last) {
        //$LASTPOS=43000435;//kernel.Main2:435
        _this.x=100;
        //$LASTPOS=43000446;//kernel.Main2:446
        _this.y=_this.sin(_this.t)*20+100;
        //$LASTPOS=43000467;//kernel.Main2:467
        _this.t+=10;
        //$LASTPOS=43000478;//kernel.Main2:478
        _this.update();
        
      }
      //$LASTPOS=43000490;//kernel.Main2:490
      _this.print(Tonyu.classes.kernel.Button.last.text);
      //$LASTPOS=43000515;//kernel.Main2:515
      if (Tonyu.classes.kernel.Button.last===_this.fight) {
        //$LASTPOS=43000562;//kernel.Main2:562
        _this.esc.die();
        //$LASTPOS=43000588;//kernel.Main2:588
        _this.print("こうげき！");
        //$LASTPOS=43000608;//kernel.Main2:608
        _this.print("やっつけた！");
        //$LASTPOS=43000629;//kernel.Main2:629
        //$LASTPOS=43000634;//kernel.Main2:634
        _this.alpha=250;
        while(_this.alpha>0) {
          //$LASTPOS=43000666;//kernel.Main2:666
          _this.update();
          _this.alpha-=10;
        }
        //$LASTPOS=43000680;//kernel.Main2:680
        _this.fight.die();
        
      } else {
        //$LASTPOS=43000713;//kernel.Main2:713
        if (Tonyu.classes.kernel.Button.last===_this.esc) {
          //$LASTPOS=43000756;//kernel.Main2:756
          _this.fight.die();
          //$LASTPOS=43000786;//kernel.Main2:786
          _this.print("まわりこまれてしまった！");
          //$LASTPOS=43000813;//kernel.Main2:813
          //$LASTPOS=43000818;//kernel.Main2:818
          _this.scaleX=1;
          while(_this.scaleX<5) {
            //$LASTPOS=43000848;//kernel.Main2:848
            _this.update();
            _this.scaleX+=1;
          }
          //$LASTPOS=43000862;//kernel.Main2:862
          _this.print("Game Over");
          //$LASTPOS=43000886;//kernel.Main2:886
          _this.updateEx(20);
          //$LASTPOS=43000904;//kernel.Main2:904
          _this.esc.die();
          
        }
      }
      //$LASTPOS=43000940;//kernel.Main2:940
      _this.retry=new Tonyu.classes.kernel.Button({left: 200,top: 300,width: 200,height: 50,padding: 10,text: "もどる",onClick: _this.button1Click,strokeStyle: "blue"});
      //$LASTPOS=43001066;//kernel.Main2:1066
      Tonyu.classes.kernel.Button.last=null;
      //$LASTPOS=43001084;//kernel.Main2:1084
      while (! Tonyu.classes.kernel.Button.last) {
        //$LASTPOS=43001105;//kernel.Main2:1105
        _this.update();
      }
      //$LASTPOS=43001135;//kernel.Main2:1135
      _this.all().die();
      //$LASTPOS=43001148;//kernel.Main2:1148
      new Tonyu.classes.kernel.Main;
      //$LASTPOS=43001158;//kernel.Main2:1158
      _this.die();
    },
    fiber$main :function _trc_Main2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000034;//kernel.Main2:34
      _this.fight=new Tonyu.classes.kernel.Button({left: 200,top: 100,width: 200,height: 50,padding: 10,text: "たたかう",onClick: _this.button1Click,strokeStyle: "brown"});
      //$LASTPOS=43000176;//kernel.Main2:176
      _this.esc=new Tonyu.classes.kernel.Button({left: 200,top: 200,width: 200,height: 50,padding: 10,text: "にげる",onClick: _this.button2Click,strokeStyle: "blue"});
      //$LASTPOS=43000301;//kernel.Main2:301
      _this.print("てきだ！");
      //$LASTPOS=43000316;//kernel.Main2:316
      _this.p=Tonyu.globals.$pat_sample+2;
      //$LASTPOS=43000333;//kernel.Main2:333
      _this.t=0;
      //$LASTPOS=43000338;//kernel.Main2:338
      Tonyu.classes.kernel.Button.last=null;
      
      _thread.enter(function _trc_Main2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000391;//kernel.Main2:391
          case 1:
            if (!(! Tonyu.classes.kernel.Button.last)) { __pc=3; break; }
            //$LASTPOS=43000435;//kernel.Main2:435
            _this.x=100;
            //$LASTPOS=43000446;//kernel.Main2:446
            _this.y=_this.sin(_this.t)*20+100;
            //$LASTPOS=43000467;//kernel.Main2:467
            _this.t+=10;
            //$LASTPOS=43000478;//kernel.Main2:478
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=43000490;//kernel.Main2:490
            _this.print(Tonyu.classes.kernel.Button.last.text);
            //$LASTPOS=43000515;//kernel.Main2:515
            if (!(Tonyu.classes.kernel.Button.last===_this.fight)) { __pc=7; break; }
            //$LASTPOS=43000562;//kernel.Main2:562
            _this.esc.die();
            //$LASTPOS=43000588;//kernel.Main2:588
            _this.print("こうげき！");
            //$LASTPOS=43000608;//kernel.Main2:608
            _this.print("やっつけた！");
            //$LASTPOS=43000629;//kernel.Main2:629
            //$LASTPOS=43000634;//kernel.Main2:634
            _this.alpha=250;;
          case 4:
            if (!(_this.alpha>0)) { __pc=6; break; }
            //$LASTPOS=43000666;//kernel.Main2:666
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            _this.alpha-=10;
            __pc=4;break;
          case 6:
            
            //$LASTPOS=43000680;//kernel.Main2:680
            _this.fight.die();
            __pc=13;break;
          case 7:
            //$LASTPOS=43000713;//kernel.Main2:713
            if (!(Tonyu.classes.kernel.Button.last===_this.esc)) { __pc=12; break; }
            //$LASTPOS=43000756;//kernel.Main2:756
            _this.fight.die();
            //$LASTPOS=43000786;//kernel.Main2:786
            _this.print("まわりこまれてしまった！");
            //$LASTPOS=43000813;//kernel.Main2:813
            //$LASTPOS=43000818;//kernel.Main2:818
            _this.scaleX=1;;
          case 8:
            if (!(_this.scaleX<5)) { __pc=10; break; }
            //$LASTPOS=43000848;//kernel.Main2:848
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            _this.scaleX+=1;
            __pc=8;break;
          case 10:
            
            //$LASTPOS=43000862;//kernel.Main2:862
            _this.print("Game Over");
            //$LASTPOS=43000886;//kernel.Main2:886
            _this.fiber$updateEx(_thread, 20);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=43000904;//kernel.Main2:904
            _this.esc.die();
          case 12:
            
          case 13:
            
            //$LASTPOS=43000940;//kernel.Main2:940
            _this.retry=new Tonyu.classes.kernel.Button({left: 200,top: 300,width: 200,height: 50,padding: 10,text: "もどる",onClick: _this.button1Click,strokeStyle: "blue"});
            //$LASTPOS=43001066;//kernel.Main2:1066
            Tonyu.classes.kernel.Button.last=null;
            //$LASTPOS=43001084;//kernel.Main2:1084
          case 14:
            if (!(! Tonyu.classes.kernel.Button.last)) { __pc=16; break; }
            //$LASTPOS=43001105;//kernel.Main2:1105
            _this.fiber$update(_thread);
            __pc=15;return;
          case 15:
            
            __pc=14;break;
          case 16:
            
            //$LASTPOS=43001135;//kernel.Main2:1135
            _this.all().die();
            //$LASTPOS=43001148;//kernel.Main2:1148
            new Tonyu.classes.kernel.Main;
            //$LASTPOS=43001158;//kernel.Main2:1158
            _this.die();
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
  fullName: 'kernel.MapMain',
  shortName: 'MapMain',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapMain_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=44000000;//kernel.MapMain:0
      _this.map=new Tonyu.classes.kernel.Map;
      //$LASTPOS=44000013;//kernel.MapMain:13
      _this.map.load("map.json");
      //$LASTPOS=44000035;//kernel.MapMain:35
      _this.print(_this.map.chipWidth);
    },
    fiber$main :function _trc_MapMain_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//kernel.MapMain:0
      _this.map=new Tonyu.classes.kernel.Map;
      //$LASTPOS=44000013;//kernel.MapMain:13
      _this.map.load("map.json");
      //$LASTPOS=44000035;//kernel.MapMain:35
      _this.print(_this.map.chipWidth);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TestMain',
  shortName: 'TestMain',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_TestMain_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000015;//kernel.TestMain:15
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=45000040;//kernel.TestMain:40
      _this.fList=_this.file("../maps/");
      //$LASTPOS=45000064;//kernel.TestMain:64
      _this.fileExist=false;
      //$LASTPOS=45000081;//kernel.TestMain:81
      _this.fList.recursive((function a(f) {
        
        //$LASTPOS=45000116;//kernel.TestMain:116
        f=f+"";
        //$LASTPOS=45000128;//kernel.TestMain:128
        _this.fNames=f.split("/");
        //$LASTPOS=45000153;//kernel.TestMain:153
        _this.fileExist=true;
        //$LASTPOS=45000173;//kernel.TestMain:173
        _this.print(_this.fNames[_this.fNames.length-1]);
      }));
      //$LASTPOS=45000209;//kernel.TestMain:209
      _this.print(_this.fileExist);
      //$LASTPOS=45000227;//kernel.TestMain:227
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=45000256;//kernel.TestMain:256
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=45000274;//kernel.TestMain:274
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=45000312;//kernel.TestMain:312
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=45000355;//kernel.TestMain:355
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=45000412;//kernel.TestMain:412
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=45000466;//kernel.TestMain:466
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=45000484;//kernel.TestMain:484
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45000528;//kernel.TestMain:528
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45000573;//kernel.TestMain:573
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45000620;//kernel.TestMain:620
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45000667;//kernel.TestMain:667
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=45000714;//kernel.TestMain:714
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=45000758;//kernel.TestMain:758
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=45000804;//kernel.TestMain:804
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=45000834;//kernel.TestMain:834
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45000880;//kernel.TestMain:880
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45000927;//kernel.TestMain:927
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45000974;//kernel.TestMain:974
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=45001021;//kernel.TestMain:1021
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=45001066;//kernel.TestMain:1066
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=45001112;//kernel.TestMain:1112
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=45001148;//kernel.TestMain:1148
      Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=45001200;//kernel.TestMain:1200
      Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=45001259;//kernel.TestMain:1259
      Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=45001329;//kernel.TestMain:1329
      Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=45001424;//kernel.TestMain:1424
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45001496;//kernel.TestMain:1496
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=45001570;//kernel.TestMain:1570
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45001642;//kernel.TestMain:1642
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=45001713;//kernel.TestMain:1713
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45001786;//kernel.TestMain:1786
      Tonyu.globals.$panel.fillText("spuit",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=45001859;//kernel.TestMain:1859
      _this.x=150;
      //$LASTPOS=45001865;//kernel.TestMain:1865
      _this.y=150;
      //$LASTPOS=45001872;//kernel.TestMain:1872
      while (true) {
        //$LASTPOS=45001889;//kernel.TestMain:1889
        _this.text="("+Tonyu.globals.$mouseX+","+Tonyu.globals.$mouseY+")";
        //$LASTPOS=45001927;//kernel.TestMain:1927
        if (Tonyu.globals.$touches[0].touched) {
          //$LASTPOS=45001960;//kernel.TestMain:1960
          if (Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480) {
            //$LASTPOS=45002021;//kernel.TestMain:2021
            _this.print("left");
          }
          //$LASTPOS=45002044;//kernel.TestMain:2044
          if (Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480) {
            //$LASTPOS=45002129;//kernel.TestMain:2129
            _this.print("right");
          }
          //$LASTPOS=45002153;//kernel.TestMain:2153
          if (Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40) {
            //$LASTPOS=45002223;//kernel.TestMain:2223
            _this.print("up");
          }
          //$LASTPOS=45002244;//kernel.TestMain:2244
          if (Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440) {
            //$LASTPOS=45002334;//kernel.TestMain:2334
            _this.print("down");
          }
          //$LASTPOS=45002366;//kernel.TestMain:2366
          if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
            //$LASTPOS=45002475;//kernel.TestMain:2475
            _this.print("set");
          }
          //$LASTPOS=45002497;//kernel.TestMain:2497
          if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
            //$LASTPOS=45002608;//kernel.TestMain:2608
            _this.print("setOn");
          }
          //$LASTPOS=45002632;//kernel.TestMain:2632
          if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
            //$LASTPOS=45002743;//kernel.TestMain:2743
            _this.print("get");
          }
          //$LASTPOS=45002765;//kernel.TestMain:2765
          if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
            //$LASTPOS=45002876;//kernel.TestMain:2876
            _this.print("save");
          }
          //$LASTPOS=45002899;//kernel.TestMain:2899
          if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
            //$LASTPOS=45003008;//kernel.TestMain:3008
            _this.print("erace");
          }
          //$LASTPOS=45003032;//kernel.TestMain:3032
          if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
            //$LASTPOS=45003143;//kernel.TestMain:3143
            _this.print("spuit");
          }
          
        }
        //$LASTPOS=45003169;//kernel.TestMain:3169
        _this.update();
        
      }
    },
    fiber$main :function _trc_TestMain_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000015;//kernel.TestMain:15
      Tonyu.globals.$Screen.resize(480,640);
      
      _thread.enter(function _trc_TestMain_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000040;//kernel.TestMain:40
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fList=_thread.retVal;
            
            //$LASTPOS=45000064;//kernel.TestMain:64
            _this.fileExist=false;
            //$LASTPOS=45000081;//kernel.TestMain:81
            _this.fList.recursive((function a(f) {
              
              //$LASTPOS=45000116;//kernel.TestMain:116
              f=f+"";
              //$LASTPOS=45000128;//kernel.TestMain:128
              _this.fNames=f.split("/");
              //$LASTPOS=45000153;//kernel.TestMain:153
              _this.fileExist=true;
              //$LASTPOS=45000173;//kernel.TestMain:173
              _this.print(_this.fNames[_this.fNames.length-1]);
            }));
            //$LASTPOS=45000209;//kernel.TestMain:209
            _this.print(_this.fileExist);
            //$LASTPOS=45000227;//kernel.TestMain:227
            Tonyu.globals.$panel.setFillStyle("gray");
            //$LASTPOS=45000256;//kernel.TestMain:256
            Tonyu.globals.$panel.alpha=128;
            //$LASTPOS=45000274;//kernel.TestMain:274
            Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
            //$LASTPOS=45000312;//kernel.TestMain:312
            Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
            //$LASTPOS=45000355;//kernel.TestMain:355
            Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
            //$LASTPOS=45000412;//kernel.TestMain:412
            Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
            //$LASTPOS=45000466;//kernel.TestMain:466
            Tonyu.globals.$panel.alpha=255;
            //$LASTPOS=45000484;//kernel.TestMain:484
            Tonyu.globals.$panel.setFillStyle("black");
            //$LASTPOS=45000528;//kernel.TestMain:528
            Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
            //$LASTPOS=45000573;//kernel.TestMain:573
            Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
            //$LASTPOS=45000620;//kernel.TestMain:620
            Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
            //$LASTPOS=45000667;//kernel.TestMain:667
            Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
            //$LASTPOS=45000714;//kernel.TestMain:714
            Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
            //$LASTPOS=45000758;//kernel.TestMain:758
            Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
            //$LASTPOS=45000804;//kernel.TestMain:804
            Tonyu.globals.$panel.setFillStyle("white");
            //$LASTPOS=45000834;//kernel.TestMain:834
            Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
            //$LASTPOS=45000880;//kernel.TestMain:880
            Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
            //$LASTPOS=45000927;//kernel.TestMain:927
            Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
            //$LASTPOS=45000974;//kernel.TestMain:974
            Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
            //$LASTPOS=45001021;//kernel.TestMain:1021
            Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
            //$LASTPOS=45001066;//kernel.TestMain:1066
            Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
            //$LASTPOS=45001112;//kernel.TestMain:1112
            Tonyu.globals.$panel.setFillStyle("black");
            //$LASTPOS=45001148;//kernel.TestMain:1148
            Tonyu.globals.$panel.fillText("▲",Tonyu.globals.$screenWidth/2,30,40,"center");
            //$LASTPOS=45001200;//kernel.TestMain:1200
            Tonyu.globals.$panel.fillText("◀",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
            //$LASTPOS=45001259;//kernel.TestMain:1259
            Tonyu.globals.$panel.fillText("▼",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
            //$LASTPOS=45001329;//kernel.TestMain:1329
            Tonyu.globals.$panel.fillText("▶",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
            //$LASTPOS=45001424;//kernel.TestMain:1424
            Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
            //$LASTPOS=45001496;//kernel.TestMain:1496
            Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
            //$LASTPOS=45001570;//kernel.TestMain:1570
            Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
            //$LASTPOS=45001642;//kernel.TestMain:1642
            Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
            //$LASTPOS=45001713;//kernel.TestMain:1713
            Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
            //$LASTPOS=45001786;//kernel.TestMain:1786
            Tonyu.globals.$panel.fillText("spuit",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
            //$LASTPOS=45001859;//kernel.TestMain:1859
            _this.x=150;
            //$LASTPOS=45001865;//kernel.TestMain:1865
            _this.y=150;
            //$LASTPOS=45001872;//kernel.TestMain:1872
          case 2:
            //$LASTPOS=45001889;//kernel.TestMain:1889
            _this.text="("+Tonyu.globals.$mouseX+","+Tonyu.globals.$mouseY+")";
            //$LASTPOS=45001927;//kernel.TestMain:1927
            if (Tonyu.globals.$touches[0].touched) {
              //$LASTPOS=45001960;//kernel.TestMain:1960
              if (Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480) {
                //$LASTPOS=45002021;//kernel.TestMain:2021
                _this.print("left");
              }
              //$LASTPOS=45002044;//kernel.TestMain:2044
              if (Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480) {
                //$LASTPOS=45002129;//kernel.TestMain:2129
                _this.print("right");
              }
              //$LASTPOS=45002153;//kernel.TestMain:2153
              if (Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40) {
                //$LASTPOS=45002223;//kernel.TestMain:2223
                _this.print("up");
              }
              //$LASTPOS=45002244;//kernel.TestMain:2244
              if (Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440) {
                //$LASTPOS=45002334;//kernel.TestMain:2334
                _this.print("down");
              }
              //$LASTPOS=45002366;//kernel.TestMain:2366
              if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
                //$LASTPOS=45002475;//kernel.TestMain:2475
                _this.print("set");
              }
              //$LASTPOS=45002497;//kernel.TestMain:2497
              if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
                //$LASTPOS=45002608;//kernel.TestMain:2608
                _this.print("setOn");
              }
              //$LASTPOS=45002632;//kernel.TestMain:2632
              if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
                //$LASTPOS=45002743;//kernel.TestMain:2743
                _this.print("get");
              }
              //$LASTPOS=45002765;//kernel.TestMain:2765
              if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
                //$LASTPOS=45002876;//kernel.TestMain:2876
                _this.print("save");
              }
              //$LASTPOS=45002899;//kernel.TestMain:2899
              if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
                //$LASTPOS=45003008;//kernel.TestMain:3008
                _this.print("erace");
              }
              //$LASTPOS=45003032;//kernel.TestMain:3032
              if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
                //$LASTPOS=45003143;//kernel.TestMain:3143
                _this.print("spuit");
              }
              
            }
            //$LASTPOS=45003169;//kernel.TestMain:3169
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
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
  fullName: 'kernel.Boot',
  shortName: 'Boot',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2MediaPlayer],
  methods: {
    main :function _trc_Boot_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46002040;//kernel.Boot:2040
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=46002053;//kernel.Boot:2053
      _this.initSounds();
      //$LASTPOS=46002068;//kernel.Boot:2068
      _this.initSprites();
      //$LASTPOS=46002084;//kernel.Boot:2084
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=46002115;//kernel.Boot:2115
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=46002152;//kernel.Boot:2152
      _this.initThread();
      //$LASTPOS=46002169;//kernel.Boot:2169
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=46002186;//kernel.Boot:2186
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=46002203;//kernel.Boot:2203
      Tonyu.globals.$Math=Math;
      //$LASTPOS=46002216;//kernel.Boot:2216
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=46002326;//kernel.Boot:2326
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=46002350;//kernel.Boot:2350
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=46002490;//kernel.Boot:2490
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=46002528;//kernel.Boot:2528
        SplashScreen.hide();
      }
      //$LASTPOS=46002550;//kernel.Boot:2550
      _this.initFPSParams();
      //$LASTPOS=46002570;//kernel.Boot:2570
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=46002591;//kernel.Boot:2591
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=46002612;//kernel.Boot:2612
      while (true) {
        //$LASTPOS=46002652;//kernel.Boot:2652
        _this.scheduler.stepsAll();
        //$LASTPOS=46002679;//kernel.Boot:2679
        Tonyu.globals.$Keys.update();
        //$LASTPOS=46002700;//kernel.Boot:2700
        Tonyu.globals.$InputDevice.update();
        //$LASTPOS=46002728;//kernel.Boot:2728
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=46002761;//kernel.Boot:2761
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=46002796;//kernel.Boot:2796
        _this.doDraw=_this.now()<_this.deadLine;
        //$LASTPOS=46002824;//kernel.Boot:2824
        if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
          //$LASTPOS=46002878;//kernel.Boot:2878
          _this.doDraw=true;
          //$LASTPOS=46002900;//kernel.Boot:2900
          _this.resetDeadLine();
          
        }
        //$LASTPOS=46002929;//kernel.Boot:2929
        if (_this.doDraw) {
          //$LASTPOS=46002972;//kernel.Boot:2972
          Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=46003017;//kernel.Boot:3017
          Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=46003057;//kernel.Boot:3057
          Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=46003102;//kernel.Boot:3102
          Tonyu.globals.$Screen.draw();
          //$LASTPOS=46003127;//kernel.Boot:3127
          _this.fps_fpsCnt++;
          //$LASTPOS=46003151;//kernel.Boot:3151
          _this.frameSkipped=0;
          
        } else {
          //$LASTPOS=46003190;//kernel.Boot:3190
          _this.frameSkipped++;
          
        }
        //$LASTPOS=46003218;//kernel.Boot:3218
        Tonyu.globals.$Sprites.checkHit();
        //$LASTPOS=46003244;//kernel.Boot:3244
        Tonyu.globals.$Sprites.removeOneframes();
        //$LASTPOS=46003277;//kernel.Boot:3277
        _this.fps_rpsCnt++;
        //$LASTPOS=46003297;//kernel.Boot:3297
        _this.measureFps();
        //$LASTPOS=46003316;//kernel.Boot:3316
        _this.waitFrame();
        //$LASTPOS=46003343;//kernel.Boot:3343
        while (_this.paused) {
          //$LASTPOS=46003368;//kernel.Boot:3368
          _this.waitFor(Tonyu.timeout(1));
          //$LASTPOS=46003404;//kernel.Boot:3404
          if (! _this.paused) {
            //$LASTPOS=46003417;//kernel.Boot:3417
            _this.resetDeadLine();
          }
          
        }
        
      }
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46002040;//kernel.Boot:2040
      Tonyu.globals.$Boot=_this;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46002053;//kernel.Boot:2053
            _this.fiber$initSounds(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46002068;//kernel.Boot:2068
            _this.fiber$initSprites(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=46002084;//kernel.Boot:2084
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=46002115;//kernel.Boot:2115
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=46002152;//kernel.Boot:2152
            _this.fiber$initThread(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=46002169;//kernel.Boot:2169
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=46002186;//kernel.Boot:2186
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=46002203;//kernel.Boot:2203
            Tonyu.globals.$Math=Math;
            //$LASTPOS=46002216;//kernel.Boot:2216
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=46002326;//kernel.Boot:2326
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=46002350;//kernel.Boot:2350
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=46002490;//kernel.Boot:2490
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=46002528;//kernel.Boot:2528
              SplashScreen.hide();
            }
            //$LASTPOS=46002550;//kernel.Boot:2550
            _this.initFPSParams();
            //$LASTPOS=46002570;//kernel.Boot:2570
            Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
            //$LASTPOS=46002591;//kernel.Boot:2591
            Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
            //$LASTPOS=46002612;//kernel.Boot:2612
          case 4:
            //$LASTPOS=46002652;//kernel.Boot:2652
            _this.scheduler.stepsAll();
            //$LASTPOS=46002679;//kernel.Boot:2679
            Tonyu.globals.$Keys.update();
            //$LASTPOS=46002700;//kernel.Boot:2700
            Tonyu.globals.$InputDevice.update();
            //$LASTPOS=46002728;//kernel.Boot:2728
            Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
            //$LASTPOS=46002761;//kernel.Boot:2761
            Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
            //$LASTPOS=46002796;//kernel.Boot:2796
            _this.doDraw=_this.now()<_this.deadLine;
            //$LASTPOS=46002824;//kernel.Boot:2824
            if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
              //$LASTPOS=46002878;//kernel.Boot:2878
              _this.doDraw=true;
              //$LASTPOS=46002900;//kernel.Boot:2900
              _this.resetDeadLine();
              
            }
            //$LASTPOS=46002929;//kernel.Boot:2929
            if (_this.doDraw) {
              //$LASTPOS=46002972;//kernel.Boot:2972
              Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=46003017;//kernel.Boot:3017
              Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=46003057;//kernel.Boot:3057
              Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=46003102;//kernel.Boot:3102
              Tonyu.globals.$Screen.draw();
              //$LASTPOS=46003127;//kernel.Boot:3127
              _this.fps_fpsCnt++;
              //$LASTPOS=46003151;//kernel.Boot:3151
              _this.frameSkipped=0;
              
            } else {
              //$LASTPOS=46003190;//kernel.Boot:3190
              _this.frameSkipped++;
              
            }
            //$LASTPOS=46003218;//kernel.Boot:3218
            Tonyu.globals.$Sprites.checkHit();
            //$LASTPOS=46003244;//kernel.Boot:3244
            Tonyu.globals.$Sprites.removeOneframes();
            //$LASTPOS=46003277;//kernel.Boot:3277
            _this.fps_rpsCnt++;
            //$LASTPOS=46003297;//kernel.Boot:3297
            _this.measureFps();
            //$LASTPOS=46003316;//kernel.Boot:3316
            _this.fiber$waitFrame(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=46003343;//kernel.Boot:3343
          case 6:
            if (!(_this.paused)) { __pc=8; break; }
            //$LASTPOS=46003368;//kernel.Boot:3368
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=7;return;
          case 7:
            
            //$LASTPOS=46003404;//kernel.Boot:3404
            if (! _this.paused) {
              //$LASTPOS=46003417;//kernel.Boot:3417
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
      
      //$LASTPOS=46000206;//kernel.Boot:206
      _this.extend(param);
    },
    update :function _trc_Boot_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000242;//kernel.Boot:242
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
            //$LASTPOS=46000242;//kernel.Boot:242
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
      var _it_260;
      
      //$LASTPOS=46000323;//kernel.Boot:323
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=46000352;//kernel.Boot:352
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=46000386;//kernel.Boot:386
      _this.print("Loading plugins..");
      //$LASTPOS=46000420;//kernel.Boot:420
      a = _this.asyncResult();
      //$LASTPOS=46000446;//kernel.Boot:446
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      //$LASTPOS=46000492;//kernel.Boot:492
      _this.waitFor(a);
      //$LASTPOS=46000509;//kernel.Boot:509
      _this.print("Loading pats..");
      //$LASTPOS=46000540;//kernel.Boot:540
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=46000583;//kernel.Boot:583
      a=_this.asyncResult();
      //$LASTPOS=46000605;//kernel.Boot:605
      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      //$LASTPOS=46000690;//kernel.Boot:690
      _this.waitFor(a);
      //$LASTPOS=46000707;//kernel.Boot:707
      r = a[0];
      //$LASTPOS=46000724;//kernel.Boot:724
      Tonyu.globals.$Sprites.setImageList(r);
      //$LASTPOS=46000755;//kernel.Boot:755
      _it_260=Tonyu.iterator(r.names,2);
      while(_it_260.next()) {
        name=_it_260[0];
        val=_it_260[1];
        
        //$LASTPOS=46000796;//kernel.Boot:796
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=46000836;//kernel.Boot:836
      _this.print("Loading pats done.");
      //$LASTPOS=46000871;//kernel.Boot:871
      _this.cvj=$("canvas");
      //$LASTPOS=46000893;//kernel.Boot:893
      if (Tonyu.noviceMode) {
        //$LASTPOS=46000926;//kernel.Boot:926
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=46001010;//kernel.Boot:1010
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
      var _it_260;
      
      //$LASTPOS=46000323;//kernel.Boot:323
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=46000352;//kernel.Boot:352
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=46000386;//kernel.Boot:386
      _this.print("Loading plugins..");
      //$LASTPOS=46000420;//kernel.Boot:420
      a = _this.asyncResult();
      //$LASTPOS=46000446;//kernel.Boot:446
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      
      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000492;//kernel.Boot:492
            _this.fiber$waitFor(_thread, a);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46000509;//kernel.Boot:509
            _this.print("Loading pats..");
            //$LASTPOS=46000540;//kernel.Boot:540
            rs = Tonyu.globals.$currentProject.getResource();
            //$LASTPOS=46000583;//kernel.Boot:583
            a=_this.asyncResult();
            //$LASTPOS=46000605;//kernel.Boot:605
            ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
            //$LASTPOS=46000690;//kernel.Boot:690
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=46000707;//kernel.Boot:707
            r = a[0];
            //$LASTPOS=46000724;//kernel.Boot:724
            Tonyu.globals.$Sprites.setImageList(r);
            //$LASTPOS=46000755;//kernel.Boot:755
            _it_260=Tonyu.iterator(r.names,2);
            while(_it_260.next()) {
              name=_it_260[0];
              val=_it_260[1];
              
              //$LASTPOS=46000796;//kernel.Boot:796
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=46000836;//kernel.Boot:836
            _this.print("Loading pats done.");
            //$LASTPOS=46000871;//kernel.Boot:871
            _this.cvj=$("canvas");
            //$LASTPOS=46000893;//kernel.Boot:893
            if (Tonyu.noviceMode) {
              //$LASTPOS=46000926;//kernel.Boot:926
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
              
            } else {
              //$LASTPOS=46001010;//kernel.Boot:1010
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSounds :function _trc_Boot_initSounds() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46001103;//kernel.Boot:1103
      _this.print("Loading sounds...");
      //$LASTPOS=46001137;//kernel.Boot:1137
      _this.initT2MediaPlayer();
      //$LASTPOS=46001163;//kernel.Boot:1163
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=46001202;//kernel.Boot:1202
      _this.print("Loading sounds done.");
      //$LASTPOS=46001239;//kernel.Boot:1239
      _this.on("stop",(function anonymous_1249() {
        
        //$LASTPOS=46001261;//kernel.Boot:1261
        _this.clearSEData();
      }));
      //$LASTPOS=46001289;//kernel.Boot:1289
      Tonyu.globals.$sound=_this;
    },
    fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46001103;//kernel.Boot:1103
      _this.print("Loading sounds...");
      
      _thread.enter(function _trc_Boot_ent_initSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46001137;//kernel.Boot:1137
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46001163;//kernel.Boot:1163
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=46001202;//kernel.Boot:1202
            _this.print("Loading sounds done.");
            //$LASTPOS=46001239;//kernel.Boot:1239
            _this.on("stop",(function anonymous_1249() {
              
              //$LASTPOS=46001261;//kernel.Boot:1261
              _this.clearSEData();
            }));
            //$LASTPOS=46001289;//kernel.Boot:1289
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
      
      //$LASTPOS=46001392;//kernel.Boot:1392
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=46001438;//kernel.Boot:1438
      mainClassName = o.run.mainClass;
      //$LASTPOS=46001478;//kernel.Boot:1478
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=46001519;//kernel.Boot:1519
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=46001565;//kernel.Boot:1565
      if (! _this.mainClass) {
        //$LASTPOS=46001592;//kernel.Boot:1592
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=46001729;//kernel.Boot:1729
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=46001770;//kernel.Boot:1770
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot_f_initThread(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=46001392;//kernel.Boot:1392
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=46001438;//kernel.Boot:1438
      mainClassName = o.run.mainClass;
      //$LASTPOS=46001478;//kernel.Boot:1478
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=46001519;//kernel.Boot:1519
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=46001565;//kernel.Boot:1565
      if (! _this.mainClass) {
        //$LASTPOS=46001592;//kernel.Boot:1592
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=46001729;//kernel.Boot:1729
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=46001770;//kernel.Boot:1770
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46001806;//kernel.Boot:1806
      _this.fireEvent("stop");
      //$LASTPOS=46001830;//kernel.Boot:1830
      _this.die();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46001806;//kernel.Boot:1806
      _this.fireEvent("stop");
      //$LASTPOS=46001830;//kernel.Boot:1830
      _this.die();
      
      _thread.retVal=_this;return;
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var th;
      
      //$LASTPOS=46001875;//kernel.Boot:1875
      method=method||"main";
      //$LASTPOS=46001903;//kernel.Boot:1903
      args=args||[];
      //$LASTPOS=46001923;//kernel.Boot:1923
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=46001975;//kernel.Boot:1975
      _this.addThreadGroup(obj);
      //$LASTPOS=46002001;//kernel.Boot:2001
      obj.addThread(th);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=46001875;//kernel.Boot:1875
      method=method||"main";
      //$LASTPOS=46001903;//kernel.Boot:1903
      args=args||[];
      //$LASTPOS=46001923;//kernel.Boot:1923
      th = _this.scheduler.newThread(obj,method,args);
      
      _thread.enter(function _trc_Boot_ent_schedule(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46001975;//kernel.Boot:1975
            _this.fiber$addThreadGroup(_thread, obj);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46002001;//kernel.Boot:2001
            obj.addThread(th);
            _thread.exit(th);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46003497;//kernel.Boot:3497
      _this._fps=30;
      //$LASTPOS=46003513;//kernel.Boot:3513
      _this.maxframeSkip=5;
      //$LASTPOS=46003563;//kernel.Boot:3563
      _this.frameCnt=0;
      //$LASTPOS=46003582;//kernel.Boot:3582
      _this.resetDeadLine();
      //$LASTPOS=46003604;//kernel.Boot:3604
      _this.lastMeasured=_this.now();
      //$LASTPOS=46003629;//kernel.Boot:3629
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
    },
    now :function _trc_Boot_now() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot_resetDeadLine() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46003759;//kernel.Boot:3759
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=46003790;//kernel.Boot:3790
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var wt;
      
      //$LASTPOS=46003834;//kernel.Boot:3834
      wt = _this.deadLine-_this.now();
      //$LASTPOS=46003862;//kernel.Boot:3862
      if (wt<1) {
        //$LASTPOS=46003883;//kernel.Boot:3883
        if (wt<- 1000) {
          //$LASTPOS=46003897;//kernel.Boot:3897
          _this.resetDeadLine();
        }
        //$LASTPOS=46003923;//kernel.Boot:3923
        wt=1;
        
      }
      //$LASTPOS=46003941;//kernel.Boot:3941
      wt=_this.floor(wt);
      //$LASTPOS=46003960;//kernel.Boot:3960
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=46003993;//kernel.Boot:3993
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=46003834;//kernel.Boot:3834
      wt = _this.deadLine-_this.now();
      //$LASTPOS=46003862;//kernel.Boot:3862
      if (wt<1) {
        //$LASTPOS=46003883;//kernel.Boot:3883
        if (wt<- 1000) {
          //$LASTPOS=46003897;//kernel.Boot:3897
          _this.resetDeadLine();
        }
        //$LASTPOS=46003923;//kernel.Boot:3923
        wt=1;
        
      }
      //$LASTPOS=46003941;//kernel.Boot:3941
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46003960;//kernel.Boot:3960
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46003993;//kernel.Boot:3993
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
      
      //$LASTPOS=46004153;//kernel.Boot:4153
      _this._fps=fps;
      //$LASTPOS=46004170;//kernel.Boot:4170
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=46004205;//kernel.Boot:4205
        maxFrameSkip=5;
      }
      //$LASTPOS=46004226;//kernel.Boot:4226
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=46004265;//kernel.Boot:4265
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
      
      //$LASTPOS=46004476;//kernel.Boot:4476
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=46004516;//kernel.Boot:4516
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=46004545;//kernel.Boot:4545
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=46004574;//kernel.Boot:4574
        _this.fps_fpsCnt=0;
        //$LASTPOS=46004597;//kernel.Boot:4597
        _this.fps_rpsCnt=0;
        //$LASTPOS=46004620;//kernel.Boot:4620
        _this.lastMeasured=_this.now();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"hide":{"nowait":true},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}
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
      
      //$LASTPOS=47000064;//kernel.BodyActor:64
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=47000099;//kernel.BodyActor:99
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000064;//kernel.BodyActor:64
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=47000099;//kernel.BodyActor:99
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
      
      //$LASTPOS=47000162;//kernel.BodyActor:162
      wworld = _this.getWorld();
      //$LASTPOS=47000189;//kernel.BodyActor:189
      _this.world=wworld.world;
      //$LASTPOS=47000213;//kernel.BodyActor:213
      _this.scale=wworld.scale;
      //$LASTPOS=47000237;//kernel.BodyActor:237
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47000280;//kernel.BodyActor:280
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=47000326;//kernel.BodyActor:326
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=47000366;//kernel.BodyActor:366
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=47000418;//kernel.BodyActor:418
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=47000464;//kernel.BodyActor:464
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=47000528;//kernel.BodyActor:528
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=47000595;//kernel.BodyActor:595
      fixDef = new b2FixtureDef;
      //$LASTPOS=47000630;//kernel.BodyActor:630
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=47000671;//kernel.BodyActor:671
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=47000714;//kernel.BodyActor:714
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=47000768;//kernel.BodyActor:768
      bodyDef = new b2BodyDef;
      //$LASTPOS=47000801;//kernel.BodyActor:801
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=47000886;//kernel.BodyActor:886
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=47000921;//kernel.BodyActor:921
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=47000956;//kernel.BodyActor:956
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=47001004;//kernel.BodyActor:1004
      w = _this.width;h = _this.height;
      //$LASTPOS=47001030;//kernel.BodyActor:1030
      if (! w) {
        //$LASTPOS=47001048;//kernel.BodyActor:1048
        _this.detectShape();
        //$LASTPOS=47001071;//kernel.BodyActor:1071
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=47001100;//kernel.BodyActor:1100
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=47001140;//kernel.BodyActor:1140
      if (_this.shape=="box") {
        //$LASTPOS=47001168;//kernel.BodyActor:1168
        if (! h) {
          //$LASTPOS=47001176;//kernel.BodyActor:1176
          h=w;
        }
        //$LASTPOS=47001189;//kernel.BodyActor:1189
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=47001232;//kernel.BodyActor:1232
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=47001333;//kernel.BodyActor:1333
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=47001369;//kernel.BodyActor:1369
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=47001443;//kernel.BodyActor:1443
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=47001477;//kernel.BodyActor:1477
      fps = wworld.fps;
      //$LASTPOS=47001501;//kernel.BodyActor:1501
      r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
      //$LASTPOS=47001582;//kernel.BodyActor:1582
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=47001618;//kernel.BodyActor:1618
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=47001650;//kernel.BodyActor:1650
      _this.body.SetUserData(_this);
      //$LASTPOS=47001678;//kernel.BodyActor:1678
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=47001710;//kernel.BodyActor:1710
      _this.rotation=r;
      //$LASTPOS=47001726;//kernel.BodyActor:1726
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
      
      //$LASTPOS=47000162;//kernel.BodyActor:162
      wworld = _this.getWorld();
      //$LASTPOS=47000189;//kernel.BodyActor:189
      _this.world=wworld.world;
      //$LASTPOS=47000213;//kernel.BodyActor:213
      _this.scale=wworld.scale;
      //$LASTPOS=47000237;//kernel.BodyActor:237
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47000280;//kernel.BodyActor:280
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=47000326;//kernel.BodyActor:326
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=47000366;//kernel.BodyActor:366
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      //$LASTPOS=47000418;//kernel.BodyActor:418
      b2Fixture = Box2D.Dynamics.b2Fixture;
      //$LASTPOS=47000464;//kernel.BodyActor:464
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      //$LASTPOS=47000528;//kernel.BodyActor:528
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      //$LASTPOS=47000595;//kernel.BodyActor:595
      fixDef = new b2FixtureDef;
      
      _thread.enter(function _trc_BodyActor_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000630;//kernel.BodyActor:630
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=1;return;
          case 1:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=47000671;//kernel.BodyActor:671
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=2;return;
          case 2:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=47000714;//kernel.BodyActor:714
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=3;return;
          case 3:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=47000768;//kernel.BodyActor:768
            bodyDef = new b2BodyDef;
            //$LASTPOS=47000801;//kernel.BodyActor:801
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=47000886;//kernel.BodyActor:886
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=47000921;//kernel.BodyActor:921
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=47000956;//kernel.BodyActor:956
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=47001004;//kernel.BodyActor:1004
            w = _this.width;h = _this.height;
            //$LASTPOS=47001030;//kernel.BodyActor:1030
            if (! w) {
              //$LASTPOS=47001048;//kernel.BodyActor:1048
              _this.detectShape();
              //$LASTPOS=47001071;//kernel.BodyActor:1071
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=47001100;//kernel.BodyActor:1100
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=47001140;//kernel.BodyActor:1140
            if (_this.shape=="box") {
              //$LASTPOS=47001168;//kernel.BodyActor:1168
              if (! h) {
                //$LASTPOS=47001176;//kernel.BodyActor:1176
                h=w;
              }
              //$LASTPOS=47001189;//kernel.BodyActor:1189
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=47001232;//kernel.BodyActor:1232
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=47001333;//kernel.BodyActor:1333
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=47001369;//kernel.BodyActor:1369
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=47001443;//kernel.BodyActor:1443
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=47001477;//kernel.BodyActor:1477
            fps = wworld.fps;
            //$LASTPOS=47001501;//kernel.BodyActor:1501
            r = _this.rotation;ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));vr = _this.defv(_this.vrotation,0);
            //$LASTPOS=47001582;//kernel.BodyActor:1582
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=47001618;//kernel.BodyActor:1618
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=47001650;//kernel.BodyActor:1650
            _this.body.SetUserData(_this);
            //$LASTPOS=47001678;//kernel.BodyActor:1678
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=47001710;//kernel.BodyActor:1710
            _this.rotation=r;
            //$LASTPOS=47001726;//kernel.BodyActor:1726
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
      
      //$LASTPOS=47001773;//kernel.BodyActor:1773
      res = [];m;point;
      //$LASTPOS=47001797;//kernel.BodyActor:1797
      w = _this.getWorld();
      //$LASTPOS=47001819;//kernel.BodyActor:1819
      //$LASTPOS=47001824;//kernel.BodyActor:1824
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=47001880;//kernel.BodyActor:1880
          if (c.IsTouching()) {
            //$LASTPOS=47001911;//kernel.BodyActor:1911
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=47001982;//kernel.BodyActor:1982
            if (m.m_points[0]) {
              //$LASTPOS=47002019;//kernel.BodyActor:2019
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=47002092;//kernel.BodyActor:2092
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=47002263;//kernel.BodyActor:2263
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=47002363;//kernel.BodyActor:2363
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=47002388;//kernel.BodyActor:2388
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=47002447;//kernel.BodyActor:2447
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=47002506;//kernel.BodyActor:2506
            if (a===_this) {
              //$LASTPOS=47002538;//kernel.BodyActor:2538
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=47002607;//kernel.BodyActor:2607
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=47002698;//kernel.BodyActor:2698
              if (b===_this) {
                //$LASTPOS=47002730;//kernel.BodyActor:2730
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=47002799;//kernel.BodyActor:2799
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
      
      //$LASTPOS=47001773;//kernel.BodyActor:1773
      res = [];m;point;
      //$LASTPOS=47001797;//kernel.BodyActor:1797
      w = _this.getWorld();
      //$LASTPOS=47001819;//kernel.BodyActor:1819
      //$LASTPOS=47001824;//kernel.BodyActor:1824
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=47001880;//kernel.BodyActor:1880
          if (c.IsTouching()) {
            //$LASTPOS=47001911;//kernel.BodyActor:1911
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=47001982;//kernel.BodyActor:1982
            if (m.m_points[0]) {
              //$LASTPOS=47002019;//kernel.BodyActor:2019
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=47002092;//kernel.BodyActor:2092
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=47002263;//kernel.BodyActor:2263
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=47002363;//kernel.BodyActor:2363
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=47002388;//kernel.BodyActor:2388
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=47002447;//kernel.BodyActor:2447
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=47002506;//kernel.BodyActor:2506
            if (a===_this) {
              //$LASTPOS=47002538;//kernel.BodyActor:2538
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=47002607;//kernel.BodyActor:2607
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=47002698;//kernel.BodyActor:2698
              if (b===_this) {
                //$LASTPOS=47002730;//kernel.BodyActor:2730
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=47002799;//kernel.BodyActor:2799
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
      
      //$LASTPOS=47003061;//kernel.BodyActor:3061
      res = [];
      //$LASTPOS=47003077;//kernel.BodyActor:3077
      //$LASTPOS=47003082;//kernel.BodyActor:3082
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=47003138;//kernel.BodyActor:3138
          if (c.IsTouching()) {
            //$LASTPOS=47003172;//kernel.BodyActor:3172
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=47003231;//kernel.BodyActor:3231
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=47003290;//kernel.BodyActor:3290
            if (a===_this) {
              //$LASTPOS=47003322;//kernel.BodyActor:3322
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=47003391;//kernel.BodyActor:3391
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=47003441;//kernel.BodyActor:3441
              if (b===_this) {
                //$LASTPOS=47003473;//kernel.BodyActor:3473
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=47003542;//kernel.BodyActor:3542
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
      
      //$LASTPOS=47003061;//kernel.BodyActor:3061
      res = [];
      //$LASTPOS=47003077;//kernel.BodyActor:3077
      //$LASTPOS=47003082;//kernel.BodyActor:3082
      c = _this.world.GetContactList();
      while(c) {
        {
          //$LASTPOS=47003138;//kernel.BodyActor:3138
          if (c.IsTouching()) {
            //$LASTPOS=47003172;//kernel.BodyActor:3172
            a = c.GetFixtureA().GetBody().GetUserData();
            //$LASTPOS=47003231;//kernel.BodyActor:3231
            b = c.GetFixtureB().GetBody().GetUserData();
            //$LASTPOS=47003290;//kernel.BodyActor:3290
            if (a===_this) {
              //$LASTPOS=47003322;//kernel.BodyActor:3322
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=47003391;//kernel.BodyActor:3391
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=47003441;//kernel.BodyActor:3441
              if (b===_this) {
                //$LASTPOS=47003473;//kernel.BodyActor:3473
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=47003542;//kernel.BodyActor:3542
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
      
      //$LASTPOS=47003652;//kernel.BodyActor:3652
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47003695;//kernel.BodyActor:3695
      scale = _this.getWorld().scale;
      //$LASTPOS=47003727;//kernel.BodyActor:3727
      fps = 60;
      //$LASTPOS=47003743;//kernel.BodyActor:3743
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=47003652;//kernel.BodyActor:3652
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47003695;//kernel.BodyActor:3695
      scale = _this.getWorld().scale;
      //$LASTPOS=47003727;//kernel.BodyActor:3727
      fps = 60;
      //$LASTPOS=47003743;//kernel.BodyActor:3743
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=47003834;//kernel.BodyActor:3834
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47003877;//kernel.BodyActor:3877
      scale = _this.getWorld().scale;
      //$LASTPOS=47003909;//kernel.BodyActor:3909
      fps = 60;
      //$LASTPOS=47003925;//kernel.BodyActor:3925
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=47003834;//kernel.BodyActor:3834
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47003877;//kernel.BodyActor:3877
      scale = _this.getWorld().scale;
      //$LASTPOS=47003909;//kernel.BodyActor:3909
      fps = 60;
      //$LASTPOS=47003925;//kernel.BodyActor:3925
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
      
      _thread.retVal=_this;return;
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47004008;//kernel.BodyActor:4008
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47004008;//kernel.BodyActor:4008
      _this.body.ApplyTorque(a);
      
      _thread.retVal=_this;return;
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=47004052;//kernel.BodyActor:4052
      pos = _this.body.GetPosition();
      //$LASTPOS=47004084;//kernel.BodyActor:4084
      pos.x+=dx/_this.scale;
      //$LASTPOS=47004105;//kernel.BodyActor:4105
      pos.y+=dy/_this.scale;
      //$LASTPOS=47004126;//kernel.BodyActor:4126
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      //$LASTPOS=47004052;//kernel.BodyActor:4052
      pos = _this.body.GetPosition();
      //$LASTPOS=47004084;//kernel.BodyActor:4084
      pos.x+=dx/_this.scale;
      //$LASTPOS=47004105;//kernel.BodyActor:4105
      pos.y+=dy/_this.scale;
      //$LASTPOS=47004126;//kernel.BodyActor:4126
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
      
      //$LASTPOS=47004211;//kernel.BodyActor:4211
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=47004228;//kernel.BodyActor:4228
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
      
      //$LASTPOS=47004316;//kernel.BodyActor:4316
      params=params||{};
      //$LASTPOS=47004339;//kernel.BodyActor:4339
      px = params.x||_this.x;
      //$LASTPOS=47004363;//kernel.BodyActor:4363
      py = params.y||_this.y;
      //$LASTPOS=47004387;//kernel.BodyActor:4387
      wworld = _this.getWorld();
      //$LASTPOS=47004428;//kernel.BodyActor:4428
      scale = wworld.scale;
      //$LASTPOS=47004456;//kernel.BodyActor:4456
      world = wworld.world;
      //$LASTPOS=47004484;//kernel.BodyActor:4484
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=47004530;//kernel.BodyActor:4530
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=47004570;//kernel.BodyActor:4570
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=47004624;//kernel.BodyActor:4624
      jd = new JDC;
      //$LASTPOS=47004644;//kernel.BodyActor:4644
      bodyDef = new b2BodyDef;
      //$LASTPOS=47004677;//kernel.BodyActor:4677
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=47004718;//kernel.BodyActor:4718
      bodyDef.position.x=px/scale;
      //$LASTPOS=47004754;//kernel.BodyActor:4754
      bodyDef.position.y=py/scale;
      //$LASTPOS=47004790;//kernel.BodyActor:4790
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=47004831;//kernel.BodyActor:4831
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47004874;//kernel.BodyActor:4874
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=47004936;//kernel.BodyActor:4936
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=47004989;//kernel.BodyActor:4989
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=47005036;//kernel.BodyActor:5036
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=47005083;//kernel.BodyActor:5083
        jd.enableLimit=true;
        
      }
      //$LASTPOS=47005116;//kernel.BodyActor:5116
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
      
      //$LASTPOS=47004316;//kernel.BodyActor:4316
      params=params||{};
      //$LASTPOS=47004339;//kernel.BodyActor:4339
      px = params.x||_this.x;
      //$LASTPOS=47004363;//kernel.BodyActor:4363
      py = params.y||_this.y;
      //$LASTPOS=47004387;//kernel.BodyActor:4387
      wworld = _this.getWorld();
      //$LASTPOS=47004428;//kernel.BodyActor:4428
      scale = wworld.scale;
      //$LASTPOS=47004456;//kernel.BodyActor:4456
      world = wworld.world;
      //$LASTPOS=47004484;//kernel.BodyActor:4484
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      //$LASTPOS=47004530;//kernel.BodyActor:4530
      b2Body = Box2D.Dynamics.b2Body;
      //$LASTPOS=47004570;//kernel.BodyActor:4570
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      //$LASTPOS=47004624;//kernel.BodyActor:4624
      jd = new JDC;
      //$LASTPOS=47004644;//kernel.BodyActor:4644
      bodyDef = new b2BodyDef;
      //$LASTPOS=47004677;//kernel.BodyActor:4677
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=47004718;//kernel.BodyActor:4718
      bodyDef.position.x=px/scale;
      //$LASTPOS=47004754;//kernel.BodyActor:4754
      bodyDef.position.y=py/scale;
      //$LASTPOS=47004790;//kernel.BodyActor:4790
      bodyB = world.CreateBody(bodyDef);
      //$LASTPOS=47004831;//kernel.BodyActor:4831
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      //$LASTPOS=47004874;//kernel.BodyActor:4874
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=47004936;//kernel.BodyActor:4936
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=47004989;//kernel.BodyActor:4989
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=47005036;//kernel.BodyActor:5036
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=47005083;//kernel.BodyActor:5083
        jd.enableLimit=true;
        
      }
      //$LASTPOS=47005116;//kernel.BodyActor:5116
      world.CreateJoint(jd);
      
      _thread.retVal=_this;return;
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47005161;//kernel.BodyActor:5161
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47005261;//kernel.BodyActor:5261
      r=r||0;
      //$LASTPOS=47005273;//kernel.BodyActor:5273
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=47005326;//kernel.BodyActor:5326
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
      
      //$LASTPOS=47005509;//kernel.BodyActor:5509
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=47005535;//kernel.BodyActor:5535
      pos = _this.body.GetPosition();
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=47005600;//kernel.BodyActor:5600
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=47005628;//kernel.BodyActor:5628
      v=v||0;
      //$LASTPOS=47005640;//kernel.BodyActor:5640
      pos = _this.body.GetPosition();
      //$LASTPOS=47005672;//kernel.BodyActor:5672
      pos.x=v/_this.scale;
      //$LASTPOS=47005691;//kernel.BodyActor:5691
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=47005725;//kernel.BodyActor:5725
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=47005751;//kernel.BodyActor:5751
      pos = _this.body.GetPosition();
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pos;
      
      //$LASTPOS=47005816;//kernel.BodyActor:5816
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=47005844;//kernel.BodyActor:5844
      v=v||0;
      //$LASTPOS=47005856;//kernel.BodyActor:5856
      pos = _this.body.GetPosition();
      //$LASTPOS=47005888;//kernel.BodyActor:5888
      pos.y=v/_this.scale;
      //$LASTPOS=47005907;//kernel.BodyActor:5907
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var v;
      
      //$LASTPOS=47005943;//kernel.BodyActor:5943
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=47005970;//kernel.BodyActor:5970
      v = _this.body.GetLinearVelocity();
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ve;
      
      //$LASTPOS=47006053;//kernel.BodyActor:6053
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=47006082;//kernel.BodyActor:6082
      v=v||0;
      //$LASTPOS=47006094;//kernel.BodyActor:6094
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=47006131;//kernel.BodyActor:6131
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=47006164;//kernel.BodyActor:6164
      if (v) {
        //$LASTPOS=47006171;//kernel.BodyActor:6171
        _this.body.SetAwake(true);
      }
      //$LASTPOS=47006196;//kernel.BodyActor:6196
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var v;
      
      //$LASTPOS=47006237;//kernel.BodyActor:6237
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=47006264;//kernel.BodyActor:6264
      v = _this.body.GetLinearVelocity();
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var ve;
      
      //$LASTPOS=47006347;//kernel.BodyActor:6347
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=47006376;//kernel.BodyActor:6376
      ve = _this.body.GetLinearVelocity();
      //$LASTPOS=47006413;//kernel.BodyActor:6413
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=47006446;//kernel.BodyActor:6446
      if (v) {
        //$LASTPOS=47006453;//kernel.BodyActor:6453
        _this.body.SetAwake(true);
      }
      //$LASTPOS=47006478;//kernel.BodyActor:6478
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47006525;//kernel.BodyActor:6525
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47006627;//kernel.BodyActor:6627
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=47006656;//kernel.BodyActor:6656
      v=v||0;
      //$LASTPOS=47006668;//kernel.BodyActor:6668
      if (v) {
        //$LASTPOS=47006675;//kernel.BodyActor:6675
        _this.body.SetAwake(true);
      }
      //$LASTPOS=47006700;//kernel.BodyActor:6700
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
      
      //$LASTPOS=48000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=48000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=48000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=48000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=48000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=48000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=48000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=48000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=48000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=48000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=48000212;//kernel.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=48000233;//kernel.DxChar:233
      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
