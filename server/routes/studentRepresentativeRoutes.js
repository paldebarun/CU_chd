const express = require('express');
const centralOfficeMiddleware = require("../middlewares/centraloffice");
const router = express.Router();
const {
  getAllStudentRepresentativeUsers,
  createStudentRepresentativeUser,
  updateStudentRepresentativeUser,
  deleteStudentRepresentativeUser,
  login
} = require('../controllers/studentRepresentativeControllers');

// Route for fetching all student representative users
router.get('/getAllUsers', getAllStudentRepresentativeUsers);


// Route for creating a student representative user
router.post('/createUser', centralOfficeMiddleware,createStudentRepresentativeUser);

router.post('/login',login);

// Route for updating a student representative user (using user ID as a parameter)
router.put('/updateUser/:id',centralOfficeMiddleware, updateStudentRepresentativeUser);

// Route for deleting a student representative user (using user ID as a parameter)
router.delete('/deleteUser/:id', deleteStudentRepresentativeUser);

module.exports = router;
