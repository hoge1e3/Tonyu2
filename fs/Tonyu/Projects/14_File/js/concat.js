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
      _this.saveDataFile=_this.file("save.json");
      //$LASTPOS=1000033;//user.Main:33
      if (_this.saveDataFile.exists()) {
        //$LASTPOS=1000068;//user.Main:68
        _this.saveData=_this.saveDataFile.obj();
        
      }
      //$LASTPOS=1000101;//user.Main:101
      if (! _this.saveData) {
        //$LASTPOS=1000116;//user.Main:116
        _this.saveData={count: 0};
      }
      //$LASTPOS=1000137;//user.Main:137
      _this.saveData.count++;
      //$LASTPOS=1000156;//user.Main:156
      _this.saveDataFile.obj(_this.saveData);
      //$LASTPOS=1000185;//user.Main:185
      _this.x=200;
      //$LASTPOS=1000191;//user.Main:191
      _this.y=20;
      //$LASTPOS=1000196;//user.Main:196
      _this.size=20;
      //$LASTPOS=1000206;//user.Main:206
      _this.text="count="+_this.saveData.count+" F9:inc SPACE:reset";
      //$LASTPOS=1000259;//user.Main:259
      while (true) {
        //$LASTPOS=1000279;//user.Main:279
        if (_this.getkey("space")==1) {
          //$LASTPOS=1000314;//user.Main:314
          _this.saveDataFile.rm();
          //$LASTPOS=1000342;//user.Main:342
          _this.text="Reset ! press F9";
          
        }
        //$LASTPOS=1000379;//user.Main:379
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000000;//user.Main:0
            _this.fiber$file(_thread, "save.json");
            __pc=1;return;
          case 1:
            _this.saveDataFile=_thread.retVal;
            
            //$LASTPOS=1000033;//user.Main:33
            if (_this.saveDataFile.exists()) {
              //$LASTPOS=1000068;//user.Main:68
              _this.saveData=_this.saveDataFile.obj();
              
            }
            //$LASTPOS=1000101;//user.Main:101
            if (! _this.saveData) {
              //$LASTPOS=1000116;//user.Main:116
              _this.saveData={count: 0};
            }
            //$LASTPOS=1000137;//user.Main:137
            _this.saveData.count++;
            //$LASTPOS=1000156;//user.Main:156
            _this.saveDataFile.obj(_this.saveData);
            //$LASTPOS=1000185;//user.Main:185
            _this.x=200;
            //$LASTPOS=1000191;//user.Main:191
            _this.y=20;
            //$LASTPOS=1000196;//user.Main:196
            _this.size=20;
            //$LASTPOS=1000206;//user.Main:206
            _this.text="count="+_this.saveData.count+" F9:inc SPACE:reset";
            //$LASTPOS=1000259;//user.Main:259
          case 2:
            //$LASTPOS=1000279;//user.Main:279
            if (_this.getkey("space")==1) {
              //$LASTPOS=1000314;//user.Main:314
              _this.saveDataFile.rm();
              //$LASTPOS=1000342;//user.Main:342
              _this.text="Reset ! press F9";
              
            }
            //$LASTPOS=1000379;//user.Main:379
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
