const mongoose = require('mongoose');

const studentRepresentativeUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  department: {
    type: String,  
    required: true
  },
  role: {
    type: String,  
    default: 'student_representative'
  }
}, {
  timestamps: true
});

const StudentRepresentativeUser = mongoose.model('StudentRepresentativeUser', studentRepresentativeUserSchema);

module.exports = StudentRepresentativeUser;
