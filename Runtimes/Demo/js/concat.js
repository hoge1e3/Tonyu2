Tonyu.klass.define({
  fullName: 'user.Letter',
  shortName: 'Letter',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Letter_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=58000000;//user.Letter:0
      _this.x=230;
      //$LASTPOS=58000007;//user.Letter:7
      _this.y=460;
      //$LASTPOS=58000014;//user.Letter:14
      _this.vx=- 3+_this.i*0.5;
      //$LASTPOS=58000027;//user.Letter:27
      _this.vy=- 25;
      //$LASTPOS=58000035;//user.Letter:35
      _this.fillStyle="black";
      //$LASTPOS=58000054;//user.Letter:54
      _this.size=40;
      //$LASTPOS=58000063;//user.Letter:63
      while (_this.vy<12) {
        //$LASTPOS=58000082;//user.Letter:82
        _this.x+=_this.vx;
        //$LASTPOS=58000088;//user.Letter:88
        _this.y+=_this.vy;
        //$LASTPOS=58000099;//user.Letter:99
        _this.vy+=1;
        //$LASTPOS=58000110;//user.Letter:110
        _this.update();
        
      }
      //$LASTPOS=58000122;//user.Letter:122
      while (true) {
        //$LASTPOS=58000140;//user.Letter:140
        if ((_this.l=_this.crashTo(Tonyu.classes.user.Letter))&&_this.l.i<_this.i) {
          //$LASTPOS=58000184;//user.Letter:184
          _this.x+=5;
          
        }
        //$LASTPOS=58000200;//user.Letter:200
        _this.update();
        
      }
    },
    fiber$main :function _trc_Letter_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=58000000;//user.Letter:0
      _this.x=230;
      //$LASTPOS=58000007;//user.Letter:7
      _this.y=460;
      //$LASTPOS=58000014;//user.Letter:14
      _this.vx=- 3+_this.i*0.5;
      //$LASTPOS=58000027;//user.Letter:27
      _this.vy=- 25;
      //$LASTPOS=58000035;//user.Letter:35
      _this.fillStyle="black";
      //$LASTPOS=58000054;//user.Letter:54
      _this.size=40;
      
      _thread.enter(function _trc_Letter_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=58000063;//user.Letter:63
          case 1:
            if (!(_this.vy<12)) { __pc=3; break; }
            //$LASTPOS=58000082;//user.Letter:82
            _this.x+=_this.vx;
            //$LASTPOS=58000088;//user.Letter:88
            _this.y+=_this.vy;
            //$LASTPOS=58000099;//user.Letter:99
            _this.vy+=1;
            //$LASTPOS=58000110;//user.Letter:110
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=58000122;//user.Letter:122
          case 4:
            //$LASTPOS=58000140;//user.Letter:140
            if ((_this.l=_this.crashTo(Tonyu.classes.user.Letter))&&_this.l.i<_this.i) {
              //$LASTPOS=58000184;//user.Letter:184
              _this.x+=5;
              
            }
            //$LASTPOS=58000200;//user.Letter:200
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=4;break;
          case 6:
            
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
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=59000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=59000029;//user.Main:29
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=59000053;//user.Main:53
      _this.s="Tonyu System 2";
      //$LASTPOS=59000073;//user.Main:73
      //$LASTPOS=59000078;//user.Main:78
      _this.i=0;for (; _this.i<_this.s.length ; _this.i++) {
        {
          //$LASTPOS=59000104;//user.Main:104
          new Tonyu.classes.user.Letter({text: _this.s[_this.i],i: _this.i});
          //$LASTPOS=59000133;//user.Main:133
          _this.updateEx(10);
        }
      }
      //$LASTPOS=59000149;//user.Main:149
      _this.x=50;
      //$LASTPOS=59000155;//user.Main:155
      _this.y=0;
      //$LASTPOS=59000159;//user.Main:159
      _this.vy=0;
      //$LASTPOS=59000165;//user.Main:165
      _this.scaleX=2;
      //$LASTPOS=59000233;//user.Main:233
      while (true) {
        //$LASTPOS=59000252;//user.Main:252
        _this.y+=_this.vy;
        //$LASTPOS=59000258;//user.Main:258
        _this.vy+=1;
        //$LASTPOS=59000283;//user.Main:283
        if (_this.y>220) {
          //$LASTPOS=59000295;//user.Main:295
          _this.y=220;
          //$LASTPOS=59000301;//user.Main:301
          _this.vy=- _this.abs(_this.vy)*0.6;
          //$LASTPOS=59000317;//user.Main:317
          if (_this.vy>- 3) {
            break;
            
          }
          
        }
        //$LASTPOS=59000340;//user.Main:340
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=59000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=59000029;//user.Main:29
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=59000053;//user.Main:53
      _this.s="Tonyu System 2";
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=59000073;//user.Main:73
            //$LASTPOS=59000078;//user.Main:78
            _this.i=0;
          case 1:
            if (!(_this.i<_this.s.length)) { __pc=4; break; }
            //$LASTPOS=59000104;//user.Main:104
            new Tonyu.classes.user.Letter({text: _this.s[_this.i],i: _this.i});
            //$LASTPOS=59000133;//user.Main:133
            _this.fiber$updateEx(_thread, 10);
            __pc=2;return;
          case 2:
            
          case 3:
            _this.i++;
            __pc=1;break;
          case 4:
            
            //$LASTPOS=59000149;//user.Main:149
            _this.x=50;
            //$LASTPOS=59000155;//user.Main:155
            _this.y=0;
            //$LASTPOS=59000159;//user.Main:159
            _this.vy=0;
            //$LASTPOS=59000165;//user.Main:165
            _this.scaleX=2;
            //$LASTPOS=59000233;//user.Main:233
          case 5:
            //$LASTPOS=59000252;//user.Main:252
            _this.y+=_this.vy;
            //$LASTPOS=59000258;//user.Main:258
            _this.vy+=1;
            //$LASTPOS=59000283;//user.Main:283
            if (!(_this.y>220)) { __pc=7; break; }
            //$LASTPOS=59000295;//user.Main:295
            _this.y=220;
            //$LASTPOS=59000301;//user.Main:301
            _this.vy=- _this.abs(_this.vy)*0.6;
            //$LASTPOS=59000317;//user.Main:317
            if (!(_this.vy>- 3)) { __pc=6; break; }
            __pc=9; break;
            
          case 6:
            
          case 7:
            
            //$LASTPOS=59000340;//user.Main:340
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=5;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
