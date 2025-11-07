# Environment Secrets Guide

This document lists all the environment secrets needed for the application to run properly in different environments.

## Production Environment Secrets

These secrets need to be set in GitHub repository settings under Settings > Secrets and variables > Actions:

### Database
- `DATABASE_URL`: PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database`
  - Example: `postgresql://myuser:mypassword@db.example.com:5432/tracking_db`

### Authentication
- `JWT_SECRET`: Secret key for JWT token generation
  - Must be at least 32 characters long
  - Should be randomly generated
  - Example: `your-very-long-and-secure-jwt-secret-key-here`

### API Configuration
- `NEXT_PUBLIC_API_URL`: Public API URL
  - Production: `https://your-domain.com`
  - Preview: `https://preview-branch.vercel.app`

### Rate Limiting
- `RATE_LIMIT_MAX`: Maximum number of requests per window
  - Recommended: `100`
- `RATE_LIMIT_WINDOW`: Time window in milliseconds
  - Recommended: `60000` (1 minute)

### Monitoring
- `LOGGING_LEVEL`: Winston logger level
  - Options: `error`, `warn`, `info`, `debug`
  - Production recommended: `error`

## Development Environment
For local development, copy `.env.example` to `.env` and set the following:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="dev-jwt-secret-at-least-32-chars-long"
NEXT_PUBLIC_API_URL="http://localhost:3000"
RATE_LIMIT_MAX=1000
RATE_LIMIT_WINDOW=60000
LOGGING_LEVEL="debug"
```

## Setting Up Secrets in GitHub

1. Go to your repository settings
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each secret listed above
5. Use different values for production and development

## Vercel Environment Configuration

When deploying to Vercel:

1. Go to your project settings in Vercel
2. Navigate to the Environment Variables section
3. Add the same secrets as above
4. Configure Environment Variable Presets for different deployment environments