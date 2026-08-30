# 🎯 Job Hunt Agent - Complete Setup Guide

## Welcome! 👋

You now have a complete full-stack job application automation agent! This document will help you get everything up and running.

## 📦 What's Included

Your Job Hunt Agent includes:

### ✅ Complete Backend (Node.js/Express)
- **User Authentication**: JWT-based secure login/registration
- **Resume Management**: Upload and organize multiple resumes
- **Job Search API**: Search and filter jobs from multiple sources
- **Application Tracking**: Track your job applications with status updates
- **Job Matching Service**: Intelligent algorithm to match jobs with your resume
- **Job Scraping Service**: Framework for scraping Indeed, LinkedIn, GitHub Jobs

### ✅ Complete Frontend (React)
- **Modern UI**: Beautiful, responsive interface
- **Dashboard**: Overview of your job search progress
- **Job Search**: Advanced filtering and search capabilities
- **Application Management**: Track all your applications
- **Resume Upload**: Easy resume management
- **State Management**: Zustand for smooth data management

### ✅ Database (MongoDB)
- **Secure Data Storage**: All your data safely stored
- **Scalable Schema**: Ready for future enhancements
- **Indexed Queries**: Fast data retrieval

### ✅ DevOps Ready
- **Docker Support**: Containerized deployment
- **Docker Compose**: Easy multi-service orchestration
- **Environment Configuration**: Flexible configuration system

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies

```bash
# Navigate to project root
cd /workspaces/job-hunt

# Install all dependencies at once
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and set these minimum values:
# MONGODB_URI=mongodb://localhost:27017/job-hunt
# JWT_SECRET=any-random-string-for-dev
```

### 3. Start Services

**Option A: Using npm scripts (recommended)**

```bash
# Terminal 1: Install & start backend
cd backend && npm run dev

# Terminal 2: Install & start frontend  
cd frontend && npm run dev

# Both will be running:
# Backend: http://localhost:5000
# Frontend: http://localhost:5173
```

**Option B: Using Docker**

```bash
# Requires Docker and Docker Compose installed
docker-compose up
```

### 4. Access Application

Open your browser and go to: **http://localhost:5173**

## 📋 First Steps After Login

1. **Create Account**: Register with email/password
2. **Upload Resume**: Go to Resume page and upload your resume (PDF, DOC, DOCX)
3. **Search Jobs**: Try searching for jobs with keywords like "Software Engineer"
4. **Apply to Jobs**: Click "Apply" on jobs you're interested in
5. **Track Applications**: Go to Applications page to monitor progress

## 🔧 Detailed Setup Guide

### Prerequisites

