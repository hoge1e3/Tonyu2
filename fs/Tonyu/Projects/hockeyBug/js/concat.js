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
  registerEventHandler :function _trc_func_1000377_9(type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000444;//kernel.EventMod:444
    _this.initEventMod();
    //$LASTPOS=1000464;//kernel.EventMod:464
    if (typeof  type=="function") {
      //$LASTPOS=1000503;//kernel.EventMod:503
      obj=obj||new type;
      //$LASTPOS=1000530;//kernel.EventMod:530
      type=obj.getClassInfo().fullName;
      
    } else {
      //$LASTPOS=1000586;//kernel.EventMod:586
      obj=obj||new Tonyu.classes.kernel.EventHandler;
      
    }
    return _this._eventHandlers[type]=obj;
  },
  fiber$registerEventHandler :function _trc_func_1000377_10(_thread,type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000377_11(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000444;//kernel.EventMod:444
          _this.fiber$initEventMod(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000464;//kernel.EventMod:464
          if (typeof  type=="function") {
            //$LASTPOS=1000503;//kernel.EventMod:503
            obj=obj||new type;
            //$LASTPOS=1000530;//kernel.EventMod:530
            type=obj.getClassInfo().fullName;
            
          } else {
            //$LASTPOS=1000586;//kernel.EventMod:586
            obj=obj||new Tonyu.classes.kernel.EventHandler;
            
          }
          _thread.exit(_this._eventHandlers[type]=obj);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getEventHandler :function _trc_func_1000662_12(type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=1000691;//kernel.EventMod:691
    _this.initEventMod();
    //$LASTPOS=1000711;//kernel.EventMod:711
    res = _this._eventHandlers[type]||_this.registerEventHandler(type);
    return res;
  },
  fiber$getEventHandler :function _trc_func_1000662_13(_thread,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    
    _thread.enter(function _trc_func_1000662_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000691;//kernel.EventMod:691
          _this.fiber$initEventMod(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000711;//kernel.EventMod:711
          res = _this._eventHandlers[type]||_this.registerEventHandler(type);
          _thread.exit(res);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  on :function _trc_func_1000793_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var h;
    
    //$LASTPOS=1000806;//kernel.EventMod:806
    a = _this.parseArgs(arguments);
    //$LASTPOS=1000839;//kernel.EventMod:839
    h = _this.getEventHandler(a.type);
    return h.addListener.apply(h,a.args);
  },
  fiber$on :function _trc_func_1000793_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var h;
    
    //$LASTPOS=1000806;//kernel.EventMod:806
    a = _this.parseArgs(_arguments);
    //$LASTPOS=1000839;//kernel.EventMod:839
    h = _this.getEventHandler(a.type);
    _thread.retVal=h.addListener.apply(h,a.args);return;
    
    
    _thread.retVal=_this;return;
  },
  fireEvent :function _trc_func_1000919_17(type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000949;//kernel.EventMod:949
    _this.getEventHandler(type).fire(args);
  },
  fiber$fireEvent :function _trc_func_1000919_18(_thread,type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000949;//kernel.EventMod:949
    _this.getEventHandler(type).fire(args);
    
    _thread.retVal=_this;return;
  },
  sendEvent :function _trc_func_1000987_19(type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1001017;//kernel.EventMod:1017
    _this.getEventHandler(type).fire(args);
  },
  fiber$sendEvent :function _trc_func_1000987_20(_thread,type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1001017;//kernel.EventMod:1017
    _this.getEventHandler(type).fire(args);
    
    _thread.retVal=_this;return;
  },
  waitEvent :function _trc_func_1001057_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1001077;//kernel.EventMod:1077
    if (null) {
      //$LASTPOS=1001101;//kernel.EventMod:1101
      null.suspend();
      //$LASTPOS=1001129;//kernel.EventMod:1129
      null.waitEvent(_this,arguments);
      
    }
  },
  fiber$waitEvent :function _trc_func_1001057_22(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1001077;//kernel.EventMod:1077
    if (_thread) {
      //$LASTPOS=1001101;//kernel.EventMod:1101
      _thread.suspend();
      //$LASTPOS=1001129;//kernel.EventMod:1129
      _thread.waitEvent(_this,_arguments);
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventMod,{"fullName":"kernel.EventMod","namespace":"kernel","shortName":"EventMod","decls":{"methods":{"main":{"nowait":false},"initEventMod":{"nowait":false},"releaseEventMod":{"nowait":false},"parseArgs":{"nowait":false},"registerEventHandler":{"nowait":false},"getEventHandler":{"nowait":false},"on":{"nowait":false},"fireEvent":{"nowait":false},"sendEvent":{"nowait":false},"waitEvent":{"nowait":false}}}});

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
Tonyu.classes.kernel.TObject=Tonyu.klass([],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_4000030_2(options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000052;//kernel.TObject:52
    if (typeof  options=="object") {
      //$LASTPOS=4000082;//kernel.TObject:82
      _this.extend(options);
    }
    //$LASTPOS=4000104;//kernel.TObject:104
    _this.main();
  },
  extend :function _trc_func_4000121_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TObject,{"fullName":"kernel.TObject","namespace":"kernel","shortName":"TObject","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TQuery=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_5000035_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000049;//kernel.TQuery:49
    _this.length=0;
  },
  tonyuIterator :function _trc_func_5000061_3(arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=5000089;//kernel.TQuery:89
    res = {};
    //$LASTPOS=5000105;//kernel.TQuery:105
    res.i=0;
    //$LASTPOS=5000118;//kernel.TQuery:118
    if (arity==1) {
      //$LASTPOS=5000142;//kernel.TQuery:142
      res.next=function () {
        
        //$LASTPOS=5000177;//kernel.TQuery:177
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=5000227;//kernel.TQuery:227
        res[0]=_this[res.i];
        //$LASTPOS=5000259;//kernel.TQuery:259
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=5000325;//kernel.TQuery:325
      res.next=function () {
        
        //$LASTPOS=5000360;//kernel.TQuery:360
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=5000410;//kernel.TQuery:410
        res[0]=res.i;
        //$LASTPOS=5000436;//kernel.TQuery:436
        res[1]=_this[res.i];
        //$LASTPOS=5000468;//kernel.TQuery:468
        res.i++;
        return true;
      };
      
    }
    return res;
  },
  fiber$tonyuIterator :function _trc_func_5000061_4(_thread,arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=5000089;//kernel.TQuery:89
    res = {};
    //$LASTPOS=5000105;//kernel.TQuery:105
    res.i=0;
    //$LASTPOS=5000118;//kernel.TQuery:118
    if (arity==1) {
      //$LASTPOS=5000142;//kernel.TQuery:142
      res.next=function () {
        
        //$LASTPOS=5000177;//kernel.TQuery:177
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=5000227;//kernel.TQuery:227
        res[0]=_this[res.i];
        //$LASTPOS=5000259;//kernel.TQuery:259
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=5000325;//kernel.TQuery:325
      res.next=function () {
        
        //$LASTPOS=5000360;//kernel.TQuery:360
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=5000410;//kernel.TQuery:410
        res[0]=res.i;
        //$LASTPOS=5000436;//kernel.TQuery:436
        res[1]=_this[res.i];
        //$LASTPOS=5000468;//kernel.TQuery:468
        res.i++;
        return true;
      };
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  attr :function _trc_func_5000537_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var values;
    var i;
    var e;
    var _it_22;
    
    //$LASTPOS=5000551;//kernel.TQuery:551
    values;
    //$LASTPOS=5000567;//kernel.TQuery:567
    if (_this.length==0) {
      return _this;
    }
    //$LASTPOS=5000594;//kernel.TQuery:594
    if (arguments.length==1&&typeof  arguments[0]=="string") {
      return _this[0][arguments[0]];
      
    }
    //$LASTPOS=5000702;//kernel.TQuery:702
    if (arguments.length>=2) {
      //$LASTPOS=5000737;//kernel.TQuery:737
      values={};
      //$LASTPOS=5000756;//kernel.TQuery:756
      //$LASTPOS=5000761;//kernel.TQuery:761
      i = 0;
      while(i<arguments.length-1) {
        {
          //$LASTPOS=5000813;//kernel.TQuery:813
          values[arguments[i]]=arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=5000881;//kernel.TQuery:881
      values=arguments[0];
      
    }
    //$LASTPOS=5000912;//kernel.TQuery:912
    if (values) {
      //$LASTPOS=5000934;//kernel.TQuery:934
      _it_22=Tonyu.iterator(_this,1);
      while(_it_22.next()) {
        e=_it_22[0];
        
        //$LASTPOS=5000968;//kernel.TQuery:968
        e.extend(values);
        
      }
      
    }
  },
  fiber$attr :function _trc_func_5000537_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var values;
    var i;
    var e;
    var _it_22;
    
    //$LASTPOS=5000551;//kernel.TQuery:551
    values;
    //$LASTPOS=5000567;//kernel.TQuery:567
    if (_this.length==0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=5000594;//kernel.TQuery:594
    if (_arguments.length==1&&typeof  _arguments[0]=="string") {
      _thread.retVal=_this[0][_arguments[0]];return;
      
      
    }
    //$LASTPOS=5000702;//kernel.TQuery:702
    if (_arguments.length>=2) {
      //$LASTPOS=5000737;//kernel.TQuery:737
      values={};
      //$LASTPOS=5000756;//kernel.TQuery:756
      //$LASTPOS=5000761;//kernel.TQuery:761
      i = 0;
      while(i<_arguments.length-1) {
        {
          //$LASTPOS=5000813;//kernel.TQuery:813
          values[_arguments[i]]=_arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=5000881;//kernel.TQuery:881
      values=_arguments[0];
      
    }
    //$LASTPOS=5000912;//kernel.TQuery:912
    if (values) {
      //$LASTPOS=5000934;//kernel.TQuery:934
      _it_22=Tonyu.iterator(_this,1);
      while(_it_22.next()) {
        e=_it_22[0];
        
        //$LASTPOS=5000968;//kernel.TQuery:968
        e.extend(values);
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  genKeyfunc :function _trc_func_5001005_7(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5001028;//kernel.TQuery:1028
    if (typeof  key!="function") {
      return function (o) {
        
        return o[key];
      };
      
    } else {
      return key;
      
    }
  },
  fiber$genKeyfunc :function _trc_func_5001005_8(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5001028;//kernel.TQuery:1028
    if (typeof  key!="function") {
      _thread.retVal=function (o) {
        
        return o[key];
      };return;
      
      
    } else {
      _thread.retVal=key;return;
      
      
    }
    
    _thread.retVal=_this;return;
  },
  maxs :function _trc_func_5001137_9(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_28;
    var v;
    
    //$LASTPOS=5001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=5001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=5001210;//kernel.TQuery:1210
    _it_28=Tonyu.iterator(_this,1);
    while(_it_28.next()) {
      o=_it_28[0];
      
      //$LASTPOS=5001240;//kernel.TQuery:1240
      v = f(o);
      //$LASTPOS=5001260;//kernel.TQuery:1260
      if (res==null||v>=res) {
        //$LASTPOS=5001299;//kernel.TQuery:1299
        if (v>res) {
          //$LASTPOS=5001310;//kernel.TQuery:1310
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=5001339;//kernel.TQuery:1339
        reso.push(o);
        //$LASTPOS=5001365;//kernel.TQuery:1365
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$maxs :function _trc_func_5001137_10(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_28;
    var v;
    
    //$LASTPOS=5001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=5001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=5001210;//kernel.TQuery:1210
    _it_28=Tonyu.iterator(_this,1);
    while(_it_28.next()) {
      o=_it_28[0];
      
      //$LASTPOS=5001240;//kernel.TQuery:1240
      v = f(o);
      //$LASTPOS=5001260;//kernel.TQuery:1260
      if (res==null||v>=res) {
        //$LASTPOS=5001299;//kernel.TQuery:1299
        if (v>res) {
          //$LASTPOS=5001310;//kernel.TQuery:1310
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=5001339;//kernel.TQuery:1339
        reso.push(o);
        //$LASTPOS=5001365;//kernel.TQuery:1365
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  mins :function _trc_func_5001407_11(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_35;
    var v;
    
    //$LASTPOS=5001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=5001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=5001480;//kernel.TQuery:1480
    _it_35=Tonyu.iterator(_this,1);
    while(_it_35.next()) {
      o=_it_35[0];
      
      //$LASTPOS=5001510;//kernel.TQuery:1510
      v = f(o);
      //$LASTPOS=5001530;//kernel.TQuery:1530
      if (res==null||v<=res) {
        //$LASTPOS=5001569;//kernel.TQuery:1569
        if (v<res) {
          //$LASTPOS=5001580;//kernel.TQuery:1580
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=5001609;//kernel.TQuery:1609
        reso.push(o);
        //$LASTPOS=5001635;//kernel.TQuery:1635
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$mins :function _trc_func_5001407_12(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_35;
    var v;
    
    //$LASTPOS=5001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=5001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=5001480;//kernel.TQuery:1480
    _it_35=Tonyu.iterator(_this,1);
    while(_it_35.next()) {
      o=_it_35[0];
      
      //$LASTPOS=5001510;//kernel.TQuery:1510
      v = f(o);
      //$LASTPOS=5001530;//kernel.TQuery:1530
      if (res==null||v<=res) {
        //$LASTPOS=5001569;//kernel.TQuery:1569
        if (v<res) {
          //$LASTPOS=5001580;//kernel.TQuery:1580
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=5001609;//kernel.TQuery:1609
        reso.push(o);
        //$LASTPOS=5001635;//kernel.TQuery:1635
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  minObj :function _trc_func_5001677_13(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mins(key)[0];
  },
  fiber$minObj :function _trc_func_5001677_14(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mins(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  maxObj :function _trc_func_5001719_15(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.maxs(key)[0];
  },
  fiber$maxObj :function _trc_func_5001719_16(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.maxs(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  nearests :function _trc_func_5001761_17(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5001782;//kernel.TQuery:1782
    if (typeof  x=="object") {
      //$LASTPOS=5001807;//kernel.TQuery:1807
      y=x.y;
      //$LASTPOS=5001813;//kernel.TQuery:1813
      x=x.x;
      
    }
    return _this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });
  },
  fiber$nearests :function _trc_func_5001761_18(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5001782;//kernel.TQuery:1782
    if (typeof  x=="object") {
      //$LASTPOS=5001807;//kernel.TQuery:1807
      y=x.y;
      //$LASTPOS=5001813;//kernel.TQuery:1813
      x=x.x;
      
    }
    _thread.retVal=_this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });return;
    
    
    _thread.retVal=_this;return;
  },
  nearest :function _trc_func_5001887_19(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.nearests(x,y)[0];
  },
  fiber$nearest :function _trc_func_5001887_20(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.nearests(x,y)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  withins :function _trc_func_5001934_21(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var x;
    var y;
    
    //$LASTPOS=5001958;//kernel.TQuery:1958
    x;y;
    //$LASTPOS=5001971;//kernel.TQuery:1971
    if (typeof  xo=="object") {
      //$LASTPOS=5002006;//kernel.TQuery:2006
      x=xo.x;
      //$LASTPOS=5002013;//kernel.TQuery:2013
      y=xo.y;
      //$LASTPOS=5002020;//kernel.TQuery:2020
      d=yd;
      
    } else {
      //$LASTPOS=5002047;//kernel.TQuery:2047
      x=xo;
      //$LASTPOS=5002052;//kernel.TQuery:2052
      y=yd;
      
    }
    return _this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });
  },
  fiber$withins :function _trc_func_5001934_22(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var x;
    var y;
    
    //$LASTPOS=5001958;//kernel.TQuery:1958
    x;y;
    //$LASTPOS=5001971;//kernel.TQuery:1971
    if (typeof  xo=="object") {
      //$LASTPOS=5002006;//kernel.TQuery:2006
      x=xo.x;
      //$LASTPOS=5002013;//kernel.TQuery:2013
      y=xo.y;
      //$LASTPOS=5002020;//kernel.TQuery:2020
      d=yd;
      
    } else {
      //$LASTPOS=5002047;//kernel.TQuery:2047
      x=xo;
      //$LASTPOS=5002052;//kernel.TQuery:2052
      y=yd;
      
    }
    _thread.retVal=_this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });return;
    
    
    _thread.retVal=_this;return;
  },
  within :function _trc_func_5002133_23(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.withins(xo,yd,d).nearest();
  },
  fiber$within :function _trc_func_5002133_24(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.withins(xo,yd,d).nearest();return;
    
    
    _thread.retVal=_this;return;
  },
  max :function _trc_func_5002194_25(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_46;
    var v;
    
    //$LASTPOS=5002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=5002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=5002250;//kernel.TQuery:2250
    _it_46=Tonyu.iterator(_this,1);
    while(_it_46.next()) {
      o=_it_46[0];
      
      //$LASTPOS=5002280;//kernel.TQuery:2280
      v = f(o);
      //$LASTPOS=5002300;//kernel.TQuery:2300
      if (res==null||v>res) {
        //$LASTPOS=5002324;//kernel.TQuery:2324
        res=v;
      }
      
    }
    return res;
  },
  fiber$max :function _trc_func_5002194_26(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_46;
    var v;
    
    //$LASTPOS=5002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=5002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=5002250;//kernel.TQuery:2250
    _it_46=Tonyu.iterator(_this,1);
    while(_it_46.next()) {
      o=_it_46[0];
      
      //$LASTPOS=5002280;//kernel.TQuery:2280
      v = f(o);
      //$LASTPOS=5002300;//kernel.TQuery:2300
      if (res==null||v>res) {
        //$LASTPOS=5002324;//kernel.TQuery:2324
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  min :function _trc_func_5002355_27(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_52;
    var v;
    
    //$LASTPOS=5002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=5002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=5002411;//kernel.TQuery:2411
    _it_52=Tonyu.iterator(_this,1);
    while(_it_52.next()) {
      o=_it_52[0];
      
      //$LASTPOS=5002441;//kernel.TQuery:2441
      v = f(o);
      //$LASTPOS=5002461;//kernel.TQuery:2461
      if (res==null||v<res) {
        //$LASTPOS=5002485;//kernel.TQuery:2485
        res=v;
      }
      
    }
    return res;
  },
  fiber$min :function _trc_func_5002355_28(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_52;
    var v;
    
    //$LASTPOS=5002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=5002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=5002411;//kernel.TQuery:2411
    _it_52=Tonyu.iterator(_this,1);
    while(_it_52.next()) {
      o=_it_52[0];
      
      //$LASTPOS=5002441;//kernel.TQuery:2441
      v = f(o);
      //$LASTPOS=5002461;//kernel.TQuery:2461
      if (res==null||v<res) {
        //$LASTPOS=5002485;//kernel.TQuery:2485
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  push :function _trc_func_5002516_29(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=5002551;//kernel.TQuery:2551
    _this.length++;
  },
  fiber$push :function _trc_func_5002516_30(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=5002551;//kernel.TQuery:2551
    _this.length++;
    
    _thread.retVal=_this;return;
  },
  size :function _trc_func_5002563_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.length;
  },
  fiber$size :function _trc_func_5002563_32(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.length;return;
    
    
    _thread.retVal=_this;return;
  },
  find :function _trc_func_5002588_33(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var no;
    var o;
    var _it_58;
    
    //$LASTPOS=5002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=5002626;//kernel.TQuery:2626
    _it_58=Tonyu.iterator(_this,1);
    while(_it_58.next()) {
      o=_it_58[0];
      
      //$LASTPOS=5002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=5002666;//kernel.TQuery:2666
        no.push(o);
      }
      
    }
    return no;
  },
  fiber$find :function _trc_func_5002588_34(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var no;
    var o;
    var _it_58;
    
    //$LASTPOS=5002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=5002626;//kernel.TQuery:2626
    _it_58=Tonyu.iterator(_this,1);
    while(_it_58.next()) {
      o=_it_58[0];
      
      //$LASTPOS=5002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=5002666;//kernel.TQuery:2666
        no.push(o);
      }
      
    }
    _thread.retVal=no;return;
    
    
    _thread.retVal=_this;return;
  },
  apply :function _trc_func_5002702_35(name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var o;
    var _it_62;
    var f;
    
    //$LASTPOS=5002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=5002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=5002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=5002764;//kernel.TQuery:2764
    _it_62=Tonyu.iterator(_this,1);
    while(_it_62.next()) {
      o=_it_62[0];
      
      //$LASTPOS=5002794;//kernel.TQuery:2794
      f = o[name];
      //$LASTPOS=5002817;//kernel.TQuery:2817
      if (typeof  f=="function") {
        //$LASTPOS=5002857;//kernel.TQuery:2857
        res=f.apply(o,args);
        
      }
      
    }
    return res;
  },
  fiber$apply :function _trc_func_5002702_36(_thread,name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var o;
    var _it_62;
    var f;
    
    //$LASTPOS=5002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=5002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=5002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=5002764;//kernel.TQuery:2764
    _it_62=Tonyu.iterator(_this,1);
    while(_it_62.next()) {
      o=_it_62[0];
      
      //$LASTPOS=5002794;//kernel.TQuery:2794
      f = o[name];
      //$LASTPOS=5002817;//kernel.TQuery:2817
      if (typeof  f=="function") {
        //$LASTPOS=5002857;//kernel.TQuery:2857
        res=f.apply(o,args);
        
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  alive :function _trc_func_5002968_37() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return ! o.isDead();
    });
  },
  fiber$alive :function _trc_func_5002968_38(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return ! o.isDead();
    });return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_5003039_39() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    
    //$LASTPOS=5003052;//kernel.TQuery:3052
    a = _this.alive();
    //$LASTPOS=5003071;//kernel.TQuery:3071
    if (a.length==0) {
      return false;
    }
    //$LASTPOS=5003106;//kernel.TQuery:3106
    a.apply("die");
    return true;
  },
  fiber$die :function _trc_func_5003039_40(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    
    //$LASTPOS=5003052;//kernel.TQuery:3052
    a = _this.alive();
    //$LASTPOS=5003071;//kernel.TQuery:3071
    if (a.length==0) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=5003106;//kernel.TQuery:3106
    a.apply("die");
    _thread.retVal=true;return;
    
    
    _thread.retVal=_this;return;
  },
  klass :function _trc_func_5003142_41(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return o instanceof k;
    });
  },
  fiber$klass :function _trc_func_5003142_42(_thread,k) {
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
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_6000057_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000071;//kernel.InputDevice:71
    _this.listeners=[];
    //$LASTPOS=6000090;//kernel.InputDevice:90
    _this.touchEmu=true;
  },
  handleListeners :function _trc_func_6000109_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var l;
    
    //$LASTPOS=6000135;//kernel.InputDevice:135
    l = _this.listeners;
    //$LASTPOS=6000157;//kernel.InputDevice:157
    _this.listeners=[];
    //$LASTPOS=6000176;//kernel.InputDevice:176
    while (l.length>0) {
      //$LASTPOS=6000197;//kernel.InputDevice:197
      (l.shift())();
      
    }
  },
  fiber$handleListeners :function _trc_func_6000109_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var l;
    
    //$LASTPOS=6000135;//kernel.InputDevice:135
    l = _this.listeners;
    //$LASTPOS=6000157;//kernel.InputDevice:157
    _this.listeners=[];
    //$LASTPOS=6000176;//kernel.InputDevice:176
    while (l.length>0) {
      //$LASTPOS=6000197;//kernel.InputDevice:197
      (l.shift())();
      
    }
    
    _thread.retVal=_this;return;
  },
  addOnetimeListener :function _trc_func_6000218_5(l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000247;//kernel.InputDevice:247
    _this.listeners.push(l);
  },
  fiber$addOnetimeListener :function _trc_func_6000218_6(_thread,l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=6000247;//kernel.InputDevice:247
    _this.listeners.push(l);
    
    _thread.retVal=_this;return;
  },
  initCanvasEvents :function _trc_func_6000270_7(cvj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var cv;
    var handleMouse;
    var handleTouch;
    var handleTouchEnd;
    var d;
    
    //$LASTPOS=6000300;//kernel.InputDevice:300
    cv = cvj[0];
    //$LASTPOS=6000320;//kernel.InputDevice:320
    Tonyu.globals.$handleMouse=function (e) {
      var p;
      var mp;
      
      //$LASTPOS=6000349;//kernel.InputDevice:349
      p = cvj.offset();
      //$LASTPOS=6000378;//kernel.InputDevice:378
      mp = {x: e.clientX-p.left,y: e.clientY-p.top};
      //$LASTPOS=6000435;//kernel.InputDevice:435
      mp=Tonyu.globals.$Screen.canvas2buf(mp);
      //$LASTPOS=6000471;//kernel.InputDevice:471
      Tonyu.globals.$mouseX=mp.x;
      //$LASTPOS=6000494;//kernel.InputDevice:494
      Tonyu.globals.$mouseY=mp.y;
      //$LASTPOS=6000517;//kernel.InputDevice:517
      if (_this.touchEmu) {
        //$LASTPOS=6000546;//kernel.InputDevice:546
        Tonyu.globals.$touches[0].x=mp.x;
        //$LASTPOS=6000579;//kernel.InputDevice:579
        Tonyu.globals.$touches[0].y=mp.y;
        
      }
      //$LASTPOS=6000619;//kernel.InputDevice:619
      _this.handleListeners();
    };
    //$LASTPOS=6000651;//kernel.InputDevice:651
    Tonyu.globals.$touches=[{},{},{},{},{}];
    //$LASTPOS=6000683;//kernel.InputDevice:683
    Tonyu.globals.$touches.findById=function (id) {
      var j;
      
      //$LASTPOS=6000718;//kernel.InputDevice:718
      //$LASTPOS=6000723;//kernel.InputDevice:723
      j = 0;
      while(j<Tonyu.globals.$touches.length) {
        {
          //$LASTPOS=6000773;//kernel.InputDevice:773
          if (Tonyu.globals.$touches[j].identifier==id) {
            return Tonyu.globals.$touches[j];
            
          }
        }
        j++;
      }
    };
    //$LASTPOS=6000883;//kernel.InputDevice:883
    Tonyu.globals.$handleTouch=function (e) {
      var p;
      var ts;
      var i;
      var src;
      var dst;
      var j;
      
      //$LASTPOS=6000912;//kernel.InputDevice:912
      _this.touchEmu=false;
      //$LASTPOS=6000937;//kernel.InputDevice:937
      p = cvj.offset();
      //$LASTPOS=6000966;//kernel.InputDevice:966
      e.preventDefault();
      //$LASTPOS=6000995;//kernel.InputDevice:995
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=6001043;//kernel.InputDevice:1043
      //$LASTPOS=6001048;//kernel.InputDevice:1048
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=6001093;//kernel.InputDevice:1093
          src = ts[i];
          //$LASTPOS=6001121;//kernel.InputDevice:1121
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=6001177;//kernel.InputDevice:1177
          if (! dst) {
            //$LASTPOS=6001206;//kernel.InputDevice:1206
            //$LASTPOS=6001211;//kernel.InputDevice:1211
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=6001269;//kernel.InputDevice:1269
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=6001322;//kernel.InputDevice:1322
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=6001364;//kernel.InputDevice:1364
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
              j++;
            }
            
          }
          //$LASTPOS=6001497;//kernel.InputDevice:1497
          if (dst) {
            //$LASTPOS=6001525;//kernel.InputDevice:1525
            _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
            //$LASTPOS=6001586;//kernel.InputDevice:1586
            _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
            //$LASTPOS=6001630;//kernel.InputDevice:1630
            dst.x=_this.mp.x;
            //$LASTPOS=6001659;//kernel.InputDevice:1659
            dst.y=_this.mp.y;
            //$LASTPOS=6001688;//kernel.InputDevice:1688
            if (! dst.touched) {
              //$LASTPOS=6001705;//kernel.InputDevice:1705
              dst.touched=1;
            }
            
          }
        }
        i++;
      }
      //$LASTPOS=6001755;//kernel.InputDevice:1755
      Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
      //$LASTPOS=6001787;//kernel.InputDevice:1787
      Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
      //$LASTPOS=6001819;//kernel.InputDevice:1819
      _this.handleListeners();
    };
    //$LASTPOS=6001851;//kernel.InputDevice:1851
    Tonyu.globals.$handleTouchEnd=function (e) {
      var ts;
      var i;
      var src;
      var dst;
      
      //$LASTPOS=6001883;//kernel.InputDevice:1883
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=6001931;//kernel.InputDevice:1931
      //$LASTPOS=6001936;//kernel.InputDevice:1936
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=6001981;//kernel.InputDevice:1981
          src = ts[i];
          //$LASTPOS=6002009;//kernel.InputDevice:2009
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=6002065;//kernel.InputDevice:2065
          if (dst) {
            //$LASTPOS=6002093;//kernel.InputDevice:2093
            dst.touched=0;
            //$LASTPOS=6002125;//kernel.InputDevice:2125
            dst.identifier=- 1;
            
          }
        }
        i++;
      }
      //$LASTPOS=6002179;//kernel.InputDevice:2179
      _this.handleListeners();
    };
    //$LASTPOS=6002211;//kernel.InputDevice:2211
    handleMouse = function (e) {
      
      //$LASTPOS=6002232;//kernel.InputDevice:2232
      Tonyu.globals.$handleMouse(e);
    };
    //$LASTPOS=6002256;//kernel.InputDevice:2256
    handleTouch = function (e) {
      
      //$LASTPOS=6002277;//kernel.InputDevice:2277
      Tonyu.globals.$handleTouch(e);
    };
    //$LASTPOS=6002301;//kernel.InputDevice:2301
    handleTouchEnd = function (e) {
      
      //$LASTPOS=6002325;//kernel.InputDevice:2325
      Tonyu.globals.$handleTouchEnd(e);
    };
    //$LASTPOS=6002352;//kernel.InputDevice:2352
    d = $.data(cv,"events");
    //$LASTPOS=6002384;//kernel.InputDevice:2384
    if (! d) {
      //$LASTPOS=6002403;//kernel.InputDevice:2403
      $.data(cv,"events","true");
      //$LASTPOS=6002440;//kernel.InputDevice:2440
      cvj.mousedown(handleMouse);
      //$LASTPOS=6002477;//kernel.InputDevice:2477
      cvj.mousemove(handleMouse);
      //$LASTPOS=6002514;//kernel.InputDevice:2514
      cvj.on("touchstart",handleTouch);
      //$LASTPOS=6002557;//kernel.InputDevice:2557
      cvj.on("touchmove",handleTouch);
      //$LASTPOS=6002599;//kernel.InputDevice:2599
      cvj.on("touchend",handleTouchEnd);
      
    }
  },
  fiber$initCanvasEvents :function _trc_func_6000270_8(_thread,cvj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var cv;
    var handleMouse;
    var handleTouch;
    var handleTouchEnd;
    var d;
    
    //$LASTPOS=6000300;//kernel.InputDevice:300
    cv = cvj[0];
    
    _thread.enter(function _trc_func_6000270_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=6000320;//kernel.InputDevice:320
          Tonyu.globals.$handleMouse=function (e) {
            var p;
            var mp;
            
            //$LASTPOS=6000349;//kernel.InputDevice:349
            p = cvj.offset();
            //$LASTPOS=6000378;//kernel.InputDevice:378
            mp = {x: e.clientX-p.left,y: e.clientY-p.top};
            //$LASTPOS=6000435;//kernel.InputDevice:435
            mp=Tonyu.globals.$Screen.canvas2buf(mp);
            //$LASTPOS=6000471;//kernel.InputDevice:471
            Tonyu.globals.$mouseX=mp.x;
            //$LASTPOS=6000494;//kernel.InputDevice:494
            Tonyu.globals.$mouseY=mp.y;
            //$LASTPOS=6000517;//kernel.InputDevice:517
            if (_this.touchEmu) {
              //$LASTPOS=6000546;//kernel.InputDevice:546
              Tonyu.globals.$touches[0].x=mp.x;
              //$LASTPOS=6000579;//kernel.InputDevice:579
              Tonyu.globals.$touches[0].y=mp.y;
              
            }
            //$LASTPOS=6000619;//kernel.InputDevice:619
            _this.handleListeners();
          };
          //$LASTPOS=6000651;//kernel.InputDevice:651
          Tonyu.globals.$touches=[{},{},{},{},{}];
          //$LASTPOS=6000683;//kernel.InputDevice:683
          Tonyu.globals.$touches.findById=function (id) {
            var j;
            
            //$LASTPOS=6000718;//kernel.InputDevice:718
            //$LASTPOS=6000723;//kernel.InputDevice:723
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=6000773;//kernel.InputDevice:773
                if (Tonyu.globals.$touches[j].identifier==id) {
                  return Tonyu.globals.$touches[j];
                  
                }
              }
              j++;
            }
          };
          //$LASTPOS=6000883;//kernel.InputDevice:883
          Tonyu.globals.$handleTouch=function (e) {
            var p;
            var ts;
            var i;
            var src;
            var dst;
            var j;
            
            //$LASTPOS=6000912;//kernel.InputDevice:912
            _this.touchEmu=false;
            //$LASTPOS=6000937;//kernel.InputDevice:937
            p = cvj.offset();
            //$LASTPOS=6000966;//kernel.InputDevice:966
            e.preventDefault();
            //$LASTPOS=6000995;//kernel.InputDevice:995
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=6001043;//kernel.InputDevice:1043
            //$LASTPOS=6001048;//kernel.InputDevice:1048
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=6001093;//kernel.InputDevice:1093
                src = ts[i];
                //$LASTPOS=6001121;//kernel.InputDevice:1121
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=6001177;//kernel.InputDevice:1177
                if (! dst) {
                  //$LASTPOS=6001206;//kernel.InputDevice:1206
                  //$LASTPOS=6001211;//kernel.InputDevice:1211
                  j = 0;
                  while(j<Tonyu.globals.$touches.length) {
                    {
                      //$LASTPOS=6001269;//kernel.InputDevice:1269
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=6001322;//kernel.InputDevice:1322
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=6001364;//kernel.InputDevice:1364
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                    j++;
                  }
                  
                }
                //$LASTPOS=6001497;//kernel.InputDevice:1497
                if (dst) {
                  //$LASTPOS=6001525;//kernel.InputDevice:1525
                  _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                  //$LASTPOS=6001586;//kernel.InputDevice:1586
                  _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                  //$LASTPOS=6001630;//kernel.InputDevice:1630
                  dst.x=_this.mp.x;
                  //$LASTPOS=6001659;//kernel.InputDevice:1659
                  dst.y=_this.mp.y;
                  //$LASTPOS=6001688;//kernel.InputDevice:1688
                  if (! dst.touched) {
                    //$LASTPOS=6001705;//kernel.InputDevice:1705
                    dst.touched=1;
                  }
                  
                }
              }
              i++;
            }
            //$LASTPOS=6001755;//kernel.InputDevice:1755
            Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
            //$LASTPOS=6001787;//kernel.InputDevice:1787
            Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
            //$LASTPOS=6001819;//kernel.InputDevice:1819
            _this.handleListeners();
          };
          //$LASTPOS=6001851;//kernel.InputDevice:1851
          Tonyu.globals.$handleTouchEnd=function (e) {
            var ts;
            var i;
            var src;
            var dst;
            
            //$LASTPOS=6001883;//kernel.InputDevice:1883
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=6001931;//kernel.InputDevice:1931
            //$LASTPOS=6001936;//kernel.InputDevice:1936
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=6001981;//kernel.InputDevice:1981
                src = ts[i];
                //$LASTPOS=6002009;//kernel.InputDevice:2009
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=6002065;//kernel.InputDevice:2065
                if (dst) {
                  //$LASTPOS=6002093;//kernel.InputDevice:2093
                  dst.touched=0;
                  //$LASTPOS=6002125;//kernel.InputDevice:2125
                  dst.identifier=- 1;
                  
                }
              }
              i++;
            }
            //$LASTPOS=6002179;//kernel.InputDevice:2179
            _this.handleListeners();
          };
          //$LASTPOS=6002211;//kernel.InputDevice:2211
          handleMouse = function (e) {
            
            //$LASTPOS=6002232;//kernel.InputDevice:2232
            Tonyu.globals.$handleMouse(e);
          };
          //$LASTPOS=6002256;//kernel.InputDevice:2256
          handleTouch = function (e) {
            
            //$LASTPOS=6002277;//kernel.InputDevice:2277
            Tonyu.globals.$handleTouch(e);
          };
          //$LASTPOS=6002301;//kernel.InputDevice:2301
          handleTouchEnd = function (e) {
            
            //$LASTPOS=6002325;//kernel.InputDevice:2325
            Tonyu.globals.$handleTouchEnd(e);
          };
          //$LASTPOS=6002352;//kernel.InputDevice:2352
          d = $.data(cv,"events");
          //$LASTPOS=6002384;//kernel.InputDevice:2384
          if (! d) {
            //$LASTPOS=6002403;//kernel.InputDevice:2403
            $.data(cv,"events","true");
            //$LASTPOS=6002440;//kernel.InputDevice:2440
            cvj.mousedown(handleMouse);
            //$LASTPOS=6002477;//kernel.InputDevice:2477
            cvj.mousemove(handleMouse);
            //$LASTPOS=6002514;//kernel.InputDevice:2514
            cvj.on("touchstart",handleTouch);
            //$LASTPOS=6002557;//kernel.InputDevice:2557
            cvj.on("touchmove",handleTouch);
            //$LASTPOS=6002599;//kernel.InputDevice:2599
            cvj.on("touchend",handleTouchEnd);
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  update :function _trc_func_6002647_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_96;
    
    //$LASTPOS=6002664;//kernel.InputDevice:2664
    _it_96=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_96.next()) {
      i=_it_96[0];
      
      //$LASTPOS=6002699;//kernel.InputDevice:2699
      if (i.touched>0) {
        //$LASTPOS=6002717;//kernel.InputDevice:2717
        i.touched++;
        
      }
      //$LASTPOS=6002740;//kernel.InputDevice:2740
      if (i.touched==- 1) {
        //$LASTPOS=6002759;//kernel.InputDevice:2759
        i.touched=1;
      }
      
    }
  },
  fiber$update :function _trc_func_6002647_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_96;
    
    //$LASTPOS=6002664;//kernel.InputDevice:2664
    _it_96=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_96.next()) {
      i=_it_96[0];
      
      //$LASTPOS=6002699;//kernel.InputDevice:2699
      if (i.touched>0) {
        //$LASTPOS=6002717;//kernel.InputDevice:2717
        i.touched++;
        
      }
      //$LASTPOS=6002740;//kernel.InputDevice:2740
      if (i.touched==- 1) {
        //$LASTPOS=6002759;//kernel.InputDevice:2759
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
  main :function _trc_func_7000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=7000084;//kernel.Keys:84
    _this.stats={};
    //$LASTPOS=7000094;//kernel.Keys:94
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=7000212;//kernel.Keys:212
    //$LASTPOS=7000217;//kernel.Keys:217
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=7000248;//kernel.Keys:248
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=7000297;//kernel.Keys:297
    //$LASTPOS=7000302;//kernel.Keys:302
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=7000330;//kernel.Keys:330
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=7000365;//kernel.Keys:365
    if (! $.data(document,"key_event")) {
      //$LASTPOS=7000406;//kernel.Keys:406
      $.data(document,"key_event",true);
      //$LASTPOS=7000445;//kernel.Keys:445
      $(document).keydown(function (e) {
        
        //$LASTPOS=7000471;//kernel.Keys:471
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=7000495;//kernel.Keys:495
      $(document).keyup(function (e) {
        
        //$LASTPOS=7000519;//kernel.Keys:519
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=7000541;//kernel.Keys:541
      $(document).mousedown(function (e) {
        
        //$LASTPOS=7000578;//kernel.Keys:578
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7000619;//kernel.Keys:619
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=7000660;//kernel.Keys:660
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=7000697;//kernel.Keys:697
      $(document).mouseup(function (e) {
        
        //$LASTPOS=7000732;//kernel.Keys:732
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7000773;//kernel.Keys:773
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=7000814;//kernel.Keys:814
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
  },
  fiber$main :function _trc_func_7000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=7000084;//kernel.Keys:84
    _this.stats={};
    //$LASTPOS=7000094;//kernel.Keys:94
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=7000212;//kernel.Keys:212
    //$LASTPOS=7000217;//kernel.Keys:217
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=7000248;//kernel.Keys:248
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=7000297;//kernel.Keys:297
    //$LASTPOS=7000302;//kernel.Keys:302
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=7000330;//kernel.Keys:330
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=7000365;//kernel.Keys:365
    if (! $.data(document,"key_event")) {
      //$LASTPOS=7000406;//kernel.Keys:406
      $.data(document,"key_event",true);
      //$LASTPOS=7000445;//kernel.Keys:445
      $(document).keydown(function (e) {
        
        //$LASTPOS=7000471;//kernel.Keys:471
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=7000495;//kernel.Keys:495
      $(document).keyup(function (e) {
        
        //$LASTPOS=7000519;//kernel.Keys:519
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=7000541;//kernel.Keys:541
      $(document).mousedown(function (e) {
        
        //$LASTPOS=7000578;//kernel.Keys:578
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7000619;//kernel.Keys:619
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=7000660;//kernel.Keys:660
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=7000697;//kernel.Keys:697
      $(document).mouseup(function (e) {
        
        //$LASTPOS=7000732;//kernel.Keys:732
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7000773;//kernel.Keys:773
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=7000814;//kernel.Keys:814
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
    
    _thread.retVal=_this;return;
  },
  getkey :function _trc_func_7000847_2(code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7000875;//kernel.Keys:875
    if (typeof  code=="string") {
      //$LASTPOS=7000912;//kernel.Keys:912
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=7000954;//kernel.Keys:954
    if (! code) {
      return 0;
    }
    //$LASTPOS=7000979;//kernel.Keys:979
    if (_this.stats[code]==- 1) {
      return 0;
    }
    //$LASTPOS=7001014;//kernel.Keys:1014
    if (! _this.stats[code]) {
      //$LASTPOS=7001032;//kernel.Keys:1032
      _this.stats[code]=0;
    }
    return _this.stats[code];
  },
  fiber$getkey :function _trc_func_7000847_3(_thread,code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7000875;//kernel.Keys:875
    if (typeof  code=="string") {
      //$LASTPOS=7000912;//kernel.Keys:912
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=7000954;//kernel.Keys:954
    if (! code) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=7000979;//kernel.Keys:979
    if (_this.stats[code]==- 1) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=7001014;//kernel.Keys:1014
    if (! _this.stats[code]) {
      //$LASTPOS=7001032;//kernel.Keys:1032
      _this.stats[code]=0;
    }
    _thread.retVal=_this.stats[code];return;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_7001073_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_104;
    
    //$LASTPOS=7001097;//kernel.Keys:1097
    _it_104=Tonyu.iterator(_this.stats,1);
    while(_it_104.next()) {
      i=_it_104[0];
      
      //$LASTPOS=7001128;//kernel.Keys:1128
      if (_this.stats[i]>0) {
        //$LASTPOS=7001145;//kernel.Keys:1145
        _this.stats[i]++;
        
      }
      //$LASTPOS=7001166;//kernel.Keys:1166
      if (_this.stats[i]==- 1) {
        //$LASTPOS=7001184;//kernel.Keys:1184
        _this.stats[i]=1;
      }
      
    }
  },
  fiber$update :function _trc_func_7001073_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_104;
    
    //$LASTPOS=7001097;//kernel.Keys:1097
    _it_104=Tonyu.iterator(_this.stats,1);
    while(_it_104.next()) {
      i=_it_104[0];
      
      //$LASTPOS=7001128;//kernel.Keys:1128
      if (_this.stats[i]>0) {
        //$LASTPOS=7001145;//kernel.Keys:1145
        _this.stats[i]++;
        
      }
      //$LASTPOS=7001166;//kernel.Keys:1166
      if (_this.stats[i]==- 1) {
        //$LASTPOS=7001184;//kernel.Keys:1184
        _this.stats[i]=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  keydown :function _trc_func_7001204_6(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var s;
    
    //$LASTPOS=7001222;//kernel.Keys:1222
    s = _this.stats[e.keyCode];
    //$LASTPOS=7001250;//kernel.Keys:1250
    if (! s) {
      //$LASTPOS=7001268;//kernel.Keys:1268
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=7001298;//kernel.Keys:1298
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keydown :function _trc_func_7001204_7(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var s;
    
    //$LASTPOS=7001222;//kernel.Keys:1222
    s = _this.stats[e.keyCode];
    //$LASTPOS=7001250;//kernel.Keys:1250
    if (! s) {
      //$LASTPOS=7001268;//kernel.Keys:1268
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=7001298;//kernel.Keys:1298
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  keyup :function _trc_func_7001332_8(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=7001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keyup :function _trc_func_7001332_9(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=7001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Keys,{"fullName":"kernel.Keys","namespace":"kernel","shortName":"Keys","decls":{"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod],{
  main :function _trc_func_8000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_8000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_8000143_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=8000162;//kernel.BaseActor:162
    if (Tonyu.runMode) {
      //$LASTPOS=8000192;//kernel.BaseActor:192
      if (Tonyu.globals.$Scheduler) {
        //$LASTPOS=8000223;//kernel.BaseActor:223
        _this._th=Tonyu.globals.$Scheduler.newThread(_this,"main",[]);
        
      } else {
        //$LASTPOS=8000298;//kernel.BaseActor:298
        thg = _this.currentThreadGroup();
        //$LASTPOS=8000341;//kernel.BaseActor:341
        if (thg) {
          //$LASTPOS=8000350;//kernel.BaseActor:350
          _this._th=thg.addObj(_this);
        }
        
      }
      
    }
    //$LASTPOS=8000395;//kernel.BaseActor:395
    if (typeof  x=="object") {
      //$LASTPOS=8000419;//kernel.BaseActor:419
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=8000451;//kernel.BaseActor:451
      if (typeof  x=="number") {
        //$LASTPOS=8000486;//kernel.BaseActor:486
        _this.x=x;
        //$LASTPOS=8000505;//kernel.BaseActor:505
        _this.y=y;
        //$LASTPOS=8000524;//kernel.BaseActor:524
        _this.p=p;
        
      }
    }
    //$LASTPOS=8000546;//kernel.BaseActor:546
    if (_this.scaleX==null) {
      //$LASTPOS=8000564;//kernel.BaseActor:564
      _this.scaleX=1;
    }
    //$LASTPOS=8000579;//kernel.BaseActor:579
    if (_this.rotation==null) {
      //$LASTPOS=8000599;//kernel.BaseActor:599
      _this.rotation=0;
    }
    //$LASTPOS=8000616;//kernel.BaseActor:616
    if (_this.rotate==null) {
      //$LASTPOS=8000634;//kernel.BaseActor:634
      _this.rotate=0;
    }
    //$LASTPOS=8000649;//kernel.BaseActor:649
    if (_this.alpha==null) {
      //$LASTPOS=8000666;//kernel.BaseActor:666
      _this.alpha=255;
    }
    //$LASTPOS=8000682;//kernel.BaseActor:682
    if (_this.zOrder==null) {
      //$LASTPOS=8000700;//kernel.BaseActor:700
      _this.zOrder=0;
    }
    //$LASTPOS=8000715;//kernel.BaseActor:715
    if (_this.age==null) {
      //$LASTPOS=8000730;//kernel.BaseActor:730
      _this.age=0;
    }
    //$LASTPOS=8000742;//kernel.BaseActor:742
    if (_this.anim!=null&&typeof  _this.anim=="object") {
      //$LASTPOS=8000793;//kernel.BaseActor:793
      _this.animMode=true;
      //$LASTPOS=8000817;//kernel.BaseActor:817
      _this.animFrame=0;
      
    } else {
      //$LASTPOS=8000851;//kernel.BaseActor:851
      _this.animMode=false;
      
    }
    //$LASTPOS=8000879;//kernel.BaseActor:879
    if (_this.animFps==null) {
      //$LASTPOS=8000898;//kernel.BaseActor:898
      _this.animFps=1;
    }
  },
  extend :function _trc_func_8000913_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  print :function _trc_func_8000977_4(pt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001002;//kernel.BaseActor:1002
    console.log.apply(console,arguments);
    //$LASTPOS=8001045;//kernel.BaseActor:1045
    if (Tonyu.globals.$consolePanel) {
      //$LASTPOS=8001073;//kernel.BaseActor:1073
      Tonyu.globals.$consolePanel.scroll(0,20);
      //$LASTPOS=8001110;//kernel.BaseActor:1110
      Tonyu.globals.$consolePanel.setFillStyle("white");
      //$LASTPOS=8001156;//kernel.BaseActor:1156
      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");
      
    }
  },
  setAnimFps :function _trc_func_8001224_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001252;//kernel.BaseActor:1252
    _this.animFps=f;
    //$LASTPOS=8001273;//kernel.BaseActor:1273
    _this.animFrame=0;
    //$LASTPOS=8001296;//kernel.BaseActor:1296
    _this.animMode=true;
  },
  startAnim :function _trc_func_8001320_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001346;//kernel.BaseActor:1346
    _this.animMode=true;
  },
  stopAnim :function _trc_func_8001370_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001395;//kernel.BaseActor:1395
    _this.animMode=false;
  },
  update :function _trc_func_8001420_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001437;//kernel.BaseActor:1437
    _this.onUpdate();
    //$LASTPOS=8001454;//kernel.BaseActor:1454
    if (null) {
      //$LASTPOS=8001477;//kernel.BaseActor:1477
      null.suspend();
      //$LASTPOS=8001505;//kernel.BaseActor:1505
      if (Tonyu.globals.$Scheduler) {
        //$LASTPOS=8001521;//kernel.BaseActor:1521
        Tonyu.globals.$Scheduler.addToNext(null);
      }
      
    }
  },
  fiber$update :function _trc_func_8001420_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8001437;//kernel.BaseActor:1437
    _this.onUpdate();
    //$LASTPOS=8001454;//kernel.BaseActor:1454
    if (_thread) {
      //$LASTPOS=8001477;//kernel.BaseActor:1477
      _thread.suspend();
      //$LASTPOS=8001505;//kernel.BaseActor:1505
      if (Tonyu.globals.$Scheduler) {
        //$LASTPOS=8001521;//kernel.BaseActor:1521
        Tonyu.globals.$Scheduler.addToNext(_thread);
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  onUpdate :function _trc_func_8001563_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  updateEx :function _trc_func_8001590_11(updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var updateCount;
    
    //$LASTPOS=8001615;//kernel.BaseActor:1615
    //$LASTPOS=8001619;//kernel.BaseActor:1619
    updateCount = 0;
    while(updateCount<updateT) {
      {
        //$LASTPOS=8001682;//kernel.BaseActor:1682
        _this.update();
      }
      updateCount++;
    }
  },
  fiber$updateEx :function _trc_func_8001590_12(_thread,updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var updateCount;
    
    
    _thread.enter(function _trc_func_8001590_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=8001615;//kernel.BaseActor:1615
          //$LASTPOS=8001619;//kernel.BaseActor:1619
          updateCount = 0;;
        case 1:
          if (!(updateCount<updateT)) { __pc=3; break; }
          //$LASTPOS=8001682;//kernel.BaseActor:1682
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
  getkey :function _trc_func_8001703_14(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$Keys.getkey(k);
  },
  hitTo :function _trc_func_8001756_15(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.crashTo(t);
  },
  all :function _trc_func_8001803_16(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=8001825;//kernel.BaseActor:1825
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=8001850;//kernel.BaseActor:1850
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      
      //$LASTPOS=8001891;//kernel.BaseActor:1891
      if (s===_this) {
        return _this;
      }
      //$LASTPOS=8001922;//kernel.BaseActor:1922
      if (! c||s instanceof c) {
        //$LASTPOS=8001963;//kernel.BaseActor:1963
        res.push(s);
        
      }
    });
    return res;
  },
  allCrash :function _trc_func_8002043_17(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var sp;
    var t1;
    
    //$LASTPOS=8002070;//kernel.BaseActor:2070
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=8002095;//kernel.BaseActor:2095
    sp = _this;
    //$LASTPOS=8002132;//kernel.BaseActor:2132
    t1 = _this.getCrashRect();
    //$LASTPOS=8002160;//kernel.BaseActor:2160
    if (! t1) {
      return res;
    }
    //$LASTPOS=8002186;//kernel.BaseActor:2186
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      var t2;
      
      //$LASTPOS=8002227;//kernel.BaseActor:2227
      t2;
      //$LASTPOS=8002244;//kernel.BaseActor:2244
      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
        //$LASTPOS=8002470;//kernel.BaseActor:2470
        res.push(s);
        
      }
    });
    return res;
  },
  crashTo :function _trc_func_8002524_18(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8002550;//kernel.BaseActor:2550
    if (! t) {
      return false;
    }
    //$LASTPOS=8002577;//kernel.BaseActor:2577
    if (typeof  t=="function") {
      return _this.allCrash(t)[0];
      
    }
    return _this.crashTo1(t);
  },
  crashTo1 :function _trc_func_8002673_19(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t1;
    var t2;
    
    //$LASTPOS=8002700;//kernel.BaseActor:2700
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=8002828;//kernel.BaseActor:2828
    t1 = _this.getCrashRect();
    //$LASTPOS=8002856;//kernel.BaseActor:2856
    t2 = t.getCrashRect();
    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
  },
  getCrashRect :function _trc_func_8003138_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var actWidth;
    var actHeight;
    
    //$LASTPOS=8003168;//kernel.BaseActor:3168
    actWidth = _this.width*_this.scaleX;actHeight;
    //$LASTPOS=8003211;//kernel.BaseActor:3211
    if (typeof  _this.scaleY==="undefined") {
      //$LASTPOS=8003253;//kernel.BaseActor:3253
      actHeight=_this.height*_this.scaleX;
      
    } else {
      //$LASTPOS=8003299;//kernel.BaseActor:3299
      actHeight=_this.height*_this.scaleY;
      
    }
    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
  },
  within :function _trc_func_8003503_21(t,distance) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8003536;//kernel.BaseActor:3536
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=8003575;//kernel.BaseActor:3575
    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
      return true;
      
    }
    return false;
  },
  watchHit :function _trc_func_8003717_22(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8003760;//kernel.BaseActor:3760
    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {
      
      //$LASTPOS=8003811;//kernel.BaseActor:3811
      onHit.apply(_this,[a,b]);
    });
  },
  currentThreadGroup :function _trc_func_8003849_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$currentThreadGroup;
  },
  die :function _trc_func_8003917_24() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8003938;//kernel.BaseActor:3938
    if (_this._th) {
      //$LASTPOS=8003958;//kernel.BaseActor:3958
      _this._th.kill();
      
    }
    //$LASTPOS=8003982;//kernel.BaseActor:3982
    _this.hide();
    //$LASTPOS=8003995;//kernel.BaseActor:3995
    _this.fireEvent("die");
    //$LASTPOS=8004018;//kernel.BaseActor:4018
    _this._isDead=true;
  },
  hide :function _trc_func_8004036_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004197;//kernel.BaseActor:4197
    if (_this.layer&&typeof  _this.layer.remove=="function") {
      //$LASTPOS=8004252;//kernel.BaseActor:4252
      _this.layer.remove(_this);
      
    } else {
      //$LASTPOS=8004293;//kernel.BaseActor:4293
      Tonyu.globals.$Sprites.remove(_this);
      
    }
  },
  show :function _trc_func_8004327_26(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004354;//kernel.BaseActor:4354
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=8004406;//kernel.BaseActor:4406
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=8004444;//kernel.BaseActor:4444
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=8004476;//kernel.BaseActor:4476
    if (x!=null) {
      //$LASTPOS=8004489;//kernel.BaseActor:4489
      _this.x=x;
    }
    //$LASTPOS=8004504;//kernel.BaseActor:4504
    if (y!=null) {
      //$LASTPOS=8004517;//kernel.BaseActor:4517
      _this.y=y;
    }
    //$LASTPOS=8004532;//kernel.BaseActor:4532
    if (p!=null) {
      //$LASTPOS=8004545;//kernel.BaseActor:4545
      _this.p=p;
    }
  },
  detectShape :function _trc_func_8004561_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004590;//kernel.BaseActor:4590
    if (typeof  _this.p!="number") {
      //$LASTPOS=8004625;//kernel.BaseActor:4625
      if (_this.text!=null) {
        return _this;
      }
      //$LASTPOS=8004658;//kernel.BaseActor:4658
      _this.p=0;
      
    }
    //$LASTPOS=8004675;//kernel.BaseActor:4675
    _this.p=Math.floor(_this.p);
    //$LASTPOS=8004697;//kernel.BaseActor:4697
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
    //$LASTPOS=8004735;//kernel.BaseActor:4735
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=8004759;//kernel.BaseActor:4759
    _this.width=_this.pImg.width;
    //$LASTPOS=8004782;//kernel.BaseActor:4782
    _this.height=_this.pImg.height;
  },
  waitFor :function _trc_func_8004806_28(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004825;//kernel.BaseActor:4825
    if (null) {
      //$LASTPOS=8004849;//kernel.BaseActor:4849
      null.waitFor(f);
      
    }
  },
  fiber$waitFor :function _trc_func_8004806_29(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8004825;//kernel.BaseActor:4825
    if (_thread) {
      //$LASTPOS=8004849;//kernel.BaseActor:4849
      _thread.waitFor(f);
      
    }
    
    _thread.retVal=_this;return;
  },
  isDead :function _trc_func_8004897_30() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._isDead;
  },
  animation :function _trc_func_8004943_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004969;//kernel.BaseActor:4969
    _this.age++;
    //$LASTPOS=8004981;//kernel.BaseActor:4981
    if (_this.animMode&&_this.age%_this.animFps==0) {
      //$LASTPOS=8005022;//kernel.BaseActor:5022
      _this.p=_this.anim[_this.animFrame%_this.anim.length];
      //$LASTPOS=8005062;//kernel.BaseActor:5062
      _this.animFrame++;
      
    }
  },
  draw :function _trc_func_8005086_32(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=8005111;//kernel.BaseActor:5111
    if (_this.x==null||_this.y==null||_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=8005164;//kernel.BaseActor:5164
    _this.detectShape();
    //$LASTPOS=8005184;//kernel.BaseActor:5184
    if (_this.pImg) {
      //$LASTPOS=8005205;//kernel.BaseActor:5205
      ctx.save();
      //$LASTPOS=8005226;//kernel.BaseActor:5226
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=8005370;//kernel.BaseActor:5370
      _this.animation();
      //$LASTPOS=8005392;//kernel.BaseActor:5392
      if (_this.rotation!=0) {
        //$LASTPOS=8005427;//kernel.BaseActor:5427
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=8005495;//kernel.BaseActor:5495
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=8005552;//kernel.BaseActor:5552
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=8005604;//kernel.BaseActor:5604
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=8005669;//kernel.BaseActor:5669
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=8005725;//kernel.BaseActor:5725
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=8005766;//kernel.BaseActor:5766
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=8005898;//kernel.BaseActor:5898
      ctx.restore();
      
    } else {
      //$LASTPOS=8005925;//kernel.BaseActor:5925
      if (_this.text!==null&&_this.text!==undefined) {
        //$LASTPOS=8005973;//kernel.BaseActor:5973
        if (! _this.size) {
          //$LASTPOS=8005984;//kernel.BaseActor:5984
          _this.size=15;
        }
        //$LASTPOS=8006002;//kernel.BaseActor:6002
        if (! _this.align) {
          //$LASTPOS=8006014;//kernel.BaseActor:6014
          _this.align="center";
        }
        //$LASTPOS=8006039;//kernel.BaseActor:6039
        if (! _this.fillStyle) {
          //$LASTPOS=8006055;//kernel.BaseActor:6055
          _this.fillStyle="white";
        }
        //$LASTPOS=8006083;//kernel.BaseActor:6083
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=8006117;//kernel.BaseActor:6117
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=8006158;//kernel.BaseActor:6158
        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
        //$LASTPOS=8006229;//kernel.BaseActor:6229
        _this.width=rect.w;
        //$LASTPOS=8006252;//kernel.BaseActor:6252
        _this.height=rect.h;
        
      }
    }
    //$LASTPOS=8006279;//kernel.BaseActor:6279
    if (_this._fukidashi) {
      //$LASTPOS=8006306;//kernel.BaseActor:6306
      if (_this._fukidashi.c>0) {
        //$LASTPOS=8006341;//kernel.BaseActor:6341
        _this._fukidashi.c--;
        //$LASTPOS=8006370;//kernel.BaseActor:6370
        ctx.fillStyle="white";
        //$LASTPOS=8006406;//kernel.BaseActor:6406
        ctx.strokeStyle="black";
        //$LASTPOS=8006444;//kernel.BaseActor:6444
        _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
        
      }
      
    }
  },
  asyncResult :function _trc_func_8006550_33() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.asyncResult();
  },
  screenOut :function _trc_func_8006613_34(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=8006666;//kernel.BaseActor:6666
    if (! a) {
      //$LASTPOS=8006674;//kernel.BaseActor:6674
      a=0;
    }
    //$LASTPOS=8006684;//kernel.BaseActor:6684
    r = 0;
    //$LASTPOS=8006698;//kernel.BaseActor:6698
    viewX = 0;viewY = 0;
    //$LASTPOS=8006724;//kernel.BaseActor:6724
    if (_this.x<viewX+a) {
      //$LASTPOS=8006753;//kernel.BaseActor:6753
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=8006772;//kernel.BaseActor:6772
    if (_this.y<viewY+a) {
      //$LASTPOS=8006801;//kernel.BaseActor:6801
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=8006820;//kernel.BaseActor:6820
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=8006849;//kernel.BaseActor:6849
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=8006884;//kernel.BaseActor:6884
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=8006913;//kernel.BaseActor:6913
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    return r;
  },
  fiber$screenOut :function _trc_func_8006613_35(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=8006666;//kernel.BaseActor:6666
    if (! a) {
      //$LASTPOS=8006674;//kernel.BaseActor:6674
      a=0;
    }
    //$LASTPOS=8006684;//kernel.BaseActor:6684
    r = 0;
    //$LASTPOS=8006698;//kernel.BaseActor:6698
    viewX = 0;viewY = 0;
    //$LASTPOS=8006724;//kernel.BaseActor:6724
    if (_this.x<viewX+a) {
      //$LASTPOS=8006753;//kernel.BaseActor:6753
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=8006772;//kernel.BaseActor:6772
    if (_this.y<viewY+a) {
      //$LASTPOS=8006801;//kernel.BaseActor:6801
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=8006820;//kernel.BaseActor:6820
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=8006849;//kernel.BaseActor:6849
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=8006884;//kernel.BaseActor:6884
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=8006913;//kernel.BaseActor:6913
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    _thread.retVal=r;return;
    
    
    _thread.retVal=_this;return;
  },
  file :function _trc_func_8006962_36(path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var d;
    var files;
    
    //$LASTPOS=8006981;//kernel.BaseActor:6981
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=8007023;//kernel.BaseActor:7023
    files = d.rel("files/");
    return FS.get(files.rel(path),{topDir: d});
  },
  fiber$file :function _trc_func_8006962_37(_thread,path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var d;
    var files;
    
    //$LASTPOS=8006981;//kernel.BaseActor:6981
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=8007023;//kernel.BaseActor:7023
    files = d.rel("files/");
    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
    
    
    _thread.retVal=_this;return;
  },
  waitInputDevice :function _trc_func_8007102_38(fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8007130;//kernel.BaseActor:7130
    if (fl!==false) {
      //$LASTPOS=8007157;//kernel.BaseActor:7157
      if (! _this.origTG) {
        
        
      }
      //$LASTPOS=8007309;//kernel.BaseActor:7309
      _this.a=_this.asyncResult();
      //$LASTPOS=8007335;//kernel.BaseActor:7335
      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
      //$LASTPOS=8007389;//kernel.BaseActor:7389
      _this.waitFor(_this.a);
      
    } else {
      //$LASTPOS=8007424;//kernel.BaseActor:7424
      if (_this.origTG) {
        
        
      }
      
    }
  },
  fiber$waitInputDevice :function _trc_func_8007102_39(_thread,fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_8007102_40(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=8007130;//kernel.BaseActor:7130
          if (!(fl!==false)) { __pc=3; break; }
          //$LASTPOS=8007157;//kernel.BaseActor:7157
          if (!(! _this.origTG)) { __pc=1; break; }
          {
            //$LASTPOS=8007211;//kernel.BaseActor:7211
            _this.origTG=_thread.group;
            //$LASTPOS=8007250;//kernel.BaseActor:7250
            _thread.setGroup(null);
          }
        case 1:
          
          //$LASTPOS=8007309;//kernel.BaseActor:7309
          _this.a=_this.asyncResult();
          //$LASTPOS=8007335;//kernel.BaseActor:7335
          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
          //$LASTPOS=8007389;//kernel.BaseActor:7389
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          __pc=5;break;
        case 3:
          //$LASTPOS=8007424;//kernel.BaseActor:7424
          if (!(_this.origTG)) { __pc=4; break; }
          {
            //$LASTPOS=8007477;//kernel.BaseActor:7477
            _thread.setGroup(_this.origTG);
            //$LASTPOS=8007520;//kernel.BaseActor:7520
            _this.origTG=null;
          }
        case 4:
          
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  redrawScreen :function _trc_func_8007570_41() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8007593;//kernel.BaseActor:7593
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=8007629;//kernel.BaseActor:7629
    Tonyu.globals.$Screen.draw();
  },
  fiber$redrawScreen :function _trc_func_8007570_42(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8007593;//kernel.BaseActor:7593
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=8007629;//kernel.BaseActor:7629
    Tonyu.globals.$Screen.draw();
    
    _thread.retVal=_this;return;
  },
  color :function _trc_func_8007670_43(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_8007670_44(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_8007732_45(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=8007768;//kernel.BaseActor:7768
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=8007793;//kernel.BaseActor:7793
    if (! size) {
      //$LASTPOS=8007804;//kernel.BaseActor:7804
      size=15;
    }
    //$LASTPOS=8007818;//kernel.BaseActor:7818
    if (! col) {
      //$LASTPOS=8007828;//kernel.BaseActor:7828
      col="cyan";
    }
    //$LASTPOS=8007845;//kernel.BaseActor:7845
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8007899;//kernel.BaseActor:7899
    if (tp.length>0) {
      //$LASTPOS=8007927;//kernel.BaseActor:7927
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=8008006;//kernel.BaseActor:8006
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_8007732_46(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=8007768;//kernel.BaseActor:7768
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=8007793;//kernel.BaseActor:7793
    if (! size) {
      //$LASTPOS=8007804;//kernel.BaseActor:7804
      size=15;
    }
    //$LASTPOS=8007818;//kernel.BaseActor:7818
    if (! col) {
      //$LASTPOS=8007828;//kernel.BaseActor:7828
      col="cyan";
    }
    //$LASTPOS=8007845;//kernel.BaseActor:7845
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8007899;//kernel.BaseActor:7899
    if (tp.length>0) {
      //$LASTPOS=8007927;//kernel.BaseActor:7927
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=8008006;//kernel.BaseActor:8006
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_8008059_47(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=8008091;//kernel.BaseActor:8091
    if (! col) {
      //$LASTPOS=8008101;//kernel.BaseActor:8101
      col="white";
    }
    //$LASTPOS=8008119;//kernel.BaseActor:8119
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8008173;//kernel.BaseActor:8173
    if (tp.length>0) {
      //$LASTPOS=8008201;//kernel.BaseActor:8201
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=8008266;//kernel.BaseActor:8266
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_8008059_48(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=8008091;//kernel.BaseActor:8091
    if (! col) {
      //$LASTPOS=8008101;//kernel.BaseActor:8101
      col="white";
    }
    //$LASTPOS=8008119;//kernel.BaseActor:8119
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8008173;//kernel.BaseActor:8173
    if (tp.length>0) {
      //$LASTPOS=8008201;//kernel.BaseActor:8201
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=8008266;//kernel.BaseActor:8266
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  loadPage :function _trc_func_8008304_49(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8008330;//kernel.BaseActor:8330
    _this.all().die();
    //$LASTPOS=8008348;//kernel.BaseActor:8348
    new page(arg);
    //$LASTPOS=8008368;//kernel.BaseActor:8368
    _this.die();
  },
  fiber$loadPage :function _trc_func_8008304_50(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8008330;//kernel.BaseActor:8330
    _this.all().die();
    //$LASTPOS=8008348;//kernel.BaseActor:8348
    new page(arg);
    //$LASTPOS=8008368;//kernel.BaseActor:8368
    _this.die();
    
    _thread.retVal=_this;return;
  },
  setVisible :function _trc_func_8008381_51(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8008403;//kernel.BaseActor:8403
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_8008381_52(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8008403;//kernel.BaseActor:8403
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventHandler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_9000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9000020;//kernel.EventHandler:20
    _this.listeners=[];
  },
  fiber$main :function _trc_func_9000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9000020;//kernel.EventHandler:20
    _this.listeners=[];
    
    _thread.retVal=_this;return;
  },
  addListener :function _trc_func_9000037_2(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    return {remove: function () {
      
      //$LASTPOS=9000125;//kernel.EventHandler:125
      _this.removeListener(f);
    }};
  },
  fiber$addListener :function _trc_func_9000037_3(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    
    _thread.enter(function _trc_func_9000037_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          _thread.exit({remove: function () {
            
            //$LASTPOS=9000125;//kernel.EventHandler:125
            _this.removeListener(f);
          }});return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  removeListener :function _trc_func_9000167_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=9000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=9000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
  },
  fiber$removeListener :function _trc_func_9000167_6(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=9000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=9000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
    
    _thread.retVal=_this;return;
  },
  fire :function _trc_func_9000253_7(args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var h;
    var _it_136;
    
    //$LASTPOS=9000272;//kernel.EventHandler:272
    if (_this.released) {
      return _this;
    }
    //$LASTPOS=9000299;//kernel.EventHandler:299
    _it_136=Tonyu.iterator(_this.listeners,1);
    while(_it_136.next()) {
      h=_it_136[0];
      
      //$LASTPOS=9000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
  },
  fiber$fire :function _trc_func_9000253_8(_thread,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var h;
    var _it_136;
    
    //$LASTPOS=9000272;//kernel.EventHandler:272
    if (_this.released) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=9000299;//kernel.EventHandler:299
    _it_136=Tonyu.iterator(_this.listeners,1);
    while(_it_136.next()) {
      h=_it_136[0];
      
      //$LASTPOS=9000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
    
    _thread.retVal=_this;return;
  },
  release :function _trc_func_9000366_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9000384;//kernel.EventHandler:384
    _this.released=true;
  },
  fiber$release :function _trc_func_9000366_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9000384;//kernel.EventHandler:384
    _this.released=true;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventHandler,{"fullName":"kernel.EventHandler","namespace":"kernel","shortName":"EventHandler","decls":{"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"removeListener":{"nowait":false},"fire":{"nowait":false},"release":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NoviceActor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_10000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_10000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sleep :function _trc_func_10000034_2(n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=10000057;//kernel.NoviceActor:57
      n=1;
    }
    //$LASTPOS=10000066;//kernel.NoviceActor:66
    //$LASTPOS=10000070;//kernel.NoviceActor:70
    n;
    while(n>0) {
      //$LASTPOS=10000081;//kernel.NoviceActor:81
      _this.update();
      n--;
    }
  },
  fiber$sleep :function _trc_func_10000034_3(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=10000057;//kernel.NoviceActor:57
      n=1;
    }
    
    _thread.enter(function _trc_func_10000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000066;//kernel.NoviceActor:66
          //$LASTPOS=10000070;//kernel.NoviceActor:70
          n;;
        case 1:
          if (!(n>0)) { __pc=3; break; }
          //$LASTPOS=10000081;//kernel.NoviceActor:81
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
  initSprite :function _trc_func_10000093_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=10000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=10000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
  },
  fiber$initSprite :function _trc_func_10000093_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=10000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=10000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.retVal=_this;return;
  },
  say :function _trc_func_10000235_7(text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=10000268;//kernel.NoviceActor:268
      size=15;
    }
    //$LASTPOS=10000281;//kernel.NoviceActor:281
    _this.initSprite();
    //$LASTPOS=10000299;//kernel.NoviceActor:299
    _this._sprite._fukidashi={text: text,size: size,c: 30};
  },
  fiber$say :function _trc_func_10000235_8(_thread,text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=10000268;//kernel.NoviceActor:268
      size=15;
    }
    
    _thread.enter(function _trc_func_10000235_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000281;//kernel.NoviceActor:281
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=10000299;//kernel.NoviceActor:299
          _this._sprite._fukidashi={text: text,size: size,c: 30};
          _thread.exit(_this);return;
        }
      }
    });
  },
  sprite :function _trc_func_10000350_10(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000371;//kernel.NoviceActor:371
    _this.go(x,y,p);
  },
  fiber$sprite :function _trc_func_10000350_11(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_10000350_12(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000371;//kernel.NoviceActor:371
          _this.fiber$go(_thread, x, y, p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  show :function _trc_func_10000384_13(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000403;//kernel.NoviceActor:403
    _this.go(x,y,p);
  },
  draw :function _trc_func_10000416_14(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000440;//kernel.NoviceActor:440
    _this._sprite.draw(ctx);
  },
  getCrashRect :function _trc_func_10000461_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._sprite.getCrashRect();
  },
  go :function _trc_func_10000516_16(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000533;//kernel.NoviceActor:533
    _this.initSprite();
    //$LASTPOS=10000551;//kernel.NoviceActor:551
    _this._sprite.x=x;
    //$LASTPOS=10000568;//kernel.NoviceActor:568
    _this._sprite.y=y;
    //$LASTPOS=10000585;//kernel.NoviceActor:585
    if (p!=null) {
      //$LASTPOS=10000598;//kernel.NoviceActor:598
      _this._sprite.p=p;
    }
  },
  fiber$go :function _trc_func_10000516_17(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_10000516_18(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000533;//kernel.NoviceActor:533
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=10000551;//kernel.NoviceActor:551
          _this._sprite.x=x;
          //$LASTPOS=10000568;//kernel.NoviceActor:568
          _this._sprite.y=y;
          //$LASTPOS=10000585;//kernel.NoviceActor:585
          if (p!=null) {
            //$LASTPOS=10000598;//kernel.NoviceActor:598
            _this._sprite.p=p;
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  change :function _trc_func_10000629_19(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000646;//kernel.NoviceActor:646
    _this.initSprite();
    //$LASTPOS=10000664;//kernel.NoviceActor:664
    _this._sprite.p=p;
  },
  fiber$change :function _trc_func_10000629_20(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_10000629_21(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000646;//kernel.NoviceActor:646
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=10000664;//kernel.NoviceActor:664
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
  main :function _trc_func_11000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000050;//kernel.MML:50
    _this.mmlBuf=[];
  },
  fiber$main :function _trc_func_11000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000050;//kernel.MML:50
    _this.mmlBuf=[];
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_11000062_2(mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    //$LASTPOS=11000105;//kernel.MML:105
    if (! _this.isPlaying()) {
      //$LASTPOS=11000134;//kernel.MML:134
      _this.playNext();
      
    }
  },
  fiber$play :function _trc_func_11000062_3(_thread,mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    
    _thread.enter(function _trc_func_11000062_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11000105;//kernel.MML:105
          if (!(! _this.isPlaying())) { __pc=2; break; }
          //$LASTPOS=11000134;//kernel.MML:134
          _this.fiber$playNext(_thread);
          __pc=1;return;
        case 1:
          
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playNext :function _trc_func_11000157_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    
    //$LASTPOS=11000220;//kernel.MML:220
    if (_this.cTimeBase==null) {
      //$LASTPOS=11000241;//kernel.MML:241
      _this.cTimeBase=0;
    }
    //$LASTPOS=11000259;//kernel.MML:259
    if (_this.m) {
      //$LASTPOS=11000277;//kernel.MML:277
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=11000348;//kernel.MML:348
    mml = _this.mmlBuf.shift();
    //$LASTPOS=11000377;//kernel.MML:377
    if (! mml) {
      //$LASTPOS=11000398;//kernel.MML:398
      _this.m=null;
      //$LASTPOS=11000415;//kernel.MML:415
      _this.cTimeBase=0;
      return _this;
      
    }
    //$LASTPOS=11000457;//kernel.MML:457
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=11000495;//kernel.MML:495
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=11000525;//kernel.MML:525
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=11000555;//kernel.MML:555
    _this.m.start();
    //$LASTPOS=11000571;//kernel.MML:571
    Tonyu.globals.$MMLS[_this.id()]=_this;
  },
  fiber$playNext :function _trc_func_11000157_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mml;
    
    //$LASTPOS=11000220;//kernel.MML:220
    if (_this.cTimeBase==null) {
      //$LASTPOS=11000241;//kernel.MML:241
      _this.cTimeBase=0;
    }
    //$LASTPOS=11000259;//kernel.MML:259
    if (_this.m) {
      //$LASTPOS=11000277;//kernel.MML:277
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=11000348;//kernel.MML:348
    mml = _this.mmlBuf.shift();
    //$LASTPOS=11000377;//kernel.MML:377
    if (! mml) {
      //$LASTPOS=11000398;//kernel.MML:398
      _this.m=null;
      //$LASTPOS=11000415;//kernel.MML:415
      _this.cTimeBase=0;
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=11000457;//kernel.MML:457
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=11000495;//kernel.MML:495
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=11000525;//kernel.MML:525
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=11000555;//kernel.MML:555
    _this.m.start();
    //$LASTPOS=11000571;//kernel.MML:571
    Tonyu.globals.$MMLS[_this.id()]=_this;
    
    _thread.retVal=_this;return;
  },
  id :function _trc_func_11000593_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=11000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    return _this._id;
  },
  fiber$id :function _trc_func_11000593_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=11000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    _thread.retVal=_this._id;return;
    
    
    _thread.retVal=_this;return;
  },
  bufferCount :function _trc_func_11000651_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mmlBuf.length;
  },
  fiber$bufferCount :function _trc_func_11000651_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mmlBuf.length;return;
    
    
    _thread.retVal=_this;return;
  },
  isPlaying :function _trc_func_11000699_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.m;
  },
  fiber$isPlaying :function _trc_func_11000699_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.m;return;
    
    
    _thread.retVal=_this;return;
  },
  currentTime :function _trc_func_11000733_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000755;//kernel.MML:755
    if (_this.m) {
      return _this.m.currentTime+_this.cTimeBase;
    }
    return - 1;
  },
  fiber$currentTime :function _trc_func_11000733_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000755;//kernel.MML:755
    if (_this.m) {
      _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_11000814_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000829;//kernel.MML:829
    if (_this.m) {
      //$LASTPOS=11000847;//kernel.MML:847
      if (_this.mwav) {
        //$LASTPOS=11000872;//kernel.MML:872
        _this.mwav.pause();
        //$LASTPOS=11000899;//kernel.MML:899
        _this.mwav.stop();
        
      }
      //$LASTPOS=11000932;//kernel.MML:932
      _this.m.pause();
      //$LASTPOS=11000952;//kernel.MML:952
      _this.m.stop();
      //$LASTPOS=11000971;//kernel.MML:971
      _this.m=null;
      //$LASTPOS=11000988;//kernel.MML:988
      _this.mmlBuf=[];
      //$LASTPOS=11001056;//kernel.MML:1056
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
  },
  fiber$stop :function _trc_func_11000814_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000829;//kernel.MML:829
    if (_this.m) {
      //$LASTPOS=11000847;//kernel.MML:847
      if (_this.mwav) {
        //$LASTPOS=11000872;//kernel.MML:872
        _this.mwav.pause();
        //$LASTPOS=11000899;//kernel.MML:899
        _this.mwav.stop();
        
      }
      //$LASTPOS=11000932;//kernel.MML:932
      _this.m.pause();
      //$LASTPOS=11000952;//kernel.MML:952
      _this.m.stop();
      //$LASTPOS=11000971;//kernel.MML:971
      _this.m=null;
      //$LASTPOS=11000988;//kernel.MML:988
      _this.mmlBuf=[];
      //$LASTPOS=11001056;//kernel.MML:1056
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MML,{"fullName":"kernel.MML","namespace":"kernel","shortName":"MML","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlayMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_12000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_12000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initMML :function _trc_func_12000020_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000045;//kernel.PlayMod:45
    if (_this.mmlInited) {
      return _this;
    }
    //$LASTPOS=12000073;//kernel.PlayMod:73
    _this.mmlInited=true;
    //$LASTPOS=12000094;//kernel.PlayMod:94
    Tonyu.globals.$currentProject.requestPlugin("timbre");
    //$LASTPOS=12000140;//kernel.PlayMod:140
    if (! Tonyu.globals.$MMLS) {
      //$LASTPOS=12000162;//kernel.PlayMod:162
      Tonyu.globals.$MMLS={};
      //$LASTPOS=12000180;//kernel.PlayMod:180
      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
      //$LASTPOS=12000214;//kernel.PlayMod:214
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
      
    }
    //$LASTPOS=12000256;//kernel.PlayMod:256
    _this.on("die",function () {
      
      //$LASTPOS=12000272;//kernel.PlayMod:272
      _this.play().stop();
    });
  },
  releaseMML :function _trc_func_12000294_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_140;
    
    //$LASTPOS=12000322;//kernel.PlayMod:322
    if (Tonyu.globals.$MMLS) {
      //$LASTPOS=12000343;//kernel.PlayMod:343
      _it_140=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_140.next()) {
        k=_it_140[0];
        v=_it_140[1];
        
        //$LASTPOS=12000379;//kernel.PlayMod:379
        v.stop();
        
      }
      //$LASTPOS=12000407;//kernel.PlayMod:407
      Tonyu.globals.$MMLS=null;
      
    }
    //$LASTPOS=12000432;//kernel.PlayMod:432
    if (Tonyu.globals.$WaveTable) {
      //$LASTPOS=12000458;//kernel.PlayMod:458
      Tonyu.globals.$WaveTable.stop();
      //$LASTPOS=12000485;//kernel.PlayMod:485
      Tonyu.globals.$WaveTable=null;
      
    }
  },
  play :function _trc_func_12000513_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mmls;
    var i;
    
    //$LASTPOS=12000528;//kernel.PlayMod:528
    _this.initMML();
    //$LASTPOS=12000544;//kernel.PlayMod:544
    if (! _this._mml) {
      //$LASTPOS=12000555;//kernel.PlayMod:555
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=12000574;//kernel.PlayMod:574
    if (_this.isDead()||arguments.length==0) {
      return _this._mml;
    }
    //$LASTPOS=12000629;//kernel.PlayMod:629
    mmls = [];
    //$LASTPOS=12000647;//kernel.PlayMod:647
    //$LASTPOS=12000652;//kernel.PlayMod:652
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=12000697;//kernel.PlayMod:697
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=12000734;//kernel.PlayMod:734
    _this._mml.play(mmls);
    //$LASTPOS=12000756;//kernel.PlayMod:756
    while (_this._mml.bufferCount()>2) {
      //$LASTPOS=12000796;//kernel.PlayMod:796
      _this.update();
      
    }
    return _this._mml;
  },
  fiber$play :function _trc_func_12000513_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mmls;
    var i;
    
    //$LASTPOS=12000528;//kernel.PlayMod:528
    _this.initMML();
    //$LASTPOS=12000544;//kernel.PlayMod:544
    if (! _this._mml) {
      //$LASTPOS=12000555;//kernel.PlayMod:555
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=12000574;//kernel.PlayMod:574
    if (_this.isDead()||_arguments.length==0) {
      _thread.retVal=_this._mml;return;
      
    }
    //$LASTPOS=12000629;//kernel.PlayMod:629
    mmls = [];
    //$LASTPOS=12000647;//kernel.PlayMod:647
    //$LASTPOS=12000652;//kernel.PlayMod:652
    i = 0;
    while(i<_arguments.length) {
      {
        //$LASTPOS=12000697;//kernel.PlayMod:697
        mmls.push(_arguments[i]);
      }
      i++;
    }
    //$LASTPOS=12000734;//kernel.PlayMod:734
    _this._mml.play(mmls);
    
    _thread.enter(function _trc_func_12000513_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000756;//kernel.PlayMod:756
        case 1:
          if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
          //$LASTPOS=12000796;//kernel.PlayMod:796
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
  playSE :function _trc_func_12000835_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    var mmls;
    var i;
    
    //$LASTPOS=12000859;//kernel.PlayMod:859
    _this.initMML();
    //$LASTPOS=12000875;//kernel.PlayMod:875
    mml = new Tonyu.classes.kernel.MML;
    //$LASTPOS=12000897;//kernel.PlayMod:897
    mmls = [];
    //$LASTPOS=12000915;//kernel.PlayMod:915
    //$LASTPOS=12000920;//kernel.PlayMod:920
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=12000965;//kernel.PlayMod:965
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=12001002;//kernel.PlayMod:1002
    mml.play(mmls);
    return mml;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlayMod,{"fullName":"kernel.PlayMod","namespace":"kernel","shortName":"PlayMod","decls":{"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.WaveTable=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_13000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=13000036;//kernel.WaveTable:36
    _this.env={};
    //$LASTPOS=13000313;//kernel.WaveTable:313
    if (typeof  T!=="undefined") {
      //$LASTPOS=13000392;//kernel.WaveTable:392
      _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
      //$LASTPOS=13000460;//kernel.WaveTable:460
      _this.setEnv(0,_this.env);
      //$LASTPOS=13000480;//kernel.WaveTable:480
      _this.setWav(0,T("pulse"));
      
    }
  },
  fiber$main :function _trc_func_13000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=13000036;//kernel.WaveTable:36
    _this.env={};
    
    _thread.enter(function _trc_func_13000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=13000313;//kernel.WaveTable:313
          if (!(typeof  T!=="undefined")) { __pc=3; break; }
          //$LASTPOS=13000392;//kernel.WaveTable:392
          _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
          //$LASTPOS=13000460;//kernel.WaveTable:460
          _this.fiber$setEnv(_thread, 0, _this.env);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=13000480;//kernel.WaveTable:480
          _this.fiber$setWav(_thread, 0, T("pulse"));
          __pc=2;return;
        case 2:
          
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setWav :function _trc_func_13000044_3(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
  },
  fiber$setWav :function _trc_func_13000044_4(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
    
    _thread.retVal=_this;return;
  },
  setEnv :function _trc_func_13000088_5(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000114;//kernel.WaveTable:114
    _this.env[num]=synth;
  },
  fiber$setEnv :function _trc_func_13000088_6(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000114;//kernel.WaveTable:114
    _this.env[num]=synth;
    
    _thread.retVal=_this;return;
  },
  get :function _trc_func_13000132_7(w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var synth;
    
    //$LASTPOS=13000148;//kernel.WaveTable:148
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    return synth;
  },
  fiber$get :function _trc_func_13000132_8(_thread,w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var synth;
    
    //$LASTPOS=13000148;//kernel.WaveTable:148
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    _thread.retVal=synth;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_13000226_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_13000226_10(_thread) {
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
  main :function _trc_func_14000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_14000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  parallel :function _trc_func_14000037_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var args;
    var i;
    var name;
    var th;
    var thg;
    
    //$LASTPOS=14000064;//kernel.ParallelMod:64
    args = [];
    //$LASTPOS=14000083;//kernel.ParallelMod:83
    //$LASTPOS=14000088;//kernel.ParallelMod:88
    i = 1;
    while(i<arguments.length) {
      {
        //$LASTPOS=14000134;//kernel.ParallelMod:134
        args.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=14000173;//kernel.ParallelMod:173
    name = arguments[0];
    //$LASTPOS=14000202;//kernel.ParallelMod:202
    th;
    //$LASTPOS=14000216;//kernel.ParallelMod:216
    if (Tonyu.globals.$Scheduler) {
      //$LASTPOS=14000244;//kernel.ParallelMod:244
      th=Tonyu.globals.$Scheduler.newThread(_this,name,args);
      
    } else {
      //$LASTPOS=14000310;//kernel.ParallelMod:310
      thg = Tonyu.globals.$currentThreadGroup;
      //$LASTPOS=14000349;//kernel.ParallelMod:349
      if (thg) {
        //$LASTPOS=14000358;//kernel.ParallelMod:358
        th=thg.addObj(_this,name,args);
      }
      
    }
    //$LASTPOS=14000405;//kernel.ParallelMod:405
    _this.on("die",function () {
      
      //$LASTPOS=14000417;//kernel.ParallelMod:417
      th.kill();
    });
    return th;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ParallelMod,{"fullName":"kernel.ParallelMod","namespace":"kernel","shortName":"ParallelMod","decls":{"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Scheduler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_15000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000033;//kernel.Scheduler:33
    _this.cur=[];
    //$LASTPOS=15000042;//kernel.Scheduler:42
    _this.next=[];
  },
  fiber$main :function _trc_func_15000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000033;//kernel.Scheduler:33
    _this.cur=[];
    //$LASTPOS=15000042;//kernel.Scheduler:42
    _this.next=[];
    
    _thread.retVal=_this;return;
  },
  newThread :function _trc_func_15000052_2(obj,name,args,options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var th;
    
    //$LASTPOS=15000128;//kernel.Scheduler:128
    th = Tonyu.thread();
    //$LASTPOS=15000156;//kernel.Scheduler:156
    th.apply(obj,name,args);
    //$LASTPOS=15000186;//kernel.Scheduler:186
    _this.addToCur(th);
    return th;
  },
  fiber$newThread :function _trc_func_15000052_3(_thread,obj,name,args,options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var th;
    
    //$LASTPOS=15000128;//kernel.Scheduler:128
    th = Tonyu.thread();
    //$LASTPOS=15000156;//kernel.Scheduler:156
    th.apply(obj,name,args);
    
    _thread.enter(function _trc_func_15000052_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000186;//kernel.Scheduler:186
          _this.fiber$addToCur(_thread, th);
          __pc=1;return;
        case 1:
          
          _thread.exit(th);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  addToCur :function _trc_func_15000220_5(th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000241;//kernel.Scheduler:241
    _this.cur.push(th);
  },
  fiber$addToCur :function _trc_func_15000220_6(_thread,th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000241;//kernel.Scheduler:241
    _this.cur.push(th);
    
    _thread.retVal=_this;return;
  },
  addToNext :function _trc_func_15000259_7(th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000281;//kernel.Scheduler:281
    _this.next.push(th);
  },
  fiber$addToNext :function _trc_func_15000259_8(_thread,th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000281;//kernel.Scheduler:281
    _this.next.push(th);
    
    _thread.retVal=_this;return;
  },
  stepsAll :function _trc_func_15000300_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t;
    var _it_156;
    
    //$LASTPOS=15000319;//kernel.Scheduler:319
    _it_156=Tonyu.iterator(_this.cur,1);
    while(_it_156.next()) {
      t=_it_156[0];
      
      //$LASTPOS=15000349;//kernel.Scheduler:349
      t.steps();
      
    }
    //$LASTPOS=15000372;//kernel.Scheduler:372
    _this.cur=_this.next;
    //$LASTPOS=15000387;//kernel.Scheduler:387
    _this.next=[];
  },
  fiber$stepsAll :function _trc_func_15000300_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var t;
    var _it_156;
    
    //$LASTPOS=15000319;//kernel.Scheduler:319
    _it_156=Tonyu.iterator(_this.cur,1);
    while(_it_156.next()) {
      t=_it_156[0];
      
      //$LASTPOS=15000349;//kernel.Scheduler:349
      t.steps();
      
    }
    //$LASTPOS=15000372;//kernel.Scheduler:372
    _this.cur=_this.next;
    //$LASTPOS=15000387;//kernel.Scheduler:387
    _this.next=[];
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Scheduler,{"fullName":"kernel.Scheduler","namespace":"kernel","shortName":"Scheduler","decls":{"methods":{"main":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"stepsAll":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],{
  main :function _trc_func_16000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_16000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_16000086_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16000105;//kernel.Actor:105
    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
    //$LASTPOS=16000124;//kernel.Actor:124
    if (Tonyu.runMode) {
      //$LASTPOS=16000143;//kernel.Actor:143
      _this.initSprite();
    }
  },
  initSprite :function _trc_func_16000161_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16000182;//kernel.Actor:182
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=16000234;//kernel.Actor:234
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=16000272;//kernel.Actor:272
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=16000304;//kernel.Actor:304
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_16000161_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=16000182;//kernel.Actor:182
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=16000234;//kernel.Actor:234
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=16000272;//kernel.Actor:272
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_16000161_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=16000304;//kernel.Actor:304
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_16000320_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onAppear :function _trc_func_16000320_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Actor,{"fullName":"kernel.Actor","namespace":"kernel","shortName":"Actor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_17000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_17000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_17000041_2(param) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    
    //$LASTPOS=17000060;//kernel.Map:60
    _this.sx=0;
    //$LASTPOS=17000071;//kernel.Map:71
    _this.sy=0;
    //$LASTPOS=17000082;//kernel.Map:82
    Tonyu.classes.kernel.Actor.apply( _this, [param]);
    //$LASTPOS=17000101;//kernel.Map:101
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=17000173;//kernel.Map:173
    _this.mapObj=true;
    //$LASTPOS=17000191;//kernel.Map:191
    _this.mapTable=[];
    //$LASTPOS=17000211;//kernel.Map:211
    _this.mapOnTable=[];
    //$LASTPOS=17000233;//kernel.Map:233
    //$LASTPOS=17000237;//kernel.Map:237
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=17000266;//kernel.Map:266
        _this.rows=[];
        //$LASTPOS=17000286;//kernel.Map:286
        //$LASTPOS=17000290;//kernel.Map:290
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=17000323;//kernel.Map:323
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=17000358;//kernel.Map:358
        _this.mapTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=17000391;//kernel.Map:391
    //$LASTPOS=17000395;//kernel.Map:395
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=17000424;//kernel.Map:424
        _this.rows=[];
        //$LASTPOS=17000444;//kernel.Map:444
        //$LASTPOS=17000448;//kernel.Map:448
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=17000481;//kernel.Map:481
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=17000516;//kernel.Map:516
        _this.mapOnTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=17000616;//kernel.Map:616
    _this.initMap();
  },
  initMap :function _trc_func_17000631_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=17000648;//kernel.Map:648
    if (! _this.mapData) {
      return _this;
    }
    //$LASTPOS=17000674;//kernel.Map:674
    //$LASTPOS=17000678;//kernel.Map:678
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=17000707;//kernel.Map:707
        //$LASTPOS=17000711;//kernel.Map:711
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=17000744;//kernel.Map:744
            _this.set(j,i,_this.mapData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=17000791;//kernel.Map:791
    if (! _this.mapOnData) {
      return _this;
    }
    //$LASTPOS=17000819;//kernel.Map:819
    //$LASTPOS=17000823;//kernel.Map:823
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=17000852;//kernel.Map:852
        //$LASTPOS=17000856;//kernel.Map:856
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=17000889;//kernel.Map:889
            _this.setOn(j,i,_this.mapOnData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
  },
  fiber$initMap :function _trc_func_17000631_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=17000648;//kernel.Map:648
    if (! _this.mapData) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_17000631_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17000674;//kernel.Map:674
          //$LASTPOS=17000678;//kernel.Map:678
          i = 0;;
        case 1:
          if (!(i<_this.row)) { __pc=5; break; }
          //$LASTPOS=17000707;//kernel.Map:707
          //$LASTPOS=17000711;//kernel.Map:711
          j = 0;;
        case 2:
          if (!(j<_this.col)) { __pc=4; break; }
          //$LASTPOS=17000744;//kernel.Map:744
          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
          __pc=3;return;
        case 3:
          
          j++;
          __pc=2;break;
        case 4:
          
          i++;
          __pc=1;break;
        case 5:
          
          //$LASTPOS=17000791;//kernel.Map:791
          if (!(! _this.mapOnData)) { __pc=6; break; }
          _thread.exit(_this);return;
        case 6:
          
          //$LASTPOS=17000819;//kernel.Map:819
          //$LASTPOS=17000823;//kernel.Map:823
          i = 0;;
        case 7:
          if (!(i<_this.row)) { __pc=11; break; }
          //$LASTPOS=17000852;//kernel.Map:852
          //$LASTPOS=17000856;//kernel.Map:856
          j = 0;;
        case 8:
          if (!(j<_this.col)) { __pc=10; break; }
          //$LASTPOS=17000889;//kernel.Map:889
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
  load :function _trc_func_17000939_6(dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=17001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=17001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=17001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=17001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=17001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=17001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=17001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=17001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=17001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=17001296;//kernel.Map:1296
    _this.initMap();
  },
  fiber$load :function _trc_func_17000939_7(_thread,dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=17001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=17001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=17001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=17001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=17001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=17001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=17001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=17001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=17001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    
    _thread.enter(function _trc_func_17000939_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17001296;//kernel.Map:1296
          _this.fiber$initMap(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  set :function _trc_func_17001311_9(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=17001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=17001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=17001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=17001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=17001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=17001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      return _this;
      
    }
    //$LASTPOS=17001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=17001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001933;//kernel.Map:1933
    _this.ctx.restore();
  },
  fiber$set :function _trc_func_17001311_10(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=17001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=17001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=17001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=17001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=17001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=17001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=17001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=17001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001933;//kernel.Map:1933
    _this.ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setOn :function _trc_func_17001952_11(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=17002050;//kernel.Map:2050
    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
    //$LASTPOS=17002100;//kernel.Map:2100
    _this.mapOnTable[setRow][setCol]=p;
    //$LASTPOS=17002135;//kernel.Map:2135
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=17002169;//kernel.Map:2169
    p=Math.floor(p);
    //$LASTPOS=17002191;//kernel.Map:2191
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=17002229;//kernel.Map:2229
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=17002253;//kernel.Map:2253
    _this.ctx.save();
    //$LASTPOS=17002270;//kernel.Map:2270
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17002414;//kernel.Map:2414
    _this.ctx.restore();
  },
  fiber$setOn :function _trc_func_17001952_12(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_17001952_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17002050;//kernel.Map:2050
          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=17002100;//kernel.Map:2100
          _this.mapOnTable[setRow][setCol]=p;
          //$LASTPOS=17002135;//kernel.Map:2135
          _this.ctx=_this.buf[0].getContext("2d");
          //$LASTPOS=17002169;//kernel.Map:2169
          p=Math.floor(p);
          //$LASTPOS=17002191;//kernel.Map:2191
          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
          //$LASTPOS=17002229;//kernel.Map:2229
          if (!(! _this.pImg)) { __pc=2; break; }
          _thread.exit(_this);return;
        case 2:
          
          //$LASTPOS=17002253;//kernel.Map:2253
          _this.ctx.save();
          //$LASTPOS=17002270;//kernel.Map:2270
          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
          //$LASTPOS=17002414;//kernel.Map:2414
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  setOnAt :function _trc_func_17002433_14(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002461;//kernel.Map:2461
    _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setOnAt :function _trc_func_17002433_15(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_17002433_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17002461;//kernel.Map:2461
          _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setAt :function _trc_func_17002530_17(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002556;//kernel.Map:2556
    _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setAt :function _trc_func_17002530_18(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_17002530_19(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17002556;//kernel.Map:2556
          _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  get :function _trc_func_17002623_20(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$get :function _trc_func_17002623_21(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getAt :function _trc_func_17002757_22(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getAt :function _trc_func_17002757_23(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  getOn :function _trc_func_17002853_24(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapOnTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$getOn :function _trc_func_17002853_25(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapOnTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getOnAt :function _trc_func_17002991_26(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getOnAt :function _trc_func_17002991_27(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_17003091_28(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=17003142;//kernel.Map:3142
    _this.sy=- scrollY;
  },
  fiber$scrollTo :function _trc_func_17003091_29(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=17003142;//kernel.Map:3142
    _this.sy=- scrollY;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_17003159_30(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17003177;//kernel.Map:3177
    _this.pImg=_this.buf[0];
    //$LASTPOS=17003195;//kernel.Map:3195
    ctx.save();
    //$LASTPOS=17003212;//kernel.Map:3212
    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
    //$LASTPOS=17003324;//kernel.Map:3324
    ctx.restore();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Panel=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_18000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_18000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_18000056_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000072;//kernel.Panel:72
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=18000089;//kernel.Panel:89
    _this.width=_this.width;
    //$LASTPOS=18000112;//kernel.Panel:112
    _this.height=_this.height;
    //$LASTPOS=18000137;//kernel.Panel:137
    if (_this.align==null) {
      //$LASTPOS=18000153;//kernel.Panel:153
      _this.align="center";
    }
    //$LASTPOS=18000174;//kernel.Panel:174
    if (_this.alpha==null) {
      //$LASTPOS=18000190;//kernel.Panel:190
      _this.alpha=255;
    }
    //$LASTPOS=18000206;//kernel.Panel:206
    if (_this._drawn==null) {
      //$LASTPOS=18000223;//kernel.Panel:223
      _this._drawn=false;
    }
    //$LASTPOS=18000242;//kernel.Panel:242
    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
  },
  setPanel :function _trc_func_18000284_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=18000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=18000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
  },
  fiber$setPanel :function _trc_func_18000284_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=18000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=18000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=18000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
    
    _thread.retVal=_this;return;
  },
  resize :function _trc_func_18000404_5(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000432;//kernel.Panel:432
    _this.setPanel(width,height);
  },
  fiber$resize :function _trc_func_18000404_6(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18000404_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000432;//kernel.Panel:432
          _this.fiber$setPanel(_thread, width, height);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  getContext :function _trc_func_18000460_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000480;//kernel.Panel:480
    _this._drawn=true;
    return _this.buf[0].getContext("2d");
  },
  fiber$getContext :function _trc_func_18000460_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=18000480;//kernel.Panel:480
    _this._drawn=true;
    _thread.retVal=_this.buf[0].getContext("2d");return;
    
    
    _thread.retVal=_this;return;
  },
  setFillStyle :function _trc_func_18000534_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000561;//kernel.Panel:561
    _this.fillStyle=color;
  },
  fiber$setFillStyle :function _trc_func_18000534_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=18000561;//kernel.Panel:561
    _this.fillStyle=color;
    
    _thread.retVal=_this;return;
  },
  fillRect :function _trc_func_18000587_12(x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000629;//kernel.Panel:629
    _this.ctx=_this.getContext();
    //$LASTPOS=18000652;//kernel.Panel:652
    _this.ctx.save();
    //$LASTPOS=18000719;//kernel.Panel:719
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=18000749;//kernel.Panel:749
    _this.ctx.fillRect(x,y,rectWidth,rectHeight);
    //$LASTPOS=18000794;//kernel.Panel:794
    _this.ctx.restore();
  },
  fiber$fillRect :function _trc_func_18000587_13(_thread,x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18000587_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000629;//kernel.Panel:629
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=18000652;//kernel.Panel:652
          _this.ctx.save();
          //$LASTPOS=18000719;//kernel.Panel:719
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=18000749;//kernel.Panel:749
          _this.ctx.fillRect(x,y,rectWidth,rectHeight);
          //$LASTPOS=18000794;//kernel.Panel:794
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  fillText :function _trc_func_18000813_15(text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000850;//kernel.Panel:850
    _this.ctx=_this.getContext();
    //$LASTPOS=18000873;//kernel.Panel:873
    _this.ctx.save();
    //$LASTPOS=18000940;//kernel.Panel:940
    _this.ctx.textAlign=align;
    //$LASTPOS=18000968;//kernel.Panel:968
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=18000998;//kernel.Panel:998
    _this.ctx.font=size+"px 'Courier New'";
    //$LASTPOS=18001037;//kernel.Panel:1037
    _this.ctx.fillText(text,x,y);
    //$LASTPOS=18001066;//kernel.Panel:1066
    _this.ctx.restore();
  },
  fiber$fillText :function _trc_func_18000813_16(_thread,text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18000813_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000850;//kernel.Panel:850
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=18000873;//kernel.Panel:873
          _this.ctx.save();
          //$LASTPOS=18000940;//kernel.Panel:940
          _this.ctx.textAlign=align;
          //$LASTPOS=18000968;//kernel.Panel:968
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=18000998;//kernel.Panel:998
          _this.ctx.font=size+"px 'Courier New'";
          //$LASTPOS=18001037;//kernel.Panel:1037
          _this.ctx.fillText(text,x,y);
          //$LASTPOS=18001066;//kernel.Panel:1066
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  clearRect :function _trc_func_18001085_18(clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18001131;//kernel.Panel:1131
    _this.ctx=_this.getContext();
    //$LASTPOS=18001154;//kernel.Panel:1154
    _this.ctx.save();
    //$LASTPOS=18001171;//kernel.Panel:1171
    _this.ctx.clearRect(clearX,clearY,clearW,clearH);
    //$LASTPOS=18001220;//kernel.Panel:1220
    _this.ctx.restore();
  },
  fiber$clearRect :function _trc_func_18001085_19(_thread,clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18001085_20(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18001131;//kernel.Panel:1131
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=18001154;//kernel.Panel:1154
          _this.ctx.save();
          //$LASTPOS=18001171;//kernel.Panel:1171
          _this.ctx.clearRect(clearX,clearY,clearW,clearH);
          //$LASTPOS=18001220;//kernel.Panel:1220
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getPixel :function _trc_func_18001239_21(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18001266;//kernel.Panel:1266
    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
      //$LASTPOS=18001365;//kernel.Panel:1365
      _this.ctx=_this.getContext();
      //$LASTPOS=18001392;//kernel.Panel:1392
      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
      //$LASTPOS=18001444;//kernel.Panel:1444
      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
      
    } else {
      //$LASTPOS=18001584;//kernel.Panel:1584
      _this.colordata=[0,0,0,0];
      
    }
    return (_this.colordata);
  },
  fiber$getPixel :function _trc_func_18001239_22(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18001239_23(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18001266;//kernel.Panel:1266
          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
          //$LASTPOS=18001365;//kernel.Panel:1365
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=18001392;//kernel.Panel:1392
          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
          //$LASTPOS=18001444;//kernel.Panel:1444
          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
          __pc=3;break;
        case 2:
          {
            //$LASTPOS=18001584;//kernel.Panel:1584
            _this.colordata=[0,0,0,0];
          }
        case 3:
          
          _thread.exit((_this.colordata));return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  scroll :function _trc_func_18001640_24(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18001671;//kernel.Panel:1671
    _this.ctx=_this.getContext();
    //$LASTPOS=18001694;//kernel.Panel:1694
    _this.ctx.save();
    //$LASTPOS=18001711;//kernel.Panel:1711
    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
    //$LASTPOS=18001772;//kernel.Panel:1772
    _this.clearRect(0,0,_this.width,_this.height);
    //$LASTPOS=18001806;//kernel.Panel:1806
    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
    //$LASTPOS=18001858;//kernel.Panel:1858
    _this.ctx.restore();
  },
  fiber$scroll :function _trc_func_18001640_25(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18001640_26(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18001671;//kernel.Panel:1671
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=18001694;//kernel.Panel:1694
          _this.ctx.save();
          //$LASTPOS=18001711;//kernel.Panel:1711
          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
          //$LASTPOS=18001772;//kernel.Panel:1772
          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=18001806;//kernel.Panel:1806
          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
          //$LASTPOS=18001858;//kernel.Panel:1858
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_func_18001877_27(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18001894;//kernel.Panel:1894
    if (_this._drawn) {
      //$LASTPOS=18001915;//kernel.Panel:1915
      _this.pImg=_this.buf[0];
      //$LASTPOS=18001937;//kernel.Panel:1937
      ctx.save();
      //$LASTPOS=18001958;//kernel.Panel:1958
      if (_this.align=="left") {
        //$LASTPOS=18001990;//kernel.Panel:1990
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=18002042;//kernel.Panel:2042
        if (_this.align=="center") {
          //$LASTPOS=18002076;//kernel.Panel:2076
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=18002111;//kernel.Panel:2111
          if (_this.align=="right") {
            //$LASTPOS=18002144;//kernel.Panel:2144
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=18002201;//kernel.Panel:2201
      if (_this.rotation!=0) {
        //$LASTPOS=18002236;//kernel.Panel:2236
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=18002304;//kernel.Panel:2304
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=18002361;//kernel.Panel:2361
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=18002402;//kernel.Panel:2402
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=18002506;//kernel.Panel:2506
      ctx.restore();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_19000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_19000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_19000077_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19000095;//kernel.ScaledCanvas:95
    _this.extend(opt);
    //$LASTPOS=19000142;//kernel.ScaledCanvas:142
    _this.resize(_this.width,_this.height);
    //$LASTPOS=19000170;//kernel.ScaledCanvas:170
    _this.cw=_this.canvas.width();
    //$LASTPOS=19000194;//kernel.ScaledCanvas:194
    _this.ch=_this.canvas.height();
    //$LASTPOS=19000219;//kernel.ScaledCanvas:219
    _this.cctx=_this.canvas[0].getContext("2d");
    //$LASTPOS=19000257;//kernel.ScaledCanvas:257
    _this.color="rgb(20,80,180)";
    //$LASTPOS=19000291;//kernel.ScaledCanvas:291
    _this.sx=0;
    //$LASTPOS=19000302;//kernel.ScaledCanvas:302
    _this.sy=0;
    //$LASTPOS=19000313;//kernel.ScaledCanvas:313
    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
  },
  resize :function _trc_func_19000349_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=19000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=19000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=19000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=19000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=19000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=19000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
  },
  fiber$resize :function _trc_func_19000349_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=19000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=19000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=19000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=19000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=19000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=19000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
    
    _thread.retVal=_this;return;
  },
  shouldDraw1x1 :function _trc_func_19000634_5(srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var larger;
    var smaller;
    
    //$LASTPOS=19000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=19000733;//kernel.ScaledCanvas:733
    smaller = 5;
    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
  },
  fiber$shouldDraw1x1 :function _trc_func_19000634_6(_thread,srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var larger;
    var smaller;
    
    //$LASTPOS=19000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=19000733;//kernel.ScaledCanvas:733
    smaller = 5;
    _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_19000853_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=19000868;//kernel.ScaledCanvas:868
    _this.cw=_this.canvas.width();
    //$LASTPOS=19000892;//kernel.ScaledCanvas:892
    _this.ch=_this.canvas.height();
    //$LASTPOS=19000917;//kernel.ScaledCanvas:917
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=19000961;//kernel.ScaledCanvas:961
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=19001005;//kernel.ScaledCanvas:1005
    if (calch>_this.ch) {
      //$LASTPOS=19001019;//kernel.ScaledCanvas:1019
      calch=_this.ch;
    }
    //$LASTPOS=19001034;//kernel.ScaledCanvas:1034
    if (calcw>_this.cw) {
      //$LASTPOS=19001048;//kernel.ScaledCanvas:1048
      calcw=_this.cw;
    }
    //$LASTPOS=19001063;//kernel.ScaledCanvas:1063
    _this.cctx.clearRect(0,0,_this.cw,_this.ch);
    //$LASTPOS=19001095;//kernel.ScaledCanvas:1095
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=19001151;//kernel.ScaledCanvas:1151
      calcw=_this.width;
      //$LASTPOS=19001163;//kernel.ScaledCanvas:1163
      calch=_this.height;
      
    }
    //$LASTPOS=19001189;//kernel.ScaledCanvas:1189
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=19001232;//kernel.ScaledCanvas:1232
    marginh = Math.floor((_this.ch-calch)/2);
    //$LASTPOS=19001275;//kernel.ScaledCanvas:1275
    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
  },
  canvas2buf :function _trc_func_19001364_8(point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=19001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=19001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=19001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=19001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=19001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=19001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=19001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=19001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=19001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=19001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=19001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
  },
  fiber$canvas2buf :function _trc_func_19001364_9(_thread,point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=19001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=19001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=19001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=19001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=19001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=19001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=19001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=19001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=19001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=19001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=19001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_19001810_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19001835;//kernel.ScaledCanvas:1835
    _this.color=color;
  },
  fiber$setBGColor :function _trc_func_19001810_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19001835;//kernel.ScaledCanvas:1835
    _this.color=color;
    
    _thread.retVal=_this;return;
  },
  fillCanvas :function _trc_func_19001857_12(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    
    //$LASTPOS=19001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=19001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=19001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=19001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=19001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=19002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=19002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=19002068;//kernel.ScaledCanvas:2068
    ctx.restore();
  },
  fiber$fillCanvas :function _trc_func_19001857_13(_thread,cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    
    //$LASTPOS=19001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=19001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=19001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=19001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=19001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=19002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=19002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=19002068;//kernel.ScaledCanvas:2068
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_19002087_14(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
  },
  fiber$scrollTo :function _trc_func_19002087_15(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_20000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_20000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_20000031_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000045;//kernel.Sprites:45
    _this.sprites=[];
    //$LASTPOS=20000062;//kernel.Sprites:62
    _this.imageList=[];
    //$LASTPOS=20000081;//kernel.Sprites:81
    _this.hitWatchers=[];
    //$LASTPOS=20000102;//kernel.Sprites:102
    _this.isDrawGrid=Tonyu.noviceMode;
    //$LASTPOS=20000136;//kernel.Sprites:136
    _this.sx=0;
    //$LASTPOS=20000147;//kernel.Sprites:147
    _this.sy=0;
    //$LASTPOS=20000158;//kernel.Sprites:158
    _this.objId=0;
  },
  add :function _trc_func_20000171_3(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      return _this;
    }
    //$LASTPOS=20000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=20000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=20000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=20000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=20000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    return s;
  },
  fiber$add :function _trc_func_20000171_4(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=20000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=20000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=20000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=20000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=20000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  remove :function _trc_func_20000374_5(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var idx;
    
    //$LASTPOS=20000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=20000433;//kernel.Sprites:433
    if (idx<0) {
      return _this;
    }
    //$LASTPOS=20000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=20000485;//kernel.Sprites:485
    delete s.__addedToSprites;
  },
  fiber$remove :function _trc_func_20000374_6(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var idx;
    
    //$LASTPOS=20000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=20000433;//kernel.Sprites:433
    if (idx<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=20000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=20000485;//kernel.Sprites:485
    delete s.__addedToSprites;
    
    _thread.retVal=_this;return;
  },
  clear :function _trc_func_20000516_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000534;//kernel.Sprites:534
    _this.sprites.splice(0,_this.sprites.length);
  },
  fiber$clear :function _trc_func_20000516_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000534;//kernel.Sprites:534
    _this.sprites.splice(0,_this.sprites.length);
    
    _thread.retVal=_this;return;
  },
  compOrder :function _trc_func_20000570_9(obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var val1;
    var val2;
    
    //$LASTPOS=20000607;//kernel.Sprites:607
    val1 = obj1.zOrder;
    //$LASTPOS=20000634;//kernel.Sprites:634
    val2 = obj2.zOrder;
    //$LASTPOS=20000661;//kernel.Sprites:661
    if (val1>val2) {
      return - 1;
      
    } else {
      //$LASTPOS=20000707;//kernel.Sprites:707
      if (val1<val2) {
        return 1;
        
      } else {
        //$LASTPOS=20000752;//kernel.Sprites:752
        if (val1==val2) {
          //$LASTPOS=20000777;//kernel.Sprites:777
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
  fiber$compOrder :function _trc_func_20000570_10(_thread,obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var val1;
    var val2;
    
    //$LASTPOS=20000607;//kernel.Sprites:607
    val1 = obj1.zOrder;
    //$LASTPOS=20000634;//kernel.Sprites:634
    val2 = obj2.zOrder;
    //$LASTPOS=20000661;//kernel.Sprites:661
    if (val1>val2) {
      _thread.retVal=- 1;return;
      
      
    } else {
      //$LASTPOS=20000707;//kernel.Sprites:707
      if (val1<val2) {
        _thread.retVal=1;return;
        
        
      } else {
        //$LASTPOS=20000752;//kernel.Sprites:752
        if (val1==val2) {
          //$LASTPOS=20000777;//kernel.Sprites:777
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
  draw :function _trc_func_20000912_11(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var orderArray;
    
    //$LASTPOS=20000937;//kernel.Sprites:937
    ctx = cv.getContext("2d");
    //$LASTPOS=20000971;//kernel.Sprites:971
    ctx.save();
    //$LASTPOS=20001116;//kernel.Sprites:1116
    orderArray = [];
    //$LASTPOS=20001140;//kernel.Sprites:1140
    orderArray=orderArray.concat(_this.sprites);
    //$LASTPOS=20001184;//kernel.Sprites:1184
    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
    //$LASTPOS=20001217;//kernel.Sprites:1217
    ctx.translate(- _this.sx,- _this.sy);
    //$LASTPOS=20001246;//kernel.Sprites:1246
    orderArray.forEach(function (s) {
      
      //$LASTPOS=20001280;//kernel.Sprites:1280
      s.draw(ctx);
    });
    //$LASTPOS=20001307;//kernel.Sprites:1307
    ctx.restore();
  },
  checkHit :function _trc_func_20001326_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001353;//kernel.Sprites:1353
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=20001397;//kernel.Sprites:1397
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=20001485;//kernel.Sprites:1485
        a_owner = a;
        //$LASTPOS=20001527;//kernel.Sprites:1527
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=20001580;//kernel.Sprites:1580
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=20001628;//kernel.Sprites:1628
          b_owner = b;
          //$LASTPOS=20001674;//kernel.Sprites:1674
          if (a===b) {
            return _this;
          }
          //$LASTPOS=20001710;//kernel.Sprites:1710
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=20001815;//kernel.Sprites:1815
          if (a.crashTo1(b)) {
            //$LASTPOS=20001918;//kernel.Sprites:1918
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
  },
  fiber$checkHit :function _trc_func_20001326_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20001353;//kernel.Sprites:1353
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=20001397;//kernel.Sprites:1397
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=20001485;//kernel.Sprites:1485
        a_owner = a;
        //$LASTPOS=20001527;//kernel.Sprites:1527
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=20001580;//kernel.Sprites:1580
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=20001628;//kernel.Sprites:1628
          b_owner = b;
          //$LASTPOS=20001674;//kernel.Sprites:1674
          if (a===b) {
            return _this;
          }
          //$LASTPOS=20001710;//kernel.Sprites:1710
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=20001815;//kernel.Sprites:1815
          if (a.crashTo1(b)) {
            //$LASTPOS=20001918;//kernel.Sprites:1918
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
    
    _thread.retVal=_this;return;
  },
  watchHit :function _trc_func_20002002_14(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=20002048;//kernel.Sprites:2048
    p = {A: typeA,B: typeB,h: onHit};
    //$LASTPOS=20002112;//kernel.Sprites:2112
    _this.hitWatchers.push(p);
  },
  drawGrid :function _trc_func_20002137_15(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var i;
    
    //$LASTPOS=20002165;//kernel.Sprites:2165
    ctx = c.getContext("2d");
    //$LASTPOS=20002198;//kernel.Sprites:2198
    ctx.textBaseline="top";
    //$LASTPOS=20002227;//kernel.Sprites:2227
    ctx.save();
    //$LASTPOS=20002244;//kernel.Sprites:2244
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=20002284;//kernel.Sprites:2284
    //$LASTPOS=20002289;//kernel.Sprites:2289
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=20002329;//kernel.Sprites:2329
        ctx.beginPath();
        //$LASTPOS=20002355;//kernel.Sprites:2355
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=20002401;//kernel.Sprites:2401
        ctx.moveTo(i,0);
        //$LASTPOS=20002427;//kernel.Sprites:2427
        ctx.lineTo(i,c.height);
        //$LASTPOS=20002460;//kernel.Sprites:2460
        ctx.closePath();
        //$LASTPOS=20002486;//kernel.Sprites:2486
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=20002518;//kernel.Sprites:2518
    //$LASTPOS=20002523;//kernel.Sprites:2523
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=20002564;//kernel.Sprites:2564
        ctx.beginPath();
        //$LASTPOS=20002590;//kernel.Sprites:2590
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=20002636;//kernel.Sprites:2636
        ctx.moveTo(0,i);
        //$LASTPOS=20002662;//kernel.Sprites:2662
        ctx.lineTo(c.width,i);
        //$LASTPOS=20002694;//kernel.Sprites:2694
        ctx.closePath();
        //$LASTPOS=20002720;//kernel.Sprites:2720
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=20002746;//kernel.Sprites:2746
    ctx.fillStyle="white";
    //$LASTPOS=20002774;//kernel.Sprites:2774
    ctx.font="15px monospaced";
    //$LASTPOS=20002807;//kernel.Sprites:2807
    //$LASTPOS=20002812;//kernel.Sprites:2812
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=20002855;//kernel.Sprites:2855
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=20002889;//kernel.Sprites:2889
    //$LASTPOS=20002894;//kernel.Sprites:2894
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=20002938;//kernel.Sprites:2938
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=20002972;//kernel.Sprites:2972
    ctx.restore();
  },
  fiber$drawGrid :function _trc_func_20002137_16(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    var i;
    
    //$LASTPOS=20002165;//kernel.Sprites:2165
    ctx = c.getContext("2d");
    //$LASTPOS=20002198;//kernel.Sprites:2198
    ctx.textBaseline="top";
    //$LASTPOS=20002227;//kernel.Sprites:2227
    ctx.save();
    //$LASTPOS=20002244;//kernel.Sprites:2244
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=20002284;//kernel.Sprites:2284
    //$LASTPOS=20002289;//kernel.Sprites:2289
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=20002329;//kernel.Sprites:2329
        ctx.beginPath();
        //$LASTPOS=20002355;//kernel.Sprites:2355
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=20002401;//kernel.Sprites:2401
        ctx.moveTo(i,0);
        //$LASTPOS=20002427;//kernel.Sprites:2427
        ctx.lineTo(i,c.height);
        //$LASTPOS=20002460;//kernel.Sprites:2460
        ctx.closePath();
        //$LASTPOS=20002486;//kernel.Sprites:2486
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=20002518;//kernel.Sprites:2518
    //$LASTPOS=20002523;//kernel.Sprites:2523
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=20002564;//kernel.Sprites:2564
        ctx.beginPath();
        //$LASTPOS=20002590;//kernel.Sprites:2590
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=20002636;//kernel.Sprites:2636
        ctx.moveTo(0,i);
        //$LASTPOS=20002662;//kernel.Sprites:2662
        ctx.lineTo(c.width,i);
        //$LASTPOS=20002694;//kernel.Sprites:2694
        ctx.closePath();
        //$LASTPOS=20002720;//kernel.Sprites:2720
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=20002746;//kernel.Sprites:2746
    ctx.fillStyle="white";
    //$LASTPOS=20002774;//kernel.Sprites:2774
    ctx.font="15px monospaced";
    //$LASTPOS=20002807;//kernel.Sprites:2807
    //$LASTPOS=20002812;//kernel.Sprites:2812
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=20002855;//kernel.Sprites:2855
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=20002889;//kernel.Sprites:2889
    //$LASTPOS=20002894;//kernel.Sprites:2894
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=20002938;//kernel.Sprites:2938
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=20002972;//kernel.Sprites:2972
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setImageList :function _trc_func_20002991_17(il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20003024;//kernel.Sprites:3024
    _this.imageList=il;
  },
  fiber$setImageList :function _trc_func_20002991_18(_thread,il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20003024;//kernel.Sprites:3024
    _this.imageList=il;
    
    _thread.retVal=_this;return;
  },
  getImageList :function _trc_func_20003042_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.imageList;
  },
  fiber$getImageList :function _trc_func_20003042_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.imageList;return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_20003095_21(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20003136;//kernel.Sprites:3136
    _this.sx=scrollX;
    //$LASTPOS=20003153;//kernel.Sprites:3153
    _this.sy=scrollY;
  },
  fiber$scrollTo :function _trc_func_20003095_22(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20003136;//kernel.Sprites:3136
    _this.sx=scrollX;
    //$LASTPOS=20003153;//kernel.Sprites:3153
    _this.sy=scrollY;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Mod=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_21000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_21000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  bvec :function _trc_func_21000015_2(tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    
    //$LASTPOS=21000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    return new b2Vec2(tx/_this.scale,ty/_this.scale);
  },
  fiber$bvec :function _trc_func_21000015_3(_thread,tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    
    //$LASTPOS=21000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_22000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000150;//kernel.T2World:150
    _this.loop();
  },
  fiber$main :function _trc_func_22000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000150;//kernel.T2World:150
          _this.fiber$loop(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_22000067_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    //$LASTPOS=22000133;//kernel.T2World:133
    _this.initWorld();
  },
  fiber$onAppear :function _trc_func_22000067_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    
    _thread.enter(function _trc_func_22000067_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000133;//kernel.T2World:133
          _this.fiber$initWorld(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initWorld :function _trc_func_22000163_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=22000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=22000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=22000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=22000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=22000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=22000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=22000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=22000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=22000533;//kernel.T2World:533
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
  },
  fiber$initWorld :function _trc_func_22000163_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=22000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=22000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=22000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=22000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=22000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=22000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=22000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=22000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    
    _thread.enter(function _trc_func_22000163_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000533;//kernel.T2World:533
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseWorld));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseWorld :function _trc_func_22000561_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=22000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
  },
  fiber$releaseWorld :function _trc_func_22000561_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=22000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
    
    _thread.retVal=_this;return;
  },
  loop :function _trc_func_22000626_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000641;//kernel.T2World:641
    while (true) {
      //$LASTPOS=22000664;//kernel.T2World:664
      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
      //$LASTPOS=22000831;//kernel.T2World:831
      _this.world.DrawDebugData();
      //$LASTPOS=22000863;//kernel.T2World:863
      _this.world.ClearForces();
      //$LASTPOS=22000893;//kernel.T2World:893
      _this.updatePos();
      //$LASTPOS=22000915;//kernel.T2World:915
      _this.update();
      
    }
  },
  fiber$loop :function _trc_func_22000626_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22000626_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000641;//kernel.T2World:641
        case 1:
          //$LASTPOS=22000664;//kernel.T2World:664
          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
          //$LASTPOS=22000831;//kernel.T2World:831
          _this.world.DrawDebugData();
          //$LASTPOS=22000863;//kernel.T2World:863
          _this.world.ClearForces();
          //$LASTPOS=22000893;//kernel.T2World:893
          _this.fiber$updatePos(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=22000915;//kernel.T2World:915
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
  updatePos :function _trc_func_22000936_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b;
    var d;
    
    //$LASTPOS=22000956;//kernel.T2World:956
    //$LASTPOS=22000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=22001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=22001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=22001053;//kernel.T2World:1053
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
  },
  fiber$updatePos :function _trc_func_22000936_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b;
    var d;
    
    //$LASTPOS=22000956;//kernel.T2World:956
    //$LASTPOS=22000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=22001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=22001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=22001053;//kernel.T2World:1053
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
Tonyu.classes.kernel.MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_23000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_23000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_23000002_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$play :function _trc_func_23000002_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_23000022_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_23000022_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  playSE :function _trc_func_23000042_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  setDelay :function _trc_func_23000064_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setDelay :function _trc_func_23000064_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setVolume :function _trc_func_23000087_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setVolume :function _trc_func_23000087_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MediaPlayer,{"fullName":"kernel.MediaPlayer","namespace":"kernel","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_24000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_24000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_24000055_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000069;//kernel.T2MediaPlayer:69
    _this.initT2MediaPlayer();
  },
  initT2MediaPlayer :function _trc_func_24000096_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      return _this;
    }
    //$LASTPOS=24000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=24000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=24000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
  },
  fiber$initT2MediaPlayer :function _trc_func_24000096_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=24000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=24000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=24000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    
    _thread.retVal=_this;return;
  },
  clearSEData :function _trc_func_24000259_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=24000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
  },
  fiber$clearSEData :function _trc_func_24000259_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=24000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
    
    _thread.retVal=_this;return;
  },
  clearBGMData :function _trc_func_24000344_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000367;//kernel.T2MediaPlayer:367
    _this.clearSEData();
  },
  fiber$clearBGMData :function _trc_func_24000344_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_24000344_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000367;//kernel.T2MediaPlayer:367
          _this.fiber$clearSEData(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  deleteSEData :function _trc_func_24000388_10(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
  },
  fiber$deleteSEData :function _trc_func_24000388_11(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
    
    _thread.retVal=_this;return;
  },
  loadSE :function _trc_func_24000457_12(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    var cnt;
    
    //$LASTPOS=24000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=24000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=24000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    //$LASTPOS=24000616;//kernel.T2MediaPlayer:616
    while (data==null) {
      //$LASTPOS=24000648;//kernel.T2MediaPlayer:648
      _this.update();
      //$LASTPOS=24000667;//kernel.T2MediaPlayer:667
      data=T2MediaLib.getSEData(idx);
      //$LASTPOS=24000710;//kernel.T2MediaPlayer:710
      cnt++;
      
    }
    return data;
  },
  fiber$loadSE :function _trc_func_24000457_13(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    var cnt;
    
    //$LASTPOS=24000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=24000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=24000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    
    _thread.enter(function _trc_func_24000457_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000616;//kernel.T2MediaPlayer:616
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=24000648;//kernel.T2MediaPlayer:648
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=24000667;//kernel.T2MediaPlayer:667
          data=T2MediaLib.getSEData(idx);
          //$LASTPOS=24000710;//kernel.T2MediaPlayer:710
          cnt++;
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  loadFromProject :function _trc_func_24000852_15(prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var s;
    var _it_195;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=24000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=24000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      return _this;
    }
    //$LASTPOS=24000945;//kernel.T2MediaPlayer:945
    _it_195=Tonyu.iterator(r.sounds,1);
    while(_it_195.next()) {
      s=_it_195[0];
      
      //$LASTPOS=24000981;//kernel.T2MediaPlayer:981
      name = s.name;url = s.url;
      //$LASTPOS=24001019;//kernel.T2MediaPlayer:1019
      ls = /^ls:(.*)/.exec(url);
      //$LASTPOS=24001058;//kernel.T2MediaPlayer:1058
      if (ls) {
        //$LASTPOS=24001081;//kernel.T2MediaPlayer:1081
        f = prj.getDir().rel(ls[1]);
        //$LASTPOS=24001125;//kernel.T2MediaPlayer:1125
        if (f.exists()) {
          //$LASTPOS=24001160;//kernel.T2MediaPlayer:1160
          url=f.text();
          //$LASTPOS=24001191;//kernel.T2MediaPlayer:1191
          Tonyu.globals.$lastURL=url;
          
        }
        
      }
      //$LASTPOS=24001242;//kernel.T2MediaPlayer:1242
      Tonyu.setGlobal(name,name);
      //$LASTPOS=24001281;//kernel.T2MediaPlayer:1281
      _this.print("Loading Sound: "+name);
      //$LASTPOS=24001322;//kernel.T2MediaPlayer:1322
      _this.loadSE(name,url);
      
    }
  },
  fiber$loadFromProject :function _trc_func_24000852_16(_thread,prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var s;
    var _it_195;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=24000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=24000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_24000852_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000945;//kernel.T2MediaPlayer:945
          _it_195=Tonyu.iterator(r.sounds,1);
        case 1:
          if (!(_it_195.next())) { __pc=3; break; }
          s=_it_195[0];
          
          //$LASTPOS=24000981;//kernel.T2MediaPlayer:981
          name = s.name;url = s.url;
          //$LASTPOS=24001019;//kernel.T2MediaPlayer:1019
          ls = /^ls:(.*)/.exec(url);
          //$LASTPOS=24001058;//kernel.T2MediaPlayer:1058
          if (ls) {
            //$LASTPOS=24001081;//kernel.T2MediaPlayer:1081
            f = prj.getDir().rel(ls[1]);
            //$LASTPOS=24001125;//kernel.T2MediaPlayer:1125
            if (f.exists()) {
              //$LASTPOS=24001160;//kernel.T2MediaPlayer:1160
              url=f.text();
              //$LASTPOS=24001191;//kernel.T2MediaPlayer:1191
              Tonyu.globals.$lastURL=url;
              
            }
            
          }
          //$LASTPOS=24001242;//kernel.T2MediaPlayer:1242
          Tonyu.setGlobal(name,name);
          //$LASTPOS=24001281;//kernel.T2MediaPlayer:1281
          _this.print("Loading Sound: "+name);
          //$LASTPOS=24001322;//kernel.T2MediaPlayer:1322
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
  playSE :function _trc_func_24001402_18(idx,vol,rate,offset,loop,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24001503;//kernel.T2MediaPlayer:1503
    if (vol==null) {
      //$LASTPOS=24001520;//kernel.T2MediaPlayer:1520
      vol=128;
    }
    //$LASTPOS=24001609;//kernel.T2MediaPlayer:1609
    if (vol<0) {
      //$LASTPOS=24001629;//kernel.T2MediaPlayer:1629
      vol=0;
    } else {
      //$LASTPOS=24001650;//kernel.T2MediaPlayer:1650
      if (vol>128) {
        //$LASTPOS=24001665;//kernel.T2MediaPlayer:1665
        vol=128;
      }
    }
    return T2MediaLib.playSE(idx,vol/128,rate,offset,loop,loopStart,loopEnd);
  },
  stopSE :function _trc_func_24001769_19(sourceObj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopSE(sourceObj);
  },
  fiber$stopSE :function _trc_func_24001769_20(_thread,sourceObj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopSE(sourceObj);return;
    
    
    _thread.retVal=_this;return;
  },
  getSEData :function _trc_func_24001838_21(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getSEData(idx);
  },
  fiber$getSEData :function _trc_func_24001838_22(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getSEData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  loadBGM :function _trc_func_24001914_23(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    
    //$LASTPOS=24001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=24002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    //$LASTPOS=24002060;//kernel.T2MediaPlayer:2060
    while (data==null) {
      //$LASTPOS=24002092;//kernel.T2MediaPlayer:2092
      _this.update();
      //$LASTPOS=24002111;//kernel.T2MediaPlayer:2111
      data=T2MediaLib.getBGMData(idx);
      
    }
    return data;
  },
  fiber$loadBGM :function _trc_func_24001914_24(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    
    //$LASTPOS=24001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=24002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    
    _thread.enter(function _trc_func_24001914_25(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24002060;//kernel.T2MediaPlayer:2060
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=24002092;//kernel.T2MediaPlayer:2092
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=24002111;//kernel.T2MediaPlayer:2111
          data=T2MediaLib.getBGMData(idx);
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  playBGM :function _trc_func_24002177_26(idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=24002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=24002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=24002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGM :function _trc_func_24002177_27(_thread,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=24002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=24002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=24002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    _thread.retVal=T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
    
    
    _thread.retVal=_this;return;
  },
  stopBGM :function _trc_func_24002383_28() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopBGM(0);
  },
  fiber$stopBGM :function _trc_func_24002383_29(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  pauseBGM :function _trc_func_24002437_30() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseBGM(0);
  },
  fiber$pauseBGM :function _trc_func_24002437_31(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  resumeBGM :function _trc_func_24002493_32() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeBGM(0);
  },
  fiber$resumeBGM :function _trc_func_24002493_33(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMVolume :function _trc_func_24002551_34(vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=24002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=24002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=24002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=24002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(0,vol);
  },
  fiber$setBGMVolume :function _trc_func_24002551_35(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=24002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=24002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=24002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=24002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMTempo :function _trc_func_24002790_36(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setBGMTempo(0,tempo);
  },
  fiber$setBGMTempo :function _trc_func_24002790_37(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setBGMTempo(0,tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMCurrentTime :function _trc_func_24002948_38() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMCurrentTime(0);
  },
  fiber$getBGMCurrentTime :function _trc_func_24002948_39(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMCurrentTime(0);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMLength :function _trc_func_24003022_40() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMLength(0);
  },
  fiber$getBGMLength :function _trc_func_24003022_41(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMLength(0);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMData :function _trc_func_24003086_42(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMData(idx);
  },
  fiber$getBGMData :function _trc_func_24003086_43(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  playBGMID :function _trc_func_24003171_44(id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=24003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=24003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=24003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGMID :function _trc_func_24003171_45(_thread,id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=24003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=24003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=24003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    _thread.retVal=T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
    
    
    _thread.retVal=_this;return;
  },
  stopBGMID :function _trc_func_24003384_46(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopBGM(id);
  },
  fiber$stopBGMID :function _trc_func_24003384_47(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  pauseBGMID :function _trc_func_24003443_48(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseBGM(id);
  },
  fiber$pauseBGMID :function _trc_func_24003443_49(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  resumeBGMID :function _trc_func_24003504_50(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeBGM(id);
  },
  fiber$resumeBGMID :function _trc_func_24003504_51(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMVolumeID :function _trc_func_24003567_52(id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=24003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=24003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=24003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=24003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(id,vol);
  },
  fiber$setBGMVolumeID :function _trc_func_24003567_53(_thread,id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=24003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=24003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=24003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=24003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMTempoID :function _trc_func_24003813_54(id,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setBGMTempo(id,tempo);
  },
  fiber$setBGMTempoID :function _trc_func_24003813_55(_thread,id,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setBGMTempo(id,tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMCurrentTimeID :function _trc_func_24003978_56(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMCurrentTime(id);
  },
  fiber$getBGMCurrentTimeID :function _trc_func_24003978_57(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMCurrentTime(id);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMLengthID :function _trc_func_24004057_58(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMLength(id);
  },
  fiber$getBGMLengthID :function _trc_func_24004057_59(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMLength(id);return;
    
    
    _thread.retVal=_this;return;
  },
  sizeBGMID :function _trc_func_24004126_60() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMPlayerMax();
  },
  fiber$sizeBGMID :function _trc_func_24004126_61(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMPlayerMax();return;
    
    
    _thread.retVal=_this;return;
  },
  allStopBGM :function _trc_func_24004189_62() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
  },
  fiber$allStopBGM :function _trc_func_24004189_63(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
    
    _thread.retVal=_this;return;
  },
  loadAudio :function _trc_func_24004245_64(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    //$LASTPOS=24004351;//kernel.T2MediaPlayer:4351
    while (T2MediaLib.getAudioData(idx)==null) {
      //$LASTPOS=24004396;//kernel.T2MediaPlayer:4396
      _this.update();
    }
  },
  fiber$loadAudio :function _trc_func_24004245_65(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    
    _thread.enter(function _trc_func_24004245_66(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24004351;//kernel.T2MediaPlayer:4351
        case 1:
          if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
          //$LASTPOS=24004396;//kernel.T2MediaPlayer:4396
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
  playAudio :function _trc_func_24004412_67(idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=24004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=24004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=24004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    return T2MediaLib.playAudio(idx,loop,startTime);
  },
  fiber$playAudio :function _trc_func_24004412_68(_thread,idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=24004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=24004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=24004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    _thread.retVal=T2MediaLib.playAudio(idx,loop,startTime);return;
    
    
    _thread.retVal=_this;return;
  },
  stopAudio :function _trc_func_24004591_69() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopAudio();
  },
  fiber$stopAudio :function _trc_func_24004591_70(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  pauseAudio :function _trc_func_24004648_71() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseAudio();
  },
  fiber$pauseAudio :function _trc_func_24004648_72(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  resumeAudio :function _trc_func_24004707_73() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeAudio();
  },
  fiber$resumeAudio :function _trc_func_24004707_74(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioVolume :function _trc_func_24004768_75(vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=24004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=24004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=24004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=24004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    return T2MediaLib.setAudioVolume(vol);
  },
  fiber$setAudioVolume :function _trc_func_24004768_76(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=24004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=24004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=24004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=24004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioTempo :function _trc_func_24004935_77(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=24004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=24005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=24005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    return T2MediaLib.setAudioTempo(tempo);
  },
  fiber$setAudioTempo :function _trc_func_24004935_78(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=24004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=24005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=24005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    _thread.retVal=T2MediaLib.setAudioTempo(tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioPosition :function _trc_func_24005090_79(time) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setAudioPosition(time);
  },
  fiber$setAudioPosition :function _trc_func_24005090_80(_thread,time) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setAudioPosition(time);return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioCurrentTime :function _trc_func_24005169_81() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioCurrentTime();
  },
  fiber$getAudioCurrentTime :function _trc_func_24005169_82(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioCurrentTime();return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioLength :function _trc_func_24005246_83() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioLength();
  },
  fiber$getAudioLength :function _trc_func_24005246_84(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioLength();return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioData :function _trc_func_24005313_85(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioData(idx);
  },
  fiber$getAudioData :function _trc_func_24005313_86(_thread,idx) {
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
  main :function _trc_func_25000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_25000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_25000047_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=25000066;//kernel.PlainChar:66
    if (Tonyu.runMode) {
      //$LASTPOS=25000096;//kernel.PlainChar:96
      if (Tonyu.globals.$Scheduler) {
        //$LASTPOS=25000127;//kernel.PlainChar:127
        _this._th=Tonyu.globals.$Scheduler.newThread(_this,"tMain",[]);
        
      } else {
        //$LASTPOS=25000203;//kernel.PlainChar:203
        thg = _this.currentThreadGroup();
        //$LASTPOS=25000246;//kernel.PlainChar:246
        if (thg) {
          //$LASTPOS=25000255;//kernel.PlainChar:255
          _this._th=thg.addObj(_this,"tMain");
        }
        
      }
      //$LASTPOS=25000305;//kernel.PlainChar:305
      _this.initSprite();
      
    }
    //$LASTPOS=25000331;//kernel.PlainChar:331
    if (typeof  x=="object") {
      //$LASTPOS=25000355;//kernel.PlainChar:355
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=25000387;//kernel.PlainChar:387
      if (typeof  x=="number") {
        //$LASTPOS=25000422;//kernel.PlainChar:422
        _this.x=x;
        //$LASTPOS=25000441;//kernel.PlainChar:441
        _this.y=y;
        //$LASTPOS=25000460;//kernel.PlainChar:460
        _this.p=p;
        
      }
    }
  },
  draw :function _trc_func_25000481_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000497;//kernel.PlainChar:497
    _this.onDraw();
    //$LASTPOS=25000512;//kernel.PlainChar:512
    if (_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=25000543;//kernel.PlainChar:543
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  setVisible :function _trc_func_25000562_4(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000584;//kernel.PlainChar:584
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_25000562_5(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000584;//kernel.PlainChar:584
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  onDraw :function _trc_func_25000605_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onDraw :function _trc_func_25000605_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_25000623_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000640;//kernel.PlainChar:640
    _this.onUpdate();
    //$LASTPOS=25000657;//kernel.PlainChar:657
    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
  },
  fiber$update :function _trc_func_25000623_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000640;//kernel.PlainChar:640
    _this.onUpdate();
    
    _thread.enter(function _trc_func_25000623_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000657;//kernel.PlainChar:657
          Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onUpdate :function _trc_func_25000677_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  initSprite :function _trc_func_25000697_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000718;//kernel.PlainChar:718
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=25000770;//kernel.PlainChar:770
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=25000808;//kernel.PlainChar:808
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=25000840;//kernel.PlainChar:840
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_25000697_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000718;//kernel.PlainChar:718
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=25000770;//kernel.PlainChar:770
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=25000808;//kernel.PlainChar:808
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_25000697_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000840;//kernel.PlainChar:840
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  tMain :function _trc_func_25000856_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000872;//kernel.PlainChar:872
    _this.main();
    //$LASTPOS=25000885;//kernel.PlainChar:885
    _this.die();
  },
  fiber$tMain :function _trc_func_25000856_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_25000856_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000872;//kernel.PlainChar:872
          _this.fiber$main(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=25000885;//kernel.PlainChar:885
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  color :function _trc_func_25000896_18(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_25000896_19(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_25000958_20(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=25000994;//kernel.PlainChar:994
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=25001019;//kernel.PlainChar:1019
    if (! size) {
      //$LASTPOS=25001030;//kernel.PlainChar:1030
      size=15;
    }
    //$LASTPOS=25001044;//kernel.PlainChar:1044
    if (! col) {
      //$LASTPOS=25001054;//kernel.PlainChar:1054
      col="cyan";
    }
    //$LASTPOS=25001071;//kernel.PlainChar:1071
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=25001125;//kernel.PlainChar:1125
    if (tp.length>0) {
      //$LASTPOS=25001153;//kernel.PlainChar:1153
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=25001232;//kernel.PlainChar:1232
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_25000958_21(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=25000994;//kernel.PlainChar:994
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=25001019;//kernel.PlainChar:1019
    if (! size) {
      //$LASTPOS=25001030;//kernel.PlainChar:1030
      size=15;
    }
    //$LASTPOS=25001044;//kernel.PlainChar:1044
    if (! col) {
      //$LASTPOS=25001054;//kernel.PlainChar:1054
      col="cyan";
    }
    //$LASTPOS=25001071;//kernel.PlainChar:1071
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=25001125;//kernel.PlainChar:1125
    if (tp.length>0) {
      //$LASTPOS=25001153;//kernel.PlainChar:1153
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=25001232;//kernel.PlainChar:1232
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_25001285_22(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=25001317;//kernel.PlainChar:1317
    if (! col) {
      //$LASTPOS=25001327;//kernel.PlainChar:1327
      col="white";
    }
    //$LASTPOS=25001345;//kernel.PlainChar:1345
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=25001399;//kernel.PlainChar:1399
    if (tp.length>0) {
      //$LASTPOS=25001427;//kernel.PlainChar:1427
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=25001478;//kernel.PlainChar:1478
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_25001285_23(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=25001317;//kernel.PlainChar:1317
    if (! col) {
      //$LASTPOS=25001327;//kernel.PlainChar:1327
      col="white";
    }
    //$LASTPOS=25001345;//kernel.PlainChar:1345
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=25001399;//kernel.PlainChar:1399
    if (tp.length>0) {
      //$LASTPOS=25001427;//kernel.PlainChar:1427
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=25001478;//kernel.PlainChar:1478
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  appear :function _trc_func_25001516_24(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return t;
  },
  fiber$appear :function _trc_func_25001516_25(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=t;return;
    
    
    _thread.retVal=_this;return;
  },
  trunc :function _trc_func_25001548_26(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.trunc(f);
  },
  loadPage :function _trc_func_25001591_27(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25001617;//kernel.PlainChar:1617
    _this.all().die();
    //$LASTPOS=25001635;//kernel.PlainChar:1635
    new page(arg);
    //$LASTPOS=25001655;//kernel.PlainChar:1655
    _this.die();
  },
  fiber$loadPage :function _trc_func_25001591_28(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25001617;//kernel.PlainChar:1617
    _this.all().die();
    //$LASTPOS=25001635;//kernel.PlainChar:1635
    new page(arg);
    //$LASTPOS=25001655;//kernel.PlainChar:1655
    _this.die();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_26000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_26000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_26000022_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_27000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_27000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_27000022_2(x,y,p,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000043;//kernel.SpriteChar:43
    Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
    //$LASTPOS=27000062;//kernel.SpriteChar:62
    _this.f=f;
    //$LASTPOS=27000077;//kernel.SpriteChar:77
    if (! _this.x) {
      //$LASTPOS=27000090;//kernel.SpriteChar:90
      _this.x=0;
    }
    //$LASTPOS=27000105;//kernel.SpriteChar:105
    if (! _this.y) {
      //$LASTPOS=27000118;//kernel.SpriteChar:118
      _this.y=0;
    }
    //$LASTPOS=27000133;//kernel.SpriteChar:133
    if (! _this.p) {
      //$LASTPOS=27000146;//kernel.SpriteChar:146
      _this.p=0;
    }
  },
  draw :function _trc_func_27000160_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000176;//kernel.SpriteChar:176
    if (_this.f) {
      //$LASTPOS=27000194;//kernel.SpriteChar:194
      if (! _this.scaleY) {
        //$LASTPOS=27000207;//kernel.SpriteChar:207
        _this.scaleY=_this.scaleX;
      }
      //$LASTPOS=27000231;//kernel.SpriteChar:231
      _this.scaleX*=- 1;
      
    }
    //$LASTPOS=27000255;//kernel.SpriteChar:255
    Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
    //$LASTPOS=27000275;//kernel.SpriteChar:275
    if (_this.f) {
      //$LASTPOS=27000282;//kernel.SpriteChar:282
      _this.scaleX*=- 1;
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SpriteChar,{"fullName":"kernel.SpriteChar","namespace":"kernel","shortName":"SpriteChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Line=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_28000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_28000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_28000016_2(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28000034;//kernel.T1Line:34
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=28000065;//kernel.T1Line:65
    ctx.strokeStyle=_this.col;
    //$LASTPOS=28000091;//kernel.T1Line:91
    ctx.beginPath();
    //$LASTPOS=28000113;//kernel.T1Line:113
    ctx.moveTo(_this.x,_this.y);
    //$LASTPOS=28000135;//kernel.T1Line:135
    ctx.lineTo(_this.tx,_this.ty);
    //$LASTPOS=28000159;//kernel.T1Line:159
    ctx.stroke();
    //$LASTPOS=28000178;//kernel.T1Line:178
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Line,{"fullName":"kernel.T1Line","namespace":"kernel","shortName":"T1Line","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Map=Tonyu.klass(Tonyu.classes.kernel.Map,[],{
  main :function _trc_func_29000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_29000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_29000042_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=29000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
  },
  fiber$setBGColor :function _trc_func_29000042_3(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=29000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
    
    _thread.retVal=_this;return;
  },
  load :function _trc_func_29000091_4(fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var o;
    
    //$LASTPOS=29000469;//kernel.T1Map:469
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=29000512;//kernel.T1Map:512
    o = f.obj();
    //$LASTPOS=29000532;//kernel.T1Map:532
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=29000560;//kernel.T1Map:560
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=29000590;//kernel.T1Map:590
    _this.baseData=o.baseData;
    //$LASTPOS=29000616;//kernel.T1Map:616
    _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
    //$LASTPOS=29000658;//kernel.T1Map:658
    _this.mapData=_this.mapTable;
    //$LASTPOS=29000681;//kernel.T1Map:681
    _this.row=_this.mapTable.length;
    //$LASTPOS=29000707;//kernel.T1Map:707
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=29000736;//kernel.T1Map:736
    _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
    //$LASTPOS=29000780;//kernel.T1Map:780
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=29000813;//kernel.T1Map:813
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=29000885;//kernel.T1Map:885
    _this.initMap();
  },
  fiber$load :function _trc_func_29000091_5(_thread,fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var o;
    
    //$LASTPOS=29000469;//kernel.T1Map:469
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=29000512;//kernel.T1Map:512
    o = f.obj();
    //$LASTPOS=29000532;//kernel.T1Map:532
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=29000560;//kernel.T1Map:560
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=29000590;//kernel.T1Map:590
    _this.baseData=o.baseData;
    
    _thread.enter(function _trc_func_29000091_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=29000616;//kernel.T1Map:616
          _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
          __pc=1;return;
        case 1:
          _this.mapTable=_thread.retVal;
          
          //$LASTPOS=29000658;//kernel.T1Map:658
          _this.mapData=_this.mapTable;
          //$LASTPOS=29000681;//kernel.T1Map:681
          _this.row=_this.mapTable.length;
          //$LASTPOS=29000707;//kernel.T1Map:707
          _this.col=_this.mapTable[0].length;
          //$LASTPOS=29000736;//kernel.T1Map:736
          _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
          __pc=2;return;
        case 2:
          _this.mapOnTable=_thread.retVal;
          
          //$LASTPOS=29000780;//kernel.T1Map:780
          _this.mapOnData=_this.mapOnTable;
          //$LASTPOS=29000813;//kernel.T1Map:813
          _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
          //$LASTPOS=29000885;//kernel.T1Map:885
          _this.fiber$initMap(_thread);
          __pc=3;return;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  conv :function _trc_func_29000903_7(mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=29000926;//kernel.T1Map:926
    res = [];
    //$LASTPOS=29000943;//kernel.T1Map:943
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=29000973;//kernel.T1Map:973
      rrow = [];
      //$LASTPOS=29000995;//kernel.T1Map:995
      res.push(rrow);
      //$LASTPOS=29001020;//kernel.T1Map:1020
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=29001067;//kernel.T1Map:1067
        t = tbl[dat[0]];
        //$LASTPOS=29001099;//kernel.T1Map:1099
        if (t) {
          //$LASTPOS=29001106;//kernel.T1Map:1106
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=29001165;//kernel.T1Map:1165
          rrow.push(dat[1]);
        }
      });
    });
    return res;
  },
  fiber$conv :function _trc_func_29000903_8(_thread,mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=29000926;//kernel.T1Map:926
    res = [];
    //$LASTPOS=29000943;//kernel.T1Map:943
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=29000973;//kernel.T1Map:973
      rrow = [];
      //$LASTPOS=29000995;//kernel.T1Map:995
      res.push(rrow);
      //$LASTPOS=29001020;//kernel.T1Map:1020
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=29001067;//kernel.T1Map:1067
        t = tbl[dat[0]];
        //$LASTPOS=29001099;//kernel.T1Map:1099
        if (t) {
          //$LASTPOS=29001106;//kernel.T1Map:1106
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=29001165;//kernel.T1Map:1165
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
  main :function _trc_func_30000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_30000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initGlobals :function _trc_func_30000022_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=30000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=30000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=30000103;//kernel.T1Page:103
    Tonyu.globals.$clBlack=_this.color(0,0,0);
    //$LASTPOS=30000131;//kernel.T1Page:131
    Tonyu.globals.$clRed=_this.color(255,0,0);
    //$LASTPOS=30000159;//kernel.T1Page:159
    Tonyu.globals.$clGreen=_this.color(0,255,0);
    //$LASTPOS=30000189;//kernel.T1Page:189
    Tonyu.globals.$clYellow=_this.color(255,255,0);
    //$LASTPOS=30000222;//kernel.T1Page:222
    Tonyu.globals.$clBlue=_this.color(0,0,255);
    //$LASTPOS=30000251;//kernel.T1Page:251
    Tonyu.globals.$clPink=_this.color(255,0,255);
    //$LASTPOS=30000282;//kernel.T1Page:282
    Tonyu.globals.$clAqua=_this.color(0,255,255);
    //$LASTPOS=30000313;//kernel.T1Page:313
    Tonyu.globals.$clWhite=_this.color(255,255,255);
    //$LASTPOS=30000347;//kernel.T1Page:347
    Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
  },
  fiber$initGlobals :function _trc_func_30000022_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=30000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=30000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    
    _thread.enter(function _trc_func_30000022_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=30000103;//kernel.T1Page:103
          _this.fiber$color(_thread, 0, 0, 0);
          __pc=1;return;
        case 1:
          Tonyu.globals.$clBlack=_thread.retVal;
          
          //$LASTPOS=30000131;//kernel.T1Page:131
          _this.fiber$color(_thread, 255, 0, 0);
          __pc=2;return;
        case 2:
          Tonyu.globals.$clRed=_thread.retVal;
          
          //$LASTPOS=30000159;//kernel.T1Page:159
          _this.fiber$color(_thread, 0, 255, 0);
          __pc=3;return;
        case 3:
          Tonyu.globals.$clGreen=_thread.retVal;
          
          //$LASTPOS=30000189;//kernel.T1Page:189
          _this.fiber$color(_thread, 255, 255, 0);
          __pc=4;return;
        case 4:
          Tonyu.globals.$clYellow=_thread.retVal;
          
          //$LASTPOS=30000222;//kernel.T1Page:222
          _this.fiber$color(_thread, 0, 0, 255);
          __pc=5;return;
        case 5:
          Tonyu.globals.$clBlue=_thread.retVal;
          
          //$LASTPOS=30000251;//kernel.T1Page:251
          _this.fiber$color(_thread, 255, 0, 255);
          __pc=6;return;
        case 6:
          Tonyu.globals.$clPink=_thread.retVal;
          
          //$LASTPOS=30000282;//kernel.T1Page:282
          _this.fiber$color(_thread, 0, 255, 255);
          __pc=7;return;
        case 7:
          Tonyu.globals.$clAqua=_thread.retVal;
          
          //$LASTPOS=30000313;//kernel.T1Page:313
          _this.fiber$color(_thread, 255, 255, 255);
          __pc=8;return;
        case 8:
          Tonyu.globals.$clWhite=_thread.retVal;
          
          //$LASTPOS=30000347;//kernel.T1Page:347
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
  main :function _trc_func_31000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_31000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_31000016_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=31000032;//kernel.T1Text:32
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=31000057;//kernel.T1Text:57
    c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=31000097;//kernel.T1Text:97
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    //$LASTPOS=31000117;//kernel.T1Text:117
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Text,{"fullName":"kernel.T1Text","namespace":"kernel","shortName":"T1Text","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_32000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_32000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_32000040_2(xx,yy,t,c,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000065;//kernel.TextChar:65
    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
    //$LASTPOS=32000084;//kernel.TextChar:84
    _this.text="";
    //$LASTPOS=32000098;//kernel.TextChar:98
    _this.col=Tonyu.globals.$clWhite;
    //$LASTPOS=32000117;//kernel.TextChar:117
    _this.size=20;
    //$LASTPOS=32000131;//kernel.TextChar:131
    if (! _this.x) {
      //$LASTPOS=32000144;//kernel.TextChar:144
      _this.x=0;
    }
    //$LASTPOS=32000159;//kernel.TextChar:159
    if (! _this.y) {
      //$LASTPOS=32000172;//kernel.TextChar:172
      _this.y=0;
    }
    //$LASTPOS=32000187;//kernel.TextChar:187
    if (t) {
      //$LASTPOS=32000194;//kernel.TextChar:194
      _this.text=t;
    }
    //$LASTPOS=32000207;//kernel.TextChar:207
    if (c) {
      //$LASTPOS=32000214;//kernel.TextChar:214
      _this.fillStyle=c;
    }
    //$LASTPOS=32000232;//kernel.TextChar:232
    if (s) {
      //$LASTPOS=32000239;//kernel.TextChar:239
      _this.size=s;
    }
  },
  draw :function _trc_func_32000251_3(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=32000269;//kernel.TextChar:269
    if (! _this.size) {
      //$LASTPOS=32000280;//kernel.TextChar:280
      _this.size=15;
    }
    //$LASTPOS=32000294;//kernel.TextChar:294
    if (! _this.align) {
      //$LASTPOS=32000306;//kernel.TextChar:306
      _this.align="left";
    }
    //$LASTPOS=32000325;//kernel.TextChar:325
    if (! _this.fillStyle) {
      //$LASTPOS=32000341;//kernel.TextChar:341
      _this.fillStyle="white";
    }
    //$LASTPOS=32000365;//kernel.TextChar:365
    ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=32000395;//kernel.TextChar:395
    ctx.globalAlpha=_this.alpha/255;
    //$LASTPOS=32000432;//kernel.TextChar:432
    ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=32000468;//kernel.TextChar:468
    rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
    //$LASTPOS=32000536;//kernel.TextChar:536
    _this.width=rect.w;
    //$LASTPOS=32000555;//kernel.TextChar:555
    _this.height=rect.h;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_33000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=33000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=33000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    //$LASTPOS=33000079;//kernel.MapEditor:79
    while (true) {
      //$LASTPOS=33000097;//kernel.MapEditor:97
      if (_this.getkey("y")>0) {
        //$LASTPOS=33000125;//kernel.MapEditor:125
        _this.loadMode=true;
        break;
        
        
      }
      //$LASTPOS=33000168;//kernel.MapEditor:168
      if (_this.getkey("n")>0) {
        //$LASTPOS=33000196;//kernel.MapEditor:196
        _this.loadMode=false;
        break;
        
        
      }
      //$LASTPOS=33000240;//kernel.MapEditor:240
      _this.update();
      
    }
    //$LASTPOS=33000254;//kernel.MapEditor:254
    if (_this.loadMode) {
      //$LASTPOS=33000273;//kernel.MapEditor:273
      _this.fileName=prompt("Input json file (*.json)","map.json");
      //$LASTPOS=33000334;//kernel.MapEditor:334
      if (_this.fileName) {
        //$LASTPOS=33000357;//kernel.MapEditor:357
        _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
        
      }
      //$LASTPOS=33000413;//kernel.MapEditor:413
      if (_this.mapDataFile.obj()) {
        //$LASTPOS=33000445;//kernel.MapEditor:445
        _this.baseData=_this.mapDataFile.obj();
        
      } else {
        //$LASTPOS=33000494;//kernel.MapEditor:494
        _this.mapDataFile=_this.file(_this.fileName);
        //$LASTPOS=33000531;//kernel.MapEditor:531
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=33000567;//kernel.MapEditor:567
          _this.baseData=_this.mapDataFile.obj();
          
        }
        
      }
      //$LASTPOS=33000618;//kernel.MapEditor:618
      if (_this.baseData==undefined) {
        //$LASTPOS=33000652;//kernel.MapEditor:652
        _this.print("Load failed");
        //$LASTPOS=33000683;//kernel.MapEditor:683
        _this.loadMode=false;
        
      } else {
        //$LASTPOS=33000710;//kernel.MapEditor:710
        if (_this.baseData[0]&&_this.baseData[1]) {
          //$LASTPOS=33000751;//kernel.MapEditor:751
          _this.mapData=_this.baseData[0];
          //$LASTPOS=33000781;//kernel.MapEditor:781
          _this.mapOnData=_this.baseData[1];
          
        }
      }
      
    }
    //$LASTPOS=33000815;//kernel.MapEditor:815
    _this.update();
    //$LASTPOS=33001093;//kernel.MapEditor:1093
    if (! _this.loadMode) {
      //$LASTPOS=33001113;//kernel.MapEditor:1113
      _this.row=prompt("input row");
      //$LASTPOS=33001143;//kernel.MapEditor:1143
      _this.update();
      //$LASTPOS=33001158;//kernel.MapEditor:1158
      _this.col=prompt("input col");
      //$LASTPOS=33001188;//kernel.MapEditor:1188
      _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
      //$LASTPOS=33001238;//kernel.MapEditor:1238
      _this.panel.x=_this.panel.width/2+10;
      //$LASTPOS=33001269;//kernel.MapEditor:1269
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=33001298;//kernel.MapEditor:1298
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=33001331;//kernel.MapEditor:1331
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      //$LASTPOS=33001382;//kernel.MapEditor:1382
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
      
    } else {
      //$LASTPOS=33001445;//kernel.MapEditor:1445
      if (! _this.mapOnData) {
        //$LASTPOS=33001470;//kernel.MapEditor:1470
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
        
      } else {
        //$LASTPOS=33001582;//kernel.MapEditor:1582
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
        
      }
      //$LASTPOS=33001695;//kernel.MapEditor:1695
      _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
      //$LASTPOS=33001766;//kernel.MapEditor:1766
      _this.panel.x=_this.panel.width/2;
      //$LASTPOS=33001794;//kernel.MapEditor:1794
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=33001823;//kernel.MapEditor:1823
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=33001856;//kernel.MapEditor:1856
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      
    }
    //$LASTPOS=33001906;//kernel.MapEditor:1906
    Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
    //$LASTPOS=33001961;//kernel.MapEditor:1961
    _this.counter=0;
    //$LASTPOS=33001973;//kernel.MapEditor:1973
    //$LASTPOS=33001977;//kernel.MapEditor:1977
    i = 0;
    while(i<16) {
      {
        //$LASTPOS=33002001;//kernel.MapEditor:2001
        //$LASTPOS=33002005;//kernel.MapEditor:2005
        j = 0;
        while(j<8) {
          {
            //$LASTPOS=33002032;//kernel.MapEditor:2032
            Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
            //$LASTPOS=33002076;//kernel.MapEditor:2076
            _this.counter++;
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=33002098;//kernel.MapEditor:2098
    _this.mode="get";
    //$LASTPOS=33002111;//kernel.MapEditor:2111
    _this.prevMode="set";
    //$LASTPOS=33002128;//kernel.MapEditor:2128
    _this.mapp=0;
    //$LASTPOS=33002137;//kernel.MapEditor:2137
    _this.mx=0;
    //$LASTPOS=33002144;//kernel.MapEditor:2144
    _this.my=0;
    //$LASTPOS=33002151;//kernel.MapEditor:2151
    _this.chipX=0;
    //$LASTPOS=33002161;//kernel.MapEditor:2161
    _this.chipY=0;
    //$LASTPOS=33002171;//kernel.MapEditor:2171
    _this.x=Tonyu.globals.$screenWidth-16;
    //$LASTPOS=33002191;//kernel.MapEditor:2191
    _this.y=Tonyu.globals.$screenHeight-16;
    //$LASTPOS=33002212;//kernel.MapEditor:2212
    while (true) {
      //$LASTPOS=33002230;//kernel.MapEditor:2230
      _this.p=_this.mapp;
      //$LASTPOS=33002243;//kernel.MapEditor:2243
      if (_this.getkey("e")==1) {
        //$LASTPOS=33002272;//kernel.MapEditor:2272
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=33002306;//kernel.MapEditor:2306
        _this.mode="erase";
        //$LASTPOS=33002329;//kernel.MapEditor:2329
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=33002362;//kernel.MapEditor:2362
      if (_this.getkey("s")==1) {
        //$LASTPOS=33002391;//kernel.MapEditor:2391
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=33002425;//kernel.MapEditor:2425
        if (_this.mode=="set") {
          //$LASTPOS=33002455;//kernel.MapEditor:2455
          _this.mode="setOn";
          
        } else {
          //$LASTPOS=33002498;//kernel.MapEditor:2498
          _this.mode="set";
          
        }
        //$LASTPOS=33002530;//kernel.MapEditor:2530
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=33002563;//kernel.MapEditor:2563
      if (_this.getkey("o")==1) {
        //$LASTPOS=33002592;//kernel.MapEditor:2592
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=33002626;//kernel.MapEditor:2626
        _this.mode="setOn";
        
      }
      //$LASTPOS=33002652;//kernel.MapEditor:2652
      if (_this.getkey("g")==1) {
        //$LASTPOS=33002681;//kernel.MapEditor:2681
        if (_this.mode!="get") {
          //$LASTPOS=33002711;//kernel.MapEditor:2711
          _this.prevMode=_this.mode;
          //$LASTPOS=33002739;//kernel.MapEditor:2739
          Tonyu.globals.$mp.scrollTo(0,0);
          //$LASTPOS=33002771;//kernel.MapEditor:2771
          _this.mode="get";
          //$LASTPOS=33002796;//kernel.MapEditor:2796
          _this.chipX=0;
          //$LASTPOS=33002818;//kernel.MapEditor:2818
          _this.chipY=0;
          
        } else {
          //$LASTPOS=33002856;//kernel.MapEditor:2856
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=33002894;//kernel.MapEditor:2894
          _this.mode=_this.prevMode;
          
        }
        //$LASTPOS=33002929;//kernel.MapEditor:2929
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=33002962;//kernel.MapEditor:2962
      if (_this.getkey("p")==1) {
        //$LASTPOS=33003006;//kernel.MapEditor:3006
        _this.saveFileName=prompt("input json file(*.json)","map.json");
        //$LASTPOS=33003495;//kernel.MapEditor:3495
        _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
        //$LASTPOS=33003553;//kernel.MapEditor:3553
        _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
        //$LASTPOS=33003668;//kernel.MapEditor:3668
        _this.saveDataFile.obj(_this.data);
        //$LASTPOS=33003701;//kernel.MapEditor:3701
        _this.print(_this.saveFileName+" Saved");
        
      }
      //$LASTPOS=33003793;//kernel.MapEditor:3793
      if (_this.getkey("c")==1) {
        //$LASTPOS=33003822;//kernel.MapEditor:3822
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=33003856;//kernel.MapEditor:3856
        _this.mode="spuit";
        //$LASTPOS=33003879;//kernel.MapEditor:3879
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=33003912;//kernel.MapEditor:3912
      if (_this.mode!="get") {
        //$LASTPOS=33003938;//kernel.MapEditor:3938
        if (_this.getkey("left")>0) {
          //$LASTPOS=33003959;//kernel.MapEditor:3959
          _this.mx=_this.mx+8;
        }
        //$LASTPOS=33003977;//kernel.MapEditor:3977
        if (_this.getkey("right")>0) {
          //$LASTPOS=33003999;//kernel.MapEditor:3999
          _this.mx=_this.mx-8;
        }
        //$LASTPOS=33004017;//kernel.MapEditor:4017
        if (_this.getkey("up")>0) {
          //$LASTPOS=33004036;//kernel.MapEditor:4036
          _this.my=_this.my+8;
        }
        //$LASTPOS=33004054;//kernel.MapEditor:4054
        if (_this.getkey("down")>0) {
          //$LASTPOS=33004075;//kernel.MapEditor:4075
          _this.my=_this.my-8;
        }
        //$LASTPOS=33004093;//kernel.MapEditor:4093
        Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
        
      } else {
        //$LASTPOS=33004136;//kernel.MapEditor:4136
        if (_this.getkey("left")>0) {
          //$LASTPOS=33004157;//kernel.MapEditor:4157
          _this.chipX=_this.chipX+8;
        }
        //$LASTPOS=33004181;//kernel.MapEditor:4181
        if (_this.getkey("right")>0) {
          //$LASTPOS=33004203;//kernel.MapEditor:4203
          _this.chipX=_this.chipX-8;
        }
        //$LASTPOS=33004227;//kernel.MapEditor:4227
        if (_this.getkey("up")>0) {
          //$LASTPOS=33004246;//kernel.MapEditor:4246
          _this.chipY=_this.chipY+8;
        }
        //$LASTPOS=33004270;//kernel.MapEditor:4270
        if (_this.getkey("down")>0) {
          //$LASTPOS=33004291;//kernel.MapEditor:4291
          _this.chipY=_this.chipY-8;
        }
        //$LASTPOS=33004315;//kernel.MapEditor:4315
        Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
        
      }
      //$LASTPOS=33004354;//kernel.MapEditor:4354
      _this.panel.x=_this.panel.width/2-_this.mx;
      //$LASTPOS=33004385;//kernel.MapEditor:4385
      _this.panel.y=_this.panel.height/2-_this.my;
      //$LASTPOS=33004417;//kernel.MapEditor:4417
      if (_this.mode=="set"&&_this.getkey(1)>0) {
        //$LASTPOS=33004458;//kernel.MapEditor:4458
        Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
        //$LASTPOS=33004507;//kernel.MapEditor:4507
        Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
        
      } else {
        //$LASTPOS=33004558;//kernel.MapEditor:4558
        if (_this.mode=="erase"&&_this.getkey(1)>0) {
          //$LASTPOS=33004601;//kernel.MapEditor:4601
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=33004650;//kernel.MapEditor:4650
          if (_this.mode=="get"&&_this.getkey(1)>0) {
            //$LASTPOS=33004691;//kernel.MapEditor:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=33004745;//kernel.MapEditor:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=33004769;//kernel.MapEditor:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=33004803;//kernel.MapEditor:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=33004833;//kernel.MapEditor:4833
            _this.updateEx(10);
            
          } else {
            //$LASTPOS=33004858;//kernel.MapEditor:4858
            if (_this.mode=="setOn"&&_this.getkey(1)>0) {
              //$LASTPOS=33004901;//kernel.MapEditor:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=33004954;//kernel.MapEditor:4954
              if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                //$LASTPOS=33004997;//kernel.MapEditor:4997
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=33005046;//kernel.MapEditor:5046
                _this.mode="set";
                //$LASTPOS=33005067;//kernel.MapEditor:5067
                _this.print(_this.mode+" mode");
                //$LASTPOS=33005097;//kernel.MapEditor:5097
                _this.updateEx(10);
                
              }
            }
          }
        }
      }
      //$LASTPOS=33005123;//kernel.MapEditor:5123
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_33000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=33000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=33000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    
    _thread.enter(function _trc_func_33000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=33000079;//kernel.MapEditor:79
        case 1:
          //$LASTPOS=33000097;//kernel.MapEditor:97
          if (!(_this.getkey("y")>0)) { __pc=2; break; }
          //$LASTPOS=33000125;//kernel.MapEditor:125
          _this.loadMode=true;
          __pc=5; break;
          
        case 2:
          
          //$LASTPOS=33000168;//kernel.MapEditor:168
          if (!(_this.getkey("n")>0)) { __pc=3; break; }
          //$LASTPOS=33000196;//kernel.MapEditor:196
          _this.loadMode=false;
          __pc=5; break;
          
        case 3:
          
          //$LASTPOS=33000240;//kernel.MapEditor:240
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=1;break;
        case 5:
          
          //$LASTPOS=33000254;//kernel.MapEditor:254
          if (!(_this.loadMode)) { __pc=9; break; }
          //$LASTPOS=33000273;//kernel.MapEditor:273
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=33000334;//kernel.MapEditor:334
          if (_this.fileName) {
            //$LASTPOS=33000357;//kernel.MapEditor:357
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=33000413;//kernel.MapEditor:413
          if (!(_this.mapDataFile.obj())) { __pc=6; break; }
          {
            //$LASTPOS=33000445;//kernel.MapEditor:445
            _this.baseData=_this.mapDataFile.obj();
          }
          __pc=8;break;
        case 6:
          //$LASTPOS=33000494;//kernel.MapEditor:494
          _this.fiber$file(_thread, _this.fileName);
          __pc=7;return;
        case 7:
          _this.mapDataFile=_thread.retVal;
          
          //$LASTPOS=33000531;//kernel.MapEditor:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=33000567;//kernel.MapEditor:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
        case 8:
          
          //$LASTPOS=33000618;//kernel.MapEditor:618
          if (_this.baseData==undefined) {
            //$LASTPOS=33000652;//kernel.MapEditor:652
            _this.print("Load failed");
            //$LASTPOS=33000683;//kernel.MapEditor:683
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=33000710;//kernel.MapEditor:710
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=33000751;//kernel.MapEditor:751
              _this.mapData=_this.baseData[0];
              //$LASTPOS=33000781;//kernel.MapEditor:781
              _this.mapOnData=_this.baseData[1];
              
            }
          }
        case 9:
          
          //$LASTPOS=33000815;//kernel.MapEditor:815
          _this.fiber$update(_thread);
          __pc=10;return;
        case 10:
          
          //$LASTPOS=33001093;//kernel.MapEditor:1093
          if (!(! _this.loadMode)) { __pc=12; break; }
          //$LASTPOS=33001113;//kernel.MapEditor:1113
          _this.row=prompt("input row");
          //$LASTPOS=33001143;//kernel.MapEditor:1143
          _this.fiber$update(_thread);
          __pc=11;return;
        case 11:
          
          //$LASTPOS=33001158;//kernel.MapEditor:1158
          _this.col=prompt("input col");
          //$LASTPOS=33001188;//kernel.MapEditor:1188
          _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
          //$LASTPOS=33001238;//kernel.MapEditor:1238
          _this.panel.x=_this.panel.width/2+10;
          //$LASTPOS=33001269;//kernel.MapEditor:1269
          _this.panel.y=_this.panel.height/2;
          //$LASTPOS=33001298;//kernel.MapEditor:1298
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=33001331;//kernel.MapEditor:1331
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          //$LASTPOS=33001382;//kernel.MapEditor:1382
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
          __pc=13;break;
        case 12:
          {
            //$LASTPOS=33001445;//kernel.MapEditor:1445
            if (! _this.mapOnData) {
              //$LASTPOS=33001470;//kernel.MapEditor:1470
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
              
            } else {
              //$LASTPOS=33001582;//kernel.MapEditor:1582
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
              
            }
            //$LASTPOS=33001695;//kernel.MapEditor:1695
            _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
            //$LASTPOS=33001766;//kernel.MapEditor:1766
            _this.panel.x=_this.panel.width/2;
            //$LASTPOS=33001794;//kernel.MapEditor:1794
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=33001823;//kernel.MapEditor:1823
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=33001856;//kernel.MapEditor:1856
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          }
        case 13:
          
          //$LASTPOS=33001906;//kernel.MapEditor:1906
          Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
          //$LASTPOS=33001961;//kernel.MapEditor:1961
          _this.counter=0;
          //$LASTPOS=33001973;//kernel.MapEditor:1973
          //$LASTPOS=33001977;//kernel.MapEditor:1977
          i = 0;
          while(i<16) {
            {
              //$LASTPOS=33002001;//kernel.MapEditor:2001
              //$LASTPOS=33002005;//kernel.MapEditor:2005
              j = 0;
              while(j<8) {
                {
                  //$LASTPOS=33002032;//kernel.MapEditor:2032
                  Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                  //$LASTPOS=33002076;//kernel.MapEditor:2076
                  _this.counter++;
                }
                j++;
              }
            }
            i++;
          }
          //$LASTPOS=33002098;//kernel.MapEditor:2098
          _this.mode="get";
          //$LASTPOS=33002111;//kernel.MapEditor:2111
          _this.prevMode="set";
          //$LASTPOS=33002128;//kernel.MapEditor:2128
          _this.mapp=0;
          //$LASTPOS=33002137;//kernel.MapEditor:2137
          _this.mx=0;
          //$LASTPOS=33002144;//kernel.MapEditor:2144
          _this.my=0;
          //$LASTPOS=33002151;//kernel.MapEditor:2151
          _this.chipX=0;
          //$LASTPOS=33002161;//kernel.MapEditor:2161
          _this.chipY=0;
          //$LASTPOS=33002171;//kernel.MapEditor:2171
          _this.x=Tonyu.globals.$screenWidth-16;
          //$LASTPOS=33002191;//kernel.MapEditor:2191
          _this.y=Tonyu.globals.$screenHeight-16;
          //$LASTPOS=33002212;//kernel.MapEditor:2212
        case 14:
          //$LASTPOS=33002230;//kernel.MapEditor:2230
          _this.p=_this.mapp;
          //$LASTPOS=33002243;//kernel.MapEditor:2243
          if (_this.getkey("e")==1) {
            //$LASTPOS=33002272;//kernel.MapEditor:2272
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=33002306;//kernel.MapEditor:2306
            _this.mode="erase";
            //$LASTPOS=33002329;//kernel.MapEditor:2329
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=33002362;//kernel.MapEditor:2362
          if (_this.getkey("s")==1) {
            //$LASTPOS=33002391;//kernel.MapEditor:2391
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=33002425;//kernel.MapEditor:2425
            if (_this.mode=="set") {
              //$LASTPOS=33002455;//kernel.MapEditor:2455
              _this.mode="setOn";
              
            } else {
              //$LASTPOS=33002498;//kernel.MapEditor:2498
              _this.mode="set";
              
            }
            //$LASTPOS=33002530;//kernel.MapEditor:2530
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=33002563;//kernel.MapEditor:2563
          if (_this.getkey("o")==1) {
            //$LASTPOS=33002592;//kernel.MapEditor:2592
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=33002626;//kernel.MapEditor:2626
            _this.mode="setOn";
            
          }
          //$LASTPOS=33002652;//kernel.MapEditor:2652
          if (_this.getkey("g")==1) {
            //$LASTPOS=33002681;//kernel.MapEditor:2681
            if (_this.mode!="get") {
              //$LASTPOS=33002711;//kernel.MapEditor:2711
              _this.prevMode=_this.mode;
              //$LASTPOS=33002739;//kernel.MapEditor:2739
              Tonyu.globals.$mp.scrollTo(0,0);
              //$LASTPOS=33002771;//kernel.MapEditor:2771
              _this.mode="get";
              //$LASTPOS=33002796;//kernel.MapEditor:2796
              _this.chipX=0;
              //$LASTPOS=33002818;//kernel.MapEditor:2818
              _this.chipY=0;
              
            } else {
              //$LASTPOS=33002856;//kernel.MapEditor:2856
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=33002894;//kernel.MapEditor:2894
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=33002929;//kernel.MapEditor:2929
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=33002962;//kernel.MapEditor:2962
          if (_this.getkey("p")==1) {
            //$LASTPOS=33003006;//kernel.MapEditor:3006
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            //$LASTPOS=33003495;//kernel.MapEditor:3495
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=33003553;//kernel.MapEditor:3553
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
            //$LASTPOS=33003668;//kernel.MapEditor:3668
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=33003701;//kernel.MapEditor:3701
            _this.print(_this.saveFileName+" Saved");
            
          }
          //$LASTPOS=33003793;//kernel.MapEditor:3793
          if (_this.getkey("c")==1) {
            //$LASTPOS=33003822;//kernel.MapEditor:3822
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=33003856;//kernel.MapEditor:3856
            _this.mode="spuit";
            //$LASTPOS=33003879;//kernel.MapEditor:3879
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=33003912;//kernel.MapEditor:3912
          if (_this.mode!="get") {
            //$LASTPOS=33003938;//kernel.MapEditor:3938
            if (_this.getkey("left")>0) {
              //$LASTPOS=33003959;//kernel.MapEditor:3959
              _this.mx=_this.mx+8;
            }
            //$LASTPOS=33003977;//kernel.MapEditor:3977
            if (_this.getkey("right")>0) {
              //$LASTPOS=33003999;//kernel.MapEditor:3999
              _this.mx=_this.mx-8;
            }
            //$LASTPOS=33004017;//kernel.MapEditor:4017
            if (_this.getkey("up")>0) {
              //$LASTPOS=33004036;//kernel.MapEditor:4036
              _this.my=_this.my+8;
            }
            //$LASTPOS=33004054;//kernel.MapEditor:4054
            if (_this.getkey("down")>0) {
              //$LASTPOS=33004075;//kernel.MapEditor:4075
              _this.my=_this.my-8;
            }
            //$LASTPOS=33004093;//kernel.MapEditor:4093
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            
          } else {
            //$LASTPOS=33004136;//kernel.MapEditor:4136
            if (_this.getkey("left")>0) {
              //$LASTPOS=33004157;//kernel.MapEditor:4157
              _this.chipX=_this.chipX+8;
            }
            //$LASTPOS=33004181;//kernel.MapEditor:4181
            if (_this.getkey("right")>0) {
              //$LASTPOS=33004203;//kernel.MapEditor:4203
              _this.chipX=_this.chipX-8;
            }
            //$LASTPOS=33004227;//kernel.MapEditor:4227
            if (_this.getkey("up")>0) {
              //$LASTPOS=33004246;//kernel.MapEditor:4246
              _this.chipY=_this.chipY+8;
            }
            //$LASTPOS=33004270;//kernel.MapEditor:4270
            if (_this.getkey("down")>0) {
              //$LASTPOS=33004291;//kernel.MapEditor:4291
              _this.chipY=_this.chipY-8;
            }
            //$LASTPOS=33004315;//kernel.MapEditor:4315
            Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
            
          }
          //$LASTPOS=33004354;//kernel.MapEditor:4354
          _this.panel.x=_this.panel.width/2-_this.mx;
          //$LASTPOS=33004385;//kernel.MapEditor:4385
          _this.panel.y=_this.panel.height/2-_this.my;
          //$LASTPOS=33004417;//kernel.MapEditor:4417
          if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
          {
            //$LASTPOS=33004458;//kernel.MapEditor:4458
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=33004507;//kernel.MapEditor:4507
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=25;break;
        case 15:
          //$LASTPOS=33004558;//kernel.MapEditor:4558
          if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
          {
            //$LASTPOS=33004601;//kernel.MapEditor:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=24;break;
        case 16:
          //$LASTPOS=33004650;//kernel.MapEditor:4650
          if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
          //$LASTPOS=33004691;//kernel.MapEditor:4691
          _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
          //$LASTPOS=33004745;//kernel.MapEditor:4745
          _this.mode=_this.prevMode;
          //$LASTPOS=33004769;//kernel.MapEditor:4769
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=33004803;//kernel.MapEditor:4803
          _this.print(_this.mode+" mode");
          //$LASTPOS=33004833;//kernel.MapEditor:4833
          _this.fiber$updateEx(_thread, 10);
          __pc=17;return;
        case 17:
          
          __pc=23;break;
        case 18:
          //$LASTPOS=33004858;//kernel.MapEditor:4858
          if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
          {
            //$LASTPOS=33004901;//kernel.MapEditor:4901
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          }
          __pc=22;break;
        case 19:
          //$LASTPOS=33004954;//kernel.MapEditor:4954
          if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
          //$LASTPOS=33004997;//kernel.MapEditor:4997
          _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
          //$LASTPOS=33005046;//kernel.MapEditor:5046
          _this.mode="set";
          //$LASTPOS=33005067;//kernel.MapEditor:5067
          _this.print(_this.mode+" mode");
          //$LASTPOS=33005097;//kernel.MapEditor:5097
          _this.fiber$updateEx(_thread, 10);
          __pc=20;return;
        case 20:
          
        case 21:
          
        case 22:
          
        case 23:
          
        case 24:
          
        case 25:
          
          //$LASTPOS=33005123;//kernel.MapEditor:5123
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
  main :function _trc_func_34000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    //$LASTPOS=34003465;//kernel.Pad:3465
    while (true) {
      //$LASTPOS=34003484;//kernel.Pad:3484
      _this.padUpdate();
      //$LASTPOS=34003502;//kernel.Pad:3502
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_34000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    
    _thread.enter(function _trc_func_34000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34003465;//kernel.Pad:3465
        case 1:
          //$LASTPOS=34003484;//kernel.Pad:3484
          _this.fiber$padUpdate(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=34003502;//kernel.Pad:3502
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
  initialize :function _trc_func_34000016_3(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000033;//kernel.Pad:33
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=34000050;//kernel.Pad:50
    _this.padImageP=Tonyu.globals.$pat_inputPad;
    //$LASTPOS=34000082;//kernel.Pad:82
    _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000183;//kernel.Pad:183
    _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000292;//kernel.Pad:292
    _this.jujiKey.show();
    //$LASTPOS=34000313;//kernel.Pad:313
    _this.no1Key.show();
    //$LASTPOS=34000339;//kernel.Pad:339
    _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000446;//kernel.Pad:446
    _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000553;//kernel.Pad:553
    _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000660;//kernel.Pad:660
    _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000767;//kernel.Pad:767
    _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=34000879;//kernel.Pad:879
    _this.jujiKeyPushU.hide();
    //$LASTPOS=34000905;//kernel.Pad:905
    _this.jujiKeyPushL.hide();
    //$LASTPOS=34000931;//kernel.Pad:931
    _this.jujiKeyPushR.hide();
    //$LASTPOS=34000957;//kernel.Pad:957
    _this.jujiKeyPushD.hide();
    //$LASTPOS=34000983;//kernel.Pad:983
    _this.jujiKeyPush1.hide();
  },
  die :function _trc_func_34001008_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34001021;//kernel.Pad:1021
    _this.jujiKey.die();
    //$LASTPOS=34001041;//kernel.Pad:1041
    _this.no1Key.die();
    //$LASTPOS=34001060;//kernel.Pad:1060
    _this.jujiKeyPushU.die();
    //$LASTPOS=34001085;//kernel.Pad:1085
    _this.jujiKeyPushL.die();
    //$LASTPOS=34001110;//kernel.Pad:1110
    _this.jujiKeyPushR.die();
    //$LASTPOS=34001135;//kernel.Pad:1135
    _this.jujiKeyPushD.die();
    //$LASTPOS=34001160;//kernel.Pad:1160
    _this.jujiKeyPush1.die();
    //$LASTPOS=34001185;//kernel.Pad:1185
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
  },
  padUpdate :function _trc_func_34001224_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var t;
    
    //$LASTPOS=34001258;//kernel.Pad:1258
    _this.keyPushL=0;
    //$LASTPOS=34001277;//kernel.Pad:1277
    _this.keyPushR=0;
    //$LASTPOS=34001296;//kernel.Pad:1296
    _this.keyPushU=0;
    //$LASTPOS=34001315;//kernel.Pad:1315
    _this.keyPushD=0;
    //$LASTPOS=34001334;//kernel.Pad:1334
    _this.keyPush1=0;
    //$LASTPOS=34001359;//kernel.Pad:1359
    _this.padKeyNotapCnt++;
    //$LASTPOS=34001383;//kernel.Pad:1383
    //$LASTPOS=34001388;//kernel.Pad:1388
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=34001436;//kernel.Pad:1436
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=34001466;//kernel.Pad:1466
        if (t.touched) {
          //$LASTPOS=34001496;//kernel.Pad:1496
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=34001593;//kernel.Pad:1593
            _this.keyPushU=1;
          }
          //$LASTPOS=34001620;//kernel.Pad:1620
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=34001717;//kernel.Pad:1717
            _this.keyPushD=1;
          }
          //$LASTPOS=34001744;//kernel.Pad:1744
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=34001841;//kernel.Pad:1841
            _this.keyPushL=1;
          }
          //$LASTPOS=34001868;//kernel.Pad:1868
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=34001965;//kernel.Pad:1965
            _this.keyPushR=1;
          }
          //$LASTPOS=34001992;//kernel.Pad:1992
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=34002054;//kernel.Pad:2054
            _this.keyPush1=1;
          }
          //$LASTPOS=34002081;//kernel.Pad:2081
          _this.padKeySW=1;
          //$LASTPOS=34002108;//kernel.Pad:2108
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=34002173;//kernel.Pad:2173
    if (_this.keyPushL) {
      //$LASTPOS=34002187;//kernel.Pad:2187
      _this.keyCntL++;
    } else {
      //$LASTPOS=34002204;//kernel.Pad:2204
      _this.keyCntL=0;
    }
    //$LASTPOS=34002222;//kernel.Pad:2222
    if (_this.keyPushR) {
      //$LASTPOS=34002236;//kernel.Pad:2236
      _this.keyCntR++;
    } else {
      //$LASTPOS=34002253;//kernel.Pad:2253
      _this.keyCntR=0;
    }
    //$LASTPOS=34002271;//kernel.Pad:2271
    if (_this.keyPushU) {
      //$LASTPOS=34002285;//kernel.Pad:2285
      _this.keyCntU++;
    } else {
      //$LASTPOS=34002302;//kernel.Pad:2302
      _this.keyCntU=0;
    }
    //$LASTPOS=34002320;//kernel.Pad:2320
    if (_this.keyPushD) {
      //$LASTPOS=34002334;//kernel.Pad:2334
      _this.keyCntD++;
    } else {
      //$LASTPOS=34002351;//kernel.Pad:2351
      _this.keyCntD=0;
    }
    //$LASTPOS=34002369;//kernel.Pad:2369
    if (_this.keyPush1) {
      //$LASTPOS=34002383;//kernel.Pad:2383
      _this.keyCnt1++;
    } else {
      //$LASTPOS=34002400;//kernel.Pad:2400
      _this.keyCnt1=0;
    }
    //$LASTPOS=34002435;//kernel.Pad:2435
    if (_this.keyPushL) {
      //$LASTPOS=34002449;//kernel.Pad:2449
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=34002475;//kernel.Pad:2475
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=34002501;//kernel.Pad:2501
    if (_this.keyPushR) {
      //$LASTPOS=34002515;//kernel.Pad:2515
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=34002541;//kernel.Pad:2541
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=34002567;//kernel.Pad:2567
    if (_this.keyPushU) {
      //$LASTPOS=34002581;//kernel.Pad:2581
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=34002607;//kernel.Pad:2607
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=34002633;//kernel.Pad:2633
    if (_this.keyPushD) {
      //$LASTPOS=34002647;//kernel.Pad:2647
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=34002673;//kernel.Pad:2673
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=34002699;//kernel.Pad:2699
    if (_this.keyPush1) {
      //$LASTPOS=34002713;//kernel.Pad:2713
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=34002739;//kernel.Pad:2739
      _this.jujiKeyPush1.hide();
    }
  },
  fiber$padUpdate :function _trc_func_34001224_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var t;
    
    //$LASTPOS=34001258;//kernel.Pad:1258
    _this.keyPushL=0;
    //$LASTPOS=34001277;//kernel.Pad:1277
    _this.keyPushR=0;
    //$LASTPOS=34001296;//kernel.Pad:1296
    _this.keyPushU=0;
    //$LASTPOS=34001315;//kernel.Pad:1315
    _this.keyPushD=0;
    //$LASTPOS=34001334;//kernel.Pad:1334
    _this.keyPush1=0;
    //$LASTPOS=34001359;//kernel.Pad:1359
    _this.padKeyNotapCnt++;
    //$LASTPOS=34001383;//kernel.Pad:1383
    //$LASTPOS=34001388;//kernel.Pad:1388
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=34001436;//kernel.Pad:1436
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=34001466;//kernel.Pad:1466
        if (t.touched) {
          //$LASTPOS=34001496;//kernel.Pad:1496
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=34001593;//kernel.Pad:1593
            _this.keyPushU=1;
          }
          //$LASTPOS=34001620;//kernel.Pad:1620
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=34001717;//kernel.Pad:1717
            _this.keyPushD=1;
          }
          //$LASTPOS=34001744;//kernel.Pad:1744
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=34001841;//kernel.Pad:1841
            _this.keyPushL=1;
          }
          //$LASTPOS=34001868;//kernel.Pad:1868
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=34001965;//kernel.Pad:1965
            _this.keyPushR=1;
          }
          //$LASTPOS=34001992;//kernel.Pad:1992
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=34002054;//kernel.Pad:2054
            _this.keyPush1=1;
          }
          //$LASTPOS=34002081;//kernel.Pad:2081
          _this.padKeySW=1;
          //$LASTPOS=34002108;//kernel.Pad:2108
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=34002173;//kernel.Pad:2173
    if (_this.keyPushL) {
      //$LASTPOS=34002187;//kernel.Pad:2187
      _this.keyCntL++;
    } else {
      //$LASTPOS=34002204;//kernel.Pad:2204
      _this.keyCntL=0;
    }
    //$LASTPOS=34002222;//kernel.Pad:2222
    if (_this.keyPushR) {
      //$LASTPOS=34002236;//kernel.Pad:2236
      _this.keyCntR++;
    } else {
      //$LASTPOS=34002253;//kernel.Pad:2253
      _this.keyCntR=0;
    }
    //$LASTPOS=34002271;//kernel.Pad:2271
    if (_this.keyPushU) {
      //$LASTPOS=34002285;//kernel.Pad:2285
      _this.keyCntU++;
    } else {
      //$LASTPOS=34002302;//kernel.Pad:2302
      _this.keyCntU=0;
    }
    //$LASTPOS=34002320;//kernel.Pad:2320
    if (_this.keyPushD) {
      //$LASTPOS=34002334;//kernel.Pad:2334
      _this.keyCntD++;
    } else {
      //$LASTPOS=34002351;//kernel.Pad:2351
      _this.keyCntD=0;
    }
    //$LASTPOS=34002369;//kernel.Pad:2369
    if (_this.keyPush1) {
      //$LASTPOS=34002383;//kernel.Pad:2383
      _this.keyCnt1++;
    } else {
      //$LASTPOS=34002400;//kernel.Pad:2400
      _this.keyCnt1=0;
    }
    //$LASTPOS=34002435;//kernel.Pad:2435
    if (_this.keyPushL) {
      //$LASTPOS=34002449;//kernel.Pad:2449
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=34002475;//kernel.Pad:2475
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=34002501;//kernel.Pad:2501
    if (_this.keyPushR) {
      //$LASTPOS=34002515;//kernel.Pad:2515
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=34002541;//kernel.Pad:2541
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=34002567;//kernel.Pad:2567
    if (_this.keyPushU) {
      //$LASTPOS=34002581;//kernel.Pad:2581
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=34002607;//kernel.Pad:2607
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=34002633;//kernel.Pad:2633
    if (_this.keyPushD) {
      //$LASTPOS=34002647;//kernel.Pad:2647
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=34002673;//kernel.Pad:2673
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=34002699;//kernel.Pad:2699
    if (_this.keyPush1) {
      //$LASTPOS=34002713;//kernel.Pad:2713
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=34002739;//kernel.Pad:2739
      _this.jujiKeyPush1.hide();
    }
    
    _thread.retVal=_this;return;
  },
  getPadUp :function _trc_func_34002772_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getPadUp :function _trc_func_34002772_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadDown :function _trc_func_34002808_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getPadDown :function _trc_func_34002808_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadLeft :function _trc_func_34002844_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getPadLeft :function _trc_func_34002844_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadRight :function _trc_func_34002880_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getPadRight :function _trc_func_34002880_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadButton :function _trc_func_34002916_15(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=34002940;//kernel.Pad:2940
    value;
    //$LASTPOS=34002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=34002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getPadButton :function _trc_func_34002916_16(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=34002940;//kernel.Pad:2940
    value;
    //$LASTPOS=34002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=34002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  getUp :function _trc_func_34003010_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getUp :function _trc_func_34003010_18(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getDown :function _trc_func_34003043_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getDown :function _trc_func_34003043_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getLeft :function _trc_func_34003076_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getLeft :function _trc_func_34003076_22(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getRight :function _trc_func_34003109_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getRight :function _trc_func_34003109_24(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getButton :function _trc_func_34003142_25(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=34003163;//kernel.Pad:3163
    value;
    //$LASTPOS=34003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=34003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getButton :function _trc_func_34003142_26(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=34003163;//kernel.Pad:3163
    value;
    //$LASTPOS=34003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=34003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRect :function _trc_func_34003243_27(mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
  },
  fiber$isOnRect :function _trc_func_34003243_28(_thread,mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRectWH :function _trc_func_34003357_29(mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
  },
  fiber$isOnRectWH :function _trc_func_34003357_30(_thread,mx,my,rx,ry,rw,rh) {
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
Tonyu.classes.kernel.Ball=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_35000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000474;//kernel.Ball:474
    Tonyu.globals.$mplayer.playBGM("se_bgm");
    //$LASTPOS=35000509;//kernel.Ball:509
    Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
    //$LASTPOS=35000530;//kernel.Ball:530
    _this.sx=110;
    //$LASTPOS=35000540;//kernel.Ball:540
    _this.sy=110;
    //$LASTPOS=35000550;//kernel.Ball:550
    _this.vx=0;
    //$LASTPOS=35000558;//kernel.Ball:558
    _this.vy=0;
    //$LASTPOS=35000566;//kernel.Ball:566
    _this.frameCnt=0;
    //$LASTPOS=35000580;//kernel.Ball:580
    _this.secnt=0;
    //$LASTPOS=35000591;//kernel.Ball:591
    while (1) {
      //$LASTPOS=35000620;//kernel.Ball:620
      _this.x+=_this.vx;
      //$LASTPOS=35000631;//kernel.Ball:631
      _this.y+=_this.vy;
      //$LASTPOS=35000642;//kernel.Ball:642
      if (_this.kabe(_this.x,_this.y)) {
        //$LASTPOS=35000688;//kernel.Ball:688
        Tonyu.globals.$mplayer.playPartSE(_this.secnt%2,"se_bound");
        //$LASTPOS=35000777;//kernel.Ball:777
        _this.secnt++;
        //$LASTPOS=35000810;//kernel.Ball:810
        if (! _this.kabe(_this.sx,_this.y)) {
          //$LASTPOS=35000829;//kernel.Ball:829
          _this.x=_this.sx;
          //$LASTPOS=35000834;//kernel.Ball:834
          _this.vx=- _this.vx;
          
        } else {
          //$LASTPOS=35000856;//kernel.Ball:856
          if (! _this.kabe(_this.x,_this.sy)) {
            //$LASTPOS=35000874;//kernel.Ball:874
            _this.y=_this.sy;
            //$LASTPOS=35000879;//kernel.Ball:879
            _this.vy=- _this.vy;
            
          } else {
            //$LASTPOS=35000902;//kernel.Ball:902
            _this.x=_this.sx;
            //$LASTPOS=35000907;//kernel.Ball:907
            _this.y=_this.sy;
            //$LASTPOS=35000913;//kernel.Ball:913
            _this.vx=- _this.vx;
            //$LASTPOS=35000920;//kernel.Ball:920
            _this.vy=- _this.vy;
            
          }
        }
        
      }
      //$LASTPOS=35000939;//kernel.Ball:939
      _this.spd=_this.dist(_this.vx,_this.vy);
      //$LASTPOS=35000955;//kernel.Ball:955
      if (_this.spd<0.01) {
        //$LASTPOS=35000970;//kernel.Ball:970
        _this.vx+=0.01;
        //$LASTPOS=35000979;//kernel.Ball:979
        _this.vy+=0.01;
        
      }
      //$LASTPOS=35001010;//kernel.Ball:1010
      _this.vx=_this.vx*0.99;
      //$LASTPOS=35001026;//kernel.Ball:1026
      _this.vy=_this.vy*0.99;
      //$LASTPOS=35001042;//kernel.Ball:1042
      if (_this.spd>30) {
        //$LASTPOS=35001093;//kernel.Ball:1093
        _this.vx=_this.vx*30/_this.spd;
        //$LASTPOS=35001115;//kernel.Ball:1115
        _this.vy=_this.vy*30/_this.spd;
        
      }
      //$LASTPOS=35001156;//kernel.Ball:1156
      _this.sx=_this.x;
      //$LASTPOS=35001161;//kernel.Ball:1161
      _this.sy=_this.y;
      //$LASTPOS=35001176;//kernel.Ball:1176
      _this.onUpdate();
      //$LASTPOS=35001222;//kernel.Ball:1222
      _this.update();
      //$LASTPOS=35001236;//kernel.Ball:1236
      _this.frameCnt++;
      
    }
  },
  fiber$main :function _trc_func_35000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=35000474;//kernel.Ball:474
    Tonyu.globals.$mplayer.playBGM("se_bgm");
    //$LASTPOS=35000509;//kernel.Ball:509
    Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
    //$LASTPOS=35000530;//kernel.Ball:530
    _this.sx=110;
    //$LASTPOS=35000540;//kernel.Ball:540
    _this.sy=110;
    //$LASTPOS=35000550;//kernel.Ball:550
    _this.vx=0;
    //$LASTPOS=35000558;//kernel.Ball:558
    _this.vy=0;
    //$LASTPOS=35000566;//kernel.Ball:566
    _this.frameCnt=0;
    //$LASTPOS=35000580;//kernel.Ball:580
    _this.secnt=0;
    
    _thread.enter(function _trc_func_35000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000591;//kernel.Ball:591
        case 1:
          if (!(1)) { __pc=3; break; }
          //$LASTPOS=35000620;//kernel.Ball:620
          _this.x+=_this.vx;
          //$LASTPOS=35000631;//kernel.Ball:631
          _this.y+=_this.vy;
          //$LASTPOS=35000642;//kernel.Ball:642
          if (_this.kabe(_this.x,_this.y)) {
            //$LASTPOS=35000688;//kernel.Ball:688
            Tonyu.globals.$mplayer.playPartSE(_this.secnt%2,"se_bound");
            //$LASTPOS=35000777;//kernel.Ball:777
            _this.secnt++;
            //$LASTPOS=35000810;//kernel.Ball:810
            if (! _this.kabe(_this.sx,_this.y)) {
              //$LASTPOS=35000829;//kernel.Ball:829
              _this.x=_this.sx;
              //$LASTPOS=35000834;//kernel.Ball:834
              _this.vx=- _this.vx;
              
            } else {
              //$LASTPOS=35000856;//kernel.Ball:856
              if (! _this.kabe(_this.x,_this.sy)) {
                //$LASTPOS=35000874;//kernel.Ball:874
                _this.y=_this.sy;
                //$LASTPOS=35000879;//kernel.Ball:879
                _this.vy=- _this.vy;
                
              } else {
                //$LASTPOS=35000902;//kernel.Ball:902
                _this.x=_this.sx;
                //$LASTPOS=35000907;//kernel.Ball:907
                _this.y=_this.sy;
                //$LASTPOS=35000913;//kernel.Ball:913
                _this.vx=- _this.vx;
                //$LASTPOS=35000920;//kernel.Ball:920
                _this.vy=- _this.vy;
                
              }
            }
            
          }
          //$LASTPOS=35000939;//kernel.Ball:939
          _this.spd=_this.dist(_this.vx,_this.vy);
          //$LASTPOS=35000955;//kernel.Ball:955
          if (_this.spd<0.01) {
            //$LASTPOS=35000970;//kernel.Ball:970
            _this.vx+=0.01;
            //$LASTPOS=35000979;//kernel.Ball:979
            _this.vy+=0.01;
            
          }
          //$LASTPOS=35001010;//kernel.Ball:1010
          _this.vx=_this.vx*0.99;
          //$LASTPOS=35001026;//kernel.Ball:1026
          _this.vy=_this.vy*0.99;
          //$LASTPOS=35001042;//kernel.Ball:1042
          if (_this.spd>30) {
            //$LASTPOS=35001093;//kernel.Ball:1093
            _this.vx=_this.vx*30/_this.spd;
            //$LASTPOS=35001115;//kernel.Ball:1115
            _this.vy=_this.vy*30/_this.spd;
            
          }
          //$LASTPOS=35001156;//kernel.Ball:1156
          _this.sx=_this.x;
          //$LASTPOS=35001161;//kernel.Ball:1161
          _this.sy=_this.y;
          //$LASTPOS=35001176;//kernel.Ball:1176
          _this.onUpdate();
          //$LASTPOS=35001222;//kernel.Ball:1222
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=35001236;//kernel.Ball:1236
          _this.frameCnt++;
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  kabe :function _trc_func_35000003_3(xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pa;
    
    //$LASTPOS=35000030;//kernel.Ball:30
    pa;
    //$LASTPOS=35000063;//kernel.Ball:63
    xx+=Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL;
    //$LASTPOS=35000110;//kernel.Ball:110
    yy+=Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW;
    //$LASTPOS=35000158;//kernel.Ball:158
    pa=Tonyu.globals.$map.getAt(xx%(Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL),yy%(Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW));
    return (pa<Tonyu.globals.$pat_table+9||pa>Tonyu.globals.$pat_table+14);
  },
  fiber$kabe :function _trc_func_35000003_4(_thread,xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pa;
    
    //$LASTPOS=35000030;//kernel.Ball:30
    pa;
    //$LASTPOS=35000063;//kernel.Ball:63
    xx+=Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL;
    //$LASTPOS=35000110;//kernel.Ball:110
    yy+=Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW;
    //$LASTPOS=35000158;//kernel.Ball:158
    pa=Tonyu.globals.$map.getAt(xx%(Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL),yy%(Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW));
    _thread.retVal=(pa<Tonyu.globals.$pat_table+9||pa>Tonyu.globals.$pat_table+14);return;
    
    
    _thread.retVal=_this;return;
  },
  onUpdate :function _trc_func_35000315_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000341;//kernel.Ball:341
    if (_this.x<Tonyu.globals.$pass.x-30) {
      //$LASTPOS=35000359;//kernel.Ball:359
      Tonyu.globals.$pass.enabled=1;
    }
    //$LASTPOS=35000417;//kernel.Ball:417
    if (_this.crashTo(Tonyu.globals.$pass)) {
      //$LASTPOS=35000439;//kernel.Ball:439
      _this.vx=4;
      //$LASTPOS=35000444;//kernel.Ball:444
      _this.x=Tonyu.globals.$pass.x+32;
      //$LASTPOS=35000457;//kernel.Ball:457
      Tonyu.globals.$pass.lap();
      
    }
  },
  crashTo :function _trc_func_35001372_6(pp,xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35001397;//kernel.Ball:1397
    if (! pp) {
      return 0;
    }
    //$LASTPOS=35001419;//kernel.Ball:1419
    if (! xx) {
      //$LASTPOS=35001428;//kernel.Ball:1428
      xx=0;
    }
    //$LASTPOS=35001440;//kernel.Ball:1440
    if (! yy) {
      //$LASTPOS=35001449;//kernel.Ball:1449
      yy=0;
    }
    //$LASTPOS=35001461;//kernel.Ball:1461
    if (_this.abs(pp.x-(_this.x+xx))*2<_this.getWidth()+pp.getWidth()) {
      return _this.abs(pp.y-(_this.y+yy))*2<_this.getHeight()+pp.getHeight();
      
    }
    return 0;
  },
  getWidth :function _trc_func_35001605_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getWidth :function _trc_func_35001605_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=32;return;
    
    
    _thread.retVal=_this;return;
  },
  getHeight :function _trc_func_35001637_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getHeight :function _trc_func_35001637_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=32;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Ball,{"fullName":"kernel.Ball","namespace":"kernel","shortName":"Ball","decls":{"methods":{"main":{"nowait":false},"kabe":{"nowait":false},"onUpdate":{"nowait":true},"crashTo":{"nowait":true},"getWidth":{"nowait":false},"getHeight":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Enemy=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_36000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_36000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Enemy,{"fullName":"kernel.Enemy","namespace":"kernel","shortName":"Enemy","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.IndexPage=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_37000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    var mapObj;
    var mx;
    var my;
    
    //$LASTPOS=37000002;//kernel.IndexPage:2
    Tonyu.globals.$MAP_ARY_WIDTH=3;
    //$LASTPOS=37000036;//kernel.IndexPage:36
    Tonyu.globals.$MAP_ARY_HEIGHT=3;
    //$LASTPOS=37000070;//kernel.IndexPage:70
    Tonyu.globals.$MAP_CHIP_COL=64;
    //$LASTPOS=37000098;//kernel.IndexPage:98
    Tonyu.globals.$MAP_CHIP_ROW=64;
    //$LASTPOS=37000126;//kernel.IndexPage:126
    Tonyu.globals.$MAP_CHIP_PAT_WIDTH=16;
    //$LASTPOS=37000171;//kernel.IndexPage:171
    Tonyu.globals.$MAP_CHIP_PAT_HEIGHT=16;
    //$LASTPOS=37000217;//kernel.IndexPage:217
    Tonyu.globals.$MAP_SCROLL_MX=- 1;
    //$LASTPOS=37000251;//kernel.IndexPage:251
    Tonyu.globals.$MAP_SCROLL_MY=- 1;
    //$LASTPOS=37000287;//kernel.IndexPage:287
    Tonyu.globals.$Screen.resize(560,384);
    //$LASTPOS=37000342;//kernel.IndexPage:342
    Tonyu.globals.$viewX=0;
    //$LASTPOS=37000354;//kernel.IndexPage:354
    Tonyu.globals.$viewY=0;
    //$LASTPOS=37000366;//kernel.IndexPage:366
    Tonyu.globals.$mapAry=[];
    //$LASTPOS=37000380;//kernel.IndexPage:380
    //$LASTPOS=37000385;//kernel.IndexPage:385
    j = 0;
    while(j<Tonyu.globals.$MAP_ARY_HEIGHT) {
      {
        //$LASTPOS=37000424;//kernel.IndexPage:424
        //$LASTPOS=37000429;//kernel.IndexPage:429
        i = 0;
        while(i<Tonyu.globals.$MAP_ARY_WIDTH) {
          {
            //$LASTPOS=37000471;//kernel.IndexPage:471
            mapObj = new Tonyu.classes.kernel.Map({chipWidth: Tonyu.globals.$MAP_CHIP_PAT_WIDTH,chipHeight: Tonyu.globals.$MAP_CHIP_PAT_HEIGHT});
            //$LASTPOS=37000565;//kernel.IndexPage:565
            mapObj.load("map.json");
            //$LASTPOS=37000598;//kernel.IndexPage:598
            mx = (Tonyu.globals.$MAP_CHIP_COL*Tonyu.globals.$MAP_CHIP_PAT_WIDTH)*(i+Tonyu.globals.$MAP_SCROLL_MX);
            //$LASTPOS=37000677;//kernel.IndexPage:677
            my = (Tonyu.globals.$MAP_CHIP_ROW*Tonyu.globals.$MAP_CHIP_PAT_HEIGHT)*(j+Tonyu.globals.$MAP_SCROLL_MY);
            //$LASTPOS=37000757;//kernel.IndexPage:757
            mapObj.scrollTo(- mx,- my);
            //$LASTPOS=37000792;//kernel.IndexPage:792
            mapObj.zOrder=200;
            //$LASTPOS=37000821;//kernel.IndexPage:821
            Tonyu.globals.$mapAry[i+j*Tonyu.globals.$MAP_ARY_WIDTH]=mapObj;
          }
          i++;
        }
      }
      j++;
    }
    //$LASTPOS=37000870;//kernel.IndexPage:870
    Tonyu.globals.$map=Tonyu.globals.$mapAry[0];
    //$LASTPOS=37000890;//kernel.IndexPage:890
    //$LASTPOS=37000895;//kernel.IndexPage:895
    i = 0;
    while(i<10) {
      //$LASTPOS=37000915;//kernel.IndexPage:915
      _this.update();
      i++;
    }
    //$LASTPOS=37000925;//kernel.IndexPage:925
    Tonyu.globals.$pat_table=Tonyu.globals.$pat_mapchip;
    //$LASTPOS=37000969;//kernel.IndexPage:969
    if (! Tonyu.globals.$mplayer) {
      //$LASTPOS=37000984;//kernel.IndexPage:984
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MusicPlayer;
    }
    //$LASTPOS=37001013;//kernel.IndexPage:1013
    Tonyu.globals.$player=new Tonyu.classes.kernel.Player({x: 79,y: 314,p: 5});
    //$LASTPOS=37001053;//kernel.IndexPage:1053
    Tonyu.globals.$ball=new Tonyu.classes.kernel.Ball({x: 112,y: 186,p: 12});
    //$LASTPOS=37001091;//kernel.IndexPage:1091
    Tonyu.globals.$racket=new Tonyu.classes.kernel.Racket({x: 113,y: 219,p: 17});
    //$LASTPOS=37001133;//kernel.IndexPage:1133
    Tonyu.globals.$tokuten=new Tonyu.classes.kernel.Tokuten({x: 314,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
    //$LASTPOS=37001200;//kernel.IndexPage:1200
    Tonyu.globals.$tokuten_1=new Tonyu.classes.kernel.Tokuten({x: 278,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 6});
    //$LASTPOS=37001268;//kernel.IndexPage:1268
    Tonyu.globals.$tokuten_2=new Tonyu.classes.kernel.Tokuten({x: 218,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
    //$LASTPOS=37001337;//kernel.IndexPage:1337
    Tonyu.globals.$tokuten.next=Tonyu.globals.$tokuten_1;
    //$LASTPOS=37001365;//kernel.IndexPage:1365
    Tonyu.globals.$tokuten_1.next=Tonyu.globals.$tokuten_2;
    //$LASTPOS=37001395;//kernel.IndexPage:1395
    Tonyu.globals.$pass=new Tonyu.classes.kernel.Pass({x: - 39,y: 55,p: Tonyu.globals.$pat_table+20});
    //$LASTPOS=37001443;//kernel.IndexPage:1443
    Tonyu.globals.$lap1=new Tonyu.classes.kernel.Lap({x: 219,y: 74,text: "1st:",size: 15,fillStyle: "white"});
    //$LASTPOS=37001514;//kernel.IndexPage:1514
    Tonyu.globals.$lap2=new Tonyu.classes.kernel.Lap({x: 215,y: 97,text: "2nd:",size: 15,fillStyle: "white"});
    //$LASTPOS=37001585;//kernel.IndexPage:1585
    Tonyu.globals.$lap3=new Tonyu.classes.kernel.Lap({x: 200,y: 119,text: "Final :",size: 15,fillStyle: "white"});
  },
  fiber$main :function _trc_func_37000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var j;
    var i;
    var mapObj;
    var mx;
    var my;
    
    //$LASTPOS=37000002;//kernel.IndexPage:2
    Tonyu.globals.$MAP_ARY_WIDTH=3;
    //$LASTPOS=37000036;//kernel.IndexPage:36
    Tonyu.globals.$MAP_ARY_HEIGHT=3;
    //$LASTPOS=37000070;//kernel.IndexPage:70
    Tonyu.globals.$MAP_CHIP_COL=64;
    //$LASTPOS=37000098;//kernel.IndexPage:98
    Tonyu.globals.$MAP_CHIP_ROW=64;
    //$LASTPOS=37000126;//kernel.IndexPage:126
    Tonyu.globals.$MAP_CHIP_PAT_WIDTH=16;
    //$LASTPOS=37000171;//kernel.IndexPage:171
    Tonyu.globals.$MAP_CHIP_PAT_HEIGHT=16;
    //$LASTPOS=37000217;//kernel.IndexPage:217
    Tonyu.globals.$MAP_SCROLL_MX=- 1;
    //$LASTPOS=37000251;//kernel.IndexPage:251
    Tonyu.globals.$MAP_SCROLL_MY=- 1;
    //$LASTPOS=37000287;//kernel.IndexPage:287
    Tonyu.globals.$Screen.resize(560,384);
    //$LASTPOS=37000342;//kernel.IndexPage:342
    Tonyu.globals.$viewX=0;
    //$LASTPOS=37000354;//kernel.IndexPage:354
    Tonyu.globals.$viewY=0;
    //$LASTPOS=37000366;//kernel.IndexPage:366
    Tonyu.globals.$mapAry=[];
    //$LASTPOS=37000380;//kernel.IndexPage:380
    //$LASTPOS=37000385;//kernel.IndexPage:385
    j = 0;
    while(j<Tonyu.globals.$MAP_ARY_HEIGHT) {
      {
        //$LASTPOS=37000424;//kernel.IndexPage:424
        //$LASTPOS=37000429;//kernel.IndexPage:429
        i = 0;
        while(i<Tonyu.globals.$MAP_ARY_WIDTH) {
          {
            //$LASTPOS=37000471;//kernel.IndexPage:471
            mapObj = new Tonyu.classes.kernel.Map({chipWidth: Tonyu.globals.$MAP_CHIP_PAT_WIDTH,chipHeight: Tonyu.globals.$MAP_CHIP_PAT_HEIGHT});
            //$LASTPOS=37000565;//kernel.IndexPage:565
            mapObj.load("map.json");
            //$LASTPOS=37000598;//kernel.IndexPage:598
            mx = (Tonyu.globals.$MAP_CHIP_COL*Tonyu.globals.$MAP_CHIP_PAT_WIDTH)*(i+Tonyu.globals.$MAP_SCROLL_MX);
            //$LASTPOS=37000677;//kernel.IndexPage:677
            my = (Tonyu.globals.$MAP_CHIP_ROW*Tonyu.globals.$MAP_CHIP_PAT_HEIGHT)*(j+Tonyu.globals.$MAP_SCROLL_MY);
            //$LASTPOS=37000757;//kernel.IndexPage:757
            mapObj.scrollTo(- mx,- my);
            //$LASTPOS=37000792;//kernel.IndexPage:792
            mapObj.zOrder=200;
            //$LASTPOS=37000821;//kernel.IndexPage:821
            Tonyu.globals.$mapAry[i+j*Tonyu.globals.$MAP_ARY_WIDTH]=mapObj;
          }
          i++;
        }
      }
      j++;
    }
    //$LASTPOS=37000870;//kernel.IndexPage:870
    Tonyu.globals.$map=Tonyu.globals.$mapAry[0];
    
    _thread.enter(function _trc_func_37000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000890;//kernel.IndexPage:890
          //$LASTPOS=37000895;//kernel.IndexPage:895
          i = 0;;
        case 1:
          if (!(i<10)) { __pc=3; break; }
          //$LASTPOS=37000915;//kernel.IndexPage:915
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          i++;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=37000925;//kernel.IndexPage:925
          Tonyu.globals.$pat_table=Tonyu.globals.$pat_mapchip;
          //$LASTPOS=37000969;//kernel.IndexPage:969
          if (! Tonyu.globals.$mplayer) {
            //$LASTPOS=37000984;//kernel.IndexPage:984
            Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MusicPlayer;
          }
          //$LASTPOS=37001013;//kernel.IndexPage:1013
          Tonyu.globals.$player=new Tonyu.classes.kernel.Player({x: 79,y: 314,p: 5});
          //$LASTPOS=37001053;//kernel.IndexPage:1053
          Tonyu.globals.$ball=new Tonyu.classes.kernel.Ball({x: 112,y: 186,p: 12});
          //$LASTPOS=37001091;//kernel.IndexPage:1091
          Tonyu.globals.$racket=new Tonyu.classes.kernel.Racket({x: 113,y: 219,p: 17});
          //$LASTPOS=37001133;//kernel.IndexPage:1133
          Tonyu.globals.$tokuten=new Tonyu.classes.kernel.Tokuten({x: 314,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
          //$LASTPOS=37001200;//kernel.IndexPage:1200
          Tonyu.globals.$tokuten_1=new Tonyu.classes.kernel.Tokuten({x: 278,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 6});
          //$LASTPOS=37001268;//kernel.IndexPage:1268
          Tonyu.globals.$tokuten_2=new Tonyu.classes.kernel.Tokuten({x: 218,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
          //$LASTPOS=37001337;//kernel.IndexPage:1337
          Tonyu.globals.$tokuten.next=Tonyu.globals.$tokuten_1;
          //$LASTPOS=37001365;//kernel.IndexPage:1365
          Tonyu.globals.$tokuten_1.next=Tonyu.globals.$tokuten_2;
          //$LASTPOS=37001395;//kernel.IndexPage:1395
          Tonyu.globals.$pass=new Tonyu.classes.kernel.Pass({x: - 39,y: 55,p: Tonyu.globals.$pat_table+20});
          //$LASTPOS=37001443;//kernel.IndexPage:1443
          Tonyu.globals.$lap1=new Tonyu.classes.kernel.Lap({x: 219,y: 74,text: "1st:",size: 15,fillStyle: "white"});
          //$LASTPOS=37001514;//kernel.IndexPage:1514
          Tonyu.globals.$lap2=new Tonyu.classes.kernel.Lap({x: 215,y: 97,text: "2nd:",size: 15,fillStyle: "white"});
          //$LASTPOS=37001585;//kernel.IndexPage:1585
          Tonyu.globals.$lap3=new Tonyu.classes.kernel.Lap({x: 200,y: 119,text: "Final :",size: 15,fillStyle: "white"});
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.IndexPage,{"fullName":"kernel.IndexPage","namespace":"kernel","shortName":"IndexPage","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Lap=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_38000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000001;//kernel.Lap:1
    _this.align="left";
  },
  fiber$main :function _trc_func_38000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=38000001;//kernel.Lap:1
    _this.align="left";
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Lap,{"fullName":"kernel.Lap","namespace":"kernel","shortName":"Lap","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_39000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000002;//kernel.Main:2
    Tonyu.globals.$mplayer=null;
    //$LASTPOS=39000019;//kernel.Main:19
    Tonyu.globals.$Boot.setFrameRate(60,5);
    //$LASTPOS=39000046;//kernel.Main:46
    new Tonyu.classes.kernel.PageLoader;
  },
  fiber$main :function _trc_func_39000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=39000002;//kernel.Main:2
    Tonyu.globals.$mplayer=null;
    //$LASTPOS=39000019;//kernel.Main:19
    Tonyu.globals.$Boot.setFrameRate(60,5);
    //$LASTPOS=39000046;//kernel.Main:46
    new Tonyu.classes.kernel.PageLoader;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main,{"fullName":"kernel.Main","namespace":"kernel","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_40000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=40000029;//kernel.MusicPlayer:29
    _this.SOUND_OBJ_ARY_SIZE=20;
    //$LASTPOS=40000068;//kernel.MusicPlayer:68
    _this.SOUND_PART_OBJ_ARY_SIZE=3;
    //$LASTPOS=40000126;//kernel.MusicPlayer:126
    _this.soundObjAryCnt=0;
    //$LASTPOS=40000146;//kernel.MusicPlayer:146
    _this.soundObjAry=[];
    //$LASTPOS=40000164;//kernel.MusicPlayer:164
    //$LASTPOS=40000169;//kernel.MusicPlayer:169
    i = 0;
    while(i<_this.SOUND_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=40000211;//kernel.MusicPlayer:211
        _this.soundObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=40000255;//kernel.MusicPlayer:255
    _this.soundPartObjAry=[];
    //$LASTPOS=40000277;//kernel.MusicPlayer:277
    //$LASTPOS=40000282;//kernel.MusicPlayer:282
    i = 0;
    while(i<_this.SOUND_PART_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=40000329;//kernel.MusicPlayer:329
        _this.soundPartObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=40000377;//kernel.MusicPlayer:377
    _this.bgmObj=null;
    //$LASTPOS=40000404;//kernel.MusicPlayer:404
    while (true) {
      //$LASTPOS=40000423;//kernel.MusicPlayer:423
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_40000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=40000029;//kernel.MusicPlayer:29
    _this.SOUND_OBJ_ARY_SIZE=20;
    //$LASTPOS=40000068;//kernel.MusicPlayer:68
    _this.SOUND_PART_OBJ_ARY_SIZE=3;
    //$LASTPOS=40000126;//kernel.MusicPlayer:126
    _this.soundObjAryCnt=0;
    //$LASTPOS=40000146;//kernel.MusicPlayer:146
    _this.soundObjAry=[];
    //$LASTPOS=40000164;//kernel.MusicPlayer:164
    //$LASTPOS=40000169;//kernel.MusicPlayer:169
    i = 0;
    while(i<_this.SOUND_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=40000211;//kernel.MusicPlayer:211
        _this.soundObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=40000255;//kernel.MusicPlayer:255
    _this.soundPartObjAry=[];
    //$LASTPOS=40000277;//kernel.MusicPlayer:277
    //$LASTPOS=40000282;//kernel.MusicPlayer:282
    i = 0;
    while(i<_this.SOUND_PART_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=40000329;//kernel.MusicPlayer:329
        _this.soundPartObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=40000377;//kernel.MusicPlayer:377
    _this.bgmObj=null;
    
    _thread.enter(function _trc_func_40000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=40000404;//kernel.MusicPlayer:404
        case 1:
          //$LASTPOS=40000423;//kernel.MusicPlayer:423
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
  playBGM :function _trc_func_40000450_3(bgmName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000481;//kernel.MusicPlayer:481
    _this.stopBGM();
    //$LASTPOS=40000496;//kernel.MusicPlayer:496
    _this.bgmObj=new Tonyu.classes.kernel.MusicPlayerOneMusic;
    //$LASTPOS=40000534;//kernel.MusicPlayer:534
    _this.bgmObj.playBGM(bgmName);
  },
  stopBGM :function _trc_func_40000570_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000594;//kernel.MusicPlayer:594
    if (_this.bgmObj) {
      //$LASTPOS=40000616;//kernel.MusicPlayer:616
      _this.bgmObj.die();
      //$LASTPOS=40000638;//kernel.MusicPlayer:638
      _this.bgmObj=null;
      
    }
  },
  playSE :function _trc_func_40000674_5(seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000713;//kernel.MusicPlayer:713
    if (priority==null) {
      //$LASTPOS=40000735;//kernel.MusicPlayer:735
      priority=0;
    }
    return _this.playSEPush(seName,priority);
  },
  playPartSE :function _trc_func_40000809_6(sePart,seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000860;//kernel.MusicPlayer:860
    if (priority==null) {
      //$LASTPOS=40000882;//kernel.MusicPlayer:882
      priority=0;
    }
    return _this.playSEPartPush(sePart,seName,priority);
  },
  playSEPush :function _trc_func_40000978_7(seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var retryCnt;
    var seObj;
    var i;
    
    //$LASTPOS=40001046;//kernel.MusicPlayer:1046
    retryCnt = 0;seObj;
    //$LASTPOS=40001075;//kernel.MusicPlayer:1075
    while (true) {
      //$LASTPOS=40001115;//kernel.MusicPlayer:1115
      seObj=_this.soundObjAry[(_this.soundObjAryCnt+retryCnt)%_this.SOUND_OBJ_ARY_SIZE];
      //$LASTPOS=40001194;//kernel.MusicPlayer:1194
      if (seObj.isSoundPlaying()) {
        //$LASTPOS=40001250;//kernel.MusicPlayer:1250
        if (retryCnt<_this.SOUND_OBJ_ARY_SIZE) {
          //$LASTPOS=40001319;//kernel.MusicPlayer:1319
          retryCnt++;
          
        } else {
          //$LASTPOS=40001389;//kernel.MusicPlayer:1389
          //$LASTPOS=40001394;//kernel.MusicPlayer:1394
          i = 0;
          while(i<=_this.SOUND_OBJ_ARY_SIZE) {
            {
              //$LASTPOS=40001471;//kernel.MusicPlayer:1471
              if (i<_this.SOUND_OBJ_ARY_SIZE) {
                //$LASTPOS=40001525;//kernel.MusicPlayer:1525
                seObj=_this.soundObjAry[(_this.soundObjAryCnt+i)%_this.SOUND_OBJ_ARY_SIZE];
                //$LASTPOS=40001613;//kernel.MusicPlayer:1613
                if (priority>=seObj.getPriority()) {
                  break;
                  
                  
                }
                
              } else {
                //$LASTPOS=40001766;//kernel.MusicPlayer:1766
                seObj=null;
                
              }
            }
            i++;
          }
          break;
          
          
        }
        
      } else {
        break;
        
        
      }
      
    }
    //$LASTPOS=40001959;//kernel.MusicPlayer:1959
    if (seObj!=null) {
      //$LASTPOS=40001988;//kernel.MusicPlayer:1988
      seObj.playSound(seName,priority);
      //$LASTPOS=40002040;//kernel.MusicPlayer:2040
      _this.soundObjAryCnt++;
      //$LASTPOS=40002067;//kernel.MusicPlayer:2067
      if (_this.soundObjAryCnt>=_this.soundObjArySize) {
        //$LASTPOS=40002106;//kernel.MusicPlayer:2106
        _this.soundObjAryCnt=0;
      }
      return seObj;
      
    }
  },
  playSEPartPush :function _trc_func_40002186_8(sePart,seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var seObj;
    
    //$LASTPOS=40002266;//kernel.MusicPlayer:2266
    seObj;
    //$LASTPOS=40002286;//kernel.MusicPlayer:2286
    seObj=_this.soundPartObjAry[sePart];
    //$LASTPOS=40002323;//kernel.MusicPlayer:2323
    if (seObj.isSoundPlaying()) {
      //$LASTPOS=40002375;//kernel.MusicPlayer:2375
      if (priority<seObj.getPriority()) {
        //$LASTPOS=40002444;//kernel.MusicPlayer:2444
        seObj=null;
        
      }
      
    }
    //$LASTPOS=40002502;//kernel.MusicPlayer:2502
    if (seObj!=null) {
      //$LASTPOS=40002531;//kernel.MusicPlayer:2531
      seObj.playSound(seName,priority);
      return seObj;
      
    } else {
      return null;
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MusicPlayer,{"fullName":"kernel.MusicPlayer","namespace":"kernel","shortName":"MusicPlayer","decls":{"methods":{"main":{"nowait":false},"playBGM":{"nowait":true},"stopBGM":{"nowait":true},"playSE":{"nowait":true},"playPartSE":{"nowait":true},"playSEPush":{"nowait":true},"playSEPartPush":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayerOneBase=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_41000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41000026;//kernel.MusicPlayerOneBase:26
    _this.soundName="";
    //$LASTPOS=41000042;//kernel.MusicPlayerOneBase:42
    _this.soundPriority=0;
    //$LASTPOS=41000061;//kernel.MusicPlayerOneBase:61
    _this.pushSound=0;
    //$LASTPOS=41000077;//kernel.MusicPlayerOneBase:77
    _this.stopTime=0;
    //$LASTPOS=41000091;//kernel.MusicPlayerOneBase:91
    _this.playingSound=0;
    //$LASTPOS=41000109;//kernel.MusicPlayerOneBase:109
    _this.cnt=0;
  },
  fiber$main :function _trc_func_41000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=41000026;//kernel.MusicPlayerOneBase:26
    _this.soundName="";
    //$LASTPOS=41000042;//kernel.MusicPlayerOneBase:42
    _this.soundPriority=0;
    //$LASTPOS=41000061;//kernel.MusicPlayerOneBase:61
    _this.pushSound=0;
    //$LASTPOS=41000077;//kernel.MusicPlayerOneBase:77
    _this.stopTime=0;
    //$LASTPOS=41000091;//kernel.MusicPlayerOneBase:91
    _this.playingSound=0;
    //$LASTPOS=41000109;//kernel.MusicPlayerOneBase:109
    _this.cnt=0;
    
    _thread.retVal=_this;return;
  },
  soundRun :function _trc_func_41000117_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41000135;//kernel.MusicPlayerOneBase:135
    while (true) {
      //$LASTPOS=41000185;//kernel.MusicPlayerOneBase:185
      if (_this.pushSound==1) {
        //$LASTPOS=41000219;//kernel.MusicPlayerOneBase:219
        _this.pushSound=0;
        //$LASTPOS=41000246;//kernel.MusicPlayerOneBase:246
        _this.onPlay(_this.soundName);
        //$LASTPOS=41000277;//kernel.MusicPlayerOneBase:277
        _this.soundName="";
        //$LASTPOS=41000318;//kernel.MusicPlayerOneBase:318
        while (true) {
          //$LASTPOS=41000349;//kernel.MusicPlayerOneBase:349
          _this.update();
          //$LASTPOS=41000375;//kernel.MusicPlayerOneBase:375
          _this.stopTime--;
          //$LASTPOS=41000404;//kernel.MusicPlayerOneBase:404
          if (_this.stopTime<=0) {
            //$LASTPOS=41000467;//kernel.MusicPlayerOneBase:467
            _this.play().stop();
            break;
            
            
          }
          
        }
        //$LASTPOS=41000553;//kernel.MusicPlayerOneBase:553
        _this.stopTime=0;
        
      } else {
        //$LASTPOS=41000596;//kernel.MusicPlayerOneBase:596
        _this.playingSound=0;
        //$LASTPOS=41000626;//kernel.MusicPlayerOneBase:626
        _this.update();
        
      }
      
    }
  },
  fiber$soundRun :function _trc_func_41000117_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_41000117_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=41000135;//kernel.MusicPlayerOneBase:135
        case 1:
          //$LASTPOS=41000185;//kernel.MusicPlayerOneBase:185
          if (!(_this.pushSound==1)) { __pc=6; break; }
          //$LASTPOS=41000219;//kernel.MusicPlayerOneBase:219
          _this.pushSound=0;
          //$LASTPOS=41000246;//kernel.MusicPlayerOneBase:246
          _this.onPlay(_this.soundName);
          //$LASTPOS=41000277;//kernel.MusicPlayerOneBase:277
          _this.soundName="";
          //$LASTPOS=41000318;//kernel.MusicPlayerOneBase:318
        case 2:
          //$LASTPOS=41000349;//kernel.MusicPlayerOneBase:349
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=41000375;//kernel.MusicPlayerOneBase:375
          _this.stopTime--;
          //$LASTPOS=41000404;//kernel.MusicPlayerOneBase:404
          if (!(_this.stopTime<=0)) { __pc=4; break; }
          //$LASTPOS=41000467;//kernel.MusicPlayerOneBase:467
          _this.play().stop();
          __pc=5; break;
          
        case 4:
          
          __pc=2;break;
        case 5:
          
          //$LASTPOS=41000553;//kernel.MusicPlayerOneBase:553
          _this.stopTime=0;
          __pc=8;break;
        case 6:
          //$LASTPOS=41000596;//kernel.MusicPlayerOneBase:596
          _this.playingSound=0;
          //$LASTPOS=41000626;//kernel.MusicPlayerOneBase:626
          _this.fiber$update(_thread);
          __pc=7;return;
        case 7:
          
        case 8:
          
          __pc=1;break;
        case 9:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onPlay :function _trc_func_41000675_5(soundName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  stop :function _trc_func_41000720_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41000741;//kernel.MusicPlayerOneBase:741
    _this.stopTime=0;
  },
  isSoundPlaying :function _trc_func_41000776_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.playingSound;
  },
  getPriority :function _trc_func_41000847_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.soundPriority;
  },
  playSound :function _trc_func_41000912_9(soundName,soundPriority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41001071;//kernel.MusicPlayerOneBase:1071
    _this.soundName=soundName;
    //$LASTPOS=41001103;//kernel.MusicPlayerOneBase:1103
    _this.soundPriority=soundPriority;
    //$LASTPOS=41001143;//kernel.MusicPlayerOneBase:1143
    _this.pushSound=1;
    //$LASTPOS=41001162;//kernel.MusicPlayerOneBase:1162
    _this.playingSound=1;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MusicPlayerOneBase,{"fullName":"kernel.MusicPlayerOneBase","namespace":"kernel","shortName":"MusicPlayerOneBase","decls":{"methods":{"main":{"nowait":false},"soundRun":{"nowait":false},"onPlay":{"nowait":true},"stop":{"nowait":true},"isSoundPlaying":{"nowait":true},"getPriority":{"nowait":true},"playSound":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayerOneMusic=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_42000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=42000094;//kernel.MusicPlayerOneMusic:94
    while (true) {
      //$LASTPOS=42000113;//kernel.MusicPlayerOneMusic:113
      if (_this.soundName=="se_bgm") {
        //$LASTPOS=42000150;//kernel.MusicPlayerOneMusic:150
        _this.play("o5 l32"+"v15 crcr<cr>cr arb-rrrrr crcr<cr>cr arb-rrrrr"+"v10 [crcr<cr>cr arb-rrrrr]2"+"v8  [crcr<cr>cr arb-rrrrr]1","o3 l32"+"[r]32"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]1","o2 l32"+"[r]32"+"l16 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1","o4 l32"+"[r]32"+"v14 r4r4r4  l16ge8f2r16","o5 l32"+"[r]32"+"v14 r4r4r4  l16c>a8b-2r16");
        //$LASTPOS=42000750;//kernel.MusicPlayerOneMusic:750
        while (true) {
          //$LASTPOS=42000777;//kernel.MusicPlayerOneMusic:777
          _this.play("o5 l32"+"v8  [crcr<cr>cr arb-rrrrr]1"+"[crcr<cr>cr arb-rrrrr]14"+"[grfrerdr]6 < [cr>b-rargr<]2 > [b-rargrfr]8"+"> [grfrerdr]8  [frerdrcr]8"+"v10   [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrrr  b-rrr rrrr rrrr rrrr ]1"+"v10<  [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrb-r rrrr  rrrr rrrr rrrr]1"+"v8  [crcr<cr>cr arb-rrrrr]1","o3 l32"+"[>[cr]4<<cr>>[cr]3<]29"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]8"+"[>[cr]4<<cr>>[cr]3<]1","o2 l16"+"[>b-<cfab-agc]15"+"l8 c2c4c4f2 c4c4>b-1< l16 [gcde gfed]2"+"l16 [gcde gfed]4 [cdefgfed]4"+"v13 l16 [c8.crrrr]2 [gab-cgfed]2"+"l16 [c8.crrrr]2 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1","o4 l16"+"r4r4r4 r4r4 l16ge8f2"+"> r4r4r4 r4r4r16 l16ge8f2"+"v12  r4r4r4 r4r4r16 l16ge8f2"+"r4r4r4 r4r4r16 >g<cef"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8   v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8 v3l64[f]8 v2l64[f]8 v2l64[f]8 v1l64[f]8 l8rrrr l8 rr >> v12 l16g<cefl8"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[d]8 v8l64[d]8 > v10l64[b]8 v8l64[b]8 < v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 v2l64[c]8 v2l64[c]8 v1l64[c]8 l8rrrr l8 rr> v12 l16dc>bal8 "+"<< l16 [d8.d rrrr]2 drdrd>b8.<crrr rrrr"+"< l16 [d8.d rrrr]2 drdrd>b8<crrrr gerf2","o4 l16"+"<r4r4r4 r4r4 l16c>a8b-2"+"r4r4r4 r4r4r16 l16c>a8b-2"+"v12 < r4r4r4 r4r4r16 l16c>a8b-2"+"r4r4r4 r4r4r16 cfab-"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8  <  v10l64[c]8 v8l64[c]8 > v10l64[a]8 v8l64[a]8  v10l64[b-]8 v8l64[b-]8 v6l64[b-]8 v4l64[b-]8 v3l64[b-]8 v2l64[b-]8 v2l64[b-]8 v1l64[b-]8 l8rrrr l8 rr> v12 l16cfab-l8"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8     v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8  v10l64[f]8  v8l64[f]8  v6l64[f]8  v4l64[f]8  v3l64[f]8  v2l64[f]8  v2l64[f]8  v1l64[f]8  l8rrrr l8 rr> v12 l16gfedl8 "+"< l16 [g8.g rrrr]2 grgrge8.frrr rrrr"+"< l16 [g8.g rrrr]2 grgrge8frrrr <c>arb-2r16");
          
        }
        
      }
      //$LASTPOS=42003587;//kernel.MusicPlayerOneMusic:3587
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_42000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_42000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=42000094;//kernel.MusicPlayerOneMusic:94
        case 1:
          //$LASTPOS=42000113;//kernel.MusicPlayerOneMusic:113
          if (!(_this.soundName=="se_bgm")) { __pc=6; break; }
          //$LASTPOS=42000150;//kernel.MusicPlayerOneMusic:150
          _this.fiber$play(_thread, "o5 l32"+"v15 crcr<cr>cr arb-rrrrr crcr<cr>cr arb-rrrrr"+"v10 [crcr<cr>cr arb-rrrrr]2"+"v8  [crcr<cr>cr arb-rrrrr]1", "o3 l32"+"[r]32"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]1", "o2 l32"+"[r]32"+"l16 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1", "o4 l32"+"[r]32"+"v14 r4r4r4  l16ge8f2r16", "o5 l32"+"[r]32"+"v14 r4r4r4  l16c>a8b-2r16");
          __pc=2;return;
        case 2:
          
          //$LASTPOS=42000750;//kernel.MusicPlayerOneMusic:750
        case 3:
          //$LASTPOS=42000777;//kernel.MusicPlayerOneMusic:777
          _this.fiber$play(_thread, "o5 l32"+"v8  [crcr<cr>cr arb-rrrrr]1"+"[crcr<cr>cr arb-rrrrr]14"+"[grfrerdr]6 < [cr>b-rargr<]2 > [b-rargrfr]8"+"> [grfrerdr]8  [frerdrcr]8"+"v10   [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrrr  b-rrr rrrr rrrr rrrr ]1"+"v10<  [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrb-r rrrr  rrrr rrrr rrrr]1"+"v8  [crcr<cr>cr arb-rrrrr]1", "o3 l32"+"[>[cr]4<<cr>>[cr]3<]29"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]8"+"[>[cr]4<<cr>>[cr]3<]1", "o2 l16"+"[>b-<cfab-agc]15"+"l8 c2c4c4f2 c4c4>b-1< l16 [gcde gfed]2"+"l16 [gcde gfed]4 [cdefgfed]4"+"v13 l16 [c8.crrrr]2 [gab-cgfed]2"+"l16 [c8.crrrr]2 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1", "o4 l16"+"r4r4r4 r4r4 l16ge8f2"+"> r4r4r4 r4r4r16 l16ge8f2"+"v12  r4r4r4 r4r4r16 l16ge8f2"+"r4r4r4 r4r4r16 >g<cef"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8   v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8 v3l64[f]8 v2l64[f]8 v2l64[f]8 v1l64[f]8 l8rrrr l8 rr >> v12 l16g<cefl8"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[d]8 v8l64[d]8 > v10l64[b]8 v8l64[b]8 < v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 v2l64[c]8 v2l64[c]8 v1l64[c]8 l8rrrr l8 rr> v12 l16dc>bal8 "+"<< l16 [d8.d rrrr]2 drdrd>b8.<crrr rrrr"+"< l16 [d8.d rrrr]2 drdrd>b8<crrrr gerf2", "o4 l16"+"<r4r4r4 r4r4 l16c>a8b-2"+"r4r4r4 r4r4r16 l16c>a8b-2"+"v12 < r4r4r4 r4r4r16 l16c>a8b-2"+"r4r4r4 r4r4r16 cfab-"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8  <  v10l64[c]8 v8l64[c]8 > v10l64[a]8 v8l64[a]8  v10l64[b-]8 v8l64[b-]8 v6l64[b-]8 v4l64[b-]8 v3l64[b-]8 v2l64[b-]8 v2l64[b-]8 v1l64[b-]8 l8rrrr l8 rr> v12 l16cfab-l8"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8     v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8  v10l64[f]8  v8l64[f]8  v6l64[f]8  v4l64[f]8  v3l64[f]8  v2l64[f]8  v2l64[f]8  v1l64[f]8  l8rrrr l8 rr> v12 l16gfedl8 "+"< l16 [g8.g rrrr]2 grgrge8.frrr rrrr"+"< l16 [g8.g rrrr]2 grgrge8frrrr <c>arb-2r16");
          __pc=4;return;
        case 4:
          
          __pc=3;break;
        case 5:
          
        case 6:
          
          //$LASTPOS=42003587;//kernel.MusicPlayerOneMusic:3587
          _this.fiber$update(_thread);
          __pc=7;return;
        case 7:
          
          __pc=1;break;
        case 8:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playBGM :function _trc_func_42000029_3(soundName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=42000062;//kernel.MusicPlayerOneMusic:62
    _this.soundName=soundName;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MusicPlayerOneMusic,{"fullName":"kernel.MusicPlayerOneMusic","namespace":"kernel","shortName":"MusicPlayerOneMusic","decls":{"methods":{"main":{"nowait":false},"playBGM":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayerOneSound=Tonyu.klass(Tonyu.classes.kernel.MusicPlayerOneBase,[],{
  main :function _trc_func_43000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=43000056;//kernel.MusicPlayerOneSound:56
    _this.soundRun();
  },
  fiber$main :function _trc_func_43000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_43000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=43000056;//kernel.MusicPlayerOneSound:56
          _this.fiber$soundRun(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onPlay :function _trc_func_43000070_3(soundName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=43000107;//kernel.MusicPlayerOneSound:107
    if (soundName=="se_bound") {
      //$LASTPOS=43000146;//kernel.MusicPlayerOneSound:146
      _this.play("t500 v10 l64 o6 d>bgec>afdc t120l1rrrr");
      //$LASTPOS=43000252;//kernel.MusicPlayerOneSound:252
      _this.stopTime=5*2;
      
    } else {
      //$LASTPOS=43000283;//kernel.MusicPlayerOneSound:283
      if (soundName=="se_shot") {
        //$LASTPOS=43000321;//kernel.MusicPlayerOneSound:321
        _this.play(" l32 v10 o3c t120l1rrrr"," l32 v15 r48 o2c t120l1rrrr");
        //$LASTPOS=43000410;//kernel.MusicPlayerOneSound:410
        _this.stopTime=10*2;
        
      } else {
        //$LASTPOS=43000442;//kernel.MusicPlayerOneSound:442
        if (soundName=="se_jingle") {
          //$LASTPOS=43000482;//kernel.MusicPlayerOneSound:482
          _this.play("v15 l32 q2 o5 cdeg>drerg1 t120l1rrrr","v15 l32 q2 o4 gab<darbr<d1 t120l1rrrr");
          //$LASTPOS=43000594;//kernel.MusicPlayerOneSound:594
          _this.stopTime=45*2;
          
        }
      }
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MusicPlayerOneSound,{"fullName":"kernel.MusicPlayerOneSound","namespace":"kernel","shortName":"MusicPlayerOneSound","decls":{"methods":{"main":{"nowait":false},"onPlay":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PageLoader=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_44000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=44000001;//kernel.PageLoader:1
    new Tonyu.classes.kernel.IndexPage;
  },
  fiber$main :function _trc_func_44000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=44000001;//kernel.PageLoader:1
    new Tonyu.classes.kernel.IndexPage;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PageLoader,{"fullName":"kernel.PageLoader","namespace":"kernel","shortName":"PageLoader","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Pass=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_45000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=45000383;//kernel.Pass:383
    _this.laps=0;
    //$LASTPOS=45000390;//kernel.Pass:390
    _this.time=0;
    //$LASTPOS=45000398;//kernel.Pass:398
    while (_this.laps<3) {
      //$LASTPOS=45000419;//kernel.Pass:419
      _this.updateEx(60);
      //$LASTPOS=45000437;//kernel.Pass:437
      if (_this.laps<3) {
        //$LASTPOS=45000459;//kernel.Pass:459
        Tonyu.globals.$tokuten.incValue();
        //$LASTPOS=45000488;//kernel.Pass:488
        _this.time+=1;
        
      }
      
    }
    //$LASTPOS=45000505;//kernel.Pass:505
    Tonyu.globals.$mplayer.stopBGM();
    //$LASTPOS=45000525;//kernel.Pass:525
    Tonyu.globals.$ball.die();
  },
  fiber$main :function _trc_func_45000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=45000383;//kernel.Pass:383
    _this.laps=0;
    //$LASTPOS=45000390;//kernel.Pass:390
    _this.time=0;
    
    _thread.enter(function _trc_func_45000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=45000398;//kernel.Pass:398
        case 1:
          if (!(_this.laps<3)) { __pc=3; break; }
          //$LASTPOS=45000419;//kernel.Pass:419
          _this.fiber$updateEx(_thread, 60);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=45000437;//kernel.Pass:437
          if (_this.laps<3) {
            //$LASTPOS=45000459;//kernel.Pass:459
            Tonyu.globals.$tokuten.incValue();
            //$LASTPOS=45000488;//kernel.Pass:488
            _this.time+=1;
            
          }
          __pc=1;break;
        case 3:
          
          //$LASTPOS=45000505;//kernel.Pass:505
          Tonyu.globals.$mplayer.stopBGM();
          //$LASTPOS=45000525;//kernel.Pass:525
          Tonyu.globals.$ball.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  toSec :function _trc_func_45000018_3(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=45000042;//kernel.Pass:42
    if (s<10) {
      return "0"+s;
    }
    return s;
  },
  fiber$toSec :function _trc_func_45000018_4(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=45000042;//kernel.Pass:42
    if (s<10) {
      _thread.retVal="0"+s;return;
      
    }
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  lap :function _trc_func_45000082_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tl;
    
    //$LASTPOS=45000103;//kernel.Pass:103
    tl;
    //$LASTPOS=45000115;//kernel.Pass:115
    if (! _this.enabled) {
      return _this;
    }
    //$LASTPOS=45000141;//kernel.Pass:141
    Tonyu.globals.$mplayer.playSE("se_jingle",1);
    //$LASTPOS=45000178;//kernel.Pass:178
    _this.enabled=0;
    //$LASTPOS=45000193;//kernel.Pass:193
    _this.laps+=1;
    //$LASTPOS=45000206;//kernel.Pass:206
    if (_this.laps==1) {
      //$LASTPOS=45000219;//kernel.Pass:219
      tl=Tonyu.globals.$lap1;
    }
    //$LASTPOS=45000233;//kernel.Pass:233
    if (_this.laps==2) {
      //$LASTPOS=45000246;//kernel.Pass:246
      tl=Tonyu.globals.$lap2;
    }
    //$LASTPOS=45000260;//kernel.Pass:260
    if (_this.laps==3) {
      //$LASTPOS=45000273;//kernel.Pass:273
      tl=Tonyu.globals.$lap3;
    }
    //$LASTPOS=45000287;//kernel.Pass:287
    if (tl) {
      //$LASTPOS=45000305;//kernel.Pass:305
      tl.text=tl.text+_this.floor(_this.time/60)+":"+_this.toSec(_this.time%60);
      //$LASTPOS=45000366;//kernel.Pass:366
      _this.time=0;
      
    }
  },
  fiber$lap :function _trc_func_45000082_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tl;
    
    //$LASTPOS=45000103;//kernel.Pass:103
    tl;
    //$LASTPOS=45000115;//kernel.Pass:115
    if (! _this.enabled) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=45000141;//kernel.Pass:141
    Tonyu.globals.$mplayer.playSE("se_jingle",1);
    //$LASTPOS=45000178;//kernel.Pass:178
    _this.enabled=0;
    //$LASTPOS=45000193;//kernel.Pass:193
    _this.laps+=1;
    //$LASTPOS=45000206;//kernel.Pass:206
    if (_this.laps==1) {
      //$LASTPOS=45000219;//kernel.Pass:219
      tl=Tonyu.globals.$lap1;
    }
    //$LASTPOS=45000233;//kernel.Pass:233
    if (_this.laps==2) {
      //$LASTPOS=45000246;//kernel.Pass:246
      tl=Tonyu.globals.$lap2;
    }
    //$LASTPOS=45000260;//kernel.Pass:260
    if (_this.laps==3) {
      //$LASTPOS=45000273;//kernel.Pass:273
      tl=Tonyu.globals.$lap3;
    }
    //$LASTPOS=45000287;//kernel.Pass:287
    if (tl) {
      //$LASTPOS=45000305;//kernel.Pass:305
      tl.text=tl.text+_this.floor(_this.time/60)+":"+_this.toSec(_this.time%60);
      //$LASTPOS=45000366;//kernel.Pass:366
      _this.time=0;
      
    }
    
    _thread.retVal=_this;return;
  },
  getWidth :function _trc_func_45000659_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getWidth :function _trc_func_45000659_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=32;return;
    
    
    _thread.retVal=_this;return;
  },
  getHeight :function _trc_func_45000691_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getHeight :function _trc_func_45000691_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=32;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Pass,{"fullName":"kernel.Pass","namespace":"kernel","shortName":"Pass","decls":{"methods":{"main":{"nowait":false},"toSec":{"nowait":false},"lap":{"nowait":false},"getWidth":{"nowait":false},"getHeight":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Player=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_46000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=46000002;//kernel.Player:2
    _this.dir=1;
    //$LASTPOS=46000009;//kernel.Player:9
    _this.rs=0.4;
    //$LASTPOS=46000017;//kernel.Player:17
    _this.hide();
    //$LASTPOS=46000025;//kernel.Player:25
    _this.frameCnt=0;
    //$LASTPOS=46000039;//kernel.Player:39
    while (1) {
      //$LASTPOS=46000112;//kernel.Player:112
      Tonyu.globals.$racket.tx=(Tonyu.globals.$mouseX+Tonyu.globals.$viewX)*_this.rs+Tonyu.globals.$racket.x*(1-_this.rs);
      //$LASTPOS=46000165;//kernel.Player:165
      Tonyu.globals.$racket.ty=(Tonyu.globals.$mouseY+Tonyu.globals.$viewY)*_this.rs+Tonyu.globals.$racket.y*(1-_this.rs);
      //$LASTPOS=46000345;//kernel.Player:345
      _this.update();
      //$LASTPOS=46000359;//kernel.Player:359
      _this.frameCnt++;
      
    }
  },
  fiber$main :function _trc_func_46000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=46000002;//kernel.Player:2
    _this.dir=1;
    //$LASTPOS=46000009;//kernel.Player:9
    _this.rs=0.4;
    //$LASTPOS=46000017;//kernel.Player:17
    _this.hide();
    //$LASTPOS=46000025;//kernel.Player:25
    _this.frameCnt=0;
    
    _thread.enter(function _trc_func_46000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=46000039;//kernel.Player:39
        case 1:
          if (!(1)) { __pc=3; break; }
          //$LASTPOS=46000112;//kernel.Player:112
          Tonyu.globals.$racket.tx=(Tonyu.globals.$mouseX+Tonyu.globals.$viewX)*_this.rs+Tonyu.globals.$racket.x*(1-_this.rs);
          //$LASTPOS=46000165;//kernel.Player:165
          Tonyu.globals.$racket.ty=(Tonyu.globals.$mouseY+Tonyu.globals.$viewY)*_this.rs+Tonyu.globals.$racket.y*(1-_this.rs);
          //$LASTPOS=46000345;//kernel.Player:345
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=46000359;//kernel.Player:359
          _this.frameCnt++;
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Player,{"fullName":"kernel.Player","namespace":"kernel","shortName":"Player","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Racket=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_47000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47000482;//kernel.Racket:482
    _this.px=_this.x;
    //$LASTPOS=47000487;//kernel.Racket:487
    _this.py=_this.y;
    //$LASTPOS=47000493;//kernel.Racket:493
    _this.scx=Tonyu.globals.$viewX;
    //$LASTPOS=47000507;//kernel.Racket:507
    _this.scy=Tonyu.globals.$viewY;
    //$LASTPOS=47000521;//kernel.Racket:521
    _this.sew=0;
    //$LASTPOS=47000530;//kernel.Racket:530
    _this.frameCnt=0;
    //$LASTPOS=47000544;//kernel.Racket:544
    while (1) {
      //$LASTPOS=47000558;//kernel.Racket:558
      _this.px=_this.x;
      //$LASTPOS=47000564;//kernel.Racket:564
      _this.py=_this.y;
      //$LASTPOS=47000626;//kernel.Racket:626
      _this.update();
      //$LASTPOS=47000640;//kernel.Racket:640
      _this.frameCnt++;
      //$LASTPOS=47000662;//kernel.Racket:662
      _this.sew-=1;
      //$LASTPOS=47000674;//kernel.Racket:674
      if (! Tonyu.globals.$ball.isDead()&&_this.crashTo(Tonyu.globals.$ball)) {
        //$LASTPOS=47000749;//kernel.Racket:749
        if (_this.sew<=0) {
          //$LASTPOS=47000762;//kernel.Racket:762
          _this.sew=8;
          //$LASTPOS=47000769;//kernel.Racket:769
          Tonyu.globals.$mplayer.playSE("se_shot");
          
        }
        //$LASTPOS=47000806;//kernel.Racket:806
        _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
        //$LASTPOS=47000833;//kernel.Racket:833
        _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
        //$LASTPOS=47000860;//kernel.Racket:860
        _this.spd=1;
        //$LASTPOS=47000875;//kernel.Racket:875
        if (_this.d<32) {
          //$LASTPOS=47000953;//kernel.Racket:953
          Tonyu.globals.$ball.x=_this.x+_this.avx*32;
          //$LASTPOS=47000983;//kernel.Racket:983
          Tonyu.globals.$ball.y=_this.y+_this.avy*32;
          //$LASTPOS=47001013;//kernel.Racket:1013
          _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
          
        }
        //$LASTPOS=47001083;//kernel.Racket:1083
        Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
        //$LASTPOS=47001121;//kernel.Racket:1121
        Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
        
      }
      //$LASTPOS=47001217;//kernel.Racket:1217
      if (_this.dist(_this.tx-_this.x,_this.ty-_this.y)<40) {
        //$LASTPOS=47001283;//kernel.Racket:1283
        if (! _this.kabe(_this.x,_this.ty)) {
          //$LASTPOS=47001314;//kernel.Racket:1314
          _this.y=_this.ty;
          
        }
        //$LASTPOS=47001338;//kernel.Racket:1338
        if (! _this.kabe(_this.tx,_this.y)) {
          //$LASTPOS=47001369;//kernel.Racket:1369
          _this.x=_this.tx;
          
        }
        
      }
      //$LASTPOS=47001411;//kernel.Racket:1411
      _this.scx=_this.scx*0.95+_this.x*0.05;
      //$LASTPOS=47001436;//kernel.Racket:1436
      _this.scy=_this.scy*0.95+_this.y*0.05;
      //$LASTPOS=47001461;//kernel.Racket:1461
      _this.scrollTo(_this.scx-Tonyu.globals.$screenWidth/2,_this.scy-Tonyu.globals.$screenHeight/2);
      
    }
  },
  fiber$main :function _trc_func_47000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=47000482;//kernel.Racket:482
    _this.px=_this.x;
    //$LASTPOS=47000487;//kernel.Racket:487
    _this.py=_this.y;
    //$LASTPOS=47000493;//kernel.Racket:493
    _this.scx=Tonyu.globals.$viewX;
    //$LASTPOS=47000507;//kernel.Racket:507
    _this.scy=Tonyu.globals.$viewY;
    //$LASTPOS=47000521;//kernel.Racket:521
    _this.sew=0;
    //$LASTPOS=47000530;//kernel.Racket:530
    _this.frameCnt=0;
    
    _thread.enter(function _trc_func_47000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=47000544;//kernel.Racket:544
        case 1:
          if (!(1)) { __pc=4; break; }
          //$LASTPOS=47000558;//kernel.Racket:558
          _this.px=_this.x;
          //$LASTPOS=47000564;//kernel.Racket:564
          _this.py=_this.y;
          //$LASTPOS=47000626;//kernel.Racket:626
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=47000640;//kernel.Racket:640
          _this.frameCnt++;
          //$LASTPOS=47000662;//kernel.Racket:662
          _this.sew-=1;
          //$LASTPOS=47000674;//kernel.Racket:674
          if (! Tonyu.globals.$ball.isDead()&&_this.crashTo(Tonyu.globals.$ball)) {
            //$LASTPOS=47000749;//kernel.Racket:749
            if (_this.sew<=0) {
              //$LASTPOS=47000762;//kernel.Racket:762
              _this.sew=8;
              //$LASTPOS=47000769;//kernel.Racket:769
              Tonyu.globals.$mplayer.playSE("se_shot");
              
            }
            //$LASTPOS=47000806;//kernel.Racket:806
            _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
            //$LASTPOS=47000833;//kernel.Racket:833
            _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
            //$LASTPOS=47000860;//kernel.Racket:860
            _this.spd=1;
            //$LASTPOS=47000875;//kernel.Racket:875
            if (_this.d<32) {
              //$LASTPOS=47000953;//kernel.Racket:953
              Tonyu.globals.$ball.x=_this.x+_this.avx*32;
              //$LASTPOS=47000983;//kernel.Racket:983
              Tonyu.globals.$ball.y=_this.y+_this.avy*32;
              //$LASTPOS=47001013;//kernel.Racket:1013
              _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
              
            }
            //$LASTPOS=47001083;//kernel.Racket:1083
            Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
            //$LASTPOS=47001121;//kernel.Racket:1121
            Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
            
          }
          //$LASTPOS=47001217;//kernel.Racket:1217
          if (_this.dist(_this.tx-_this.x,_this.ty-_this.y)<40) {
            //$LASTPOS=47001283;//kernel.Racket:1283
            if (! _this.kabe(_this.x,_this.ty)) {
              //$LASTPOS=47001314;//kernel.Racket:1314
              _this.y=_this.ty;
              
            }
            //$LASTPOS=47001338;//kernel.Racket:1338
            if (! _this.kabe(_this.tx,_this.y)) {
              //$LASTPOS=47001369;//kernel.Racket:1369
              _this.x=_this.tx;
              
            }
            
          }
          //$LASTPOS=47001411;//kernel.Racket:1411
          _this.scx=_this.scx*0.95+_this.x*0.05;
          //$LASTPOS=47001436;//kernel.Racket:1436
          _this.scy=_this.scy*0.95+_this.y*0.05;
          //$LASTPOS=47001461;//kernel.Racket:1461
          _this.fiber$scrollTo(_thread, _this.scx-Tonyu.globals.$screenWidth/2, _this.scy-Tonyu.globals.$screenHeight/2);
          __pc=3;return;
        case 3:
          
          __pc=1;break;
        case 4:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  kabe :function _trc_func_47000018_3(xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pa;
    
    //$LASTPOS=47000045;//kernel.Racket:45
    pa;
    //$LASTPOS=47000057;//kernel.Racket:57
    xx+=Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL;
    //$LASTPOS=47000104;//kernel.Racket:104
    yy+=Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW;
    //$LASTPOS=47000152;//kernel.Racket:152
    pa=Tonyu.globals.$map.getAt(xx%(Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL),yy%(Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW));
    return (pa<Tonyu.globals.$pat_table+9||pa>Tonyu.globals.$pat_table+14);
  },
  fiber$kabe :function _trc_func_47000018_4(_thread,xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pa;
    
    //$LASTPOS=47000045;//kernel.Racket:45
    pa;
    //$LASTPOS=47000057;//kernel.Racket:57
    xx+=Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL;
    //$LASTPOS=47000104;//kernel.Racket:104
    yy+=Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW;
    //$LASTPOS=47000152;//kernel.Racket:152
    pa=Tonyu.globals.$map.getAt(xx%(Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL),yy%(Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW));
    _thread.retVal=(pa<Tonyu.globals.$pat_table+9||pa>Tonyu.globals.$pat_table+14);return;
    
    
    _thread.retVal=_this;return;
  },
  crashTo :function _trc_func_47000367_5(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47000393;//kernel.Racket:393
    _this.d=_this.dist(t.x-_this.x,t.y-_this.y)+1;
    return (_this.d<(_this.dist(_this.x-_this.px,_this.y-_this.py)+_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy))/2+32);
  },
  scrollTo :function _trc_func_47001516_6(scx,scy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47001542;//kernel.Racket:1542
    Tonyu.globals.$Screen.scrollTo(scx,scy);
    //$LASTPOS=47001574;//kernel.Racket:1574
    Tonyu.globals.$viewX=scx;
    //$LASTPOS=47001592;//kernel.Racket:1592
    Tonyu.globals.$viewY=scy;
  },
  fiber$scrollTo :function _trc_func_47001516_7(_thread,scx,scy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=47001542;//kernel.Racket:1542
    Tonyu.globals.$Screen.scrollTo(scx,scy);
    //$LASTPOS=47001574;//kernel.Racket:1574
    Tonyu.globals.$viewX=scx;
    //$LASTPOS=47001592;//kernel.Racket:1592
    Tonyu.globals.$viewY=scy;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Racket,{"fullName":"kernel.Racket","namespace":"kernel","shortName":"Racket","decls":{"methods":{"main":{"nowait":false},"kabe":{"nowait":false},"crashTo":{"nowait":true},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Tokuten=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_48000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=48000293;//kernel.Tokuten:293
    _this.value=0;
    //$LASTPOS=48000302;//kernel.Tokuten:302
    _this.updateEx();
  },
  fiber$main :function _trc_func_48000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=48000293;//kernel.Tokuten:293
    _this.value=0;
    
    _thread.enter(function _trc_func_48000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=48000302;//kernel.Tokuten:302
          _this.fiber$updateEx(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setValue :function _trc_func_48000031_3(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=48000058;//kernel.Tokuten:58
    _this.value=v;
    //$LASTPOS=48000071;//kernel.Tokuten:71
    _this.p=Tonyu.globals.$pat_tokuten+_this.value;
  },
  fiber$setValue :function _trc_func_48000031_4(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=48000058;//kernel.Tokuten:58
    _this.value=v;
    //$LASTPOS=48000071;//kernel.Tokuten:71
    _this.p=Tonyu.globals.$pat_tokuten+_this.value;
    
    _thread.retVal=_this;return;
  },
  incValue :function _trc_func_48000149_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=48000175;//kernel.Tokuten:175
    _this.value+=1;
    //$LASTPOS=48000189;//kernel.Tokuten:189
    if (_this.value>=_this.nextInc) {
      //$LASTPOS=48000219;//kernel.Tokuten:219
      if (_this.next) {
        //$LASTPOS=48000229;//kernel.Tokuten:229
        _this.next.incValue();
      }
      //$LASTPOS=48000255;//kernel.Tokuten:255
      _this.value=0;
      
    }
    //$LASTPOS=48000274;//kernel.Tokuten:274
    _this.setValue(_this.value);
  },
  fiber$incValue :function _trc_func_48000149_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=48000175;//kernel.Tokuten:175
    _this.value+=1;
    //$LASTPOS=48000189;//kernel.Tokuten:189
    if (_this.value>=_this.nextInc) {
      //$LASTPOS=48000219;//kernel.Tokuten:219
      if (_this.next) {
        //$LASTPOS=48000229;//kernel.Tokuten:229
        _this.next.incValue();
      }
      //$LASTPOS=48000255;//kernel.Tokuten:255
      _this.value=0;
      
    }
    
    _thread.enter(function _trc_func_48000149_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=48000274;//kernel.Tokuten:274
          _this.fiber$setValue(_thread, _this.value);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Tokuten,{"fullName":"kernel.Tokuten","namespace":"kernel","shortName":"Tokuten","decls":{"methods":{"main":{"nowait":false},"setValue":{"nowait":false},"incValue":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BodyActor=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_49000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_49000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  getWorld :function _trc_func_49000046_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      return Tonyu.globals.$t2World;
    }
    //$LASTPOS=49000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    return Tonyu.globals.$t2World;
  },
  fiber$getWorld :function _trc_func_49000046_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=49000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      _thread.retVal=Tonyu.globals.$t2World;return;
      
    }
    //$LASTPOS=49000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    _thread.retVal=Tonyu.globals.$t2World;return;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_func_49000144_4() {
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
    
    //$LASTPOS=49000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=49000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=49000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=49000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=49000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=49000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=49000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=49000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=49000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=49000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=49000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=49000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=49000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=49000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=49000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=49000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=49000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=49000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=49000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=49000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=49001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=49001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=49001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=49001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=49001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=49001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=49001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=49001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=49001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=49001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=49001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=49001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=49001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=49001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=49001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
  },
  fiber$onAppear :function _trc_func_49000144_5(_thread) {
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
    
    //$LASTPOS=49000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=49000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=49000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=49000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=49000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=49000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=49000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=49000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=49000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=49000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=49000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=49000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=49000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=49000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=49000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=49000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=49000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=49000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=49000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=49000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=49001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=49001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=49001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=49001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=49001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=49001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=49001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=49001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=49001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=49001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=49001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=49001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=49001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=49001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=49001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
    
    _thread.retVal=_this;return;
  },
  allContact :function _trc_func_49001574_6(klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=49001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=49001615;//kernel.BodyActor:1615
    //$LASTPOS=49001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=49001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=49001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=49001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=49001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=49001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=49001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=49001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=49002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=49002080;//kernel.BodyActor:2080
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
  fiber$allContact :function _trc_func_49001574_7(_thread,klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=49001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=49001615;//kernel.BodyActor:1615
    //$LASTPOS=49001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=49001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=49001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=49001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=49001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=49001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=49001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=49001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=49002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=49002080;//kernel.BodyActor:2080
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
  applyForce :function _trc_func_49002159_8(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=49002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=49002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=49002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=49002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyForce :function _trc_func_49002159_9(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=49002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=49002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=49002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=49002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyImpulse :function _trc_func_49002339_10(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=49002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=49002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=49002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=49002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyImpulse :function _trc_func_49002339_11(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=49002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=49002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=49002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=49002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyTorque :function _trc_func_49002524_12(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
  },
  fiber$applyTorque :function _trc_func_49002524_13(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=49002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
    
    _thread.retVal=_this;return;
  },
  moveBy :function _trc_func_49002569_14(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pos;
    
    //$LASTPOS=49002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=49002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=49002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=49002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
  },
  fiber$moveBy :function _trc_func_49002569_15(_thread,dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pos;
    
    //$LASTPOS=49002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=49002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=49002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=49002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
    
    _thread.retVal=_this;return;
  },
  contactTo :function _trc_func_49002689_16(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.allContact(t)[0];
  },
  fiber$contactTo :function _trc_func_49002689_17(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.allContact(t)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_49002736_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49002749;//kernel.BodyActor:2749
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    //$LASTPOS=49002766;//kernel.BodyActor:2766
    _this.world.DestroyBody(_this.body);
  },
  updatePos :function _trc_func_49002793_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var scale;
    var pos;
    
    //$LASTPOS=49002812;//kernel.BodyActor:2812
    if (! _this.body) {
      return _this;
    }
    //$LASTPOS=49002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=49002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=49002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=49002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=49002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
  },
  fiber$updatePos :function _trc_func_49002793_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var scale;
    var pos;
    
    //$LASTPOS=49002812;//kernel.BodyActor:2812
    if (! _this.body) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=49002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=49002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=49002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=49002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=49002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2MediaPlayer],{
  main :function _trc_func_50000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50001699;//kernel.Boot:1699
    _this.initSounds();
    //$LASTPOS=50001714;//kernel.Boot:1714
    _this.initSprites();
    //$LASTPOS=50001730;//kernel.Boot:1730
    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
    //$LASTPOS=50001761;//kernel.Boot:1761
    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
    //$LASTPOS=50001798;//kernel.Boot:1798
    _this.initThread();
    //$LASTPOS=50001815;//kernel.Boot:1815
    Tonyu.globals.$pat_fruits=30;
    //$LASTPOS=50001832;//kernel.Boot:1832
    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
    //$LASTPOS=50001849;//kernel.Boot:1849
    Tonyu.globals.$Math=Math;
    //$LASTPOS=50001862;//kernel.Boot:1862
    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=50001972;//kernel.Boot:1972
    Tonyu.globals.$consolePrintY=465-15;
    //$LASTPOS=50001996;//kernel.Boot:1996
    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=50002136;//kernel.Boot:2136
    if (typeof  SplashScreen!="undefined") {
      //$LASTPOS=50002174;//kernel.Boot:2174
      SplashScreen.hide();
    }
    //$LASTPOS=50002196;//kernel.Boot:2196
    _this.initFPSParams();
    //$LASTPOS=50002216;//kernel.Boot:2216
    while (true) {
      //$LASTPOS=50002256;//kernel.Boot:2256
      Tonyu.globals.$Scheduler.stepsAll();
      //$LASTPOS=50002284;//kernel.Boot:2284
      Tonyu.globals.$Keys.update();
      //$LASTPOS=50002305;//kernel.Boot:2305
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=50002333;//kernel.Boot:2333
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=50002366;//kernel.Boot:2366
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=50002403;//kernel.Boot:2403
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=50002431;//kernel.Boot:2431
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=50002485;//kernel.Boot:2485
        _this.doDraw=true;
        //$LASTPOS=50002507;//kernel.Boot:2507
        _this.resetDeadLine();
        
      }
      //$LASTPOS=50002536;//kernel.Boot:2536
      if (_this.doDraw) {
        //$LASTPOS=50002579;//kernel.Boot:2579
        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=50002624;//kernel.Boot:2624
        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=50002664;//kernel.Boot:2664
        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=50002709;//kernel.Boot:2709
        Tonyu.globals.$Screen.draw();
        //$LASTPOS=50002734;//kernel.Boot:2734
        _this.fps_fpsCnt++;
        //$LASTPOS=50002758;//kernel.Boot:2758
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=50002797;//kernel.Boot:2797
        _this.frameSkipped++;
        
      }
      //$LASTPOS=50002825;//kernel.Boot:2825
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=50002851;//kernel.Boot:2851
      _this.fps_rpsCnt++;
      //$LASTPOS=50002871;//kernel.Boot:2871
      _this.measureFps();
      //$LASTPOS=50002890;//kernel.Boot:2890
      _this.waitFrame();
      //$LASTPOS=50002917;//kernel.Boot:2917
      while (_this.paused) {
        //$LASTPOS=50002942;//kernel.Boot:2942
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=50002978;//kernel.Boot:2978
        if (! _this.paused) {
          //$LASTPOS=50002991;//kernel.Boot:2991
          _this.resetDeadLine();
        }
        
      }
      
    }
  },
  fiber$main :function _trc_func_50000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_50000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50001699;//kernel.Boot:1699
          _this.fiber$initSounds(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=50001714;//kernel.Boot:1714
          _this.fiber$initSprites(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=50001730;//kernel.Boot:1730
          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
          //$LASTPOS=50001761;//kernel.Boot:1761
          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
          //$LASTPOS=50001798;//kernel.Boot:1798
          _this.fiber$initThread(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=50001815;//kernel.Boot:1815
          Tonyu.globals.$pat_fruits=30;
          //$LASTPOS=50001832;//kernel.Boot:1832
          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
          //$LASTPOS=50001849;//kernel.Boot:1849
          Tonyu.globals.$Math=Math;
          //$LASTPOS=50001862;//kernel.Boot:1862
          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=50001972;//kernel.Boot:1972
          Tonyu.globals.$consolePrintY=465-15;
          //$LASTPOS=50001996;//kernel.Boot:1996
          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=50002136;//kernel.Boot:2136
          if (typeof  SplashScreen!="undefined") {
            //$LASTPOS=50002174;//kernel.Boot:2174
            SplashScreen.hide();
          }
          //$LASTPOS=50002196;//kernel.Boot:2196
          _this.initFPSParams();
          //$LASTPOS=50002216;//kernel.Boot:2216
        case 4:
          //$LASTPOS=50002256;//kernel.Boot:2256
          Tonyu.globals.$Scheduler.stepsAll();
          //$LASTPOS=50002284;//kernel.Boot:2284
          Tonyu.globals.$Keys.update();
          //$LASTPOS=50002305;//kernel.Boot:2305
          Tonyu.globals.$InputDevice.update();
          //$LASTPOS=50002333;//kernel.Boot:2333
          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
          //$LASTPOS=50002366;//kernel.Boot:2366
          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
          //$LASTPOS=50002403;//kernel.Boot:2403
          _this.doDraw=_this.now()<_this.deadLine;
          //$LASTPOS=50002431;//kernel.Boot:2431
          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
            //$LASTPOS=50002485;//kernel.Boot:2485
            _this.doDraw=true;
            //$LASTPOS=50002507;//kernel.Boot:2507
            _this.resetDeadLine();
            
          }
          //$LASTPOS=50002536;//kernel.Boot:2536
          if (_this.doDraw) {
            //$LASTPOS=50002579;//kernel.Boot:2579
            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=50002624;//kernel.Boot:2624
            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=50002664;//kernel.Boot:2664
            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=50002709;//kernel.Boot:2709
            Tonyu.globals.$Screen.draw();
            //$LASTPOS=50002734;//kernel.Boot:2734
            _this.fps_fpsCnt++;
            //$LASTPOS=50002758;//kernel.Boot:2758
            _this.frameSkipped=0;
            
          } else {
            //$LASTPOS=50002797;//kernel.Boot:2797
            _this.frameSkipped++;
            
          }
          //$LASTPOS=50002825;//kernel.Boot:2825
          Tonyu.globals.$Sprites.checkHit();
          //$LASTPOS=50002851;//kernel.Boot:2851
          _this.fps_rpsCnt++;
          //$LASTPOS=50002871;//kernel.Boot:2871
          _this.measureFps();
          //$LASTPOS=50002890;//kernel.Boot:2890
          _this.fiber$waitFrame(_thread);
          __pc=5;return;
        case 5:
          
          //$LASTPOS=50002917;//kernel.Boot:2917
        case 6:
          if (!(_this.paused)) { __pc=8; break; }
          //$LASTPOS=50002942;//kernel.Boot:2942
          _this.fiber$waitFor(_thread, Tonyu.timeout(1));
          __pc=7;return;
        case 7:
          
          //$LASTPOS=50002978;//kernel.Boot:2978
          if (! _this.paused) {
            //$LASTPOS=50002991;//kernel.Boot:2991
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
  update :function _trc_func_50000187_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50000204;//kernel.Boot:204
    _this.waitFor(Tonyu.timeout(50));
  },
  fiber$update :function _trc_func_50000187_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_50000187_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50000204;//kernel.Boot:204
          _this.fiber$waitFor(_thread, Tonyu.timeout(50));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSprites :function _trc_func_50000263_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_260;
    
    //$LASTPOS=50000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=50000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=50000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=50000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=50000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    //$LASTPOS=50000454;//kernel.Boot:454
    _this.waitFor(a);
    //$LASTPOS=50000471;//kernel.Boot:471
    _this.print("Loading pats..");
    //$LASTPOS=50000502;//kernel.Boot:502
    rs = Tonyu.globals.$currentProject.getResource();
    //$LASTPOS=50000545;//kernel.Boot:545
    a=_this.asyncResult();
    //$LASTPOS=50000567;//kernel.Boot:567
    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
    //$LASTPOS=50000652;//kernel.Boot:652
    _this.waitFor(a);
    //$LASTPOS=50000669;//kernel.Boot:669
    r = a[0];
    //$LASTPOS=50000686;//kernel.Boot:686
    Tonyu.globals.$Sprites.setImageList(r);
    //$LASTPOS=50000717;//kernel.Boot:717
    _it_260=Tonyu.iterator(r.names,2);
    while(_it_260.next()) {
      name=_it_260[0];
      val=_it_260[1];
      
      //$LASTPOS=50000758;//kernel.Boot:758
      Tonyu.setGlobal(name,val);
      
    }
    //$LASTPOS=50000798;//kernel.Boot:798
    _this.print("Loading pats done.");
    //$LASTPOS=50000833;//kernel.Boot:833
    _this.cvj=$("canvas");
    //$LASTPOS=50000855;//kernel.Boot:855
    if (Tonyu.noviceMode) {
      //$LASTPOS=50000888;//kernel.Boot:888
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
      
    } else {
      //$LASTPOS=50000972;//kernel.Boot:972
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
      
    }
  },
  fiber$initSprites :function _trc_func_50000263_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_260;
    
    //$LASTPOS=50000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=50000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=50000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=50000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=50000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    
    _thread.enter(function _trc_func_50000263_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50000454;//kernel.Boot:454
          _this.fiber$waitFor(_thread, a);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=50000471;//kernel.Boot:471
          _this.print("Loading pats..");
          //$LASTPOS=50000502;//kernel.Boot:502
          rs = Tonyu.globals.$currentProject.getResource();
          //$LASTPOS=50000545;//kernel.Boot:545
          a=_this.asyncResult();
          //$LASTPOS=50000567;//kernel.Boot:567
          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
          //$LASTPOS=50000652;//kernel.Boot:652
          _this.fiber$waitFor(_thread, a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=50000669;//kernel.Boot:669
          r = a[0];
          //$LASTPOS=50000686;//kernel.Boot:686
          Tonyu.globals.$Sprites.setImageList(r);
          //$LASTPOS=50000717;//kernel.Boot:717
          _it_260=Tonyu.iterator(r.names,2);
          while(_it_260.next()) {
            name=_it_260[0];
            val=_it_260[1];
            
            //$LASTPOS=50000758;//kernel.Boot:758
            Tonyu.setGlobal(name,val);
            
          }
          //$LASTPOS=50000798;//kernel.Boot:798
          _this.print("Loading pats done.");
          //$LASTPOS=50000833;//kernel.Boot:833
          _this.cvj=$("canvas");
          //$LASTPOS=50000855;//kernel.Boot:855
          if (Tonyu.noviceMode) {
            //$LASTPOS=50000888;//kernel.Boot:888
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
            
          } else {
            //$LASTPOS=50000972;//kernel.Boot:972
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSounds :function _trc_func_50001044_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    //$LASTPOS=50001099;//kernel.Boot:1099
    _this.initT2MediaPlayer();
    //$LASTPOS=50001125;//kernel.Boot:1125
    _this.loadFromProject(Tonyu.globals.$currentProject);
    //$LASTPOS=50001164;//kernel.Boot:1164
    _this.print("Loading sounds done.");
  },
  fiber$initSounds :function _trc_func_50001044_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=50001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    
    _thread.enter(function _trc_func_50001044_11(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50001099;//kernel.Boot:1099
          _this.fiber$initT2MediaPlayer(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=50001125;//kernel.Boot:1125
          _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=50001164;//kernel.Boot:1164
          _this.print("Loading sounds done.");
          _thread.exit(_this);return;
        }
      }
    });
  },
  initThread :function _trc_func_50001204_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var o;
    var mainClassName;
    
    //$LASTPOS=50001274;//kernel.Boot:1274
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=50001320;//kernel.Boot:1320
    mainClassName = o.run.mainClass;
    //$LASTPOS=50001360;//kernel.Boot:1360
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=50001401;//kernel.Boot:1401
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=50001447;//kernel.Boot:1447
    if (! _this.mainClass) {
      //$LASTPOS=50001474;//kernel.Boot:1474
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=50001552;//kernel.Boot:1552
    Tonyu.runMode=true;
    //$LASTPOS=50001609;//kernel.Boot:1609
    Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
    //$LASTPOS=50001640;//kernel.Boot:1640
    new _this.mainClass();
  },
  fiber$initThread :function _trc_func_50001204_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var o;
    var mainClassName;
    
    //$LASTPOS=50001274;//kernel.Boot:1274
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=50001320;//kernel.Boot:1320
    mainClassName = o.run.mainClass;
    //$LASTPOS=50001360;//kernel.Boot:1360
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=50001401;//kernel.Boot:1401
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=50001447;//kernel.Boot:1447
    if (! _this.mainClass) {
      //$LASTPOS=50001474;//kernel.Boot:1474
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=50001552;//kernel.Boot:1552
    Tonyu.runMode=true;
    //$LASTPOS=50001609;//kernel.Boot:1609
    Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
    //$LASTPOS=50001640;//kernel.Boot:1640
    new _this.mainClass();
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_50001661_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50001676;//kernel.Boot:1676
    _this.fireEvent("stop");
  },
  fiber$stop :function _trc_func_50001661_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_50001661_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50001676;//kernel.Boot:1676
          _this.fiber$fireEvent(_thread, "stop");
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initFPSParams :function _trc_func_50003021_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50003071;//kernel.Boot:3071
    _this._fps=30;
    //$LASTPOS=50003087;//kernel.Boot:3087
    _this.maxframeSkip=5;
    //$LASTPOS=50003137;//kernel.Boot:3137
    _this.frameCnt=0;
    //$LASTPOS=50003156;//kernel.Boot:3156
    _this.resetDeadLine();
    //$LASTPOS=50003178;//kernel.Boot:3178
    Tonyu.globals.$Boot=_this;
    //$LASTPOS=50003197;//kernel.Boot:3197
    _this.lastMeasured=_this.now();
    //$LASTPOS=50003222;//kernel.Boot:3222
    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
  },
  now :function _trc_func_50003267_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return new Date().getTime();
  },
  resetDeadLine :function _trc_func_50003321_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50003352;//kernel.Boot:3352
    _this.deadLine=_this.now()+1000/_this._fps;
    //$LASTPOS=50003383;//kernel.Boot:3383
    _this.frameSkipped=0;
  },
  waitFrame :function _trc_func_50003407_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var wt;
    
    //$LASTPOS=50003427;//kernel.Boot:3427
    wt = _this.deadLine-_this.now();
    //$LASTPOS=50003455;//kernel.Boot:3455
    if (wt<1) {
      //$LASTPOS=50003476;//kernel.Boot:3476
      if (wt<- 1000) {
        //$LASTPOS=50003490;//kernel.Boot:3490
        _this.resetDeadLine();
      }
      //$LASTPOS=50003516;//kernel.Boot:3516
      wt=1;
      
    }
    //$LASTPOS=50003534;//kernel.Boot:3534
    wt=_this.floor(wt);
    //$LASTPOS=50003553;//kernel.Boot:3553
    _this.waitFor(Tonyu.timeout(wt));
    //$LASTPOS=50003586;//kernel.Boot:3586
    _this.deadLine+=1000/_this._fps;
  },
  fiber$waitFrame :function _trc_func_50003407_21(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var wt;
    
    //$LASTPOS=50003427;//kernel.Boot:3427
    wt = _this.deadLine-_this.now();
    //$LASTPOS=50003455;//kernel.Boot:3455
    if (wt<1) {
      //$LASTPOS=50003476;//kernel.Boot:3476
      if (wt<- 1000) {
        //$LASTPOS=50003490;//kernel.Boot:3490
        _this.resetDeadLine();
      }
      //$LASTPOS=50003516;//kernel.Boot:3516
      wt=1;
      
    }
    //$LASTPOS=50003534;//kernel.Boot:3534
    wt=_this.floor(wt);
    
    _thread.enter(function _trc_func_50003407_22(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50003553;//kernel.Boot:3553
          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
          __pc=1;return;
        case 1:
          
          //$LASTPOS=50003586;//kernel.Boot:3586
          _this.deadLine+=1000/_this._fps;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getFrameRate :function _trc_func_50003613_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._fps;
  },
  setFrameRate :function _trc_func_50003699_24(fps,maxFrameSkip) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50003746;//kernel.Boot:3746
    _this._fps=fps;
    //$LASTPOS=50003763;//kernel.Boot:3763
    if (typeof  maxFrameSkip!="number") {
      //$LASTPOS=50003798;//kernel.Boot:3798
      maxFrameSkip=5;
    }
    //$LASTPOS=50003819;//kernel.Boot:3819
    _this.maxFrameSkip=maxFrameSkip;
    //$LASTPOS=50003858;//kernel.Boot:3858
    _this.resetDeadLine();
  },
  getMeasuredFps :function _trc_func_50003908_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_fps;
  },
  getMeasuredRps :function _trc_func_50003987_26() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_rps;
  },
  measureFps :function _trc_func_50004041_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50004069;//kernel.Boot:4069
    if (_this.now()>_this.lastMeasured+1000) {
      //$LASTPOS=50004109;//kernel.Boot:4109
      _this.fps_fps=_this.fps_fpsCnt;
      //$LASTPOS=50004138;//kernel.Boot:4138
      _this.fps_rps=_this.fps_rpsCnt;
      //$LASTPOS=50004167;//kernel.Boot:4167
      _this.fps_fpsCnt=0;
      //$LASTPOS=50004190;//kernel.Boot:4190
      _this.fps_rpsCnt=0;
      //$LASTPOS=50004213;//kernel.Boot:4213
      _this.lastMeasured=_this.now();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_51000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_51000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_func_52000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_52000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_52000023_2(xx,yy,pp,ff,sz,rt,al) {
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
  draw :function _trc_func_52000196_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=52000212;//kernel.DxChar:212
    _this.rotation=_this.angle;
    //$LASTPOS=52000233;//kernel.DxChar:233
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

