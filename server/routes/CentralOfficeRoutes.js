const express=require("express");
const routes=express.Router();

const {createCentralOfficeUser,updateCentralOfficeUser,deleteCentralOfficeUser,getAllCentralOfficeUsers} =require('../controllers/CentralOfficeController');

//fetching the central office users present
routes.get('/fetchallusers',getAllCentralOfficeUsers);

//route creating user
routes.post("/createUser",createCentralOfficeUser);

//updating user
routes.put("/updateUser/:id",updateCentralOfficeUser);

//delete user

routes.delete('/deleteUser/:id',deleteCentralOfficeUser);

//fetch all central office user


module.exports=routes;