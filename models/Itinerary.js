const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: [true, 'Day number is required'],
    min: [1, 'Day number must be at least 1']
  },
  title: {
    type: String,
    required: [true, 'Day title is required'],
    trim: true,
    maxlength: [100, 'Day title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Day description is required'],
    maxlength: [500, 'Day description cannot exceed 500 characters']
  },
  activities: [{
    type: String,
    trim: true,
    maxlength: [200, 'Activity description cannot exceed 200 characters']
  }],
  isExpanded: {
    type: Boolean,
    default: false
  }
}, {
  _id: true
});

const itinerarySchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: [true, 'Trip ID is required'],
    unique: true
  },
  duration: {
    nights: {
      type: Number,
      required: [true, 'Number of nights is required'],
      min: [0, 'Nights cannot be negative']
    },
    days: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: [1, 'Days must be at least 1']
    }
  },
  startingPrice: {
    type: Number,
    required: [true, 'Starting price is required'],
    min: [0, 'Starting price cannot be negative']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required'],
    trim: true
  },
  packageCost: {
    quadSharing: {
      type: Number,
      required: [true, 'Quad sharing price is required'],
      min: [0, 'Price cannot be negative']
    },
    tripleSharing: {
      type: Number,
      required: [true, 'Triple sharing price is required'],
      min: [0, 'Price cannot be negative']
    },
    twinSharing: {
      type: Number,
      required: [true, 'Twin sharing price is required'],
      min: [0, 'Price cannot be negative']
    }
  },
  days: {
    type: [itineraryDaySchema],
    validate: {
      validator: function(days) {
        return days.length > 0;
      },
      message: 'At least one day must be specified in the itinerary'
    }
  },
  inclusions: [{
    type: String,
    trim: true,
    maxlength: [200, 'Inclusion item cannot exceed 200 characters']
  }],
  exclusions: [{
    type: String,
    trim: true,
    maxlength: [200, 'Exclusion item cannot exceed 200 characters']
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted prices
itinerarySchema.virtual('formattedPackageCost').get(function() {
  return {
    quadSharing: `₹${this.packageCost.quadSharing.toLocaleString('en-IN')}`,
    tripleSharing: `₹${this.packageCost.tripleSharing.toLocaleString('en-IN')}`,
    twinSharing: `₹${this.packageCost.twinSharing.toLocaleString('en-IN')}`
  };
});

module.exports = mongoose.model('Itinerary', itinerarySchema);