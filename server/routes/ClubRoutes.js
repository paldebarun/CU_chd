const express = require('express');
const router = express.Router();
const clubController = require('../controllers/ClubControllers'); 
const centralOfficeMiddleware = require('../middlewares/centraloffice');
router.post('/clubs', clubController.createClub);
router.get('/clubs', clubController.getClubs);
router.get('/clubs/:id', clubController.getClubById);
router.put('/clubs/:id', clubController.updateClub);
router.delete('/clubs/:id', clubController.deleteClub);
router.get('/activeclubs',clubController.getActiveClubs);

module.exports = router;