const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventControllers'); 
const studentRepresentativeMiddleware = require('../middlewares/studentrepresentative');

const {highlightedEventsRecent} = require('../controllers/highlightedEventsRecent');
// POST /events - Create a new event
router.post('/events', studentRepresentativeMiddleware,eventController.createEvent);

// DELETE /events/:name - Delete an event by name
router.delete('/events/:name',studentRepresentativeMiddleware, eventController.deleteEvent);

router.get('/highlightedEventsRecent',highlightedEventsRecent);

module.exports = router;
