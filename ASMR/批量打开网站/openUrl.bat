@echo off
set "file=urls.txt"
MODE con: COLS=25 LINES=31

if not exist "%file%" (
    echo 指定的文件 %file% 不存在。
    pause
    exit /b 1
)

for /f "usebackq delims=" %%a in ("%file%") do (
    start "" %%a
    echo downloading %%a ……
    set /p a=">======================="<nul
    for /l %%i in (1,1,25) do (
    set /p aa=<nul
    )
    for /l %%i in (1,1,25) do (
    set /p aa=^><nul
    ping 127.0.0.1 -n 2 >nul
    )
)






echo 所有网址已按照24*80秒间隔打开。
pause