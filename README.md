# MERN Task Management System - RBAC & Admin Dashboard

A complete production-ready Task Management System built with MERN stack featuring Role-Based Access Control (RBAC), Admin Dashboard, Activity Logging System, and Analytics Dashboard.

## 🚀 Features

### Core Features
- ✅ User Authentication (JWT)
- ✅ Role-Based Access Control (Admin/User)
- ✅ Task Management (CRUD)
- ✅ User Management
- ✅ Activity Logging
- ✅ Analytics Dashboard
- ✅ Responsive Design
- ✅ Mobile Friendly

### Admin Features
- 👥 User Management (View, Delete, Status Update)
- 📊 Task Monitoring (View all tasks, Delete any task)
- 📋 Activity Logs (View all activities with filters)
- 📈 Analytics Dashboard (Stats, Charts, Metrics)

### User Features
- 📝 Create, Read, Update, Delete own tasks
- 📊 View personal dashboard
- 🔐 Account management

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: Bcryptjs
- **Validation**: Express-validator

### Frontend
- **Library**: React.js 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Icons**: React Icons

## 📦 Project Structure

```
adminDashboard/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── ActivityLog.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── activityLogger.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── taskService.js
│   │   └── adminService.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   │
│   │   │   ├── tables/
│   │   │   │   ├── DataTables.jsx
│   │   │   │   └── ActivityTable.jsx
│   │   │   │
│   │   │   ├── cards/
│   │   │   │   └── StatsCards.jsx
│   │   │   │
│   │   │   ├── charts/
│   │   │   │   └── Charts.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Toast.jsx
│   │   │       ├── Loading.jsx
│   │   │       └── Common.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Unauthorized.jsx
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── MyTasks.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── UserManagement.jsx
│   │   │       ├── TaskMonitoring.jsx
│   │   │       ├── ActivityLogs.jsx
│   │   │       └── Analytics.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── apiService.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js v14 or higher
- MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/task-management-system.git
cd adminDashboard
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Setup Environment Variables**

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start MongoDB**
```bash
mongod
```

5. **Run the application**

Terminal 1 (Backend):
```bash
npm run dev-backend
```

Terminal 2 (Frontend):
```bash
npm run dev-frontend
```

Backend runs on: `http://localhost:5000`
Frontend runs on: `http://localhost:3000`

## 🔐 Default Credentials

For testing purposes, you can create test accounts:

**Admin Account**
- Email: admin@example.com
- Password: password123
- Role: Admin

**User Account**
- Email: user@example.com
- Password: password123
- Role: User

## 📚 API Documentation

See [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) for complete API documentation.

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

**Tasks (User)**
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

**Admin**
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/status` - Update user status
- `GET /api/admin/tasks` - Get all tasks
- `DELETE /api/admin/tasks/:id` - Delete task
- `GET /api/admin/activity-logs` - Get activity logs
- `GET /api/admin/analytics` - Get analytics

## 🔄 Git Workflow

This project follows a feature branch workflow:

```bash
# Create feature branch
git checkout -b feature/rbac-admin-dashboard

# Make changes and commit
git add .
git commit -m "feat: implement RBAC and admin dashboard"

# Push to GitHub
git push origin feature/rbac-admin-dashboard

# Create Pull Request on GitHub
```

## 🎨 UI Features

- **Responsive Design**: Mobile, Tablet, Desktop layouts
- **Tailwind CSS**: Modern styling framework
- **Charts**: Recharts for data visualization
- **Notifications**: Toast notifications for user feedback
- **Loading States**: Loading spinners and skeletons
- **Error Handling**: Comprehensive error messages
- **Accessibility**: WCAG compliant components

## 📊 Activity Logging

The system automatically logs:
- User Login/Logout
- Task Creation, Update, Deletion
- User Status Changes
- User Deletion
- Admin Actions

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based authorization
- Input validation with express-validator
- CORS enabled
- Activity logging for audit trail
- User status verification

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway)
1. Add `Procfile` with: `web: node backend/server.js`
2. Set environment variables on hosting platform
3. Deploy database to MongoDB Atlas

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build-frontend`
2. Deploy `build` folder to Vercel/Netlify
3. Set `REACT_APP_API_URL` to production API URL

## 📝 Best Practices

- **Clean Code**: Well-organized, readable, commented code
- **Separation of Concerns**: Models, Controllers, Services layers
- **Error Handling**: Centralized error handling middleware
- **Security**: JWT, RBAC, password hashing
- **Database**: Indexed queries, optimized schemas
- **API Design**: RESTful endpoints, consistent responses
- **Frontend**: Reusable components, custom hooks, context API

## 🐛 Debugging

### Backend Logging
```javascript
console.log('Debug message');
// Check terminal output
```

### Frontend Debugging
```javascript
console.log(data); // Browser console (F12)
// Network tab for API calls
```

## 📧 Support

For issues or questions, please open an issue on GitHub.

## 📄 License

This project is licensed under the ISC License.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ using MERN Stack
