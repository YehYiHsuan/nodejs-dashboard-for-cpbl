var express = require('express');
var router = express.Router();

var crawlercontroller = require('../controllers/crawler');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/crawler/pbat', crawlercontroller.FetchBattingStat);
router.get('/crawler/ppit', crawlercontroller.FetchPitchingStat);
router.get('/crawler/team', crawlercontroller.FetchTeamStat);
router.get('/crawler/game', crawlercontroller.FetchDailyStat);




module.exports = router;