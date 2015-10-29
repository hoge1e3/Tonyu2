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
      //$LASTPOS=1000032;//user.Main:32
      if (_this.saveDataFile.exists()) {
        //$LASTPOS=1000066;//user.Main:66
        _this.saveData=_this.saveDataFile.obj();
        
      }
      //$LASTPOS=1000097;//user.Main:97
      if (! _this.saveData) {
        //$LASTPOS=1000112;//user.Main:112
        _this.saveData={count: 0};
      }
      //$LASTPOS=1000132;//user.Main:132
      _this.saveData.count++;
      //$LASTPOS=1000150;//user.Main:150
      _this.saveDataFile.obj(_this.saveData);
      //$LASTPOS=1000178;//user.Main:178
      _this.x=200;
      //$LASTPOS=1000184;//user.Main:184
      _this.y=20;
      //$LASTPOS=1000189;//user.Main:189
      _this.size=20;
      //$LASTPOS=1000198;//user.Main:198
      _this.text="count="+_this.saveData.count+" F9:inc SPACE:reset";
      //$LASTPOS=1000250;//user.Main:250
      while (true) {
        //$LASTPOS=1000269;//user.Main:269
        if (_this.getkey("space")==1) {
          //$LASTPOS=1000303;//user.Main:303
          _this.saveDataFile.rm();
          //$LASTPOS=1000330;//user.Main:330
          _this.text="Reset ! press F9";
          
        }
        //$LASTPOS=1000365;//user.Main:365
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
            
            //$LASTPOS=1000032;//user.Main:32
            if (_this.saveDataFile.exists()) {
              //$LASTPOS=1000066;//user.Main:66
              _this.saveData=_this.saveDataFile.obj();
              
            }
            //$LASTPOS=1000097;//user.Main:97
            if (! _this.saveData) {
              //$LASTPOS=1000112;//user.Main:112
              _this.saveData={count: 0};
            }
            //$LASTPOS=1000132;//user.Main:132
            _this.saveData.count++;
            //$LASTPOS=1000150;//user.Main:150
            _this.saveDataFile.obj(_this.saveData);
            //$LASTPOS=1000178;//user.Main:178
            _this.x=200;
            //$LASTPOS=1000184;//user.Main:184
            _this.y=20;
            //$LASTPOS=1000189;//user.Main:189
            _this.size=20;
            //$LASTPOS=1000198;//user.Main:198
            _this.text="count="+_this.saveData.count+" F9:inc SPACE:reset";
            //$LASTPOS=1000250;//user.Main:250
          case 2:
            //$LASTPOS=1000269;//user.Main:269
            if (_this.getkey("space")==1) {
              //$LASTPOS=1000303;//user.Main:303
              _this.saveDataFile.rm();
              //$LASTPOS=1000330;//user.Main:330
              _this.text="Reset ! press F9";
              
            }
            //$LASTPOS=1000365;//user.Main:365
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
