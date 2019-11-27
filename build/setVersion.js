/*global require*/
const fs=require("fs");
const ws="../www/js/runtime/WebSite.js";
const txt=fs.readSync(ws);
const aft=txt.replace(/VER=([0-9]+)/,()=>`VER=${new Date().getTime()}`);
fs.writeSync(ws,aft);
