const express = require('express');
const router = express.Router();
const facultyAdvisorController = require('../controllers/FacultyAdvisorControllers'); 
const studentRepresentativeMiddleware = require('../middlewares/studentrepresentative');
// POST /api/faculty-advisors
router.post('/faculty-advisors', studentRepresentativeMiddleware,facultyAdvisorController.createFacultyAdvisor);

router.post('/login',facultyAdvisorController.login);
// GET /api/faculty-advisors
router.get('/faculty-advisors', facultyAdvisorController.getAllFacultyAdvisors);

// GET /api/faculty-advisors/:id
router.get('/faculty-advisors/:id', facultyAdvisorController.getFacultyAdvisorById);


// PUT /api/faculty-advisors/:id
router.put('/faculty-advisors/:id', facultyAdvisorController.updateFacultyAdvisor);


// DELETE /api/faculty-advisors/:id
router.delete('/faculty-advisors/:id', facultyAdvisorController.deleteFacultyAdvisor);



module.exports = router;
