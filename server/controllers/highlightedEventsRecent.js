const Event = require('../model/Event'); 
const Club = require('../model/Club');

exports.highlightedEventsRecent = async (req,res)=>{
    var currDate = new Date();
    var oneWeekLater = new Date();
    oneWeekLater.setDate(currDate.getDate() + 7);
const events = await Event.find({featured:true,dateofevent:{
    $gte: currDate,
    $lte: oneWeekLater
},approved:true});
const eventList = events.map(event=>({
    name: event.name,
    description: event.description,
    images : event.images,
    clubName :  Club.findOne({_id:event.club}).name,
    organizer: event.organizer
}))

res.send(eventList);
};
