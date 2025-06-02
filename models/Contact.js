const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        maxlength: [100, 'Email cannot exceed 100 characters']
      },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone Number is required'],
        trim: true,
        maxlength: [10, 'phone number cannot exceed 10']
    },
    preferredDestination: {
        type: String,
        default:''
    },
    dreamTrip: {
        type: String,
        default:''
    },
})
  
module.exports = mongoose.model('Contact', contactSchema);