const mongoose = require('mongoose');
const FacultyAdvisor = require('./FacultyAdvisor');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentRepresentative:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"StudentRepresentativeUser",
    required:true
  },
  FacultyAdvisor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"FacultyAdvisor"
  },
  Events:[
   { 
    type:mongoose.Schema.Types.ObjectId,
     ref:"Event"
   }
  ]
});

const Club = mongoose.model('Club', ClubSchema);

module.exports = Club;
