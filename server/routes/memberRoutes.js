const express = require('express');
const router = express.Router();

const {apply} = require("../controllers/MemberController");

router.post('/apply/:club',apply);

module.exports = router;