Make sure you have installed:
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MongoDB** v4.4 or higher 
  - Option 1: [Local MongoDB](https://docs.mongodb.com/manual/installation/)
  - Option 2: [MongoDB Atlas (Cloud)](https://www.mongodb.com/cloud/atlas)
- **Git** for version control

### Backend Setup (Detailed)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from parent .env)
# Add these variables:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-hunt
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
RESUME_UPLOAD_PATH=./uploads/resumes

# Start development server with hot reload
npm run dev

# Server will start on http://localhost:5000
```

### Frontend Setup (Detailed)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file if needed
# VITE_API_URL=http://localhost:5000

# Start development server with hot reload
npm run dev

# Server will start on http://localhost:5173
```

### MongoDB Setup

#### Option 1: Local MongoDB (macOS/Linux)

```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongo --version

# Your MongoDB URI:
MONGODB_URI=mongodb://localhost:27017/job-hunt
```

#### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string
5. Add to .env: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-hunt`

## 📚 Project Structure Breakdown

### Backend Routes

```
POST   /api/auth/register      → Create new account
POST   /api/auth/login         → Login to account
GET    /api/auth/me            → Get current user

POST   /api/resume/upload      → Upload resume file
GET    /api/resume             → Get all your resumes
GET    /api/resume/:id         → Get specific resume
PUT    /api/resume/:id         → Update resume info
DELETE /api/resume/:id         → Delete resume

GET    /api/jobs/search        → Search for jobs
GET    /api/jobs/recommended   → Get job recommendations
GET    /api/jobs/:id           → Get job details
POST   /api/jobs/:id/save      → Save job to wishlist

POST   /api/applications       → Apply for job
GET    /api/applications       → Get your applications
GET    /api/applications/:id   → Get application details
PATCH  /api/applications/:id   → Update application
GET    /api/applications/stats → Get statistics
```

### Frontend Pages

```
/              → Dashboard (overview)
/login         → Login page
/register      → Registration page
/resume        → Resume management
/jobs          → Job search
/applications  → Application tracking
```

## 🔍 Features Explained

### 1. Resume Upload
- Upload PDFs, DOC, DOCX files
- Store metadata (upload date, file size)
- Set default resume
- Manage multiple resumes

### 2. Job Search
- Filter by keyword, location, job type
- Remote/hybrid/on-site filtering
- Advanced search with multiple filters
- View job details and requirements

### 3. Job Matching Algorithm
The system calculates match scores based on:
- Skills match (30%)
- Experience level (20%)
- Location (15%)
- Job type (15%)
- Salary expectations (10%)
- Education (10%)

**Score Interpretation:**
- 80-100: Excellent match
- 60-79: Good match
- 40-59: Fair match
- 0-39: Poor match

### 4. Application Tracking
Track applications through stages:
- **Draft**: Application created but not submitted
- **Submitted**: Application sent
- **Viewed**: Recruiter viewed your application
- **Interview**: Interview scheduled/in progress
- **Offer**: Job offer received
- **Accepted**: You accepted the offer
- **Rejected**: Application rejected

### 5. Dashboard Analytics
- Total applications submitted
- Current interview count
- Offer count
- Rejection tracking

## 🛠️ Configuration Options

### Environment Variables (.env)

```bash
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/job-hunt

# Authentication
JWT_SECRET=your-secret-key

# File Upload
RESUME_UPLOAD_PATH=./uploads/resumes
MAX_UPLOAD_SIZE=5242880

# API Keys (Optional - for job scraping)
INDEED_API_KEY=
LINKEDIN_EMAIL=
LINKEDIN_PASSWORD=
GITHUB_TOKEN=

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Frontend
FRONTEND_URL=http://localhost:5173
```

## 🐛 Troubleshooting

### Issue: "Cannot find module"

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: MongoDB connection error

```bash
# Check MongoDB is running
mongod

# Or check MongoDB Atlas connection string
# Make sure IP whitelist includes your IP
```

### Issue: Port 5000 already in use

```bash
# Find process using port
lsof -i :5000

# Kill the process (get PID from above)
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Issue: Frontend won't connect to backend

```bash
# Check backend is running on :5000
# Check FRONTEND_URL in backend .env
# Check firewall settings
```

## 📦 Deployment

### Deploy Backend

**Option 1: Heroku**

```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Option 2: Railway.app**

```bash
# Create account at railway.app
# Connect GitHub repository
# Deploy from dashboard
```

### Deploy Frontend

**Option 1: Vercel**

```bash
npm i -g vercel
vercel
```

**Option 2: Netlify**

```bash
npm run build
# Drag and drop dist/ folder to netlify.com
```

## 🚀 Next Steps

1. **Customize UI**: Update colors and branding in `frontend/src/App.css`
2. **Add Job APIs**: Implement actual API calls in `JobScraperService.js`
3. **Enable Scraping**: Set up Puppeteer for web scraping
4. **Add Email**: Configure SMTP for notifications
5. **Deploy**: Push to production
6. **Scale Up**: Add more features and optimizations

## 📖 Documentation Files

- **README.md** - Project overview and features
- **QUICKSTART.md** - 5-minute quick start
- **ARCHITECTURE.md** - Technical architecture
- **API_DOCS.md** (to create) - Detailed API documentation
- **DEPLOYMENT.md** (to create) - Deployment guide

## 🤝 Contributing

Want to add features? Here's how:

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test
3. Commit with clear messages: `git commit -m "Add feature X"`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request

## 📞 Support & Help

- Check error messages in terminal
- Review MongoDB logs
- Check browser console (F12)
- Review this guide's troubleshooting section
- Raise an issue on GitHub

## 🎉 Success Checklist

After setup, you should have:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can create account and login
- [ ] Can upload resume
- [ ] Can search for jobs
- [ ] Can apply to jobs
- [ ] Can view applications
- [ ] Match scores showing for jobs

## 🏆 You're All Set!

Your Job Hunt Agent is ready to help you land your dream job! 

Start by:
1. Creating your account
2. Uploading your resume
3. Searching for jobs
4. Applying to positions

**Good luck with your job search! 🚀**

---

For questions or issues, refer to the documentation files or GitHub issues.
