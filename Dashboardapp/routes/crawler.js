var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

/* GET home page. */
router.get('/crawler', function(req, res, next) {
    debugger;
    //抓取野手成績
 request({
    url: "http://www.cpbl.com.tw/stats/all.html?&game_type=01&year=2019&stat=pbat&sort=AVG&order=desc",
    method: "GET"
  }, function(e,r,b) {
    if(e || !b) { return; }
    var $ = cheerio.load(b);
    var result = [];
    var tr = $("tr");

    for(var i=0;i<tr.length;i++) {
    const table_td = tr.eq(i).find('td');
    var tr_data=[];
    for(var j=1;j<table_td.length;j++){
        const td_data = table_td.eq(j).text();
        tr_data.push(td_data);
    }
    console.log(tr_data);
      result.push(tr_data);
    }
  //console.log(result);
  });


  res.render('index', { title: 'Express' });
});

module.exports = router;
