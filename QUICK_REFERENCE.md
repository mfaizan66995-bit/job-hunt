# 🎯 Job Hunt Agent - Quick Reference

## 📋 Essential Commands

### Installation
```bash
# Install all dependencies
npm run install-all

# Or separately
npm install                    # Root
cd backend && npm install     # Backend
cd frontend && npm install    # Frontend
```

### Development
```bash
# Start both servers (recommended)
npm run dev

# Or run separately
npm run backend              # Backend only
npm run frontend             # Frontend only

# In backend directory
npm run dev                  # Start with nodemon
npm start                    # Production start

# In frontend directory
npm run dev                  # Start dev server
npm run build                # Build for production
npm run preview              # Preview build
```

### Database
```bash
# Start MongoDB (local)
mongod

# Connect to MongoDB
mongo

# View databases
show dbs

# Use job-hunt database
use job-hunt

# View collections
show collections

# Query users
db.users.find()
```

### Docker
```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose build
```

---

## 🔗 URLs & Ports

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:5000 | 5000 |
| MongoDB | mongodb://localhost:27017 | 27017 |
| API Health | http://localhost:5000/api/health | - |

---

## 📝 Environment Variables

### Required
```
MONGODB_URI=mongodb://localhost:27017/job-hunt
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

### Optional
```
PORT=5000
NODE_ENV=development
INDEED_API_KEY=
LINKEDIN_EMAIL=
LINKEDIN_PASSWORD=
GITHUB_TOKEN=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

---

## 🔑 API Quick Reference

### Authentication
```
POST   /api/auth/register    {username, email, password, fullName}
POST   /api/auth/login       {email, password}
GET    /api/auth/me          (requires token)
```

### Resume
```
POST   /api/resume/upload    (multipart form-data)
GET    /api/resume           Get all resumes
GET    /api/resume/:id       Get specific resume
PUT    /api/resume/:id       Update resume info
DELETE /api/resume/:id       Delete resume
PATCH  /api/resume/:id/set-default
```

### Jobs
```
GET    /api/jobs/search?keyword=&location=&jobType=&remoteStatus=&page=
GET    /api/jobs/recommended
GET    /api/jobs/:id
POST   /api/jobs/:id/save    Save job
POST   /api/jobs/:id/unsave  Unsave job
GET    /api/jobs/saved/list  Get saved jobs
```

### Applications
```
POST   /api/applications              {jobId, resumeId, coverLetter, status}
GET    /api/applications?status=&page=
GET    /api/applications/:id
PATCH  /api/applications/:id/status   {status}
PATCH  /api/applications/:id          Update details
DELETE /api/applications/:id
GET    /api/applications/stats/summary
```

---

## 🗂️ Project Structure Quick Guide

```
Backend Routes:          Frontend Pages:         Database Models:
├── /api/auth           ├── /                   ├── User
├── /api/resume         ├── /login              ├── Resume
├── /api/jobs           ├── /register           ├── Job
└── /api/applications   ├── /jobs               └── Application
                        ├── /resume
                        ├── /applications
                        └── (NavBar component)
```

---

## 🚨 Troubleshooting Quick Tips

| Problem | Solution |
|---------|----------|
| MongoDB won't connect | Check `.env` MONGODB_URI, ensure mongod running |
| Port already in use | Change PORT in `.env` or kill process |
| Dependencies missing | Run `npm install` in respective directory |
| Frontend not loading | Check backend is running, check CORS |
| Upload failing | Check file type, size, permissions |
| Match score not showing | Ensure resume and job have skills defined |
| Authentication failing | Check JWT_SECRET matches, token expired? |
| Database full | Clean old test data, check disk space |

---

## 📂 File Locations

| What | Where |
|------|-------|
| Backend entry | `backend/server.js` |
| Frontend entry | `frontend/src/main.jsx` |
| State management | `frontend/src/store.js` |
| Styles | `frontend/src/App.css` |
| Environment config | `.env` (copy from `.env.example`) |
| Database schemas | `backend/models/` |
| API routes | `backend/routes/` |
| Business logic | `backend/services/` |
| Pages | `frontend/src/pages/` |
| Components | `frontend/src/components/` |

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET before production
- [ ] Update MONGO_PASSWORD if using auth
- [ ] Enable CORS only for trusted domains
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Sanitize file uploads
- [ ] Set appropriate CORS headers
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add request logging

---

## 🧪 Testing Quick Guide

### Test User Flow
1. Register: Create new account
2. Login: Use registered email/password
3. Resume: Upload test PDF/DOC
4. Search: Try different job filters
5. Apply: Apply to a job
6. Track: View in Applications page
7. Update: Change application status

### Test API with curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"pass","fullName":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass"}'

# Health check
curl http://localhost:5000/api/health
```

---

## 📚 Documentation Files

| File | Content |
|------|---------|
| README.md | Project overview |
| SETUP_GUIDE.md | Setup instructions |
| QUICKSTART.md | 5-minute start |
| ARCHITECTURE.md | Technical details |
| FEATURES_ROADMAP.md | Planned features |
| PROJECT_SUMMARY.md | Completion summary |

---

## 🎯 Next Steps Checklist

- [ ] Read SETUP_GUIDE.md
- [ ] Copy .env.example to .env
- [ ] Install dependencies
- [ ] Start backend
- [ ] Start frontend
- [ ] Create account
- [ ] Upload resume
- [ ] Search jobs
- [ ] Apply to job
- [ ] View applications
- [ ] Update status
- [ ] Check dashboard

---

## 💡 Pro Tips

1. **Keep terminals organized**: Use 2-3 terminal tabs
2. **Monitor logs**: Watch terminal output for errors
3. **Test thoroughly**: Try all features before deploying
4. **Use Postman**: Test APIs without frontend
5. **Check console**: Browser F12 for frontend errors
6. **MongoDB Compass**: GUI for database management
7. **Git frequently**: Commit changes regularly
8. **Document changes**: Keep good commit messages

---

## 🔄 Development Workflow

```
1. Make changes
   ↓
2. Save file (hot reload)
   ↓
3. Test in browser/API
   ↓
4. Check terminal for errors
   ↓
5. Fix issues
   ↓
6. Commit changes
   ↓
7. Repeat
```

---

## 🚀 Deployment Checklist

- [ ] Update .env with production values
- [ ] Set NODE_ENV=production
- [ ] Update JWT_SECRET
- [ ] Use production database
- [ ] Enable HTTPS
- [ ] Test thoroughly
- [ ] Setup monitoring
- [ ] Setup logging
- [ ] Configure backups
- [ ] Document procedures

---

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Backend Lines | 1000+ |
| Frontend Lines | 500+ |
| Total API Endpoints | 20+ |
| Database Collections | 4 |
| React Components | 6 |
| Pages Created | 6 |
| Time to Setup | 5 mins |
| Time to First Job | 10 mins |

---

## 🎉 You're Ready!

Use this quick reference while developing. For more details, refer to the full documentation files.

**Happy coding! 🚀**
