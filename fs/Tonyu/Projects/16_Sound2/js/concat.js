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
      //$LASTPOS=1000074;//user.Main:74
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=1000124;//user.Main:124
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=1000172;//user.Main:172
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=1000223;//user.Main:223
      _this.print("A-D: Sound Effect");
      //$LASTPOS=1000252;//user.Main:252
      _this.print("↑  ↓: Volume");
      //$LASTPOS=1000276;//user.Main:276
      _this.print("<-  ->: Tempo");
      //$LASTPOS=1000301;//user.Main:301
      _this.print("Z: Stop BGM");
      //$LASTPOS=1000326;//user.Main:326
      _this.v=128;
      //$LASTPOS=1000332;//user.Main:332
      _this.t=1;
      //$LASTPOS=1000338;//user.Main:338
      while (true) {
        //$LASTPOS=1000358;//user.Main:358
        _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
        //$LASTPOS=1000422;//user.Main:422
        if (_this.getkey("up")) {
          //$LASTPOS=1000451;//user.Main:451
          _this.v++;
          //$LASTPOS=1000455;//user.Main:455
          if (_this.v>128) {
            //$LASTPOS=1000465;//user.Main:465
            _this.v=128;
          }
          //$LASTPOS=1000481;//user.Main:481
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=1000514;//user.Main:514
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=1000545;//user.Main:545
        if (_this.getkey("down")) {
          //$LASTPOS=1000576;//user.Main:576
          _this.v--;
          //$LASTPOS=1000580;//user.Main:580
          if (_this.v<0) {
            //$LASTPOS=1000588;//user.Main:588
            _this.v=0;
          }
          //$LASTPOS=1000602;//user.Main:602
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=1000635;//user.Main:635
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=1000666;//user.Main:666
        if (_this.getkey("left")) {
          //$LASTPOS=1000697;//user.Main:697
          _this.t-=0.01;
          //$LASTPOS=1000733;//user.Main:733
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=1000765;//user.Main:765
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=1000798;//user.Main:798
        if (_this.getkey("right")) {
          //$LASTPOS=1000830;//user.Main:830
          _this.t+=0.01;
          //$LASTPOS=1000862;//user.Main:862
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=1000894;//user.Main:894
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=1000933;//user.Main:933
        if (_this.getkey("a")==1) {
          //$LASTPOS=1000964;//user.Main:964
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
          
        }
        //$LASTPOS=1001009;//user.Main:1009
        if (_this.getkey("b")==1) {
          //$LASTPOS=1001040;//user.Main:1040
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
          
        }
        //$LASTPOS=1001087;//user.Main:1087
        if (_this.getkey("c")==1) {
          //$LASTPOS=1001118;//user.Main:1118
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
          
        }
        //$LASTPOS=1001161;//user.Main:1161
        if (_this.getkey("d")==1) {
          //$LASTPOS=1001192;//user.Main:1192
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
          
        }
        //$LASTPOS=1001230;//user.Main:1230
        if (_this.getkey("p")==1) {
          //$LASTPOS=1001261;//user.Main:1261
          Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
          
        }
        //$LASTPOS=1001316;//user.Main:1316
        if (_this.getkey("z")==1) {
          //$LASTPOS=1001347;//user.Main:1347
          Tonyu.globals.$sound.stopBGM();
          
        }
        //$LASTPOS=1001377;//user.Main:1377
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
      //$LASTPOS=1000074;//user.Main:74
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=1000124;//user.Main:124
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=1000172;//user.Main:172
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=1000223;//user.Main:223
      _this.print("A-D: Sound Effect");
      //$LASTPOS=1000252;//user.Main:252
      _this.print("↑  ↓: Volume");
      //$LASTPOS=1000276;//user.Main:276
      _this.print("<-  ->: Tempo");
      //$LASTPOS=1000301;//user.Main:301
      _this.print("Z: Stop BGM");
      //$LASTPOS=1000326;//user.Main:326
      _this.v=128;
      //$LASTPOS=1000332;//user.Main:332
      _this.t=1;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000338;//user.Main:338
          case 1:
            //$LASTPOS=1000358;//user.Main:358
            _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
            //$LASTPOS=1000422;//user.Main:422
            if (_this.getkey("up")) {
              //$LASTPOS=1000451;//user.Main:451
              _this.v++;
              //$LASTPOS=1000455;//user.Main:455
              if (_this.v>128) {
                //$LASTPOS=1000465;//user.Main:465
                _this.v=128;
              }
              //$LASTPOS=1000481;//user.Main:481
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=1000514;//user.Main:514
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=1000545;//user.Main:545
            if (_this.getkey("down")) {
              //$LASTPOS=1000576;//user.Main:576
              _this.v--;
              //$LASTPOS=1000580;//user.Main:580
              if (_this.v<0) {
                //$LASTPOS=1000588;//user.Main:588
                _this.v=0;
              }
              //$LASTPOS=1000602;//user.Main:602
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=1000635;//user.Main:635
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=1000666;//user.Main:666
            if (_this.getkey("left")) {
              //$LASTPOS=1000697;//user.Main:697
              _this.t-=0.01;
              //$LASTPOS=1000733;//user.Main:733
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=1000765;//user.Main:765
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=1000798;//user.Main:798
            if (_this.getkey("right")) {
              //$LASTPOS=1000830;//user.Main:830
              _this.t+=0.01;
              //$LASTPOS=1000862;//user.Main:862
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=1000894;//user.Main:894
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=1000933;//user.Main:933
            if (_this.getkey("a")==1) {
              //$LASTPOS=1000964;//user.Main:964
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
              
            }
            //$LASTPOS=1001009;//user.Main:1009
            if (_this.getkey("b")==1) {
              //$LASTPOS=1001040;//user.Main:1040
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
              
            }
            //$LASTPOS=1001087;//user.Main:1087
            if (_this.getkey("c")==1) {
              //$LASTPOS=1001118;//user.Main:1118
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
              
            }
            //$LASTPOS=1001161;//user.Main:1161
            if (_this.getkey("d")==1) {
              //$LASTPOS=1001192;//user.Main:1192
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
              
            }
            //$LASTPOS=1001230;//user.Main:1230
            if (_this.getkey("p")==1) {
              //$LASTPOS=1001261;//user.Main:1261
              Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
              
            }
            //$LASTPOS=1001316;//user.Main:1316
            if (_this.getkey("z")==1) {
              //$LASTPOS=1001347;//user.Main:1347
              Tonyu.globals.$sound.stopBGM();
              
            }
            //$LASTPOS=1001377;//user.Main:1377
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
