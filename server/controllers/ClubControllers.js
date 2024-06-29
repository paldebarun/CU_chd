const Club = require('../model/Club'); 
const {createStudentRepresentativeUser} = require('../controllers/studentRepresentativeControllers');
//Create a Club
exports.createClub = async (req,res) => {
  try {
    const { name } = req.body;
    const { savedUser } = await createStudentRepresentativeUser(req);
    const newClub = new Club({ name ,studentRepresentative: savedUser._id    });
    await newClub.save();
    res.status(201).json({
        message:"club created successfully",
        success:true,
        newClub});
  } catch (error) {
    res.status(500).json({ 
        success:false,
        message: 'Server error', error });
  }
};

//Fetch All Clubs
exports.getClubs = async (req, res) => {
    try {
      const clubs = await Club.find().populate('Events');
      res.status(200).json({
        success:true,
        message:"clubs fetched successfully",
        clubs});
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: 'Server error', error });
    }
  };

  //Fetch a Single Club
  exports.getClubById = async (req, res) => {
    try {
      const club = await Club.findById(req.params.id).populate('Events');
      if (!club) {
        return res.status(404).json({ 
            success:false,
            message: 'Club not found' });
      }
      res.status(200).json({
        success:true,
        message:"club fetched successfully",
        club});
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: 'Server error', error });
    }
  };
  
//Update a Club

exports.updateClub = async (req, res) => {
    try {
      const { name } = req.body;
      const club = await Club.findById(req.params.id);
  
      if (!club) {
        return res.status(404).json({ 
            success:false,
            message: 'Club not found' });
      }
  
      club.name = name || club.name;
      await club.save();
      res.status(200).json(
        {message:"successfully upfdated club",
        success:true,
        club});
    } catch (error) {
      res.status(500).json({ 
        success:false,
        
        message: 'Server error', error });
    }
  };

  //deleting a club
  exports.deleteClub = async (req, res) => {
    try {
      const club = await Club.findById(req.params.id);
  
      if (!club) {
        return res.status(404).json({
            success:false,
            message: 'Club not found' });
      }
  
      await club.remove();
      res.status(200).json({ 
        success:true,
        message: 'Club deleted successfully' });
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: 'Server error', error });
    }
  };
  
  
