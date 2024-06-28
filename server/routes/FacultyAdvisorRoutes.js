const express = require('express');
const router = express.Router();
const facultyAdvisorController = require('../controllers/FacultyAdvisorControllers'); 

// POST /api/faculty-advisors
router.post('/faculty-advisors', facultyAdvisorController.createFacultyAdvisor);

// GET /api/faculty-advisors
router.get('/faculty-advisors', facultyAdvisorController.getAllFacultyAdvisors);

// GET /api/faculty-advisors/:id
router.get('/faculty-advisors/:id', facultyAdvisorController.getFacultyAdvisorById);


// PUT /api/faculty-advisors/:id
router.put('/faculty-advisors/:id', facultyAdvisorController.updateFacultyAdvisor);


// DELETE /api/faculty-advisors/:id
router.delete('/faculty-advisors/:id', facultyAdvisorController.deleteFacultyAdvisor);



module.exports = router;
