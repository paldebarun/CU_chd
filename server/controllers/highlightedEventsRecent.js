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
exports.unapprovedEvents = async (req,res)=>{
    try{
    const FacultyAdvisor = req.headers.userid;
    const clubDetails = await Club.findOne({FacultyAdvisor})
    const club = clubDetails._id;

    const events = await Event.find({approved:false,club});
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
}

exports.approveEvent= async (req,res)=>{
    try{
        const id = req.params.id;
        const event = await Event.findByIdAndUpdate(
            id,
            {approved:true },
            { new: true }
          );
          res.status(201).json({
            message: "Event approved!!",
            success: true,
            event
          });
    }
    catch(error){
        console.error("Error fetching highlighted events:", error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error 
        });
    }
}
exports.rejectEvent = async (req,res)=>{
    try {
        const eventName = req.params.id; // Assuming event name is passed as a URL parameter
    
        // Find the event by name
        const event = await Event.findById(eventName);
    
        // If the event doesn't exist, send a 404 response
        if (!event) {
          return res.status(404).json({ success: false, message: "Event not found" });
        }
        
            // Delete the event from the database

        await Event.deleteOne({_id:eventName});
    
        // Send a success response
        res.status(200).json({
          message: "Event deleted successfully",
          success: true,
          deletedEvent: event
        });
      } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
}