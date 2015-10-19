Tonyu.klass.define({
  fullName: 'user.Cat',
  shortName: 'Cat',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Cat_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Cat_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Cat_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000019;//user.Cat:19
      _this.p=Tonyu.globals.$pat_neko;
    },
    fiber$onAppear :function _trc_Cat_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000019;//user.Cat:19
      _this.p=Tonyu.globals.$pat_neko;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Cat_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var sx;
      var sy;
      
      //$LASTPOS=1000049;//user.Cat:49
      sx = _this.x;sy = _this.y;
      //$LASTPOS=1000068;//user.Cat:68
      _this.x=_this.x*32+16;
      //$LASTPOS=1000083;//user.Cat:83
      _this.y=_this.y*32+16;
      //$LASTPOS=1000098;//user.Cat:98
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=1000117;//user.Cat:117
      _this.x=sx;
      //$LASTPOS=1000122;//user.Cat:122
      _this.y=sy;
    },
    right :function _trc_Cat_right() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=1000146;//user.Cat:146
      //$LASTPOS=1000151;//user.Cat:151
      i = 0;
      while(i<4) {
        {
          //$LASTPOS=1000178;//user.Cat:178
          _this.x+=0.25;
          //$LASTPOS=1000195;//user.Cat:195
          _this.update();
        }
        i++;
      }
      //$LASTPOS=1000215;//user.Cat:215
      _this.checkWall();
    },
    fiber$right :function _trc_Cat_f_right(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Cat_ent_right(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000146;//user.Cat:146
            //$LASTPOS=1000151;//user.Cat:151
            i = 0;;
          case 1:
            if (!(i<4)) { __pc=3; break; }
            //$LASTPOS=1000178;//user.Cat:178
            _this.x+=0.25;
            //$LASTPOS=1000195;//user.Cat:195
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000215;//user.Cat:215
            _this.fiber$checkWall(_thread);
            __pc=4;return;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Cat_left() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=1000244;//user.Cat:244
      //$LASTPOS=1000249;//user.Cat:249
      i = 0;
      while(i<4) {
        {
          //$LASTPOS=1000276;//user.Cat:276
          _this.x-=0.25;
          //$LASTPOS=1000293;//user.Cat:293
          _this.update();
        }
        i++;
      }
      //$LASTPOS=1000313;//user.Cat:313
      _this.checkWall();
    },
    fiber$left :function _trc_Cat_f_left(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Cat_ent_left(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000244;//user.Cat:244
            //$LASTPOS=1000249;//user.Cat:249
            i = 0;;
          case 1:
            if (!(i<4)) { __pc=3; break; }
            //$LASTPOS=1000276;//user.Cat:276
            _this.x-=0.25;
            //$LASTPOS=1000293;//user.Cat:293
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000313;//user.Cat:313
            _this.fiber$checkWall(_thread);
            __pc=4;return;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    up :function _trc_Cat_up() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=1000340;//user.Cat:340
      //$LASTPOS=1000345;//user.Cat:345
      i = 0;
      while(i<4) {
        {
          //$LASTPOS=1000372;//user.Cat:372
          _this.y-=0.25;
          //$LASTPOS=1000389;//user.Cat:389
          _this.update();
        }
        i++;
      }
      //$LASTPOS=1000409;//user.Cat:409
      _this.checkWall();
    },
    fiber$up :function _trc_Cat_f_up(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Cat_ent_up(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000340;//user.Cat:340
            //$LASTPOS=1000345;//user.Cat:345
            i = 0;;
          case 1:
            if (!(i<4)) { __pc=3; break; }
            //$LASTPOS=1000372;//user.Cat:372
            _this.y-=0.25;
            //$LASTPOS=1000389;//user.Cat:389
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000409;//user.Cat:409
            _this.fiber$checkWall(_thread);
            __pc=4;return;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    down :function _trc_Cat_down() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=1000438;//user.Cat:438
      //$LASTPOS=1000443;//user.Cat:443
      i = 0;
      while(i<4) {
        {
          //$LASTPOS=1000470;//user.Cat:470
          _this.y+=0.25;
          //$LASTPOS=1000487;//user.Cat:487
          _this.update();
        }
        i++;
      }
      //$LASTPOS=1000507;//user.Cat:507
      _this.checkWall();
    },
    fiber$down :function _trc_Cat_f_down(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Cat_ent_down(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000438;//user.Cat:438
            //$LASTPOS=1000443;//user.Cat:443
            i = 0;;
          case 1:
            if (!(i<4)) { __pc=3; break; }
            //$LASTPOS=1000470;//user.Cat:470
            _this.y+=0.25;
            //$LASTPOS=1000487;//user.Cat:487
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000507;//user.Cat:507
            _this.fiber$checkWall(_thread);
            __pc=4;return;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    isWall :function _trc_Cat_isWall(x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var p;
      
      //$LASTPOS=1000541;//user.Cat:541
      p = Tonyu.globals.$map.get(x,y);
      //$LASTPOS=1000566;//user.Cat:566
      if (p==Tonyu.globals.$pat_mapchip+45) {
        return false;
      } else {
        //$LASTPOS=1000613;//user.Cat:613
        if (p>=0) {
          return true;
        }
      }
      return false;
    },
    fiber$isWall :function _trc_Cat_f_isWall(_thread,x,y) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      //$LASTPOS=1000541;//user.Cat:541
      p = Tonyu.globals.$map.get(x,y);
      //$LASTPOS=1000566;//user.Cat:566
      if (p==Tonyu.globals.$pat_mapchip+45) {
        _thread.retVal=false;return;
        
      } else {
        //$LASTPOS=1000613;//user.Cat:613
        if (p>=0) {
          _thread.retVal=true;return;
          
        }
      }
      _thread.retVal=false;return;
      
      
      _thread.retVal=_this;return;
    },
    checkWall :function _trc_Cat_checkWall() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var p;
      
      //$LASTPOS=1000675;//user.Cat:675
      _this.updateEx(4);
      //$LASTPOS=1000692;//user.Cat:692
      p = Tonyu.globals.$map.get(_this.x,_this.y);
      //$LASTPOS=1000717;//user.Cat:717
      if (p==Tonyu.globals.$pat_mapchip+45) {
        //$LASTPOS=1000741;//user.Cat:741
        _this.goal();
      } else {
        //$LASTPOS=1000758;//user.Cat:758
        if (p>=0) {
          //$LASTPOS=1000768;//user.Cat:768
          _this.miss();
        }
      }
    },
    fiber$checkWall :function _trc_Cat_f_checkWall(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      
      _thread.enter(function _trc_Cat_ent_checkWall(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000675;//user.Cat:675
            _this.fiber$updateEx(_thread, 4);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000692;//user.Cat:692
            p = Tonyu.globals.$map.get(_this.x,_this.y);
            //$LASTPOS=1000717;//user.Cat:717
            if (!(p==Tonyu.globals.$pat_mapchip+45)) { __pc=3; break; }
            //$LASTPOS=1000741;//user.Cat:741
            _this.fiber$goal(_thread);
            __pc=2;return;
          case 2:
            
            __pc=6;break;
          case 3:
            //$LASTPOS=1000758;//user.Cat:758
            if (!(p>=0)) { __pc=5; break; }
            //$LASTPOS=1000768;//user.Cat:768
            _this.fiber$miss(_thread);
            __pc=4;return;
          case 4:
            
          case 5:
            
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    goal :function _trc_Cat_goal() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=1000792;//user.Cat:792
      //$LASTPOS=1000797;//user.Cat:797
      i = 0;
      while(i<4) {
        {
          //$LASTPOS=1000824;//user.Cat:824
          _this.y-=0.5;
          //$LASTPOS=1000840;//user.Cat:840
          _this.updateEx(5);
          //$LASTPOS=1000861;//user.Cat:861
          _this.y+=0.5;
          //$LASTPOS=1000877;//user.Cat:877
          _this.updateEx(5);
        }
        i++;
      }
      //$LASTPOS=1000900;//user.Cat:900
      _this.die();
    },
    fiber$goal :function _trc_Cat_f_goal(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Cat_ent_goal(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000792;//user.Cat:792
            //$LASTPOS=1000797;//user.Cat:797
            i = 0;;
          case 1:
            if (!(i<4)) { __pc=4; break; }
            //$LASTPOS=1000824;//user.Cat:824
            _this.y-=0.5;
            //$LASTPOS=1000840;//user.Cat:840
            _this.fiber$updateEx(_thread, 5);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=1000861;//user.Cat:861
            _this.y+=0.5;
            //$LASTPOS=1000877;//user.Cat:877
            _this.fiber$updateEx(_thread, 5);
            __pc=3;return;
          case 3:
            
            i++;
            __pc=1;break;
          case 4:
            
            //$LASTPOS=1000900;//user.Cat:900
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    miss :function _trc_Cat_miss() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000923;//user.Cat:923
      _this.p=Tonyu.globals.$pat_neko+8;
      //$LASTPOS=1000942;//user.Cat:942
      _this.updateEx(60);
      //$LASTPOS=1000960;//user.Cat:960
      _this.die();
    },
    fiber$miss :function _trc_Cat_f_miss(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000923;//user.Cat:923
      _this.p=Tonyu.globals.$pat_neko+8;
      
      _thread.enter(function _trc_Cat_ent_miss(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000942;//user.Cat:942
            _this.fiber$updateEx(_thread, 60);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000960;//user.Cat:960
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"draw":{"nowait":true},"right":{"nowait":false},"left":{"nowait":false},"up":{"nowait":false},"down":{"nowait":false},"isWall":{"nowait":false},"checkWall":{"nowait":false},"goal":{"nowait":false},"miss":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Grid',
  shortName: 'Grid',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Grid_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000000;//user.Grid:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,zOrder: 10});
      //$LASTPOS=2000052;//user.Grid:52
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=2000075;//user.Grid:75
      //$LASTPOS=2000080;//user.Grid:80
      _this.i=1;
      while(_this.i<=12) {
        {
          //$LASTPOS=2000105;//user.Grid:105
          new Tonyu.classes.kernel.Actor({x: _this.i*32+16,y: 16,text: _this.i});
          //$LASTPOS=2000143;//user.Grid:143
          new Tonyu.classes.kernel.Actor({y: _this.i*32+8,x: 16,text: _this.i});
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_Grid_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Grid:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,zOrder: 10});
      //$LASTPOS=2000052;//user.Grid:52
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=2000075;//user.Grid:75
      //$LASTPOS=2000080;//user.Grid:80
      _this.i=1;
      while(_this.i<=12) {
        {
          //$LASTPOS=2000105;//user.Grid:105
          new Tonyu.classes.kernel.Actor({x: _this.i*32+16,y: 16,text: _this.i});
          //$LASTPOS=2000143;//user.Grid:143
          new Tonyu.classes.kernel.Actor({y: _this.i*32+8,x: 16,text: _this.i});
        }
        _this.i++;
      }
      
      _thread.retVal=_this;return;
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000000;//user.Main:0
      new Tonyu.classes.user.Grid;
      //$LASTPOS=3000010;//user.Main:10
      new Tonyu.classes.user.MyCat3({x: 1,y: 1,zOrder: - 20});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Main:0
      new Tonyu.classes.user.Grid;
      //$LASTPOS=3000010;//user.Main:10
      new Tonyu.classes.user.MyCat3({x: 1,y: 1,zOrder: - 20});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.MyCat1',
  shortName: 'MyCat1',
  namespace: 'user',
  superclass: Tonyu.classes.user.Cat,
  includes: [],
  methods: {
    main :function _trc_MyCat1_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000015;//user.MyCat1:15
      while (_this.x<5) {
        //$LASTPOS=4000032;//user.MyCat1:32
        _this.right();
        
      }
      //$LASTPOS=4000044;//user.MyCat1:44
      while (_this.y<8) {
        //$LASTPOS=4000061;//user.MyCat1:61
        _this.down();
        
      }
      //$LASTPOS=4000071;//user.MyCat1:71
      while (_this.x<10) {
        //$LASTPOS=4000089;//user.MyCat1:89
        _this.right();
        
      }
    },
    fiber$main :function _trc_MyCat1_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MyCat1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000015;//user.MyCat1:15
          case 1:
            if (!(_this.x<5)) { __pc=3; break; }
            //$LASTPOS=4000032;//user.MyCat1:32
            _this.fiber$right(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=4000044;//user.MyCat1:44
          case 4:
            if (!(_this.y<8)) { __pc=6; break; }
            //$LASTPOS=4000061;//user.MyCat1:61
            _this.fiber$down(_thread);
            __pc=5;return;
          case 5:
            
            __pc=4;break;
          case 6:
            
            //$LASTPOS=4000071;//user.MyCat1:71
          case 7:
            if (!(_this.x<10)) { __pc=9; break; }
            //$LASTPOS=4000089;//user.MyCat1:89
            _this.fiber$right(_thread);
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
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.MyCat2',
  shortName: 'MyCat2',
  namespace: 'user',
  superclass: Tonyu.classes.user.Cat,
  includes: [],
  methods: {
    main :function _trc_MyCat2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=5000018;//user.MyCat2:18
      while (true) {
        //$LASTPOS=5000037;//user.MyCat2:37
        _this.right();
        //$LASTPOS=5000051;//user.MyCat2:51
        if (_this.isWall(_this.x+1,_this.y)) {
          break;
          
        }
        
      }
      //$LASTPOS=5000083;//user.MyCat2:83
      while (true) {
        //$LASTPOS=5000102;//user.MyCat2:102
        _this.down();
        //$LASTPOS=5000115;//user.MyCat2:115
        if (! _this.isWall(_this.x+1,_this.y)) {
          break;
          
        }
        
      }
      //$LASTPOS=5000146;//user.MyCat2:146
      while (true) {
        //$LASTPOS=5000165;//user.MyCat2:165
        _this.right();
        
      }
    },
    fiber$main :function _trc_MyCat2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MyCat2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000018;//user.MyCat2:18
          case 1:
            //$LASTPOS=5000037;//user.MyCat2:37
            _this.fiber$right(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=5000051;//user.MyCat2:51
            if (!(_this.isWall(_this.x+1,_this.y))) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=5000083;//user.MyCat2:83
          case 5:
            //$LASTPOS=5000102;//user.MyCat2:102
            _this.fiber$down(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=5000115;//user.MyCat2:115
            if (!(! _this.isWall(_this.x+1,_this.y))) { __pc=7; break; }
            __pc=8; break;
            
          case 7:
            
            __pc=5;break;
          case 8:
            
            //$LASTPOS=5000146;//user.MyCat2:146
          case 9:
            //$LASTPOS=5000165;//user.MyCat2:165
            _this.fiber$right(_thread);
            __pc=10;return;
          case 10:
            
            __pc=9;break;
          case 11:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    rightToWall :function _trc_MyCat2_rightToWall() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=5000212;//user.MyCat2:212
      while (true) {
        //$LASTPOS=5000235;//user.MyCat2:235
        _this.right();
        //$LASTPOS=5000253;//user.MyCat2:253
        if (_this.isWall(_this.x+1,_this.y)) {
          break;
          
        }
        
      }
    },
    fiber$rightToWall :function _trc_MyCat2_f_rightToWall(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MyCat2_ent_rightToWall(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000212;//user.MyCat2:212
          case 1:
            //$LASTPOS=5000235;//user.MyCat2:235
            _this.fiber$right(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=5000253;//user.MyCat2:253
            if (!(_this.isWall(_this.x+1,_this.y))) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"rightToWall":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.MyCat3',
  shortName: 'MyCat3',
  namespace: 'user',
  superclass: Tonyu.classes.user.Cat,
  includes: [],
  methods: {
    main :function _trc_MyCat3_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000016;//user.MyCat3:16
      _this.rightToWall();
      //$LASTPOS=6000032;//user.MyCat3:32
      _this.downToRightPath();
      //$LASTPOS=6000052;//user.MyCat3:52
      _this.rightToWall();
    },
    fiber$main :function _trc_MyCat3_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MyCat3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000016;//user.MyCat3:16
            _this.fiber$rightToWall(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=6000032;//user.MyCat3:32
            _this.fiber$downToRightPath(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=6000052;//user.MyCat3:52
            _this.fiber$rightToWall(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    rightToWall :function _trc_MyCat3_rightToWall() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000102;//user.MyCat3:102
      while (true) {
        //$LASTPOS=6000125;//user.MyCat3:125
        _this.right();
        //$LASTPOS=6000143;//user.MyCat3:143
        if (_this.isWall(_this.x+1,_this.y)) {
          break;
          
        }
        
      }
    },
    fiber$rightToWall :function _trc_MyCat3_f_rightToWall(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MyCat3_ent_rightToWall(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000102;//user.MyCat3:102
          case 1:
            //$LASTPOS=6000125;//user.MyCat3:125
            _this.fiber$right(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=6000143;//user.MyCat3:143
            if (!(_this.isWall(_this.x+1,_this.y))) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    downToRightPath :function _trc_MyCat3_downToRightPath() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000214;//user.MyCat3:214
      while (true) {
        //$LASTPOS=6000237;//user.MyCat3:237
        _this.down();
        //$LASTPOS=6000254;//user.MyCat3:254
        if (! _this.isWall(_this.x+1,_this.y)) {
          break;
          
        }
        
      }
    },
    fiber$downToRightPath :function _trc_MyCat3_f_downToRightPath(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MyCat3_ent_downToRightPath(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000214;//user.MyCat3:214
          case 1:
            //$LASTPOS=6000237;//user.MyCat3:237
            _this.fiber$down(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=6000254;//user.MyCat3:254
            if (!(! _this.isWall(_this.x+1,_this.y))) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"rightToWall":{"nowait":false},"downToRightPath":{"nowait":false}}}
});
