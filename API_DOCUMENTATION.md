# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### 1. Sign Up
Creates a new user account with reCAPTCHA verification.

**Endpoint:**
```
POST /auth/signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "captchaToken": "token_from_recaptcha"
}
```

**Response (201 - Created):**
```json
{
  "message": "User created successfully"
}
```

**Response (400 - Bad Request):**
```json
{
  "message": "All fields are required"
}
```

**Response (409 - Conflict):**
```json
{
  "message": "Email already exists"
}
```

**Response (500 - Server Error):**
```json
{
  "message": "Internal server error"
}
```

---

### 2. Login
Authenticates a user and returns a JWT token.

**Endpoint:**
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "captchaToken": "token_from_recaptcha"
}
```

**Response (200 - OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Response (401 - Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

**Response (400 - Bad Request):**
```json
{
  "message": "Email and password are required"
}
```

---

## Resume Endpoints

### 3. Create Resume
Creates a new resume for the authenticated user.

**Endpoint:**
```
POST /resumes
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Senior Developer Resume",
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "location": "New York, USA",
    "summary": "Experienced full-stack developer with 5+ years..."
  },
  "professionalSummary": "Professional summary text here",
  "experience": [
    {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "startDate": "2021-01",
      "endDate": "2023-12",
      "description": "Led development of..."
    }
  ],
  "education": [
    {
      "institution": "MIT",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "year": "2019"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "MySQL"],
  "certifications": [
    {
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "year": "2022"
    }
  ],
  "projects": [
    {
      "name": "E-Commerce Platform",
      "description": "Built a full-stack e-commerce platform...",
      "link": "https://github.com/user/project"
    }
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "Fluent"
    }
  ]
}
```

**Response (201 - Created):**
```json
{
  "message": "Resume created successfully",
  "resumeId": 42
}
```

**Response (400 - Bad Request):**
```json
{
  "message": "Title and personal info are required"
}
```

**Response (401 - Unauthorized):**
```json
{
  "message": "No token provided"
}
```

**Response (403 - Forbidden):**
```json
{
  "message": "Invalid or expired token"
}
```

---

### 4. Get All Resumes
Retrieves all resumes for the authenticated user.

**Endpoint:**
```
GET /resumes
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 - OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Senior Developer Resume",
    "personal_info": {...},
    "experience": [...],
    "education": [...],
    "skills": [...],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "title": "Full Stack Developer Resume",
    "personal_info": {...},
    ...
  }
]
```

**Response (401 - Unauthorized):**
```json
{
  "message": "No token provided"
}
```

---

### 5. Get Specific Resume
Retrieves a single resume by ID.

**Endpoint:**
```
GET /resumes/:id
```

**Parameters:**
- `id` (required): Resume ID

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 - OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "Senior Developer Resume",
  "personal_info": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "location": "New York, USA",
    "summary": "Experienced full-stack developer..."
  },
  "experience": [...],
  "education": [...],
  "skills": ["JavaScript", "React", "Node.js"],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Response (404 - Not Found):**
```json
{
  "message": "Resume not found"
}
```

**Response (401 - Unauthorized):**
```json
{
  "message": "No token provided"
}
```

---

### 6. Update Resume
Updates an existing resume.

**Endpoint:**
```
PUT /resumes/:id
```

**Parameters:**
- `id` (required): Resume ID

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Resume Title",
  "personalInfo": {...},
  "experience": [...],
  "education": [...],
  "skills": [...],
  "certifications": [...],
  "projects": [...],
  "languages": [...]
}
```

**Response (200 - OK):**
```json
{
  "message": "Resume updated successfully"
}
```

**Response (404 - Not Found):**
```json
{
  "message": "Resume not found"
}
```

**Response (401 - Unauthorized):**
```json
{
  "message": "No token provided"
}
```

---

### 7. Delete Resume
Deletes a resume permanently.

**Endpoint:**
```
DELETE /resumes/:id
```

**Parameters:**
- `id` (required): Resume ID

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 - OK):**
```json
{
  "message": "Resume deleted successfully"
}
```

**Response (404 - Not Found):**
```json
{
  "message": "Resume not found"
}
```

**Response (401 - Unauthorized):**
```json
{
  "message": "No token provided"
}
```

---

## Error Handling

### Error Response Format
All error responses follow this format:

```json
{
  "message": "Description of the error"
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successfully retrieved/updated data |
| 201 | Created | Successfully created new resource |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | No valid token provided |
| 403 | Forbidden | Invalid or expired token |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already exists (signup) |
| 500 | Server Error | Database or server error |

---

## Request Examples

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe",
    "captchaToken": "token"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "captchaToken": "token"
  }'
```

**Get All Resumes:**
```bash
curl -X GET http://localhost:5000/api/resumes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Create Resume:**
```bash
curl -X POST http://localhost:5000/api/resumes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Resume",
    "personalInfo": {...}
  }'
```

### Using JavaScript (Fetch API)

```javascript
// Signup
fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123',
    firstName: 'John',
    lastName: 'Doe',
    captchaToken: 'token'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Get Resumes
fetch('http://localhost:5000/api/resumes', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### Using Axios (As in Frontend)

```javascript
import axios from 'axios';

// Signup
axios.post('http://localhost:5000/api/auth/signup', {
  email: 'user@example.com',
  password: 'SecurePass123',
  firstName: 'John',
  lastName: 'Doe',
  captchaToken: 'token'
})
.then(response => console.log(response.data))
.catch(error => console.error(error));

// With token
const token = localStorage.getItem('token');
axios.get('http://localhost:5000/api/resumes', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

---

## Rate Limiting (Recommended for Production)

To prevent abuse, implement rate limiting:

```javascript
// Backend implementation (add to server.js)
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);
```

---

## Testing with Postman

1. **Create Collection** named "Resume Builder API"

2. **Add Signup Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/signup`
   - Body (JSON): Signup payload above

3. **Add Login Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON): Login payload above
   - Save token to variable: `token = {{response.body.token}}`

4. **Add Get Resumes Request:**
   - Method: GET
   - URL: `http://localhost:5000/api/resumes`
   - Headers: `Authorization: Bearer {{token}}`

5. **Test all endpoints** using this pattern

---

## Webhook Considerations (Future Feature)

For future integrations:

```javascript
// Example: Send webhook when resume is created
const webhookURL = 'https://external-service.com/webhook';

axios.post(webhookURL, {
  event: 'resume.created',
  resumeId: 42,
  userId: 1,
  timestamp: new Date()
})
.then(response => console.log('Webhook sent'))
.catch(error => console.error('Webhook failed'));
```

---

## Response Time Performance Targets

| Endpoint | Target | Note |
|----------|--------|------|
| Login | < 500ms | Includes bcrypt verification |
| Signup | < 500ms | Includes reCAPTCHA verification |
| Get Resumes | < 200ms | Database query |
| Create Resume | < 300ms | Database insert |
| Update Resume | < 300ms | Database update |
| Delete Resume | < 200ms | Database delete |

---

## API Version Strategy

Current version: v1.0.0

For future versions, use URL versioning:
```
/api/v2/resumes
/api/v2/auth/login
```

This allows:
- Backward compatibility
- Gradual migration
- Parallel versions

---

**Last Updated:** January 2024
**API Version:** 1.0.0
**Status:** ✅ Production Ready
