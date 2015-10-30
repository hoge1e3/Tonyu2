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
  fullName: 'user.SecretChar',
  shortName: 'SecretChar',
  namespace: 'user',
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
  fullName: 'user.SpriteChar',
  shortName: 'SpriteChar',
  namespace: 'user',
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
      
      //$LASTPOS=1000043;//user.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=1000062;//user.SpriteChar:62
      _this.f=f;
      //$LASTPOS=1000077;//user.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=1000090;//user.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=1000105;//user.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=1000118;//user.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=1000133;//user.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=1000146;//user.SpriteChar:146
        _this.p=0;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000176;//user.SpriteChar:176
      if (_this.f) {
        //$LASTPOS=1000194;//user.SpriteChar:194
        if (! _this.scaleY) {
          //$LASTPOS=1000207;//user.SpriteChar:207
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=1000231;//user.SpriteChar:231
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=1000255;//user.SpriteChar:255
      Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=1000275;//user.SpriteChar:275
      if (_this.f) {
        //$LASTPOS=1000282;//user.SpriteChar:282
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
      
      //$LASTPOS=2000018;//user.T1Line:18
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=2000049;//user.T1Line:49
      ctx.strokeStyle=_this.col;
      //$LASTPOS=2000075;//user.T1Line:75
      ctx.beginPath();
      //$LASTPOS=2000097;//user.T1Line:97
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=2000119;//user.T1Line:119
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=2000143;//user.T1Line:143
      ctx.stroke();
      //$LASTPOS=2000162;//user.T1Line:162
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
      
      //$LASTPOS=3000064;//user.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000064;//user.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=3000469;//user.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=3000512;//user.T1Map:512
      o = f.obj();
      //$LASTPOS=3000532;//user.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=3000560;//user.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=3000590;//user.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=3000616;//user.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=3000658;//user.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=3000681;//user.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=3000707;//user.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=3000736;//user.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=3000780;//user.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=3000813;//user.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=3000885;//user.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=3000469;//user.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=3000512;//user.T1Map:512
      o = f.obj();
      //$LASTPOS=3000532;//user.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=3000560;//user.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=3000590;//user.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000616;//user.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=3000658;//user.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=3000681;//user.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=3000707;//user.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=3000736;//user.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=3000780;//user.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=3000813;//user.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=3000885;//user.T1Map:885
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
      
      //$LASTPOS=3000926;//user.T1Map:926
      res = [];
      //$LASTPOS=3000943;//user.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=3000973;//user.T1Map:973
        rrow = [];
        //$LASTPOS=3000995;//user.T1Map:995
        res.push(rrow);
        //$LASTPOS=3001020;//user.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=3001067;//user.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=3001099;//user.T1Map:1099
          if (t) {
            //$LASTPOS=3001106;//user.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=3001165;//user.T1Map:1165
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
      
      //$LASTPOS=3000926;//user.T1Map:926
      res = [];
      //$LASTPOS=3000943;//user.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=3000973;//user.T1Map:973
        rrow = [];
        //$LASTPOS=3000995;//user.T1Map:995
        res.push(rrow);
        //$LASTPOS=3001020;//user.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=3001067;//user.T1Map:1067
          t = tbl[dat[0]];
          //$LASTPOS=3001099;//user.T1Map:1099
          if (t) {
            //$LASTPOS=3001106;//user.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=3001165;//user.T1Map:1165
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
      
      //$LASTPOS=4000044;//user.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=4000074;//user.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=4000103;//user.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=4000131;//user.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=4000159;//user.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=4000189;//user.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=4000222;//user.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=4000251;//user.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=4000282;//user.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=4000313;//user.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=4000347;//user.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.user.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000044;//user.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=4000074;//user.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000103;//user.T1Page:103
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=4000131;//user.T1Page:131
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=4000159;//user.T1Page:159
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=4000189;//user.T1Page:189
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=4000222;//user.T1Page:222
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=4000251;//user.T1Page:251
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=4000282;//user.T1Page:282
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=4000313;//user.T1Page:313
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=4000347;//user.T1Page:347
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
      
      //$LASTPOS=5000016;//user.T1Text:16
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=5000041;//user.T1Text:41
      c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=5000081;//user.T1Text:81
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=5000101;//user.T1Text:101
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.TBomb',
  shortName: 'TBomb',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TBomb_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000023;//user.TBomb:23
      while (1) {
        //$LASTPOS=6000040;//user.TBomb:40
        _this.t=0;
        //$LASTPOS=6000078;//user.TBomb:78
        while (_this.t==0) {
          //$LASTPOS=6000101;//user.TBomb:101
          if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
            //$LASTPOS=6000125;//user.TBomb:125
            _this.t=1;
          }
          //$LASTPOS=6000139;//user.TBomb:139
          _this.update();
          
        }
        //$LASTPOS=6000161;//user.TBomb:161
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
        //$LASTPOS=6000199;//user.TBomb:199
        _this.tok=100;
        //$LASTPOS=6000236;//user.TBomb:236
        while (_this.y>- 150) {
          //$LASTPOS=6000261;//user.TBomb:261
          _this.y=_this.y-10;
          //$LASTPOS=6000304;//user.TBomb:304
          if (_this.getkey(37)) {
            //$LASTPOS=6000320;//user.TBomb:320
            if (_this.x>10) {
              //$LASTPOS=6000330;//user.TBomb:330
              _this.x=_this.x-2;
            }
          }
          //$LASTPOS=6000346;//user.TBomb:346
          if (_this.getkey(39)) {
            //$LASTPOS=6000362;//user.TBomb:362
            if (_this.x<500) {
              //$LASTPOS=6000373;//user.TBomb:373
              _this.x=_this.x+2;
            }
          }
          //$LASTPOS=6000389;//user.TBomb:389
          _this.update();
          
        }
        //$LASTPOS=6000443;//user.TBomb:443
        _this.x=_this.rnd()*300+100;
        //$LASTPOS=6000465;//user.TBomb:465
        _this.y=360;
        
      }
    },
    fiber$main :function _trc_TBomb_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TBomb_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000023;//user.TBomb:23
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=6000040;//user.TBomb:40
            _this.t=0;
            //$LASTPOS=6000078;//user.TBomb:78
          case 2:
            if (!(_this.t==0)) { __pc=4; break; }
            //$LASTPOS=6000101;//user.TBomb:101
            if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
              //$LASTPOS=6000125;//user.TBomb:125
              _this.t=1;
            }
            //$LASTPOS=6000139;//user.TBomb:139
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=6000161;//user.TBomb:161
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
            //$LASTPOS=6000199;//user.TBomb:199
            _this.tok=100;
            //$LASTPOS=6000236;//user.TBomb:236
          case 5:
            if (!(_this.y>- 150)) { __pc=7; break; }
            //$LASTPOS=6000261;//user.TBomb:261
            _this.y=_this.y-10;
            //$LASTPOS=6000304;//user.TBomb:304
            if (_this.getkey(37)) {
              //$LASTPOS=6000320;//user.TBomb:320
              if (_this.x>10) {
                //$LASTPOS=6000330;//user.TBomb:330
                _this.x=_this.x-2;
              }
            }
            //$LASTPOS=6000346;//user.TBomb:346
            if (_this.getkey(39)) {
              //$LASTPOS=6000362;//user.TBomb:362
              if (_this.x<500) {
                //$LASTPOS=6000373;//user.TBomb:373
                _this.x=_this.x+2;
              }
            }
            //$LASTPOS=6000389;//user.TBomb:389
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=6000443;//user.TBomb:443
            _this.x=_this.rnd()*300+100;
            //$LASTPOS=6000465;//user.TBomb:465
            _this.y=360;
            __pc=1;break;
          case 8:
            
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
  fullName: 'user.Teki',
  shortName: 'Teki',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Teki_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000502;//user.Teki:502
      _this.tx=_this.x;
      //$LASTPOS=7000507;//user.Teki:507
      _this.ty=_this.y;
      //$LASTPOS=7000512;//user.Teki:512
      _this.vx=_this.vy=0;
      //$LASTPOS=7000522;//user.Teki:522
      while (1) {
        //$LASTPOS=7000538;//user.Teki:538
        _this.c=0;
        //$LASTPOS=7000584;//user.Teki:584
        if (_this.tx>_this.x) {
          //$LASTPOS=7000594;//user.Teki:594
          _this.vx=2+Tonyu.globals.$score/1000;
        }
        //$LASTPOS=7000617;//user.Teki:617
        if (_this.ty>_this.y) {
          //$LASTPOS=7000627;//user.Teki:627
          _this.vy=2+Tonyu.globals.$score/1000;
        }
        //$LASTPOS=7000650;//user.Teki:650
        if (_this.tx<_this.x) {
          //$LASTPOS=7000660;//user.Teki:660
          _this.vx=- 2-Tonyu.globals.$score/1000;
        }
        //$LASTPOS=7000684;//user.Teki:684
        if (_this.ty<_this.y) {
          //$LASTPOS=7000694;//user.Teki:694
          _this.vy=- 2-Tonyu.globals.$score/1000;
        }
        //$LASTPOS=7000732;//user.Teki:732
        _this.w=_this.rnd()*10;
        //$LASTPOS=7000749;//user.Teki:749
        while (_this.c<_this.w) {
          //$LASTPOS=7000770;//user.Teki:770
          _this.x=_this.x+_this.vx;
          //$LASTPOS=7000787;//user.Teki:787
          _this.y=_this.y+_this.vy;
          //$LASTPOS=7000804;//user.Teki:804
          _this.update();
          //$LASTPOS=7000823;//user.Teki:823
          _this.c=_this.c+1;
          
        }
        //$LASTPOS=7000842;//user.Teki:842
        _this.c=0;
        //$LASTPOS=7000852;//user.Teki:852
        _this.p=_this.p+1;
        //$LASTPOS=7000889;//user.Teki:889
        if (_this.rnd()*20<1) {
          //$LASTPOS=7000916;//user.Teki:916
          _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
          //$LASTPOS=7000947;//user.Teki:947
          _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
          
        }
        //$LASTPOS=7001001;//user.Teki:1001
        _this.w=_this.rnd()*20+10;
        //$LASTPOS=7001021;//user.Teki:1021
        while (_this.c<_this.w) {
          //$LASTPOS=7001044;//user.Teki:1044
          _this.update();
          //$LASTPOS=7001063;//user.Teki:1063
          _this.c=_this.c+1;
          
        }
        //$LASTPOS=7001082;//user.Teki:1082
        _this.p=_this.p-1;
        
      }
    },
    fiber$main :function _trc_Teki_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000502;//user.Teki:502
      _this.tx=_this.x;
      //$LASTPOS=7000507;//user.Teki:507
      _this.ty=_this.y;
      //$LASTPOS=7000512;//user.Teki:512
      _this.vx=_this.vy=0;
      
      _thread.enter(function _trc_Teki_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000522;//user.Teki:522
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=7000538;//user.Teki:538
            _this.c=0;
            //$LASTPOS=7000584;//user.Teki:584
            if (_this.tx>_this.x) {
              //$LASTPOS=7000594;//user.Teki:594
              _this.vx=2+Tonyu.globals.$score/1000;
            }
            //$LASTPOS=7000617;//user.Teki:617
            if (_this.ty>_this.y) {
              //$LASTPOS=7000627;//user.Teki:627
              _this.vy=2+Tonyu.globals.$score/1000;
            }
            //$LASTPOS=7000650;//user.Teki:650
            if (_this.tx<_this.x) {
              //$LASTPOS=7000660;//user.Teki:660
              _this.vx=- 2-Tonyu.globals.$score/1000;
            }
            //$LASTPOS=7000684;//user.Teki:684
            if (_this.ty<_this.y) {
              //$LASTPOS=7000694;//user.Teki:694
              _this.vy=- 2-Tonyu.globals.$score/1000;
            }
            //$LASTPOS=7000732;//user.Teki:732
            _this.w=_this.rnd()*10;
            //$LASTPOS=7000749;//user.Teki:749
          case 2:
            if (!(_this.c<_this.w)) { __pc=4; break; }
            //$LASTPOS=7000770;//user.Teki:770
            _this.x=_this.x+_this.vx;
            //$LASTPOS=7000787;//user.Teki:787
            _this.y=_this.y+_this.vy;
            //$LASTPOS=7000804;//user.Teki:804
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=7000823;//user.Teki:823
            _this.c=_this.c+1;
            __pc=2;break;
          case 4:
            
            //$LASTPOS=7000842;//user.Teki:842
            _this.c=0;
            //$LASTPOS=7000852;//user.Teki:852
            _this.p=_this.p+1;
            //$LASTPOS=7000889;//user.Teki:889
            if (_this.rnd()*20<1) {
              //$LASTPOS=7000916;//user.Teki:916
              _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
              //$LASTPOS=7000947;//user.Teki:947
              _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
              
            }
            //$LASTPOS=7001001;//user.Teki:1001
            _this.w=_this.rnd()*20+10;
            //$LASTPOS=7001021;//user.Teki:1021
          case 5:
            if (!(_this.c<_this.w)) { __pc=7; break; }
            //$LASTPOS=7001044;//user.Teki:1044
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=7001063;//user.Teki:1063
            _this.c=_this.c+1;
            __pc=5;break;
          case 7:
            
            //$LASTPOS=7001082;//user.Teki:1082
            _this.p=_this.p-1;
            __pc=1;break;
          case 8:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_Teki_onUpdate() {
      "use strict";
      var _this=this;
      var nto;
      
      //$LASTPOS=7000050;//user.Teki:50
      nto;
      //$LASTPOS=7000089;//user.Teki:89
      if (_this.crashTo(Tonyu.globals.$Jiki)) {
        //$LASTPOS=7000121;//user.Teki:121
        Tonyu.globals.$Jiki.dying=1;
        
      }
      //$LASTPOS=7000148;//user.Teki:148
      if (Tonyu.globals.$bomb.t==1) {
        //$LASTPOS=7000208;//user.Teki:208
        if (_this.crashTo(Tonyu.globals.$bomb)) {
          //$LASTPOS=7000244;//user.Teki:244
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pon);
          //$LASTPOS=7000305;//user.Teki:305
          nto=new Tonyu.classes.user.TTok(_this.x,_this.y,0,0);
          //$LASTPOS=7000341;//user.Teki:341
          nto.sc=Tonyu.globals.$bomb.tok;
          //$LASTPOS=7000372;//user.Teki:372
          _this.appear(nto);
          //$LASTPOS=7000433;//user.Teki:433
          Tonyu.globals.$bomb.tok=Tonyu.globals.$bomb.tok+100;
          //$LASTPOS=7000471;//user.Teki:471
          _this.die();
          
        }
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onUpdate":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.TextChar',
  shortName: 'TextChar',
  namespace: 'user',
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
      
      //$LASTPOS=8000065;//user.TextChar:65
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=8000084;//user.TextChar:84
      _this.text="";
      //$LASTPOS=8000098;//user.TextChar:98
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=8000117;//user.TextChar:117
      _this.size=20;
      //$LASTPOS=8000131;//user.TextChar:131
      if (! _this.x) {
        //$LASTPOS=8000144;//user.TextChar:144
        _this.x=0;
      }
      //$LASTPOS=8000159;//user.TextChar:159
      if (! _this.y) {
        //$LASTPOS=8000172;//user.TextChar:172
        _this.y=0;
      }
      //$LASTPOS=8000187;//user.TextChar:187
      if (t) {
        //$LASTPOS=8000194;//user.TextChar:194
        _this.text=t;
      }
      //$LASTPOS=8000207;//user.TextChar:207
      if (c) {
        //$LASTPOS=8000214;//user.TextChar:214
        _this.fillStyle=c;
      }
      //$LASTPOS=8000232;//user.TextChar:232
      if (s) {
        //$LASTPOS=8000239;//user.TextChar:239
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      var rect;
      
      //$LASTPOS=8000269;//user.TextChar:269
      if (! _this.size) {
        //$LASTPOS=8000280;//user.TextChar:280
        _this.size=15;
      }
      //$LASTPOS=8000294;//user.TextChar:294
      if (! _this.align) {
        //$LASTPOS=8000306;//user.TextChar:306
        _this.align="left";
      }
      //$LASTPOS=8000325;//user.TextChar:325
      if (! _this.fillStyle) {
        //$LASTPOS=8000341;//user.TextChar:341
        _this.fillStyle="white";
      }
      //$LASTPOS=8000365;//user.TextChar:365
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=8000395;//user.TextChar:395
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=8000432;//user.TextChar:432
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=8000468;//user.TextChar:468
      rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
      //$LASTPOS=8000536;//user.TextChar:536
      _this.width=rect.w;
      //$LASTPOS=8000555;//user.TextChar:555
      _this.height=rect.h;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.TJiki',
  shortName: 'TJiki',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TJiki_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9000023;//user.TJiki:23
      _this.an=0;
      //$LASTPOS=9000048;//user.TJiki:48
      while (1) {
        //$LASTPOS=9000064;//user.TJiki:64
        _this.dying=0;
        //$LASTPOS=9000102;//user.TJiki:102
        while (! _this.dying) {
          //$LASTPOS=9000145;//user.TJiki:145
          if (_this.getkey(37)&&_this.x>10) {
            //$LASTPOS=9000169;//user.TJiki:169
            _this.x=_this.x-1;
          }
          //$LASTPOS=9000202;//user.TJiki:202
          if (_this.getkey(39)&&_this.x<500) {
            //$LASTPOS=9000227;//user.TJiki:227
            _this.x=_this.x+1;
          }
          //$LASTPOS=9000259;//user.TJiki:259
          if (_this.getkey(40)) {
            //$LASTPOS=9000275;//user.TJiki:275
            _this.y=_this.y+2;
          }
          //$LASTPOS=9000311;//user.TJiki:311
          _this.y=_this.y+1;
          //$LASTPOS=9000376;//user.TJiki:376
          _this.an+=0.05;
          //$LASTPOS=9000385;//user.TJiki:385
          if (_this.an>=4) {
            //$LASTPOS=9000396;//user.TJiki:396
            _this.an=0;
          }
          //$LASTPOS=9000486;//user.TJiki:486
          if (_this.trunc(_this.an)==0) {
            //$LASTPOS=9000519;//user.TJiki:519
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=9000546;//user.TJiki:546
            _this.f=0;
            
          }
          //$LASTPOS=9000572;//user.TJiki:572
          if (_this.trunc(_this.an)==1) {
            //$LASTPOS=9000605;//user.TJiki:605
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=9000632;//user.TJiki:632
            _this.f=0;
            
          }
          //$LASTPOS=9000657;//user.TJiki:657
          if (_this.trunc(_this.an)==2) {
            //$LASTPOS=9000690;//user.TJiki:690
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=9000717;//user.TJiki:717
            _this.f=1;
            
          }
          //$LASTPOS=9000742;//user.TJiki:742
          if (_this.trunc(_this.an)==3) {
            //$LASTPOS=9000775;//user.TJiki:775
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=9000802;//user.TJiki:802
            _this.f=0;
            
          }
          //$LASTPOS=9000837;//user.TJiki:837
          _this.update();
          
        }
        //$LASTPOS=9000938;//user.TJiki:938
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
        //$LASTPOS=9000967;//user.TJiki:967
        while (_this.dying) {
          //$LASTPOS=9000992;//user.TJiki:992
          _this.y=_this.y+4;
          //$LASTPOS=9001008;//user.TJiki:1008
          _this.update();
          
        }
        
      }
    },
    fiber$main :function _trc_TJiki_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000023;//user.TJiki:23
      _this.an=0;
      
      _thread.enter(function _trc_TJiki_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000048;//user.TJiki:48
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=9000064;//user.TJiki:64
            _this.dying=0;
            //$LASTPOS=9000102;//user.TJiki:102
          case 2:
            if (!(! _this.dying)) { __pc=4; break; }
            //$LASTPOS=9000145;//user.TJiki:145
            if (_this.getkey(37)&&_this.x>10) {
              //$LASTPOS=9000169;//user.TJiki:169
              _this.x=_this.x-1;
            }
            //$LASTPOS=9000202;//user.TJiki:202
            if (_this.getkey(39)&&_this.x<500) {
              //$LASTPOS=9000227;//user.TJiki:227
              _this.x=_this.x+1;
            }
            //$LASTPOS=9000259;//user.TJiki:259
            if (_this.getkey(40)) {
              //$LASTPOS=9000275;//user.TJiki:275
              _this.y=_this.y+2;
            }
            //$LASTPOS=9000311;//user.TJiki:311
            _this.y=_this.y+1;
            //$LASTPOS=9000376;//user.TJiki:376
            _this.an+=0.05;
            //$LASTPOS=9000385;//user.TJiki:385
            if (_this.an>=4) {
              //$LASTPOS=9000396;//user.TJiki:396
              _this.an=0;
            }
            //$LASTPOS=9000486;//user.TJiki:486
            if (_this.trunc(_this.an)==0) {
              //$LASTPOS=9000519;//user.TJiki:519
              _this.p=Tonyu.globals.$pat_ufo+1;
              //$LASTPOS=9000546;//user.TJiki:546
              _this.f=0;
              
            }
            //$LASTPOS=9000572;//user.TJiki:572
            if (_this.trunc(_this.an)==1) {
              //$LASTPOS=9000605;//user.TJiki:605
              _this.p=Tonyu.globals.$pat_ufo+2;
              //$LASTPOS=9000632;//user.TJiki:632
              _this.f=0;
              
            }
            //$LASTPOS=9000657;//user.TJiki:657
            if (_this.trunc(_this.an)==2) {
              //$LASTPOS=9000690;//user.TJiki:690
              _this.p=Tonyu.globals.$pat_ufo+1;
              //$LASTPOS=9000717;//user.TJiki:717
              _this.f=1;
              
            }
            //$LASTPOS=9000742;//user.TJiki:742
            if (_this.trunc(_this.an)==3) {
              //$LASTPOS=9000775;//user.TJiki:775
              _this.p=Tonyu.globals.$pat_ufo+2;
              //$LASTPOS=9000802;//user.TJiki:802
              _this.f=0;
              
            }
            //$LASTPOS=9000837;//user.TJiki:837
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=9000938;//user.TJiki:938
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
            //$LASTPOS=9000967;//user.TJiki:967
          case 5:
            if (!(_this.dying)) { __pc=7; break; }
            //$LASTPOS=9000992;//user.TJiki:992
            _this.y=_this.y+4;
            //$LASTPOS=9001008;//user.TJiki:1008
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            __pc=1;break;
          case 8:
            
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
  fullName: 'user.TLeft',
  shortName: 'TLeft',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TLeft_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000094;//user.TLeft:94
      while (1) {
        //$LASTPOS=10000109;//user.TLeft:109
        _this.update();
        //$LASTPOS=10000124;//user.TLeft:124
        if (Tonyu.globals.$Left<_this.aleft) {
          //$LASTPOS=10000141;//user.TLeft:141
          _this.setVisible(0);
        }
        
      }
    },
    fiber$main :function _trc_TLeft_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TLeft_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000094;//user.TLeft:94
          case 1:
            if (!(1)) { __pc=5; break; }
            //$LASTPOS=10000109;//user.TLeft:109
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=10000124;//user.TLeft:124
            if (!(Tonyu.globals.$Left<_this.aleft)) { __pc=4; break; }
            //$LASTPOS=10000141;//user.TLeft:141
            _this.fiber$setVisible(_thread, 0);
            __pc=3;return;
          case 3:
            
          case 4:
            
            __pc=1;break;
          case 5:
            
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
  fullName: 'user.TRocket',
  shortName: 'TRocket',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TRocket_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000023;//user.TRocket:23
      Tonyu.globals.$score=0;
      //$LASTPOS=11000044;//user.TRocket:44
      Tonyu.globals.$Left=3;
      //$LASTPOS=11000064;//user.TRocket:64
      _this.vx=0;
      //$LASTPOS=11000087;//user.TRocket:87
      Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
      //$LASTPOS=11000117;//user.TRocket:117
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
      //$LASTPOS=11000171;//user.TRocket:171
      while (Tonyu.globals.$Left>=0) {
        //$LASTPOS=11000195;//user.TRocket:195
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
        //$LASTPOS=11000258;//user.TRocket:258
        while (_this.getkey(32)==0) {
          //$LASTPOS=11000291;//user.TRocket:291
          _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
          //$LASTPOS=11000357;//user.TRocket:357
          Tonyu.globals.$Jiki.y=- 50;
          //$LASTPOS=11000425;//user.TRocket:425
          if (_this.x>Tonyu.globals.$screenWidth/2) {
            //$LASTPOS=11000447;//user.TRocket:447
            _this.vx=_this.vx-1;
          } else {
            //$LASTPOS=11000470;//user.TRocket:470
            _this.vx=_this.vx+1;
          }
          //$LASTPOS=11000488;//user.TRocket:488
          _this.x=_this.x+_this.vx;
          //$LASTPOS=11000505;//user.TRocket:505
          _this.update();
          //$LASTPOS=11000524;//user.TRocket:524
          _this.f=(_this.vx<0);
          
        }
        //$LASTPOS=11000572;//user.TRocket:572
        Tonyu.globals.$Jiki.x=_this.x;
        //$LASTPOS=11000588;//user.TRocket:588
        Tonyu.globals.$Jiki.y=_this.y;
        //$LASTPOS=11000605;//user.TRocket:605
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
        //$LASTPOS=11000657;//user.TRocket:657
        while (Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight) {
          //$LASTPOS=11000688;//user.TRocket:688
          _this.update();
          
        }
        //$LASTPOS=11000704;//user.TRocket:704
        if (Tonyu.globals.$Jiki.dying) {
          //$LASTPOS=11000761;//user.TRocket:761
          Tonyu.globals.$Left=Tonyu.globals.$Left-1;
          //$LASTPOS=11000813;//user.TRocket:813
          Tonyu.globals.$Jiki.dying=0;
          
        } else {
          //$LASTPOS=11000901;//user.TRocket:901
          _this.appear(new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
          //$LASTPOS=11001007;//user.TRocket:1007
          _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
          //$LASTPOS=11001078;//user.TRocket:1078
          _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
          //$LASTPOS=11001170;//user.TRocket:1170
          _this.appear(_this.nto);
          
        }
        
      }
      //$LASTPOS=11001208;//user.TRocket:1208
      while (1) {
        //$LASTPOS=11001224;//user.TRocket:1224
        _this.y=_this.y+10;
        //$LASTPOS=11001253;//user.TRocket:1253
        _this.drawText(221,166,"Game Over",_this.color(_this.rnd(255),_this.rnd(255),0),20);
        //$LASTPOS=11001319;//user.TRocket:1319
        _this.drawText(221,190,"Replay F9 ",_this.color(_this.rnd(255),_this.rnd(255),0),20);
        //$LASTPOS=11001386;//user.TRocket:1386
        _this.update();
        
      }
    },
    fiber$main :function _trc_TRocket_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11000023;//user.TRocket:23
      Tonyu.globals.$score=0;
      //$LASTPOS=11000044;//user.TRocket:44
      Tonyu.globals.$Left=3;
      //$LASTPOS=11000064;//user.TRocket:64
      _this.vx=0;
      //$LASTPOS=11000087;//user.TRocket:87
      Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
      //$LASTPOS=11000117;//user.TRocket:117
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
      
      _thread.enter(function _trc_TRocket_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000171;//user.TRocket:171
          case 1:
            if (!(Tonyu.globals.$Left>=0)) { __pc=12; break; }
            //$LASTPOS=11000195;//user.TRocket:195
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
            //$LASTPOS=11000258;//user.TRocket:258
          case 2:
            if (!(_this.getkey(32)==0)) { __pc=4; break; }
            //$LASTPOS=11000291;//user.TRocket:291
            _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
            //$LASTPOS=11000357;//user.TRocket:357
            Tonyu.globals.$Jiki.y=- 50;
            //$LASTPOS=11000425;//user.TRocket:425
            if (_this.x>Tonyu.globals.$screenWidth/2) {
              //$LASTPOS=11000447;//user.TRocket:447
              _this.vx=_this.vx-1;
            } else {
              //$LASTPOS=11000470;//user.TRocket:470
              _this.vx=_this.vx+1;
            }
            //$LASTPOS=11000488;//user.TRocket:488
            _this.x=_this.x+_this.vx;
            //$LASTPOS=11000505;//user.TRocket:505
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=11000524;//user.TRocket:524
            _this.f=(_this.vx<0);
            __pc=2;break;
          case 4:
            
            //$LASTPOS=11000572;//user.TRocket:572
            Tonyu.globals.$Jiki.x=_this.x;
            //$LASTPOS=11000588;//user.TRocket:588
            Tonyu.globals.$Jiki.y=_this.y;
            //$LASTPOS=11000605;//user.TRocket:605
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
            //$LASTPOS=11000657;//user.TRocket:657
          case 5:
            if (!(Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight)) { __pc=7; break; }
            //$LASTPOS=11000688;//user.TRocket:688
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=11000704;//user.TRocket:704
            if (!(Tonyu.globals.$Jiki.dying)) { __pc=8; break; }
            {
              //$LASTPOS=11000761;//user.TRocket:761
              Tonyu.globals.$Left=Tonyu.globals.$Left-1;
              //$LASTPOS=11000813;//user.TRocket:813
              Tonyu.globals.$Jiki.dying=0;
            }
            __pc=11;break;
          case 8:
            //$LASTPOS=11000901;//user.TRocket:901
            _this.fiber$appear(_thread, new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
            __pc=9;return;
          case 9:
            
            //$LASTPOS=11001007;//user.TRocket:1007
            _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
            //$LASTPOS=11001078;//user.TRocket:1078
            _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
            //$LASTPOS=11001170;//user.TRocket:1170
            _this.fiber$appear(_thread, _this.nto);
            __pc=10;return;
          case 10:
            
          case 11:
            
            __pc=1;break;
          case 12:
            
            //$LASTPOS=11001208;//user.TRocket:1208
          case 13:
            if (!(1)) { __pc=15; break; }
            //$LASTPOS=11001224;//user.TRocket:1224
            _this.y=_this.y+10;
            //$LASTPOS=11001253;//user.TRocket:1253
            _this.drawText(221,166,"Game Over",_this.color(_this.rnd(255),_this.rnd(255),0),20);
            //$LASTPOS=11001319;//user.TRocket:1319
            _this.drawText(221,190,"Replay F9 ",_this.color(_this.rnd(255),_this.rnd(255),0),20);
            //$LASTPOS=11001386;//user.TRocket:1386
            _this.fiber$update(_thread);
            __pc=14;return;
          case 14:
            
            __pc=13;break;
          case 15:
            
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
  fullName: 'user.TTok',
  shortName: 'TTok',
  namespace: 'user',
  superclass: Tonyu.classes.user.TextChar,
  includes: [],
  methods: {
    main :function _trc_TTok_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12000030;//user.TTok:30
      _this.ey=_this.y-50;
      //$LASTPOS=12000040;//user.TTok:40
      _this.size=10;
      //$LASTPOS=12000072;//user.TTok:72
      while (_this.y>_this.ey) {
        //$LASTPOS=12000092;//user.TTok:92
        _this.update();
        //$LASTPOS=12000107;//user.TTok:107
        _this.y=_this.y-1;
        //$LASTPOS=12000119;//user.TTok:119
        _this.text=_this.sc;
        
      }
      //$LASTPOS=12000152;//user.TTok:152
      while (_this.sc>=10) {
        //$LASTPOS=12000174;//user.TTok:174
        _this.text=_this.sc;
        //$LASTPOS=12000188;//user.TTok:188
        _this.update();
        //$LASTPOS=12000203;//user.TTok:203
        _this.sc=_this.sc-10;
        //$LASTPOS=12000218;//user.TTok:218
        Tonyu.globals.$score=Tonyu.globals.$score+10;
        
      }
      //$LASTPOS=12000240;//user.TTok:240
      Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
    },
    fiber$main :function _trc_TTok_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000030;//user.TTok:30
      _this.ey=_this.y-50;
      //$LASTPOS=12000040;//user.TTok:40
      _this.size=10;
      
      _thread.enter(function _trc_TTok_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000072;//user.TTok:72
          case 1:
            if (!(_this.y>_this.ey)) { __pc=3; break; }
            //$LASTPOS=12000092;//user.TTok:92
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=12000107;//user.TTok:107
            _this.y=_this.y-1;
            //$LASTPOS=12000119;//user.TTok:119
            _this.text=_this.sc;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=12000152;//user.TTok:152
          case 4:
            if (!(_this.sc>=10)) { __pc=6; break; }
            //$LASTPOS=12000174;//user.TTok:174
            _this.text=_this.sc;
            //$LASTPOS=12000188;//user.TTok:188
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=12000203;//user.TTok:203
            _this.sc=_this.sc-10;
            //$LASTPOS=12000218;//user.TTok:218
            Tonyu.globals.$score=Tonyu.globals.$score+10;
            __pc=4;break;
          case 6:
            
            //$LASTPOS=12000240;//user.TTok:240
            Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
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
  fullName: 'user.TTokSum',
  shortName: 'TTokSum',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TTokSum_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000113;//user.TTokSum:113
      while (1) {
        //$LASTPOS=13000130;//user.TTokSum:130
        _this.update();
        
      }
    },
    fiber$main :function _trc_TTokSum_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TTokSum_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000113;//user.TTokSum:113
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=13000130;//user.TTokSum:130
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
    draw :function _trc_TTokSum_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000067;//user.TTokSum:67
      _this.drawText(_this.x,_this.y,Tonyu.globals.$score,_this.color(0,255,0),20);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
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
      
      //$LASTPOS=14000057;//user.DxChar:57
      Tonyu.classes.user.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=14000082;//user.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=14000097;//user.DxChar:97
      if (sz) {
        //$LASTPOS=14000105;//user.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=14000121;//user.DxChar:121
      _this.angle=0;
      //$LASTPOS=14000135;//user.DxChar:135
      if (rt) {
        //$LASTPOS=14000143;//user.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=14000158;//user.DxChar:158
      _this.alpha=255;
      //$LASTPOS=14000174;//user.DxChar:174
      if (al) {
        //$LASTPOS=14000182;//user.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000212;//user.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=14000233;//user.DxChar:233
      Tonyu.classes.user.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
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
      
      //$LASTPOS=15000017;//user.Page_index:17
      _this.initGlobals();
      //$LASTPOS=15000033;//user.Page_index:33
      Tonyu.globals.$screenWidth=560;
      //$LASTPOS=15000052;//user.Page_index:52
      Tonyu.globals.$screenHeight=376;
      //$LASTPOS=15000072;//user.Page_index:72
      Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=15000117;//user.Page_index:117
      Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
      //$LASTPOS=15000170;//user.Page_index:170
      Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
      //$LASTPOS=15000220;//user.Page_index:220
      Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
      //$LASTPOS=15000270;//user.Page_index:270
      Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
      //$LASTPOS=15000321;//user.Page_index:321
      Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
      //$LASTPOS=15000381;//user.Page_index:381
      Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
      //$LASTPOS=15000441;//user.Page_index:441
      Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
      //$LASTPOS=15000501;//user.Page_index:501
      Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
      //$LASTPOS=15000545;//user.Page_index:545
      Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({p: 0,x: 382,y: 31});
      //$LASTPOS=15000589;//user.Page_index:589
      Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
      //$LASTPOS=15000632;//user.Page_index:632
      Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
      //$LASTPOS=15000701;//user.Page_index:701
      Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 100});
      //$LASTPOS=15000730;//user.Page_index:730
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
            //$LASTPOS=15000017;//user.Page_index:17
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=15000033;//user.Page_index:33
            Tonyu.globals.$screenWidth=560;
            //$LASTPOS=15000052;//user.Page_index:52
            Tonyu.globals.$screenHeight=376;
            //$LASTPOS=15000072;//user.Page_index:72
            Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=15000117;//user.Page_index:117
            Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
            //$LASTPOS=15000170;//user.Page_index:170
            Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
            //$LASTPOS=15000220;//user.Page_index:220
            Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
            //$LASTPOS=15000270;//user.Page_index:270
            Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
            //$LASTPOS=15000321;//user.Page_index:321
            Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
            //$LASTPOS=15000381;//user.Page_index:381
            Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
            //$LASTPOS=15000441;//user.Page_index:441
            Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
            //$LASTPOS=15000501;//user.Page_index:501
            Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
            //$LASTPOS=15000545;//user.Page_index:545
            Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({p: 0,x: 382,y: 31});
            //$LASTPOS=15000589;//user.Page_index:589
            Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
            //$LASTPOS=15000632;//user.Page_index:632
            Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
            //$LASTPOS=15000701;//user.Page_index:701
            Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 100});
            //$LASTPOS=15000730;//user.Page_index:730
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
