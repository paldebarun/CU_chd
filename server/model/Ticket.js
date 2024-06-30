const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    StudentName: {
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
  phoneNumber: {
    type: Number,  
    required: true
  },
  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  role: {
    type: String,  
    default: 'student'
  }
}, {
  timestamps: true
});

const Ticket = mongoose.model('Tickets', ticketSchema);

module.exports = Ticket;
