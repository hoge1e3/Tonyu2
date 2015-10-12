Tonyu.klass.define({
  fullName: 'user.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'user',
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
  fullName: 'user.PlainChar',
  shortName: 'PlainChar',
  namespace: 'user',
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
      var thg;
      
      //$LASTPOS=1000045;//user.PlainChar:45
      if (Tonyu.runMode) {
        //$LASTPOS=1000074;//user.PlainChar:74
        thg = _this.currentThreadGroup();
        //$LASTPOS=1000112;//user.PlainChar:112
        if (thg) {
          //$LASTPOS=1000121;//user.PlainChar:121
          _this._th=thg.addObj(_this,"tMain");
        }
        //$LASTPOS=1000159;//user.PlainChar:159
        _this.initSprite();
        
      }
      //$LASTPOS=1000183;//user.PlainChar:183
      if (typeof  x=="object") {
        //$LASTPOS=1000207;//user.PlainChar:207
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=1000239;//user.PlainChar:239
        if (typeof  x=="number") {
          //$LASTPOS=1000273;//user.PlainChar:273
          _this.x=x;
          //$LASTPOS=1000291;//user.PlainChar:291
          _this.y=y;
          //$LASTPOS=1000309;//user.PlainChar:309
          _this.p=p;
          
        }
      }
    },
    wait :function _trc_PlainChar_wait(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000342;//user.PlainChar:342
      _this._isWaiting=true;
      //$LASTPOS=1000363;//user.PlainChar:363
      if (! t) {
        //$LASTPOS=1000371;//user.PlainChar:371
        t=- 1;
      }
      //$LASTPOS=1000381;//user.PlainChar:381
      while (true) {
        //$LASTPOS=1000403;//user.PlainChar:403
        Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
        //$LASTPOS=1000427;//user.PlainChar:427
        t--;
        //$LASTPOS=1000440;//user.PlainChar:440
        if (! _this._isWaiting||t==0) {
          break;
          
        }
        
      }
      //$LASTPOS=1000482;//user.PlainChar:482
      _this._isWaiting=false;
    },
    fiber$wait :function _trc_PlainChar_f_wait(_thread,t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000342;//user.PlainChar:342
      _this._isWaiting=true;
      //$LASTPOS=1000363;//user.PlainChar:363
      if (! t) {
        //$LASTPOS=1000371;//user.PlainChar:371
        t=- 1;
      }
      
      _thread.enter(function _trc_PlainChar_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000381;//user.PlainChar:381
          case 1:
            //$LASTPOS=1000403;//user.PlainChar:403
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=1000427;//user.PlainChar:427
            t--;
            //$LASTPOS=1000440;//user.PlainChar:440
            if (!(! _this._isWaiting||t==0)) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=1000482;//user.PlainChar:482
            _this._isWaiting=false;
            _thread.exit(_this);return;
          }
        }
      });
    },
    notify :function _trc_PlainChar_notify() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000518;//user.PlainChar:518
      _this._isWaiting=false;
    },
    fiber$notify :function _trc_PlainChar_f_notify(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000518;//user.PlainChar:518
      _this._isWaiting=false;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_PlainChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000553;//user.PlainChar:553
      _this.onDraw();
      //$LASTPOS=1000567;//user.PlainChar:567
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=1000597;//user.PlainChar:597
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000635;//user.PlainChar:635
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000635;//user.PlainChar:635
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
      
      //$LASTPOS=1000689;//user.PlainChar:689
      _this.onUpdate();
      //$LASTPOS=1000705;//user.PlainChar:705
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000689;//user.PlainChar:689
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000705;//user.PlainChar:705
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
      
      //$LASTPOS=1000764;//user.PlainChar:764
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=1000815;//user.PlainChar:815
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=1000851;//user.PlainChar:851
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=1000881;//user.PlainChar:881
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000764;//user.PlainChar:764
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=1000815;//user.PlainChar:815
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=1000851;//user.PlainChar:851
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000881;//user.PlainChar:881
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
      
      //$LASTPOS=1000910;//user.PlainChar:910
      _this.main();
      //$LASTPOS=1000922;//user.PlainChar:922
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
            //$LASTPOS=1000910;//user.PlainChar:910
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000922;//user.PlainChar:922
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    angle1 :function _trc_PlainChar_angle1(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.atan2(y,x);
    },
    fiber$angle1 :function _trc_PlainChar_f_angle1(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.atan2(y,x);return;
      
      
      _thread.retVal=_this;return;
    },
    color :function _trc_PlainChar_color(r,g,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    fiber$color :function _trc_PlainChar_f_color(_thread,r,g,b) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    drawText :function _trc_PlainChar_drawText(x,y,text,col,size) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var tp;
      
      //$LASTPOS=1001065;//user.PlainChar:1065
      if (Tonyu.globals.$debug) {
        return _this;
      }
      //$LASTPOS=1001089;//user.PlainChar:1089
      if (! size) {
        //$LASTPOS=1001100;//user.PlainChar:1100
        size=15;
      }
      //$LASTPOS=1001113;//user.PlainChar:1113
      if (! col) {
        //$LASTPOS=1001123;//user.PlainChar:1123
        col="cyan";
      }
      //$LASTPOS=1001139;//user.PlainChar:1139
      tp = _this.all(Tonyu.classes.user.T1Text).find((function anonymous_1163(t) {
        
        return t.hidden;
      }));
      //$LASTPOS=1001192;//user.PlainChar:1192
      if (tp.length>0) {
        //$LASTPOS=1001219;//user.PlainChar:1219
        tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
        
      } else {
        //$LASTPOS=1001296;//user.PlainChar:1296
        new Tonyu.classes.user.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
        
      }
    },
    drawLine :function _trc_PlainChar_drawLine(x,y,tx,ty,col) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var tp;
      
      //$LASTPOS=1001379;//user.PlainChar:1379
      if (! col) {
        //$LASTPOS=1001389;//user.PlainChar:1389
        col="white";
      }
      //$LASTPOS=1001406;//user.PlainChar:1406
      tp = _this.all(Tonyu.classes.user.T1Line).find((function anonymous_1430(t) {
        
        return t.hidden;
      }));
      //$LASTPOS=1001459;//user.PlainChar:1459
      if (tp.length>0) {
        //$LASTPOS=1001486;//user.PlainChar:1486
        tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
        
      } else {
        //$LASTPOS=1001535;//user.PlainChar:1535
        new Tonyu.classes.user.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
        
      }
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
      
      //$LASTPOS=1001666;//user.PlainChar:1666
      _this.all().die();
      //$LASTPOS=1001683;//user.PlainChar:1683
      new page(arg);
      //$LASTPOS=1001702;//user.PlainChar:1702
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1001666;//user.PlainChar:1666
      _this.all().die();
      //$LASTPOS=1001683;//user.PlainChar:1683
      new page(arg);
      //$LASTPOS=1001702;//user.PlainChar:1702
      _this.die();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"angle1":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.SecretChar',
  shortName: 'SecretChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
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
  fullName: 'user.SpriteChar',
  shortName: 'SpriteChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
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
      
      //$LASTPOS=2000040;//user.SpriteChar:40
      Tonyu.classes.user.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=2000058;//user.SpriteChar:58
      _this.f=f;
      //$LASTPOS=2000072;//user.SpriteChar:72
      if (! _this.x) {
        //$LASTPOS=2000085;//user.SpriteChar:85
        _this.x=0;
      }
      //$LASTPOS=2000099;//user.SpriteChar:99
      if (! _this.y) {
        //$LASTPOS=2000112;//user.SpriteChar:112
        _this.y=0;
      }
      //$LASTPOS=2000126;//user.SpriteChar:126
      if (! _this.p) {
        //$LASTPOS=2000139;//user.SpriteChar:139
        _this.p=0;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000166;//user.SpriteChar:166
      if (_this.f) {
        //$LASTPOS=2000183;//user.SpriteChar:183
        if (! _this.scaleY) {
          //$LASTPOS=2000196;//user.SpriteChar:196
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=2000219;//user.SpriteChar:219
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=2000241;//user.SpriteChar:241
      Tonyu.classes.user.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=2000260;//user.SpriteChar:260
      if (_this.f) {
        //$LASTPOS=2000267;//user.SpriteChar:267
        _this.scaleX*=- 1;
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.T1Line',
  shortName: 'T1Line',
  namespace: 'user',
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
      
      //$LASTPOS=3000017;//user.T1Line:17
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=3000046;//user.T1Line:46
      ctx.strokeStyle=_this.col;
      //$LASTPOS=3000071;//user.T1Line:71
      ctx.beginPath();
      //$LASTPOS=3000092;//user.T1Line:92
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=3000113;//user.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=3000136;//user.T1Line:136
      ctx.stroke();
      //$LASTPOS=3000154;//user.T1Line:154
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.T1Map',
  shortName: 'T1Map',
  namespace: 'user',
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
      
      //$LASTPOS=4000058;//user.T1Map:58
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000058;//user.T1Map:58
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var f;
      var o;
      
      //$LASTPOS=4000445;//user.T1Map:445
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=4000487;//user.T1Map:487
      o = f.obj();
      //$LASTPOS=4000506;//user.T1Map:506
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=4000533;//user.T1Map:533
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=4000562;//user.T1Map:562
      _this.baseData=o.baseData;
      //$LASTPOS=4000587;//user.T1Map:587
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=4000628;//user.T1Map:628
      _this.mapData=_this.mapTable;
      //$LASTPOS=4000650;//user.T1Map:650
      _this.row=_this.mapTable.length;
      //$LASTPOS=4000675;//user.T1Map:675
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=4000703;//user.T1Map:703
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=4000746;//user.T1Map:746
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=4000777;//user.T1Map:777
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=4000848;//user.T1Map:848
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=4000445;//user.T1Map:445
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=4000487;//user.T1Map:487
      o = f.obj();
      //$LASTPOS=4000506;//user.T1Map:506
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=4000533;//user.T1Map:533
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=4000562;//user.T1Map:562
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000587;//user.T1Map:587
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=4000628;//user.T1Map:628
            _this.mapData=_this.mapTable;
            //$LASTPOS=4000650;//user.T1Map:650
            _this.row=_this.mapTable.length;
            //$LASTPOS=4000675;//user.T1Map:675
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=4000703;//user.T1Map:703
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=4000746;//user.T1Map:746
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=4000777;//user.T1Map:777
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=4000848;//user.T1Map:848
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
      
      //$LASTPOS=4000886;//user.T1Map:886
      res = [];
      //$LASTPOS=4000902;//user.T1Map:902
      mat.forEach((function anonymous_914(row) {
        var rrow;
        
        //$LASTPOS=4000931;//user.T1Map:931
        rrow = [];
        //$LASTPOS=4000952;//user.T1Map:952
        res.push(rrow);
        //$LASTPOS=4000976;//user.T1Map:976
        row.forEach((function anonymous_988(dat) {
          var t;
          
          //$LASTPOS=4001022;//user.T1Map:1022
          t = tbl[dat[0]];
          //$LASTPOS=4001053;//user.T1Map:1053
          if (t) {
            //$LASTPOS=4001060;//user.T1Map:1060
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=4001118;//user.T1Map:1118
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
      
      //$LASTPOS=4000886;//user.T1Map:886
      res = [];
      //$LASTPOS=4000902;//user.T1Map:902
      mat.forEach((function anonymous_914(row) {
        var rrow;
        
        //$LASTPOS=4000931;//user.T1Map:931
        rrow = [];
        //$LASTPOS=4000952;//user.T1Map:952
        res.push(rrow);
        //$LASTPOS=4000976;//user.T1Map:976
        row.forEach((function anonymous_988(dat) {
          var t;
          
          //$LASTPOS=4001022;//user.T1Map:1022
          t = tbl[dat[0]];
          //$LASTPOS=4001053;//user.T1Map:1053
          if (t) {
            //$LASTPOS=4001060;//user.T1Map:1060
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=4001118;//user.T1Map:1118
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
  fullName: 'user.T1Page',
  shortName: 'T1Page',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
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
      
      //$LASTPOS=5000041;//user.T1Page:41
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=5000070;//user.T1Page:70
      Tonyu.globals.$Boot.setFrameRate(60,5);
      //$LASTPOS=5000100;//user.T1Page:100
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=5000127;//user.T1Page:127
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=5000154;//user.T1Page:154
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=5000183;//user.T1Page:183
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=5000215;//user.T1Page:215
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=5000243;//user.T1Page:243
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=5000273;//user.T1Page:273
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=5000303;//user.T1Page:303
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=5000336;//user.T1Page:336
      Tonyu.globals.$mplayer=new Tonyu.classes.user.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000041;//user.T1Page:41
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=5000070;//user.T1Page:70
      Tonyu.globals.$Boot.setFrameRate(60,5);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000100;//user.T1Page:100
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=5000127;//user.T1Page:127
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=5000154;//user.T1Page:154
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=5000183;//user.T1Page:183
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=5000215;//user.T1Page:215
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=5000243;//user.T1Page:243
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=5000273;//user.T1Page:273
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=5000303;//user.T1Page:303
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=5000336;//user.T1Page:336
            Tonyu.globals.$mplayer=new Tonyu.classes.user.MediaPlayer;
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
  fullName: 'user.T1Text',
  shortName: 'T1Text',
  namespace: 'user',
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
      
      //$LASTPOS=6000015;//user.T1Text:15
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=6000039;//user.T1Text:39
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=6000058;//user.T1Text:58
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.TextChar',
  shortName: 'TextChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
  includes: [],
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
      
      //$LASTPOS=7000044;//user.TextChar:44
      Tonyu.classes.user.PlainChar.apply( _this, [xx,yy,null]);
      //$LASTPOS=7000067;//user.TextChar:67
      if (! _this.text) {
        //$LASTPOS=7000078;//user.TextChar:78
        _this.text="";
      }
      //$LASTPOS=7000091;//user.TextChar:91
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=7000109;//user.TextChar:109
      if (! _this.size) {
        //$LASTPOS=7000120;//user.TextChar:120
        _this.size=20;
      }
      //$LASTPOS=7000133;//user.TextChar:133
      _this.p=null;
      //$LASTPOS=7000145;//user.TextChar:145
      _this.align="left";
      //$LASTPOS=7000163;//user.TextChar:163
      if (! _this.x) {
        //$LASTPOS=7000176;//user.TextChar:176
        _this.x=0;
      }
      //$LASTPOS=7000190;//user.TextChar:190
      if (! _this.y) {
        //$LASTPOS=7000203;//user.TextChar:203
        _this.y=0;
      }
      //$LASTPOS=7000217;//user.TextChar:217
      if (t) {
        //$LASTPOS=7000224;//user.TextChar:224
        _this.text=t;
      }
      //$LASTPOS=7000236;//user.TextChar:236
      if (c) {
        //$LASTPOS=7000243;//user.TextChar:243
        _this.fillStyle=c;
      }
      //$LASTPOS=7000260;//user.TextChar:260
      if (s) {
        //$LASTPOS=7000267;//user.TextChar:267
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=7000294;//user.TextChar:294
      _this.fillStyle=_this.col;
      //$LASTPOS=7000313;//user.TextChar:313
      Tonyu.classes.user.PlainChar.prototype.draw.apply( _this, [ctx]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=8000823;//user.Ball:823
      _this.vx=_this.vy=0;
      //$LASTPOS=8000832;//user.Ball:832
      Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=8000853;//user.Ball:853
      while (1) {
        //$LASTPOS=8000867;//user.Ball:867
        _this.x+=_this.vx;
        //$LASTPOS=8000878;//user.Ball:878
        _this.y+=_this.vy;
        //$LASTPOS=8000889;//user.Ball:889
        if (_this.x<32) {
          //$LASTPOS=8000941;//user.Ball:941
          _this.t=_this.tokuten(1);
          //$LASTPOS=8000963;//user.Ball:963
          if (! _this.t) {
            //$LASTPOS=8000985;//user.Ball:985
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
            //$LASTPOS=8001023;//user.Ball:1023
            _this.vx=_this.abs(_this.vx);
            //$LASTPOS=8001035;//user.Ball:1035
            _this.x=32;
            
          }
          
        }
        //$LASTPOS=8001061;//user.Ball:1061
        if (_this.x>Tonyu.globals.$screenWidth-32) {
          //$LASTPOS=8001126;//user.Ball:1126
          _this.t=_this.tokuten(- 1);
          //$LASTPOS=8001149;//user.Ball:1149
          if (! _this.t) {
            //$LASTPOS=8001171;//user.Ball:1171
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
            //$LASTPOS=8001209;//user.Ball:1209
            _this.vx=- _this.abs(_this.vx);
            //$LASTPOS=8001222;//user.Ball:1222
            _this.x=Tonyu.globals.$screenWidth-32;
            
          }
          
        }
        //$LASTPOS=8001276;//user.Ball:1276
        if (_this.y<32) {
          //$LASTPOS=8001296;//user.Ball:1296
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
          //$LASTPOS=8001330;//user.Ball:1330
          _this.vy=_this.abs(_this.vy);
          //$LASTPOS=8001341;//user.Ball:1341
          _this.y=32;
          
        }
        //$LASTPOS=8001357;//user.Ball:1357
        if (_this.y>Tonyu.globals.$screenHeight-32) {
          //$LASTPOS=8001391;//user.Ball:1391
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
          //$LASTPOS=8001425;//user.Ball:1425
          _this.vy=- _this.abs(_this.vy);
          //$LASTPOS=8001437;//user.Ball:1437
          _this.y=Tonyu.globals.$screenHeight-32;
          
        }
        //$LASTPOS=8001482;//user.Ball:1482
        _this.spd=_this.dist(_this.vx,_this.vy);
        //$LASTPOS=8001503;//user.Ball:1503
        _this.vx=_this.vx*0.99;
        //$LASTPOS=8001519;//user.Ball:1519
        _this.vy=_this.vy*0.99;
        //$LASTPOS=8001559;//user.Ball:1559
        if (_this.spd>30) {
          //$LASTPOS=8001581;//user.Ball:1581
          _this.vx=_this.vx*30/_this.spd;
          //$LASTPOS=8001603;//user.Ball:1603
          _this.vy=_this.vy*30/_this.spd;
          
        }
        //$LASTPOS=8001627;//user.Ball:1627
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000823;//user.Ball:823
      _this.vx=_this.vy=0;
      //$LASTPOS=8000832;//user.Ball:832
      Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000853;//user.Ball:853
          case 1:
            if (!(1)) { __pc=7; break; }
            //$LASTPOS=8000867;//user.Ball:867
            _this.x+=_this.vx;
            //$LASTPOS=8000878;//user.Ball:878
            _this.y+=_this.vy;
            //$LASTPOS=8000889;//user.Ball:889
            if (!(_this.x<32)) { __pc=3; break; }
            //$LASTPOS=8000941;//user.Ball:941
            _this.fiber$tokuten(_thread, 1);
            __pc=2;return;
          case 2:
            _this.t=_thread.retVal;
            
            //$LASTPOS=8000963;//user.Ball:963
            if (! _this.t) {
              //$LASTPOS=8000985;//user.Ball:985
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001023;//user.Ball:1023
              _this.vx=_this.abs(_this.vx);
              //$LASTPOS=8001035;//user.Ball:1035
              _this.x=32;
              
            }
          case 3:
            
            //$LASTPOS=8001061;//user.Ball:1061
            if (!(_this.x>Tonyu.globals.$screenWidth-32)) { __pc=5; break; }
            //$LASTPOS=8001126;//user.Ball:1126
            _this.fiber$tokuten(_thread, - 1);
            __pc=4;return;
          case 4:
            _this.t=_thread.retVal;
            
            //$LASTPOS=8001149;//user.Ball:1149
            if (! _this.t) {
              //$LASTPOS=8001171;//user.Ball:1171
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001209;//user.Ball:1209
              _this.vx=- _this.abs(_this.vx);
              //$LASTPOS=8001222;//user.Ball:1222
              _this.x=Tonyu.globals.$screenWidth-32;
              
            }
          case 5:
            
            //$LASTPOS=8001276;//user.Ball:1276
            if (_this.y<32) {
              //$LASTPOS=8001296;//user.Ball:1296
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001330;//user.Ball:1330
              _this.vy=_this.abs(_this.vy);
              //$LASTPOS=8001341;//user.Ball:1341
              _this.y=32;
              
            }
            //$LASTPOS=8001357;//user.Ball:1357
            if (_this.y>Tonyu.globals.$screenHeight-32) {
              //$LASTPOS=8001391;//user.Ball:1391
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001425;//user.Ball:1425
              _this.vy=- _this.abs(_this.vy);
              //$LASTPOS=8001437;//user.Ball:1437
              _this.y=Tonyu.globals.$screenHeight-32;
              
            }
            //$LASTPOS=8001482;//user.Ball:1482
            _this.spd=_this.dist(_this.vx,_this.vy);
            //$LASTPOS=8001503;//user.Ball:1503
            _this.vx=_this.vx*0.99;
            //$LASTPOS=8001519;//user.Ball:1519
            _this.vy=_this.vy*0.99;
            //$LASTPOS=8001559;//user.Ball:1559
            if (_this.spd>30) {
              //$LASTPOS=8001581;//user.Ball:1581
              _this.vx=_this.vx*30/_this.spd;
              //$LASTPOS=8001603;//user.Ball:1603
              _this.vy=_this.vy*30/_this.spd;
              
            }
            //$LASTPOS=8001627;//user.Ball:1627
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=1;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    tes :function _trc_Ball_tes() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=8000041;//user.Ball:41
      _this.a.b.c();
    },
    tokuten :function _trc_Ball_tokuten(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=8000078;//user.Ball:78
      _this.print("TOK",s);
      //$LASTPOS=8000098;//user.Ball:98
      i;
      //$LASTPOS=8000188;//user.Ball:188
      if (_this.abs(_this.y-Tonyu.globals.$screenHeight/2)<Tonyu.globals.$screenHeight/5) {
        //$LASTPOS=8000242;//user.Ball:242
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_in);
        //$LASTPOS=8000273;//user.Ball:273
        i=0;
        //$LASTPOS=8000278;//user.Ball:278
        while (i<10) {
          //$LASTPOS=8000305;//user.Ball:305
          i+=1;
          //$LASTPOS=8000323;//user.Ball:323
          _this.x+=_this.vx;
          //$LASTPOS=8000329;//user.Ball:329
          _this.y+=_this.vy;
          //$LASTPOS=8000335;//user.Ball:335
          _this.update();
          //$LASTPOS=8000344;//user.Ball:344
          _this.vy=_this.vy/2;
          
        }
        //$LASTPOS=8000371;//user.Ball:371
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_jingle);
        //$LASTPOS=8000436;//user.Ball:436
        if (s<0) {
          //$LASTPOS=8000446;//user.Ball:446
          Tonyu.globals.$tokuten.setValue(Tonyu.globals.$tokuten.value+1);
          
        } else {
          //$LASTPOS=8000498;//user.Ball:498
          Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$tokuten_1.value+1);
          
        }
        //$LASTPOS=8000548;//user.Ball:548
        _this.x-=s*150;
        //$LASTPOS=8000566;//user.Ball:566
        _this.wait(60);
        //$LASTPOS=8000601;//user.Ball:601
        if (Tonyu.globals.$tokuten_1.value>=Tonyu.globals.$pat_tokuten+7||Tonyu.globals.$tokuten.value>=Tonyu.globals.$pat_tokuten+7) {
          //$LASTPOS=8000695;//user.Ball:695
          Tonyu.globals.$Replay_1.show(1);
          //$LASTPOS=8000713;//user.Ball:713
          _this.wait();
          
        }
        //$LASTPOS=8000739;//user.Ball:739
        _this.x=Tonyu.globals.$cX-s*200;
        //$LASTPOS=8000751;//user.Ball:751
        _this.vx=0;
        //$LASTPOS=8000756;//user.Ball:756
        _this.vy=0;
        //$LASTPOS=8000761;//user.Ball:761
        _this.y=_this.rnd(200)-100+Tonyu.globals.$cy;
        return 1;
        
      }
      return 0;
    },
    fiber$tokuten :function _trc_Ball_f_tokuten(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=8000078;//user.Ball:78
      _this.print("TOK",s);
      //$LASTPOS=8000098;//user.Ball:98
      i;
      
      _thread.enter(function _trc_Ball_ent_tokuten(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000188;//user.Ball:188
            if (!(_this.abs(_this.y-Tonyu.globals.$screenHeight/2)<Tonyu.globals.$screenHeight/5)) { __pc=7; break; }
            //$LASTPOS=8000242;//user.Ball:242
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_in);
            //$LASTPOS=8000273;//user.Ball:273
            i=0;
            //$LASTPOS=8000278;//user.Ball:278
          case 1:
            if (!(i<10)) { __pc=3; break; }
            //$LASTPOS=8000305;//user.Ball:305
            i+=1;
            //$LASTPOS=8000323;//user.Ball:323
            _this.x+=_this.vx;
            //$LASTPOS=8000329;//user.Ball:329
            _this.y+=_this.vy;
            //$LASTPOS=8000335;//user.Ball:335
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=8000344;//user.Ball:344
            _this.vy=_this.vy/2;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=8000371;//user.Ball:371
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_jingle);
            //$LASTPOS=8000436;//user.Ball:436
            if (s<0) {
              //$LASTPOS=8000446;//user.Ball:446
              Tonyu.globals.$tokuten.setValue(Tonyu.globals.$tokuten.value+1);
              
            } else {
              //$LASTPOS=8000498;//user.Ball:498
              Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$tokuten_1.value+1);
              
            }
            //$LASTPOS=8000548;//user.Ball:548
            _this.x-=s*150;
            //$LASTPOS=8000566;//user.Ball:566
            _this.fiber$wait(_thread, 60);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=8000601;//user.Ball:601
            if (!(Tonyu.globals.$tokuten_1.value>=Tonyu.globals.$pat_tokuten+7||Tonyu.globals.$tokuten.value>=Tonyu.globals.$pat_tokuten+7)) { __pc=6; break; }
            //$LASTPOS=8000695;//user.Ball:695
            Tonyu.globals.$Replay_1.show(1);
            //$LASTPOS=8000713;//user.Ball:713
            _this.fiber$wait(_thread);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=8000739;//user.Ball:739
            _this.x=Tonyu.globals.$cX-s*200;
            //$LASTPOS=8000751;//user.Ball:751
            _this.vx=0;
            //$LASTPOS=8000756;//user.Ball:756
            _this.vy=0;
            //$LASTPOS=8000761;//user.Ball:761
            _this.y=_this.rnd(200)-100+Tonyu.globals.$cy;
            _thread.exit(1);return;
          case 7:
            
            _thread.exit(0);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"tes":{"nowait":true},"tokuten":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.DxChar',
  shortName: 'DxChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
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
      
      //$LASTPOS=9000054;//user.DxChar:54
      Tonyu.classes.user.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=9000078;//user.DxChar:78
      _this.scaleX=1;
      //$LASTPOS=9000092;//user.DxChar:92
      if (sz) {
        //$LASTPOS=9000100;//user.DxChar:100
        _this.scaleX=sz;
      }
      //$LASTPOS=9000115;//user.DxChar:115
      _this.angle=0;
      //$LASTPOS=9000128;//user.DxChar:128
      if (rt) {
        //$LASTPOS=9000136;//user.DxChar:136
        _this.angle=rt;
      }
      //$LASTPOS=9000150;//user.DxChar:150
      _this.alpha=255;
      //$LASTPOS=9000165;//user.DxChar:165
      if (al) {
        //$LASTPOS=9000173;//user.DxChar:173
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=9000200;//user.DxChar:200
      _this.rotation=_this.angle;
      //$LASTPOS=9000220;//user.DxChar:220
      Tonyu.classes.user.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Enemy',
  shortName: 'Enemy',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Enemy_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000490;//user.Enemy:490
      _this.p=- 1;
      //$LASTPOS=10000496;//user.Enemy:496
      if (! _this.dir) {
        //$LASTPOS=10000506;//user.Enemy:506
        _this.dir=- 1;
      }
      //$LASTPOS=10000514;//user.Enemy:514
      Tonyu.globals.$us=16;
      //$LASTPOS=10000522;//user.Enemy:522
      Tonyu.globals.$ds=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=10000544;//user.Enemy:544
      Tonyu.globals.$cX=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=10000564;//user.Enemy:564
      while (1) {
        //$LASTPOS=10000578;//user.Enemy:578
        if (_this.ty>Tonyu.globals.$us&&_this.ty<Tonyu.globals.$ds) {
          //$LASTPOS=10000600;//user.Enemy:600
          _this.y=_this.ty*0.05+_this.y*0.95;
        }
        //$LASTPOS=10000622;//user.Enemy:622
        if (_this.x<0) {
          //$LASTPOS=10000631;//user.Enemy:631
          _this.x=0;
        }
        //$LASTPOS=10000640;//user.Enemy:640
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=10000660;//user.Enemy:660
          _this.x=Tonyu.globals.$screenWidth;
        }
        //$LASTPOS=10000680;//user.Enemy:680
        if (_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy*10)<50) {
          //$LASTPOS=10000725;//user.Enemy:725
          if (Tonyu.globals.$ball.x-_this.dir*16>_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
            //$LASTPOS=10000771;//user.Enemy:771
            _this.x+=2;
          }
          //$LASTPOS=10000785;//user.Enemy:785
          if (Tonyu.globals.$ball.x-_this.dir*16<_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
            //$LASTPOS=10000831;//user.Enemy:831
            _this.x-=2;
          }
          //$LASTPOS=10000845;//user.Enemy:845
          if (Tonyu.globals.$ball.y>_this.y) {
            //$LASTPOS=10000860;//user.Enemy:860
            _this.ty+=2;
          }
          //$LASTPOS=10000875;//user.Enemy:875
          if (Tonyu.globals.$ball.y<_this.y) {
            //$LASTPOS=10000890;//user.Enemy:890
            _this.ty-=2;
          }
          
        }
        //$LASTPOS=10000907;//user.Enemy:907
        if (Tonyu.globals.$ball.vx*_this.dir<- 0.001) {
          //$LASTPOS=10000942;//user.Enemy:942
          _this.ty=Tonyu.globals.$ball.y+Tonyu.globals.$ball.vy*_this.abs(_this.x-Tonyu.globals.$ball.x)/_this.abs(Tonyu.globals.$ball.vx);
          //$LASTPOS=10001000;//user.Enemy:1000
          while ((_this.ty<Tonyu.globals.$us||_this.ty>Tonyu.globals.$ds)&&_this.abs(Tonyu.globals.$ball.vx)>1) {
            //$LASTPOS=10001060;//user.Enemy:1060
            if (_this.ty<Tonyu.globals.$us) {
              //$LASTPOS=10001072;//user.Enemy:1072
              _this.ty=- (_this.ty-Tonyu.globals.$us)+Tonyu.globals.$us;
            }
            //$LASTPOS=10001102;//user.Enemy:1102
            if (_this.ty>Tonyu.globals.$ds) {
              //$LASTPOS=10001114;//user.Enemy:1114
              _this.ty=- (_this.ty-Tonyu.globals.$ds)+Tonyu.globals.$ds;
            }
            //$LASTPOS=10001144;//user.Enemy:1144
            _this.update();
            
          }
          
        }
        //$LASTPOS=10001174;//user.Enemy:1174
        if ((_this.x-Tonyu.globals.$ball.x)*_this.dir<0.01) {
          //$LASTPOS=10001210;//user.Enemy:1210
          if (_this.dist(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y)<80) {
            //$LASTPOS=10001244;//user.Enemy:1244
            _this.attack();
          }
          
        }
        //$LASTPOS=10001264;//user.Enemy:1264
        _this.update();
        
      }
    },
    fiber$main :function _trc_Enemy_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000490;//user.Enemy:490
      _this.p=- 1;
      //$LASTPOS=10000496;//user.Enemy:496
      if (! _this.dir) {
        //$LASTPOS=10000506;//user.Enemy:506
        _this.dir=- 1;
      }
      //$LASTPOS=10000514;//user.Enemy:514
      Tonyu.globals.$us=16;
      //$LASTPOS=10000522;//user.Enemy:522
      Tonyu.globals.$ds=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=10000544;//user.Enemy:544
      Tonyu.globals.$cX=Tonyu.globals.$screenWidth/2;
      
      _thread.enter(function _trc_Enemy_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000564;//user.Enemy:564
          case 1:
            if (!(1)) { __pc=10; break; }
            //$LASTPOS=10000578;//user.Enemy:578
            if (_this.ty>Tonyu.globals.$us&&_this.ty<Tonyu.globals.$ds) {
              //$LASTPOS=10000600;//user.Enemy:600
              _this.y=_this.ty*0.05+_this.y*0.95;
            }
            //$LASTPOS=10000622;//user.Enemy:622
            if (_this.x<0) {
              //$LASTPOS=10000631;//user.Enemy:631
              _this.x=0;
            }
            //$LASTPOS=10000640;//user.Enemy:640
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=10000660;//user.Enemy:660
              _this.x=Tonyu.globals.$screenWidth;
            }
            //$LASTPOS=10000680;//user.Enemy:680
            if (_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy*10)<50) {
              //$LASTPOS=10000725;//user.Enemy:725
              if (Tonyu.globals.$ball.x-_this.dir*16>_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
                //$LASTPOS=10000771;//user.Enemy:771
                _this.x+=2;
              }
              //$LASTPOS=10000785;//user.Enemy:785
              if (Tonyu.globals.$ball.x-_this.dir*16<_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
                //$LASTPOS=10000831;//user.Enemy:831
                _this.x-=2;
              }
              //$LASTPOS=10000845;//user.Enemy:845
              if (Tonyu.globals.$ball.y>_this.y) {
                //$LASTPOS=10000860;//user.Enemy:860
                _this.ty+=2;
              }
              //$LASTPOS=10000875;//user.Enemy:875
              if (Tonyu.globals.$ball.y<_this.y) {
                //$LASTPOS=10000890;//user.Enemy:890
                _this.ty-=2;
              }
              
            }
            //$LASTPOS=10000907;//user.Enemy:907
            if (!(Tonyu.globals.$ball.vx*_this.dir<- 0.001)) { __pc=5; break; }
            //$LASTPOS=10000942;//user.Enemy:942
            _this.ty=Tonyu.globals.$ball.y+Tonyu.globals.$ball.vy*_this.abs(_this.x-Tonyu.globals.$ball.x)/_this.abs(Tonyu.globals.$ball.vx);
            //$LASTPOS=10001000;//user.Enemy:1000
          case 2:
            if (!((_this.ty<Tonyu.globals.$us||_this.ty>Tonyu.globals.$ds)&&_this.abs(Tonyu.globals.$ball.vx)>1)) { __pc=4; break; }
            //$LASTPOS=10001060;//user.Enemy:1060
            if (_this.ty<Tonyu.globals.$us) {
              //$LASTPOS=10001072;//user.Enemy:1072
              _this.ty=- (_this.ty-Tonyu.globals.$us)+Tonyu.globals.$us;
            }
            //$LASTPOS=10001102;//user.Enemy:1102
            if (_this.ty>Tonyu.globals.$ds) {
              //$LASTPOS=10001114;//user.Enemy:1114
              _this.ty=- (_this.ty-Tonyu.globals.$ds)+Tonyu.globals.$ds;
            }
            //$LASTPOS=10001144;//user.Enemy:1144
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
          case 5:
            
            //$LASTPOS=10001174;//user.Enemy:1174
            if (!((_this.x-Tonyu.globals.$ball.x)*_this.dir<0.01)) { __pc=8; break; }
            //$LASTPOS=10001210;//user.Enemy:1210
            if (!(_this.dist(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y)<80)) { __pc=7; break; }
            //$LASTPOS=10001244;//user.Enemy:1244
            _this.fiber$attack(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=10001264;//user.Enemy:1264
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
    onUpdate :function _trc_Enemy_onUpdate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000061;//user.Enemy:61
      if (_this.dir>0&&Tonyu.globals.$player.manPlay) {
        return _this;
      }
      //$LASTPOS=10000103;//user.Enemy:103
      _this.tracket.y=_this.y;
      //$LASTPOS=10000120;//user.Enemy:120
      if ((_this.x-Tonyu.globals.$cX)*_this.dir<=0) {
        //$LASTPOS=10000141;//user.Enemy:141
        _this.tracket.x=_this.x;
      }
    },
    attack :function _trc_Enemy_attack() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var a;
      
      //$LASTPOS=10000181;//user.Enemy:181
      i;a;
      //$LASTPOS=10000194;//user.Enemy:194
      i=0;
      //$LASTPOS=10000203;//user.Enemy:203
      a=_this.angle1(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y);
      //$LASTPOS=10000238;//user.Enemy:238
      while (i<10) {
        //$LASTPOS=10000261;//user.Enemy:261
        if (_this.rnd(2)==0) {
          //$LASTPOS=10000276;//user.Enemy:276
          a=_this.angle1(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y);
        }
        //$LASTPOS=10000315;//user.Enemy:315
        _this.x+=_this.cos(a)*16;
        //$LASTPOS=10000328;//user.Enemy:328
        _this.y+=_this.sin(a)*16;
        //$LASTPOS=10000350;//user.Enemy:350
        i+=1;
        //$LASTPOS=10000355;//user.Enemy:355
        _this.update();
        
      }
      //$LASTPOS=10000376;//user.Enemy:376
      _this.t=Tonyu.globals.$screenWidth/2-_this.dir*(_this.rnd(100)+150);
      //$LASTPOS=10000417;//user.Enemy:417
      while ((_this.x-_this.t)*_this.dir>0) {
        //$LASTPOS=10000450;//user.Enemy:450
        _this.x-=16*_this.dir;
        //$LASTPOS=10000469;//user.Enemy:469
        _this.update();
        
      }
    },
    fiber$attack :function _trc_Enemy_f_attack(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var a;
      
      //$LASTPOS=10000181;//user.Enemy:181
      i;a;
      //$LASTPOS=10000194;//user.Enemy:194
      i=0;
      
      _thread.enter(function _trc_Enemy_ent_attack(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000203;//user.Enemy:203
            _this.fiber$angle1(_thread, Tonyu.globals.$ball.x-_this.x, Tonyu.globals.$ball.y-_this.y);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=10000238;//user.Enemy:238
          case 2:
            if (!(i<10)) { __pc=6; break; }
            //$LASTPOS=10000261;//user.Enemy:261
            if (!(_this.rnd(2)==0)) { __pc=4; break; }
            //$LASTPOS=10000276;//user.Enemy:276
            _this.fiber$angle1(_thread, Tonyu.globals.$ball.x-_this.x, Tonyu.globals.$ball.y-_this.y);
            __pc=3;return;
          case 3:
            a=_thread.retVal;
            
          case 4:
            
            //$LASTPOS=10000315;//user.Enemy:315
            _this.x+=_this.cos(a)*16;
            //$LASTPOS=10000328;//user.Enemy:328
            _this.y+=_this.sin(a)*16;
            //$LASTPOS=10000350;//user.Enemy:350
            i+=1;
            //$LASTPOS=10000355;//user.Enemy:355
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=10000376;//user.Enemy:376
            _this.t=Tonyu.globals.$screenWidth/2-_this.dir*(_this.rnd(100)+150);
            //$LASTPOS=10000417;//user.Enemy:417
          case 7:
            if (!((_this.x-_this.t)*_this.dir>0)) { __pc=9; break; }
            //$LASTPOS=10000450;//user.Enemy:450
            _this.x-=16*_this.dir;
            //$LASTPOS=10000469;//user.Enemy:469
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=7;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onUpdate":{"nowait":true},"attack":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Page_index',
  shortName: 'Page_index',
  namespace: 'user',
  superclass: Tonyu.classes.user.T1Page,
  includes: [],
  methods: {
    main :function _trc_Page_index_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11000016;//user.Page_index:16
      _this.initGlobals();
      //$LASTPOS=11000031;//user.Page_index:31
      Tonyu.globals.$screenWidth=560;
      //$LASTPOS=11000049;//user.Page_index:49
      Tonyu.globals.$screenHeight=384;
      //$LASTPOS=11000068;//user.Page_index:68
      Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=11000112;//user.Page_index:112
      Tonyu.globals.$player=Tonyu.globals.$Player=new Tonyu.classes.user.Player({p: 5,x: 77,y: 316,manplay: 1});
      //$LASTPOS=11000174;//user.Page_index:174
      Tonyu.globals.$ball=Tonyu.globals.$Ball=new Tonyu.classes.user.Ball({p: 20,x: 222,y: 200});
      //$LASTPOS=11000220;//user.Page_index:220
      Tonyu.globals.$Racket=new Tonyu.classes.user.Racket({p: 17,x: 64,y: 86});
      //$LASTPOS=11000262;//user.Page_index:262
      Tonyu.globals.$Racket_1=new Tonyu.classes.user.Racket({p: 21,x: 128.575592041016,y: 58.8583068847656});
      //$LASTPOS=11000334;//user.Page_index:334
      Tonyu.globals.$Enemy=new Tonyu.classes.user.Enemy({p: 6,x: 477,y: 279,tracket: Tonyu.globals.$Racket_1});
      //$LASTPOS=11000395;//user.Page_index:395
      Tonyu.globals.$tokuten=new Tonyu.classes.user.Tokuten({alpha: 255,angle: 0,p: Tonyu.globals.$pat_tokuten+0,scaleX: 1,x: 236,y: 65});
      //$LASTPOS=11000485;//user.Page_index:485
      Tonyu.globals.$tokuten_1=new Tonyu.classes.user.Tokuten({scaleX: 1,angle: 0,alpha: 255,p: Tonyu.globals.$pat_tokuten+0,x: 306,y: 64});
      //$LASTPOS=11000577;//user.Page_index:577
      Tonyu.globals.$Replay_1=new Tonyu.classes.user.Replay({p: 4,size: 25,x: 138,y: 101,text: "Click Here to Replay"});
      //$LASTPOS=11000662;//user.Page_index:662
      Tonyu.globals.$Enemy_2=new Tonyu.classes.user.Enemy({p: 6,x: 192,y: 293,tracket: Tonyu.globals.$Racket,dir: 1});
      //$LASTPOS=11000731;//user.Page_index:731
      Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 1000});
      //$LASTPOS=11000760;//user.Page_index:760
      Tonyu.globals.$map.load("index.map");
    },
    fiber$main :function _trc_Page_index_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Page_index_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000016;//user.Page_index:16
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=11000031;//user.Page_index:31
            Tonyu.globals.$screenWidth=560;
            //$LASTPOS=11000049;//user.Page_index:49
            Tonyu.globals.$screenHeight=384;
            //$LASTPOS=11000068;//user.Page_index:68
            Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=11000112;//user.Page_index:112
            Tonyu.globals.$player=Tonyu.globals.$Player=new Tonyu.classes.user.Player({p: 5,x: 77,y: 316,manplay: 1});
            //$LASTPOS=11000174;//user.Page_index:174
            Tonyu.globals.$ball=Tonyu.globals.$Ball=new Tonyu.classes.user.Ball({p: 20,x: 222,y: 200});
            //$LASTPOS=11000220;//user.Page_index:220
            Tonyu.globals.$Racket=new Tonyu.classes.user.Racket({p: 17,x: 64,y: 86});
            //$LASTPOS=11000262;//user.Page_index:262
            Tonyu.globals.$Racket_1=new Tonyu.classes.user.Racket({p: 21,x: 128.575592041016,y: 58.8583068847656});
            //$LASTPOS=11000334;//user.Page_index:334
            Tonyu.globals.$Enemy=new Tonyu.classes.user.Enemy({p: 6,x: 477,y: 279,tracket: Tonyu.globals.$Racket_1});
            //$LASTPOS=11000395;//user.Page_index:395
            Tonyu.globals.$tokuten=new Tonyu.classes.user.Tokuten({alpha: 255,angle: 0,p: Tonyu.globals.$pat_tokuten+0,scaleX: 1,x: 236,y: 65});
            //$LASTPOS=11000485;//user.Page_index:485
            Tonyu.globals.$tokuten_1=new Tonyu.classes.user.Tokuten({scaleX: 1,angle: 0,alpha: 255,p: Tonyu.globals.$pat_tokuten+0,x: 306,y: 64});
            //$LASTPOS=11000577;//user.Page_index:577
            Tonyu.globals.$Replay_1=new Tonyu.classes.user.Replay({p: 4,size: 25,x: 138,y: 101,text: "Click Here to Replay"});
            //$LASTPOS=11000662;//user.Page_index:662
            Tonyu.globals.$Enemy_2=new Tonyu.classes.user.Enemy({p: 6,x: 192,y: 293,tracket: Tonyu.globals.$Racket,dir: 1});
            //$LASTPOS=11000731;//user.Page_index:731
            Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 1000});
            //$LASTPOS=11000760;//user.Page_index:760
            Tonyu.globals.$map.load("index.map");
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
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=12000021;//user.Player:21
      _this.dir=1;
      //$LASTPOS=12000028;//user.Player:28
      _this.rs=0.4;
      //$LASTPOS=12000036;//user.Player:36
      _this.setVisible(0);
      //$LASTPOS=12000069;//user.Player:69
      while (1) {
        //$LASTPOS=12000083;//user.Player:83
        if (_this.manPlay) {
          //$LASTPOS=12000135;//user.Player:135
          Tonyu.globals.$Racket.x=Tonyu.globals.$mouseX*_this.rs+Tonyu.globals.$Racket.x*(1-_this.rs);
          //$LASTPOS=12000211;//user.Player:211
          if ((Tonyu.globals.$Racket.x-Tonyu.globals.$screenWidth/2)*_this.dir>=0) {
            //$LASTPOS=12000250;//user.Player:250
            Tonyu.globals.$Racket.x=Tonyu.globals.$screenWidth/2;
          }
          //$LASTPOS=12000284;//user.Player:284
          Tonyu.globals.$Racket.y=Tonyu.globals.$mouseY*_this.rs+Tonyu.globals.$Racket.y*(1-_this.rs);
          
        }
        //$LASTPOS=12000333;//user.Player:333
        if (_this.getkey(32)==1) {
          //$LASTPOS=12000352;//user.Player:352
          _this.manPlay=! _this.manPlay;
        }
        //$LASTPOS=12000374;//user.Player:374
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000021;//user.Player:21
      _this.dir=1;
      //$LASTPOS=12000028;//user.Player:28
      _this.rs=0.4;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000036;//user.Player:36
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=12000069;//user.Player:69
          case 2:
            if (!(1)) { __pc=4; break; }
            //$LASTPOS=12000083;//user.Player:83
            if (_this.manPlay) {
              //$LASTPOS=12000135;//user.Player:135
              Tonyu.globals.$Racket.x=Tonyu.globals.$mouseX*_this.rs+Tonyu.globals.$Racket.x*(1-_this.rs);
              //$LASTPOS=12000211;//user.Player:211
              if ((Tonyu.globals.$Racket.x-Tonyu.globals.$screenWidth/2)*_this.dir>=0) {
                //$LASTPOS=12000250;//user.Player:250
                Tonyu.globals.$Racket.x=Tonyu.globals.$screenWidth/2;
              }
              //$LASTPOS=12000284;//user.Player:284
              Tonyu.globals.$Racket.y=Tonyu.globals.$mouseY*_this.rs+Tonyu.globals.$Racket.y*(1-_this.rs);
              
            }
            //$LASTPOS=12000333;//user.Player:333
            if (_this.getkey(32)==1) {
              //$LASTPOS=12000352;//user.Player:352
              _this.manPlay=! _this.manPlay;
            }
            //$LASTPOS=12000374;//user.Player:374
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
  fullName: 'user.Racket',
  shortName: 'Racket',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Racket_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=13000195;//user.Racket:195
      _this.px=_this.x;
      //$LASTPOS=13000200;//user.Racket:200
      _this.py=_this.y;
      //$LASTPOS=13000206;//user.Racket:206
      while (1) {
        //$LASTPOS=13000220;//user.Racket:220
        _this.px=_this.x;
        //$LASTPOS=13000246;//user.Racket:246
        _this.py=_this.y;
        //$LASTPOS=13000256;//user.Racket:256
        _this.update();
        //$LASTPOS=13000270;//user.Racket:270
        _this.sew-=1;
        //$LASTPOS=13000282;//user.Racket:282
        if (_this.crashTo(Tonyu.globals.$ball)) {
          //$LASTPOS=13000338;//user.Racket:338
          if (_this.sew<=0) {
            //$LASTPOS=13000351;//user.Racket:351
            _this.sew=8;
            //$LASTPOS=13000358;//user.Racket:358
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_shot);
            
          }
          //$LASTPOS=13000392;//user.Racket:392
          _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
          //$LASTPOS=13000419;//user.Racket:419
          _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
          //$LASTPOS=13000446;//user.Racket:446
          _this.spd=1;
          //$LASTPOS=13000461;//user.Racket:461
          if (_this.d<32) {
            //$LASTPOS=13000539;//user.Racket:539
            Tonyu.globals.$ball.x=_this.x+_this.avx*32;
            //$LASTPOS=13000569;//user.Racket:569
            Tonyu.globals.$ball.y=_this.y+_this.avy*32;
            //$LASTPOS=13000599;//user.Racket:599
            _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
            
          }
          //$LASTPOS=13000669;//user.Racket:669
          Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
          //$LASTPOS=13000707;//user.Racket:707
          Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
          
        }
        
      }
    },
    fiber$main :function _trc_Racket_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000195;//user.Racket:195
      _this.px=_this.x;
      //$LASTPOS=13000200;//user.Racket:200
      _this.py=_this.y;
      
      _thread.enter(function _trc_Racket_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000206;//user.Racket:206
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=13000220;//user.Racket:220
            _this.px=_this.x;
            //$LASTPOS=13000246;//user.Racket:246
            _this.py=_this.y;
            //$LASTPOS=13000256;//user.Racket:256
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=13000270;//user.Racket:270
            _this.sew-=1;
            //$LASTPOS=13000282;//user.Racket:282
            if (_this.crashTo(Tonyu.globals.$ball)) {
              //$LASTPOS=13000338;//user.Racket:338
              if (_this.sew<=0) {
                //$LASTPOS=13000351;//user.Racket:351
                _this.sew=8;
                //$LASTPOS=13000358;//user.Racket:358
                Tonyu.globals.$mplayer.play(Tonyu.globals.$se_shot);
                
              }
              //$LASTPOS=13000392;//user.Racket:392
              _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
              //$LASTPOS=13000419;//user.Racket:419
              _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
              //$LASTPOS=13000446;//user.Racket:446
              _this.spd=1;
              //$LASTPOS=13000461;//user.Racket:461
              if (_this.d<32) {
                //$LASTPOS=13000539;//user.Racket:539
                Tonyu.globals.$ball.x=_this.x+_this.avx*32;
                //$LASTPOS=13000569;//user.Racket:569
                Tonyu.globals.$ball.y=_this.y+_this.avy*32;
                //$LASTPOS=13000599;//user.Racket:599
                _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
                
              }
              //$LASTPOS=13000669;//user.Racket:669
              Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
              //$LASTPOS=13000707;//user.Racket:707
              Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
              
            }
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    crashTo :function _trc_Racket_crashTo(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=13000105;//user.Racket:105
      _this.d=_this.dist(t.x-_this.x,t.y-_this.y)+1;
      return (_this.d<(_this.dist(_this.x-_this.px,_this.y-_this.py)+_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy))/2+32);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"crashTo":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Replay',
  shortName: 'Replay',
  namespace: 'user',
  superclass: Tonyu.classes.user.TextChar,
  includes: [],
  methods: {
    main :function _trc_Replay_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000140;//user.Replay:140
      _this.setVisible(0);
      //$LASTPOS=14000155;//user.Replay:155
      _this.cnt=0;
      //$LASTPOS=14000162;//user.Replay:162
      while (1) {
        //$LASTPOS=14000178;//user.Replay:178
        _this.cnt--;
        //$LASTPOS=14000189;//user.Replay:189
        if (_this.cnt==0) {
          //$LASTPOS=14000211;//user.Replay:211
          _this.replay();
          
        }
        //$LASTPOS=14000231;//user.Replay:231
        _this.update();
        
      }
    },
    fiber$main :function _trc_Replay_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Replay_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000140;//user.Replay:140
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=14000155;//user.Replay:155
            _this.cnt=0;
            //$LASTPOS=14000162;//user.Replay:162
          case 2:
            if (!(1)) { __pc=6; break; }
            //$LASTPOS=14000178;//user.Replay:178
            _this.cnt--;
            //$LASTPOS=14000189;//user.Replay:189
            if (!(_this.cnt==0)) { __pc=4; break; }
            //$LASTPOS=14000211;//user.Replay:211
            _this.fiber$replay(_thread);
            __pc=3;return;
          case 3:
            
          case 4:
            
            //$LASTPOS=14000231;//user.Replay:231
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onMouseDown :function _trc_Replay_onMouseDown() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000092;//user.Replay:92
      if (! Tonyu.globals.$_design_Mode) {
        //$LASTPOS=14000121;//user.Replay:121
        _this.replay();
        
      }
    },
    fiber$onMouseDown :function _trc_Replay_f_onMouseDown(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Replay_ent_onMouseDown(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000092;//user.Replay:92
            if (!(! Tonyu.globals.$_design_Mode)) { __pc=2; break; }
            //$LASTPOS=14000121;//user.Replay:121
            _this.fiber$replay(_thread);
            __pc=1;return;
          case 1:
            
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    show :function _trc_Replay_show() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000266;//user.Replay:266
      _this.setVisible(1);
      //$LASTPOS=14000285;//user.Replay:285
      _this.cnt=600;
    },
    replay :function _trc_Replay_replay() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000320;//user.Replay:320
      Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000361;//user.Replay:361
      Tonyu.globals.$tokuten.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000400;//user.Replay:400
      Tonyu.globals.$ball.notify();
      //$LASTPOS=14000420;//user.Replay:420
      _this.cnt=0;
      //$LASTPOS=14000431;//user.Replay:431
      _this.setVisible(0);
    },
    fiber$replay :function _trc_Replay_f_replay(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000320;//user.Replay:320
      Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000361;//user.Replay:361
      Tonyu.globals.$tokuten.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000400;//user.Replay:400
      Tonyu.globals.$ball.notify();
      //$LASTPOS=14000420;//user.Replay:420
      _this.cnt=0;
      
      _thread.enter(function _trc_Replay_ent_replay(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000431;//user.Replay:431
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onMouseDown":{"nowait":false},"show":{"nowait":true},"replay":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Tokuten',
  shortName: 'Tokuten',
  namespace: 'user',
  superclass: Tonyu.classes.user.DxChar,
  includes: [],
  methods: {
    main :function _trc_Tokuten_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000114;//user.Tokuten:114
      _this.value=_this.p;
      //$LASTPOS=15000124;//user.Tokuten:124
      while (1) {
        //$LASTPOS=15000140;//user.Tokuten:140
        _this.wait();
        //$LASTPOS=15000201;//user.Tokuten:201
        while (_this.scaleY>0.1) {
          //$LASTPOS=15000230;//user.Tokuten:230
          _this.scaleY=_this.scaleY*0.8;
          //$LASTPOS=15000257;//user.Tokuten:257
          _this.update();
          
        }
        //$LASTPOS=15000295;//user.Tokuten:295
        _this.p=_this.value;
        //$LASTPOS=15000308;//user.Tokuten:308
        while (_this.scaleY<1) {
          //$LASTPOS=15000335;//user.Tokuten:335
          _this.scaleY=_this.scaleY*1.5;
          //$LASTPOS=15000362;//user.Tokuten:362
          _this.update();
          
        }
        //$LASTPOS=15000382;//user.Tokuten:382
        _this.scaleY=1;
        
      }
    },
    fiber$main :function _trc_Tokuten_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000114;//user.Tokuten:114
      _this.value=_this.p;
      
      _thread.enter(function _trc_Tokuten_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000124;//user.Tokuten:124
          case 1:
            if (!(1)) { __pc=9; break; }
            //$LASTPOS=15000140;//user.Tokuten:140
            _this.fiber$wait(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=15000201;//user.Tokuten:201
          case 3:
            if (!(_this.scaleY>0.1)) { __pc=5; break; }
            //$LASTPOS=15000230;//user.Tokuten:230
            _this.scaleY=_this.scaleY*0.8;
            //$LASTPOS=15000257;//user.Tokuten:257
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=3;break;
          case 5:
            
            //$LASTPOS=15000295;//user.Tokuten:295
            _this.p=_this.value;
            //$LASTPOS=15000308;//user.Tokuten:308
          case 6:
            if (!(_this.scaleY<1)) { __pc=8; break; }
            //$LASTPOS=15000335;//user.Tokuten:335
            _this.scaleY=_this.scaleY*1.5;
            //$LASTPOS=15000362;//user.Tokuten:362
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
            //$LASTPOS=15000382;//user.Tokuten:382
            _this.scaleY=1;
            __pc=1;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setValue :function _trc_Tokuten_setValue(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=15000094;//user.Tokuten:94
      _this.value=v;
      //$LASTPOS=15000102;//user.Tokuten:102
      _this.notify();
    },
    fiber$setValue :function _trc_Tokuten_f_setValue(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000094;//user.Tokuten:94
      _this.value=v;
      
      _thread.enter(function _trc_Tokuten_ent_setValue(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000102;//user.Tokuten:102
            _this.fiber$notify(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setValue":{"nowait":false}}}
});
