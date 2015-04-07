Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Char=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000001;
    _this.x=100;
    //$LASTPOS=1000007;
    _this.y=100;
    //$LASTPOS=1000014;
    _this.g=_this.parallel("go",3);
    //$LASTPOS=1000034;
    _this.s=_this.parallel("scale",0.1);
    //$LASTPOS=1000059;
    _this.on("die",function () {
      
      //$LASTPOS=1000071;
      _this.print("dead");
    });
    //$LASTPOS=1000088;
    _this.print(_this._eventHandlers);
    //$LASTPOS=1000111;
    _this.print(_this.getEventHandler("die").listeners);
    //$LASTPOS=1000152;
    while (true) {
      //$LASTPOS=1000170;
      if (_this.getkey(32)==1) {
        //$LASTPOS=1000188;
        _this.die();
      }
      //$LASTPOS=1000199;
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
    _this.y=100;
    //$LASTPOS=1000014;
    _this.g=_this.parallel("go",3);
    //$LASTPOS=1000034;
    _this.s=_this.parallel("scale",0.1);
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000059;
          _this.fiber$on(_thread, "die", function () {
            
            //$LASTPOS=1000071;
            _this.print("dead");
          });
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000088;
          _this.print(_this._eventHandlers);
          //$LASTPOS=1000111;
          _this.print(_this.getEventHandler("die").listeners);
          //$LASTPOS=1000152;
        case 2:
          //$LASTPOS=1000170;
          if (_this.getkey(32)==1) {
            //$LASTPOS=1000188;
            _this.die();
          }
          //$LASTPOS=1000199;
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
  go :function _trc_func_1000212_3(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000229;
    while (true) {
      //$LASTPOS=1000251;
      _this.print("Go Left");
      //$LASTPOS=1000277;
      while (_this.x<300) {
        //$LASTPOS=1000304;
        _this.x+=speed;
        //$LASTPOS=1000326;
        _this.update();
        
      }
      //$LASTPOS=1000354;
      _this.print("Go Right");
      //$LASTPOS=1000381;
      while (_this.x>100) {
        //$LASTPOS=1000408;
        _this.x-=speed;
        //$LASTPOS=1000430;
        _this.update();
        
      }
      
    }
  },
  fiber$go :function _trc_func_1000212_4(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000212_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000229;
        case 1:
          //$LASTPOS=1000251;
          _this.print("Go Left");
          //$LASTPOS=1000277;
        case 2:
          if (!(_this.x<300)) { __pc=4; break; }
          //$LASTPOS=1000304;
          _this.x+=speed;
          //$LASTPOS=1000326;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000354;
          _this.print("Go Right");
          //$LASTPOS=1000381;
        case 5:
          if (!(_this.x>100)) { __pc=7; break; }
          //$LASTPOS=1000408;
          _this.x-=speed;
          //$LASTPOS=1000430;
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
  scale :function _trc_func_1000459_6(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000479;
    while (true) {
      //$LASTPOS=1000501;
      _this.print("Bigger");
      //$LASTPOS=1000526;
      //$LASTPOS=1000531;
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000559;
          _this.scaleX+=speed;
          //$LASTPOS=1000586;
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=1000614;
      _this.print("Smaller");
      //$LASTPOS=1000640;
      //$LASTPOS=1000645;
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000673;
          _this.scaleX-=speed;
          //$LASTPOS=1000700;
          _this.update();
        }
        _this.i++;
      }
      
    }
  },
  fiber$scale :function _trc_func_1000459_7(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000459_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000479;
        case 1:
          //$LASTPOS=1000501;
          _this.print("Bigger");
          //$LASTPOS=1000526;
          //$LASTPOS=1000531;
          _this.i=0;;
        case 2:
          if (!(_this.i<17)) { __pc=4; break; }
          //$LASTPOS=1000559;
          _this.scaleX+=speed;
          //$LASTPOS=1000586;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          _this.i++;
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000614;
          _this.print("Smaller");
          //$LASTPOS=1000640;
          //$LASTPOS=1000645;
          _this.i=0;;
        case 5:
          if (!(_this.i<17)) { __pc=7; break; }
          //$LASTPOS=1000673;
          _this.scaleX-=speed;
          //$LASTPOS=1000700;
          _this.fiber$update(_thread);
          __pc=6;return;
        case 6:
          
          _this.i++;
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
Tonyu.klass.addMeta(Tonyu.classes.user.Char,{"fullName":"user.Char","namespace":"user","shortName":"Char","decls":{"methods":{"main":{"nowait":false},"go":{"nowait":false},"scale":{"nowait":false}}}});

