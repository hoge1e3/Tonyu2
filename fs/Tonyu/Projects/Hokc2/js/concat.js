Tonyu.klass.define({
  fullName: 'user.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
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
      var thg;
      
      //$LASTPOS=1000048;//user.PlainChar:48
      if (Tonyu.runMode) {
        //$LASTPOS=1000078;//user.PlainChar:78
        thg = _this.currentThreadGroup();
        //$LASTPOS=1000117;//user.PlainChar:117
        if (thg) {
          //$LASTPOS=1000126;//user.PlainChar:126
          _this._th=thg.addObj(_this,"tMain");
        }
        //$LASTPOS=1000165;//user.PlainChar:165
        _this.initSprite();
        
      }
      //$LASTPOS=1000191;//user.PlainChar:191
      if (typeof  x=="object") {
        //$LASTPOS=1000215;//user.PlainChar:215
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=1000248;//user.PlainChar:248
        if (typeof  x=="number") {
          //$LASTPOS=1000283;//user.PlainChar:283
          _this.x=x;
          //$LASTPOS=1000302;//user.PlainChar:302
          _this.y=y;
          //$LASTPOS=1000321;//user.PlainChar:321
          _this.p=p;
          
        }
      }
    },
    wait :function _trc_PlainChar_wait(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000358;//user.PlainChar:358
      _this._isWaiting=true;
      //$LASTPOS=1000380;//user.PlainChar:380
      if (! t) {
        //$LASTPOS=1000388;//user.PlainChar:388
        t=- 1;
      }
      //$LASTPOS=1000399;//user.PlainChar:399
      while (true) {
        //$LASTPOS=1000422;//user.PlainChar:422
        Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
        //$LASTPOS=1000447;//user.PlainChar:447
        t--;
        //$LASTPOS=1000461;//user.PlainChar:461
        if (! _this._isWaiting||t==0) {
          break;
          
        }
        
      }
      //$LASTPOS=1000505;//user.PlainChar:505
      _this._isWaiting=false;
    },
    fiber$wait :function _trc_PlainChar_f_wait(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000358;//user.PlainChar:358
      _this._isWaiting=true;
      //$LASTPOS=1000380;//user.PlainChar:380
      if (! t) {
        //$LASTPOS=1000388;//user.PlainChar:388
        t=- 1;
      }
      
      _thread.enter(function _trc_PlainChar_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000399;//user.PlainChar:399
          case 1:
            //$LASTPOS=1000422;//user.PlainChar:422
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=1000447;//user.PlainChar:447
            t--;
            //$LASTPOS=1000461;//user.PlainChar:461
            if (!(! _this._isWaiting||t==0)) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=1000505;//user.PlainChar:505
            _this._isWaiting=false;
            _thread.exit(_this);return;
          }
        }
      });
    },
    notify :function _trc_PlainChar_notify() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000544;//user.PlainChar:544
      _this._isWaiting=false;
    },
    fiber$notify :function _trc_PlainChar_f_notify(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000544;//user.PlainChar:544
      _this._isWaiting=false;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000582;//user.PlainChar:582
      _this.onDraw();
      //$LASTPOS=1000597;//user.PlainChar:597
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=1000628;//user.PlainChar:628
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000669;//user.PlainChar:669
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000669;//user.PlainChar:669
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
      
      //$LASTPOS=1000729;//user.PlainChar:729
      _this.onUpdate();
      //$LASTPOS=1000746;//user.PlainChar:746
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000729;//user.PlainChar:729
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000746;//user.PlainChar:746
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
      
      //$LASTPOS=1000811;//user.PlainChar:811
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=1000863;//user.PlainChar:863
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=1000901;//user.PlainChar:901
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=1000933;//user.PlainChar:933
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000811;//user.PlainChar:811
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=1000863;//user.PlainChar:863
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=1000901;//user.PlainChar:901
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000933;//user.PlainChar:933
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
      
      //$LASTPOS=1000965;//user.PlainChar:965
      _this.main();
      //$LASTPOS=1000978;//user.PlainChar:978
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
            //$LASTPOS=1000965;//user.PlainChar:965
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000978;//user.PlainChar:978
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    angle1 :function _trc_PlainChar_angle1(x,y) {
      "use strict";
      var _this=this;
      
      return _this.atan2(y,x);
    },
    fiber$angle1 :function _trc_PlainChar_f_angle1(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.atan2(y,x);return;
      
      
      _thread.retVal=_this;return;
    },
    color :function _trc_PlainChar_color(r,g,b) {
      "use strict";
      var _this=this;
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    fiber$color :function _trc_PlainChar_f_color(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    drawText :function _trc_PlainChar_drawText(x,y,text,col,size) {
      "use strict";
      var _this=this;
      var tp;
      
      //$LASTPOS=1001130;//user.PlainChar:1130
      if (Tonyu.globals.$debug) {
        return _this;
      }
      //$LASTPOS=1001155;//user.PlainChar:1155
      if (! size) {
        //$LASTPOS=1001166;//user.PlainChar:1166
        size=15;
      }
      //$LASTPOS=1001180;//user.PlainChar:1180
      if (! col) {
        //$LASTPOS=1001190;//user.PlainChar:1190
        col="cyan";
      }
      //$LASTPOS=1001207;//user.PlainChar:1207
      tp = _this.all(Tonyu.classes.user.T1Text).find((function anonymous_1231(t) {
        
        return t.hidden;
      }));
      //$LASTPOS=1001261;//user.PlainChar:1261
      if (tp.length>0) {
        //$LASTPOS=1001289;//user.PlainChar:1289
        tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
        
      } else {
        //$LASTPOS=1001368;//user.PlainChar:1368
        new Tonyu.classes.user.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
        
      }
    },
    drawLine :function _trc_PlainChar_drawLine(x,y,tx,ty,col) {
      "use strict";
      var _this=this;
      var tp;
      
      //$LASTPOS=1001455;//user.PlainChar:1455
      if (! col) {
        //$LASTPOS=1001465;//user.PlainChar:1465
        col="white";
      }
      //$LASTPOS=1001483;//user.PlainChar:1483
      tp = _this.all(Tonyu.classes.user.T1Line).find((function anonymous_1507(t) {
        
        return t.hidden;
      }));
      //$LASTPOS=1001537;//user.PlainChar:1537
      if (tp.length>0) {
        //$LASTPOS=1001565;//user.PlainChar:1565
        tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
        
      } else {
        //$LASTPOS=1001616;//user.PlainChar:1616
        new Tonyu.classes.user.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
        
      }
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
    trunc :function _trc_PlainChar_trunc(f) {
      "use strict";
      var _this=this;
      
      return Math.trunc(f);
    },
    loadPage :function _trc_PlainChar_loadPage(page,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1001757;//user.PlainChar:1757
      _this.all().die();
      //$LASTPOS=1001775;//user.PlainChar:1775
      new page(arg);
      //$LASTPOS=1001795;//user.PlainChar:1795
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1001757;//user.PlainChar:1757
      _this.all().die();
      //$LASTPOS=1001775;//user.PlainChar:1775
      new page(arg);
      //$LASTPOS=1001795;//user.PlainChar:1795
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
  fullName: 'user.SpriteChar',
  shortName: 'SpriteChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
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
      
      //$LASTPOS=2000043;//user.SpriteChar:43
      Tonyu.classes.user.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=2000062;//user.SpriteChar:62
      _this.f=f;
      //$LASTPOS=2000077;//user.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=2000090;//user.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=2000105;//user.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=2000118;//user.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=2000133;//user.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=2000146;//user.SpriteChar:146
        _this.p=0;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000176;//user.SpriteChar:176
      if (_this.f) {
        //$LASTPOS=2000194;//user.SpriteChar:194
        if (! _this.scaleY) {
          //$LASTPOS=2000207;//user.SpriteChar:207
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=2000231;//user.SpriteChar:231
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=2000255;//user.SpriteChar:255
      Tonyu.classes.user.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=2000275;//user.SpriteChar:275
      if (_this.f) {
        //$LASTPOS=2000282;//user.SpriteChar:282
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
      
      //$LASTPOS=3000018;//user.T1Line:18
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=3000049;//user.T1Line:49
      ctx.strokeStyle=_this.col;
      //$LASTPOS=3000075;//user.T1Line:75
      ctx.beginPath();
      //$LASTPOS=3000097;//user.T1Line:97
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=3000119;//user.T1Line:119
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=3000143;//user.T1Line:143
      ctx.stroke();
      //$LASTPOS=3000162;//user.T1Line:162
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
      
      //$LASTPOS=4000062;//user.T1Map:62
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000062;//user.T1Map:62
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=4000469;//user.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=4000512;//user.T1Map:512
      o = f.obj();
      //$LASTPOS=4000532;//user.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=4000560;//user.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=4000590;//user.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=4000616;//user.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=4000658;//user.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=4000681;//user.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=4000707;//user.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=4000736;//user.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=4000780;//user.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=4000813;//user.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=4000885;//user.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=4000469;//user.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=4000512;//user.T1Map:512
      o = f.obj();
      //$LASTPOS=4000532;//user.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=4000560;//user.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=4000590;//user.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000616;//user.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=4000658;//user.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=4000681;//user.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=4000707;//user.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=4000736;//user.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=4000780;//user.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=4000813;//user.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=4000885;//user.T1Map:885
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
      
      //$LASTPOS=4000926;//user.T1Map:926
      res = [];
      //$LASTPOS=4000943;//user.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=4000973;//user.T1Map:973
        rrow = [];
        //$LASTPOS=4000995;//user.T1Map:995
        res.push(rrow);
        //$LASTPOS=4001020;//user.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=4001067;//user.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=4001099;//user.T1Map:1099
          if (t) {
            //$LASTPOS=4001106;//user.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=4001165;//user.T1Map:1165
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
      
      //$LASTPOS=4000926;//user.T1Map:926
      res = [];
      //$LASTPOS=4000943;//user.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=4000973;//user.T1Map:973
        rrow = [];
        //$LASTPOS=4000995;//user.T1Map:995
        res.push(rrow);
        //$LASTPOS=4001020;//user.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=4001067;//user.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=4001099;//user.T1Map:1099
          if (t) {
            //$LASTPOS=4001106;//user.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=4001165;//user.T1Map:1165
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
      
      //$LASTPOS=5000044;//user.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=5000074;//user.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60,5);
      //$LASTPOS=5000105;//user.T1Page:105
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=5000133;//user.T1Page:133
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=5000161;//user.T1Page:161
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=5000191;//user.T1Page:191
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=5000224;//user.T1Page:224
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=5000253;//user.T1Page:253
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=5000284;//user.T1Page:284
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=5000315;//user.T1Page:315
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=5000349;//user.T1Page:349
      Tonyu.globals.$mplayer=new Tonyu.classes.user.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000044;//user.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=5000074;//user.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60,5);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000105;//user.T1Page:105
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=5000133;//user.T1Page:133
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=5000161;//user.T1Page:161
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=5000191;//user.T1Page:191
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=5000224;//user.T1Page:224
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=5000253;//user.T1Page:253
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=5000284;//user.T1Page:284
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=5000315;//user.T1Page:315
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=5000349;//user.T1Page:349
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
      
      //$LASTPOS=6000016;//user.T1Text:16
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=6000041;//user.T1Text:41
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=6000061;//user.T1Text:61
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
      
      //$LASTPOS=7000047;//user.TextChar:47
      Tonyu.classes.user.PlainChar.apply( _this, [xx,yy,null]);
      //$LASTPOS=7000071;//user.TextChar:71
      if (! _this.text) {
        //$LASTPOS=7000082;//user.TextChar:82
        _this.text="";
      }
      //$LASTPOS=7000096;//user.TextChar:96
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=7000115;//user.TextChar:115
      if (! _this.size) {
        //$LASTPOS=7000126;//user.TextChar:126
        _this.size=20;
      }
      //$LASTPOS=7000140;//user.TextChar:140
      _this.p=null;
      //$LASTPOS=7000153;//user.TextChar:153
      _this.align="left";
      //$LASTPOS=7000172;//user.TextChar:172
      if (! _this.x) {
        //$LASTPOS=7000185;//user.TextChar:185
        _this.x=0;
      }
      //$LASTPOS=7000200;//user.TextChar:200
      if (! _this.y) {
        //$LASTPOS=7000213;//user.TextChar:213
        _this.y=0;
      }
      //$LASTPOS=7000228;//user.TextChar:228
      if (t) {
        //$LASTPOS=7000235;//user.TextChar:235
        _this.text=t;
      }
      //$LASTPOS=7000248;//user.TextChar:248
      if (c) {
        //$LASTPOS=7000255;//user.TextChar:255
        _this.fillStyle=c;
      }
      //$LASTPOS=7000273;//user.TextChar:273
      if (s) {
        //$LASTPOS=7000280;//user.TextChar:280
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000310;//user.TextChar:310
      _this.fillStyle=_this.col;
      //$LASTPOS=7000330;//user.TextChar:330
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000856;//user.Ball:856
      _this.vx=_this.vy=0;
      //$LASTPOS=8000866;//user.Ball:866
      Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=8000888;//user.Ball:888
      while (1) {
        //$LASTPOS=8000903;//user.Ball:903
        _this.x+=_this.vx;
        //$LASTPOS=8000915;//user.Ball:915
        _this.y+=_this.vy;
        //$LASTPOS=8000927;//user.Ball:927
        if (_this.x<32) {
          //$LASTPOS=8000981;//user.Ball:981
          _this.t=_this.tokuten(1);
          //$LASTPOS=8001004;//user.Ball:1004
          if (! _this.t) {
            //$LASTPOS=8001027;//user.Ball:1027
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
            //$LASTPOS=8001066;//user.Ball:1066
            _this.vx=_this.abs(_this.vx);
            //$LASTPOS=8001078;//user.Ball:1078
            _this.x=32;
            
          }
          
        }
        //$LASTPOS=8001107;//user.Ball:1107
        if (_this.x>Tonyu.globals.$screenWidth-32) {
          //$LASTPOS=8001174;//user.Ball:1174
          _this.t=_this.tokuten(- 1);
          //$LASTPOS=8001198;//user.Ball:1198
          if (! _this.t) {
            //$LASTPOS=8001221;//user.Ball:1221
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
            //$LASTPOS=8001260;//user.Ball:1260
            _this.vx=- _this.abs(_this.vx);
            //$LASTPOS=8001273;//user.Ball:1273
            _this.x=Tonyu.globals.$screenWidth-32;
            
          }
          
        }
        //$LASTPOS=8001331;//user.Ball:1331
        if (_this.y<32) {
          //$LASTPOS=8001352;//user.Ball:1352
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
          //$LASTPOS=8001387;//user.Ball:1387
          _this.vy=_this.abs(_this.vy);
          //$LASTPOS=8001398;//user.Ball:1398
          _this.y=32;
          
        }
        //$LASTPOS=8001416;//user.Ball:1416
        if (_this.y>Tonyu.globals.$screenHeight-32) {
          //$LASTPOS=8001451;//user.Ball:1451
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
          //$LASTPOS=8001486;//user.Ball:1486
          _this.vy=- _this.abs(_this.vy);
          //$LASTPOS=8001498;//user.Ball:1498
          _this.y=Tonyu.globals.$screenHeight-32;
          
        }
        //$LASTPOS=8001546;//user.Ball:1546
        _this.spd=_this.dist(_this.vx,_this.vy);
        //$LASTPOS=8001568;//user.Ball:1568
        _this.vx=_this.vx*0.99;
        //$LASTPOS=8001585;//user.Ball:1585
        _this.vy=_this.vy*0.99;
        //$LASTPOS=8001627;//user.Ball:1627
        if (_this.spd>30) {
          //$LASTPOS=8001650;//user.Ball:1650
          _this.vx=_this.vx*30/_this.spd;
          //$LASTPOS=8001673;//user.Ball:1673
          _this.vy=_this.vy*30/_this.spd;
          
        }
        //$LASTPOS=8001699;//user.Ball:1699
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000856;//user.Ball:856
      _this.vx=_this.vy=0;
      //$LASTPOS=8000866;//user.Ball:866
      Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000888;//user.Ball:888
          case 1:
            if (!(1)) { __pc=7; break; }
            //$LASTPOS=8000903;//user.Ball:903
            _this.x+=_this.vx;
            //$LASTPOS=8000915;//user.Ball:915
            _this.y+=_this.vy;
            //$LASTPOS=8000927;//user.Ball:927
            if (!(_this.x<32)) { __pc=3; break; }
            //$LASTPOS=8000981;//user.Ball:981
            _this.fiber$tokuten(_thread, 1);
            __pc=2;return;
          case 2:
            _this.t=_thread.retVal;
            
            //$LASTPOS=8001004;//user.Ball:1004
            if (! _this.t) {
              //$LASTPOS=8001027;//user.Ball:1027
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001066;//user.Ball:1066
              _this.vx=_this.abs(_this.vx);
              //$LASTPOS=8001078;//user.Ball:1078
              _this.x=32;
              
            }
          case 3:
            
            //$LASTPOS=8001107;//user.Ball:1107
            if (!(_this.x>Tonyu.globals.$screenWidth-32)) { __pc=5; break; }
            //$LASTPOS=8001174;//user.Ball:1174
            _this.fiber$tokuten(_thread, - 1);
            __pc=4;return;
          case 4:
            _this.t=_thread.retVal;
            
            //$LASTPOS=8001198;//user.Ball:1198
            if (! _this.t) {
              //$LASTPOS=8001221;//user.Ball:1221
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001260;//user.Ball:1260
              _this.vx=- _this.abs(_this.vx);
              //$LASTPOS=8001273;//user.Ball:1273
              _this.x=Tonyu.globals.$screenWidth-32;
              
            }
          case 5:
            
            //$LASTPOS=8001331;//user.Ball:1331
            if (_this.y<32) {
              //$LASTPOS=8001352;//user.Ball:1352
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001387;//user.Ball:1387
              _this.vy=_this.abs(_this.vy);
              //$LASTPOS=8001398;//user.Ball:1398
              _this.y=32;
              
            }
            //$LASTPOS=8001416;//user.Ball:1416
            if (_this.y>Tonyu.globals.$screenHeight-32) {
              //$LASTPOS=8001451;//user.Ball:1451
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=8001486;//user.Ball:1486
              _this.vy=- _this.abs(_this.vy);
              //$LASTPOS=8001498;//user.Ball:1498
              _this.y=Tonyu.globals.$screenHeight-32;
              
            }
            //$LASTPOS=8001546;//user.Ball:1546
            _this.spd=_this.dist(_this.vx,_this.vy);
            //$LASTPOS=8001568;//user.Ball:1568
            _this.vx=_this.vx*0.99;
            //$LASTPOS=8001585;//user.Ball:1585
            _this.vy=_this.vy*0.99;
            //$LASTPOS=8001627;//user.Ball:1627
            if (_this.spd>30) {
              //$LASTPOS=8001650;//user.Ball:1650
              _this.vx=_this.vx*30/_this.spd;
              //$LASTPOS=8001673;//user.Ball:1673
              _this.vy=_this.vy*30/_this.spd;
              
            }
            //$LASTPOS=8001699;//user.Ball:1699
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000044;//user.Ball:44
      _this.a.b.c();
    },
    tokuten :function _trc_Ball_tokuten(s) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=8000084;//user.Ball:84
      _this.print("TOK",s);
      //$LASTPOS=8000105;//user.Ball:105
      i;
      //$LASTPOS=8000198;//user.Ball:198
      if (_this.abs(_this.y-Tonyu.globals.$screenHeight/2)<Tonyu.globals.$screenHeight/5) {
        //$LASTPOS=8000253;//user.Ball:253
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_in);
        //$LASTPOS=8000285;//user.Ball:285
        i=0;
        //$LASTPOS=8000290;//user.Ball:290
        while (i<10) {
          //$LASTPOS=8000318;//user.Ball:318
          i+=1;
          //$LASTPOS=8000337;//user.Ball:337
          _this.x+=_this.vx;
          //$LASTPOS=8000343;//user.Ball:343
          _this.y+=_this.vy;
          //$LASTPOS=8000349;//user.Ball:349
          _this.update();
          //$LASTPOS=8000358;//user.Ball:358
          _this.vy=_this.vy/2;
          
        }
        //$LASTPOS=8000387;//user.Ball:387
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_jingle);
        //$LASTPOS=8000454;//user.Ball:454
        if (s<0) {
          //$LASTPOS=8000464;//user.Ball:464
          Tonyu.globals.$tokuten.setValue(Tonyu.globals.$tokuten.value+1);
          
        } else {
          //$LASTPOS=8000517;//user.Ball:517
          Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$tokuten_1.value+1);
          
        }
        //$LASTPOS=8000568;//user.Ball:568
        _this.x-=s*150;
        //$LASTPOS=8000587;//user.Ball:587
        _this.wait(60);
        //$LASTPOS=8000624;//user.Ball:624
        if (Tonyu.globals.$tokuten_1.value>=Tonyu.globals.$pat_tokuten+7||Tonyu.globals.$tokuten.value>=Tonyu.globals.$pat_tokuten+7) {
          //$LASTPOS=8000720;//user.Ball:720
          Tonyu.globals.$Replay_1.show(1);
          //$LASTPOS=8000738;//user.Ball:738
          _this.wait();
          
        }
        //$LASTPOS=8000766;//user.Ball:766
        _this.x=Tonyu.globals.$cX-s*200;
        //$LASTPOS=8000778;//user.Ball:778
        _this.vx=0;
        //$LASTPOS=8000783;//user.Ball:783
        _this.vy=0;
        //$LASTPOS=8000788;//user.Ball:788
        _this.y=_this.rnd(200)-100+Tonyu.globals.$cy;
        return 1;
        
      }
      return 0;
    },
    fiber$tokuten :function _trc_Ball_f_tokuten(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=8000084;//user.Ball:84
      _this.print("TOK",s);
      //$LASTPOS=8000105;//user.Ball:105
      i;
      
      _thread.enter(function _trc_Ball_ent_tokuten(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000198;//user.Ball:198
            if (!(_this.abs(_this.y-Tonyu.globals.$screenHeight/2)<Tonyu.globals.$screenHeight/5)) { __pc=7; break; }
            //$LASTPOS=8000253;//user.Ball:253
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_in);
            //$LASTPOS=8000285;//user.Ball:285
            i=0;
            //$LASTPOS=8000290;//user.Ball:290
          case 1:
            if (!(i<10)) { __pc=3; break; }
            //$LASTPOS=8000318;//user.Ball:318
            i+=1;
            //$LASTPOS=8000337;//user.Ball:337
            _this.x+=_this.vx;
            //$LASTPOS=8000343;//user.Ball:343
            _this.y+=_this.vy;
            //$LASTPOS=8000349;//user.Ball:349
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=8000358;//user.Ball:358
            _this.vy=_this.vy/2;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=8000387;//user.Ball:387
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_jingle);
            //$LASTPOS=8000454;//user.Ball:454
            if (s<0) {
              //$LASTPOS=8000464;//user.Ball:464
              Tonyu.globals.$tokuten.setValue(Tonyu.globals.$tokuten.value+1);
              
            } else {
              //$LASTPOS=8000517;//user.Ball:517
              Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$tokuten_1.value+1);
              
            }
            //$LASTPOS=8000568;//user.Ball:568
            _this.x-=s*150;
            //$LASTPOS=8000587;//user.Ball:587
            _this.fiber$wait(_thread, 60);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=8000624;//user.Ball:624
            if (!(Tonyu.globals.$tokuten_1.value>=Tonyu.globals.$pat_tokuten+7||Tonyu.globals.$tokuten.value>=Tonyu.globals.$pat_tokuten+7)) { __pc=6; break; }
            //$LASTPOS=8000720;//user.Ball:720
            Tonyu.globals.$Replay_1.show(1);
            //$LASTPOS=8000738;//user.Ball:738
            _this.fiber$wait(_thread);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=8000766;//user.Ball:766
            _this.x=Tonyu.globals.$cX-s*200;
            //$LASTPOS=8000778;//user.Ball:778
            _this.vx=0;
            //$LASTPOS=8000783;//user.Ball:783
            _this.vy=0;
            //$LASTPOS=8000788;//user.Ball:788
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
      
      //$LASTPOS=9000057;//user.DxChar:57
      Tonyu.classes.user.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=9000082;//user.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=9000097;//user.DxChar:97
      if (sz) {
        //$LASTPOS=9000105;//user.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=9000121;//user.DxChar:121
      _this.angle=0;
      //$LASTPOS=9000135;//user.DxChar:135
      if (rt) {
        //$LASTPOS=9000143;//user.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=9000158;//user.DxChar:158
      _this.alpha=255;
      //$LASTPOS=9000174;//user.DxChar:174
      if (al) {
        //$LASTPOS=9000182;//user.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9000212;//user.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=9000233;//user.DxChar:233
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000516;//user.Enemy:516
      _this.p=- 1;
      //$LASTPOS=10000523;//user.Enemy:523
      if (! _this.dir) {
        //$LASTPOS=10000533;//user.Enemy:533
        _this.dir=- 1;
      }
      //$LASTPOS=10000542;//user.Enemy:542
      Tonyu.globals.$us=16;
      //$LASTPOS=10000551;//user.Enemy:551
      Tonyu.globals.$ds=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=10000574;//user.Enemy:574
      Tonyu.globals.$cX=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=10000595;//user.Enemy:595
      while (1) {
        //$LASTPOS=10000610;//user.Enemy:610
        if (_this.ty>Tonyu.globals.$us&&_this.ty<Tonyu.globals.$ds) {
          //$LASTPOS=10000632;//user.Enemy:632
          _this.y=_this.ty*0.05+_this.y*0.95;
        }
        //$LASTPOS=10000655;//user.Enemy:655
        if (_this.x<0) {
          //$LASTPOS=10000664;//user.Enemy:664
          _this.x=0;
        }
        //$LASTPOS=10000674;//user.Enemy:674
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=10000694;//user.Enemy:694
          _this.x=Tonyu.globals.$screenWidth;
        }
        //$LASTPOS=10000715;//user.Enemy:715
        if (_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy*10)<50) {
          //$LASTPOS=10000761;//user.Enemy:761
          if (Tonyu.globals.$ball.x-_this.dir*16>_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
            //$LASTPOS=10000807;//user.Enemy:807
            _this.x+=2;
          }
          //$LASTPOS=10000822;//user.Enemy:822
          if (Tonyu.globals.$ball.x-_this.dir*16<_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
            //$LASTPOS=10000868;//user.Enemy:868
            _this.x-=2;
          }
          //$LASTPOS=10000883;//user.Enemy:883
          if (Tonyu.globals.$ball.y>_this.y) {
            //$LASTPOS=10000898;//user.Enemy:898
            _this.ty+=2;
          }
          //$LASTPOS=10000914;//user.Enemy:914
          if (Tonyu.globals.$ball.y<_this.y) {
            //$LASTPOS=10000929;//user.Enemy:929
            _this.ty-=2;
          }
          
        }
        //$LASTPOS=10000948;//user.Enemy:948
        if (Tonyu.globals.$ball.vx*_this.dir<- 0.001) {
          //$LASTPOS=10000984;//user.Enemy:984
          _this.ty=Tonyu.globals.$ball.y+Tonyu.globals.$ball.vy*_this.abs(_this.x-Tonyu.globals.$ball.x)/_this.abs(Tonyu.globals.$ball.vx);
          //$LASTPOS=10001043;//user.Enemy:1043
          while ((_this.ty<Tonyu.globals.$us||_this.ty>Tonyu.globals.$ds)&&_this.abs(Tonyu.globals.$ball.vx)>1) {
            //$LASTPOS=10001104;//user.Enemy:1104
            if (_this.ty<Tonyu.globals.$us) {
              //$LASTPOS=10001116;//user.Enemy:1116
              _this.ty=- (_this.ty-Tonyu.globals.$us)+Tonyu.globals.$us;
            }
            //$LASTPOS=10001147;//user.Enemy:1147
            if (_this.ty>Tonyu.globals.$ds) {
              //$LASTPOS=10001159;//user.Enemy:1159
              _this.ty=- (_this.ty-Tonyu.globals.$ds)+Tonyu.globals.$ds;
            }
            //$LASTPOS=10001190;//user.Enemy:1190
            _this.update();
            
          }
          
        }
        //$LASTPOS=10001223;//user.Enemy:1223
        if ((_this.x-Tonyu.globals.$ball.x)*_this.dir<0.01) {
          //$LASTPOS=10001260;//user.Enemy:1260
          if (_this.dist(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y)<80) {
            //$LASTPOS=10001294;//user.Enemy:1294
            _this.attack();
          }
          
        }
        //$LASTPOS=10001316;//user.Enemy:1316
        _this.update();
        
      }
    },
    fiber$main :function _trc_Enemy_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000516;//user.Enemy:516
      _this.p=- 1;
      //$LASTPOS=10000523;//user.Enemy:523
      if (! _this.dir) {
        //$LASTPOS=10000533;//user.Enemy:533
        _this.dir=- 1;
      }
      //$LASTPOS=10000542;//user.Enemy:542
      Tonyu.globals.$us=16;
      //$LASTPOS=10000551;//user.Enemy:551
      Tonyu.globals.$ds=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=10000574;//user.Enemy:574
      Tonyu.globals.$cX=Tonyu.globals.$screenWidth/2;
      
      _thread.enter(function _trc_Enemy_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000595;//user.Enemy:595
          case 1:
            if (!(1)) { __pc=10; break; }
            //$LASTPOS=10000610;//user.Enemy:610
            if (_this.ty>Tonyu.globals.$us&&_this.ty<Tonyu.globals.$ds) {
              //$LASTPOS=10000632;//user.Enemy:632
              _this.y=_this.ty*0.05+_this.y*0.95;
            }
            //$LASTPOS=10000655;//user.Enemy:655
            if (_this.x<0) {
              //$LASTPOS=10000664;//user.Enemy:664
              _this.x=0;
            }
            //$LASTPOS=10000674;//user.Enemy:674
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=10000694;//user.Enemy:694
              _this.x=Tonyu.globals.$screenWidth;
            }
            //$LASTPOS=10000715;//user.Enemy:715
            if (_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy*10)<50) {
              //$LASTPOS=10000761;//user.Enemy:761
              if (Tonyu.globals.$ball.x-_this.dir*16>_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
                //$LASTPOS=10000807;//user.Enemy:807
                _this.x+=2;
              }
              //$LASTPOS=10000822;//user.Enemy:822
              if (Tonyu.globals.$ball.x-_this.dir*16<_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
                //$LASTPOS=10000868;//user.Enemy:868
                _this.x-=2;
              }
              //$LASTPOS=10000883;//user.Enemy:883
              if (Tonyu.globals.$ball.y>_this.y) {
                //$LASTPOS=10000898;//user.Enemy:898
                _this.ty+=2;
              }
              //$LASTPOS=10000914;//user.Enemy:914
              if (Tonyu.globals.$ball.y<_this.y) {
                //$LASTPOS=10000929;//user.Enemy:929
                _this.ty-=2;
              }
              
            }
            //$LASTPOS=10000948;//user.Enemy:948
            if (!(Tonyu.globals.$ball.vx*_this.dir<- 0.001)) { __pc=5; break; }
            //$LASTPOS=10000984;//user.Enemy:984
            _this.ty=Tonyu.globals.$ball.y+Tonyu.globals.$ball.vy*_this.abs(_this.x-Tonyu.globals.$ball.x)/_this.abs(Tonyu.globals.$ball.vx);
            //$LASTPOS=10001043;//user.Enemy:1043
          case 2:
            if (!((_this.ty<Tonyu.globals.$us||_this.ty>Tonyu.globals.$ds)&&_this.abs(Tonyu.globals.$ball.vx)>1)) { __pc=4; break; }
            //$LASTPOS=10001104;//user.Enemy:1104
            if (_this.ty<Tonyu.globals.$us) {
              //$LASTPOS=10001116;//user.Enemy:1116
              _this.ty=- (_this.ty-Tonyu.globals.$us)+Tonyu.globals.$us;
            }
            //$LASTPOS=10001147;//user.Enemy:1147
            if (_this.ty>Tonyu.globals.$ds) {
              //$LASTPOS=10001159;//user.Enemy:1159
              _this.ty=- (_this.ty-Tonyu.globals.$ds)+Tonyu.globals.$ds;
            }
            //$LASTPOS=10001190;//user.Enemy:1190
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
          case 5:
            
            //$LASTPOS=10001223;//user.Enemy:1223
            if (!((_this.x-Tonyu.globals.$ball.x)*_this.dir<0.01)) { __pc=8; break; }
            //$LASTPOS=10001260;//user.Enemy:1260
            if (!(_this.dist(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y)<80)) { __pc=7; break; }
            //$LASTPOS=10001294;//user.Enemy:1294
            _this.fiber$attack(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=10001316;//user.Enemy:1316
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000065;//user.Enemy:65
      if (_this.dir>0&&Tonyu.globals.$player.manPlay) {
        return _this;
      }
      //$LASTPOS=10000108;//user.Enemy:108
      _this.tracket.y=_this.y;
      //$LASTPOS=10000126;//user.Enemy:126
      if ((_this.x-Tonyu.globals.$cX)*_this.dir<=0) {
        //$LASTPOS=10000147;//user.Enemy:147
        _this.tracket.x=_this.x;
      }
    },
    attack :function _trc_Enemy_attack() {
      "use strict";
      var _this=this;
      var i;
      var a;
      
      //$LASTPOS=10000191;//user.Enemy:191
      i;a;
      //$LASTPOS=10000205;//user.Enemy:205
      i=0;
      //$LASTPOS=10000215;//user.Enemy:215
      a=_this.angle1(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y);
      //$LASTPOS=10000251;//user.Enemy:251
      while (i<10) {
        //$LASTPOS=10000275;//user.Enemy:275
        if (_this.rnd(2)==0) {
          //$LASTPOS=10000290;//user.Enemy:290
          a=_this.angle1(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y);
        }
        //$LASTPOS=10000330;//user.Enemy:330
        _this.x+=_this.cos(a)*16;
        //$LASTPOS=10000343;//user.Enemy:343
        _this.y+=_this.sin(a)*16;
        //$LASTPOS=10000366;//user.Enemy:366
        i+=1;
        //$LASTPOS=10000371;//user.Enemy:371
        _this.update();
        
      }
      //$LASTPOS=10000394;//user.Enemy:394
      _this.t=Tonyu.globals.$screenWidth/2-_this.dir*(_this.rnd(100)+150);
      //$LASTPOS=10000436;//user.Enemy:436
      while ((_this.x-_this.t)*_this.dir>0) {
        //$LASTPOS=10000470;//user.Enemy:470
        _this.x-=16*_this.dir;
        //$LASTPOS=10000490;//user.Enemy:490
        _this.update();
        
      }
    },
    fiber$attack :function _trc_Enemy_f_attack(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var a;
      
      //$LASTPOS=10000191;//user.Enemy:191
      i;a;
      //$LASTPOS=10000205;//user.Enemy:205
      i=0;
      
      _thread.enter(function _trc_Enemy_ent_attack(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000215;//user.Enemy:215
            _this.fiber$angle1(_thread, Tonyu.globals.$ball.x-_this.x, Tonyu.globals.$ball.y-_this.y);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=10000251;//user.Enemy:251
          case 2:
            if (!(i<10)) { __pc=6; break; }
            //$LASTPOS=10000275;//user.Enemy:275
            if (!(_this.rnd(2)==0)) { __pc=4; break; }
            //$LASTPOS=10000290;//user.Enemy:290
            _this.fiber$angle1(_thread, Tonyu.globals.$ball.x-_this.x, Tonyu.globals.$ball.y-_this.y);
            __pc=3;return;
          case 3:
            a=_thread.retVal;
            
          case 4:
            
            //$LASTPOS=10000330;//user.Enemy:330
            _this.x+=_this.cos(a)*16;
            //$LASTPOS=10000343;//user.Enemy:343
            _this.y+=_this.sin(a)*16;
            //$LASTPOS=10000366;//user.Enemy:366
            i+=1;
            //$LASTPOS=10000371;//user.Enemy:371
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=10000394;//user.Enemy:394
            _this.t=Tonyu.globals.$screenWidth/2-_this.dir*(_this.rnd(100)+150);
            //$LASTPOS=10000436;//user.Enemy:436
          case 7:
            if (!((_this.x-_this.t)*_this.dir>0)) { __pc=9; break; }
            //$LASTPOS=10000470;//user.Enemy:470
            _this.x-=16*_this.dir;
            //$LASTPOS=10000490;//user.Enemy:490
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000017;//user.Page_index:17
      _this.initGlobals();
      //$LASTPOS=11000033;//user.Page_index:33
      Tonyu.globals.$screenWidth=560;
      //$LASTPOS=11000052;//user.Page_index:52
      Tonyu.globals.$screenHeight=384;
      //$LASTPOS=11000072;//user.Page_index:72
      Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=11000117;//user.Page_index:117
      Tonyu.globals.$player=Tonyu.globals.$Player=new Tonyu.classes.user.Player({p: 5,x: 77,y: 316,manplay: 1});
      //$LASTPOS=11000180;//user.Page_index:180
      Tonyu.globals.$ball=Tonyu.globals.$Ball=new Tonyu.classes.user.Ball({p: 20,x: 222,y: 200});
      //$LASTPOS=11000227;//user.Page_index:227
      Tonyu.globals.$Racket=new Tonyu.classes.user.Racket({p: 17,x: 64,y: 86});
      //$LASTPOS=11000270;//user.Page_index:270
      Tonyu.globals.$Racket_1=new Tonyu.classes.user.Racket({p: 21,x: 128.575592041016,y: 58.8583068847656});
      //$LASTPOS=11000343;//user.Page_index:343
      Tonyu.globals.$Enemy=new Tonyu.classes.user.Enemy({p: 6,x: 477,y: 279,tracket: Tonyu.globals.$Racket_1});
      //$LASTPOS=11000405;//user.Page_index:405
      Tonyu.globals.$tokuten=new Tonyu.classes.user.Tokuten({alpha: 255,angle: 0,p: Tonyu.globals.$pat_tokuten+0,scaleX: 1,x: 236,y: 65});
      //$LASTPOS=11000496;//user.Page_index:496
      Tonyu.globals.$tokuten_1=new Tonyu.classes.user.Tokuten({scaleX: 1,angle: 0,alpha: 255,p: Tonyu.globals.$pat_tokuten+0,x: 306,y: 64});
      //$LASTPOS=11000589;//user.Page_index:589
      Tonyu.globals.$Replay_1=new Tonyu.classes.user.Replay({p: 4,size: 25,x: 138,y: 101,text: "Click Here to Replay"});
      //$LASTPOS=11000675;//user.Page_index:675
      Tonyu.globals.$Enemy_2=new Tonyu.classes.user.Enemy({p: 6,x: 192,y: 293,tracket: Tonyu.globals.$Racket,dir: 1});
      //$LASTPOS=11000745;//user.Page_index:745
      Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 1000});
      //$LASTPOS=11000775;//user.Page_index:775
      Tonyu.globals.$map.load("index.map");
    },
    fiber$main :function _trc_Page_index_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Page_index_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000017;//user.Page_index:17
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=11000033;//user.Page_index:33
            Tonyu.globals.$screenWidth=560;
            //$LASTPOS=11000052;//user.Page_index:52
            Tonyu.globals.$screenHeight=384;
            //$LASTPOS=11000072;//user.Page_index:72
            Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=11000117;//user.Page_index:117
            Tonyu.globals.$player=Tonyu.globals.$Player=new Tonyu.classes.user.Player({p: 5,x: 77,y: 316,manplay: 1});
            //$LASTPOS=11000180;//user.Page_index:180
            Tonyu.globals.$ball=Tonyu.globals.$Ball=new Tonyu.classes.user.Ball({p: 20,x: 222,y: 200});
            //$LASTPOS=11000227;//user.Page_index:227
            Tonyu.globals.$Racket=new Tonyu.classes.user.Racket({p: 17,x: 64,y: 86});
            //$LASTPOS=11000270;//user.Page_index:270
            Tonyu.globals.$Racket_1=new Tonyu.classes.user.Racket({p: 21,x: 128.575592041016,y: 58.8583068847656});
            //$LASTPOS=11000343;//user.Page_index:343
            Tonyu.globals.$Enemy=new Tonyu.classes.user.Enemy({p: 6,x: 477,y: 279,tracket: Tonyu.globals.$Racket_1});
            //$LASTPOS=11000405;//user.Page_index:405
            Tonyu.globals.$tokuten=new Tonyu.classes.user.Tokuten({alpha: 255,angle: 0,p: Tonyu.globals.$pat_tokuten+0,scaleX: 1,x: 236,y: 65});
            //$LASTPOS=11000496;//user.Page_index:496
            Tonyu.globals.$tokuten_1=new Tonyu.classes.user.Tokuten({scaleX: 1,angle: 0,alpha: 255,p: Tonyu.globals.$pat_tokuten+0,x: 306,y: 64});
            //$LASTPOS=11000589;//user.Page_index:589
            Tonyu.globals.$Replay_1=new Tonyu.classes.user.Replay({p: 4,size: 25,x: 138,y: 101,text: "Click Here to Replay"});
            //$LASTPOS=11000675;//user.Page_index:675
            Tonyu.globals.$Enemy_2=new Tonyu.classes.user.Enemy({p: 6,x: 192,y: 293,tracket: Tonyu.globals.$Racket,dir: 1});
            //$LASTPOS=11000745;//user.Page_index:745
            Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 1000});
            //$LASTPOS=11000775;//user.Page_index:775
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=12000023;//user.Player:23
      _this.dir=1;
      //$LASTPOS=12000031;//user.Player:31
      _this.rs=0.4;
      //$LASTPOS=12000040;//user.Player:40
      _this.setVisible(0);
      //$LASTPOS=12000075;//user.Player:75
      while (1) {
        //$LASTPOS=12000090;//user.Player:90
        if (_this.manPlay) {
          //$LASTPOS=12000144;//user.Player:144
          Tonyu.globals.$Racket.x=Tonyu.globals.$mouseX*_this.rs+Tonyu.globals.$Racket.x*(1-_this.rs);
          //$LASTPOS=12000222;//user.Player:222
          if ((Tonyu.globals.$Racket.x-Tonyu.globals.$screenWidth/2)*_this.dir>=0) {
            //$LASTPOS=12000261;//user.Player:261
            Tonyu.globals.$Racket.x=Tonyu.globals.$screenWidth/2;
          }
          //$LASTPOS=12000296;//user.Player:296
          Tonyu.globals.$Racket.y=Tonyu.globals.$mouseY*_this.rs+Tonyu.globals.$Racket.y*(1-_this.rs);
          
        }
        //$LASTPOS=12000347;//user.Player:347
        if (_this.getkey(32)==1) {
          //$LASTPOS=12000366;//user.Player:366
          _this.manPlay=! _this.manPlay;
        }
        //$LASTPOS=12000389;//user.Player:389
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000023;//user.Player:23
      _this.dir=1;
      //$LASTPOS=12000031;//user.Player:31
      _this.rs=0.4;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000040;//user.Player:40
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=12000075;//user.Player:75
          case 2:
            if (!(1)) { __pc=4; break; }
            //$LASTPOS=12000090;//user.Player:90
            if (_this.manPlay) {
              //$LASTPOS=12000144;//user.Player:144
              Tonyu.globals.$Racket.x=Tonyu.globals.$mouseX*_this.rs+Tonyu.globals.$Racket.x*(1-_this.rs);
              //$LASTPOS=12000222;//user.Player:222
              if ((Tonyu.globals.$Racket.x-Tonyu.globals.$screenWidth/2)*_this.dir>=0) {
                //$LASTPOS=12000261;//user.Player:261
                Tonyu.globals.$Racket.x=Tonyu.globals.$screenWidth/2;
              }
              //$LASTPOS=12000296;//user.Player:296
              Tonyu.globals.$Racket.y=Tonyu.globals.$mouseY*_this.rs+Tonyu.globals.$Racket.y*(1-_this.rs);
              
            }
            //$LASTPOS=12000347;//user.Player:347
            if (_this.getkey(32)==1) {
              //$LASTPOS=12000366;//user.Player:366
              _this.manPlay=! _this.manPlay;
            }
            //$LASTPOS=12000389;//user.Player:389
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000203;//user.Racket:203
      _this.px=_this.x;
      //$LASTPOS=13000208;//user.Racket:208
      _this.py=_this.y;
      //$LASTPOS=13000215;//user.Racket:215
      while (1) {
        //$LASTPOS=13000230;//user.Racket:230
        _this.px=_this.x;
        //$LASTPOS=13000257;//user.Racket:257
        _this.py=_this.y;
        //$LASTPOS=13000268;//user.Racket:268
        _this.update();
        //$LASTPOS=13000283;//user.Racket:283
        _this.sew-=1;
        //$LASTPOS=13000296;//user.Racket:296
        if (_this.crashTo(Tonyu.globals.$ball)) {
          //$LASTPOS=13000354;//user.Racket:354
          if (_this.sew<=0) {
            //$LASTPOS=13000367;//user.Racket:367
            _this.sew=8;
            //$LASTPOS=13000374;//user.Racket:374
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_shot);
            
          }
          //$LASTPOS=13000409;//user.Racket:409
          _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
          //$LASTPOS=13000437;//user.Racket:437
          _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
          //$LASTPOS=13000465;//user.Racket:465
          _this.spd=1;
          //$LASTPOS=13000481;//user.Racket:481
          if (_this.d<32) {
            //$LASTPOS=13000561;//user.Racket:561
            Tonyu.globals.$ball.x=_this.x+_this.avx*32;
            //$LASTPOS=13000592;//user.Racket:592
            Tonyu.globals.$ball.y=_this.y+_this.avy*32;
            //$LASTPOS=13000623;//user.Racket:623
            _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
            
          }
          //$LASTPOS=13000696;//user.Racket:696
          Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
          //$LASTPOS=13000735;//user.Racket:735
          Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
          
        }
        
      }
    },
    fiber$main :function _trc_Racket_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000203;//user.Racket:203
      _this.px=_this.x;
      //$LASTPOS=13000208;//user.Racket:208
      _this.py=_this.y;
      
      _thread.enter(function _trc_Racket_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000215;//user.Racket:215
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=13000230;//user.Racket:230
            _this.px=_this.x;
            //$LASTPOS=13000257;//user.Racket:257
            _this.py=_this.y;
            //$LASTPOS=13000268;//user.Racket:268
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=13000283;//user.Racket:283
            _this.sew-=1;
            //$LASTPOS=13000296;//user.Racket:296
            if (_this.crashTo(Tonyu.globals.$ball)) {
              //$LASTPOS=13000354;//user.Racket:354
              if (_this.sew<=0) {
                //$LASTPOS=13000367;//user.Racket:367
                _this.sew=8;
                //$LASTPOS=13000374;//user.Racket:374
                Tonyu.globals.$mplayer.play(Tonyu.globals.$se_shot);
                
              }
              //$LASTPOS=13000409;//user.Racket:409
              _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
              //$LASTPOS=13000437;//user.Racket:437
              _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
              //$LASTPOS=13000465;//user.Racket:465
              _this.spd=1;
              //$LASTPOS=13000481;//user.Racket:481
              if (_this.d<32) {
                //$LASTPOS=13000561;//user.Racket:561
                Tonyu.globals.$ball.x=_this.x+_this.avx*32;
                //$LASTPOS=13000592;//user.Racket:592
                Tonyu.globals.$ball.y=_this.y+_this.avy*32;
                //$LASTPOS=13000623;//user.Racket:623
                _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
                
              }
              //$LASTPOS=13000696;//user.Racket:696
              Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
              //$LASTPOS=13000735;//user.Racket:735
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000109;//user.Racket:109
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000149;//user.Replay:149
      _this.setVisible(0);
      //$LASTPOS=14000165;//user.Replay:165
      _this.cnt=0;
      //$LASTPOS=14000173;//user.Replay:173
      while (1) {
        //$LASTPOS=14000190;//user.Replay:190
        _this.cnt--;
        //$LASTPOS=14000202;//user.Replay:202
        if (_this.cnt==0) {
          //$LASTPOS=14000225;//user.Replay:225
          _this.replay();
          
        }
        //$LASTPOS=14000247;//user.Replay:247
        _this.update();
        
      }
    },
    fiber$main :function _trc_Replay_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Replay_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000149;//user.Replay:149
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=14000165;//user.Replay:165
            _this.cnt=0;
            //$LASTPOS=14000173;//user.Replay:173
          case 2:
            if (!(1)) { __pc=6; break; }
            //$LASTPOS=14000190;//user.Replay:190
            _this.cnt--;
            //$LASTPOS=14000202;//user.Replay:202
            if (!(_this.cnt==0)) { __pc=4; break; }
            //$LASTPOS=14000225;//user.Replay:225
            _this.fiber$replay(_thread);
            __pc=3;return;
          case 3:
            
          case 4:
            
            //$LASTPOS=14000247;//user.Replay:247
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000096;//user.Replay:96
      if (! Tonyu.globals.$_design_Mode) {
        //$LASTPOS=14000126;//user.Replay:126
        _this.replay();
        
      }
    },
    fiber$onMouseDown :function _trc_Replay_f_onMouseDown(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Replay_ent_onMouseDown(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000096;//user.Replay:96
            if (!(! Tonyu.globals.$_design_Mode)) { __pc=2; break; }
            //$LASTPOS=14000126;//user.Replay:126
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000286;//user.Replay:286
      _this.setVisible(1);
      //$LASTPOS=14000306;//user.Replay:306
      _this.cnt=600;
    },
    replay :function _trc_Replay_replay() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000344;//user.Replay:344
      Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000386;//user.Replay:386
      Tonyu.globals.$tokuten.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000426;//user.Replay:426
      Tonyu.globals.$ball.notify();
      //$LASTPOS=14000447;//user.Replay:447
      _this.cnt=0;
      //$LASTPOS=14000459;//user.Replay:459
      _this.setVisible(0);
    },
    fiber$replay :function _trc_Replay_f_replay(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000344;//user.Replay:344
      Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000386;//user.Replay:386
      Tonyu.globals.$tokuten.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=14000426;//user.Replay:426
      Tonyu.globals.$ball.notify();
      //$LASTPOS=14000447;//user.Replay:447
      _this.cnt=0;
      
      _thread.enter(function _trc_Replay_ent_replay(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000459;//user.Replay:459
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000121;//user.Tokuten:121
      _this.value=_this.p;
      //$LASTPOS=15000133;//user.Tokuten:133
      while (1) {
        //$LASTPOS=15000150;//user.Tokuten:150
        _this.wait();
        //$LASTPOS=15000214;//user.Tokuten:214
        while (_this.scaleY>0.1) {
          //$LASTPOS=15000244;//user.Tokuten:244
          _this.scaleY=_this.scaleY*0.8;
          //$LASTPOS=15000272;//user.Tokuten:272
          _this.update();
          
        }
        //$LASTPOS=15000313;//user.Tokuten:313
        _this.p=_this.value;
        //$LASTPOS=15000327;//user.Tokuten:327
        while (_this.scaleY<1) {
          //$LASTPOS=15000355;//user.Tokuten:355
          _this.scaleY=_this.scaleY*1.5;
          //$LASTPOS=15000383;//user.Tokuten:383
          _this.update();
          
        }
        //$LASTPOS=15000405;//user.Tokuten:405
        _this.scaleY=1;
        
      }
    },
    fiber$main :function _trc_Tokuten_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000121;//user.Tokuten:121
      _this.value=_this.p;
      
      _thread.enter(function _trc_Tokuten_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000133;//user.Tokuten:133
          case 1:
            if (!(1)) { __pc=9; break; }
            //$LASTPOS=15000150;//user.Tokuten:150
            _this.fiber$wait(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=15000214;//user.Tokuten:214
          case 3:
            if (!(_this.scaleY>0.1)) { __pc=5; break; }
            //$LASTPOS=15000244;//user.Tokuten:244
            _this.scaleY=_this.scaleY*0.8;
            //$LASTPOS=15000272;//user.Tokuten:272
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=3;break;
          case 5:
            
            //$LASTPOS=15000313;//user.Tokuten:313
            _this.p=_this.value;
            //$LASTPOS=15000327;//user.Tokuten:327
          case 6:
            if (!(_this.scaleY<1)) { __pc=8; break; }
            //$LASTPOS=15000355;//user.Tokuten:355
            _this.scaleY=_this.scaleY*1.5;
            //$LASTPOS=15000383;//user.Tokuten:383
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
            //$LASTPOS=15000405;//user.Tokuten:405
            _this.scaleY=1;
            __pc=1;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setValue :function _trc_Tokuten_setValue(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000099;//user.Tokuten:99
      _this.value=v;
      //$LASTPOS=15000107;//user.Tokuten:107
      _this.notify();
    },
    fiber$setValue :function _trc_Tokuten_f_setValue(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000099;//user.Tokuten:99
      _this.value=v;
      
      _thread.enter(function _trc_Tokuten_ent_setValue(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000107;//user.Tokuten:107
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
