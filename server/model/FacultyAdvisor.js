const mongoose = require('mongoose');

const FacultyAdvisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club", 
    required: true,
  }
}, {
  timestamps: true
});

const FacultyAdvisor = mongoose.model('FacultyAdvisor', FacultyAdvisorSchema);

module.exports = FacultyAdvisor;
