const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS Setup — VERY IMPORTANT
app.use(cors({
  origin: ['https://leaderboard-flames.netlify.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
