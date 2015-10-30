Tonyu.klass.define({
  fullName: 'user.Boot',
  shortName: 'Boot',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Boot_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1001333;//user.Boot:1333
      _this.initSprites();
      //$LASTPOS=1001349;//user.Boot:1349
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=1001380;//user.Boot:1380
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=1001417;//user.Boot:1417
      _this.initThread();
      //$LASTPOS=1001434;//user.Boot:1434
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=1001451;//user.Boot:1451
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=1001468;//user.Boot:1468
      Tonyu.globals.$MMLS={};
      //$LASTPOS=1001479;//user.Boot:1479
      Tonyu.globals.$Math=Math;
      //$LASTPOS=1001492;//user.Boot:1492
      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
      //$LASTPOS=1001519;//user.Boot:1519
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=1001629;//user.Boot:1629
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=1001653;//user.Boot:1653
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=1001793;//user.Boot:1793
      if (typeof  SplashScreen!="undefined") {
        //$LASTPOS=1001831;//user.Boot:1831
        SplashScreen.hide();
      }
      //$LASTPOS=1001853;//user.Boot:1853
      _this.initFPSParams();
      //$LASTPOS=1001873;//user.Boot:1873
      while (true) {
        //$LASTPOS=1001893;//user.Boot:1893
        _this.ti=new Date().getTime();
        //$LASTPOS=1001923;//user.Boot:1923
        _this.thg.steps();
        //$LASTPOS=1001941;//user.Boot:1941
        Tonyu.globals.$Keys.update();
        //$LASTPOS=1001962;//user.Boot:1962
        Tonyu.globals.$InputDevice.update();
        //$LASTPOS=1001990;//user.Boot:1990
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=1002023;//user.Boot:2023
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=1002058;//user.Boot:2058
        if (_this.doDraw==1) {
          //$LASTPOS=1002106;//user.Boot:2106
          Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=1002151;//user.Boot:2151
          Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=1002191;//user.Boot:2191
          Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
          //$LASTPOS=1002236;//user.Boot:2236
          Tonyu.globals.$Screen.draw();
          //$LASTPOS=1002261;//user.Boot:2261
          _this.measureFps();
          
        }
        //$LASTPOS=1002296;//user.Boot:2296
        Tonyu.globals.$Sprites.checkHit();
        //$LASTPOS=1002328;//user.Boot:2328
        _this.fps_rpsCnt++;
        //$LASTPOS=1002348;//user.Boot:2348
        _this.waitFrame(_this._fps,_this._frameSkip);
        
      }
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1001333;//user.Boot:1333
            _this.fiber$initSprites(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1001349;//user.Boot:1349
            Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
            //$LASTPOS=1001380;//user.Boot:1380
            Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
            //$LASTPOS=1001417;//user.Boot:1417
            _this.fiber$initThread(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=1001434;//user.Boot:1434
            Tonyu.globals.$pat_fruits=30;
            //$LASTPOS=1001451;//user.Boot:1451
            Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
            //$LASTPOS=1001468;//user.Boot:1468
            Tonyu.globals.$MMLS={};
            //$LASTPOS=1001479;//user.Boot:1479
            Tonyu.globals.$Math=Math;
            //$LASTPOS=1001492;//user.Boot:1492
            Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
            //$LASTPOS=1001519;//user.Boot:1519
            Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=1001629;//user.Boot:1629
            Tonyu.globals.$consolePrintY=465-15;
            //$LASTPOS=1001653;//user.Boot:1653
            Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
            //$LASTPOS=1001793;//user.Boot:1793
            if (typeof  SplashScreen!="undefined") {
              //$LASTPOS=1001831;//user.Boot:1831
              SplashScreen.hide();
            }
            //$LASTPOS=1001853;//user.Boot:1853
            _this.initFPSParams();
            //$LASTPOS=1001873;//user.Boot:1873
          case 3:
            //$LASTPOS=1001893;//user.Boot:1893
            _this.ti=new Date().getTime();
            //$LASTPOS=1001923;//user.Boot:1923
            _this.thg.steps();
            //$LASTPOS=1001941;//user.Boot:1941
            Tonyu.globals.$Keys.update();
            //$LASTPOS=1001962;//user.Boot:1962
            Tonyu.globals.$InputDevice.update();
            //$LASTPOS=1001990;//user.Boot:1990
            Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
            //$LASTPOS=1002023;//user.Boot:2023
            Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
            //$LASTPOS=1002058;//user.Boot:2058
            if (_this.doDraw==1) {
              //$LASTPOS=1002106;//user.Boot:2106
              Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=1002151;//user.Boot:2151
              Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=1002191;//user.Boot:2191
              Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
              //$LASTPOS=1002236;//user.Boot:2236
              Tonyu.globals.$Screen.draw();
              //$LASTPOS=1002261;//user.Boot:2261
              _this.measureFps();
              
            }
            //$LASTPOS=1002296;//user.Boot:2296
            Tonyu.globals.$Sprites.checkHit();
            //$LASTPOS=1002328;//user.Boot:2328
            _this.fps_rpsCnt++;
            //$LASTPOS=1002348;//user.Boot:2348
            _this.fiber$waitFrame(_thread, _this._fps, _this._frameSkip);
            __pc=4;return;
          case 4:
            
            __pc=3;break;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprites :function _trc_Boot_initSprites() {
      "use strict";
      var _this=this;
      var rs;
      var a;
      var r;
      var name;
      var val;
      var _it_1;
      
      //$LASTPOS=1000166;//user.Boot:166
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=1000195;//user.Boot:195
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=1000229;//user.Boot:229
      _this.print("Loading pats..");
      //$LASTPOS=1000260;//user.Boot:260
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=1000303;//user.Boot:303
      a = _this.asyncResult();
      //$LASTPOS=1000329;//user.Boot:329
      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      //$LASTPOS=1000414;//user.Boot:414
      _this.waitFor(a);
      //$LASTPOS=1000431;//user.Boot:431
      r = a[0];
      //$LASTPOS=1000448;//user.Boot:448
      Tonyu.globals.$Sprites.setImageList(r);
      //$LASTPOS=1000479;//user.Boot:479
      _it_1=Tonyu.iterator(r.names,2);
      while(_it_1.next()) {
        name=_it_1[0];
        val=_it_1[1];
        
        //$LASTPOS=1000520;//user.Boot:520
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=1000560;//user.Boot:560
      _this.print("Loading pats done.");
      //$LASTPOS=1000595;//user.Boot:595
      _this.cvj=$("canvas");
      //$LASTPOS=1000617;//user.Boot:617
      if (Tonyu.noviceMode) {
        //$LASTPOS=1000650;//user.Boot:650
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
        
      } else {
        //$LASTPOS=1000734;//user.Boot:734
        Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
        
      }
    },
    fiber$initSprites :function _trc_Boot_f_initSprites(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rs;
      var a;
      var r;
      var name;
      var val;
      var _it_1;
      
      //$LASTPOS=1000166;//user.Boot:166
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=1000195;//user.Boot:195
      Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=1000229;//user.Boot:229
      _this.print("Loading pats..");
      //$LASTPOS=1000260;//user.Boot:260
      rs = Tonyu.globals.$currentProject.getResource();
      //$LASTPOS=1000303;//user.Boot:303
      a = _this.asyncResult();
      //$LASTPOS=1000329;//user.Boot:329
      ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
      
      _thread.enter(function _trc_Boot_ent_initSprites(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000414;//user.Boot:414
            _this.fiber$waitFor(_thread, a);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000431;//user.Boot:431
            r = a[0];
            //$LASTPOS=1000448;//user.Boot:448
            Tonyu.globals.$Sprites.setImageList(r);
            //$LASTPOS=1000479;//user.Boot:479
            _it_1=Tonyu.iterator(r.names,2);
            while(_it_1.next()) {
              name=_it_1[0];
              val=_it_1[1];
              
              //$LASTPOS=1000520;//user.Boot:520
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=1000560;//user.Boot:560
            _this.print("Loading pats done.");
            //$LASTPOS=1000595;//user.Boot:595
            _this.cvj=$("canvas");
            //$LASTPOS=1000617;//user.Boot:617
            if (Tonyu.noviceMode) {
              //$LASTPOS=1000650;//user.Boot:650
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
              
            } else {
              //$LASTPOS=1000734;//user.Boot:734
              Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    initThread :function _trc_Boot_initThread() {
      "use strict";
      var _this=this;
      var o;
      var mainClassName;
      
      //$LASTPOS=1000831;//user.Boot:831
      Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
      //$LASTPOS=1000878;//user.Boot:878
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=1000924;//user.Boot:924
      mainClassName = o.run.mainClass;
      //$LASTPOS=1000964;//user.Boot:964
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=1001005;//user.Boot:1005
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=1001051;//user.Boot:1051
      if (! _this.mainClass) {
        //$LASTPOS=1001078;//user.Boot:1078
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=1001157;//user.Boot:1157
      Tonyu.runMode=true;
      //$LASTPOS=1001182;//user.Boot:1182
      Tonyu.globals.$currentThreadGroup=_this.thg;
      //$LASTPOS=1001212;//user.Boot:1212
      new _this.mainClass();
    },
    fiber$initThread :function _trc_Boot_f_initThread(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=1000831;//user.Boot:831
      Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
      //$LASTPOS=1000878;//user.Boot:878
      o = Tonyu.currentProject.getOptions();
      //$LASTPOS=1000924;//user.Boot:924
      mainClassName = o.run.mainClass;
      //$LASTPOS=1000964;//user.Boot:964
      _this.print("MainClass= "+mainClassName);
      //$LASTPOS=1001005;//user.Boot:1005
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=1001051;//user.Boot:1051
      if (! _this.mainClass) {
        //$LASTPOS=1001078;//user.Boot:1078
        TError(mainClassName+" というクラスはありません","不明",0).raise();
        
      }
      //$LASTPOS=1001157;//user.Boot:1157
      Tonyu.runMode=true;
      //$LASTPOS=1001182;//user.Boot:1182
      Tonyu.globals.$currentThreadGroup=_this.thg;
      //$LASTPOS=1001212;//user.Boot:1212
      new _this.mainClass();
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_10;
      
      //$LASTPOS=1001254;//user.Boot:1254
      _it_10=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_10.next()) {
        k=_it_10[0];
        v=_it_10[1];
        
        //$LASTPOS=1001288;//user.Boot:1288
        v.stop();
        
      }
      //$LASTPOS=1001310;//user.Boot:1310
      Tonyu.globals.$WaveTable.stop();
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var k;
      var v;
      var _it_10;
      
      //$LASTPOS=1001254;//user.Boot:1254
      _it_10=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_10.next()) {
        k=_it_10[0];
        v=_it_10[1];
        
        //$LASTPOS=1001288;//user.Boot:1288
        v.stop();
        
      }
      //$LASTPOS=1001310;//user.Boot:1310
      Tonyu.globals.$WaveTable.stop();
      
      _thread.retVal=_this;return;
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1002442;//user.Boot:2442
      _this._fps=30;
      //$LASTPOS=1002458;//user.Boot:2458
      _this._frameSkip=4;
      //$LASTPOS=1002512;//user.Boot:2512
      _this.frameCnt=0;
      //$LASTPOS=1002531;//user.Boot:2531
      _this.wtFrac=0;
      //$LASTPOS=1002548;//user.Boot:2548
      _this.frameDelay=0;
      //$LASTPOS=1002569;//user.Boot:2569
      _this.frameSkipCount=0;
      //$LASTPOS=1002594;//user.Boot:2594
      _this.frameSkipSW=0;
      //$LASTPOS=1002616;//user.Boot:2616
      _this.doDraw=1;
      //$LASTPOS=1002660;//user.Boot:2660
      _this.fps_fpsStartTime=0;
      //$LASTPOS=1002687;//user.Boot:2687
      _this.fps_fpsTimeCnt=1;
      //$LASTPOS=1002712;//user.Boot:2712
      _this.fps_fpsCnt=- 1;
      //$LASTPOS=1002734;//user.Boot:2734
      _this.fps_fps=0;
      //$LASTPOS=1002752;//user.Boot:2752
      _this.fps_rpsCnt=0;
      //$LASTPOS=1002773;//user.Boot:2773
      _this.fps_rps=0;
      //$LASTPOS=1002791;//user.Boot:2791
      _this.fps_oldTime=0;
      //$LASTPOS=1002819;//user.Boot:2819
      Tonyu.globals.$Boot=_this;
    },
    setFrameRate :function _trc_Boot_setFrameRate(fps,frameSkipMax) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1002939;//user.Boot:2939
      _this._fps=fps;
      //$LASTPOS=1002956;//user.Boot:2956
      if (! frameSkipMax) {
        //$LASTPOS=1002975;//user.Boot:2975
        frameSkipMax=5;
      }
      //$LASTPOS=1002996;//user.Boot:2996
      _this._frameSkip=frameSkipMax-1;
    },
    getMeasureFps :function _trc_Boot_getMeasureFps() {
      "use strict";
      var _this=this;
      
      return _this.fps_fps;
    },
    getMeasureRps :function _trc_Boot_getMeasureRps() {
      "use strict";
      var _this=this;
      
      return _this.fps_rps;
    },
    waitFrame :function _trc_Boot_waitFrame(fps,frameSkipMax) {
      "use strict";
      var _this=this;
      var wt;
      var nowWt;
      var waitDo;
      
      //$LASTPOS=1003269;//user.Boot:3269
      wt;nowWt;waitDo;
      //$LASTPOS=1003297;//user.Boot:3297
      _this.frameCnt++;
      //$LASTPOS=1003326;//user.Boot:3326
      wt=1000/fps;
      //$LASTPOS=1003356;//user.Boot:3356
      _this.wtFrac+=wt-_this.floor(wt);
      //$LASTPOS=1003387;//user.Boot:3387
      if (_this.wtFrac>=1) {
        //$LASTPOS=1003415;//user.Boot:3415
        wt+=_this.floor(_this.wtFrac);
        //$LASTPOS=1003459;//user.Boot:3459
        _this.wtFrac-=_this.floor(_this.wtFrac);
        
      }
      //$LASTPOS=1003496;//user.Boot:3496
      wt=_this.floor(wt);
      //$LASTPOS=1003675;//user.Boot:3675
      wt-=_this.frameDelay;
      //$LASTPOS=1003698;//user.Boot:3698
      _this.waitFor(Tonyu.timeout(1));
      //$LASTPOS=1003730;//user.Boot:3730
      nowWt=(new Date().getTime()-_this.ti);
      //$LASTPOS=1003770;//user.Boot:3770
      if (_this.frameSkipSW==0) {
        //$LASTPOS=1003792;//user.Boot:3792
        waitDo=0;
      }
      //$LASTPOS=1003809;//user.Boot:3809
      while (wt>nowWt) {
        //$LASTPOS=1003839;//user.Boot:3839
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=1003875;//user.Boot:3875
        nowWt=(new Date().getTime()-_this.ti);
        //$LASTPOS=1003919;//user.Boot:3919
        waitDo=1;
        
      }
      //$LASTPOS=1003943;//user.Boot:3943
      _this.frameDelay=nowWt-wt;
      //$LASTPOS=1003998;//user.Boot:3998
      if (waitDo==0) {
        //$LASTPOS=1004026;//user.Boot:4026
        _this.frameSkipCount++;
        //$LASTPOS=1004069;//user.Boot:4069
        _this.doDraw=0;
        
      } else {
        //$LASTPOS=1004104;//user.Boot:4104
        _this.doDraw=1;
        
      }
      //$LASTPOS=1004151;//user.Boot:4151
      _this.frameSkipSW=0;
      //$LASTPOS=1004173;//user.Boot:4173
      if (_this.frameSkipCount>=frameSkipMax) {
        //$LASTPOS=1004220;//user.Boot:4220
        _this.frameDelay=0;
        //$LASTPOS=1004245;//user.Boot:4245
        _this.frameSkipCount=0;
        //$LASTPOS=1004274;//user.Boot:4274
        _this.frameSkipSW=1;
        
      }
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread,fps,frameSkipMax) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      var nowWt;
      var waitDo;
      
      //$LASTPOS=1003269;//user.Boot:3269
      wt;nowWt;waitDo;
      //$LASTPOS=1003297;//user.Boot:3297
      _this.frameCnt++;
      //$LASTPOS=1003326;//user.Boot:3326
      wt=1000/fps;
      //$LASTPOS=1003356;//user.Boot:3356
      _this.wtFrac+=wt-_this.floor(wt);
      //$LASTPOS=1003387;//user.Boot:3387
      if (_this.wtFrac>=1) {
        //$LASTPOS=1003415;//user.Boot:3415
        wt+=_this.floor(_this.wtFrac);
        //$LASTPOS=1003459;//user.Boot:3459
        _this.wtFrac-=_this.floor(_this.wtFrac);
        
      }
      //$LASTPOS=1003496;//user.Boot:3496
      wt=_this.floor(wt);
      //$LASTPOS=1003675;//user.Boot:3675
      wt-=_this.frameDelay;
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1003698;//user.Boot:3698
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1003730;//user.Boot:3730
            nowWt=(new Date().getTime()-_this.ti);
            //$LASTPOS=1003770;//user.Boot:3770
            if (_this.frameSkipSW==0) {
              //$LASTPOS=1003792;//user.Boot:3792
              waitDo=0;
            }
            //$LASTPOS=1003809;//user.Boot:3809
          case 2:
            if (!(wt>nowWt)) { __pc=4; break; }
            //$LASTPOS=1003839;//user.Boot:3839
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=3;return;
          case 3:
            
            //$LASTPOS=1003875;//user.Boot:3875
            nowWt=(new Date().getTime()-_this.ti);
            //$LASTPOS=1003919;//user.Boot:3919
            waitDo=1;
            __pc=2;break;
          case 4:
            
            //$LASTPOS=1003943;//user.Boot:3943
            _this.frameDelay=nowWt-wt;
            //$LASTPOS=1003998;//user.Boot:3998
            if (waitDo==0) {
              //$LASTPOS=1004026;//user.Boot:4026
              _this.frameSkipCount++;
              //$LASTPOS=1004069;//user.Boot:4069
              _this.doDraw=0;
              
            } else {
              //$LASTPOS=1004104;//user.Boot:4104
              _this.doDraw=1;
              
            }
            //$LASTPOS=1004151;//user.Boot:4151
            _this.frameSkipSW=0;
            //$LASTPOS=1004173;//user.Boot:4173
            if (_this.frameSkipCount>=frameSkipMax) {
              //$LASTPOS=1004220;//user.Boot:4220
              _this.frameDelay=0;
              //$LASTPOS=1004245;//user.Boot:4245
              _this.frameSkipCount=0;
              //$LASTPOS=1004274;//user.Boot:4274
              _this.frameSkipSW=1;
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    measureFps :function _trc_Boot_measureFps() {
      "use strict";
      var _this=this;
      var fps_nowTime;
      
      //$LASTPOS=1004353;//user.Boot:4353
      fps_nowTime;
      //$LASTPOS=1004375;//user.Boot:4375
      fps_nowTime=new Date().getTime();
      //$LASTPOS=1004416;//user.Boot:4416
      if (_this.fps_oldTime==0) {
        //$LASTPOS=1004438;//user.Boot:4438
        _this.fps_oldTime=new Date().getTime();
      }
      //$LASTPOS=1004479;//user.Boot:4479
      _this.fps_fpsCnt++;
      //$LASTPOS=1004499;//user.Boot:4499
      _this.fps_fpsTimeCnt+=fps_nowTime-_this.fps_oldTime;
      //$LASTPOS=1004549;//user.Boot:4549
      if (fps_nowTime-_this.fps_fpsStartTime>=1000) {
        //$LASTPOS=1004604;//user.Boot:4604
        _this.fps_fps=((1000/_this.fps_fpsTimeCnt)*_this.fps_fpsCnt);
        //$LASTPOS=1004730;//user.Boot:4730
        _this.fps_fpsCnt=0;
        //$LASTPOS=1004755;//user.Boot:4755
        _this.fps_fpsTimeCnt=0;
        //$LASTPOS=1004784;//user.Boot:4784
        _this.fps_fpsStartTime=fps_nowTime;
        //$LASTPOS=1004825;//user.Boot:4825
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=1004856;//user.Boot:4856
        _this.fps_rpsCnt=0;
        
      }
      //$LASTPOS=1004884;//user.Boot:4884
      _this.fps_oldTime=fps_nowTime;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initSprites":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasureFps":{"nowait":true},"getMeasureRps":{"nowait":true},"waitFrame":{"nowait":false},"measureFps":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MediaPlayer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_MediaPlayer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MediaPlayer_play() {
      "use strict";
      var _this=this;
      
    },
    fiber$play :function _trc_MediaPlayer_f_play(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MediaPlayer_stop() {
      "use strict";
      var _this=this;
      
    },
    fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_MediaPlayer_playSE() {
      "use strict";
      var _this=this;
      
    },
    setDelay :function _trc_MediaPlayer_setDelay() {
      "use strict";
      var _this=this;
      
    },
    fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setVolume :function _trc_MediaPlayer_setVolume() {
      "use strict";
      var _this=this;
      
    },
    fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.PlainChar',
  shortName: 'PlainChar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PlainChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_PlainChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_PlainChar_initialize(x,y,p) {
      "use strict";
      var _this=this;
      var thg;
      
      //$LASTPOS=2000048;//user.PlainChar:48
      if (Tonyu.runMode) {
        //$LASTPOS=2000078;//user.PlainChar:78
        thg = _this.currentThreadGroup();
        //$LASTPOS=2000117;//user.PlainChar:117
        if (thg) {
          //$LASTPOS=2000126;//user.PlainChar:126
          _this._th=thg.addObj(_this,"tMain");
        }
        //$LASTPOS=2000165;//user.PlainChar:165
        _this.initSprite();
        
      }
      //$LASTPOS=2000191;//user.PlainChar:191
      if (typeof  x=="object") {
        //$LASTPOS=2000215;//user.PlainChar:215
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=2000248;//user.PlainChar:248
        if (typeof  x=="number") {
          //$LASTPOS=2000283;//user.PlainChar:283
          _this.x=x;
          //$LASTPOS=2000302;//user.PlainChar:302
          _this.y=y;
          //$LASTPOS=2000321;//user.PlainChar:321
          _this.p=p;
          
        }
      }
    },
    wait :function _trc_PlainChar_wait(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000358;//user.PlainChar:358
      _this._isWaiting=true;
      //$LASTPOS=2000380;//user.PlainChar:380
      if (! t) {
        //$LASTPOS=2000388;//user.PlainChar:388
        t=- 1;
      }
      //$LASTPOS=2000399;//user.PlainChar:399
      while (true) {
        //$LASTPOS=2000422;//user.PlainChar:422
        Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
        //$LASTPOS=2000447;//user.PlainChar:447
        t--;
        //$LASTPOS=2000461;//user.PlainChar:461
        if (! _this._isWaiting||t==0) {
          break;
          
        }
        
      }
      //$LASTPOS=2000505;//user.PlainChar:505
      _this._isWaiting=false;
    },
    fiber$wait :function _trc_PlainChar_f_wait(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000358;//user.PlainChar:358
      _this._isWaiting=true;
      //$LASTPOS=2000380;//user.PlainChar:380
      if (! t) {
        //$LASTPOS=2000388;//user.PlainChar:388
        t=- 1;
      }
      
      _thread.enter(function _trc_PlainChar_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000399;//user.PlainChar:399
          case 1:
            //$LASTPOS=2000422;//user.PlainChar:422
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000447;//user.PlainChar:447
            t--;
            //$LASTPOS=2000461;//user.PlainChar:461
            if (!(! _this._isWaiting||t==0)) { __pc=3; break; }
            __pc=4; break;
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            //$LASTPOS=2000505;//user.PlainChar:505
            _this._isWaiting=false;
            _thread.exit(_this);return;
          }
        }
      });
    },
    notify :function _trc_PlainChar_notify() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000544;//user.PlainChar:544
      _this._isWaiting=false;
    },
    fiber$notify :function _trc_PlainChar_f_notify(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000544;//user.PlainChar:544
      _this._isWaiting=false;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000582;//user.PlainChar:582
      _this.onDraw();
      //$LASTPOS=2000597;//user.PlainChar:597
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=2000628;//user.PlainChar:628
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000669;//user.PlainChar:669
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000669;//user.PlainChar:669
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    onDraw :function _trc_PlainChar_onDraw() {
      "use strict";
      var _this=this;
      
    },
    fiber$onDraw :function _trc_PlainChar_f_onDraw(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_PlainChar_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000729;//user.PlainChar:729
      _this.onUpdate();
      //$LASTPOS=2000746;//user.PlainChar:746
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000729;//user.PlainChar:729
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000746;//user.PlainChar:746
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_PlainChar_onUpdate() {
      "use strict";
      var _this=this;
      
    },
    initSprite :function _trc_PlainChar_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000811;//user.PlainChar:811
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=2000863;//user.PlainChar:863
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=2000901;//user.PlainChar:901
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=2000933;//user.PlainChar:933
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000811;//user.PlainChar:811
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=2000863;//user.PlainChar:863
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=2000901;//user.PlainChar:901
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000933;//user.PlainChar:933
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    tMain :function _trc_PlainChar_tMain() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000965;//user.PlainChar:965
      _this.main();
      //$LASTPOS=2000978;//user.PlainChar:978
      _this.die();
    },
    fiber$tMain :function _trc_PlainChar_f_tMain(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_PlainChar_ent_tMain(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000965;//user.PlainChar:965
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2000978;//user.PlainChar:978
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    angle1 :function _trc_PlainChar_angle1(x,y) {
      "use strict";
      var _this=this;
      
      return _this.atan2(y,x);
    },
    fiber$angle1 :function _trc_PlainChar_f_angle1(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.atan2(y,x);return;
      
      
      _thread.retVal=_this;return;
    },
    color :function _trc_PlainChar_color(r,g,b) {
      "use strict";
      var _this=this;
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    fiber$color :function _trc_PlainChar_f_color(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    drawText :function _trc_PlainChar_drawText(x,y,text,col,size) {
      "use strict";
      var _this=this;
      var tp;
      
      //$LASTPOS=2001130;//user.PlainChar:1130
      if (Tonyu.globals.$debug) {
        return _this;
      }
      //$LASTPOS=2001155;//user.PlainChar:1155
      if (! size) {
        //$LASTPOS=2001166;//user.PlainChar:1166
        size=15;
      }
      //$LASTPOS=2001180;//user.PlainChar:1180
      if (! col) {
        //$LASTPOS=2001190;//user.PlainChar:1190
        col="cyan";
      }
      //$LASTPOS=2001207;//user.PlainChar:1207
      tp = _this.all(Tonyu.classes.user.T1Text).find((function anonymous_1231(t) {
        
        return t.hidden;
      }));
      //$LASTPOS=2001261;//user.PlainChar:1261
      if (tp.length>0) {
        //$LASTPOS=2001289;//user.PlainChar:1289
        tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
        
      } else {
        //$LASTPOS=2001368;//user.PlainChar:1368
        new Tonyu.classes.user.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
        
      }
    },
    drawLine :function _trc_PlainChar_drawLine(x,y,tx,ty,col) {
      "use strict";
      var _this=this;
      var tp;
      
      //$LASTPOS=2001455;//user.PlainChar:1455
      if (! col) {
        //$LASTPOS=2001465;//user.PlainChar:1465
        col="white";
      }
      //$LASTPOS=2001483;//user.PlainChar:1483
      tp = _this.all(Tonyu.classes.user.T1Line).find((function anonymous_1507(t) {
        
        return t.hidden;
      }));
      //$LASTPOS=2001537;//user.PlainChar:1537
      if (tp.length>0) {
        //$LASTPOS=2001565;//user.PlainChar:1565
        tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
        
      } else {
        //$LASTPOS=2001616;//user.PlainChar:1616
        new Tonyu.classes.user.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
        
      }
    },
    appear :function _trc_PlainChar_appear(t) {
      "use strict";
      var _this=this;
      
      return t;
    },
    fiber$appear :function _trc_PlainChar_f_appear(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=t;return;
      
      
      _thread.retVal=_this;return;
    },
    trunc :function _trc_PlainChar_trunc(f) {
      "use strict";
      var _this=this;
      
      return Math.trunc(f);
    },
    loadPage :function _trc_PlainChar_loadPage(page,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2001757;//user.PlainChar:1757
      _this.all().die();
      //$LASTPOS=2001775;//user.PlainChar:1775
      new page(arg);
      //$LASTPOS=2001795;//user.PlainChar:1795
      _this.die();
    },
    fiber$loadPage :function _trc_PlainChar_f_loadPage(_thread,page,arg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2001757;//user.PlainChar:1757
      _this.all().die();
      //$LASTPOS=2001775;//user.PlainChar:1775
      new page(arg);
      //$LASTPOS=2001795;//user.PlainChar:1795
      _this.die();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"angle1":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.SecretChar',
  shortName: 'SecretChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SecretChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_SecretChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_SecretChar_draw(c) {
      "use strict";
      var _this=this;
      
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.SpriteChar',
  shortName: 'SpriteChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SpriteChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_SpriteChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_SpriteChar_initialize(x,y,p,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000040;//user.SpriteChar:40
      Tonyu.classes.user.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=3000058;//user.SpriteChar:58
      _this.f=f;
      //$LASTPOS=3000072;//user.SpriteChar:72
      if (! _this.x) {
        //$LASTPOS=3000085;//user.SpriteChar:85
        _this.x=0;
      }
      //$LASTPOS=3000099;//user.SpriteChar:99
      if (! _this.y) {
        //$LASTPOS=3000112;//user.SpriteChar:112
        _this.y=0;
      }
      //$LASTPOS=3000126;//user.SpriteChar:126
      if (! _this.p) {
        //$LASTPOS=3000139;//user.SpriteChar:139
        _this.p=0;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000166;//user.SpriteChar:166
      if (_this.f) {
        //$LASTPOS=3000183;//user.SpriteChar:183
        if (! _this.scaleY) {
          //$LASTPOS=3000196;//user.SpriteChar:196
          _this.scaleY=_this.scaleX;
        }
        //$LASTPOS=3000219;//user.SpriteChar:219
        _this.scaleX*=- 1;
        
      }
      //$LASTPOS=3000241;//user.SpriteChar:241
      Tonyu.classes.user.PlainChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=3000260;//user.SpriteChar:260
      if (_this.f) {
        //$LASTPOS=3000267;//user.SpriteChar:267
        _this.scaleX*=- 1;
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.T1Line',
  shortName: 'T1Line',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_T1Line_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Line_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Line_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=4000018;//user.T1Line:18
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=4000049;//user.T1Line:49
      ctx.strokeStyle=_this.col;
      //$LASTPOS=4000075;//user.T1Line:75
      ctx.beginPath();
      //$LASTPOS=4000097;//user.T1Line:97
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=4000119;//user.T1Line:119
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=4000143;//user.T1Line:143
      ctx.stroke();
      //$LASTPOS=4000162;//user.T1Line:162
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.T1Map',
  shortName: 'T1Map',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Map,
  includes: [],
  methods: {
    main :function _trc_T1Map_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Map_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_T1Map_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=5000058;//user.T1Map:58
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000058;//user.T1Map:58
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=5000445;//user.T1Map:445
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=5000487;//user.T1Map:487
      o = f.obj();
      //$LASTPOS=5000506;//user.T1Map:506
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=5000533;//user.T1Map:533
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=5000562;//user.T1Map:562
      _this.baseData=o.baseData;
      //$LASTPOS=5000587;//user.T1Map:587
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=5000628;//user.T1Map:628
      _this.mapData=_this.mapTable;
      //$LASTPOS=5000650;//user.T1Map:650
      _this.row=_this.mapTable.length;
      //$LASTPOS=5000675;//user.T1Map:675
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=5000703;//user.T1Map:703
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=5000746;//user.T1Map:746
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=5000777;//user.T1Map:777
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=5000848;//user.T1Map:848
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=5000445;//user.T1Map:445
      f = _this.file("../maps/").rel(fileName);
      //$LASTPOS=5000487;//user.T1Map:487
      o = f.obj();
      //$LASTPOS=5000506;//user.T1Map:506
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=5000533;//user.T1Map:533
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=5000562;//user.T1Map:562
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000587;//user.T1Map:587
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=5000628;//user.T1Map:628
            _this.mapData=_this.mapTable;
            //$LASTPOS=5000650;//user.T1Map:650
            _this.row=_this.mapTable.length;
            //$LASTPOS=5000675;//user.T1Map:675
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=5000703;//user.T1Map:703
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=5000746;//user.T1Map:746
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=5000777;//user.T1Map:777
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=5000848;//user.T1Map:848
            _this.fiber$initMap(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    conv :function _trc_T1Map_conv(mat,tbl) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=5000886;//user.T1Map:886
      res = [];
      //$LASTPOS=5000902;//user.T1Map:902
      mat.forEach((function anonymous_914(row) {
        var rrow;
        
        //$LASTPOS=5000931;//user.T1Map:931
        rrow = [];
        //$LASTPOS=5000952;//user.T1Map:952
        res.push(rrow);
        //$LASTPOS=5000976;//user.T1Map:976
        row.forEach((function anonymous_988(dat) {
          var t;
          
          //$LASTPOS=5001022;//user.T1Map:1022
          t = tbl[dat[0]];
          //$LASTPOS=5001053;//user.T1Map:1053
          if (t) {
            //$LASTPOS=5001060;//user.T1Map:1060
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=5001118;//user.T1Map:1118
            rrow.push(dat[1]);
          }
        }));
      }));
      return res;
    },
    fiber$conv :function _trc_T1Map_f_conv(_thread,mat,tbl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=5000886;//user.T1Map:886
      res = [];
      //$LASTPOS=5000902;//user.T1Map:902
      mat.forEach((function anonymous_914(row) {
        var rrow;
        
        //$LASTPOS=5000931;//user.T1Map:931
        rrow = [];
        //$LASTPOS=5000952;//user.T1Map:952
        res.push(rrow);
        //$LASTPOS=5000976;//user.T1Map:976
        row.forEach((function anonymous_988(dat) {
          var t;
          
          //$LASTPOS=5001022;//user.T1Map:1022
          t = tbl[dat[0]];
          //$LASTPOS=5001053;//user.T1Map:1053
          if (t) {
            //$LASTPOS=5001060;//user.T1Map:1060
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=5001118;//user.T1Map:1118
            rrow.push(dat[1]);
          }
        }));
      }));
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.T1Page',
  shortName: 'T1Page',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
  includes: [],
  methods: {
    main :function _trc_T1Page_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Page_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initGlobals :function _trc_T1Page_initGlobals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000044;//user.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=6000074;//user.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60,5);
      //$LASTPOS=6000105;//user.T1Page:105
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=6000133;//user.T1Page:133
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=6000161;//user.T1Page:161
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=6000191;//user.T1Page:191
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=6000224;//user.T1Page:224
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=6000253;//user.T1Page:253
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=6000284;//user.T1Page:284
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=6000315;//user.T1Page:315
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=6000349;//user.T1Page:349
      Tonyu.globals.$mplayer=new Tonyu.classes.user.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000044;//user.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=6000074;//user.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60,5);
      
      _thread.enter(function _trc_T1Page_ent_initGlobals(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000105;//user.T1Page:105
            _this.fiber$color(_thread, 0, 0, 0);
            __pc=1;return;
          case 1:
            Tonyu.globals.$clBlack=_thread.retVal;
            
            //$LASTPOS=6000133;//user.T1Page:133
            _this.fiber$color(_thread, 255, 0, 0);
            __pc=2;return;
          case 2:
            Tonyu.globals.$clRed=_thread.retVal;
            
            //$LASTPOS=6000161;//user.T1Page:161
            _this.fiber$color(_thread, 0, 255, 0);
            __pc=3;return;
          case 3:
            Tonyu.globals.$clGreen=_thread.retVal;
            
            //$LASTPOS=6000191;//user.T1Page:191
            _this.fiber$color(_thread, 255, 255, 0);
            __pc=4;return;
          case 4:
            Tonyu.globals.$clYellow=_thread.retVal;
            
            //$LASTPOS=6000224;//user.T1Page:224
            _this.fiber$color(_thread, 0, 0, 255);
            __pc=5;return;
          case 5:
            Tonyu.globals.$clBlue=_thread.retVal;
            
            //$LASTPOS=6000253;//user.T1Page:253
            _this.fiber$color(_thread, 255, 0, 255);
            __pc=6;return;
          case 6:
            Tonyu.globals.$clPink=_thread.retVal;
            
            //$LASTPOS=6000284;//user.T1Page:284
            _this.fiber$color(_thread, 0, 255, 255);
            __pc=7;return;
          case 7:
            Tonyu.globals.$clAqua=_thread.retVal;
            
            //$LASTPOS=6000315;//user.T1Page:315
            _this.fiber$color(_thread, 255, 255, 255);
            __pc=8;return;
          case 8:
            Tonyu.globals.$clWhite=_thread.retVal;
            
            //$LASTPOS=6000349;//user.T1Page:349
            Tonyu.globals.$mplayer=new Tonyu.classes.user.MediaPlayer;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.T1Text',
  shortName: 'T1Text',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_T1Text_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Text_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Text_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000016;//user.T1Text:16
      if (_this.hidden) {
        return _this;
      }
      //$LASTPOS=7000041;//user.T1Text:41
      Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
      //$LASTPOS=7000061;//user.T1Text:61
      _this.hidden=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.TextChar',
  shortName: 'TextChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.PlainChar,
  includes: [],
  methods: {
    main :function _trc_TextChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TextChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TextChar_initialize(xx,yy,t,c,s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000044;//user.TextChar:44
      Tonyu.classes.user.PlainChar.apply( _this, [xx,yy,null]);
      //$LASTPOS=8000067;//user.TextChar:67
      if (! _this.text) {
        //$LASTPOS=8000078;//user.TextChar:78
        _this.text="";
      }
      //$LASTPOS=8000091;//user.TextChar:91
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=8000109;//user.TextChar:109
      if (! _this.size) {
        //$LASTPOS=8000120;//user.TextChar:120
        _this.size=20;
      }
      //$LASTPOS=8000133;//user.TextChar:133
      _this.p=null;
      //$LASTPOS=8000145;//user.TextChar:145
      _this.align="left";
      //$LASTPOS=8000163;//user.TextChar:163
      if (! _this.x) {
        //$LASTPOS=8000176;//user.TextChar:176
        _this.x=0;
      }
      //$LASTPOS=8000190;//user.TextChar:190
      if (! _this.y) {
        //$LASTPOS=8000203;//user.TextChar:203
        _this.y=0;
      }
      //$LASTPOS=8000217;//user.TextChar:217
      if (t) {
        //$LASTPOS=8000224;//user.TextChar:224
        _this.text=t;
      }
      //$LASTPOS=8000236;//user.TextChar:236
      if (c) {
        //$LASTPOS=8000243;//user.TextChar:243
        _this.fillStyle=c;
      }
      //$LASTPOS=8000260;//user.TextChar:260
      if (s) {
        //$LASTPOS=8000267;//user.TextChar:267
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000294;//user.TextChar:294
      _this.fillStyle=_this.col;
      //$LASTPOS=8000313;//user.TextChar:313
      Tonyu.classes.user.PlainChar.prototype.draw.apply( _this, [ctx]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9000835;//user.Ball:835
      _this.vx=_this.vy=0;
      //$LASTPOS=9000845;//user.Ball:845
      Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=9000867;//user.Ball:867
      while (1) {
        //$LASTPOS=9000882;//user.Ball:882
        _this.x+=_this.vx;
        //$LASTPOS=9000894;//user.Ball:894
        _this.y+=_this.vy;
        //$LASTPOS=9000906;//user.Ball:906
        if (_this.x<32) {
          //$LASTPOS=9000960;//user.Ball:960
          _this.t=_this.tokuten(1);
          //$LASTPOS=9000983;//user.Ball:983
          if (! _this.t) {
            //$LASTPOS=9001006;//user.Ball:1006
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
            //$LASTPOS=9001045;//user.Ball:1045
            _this.vx=_this.abs(_this.vx);
            //$LASTPOS=9001057;//user.Ball:1057
            _this.x=32;
            
          }
          
        }
        //$LASTPOS=9001086;//user.Ball:1086
        if (_this.x>Tonyu.globals.$screenWidth-32) {
          //$LASTPOS=9001153;//user.Ball:1153
          _this.t=_this.tokuten(- 1);
          //$LASTPOS=9001177;//user.Ball:1177
          if (! _this.t) {
            //$LASTPOS=9001200;//user.Ball:1200
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
            //$LASTPOS=9001239;//user.Ball:1239
            _this.vx=- _this.abs(_this.vx);
            //$LASTPOS=9001252;//user.Ball:1252
            _this.x=Tonyu.globals.$screenWidth-32;
            
          }
          
        }
        //$LASTPOS=9001310;//user.Ball:1310
        if (_this.y<32) {
          //$LASTPOS=9001331;//user.Ball:1331
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
          //$LASTPOS=9001366;//user.Ball:1366
          _this.vy=_this.abs(_this.vy);
          //$LASTPOS=9001377;//user.Ball:1377
          _this.y=32;
          
        }
        //$LASTPOS=9001395;//user.Ball:1395
        if (_this.y>Tonyu.globals.$screenHeight-32) {
          //$LASTPOS=9001430;//user.Ball:1430
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
          //$LASTPOS=9001465;//user.Ball:1465
          _this.vy=- _this.abs(_this.vy);
          //$LASTPOS=9001477;//user.Ball:1477
          _this.y=Tonyu.globals.$screenHeight-32;
          
        }
        //$LASTPOS=9001525;//user.Ball:1525
        _this.spd=_this.dist(_this.vx,_this.vy);
        //$LASTPOS=9001547;//user.Ball:1547
        _this.vx=_this.vx*0.99;
        //$LASTPOS=9001564;//user.Ball:1564
        _this.vy=_this.vy*0.99;
        //$LASTPOS=9001606;//user.Ball:1606
        if (_this.spd>30) {
          //$LASTPOS=9001629;//user.Ball:1629
          _this.vx=_this.vx*30/_this.spd;
          //$LASTPOS=9001652;//user.Ball:1652
          _this.vy=_this.vy*30/_this.spd;
          
        }
        //$LASTPOS=9001678;//user.Ball:1678
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000835;//user.Ball:835
      _this.vx=_this.vy=0;
      //$LASTPOS=9000845;//user.Ball:845
      Tonyu.globals.$cy=Tonyu.globals.$screenHeight/2;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000867;//user.Ball:867
          case 1:
            if (!(1)) { __pc=7; break; }
            //$LASTPOS=9000882;//user.Ball:882
            _this.x+=_this.vx;
            //$LASTPOS=9000894;//user.Ball:894
            _this.y+=_this.vy;
            //$LASTPOS=9000906;//user.Ball:906
            if (!(_this.x<32)) { __pc=3; break; }
            //$LASTPOS=9000960;//user.Ball:960
            _this.fiber$tokuten(_thread, 1);
            __pc=2;return;
          case 2:
            _this.t=_thread.retVal;
            
            //$LASTPOS=9000983;//user.Ball:983
            if (! _this.t) {
              //$LASTPOS=9001006;//user.Ball:1006
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=9001045;//user.Ball:1045
              _this.vx=_this.abs(_this.vx);
              //$LASTPOS=9001057;//user.Ball:1057
              _this.x=32;
              
            }
          case 3:
            
            //$LASTPOS=9001086;//user.Ball:1086
            if (!(_this.x>Tonyu.globals.$screenWidth-32)) { __pc=5; break; }
            //$LASTPOS=9001153;//user.Ball:1153
            _this.fiber$tokuten(_thread, - 1);
            __pc=4;return;
          case 4:
            _this.t=_thread.retVal;
            
            //$LASTPOS=9001177;//user.Ball:1177
            if (! _this.t) {
              //$LASTPOS=9001200;//user.Ball:1200
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=9001239;//user.Ball:1239
              _this.vx=- _this.abs(_this.vx);
              //$LASTPOS=9001252;//user.Ball:1252
              _this.x=Tonyu.globals.$screenWidth-32;
              
            }
          case 5:
            
            //$LASTPOS=9001310;//user.Ball:1310
            if (_this.y<32) {
              //$LASTPOS=9001331;//user.Ball:1331
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=9001366;//user.Ball:1366
              _this.vy=_this.abs(_this.vy);
              //$LASTPOS=9001377;//user.Ball:1377
              _this.y=32;
              
            }
            //$LASTPOS=9001395;//user.Ball:1395
            if (_this.y>Tonyu.globals.$screenHeight-32) {
              //$LASTPOS=9001430;//user.Ball:1430
              Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bound);
              //$LASTPOS=9001465;//user.Ball:1465
              _this.vy=- _this.abs(_this.vy);
              //$LASTPOS=9001477;//user.Ball:1477
              _this.y=Tonyu.globals.$screenHeight-32;
              
            }
            //$LASTPOS=9001525;//user.Ball:1525
            _this.spd=_this.dist(_this.vx,_this.vy);
            //$LASTPOS=9001547;//user.Ball:1547
            _this.vx=_this.vx*0.99;
            //$LASTPOS=9001564;//user.Ball:1564
            _this.vy=_this.vy*0.99;
            //$LASTPOS=9001606;//user.Ball:1606
            if (_this.spd>30) {
              //$LASTPOS=9001629;//user.Ball:1629
              _this.vx=_this.vx*30/_this.spd;
              //$LASTPOS=9001652;//user.Ball:1652
              _this.vy=_this.vy*30/_this.spd;
              
            }
            //$LASTPOS=9001678;//user.Ball:1678
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
    tes :function _trc_Ball_tes() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=9000044;//user.Ball:44
      _this.a.b.c();
    },
    tokuten :function _trc_Ball_tokuten(s) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=9000084;//user.Ball:84
      i;
      //$LASTPOS=9000177;//user.Ball:177
      if (_this.abs(_this.y-Tonyu.globals.$screenHeight/2)<Tonyu.globals.$screenHeight/5) {
        //$LASTPOS=9000232;//user.Ball:232
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_in);
        //$LASTPOS=9000264;//user.Ball:264
        i=0;
        //$LASTPOS=9000269;//user.Ball:269
        while (i<10) {
          //$LASTPOS=9000297;//user.Ball:297
          i+=1;
          //$LASTPOS=9000316;//user.Ball:316
          _this.x+=_this.vx;
          //$LASTPOS=9000322;//user.Ball:322
          _this.y+=_this.vy;
          //$LASTPOS=9000328;//user.Ball:328
          _this.update();
          //$LASTPOS=9000337;//user.Ball:337
          _this.vy=_this.vy/2;
          
        }
        //$LASTPOS=9000366;//user.Ball:366
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_jingle);
        //$LASTPOS=9000433;//user.Ball:433
        if (s<0) {
          //$LASTPOS=9000443;//user.Ball:443
          Tonyu.globals.$tokuten.setValue(Tonyu.globals.$tokuten.value+1);
          
        } else {
          //$LASTPOS=9000496;//user.Ball:496
          Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$tokuten_1.value+1);
          
        }
        //$LASTPOS=9000547;//user.Ball:547
        _this.x-=s*150;
        //$LASTPOS=9000566;//user.Ball:566
        _this.wait(60);
        //$LASTPOS=9000603;//user.Ball:603
        if (Tonyu.globals.$tokuten_1.value>=Tonyu.globals.$pat_tokuten+7||Tonyu.globals.$tokuten.value>=Tonyu.globals.$pat_tokuten+7) {
          //$LASTPOS=9000699;//user.Ball:699
          Tonyu.globals.$Replay_1.show(1);
          //$LASTPOS=9000717;//user.Ball:717
          _this.wait();
          
        }
        //$LASTPOS=9000745;//user.Ball:745
        _this.x=Tonyu.globals.$cX-s*200;
        //$LASTPOS=9000757;//user.Ball:757
        _this.vx=0;
        //$LASTPOS=9000762;//user.Ball:762
        _this.vy=0;
        //$LASTPOS=9000767;//user.Ball:767
        _this.y=_this.rnd(200)-100+Tonyu.globals.$cy;
        return 1;
        
      }
      return 0;
    },
    fiber$tokuten :function _trc_Ball_f_tokuten(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=9000084;//user.Ball:84
      i;
      
      _thread.enter(function _trc_Ball_ent_tokuten(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000177;//user.Ball:177
            if (!(_this.abs(_this.y-Tonyu.globals.$screenHeight/2)<Tonyu.globals.$screenHeight/5)) { __pc=7; break; }
            //$LASTPOS=9000232;//user.Ball:232
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_in);
            //$LASTPOS=9000264;//user.Ball:264
            i=0;
            //$LASTPOS=9000269;//user.Ball:269
          case 1:
            if (!(i<10)) { __pc=3; break; }
            //$LASTPOS=9000297;//user.Ball:297
            i+=1;
            //$LASTPOS=9000316;//user.Ball:316
            _this.x+=_this.vx;
            //$LASTPOS=9000322;//user.Ball:322
            _this.y+=_this.vy;
            //$LASTPOS=9000328;//user.Ball:328
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=9000337;//user.Ball:337
            _this.vy=_this.vy/2;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=9000366;//user.Ball:366
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_jingle);
            //$LASTPOS=9000433;//user.Ball:433
            if (s<0) {
              //$LASTPOS=9000443;//user.Ball:443
              Tonyu.globals.$tokuten.setValue(Tonyu.globals.$tokuten.value+1);
              
            } else {
              //$LASTPOS=9000496;//user.Ball:496
              Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$tokuten_1.value+1);
              
            }
            //$LASTPOS=9000547;//user.Ball:547
            _this.x-=s*150;
            //$LASTPOS=9000566;//user.Ball:566
            _this.fiber$wait(_thread, 60);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=9000603;//user.Ball:603
            if (!(Tonyu.globals.$tokuten_1.value>=Tonyu.globals.$pat_tokuten+7||Tonyu.globals.$tokuten.value>=Tonyu.globals.$pat_tokuten+7)) { __pc=6; break; }
            //$LASTPOS=9000699;//user.Ball:699
            Tonyu.globals.$Replay_1.show(1);
            //$LASTPOS=9000717;//user.Ball:717
            _this.fiber$wait(_thread);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=9000745;//user.Ball:745
            _this.x=Tonyu.globals.$cX-s*200;
            //$LASTPOS=9000757;//user.Ball:757
            _this.vx=0;
            //$LASTPOS=9000762;//user.Ball:762
            _this.vy=0;
            //$LASTPOS=9000767;//user.Ball:767
            _this.y=_this.rnd(200)-100+Tonyu.globals.$cy;
            _thread.exit(1);return;
          case 7:
            
            _thread.exit(0);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"tes":{"nowait":true},"tokuten":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.DxChar',
  shortName: 'DxChar',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_DxChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_DxChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_DxChar_initialize(xx,yy,pp,ff,sz,rt,al) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000057;//user.DxChar:57
      Tonyu.classes.user.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=10000082;//user.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=10000097;//user.DxChar:97
      if (sz) {
        //$LASTPOS=10000105;//user.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=10000121;//user.DxChar:121
      _this.angle=0;
      //$LASTPOS=10000135;//user.DxChar:135
      if (rt) {
        //$LASTPOS=10000143;//user.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=10000158;//user.DxChar:158
      _this.alpha=255;
      //$LASTPOS=10000174;//user.DxChar:174
      if (al) {
        //$LASTPOS=10000182;//user.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000212;//user.DxChar:212
      _this.rotation=_this.angle;
      //$LASTPOS=10000233;//user.DxChar:233
      Tonyu.classes.user.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Enemy',
  shortName: 'Enemy',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Enemy_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000516;//user.Enemy:516
      _this.p=- 1;
      //$LASTPOS=11000523;//user.Enemy:523
      if (! _this.dir) {
        //$LASTPOS=11000533;//user.Enemy:533
        _this.dir=- 1;
      }
      //$LASTPOS=11000542;//user.Enemy:542
      Tonyu.globals.$us=16;
      //$LASTPOS=11000551;//user.Enemy:551
      Tonyu.globals.$ds=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=11000574;//user.Enemy:574
      Tonyu.globals.$cX=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=11000595;//user.Enemy:595
      while (1) {
        //$LASTPOS=11000610;//user.Enemy:610
        if (_this.ty>Tonyu.globals.$us&&_this.ty<Tonyu.globals.$ds) {
          //$LASTPOS=11000632;//user.Enemy:632
          _this.y=_this.ty*0.05+_this.y*0.95;
        }
        //$LASTPOS=11000655;//user.Enemy:655
        if (_this.x<0) {
          //$LASTPOS=11000664;//user.Enemy:664
          _this.x=0;
        }
        //$LASTPOS=11000674;//user.Enemy:674
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=11000694;//user.Enemy:694
          _this.x=Tonyu.globals.$screenWidth;
        }
        //$LASTPOS=11000715;//user.Enemy:715
        if (_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy*10)<50) {
          //$LASTPOS=11000761;//user.Enemy:761
          if (Tonyu.globals.$ball.x-_this.dir*16>_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
            //$LASTPOS=11000807;//user.Enemy:807
            _this.x+=2;
          }
          //$LASTPOS=11000822;//user.Enemy:822
          if (Tonyu.globals.$ball.x-_this.dir*16<_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
            //$LASTPOS=11000868;//user.Enemy:868
            _this.x-=2;
          }
          //$LASTPOS=11000883;//user.Enemy:883
          if (Tonyu.globals.$ball.y>_this.y) {
            //$LASTPOS=11000898;//user.Enemy:898
            _this.ty+=2;
          }
          //$LASTPOS=11000914;//user.Enemy:914
          if (Tonyu.globals.$ball.y<_this.y) {
            //$LASTPOS=11000929;//user.Enemy:929
            _this.ty-=2;
          }
          
        }
        //$LASTPOS=11000948;//user.Enemy:948
        if (Tonyu.globals.$ball.vx*_this.dir<- 0.001) {
          //$LASTPOS=11000984;//user.Enemy:984
          _this.ty=Tonyu.globals.$ball.y+Tonyu.globals.$ball.vy*_this.abs(_this.x-Tonyu.globals.$ball.x)/_this.abs(Tonyu.globals.$ball.vx);
          //$LASTPOS=11001043;//user.Enemy:1043
          while ((_this.ty<Tonyu.globals.$us||_this.ty>Tonyu.globals.$ds)&&_this.abs(Tonyu.globals.$ball.vx)>1) {
            //$LASTPOS=11001104;//user.Enemy:1104
            if (_this.ty<Tonyu.globals.$us) {
              //$LASTPOS=11001116;//user.Enemy:1116
              _this.ty=- (_this.ty-Tonyu.globals.$us)+Tonyu.globals.$us;
            }
            //$LASTPOS=11001147;//user.Enemy:1147
            if (_this.ty>Tonyu.globals.$ds) {
              //$LASTPOS=11001159;//user.Enemy:1159
              _this.ty=- (_this.ty-Tonyu.globals.$ds)+Tonyu.globals.$ds;
            }
            //$LASTPOS=11001190;//user.Enemy:1190
            _this.update();
            
          }
          
        }
        //$LASTPOS=11001223;//user.Enemy:1223
        if ((_this.x-Tonyu.globals.$ball.x)*_this.dir<0.01) {
          //$LASTPOS=11001260;//user.Enemy:1260
          if (_this.dist(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y)<80) {
            //$LASTPOS=11001294;//user.Enemy:1294
            _this.attack();
          }
          
        }
        //$LASTPOS=11001316;//user.Enemy:1316
        _this.update();
        
      }
    },
    fiber$main :function _trc_Enemy_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11000516;//user.Enemy:516
      _this.p=- 1;
      //$LASTPOS=11000523;//user.Enemy:523
      if (! _this.dir) {
        //$LASTPOS=11000533;//user.Enemy:533
        _this.dir=- 1;
      }
      //$LASTPOS=11000542;//user.Enemy:542
      Tonyu.globals.$us=16;
      //$LASTPOS=11000551;//user.Enemy:551
      Tonyu.globals.$ds=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=11000574;//user.Enemy:574
      Tonyu.globals.$cX=Tonyu.globals.$screenWidth/2;
      
      _thread.enter(function _trc_Enemy_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000595;//user.Enemy:595
          case 1:
            if (!(1)) { __pc=10; break; }
            //$LASTPOS=11000610;//user.Enemy:610
            if (_this.ty>Tonyu.globals.$us&&_this.ty<Tonyu.globals.$ds) {
              //$LASTPOS=11000632;//user.Enemy:632
              _this.y=_this.ty*0.05+_this.y*0.95;
            }
            //$LASTPOS=11000655;//user.Enemy:655
            if (_this.x<0) {
              //$LASTPOS=11000664;//user.Enemy:664
              _this.x=0;
            }
            //$LASTPOS=11000674;//user.Enemy:674
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=11000694;//user.Enemy:694
              _this.x=Tonyu.globals.$screenWidth;
            }
            //$LASTPOS=11000715;//user.Enemy:715
            if (_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy*10)<50) {
              //$LASTPOS=11000761;//user.Enemy:761
              if (Tonyu.globals.$ball.x-_this.dir*16>_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
                //$LASTPOS=11000807;//user.Enemy:807
                _this.x+=2;
              }
              //$LASTPOS=11000822;//user.Enemy:822
              if (Tonyu.globals.$ball.x-_this.dir*16<_this.x&&(Tonyu.globals.$ball.x-Tonyu.globals.$cX)*_this.dir<=0) {
                //$LASTPOS=11000868;//user.Enemy:868
                _this.x-=2;
              }
              //$LASTPOS=11000883;//user.Enemy:883
              if (Tonyu.globals.$ball.y>_this.y) {
                //$LASTPOS=11000898;//user.Enemy:898
                _this.ty+=2;
              }
              //$LASTPOS=11000914;//user.Enemy:914
              if (Tonyu.globals.$ball.y<_this.y) {
                //$LASTPOS=11000929;//user.Enemy:929
                _this.ty-=2;
              }
              
            }
            //$LASTPOS=11000948;//user.Enemy:948
            if (!(Tonyu.globals.$ball.vx*_this.dir<- 0.001)) { __pc=5; break; }
            //$LASTPOS=11000984;//user.Enemy:984
            _this.ty=Tonyu.globals.$ball.y+Tonyu.globals.$ball.vy*_this.abs(_this.x-Tonyu.globals.$ball.x)/_this.abs(Tonyu.globals.$ball.vx);
            //$LASTPOS=11001043;//user.Enemy:1043
          case 2:
            if (!((_this.ty<Tonyu.globals.$us||_this.ty>Tonyu.globals.$ds)&&_this.abs(Tonyu.globals.$ball.vx)>1)) { __pc=4; break; }
            //$LASTPOS=11001104;//user.Enemy:1104
            if (_this.ty<Tonyu.globals.$us) {
              //$LASTPOS=11001116;//user.Enemy:1116
              _this.ty=- (_this.ty-Tonyu.globals.$us)+Tonyu.globals.$us;
            }
            //$LASTPOS=11001147;//user.Enemy:1147
            if (_this.ty>Tonyu.globals.$ds) {
              //$LASTPOS=11001159;//user.Enemy:1159
              _this.ty=- (_this.ty-Tonyu.globals.$ds)+Tonyu.globals.$ds;
            }
            //$LASTPOS=11001190;//user.Enemy:1190
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
          case 5:
            
            //$LASTPOS=11001223;//user.Enemy:1223
            if (!((_this.x-Tonyu.globals.$ball.x)*_this.dir<0.01)) { __pc=8; break; }
            //$LASTPOS=11001260;//user.Enemy:1260
            if (!(_this.dist(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y)<80)) { __pc=7; break; }
            //$LASTPOS=11001294;//user.Enemy:1294
            _this.fiber$attack(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=11001316;//user.Enemy:1316
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_Enemy_onUpdate() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=11000065;//user.Enemy:65
      if (_this.dir>0&&Tonyu.globals.$player.manPlay) {
        return _this;
      }
      //$LASTPOS=11000108;//user.Enemy:108
      _this.tracket.y=_this.y;
      //$LASTPOS=11000126;//user.Enemy:126
      if ((_this.x-Tonyu.globals.$cX)*_this.dir<=0) {
        //$LASTPOS=11000147;//user.Enemy:147
        _this.tracket.x=_this.x;
      }
    },
    attack :function _trc_Enemy_attack() {
      "use strict";
      var _this=this;
      var i;
      var a;
      
      //$LASTPOS=11000191;//user.Enemy:191
      i;a;
      //$LASTPOS=11000205;//user.Enemy:205
      i=0;
      //$LASTPOS=11000215;//user.Enemy:215
      a=_this.angle1(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y);
      //$LASTPOS=11000251;//user.Enemy:251
      while (i<10) {
        //$LASTPOS=11000275;//user.Enemy:275
        if (_this.rnd(2)==0) {
          //$LASTPOS=11000290;//user.Enemy:290
          a=_this.angle1(Tonyu.globals.$ball.x-_this.x,Tonyu.globals.$ball.y-_this.y);
        }
        //$LASTPOS=11000330;//user.Enemy:330
        _this.x+=_this.cos(a)*16;
        //$LASTPOS=11000343;//user.Enemy:343
        _this.y+=_this.sin(a)*16;
        //$LASTPOS=11000366;//user.Enemy:366
        i+=1;
        //$LASTPOS=11000371;//user.Enemy:371
        _this.update();
        
      }
      //$LASTPOS=11000394;//user.Enemy:394
      _this.t=Tonyu.globals.$screenWidth/2-_this.dir*(_this.rnd(100)+150);
      //$LASTPOS=11000436;//user.Enemy:436
      while ((_this.x-_this.t)*_this.dir>0) {
        //$LASTPOS=11000470;//user.Enemy:470
        _this.x-=16*_this.dir;
        //$LASTPOS=11000490;//user.Enemy:490
        _this.update();
        
      }
    },
    fiber$attack :function _trc_Enemy_f_attack(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var a;
      
      //$LASTPOS=11000191;//user.Enemy:191
      i;a;
      //$LASTPOS=11000205;//user.Enemy:205
      i=0;
      
      _thread.enter(function _trc_Enemy_ent_attack(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000215;//user.Enemy:215
            _this.fiber$angle1(_thread, Tonyu.globals.$ball.x-_this.x, Tonyu.globals.$ball.y-_this.y);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=11000251;//user.Enemy:251
          case 2:
            if (!(i<10)) { __pc=6; break; }
            //$LASTPOS=11000275;//user.Enemy:275
            if (!(_this.rnd(2)==0)) { __pc=4; break; }
            //$LASTPOS=11000290;//user.Enemy:290
            _this.fiber$angle1(_thread, Tonyu.globals.$ball.x-_this.x, Tonyu.globals.$ball.y-_this.y);
            __pc=3;return;
          case 3:
            a=_thread.retVal;
            
          case 4:
            
            //$LASTPOS=11000330;//user.Enemy:330
            _this.x+=_this.cos(a)*16;
            //$LASTPOS=11000343;//user.Enemy:343
            _this.y+=_this.sin(a)*16;
            //$LASTPOS=11000366;//user.Enemy:366
            i+=1;
            //$LASTPOS=11000371;//user.Enemy:371
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            //$LASTPOS=11000394;//user.Enemy:394
            _this.t=Tonyu.globals.$screenWidth/2-_this.dir*(_this.rnd(100)+150);
            //$LASTPOS=11000436;//user.Enemy:436
          case 7:
            if (!((_this.x-_this.t)*_this.dir>0)) { __pc=9; break; }
            //$LASTPOS=11000470;//user.Enemy:470
            _this.x-=16*_this.dir;
            //$LASTPOS=11000490;//user.Enemy:490
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=7;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onUpdate":{"nowait":true},"attack":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Page_index',
  shortName: 'Page_index',
  namespace: 'user',
  superclass: Tonyu.classes.user.T1Page,
  includes: [],
  methods: {
    main :function _trc_Page_index_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12000016;//user.Page_index:16
      _this.initGlobals();
      //$LASTPOS=12000031;//user.Page_index:31
      Tonyu.globals.$screenWidth=560;
      //$LASTPOS=12000049;//user.Page_index:49
      Tonyu.globals.$screenHeight=384;
      //$LASTPOS=12000068;//user.Page_index:68
      Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=12000112;//user.Page_index:112
      Tonyu.globals.$player=Tonyu.globals.$Player=new Tonyu.classes.user.Player({p: 5,x: 77,y: 316,manplay: 1});
      //$LASTPOS=12000174;//user.Page_index:174
      Tonyu.globals.$ball=Tonyu.globals.$Ball=new Tonyu.classes.user.Ball({p: 20,x: 222,y: 200});
      //$LASTPOS=12000220;//user.Page_index:220
      Tonyu.globals.$Racket=new Tonyu.classes.user.Racket({p: 17,x: 64,y: 86});
      //$LASTPOS=12000262;//user.Page_index:262
      Tonyu.globals.$Racket_1=new Tonyu.classes.user.Racket({p: 21,x: 128.575592041016,y: 58.8583068847656});
      //$LASTPOS=12000334;//user.Page_index:334
      Tonyu.globals.$Enemy=new Tonyu.classes.user.Enemy({p: 6,x: 477,y: 279,tracket: Tonyu.globals.$Racket_1});
      //$LASTPOS=12000395;//user.Page_index:395
      Tonyu.globals.$tokuten=new Tonyu.classes.user.Tokuten({alpha: 255,angle: 0,p: Tonyu.globals.$pat_tokuten+0,scaleX: 1,x: 236,y: 65});
      //$LASTPOS=12000485;//user.Page_index:485
      Tonyu.globals.$tokuten_1=new Tonyu.classes.user.Tokuten({scaleX: 1,angle: 0,alpha: 255,p: Tonyu.globals.$pat_tokuten+0,x: 306,y: 64});
      //$LASTPOS=12000577;//user.Page_index:577
      Tonyu.globals.$Replay_1=new Tonyu.classes.user.Replay({p: 4,size: 25,x: 138,y: 101,text: "Click Here to Replay"});
      //$LASTPOS=12000662;//user.Page_index:662
      Tonyu.globals.$Enemy_2=new Tonyu.classes.user.Enemy({p: 6,x: 192,y: 293,tracket: Tonyu.globals.$Racket,dir: 1});
      //$LASTPOS=12000731;//user.Page_index:731
      Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 1000});
      //$LASTPOS=12000760;//user.Page_index:760
      Tonyu.globals.$map.load("index.map");
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
            //$LASTPOS=12000016;//user.Page_index:16
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=12000031;//user.Page_index:31
            Tonyu.globals.$screenWidth=560;
            //$LASTPOS=12000049;//user.Page_index:49
            Tonyu.globals.$screenHeight=384;
            //$LASTPOS=12000068;//user.Page_index:68
            Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=12000112;//user.Page_index:112
            Tonyu.globals.$player=Tonyu.globals.$Player=new Tonyu.classes.user.Player({p: 5,x: 77,y: 316,manplay: 1});
            //$LASTPOS=12000174;//user.Page_index:174
            Tonyu.globals.$ball=Tonyu.globals.$Ball=new Tonyu.classes.user.Ball({p: 20,x: 222,y: 200});
            //$LASTPOS=12000220;//user.Page_index:220
            Tonyu.globals.$Racket=new Tonyu.classes.user.Racket({p: 17,x: 64,y: 86});
            //$LASTPOS=12000262;//user.Page_index:262
            Tonyu.globals.$Racket_1=new Tonyu.classes.user.Racket({p: 21,x: 128.575592041016,y: 58.8583068847656});
            //$LASTPOS=12000334;//user.Page_index:334
            Tonyu.globals.$Enemy=new Tonyu.classes.user.Enemy({p: 6,x: 477,y: 279,tracket: Tonyu.globals.$Racket_1});
            //$LASTPOS=12000395;//user.Page_index:395
            Tonyu.globals.$tokuten=new Tonyu.classes.user.Tokuten({alpha: 255,angle: 0,p: Tonyu.globals.$pat_tokuten+0,scaleX: 1,x: 236,y: 65});
            //$LASTPOS=12000485;//user.Page_index:485
            Tonyu.globals.$tokuten_1=new Tonyu.classes.user.Tokuten({scaleX: 1,angle: 0,alpha: 255,p: Tonyu.globals.$pat_tokuten+0,x: 306,y: 64});
            //$LASTPOS=12000577;//user.Page_index:577
            Tonyu.globals.$Replay_1=new Tonyu.classes.user.Replay({p: 4,size: 25,x: 138,y: 101,text: "Click Here to Replay"});
            //$LASTPOS=12000662;//user.Page_index:662
            Tonyu.globals.$Enemy_2=new Tonyu.classes.user.Enemy({p: 6,x: 192,y: 293,tracket: Tonyu.globals.$Racket,dir: 1});
            //$LASTPOS=12000731;//user.Page_index:731
            Tonyu.globals.$map=new Tonyu.classes.user.T1Map({zOrder: 1000});
            //$LASTPOS=12000760;//user.Page_index:760
            Tonyu.globals.$map.load("index.map");
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
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000023;//user.Player:23
      _this.dir=1;
      //$LASTPOS=13000031;//user.Player:31
      _this.rs=0.4;
      //$LASTPOS=13000040;//user.Player:40
      _this.setVisible(0);
      //$LASTPOS=13000075;//user.Player:75
      while (1) {
        //$LASTPOS=13000090;//user.Player:90
        if (_this.manPlay) {
          //$LASTPOS=13000144;//user.Player:144
          Tonyu.globals.$Racket.x=Tonyu.globals.$mouseX*_this.rs+Tonyu.globals.$Racket.x*(1-_this.rs);
          //$LASTPOS=13000222;//user.Player:222
          if ((Tonyu.globals.$Racket.x-Tonyu.globals.$screenWidth/2)*_this.dir>=0) {
            //$LASTPOS=13000261;//user.Player:261
            Tonyu.globals.$Racket.x=Tonyu.globals.$screenWidth/2;
          }
          //$LASTPOS=13000296;//user.Player:296
          Tonyu.globals.$Racket.y=Tonyu.globals.$mouseY*_this.rs+Tonyu.globals.$Racket.y*(1-_this.rs);
          
        }
        //$LASTPOS=13000347;//user.Player:347
        if (_this.getkey(32)==1) {
          //$LASTPOS=13000366;//user.Player:366
          _this.manPlay=! _this.manPlay;
        }
        //$LASTPOS=13000389;//user.Player:389
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=13000023;//user.Player:23
      _this.dir=1;
      //$LASTPOS=13000031;//user.Player:31
      _this.rs=0.4;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000040;//user.Player:40
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=13000075;//user.Player:75
          case 2:
            if (!(1)) { __pc=4; break; }
            //$LASTPOS=13000090;//user.Player:90
            if (_this.manPlay) {
              //$LASTPOS=13000144;//user.Player:144
              Tonyu.globals.$Racket.x=Tonyu.globals.$mouseX*_this.rs+Tonyu.globals.$Racket.x*(1-_this.rs);
              //$LASTPOS=13000222;//user.Player:222
              if ((Tonyu.globals.$Racket.x-Tonyu.globals.$screenWidth/2)*_this.dir>=0) {
                //$LASTPOS=13000261;//user.Player:261
                Tonyu.globals.$Racket.x=Tonyu.globals.$screenWidth/2;
              }
              //$LASTPOS=13000296;//user.Player:296
              Tonyu.globals.$Racket.y=Tonyu.globals.$mouseY*_this.rs+Tonyu.globals.$Racket.y*(1-_this.rs);
              
            }
            //$LASTPOS=13000347;//user.Player:347
            if (_this.getkey(32)==1) {
              //$LASTPOS=13000366;//user.Player:366
              _this.manPlay=! _this.manPlay;
            }
            //$LASTPOS=13000389;//user.Player:389
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
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Racket',
  shortName: 'Racket',
  namespace: 'user',
  superclass: Tonyu.classes.user.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Racket_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000203;//user.Racket:203
      _this.px=_this.x;
      //$LASTPOS=14000208;//user.Racket:208
      _this.py=_this.y;
      //$LASTPOS=14000215;//user.Racket:215
      while (1) {
        //$LASTPOS=14000230;//user.Racket:230
        _this.px=_this.x;
        //$LASTPOS=14000257;//user.Racket:257
        _this.py=_this.y;
        //$LASTPOS=14000268;//user.Racket:268
        _this.update();
        //$LASTPOS=14000283;//user.Racket:283
        _this.sew-=1;
        //$LASTPOS=14000296;//user.Racket:296
        if (_this.crashTo(Tonyu.globals.$ball)) {
          //$LASTPOS=14000354;//user.Racket:354
          if (_this.sew<=0) {
            //$LASTPOS=14000367;//user.Racket:367
            _this.sew=8;
            //$LASTPOS=14000374;//user.Racket:374
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_shot);
            
          }
          //$LASTPOS=14000409;//user.Racket:409
          _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
          //$LASTPOS=14000437;//user.Racket:437
          _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
          //$LASTPOS=14000465;//user.Racket:465
          _this.spd=1;
          //$LASTPOS=14000481;//user.Racket:481
          if (_this.d<32) {
            //$LASTPOS=14000561;//user.Racket:561
            Tonyu.globals.$ball.x=_this.x+_this.avx*32;
            //$LASTPOS=14000592;//user.Racket:592
            Tonyu.globals.$ball.y=_this.y+_this.avy*32;
            //$LASTPOS=14000623;//user.Racket:623
            _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
            
          }
          //$LASTPOS=14000696;//user.Racket:696
          Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
          //$LASTPOS=14000735;//user.Racket:735
          Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
          
        }
        
      }
    },
    fiber$main :function _trc_Racket_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14000203;//user.Racket:203
      _this.px=_this.x;
      //$LASTPOS=14000208;//user.Racket:208
      _this.py=_this.y;
      
      _thread.enter(function _trc_Racket_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14000215;//user.Racket:215
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=14000230;//user.Racket:230
            _this.px=_this.x;
            //$LASTPOS=14000257;//user.Racket:257
            _this.py=_this.y;
            //$LASTPOS=14000268;//user.Racket:268
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=14000283;//user.Racket:283
            _this.sew-=1;
            //$LASTPOS=14000296;//user.Racket:296
            if (_this.crashTo(Tonyu.globals.$ball)) {
              //$LASTPOS=14000354;//user.Racket:354
              if (_this.sew<=0) {
                //$LASTPOS=14000367;//user.Racket:367
                _this.sew=8;
                //$LASTPOS=14000374;//user.Racket:374
                Tonyu.globals.$mplayer.play(Tonyu.globals.$se_shot);
                
              }
              //$LASTPOS=14000409;//user.Racket:409
              _this.avx=(Tonyu.globals.$ball.x-_this.x)/_this.d;
              //$LASTPOS=14000437;//user.Racket:437
              _this.avy=(Tonyu.globals.$ball.y-_this.y)/_this.d;
              //$LASTPOS=14000465;//user.Racket:465
              _this.spd=1;
              //$LASTPOS=14000481;//user.Racket:481
              if (_this.d<32) {
                //$LASTPOS=14000561;//user.Racket:561
                Tonyu.globals.$ball.x=_this.x+_this.avx*32;
                //$LASTPOS=14000592;//user.Racket:592
                Tonyu.globals.$ball.y=_this.y+_this.avy*32;
                //$LASTPOS=14000623;//user.Racket:623
                _this.spd=_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy)/2;
                
              }
              //$LASTPOS=14000696;//user.Racket:696
              Tonyu.globals.$ball.vx+=_this.avx*_this.spd+(_this.x-_this.px)*0.1;
              //$LASTPOS=14000735;//user.Racket:735
              Tonyu.globals.$ball.vy+=_this.avy*_this.spd+(_this.y-_this.py)*0.1;
              
            }
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    crashTo :function _trc_Racket_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000109;//user.Racket:109
      _this.d=_this.dist(t.x-_this.x,t.y-_this.y)+1;
      return (_this.d<(_this.dist(_this.x-_this.px,_this.y-_this.py)+_this.dist(Tonyu.globals.$ball.vx,Tonyu.globals.$ball.vy))/2+32);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"crashTo":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Replay',
  shortName: 'Replay',
  namespace: 'user',
  superclass: Tonyu.classes.user.TextChar,
  includes: [],
  methods: {
    main :function _trc_Replay_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000149;//user.Replay:149
      _this.setVisible(0);
      //$LASTPOS=15000165;//user.Replay:165
      _this.cnt=0;
      //$LASTPOS=15000173;//user.Replay:173
      while (1) {
        //$LASTPOS=15000190;//user.Replay:190
        _this.cnt--;
        //$LASTPOS=15000202;//user.Replay:202
        if (_this.cnt==0) {
          //$LASTPOS=15000225;//user.Replay:225
          _this.replay();
          
        }
        //$LASTPOS=15000247;//user.Replay:247
        _this.update();
        
      }
    },
    fiber$main :function _trc_Replay_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Replay_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000149;//user.Replay:149
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=15000165;//user.Replay:165
            _this.cnt=0;
            //$LASTPOS=15000173;//user.Replay:173
          case 2:
            if (!(1)) { __pc=6; break; }
            //$LASTPOS=15000190;//user.Replay:190
            _this.cnt--;
            //$LASTPOS=15000202;//user.Replay:202
            if (!(_this.cnt==0)) { __pc=4; break; }
            //$LASTPOS=15000225;//user.Replay:225
            _this.fiber$replay(_thread);
            __pc=3;return;
          case 3:
            
          case 4:
            
            //$LASTPOS=15000247;//user.Replay:247
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onMouseDown :function _trc_Replay_onMouseDown() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000096;//user.Replay:96
      if (! Tonyu.globals.$_design_Mode) {
        //$LASTPOS=15000126;//user.Replay:126
        _this.replay();
        
      }
    },
    fiber$onMouseDown :function _trc_Replay_f_onMouseDown(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Replay_ent_onMouseDown(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000096;//user.Replay:96
            if (!(! Tonyu.globals.$_design_Mode)) { __pc=2; break; }
            //$LASTPOS=15000126;//user.Replay:126
            _this.fiber$replay(_thread);
            __pc=1;return;
          case 1:
            
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    show :function _trc_Replay_show() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000286;//user.Replay:286
      _this.setVisible(1);
      //$LASTPOS=15000306;//user.Replay:306
      _this.cnt=600;
    },
    replay :function _trc_Replay_replay() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000344;//user.Replay:344
      Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=15000386;//user.Replay:386
      Tonyu.globals.$tokuten.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=15000426;//user.Replay:426
      Tonyu.globals.$ball.notify();
      //$LASTPOS=15000447;//user.Replay:447
      _this.cnt=0;
      //$LASTPOS=15000459;//user.Replay:459
      _this.setVisible(0);
    },
    fiber$replay :function _trc_Replay_f_replay(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000344;//user.Replay:344
      Tonyu.globals.$tokuten_1.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=15000386;//user.Replay:386
      Tonyu.globals.$tokuten.setValue(Tonyu.globals.$pat_tokuten+0);
      //$LASTPOS=15000426;//user.Replay:426
      Tonyu.globals.$ball.notify();
      //$LASTPOS=15000447;//user.Replay:447
      _this.cnt=0;
      
      _thread.enter(function _trc_Replay_ent_replay(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000459;//user.Replay:459
            _this.fiber$setVisible(_thread, 0);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onMouseDown":{"nowait":false},"show":{"nowait":true},"replay":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Tokuten',
  shortName: 'Tokuten',
  namespace: 'user',
  superclass: Tonyu.classes.user.DxChar,
  includes: [],
  methods: {
    main :function _trc_Tokuten_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000121;//user.Tokuten:121
      _this.value=_this.p;
      //$LASTPOS=16000133;//user.Tokuten:133
      while (1) {
        //$LASTPOS=16000150;//user.Tokuten:150
        _this.wait();
        //$LASTPOS=16000214;//user.Tokuten:214
        while (_this.scaleY>0.1) {
          //$LASTPOS=16000244;//user.Tokuten:244
          _this.scaleY=_this.scaleY*0.8;
          //$LASTPOS=16000272;//user.Tokuten:272
          _this.update();
          
        }
        //$LASTPOS=16000313;//user.Tokuten:313
        _this.p=_this.value;
        //$LASTPOS=16000327;//user.Tokuten:327
        while (_this.scaleY<1) {
          //$LASTPOS=16000355;//user.Tokuten:355
          _this.scaleY=_this.scaleY*1.5;
          //$LASTPOS=16000383;//user.Tokuten:383
          _this.update();
          
        }
        //$LASTPOS=16000405;//user.Tokuten:405
        _this.scaleY=1;
        
      }
    },
    fiber$main :function _trc_Tokuten_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000121;//user.Tokuten:121
      _this.value=_this.p;
      
      _thread.enter(function _trc_Tokuten_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=16000133;//user.Tokuten:133
          case 1:
            if (!(1)) { __pc=9; break; }
            //$LASTPOS=16000150;//user.Tokuten:150
            _this.fiber$wait(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=16000214;//user.Tokuten:214
          case 3:
            if (!(_this.scaleY>0.1)) { __pc=5; break; }
            //$LASTPOS=16000244;//user.Tokuten:244
            _this.scaleY=_this.scaleY*0.8;
            //$LASTPOS=16000272;//user.Tokuten:272
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=3;break;
          case 5:
            
            //$LASTPOS=16000313;//user.Tokuten:313
            _this.p=_this.value;
            //$LASTPOS=16000327;//user.Tokuten:327
          case 6:
            if (!(_this.scaleY<1)) { __pc=8; break; }
            //$LASTPOS=16000355;//user.Tokuten:355
            _this.scaleY=_this.scaleY*1.5;
            //$LASTPOS=16000383;//user.Tokuten:383
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8:
            
            //$LASTPOS=16000405;//user.Tokuten:405
            _this.scaleY=1;
            __pc=1;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setValue :function _trc_Tokuten_setValue(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000099;//user.Tokuten:99
      _this.value=v;
      //$LASTPOS=16000107;//user.Tokuten:107
      _this.notify();
    },
    fiber$setValue :function _trc_Tokuten_f_setValue(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000099;//user.Tokuten:99
      _this.value=v;
      
      _thread.enter(function _trc_Tokuten_ent_setValue(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=16000107;//user.Tokuten:107
            _this.fiber$notify(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setValue":{"nowait":false}}}
});
