const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  facultyAdvisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FacultyAdvisor" 
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
