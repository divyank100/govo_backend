const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find() 
      .sort({ featured: -1, createdAt: -1 }); 

    res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trips',
      error: error.message
    });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.query.tripId);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const itinerary = await Itinerary.findOne({ tripId: trip._id });

    res.json({
      success: true,
      data: {
        trip,
        itinerary
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trip',
      error: error.message
    });
  }
};


const createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    
    res.status(200).json({
      success: true,
      message: 'Trip created successfully',
      data: savedTrip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating trip',
      error: error.message
    });
  }
};


const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.body.id,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Trip updated successfully',
      data: trip
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating trip',
      error: error.message
    });
  }
};


const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.body.id);
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    
    // Also delete associated itinerary
    await Itinerary.deleteOne({ tripId: req.body.id });
    
    res.json({
      success: true,
      message: 'Trip and associated itinerary deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting trip',
      error: error.message
    });
  }
};


const searchTrips = async (req, res) => {
  try {
    const searchQuery = req.body.query;
    
    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const query = {
      isActive: true,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { destination: { $regex: searchQuery, $options: 'i' } },
        { state: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    };
    
    const trips = await Trip.find(query)
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: trips.length,
      searchQuery,
      data: trips
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching trips',
      error: error.message
    });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  searchTrips
};