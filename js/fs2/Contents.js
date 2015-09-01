define(["DataURL"],function (DataURL){
   var Contents={
      convert: function (src, destType, options) {
         // options:{encoding: , contentType: }
         // src: String|DataURL|ArrayBuffer|OutputStream|Writer
         // destType: String|DataURL|ArrayBuffer|InputStream|Reader
         var srcType;
         if (typeof src=="string") srcType=String;
         if (src instanceof DataURL) srcType=DataURL;
         if (src instanceof ArrayBuffer) srcType=ArrayBuffer;
         if (srcType==destType) return src;
         throw new Error("Cannot convert from "+srcType+" to "+destType);
      }
   };
   return Contents;
});