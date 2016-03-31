Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.Main:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=1000042;//user.Main:42
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=1000066;//user.Main:66
      new Tonyu.classes.user.Neko({x: 200,y: 200});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=1000042;//user.Main:42
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=1000066;//user.Main:66
      new Tonyu.classes.user.Neko({x: 200,y: 200});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Neko',
  shortName: 'Neko',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Neko_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000055;//user.Neko:55
      _this.pListDown=[0,1,0,2];
      //$LASTPOS=2000077;//user.Neko:77
      _this.pListUp=[5,6,5,7];
      //$LASTPOS=2000097;//user.Neko:97
      _this.pListLR=[3,4];
      //$LASTPOS=2000113;//user.Neko:113
      _this.dir="stop";
      //$LASTPOS=2000126;//user.Neko:126
      _this.p=Tonyu.globals.$pat_neko+0;
      //$LASTPOS=2000142;//user.Neko:142
      _this.parallel("animate");
      //$LASTPOS=2000164;//user.Neko:164
      Tonyu.globals.$Screen.setPivot(Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight/2);
      //$LASTPOS=2000216;//user.Neko:216
      _this.sc=1;
      //$LASTPOS=2000223;//user.Neko:223
      while (true) {
        //$LASTPOS=2000241;//user.Neko:241
        _this.dir="stop";
        //$LASTPOS=2000258;//user.Neko:258
        _this.sx=_this.x;
        //$LASTPOS=2000263;//user.Neko:263
        _this.sy=_this.y;
        //$LASTPOS=2000274;//user.Neko:274
        if (_this.getkey("down")) {
          //$LASTPOS=2000303;//user.Neko:303
          _this.y+=4;
          //$LASTPOS=2000318;//user.Neko:318
          _this.dir="down";
          
        }
        //$LASTPOS=2000342;//user.Neko:342
        if (_this.getkey("up")) {
          //$LASTPOS=2000369;//user.Neko:369
          _this.y-=4;
          //$LASTPOS=2000384;//user.Neko:384
          _this.dir="up";
          
        }
        //$LASTPOS=2000406;//user.Neko:406
        if (_this.getkey("left")) {
          //$LASTPOS=2000435;//user.Neko:435
          _this.x-=4;
          //$LASTPOS=2000450;//user.Neko:450
          _this.scaleX=- 1;
          //$LASTPOS=2000470;//user.Neko:470
          _this.scaleY=1;
          //$LASTPOS=2000489;//user.Neko:489
          _this.dir="lr";
          
        }
        //$LASTPOS=2000511;//user.Neko:511
        if (_this.getkey("right")) {
          //$LASTPOS=2000541;//user.Neko:541
          _this.scaleX=1;
          //$LASTPOS=2000560;//user.Neko:560
          _this.x+=4;
          //$LASTPOS=2000575;//user.Neko:575
          _this.dir="lr";
          
        }
        //$LASTPOS=2000597;//user.Neko:597
        if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>- 1) {
          //$LASTPOS=2000634;//user.Neko:634
          _this.x=_this.sx;
          //$LASTPOS=2000639;//user.Neko:639
          _this.y=_this.sy;
          //$LASTPOS=2000654;//user.Neko:654
          _this.dir="stop";
          
        }
        //$LASTPOS=2000678;//user.Neko:678
        if (_this.getkey("z")==1) {
          //$LASTPOS=2000698;//user.Neko:698
          _this.sc=1.5-_this.sc;
        }
        //$LASTPOS=2000714;//user.Neko:714
        Tonyu.globals.$Screen.scrollTo(_this.x,_this.y,_this.sc);
        //$LASTPOS=2000751;//user.Neko:751
        _this.update();
        
      }
    },
    fiber$main :function _trc_Neko_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000055;//user.Neko:55
      _this.pListDown=[0,1,0,2];
      //$LASTPOS=2000077;//user.Neko:77
      _this.pListUp=[5,6,5,7];
      //$LASTPOS=2000097;//user.Neko:97
      _this.pListLR=[3,4];
      //$LASTPOS=2000113;//user.Neko:113
      _this.dir="stop";
      //$LASTPOS=2000126;//user.Neko:126
      _this.p=Tonyu.globals.$pat_neko+0;
      //$LASTPOS=2000142;//user.Neko:142
      _this.parallel("animate");
      //$LASTPOS=2000164;//user.Neko:164
      Tonyu.globals.$Screen.setPivot(Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight/2);
      //$LASTPOS=2000216;//user.Neko:216
      _this.sc=1;
      
      _thread.enter(function _trc_Neko_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000223;//user.Neko:223
          case 1:
            //$LASTPOS=2000241;//user.Neko:241
            _this.dir="stop";
            //$LASTPOS=2000258;//user.Neko:258
            _this.sx=_this.x;
            //$LASTPOS=2000263;//user.Neko:263
            _this.sy=_this.y;
            //$LASTPOS=2000274;//user.Neko:274
            if (_this.getkey("down")) {
              //$LASTPOS=2000303;//user.Neko:303
              _this.y+=4;
              //$LASTPOS=2000318;//user.Neko:318
              _this.dir="down";
              
            }
            //$LASTPOS=2000342;//user.Neko:342
            if (_this.getkey("up")) {
              //$LASTPOS=2000369;//user.Neko:369
              _this.y-=4;
              //$LASTPOS=2000384;//user.Neko:384
              _this.dir="up";
              
            }
            //$LASTPOS=2000406;//user.Neko:406
            if (_this.getkey("left")) {
              //$LASTPOS=2000435;//user.Neko:435
              _this.x-=4;
              //$LASTPOS=2000450;//user.Neko:450
              _this.scaleX=- 1;
              //$LASTPOS=2000470;//user.Neko:470
              _this.scaleY=1;
              //$LASTPOS=2000489;//user.Neko:489
              _this.dir="lr";
              
            }
            //$LASTPOS=2000511;//user.Neko:511
            if (_this.getkey("right")) {
              //$LASTPOS=2000541;//user.Neko:541
              _this.scaleX=1;
              //$LASTPOS=2000560;//user.Neko:560
              _this.x+=4;
              //$LASTPOS=2000575;//user.Neko:575
              _this.dir="lr";
              
            }
            //$LASTPOS=2000597;//user.Neko:597
            if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>- 1) {
              //$LASTPOS=2000634;//user.Neko:634
              _this.x=_this.sx;
              //$LASTPOS=2000639;//user.Neko:639
              _this.y=_this.sy;
              //$LASTPOS=2000654;//user.Neko:654
              _this.dir="stop";
              
            }
            //$LASTPOS=2000678;//user.Neko:678
            if (_this.getkey("z")==1) {
              //$LASTPOS=2000698;//user.Neko:698
              _this.sc=1.5-_this.sc;
            }
            //$LASTPOS=2000714;//user.Neko:714
            Tonyu.globals.$Screen.scrollTo(_this.x,_this.y,_this.sc);
            //$LASTPOS=2000751;//user.Neko:751
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
    animate :function _trc_Neko_animate() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000782;//user.Neko:782
      _this.counter=0;
      //$LASTPOS=2000817;//user.Neko:817
      while (true) {
        //$LASTPOS=2000839;//user.Neko:839
        if (_this.dir=="down") {
          //$LASTPOS=2000869;//user.Neko:869
          _this.p=Tonyu.globals.$pat_neko+_this.pListDown[_this.counter%4];
          
        } else {
          //$LASTPOS=2000918;//user.Neko:918
          if (_this.dir=="up") {
            //$LASTPOS=2000946;//user.Neko:946
            _this.p=Tonyu.globals.$pat_neko+_this.pListUp[_this.counter%4];
            
          } else {
            //$LASTPOS=2000993;//user.Neko:993
            if (_this.dir=="lr") {
              //$LASTPOS=2001021;//user.Neko:1021
              _this.p=Tonyu.globals.$pat_neko+_this.pListLR[_this.counter%2];
              
            } else {
              
              
            }
          }
        }
        //$LASTPOS=2001119;//user.Neko:1119
        _this.counter++;
        //$LASTPOS=2001168;//user.Neko:1168
        _this.updateEx(4);
        
      }
    },
    fiber$animate :function _trc_Neko_f_animate(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000782;//user.Neko:782
      _this.counter=0;
      
      _thread.enter(function _trc_Neko_ent_animate(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000817;//user.Neko:817
          case 1:
            //$LASTPOS=2000839;//user.Neko:839
            if (_this.dir=="down") {
              //$LASTPOS=2000869;//user.Neko:869
              _this.p=Tonyu.globals.$pat_neko+_this.pListDown[_this.counter%4];
              
            } else {
              //$LASTPOS=2000918;//user.Neko:918
              if (_this.dir=="up") {
                //$LASTPOS=2000946;//user.Neko:946
                _this.p=Tonyu.globals.$pat_neko+_this.pListUp[_this.counter%4];
                
              } else {
                //$LASTPOS=2000993;//user.Neko:993
                if (_this.dir=="lr") {
                  //$LASTPOS=2001021;//user.Neko:1021
                  _this.p=Tonyu.globals.$pat_neko+_this.pListLR[_this.counter%2];
                  
                } else {
                  
                  
                }
              }
            }
            //$LASTPOS=2001119;//user.Neko:1119
            _this.counter++;
            //$LASTPOS=2001168;//user.Neko:1168
            _this.fiber$updateEx(_thread, 4);
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
  decls: {"methods":{"main":{"nowait":false},"animate":{"nowait":false}}}
});
