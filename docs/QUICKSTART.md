# 🚀 Quick Start Guide

Get up and running with Job Hunt Agent in 5 minutes!

## Step 1: Prerequisites

Make sure you have:
- Node.js v16 or higher
- MongoDB running locally or a cloud connection string
- Git

## Step 2: Clone & Setup

```bash
# Clone repository
git clone <repo-url>
cd job-hunt

# Copy environment file
cp .env.example .env

# Edit .env with your settings
# At minimum:
# - MONGODB_URI
# - JWT_SECRET (can be any random string for development)
```

## Step 3: Install Dependencies

```bash
# Option 1: Install all at once
npm run install-all

# Option 2: Install separately
npm install
cd backend && npm install
cd ../frontend && npm install
```

## Step 4: Start Development Servers

```bash
# Start both backend and frontend
npm run dev

# Or run separately in different terminals:
# Terminal 1
npm run backend

# Terminal 2
npm run frontend
```

## Step 5: Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## First Steps

1. **Create Account**: Click "Register" and create your account
2. **Upload Resume**: Go to Resume page, upload your resume (PDF, DOC, DOCX)
3. **Search Jobs**: Use the job search page to find opportunities
4. **Apply**: Click "Apply" on jobs you're interested in
5. **Track**: Monitor your applications in the Applications page

## Common Issues

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# If using local MongoDB:
mongod

# Update MONGODB_URI in .env if needed
```

### Port Already in Use
```bash
# Backend uses port 5000
# Frontend uses port 5173
# Change in .env (backend) or vite.config.js (frontend)
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all
```

## Next Steps

- Read the full [README.md](../README.md)
- Check [API Documentation](./api-docs.md)
- Explore configuration options in [CONFIGURATION.md](./configuration.md)

## Need Help?

- Check troubleshooting section in README
- Review error logs in terminal
- Check browser console for frontend errors
- Use `npm run dev` for detailed logs
