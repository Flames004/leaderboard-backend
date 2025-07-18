const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Enhanced CORS Setup
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://leaderboard-flames.netlify.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Additional CORS middleware for preflight requests
app.options('*', cors(corsOptions));

// Manual CORS headers as fallback
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://leaderboard-flames.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  
  next();
});

// ✅ Middleware
app.use(express.json());

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);

// ✅ Optional: Root route for health check
app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

// ✅ Server and DB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
