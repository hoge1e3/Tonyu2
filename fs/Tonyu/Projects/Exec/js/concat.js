Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var spawn;
      var grep;
      
      //$LASTPOS=1000016;//user.Main:16
      spawn = require("child_process").spawn;
      //$LASTPOS=1000058;//user.Main:58
      grep = spawn("grep",["ssh"]);
      //$LASTPOS=1000090;//user.Main:90
      _this.print("pid "+grep.pid);
      //$LASTPOS=1000114;//user.Main:114
      grep.stdin.end();
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var spawn;
      var grep;
      
      //$LASTPOS=1000016;//user.Main:16
      spawn = require("child_process").spawn;
      //$LASTPOS=1000058;//user.Main:58
      grep = spawn("grep",["ssh"]);
      //$LASTPOS=1000090;//user.Main:90
      _this.print("pid "+grep.pid);
      //$LASTPOS=1000114;//user.Main:114
      grep.stdin.end();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
