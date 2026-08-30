# Project Architecture & Overview

## 🎯 Project Summary

**Job Hunt Agent** is a full-stack web application designed to automate the job search and application process. It combines intelligent job matching algorithms with user-friendly interfaces to help job seekers find and apply for relevant positions across multiple job boards.

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                             │
│                    Port 5173 - Vite Dev Server                       │
│                                                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │  Dashboard  │  │ Job Search   │  │ Applications │  │ Resume   │ │
│  │   Page      │  │    Page      │  │    Page      │  │  Page    │ │
│  └─────────────┘  └──────────────┘  └──────────────┘  └──────────┘ │
│                                                                       │
│  State Management: Zustand (store.js)                               │
│  HTTP Client: Axios                                                  │
│  Routing: React Router v6                                            │
└─────────────────────────────────────────────────────────────────────┘
                              │
                    Axios HTTP Requests
                    (Baseurl: :5000/api)
                              │
┌─────────────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                         │
│                   Port 5000 - Express Server                         │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    API Routes                                   │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │ │
│  │  │  /auth   │  │ /resume  │  │  /jobs   │  │/applications │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Services Layer                             │  │
│  │  ┌──────────────────┐  ┌──────────────────────────────────┐  │  │
│  │  │ JobScraperService │  │ JobMatchingService              │  │  │
│  │  │  (Indeed, LinkedIn,│  │ (Calculate match score)        │  │  │
│  │  │   GitHub, Custom) │  │                                 │  │  │
│  │  └──────────────────┘  └──────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Models (Mongoose)                          │  │
│  │  ┌────────┐  ┌────────────┐  ┌──────┐  ┌─────────────────┐  │  │
│  │  │  User  │  │   Resume   │  │ Job  │  │  Application    │  │  │
│  │  └────────┘  └────────────┘  └──────┘  └─────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                        │
└─────────────────────────────────────────────────────────────────────┘
                              │
                   MongoDB Connection
                   (mongoose/Driver)
                              │
┌─────────────────────────────────────────────────────────────────────┐
│                         MongoDB Database                             │
│                  (Port 27017 - Local or Cloud)                       │
│                                                                       │
│  ┌────────┐  ┌────────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Users  │  │  Resumes   │  │   Jobs   │  │  Applications    │   │
│  │Collection│ │Collection  │  │Collection│  │  Collection      │   │
│  └────────┘  └────────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    External Services/APIs                            │
│  ┌────────────┐  ┌──────────┐  ┌────────┐  ┌──────────────────┐   │
│  │   Indeed   │  │ LinkedIn │  │ GitHub │  │   Custom Feeds   │   │
│  │    API     │  │    API   │  │  Jobs  │  │     (RSS/JSON)   │   │
│  └────────────┘  └──────────┘  └────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
job-hunt/
│
├── backend/                          # Node.js/Express API Server
│   ├── models/                      # Mongoose Schemas
│   │   ├── User.js                 # User model (auth, preferences)
│   │   ├── Resume.js               # Resume model (file storage)
│   │   ├── Job.js                  # Job model (job postings)
│   │   └── Application.js          # Application model (tracking)
│   │
│   ├── routes/                     # Express Route Handlers
│   │   ├── auth.js                # Authentication routes
│   │   ├── resume.js              # Resume upload/management
│   │   ├── jobs.js                # Job search & retrieval
│   │   └── applications.js        # Application tracking
│   │
│   ├── services/                  # Business Logic
│   │   ├── JobScraperService.js   # Job scraping from various sources
│   │   └── JobMatchingService.js  # Resume-job matching algorithm
│   │
│   ├── controllers/               # Request handlers (future)
│   ├── middleware/                # Custom middleware (future)
│   │
│   ├── server.js                  # Express server setup
│   ├── package.json               # Dependencies
│   ├── Dockerfile                 # Docker configuration
│   └── .env.example               # Environment template
│
├── frontend/                        # React Application
│   ├── src/
│   │   ├── pages/                 # Page Components
│   │   │   ├── LoginPage.jsx      # Login & authentication
│   │   │   ├── RegisterPage.jsx   # User registration
│   │   │   ├── DashboardPage.jsx  # Dashboard & overview
│   │   │   ├── JobSearchPage.jsx  # Job search interface
│   │   │   ├── ApplicationsPage.jsx # Application tracking
│   │   │   └── ResumePage.jsx     # Resume upload & management
│   │   │
│   │   ├── components/            # Reusable Components
│   │   │   ├── NavBar.jsx         # Navigation bar
│   │   │   └── JobCard.jsx        # Job listing card
│   │   │
│   │   ├── App.jsx                # Main app component
│   │   ├── store.js               # Zustand state management
│   │   ├── App.css                # Global styles
│   │   └── main.jsx               # React entry point
│   │
│   ├── index.html                 # HTML entry point
│   ├── vite.config.js             # Vite configuration
│   ├── package.json               # Dependencies
│   ├── Dockerfile                 # Docker configuration
│   └── .gitignore                 # Git ignore rules
│
├── docs/                           # Documentation
│   ├── QUICKSTART.md              # Quick start guide
│   ├── ARCHITECTURE.md            # Architecture documentation
│   ├── API_DOCS.md                # API documentation
│   └── DEPLOYMENT.md              # Deployment guide
│
├── README.md                       # Project overview
├── package.json                    # Root package.json (scripts)
├── docker-compose.yml              # Docker Compose configuration
├── .env.example                    # Environment template
└── .gitignore                      # Git ignore rules
```

## 🔄 Data Flow

### User Registration & Login
```
1. User submits registration form
   ↓
