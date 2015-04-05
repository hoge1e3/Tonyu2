Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Ball=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000020;
    while (! _this.screenOut()) {
      //$LASTPOS=1000046;
      _this.updateEx(10);
      //$LASTPOS=1000064;
      _this.applyImpulse(_this.rnd()*10-5,- _this.rnd()*5);
      
    }
    //$LASTPOS=1000101;
    _this.die();
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000020;
        case 1:
          if (!(! _this.screenOut())) { __pc=4; break; }
          //$LASTPOS=1000046;
          _this.fiber$updateEx(_thread, 10);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=1000064;
          _this.fiber$applyImpulse(_thread, _this.rnd()*10-5, - _this.rnd()*5);
          __pc=3;return;
        case 3:
          
          __pc=1;break;
        case 4:
          
          //$LASTPOS=1000101;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Ball,{"fullName":"user.Ball","namespace":"user","shortName":"Ball","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000001;
    while (true) {
      //$LASTPOS=2000019;
      new Tonyu.classes.user.Ball({x: _this.rnd(400),y: 0,p: 12});
      //$LASTPOS=2000054;
      _this.updateEx(3);
      
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000001;
        case 1:
          //$LASTPOS=2000019;
          new Tonyu.classes.user.Ball({x: _this.rnd(400),y: 0,p: 12});
          //$LASTPOS=2000054;
          _this.fiber$updateEx(_thread, 3);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

