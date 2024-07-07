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
      const { Studentname, email, department } = req.body;
      const existing = await StudentRepresentativeUser.findOne({email});
      if(existing){
        return{
          message: "The current Student representative is already representing another club.",
          success:false
        };
        
      }
      const newUser = new StudentRepresentativeUser({
        name:Studentname,
        email,
        password:email,
        department
      });
  
      const savedUser = await newUser.save();
  
     return{
        success:true,
        savedUser
      };
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: error.message });
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await StudentRepresentativeUser.findOne({ email });
  
      // If the user doesn't exist, send a 404 response
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
  
      const isMatch = password==user.password;
  
      // If the passwords don't match, send a 401 response
      if (!isMatch) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }
  
      res.status(200).json({
        message: "Login successful",
        success: true,
        user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
  

  exports.updateStudentRepresentativeUser = async (req, res) => {
    try {
      const { id } = req.params; 
      const { name, email, department } = req.body;
      const existing = await StudentRepresentativeUser.findOne({email});
      if(existing && existing._id != id){
        res.status(404).json({
          success:false,
          message:"There is another user with this email address"
        });
      }
      else{
      // Find the user by custom ID
      const user = await StudentRepresentativeUser.findById(id);
  
      // If the user doesn't exist, send a 404 response
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Update user details
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
    }
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
  