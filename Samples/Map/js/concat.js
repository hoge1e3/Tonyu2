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
      while (true) {
        //$LASTPOS=2000182;//user.Neko:182
        _this.dir="stop";
        //$LASTPOS=2000199;//user.Neko:199
        _this.sx=_this.x;
        //$LASTPOS=2000204;//user.Neko:204
        _this.sy=_this.y;
        //$LASTPOS=2000215;//user.Neko:215
        if (_this.getkey("down")) {
          //$LASTPOS=2000244;//user.Neko:244
          _this.y+=4;
          //$LASTPOS=2000259;//user.Neko:259
          _this.dir="down";
          
        }
        //$LASTPOS=2000283;//user.Neko:283
        if (_this.getkey("up")) {
          //$LASTPOS=2000310;//user.Neko:310
          _this.y-=4;
          //$LASTPOS=2000325;//user.Neko:325
          _this.dir="up";
          
        }
        //$LASTPOS=2000347;//user.Neko:347
        if (_this.getkey("left")) {
          //$LASTPOS=2000376;//user.Neko:376
          _this.x-=4;
          //$LASTPOS=2000391;//user.Neko:391
          _this.scaleX=- 1;
          //$LASTPOS=2000411;//user.Neko:411
          _this.scaleY=1;
          //$LASTPOS=2000430;//user.Neko:430
          _this.dir="lr";
          
        }
        //$LASTPOS=2000452;//user.Neko:452
        if (_this.getkey("right")) {
          //$LASTPOS=2000482;//user.Neko:482
          _this.scaleX=1;
          //$LASTPOS=2000501;//user.Neko:501
          _this.x+=4;
          //$LASTPOS=2000516;//user.Neko:516
          _this.dir="lr";
          
        }
        //$LASTPOS=2000538;//user.Neko:538
        if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>- 1) {
          //$LASTPOS=2000575;//user.Neko:575
          _this.x=_this.sx;
          //$LASTPOS=2000580;//user.Neko:580
          _this.y=_this.sy;
          //$LASTPOS=2000595;//user.Neko:595
          _this.dir="stop";
          
        }
        //$LASTPOS=2000619;//user.Neko:619
        Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2,_this.y-Tonyu.globals.$screenHeight/2);
        //$LASTPOS=2000685;//user.Neko:685
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
      
      _thread.enter(function _trc_Neko_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000164;//user.Neko:164
          case 1:
            //$LASTPOS=2000182;//user.Neko:182
            _this.dir="stop";
            //$LASTPOS=2000199;//user.Neko:199
            _this.sx=_this.x;
            //$LASTPOS=2000204;//user.Neko:204
            _this.sy=_this.y;
            //$LASTPOS=2000215;//user.Neko:215
            if (_this.getkey("down")) {
              //$LASTPOS=2000244;//user.Neko:244
              _this.y+=4;
              //$LASTPOS=2000259;//user.Neko:259
              _this.dir="down";
              
            }
            //$LASTPOS=2000283;//user.Neko:283
            if (_this.getkey("up")) {
              //$LASTPOS=2000310;//user.Neko:310
              _this.y-=4;
              //$LASTPOS=2000325;//user.Neko:325
              _this.dir="up";
              
            }
            //$LASTPOS=2000347;//user.Neko:347
            if (_this.getkey("left")) {
              //$LASTPOS=2000376;//user.Neko:376
              _this.x-=4;
              //$LASTPOS=2000391;//user.Neko:391
              _this.scaleX=- 1;
              //$LASTPOS=2000411;//user.Neko:411
              _this.scaleY=1;
              //$LASTPOS=2000430;//user.Neko:430
              _this.dir="lr";
              
            }
            //$LASTPOS=2000452;//user.Neko:452
            if (_this.getkey("right")) {
              //$LASTPOS=2000482;//user.Neko:482
              _this.scaleX=1;
              //$LASTPOS=2000501;//user.Neko:501
              _this.x+=4;
              //$LASTPOS=2000516;//user.Neko:516
              _this.dir="lr";
              
            }
            //$LASTPOS=2000538;//user.Neko:538
            if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>- 1) {
              //$LASTPOS=2000575;//user.Neko:575
              _this.x=_this.sx;
              //$LASTPOS=2000580;//user.Neko:580
              _this.y=_this.sy;
              //$LASTPOS=2000595;//user.Neko:595
              _this.dir="stop";
              
            }
            //$LASTPOS=2000619;//user.Neko:619
            Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2,_this.y-Tonyu.globals.$screenHeight/2);
            //$LASTPOS=2000685;//user.Neko:685
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
      
      //$LASTPOS=2000716;//user.Neko:716
      _this.counter=0;
      //$LASTPOS=2000751;//user.Neko:751
      while (true) {
        //$LASTPOS=2000773;//user.Neko:773
        if (_this.dir=="down") {
          //$LASTPOS=2000803;//user.Neko:803
          _this.p=Tonyu.globals.$pat_neko+_this.pListDown[_this.counter%4];
          
        } else {
          //$LASTPOS=2000852;//user.Neko:852
          if (_this.dir=="up") {
            //$LASTPOS=2000880;//user.Neko:880
            _this.p=Tonyu.globals.$pat_neko+_this.pListUp[_this.counter%4];
            
          } else {
            //$LASTPOS=2000927;//user.Neko:927
            if (_this.dir=="lr") {
              //$LASTPOS=2000955;//user.Neko:955
              _this.p=Tonyu.globals.$pat_neko+_this.pListLR[_this.counter%2];
              
            } else {
              
              
            }
          }
        }
        //$LASTPOS=2001053;//user.Neko:1053
        _this.counter++;
        //$LASTPOS=2001102;//user.Neko:1102
        _this.updateEx(4);
        
      }
    },
    fiber$animate :function _trc_Neko_f_animate(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000716;//user.Neko:716
      _this.counter=0;
      
      _thread.enter(function _trc_Neko_ent_animate(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000751;//user.Neko:751
          case 1:
            //$LASTPOS=2000773;//user.Neko:773
            if (_this.dir=="down") {
              //$LASTPOS=2000803;//user.Neko:803
              _this.p=Tonyu.globals.$pat_neko+_this.pListDown[_this.counter%4];
              
            } else {
              //$LASTPOS=2000852;//user.Neko:852
              if (_this.dir=="up") {
                //$LASTPOS=2000880;//user.Neko:880
                _this.p=Tonyu.globals.$pat_neko+_this.pListUp[_this.counter%4];
                
              } else {
                //$LASTPOS=2000927;//user.Neko:927
                if (_this.dir=="lr") {
                  //$LASTPOS=2000955;//user.Neko:955
                  _this.p=Tonyu.globals.$pat_neko+_this.pListLR[_this.counter%2];
                  
                } else {
                  
                  
                }
              }
            }
            //$LASTPOS=2001053;//user.Neko:1053
            _this.counter++;
            //$LASTPOS=2001102;//user.Neko:1102
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
