const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Simplified CORS Setup for Express 4.x
const corsOptions = {
  origin: [
    'https://leaderboard-flames.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

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
