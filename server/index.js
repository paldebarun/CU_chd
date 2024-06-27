const express=require('express');
const app=express();

//configuring the env file
require('dotenv').config();

//configuring json formate usage
app.use(express.json());

//importing and configuring the cors libray the handle the CORS error situation
const cors = require('cors');

app.use(cors({
    credentials : true,
    origin:true
}));


//connnecting our database
const {databaseConnect} =require('../server/configurations/databaseconnect');
databaseConnect();

//connecting cloudinary
const {cloudinaryConnect} =require('../server/configurations/cloudinaryConnect');
cloudinaryConnect();

//central office user routes
const CentralOfficeRoutes = require("./routes/CentralOfficeRoutes");
app.use("/api/centraloffice", CentralOfficeRoutes);

//student representative routes
const studentRepresentativeRoutes = require('./routes/studentRepresentativeRoutes');
app.use('/api/studentrepresentative',studentRepresentativeRoutes);

//the application listening 
app.listen(process.env.PORT,()=>console.log(`the server is listening at ${process.env.PORT}`));