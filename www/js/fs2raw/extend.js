define([],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];} 
   };
});
