const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: true
    },
    dateofachievement: {
        type: Date,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
}, {
    timestamps: true 
});

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;
