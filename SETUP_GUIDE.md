# Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Git Workflow](#git-workflow)
4. [Creating Pull Request](#creating-pull-request)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)
9. [Security Best Practices](#security-best-practices)

## 🚀 Installation

### Prerequisites
- Node.js v14+ installed
- MongoDB installed locally or MongoDB Atlas account
- Git installed
- GitHub account

### Step 1: Clone the Repository

```bash
git clone https://github.com/Prabhat-kumar-11/admin-dashboard.git
cd adminDashboard
```

### Step 2: Install Root Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 4: Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

## ⚙️ Environment Variables Setup

### Backend Configuration

Create `backend/.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Security Note**: Change `JWT_SECRET` to a strong, unique value in production!

### Frontend Configuration

Create `frontend/.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🗄️ Database Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB Community Edition
# macOS (using Homebrew):
brew install mongodb-community

# Windows:
# Download from https://www.mongodb.com/try/download/community

# Start MongoDB service:
# macOS:
brew services start mongodb-community

# Windows:
# Use MongoDB Compass or start mongod from command line
```

### Option 2: MongoDB Atlas (Cloud)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
```

## 🏃 Running the Application

### Start Backend Server

Terminal 1:
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Start Frontend Server

Terminal 2:
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
On Your Network: http://localhost:3000
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📱 Default Test Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: password123
- **Role**: Admin

### User Account
- **Email**: user@example.com
- **Password**: password123
- **Role**: User

## 🔄 Git Workflow

### Step 1: Create Feature Branch

```bash
git checkout -b feature/rbac-admin-dashboard
```

### Step 2: Make Changes

Edit files as needed:
```bash
git status  # See modified files
git diff    # See changes
```

### Step 3: Stage Changes

```bash
# Stage specific file
git add path/to/file.js

# Stage all changes
git add -A
```

### Step 4: Commit Changes

```bash
# Follow conventional commits
git commit -m "feat: add user management panel"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
```

### Step 5: Push to GitHub

```bash
git push origin feature/rbac-admin-dashboard
```

## 📝 Creating a Pull Request

### On GitHub:

1. Go to https://github.com/Prabhat-kumar-11/admin-dashboard
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select:
   - **Base**: main
   - **Compare**: feature/rbac-admin-dashboard
5. Add PR title and description:

```markdown
# Task Management System - RBAC & Admin Dashboard

## Description
Implements Role-Based Access Control (RBAC) with Admin Dashboard, Activity Logging, and Analytics.

## Changes Made
- ✅ User schema enhanced with role and status fields
- ✅ Activity logging system implemented
- ✅ Admin dashboard with user and task management
- ✅ Analytics dashboard with charts
- ✅ Protected routes and authorization middleware
- ✅ Comprehensive API documentation

## Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [x] Tested user registration and login
- [x] Tested admin dashboard functionality
- [x] Tested activity logging
- [x] Tested analytics display

## Screenshots
[Optional: Add screenshots here]

## Checklist
- [x] Code follows project style guidelines
- [x] Comments added for complex logic
- [x] Tests written and passing
- [x] Documentation updated
- [x] No console errors or warnings
```

6. Click "Create pull request"
7. Request review from team members
8. Address review comments
9. After approval, merge to main branch

## 🎯 Commit Message Conventions

```bash
# Feature
git commit -m "feat: add user management dashboard"

# Bug Fix
git commit -m "fix: resolve JWT token expiration issue"

# Documentation
git commit -m "docs: update API documentation"

# Style
git commit -m "style: format code with prettier"

# Refactor
git commit -m "refactor: reorganize file structure"

# Test
git commit -m "test: add unit tests for auth service"

# Chore
git commit -m "chore: update dependencies"
```

## 🛠️ Useful Git Commands

```bash
# View commit history
git log --oneline

# View changes before committing
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Switch branches
git checkout another-branch

# Create and switch to new branch
git checkout -b new-feature-branch

# See all branches
git branch -a

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Rebase to latest main
git fetch origin
git rebase origin/main

# Stash changes
git stash

# Apply stashed changes
git stash pop
```

## 📊 Project Structure Quick Reference

```
adminDashboard/
├── backend/              # Express.js server
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, error handling
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   └── server.js        # Entry point
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   ├── context/     # Auth context
│   │   └── App.jsx      # Root component
│   └── package.json
│
└── README.md           # Project documentation
```

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run tests (if configured)
npm test

# Test specific endpoint
curl http://localhost:5000/api/health
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm test

# Build for production
npm run build
```

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
# Start MongoDB service
# macOS:
brew services start mongodb-community

# Windows:
mongod
```

### Issue: Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Kill process using port 5000
# macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: JWT Token Expired

**Solution**:
```javascript
// Token expires by default in 7 days
// Change JWT_EXPIRE in .env to adjust:
JWT_EXPIRE=30d  // 30 days
```

### Issue: CORS Error

**Solution**: Ensure backend CORS is configured:
```javascript
// In server.js
app.use(cors()); // Already configured
```

### Issue: Frontend Not Loading

**Solution**:
```bash
# Clear npm cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## ✅ Best Practices

### Code Organization
- ✅ Keep components small and focused
- ✅ Use separate files for each component
- ✅ Organize components in logical folders
- ✅ Create custom hooks for repeated logic

### State Management
- ✅ Use Context API for auth state
- ✅ Keep component state minimal
- ✅ Lift state up when multiple components need it

### Error Handling
- ✅ Always catch async/await errors
- ✅ Show user-friendly error messages
- ✅ Log errors for debugging
- ✅ Validate user input

### Performance
- ✅ Use React.memo for pure components
- ✅ Optimize re-renders with useCallback
- ✅ Lazy load routes with React.lazy
- ✅ Minimize bundle size

### Database
- ✅ Create indexes for frequently queried fields
- ✅ Use pagination for large datasets
- ✅ Validate data on both client and server
- ✅ Use lean() for read-only queries

## 🔒 Security Best Practices

### Authentication
- ✅ Always hash passwords (bcryptjs)
- ✅ Use strong JWT secrets
- ✅ Set reasonable token expiration times
- ✅ Validate tokens on every protected route

### Authorization
- ✅ Implement RBAC (Role-Based Access Control)
- ✅ Check user permissions on backend
- ✅ Never trust client-side authorization alone
- ✅ Validate ownership before operations

### Data Protection
- ✅ Use HTTPS in production
- ✅ Never log passwords or sensitive data
- ✅ Sanitize user inputs
- ✅ Use environment variables for secrets

### API Security
- ✅ Validate all incoming data
- ✅ Implement rate limiting
- ✅ Use CORS properly
- ✅ Add request size limits

## 📦 Production Deployment

### Backend Deployment (Heroku)

```bash
# Create Procfile
echo "web: node backend/server.js" > Procfile

# Push to Heroku
heroku create your-app-name
git push heroku feature/rbac-admin-dashboard:main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables in Production

Set on hosting platform:
- `MONGODB_URI` - Production database URL
- `JWT_SECRET` - Strong random string
- `NODE_ENV` - production
- `REACT_APP_API_URL` - Production API URL

## 📞 Support & Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is licensed under the ISC License.

---

Happy coding! 🚀
