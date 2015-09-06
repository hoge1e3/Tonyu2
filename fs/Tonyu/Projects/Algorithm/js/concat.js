Tonyu.klass.define({
  fullName: 'user.ArrayView',
  shortName: 'ArrayView',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_ArrayView_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_ArrayView_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_ArrayView_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var x;
      var y;
      
      //$LASTPOS=45000015;//user.ArrayView:15
      c.fillStyle="white";
      //$LASTPOS=45000040;//user.ArrayView:40
      c.font="20px Monospace";
      //$LASTPOS=45000069;//user.ArrayView:69
      x = 200;y = 200;
      //$LASTPOS=45000090;//user.ArrayView:90
      if (_this.a) {
        //$LASTPOS=45000107;//user.ArrayView:107
        c.fillText(_this.a.join(", "),x,y);
        //$LASTPOS=45000146;//user.ArrayView:146
        c.fillText("V",x+_this.j*30,y-20);
        
      }
    },
    wait :function _trc_ArrayView_wait() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000198;//user.ArrayView:198
      _this.updateEx(30);
    },
    fiber$wait :function _trc_ArrayView_f_wait(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_ArrayView_ent_wait(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000198;//user.ArrayView:198
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true},"wait":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.user.ArrayView,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000019;//user.Main:19
      _this.a=[5,2,30,1,10,5,- 4];
      //$LASTPOS=46000042;//user.Main:42
      //$LASTPOS=46000047;//user.Main:47
      _this.i=0;
      while(_this.i<_this.a.length) {
        {
          //$LASTPOS=46000074;//user.Main:74
          //$LASTPOS=46000079;//user.Main:79
          _this.j=0;
          while(_this.j<_this.a.length-1-_this.i) {
            {
              //$LASTPOS=46000116;//user.Main:116
              if (_this.a[_this.j]>_this.a[_this.j+1]) {
                //$LASTPOS=46000147;//user.Main:147
                _this.wait();
                //$LASTPOS=46000167;//user.Main:167
                _this.t=_this.a[_this.j];
                //$LASTPOS=46000187;//user.Main:187
                _this.a[_this.j]=_this.a[_this.j+1];
                //$LASTPOS=46000212;//user.Main:212
                _this.a[_this.j+1]=_this.t;
                
              }
              //$LASTPOS=46000240;//user.Main:240
              _this.wait();
            }
            _this.j++;
          }
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000019;//user.Main:19
      _this.a=[5,2,30,1,10,5,- 4];
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000042;//user.Main:42
            //$LASTPOS=46000047;//user.Main:47
            _this.i=0;;
          case 1:
            if (!(_this.i<_this.a.length)) { __pc=7; break; }
            //$LASTPOS=46000074;//user.Main:74
            //$LASTPOS=46000079;//user.Main:79
            _this.j=0;;
          case 2:
            if (!(_this.j<_this.a.length-1-_this.i)) { __pc=6; break; }
            //$LASTPOS=46000116;//user.Main:116
            if (!(_this.a[_this.j]>_this.a[_this.j+1])) { __pc=4; break; }
            //$LASTPOS=46000147;//user.Main:147
            _this.fiber$wait(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=46000167;//user.Main:167
            _this.t=_this.a[_this.j];
            //$LASTPOS=46000187;//user.Main:187
            _this.a[_this.j]=_this.a[_this.j+1];
            //$LASTPOS=46000212;//user.Main:212
            _this.a[_this.j+1]=_this.t;
          case 4:
            
            //$LASTPOS=46000240;//user.Main:240
            _this.fiber$wait(_thread);
            __pc=5;return;
          case 5:
            
            _this.j++;
            __pc=2;break;
          case 6:
            
            _this.i++;
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
