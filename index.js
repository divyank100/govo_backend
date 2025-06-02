const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const tripRoutes = require('./routes/TripRoutes');
const itineraryRoutes = require('./routes/ItinerarayRoutes');
const contactRoutes = require('./routes/ContactRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3000;

app.use('/api/trips', tripRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/contact', contactRoutes );


app.get('/', (req, res) => {
  res.send('Hello from Go Voyage!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  });
  
  // 404 handler
//   app.use('*', (req, res) => {
//     res.status(404).json({
//       success: false,
//       message: 'Route not found'
//     });
//   });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});