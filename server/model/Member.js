const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  UID:{
    type:String,
    required:true
  },
  skills:{
    type: [String],
    required:true
  },
  department:{
    type: String,
    required:true
  },
  GraduationYear:{
    type: Number,
    required : true
  },
  phoneNumber: {
    type: Number,  
    required: true
  },
  experience:{
    type: [String],
    required : true
  },
  club:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club"
  },
  role: {
    type: String,  
    default: 'member'
  },
  approved:{
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Member = mongoose.model('Members', memberSchema);

module.exports = Member;
