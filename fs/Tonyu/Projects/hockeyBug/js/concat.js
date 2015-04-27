Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventMod=Tonyu.klass([],{
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
    //$LASTPOS=1000095;//kernel.EventMod:95
    _this._eventHandlers={};
    //$LASTPOS=1000118;//kernel.EventMod:118
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
  },
  releaseEventMod :function _trc_EventMod_releaseEventMod() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_1;
    
    //$LASTPOS=1000182;//kernel.EventMod:182
    _it_1=Tonyu.iterator(_this._eventHandlers,2);
    while(_it_1.next()) {
      k=_it_1[0];
      v=_it_1[1];
      
      //$LASTPOS=1000224;//kernel.EventMod:224
      v.release();
      
    }
  },
  parseArgs :function _trc_EventMod_parseArgs(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var i;
    
    //$LASTPOS=1000274;//kernel.EventMod:274
    res = {type: a[0],args: []};
    //$LASTPOS=1000308;//kernel.EventMod:308
    //$LASTPOS=1000313;//kernel.EventMod:313
    i = 1;
    while(i<a.length) {
      {
        //$LASTPOS=1000351;//kernel.EventMod:351
        res.args.push(a[i]);
      }
      i++;
    }
    return res;
  },
  registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000474;//kernel.EventMod:474
    _this.initEventMod();
    //$LASTPOS=1000494;//kernel.EventMod:494
    if (typeof  type=="function") {
      //$LASTPOS=1000533;//kernel.EventMod:533
      obj=obj||new type;
      //$LASTPOS=1000560;//kernel.EventMod:560
      type=obj.getClassInfo().fullName;
      
    } else {
      //$LASTPOS=1000616;//kernel.EventMod:616
      obj=obj||new Tonyu.classes.kernel.EventHandler;
      
    }
    return _this._eventHandlers[type]=obj;
  },
  getEventHandler :function _trc_EventMod_getEventHandler(type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=1000730;//kernel.EventMod:730
    _this.initEventMod();
    //$LASTPOS=1000750;//kernel.EventMod:750
    if (typeof  type=="function") {
      //$LASTPOS=1000789;//kernel.EventMod:789
      type=type.meta.fullName;
      
    }
    //$LASTPOS=1000824;//kernel.EventMod:824
    res = _this._eventHandlers[type];
    return res;
  },
  getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=1000920;//kernel.EventMod:920
    res = _this.getEventHandler(type)||_this.registerEventHandler(type);
    return res;
  },
  on :function _trc_EventMod_on() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var h;
    
    //$LASTPOS=1001023;//kernel.EventMod:1023
    a = _this.parseArgs(arguments);
    //$LASTPOS=1001056;//kernel.EventMod:1056
    h = _this.getOrRegisterEventHandler(a.type);
    return h.addListener.apply(h,a.args);
  },
  fireEvent :function _trc_EventMod_fireEvent(type,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var h;
    
    //$LASTPOS=1001182;//kernel.EventMod:1182
    h = _this.getEventHandler(type);
    //$LASTPOS=1001216;//kernel.EventMod:1216
    if (h) {
      //$LASTPOS=1001223;//kernel.EventMod:1223
      h.fire([arg]);
    }
  },
  sendEvent :function _trc_EventMod_sendEvent(type,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1001278;//kernel.EventMod:1278
    _this.fireEvent(type,arg);
  },
  waitEvent :function _trc_EventMod_waitEvent() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var args;
    var i;
    
    //$LASTPOS=1001325;//kernel.EventMod:1325
    if (null) {
      //$LASTPOS=1001349;//kernel.EventMod:1349
      args = [];
      //$LASTPOS=1001371;//kernel.EventMod:1371
      //$LASTPOS=1001376;//kernel.EventMod:1376
      i = 0;
      while(i<arguments.length) {
        {
          //$LASTPOS=1001423;//kernel.EventMod:1423
          if (arguments[i]===undefined) {
            break;
            
          }
          //$LASTPOS=1001473;//kernel.EventMod:1473
          args.push(arguments[i]);
        }
        i++;
      }
      //$LASTPOS=1001518;//kernel.EventMod:1518
      null.waitEvent(_this,args);
      
    }
  },
  fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var args;
    var i;
    
    //$LASTPOS=1001325;//kernel.EventMod:1325
    if (_thread) {
      //$LASTPOS=1001349;//kernel.EventMod:1349
      args = [];
      //$LASTPOS=1001371;//kernel.EventMod:1371
      //$LASTPOS=1001376;//kernel.EventMod:1376
      i = 0;
      while(i<_arguments.length) {
        {
          //$LASTPOS=1001423;//kernel.EventMod:1423
          if (_arguments[i]===undefined) {
            break;
            
          }
          //$LASTPOS=1001473;//kernel.EventMod:1473
          args.push(_arguments[i]);
        }
        i++;
      }
      //$LASTPOS=1001518;//kernel.EventMod:1518
      _thread.waitEvent(_this,args);
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventMod,{"fullName":"kernel.EventMod","namespace":"kernel","shortName":"EventMod","decls":{"methods":{"main":{"nowait":false},"initEventMod":{"nowait":true},"releaseEventMod":{"nowait":true},"parseArgs":{"nowait":true},"registerEventHandler":{"nowait":true},"getEventHandler":{"nowait":true},"getOrRegisterEventHandler":{"nowait":true},"on":{"nowait":true},"fireEvent":{"nowait":true},"sendEvent":{"nowait":true},"waitEvent":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.OneframeSpriteMod=Tonyu.klass([],{
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
    
    //$LASTPOS=2000053;//kernel.OneframeSpriteMod:53
    if (! size) {
      //$LASTPOS=2000064;//kernel.OneframeSpriteMod:64
      size=15;
    }
    //$LASTPOS=2000078;//kernel.OneframeSpriteMod:78
    if (! col) {
      //$LASTPOS=2000088;//kernel.OneframeSpriteMod:88
      col="cyan";
    }
    //$LASTPOS=2000105;//kernel.OneframeSpriteMod:105
    new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size,oneframeSprite: true});
  },
  fiber$drawText :function _trc_OneframeSpriteMod_f_drawText(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000053;//kernel.OneframeSpriteMod:53
    if (! size) {
      //$LASTPOS=2000064;//kernel.OneframeSpriteMod:64
      size=15;
    }
    //$LASTPOS=2000078;//kernel.OneframeSpriteMod:78
    if (! col) {
      //$LASTPOS=2000088;//kernel.OneframeSpriteMod:88
      col="cyan";
    }
    //$LASTPOS=2000105;//kernel.OneframeSpriteMod:105
    new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size,oneframeSprite: true});
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000203;//kernel.OneframeSpriteMod:203
    if (! col) {
      //$LASTPOS=2000213;//kernel.OneframeSpriteMod:213
      col="white";
    }
    //$LASTPOS=2000231;//kernel.OneframeSpriteMod:231
    new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col,oneframeSprite: true});
  },
  fiber$drawLine :function _trc_OneframeSpriteMod_f_drawLine(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000203;//kernel.OneframeSpriteMod:203
    if (! col) {
      //$LASTPOS=2000213;//kernel.OneframeSpriteMod:213
      col="white";
    }
    //$LASTPOS=2000231;//kernel.OneframeSpriteMod:231
    new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col,oneframeSprite: true});
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.OneframeSpriteMod,{"fullName":"kernel.OneframeSpriteMod","namespace":"kernel","shortName":"OneframeSpriteMod","decls":{"methods":{"main":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextRectMod=Tonyu.klass([],{
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextRectMod,{"fullName":"kernel.TextRectMod","namespace":"kernel","shortName":"TextRectMod","decls":{"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MathMod=Tonyu.klass([],{
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MathMod,{"fullName":"kernel.MathMod","namespace":"kernel","shortName":"MathMod","decls":{"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ThreadGroupMod=Tonyu.klass([],{
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
    
    //$LASTPOS=5000038;//kernel.ThreadGroupMod:38
    _this.threads=_this.threads||[];
    //$LASTPOS=5000064;//kernel.ThreadGroupMod:64
    _this.threads.push(t);
  },
  fiber$addThread :function _trc_ThreadGroupMod_f_addThread(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5000038;//kernel.ThreadGroupMod:38
    _this.threads=_this.threads||[];
    //$LASTPOS=5000064;//kernel.ThreadGroupMod:64
    _this.threads.push(t);
    
    _thread.retVal=_this;return;
  },
  addThreadGroup :function _trc_ThreadGroupMod_addThreadGroup(tg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000112;//kernel.ThreadGroupMod:112
    _this.threadGroups=_this.threadGroups||[];
    //$LASTPOS=5000148;//kernel.ThreadGroupMod:148
    _this.threadGroups.push(tg);
  },
  fiber$addThreadGroup :function _trc_ThreadGroupMod_f_addThreadGroup(_thread,tg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5000112;//kernel.ThreadGroupMod:112
    _this.threadGroups=_this.threadGroups||[];
    //$LASTPOS=5000148;//kernel.ThreadGroupMod:148
    _this.threadGroups.push(tg);
    
    _thread.retVal=_this;return;
  },
  killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thread;
    var _it_25;
    var threadGroup;
    var _it_26;
    
    //$LASTPOS=5000201;//kernel.ThreadGroupMod:201
    if (_this.threads) {
      //$LASTPOS=5000225;//kernel.ThreadGroupMod:225
      _it_25=Tonyu.iterator(_this.threads,1);
      while(_it_25.next()) {
        thread=_it_25[0];
        
        //$LASTPOS=5000268;//kernel.ThreadGroupMod:268
        thread.kill();
        
      }
      
    }
    //$LASTPOS=5000306;//kernel.ThreadGroupMod:306
    if (_this.threadGroups) {
      //$LASTPOS=5000335;//kernel.ThreadGroupMod:335
      _it_26=Tonyu.iterator(_this.threadGroups,1);
      while(_it_26.next()) {
        threadGroup=_it_26[0];
        
        //$LASTPOS=5000388;//kernel.ThreadGroupMod:388
        threadGroup.killThreadGroup();
        
      }
      
    }
  },
  fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var thread;
    var _it_25;
    var threadGroup;
    var _it_26;
    
    //$LASTPOS=5000201;//kernel.ThreadGroupMod:201
    if (_this.threads) {
      //$LASTPOS=5000225;//kernel.ThreadGroupMod:225
      _it_25=Tonyu.iterator(_this.threads,1);
      while(_it_25.next()) {
        thread=_it_25[0];
        
        //$LASTPOS=5000268;//kernel.ThreadGroupMod:268
        thread.kill();
        
      }
      
    }
    //$LASTPOS=5000306;//kernel.ThreadGroupMod:306
    if (_this.threadGroups) {
      //$LASTPOS=5000335;//kernel.ThreadGroupMod:335
      _it_26=Tonyu.iterator(_this.threadGroups,1);
      while(_it_26.next()) {
        threadGroup=_it_26[0];
        
        //$LASTPOS=5000388;//kernel.ThreadGroupMod:388
        threadGroup.killThreadGroup();
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ThreadGroupMod,{"fullName":"kernel.ThreadGroupMod","namespace":"kernel","shortName":"ThreadGroupMod","decls":{"methods":{"main":{"nowait":false},"addThread":{"nowait":false},"addThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TObject=Tonyu.klass([],{
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
    
    //$LASTPOS=6000052;//kernel.TObject:52
    if (typeof  options=="object") {
      //$LASTPOS=6000082;//kernel.TObject:82
      _this.extend(options);
    }
    //$LASTPOS=6000104;//kernel.TObject:104
    _this.main();
  },
  extend :function _trc_TObject_extend(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TObject,{"fullName":"kernel.TObject","namespace":"kernel","shortName":"TObject","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TQuery=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
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
    
    //$LASTPOS=7000049;//kernel.TQuery:49
    _this.length=0;
  },
  tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
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
  fiber$tonyuIterator :function _trc_TQuery_f_tonyuIterator(_thread,arity) {
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
  attr :function _trc_TQuery_attr() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var values;
    var i;
    var e;
    var _it_32;
    
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
      _it_32=Tonyu.iterator(_this,1);
      while(_it_32.next()) {
        e=_it_32[0];
        
        //$LASTPOS=7000968;//kernel.TQuery:968
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
    var _it_32;
    
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
      _it_32=Tonyu.iterator(_this,1);
      while(_it_32.next()) {
        e=_it_32[0];
        
        //$LASTPOS=7000968;//kernel.TQuery:968
        e.extend(values);
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
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
  fiber$genKeyfunc :function _trc_TQuery_f_genKeyfunc(_thread,key) {
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
  maxs :function _trc_TQuery_maxs(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_38;
    var v;
    
    //$LASTPOS=7001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001210;//kernel.TQuery:1210
    _it_38=Tonyu.iterator(_this,1);
    while(_it_38.next()) {
      o=_it_38[0];
      
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
  fiber$maxs :function _trc_TQuery_f_maxs(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_38;
    var v;
    
    //$LASTPOS=7001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001210;//kernel.TQuery:1210
    _it_38=Tonyu.iterator(_this,1);
    while(_it_38.next()) {
      o=_it_38[0];
      
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
  mins :function _trc_TQuery_mins(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_45;
    var v;
    
    //$LASTPOS=7001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001480;//kernel.TQuery:1480
    _it_45=Tonyu.iterator(_this,1);
    while(_it_45.next()) {
      o=_it_45[0];
      
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
  fiber$mins :function _trc_TQuery_f_mins(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_45;
    var v;
    
    //$LASTPOS=7001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=7001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7001480;//kernel.TQuery:1480
    _it_45=Tonyu.iterator(_this,1);
    while(_it_45.next()) {
      o=_it_45[0];
      
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
  fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {
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
  fiber$withins :function _trc_TQuery_f_withins(_thread,xo,yd,d) {
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
    var _it_56;
    var v;
    
    //$LASTPOS=7002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=7002250;//kernel.TQuery:2250
    _it_56=Tonyu.iterator(_this,1);
    while(_it_56.next()) {
      o=_it_56[0];
      
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
  fiber$max :function _trc_TQuery_f_max(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_56;
    var v;
    
    //$LASTPOS=7002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=7002250;//kernel.TQuery:2250
    _it_56=Tonyu.iterator(_this,1);
    while(_it_56.next()) {
      o=_it_56[0];
      
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
  min :function _trc_TQuery_min(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_62;
    var v;
    
    //$LASTPOS=7002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=7002411;//kernel.TQuery:2411
    _it_62=Tonyu.iterator(_this,1);
    while(_it_62.next()) {
      o=_it_62[0];
      
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
  fiber$min :function _trc_TQuery_f_min(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_62;
    var v;
    
    //$LASTPOS=7002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=7002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=7002411;//kernel.TQuery:2411
    _it_62=Tonyu.iterator(_this,1);
    while(_it_62.next()) {
      o=_it_62[0];
      
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
  push :function _trc_TQuery_push(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=7002551;//kernel.TQuery:2551
    _this.length++;
  },
  fiber$push :function _trc_TQuery_f_push(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=7002551;//kernel.TQuery:2551
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
    var _it_68;
    
    //$LASTPOS=7002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7002626;//kernel.TQuery:2626
    _it_68=Tonyu.iterator(_this,1);
    while(_it_68.next()) {
      o=_it_68[0];
      
      //$LASTPOS=7002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=7002666;//kernel.TQuery:2666
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
    var _it_68;
    
    //$LASTPOS=7002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=7002626;//kernel.TQuery:2626
    _it_68=Tonyu.iterator(_this,1);
    while(_it_68.next()) {
      o=_it_68[0];
      
      //$LASTPOS=7002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=7002666;//kernel.TQuery:2666
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
    var _it_72;
    var f;
    
    //$LASTPOS=7002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=7002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=7002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=7002764;//kernel.TQuery:2764
    _it_72=Tonyu.iterator(_this,1);
    while(_it_72.next()) {
      o=_it_72[0];
      
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
  fiber$apply :function _trc_TQuery_f_apply(_thread,name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var o;
    var _it_72;
    var f;
    
    //$LASTPOS=7002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=7002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=7002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=7002764;//kernel.TQuery:2764
    _it_72=Tonyu.iterator(_this,1);
    while(_it_72.next()) {
      o=_it_72[0];
      
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
  alive :function _trc_TQuery_alive() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return ! o.isDead();
    });
  },
  fiber$alive :function _trc_TQuery_f_alive(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return ! o.isDead();
    });return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_TQuery_die() {
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
  fiber$die :function _trc_TQuery_f_die(_thread) {
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
  klass :function _trc_TQuery_klass(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return o instanceof k;
    });
  },
  fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
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
    
    //$LASTPOS=8000071;//kernel.InputDevice:71
    _this.listeners=[];
    //$LASTPOS=8000090;//kernel.InputDevice:90
    _this.touchEmu=true;
  },
  handleListeners :function _trc_InputDevice_handleListeners() {
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
  fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
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
  addOnetimeListener :function _trc_InputDevice_addOnetimeListener(l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000247;//kernel.InputDevice:247
    _this.listeners.push(l);
  },
  fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8000247;//kernel.InputDevice:247
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
  fiber$initCanvasEvents :function _trc_InputDevice_f_initCanvasEvents(_thread,cvj) {
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
    
    _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
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
  update :function _trc_InputDevice_update() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_106;
    
    //$LASTPOS=8002664;//kernel.InputDevice:2664
    _it_106=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_106.next()) {
      i=_it_106[0];
      
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
  fiber$update :function _trc_InputDevice_f_update(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_106;
    
    //$LASTPOS=8002664;//kernel.InputDevice:2664
    _it_106=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_106.next()) {
      i=_it_106[0];
      
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
  main :function _trc_Keys_main() {
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
  fiber$main :function _trc_Keys_f_main(_thread) {
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
  getkey :function _trc_Keys_getkey(code) {
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
  fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
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
  update :function _trc_Keys_update() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_114;
    
    //$LASTPOS=9001097;//kernel.Keys:1097
    _it_114=Tonyu.iterator(_this.stats,1);
    while(_it_114.next()) {
      i=_it_114[0];
      
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
  fiber$update :function _trc_Keys_f_update(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_114;
    
    //$LASTPOS=9001097;//kernel.Keys:1097
    _it_114=Tonyu.iterator(_this.stats,1);
    while(_it_114.next()) {
      i=_it_114[0];
      
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
  keydown :function _trc_Keys_keydown(e) {
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
  fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
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
  keyup :function _trc_Keys_keyup(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=9001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
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
Tonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod],{
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
    
    //$LASTPOS=10000195;//kernel.BaseActor:195
    if (Tonyu.runMode) {
      //$LASTPOS=10000429;//kernel.BaseActor:429
      _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      
    }
    //$LASTPOS=10000477;//kernel.BaseActor:477
    if (typeof  x=="object") {
      //$LASTPOS=10000501;//kernel.BaseActor:501
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=10000533;//kernel.BaseActor:533
      if (typeof  x=="number") {
        //$LASTPOS=10000568;//kernel.BaseActor:568
        _this.x=x;
        //$LASTPOS=10000587;//kernel.BaseActor:587
        _this.y=y;
        //$LASTPOS=10000606;//kernel.BaseActor:606
        _this.p=p;
        
      }
    }
    //$LASTPOS=10000628;//kernel.BaseActor:628
    if (_this.scaleX==null) {
      //$LASTPOS=10000646;//kernel.BaseActor:646
      _this.scaleX=1;
    }
    //$LASTPOS=10000661;//kernel.BaseActor:661
    if (_this.rotation==null) {
      //$LASTPOS=10000681;//kernel.BaseActor:681
      _this.rotation=0;
    }
    //$LASTPOS=10000698;//kernel.BaseActor:698
    if (_this.rotate==null) {
      //$LASTPOS=10000716;//kernel.BaseActor:716
      _this.rotate=0;
    }
    //$LASTPOS=10000731;//kernel.BaseActor:731
    if (_this.alpha==null) {
      //$LASTPOS=10000748;//kernel.BaseActor:748
      _this.alpha=255;
    }
    //$LASTPOS=10000764;//kernel.BaseActor:764
    if (_this.zOrder==null) {
      //$LASTPOS=10000782;//kernel.BaseActor:782
      _this.zOrder=0;
    }
    //$LASTPOS=10000797;//kernel.BaseActor:797
    if (_this.age==null) {
      //$LASTPOS=10000812;//kernel.BaseActor:812
      _this.age=0;
    }
    //$LASTPOS=10000824;//kernel.BaseActor:824
    if (_this.anim!=null&&typeof  _this.anim=="object") {
      //$LASTPOS=10000875;//kernel.BaseActor:875
      _this.animMode=true;
      //$LASTPOS=10000899;//kernel.BaseActor:899
      _this.animFrame=0;
      
    } else {
      //$LASTPOS=10000933;//kernel.BaseActor:933
      _this.animMode=false;
      
    }
    //$LASTPOS=10000961;//kernel.BaseActor:961
    if (_this.animFps==null) {
      //$LASTPOS=10000980;//kernel.BaseActor:980
      _this.animFps=1;
    }
  },
  extend :function _trc_BaseActor_extend(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  print :function _trc_BaseActor_print(pt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001084;//kernel.BaseActor:1084
    console.log.apply(console,arguments);
    //$LASTPOS=10001127;//kernel.BaseActor:1127
    if (Tonyu.globals.$consolePanel) {
      //$LASTPOS=10001155;//kernel.BaseActor:1155
      Tonyu.globals.$consolePanel.scroll(0,20);
      //$LASTPOS=10001192;//kernel.BaseActor:1192
      Tonyu.globals.$consolePanel.setFillStyle("white");
      //$LASTPOS=10001238;//kernel.BaseActor:1238
      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");
      
    }
  },
  setAnimFps :function _trc_BaseActor_setAnimFps(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001334;//kernel.BaseActor:1334
    _this.animFps=f;
    //$LASTPOS=10001355;//kernel.BaseActor:1355
    _this.animFrame=0;
    //$LASTPOS=10001378;//kernel.BaseActor:1378
    _this.animMode=true;
  },
  startAnim :function _trc_BaseActor_startAnim() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001428;//kernel.BaseActor:1428
    _this.animMode=true;
  },
  stopAnim :function _trc_BaseActor_stopAnim() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001477;//kernel.BaseActor:1477
    _this.animMode=false;
  },
  update :function _trc_BaseActor_update() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10001519;//kernel.BaseActor:1519
    _this.onUpdate();
    //$LASTPOS=10001536;//kernel.BaseActor:1536
    if (null) {
      //$LASTPOS=10001559;//kernel.BaseActor:1559
      null.suspend();
      //$LASTPOS=10001587;//kernel.BaseActor:1587
      if (Tonyu.globals.$Scheduler) {
        //$LASTPOS=10001603;//kernel.BaseActor:1603
        Tonyu.globals.$Scheduler.addToNext(null);
      }
      
    }
  },
  fiber$update :function _trc_BaseActor_f_update(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10001519;//kernel.BaseActor:1519
    _this.onUpdate();
    //$LASTPOS=10001536;//kernel.BaseActor:1536
    if (_thread) {
      //$LASTPOS=10001559;//kernel.BaseActor:1559
      _thread.suspend();
      //$LASTPOS=10001587;//kernel.BaseActor:1587
      if (Tonyu.globals.$Scheduler) {
        //$LASTPOS=10001603;//kernel.BaseActor:1603
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
    
    //$LASTPOS=10001697;//kernel.BaseActor:1697
    //$LASTPOS=10001701;//kernel.BaseActor:1701
    updateCount = 0;
    while(updateCount<updateT) {
      {
        //$LASTPOS=10001764;//kernel.BaseActor:1764
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
          //$LASTPOS=10001697;//kernel.BaseActor:1697
          //$LASTPOS=10001701;//kernel.BaseActor:1701
          updateCount = 0;;
        case 1:
          if (!(updateCount<updateT)) { __pc=3; break; }
          //$LASTPOS=10001764;//kernel.BaseActor:1764
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
    
    //$LASTPOS=10001907;//kernel.BaseActor:1907
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=10001932;//kernel.BaseActor:1932
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      
      //$LASTPOS=10001973;//kernel.BaseActor:1973
      if (s===_this) {
        return _this;
      }
      //$LASTPOS=10002004;//kernel.BaseActor:2004
      if (! c||s instanceof c) {
        //$LASTPOS=10002045;//kernel.BaseActor:2045
        res.push(s);
        
      }
    });
    return res;
  },
  allCrash :function _trc_BaseActor_allCrash(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var sp;
    var t1;
    
    //$LASTPOS=10002152;//kernel.BaseActor:2152
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=10002177;//kernel.BaseActor:2177
    sp = _this;
    //$LASTPOS=10002214;//kernel.BaseActor:2214
    t1 = _this.getCrashRect();
    //$LASTPOS=10002242;//kernel.BaseActor:2242
    if (! t1) {
      return res;
    }
    //$LASTPOS=10002268;//kernel.BaseActor:2268
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      var t2;
      
      //$LASTPOS=10002309;//kernel.BaseActor:2309
      t2;
      //$LASTPOS=10002326;//kernel.BaseActor:2326
      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
        //$LASTPOS=10002552;//kernel.BaseActor:2552
        res.push(s);
        
      }
    });
    return res;
  },
  crashTo :function _trc_BaseActor_crashTo(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10002632;//kernel.BaseActor:2632
    if (! t) {
      return false;
    }
    //$LASTPOS=10002659;//kernel.BaseActor:2659
    if (typeof  t=="function") {
      return _this.allCrash(t)[0];
      
    }
    return _this.crashTo1(t);
  },
  crashTo1 :function _trc_BaseActor_crashTo1(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t1;
    var t2;
    
    //$LASTPOS=10002782;//kernel.BaseActor:2782
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=10002910;//kernel.BaseActor:2910
    t1 = _this.getCrashRect();
    //$LASTPOS=10002938;//kernel.BaseActor:2938
    t2 = t.getCrashRect();
    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
  },
  getCrashRect :function _trc_BaseActor_getCrashRect() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var actWidth;
    var actHeight;
    
    //$LASTPOS=10003250;//kernel.BaseActor:3250
    actWidth = _this.width*_this.scaleX;actHeight;
    //$LASTPOS=10003293;//kernel.BaseActor:3293
    if (typeof  _this.scaleY==="undefined") {
      //$LASTPOS=10003335;//kernel.BaseActor:3335
      actHeight=_this.height*_this.scaleX;
      
    } else {
      //$LASTPOS=10003381;//kernel.BaseActor:3381
      actHeight=_this.height*_this.scaleY;
      
    }
    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
  },
  within :function _trc_BaseActor_within(t,distance) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10003618;//kernel.BaseActor:3618
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=10003657;//kernel.BaseActor:3657
    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
      return true;
      
    }
    return false;
  },
  watchHit :function _trc_BaseActor_watchHit(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10003842;//kernel.BaseActor:3842
    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {
      
      //$LASTPOS=10003893;//kernel.BaseActor:3893
      onHit.apply(_this,[a,b]);
    });
  },
  currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$Scheduler;
  },
  die :function _trc_BaseActor_die() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004047;//kernel.BaseActor:4047
    _this.killThreadGroup();
    //$LASTPOS=10004119;//kernel.BaseActor:4119
    _this.hide();
    //$LASTPOS=10004132;//kernel.BaseActor:4132
    _this.fireEvent("die");
    //$LASTPOS=10004155;//kernel.BaseActor:4155
    _this._isDead=true;
  },
  hide :function _trc_BaseActor_hide() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004334;//kernel.BaseActor:4334
    if (_this.layer&&typeof  _this.layer.remove=="function") {
      //$LASTPOS=10004389;//kernel.BaseActor:4389
      _this.layer.remove(_this);
      
    } else {
      //$LASTPOS=10004430;//kernel.BaseActor:4430
      Tonyu.globals.$Sprites.remove(_this);
      
    }
  },
  show :function _trc_BaseActor_show(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004491;//kernel.BaseActor:4491
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=10004543;//kernel.BaseActor:4543
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=10004581;//kernel.BaseActor:4581
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=10004613;//kernel.BaseActor:4613
    if (x!=null) {
      //$LASTPOS=10004626;//kernel.BaseActor:4626
      _this.x=x;
    }
    //$LASTPOS=10004641;//kernel.BaseActor:4641
    if (y!=null) {
      //$LASTPOS=10004654;//kernel.BaseActor:4654
      _this.y=y;
    }
    //$LASTPOS=10004669;//kernel.BaseActor:4669
    if (p!=null) {
      //$LASTPOS=10004682;//kernel.BaseActor:4682
      _this.p=p;
    }
  },
  detectShape :function _trc_BaseActor_detectShape() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004727;//kernel.BaseActor:4727
    if (typeof  _this.p!="number") {
      //$LASTPOS=10004762;//kernel.BaseActor:4762
      if (_this.text!=null) {
        return _this;
      }
      //$LASTPOS=10004795;//kernel.BaseActor:4795
      _this.p=0;
      
    }
    //$LASTPOS=10004812;//kernel.BaseActor:4812
    _this.p=Math.floor(_this.p);
    //$LASTPOS=10004834;//kernel.BaseActor:4834
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
    //$LASTPOS=10004872;//kernel.BaseActor:4872
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=10004896;//kernel.BaseActor:4896
    _this.width=_this.pImg.width;
    //$LASTPOS=10004919;//kernel.BaseActor:4919
    _this.height=_this.pImg.height;
  },
  waitFor :function _trc_BaseActor_waitFor(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10004962;//kernel.BaseActor:4962
    if (null) {
      //$LASTPOS=10004986;//kernel.BaseActor:4986
      null.waitFor(f);
      
    }
  },
  fiber$waitFor :function _trc_BaseActor_f_waitFor(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10004962;//kernel.BaseActor:4962
    if (_thread) {
      //$LASTPOS=10004986;//kernel.BaseActor:4986
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
    
    //$LASTPOS=10005106;//kernel.BaseActor:5106
    _this.age++;
    //$LASTPOS=10005118;//kernel.BaseActor:5118
    if (_this.animMode&&_this.age%_this.animFps==0) {
      //$LASTPOS=10005159;//kernel.BaseActor:5159
      _this.p=_this.anim[_this.animFrame%_this.anim.length];
      //$LASTPOS=10005199;//kernel.BaseActor:5199
      _this.animFrame++;
      
    }
  },
  draw :function _trc_BaseActor_draw(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=10005248;//kernel.BaseActor:5248
    if (_this.x==null||_this.y==null||_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=10005301;//kernel.BaseActor:5301
    _this.detectShape();
    //$LASTPOS=10005321;//kernel.BaseActor:5321
    if (_this.pImg) {
      //$LASTPOS=10005342;//kernel.BaseActor:5342
      ctx.save();
      //$LASTPOS=10005363;//kernel.BaseActor:5363
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=10005507;//kernel.BaseActor:5507
      _this.animation();
      //$LASTPOS=10005529;//kernel.BaseActor:5529
      if (_this.rotation!=0) {
        //$LASTPOS=10005564;//kernel.BaseActor:5564
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=10005632;//kernel.BaseActor:5632
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=10005689;//kernel.BaseActor:5689
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=10005741;//kernel.BaseActor:5741
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=10005806;//kernel.BaseActor:5806
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=10005862;//kernel.BaseActor:5862
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=10005903;//kernel.BaseActor:5903
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=10006035;//kernel.BaseActor:6035
      ctx.restore();
      
    } else {
      //$LASTPOS=10006062;//kernel.BaseActor:6062
      if (_this.text!==null&&_this.text!==undefined) {
        //$LASTPOS=10006110;//kernel.BaseActor:6110
        if (! _this.size) {
          //$LASTPOS=10006121;//kernel.BaseActor:6121
          _this.size=15;
        }
        //$LASTPOS=10006139;//kernel.BaseActor:6139
        if (! _this.align) {
          //$LASTPOS=10006151;//kernel.BaseActor:6151
          _this.align="center";
        }
        //$LASTPOS=10006176;//kernel.BaseActor:6176
        if (! _this.fillStyle) {
          //$LASTPOS=10006192;//kernel.BaseActor:6192
          _this.fillStyle="white";
        }
        //$LASTPOS=10006220;//kernel.BaseActor:6220
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=10006254;//kernel.BaseActor:6254
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=10006295;//kernel.BaseActor:6295
        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
        //$LASTPOS=10006366;//kernel.BaseActor:6366
        _this.width=rect.w;
        //$LASTPOS=10006389;//kernel.BaseActor:6389
        _this.height=rect.h;
        
      }
    }
    //$LASTPOS=10006416;//kernel.BaseActor:6416
    if (_this._fukidashi) {
      //$LASTPOS=10006443;//kernel.BaseActor:6443
      if (_this._fukidashi.c>0) {
        //$LASTPOS=10006478;//kernel.BaseActor:6478
        _this._fukidashi.c--;
        //$LASTPOS=10006507;//kernel.BaseActor:6507
        ctx.fillStyle="white";
        //$LASTPOS=10006543;//kernel.BaseActor:6543
        ctx.strokeStyle="black";
        //$LASTPOS=10006581;//kernel.BaseActor:6581
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
    
    //$LASTPOS=10006784;//kernel.BaseActor:6784
    if (! null) {
      throw new Error("runAsync should run in wait mode");
      
    }
    //$LASTPOS=10006856;//kernel.BaseActor:6856
    null.runAsync(f);
  },
  fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10006784;//kernel.BaseActor:6784
    if (! _thread) {
      throw new Error("runAsync should run in wait mode");
      
    }
    //$LASTPOS=10006856;//kernel.BaseActor:6856
    _thread.runAsync(f);
    
    _thread.retVal=_this;return;
  },
  screenOut :function _trc_BaseActor_screenOut(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=10006938;//kernel.BaseActor:6938
    if (! a) {
      //$LASTPOS=10006946;//kernel.BaseActor:6946
      a=0;
    }
    //$LASTPOS=10006956;//kernel.BaseActor:6956
    r = 0;
    //$LASTPOS=10006970;//kernel.BaseActor:6970
    viewX = 0;viewY = 0;
    //$LASTPOS=10006996;//kernel.BaseActor:6996
    if (_this.x<viewX+a) {
      //$LASTPOS=10007025;//kernel.BaseActor:7025
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=10007044;//kernel.BaseActor:7044
    if (_this.y<viewY+a) {
      //$LASTPOS=10007073;//kernel.BaseActor:7073
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=10007092;//kernel.BaseActor:7092
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=10007121;//kernel.BaseActor:7121
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=10007156;//kernel.BaseActor:7156
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=10007185;//kernel.BaseActor:7185
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
    
    //$LASTPOS=10006938;//kernel.BaseActor:6938
    if (! a) {
      //$LASTPOS=10006946;//kernel.BaseActor:6946
      a=0;
    }
    //$LASTPOS=10006956;//kernel.BaseActor:6956
    r = 0;
    //$LASTPOS=10006970;//kernel.BaseActor:6970
    viewX = 0;viewY = 0;
    //$LASTPOS=10006996;//kernel.BaseActor:6996
    if (_this.x<viewX+a) {
      //$LASTPOS=10007025;//kernel.BaseActor:7025
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=10007044;//kernel.BaseActor:7044
    if (_this.y<viewY+a) {
      //$LASTPOS=10007073;//kernel.BaseActor:7073
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=10007092;//kernel.BaseActor:7092
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=10007121;//kernel.BaseActor:7121
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=10007156;//kernel.BaseActor:7156
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=10007185;//kernel.BaseActor:7185
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    _thread.retVal=r;return;
    
    
    _thread.retVal=_this;return;
  },
  file :function _trc_BaseActor_file(path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var d;
    var files;
    
    //$LASTPOS=10007253;//kernel.BaseActor:7253
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=10007295;//kernel.BaseActor:7295
    files = d.rel("files/");
    return FS.get(files.rel(path),{topDir: d});
  },
  fiber$file :function _trc_BaseActor_f_file(_thread,path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var d;
    var files;
    
    //$LASTPOS=10007253;//kernel.BaseActor:7253
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=10007295;//kernel.BaseActor:7295
    files = d.rel("files/");
    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
    
    
    _thread.retVal=_this;return;
  },
  waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10007402;//kernel.BaseActor:7402
    if (fl!==false) {
      //$LASTPOS=10007429;//kernel.BaseActor:7429
      if (! _this.origTG) {
        
        
      }
      //$LASTPOS=10007581;//kernel.BaseActor:7581
      _this.a=_this.asyncResult();
      //$LASTPOS=10007607;//kernel.BaseActor:7607
      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
      //$LASTPOS=10007661;//kernel.BaseActor:7661
      _this.waitFor(_this.a);
      
    } else {
      //$LASTPOS=10007696;//kernel.BaseActor:7696
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
          //$LASTPOS=10007402;//kernel.BaseActor:7402
          if (!(fl!==false)) { __pc=3; break; }
          //$LASTPOS=10007429;//kernel.BaseActor:7429
          if (!(! _this.origTG)) { __pc=1; break; }
          {
            //$LASTPOS=10007483;//kernel.BaseActor:7483
            _this.origTG=_thread.group;
            //$LASTPOS=10007522;//kernel.BaseActor:7522
            _thread.setGroup(null);
          }
        case 1:
          
          //$LASTPOS=10007581;//kernel.BaseActor:7581
          _this.a=_this.asyncResult();
          //$LASTPOS=10007607;//kernel.BaseActor:7607
          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
          //$LASTPOS=10007661;//kernel.BaseActor:7661
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          __pc=5;break;
        case 3:
          //$LASTPOS=10007696;//kernel.BaseActor:7696
          if (!(_this.origTG)) { __pc=4; break; }
          {
            //$LASTPOS=10007749;//kernel.BaseActor:7749
            _thread.setGroup(_this.origTG);
            //$LASTPOS=10007792;//kernel.BaseActor:7792
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
    
    //$LASTPOS=10007865;//kernel.BaseActor:7865
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=10007901;//kernel.BaseActor:7901
    Tonyu.globals.$Screen.draw();
  },
  fiber$redrawScreen :function _trc_BaseActor_f_redrawScreen(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10007865;//kernel.BaseActor:7865
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=10007901;//kernel.BaseActor:7901
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
    
    //$LASTPOS=10008610;//kernel.BaseActor:8610
    _this.all().die();
    //$LASTPOS=10008628;//kernel.BaseActor:8628
    new page(arg);
    //$LASTPOS=10008648;//kernel.BaseActor:8648
    _this.die();
  },
  fiber$loadPage :function _trc_BaseActor_f_loadPage(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10008610;//kernel.BaseActor:8610
    _this.all().die();
    //$LASTPOS=10008628;//kernel.BaseActor:8628
    new page(arg);
    //$LASTPOS=10008648;//kernel.BaseActor:8648
    _this.die();
    
    _thread.retVal=_this;return;
  },
  setVisible :function _trc_BaseActor_setVisible(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10008683;//kernel.BaseActor:8683
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10008683;//kernel.BaseActor:8683
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventHandler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_EventHandler_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000020;//kernel.EventHandler:20
    _this.listeners=[];
  },
  fiber$main :function _trc_EventHandler_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000020;//kernel.EventHandler:20
    _this.listeners=[];
    
    _thread.retVal=_this;return;
  },
  addListener :function _trc_EventHandler_addListener(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    return {remove: function () {
      
      //$LASTPOS=11000125;//kernel.EventHandler:125
      _this.removeListener(f);
    }};
  },
  fiber$addListener :function _trc_EventHandler_f_addListener(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    
    _thread.enter(function _trc_EventHandler_ent_addListener(_thread) {
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
  removeListener :function _trc_EventHandler_removeListener(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=11000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=11000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
  },
  fiber$removeListener :function _trc_EventHandler_f_removeListener(_thread,f) {
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
  fire :function _trc_EventHandler_fire(args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var h;
    var _it_141;
    
    //$LASTPOS=11000272;//kernel.EventHandler:272
    if (_this.released) {
      return _this;
    }
    //$LASTPOS=11000299;//kernel.EventHandler:299
    _it_141=Tonyu.iterator(_this.listeners,1);
    while(_it_141.next()) {
      h=_it_141[0];
      
      //$LASTPOS=11000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
  },
  fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var h;
    var _it_141;
    
    //$LASTPOS=11000272;//kernel.EventHandler:272
    if (_this.released) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=11000299;//kernel.EventHandler:299
    _it_141=Tonyu.iterator(_this.listeners,1);
    while(_it_141.next()) {
      h=_it_141[0];
      
      //$LASTPOS=11000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
    
    _thread.retVal=_this;return;
  },
  release :function _trc_EventHandler_release() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000384;//kernel.EventHandler:384
    _this.released=true;
  },
  fiber$release :function _trc_EventHandler_f_release(_thread) {
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
  fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=12000057;//kernel.NoviceActor:57
      n=1;
    }
    
    _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
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
  initSprite :function _trc_NoviceActor_initSprite() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=12000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=12000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
  },
  fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
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
  say :function _trc_NoviceActor_say(text,size) {
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
  fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=12000268;//kernel.NoviceActor:268
      size=15;
    }
    
    _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
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
  sprite :function _trc_NoviceActor_sprite(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000371;//kernel.NoviceActor:371
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
          //$LASTPOS=12000371;//kernel.NoviceActor:371
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
    
    //$LASTPOS=12000403;//kernel.NoviceActor:403
    _this.go(x,y,p);
  },
  draw :function _trc_NoviceActor_draw(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000440;//kernel.NoviceActor:440
    _this._sprite.draw(ctx);
  },
  getCrashRect :function _trc_NoviceActor_getCrashRect() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._sprite.getCrashRect();
  },
  go :function _trc_NoviceActor_go(x,y,p) {
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
  fiber$go :function _trc_NoviceActor_f_go(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_NoviceActor_ent_go(_thread) {
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
  change :function _trc_NoviceActor_change(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000646;//kernel.NoviceActor:646
    _this.initSprite();
    //$LASTPOS=12000664;//kernel.NoviceActor:664
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
  main :function _trc_MML_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000050;//kernel.MML:50
    _this.mmlBuf=[];
  },
  fiber$main :function _trc_MML_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000050;//kernel.MML:50
    _this.mmlBuf=[];
    
    _thread.retVal=_this;return;
  },
  play :function _trc_MML_play(mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    //$LASTPOS=13000105;//kernel.MML:105
    if (! _this.isPlaying()) {
      //$LASTPOS=13000134;//kernel.MML:134
      _this.playNext();
      
    }
  },
  fiber$play :function _trc_MML_f_play(_thread,mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    
    _thread.enter(function _trc_MML_ent_play(_thread) {
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
  playNext :function _trc_MML_playNext() {
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
  fiber$playNext :function _trc_MML_f_playNext(_thread) {
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
  id :function _trc_MML_id() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=13000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    return _this._id;
  },
  fiber$id :function _trc_MML_f_id(_thread) {
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
    
    //$LASTPOS=13000755;//kernel.MML:755
    if (_this.m) {
      return _this.m.currentTime+_this.cTimeBase;
    }
    return - 1;
  },
  fiber$currentTime :function _trc_MML_f_currentTime(_thread) {
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
  stop :function _trc_MML_stop() {
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
  fiber$stop :function _trc_MML_f_stop(_thread) {
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
  releaseMML :function _trc_PlayMod_releaseMML() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_145;
    
    //$LASTPOS=14000322;//kernel.PlayMod:322
    if (Tonyu.globals.$MMLS) {
      //$LASTPOS=14000343;//kernel.PlayMod:343
      _it_145=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_145.next()) {
        k=_it_145[0];
        v=_it_145[1];
        
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
  play :function _trc_PlayMod_play() {
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
  fiber$play :function _trc_PlayMod_f_play(_thread) {
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
    
    _thread.enter(function _trc_PlayMod_ent_play(_thread) {
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
  playSE :function _trc_PlayMod_playSE() {
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
  main :function _trc_WaveTable_main() {
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
  fiber$main :function _trc_WaveTable_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=15000036;//kernel.WaveTable:36
    _this.env={};
    
    _thread.enter(function _trc_WaveTable_ent_main(_thread) {
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
  setWav :function _trc_WaveTable_setWav(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
  },
  fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
    
    _thread.retVal=_this;return;
  },
  setEnv :function _trc_WaveTable_setEnv(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000114;//kernel.WaveTable:114
    _this.env[num]=synth;
  },
  fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000114;//kernel.WaveTable:114
    _this.env[num]=synth;
    
    _thread.retVal=_this;return;
  },
  get :function _trc_WaveTable_get(w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var synth;
    
    //$LASTPOS=15000148;//kernel.WaveTable:148
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    return synth;
  },
  fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var synth;
    
    //$LASTPOS=15000148;//kernel.WaveTable:148
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.WaveTable,{"fullName":"kernel.WaveTable","namespace":"kernel","shortName":"WaveTable","decls":{"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ParallelMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
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
    //$LASTPOS=16000202;//kernel.ParallelMod:202
    th;
    //$LASTPOS=16000409;//kernel.ParallelMod:409
    th=Tonyu.globals.$Boot.schedule(_this,name,args);
    return th;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ParallelMod,{"fullName":"kernel.ParallelMod","namespace":"kernel","shortName":"ParallelMod","decls":{"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Scheduler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_Scheduler_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000033;//kernel.Scheduler:33
    _this.cur=[];
    //$LASTPOS=17000042;//kernel.Scheduler:42
    _this.next=[];
  },
  fiber$main :function _trc_Scheduler_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000033;//kernel.Scheduler:33
    _this.cur=[];
    //$LASTPOS=17000042;//kernel.Scheduler:42
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
    
    //$LASTPOS=17000197;//kernel.Scheduler:197
    name=name||"main";
    //$LASTPOS=17000221;//kernel.Scheduler:221
    args=args||[];
    //$LASTPOS=17000241;//kernel.Scheduler:241
    th = Tonyu.thread();
    //$LASTPOS=17000269;//kernel.Scheduler:269
    th.apply(obj,name,args);
    //$LASTPOS=17000299;//kernel.Scheduler:299
    _this.addToCur(th);
    return th;
  },
  fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var th;
    
    //$LASTPOS=17000197;//kernel.Scheduler:197
    name=name||"main";
    //$LASTPOS=17000221;//kernel.Scheduler:221
    args=args||[];
    //$LASTPOS=17000241;//kernel.Scheduler:241
    th = Tonyu.thread();
    //$LASTPOS=17000269;//kernel.Scheduler:269
    th.apply(obj,name,args);
    
    _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17000299;//kernel.Scheduler:299
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
    
    //$LASTPOS=17000354;//kernel.Scheduler:354
    _this.cur.push(th);
  },
  fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000354;//kernel.Scheduler:354
    _this.cur.push(th);
    
    _thread.retVal=_this;return;
  },
  addToNext :function _trc_Scheduler_addToNext(th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000394;//kernel.Scheduler:394
    _this.next.push(th);
  },
  fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000394;//kernel.Scheduler:394
    _this.next.push(th);
    
    _thread.retVal=_this;return;
  },
  stepsAll :function _trc_Scheduler_stepsAll() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t;
    var _it_160;
    
    //$LASTPOS=17000432;//kernel.Scheduler:432
    _it_160=Tonyu.iterator(_this.cur,1);
    while(_it_160.next()) {
      t=_it_160[0];
      
      //$LASTPOS=17000462;//kernel.Scheduler:462
      t.steps();
      
    }
    //$LASTPOS=17000485;//kernel.Scheduler:485
    _this.cur=_this.next;
    //$LASTPOS=17000500;//kernel.Scheduler:500
    _this.next=[];
  },
  fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var t;
    var _it_160;
    
    //$LASTPOS=17000432;//kernel.Scheduler:432
    _it_160=Tonyu.iterator(_this.cur,1);
    while(_it_160.next()) {
      t=_it_160[0];
      
      //$LASTPOS=17000462;//kernel.Scheduler:462
      t.steps();
      
    }
    //$LASTPOS=17000485;//kernel.Scheduler:485
    _this.cur=_this.next;
    //$LASTPOS=17000500;//kernel.Scheduler:500
    _this.next=[];
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Scheduler,{"fullName":"kernel.Scheduler","namespace":"kernel","shortName":"Scheduler","decls":{"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"stepsAll":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],{
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
    
    //$LASTPOS=18000105;//kernel.Actor:105
    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
    //$LASTPOS=18000124;//kernel.Actor:124
    if (Tonyu.runMode) {
      //$LASTPOS=18000143;//kernel.Actor:143
      _this.initSprite();
    }
  },
  initSprite :function _trc_Actor_initSprite() {
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
  fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
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
    
    _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Actor,{"fullName":"kernel.Actor","namespace":"kernel","shortName":"Actor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=19000060;//kernel.Map:60
    _this.sx=0;
    //$LASTPOS=19000071;//kernel.Map:71
    _this.sy=0;
    //$LASTPOS=19000082;//kernel.Map:82
    Tonyu.classes.kernel.Actor.apply( _this, [param]);
    //$LASTPOS=19000101;//kernel.Map:101
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=19000173;//kernel.Map:173
    _this.mapObj=true;
    //$LASTPOS=19000191;//kernel.Map:191
    _this.mapTable=[];
    //$LASTPOS=19000211;//kernel.Map:211
    _this.mapOnTable=[];
    //$LASTPOS=19000233;//kernel.Map:233
    //$LASTPOS=19000237;//kernel.Map:237
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=19000266;//kernel.Map:266
        _this.rows=[];
        //$LASTPOS=19000286;//kernel.Map:286
        //$LASTPOS=19000290;//kernel.Map:290
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=19000323;//kernel.Map:323
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=19000358;//kernel.Map:358
        _this.mapTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=19000391;//kernel.Map:391
    //$LASTPOS=19000395;//kernel.Map:395
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=19000424;//kernel.Map:424
        _this.rows=[];
        //$LASTPOS=19000444;//kernel.Map:444
        //$LASTPOS=19000448;//kernel.Map:448
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=19000481;//kernel.Map:481
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=19000516;//kernel.Map:516
        _this.mapOnTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=19000616;//kernel.Map:616
    _this.initMap();
  },
  initMap :function _trc_Map_initMap() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=19000648;//kernel.Map:648
    if (! _this.mapData) {
      return _this;
    }
    //$LASTPOS=19000674;//kernel.Map:674
    //$LASTPOS=19000678;//kernel.Map:678
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=19000707;//kernel.Map:707
        //$LASTPOS=19000711;//kernel.Map:711
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=19000744;//kernel.Map:744
            _this.set(j,i,_this.mapData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=19000791;//kernel.Map:791
    if (! _this.mapOnData) {
      return _this;
    }
    //$LASTPOS=19000819;//kernel.Map:819
    //$LASTPOS=19000823;//kernel.Map:823
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=19000852;//kernel.Map:852
        //$LASTPOS=19000856;//kernel.Map:856
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=19000889;//kernel.Map:889
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
    
    //$LASTPOS=19000648;//kernel.Map:648
    if (! _this.mapData) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_Map_ent_initMap(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19000674;//kernel.Map:674
          //$LASTPOS=19000678;//kernel.Map:678
          i = 0;;
        case 1:
          if (!(i<_this.row)) { __pc=5; break; }
          //$LASTPOS=19000707;//kernel.Map:707
          //$LASTPOS=19000711;//kernel.Map:711
          j = 0;;
        case 2:
          if (!(j<_this.col)) { __pc=4; break; }
          //$LASTPOS=19000744;//kernel.Map:744
          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
          __pc=3;return;
        case 3:
          
          j++;
          __pc=2;break;
        case 4:
          
          i++;
          __pc=1;break;
        case 5:
          
          //$LASTPOS=19000791;//kernel.Map:791
          if (!(! _this.mapOnData)) { __pc=6; break; }
          _thread.exit(_this);return;
        case 6:
          
          //$LASTPOS=19000819;//kernel.Map:819
          //$LASTPOS=19000823;//kernel.Map:823
          i = 0;;
        case 7:
          if (!(i<_this.row)) { __pc=11; break; }
          //$LASTPOS=19000852;//kernel.Map:852
          //$LASTPOS=19000856;//kernel.Map:856
          j = 0;;
        case 8:
          if (!(j<_this.col)) { __pc=10; break; }
          //$LASTPOS=19000889;//kernel.Map:889
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
    
    //$LASTPOS=19000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=19001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=19001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=19001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=19001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=19001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=19001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=19001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=19001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=19001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=19001296;//kernel.Map:1296
    _this.initMap();
  },
  fiber$load :function _trc_Map_f_load(_thread,dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=19001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=19001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=19001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=19001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=19001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=19001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=19001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=19001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=19001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    
    _thread.enter(function _trc_Map_ent_load(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19001296;//kernel.Map:1296
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
    
    //$LASTPOS=19001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=19001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=19001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=19001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=19001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=19001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      return _this;
      
    }
    //$LASTPOS=19001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=19001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001933;//kernel.Map:1933
    _this.ctx.restore();
  },
  fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=19001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=19001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=19001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=19001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=19001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=19001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=19001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001933;//kernel.Map:1933
    _this.ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setOn :function _trc_Map_setOn(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=19002050;//kernel.Map:2050
    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
    //$LASTPOS=19002100;//kernel.Map:2100
    _this.mapOnTable[setRow][setCol]=p;
    //$LASTPOS=19002135;//kernel.Map:2135
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19002169;//kernel.Map:2169
    p=Math.floor(p);
    //$LASTPOS=19002191;//kernel.Map:2191
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=19002229;//kernel.Map:2229
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=19002253;//kernel.Map:2253
    _this.ctx.save();
    //$LASTPOS=19002270;//kernel.Map:2270
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19002414;//kernel.Map:2414
    _this.ctx.restore();
  },
  fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_Map_ent_setOn(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19002050;//kernel.Map:2050
          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=19002100;//kernel.Map:2100
          _this.mapOnTable[setRow][setCol]=p;
          //$LASTPOS=19002135;//kernel.Map:2135
          _this.ctx=_this.buf[0].getContext("2d");
          //$LASTPOS=19002169;//kernel.Map:2169
          p=Math.floor(p);
          //$LASTPOS=19002191;//kernel.Map:2191
          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
          //$LASTPOS=19002229;//kernel.Map:2229
          if (!(! _this.pImg)) { __pc=2; break; }
          _thread.exit(_this);return;
        case 2:
          
          //$LASTPOS=19002253;//kernel.Map:2253
          _this.ctx.save();
          //$LASTPOS=19002270;//kernel.Map:2270
          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
          //$LASTPOS=19002414;//kernel.Map:2414
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002461;//kernel.Map:2461
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
          //$LASTPOS=19002461;//kernel.Map:2461
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
    
    //$LASTPOS=19002556;//kernel.Map:2556
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
          //$LASTPOS=19002556;//kernel.Map:2556
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
    
    //$LASTPOS=19002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002649;//kernel.Map:2649
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
    
    //$LASTPOS=19002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapOnTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002881;//kernel.Map:2881
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
    
    //$LASTPOS=19003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=19003142;//kernel.Map:3142
    _this.sy=- scrollY;
  },
  fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=19003142;//kernel.Map:3142
    _this.sy=- scrollY;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_Map_draw(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19003177;//kernel.Map:3177
    _this.pImg=_this.buf[0];
    //$LASTPOS=19003195;//kernel.Map:3195
    ctx.save();
    //$LASTPOS=19003212;//kernel.Map:3212
    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
    //$LASTPOS=19003324;//kernel.Map:3324
    ctx.restore();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Panel=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=20000072;//kernel.Panel:72
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=20000089;//kernel.Panel:89
    _this.width=_this.width;
    //$LASTPOS=20000112;//kernel.Panel:112
    _this.height=_this.height;
    //$LASTPOS=20000137;//kernel.Panel:137
    if (_this.align==null) {
      //$LASTPOS=20000153;//kernel.Panel:153
      _this.align="center";
    }
    //$LASTPOS=20000174;//kernel.Panel:174
    if (_this.alpha==null) {
      //$LASTPOS=20000190;//kernel.Panel:190
      _this.alpha=255;
    }
    //$LASTPOS=20000206;//kernel.Panel:206
    if (_this._drawn==null) {
      //$LASTPOS=20000223;//kernel.Panel:223
      _this._drawn=false;
    }
    //$LASTPOS=20000242;//kernel.Panel:242
    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
  },
  setPanel :function _trc_Panel_setPanel(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=20000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=20000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
  },
  fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=20000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=20000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
    
    _thread.retVal=_this;return;
  },
  resize :function _trc_Panel_resize(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000432;//kernel.Panel:432
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
          //$LASTPOS=20000432;//kernel.Panel:432
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
    
    //$LASTPOS=20000480;//kernel.Panel:480
    _this._drawn=true;
    return _this.buf[0].getContext("2d");
  },
  fiber$getContext :function _trc_Panel_f_getContext(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000480;//kernel.Panel:480
    _this._drawn=true;
    _thread.retVal=_this.buf[0].getContext("2d");return;
    
    
    _thread.retVal=_this;return;
  },
  setFillStyle :function _trc_Panel_setFillStyle(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000561;//kernel.Panel:561
    _this.fillStyle=color;
  },
  fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000561;//kernel.Panel:561
    _this.fillStyle=color;
    
    _thread.retVal=_this;return;
  },
  fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000629;//kernel.Panel:629
    _this.ctx=_this.getContext();
    //$LASTPOS=20000652;//kernel.Panel:652
    _this.ctx.save();
    //$LASTPOS=20000719;//kernel.Panel:719
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=20000749;//kernel.Panel:749
    _this.ctx.fillRect(x,y,rectWidth,rectHeight);
    //$LASTPOS=20000794;//kernel.Panel:794
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
          //$LASTPOS=20000629;//kernel.Panel:629
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=20000652;//kernel.Panel:652
          _this.ctx.save();
          //$LASTPOS=20000719;//kernel.Panel:719
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=20000749;//kernel.Panel:749
          _this.ctx.fillRect(x,y,rectWidth,rectHeight);
          //$LASTPOS=20000794;//kernel.Panel:794
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  fillText :function _trc_Panel_fillText(text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000850;//kernel.Panel:850
    _this.ctx=_this.getContext();
    //$LASTPOS=20000873;//kernel.Panel:873
    _this.ctx.save();
    //$LASTPOS=20000940;//kernel.Panel:940
    _this.ctx.textAlign=align;
    //$LASTPOS=20000968;//kernel.Panel:968
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=20000998;//kernel.Panel:998
    _this.ctx.font=size+"px 'Courier New'";
    //$LASTPOS=20001037;//kernel.Panel:1037
    _this.ctx.fillText(text,x,y);
    //$LASTPOS=20001066;//kernel.Panel:1066
    _this.ctx.restore();
  },
  fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_Panel_ent_fillText(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20000850;//kernel.Panel:850
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=20000873;//kernel.Panel:873
          _this.ctx.save();
          //$LASTPOS=20000940;//kernel.Panel:940
          _this.ctx.textAlign=align;
          //$LASTPOS=20000968;//kernel.Panel:968
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=20000998;//kernel.Panel:998
          _this.ctx.font=size+"px 'Courier New'";
          //$LASTPOS=20001037;//kernel.Panel:1037
          _this.ctx.fillText(text,x,y);
          //$LASTPOS=20001066;//kernel.Panel:1066
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001131;//kernel.Panel:1131
    _this.ctx=_this.getContext();
    //$LASTPOS=20001154;//kernel.Panel:1154
    _this.ctx.save();
    //$LASTPOS=20001171;//kernel.Panel:1171
    _this.ctx.clearRect(clearX,clearY,clearW,clearH);
    //$LASTPOS=20001220;//kernel.Panel:1220
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
          //$LASTPOS=20001131;//kernel.Panel:1131
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=20001154;//kernel.Panel:1154
          _this.ctx.save();
          //$LASTPOS=20001171;//kernel.Panel:1171
          _this.ctx.clearRect(clearX,clearY,clearW,clearH);
          //$LASTPOS=20001220;//kernel.Panel:1220
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getPixel :function _trc_Panel_getPixel(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001266;//kernel.Panel:1266
    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
      //$LASTPOS=20001365;//kernel.Panel:1365
      _this.ctx=_this.getContext();
      //$LASTPOS=20001392;//kernel.Panel:1392
      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
      //$LASTPOS=20001444;//kernel.Panel:1444
      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
      
    } else {
      //$LASTPOS=20001584;//kernel.Panel:1584
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
          //$LASTPOS=20001266;//kernel.Panel:1266
          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
          //$LASTPOS=20001365;//kernel.Panel:1365
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=20001392;//kernel.Panel:1392
          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
          //$LASTPOS=20001444;//kernel.Panel:1444
          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
          __pc=3;break;
        case 2:
          {
            //$LASTPOS=20001584;//kernel.Panel:1584
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
    
    //$LASTPOS=20001671;//kernel.Panel:1671
    _this.ctx=_this.getContext();
    //$LASTPOS=20001694;//kernel.Panel:1694
    _this.ctx.save();
    //$LASTPOS=20001711;//kernel.Panel:1711
    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
    //$LASTPOS=20001772;//kernel.Panel:1772
    _this.clearRect(0,0,_this.width,_this.height);
    //$LASTPOS=20001806;//kernel.Panel:1806
    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
    //$LASTPOS=20001858;//kernel.Panel:1858
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
          //$LASTPOS=20001671;//kernel.Panel:1671
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=20001694;//kernel.Panel:1694
          _this.ctx.save();
          //$LASTPOS=20001711;//kernel.Panel:1711
          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
          //$LASTPOS=20001772;//kernel.Panel:1772
          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=20001806;//kernel.Panel:1806
          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
          //$LASTPOS=20001858;//kernel.Panel:1858
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_Panel_draw(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001894;//kernel.Panel:1894
    if (_this._drawn) {
      //$LASTPOS=20001915;//kernel.Panel:1915
      _this.pImg=_this.buf[0];
      //$LASTPOS=20001937;//kernel.Panel:1937
      ctx.save();
      //$LASTPOS=20001958;//kernel.Panel:1958
      if (_this.align=="left") {
        //$LASTPOS=20001990;//kernel.Panel:1990
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=20002042;//kernel.Panel:2042
        if (_this.align=="center") {
          //$LASTPOS=20002076;//kernel.Panel:2076
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=20002111;//kernel.Panel:2111
          if (_this.align=="right") {
            //$LASTPOS=20002144;//kernel.Panel:2144
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=20002201;//kernel.Panel:2201
      if (_this.rotation!=0) {
        //$LASTPOS=20002236;//kernel.Panel:2236
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=20002304;//kernel.Panel:2304
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=20002361;//kernel.Panel:2361
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=20002402;//kernel.Panel:2402
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=20002506;//kernel.Panel:2506
      ctx.restore();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=21000095;//kernel.ScaledCanvas:95
    _this.extend(opt);
    //$LASTPOS=21000142;//kernel.ScaledCanvas:142
    _this.resize(_this.width,_this.height);
    //$LASTPOS=21000170;//kernel.ScaledCanvas:170
    _this.cw=_this.canvas.width();
    //$LASTPOS=21000194;//kernel.ScaledCanvas:194
    _this.ch=_this.canvas.height();
    //$LASTPOS=21000219;//kernel.ScaledCanvas:219
    _this.cctx=_this.canvas[0].getContext("2d");
    //$LASTPOS=21000257;//kernel.ScaledCanvas:257
    _this.color="rgb(20,80,180)";
    //$LASTPOS=21000291;//kernel.ScaledCanvas:291
    _this.sx=0;
    //$LASTPOS=21000302;//kernel.ScaledCanvas:302
    _this.sy=0;
    //$LASTPOS=21000313;//kernel.ScaledCanvas:313
    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
  },
  resize :function _trc_ScaledCanvas_resize(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=21000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=21000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=21000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=21000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=21000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=21000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=21000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
  },
  fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=21000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=21000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=21000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=21000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=21000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=21000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=21000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
    
    _thread.retVal=_this;return;
  },
  shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var larger;
    var smaller;
    
    //$LASTPOS=21000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=21000733;//kernel.ScaledCanvas:733
    smaller = 5;
    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
  },
  fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var larger;
    var smaller;
    
    //$LASTPOS=21000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=21000733;//kernel.ScaledCanvas:733
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
    
    //$LASTPOS=21000868;//kernel.ScaledCanvas:868
    _this.cw=_this.canvas.width();
    //$LASTPOS=21000892;//kernel.ScaledCanvas:892
    _this.ch=_this.canvas.height();
    //$LASTPOS=21000917;//kernel.ScaledCanvas:917
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=21000961;//kernel.ScaledCanvas:961
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=21001005;//kernel.ScaledCanvas:1005
    if (calch>_this.ch) {
      //$LASTPOS=21001019;//kernel.ScaledCanvas:1019
      calch=_this.ch;
    }
    //$LASTPOS=21001034;//kernel.ScaledCanvas:1034
    if (calcw>_this.cw) {
      //$LASTPOS=21001048;//kernel.ScaledCanvas:1048
      calcw=_this.cw;
    }
    //$LASTPOS=21001063;//kernel.ScaledCanvas:1063
    _this.cctx.clearRect(0,0,_this.cw,_this.ch);
    //$LASTPOS=21001095;//kernel.ScaledCanvas:1095
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=21001151;//kernel.ScaledCanvas:1151
      calcw=_this.width;
      //$LASTPOS=21001163;//kernel.ScaledCanvas:1163
      calch=_this.height;
      
    }
    //$LASTPOS=21001189;//kernel.ScaledCanvas:1189
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=21001232;//kernel.ScaledCanvas:1232
    marginh = Math.floor((_this.ch-calch)/2);
    //$LASTPOS=21001275;//kernel.ScaledCanvas:1275
    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
  },
  canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=21001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=21001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=21001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=21001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=21001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=21001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=21001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=21001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=21001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=21001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=21001673;//kernel.ScaledCanvas:1673
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
    
    //$LASTPOS=21001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=21001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=21001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=21001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=21001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=21001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=21001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=21001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=21001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=21001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=21001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001835;//kernel.ScaledCanvas:1835
    _this.color=color;
  },
  fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21001835;//kernel.ScaledCanvas:1835
    _this.color=color;
    
    _thread.retVal=_this;return;
  },
  fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    
    //$LASTPOS=21001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=21001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=21001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=21001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=21001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=21002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=21002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=21002068;//kernel.ScaledCanvas:2068
    ctx.restore();
  },
  fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    
    //$LASTPOS=21001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=21001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=21001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=21001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=21001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=21002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=21002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=21002068;//kernel.ScaledCanvas:2068
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
  },
  fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=22000045;//kernel.Sprites:45
    _this.sprites=[];
    //$LASTPOS=22000062;//kernel.Sprites:62
    _this.imageList=[];
    //$LASTPOS=22000081;//kernel.Sprites:81
    _this.hitWatchers=[];
    //$LASTPOS=22000102;//kernel.Sprites:102
    _this.isDrawGrid=Tonyu.noviceMode;
    //$LASTPOS=22000136;//kernel.Sprites:136
    _this.sx=0;
    //$LASTPOS=22000147;//kernel.Sprites:147
    _this.sy=0;
    //$LASTPOS=22000158;//kernel.Sprites:158
    _this.objId=0;
  },
  add :function _trc_Sprites_add(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      return _this;
    }
    //$LASTPOS=22000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=22000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=22000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=22000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=22000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    return s;
  },
  fiber$add :function _trc_Sprites_f_add(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=22000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=22000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=22000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=22000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=22000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  remove :function _trc_Sprites_remove(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var idx;
    
    //$LASTPOS=22000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=22000433;//kernel.Sprites:433
    if (idx<0) {
      return _this;
    }
    //$LASTPOS=22000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=22000485;//kernel.Sprites:485
    delete s.__addedToSprites;
  },
  fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var idx;
    
    //$LASTPOS=22000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=22000433;//kernel.Sprites:433
    if (idx<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=22000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=22000485;//kernel.Sprites:485
    delete s.__addedToSprites;
    
    _thread.retVal=_this;return;
  },
  removeOneframes :function _trc_Sprites_removeOneframes() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=22000542;//kernel.Sprites:542
    //$LASTPOS=22000547;//kernel.Sprites:547
    i = _this.sprites.length-1;
    while(i>=0) {
      {
        //$LASTPOS=22000595;//kernel.Sprites:595
        if (_this.sprites[i].oneframeSprite) {
          //$LASTPOS=22000641;//kernel.Sprites:641
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
    
    //$LASTPOS=22000542;//kernel.Sprites:542
    //$LASTPOS=22000547;//kernel.Sprites:547
    i = _this.sprites.length-1;
    while(i>=0) {
      {
        //$LASTPOS=22000595;//kernel.Sprites:595
        if (_this.sprites[i].oneframeSprite) {
          //$LASTPOS=22000641;//kernel.Sprites:641
          _this.sprites.splice(i,1);
          
        }
      }
      i--;
    }
    
    _thread.retVal=_this;return;
  },
  clear :function _trc_Sprites_clear() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000702;//kernel.Sprites:702
    _this.sprites.splice(0,_this.sprites.length);
  },
  fiber$clear :function _trc_Sprites_f_clear(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000702;//kernel.Sprites:702
    _this.sprites.splice(0,_this.sprites.length);
    
    _thread.retVal=_this;return;
  },
  compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var val1;
    var val2;
    
    //$LASTPOS=22000775;//kernel.Sprites:775
    val1 = obj1.zOrder;
    //$LASTPOS=22000802;//kernel.Sprites:802
    val2 = obj2.zOrder;
    //$LASTPOS=22000829;//kernel.Sprites:829
    if (val1>val2) {
      return - 1;
      
    } else {
      //$LASTPOS=22000875;//kernel.Sprites:875
      if (val1<val2) {
        return 1;
        
      } else {
        //$LASTPOS=22000920;//kernel.Sprites:920
        if (val1==val2) {
          //$LASTPOS=22000945;//kernel.Sprites:945
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
    
    //$LASTPOS=22000775;//kernel.Sprites:775
    val1 = obj1.zOrder;
    //$LASTPOS=22000802;//kernel.Sprites:802
    val2 = obj2.zOrder;
    //$LASTPOS=22000829;//kernel.Sprites:829
    if (val1>val2) {
      _thread.retVal=- 1;return;
      
      
    } else {
      //$LASTPOS=22000875;//kernel.Sprites:875
      if (val1<val2) {
        _thread.retVal=1;return;
        
        
      } else {
        //$LASTPOS=22000920;//kernel.Sprites:920
        if (val1==val2) {
          //$LASTPOS=22000945;//kernel.Sprites:945
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
    
    //$LASTPOS=22001105;//kernel.Sprites:1105
    ctx = cv.getContext("2d");
    //$LASTPOS=22001139;//kernel.Sprites:1139
    ctx.save();
    //$LASTPOS=22001284;//kernel.Sprites:1284
    orderArray = [];
    //$LASTPOS=22001308;//kernel.Sprites:1308
    orderArray=orderArray.concat(_this.sprites);
    //$LASTPOS=22001352;//kernel.Sprites:1352
    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
    //$LASTPOS=22001385;//kernel.Sprites:1385
    ctx.translate(- _this.sx,- _this.sy);
    //$LASTPOS=22001414;//kernel.Sprites:1414
    orderArray.forEach(function (s) {
      
      //$LASTPOS=22001448;//kernel.Sprites:1448
      s.draw(ctx);
    });
    //$LASTPOS=22001475;//kernel.Sprites:1475
    ctx.restore();
  },
  checkHit :function _trc_Sprites_checkHit() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001521;//kernel.Sprites:1521
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=22001565;//kernel.Sprites:1565
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=22001653;//kernel.Sprites:1653
        a_owner = a;
        //$LASTPOS=22001695;//kernel.Sprites:1695
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=22001748;//kernel.Sprites:1748
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=22001796;//kernel.Sprites:1796
          b_owner = b;
          //$LASTPOS=22001842;//kernel.Sprites:1842
          if (a===b) {
            return _this;
          }
          //$LASTPOS=22001878;//kernel.Sprites:1878
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=22001983;//kernel.Sprites:1983
          if (a.crashTo1(b)) {
            //$LASTPOS=22002086;//kernel.Sprites:2086
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
  },
  fiber$checkHit :function _trc_Sprites_f_checkHit(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22001521;//kernel.Sprites:1521
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=22001565;//kernel.Sprites:1565
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=22001653;//kernel.Sprites:1653
        a_owner = a;
        //$LASTPOS=22001695;//kernel.Sprites:1695
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=22001748;//kernel.Sprites:1748
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=22001796;//kernel.Sprites:1796
          b_owner = b;
          //$LASTPOS=22001842;//kernel.Sprites:1842
          if (a===b) {
            return _this;
          }
          //$LASTPOS=22001878;//kernel.Sprites:1878
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=22001983;//kernel.Sprites:1983
          if (a.crashTo1(b)) {
            //$LASTPOS=22002086;//kernel.Sprites:2086
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
    
    _thread.retVal=_this;return;
  },
  watchHit :function _trc_Sprites_watchHit(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=22002216;//kernel.Sprites:2216
    p = {A: typeA,B: typeB,h: onHit};
    //$LASTPOS=22002280;//kernel.Sprites:2280
    _this.hitWatchers.push(p);
  },
  drawGrid :function _trc_Sprites_drawGrid(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var i;
    
    //$LASTPOS=22002333;//kernel.Sprites:2333
    ctx = c.getContext("2d");
    //$LASTPOS=22002366;//kernel.Sprites:2366
    ctx.textBaseline="top";
    //$LASTPOS=22002395;//kernel.Sprites:2395
    ctx.save();
    //$LASTPOS=22002412;//kernel.Sprites:2412
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=22002452;//kernel.Sprites:2452
    //$LASTPOS=22002457;//kernel.Sprites:2457
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=22002497;//kernel.Sprites:2497
        ctx.beginPath();
        //$LASTPOS=22002523;//kernel.Sprites:2523
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=22002569;//kernel.Sprites:2569
        ctx.moveTo(i,0);
        //$LASTPOS=22002595;//kernel.Sprites:2595
        ctx.lineTo(i,c.height);
        //$LASTPOS=22002628;//kernel.Sprites:2628
        ctx.closePath();
        //$LASTPOS=22002654;//kernel.Sprites:2654
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=22002686;//kernel.Sprites:2686
    //$LASTPOS=22002691;//kernel.Sprites:2691
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=22002732;//kernel.Sprites:2732
        ctx.beginPath();
        //$LASTPOS=22002758;//kernel.Sprites:2758
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=22002804;//kernel.Sprites:2804
        ctx.moveTo(0,i);
        //$LASTPOS=22002830;//kernel.Sprites:2830
        ctx.lineTo(c.width,i);
        //$LASTPOS=22002862;//kernel.Sprites:2862
        ctx.closePath();
        //$LASTPOS=22002888;//kernel.Sprites:2888
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=22002914;//kernel.Sprites:2914
    ctx.fillStyle="white";
    //$LASTPOS=22002942;//kernel.Sprites:2942
    ctx.font="15px monospaced";
    //$LASTPOS=22002975;//kernel.Sprites:2975
    //$LASTPOS=22002980;//kernel.Sprites:2980
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=22003023;//kernel.Sprites:3023
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=22003057;//kernel.Sprites:3057
    //$LASTPOS=22003062;//kernel.Sprites:3062
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=22003106;//kernel.Sprites:3106
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=22003140;//kernel.Sprites:3140
    ctx.restore();
  },
  fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    var i;
    
    //$LASTPOS=22002333;//kernel.Sprites:2333
    ctx = c.getContext("2d");
    //$LASTPOS=22002366;//kernel.Sprites:2366
    ctx.textBaseline="top";
    //$LASTPOS=22002395;//kernel.Sprites:2395
    ctx.save();
    //$LASTPOS=22002412;//kernel.Sprites:2412
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=22002452;//kernel.Sprites:2452
    //$LASTPOS=22002457;//kernel.Sprites:2457
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=22002497;//kernel.Sprites:2497
        ctx.beginPath();
        //$LASTPOS=22002523;//kernel.Sprites:2523
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=22002569;//kernel.Sprites:2569
        ctx.moveTo(i,0);
        //$LASTPOS=22002595;//kernel.Sprites:2595
        ctx.lineTo(i,c.height);
        //$LASTPOS=22002628;//kernel.Sprites:2628
        ctx.closePath();
        //$LASTPOS=22002654;//kernel.Sprites:2654
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=22002686;//kernel.Sprites:2686
    //$LASTPOS=22002691;//kernel.Sprites:2691
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=22002732;//kernel.Sprites:2732
        ctx.beginPath();
        //$LASTPOS=22002758;//kernel.Sprites:2758
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=22002804;//kernel.Sprites:2804
        ctx.moveTo(0,i);
        //$LASTPOS=22002830;//kernel.Sprites:2830
        ctx.lineTo(c.width,i);
        //$LASTPOS=22002862;//kernel.Sprites:2862
        ctx.closePath();
        //$LASTPOS=22002888;//kernel.Sprites:2888
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=22002914;//kernel.Sprites:2914
    ctx.fillStyle="white";
    //$LASTPOS=22002942;//kernel.Sprites:2942
    ctx.font="15px monospaced";
    //$LASTPOS=22002975;//kernel.Sprites:2975
    //$LASTPOS=22002980;//kernel.Sprites:2980
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=22003023;//kernel.Sprites:3023
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=22003057;//kernel.Sprites:3057
    //$LASTPOS=22003062;//kernel.Sprites:3062
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=22003106;//kernel.Sprites:3106
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=22003140;//kernel.Sprites:3140
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setImageList :function _trc_Sprites_setImageList(il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22003192;//kernel.Sprites:3192
    _this.imageList=il;
  },
  fiber$setImageList :function _trc_Sprites_f_setImageList(_thread,il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22003192;//kernel.Sprites:3192
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
    
    //$LASTPOS=22003304;//kernel.Sprites:3304
    _this.sx=scrollX;
    //$LASTPOS=22003321;//kernel.Sprites:3321
    _this.sy=scrollY;
  },
  fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22003304;//kernel.Sprites:3304
    _this.sx=scrollX;
    //$LASTPOS=22003321;//kernel.Sprites:3321
    _this.sy=scrollY;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Mod=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=23000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    return new b2Vec2(tx/_this.scale,ty/_this.scale);
  },
  fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    
    //$LASTPOS=23000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_T2World_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000150;//kernel.T2World:150
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
          //$LASTPOS=24000150;//kernel.T2World:150
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
    
    //$LASTPOS=24000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    //$LASTPOS=24000133;//kernel.T2World:133
    _this.initWorld();
  },
  fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    
    _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000133;//kernel.T2World:133
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
    
    //$LASTPOS=24000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=24000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=24000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=24000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=24000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=24000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=24000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=24000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=24000533;//kernel.T2World:533
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
  },
  fiber$initWorld :function _trc_T2World_f_initWorld(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=24000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=24000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=24000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=24000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=24000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=24000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=24000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=24000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=24000533;//kernel.T2World:533
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
    
    _thread.retVal=_this;return;
  },
  releaseWorld :function _trc_T2World_releaseWorld() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=24000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
  },
  fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=24000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
    
    _thread.retVal=_this;return;
  },
  loop :function _trc_T2World_loop() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000641;//kernel.T2World:641
    while (true) {
      //$LASTPOS=24000664;//kernel.T2World:664
      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
      //$LASTPOS=24000831;//kernel.T2World:831
      _this.world.DrawDebugData();
      //$LASTPOS=24000863;//kernel.T2World:863
      _this.world.ClearForces();
      //$LASTPOS=24000893;//kernel.T2World:893
      _this.updatePos();
      //$LASTPOS=24000915;//kernel.T2World:915
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
          //$LASTPOS=24000641;//kernel.T2World:641
        case 1:
          //$LASTPOS=24000664;//kernel.T2World:664
          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
          //$LASTPOS=24000831;//kernel.T2World:831
          _this.world.DrawDebugData();
          //$LASTPOS=24000863;//kernel.T2World:863
          _this.world.ClearForces();
          //$LASTPOS=24000893;//kernel.T2World:893
          _this.fiber$updatePos(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=24000915;//kernel.T2World:915
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
  updatePos :function _trc_T2World_updatePos() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b;
    var d;
    
    //$LASTPOS=24000956;//kernel.T2World:956
    //$LASTPOS=24000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=24001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=24001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=24001053;//kernel.T2World:1053
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
    
    //$LASTPOS=24000956;//kernel.T2World:956
    //$LASTPOS=24000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=24001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=24001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=24001053;//kernel.T2World:1053
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MediaPlayer,{"fullName":"kernel.MediaPlayer","namespace":"kernel","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=25000069;//kernel.T2MediaPlayer:69
    _this.initT2MediaPlayer();
  },
  initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      return _this;
    }
    //$LASTPOS=25000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=25000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=25000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
  },
  fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=25000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=25000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=25000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    
    _thread.retVal=_this;return;
  },
  clearSEData :function _trc_T2MediaPlayer_clearSEData() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=25000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
  },
  fiber$clearSEData :function _trc_T2MediaPlayer_f_clearSEData(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=25000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
    
    _thread.retVal=_this;return;
  },
  clearBGMData :function _trc_T2MediaPlayer_clearBGMData() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000367;//kernel.T2MediaPlayer:367
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
          //$LASTPOS=25000367;//kernel.T2MediaPlayer:367
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
    
    //$LASTPOS=25000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
  },
  fiber$deleteSEData :function _trc_T2MediaPlayer_f_deleteSEData(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
    
    _thread.retVal=_this;return;
  },
  loadSE :function _trc_T2MediaPlayer_loadSE(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    var cnt;
    
    //$LASTPOS=25000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=25000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=25000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    //$LASTPOS=25000616;//kernel.T2MediaPlayer:616
    while (data==null) {
      //$LASTPOS=25000648;//kernel.T2MediaPlayer:648
      _this.update();
      //$LASTPOS=25000667;//kernel.T2MediaPlayer:667
      data=T2MediaLib.getSEData(idx);
      //$LASTPOS=25000710;//kernel.T2MediaPlayer:710
      cnt++;
      
    }
    return data;
  },
  fiber$loadSE :function _trc_T2MediaPlayer_f_loadSE(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    var cnt;
    
    //$LASTPOS=25000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=25000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=25000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    
    _thread.enter(function _trc_T2MediaPlayer_ent_loadSE(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000616;//kernel.T2MediaPlayer:616
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=25000648;//kernel.T2MediaPlayer:648
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=25000667;//kernel.T2MediaPlayer:667
          data=T2MediaLib.getSEData(idx);
          //$LASTPOS=25000710;//kernel.T2MediaPlayer:710
          cnt++;
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  loadFromProject :function _trc_T2MediaPlayer_loadFromProject(prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var s;
    var _it_200;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=25000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=25000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      return _this;
    }
    //$LASTPOS=25000945;//kernel.T2MediaPlayer:945
    _it_200=Tonyu.iterator(r.sounds,1);
    while(_it_200.next()) {
      s=_it_200[0];
      
      //$LASTPOS=25000981;//kernel.T2MediaPlayer:981
      name = s.name;url = s.url;
      //$LASTPOS=25001019;//kernel.T2MediaPlayer:1019
      ls = /^ls:(.*)/.exec(url);
      //$LASTPOS=25001058;//kernel.T2MediaPlayer:1058
      if (ls) {
        //$LASTPOS=25001081;//kernel.T2MediaPlayer:1081
        f = prj.getDir().rel(ls[1]);
        //$LASTPOS=25001125;//kernel.T2MediaPlayer:1125
        if (f.exists()) {
          //$LASTPOS=25001160;//kernel.T2MediaPlayer:1160
          url=f.text();
          //$LASTPOS=25001191;//kernel.T2MediaPlayer:1191
          Tonyu.globals.$lastURL=url;
          
        }
        
      }
      //$LASTPOS=25001242;//kernel.T2MediaPlayer:1242
      Tonyu.setGlobal(name,name);
      //$LASTPOS=25001281;//kernel.T2MediaPlayer:1281
      _this.print("Loading Sound: "+name);
      //$LASTPOS=25001322;//kernel.T2MediaPlayer:1322
      _this.loadSE(name,url);
      
    }
  },
  fiber$loadFromProject :function _trc_T2MediaPlayer_f_loadFromProject(_thread,prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var s;
    var _it_200;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=25000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=25000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25000945;//kernel.T2MediaPlayer:945
          _it_200=Tonyu.iterator(r.sounds,1);
        case 1:
          if (!(_it_200.next())) { __pc=3; break; }
          s=_it_200[0];
          
          //$LASTPOS=25000981;//kernel.T2MediaPlayer:981
          name = s.name;url = s.url;
          //$LASTPOS=25001019;//kernel.T2MediaPlayer:1019
          ls = /^ls:(.*)/.exec(url);
          //$LASTPOS=25001058;//kernel.T2MediaPlayer:1058
          if (ls) {
            //$LASTPOS=25001081;//kernel.T2MediaPlayer:1081
            f = prj.getDir().rel(ls[1]);
            //$LASTPOS=25001125;//kernel.T2MediaPlayer:1125
            if (f.exists()) {
              //$LASTPOS=25001160;//kernel.T2MediaPlayer:1160
              url=f.text();
              //$LASTPOS=25001191;//kernel.T2MediaPlayer:1191
              Tonyu.globals.$lastURL=url;
              
            }
            
          }
          //$LASTPOS=25001242;//kernel.T2MediaPlayer:1242
          Tonyu.setGlobal(name,name);
          //$LASTPOS=25001281;//kernel.T2MediaPlayer:1281
          _this.print("Loading Sound: "+name);
          //$LASTPOS=25001322;//kernel.T2MediaPlayer:1322
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
  playSE :function _trc_T2MediaPlayer_playSE(idx,vol,rate,offset,loop,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25001503;//kernel.T2MediaPlayer:1503
    if (vol==null) {
      //$LASTPOS=25001520;//kernel.T2MediaPlayer:1520
      vol=128;
    }
    //$LASTPOS=25001609;//kernel.T2MediaPlayer:1609
    if (vol<0) {
      //$LASTPOS=25001629;//kernel.T2MediaPlayer:1629
      vol=0;
    } else {
      //$LASTPOS=25001650;//kernel.T2MediaPlayer:1650
      if (vol>128) {
        //$LASTPOS=25001665;//kernel.T2MediaPlayer:1665
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
    
    //$LASTPOS=25001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=25002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    //$LASTPOS=25002060;//kernel.T2MediaPlayer:2060
    while (data==null) {
      //$LASTPOS=25002092;//kernel.T2MediaPlayer:2092
      _this.update();
      //$LASTPOS=25002111;//kernel.T2MediaPlayer:2111
      data=T2MediaLib.getBGMData(idx);
      
    }
    return data;
  },
  fiber$loadBGM :function _trc_T2MediaPlayer_f_loadBGM(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    
    //$LASTPOS=25001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=25002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    
    _thread.enter(function _trc_T2MediaPlayer_ent_loadBGM(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25002060;//kernel.T2MediaPlayer:2060
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=25002092;//kernel.T2MediaPlayer:2092
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=25002111;//kernel.T2MediaPlayer:2111
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
    
    //$LASTPOS=25002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=25002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=25002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=25002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=25002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=25002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=25002291;//kernel.T2MediaPlayer:2291
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
    
    //$LASTPOS=25002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=25002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=25002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=25002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=25002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(0,vol);
  },
  fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=25002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=25002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=25002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=25002728;//kernel.T2MediaPlayer:2728
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
    
    //$LASTPOS=25003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=25003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=25003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=25003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=25003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=25003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=25003291;//kernel.T2MediaPlayer:3291
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
    
    //$LASTPOS=25003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=25003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=25003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=25003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=25003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(id,vol);
  },
  fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=25003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=25003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=25003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=25003750;//kernel.T2MediaPlayer:3750
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
    
    //$LASTPOS=25004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
  },
  fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
    
    _thread.retVal=_this;return;
  },
  loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    //$LASTPOS=25004351;//kernel.T2MediaPlayer:4351
    while (T2MediaLib.getAudioData(idx)==null) {
      //$LASTPOS=25004396;//kernel.T2MediaPlayer:4396
      _this.update();
    }
  },
  fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    
    _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=25004351;//kernel.T2MediaPlayer:4351
        case 1:
          if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
          //$LASTPOS=25004396;//kernel.T2MediaPlayer:4396
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
    
    //$LASTPOS=25004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=25004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=25004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=25004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    return T2MediaLib.playAudio(idx,loop,startTime);
  },
  fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=25004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=25004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=25004514;//kernel.T2MediaPlayer:4514
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
    
    //$LASTPOS=25004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=25004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=25004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=25004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=25004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    return T2MediaLib.setAudioVolume(vol);
  },
  fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=25004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=25004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=25004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=25004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=25004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=25005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=25005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    return T2MediaLib.setAudioTempo(tempo);
  },
  fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=25004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=25005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=25005026;//kernel.T2MediaPlayer:5026
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2MediaPlayer,{"fullName":"kernel.T2MediaPlayer","namespace":"kernel","shortName":"T2MediaPlayer","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"clearSEData":{"nowait":false},"clearBGMData":{"nowait":false},"deleteSEData":{"nowait":false},"loadSE":{"nowait":false},"loadFromProject":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEData":{"nowait":false},"loadBGM":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"setBGMVolume":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getBGMData":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"sizeBGMID":{"nowait":false},"allStopBGM":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlainChar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
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
    
    //$LASTPOS=26000066;//kernel.PlainChar:66
    if (Tonyu.runMode) {
      //$LASTPOS=26000309;//kernel.PlainChar:309
      _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
      //$LASTPOS=26000355;//kernel.PlainChar:355
      _this.initSprite();
      
    }
    //$LASTPOS=26000381;//kernel.PlainChar:381
    if (typeof  x=="object") {
      //$LASTPOS=26000405;//kernel.PlainChar:405
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=26000437;//kernel.PlainChar:437
      if (typeof  x=="number") {
        //$LASTPOS=26000472;//kernel.PlainChar:472
        _this.x=x;
        //$LASTPOS=26000491;//kernel.PlainChar:491
        _this.y=y;
        //$LASTPOS=26000510;//kernel.PlainChar:510
        _this.p=p;
        
      }
    }
  },
  draw :function _trc_PlainChar_draw(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000547;//kernel.PlainChar:547
    _this.onDraw();
    //$LASTPOS=26000562;//kernel.PlainChar:562
    if (_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=26000593;//kernel.PlainChar:593
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  setVisible :function _trc_PlainChar_setVisible(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000634;//kernel.PlainChar:634
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000634;//kernel.PlainChar:634
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
    
    //$LASTPOS=26000690;//kernel.PlainChar:690
    _this.onUpdate();
    //$LASTPOS=26000707;//kernel.PlainChar:707
    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
  },
  fiber$update :function _trc_PlainChar_f_update(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000690;//kernel.PlainChar:690
    _this.onUpdate();
    
    _thread.enter(function _trc_PlainChar_ent_update(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26000707;//kernel.PlainChar:707
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
    
    //$LASTPOS=26000768;//kernel.PlainChar:768
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=26000820;//kernel.PlainChar:820
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=26000858;//kernel.PlainChar:858
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=26000890;//kernel.PlainChar:890
    _this.onAppear();
  },
  fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000768;//kernel.PlainChar:768
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=26000820;//kernel.PlainChar:820
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=26000858;//kernel.PlainChar:858
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=26000890;//kernel.PlainChar:890
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
    
    //$LASTPOS=26000922;//kernel.PlainChar:922
    _this.main();
    //$LASTPOS=26000935;//kernel.PlainChar:935
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
          //$LASTPOS=26000922;//kernel.PlainChar:922
          _this.fiber$main(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=26000935;//kernel.PlainChar:935
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
    
    //$LASTPOS=26001673;//kernel.PlainChar:1673
    _this.all().die();
    //$LASTPOS=26001691;//kernel.PlainChar:1691
    new page(arg);
    //$LASTPOS=26001711;//kernel.PlainChar:1711
    _this.die();
  },
  fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26001673;//kernel.PlainChar:1673
    _this.all().die();
    //$LASTPOS=26001691;//kernel.PlainChar:1691
    new page(arg);
    //$LASTPOS=26001711;//kernel.PlainChar:1711
    _this.die();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
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
  draw :function _trc_SpriteChar_draw(c) {
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
    
    //$LASTPOS=29000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
  },
  fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=29000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
    
    _thread.retVal=_this;return;
  },
  load :function _trc_T1Map_load(fileName) {
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
  fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
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
    
    _thread.enter(function _trc_T1Map_ent_load(_thread) {
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
  conv :function _trc_T1Map_conv(mat,tbl) {
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
  fiber$conv :function _trc_T1Map_f_conv(_thread,mat,tbl) {
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
  fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=30000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=30000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    
    _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
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
Tonyu.classes.kernel.TextChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[Tonyu.classes.kernel.TextRectMod],{
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
    
    //$LASTPOS=32000070;//kernel.TextChar:70
    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
    //$LASTPOS=32000089;//kernel.TextChar:89
    _this.text="";
    //$LASTPOS=32000103;//kernel.TextChar:103
    _this.col=Tonyu.globals.$clWhite;
    //$LASTPOS=32000122;//kernel.TextChar:122
    _this.size=20;
    //$LASTPOS=32000136;//kernel.TextChar:136
    if (! _this.x) {
      //$LASTPOS=32000149;//kernel.TextChar:149
      _this.x=0;
    }
    //$LASTPOS=32000164;//kernel.TextChar:164
    if (! _this.y) {
      //$LASTPOS=32000177;//kernel.TextChar:177
      _this.y=0;
    }
    //$LASTPOS=32000192;//kernel.TextChar:192
    if (t) {
      //$LASTPOS=32000199;//kernel.TextChar:199
      _this.text=t;
    }
    //$LASTPOS=32000212;//kernel.TextChar:212
    if (c) {
      //$LASTPOS=32000219;//kernel.TextChar:219
      _this.fillStyle=c;
    }
    //$LASTPOS=32000237;//kernel.TextChar:237
    if (s) {
      //$LASTPOS=32000244;//kernel.TextChar:244
      _this.size=s;
    }
  },
  draw :function _trc_TextChar_draw(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=32000274;//kernel.TextChar:274
    if (! _this.size) {
      //$LASTPOS=32000285;//kernel.TextChar:285
      _this.size=15;
    }
    //$LASTPOS=32000299;//kernel.TextChar:299
    if (! _this.align) {
      //$LASTPOS=32000311;//kernel.TextChar:311
      _this.align="left";
    }
    //$LASTPOS=32000330;//kernel.TextChar:330
    if (! _this.fillStyle) {
      //$LASTPOS=32000346;//kernel.TextChar:346
      _this.fillStyle="white";
    }
    //$LASTPOS=32000370;//kernel.TextChar:370
    ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=32000400;//kernel.TextChar:400
    ctx.globalAlpha=_this.alpha/255;
    //$LASTPOS=32000437;//kernel.TextChar:437
    ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=32000473;//kernel.TextChar:473
    rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
    //$LASTPOS=32000540;//kernel.TextChar:540
    _this.width=rect.w;
    //$LASTPOS=32000559;//kernel.TextChar:559
    _this.height=rect.h;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_MapEditor_main() {
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
  fiber$main :function _trc_MapEditor_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=33000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=33000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    
    _thread.enter(function _trc_MapEditor_ent_main(_thread) {
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
  main :function _trc_Pad_main() {
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
  fiber$main :function _trc_Pad_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    
    _thread.enter(function _trc_Pad_ent_main(_thread) {
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
  initialize :function _trc_Pad_initialize(opt) {
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
  die :function _trc_Pad_die() {
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
  padUpdate :function _trc_Pad_padUpdate() {
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
  fiber$padUpdate :function _trc_Pad_f_padUpdate(_thread) {
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
    
    //$LASTPOS=34002940;//kernel.Pad:2940
    value;
    //$LASTPOS=34002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=34002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {
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
    
    //$LASTPOS=34003163;//kernel.Pad:3163
    value;
    //$LASTPOS=34003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=34003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Pad,{"fullName":"kernel.Pad","namespace":"kernel","shortName":"Pad","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Ball=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Ball_main() {
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
  fiber$main :function _trc_Ball_f_main(_thread) {
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
    
    _thread.enter(function _trc_Ball_ent_main(_thread) {
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
  kabe :function _trc_Ball_kabe(xx,yy) {
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
  fiber$kabe :function _trc_Ball_f_kabe(_thread,xx,yy) {
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
  onUpdate :function _trc_Ball_onUpdate() {
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
  crashTo :function _trc_Ball_crashTo(pp,xx,yy) {
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
  getWidth :function _trc_Ball_getWidth() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getWidth :function _trc_Ball_f_getWidth(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=32;return;
    
    
    _thread.retVal=_this;return;
  },
  getHeight :function _trc_Ball_getHeight() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getHeight :function _trc_Ball_f_getHeight(_thread) {
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
  main :function _trc_Enemy_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_Enemy_f_main(_thread) {
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
  main :function _trc_IndexPage_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    var mapObj;
    var mx;
    var my;
    
    //$LASTPOS=36000002;//kernel.IndexPage:2
    Tonyu.globals.$MAP_ARY_WIDTH=3;
    //$LASTPOS=36000036;//kernel.IndexPage:36
    Tonyu.globals.$MAP_ARY_HEIGHT=3;
    //$LASTPOS=36000070;//kernel.IndexPage:70
    Tonyu.globals.$MAP_CHIP_COL=64;
    //$LASTPOS=36000098;//kernel.IndexPage:98
    Tonyu.globals.$MAP_CHIP_ROW=64;
    //$LASTPOS=36000126;//kernel.IndexPage:126
    Tonyu.globals.$MAP_CHIP_PAT_WIDTH=16;
    //$LASTPOS=36000171;//kernel.IndexPage:171
    Tonyu.globals.$MAP_CHIP_PAT_HEIGHT=16;
    //$LASTPOS=36000217;//kernel.IndexPage:217
    Tonyu.globals.$MAP_SCROLL_MX=- 1;
    //$LASTPOS=36000251;//kernel.IndexPage:251
    Tonyu.globals.$MAP_SCROLL_MY=- 1;
    //$LASTPOS=36000287;//kernel.IndexPage:287
    Tonyu.globals.$Screen.resize(560,384);
    //$LASTPOS=36000342;//kernel.IndexPage:342
    Tonyu.globals.$viewX=0;
    //$LASTPOS=36000354;//kernel.IndexPage:354
    Tonyu.globals.$viewY=0;
    //$LASTPOS=36000366;//kernel.IndexPage:366
    Tonyu.globals.$mapAry=[];
    //$LASTPOS=36000380;//kernel.IndexPage:380
    //$LASTPOS=36000385;//kernel.IndexPage:385
    j = 0;
    while(j<Tonyu.globals.$MAP_ARY_HEIGHT) {
      {
        //$LASTPOS=36000424;//kernel.IndexPage:424
        //$LASTPOS=36000429;//kernel.IndexPage:429
        i = 0;
        while(i<Tonyu.globals.$MAP_ARY_WIDTH) {
          {
            //$LASTPOS=36000471;//kernel.IndexPage:471
            mapObj = new Tonyu.classes.kernel.Map({chipWidth: Tonyu.globals.$MAP_CHIP_PAT_WIDTH,chipHeight: Tonyu.globals.$MAP_CHIP_PAT_HEIGHT});
            //$LASTPOS=36000565;//kernel.IndexPage:565
            mapObj.load("map.json");
            //$LASTPOS=36000598;//kernel.IndexPage:598
            mx = (Tonyu.globals.$MAP_CHIP_COL*Tonyu.globals.$MAP_CHIP_PAT_WIDTH)*(i+Tonyu.globals.$MAP_SCROLL_MX);
            //$LASTPOS=36000677;//kernel.IndexPage:677
            my = (Tonyu.globals.$MAP_CHIP_ROW*Tonyu.globals.$MAP_CHIP_PAT_HEIGHT)*(j+Tonyu.globals.$MAP_SCROLL_MY);
            //$LASTPOS=36000757;//kernel.IndexPage:757
            mapObj.scrollTo(- mx,- my);
            //$LASTPOS=36000792;//kernel.IndexPage:792
            mapObj.zOrder=200;
            //$LASTPOS=36000821;//kernel.IndexPage:821
            Tonyu.globals.$mapAry[i+j*Tonyu.globals.$MAP_ARY_WIDTH]=mapObj;
          }
          i++;
        }
      }
      j++;
    }
    //$LASTPOS=36000870;//kernel.IndexPage:870
    Tonyu.globals.$map=Tonyu.globals.$mapAry[0];
    //$LASTPOS=36000890;//kernel.IndexPage:890
    //$LASTPOS=36000895;//kernel.IndexPage:895
    i = 0;
    while(i<10) {
      //$LASTPOS=36000915;//kernel.IndexPage:915
      _this.update();
      i++;
    }
    //$LASTPOS=36000925;//kernel.IndexPage:925
    Tonyu.globals.$pat_table=Tonyu.globals.$pat_mapchip;
    //$LASTPOS=36000969;//kernel.IndexPage:969
    if (! Tonyu.globals.$mplayer) {
      //$LASTPOS=36000984;//kernel.IndexPage:984
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MusicPlayer;
    }
    //$LASTPOS=36001013;//kernel.IndexPage:1013
    Tonyu.globals.$player=new Tonyu.classes.kernel.Player({x: 79,y: 314,p: 5});
    //$LASTPOS=36001053;//kernel.IndexPage:1053
    Tonyu.globals.$ball=new Tonyu.classes.kernel.Ball({x: 112,y: 186,p: 12});
    //$LASTPOS=36001091;//kernel.IndexPage:1091
    Tonyu.globals.$racket=new Tonyu.classes.kernel.Racket({x: 113,y: 219,p: 17});
    //$LASTPOS=36001133;//kernel.IndexPage:1133
    Tonyu.globals.$tokuten=new Tonyu.classes.kernel.Tokuten({x: 314,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
    //$LASTPOS=36001200;//kernel.IndexPage:1200
    Tonyu.globals.$tokuten_1=new Tonyu.classes.kernel.Tokuten({x: 278,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 6});
    //$LASTPOS=36001268;//kernel.IndexPage:1268
    Tonyu.globals.$tokuten_2=new Tonyu.classes.kernel.Tokuten({x: 218,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
    //$LASTPOS=36001337;//kernel.IndexPage:1337
    Tonyu.globals.$tokuten.next=Tonyu.globals.$tokuten_1;
    //$LASTPOS=36001365;//kernel.IndexPage:1365
    Tonyu.globals.$tokuten_1.next=Tonyu.globals.$tokuten_2;
    //$LASTPOS=36001395;//kernel.IndexPage:1395
    Tonyu.globals.$pass=new Tonyu.classes.kernel.Pass({x: - 39,y: 55,p: Tonyu.globals.$pat_table+20});
    //$LASTPOS=36001443;//kernel.IndexPage:1443
    Tonyu.globals.$lap1=new Tonyu.classes.kernel.Lap({x: 219,y: 74,text: "1st:",size: 15,fillStyle: "white"});
    //$LASTPOS=36001514;//kernel.IndexPage:1514
    Tonyu.globals.$lap2=new Tonyu.classes.kernel.Lap({x: 215,y: 97,text: "2nd:",size: 15,fillStyle: "white"});
    //$LASTPOS=36001585;//kernel.IndexPage:1585
    Tonyu.globals.$lap3=new Tonyu.classes.kernel.Lap({x: 200,y: 119,text: "Final :",size: 15,fillStyle: "white"});
  },
  fiber$main :function _trc_IndexPage_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var j;
    var i;
    var mapObj;
    var mx;
    var my;
    
    //$LASTPOS=36000002;//kernel.IndexPage:2
    Tonyu.globals.$MAP_ARY_WIDTH=3;
    //$LASTPOS=36000036;//kernel.IndexPage:36
    Tonyu.globals.$MAP_ARY_HEIGHT=3;
    //$LASTPOS=36000070;//kernel.IndexPage:70
    Tonyu.globals.$MAP_CHIP_COL=64;
    //$LASTPOS=36000098;//kernel.IndexPage:98
    Tonyu.globals.$MAP_CHIP_ROW=64;
    //$LASTPOS=36000126;//kernel.IndexPage:126
    Tonyu.globals.$MAP_CHIP_PAT_WIDTH=16;
    //$LASTPOS=36000171;//kernel.IndexPage:171
    Tonyu.globals.$MAP_CHIP_PAT_HEIGHT=16;
    //$LASTPOS=36000217;//kernel.IndexPage:217
    Tonyu.globals.$MAP_SCROLL_MX=- 1;
    //$LASTPOS=36000251;//kernel.IndexPage:251
    Tonyu.globals.$MAP_SCROLL_MY=- 1;
    //$LASTPOS=36000287;//kernel.IndexPage:287
    Tonyu.globals.$Screen.resize(560,384);
    //$LASTPOS=36000342;//kernel.IndexPage:342
    Tonyu.globals.$viewX=0;
    //$LASTPOS=36000354;//kernel.IndexPage:354
    Tonyu.globals.$viewY=0;
    //$LASTPOS=36000366;//kernel.IndexPage:366
    Tonyu.globals.$mapAry=[];
    //$LASTPOS=36000380;//kernel.IndexPage:380
    //$LASTPOS=36000385;//kernel.IndexPage:385
    j = 0;
    while(j<Tonyu.globals.$MAP_ARY_HEIGHT) {
      {
        //$LASTPOS=36000424;//kernel.IndexPage:424
        //$LASTPOS=36000429;//kernel.IndexPage:429
        i = 0;
        while(i<Tonyu.globals.$MAP_ARY_WIDTH) {
          {
            //$LASTPOS=36000471;//kernel.IndexPage:471
            mapObj = new Tonyu.classes.kernel.Map({chipWidth: Tonyu.globals.$MAP_CHIP_PAT_WIDTH,chipHeight: Tonyu.globals.$MAP_CHIP_PAT_HEIGHT});
            //$LASTPOS=36000565;//kernel.IndexPage:565
            mapObj.load("map.json");
            //$LASTPOS=36000598;//kernel.IndexPage:598
            mx = (Tonyu.globals.$MAP_CHIP_COL*Tonyu.globals.$MAP_CHIP_PAT_WIDTH)*(i+Tonyu.globals.$MAP_SCROLL_MX);
            //$LASTPOS=36000677;//kernel.IndexPage:677
            my = (Tonyu.globals.$MAP_CHIP_ROW*Tonyu.globals.$MAP_CHIP_PAT_HEIGHT)*(j+Tonyu.globals.$MAP_SCROLL_MY);
            //$LASTPOS=36000757;//kernel.IndexPage:757
            mapObj.scrollTo(- mx,- my);
            //$LASTPOS=36000792;//kernel.IndexPage:792
            mapObj.zOrder=200;
            //$LASTPOS=36000821;//kernel.IndexPage:821
            Tonyu.globals.$mapAry[i+j*Tonyu.globals.$MAP_ARY_WIDTH]=mapObj;
          }
          i++;
        }
      }
      j++;
    }
    //$LASTPOS=36000870;//kernel.IndexPage:870
    Tonyu.globals.$map=Tonyu.globals.$mapAry[0];
    
    _thread.enter(function _trc_IndexPage_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=36000890;//kernel.IndexPage:890
          //$LASTPOS=36000895;//kernel.IndexPage:895
          i = 0;;
        case 1:
          if (!(i<10)) { __pc=3; break; }
          //$LASTPOS=36000915;//kernel.IndexPage:915
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          i++;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=36000925;//kernel.IndexPage:925
          Tonyu.globals.$pat_table=Tonyu.globals.$pat_mapchip;
          //$LASTPOS=36000969;//kernel.IndexPage:969
          if (! Tonyu.globals.$mplayer) {
            //$LASTPOS=36000984;//kernel.IndexPage:984
            Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MusicPlayer;
          }
          //$LASTPOS=36001013;//kernel.IndexPage:1013
          Tonyu.globals.$player=new Tonyu.classes.kernel.Player({x: 79,y: 314,p: 5});
          //$LASTPOS=36001053;//kernel.IndexPage:1053
          Tonyu.globals.$ball=new Tonyu.classes.kernel.Ball({x: 112,y: 186,p: 12});
          //$LASTPOS=36001091;//kernel.IndexPage:1091
          Tonyu.globals.$racket=new Tonyu.classes.kernel.Racket({x: 113,y: 219,p: 17});
          //$LASTPOS=36001133;//kernel.IndexPage:1133
          Tonyu.globals.$tokuten=new Tonyu.classes.kernel.Tokuten({x: 314,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
          //$LASTPOS=36001200;//kernel.IndexPage:1200
          Tonyu.globals.$tokuten_1=new Tonyu.classes.kernel.Tokuten({x: 278,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 6});
          //$LASTPOS=36001268;//kernel.IndexPage:1268
          Tonyu.globals.$tokuten_2=new Tonyu.classes.kernel.Tokuten({x: 218,y: 38,p: Tonyu.globals.$pat_tokuten+0,nextInc: 10});
          //$LASTPOS=36001337;//kernel.IndexPage:1337
          Tonyu.globals.$tokuten.next=Tonyu.globals.$tokuten_1;
          //$LASTPOS=36001365;//kernel.IndexPage:1365
          Tonyu.globals.$tokuten_1.next=Tonyu.globals.$tokuten_2;
          //$LASTPOS=36001395;//kernel.IndexPage:1395
          Tonyu.globals.$pass=new Tonyu.classes.kernel.Pass({x: - 39,y: 55,p: Tonyu.globals.$pat_table+20});
          //$LASTPOS=36001443;//kernel.IndexPage:1443
          Tonyu.globals.$lap1=new Tonyu.classes.kernel.Lap({x: 219,y: 74,text: "1st:",size: 15,fillStyle: "white"});
          //$LASTPOS=36001514;//kernel.IndexPage:1514
          Tonyu.globals.$lap2=new Tonyu.classes.kernel.Lap({x: 215,y: 97,text: "2nd:",size: 15,fillStyle: "white"});
          //$LASTPOS=36001585;//kernel.IndexPage:1585
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
  main :function _trc_Lap_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000001;//kernel.Lap:1
    _this.align="left";
  },
  fiber$main :function _trc_Lap_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=37000001;//kernel.Lap:1
    _this.align="left";
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Lap,{"fullName":"kernel.Lap","namespace":"kernel","shortName":"Lap","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Main_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000002;//kernel.Main:2
    Tonyu.globals.$mplayer=null;
    //$LASTPOS=38000019;//kernel.Main:19
    Tonyu.globals.$Boot.setFrameRate(60,5);
    //$LASTPOS=38000046;//kernel.Main:46
    new Tonyu.classes.kernel.PageLoader;
  },
  fiber$main :function _trc_Main_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=38000002;//kernel.Main:2
    Tonyu.globals.$mplayer=null;
    //$LASTPOS=38000019;//kernel.Main:19
    Tonyu.globals.$Boot.setFrameRate(60,5);
    //$LASTPOS=38000046;//kernel.Main:46
    new Tonyu.classes.kernel.PageLoader;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main,{"fullName":"kernel.Main","namespace":"kernel","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_MusicPlayer_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=39000029;//kernel.MusicPlayer:29
    _this.SOUND_OBJ_ARY_SIZE=20;
    //$LASTPOS=39000068;//kernel.MusicPlayer:68
    _this.SOUND_PART_OBJ_ARY_SIZE=3;
    //$LASTPOS=39000126;//kernel.MusicPlayer:126
    _this.soundObjAryCnt=0;
    //$LASTPOS=39000146;//kernel.MusicPlayer:146
    _this.soundObjAry=[];
    //$LASTPOS=39000164;//kernel.MusicPlayer:164
    //$LASTPOS=39000169;//kernel.MusicPlayer:169
    i = 0;
    while(i<_this.SOUND_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=39000211;//kernel.MusicPlayer:211
        _this.soundObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=39000255;//kernel.MusicPlayer:255
    _this.soundPartObjAry=[];
    //$LASTPOS=39000277;//kernel.MusicPlayer:277
    //$LASTPOS=39000282;//kernel.MusicPlayer:282
    i = 0;
    while(i<_this.SOUND_PART_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=39000329;//kernel.MusicPlayer:329
        _this.soundPartObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=39000377;//kernel.MusicPlayer:377
    _this.bgmObj=null;
    //$LASTPOS=39000404;//kernel.MusicPlayer:404
    while (true) {
      //$LASTPOS=39000423;//kernel.MusicPlayer:423
      _this.update();
      
    }
  },
  fiber$main :function _trc_MusicPlayer_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=39000029;//kernel.MusicPlayer:29
    _this.SOUND_OBJ_ARY_SIZE=20;
    //$LASTPOS=39000068;//kernel.MusicPlayer:68
    _this.SOUND_PART_OBJ_ARY_SIZE=3;
    //$LASTPOS=39000126;//kernel.MusicPlayer:126
    _this.soundObjAryCnt=0;
    //$LASTPOS=39000146;//kernel.MusicPlayer:146
    _this.soundObjAry=[];
    //$LASTPOS=39000164;//kernel.MusicPlayer:164
    //$LASTPOS=39000169;//kernel.MusicPlayer:169
    i = 0;
    while(i<_this.SOUND_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=39000211;//kernel.MusicPlayer:211
        _this.soundObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=39000255;//kernel.MusicPlayer:255
    _this.soundPartObjAry=[];
    //$LASTPOS=39000277;//kernel.MusicPlayer:277
    //$LASTPOS=39000282;//kernel.MusicPlayer:282
    i = 0;
    while(i<_this.SOUND_PART_OBJ_ARY_SIZE) {
      {
        //$LASTPOS=39000329;//kernel.MusicPlayer:329
        _this.soundPartObjAry[i]=new Tonyu.classes.kernel.MusicPlayerOneSound;
      }
      i++;
    }
    //$LASTPOS=39000377;//kernel.MusicPlayer:377
    _this.bgmObj=null;
    
    _thread.enter(function _trc_MusicPlayer_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=39000404;//kernel.MusicPlayer:404
        case 1:
          //$LASTPOS=39000423;//kernel.MusicPlayer:423
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
  playBGM :function _trc_MusicPlayer_playBGM(bgmName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000481;//kernel.MusicPlayer:481
    _this.stopBGM();
    //$LASTPOS=39000496;//kernel.MusicPlayer:496
    _this.bgmObj=new Tonyu.classes.kernel.MusicPlayerOneMusic;
    //$LASTPOS=39000534;//kernel.MusicPlayer:534
    _this.bgmObj.playBGM(bgmName);
  },
  stopBGM :function _trc_MusicPlayer_stopBGM() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000594;//kernel.MusicPlayer:594
    if (_this.bgmObj) {
      //$LASTPOS=39000616;//kernel.MusicPlayer:616
      _this.bgmObj.die();
      //$LASTPOS=39000638;//kernel.MusicPlayer:638
      _this.bgmObj=null;
      
    }
  },
  playSE :function _trc_MusicPlayer_playSE(seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000713;//kernel.MusicPlayer:713
    if (priority==null) {
      //$LASTPOS=39000735;//kernel.MusicPlayer:735
      priority=0;
    }
    return _this.playSEPush(seName,priority);
  },
  playPartSE :function _trc_MusicPlayer_playPartSE(sePart,seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000860;//kernel.MusicPlayer:860
    if (priority==null) {
      //$LASTPOS=39000882;//kernel.MusicPlayer:882
      priority=0;
    }
    return _this.playSEPartPush(sePart,seName,priority);
  },
  playSEPush :function _trc_MusicPlayer_playSEPush(seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var retryCnt;
    var seObj;
    var i;
    
    //$LASTPOS=39001046;//kernel.MusicPlayer:1046
    retryCnt = 0;seObj;
    //$LASTPOS=39001075;//kernel.MusicPlayer:1075
    while (true) {
      //$LASTPOS=39001115;//kernel.MusicPlayer:1115
      seObj=_this.soundObjAry[(_this.soundObjAryCnt+retryCnt)%_this.SOUND_OBJ_ARY_SIZE];
      //$LASTPOS=39001194;//kernel.MusicPlayer:1194
      if (seObj.isSoundPlaying()) {
        //$LASTPOS=39001250;//kernel.MusicPlayer:1250
        if (retryCnt<_this.SOUND_OBJ_ARY_SIZE) {
          //$LASTPOS=39001319;//kernel.MusicPlayer:1319
          retryCnt++;
          
        } else {
          //$LASTPOS=39001389;//kernel.MusicPlayer:1389
          //$LASTPOS=39001394;//kernel.MusicPlayer:1394
          i = 0;
          while(i<=_this.SOUND_OBJ_ARY_SIZE) {
            {
              //$LASTPOS=39001471;//kernel.MusicPlayer:1471
              if (i<_this.SOUND_OBJ_ARY_SIZE) {
                //$LASTPOS=39001525;//kernel.MusicPlayer:1525
                seObj=_this.soundObjAry[(_this.soundObjAryCnt+i)%_this.SOUND_OBJ_ARY_SIZE];
                //$LASTPOS=39001613;//kernel.MusicPlayer:1613
                if (priority>=seObj.getPriority()) {
                  break;
                  
                  
                }
                
              } else {
                //$LASTPOS=39001766;//kernel.MusicPlayer:1766
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
    //$LASTPOS=39001959;//kernel.MusicPlayer:1959
    if (seObj!=null) {
      //$LASTPOS=39001988;//kernel.MusicPlayer:1988
      seObj.playSound(seName,priority);
      //$LASTPOS=39002040;//kernel.MusicPlayer:2040
      _this.soundObjAryCnt++;
      //$LASTPOS=39002067;//kernel.MusicPlayer:2067
      if (_this.soundObjAryCnt>=_this.soundObjArySize) {
        //$LASTPOS=39002106;//kernel.MusicPlayer:2106
        _this.soundObjAryCnt=0;
      }
      return seObj;
      
    }
  },
  playSEPartPush :function _trc_MusicPlayer_playSEPartPush(sePart,seName,priority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var seObj;
    
    //$LASTPOS=39002266;//kernel.MusicPlayer:2266
    seObj;
    //$LASTPOS=39002286;//kernel.MusicPlayer:2286
    seObj=_this.soundPartObjAry[sePart];
    //$LASTPOS=39002323;//kernel.MusicPlayer:2323
    if (seObj.isSoundPlaying()) {
      //$LASTPOS=39002375;//kernel.MusicPlayer:2375
      if (priority<seObj.getPriority()) {
        //$LASTPOS=39002444;//kernel.MusicPlayer:2444
        seObj=null;
        
      }
      
    }
    //$LASTPOS=39002502;//kernel.MusicPlayer:2502
    if (seObj!=null) {
      //$LASTPOS=39002531;//kernel.MusicPlayer:2531
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
  main :function _trc_MusicPlayerOneBase_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000026;//kernel.MusicPlayerOneBase:26
    _this.soundName="";
    //$LASTPOS=40000042;//kernel.MusicPlayerOneBase:42
    _this.soundPriority=0;
    //$LASTPOS=40000061;//kernel.MusicPlayerOneBase:61
    _this.pushSound=0;
    //$LASTPOS=40000077;//kernel.MusicPlayerOneBase:77
    _this.stopTime=0;
    //$LASTPOS=40000091;//kernel.MusicPlayerOneBase:91
    _this.playingSound=0;
    //$LASTPOS=40000109;//kernel.MusicPlayerOneBase:109
    _this.cnt=0;
  },
  fiber$main :function _trc_MusicPlayerOneBase_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=40000026;//kernel.MusicPlayerOneBase:26
    _this.soundName="";
    //$LASTPOS=40000042;//kernel.MusicPlayerOneBase:42
    _this.soundPriority=0;
    //$LASTPOS=40000061;//kernel.MusicPlayerOneBase:61
    _this.pushSound=0;
    //$LASTPOS=40000077;//kernel.MusicPlayerOneBase:77
    _this.stopTime=0;
    //$LASTPOS=40000091;//kernel.MusicPlayerOneBase:91
    _this.playingSound=0;
    //$LASTPOS=40000109;//kernel.MusicPlayerOneBase:109
    _this.cnt=0;
    
    _thread.retVal=_this;return;
  },
  soundRun :function _trc_MusicPlayerOneBase_soundRun() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000135;//kernel.MusicPlayerOneBase:135
    while (true) {
      //$LASTPOS=40000185;//kernel.MusicPlayerOneBase:185
      if (_this.pushSound==1) {
        //$LASTPOS=40000219;//kernel.MusicPlayerOneBase:219
        _this.pushSound=0;
        //$LASTPOS=40000246;//kernel.MusicPlayerOneBase:246
        _this.onPlay(_this.soundName);
        //$LASTPOS=40000277;//kernel.MusicPlayerOneBase:277
        _this.soundName="";
        //$LASTPOS=40000318;//kernel.MusicPlayerOneBase:318
        while (true) {
          //$LASTPOS=40000349;//kernel.MusicPlayerOneBase:349
          _this.update();
          //$LASTPOS=40000375;//kernel.MusicPlayerOneBase:375
          _this.stopTime--;
          //$LASTPOS=40000404;//kernel.MusicPlayerOneBase:404
          if (_this.stopTime<=0) {
            //$LASTPOS=40000467;//kernel.MusicPlayerOneBase:467
            _this.play().stop();
            break;
            
            
          }
          
        }
        //$LASTPOS=40000553;//kernel.MusicPlayerOneBase:553
        _this.stopTime=0;
        
      } else {
        //$LASTPOS=40000596;//kernel.MusicPlayerOneBase:596
        _this.playingSound=0;
        //$LASTPOS=40000626;//kernel.MusicPlayerOneBase:626
        _this.update();
        
      }
      
    }
  },
  fiber$soundRun :function _trc_MusicPlayerOneBase_f_soundRun(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_MusicPlayerOneBase_ent_soundRun(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=40000135;//kernel.MusicPlayerOneBase:135
        case 1:
          //$LASTPOS=40000185;//kernel.MusicPlayerOneBase:185
          if (!(_this.pushSound==1)) { __pc=6; break; }
          //$LASTPOS=40000219;//kernel.MusicPlayerOneBase:219
          _this.pushSound=0;
          //$LASTPOS=40000246;//kernel.MusicPlayerOneBase:246
          _this.onPlay(_this.soundName);
          //$LASTPOS=40000277;//kernel.MusicPlayerOneBase:277
          _this.soundName="";
          //$LASTPOS=40000318;//kernel.MusicPlayerOneBase:318
        case 2:
          //$LASTPOS=40000349;//kernel.MusicPlayerOneBase:349
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=40000375;//kernel.MusicPlayerOneBase:375
          _this.stopTime--;
          //$LASTPOS=40000404;//kernel.MusicPlayerOneBase:404
          if (!(_this.stopTime<=0)) { __pc=4; break; }
          //$LASTPOS=40000467;//kernel.MusicPlayerOneBase:467
          _this.play().stop();
          __pc=5; break;
          
        case 4:
          
          __pc=2;break;
        case 5:
          
          //$LASTPOS=40000553;//kernel.MusicPlayerOneBase:553
          _this.stopTime=0;
          __pc=8;break;
        case 6:
          //$LASTPOS=40000596;//kernel.MusicPlayerOneBase:596
          _this.playingSound=0;
          //$LASTPOS=40000626;//kernel.MusicPlayerOneBase:626
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
  onPlay :function _trc_MusicPlayerOneBase_onPlay(soundName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  stop :function _trc_MusicPlayerOneBase_stop() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000741;//kernel.MusicPlayerOneBase:741
    _this.stopTime=0;
  },
  isSoundPlaying :function _trc_MusicPlayerOneBase_isSoundPlaying() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.playingSound;
  },
  getPriority :function _trc_MusicPlayerOneBase_getPriority() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.soundPriority;
  },
  playSound :function _trc_MusicPlayerOneBase_playSound(soundName,soundPriority) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40001071;//kernel.MusicPlayerOneBase:1071
    _this.soundName=soundName;
    //$LASTPOS=40001103;//kernel.MusicPlayerOneBase:1103
    _this.soundPriority=soundPriority;
    //$LASTPOS=40001143;//kernel.MusicPlayerOneBase:1143
    _this.pushSound=1;
    //$LASTPOS=40001162;//kernel.MusicPlayerOneBase:1162
    _this.playingSound=1;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MusicPlayerOneBase,{"fullName":"kernel.MusicPlayerOneBase","namespace":"kernel","shortName":"MusicPlayerOneBase","decls":{"methods":{"main":{"nowait":false},"soundRun":{"nowait":false},"onPlay":{"nowait":true},"stop":{"nowait":true},"isSoundPlaying":{"nowait":true},"getPriority":{"nowait":true},"playSound":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayerOneMusic=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_MusicPlayerOneMusic_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41000094;//kernel.MusicPlayerOneMusic:94
    while (true) {
      //$LASTPOS=41000113;//kernel.MusicPlayerOneMusic:113
      if (_this.soundName=="se_bgm") {
        //$LASTPOS=41000150;//kernel.MusicPlayerOneMusic:150
        _this.play("o5 l32"+"v15 crcr<cr>cr arb-rrrrr crcr<cr>cr arb-rrrrr"+"v10 [crcr<cr>cr arb-rrrrr]2"+"v8  [crcr<cr>cr arb-rrrrr]1","o3 l32"+"[r]32"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]1","o2 l32"+"[r]32"+"l16 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1","o4 l32"+"[r]32"+"v14 r4r4r4  l16ge8f2r16","o5 l32"+"[r]32"+"v14 r4r4r4  l16c>a8b-2r16");
        //$LASTPOS=41000750;//kernel.MusicPlayerOneMusic:750
        while (true) {
          //$LASTPOS=41000777;//kernel.MusicPlayerOneMusic:777
          _this.play("o5 l32"+"v8  [crcr<cr>cr arb-rrrrr]1"+"[crcr<cr>cr arb-rrrrr]14"+"[grfrerdr]6 < [cr>b-rargr<]2 > [b-rargrfr]8"+"> [grfrerdr]8  [frerdrcr]8"+"v10   [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrrr  b-rrr rrrr rrrr rrrr ]1"+"v10<  [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrb-r rrrr  rrrr rrrr rrrr]1"+"v8  [crcr<cr>cr arb-rrrrr]1","o3 l32"+"[>[cr]4<<cr>>[cr]3<]29"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]8"+"[>[cr]4<<cr>>[cr]3<]1","o2 l16"+"[>b-<cfab-agc]15"+"l8 c2c4c4f2 c4c4>b-1< l16 [gcde gfed]2"+"l16 [gcde gfed]4 [cdefgfed]4"+"v13 l16 [c8.crrrr]2 [gab-cgfed]2"+"l16 [c8.crrrr]2 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1","o4 l16"+"r4r4r4 r4r4 l16ge8f2"+"> r4r4r4 r4r4r16 l16ge8f2"+"v12  r4r4r4 r4r4r16 l16ge8f2"+"r4r4r4 r4r4r16 >g<cef"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8   v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8 v3l64[f]8 v2l64[f]8 v2l64[f]8 v1l64[f]8 l8rrrr l8 rr >> v12 l16g<cefl8"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[d]8 v8l64[d]8 > v10l64[b]8 v8l64[b]8 < v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 v2l64[c]8 v2l64[c]8 v1l64[c]8 l8rrrr l8 rr> v12 l16dc>bal8 "+"<< l16 [d8.d rrrr]2 drdrd>b8.<crrr rrrr"+"< l16 [d8.d rrrr]2 drdrd>b8<crrrr gerf2","o4 l16"+"<r4r4r4 r4r4 l16c>a8b-2"+"r4r4r4 r4r4r16 l16c>a8b-2"+"v12 < r4r4r4 r4r4r16 l16c>a8b-2"+"r4r4r4 r4r4r16 cfab-"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8  <  v10l64[c]8 v8l64[c]8 > v10l64[a]8 v8l64[a]8  v10l64[b-]8 v8l64[b-]8 v6l64[b-]8 v4l64[b-]8 v3l64[b-]8 v2l64[b-]8 v2l64[b-]8 v1l64[b-]8 l8rrrr l8 rr> v12 l16cfab-l8"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8     v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8  v10l64[f]8  v8l64[f]8  v6l64[f]8  v4l64[f]8  v3l64[f]8  v2l64[f]8  v2l64[f]8  v1l64[f]8  l8rrrr l8 rr> v12 l16gfedl8 "+"< l16 [g8.g rrrr]2 grgrge8.frrr rrrr"+"< l16 [g8.g rrrr]2 grgrge8frrrr <c>arb-2r16");
          
        }
        
      }
      //$LASTPOS=41003587;//kernel.MusicPlayerOneMusic:3587
      _this.update();
      
    }
  },
  fiber$main :function _trc_MusicPlayerOneMusic_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_MusicPlayerOneMusic_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=41000094;//kernel.MusicPlayerOneMusic:94
        case 1:
          //$LASTPOS=41000113;//kernel.MusicPlayerOneMusic:113
          if (!(_this.soundName=="se_bgm")) { __pc=6; break; }
          //$LASTPOS=41000150;//kernel.MusicPlayerOneMusic:150
          _this.fiber$play(_thread, "o5 l32"+"v15 crcr<cr>cr arb-rrrrr crcr<cr>cr arb-rrrrr"+"v10 [crcr<cr>cr arb-rrrrr]2"+"v8  [crcr<cr>cr arb-rrrrr]1", "o3 l32"+"[r]32"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]1", "o2 l32"+"[r]32"+"l16 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1", "o4 l32"+"[r]32"+"v14 r4r4r4  l16ge8f2r16", "o5 l32"+"[r]32"+"v14 r4r4r4  l16c>a8b-2r16");
          __pc=2;return;
        case 2:
          
          //$LASTPOS=41000750;//kernel.MusicPlayerOneMusic:750
        case 3:
          //$LASTPOS=41000777;//kernel.MusicPlayerOneMusic:777
          _this.fiber$play(_thread, "o5 l32"+"v8  [crcr<cr>cr arb-rrrrr]1"+"[crcr<cr>cr arb-rrrrr]14"+"[grfrerdr]6 < [cr>b-rargr<]2 > [b-rargrfr]8"+"> [grfrerdr]8  [frerdrcr]8"+"v10   [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrrr  b-rrr rrrr rrrr rrrr ]1"+"v10<  [crcr<cr>cr arb-rrrrr]2  [crcr<cr>cr <c>rarrrb-r rrrr  rrrr rrrr rrrr]1"+"v8  [crcr<cr>cr arb-rrrrr]1", "o3 l32"+"[>[cr]4<<cr>>[cr]3<]29"+"[>[cr]4<<cr>>[cr]3<]2"+"[>[cr]4<<cr>>[cr]3<]8"+"[>[cr]4<<cr>>[cr]3<]1", "o2 l16"+"[>b-<cfab-agc]15"+"l8 c2c4c4f2 c4c4>b-1< l16 [gcde gfed]2"+"l16 [gcde gfed]4 [cdefgfed]4"+"v13 l16 [c8.crrrr]2 [gab-cgfed]2"+"l16 [c8.crrrr]2 v4cv4cv5cv6c v7cv8cv9cv10c v11cv12cv13cv14c v14[c]4"+"[>b-<cfab-agc]1", "o4 l16"+"r4r4r4 r4r4 l16ge8f2"+"> r4r4r4 r4r4r16 l16ge8f2"+"v12  r4r4r4 r4r4r16 l16ge8f2"+"r4r4r4 r4r4r16 >g<cef"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8   v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8 v3l64[f]8 v2l64[f]8 v2l64[f]8 v1l64[f]8 l8rrrr l8 rr >> v12 l16g<cefl8"+"l8 v10l64[g]8 v8l64[g]8 v6l64[g]8 v4l64[g]8 v3l64[g]8 l8v12 gab<  v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8  v10l64[d]8 v8l64[d]8 > v10l64[b]8 v8l64[b]8 < v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 v2l64[c]8 v2l64[c]8 v1l64[c]8 l8rrrr l8 rr> v12 l16dc>bal8 "+"<< l16 [d8.d rrrr]2 drdrd>b8.<crrr rrrr"+"< l16 [d8.d rrrr]2 drdrd>b8<crrrr gerf2", "o4 l16"+"<r4r4r4 r4r4 l16c>a8b-2"+"r4r4r4 r4r4r16 l16c>a8b-2"+"v12 < r4r4r4 r4r4r16 l16c>a8b-2"+"r4r4r4 r4r4r16 cfab-"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8  <  v10l64[c]8 v8l64[c]8 > v10l64[a]8 v8l64[a]8  v10l64[b-]8 v8l64[b-]8 v6l64[b-]8 v4l64[b-]8 v3l64[b-]8 v2l64[b-]8 v2l64[b-]8 v1l64[b-]8 l8rrrr l8 rr> v12 l16cfab-l8"+"<l8 v10l64[c]8 v8l64[c]8 v6l64[c]8 v4l64[c]8 v3l64[c]8 l8v12 cde  v10l64[f]8 v8l64[f]8 v6l64[f]8 v4l64[f]8     v10l64[g]8 v8l64[g]8   v10l64[e]8 v8l64[e]8  v10l64[f]8  v8l64[f]8  v6l64[f]8  v4l64[f]8  v3l64[f]8  v2l64[f]8  v2l64[f]8  v1l64[f]8  l8rrrr l8 rr> v12 l16gfedl8 "+"< l16 [g8.g rrrr]2 grgrge8.frrr rrrr"+"< l16 [g8.g rrrr]2 grgrge8frrrr <c>arb-2r16");
          __pc=4;return;
        case 4:
          
          __pc=3;break;
        case 5:
          
        case 6:
          
          //$LASTPOS=41003587;//kernel.MusicPlayerOneMusic:3587
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
  playBGM :function _trc_MusicPlayerOneMusic_playBGM(soundName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41000062;//kernel.MusicPlayerOneMusic:62
    _this.soundName=soundName;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MusicPlayerOneMusic,{"fullName":"kernel.MusicPlayerOneMusic","namespace":"kernel","shortName":"MusicPlayerOneMusic","decls":{"methods":{"main":{"nowait":false},"playBGM":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MusicPlayerOneSound=Tonyu.klass(Tonyu.classes.kernel.MusicPlayerOneBase,[],{
  main :function _trc_MusicPlayerOneSound_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=42000056;//kernel.MusicPlayerOneSound:56
    _this.soundRun();
  },
  fiber$main :function _trc_MusicPlayerOneSound_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_MusicPlayerOneSound_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=42000056;//kernel.MusicPlayerOneSound:56
          _this.fiber$soundRun(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onPlay :function _trc_MusicPlayerOneSound_onPlay(soundName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=42000107;//kernel.MusicPlayerOneSound:107
    if (soundName=="se_bound") {
      //$LASTPOS=42000146;//kernel.MusicPlayerOneSound:146
      _this.play("t500 v10 l64 o6 d>bgec>afdc t120l1rrrr");
      //$LASTPOS=42000252;//kernel.MusicPlayerOneSound:252
      _this.stopTime=5*2;
      
    } else {
      //$LASTPOS=42000283;//kernel.MusicPlayerOneSound:283
      if (soundName=="se_shot") {
        //$LASTPOS=42000321;//kernel.MusicPlayerOneSound:321
        _this.play(" l32 v10 o3c t120l1rrrr"," l32 v15 r48 o2c t120l1rrrr");
        //$LASTPOS=42000410;//kernel.MusicPlayerOneSound:410
        _this.stopTime=10*2;
        
      } else {
        //$LASTPOS=42000442;//kernel.MusicPlayerOneSound:442
        if (soundName=="se_jingle") {
          //$LASTPOS=42000482;//kernel.MusicPlayerOneSound:482
          _this.play("v15 l32 q2 o5 cdeg>drerg1 t120l1rrrr","v15 l32 q2 o4 gab<darbr<d1 t120l1rrrr");
          //$LASTPOS=42000594;//kernel.MusicPlayerOneSound:594
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
  main :function _trc_PageLoader_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=43000001;//kernel.PageLoader:1
    new Tonyu.classes.kernel.IndexPage;
  },
  fiber$main :function _trc_PageLoader_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=43000001;//kernel.PageLoader:1
    new Tonyu.classes.kernel.IndexPage;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PageLoader,{"fullName":"kernel.PageLoader","namespace":"kernel","shortName":"PageLoader","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Pass=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Pass_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=44000383;//kernel.Pass:383
    _this.laps=0;
    //$LASTPOS=44000390;//kernel.Pass:390
    _this.time=0;
    //$LASTPOS=44000398;//kernel.Pass:398
    while (_this.laps<3) {
      //$LASTPOS=44000419;//kernel.Pass:419
      _this.updateEx(60);
      //$LASTPOS=44000437;//kernel.Pass:437
      if (_this.laps<3) {
        //$LASTPOS=44000459;//kernel.Pass:459
        Tonyu.globals.$tokuten.incValue();
        //$LASTPOS=44000488;//kernel.Pass:488
        _this.time+=1;
        
      }
      
    }
    //$LASTPOS=44000505;//kernel.Pass:505
    Tonyu.globals.$mplayer.stopBGM();
    //$LASTPOS=44000525;//kernel.Pass:525
    Tonyu.globals.$ball.die();
  },
  fiber$main :function _trc_Pass_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=44000383;//kernel.Pass:383
    _this.laps=0;
    //$LASTPOS=44000390;//kernel.Pass:390
    _this.time=0;
    
    _thread.enter(function _trc_Pass_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=44000398;//kernel.Pass:398
        case 1:
          if (!(_this.laps<3)) { __pc=3; break; }
          //$LASTPOS=44000419;//kernel.Pass:419
          _this.fiber$updateEx(_thread, 60);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=44000437;//kernel.Pass:437
          if (_this.laps<3) {
            //$LASTPOS=44000459;//kernel.Pass:459
            Tonyu.globals.$tokuten.incValue();
            //$LASTPOS=44000488;//kernel.Pass:488
            _this.time+=1;
            
          }
          __pc=1;break;
        case 3:
          
          //$LASTPOS=44000505;//kernel.Pass:505
          Tonyu.globals.$mplayer.stopBGM();
          //$LASTPOS=44000525;//kernel.Pass:525
          Tonyu.globals.$ball.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  toSec :function _trc_Pass_toSec(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=44000042;//kernel.Pass:42
    if (s<10) {
      return "0"+s;
    }
    return s;
  },
  fiber$toSec :function _trc_Pass_f_toSec(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=44000042;//kernel.Pass:42
    if (s<10) {
      _thread.retVal="0"+s;return;
      
    }
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  lap :function _trc_Pass_lap() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tl;
    
    //$LASTPOS=44000103;//kernel.Pass:103
    tl;
    //$LASTPOS=44000115;//kernel.Pass:115
    if (! _this.enabled) {
      return _this;
    }
    //$LASTPOS=44000141;//kernel.Pass:141
    Tonyu.globals.$mplayer.playSE("se_jingle",1);
    //$LASTPOS=44000178;//kernel.Pass:178
    _this.enabled=0;
    //$LASTPOS=44000193;//kernel.Pass:193
    _this.laps+=1;
    //$LASTPOS=44000206;//kernel.Pass:206
    if (_this.laps==1) {
      //$LASTPOS=44000219;//kernel.Pass:219
      tl=Tonyu.globals.$lap1;
    }
    //$LASTPOS=44000233;//kernel.Pass:233
    if (_this.laps==2) {
      //$LASTPOS=44000246;//kernel.Pass:246
      tl=Tonyu.globals.$lap2;
    }
    //$LASTPOS=44000260;//kernel.Pass:260
    if (_this.laps==3) {
      //$LASTPOS=44000273;//kernel.Pass:273
      tl=Tonyu.globals.$lap3;
    }
    //$LASTPOS=44000287;//kernel.Pass:287
    if (tl) {
      //$LASTPOS=44000305;//kernel.Pass:305
      tl.text=tl.text+_this.floor(_this.time/60)+":"+_this.toSec(_this.time%60);
      //$LASTPOS=44000366;//kernel.Pass:366
      _this.time=0;
      
    }
  },
  fiber$lap :function _trc_Pass_f_lap(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tl;
    
    //$LASTPOS=44000103;//kernel.Pass:103
    tl;
    //$LASTPOS=44000115;//kernel.Pass:115
    if (! _this.enabled) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=44000141;//kernel.Pass:141
    Tonyu.globals.$mplayer.playSE("se_jingle",1);
    //$LASTPOS=44000178;//kernel.Pass:178
    _this.enabled=0;
    //$LASTPOS=44000193;//kernel.Pass:193
    _this.laps+=1;
    //$LASTPOS=44000206;//kernel.Pass:206
    if (_this.laps==1) {
      //$LASTPOS=44000219;//kernel.Pass:219
      tl=Tonyu.globals.$lap1;
    }
    //$LASTPOS=44000233;//kernel.Pass:233
    if (_this.laps==2) {
      //$LASTPOS=44000246;//kernel.Pass:246
      tl=Tonyu.globals.$lap2;
    }
    //$LASTPOS=44000260;//kernel.Pass:260
    if (_this.laps==3) {
      //$LASTPOS=44000273;//kernel.Pass:273
      tl=Tonyu.globals.$lap3;
    }
    //$LASTPOS=44000287;//kernel.Pass:287
    if (tl) {
      //$LASTPOS=44000305;//kernel.Pass:305
      tl.text=tl.text+_this.floor(_this.time/60)+":"+_this.toSec(_this.time%60);
      //$LASTPOS=44000366;//kernel.Pass:366
      _this.time=0;
      
    }
    
    _thread.retVal=_this;return;
  },
  getWidth :function _trc_Pass_getWidth() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getWidth :function _trc_Pass_f_getWidth(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=32;return;
    
    
    _thread.retVal=_this;return;
  },
  getHeight :function _trc_Pass_getHeight() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return 32;
  },
  fiber$getHeight :function _trc_Pass_f_getHeight(_thread) {
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
  main :function _trc_Player_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=45000002;//kernel.Player:2
    _this.dir=1;
    //$LASTPOS=45000009;//kernel.Player:9
    _this.rs=0.4;
    //$LASTPOS=45000017;//kernel.Player:17
    _this.hide();
    //$LASTPOS=45000025;//kernel.Player:25
    _this.frameCnt=0;
    //$LASTPOS=45000039;//kernel.Player:39
    while (1) {
      //$LASTPOS=45000112;//kernel.Player:112
      Tonyu.globals.$racket.tx=(Tonyu.globals.$mouseX+Tonyu.globals.$viewX)*_this.rs+Tonyu.globals.$racket.x*(1-_this.rs);
      //$LASTPOS=45000165;//kernel.Player:165
      Tonyu.globals.$racket.ty=(Tonyu.globals.$mouseY+Tonyu.globals.$viewY)*_this.rs+Tonyu.globals.$racket.y*(1-_this.rs);
      //$LASTPOS=45000345;//kernel.Player:345
      _this.update();
      //$LASTPOS=45000359;//kernel.Player:359
      _this.frameCnt++;
      
    }
  },
  fiber$main :function _trc_Player_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=45000002;//kernel.Player:2
    _this.dir=1;
    //$LASTPOS=45000009;//kernel.Player:9
    _this.rs=0.4;
    //$LASTPOS=45000017;//kernel.Player:17
    _this.hide();
    //$LASTPOS=45000025;//kernel.Player:25
    _this.frameCnt=0;
    
    _thread.enter(function _trc_Player_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=45000039;//kernel.Player:39
        case 1:
          if (!(1)) { __pc=3; break; }
          //$LASTPOS=45000112;//kernel.Player:112
          Tonyu.globals.$racket.tx=(Tonyu.globals.$mouseX+Tonyu.globals.$viewX)*_this.rs+Tonyu.globals.$racket.x*(1-_this.rs);
          //$LASTPOS=45000165;//kernel.Player:165
          Tonyu.globals.$racket.ty=(Tonyu.globals.$mouseY+Tonyu.globals.$viewY)*_this.rs+Tonyu.globals.$racket.y*(1-_this.rs);
          //$LASTPOS=45000345;//kernel.Player:345
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=45000359;//kernel.Player:359
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
  main :function _trc_Racket_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=46000482;//kernel.Racket:482
    _this.px=_this.x;
    //$LASTPOS=46000487;//kernel.Racket:487
    _this.py=_this.y;
    //$LASTPOS=46000493;//kernel.Racket:493
    _this.scx=Tonyu.globals.$viewX;
    //$LASTPOS=46000507;//kernel.Racket:507
    _this.scy=Tonyu.globals.$viewY;
    //$LASTPOS=46000521;//kernel.Racket:521
    _this.sew=0;
    //$LASTPOS=46000530;//kernel.Racket:530
    _this.frameCnt=0;
    //$LASTPOS=46000544;//kernel.Racket:544
    while (1) {
      //$LASTPOS=46000558;//kernel.Racket:558
      _this.px=_this.x;
      //$LASTPOS=46000564;//kernel.Racket:564
      _this.py=_this.y;
      //$LASTPOS=46000626;//kernel.Racket:626
      _this.update();
      //$LASTPOS=46000640;//kernel.Racket:640
      _this.frameCnt++;
      //$LASTPOS=46000662;//kernel.Racket:662
      _this.sew-=1;
      //$LASTPOS=46000674;//kernel.Racket:674
      if (! Tonyu.globals.$ball.isDead()&&_this.crashTo(Tonyu.globals.$ball)) {
        //$LASTPOS=46000749;//kernel.Racket:749
        if (_this.sew<=0) {
          //$LASTPOS=46000762;//kernel.Racket:762
          _this.sew=8;
          //$LASTPOS=46000769;//kernel.Racket:769
          Tonyu.globals.$mplayer.playSE("se_shot");
          
        }
        //$LASTPOS=46000806;//kernel.Racket:806
        _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
        //$LASTPOS=46000833;//kernel.Racket:833
        _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
        //$LASTPOS=46000860;//kernel.Racket:860
        _this.spd=1;
        //$LASTPOS=46000875;//kernel.Racket:875
        if (_this.d<32) {
          //$LASTPOS=46000953;//kernel.Racket:953
          Tonyu.globals.$ball.x=_this.x+_this.avx*32;
          //$LASTPOS=46000983;//kernel.Racket:983
          Tonyu.globals.$ball.y=_this.y+_this.avy*32;
          //$LASTPOS=46001013;//kernel.Racket:1013
          _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
          
        }
        //$LASTPOS=46001083;//kernel.Racket:1083
        Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
        //$LASTPOS=46001121;//kernel.Racket:1121
        Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
        
      }
      //$LASTPOS=46001217;//kernel.Racket:1217
      if (_this.dist(_this.tx-_this.x,_this.ty-_this.y)<40) {
        //$LASTPOS=46001283;//kernel.Racket:1283
        if (! _this.kabe(_this.x,_this.ty)) {
          //$LASTPOS=46001314;//kernel.Racket:1314
          _this.y=_this.ty;
          
        }
        //$LASTPOS=46001338;//kernel.Racket:1338
        if (! _this.kabe(_this.tx,_this.y)) {
          //$LASTPOS=46001369;//kernel.Racket:1369
          _this.x=_this.tx;
          
        }
        
      }
      //$LASTPOS=46001411;//kernel.Racket:1411
      _this.scx=_this.scx*0.95+_this.x*0.05;
      //$LASTPOS=46001436;//kernel.Racket:1436
      _this.scy=_this.scy*0.95+_this.y*0.05;
      //$LASTPOS=46001461;//kernel.Racket:1461
      _this.scrollTo(_this.scx-Tonyu.globals.$screenWidth/2,_this.scy-Tonyu.globals.$screenHeight/2);
      
    }
  },
  fiber$main :function _trc_Racket_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=46000482;//kernel.Racket:482
    _this.px=_this.x;
    //$LASTPOS=46000487;//kernel.Racket:487
    _this.py=_this.y;
    //$LASTPOS=46000493;//kernel.Racket:493
    _this.scx=Tonyu.globals.$viewX;
    //$LASTPOS=46000507;//kernel.Racket:507
    _this.scy=Tonyu.globals.$viewY;
    //$LASTPOS=46000521;//kernel.Racket:521
    _this.sew=0;
    //$LASTPOS=46000530;//kernel.Racket:530
    _this.frameCnt=0;
    
    _thread.enter(function _trc_Racket_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=46000544;//kernel.Racket:544
        case 1:
          if (!(1)) { __pc=4; break; }
          //$LASTPOS=46000558;//kernel.Racket:558
          _this.px=_this.x;
          //$LASTPOS=46000564;//kernel.Racket:564
          _this.py=_this.y;
          //$LASTPOS=46000626;//kernel.Racket:626
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=46000640;//kernel.Racket:640
          _this.frameCnt++;
          //$LASTPOS=46000662;//kernel.Racket:662
          _this.sew-=1;
          //$LASTPOS=46000674;//kernel.Racket:674
          if (! Tonyu.globals.$ball.isDead()&&_this.crashTo(Tonyu.globals.$ball)) {
            //$LASTPOS=46000749;//kernel.Racket:749
            if (_this.sew<=0) {
              //$LASTPOS=46000762;//kernel.Racket:762
              _this.sew=8;
              //$LASTPOS=46000769;//kernel.Racket:769
              Tonyu.globals.$mplayer.playSE("se_shot");
              
            }
            //$LASTPOS=46000806;//kernel.Racket:806
            _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
            //$LASTPOS=46000833;//kernel.Racket:833
            _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
            //$LASTPOS=46000860;//kernel.Racket:860
            _this.spd=1;
            //$LASTPOS=46000875;//kernel.Racket:875
            if (_this.d<32) {
              //$LASTPOS=46000953;//kernel.Racket:953
              Tonyu.globals.$ball.x=_this.x+_this.avx*32;
              //$LASTPOS=46000983;//kernel.Racket:983
              Tonyu.globals.$ball.y=_this.y+_this.avy*32;
              //$LASTPOS=46001013;//kernel.Racket:1013
              _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
              
            }
            //$LASTPOS=46001083;//kernel.Racket:1083
            Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
            //$LASTPOS=46001121;//kernel.Racket:1121
            Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
            
          }
          //$LASTPOS=46001217;//kernel.Racket:1217
          if (_this.dist(_this.tx-_this.x,_this.ty-_this.y)<40) {
            //$LASTPOS=46001283;//kernel.Racket:1283
            if (! _this.kabe(_this.x,_this.ty)) {
              //$LASTPOS=46001314;//kernel.Racket:1314
              _this.y=_this.ty;
              
            }
            //$LASTPOS=46001338;//kernel.Racket:1338
            if (! _this.kabe(_this.tx,_this.y)) {
              //$LASTPOS=46001369;//kernel.Racket:1369
              _this.x=_this.tx;
              
            }
            
          }
          //$LASTPOS=46001411;//kernel.Racket:1411
          _this.scx=_this.scx*0.95+_this.x*0.05;
          //$LASTPOS=46001436;//kernel.Racket:1436
          _this.scy=_this.scy*0.95+_this.y*0.05;
          //$LASTPOS=46001461;//kernel.Racket:1461
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
  kabe :function _trc_Racket_kabe(xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pa;
    
    //$LASTPOS=46000045;//kernel.Racket:45
    pa;
    //$LASTPOS=46000057;//kernel.Racket:57
    xx+=Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL;
    //$LASTPOS=46000104;//kernel.Racket:104
    yy+=Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW;
    //$LASTPOS=46000152;//kernel.Racket:152
    pa=Tonyu.globals.$map.getAt(xx%(Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL),yy%(Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW));
    return (pa<Tonyu.globals.$pat_table+9||pa>Tonyu.globals.$pat_table+14);
  },
  fiber$kabe :function _trc_Racket_f_kabe(_thread,xx,yy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pa;
    
    //$LASTPOS=46000045;//kernel.Racket:45
    pa;
    //$LASTPOS=46000057;//kernel.Racket:57
    xx+=Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL;
    //$LASTPOS=46000104;//kernel.Racket:104
    yy+=Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW;
    //$LASTPOS=46000152;//kernel.Racket:152
    pa=Tonyu.globals.$map.getAt(xx%(Tonyu.globals.$MAP_CHIP_PAT_WIDTH*Tonyu.globals.$MAP_CHIP_COL),yy%(Tonyu.globals.$MAP_CHIP_PAT_HEIGHT*Tonyu.globals.$MAP_CHIP_ROW));
    _thread.retVal=(pa<Tonyu.globals.$pat_table+9||pa>Tonyu.globals.$pat_table+14);return;
    
    
    _thread.retVal=_this;return;
  },
  crashTo :function _trc_Racket_crashTo(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=46000393;//kernel.Racket:393
    _this.d=_this.dist(t.x-_this.x,t.y-_this.y)+1;
    return (_this.d<(_this.dist(_this.x-_this.px,_this.y-_this.py)+_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy))/2+32);
  },
  scrollTo :function _trc_Racket_scrollTo(scx,scy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=46001542;//kernel.Racket:1542
    Tonyu.globals.$Screen.scrollTo(scx,scy);
    //$LASTPOS=46001574;//kernel.Racket:1574
    Tonyu.globals.$viewX=scx;
    //$LASTPOS=46001592;//kernel.Racket:1592
    Tonyu.globals.$viewY=scy;
  },
  fiber$scrollTo :function _trc_Racket_f_scrollTo(_thread,scx,scy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=46001542;//kernel.Racket:1542
    Tonyu.globals.$Screen.scrollTo(scx,scy);
    //$LASTPOS=46001574;//kernel.Racket:1574
    Tonyu.globals.$viewX=scx;
    //$LASTPOS=46001592;//kernel.Racket:1592
    Tonyu.globals.$viewY=scy;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Racket,{"fullName":"kernel.Racket","namespace":"kernel","shortName":"Racket","decls":{"methods":{"main":{"nowait":false},"kabe":{"nowait":false},"crashTo":{"nowait":true},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Tokuten=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Tokuten_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47000293;//kernel.Tokuten:293
    _this.value=0;
    //$LASTPOS=47000302;//kernel.Tokuten:302
    _this.updateEx();
  },
  fiber$main :function _trc_Tokuten_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=47000293;//kernel.Tokuten:293
    _this.value=0;
    
    _thread.enter(function _trc_Tokuten_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=47000302;//kernel.Tokuten:302
          _this.fiber$updateEx(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setValue :function _trc_Tokuten_setValue(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47000058;//kernel.Tokuten:58
    _this.value=v;
    //$LASTPOS=47000071;//kernel.Tokuten:71
    _this.p=Tonyu.globals.$pat_tokuten+_this.value;
  },
  fiber$setValue :function _trc_Tokuten_f_setValue(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=47000058;//kernel.Tokuten:58
    _this.value=v;
    //$LASTPOS=47000071;//kernel.Tokuten:71
    _this.p=Tonyu.globals.$pat_tokuten+_this.value;
    
    _thread.retVal=_this;return;
  },
  incValue :function _trc_Tokuten_incValue() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47000175;//kernel.Tokuten:175
    _this.value+=1;
    //$LASTPOS=47000189;//kernel.Tokuten:189
    if (_this.value>=_this.nextInc) {
      //$LASTPOS=47000219;//kernel.Tokuten:219
      if (_this.next) {
        //$LASTPOS=47000229;//kernel.Tokuten:229
        _this.next.incValue();
      }
      //$LASTPOS=47000255;//kernel.Tokuten:255
      _this.value=0;
      
    }
    //$LASTPOS=47000274;//kernel.Tokuten:274
    _this.setValue(_this.value);
  },
  fiber$incValue :function _trc_Tokuten_f_incValue(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=47000175;//kernel.Tokuten:175
    _this.value+=1;
    //$LASTPOS=47000189;//kernel.Tokuten:189
    if (_this.value>=_this.nextInc) {
      //$LASTPOS=47000219;//kernel.Tokuten:219
      if (_this.next) {
        //$LASTPOS=47000229;//kernel.Tokuten:229
        _this.next.incValue();
      }
      //$LASTPOS=47000255;//kernel.Tokuten:255
      _this.value=0;
      
    }
    
    _thread.enter(function _trc_Tokuten_ent_incValue(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=47000274;//kernel.Tokuten:274
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
    
    //$LASTPOS=48000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      return Tonyu.globals.$t2World;
    }
    //$LASTPOS=48000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    return Tonyu.globals.$t2World;
  },
  fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=48000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      _thread.retVal=Tonyu.globals.$t2World;return;
      
    }
    //$LASTPOS=48000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    _thread.retVal=Tonyu.globals.$t2World;return;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_BodyActor_onAppear() {
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
    
    //$LASTPOS=48000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=48000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=48000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=48000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=48000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=48000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=48000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=48000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=48000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=48000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=48000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=48000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=48000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=48000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=48000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=48000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=48000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=48000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=48000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=48000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=48001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=48001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=48001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=48001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=48001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=48001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=48001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=48001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=48001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=48001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=48001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=48001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=48001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=48001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=48001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
  },
  fiber$onAppear :function _trc_BodyActor_f_onAppear(_thread) {
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
    
    //$LASTPOS=48000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=48000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=48000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=48000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=48000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=48000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=48000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=48000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=48000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=48000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=48000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=48000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=48000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=48000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=48000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=48000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=48000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=48000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=48000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=48000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=48001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=48001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=48001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=48001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=48001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=48001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=48001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=48001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=48001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=48001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=48001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=48001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=48001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=48001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=48001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
    
    _thread.retVal=_this;return;
  },
  allContact :function _trc_BodyActor_allContact(klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=48001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=48001615;//kernel.BodyActor:1615
    //$LASTPOS=48001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=48001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=48001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=48001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=48001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=48001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=48001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=48001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=48002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=48002080;//kernel.BodyActor:2080
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
    
    //$LASTPOS=48001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=48001615;//kernel.BodyActor:1615
    //$LASTPOS=48001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=48001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=48001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=48001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=48001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=48001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=48001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=48001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=48002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=48002080;//kernel.BodyActor:2080
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
    
    //$LASTPOS=48002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=48002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=48002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=48002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=48002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=48002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=48002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=48002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=48002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=48002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=48002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=48002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=48002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=48002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=48002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=48002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyTorque :function _trc_BodyActor_applyTorque(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=48002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
  },
  fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=48002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
    
    _thread.retVal=_this;return;
  },
  moveBy :function _trc_BodyActor_moveBy(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pos;
    
    //$LASTPOS=48002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=48002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=48002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=48002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
  },
  fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pos;
    
    //$LASTPOS=48002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=48002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=48002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=48002664;//kernel.BodyActor:2664
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
    
    //$LASTPOS=48002749;//kernel.BodyActor:2749
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    //$LASTPOS=48002766;//kernel.BodyActor:2766
    _this.world.DestroyBody(_this.body);
  },
  updatePos :function _trc_BodyActor_updatePos() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var scale;
    var pos;
    
    //$LASTPOS=48002812;//kernel.BodyActor:2812
    if (! _this.body) {
      return _this;
    }
    //$LASTPOS=48002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=48002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=48002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=48002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=48002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
  },
  fiber$updatePos :function _trc_BodyActor_f_updatePos(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var scale;
    var pos;
    
    //$LASTPOS=48002812;//kernel.BodyActor:2812
    if (! _this.body) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=48002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=48002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=48002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=48002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=48002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2MediaPlayer],{
  main :function _trc_Boot_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49001920;//kernel.Boot:1920
    Tonyu.globals.$Boot=_this;
    //$LASTPOS=49001933;//kernel.Boot:1933
    _this.initSounds();
    //$LASTPOS=49001948;//kernel.Boot:1948
    _this.initSprites();
    //$LASTPOS=49001964;//kernel.Boot:1964
    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
    //$LASTPOS=49001995;//kernel.Boot:1995
    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
    //$LASTPOS=49002032;//kernel.Boot:2032
    _this.initThread();
    //$LASTPOS=49002049;//kernel.Boot:2049
    Tonyu.globals.$pat_fruits=30;
    //$LASTPOS=49002066;//kernel.Boot:2066
    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
    //$LASTPOS=49002083;//kernel.Boot:2083
    Tonyu.globals.$Math=Math;
    //$LASTPOS=49002096;//kernel.Boot:2096
    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=49002206;//kernel.Boot:2206
    Tonyu.globals.$consolePrintY=465-15;
    //$LASTPOS=49002230;//kernel.Boot:2230
    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=49002370;//kernel.Boot:2370
    if (typeof  SplashScreen!="undefined") {
      //$LASTPOS=49002408;//kernel.Boot:2408
      SplashScreen.hide();
    }
    //$LASTPOS=49002430;//kernel.Boot:2430
    _this.initFPSParams();
    //$LASTPOS=49002450;//kernel.Boot:2450
    while (true) {
      //$LASTPOS=49002490;//kernel.Boot:2490
      _this.scheduler.stepsAll();
      //$LASTPOS=49002517;//kernel.Boot:2517
      Tonyu.globals.$Keys.update();
      //$LASTPOS=49002538;//kernel.Boot:2538
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=49002566;//kernel.Boot:2566
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=49002599;//kernel.Boot:2599
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=49002636;//kernel.Boot:2636
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=49002664;//kernel.Boot:2664
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=49002718;//kernel.Boot:2718
        _this.doDraw=true;
        //$LASTPOS=49002740;//kernel.Boot:2740
        _this.resetDeadLine();
        
      }
      //$LASTPOS=49002769;//kernel.Boot:2769
      if (_this.doDraw) {
        //$LASTPOS=49002812;//kernel.Boot:2812
        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=49002857;//kernel.Boot:2857
        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=49002897;//kernel.Boot:2897
        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=49002942;//kernel.Boot:2942
        Tonyu.globals.$Screen.draw();
        //$LASTPOS=49002967;//kernel.Boot:2967
        _this.fps_fpsCnt++;
        //$LASTPOS=49002991;//kernel.Boot:2991
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=49003030;//kernel.Boot:3030
        _this.frameSkipped++;
        
      }
      //$LASTPOS=49003058;//kernel.Boot:3058
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=49003084;//kernel.Boot:3084
      Tonyu.globals.$Sprites.removeOneframes();
      //$LASTPOS=49003117;//kernel.Boot:3117
      _this.fps_rpsCnt++;
      //$LASTPOS=49003137;//kernel.Boot:3137
      _this.measureFps();
      //$LASTPOS=49003156;//kernel.Boot:3156
      _this.waitFrame();
      //$LASTPOS=49003183;//kernel.Boot:3183
      while (_this.paused) {
        //$LASTPOS=49003208;//kernel.Boot:3208
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=49003244;//kernel.Boot:3244
        if (! _this.paused) {
          //$LASTPOS=49003257;//kernel.Boot:3257
          _this.resetDeadLine();
        }
        
      }
      
    }
  },
  fiber$main :function _trc_Boot_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=49001920;//kernel.Boot:1920
    Tonyu.globals.$Boot=_this;
    
    _thread.enter(function _trc_Boot_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=49001933;//kernel.Boot:1933
          _this.fiber$initSounds(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=49001948;//kernel.Boot:1948
          _this.fiber$initSprites(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=49001964;//kernel.Boot:1964
          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
          //$LASTPOS=49001995;//kernel.Boot:1995
          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
          //$LASTPOS=49002032;//kernel.Boot:2032
          _this.fiber$initThread(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=49002049;//kernel.Boot:2049
          Tonyu.globals.$pat_fruits=30;
          //$LASTPOS=49002066;//kernel.Boot:2066
          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
          //$LASTPOS=49002083;//kernel.Boot:2083
          Tonyu.globals.$Math=Math;
          //$LASTPOS=49002096;//kernel.Boot:2096
          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=49002206;//kernel.Boot:2206
          Tonyu.globals.$consolePrintY=465-15;
          //$LASTPOS=49002230;//kernel.Boot:2230
          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=49002370;//kernel.Boot:2370
          if (typeof  SplashScreen!="undefined") {
            //$LASTPOS=49002408;//kernel.Boot:2408
            SplashScreen.hide();
          }
          //$LASTPOS=49002430;//kernel.Boot:2430
          _this.initFPSParams();
          //$LASTPOS=49002450;//kernel.Boot:2450
        case 4:
          //$LASTPOS=49002490;//kernel.Boot:2490
          _this.scheduler.stepsAll();
          //$LASTPOS=49002517;//kernel.Boot:2517
          Tonyu.globals.$Keys.update();
          //$LASTPOS=49002538;//kernel.Boot:2538
          Tonyu.globals.$InputDevice.update();
          //$LASTPOS=49002566;//kernel.Boot:2566
          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
          //$LASTPOS=49002599;//kernel.Boot:2599
          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
          //$LASTPOS=49002636;//kernel.Boot:2636
          _this.doDraw=_this.now()<_this.deadLine;
          //$LASTPOS=49002664;//kernel.Boot:2664
          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
            //$LASTPOS=49002718;//kernel.Boot:2718
            _this.doDraw=true;
            //$LASTPOS=49002740;//kernel.Boot:2740
            _this.resetDeadLine();
            
          }
          //$LASTPOS=49002769;//kernel.Boot:2769
          if (_this.doDraw) {
            //$LASTPOS=49002812;//kernel.Boot:2812
            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=49002857;//kernel.Boot:2857
            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=49002897;//kernel.Boot:2897
            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=49002942;//kernel.Boot:2942
            Tonyu.globals.$Screen.draw();
            //$LASTPOS=49002967;//kernel.Boot:2967
            _this.fps_fpsCnt++;
            //$LASTPOS=49002991;//kernel.Boot:2991
            _this.frameSkipped=0;
            
          } else {
            //$LASTPOS=49003030;//kernel.Boot:3030
            _this.frameSkipped++;
            
          }
          //$LASTPOS=49003058;//kernel.Boot:3058
          Tonyu.globals.$Sprites.checkHit();
          //$LASTPOS=49003084;//kernel.Boot:3084
          Tonyu.globals.$Sprites.removeOneframes();
          //$LASTPOS=49003117;//kernel.Boot:3117
          _this.fps_rpsCnt++;
          //$LASTPOS=49003137;//kernel.Boot:3137
          _this.measureFps();
          //$LASTPOS=49003156;//kernel.Boot:3156
          _this.fiber$waitFrame(_thread);
          __pc=5;return;
        case 5:
          
          //$LASTPOS=49003183;//kernel.Boot:3183
        case 6:
          if (!(_this.paused)) { __pc=8; break; }
          //$LASTPOS=49003208;//kernel.Boot:3208
          _this.fiber$waitFor(_thread, Tonyu.timeout(1));
          __pc=7;return;
        case 7:
          
          //$LASTPOS=49003244;//kernel.Boot:3244
          if (! _this.paused) {
            //$LASTPOS=49003257;//kernel.Boot:3257
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
  update :function _trc_Boot_update() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49000204;//kernel.Boot:204
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
          //$LASTPOS=49000204;//kernel.Boot:204
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
    
    //$LASTPOS=49000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=49000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=49000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=49000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=49000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    //$LASTPOS=49000454;//kernel.Boot:454
    _this.waitFor(a);
    //$LASTPOS=49000471;//kernel.Boot:471
    _this.print("Loading pats..");
    //$LASTPOS=49000502;//kernel.Boot:502
    rs = Tonyu.globals.$currentProject.getResource();
    //$LASTPOS=49000545;//kernel.Boot:545
    a=_this.asyncResult();
    //$LASTPOS=49000567;//kernel.Boot:567
    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
    //$LASTPOS=49000652;//kernel.Boot:652
    _this.waitFor(a);
    //$LASTPOS=49000669;//kernel.Boot:669
    r = a[0];
    //$LASTPOS=49000686;//kernel.Boot:686
    Tonyu.globals.$Sprites.setImageList(r);
    //$LASTPOS=49000717;//kernel.Boot:717
    _it_260=Tonyu.iterator(r.names,2);
    while(_it_260.next()) {
      name=_it_260[0];
      val=_it_260[1];
      
      //$LASTPOS=49000758;//kernel.Boot:758
      Tonyu.setGlobal(name,val);
      
    }
    //$LASTPOS=49000798;//kernel.Boot:798
    _this.print("Loading pats done.");
    //$LASTPOS=49000833;//kernel.Boot:833
    _this.cvj=$("canvas");
    //$LASTPOS=49000855;//kernel.Boot:855
    if (Tonyu.noviceMode) {
      //$LASTPOS=49000888;//kernel.Boot:888
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
      
    } else {
      //$LASTPOS=49000972;//kernel.Boot:972
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
    
    //$LASTPOS=49000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=49000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=49000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=49000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=49000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    
    _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=49000454;//kernel.Boot:454
          _this.fiber$waitFor(_thread, a);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=49000471;//kernel.Boot:471
          _this.print("Loading pats..");
          //$LASTPOS=49000502;//kernel.Boot:502
          rs = Tonyu.globals.$currentProject.getResource();
          //$LASTPOS=49000545;//kernel.Boot:545
          a=_this.asyncResult();
          //$LASTPOS=49000567;//kernel.Boot:567
          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
          //$LASTPOS=49000652;//kernel.Boot:652
          _this.fiber$waitFor(_thread, a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=49000669;//kernel.Boot:669
          r = a[0];
          //$LASTPOS=49000686;//kernel.Boot:686
          Tonyu.globals.$Sprites.setImageList(r);
          //$LASTPOS=49000717;//kernel.Boot:717
          _it_260=Tonyu.iterator(r.names,2);
          while(_it_260.next()) {
            name=_it_260[0];
            val=_it_260[1];
            
            //$LASTPOS=49000758;//kernel.Boot:758
            Tonyu.setGlobal(name,val);
            
          }
          //$LASTPOS=49000798;//kernel.Boot:798
          _this.print("Loading pats done.");
          //$LASTPOS=49000833;//kernel.Boot:833
          _this.cvj=$("canvas");
          //$LASTPOS=49000855;//kernel.Boot:855
          if (Tonyu.noviceMode) {
            //$LASTPOS=49000888;//kernel.Boot:888
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
            
          } else {
            //$LASTPOS=49000972;//kernel.Boot:972
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSounds :function _trc_Boot_initSounds() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    //$LASTPOS=49001099;//kernel.Boot:1099
    _this.initT2MediaPlayer();
    //$LASTPOS=49001125;//kernel.Boot:1125
    _this.loadFromProject(Tonyu.globals.$currentProject);
    //$LASTPOS=49001164;//kernel.Boot:1164
    _this.print("Loading sounds done.");
  },
  fiber$initSounds :function _trc_Boot_f_initSounds(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=49001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    
    _thread.enter(function _trc_Boot_ent_initSounds(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=49001099;//kernel.Boot:1099
          _this.fiber$initT2MediaPlayer(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=49001125;//kernel.Boot:1125
          _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=49001164;//kernel.Boot:1164
          _this.print("Loading sounds done.");
          _thread.exit(_this);return;
        }
      }
    });
  },
  initThread :function _trc_Boot_initThread() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var o;
    var mainClassName;
    
    //$LASTPOS=49001274;//kernel.Boot:1274
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=49001320;//kernel.Boot:1320
    mainClassName = o.run.mainClass;
    //$LASTPOS=49001360;//kernel.Boot:1360
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=49001401;//kernel.Boot:1401
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=49001447;//kernel.Boot:1447
    if (! _this.mainClass) {
      //$LASTPOS=49001474;//kernel.Boot:1474
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=49001552;//kernel.Boot:1552
    Tonyu.runMode=true;
    //$LASTPOS=49001609;//kernel.Boot:1609
    _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
    //$LASTPOS=49001650;//kernel.Boot:1650
    new _this.mainClass();
  },
  fiber$initThread :function _trc_Boot_f_initThread(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var o;
    var mainClassName;
    
    //$LASTPOS=49001274;//kernel.Boot:1274
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=49001320;//kernel.Boot:1320
    mainClassName = o.run.mainClass;
    //$LASTPOS=49001360;//kernel.Boot:1360
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=49001401;//kernel.Boot:1401
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=49001447;//kernel.Boot:1447
    if (! _this.mainClass) {
      //$LASTPOS=49001474;//kernel.Boot:1474
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=49001552;//kernel.Boot:1552
    Tonyu.runMode=true;
    //$LASTPOS=49001609;//kernel.Boot:1609
    _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
    //$LASTPOS=49001650;//kernel.Boot:1650
    new _this.mainClass();
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_Boot_stop() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49001686;//kernel.Boot:1686
    _this.fireEvent("stop");
    //$LASTPOS=49001710;//kernel.Boot:1710
    _this.die();
  },
  fiber$stop :function _trc_Boot_f_stop(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=49001686;//kernel.Boot:1686
    _this.fireEvent("stop");
    //$LASTPOS=49001710;//kernel.Boot:1710
    _this.die();
    
    _thread.retVal=_this;return;
  },
  schedule :function _trc_Boot_schedule(obj,method,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var th;
    
    //$LASTPOS=49001755;//kernel.Boot:1755
    method=method||"main";
    //$LASTPOS=49001783;//kernel.Boot:1783
    args=args||[];
    //$LASTPOS=49001803;//kernel.Boot:1803
    th = _this.scheduler.newThread(obj,method,args);
    //$LASTPOS=49001855;//kernel.Boot:1855
    _this.addThreadGroup(obj);
    //$LASTPOS=49001881;//kernel.Boot:1881
    obj.addThread(th);
    return th;
  },
  fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var th;
    
    //$LASTPOS=49001755;//kernel.Boot:1755
    method=method||"main";
    //$LASTPOS=49001783;//kernel.Boot:1783
    args=args||[];
    //$LASTPOS=49001803;//kernel.Boot:1803
    th = _this.scheduler.newThread(obj,method,args);
    
    _thread.enter(function _trc_Boot_ent_schedule(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=49001855;//kernel.Boot:1855
          _this.fiber$addThreadGroup(_thread, obj);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=49001881;//kernel.Boot:1881
          obj.addThread(th);
          _thread.exit(th);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  initFPSParams :function _trc_Boot_initFPSParams() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49003337;//kernel.Boot:3337
    _this._fps=30;
    //$LASTPOS=49003353;//kernel.Boot:3353
    _this.maxframeSkip=5;
    //$LASTPOS=49003403;//kernel.Boot:3403
    _this.frameCnt=0;
    //$LASTPOS=49003422;//kernel.Boot:3422
    _this.resetDeadLine();
    //$LASTPOS=49003444;//kernel.Boot:3444
    _this.lastMeasured=_this.now();
    //$LASTPOS=49003469;//kernel.Boot:3469
    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
  },
  now :function _trc_Boot_now() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return new Date().getTime();
  },
  resetDeadLine :function _trc_Boot_resetDeadLine() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49003599;//kernel.Boot:3599
    _this.deadLine=_this.now()+1000/_this._fps;
    //$LASTPOS=49003630;//kernel.Boot:3630
    _this.frameSkipped=0;
  },
  waitFrame :function _trc_Boot_waitFrame() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var wt;
    
    //$LASTPOS=49003674;//kernel.Boot:3674
    wt = _this.deadLine-_this.now();
    //$LASTPOS=49003702;//kernel.Boot:3702
    if (wt<1) {
      //$LASTPOS=49003723;//kernel.Boot:3723
      if (wt<- 1000) {
        //$LASTPOS=49003737;//kernel.Boot:3737
        _this.resetDeadLine();
      }
      //$LASTPOS=49003763;//kernel.Boot:3763
      wt=1;
      
    }
    //$LASTPOS=49003781;//kernel.Boot:3781
    wt=_this.floor(wt);
    //$LASTPOS=49003800;//kernel.Boot:3800
    _this.waitFor(Tonyu.timeout(wt));
    //$LASTPOS=49003833;//kernel.Boot:3833
    _this.deadLine+=1000/_this._fps;
  },
  fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var wt;
    
    //$LASTPOS=49003674;//kernel.Boot:3674
    wt = _this.deadLine-_this.now();
    //$LASTPOS=49003702;//kernel.Boot:3702
    if (wt<1) {
      //$LASTPOS=49003723;//kernel.Boot:3723
      if (wt<- 1000) {
        //$LASTPOS=49003737;//kernel.Boot:3737
        _this.resetDeadLine();
      }
      //$LASTPOS=49003763;//kernel.Boot:3763
      wt=1;
      
    }
    //$LASTPOS=49003781;//kernel.Boot:3781
    wt=_this.floor(wt);
    
    _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=49003800;//kernel.Boot:3800
          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
          __pc=1;return;
        case 1:
          
          //$LASTPOS=49003833;//kernel.Boot:3833
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
    
    //$LASTPOS=49003993;//kernel.Boot:3993
    _this._fps=fps;
    //$LASTPOS=49004010;//kernel.Boot:4010
    if (typeof  maxFrameSkip!="number") {
      //$LASTPOS=49004045;//kernel.Boot:4045
      maxFrameSkip=5;
    }
    //$LASTPOS=49004066;//kernel.Boot:4066
    _this.maxFrameSkip=maxFrameSkip;
    //$LASTPOS=49004105;//kernel.Boot:4105
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
    
    //$LASTPOS=49004316;//kernel.Boot:4316
    if (_this.now()>_this.lastMeasured+1000) {
      //$LASTPOS=49004356;//kernel.Boot:4356
      _this.fps_fps=_this.fps_fpsCnt;
      //$LASTPOS=49004385;//kernel.Boot:4385
      _this.fps_rps=_this.fps_rpsCnt;
      //$LASTPOS=49004414;//kernel.Boot:4414
      _this.fps_fpsCnt=0;
      //$LASTPOS=49004437;//kernel.Boot:4437
      _this.fps_rpsCnt=0;
      //$LASTPOS=49004460;//kernel.Boot:4460
      _this.lastMeasured=_this.now();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
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
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
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
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50000212;//kernel.DxChar:212
    _this.rotation=_this.angle;
    //$LASTPOS=50000233;//kernel.DxChar:233
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

