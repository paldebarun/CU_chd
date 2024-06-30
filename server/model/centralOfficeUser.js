const mongoose = require('mongoose');

const CentralOfficeUserSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['central office'],
    required: true,
    default: 'central office'
  }
}, {
  timestamps: true
});

const CentralOfficeUser = mongoose.model('CentralOfficeUser', CentralOfficeUserSchema);

module.exports = CentralOfficeUser;
