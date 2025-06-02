const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    dateRange: {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
        validate: {
          validator: function(value) {
            return value > this.dateRange.startDate;
          },
          message: 'End date must be after start date'
        }
      }
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
    category: {
      type: String,
      enum: {
        values: ['Adventure', 'Leisure', 'Spiritual', 'Cultural', 'Wildlife'],
        message: 'Category must be one of: Adventure, Leisure, Spiritual, Cultural, Wildlife'
      },
      default: 'Adventure'
    },
    maxGroupSize: {
      type: Number,
      default: 20,
      min: [1, 'Group size must be at least 1']
    },
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  
  // Indexes for better query performance
  tripSchema.index({ destination: 1, state: 1 });
  tripSchema.index({ price: 1 });
  tripSchema.index({ 'dateRange.startDate': 1 });
  tripSchema.index({ category: 1, difficulty: 1 });
  
  // Virtual for formatted price
  tripSchema.virtual('formattedPrice').get(function() {
    return `₹${this.price.toLocaleString('en-IN')}`;
  });
  
  module.exports = mongoose.model('Trip', tripSchema);