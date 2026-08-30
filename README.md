# 🎯 Job Hunt Agent

An intelligent automated job application agent that helps you find and apply for jobs based on your resume. The agent searches multiple job boards, analyzes job postings, calculates match scores, and helps you track your applications.

## 🚀 Features

- **📄 Resume Management**: Upload and manage multiple resumes
- **🔍 Intelligent Job Search**: Search across LinkedIn, Indeed, GitHub Jobs, and custom feeds
- **⚡ Smart Matching**: Automatic job matching based on your resume and preferences
- **🤖 Automated Applications**: Apply to jobs with customized cover letters
- **📊 Application Tracking**: Monitor your applications and interview status
- **📈 Dashboard**: Get insights into your job search progress
- **🔐 Secure**: User authentication and data protection

## 🏗️ Project Structure

```
job-hunt/
├── backend/              # Node.js/Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/      # Request handlers
│   ├── services/        # Business logic
│   └── server.js        # Main server file
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── App.jsx      # Main app component
│   │   ├── store.js     # State management (Zustand)
│   │   └── App.css      # Styling
│   └── index.html       # HTML entry point
├── db/                  # Database scripts
├── docs/                # Documentation
└── .env.example         # Environment template
```

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Multer (File uploads)
- Axios (HTTP requests)
- Puppeteer (Web scraping)

**Frontend:**
- React 18
- Vite
- Zustand (State management)
- React Router
- Axios

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Git
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-hunt
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-hunt

# Job APIs (get from respective platforms)
INDEED_API_KEY=your_key
LINKEDIN_EMAIL=your_email
LINKEDIN_PASSWORD=your_password
GITHUB_TOKEN=your_token

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email
SMTP_PASS=your_password

# JWT Secret
JWT_SECRET=your_secret_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resume Management
- `POST /api/resume/upload` - Upload resume
- `GET /api/resume` - Get all user resumes
- `GET /api/resume/:id` - Get resume details
- `PUT /api/resume/:id` - Update resume info
- `DELETE /api/resume/:id` - Delete resume

### Job Search
- `GET /api/jobs/search` - Search jobs with filters
- `GET /api/jobs/recommended` - Get recommended jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/save` - Save job
- `POST /api/jobs/:id/unsave` - Unsave job

### Applications
- `POST /api/applications` - Create application
- `GET /api/applications` - Get user applications
- `GET /api/applications/:id` - Get application details
- `PATCH /api/applications/:id/status` - Update status
- `DELETE /api/applications/:id` - Delete application
- `GET /api/applications/stats/summary` - Get stats

## 🎯 Usage

1. **Register/Login**: Create an account or login
2. **Upload Resume**: Go to Resume page and upload your resume
3. **Search Jobs**: Browse jobs or use the search filters
4. **Apply**: Click "Apply" on jobs to submit applications
5. **Track**: Monitor your applications in the Applications page
6. **Update Status**: Update application status as interviews progress

## 🔧 Configuration

### Job Search Filters
- Job title and keywords
- Location (city, remote, hybrid)
- Job type (full-time, part-time, contract)
- Remote status
- Salary range

### Job Preferences
Set your preferences in the dashboard:
- Preferred job titles
- Preferred locations
- Industry preferences
- Salary expectations
- Job types

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
```bash
cd backend
npm run build
# Configure environment variables in platform
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder
```

## 📚 Additional Resources

- [MongoDB Setup Guide](docs/mongodb-setup.md)
- [API Documentation](docs/api-docs.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or connection string is correct
- Check `.env` file for `MONGODB_URI`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

### File Upload Issues
- Check upload directory permissions
- Verify file size doesn't exceed limit
- Ensure only PDF, DOC, DOCX allowed

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details

## 💡 Future Features

- [ ] AI-powered cover letter generation
- [ ] Resume optimization recommendations
- [ ] Job market analytics
- [ ] Salary negotiation tips
- [ ] Interview preparation guides
- [ ] Bulk application templates
- [ ] Email notifications
- [ ] Mobile app
- [ ] Calendar integration
- [ ] LinkedIn sync

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@jobhuntagent.com
- Discord: [Join Community](link)

---

Made with ❤️ to help you land your dream job!