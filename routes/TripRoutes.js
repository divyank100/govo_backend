const express = require('express');
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  searchTrips
} = require('../controllers/TripController');

// Public routes
router.get('/fetchtAllTrips', getAllTrips);
router.get('/search/:query', searchTrips);
router.get('/getTripById', getTripById);


router.post('/createTrip', createTrip);
router.put('/updateTrip', updateTrip);
router.delete('/deleteTrip', deleteTrip);

module.exports = router;