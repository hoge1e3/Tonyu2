Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=44000000;//user.Main:0
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
      //$LASTPOS=44000034;//user.Main:34
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=44000083;//user.Main:83
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=44000130;//user.Main:130
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=44000180;//user.Main:180
      _this.print("A-D: Sound Effect");
      //$LASTPOS=44000208;//user.Main:208
      _this.print("↑  ↓: Volume");
      //$LASTPOS=44000231;//user.Main:231
      _this.print("<-  ->: Tempo");
      //$LASTPOS=44000255;//user.Main:255
      _this.print("Z: Stop BGM");
      //$LASTPOS=44000278;//user.Main:278
      _this.v=128;
      //$LASTPOS=44000284;//user.Main:284
      _this.t=1;
      //$LASTPOS=44000289;//user.Main:289
      while (true) {
        //$LASTPOS=44000308;//user.Main:308
        _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
        //$LASTPOS=44000371;//user.Main:371
        if (_this.getkey("up")) {
          //$LASTPOS=44000399;//user.Main:399
          _this.v++;
          //$LASTPOS=44000403;//user.Main:403
          if (_this.v>128) {
            //$LASTPOS=44000413;//user.Main:413
            _this.v=128;
          }
          //$LASTPOS=44000428;//user.Main:428
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=44000460;//user.Main:460
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=44000489;//user.Main:489
        if (_this.getkey("down")) {
          //$LASTPOS=44000519;//user.Main:519
          _this.v--;
          //$LASTPOS=44000523;//user.Main:523
          if (_this.v<0) {
            //$LASTPOS=44000531;//user.Main:531
            _this.v=0;
          }
          //$LASTPOS=44000544;//user.Main:544
          Tonyu.globals.$sound.setBGMVolume(_this.v);
          //$LASTPOS=44000576;//user.Main:576
          _this.vol.text="Vol="+_this.v;
          
        }
        //$LASTPOS=44000605;//user.Main:605
        if (_this.getkey("left")) {
          //$LASTPOS=44000635;//user.Main:635
          _this.t-=0.01;
          //$LASTPOS=44000670;//user.Main:670
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=44000701;//user.Main:701
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=44000732;//user.Main:732
        if (_this.getkey("right")) {
          //$LASTPOS=44000763;//user.Main:763
          _this.t+=0.01;
          //$LASTPOS=44000794;//user.Main:794
          Tonyu.globals.$sound.setBGMTempo(_this.t);
          //$LASTPOS=44000825;//user.Main:825
          _this.tmp.text="Tempo="+_this.t;
          
        }
        //$LASTPOS=44000861;//user.Main:861
        if (_this.getkey("a")==1) {
          //$LASTPOS=44000891;//user.Main:891
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
          
        }
        //$LASTPOS=44000934;//user.Main:934
        if (_this.getkey("b")==1) {
          //$LASTPOS=44000964;//user.Main:964
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
          
        }
        //$LASTPOS=44001009;//user.Main:1009
        if (_this.getkey("c")==1) {
          //$LASTPOS=44001039;//user.Main:1039
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
          
        }
        //$LASTPOS=44001080;//user.Main:1080
        if (_this.getkey("d")==1) {
          //$LASTPOS=44001110;//user.Main:1110
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
          
        }
        //$LASTPOS=44001146;//user.Main:1146
        if (_this.getkey("p")==1) {
          //$LASTPOS=44001176;//user.Main:1176
          Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
          
        }
        //$LASTPOS=44001228;//user.Main:1228
        if (_this.getkey("z")==1) {
          //$LASTPOS=44001258;//user.Main:1258
          Tonyu.globals.$sound.stopBGM();
          
        }
        //$LASTPOS=44001286;//user.Main:1286
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//user.Main:0
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
      //$LASTPOS=44000034;//user.Main:34
      _this.time=new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Time=",size: 20});
      //$LASTPOS=44000083;//user.Main:83
      _this.vol=new Tonyu.classes.kernel.Actor({x: 230,y: 80,text: "Vol=",size: 20});
      //$LASTPOS=44000130;//user.Main:130
      _this.tmp=new Tonyu.classes.kernel.Actor({x: 230,y: 110,text: "Tempo=",size: 20});
      //$LASTPOS=44000180;//user.Main:180
      _this.print("A-D: Sound Effect");
      //$LASTPOS=44000208;//user.Main:208
      _this.print("↑  ↓: Volume");
      //$LASTPOS=44000231;//user.Main:231
      _this.print("<-  ->: Tempo");
      //$LASTPOS=44000255;//user.Main:255
      _this.print("Z: Stop BGM");
      //$LASTPOS=44000278;//user.Main:278
      _this.v=128;
      //$LASTPOS=44000284;//user.Main:284
      _this.t=1;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000289;//user.Main:289
          case 1:
            //$LASTPOS=44000308;//user.Main:308
            _this.time.text="Time="+_this.floor(Tonyu.globals.$sound.getBGMCurrentTime())+"sec";
            //$LASTPOS=44000371;//user.Main:371
            if (_this.getkey("up")) {
              //$LASTPOS=44000399;//user.Main:399
              _this.v++;
              //$LASTPOS=44000403;//user.Main:403
              if (_this.v>128) {
                //$LASTPOS=44000413;//user.Main:413
                _this.v=128;
              }
              //$LASTPOS=44000428;//user.Main:428
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=44000460;//user.Main:460
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=44000489;//user.Main:489
            if (_this.getkey("down")) {
              //$LASTPOS=44000519;//user.Main:519
              _this.v--;
              //$LASTPOS=44000523;//user.Main:523
              if (_this.v<0) {
                //$LASTPOS=44000531;//user.Main:531
                _this.v=0;
              }
              //$LASTPOS=44000544;//user.Main:544
              Tonyu.globals.$sound.setBGMVolume(_this.v);
              //$LASTPOS=44000576;//user.Main:576
              _this.vol.text="Vol="+_this.v;
              
            }
            //$LASTPOS=44000605;//user.Main:605
            if (_this.getkey("left")) {
              //$LASTPOS=44000635;//user.Main:635
              _this.t-=0.01;
              //$LASTPOS=44000670;//user.Main:670
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=44000701;//user.Main:701
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=44000732;//user.Main:732
            if (_this.getkey("right")) {
              //$LASTPOS=44000763;//user.Main:763
              _this.t+=0.01;
              //$LASTPOS=44000794;//user.Main:794
              Tonyu.globals.$sound.setBGMTempo(_this.t);
              //$LASTPOS=44000825;//user.Main:825
              _this.tmp.text="Tempo="+_this.t;
              
            }
            //$LASTPOS=44000861;//user.Main:861
            if (_this.getkey("a")==1) {
              //$LASTPOS=44000891;//user.Main:891
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_fpon1);
              
            }
            //$LASTPOS=44000934;//user.Main:934
            if (_this.getkey("b")==1) {
              //$LASTPOS=44000964;//user.Main:964
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_putprop);
              
            }
            //$LASTPOS=44001009;//user.Main:1009
            if (_this.getkey("c")==1) {
              //$LASTPOS=44001039;//user.Main:1039
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ret);
              
            }
            //$LASTPOS=44001080;//user.Main:1080
            if (_this.getkey("d")==1) {
              //$LASTPOS=44001110;//user.Main:1110
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_ftaki);
              
            }
            //$LASTPOS=44001146;//user.Main:1146
            if (_this.getkey("p")==1) {
              //$LASTPOS=44001176;//user.Main:1176
              Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_fuwa1,true);
              
            }
            //$LASTPOS=44001228;//user.Main:1228
            if (_this.getkey("z")==1) {
              //$LASTPOS=44001258;//user.Main:1258
              Tonyu.globals.$sound.stopBGM();
              
            }
            //$LASTPOS=44001286;//user.Main:1286
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
