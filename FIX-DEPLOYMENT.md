# Fix for Express 5.x Path-to-RegExp Error

## The Problem
The deployment error was caused by using Express.js 5.1.0, which is an unstable version with breaking changes in route parameter parsing.

## The Solution
1. **Downgraded Express**: Changed from `5.1.0` to `4.19.2` (stable version)
2. **Fixed Route Order**: Moved `/history` route before `/:userId` route to prevent conflicts
3. **Simplified CORS**: Removed complex CORS configuration that might cause issues with Express 4.x

## To Deploy the Fix:

### Step 1: Update Dependencies
```bash
cd backend
npm install
```

### Step 2: Commit and Push Changes
```bash
git add .
git commit -m "Fix Express version and route conflicts"
git push origin main
```

### Step 3: Redeploy on Render
The deployment should now work without the path-to-regexp error.

## Changes Made:

### package.json
- Changed `"express": "^5.1.0"` to `"express": "^4.19.2"`

### claimRoutes.js
- Moved `GET /history` route before `POST /:userId` route
- This prevents Express from trying to parse "history" as a userId parameter

### server.js
- Simplified CORS configuration for better Express 4.x compatibility
- Removed redundant manual CORS headers
- Used standard array format for origins instead of function-based validation

## Expected Result:
- ✅ Server should start without path-to-regexp errors
- ✅ CORS should work properly with your Netlify frontend
- ✅ All API endpoints should be accessible
