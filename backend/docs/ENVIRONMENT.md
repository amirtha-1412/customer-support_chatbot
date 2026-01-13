# Environment Variables Setup Guide

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update required variables in `.env`:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Generate a secure secret key

3. **Generate a secure JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/dbname` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `JWT_EXPIRE` | JWT token expiration | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Optional Variables

### Email Configuration
For sending emails (password reset, notifications, etc.):
```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### AI/Chatbot Integration
For AI-powered chatbot features:
```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
```

### Rate Limiting
To prevent API abuse:
```env
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

### File Upload
For handling file uploads:
```env
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

## MongoDB Setup

### Option 1: Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/customer-support-chatbot
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/customer-support-chatbot
```

## Security Best Practices

> [!CAUTION]
> Never commit `.env` file to version control!

1. **Always use `.env.example`** for documentation
2. **Generate strong secrets** using crypto
3. **Different secrets** for dev/staging/production
4. **Rotate secrets** regularly in production
5. **Use environment-specific** `.env` files

## Environment-Specific Files

You can create multiple environment files:
- `.env.development` - Development settings
- `.env.production` - Production settings
- `.env.test` - Testing settings

Load specific environment:
```bash
NODE_ENV=production node server.js
```

## Validation

The `env.config.js` module automatically validates required variables in production mode. Missing variables will throw an error on startup.

## Usage in Code

Import the centralized config:
```javascript
const config = require('./config/env.config');

// Access variables
console.log(config.port);
console.log(config.database.uri);
console.log(config.jwt.secret);
```

## Troubleshooting

**Problem:** Variables not loading
- Ensure `.env` file is in the root directory
- Check file encoding (should be UTF-8)
- Verify no spaces around `=` sign

**Problem:** MongoDB connection fails
- Check if MongoDB is running locally
- Verify connection string format
- Check network/firewall settings for Atlas

**Problem:** JWT errors
- Ensure `JWT_SECRET` is set and not empty
- Check secret doesn't contain special characters that need escaping
