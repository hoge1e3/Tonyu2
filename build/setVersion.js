/*global require*/
const fs=require("fs");
const ws="www/js/runtime/WebSite.js";
const txt=fs.readFileSync(ws,{encoding:"utf-8"});
const aft=txt.replace(/VER=([0-9]+)/,()=>`VER=${new Date().getTime()}`);
fs.writeFileSync(ws,aft);
