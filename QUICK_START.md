# Quick Start Guide - Professional Resume Builder

## 🚀 Getting Started in 5 Minutes

### What You'll Need
- Node.js (download from nodejs.org)
- XAMPP with MySQL
- A code editor (VS Code recommended)
- A modern web browser

---

## ⚡ Quick Setup

### 1. Start MySQL
- Open XAMPP Control Panel
- Click "Start" next to Apache (optional but recommended)
- Click "Start" next to MySQL

### 2. Create Database
- Go to http://localhost/phpmyadmin
- Click "New" or "Create database"
- Name it: `resume_builder`
- Click "Create"
- Copy all SQL from `database/schema.sql` and paste it in the SQL tab
- Click "Go" to create tables

### 3. Backend Setup (Terminal/Command Prompt)

```bash
# Navigate to backend folder
cd "C:\xampp\htdocs\resume builder\backend"

# Install packages
npm install

# Start server (keep this terminal open)
npm start
```

**Expected output:**
```
Server is running on port 5000
```

### 4. Frontend Setup (New Terminal/Command Prompt)

```bash
# Navigate to frontend folder
cd "C:\xampp\htdocs\resume builder\frontend"

# Install packages
npm install

# Start development server
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 5. Open in Browser
- Click the link or go to `http://localhost:3000`
- You're ready to test!

---

## 📝 Test the Application

### Test Account (Create One)
1. Click "Sign up"
2. Fill in details:
   - First Name: John
   - Last Name: Doe
   - Email: test@example.com
   - Password: Test@123
3. Complete reCAPTCHA
4. Click "Sign Up"

### Create a Resume
1. Click "Create New Resume"
2. Fill in all sections:
   - **Personal Info**: Your name, email, phone, location
   - **Experience**: Add your work history
   - **Education**: Add your qualifications
   - **Skills**: List your technical skills
   - **Optional**: Certifications, Projects, Languages
3. Click "Preview Resume"
4. Test features:
   - **Print**: Click print button
   - **Download PDF**: Click download button
   - **Save**: Click save button

---

## 🔧 Configuration

### Environment Variables (Important!)

**Backend `.env` file:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=resume_builder
JWT_SECRET=your_secret_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_key
NODE_ENV=development
```

**Google reCAPTCHA Setup (Optional for Testing)**
- For testing, the default test keys work fine
- For production:
  1. Go to https://www.google.com/recaptcha/admin
  2. Sign in with Google account
  3. Create new site (domain: localhost for testing)
  4. Copy Site Key and Secret Key
  5. Update in code

---

## 📁 File Structure Quick Reference

```
resume-builder/
├── backend/              ← Node.js server
│   ├── server.js         ← Main file
│   └── .env              ← Configuration
├── frontend/             ← React app
│   ├── src/
│   │   └── App.js        ← Main component
│   └── package.json      ← Dependencies
└── database/
    └── schema.sql        ← MySQL schema
```

---

## ✅ Feature Checklist

Your Resume Builder has:

- ✅ **Login & Signup** with email validation
- ✅ **reCAPTCHA** for bot prevention
- ✅ **Password Eye Button** to toggle visibility
- ✅ **Resume Form** with 8 sections
- ✅ **Resume Preview** on A4 size
- ✅ **PDF Download** button
- ✅ **Print** functionality
- ✅ **Responsive Design** (mobile, tablet, desktop)
- ✅ **Secure Authentication** with JWT tokens
- ✅ **Modern UI** with gradients and animations
- ✅ **Database** to save multiple resumes

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module 'mysql2/promise'"
**Fix:**
```bash
cd backend
npm install
```

### Issue: "Port 5000 already in use"
**Fix:** Change PORT in backend/.env to 5001 or close other apps

### Issue: "Localhost refused to connect"
**Fix:** Make sure both backend and frontend terminals show "running" or "ready"

### Issue: MySQL connection error
**Fix:** 
1. Check MySQL is running in XAMPP
2. Verify database name in .env matches
3. Check username/password (usually root/blank)

### Issue: reCAPTCHA error during signup
**Fix:** Make sure you're using the test keys provided in the code

---

## 🎨 Customization Tips

### Change Color Scheme
Edit `frontend/src/styles/*.css` files:
- Search for `#667eea` (main purple) to change primary color
- Search for `#764ba2` (secondary purple)

### Change Resume Template
Edit `frontend/src/components/ResumePreview.js`
- Modify `.resume-a4` section for layout
- Edit styles in `frontend/src/styles/ResumePreview.css`

### Add More Resume Sections
1. Add field to resume form in `ResumeForm.js`
2. Update backend database schema if needed
3. Add display section in `ResumePreview.js`

---

## 📱 Mobile Testing

### Test on Phone/Tablet
1. Find your computer's IP address
   - Windows: Open CMD, type `ipconfig`, look for IPv4
   - Mac: System Preferences > Network
2. On phone, go to: `http://YOUR_IP:3000`

---

## 🚀 Ready for Production?

Before deploying:

1. **Backend Security**
   - Change JWT_SECRET to strong random key
   - Change RECAPTCHA_SECRET_KEY
   - Use HTTPS only
   - Set NODE_ENV=production

2. **Frontend**
   - Run `npm run build` to optimize
   - Deploy `dist` folder to hosting

3. **Database**
   - Use managed database service (AWS RDS, etc.)
   - Regular backups
   - Use strong passwords

4. **Hosting Options**
   - Frontend: Netlify, Vercel, AWS S3
   - Backend: Heroku, AWS EC2, DigitalOcean
   - Database: AWS RDS, Google Cloud SQL

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Vite Documentation](https://vitejs.dev)

---

## 💡 Tips & Tricks

- **Auto-save**: Add auto-save after 30 seconds of typing
- **Templates**: Create multiple resume templates
- **Sharing**: Add resume sharing link feature
- **ATS Optimization**: Add keyword suggestions
- **Analytics**: Track which sections users fill most

---

## 🎓 Next Steps

1. ✅ Complete basic setup (you did this!)
2. 🔄 Test all features
3. 🎨 Customize colors and design
4. 🔐 Learn about backend authentication
5. 📦 Deploy to production
6. 🚀 Add new features!

---

**Happy coding! If you get stuck, check the troubleshooting section or the main README.md**

Need help? Create an issue in the repository! 🙏
