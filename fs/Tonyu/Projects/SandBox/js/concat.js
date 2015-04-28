Tonyu.klass.define({
  fullName: 'user.A',
  shortName: 'A',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_A_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000035;//user.A:35
      _this.x=3;
    },
    fiber$main :function _trc_A_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000035;//user.A:35
      _this.x=3;
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_A_initialize(x) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000023;//user.A:23
      _this.x=x;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"A":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.B',
  shortName: 'B',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_B_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000000;//user.B:0
      _this.x=3;
      //$LASTPOS=2000005;//user.B:5
      _this.y=2;
      //$LASTPOS=2000010;//user.B:10
      _this.r="bca".replace(/\w/g,function (e,gi) {
        var r;
        function abc(s) {
          
          //$LASTPOS=2000146;//user.B:146
          _this.a={x: _this.x,r: r,s: s};
          return _this.x+s+r;
        }
        //$LASTPOS=2000047;//user.B:47
        r = 5;
        //$LASTPOS=2000060;//user.B:60
        r=3;
        //$LASTPOS=2000069;//user.B:69
        _this.f=function (r) {
          
          //$LASTPOS=2000086;//user.B:86
          _this.a={x: _this.x,r: r,s: _this.s};
          return _this.x+r;
        };
        
        //$LASTPOS=2000189;//user.B:189
        _this.print(e);
        return "X";
      });
      //$LASTPOS=2000218;//user.B:218
      _this.print(_this.r);
    },
    fiber$main :function _trc_B_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.B:0
      _this.x=3;
      //$LASTPOS=2000005;//user.B:5
      _this.y=2;
      //$LASTPOS=2000010;//user.B:10
      _this.r="bca".replace(/\w/g,function (e,gi) {
        var r;
        function abc(s) {
          
          //$LASTPOS=2000146;//user.B:146
          _this.a={x: _this.x,r: r,s: s};
          return _this.x+s+r;
        }
        //$LASTPOS=2000047;//user.B:47
        r = 5;
        //$LASTPOS=2000060;//user.B:60
        r=3;
        //$LASTPOS=2000069;//user.B:69
        _this.f=function (r) {
          
          //$LASTPOS=2000086;//user.B:86
          _this.a={x: _this.x,r: r,s: _this.s};
          return _this.x+r;
        };
        
        //$LASTPOS=2000189;//user.B:189
        _this.print(e);
        return "X";
      });
      //$LASTPOS=2000218;//user.B:218
      _this.print(_this.r);
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_B_initialize(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000243;//user.B:243
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Bug2',
  shortName: 'Bug2',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Bug2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000000;//user.Bug2:0
      Tonyu.globals.$Screen.setBGColor("black");
      //$LASTPOS=3000029;//user.Bug2:29
      while (true) {
        //$LASTPOS=3000047;//user.Bug2:47
        _this.updateEx(10);
        //$LASTPOS=3000065;//user.Bug2:65
        new Tonyu.classes.user.Honoo;
        
      }
      //$LASTPOS=3000078;//user.Bug2:78
      _this.x=20;
      //$LASTPOS=3000084;//user.Bug2:84
      _this.y=20;
      //$LASTPOS=3000090;//user.Bug2:90
      _this.p=Tonyu.globals.$pat_sample;
      //$LASTPOS=3000105;//user.Bug2:105
      _this.pad=new Tonyu.classes.kernel.Pad;
    },
    fiber$main :function _trc_Bug2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Bug2:0
      Tonyu.globals.$Screen.setBGColor("black");
      
      _thread.enter(function _trc_Bug2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000029;//user.Bug2:29
          case 1:
            //$LASTPOS=3000047;//user.Bug2:47
            _this.fiber$updateEx(_thread, 10);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=3000065;//user.Bug2:65
            new Tonyu.classes.user.Honoo;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=3000078;//user.Bug2:78
            _this.x=20;
            //$LASTPOS=3000084;//user.Bug2:84
            _this.y=20;
            //$LASTPOS=3000090;//user.Bug2:90
            _this.p=Tonyu.globals.$pat_sample;
            //$LASTPOS=3000105;//user.Bug2:105
            _this.pad=new Tonyu.classes.kernel.Pad;
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
  fullName: 'user.C',
  shortName: 'C',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_C_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000131;//user.C:131
      _this.test(2,3);
      //$LASTPOS=4000142;//user.C:142
      _this.test(2,3);
      //$LASTPOS=4000159;//user.C:159
      while (true) {
        //$LASTPOS=4000177;//user.C:177
        _this.play("cde");
        //$LASTPOS=4000194;//user.C:194
        _this.print("^^");
        
      }
    },
    fiber$main :function _trc_C_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_C_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000131;//user.C:131
            _this.fiber$test(_thread, 2, 3);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=4000142;//user.C:142
            _this.test(2,3);
            //$LASTPOS=4000159;//user.C:159
          case 2:
            //$LASTPOS=4000177;//user.C:177
            _this.fiber$play(_thread, "cde");
            __pc=3;return;
          case 3:
            
            //$LASTPOS=4000194;//user.C:194
            _this.print("^^");
            __pc=2;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    test :function _trc_C_test() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      function f() {
        
        //$LASTPOS=4000028;//user.C:28
        _this.print(arguments[0]);
        //$LASTPOS=4000057;//user.C:57
        _this.print(null);
      }
      
      //$LASTPOS=4000083;//user.C:83
      _this.print(arguments[1]);
      //$LASTPOS=4000108;//user.C:108
      f(arguments.length);
    },
    fiber$test :function _trc_C_f_test(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      function f() {
        
        //$LASTPOS=4000028;//user.C:28
        _this.print(arguments[0]);
        //$LASTPOS=4000057;//user.C:57
        _this.print(null);
      }
      
      //$LASTPOS=4000083;//user.C:83
      _this.print(_arguments[1]);
      //$LASTPOS=4000108;//user.C:108
      f(_arguments.length);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"test":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Honoo',
  shortName: 'Honoo',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Honoo_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=5000000;//user.Honoo:0
      _this.p=Tonyu.globals.$pat_prominenceburn;
      //$LASTPOS=5000023;//user.Honoo:23
      _this.x=_this.rnd(300);
      //$LASTPOS=5000034;//user.Honoo:34
      _this.y=_this.rnd(300);
      //$LASTPOS=5000046;//user.Honoo:46
      _this.alpha=255;
      //$LASTPOS=5000057;//user.Honoo:57
      //$LASTPOS=5000061;//user.Honoo:61
      _this.i=0;
      while(_this.i<15) {
        {
          //$LASTPOS=5000082;//user.Honoo:82
          _this.p++;
          //$LASTPOS=5000091;//user.Honoo:91
          _this.alpha-=10;
          //$LASTPOS=5000106;//user.Honoo:106
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=5000118;//user.Honoo:118
      _this.die();
    },
    fiber$main :function _trc_Honoo_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000000;//user.Honoo:0
      _this.p=Tonyu.globals.$pat_prominenceburn;
      //$LASTPOS=5000023;//user.Honoo:23
      _this.x=_this.rnd(300);
      //$LASTPOS=5000034;//user.Honoo:34
      _this.y=_this.rnd(300);
      //$LASTPOS=5000046;//user.Honoo:46
      _this.alpha=255;
      
      _thread.enter(function _trc_Honoo_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000057;//user.Honoo:57
            //$LASTPOS=5000061;//user.Honoo:61
            _this.i=0;;
          case 1:
            if (!(_this.i<15)) { __pc=3; break; }
            //$LASTPOS=5000082;//user.Honoo:82
            _this.p++;
            //$LASTPOS=5000091;//user.Honoo:91
            _this.alpha-=10;
            //$LASTPOS=5000106;//user.Honoo:106
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            _this.i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=5000118;//user.Honoo:118
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
      
      //$LASTPOS=6000335;//user.Main:335
      _this.x=0;
      //$LASTPOS=6000344;//user.Main:344
      _this.y=300;
      //$LASTPOS=6000355;//user.Main:355
      while (true) {
        //$LASTPOS=6000377;//user.Main:377
        _this.drawLine(_this.x,0,100,100);
        //$LASTPOS=6000408;//user.Main:408
        if (_this.x==100) {
          //$LASTPOS=6000420;//user.Main:420
          _this.a.b.c=4;
        }
        //$LASTPOS=6000437;//user.Main:437
        _this._fukidashi={c: 10,text: "あいう",size: 30};
        //$LASTPOS=6000483;//user.Main:483
        _this.x++;
        //$LASTPOS=6000496;//user.Main:496
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000335;//user.Main:335
      _this.x=0;
      //$LASTPOS=6000344;//user.Main:344
      _this.y=300;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000355;//user.Main:355
          case 1:
            //$LASTPOS=6000377;//user.Main:377
            _this.drawLine(_this.x,0,100,100);
            //$LASTPOS=6000408;//user.Main:408
            if (_this.x==100) {
              //$LASTPOS=6000420;//user.Main:420
              _this.a.b.c=4;
            }
            //$LASTPOS=6000437;//user.Main:437
            _this._fukidashi={c: 10,text: "あいう",size: 30};
            //$LASTPOS=6000483;//user.Main:483
            _this.x++;
            //$LASTPOS=6000496;//user.Main:496
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
  fullName: 'user.Maps',
  shortName: 'Maps',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Maps_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=7000000;//user.Maps:0
      _this.hoge;
    },
    fiber$main :function _trc_Maps_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000000;//user.Maps:0
      _this.hoge;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.MkFileTest',
  shortName: 'MkFileTest',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MkFileTest_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pp;
      var _it_8;
      
      //$LASTPOS=8000048;//user.MkFileTest:48
      _this.x=200;
      //$LASTPOS=8000054;//user.MkFileTest:54
      _this.y=100;
      //$LASTPOS=8000061;//user.MkFileTest:61
      _this.ps=[Tonyu.globals.$pat_2011_12_04_12_57_51,Tonyu.globals.$pat_base,Tonyu.globals.$pat_sample,Tonyu.globals.$pat_neko,Tonyu.globals.$pat_mglogo,Tonyu.globals.$pat_tonyu];
      //$LASTPOS=8000157;//user.MkFileTest:157
      while (true) {
        //$LASTPOS=8000197;//user.MkFileTest:197
        _it_8=Tonyu.iterator(_this.ps,1);
        while(_it_8.next()) {
          pp=_it_8[0];
          
          //$LASTPOS=8000226;//user.MkFileTest:226
          _this.p=pp;
          //$LASTPOS=8000240;//user.MkFileTest:240
          _this.updateEx(30);
          
        }
        
      }
    },
    fiber$main :function _trc_MkFileTest_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pp;
      var _it_8;
      
      //$LASTPOS=8000048;//user.MkFileTest:48
      _this.x=200;
      //$LASTPOS=8000054;//user.MkFileTest:54
      _this.y=100;
      //$LASTPOS=8000061;//user.MkFileTest:61
      _this.ps=[Tonyu.globals.$pat_2011_12_04_12_57_51,Tonyu.globals.$pat_base,Tonyu.globals.$pat_sample,Tonyu.globals.$pat_neko,Tonyu.globals.$pat_mglogo,Tonyu.globals.$pat_tonyu];
      
      _thread.enter(function _trc_MkFileTest_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000157;//user.MkFileTest:157
          case 1:
            //$LASTPOS=8000197;//user.MkFileTest:197
            _it_8=Tonyu.iterator(_this.ps,1);
          case 2:
            if (!(_it_8.next())) { __pc=4; break; }
            pp=_it_8[0];
            
            //$LASTPOS=8000226;//user.MkFileTest:226
            _this.p=pp;
            //$LASTPOS=8000240;//user.MkFileTest:240
            _this.fiber$updateEx(_thread, 30);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
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
  fullName: 'user.MML',
  shortName: 'MML',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MML_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=9000010;//user.MML:10
      _this.x=0;
      //$LASTPOS=9000015;//user.MML:15
      _this.f({});
      //$LASTPOS=9000020;//user.MML:20
      $("canvas").click(function () {
        
        //$LASTPOS=9000045;//user.MML:45
        _this.print("test");
      });
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000010;//user.MML:10
      _this.x=0;
      
      _thread.enter(function _trc_MML_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000015;//user.MML:15
            _this.fiber$f(_thread, {});
            __pc=1;return;
          case 1:
            
            //$LASTPOS=9000020;//user.MML:20
            $("canvas").click(function () {
              
              //$LASTPOS=9000045;//user.MML:45
              _this.print("test");
            });
            _thread.exit(_this);return;
          }
        }
      });
    },
    f :function _trc_MML_f(e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=9000075;//user.MML:75
      _this.x++;
      //$LASTPOS=9000084;//user.MML:84
      _this.print(_this.x,e);
    },
    fiber$f :function _trc_MML_f_f(_thread,e) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000075;//user.MML:75
      _this.x++;
      //$LASTPOS=9000084;//user.MML:84
      _this.print(_this.x,e);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"f":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Panel',
  shortName: 'Panel',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Panel_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Panel_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Panel_initialize(opt) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000072;//user.Panel:72
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=10000089;//user.Panel:89
      _this.width=_this.width;
      //$LASTPOS=10000112;//user.Panel:112
      _this.height=_this.height;
      //$LASTPOS=10000137;//user.Panel:137
      if (_this.align==null) {
        //$LASTPOS=10000153;//user.Panel:153
        _this.align="center";
      }
      //$LASTPOS=10000174;//user.Panel:174
      if (_this.alpha==null) {
        //$LASTPOS=10000190;//user.Panel:190
        _this.alpha=255;
      }
      //$LASTPOS=10000206;//user.Panel:206
      _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000278;//user.Panel:278
      _this.width=width;
      //$LASTPOS=10000301;//user.Panel:301
      _this.height=height;
      //$LASTPOS=10000326;//user.Panel:326
      _this.buf=$("<canvas>").attr({width: width,height: height});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000278;//user.Panel:278
      _this.width=width;
      //$LASTPOS=10000301;//user.Panel:301
      _this.height=height;
      //$LASTPOS=10000326;//user.Panel:326
      _this.buf=$("<canvas>").attr({width: width,height: height});
      
      _thread.retVal=_this;return;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000395;//user.Panel:395
      _this.color=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000395;//user.Panel:395
      _this.color=color;
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000459;//user.Panel:459
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10000493;//user.Panel:493
      _this.ctx.save();
      //$LASTPOS=10000560;//user.Panel:560
      _this.ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=10000586;//user.Panel:586
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=10000631;//user.Panel:631
      _this.ctx.restore();
    },
    fiber$fillRect :function _trc_Panel_f_fillRect(_thread,x,y,rectWidth,rectHeight) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000459;//user.Panel:459
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10000493;//user.Panel:493
      _this.ctx.save();
      //$LASTPOS=10000560;//user.Panel:560
      _this.ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=10000586;//user.Panel:586
      _this.ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=10000631;//user.Panel:631
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000687;//user.Panel:687
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10000721;//user.Panel:721
      _this.ctx.save();
      //$LASTPOS=10000788;//user.Panel:788
      _this.ctx.textAlign=align;
      //$LASTPOS=10000816;//user.Panel:816
      _this.ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=10000842;//user.Panel:842
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=10000881;//user.Panel:881
      _this.ctx.fillText(text,x,y);
      //$LASTPOS=10000910;//user.Panel:910
      _this.ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000687;//user.Panel:687
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10000721;//user.Panel:721
      _this.ctx.save();
      //$LASTPOS=10000788;//user.Panel:788
      _this.ctx.textAlign=align;
      //$LASTPOS=10000816;//user.Panel:816
      _this.ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
      //$LASTPOS=10000842;//user.Panel:842
      _this.ctx.font=size+"px 'Courier New'";
      //$LASTPOS=10000881;//user.Panel:881
      _this.ctx.fillText(text,x,y);
      //$LASTPOS=10000910;//user.Panel:910
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10000975;//user.Panel:975
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10001009;//user.Panel:1009
      _this.ctx.save();
      //$LASTPOS=10001026;//user.Panel:1026
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=10001075;//user.Panel:1075
      _this.ctx.restore();
    },
    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10000975;//user.Panel:975
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10001009;//user.Panel:1009
      _this.ctx.save();
      //$LASTPOS=10001026;//user.Panel:1026
      _this.ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=10001075;//user.Panel:1075
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10001121;//user.Panel:1121
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=10001220;//user.Panel:1220
        _this.ctx=_this.buf[0].getContext("2d");
        //$LASTPOS=10001258;//user.Panel:1258
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=10001310;//user.Panel:1310
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=10001450;//user.Panel:1450
        _this.colordata=[0,0,0,0];
        
      }
      return (_this.colordata);
    },
    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10001121;//user.Panel:1121
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=10001220;//user.Panel:1220
        _this.ctx=_this.buf[0].getContext("2d");
        //$LASTPOS=10001258;//user.Panel:1258
        _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=10001310;//user.Panel:1310
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=10001450;//user.Panel:1450
        _this.colordata=[0,0,0,0];
        
      }
      _thread.retVal=(_this.colordata);return;
      
      
      _thread.retVal=_this;return;
    },
    scroll :function _trc_Panel_scroll(scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10001537;//user.Panel:1537
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10001571;//user.Panel:1571
      _this.ctx.save();
      //$LASTPOS=10001588;//user.Panel:1588
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=10001649;//user.Panel:1649
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=10001683;//user.Panel:1683
      _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=10001735;//user.Panel:1735
      _this.ctx.restore();
    },
    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10001537;//user.Panel:1537
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=10001571;//user.Panel:1571
      _this.ctx.save();
      //$LASTPOS=10001588;//user.Panel:1588
      _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
      
      _thread.enter(function _trc_Panel_ent_scroll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10001649;//user.Panel:1649
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=10001683;//user.Panel:1683
            _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=10001735;//user.Panel:1735
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=10001771;//user.Panel:1771
      _this.pImg=_this.buf[0];
      //$LASTPOS=10001789;//user.Panel:1789
      ctx.save();
      //$LASTPOS=10001806;//user.Panel:1806
      if (_this.align=="left") {
        //$LASTPOS=10001834;//user.Panel:1834
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=10001882;//user.Panel:1882
        if (_this.align=="center") {
          //$LASTPOS=10001912;//user.Panel:1912
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=10001943;//user.Panel:1943
          if (_this.align=="right") {
            //$LASTPOS=10001972;//user.Panel:1972
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=10002021;//user.Panel:2021
      if (_this.rotation!=0) {
        //$LASTPOS=10002052;//user.Panel:2052
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=10002112;//user.Panel:2112
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=10002161;//user.Panel:2161
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=10002198;//user.Panel:2198
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=10002290;//user.Panel:2290
      ctx.restore();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.SlideShow',
  shortName: 'SlideShow',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_SlideShow_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var pp;
      var _it_11;
      
      //$LASTPOS=11000048;//user.SlideShow:48
      _this.x=200;
      //$LASTPOS=11000054;//user.SlideShow:54
      _this.y=100;
      //$LASTPOS=11000061;//user.SlideShow:61
      _this.ps=[Tonyu.globals.$pat_2011_12_04_12_57_51,Tonyu.globals.$pat_base,Tonyu.globals.$pat_sample,Tonyu.globals.$pat_neko,Tonyu.globals.$pat_mglogo,Tonyu.globals.$pat_tonyu];
      //$LASTPOS=11000157;//user.SlideShow:157
      while (true) {
        //$LASTPOS=11000197;//user.SlideShow:197
        _it_11=Tonyu.iterator(_this.ps,1);
        while(_it_11.next()) {
          pp=_it_11[0];
          
          //$LASTPOS=11000226;//user.SlideShow:226
          _this.p=pp;
          //$LASTPOS=11000240;//user.SlideShow:240
          _this.updateEx(30);
          
        }
        
      }
    },
    fiber$main :function _trc_SlideShow_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pp;
      var _it_11;
      
      //$LASTPOS=11000048;//user.SlideShow:48
      _this.x=200;
      //$LASTPOS=11000054;//user.SlideShow:54
      _this.y=100;
      //$LASTPOS=11000061;//user.SlideShow:61
      _this.ps=[Tonyu.globals.$pat_2011_12_04_12_57_51,Tonyu.globals.$pat_base,Tonyu.globals.$pat_sample,Tonyu.globals.$pat_neko,Tonyu.globals.$pat_mglogo,Tonyu.globals.$pat_tonyu];
      
      _thread.enter(function _trc_SlideShow_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000157;//user.SlideShow:157
          case 1:
            //$LASTPOS=11000197;//user.SlideShow:197
            _it_11=Tonyu.iterator(_this.ps,1);
          case 2:
            if (!(_it_11.next())) { __pc=4; break; }
            pp=_it_11[0];
            
            //$LASTPOS=11000226;//user.SlideShow:226
            _this.p=pp;
            //$LASTPOS=11000240;//user.SlideShow:240
            _this.fiber$updateEx(_thread, 30);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
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
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Test_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var v;
      var _it_14;
      
      //$LASTPOS=12000000;//user.Test:0
      _this.a=[2,3,5,50,23];
      //$LASTPOS=12000017;//user.Test:17
      _it_14=Tonyu.iterator(_this.a,2);
      while(_it_14.next()) {
        i=_it_14[0];
        v=_it_14[1];
        
        //$LASTPOS=12000042;//user.Test:42
        _this.print(i+"="+v);
        
      }
      //$LASTPOS=12000061;//user.Test:61
      //$LASTPOS=12000066;//user.Test:66
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=12000093;//user.Test:93
          _this.print("i="+i);
        }
        i++;
      }
      //$LASTPOS=12000111;//user.Test:111
      //$LASTPOS=12000116;//user.Test:116
      _this.x=0;
      while(_this.x<300) {
        {
          //$LASTPOS=12000140;//user.Test:140
          _this.y=_this.a[_this.x%_this.a.length];
          //$LASTPOS=12000161;//user.Test:161
          _this.p=Tonyu.globals.$pat_sample;
          //$LASTPOS=12000180;//user.Test:180
          _this.update();
        }
        _this.x++;
      }
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var v;
      var _it_14;
      
      //$LASTPOS=12000000;//user.Test:0
      _this.a=[2,3,5,50,23];
      //$LASTPOS=12000017;//user.Test:17
      _it_14=Tonyu.iterator(_this.a,2);
      while(_it_14.next()) {
        i=_it_14[0];
        v=_it_14[1];
        
        //$LASTPOS=12000042;//user.Test:42
        _this.print(i+"="+v);
        
      }
      //$LASTPOS=12000061;//user.Test:61
      //$LASTPOS=12000066;//user.Test:66
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=12000093;//user.Test:93
          _this.print("i="+i);
        }
        i++;
      }
      
      _thread.enter(function _trc_Test_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000111;//user.Test:111
            //$LASTPOS=12000116;//user.Test:116
            _this.x=0;;
          case 1:
            if (!(_this.x<300)) { __pc=3; break; }
            //$LASTPOS=12000140;//user.Test:140
            _this.y=_this.a[_this.x%_this.a.length];
            //$LASTPOS=12000161;//user.Test:161
            _this.p=Tonyu.globals.$pat_sample;
            //$LASTPOS=12000180;//user.Test:180
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            _this.x++;
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
  fullName: 'user.Timer',
  shortName: 'Timer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Timer_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=13000000;//user.Timer:0
      _this.t=0;
      //$LASTPOS=13000004;//user.Timer:4
      _this.x=20;
      //$LASTPOS=13000009;//user.Timer:9
      _this.y=20;
      //$LASTPOS=13000015;//user.Timer:15
      while (true) {
        //$LASTPOS=13000033;//user.Timer:33
        _this.text=_this.floor(_this.t/30);
        //$LASTPOS=13000051;//user.Timer:51
        _this.t++;
        //$LASTPOS=13000079;//user.Timer:79
        _this.x++;
        //$LASTPOS=13000088;//user.Timer:88
        _this.update();
        
      }
    },
    fiber$main :function _trc_Timer_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000000;//user.Timer:0
      _this.t=0;
      //$LASTPOS=13000004;//user.Timer:4
      _this.x=20;
      //$LASTPOS=13000009;//user.Timer:9
      _this.y=20;
      
      _thread.enter(function _trc_Timer_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000015;//user.Timer:15
          case 1:
            //$LASTPOS=13000033;//user.Timer:33
            _this.text=_this.floor(_this.t/30);
            //$LASTPOS=13000051;//user.Timer:51
            _this.t++;
            //$LASTPOS=13000079;//user.Timer:79
            _this.x++;
            //$LASTPOS=13000088;//user.Timer:88
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
  fullName: 'user.TryTest',
  shortName: 'TryTest',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_TryTest_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000581;//user.TryTest:581
      _this.test2();
    },
    fiber$main :function _trc_TryTest_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TryTest_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000581;//user.TryTest:581
            _this.fiber$test2(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    toste :function _trc_TryTest_toste() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=14000016;//user.TryTest:16
      _this.print("enter toste");
      //$LASTPOS=14000042;//user.TryTest:42
      _this.updateEx(30);
      throw new Error("とすて");
      
    },
    fiber$toste :function _trc_TryTest_f_toste(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000016;//user.TryTest:16
      _this.print("enter toste");
      
      _thread.enter(function _trc_TryTest_ent_toste(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000042;//user.TryTest:42
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            
            throw new Error("とすて");
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    test :function _trc_TryTest_test() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      try {
        //$LASTPOS=14000115;//user.TryTest:115
        _this.print("enter test");
        //$LASTPOS=14000144;//user.TryTest:144
        _this.updateEx(30);
        
      } catch (e) {
        //$LASTPOS=14000203;//user.TryTest:203
        _this.print(e);
        
      }
    },
    fiber$test :function _trc_TryTest_f_test(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      
      _thread.enter(function _trc_TryTest_ent_test(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            _thread.enterTry(2);
            //$LASTPOS=14000115;//user.TryTest:115
            _this.print("enter test");
            //$LASTPOS=14000144;//user.TryTest:144
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            _thread.exitTry();
            __pc=3;break;
          case 2:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=14000203;//user.TryTest:203
              _this.print(e);
            }
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    test2 :function _trc_TryTest_test2() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      //$LASTPOS=14000237;//user.TryTest:237
      //$LASTPOS=14000242;//user.TryTest:242
      _this.j=0;
      while(_this.j<2) {
        {
          try {
            //$LASTPOS=14000284;//user.TryTest:284
            _this.print("enter test2");
            //$LASTPOS=14000318;//user.TryTest:318
            _this.updateEx(3);
            //$LASTPOS=14000343;//user.TryTest:343
            //$LASTPOS=14000348;//user.TryTest:348
            _this.i=0;
            while(_this.i<2) {
              {
                //$LASTPOS=14000379;//user.TryTest:379
                _this.update();
                break;
                
              }
              _this.i++;
            }
            //$LASTPOS=14000438;//user.TryTest:438
            _this.test();
            //$LASTPOS=14000458;//user.TryTest:458
            _this.toste();
            
          } catch (e) {
            //$LASTPOS=14000500;//user.TryTest:500
            _this.print(e);
            
          }
        }
        _this.j++;
      }
    },
    fiber$test2 :function _trc_TryTest_f_test2(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      
      
      _thread.enter(function _trc_TryTest_ent_test2(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000237;//user.TryTest:237
            //$LASTPOS=14000242;//user.TryTest:242
            _this.j=0;;
          case 1:
            if (!(_this.j<2)) { __pc=10; break; }
            _thread.enterTry(8);
            //$LASTPOS=14000284;//user.TryTest:284
            _this.print("enter test2");
            //$LASTPOS=14000318;//user.TryTest:318
            _this.fiber$updateEx(_thread, 3);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=14000343;//user.TryTest:343
            //$LASTPOS=14000348;//user.TryTest:348
            _this.i=0;;
          case 3:
            if (!(_this.i<2)) { __pc=5; break; }
            //$LASTPOS=14000379;//user.TryTest:379
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=5; break;
            
            _this.i++;
            __pc=3;break;
          case 5:
            
            //$LASTPOS=14000438;//user.TryTest:438
            _this.fiber$test(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=14000458;//user.TryTest:458
            _this.fiber$toste(_thread);
            __pc=7;return;
          case 7:
            _thread.exitTry();
            __pc=9;break;
          case 8:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=14000500;//user.TryTest:500
              _this.print(e);
            }
          case 9:
            
            _this.j++;
            __pc=1;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"toste":{"nowait":false},"test":{"nowait":false},"test2":{"nowait":false}}}
});
