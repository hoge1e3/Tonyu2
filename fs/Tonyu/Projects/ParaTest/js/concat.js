Tonyu.klass.define({
  fullName: 'user.Char',
  shortName: 'Char',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Char_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000001;//user.Char:1
      _this.x=100;
      //$LASTPOS=40000007;//user.Char:7
      _this.y=100;
      //$LASTPOS=40000014;//user.Char:14
      _this.g=_this.parallel(Tonyu.bindFunc(_this,_this.go),3);
      //$LASTPOS=40000032;//user.Char:32
      _this.s=_this.parallel(Tonyu.bindFunc(_this,_this.scale),0.1);
      //$LASTPOS=40000055;//user.Char:55
      _this.on("fuga",(function anonymous_66() {
        
        //$LASTPOS=40000068;//user.Char:68
        _this.print("fugaed");
      }));
      //$LASTPOS=40000087;//user.Char:87
      _this.on("die",(function anonymous_97() {
        
        //$LASTPOS=40000099;//user.Char:99
        _this.print("dead");
      }));
      //$LASTPOS=40000116;//user.Char:116
      while (true) {
        //$LASTPOS=40000134;//user.Char:134
        if (_this.getkey(32)==1) {
          //$LASTPOS=40000152;//user.Char:152
          _this.die();
        }
        //$LASTPOS=40000164;//user.Char:164
        _this.update();
        
      }
    },
    fiber$main :function _trc_Char_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000001;//user.Char:1
      _this.x=100;
      //$LASTPOS=40000007;//user.Char:7
      _this.y=100;
      //$LASTPOS=40000014;//user.Char:14
      _this.g=_this.parallel(Tonyu.bindFunc(_this,_this.go),3);
      //$LASTPOS=40000032;//user.Char:32
      _this.s=_this.parallel(Tonyu.bindFunc(_this,_this.scale),0.1);
      //$LASTPOS=40000055;//user.Char:55
      _this.on("fuga",(function anonymous_66() {
        
        //$LASTPOS=40000068;//user.Char:68
        _this.print("fugaed");
      }));
      //$LASTPOS=40000087;//user.Char:87
      _this.on("die",(function anonymous_97() {
        
        //$LASTPOS=40000099;//user.Char:99
        _this.print("dead");
      }));
      
      _thread.enter(function _trc_Char_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000116;//user.Char:116
          case 1:
            //$LASTPOS=40000134;//user.Char:134
            if (_this.getkey(32)==1) {
              //$LASTPOS=40000152;//user.Char:152
              _this.die();
            }
            //$LASTPOS=40000164;//user.Char:164
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
    go :function _trc_Char_go(speed) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000196;//user.Char:196
      while (true) {
        //$LASTPOS=40000218;//user.Char:218
        _this.print("Go Left");
        //$LASTPOS=40000244;//user.Char:244
        while (_this.x<300) {
          //$LASTPOS=40000271;//user.Char:271
          _this.x+=speed;
          //$LASTPOS=40000293;//user.Char:293
          _this.update();
          
        }
        //$LASTPOS=40000321;//user.Char:321
        _this.print("Go Right");
        //$LASTPOS=40000348;//user.Char:348
        while (_this.x>100) {
          //$LASTPOS=40000375;//user.Char:375
          _this.x-=speed;
          //$LASTPOS=40000397;//user.Char:397
          _this.update();
          
        }
        
      }
    },
    fiber$go :function _trc_Char_f_go(_thread,speed) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Char_ent_go(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000196;//user.Char:196
          case 1:
            //$LASTPOS=40000218;//user.Char:218
            _this.print("Go Left");
            //$LASTPOS=40000244;//user.Char:244
          case 2:
            if (!(_this.x<300)) { __pc=4; break; }
            //$LASTPOS=40000271;//user.Char:271
            _this.x+=speed;
            //$LASTPOS=40000293;//user.Char:293
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=40000321;//user.Char:321
            _this.print("Go Right");
            //$LASTPOS=40000348;//user.Char:348
          case 5:
            if (!(_this.x>100)) { __pc=7; break; }
            //$LASTPOS=40000375;//user.Char:375
            _this.x-=speed;
            //$LASTPOS=40000397;//user.Char:397
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
    scale :function _trc_Char_scale(speed) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000446;//user.Char:446
      while (true) {
        //$LASTPOS=40000468;//user.Char:468
        _this.print("Bigger");
        //$LASTPOS=40000493;//user.Char:493
        //$LASTPOS=40000498;//user.Char:498
        _this.i=0;
        while(_this.i<17) {
          {
            //$LASTPOS=40000526;//user.Char:526
            _this.scaleX+=speed;
            //$LASTPOS=40000553;//user.Char:553
            _this.update();
          }
          _this.i++;
        }
        //$LASTPOS=40000581;//user.Char:581
        _this.print("Smaller");
        //$LASTPOS=40000607;//user.Char:607
        //$LASTPOS=40000612;//user.Char:612
        _this.i=0;
        while(_this.i<17) {
          {
            //$LASTPOS=40000640;//user.Char:640
            _this.scaleX-=speed;
            //$LASTPOS=40000667;//user.Char:667
            _this.update();
          }
          _this.i++;
        }
        
      }
    },
    fiber$scale :function _trc_Char_f_scale(_thread,speed) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Char_ent_scale(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000446;//user.Char:446
          case 1:
            //$LASTPOS=40000468;//user.Char:468
            _this.print("Bigger");
            //$LASTPOS=40000493;//user.Char:493
            //$LASTPOS=40000498;//user.Char:498
            _this.i=0;;
          case 2:
            if (!(_this.i<17)) { __pc=4; break; }
            //$LASTPOS=40000526;//user.Char:526
            _this.scaleX+=speed;
            //$LASTPOS=40000553;//user.Char:553
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            _this.i++;
            __pc=2;break;
          case 4:
            
            //$LASTPOS=40000581;//user.Char:581
            _this.print("Smaller");
            //$LASTPOS=40000607;//user.Char:607
            //$LASTPOS=40000612;//user.Char:612
            _this.i=0;;
          case 5:
            if (!(_this.i<17)) { __pc=7; break; }
            //$LASTPOS=40000640;//user.Char:640
            _this.scaleX-=speed;
            //$LASTPOS=40000667;//user.Char:667
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
  },
  decls: {"methods":{"main":{"nowait":false},"go":{"nowait":false},"scale":{"nowait":false}}}
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
      
      //$LASTPOS=41000000;//user.Main:0
      _this.c=new Tonyu.classes.user.Char;
      //$LASTPOS=41000012;//user.Main:12
      while (true) {
        //$LASTPOS=41000031;//user.Main:31
        if (_this.getkey("f")==1) {
          //$LASTPOS=41000051;//user.Main:51
          _this.c.fireEvent("fuga");
        }
        //$LASTPOS=41000076;//user.Main:76
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000000;//user.Main:0
      _this.c=new Tonyu.classes.user.Char;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000012;//user.Main:12
          case 1:
            //$LASTPOS=41000031;//user.Main:31
            if (_this.getkey("f")==1) {
              //$LASTPOS=41000051;//user.Main:51
              _this.c.fireEvent("fuga");
            }
            //$LASTPOS=41000076;//user.Main:76
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
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
