Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000028;//user.Main:28
      _this.x=0;
      //$LASTPOS=1000034;//user.Main:34
      _this.y=50;
      //$LASTPOS=1000041;//user.Main:41
      _this.text="Actorのtextも\n\\nで改行できます\nよ";
      //$LASTPOS=1000077;//user.Main:77
      Tonyu.globals.$panel.fillText("$panel.fillText()も\n\\nで改行できます\nはい",150,200,20,"center");
      //$LASTPOS=1000153;//user.Main:153
      _this.print("print()文も\n\\nで改行\nできます","それから,で区切っても","改行できません","yの初期値は下の値",_this.y);
      //$LASTPOS=1000226;//user.Main:226
      while (true) {
        //$LASTPOS=1000244;//user.Main:244
        _this.x+=1;
        //$LASTPOS=1000255;//user.Main:255
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000028;//user.Main:28
      _this.x=0;
      //$LASTPOS=1000034;//user.Main:34
      _this.y=50;
      //$LASTPOS=1000041;//user.Main:41
      _this.text="Actorのtextも\n\\nで改行できます\nよ";
      //$LASTPOS=1000077;//user.Main:77
      Tonyu.globals.$panel.fillText("$panel.fillText()も\n\\nで改行できます\nはい",150,200,20,"center");
      //$LASTPOS=1000153;//user.Main:153
      _this.print("print()文も\n\\nで改行\nできます","それから,で区切っても","改行できません","yの初期値は下の値",_this.y);
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000226;//user.Main:226
          case 1:
            //$LASTPOS=1000244;//user.Main:244
            _this.x+=1;
            //$LASTPOS=1000255;//user.Main:255
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
      
      //$LASTPOS=2000000;//user.Main2:0
      _this.x=100;
      //$LASTPOS=2000007;//user.Main2:7
      _this.y=100;
      //$LASTPOS=2000014;//user.Main2:14
      _this.id=3;
      //$LASTPOS=2000020;//user.Main2:20
      Tonyu.globals.$main=_this;
      //$LASTPOS=2000032;//user.Main2:32
      _this.print("start");
      //$LASTPOS=2000048;//user.Main2:48
      _this.on("screenOut",1,Tonyu.bindFunc(_this,_this.reportScreenOut));
      //$LASTPOS=2000134;//user.Main2:134
      while (true) {
        //$LASTPOS=2000151;//user.Main2:151
        while (_this.x<Tonyu.globals.$screenWidth+20) {
          //$LASTPOS=2000185;//user.Main2:185
          _this.x+=10;
          //$LASTPOS=2000200;//user.Main2:200
          _this.update();
          
        }
        //$LASTPOS=2000220;//user.Main2:220
        while (_this.x>- 20) {
          //$LASTPOS=2000242;//user.Main2:242
          _this.x-=10;
          //$LASTPOS=2000257;//user.Main2:257
          _this.update();
          
        }
        //$LASTPOS=2000277;//user.Main2:277
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Main2:0
      _this.x=100;
      //$LASTPOS=2000007;//user.Main2:7
      _this.y=100;
      //$LASTPOS=2000014;//user.Main2:14
      _this.id=3;
      //$LASTPOS=2000020;//user.Main2:20
      Tonyu.globals.$main=_this;
      //$LASTPOS=2000032;//user.Main2:32
      _this.print("start");
      //$LASTPOS=2000048;//user.Main2:48
      _this.on("screenOut",1,Tonyu.bindFunc(_this,_this.reportScreenOut));
      
      _thread.enter(function _trc_Main2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000134;//user.Main2:134
          case 1:
            //$LASTPOS=2000151;//user.Main2:151
          case 2:
            if (!(_this.x<Tonyu.globals.$screenWidth+20)) { __pc=4; break; }
            //$LASTPOS=2000185;//user.Main2:185
            _this.x+=10;
            //$LASTPOS=2000200;//user.Main2:200
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=2000220;//user.Main2:220
          case 5:
            if (!(_this.x>- 20)) { __pc=7; break; }
            //$LASTPOS=2000242;//user.Main2:242
            _this.x-=10;
            //$LASTPOS=2000257;//user.Main2:257
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=2000277;//user.Main2:277
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
      
      //$LASTPOS=2000107;//user.Main2:107
      _this.print("Screen Out !!");
    },
    fiber$reportScreenOut :function _trc_Main2_f_reportScreenOut(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000107;//user.Main2:107
      _this.print("Screen Out !!");
      
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
      
      //$LASTPOS=3000000;//user.Main3:0
      new Tonyu.classes.user.Main2({id: 3});
    },
    fiber$main :function _trc_Main3_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Main3:0
      new Tonyu.classes.user.Main2({id: 3});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
