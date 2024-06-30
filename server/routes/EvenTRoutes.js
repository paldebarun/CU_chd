const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventControllers'); 
const facultyAdvisorMiddleware = require('../middlewares/facultyadvisor');
const studentRepresentativeMiddleware = require('../middlewares/studentrepresentative');

const {highlightedEventsRecent,unapprovedEvents} = require('../controllers/highlightedEventsRecent');
// POST /events - Create a new event
router.post('/events', studentRepresentativeMiddleware,eventController.createEvent);

//REGISTER FOR AN EVENT
router.post("/register/:id",eventController.register);

// DELETE /events/:name - Delete an event by name
router.delete('/events/:name',studentRepresentativeMiddleware, eventController.deleteEvent);

router.get('/highlightedEventsRecent',highlightedEventsRecent);

router.get('/unapproved',facultyAdvisorMiddleware,unapprovedEvents);


module.exports = router;
