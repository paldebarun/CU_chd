const Event = require('../model/Event'); 
const Club = require('../model/Club'); 
const Ticket = require('../model/Ticket');
const  {imageUpload} = require('../controllers/UplaodToCloudinary');
const { findById } = require('../model/centralOfficeUser');
exports.createEvent = async (req, res) => {
  try {
    const { name, description, featured, organizer, dateofevent , seats } = req.body;

    const uploadResult = await imageUpload(req);
    if (!uploadResult.success) {
      return res.status(400).json({
        success: false,
        message: uploadResult.message,
      });
    }
    const studentRep = req.headers.userid;
    const clubN = await Club.findOne({studentRepresentative: studentRep});
    const clubId = clubN._id;
    const imageURL = uploadResult.imageUrl;
    const images= [imageURL];
    // Create a new event
    const newEvent = new Event({
      name,
      images,
      description,
      featured,
      club: null, // Initialize club as null before update
      organizer,
      dateofevent,
      seats
    });

    // Save the event to get the _id
    await newEvent.save();
    // Find the associated Club by name and update its events array and set the club field in the event
    const club = await Club.findOneAndUpdate(
      { _id: clubId },
      { $push: { events: newEvent._id } },
      { new: true }
    );

    // If the club doesn't exist, send a 404 response


    // Update the event's club field with the club's _id
    newEvent.club = clubId;
    await newEvent.save(); // Save the event again to update the club field

    // Send a success response with the newly created event
    res.status(201).json({
      message: "Event created successfully",
      success: true,
      newEvent
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.approvedevents = async (req,res)=>{
  try{
    const events = await Event.find({approved:true});
    res.status(200).json({
      success:true,
      message:"Events fetched successfully",
      events});
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: 'Server error', error });
  }
  }

exports.register = async (req,res)=>{
  try{
    const { UID, StudentName , email , phoneNumber }= req.body;
    const event = req.params.id;
    const eventDetails = await Event.findById(event);
    if(eventDetails.seats > 0){
      const newTicket = new Ticket({
        UID,
        StudentName,
        email,
        phoneNumber,
        event,
        
      });
      await newTicket.save();
      await Event.findOneAndUpdate(
        { _id: event },
        {seats: eventDetails.seats-1 },
        { new: true }
      );
      res.status(201).json({
        message: "Ticket booked successfully",
        success: true,
        newTicket
      });
    }
    else{
      res.status(401).json({
        success:false,
        message: "Seats are filled sorry."
      })
    }
   

  }
  catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
exports.deleteEvent = async (req, res) => {
    try {
      const eventName = req.params.name; // Assuming event name is passed as a URL parameter
  
      // Find the event by name
      const event = await Event.findOne({ name: eventName });
  
      // If the event doesn't exist, send a 404 response
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      // Find the associated Club and update its events array
      const club = await Club.findByIdAndUpdate(
        event.club,
        { $pull: { events: event._id } },
        { new: true }
      );
  
      // If the club doesn't exist, log an error (shouldn't happen if club is properly managed)
      if (!club) {
        console.error(`Club with ID ${event.club} not found.`);
      }
  
      // Delete the event from the database
      await event.remove();
  
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
  };
