const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();
app.use(cors({
  origin: 'https://leaderboard-flames.netlify.app'
}));  // updated after deployment of frontend
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});
