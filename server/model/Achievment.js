const mongoose=require('mongoose');

const AchievmentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    images:[
        {
            type:String
        }
    ],
    description:{
        type:String,
        require:true
    },
    club:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club"
    },
    event:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Event"
    }
})