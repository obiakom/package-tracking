import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Generate a secure random string for JWT secret
const jwtSecret = randomBytes(32).toString('hex');

// Create production env file
const envContent = `DATABASE_URL="postgresql://user:password@your-production-db-host:5432/db-name"
JWT_SECRET="${jwtSecret}"
`;

// Write to .env.production
writeFileSync(join(process.cwd(), '.env.production'), envContent);
console.log('Production environment file created with secure JWT secret');