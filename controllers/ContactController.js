const Contact = require('../models/Contact');

const saveContactInfo = async (req, res) => {
  try {
    const contactInfo=Contact(req.body);
    const savedContactInfo= await contactInfo.save();
    
    res.status(200).json({
      success: true,
      data: savedContactInfo,
      message:"Your request is processed. We'll contact you soon."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while saving contact info.',
      error: error.message
    });
  }
};

module.exports = {
  saveContactInfo
};