const express = require('express');
const router = express.Router();
const {
  getItineraryByTripId,
  createItinerary,
  updateItinerary,
  deleteItinerary
} = require('../controllers/ItineraryController');

// Public routes
router.get('/trip/:tripId', getItineraryByTripId);

// Protected routes (add authentication middleware here)
router.post('/createItinerary', createItinerary);
router.put('/updateItinerary', updateItinerary);
router.delete('/deleteItinerary', deleteItinerary);

module.exports = router;