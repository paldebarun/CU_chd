const User = require('../model/user');

exports.createUser = async (req, res) => {
  try {
    // Destructure the user details from the request body
    const { name, email, id, role } = req.body;
    
    // Create a new user instance
    const newUser = new User({
      name,
      email,
      id,
      role
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};
