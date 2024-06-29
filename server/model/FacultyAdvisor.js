const mongoose = require('mongoose');

const FacultyAdvisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required: true
  }
}, {
  timestamps: true
});

const FacultyAdvisor = mongoose.model('FacultyAdvisor', FacultyAdvisorSchema);

module.exports = FacultyAdvisor;
