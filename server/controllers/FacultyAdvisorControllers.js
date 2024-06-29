const FacultyAdvisor = require('../model/FacultyAdvisor'); 
const Club = require('../model/Club'); 

exports.createFacultyAdvisor = async (req, res) => {
  try {
    const { name,email,clubName } = req.body;

    // Find the club by name
    const password= email;
    const existing = await FacultyAdvisor.findOne({email});
    if(existing){
      res.status(400).json({
        message: "The current faculty advisor is already managing another club.",
        success:false
      });
      return;
    }

    // Create a new Faculty Advisor
    const newFacultyAdvisor = new FacultyAdvisor({
      name,
      email,
      password
    });

    // Save the Faculty Advisor
    await newFacultyAdvisor.save();

    const club = await Club.findOneAndUpdate({ name: clubName },{FacultyAdvisor: newFacultyAdvisor._id });

    // If the club doesn't exist, send a 404 response
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }
    await newFacultyAdvisor.save();


    // Send a success response with the new Faculty Advisor
    res.status(201).json({
      message: "Faculty Advisor created successfully",
      success: true,
      newFacultyAdvisor
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.updateFacultyAdvisor = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, clubName, newid } = req.body;
  
      // Find the Faculty Advisor by custom ID
      const facultyAdvisor = await FacultyAdvisor.findOne({ id });
  
      // If the Faculty Advisor doesn't exist, send a 404 response
      if (!facultyAdvisor) {
        return res.status(404).json({ success: false, message: "Faculty Advisor not found" });
      }
  
      // If a new club name is provided, find the club by name
      if (clubName) {
        const club = await Club.findOne({ name: clubName });
        if (!club) {
          return res.status(404).json({ success: false, message: "Club not found" });
        }
        facultyAdvisor.club = club._id;
      }
  
      // Update Faculty Advisor details
      facultyAdvisor.name = name || facultyAdvisor.name;
      facultyAdvisor.email = email || facultyAdvisor.email;
      facultyAdvisor.id = newid || facultyAdvisor.id;
  
      // Save the updated Faculty Advisor
      const updatedFacultyAdvisor = await facultyAdvisor.save();
  
      // Send a success response with the updated Faculty Advisor
      res.status(200).json({
        message: "Faculty Advisor updated successfully",
        success: true,
        updatedFacultyAdvisor
      });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };


  exports.deleteFacultyAdvisor = async (req, res) => {
    try {
      const { id } = req.params; // This is the custom ID
  
      // Find the Faculty Advisor by custom ID
      const facultyAdvisor = await FacultyAdvisor.findOne({ id });
  
      // If the Faculty Advisor doesn't exist, send a 404 response
      if (!facultyAdvisor) {
        return res.status(404).json({ success: false, message: "Faculty Advisor not found" });
      }
  
      // Delete the Faculty Advisor
      await facultyAdvisor.remove();
  
      // Send a success response with the deleted Faculty Advisor details
      res.status(200).json({
        message: "Faculty Advisor deleted successfully",
        success: true,
        deletedFacultyAdvisor: facultyAdvisor
      });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

 

exports.getAllFacultyAdvisors = async (req, res) => {
  try {
    // Fetch all Faculty Advisors and populate the associated Club information
    const facultyAdvisors = await FacultyAdvisor.find().populate('club');

    // Send a success response with the list of Faculty Advisors
    res.status(200).json({
      message: "Faculty Advisors fetched successfully",
      success: true,
      facultyAdvisors
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getFacultyAdvisorById = async (req, res) => {
    try {
      const { id } = req.params; // This is the custom ID
  
      // Find the Faculty Advisor by custom ID and populate the associated Club information
      const facultyAdvisor = await FacultyAdvisor.findOne({ id }).populate('club');
  
      // If the Faculty Advisor doesn't exist, send a 404 response
      if (!facultyAdvisor) {
        return res.status(404).json({ success: false, message: "Faculty Advisor not found" });
      }
  
      // Send a success response with the Faculty Advisor details
      res.status(200).json({
        message: "Faculty Advisor fetched successfully",
        success: true,
        facultyAdvisor
      });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };