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
      const { id } = req.params;
      const {newid, name, email, department } = req.body;
  
      const updatedUser = await StudentRepresentativeUser.findByIdAndUpdate(
        id,
        { id:newid,name, email, department },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        type: "Student Representative User updated successfully",
        success:true,
        updatedUser
      });
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: error.message });
    }
  };




exports.deleteStudentRepresentativeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await StudentRepresentativeUser.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      type: "Student Representative User",
      success:true,
      deletedUser
    });
  } catch (error) {
    res.status(500).json({ 
        success:false,
        message: error.message });
  }
};
