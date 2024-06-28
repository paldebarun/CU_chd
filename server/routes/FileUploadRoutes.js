const express=require("express");
const routes=express.Router();

const {imageUpload}=require('../controllers/UplaodToCloudinary');


routes.post('/uploadimage',imageUpload);


module.exports=routes;