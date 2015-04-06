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
    
    _thread.retVal=_this;return;
  },
  go :function _trc_func_1000061_2(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000078;
    while (true) {
      //$LASTPOS=1000100;
      _this.print("Go Left");
      //$LASTPOS=1000126;
      while (_this.x<300) {
        //$LASTPOS=1000153;
        _this.x+=speed;
        //$LASTPOS=1000175;
        _this.update();
        
      }
      //$LASTPOS=1000203;
      _this.print("Go Right");
      //$LASTPOS=1000230;
      while (_this.x>100) {
        //$LASTPOS=1000257;
        _this.x-=speed;
        //$LASTPOS=1000279;
        _this.update();
        
      }
      
    }
  },
  fiber$go :function _trc_func_1000061_3(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000061_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000078;
        case 1:
          //$LASTPOS=1000100;
          _this.print("Go Left");
          //$LASTPOS=1000126;
        case 2:
          if (!(_this.x<300)) { __pc=4; break; }
          //$LASTPOS=1000153;
          _this.x+=speed;
          //$LASTPOS=1000175;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000203;
          _this.print("Go Right");
          //$LASTPOS=1000230;
        case 5:
          if (!(_this.x>100)) { __pc=7; break; }
          //$LASTPOS=1000257;
          _this.x-=speed;
          //$LASTPOS=1000279;
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
  scale :function _trc_func_1000308_5(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000328;
    while (true) {
      //$LASTPOS=1000350;
      _this.print("Bigger");
      //$LASTPOS=1000375;
      //$LASTPOS=1000380;
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000408;
          _this.scaleX+=speed;
          //$LASTPOS=1000435;
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=1000463;
      _this.print("Smaller");
      //$LASTPOS=1000489;
      //$LASTPOS=1000494;
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000522;
          _this.scaleX-=speed;
          //$LASTPOS=1000549;
          _this.update();
        }
        _this.i++;
      }
      
    }
  },
  fiber$scale :function _trc_func_1000308_6(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000308_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000328;
        case 1:
          //$LASTPOS=1000350;
          _this.print("Bigger");
          //$LASTPOS=1000375;
          //$LASTPOS=1000380;
          _this.i=0;;
        case 2:
          if (!(_this.i<17)) { __pc=4; break; }
          //$LASTPOS=1000408;
          _this.scaleX+=speed;
          //$LASTPOS=1000435;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          _this.i++;
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000463;
          _this.print("Smaller");
          //$LASTPOS=1000489;
          //$LASTPOS=1000494;
          _this.i=0;;
        case 5:
          if (!(_this.i<17)) { __pc=7; break; }
          //$LASTPOS=1000522;
          _this.scaleX-=speed;
          //$LASTPOS=1000549;
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

