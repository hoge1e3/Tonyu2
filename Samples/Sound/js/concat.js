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
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
      //$LASTPOS=1000111;//user.Main:111
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=1000161;//user.Main:161
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=1000209;//user.Main:209
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=1000260;//user.Main:260
      _this.print("A-D: Sound Effect");
      //$LASTPOS=1000289;//user.Main:289
      _this.print("↑  ↓: Volume");
      //$LASTPOS=1000313;//user.Main:313
      _this.print("<-  ->: Tempo");
      //$LASTPOS=1000338;//user.Main:338
      _this.print("Z: Stop BGM");
      //$LASTPOS=1000363;//user.Main:363
      _this.v=128;
      //$LASTPOS=1000369;//user.Main:369
      _this.t=1;
      //$LASTPOS=1000375;//user.Main:375
      while (true) {
        //$LASTPOS=1000395;//user.Main:395
        _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
        //$LASTPOS=1000459;//user.Main:459
        if (_this.getkey("up")) {
          //$LASTPOS=1000488;//user.Main:488
          _this.v++;
          //$LASTPOS=1000492;//user.Main:492
          if (_this.v>128) {
            //$LASTPOS=1000502;//user.Main:502
            _this.v=128;
          }
          //$LASTPOS=1000518;//user.Main:518
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=1000551;//user.Main:551
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=1000582;//user.Main:582
        if (_this.getkey("down")) {
          //$LASTPOS=1000613;//user.Main:613
          _this.v--;
          //$LASTPOS=1000617;//user.Main:617
          if (_this.v<0) {
            //$LASTPOS=1000625;//user.Main:625
            _this.v=0;
          }
          //$LASTPOS=1000639;//user.Main:639
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=1000672;//user.Main:672
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=1000703;//user.Main:703
        if (_this.getkey("left")) {
          //$LASTPOS=1000734;//user.Main:734
          _this.t-=0.01;
          //$LASTPOS=1000770;//user.Main:770
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=1000802;//user.Main:802
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=1000835;//user.Main:835
        if (_this.getkey("right")) {
          //$LASTPOS=1000867;//user.Main:867
          _this.t+=0.01;
          //$LASTPOS=1000899;//user.Main:899
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=1000931;//user.Main:931
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=1000970;//user.Main:970
        if (_this.getkey("a")==1) {
          //$LASTPOS=1001001;//user.Main:1001
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
          
        }
        //$LASTPOS=1001046;//user.Main:1046
        if (_this.getkey("b")==1) {
          //$LASTPOS=1001077;//user.Main:1077
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
          
        }
        //$LASTPOS=1001124;//user.Main:1124
        if (_this.getkey("c")==1) {
          //$LASTPOS=1001155;//user.Main:1155
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
          
        }
        //$LASTPOS=1001198;//user.Main:1198
        if (_this.getkey("d")==1) {
          //$LASTPOS=1001229;//user.Main:1229
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
          
        }
        //$LASTPOS=1001267;//user.Main:1267
        if (_this.getkey("p")==1) {
          //$LASTPOS=1001298;//user.Main:1298
          Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
          
        }
        //$LASTPOS=1001353;//user.Main:1353
        if (_this.getkey("z")==1) {
          //$LASTPOS=1001384;//user.Main:1384
          Tonyu.globals.$sound.stopBGM();
          
        }
        //$LASTPOS=1001414;//user.Main:1414
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
      //$LASTPOS=1000111;//user.Main:111
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=1000161;//user.Main:161
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=1000209;//user.Main:209
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=1000260;//user.Main:260
      _this.print("A-D: Sound Effect");
      //$LASTPOS=1000289;//user.Main:289
      _this.print("↑  ↓: Volume");
      //$LASTPOS=1000313;//user.Main:313
      _this.print("<-  ->: Tempo");
      //$LASTPOS=1000338;//user.Main:338
      _this.print("Z: Stop BGM");
      //$LASTPOS=1000363;//user.Main:363
      _this.v=128;
      //$LASTPOS=1000369;//user.Main:369
      _this.t=1;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000375;//user.Main:375
          case 1:
            //$LASTPOS=1000395;//user.Main:395
            _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
            //$LASTPOS=1000459;//user.Main:459
            if (_this.getkey("up")) {
              //$LASTPOS=1000488;//user.Main:488
              _this.v++;
              //$LASTPOS=1000492;//user.Main:492
              if (_this.v>128) {
                //$LASTPOS=1000502;//user.Main:502
                _this.v=128;
              }
              //$LASTPOS=1000518;//user.Main:518
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=1000551;//user.Main:551
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=1000582;//user.Main:582
            if (_this.getkey("down")) {
              //$LASTPOS=1000613;//user.Main:613
              _this.v--;
              //$LASTPOS=1000617;//user.Main:617
              if (_this.v<0) {
                //$LASTPOS=1000625;//user.Main:625
                _this.v=0;
              }
              //$LASTPOS=1000639;//user.Main:639
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=1000672;//user.Main:672
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=1000703;//user.Main:703
            if (_this.getkey("left")) {
              //$LASTPOS=1000734;//user.Main:734
              _this.t-=0.01;
              //$LASTPOS=1000770;//user.Main:770
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=1000802;//user.Main:802
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=1000835;//user.Main:835
            if (_this.getkey("right")) {
              //$LASTPOS=1000867;//user.Main:867
              _this.t+=0.01;
              //$LASTPOS=1000899;//user.Main:899
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=1000931;//user.Main:931
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=1000970;//user.Main:970
            if (_this.getkey("a")==1) {
              //$LASTPOS=1001001;//user.Main:1001
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
              
            }
            //$LASTPOS=1001046;//user.Main:1046
            if (_this.getkey("b")==1) {
              //$LASTPOS=1001077;//user.Main:1077
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
              
            }
            //$LASTPOS=1001124;//user.Main:1124
            if (_this.getkey("c")==1) {
              //$LASTPOS=1001155;//user.Main:1155
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
              
            }
            //$LASTPOS=1001198;//user.Main:1198
            if (_this.getkey("d")==1) {
              //$LASTPOS=1001229;//user.Main:1229
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
              
            }
            //$LASTPOS=1001267;//user.Main:1267
            if (_this.getkey("p")==1) {
              //$LASTPOS=1001298;//user.Main:1298
              Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
              
            }
            //$LASTPOS=1001353;//user.Main:1353
            if (_this.getkey("z")==1) {
              //$LASTPOS=1001384;//user.Main:1384
              Tonyu.globals.$sound.stopBGM();
              
            }
            //$LASTPOS=1001414;//user.Main:1414
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
