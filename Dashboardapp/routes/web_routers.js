var express = require('express');
var router = express.Router();

var crawlercontroller = require('../controllers/crawler');

router.get('/crawler/pbat', crawlercontroller.FetchBattingStat);
router.get('/crawler/ppit', crawlercontroller.FetchPitchingStat);



module.exports = router;