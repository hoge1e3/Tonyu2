Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Char=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000001;
    _this.x=100;
    //$LASTPOS=1000007;
    _this.y=30;
    //$LASTPOS=1000013;
    _this.t=_this.parallel("roll",5);
    //$LASTPOS=1000036;
    while (_this.x<200) {
      //$LASTPOS=1000055;
      _this.x++;
      //$LASTPOS=1000064;
      _this.update();
      
    }
    //$LASTPOS=1000076;
    while (_this.x>100) {
      //$LASTPOS=1000095;
      _this.x--;
      //$LASTPOS=1000104;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000001;
    _this.x=100;
    //$LASTPOS=1000007;
    _this.y=30;
    //$LASTPOS=1000013;
    _this.t=_this.parallel("roll",5);
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000036;
        case 1:
          if (!(_this.x<200)) { __pc=3; break; }
          //$LASTPOS=1000055;
          _this.x++;
          //$LASTPOS=1000064;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          //$LASTPOS=1000076;
        case 4:
          if (!(_this.x>100)) { __pc=6; break; }
          //$LASTPOS=1000095;
          _this.x--;
          //$LASTPOS=1000104;
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
  roll :function _trc_func_1000117_3(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000136;
    while (true) {
      //$LASTPOS=1000158;
      _this.print("a");
      //$LASTPOS=1000178;
      while (_this.rotation<180) {
        //$LASTPOS=1000212;
        _this.rotation+=speed;
        //$LASTPOS=1000241;
        _this.update();
        
      }
      //$LASTPOS=1000269;
      _this.print("b");
      //$LASTPOS=1000289;
      while (_this.rotation>0) {
        //$LASTPOS=1000321;
        _this.rotation-=speed;
        //$LASTPOS=1000350;
        _this.update();
        
      }
      
    }
  },
  fiber$roll :function _trc_func_1000117_4(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000117_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000136;
        case 1:
          //$LASTPOS=1000158;
          _this.print("a");
          //$LASTPOS=1000178;
        case 2:
          if (!(_this.rotation<180)) { __pc=4; break; }
          //$LASTPOS=1000212;
          _this.rotation+=speed;
          //$LASTPOS=1000241;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000269;
          _this.print("b");
          //$LASTPOS=1000289;
        case 5:
          if (!(_this.rotation>0)) { __pc=7; break; }
          //$LASTPOS=1000321;
          _this.rotation-=speed;
          //$LASTPOS=1000350;
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.Char,{"fullName":"user.Char","namespace":"user","shortName":"Char","decls":{"methods":{"main":{"nowait":false},"roll":{"nowait":false}}}});

