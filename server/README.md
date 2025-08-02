# Project Server

A robust Node.js/Express.js backend server with MongoDB integration and comprehensive authentication system.

## Features

- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Account lockout after failed attempts
  - Email verification
  - Password reset functionality
  - Role-based access control (User/Admin)

- **Security Features**
  - CORS protection
  - Input validation with Joi
  - Rate limiting for failed login attempts
  - Secure password storage
  - JWT token management
  - Security headers

- **User Management**
  - Profile management
  - Account activation/deactivation
  - Admin user management
  - User search and pagination

- **Email System**
  - Welcome emails
  - Email verification
  - Password reset emails
  - Account notifications

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Email**: Nodemailer
- **Environment**: dotenv

## Project Structure

```
server/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management logic
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── error.js            # Error handling middleware
│   └── validation.js       # Input validation schemas
├── models/
│   └── User.js             # User model and schema
├── routes/
│   ├── auth.js             # Authentication routes
│   └── users.js            # User management routes
├── utils/
│   └── sendEmail.js        # Email utility functions
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies and scripts
└── server.js              # Main server file
```

## Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env` file and update the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project_db
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   JWT_EXPIRE=7d
   
   # Email configuration (for password reset)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=noreply@project.com
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system or update the connection string to point to your MongoDB Atlas cluster.

5. **Run the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | User registration | Public |
| POST | `/login` | User login | Public |
| GET | `/me` | Get current user | Private |
| POST | `/logout` | User logout | Private |
| POST | `/forgot-password` | Request password reset | Public |
| PUT | `/reset-password/:token` | Reset password | Public |
| PUT | `/update-password` | Update password | Private |
| GET | `/verify-email/:token` | Verify email address | Public |
| POST | `/resend-verification` | Resend verification email | Private |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/profile` | Get user profile | Private |
| PUT | `/profile` | Update user profile | Private |
| DELETE | `/profile` | Delete user account | Private |
| GET | `/` | Get all users (paginated) | Admin |
| GET | `/:id` | Get specific user | Admin |
| PUT | `/:id` | Update specific user | Admin |
| DELETE | `/:id` | Delete specific user | Admin |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/health` | Server health check | Public |

## Request/Response Examples

### User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Route Access
```bash
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

## Environment Setup

### MongoDB Setup
1. **Local MongoDB**: Install and run MongoDB locally
2. **MongoDB Atlas**: Create a cluster and get connection string

### Email Setup (Optional)
1. **Gmail**: Use app-specific password
2. **Other SMTP**: Configure according to your email provider

## Security Considerations

- Change JWT_SECRET in production
- Use HTTPS in production
- Set up proper CORS origins
- Configure rate limiting
- Set up monitoring and logging
- Use environment-specific configurations

## Error Handling

The server includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Server errors
- Custom error responses

## Features in Detail

### Account Security
- Password strength requirements
- Account lockout after 5 failed attempts
- Secure password reset via email
- Email verification for new accounts

### Admin Features
- User management dashboard endpoints
- Role-based access control
- User search and filtering
- Account activation/deactivation

### Email Integration
- Automated welcome emails
- Email verification system
- Password reset emails
- Account notification emails

## Development

### Scripts
```bash
npm run dev     # Start with nodemon for development
npm start       # Start production server
```

### Testing
Add your testing framework and run tests:
```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use proper MongoDB connection string
3. Set secure JWT_SECRET
4. Configure proper CORS origins
5. Set up SSL/HTTPS
6. Configure email service
7. Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
