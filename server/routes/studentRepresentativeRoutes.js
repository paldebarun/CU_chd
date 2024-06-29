const express = require('express');
const router = express.Router();
const {
  getAllStudentRepresentativeUsers,
  createStudentRepresentativeUser,
  updateStudentRepresentativeUser,
  deleteStudentRepresentativeUser
} = require('../controllers/studentRepresentativeControllers');

// Route for fetching all student representative users
router.get('/getAllUsers', getAllStudentRepresentativeUsers);

// Route for creating a student representative user
router.post('/createUser', createStudentRepresentativeUser);

// Route for updating a student representative user (using user ID as a parameter)
router.put('/updateUser/:id', updateStudentRepresentativeUser);

// Route for deleting a student representative user (using user ID as a parameter)
router.delete('/deleteUser/:id', deleteStudentRepresentativeUser);

module.exports = router;
