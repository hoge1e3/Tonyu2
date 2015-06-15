Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000028;//user.Main:28
      _this.x=0;
      //$LASTPOS=41000034;//user.Main:34
      _this.y=50;
      //$LASTPOS=41000041;//user.Main:41
      _this.text="Actorのtextも\n\\nで改行できます\nよ";
      //$LASTPOS=41000077;//user.Main:77
      Tonyu.globals.$panel.fillText("$panel.fillText()も\n\\nで改行できます\nはい",150,200,20,"center");
      //$LASTPOS=41000153;//user.Main:153
      _this.print("print()文も\n\\nで改行\nできます","それから,で区切っても","改行できません","yの初期値は下の値",_this.y);
      //$LASTPOS=41000226;//user.Main:226
      while (true) {
        //$LASTPOS=41000244;//user.Main:244
        _this.x+=1;
        //$LASTPOS=41000255;//user.Main:255
        _this.print(_this.width,_this.height);
        //$LASTPOS=41000281;//user.Main:281
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000028;//user.Main:28
      _this.x=0;
      //$LASTPOS=41000034;//user.Main:34
      _this.y=50;
      //$LASTPOS=41000041;//user.Main:41
      _this.text="Actorのtextも\n\\nで改行できます\nよ";
      //$LASTPOS=41000077;//user.Main:77
      Tonyu.globals.$panel.fillText("$panel.fillText()も\n\\nで改行できます\nはい",150,200,20,"center");
      //$LASTPOS=41000153;//user.Main:153
      _this.print("print()文も\n\\nで改行\nできます","それから,で区切っても","改行できません","yの初期値は下の値",_this.y);
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000226;//user.Main:226
          case 1:
            //$LASTPOS=41000244;//user.Main:244
            _this.x+=1;
            //$LASTPOS=41000255;//user.Main:255
            _this.print(_this.width,_this.height);
            //$LASTPOS=41000281;//user.Main:281
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
Tonyu.klass.define({
  fullName: 'user.Main2',
  shortName: 'Main2',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000000;//user.Main2:0
      if (! _this.x) {
        //$LASTPOS=42000014;//user.Main2:14
        _this.x=100;
        //$LASTPOS=42000025;//user.Main2:25
        _this.y=100;
        
      }
      //$LASTPOS=42000034;//user.Main2:34
      Tonyu.globals.$main=_this;
      //$LASTPOS=42000046;//user.Main2:46
      _this.print("start");
      //$LASTPOS=42000062;//user.Main2:62
      _this.on("screenOut",1,Tonyu.bindFunc(_this,_this.reportScreenOut));
      //$LASTPOS=42000223;//user.Main2:223
      while (true) {
        //$LASTPOS=42000240;//user.Main2:240
        while (_this.x<Tonyu.globals.$screenWidth+20) {
          //$LASTPOS=42000274;//user.Main2:274
          _this.x+=10;
          //$LASTPOS=42000289;//user.Main2:289
          _this.update();
          
        }
        //$LASTPOS=42000309;//user.Main2:309
        while (_this.x>- 20) {
          //$LASTPOS=42000331;//user.Main2:331
          _this.x-=10;
          //$LASTPOS=42000346;//user.Main2:346
          _this.update();
          
        }
        //$LASTPOS=42000366;//user.Main2:366
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000000;//user.Main2:0
      if (! _this.x) {
        //$LASTPOS=42000014;//user.Main2:14
        _this.x=100;
        //$LASTPOS=42000025;//user.Main2:25
        _this.y=100;
        
      }
      //$LASTPOS=42000034;//user.Main2:34
      Tonyu.globals.$main=_this;
      //$LASTPOS=42000046;//user.Main2:46
      _this.print("start");
      //$LASTPOS=42000062;//user.Main2:62
      _this.on("screenOut",1,Tonyu.bindFunc(_this,_this.reportScreenOut));
      
      _thread.enter(function _trc_Main2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000223;//user.Main2:223
          case 1:
            //$LASTPOS=42000240;//user.Main2:240
          case 2:
            if (!(_this.x<Tonyu.globals.$screenWidth+20)) { __pc=4; break; }
            //$LASTPOS=42000274;//user.Main2:274
            _this.x+=10;
            //$LASTPOS=42000289;//user.Main2:289
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=42000309;//user.Main2:309
          case 5:
            if (!(_this.x>- 20)) { __pc=7; break; }
            //$LASTPOS=42000331;//user.Main2:331
            _this.x-=10;
            //$LASTPOS=42000346;//user.Main2:346
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=42000366;//user.Main2:366
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=1;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    reportScreenOut :function _trc_Main2_reportScreenOut() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000121;//user.Main2:121
      _this.print("Screen Out !!",_this.id);
      //$LASTPOS=42000152;//user.Main2:152
      _this.die();
    },
    fiber$reportScreenOut :function _trc_Main2_f_reportScreenOut(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000121;//user.Main2:121
      _this.print("Screen Out !!",_this.id);
      //$LASTPOS=42000152;//user.Main2:152
      _this.die();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"reportScreenOut":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Main3',
  shortName: 'Main3',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main3_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=43000000;//user.Main3:0
      while (true) {
        //$LASTPOS=43000018;//user.Main3:18
        new Tonyu.classes.user.Main2({x: 120,y: _this.rnd(200),id: 3});
        //$LASTPOS=43000056;//user.Main3:56
        _this.updateEx(30);
        
      }
    },
    fiber$main :function _trc_Main3_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000000;//user.Main3:0
          case 1:
            //$LASTPOS=43000018;//user.Main3:18
            new Tonyu.classes.user.Main2({x: 120,y: _this.rnd(200),id: 3});
            //$LASTPOS=43000056;//user.Main3:56
            _this.fiber$updateEx(_thread, 30);
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
