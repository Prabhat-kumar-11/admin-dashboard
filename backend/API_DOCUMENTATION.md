# Task Management System Backend API

## Overview
Complete backend API for Task Management System with Role-Based Access Control (RBAC), Admin Dashboard, Activity Logging, and Analytics.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## Installation

```bash
cd backend
npm install
```

## Setup Environment Variables

Create `.env` file in backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication (`/api/auth`)

#### Register
- **POST** `/api/auth/register`
- Body: `{ name, email, password }`
- Response: `{ token, user }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Response: `{ token, user }`

#### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer {token}`
- Response: `{ user }`

### Tasks (`/api/tasks`)

#### Get All User Tasks
- **GET** `/api/tasks?page=1&limit=10&status=Pending`
- Headers: `Authorization: Bearer {token}`
- Response: `{ tasks, pagination }`

#### Create Task
- **POST** `/api/tasks`
- Headers: `Authorization: Bearer {token}`
- Body: `{ title, description, priority, dueDate }`
- Response: `{ task }`

#### Get Task
- **GET** `/api/tasks/:id`
- Headers: `Authorization: Bearer {token}`
- Response: `{ task }`

#### Update Task
- **PUT** `/api/tasks/:id`
- Headers: `Authorization: Bearer {token}`
- Body: `{ title, description, status, priority, dueDate }`
- Response: `{ task }`

#### Delete Task
- **DELETE** `/api/tasks/:id`
- Headers: `Authorization: Bearer {token}`
- Response: `{ message }`

### Admin APIs (`/api/admin`)

All admin endpoints require Admin role.

#### User Management

##### Get All Users
- **GET** `/api/admin/users?page=1&limit=10&search=john`
- Response: `{ users, pagination }`

##### Delete User
- **DELETE** `/api/admin/users/:id`
- Response: `{ message }`

##### Update User Status
- **PUT** `/api/admin/users/:id/status`
- Body: `{ status: "Active" | "Inactive" }`
- Response: `{ user }`

#### Task Monitoring

##### Get All Tasks
- **GET** `/api/admin/tasks?page=1&limit=10&status=Pending`
- Response: `{ tasks, pagination }`

##### Delete Task
- **DELETE** `/api/admin/tasks/:id`
- Response: `{ message }`

#### Activity Logs

##### Get Activity Logs
- **GET** `/api/admin/activity-logs?page=1&limit=10&action=LOGIN&userId=USER_ID`
- Response: `{ logs, pagination }`

#### Analytics

##### Get Analytics
- **GET** `/api/admin/analytics`
- Response: `{ analytics }`

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "Admin" | "User",
  status: "Active" | "Inactive",
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String,
  description: String,
  status: "Pending" | "In Progress" | "Completed",
  priority: "Low" | "Medium" | "High",
  dueDate: Date,
  createdBy: ObjectId (User),
  assignedTo: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

### ActivityLog
```javascript
{
  userId: ObjectId (User),
  action: String,
  description: String,
  metadata: Mixed,
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
```

## Authorization Rules

### User Permissions
- Can create, view, update, delete own tasks only
- Cannot access other users' tasks
- Cannot access admin endpoints

### Admin Permissions
- Can view all users
- Can delete users
- Can update user status
- Can view all tasks
- Can delete any task
- Can view activity logs
- Can view analytics

## Activity Tracking

The system automatically logs the following activities:
- User Login
- Task Creation
- Task Update
- Task Deletion
- User Status Update
- User Deletion

## Security Features

1. **Password Hashing**: Bcrypt with salt rounds = 10
2. **JWT Authentication**: Token-based authentication
3. **Role-Based Authorization**: Admin/User roles
4. **Input Validation**: Express-validator
5. **CORS**: Enabled for frontend communication
6. **Error Handling**: Centralized error handling middleware
7. **Activity Logging**: All critical actions are logged

## Best Practices Implemented

1. **Separation of Concerns**: Models, Controllers, Services, Routes
2. **Error Handling**: Centralized error handler middleware
3. **Security**: Password hashing, JWT verification, RBAC
4. **Scalability**: Service layer for business logic
5. **Database Optimization**: Indexes on frequently queried fields
6. **Code Organization**: Clear folder structure
