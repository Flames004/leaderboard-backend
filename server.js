const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Allow only your frontend domain
app.use(cors({
  origin: 'https://leaderboard-flames.netlify.app'
}));

app.use(express.json());

// ✅ Routes AFTER CORS
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');
app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);

// ✅ Optional root route (health check)
app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
