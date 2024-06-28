const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers'); // Adjust the path as needed

// POST /events - Create a new event
router.post('/events', eventController.createEvent);

// DELETE /events/:name - Delete an event by name
router.delete('/events/:name', eventController.deleteEvent);



module.exports = router;
