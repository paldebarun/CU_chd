const StudentRepresentativeUser = require('../model/StudentRepresentative');


function studentRepresentativeMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    StudentRepresentativeUser.findOne({
        email:username,
    }).then(function(value){
        if(value){
            next();
        }
        else{
            res.status(403).json({
                msg:"Not authorized"
            })
        }
    })
}


module.exports = studentRepresentativeMiddleware;