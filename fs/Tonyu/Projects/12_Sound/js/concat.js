Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000000;
    _this.m=new Tonyu.classes.user.MMLTest;
    //$LASTPOS=1000016;
    _this.text="Space:SE  S:Stop";
    //$LASTPOS=1000041;
    _this.x=200;
    //$LASTPOS=1000048;
    _this.y=200;
    //$LASTPOS=1000055;
    while (true) {
      //$LASTPOS=1000074;
      if (_this.getkey(32)==1) {
        //$LASTPOS=1000103;
        _this.playSE("l16<ceg");
        
      }
      //$LASTPOS=1000132;
      if (_this.getkey("s")==1) {
        //$LASTPOS=1000162;
        _this.m.die();
        
      }
      //$LASTPOS=1000181;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000000;
    _this.m=new Tonyu.classes.user.MMLTest;
    //$LASTPOS=1000016;
    _this.text="Space:SE  S:Stop";
    //$LASTPOS=1000041;
    _this.x=200;
    //$LASTPOS=1000048;
    _this.y=200;
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000055;
        case 1:
          //$LASTPOS=1000074;
          if (_this.getkey(32)==1) {
            //$LASTPOS=1000103;
            _this.playSE("l16<ceg");
            
          }
          //$LASTPOS=1000132;
          if (_this.getkey("s")==1) {
            //$LASTPOS=1000162;
            _this.m.die();
            
          }
          //$LASTPOS=1000181;
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
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.MMLTest=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;
    _this.x=200;
    //$LASTPOS=2000007;
    _this.y=150;
    //$LASTPOS=2000014;
    _this.size=40;
    //$LASTPOS=2000023;
    while (true) {
      //$LASTPOS=2000042;
      _this.text="oo";
      //$LASTPOS=2000057;
      _this.play("l8cde4",">l8c4ge");
      //$LASTPOS=2000087;
      _this.text="^^";
      //$LASTPOS=2000102;
      _this.play("l8edc4",">l8e4dc");
      
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;
    _this.x=200;
    //$LASTPOS=2000007;
    _this.y=150;
    //$LASTPOS=2000014;
    _this.size=40;
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000023;
        case 1:
          //$LASTPOS=2000042;
          _this.text="oo";
          //$LASTPOS=2000057;
          _this.fiber$play(_thread, "l8cde4", ">l8c4ge");
          __pc=2;return;
        case 2:
          
          //$LASTPOS=2000087;
          _this.text="^^";
          //$LASTPOS=2000102;
          _this.fiber$play(_thread, "l8edc4", ">l8e4dc");
          __pc=3;return;
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
Tonyu.klass.addMeta(Tonyu.classes.user.MMLTest,{"fullName":"user.MMLTest","namespace":"user","shortName":"MMLTest","decls":{"methods":{"main":{"nowait":false}}}});

