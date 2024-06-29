const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventControllers'); // Adjust the path as needed
const {highlightedEventsRecent} = require('../controllers/highlightedEventsRecent');
// POST /events - Create a new event
router.post('/events', eventController.createEvent);

// DELETE /events/:name - Delete an event by name
router.delete('/events/:name', eventController.deleteEvent);

router.get('/highlightedEventsRecent',highlightedEventsRecent);

module.exports = router;
