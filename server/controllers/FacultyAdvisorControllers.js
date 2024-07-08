const FacultyAdvisor = require('../model/FacultyAdvisor');
const Club = require('../model/Club');

exports.createFacultyAdvisor = async (req, res) => {
  try {
    const { name, email, clubName } = req.body;
    const password = email;
    const existing = await FacultyAdvisor.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "The current faculty advisor is already managing another club.",
        success: false
      });
    }

    const newFacultyAdvisor = new FacultyAdvisor({
      name,
      email,
      password
    });

    await newFacultyAdvisor.save();

    const club = await Club.findOneAndUpdate(
      { name: clubName },
      { FacultyAdvisor: newFacultyAdvisor._id }
    );

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    res.status(201).json({
      message: "Faculty Advisor created successfully",
      success: true,
      newFacultyAdvisor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FacultyAdvisor.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    req.session.user = user;
    req.session.save(err => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to save session"
        });
      }
  });

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

exports.updateFacultyAdvisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, clubName, newid } = req.body;

    const facultyAdvisor = await FacultyAdvisor.findById(id);

    if (!facultyAdvisor) {
      return res.status(404).json({ success: false, message: "Faculty Advisor not found" });
    }

    if (clubName) {
      const club = await Club.findOne({ name: clubName });
      if (!club) {
        return res.status(404).json({ success: false, message: "Club not found" });
      }
      facultyAdvisor.club = club._id;
    }

    facultyAdvisor.name = name || facultyAdvisor.name;
    facultyAdvisor.email = email || facultyAdvisor.email;
    facultyAdvisor.id = newid || facultyAdvisor.id;

    const updatedFacultyAdvisor = await facultyAdvisor.save();

    res.status(200).json({
      message: "Faculty Advisor updated successfully",
      success: true,
      updatedFacultyAdvisor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteFacultyAdvisor = async (req, res) => {
  try {
    const { id } = req.params;
    const facultyAdvisor = await FacultyAdvisor.findById(id);

    if (!facultyAdvisor) {
      return res.status(404).json({ success: false, message: "Faculty Advisor not found" });
    }

    await facultyAdvisor.remove();

    res.status(200).json({
      message: "Faculty Advisor deleted successfully",
      success: true,
      deletedFacultyAdvisor: facultyAdvisor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllFacultyAdvisors = async (req, res) => {
  try {
    const facultyAdvisors = await FacultyAdvisor.find().populate('club');

    res.status(200).json({
      message: "Faculty Advisors fetched successfully",
      success: true,
      facultyAdvisors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getFacultyAdvisorById = async (req, res) => {
  try {
    const { id } = req.params;
    const facultyAdvisor = await FacultyAdvisor.findById(id).populate('club');

    if (!facultyAdvisor) {
      return res.status(404).json({ success: false, message: "Faculty Advisor not found" });
    }

    res.status(200).json({
      message: "Faculty Advisor fetched successfully",
      success: true,
      facultyAdvisor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
