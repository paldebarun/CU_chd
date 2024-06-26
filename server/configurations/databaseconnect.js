const mongoose=require('mongoose');

require('dotenv').config();


exports.databaseConnect=()=>{
 
        mongoose.connect(process.env.DATABASE_URI,{
            

        }).then(()=>{
            console.log("database is connected successfully");
        }).catch((error)=>{console.log("database not connected successfully")});


    
};