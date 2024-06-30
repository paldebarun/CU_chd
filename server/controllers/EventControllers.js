const Event = require('../model/Event'); 
const Club = require('../model/Club'); 
const Ticket = require('../model/Ticket');
const  {imageUpload} = require('../controllers/UplaodToCloudinary');
exports.createEvent = async (req, res) => {
  try {
    const { name, description, featured, clubName, organizer, dateofevent } = req.body;

    const uploadResult = await imageUpload(req);
    if (!uploadResult.success) {
      return res.status(400).json({
        success: false,
        message: uploadResult.message,
      });
    }

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
      dateofevent
    });

    // Save the event to get the _id
    await newEvent.save();
    // Find the associated Club by name and update its events array and set the club field in the event
    const club = await Club.findOneAndUpdate(
      { name: clubName },
      { $push: { events: newEvent._id } },
      { new: true }
    );

    // If the club doesn't exist, send a 404 response
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    // Update the event's club field with the club's _id
    newEvent.club = club._id;
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
exports.register = async (req,res)=>{
  try{
    const { UID, StudentName , email , phoneNumber }= req.body;
    const event = req.params.id;
    const newTicket = new Ticket({
      UID,
      StudentName,
      email,
      phoneNumber,
      event,
      
    });
    await newTicket.save();
    res.status(201).json({
      message: "Ticket booked successfully",
      success: true,
      newTicket
    });

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
