# Customer Support Chatbot - Backend

Backend server for the customer support chatbot application built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files (database, etc.)
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.js          # Express app setup
├── server.js           # Server entry point
├── .env                # Environment variables
└── package.json        # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Update `.env` file with your MongoDB URI and other settings

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## 📦 Installed Dependencies

### Core Dependencies
- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Request validation

### Dev Dependencies
- **nodemon** - Auto-restart on file changes

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be configured)

## 🌐 API Endpoints

The server runs on `http://localhost:5000` by default.

- `GET /health` - Health check endpoint

## 📝 Environment Variables

See `.env` file for required environment variables:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - JWT expiration time
- `CLIENT_URL` - Frontend URL for CORS

## 🔐 Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- CORS configured for frontend origin
- Environment variables for sensitive data
