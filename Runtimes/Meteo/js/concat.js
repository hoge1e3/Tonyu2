Tonyu.klass.define({
  fullName: 'user.Bomb',
  shortName: 'Bomb',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.DxChar,
  includes: [],
  methods: {
    main :function _trc_Bomb_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000026;//user.Bomb:26
      _this.scaleX=0.5;
      //$LASTPOS=1000039;//user.Bomb:39
      _this.zOrder=- 1000;
      //$LASTPOS=1000054;//user.Bomb:54
      while (_this.scaleX<2.5) {
        //$LASTPOS=1000080;//user.Bomb:80
        _this.scaleX+=0.1;
        //$LASTPOS=1000107;//user.Bomb:107
        _this.alpha=(3-_this.scaleX)*128;
        //$LASTPOS=1000149;//user.Bomb:149
        _this.update();
        
      }
    },
    fiber$main :function _trc_Bomb_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000026;//user.Bomb:26
      _this.scaleX=0.5;
      //$LASTPOS=1000039;//user.Bomb:39
      _this.zOrder=- 1000;
      
      _thread.enter(function _trc_Bomb_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000054;//user.Bomb:54
          case 1:
            if (!(_this.scaleX<2.5)) { __pc=3; break; }
            //$LASTPOS=1000080;//user.Bomb:80
            _this.scaleX+=0.1;
            //$LASTPOS=1000107;//user.Bomb:107
            _this.alpha=(3-_this.scaleX)*128;
            //$LASTPOS=1000149;//user.Bomb:149
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
  fullName: 'user.DropApp',
  shortName: 'DropApp',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SecretChar,
  includes: [],
  methods: {
    main :function _trc_DropApp_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000033;//user.DropApp:33
      Tonyu.globals.$Screen.setBGColor(_this.color(0,0,60));
      //$LASTPOS=2000069;//user.DropApp:69
      _this.w=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=2000086;//user.DropApp:86
      _this.h=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=2000121;//user.DropApp:121
      _this.shc=0;
      //$LASTPOS=2000129;//user.DropApp:129
      while (1) {
        //$LASTPOS=2000146;//user.DropApp:146
        if (_this.shc<20) {
          //$LASTPOS=2000197;//user.DropApp:197
          _this.shc+=1;
          //$LASTPOS=2000214;//user.DropApp:214
          _this.appear(new Tonyu.classes.user.ShStar(_this.x,_this.y));
          
        }
        //$LASTPOS=2000252;//user.DropApp:252
        _this.rest=(1-Tonyu.globals.$score/50000);
        //$LASTPOS=2000280;//user.DropApp:280
        if (_this.rest<0) {
          //$LASTPOS=2000292;//user.DropApp:292
          _this.rest=0;
        }
        //$LASTPOS=2000332;//user.DropApp:332
        if (_this.rnd(50*_this.rest*_this.rest)==0) {
          //$LASTPOS=2000369;//user.DropApp:369
          _this.appear(new Tonyu.classes.user.Drops(_this.w+(_this.rnd()-0.5)*_this.w*0.25,_this.h+(_this.rnd()-0.5)*_this.w*0.25,Tonyu.globals.$pat_Inseki+0));
          
        }
        //$LASTPOS=2000633;//user.DropApp:633
        _this.update();
        
      }
    },
    fiber$main :function _trc_DropApp_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000033;//user.DropApp:33
      Tonyu.globals.$Screen.setBGColor(_this.color(0,0,60));
      //$LASTPOS=2000069;//user.DropApp:69
      _this.w=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=2000086;//user.DropApp:86
      _this.h=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=2000121;//user.DropApp:121
      _this.shc=0;
      
      _thread.enter(function _trc_DropApp_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000129;//user.DropApp:129
          case 1:
            if (!(1)) { __pc=7; break; }
            //$LASTPOS=2000146;//user.DropApp:146
            if (!(_this.shc<20)) { __pc=3; break; }
            //$LASTPOS=2000197;//user.DropApp:197
            _this.shc+=1;
            //$LASTPOS=2000214;//user.DropApp:214
            _this.fiber$appear(_thread, new Tonyu.classes.user.ShStar(_this.x,_this.y));
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=2000252;//user.DropApp:252
            _this.rest=(1-Tonyu.globals.$score/50000);
            //$LASTPOS=2000280;//user.DropApp:280
            if (_this.rest<0) {
              //$LASTPOS=2000292;//user.DropApp:292
              _this.rest=0;
            }
            //$LASTPOS=2000332;//user.DropApp:332
            if (!(_this.rnd(50*_this.rest*_this.rest)==0)) { __pc=5; break; }
            //$LASTPOS=2000369;//user.DropApp:369
            _this.fiber$appear(_thread, new Tonyu.classes.user.Drops(_this.w+(_this.rnd()-0.5)*_this.w*0.25,_this.h+(_this.rnd()-0.5)*_this.w*0.25,Tonyu.globals.$pat_Inseki+0));
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=2000633;//user.DropApp:633
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
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Drops',
  shortName: 'Drops',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.DxChar,
  includes: [],
  methods: {
    main :function _trc_Drops_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000045;//user.Drops:45
      _this.z=1000;
      //$LASTPOS=3000069;//user.Drops:69
      _this.x2=(_this.x-Tonyu.globals.$screenWidth/2)*_this.z;
      //$LASTPOS=3000095;//user.Drops:95
      _this.y2=(_this.y-Tonyu.globals.$screenHeight/2)*_this.z;
      //$LASTPOS=3000122;//user.Drops:122
      _this.apz=_this.rnd(300);
      //$LASTPOS=3000137;//user.Drops:137
      _this.va=_this.rnd(10)+1;
      //$LASTPOS=3000152;//user.Drops:152
      _this.vx=_this.vy=_this.vz=_this.scad=0;
      //$LASTPOS=3000170;//user.Drops:170
      while (_this.z>100) {
        //$LASTPOS=3000227;//user.Drops:227
        _this.x=Tonyu.globals.$screenWidth/2+_this.x2/_this.z;
        //$LASTPOS=3000258;//user.Drops:258
        _this.y=Tonyu.globals.$screenHeight/2+_this.y2/_this.z;
        //$LASTPOS=3000317;//user.Drops:317
        _this.zOrder=- 1000+_this.z;
        //$LASTPOS=3000349;//user.Drops:349
        _this.z+=_this.vz;
        //$LASTPOS=3000355;//user.Drops:355
        _this.x2+=_this.vx;
        //$LASTPOS=3000362;//user.Drops:362
        _this.y2+=_this.vy;
        //$LASTPOS=3000375;//user.Drops:375
        _this.vz-=0.5;
        //$LASTPOS=3000383;//user.Drops:383
        _this.vz=_this.vz*0.99;
        //$LASTPOS=3000430;//user.Drops:430
        _this.scaleX=200/_this.z;
        //$LASTPOS=3000462;//user.Drops:462
        _this.angle+=_this.va;
        //$LASTPOS=3000478;//user.Drops:478
        if (! _this.plc&&_this.z<900) {
          //$LASTPOS=3000508;//user.Drops:508
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass0);
          //$LASTPOS=3000543;//user.Drops:543
          _this.plc=1;
          
        }
        //$LASTPOS=3000564;//user.Drops:564
        if (! (Tonyu.globals.$Fighter.dying)&&_this.z>150&&_this.z<150-_this.vz) {
          //$LASTPOS=3000768;//user.Drops:768
          _this.di=_this.dist(_this.x-Tonyu.globals.$Fighter.x,_this.y-Tonyu.globals.$Fighter.y)*0.1-3;
          //$LASTPOS=3000835;//user.Drops:835
          if (_this.di<0.5) {
            //$LASTPOS=3000847;//user.Drops:847
            Tonyu.globals.$Fighter.dying=1;
          }
          //$LASTPOS=3000878;//user.Drops:878
          if (_this.di>0.1) {
            //$LASTPOS=3000890;//user.Drops:890
            _this.scad=_this.trunc(10000/_this.di/_this.di);
          }
          //$LASTPOS=3000930;//user.Drops:930
          if (_this.scad>300) {
            //$LASTPOS=3000948;//user.Drops:948
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass3);
          } else {
            //$LASTPOS=3000992;//user.Drops:992
            if (_this.scad>200) {
              //$LASTPOS=3001006;//user.Drops:1006
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass2);
            } else {
              //$LASTPOS=3001051;//user.Drops:1051
              if (_this.scad>50) {
                //$LASTPOS=3001064;//user.Drops:1064
                Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass1);
              }
            }
          }
          //$LASTPOS=3001104;//user.Drops:1104
          _this.appear(new Tonyu.classes.user.Score(_this.x,_this.y,_this.scad));
          //$LASTPOS=3001146;//user.Drops:1146
          Tonyu.globals.$score+=_this.scad;
          
        }
        //$LASTPOS=3001205;//user.Drops:1205
        _this.update();
        
      }
    },
    fiber$main :function _trc_Drops_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000045;//user.Drops:45
      _this.z=1000;
      //$LASTPOS=3000069;//user.Drops:69
      _this.x2=(_this.x-Tonyu.globals.$screenWidth/2)*_this.z;
      //$LASTPOS=3000095;//user.Drops:95
      _this.y2=(_this.y-Tonyu.globals.$screenHeight/2)*_this.z;
      //$LASTPOS=3000122;//user.Drops:122
      _this.apz=_this.rnd(300);
      //$LASTPOS=3000137;//user.Drops:137
      _this.va=_this.rnd(10)+1;
      //$LASTPOS=3000152;//user.Drops:152
      _this.vx=_this.vy=_this.vz=_this.scad=0;
      
      _thread.enter(function _trc_Drops_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000170;//user.Drops:170
          case 1:
            if (!(_this.z>100)) { __pc=5; break; }
            //$LASTPOS=3000227;//user.Drops:227
            _this.x=Tonyu.globals.$screenWidth/2+_this.x2/_this.z;
            //$LASTPOS=3000258;//user.Drops:258
            _this.y=Tonyu.globals.$screenHeight/2+_this.y2/_this.z;
            //$LASTPOS=3000317;//user.Drops:317
            _this.zOrder=- 1000+_this.z;
            //$LASTPOS=3000349;//user.Drops:349
            _this.z+=_this.vz;
            //$LASTPOS=3000355;//user.Drops:355
            _this.x2+=_this.vx;
            //$LASTPOS=3000362;//user.Drops:362
            _this.y2+=_this.vy;
            //$LASTPOS=3000375;//user.Drops:375
            _this.vz-=0.5;
            //$LASTPOS=3000383;//user.Drops:383
            _this.vz=_this.vz*0.99;
            //$LASTPOS=3000430;//user.Drops:430
            _this.scaleX=200/_this.z;
            //$LASTPOS=3000462;//user.Drops:462
            _this.angle+=_this.va;
            //$LASTPOS=3000478;//user.Drops:478
            if (! _this.plc&&_this.z<900) {
              //$LASTPOS=3000508;//user.Drops:508
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass0);
              //$LASTPOS=3000543;//user.Drops:543
              _this.plc=1;
              
            }
            //$LASTPOS=3000564;//user.Drops:564
            if (!(! (Tonyu.globals.$Fighter.dying)&&_this.z>150&&_this.z<150-_this.vz)) { __pc=3; break; }
            //$LASTPOS=3000768;//user.Drops:768
            _this.di=_this.dist(_this.x-Tonyu.globals.$Fighter.x,_this.y-Tonyu.globals.$Fighter.y)*0.1-3;
            //$LASTPOS=3000835;//user.Drops:835
            if (_this.di<0.5) {
              //$LASTPOS=3000847;//user.Drops:847
              Tonyu.globals.$Fighter.dying=1;
            }
            //$LASTPOS=3000878;//user.Drops:878
            if (_this.di>0.1) {
              //$LASTPOS=3000890;//user.Drops:890
              _this.scad=_this.trunc(10000/_this.di/_this.di);
            }
            //$LASTPOS=3000930;//user.Drops:930
            if (_this.scad>300) {
              //$LASTPOS=3000948;//user.Drops:948
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass3);
            } else {
              //$LASTPOS=3000992;//user.Drops:992
              if (_this.scad>200) {
                //$LASTPOS=3001006;//user.Drops:1006
                Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass2);
              } else {
                //$LASTPOS=3001051;//user.Drops:1051
                if (_this.scad>50) {
                  //$LASTPOS=3001064;//user.Drops:1064
                  Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pass1);
                }
              }
            }
            //$LASTPOS=3001104;//user.Drops:1104
            _this.fiber$appear(_thread, new Tonyu.classes.user.Score(_this.x,_this.y,_this.scad));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=3001146;//user.Drops:1146
            Tonyu.globals.$score+=_this.scad;
          case 3:
            
            //$LASTPOS=3001205;//user.Drops:1205
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
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
  fullName: 'user.Fighter',
  shortName: 'Fighter',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.DxChar,
  includes: [],
  methods: {
    main :function _trc_Fighter_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=4000108;//user.Fighter:108
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_Fighter);
      //$LASTPOS=4000137;//user.Fighter:137
      _this.pa=_this.p;
      //$LASTPOS=4000144;//user.Fighter:144
      _this.an=0;
      //$LASTPOS=4000164;//user.Fighter:164
      Tonyu.globals.$score=0;
      //$LASTPOS=4000175;//user.Fighter:175
      _this.sx=_this.x;
      //$LASTPOS=4000180;//user.Fighter:180
      _this.sy=_this.y;
      //$LASTPOS=4000187;//user.Fighter:187
      _this.vx=_this.vy=0;
      //$LASTPOS=4000197;//user.Fighter:197
      _this.dying=1;
      //$LASTPOS=4000207;//user.Fighter:207
      while (1) {
        //$LASTPOS=4000223;//user.Fighter:223
        _this.y=- 100;
        //$LASTPOS=4000236;//user.Fighter:236
        _this.vx=0;
        //$LASTPOS=4000275;//user.Fighter:275
        while (! _this.getkey(32)) {
          //$LASTPOS=4000305;//user.Fighter:305
          _this.drawText(174,163,"Press Space Key",Tonyu.globals.$clWhite,20,- 200);
          //$LASTPOS=4000371;//user.Fighter:371
          _this.update();
          
        }
        //$LASTPOS=4000397;//user.Fighter:397
        if (! _this.getkey("c")) {
          //$LASTPOS=4000415;//user.Fighter:415
          Tonyu.globals.$score=0;
        }
        //$LASTPOS=4000430;//user.Fighter:430
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_start);
        //$LASTPOS=4000478;//user.Fighter:478
        _this.scaleX=2;
        //$LASTPOS=4000502;//user.Fighter:502
        while (_this.scaleX>1) {
          //$LASTPOS=4000529;//user.Fighter:529
          _this.x=_this.sx+(_this.scaleX-1)*200;
          //$LASTPOS=4000559;//user.Fighter:559
          _this.y=_this.sy-(_this.scaleX-1)*200;
          //$LASTPOS=4000604;//user.Fighter:604
          _this.angle=- (_this.scaleX-1)*50;
          //$LASTPOS=4000636;//user.Fighter:636
          _this.scaleX=(_this.scaleX-0.93)*0.95+0.93;
          //$LASTPOS=4000678;//user.Fighter:678
          _this.update();
          
        }
        //$LASTPOS=4000728;//user.Fighter:728
        _this.scaleX=1;
        //$LASTPOS=4000743;//user.Fighter:743
        _this.dying=0;
        //$LASTPOS=4000780;//user.Fighter:780
        while (! _this.dying) {
          //$LASTPOS=4000878;//user.Fighter:878
          if (_this.getkey(39)>0&&_this.x<Tonyu.globals.$screenWidth-70) {
            //$LASTPOS=4000917;//user.Fighter:917
            _this.vx+=1;
          }
          //$LASTPOS=4000933;//user.Fighter:933
          if (_this.getkey(37)>0&&_this.x>70) {
            //$LASTPOS=4000959;//user.Fighter:959
            _this.vx+=- 1;
          }
          //$LASTPOS=4000977;//user.Fighter:977
          if (_this.getkey(40)>0&&_this.y<Tonyu.globals.$screenHeight-70) {
            //$LASTPOS=4001017;//user.Fighter:1017
            _this.vy+=1;
          }
          //$LASTPOS=4001033;//user.Fighter:1033
          if (_this.getkey(38)>0&&_this.y>70) {
            //$LASTPOS=4001059;//user.Fighter:1059
            _this.vy+=- 1;
          }
          //$LASTPOS=4001076;//user.Fighter:1076
          _this.x+=_this.vx;
          //$LASTPOS=4001083;//user.Fighter:1083
          _this.y+=_this.vy;
          //$LASTPOS=4001099;//user.Fighter:1099
          _this.vx=_this.vx*0.8;
          //$LASTPOS=4001109;//user.Fighter:1109
          _this.vy=_this.vy*0.8;
          //$LASTPOS=4001131;//user.Fighter:1131
          _this.angle=_this.vx*10;
          //$LASTPOS=4001174;//user.Fighter:1174
          _this.update();
          
        }
        //$LASTPOS=4001207;//user.Fighter:1207
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
        //$LASTPOS=4001236;//user.Fighter:1236
        _this.appear(new Tonyu.classes.user.Bomb(_this.x,_this.y,Tonyu.globals.$pat_bomb+0));
        
      }
    },
    fiber$main :function _trc_Fighter_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000108;//user.Fighter:108
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_Fighter);
      //$LASTPOS=4000137;//user.Fighter:137
      _this.pa=_this.p;
      //$LASTPOS=4000144;//user.Fighter:144
      _this.an=0;
      //$LASTPOS=4000164;//user.Fighter:164
      Tonyu.globals.$score=0;
      //$LASTPOS=4000175;//user.Fighter:175
      _this.sx=_this.x;
      //$LASTPOS=4000180;//user.Fighter:180
      _this.sy=_this.y;
      //$LASTPOS=4000187;//user.Fighter:187
      _this.vx=_this.vy=0;
      //$LASTPOS=4000197;//user.Fighter:197
      _this.dying=1;
      
      _thread.enter(function _trc_Fighter_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000207;//user.Fighter:207
          case 1:
            if (!(1)) { __pc=12; break; }
            //$LASTPOS=4000223;//user.Fighter:223
            _this.y=- 100;
            //$LASTPOS=4000236;//user.Fighter:236
            _this.vx=0;
            //$LASTPOS=4000275;//user.Fighter:275
          case 2:
            if (!(! _this.getkey(32))) { __pc=4; break; }
            //$LASTPOS=4000305;//user.Fighter:305
            _this.drawText(174,163,"Press Space Key",Tonyu.globals.$clWhite,20,- 200);
            //$LASTPOS=4000371;//user.Fighter:371
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=4000397;//user.Fighter:397
            if (! _this.getkey("c")) {
              //$LASTPOS=4000415;//user.Fighter:415
              Tonyu.globals.$score=0;
            }
            //$LASTPOS=4000430;//user.Fighter:430
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_start);
            //$LASTPOS=4000478;//user.Fighter:478
            _this.scaleX=2;
            //$LASTPOS=4000502;//user.Fighter:502
          case 5:
            if (!(_this.scaleX>1)) { __pc=7; break; }
            //$LASTPOS=4000529;//user.Fighter:529
            _this.x=_this.sx+(_this.scaleX-1)*200;
            //$LASTPOS=4000559;//user.Fighter:559
            _this.y=_this.sy-(_this.scaleX-1)*200;
            //$LASTPOS=4000604;//user.Fighter:604
            _this.angle=- (_this.scaleX-1)*50;
            //$LASTPOS=4000636;//user.Fighter:636
            _this.scaleX=(_this.scaleX-0.93)*0.95+0.93;
            //$LASTPOS=4000678;//user.Fighter:678
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=4000728;//user.Fighter:728
            _this.scaleX=1;
            //$LASTPOS=4000743;//user.Fighter:743
            _this.dying=0;
            //$LASTPOS=4000780;//user.Fighter:780
          case 8:
            if (!(! _this.dying)) { __pc=10; break; }
            //$LASTPOS=4000878;//user.Fighter:878
            if (_this.getkey(39)>0&&_this.x<Tonyu.globals.$screenWidth-70) {
              //$LASTPOS=4000917;//user.Fighter:917
              _this.vx+=1;
            }
            //$LASTPOS=4000933;//user.Fighter:933
            if (_this.getkey(37)>0&&_this.x>70) {
              //$LASTPOS=4000959;//user.Fighter:959
              _this.vx+=- 1;
            }
            //$LASTPOS=4000977;//user.Fighter:977
            if (_this.getkey(40)>0&&_this.y<Tonyu.globals.$screenHeight-70) {
              //$LASTPOS=4001017;//user.Fighter:1017
              _this.vy+=1;
            }
            //$LASTPOS=4001033;//user.Fighter:1033
            if (_this.getkey(38)>0&&_this.y>70) {
              //$LASTPOS=4001059;//user.Fighter:1059
              _this.vy+=- 1;
            }
            //$LASTPOS=4001076;//user.Fighter:1076
            _this.x+=_this.vx;
            //$LASTPOS=4001083;//user.Fighter:1083
            _this.y+=_this.vy;
            //$LASTPOS=4001099;//user.Fighter:1099
            _this.vx=_this.vx*0.8;
            //$LASTPOS=4001109;//user.Fighter:1109
            _this.vy=_this.vy*0.8;
            //$LASTPOS=4001131;//user.Fighter:1131
            _this.angle=_this.vx*10;
            //$LASTPOS=4001174;//user.Fighter:1174
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=8;break;
          case 10:
            
            //$LASTPOS=4001207;//user.Fighter:1207
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
            //$LASTPOS=4001236;//user.Fighter:1236
            _this.fiber$appear(_thread, new Tonyu.classes.user.Bomb(_this.x,_this.y,Tonyu.globals.$pat_bomb+0));
            __pc=11;return;
          case 11:
            
            __pc=1;break;
          case 12:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_Fighter_onUpdate() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=4000061;//user.Fighter:61
      _this.p=_this.pa+_this.trunc(_this.an/2);
      //$LASTPOS=4000084;//user.Fighter:84
      _this.an=(_this.an+1)%4;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onUpdate":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Page_index',
  shortName: 'Page_index',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.T1Page,
  includes: [],
  methods: {
    main :function _trc_Page_index_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=5000016;//user.Page_index:16
      _this.initGlobals();
      //$LASTPOS=5000050;//user.Page_index:50
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=5000074;//user.Page_index:74
      Tonyu.globals.$Drops=new Tonyu.classes.user.Drops({angle: 45,alpha: 200,p: Tonyu.globals.$pat_Inseki+0,scalex: 1,x: 75,y: 282});
      //$LASTPOS=5000160;//user.Page_index:160
      Tonyu.globals.$DropApp=new Tonyu.classes.user.DropApp({pat: 17,x: 391,y: 70});
      //$LASTPOS=5000207;//user.Page_index:207
      Tonyu.globals.$Fighter=new Tonyu.classes.user.Fighter({p: Tonyu.globals.$pat_sentouki+0,alpha: 255,angle: 0,zOrder: - 1000,scaleX: 1,scaleY: 1,x: 283,y: 309});
      //$LASTPOS=5000326;//user.Page_index:326
      Tonyu.globals.$ShStar=new Tonyu.classes.user.ShStar({pat: 17,x: 174,y: 163});
      //$LASTPOS=5000372;//user.Page_index:372
      Tonyu.globals.$ScoreDisp=new Tonyu.classes.user.ScoreDisp({text: "テキスト",col: Tonyu.globals.$clWhite,size: 20,x: 25,y: 16});
    },
    fiber$main :function _trc_Page_index_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Page_index_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000016;//user.Page_index:16
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=5000050;//user.Page_index:50
            Tonyu.globals.$Boot.setFrameRate(60);
            //$LASTPOS=5000074;//user.Page_index:74
            Tonyu.globals.$Drops=new Tonyu.classes.user.Drops({angle: 45,alpha: 200,p: Tonyu.globals.$pat_Inseki+0,scalex: 1,x: 75,y: 282});
            //$LASTPOS=5000160;//user.Page_index:160
            Tonyu.globals.$DropApp=new Tonyu.classes.user.DropApp({pat: 17,x: 391,y: 70});
            //$LASTPOS=5000207;//user.Page_index:207
            Tonyu.globals.$Fighter=new Tonyu.classes.user.Fighter({p: Tonyu.globals.$pat_sentouki+0,alpha: 255,angle: 0,zOrder: - 1000,scaleX: 1,scaleY: 1,x: 283,y: 309});
            //$LASTPOS=5000326;//user.Page_index:326
            Tonyu.globals.$ShStar=new Tonyu.classes.user.ShStar({pat: 17,x: 174,y: 163});
            //$LASTPOS=5000372;//user.Page_index:372
            Tonyu.globals.$ScoreDisp=new Tonyu.classes.user.ScoreDisp({text: "テキスト",col: Tonyu.globals.$clWhite,size: 20,x: 25,y: 16});
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
  fullName: 'user.Score',
  shortName: 'Score',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TextChar,
  includes: [],
  methods: {
    main :function _trc_Score_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000081;//user.Score:81
      _this.size=_this.text/10;
      //$LASTPOS=6000096;//user.Score:96
      _this.c=255;
      //$LASTPOS=6000104;//user.Score:104
      while (_this.c>0) {
        //$LASTPOS=6000123;//user.Score:123
        _this.c--;
        //$LASTPOS=6000133;//user.Score:133
        _this.col=_this.color(_this.c,_this.c,_this.c);
        //$LASTPOS=6000156;//user.Score:156
        _this.update();
        
      }
    },
    fiber$main :function _trc_Score_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000081;//user.Score:81
      _this.size=_this.text/10;
      //$LASTPOS=6000096;//user.Score:96
      _this.c=255;
      
      _thread.enter(function _trc_Score_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000104;//user.Score:104
          case 1:
            if (!(_this.c>0)) { __pc=4; break; }
            //$LASTPOS=6000123;//user.Score:123
            _this.c--;
            //$LASTPOS=6000133;//user.Score:133
            _this.fiber$color(_thread, _this.c, _this.c, _this.c);
            __pc=2;return;
          case 2:
            _this.col=_thread.retVal;
            
            //$LASTPOS=6000156;//user.Score:156
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
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
Tonyu.klass.define({
  fullName: 'user.ScoreDisp',
  shortName: 'ScoreDisp',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TextChar,
  includes: [],
  methods: {
    main :function _trc_ScoreDisp_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000021;//user.ScoreDisp:21
      while (1) {
        //$LASTPOS=7000037;//user.ScoreDisp:37
        _this.text="Score : "+Tonyu.globals.$score;
        //$LASTPOS=7000073;//user.ScoreDisp:73
        _this.update();
        
      }
    },
    fiber$main :function _trc_ScoreDisp_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_ScoreDisp_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000021;//user.ScoreDisp:21
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=7000037;//user.ScoreDisp:37
            _this.text="Score : "+Tonyu.globals.$score;
            //$LASTPOS=7000073;//user.ScoreDisp:73
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
  fullName: 'user.ShStar',
  shortName: 'ShStar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SecretChar,
  includes: [],
  methods: {
    main :function _trc_ShStar_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000126;//user.ShStar:126
      _this.spd=1;
      //$LASTPOS=8000134;//user.ShStar:134
      _this.x=- 100;
      //$LASTPOS=8000152;//user.ShStar:152
      _this.vx=_this.vy=0;
      //$LASTPOS=8000162;//user.ShStar:162
      while (1) {
        //$LASTPOS=8000178;//user.ShStar:178
        _this.x+=_this.vx*_this.spd;
        //$LASTPOS=8000188;//user.ShStar:188
        _this.y+=_this.vy*_this.spd;
        //$LASTPOS=8000204;//user.ShStar:204
        _this.spd=_this.spd*1.01;
        //$LASTPOS=8000224;//user.ShStar:224
        if (_this.x<0||_this.x>Tonyu.globals.$screenWidth||_this.y<0||_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=8000288;//user.ShStar:288
          _this.r=_this.rnd(360);
          //$LASTPOS=8000309;//user.ShStar:309
          _this.vx=_this.sin(_this.r)*1;
          //$LASTPOS=8000332;//user.ShStar:332
          _this.vy=_this.cos(_this.r)*1;
          //$LASTPOS=8000354;//user.ShStar:354
          _this.x=Tonyu.globals.$screenWidth/2+_this.vx*10;
          //$LASTPOS=8000387;//user.ShStar:387
          _this.y=Tonyu.globals.$screenHeight/2+_this.vy*10;
          //$LASTPOS=8000421;//user.ShStar:421
          _this.spd=0.3+_this.rnd(5);
          
        }
        //$LASTPOS=8000507;//user.ShStar:507
        _this.update();
        
      }
    },
    fiber$main :function _trc_ShStar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000126;//user.ShStar:126
      _this.spd=1;
      //$LASTPOS=8000134;//user.ShStar:134
      _this.x=- 100;
      //$LASTPOS=8000152;//user.ShStar:152
      _this.vx=_this.vy=0;
      
      _thread.enter(function _trc_ShStar_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000162;//user.ShStar:162
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=8000178;//user.ShStar:178
            _this.x+=_this.vx*_this.spd;
            //$LASTPOS=8000188;//user.ShStar:188
            _this.y+=_this.vy*_this.spd;
            //$LASTPOS=8000204;//user.ShStar:204
            _this.spd=_this.spd*1.01;
            //$LASTPOS=8000224;//user.ShStar:224
            if (_this.x<0||_this.x>Tonyu.globals.$screenWidth||_this.y<0||_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=8000288;//user.ShStar:288
              _this.r=_this.rnd(360);
              //$LASTPOS=8000309;//user.ShStar:309
              _this.vx=_this.sin(_this.r)*1;
              //$LASTPOS=8000332;//user.ShStar:332
              _this.vy=_this.cos(_this.r)*1;
              //$LASTPOS=8000354;//user.ShStar:354
              _this.x=Tonyu.globals.$screenWidth/2+_this.vx*10;
              //$LASTPOS=8000387;//user.ShStar:387
              _this.y=Tonyu.globals.$screenHeight/2+_this.vy*10;
              //$LASTPOS=8000421;//user.ShStar:421
              _this.spd=0.3+_this.rnd(5);
              
            }
            //$LASTPOS=8000507;//user.ShStar:507
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
    onDraw :function _trc_ShStar_onDraw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000064;//user.ShStar:64
      _this.drawLine(_this.x,_this.y,_this.x+_this.vx*_this.spd*3,_this.y+_this.vy*_this.spd*3,Tonyu.globals.$clWhite);
    },
    fiber$onDraw :function _trc_ShStar_f_onDraw(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000064;//user.ShStar:64
      _this.drawLine(_this.x,_this.y,_this.x+_this.vx*_this.spd*3,_this.y+_this.vy*_this.spd*3,Tonyu.globals.$clWhite);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onDraw":{"nowait":false}}}
});
