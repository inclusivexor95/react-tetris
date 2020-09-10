const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/api/scores');



router.get('/', scoresCtrl.index);
router.post('/', scoresCtrl.logScore);



module.exports = router;