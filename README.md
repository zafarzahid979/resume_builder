# Professional Resume Builder

A modern, full-stack web application for creating, managing, and exporting professional resumes with a sleek UI and robust functionality.

## Features

✅ **User Authentication**
- Secure signup and login with JWT tokens
- Human verification using Google reCAPTCHA
- Password visibility toggle for better UX
- Email validation and secure password hashing

✅ **Resume Management**
- Create, read, update, and delete resumes
- Store unlimited resumes per user
- Real-time form validation

✅ **Professional Resume Builder**
- Interactive form to collect comprehensive resume data:
  - Personal information
  - Professional summary
  - Work experience
  - Education
  - Skills
  - Certifications
  - Projects
  - Languages

✅ **Beautiful Resume Preview**
- Professional A4-sized resume template
- Modern, clean design
- Real-time preview while editing

✅ **Export Options**
- **Download as PDF** - High-quality PDF generation
- **Print** - Direct browser printing support
- Maintains formatting in all export formats

✅ **Responsive Design**
- Mobile-friendly interface
- Tablet and desktop optimized
- Works seamlessly across all devices

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **HTML2PDF** - PDF generation
- **React Google reCAPTCHA** - Human verification
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL Server
- XAMPP (if using local MySQL)

### Step 1: Database Setup

1. Open XAMPP Control Panel and start MySQL
2. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
3. Create a new database named `resume_builder`
4. Run the SQL schema:

```sql
-- Import the database schema from database/schema.sql
```

Or execute the commands in `/database/schema.sql` in phpMyAdmin.

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your database credentials:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=resume_builder
JWT_SECRET=your_jwt_secret_key_change_this_in_production
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Start backend server
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### Step 4: Google reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Copy your Site Key and Secret Key
4. Replace in frontend components and backend .env:
   - Frontend: Replace `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` with your Site Key
   - Backend: Add your Secret Key to `.env` file

## Project Structure

```
resume-builder/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resumeController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── captcha.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── resumeRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── components/
│   │   │   ├── ResumeForm.js
│   │   │   └── ResumePreview.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── SignUp.js
│   │   │   └── Dashboard.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── ResumeForm.css
│   │   │   └── ResumePreview.css
│   │   ├── App.js
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── database/
    └── schema.sql
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes` - Get all user's resumes
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Usage Guide

### Creating a Resume

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your dashboard
3. **Create Resume**: Click "Create New Resume"
4. **Fill Information**: Complete all sections:
   - Personal Information
   - Work Experience
   - Education
   - Skills
   - Certifications (Optional)
   - Projects (Optional)
   - Languages (Optional)
5. **Preview**: Click "Preview Resume" to see formatted output
6. **Export**: 
   - Download as PDF
   - Print directly
   - Save to database
7. **Manage**: Edit, delete, or create additional resumes from dashboard

### Features Explained

#### Password Toggle
- Click the eye icon to show/hide password while typing
- Works in both signup and login pages

#### reCAPTCHA Verification
- Prevents automated abuse
- Quick and non-intrusive verification
- Score-based validation on backend

#### A4 Resume Format
- Perfectly formatted for printing
- Professional appearance
- Optimized for single-page display

#### PDF Download
- High-quality PDF export
- Maintains all formatting
- Ready to send to employers

## Troubleshooting

### Backend Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running. Start XAMPP MySQL service.

### Database Connection Error
```
Error: Access denied for user 'root'@'localhost'
```
**Solution**: Update DB credentials in `.env` file.

### Frontend API Call Fails
```
Error: CORS policy error
```
**Solution**: Ensure backend is running on port 5000 and CORS is enabled.

### reCAPTCHA Error
```
Error: reCAPTCHA token verification failed
```
**Solution**: Verify Site Key and Secret Key are correct and configured properly.

## Security Best Practices

- ✅ Change `JWT_SECRET` and `RECAPTCHA_SECRET_KEY` in production
- ✅ Use HTTPS in production
- ✅ Implement rate limiting on authentication endpoints
- ✅ Use environment variables for sensitive data
- ✅ Regularly update dependencies
- ✅ Implement CSRF protection

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/dist/`

### Deploy Frontend
- Use Netlify, Vercel, AWS S3, or any static hosting
- Update API URLs in `src/api/axiosConfig.js` to production backend

### Deploy Backend
- Use Heroku, AWS EC2, DigitalOcean, or any Node.js hosting
- Set environment variables on hosting platform
- Ensure MySQL is accessible from hosting server

## Future Enhancements

- [ ] Multiple resume templates
- [ ] Real-time collaboration
- [ ] Resume sharing and viewing
- [ ] ATS optimization suggestions
- [ ] Cover letter builder
- [ ] Job application tracker
- [ ] LinkedIn integration
- [ ] Dark mode
- [ ] Mobile app (React Native)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact support.

---

**Happy Resume Building! 🚀**
