define([],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    Assertion.prototype={
        fail:function () {
            var a=$a(arguments);
            a=flatten(a);
            a=this.failMesg.concat(a);
            console.log.apply(console,a);
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) this.fail(failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) this.fail(a,"!==",b);
            return a;
        },
        is: function (value,type) {
            var t=type,v=value;
            if (t==null) return t;
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    var na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    na.is(v[i],t[i]);
                }
                return value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    var na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return value;
            }
            this.fail("Invaild type: ",t);
        },
        ensureError: function (action, err) {
            try {
                action();
            } catch(e) {
                if(typeof err=="string") {
                    assert(e+""===err,action+" thrown an error "+e+" but expected:"+err);
                }
                console.log("Error thrown successfully: ",e.message);
                return;
            }
            this.fail(action,"should throw an error",err);
        }
    };
    /*var assert=function () {
      var a=assert.a(arguments);
      var t=a.shift();
      if (!t) assert.fail(a);
      return true;
   };*/
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion;
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.is=function () {
        try {
            return top.is.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.eq=function () {
        try {
            return top.eq.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.ensureError=function () {
        try {
            return top.ensureError.apply(top,arguments);
        } catch(e) {
            throw new Error(e.message);
        }
    };
    assert.fail=top.fail.bind(top);
    /*
   assert.fail=function () {
      var a=assert.a(arguments);
      a=flatten(a);
      a.unshift("Assertion failed: ");
      console.log.apply(console,a);
      throw new Error(a.join(" "));
   };
   assert.is=function (value, type, mesg) {
      var t=type,v=value;
      mesg=mesg||[];
      if (t==null) return true;
      assert(value!=null,mesg.concat([value, "should not be null/undef"]));
      if (t instanceof Array) {
          if (!value || typeof value.length!="number") {
              assert.fail(mesg.concat([value, "should be array:", type]));
          }
          t.forEach(function (te,i) {
              assert.is(value[i],te,mesg.concat(["failed at ",value,"[",i,"]: "]));
          });
          return;
      }
      if (t===String || t=="string") {
          return assert(typeof(v)=="string",
          mesg.concat([v,"should be string "]));
      }
      if (t===Number || t=="number") {
          return assert(typeof(v)=="number",
          mesg.concat([v,"should be number"]));
      }
      if (t instanceof Object) {
          for (var k in t) {
              assert.is(value[k],t[k],mesg.concat(["failed at ",value,".",k,":"]));
          }
          return true;
      }
      if (t._assert_func) {
          return t._assert_func(v,mesg);
      }
      return assert(v instanceof t,
      mesg.concat([v, "should be ",t]));
   };*/
    assert.f=function (f) {
        return {
            _assert_func: f
        };
    };
    assert.and=function () {
        var types=$a(arguments);
        assert(types instanceof Array);
        return assert.f(function (value) {
            var t=this;
            for (var i=0; i<types.length; i++) {
                t.is(value,types[i]);
            }
        });
    };
    function flatten(a) {
        if (a instanceof Array) {
            var res=[];
            a.forEach(function (e) {
                res=res.concat(flatten(e));
            });
            return res;
        }
        return [a];
    }
    function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };
    return assert;
});