2. Frontend sends POST /api/auth/register
   ↓
3. Backend validates input & creates user
   ↓
4. JWT token generated and returned
   ↓
5. Token stored in localStorage
   ↓
6. User redirected to dashboard
```

### Resume Upload
```
1. User selects resume file
   ↓
2. Frontend sends multipart form data to POST /api/resume/upload
   ↓
3. Backend receives file with multer
   ↓
4. File saved to uploads/resumes/ directory
   ↓
5. Metadata stored in MongoDB (Resume collection)
   ↓
6. Resume ID returned to frontend
   ↓
7. UI updates with new resume
```

### Job Search & Matching
```
1. User submits search query (keyword, location, filters)
   ↓
2. Frontend sends GET /api/jobs/search with query params
   ↓
3. Backend queries MongoDB Job collection
   ↓
4. For each job, calculate match score using JobMatchingService
   ↓
5. Results sorted by match score
   ↓
6. Paginated results returned to frontend
   ↓
7. Jobs displayed in grid/list format
```

### Job Application
```
1. User clicks "Apply" on job card
   ↓
2. Frontend sends POST /api/applications with jobId & resumeId
   ↓
3. Backend creates Application record
   ↓
4. Application status set to "submitted"
   ↓
5. Application stored in MongoDB
   ↓
6. Frontend updates UI with confirmation
   ↓
7. Application appears in Applications page
```

### Application Tracking
```
1. User navigates to Applications page
   ↓
2. Frontend sends GET /api/applications (with optional status filter)
   ↓
3. Backend queries Application collection
   ↓
4. Populates job and resume details
   ↓
5. Results returned with pagination
   ↓
6. Frontend displays applications in table format
   ↓
7. User can update status via dropdown
   ↓
8. PATCH request sent to /api/applications/:id/status
   ↓
9. Backend updates application in database
   ↓
10. UI refreshes with new status
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Express validator for data validation
- **CORS**: Cross-Origin Resource Sharing configured
- **File Upload Validation**: Only PDF, DOC, DOCX files allowed
- **File Size Limits**: 5MB max file size by default

## 🚀 Key Features Implementation

### 1. Job Scraping (Services/JobScraperService.js)
- Indeed API integration
- LinkedIn scraping capability
- GitHub Jobs API integration
- Custom RSS feed support
- Results aggregation from multiple sources

### 2. Job Matching (Services/JobMatchingService.js)
- Skills matching (30% weight)
- Experience level matching (20% weight)
- Location matching (15% weight)
- Job type compatibility (15% weight)
- Salary acceptability (10% weight)
- Education matching (10% weight)
- Match score calculation (0-100)

