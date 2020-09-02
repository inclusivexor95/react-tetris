const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/api/scores');


router.get('/', scoresCtrl.index);



module.exports = router;