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
      _this.x=_this.y=200;
      //$LASTPOS=41000009;//user.Main:9
      _this.parallel("ctrl");
      //$LASTPOS=41000027;//user.Main:27
      _this.updateEx(300);
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000000;//user.Main:0
      _this.x=_this.y=200;
      //$LASTPOS=41000009;//user.Main:9
      _this.parallel("ctrl");
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000027;//user.Main:27
            _this.fiber$updateEx(_thread, 300);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    up :function _trc_Main_up() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=41000063;//user.Main:63
      //$LASTPOS=41000068;//user.Main:68
      i = 0;
      while(i<20) {
        {
          //$LASTPOS=41000097;//user.Main:97
          _this.y--;
          //$LASTPOS=41000110;//user.Main:110
          _this.update();
        }
        i++;
      }
    },
    fiber$up :function _trc_Main_f_up(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Main_ent_up(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000063;//user.Main:63
            //$LASTPOS=41000068;//user.Main:68
            i = 0;;
          case 1:
            if (!(i<20)) { __pc=3; break; }
            //$LASTPOS=41000097;//user.Main:97
            _this.y--;
            //$LASTPOS=41000110;//user.Main:110
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    down :function _trc_Main_down() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=41000145;//user.Main:145
      //$LASTPOS=41000150;//user.Main:150
      i = 0;
      while(i<20) {
        {
          //$LASTPOS=41000179;//user.Main:179
          _this.y++;
          //$LASTPOS=41000192;//user.Main:192
          _this.update();
        }
        i++;
      }
    },
    fiber$down :function _trc_Main_f_down(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Main_ent_down(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000145;//user.Main:145
            //$LASTPOS=41000150;//user.Main:150
            i = 0;;
          case 1:
            if (!(i<20)) { __pc=3; break; }
            //$LASTPOS=41000179;//user.Main:179
            _this.y++;
            //$LASTPOS=41000192;//user.Main:192
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    left :function _trc_Main_left() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=41000227;//user.Main:227
      //$LASTPOS=41000232;//user.Main:232
      i = 0;
      while(i<20) {
        {
          //$LASTPOS=41000261;//user.Main:261
          _this.x--;
          //$LASTPOS=41000274;//user.Main:274
          _this.update();
        }
        i++;
      }
    },
    fiber$left :function _trc_Main_f_left(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Main_ent_left(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000227;//user.Main:227
            //$LASTPOS=41000232;//user.Main:232
            i = 0;;
          case 1:
            if (!(i<20)) { __pc=3; break; }
            //$LASTPOS=41000261;//user.Main:261
            _this.x--;
            //$LASTPOS=41000274;//user.Main:274
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    right :function _trc_Main_right() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=41000310;//user.Main:310
      //$LASTPOS=41000315;//user.Main:315
      i = 0;
      while(i<20) {
        {
          //$LASTPOS=41000344;//user.Main:344
          _this.x++;
          //$LASTPOS=41000357;//user.Main:357
          _this.update();
        }
        i++;
      }
    },
    fiber$right :function _trc_Main_f_right(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      
      _thread.enter(function _trc_Main_ent_right(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000310;//user.Main:310
            //$LASTPOS=41000315;//user.Main:315
            i = 0;;
          case 1:
            if (!(i<20)) { __pc=3; break; }
            //$LASTPOS=41000344;//user.Main:344
            _this.x++;
            //$LASTPOS=41000357;//user.Main:357
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    jump :function _trc_Main_jump() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var yy;
      var i;
      
      //$LASTPOS=41000392;//user.Main:392
      yy = _this.y;
      //$LASTPOS=41000406;//user.Main:406
      //$LASTPOS=41000411;//user.Main:411
      i = - 1;
      while(i<1) {
        {
          //$LASTPOS=41000444;//user.Main:444
          _this.y=yy-(1-(i*i))*10;
          //$LASTPOS=41000471;//user.Main:471
          _this.update();
        }
        i+=1/16;
      }
    },
    fiber$jump :function _trc_Main_f_jump(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var yy;
      var i;
      
      //$LASTPOS=41000392;//user.Main:392
      yy = _this.y;
      
      _thread.enter(function _trc_Main_ent_jump(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000406;//user.Main:406
            //$LASTPOS=41000411;//user.Main:411
            i = - 1;;
          case 1:
            if (!(i<1)) { __pc=3; break; }
            //$LASTPOS=41000444;//user.Main:444
            _this.y=yy-(1-(i*i))*10;
            //$LASTPOS=41000471;//user.Main:471
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i+=1/16;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    goto :function _trc_Main_goto(n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000511;//user.Main:511
      _this._th.clearFrame();
      //$LASTPOS=41000533;//user.Main:533
      _this._th.apply(_this,n,[]);
      //$LASTPOS=41000559;//user.Main:559
      if (! _this._th.scheduled) {
        //$LASTPOS=41000589;//user.Main:589
        _this._th.steps();
        
      }
    },
    fiber$goto :function _trc_Main_f_goto(_thread,n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000511;//user.Main:511
      _this._th.clearFrame();
      //$LASTPOS=41000533;//user.Main:533
      _this._th.apply(_this,n,[]);
      //$LASTPOS=41000559;//user.Main:559
      if (! _this._th.scheduled) {
        //$LASTPOS=41000589;//user.Main:589
        _this._th.steps();
        
      }
      
      _thread.retVal=_this;return;
    },
    gosub :function _trc_Main_gosub(n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000650;//user.Main:650
      _this._th.apply(_this,n,[]);
      //$LASTPOS=41000676;//user.Main:676
      if (! _this._th.scheduled) {
        //$LASTPOS=41000706;//user.Main:706
        _this._th.steps();
        
      }
    },
    fiber$gosub :function _trc_Main_f_gosub(_thread,n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000650;//user.Main:650
      _this._th.apply(_this,n,[]);
      //$LASTPOS=41000676;//user.Main:676
      if (! _this._th.scheduled) {
        //$LASTPOS=41000706;//user.Main:706
        _this._th.steps();
        
      }
      
      _thread.retVal=_this;return;
    },
    ctrl :function _trc_Main_ctrl() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000743;//user.Main:743
      while (true) {
        //$LASTPOS=41000765;//user.Main:765
        if (_this.getkey("down")) {
          //$LASTPOS=41000785;//user.Main:785
          _this.goto("down");
        }
        //$LASTPOS=41000807;//user.Main:807
        if (_this.getkey("up")) {
          //$LASTPOS=41000825;//user.Main:825
          _this.goto("up");
        }
        //$LASTPOS=41000845;//user.Main:845
        if (_this.getkey("left")==1) {
          //$LASTPOS=41000868;//user.Main:868
          _this.gosub("left");
        }
        //$LASTPOS=41000891;//user.Main:891
        if (_this.getkey("right")==1) {
          //$LASTPOS=41000915;//user.Main:915
          _this.gosub("right");
        }
        //$LASTPOS=41000939;//user.Main:939
        if (_this.getkey("space")==1) {
          //$LASTPOS=41000963;//user.Main:963
          _this.gosub("jump");
        }
        //$LASTPOS=41000986;//user.Main:986
        _this.update();
        
      }
    },
    fiber$ctrl :function _trc_Main_f_ctrl(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main_ent_ctrl(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000743;//user.Main:743
          case 1:
            //$LASTPOS=41000765;//user.Main:765
            if (!(_this.getkey("down"))) { __pc=3; break; }
            //$LASTPOS=41000785;//user.Main:785
            _this.fiber$goto(_thread, "down");
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=41000807;//user.Main:807
            if (!(_this.getkey("up"))) { __pc=5; break; }
            //$LASTPOS=41000825;//user.Main:825
            _this.fiber$goto(_thread, "up");
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=41000845;//user.Main:845
            if (!(_this.getkey("left")==1)) { __pc=7; break; }
            //$LASTPOS=41000868;//user.Main:868
            _this.fiber$gosub(_thread, "left");
            __pc=6;return;
          case 6:
            
          case 7:
            
            //$LASTPOS=41000891;//user.Main:891
            if (!(_this.getkey("right")==1)) { __pc=9; break; }
            //$LASTPOS=41000915;//user.Main:915
            _this.fiber$gosub(_thread, "right");
            __pc=8;return;
          case 8:
            
          case 9:
            
            //$LASTPOS=41000939;//user.Main:939
            if (!(_this.getkey("space")==1)) { __pc=11; break; }
            //$LASTPOS=41000963;//user.Main:963
            _this.fiber$gosub(_thread, "jump");
            __pc=10;return;
          case 10:
            
          case 11:
            
            //$LASTPOS=41000986;//user.Main:986
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            __pc=1;break;
          case 13:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"up":{"nowait":false},"down":{"nowait":false},"left":{"nowait":false},"right":{"nowait":false},"jump":{"nowait":false},"goto":{"nowait":false},"gosub":{"nowait":false},"ctrl":{"nowait":false}}}
});
