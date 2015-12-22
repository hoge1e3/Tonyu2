define(["Class"], function (Class) {
    var ArrayValueIterator=Class({
        initialize: function ArrayValueIterator(set) {
            this.set=set;
            this.i=0;
        },
        next:function () {
            if (this.i>=this.set.length) return false;
            this[0]=this.set[this.i];
            this.i++;
            return true;
        }
    });
    var ArrayKeyValueIterator=Class({
        initialize: function ArrayKeyValueIterator(set) {
            this.set=set;
            this.i=0;
        },
        next:function () {
            if (this.i>=this.set.length) return false;
            this[0]=this.i;
            this[1]=this.set[this.i];
            this.i++;
            return true;
        }
    });
    var ObjectKeyIterator=Class({
        initialize: function ObjectKeyIterator(set) {
            this.elems=[];
            for (var k in set) {
                this.elems.push(k);
            }
            this.i=0;
        },
        next:function () {
            if (this.i>=this.elems.length) return false;
            this[0]=this.elems[this.i];
            this.i++;
            return true;
        }
    });
    var ObjectKeyValueIterator=Class({
        initialize: function ObjectKeyValueIterator(set) {
            this.elems=[];
            for (var k in set) {
                this.elems.push([k,set[k]]);
            }
            this.i=0;
        },
        next:function () {
            if (this.i>=this.elems.length) return false;
            this[0]=this.elems[this.i][0];
            this[1]=this.elems[this.i][1];
            this.i++;
            return true;
        }
    });


    function IT(set, arity) {
        //var res={};
       if (set.tonyuIterator) {
    	   return set.tonyuIterator(arity);
       } else if (set instanceof Array) {
           //res.i=0;
           if (arity==1) {
               return new ArrayValueIterator(set);
               /*res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=set[res.i];
                   res.i++;
                   return true;
               };*/
           } else {
               return new ArrayKeyValueIterator(set);
               /*res.next=function () {
                   if (res.i>=set.length) return false;
                   this[0]=res.i;
                   this[1]=set[res.i];
                   res.i++;
                   return true;
               };*/
           }
       } else if (set instanceof Object){
           //res.i=0;
           //var elems=[];
           if (arity==1) {
               return new ObjectKeyIterator(set);
               /*for (var k in set) {
                   elems.push(k);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i];
                   res.i++;
                   return true;
               };*/
           } else {
               return new ObjectKeyValueIterator(set);
               /*for (var k in set) {
                   elems.push([k, set[k]]);
               }
               res.next=function () {
                   if (res.i>=elems.length) return false;
                   this[0]=elems[res.i][0];
                   this[1]=elems[res.i][1];
                   res.i++;
                   return true;
               };*/
           }
       } else {
           console.log(set);
           throw new Error(set+" is not iterable");
       }
       return res;
   }

//   Tonyu.iterator=IT;
    return IT;
});