const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['central office', 'admin', 'public', 'student', 'faculty advisor', 'student representative'],
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;