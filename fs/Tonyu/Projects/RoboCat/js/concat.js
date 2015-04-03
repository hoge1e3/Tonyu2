Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Cat=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_func_1000001_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000019;
    _this.p=Tonyu.globals.$pat_neko;
  },
  fiber$onAppear :function _trc_func_1000001_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000019;
    _this.p=Tonyu.globals.$pat_neko;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_1000034_4(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var sx;
    var sy;
    
    //$LASTPOS=1000049;
    sx = _this.x;sy = _this.y;
    //$LASTPOS=1000068;
    _this.x=_this.x*32+16;
    //$LASTPOS=1000083;
    _this.y=_this.y*32+16;
    //$LASTPOS=1000098;
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    //$LASTPOS=1000117;
    _this.x=sx;
    //$LASTPOS=1000122;
    _this.y=sy;
  },
  right :function _trc_func_1000131_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=1000146;
    //$LASTPOS=1000151;
    i = 0;
    while(i<4) {
      {
        //$LASTPOS=1000178;
        _this.x+=0.25;
        //$LASTPOS=1000195;
        _this.update();
      }
      i++;
    }
    //$LASTPOS=1000215;
    _this.checkWall();
  },
  fiber$right :function _trc_func_1000131_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    
    _thread.enter(function _trc_func_1000131_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000146;
          //$LASTPOS=1000151;
          i = 0;;
        case 1:
          if (!(i<4)) { __pc=3; break; }
          //$LASTPOS=1000178;
          _this.x+=0.25;
          //$LASTPOS=1000195;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          i++;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=1000215;
          _this.fiber$checkWall(_thread);
          __pc=4;return;
        case 4:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  left :function _trc_func_1000230_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=1000244;
    //$LASTPOS=1000249;
    i = 0;
    while(i<4) {
      {
        //$LASTPOS=1000276;
        _this.x-=0.25;
        //$LASTPOS=1000293;
        _this.update();
      }
      i++;
    }
    //$LASTPOS=1000313;
    _this.checkWall();
  },
  fiber$left :function _trc_func_1000230_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    
    _thread.enter(function _trc_func_1000230_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000244;
          //$LASTPOS=1000249;
          i = 0;;
        case 1:
          if (!(i<4)) { __pc=3; break; }
          //$LASTPOS=1000276;
          _this.x-=0.25;
          //$LASTPOS=1000293;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          i++;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=1000313;
          _this.fiber$checkWall(_thread);
          __pc=4;return;
        case 4:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  up :function _trc_func_1000328_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=1000340;
    //$LASTPOS=1000345;
    i = 0;
    while(i<4) {
      {
        //$LASTPOS=1000372;
        _this.y-=0.25;
        //$LASTPOS=1000389;
        _this.update();
      }
      i++;
    }
    //$LASTPOS=1000409;
    _this.checkWall();
  },
  fiber$up :function _trc_func_1000328_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    
    _thread.enter(function _trc_func_1000328_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000340;
          //$LASTPOS=1000345;
          i = 0;;
        case 1:
          if (!(i<4)) { __pc=3; break; }
          //$LASTPOS=1000372;
          _this.y-=0.25;
          //$LASTPOS=1000389;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          i++;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=1000409;
          _this.fiber$checkWall(_thread);
          __pc=4;return;
        case 4:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  down :function _trc_func_1000424_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=1000438;
    //$LASTPOS=1000443;
    i = 0;
    while(i<4) {
      {
        //$LASTPOS=1000470;
        _this.y+=0.25;
        //$LASTPOS=1000487;
        _this.update();
      }
      i++;
    }
    //$LASTPOS=1000507;
    _this.checkWall();
  },
  fiber$down :function _trc_func_1000424_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    
    _thread.enter(function _trc_func_1000424_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000438;
          //$LASTPOS=1000443;
          i = 0;;
        case 1:
          if (!(i<4)) { __pc=3; break; }
          //$LASTPOS=1000470;
          _this.y+=0.25;
          //$LASTPOS=1000487;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          i++;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=1000507;
          _this.fiber$checkWall(_thread);
          __pc=4;return;
        case 4:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  isWall :function _trc_func_1000522_17(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=1000541;
    p = Tonyu.globals.$map.get(x,y);
    //$LASTPOS=1000566;
    if (p==Tonyu.globals.$pat_mapchip+45) {
      return false;
    } else {
      //$LASTPOS=1000613;
      if (p>=0) {
        return true;
      }
    }
    return false;
  },
  fiber$isWall :function _trc_func_1000522_18(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var p;
    
    //$LASTPOS=1000541;
    p = Tonyu.globals.$map.get(x,y);
    //$LASTPOS=1000566;
    if (p==Tonyu.globals.$pat_mapchip+45) {
      _thread.retVal=false;return;
      
    } else {
      //$LASTPOS=1000613;
      if (p>=0) {
        _thread.retVal=true;return;
        
      }
    }
    _thread.retVal=false;return;
    
    
    _thread.retVal=_this;return;
  },
  checkWall :function _trc_func_1000656_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=1000675;
    _this.updateEx(4);
    //$LASTPOS=1000692;
    p = Tonyu.globals.$map.get(_this.x,_this.y);
    //$LASTPOS=1000717;
    if (p==Tonyu.globals.$pat_mapchip+45) {
      //$LASTPOS=1000741;
      _this.goal();
    } else {
      //$LASTPOS=1000758;
      if (p>=0) {
        //$LASTPOS=1000768;
        _this.miss();
      }
    }
  },
  fiber$checkWall :function _trc_func_1000656_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var p;
    
    
    _thread.enter(function _trc_func_1000656_21(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000675;
          _this.fiber$updateEx(_thread, 4);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000692;
          p = Tonyu.globals.$map.get(_this.x,_this.y);
          //$LASTPOS=1000717;
          if (!(p==Tonyu.globals.$pat_mapchip+45)) { __pc=3; break; }
          //$LASTPOS=1000741;
          _this.fiber$goal(_thread);
          __pc=2;return;
        case 2:
          
          __pc=6;break;
        case 3:
          //$LASTPOS=1000758;
          if (!(p>=0)) { __pc=5; break; }
          //$LASTPOS=1000768;
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
  goal :function _trc_func_1000778_22() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=1000792;
    //$LASTPOS=1000797;
    i = 0;
    while(i<4) {
      {
        //$LASTPOS=1000824;
        _this.y-=0.5;
        //$LASTPOS=1000840;
        _this.updateEx(5);
        //$LASTPOS=1000861;
        _this.y+=0.5;
        //$LASTPOS=1000877;
        _this.updateEx(5);
      }
      i++;
    }
    //$LASTPOS=1000900;
    _this.die();
  },
  fiber$goal :function _trc_func_1000778_23(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    
    _thread.enter(function _trc_func_1000778_24(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000792;
          //$LASTPOS=1000797;
          i = 0;;
        case 1:
          if (!(i<4)) { __pc=4; break; }
          //$LASTPOS=1000824;
          _this.y-=0.5;
          //$LASTPOS=1000840;
          _this.fiber$updateEx(_thread, 5);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=1000861;
          _this.y+=0.5;
          //$LASTPOS=1000877;
          _this.fiber$updateEx(_thread, 5);
          __pc=3;return;
        case 3:
          
          i++;
          __pc=1;break;
        case 4:
          
          //$LASTPOS=1000900;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  miss :function _trc_func_1000909_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000923;
    _this.p=Tonyu.globals.$pat_neko+8;
    //$LASTPOS=1000942;
    _this.updateEx(60);
    //$LASTPOS=1000960;
    _this.die();
  },
  fiber$miss :function _trc_func_1000909_26(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000923;
    _this.p=Tonyu.globals.$pat_neko+8;
    
    _thread.enter(function _trc_func_1000909_27(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000942;
          _this.fiber$updateEx(_thread, 60);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000960;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Cat,{"fullName":"user.Cat","namespace":"user","shortName":"Cat","decls":{"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"draw":{"nowait":true},"right":{"nowait":false},"left":{"nowait":false},"up":{"nowait":false},"down":{"nowait":false},"isWall":{"nowait":false},"checkWall":{"nowait":false},"goal":{"nowait":false},"miss":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Grid=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,zOrder: 10});
    //$LASTPOS=2000052;
    Tonyu.globals.$map.load("map.json");
    //$LASTPOS=2000075;
    //$LASTPOS=2000080;
    _this.i=1;
    while(_this.i<=12) {
      {
        //$LASTPOS=2000105;
        new Tonyu.classes.kernel.Actor({x: _this.i*32+16,y: 16,text: _this.i});
        //$LASTPOS=2000143;
        new Tonyu.classes.kernel.Actor({y: _this.i*32+8,x: 16,text: _this.i});
      }
      _this.i++;
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,zOrder: 10});
    //$LASTPOS=2000052;
    Tonyu.globals.$map.load("map.json");
    //$LASTPOS=2000075;
    //$LASTPOS=2000080;
    _this.i=1;
    while(_this.i<=12) {
      {
        //$LASTPOS=2000105;
        new Tonyu.classes.kernel.Actor({x: _this.i*32+16,y: 16,text: _this.i});
        //$LASTPOS=2000143;
        new Tonyu.classes.kernel.Actor({y: _this.i*32+8,x: 16,text: _this.i});
      }
      _this.i++;
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Grid,{"fullName":"user.Grid","namespace":"user","shortName":"Grid","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000000;
    new Tonyu.classes.user.Grid;
    //$LASTPOS=3000010;
    new Tonyu.classes.user.MyCat3({x: 1,y: 1,zOrder: - 20});
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=3000000;
    new Tonyu.classes.user.Grid;
    //$LASTPOS=3000010;
    new Tonyu.classes.user.MyCat3({x: 1,y: 1,zOrder: - 20});
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.MyCat1=Tonyu.klass(Tonyu.classes.user.Cat,[],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000015;
    while (_this.x<5) {
      //$LASTPOS=4000032;
      _this.right();
      
    }
    //$LASTPOS=4000044;
    while (_this.y<8) {
      //$LASTPOS=4000061;
      _this.down();
      
    }
    //$LASTPOS=4000071;
    while (_this.x<10) {
      //$LASTPOS=4000089;
      _this.right();
      
    }
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_4000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=4000015;
        case 1:
          if (!(_this.x<5)) { __pc=3; break; }
          //$LASTPOS=4000032;
          _this.fiber$right(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          //$LASTPOS=4000044;
        case 4:
          if (!(_this.y<8)) { __pc=6; break; }
          //$LASTPOS=4000061;
          _this.fiber$down(_thread);
          __pc=5;return;
        case 5:
          
          __pc=4;break;
        case 6:
          
          //$LASTPOS=4000071;
        case 7:
          if (!(_this.x<10)) { __pc=9; break; }
          //$LASTPOS=4000089;
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.MyCat1,{"fullName":"user.MyCat1","namespace":"user","shortName":"MyCat1","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.MyCat2=Tonyu.klass(Tonyu.classes.user.Cat,[],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000018;
    while (true) {
      //$LASTPOS=5000037;
      _this.right();
      //$LASTPOS=5000051;
      if (_this.isWall(_this.x+1,_this.y)) {
        break;
        
      }
      
    }
    //$LASTPOS=5000083;
    while (true) {
      //$LASTPOS=5000102;
      _this.down();
      //$LASTPOS=5000115;
      if (! _this.isWall(_this.x+1,_this.y)) {
        break;
        
      }
      
    }
    //$LASTPOS=5000146;
    while (true) {
      //$LASTPOS=5000165;
      _this.right();
      
    }
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_5000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=5000018;
        case 1:
          //$LASTPOS=5000037;
          _this.fiber$right(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=5000051;
          if (!(_this.isWall(_this.x+1,_this.y))) { __pc=3; break; }
          __pc=4; break;
          
        case 3:
          
          __pc=1;break;
        case 4:
          
          //$LASTPOS=5000083;
        case 5:
          //$LASTPOS=5000102;
          _this.fiber$down(_thread);
          __pc=6;return;
        case 6:
          
          //$LASTPOS=5000115;
          if (!(! _this.isWall(_this.x+1,_this.y))) { __pc=7; break; }
          __pc=8; break;
          
        case 7:
          
          __pc=5;break;
        case 8:
          
          //$LASTPOS=5000146;
        case 9:
          //$LASTPOS=5000165;
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
  rightToWall :function _trc_func_5000182_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000212;
    while (true) {
      //$LASTPOS=5000235;
      _this.right();
      //$LASTPOS=5000253;
      if (_this.isWall(_this.x+1,_this.y)) {
        break;
        
      }
      
    }
  },
  fiber$rightToWall :function _trc_func_5000182_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_5000182_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=5000212;
        case 1:
          //$LASTPOS=5000235;
          _this.fiber$right(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=5000253;
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.MyCat2,{"fullName":"user.MyCat2","namespace":"user","shortName":"MyCat2","decls":{"methods":{"main":{"nowait":false},"rightToWall":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.MyCat3=Tonyu.klass(Tonyu.classes.user.Cat,[],{
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000016;
    _this.rightToWall();
    //$LASTPOS=6000032;
    _this.downToRightPath();
    //$LASTPOS=6000052;
    _this.rightToWall();
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_6000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=6000016;
          _this.fiber$rightToWall(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=6000032;
          _this.fiber$downToRightPath(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=6000052;
          _this.fiber$rightToWall(_thread);
          __pc=3;return;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  rightToWall :function _trc_func_6000072_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000102;
    while (true) {
      //$LASTPOS=6000125;
      _this.right();
      //$LASTPOS=6000143;
      if (_this.isWall(_this.x+1,_this.y)) {
        break;
        
      }
      
    }
  },
  fiber$rightToWall :function _trc_func_6000072_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_6000072_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=6000102;
        case 1:
          //$LASTPOS=6000125;
          _this.fiber$right(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=6000143;
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
  downToRightPath :function _trc_func_6000180_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000214;
    while (true) {
      //$LASTPOS=6000237;
      _this.down();
      //$LASTPOS=6000254;
      if (! _this.isWall(_this.x+1,_this.y)) {
        break;
        
      }
      
    }
  },
  fiber$downToRightPath :function _trc_func_6000180_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_6000180_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=6000214;
        case 1:
          //$LASTPOS=6000237;
          _this.fiber$down(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=6000254;
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.MyCat3,{"fullName":"user.MyCat3","namespace":"user","shortName":"MyCat3","decls":{"methods":{"main":{"nowait":false},"rightToWall":{"nowait":false},"downToRightPath":{"nowait":false}}}});

