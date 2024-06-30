const CentralOfficeUser = require('../model/centralOfficeUser');
require('dotenv').config();
const bcrypt = require("bcrypt");


exports.getAllCentralOfficeUsers = async (req, res) => {
  try {
    // Fetch all central office users from the database
    const users = await CentralOfficeUser.find();

    // Send a success response with the list of users
    res.status(200).json({
      message: "All Central Office Users",
      success:true,
      users
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success:false, message: error.message });
  }
};


exports.createCentralOfficeUser = async (req, res) => {
  try {
    // Destructure the user details from the request body
    const { name, email } = req.body;
    const saltRounds = parseInt(process.env.SALTROUNDS, 10);

    const hash = await bcrypt.hash(email, saltRounds);

    // Create a new user instance
    const newUser = new CentralOfficeUser({
      name,
      email,
      password:hash
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json({
      message: "Central Office User created successfully",
      success:true,
      savedUser
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success:false,
      message: error.message });
  }
};

exports.loginCentralOfficeUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await CentralOfficeUser.findOne({ email });

    // If the user doesn't exist, send a 404 response
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

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


exports.updateCentralOfficeUser = async (req, res) => {
  try {
    // Destructure the user details from the request body
    const { name, email, newid } = req.body;
    
    // Find the user by custom ID
    const user = await CentralOfficeUser.findOne({ id: req.params.id });

    // If the user doesn't exist, send a 404 response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Updates user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.id = newid || user.id;

    // Saves the updated user
    const updatedUser = await user.save();

    // Sends a success response with the updated user
    res.status(200).json({
      message: "Central Office User updated successfully",
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





exports.deleteCentralOfficeUser = async (req, res) => {
  try {
    // Find the user by custom ID
    const user = await CentralOfficeUser.findOne({ id: req.params.id });

    // If the user doesn't exist, send a 404 response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete the user
    await user.remove();

    // Send a success response with the deleted user details
    res.status(200).json({
      message: "Central Office User deleted successfully",
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
