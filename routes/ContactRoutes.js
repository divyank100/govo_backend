const express= require('express');
const router=express.Router();

const {saveContactInfo,uploadImage,dummyResponse} = require("../controllers/ContactController");
const upload = require('../config/uploadMiddleware');

router.post("/saveContactInfo",saveContactInfo);
router.post('/uploadImage', upload.single('image'), uploadImage);
router.post('/dummyResponse', dummyResponse);

module.exports=router;

