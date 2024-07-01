const Member = require("../model/Member");
exports.apply = async (req,res)=>{
    try{
    const {name,email,UID,department,phoneNumber,skills,experience,GraduationYear} = req.body;
    const club = req.params.club;
    const newMember = new Member({
        name,
        email,
        UID,
        department,
        phoneNumber,
        skills,
        experience,
        GraduationYear,
        club
    });
    await newMember.save();
    res.status(201).json({
        success: true,
        message:"Successfully applied for club membership",
        newMember
    })
    }
    catch(error){
        res.status(401).json({
            success: false,
            message:error.message
        })
    }
}