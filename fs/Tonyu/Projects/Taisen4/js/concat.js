Tonyu.klass.define({
  fullName: 'user.Bullet',
  shortName: 'Bullet',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Bullet_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000000;//user.Bullet:0
      _this.spd=20;
      //$LASTPOS=45000008;//user.Bullet:8
      _this.scaleX=0.3;
      //$LASTPOS=45000020;//user.Bullet:20
      _this.p=_this.owner.p+12;
      //$LASTPOS=45000034;//user.Bullet:34
      //$LASTPOS=45000038;//user.Bullet:38
      _this.i=0;
      while(_this.i<20) {
        {
          //$LASTPOS=45000058;//user.Bullet:58
          _this.x+=_this.cos(_this.rotation)*_this.spd;
          //$LASTPOS=45000084;//user.Bullet:84
          _this.y+=_this.sin(_this.rotation)*_this.spd;
          //$LASTPOS=45000110;//user.Bullet:110
          if ((_this.c=_this.crashTo(Tonyu.classes.user.Player))&&_this.c!=_this.owner) {
            //$LASTPOS=45000187;//user.Bullet:187
            _this.c.damage();
            break;
            
            
          }
          //$LASTPOS=45000224;//user.Bullet:224
          if (_this.x<0) {
            //$LASTPOS=45000233;//user.Bullet:233
            _this.x+=Tonyu.globals.$w;
          }
          //$LASTPOS=45000244;//user.Bullet:244
          if (_this.x>=Tonyu.globals.$w) {
            //$LASTPOS=45000255;//user.Bullet:255
            _this.x-=Tonyu.globals.$w;
          }
          //$LASTPOS=45000266;//user.Bullet:266
          if (_this.y<0) {
            //$LASTPOS=45000275;//user.Bullet:275
            _this.y+=Tonyu.globals.$h;
          }
          //$LASTPOS=45000286;//user.Bullet:286
          if (_this.y>=Tonyu.globals.$h) {
            //$LASTPOS=45000297;//user.Bullet:297
            _this.y-=Tonyu.globals.$h;
          }
          //$LASTPOS=45000313;//user.Bullet:313
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=45000325;//user.Bullet:325
      _this.die();
    },
    fiber$main :function _trc_Bullet_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000000;//user.Bullet:0
      _this.spd=20;
      //$LASTPOS=45000008;//user.Bullet:8
      _this.scaleX=0.3;
      //$LASTPOS=45000020;//user.Bullet:20
      _this.p=_this.owner.p+12;
      
      _thread.enter(function _trc_Bullet_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000034;//user.Bullet:34
            //$LASTPOS=45000038;//user.Bullet:38
            _this.i=0;;
          case 1:
            if (!(_this.i<20)) { __pc=4; break; }
            //$LASTPOS=45000058;//user.Bullet:58
            _this.x+=_this.cos(_this.rotation)*_this.spd;
            //$LASTPOS=45000084;//user.Bullet:84
            _this.y+=_this.sin(_this.rotation)*_this.spd;
            //$LASTPOS=45000110;//user.Bullet:110
            if (!((_this.c=_this.crashTo(Tonyu.classes.user.Player))&&_this.c!=_this.owner)) { __pc=2; break; }
            //$LASTPOS=45000187;//user.Bullet:187
            _this.c.damage();
            __pc=4; break;
            
          case 2:
            
            //$LASTPOS=45000224;//user.Bullet:224
            if (_this.x<0) {
              //$LASTPOS=45000233;//user.Bullet:233
              _this.x+=Tonyu.globals.$w;
            }
            //$LASTPOS=45000244;//user.Bullet:244
            if (_this.x>=Tonyu.globals.$w) {
              //$LASTPOS=45000255;//user.Bullet:255
              _this.x-=Tonyu.globals.$w;
            }
            //$LASTPOS=45000266;//user.Bullet:266
            if (_this.y<0) {
              //$LASTPOS=45000275;//user.Bullet:275
              _this.y+=Tonyu.globals.$h;
            }
            //$LASTPOS=45000286;//user.Bullet:286
            if (_this.y>=Tonyu.globals.$h) {
              //$LASTPOS=45000297;//user.Bullet:297
              _this.y-=Tonyu.globals.$h;
            }
            //$LASTPOS=45000313;//user.Bullet:313
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            _this.i++;
            __pc=1;break;
          case 4:
            
            //$LASTPOS=45000325;//user.Bullet:325
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
      "use strict";
      var _this=this;
      var a;
      var _it_328;
      
      //$LASTPOS=46000010;//user.Main:10
      Tonyu.globals.$w=Tonyu.globals.$screenWidth;
      //$LASTPOS=46000027;//user.Main:27
      Tonyu.globals.$h=Tonyu.globals.$screenHeight;
      //$LASTPOS=46000045;//user.Main:45
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=46000074;//user.Main:74
      _this.k=["q","c","m","p"];
      //$LASTPOS=46000095;//user.Main:95
      //$LASTPOS=46000100;//user.Main:100
      _this.i=0;
      while(_this.i<=3) {
        {
          //$LASTPOS=46000122;//user.Main:122
          new Tonyu.classes.user.Player({x: Tonyu.globals.$w/2,y: Tonyu.globals.$h/2,rotation: 45+_this.i*90,k: _this.k[_this.i],p: _this.i*2});
        }
        _this.i++;
      }
      //$LASTPOS=46000185;//user.Main:185
      _this.font='MS UI Gothic';
      //$LASTPOS=46000206;//user.Main:206
      _this.text="準備はよいか?";
      //$LASTPOS=46000222;//user.Main:222
      _this.x=Tonyu.globals.$w/2;
      //$LASTPOS=46000230;//user.Main:230
      _this.y=Tonyu.globals.$h/2-100;
      //$LASTPOS=46000242;//user.Main:242
      _this.size=30;
      //$LASTPOS=46000251;//user.Main:251
      _this.updateEx(60);
      //$LASTPOS=46000265;//user.Main:265
      _this.text="開始!";
      //$LASTPOS=46000277;//user.Main:277
      _it_328=Tonyu.iterator(_this.all(Tonyu.classes.user.Player),1);
      while(_it_328.next()) {
        a=_it_328[0];
        
        //$LASTPOS=46000306;//user.Main:306
        a.sendEvent("start");
        
      }
      //$LASTPOS=46000330;//user.Main:330
      _this.updateEx(10);
      //$LASTPOS=46000344;//user.Main:344
      _this.text="";
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var _it_328;
      
      //$LASTPOS=46000010;//user.Main:10
      Tonyu.globals.$w=Tonyu.globals.$screenWidth;
      //$LASTPOS=46000027;//user.Main:27
      Tonyu.globals.$h=Tonyu.globals.$screenHeight;
      //$LASTPOS=46000045;//user.Main:45
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=46000074;//user.Main:74
      _this.k=["q","c","m","p"];
      //$LASTPOS=46000095;//user.Main:95
      //$LASTPOS=46000100;//user.Main:100
      _this.i=0;
      while(_this.i<=3) {
        {
          //$LASTPOS=46000122;//user.Main:122
          new Tonyu.classes.user.Player({x: Tonyu.globals.$w/2,y: Tonyu.globals.$h/2,rotation: 45+_this.i*90,k: _this.k[_this.i],p: _this.i*2});
        }
        _this.i++;
      }
      //$LASTPOS=46000185;//user.Main:185
      _this.font='MS UI Gothic';
      //$LASTPOS=46000206;//user.Main:206
      _this.text="準備はよいか?";
      //$LASTPOS=46000222;//user.Main:222
      _this.x=Tonyu.globals.$w/2;
      //$LASTPOS=46000230;//user.Main:230
      _this.y=Tonyu.globals.$h/2-100;
      //$LASTPOS=46000242;//user.Main:242
      _this.size=30;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000251;//user.Main:251
            _this.fiber$updateEx(_thread, 60);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46000265;//user.Main:265
            _this.text="開始!";
            //$LASTPOS=46000277;//user.Main:277
            _it_328=Tonyu.iterator(_this.all(Tonyu.classes.user.Player),1);
            while(_it_328.next()) {
              a=_it_328[0];
              
              //$LASTPOS=46000306;//user.Main:306
              a.sendEvent("start");
              
            }
            //$LASTPOS=46000330;//user.Main:330
            _this.fiber$updateEx(_thread, 10);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=46000344;//user.Main:344
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000000;//user.Player:0
      _this.spd=5;
      //$LASTPOS=47000007;//user.Player:7
      _this.rspd=5;
      //$LASTPOS=47000015;//user.Player:15
      _this.life=30;
      //$LASTPOS=47000024;//user.Player:24
      _this.t=new Tonyu.classes.kernel.Actor({text: _this.k,size: 20});
      //$LASTPOS=47000053;//user.Player:53
      _this.waitEvent("start");
      //$LASTPOS=47000073;//user.Player:73
      _this.parallel("shot");
      //$LASTPOS=47000091;//user.Player:91
      while (true) {
        //$LASTPOS=47000109;//user.Player:109
        _this.t.x=_this.x;
        //$LASTPOS=47000120;//user.Player:120
        _this.t.y=_this.y-35;
        //$LASTPOS=47000134;//user.Player:134
        _this.t.text=_this.k+" "+_this.life;
        //$LASTPOS=47000157;//user.Player:157
        if (_this.getkey(_this.k)) {
          //$LASTPOS=47000182;//user.Player:182
          _this.rotation+=_this.rspd;
          
        } else {
          //$LASTPOS=47000219;//user.Player:219
          _this.rotation-=_this.rspd;
          
        }
        //$LASTPOS=47000245;//user.Player:245
        _this.x+=_this.cos(_this.rotation)*_this.spd;
        //$LASTPOS=47000271;//user.Player:271
        _this.y+=_this.sin(_this.rotation)*_this.spd;
        //$LASTPOS=47000297;//user.Player:297
        if (_this.x<0) {
          //$LASTPOS=47000306;//user.Player:306
          _this.x+=Tonyu.globals.$w;
        }
        //$LASTPOS=47000317;//user.Player:317
        if (_this.x>=Tonyu.globals.$w) {
          //$LASTPOS=47000328;//user.Player:328
          _this.x-=Tonyu.globals.$w;
        }
        //$LASTPOS=47000339;//user.Player:339
        if (_this.y<0) {
          //$LASTPOS=47000348;//user.Player:348
          _this.y+=Tonyu.globals.$h;
        }
        //$LASTPOS=47000359;//user.Player:359
        if (_this.y>=Tonyu.globals.$h) {
          //$LASTPOS=47000370;//user.Player:370
          _this.y-=Tonyu.globals.$h;
        }
        //$LASTPOS=47000386;//user.Player:386
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000000;//user.Player:0
      _this.spd=5;
      //$LASTPOS=47000007;//user.Player:7
      _this.rspd=5;
      //$LASTPOS=47000015;//user.Player:15
      _this.life=30;
      //$LASTPOS=47000024;//user.Player:24
      _this.t=new Tonyu.classes.kernel.Actor({text: _this.k,size: 20});
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000053;//user.Player:53
            _this.fiber$waitEvent(_thread, "start");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=47000073;//user.Player:73
            _this.parallel("shot");
            //$LASTPOS=47000091;//user.Player:91
          case 2:
            //$LASTPOS=47000109;//user.Player:109
            _this.t.x=_this.x;
            //$LASTPOS=47000120;//user.Player:120
            _this.t.y=_this.y-35;
            //$LASTPOS=47000134;//user.Player:134
            _this.t.text=_this.k+" "+_this.life;
            //$LASTPOS=47000157;//user.Player:157
            if (_this.getkey(_this.k)) {
              //$LASTPOS=47000182;//user.Player:182
              _this.rotation+=_this.rspd;
              
            } else {
              //$LASTPOS=47000219;//user.Player:219
              _this.rotation-=_this.rspd;
              
            }
            //$LASTPOS=47000245;//user.Player:245
            _this.x+=_this.cos(_this.rotation)*_this.spd;
            //$LASTPOS=47000271;//user.Player:271
            _this.y+=_this.sin(_this.rotation)*_this.spd;
            //$LASTPOS=47000297;//user.Player:297
            if (_this.x<0) {
              //$LASTPOS=47000306;//user.Player:306
              _this.x+=Tonyu.globals.$w;
            }
            //$LASTPOS=47000317;//user.Player:317
            if (_this.x>=Tonyu.globals.$w) {
              //$LASTPOS=47000328;//user.Player:328
              _this.x-=Tonyu.globals.$w;
            }
            //$LASTPOS=47000339;//user.Player:339
            if (_this.y<0) {
              //$LASTPOS=47000348;//user.Player:348
              _this.y+=Tonyu.globals.$h;
            }
            //$LASTPOS=47000359;//user.Player:359
            if (_this.y>=Tonyu.globals.$h) {
              //$LASTPOS=47000370;//user.Player:370
              _this.y-=Tonyu.globals.$h;
            }
            //$LASTPOS=47000386;//user.Player:386
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000412;//user.Player:412
      while (true) {
        //$LASTPOS=47000435;//user.Player:435
        _this.updateEx(3);
        //$LASTPOS=47000456;//user.Player:456
        new Tonyu.classes.user.Bullet({x: _this.x,y: _this.y,rotation: _this.rotation,owner: _this});
        
      }
    },
    fiber$shot :function _trc_Player_f_shot(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_shot(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000412;//user.Player:412
          case 1:
            //$LASTPOS=47000435;//user.Player:435
            _this.fiber$updateEx(_thread, 3);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=47000456;//user.Player:456
            new Tonyu.classes.user.Bullet({x: _this.x,y: _this.y,rotation: _this.rotation,owner: _this});
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    damage :function _trc_Player_damage() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000517;//user.Player:517
      _this.life--;
      //$LASTPOS=47000529;//user.Player:529
      if (_this.life<=0) {
        //$LASTPOS=47000552;//user.Player:552
        _this.die();
        //$LASTPOS=47000567;//user.Player:567
        _this.t.die();
        //$LASTPOS=47000584;//user.Player:584
        _this.print(_this.k+" is lost");
        
      }
    },
    fiber$damage :function _trc_Player_f_damage(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000517;//user.Player:517
      _this.life--;
      //$LASTPOS=47000529;//user.Player:529
      if (_this.life<=0) {
        //$LASTPOS=47000552;//user.Player:552
        _this.die();
        //$LASTPOS=47000567;//user.Player:567
        _this.t.die();
        //$LASTPOS=47000584;//user.Player:584
        _this.print(_this.k+" is lost");
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"shot":{"nowait":false},"damage":{"nowait":false}}}
});
