const express = require('express');
const router = express.Router();
const clubController = require('../controllers/ClubControllers'); 

router.post('/clubs', clubController.createClub);
router.get('/clubs', clubController.getClubs);
router.get('/clubs/:id', clubController.getClubById);
router.put('/clubs/:id', clubController.updateClub);
router.delete('/clubs/:id', clubController.deleteClub);

module.exports = router;