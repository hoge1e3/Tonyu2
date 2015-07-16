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
      new Tonyu.classes.user.Player2({x: 50,y: 300,vx: 0,vy: 1,p: 1,manualRotation: true,shape: "circle"});
      //$LASTPOS=1000302;//user.Main:302
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
      new Tonyu.classes.user.Player2({x: 50,y: 300,vx: 0,vy: 1,p: 1,manualRotation: true,shape: "circle"});
      //$LASTPOS=1000302;//user.Main:302
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
      _this._th.paused=false;
      //$LASTPOS=2000037;//user.Player:37
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=2000109;//user.Player:109
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=2000179;//user.Player:179
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=2000296;//user.Player:296
      _this.ind=0;
      //$LASTPOS=2000303;//user.Player:303
      _this.state="stand";
      //$LASTPOS=2000318;//user.Player:318
      _this.parallel(Tonyu.bindFunc(_this,_this.anim));
      //$LASTPOS=2000334;//user.Player:334
      _this.on("crashTo",Tonyu.classes.user.Enemy,(function anonymous_353(e) {
        
        //$LASTPOS=2000358;//user.Player:358
        _this.parallel(Tonyu.bindFunc(_this,_this.damage),e);
      }));
      //$LASTPOS=2000381;//user.Player:381
      _this.scaleX=1;
      //$LASTPOS=2000391;//user.Player:391
      _this.scaleY=1;
      //$LASTPOS=2000401;//user.Player:401
      while (true) {
        //$LASTPOS=2000444;//user.Player:444
        if (_this.getkey("left")) {
          //$LASTPOS=2000472;//user.Player:472
          _this.scaleX=1;
          //$LASTPOS=2000490;//user.Player:490
          _this.vx=- 1;
          //$LASTPOS=2000505;//user.Player:505
          if (_this.state!="jump") {
            //$LASTPOS=2000522;//user.Player:522
            _this.state="walk";
          }
          
        } else {
          //$LASTPOS=2000546;//user.Player:546
          if (_this.getkey("right")) {
            //$LASTPOS=2000575;//user.Player:575
            _this.scaleX=- 1;
            //$LASTPOS=2000594;//user.Player:594
            _this.vx=1;
            //$LASTPOS=2000608;//user.Player:608
            if (_this.state!="jump") {
              //$LASTPOS=2000625;//user.Player:625
              _this.state="walk";
            }
            
          } else {
            //$LASTPOS=2000649;//user.Player:649
            if (_this.state!="jump") {
              //$LASTPOS=2000676;//user.Player:676
              _this.vx=0;
              //$LASTPOS=2000690;//user.Player:690
              _this.state="stand";
              
            }
          }
        }
        //$LASTPOS=2000715;//user.Player:715
        if (_this.getkey("up")==1&&_this.state!="jump") {
          //$LASTPOS=2000759;//user.Player:759
          _this.state="jump";
          //$LASTPOS=2000781;//user.Player:781
          _this.ind=0;
          //$LASTPOS=2000796;//user.Player:796
          _this.applyImpulse(0,- 9);
          //$LASTPOS=2000824;//user.Player:824
          _this.parallel(Tonyu.bindFunc(_this,_this.jump));
          
        }
        //$LASTPOS=2000905;//user.Player:905
        _this.print(_this.state);
        //$LASTPOS=2000923;//user.Player:923
        _this.update();
        //$LASTPOS=2000937;//user.Player:937
        while (_this._th.paused) {
          //$LASTPOS=2000964;//user.Player:964
          _this.update();
          
        }
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000019;//user.Player:19
      _this._th.paused=false;
      //$LASTPOS=2000037;//user.Player:37
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=2000109;//user.Player:109
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=2000179;//user.Player:179
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=2000296;//user.Player:296
      _this.ind=0;
      //$LASTPOS=2000303;//user.Player:303
      _this.state="stand";
      //$LASTPOS=2000318;//user.Player:318
      _this.parallel(Tonyu.bindFunc(_this,_this.anim));
      //$LASTPOS=2000334;//user.Player:334
      _this.on("crashTo",Tonyu.classes.user.Enemy,(function anonymous_353(e) {
        
        //$LASTPOS=2000358;//user.Player:358
        _this.parallel(Tonyu.bindFunc(_this,_this.damage),e);
      }));
      //$LASTPOS=2000381;//user.Player:381
      _this.scaleX=1;
      //$LASTPOS=2000391;//user.Player:391
      _this.scaleY=1;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000401;//user.Player:401
          case 1:
            //$LASTPOS=2000444;//user.Player:444
            if (_this.getkey("left")) {
              //$LASTPOS=2000472;//user.Player:472
              _this.scaleX=1;
              //$LASTPOS=2000490;//user.Player:490
              _this.vx=- 1;
              //$LASTPOS=2000505;//user.Player:505
              if (_this.state!="jump") {
                //$LASTPOS=2000522;//user.Player:522
                _this.state="walk";
              }
              
            } else {
              //$LASTPOS=2000546;//user.Player:546
              if (_this.getkey("right")) {
                //$LASTPOS=2000575;//user.Player:575
                _this.scaleX=- 1;
                //$LASTPOS=2000594;//user.Player:594
                _this.vx=1;
                //$LASTPOS=2000608;//user.Player:608
                if (_this.state!="jump") {
                  //$LASTPOS=2000625;//user.Player:625
                  _this.state="walk";
                }
                
              } else {
                //$LASTPOS=2000649;//user.Player:649
                if (_this.state!="jump") {
                  //$LASTPOS=2000676;//user.Player:676
                  _this.vx=0;
                  //$LASTPOS=2000690;//user.Player:690
                  _this.state="stand";
                  
                }
              }
            }
            //$LASTPOS=2000715;//user.Player:715
            if (!(_this.getkey("up")==1&&_this.state!="jump")) { __pc=3; break; }
            //$LASTPOS=2000759;//user.Player:759
            _this.state="jump";
            //$LASTPOS=2000781;//user.Player:781
            _this.ind=0;
            //$LASTPOS=2000796;//user.Player:796
            _this.fiber$applyImpulse(_thread, 0, - 9);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000824;//user.Player:824
            _this.parallel(Tonyu.bindFunc(_this,_this.jump));
          case 3:
            
            //$LASTPOS=2000905;//user.Player:905
            _this.print(_this.state);
            //$LASTPOS=2000923;//user.Player:923
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=2000937;//user.Player:937
          case 5:
            if (!(_this._th.paused)) { __pc=7; break; }
            //$LASTPOS=2000964;//user.Player:964
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            __pc=1;break;
          case 8:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    damage :function _trc_Player_damage(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000998;//user.Player:998
      _this.state="damage";
      //$LASTPOS=2001018;//user.Player:1018
      _this.pause(Tonyu.bindFunc(_this,_this.main));
      //$LASTPOS=2001035;//user.Player:1035
      if (e.x-_this.x>0) {
        //$LASTPOS=2001047;//user.Player:1047
        _this.dx=- 2;
      } else {
        //$LASTPOS=2001063;//user.Player:1063
        _this.dx=2;
      }
      //$LASTPOS=2001100;//user.Player:1100
      _this.vx=_this.dx;
      //$LASTPOS=2001111;//user.Player:1111
      _this.vy=- 3;
      //$LASTPOS=2001122;//user.Player:1122
      _this.updateEx(30);
      //$LASTPOS=2001140;//user.Player:1140
      _this.resume(Tonyu.bindFunc(_this,_this.main));
    },
    fiber$damage :function _trc_Player_f_damage(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000998;//user.Player:998
      _this.state="damage";
      
      _thread.enter(function _trc_Player_ent_damage(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2001018;//user.Player:1018
            _this.fiber$pause(_thread, Tonyu.bindFunc(_this,_this.main));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2001035;//user.Player:1035
            if (e.x-_this.x>0) {
              //$LASTPOS=2001047;//user.Player:1047
              _this.dx=- 2;
            } else {
              //$LASTPOS=2001063;//user.Player:1063
              _this.dx=2;
            }
            //$LASTPOS=2001100;//user.Player:1100
            _this.vx=_this.dx;
            //$LASTPOS=2001111;//user.Player:1111
            _this.vy=- 3;
            //$LASTPOS=2001122;//user.Player:1122
            _this.fiber$updateEx(_thread, 30);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2001140;//user.Player:1140
            _this.fiber$resume(_thread, Tonyu.bindFunc(_this,_this.main));
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    jump :function _trc_Player_jump() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2001169;//user.Player:1169
      _this.updateEx(3);
      //$LASTPOS=2001186;//user.Player:1186
      while (true) {
        //$LASTPOS=2001207;//user.Player:1207
        if (_this.contactTo(Tonyu.classes.kernel.BodyActor)) {
          //$LASTPOS=2001245;//user.Player:1245
          _this.state="stand";
          break;
          
          
        }
        //$LASTPOS=2001297;//user.Player:1297
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
            //$LASTPOS=2001169;//user.Player:1169
            _this.fiber$updateEx(_thread, 3);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2001186;//user.Player:1186
          case 2:
            //$LASTPOS=2001207;//user.Player:1207
            if (!(_this.contactTo(Tonyu.classes.kernel.BodyActor))) { __pc=3; break; }
            //$LASTPOS=2001245;//user.Player:1245
            _this.state="stand";
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=2001297;//user.Player:1297
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
      
      //$LASTPOS=2001328;//user.Player:1328
      while (true) {
        //$LASTPOS=2001349;//user.Player:1349
        if (_this.state=="stand") {
          //$LASTPOS=2001381;//user.Player:1381
          _this.p=_this.pat_standing[_this.ind%4];
          
        }
        //$LASTPOS=2001422;//user.Player:1422
        if (_this.state=="walk") {
          //$LASTPOS=2001453;//user.Player:1453
          _this.p=_this.pat_walking[_this.ind%4];
          
        }
        //$LASTPOS=2001493;//user.Player:1493
        if (_this.state=="jump") {
          //$LASTPOS=2001524;//user.Player:1524
          _this.p=_this.pat_jumping[_this.ind%6];
          
        }
        //$LASTPOS=2001564;//user.Player:1564
        if (_this.state=="damage") {
          //$LASTPOS=2001597;//user.Player:1597
          _this.p=Tonyu.globals.$pat_chara+22;
          
        }
        //$LASTPOS=2001632;//user.Player:1632
        _this.ind++;
        //$LASTPOS=2001647;//user.Player:1647
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
            //$LASTPOS=2001328;//user.Player:1328
          case 1:
            //$LASTPOS=2001349;//user.Player:1349
            if (_this.state=="stand") {
              //$LASTPOS=2001381;//user.Player:1381
              _this.p=_this.pat_standing[_this.ind%4];
              
            }
            //$LASTPOS=2001422;//user.Player:1422
            if (_this.state=="walk") {
              //$LASTPOS=2001453;//user.Player:1453
              _this.p=_this.pat_walking[_this.ind%4];
              
            }
            //$LASTPOS=2001493;//user.Player:1493
            if (_this.state=="jump") {
              //$LASTPOS=2001524;//user.Player:1524
              _this.p=_this.pat_jumping[_this.ind%6];
              
            }
            //$LASTPOS=2001564;//user.Player:1564
            if (_this.state=="damage") {
              //$LASTPOS=2001597;//user.Player:1597
              _this.p=Tonyu.globals.$pat_chara+22;
              
            }
            //$LASTPOS=2001632;//user.Player:1632
            _this.ind++;
            //$LASTPOS=2001647;//user.Player:1647
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
    pause :function _trc_Player_pause(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2001685;//user.Player:1685
      _this._th.paused=true;
      //$LASTPOS=2001706;//user.Player:1706
      _this.print("pause!");
    },
    fiber$pause :function _trc_Player_f_pause(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2001685;//user.Player:1685
      _this._th.paused=true;
      //$LASTPOS=2001706;//user.Player:1706
      _this.print("pause!");
      
      _thread.retVal=_this;return;
    },
    resume :function _trc_Player_resume(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2001742;//user.Player:1742
      _this._th.paused=false;
      //$LASTPOS=2001764;//user.Player:1764
      _this.print("resume");
    },
    fiber$resume :function _trc_Player_f_resume(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2001742;//user.Player:1742
      _this._th.paused=false;
      //$LASTPOS=2001764;//user.Player:1764
      _this.print("resume");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"damage":{"nowait":false},"jump":{"nowait":false},"anim":{"nowait":false},"pause":{"nowait":false},"resume":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Player2',
  shortName: 'Player2',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Player2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000020;//user.Player2:20
      _this._th.paused=false;
      //$LASTPOS=3000039;//user.Player2:39
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=3000112;//user.Player2:112
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=3000183;//user.Player2:183
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=3000302;//user.Player2:302
      _this.ind=0;
      //$LASTPOS=3000310;//user.Player2:310
      _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
      //$LASTPOS=3000331;//user.Player2:331
      _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
      //$LASTPOS=3000364;//user.Player2:364
      _this.on("crashTo",Tonyu.classes.user.Enemy,(function anonymous_383(e) {
        
        //$LASTPOS=3000388;//user.Player2:388
        _this.parallel(Tonyu.bindFunc(_this,_this.damage),e);
      }));
      //$LASTPOS=3000412;//user.Player2:412
      _this.scaleX=1;
      //$LASTPOS=3000423;//user.Player2:423
      _this.scaleY=1;
    },
    fiber$main :function _trc_Player2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000020;//user.Player2:20
      _this._th.paused=false;
      //$LASTPOS=3000039;//user.Player2:39
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=3000112;//user.Player2:112
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=3000183;//user.Player2:183
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=3000302;//user.Player2:302
      _this.ind=0;
      //$LASTPOS=3000310;//user.Player2:310
      _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
      //$LASTPOS=3000331;//user.Player2:331
      _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
      //$LASTPOS=3000364;//user.Player2:364
      _this.on("crashTo",Tonyu.classes.user.Enemy,(function anonymous_383(e) {
        
        //$LASTPOS=3000388;//user.Player2:388
        _this.parallel(Tonyu.bindFunc(_this,_this.damage),e);
      }));
      //$LASTPOS=3000412;//user.Player2:412
      _this.scaleX=1;
      //$LASTPOS=3000423;//user.Player2:423
      _this.scaleY=1;
      
      _thread.retVal=_this;return;
    },
    stand :function _trc_Player2_stand() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000449;//user.Player2:449
      _this.vx=0;
      //$LASTPOS=3000460;//user.Player2:460
      while (true) {
        //$LASTPOS=3000482;//user.Player2:482
        if (_this.getkey("left")||_this.getkey("right")) {
          //$LASTPOS=3000534;//user.Player2:534
          _this.ct.kill();
          //$LASTPOS=3000558;//user.Player2:558
          _this.at.kill();
          //$LASTPOS=3000582;//user.Player2:582
          _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.walk));
          //$LASTPOS=3000614;//user.Player2:614
          _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_walking);
          
        }
        //$LASTPOS=3000665;//user.Player2:665
        if (_this.getkey("up")) {
          //$LASTPOS=3000696;//user.Player2:696
          _this.ct.kill();
          //$LASTPOS=3000720;//user.Player2:720
          _this.at.kill();
          //$LASTPOS=3000744;//user.Player2:744
          _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.jump));
          //$LASTPOS=3000776;//user.Player2:776
          _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
          
        }
        //$LASTPOS=3000827;//user.Player2:827
        _this.update();
        
      }
    },
    fiber$stand :function _trc_Player2_f_stand(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000449;//user.Player2:449
      _this.vx=0;
      
      _thread.enter(function _trc_Player2_ent_stand(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000460;//user.Player2:460
          case 1:
            //$LASTPOS=3000482;//user.Player2:482
            if (_this.getkey("left")||_this.getkey("right")) {
              //$LASTPOS=3000534;//user.Player2:534
              _this.ct.kill();
              //$LASTPOS=3000558;//user.Player2:558
              _this.at.kill();
              //$LASTPOS=3000582;//user.Player2:582
              _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.walk));
              //$LASTPOS=3000614;//user.Player2:614
              _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_walking);
              
            }
            //$LASTPOS=3000665;//user.Player2:665
            if (_this.getkey("up")) {
              //$LASTPOS=3000696;//user.Player2:696
              _this.ct.kill();
              //$LASTPOS=3000720;//user.Player2:720
              _this.at.kill();
              //$LASTPOS=3000744;//user.Player2:744
              _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.jump));
              //$LASTPOS=3000776;//user.Player2:776
              _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
              
            }
            //$LASTPOS=3000827;//user.Player2:827
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
    walk :function _trc_Player2_walk() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000862;//user.Player2:862
      while (true) {
        //$LASTPOS=3000884;//user.Player2:884
        if (_this.getkey("left")) {
          //$LASTPOS=3000917;//user.Player2:917
          _this.vx=- 2;
          //$LASTPOS=3000937;//user.Player2:937
          _this.scaleX=1;
          
        } else {
          //$LASTPOS=3000962;//user.Player2:962
          if (_this.getkey("right")) {
            //$LASTPOS=3000996;//user.Player2:996
            _this.vx=2;
            //$LASTPOS=3001015;//user.Player2:1015
            _this.scaleX=- 1;
            
          } else {
            //$LASTPOS=3001055;//user.Player2:1055
            _this.vx=0;
            //$LASTPOS=3001074;//user.Player2:1074
            _this.ct.kill();
            //$LASTPOS=3001098;//user.Player2:1098
            _this.at.kill();
            //$LASTPOS=3001122;//user.Player2:1122
            _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
            //$LASTPOS=3001155;//user.Player2:1155
            _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
            
          }
        }
        //$LASTPOS=3001207;//user.Player2:1207
        if (_this.getkey("up")) {
          //$LASTPOS=3001238;//user.Player2:1238
          _this.ct.kill();
          //$LASTPOS=3001262;//user.Player2:1262
          _this.at.kill();
          //$LASTPOS=3001286;//user.Player2:1286
          _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.jump));
          //$LASTPOS=3001318;//user.Player2:1318
          _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
          
        }
        //$LASTPOS=3001369;//user.Player2:1369
        _this.update();
        
      }
    },
    fiber$walk :function _trc_Player2_f_walk(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player2_ent_walk(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000862;//user.Player2:862
          case 1:
            //$LASTPOS=3000884;//user.Player2:884
            if (_this.getkey("left")) {
              //$LASTPOS=3000917;//user.Player2:917
              _this.vx=- 2;
              //$LASTPOS=3000937;//user.Player2:937
              _this.scaleX=1;
              
            } else {
              //$LASTPOS=3000962;//user.Player2:962
              if (_this.getkey("right")) {
                //$LASTPOS=3000996;//user.Player2:996
                _this.vx=2;
                //$LASTPOS=3001015;//user.Player2:1015
                _this.scaleX=- 1;
                
              } else {
                //$LASTPOS=3001055;//user.Player2:1055
                _this.vx=0;
                //$LASTPOS=3001074;//user.Player2:1074
                _this.ct.kill();
                //$LASTPOS=3001098;//user.Player2:1098
                _this.at.kill();
                //$LASTPOS=3001122;//user.Player2:1122
                _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
                //$LASTPOS=3001155;//user.Player2:1155
                _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
                
              }
            }
            //$LASTPOS=3001207;//user.Player2:1207
            if (_this.getkey("up")) {
              //$LASTPOS=3001238;//user.Player2:1238
              _this.ct.kill();
              //$LASTPOS=3001262;//user.Player2:1262
              _this.at.kill();
              //$LASTPOS=3001286;//user.Player2:1286
              _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.jump));
              //$LASTPOS=3001318;//user.Player2:1318
              _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
              
            }
            //$LASTPOS=3001369;//user.Player2:1369
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
    damage :function _trc_Player2_damage(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3001407;//user.Player2:1407
      _this.state="damage";
      //$LASTPOS=3001428;//user.Player2:1428
      _this.ct.kill();
      //$LASTPOS=3001444;//user.Player2:1444
      _this.at.kill();
      //$LASTPOS=3001460;//user.Player2:1460
      _this.p=Tonyu.globals.$pat_chara+22;
      //$LASTPOS=3001482;//user.Player2:1482
      _this.pause(Tonyu.bindFunc(_this,_this.main));
      //$LASTPOS=3001500;//user.Player2:1500
      if (e.x-_this.x>0) {
        //$LASTPOS=3001512;//user.Player2:1512
        _this.dx=- 2;
      } else {
        //$LASTPOS=3001529;//user.Player2:1529
        _this.dx=2;
      }
      //$LASTPOS=3001568;//user.Player2:1568
      _this.vx=_this.dx;
      //$LASTPOS=3001580;//user.Player2:1580
      _this.vy=- 3;
      //$LASTPOS=3001592;//user.Player2:1592
      _this.updateEx(30);
      //$LASTPOS=3001611;//user.Player2:1611
      _this.resume(Tonyu.bindFunc(_this,_this.main));
      //$LASTPOS=3001630;//user.Player2:1630
      _this.ct.kill();
      //$LASTPOS=3001646;//user.Player2:1646
      _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
      //$LASTPOS=3001671;//user.Player2:1671
      _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
    },
    fiber$damage :function _trc_Player2_f_damage(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3001407;//user.Player2:1407
      _this.state="damage";
      //$LASTPOS=3001428;//user.Player2:1428
      _this.ct.kill();
      //$LASTPOS=3001444;//user.Player2:1444
      _this.at.kill();
      //$LASTPOS=3001460;//user.Player2:1460
      _this.p=Tonyu.globals.$pat_chara+22;
      
      _thread.enter(function _trc_Player2_ent_damage(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3001482;//user.Player2:1482
            _this.fiber$pause(_thread, Tonyu.bindFunc(_this,_this.main));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=3001500;//user.Player2:1500
            if (e.x-_this.x>0) {
              //$LASTPOS=3001512;//user.Player2:1512
              _this.dx=- 2;
            } else {
              //$LASTPOS=3001529;//user.Player2:1529
              _this.dx=2;
            }
            //$LASTPOS=3001568;//user.Player2:1568
            _this.vx=_this.dx;
            //$LASTPOS=3001580;//user.Player2:1580
            _this.vy=- 3;
            //$LASTPOS=3001592;//user.Player2:1592
            _this.fiber$updateEx(_thread, 30);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=3001611;//user.Player2:1611
            _this.fiber$resume(_thread, Tonyu.bindFunc(_this,_this.main));
            __pc=3;return;
          case 3:
            
            //$LASTPOS=3001630;//user.Player2:1630
            _this.ct.kill();
            //$LASTPOS=3001646;//user.Player2:1646
            _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
            //$LASTPOS=3001671;//user.Player2:1671
            _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
            _thread.exit(_this);return;
          }
        }
      });
    },
    jump :function _trc_Player2_jump() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3001721;//user.Player2:1721
      _this.vy=- 5;
      //$LASTPOS=3001733;//user.Player2:1733
      _this.updateEx(3);
      //$LASTPOS=3001751;//user.Player2:1751
      while (true) {
        //$LASTPOS=3001773;//user.Player2:1773
        _this.update();
        //$LASTPOS=3001792;//user.Player2:1792
        if (_this.contactTo(Tonyu.classes.kernel.BodyActor)) {
          //$LASTPOS=3001831;//user.Player2:1831
          _this.ct.kill();
          //$LASTPOS=3001855;//user.Player2:1855
          _this.at.kill();
          //$LASTPOS=3001879;//user.Player2:1879
          _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
          //$LASTPOS=3001912;//user.Player2:1912
          _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
          
        }
        
      }
    },
    fiber$jump :function _trc_Player2_f_jump(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3001721;//user.Player2:1721
      _this.vy=- 5;
      
      _thread.enter(function _trc_Player2_ent_jump(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3001733;//user.Player2:1733
            _this.fiber$updateEx(_thread, 3);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=3001751;//user.Player2:1751
          case 2:
            //$LASTPOS=3001773;//user.Player2:1773
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=3001792;//user.Player2:1792
            if (_this.contactTo(Tonyu.classes.kernel.BodyActor)) {
              //$LASTPOS=3001831;//user.Player2:1831
              _this.ct.kill();
              //$LASTPOS=3001855;//user.Player2:1855
              _this.at.kill();
              //$LASTPOS=3001879;//user.Player2:1879
              _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
              //$LASTPOS=3001912;//user.Player2:1912
              _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
              
            }
            __pc=2;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    anim :function _trc_Player2_anim(pl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3001982;//user.Player2:1982
      while (true) {
        //$LASTPOS=3002004;//user.Player2:2004
        _this.p=pl[_this.ind%pl.length];
        //$LASTPOS=3002034;//user.Player2:2034
        _this.ind++;
        //$LASTPOS=3002050;//user.Player2:2050
        _this.updateEx(10);
        
      }
    },
    fiber$anim :function _trc_Player2_f_anim(_thread,pl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player2_ent_anim(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3001982;//user.Player2:1982
          case 1:
            //$LASTPOS=3002004;//user.Player2:2004
            _this.p=pl[_this.ind%pl.length];
            //$LASTPOS=3002034;//user.Player2:2034
            _this.ind++;
            //$LASTPOS=3002050;//user.Player2:2050
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
    pause :function _trc_Player2_pause(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3002092;//user.Player2:2092
      _this._th.paused=true;
      //$LASTPOS=3002114;//user.Player2:2114
      _this.print("pause!");
    },
    fiber$pause :function _trc_Player2_f_pause(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3002092;//user.Player2:2092
      _this._th.paused=true;
      //$LASTPOS=3002114;//user.Player2:2114
      _this.print("pause!");
      
      _thread.retVal=_this;return;
    },
    resume :function _trc_Player2_resume(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3002153;//user.Player2:2153
      _this._th.paused=false;
      //$LASTPOS=3002176;//user.Player2:2176
      _this.print("resume");
    },
    fiber$resume :function _trc_Player2_f_resume(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3002153;//user.Player2:2153
      _this._th.paused=false;
      //$LASTPOS=3002176;//user.Player2:2176
      _this.print("resume");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"stand":{"nowait":false},"walk":{"nowait":false},"damage":{"nowait":false},"jump":{"nowait":false},"anim":{"nowait":false},"pause":{"nowait":false},"resume":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Player3',
  shortName: 'Player3',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Player3_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000020;//user.Player3:20
      _this._th.paused=false;
      //$LASTPOS=4000039;//user.Player3:39
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=4000112;//user.Player3:112
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=4000183;//user.Player3:183
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=4000302;//user.Player3:302
      _this.ind=0;
      //$LASTPOS=4000310;//user.Player3:310
      _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
      //$LASTPOS=4000331;//user.Player3:331
      _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
      //$LASTPOS=4000364;//user.Player3:364
      _this.on("crashTo",Tonyu.classes.user.Enemy,(function anonymous_383(e) {
        
        //$LASTPOS=4000388;//user.Player3:388
        _this.parallel(Tonyu.bindFunc(_this,_this.damage),e);
      }));
      //$LASTPOS=4000412;//user.Player3:412
      _this.scaleX=1;
      //$LASTPOS=4000423;//user.Player3:423
      _this.scaleY=1;
    },
    fiber$main :function _trc_Player3_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000020;//user.Player3:20
      _this._th.paused=false;
      //$LASTPOS=4000039;//user.Player3:39
      _this.pat_standing=[Tonyu.globals.$pat_chara+13,Tonyu.globals.$pat_chara+14,Tonyu.globals.$pat_chara+15,Tonyu.globals.$pat_chara+14];
      //$LASTPOS=4000112;//user.Player3:112
      _this.pat_walking=[Tonyu.globals.$pat_chara+9,Tonyu.globals.$pat_chara+10,Tonyu.globals.$pat_chara+11,Tonyu.globals.$pat_chara+10];
      //$LASTPOS=4000183;//user.Player3:183
      _this.pat_jumping=[Tonyu.globals.$pat_chara+26,Tonyu.globals.$pat_chara+27,Tonyu.globals.$pat_chara+28,Tonyu.globals.$pat_chara+29,Tonyu.globals.$pat_chara+30,Tonyu.globals.$pat_chara+31];
      //$LASTPOS=4000302;//user.Player3:302
      _this.ind=0;
      //$LASTPOS=4000310;//user.Player3:310
      _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
      //$LASTPOS=4000331;//user.Player3:331
      _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
      //$LASTPOS=4000364;//user.Player3:364
      _this.on("crashTo",Tonyu.classes.user.Enemy,(function anonymous_383(e) {
        
        //$LASTPOS=4000388;//user.Player3:388
        _this.parallel(Tonyu.bindFunc(_this,_this.damage),e);
      }));
      //$LASTPOS=4000412;//user.Player3:412
      _this.scaleX=1;
      //$LASTPOS=4000423;//user.Player3:423
      _this.scaleY=1;
      
      _thread.retVal=_this;return;
    },
    stand :function _trc_Player3_stand() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000449;//user.Player3:449
      _this.vx=0;
      //$LASTPOS=4000460;//user.Player3:460
      while (true) {
        //$LASTPOS=4000482;//user.Player3:482
        if (_this.getkey("left")||_this.getkey("right")) {
          //$LASTPOS=4000557;//user.Player3:557
          _this.ct.goto(Tonyu.bindFunc(_this,_this.walk));
          //$LASTPOS=4000585;//user.Player3:585
          _this.at.goto(Tonyu.bindFunc(_this,_this.anim),_this.pat_walking);
          
        }
        //$LASTPOS=4000632;//user.Player3:632
        if (_this.getkey("up")) {
          //$LASTPOS=4000686;//user.Player3:686
          _this.ct.goto(Tonyu.bindFunc(_this,_this.jump));
          //$LASTPOS=4000714;//user.Player3:714
          _this.at.goto(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
          
        }
        //$LASTPOS=4000761;//user.Player3:761
        _this.update();
        
      }
    },
    fiber$stand :function _trc_Player3_f_stand(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000449;//user.Player3:449
      _this.vx=0;
      
      _thread.enter(function _trc_Player3_ent_stand(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000460;//user.Player3:460
          case 1:
            //$LASTPOS=4000482;//user.Player3:482
            if (_this.getkey("left")||_this.getkey("right")) {
              //$LASTPOS=4000557;//user.Player3:557
              _this.ct.goto(Tonyu.bindFunc(_this,_this.walk));
              //$LASTPOS=4000585;//user.Player3:585
              _this.at.goto(Tonyu.bindFunc(_this,_this.anim),_this.pat_walking);
              
            }
            //$LASTPOS=4000632;//user.Player3:632
            if (_this.getkey("up")) {
              //$LASTPOS=4000686;//user.Player3:686
              _this.ct.goto(Tonyu.bindFunc(_this,_this.jump));
              //$LASTPOS=4000714;//user.Player3:714
              _this.at.goto(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
              
            }
            //$LASTPOS=4000761;//user.Player3:761
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
    walk :function _trc_Player3_walk() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000796;//user.Player3:796
      while (true) {
        //$LASTPOS=4000818;//user.Player3:818
        if (_this.getkey("left")) {
          //$LASTPOS=4000851;//user.Player3:851
          _this.vx=- 2;
          //$LASTPOS=4000871;//user.Player3:871
          _this.scaleX=1;
          
        } else {
          //$LASTPOS=4000896;//user.Player3:896
          if (_this.getkey("right")) {
            //$LASTPOS=4000930;//user.Player3:930
            _this.vx=2;
            //$LASTPOS=4000949;//user.Player3:949
            _this.scaleX=- 1;
            
          } else {
            //$LASTPOS=4000989;//user.Player3:989
            _this.vx=0;
            //$LASTPOS=4001008;//user.Player3:1008
            _this.ct.kill();
            //$LASTPOS=4001032;//user.Player3:1032
            _this.at.kill();
            //$LASTPOS=4001056;//user.Player3:1056
            _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
            //$LASTPOS=4001089;//user.Player3:1089
            _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
            
          }
        }
        //$LASTPOS=4001141;//user.Player3:1141
        if (_this.getkey("up")) {
          //$LASTPOS=4001172;//user.Player3:1172
          _this.ct.kill();
          //$LASTPOS=4001196;//user.Player3:1196
          _this.at.kill();
          //$LASTPOS=4001220;//user.Player3:1220
          _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.jump));
          //$LASTPOS=4001252;//user.Player3:1252
          _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
          
        }
        //$LASTPOS=4001303;//user.Player3:1303
        _this.update();
        
      }
    },
    fiber$walk :function _trc_Player3_f_walk(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player3_ent_walk(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000796;//user.Player3:796
          case 1:
            //$LASTPOS=4000818;//user.Player3:818
            if (_this.getkey("left")) {
              //$LASTPOS=4000851;//user.Player3:851
              _this.vx=- 2;
              //$LASTPOS=4000871;//user.Player3:871
              _this.scaleX=1;
              
            } else {
              //$LASTPOS=4000896;//user.Player3:896
              if (_this.getkey("right")) {
                //$LASTPOS=4000930;//user.Player3:930
                _this.vx=2;
                //$LASTPOS=4000949;//user.Player3:949
                _this.scaleX=- 1;
                
              } else {
                //$LASTPOS=4000989;//user.Player3:989
                _this.vx=0;
                //$LASTPOS=4001008;//user.Player3:1008
                _this.ct.kill();
                //$LASTPOS=4001032;//user.Player3:1032
                _this.at.kill();
                //$LASTPOS=4001056;//user.Player3:1056
                _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
                //$LASTPOS=4001089;//user.Player3:1089
                _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
                
              }
            }
            //$LASTPOS=4001141;//user.Player3:1141
            if (_this.getkey("up")) {
              //$LASTPOS=4001172;//user.Player3:1172
              _this.ct.kill();
              //$LASTPOS=4001196;//user.Player3:1196
              _this.at.kill();
              //$LASTPOS=4001220;//user.Player3:1220
              _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.jump));
              //$LASTPOS=4001252;//user.Player3:1252
              _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_jumping);
              
            }
            //$LASTPOS=4001303;//user.Player3:1303
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
    damage :function _trc_Player3_damage(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4001341;//user.Player3:1341
      _this.state="damage";
      //$LASTPOS=4001362;//user.Player3:1362
      _this.ct.kill();
      //$LASTPOS=4001378;//user.Player3:1378
      _this.at.kill();
      //$LASTPOS=4001394;//user.Player3:1394
      _this.p=Tonyu.globals.$pat_chara+22;
      //$LASTPOS=4001416;//user.Player3:1416
      _this.pause(Tonyu.bindFunc(_this,_this.main));
      //$LASTPOS=4001434;//user.Player3:1434
      if (e.x-_this.x>0) {
        //$LASTPOS=4001446;//user.Player3:1446
        _this.dx=- 2;
      } else {
        //$LASTPOS=4001463;//user.Player3:1463
        _this.dx=2;
      }
      //$LASTPOS=4001502;//user.Player3:1502
      _this.vx=_this.dx;
      //$LASTPOS=4001514;//user.Player3:1514
      _this.vy=- 3;
      //$LASTPOS=4001526;//user.Player3:1526
      _this.updateEx(30);
      //$LASTPOS=4001545;//user.Player3:1545
      _this.resume(Tonyu.bindFunc(_this,_this.main));
      //$LASTPOS=4001564;//user.Player3:1564
      _this.ct.kill();
      //$LASTPOS=4001580;//user.Player3:1580
      _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
      //$LASTPOS=4001605;//user.Player3:1605
      _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
    },
    fiber$damage :function _trc_Player3_f_damage(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4001341;//user.Player3:1341
      _this.state="damage";
      //$LASTPOS=4001362;//user.Player3:1362
      _this.ct.kill();
      //$LASTPOS=4001378;//user.Player3:1378
      _this.at.kill();
      //$LASTPOS=4001394;//user.Player3:1394
      _this.p=Tonyu.globals.$pat_chara+22;
      
      _thread.enter(function _trc_Player3_ent_damage(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4001416;//user.Player3:1416
            _this.fiber$pause(_thread, Tonyu.bindFunc(_this,_this.main));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=4001434;//user.Player3:1434
            if (e.x-_this.x>0) {
              //$LASTPOS=4001446;//user.Player3:1446
              _this.dx=- 2;
            } else {
              //$LASTPOS=4001463;//user.Player3:1463
              _this.dx=2;
            }
            //$LASTPOS=4001502;//user.Player3:1502
            _this.vx=_this.dx;
            //$LASTPOS=4001514;//user.Player3:1514
            _this.vy=- 3;
            //$LASTPOS=4001526;//user.Player3:1526
            _this.fiber$updateEx(_thread, 30);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=4001545;//user.Player3:1545
            _this.fiber$resume(_thread, Tonyu.bindFunc(_this,_this.main));
            __pc=3;return;
          case 3:
            
            //$LASTPOS=4001564;//user.Player3:1564
            _this.ct.kill();
            //$LASTPOS=4001580;//user.Player3:1580
            _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
            //$LASTPOS=4001605;//user.Player3:1605
            _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
            _thread.exit(_this);return;
          }
        }
      });
    },
    jump :function _trc_Player3_jump() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4001655;//user.Player3:1655
      _this.vy=- 5;
      //$LASTPOS=4001667;//user.Player3:1667
      _this.updateEx(3);
      //$LASTPOS=4001685;//user.Player3:1685
      while (true) {
        //$LASTPOS=4001707;//user.Player3:1707
        _this.update();
        //$LASTPOS=4001726;//user.Player3:1726
        if (_this.contactTo(Tonyu.classes.kernel.BodyActor)) {
          //$LASTPOS=4001765;//user.Player3:1765
          _this.ct.kill();
          //$LASTPOS=4001789;//user.Player3:1789
          _this.at.kill();
          //$LASTPOS=4001813;//user.Player3:1813
          _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
          //$LASTPOS=4001846;//user.Player3:1846
          _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
          
        }
        
      }
    },
    fiber$jump :function _trc_Player3_f_jump(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4001655;//user.Player3:1655
      _this.vy=- 5;
      
      _thread.enter(function _trc_Player3_ent_jump(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4001667;//user.Player3:1667
            _this.fiber$updateEx(_thread, 3);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=4001685;//user.Player3:1685
          case 2:
            //$LASTPOS=4001707;//user.Player3:1707
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=4001726;//user.Player3:1726
            if (_this.contactTo(Tonyu.classes.kernel.BodyActor)) {
              //$LASTPOS=4001765;//user.Player3:1765
              _this.ct.kill();
              //$LASTPOS=4001789;//user.Player3:1789
              _this.at.kill();
              //$LASTPOS=4001813;//user.Player3:1813
              _this.ct=_this.parallel(Tonyu.bindFunc(_this,_this.stand));
              //$LASTPOS=4001846;//user.Player3:1846
              _this.at=_this.parallel(Tonyu.bindFunc(_this,_this.anim),_this.pat_standing);
              
            }
            __pc=2;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    anim :function _trc_Player3_anim(pl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4001916;//user.Player3:1916
      while (true) {
        //$LASTPOS=4001938;//user.Player3:1938
        _this.p=pl[_this.ind%pl.length];
        //$LASTPOS=4001968;//user.Player3:1968
        _this.ind++;
        //$LASTPOS=4001984;//user.Player3:1984
        _this.updateEx(10);
        
      }
    },
    fiber$anim :function _trc_Player3_f_anim(_thread,pl) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player3_ent_anim(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4001916;//user.Player3:1916
          case 1:
            //$LASTPOS=4001938;//user.Player3:1938
            _this.p=pl[_this.ind%pl.length];
            //$LASTPOS=4001968;//user.Player3:1968
            _this.ind++;
            //$LASTPOS=4001984;//user.Player3:1984
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
    pause :function _trc_Player3_pause(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4002026;//user.Player3:2026
      _this._th.paused=true;
      //$LASTPOS=4002048;//user.Player3:2048
      _this.print("pause!");
    },
    fiber$pause :function _trc_Player3_f_pause(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4002026;//user.Player3:2026
      _this._th.paused=true;
      //$LASTPOS=4002048;//user.Player3:2048
      _this.print("pause!");
      
      _thread.retVal=_this;return;
    },
    resume :function _trc_Player3_resume(th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4002087;//user.Player3:2087
      _this._th.paused=false;
      //$LASTPOS=4002110;//user.Player3:2110
      _this.print("resume");
    },
    fiber$resume :function _trc_Player3_f_resume(_thread,th) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4002087;//user.Player3:2087
      _this._th.paused=false;
      //$LASTPOS=4002110;//user.Player3:2110
      _this.print("resume");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"stand":{"nowait":false},"walk":{"nowait":false},"damage":{"nowait":false},"jump":{"nowait":false},"anim":{"nowait":false},"pause":{"nowait":false},"resume":{"nowait":false}}}
});
