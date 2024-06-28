const Event = require('../model/Event'); 
const Club = require('../model/Club'); 

exports.createEvent = async (req, res) => {
  try {
    const { name, images, description, featured, clubName, organizer, dateofevent } = req.body;

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
