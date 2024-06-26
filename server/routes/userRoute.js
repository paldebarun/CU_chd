const express=require("express");
const routes=express.Router();

const {createUser} =require('../controllers/creatingUsers');

//route creating user
routes.post("/createUser",createUser);

module.exports=routes;