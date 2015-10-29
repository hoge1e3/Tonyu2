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
      Tonyu.globals.$Screen.resize(256+16,212);
      //$LASTPOS=1000028;//user.Main:28
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=1000057;//user.Main:57
      Tonyu.globals.$map0=new Tonyu.classes.kernel.Map({chipWidth: 16,chipHeight: 16,row: 14,col: 16});
      //$LASTPOS=1000115;//user.Main:115
      _this.pw=20;
      //$LASTPOS=1000122;//user.Main:122
      Tonyu.globals.$map1=new Tonyu.classes.kernel.Map({chipWidth: 16,chipHeight: 16,row: 14,col: 16});
      //$LASTPOS=1000180;//user.Main:180
      _this.setPage(0);
      //$LASTPOS=1000192;//user.Main:192
      //$LASTPOS=1000197;//user.Main:197
      _this.i=0;
      while(_this.i<=8) {
        {
          //$LASTPOS=1000217;//user.Main:217
          if (_this.i<8) {
            //$LASTPOS=1000236;//user.Main:236
            _this.put(Tonyu.globals.$map0,_this.i*2,8,Tonyu.globals.$pat_nekoFight);
            //$LASTPOS=1000278;//user.Main:278
            _this.put(Tonyu.globals.$map0,_this.i*2,10,Tonyu.globals.$pat_nekoFight+_this.pw*2);
            //$LASTPOS=1000326;//user.Main:326
            _this.put(Tonyu.globals.$map0,_this.i*2,12,Tonyu.globals.$pat_nekoFight+_this.pw*4);
            
          }
          //$LASTPOS=1000376;//user.Main:376
          _this.put(Tonyu.globals.$map1,_this.i*2-1,8,Tonyu.globals.$pat_nekoFight);
          //$LASTPOS=1000416;//user.Main:416
          _this.put(Tonyu.globals.$map1,_this.i*2-1,10,Tonyu.globals.$pat_nekoFight+_this.pw*2);
          //$LASTPOS=1000462;//user.Main:462
          _this.put(Tonyu.globals.$map1,_this.i*2-1,12,Tonyu.globals.$pat_nekoFight+_this.pw*4);
        }
        _this.i++;
      }
      //$LASTPOS=1000812;//user.Main:812
      while (true) {
        //$LASTPOS=1000830;//user.Main:830
        //$LASTPOS=1000835;//user.Main:835
        _this.i=- 7;
        while(_this.i<=8) {
          {
            //$LASTPOS=1000862;//user.Main:862
            _this.setAdjust(_this.i,0);
            //$LASTPOS=1000886;//user.Main:886
            _this.update();
          }
          _this.i++;
        }
        //$LASTPOS=1000906;//user.Main:906
        _this.setPage(1);
        //$LASTPOS=1000922;//user.Main:922
        //$LASTPOS=1000927;//user.Main:927
        _this.i=- 7;
        while(_this.i<=8) {
          {
            //$LASTPOS=1000954;//user.Main:954
            _this.setAdjust(_this.i,0);
            //$LASTPOS=1000978;//user.Main:978
            _this.update();
          }
          _this.i++;
        }
        //$LASTPOS=1000998;//user.Main:998
        _this.setPage(0);
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      Tonyu.globals.$Screen.resize(256+16,212);
      //$LASTPOS=1000028;//user.Main:28
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=1000057;//user.Main:57
      Tonyu.globals.$map0=new Tonyu.classes.kernel.Map({chipWidth: 16,chipHeight: 16,row: 14,col: 16});
      //$LASTPOS=1000115;//user.Main:115
      _this.pw=20;
      //$LASTPOS=1000122;//user.Main:122
      Tonyu.globals.$map1=new Tonyu.classes.kernel.Map({chipWidth: 16,chipHeight: 16,row: 14,col: 16});
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000180;//user.Main:180
            _this.fiber$setPage(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000192;//user.Main:192
            //$LASTPOS=1000197;//user.Main:197
            _this.i=0;;
          case 2:
            if (!(_this.i<=8)) { __pc=10; break; }
            //$LASTPOS=1000217;//user.Main:217
            if (!(_this.i<8)) { __pc=6; break; }
            //$LASTPOS=1000236;//user.Main:236
            _this.fiber$put(_thread, Tonyu.globals.$map0, _this.i*2, 8, Tonyu.globals.$pat_nekoFight);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=1000278;//user.Main:278
            _this.fiber$put(_thread, Tonyu.globals.$map0, _this.i*2, 10, Tonyu.globals.$pat_nekoFight+_this.pw*2);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=1000326;//user.Main:326
            _this.fiber$put(_thread, Tonyu.globals.$map0, _this.i*2, 12, Tonyu.globals.$pat_nekoFight+_this.pw*4);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=1000376;//user.Main:376
            _this.fiber$put(_thread, Tonyu.globals.$map1, _this.i*2-1, 8, Tonyu.globals.$pat_nekoFight);
            __pc=7;return;
          case 7:
            
            //$LASTPOS=1000416;//user.Main:416
            _this.fiber$put(_thread, Tonyu.globals.$map1, _this.i*2-1, 10, Tonyu.globals.$pat_nekoFight+_this.pw*2);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=1000462;//user.Main:462
            _this.fiber$put(_thread, Tonyu.globals.$map1, _this.i*2-1, 12, Tonyu.globals.$pat_nekoFight+_this.pw*4);
            __pc=9;return;
          case 9:
            
            _this.i++;
            __pc=2;break;
          case 10:
            
            //$LASTPOS=1000812;//user.Main:812
          case 11:
            //$LASTPOS=1000830;//user.Main:830
            //$LASTPOS=1000835;//user.Main:835
            _this.i=- 7;;
          case 12:
            if (!(_this.i<=8)) { __pc=15; break; }
            //$LASTPOS=1000862;//user.Main:862
            _this.fiber$setAdjust(_thread, _this.i, 0);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=1000886;//user.Main:886
            _this.fiber$update(_thread);
            __pc=14;return;
          case 14:
            
            _this.i++;
            __pc=12;break;
          case 15:
            
            //$LASTPOS=1000906;//user.Main:906
            _this.fiber$setPage(_thread, 1);
            __pc=16;return;
          case 16:
            
            //$LASTPOS=1000922;//user.Main:922
            //$LASTPOS=1000927;//user.Main:927
            _this.i=- 7;;
          case 17:
            if (!(_this.i<=8)) { __pc=20; break; }
            //$LASTPOS=1000954;//user.Main:954
            _this.fiber$setAdjust(_thread, _this.i, 0);
            __pc=18;return;
          case 18:
            
            //$LASTPOS=1000978;//user.Main:978
            _this.fiber$update(_thread);
            __pc=19;return;
          case 19:
            
            _this.i++;
            __pc=17;break;
          case 20:
            
            //$LASTPOS=1000998;//user.Main:998
            _this.fiber$setPage(_thread, 0);
            __pc=21;return;
          case 21:
            
            __pc=11;break;
          case 22:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    put :function _trc_Main_put(m,x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1001038;//user.Main:1038
      m.set(x,y,p);
      //$LASTPOS=1001056;//user.Main:1056
      m.set(x+1,y,p+1);
      //$LASTPOS=1001078;//user.Main:1078
      m.set(x,y+1,p+_this.pw);
      //$LASTPOS=1001101;//user.Main:1101
      m.set(x+1,y+1,p+1+_this.pw);
    },
    fiber$put :function _trc_Main_f_put(_thread,m,x,y,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1001038;//user.Main:1038
      m.set(x,y,p);
      //$LASTPOS=1001056;//user.Main:1056
      m.set(x+1,y,p+1);
      //$LASTPOS=1001078;//user.Main:1078
      m.set(x,y+1,p+_this.pw);
      //$LASTPOS=1001101;//user.Main:1101
      m.set(x+1,y+1,p+1+_this.pw);
      
      _thread.retVal=_this;return;
    },
    setPage :function _trc_Main_setPage(pg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1001145;//user.Main:1145
      if (pg==0) {
        //$LASTPOS=1001166;//user.Main:1166
        Tonyu.globals.$map0.scrollTo(- 16,0);
        //$LASTPOS=1001197;//user.Main:1197
        Tonyu.globals.$map1.scrollTo(0,- 256);
        
      } else {
        //$LASTPOS=1001242;//user.Main:1242
        Tonyu.globals.$map1.scrollTo(- 16,0);
        //$LASTPOS=1001273;//user.Main:1273
        Tonyu.globals.$map0.scrollTo(0,- 256);
        
      }
    },
    fiber$setPage :function _trc_Main_f_setPage(_thread,pg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1001145;//user.Main:1145
      if (pg==0) {
        //$LASTPOS=1001166;//user.Main:1166
        Tonyu.globals.$map0.scrollTo(- 16,0);
        //$LASTPOS=1001197;//user.Main:1197
        Tonyu.globals.$map1.scrollTo(0,- 256);
        
      } else {
        //$LASTPOS=1001242;//user.Main:1242
        Tonyu.globals.$map1.scrollTo(- 16,0);
        //$LASTPOS=1001273;//user.Main:1273
        Tonyu.globals.$map0.scrollTo(0,- 256);
        
      }
      
      _thread.retVal=_this;return;
    },
    setAdjust :function _trc_Main_setAdjust(x,y) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1001327;//user.Main:1327
      Tonyu.globals.$Screen.scrollTo(x+8,y+8);
    },
    fiber$setAdjust :function _trc_Main_f_setAdjust(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1001327;//user.Main:1327
      Tonyu.globals.$Screen.scrollTo(x+8,y+8);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"put":{"nowait":false},"setPage":{"nowait":false},"setAdjust":{"nowait":false}}}
});
