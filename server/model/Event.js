const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: true,
  },
  images: [
    {
        type:String
    }
  ],
  description: {
    type: String,
    required: true, 
  },
  featured: {
    type: Boolean,
    required: true,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Club"
  },
  organizer:{
  type:String,
  require:true
  },
  approved:{
    type:Boolean,
    default:false
  },
  dateofevent: {
    type: Date, 
    required: true, 
  },
  seats:{
    type: Number,
    required: true
  }
},
{
  timestamps: true
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
