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
    _this.on("fuga",function () {
      
      //$LASTPOS=1000072;
      _this.print("fugaed");
    });
    //$LASTPOS=1000091;
    _this.on("die",function () {
      
      //$LASTPOS=1000103;
      _this.print("dead");
    });
    //$LASTPOS=1000120;
    while (true) {
      //$LASTPOS=1000138;
      if (_this.getkey(32)==1) {
        //$LASTPOS=1000156;
        _this.die();
      }
      //$LASTPOS=1000167;
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
          _this.fiber$on(_thread, "fuga", function () {
            
            //$LASTPOS=1000072;
            _this.print("fugaed");
          });
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000091;
          _this.fiber$on(_thread, "die", function () {
            
            //$LASTPOS=1000103;
            _this.print("dead");
          });
          __pc=2;return;
        case 2:
          
          //$LASTPOS=1000120;
        case 3:
          //$LASTPOS=1000138;
          if (_this.getkey(32)==1) {
            //$LASTPOS=1000156;
            _this.die();
          }
          //$LASTPOS=1000167;
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=3;break;
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  go :function _trc_func_1000180_3(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000197;
    while (true) {
      //$LASTPOS=1000219;
      _this.print("Go Left");
      //$LASTPOS=1000245;
      while (_this.x<300) {
        //$LASTPOS=1000272;
        _this.x+=speed;
        //$LASTPOS=1000294;
        _this.update();
        
      }
      //$LASTPOS=1000322;
      _this.print("Go Right");
      //$LASTPOS=1000349;
      while (_this.x>100) {
        //$LASTPOS=1000376;
        _this.x-=speed;
        //$LASTPOS=1000398;
        _this.update();
        
      }
      
    }
  },
  fiber$go :function _trc_func_1000180_4(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000180_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000197;
        case 1:
          //$LASTPOS=1000219;
          _this.print("Go Left");
          //$LASTPOS=1000245;
        case 2:
          if (!(_this.x<300)) { __pc=4; break; }
          //$LASTPOS=1000272;
          _this.x+=speed;
          //$LASTPOS=1000294;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000322;
          _this.print("Go Right");
          //$LASTPOS=1000349;
        case 5:
          if (!(_this.x>100)) { __pc=7; break; }
          //$LASTPOS=1000376;
          _this.x-=speed;
          //$LASTPOS=1000398;
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
  scale :function _trc_func_1000427_6(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000447;
    while (true) {
      //$LASTPOS=1000469;
      _this.print("Bigger");
      //$LASTPOS=1000494;
      //$LASTPOS=1000499;
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000527;
          _this.scaleX+=speed;
          //$LASTPOS=1000554;
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=1000582;
      _this.print("Smaller");
      //$LASTPOS=1000608;
      //$LASTPOS=1000613;
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000641;
          _this.scaleX-=speed;
          //$LASTPOS=1000668;
          _this.update();
        }
        _this.i++;
      }
      
    }
  },
  fiber$scale :function _trc_func_1000427_7(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000427_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000447;
        case 1:
          //$LASTPOS=1000469;
          _this.print("Bigger");
          //$LASTPOS=1000494;
          //$LASTPOS=1000499;
          _this.i=0;;
        case 2:
          if (!(_this.i<17)) { __pc=4; break; }
          //$LASTPOS=1000527;
          _this.scaleX+=speed;
          //$LASTPOS=1000554;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          _this.i++;
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000582;
          _this.print("Smaller");
          //$LASTPOS=1000608;
          //$LASTPOS=1000613;
          _this.i=0;;
        case 5:
          if (!(_this.i<17)) { __pc=7; break; }
          //$LASTPOS=1000641;
          _this.scaleX-=speed;
          //$LASTPOS=1000668;
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

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;
    _this.c=new Tonyu.classes.user.Char;
    //$LASTPOS=2000012;
    while (true) {
      //$LASTPOS=2000031;
      if (_this.getkey("f")==1) {
        //$LASTPOS=2000051;
        _this.c.fireEvent("fuga");
      }
      //$LASTPOS=2000076;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;
    _this.c=new Tonyu.classes.user.Char;
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000012;
        case 1:
          //$LASTPOS=2000031;
          if (_this.getkey("f")==1) {
            //$LASTPOS=2000051;
            _this.c.fireEvent("fuga");
          }
          //$LASTPOS=2000076;
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

