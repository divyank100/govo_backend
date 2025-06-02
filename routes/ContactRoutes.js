const express= require('express');
const router=express.Router();

const {saveContactInfo} = require("../controllers/ContactController");

router.post("/saveContactInfo",saveContactInfo);


module.exports=router;

