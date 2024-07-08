const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventControllers'); 
const facultyAdvisorMiddleware = require('../middlewares/facultyadvisor');
const studentRepresentativeMiddleware = require('../middlewares/studentrepresentative');

const {highlightedEventsRecent,unapprovedEvents,approveEvent ,rejectEvent} = require('../controllers/highlightedEventsRecent');
// POST /events - Create a new event
router.post('/events',eventController.createEvent);

//REGISTER FOR AN EVENT
router.post("/register/:id",eventController.register);

// DELETE /events/:name - Delete an event by name
router.delete('/events/:name',studentRepresentativeMiddleware, eventController.deleteEvent);

router.get('/highlightedEventsRecent',highlightedEventsRecent);
router.get('/events',eventController.approvedevents);


router.get('/unapproved',unapprovedEvents);

router.post('/approveEvent/:id',approveEvent)

router.delete('/reject/:id',rejectEvent)

module.exports = router;
