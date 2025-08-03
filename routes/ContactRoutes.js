const express= require('express');
const router=express.Router();

const {saveContactInfo,uploadImage} = require("../controllers/ContactController");
const upload = require('../config/uploadMiddleware');

router.post("/saveContactInfo",saveContactInfo);
router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports=router;

