:begin

cd /d %~dp0
cd ..\www\js

del gen\runScript3_concat.js
call r_js -o build_senv.js

pause
goto begin
