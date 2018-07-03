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
      
      //$LASTPOS=1000067;//user.Main:67
      _this.print("Move: cursor key");
      //$LASTPOS=1000095;//user.Main:95
      _this.print("Space: save position");
      //$LASTPOS=1000127;//user.Main:127
      _this.print("r: reset data");
      //$LASTPOS=1000154;//user.Main:154
      _this.saveDataFile=_this.file("save.json");
      //$LASTPOS=1000187;//user.Main:187
      if (_this.saveDataFile.exists()) {
        //$LASTPOS=1000222;//user.Main:222
        _this.saveData=_this.saveDataFile.obj();
        
      }
      //$LASTPOS=1000255;//user.Main:255
      if (! _this.saveData) {
        //$LASTPOS=1000270;//user.Main:270
        _this.saveData={x: 200,y: 200};
      }
      //$LASTPOS=1000295;//user.Main:295
      _this.x=_this.saveData.x;
      //$LASTPOS=1000308;//user.Main:308
      _this.y=_this.saveData.y;
      //$LASTPOS=1000323;//user.Main:323
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=1000343;//user.Main:343
        if (_this.getkey("space")==1) {
          //$LASTPOS=1000378;//user.Main:378
          _this.saveDataFile.obj({x: _this.x,y: _this.y});
          //$LASTPOS=1000410;//user.Main:410
          _this.print("Position saved to files/save.json");
          
        }
        //$LASTPOS=1000468;//user.Main:468
        if (_this.getkey("r")==1) {
          //$LASTPOS=1000499;//user.Main:499
          if (_this.saveDataFile.exists()) {
            //$LASTPOS=1000526;//user.Main:526
            _this.saveDataFile.rm();
          }
          //$LASTPOS=1000554;//user.Main:554
          _this.print("files/save.json removed");
          
        }
        //$LASTPOS=1000601;//user.Main:601
        if (_this.getkey("up")) {
          //$LASTPOS=1000619;//user.Main:619
          _this.y-=5;
        }
        //$LASTPOS=1000630;//user.Main:630
        if (_this.getkey("down")) {
          //$LASTPOS=1000650;//user.Main:650
          _this.y+=5;
        }
        //$LASTPOS=1000661;//user.Main:661
        if (_this.getkey("left")) {
          //$LASTPOS=1000681;//user.Main:681
          _this.x-=5;
        }
        //$LASTPOS=1000692;//user.Main:692
        if (_this.getkey("right")) {
          //$LASTPOS=1000713;//user.Main:713
          _this.x+=5;
        }
        //$LASTPOS=1000724;//user.Main:724
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000067;//user.Main:67
      _this.print("Move: cursor key");
      //$LASTPOS=1000095;//user.Main:95
      _this.print("Space: save position");
      //$LASTPOS=1000127;//user.Main:127
      _this.print("r: reset data");
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000154;//user.Main:154
            _this.fiber$file(_thread, "save.json");
            __pc=1;return;
          case 1:
            _this.saveDataFile=_thread.retVal;
            
            //$LASTPOS=1000187;//user.Main:187
            if (_this.saveDataFile.exists()) {
              //$LASTPOS=1000222;//user.Main:222
              _this.saveData=_this.saveDataFile.obj();
              
            }
            //$LASTPOS=1000255;//user.Main:255
            if (! _this.saveData) {
              //$LASTPOS=1000270;//user.Main:270
              _this.saveData={x: 200,y: 200};
            }
            //$LASTPOS=1000295;//user.Main:295
            _this.x=_this.saveData.x;
            //$LASTPOS=1000308;//user.Main:308
            _this.y=_this.saveData.y;
            //$LASTPOS=1000323;//user.Main:323
          case 2:
            //$LASTPOS=1000343;//user.Main:343
            if (_this.getkey("space")==1) {
              //$LASTPOS=1000378;//user.Main:378
              _this.saveDataFile.obj({x: _this.x,y: _this.y});
              //$LASTPOS=1000410;//user.Main:410
              _this.print("Position saved to files/save.json");
              
            }
            //$LASTPOS=1000468;//user.Main:468
            if (_this.getkey("r")==1) {
              //$LASTPOS=1000499;//user.Main:499
              if (_this.saveDataFile.exists()) {
                //$LASTPOS=1000526;//user.Main:526
                _this.saveDataFile.rm();
              }
              //$LASTPOS=1000554;//user.Main:554
              _this.print("files/save.json removed");
              
            }
            //$LASTPOS=1000601;//user.Main:601
            if (_this.getkey("up")) {
              //$LASTPOS=1000619;//user.Main:619
              _this.y-=5;
            }
            //$LASTPOS=1000630;//user.Main:630
            if (_this.getkey("down")) {
              //$LASTPOS=1000650;//user.Main:650
              _this.y+=5;
            }
            //$LASTPOS=1000661;//user.Main:661
            if (_this.getkey("left")) {
              //$LASTPOS=1000681;//user.Main:681
              _this.x-=5;
            }
            //$LASTPOS=1000692;//user.Main:692
            if (_this.getkey("right")) {
              //$LASTPOS=1000713;//user.Main:713
              _this.x+=5;
            }
            //$LASTPOS=1000724;//user.Main:724
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"saveDataFile":{},"saveData":{}}}
});

//# sourceMappingURL=concat.js.map