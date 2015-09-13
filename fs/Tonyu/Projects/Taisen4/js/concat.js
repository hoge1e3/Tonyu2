Tonyu.klass.define({
  fullName: 'user.Bullet',
  shortName: 'Bullet',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Bullet_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000000;//user.Bullet:0
      _this.spd=20;
      //$LASTPOS=1000008;//user.Bullet:8
      _this.scaleX=0.3;
      //$LASTPOS=1000020;//user.Bullet:20
      _this.p=_this.owner.p+12;
      //$LASTPOS=1000034;//user.Bullet:34
      //$LASTPOS=1000038;//user.Bullet:38
      _this.i=0;
      while(_this.i<20) {
        {
          //$LASTPOS=1000058;//user.Bullet:58
          _this.x+=_this.cos(_this.rotation)*_this.spd;
          //$LASTPOS=1000084;//user.Bullet:84
          _this.y+=_this.sin(_this.rotation)*_this.spd;
          //$LASTPOS=1000110;//user.Bullet:110
          if ((_this.c=_this.crashTo(Tonyu.classes.user.Player))&&_this.c!=_this.owner) {
            //$LASTPOS=1000187;//user.Bullet:187
            _this.c.damage();
            break;
            
            
          }
          //$LASTPOS=1000224;//user.Bullet:224
          if (_this.x<0) {
            //$LASTPOS=1000233;//user.Bullet:233
            _this.x+=Tonyu.globals.$w;
          }
          //$LASTPOS=1000244;//user.Bullet:244
          if (_this.x>=Tonyu.globals.$w) {
            //$LASTPOS=1000255;//user.Bullet:255
            _this.x-=Tonyu.globals.$w;
          }
          //$LASTPOS=1000266;//user.Bullet:266
          if (_this.y<0) {
            //$LASTPOS=1000275;//user.Bullet:275
            _this.y+=Tonyu.globals.$h;
          }
          //$LASTPOS=1000286;//user.Bullet:286
          if (_this.y>=Tonyu.globals.$h) {
            //$LASTPOS=1000297;//user.Bullet:297
            _this.y-=Tonyu.globals.$h;
          }
          //$LASTPOS=1000313;//user.Bullet:313
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=1000325;//user.Bullet:325
      _this.die();
    },
    fiber$main :function _trc_Bullet_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Bullet:0
      _this.spd=20;
      //$LASTPOS=1000008;//user.Bullet:8
      _this.scaleX=0.3;
      //$LASTPOS=1000020;//user.Bullet:20
      _this.p=_this.owner.p+12;
      
      _thread.enter(function _trc_Bullet_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000034;//user.Bullet:34
            //$LASTPOS=1000038;//user.Bullet:38
            _this.i=0;;
          case 1:
            if (!(_this.i<20)) { __pc=4; break; }
            //$LASTPOS=1000058;//user.Bullet:58
            _this.x+=_this.cos(_this.rotation)*_this.spd;
            //$LASTPOS=1000084;//user.Bullet:84
            _this.y+=_this.sin(_this.rotation)*_this.spd;
            //$LASTPOS=1000110;//user.Bullet:110
            if (!((_this.c=_this.crashTo(Tonyu.classes.user.Player))&&_this.c!=_this.owner)) { __pc=2; break; }
            //$LASTPOS=1000187;//user.Bullet:187
            _this.c.damage();
            __pc=4; break;
            
          case 2:
            
            //$LASTPOS=1000224;//user.Bullet:224
            if (_this.x<0) {
              //$LASTPOS=1000233;//user.Bullet:233
              _this.x+=Tonyu.globals.$w;
            }
            //$LASTPOS=1000244;//user.Bullet:244
            if (_this.x>=Tonyu.globals.$w) {
              //$LASTPOS=1000255;//user.Bullet:255
              _this.x-=Tonyu.globals.$w;
            }
            //$LASTPOS=1000266;//user.Bullet:266
            if (_this.y<0) {
              //$LASTPOS=1000275;//user.Bullet:275
              _this.y+=Tonyu.globals.$h;
            }
            //$LASTPOS=1000286;//user.Bullet:286
            if (_this.y>=Tonyu.globals.$h) {
              //$LASTPOS=1000297;//user.Bullet:297
              _this.y-=Tonyu.globals.$h;
            }
            //$LASTPOS=1000313;//user.Bullet:313
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            _this.i++;
            __pc=1;break;
          case 4:
            
            //$LASTPOS=1000325;//user.Bullet:325
            _this.die();
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
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var _it_10;
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$w=Tonyu.globals.$screenWidth;
      //$LASTPOS=2000017;//user.Main:17
      Tonyu.globals.$h=Tonyu.globals.$screenHeight;
      //$LASTPOS=2000035;//user.Main:35
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=2000064;//user.Main:64
      _this.k=["q","c","m","p"];
      //$LASTPOS=2000085;//user.Main:85
      //$LASTPOS=2000090;//user.Main:90
      _this.i=0;
      while(_this.i<=3) {
        {
          //$LASTPOS=2000112;//user.Main:112
          new Tonyu.classes.user.Player({x: Tonyu.globals.$w/2,y: Tonyu.globals.$h/2,rotation: 45+_this.i*90,k: _this.k[_this.i],p: _this.i*2});
        }
        _this.i++;
      }
      //$LASTPOS=2000175;//user.Main:175
      _this.text="Ready?";
      //$LASTPOS=2000190;//user.Main:190
      _this.x=Tonyu.globals.$w/2;
      //$LASTPOS=2000198;//user.Main:198
      _this.y=Tonyu.globals.$h/2-100;
      //$LASTPOS=2000210;//user.Main:210
      _this.size=30;
      //$LASTPOS=2000219;//user.Main:219
      _this.updateEx(60);
      //$LASTPOS=2000233;//user.Main:233
      _this.text="Go!";
      //$LASTPOS=2000245;//user.Main:245
      _it_10=Tonyu.iterator(_this.all(Tonyu.classes.user.Player),1);
      while(_it_10.next()) {
        a=_it_10[0];
        
        //$LASTPOS=2000274;//user.Main:274
        a.sendEvent("start");
        
      }
      //$LASTPOS=2000298;//user.Main:298
      _this.updateEx(10);
      //$LASTPOS=2000312;//user.Main:312
      _this.text="";
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var _it_10;
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$w=Tonyu.globals.$screenWidth;
      //$LASTPOS=2000017;//user.Main:17
      Tonyu.globals.$h=Tonyu.globals.$screenHeight;
      //$LASTPOS=2000035;//user.Main:35
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=2000064;//user.Main:64
      _this.k=["q","c","m","p"];
      //$LASTPOS=2000085;//user.Main:85
      //$LASTPOS=2000090;//user.Main:90
      _this.i=0;
      while(_this.i<=3) {
        {
          //$LASTPOS=2000112;//user.Main:112
          new Tonyu.classes.user.Player({x: Tonyu.globals.$w/2,y: Tonyu.globals.$h/2,rotation: 45+_this.i*90,k: _this.k[_this.i],p: _this.i*2});
        }
        _this.i++;
      }
      //$LASTPOS=2000175;//user.Main:175
      _this.text="Ready?";
      //$LASTPOS=2000190;//user.Main:190
      _this.x=Tonyu.globals.$w/2;
      //$LASTPOS=2000198;//user.Main:198
      _this.y=Tonyu.globals.$h/2-100;
      //$LASTPOS=2000210;//user.Main:210
      _this.size=30;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000219;//user.Main:219
            _this.fiber$updateEx(_thread, 60);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2000233;//user.Main:233
            _this.text="Go!";
            //$LASTPOS=2000245;//user.Main:245
            _it_10=Tonyu.iterator(_this.all(Tonyu.classes.user.Player),1);
            while(_it_10.next()) {
              a=_it_10[0];
              
              //$LASTPOS=2000274;//user.Main:274
              a.sendEvent("start");
              
            }
            //$LASTPOS=2000298;//user.Main:298
            _this.fiber$updateEx(_thread, 10);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000312;//user.Main:312
            _this.text="";
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
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000000;//user.Player:0
      _this.spd=5;
      //$LASTPOS=3000007;//user.Player:7
      _this.rspd=5;
      //$LASTPOS=3000015;//user.Player:15
      _this.life=30;
      //$LASTPOS=3000024;//user.Player:24
      _this.t=new Tonyu.classes.kernel.Actor({text: _this.k,size: 20});
      //$LASTPOS=3000053;//user.Player:53
      _this.waitEvent("start");
      //$LASTPOS=3000073;//user.Player:73
      _this.parallel("shot");
      //$LASTPOS=3000091;//user.Player:91
      while (true) {
        //$LASTPOS=3000109;//user.Player:109
        _this.t.x=_this.x;
        //$LASTPOS=3000120;//user.Player:120
        _this.t.y=_this.y-35;
        //$LASTPOS=3000134;//user.Player:134
        _this.t.text=_this.k+" "+_this.life;
        //$LASTPOS=3000157;//user.Player:157
        if (_this.getkey(_this.k)) {
          //$LASTPOS=3000182;//user.Player:182
          _this.rotation+=_this.rspd;
          
        } else {
          //$LASTPOS=3000219;//user.Player:219
          _this.rotation-=_this.rspd;
          
        }
        //$LASTPOS=3000245;//user.Player:245
        _this.x+=_this.cos(_this.rotation)*_this.spd;
        //$LASTPOS=3000271;//user.Player:271
        _this.y+=_this.sin(_this.rotation)*_this.spd;
        //$LASTPOS=3000297;//user.Player:297
        if (_this.x<0) {
          //$LASTPOS=3000306;//user.Player:306
          _this.x+=Tonyu.globals.$w;
        }
        //$LASTPOS=3000317;//user.Player:317
        if (_this.x>=Tonyu.globals.$w) {
          //$LASTPOS=3000328;//user.Player:328
          _this.x-=Tonyu.globals.$w;
        }
        //$LASTPOS=3000339;//user.Player:339
        if (_this.y<0) {
          //$LASTPOS=3000348;//user.Player:348
          _this.y+=Tonyu.globals.$h;
        }
        //$LASTPOS=3000359;//user.Player:359
        if (_this.y>=Tonyu.globals.$h) {
          //$LASTPOS=3000370;//user.Player:370
          _this.y-=Tonyu.globals.$h;
        }
        //$LASTPOS=3000386;//user.Player:386
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Player:0
      _this.spd=5;
      //$LASTPOS=3000007;//user.Player:7
      _this.rspd=5;
      //$LASTPOS=3000015;//user.Player:15
      _this.life=30;
      //$LASTPOS=3000024;//user.Player:24
      _this.t=new Tonyu.classes.kernel.Actor({text: _this.k,size: 20});
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000053;//user.Player:53
            _this.fiber$waitEvent(_thread, "start");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=3000073;//user.Player:73
            _this.parallel("shot");
            //$LASTPOS=3000091;//user.Player:91
          case 2:
            //$LASTPOS=3000109;//user.Player:109
            _this.t.x=_this.x;
            //$LASTPOS=3000120;//user.Player:120
            _this.t.y=_this.y-35;
            //$LASTPOS=3000134;//user.Player:134
            _this.t.text=_this.k+" "+_this.life;
            //$LASTPOS=3000157;//user.Player:157
            if (_this.getkey(_this.k)) {
              //$LASTPOS=3000182;//user.Player:182
              _this.rotation+=_this.rspd;
              
            } else {
              //$LASTPOS=3000219;//user.Player:219
              _this.rotation-=_this.rspd;
              
            }
            //$LASTPOS=3000245;//user.Player:245
            _this.x+=_this.cos(_this.rotation)*_this.spd;
            //$LASTPOS=3000271;//user.Player:271
            _this.y+=_this.sin(_this.rotation)*_this.spd;
            //$LASTPOS=3000297;//user.Player:297
            if (_this.x<0) {
              //$LASTPOS=3000306;//user.Player:306
              _this.x+=Tonyu.globals.$w;
            }
            //$LASTPOS=3000317;//user.Player:317
            if (_this.x>=Tonyu.globals.$w) {
              //$LASTPOS=3000328;//user.Player:328
              _this.x-=Tonyu.globals.$w;
            }
            //$LASTPOS=3000339;//user.Player:339
            if (_this.y<0) {
              //$LASTPOS=3000348;//user.Player:348
              _this.y+=Tonyu.globals.$h;
            }
            //$LASTPOS=3000359;//user.Player:359
            if (_this.y>=Tonyu.globals.$h) {
              //$LASTPOS=3000370;//user.Player:370
              _this.y-=Tonyu.globals.$h;
            }
            //$LASTPOS=3000386;//user.Player:386
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
    shot :function _trc_Player_shot() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000412;//user.Player:412
      while (true) {
        //$LASTPOS=3000435;//user.Player:435
        _this.updateEx(3);
        //$LASTPOS=3000456;//user.Player:456
        new Tonyu.classes.user.Bullet({x: _this.x,y: _this.y,rotation: _this.rotation,owner: _this});
        
      }
    },
    fiber$shot :function _trc_Player_f_shot(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_shot(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000412;//user.Player:412
          case 1:
            //$LASTPOS=3000435;//user.Player:435
            _this.fiber$updateEx(_thread, 3);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=3000456;//user.Player:456
            new Tonyu.classes.user.Bullet({x: _this.x,y: _this.y,rotation: _this.rotation,owner: _this});
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    damage :function _trc_Player_damage() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000517;//user.Player:517
      _this.life--;
      //$LASTPOS=3000529;//user.Player:529
      if (_this.life<=0) {
        //$LASTPOS=3000552;//user.Player:552
        _this.die();
        //$LASTPOS=3000567;//user.Player:567
        _this.t.die();
        //$LASTPOS=3000584;//user.Player:584
        _this.print(_this.k+" is lost");
        
      }
    },
    fiber$damage :function _trc_Player_f_damage(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000517;//user.Player:517
      _this.life--;
      //$LASTPOS=3000529;//user.Player:529
      if (_this.life<=0) {
        //$LASTPOS=3000552;//user.Player:552
        _this.die();
        //$LASTPOS=3000567;//user.Player:567
        _this.t.die();
        //$LASTPOS=3000584;//user.Player:584
        _this.print(_this.k+" is lost");
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"shot":{"nowait":false},"damage":{"nowait":false}}}
});
