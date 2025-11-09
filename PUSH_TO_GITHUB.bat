@echo off
echo ========================================
echo   SJ Nodes - Push to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Git status...
git status
echo.

echo Adding all files...
git add .
echo.

set /p commit_msg="Enter commit message: "
echo.

echo Committing changes...
git commit -m "%commit_msg%"
echo.

echo Setting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/princekop/Sj-web.git
echo.

echo Pushing to GitHub...
git branch -M main
git push -u origin main --force
echo.

echo ========================================
echo   Push Complete!
echo ========================================
echo.
pause
