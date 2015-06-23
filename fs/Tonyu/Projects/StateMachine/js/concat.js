Tonyu.klass.define({
  fullName: 'user.Enemy',
  shortName: 'Enemy',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Enemy_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Enemy_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
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
      var i;
      
      //$LASTPOS=1000000;//user.Main:0
      //$LASTPOS=1000004;//user.Main:4
      i = 0;
      while(i<10) {
        {
          //$LASTPOS=1000027;//user.Main:27
          new Tonyu.classes.kernel.BodyActor({x: i*32,y: Tonyu.globals.$screenHeight-16,p: Tonyu.globals.$pat_chara+1,isStatic: true,shape: "box"});
        }
        i++;
      }
      //$LASTPOS=1000112;//user.Main:112
      //$LASTPOS=1000116;//user.Main:116
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=1000138;//user.Main:138
          new Tonyu.classes.kernel.BodyActor({x: i*32+250,y: Tonyu.globals.$screenHeight-100,p: Tonyu.globals.$pat_chara+1,isStatic: true,shape: "box"});
        }
        i++;
      }
      //$LASTPOS=1000228;//user.Main:228
      new Tonyu.classes.user.Player({x: 50,y: 300,vx: 0,vy: 1,p: 1,manualRotation: true,shape: "circle"});
      //$LASTPOS=1000301;//user.Main:301
      new Tonyu.classes.user.Enemy({x: 150,y: Tonyu.globals.$screenHeight-48,p: Tonyu.globals.$pat_neko+46});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=1000000;//user.Main:0
      //$LASTPOS=1000004;//user.Main:4
      i = 0;
      while(i<10) {
        {
          //$LASTPOS=1000027;//user.Main:27
          new Tonyu.classes.kernel.BodyActor({x: i*32,y: Tonyu.globals.$screenHeight-16,p: Tonyu.globals.$pat_chara+1,isStatic: true,shape: "box"});
        }
        i++;
      }
      //$LASTPOS=1000112;//user.Main:112
      //$LASTPOS=1000116;//user.Main:116
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=1000138;//user.Main:138
          new Tonyu.classes.kernel.BodyActor({x: i*32+250,y: Tonyu.globals.$screenHeight-100,p: Tonyu.globals.$pat_chara+1,isStatic: true,shape: "box"});
        }
        i++;
      }
      //$LASTPOS=1000228;//user.Main:228
      new Tonyu.classes.user.Player({x: 50,y: 300,vx: 0,vy: 1,p: 1,manualRotation: true,shape: "circle"});
      //$LASTPOS=1000301;//user.Main:301
      new Tonyu.classes.user.Enemy({x: 150,y: Tonyu.globals.$screenHeight-48,p: Tonyu.globals.$pat_neko+46});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000019;//user.Player:19
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=2000091;//user.Player:91
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=2000161;//user.Player:161
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=2000278;//user.Player:278
      _this.ind=0;
      //$LASTPOS=2000285;//user.Player:285
      _this.state="stand";
      //$LASTPOS=2000300;//user.Player:300
      _this.parallel(Tonyu.bindFunc(_this,_this.anim));
      //$LASTPOS=2000357;//user.Player:357
      _this.scaleX=1;
      //$LASTPOS=2000367;//user.Player:367
      _this.scaleY=1;
      //$LASTPOS=2000377;//user.Player:377
      while (true) {
        //$LASTPOS=2000420;//user.Player:420
        if (_this.getkey("left")) {
          //$LASTPOS=2000448;//user.Player:448
          _this.scaleX=1;
          //$LASTPOS=2000466;//user.Player:466
          _this.vx=- 1;
          //$LASTPOS=2000481;//user.Player:481
          if (_this.state!="jump") {
            //$LASTPOS=2000498;//user.Player:498
            _this.state="walk";
          }
          
        } else {
          //$LASTPOS=2000522;//user.Player:522
          if (_this.getkey("right")) {
            //$LASTPOS=2000551;//user.Player:551
            _this.scaleX=- 1;
            //$LASTPOS=2000570;//user.Player:570
            _this.vx=1;
            //$LASTPOS=2000584;//user.Player:584
            if (_this.state!="jump") {
              //$LASTPOS=2000601;//user.Player:601
              _this.state="walk";
            }
            
          } else {
            //$LASTPOS=2000625;//user.Player:625
            if (_this.state!="jump") {
              //$LASTPOS=2000652;//user.Player:652
              _this.vx=0;
              //$LASTPOS=2000666;//user.Player:666
              _this.state="stand";
              
            }
          }
        }
        //$LASTPOS=2000691;//user.Player:691
        if (_this.getkey("up")==1&&_this.state!="jump") {
          //$LASTPOS=2000735;//user.Player:735
          _this.state="jump";
          //$LASTPOS=2000757;//user.Player:757
          _this.ind=0;
          //$LASTPOS=2000772;//user.Player:772
          _this.applyImpulse(0,- 9);
          //$LASTPOS=2000800;//user.Player:800
          _this.parallel(Tonyu.bindFunc(_this,_this.jump));
          
        }
        //$LASTPOS=2000826;//user.Player:826
        if (_this.e=_this.crashTo(Tonyu.classes.user.Enemy)) {
          //$LASTPOS=2000856;//user.Player:856
          _this.damage(_this.e);
          
        }
        //$LASTPOS=2000877;//user.Player:877
        _this.print(_this.state);
        //$LASTPOS=2000895;//user.Player:895
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000019;//user.Player:19
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=2000091;//user.Player:91
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=2000161;//user.Player:161
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=2000278;//user.Player:278
      _this.ind=0;
      //$LASTPOS=2000285;//user.Player:285
      _this.state="stand";
      //$LASTPOS=2000300;//user.Player:300
      _this.parallel(Tonyu.bindFunc(_this,_this.anim));
      //$LASTPOS=2000357;//user.Player:357
      _this.scaleX=1;
      //$LASTPOS=2000367;//user.Player:367
      _this.scaleY=1;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000377;//user.Player:377
          case 1:
            //$LASTPOS=2000420;//user.Player:420
            if (_this.getkey("left")) {
              //$LASTPOS=2000448;//user.Player:448
              _this.scaleX=1;
              //$LASTPOS=2000466;//user.Player:466
              _this.vx=- 1;
              //$LASTPOS=2000481;//user.Player:481
              if (_this.state!="jump") {
                //$LASTPOS=2000498;//user.Player:498
                _this.state="walk";
              }
              
            } else {
              //$LASTPOS=2000522;//user.Player:522
              if (_this.getkey("right")) {
                //$LASTPOS=2000551;//user.Player:551
                _this.scaleX=- 1;
                //$LASTPOS=2000570;//user.Player:570
                _this.vx=1;
                //$LASTPOS=2000584;//user.Player:584
                if (_this.state!="jump") {
                  //$LASTPOS=2000601;//user.Player:601
                  _this.state="walk";
                }
                
              } else {
                //$LASTPOS=2000625;//user.Player:625
                if (_this.state!="jump") {
                  //$LASTPOS=2000652;//user.Player:652
                  _this.vx=0;
                  //$LASTPOS=2000666;//user.Player:666
                  _this.state="stand";
                  
                }
              }
            }
            //$LASTPOS=2000691;//user.Player:691
            if (!(_this.getkey("up")==1&&_this.state!="jump")) { __pc=3; break; }
            //$LASTPOS=2000735;//user.Player:735
            _this.state="jump";
            //$LASTPOS=2000757;//user.Player:757
            _this.ind=0;
            //$LASTPOS=2000772;//user.Player:772
            _this.fiber$applyImpulse(_thread, 0, - 9);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000800;//user.Player:800
            _this.parallel(Tonyu.bindFunc(_this,_this.jump));
          case 3:
            
            //$LASTPOS=2000826;//user.Player:826
            if (!(_this.e=_this.crashTo(Tonyu.classes.user.Enemy))) { __pc=5; break; }
            //$LASTPOS=2000856;//user.Player:856
            _this.fiber$damage(_thread, _this.e);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=2000877;//user.Player:877
            _this.print(_this.state);
            //$LASTPOS=2000895;//user.Player:895
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=1;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    damage :function _trc_Player_damage(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000923;//user.Player:923
      _this.state="damage";
      //$LASTPOS=2000943;//user.Player:943
      if (e.x-_this.x>0) {
        //$LASTPOS=2000955;//user.Player:955
        _this.dx=- 2;
      } else {
        //$LASTPOS=2000971;//user.Player:971
        _this.dx=2;
      }
      //$LASTPOS=2000981;//user.Player:981
      _this.applyImpulse(_this.dx,- 2);
      //$LASTPOS=2001006;//user.Player:1006
      _this.updateEx(30);
    },
    fiber$damage :function _trc_Player_f_damage(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000923;//user.Player:923
      _this.state="damage";
      //$LASTPOS=2000943;//user.Player:943
      if (e.x-_this.x>0) {
        //$LASTPOS=2000955;//user.Player:955
        _this.dx=- 2;
      } else {
        //$LASTPOS=2000971;//user.Player:971
        _this.dx=2;
      }
      
      _thread.enter(function _trc_Player_ent_damage(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000981;//user.Player:981
            _this.fiber$applyImpulse(_thread, _this.dx, - 2);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2001006;//user.Player:1006
            _this.fiber$updateEx(_thread, 30);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    jump :function _trc_Player_jump() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2001035;//user.Player:1035
      _this.updateEx(3);
      //$LASTPOS=2001052;//user.Player:1052
      while (true) {
        //$LASTPOS=2001073;//user.Player:1073
        if (_this.contactTo(Tonyu.classes.kernel.BodyActor)) {
          //$LASTPOS=2001111;//user.Player:1111
          _this.state="stand";
          break;
          
          
        }
        //$LASTPOS=2001163;//user.Player:1163
        _this.update();
        
      }
    },
    fiber$jump :function _trc_Player_f_jump(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_jump(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2001035;//user.Player:1035
            _this.fiber$updateEx(_thread, 3);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2001052;//user.Player:1052
          case 2:
            //$LASTPOS=2001073;//user.Player:1073
            if (!(_this.contactTo(Tonyu.classes.kernel.BodyActor))) { __pc=3; break; }
            //$LASTPOS=2001111;//user.Player:1111
            _this.state="stand";
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=2001163;//user.Player:1163
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    anim :function _trc_Player_anim() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2001194;//user.Player:1194
      while (true) {
        //$LASTPOS=2001215;//user.Player:1215
        if (_this.state=="stand") {
          //$LASTPOS=2001247;//user.Player:1247
          _this.p=_this.pat_standing[_this.ind%4];
          
        }
        //$LASTPOS=2001288;//user.Player:1288
        if (_this.state=="walk") {
          //$LASTPOS=2001319;//user.Player:1319
          _this.p=_this.pat_walking[_this.ind%4];
          
        }
        //$LASTPOS=2001359;//user.Player:1359
        if (_this.state=="jump") {
          //$LASTPOS=2001390;//user.Player:1390
          _this.p=_this.pat_jumping[_this.ind%6];
          
        }
        //$LASTPOS=2001430;//user.Player:1430
        if (_this.state=="damage") {
          //$LASTPOS=2001463;//user.Player:1463
          _this.p=Tonyu.globals.$pat_chara+22;
          
        }
        //$LASTPOS=2001498;//user.Player:1498
        _this.ind++;
        //$LASTPOS=2001513;//user.Player:1513
        _this.updateEx(10);
        
      }
    },
    fiber$anim :function _trc_Player_f_anim(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_anim(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2001194;//user.Player:1194
          case 1:
            //$LASTPOS=2001215;//user.Player:1215
            if (_this.state=="stand") {
              //$LASTPOS=2001247;//user.Player:1247
              _this.p=_this.pat_standing[_this.ind%4];
              
            }
            //$LASTPOS=2001288;//user.Player:1288
            if (_this.state=="walk") {
              //$LASTPOS=2001319;//user.Player:1319
              _this.p=_this.pat_walking[_this.ind%4];
              
            }
            //$LASTPOS=2001359;//user.Player:1359
            if (_this.state=="jump") {
              //$LASTPOS=2001390;//user.Player:1390
              _this.p=_this.pat_jumping[_this.ind%6];
              
            }
            //$LASTPOS=2001430;//user.Player:1430
            if (_this.state=="damage") {
              //$LASTPOS=2001463;//user.Player:1463
              _this.p=Tonyu.globals.$pat_chara+22;
              
            }
            //$LASTPOS=2001498;//user.Player:1498
            _this.ind++;
            //$LASTPOS=2001513;//user.Player:1513
            _this.fiber$updateEx(_thread, 10);
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
  decls: {"methods":{"main":{"nowait":false},"damage":{"nowait":false},"jump":{"nowait":false},"anim":{"nowait":false}}}
});
