Tonyu.klass.define({
  fullName: 'user.Bullet',
  shortName: 'Bullet',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Bullet_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.Bullet:0
      while (_this.y>0) {
        Tonyu.checkLoop();
        //$LASTPOS=1000019;//user.Bullet:19
        _this.y-=4;
        //$LASTPOS=1000097;//user.Bullet:97
        _this.c=_this.crashTo(Tonyu.classes.user.Chaser);
        //$LASTPOS=1000260;//user.Bullet:260
        if (_this.c) {
          //$LASTPOS=1000278;//user.Bullet:278
          _this.c.die();
          //$LASTPOS=1000296;//user.Bullet:296
          _this.die();
          //$LASTPOS=1000312;//user.Bullet:312
          Tonyu.globals.$score+=10;
          
        }
        //$LASTPOS=1000336;//user.Bullet:336
        _this.update();
        
      }
      //$LASTPOS=1000394;//user.Bullet:394
      _this.die();
    },
    fiber$main :function _trc_Bullet_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Bullet_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000000;//user.Bullet:0
          case 1:
            if (!(_this.y>0)) { __pc=3     ; break; }
            //$LASTPOS=1000019;//user.Bullet:19
            _this.y-=4;
            //$LASTPOS=1000097;//user.Bullet:97
            _this.c=_this.crashTo(Tonyu.classes.user.Chaser);
            //$LASTPOS=1000260;//user.Bullet:260
            if (_this.c) {
              //$LASTPOS=1000278;//user.Bullet:278
              _this.c.die();
              //$LASTPOS=1000296;//user.Bullet:296
              _this.die();
              //$LASTPOS=1000312;//user.Bullet:312
              Tonyu.globals.$score+=10;
              
            }
            //$LASTPOS=1000336;//user.Bullet:336
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            //$LASTPOS=1000394;//user.Bullet:394
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"c":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Chaser',
  shortName: 'Chaser',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Chaser_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000065;//user.Chaser:65
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=2000085;//user.Chaser:85
        if (_this.x<Tonyu.globals.$player.x) {
          //$LASTPOS=2000102;//user.Chaser:102
          _this.x+=1;
        }
        //$LASTPOS=2000113;//user.Chaser:113
        if (_this.x>Tonyu.globals.$player.x) {
          //$LASTPOS=2000130;//user.Chaser:130
          _this.x-=1;
        }
        //$LASTPOS=2000141;//user.Chaser:141
        if (_this.y<Tonyu.globals.$player.y) {
          //$LASTPOS=2000158;//user.Chaser:158
          _this.y+=1;
        }
        //$LASTPOS=2000169;//user.Chaser:169
        if (_this.y>Tonyu.globals.$player.y) {
          //$LASTPOS=2000186;//user.Chaser:186
          _this.y-=1;
        }
        //$LASTPOS=2000244;//user.Chaser:244
        if (_this.crashTo(Tonyu.globals.$player)) {
          //$LASTPOS=2000346;//user.Chaser:346
          Tonyu.globals.$player.die();
          
        }
        //$LASTPOS=2000383;//user.Chaser:383
        _this.update();
        
      }
    },
    fiber$main :function _trc_Chaser_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Chaser_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000065;//user.Chaser:65
          case 1:
            //$LASTPOS=2000085;//user.Chaser:85
            if (_this.x<Tonyu.globals.$player.x) {
              //$LASTPOS=2000102;//user.Chaser:102
              _this.x+=1;
            }
            //$LASTPOS=2000113;//user.Chaser:113
            if (_this.x>Tonyu.globals.$player.x) {
              //$LASTPOS=2000130;//user.Chaser:130
              _this.x-=1;
            }
            //$LASTPOS=2000141;//user.Chaser:141
            if (_this.y<Tonyu.globals.$player.y) {
              //$LASTPOS=2000158;//user.Chaser:158
              _this.y+=1;
            }
            //$LASTPOS=2000169;//user.Chaser:169
            if (_this.y>Tonyu.globals.$player.y) {
              //$LASTPOS=2000186;//user.Chaser:186
              _this.y-=1;
            }
            //$LASTPOS=2000244;//user.Chaser:244
            if (_this.crashTo(Tonyu.globals.$player)) {
              //$LASTPOS=2000346;//user.Chaser:346
              Tonyu.globals.$player.die();
              
            }
            //$LASTPOS=2000383;//user.Chaser:383
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=3000058;//user.Main:58
      Tonyu.globals.$score=0;
      //$LASTPOS=3000069;//user.Main:69
      Tonyu.globals.$player=new Tonyu.classes.user.Player;
      //$LASTPOS=3000090;//user.Main:90
      new Tonyu.classes.user.Status;
      //$LASTPOS=3000103;//user.Main:103
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=3000122;//user.Main:122
        new Tonyu.classes.user.Chaser({x: _this.rnd(400),y: 20,p: 5});
        //$LASTPOS=3000160;//user.Main:160
        _this.updateEx(60);
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000058;//user.Main:58
      Tonyu.globals.$score=0;
      //$LASTPOS=3000069;//user.Main:69
      Tonyu.globals.$player=new Tonyu.classes.user.Player;
      //$LASTPOS=3000090;//user.Main:90
      new Tonyu.classes.user.Status;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000103;//user.Main:103
          case 1:
            //$LASTPOS=3000122;//user.Main:122
            new Tonyu.classes.user.Chaser({x: _this.rnd(400),y: 20,p: 5});
            //$LASTPOS=3000160;//user.Main:160
            _this.fiber$updateEx(_thread, 60);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=4000019;//user.Player:19
      _this.x=200;
      //$LASTPOS=4000027;//user.Player:27
      _this.y=200;
      //$LASTPOS=4000035;//user.Player:35
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=4000234;//user.Player:234
        if (_this.getkey("up")) {
          //$LASTPOS=4000252;//user.Player:252
          _this.y-=4;
        }
        //$LASTPOS=4000263;//user.Player:263
        if (_this.getkey("down")) {
          //$LASTPOS=4000283;//user.Player:283
          _this.y+=4;
        }
        //$LASTPOS=4000294;//user.Player:294
        if (_this.getkey("left")) {
          //$LASTPOS=4000314;//user.Player:314
          _this.x-=4;
        }
        //$LASTPOS=4000325;//user.Player:325
        if (_this.getkey("right")) {
          //$LASTPOS=4000346;//user.Player:346
          _this.x+=4;
        }
        //$LASTPOS=4000424;//user.Player:424
        if (_this.getkey("space")==1) {
          //$LASTPOS=4000510;//user.Player:510
          new Tonyu.classes.user.Bullet({x: _this.x,y: _this.y});
          
        }
        //$LASTPOS=4000539;//user.Player:539
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000019;//user.Player:19
      _this.x=200;
      //$LASTPOS=4000027;//user.Player:27
      _this.y=200;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000035;//user.Player:35
          case 1:
            //$LASTPOS=4000234;//user.Player:234
            if (_this.getkey("up")) {
              //$LASTPOS=4000252;//user.Player:252
              _this.y-=4;
            }
            //$LASTPOS=4000263;//user.Player:263
            if (_this.getkey("down")) {
              //$LASTPOS=4000283;//user.Player:283
              _this.y+=4;
            }
            //$LASTPOS=4000294;//user.Player:294
            if (_this.getkey("left")) {
              //$LASTPOS=4000314;//user.Player:314
              _this.x-=4;
            }
            //$LASTPOS=4000325;//user.Player:325
            if (_this.getkey("right")) {
              //$LASTPOS=4000346;//user.Player:346
              _this.x+=4;
            }
            //$LASTPOS=4000424;//user.Player:424
            if (_this.getkey("space")==1) {
              //$LASTPOS=4000510;//user.Player:510
              new Tonyu.classes.user.Bullet({x: _this.x,y: _this.y});
              
            }
            //$LASTPOS=4000539;//user.Player:539
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Status',
  shortName: 'Status',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Status_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=5000041;//user.Status:41
      _this.text="Score:";
      //$LASTPOS=5000057;//user.Status:57
      _this.fillStyle="white";
      //$LASTPOS=5000077;//user.Status:77
      _this.size=40;
      //$LASTPOS=5000087;//user.Status:87
      _this.align="center";
      //$LASTPOS=5000104;//user.Status:104
      _this.x=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=5000123;//user.Status:123
      _this.y=Tonyu.globals.$screenHeight-_this.size;
      //$LASTPOS=5000146;//user.Status:146
      while (! Tonyu.globals.$player.isDead()) {
        Tonyu.checkLoop();
        //$LASTPOS=5000179;//user.Status:179
        _this.text="Score:"+Tonyu.globals.$score;
        //$LASTPOS=5000206;//user.Status:206
        _this.update();
        
      }
      //$LASTPOS=5000220;//user.Status:220
      _this.text="Game Over";
      //$LASTPOS=5000239;//user.Status:239
      _this.updateEx(60);
      //$LASTPOS=5000254;//user.Status:254
      _this.loadPage(Tonyu.classes.user.Title);
    },
    fiber$main :function _trc_Status_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000041;//user.Status:41
      _this.text="Score:";
      //$LASTPOS=5000057;//user.Status:57
      _this.fillStyle="white";
      //$LASTPOS=5000077;//user.Status:77
      _this.size=40;
      //$LASTPOS=5000087;//user.Status:87
      _this.align="center";
      //$LASTPOS=5000104;//user.Status:104
      _this.x=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=5000123;//user.Status:123
      _this.y=Tonyu.globals.$screenHeight-_this.size;
      
      _thread.enter(function _trc_Status_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000146;//user.Status:146
          case 1:
            if (!(! Tonyu.globals.$player.isDead())) { __pc=3     ; break; }
            //$LASTPOS=5000179;//user.Status:179
            _this.text="Score:"+Tonyu.globals.$score;
            //$LASTPOS=5000206;//user.Status:206
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            //$LASTPOS=5000220;//user.Status:220
            _this.text="Game Over";
            //$LASTPOS=5000239;//user.Status:239
            _this.fiber$updateEx(_thread, 60);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=5000254;//user.Status:254
            _this.loadPage(Tonyu.classes.user.Title);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Title',
  shortName: 'Title',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Title_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000001;//user.Title:1
      new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: 100,size: 40,text: "Press Space Key"});
      //$LASTPOS=6000067;//user.Title:67
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=6000085;//user.Title:85
        if (_this.getkey("space")==1) {
          //$LASTPOS=6000109;//user.Title:109
          _this.loadPage(Tonyu.classes.user.Main);
        }
        //$LASTPOS=6000129;//user.Title:129
        _this.update();
        
      }
    },
    fiber$main :function _trc_Title_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000001;//user.Title:1
      new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: 100,size: 40,text: "Press Space Key"});
      
      _thread.enter(function _trc_Title_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000067;//user.Title:67
          case 1:
            //$LASTPOS=6000085;//user.Title:85
            if (_this.getkey("space")==1) {
              //$LASTPOS=6000109;//user.Title:109
              _this.loadPage(Tonyu.classes.user.Main);
            }
            //$LASTPOS=6000129;//user.Title:129
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});

//# sourceMappingURL=concat.js.map