const Contact = require('../models/Contact');
const cloudinary = require('../config/cloudinary_config');
const fs = require('fs');

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

const uploadImage = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(401).json({
        message: "Image not found",
        success: false,
      });
    }

    const result = await cloudinary.uploader.upload(image.path);
    console.log("Uploaded to Cloudinary:", result);

    fs.unlink(image.path, (err) => {
      if (err) {
        console.error('Failed to delete local file:', err);
      } else {
        console.log('Temporary file deleted:', image.path);
      }
    });

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error while uploading image',
      error: error.message,
    });
  }
};

const dummyResponse = async (req, res) => {
  try {
    res.status(500).json({
      success: false,
      message: 'Dummy Response',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error while uploading image',
      error: error.message,
    });
  }
};


module.exports = {
  saveContactInfo,uploadImage,dummyResponse
};