Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Char=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000001;//user.Char:1
    _this.x=100;
    //$LASTPOS=1000007;//user.Char:7
    _this.y=100;
    //$LASTPOS=1000014;//user.Char:14
    _this.g=_this.parallel("go",3);
    //$LASTPOS=1000034;//user.Char:34
    _this.s=_this.parallel("scale",0.1);
    //$LASTPOS=1000059;//user.Char:59
    _this.on("fuga",function () {
      
      //$LASTPOS=1000072;//user.Char:72
      _this.print("fugaed");
    });
    //$LASTPOS=1000091;//user.Char:91
    _this.on("die",function () {
      
      //$LASTPOS=1000103;//user.Char:103
      _this.print("dead");
    });
    //$LASTPOS=1000120;//user.Char:120
    while (true) {
      //$LASTPOS=1000138;//user.Char:138
      if (_this.getkey(32)==1) {
        //$LASTPOS=1000156;//user.Char:156
        _this.die();
      }
      //$LASTPOS=1000167;//user.Char:167
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000001;//user.Char:1
    _this.x=100;
    //$LASTPOS=1000007;//user.Char:7
    _this.y=100;
    //$LASTPOS=1000014;//user.Char:14
    _this.g=_this.parallel("go",3);
    //$LASTPOS=1000034;//user.Char:34
    _this.s=_this.parallel("scale",0.1);
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000059;//user.Char:59
          _this.fiber$on(_thread, "fuga", function () {
            
            //$LASTPOS=1000072;//user.Char:72
            _this.print("fugaed");
          });
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000091;//user.Char:91
          _this.fiber$on(_thread, "die", function () {
            
            //$LASTPOS=1000103;//user.Char:103
            _this.print("dead");
          });
          __pc=2;return;
        case 2:
          
          //$LASTPOS=1000120;//user.Char:120
        case 3:
          //$LASTPOS=1000138;//user.Char:138
          if (_this.getkey(32)==1) {
            //$LASTPOS=1000156;//user.Char:156
            _this.die();
          }
          //$LASTPOS=1000167;//user.Char:167
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
  go :function _trc_func_1000182_3(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000199;//user.Char:199
    while (true) {
      //$LASTPOS=1000221;//user.Char:221
      _this.print("Go Left");
      //$LASTPOS=1000247;//user.Char:247
      while (_this.x<300) {
        //$LASTPOS=1000274;//user.Char:274
        _this.x+=speed;
        //$LASTPOS=1000296;//user.Char:296
        _this.update();
        
      }
      //$LASTPOS=1000324;//user.Char:324
      _this.print("Go Right");
      //$LASTPOS=1000351;//user.Char:351
      while (_this.x>100) {
        //$LASTPOS=1000378;//user.Char:378
        _this.x-=speed;
        //$LASTPOS=1000400;//user.Char:400
        _this.update();
        
      }
      
    }
  },
  fiber$go :function _trc_func_1000182_4(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000182_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000199;//user.Char:199
        case 1:
          //$LASTPOS=1000221;//user.Char:221
          _this.print("Go Left");
          //$LASTPOS=1000247;//user.Char:247
        case 2:
          if (!(_this.x<300)) { __pc=4; break; }
          //$LASTPOS=1000274;//user.Char:274
          _this.x+=speed;
          //$LASTPOS=1000296;//user.Char:296
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000324;//user.Char:324
          _this.print("Go Right");
          //$LASTPOS=1000351;//user.Char:351
        case 5:
          if (!(_this.x>100)) { __pc=7; break; }
          //$LASTPOS=1000378;//user.Char:378
          _this.x-=speed;
          //$LASTPOS=1000400;//user.Char:400
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
  scale :function _trc_func_1000429_6(speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000449;//user.Char:449
    while (true) {
      //$LASTPOS=1000471;//user.Char:471
      _this.print("Bigger");
      //$LASTPOS=1000496;//user.Char:496
      //$LASTPOS=1000501;//user.Char:501
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000529;//user.Char:529
          _this.scaleX+=speed;
          //$LASTPOS=1000556;//user.Char:556
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=1000584;//user.Char:584
      _this.print("Smaller");
      //$LASTPOS=1000610;//user.Char:610
      //$LASTPOS=1000615;//user.Char:615
      _this.i=0;
      while(_this.i<17) {
        {
          //$LASTPOS=1000643;//user.Char:643
          _this.scaleX-=speed;
          //$LASTPOS=1000670;//user.Char:670
          _this.update();
        }
        _this.i++;
      }
      
    }
  },
  fiber$scale :function _trc_func_1000429_7(_thread,speed) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000429_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000449;//user.Char:449
        case 1:
          //$LASTPOS=1000471;//user.Char:471
          _this.print("Bigger");
          //$LASTPOS=1000496;//user.Char:496
          //$LASTPOS=1000501;//user.Char:501
          _this.i=0;;
        case 2:
          if (!(_this.i<17)) { __pc=4; break; }
          //$LASTPOS=1000529;//user.Char:529
          _this.scaleX+=speed;
          //$LASTPOS=1000556;//user.Char:556
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          _this.i++;
          __pc=2;break;
        case 4:
          
          //$LASTPOS=1000584;//user.Char:584
          _this.print("Smaller");
          //$LASTPOS=1000610;//user.Char:610
          //$LASTPOS=1000615;//user.Char:615
          _this.i=0;;
        case 5:
          if (!(_this.i<17)) { __pc=7; break; }
          //$LASTPOS=1000643;//user.Char:643
          _this.scaleX-=speed;
          //$LASTPOS=1000670;//user.Char:670
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
    
    //$LASTPOS=2000000;//user.Main:0
    _this.c=new Tonyu.classes.user.Char;
    //$LASTPOS=2000012;//user.Main:12
    while (true) {
      //$LASTPOS=2000031;//user.Main:31
      if (_this.getkey("f")==1) {
        //$LASTPOS=2000051;//user.Main:51
        _this.c.fireEvent("fuga");
      }
      //$LASTPOS=2000076;//user.Main:76
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;//user.Main:0
    _this.c=new Tonyu.classes.user.Char;
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000012;//user.Main:12
        case 1:
          //$LASTPOS=2000031;//user.Main:31
          if (_this.getkey("f")==1) {
            //$LASTPOS=2000051;//user.Main:51
            _this.c.fireEvent("fuga");
          }
          //$LASTPOS=2000076;//user.Main:76
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

