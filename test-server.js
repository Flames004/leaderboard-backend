// Simple test script to check if server starts and CORS is working
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
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'CORS test successful!', 
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Server is running', cors: 'enabled' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/api/test`);
});