### 3. Application Tracking
- Status tracking: draft, submitted, viewed, interview, offer, accepted
- Interview date scheduling
- Notes and feedback storage
- Offer details recording

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI library |
| | Vite | Build tool |
| | Zustand | State management |
| | React Router | Client-side routing |
| | Axios | HTTP client |
| | CSS | Styling |
| **Backend** | Node.js | Runtime |
| | Express | Web framework |
| | Mongoose | MongoDB ODM |
| | JWT | Authentication |
| | bcryptjs | Password hashing |
| | Multer | File uploads |
| | Puppeteer | Web scraping |
| **Database** | MongoDB | Document database |
| **Deployment** | Docker | Containerization |
| | Docker Compose | Multi-container orchestration |
| | Heroku/Railway/Render | Hosting options |

## 📊 Database Schema

### User Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  fullName: String,
  resume: ObjectId (ref: Resume),
  jobPreferences: {
    titles: [String],
    locations: [String],
    industries: [String],
    minSalary: Number,
    maxSalary: Number,
    jobTypes: [String]
  },
  linkedinProfile: String,
  githubProfile: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Collection
```javascript
{
  userId: ObjectId (required, ref: User),
  filename: String,
  filepath: String,
  filesize: Number,
  mimetype: String,
  extractedText: String,
  skills: [String],
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    graduationDate: Date
  }],
  languages: [String],
  certifications: [String],
  summary: String,
  isDefault: Boolean,
  uploadedAt: Date,
  updatedAt: Date
}
```

### Job Collection
```javascript
{
  source: String (enum: linkedin, indeed, github, custom),
  externalId: String,
  title: String,
  company: String,
  location: String,
  description: String,
  requirements: [String],
  salary: { min, max, currency },
  jobType: String (enum: full-time, part-time, contract, etc.),
  postedDate: Date,
  url: String,
  companyLogoUrl: String,
  skills: [String],
  level: String (enum: entry, mid, senior, lead, manager),
  industry: String,
  remoteStatus: String (enum: remote, hybrid, on-site),
  matchScore: Number (0-100),
  savedBy: [ObjectId] (ref: User),
  createdAt: Date
}
```

### Application Collection
```javascript
{
  userId: ObjectId (required, ref: User),
  jobId: ObjectId (required, ref: Job),
  resumeUsed: ObjectId (ref: Resume),
  status: String (enum: draft, submitted, viewed, interview, rejected, offer, accepted),
  appliedDate: Date,
  coverLetter: String,
  customizedAnswers: Map (String -> String),
  notes: String,
  followUpDate: Date,
  feedbackReceived: String,
  matchScore: Number,
  interviewDate: Date,
  interviewType: String,
  offerDetails: {
    salary: Number,
    currency: String,
    startDate: Date,
    benefits: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 API Endpoints Summary

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | /api/auth/register | Create account | ❌ |
| POST | /api/auth/login | Login | ❌ |
| GET | /api/auth/me | Get current user | ✅ |
| POST | /api/resume/upload | Upload resume | ✅ |
| GET | /api/resume | Get all resumes | ✅ |
| GET | /api/jobs/search | Search jobs | ✅ |
| GET | /api/jobs/recommended | Get recommendations | ✅ |
| POST | /api/jobs/:id/save | Save job | ✅ |
| POST | /api/applications | Create application | ✅ |
| GET | /api/applications | Get applications | ✅ |
| PATCH | /api/applications/:id/status | Update status | ✅ |
| GET | /api/applications/stats/summary | Get statistics | ✅ |

## 🚀 Next Steps & Future Enhancements

1. **AI Cover Letter Generation**: Use GPT to generate personalized cover letters
2. **Resume Optimization**: Suggest improvements based on job postings
3. **Email Notifications**: Send updates about applications
4. **Mobile App**: React Native mobile application
5. **LinkedIn Integration**: Direct LinkedIn account connection
6. **Calendar Integration**: Google Calendar sync for interviews
7. **Analytics Dashboard**: Advanced statistics and insights
8. **Bulk Operations**: Apply to multiple jobs at once
9. **AI Interview Prep**: Mock interview questions and preparation
10. **Salary Negotiation**: Negotiation guidance and market data
