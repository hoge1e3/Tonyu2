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
      //$LASTPOS=1000071;//user.Main:71
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=1000120;//user.Main:120
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=1000167;//user.Main:167
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=1000217;//user.Main:217
      _this.print("A-D: Sound Effect");
      //$LASTPOS=1000245;//user.Main:245
      _this.print("↑  ↓: Volume");
      //$LASTPOS=1000268;//user.Main:268
      _this.print("<-  ->: Tempo");
      //$LASTPOS=1000292;//user.Main:292
      _this.print("Z: Stop BGM");
      //$LASTPOS=1000315;//user.Main:315
      _this.v=128;
      //$LASTPOS=1000321;//user.Main:321
      _this.t=1;
      //$LASTPOS=1000326;//user.Main:326
      while (true) {
        //$LASTPOS=1000345;//user.Main:345
        _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
        //$LASTPOS=1000408;//user.Main:408
        if (_this.getkey("up")) {
          //$LASTPOS=1000436;//user.Main:436
          _this.v++;
          //$LASTPOS=1000440;//user.Main:440
          if (_this.v>128) {
            //$LASTPOS=1000450;//user.Main:450
            _this.v=128;
          }
          //$LASTPOS=1000465;//user.Main:465
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=1000497;//user.Main:497
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=1000526;//user.Main:526
        if (_this.getkey("down")) {
          //$LASTPOS=1000556;//user.Main:556
          _this.v--;
          //$LASTPOS=1000560;//user.Main:560
          if (_this.v<0) {
            //$LASTPOS=1000568;//user.Main:568
            _this.v=0;
          }
          //$LASTPOS=1000581;//user.Main:581
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=1000613;//user.Main:613
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=1000642;//user.Main:642
        if (_this.getkey("left")) {
          //$LASTPOS=1000672;//user.Main:672
          _this.t-=0.01;
          //$LASTPOS=1000707;//user.Main:707
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=1000738;//user.Main:738
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=1000769;//user.Main:769
        if (_this.getkey("right")) {
          //$LASTPOS=1000800;//user.Main:800
          _this.t+=0.01;
          //$LASTPOS=1000831;//user.Main:831
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=1000862;//user.Main:862
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=1000898;//user.Main:898
        if (_this.getkey("a")==1) {
          //$LASTPOS=1000928;//user.Main:928
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
          
        }
        //$LASTPOS=1000971;//user.Main:971
        if (_this.getkey("b")==1) {
          //$LASTPOS=1001001;//user.Main:1001
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
          
        }
        //$LASTPOS=1001046;//user.Main:1046
        if (_this.getkey("c")==1) {
          //$LASTPOS=1001076;//user.Main:1076
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
          
        }
        //$LASTPOS=1001117;//user.Main:1117
        if (_this.getkey("d")==1) {
          //$LASTPOS=1001147;//user.Main:1147
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
          
        }
        //$LASTPOS=1001183;//user.Main:1183
        if (_this.getkey("p")==1) {
          //$LASTPOS=1001213;//user.Main:1213
          Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
          
        }
        //$LASTPOS=1001265;//user.Main:1265
        if (_this.getkey("z")==1) {
          //$LASTPOS=1001295;//user.Main:1295
          Tonyu.globals.$sound.stopBGM();
          
        }
        //$LASTPOS=1001323;//user.Main:1323
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
      //$LASTPOS=1000071;//user.Main:71
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=1000120;//user.Main:120
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=1000167;//user.Main:167
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=1000217;//user.Main:217
      _this.print("A-D: Sound Effect");
      //$LASTPOS=1000245;//user.Main:245
      _this.print("↑  ↓: Volume");
      //$LASTPOS=1000268;//user.Main:268
      _this.print("<-  ->: Tempo");
      //$LASTPOS=1000292;//user.Main:292
      _this.print("Z: Stop BGM");
      //$LASTPOS=1000315;//user.Main:315
      _this.v=128;
      //$LASTPOS=1000321;//user.Main:321
      _this.t=1;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000326;//user.Main:326
          case 1:
            //$LASTPOS=1000345;//user.Main:345
            _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
            //$LASTPOS=1000408;//user.Main:408
            if (_this.getkey("up")) {
              //$LASTPOS=1000436;//user.Main:436
              _this.v++;
              //$LASTPOS=1000440;//user.Main:440
              if (_this.v>128) {
                //$LASTPOS=1000450;//user.Main:450
                _this.v=128;
              }
              //$LASTPOS=1000465;//user.Main:465
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=1000497;//user.Main:497
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=1000526;//user.Main:526
            if (_this.getkey("down")) {
              //$LASTPOS=1000556;//user.Main:556
              _this.v--;
              //$LASTPOS=1000560;//user.Main:560
              if (_this.v<0) {
                //$LASTPOS=1000568;//user.Main:568
                _this.v=0;
              }
              //$LASTPOS=1000581;//user.Main:581
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=1000613;//user.Main:613
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=1000642;//user.Main:642
            if (_this.getkey("left")) {
              //$LASTPOS=1000672;//user.Main:672
              _this.t-=0.01;
              //$LASTPOS=1000707;//user.Main:707
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=1000738;//user.Main:738
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=1000769;//user.Main:769
            if (_this.getkey("right")) {
              //$LASTPOS=1000800;//user.Main:800
              _this.t+=0.01;
              //$LASTPOS=1000831;//user.Main:831
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=1000862;//user.Main:862
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=1000898;//user.Main:898
            if (_this.getkey("a")==1) {
              //$LASTPOS=1000928;//user.Main:928
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
              
            }
            //$LASTPOS=1000971;//user.Main:971
            if (_this.getkey("b")==1) {
              //$LASTPOS=1001001;//user.Main:1001
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
              
            }
            //$LASTPOS=1001046;//user.Main:1046
            if (_this.getkey("c")==1) {
              //$LASTPOS=1001076;//user.Main:1076
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
              
            }
            //$LASTPOS=1001117;//user.Main:1117
            if (_this.getkey("d")==1) {
              //$LASTPOS=1001147;//user.Main:1147
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
              
            }
            //$LASTPOS=1001183;//user.Main:1183
            if (_this.getkey("p")==1) {
              //$LASTPOS=1001213;//user.Main:1213
              Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
              
            }
            //$LASTPOS=1001265;//user.Main:1265
            if (_this.getkey("z")==1) {
              //$LASTPOS=1001295;//user.Main:1295
              Tonyu.globals.$sound.stopBGM();
              
            }
            //$LASTPOS=1001323;//user.Main:1323
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
