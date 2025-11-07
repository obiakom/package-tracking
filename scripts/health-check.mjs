import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function checkHealth() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const endpoints = [
    '/api/health',
    '/api/auth/login',
    '/api/packages'
  ];

  console.log('🏥 Running health checks...\n');

  for (const endpoint of endpoints) {
    try {
      console.log(`Checking ${endpoint}...`);
      const start = Date.now();
      const response = await fetch(`${baseUrl}${endpoint}`);
      const duration = Date.now() - start;

      if (!response.ok && response.status !== 401) { // 401 is expected for protected routes
        console.error(`❌ ${endpoint} failed with status ${response.status}`);
        continue;
      }

      console.log(`✅ ${endpoint} responded in ${duration}ms`);
      
      if (endpoint === '/api/health') {
        const data = await response.json();
        console.log('Health data:', data);
      }
    } catch (error) {
      console.error(`❌ ${endpoint} failed:`, error.message);
    }
  }
}

checkHealth().catch(console.error);