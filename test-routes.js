// Quick test script to verify routes are working
const express = require('express');
const cors = require('cors');

const app = express();

// Test CORS configuration
const corsOptions = {
  origin: [
    'https://leaderboard-flames.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Test routes similar to your actual routes
app.get('/api/test/history', (req, res) => {
  res.json({ message: 'History route works!', route: '/api/test/history' });
});

app.post('/api/test/:userId', (req, res) => {
  res.json({ 
    message: 'User route works!', 
    route: '/api/test/:userId',
    userId: req.params.userId 
  });
});

app.get('/', (req, res) => {
  res.json({ 
    status: 'Test server running',
    message: 'Routes are working correctly with Express 4.x',
    testRoutes: [
      'GET / (this page)',
      'GET /api/test/history',
      'POST /api/test/:userId'
    ]
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('Test the routes:');
  console.log(`- GET http://localhost:${PORT}/`);
  console.log(`- GET http://localhost:${PORT}/api/test/history`);
  console.log(`- POST http://localhost:${PORT}/api/test/123`);
});
