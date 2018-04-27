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
      
      //$LASTPOS=67000000;//user.Letter:0
      _this.x=230;
      //$LASTPOS=67000008;//user.Letter:8
      _this.y=455;
      //$LASTPOS=67000016;//user.Letter:16
      _this.vx=- 3+_this.i*0.5;
      //$LASTPOS=67000030;//user.Letter:30
      _this.vy=- 25;
      //$LASTPOS=67000039;//user.Letter:39
      _this.fillStyle="black";
      //$LASTPOS=67000059;//user.Letter:59
      _this.size=38;
      //$LASTPOS=67000069;//user.Letter:69
      while (_this.vy<12) {
        Tonyu.checkLoop();
        //$LASTPOS=67000089;//user.Letter:89
        _this.x+=_this.vx;
        //$LASTPOS=67000095;//user.Letter:95
        _this.y+=_this.vy;
        //$LASTPOS=67000107;//user.Letter:107
        _this.vy+=1;
        //$LASTPOS=67000119;//user.Letter:119
        _this.update();
        
      }
      //$LASTPOS=67000133;//user.Letter:133
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=67000152;//user.Letter:152
        if ((_this.l=_this.crashTo(Tonyu.classes.user.Letter))&&_this.l.i<_this.i) {
          //$LASTPOS=67000197;//user.Letter:197
          _this.x+=5;
          
        }
        //$LASTPOS=67000215;//user.Letter:215
        _this.update();
        
      }
    },
    fiber$main :function _trc_Letter_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=67000000;//user.Letter:0
      _this.x=230;
      //$LASTPOS=67000008;//user.Letter:8
      _this.y=455;
      //$LASTPOS=67000016;//user.Letter:16
      _this.vx=- 3+_this.i*0.5;
      //$LASTPOS=67000030;//user.Letter:30
      _this.vy=- 25;
      //$LASTPOS=67000039;//user.Letter:39
      _this.fillStyle="black";
      //$LASTPOS=67000059;//user.Letter:59
      _this.size=38;
      
      _thread.enter(function _trc_Letter_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=67000069;//user.Letter:69
          case 1:
            if (!(_this.vy<12)) { __pc=3     ; break; }
            //$LASTPOS=67000089;//user.Letter:89
            _this.x+=_this.vx;
            //$LASTPOS=67000095;//user.Letter:95
            _this.y+=_this.vy;
            //$LASTPOS=67000107;//user.Letter:107
            _this.vy+=1;
            //$LASTPOS=67000119;//user.Letter:119
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            //$LASTPOS=67000133;//user.Letter:133
          case 4:
            //$LASTPOS=67000152;//user.Letter:152
            if ((_this.l=_this.crashTo(Tonyu.classes.user.Letter))&&_this.l.i<_this.i) {
              //$LASTPOS=67000197;//user.Letter:197
              _this.x+=5;
              
            }
            //$LASTPOS=67000215;//user.Letter:215
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=4;break;
          case 6     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"vx":{},"i":{},"vy":{},"l":{}}}
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
      
      //$LASTPOS=68000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=68000030;//user.Main:30
      _this.s="Tonyu System 2";
      //$LASTPOS=68000051;//user.Main:51
      //$LASTPOS=68000056;//user.Main:56
      _this.i=0;for (; _this.i<_this.s.length ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=68000083;//user.Main:83
          new Tonyu.classes.user.Letter({text: _this.s[_this.i],i: _this.i});
          //$LASTPOS=68000113;//user.Main:113
          _this.updateEx(10);
        }
      }
      //$LASTPOS=68000131;//user.Main:131
      _this.x=50;
      //$LASTPOS=68000138;//user.Main:138
      _this.y=0;
      //$LASTPOS=68000142;//user.Main:142
      _this.vy=0;
      //$LASTPOS=68000149;//user.Main:149
      _this.scaleX=2;
      //$LASTPOS=68000160;//user.Main:160
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=68000180;//user.Main:180
        _this.y+=_this.vy;
        //$LASTPOS=68000192;//user.Main:192
        if (_this.y>=220) {
          //$LASTPOS=68000215;//user.Main:215
          _this.y=220;
          //$LASTPOS=68000231;//user.Main:231
          if (_this.vy<=1.6) {
            //$LASTPOS=68000259;//user.Main:259
            _this.vy=0;
            
          } else {
            //$LASTPOS=68000296;//user.Main:296
            _this.vy=- _this.abs(_this.vy)*0.6;
            
          }
          
        } else {
          //$LASTPOS=68000347;//user.Main:347
          _this.vy+=1;
          
        }
        //$LASTPOS=68000366;//user.Main:366
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=68000000;//user.Main:0
      Tonyu.globals.$Screen.setBGColor("white");
      //$LASTPOS=68000030;//user.Main:30
      _this.s="Tonyu System 2";
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=68000051;//user.Main:51
            //$LASTPOS=68000056;//user.Main:56
            _this.i=0;
          case 1:
            if (!(_this.i<_this.s.length)) { __pc=4     ; break; }
            //$LASTPOS=68000083;//user.Main:83
            new Tonyu.classes.user.Letter({text: _this.s[_this.i],i: _this.i});
            //$LASTPOS=68000113;//user.Main:113
            _this.fiber$updateEx(_thread, 10);
            __pc=2;return;
          case 2:
            
          case 3     :
            _this.i++;
            __pc=1;break;
          case 4     :
            
            //$LASTPOS=68000131;//user.Main:131
            _this.x=50;
            //$LASTPOS=68000138;//user.Main:138
            _this.y=0;
            //$LASTPOS=68000142;//user.Main:142
            _this.vy=0;
            //$LASTPOS=68000149;//user.Main:149
            _this.scaleX=2;
            //$LASTPOS=68000160;//user.Main:160
          case 5:
            //$LASTPOS=68000180;//user.Main:180
            _this.y+=_this.vy;
            //$LASTPOS=68000192;//user.Main:192
            if (_this.y>=220) {
              //$LASTPOS=68000215;//user.Main:215
              _this.y=220;
              //$LASTPOS=68000231;//user.Main:231
              if (_this.vy<=1.6) {
                //$LASTPOS=68000259;//user.Main:259
                _this.vy=0;
                
              } else {
                //$LASTPOS=68000296;//user.Main:296
                _this.vy=- _this.abs(_this.vy)*0.6;
                
              }
              
            } else {
              //$LASTPOS=68000347;//user.Main:347
              _this.vy+=1;
              
            }
            //$LASTPOS=68000366;//user.Main:366
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"s":{},"i":{},"vy":{}}}
});

//# sourceMappingURL=concat.js.map