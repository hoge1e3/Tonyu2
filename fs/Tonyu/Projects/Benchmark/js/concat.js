Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.BenchMarker=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_BenchMarker_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000046;//user.BenchMarker:46
    _this.marks={};
  },
  fiber$main :function _trc_BenchMarker_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000046;//user.BenchMarker:46
    _this.marks={};
    
    _thread.retVal=_this;return;
  },
  start :function _trc_BenchMarker_start(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000073;//user.BenchMarker:73
    if (! _this.marks[id]) {
      //$LASTPOS=1000089;//user.BenchMarker:89
      _this.marks[id]={count: 0,times: 0};
    }
    //$LASTPOS=1000122;//user.BenchMarker:122
    _this.marks[id].start=new Date().getTime();
  },
  fiber$start :function _trc_BenchMarker_f_start(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000073;//user.BenchMarker:73
    if (! _this.marks[id]) {
      //$LASTPOS=1000089;//user.BenchMarker:89
      _this.marks[id]={count: 0,times: 0};
    }
    //$LASTPOS=1000122;//user.BenchMarker:122
    _this.marks[id].start=new Date().getTime();
    
    _thread.retVal=_this;return;
  },
  end :function _trc_BenchMarker_end(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var m;
    
    //$LASTPOS=1000177;//user.BenchMarker:177
    m = _this.marks[id];
    //$LASTPOS=1000198;//user.BenchMarker:198
    m.count++;
    //$LASTPOS=1000213;//user.BenchMarker:213
    m.times+=new Date().getTime()-m.start;
  },
  fiber$end :function _trc_BenchMarker_f_end(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var m;
    
    //$LASTPOS=1000177;//user.BenchMarker:177
    m = _this.marks[id];
    //$LASTPOS=1000198;//user.BenchMarker:198
    m.count++;
    //$LASTPOS=1000213;//user.BenchMarker:213
    m.times+=new Date().getTime()-m.start;
    
    _thread.retVal=_this;return;
  },
  reset :function _trc_BenchMarker_reset() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000269;//user.BenchMarker:269
    _this.oldMarks=_this.marks;
    //$LASTPOS=1000289;//user.BenchMarker:289
    _this.marks={};
  },
  fiber$reset :function _trc_BenchMarker_f_reset(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000269;//user.BenchMarker:269
    _this.oldMarks=_this.marks;
    //$LASTPOS=1000289;//user.BenchMarker:289
    _this.marks={};
    
    _thread.retVal=_this;return;
  },
  report :function _trc_BenchMarker_report() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000317;//user.BenchMarker:317
    console.log(_this.marks);
  },
  fiber$report :function _trc_BenchMarker_f_report(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000317;//user.BenchMarker:317
    console.log(_this.marks);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.BenchMarker,{"fullName":"user.BenchMarker","namespace":"user","shortName":"BenchMarker","decls":{"methods":{"main":{"nowait":false},"start":{"nowait":false},"end":{"nowait":false},"reset":{"nowait":false},"report":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Main_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;//user.Main:0
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=2000024;//user.Main:24
    new Tonyu.classes.user.Rept;
    //$LASTPOS=2000034;//user.Main:34
    Tonyu.globals.$panel.die();
    //$LASTPOS=2000048;//user.Main:48
    Tonyu.globals.$consolePanel.die();
    //$LASTPOS=2000069;//user.Main:69
    while (true) {
      //$LASTPOS=2000088;//user.Main:88
      if (_this.rnd(10)==0) {
        //$LASTPOS=2000114;//user.Main:114
        new Tonyu.classes.user.Tama({x: _this.rnd(400),y: _this.rnd(400),vx: _this.rnd()*2-1,vy: _this.rnd()*2-1});
        
      }
      //$LASTPOS=2000183;//user.Main:183
      if (_this.getkey(32)==1) {
        //$LASTPOS=2000211;//user.Main:211
        Tonyu.globals.$BM.report();
        
      }
      //$LASTPOS=2000235;//user.Main:235
      _this.update();
      
    }
  },
  fiber$main :function _trc_Main_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;//user.Main:0
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=2000024;//user.Main:24
    new Tonyu.classes.user.Rept;
    //$LASTPOS=2000034;//user.Main:34
    Tonyu.globals.$panel.die();
    //$LASTPOS=2000048;//user.Main:48
    Tonyu.globals.$consolePanel.die();
    
    _thread.enter(function _trc_Main_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000069;//user.Main:69
        case 1:
          //$LASTPOS=2000088;//user.Main:88
          if (_this.rnd(10)==0) {
            //$LASTPOS=2000114;//user.Main:114
            new Tonyu.classes.user.Tama({x: _this.rnd(400),y: _this.rnd(400),vx: _this.rnd()*2-1,vy: _this.rnd()*2-1});
            
          }
          //$LASTPOS=2000183;//user.Main:183
          if (_this.getkey(32)==1) {
            //$LASTPOS=2000211;//user.Main:211
            Tonyu.globals.$BM.report();
            
          }
          //$LASTPOS=2000235;//user.Main:235
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Rept=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Rept_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000001;//user.Rept:1
    _this.x=200;
    //$LASTPOS=3000008;//user.Rept:8
    _this.y=200;
    //$LASTPOS=3000015;//user.Rept:15
    _this.text="";
    //$LASTPOS=3000024;//user.Rept:24
    _this.updateEx(20);
    //$LASTPOS=3000038;//user.Rept:38
    while (true) {
      //$LASTPOS=3000057;//user.Rept:57
      _this.text=[_this.info("dr"),_this.info("tg"),_this.info("wt"),_this.info("all")];
      //$LASTPOS=3000114;//user.Rept:114
      _this.update();
      
    }
  },
  fiber$main :function _trc_Rept_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=3000001;//user.Rept:1
    _this.x=200;
    //$LASTPOS=3000008;//user.Rept:8
    _this.y=200;
    //$LASTPOS=3000015;//user.Rept:15
    _this.text="";
    
    _thread.enter(function _trc_Rept_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=3000024;//user.Rept:24
          _this.fiber$updateEx(_thread, 20);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=3000038;//user.Rept:38
        case 2:
          //$LASTPOS=3000057;//user.Rept:57
          _this.text=[_this.info("dr"),_this.info("tg"),_this.info("wt"),_this.info("all")];
          //$LASTPOS=3000114;//user.Rept:114
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
  info :function _trc_Rept_info(n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var m;
    
    //$LASTPOS=3000141;//user.Rept:141
    m = Tonyu.globals.$BM.oldMarks[n];
    return n+": "+_this.floor(m.times/m.count*1000)/1000+"ms";
  },
  fiber$info :function _trc_Rept_f_info(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var m;
    
    //$LASTPOS=3000141;//user.Rept:141
    m = Tonyu.globals.$BM.oldMarks[n];
    _thread.retVal=n+": "+_this.floor(m.times/m.count*1000)/1000+"ms";return;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_Rept_draw(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000238;//user.Rept:238
    if (! Tonyu.globals.$BM.oldMarks) {
      return _this;
    }
    //$LASTPOS=3000269;//user.Rept:269
    _this.gy=_this.y;
    //$LASTPOS=3000274;//user.Rept:274
    _this.gx=_this.x;
    //$LASTPOS=3000284;//user.Rept:284
    _this.graph(c,"tg","lime");
    //$LASTPOS=3000314;//user.Rept:314
    _this.graph(c,"dr","red");
    //$LASTPOS=3000339;//user.Rept:339
    _this.graph(c,"wt","yellow");
    //$LASTPOS=3000371;//user.Rept:371
    _this.gy=_this.y+30;
    //$LASTPOS=3000379;//user.Rept:379
    _this.gx=_this.x;
    //$LASTPOS=3000389;//user.Rept:389
    _this.graph(c,"all","cyan");
    //$LASTPOS=3000419;//user.Rept:419
    c.fillRect(_this.x,_this.y-20,10000/60,1);
  },
  graph :function _trc_Rept_graph(c,n,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var m;
    var s;
    
    //$LASTPOS=3000476;//user.Rept:476
    m = Tonyu.globals.$BM.oldMarks[n];
    //$LASTPOS=3000503;//user.Rept:503
    s = 10;
    //$LASTPOS=3000522;//user.Rept:522
    c.fillStyle=col;
    //$LASTPOS=3000543;//user.Rept:543
    c.fillRect(_this.gx,_this.gy,m.times/m.count*s,10);
    //$LASTPOS=3000587;//user.Rept:587
    _this.gx+=m.times/m.count*s;
  },
  fiber$graph :function _trc_Rept_f_graph(_thread,c,n,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var m;
    var s;
    
    //$LASTPOS=3000476;//user.Rept:476
    m = Tonyu.globals.$BM.oldMarks[n];
    //$LASTPOS=3000503;//user.Rept:503
    s = 10;
    //$LASTPOS=3000522;//user.Rept:522
    c.fillStyle=col;
    //$LASTPOS=3000543;//user.Rept:543
    c.fillRect(_this.gx,_this.gy,m.times/m.count*s,10);
    //$LASTPOS=3000587;//user.Rept:587
    _this.gx+=m.times/m.count*s;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Rept,{"fullName":"user.Rept","namespace":"user","shortName":"Rept","decls":{"methods":{"main":{"nowait":false},"info":{"nowait":false},"draw":{"nowait":true},"graph":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Tama=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Tama_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000001;//user.Tama:1
    while (! _this.screenOut()) {
      //$LASTPOS=4000027;//user.Tama:27
      _this.x+=_this.vx;
      //$LASTPOS=4000038;//user.Tama:38
      _this.y+=_this.vy;
      //$LASTPOS=4000049;//user.Tama:49
      _this.rotation++;
      //$LASTPOS=4000065;//user.Tama:65
      if (_this.t=_this.crashTo(Tonyu.classes.user.Tama)) {
        //$LASTPOS=4000096;//user.Tama:96
        _this.vx+=(_this.x-_this.t.x)/40;
        //$LASTPOS=4000120;//user.Tama:120
        _this.vy+=(_this.y-_this.t.y)/40;
        
      }
      //$LASTPOS=4000146;//user.Tama:146
      _this.update();
      
    }
    //$LASTPOS=4000158;//user.Tama:158
    _this.die();
  },
  fiber$main :function _trc_Tama_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_Tama_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=4000001;//user.Tama:1
        case 1:
          if (!(! _this.screenOut())) { __pc=3; break; }
          //$LASTPOS=4000027;//user.Tama:27
          _this.x+=_this.vx;
          //$LASTPOS=4000038;//user.Tama:38
          _this.y+=_this.vy;
          //$LASTPOS=4000049;//user.Tama:49
          _this.rotation++;
          //$LASTPOS=4000065;//user.Tama:65
          if (_this.t=_this.crashTo(Tonyu.classes.user.Tama)) {
            //$LASTPOS=4000096;//user.Tama:96
            _this.vx+=(_this.x-_this.t.x)/40;
            //$LASTPOS=4000120;//user.Tama:120
            _this.vy+=(_this.y-_this.t.y)/40;
            
          }
          //$LASTPOS=4000146;//user.Tama:146
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          //$LASTPOS=4000158;//user.Tama:158
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Tama,{"fullName":"user.Tama","namespace":"user","shortName":"Tama","decls":{"methods":{"main":{"nowait":false}}}});

