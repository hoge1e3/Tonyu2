:begin

cd /d %~dp0
rem cd ..\www\js

rem del ..\g2\runScript2_concat.js
rem -o is option, not output
call r_js -o run2_build.js
rem call r_js -o run1_build.js

pause
goto begin
