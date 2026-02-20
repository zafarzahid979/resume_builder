@echo off
REM Resume Builder Installation Script for Windows
REM This script automates the setup process

echo.
echo ========================================
echo   RESUME BUILDER - SETUP WIZARD
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js is installed
node --version
npm --version

echo.
echo ========================================
echo   STEP 1: Backend Setup
echo ========================================
echo.

cd /d "%~dp0backend"
echo Installing backend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✓ Backend dependencies installed

echo.
echo ========================================
echo   STEP 2: Frontend Setup
echo ========================================
echo.

cd /d "%~dp0frontend"
echo Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✓ Frontend dependencies installed

echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Start MySQL in XAMPP
echo 2. Create database "resume_builder" in phpMyAdmin
echo 3. Run SQL schema from database\schema.sql
echo.
echo 4. Update backend/.env with your database credentials
echo 5. Update reCAPTCHA keys in .env and signup/login pages
echo.
echo 6. Start Backend:
echo    cd backend
echo    npm start
echo.
echo 7. Start Frontend (new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 8. Open http://localhost:3000 in your browser
echo.
echo ========================================
echo.
pause
