Tonyu.klass.define({
  fullName: 'user.Cat',
  shortName: 'Cat',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Cat_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000000;//user.Cat:0
      _this.p=Tonyu.globals.$pat_neko+0;
      //$LASTPOS=1000015;//user.Cat:15
      _this.x=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=1000033;//user.Cat:33
      _this.y=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=1000052;//user.Cat:52
      _this.on("crashTo",Tonyu.classes.user.Fish,Tonyu.bindFunc(_this,_this.crashFunc));
      //$LASTPOS=1000083;//user.Cat:83
      while (true) {
        //$LASTPOS=1000100;//user.Cat:100
        if (_this.getkey("Right")) {
          //$LASTPOS=1000131;//user.Cat:131
          _this.x+=5;
          
        }
        //$LASTPOS=1000147;//user.Cat:147
        if (_this.getkey("Left")) {
          //$LASTPOS=1000177;//user.Cat:177
          _this.x-=5;
          
        }
        //$LASTPOS=1000193;//user.Cat:193
        if (_this.getkey("Down")) {
          //$LASTPOS=1000223;//user.Cat:223
          _this.y+=5;
          
        }
        //$LASTPOS=1000239;//user.Cat:239
        if (_this.getkey("Up")) {
          //$LASTPOS=1000267;//user.Cat:267
          _this.y-=5;
          
        }
        //$LASTPOS=1000283;//user.Cat:283
        _this.update();
        
      }
    },
    fiber$main :function _trc_Cat_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Cat:0
      _this.p=Tonyu.globals.$pat_neko+0;
      //$LASTPOS=1000015;//user.Cat:15
      _this.x=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=1000033;//user.Cat:33
      _this.y=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=1000052;//user.Cat:52
      _this.on("crashTo",Tonyu.classes.user.Fish,Tonyu.bindFunc(_this,_this.crashFunc));
      
      _thread.enter(function _trc_Cat_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000083;//user.Cat:83
          case 1:
            //$LASTPOS=1000100;//user.Cat:100
            if (_this.getkey("Right")) {
              //$LASTPOS=1000131;//user.Cat:131
              _this.x+=5;
              
            }
            //$LASTPOS=1000147;//user.Cat:147
            if (_this.getkey("Left")) {
              //$LASTPOS=1000177;//user.Cat:177
              _this.x-=5;
              
            }
            //$LASTPOS=1000193;//user.Cat:193
            if (_this.getkey("Down")) {
              //$LASTPOS=1000223;//user.Cat:223
              _this.y+=5;
              
            }
            //$LASTPOS=1000239;//user.Cat:239
            if (_this.getkey("Up")) {
              //$LASTPOS=1000267;//user.Cat:267
              _this.y-=5;
              
            }
            //$LASTPOS=1000283;//user.Cat:283
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
    crashFunc :function _trc_Cat_crashFunc(f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000314;//user.Cat:314
      f.goRight();
    },
    fiber$crashFunc :function _trc_Cat_f_crashFunc(_thread,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000314;//user.Cat:314
      f.goRight();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"crashFunc":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Fish',
  shortName: 'Fish',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Fish_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000000;//user.Fish:0
      _this.p=Tonyu.globals.$pat_neko+40;
      //$LASTPOS=2000016;//user.Fish:16
      _this.x=Tonyu.globals.$screenWidth;
      //$LASTPOS=2000032;//user.Fish:32
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      //$LASTPOS=2000054;//user.Fish:54
      _this.scaleX=- 1;
      //$LASTPOS=2000065;//user.Fish:65
      _this.scaleY=1;
      //$LASTPOS=2000075;//user.Fish:75
      _this.on("screenOut",10,Tonyu.bindFunc(_this,_this.goRight));
      //$LASTPOS=2000103;//user.Fish:103
      while (true) {
        //$LASTPOS=2000120;//user.Fish:120
        _this.x-=5;
        //$LASTPOS=2000130;//user.Fish:130
        _this.print(_this.getCrashRect().width);
        //$LASTPOS=2000163;//user.Fish:163
        _this.update();
        
      }
    },
    fiber$main :function _trc_Fish_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Fish:0
      _this.p=Tonyu.globals.$pat_neko+40;
      //$LASTPOS=2000016;//user.Fish:16
      _this.x=Tonyu.globals.$screenWidth;
      //$LASTPOS=2000032;//user.Fish:32
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      //$LASTPOS=2000054;//user.Fish:54
      _this.scaleX=- 1;
      //$LASTPOS=2000065;//user.Fish:65
      _this.scaleY=1;
      //$LASTPOS=2000075;//user.Fish:75
      _this.on("screenOut",10,Tonyu.bindFunc(_this,_this.goRight));
      
      _thread.enter(function _trc_Fish_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000103;//user.Fish:103
          case 1:
            //$LASTPOS=2000120;//user.Fish:120
            _this.x-=5;
            //$LASTPOS=2000130;//user.Fish:130
            _this.print(_this.getCrashRect().width);
            //$LASTPOS=2000163;//user.Fish:163
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
    goRight :function _trc_Fish_goRight() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000192;//user.Fish:192
      _this.x=Tonyu.globals.$screenWidth;
      //$LASTPOS=2000212;//user.Fish:212
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
    },
    fiber$goRight :function _trc_Fish_f_goRight(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000192;//user.Fish:192
      _this.x=Tonyu.globals.$screenWidth;
      //$LASTPOS=2000212;//user.Fish:212
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"goRight":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000028;//user.Main:28
      _this.x=0;
      //$LASTPOS=3000034;//user.Main:34
      _this.y=50;
      //$LASTPOS=3000041;//user.Main:41
      _this.text="Actorのtextも\n\\nで改行できます\nよ";
      //$LASTPOS=3000077;//user.Main:77
      Tonyu.globals.$panel.fillText("$panel.fillText()も\n\\nで改行できます\nはい",150,200,20,"center");
      //$LASTPOS=3000153;//user.Main:153
      _this.print("print()文も\n\\nで改行\nできます","それから,で区切っても","改行できません","yの初期値は下の値",_this.y);
      //$LASTPOS=3000226;//user.Main:226
      while (true) {
        //$LASTPOS=3000244;//user.Main:244
        _this.x+=1;
        //$LASTPOS=3000283;//user.Main:283
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000028;//user.Main:28
      _this.x=0;
      //$LASTPOS=3000034;//user.Main:34
      _this.y=50;
      //$LASTPOS=3000041;//user.Main:41
      _this.text="Actorのtextも\n\\nで改行できます\nよ";
      //$LASTPOS=3000077;//user.Main:77
      Tonyu.globals.$panel.fillText("$panel.fillText()も\n\\nで改行できます\nはい",150,200,20,"center");
      //$LASTPOS=3000153;//user.Main:153
      _this.print("print()文も\n\\nで改行\nできます","それから,で区切っても","改行できません","yの初期値は下の値",_this.y);
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000226;//user.Main:226
          case 1:
            //$LASTPOS=3000244;//user.Main:244
            _this.x+=1;
            //$LASTPOS=3000283;//user.Main:283
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
      
      //$LASTPOS=4000000;//user.Main2:0
      if (! _this.x) {
        //$LASTPOS=4000014;//user.Main2:14
        _this.x=100;
        //$LASTPOS=4000025;//user.Main2:25
        _this.y=100;
        
      }
      //$LASTPOS=4000034;//user.Main2:34
      Tonyu.globals.$main=_this;
      //$LASTPOS=4000046;//user.Main2:46
      _this.print("start");
      //$LASTPOS=4000062;//user.Main2:62
      _this.on("screenOut",1,Tonyu.bindFunc(_this,_this.reportScreenOut));
      //$LASTPOS=4000225;//user.Main2:225
      while (true) {
        //$LASTPOS=4000242;//user.Main2:242
        while (_this.x<Tonyu.globals.$screenWidth+20) {
          //$LASTPOS=4000276;//user.Main2:276
          _this.x+=10;
          //$LASTPOS=4000291;//user.Main2:291
          _this.update();
          
        }
        //$LASTPOS=4000311;//user.Main2:311
        while (_this.x>- 20) {
          //$LASTPOS=4000333;//user.Main2:333
          _this.x-=10;
          //$LASTPOS=4000348;//user.Main2:348
          _this.update();
          
        }
        //$LASTPOS=4000368;//user.Main2:368
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000000;//user.Main2:0
      if (! _this.x) {
        //$LASTPOS=4000014;//user.Main2:14
        _this.x=100;
        //$LASTPOS=4000025;//user.Main2:25
        _this.y=100;
        
      }
      //$LASTPOS=4000034;//user.Main2:34
      Tonyu.globals.$main=_this;
      //$LASTPOS=4000046;//user.Main2:46
      _this.print("start");
      //$LASTPOS=4000062;//user.Main2:62
      _this.on("screenOut",1,Tonyu.bindFunc(_this,_this.reportScreenOut));
      
      _thread.enter(function _trc_Main2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000225;//user.Main2:225
          case 1:
            //$LASTPOS=4000242;//user.Main2:242
          case 2:
            if (!(_this.x<Tonyu.globals.$screenWidth+20)) { __pc=4; break; }
            //$LASTPOS=4000276;//user.Main2:276
            _this.x+=10;
            //$LASTPOS=4000291;//user.Main2:291
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=4000311;//user.Main2:311
          case 5:
            if (!(_this.x>- 20)) { __pc=7; break; }
            //$LASTPOS=4000333;//user.Main2:333
            _this.x-=10;
            //$LASTPOS=4000348;//user.Main2:348
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=4000368;//user.Main2:368
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
      
      //$LASTPOS=4000121;//user.Main2:121
      _this.print("Screen Out !!",_this.id);
    },
    fiber$reportScreenOut :function _trc_Main2_f_reportScreenOut(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000121;//user.Main2:121
      _this.print("Screen Out !!",_this.id);
      
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
      
      //$LASTPOS=5000000;//user.Main3:0
      new Tonyu.classes.user.Main2({x: 300,y: 200,id: 1});
      //$LASTPOS=5000029;//user.Main3:29
      new Tonyu.classes.user.Main2({x: 200,y: 100,id: 2});
      //$LASTPOS=5000058;//user.Main3:58
      _this.p=5;
      //$LASTPOS=5000063;//user.Main3:63
      _this.x=200;
      //$LASTPOS=5000069;//user.Main3:69
      _this.y=200;
      //$LASTPOS=5000076;//user.Main3:76
      new Tonyu.classes.kernel.Actor({text: "Start地点",x: _this.x,y: _this.y});
      //$LASTPOS=5000108;//user.Main3:108
      while (true) {
        //$LASTPOS=5000166;//user.Main3:166
        if (_this.getkey("Right")) {
          //$LASTPOS=5000197;//user.Main3:197
          _this.x+=5;
          
        }
        //$LASTPOS=5000213;//user.Main3:213
        if (_this.getkey("Left")) {
          //$LASTPOS=5000243;//user.Main3:243
          _this.x-=5;
          
        }
        //$LASTPOS=5000259;//user.Main3:259
        if (_this.getkey("Down")) {
          //$LASTPOS=5000289;//user.Main3:289
          _this.y+=5;
          
        }
        //$LASTPOS=5000305;//user.Main3:305
        if (_this.getkey("Up")) {
          //$LASTPOS=5000333;//user.Main3:333
          _this.y-=5;
          
        }
        //$LASTPOS=5000349;//user.Main3:349
        Tonyu.globals.$Screen.scrollTo(_this.x-200,_this.y-200);
        //$LASTPOS=5000384;//user.Main3:384
        _this.updateEx(1);
        
      }
    },
    fiber$main :function _trc_Main3_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000000;//user.Main3:0
      new Tonyu.classes.user.Main2({x: 300,y: 200,id: 1});
      //$LASTPOS=5000029;//user.Main3:29
      new Tonyu.classes.user.Main2({x: 200,y: 100,id: 2});
      //$LASTPOS=5000058;//user.Main3:58
      _this.p=5;
      //$LASTPOS=5000063;//user.Main3:63
      _this.x=200;
      //$LASTPOS=5000069;//user.Main3:69
      _this.y=200;
      //$LASTPOS=5000076;//user.Main3:76
      new Tonyu.classes.kernel.Actor({text: "Start地点",x: _this.x,y: _this.y});
      
      _thread.enter(function _trc_Main3_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000108;//user.Main3:108
          case 1:
            //$LASTPOS=5000166;//user.Main3:166
            if (_this.getkey("Right")) {
              //$LASTPOS=5000197;//user.Main3:197
              _this.x+=5;
              
            }
            //$LASTPOS=5000213;//user.Main3:213
            if (_this.getkey("Left")) {
              //$LASTPOS=5000243;//user.Main3:243
              _this.x-=5;
              
            }
            //$LASTPOS=5000259;//user.Main3:259
            if (_this.getkey("Down")) {
              //$LASTPOS=5000289;//user.Main3:289
              _this.y+=5;
              
            }
            //$LASTPOS=5000305;//user.Main3:305
            if (_this.getkey("Up")) {
              //$LASTPOS=5000333;//user.Main3:333
              _this.y-=5;
              
            }
            //$LASTPOS=5000349;//user.Main3:349
            Tonyu.globals.$Screen.scrollTo(_this.x-200,_this.y-200);
            //$LASTPOS=5000384;//user.Main3:384
            _this.fiber$updateEx(_thread, 1);
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
  fullName: 'user.Main4',
  shortName: 'Main4',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main4_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000000;//user.Main4:0
      new Tonyu.classes.user.Cat;
      //$LASTPOS=6000009;//user.Main4:9
      new Tonyu.classes.user.Fish;
    },
    fiber$main :function _trc_Main4_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000000;//user.Main4:0
      new Tonyu.classes.user.Cat;
      //$LASTPOS=6000009;//user.Main4:9
      new Tonyu.classes.user.Fish;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
