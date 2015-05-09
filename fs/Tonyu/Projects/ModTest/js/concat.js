Tonyu.klass.define({
  fullName: 'user.A',
  shortName: 'A',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_A_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_A_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    a :function _trc_A_a() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000012;//user.A:12
      _this.print("A");
      //$LASTPOS=40000023;//user.A:23
      _this.updateEx(30);
      //$LASTPOS=40000036;//user.A:36
      _this.print("A");
    },
    fiber$a :function _trc_A_f_a(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000012;//user.A:12
      _this.print("A");
      
      _thread.enter(function _trc_A_ent_a(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000023;//user.A:23
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40000036;//user.A:36
            _this.print("A");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"a":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.B',
  shortName: 'B',
  namespace: 'user',
  superclass: Tonyu.classes.user.A,
  includes: [],
  methods: {
    main :function _trc_B_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_B_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    b :function _trc_B_b() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000023;//user.B:23
      _this.print("B");
      //$LASTPOS=41000034;//user.B:34
      _this.updateEx(30);
      //$LASTPOS=41000047;//user.B:47
      _this.print("B");
    },
    fiber$b :function _trc_B_f_b(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000023;//user.B:23
      _this.print("B");
      
      _thread.enter(function _trc_B_ent_b(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000034;//user.B:34
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=41000047;//user.B:47
            _this.print("B");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"b":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.C',
  shortName: 'C',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.user.B],
  methods: {
    main :function _trc_C_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000092;//user.C:92
      _this.b();
      //$LASTPOS=42000105;//user.C:105
      _this.print(_this.getClassInfo().fullName);
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
            //$LASTPOS=42000092;//user.C:92
            _this.fiber$b(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=42000105;//user.C:105
            _this.print(_this.getClassInfo().fullName);
            _thread.exit(_this);return;
          }
        }
      });
    },
    b :function _trc_C_b() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      function test() {
        
        //$LASTPOS=42000061;//user.C:61
        _this.print("test");
      }
      //$LASTPOS=42000024;//user.C:24
      _this.print("C::B");
      
    },
    fiber$b :function _trc_C_f_b(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      function test() {
        
        //$LASTPOS=42000061;//user.C:61
        _this.print("test");
      }
      //$LASTPOS=42000024;//user.C:24
      _this.print("C::B");
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"b":{"nowait":false}}}
});
