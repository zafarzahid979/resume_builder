#!/bin/bash
# Resume Builder Installation Script for Mac/Linux

echo ""
echo "========================================"
echo "   RESUME BUILDER - SETUP WIZARD"
echo "========================================"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v npm &> /dev/null; then
    echo ""
    echo "ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org"
    echo ""
    exit 1
fi

echo "✓ Node.js is installed"
node --version
npm --version

echo ""
echo "========================================"
echo "   STEP 1: Backend Setup"
echo "========================================"
echo ""

cd "$(dirname "$0")/backend" || exit
echo "Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi

echo "✓ Backend dependencies installed"

echo ""
echo "========================================"
echo "   STEP 2: Frontend Setup"
echo "========================================"
echo ""

cd "$(dirname "$0")/frontend" || exit
echo "Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi

echo "✓ Frontend dependencies installed"

echo ""
echo "========================================"
echo "   SETUP COMPLETE!"
echo "========================================"
echo ""
echo "Next Steps:"
echo ""
echo "1. Start MySQL (using XAMPP or Docker)"
echo "2. Create database 'resume_builder' in phpMyAdmin"
echo "3. Run SQL schema from database/schema.sql"
echo ""
echo "4. Update backend/.env with your database credentials"
echo "5. Update reCAPTCHA keys in .env and signup/login pages"
echo ""
echo "6. Start Backend:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "7. Start Frontend (new terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "8. Open http://localhost:3000 in your browser"
echo ""
echo "========================================"
echo ""
