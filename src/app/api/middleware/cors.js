import { NextResponse } from 'next/server';

export function middleware(req) {
  const origin = req.headers.get('origin');
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    if (origin && allowedOrigins.includes(origin)) {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
  }

  // Handle actual requests
  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return NextResponse.next();
}

// This config tells Next.js middleware to only run on API routes
// The matcher pattern '/api/:path*' means:
// - Match URLs starting with '/api/'
// - :path* captures any subsequent path segments
// This ensures CORS headers are only added to API endpoints
// and not to other routes like pages or static files
export const config = {
  matcher: '/api/:path*',
};

/*
Complete Guide to CORS in Next.js

There are 3 main approaches to handle CORS in Next.js:

1. Using Next.js Middleware (Current File Approach)
----------------------------------------
Folder Structure:
src/
  app/
    api/
      middleware/
        cors.js  (current file)

Code:
// Update the middleware function above to:
export function middleware(req) {
  const origin = req.headers.get('origin');
  
  // Replace this array with your allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-production-domain.com'
  ];

  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return NextResponse.next();
}

2. Using next-cors Package (Recommended for Complex Apps)
----------------------------------------
Folder Structure:
src/
  app/
    api/
      middleware/
        cors.js
      [your-api-route]/
        route.js

Installation:
npm install next-cors

Usage in API route:
// src/app/api/[your-api-route]/route.js
import NextCors from 'next-cors';

export async function GET(req) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',  // Replace with your allowed origins
    optionsSuccessStatus: 200,
  });
  
  // Your API logic here
}

3. Using Headers in API Routes (Simple Approach)
----------------------------------------
Folder Structure:
src/
  app/
    api/
      [your-api-route]/
        route.js

In your API route:
// src/app/api/[your-api-route]/route.js
export async function GET(req) {
  return new Response(JSON.stringify({ data: 'your data' }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

Best Practices & Recommendations:
--------------------------------
1. Security First:
   - Never use '*' in production for Access-Control-Allow-Origin
   - Always specify exact allowed origins
   - Use environment variables for different environments

2. Performance:
   - Use middleware approach for consistent CORS across all routes
   - Implement caching using Access-Control-Max-Age
   - Consider response times when doing origin checks

3. Development Setup:
   - Use more permissive CORS in development
   - Strict CORS in production
   - Use environment variables to switch between configs

Example Environment Setup:
------------------------
// .env.development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

// .env.production
ALLOWED_ORIGINS=https://your-production-domain.com

Then use:
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

Production-Ready Configuration:
-----------------------------
For the middleware approach (most recommended):

export function middleware(req) {
  const origin = req.headers.get('origin');
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    if (origin && allowedOrigins.includes(origin)) {
      return new NextResponse(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
    return new NextResponse(null, {
      headers: {
        'Allow': 'GET,POST,PUT,DELETE,OPTIONS',
      },
    });
  }
  
  // Handle actual requests
  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  
  return NextResponse.next();
}
*/