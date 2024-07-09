const express=require('express');
const app=express();
//configuring the env file
require('dotenv').config();
const ipRangeCheck = require('ip-range-check');
const path = require('path');

const Harshit = '152.58.0.0/16'; 
//configuring json formate usage
app.use(express.json());
//file upload configurations
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(session({
    secret: "cuchd",
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 3600000 // 1 hour
    }
}));



//connecting cloudinary
const cloudinary = require("./configurations/cloudinaryConnect");
cloudinary.cloudinaryConnect();

//importing and configuring the cors libray the handle the CORS error situation
const cors = require('cors');

app.use(cors({
    credentials : true,
    origin:true
}));
app.get('/',async(req,res)=>{
    await fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        ip = data.ip;
        console.log(ip); // Log IP address inside the .then() block
        if (ipRangeCheck(ip, Harshit)) {
            res.send("login");
        
          } else{
            res.send("Outside");
        
          }
    })
    .catch(error => {
        console.log("Error fetching IP address:", error);
    });
})

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

//club routes
const clubroutes=require('./routes/ClubRoutes');
app.use('/api/clubroutes',clubroutes);

//faculty advisor routes
const facultyadvisorRoutes=require('./routes/FacultyAdvisorRoutes');
app.use('/api/facultyadvisorRoutes',facultyadvisorRoutes);

//event routes
const eventRoutes=require('./routes/EvenTRoutes');
app.use('/api/eventroutes',eventRoutes);


//image upload 
const imageUploadRoutes=require('./routes/FileUploadRoutes');
app.use('/api/imageupload',imageUploadRoutes);

const memberRoutes = require('./routes/memberRoutes');
app.use('/api/member',memberRoutes);




//the application listening 
app.listen(process.env.PORT,()=>console.log(`the server is listening at ${process.env.PORT}`));