@echo off
setlocal enabledelayedexpansion
for /d %%i in (*) do (
    set "count=0"
    for /d %%j in ("%%i\*") do (
        set /a count+=1
        set "subfolder=%%~nj"
    )
    if !count! equ 1 (
        set "beforename=%%~ni"
        echo %%~ni start with !beforename:~0,2!
        if "!beforename:~0,2!" equ "RJ" (
            
            set "newname=!beforename:~0,7!+!subfolder!"
            ren "%%i" "!newname!"
        )
    )
)