const Itinerary = require('../models/Itinerary');
const Trip = require('../models/Trip');

const getItineraryByTripId = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ tripId: req.body.tripId })
      .populate('tripId', 'title destination state');
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found for this trip'
      });
    }
    
    res.json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching itinerary',
      error: error.message
    });
  }
};


const createItinerary = async (req, res) => {
  try {
    const { tripId } = req.body;
    
    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    
    // Check if itinerary already exists
    const existingItinerary = await Itinerary.findOne({ tripId });
    if (existingItinerary) {
      return res.status(400).json({
        success: false,
        message: 'Itinerary already exists for this trip'
      });
    }
    
    const itinerary = new Itinerary(req.body);
    const savedItinerary = await itinerary.save();
    
    res.status(200).json({
      success: true,
      message: 'Itinerary created successfully',
      data: savedItinerary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating itinerary',
      error: error.message
    });
  }
};


const updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(
      req.body.id,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Itinerary updated successfully',
      data: itinerary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating itinerary',
      error: error.message
    });
  }
};


const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.body.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Itinerary deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting itinerary',
      error: error.message
    });
  }
};

module.exports = {
  getItineraryByTripId,
  createItinerary,
  updateItinerary,
  deleteItinerary
};