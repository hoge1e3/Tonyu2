Tonyu.klass.define({
  fullName: 'user.ClearView',
  shortName: 'ClearView',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_ClearView_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=1000028;//user.ClearView:28
      Tonyu.globals.$Screen.resize(480,750);
      //$LASTPOS=1000053;//user.ClearView:53
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=1000082;//user.ClearView:82
      Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=1000096;//user.ClearView:96
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=1000138;//user.ClearView:138
      Tonyu.globals.$map.load("title.json");
      //$LASTPOS=1000163;//user.ClearView:163
      Tonyu.globals.$wall=Tonyu.globals.$pat_mapchip+62;
      //$LASTPOS=1000186;//user.ClearView:186
      Tonyu.globals.$apple=Tonyu.globals.$pat_neko+30;
      //$LASTPOS=1000207;//user.ClearView:207
      Tonyu.globals.$fish=Tonyu.globals.$pat_neko+40;
      //$LASTPOS=1000227;//user.ClearView:227
      Tonyu.globals.$goal=Tonyu.globals.$pat_mapchip+86;
      //$LASTPOS=1000250;//user.ClearView:250
      Tonyu.globals.$gameOver=false;
      //$LASTPOS=1000267;//user.ClearView:267
      Tonyu.globals.$gameClear=false;
      //$LASTPOS=1000299;//user.ClearView:299
      _this.cl=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,align: "center",text: "CONGRATULATIONS!",fillStyle: "yellow",size: 1});
      //$LASTPOS=1000414;//user.ClearView:414
      //$LASTPOS=1000418;//user.ClearView:418
      i = 0;
      while(i<Tonyu.globals.$map.col) {
        {
          //$LASTPOS=1000447;//user.ClearView:447
          //$LASTPOS=1000451;//user.ClearView:451
          j = 0;
          while(j<Tonyu.globals.$map.row) {
            {
              //$LASTPOS=1000484;//user.ClearView:484
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+57) {
                //$LASTPOS=1000586;//user.ClearView:586
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1000622;//user.ClearView:622
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+59) {
                //$LASTPOS=1000730;//user.ClearView:730
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1000766;//user.ClearView:766
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+66) {
                //$LASTPOS=1000874;//user.ClearView:874
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1000910;//user.ClearView:910
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+65) {
                //$LASTPOS=1001018;//user.ClearView:1018
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1001054;//user.ClearView:1054
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+96) {
                //$LASTPOS=1001102;//user.ClearView:1102
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+30);
                
              }
              //$LASTPOS=1001148;//user.ClearView:1148
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+99) {
                //$LASTPOS=1001196;//user.ClearView:1196
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+40);
                
              }
              //$LASTPOS=1001242;//user.ClearView:1242
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+98) {
                //$LASTPOS=1001290;//user.ClearView:1290
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "h"});
                //$LASTPOS=1001341;//user.ClearView:1341
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1001377;//user.ClearView:1377
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+97) {
                //$LASTPOS=1001425;//user.ClearView:1425
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "v"});
                //$LASTPOS=1001476;//user.ClearView:1476
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=1001524;//user.ClearView:1524
      while (_this.cl.size<40) {
        //$LASTPOS=1001547;//user.ClearView:1547
        _this.cl.size++;
        //$LASTPOS=1001562;//user.ClearView:1562
        _this.update();
        
      }
      //$LASTPOS=1001574;//user.ClearView:1574
      _this.parallel(Tonyu.bindFunc(_this,_this.fw));
      //$LASTPOS=1001588;//user.ClearView:1588
      while (true) {
        //$LASTPOS=1001605;//user.ClearView:1605
        if (_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1) {
          break;
          
        }
        //$LASTPOS=1001663;//user.ClearView:1663
        _this.update();
        
      }
      //$LASTPOS=1001675;//user.ClearView:1675
      _this.loadPage(Tonyu.classes.user.Title);
    },
    fiber$main :function _trc_ClearView_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=1000028;//user.ClearView:28
      Tonyu.globals.$Screen.resize(480,750);
      //$LASTPOS=1000053;//user.ClearView:53
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=1000082;//user.ClearView:82
      Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=1000096;//user.ClearView:96
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=1000138;//user.ClearView:138
      Tonyu.globals.$map.load("title.json");
      //$LASTPOS=1000163;//user.ClearView:163
      Tonyu.globals.$wall=Tonyu.globals.$pat_mapchip+62;
      //$LASTPOS=1000186;//user.ClearView:186
      Tonyu.globals.$apple=Tonyu.globals.$pat_neko+30;
      //$LASTPOS=1000207;//user.ClearView:207
      Tonyu.globals.$fish=Tonyu.globals.$pat_neko+40;
      //$LASTPOS=1000227;//user.ClearView:227
      Tonyu.globals.$goal=Tonyu.globals.$pat_mapchip+86;
      //$LASTPOS=1000250;//user.ClearView:250
      Tonyu.globals.$gameOver=false;
      //$LASTPOS=1000267;//user.ClearView:267
      Tonyu.globals.$gameClear=false;
      //$LASTPOS=1000299;//user.ClearView:299
      _this.cl=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,align: "center",text: "CONGRATULATIONS!",fillStyle: "yellow",size: 1});
      //$LASTPOS=1000414;//user.ClearView:414
      //$LASTPOS=1000418;//user.ClearView:418
      i = 0;
      while(i<Tonyu.globals.$map.col) {
        {
          //$LASTPOS=1000447;//user.ClearView:447
          //$LASTPOS=1000451;//user.ClearView:451
          j = 0;
          while(j<Tonyu.globals.$map.row) {
            {
              //$LASTPOS=1000484;//user.ClearView:484
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+57) {
                //$LASTPOS=1000586;//user.ClearView:586
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1000622;//user.ClearView:622
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+59) {
                //$LASTPOS=1000730;//user.ClearView:730
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1000766;//user.ClearView:766
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+66) {
                //$LASTPOS=1000874;//user.ClearView:874
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1000910;//user.ClearView:910
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+65) {
                //$LASTPOS=1001018;//user.ClearView:1018
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1001054;//user.ClearView:1054
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+96) {
                //$LASTPOS=1001102;//user.ClearView:1102
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+30);
                
              }
              //$LASTPOS=1001148;//user.ClearView:1148
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+99) {
                //$LASTPOS=1001196;//user.ClearView:1196
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+40);
                
              }
              //$LASTPOS=1001242;//user.ClearView:1242
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+98) {
                //$LASTPOS=1001290;//user.ClearView:1290
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "h"});
                //$LASTPOS=1001341;//user.ClearView:1341
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=1001377;//user.ClearView:1377
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+97) {
                //$LASTPOS=1001425;//user.ClearView:1425
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "v"});
                //$LASTPOS=1001476;//user.ClearView:1476
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
            }
            j++;
          }
        }
        i++;
      }
      
      _thread.enter(function _trc_ClearView_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1001524;//user.ClearView:1524
          case 1:
            if (!(_this.cl.size<40)) { __pc=3; break; }
            //$LASTPOS=1001547;//user.ClearView:1547
            _this.cl.size++;
            //$LASTPOS=1001562;//user.ClearView:1562
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1001574;//user.ClearView:1574
            _this.parallel(Tonyu.bindFunc(_this,_this.fw));
            //$LASTPOS=1001588;//user.ClearView:1588
          case 4:
            //$LASTPOS=1001605;//user.ClearView:1605
            if (!(_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1)) { __pc=5; break; }
            __pc=7; break;
            
          case 5:
            
            //$LASTPOS=1001663;//user.ClearView:1663
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=4;break;
          case 7:
            
            //$LASTPOS=1001675;//user.ClearView:1675
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Title);
            __pc=8;return;
          case 8:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    fw :function _trc_ClearView_fw() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1001718;//user.ClearView:1718
      while (true) {
        //$LASTPOS=1001739;//user.ClearView:1739
        _this.updateEx(30);
        //$LASTPOS=1001761;//user.ClearView:1761
        new Tonyu.classes.user.Fireworks({x: _this.rnd(Tonyu.globals.$screenWidth),y: Tonyu.globals.$screenHeight});
        
      }
    },
    fiber$fw :function _trc_ClearView_f_fw(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_ClearView_ent_fw(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1001718;//user.ClearView:1718
          case 1:
            //$LASTPOS=1001739;//user.ClearView:1739
            _this.fiber$updateEx(_thread, 30);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=1001761;//user.ClearView:1761
            new Tonyu.classes.user.Fireworks({x: _this.rnd(Tonyu.globals.$screenWidth),y: Tonyu.globals.$screenHeight});
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"fw":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Enemy',
  shortName: 'Enemy',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Enemy_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000000;//user.Enemy:0
      _this.p=Tonyu.globals.$pat_sample+2;
      //$LASTPOS=2000046;//user.Enemy:46
      _this.v=1;
      //$LASTPOS=2000051;//user.Enemy:51
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=2000089;//user.Enemy:89
        if (_this.id=="h") {
          //$LASTPOS=2000101;//user.Enemy:101
          _this.x+=_this.v;
        }
        //$LASTPOS=2000111;//user.Enemy:111
        if (_this.id=="v") {
          //$LASTPOS=2000123;//user.Enemy:123
          _this.y+=_this.v;
        }
        //$LASTPOS=2000133;//user.Enemy:133
        if (Tonyu.globals.$map.getAt(_this.x-15,_this.y)==Tonyu.globals.$wall||Tonyu.globals.$map.getAt(_this.x+15,_this.y)==Tonyu.globals.$wall||Tonyu.globals.$map.getAt(_this.x,_this.y-15)==Tonyu.globals.$wall||Tonyu.globals.$map.getAt(_this.x,_this.y+15)==Tonyu.globals.$wall) {
          //$LASTPOS=2000263;//user.Enemy:263
          _this.v=- _this.v;
          
        }
        //$LASTPOS=2000279;//user.Enemy:279
        _this.update();
        
      }
    },
    fiber$main :function _trc_Enemy_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Enemy:0
      _this.p=Tonyu.globals.$pat_sample+2;
      //$LASTPOS=2000046;//user.Enemy:46
      _this.v=1;
      
      _thread.enter(function _trc_Enemy_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000051;//user.Enemy:51
          case 1:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=3; break; }
            //$LASTPOS=2000089;//user.Enemy:89
            if (_this.id=="h") {
              //$LASTPOS=2000101;//user.Enemy:101
              _this.x+=_this.v;
            }
            //$LASTPOS=2000111;//user.Enemy:111
            if (_this.id=="v") {
              //$LASTPOS=2000123;//user.Enemy:123
              _this.y+=_this.v;
            }
            //$LASTPOS=2000133;//user.Enemy:133
            if (Tonyu.globals.$map.getAt(_this.x-15,_this.y)==Tonyu.globals.$wall||Tonyu.globals.$map.getAt(_this.x+15,_this.y)==Tonyu.globals.$wall||Tonyu.globals.$map.getAt(_this.x,_this.y-15)==Tonyu.globals.$wall||Tonyu.globals.$map.getAt(_this.x,_this.y+15)==Tonyu.globals.$wall) {
              //$LASTPOS=2000263;//user.Enemy:263
              _this.v=- _this.v;
              
            }
            //$LASTPOS=2000279;//user.Enemy:279
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
  fullName: 'user.Fireworks',
  shortName: 'Fireworks',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Fireworks_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var j;
      var i;
      
      //$LASTPOS=3000000;//user.Fireworks:0
      _this.t=_this.rnd(300);
      //$LASTPOS=3000012;//user.Fireworks:12
      _this.p=Tonyu.globals.$pat_base+14;
      //$LASTPOS=3000028;//user.Fireworks:28
      while (_this.y>_this.t) {
        //$LASTPOS=3000044;//user.Fireworks:44
        _this.y-=10;
        //$LASTPOS=3000055;//user.Fireworks:55
        _this.update();
        
      }
      //$LASTPOS=3000067;//user.Fireworks:67
      _this.a1=[];
      //$LASTPOS=3000074;//user.Fireworks:74
      _this.a2=[];
      //$LASTPOS=3000081;//user.Fireworks:81
      //$LASTPOS=3000085;//user.Fireworks:85
      j = 0;
      while(j<8) {
        {
          //$LASTPOS=3000107;//user.Fireworks:107
          _this.a1[j]=new Tonyu.classes.kernel.Actor({x: _this.x,y: _this.y,p: Tonyu.globals.$pat_base+13,vx: _this.cos(45*j)*4,vy: _this.sin(45*j)*4});
        }
        j++;
      }
      //$LASTPOS=3000176;//user.Fireworks:176
      //$LASTPOS=3000180;//user.Fireworks:180
      j = 0;
      while(j<8) {
        {
          //$LASTPOS=3000202;//user.Fireworks:202
          _this.a2[j]=new Tonyu.classes.kernel.Actor({x: _this.x,y: _this.y,p: Tonyu.globals.$pat_base+12,vx: _this.cos(45*j+30)*3,vy: _this.sin(45*j+30)*3});
        }
        j++;
      }
      //$LASTPOS=3000277;//user.Fireworks:277
      _this.parallel(Tonyu.bindFunc(_this,_this.move),_this.a1,50);
      //$LASTPOS=3000315;//user.Fireworks:315
      _this.parallel(Tonyu.bindFunc(_this,_this.move),_this.a2,50);
      //$LASTPOS=3000337;//user.Fireworks:337
      _this.updateEx(50);
      //$LASTPOS=3000351;//user.Fireworks:351
      //$LASTPOS=3000355;//user.Fireworks:355
      i = 0;
      while(i<8) {
        {
          //$LASTPOS=3000377;//user.Fireworks:377
          _this.a1[i].die();
          //$LASTPOS=3000394;//user.Fireworks:394
          _this.a2[i].die();
        }
        i++;
      }
      //$LASTPOS=3000409;//user.Fireworks:409
      _this.die();
    },
    fiber$main :function _trc_Fireworks_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var j;
      var i;
      
      //$LASTPOS=3000000;//user.Fireworks:0
      _this.t=_this.rnd(300);
      //$LASTPOS=3000012;//user.Fireworks:12
      _this.p=Tonyu.globals.$pat_base+14;
      
      _thread.enter(function _trc_Fireworks_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000028;//user.Fireworks:28
          case 1:
            if (!(_this.y>_this.t)) { __pc=3; break; }
            //$LASTPOS=3000044;//user.Fireworks:44
            _this.y-=10;
            //$LASTPOS=3000055;//user.Fireworks:55
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=3000067;//user.Fireworks:67
            _this.a1=[];
            //$LASTPOS=3000074;//user.Fireworks:74
            _this.a2=[];
            //$LASTPOS=3000081;//user.Fireworks:81
            //$LASTPOS=3000085;//user.Fireworks:85
            j = 0;
            while(j<8) {
              {
                //$LASTPOS=3000107;//user.Fireworks:107
                _this.a1[j]=new Tonyu.classes.kernel.Actor({x: _this.x,y: _this.y,p: Tonyu.globals.$pat_base+13,vx: _this.cos(45*j)*4,vy: _this.sin(45*j)*4});
              }
              j++;
            }
            //$LASTPOS=3000176;//user.Fireworks:176
            //$LASTPOS=3000180;//user.Fireworks:180
            j = 0;
            while(j<8) {
              {
                //$LASTPOS=3000202;//user.Fireworks:202
                _this.a2[j]=new Tonyu.classes.kernel.Actor({x: _this.x,y: _this.y,p: Tonyu.globals.$pat_base+12,vx: _this.cos(45*j+30)*3,vy: _this.sin(45*j+30)*3});
              }
              j++;
            }
            //$LASTPOS=3000277;//user.Fireworks:277
            _this.parallel(Tonyu.bindFunc(_this,_this.move),_this.a1,50);
            //$LASTPOS=3000315;//user.Fireworks:315
            _this.parallel(Tonyu.bindFunc(_this,_this.move),_this.a2,50);
            //$LASTPOS=3000337;//user.Fireworks:337
            _this.fiber$updateEx(_thread, 50);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=3000351;//user.Fireworks:351
            //$LASTPOS=3000355;//user.Fireworks:355
            i = 0;
            while(i<8) {
              {
                //$LASTPOS=3000377;//user.Fireworks:377
                _this.a1[i].die();
                //$LASTPOS=3000394;//user.Fireworks:394
                _this.a2[i].die();
              }
              i++;
            }
            //$LASTPOS=3000409;//user.Fireworks:409
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    move :function _trc_Fireworks_move(a,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=3000432;//user.Fireworks:432
      //$LASTPOS=3000436;//user.Fireworks:436
      i = 0;
      while(i<l) {
        {
          //$LASTPOS=3000462;//user.Fireworks:462
          //$LASTPOS=3000466;//user.Fireworks:466
          j = 0;
          while(j<a.length) {
            {
              //$LASTPOS=3000503;//user.Fireworks:503
              a[j].x+=a[j].vx;
              //$LASTPOS=3000532;//user.Fireworks:532
              a[j].y+=a[j].vy;
            }
            j++;
          }
          //$LASTPOS=3000567;//user.Fireworks:567
          _this.update();
        }
        i++;
      }
    },
    fiber$move :function _trc_Fireworks_f_move(_thread,a,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      
      _thread.enter(function _trc_Fireworks_ent_move(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000432;//user.Fireworks:432
            //$LASTPOS=3000436;//user.Fireworks:436
            i = 0;;
          case 1:
            if (!(i<l)) { __pc=3; break; }
            //$LASTPOS=3000462;//user.Fireworks:462
            //$LASTPOS=3000466;//user.Fireworks:466
            j = 0;
            while(j<a.length) {
              {
                //$LASTPOS=3000503;//user.Fireworks:503
                a[j].x+=a[j].vx;
                //$LASTPOS=3000532;//user.Fireworks:532
                a[j].y+=a[j].vy;
              }
              j++;
            }
            //$LASTPOS=3000567;//user.Fireworks:567
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"move":{"nowait":false}}}
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
      var j;
      
      //$LASTPOS=4000027;//user.Main:27
      Tonyu.globals.$Screen.resize(480,750);
      //$LASTPOS=4000052;//user.Main:52
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=4000081;//user.Main:81
      _this.data=["stage1.json","stage2.json","stage3.json","stage4.json","stage5.json","stage6.json","stage9.json","stage8.json","stage7.json","stage10.json"];
      //$LASTPOS=4000230;//user.Main:230
      _this.stage=0;
      //$LASTPOS=4000239;//user.Main:239
      _this.time=600*30;
      //$LASTPOS=4000252;//user.Main:252
      while (true) {
        //$LASTPOS=4000269;//user.Main:269
        Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
        //$LASTPOS=4000287;//user.Main:287
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=4000333;//user.Main:333
        Tonyu.globals.$map.load(_this.data[_this.stage]);
        //$LASTPOS=4000361;//user.Main:361
        Tonyu.globals.$wall=Tonyu.globals.$pat_mapchip+62;
        //$LASTPOS=4000388;//user.Main:388
        Tonyu.globals.$apple=Tonyu.globals.$pat_neko+30;
        //$LASTPOS=4000413;//user.Main:413
        Tonyu.globals.$fish=Tonyu.globals.$pat_neko+40;
        //$LASTPOS=4000437;//user.Main:437
        Tonyu.globals.$goal=Tonyu.globals.$pat_mapchip+86;
        //$LASTPOS=4000464;//user.Main:464
        Tonyu.globals.$gameOver=false;
        //$LASTPOS=4000485;//user.Main:485
        Tonyu.globals.$gameClear=false;
        //$LASTPOS=4000525;//user.Main:525
        _this.timeLabel=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2-35,y: Tonyu.globals.$screenHeight-200,align: "left",text: "Time:"+_this.floor(_this.time/30),fillStyle: "white",size: 25});
        //$LASTPOS=4000658;//user.Main:658
        //$LASTPOS=4000662;//user.Main:662
        i = 0;
        while(i<Tonyu.globals.$map.col) {
          {
            //$LASTPOS=4000695;//user.Main:695
            //$LASTPOS=4000699;//user.Main:699
            j = 0;
            while(j<Tonyu.globals.$map.row) {
              {
                //$LASTPOS=4000736;//user.Main:736
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+57) {
                  //$LASTPOS=4000788;//user.Main:788
                  _this.player=new Tonyu.classes.user.Player({x: 16+32*j,y: 16+32*i});
                  //$LASTPOS=4000844;//user.Main:844
                  Tonyu.globals.$map.set(j,i,- 1);
                  
                }
                //$LASTPOS=4000888;//user.Main:888
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+59) {
                  //$LASTPOS=4000940;//user.Main:940
                  _this.partnerLR=new Tonyu.classes.user.PartnerLR({x: 16+32*j,y: 16+32*i});
                  //$LASTPOS=4001002;//user.Main:1002
                  Tonyu.globals.$map.set(j,i,- 1);
                  
                }
                //$LASTPOS=4001046;//user.Main:1046
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+66) {
                  //$LASTPOS=4001098;//user.Main:1098
                  _this.partnerUL=new Tonyu.classes.user.PartnerUL({x: 16+32*j,y: 16+32*i});
                  //$LASTPOS=4001160;//user.Main:1160
                  Tonyu.globals.$map.set(j,i,- 1);
                  
                }
                //$LASTPOS=4001204;//user.Main:1204
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+65) {
                  //$LASTPOS=4001256;//user.Main:1256
                  _this.partnerUR=new Tonyu.classes.user.PartnerUR({x: 16+32*j,y: 16+32*i});
                  //$LASTPOS=4001318;//user.Main:1318
                  Tonyu.globals.$map.set(j,i,- 1);
                  
                }
                //$LASTPOS=4001362;//user.Main:1362
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+96) {
                  //$LASTPOS=4001414;//user.Main:1414
                  Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+30);
                  
                }
                //$LASTPOS=4001468;//user.Main:1468
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+99) {
                  //$LASTPOS=4001520;//user.Main:1520
                  Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+40);
                  
                }
                //$LASTPOS=4001574;//user.Main:1574
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+98) {
                  //$LASTPOS=4001626;//user.Main:1626
                  new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "h"});
                  //$LASTPOS=4001681;//user.Main:1681
                  Tonyu.globals.$map.set(j,i,- 1);
                  
                }
                //$LASTPOS=4001725;//user.Main:1725
                if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+97) {
                  //$LASTPOS=4001777;//user.Main:1777
                  new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "v"});
                  //$LASTPOS=4001832;//user.Main:1832
                  Tonyu.globals.$map.set(j,i,- 1);
                  
                }
              }
              j++;
            }
          }
          i++;
        }
        //$LASTPOS=4001884;//user.Main:1884
        while (! Tonyu.globals.$gameOver) {
          //$LASTPOS=4001911;//user.Main:1911
          if (_this.player.goal&&_this.partnerUR.goal&&_this.partnerLR.goal&&_this.partnerUL.goal&&! Tonyu.globals.$gameClear) {
            //$LASTPOS=4002040;//user.Main:2040
            Tonyu.globals.$gameClear=true;
            //$LASTPOS=4002069;//user.Main:2069
            _this.stage++;
            //$LASTPOS=4002103;//user.Main:2103
            new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight-30,align: "center",size: 25,text: "STAGE CLEAR !!!",fillStyle: "yellow"});
            break;
            
            
          }
          //$LASTPOS=4002253;//user.Main:2253
          _this.timeLabel.text="Time:"+(_this.floor(_this.time/30)+1);
          //$LASTPOS=4002304;//user.Main:2304
          _this.time--;
          //$LASTPOS=4002320;//user.Main:2320
          if (_this.time==0) {
            //$LASTPOS=4002345;//user.Main:2345
            _this.timeLabel.text="Time:"+_this.floor(_this.time/30);
            //$LASTPOS=4002396;//user.Main:2396
            Tonyu.globals.$gameOver=true;
            
          }
          //$LASTPOS=4002430;//user.Main:2430
          _this.update();
          
        }
        //$LASTPOS=4002450;//user.Main:2450
        if (Tonyu.globals.$gameOver) {
          //$LASTPOS=4002473;//user.Main:2473
          new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight-30,align: "center",size: 25,text: "GAME OVER...  continue:"+_this.cont,fillStyle: "red"});
          //$LASTPOS=4002604;//user.Main:2604
          _this.cont--;
          
        }
        //$LASTPOS=4002622;//user.Main:2622
        _this.timeLabel.y-=20;
        //$LASTPOS=4002643;//user.Main:2643
        while (true) {
          //$LASTPOS=4002664;//user.Main:2664
          if (Tonyu.globals.$gameOver) {
            //$LASTPOS=4002691;//user.Main:2691
            if (_this.cont>=0) {
              //$LASTPOS=4002766;//user.Main:2766
              _this.timeLabel.align="center";
              //$LASTPOS=4002808;//user.Main:2808
              _this.timeLabel.text="press space key to continue";
              
            } else {
              //$LASTPOS=4002935;//user.Main:2935
              _this.timeLabel.align="center";
              //$LASTPOS=4002977;//user.Main:2977
              _this.timeLabel.text="press space key to restart";
              
            }
            
          }
          //$LASTPOS=4003054;//user.Main:3054
          if (Tonyu.globals.$gameClear) {
            //$LASTPOS=4003082;//user.Main:3082
            _this.timeLabel.align="center";
            //$LASTPOS=4003120;//user.Main:3120
            _this.timeLabel.text="press space key to next stage";
            
          }
          //$LASTPOS=4003186;//user.Main:3186
          if (Tonyu.globals.$pad.getPadButton(0)||_this.getkey("space")==1) {
            break;
            
          }
          //$LASTPOS=4003248;//user.Main:3248
          _this.update();
          
        }
        //$LASTPOS=4003268;//user.Main:3268
        if (Tonyu.globals.$gameOver&&_this.cont<0) {
          //$LASTPOS=4003292;//user.Main:3292
          _this.loadPage(Tonyu.classes.user.Title);
        }
        //$LASTPOS=4003313;//user.Main:3313
        if (Tonyu.globals.$gameClear&&_this.stage==_this.data.length) {
          //$LASTPOS=4003350;//user.Main:3350
          _this.loadPage(Tonyu.classes.user.ClearView);
        }
        //$LASTPOS=4003413;//user.Main:3413
        _this.all().die();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=4000027;//user.Main:27
      Tonyu.globals.$Screen.resize(480,750);
      //$LASTPOS=4000052;//user.Main:52
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=4000081;//user.Main:81
      _this.data=["stage1.json","stage2.json","stage3.json","stage4.json","stage5.json","stage6.json","stage9.json","stage8.json","stage7.json","stage10.json"];
      //$LASTPOS=4000230;//user.Main:230
      _this.stage=0;
      //$LASTPOS=4000239;//user.Main:239
      _this.time=600*30;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000252;//user.Main:252
          case 1:
            //$LASTPOS=4000269;//user.Main:269
            Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
            //$LASTPOS=4000287;//user.Main:287
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
            //$LASTPOS=4000333;//user.Main:333
            Tonyu.globals.$map.load(_this.data[_this.stage]);
            //$LASTPOS=4000361;//user.Main:361
            Tonyu.globals.$wall=Tonyu.globals.$pat_mapchip+62;
            //$LASTPOS=4000388;//user.Main:388
            Tonyu.globals.$apple=Tonyu.globals.$pat_neko+30;
            //$LASTPOS=4000413;//user.Main:413
            Tonyu.globals.$fish=Tonyu.globals.$pat_neko+40;
            //$LASTPOS=4000437;//user.Main:437
            Tonyu.globals.$goal=Tonyu.globals.$pat_mapchip+86;
            //$LASTPOS=4000464;//user.Main:464
            Tonyu.globals.$gameOver=false;
            //$LASTPOS=4000485;//user.Main:485
            Tonyu.globals.$gameClear=false;
            //$LASTPOS=4000525;//user.Main:525
            _this.timeLabel=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2-35,y: Tonyu.globals.$screenHeight-200,align: "left",text: "Time:"+_this.floor(_this.time/30),fillStyle: "white",size: 25});
            //$LASTPOS=4000658;//user.Main:658
            //$LASTPOS=4000662;//user.Main:662
            i = 0;
            while(i<Tonyu.globals.$map.col) {
              {
                //$LASTPOS=4000695;//user.Main:695
                //$LASTPOS=4000699;//user.Main:699
                j = 0;
                while(j<Tonyu.globals.$map.row) {
                  {
                    //$LASTPOS=4000736;//user.Main:736
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+57) {
                      //$LASTPOS=4000788;//user.Main:788
                      _this.player=new Tonyu.classes.user.Player({x: 16+32*j,y: 16+32*i});
                      //$LASTPOS=4000844;//user.Main:844
                      Tonyu.globals.$map.set(j,i,- 1);
                      
                    }
                    //$LASTPOS=4000888;//user.Main:888
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+59) {
                      //$LASTPOS=4000940;//user.Main:940
                      _this.partnerLR=new Tonyu.classes.user.PartnerLR({x: 16+32*j,y: 16+32*i});
                      //$LASTPOS=4001002;//user.Main:1002
                      Tonyu.globals.$map.set(j,i,- 1);
                      
                    }
                    //$LASTPOS=4001046;//user.Main:1046
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+66) {
                      //$LASTPOS=4001098;//user.Main:1098
                      _this.partnerUL=new Tonyu.classes.user.PartnerUL({x: 16+32*j,y: 16+32*i});
                      //$LASTPOS=4001160;//user.Main:1160
                      Tonyu.globals.$map.set(j,i,- 1);
                      
                    }
                    //$LASTPOS=4001204;//user.Main:1204
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+65) {
                      //$LASTPOS=4001256;//user.Main:1256
                      _this.partnerUR=new Tonyu.classes.user.PartnerUR({x: 16+32*j,y: 16+32*i});
                      //$LASTPOS=4001318;//user.Main:1318
                      Tonyu.globals.$map.set(j,i,- 1);
                      
                    }
                    //$LASTPOS=4001362;//user.Main:1362
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+96) {
                      //$LASTPOS=4001414;//user.Main:1414
                      Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+30);
                      
                    }
                    //$LASTPOS=4001468;//user.Main:1468
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+99) {
                      //$LASTPOS=4001520;//user.Main:1520
                      Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+40);
                      
                    }
                    //$LASTPOS=4001574;//user.Main:1574
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+98) {
                      //$LASTPOS=4001626;//user.Main:1626
                      new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "h"});
                      //$LASTPOS=4001681;//user.Main:1681
                      Tonyu.globals.$map.set(j,i,- 1);
                      
                    }
                    //$LASTPOS=4001725;//user.Main:1725
                    if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+97) {
                      //$LASTPOS=4001777;//user.Main:1777
                      new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "v"});
                      //$LASTPOS=4001832;//user.Main:1832
                      Tonyu.globals.$map.set(j,i,- 1);
                      
                    }
                  }
                  j++;
                }
              }
              i++;
            }
            //$LASTPOS=4001884;//user.Main:1884
          case 2:
            if (!(! Tonyu.globals.$gameOver)) { __pc=5; break; }
            //$LASTPOS=4001911;//user.Main:1911
            if (!(_this.player.goal&&_this.partnerUR.goal&&_this.partnerLR.goal&&_this.partnerUL.goal&&! Tonyu.globals.$gameClear)) { __pc=3; break; }
            //$LASTPOS=4002040;//user.Main:2040
            Tonyu.globals.$gameClear=true;
            //$LASTPOS=4002069;//user.Main:2069
            _this.stage++;
            //$LASTPOS=4002103;//user.Main:2103
            new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight-30,align: "center",size: 25,text: "STAGE CLEAR !!!",fillStyle: "yellow"});
            __pc=5; break;
            
          case 3:
            
            //$LASTPOS=4002253;//user.Main:2253
            _this.timeLabel.text="Time:"+(_this.floor(_this.time/30)+1);
            //$LASTPOS=4002304;//user.Main:2304
            _this.time--;
            //$LASTPOS=4002320;//user.Main:2320
            if (_this.time==0) {
              //$LASTPOS=4002345;//user.Main:2345
              _this.timeLabel.text="Time:"+_this.floor(_this.time/30);
              //$LASTPOS=4002396;//user.Main:2396
              Tonyu.globals.$gameOver=true;
              
            }
            //$LASTPOS=4002430;//user.Main:2430
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5:
            
            //$LASTPOS=4002450;//user.Main:2450
            if (Tonyu.globals.$gameOver) {
              //$LASTPOS=4002473;//user.Main:2473
              new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight-30,align: "center",size: 25,text: "GAME OVER...  continue:"+_this.cont,fillStyle: "red"});
              //$LASTPOS=4002604;//user.Main:2604
              _this.cont--;
              
            }
            //$LASTPOS=4002622;//user.Main:2622
            _this.timeLabel.y-=20;
            //$LASTPOS=4002643;//user.Main:2643
          case 6:
            //$LASTPOS=4002664;//user.Main:2664
            if (Tonyu.globals.$gameOver) {
              //$LASTPOS=4002691;//user.Main:2691
              if (_this.cont>=0) {
                //$LASTPOS=4002766;//user.Main:2766
                _this.timeLabel.align="center";
                //$LASTPOS=4002808;//user.Main:2808
                _this.timeLabel.text="press space key to continue";
                
              } else {
                //$LASTPOS=4002935;//user.Main:2935
                _this.timeLabel.align="center";
                //$LASTPOS=4002977;//user.Main:2977
                _this.timeLabel.text="press space key to restart";
                
              }
              
            }
            //$LASTPOS=4003054;//user.Main:3054
            if (Tonyu.globals.$gameClear) {
              //$LASTPOS=4003082;//user.Main:3082
              _this.timeLabel.align="center";
              //$LASTPOS=4003120;//user.Main:3120
              _this.timeLabel.text="press space key to next stage";
              
            }
            //$LASTPOS=4003186;//user.Main:3186
            if (!(Tonyu.globals.$pad.getPadButton(0)||_this.getkey("space")==1)) { __pc=7; break; }
            __pc=9; break;
            
          case 7:
            
            //$LASTPOS=4003248;//user.Main:3248
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9:
            
            //$LASTPOS=4003268;//user.Main:3268
            if (!(Tonyu.globals.$gameOver&&_this.cont<0)) { __pc=11; break; }
            //$LASTPOS=4003292;//user.Main:3292
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Title);
            __pc=10;return;
          case 10:
            
          case 11:
            
            //$LASTPOS=4003313;//user.Main:3313
            if (!(Tonyu.globals.$gameClear&&_this.stage==_this.data.length)) { __pc=13; break; }
            //$LASTPOS=4003350;//user.Main:3350
            _this.fiber$loadPage(_thread, Tonyu.classes.user.ClearView);
            __pc=12;return;
          case 12:
            
          case 13:
            
            //$LASTPOS=4003413;//user.Main:3413
            _this.all().die();
            __pc=1;break;
          case 14:
            
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
  fullName: 'user.PartnerLR',
  shortName: 'PartnerLR',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PartnerLR_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=5000000;//user.PartnerLR:0
      _this.p=Tonyu.globals.$pat_neko+25;
      //$LASTPOS=5000016;//user.PartnerLR:16
      _this.v=2;
      //$LASTPOS=5000021;//user.PartnerLR:21
      _this.power=0;
      //$LASTPOS=5000030;//user.PartnerLR:30
      _this.goal=false;
      //$LASTPOS=5000168;//user.PartnerLR:168
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=5000206;//user.PartnerLR:206
        if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
          //$LASTPOS=5000315;//user.PartnerLR:315
          _this.y-=_this.v;
          
        }
        //$LASTPOS=5000331;//user.PartnerLR:331
        if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
          //$LASTPOS=5000444;//user.PartnerLR:444
          _this.y+=_this.v;
          
        }
        //$LASTPOS=5000460;//user.PartnerLR:460
        if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=5000575;//user.PartnerLR:575
          _this.x-=_this.v;
          
        }
        //$LASTPOS=5000591;//user.PartnerLR:591
        if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=5000704;//user.PartnerLR:704
          _this.x+=_this.v;
          
        }
        //$LASTPOS=5000720;//user.PartnerLR:720
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
          //$LASTPOS=5000757;//user.PartnerLR:757
          _this.v+=2;
          //$LASTPOS=5000771;//user.PartnerLR:771
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=5000801;//user.PartnerLR:801
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
          //$LASTPOS=5000837;//user.PartnerLR:837
          _this.power=300;
          //$LASTPOS=5000856;//user.PartnerLR:856
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=5000886;//user.PartnerLR:886
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal) {
          //$LASTPOS=5000922;//user.PartnerLR:922
          _this.goal=true;
          break;
          
          
        } else {
          //$LASTPOS=5000967;//user.PartnerLR:967
          _this.goal=false;
          
        }
        //$LASTPOS=5000989;//user.PartnerLR:989
        _this.c=_this.within(Tonyu.classes.user.Enemy,25);
        //$LASTPOS=5001013;//user.PartnerLR:1013
        if (_this.c) {
          //$LASTPOS=5001028;//user.PartnerLR:1028
          if (_this.power<=0) {
            //$LASTPOS=5001041;//user.PartnerLR:1041
            Tonyu.globals.$gameOver=true;
          } else {
            //$LASTPOS=5001070;//user.PartnerLR:1070
            _this.c.die();
          }
          
        }
        //$LASTPOS=5001089;//user.PartnerLR:1089
        if (_this.power>0) {
          //$LASTPOS=5001101;//user.PartnerLR:1101
          _this.power--;
        }
        //$LASTPOS=5001154;//user.PartnerLR:1154
        _this.update();
        
      }
      //$LASTPOS=5001166;//user.PartnerLR:1166
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=5001204;//user.PartnerLR:1204
        _this.update();
        
      }
    },
    fiber$main :function _trc_PartnerLR_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000000;//user.PartnerLR:0
      _this.p=Tonyu.globals.$pat_neko+25;
      //$LASTPOS=5000016;//user.PartnerLR:16
      _this.v=2;
      //$LASTPOS=5000021;//user.PartnerLR:21
      _this.power=0;
      //$LASTPOS=5000030;//user.PartnerLR:30
      _this.goal=false;
      
      _thread.enter(function _trc_PartnerLR_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000168;//user.PartnerLR:168
          case 1:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=5; break; }
            //$LASTPOS=5000206;//user.PartnerLR:206
            if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
              //$LASTPOS=5000315;//user.PartnerLR:315
              _this.y-=_this.v;
              
            }
            //$LASTPOS=5000331;//user.PartnerLR:331
            if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
              //$LASTPOS=5000444;//user.PartnerLR:444
              _this.y+=_this.v;
              
            }
            //$LASTPOS=5000460;//user.PartnerLR:460
            if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=5000575;//user.PartnerLR:575
              _this.x-=_this.v;
              
            }
            //$LASTPOS=5000591;//user.PartnerLR:591
            if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=5000704;//user.PartnerLR:704
              _this.x+=_this.v;
              
            }
            //$LASTPOS=5000720;//user.PartnerLR:720
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
              //$LASTPOS=5000757;//user.PartnerLR:757
              _this.v+=2;
              //$LASTPOS=5000771;//user.PartnerLR:771
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=5000801;//user.PartnerLR:801
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
              //$LASTPOS=5000837;//user.PartnerLR:837
              _this.power=300;
              //$LASTPOS=5000856;//user.PartnerLR:856
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=5000886;//user.PartnerLR:886
            if (!(Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal)) { __pc=2; break; }
            //$LASTPOS=5000922;//user.PartnerLR:922
            _this.goal=true;
            __pc=5; break;
            
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=5000967;//user.PartnerLR:967
              _this.goal=false;
            }
          case 3:
            
            //$LASTPOS=5000989;//user.PartnerLR:989
            _this.c=_this.within(Tonyu.classes.user.Enemy,25);
            //$LASTPOS=5001013;//user.PartnerLR:1013
            if (_this.c) {
              //$LASTPOS=5001028;//user.PartnerLR:1028
              if (_this.power<=0) {
                //$LASTPOS=5001041;//user.PartnerLR:1041
                Tonyu.globals.$gameOver=true;
              } else {
                //$LASTPOS=5001070;//user.PartnerLR:1070
                _this.c.die();
              }
              
            }
            //$LASTPOS=5001089;//user.PartnerLR:1089
            if (_this.power>0) {
              //$LASTPOS=5001101;//user.PartnerLR:1101
              _this.power--;
            }
            //$LASTPOS=5001154;//user.PartnerLR:1154
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=5001166;//user.PartnerLR:1166
          case 6:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=8; break; }
            //$LASTPOS=5001204;//user.PartnerLR:1204
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
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
  fullName: 'user.PartnerUL',
  shortName: 'PartnerUL',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PartnerUL_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000001;//user.PartnerUL:1
      _this.p=Tonyu.globals.$pat_neko+0;
      //$LASTPOS=6000016;//user.PartnerUL:16
      _this.v=2;
      //$LASTPOS=6000021;//user.PartnerUL:21
      _this.power=0;
      //$LASTPOS=6000030;//user.PartnerUL:30
      _this.goal=false;
      //$LASTPOS=6000151;//user.PartnerUL:151
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=6000189;//user.PartnerUL:189
        if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
          //$LASTPOS=6000298;//user.PartnerUL:298
          _this.y+=_this.v;
          
        }
        //$LASTPOS=6000314;//user.PartnerUL:314
        if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
          //$LASTPOS=6000427;//user.PartnerUL:427
          _this.y-=_this.v;
          
        }
        //$LASTPOS=6000443;//user.PartnerUL:443
        if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=6000558;//user.PartnerUL:558
          _this.x+=_this.v;
          
        }
        //$LASTPOS=6000574;//user.PartnerUL:574
        if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=6000687;//user.PartnerUL:687
          _this.x-=_this.v;
          
        }
        //$LASTPOS=6000703;//user.PartnerUL:703
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
          //$LASTPOS=6000740;//user.PartnerUL:740
          _this.v+=2;
          //$LASTPOS=6000754;//user.PartnerUL:754
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=6000784;//user.PartnerUL:784
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
          //$LASTPOS=6000820;//user.PartnerUL:820
          _this.power=300;
          //$LASTPOS=6000839;//user.PartnerUL:839
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=6000869;//user.PartnerUL:869
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal) {
          //$LASTPOS=6000905;//user.PartnerUL:905
          _this.goal=true;
          break;
          
          
        } else {
          //$LASTPOS=6000950;//user.PartnerUL:950
          _this.goal=false;
          
        }
        //$LASTPOS=6000972;//user.PartnerUL:972
        _this.c=_this.within(Tonyu.classes.user.Enemy,25);
        //$LASTPOS=6000996;//user.PartnerUL:996
        if (_this.c) {
          //$LASTPOS=6001011;//user.PartnerUL:1011
          if (_this.power<=0) {
            //$LASTPOS=6001024;//user.PartnerUL:1024
            Tonyu.globals.$gameOver=true;
          } else {
            //$LASTPOS=6001053;//user.PartnerUL:1053
            _this.c.die();
          }
          
        }
        //$LASTPOS=6001072;//user.PartnerUL:1072
        if (_this.power>0) {
          //$LASTPOS=6001084;//user.PartnerUL:1084
          _this.power--;
        }
        //$LASTPOS=6001136;//user.PartnerUL:1136
        _this.update();
        
      }
      //$LASTPOS=6001148;//user.PartnerUL:1148
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=6001186;//user.PartnerUL:1186
        _this.update();
        
      }
    },
    fiber$main :function _trc_PartnerUL_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000001;//user.PartnerUL:1
      _this.p=Tonyu.globals.$pat_neko+0;
      //$LASTPOS=6000016;//user.PartnerUL:16
      _this.v=2;
      //$LASTPOS=6000021;//user.PartnerUL:21
      _this.power=0;
      //$LASTPOS=6000030;//user.PartnerUL:30
      _this.goal=false;
      
      _thread.enter(function _trc_PartnerUL_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000151;//user.PartnerUL:151
          case 1:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=5; break; }
            //$LASTPOS=6000189;//user.PartnerUL:189
            if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
              //$LASTPOS=6000298;//user.PartnerUL:298
              _this.y+=_this.v;
              
            }
            //$LASTPOS=6000314;//user.PartnerUL:314
            if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
              //$LASTPOS=6000427;//user.PartnerUL:427
              _this.y-=_this.v;
              
            }
            //$LASTPOS=6000443;//user.PartnerUL:443
            if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=6000558;//user.PartnerUL:558
              _this.x+=_this.v;
              
            }
            //$LASTPOS=6000574;//user.PartnerUL:574
            if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=6000687;//user.PartnerUL:687
              _this.x-=_this.v;
              
            }
            //$LASTPOS=6000703;//user.PartnerUL:703
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
              //$LASTPOS=6000740;//user.PartnerUL:740
              _this.v+=2;
              //$LASTPOS=6000754;//user.PartnerUL:754
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=6000784;//user.PartnerUL:784
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
              //$LASTPOS=6000820;//user.PartnerUL:820
              _this.power=300;
              //$LASTPOS=6000839;//user.PartnerUL:839
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=6000869;//user.PartnerUL:869
            if (!(Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal)) { __pc=2; break; }
            //$LASTPOS=6000905;//user.PartnerUL:905
            _this.goal=true;
            __pc=5; break;
            
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=6000950;//user.PartnerUL:950
              _this.goal=false;
            }
          case 3:
            
            //$LASTPOS=6000972;//user.PartnerUL:972
            _this.c=_this.within(Tonyu.classes.user.Enemy,25);
            //$LASTPOS=6000996;//user.PartnerUL:996
            if (_this.c) {
              //$LASTPOS=6001011;//user.PartnerUL:1011
              if (_this.power<=0) {
                //$LASTPOS=6001024;//user.PartnerUL:1024
                Tonyu.globals.$gameOver=true;
              } else {
                //$LASTPOS=6001053;//user.PartnerUL:1053
                _this.c.die();
              }
              
            }
            //$LASTPOS=6001072;//user.PartnerUL:1072
            if (_this.power>0) {
              //$LASTPOS=6001084;//user.PartnerUL:1084
              _this.power--;
            }
            //$LASTPOS=6001136;//user.PartnerUL:1136
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=6001148;//user.PartnerUL:1148
          case 6:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=8; break; }
            //$LASTPOS=6001186;//user.PartnerUL:1186
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
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
  fullName: 'user.PartnerUR',
  shortName: 'PartnerUR',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PartnerUR_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=7000000;//user.PartnerUR:0
      _this.p=Tonyu.globals.$pat_neko+20;
      //$LASTPOS=7000016;//user.PartnerUR:16
      _this.v=2;
      //$LASTPOS=7000021;//user.PartnerUR:21
      _this.power=0;
      //$LASTPOS=7000030;//user.PartnerUR:30
      _this.goal=false;
      //$LASTPOS=7000168;//user.PartnerUR:168
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=7000206;//user.PartnerUR:206
        if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
          //$LASTPOS=7000315;//user.PartnerUR:315
          _this.y+=_this.v;
          
        }
        //$LASTPOS=7000331;//user.PartnerUR:331
        if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
          //$LASTPOS=7000444;//user.PartnerUR:444
          _this.y-=_this.v;
          
        }
        //$LASTPOS=7000460;//user.PartnerUR:460
        if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=7000575;//user.PartnerUR:575
          _this.x-=_this.v;
          
        }
        //$LASTPOS=7000591;//user.PartnerUR:591
        if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=7000704;//user.PartnerUR:704
          _this.x+=_this.v;
          
        }
        //$LASTPOS=7000720;//user.PartnerUR:720
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
          //$LASTPOS=7000757;//user.PartnerUR:757
          _this.v+=2;
          //$LASTPOS=7000771;//user.PartnerUR:771
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=7000801;//user.PartnerUR:801
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
          //$LASTPOS=7000837;//user.PartnerUR:837
          _this.power=300;
          //$LASTPOS=7000856;//user.PartnerUR:856
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=7000886;//user.PartnerUR:886
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal) {
          //$LASTPOS=7000922;//user.PartnerUR:922
          _this.goal=true;
          break;
          
          
        } else {
          //$LASTPOS=7000967;//user.PartnerUR:967
          _this.goal=false;
          
        }
        //$LASTPOS=7000989;//user.PartnerUR:989
        _this.c=_this.within(Tonyu.classes.user.Enemy,25);
        //$LASTPOS=7001013;//user.PartnerUR:1013
        if (_this.c) {
          //$LASTPOS=7001028;//user.PartnerUR:1028
          if (_this.power<=0) {
            //$LASTPOS=7001041;//user.PartnerUR:1041
            Tonyu.globals.$gameOver=true;
          } else {
            //$LASTPOS=7001070;//user.PartnerUR:1070
            _this.c.die();
          }
          
        }
        //$LASTPOS=7001089;//user.PartnerUR:1089
        if (_this.power>0) {
          //$LASTPOS=7001101;//user.PartnerUR:1101
          _this.power--;
        }
        //$LASTPOS=7001154;//user.PartnerUR:1154
        _this.update();
        
      }
      //$LASTPOS=7001166;//user.PartnerUR:1166
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=7001204;//user.PartnerUR:1204
        _this.update();
        
      }
    },
    fiber$main :function _trc_PartnerUR_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000000;//user.PartnerUR:0
      _this.p=Tonyu.globals.$pat_neko+20;
      //$LASTPOS=7000016;//user.PartnerUR:16
      _this.v=2;
      //$LASTPOS=7000021;//user.PartnerUR:21
      _this.power=0;
      //$LASTPOS=7000030;//user.PartnerUR:30
      _this.goal=false;
      
      _thread.enter(function _trc_PartnerUR_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000168;//user.PartnerUR:168
          case 1:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=5; break; }
            //$LASTPOS=7000206;//user.PartnerUR:206
            if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
              //$LASTPOS=7000315;//user.PartnerUR:315
              _this.y+=_this.v;
              
            }
            //$LASTPOS=7000331;//user.PartnerUR:331
            if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
              //$LASTPOS=7000444;//user.PartnerUR:444
              _this.y-=_this.v;
              
            }
            //$LASTPOS=7000460;//user.PartnerUR:460
            if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=7000575;//user.PartnerUR:575
              _this.x-=_this.v;
              
            }
            //$LASTPOS=7000591;//user.PartnerUR:591
            if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=7000704;//user.PartnerUR:704
              _this.x+=_this.v;
              
            }
            //$LASTPOS=7000720;//user.PartnerUR:720
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
              //$LASTPOS=7000757;//user.PartnerUR:757
              _this.v+=2;
              //$LASTPOS=7000771;//user.PartnerUR:771
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=7000801;//user.PartnerUR:801
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
              //$LASTPOS=7000837;//user.PartnerUR:837
              _this.power=300;
              //$LASTPOS=7000856;//user.PartnerUR:856
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=7000886;//user.PartnerUR:886
            if (!(Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal)) { __pc=2; break; }
            //$LASTPOS=7000922;//user.PartnerUR:922
            _this.goal=true;
            __pc=5; break;
            
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=7000967;//user.PartnerUR:967
              _this.goal=false;
            }
          case 3:
            
            //$LASTPOS=7000989;//user.PartnerUR:989
            _this.c=_this.within(Tonyu.classes.user.Enemy,25);
            //$LASTPOS=7001013;//user.PartnerUR:1013
            if (_this.c) {
              //$LASTPOS=7001028;//user.PartnerUR:1028
              if (_this.power<=0) {
                //$LASTPOS=7001041;//user.PartnerUR:1041
                Tonyu.globals.$gameOver=true;
              } else {
                //$LASTPOS=7001070;//user.PartnerUR:1070
                _this.c.die();
              }
              
            }
            //$LASTPOS=7001089;//user.PartnerUR:1089
            if (_this.power>0) {
              //$LASTPOS=7001101;//user.PartnerUR:1101
              _this.power--;
            }
            //$LASTPOS=7001154;//user.PartnerUR:1154
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=7001166;//user.PartnerUR:1166
          case 6:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=8; break; }
            //$LASTPOS=7001204;//user.PartnerUR:1204
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
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
      
      //$LASTPOS=8000000;//user.Player:0
      _this.p=Tonyu.globals.$pat_neko+5;
      //$LASTPOS=8000015;//user.Player:15
      _this.v=2;
      //$LASTPOS=8000020;//user.Player:20
      _this.power=0;
      //$LASTPOS=8000029;//user.Player:29
      _this.goal=false;
      //$LASTPOS=8000150;//user.Player:150
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=8000188;//user.Player:188
        if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
          //$LASTPOS=8000296;//user.Player:296
          _this.y-=_this.v;
          
        }
        //$LASTPOS=8000312;//user.Player:312
        if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
          //$LASTPOS=8000425;//user.Player:425
          _this.y+=_this.v;
          
        }
        //$LASTPOS=8000441;//user.Player:441
        if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=8000554;//user.Player:554
          _this.x-=_this.v;
          
        }
        //$LASTPOS=8000570;//user.Player:570
        if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
          //$LASTPOS=8000685;//user.Player:685
          _this.x+=_this.v;
          
        }
        //$LASTPOS=8000701;//user.Player:701
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
          //$LASTPOS=8000738;//user.Player:738
          _this.v+=2;
          //$LASTPOS=8000752;//user.Player:752
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=8000782;//user.Player:782
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
          //$LASTPOS=8000818;//user.Player:818
          _this.power=300;
          //$LASTPOS=8000837;//user.Player:837
          Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
          
        }
        //$LASTPOS=8000867;//user.Player:867
        if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal) {
          //$LASTPOS=8000903;//user.Player:903
          _this.goal=true;
          break;
          
          
        } else {
          //$LASTPOS=8000948;//user.Player:948
          _this.goal=false;
          
        }
        //$LASTPOS=8000970;//user.Player:970
        _this.c=_this.within(Tonyu.classes.user.Enemy,25);
        //$LASTPOS=8000994;//user.Player:994
        if (_this.c) {
          //$LASTPOS=8001009;//user.Player:1009
          if (_this.power<=0) {
            //$LASTPOS=8001022;//user.Player:1022
            Tonyu.globals.$gameOver=true;
          } else {
            //$LASTPOS=8001051;//user.Player:1051
            _this.c.die();
          }
          
        }
        //$LASTPOS=8001070;//user.Player:1070
        if (_this.power>0) {
          //$LASTPOS=8001082;//user.Player:1082
          _this.power--;
        }
        //$LASTPOS=8001134;//user.Player:1134
        _this.update();
        
      }
      //$LASTPOS=8001146;//user.Player:1146
      while (! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear) {
        //$LASTPOS=8001184;//user.Player:1184
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000000;//user.Player:0
      _this.p=Tonyu.globals.$pat_neko+5;
      //$LASTPOS=8000015;//user.Player:15
      _this.v=2;
      //$LASTPOS=8000020;//user.Player:20
      _this.power=0;
      //$LASTPOS=8000029;//user.Player:29
      _this.goal=false;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000150;//user.Player:150
          case 1:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=5; break; }
            //$LASTPOS=8000188;//user.Player:188
            if ((Tonyu.globals.$pad.getPadUp()||_this.getkey("up"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y-14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y-14)!=Tonyu.globals.$wall) {
              //$LASTPOS=8000296;//user.Player:296
              _this.y-=_this.v;
              
            }
            //$LASTPOS=8000312;//user.Player:312
            if ((Tonyu.globals.$pad.getPadDown()||_this.getkey("down"))&&Tonyu.globals.$map.getAt(_this.x-10,_this.y+14)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+10,_this.y+14)!=Tonyu.globals.$wall) {
              //$LASTPOS=8000425;//user.Player:425
              _this.y+=_this.v;
              
            }
            //$LASTPOS=8000441;//user.Player:441
            if ((Tonyu.globals.$pad.getPadLeft()||_this.getkey("left"))&&Tonyu.globals.$map.getAt(_this.x-14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x-14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=8000554;//user.Player:554
              _this.x-=_this.v;
              
            }
            //$LASTPOS=8000570;//user.Player:570
            if ((Tonyu.globals.$pad.getPadRight()||_this.getkey("right"))&&Tonyu.globals.$map.getAt(_this.x+14,_this.y-10)!=Tonyu.globals.$wall&&Tonyu.globals.$map.getAt(_this.x+14,_this.y+10)!=Tonyu.globals.$wall) {
              //$LASTPOS=8000685;//user.Player:685
              _this.x+=_this.v;
              
            }
            //$LASTPOS=8000701;//user.Player:701
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$apple) {
              //$LASTPOS=8000738;//user.Player:738
              _this.v+=2;
              //$LASTPOS=8000752;//user.Player:752
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=8000782;//user.Player:782
            if (Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$fish) {
              //$LASTPOS=8000818;//user.Player:818
              _this.power=300;
              //$LASTPOS=8000837;//user.Player:837
              Tonyu.globals.$map.setAt(_this.x,_this.y,- 1);
              
            }
            //$LASTPOS=8000867;//user.Player:867
            if (!(Tonyu.globals.$map.getAt(_this.x,_this.y)==Tonyu.globals.$goal)) { __pc=2; break; }
            //$LASTPOS=8000903;//user.Player:903
            _this.goal=true;
            __pc=5; break;
            
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=8000948;//user.Player:948
              _this.goal=false;
            }
          case 3:
            
            //$LASTPOS=8000970;//user.Player:970
            _this.c=_this.within(Tonyu.classes.user.Enemy,25);
            //$LASTPOS=8000994;//user.Player:994
            if (_this.c) {
              //$LASTPOS=8001009;//user.Player:1009
              if (_this.power<=0) {
                //$LASTPOS=8001022;//user.Player:1022
                Tonyu.globals.$gameOver=true;
              } else {
                //$LASTPOS=8001051;//user.Player:1051
                _this.c.die();
              }
              
            }
            //$LASTPOS=8001070;//user.Player:1070
            if (_this.power>0) {
              //$LASTPOS=8001082;//user.Player:1082
              _this.power--;
            }
            //$LASTPOS=8001134;//user.Player:1134
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            //$LASTPOS=8001146;//user.Player:1146
          case 6:
            if (!(! Tonyu.globals.$gameOver&&! Tonyu.globals.$gameClear)) { __pc=8; break; }
            //$LASTPOS=8001184;//user.Player:1184
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
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
  fullName: 'user.Title',
  shortName: 'Title',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Title_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var j;
      
      //$LASTPOS=9000028;//user.Title:28
      Tonyu.globals.$Screen.resize(480,750);
      //$LASTPOS=9000053;//user.Title:53
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=9000082;//user.Title:82
      Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=9000096;//user.Title:96
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=9000138;//user.Title:138
      Tonyu.globals.$map.load("title.json");
      //$LASTPOS=9000163;//user.Title:163
      Tonyu.globals.$wall=Tonyu.globals.$pat_mapchip+62;
      //$LASTPOS=9000186;//user.Title:186
      Tonyu.globals.$apple=Tonyu.globals.$pat_neko+30;
      //$LASTPOS=9000207;//user.Title:207
      Tonyu.globals.$fish=Tonyu.globals.$pat_neko+40;
      //$LASTPOS=9000227;//user.Title:227
      Tonyu.globals.$goal=Tonyu.globals.$pat_mapchip+86;
      //$LASTPOS=9000250;//user.Title:250
      Tonyu.globals.$gameOver=false;
      //$LASTPOS=9000267;//user.Title:267
      Tonyu.globals.$gameClear=false;
      //$LASTPOS=9000285;//user.Title:285
      _this.tl=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: - 100,p: Tonyu.globals.$pat_title,scaleX: 0.7});
      //$LASTPOS=9000362;//user.Title:362
      _this.timeLabel=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2-35,y: Tonyu.globals.$screenHeight-200,align: "left",text: "Press Space",fillStyle: "white",size: 25});
      //$LASTPOS=9000482;//user.Title:482
      //$LASTPOS=9000486;//user.Title:486
      i = 0;
      while(i<Tonyu.globals.$map.col) {
        {
          //$LASTPOS=9000515;//user.Title:515
          //$LASTPOS=9000519;//user.Title:519
          j = 0;
          while(j<Tonyu.globals.$map.row) {
            {
              //$LASTPOS=9000552;//user.Title:552
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+57) {
                //$LASTPOS=9000600;//user.Title:600
                _this.player=new Tonyu.classes.user.Player({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9000652;//user.Title:652
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9000688;//user.Title:688
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+59) {
                //$LASTPOS=9000736;//user.Title:736
                _this.partnerLR=new Tonyu.classes.user.PartnerLR({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9000794;//user.Title:794
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9000830;//user.Title:830
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+66) {
                //$LASTPOS=9000878;//user.Title:878
                _this.partnerUL=new Tonyu.classes.user.PartnerUL({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9000936;//user.Title:936
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9000972;//user.Title:972
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+65) {
                //$LASTPOS=9001020;//user.Title:1020
                _this.partnerUR=new Tonyu.classes.user.PartnerUR({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9001078;//user.Title:1078
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9001114;//user.Title:1114
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+96) {
                //$LASTPOS=9001162;//user.Title:1162
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+30);
                
              }
              //$LASTPOS=9001208;//user.Title:1208
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+99) {
                //$LASTPOS=9001256;//user.Title:1256
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+40);
                
              }
              //$LASTPOS=9001302;//user.Title:1302
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+98) {
                //$LASTPOS=9001350;//user.Title:1350
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "h"});
                //$LASTPOS=9001401;//user.Title:1401
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9001437;//user.Title:1437
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+97) {
                //$LASTPOS=9001485;//user.Title:1485
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "v"});
                //$LASTPOS=9001536;//user.Title:1536
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
            }
            j++;
          }
        }
        i++;
      }
      //$LASTPOS=9001572;//user.Title:1572
      _this.update();
      //$LASTPOS=9001582;//user.Title:1582
      while (_this.tl.y<230) {
        //$LASTPOS=9001603;//user.Title:1603
        _this.tl.y++;
        //$LASTPOS=9001615;//user.Title:1615
        if (_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1) {
          //$LASTPOS=9001671;//user.Title:1671
          _this.tl.y=230;
          
        }
        //$LASTPOS=9001691;//user.Title:1691
        _this.update();
        
      }
      //$LASTPOS=9001703;//user.Title:1703
      while (true) {
        //$LASTPOS=9001720;//user.Title:1720
        if (_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1) {
          break;
          
        }
        //$LASTPOS=9001778;//user.Title:1778
        _this.update();
        
      }
      //$LASTPOS=9001790;//user.Title:1790
      if (_this.player.goal&&_this.partnerUR.goal&&_this.partnerLR.goal&&_this.partnerUL.goal) {
        //$LASTPOS=9001865;//user.Title:1865
        _this.cont=10;
        
      } else {
        //$LASTPOS=9001885;//user.Title:1885
        _this.cont=3;
        
      }
      //$LASTPOS=9001895;//user.Title:1895
      _this.loadPage(Tonyu.classes.user.Main,{cont: _this.cont});
    },
    fiber$main :function _trc_Title_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=9000028;//user.Title:28
      Tonyu.globals.$Screen.resize(480,750);
      //$LASTPOS=9000053;//user.Title:53
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=9000082;//user.Title:82
      Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=9000096;//user.Title:96
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=9000138;//user.Title:138
      Tonyu.globals.$map.load("title.json");
      //$LASTPOS=9000163;//user.Title:163
      Tonyu.globals.$wall=Tonyu.globals.$pat_mapchip+62;
      //$LASTPOS=9000186;//user.Title:186
      Tonyu.globals.$apple=Tonyu.globals.$pat_neko+30;
      //$LASTPOS=9000207;//user.Title:207
      Tonyu.globals.$fish=Tonyu.globals.$pat_neko+40;
      //$LASTPOS=9000227;//user.Title:227
      Tonyu.globals.$goal=Tonyu.globals.$pat_mapchip+86;
      //$LASTPOS=9000250;//user.Title:250
      Tonyu.globals.$gameOver=false;
      //$LASTPOS=9000267;//user.Title:267
      Tonyu.globals.$gameClear=false;
      //$LASTPOS=9000285;//user.Title:285
      _this.tl=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2,y: - 100,p: Tonyu.globals.$pat_title,scaleX: 0.7});
      //$LASTPOS=9000362;//user.Title:362
      _this.timeLabel=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth/2-35,y: Tonyu.globals.$screenHeight-200,align: "left",text: "Press Space",fillStyle: "white",size: 25});
      //$LASTPOS=9000482;//user.Title:482
      //$LASTPOS=9000486;//user.Title:486
      i = 0;
      while(i<Tonyu.globals.$map.col) {
        {
          //$LASTPOS=9000515;//user.Title:515
          //$LASTPOS=9000519;//user.Title:519
          j = 0;
          while(j<Tonyu.globals.$map.row) {
            {
              //$LASTPOS=9000552;//user.Title:552
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+57) {
                //$LASTPOS=9000600;//user.Title:600
                _this.player=new Tonyu.classes.user.Player({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9000652;//user.Title:652
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9000688;//user.Title:688
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+59) {
                //$LASTPOS=9000736;//user.Title:736
                _this.partnerLR=new Tonyu.classes.user.PartnerLR({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9000794;//user.Title:794
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9000830;//user.Title:830
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+66) {
                //$LASTPOS=9000878;//user.Title:878
                _this.partnerUL=new Tonyu.classes.user.PartnerUL({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9000936;//user.Title:936
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9000972;//user.Title:972
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+65) {
                //$LASTPOS=9001020;//user.Title:1020
                _this.partnerUR=new Tonyu.classes.user.PartnerUR({x: 16+32*j,y: 16+32*i});
                //$LASTPOS=9001078;//user.Title:1078
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9001114;//user.Title:1114
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+96) {
                //$LASTPOS=9001162;//user.Title:1162
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+30);
                
              }
              //$LASTPOS=9001208;//user.Title:1208
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+99) {
                //$LASTPOS=9001256;//user.Title:1256
                Tonyu.globals.$map.set(j,i,Tonyu.globals.$pat_neko+40);
                
              }
              //$LASTPOS=9001302;//user.Title:1302
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+98) {
                //$LASTPOS=9001350;//user.Title:1350
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "h"});
                //$LASTPOS=9001401;//user.Title:1401
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
              //$LASTPOS=9001437;//user.Title:1437
              if (Tonyu.globals.$map.get(j,i)==Tonyu.globals.$pat_mapchip+97) {
                //$LASTPOS=9001485;//user.Title:1485
                new Tonyu.classes.user.Enemy({x: 16+32*j,y: 16+32*i,id: "v"});
                //$LASTPOS=9001536;//user.Title:1536
                Tonyu.globals.$map.set(j,i,- 1);
                
              }
            }
            j++;
          }
        }
        i++;
      }
      
      _thread.enter(function _trc_Title_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9001572;//user.Title:1572
            _this.fiber$update(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=9001582;//user.Title:1582
          case 2:
            if (!(_this.tl.y<230)) { __pc=4; break; }
            //$LASTPOS=9001603;//user.Title:1603
            _this.tl.y++;
            //$LASTPOS=9001615;//user.Title:1615
            if (_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1) {
              //$LASTPOS=9001671;//user.Title:1671
              _this.tl.y=230;
              
            }
            //$LASTPOS=9001691;//user.Title:1691
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=9001703;//user.Title:1703
          case 5:
            //$LASTPOS=9001720;//user.Title:1720
            if (!(_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1)) { __pc=6; break; }
            __pc=8; break;
            
          case 6:
            
            //$LASTPOS=9001778;//user.Title:1778
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=5;break;
          case 8:
            
            //$LASTPOS=9001790;//user.Title:1790
            if (_this.player.goal&&_this.partnerUR.goal&&_this.partnerLR.goal&&_this.partnerUL.goal) {
              //$LASTPOS=9001865;//user.Title:1865
              _this.cont=10;
              
            } else {
              //$LASTPOS=9001885;//user.Title:1885
              _this.cont=3;
              
            }
            //$LASTPOS=9001895;//user.Title:1895
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Main, {cont: _this.cont});
            __pc=9;return;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
