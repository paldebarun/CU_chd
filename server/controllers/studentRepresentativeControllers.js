const StudentRepresentativeUser = require('../model/StudentRepresentative');

exports.getAllStudentRepresentativeUsers = async (req, res) => {
  try {
    const users = await StudentRepresentativeUser.find();
    res.status(200).json({
      message: "All Student Representative Users",
      success:true,
      users
    });
  } catch (error) {
    res.status(500).json({ 
        success:false,
        message: error.message });
  }
};


exports.createStudentRepresentativeUser = async (req, res) => {
    try {
      const { name, id, email, department } = req.body;
  
      const newUser = new StudentRepresentativeUser({
        name,
        id,
        email,
        department
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json({
        message: "Student Representative User created successfully",
        success:true,
        savedUser
      });
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: error.message });
    }
  };

  exports.updateStudentRepresentativeUser = async (req, res) => {
    try {
      const { id } = req.params; // This is the custom ID
      const { newid, name, email, department } = req.body;
    
      // Find the user by custom ID
      const user = await StudentRepresentativeUser.findOne({ id });
  
      // If the user doesn't exist, send a 404 response
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Update user details
      user.id = newid || user.id;
      user.name = name || user.name;
      user.email = email || user.email;
      user.department = department || user.department;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      // Send a success response with the updated user
      res.status(200).json({
        type: "Student Representative User updated successfully",
        success: true,
        updatedUser
      });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  


  exports.deleteStudentRepresentativeUser = async (req, res) => {
    try {
      const { id } = req.params; // This is the custom ID
  
      // Find the user by custom ID
      const user = await StudentRepresentativeUser.findOne({ id });
  
      // If the user doesn't exist, send a 404 response
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Delete the user
      await user.remove();
  
      // Send a success response with the deleted user details
      res.status(200).json({
        type: "Student Representative User",
        success: true,
        deletedUser: user
      });
    } catch (error) {
      // Handle errors and send an error response
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  