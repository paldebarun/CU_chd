const CentralOfficeUser = require('../model/centralOfficeUser')


function centralOfficeMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    CentralOfficeUser.findOne({
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


module.exports = centralOfficeMiddleware;