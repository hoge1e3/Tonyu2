Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventMod=Tonyu.klass([],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initEventMod :function _trc_func_1000034_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000056;//kernel.EventMod:56
    if (_this._eventHandlers) {
      return _this;
    }
    //$LASTPOS=1000088;//kernel.EventMod:88
    _this._eventHandlers={};
    //$LASTPOS=1000111;//kernel.EventMod:111
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
  },
  fiber$initEventMod :function _trc_func_1000034_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000056;//kernel.EventMod:56
    if (_this._eventHandlers) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=1000088;//kernel.EventMod:88
    _this._eventHandlers={};
    
    _thread.enter(function _trc_func_1000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000111;//kernel.EventMod:111
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseEventMod));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseEventMod :function _trc_func_1000143_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_1;
    
    //$LASTPOS=1000168;//kernel.EventMod:168
    _it_1=Tonyu.iterator(_this._eventHandlers,2);
    while(_it_1.next()) {
      k=_it_1[0];
      v=_it_1[1];
      
      //$LASTPOS=1000210;//kernel.EventMod:210
      v.release();
      
    }
  },
  fiber$releaseEventMod :function _trc_func_1000143_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var k;
    var v;
    var _it_1;
    
    //$LASTPOS=1000168;//kernel.EventMod:168
    _it_1=Tonyu.iterator(_this._eventHandlers,2);
    while(_it_1.next()) {
      k=_it_1[0];
      v=_it_1[1];
      
      //$LASTPOS=1000210;//kernel.EventMod:210
      v.release();
      
    }
    
    _thread.retVal=_this;return;
  },
  parseArgs :function _trc_func_1000233_7(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var i;
    
    //$LASTPOS=1000253;//kernel.EventMod:253
    res = {type: a[0],args: []};
    //$LASTPOS=1000287;//kernel.EventMod:287
    //$LASTPOS=1000292;//kernel.EventMod:292
    i = 1;
    while(i<a.length) {
      {
        //$LASTPOS=1000330;//kernel.EventMod:330
        res.args.push(a[i]);
      }
      i++;
    }
    return res;
  },
  fiber$parseArgs :function _trc_func_1000233_8(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var i;
    
    //$LASTPOS=1000253;//kernel.EventMod:253
    res = {type: a[0],args: []};
    //$LASTPOS=1000287;//kernel.EventMod:287
    //$LASTPOS=1000292;//kernel.EventMod:292
    i = 1;
    while(i<a.length) {
      {
        //$LASTPOS=1000330;//kernel.EventMod:330
        res.args.push(a[i]);
      }
      i++;
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  registerEventHandler :function _trc_func_1000380_9(type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000447;//kernel.EventMod:447
    _this.initEventMod();
    //$LASTPOS=1000467;//kernel.EventMod:467
    if (typeof  type=="function") {
      //$LASTPOS=1000506;//kernel.EventMod:506
      obj=obj||new type;
      //$LASTPOS=1000533;//kernel.EventMod:533
      type=obj.getClassInfo().fullName;
      
    } else {
      //$LASTPOS=1000589;//kernel.EventMod:589
      obj=obj||new Tonyu.classes.kernel.EventHandler;
      
    }
    return _this._eventHandlers[type]=obj;
  },
  fiber$registerEventHandler :function _trc_func_1000380_10(_thread,type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000380_11(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000447;//kernel.EventMod:447
          _this.fiber$initEventMod(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000467;//kernel.EventMod:467
          if (typeof  type=="function") {
            //$LASTPOS=1000506;//kernel.EventMod:506
            obj=obj||new type;
            //$LASTPOS=1000533;//kernel.EventMod:533
            type=obj.getClassInfo().fullName;
            
          } else {
            //$LASTPOS=1000589;//kernel.EventMod:589
            obj=obj||new Tonyu.classes.kernel.EventHandler;
            
          }
          _thread.exit(_this._eventHandlers[type]=obj);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getEventHandler :function _trc_func_1000665_12(type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=1000694;//kernel.EventMod:694
    _this.initEventMod();
    //$LASTPOS=1000714;//kernel.EventMod:714
    res = _this._eventHandlers[type]||_this.registerEventHandler(type);
    return res;
  },
  fiber$getEventHandler :function _trc_func_1000665_13(_thread,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    
    _thread.enter(function _trc_func_1000665_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000694;//kernel.EventMod:694
          _this.fiber$initEventMod(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000714;//kernel.EventMod:714
          res = _this._eventHandlers[type]||_this.registerEventHandler(type);
          _thread.exit(res);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  on :function _trc_func_1000796_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var h;
    
    //$LASTPOS=1000809;//kernel.EventMod:809
    a = _this.parseArgs(arguments);
    //$LASTPOS=1000842;//kernel.EventMod:842
    h = _this.getEventHandler(a.type);
    //$LASTPOS=1000878;//kernel.EventMod:878
    h.addListener.apply(h,a.args);
  },
  fiber$on :function _trc_func_1000796_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var h;
    
    //$LASTPOS=1000809;//kernel.EventMod:809
    a = _this.parseArgs(_arguments);
    //$LASTPOS=1000842;//kernel.EventMod:842
    h = _this.getEventHandler(a.type);
    //$LASTPOS=1000878;//kernel.EventMod:878
    h.addListener.apply(h,a.args);
    
    _thread.retVal=_this;return;
  },
  fireEvent :function _trc_func_1000915_17(type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000945;//kernel.EventMod:945
    _this.getEventHandler(type).fire(args);
  },
  fiber$fireEvent :function _trc_func_1000915_18(_thread,type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000945;//kernel.EventMod:945
    _this.getEventHandler(type).fire(args);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventMod,{"fullName":"kernel.EventMod","namespace":"kernel","shortName":"EventMod","decls":{"methods":{"main":{"nowait":false},"initEventMod":{"nowait":false},"releaseEventMod":{"nowait":false},"parseArgs":{"nowait":false},"registerEventHandler":{"nowait":false},"getEventHandler":{"nowait":false},"on":{"nowait":false},"fireEvent":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextRectMod=Tonyu.klass([],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  drawTextRect :function _trc_func_2000017_2(ctx,text,x,topY,h,align,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var met;
    var res;
    var t;
    
    //$LASTPOS=2000090;//kernel.TextRectMod:90
    if (! align) {
      //$LASTPOS=2000102;//kernel.TextRectMod:102
      align="center";
    }
    //$LASTPOS=2000123;//kernel.TextRectMod:123
    ctx.textBaseline="top";
    //$LASTPOS=2000152;//kernel.TextRectMod:152
    _this.setFontSize(ctx,h);
    //$LASTPOS=2000178;//kernel.TextRectMod:178
    met = ctx.measureText(text);
    //$LASTPOS=2000214;//kernel.TextRectMod:214
    res = {y: topY,w: met.width,h: h};
    //$LASTPOS=2000256;//kernel.TextRectMod:256
    t = align.substring(0,1).toLowerCase();
    //$LASTPOS=2000303;//kernel.TextRectMod:303
    if (t=="l") {
      //$LASTPOS=2000315;//kernel.TextRectMod:315
      res.x=x;
    } else {
      //$LASTPOS=2000334;//kernel.TextRectMod:334
      if (t=="r") {
        //$LASTPOS=2000346;//kernel.TextRectMod:346
        res.x=x-met.width;
      } else {
        //$LASTPOS=2000375;//kernel.TextRectMod:375
        if (t=="c") {
          //$LASTPOS=2000387;//kernel.TextRectMod:387
          res.x=x-met.width/2;
        }
      }
    }
    //$LASTPOS=2000413;//kernel.TextRectMod:413
    if (type=="fill") {
      //$LASTPOS=2000431;//kernel.TextRectMod:431
      ctx.fillText(text,res.x,topY);
    }
    //$LASTPOS=2000468;//kernel.TextRectMod:468
    if (type=="stroke") {
      //$LASTPOS=2000488;//kernel.TextRectMod:488
      ctx.strokeText(text,res.x,topY);
    }
    return res;
  },
  setFontSize :function _trc_func_2000543_3(ctx,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var post;
    
    //$LASTPOS=2000586;//kernel.TextRectMod:586
    post = ctx.font.replace(/^[0-9\.]+/,"");
    //$LASTPOS=2000634;//kernel.TextRectMod:634
    ctx.font=sz+post;
  },
  fukidashi :function _trc_func_2000658_4(ctx,text,x,y,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var align;
    var theight;
    var margin;
    var r;
    var fs;
    
    //$LASTPOS=2000712;//kernel.TextRectMod:712
    align = "c";
    //$LASTPOS=2000732;//kernel.TextRectMod:732
    theight = 20;
    //$LASTPOS=2000753;//kernel.TextRectMod:753
    margin = 5;
    //$LASTPOS=2000772;//kernel.TextRectMod:772
    r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
    //$LASTPOS=2000842;//kernel.TextRectMod:842
    ctx.beginPath();
    //$LASTPOS=2000864;//kernel.TextRectMod:864
    ctx.moveTo(x,y);
    //$LASTPOS=2000888;//kernel.TextRectMod:888
    ctx.lineTo(x+margin,y-theight);
    //$LASTPOS=2000927;//kernel.TextRectMod:927
    ctx.lineTo(x+r.w/2+margin,y-theight);
    //$LASTPOS=2000972;//kernel.TextRectMod:972
    ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
    //$LASTPOS=2001030;//kernel.TextRectMod:1030
    ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
    //$LASTPOS=2001088;//kernel.TextRectMod:1088
    ctx.lineTo(x-r.w/2-margin,y-theight);
    //$LASTPOS=2001133;//kernel.TextRectMod:1133
    ctx.lineTo(x-margin,y-theight);
    //$LASTPOS=2001172;//kernel.TextRectMod:1172
    ctx.closePath();
    //$LASTPOS=2001194;//kernel.TextRectMod:1194
    ctx.fill();
    //$LASTPOS=2001211;//kernel.TextRectMod:1211
    ctx.stroke();
    //$LASTPOS=2001236;//kernel.TextRectMod:1236
    fs = ctx.fillStyle;
    //$LASTPOS=2001263;//kernel.TextRectMod:1263
    ctx.fillStyle=ctx.strokeStyle;
    //$LASTPOS=2001299;//kernel.TextRectMod:1299
    _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
    //$LASTPOS=2001372;//kernel.TextRectMod:1372
    ctx.fillStyle=fs;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextRectMod,{"fullName":"kernel.TextRectMod","namespace":"kernel","shortName":"TextRectMod","decls":{"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MathMod=Tonyu.klass([],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sin :function _trc_func_3000031_2(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.sin(_this.rad(d));
  },
  cos :function _trc_func_3000082_3(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.cos(_this.rad(d));
  },
  rad :function _trc_func_3000133_4(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return d/180*Math.PI;
  },
  deg :function _trc_func_3000181_5(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return d/Math.PI*180;
  },
  abs :function _trc_func_3000231_6(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.abs(v);
  },
  atan2 :function _trc_func_3000277_7(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.deg(Math.atan2(x,y));
  },
  floor :function _trc_func_3000336_8(x) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.floor(x);
  },
  angleDiff :function _trc_func_3000386_9(a,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var c;
    
    //$LASTPOS=3000416;//kernel.MathMod:416
    c;
    //$LASTPOS=3000428;//kernel.MathMod:428
    a=_this.floor(a);
    //$LASTPOS=3000445;//kernel.MathMod:445
    b=_this.floor(b);
    //$LASTPOS=3000462;//kernel.MathMod:462
    if (a>=b) {
      //$LASTPOS=3000483;//kernel.MathMod:483
      c=(a-b)%360;
      //$LASTPOS=3000507;//kernel.MathMod:507
      if (c>=180) {
        //$LASTPOS=3000519;//kernel.MathMod:519
        c-=360;
      }
      
    } else {
      //$LASTPOS=3000550;//kernel.MathMod:550
      c=- ((b-a)%360);
      //$LASTPOS=3000577;//kernel.MathMod:577
      if (c<- 180) {
        //$LASTPOS=3000589;//kernel.MathMod:589
        c+=360;
      }
      
    }
    return c;
  },
  sqrt :function _trc_func_3000623_10(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.sqrt(t);
  },
  dist :function _trc_func_3000671_11(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t;
    
    //$LASTPOS=3000698;//kernel.MathMod:698
    if (typeof  dx=="object") {
      //$LASTPOS=3000734;//kernel.MathMod:734
      t = dx;
      //$LASTPOS=3000753;//kernel.MathMod:753
      dx=t.x-_this.x;
      //$LASTPOS=3000762;//kernel.MathMod:762
      dy=t.y-_this.y;
      
    }
    return _this.sqrt(dx*dx+dy*dy);
  },
  trunc :function _trc_func_3000814_12(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000838;//kernel.MathMod:838
    if (f>=0) {
      return Math.floor(f);
    } else {
      return Math.ceil(f);
    }
  },
  ceil :function _trc_func_3000904_13(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.ceil(f);
  },
  rnd :function _trc_func_3000953_14(r) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000975;//kernel.MathMod:975
    if (typeof  r=="number") {
      return Math.floor(Math.random()*r);
      
    }
    return Math.random();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MathMod,{"fullName":"kernel.MathMod","namespace":"kernel","shortName":"MathMod","decls":{"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Mod=Tonyu.klass([],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  bvec :function _trc_func_4000015_2(tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    
    //$LASTPOS=4000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    return new b2Vec2(tx/_this.scale,ty/_this.scale);
  },
  fiber$bvec :function _trc_func_4000015_3(_thread,tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    
    //$LASTPOS=4000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MediaPlayer=Tonyu.klass([],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_5000002_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$play :function _trc_func_5000002_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_5000022_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_5000022_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  playSE :function _trc_func_5000042_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$playSE :function _trc_func_5000042_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setDelay :function _trc_func_5000064_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setDelay :function _trc_func_5000064_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setVolume :function _trc_func_5000087_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setVolume :function _trc_func_5000087_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MediaPlayer,{"fullName":"kernel.MediaPlayer","namespace":"kernel","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TObject=Tonyu.klass([],{
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_6000030_2(options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000052;//kernel.TObject:52
    if (typeof  options=="object") {
      //$LASTPOS=6000082;//kernel.TObject:82
      _this.extend(options);
    }
    //$LASTPOS=6000104;//kernel.TObject:104
    _this.main();
  },
  extend :function _trc_func_6000121_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TObject,{"fullName":"kernel.TObject","namespace":"kernel","shortName":"TObject","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TQuery=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_7000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_7000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_7000035_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7000049;//kernel.TQuery:49
    _this.length=0;
  },
  tonyuIterator :function _trc_func_7000061_3(arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=7000089;//kernel.TQuery:89
    res = {};
    //$LASTPOS=7000105;//kernel.TQuery:105
    res.i=0;
    //$LASTPOS=7000118;//kernel.TQuery:118
    if (arity==1) {
      //$LASTPOS=7000142;//kernel.TQuery:142
      res.next=function () {
        
        //$LASTPOS=7000177;//kernel.TQuery:177
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=7000227;//kernel.TQuery:227
        res[0]=_this[res.i];
        //$LASTPOS=7000259;//kernel.TQuery:259
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=7000325;//kernel.TQuery:325
      res.next=function () {
        
        //$LASTPOS=7000360;//kernel.TQuery:360
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=7000410;//kernel.TQuery:410
        res[0]=res.i;
        //$LASTPOS=7000436;//kernel.TQuery:436
        res[1]=_this[res.i];
        //$LASTPOS=7000468;//kernel.TQuery:468
        res.i++;
        return true;
      };
      
    }
    return res;
  },
  fiber$tonyuIterator :function _trc_func_7000061_4(_thread,arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=7000089;//kernel.TQuery:89
    res = {};
    //$LASTPOS=7000105;//kernel.TQuery:105
    res.i=0;
    //$LASTPOS=7000118;//kernel.TQuery:118
    if (arity==1) {
      //$LASTPOS=7000142;//kernel.TQuery:142
      res.next=function () {
        
        //$LASTPOS=7000177;//kernel.TQuery:177
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=7000227;//kernel.TQuery:227
        res[0]=_this[res.i];
        //$LASTPOS=7000259;//kernel.TQuery:259
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=7000325;//kernel.TQuery:325
      res.next=function () {
        
        //$LASTPOS=7000360;//kernel.TQuery:360
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=7000410;//kernel.TQuery:410
        res[0]=res.i;
        //$LASTPOS=7000436;//kernel.TQuery:436
        res[1]=_this[res.i];
        //$LASTPOS=7000468;//kernel.TQuery:468
        res.i++;
        return true;
      };
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  attr :function _trc_func_7000537_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var values;
    var i;
    var e;
    var _it_23;
    
    //$LASTPOS=7000551;//kernel.TQuery:551
    values;
    //$LASTPOS=7000567;//kernel.TQuery:567
    if (_this.length==0) {
      return _this;
    }
    //$LASTPOS=7000594;//kernel.TQuery:594
    if (arguments.length==1&&typeof  arguments[0]=="string") {
      return _this[0][arguments[0]];
      
    }
    //$LASTPOS=7000702;//kernel.TQuery:702
    if (arguments.length>=2) {
      //$LASTPOS=7000737;//kernel.TQuery:737
      values={};
      //$LASTPOS=7000756;//kernel.TQuery:756
      //$LASTPOS=7000761;//kernel.TQuery:761
      i = 0;
      while(i<arguments.length-1) {
        {
          //$LASTPOS=7000813;//kernel.TQuery:813
          values[arguments[i]]=arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=7000881;//kernel.TQuery:881
      values=arguments[0];
      
    }
    //$LASTPOS=7000912;//kernel.TQuery:912
    if (values) {
      //$LASTPOS=7000934;//kernel.TQuery:934
      _it_23=Tonyu.iterator(_this,1);
      while(_it_23.next()) {
        e=_it_23[0];
        
        //$LASTPOS=7000968;//kernel.TQuery:968
        e.extend(values);
        
      }
      
    }
  },
  fiber$attr :function _trc_func_7000537_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var values;
    var i;
    var e;
    var _it_23;
    
    //$LASTPOS=7000551;//kernel.TQuery:551
    values;
    //$LASTPOS=7000567;//kernel.TQuery:567
    if (_this.length==0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=7000594;//kernel.TQuery:594
    if (_arguments.length==1&&typeof  _arguments[0]=="string") {
      _thread.retVal=_this[0][_arguments[0]];return;
      
      
    }
    //$LASTPOS=7000702;//kernel.TQuery:702
    if (_arguments.length>=2) {
      //$LASTPOS=7000737;//kernel.TQuery:737
      values={};
      //$LASTPOS=7000756;//kernel.TQuery:756
      //$LASTPOS=7000761;//kernel.TQuery:761
      i = 0;
      while(i<_arguments.length-1) {
        {
          //$LASTPOS=7000813;//kernel.TQuery:813
          values[_arguments[i]]=_arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=7000881;//kernel.TQuery:881
      values=_arguments[0];
      
    }
    //$LASTPOS=7000912;//kernel.TQuery:912
    if (values) {
      //$LASTPOS=7000934;//kernel.TQuery:934
      _it_23=Tonyu.iterator(_this,1);
      while(_it_23.next()) {
        e=_it_23[0];
        
        //$LASTPOS=7000968;//kernel.TQuery:968
        e.extend(values);
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  genKeyfunc :function _trc_func_7001005_7(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7001028;//kernel.TQuery:1028
    if (typeof  key!="function") {
      return function (o) {
        
        return o[key];
      };
      
    } else {
      return key;
      
    }
  },
  fiber$genKeyfunc :function _trc_func_7001005_8(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7001028;//kernel.TQuery:1028
    if (typeof  key!="function") {
      _thread.retVal=function (o) {
        
        return o[key];
      };return;
      
      
    } else {
      _thread.retVal=key;return;
      
      
    }
    
    _thread.retVal=_this;return;
  },
  maxs :function _trc_func_7001137_9(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_29;
    var v;
    
    //$LASTPOS=7001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001210;//kernel.TQuery:1210
    _it_29=Tonyu.iterator(_this,1);
    while(_it_29.next()) {
      o=_it_29[0];
      
      //$LASTPOS=7001240;//kernel.TQuery:1240
      v = f(o);
      //$LASTPOS=7001260;//kernel.TQuery:1260
      if (res==null||v>=res) {
        //$LASTPOS=7001299;//kernel.TQuery:1299
        if (v>res) {
          //$LASTPOS=7001310;//kernel.TQuery:1310
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=7001339;//kernel.TQuery:1339
        reso.push(o);
        //$LASTPOS=7001365;//kernel.TQuery:1365
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$maxs :function _trc_func_7001137_10(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_29;
    var v;
    
    //$LASTPOS=7001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001210;//kernel.TQuery:1210
    _it_29=Tonyu.iterator(_this,1);
    while(_it_29.next()) {
      o=_it_29[0];
      
      //$LASTPOS=7001240;//kernel.TQuery:1240
      v = f(o);
      //$LASTPOS=7001260;//kernel.TQuery:1260
      if (res==null||v>=res) {
        //$LASTPOS=7001299;//kernel.TQuery:1299
        if (v>res) {
          //$LASTPOS=7001310;//kernel.TQuery:1310
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=7001339;//kernel.TQuery:1339
        reso.push(o);
        //$LASTPOS=7001365;//kernel.TQuery:1365
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  mins :function _trc_func_7001407_11(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_36;
    var v;
    
    //$LASTPOS=7001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001480;//kernel.TQuery:1480
    _it_36=Tonyu.iterator(_this,1);
    while(_it_36.next()) {
      o=_it_36[0];
      
      //$LASTPOS=7001510;//kernel.TQuery:1510
      v = f(o);
      //$LASTPOS=7001530;//kernel.TQuery:1530
      if (res==null||v<=res) {
        //$LASTPOS=7001569;//kernel.TQuery:1569
        if (v<res) {
          //$LASTPOS=7001580;//kernel.TQuery:1580
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=7001609;//kernel.TQuery:1609
        reso.push(o);
        //$LASTPOS=7001635;//kernel.TQuery:1635
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$mins :function _trc_func_7001407_12(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_36;
    var v;
    
    //$LASTPOS=7001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001480;//kernel.TQuery:1480
    _it_36=Tonyu.iterator(_this,1);
    while(_it_36.next()) {
      o=_it_36[0];
      
      //$LASTPOS=7001510;//kernel.TQuery:1510
      v = f(o);
      //$LASTPOS=7001530;//kernel.TQuery:1530
      if (res==null||v<=res) {
        //$LASTPOS=7001569;//kernel.TQuery:1569
        if (v<res) {
          //$LASTPOS=7001580;//kernel.TQuery:1580
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=7001609;//kernel.TQuery:1609
        reso.push(o);
        //$LASTPOS=7001635;//kernel.TQuery:1635
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  minObj :function _trc_func_7001677_13(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mins(key)[0];
  },
  fiber$minObj :function _trc_func_7001677_14(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mins(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  maxObj :function _trc_func_7001719_15(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.maxs(key)[0];
  },
  fiber$maxObj :function _trc_func_7001719_16(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.maxs(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  nearests :function _trc_func_7001761_17(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7001782;//kernel.TQuery:1782
    if (typeof  x=="object") {
      //$LASTPOS=7001807;//kernel.TQuery:1807
      y=x.y;
      //$LASTPOS=7001813;//kernel.TQuery:1813
      x=x.x;
      
    }
    return _this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });
  },
  fiber$nearests :function _trc_func_7001761_18(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7001782;//kernel.TQuery:1782
    if (typeof  x=="object") {
      //$LASTPOS=7001807;//kernel.TQuery:1807
      y=x.y;
      //$LASTPOS=7001813;//kernel.TQuery:1813
      x=x.x;
      
    }
    _thread.retVal=_this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });return;
    
    
    _thread.retVal=_this;return;
  },
  nearest :function _trc_func_7001887_19(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.nearests(x,y)[0];
  },
  fiber$nearest :function _trc_func_7001887_20(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.nearests(x,y)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  withins :function _trc_func_7001934_21(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var x;
    var y;
    
    //$LASTPOS=7001958;//kernel.TQuery:1958
    x;y;
    //$LASTPOS=7001971;//kernel.TQuery:1971
    if (typeof  xo=="object") {
      //$LASTPOS=7002006;//kernel.TQuery:2006
      x=xo.x;
      //$LASTPOS=7002013;//kernel.TQuery:2013
      y=xo.y;
      //$LASTPOS=7002020;//kernel.TQuery:2020
      d=yd;
      
    } else {
      //$LASTPOS=7002047;//kernel.TQuery:2047
      x=xo;
      //$LASTPOS=7002052;//kernel.TQuery:2052
      y=yd;
      
    }
    return _this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });
  },
  fiber$withins :function _trc_func_7001934_22(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var x;
    var y;
    
    //$LASTPOS=7001958;//kernel.TQuery:1958
    x;y;
    //$LASTPOS=7001971;//kernel.TQuery:1971
    if (typeof  xo=="object") {
      //$LASTPOS=7002006;//kernel.TQuery:2006
      x=xo.x;
      //$LASTPOS=7002013;//kernel.TQuery:2013
      y=xo.y;
      //$LASTPOS=7002020;//kernel.TQuery:2020
      d=yd;
      
    } else {
      //$LASTPOS=7002047;//kernel.TQuery:2047
      x=xo;
      //$LASTPOS=7002052;//kernel.TQuery:2052
      y=yd;
      
    }
    _thread.retVal=_this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });return;
    
    
    _thread.retVal=_this;return;
  },
  within :function _trc_func_7002133_23(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.withins(xo,yd,d).nearest();
  },
  fiber$within :function _trc_func_7002133_24(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.withins(xo,yd,d).nearest();return;
    
    
    _thread.retVal=_this;return;
  },
  max :function _trc_func_7002194_25(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_47;
    var v;
    
    //$LASTPOS=7002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=7002250;//kernel.TQuery:2250
    _it_47=Tonyu.iterator(_this,1);
    while(_it_47.next()) {
      o=_it_47[0];
      
      //$LASTPOS=7002280;//kernel.TQuery:2280
      v = f(o);
      //$LASTPOS=7002300;//kernel.TQuery:2300
      if (res==null||v>res) {
        //$LASTPOS=7002324;//kernel.TQuery:2324
        res=v;
      }
      
    }
    return res;
  },
  fiber$max :function _trc_func_7002194_26(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_47;
    var v;
    
    //$LASTPOS=7002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=7002250;//kernel.TQuery:2250
    _it_47=Tonyu.iterator(_this,1);
    while(_it_47.next()) {
      o=_it_47[0];
      
      //$LASTPOS=7002280;//kernel.TQuery:2280
      v = f(o);
      //$LASTPOS=7002300;//kernel.TQuery:2300
      if (res==null||v>res) {
        //$LASTPOS=7002324;//kernel.TQuery:2324
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  min :function _trc_func_7002355_27(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_53;
    var v;
    
    //$LASTPOS=7002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=7002411;//kernel.TQuery:2411
    _it_53=Tonyu.iterator(_this,1);
    while(_it_53.next()) {
      o=_it_53[0];
      
      //$LASTPOS=7002441;//kernel.TQuery:2441
      v = f(o);
      //$LASTPOS=7002461;//kernel.TQuery:2461
      if (res==null||v<res) {
        //$LASTPOS=7002485;//kernel.TQuery:2485
        res=v;
      }
      
    }
    return res;
  },
  fiber$min :function _trc_func_7002355_28(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_53;
    var v;
    
    //$LASTPOS=7002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=7002411;//kernel.TQuery:2411
    _it_53=Tonyu.iterator(_this,1);
    while(_it_53.next()) {
      o=_it_53[0];
      
      //$LASTPOS=7002441;//kernel.TQuery:2441
      v = f(o);
      //$LASTPOS=7002461;//kernel.TQuery:2461
      if (res==null||v<res) {
        //$LASTPOS=7002485;//kernel.TQuery:2485
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  push :function _trc_func_7002516_29(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=7002551;//kernel.TQuery:2551
    _this.length++;
  },
  fiber$push :function _trc_func_7002516_30(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=7002551;//kernel.TQuery:2551
    _this.length++;
    
    _thread.retVal=_this;return;
  },
  size :function _trc_func_7002563_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.length;
  },
  fiber$size :function _trc_func_7002563_32(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.length;return;
    
    
    _thread.retVal=_this;return;
  },
  find :function _trc_func_7002588_33(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var no;
    var o;
    var _it_59;
    
    //$LASTPOS=7002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7002626;//kernel.TQuery:2626
    _it_59=Tonyu.iterator(_this,1);
    while(_it_59.next()) {
      o=_it_59[0];
      
      //$LASTPOS=7002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=7002666;//kernel.TQuery:2666
        no.push(o);
      }
      
    }
    return no;
  },
  fiber$find :function _trc_func_7002588_34(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var no;
    var o;
    var _it_59;
    
    //$LASTPOS=7002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7002626;//kernel.TQuery:2626
    _it_59=Tonyu.iterator(_this,1);
    while(_it_59.next()) {
      o=_it_59[0];
      
      //$LASTPOS=7002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=7002666;//kernel.TQuery:2666
        no.push(o);
      }
      
    }
    _thread.retVal=no;return;
    
    
    _thread.retVal=_this;return;
  },
  apply :function _trc_func_7002702_35(name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var o;
    var _it_63;
    var f;
    
    //$LASTPOS=7002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=7002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=7002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=7002764;//kernel.TQuery:2764
    _it_63=Tonyu.iterator(_this,1);
    while(_it_63.next()) {
      o=_it_63[0];
      
      //$LASTPOS=7002794;//kernel.TQuery:2794
      f = o[name];
      //$LASTPOS=7002817;//kernel.TQuery:2817
      if (typeof  f=="function") {
        //$LASTPOS=7002857;//kernel.TQuery:2857
        res=f.apply(o,args);
        
      }
      
    }
    return res;
  },
  fiber$apply :function _trc_func_7002702_36(_thread,name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var o;
    var _it_63;
    var f;
    
    //$LASTPOS=7002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=7002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=7002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=7002764;//kernel.TQuery:2764
    _it_63=Tonyu.iterator(_this,1);
    while(_it_63.next()) {
      o=_it_63[0];
      
      //$LASTPOS=7002794;//kernel.TQuery:2794
      f = o[name];
      //$LASTPOS=7002817;//kernel.TQuery:2817
      if (typeof  f=="function") {
        //$LASTPOS=7002857;//kernel.TQuery:2857
        res=f.apply(o,args);
        
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  alive :function _trc_func_7002968_37() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return ! o.isDead();
    });
  },
  fiber$alive :function _trc_func_7002968_38(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return ! o.isDead();
    });return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_7003039_39() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    
    //$LASTPOS=7003052;//kernel.TQuery:3052
    a = _this.alive();
    //$LASTPOS=7003071;//kernel.TQuery:3071
    if (a.length==0) {
      return false;
    }
    //$LASTPOS=7003106;//kernel.TQuery:3106
    a.apply("die");
    return true;
  },
  fiber$die :function _trc_func_7003039_40(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    
    //$LASTPOS=7003052;//kernel.TQuery:3052
    a = _this.alive();
    //$LASTPOS=7003071;//kernel.TQuery:3071
    if (a.length==0) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=7003106;//kernel.TQuery:3106
    a.apply("die");
    _thread.retVal=true;return;
    
    
    _thread.retVal=_this;return;
  },
  klass :function _trc_func_7003142_41(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return o instanceof k;
    });
  },
  fiber$klass :function _trc_func_7003142_42(_thread,k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return o instanceof k;
    });return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TQuery,{"fullName":"kernel.TQuery","namespace":"kernel","shortName":"TQuery","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.InputDevice=Tonyu.klass([],{
  main :function _trc_func_8000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_8000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_8000057_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000071;//kernel.InputDevice:71
    _this.listeners=[];
    //$LASTPOS=8000090;//kernel.InputDevice:90
    _this.touchEmu=true;
  },
  handleListeners :function _trc_func_8000109_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var l;
    
    //$LASTPOS=8000135;//kernel.InputDevice:135
    l = _this.listeners;
    //$LASTPOS=8000157;//kernel.InputDevice:157
    _this.listeners=[];
    //$LASTPOS=8000176;//kernel.InputDevice:176
    while (l.length>0) {
      //$LASTPOS=8000197;//kernel.InputDevice:197
      (l.shift())();
      
    }
  },
  fiber$handleListeners :function _trc_func_8000109_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var l;
    
    //$LASTPOS=8000135;//kernel.InputDevice:135
    l = _this.listeners;
    //$LASTPOS=8000157;//kernel.InputDevice:157
    _this.listeners=[];
    //$LASTPOS=8000176;//kernel.InputDevice:176
    while (l.length>0) {
      //$LASTPOS=8000197;//kernel.InputDevice:197
      (l.shift())();
      
    }
    
    _thread.retVal=_this;return;
  },
  addOnetimeListener :function _trc_func_8000218_5(l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000247;//kernel.InputDevice:247
    _this.listeners.push(l);
  },
  fiber$addOnetimeListener :function _trc_func_8000218_6(_thread,l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8000247;//kernel.InputDevice:247
    _this.listeners.push(l);
    
    _thread.retVal=_this;return;
  },
  initCanvasEvents :function _trc_func_8000270_7(cvj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var cv;
    var handleMouse;
    var handleTouch;
    var handleTouchEnd;
    var d;
    
    //$LASTPOS=8000300;//kernel.InputDevice:300
    cv = cvj[0];
    //$LASTPOS=8000320;//kernel.InputDevice:320
    Tonyu.globals.$handleMouse=function (e) {
      var p;
      var mp;
      
      //$LASTPOS=8000349;//kernel.InputDevice:349
      p = cvj.offset();
      //$LASTPOS=8000378;//kernel.InputDevice:378
      mp = {x: e.clientX-p.left,y: e.clientY-p.top};
      //$LASTPOS=8000435;//kernel.InputDevice:435
      mp=Tonyu.globals.$Screen.canvas2buf(mp);
      //$LASTPOS=8000471;//kernel.InputDevice:471
      Tonyu.globals.$mouseX=mp.x;
      //$LASTPOS=8000494;//kernel.InputDevice:494
      Tonyu.globals.$mouseY=mp.y;
      //$LASTPOS=8000517;//kernel.InputDevice:517
      if (_this.touchEmu) {
        //$LASTPOS=8000546;//kernel.InputDevice:546
        Tonyu.globals.$touches[0].x=mp.x;
        //$LASTPOS=8000579;//kernel.InputDevice:579
        Tonyu.globals.$touches[0].y=mp.y;
        
      }
      //$LASTPOS=8000619;//kernel.InputDevice:619
      _this.handleListeners();
    };
    //$LASTPOS=8000651;//kernel.InputDevice:651
    Tonyu.globals.$touches=[{},{},{},{},{}];
    //$LASTPOS=8000683;//kernel.InputDevice:683
    Tonyu.globals.$touches.findById=function (id) {
      var j;
      
      //$LASTPOS=8000718;//kernel.InputDevice:718
      //$LASTPOS=8000723;//kernel.InputDevice:723
      j = 0;
      while(j<Tonyu.globals.$touches.length) {
        {
          //$LASTPOS=8000773;//kernel.InputDevice:773
          if (Tonyu.globals.$touches[j].identifier==id) {
            return Tonyu.globals.$touches[j];
            
          }
        }
        j++;
      }
    };
    //$LASTPOS=8000883;//kernel.InputDevice:883
    Tonyu.globals.$handleTouch=function (e) {
      var p;
      var ts;
      var i;
      var src;
      var dst;
      var j;
      
      //$LASTPOS=8000912;//kernel.InputDevice:912
      _this.touchEmu=false;
      //$LASTPOS=8000937;//kernel.InputDevice:937
      p = cvj.offset();
      //$LASTPOS=8000966;//kernel.InputDevice:966
      e.preventDefault();
      //$LASTPOS=8000995;//kernel.InputDevice:995
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=8001043;//kernel.InputDevice:1043
      //$LASTPOS=8001048;//kernel.InputDevice:1048
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=8001093;//kernel.InputDevice:1093
          src = ts[i];
          //$LASTPOS=8001121;//kernel.InputDevice:1121
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=8001177;//kernel.InputDevice:1177
          if (! dst) {
            //$LASTPOS=8001206;//kernel.InputDevice:1206
            //$LASTPOS=8001211;//kernel.InputDevice:1211
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=8001269;//kernel.InputDevice:1269
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=8001322;//kernel.InputDevice:1322
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=8001364;//kernel.InputDevice:1364
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
              j++;
            }
            
          }
          //$LASTPOS=8001497;//kernel.InputDevice:1497
          if (dst) {
            //$LASTPOS=8001525;//kernel.InputDevice:1525
            _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
            //$LASTPOS=8001586;//kernel.InputDevice:1586
            _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
            //$LASTPOS=8001630;//kernel.InputDevice:1630
            dst.x=_this.mp.x;
            //$LASTPOS=8001659;//kernel.InputDevice:1659
            dst.y=_this.mp.y;
            //$LASTPOS=8001688;//kernel.InputDevice:1688
            if (! dst.touched) {
              //$LASTPOS=8001705;//kernel.InputDevice:1705
              dst.touched=1;
            }
            
          }
        }
        i++;
      }
      //$LASTPOS=8001755;//kernel.InputDevice:1755
      Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
      //$LASTPOS=8001787;//kernel.InputDevice:1787
      Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
      //$LASTPOS=8001819;//kernel.InputDevice:1819
      _this.handleListeners();
    };
    //$LASTPOS=8001851;//kernel.InputDevice:1851
    Tonyu.globals.$handleTouchEnd=function (e) {
      var ts;
      var i;
      var src;
      var dst;
      
      //$LASTPOS=8001883;//kernel.InputDevice:1883
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=8001931;//kernel.InputDevice:1931
      //$LASTPOS=8001936;//kernel.InputDevice:1936
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=8001981;//kernel.InputDevice:1981
          src = ts[i];
          //$LASTPOS=8002009;//kernel.InputDevice:2009
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=8002065;//kernel.InputDevice:2065
          if (dst) {
            //$LASTPOS=8002093;//kernel.InputDevice:2093
            dst.touched=0;
            //$LASTPOS=8002125;//kernel.InputDevice:2125
            dst.identifier=- 1;
            
          }
        }
        i++;
      }
      //$LASTPOS=8002179;//kernel.InputDevice:2179
      _this.handleListeners();
    };
    //$LASTPOS=8002211;//kernel.InputDevice:2211
    handleMouse = function (e) {
      
      //$LASTPOS=8002232;//kernel.InputDevice:2232
      Tonyu.globals.$handleMouse(e);
    };
    //$LASTPOS=8002256;//kernel.InputDevice:2256
    handleTouch = function (e) {
      
      //$LASTPOS=8002277;//kernel.InputDevice:2277
      Tonyu.globals.$handleTouch(e);
    };
    //$LASTPOS=8002301;//kernel.InputDevice:2301
    handleTouchEnd = function (e) {
      
      //$LASTPOS=8002325;//kernel.InputDevice:2325
      Tonyu.globals.$handleTouchEnd(e);
    };
    //$LASTPOS=8002352;//kernel.InputDevice:2352
    d = $.data(cv,"events");
    //$LASTPOS=8002384;//kernel.InputDevice:2384
    if (! d) {
      //$LASTPOS=8002403;//kernel.InputDevice:2403
      $.data(cv,"events","true");
      //$LASTPOS=8002440;//kernel.InputDevice:2440
      cvj.mousedown(handleMouse);
      //$LASTPOS=8002477;//kernel.InputDevice:2477
      cvj.mousemove(handleMouse);
      //$LASTPOS=8002514;//kernel.InputDevice:2514
      cvj.on("touchstart",handleTouch);
      //$LASTPOS=8002557;//kernel.InputDevice:2557
      cvj.on("touchmove",handleTouch);
      //$LASTPOS=8002599;//kernel.InputDevice:2599
      cvj.on("touchend",handleTouchEnd);
      
    }
  },
  fiber$initCanvasEvents :function _trc_func_8000270_8(_thread,cvj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var cv;
    var handleMouse;
    var handleTouch;
    var handleTouchEnd;
    var d;
    
    //$LASTPOS=8000300;//kernel.InputDevice:300
    cv = cvj[0];
    
    _thread.enter(function _trc_func_8000270_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=8000320;//kernel.InputDevice:320
          Tonyu.globals.$handleMouse=function (e) {
            var p;
            var mp;
            
            //$LASTPOS=8000349;//kernel.InputDevice:349
            p = cvj.offset();
            //$LASTPOS=8000378;//kernel.InputDevice:378
            mp = {x: e.clientX-p.left,y: e.clientY-p.top};
            //$LASTPOS=8000435;//kernel.InputDevice:435
            mp=Tonyu.globals.$Screen.canvas2buf(mp);
            //$LASTPOS=8000471;//kernel.InputDevice:471
            Tonyu.globals.$mouseX=mp.x;
            //$LASTPOS=8000494;//kernel.InputDevice:494
            Tonyu.globals.$mouseY=mp.y;
            //$LASTPOS=8000517;//kernel.InputDevice:517
            if (_this.touchEmu) {
              //$LASTPOS=8000546;//kernel.InputDevice:546
              Tonyu.globals.$touches[0].x=mp.x;
              //$LASTPOS=8000579;//kernel.InputDevice:579
              Tonyu.globals.$touches[0].y=mp.y;
              
            }
            //$LASTPOS=8000619;//kernel.InputDevice:619
            _this.handleListeners();
          };
          //$LASTPOS=8000651;//kernel.InputDevice:651
          Tonyu.globals.$touches=[{},{},{},{},{}];
          //$LASTPOS=8000683;//kernel.InputDevice:683
          Tonyu.globals.$touches.findById=function (id) {
            var j;
            
            //$LASTPOS=8000718;//kernel.InputDevice:718
            //$LASTPOS=8000723;//kernel.InputDevice:723
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=8000773;//kernel.InputDevice:773
                if (Tonyu.globals.$touches[j].identifier==id) {
                  return Tonyu.globals.$touches[j];
                  
                }
              }
              j++;
            }
          };
          //$LASTPOS=8000883;//kernel.InputDevice:883
          Tonyu.globals.$handleTouch=function (e) {
            var p;
            var ts;
            var i;
            var src;
            var dst;
            var j;
            
            //$LASTPOS=8000912;//kernel.InputDevice:912
            _this.touchEmu=false;
            //$LASTPOS=8000937;//kernel.InputDevice:937
            p = cvj.offset();
            //$LASTPOS=8000966;//kernel.InputDevice:966
            e.preventDefault();
            //$LASTPOS=8000995;//kernel.InputDevice:995
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=8001043;//kernel.InputDevice:1043
            //$LASTPOS=8001048;//kernel.InputDevice:1048
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=8001093;//kernel.InputDevice:1093
                src = ts[i];
                //$LASTPOS=8001121;//kernel.InputDevice:1121
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=8001177;//kernel.InputDevice:1177
                if (! dst) {
                  //$LASTPOS=8001206;//kernel.InputDevice:1206
                  //$LASTPOS=8001211;//kernel.InputDevice:1211
                  j = 0;
                  while(j<Tonyu.globals.$touches.length) {
                    {
                      //$LASTPOS=8001269;//kernel.InputDevice:1269
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=8001322;//kernel.InputDevice:1322
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=8001364;//kernel.InputDevice:1364
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                    j++;
                  }
                  
                }
                //$LASTPOS=8001497;//kernel.InputDevice:1497
                if (dst) {
                  //$LASTPOS=8001525;//kernel.InputDevice:1525
                  _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                  //$LASTPOS=8001586;//kernel.InputDevice:1586
                  _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                  //$LASTPOS=8001630;//kernel.InputDevice:1630
                  dst.x=_this.mp.x;
                  //$LASTPOS=8001659;//kernel.InputDevice:1659
                  dst.y=_this.mp.y;
                  //$LASTPOS=8001688;//kernel.InputDevice:1688
                  if (! dst.touched) {
                    //$LASTPOS=8001705;//kernel.InputDevice:1705
                    dst.touched=1;
                  }
                  
                }
              }
              i++;
            }
            //$LASTPOS=8001755;//kernel.InputDevice:1755
            Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
            //$LASTPOS=8001787;//kernel.InputDevice:1787
            Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
            //$LASTPOS=8001819;//kernel.InputDevice:1819
            _this.handleListeners();
          };
          //$LASTPOS=8001851;//kernel.InputDevice:1851
          Tonyu.globals.$handleTouchEnd=function (e) {
            var ts;
            var i;
            var src;
            var dst;
            
            //$LASTPOS=8001883;//kernel.InputDevice:1883
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=8001931;//kernel.InputDevice:1931
            //$LASTPOS=8001936;//kernel.InputDevice:1936
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=8001981;//kernel.InputDevice:1981
                src = ts[i];
                //$LASTPOS=8002009;//kernel.InputDevice:2009
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=8002065;//kernel.InputDevice:2065
                if (dst) {
                  //$LASTPOS=8002093;//kernel.InputDevice:2093
                  dst.touched=0;
                  //$LASTPOS=8002125;//kernel.InputDevice:2125
                  dst.identifier=- 1;
                  
                }
              }
              i++;
            }
            //$LASTPOS=8002179;//kernel.InputDevice:2179
            _this.handleListeners();
          };
          //$LASTPOS=8002211;//kernel.InputDevice:2211
          handleMouse = function (e) {
            
            //$LASTPOS=8002232;//kernel.InputDevice:2232
            Tonyu.globals.$handleMouse(e);
          };
          //$LASTPOS=8002256;//kernel.InputDevice:2256
          handleTouch = function (e) {
            
            //$LASTPOS=8002277;//kernel.InputDevice:2277
            Tonyu.globals.$handleTouch(e);
          };
          //$LASTPOS=8002301;//kernel.InputDevice:2301
          handleTouchEnd = function (e) {
            
            //$LASTPOS=8002325;//kernel.InputDevice:2325
            Tonyu.globals.$handleTouchEnd(e);
          };
          //$LASTPOS=8002352;//kernel.InputDevice:2352
          d = $.data(cv,"events");
          //$LASTPOS=8002384;//kernel.InputDevice:2384
          if (! d) {
            //$LASTPOS=8002403;//kernel.InputDevice:2403
            $.data(cv,"events","true");
            //$LASTPOS=8002440;//kernel.InputDevice:2440
            cvj.mousedown(handleMouse);
            //$LASTPOS=8002477;//kernel.InputDevice:2477
            cvj.mousemove(handleMouse);
            //$LASTPOS=8002514;//kernel.InputDevice:2514
            cvj.on("touchstart",handleTouch);
            //$LASTPOS=8002557;//kernel.InputDevice:2557
            cvj.on("touchmove",handleTouch);
            //$LASTPOS=8002599;//kernel.InputDevice:2599
            cvj.on("touchend",handleTouchEnd);
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  update :function _trc_func_8002647_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_97;
    
    //$LASTPOS=8002664;//kernel.InputDevice:2664
    _it_97=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_97.next()) {
      i=_it_97[0];
      
      //$LASTPOS=8002699;//kernel.InputDevice:2699
      if (i.touched>0) {
        //$LASTPOS=8002717;//kernel.InputDevice:2717
        i.touched++;
        
      }
      //$LASTPOS=8002740;//kernel.InputDevice:2740
      if (i.touched==- 1) {
        //$LASTPOS=8002759;//kernel.InputDevice:2759
        i.touched=1;
      }
      
    }
  },
  fiber$update :function _trc_func_8002647_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_97;
    
    //$LASTPOS=8002664;//kernel.InputDevice:2664
    _it_97=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_97.next()) {
      i=_it_97[0];
      
      //$LASTPOS=8002699;//kernel.InputDevice:2699
      if (i.touched>0) {
        //$LASTPOS=8002717;//kernel.InputDevice:2717
        i.touched++;
        
      }
      //$LASTPOS=8002740;//kernel.InputDevice:2740
      if (i.touched==- 1) {
        //$LASTPOS=8002759;//kernel.InputDevice:2759
        i.touched=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.InputDevice,{"fullName":"kernel.InputDevice","namespace":"kernel","shortName":"InputDevice","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Keys=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_9000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=9000084;//kernel.Keys:84
    _this.stats={};
    //$LASTPOS=9000094;//kernel.Keys:94
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=9000212;//kernel.Keys:212
    //$LASTPOS=9000217;//kernel.Keys:217
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=9000248;//kernel.Keys:248
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=9000297;//kernel.Keys:297
    //$LASTPOS=9000302;//kernel.Keys:302
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=9000330;//kernel.Keys:330
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=9000365;//kernel.Keys:365
    if (! $.data(document,"key_event")) {
      //$LASTPOS=9000406;//kernel.Keys:406
      $.data(document,"key_event",true);
      //$LASTPOS=9000445;//kernel.Keys:445
      $(document).keydown(function (e) {
        
        //$LASTPOS=9000471;//kernel.Keys:471
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=9000495;//kernel.Keys:495
      $(document).keyup(function (e) {
        
        //$LASTPOS=9000519;//kernel.Keys:519
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=9000541;//kernel.Keys:541
      $(document).mousedown(function (e) {
        
        //$LASTPOS=9000578;//kernel.Keys:578
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000619;//kernel.Keys:619
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=9000660;//kernel.Keys:660
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=9000697;//kernel.Keys:697
      $(document).mouseup(function (e) {
        
        //$LASTPOS=9000732;//kernel.Keys:732
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000773;//kernel.Keys:773
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=9000814;//kernel.Keys:814
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
  },
  fiber$main :function _trc_func_9000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=9000084;//kernel.Keys:84
    _this.stats={};
    //$LASTPOS=9000094;//kernel.Keys:94
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=9000212;//kernel.Keys:212
    //$LASTPOS=9000217;//kernel.Keys:217
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=9000248;//kernel.Keys:248
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=9000297;//kernel.Keys:297
    //$LASTPOS=9000302;//kernel.Keys:302
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=9000330;//kernel.Keys:330
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=9000365;//kernel.Keys:365
    if (! $.data(document,"key_event")) {
      //$LASTPOS=9000406;//kernel.Keys:406
      $.data(document,"key_event",true);
      //$LASTPOS=9000445;//kernel.Keys:445
      $(document).keydown(function (e) {
        
        //$LASTPOS=9000471;//kernel.Keys:471
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=9000495;//kernel.Keys:495
      $(document).keyup(function (e) {
        
        //$LASTPOS=9000519;//kernel.Keys:519
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=9000541;//kernel.Keys:541
      $(document).mousedown(function (e) {
        
        //$LASTPOS=9000578;//kernel.Keys:578
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000619;//kernel.Keys:619
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=9000660;//kernel.Keys:660
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=9000697;//kernel.Keys:697
      $(document).mouseup(function (e) {
        
        //$LASTPOS=9000732;//kernel.Keys:732
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000773;//kernel.Keys:773
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=9000814;//kernel.Keys:814
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
    
    _thread.retVal=_this;return;
  },
  getkey :function _trc_func_9000847_2(code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9000875;//kernel.Keys:875
    if (typeof  code=="string") {
      //$LASTPOS=9000912;//kernel.Keys:912
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=9000954;//kernel.Keys:954
    if (! code) {
      return 0;
    }
    //$LASTPOS=9000979;//kernel.Keys:979
    if (_this.stats[code]==- 1) {
      return 0;
    }
    //$LASTPOS=9001014;//kernel.Keys:1014
    if (! _this.stats[code]) {
      //$LASTPOS=9001032;//kernel.Keys:1032
      _this.stats[code]=0;
    }
    return _this.stats[code];
  },
  fiber$getkey :function _trc_func_9000847_3(_thread,code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9000875;//kernel.Keys:875
    if (typeof  code=="string") {
      //$LASTPOS=9000912;//kernel.Keys:912
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=9000954;//kernel.Keys:954
    if (! code) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=9000979;//kernel.Keys:979
    if (_this.stats[code]==- 1) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=9001014;//kernel.Keys:1014
    if (! _this.stats[code]) {
      //$LASTPOS=9001032;//kernel.Keys:1032
      _this.stats[code]=0;
    }
    _thread.retVal=_this.stats[code];return;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_9001073_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_105;
    
    //$LASTPOS=9001097;//kernel.Keys:1097
    _it_105=Tonyu.iterator(_this.stats,1);
    while(_it_105.next()) {
      i=_it_105[0];
      
      //$LASTPOS=9001128;//kernel.Keys:1128
      if (_this.stats[i]>0) {
        //$LASTPOS=9001145;//kernel.Keys:1145
        _this.stats[i]++;
        
      }
      //$LASTPOS=9001166;//kernel.Keys:1166
      if (_this.stats[i]==- 1) {
        //$LASTPOS=9001184;//kernel.Keys:1184
        _this.stats[i]=1;
      }
      
    }
  },
  fiber$update :function _trc_func_9001073_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_105;
    
    //$LASTPOS=9001097;//kernel.Keys:1097
    _it_105=Tonyu.iterator(_this.stats,1);
    while(_it_105.next()) {
      i=_it_105[0];
      
      //$LASTPOS=9001128;//kernel.Keys:1128
      if (_this.stats[i]>0) {
        //$LASTPOS=9001145;//kernel.Keys:1145
        _this.stats[i]++;
        
      }
      //$LASTPOS=9001166;//kernel.Keys:1166
      if (_this.stats[i]==- 1) {
        //$LASTPOS=9001184;//kernel.Keys:1184
        _this.stats[i]=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  keydown :function _trc_func_9001204_6(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var s;
    
    //$LASTPOS=9001222;//kernel.Keys:1222
    s = _this.stats[e.keyCode];
    //$LASTPOS=9001250;//kernel.Keys:1250
    if (! s) {
      //$LASTPOS=9001268;//kernel.Keys:1268
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=9001298;//kernel.Keys:1298
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keydown :function _trc_func_9001204_7(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var s;
    
    //$LASTPOS=9001222;//kernel.Keys:1222
    s = _this.stats[e.keyCode];
    //$LASTPOS=9001250;//kernel.Keys:1250
    if (! s) {
      //$LASTPOS=9001268;//kernel.Keys:1268
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=9001298;//kernel.Keys:1298
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  keyup :function _trc_func_9001332_8(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=9001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keyup :function _trc_func_9001332_9(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=9001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Keys,{"fullName":"kernel.Keys","namespace":"kernel","shortName":"Keys","decls":{"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod],{
  main :function _trc_func_10000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_10000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_10000143_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=10000162;//kernel.BaseActor:162
    if (Tonyu.runMode) {
      //$LASTPOS=10000192;//kernel.BaseActor:192
      thg = _this.currentThreadGroup();
      //$LASTPOS=10000231;//kernel.BaseActor:231
      if (thg) {
        //$LASTPOS=10000240;//kernel.BaseActor:240
        _this._th=thg.addObj(_this);
      }
      
    }
    //$LASTPOS=10000274;//kernel.BaseActor:274
    if (typeof  x=="object") {
      //$LASTPOS=10000298;//kernel.BaseActor:298
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=10000330;//kernel.BaseActor:330
      if (typeof  x=="number") {
        //$LASTPOS=10000365;//kernel.BaseActor:365
        _this.x=x;
        //$LASTPOS=10000384;//kernel.BaseActor:384
        _this.y=y;
        //$LASTPOS=10000403;//kernel.BaseActor:403
        _this.p=p;
        
      }
    }
    //$LASTPOS=10000425;//kernel.BaseActor:425
    if (_this.scaleX==null) {
      //$LASTPOS=10000443;//kernel.BaseActor:443
      _this.scaleX=1;
    }
    //$LASTPOS=10000458;//kernel.BaseActor:458
    if (_this.rotation==null) {
      //$LASTPOS=10000478;//kernel.BaseActor:478
      _this.rotation=0;
    }
    //$LASTPOS=10000495;//kernel.BaseActor:495
    if (_this.rotate==null) {
      //$LASTPOS=10000513;//kernel.BaseActor:513
      _this.rotate=0;
    }
    //$LASTPOS=10000528;//kernel.BaseActor:528
    if (_this.alpha==null) {
      //$LASTPOS=10000545;//kernel.BaseActor:545
      _this.alpha=255;
    }
    //$LASTPOS=10000561;//kernel.BaseActor:561
    if (_this.zOrder==null) {
      //$LASTPOS=10000579;//kernel.BaseActor:579
      _this.zOrder=0;
    }
    //$LASTPOS=10000594;//kernel.BaseActor:594
    if (_this.age==null) {
      //$LASTPOS=10000609;//kernel.BaseActor:609
      _this.age=0;
    }
    //$LASTPOS=10000621;//kernel.BaseActor:621
    if (_this.anim!=null&&typeof  _this.anim=="object") {
      //$LASTPOS=10000672;//kernel.BaseActor:672
      _this.animMode=true;
      //$LASTPOS=10000696;//kernel.BaseActor:696
      _this.animFrame=0;
      
    } else {
      //$LASTPOS=10000730;//kernel.BaseActor:730
      _this.animMode=false;
      
    }
    //$LASTPOS=10000758;//kernel.BaseActor:758
    if (_this.animFps==null) {
      //$LASTPOS=10000777;//kernel.BaseActor:777
      _this.animFps=1;
    }
  },
  extend :function _trc_func_10000792_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  print :function _trc_func_10000856_4(pt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000881;//kernel.BaseActor:881
    console.log.apply(console,arguments);
    //$LASTPOS=10000924;//kernel.BaseActor:924
    if (Tonyu.globals.$consolePanel) {
      //$LASTPOS=10000952;//kernel.BaseActor:952
      Tonyu.globals.$consolePanel.scroll(0,20);
      //$LASTPOS=10000989;//kernel.BaseActor:989
      Tonyu.globals.$consolePanel.setFillStyle("white");
      //$LASTPOS=10001035;//kernel.BaseActor:1035
      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");
      
    }
  },
  setAnimFps :function _trc_func_10001103_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001131;//kernel.BaseActor:1131
    _this.animFps=f;
    //$LASTPOS=10001152;//kernel.BaseActor:1152
    _this.animFrame=0;
    //$LASTPOS=10001175;//kernel.BaseActor:1175
    _this.animMode=true;
  },
  startAnim :function _trc_func_10001199_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001225;//kernel.BaseActor:1225
    _this.animMode=true;
  },
  stopAnim :function _trc_func_10001249_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001274;//kernel.BaseActor:1274
    _this.animMode=false;
  },
  update :function _trc_func_10001299_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001316;//kernel.BaseActor:1316
    _this.onUpdate();
    //$LASTPOS=10001333;//kernel.BaseActor:1333
    if (null) {
      //$LASTPOS=10001356;//kernel.BaseActor:1356
      null.suspend();
      
    }
  },
  fiber$update :function _trc_func_10001299_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10001316;//kernel.BaseActor:1316
    _this.onUpdate();
    //$LASTPOS=10001333;//kernel.BaseActor:1333
    if (_thread) {
      //$LASTPOS=10001356;//kernel.BaseActor:1356
      _thread.suspend();
      
    }
    
    _thread.retVal=_this;return;
  },
  onUpdate :function _trc_func_10001386_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  updateEx :function _trc_func_10001413_11(updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var updateCount;
    
    //$LASTPOS=10001438;//kernel.BaseActor:1438
    //$LASTPOS=10001442;//kernel.BaseActor:1442
    updateCount = 0;
    while(updateCount<updateT) {
      {
        //$LASTPOS=10001505;//kernel.BaseActor:1505
        _this.update();
      }
      updateCount++;
    }
  },
  fiber$updateEx :function _trc_func_10001413_12(_thread,updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var updateCount;
    
    
    _thread.enter(function _trc_func_10001413_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10001438;//kernel.BaseActor:1438
          //$LASTPOS=10001442;//kernel.BaseActor:1442
          updateCount = 0;;
        case 1:
          if (!(updateCount<updateT)) { __pc=3; break; }
          //$LASTPOS=10001505;//kernel.BaseActor:1505
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
  getkey :function _trc_func_10001526_14(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$Keys.getkey(k);
  },
  hitTo :function _trc_func_10001579_15(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.crashTo(t);
  },
  all :function _trc_func_10001626_16(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=10001648;//kernel.BaseActor:1648
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=10001673;//kernel.BaseActor:1673
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      
      //$LASTPOS=10001714;//kernel.BaseActor:1714
      if (s===_this) {
        return _this;
      }
      //$LASTPOS=10001745;//kernel.BaseActor:1745
      if (! c||s instanceof c) {
        //$LASTPOS=10001786;//kernel.BaseActor:1786
        res.push(s);
        
      }
    });
    return res;
  },
  allCrash :function _trc_func_10001866_17(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var sp;
    var t1;
    
    //$LASTPOS=10001893;//kernel.BaseActor:1893
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=10001918;//kernel.BaseActor:1918
    sp = _this;
    //$LASTPOS=10001955;//kernel.BaseActor:1955
    t1 = _this.getCrashRect();
    //$LASTPOS=10001983;//kernel.BaseActor:1983
    if (! t1) {
      return res;
    }
    //$LASTPOS=10002009;//kernel.BaseActor:2009
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      var t2;
      
      //$LASTPOS=10002050;//kernel.BaseActor:2050
      t2;
      //$LASTPOS=10002067;//kernel.BaseActor:2067
      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
        //$LASTPOS=10002293;//kernel.BaseActor:2293
        res.push(s);
        
      }
    });
    return res;
  },
  crashTo :function _trc_func_10002347_18(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10002373;//kernel.BaseActor:2373
    if (! t) {
      return false;
    }
    //$LASTPOS=10002400;//kernel.BaseActor:2400
    if (typeof  t=="function") {
      return _this.allCrash(t)[0];
      
    }
    return _this.crashTo1(t);
  },
  crashTo1 :function _trc_func_10002496_19(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t1;
    var t2;
    
    //$LASTPOS=10002523;//kernel.BaseActor:2523
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=10002651;//kernel.BaseActor:2651
    t1 = _this.getCrashRect();
    //$LASTPOS=10002679;//kernel.BaseActor:2679
    t2 = t.getCrashRect();
    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
  },
  getCrashRect :function _trc_func_10002961_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var actWidth;
    var actHeight;
    
    //$LASTPOS=10002991;//kernel.BaseActor:2991
    actWidth = _this.width*_this.scaleX;actHeight;
    //$LASTPOS=10003034;//kernel.BaseActor:3034
    if (typeof  _this.scaleY==="undefined") {
      //$LASTPOS=10003076;//kernel.BaseActor:3076
      actHeight=_this.height*_this.scaleX;
      
    } else {
      //$LASTPOS=10003122;//kernel.BaseActor:3122
      actHeight=_this.height*_this.scaleY;
      
    }
    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
  },
  within :function _trc_func_10003326_21(t,distance) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10003359;//kernel.BaseActor:3359
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=10003398;//kernel.BaseActor:3398
    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
      return true;
      
    }
    return false;
  },
  watchHit :function _trc_func_10003540_22(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10003583;//kernel.BaseActor:3583
    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {
      
      //$LASTPOS=10003634;//kernel.BaseActor:3634
      onHit.apply(_this,[a,b]);
    });
  },
  currentThreadGroup :function _trc_func_10003672_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$currentThreadGroup;
  },
  die :function _trc_func_10003740_24() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10003761;//kernel.BaseActor:3761
    if (_this._th) {
      //$LASTPOS=10003781;//kernel.BaseActor:3781
      _this._th.kill();
      
    }
    //$LASTPOS=10003805;//kernel.BaseActor:3805
    _this.hide();
    //$LASTPOS=10003818;//kernel.BaseActor:3818
    _this.fireEvent("die");
    //$LASTPOS=10003841;//kernel.BaseActor:3841
    _this._isDead=true;
  },
  hide :function _trc_func_10003859_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004020;//kernel.BaseActor:4020
    if (_this.layer&&typeof  _this.layer.remove=="function") {
      //$LASTPOS=10004075;//kernel.BaseActor:4075
      _this.layer.remove(_this);
      
    } else {
      //$LASTPOS=10004116;//kernel.BaseActor:4116
      Tonyu.globals.$Sprites.remove(_this);
      
    }
  },
  show :function _trc_func_10004150_26(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004177;//kernel.BaseActor:4177
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=10004229;//kernel.BaseActor:4229
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=10004267;//kernel.BaseActor:4267
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=10004299;//kernel.BaseActor:4299
    if (x!=null) {
      //$LASTPOS=10004312;//kernel.BaseActor:4312
      _this.x=x;
    }
    //$LASTPOS=10004327;//kernel.BaseActor:4327
    if (y!=null) {
      //$LASTPOS=10004340;//kernel.BaseActor:4340
      _this.y=y;
    }
    //$LASTPOS=10004355;//kernel.BaseActor:4355
    if (p!=null) {
      //$LASTPOS=10004368;//kernel.BaseActor:4368
      _this.p=p;
    }
  },
  detectShape :function _trc_func_10004384_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004413;//kernel.BaseActor:4413
    if (typeof  _this.p!="number") {
      //$LASTPOS=10004448;//kernel.BaseActor:4448
      if (_this.text!=null) {
        return _this;
      }
      //$LASTPOS=10004481;//kernel.BaseActor:4481
      _this.p=0;
      
    }
    //$LASTPOS=10004498;//kernel.BaseActor:4498
    _this.p=Math.floor(_this.p);
    //$LASTPOS=10004520;//kernel.BaseActor:4520
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
    //$LASTPOS=10004558;//kernel.BaseActor:4558
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=10004582;//kernel.BaseActor:4582
    _this.width=_this.pImg.width;
    //$LASTPOS=10004605;//kernel.BaseActor:4605
    _this.height=_this.pImg.height;
  },
  waitFor :function _trc_func_10004629_28(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004648;//kernel.BaseActor:4648
    if (null) {
      //$LASTPOS=10004672;//kernel.BaseActor:4672
      null.waitFor(f);
      
    }
  },
  fiber$waitFor :function _trc_func_10004629_29(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10004648;//kernel.BaseActor:4648
    if (_thread) {
      //$LASTPOS=10004672;//kernel.BaseActor:4672
      _thread.waitFor(f);
      
    }
    
    _thread.retVal=_this;return;
  },
  isDead :function _trc_func_10004720_30() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._isDead;
  },
  animation :function _trc_func_10004766_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004792;//kernel.BaseActor:4792
    _this.age++;
    //$LASTPOS=10004804;//kernel.BaseActor:4804
    if (_this.animMode&&_this.age%_this.animFps==0) {
      //$LASTPOS=10004845;//kernel.BaseActor:4845
      _this.p=_this.anim[_this.animFrame%_this.anim.length];
      //$LASTPOS=10004885;//kernel.BaseActor:4885
      _this.animFrame++;
      
    }
  },
  draw :function _trc_func_10004909_32(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=10004934;//kernel.BaseActor:4934
    if (_this.x==null||_this.y==null||_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=10004987;//kernel.BaseActor:4987
    _this.detectShape();
    //$LASTPOS=10005007;//kernel.BaseActor:5007
    if (_this.pImg) {
      //$LASTPOS=10005028;//kernel.BaseActor:5028
      ctx.save();
      //$LASTPOS=10005049;//kernel.BaseActor:5049
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=10005193;//kernel.BaseActor:5193
      _this.animation();
      //$LASTPOS=10005215;//kernel.BaseActor:5215
      if (_this.rotation!=0) {
        //$LASTPOS=10005250;//kernel.BaseActor:5250
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=10005318;//kernel.BaseActor:5318
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=10005375;//kernel.BaseActor:5375
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=10005427;//kernel.BaseActor:5427
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=10005492;//kernel.BaseActor:5492
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=10005548;//kernel.BaseActor:5548
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=10005589;//kernel.BaseActor:5589
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=10005721;//kernel.BaseActor:5721
      ctx.restore();
      
    } else {
      //$LASTPOS=10005748;//kernel.BaseActor:5748
      if (_this.text!==null&&_this.text!==undefined) {
        //$LASTPOS=10005796;//kernel.BaseActor:5796
        if (! _this.size) {
          //$LASTPOS=10005807;//kernel.BaseActor:5807
          _this.size=15;
        }
        //$LASTPOS=10005825;//kernel.BaseActor:5825
        if (! _this.align) {
          //$LASTPOS=10005837;//kernel.BaseActor:5837
          _this.align="center";
        }
        //$LASTPOS=10005862;//kernel.BaseActor:5862
        if (! _this.fillStyle) {
          //$LASTPOS=10005878;//kernel.BaseActor:5878
          _this.fillStyle="white";
        }
        //$LASTPOS=10005906;//kernel.BaseActor:5906
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=10005940;//kernel.BaseActor:5940
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=10005981;//kernel.BaseActor:5981
        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
        //$LASTPOS=10006052;//kernel.BaseActor:6052
        _this.width=rect.w;
        //$LASTPOS=10006075;//kernel.BaseActor:6075
        _this.height=rect.h;
        
      }
    }
    //$LASTPOS=10006102;//kernel.BaseActor:6102
    if (_this._fukidashi) {
      //$LASTPOS=10006129;//kernel.BaseActor:6129
      if (_this._fukidashi.c>0) {
        //$LASTPOS=10006164;//kernel.BaseActor:6164
        _this._fukidashi.c--;
        //$LASTPOS=10006193;//kernel.BaseActor:6193
        ctx.fillStyle="white";
        //$LASTPOS=10006229;//kernel.BaseActor:6229
        ctx.strokeStyle="black";
        //$LASTPOS=10006267;//kernel.BaseActor:6267
        _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
        
      }
      
    }
  },
  asyncResult :function _trc_func_10006373_33() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.asyncResult();
  },
  screenOut :function _trc_func_10006436_34(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=10006489;//kernel.BaseActor:6489
    if (! a) {
      //$LASTPOS=10006497;//kernel.BaseActor:6497
      a=0;
    }
    //$LASTPOS=10006507;//kernel.BaseActor:6507
    r = 0;
    //$LASTPOS=10006521;//kernel.BaseActor:6521
    viewX = 0;viewY = 0;
    //$LASTPOS=10006547;//kernel.BaseActor:6547
    if (_this.x<viewX+a) {
      //$LASTPOS=10006576;//kernel.BaseActor:6576
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=10006595;//kernel.BaseActor:6595
    if (_this.y<viewY+a) {
      //$LASTPOS=10006624;//kernel.BaseActor:6624
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=10006643;//kernel.BaseActor:6643
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=10006672;//kernel.BaseActor:6672
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=10006707;//kernel.BaseActor:6707
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=10006736;//kernel.BaseActor:6736
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    return r;
  },
  fiber$screenOut :function _trc_func_10006436_35(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=10006489;//kernel.BaseActor:6489
    if (! a) {
      //$LASTPOS=10006497;//kernel.BaseActor:6497
      a=0;
    }
    //$LASTPOS=10006507;//kernel.BaseActor:6507
    r = 0;
    //$LASTPOS=10006521;//kernel.BaseActor:6521
    viewX = 0;viewY = 0;
    //$LASTPOS=10006547;//kernel.BaseActor:6547
    if (_this.x<viewX+a) {
      //$LASTPOS=10006576;//kernel.BaseActor:6576
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=10006595;//kernel.BaseActor:6595
    if (_this.y<viewY+a) {
      //$LASTPOS=10006624;//kernel.BaseActor:6624
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=10006643;//kernel.BaseActor:6643
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=10006672;//kernel.BaseActor:6672
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=10006707;//kernel.BaseActor:6707
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=10006736;//kernel.BaseActor:6736
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    _thread.retVal=r;return;
    
    
    _thread.retVal=_this;return;
  },
  file :function _trc_func_10006785_36(path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var d;
    var files;
    
    //$LASTPOS=10006804;//kernel.BaseActor:6804
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=10006846;//kernel.BaseActor:6846
    files = d.rel("files/");
    return FS.get(files.rel(path),{topDir: d});
  },
  fiber$file :function _trc_func_10006785_37(_thread,path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var d;
    var files;
    
    //$LASTPOS=10006804;//kernel.BaseActor:6804
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=10006846;//kernel.BaseActor:6846
    files = d.rel("files/");
    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
    
    
    _thread.retVal=_this;return;
  },
  waitInputDevice :function _trc_func_10006925_38(fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10006953;//kernel.BaseActor:6953
    if (fl!==false) {
      //$LASTPOS=10006980;//kernel.BaseActor:6980
      if (! _this.origTG) {
        
        
      }
      //$LASTPOS=10007132;//kernel.BaseActor:7132
      _this.a=_this.asyncResult();
      //$LASTPOS=10007158;//kernel.BaseActor:7158
      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
      //$LASTPOS=10007212;//kernel.BaseActor:7212
      _this.waitFor(_this.a);
      
    } else {
      //$LASTPOS=10007247;//kernel.BaseActor:7247
      if (_this.origTG) {
        
        
      }
      
    }
  },
  fiber$waitInputDevice :function _trc_func_10006925_39(_thread,fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_10006925_40(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10006953;//kernel.BaseActor:6953
          if (!(fl!==false)) { __pc=3; break; }
          //$LASTPOS=10006980;//kernel.BaseActor:6980
          if (!(! _this.origTG)) { __pc=1; break; }
          {
            //$LASTPOS=10007034;//kernel.BaseActor:7034
            _this.origTG=_thread.group;
            //$LASTPOS=10007073;//kernel.BaseActor:7073
            _thread.setGroup(null);
          }
        case 1:
          
          //$LASTPOS=10007132;//kernel.BaseActor:7132
          _this.a=_this.asyncResult();
          //$LASTPOS=10007158;//kernel.BaseActor:7158
          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
          //$LASTPOS=10007212;//kernel.BaseActor:7212
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          __pc=5;break;
        case 3:
          //$LASTPOS=10007247;//kernel.BaseActor:7247
          if (!(_this.origTG)) { __pc=4; break; }
          {
            //$LASTPOS=10007300;//kernel.BaseActor:7300
            _thread.setGroup(_this.origTG);
            //$LASTPOS=10007343;//kernel.BaseActor:7343
            _this.origTG=null;
          }
        case 4:
          
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  redrawScreen :function _trc_func_10007393_41() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10007416;//kernel.BaseActor:7416
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=10007452;//kernel.BaseActor:7452
    Tonyu.globals.$Screen.draw();
  },
  fiber$redrawScreen :function _trc_func_10007393_42(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10007416;//kernel.BaseActor:7416
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=10007452;//kernel.BaseActor:7452
    Tonyu.globals.$Screen.draw();
    
    _thread.retVal=_this;return;
  },
  color :function _trc_func_10007493_43(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_10007493_44(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_10007555_45(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=10007591;//kernel.BaseActor:7591
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=10007616;//kernel.BaseActor:7616
    if (! size) {
      //$LASTPOS=10007627;//kernel.BaseActor:7627
      size=15;
    }
    //$LASTPOS=10007641;//kernel.BaseActor:7641
    if (! col) {
      //$LASTPOS=10007651;//kernel.BaseActor:7651
      col="cyan";
    }
    //$LASTPOS=10007668;//kernel.BaseActor:7668
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=10007722;//kernel.BaseActor:7722
    if (tp.length>0) {
      //$LASTPOS=10007750;//kernel.BaseActor:7750
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=10007829;//kernel.BaseActor:7829
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_10007555_46(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=10007591;//kernel.BaseActor:7591
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=10007616;//kernel.BaseActor:7616
    if (! size) {
      //$LASTPOS=10007627;//kernel.BaseActor:7627
      size=15;
    }
    //$LASTPOS=10007641;//kernel.BaseActor:7641
    if (! col) {
      //$LASTPOS=10007651;//kernel.BaseActor:7651
      col="cyan";
    }
    //$LASTPOS=10007668;//kernel.BaseActor:7668
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=10007722;//kernel.BaseActor:7722
    if (tp.length>0) {
      //$LASTPOS=10007750;//kernel.BaseActor:7750
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=10007829;//kernel.BaseActor:7829
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_10007882_47(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=10007914;//kernel.BaseActor:7914
    if (! col) {
      //$LASTPOS=10007924;//kernel.BaseActor:7924
      col="white";
    }
    //$LASTPOS=10007942;//kernel.BaseActor:7942
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=10007996;//kernel.BaseActor:7996
    if (tp.length>0) {
      //$LASTPOS=10008024;//kernel.BaseActor:8024
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=10008089;//kernel.BaseActor:8089
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_10007882_48(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=10007914;//kernel.BaseActor:7914
    if (! col) {
      //$LASTPOS=10007924;//kernel.BaseActor:7924
      col="white";
    }
    //$LASTPOS=10007942;//kernel.BaseActor:7942
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=10007996;//kernel.BaseActor:7996
    if (tp.length>0) {
      //$LASTPOS=10008024;//kernel.BaseActor:8024
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=10008089;//kernel.BaseActor:8089
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  loadPage :function _trc_func_10008127_49(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10008153;//kernel.BaseActor:8153
    _this.all().die();
    //$LASTPOS=10008171;//kernel.BaseActor:8171
    new page(arg);
    //$LASTPOS=10008191;//kernel.BaseActor:8191
    _this.die();
  },
  fiber$loadPage :function _trc_func_10008127_50(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10008153;//kernel.BaseActor:8153
    _this.all().die();
    //$LASTPOS=10008171;//kernel.BaseActor:8171
    new page(arg);
    //$LASTPOS=10008191;//kernel.BaseActor:8191
    _this.die();
    
    _thread.retVal=_this;return;
  },
  setVisible :function _trc_func_10008204_51(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10008226;//kernel.BaseActor:8226
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_10008204_52(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10008226;//kernel.BaseActor:8226
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventHandler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_11000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000020;//kernel.EventHandler:20
    _this.listeners=[];
  },
  fiber$main :function _trc_func_11000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000020;//kernel.EventHandler:20
    _this.listeners=[];
    
    _thread.retVal=_this;return;
  },
  addListener :function _trc_func_11000037_2(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    return {remove: function () {
      
      //$LASTPOS=11000125;//kernel.EventHandler:125
      _this.removeListener(f);
    }};
  },
  fiber$addListener :function _trc_func_11000037_3(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    
    _thread.enter(function _trc_func_11000037_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          _thread.exit({remove: function () {
            
            //$LASTPOS=11000125;//kernel.EventHandler:125
            _this.removeListener(f);
          }});return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  removeListener :function _trc_func_11000167_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=11000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=11000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
  },
  fiber$removeListener :function _trc_func_11000167_6(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=11000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=11000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
    
    _thread.retVal=_this;return;
  },
  fire :function _trc_func_11000253_7(args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var h;
    var _it_137;
    
    //$LASTPOS=11000272;//kernel.EventHandler:272
    if (_this.released) {
      return _this;
    }
    //$LASTPOS=11000299;//kernel.EventHandler:299
    _it_137=Tonyu.iterator(_this.listeners,1);
    while(_it_137.next()) {
      h=_it_137[0];
      
      //$LASTPOS=11000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
  },
  fiber$fire :function _trc_func_11000253_8(_thread,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var h;
    var _it_137;
    
    //$LASTPOS=11000272;//kernel.EventHandler:272
    if (_this.released) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=11000299;//kernel.EventHandler:299
    _it_137=Tonyu.iterator(_this.listeners,1);
    while(_it_137.next()) {
      h=_it_137[0];
      
      //$LASTPOS=11000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
    
    _thread.retVal=_this;return;
  },
  release :function _trc_func_11000366_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000384;//kernel.EventHandler:384
    _this.released=true;
  },
  fiber$release :function _trc_func_11000366_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000384;//kernel.EventHandler:384
    _this.released=true;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventHandler,{"fullName":"kernel.EventHandler","namespace":"kernel","shortName":"EventHandler","decls":{"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"removeListener":{"nowait":false},"fire":{"nowait":false},"release":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NoviceActor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_12000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_12000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sleep :function _trc_func_12000034_2(n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=12000057;//kernel.NoviceActor:57
      n=1;
    }
    //$LASTPOS=12000066;//kernel.NoviceActor:66
    //$LASTPOS=12000070;//kernel.NoviceActor:70
    n;
    while(n>0) {
      //$LASTPOS=12000081;//kernel.NoviceActor:81
      _this.update();
      n--;
    }
  },
  fiber$sleep :function _trc_func_12000034_3(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=12000057;//kernel.NoviceActor:57
      n=1;
    }
    
    _thread.enter(function _trc_func_12000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000066;//kernel.NoviceActor:66
          //$LASTPOS=12000070;//kernel.NoviceActor:70
          n;;
        case 1:
          if (!(n>0)) { __pc=3; break; }
          //$LASTPOS=12000081;//kernel.NoviceActor:81
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
  initSprite :function _trc_func_12000093_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=12000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=12000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
  },
  fiber$initSprite :function _trc_func_12000093_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=12000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=12000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.retVal=_this;return;
  },
  say :function _trc_func_12000235_7(text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=12000268;//kernel.NoviceActor:268
      size=15;
    }
    //$LASTPOS=12000281;//kernel.NoviceActor:281
    _this.initSprite();
    //$LASTPOS=12000299;//kernel.NoviceActor:299
    _this._sprite._fukidashi={text: text,size: size,c: 30};
  },
  fiber$say :function _trc_func_12000235_8(_thread,text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=12000268;//kernel.NoviceActor:268
      size=15;
    }
    
    _thread.enter(function _trc_func_12000235_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000281;//kernel.NoviceActor:281
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=12000299;//kernel.NoviceActor:299
          _this._sprite._fukidashi={text: text,size: size,c: 30};
          _thread.exit(_this);return;
        }
      }
    });
  },
  sprite :function _trc_func_12000350_10(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000371;//kernel.NoviceActor:371
    _this.go(x,y,p);
  },
  fiber$sprite :function _trc_func_12000350_11(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_12000350_12(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000371;//kernel.NoviceActor:371
          _this.fiber$go(_thread, x, y, p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  show :function _trc_func_12000384_13(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000403;//kernel.NoviceActor:403
    _this.go(x,y,p);
  },
  draw :function _trc_func_12000416_14(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000440;//kernel.NoviceActor:440
    _this._sprite.draw(ctx);
  },
  getCrashRect :function _trc_func_12000461_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._sprite.getCrashRect();
  },
  go :function _trc_func_12000516_16(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000533;//kernel.NoviceActor:533
    _this.initSprite();
    //$LASTPOS=12000551;//kernel.NoviceActor:551
    _this._sprite.x=x;
    //$LASTPOS=12000568;//kernel.NoviceActor:568
    _this._sprite.y=y;
    //$LASTPOS=12000585;//kernel.NoviceActor:585
    if (p!=null) {
      //$LASTPOS=12000598;//kernel.NoviceActor:598
      _this._sprite.p=p;
    }
  },
  fiber$go :function _trc_func_12000516_17(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_12000516_18(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000533;//kernel.NoviceActor:533
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=12000551;//kernel.NoviceActor:551
          _this._sprite.x=x;
          //$LASTPOS=12000568;//kernel.NoviceActor:568
          _this._sprite.y=y;
          //$LASTPOS=12000585;//kernel.NoviceActor:585
          if (p!=null) {
            //$LASTPOS=12000598;//kernel.NoviceActor:598
            _this._sprite.p=p;
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  change :function _trc_func_12000629_19(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000646;//kernel.NoviceActor:646
    _this.initSprite();
    //$LASTPOS=12000664;//kernel.NoviceActor:664
    _this._sprite.p=p;
  },
  fiber$change :function _trc_func_12000629_20(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_12000629_21(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000646;//kernel.NoviceActor:646
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=12000664;//kernel.NoviceActor:664
          _this._sprite.p=p;
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.NoviceActor,{"fullName":"kernel.NoviceActor","namespace":"kernel","shortName":"NoviceActor","decls":{"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MML=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_13000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000050;//kernel.MML:50
    _this.mmlBuf=[];
  },
  fiber$main :function _trc_func_13000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000050;//kernel.MML:50
    _this.mmlBuf=[];
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_13000062_2(mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    //$LASTPOS=13000105;//kernel.MML:105
    if (! _this.isPlaying()) {
      //$LASTPOS=13000134;//kernel.MML:134
      _this.playNext();
      
    }
  },
  fiber$play :function _trc_func_13000062_3(_thread,mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    
    _thread.enter(function _trc_func_13000062_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=13000105;//kernel.MML:105
          if (!(! _this.isPlaying())) { __pc=2; break; }
          //$LASTPOS=13000134;//kernel.MML:134
          _this.fiber$playNext(_thread);
          __pc=1;return;
        case 1:
          
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playNext :function _trc_func_13000157_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    
    //$LASTPOS=13000220;//kernel.MML:220
    if (_this.cTimeBase==null) {
      //$LASTPOS=13000241;//kernel.MML:241
      _this.cTimeBase=0;
    }
    //$LASTPOS=13000259;//kernel.MML:259
    if (_this.m) {
      //$LASTPOS=13000277;//kernel.MML:277
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=13000348;//kernel.MML:348
    mml = _this.mmlBuf.shift();
    //$LASTPOS=13000377;//kernel.MML:377
    if (! mml) {
      //$LASTPOS=13000398;//kernel.MML:398
      _this.m=null;
      //$LASTPOS=13000415;//kernel.MML:415
      _this.cTimeBase=0;
      return _this;
      
    }
    //$LASTPOS=13000457;//kernel.MML:457
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=13000495;//kernel.MML:495
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=13000525;//kernel.MML:525
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=13000555;//kernel.MML:555
    _this.m.start();
    //$LASTPOS=13000571;//kernel.MML:571
    Tonyu.globals.$MMLS[_this.id()]=_this;
  },
  fiber$playNext :function _trc_func_13000157_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mml;
    
    //$LASTPOS=13000220;//kernel.MML:220
    if (_this.cTimeBase==null) {
      //$LASTPOS=13000241;//kernel.MML:241
      _this.cTimeBase=0;
    }
    //$LASTPOS=13000259;//kernel.MML:259
    if (_this.m) {
      //$LASTPOS=13000277;//kernel.MML:277
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=13000348;//kernel.MML:348
    mml = _this.mmlBuf.shift();
    //$LASTPOS=13000377;//kernel.MML:377
    if (! mml) {
      //$LASTPOS=13000398;//kernel.MML:398
      _this.m=null;
      //$LASTPOS=13000415;//kernel.MML:415
      _this.cTimeBase=0;
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=13000457;//kernel.MML:457
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=13000495;//kernel.MML:495
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=13000525;//kernel.MML:525
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=13000555;//kernel.MML:555
    _this.m.start();
    //$LASTPOS=13000571;//kernel.MML:571
    Tonyu.globals.$MMLS[_this.id()]=_this;
    
    _thread.retVal=_this;return;
  },
  id :function _trc_func_13000593_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=13000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    return _this._id;
  },
  fiber$id :function _trc_func_13000593_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=13000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    _thread.retVal=_this._id;return;
    
    
    _thread.retVal=_this;return;
  },
  bufferCount :function _trc_func_13000651_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mmlBuf.length;
  },
  fiber$bufferCount :function _trc_func_13000651_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mmlBuf.length;return;
    
    
    _thread.retVal=_this;return;
  },
  isPlaying :function _trc_func_13000699_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.m;
  },
  fiber$isPlaying :function _trc_func_13000699_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.m;return;
    
    
    _thread.retVal=_this;return;
  },
  currentTime :function _trc_func_13000733_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000755;//kernel.MML:755
    if (_this.m) {
      return _this.m.currentTime+_this.cTimeBase;
    }
    return - 1;
  },
  fiber$currentTime :function _trc_func_13000733_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000755;//kernel.MML:755
    if (_this.m) {
      _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_13000814_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000829;//kernel.MML:829
    if (_this.m) {
      //$LASTPOS=13000847;//kernel.MML:847
      if (_this.mwav) {
        //$LASTPOS=13000872;//kernel.MML:872
        _this.mwav.pause();
        //$LASTPOS=13000899;//kernel.MML:899
        _this.mwav.stop();
        
      }
      //$LASTPOS=13000932;//kernel.MML:932
      _this.m.pause();
      //$LASTPOS=13000952;//kernel.MML:952
      _this.m.stop();
      //$LASTPOS=13000971;//kernel.MML:971
      _this.m=null;
      //$LASTPOS=13000988;//kernel.MML:988
      _this.mmlBuf=[];
      //$LASTPOS=13001056;//kernel.MML:1056
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
  },
  fiber$stop :function _trc_func_13000814_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000829;//kernel.MML:829
    if (_this.m) {
      //$LASTPOS=13000847;//kernel.MML:847
      if (_this.mwav) {
        //$LASTPOS=13000872;//kernel.MML:872
        _this.mwav.pause();
        //$LASTPOS=13000899;//kernel.MML:899
        _this.mwav.stop();
        
      }
      //$LASTPOS=13000932;//kernel.MML:932
      _this.m.pause();
      //$LASTPOS=13000952;//kernel.MML:952
      _this.m.stop();
      //$LASTPOS=13000971;//kernel.MML:971
      _this.m=null;
      //$LASTPOS=13000988;//kernel.MML:988
      _this.mmlBuf=[];
      //$LASTPOS=13001056;//kernel.MML:1056
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MML,{"fullName":"kernel.MML","namespace":"kernel","shortName":"MML","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlayMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_14000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_14000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initMML :function _trc_func_14000020_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000045;//kernel.PlayMod:45
    if (_this.mmlInited) {
      return _this;
    }
    //$LASTPOS=14000073;//kernel.PlayMod:73
    _this.mmlInited=true;
    //$LASTPOS=14000094;//kernel.PlayMod:94
    Tonyu.globals.$currentProject.requestPlugin("timbre");
    //$LASTPOS=14000140;//kernel.PlayMod:140
    if (! Tonyu.globals.$MMLS) {
      //$LASTPOS=14000162;//kernel.PlayMod:162
      Tonyu.globals.$MMLS={};
      //$LASTPOS=14000180;//kernel.PlayMod:180
      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
      //$LASTPOS=14000214;//kernel.PlayMod:214
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
      
    }
    //$LASTPOS=14000256;//kernel.PlayMod:256
    _this.on("die",function () {
      
      //$LASTPOS=14000272;//kernel.PlayMod:272
      _this.play().stop();
    });
  },
  releaseMML :function _trc_func_14000294_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_141;
    
    //$LASTPOS=14000322;//kernel.PlayMod:322
    if (Tonyu.globals.$MMLS) {
      //$LASTPOS=14000343;//kernel.PlayMod:343
      _it_141=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_141.next()) {
        k=_it_141[0];
        v=_it_141[1];
        
        //$LASTPOS=14000379;//kernel.PlayMod:379
        v.stop();
        
      }
      //$LASTPOS=14000407;//kernel.PlayMod:407
      Tonyu.globals.$MMLS=null;
      
    }
    //$LASTPOS=14000432;//kernel.PlayMod:432
    if (Tonyu.globals.$WaveTable) {
      //$LASTPOS=14000458;//kernel.PlayMod:458
      Tonyu.globals.$WaveTable.stop();
      //$LASTPOS=14000485;//kernel.PlayMod:485
      Tonyu.globals.$WaveTable=null;
      
    }
  },
  play :function _trc_func_14000513_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mmls;
    var i;
    
    //$LASTPOS=14000528;//kernel.PlayMod:528
    _this.initMML();
    //$LASTPOS=14000544;//kernel.PlayMod:544
    if (! _this._mml) {
      //$LASTPOS=14000555;//kernel.PlayMod:555
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=14000574;//kernel.PlayMod:574
    if (_this.isDead()||arguments.length==0) {
      return _this._mml;
    }
    //$LASTPOS=14000629;//kernel.PlayMod:629
    mmls = [];
    //$LASTPOS=14000647;//kernel.PlayMod:647
    //$LASTPOS=14000652;//kernel.PlayMod:652
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=14000697;//kernel.PlayMod:697
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=14000734;//kernel.PlayMod:734
    _this._mml.play(mmls);
    //$LASTPOS=14000756;//kernel.PlayMod:756
    while (_this._mml.bufferCount()>2) {
      //$LASTPOS=14000796;//kernel.PlayMod:796
      _this.update();
      
    }
    return _this._mml;
  },
  fiber$play :function _trc_func_14000513_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mmls;
    var i;
    
    //$LASTPOS=14000528;//kernel.PlayMod:528
    _this.initMML();
    //$LASTPOS=14000544;//kernel.PlayMod:544
    if (! _this._mml) {
      //$LASTPOS=14000555;//kernel.PlayMod:555
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=14000574;//kernel.PlayMod:574
    if (_this.isDead()||_arguments.length==0) {
      _thread.retVal=_this._mml;return;
      
    }
    //$LASTPOS=14000629;//kernel.PlayMod:629
    mmls = [];
    //$LASTPOS=14000647;//kernel.PlayMod:647
    //$LASTPOS=14000652;//kernel.PlayMod:652
    i = 0;
    while(i<_arguments.length) {
      {
        //$LASTPOS=14000697;//kernel.PlayMod:697
        mmls.push(_arguments[i]);
      }
      i++;
    }
    //$LASTPOS=14000734;//kernel.PlayMod:734
    _this._mml.play(mmls);
    
    _thread.enter(function _trc_func_14000513_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000756;//kernel.PlayMod:756
        case 1:
          if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
          //$LASTPOS=14000796;//kernel.PlayMod:796
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
  playSE :function _trc_func_14000835_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    var mmls;
    var i;
    
    //$LASTPOS=14000859;//kernel.PlayMod:859
    _this.initMML();
    //$LASTPOS=14000875;//kernel.PlayMod:875
    mml = new Tonyu.classes.kernel.MML;
    //$LASTPOS=14000897;//kernel.PlayMod:897
    mmls = [];
    //$LASTPOS=14000915;//kernel.PlayMod:915
    //$LASTPOS=14000920;//kernel.PlayMod:920
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=14000965;//kernel.PlayMod:965
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=14001002;//kernel.PlayMod:1002
    mml.play(mmls);
    return mml;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlayMod,{"fullName":"kernel.PlayMod","namespace":"kernel","shortName":"PlayMod","decls":{"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.WaveTable=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_15000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=15000036;//kernel.WaveTable:36
    _this.env={};
    //$LASTPOS=15000313;//kernel.WaveTable:313
    if (typeof  T!=="undefined") {
      //$LASTPOS=15000392;//kernel.WaveTable:392
      _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
      //$LASTPOS=15000460;//kernel.WaveTable:460
      _this.setEnv(0,_this.env);
      //$LASTPOS=15000480;//kernel.WaveTable:480
      _this.setWav(0,T("pulse"));
      
    }
  },
  fiber$main :function _trc_func_15000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=15000036;//kernel.WaveTable:36
    _this.env={};
    
    _thread.enter(function _trc_func_15000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000313;//kernel.WaveTable:313
          if (!(typeof  T!=="undefined")) { __pc=3; break; }
          //$LASTPOS=15000392;//kernel.WaveTable:392
          _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
          //$LASTPOS=15000460;//kernel.WaveTable:460
          _this.fiber$setEnv(_thread, 0, _this.env);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=15000480;//kernel.WaveTable:480
          _this.fiber$setWav(_thread, 0, T("pulse"));
          __pc=2;return;
        case 2:
          
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setWav :function _trc_func_15000044_3(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
  },
  fiber$setWav :function _trc_func_15000044_4(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
    
    _thread.retVal=_this;return;
  },
  setEnv :function _trc_func_15000088_5(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000114;//kernel.WaveTable:114
    _this.env[num]=synth;
  },
  fiber$setEnv :function _trc_func_15000088_6(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000114;//kernel.WaveTable:114
    _this.env[num]=synth;
    
    _thread.retVal=_this;return;
  },
  get :function _trc_func_15000132_7(w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var synth;
    
    //$LASTPOS=15000148;//kernel.WaveTable:148
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    return synth;
  },
  fiber$get :function _trc_func_15000132_8(_thread,w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var synth;
    
    //$LASTPOS=15000148;//kernel.WaveTable:148
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    _thread.retVal=synth;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_15000226_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_15000226_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.WaveTable,{"fullName":"kernel.WaveTable","namespace":"kernel","shortName":"WaveTable","decls":{"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ParallelMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_16000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_16000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  parallel :function _trc_func_16000037_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var args;
    var i;
    var name;
    var thg;
    var th;
    
    //$LASTPOS=16000064;//kernel.ParallelMod:64
    args = [];
    //$LASTPOS=16000083;//kernel.ParallelMod:83
    //$LASTPOS=16000088;//kernel.ParallelMod:88
    i = 1;
    while(i<arguments.length) {
      {
        //$LASTPOS=16000134;//kernel.ParallelMod:134
        args.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=16000173;//kernel.ParallelMod:173
    name = arguments[0];
    //$LASTPOS=16000212;//kernel.ParallelMod:212
    thg = Tonyu.globals.$currentThreadGroup;
    //$LASTPOS=16000247;//kernel.ParallelMod:247
    th;
    //$LASTPOS=16000261;//kernel.ParallelMod:261
    if (thg) {
      //$LASTPOS=16000270;//kernel.ParallelMod:270
      th=thg.addObj(_this,name,args);
    }
    //$LASTPOS=16000309;//kernel.ParallelMod:309
    _this.on("die",function () {
      
      //$LASTPOS=16000321;//kernel.ParallelMod:321
      th.kill();
    });
    return th;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ParallelMod,{"fullName":"kernel.ParallelMod","namespace":"kernel","shortName":"ParallelMod","decls":{"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Scheduler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_17000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000020;//kernel.Scheduler:20
    _this.cur=[];
    //$LASTPOS=17000029;//kernel.Scheduler:29
    _this.next=[];
  },
  fiber$main :function _trc_func_17000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000020;//kernel.Scheduler:20
    _this.cur=[];
    //$LASTPOS=17000029;//kernel.Scheduler:29
    _this.next=[];
    
    _thread.retVal=_this;return;
  },
  addToCur :function _trc_func_17000039_2(th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000060;//kernel.Scheduler:60
    _this.cur.push(th);
  },
  fiber$addToCur :function _trc_func_17000039_3(_thread,th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000060;//kernel.Scheduler:60
    _this.cur.push(th);
    
    _thread.retVal=_this;return;
  },
  addToNext :function _trc_func_17000078_4(th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000100;//kernel.Scheduler:100
    _this.next.push(th);
  },
  fiber$addToNext :function _trc_func_17000078_5(_thread,th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000100;//kernel.Scheduler:100
    _this.next.push(th);
    
    _thread.retVal=_this;return;
  },
  stepAll :function _trc_func_17000119_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t;
    var _it_156;
    
    //$LASTPOS=17000137;//kernel.Scheduler:137
    _it_156=Tonyu.iterator(_this.cur,1);
    while(_it_156.next()) {
      t=_it_156[0];
      
      //$LASTPOS=17000167;//kernel.Scheduler:167
      _this.cur.steps();
      
    }
    //$LASTPOS=17000192;//kernel.Scheduler:192
    _this.cur=_this.next;
    //$LASTPOS=17000207;//kernel.Scheduler:207
    _this.next=[];
  },
  fiber$stepAll :function _trc_func_17000119_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var t;
    var _it_156;
    
    //$LASTPOS=17000137;//kernel.Scheduler:137
    _it_156=Tonyu.iterator(_this.cur,1);
    while(_it_156.next()) {
      t=_it_156[0];
      
      //$LASTPOS=17000167;//kernel.Scheduler:167
      _this.cur.steps();
      
    }
    //$LASTPOS=17000192;//kernel.Scheduler:192
    _this.cur=_this.next;
    //$LASTPOS=17000207;//kernel.Scheduler:207
    _this.next=[];
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Scheduler,{"fullName":"kernel.Scheduler","namespace":"kernel","shortName":"Scheduler","decls":{"methods":{"main":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"stepAll":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],{
  main :function _trc_func_18000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_18000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_18000086_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000105;//kernel.Actor:105
    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
    //$LASTPOS=18000124;//kernel.Actor:124
    if (Tonyu.runMode) {
      //$LASTPOS=18000143;//kernel.Actor:143
      _this.initSprite();
    }
  },
  initSprite :function _trc_func_18000161_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000182;//kernel.Actor:182
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=18000234;//kernel.Actor:234
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=18000272;//kernel.Actor:272
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=18000304;//kernel.Actor:304
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_18000161_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=18000182;//kernel.Actor:182
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=18000234;//kernel.Actor:234
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=18000272;//kernel.Actor:272
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_18000161_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000304;//kernel.Actor:304
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_18000320_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onAppear :function _trc_func_18000320_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Actor,{"fullName":"kernel.Actor","namespace":"kernel","shortName":"Actor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BodyActor=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_19000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_19000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  getWorld :function _trc_func_19000046_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      return Tonyu.globals.$t2World;
    }
    //$LASTPOS=19000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    return Tonyu.globals.$t2World;
  },
  fiber$getWorld :function _trc_func_19000046_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      _thread.retVal=Tonyu.globals.$t2World;return;
      
    }
    //$LASTPOS=19000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    _thread.retVal=Tonyu.globals.$t2World;return;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_func_19000144_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
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
    
    //$LASTPOS=19000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=19000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=19000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=19000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=19000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=19000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=19000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=19000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=19000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=19000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=19000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=19000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=19000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=19000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=19000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=19000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=19000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=19000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=19000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=19001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=19001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=19001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=19001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=19001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=19001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=19001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=19001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=19001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=19001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=19001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=19001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=19001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=19001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=19001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
  },
  fiber$onAppear :function _trc_func_19000144_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
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
    
    //$LASTPOS=19000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=19000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=19000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=19000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=19000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=19000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=19000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=19000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=19000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=19000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=19000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=19000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=19000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=19000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=19000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=19000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=19000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=19000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=19000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=19001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=19001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=19001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=19001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=19001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=19001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=19001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=19001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=19001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=19001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=19001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=19001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=19001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=19001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=19001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
    
    _thread.retVal=_this;return;
  },
  allContact :function _trc_func_19001574_6(klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=19001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=19001615;//kernel.BodyActor:1615
    //$LASTPOS=19001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=19001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=19001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=19001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=19001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=19001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=19001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=19001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=19002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=19002080;//kernel.BodyActor:2080
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
  fiber$allContact :function _trc_func_19001574_7(_thread,klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=19001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=19001615;//kernel.BodyActor:1615
    //$LASTPOS=19001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=19001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=19001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=19001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=19001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=19001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=19001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=19001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=19002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=19002080;//kernel.BodyActor:2080
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
  applyForce :function _trc_func_19002159_8(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=19002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=19002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyForce :function _trc_func_19002159_9(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=19002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=19002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyImpulse :function _trc_func_19002339_10(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=19002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=19002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyImpulse :function _trc_func_19002339_11(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=19002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=19002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyTorque :function _trc_func_19002524_12(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
  },
  fiber$applyTorque :function _trc_func_19002524_13(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
    
    _thread.retVal=_this;return;
  },
  moveBy :function _trc_func_19002569_14(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pos;
    
    //$LASTPOS=19002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=19002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=19002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=19002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
  },
  fiber$moveBy :function _trc_func_19002569_15(_thread,dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pos;
    
    //$LASTPOS=19002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=19002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=19002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=19002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
    
    _thread.retVal=_this;return;
  },
  contactTo :function _trc_func_19002689_16(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.allContact(t)[0];
  },
  fiber$contactTo :function _trc_func_19002689_17(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.allContact(t)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_19002736_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002749;//kernel.BodyActor:2749
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    //$LASTPOS=19002766;//kernel.BodyActor:2766
    _this.world.DestroyBody(_this.body);
  },
  updatePos :function _trc_func_19002793_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var scale;
    var pos;
    
    //$LASTPOS=19002812;//kernel.BodyActor:2812
    if (! _this.body) {
      return _this;
    }
    //$LASTPOS=19002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=19002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=19002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=19002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=19002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
  },
  fiber$updatePos :function _trc_func_19002793_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var scale;
    var pos;
    
    //$LASTPOS=19002812;//kernel.BodyActor:2812
    if (! _this.body) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=19002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=19002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=19002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=19002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=19002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_20000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_20000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_20000041_2(param) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    
    //$LASTPOS=20000060;//kernel.Map:60
    _this.sx=0;
    //$LASTPOS=20000071;//kernel.Map:71
    _this.sy=0;
    //$LASTPOS=20000082;//kernel.Map:82
    Tonyu.classes.kernel.Actor.apply( _this, [param]);
    //$LASTPOS=20000101;//kernel.Map:101
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=20000173;//kernel.Map:173
    _this.mapObj=true;
    //$LASTPOS=20000191;//kernel.Map:191
    _this.mapTable=[];
    //$LASTPOS=20000211;//kernel.Map:211
    _this.mapOnTable=[];
    //$LASTPOS=20000233;//kernel.Map:233
    //$LASTPOS=20000237;//kernel.Map:237
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=20000266;//kernel.Map:266
        _this.rows=[];
        //$LASTPOS=20000286;//kernel.Map:286
        //$LASTPOS=20000290;//kernel.Map:290
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=20000323;//kernel.Map:323
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=20000358;//kernel.Map:358
        _this.mapTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=20000391;//kernel.Map:391
    //$LASTPOS=20000395;//kernel.Map:395
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=20000424;//kernel.Map:424
        _this.rows=[];
        //$LASTPOS=20000444;//kernel.Map:444
        //$LASTPOS=20000448;//kernel.Map:448
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=20000481;//kernel.Map:481
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=20000516;//kernel.Map:516
        _this.mapOnTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=20000616;//kernel.Map:616
    _this.initMap();
  },
  initMap :function _trc_func_20000631_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=20000648;//kernel.Map:648
    if (! _this.mapData) {
      return _this;
    }
    //$LASTPOS=20000674;//kernel.Map:674
    //$LASTPOS=20000678;//kernel.Map:678
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=20000707;//kernel.Map:707
        //$LASTPOS=20000711;//kernel.Map:711
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=20000744;//kernel.Map:744
            _this.set(j,i,_this.mapData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=20000791;//kernel.Map:791
    if (! _this.mapOnData) {
      return _this;
    }
    //$LASTPOS=20000819;//kernel.Map:819
    //$LASTPOS=20000823;//kernel.Map:823
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=20000852;//kernel.Map:852
        //$LASTPOS=20000856;//kernel.Map:856
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=20000889;//kernel.Map:889
            _this.setOn(j,i,_this.mapOnData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
  },
  fiber$initMap :function _trc_func_20000631_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=20000648;//kernel.Map:648
    if (! _this.mapData) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_20000631_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20000674;//kernel.Map:674
          //$LASTPOS=20000678;//kernel.Map:678
          i = 0;;
        case 1:
          if (!(i<_this.row)) { __pc=5; break; }
          //$LASTPOS=20000707;//kernel.Map:707
          //$LASTPOS=20000711;//kernel.Map:711
          j = 0;;
        case 2:
          if (!(j<_this.col)) { __pc=4; break; }
          //$LASTPOS=20000744;//kernel.Map:744
          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
          __pc=3;return;
        case 3:
          
          j++;
          __pc=2;break;
        case 4:
          
          i++;
          __pc=1;break;
        case 5:
          
          //$LASTPOS=20000791;//kernel.Map:791
          if (!(! _this.mapOnData)) { __pc=6; break; }
          _thread.exit(_this);return;
        case 6:
          
          //$LASTPOS=20000819;//kernel.Map:819
          //$LASTPOS=20000823;//kernel.Map:823
          i = 0;;
        case 7:
          if (!(i<_this.row)) { __pc=11; break; }
          //$LASTPOS=20000852;//kernel.Map:852
          //$LASTPOS=20000856;//kernel.Map:856
          j = 0;;
        case 8:
          if (!(j<_this.col)) { __pc=10; break; }
          //$LASTPOS=20000889;//kernel.Map:889
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
  load :function _trc_func_20000939_6(dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=20001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=20001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=20001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=20001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=20001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=20001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=20001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=20001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=20001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=20001296;//kernel.Map:1296
    _this.initMap();
  },
  fiber$load :function _trc_func_20000939_7(_thread,dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=20001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=20001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=20001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=20001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=20001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=20001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=20001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=20001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=20001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    
    _thread.enter(function _trc_func_20000939_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20001296;//kernel.Map:1296
          _this.fiber$initMap(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  set :function _trc_func_20001311_9(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=20001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=20001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=20001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=20001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=20001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=20001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      return _this;
      
    }
    //$LASTPOS=20001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=20001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001933;//kernel.Map:1933
    _this.ctx.restore();
  },
  fiber$set :function _trc_func_20001311_10(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=20001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=20001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=20001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=20001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=20001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=20001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=20001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=20001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001933;//kernel.Map:1933
    _this.ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setOn :function _trc_func_20001952_11(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=20002050;//kernel.Map:2050
    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
    //$LASTPOS=20002100;//kernel.Map:2100
    _this.mapOnTable[setRow][setCol]=p;
    //$LASTPOS=20002135;//kernel.Map:2135
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=20002169;//kernel.Map:2169
    p=Math.floor(p);
    //$LASTPOS=20002191;//kernel.Map:2191
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=20002229;//kernel.Map:2229
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=20002253;//kernel.Map:2253
    _this.ctx.save();
    //$LASTPOS=20002270;//kernel.Map:2270
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20002414;//kernel.Map:2414
    _this.ctx.restore();
  },
  fiber$setOn :function _trc_func_20001952_12(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_20001952_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20002050;//kernel.Map:2050
          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=20002100;//kernel.Map:2100
          _this.mapOnTable[setRow][setCol]=p;
          //$LASTPOS=20002135;//kernel.Map:2135
          _this.ctx=_this.buf[0].getContext("2d");
          //$LASTPOS=20002169;//kernel.Map:2169
          p=Math.floor(p);
          //$LASTPOS=20002191;//kernel.Map:2191
          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
          //$LASTPOS=20002229;//kernel.Map:2229
          if (!(! _this.pImg)) { __pc=2; break; }
          _thread.exit(_this);return;
        case 2:
          
          //$LASTPOS=20002253;//kernel.Map:2253
          _this.ctx.save();
          //$LASTPOS=20002270;//kernel.Map:2270
          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
          //$LASTPOS=20002414;//kernel.Map:2414
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  setOnAt :function _trc_func_20002433_14(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002461;//kernel.Map:2461
    _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setOnAt :function _trc_func_20002433_15(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_20002433_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20002461;//kernel.Map:2461
          _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setAt :function _trc_func_20002530_17(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002556;//kernel.Map:2556
    _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setAt :function _trc_func_20002530_18(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_20002530_19(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20002556;//kernel.Map:2556
          _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  get :function _trc_func_20002623_20(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$get :function _trc_func_20002623_21(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getAt :function _trc_func_20002757_22(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getAt :function _trc_func_20002757_23(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  getOn :function _trc_func_20002853_24(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapOnTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$getOn :function _trc_func_20002853_25(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapOnTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getOnAt :function _trc_func_20002991_26(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getOnAt :function _trc_func_20002991_27(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_20003091_28(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=20003142;//kernel.Map:3142
    _this.sy=- scrollY;
  },
  fiber$scrollTo :function _trc_func_20003091_29(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=20003142;//kernel.Map:3142
    _this.sy=- scrollY;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_20003159_30(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20003177;//kernel.Map:3177
    _this.pImg=_this.buf[0];
    //$LASTPOS=20003195;//kernel.Map:3195
    ctx.save();
    //$LASTPOS=20003212;//kernel.Map:3212
    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
    //$LASTPOS=20003324;//kernel.Map:3324
    ctx.restore();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Panel=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_21000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_21000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_21000056_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000072;//kernel.Panel:72
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=21000089;//kernel.Panel:89
    _this.width=_this.width;
    //$LASTPOS=21000112;//kernel.Panel:112
    _this.height=_this.height;
    //$LASTPOS=21000137;//kernel.Panel:137
    if (_this.align==null) {
      //$LASTPOS=21000153;//kernel.Panel:153
      _this.align="center";
    }
    //$LASTPOS=21000174;//kernel.Panel:174
    if (_this.alpha==null) {
      //$LASTPOS=21000190;//kernel.Panel:190
      _this.alpha=255;
    }
    //$LASTPOS=21000206;//kernel.Panel:206
    if (_this._drawn==null) {
      //$LASTPOS=21000223;//kernel.Panel:223
      _this._drawn=false;
    }
    //$LASTPOS=21000242;//kernel.Panel:242
    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
  },
  setPanel :function _trc_func_21000284_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=21000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=21000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
  },
  fiber$setPanel :function _trc_func_21000284_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=21000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=21000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
    
    _thread.retVal=_this;return;
  },
  resize :function _trc_func_21000404_5(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000432;//kernel.Panel:432
    _this.setPanel(width,height);
  },
  fiber$resize :function _trc_func_21000404_6(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21000404_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000432;//kernel.Panel:432
          _this.fiber$setPanel(_thread, width, height);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  getContext :function _trc_func_21000460_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000480;//kernel.Panel:480
    _this._drawn=true;
    return _this.buf[0].getContext("2d");
  },
  fiber$getContext :function _trc_func_21000460_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000480;//kernel.Panel:480
    _this._drawn=true;
    _thread.retVal=_this.buf[0].getContext("2d");return;
    
    
    _thread.retVal=_this;return;
  },
  setFillStyle :function _trc_func_21000534_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000561;//kernel.Panel:561
    _this.fillStyle=color;
  },
  fiber$setFillStyle :function _trc_func_21000534_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000561;//kernel.Panel:561
    _this.fillStyle=color;
    
    _thread.retVal=_this;return;
  },
  fillRect :function _trc_func_21000587_12(x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000629;//kernel.Panel:629
    _this.ctx=_this.getContext();
    //$LASTPOS=21000652;//kernel.Panel:652
    _this.ctx.save();
    //$LASTPOS=21000719;//kernel.Panel:719
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=21000749;//kernel.Panel:749
    _this.ctx.fillRect(x,y,rectWidth,rectHeight);
    //$LASTPOS=21000794;//kernel.Panel:794
    _this.ctx.restore();
  },
  fiber$fillRect :function _trc_func_21000587_13(_thread,x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21000587_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000629;//kernel.Panel:629
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21000652;//kernel.Panel:652
          _this.ctx.save();
          //$LASTPOS=21000719;//kernel.Panel:719
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=21000749;//kernel.Panel:749
          _this.ctx.fillRect(x,y,rectWidth,rectHeight);
          //$LASTPOS=21000794;//kernel.Panel:794
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  fillText :function _trc_func_21000813_15(text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000850;//kernel.Panel:850
    _this.ctx=_this.getContext();
    //$LASTPOS=21000873;//kernel.Panel:873
    _this.ctx.save();
    //$LASTPOS=21000940;//kernel.Panel:940
    _this.ctx.textAlign=align;
    //$LASTPOS=21000968;//kernel.Panel:968
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=21000998;//kernel.Panel:998
    _this.ctx.font=size+"px 'Courier New'";
    //$LASTPOS=21001037;//kernel.Panel:1037
    _this.ctx.fillText(text,x,y);
    //$LASTPOS=21001066;//kernel.Panel:1066
    _this.ctx.restore();
  },
  fiber$fillText :function _trc_func_21000813_16(_thread,text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21000813_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000850;//kernel.Panel:850
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21000873;//kernel.Panel:873
          _this.ctx.save();
          //$LASTPOS=21000940;//kernel.Panel:940
          _this.ctx.textAlign=align;
          //$LASTPOS=21000968;//kernel.Panel:968
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=21000998;//kernel.Panel:998
          _this.ctx.font=size+"px 'Courier New'";
          //$LASTPOS=21001037;//kernel.Panel:1037
          _this.ctx.fillText(text,x,y);
          //$LASTPOS=21001066;//kernel.Panel:1066
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  clearRect :function _trc_func_21001085_18(clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001131;//kernel.Panel:1131
    _this.ctx=_this.getContext();
    //$LASTPOS=21001154;//kernel.Panel:1154
    _this.ctx.save();
    //$LASTPOS=21001171;//kernel.Panel:1171
    _this.ctx.clearRect(clearX,clearY,clearW,clearH);
    //$LASTPOS=21001220;//kernel.Panel:1220
    _this.ctx.restore();
  },
  fiber$clearRect :function _trc_func_21001085_19(_thread,clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21001085_20(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21001131;//kernel.Panel:1131
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21001154;//kernel.Panel:1154
          _this.ctx.save();
          //$LASTPOS=21001171;//kernel.Panel:1171
          _this.ctx.clearRect(clearX,clearY,clearW,clearH);
          //$LASTPOS=21001220;//kernel.Panel:1220
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getPixel :function _trc_func_21001239_21(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001266;//kernel.Panel:1266
    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
      //$LASTPOS=21001365;//kernel.Panel:1365
      _this.ctx=_this.getContext();
      //$LASTPOS=21001392;//kernel.Panel:1392
      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
      //$LASTPOS=21001444;//kernel.Panel:1444
      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
      
    } else {
      //$LASTPOS=21001584;//kernel.Panel:1584
      _this.colordata=[0,0,0,0];
      
    }
    return (_this.colordata);
  },
  fiber$getPixel :function _trc_func_21001239_22(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21001239_23(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21001266;//kernel.Panel:1266
          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
          //$LASTPOS=21001365;//kernel.Panel:1365
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21001392;//kernel.Panel:1392
          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
          //$LASTPOS=21001444;//kernel.Panel:1444
          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
          __pc=3;break;
        case 2:
          {
            //$LASTPOS=21001584;//kernel.Panel:1584
            _this.colordata=[0,0,0,0];
          }
        case 3:
          
          _thread.exit((_this.colordata));return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  scroll :function _trc_func_21001640_24(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001671;//kernel.Panel:1671
    _this.ctx=_this.getContext();
    //$LASTPOS=21001694;//kernel.Panel:1694
    _this.ctx.save();
    //$LASTPOS=21001711;//kernel.Panel:1711
    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
    //$LASTPOS=21001772;//kernel.Panel:1772
    _this.clearRect(0,0,_this.width,_this.height);
    //$LASTPOS=21001806;//kernel.Panel:1806
    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
    //$LASTPOS=21001858;//kernel.Panel:1858
    _this.ctx.restore();
  },
  fiber$scroll :function _trc_func_21001640_25(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21001640_26(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21001671;//kernel.Panel:1671
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21001694;//kernel.Panel:1694
          _this.ctx.save();
          //$LASTPOS=21001711;//kernel.Panel:1711
          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
          //$LASTPOS=21001772;//kernel.Panel:1772
          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=21001806;//kernel.Panel:1806
          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
          //$LASTPOS=21001858;//kernel.Panel:1858
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_func_21001877_27(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001894;//kernel.Panel:1894
    if (_this._drawn) {
      //$LASTPOS=21001915;//kernel.Panel:1915
      _this.pImg=_this.buf[0];
      //$LASTPOS=21001937;//kernel.Panel:1937
      ctx.save();
      //$LASTPOS=21001958;//kernel.Panel:1958
      if (_this.align=="left") {
        //$LASTPOS=21001990;//kernel.Panel:1990
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=21002042;//kernel.Panel:2042
        if (_this.align=="center") {
          //$LASTPOS=21002076;//kernel.Panel:2076
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=21002111;//kernel.Panel:2111
          if (_this.align=="right") {
            //$LASTPOS=21002144;//kernel.Panel:2144
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=21002201;//kernel.Panel:2201
      if (_this.rotation!=0) {
        //$LASTPOS=21002236;//kernel.Panel:2236
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=21002304;//kernel.Panel:2304
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=21002361;//kernel.Panel:2361
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=21002402;//kernel.Panel:2402
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=21002506;//kernel.Panel:2506
      ctx.restore();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_22000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_22000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_22000077_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000095;//kernel.ScaledCanvas:95
    _this.extend(opt);
    //$LASTPOS=22000142;//kernel.ScaledCanvas:142
    _this.resize(_this.width,_this.height);
    //$LASTPOS=22000170;//kernel.ScaledCanvas:170
    _this.cw=_this.canvas.width();
    //$LASTPOS=22000194;//kernel.ScaledCanvas:194
    _this.ch=_this.canvas.height();
    //$LASTPOS=22000219;//kernel.ScaledCanvas:219
    _this.cctx=_this.canvas[0].getContext("2d");
    //$LASTPOS=22000257;//kernel.ScaledCanvas:257
    _this.color="rgb(20,80,180)";
    //$LASTPOS=22000291;//kernel.ScaledCanvas:291
    _this.sx=0;
    //$LASTPOS=22000302;//kernel.ScaledCanvas:302
    _this.sy=0;
    //$LASTPOS=22000313;//kernel.ScaledCanvas:313
    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
  },
  resize :function _trc_func_22000349_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=22000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=22000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=22000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=22000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=22000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=22000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=22000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
  },
  fiber$resize :function _trc_func_22000349_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=22000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=22000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=22000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=22000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=22000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=22000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=22000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
    
    _thread.retVal=_this;return;
  },
  shouldDraw1x1 :function _trc_func_22000634_5(srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var larger;
    var smaller;
    
    //$LASTPOS=22000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=22000733;//kernel.ScaledCanvas:733
    smaller = 5;
    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
  },
  fiber$shouldDraw1x1 :function _trc_func_22000634_6(_thread,srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var larger;
    var smaller;
    
    //$LASTPOS=22000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=22000733;//kernel.ScaledCanvas:733
    smaller = 5;
    _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_22000853_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=22000868;//kernel.ScaledCanvas:868
    _this.cw=_this.canvas.width();
    //$LASTPOS=22000892;//kernel.ScaledCanvas:892
    _this.ch=_this.canvas.height();
    //$LASTPOS=22000917;//kernel.ScaledCanvas:917
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=22000961;//kernel.ScaledCanvas:961
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=22001005;//kernel.ScaledCanvas:1005
    if (calch>_this.ch) {
      //$LASTPOS=22001019;//kernel.ScaledCanvas:1019
      calch=_this.ch;
    }
    //$LASTPOS=22001034;//kernel.ScaledCanvas:1034
    if (calcw>_this.cw) {
      //$LASTPOS=22001048;//kernel.ScaledCanvas:1048
      calcw=_this.cw;
    }
    //$LASTPOS=22001063;//kernel.ScaledCanvas:1063
    _this.cctx.clearRect(0,0,_this.cw,_this.ch);
    //$LASTPOS=22001095;//kernel.ScaledCanvas:1095
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=22001151;//kernel.ScaledCanvas:1151
      calcw=_this.width;
      //$LASTPOS=22001163;//kernel.ScaledCanvas:1163
      calch=_this.height;
      
    }
    //$LASTPOS=22001189;//kernel.ScaledCanvas:1189
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=22001232;//kernel.ScaledCanvas:1232
    marginh = Math.floor((_this.ch-calch)/2);
    //$LASTPOS=22001275;//kernel.ScaledCanvas:1275
    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
  },
  canvas2buf :function _trc_func_22001364_8(point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=22001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=22001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=22001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=22001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=22001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=22001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=22001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=22001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=22001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=22001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=22001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
  },
  fiber$canvas2buf :function _trc_func_22001364_9(_thread,point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=22001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=22001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=22001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=22001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=22001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=22001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=22001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=22001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=22001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=22001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=22001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_22001810_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001835;//kernel.ScaledCanvas:1835
    _this.color=color;
  },
  fiber$setBGColor :function _trc_func_22001810_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22001835;//kernel.ScaledCanvas:1835
    _this.color=color;
    
    _thread.retVal=_this;return;
  },
  fillCanvas :function _trc_func_22001857_12(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    
    //$LASTPOS=22001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=22001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=22001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=22001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=22001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=22002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=22002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=22002068;//kernel.ScaledCanvas:2068
    ctx.restore();
  },
  fiber$fillCanvas :function _trc_func_22001857_13(_thread,cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    
    //$LASTPOS=22001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=22001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=22001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=22001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=22001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=22002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=22002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=22002068;//kernel.ScaledCanvas:2068
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_22002087_14(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
  },
  fiber$scrollTo :function _trc_func_22002087_15(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_23000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_23000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_23000031_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000045;//kernel.Sprites:45
    _this.sprites=[];
    //$LASTPOS=23000062;//kernel.Sprites:62
    _this.imageList=[];
    //$LASTPOS=23000081;//kernel.Sprites:81
    _this.hitWatchers=[];
    //$LASTPOS=23000102;//kernel.Sprites:102
    _this.isDrawGrid=Tonyu.noviceMode;
    //$LASTPOS=23000136;//kernel.Sprites:136
    _this.sx=0;
    //$LASTPOS=23000147;//kernel.Sprites:147
    _this.sy=0;
    //$LASTPOS=23000158;//kernel.Sprites:158
    _this.objId=0;
  },
  add :function _trc_func_23000171_3(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      return _this;
    }
    //$LASTPOS=23000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=23000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=23000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=23000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=23000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    return s;
  },
  fiber$add :function _trc_func_23000171_4(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=23000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=23000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=23000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=23000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=23000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  remove :function _trc_func_23000374_5(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var idx;
    
    //$LASTPOS=23000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=23000433;//kernel.Sprites:433
    if (idx<0) {
      return _this;
    }
    //$LASTPOS=23000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=23000485;//kernel.Sprites:485
    delete s.__addedToSprites;
  },
  fiber$remove :function _trc_func_23000374_6(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var idx;
    
    //$LASTPOS=23000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=23000433;//kernel.Sprites:433
    if (idx<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=23000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=23000485;//kernel.Sprites:485
    delete s.__addedToSprites;
    
    _thread.retVal=_this;return;
  },
  clear :function _trc_func_23000516_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000534;//kernel.Sprites:534
    _this.sprites.splice(0,_this.sprites.length);
  },
  fiber$clear :function _trc_func_23000516_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000534;//kernel.Sprites:534
    _this.sprites.splice(0,_this.sprites.length);
    
    _thread.retVal=_this;return;
  },
  compOrder :function _trc_func_23000570_9(obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var val1;
    var val2;
    
    //$LASTPOS=23000607;//kernel.Sprites:607
    val1 = obj1.zOrder;
    //$LASTPOS=23000634;//kernel.Sprites:634
    val2 = obj2.zOrder;
    //$LASTPOS=23000661;//kernel.Sprites:661
    if (val1>val2) {
      return - 1;
      
    } else {
      //$LASTPOS=23000707;//kernel.Sprites:707
      if (val1<val2) {
        return 1;
        
      } else {
        //$LASTPOS=23000752;//kernel.Sprites:752
        if (val1==val2) {
          //$LASTPOS=23000777;//kernel.Sprites:777
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
  fiber$compOrder :function _trc_func_23000570_10(_thread,obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var val1;
    var val2;
    
    //$LASTPOS=23000607;//kernel.Sprites:607
    val1 = obj1.zOrder;
    //$LASTPOS=23000634;//kernel.Sprites:634
    val2 = obj2.zOrder;
    //$LASTPOS=23000661;//kernel.Sprites:661
    if (val1>val2) {
      _thread.retVal=- 1;return;
      
      
    } else {
      //$LASTPOS=23000707;//kernel.Sprites:707
      if (val1<val2) {
        _thread.retVal=1;return;
        
        
      } else {
        //$LASTPOS=23000752;//kernel.Sprites:752
        if (val1==val2) {
          //$LASTPOS=23000777;//kernel.Sprites:777
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
  draw :function _trc_func_23000912_11(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var orderArray;
    
    //$LASTPOS=23000937;//kernel.Sprites:937
    ctx = cv.getContext("2d");
    //$LASTPOS=23000971;//kernel.Sprites:971
    ctx.save();
    //$LASTPOS=23001116;//kernel.Sprites:1116
    orderArray = [];
    //$LASTPOS=23001140;//kernel.Sprites:1140
    orderArray=orderArray.concat(_this.sprites);
    //$LASTPOS=23001184;//kernel.Sprites:1184
    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
    //$LASTPOS=23001217;//kernel.Sprites:1217
    ctx.translate(- _this.sx,- _this.sy);
    //$LASTPOS=23001246;//kernel.Sprites:1246
    orderArray.forEach(function (s) {
      
      //$LASTPOS=23001280;//kernel.Sprites:1280
      s.draw(ctx);
    });
    //$LASTPOS=23001307;//kernel.Sprites:1307
    ctx.restore();
  },
  checkHit :function _trc_func_23001326_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001353;//kernel.Sprites:1353
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=23001397;//kernel.Sprites:1397
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=23001485;//kernel.Sprites:1485
        a_owner = a;
        //$LASTPOS=23001527;//kernel.Sprites:1527
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=23001580;//kernel.Sprites:1580
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=23001628;//kernel.Sprites:1628
          b_owner = b;
          //$LASTPOS=23001674;//kernel.Sprites:1674
          if (a===b) {
            return _this;
          }
          //$LASTPOS=23001710;//kernel.Sprites:1710
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=23001815;//kernel.Sprites:1815
          if (a.crashTo1(b)) {
            //$LASTPOS=23001918;//kernel.Sprites:1918
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
  },
  fiber$checkHit :function _trc_func_23001326_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23001353;//kernel.Sprites:1353
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=23001397;//kernel.Sprites:1397
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=23001485;//kernel.Sprites:1485
        a_owner = a;
        //$LASTPOS=23001527;//kernel.Sprites:1527
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=23001580;//kernel.Sprites:1580
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=23001628;//kernel.Sprites:1628
          b_owner = b;
          //$LASTPOS=23001674;//kernel.Sprites:1674
          if (a===b) {
            return _this;
          }
          //$LASTPOS=23001710;//kernel.Sprites:1710
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=23001815;//kernel.Sprites:1815
          if (a.crashTo1(b)) {
            //$LASTPOS=23001918;//kernel.Sprites:1918
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
    
    _thread.retVal=_this;return;
  },
  watchHit :function _trc_func_23002002_14(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=23002048;//kernel.Sprites:2048
    p = {A: typeA,B: typeB,h: onHit};
    //$LASTPOS=23002112;//kernel.Sprites:2112
    _this.hitWatchers.push(p);
  },
  drawGrid :function _trc_func_23002137_15(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var i;
    
    //$LASTPOS=23002165;//kernel.Sprites:2165
    ctx = c.getContext("2d");
    //$LASTPOS=23002198;//kernel.Sprites:2198
    ctx.textBaseline="top";
    //$LASTPOS=23002227;//kernel.Sprites:2227
    ctx.save();
    //$LASTPOS=23002244;//kernel.Sprites:2244
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=23002284;//kernel.Sprites:2284
    //$LASTPOS=23002289;//kernel.Sprites:2289
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=23002329;//kernel.Sprites:2329
        ctx.beginPath();
        //$LASTPOS=23002355;//kernel.Sprites:2355
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=23002401;//kernel.Sprites:2401
        ctx.moveTo(i,0);
        //$LASTPOS=23002427;//kernel.Sprites:2427
        ctx.lineTo(i,c.height);
        //$LASTPOS=23002460;//kernel.Sprites:2460
        ctx.closePath();
        //$LASTPOS=23002486;//kernel.Sprites:2486
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=23002518;//kernel.Sprites:2518
    //$LASTPOS=23002523;//kernel.Sprites:2523
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=23002564;//kernel.Sprites:2564
        ctx.beginPath();
        //$LASTPOS=23002590;//kernel.Sprites:2590
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=23002636;//kernel.Sprites:2636
        ctx.moveTo(0,i);
        //$LASTPOS=23002662;//kernel.Sprites:2662
        ctx.lineTo(c.width,i);
        //$LASTPOS=23002694;//kernel.Sprites:2694
        ctx.closePath();
        //$LASTPOS=23002720;//kernel.Sprites:2720
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=23002746;//kernel.Sprites:2746
    ctx.fillStyle="white";
    //$LASTPOS=23002774;//kernel.Sprites:2774
    ctx.font="15px monospaced";
    //$LASTPOS=23002807;//kernel.Sprites:2807
    //$LASTPOS=23002812;//kernel.Sprites:2812
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=23002855;//kernel.Sprites:2855
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=23002889;//kernel.Sprites:2889
    //$LASTPOS=23002894;//kernel.Sprites:2894
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=23002938;//kernel.Sprites:2938
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=23002972;//kernel.Sprites:2972
    ctx.restore();
  },
  fiber$drawGrid :function _trc_func_23002137_16(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    var i;
    
    //$LASTPOS=23002165;//kernel.Sprites:2165
    ctx = c.getContext("2d");
    //$LASTPOS=23002198;//kernel.Sprites:2198
    ctx.textBaseline="top";
    //$LASTPOS=23002227;//kernel.Sprites:2227
    ctx.save();
    //$LASTPOS=23002244;//kernel.Sprites:2244
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=23002284;//kernel.Sprites:2284
    //$LASTPOS=23002289;//kernel.Sprites:2289
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=23002329;//kernel.Sprites:2329
        ctx.beginPath();
        //$LASTPOS=23002355;//kernel.Sprites:2355
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=23002401;//kernel.Sprites:2401
        ctx.moveTo(i,0);
        //$LASTPOS=23002427;//kernel.Sprites:2427
        ctx.lineTo(i,c.height);
        //$LASTPOS=23002460;//kernel.Sprites:2460
        ctx.closePath();
        //$LASTPOS=23002486;//kernel.Sprites:2486
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=23002518;//kernel.Sprites:2518
    //$LASTPOS=23002523;//kernel.Sprites:2523
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=23002564;//kernel.Sprites:2564
        ctx.beginPath();
        //$LASTPOS=23002590;//kernel.Sprites:2590
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=23002636;//kernel.Sprites:2636
        ctx.moveTo(0,i);
        //$LASTPOS=23002662;//kernel.Sprites:2662
        ctx.lineTo(c.width,i);
        //$LASTPOS=23002694;//kernel.Sprites:2694
        ctx.closePath();
        //$LASTPOS=23002720;//kernel.Sprites:2720
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=23002746;//kernel.Sprites:2746
    ctx.fillStyle="white";
    //$LASTPOS=23002774;//kernel.Sprites:2774
    ctx.font="15px monospaced";
    //$LASTPOS=23002807;//kernel.Sprites:2807
    //$LASTPOS=23002812;//kernel.Sprites:2812
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=23002855;//kernel.Sprites:2855
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=23002889;//kernel.Sprites:2889
    //$LASTPOS=23002894;//kernel.Sprites:2894
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=23002938;//kernel.Sprites:2938
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=23002972;//kernel.Sprites:2972
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setImageList :function _trc_func_23002991_17(il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23003024;//kernel.Sprites:3024
    _this.imageList=il;
  },
  fiber$setImageList :function _trc_func_23002991_18(_thread,il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23003024;//kernel.Sprites:3024
    _this.imageList=il;
    
    _thread.retVal=_this;return;
  },
  getImageList :function _trc_func_23003042_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.imageList;
  },
  fiber$getImageList :function _trc_func_23003042_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.imageList;return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_23003095_21(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23003136;//kernel.Sprites:3136
    _this.sx=scrollX;
    //$LASTPOS=23003153;//kernel.Sprites:3153
    _this.sy=scrollY;
  },
  fiber$scrollTo :function _trc_func_23003095_22(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23003136;//kernel.Sprites:3136
    _this.sx=scrollX;
    //$LASTPOS=23003153;//kernel.Sprites:3153
    _this.sy=scrollY;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_24000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_24000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_25000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000150;//kernel.T2World:150
    _this.loop();
  },
  fiber$main :function _trc_func_25000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_25000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000150;//kernel.T2World:150
          _this.fiber$loop(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_25000067_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    //$LASTPOS=25000133;//kernel.T2World:133
    _this.initWorld();
  },
  fiber$onAppear :function _trc_func_25000067_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    
    _thread.enter(function _trc_func_25000067_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000133;//kernel.T2World:133
          _this.fiber$initWorld(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initWorld :function _trc_func_25000163_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=25000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=25000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=25000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=25000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=25000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=25000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=25000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=25000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=25000533;//kernel.T2World:533
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
  },
  fiber$initWorld :function _trc_func_25000163_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=25000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=25000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=25000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=25000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=25000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=25000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=25000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=25000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    
    _thread.enter(function _trc_func_25000163_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000533;//kernel.T2World:533
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseWorld));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseWorld :function _trc_func_25000561_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=25000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
  },
  fiber$releaseWorld :function _trc_func_25000561_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=25000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
    
    _thread.retVal=_this;return;
  },
  loop :function _trc_func_25000626_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000641;//kernel.T2World:641
    while (true) {
      //$LASTPOS=25000664;//kernel.T2World:664
      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
      //$LASTPOS=25000831;//kernel.T2World:831
      _this.world.DrawDebugData();
      //$LASTPOS=25000863;//kernel.T2World:863
      _this.world.ClearForces();
      //$LASTPOS=25000893;//kernel.T2World:893
      _this.updatePos();
      //$LASTPOS=25000915;//kernel.T2World:915
      _this.update();
      
    }
  },
  fiber$loop :function _trc_func_25000626_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_25000626_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000641;//kernel.T2World:641
        case 1:
          //$LASTPOS=25000664;//kernel.T2World:664
          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
          //$LASTPOS=25000831;//kernel.T2World:831
          _this.world.DrawDebugData();
          //$LASTPOS=25000863;//kernel.T2World:863
          _this.world.ClearForces();
          //$LASTPOS=25000893;//kernel.T2World:893
          _this.fiber$updatePos(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=25000915;//kernel.T2World:915
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
  updatePos :function _trc_func_25000936_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b;
    var d;
    
    //$LASTPOS=25000956;//kernel.T2World:956
    //$LASTPOS=25000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=25001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=25001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=25001053;//kernel.T2World:1053
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
  },
  fiber$updatePos :function _trc_func_25000936_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b;
    var d;
    
    //$LASTPOS=25000956;//kernel.T2World:956
    //$LASTPOS=25000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=25001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=25001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=25001053;//kernel.T2World:1053
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2World,{"fullName":"kernel.T2World","namespace":"kernel","shortName":"T2World","decls":{"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_26000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_26000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_26000055_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000069;//kernel.T2MediaPlayer:69
    _this.initT2MediaPlayer();
  },
  initT2MediaPlayer :function _trc_func_26000096_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      return _this;
    }
    //$LASTPOS=26000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=26000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=26000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
  },
  fiber$initT2MediaPlayer :function _trc_func_26000096_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=26000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=26000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=26000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    
    _thread.retVal=_this;return;
  },
  clearSEData :function _trc_func_26000259_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=26000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
  },
  fiber$clearSEData :function _trc_func_26000259_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=26000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
    
    _thread.retVal=_this;return;
  },
  clearBGMData :function _trc_func_26000344_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000367;//kernel.T2MediaPlayer:367
    _this.clearSEData();
  },
  fiber$clearBGMData :function _trc_func_26000344_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_26000344_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26000367;//kernel.T2MediaPlayer:367
          _this.fiber$clearSEData(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  deleteSEData :function _trc_func_26000388_10(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
  },
  fiber$deleteSEData :function _trc_func_26000388_11(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
    
    _thread.retVal=_this;return;
  },
  loadSE :function _trc_func_26000457_12(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    var cnt;
    
    //$LASTPOS=26000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=26000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=26000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    //$LASTPOS=26000616;//kernel.T2MediaPlayer:616
    while (data==null) {
      //$LASTPOS=26000648;//kernel.T2MediaPlayer:648
      _this.update();
      //$LASTPOS=26000667;//kernel.T2MediaPlayer:667
      data=T2MediaLib.getSEData(idx);
      //$LASTPOS=26000710;//kernel.T2MediaPlayer:710
      cnt++;
      
    }
    return data;
  },
  fiber$loadSE :function _trc_func_26000457_13(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    var cnt;
    
    //$LASTPOS=26000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=26000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=26000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    
    _thread.enter(function _trc_func_26000457_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26000616;//kernel.T2MediaPlayer:616
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=26000648;//kernel.T2MediaPlayer:648
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=26000667;//kernel.T2MediaPlayer:667
          data=T2MediaLib.getSEData(idx);
          //$LASTPOS=26000710;//kernel.T2MediaPlayer:710
          cnt++;
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  loadFromProject :function _trc_func_26000852_15(prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var s;
    var _it_218;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=26000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=26000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      return _this;
    }
    //$LASTPOS=26000945;//kernel.T2MediaPlayer:945
    _it_218=Tonyu.iterator(r.sounds,1);
    while(_it_218.next()) {
      s=_it_218[0];
      
      //$LASTPOS=26000981;//kernel.T2MediaPlayer:981
      name = s.name;url = s.url;
      //$LASTPOS=26001019;//kernel.T2MediaPlayer:1019
      ls = /^ls:(.*)/.exec(url);
      //$LASTPOS=26001058;//kernel.T2MediaPlayer:1058
      if (ls) {
        //$LASTPOS=26001081;//kernel.T2MediaPlayer:1081
        f = prj.getDir().rel(ls[1]);
        //$LASTPOS=26001125;//kernel.T2MediaPlayer:1125
        if (f.exists()) {
          //$LASTPOS=26001160;//kernel.T2MediaPlayer:1160
          url=f.text();
          //$LASTPOS=26001191;//kernel.T2MediaPlayer:1191
          Tonyu.globals.$lastURL=url;
          
        }
        
      }
      //$LASTPOS=26001242;//kernel.T2MediaPlayer:1242
      Tonyu.setGlobal(name,name);
      //$LASTPOS=26001281;//kernel.T2MediaPlayer:1281
      _this.print("Loading Sound: "+name);
      //$LASTPOS=26001322;//kernel.T2MediaPlayer:1322
      _this.loadSE(name,url);
      
    }
  },
  fiber$loadFromProject :function _trc_func_26000852_16(_thread,prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var s;
    var _it_218;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=26000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=26000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_26000852_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26000945;//kernel.T2MediaPlayer:945
          _it_218=Tonyu.iterator(r.sounds,1);
        case 1:
          if (!(_it_218.next())) { __pc=3; break; }
          s=_it_218[0];
          
          //$LASTPOS=26000981;//kernel.T2MediaPlayer:981
          name = s.name;url = s.url;
          //$LASTPOS=26001019;//kernel.T2MediaPlayer:1019
          ls = /^ls:(.*)/.exec(url);
          //$LASTPOS=26001058;//kernel.T2MediaPlayer:1058
          if (ls) {
            //$LASTPOS=26001081;//kernel.T2MediaPlayer:1081
            f = prj.getDir().rel(ls[1]);
            //$LASTPOS=26001125;//kernel.T2MediaPlayer:1125
            if (f.exists()) {
              //$LASTPOS=26001160;//kernel.T2MediaPlayer:1160
              url=f.text();
              //$LASTPOS=26001191;//kernel.T2MediaPlayer:1191
              Tonyu.globals.$lastURL=url;
              
            }
            
          }
          //$LASTPOS=26001242;//kernel.T2MediaPlayer:1242
          Tonyu.setGlobal(name,name);
          //$LASTPOS=26001281;//kernel.T2MediaPlayer:1281
          _this.print("Loading Sound: "+name);
          //$LASTPOS=26001322;//kernel.T2MediaPlayer:1322
          _this.fiber$loadSE(_thread, name, url);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playSE :function _trc_func_26001402_18(idx,vol,rate,offset,loop,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26001503;//kernel.T2MediaPlayer:1503
    if (vol==null) {
      //$LASTPOS=26001520;//kernel.T2MediaPlayer:1520
      vol=128;
    }
    //$LASTPOS=26001609;//kernel.T2MediaPlayer:1609
    if (vol<0) {
      //$LASTPOS=26001629;//kernel.T2MediaPlayer:1629
      vol=0;
    } else {
      //$LASTPOS=26001650;//kernel.T2MediaPlayer:1650
      if (vol>128) {
        //$LASTPOS=26001665;//kernel.T2MediaPlayer:1665
        vol=128;
      }
    }
    return T2MediaLib.playSE(idx,vol/128,rate,offset,loop,loopStart,loopEnd);
  },
  stopSE :function _trc_func_26001769_19(sourceObj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopSE(sourceObj);
  },
  fiber$stopSE :function _trc_func_26001769_20(_thread,sourceObj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopSE(sourceObj);return;
    
    
    _thread.retVal=_this;return;
  },
  getSEData :function _trc_func_26001838_21(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getSEData(idx);
  },
  fiber$getSEData :function _trc_func_26001838_22(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getSEData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  loadBGM :function _trc_func_26001914_23(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    
    //$LASTPOS=26001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=26002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    //$LASTPOS=26002060;//kernel.T2MediaPlayer:2060
    while (data==null) {
      //$LASTPOS=26002092;//kernel.T2MediaPlayer:2092
      _this.update();
      //$LASTPOS=26002111;//kernel.T2MediaPlayer:2111
      data=T2MediaLib.getBGMData(idx);
      
    }
    return data;
  },
  fiber$loadBGM :function _trc_func_26001914_24(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    
    //$LASTPOS=26001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=26002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    
    _thread.enter(function _trc_func_26001914_25(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26002060;//kernel.T2MediaPlayer:2060
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=26002092;//kernel.T2MediaPlayer:2092
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=26002111;//kernel.T2MediaPlayer:2111
          data=T2MediaLib.getBGMData(idx);
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  playBGM :function _trc_func_26002177_26(idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=26002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=26002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=26002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGM :function _trc_func_26002177_27(_thread,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=26002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=26002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=26002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    _thread.retVal=T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
    
    
    _thread.retVal=_this;return;
  },
  stopBGM :function _trc_func_26002383_28() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopBGM(0);
  },
  fiber$stopBGM :function _trc_func_26002383_29(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  pauseBGM :function _trc_func_26002437_30() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseBGM(0);
  },
  fiber$pauseBGM :function _trc_func_26002437_31(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  resumeBGM :function _trc_func_26002493_32() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeBGM(0);
  },
  fiber$resumeBGM :function _trc_func_26002493_33(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMVolume :function _trc_func_26002551_34(vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=26002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=26002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=26002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=26002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(0,vol);
  },
  fiber$setBGMVolume :function _trc_func_26002551_35(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=26002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=26002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=26002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=26002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMTempo :function _trc_func_26002790_36(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setBGMTempo(0,tempo);
  },
  fiber$setBGMTempo :function _trc_func_26002790_37(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setBGMTempo(0,tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMCurrentTime :function _trc_func_26002948_38() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMCurrentTime(0);
  },
  fiber$getBGMCurrentTime :function _trc_func_26002948_39(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMCurrentTime(0);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMLength :function _trc_func_26003022_40() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMLength(0);
  },
  fiber$getBGMLength :function _trc_func_26003022_41(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMLength(0);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMData :function _trc_func_26003086_42(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMData(idx);
  },
  fiber$getBGMData :function _trc_func_26003086_43(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  playBGMID :function _trc_func_26003171_44(id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=26003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=26003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=26003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGMID :function _trc_func_26003171_45(_thread,id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=26003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=26003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=26003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    _thread.retVal=T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
    
    
    _thread.retVal=_this;return;
  },
  stopBGMID :function _trc_func_26003384_46(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopBGM(id);
  },
  fiber$stopBGMID :function _trc_func_26003384_47(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  pauseBGMID :function _trc_func_26003443_48(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseBGM(id);
  },
  fiber$pauseBGMID :function _trc_func_26003443_49(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  resumeBGMID :function _trc_func_26003504_50(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeBGM(id);
  },
  fiber$resumeBGMID :function _trc_func_26003504_51(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMVolumeID :function _trc_func_26003567_52(id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=26003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=26003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=26003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=26003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(id,vol);
  },
  fiber$setBGMVolumeID :function _trc_func_26003567_53(_thread,id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=26003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=26003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=26003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=26003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMTempoID :function _trc_func_26003813_54(id,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setBGMTempo(id,tempo);
  },
  fiber$setBGMTempoID :function _trc_func_26003813_55(_thread,id,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setBGMTempo(id,tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMCurrentTimeID :function _trc_func_26003978_56(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMCurrentTime(id);
  },
  fiber$getBGMCurrentTimeID :function _trc_func_26003978_57(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMCurrentTime(id);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMLengthID :function _trc_func_26004057_58(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMLength(id);
  },
  fiber$getBGMLengthID :function _trc_func_26004057_59(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMLength(id);return;
    
    
    _thread.retVal=_this;return;
  },
  sizeBGMID :function _trc_func_26004126_60() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMPlayerMax();
  },
  fiber$sizeBGMID :function _trc_func_26004126_61(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMPlayerMax();return;
    
    
    _thread.retVal=_this;return;
  },
  allStopBGM :function _trc_func_26004189_62() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
  },
  fiber$allStopBGM :function _trc_func_26004189_63(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
    
    _thread.retVal=_this;return;
  },
  loadAudio :function _trc_func_26004245_64(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    //$LASTPOS=26004351;//kernel.T2MediaPlayer:4351
    while (T2MediaLib.getAudioData(idx)==null) {
      //$LASTPOS=26004396;//kernel.T2MediaPlayer:4396
      _this.update();
    }
  },
  fiber$loadAudio :function _trc_func_26004245_65(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    
    _thread.enter(function _trc_func_26004245_66(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26004351;//kernel.T2MediaPlayer:4351
        case 1:
          if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
          //$LASTPOS=26004396;//kernel.T2MediaPlayer:4396
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
  playAudio :function _trc_func_26004412_67(idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=26004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=26004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=26004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    return T2MediaLib.playAudio(idx,loop,startTime);
  },
  fiber$playAudio :function _trc_func_26004412_68(_thread,idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=26004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=26004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=26004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    _thread.retVal=T2MediaLib.playAudio(idx,loop,startTime);return;
    
    
    _thread.retVal=_this;return;
  },
  stopAudio :function _trc_func_26004591_69() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopAudio();
  },
  fiber$stopAudio :function _trc_func_26004591_70(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  pauseAudio :function _trc_func_26004648_71() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseAudio();
  },
  fiber$pauseAudio :function _trc_func_26004648_72(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  resumeAudio :function _trc_func_26004707_73() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeAudio();
  },
  fiber$resumeAudio :function _trc_func_26004707_74(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioVolume :function _trc_func_26004768_75(vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=26004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=26004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=26004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=26004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    return T2MediaLib.setAudioVolume(vol);
  },
  fiber$setAudioVolume :function _trc_func_26004768_76(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=26004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=26004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=26004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=26004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioTempo :function _trc_func_26004935_77(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=26004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=26005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=26005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    return T2MediaLib.setAudioTempo(tempo);
  },
  fiber$setAudioTempo :function _trc_func_26004935_78(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=26004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=26005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=26005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    _thread.retVal=T2MediaLib.setAudioTempo(tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioPosition :function _trc_func_26005090_79(time) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setAudioPosition(time);
  },
  fiber$setAudioPosition :function _trc_func_26005090_80(_thread,time) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setAudioPosition(time);return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioCurrentTime :function _trc_func_26005169_81() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioCurrentTime();
  },
  fiber$getAudioCurrentTime :function _trc_func_26005169_82(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioCurrentTime();return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioLength :function _trc_func_26005246_83() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioLength();
  },
  fiber$getAudioLength :function _trc_func_26005246_84(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioLength();return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioData :function _trc_func_26005313_85(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioData(idx);
  },
  fiber$getAudioData :function _trc_func_26005313_86(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2MediaPlayer,{"fullName":"kernel.T2MediaPlayer","namespace":"kernel","shortName":"T2MediaPlayer","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"clearSEData":{"nowait":false},"clearBGMData":{"nowait":false},"deleteSEData":{"nowait":false},"loadSE":{"nowait":false},"loadFromProject":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEData":{"nowait":false},"loadBGM":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"setBGMVolume":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getBGMData":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"sizeBGMID":{"nowait":false},"allStopBGM":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlainChar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_27000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_27000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_27000047_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=27000066;//kernel.PlainChar:66
    if (Tonyu.runMode) {
      //$LASTPOS=27000096;//kernel.PlainChar:96
      thg = _this.currentThreadGroup();
      //$LASTPOS=27000135;//kernel.PlainChar:135
      if (thg) {
        //$LASTPOS=27000144;//kernel.PlainChar:144
        _this._th=thg.addObj(_this,"tMain");
      }
      //$LASTPOS=27000183;//kernel.PlainChar:183
      _this.initSprite();
      
    }
    //$LASTPOS=27000209;//kernel.PlainChar:209
    if (typeof  x=="object") {
      //$LASTPOS=27000233;//kernel.PlainChar:233
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=27000266;//kernel.PlainChar:266
      if (typeof  x=="number") {
        //$LASTPOS=27000301;//kernel.PlainChar:301
        _this.x=x;
        //$LASTPOS=27000320;//kernel.PlainChar:320
        _this.y=y;
        //$LASTPOS=27000339;//kernel.PlainChar:339
        _this.p=p;
        
      }
    }
  },
  draw :function _trc_func_27000360_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000376;//kernel.PlainChar:376
    _this.onDraw();
    //$LASTPOS=27000391;//kernel.PlainChar:391
    if (_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=27000422;//kernel.PlainChar:422
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  setVisible :function _trc_func_27000441_4(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000463;//kernel.PlainChar:463
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_27000441_5(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27000463;//kernel.PlainChar:463
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  onDraw :function _trc_func_27000484_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onDraw :function _trc_func_27000484_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_27000506_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000523;//kernel.PlainChar:523
    _this.onUpdate();
    //$LASTPOS=27000540;//kernel.PlainChar:540
    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
  },
  fiber$update :function _trc_func_27000506_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27000523;//kernel.PlainChar:523
    _this.onUpdate();
    
    _thread.enter(function _trc_func_27000506_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=27000540;//kernel.PlainChar:540
          Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onUpdate :function _trc_func_27000560_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  initSprite :function _trc_func_27000584_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000605;//kernel.PlainChar:605
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=27000657;//kernel.PlainChar:657
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=27000695;//kernel.PlainChar:695
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=27000727;//kernel.PlainChar:727
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_27000584_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27000605;//kernel.PlainChar:605
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=27000657;//kernel.PlainChar:657
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=27000695;//kernel.PlainChar:695
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_27000584_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=27000727;//kernel.PlainChar:727
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  tMain :function _trc_func_27000743_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000759;//kernel.PlainChar:759
    _this.main();
    //$LASTPOS=27000772;//kernel.PlainChar:772
    _this.die();
  },
  fiber$tMain :function _trc_func_27000743_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_27000743_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=27000759;//kernel.PlainChar:759
          _this.fiber$main(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=27000772;//kernel.PlainChar:772
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  color :function _trc_func_27000783_18(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_27000783_19(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_27000845_20(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=27000881;//kernel.PlainChar:881
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=27000906;//kernel.PlainChar:906
    if (! size) {
      //$LASTPOS=27000917;//kernel.PlainChar:917
      size=15;
    }
    //$LASTPOS=27000931;//kernel.PlainChar:931
    if (! col) {
      //$LASTPOS=27000941;//kernel.PlainChar:941
      col="cyan";
    }
    //$LASTPOS=27000958;//kernel.PlainChar:958
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=27001012;//kernel.PlainChar:1012
    if (tp.length>0) {
      //$LASTPOS=27001040;//kernel.PlainChar:1040
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=27001119;//kernel.PlainChar:1119
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_27000845_21(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=27000881;//kernel.PlainChar:881
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=27000906;//kernel.PlainChar:906
    if (! size) {
      //$LASTPOS=27000917;//kernel.PlainChar:917
      size=15;
    }
    //$LASTPOS=27000931;//kernel.PlainChar:931
    if (! col) {
      //$LASTPOS=27000941;//kernel.PlainChar:941
      col="cyan";
    }
    //$LASTPOS=27000958;//kernel.PlainChar:958
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=27001012;//kernel.PlainChar:1012
    if (tp.length>0) {
      //$LASTPOS=27001040;//kernel.PlainChar:1040
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=27001119;//kernel.PlainChar:1119
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_27001174_22(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=27001206;//kernel.PlainChar:1206
    if (! col) {
      //$LASTPOS=27001216;//kernel.PlainChar:1216
      col="white";
    }
    //$LASTPOS=27001234;//kernel.PlainChar:1234
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=27001288;//kernel.PlainChar:1288
    if (tp.length>0) {
      //$LASTPOS=27001316;//kernel.PlainChar:1316
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=27001367;//kernel.PlainChar:1367
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_27001174_23(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=27001206;//kernel.PlainChar:1206
    if (! col) {
      //$LASTPOS=27001216;//kernel.PlainChar:1216
      col="white";
    }
    //$LASTPOS=27001234;//kernel.PlainChar:1234
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=27001288;//kernel.PlainChar:1288
    if (tp.length>0) {
      //$LASTPOS=27001316;//kernel.PlainChar:1316
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=27001367;//kernel.PlainChar:1367
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  appear :function _trc_func_27001407_24(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return t;
  },
  fiber$appear :function _trc_func_27001407_25(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=t;return;
    
    
    _thread.retVal=_this;return;
  },
  trunc :function _trc_func_27001439_26(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.trunc(f);
  },
  loadPage :function _trc_func_27001482_27(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27001508;//kernel.PlainChar:1508
    _this.all().die();
    //$LASTPOS=27001526;//kernel.PlainChar:1526
    new page(arg);
    //$LASTPOS=27001546;//kernel.PlainChar:1546
    _this.die();
  },
  fiber$loadPage :function _trc_func_27001482_28(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27001508;//kernel.PlainChar:1508
    _this.all().die();
    //$LASTPOS=27001526;//kernel.PlainChar:1526
    new page(arg);
    //$LASTPOS=27001546;//kernel.PlainChar:1546
    _this.die();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_28000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_28000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_28000022_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_29000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_29000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_29000022_2(x,y,p,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=29000043;//kernel.SpriteChar:43
    Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
    //$LASTPOS=29000062;//kernel.SpriteChar:62
    _this.f=f;
    //$LASTPOS=29000077;//kernel.SpriteChar:77
    if (! _this.x) {
      //$LASTPOS=29000090;//kernel.SpriteChar:90
      _this.x=0;
    }
    //$LASTPOS=29000105;//kernel.SpriteChar:105
    if (! _this.y) {
      //$LASTPOS=29000118;//kernel.SpriteChar:118
      _this.y=0;
    }
    //$LASTPOS=29000133;//kernel.SpriteChar:133
    if (! _this.p) {
      //$LASTPOS=29000146;//kernel.SpriteChar:146
      _this.p=0;
    }
  },
  draw :function _trc_func_29000160_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=29000176;//kernel.SpriteChar:176
    if (_this.f) {
      //$LASTPOS=29000194;//kernel.SpriteChar:194
      if (! _this.scaleY) {
        //$LASTPOS=29000207;//kernel.SpriteChar:207
        _this.scaleY=_this.scaleX;
      }
      //$LASTPOS=29000231;//kernel.SpriteChar:231
      _this.scaleX*=- 1;
      
    }
    //$LASTPOS=29000255;//kernel.SpriteChar:255
    Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
    //$LASTPOS=29000275;//kernel.SpriteChar:275
    if (_this.f) {
      //$LASTPOS=29000282;//kernel.SpriteChar:282
      _this.scaleX*=- 1;
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SpriteChar,{"fullName":"kernel.SpriteChar","namespace":"kernel","shortName":"SpriteChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Line=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_30000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_30000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_30000016_2(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=30000034;//kernel.T1Line:34
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=30000065;//kernel.T1Line:65
    ctx.strokeStyle=_this.col;
    //$LASTPOS=30000091;//kernel.T1Line:91
    ctx.beginPath();
    //$LASTPOS=30000113;//kernel.T1Line:113
    ctx.moveTo(_this.x,_this.y);
    //$LASTPOS=30000135;//kernel.T1Line:135
    ctx.lineTo(_this.tx,_this.ty);
    //$LASTPOS=30000159;//kernel.T1Line:159
    ctx.stroke();
    //$LASTPOS=30000178;//kernel.T1Line:178
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Line,{"fullName":"kernel.T1Line","namespace":"kernel","shortName":"T1Line","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Map=Tonyu.klass(Tonyu.classes.kernel.Map,[],{
  main :function _trc_func_31000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_31000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_31000042_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=31000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
  },
  fiber$setBGColor :function _trc_func_31000042_3(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=31000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
    
    _thread.retVal=_this;return;
  },
  load :function _trc_func_31000091_4(fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var o;
    
    //$LASTPOS=31000469;//kernel.T1Map:469
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=31000512;//kernel.T1Map:512
    o = f.obj();
    //$LASTPOS=31000532;//kernel.T1Map:532
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=31000560;//kernel.T1Map:560
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=31000590;//kernel.T1Map:590
    _this.baseData=o.baseData;
    //$LASTPOS=31000616;//kernel.T1Map:616
    _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
    //$LASTPOS=31000658;//kernel.T1Map:658
    _this.mapData=_this.mapTable;
    //$LASTPOS=31000681;//kernel.T1Map:681
    _this.row=_this.mapTable.length;
    //$LASTPOS=31000707;//kernel.T1Map:707
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=31000736;//kernel.T1Map:736
    _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
    //$LASTPOS=31000780;//kernel.T1Map:780
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=31000813;//kernel.T1Map:813
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=31000885;//kernel.T1Map:885
    _this.initMap();
  },
  fiber$load :function _trc_func_31000091_5(_thread,fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var o;
    
    //$LASTPOS=31000469;//kernel.T1Map:469
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=31000512;//kernel.T1Map:512
    o = f.obj();
    //$LASTPOS=31000532;//kernel.T1Map:532
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=31000560;//kernel.T1Map:560
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=31000590;//kernel.T1Map:590
    _this.baseData=o.baseData;
    
    _thread.enter(function _trc_func_31000091_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=31000616;//kernel.T1Map:616
          _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
          __pc=1;return;
        case 1:
          _this.mapTable=_thread.retVal;
          
          //$LASTPOS=31000658;//kernel.T1Map:658
          _this.mapData=_this.mapTable;
          //$LASTPOS=31000681;//kernel.T1Map:681
          _this.row=_this.mapTable.length;
          //$LASTPOS=31000707;//kernel.T1Map:707
          _this.col=_this.mapTable[0].length;
          //$LASTPOS=31000736;//kernel.T1Map:736
          _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
          __pc=2;return;
        case 2:
          _this.mapOnTable=_thread.retVal;
          
          //$LASTPOS=31000780;//kernel.T1Map:780
          _this.mapOnData=_this.mapOnTable;
          //$LASTPOS=31000813;//kernel.T1Map:813
          _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
          //$LASTPOS=31000885;//kernel.T1Map:885
          _this.fiber$initMap(_thread);
          __pc=3;return;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  conv :function _trc_func_31000903_7(mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=31000926;//kernel.T1Map:926
    res = [];
    //$LASTPOS=31000943;//kernel.T1Map:943
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=31000973;//kernel.T1Map:973
      rrow = [];
      //$LASTPOS=31000995;//kernel.T1Map:995
      res.push(rrow);
      //$LASTPOS=31001020;//kernel.T1Map:1020
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=31001067;//kernel.T1Map:1067
        t = tbl[dat[0]];
        //$LASTPOS=31001099;//kernel.T1Map:1099
        if (t) {
          //$LASTPOS=31001106;//kernel.T1Map:1106
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=31001165;//kernel.T1Map:1165
          rrow.push(dat[1]);
        }
      });
    });
    return res;
  },
  fiber$conv :function _trc_func_31000903_8(_thread,mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=31000926;//kernel.T1Map:926
    res = [];
    //$LASTPOS=31000943;//kernel.T1Map:943
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=31000973;//kernel.T1Map:973
      rrow = [];
      //$LASTPOS=31000995;//kernel.T1Map:995
      res.push(rrow);
      //$LASTPOS=31001020;//kernel.T1Map:1020
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=31001067;//kernel.T1Map:1067
        t = tbl[dat[0]];
        //$LASTPOS=31001099;//kernel.T1Map:1099
        if (t) {
          //$LASTPOS=31001106;//kernel.T1Map:1106
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=31001165;//kernel.T1Map:1165
          rrow.push(dat[1]);
        }
      });
    });
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Map,{"fullName":"kernel.T1Map","namespace":"kernel","shortName":"T1Map","decls":{"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Page=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_32000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_32000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initGlobals :function _trc_func_32000022_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=32000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=32000103;//kernel.T1Page:103
    Tonyu.globals.$clBlack=_this.color(0,0,0);
    //$LASTPOS=32000131;//kernel.T1Page:131
    Tonyu.globals.$clRed=_this.color(255,0,0);
    //$LASTPOS=32000159;//kernel.T1Page:159
    Tonyu.globals.$clGreen=_this.color(0,255,0);
    //$LASTPOS=32000189;//kernel.T1Page:189
    Tonyu.globals.$clYellow=_this.color(255,255,0);
    //$LASTPOS=32000222;//kernel.T1Page:222
    Tonyu.globals.$clBlue=_this.color(0,0,255);
    //$LASTPOS=32000251;//kernel.T1Page:251
    Tonyu.globals.$clPink=_this.color(255,0,255);
    //$LASTPOS=32000282;//kernel.T1Page:282
    Tonyu.globals.$clAqua=_this.color(0,255,255);
    //$LASTPOS=32000313;//kernel.T1Page:313
    Tonyu.globals.$clWhite=_this.color(255,255,255);
    //$LASTPOS=32000347;//kernel.T1Page:347
    Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
  },
  fiber$initGlobals :function _trc_func_32000022_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=32000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=32000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    
    _thread.enter(function _trc_func_32000022_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=32000103;//kernel.T1Page:103
          _this.fiber$color(_thread, 0, 0, 0);
          __pc=1;return;
        case 1:
          Tonyu.globals.$clBlack=_thread.retVal;
          
          //$LASTPOS=32000131;//kernel.T1Page:131
          _this.fiber$color(_thread, 255, 0, 0);
          __pc=2;return;
        case 2:
          Tonyu.globals.$clRed=_thread.retVal;
          
          //$LASTPOS=32000159;//kernel.T1Page:159
          _this.fiber$color(_thread, 0, 255, 0);
          __pc=3;return;
        case 3:
          Tonyu.globals.$clGreen=_thread.retVal;
          
          //$LASTPOS=32000189;//kernel.T1Page:189
          _this.fiber$color(_thread, 255, 255, 0);
          __pc=4;return;
        case 4:
          Tonyu.globals.$clYellow=_thread.retVal;
          
          //$LASTPOS=32000222;//kernel.T1Page:222
          _this.fiber$color(_thread, 0, 0, 255);
          __pc=5;return;
        case 5:
          Tonyu.globals.$clBlue=_thread.retVal;
          
          //$LASTPOS=32000251;//kernel.T1Page:251
          _this.fiber$color(_thread, 255, 0, 255);
          __pc=6;return;
        case 6:
          Tonyu.globals.$clPink=_thread.retVal;
          
          //$LASTPOS=32000282;//kernel.T1Page:282
          _this.fiber$color(_thread, 0, 255, 255);
          __pc=7;return;
        case 7:
          Tonyu.globals.$clAqua=_thread.retVal;
          
          //$LASTPOS=32000313;//kernel.T1Page:313
          _this.fiber$color(_thread, 255, 255, 255);
          __pc=8;return;
        case 8:
          Tonyu.globals.$clWhite=_thread.retVal;
          
          //$LASTPOS=32000347;//kernel.T1Page:347
          Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Page,{"fullName":"kernel.T1Page","namespace":"kernel","shortName":"T1Page","decls":{"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Text=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_33000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_33000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_33000016_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=33000032;//kernel.T1Text:32
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=33000057;//kernel.T1Text:57
    c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=33000097;//kernel.T1Text:97
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    //$LASTPOS=33000117;//kernel.T1Text:117
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Text,{"fullName":"kernel.T1Text","namespace":"kernel","shortName":"T1Text","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_34000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_34000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_34000040_2(xx,yy,t,c,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000065;//kernel.TextChar:65
    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
    //$LASTPOS=34000084;//kernel.TextChar:84
    _this.text="";
    //$LASTPOS=34000098;//kernel.TextChar:98
    _this.col=Tonyu.globals.$clWhite;
    //$LASTPOS=34000117;//kernel.TextChar:117
    _this.size=20;
    //$LASTPOS=34000131;//kernel.TextChar:131
    if (! _this.x) {
      //$LASTPOS=34000144;//kernel.TextChar:144
      _this.x=0;
    }
    //$LASTPOS=34000159;//kernel.TextChar:159
    if (! _this.y) {
      //$LASTPOS=34000172;//kernel.TextChar:172
      _this.y=0;
    }
    //$LASTPOS=34000187;//kernel.TextChar:187
    if (t) {
      //$LASTPOS=34000194;//kernel.TextChar:194
      _this.text=t;
    }
    //$LASTPOS=34000207;//kernel.TextChar:207
    if (c) {
      //$LASTPOS=34000214;//kernel.TextChar:214
      _this.fillStyle=c;
    }
    //$LASTPOS=34000232;//kernel.TextChar:232
    if (s) {
      //$LASTPOS=34000239;//kernel.TextChar:239
      _this.size=s;
    }
  },
  draw :function _trc_func_34000251_3(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=34000269;//kernel.TextChar:269
    if (! _this.size) {
      //$LASTPOS=34000280;//kernel.TextChar:280
      _this.size=15;
    }
    //$LASTPOS=34000294;//kernel.TextChar:294
    if (! _this.align) {
      //$LASTPOS=34000306;//kernel.TextChar:306
      _this.align="left";
    }
    //$LASTPOS=34000325;//kernel.TextChar:325
    if (! _this.fillStyle) {
      //$LASTPOS=34000341;//kernel.TextChar:341
      _this.fillStyle="white";
    }
    //$LASTPOS=34000365;//kernel.TextChar:365
    ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=34000395;//kernel.TextChar:395
    ctx.globalAlpha=_this.alpha/255;
    //$LASTPOS=34000432;//kernel.TextChar:432
    ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=34000468;//kernel.TextChar:468
    rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
    //$LASTPOS=34000536;//kernel.TextChar:536
    _this.width=rect.w;
    //$LASTPOS=34000555;//kernel.TextChar:555
    _this.height=rect.h;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_35000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=35000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=35000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    //$LASTPOS=35000079;//kernel.MapEditor:79
    while (true) {
      //$LASTPOS=35000097;//kernel.MapEditor:97
      if (_this.getkey("y")>0) {
        //$LASTPOS=35000125;//kernel.MapEditor:125
        _this.loadMode=true;
        break;
        
        
      }
      //$LASTPOS=35000168;//kernel.MapEditor:168
      if (_this.getkey("n")>0) {
        //$LASTPOS=35000196;//kernel.MapEditor:196
        _this.loadMode=false;
        break;
        
        
      }
      //$LASTPOS=35000240;//kernel.MapEditor:240
      _this.update();
      
    }
    //$LASTPOS=35000254;//kernel.MapEditor:254
    if (_this.loadMode) {
      //$LASTPOS=35000273;//kernel.MapEditor:273
      _this.fileName=prompt("Input json file (*.json)","map.json");
      //$LASTPOS=35000334;//kernel.MapEditor:334
      if (_this.fileName) {
        //$LASTPOS=35000357;//kernel.MapEditor:357
        _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
        
      }
      //$LASTPOS=35000413;//kernel.MapEditor:413
      if (_this.mapDataFile.obj()) {
        //$LASTPOS=35000445;//kernel.MapEditor:445
        _this.baseData=_this.mapDataFile.obj();
        
      } else {
        //$LASTPOS=35000494;//kernel.MapEditor:494
        _this.mapDataFile=_this.file(_this.fileName);
        //$LASTPOS=35000531;//kernel.MapEditor:531
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=35000567;//kernel.MapEditor:567
          _this.baseData=_this.mapDataFile.obj();
          
        }
        
      }
      //$LASTPOS=35000618;//kernel.MapEditor:618
      if (_this.baseData==undefined) {
        //$LASTPOS=35000652;//kernel.MapEditor:652
        _this.print("Load failed");
        //$LASTPOS=35000683;//kernel.MapEditor:683
        _this.loadMode=false;
        
      } else {
        //$LASTPOS=35000710;//kernel.MapEditor:710
        if (_this.baseData[0]&&_this.baseData[1]) {
          //$LASTPOS=35000751;//kernel.MapEditor:751
          _this.mapData=_this.baseData[0];
          //$LASTPOS=35000781;//kernel.MapEditor:781
          _this.mapOnData=_this.baseData[1];
          
        }
      }
      
    }
    //$LASTPOS=35000815;//kernel.MapEditor:815
    _this.update();
    //$LASTPOS=35001093;//kernel.MapEditor:1093
    if (! _this.loadMode) {
      //$LASTPOS=35001113;//kernel.MapEditor:1113
      _this.row=prompt("input row");
      //$LASTPOS=35001143;//kernel.MapEditor:1143
      _this.update();
      //$LASTPOS=35001158;//kernel.MapEditor:1158
      _this.col=prompt("input col");
      //$LASTPOS=35001188;//kernel.MapEditor:1188
      _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
      //$LASTPOS=35001238;//kernel.MapEditor:1238
      _this.panel.x=_this.panel.width/2+10;
      //$LASTPOS=35001269;//kernel.MapEditor:1269
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=35001298;//kernel.MapEditor:1298
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=35001331;//kernel.MapEditor:1331
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      //$LASTPOS=35001382;//kernel.MapEditor:1382
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
      
    } else {
      //$LASTPOS=35001445;//kernel.MapEditor:1445
      if (! _this.mapOnData) {
        //$LASTPOS=35001470;//kernel.MapEditor:1470
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
        
      } else {
        //$LASTPOS=35001582;//kernel.MapEditor:1582
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
        
      }
      //$LASTPOS=35001695;//kernel.MapEditor:1695
      _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
      //$LASTPOS=35001766;//kernel.MapEditor:1766
      _this.panel.x=_this.panel.width/2;
      //$LASTPOS=35001794;//kernel.MapEditor:1794
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=35001823;//kernel.MapEditor:1823
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=35001856;//kernel.MapEditor:1856
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      
    }
    //$LASTPOS=35001906;//kernel.MapEditor:1906
    Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
    //$LASTPOS=35001961;//kernel.MapEditor:1961
    _this.counter=0;
    //$LASTPOS=35001973;//kernel.MapEditor:1973
    //$LASTPOS=35001977;//kernel.MapEditor:1977
    i = 0;
    while(i<16) {
      {
        //$LASTPOS=35002001;//kernel.MapEditor:2001
        //$LASTPOS=35002005;//kernel.MapEditor:2005
        j = 0;
        while(j<8) {
          {
            //$LASTPOS=35002032;//kernel.MapEditor:2032
            Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
            //$LASTPOS=35002076;//kernel.MapEditor:2076
            _this.counter++;
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=35002098;//kernel.MapEditor:2098
    _this.mode="get";
    //$LASTPOS=35002111;//kernel.MapEditor:2111
    _this.prevMode="set";
    //$LASTPOS=35002128;//kernel.MapEditor:2128
    _this.mapp=0;
    //$LASTPOS=35002137;//kernel.MapEditor:2137
    _this.mx=0;
    //$LASTPOS=35002144;//kernel.MapEditor:2144
    _this.my=0;
    //$LASTPOS=35002151;//kernel.MapEditor:2151
    _this.chipX=0;
    //$LASTPOS=35002161;//kernel.MapEditor:2161
    _this.chipY=0;
    //$LASTPOS=35002171;//kernel.MapEditor:2171
    _this.x=Tonyu.globals.$screenWidth-16;
    //$LASTPOS=35002191;//kernel.MapEditor:2191
    _this.y=Tonyu.globals.$screenHeight-16;
    //$LASTPOS=35002212;//kernel.MapEditor:2212
    while (true) {
      //$LASTPOS=35002230;//kernel.MapEditor:2230
      _this.p=_this.mapp;
      //$LASTPOS=35002243;//kernel.MapEditor:2243
      if (_this.getkey("e")==1) {
        //$LASTPOS=35002272;//kernel.MapEditor:2272
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=35002306;//kernel.MapEditor:2306
        _this.mode="erase";
        //$LASTPOS=35002329;//kernel.MapEditor:2329
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=35002362;//kernel.MapEditor:2362
      if (_this.getkey("s")==1) {
        //$LASTPOS=35002391;//kernel.MapEditor:2391
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=35002425;//kernel.MapEditor:2425
        if (_this.mode=="set") {
          //$LASTPOS=35002455;//kernel.MapEditor:2455
          _this.mode="setOn";
          
        } else {
          //$LASTPOS=35002498;//kernel.MapEditor:2498
          _this.mode="set";
          
        }
        //$LASTPOS=35002530;//kernel.MapEditor:2530
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=35002563;//kernel.MapEditor:2563
      if (_this.getkey("o")==1) {
        //$LASTPOS=35002592;//kernel.MapEditor:2592
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=35002626;//kernel.MapEditor:2626
        _this.mode="setOn";
        
      }
      //$LASTPOS=35002652;//kernel.MapEditor:2652
      if (_this.getkey("g")==1) {
        //$LASTPOS=35002681;//kernel.MapEditor:2681
        if (_this.mode!="get") {
          //$LASTPOS=35002711;//kernel.MapEditor:2711
          _this.prevMode=_this.mode;
          //$LASTPOS=35002739;//kernel.MapEditor:2739
          Tonyu.globals.$mp.scrollTo(0,0);
          //$LASTPOS=35002771;//kernel.MapEditor:2771
          _this.mode="get";
          //$LASTPOS=35002796;//kernel.MapEditor:2796
          _this.chipX=0;
          //$LASTPOS=35002818;//kernel.MapEditor:2818
          _this.chipY=0;
          
        } else {
          //$LASTPOS=35002856;//kernel.MapEditor:2856
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=35002894;//kernel.MapEditor:2894
          _this.mode=_this.prevMode;
          
        }
        //$LASTPOS=35002929;//kernel.MapEditor:2929
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=35002962;//kernel.MapEditor:2962
      if (_this.getkey("p")==1) {
        //$LASTPOS=35003006;//kernel.MapEditor:3006
        _this.saveFileName=prompt("input json file(*.json)","map.json");
        //$LASTPOS=35003495;//kernel.MapEditor:3495
        _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
        //$LASTPOS=35003553;//kernel.MapEditor:3553
        _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
        //$LASTPOS=35003668;//kernel.MapEditor:3668
        _this.saveDataFile.obj(_this.data);
        //$LASTPOS=35003701;//kernel.MapEditor:3701
        _this.print(_this.saveFileName+" Saved");
        
      }
      //$LASTPOS=35003793;//kernel.MapEditor:3793
      if (_this.getkey("c")==1) {
        //$LASTPOS=35003822;//kernel.MapEditor:3822
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=35003856;//kernel.MapEditor:3856
        _this.mode="spuit";
        //$LASTPOS=35003879;//kernel.MapEditor:3879
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=35003912;//kernel.MapEditor:3912
      if (_this.mode!="get") {
        //$LASTPOS=35003938;//kernel.MapEditor:3938
        if (_this.getkey("left")>0) {
          //$LASTPOS=35003959;//kernel.MapEditor:3959
          _this.mx=_this.mx+8;
        }
        //$LASTPOS=35003977;//kernel.MapEditor:3977
        if (_this.getkey("right")>0) {
          //$LASTPOS=35003999;//kernel.MapEditor:3999
          _this.mx=_this.mx-8;
        }
        //$LASTPOS=35004017;//kernel.MapEditor:4017
        if (_this.getkey("up")>0) {
          //$LASTPOS=35004036;//kernel.MapEditor:4036
          _this.my=_this.my+8;
        }
        //$LASTPOS=35004054;//kernel.MapEditor:4054
        if (_this.getkey("down")>0) {
          //$LASTPOS=35004075;//kernel.MapEditor:4075
          _this.my=_this.my-8;
        }
        //$LASTPOS=35004093;//kernel.MapEditor:4093
        Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
        
      } else {
        //$LASTPOS=35004136;//kernel.MapEditor:4136
        if (_this.getkey("left")>0) {
          //$LASTPOS=35004157;//kernel.MapEditor:4157
          _this.chipX=_this.chipX+8;
        }
        //$LASTPOS=35004181;//kernel.MapEditor:4181
        if (_this.getkey("right")>0) {
          //$LASTPOS=35004203;//kernel.MapEditor:4203
          _this.chipX=_this.chipX-8;
        }
        //$LASTPOS=35004227;//kernel.MapEditor:4227
        if (_this.getkey("up")>0) {
          //$LASTPOS=35004246;//kernel.MapEditor:4246
          _this.chipY=_this.chipY+8;
        }
        //$LASTPOS=35004270;//kernel.MapEditor:4270
        if (_this.getkey("down")>0) {
          //$LASTPOS=35004291;//kernel.MapEditor:4291
          _this.chipY=_this.chipY-8;
        }
        //$LASTPOS=35004315;//kernel.MapEditor:4315
        Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
        
      }
      //$LASTPOS=35004354;//kernel.MapEditor:4354
      _this.panel.x=_this.panel.width/2-_this.mx;
      //$LASTPOS=35004385;//kernel.MapEditor:4385
      _this.panel.y=_this.panel.height/2-_this.my;
      //$LASTPOS=35004417;//kernel.MapEditor:4417
      if (_this.mode=="set"&&_this.getkey(1)>0) {
        //$LASTPOS=35004458;//kernel.MapEditor:4458
        Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
        //$LASTPOS=35004507;//kernel.MapEditor:4507
        Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
        
      } else {
        //$LASTPOS=35004558;//kernel.MapEditor:4558
        if (_this.mode=="erase"&&_this.getkey(1)>0) {
          //$LASTPOS=35004601;//kernel.MapEditor:4601
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=35004650;//kernel.MapEditor:4650
          if (_this.mode=="get"&&_this.getkey(1)>0) {
            //$LASTPOS=35004691;//kernel.MapEditor:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=35004745;//kernel.MapEditor:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=35004769;//kernel.MapEditor:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=35004803;//kernel.MapEditor:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=35004833;//kernel.MapEditor:4833
            _this.updateEx(10);
            
          } else {
            //$LASTPOS=35004858;//kernel.MapEditor:4858
            if (_this.mode=="setOn"&&_this.getkey(1)>0) {
              //$LASTPOS=35004901;//kernel.MapEditor:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=35004954;//kernel.MapEditor:4954
              if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                //$LASTPOS=35004997;//kernel.MapEditor:4997
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=35005046;//kernel.MapEditor:5046
                _this.mode="set";
                //$LASTPOS=35005067;//kernel.MapEditor:5067
                _this.print(_this.mode+" mode");
                //$LASTPOS=35005097;//kernel.MapEditor:5097
                _this.updateEx(10);
                
              }
            }
          }
        }
      }
      //$LASTPOS=35005123;//kernel.MapEditor:5123
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_35000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=35000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=35000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    
    _thread.enter(function _trc_func_35000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000079;//kernel.MapEditor:79
        case 1:
          //$LASTPOS=35000097;//kernel.MapEditor:97
          if (!(_this.getkey("y")>0)) { __pc=2; break; }
          //$LASTPOS=35000125;//kernel.MapEditor:125
          _this.loadMode=true;
          __pc=5; break;
          
        case 2:
          
          //$LASTPOS=35000168;//kernel.MapEditor:168
          if (!(_this.getkey("n")>0)) { __pc=3; break; }
          //$LASTPOS=35000196;//kernel.MapEditor:196
          _this.loadMode=false;
          __pc=5; break;
          
        case 3:
          
          //$LASTPOS=35000240;//kernel.MapEditor:240
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=1;break;
        case 5:
          
          //$LASTPOS=35000254;//kernel.MapEditor:254
          if (!(_this.loadMode)) { __pc=9; break; }
          //$LASTPOS=35000273;//kernel.MapEditor:273
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=35000334;//kernel.MapEditor:334
          if (_this.fileName) {
            //$LASTPOS=35000357;//kernel.MapEditor:357
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=35000413;//kernel.MapEditor:413
          if (!(_this.mapDataFile.obj())) { __pc=6; break; }
          {
            //$LASTPOS=35000445;//kernel.MapEditor:445
            _this.baseData=_this.mapDataFile.obj();
          }
          __pc=8;break;
        case 6:
          //$LASTPOS=35000494;//kernel.MapEditor:494
          _this.fiber$file(_thread, _this.fileName);
          __pc=7;return;
        case 7:
          _this.mapDataFile=_thread.retVal;
          
          //$LASTPOS=35000531;//kernel.MapEditor:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=35000567;//kernel.MapEditor:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
        case 8:
          
          //$LASTPOS=35000618;//kernel.MapEditor:618
          if (_this.baseData==undefined) {
            //$LASTPOS=35000652;//kernel.MapEditor:652
            _this.print("Load failed");
            //$LASTPOS=35000683;//kernel.MapEditor:683
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=35000710;//kernel.MapEditor:710
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=35000751;//kernel.MapEditor:751
              _this.mapData=_this.baseData[0];
              //$LASTPOS=35000781;//kernel.MapEditor:781
              _this.mapOnData=_this.baseData[1];
              
            }
          }
        case 9:
          
          //$LASTPOS=35000815;//kernel.MapEditor:815
          _this.fiber$update(_thread);
          __pc=10;return;
        case 10:
          
          //$LASTPOS=35001093;//kernel.MapEditor:1093
          if (!(! _this.loadMode)) { __pc=12; break; }
          //$LASTPOS=35001113;//kernel.MapEditor:1113
          _this.row=prompt("input row");
          //$LASTPOS=35001143;//kernel.MapEditor:1143
          _this.fiber$update(_thread);
          __pc=11;return;
        case 11:
          
          //$LASTPOS=35001158;//kernel.MapEditor:1158
          _this.col=prompt("input col");
          //$LASTPOS=35001188;//kernel.MapEditor:1188
          _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
          //$LASTPOS=35001238;//kernel.MapEditor:1238
          _this.panel.x=_this.panel.width/2+10;
          //$LASTPOS=35001269;//kernel.MapEditor:1269
          _this.panel.y=_this.panel.height/2;
          //$LASTPOS=35001298;//kernel.MapEditor:1298
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=35001331;//kernel.MapEditor:1331
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          //$LASTPOS=35001382;//kernel.MapEditor:1382
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
          __pc=13;break;
        case 12:
          {
            //$LASTPOS=35001445;//kernel.MapEditor:1445
            if (! _this.mapOnData) {
              //$LASTPOS=35001470;//kernel.MapEditor:1470
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
              
            } else {
              //$LASTPOS=35001582;//kernel.MapEditor:1582
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
              
            }
            //$LASTPOS=35001695;//kernel.MapEditor:1695
            _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
            //$LASTPOS=35001766;//kernel.MapEditor:1766
            _this.panel.x=_this.panel.width/2;
            //$LASTPOS=35001794;//kernel.MapEditor:1794
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=35001823;//kernel.MapEditor:1823
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=35001856;//kernel.MapEditor:1856
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          }
        case 13:
          
          //$LASTPOS=35001906;//kernel.MapEditor:1906
          Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
          //$LASTPOS=35001961;//kernel.MapEditor:1961
          _this.counter=0;
          //$LASTPOS=35001973;//kernel.MapEditor:1973
          //$LASTPOS=35001977;//kernel.MapEditor:1977
          i = 0;
          while(i<16) {
            {
              //$LASTPOS=35002001;//kernel.MapEditor:2001
              //$LASTPOS=35002005;//kernel.MapEditor:2005
              j = 0;
              while(j<8) {
                {
                  //$LASTPOS=35002032;//kernel.MapEditor:2032
                  Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                  //$LASTPOS=35002076;//kernel.MapEditor:2076
                  _this.counter++;
                }
                j++;
              }
            }
            i++;
          }
          //$LASTPOS=35002098;//kernel.MapEditor:2098
          _this.mode="get";
          //$LASTPOS=35002111;//kernel.MapEditor:2111
          _this.prevMode="set";
          //$LASTPOS=35002128;//kernel.MapEditor:2128
          _this.mapp=0;
          //$LASTPOS=35002137;//kernel.MapEditor:2137
          _this.mx=0;
          //$LASTPOS=35002144;//kernel.MapEditor:2144
          _this.my=0;
          //$LASTPOS=35002151;//kernel.MapEditor:2151
          _this.chipX=0;
          //$LASTPOS=35002161;//kernel.MapEditor:2161
          _this.chipY=0;
          //$LASTPOS=35002171;//kernel.MapEditor:2171
          _this.x=Tonyu.globals.$screenWidth-16;
          //$LASTPOS=35002191;//kernel.MapEditor:2191
          _this.y=Tonyu.globals.$screenHeight-16;
          //$LASTPOS=35002212;//kernel.MapEditor:2212
        case 14:
          //$LASTPOS=35002230;//kernel.MapEditor:2230
          _this.p=_this.mapp;
          //$LASTPOS=35002243;//kernel.MapEditor:2243
          if (_this.getkey("e")==1) {
            //$LASTPOS=35002272;//kernel.MapEditor:2272
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=35002306;//kernel.MapEditor:2306
            _this.mode="erase";
            //$LASTPOS=35002329;//kernel.MapEditor:2329
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=35002362;//kernel.MapEditor:2362
          if (_this.getkey("s")==1) {
            //$LASTPOS=35002391;//kernel.MapEditor:2391
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=35002425;//kernel.MapEditor:2425
            if (_this.mode=="set") {
              //$LASTPOS=35002455;//kernel.MapEditor:2455
              _this.mode="setOn";
              
            } else {
              //$LASTPOS=35002498;//kernel.MapEditor:2498
              _this.mode="set";
              
            }
            //$LASTPOS=35002530;//kernel.MapEditor:2530
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=35002563;//kernel.MapEditor:2563
          if (_this.getkey("o")==1) {
            //$LASTPOS=35002592;//kernel.MapEditor:2592
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=35002626;//kernel.MapEditor:2626
            _this.mode="setOn";
            
          }
          //$LASTPOS=35002652;//kernel.MapEditor:2652
          if (_this.getkey("g")==1) {
            //$LASTPOS=35002681;//kernel.MapEditor:2681
            if (_this.mode!="get") {
              //$LASTPOS=35002711;//kernel.MapEditor:2711
              _this.prevMode=_this.mode;
              //$LASTPOS=35002739;//kernel.MapEditor:2739
              Tonyu.globals.$mp.scrollTo(0,0);
              //$LASTPOS=35002771;//kernel.MapEditor:2771
              _this.mode="get";
              //$LASTPOS=35002796;//kernel.MapEditor:2796
              _this.chipX=0;
              //$LASTPOS=35002818;//kernel.MapEditor:2818
              _this.chipY=0;
              
            } else {
              //$LASTPOS=35002856;//kernel.MapEditor:2856
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=35002894;//kernel.MapEditor:2894
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=35002929;//kernel.MapEditor:2929
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=35002962;//kernel.MapEditor:2962
          if (_this.getkey("p")==1) {
            //$LASTPOS=35003006;//kernel.MapEditor:3006
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            //$LASTPOS=35003495;//kernel.MapEditor:3495
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=35003553;//kernel.MapEditor:3553
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
            //$LASTPOS=35003668;//kernel.MapEditor:3668
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=35003701;//kernel.MapEditor:3701
            _this.print(_this.saveFileName+" Saved");
            
          }
          //$LASTPOS=35003793;//kernel.MapEditor:3793
          if (_this.getkey("c")==1) {
            //$LASTPOS=35003822;//kernel.MapEditor:3822
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=35003856;//kernel.MapEditor:3856
            _this.mode="spuit";
            //$LASTPOS=35003879;//kernel.MapEditor:3879
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=35003912;//kernel.MapEditor:3912
          if (_this.mode!="get") {
            //$LASTPOS=35003938;//kernel.MapEditor:3938
            if (_this.getkey("left")>0) {
              //$LASTPOS=35003959;//kernel.MapEditor:3959
              _this.mx=_this.mx+8;
            }
            //$LASTPOS=35003977;//kernel.MapEditor:3977
            if (_this.getkey("right")>0) {
              //$LASTPOS=35003999;//kernel.MapEditor:3999
              _this.mx=_this.mx-8;
            }
            //$LASTPOS=35004017;//kernel.MapEditor:4017
            if (_this.getkey("up")>0) {
              //$LASTPOS=35004036;//kernel.MapEditor:4036
              _this.my=_this.my+8;
            }
            //$LASTPOS=35004054;//kernel.MapEditor:4054
            if (_this.getkey("down")>0) {
              //$LASTPOS=35004075;//kernel.MapEditor:4075
              _this.my=_this.my-8;
            }
            //$LASTPOS=35004093;//kernel.MapEditor:4093
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            
          } else {
            //$LASTPOS=35004136;//kernel.MapEditor:4136
            if (_this.getkey("left")>0) {
              //$LASTPOS=35004157;//kernel.MapEditor:4157
              _this.chipX=_this.chipX+8;
            }
            //$LASTPOS=35004181;//kernel.MapEditor:4181
            if (_this.getkey("right")>0) {
              //$LASTPOS=35004203;//kernel.MapEditor:4203
              _this.chipX=_this.chipX-8;
            }
            //$LASTPOS=35004227;//kernel.MapEditor:4227
            if (_this.getkey("up")>0) {
              //$LASTPOS=35004246;//kernel.MapEditor:4246
              _this.chipY=_this.chipY+8;
            }
            //$LASTPOS=35004270;//kernel.MapEditor:4270
            if (_this.getkey("down")>0) {
              //$LASTPOS=35004291;//kernel.MapEditor:4291
              _this.chipY=_this.chipY-8;
            }
            //$LASTPOS=35004315;//kernel.MapEditor:4315
            Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
            
          }
          //$LASTPOS=35004354;//kernel.MapEditor:4354
          _this.panel.x=_this.panel.width/2-_this.mx;
          //$LASTPOS=35004385;//kernel.MapEditor:4385
          _this.panel.y=_this.panel.height/2-_this.my;
          //$LASTPOS=35004417;//kernel.MapEditor:4417
          if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
          {
            //$LASTPOS=35004458;//kernel.MapEditor:4458
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=35004507;//kernel.MapEditor:4507
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=25;break;
        case 15:
          //$LASTPOS=35004558;//kernel.MapEditor:4558
          if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
          {
            //$LASTPOS=35004601;//kernel.MapEditor:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=24;break;
        case 16:
          //$LASTPOS=35004650;//kernel.MapEditor:4650
          if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
          //$LASTPOS=35004691;//kernel.MapEditor:4691
          _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
          //$LASTPOS=35004745;//kernel.MapEditor:4745
          _this.mode=_this.prevMode;
          //$LASTPOS=35004769;//kernel.MapEditor:4769
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=35004803;//kernel.MapEditor:4803
          _this.print(_this.mode+" mode");
          //$LASTPOS=35004833;//kernel.MapEditor:4833
          _this.fiber$updateEx(_thread, 10);
          __pc=17;return;
        case 17:
          
          __pc=23;break;
        case 18:
          //$LASTPOS=35004858;//kernel.MapEditor:4858
          if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
          {
            //$LASTPOS=35004901;//kernel.MapEditor:4901
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          }
          __pc=22;break;
        case 19:
          //$LASTPOS=35004954;//kernel.MapEditor:4954
          if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
          //$LASTPOS=35004997;//kernel.MapEditor:4997
          _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
          //$LASTPOS=35005046;//kernel.MapEditor:5046
          _this.mode="set";
          //$LASTPOS=35005067;//kernel.MapEditor:5067
          _this.print(_this.mode+" mode");
          //$LASTPOS=35005097;//kernel.MapEditor:5097
          _this.fiber$updateEx(_thread, 10);
          __pc=20;return;
        case 20:
          
        case 21:
          
        case 22:
          
        case 23:
          
        case 24:
          
        case 25:
          
          //$LASTPOS=35005123;//kernel.MapEditor:5123
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MapEditor,{"fullName":"kernel.MapEditor","namespace":"kernel","shortName":"MapEditor","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Pad=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_36000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    //$LASTPOS=36003465;//kernel.Pad:3465
    while (true) {
      //$LASTPOS=36003484;//kernel.Pad:3484
      _this.padUpdate();
      //$LASTPOS=36003502;//kernel.Pad:3502
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_36000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=36001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    
    _thread.enter(function _trc_func_36000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=36003465;//kernel.Pad:3465
        case 1:
          //$LASTPOS=36003484;//kernel.Pad:3484
          _this.fiber$padUpdate(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=36003502;//kernel.Pad:3502
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
  initialize :function _trc_func_36000016_3(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36000033;//kernel.Pad:33
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=36000050;//kernel.Pad:50
    _this.padImageP=Tonyu.globals.$pat_inputPad;
    //$LASTPOS=36000082;//kernel.Pad:82
    _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000183;//kernel.Pad:183
    _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000292;//kernel.Pad:292
    _this.jujiKey.show();
    //$LASTPOS=36000313;//kernel.Pad:313
    _this.no1Key.show();
    //$LASTPOS=36000339;//kernel.Pad:339
    _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000446;//kernel.Pad:446
    _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000553;//kernel.Pad:553
    _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000660;//kernel.Pad:660
    _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000767;//kernel.Pad:767
    _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=36000879;//kernel.Pad:879
    _this.jujiKeyPushU.hide();
    //$LASTPOS=36000905;//kernel.Pad:905
    _this.jujiKeyPushL.hide();
    //$LASTPOS=36000931;//kernel.Pad:931
    _this.jujiKeyPushR.hide();
    //$LASTPOS=36000957;//kernel.Pad:957
    _this.jujiKeyPushD.hide();
    //$LASTPOS=36000983;//kernel.Pad:983
    _this.jujiKeyPush1.hide();
  },
  die :function _trc_func_36001008_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36001021;//kernel.Pad:1021
    _this.jujiKey.die();
    //$LASTPOS=36001041;//kernel.Pad:1041
    _this.no1Key.die();
    //$LASTPOS=36001060;//kernel.Pad:1060
    _this.jujiKeyPushU.die();
    //$LASTPOS=36001085;//kernel.Pad:1085
    _this.jujiKeyPushL.die();
    //$LASTPOS=36001110;//kernel.Pad:1110
    _this.jujiKeyPushR.die();
    //$LASTPOS=36001135;//kernel.Pad:1135
    _this.jujiKeyPushD.die();
    //$LASTPOS=36001160;//kernel.Pad:1160
    _this.jujiKeyPush1.die();
    //$LASTPOS=36001185;//kernel.Pad:1185
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
  },
  padUpdate :function _trc_func_36001224_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var t;
    
    //$LASTPOS=36001258;//kernel.Pad:1258
    _this.keyPushL=0;
    //$LASTPOS=36001277;//kernel.Pad:1277
    _this.keyPushR=0;
    //$LASTPOS=36001296;//kernel.Pad:1296
    _this.keyPushU=0;
    //$LASTPOS=36001315;//kernel.Pad:1315
    _this.keyPushD=0;
    //$LASTPOS=36001334;//kernel.Pad:1334
    _this.keyPush1=0;
    //$LASTPOS=36001359;//kernel.Pad:1359
    _this.padKeyNotapCnt++;
    //$LASTPOS=36001383;//kernel.Pad:1383
    //$LASTPOS=36001388;//kernel.Pad:1388
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=36001436;//kernel.Pad:1436
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=36001466;//kernel.Pad:1466
        if (t.touched) {
          //$LASTPOS=36001496;//kernel.Pad:1496
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=36001593;//kernel.Pad:1593
            _this.keyPushU=1;
          }
          //$LASTPOS=36001620;//kernel.Pad:1620
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=36001717;//kernel.Pad:1717
            _this.keyPushD=1;
          }
          //$LASTPOS=36001744;//kernel.Pad:1744
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=36001841;//kernel.Pad:1841
            _this.keyPushL=1;
          }
          //$LASTPOS=36001868;//kernel.Pad:1868
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=36001965;//kernel.Pad:1965
            _this.keyPushR=1;
          }
          //$LASTPOS=36001992;//kernel.Pad:1992
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=36002054;//kernel.Pad:2054
            _this.keyPush1=1;
          }
          //$LASTPOS=36002081;//kernel.Pad:2081
          _this.padKeySW=1;
          //$LASTPOS=36002108;//kernel.Pad:2108
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=36002173;//kernel.Pad:2173
    if (_this.keyPushL) {
      //$LASTPOS=36002187;//kernel.Pad:2187
      _this.keyCntL++;
    } else {
      //$LASTPOS=36002204;//kernel.Pad:2204
      _this.keyCntL=0;
    }
    //$LASTPOS=36002222;//kernel.Pad:2222
    if (_this.keyPushR) {
      //$LASTPOS=36002236;//kernel.Pad:2236
      _this.keyCntR++;
    } else {
      //$LASTPOS=36002253;//kernel.Pad:2253
      _this.keyCntR=0;
    }
    //$LASTPOS=36002271;//kernel.Pad:2271
    if (_this.keyPushU) {
      //$LASTPOS=36002285;//kernel.Pad:2285
      _this.keyCntU++;
    } else {
      //$LASTPOS=36002302;//kernel.Pad:2302
      _this.keyCntU=0;
    }
    //$LASTPOS=36002320;//kernel.Pad:2320
    if (_this.keyPushD) {
      //$LASTPOS=36002334;//kernel.Pad:2334
      _this.keyCntD++;
    } else {
      //$LASTPOS=36002351;//kernel.Pad:2351
      _this.keyCntD=0;
    }
    //$LASTPOS=36002369;//kernel.Pad:2369
    if (_this.keyPush1) {
      //$LASTPOS=36002383;//kernel.Pad:2383
      _this.keyCnt1++;
    } else {
      //$LASTPOS=36002400;//kernel.Pad:2400
      _this.keyCnt1=0;
    }
    //$LASTPOS=36002435;//kernel.Pad:2435
    if (_this.keyPushL) {
      //$LASTPOS=36002449;//kernel.Pad:2449
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=36002475;//kernel.Pad:2475
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=36002501;//kernel.Pad:2501
    if (_this.keyPushR) {
      //$LASTPOS=36002515;//kernel.Pad:2515
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=36002541;//kernel.Pad:2541
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=36002567;//kernel.Pad:2567
    if (_this.keyPushU) {
      //$LASTPOS=36002581;//kernel.Pad:2581
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=36002607;//kernel.Pad:2607
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=36002633;//kernel.Pad:2633
    if (_this.keyPushD) {
      //$LASTPOS=36002647;//kernel.Pad:2647
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=36002673;//kernel.Pad:2673
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=36002699;//kernel.Pad:2699
    if (_this.keyPush1) {
      //$LASTPOS=36002713;//kernel.Pad:2713
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=36002739;//kernel.Pad:2739
      _this.jujiKeyPush1.hide();
    }
  },
  fiber$padUpdate :function _trc_func_36001224_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var t;
    
    //$LASTPOS=36001258;//kernel.Pad:1258
    _this.keyPushL=0;
    //$LASTPOS=36001277;//kernel.Pad:1277
    _this.keyPushR=0;
    //$LASTPOS=36001296;//kernel.Pad:1296
    _this.keyPushU=0;
    //$LASTPOS=36001315;//kernel.Pad:1315
    _this.keyPushD=0;
    //$LASTPOS=36001334;//kernel.Pad:1334
    _this.keyPush1=0;
    //$LASTPOS=36001359;//kernel.Pad:1359
    _this.padKeyNotapCnt++;
    //$LASTPOS=36001383;//kernel.Pad:1383
    //$LASTPOS=36001388;//kernel.Pad:1388
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=36001436;//kernel.Pad:1436
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=36001466;//kernel.Pad:1466
        if (t.touched) {
          //$LASTPOS=36001496;//kernel.Pad:1496
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=36001593;//kernel.Pad:1593
            _this.keyPushU=1;
          }
          //$LASTPOS=36001620;//kernel.Pad:1620
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=36001717;//kernel.Pad:1717
            _this.keyPushD=1;
          }
          //$LASTPOS=36001744;//kernel.Pad:1744
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=36001841;//kernel.Pad:1841
            _this.keyPushL=1;
          }
          //$LASTPOS=36001868;//kernel.Pad:1868
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=36001965;//kernel.Pad:1965
            _this.keyPushR=1;
          }
          //$LASTPOS=36001992;//kernel.Pad:1992
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=36002054;//kernel.Pad:2054
            _this.keyPush1=1;
          }
          //$LASTPOS=36002081;//kernel.Pad:2081
          _this.padKeySW=1;
          //$LASTPOS=36002108;//kernel.Pad:2108
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=36002173;//kernel.Pad:2173
    if (_this.keyPushL) {
      //$LASTPOS=36002187;//kernel.Pad:2187
      _this.keyCntL++;
    } else {
      //$LASTPOS=36002204;//kernel.Pad:2204
      _this.keyCntL=0;
    }
    //$LASTPOS=36002222;//kernel.Pad:2222
    if (_this.keyPushR) {
      //$LASTPOS=36002236;//kernel.Pad:2236
      _this.keyCntR++;
    } else {
      //$LASTPOS=36002253;//kernel.Pad:2253
      _this.keyCntR=0;
    }
    //$LASTPOS=36002271;//kernel.Pad:2271
    if (_this.keyPushU) {
      //$LASTPOS=36002285;//kernel.Pad:2285
      _this.keyCntU++;
    } else {
      //$LASTPOS=36002302;//kernel.Pad:2302
      _this.keyCntU=0;
    }
    //$LASTPOS=36002320;//kernel.Pad:2320
    if (_this.keyPushD) {
      //$LASTPOS=36002334;//kernel.Pad:2334
      _this.keyCntD++;
    } else {
      //$LASTPOS=36002351;//kernel.Pad:2351
      _this.keyCntD=0;
    }
    //$LASTPOS=36002369;//kernel.Pad:2369
    if (_this.keyPush1) {
      //$LASTPOS=36002383;//kernel.Pad:2383
      _this.keyCnt1++;
    } else {
      //$LASTPOS=36002400;//kernel.Pad:2400
      _this.keyCnt1=0;
    }
    //$LASTPOS=36002435;//kernel.Pad:2435
    if (_this.keyPushL) {
      //$LASTPOS=36002449;//kernel.Pad:2449
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=36002475;//kernel.Pad:2475
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=36002501;//kernel.Pad:2501
    if (_this.keyPushR) {
      //$LASTPOS=36002515;//kernel.Pad:2515
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=36002541;//kernel.Pad:2541
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=36002567;//kernel.Pad:2567
    if (_this.keyPushU) {
      //$LASTPOS=36002581;//kernel.Pad:2581
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=36002607;//kernel.Pad:2607
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=36002633;//kernel.Pad:2633
    if (_this.keyPushD) {
      //$LASTPOS=36002647;//kernel.Pad:2647
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=36002673;//kernel.Pad:2673
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=36002699;//kernel.Pad:2699
    if (_this.keyPush1) {
      //$LASTPOS=36002713;//kernel.Pad:2713
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=36002739;//kernel.Pad:2739
      _this.jujiKeyPush1.hide();
    }
    
    _thread.retVal=_this;return;
  },
  getPadUp :function _trc_func_36002772_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getPadUp :function _trc_func_36002772_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadDown :function _trc_func_36002808_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getPadDown :function _trc_func_36002808_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadLeft :function _trc_func_36002844_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getPadLeft :function _trc_func_36002844_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadRight :function _trc_func_36002880_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getPadRight :function _trc_func_36002880_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadButton :function _trc_func_36002916_15(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=36002940;//kernel.Pad:2940
    value;
    //$LASTPOS=36002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=36002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getPadButton :function _trc_func_36002916_16(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=36002940;//kernel.Pad:2940
    value;
    //$LASTPOS=36002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=36002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  getUp :function _trc_func_36003010_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getUp :function _trc_func_36003010_18(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getDown :function _trc_func_36003043_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getDown :function _trc_func_36003043_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getLeft :function _trc_func_36003076_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getLeft :function _trc_func_36003076_22(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getRight :function _trc_func_36003109_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getRight :function _trc_func_36003109_24(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getButton :function _trc_func_36003142_25(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=36003163;//kernel.Pad:3163
    value;
    //$LASTPOS=36003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=36003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getButton :function _trc_func_36003142_26(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=36003163;//kernel.Pad:3163
    value;
    //$LASTPOS=36003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=36003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRect :function _trc_func_36003243_27(mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
  },
  fiber$isOnRect :function _trc_func_36003243_28(_thread,mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRectWH :function _trc_func_36003357_29(mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
  },
  fiber$isOnRectWH :function _trc_func_36003357_30(_thread,mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Pad,{"fullName":"kernel.Pad","namespace":"kernel","shortName":"Pad","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2MediaPlayer],{
  main :function _trc_func_37000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37001664;//kernel.Boot:1664
    _this.initSounds();
    //$LASTPOS=37001679;//kernel.Boot:1679
    _this.initSprites();
    //$LASTPOS=37001695;//kernel.Boot:1695
    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
    //$LASTPOS=37001726;//kernel.Boot:1726
    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
    //$LASTPOS=37001763;//kernel.Boot:1763
    _this.initThread();
    //$LASTPOS=37001780;//kernel.Boot:1780
    Tonyu.globals.$pat_fruits=30;
    //$LASTPOS=37001797;//kernel.Boot:1797
    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
    //$LASTPOS=37001814;//kernel.Boot:1814
    Tonyu.globals.$Math=Math;
    //$LASTPOS=37001827;//kernel.Boot:1827
    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=37001937;//kernel.Boot:1937
    Tonyu.globals.$consolePrintY=465-15;
    //$LASTPOS=37001961;//kernel.Boot:1961
    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=37002101;//kernel.Boot:2101
    if (typeof  SplashScreen!="undefined") {
      //$LASTPOS=37002139;//kernel.Boot:2139
      SplashScreen.hide();
    }
    //$LASTPOS=37002161;//kernel.Boot:2161
    _this.initFPSParams();
    //$LASTPOS=37002181;//kernel.Boot:2181
    while (true) {
      //$LASTPOS=37002201;//kernel.Boot:2201
      _this.thg.steps();
      //$LASTPOS=37002219;//kernel.Boot:2219
      Tonyu.globals.$Keys.update();
      //$LASTPOS=37002240;//kernel.Boot:2240
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=37002268;//kernel.Boot:2268
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=37002301;//kernel.Boot:2301
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=37002338;//kernel.Boot:2338
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=37002366;//kernel.Boot:2366
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=37002420;//kernel.Boot:2420
        _this.doDraw=true;
        //$LASTPOS=37002442;//kernel.Boot:2442
        _this.resetDeadLine();
        
      }
      //$LASTPOS=37002471;//kernel.Boot:2471
      if (_this.doDraw) {
        //$LASTPOS=37002514;//kernel.Boot:2514
        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=37002559;//kernel.Boot:2559
        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=37002599;//kernel.Boot:2599
        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=37002644;//kernel.Boot:2644
        Tonyu.globals.$Screen.draw();
        //$LASTPOS=37002669;//kernel.Boot:2669
        _this.fps_fpsCnt++;
        //$LASTPOS=37002693;//kernel.Boot:2693
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=37002732;//kernel.Boot:2732
        _this.frameSkipped++;
        
      }
      //$LASTPOS=37002760;//kernel.Boot:2760
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=37002786;//kernel.Boot:2786
      _this.fps_rpsCnt++;
      //$LASTPOS=37002806;//kernel.Boot:2806
      _this.measureFps();
      //$LASTPOS=37002825;//kernel.Boot:2825
      _this.waitFrame();
      //$LASTPOS=37002852;//kernel.Boot:2852
      while (_this.paused) {
        //$LASTPOS=37002877;//kernel.Boot:2877
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=37002913;//kernel.Boot:2913
        if (! _this.paused) {
          //$LASTPOS=37002926;//kernel.Boot:2926
          _this.resetDeadLine();
        }
        
      }
      
    }
  },
  fiber$main :function _trc_func_37000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_37000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37001664;//kernel.Boot:1664
          _this.fiber$initSounds(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37001679;//kernel.Boot:1679
          _this.fiber$initSprites(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37001695;//kernel.Boot:1695
          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
          //$LASTPOS=37001726;//kernel.Boot:1726
          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
          //$LASTPOS=37001763;//kernel.Boot:1763
          _this.fiber$initThread(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=37001780;//kernel.Boot:1780
          Tonyu.globals.$pat_fruits=30;
          //$LASTPOS=37001797;//kernel.Boot:1797
          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
          //$LASTPOS=37001814;//kernel.Boot:1814
          Tonyu.globals.$Math=Math;
          //$LASTPOS=37001827;//kernel.Boot:1827
          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=37001937;//kernel.Boot:1937
          Tonyu.globals.$consolePrintY=465-15;
          //$LASTPOS=37001961;//kernel.Boot:1961
          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=37002101;//kernel.Boot:2101
          if (typeof  SplashScreen!="undefined") {
            //$LASTPOS=37002139;//kernel.Boot:2139
            SplashScreen.hide();
          }
          //$LASTPOS=37002161;//kernel.Boot:2161
          _this.initFPSParams();
          //$LASTPOS=37002181;//kernel.Boot:2181
        case 4:
          //$LASTPOS=37002201;//kernel.Boot:2201
          _this.thg.steps();
          //$LASTPOS=37002219;//kernel.Boot:2219
          Tonyu.globals.$Keys.update();
          //$LASTPOS=37002240;//kernel.Boot:2240
          Tonyu.globals.$InputDevice.update();
          //$LASTPOS=37002268;//kernel.Boot:2268
          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
          //$LASTPOS=37002301;//kernel.Boot:2301
          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
          //$LASTPOS=37002338;//kernel.Boot:2338
          _this.doDraw=_this.now()<_this.deadLine;
          //$LASTPOS=37002366;//kernel.Boot:2366
          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
            //$LASTPOS=37002420;//kernel.Boot:2420
            _this.doDraw=true;
            //$LASTPOS=37002442;//kernel.Boot:2442
            _this.resetDeadLine();
            
          }
          //$LASTPOS=37002471;//kernel.Boot:2471
          if (_this.doDraw) {
            //$LASTPOS=37002514;//kernel.Boot:2514
            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=37002559;//kernel.Boot:2559
            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=37002599;//kernel.Boot:2599
            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=37002644;//kernel.Boot:2644
            Tonyu.globals.$Screen.draw();
            //$LASTPOS=37002669;//kernel.Boot:2669
            _this.fps_fpsCnt++;
            //$LASTPOS=37002693;//kernel.Boot:2693
            _this.frameSkipped=0;
            
          } else {
            //$LASTPOS=37002732;//kernel.Boot:2732
            _this.frameSkipped++;
            
          }
          //$LASTPOS=37002760;//kernel.Boot:2760
          Tonyu.globals.$Sprites.checkHit();
          //$LASTPOS=37002786;//kernel.Boot:2786
          _this.fps_rpsCnt++;
          //$LASTPOS=37002806;//kernel.Boot:2806
          _this.measureFps();
          //$LASTPOS=37002825;//kernel.Boot:2825
          _this.fiber$waitFrame(_thread);
          __pc=5;return;
        case 5:
          
          //$LASTPOS=37002852;//kernel.Boot:2852
        case 6:
          if (!(_this.paused)) { __pc=8; break; }
          //$LASTPOS=37002877;//kernel.Boot:2877
          _this.fiber$waitFor(_thread, Tonyu.timeout(1));
          __pc=7;return;
        case 7:
          
          //$LASTPOS=37002913;//kernel.Boot:2913
          if (! _this.paused) {
            //$LASTPOS=37002926;//kernel.Boot:2926
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
  update :function _trc_func_37000187_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000204;//kernel.Boot:204
    _this.waitFor(Tonyu.timeout(50));
  },
  fiber$update :function _trc_func_37000187_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_37000187_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000204;//kernel.Boot:204
          _this.fiber$waitFor(_thread, Tonyu.timeout(50));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSprites :function _trc_func_37000263_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_246;
    
    //$LASTPOS=37000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=37000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=37000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    //$LASTPOS=37000454;//kernel.Boot:454
    _this.waitFor(a);
    //$LASTPOS=37000471;//kernel.Boot:471
    _this.print("Loading pats..");
    //$LASTPOS=37000502;//kernel.Boot:502
    rs = Tonyu.globals.$currentProject.getResource();
    //$LASTPOS=37000545;//kernel.Boot:545
    a=_this.asyncResult();
    //$LASTPOS=37000567;//kernel.Boot:567
    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
    //$LASTPOS=37000652;//kernel.Boot:652
    _this.waitFor(a);
    //$LASTPOS=37000669;//kernel.Boot:669
    r = a[0];
    //$LASTPOS=37000686;//kernel.Boot:686
    Tonyu.globals.$Sprites.setImageList(r);
    //$LASTPOS=37000717;//kernel.Boot:717
    _it_246=Tonyu.iterator(r.names,2);
    while(_it_246.next()) {
      name=_it_246[0];
      val=_it_246[1];
      
      //$LASTPOS=37000758;//kernel.Boot:758
      Tonyu.setGlobal(name,val);
      
    }
    //$LASTPOS=37000798;//kernel.Boot:798
    _this.print("Loading pats done.");
    //$LASTPOS=37000833;//kernel.Boot:833
    _this.cvj=$("canvas");
    //$LASTPOS=37000855;//kernel.Boot:855
    if (Tonyu.noviceMode) {
      //$LASTPOS=37000888;//kernel.Boot:888
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
      
    } else {
      //$LASTPOS=37000972;//kernel.Boot:972
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
      
    }
  },
  fiber$initSprites :function _trc_func_37000263_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_246;
    
    //$LASTPOS=37000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=37000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=37000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    
    _thread.enter(function _trc_func_37000263_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000454;//kernel.Boot:454
          _this.fiber$waitFor(_thread, a);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37000471;//kernel.Boot:471
          _this.print("Loading pats..");
          //$LASTPOS=37000502;//kernel.Boot:502
          rs = Tonyu.globals.$currentProject.getResource();
          //$LASTPOS=37000545;//kernel.Boot:545
          a=_this.asyncResult();
          //$LASTPOS=37000567;//kernel.Boot:567
          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
          //$LASTPOS=37000652;//kernel.Boot:652
          _this.fiber$waitFor(_thread, a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37000669;//kernel.Boot:669
          r = a[0];
          //$LASTPOS=37000686;//kernel.Boot:686
          Tonyu.globals.$Sprites.setImageList(r);
          //$LASTPOS=37000717;//kernel.Boot:717
          _it_246=Tonyu.iterator(r.names,2);
          while(_it_246.next()) {
            name=_it_246[0];
            val=_it_246[1];
            
            //$LASTPOS=37000758;//kernel.Boot:758
            Tonyu.setGlobal(name,val);
            
          }
          //$LASTPOS=37000798;//kernel.Boot:798
          _this.print("Loading pats done.");
          //$LASTPOS=37000833;//kernel.Boot:833
          _this.cvj=$("canvas");
          //$LASTPOS=37000855;//kernel.Boot:855
          if (Tonyu.noviceMode) {
            //$LASTPOS=37000888;//kernel.Boot:888
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
            
          } else {
            //$LASTPOS=37000972;//kernel.Boot:972
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSounds :function _trc_func_37001044_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    //$LASTPOS=37001099;//kernel.Boot:1099
    _this.initT2MediaPlayer();
    //$LASTPOS=37001125;//kernel.Boot:1125
    _this.loadFromProject(Tonyu.globals.$currentProject);
    //$LASTPOS=37001164;//kernel.Boot:1164
    _this.print("Loading sounds done.");
  },
  fiber$initSounds :function _trc_func_37001044_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=37001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    
    _thread.enter(function _trc_func_37001044_11(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37001099;//kernel.Boot:1099
          _this.fiber$initT2MediaPlayer(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37001125;//kernel.Boot:1125
          _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37001164;//kernel.Boot:1164
          _this.print("Loading sounds done.");
          _thread.exit(_this);return;
        }
      }
    });
  },
  initThread :function _trc_func_37001204_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var o;
    var mainClassName;
    
    //$LASTPOS=37001225;//kernel.Boot:1225
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=37001272;//kernel.Boot:1272
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=37001318;//kernel.Boot:1318
    mainClassName = o.run.mainClass;
    //$LASTPOS=37001358;//kernel.Boot:1358
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=37001399;//kernel.Boot:1399
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=37001445;//kernel.Boot:1445
    if (! _this.mainClass) {
      //$LASTPOS=37001472;//kernel.Boot:1472
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=37001550;//kernel.Boot:1550
    Tonyu.runMode=true;
    //$LASTPOS=37001575;//kernel.Boot:1575
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=37001605;//kernel.Boot:1605
    new _this.mainClass();
  },
  fiber$initThread :function _trc_func_37001204_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var o;
    var mainClassName;
    
    //$LASTPOS=37001225;//kernel.Boot:1225
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=37001272;//kernel.Boot:1272
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=37001318;//kernel.Boot:1318
    mainClassName = o.run.mainClass;
    //$LASTPOS=37001358;//kernel.Boot:1358
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=37001399;//kernel.Boot:1399
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=37001445;//kernel.Boot:1445
    if (! _this.mainClass) {
      //$LASTPOS=37001472;//kernel.Boot:1472
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=37001550;//kernel.Boot:1550
    Tonyu.runMode=true;
    //$LASTPOS=37001575;//kernel.Boot:1575
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=37001605;//kernel.Boot:1605
    new _this.mainClass();
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_37001626_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37001641;//kernel.Boot:1641
    _this.fireEvent("stop");
  },
  fiber$stop :function _trc_func_37001626_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_37001626_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37001641;//kernel.Boot:1641
          _this.fiber$fireEvent(_thread, "stop");
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initFPSParams :function _trc_func_37002956_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37003006;//kernel.Boot:3006
    _this._fps=30;
    //$LASTPOS=37003022;//kernel.Boot:3022
    _this.maxframeSkip=5;
    //$LASTPOS=37003072;//kernel.Boot:3072
    _this.frameCnt=0;
    //$LASTPOS=37003091;//kernel.Boot:3091
    _this.resetDeadLine();
    //$LASTPOS=37003113;//kernel.Boot:3113
    Tonyu.globals.$Boot=_this;
    //$LASTPOS=37003132;//kernel.Boot:3132
    _this.lastMeasured=_this.now();
    //$LASTPOS=37003157;//kernel.Boot:3157
    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
  },
  now :function _trc_func_37003202_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return new Date().getTime();
  },
  resetDeadLine :function _trc_func_37003256_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37003287;//kernel.Boot:3287
    _this.deadLine=_this.now()+1000/_this._fps;
    //$LASTPOS=37003318;//kernel.Boot:3318
    _this.frameSkipped=0;
  },
  waitFrame :function _trc_func_37003342_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var wt;
    
    //$LASTPOS=37003362;//kernel.Boot:3362
    wt = _this.deadLine-_this.now();
    //$LASTPOS=37003390;//kernel.Boot:3390
    if (wt<1) {
      //$LASTPOS=37003411;//kernel.Boot:3411
      if (wt<- 1000) {
        //$LASTPOS=37003425;//kernel.Boot:3425
        _this.resetDeadLine();
      }
      //$LASTPOS=37003451;//kernel.Boot:3451
      wt=1;
      
    }
    //$LASTPOS=37003469;//kernel.Boot:3469
    wt=_this.floor(wt);
    //$LASTPOS=37003488;//kernel.Boot:3488
    _this.waitFor(Tonyu.timeout(wt));
    //$LASTPOS=37003521;//kernel.Boot:3521
    _this.deadLine+=1000/_this._fps;
  },
  fiber$waitFrame :function _trc_func_37003342_21(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var wt;
    
    //$LASTPOS=37003362;//kernel.Boot:3362
    wt = _this.deadLine-_this.now();
    //$LASTPOS=37003390;//kernel.Boot:3390
    if (wt<1) {
      //$LASTPOS=37003411;//kernel.Boot:3411
      if (wt<- 1000) {
        //$LASTPOS=37003425;//kernel.Boot:3425
        _this.resetDeadLine();
      }
      //$LASTPOS=37003451;//kernel.Boot:3451
      wt=1;
      
    }
    //$LASTPOS=37003469;//kernel.Boot:3469
    wt=_this.floor(wt);
    
    _thread.enter(function _trc_func_37003342_22(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37003488;//kernel.Boot:3488
          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37003521;//kernel.Boot:3521
          _this.deadLine+=1000/_this._fps;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getFrameRate :function _trc_func_37003548_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._fps;
  },
  setFrameRate :function _trc_func_37003634_24(fps,maxFrameSkip) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37003681;//kernel.Boot:3681
    _this._fps=fps;
    //$LASTPOS=37003698;//kernel.Boot:3698
    if (typeof  maxFrameSkip!="number") {
      //$LASTPOS=37003733;//kernel.Boot:3733
      maxFrameSkip=5;
    }
    //$LASTPOS=37003754;//kernel.Boot:3754
    _this.maxFrameSkip=maxFrameSkip;
    //$LASTPOS=37003793;//kernel.Boot:3793
    _this.resetDeadLine();
  },
  getMeasuredFps :function _trc_func_37003843_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_fps;
  },
  getMeasuredRps :function _trc_func_37003922_26() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_rps;
  },
  measureFps :function _trc_func_37003976_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37004004;//kernel.Boot:4004
    if (_this.now()>_this.lastMeasured+1000) {
      //$LASTPOS=37004044;//kernel.Boot:4044
      _this.fps_fps=_this.fps_fpsCnt;
      //$LASTPOS=37004073;//kernel.Boot:4073
      _this.fps_rps=_this.fps_rpsCnt;
      //$LASTPOS=37004102;//kernel.Boot:4102
      _this.fps_fpsCnt=0;
      //$LASTPOS=37004125;//kernel.Boot:4125
      _this.fps_rpsCnt=0;
      //$LASTPOS=37004148;//kernel.Boot:4148
      _this.lastMeasured=_this.now();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_func_38000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_38000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_38000023_2(xx,yy,pp,ff,sz,rt,al) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000057;//kernel.DxChar:57
    Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
    //$LASTPOS=38000082;//kernel.DxChar:82
    _this.scaleX=1;
    //$LASTPOS=38000097;//kernel.DxChar:97
    if (sz) {
      //$LASTPOS=38000105;//kernel.DxChar:105
      _this.scaleX=sz;
    }
    //$LASTPOS=38000121;//kernel.DxChar:121
    _this.angle=0;
    //$LASTPOS=38000135;//kernel.DxChar:135
    if (rt) {
      //$LASTPOS=38000143;//kernel.DxChar:143
      _this.angle=rt;
    }
    //$LASTPOS=38000158;//kernel.DxChar:158
    _this.alpha=255;
    //$LASTPOS=38000174;//kernel.DxChar:174
    if (al) {
      //$LASTPOS=38000182;//kernel.DxChar:182
      _this.alpha=al;
    }
  },
  draw :function _trc_func_38000196_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000212;//kernel.DxChar:212
    _this.rotation=_this.angle;
    //$LASTPOS=38000233;//kernel.DxChar:233
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

