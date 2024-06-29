const Event = require('../model/Event'); 
const Club = require('../model/Club');

exports.highlightedEventsRecent = async (req,res)=>{
    try{
    var currDate = new Date();
    var oneWeekLater = new Date();
    oneWeekLater.setDate(currDate.getDate() + 7);
const events = await Event.find({featured:true,dateofevent:{
    $gte: currDate,
    $lte: oneWeekLater
},approved:true});
const eventList = await Promise.all(events.map(async (event) => {
    const club = await Club.findById(event.club);
    return {
        name: event.name,
        description: event.description,
        images: event.images,
        clubName: club ? club.name : "Unknown Club", // Handle case where club is not found
        organizer: event.organizer
    };
}));

res.status(200).json(eventList);
} catch (error) {
    console.error("Error fetching highlighted events:", error);
    res.status(500).json({ 
        success: false,
        message: 'Server error',
        error 
    });
}
};
