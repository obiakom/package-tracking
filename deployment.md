# Deployment Instructions

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database (for production)
- Git installed
- Vercel CLI (optional, for Vercel deployment)

## Environment Setup
1. Set up your production database (PostgreSQL recommended)
2. Update `.env.production` with your database URL
3. Update `NEXTAUTH_URL` with your production domain
4. The `NEXTAUTH_SECRET` is already configured securely

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Option 2: Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Database Migration
Before deploying, run these commands to prepare your production database:
```bash
npx prisma migrate deploy
```

## Post-Deployment Checklist
1. Verify all environment variables are set
2. Test the authentication system
3. Verify database connections
4. Test package tracking functionality
5. Monitor error logs

## Monitoring and Maintenance
- Set up error monitoring (e.g., Sentry)
- Configure logging
- Set up uptime monitoring
- Regular database backups

## Rolling Back
If needed, you can rollback to the previous version:
1. With Vercel: `vercel rollback`
2. Manual: Keep previous build and swap back

## Security Notes
- Keep your `.env.production` file secure
- Regularly rotate the NEXTAUTH_SECRET
- Monitor database access logs
- Keep dependencies updated