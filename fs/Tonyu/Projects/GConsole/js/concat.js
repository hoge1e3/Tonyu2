Tonyu.klass.define({
  fullName: 'user.Boot2',
  shortName: 'Boot2',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2MediaPlayer],
  methods: {
    main :function _trc_Boot2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40001916;//user.Boot2:1916
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=40001929;//user.Boot2:1929
      _this.initSounds();
      //$LASTPOS=40001944;//user.Boot2:1944
      _this.initSprites();
      //$LASTPOS=40001960;//user.Boot2:1960
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=40001991;//user.Boot2:1991
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=40002028;//user.Boot2:2028
      _this.initThread();
      //$LASTPOS=40002045;//user.Boot2:2045
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=40002062;//user.Boot2:2062
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=40002079;//user.Boot2:2079
      Tonyu.globals.$Math=Math;
      //$LASTPOS=40002092;//user.Boot2:2092
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40002202;//user.Boot2:2202
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=40002226;//user.Boot2:2226
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=40002366;//user.Boot2:2366
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=40002404;//user.Boot2:2404
        SplashScreen.hide();
      }
      //$LASTPOS=40002426;//user.Boot2:2426
      _this.initFPSParams();
      //$LASTPOS=40002446;//user.Boot2:2446
      while (true) {
        //$LASTPOS=40002486;//user.Boot2:2486
        _this.scheduler.stepsAll();
        //$LASTPOS=40002513;//user.Boot2:2513
        Tonyu.globals.$Keys.update();
        //$LASTPOS=40002534;//user.Boot2:2534
        Tonyu.globals.$InputDevice.update();
        //$LASTPOS=40002562;//user.Boot2:2562
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=40002595;//user.Boot2:2595
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=40002636;//user.Boot2:2636
        _this.doDraw=_this.now()<_this.deadLine;
        //$LASTPOS=40002664;//user.Boot2:2664
        if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
          //$LASTPOS=40002718;//user.Boot2:2718
          _this.doDraw=true;
          //$LASTPOS=40002740;//user.Boot2:2740
          _this.resetDeadLine();
          
        }
        //$LASTPOS=40002769;//user.Boot2:2769
        if (_this.doDraw) {
          //$LASTPOS=40002971;//user.Boot2:2971
          Tonyu.globals.$GameConsole.draw();
          //$LASTPOS=40003001;//user.Boot2:3001
          _this.fps_fpsCnt++;
          //$LASTPOS=40003025;//user.Boot2:3025
          _this.frameSkipped=0;
          
        } else {
          //$LASTPOS=40003064;//user.Boot2:3064
          _this.frameSkipped++;
          
        }
        //$LASTPOS=40003092;//user.Boot2:3092
        Tonyu.globals.$Sprites.checkHit();
        //$LASTPOS=40003118;//user.Boot2:3118
        Tonyu.globals.$Sprites.removeOneframes();
        //$LASTPOS=40003151;//user.Boot2:3151
        _this.fps_rpsCnt++;
        //$LASTPOS=40003171;//user.Boot2:3171
        _this.measureFps();
        //$LASTPOS=40003190;//user.Boot2:3190
        _this.waitFrame();
        //$LASTPOS=40003217;//user.Boot2:3217
        while (_this.paused) {
          //$LASTPOS=40003242;//user.Boot2:3242
          _this.waitFor(Tonyu.timeout(1));
          //$LASTPOS=40003278;//user.Boot2:3278
          if (! _this.paused) {
            //$LASTPOS=40003291;//user.Boot2:3291
            _this.resetDeadLine();
          }
          
        }
        
      }
    },
    fiber$main :function _trc_Boot2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001916;//user.Boot2:1916
      Tonyu.globals.$Boot=_this;
      
      _thread.enter(function _trc_Boot2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40001929;//user.Boot2:1929
            _this.fiber$initSounds(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40001944;//user.Boot2:1944
            _this.fiber$initSprites(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40001960;//user.Boot2:1960
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=40001991;//user.Boot2:1991
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=40002028;//user.Boot2:2028
            _this.fiber$initThread(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=40002045;//user.Boot2:2045
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=40002062;//user.Boot2:2062
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=40002079;//user.Boot2:2079
            Tonyu.globals.$Math=Math;
            //$LASTPOS=40002092;//user.Boot2:2092
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=40002202;//user.Boot2:2202
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=40002226;//user.Boot2:2226
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=40002366;//user.Boot2:2366
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=40002404;//user.Boot2:2404
              SplashScreen.hide();
            }
            //$LASTPOS=40002426;//user.Boot2:2426
            _this.initFPSParams();
            //$LASTPOS=40002446;//user.Boot2:2446
          case 4:
            //$LASTPOS=40002486;//user.Boot2:2486
            _this.scheduler.stepsAll();
            //$LASTPOS=40002513;//user.Boot2:2513
            Tonyu.globals.$Keys.update();
            //$LASTPOS=40002534;//user.Boot2:2534
            Tonyu.globals.$InputDevice.update();
            //$LASTPOS=40002562;//user.Boot2:2562
            Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
            //$LASTPOS=40002595;//user.Boot2:2595
            Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
            //$LASTPOS=40002636;//user.Boot2:2636
            _this.doDraw=_this.now()<_this.deadLine;
            //$LASTPOS=40002664;//user.Boot2:2664
            if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
              //$LASTPOS=40002718;//user.Boot2:2718
              _this.doDraw=true;
              //$LASTPOS=40002740;//user.Boot2:2740
              _this.resetDeadLine();
              
            }
            //$LASTPOS=40002769;//user.Boot2:2769
            if (_this.doDraw) {
              //$LASTPOS=40002971;//user.Boot2:2971
              Tonyu.globals.$GameConsole.draw();
              //$LASTPOS=40003001;//user.Boot2:3001
              _this.fps_fpsCnt++;
              //$LASTPOS=40003025;//user.Boot2:3025
              _this.frameSkipped=0;
              
            } else {
              //$LASTPOS=40003064;//user.Boot2:3064
              _this.frameSkipped++;
              
            }
            //$LASTPOS=40003092;//user.Boot2:3092
            Tonyu.globals.$Sprites.checkHit();
            //$LASTPOS=40003118;//user.Boot2:3118
            Tonyu.globals.$Sprites.removeOneframes();
            //$LASTPOS=40003151;//user.Boot2:3151
            _this.fps_rpsCnt++;
            //$LASTPOS=40003171;//user.Boot2:3171
            _this.measureFps();
            //$LASTPOS=40003190;//user.Boot2:3190
            _this.fiber$waitFrame(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=40003217;//user.Boot2:3217
          case 6:
            if (!(_this.paused)) { __pc=8; break; }
            //$LASTPOS=40003242;//user.Boot2:3242
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=7;return;
          case 7:
            
            //$LASTPOS=40003278;//user.Boot2:3278
            if (! _this.paused) {
              //$LASTPOS=40003291;//user.Boot2:3291
              _this.resetDeadLine();
            }
            __pc=6;break;
          case 8:
            
            __pc=4;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    update :function _trc_Boot2_update() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000204;//user.Boot2:204
      _this.waitFor(Tonyu.timeout(50));
    },
    fiber$update :function _trc_Boot2_f_update(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot2_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000204;//user.Boot2:204
            _this.fiber$waitFor(_thread, Tonyu.timeout(50));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprites :function _trc_Boot2_initSprites() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var rs;
      var r;
      var name;
      var val;
      var _it_294;
      
      //$LASTPOS=40000285;//user.Boot2:285
      Tonyu.globals.$GameConsole=new Tonyu.classes.kernel.GameConsole({canvas: $("canvas")});
      //$LASTPOS=40000340;//user.Boot2:340
      _this.print("Loading plugins..");
      //$LASTPOS=40000374;//user.Boot2:374
      a = _this.asyncResult();
      //$LASTPOS=40000400;//user.Boot2:400
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      //$LASTPOS=40000446;//user.Boot2:446
      _this.waitFor(a);
      //$LASTPOS=40000463;//user.Boot2:463
      _this.print("Loading pats..");
      //$LASTPOS=40000494;//user.Boot2:494
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=40000537;//user.Boot2:537
      a=_this.asyncResult();
      //$LASTPOS=40000559;//user.Boot2:559
      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      //$LASTPOS=40000644;//user.Boot2:644
      _this.waitFor(a);
      //$LASTPOS=40000661;//user.Boot2:661
      r = a[0];
      //$LASTPOS=40000678;//user.Boot2:678
      Tonyu.globals.$Sprites.setImageList(r);
      //$LASTPOS=40000709;//user.Boot2:709
      _it_294=Tonyu.iterator(r.names,2);
      while(_it_294.next()) {
        name=_it_294[0];
        val=_it_294[1];
        
        //$LASTPOS=40000750;//user.Boot2:750
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=40000790;//user.Boot2:790
      _this.print("Loading pats done.");
      //$LASTPOS=40000825;//user.Boot2:825
      _this.cvj=$("canvas");
    },
    fiber$initSprites :function _trc_Boot2_f_initSprites(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var rs;
      var r;
      var name;
      var val;
      var _it_294;
      
      //$LASTPOS=40000285;//user.Boot2:285
      Tonyu.globals.$GameConsole=new Tonyu.classes.kernel.GameConsole({canvas: $("canvas")});
      //$LASTPOS=40000340;//user.Boot2:340
      _this.print("Loading plugins..");
      //$LASTPOS=40000374;//user.Boot2:374
      a = _this.asyncResult();
      //$LASTPOS=40000400;//user.Boot2:400
      Tonyu.globals.$currentProject.loadPlugins(a.receiver);
      
      _thread.enter(function _trc_Boot2_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000446;//user.Boot2:446
            _this.fiber$waitFor(_thread, a);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40000463;//user.Boot2:463
            _this.print("Loading pats..");
            //$LASTPOS=40000494;//user.Boot2:494
            rs = Tonyu.globals.$currentProject.getResource();
            //$LASTPOS=40000537;//user.Boot2:537
            a=_this.asyncResult();
            //$LASTPOS=40000559;//user.Boot2:559
            ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
            //$LASTPOS=40000644;//user.Boot2:644
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40000661;//user.Boot2:661
            r = a[0];
            //$LASTPOS=40000678;//user.Boot2:678
            Tonyu.globals.$Sprites.setImageList(r);
            //$LASTPOS=40000709;//user.Boot2:709
            _it_294=Tonyu.iterator(r.names,2);
            while(_it_294.next()) {
              name=_it_294[0];
              val=_it_294[1];
              
              //$LASTPOS=40000750;//user.Boot2:750
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=40000790;//user.Boot2:790
            _this.print("Loading pats done.");
            //$LASTPOS=40000825;//user.Boot2:825
            _this.cvj=$("canvas");
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSounds :function _trc_Boot2_initSounds() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40001061;//user.Boot2:1061
      _this.print("Loading sounds...");
      //$LASTPOS=40001095;//user.Boot2:1095
      _this.initT2MediaPlayer();
      //$LASTPOS=40001121;//user.Boot2:1121
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=40001160;//user.Boot2:1160
      _this.print("Loading sounds done.");
    },
    fiber$initSounds :function _trc_Boot2_f_initSounds(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001061;//user.Boot2:1061
      _this.print("Loading sounds...");
      
      _thread.enter(function _trc_Boot2_ent_initSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40001095;//user.Boot2:1095
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40001121;//user.Boot2:1121
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40001160;//user.Boot2:1160
            _this.print("Loading sounds done.");
            _thread.exit(_this);return;
          }
        }
      });
    },
    initThread :function _trc_Boot2_initThread() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var o;
      var mainClassName;
      
      //$LASTPOS=40001270;//user.Boot2:1270
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=40001316;//user.Boot2:1316
      mainClassName = o.run.mainClass;
      //$LASTPOS=40001356;//user.Boot2:1356
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=40001397;//user.Boot2:1397
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=40001443;//user.Boot2:1443
      if (! _this.mainClass) {
        //$LASTPOS=40001470;//user.Boot2:1470
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=40001548;//user.Boot2:1548
      Tonyu.runMode=true;
      //$LASTPOS=40001605;//user.Boot2:1605
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=40001646;//user.Boot2:1646
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot2_f_initThread(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=40001270;//user.Boot2:1270
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=40001316;//user.Boot2:1316
      mainClassName = o.run.mainClass;
      //$LASTPOS=40001356;//user.Boot2:1356
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=40001397;//user.Boot2:1397
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=40001443;//user.Boot2:1443
      if (! _this.mainClass) {
        //$LASTPOS=40001470;//user.Boot2:1470
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=40001548;//user.Boot2:1548
      Tonyu.runMode=true;
      //$LASTPOS=40001605;//user.Boot2:1605
      _this.scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=40001646;//user.Boot2:1646
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot2_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40001682;//user.Boot2:1682
      _this.fireEvent("stop");
      //$LASTPOS=40001706;//user.Boot2:1706
      _this.die();
    },
    fiber$stop :function _trc_Boot2_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40001682;//user.Boot2:1682
      _this.fireEvent("stop");
      //$LASTPOS=40001706;//user.Boot2:1706
      _this.die();
      
      _thread.retVal=_this;return;
    },
    schedule :function _trc_Boot2_schedule(obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var th;
      
      //$LASTPOS=40001751;//user.Boot2:1751
      method=method||"main";
      //$LASTPOS=40001779;//user.Boot2:1779
      args=args||[];
      //$LASTPOS=40001799;//user.Boot2:1799
      th = _this.scheduler.newThread(obj,method,args);
      //$LASTPOS=40001851;//user.Boot2:1851
      _this.addThreadGroup(obj);
      //$LASTPOS=40001877;//user.Boot2:1877
      obj.addThread(th);
      return th;
    },
    fiber$schedule :function _trc_Boot2_f_schedule(_thread,obj,method,args) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=40001751;//user.Boot2:1751
      method=method||"main";
      //$LASTPOS=40001779;//user.Boot2:1779
      args=args||[];
      //$LASTPOS=40001799;//user.Boot2:1799
      th = _this.scheduler.newThread(obj,method,args);
      
      _thread.enter(function _trc_Boot2_ent_schedule(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40001851;//user.Boot2:1851
            _this.fiber$addThreadGroup(_thread, obj);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40001877;//user.Boot2:1877
            obj.addThread(th);
            _thread.exit(th);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    initFPSParams :function _trc_Boot2_initFPSParams() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40003371;//user.Boot2:3371
      _this._fps=30;
      //$LASTPOS=40003387;//user.Boot2:3387
      _this.maxframeSkip=5;
      //$LASTPOS=40003437;//user.Boot2:3437
      _this.frameCnt=0;
      //$LASTPOS=40003456;//user.Boot2:3456
      _this.resetDeadLine();
      //$LASTPOS=40003478;//user.Boot2:3478
      _this.lastMeasured=_this.now();
      //$LASTPOS=40003503;//user.Boot2:3503
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
    },
    now :function _trc_Boot2_now() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot2_resetDeadLine() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40003633;//user.Boot2:3633
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=40003664;//user.Boot2:3664
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot2_waitFrame() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var wt;
      
      //$LASTPOS=40003708;//user.Boot2:3708
      wt = _this.deadLine-_this.now();
      //$LASTPOS=40003736;//user.Boot2:3736
      if (wt<1) {
        //$LASTPOS=40003757;//user.Boot2:3757
        if (wt<- 1000) {
          //$LASTPOS=40003771;//user.Boot2:3771
          _this.resetDeadLine();
        }
        //$LASTPOS=40003797;//user.Boot2:3797
        wt=1;
        
      }
      //$LASTPOS=40003815;//user.Boot2:3815
      wt=_this.floor(wt);
      //$LASTPOS=40003834;//user.Boot2:3834
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=40003867;//user.Boot2:3867
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot2_f_waitFrame(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=40003708;//user.Boot2:3708
      wt = _this.deadLine-_this.now();
      //$LASTPOS=40003736;//user.Boot2:3736
      if (wt<1) {
        //$LASTPOS=40003757;//user.Boot2:3757
        if (wt<- 1000) {
          //$LASTPOS=40003771;//user.Boot2:3771
          _this.resetDeadLine();
        }
        //$LASTPOS=40003797;//user.Boot2:3797
        wt=1;
        
      }
      //$LASTPOS=40003815;//user.Boot2:3815
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot2_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40003834;//user.Boot2:3834
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40003867;//user.Boot2:3867
            _this.deadLine+=1000/_this._fps;
            _thread.exit(_this);return;
          }
        }
      });
    },
    getFrameRate :function _trc_Boot2_getFrameRate() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this._fps;
    },
    setFrameRate :function _trc_Boot2_setFrameRate(fps,maxFrameSkip) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40004027;//user.Boot2:4027
      _this._fps=fps;
      //$LASTPOS=40004044;//user.Boot2:4044
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=40004079;//user.Boot2:4079
        maxFrameSkip=5;
      }
      //$LASTPOS=40004100;//user.Boot2:4100
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=40004139;//user.Boot2:4139
      _this.resetDeadLine();
    },
    getMeasuredFps :function _trc_Boot2_getMeasuredFps() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.fps_fps;
    },
    getMeasuredRps :function _trc_Boot2_getMeasuredRps() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return _this.fps_rps;
    },
    measureFps :function _trc_Boot2_measureFps() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40004350;//user.Boot2:4350
      if (_this.now()>_this.lastMeasured+1000) {
        //$LASTPOS=40004390;//user.Boot2:4390
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=40004419;//user.Boot2:4419
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=40004448;//user.Boot2:4448
        _this.fps_fpsCnt=0;
        //$LASTPOS=40004471;//user.Boot2:4471
        _this.fps_rpsCnt=0;
        //$LASTPOS=40004494;//user.Boot2:4494
        _this.lastMeasured=_this.now();
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"schedule":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Front',
  shortName: 'Front',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Front_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000001;//user.Front:1
      _this.p=5;
      //$LASTPOS=41000006;//user.Front:6
      _this.x=_this.rnd(300);
      //$LASTPOS=41000017;//user.Front:17
      _this.y=20;
      //$LASTPOS=41000023;//user.Front:23
      while (_this.y<500) {
        //$LASTPOS=41000042;//user.Front:42
        _this.y+=10;
        //$LASTPOS=41000053;//user.Front:53
        _this.update();
        
      }
      //$LASTPOS=41000065;//user.Front:65
      _this.die();
    },
    fiber$main :function _trc_Front_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000001;//user.Front:1
      _this.p=5;
      //$LASTPOS=41000006;//user.Front:6
      _this.x=_this.rnd(300);
      //$LASTPOS=41000017;//user.Front:17
      _this.y=20;
      
      _thread.enter(function _trc_Front_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000023;//user.Front:23
          case 1:
            if (!(_this.y<500)) { __pc=3; break; }
            //$LASTPOS=41000042;//user.Front:42
            _this.y+=10;
            //$LASTPOS=41000053;//user.Front:53
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=41000065;//user.Front:65
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
      
      //$LASTPOS=42000001;//user.Main:1
      _this.x=10;
      //$LASTPOS=42000007;//user.Main:7
      _this.y=20;
      //$LASTPOS=42000013;//user.Main:13
      _this.p=3;
      //$LASTPOS=42000018;//user.Main:18
      while (true) {
        //$LASTPOS=42000036;//user.Main:36
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=42000046;//user.Main:46
        _this.y=Tonyu.globals.$mouseY;
        //$LASTPOS=42000061;//user.Main:61
        if (_this.rnd(10)==0) {
          //$LASTPOS=42000087;//user.Main:87
          _this.print("Front!");
          //$LASTPOS=42000112;//user.Main:112
          new Tonyu.classes.user.Front({layer: Tonyu.globals.$FrontSprites});
          
        }
        //$LASTPOS=42000154;//user.Main:154
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000001;//user.Main:1
      _this.x=10;
      //$LASTPOS=42000007;//user.Main:7
      _this.y=20;
      //$LASTPOS=42000013;//user.Main:13
      _this.p=3;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000018;//user.Main:18
          case 1:
            //$LASTPOS=42000036;//user.Main:36
            _this.x=Tonyu.globals.$mouseX;
            //$LASTPOS=42000046;//user.Main:46
            _this.y=Tonyu.globals.$mouseY;
            //$LASTPOS=42000061;//user.Main:61
            if (_this.rnd(10)==0) {
              //$LASTPOS=42000087;//user.Main:87
              _this.print("Front!");
              //$LASTPOS=42000112;//user.Main:112
              new Tonyu.classes.user.Front({layer: Tonyu.globals.$FrontSprites});
              
            }
            //$LASTPOS=42000154;//user.Main:154
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
