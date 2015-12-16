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
      _this.print("Move: cursor key");
      //$LASTPOS=1000028;//user.Main:28
      _this.print("Space: save position");
      //$LASTPOS=1000060;//user.Main:60
      _this.print("r: reset data");
      //$LASTPOS=1000087;//user.Main:87
      _this.saveDataFile=_this.file("save.json");
      //$LASTPOS=1000120;//user.Main:120
      if (_this.saveDataFile.exists()) {
        //$LASTPOS=1000155;//user.Main:155
        _this.saveData=_this.saveDataFile.obj();
        
      }
      //$LASTPOS=1000188;//user.Main:188
      if (! _this.saveData) {
        //$LASTPOS=1000203;//user.Main:203
        _this.saveData={x: 200,y: 200};
      }
      //$LASTPOS=1000228;//user.Main:228
      _this.x=_this.saveData.x;
      //$LASTPOS=1000241;//user.Main:241
      _this.y=_this.saveData.y;
      //$LASTPOS=1000256;//user.Main:256
      while (true) {
        //$LASTPOS=1000276;//user.Main:276
        if (_this.getkey("space")==1) {
          //$LASTPOS=1000311;//user.Main:311
          _this.saveDataFile.obj({x: _this.x,y: _this.y});
          //$LASTPOS=1000343;//user.Main:343
          _this.print("Position saved to files/save.json");
          
        }
        //$LASTPOS=1000401;//user.Main:401
        if (_this.getkey("r")==1) {
          //$LASTPOS=1000432;//user.Main:432
          if (_this.saveDataFile.exists()) {
            //$LASTPOS=1000459;//user.Main:459
            _this.saveDataFile.rm();
          }
          //$LASTPOS=1000487;//user.Main:487
          _this.print("files/save.json removed");
          
        }
        //$LASTPOS=1000534;//user.Main:534
        if (_this.getkey("up")) {
          //$LASTPOS=1000552;//user.Main:552
          _this.y-=5;
        }
        //$LASTPOS=1000563;//user.Main:563
        if (_this.getkey("down")) {
          //$LASTPOS=1000583;//user.Main:583
          _this.y+=5;
        }
        //$LASTPOS=1000594;//user.Main:594
        if (_this.getkey("left")) {
          //$LASTPOS=1000614;//user.Main:614
          _this.x-=5;
        }
        //$LASTPOS=1000625;//user.Main:625
        if (_this.getkey("right")) {
          //$LASTPOS=1000646;//user.Main:646
          _this.x+=5;
        }
        //$LASTPOS=1000657;//user.Main:657
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      _this.print("Move: cursor key");
      //$LASTPOS=1000028;//user.Main:28
      _this.print("Space: save position");
      //$LASTPOS=1000060;//user.Main:60
      _this.print("r: reset data");
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000087;//user.Main:87
            _this.fiber$file(_thread, "save.json");
            __pc=1;return;
          case 1:
            _this.saveDataFile=_thread.retVal;
            
            //$LASTPOS=1000120;//user.Main:120
            if (_this.saveDataFile.exists()) {
              //$LASTPOS=1000155;//user.Main:155
              _this.saveData=_this.saveDataFile.obj();
              
            }
            //$LASTPOS=1000188;//user.Main:188
            if (! _this.saveData) {
              //$LASTPOS=1000203;//user.Main:203
              _this.saveData={x: 200,y: 200};
            }
            //$LASTPOS=1000228;//user.Main:228
            _this.x=_this.saveData.x;
            //$LASTPOS=1000241;//user.Main:241
            _this.y=_this.saveData.y;
            //$LASTPOS=1000256;//user.Main:256
          case 2:
            //$LASTPOS=1000276;//user.Main:276
            if (_this.getkey("space")==1) {
              //$LASTPOS=1000311;//user.Main:311
              _this.saveDataFile.obj({x: _this.x,y: _this.y});
              //$LASTPOS=1000343;//user.Main:343
              _this.print("Position saved to files/save.json");
              
            }
            //$LASTPOS=1000401;//user.Main:401
            if (_this.getkey("r")==1) {
              //$LASTPOS=1000432;//user.Main:432
              if (_this.saveDataFile.exists()) {
                //$LASTPOS=1000459;//user.Main:459
                _this.saveDataFile.rm();
              }
              //$LASTPOS=1000487;//user.Main:487
              _this.print("files/save.json removed");
              
            }
            //$LASTPOS=1000534;//user.Main:534
            if (_this.getkey("up")) {
              //$LASTPOS=1000552;//user.Main:552
              _this.y-=5;
            }
            //$LASTPOS=1000563;//user.Main:563
            if (_this.getkey("down")) {
              //$LASTPOS=1000583;//user.Main:583
              _this.y+=5;
            }
            //$LASTPOS=1000594;//user.Main:594
            if (_this.getkey("left")) {
              //$LASTPOS=1000614;//user.Main:614
              _this.x-=5;
            }
            //$LASTPOS=1000625;//user.Main:625
            if (_this.getkey("right")) {
              //$LASTPOS=1000646;//user.Main:646
              _this.x+=5;
            }
            //$LASTPOS=1000657;//user.Main:657
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
