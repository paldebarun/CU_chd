const Event = require('../model/Event');
const Club = require('../model/Club');

exports.highlightedEventsRecent = async (req, res) => {
  try {
    const currDate = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(currDate.getDate()-7);

    const events = await Event.find({
      featured: true,
      dateofevent: {
        $gte: oneWeekLater
            },
      approved: true
    });

    const eventList = await Promise.all(events.map(async (event) => {
      const club = await Club.findById(event.club);
      return {
        name: event.name,
        description: event.description,
        images: event.images,
        clubName: club ? club.name : "Unknown Club",
        organizer: event.organizer,
        dateofevent:event.dateofevent
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

exports.unapprovedEvents = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const facultyAdvisorId = req.session.user._id;
    const clubDetails = await Club.findOne({ FacultyAdvisor: facultyAdvisorId });

    if (!clubDetails) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    const events = await Event.find({ approved: false, club: clubDetails._id });

    const eventList = await Promise.all(events.map(async (event) => {
      const club = await Club.findById(event.club);
      return {
        _id:event._id,
        name: event.name,
        description: event.description,
        images: event.images,
        clubName: club ? club.name : "Unknown Club",
        organizer: event.organizer,
        dateofevent:event.dateofevent
      };
    }));

    res.status(200).json({
      success: true,
      eventList
    });
  } catch (error) {
    console.error("Error fetching unapproved events:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error
    });
  }
};

exports.approveEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    res.status(201).json({
      message: "Event approved!!",
      success: true,
      event
    });
  } catch (error) {
    console.error("Error approving event:", error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error
    });
  }
};

exports.rejectEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event rejected",
      event
    });
  } catch (error) {
    console.error("Error rejecting event:", error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(201).json({
      message: "Event updated!!",
      success: true,
      updatedEvent
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error
    });
  }
};

exports.featureEvent= async (req,res)=>{
  try{
  const id = req.params.id;
  const event = await Event.findByIdAndUpdate(
    id,
    { featured: true },
    { new: true }
  );

  res.status(201).json({
    message: "Event approved!!",
    success: true,
    event
  });
} catch (error) {
  console.error("Error approving event:", error);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error
  });
}
};

exports.unfeatureEvent = async(req,res)=>{
  try{
    const id = req.params.id;
    const event = await Event.findByIdAndUpdate(
      id,
      { featured: false },
      { new: true }
    );
  
    res.status(201).json({
      message: "Event approved!!",
      success: true,
      event
    });
  } catch (error) {
    console.error("Error approving event:", error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error
    });
  }
  };