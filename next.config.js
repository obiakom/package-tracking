/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimizes for production deployment
  poweredByHeader: false // Removes the X-Powered-By header for security
}

module.exports = nextConfig