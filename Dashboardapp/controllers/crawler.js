var request = require("request");
var cheerio = require("cheerio");

exports.FetchBattingStat = function (req, res) {
 var result = [];
    var colname=[];

    //抓取野手成績
 request({
    url: "http://www.cpbl.com.tw/stats/all.html?&game_type=01&year=2019&stat=pbat&sort=AVG&order=desc",
    method: "GET"
  }, function(e,r,b) {
    if(e || !b) { return; }
    var $ = cheerio.load(b);
    //var result = [];
    var tr = $("tr");
    var th = $("th");
    var table_row;
    var th_data;
    var td_data;
    for(var i=0;i<tr.length;i++) {
        if(i==0){
         table_row = tr.eq(i).find('th');
        }else{
         table_row = tr.eq(i).find('td');
        }

    var tr_data={};

    for(var j=1;j<table_row.length;j++){
        if(i==0){
         th_data = table_row.eq(j).text();
            colname.push(th_data);
        }else{
         td_data = table_row.eq(j).text();
            tr_data[colname[j-1]]=td_data;
        }
    }
    //console.log(tr_data);
      result.push(tr_data);
    }
     res.render('crawler', { title: 'BaseBall Statistics',subtitle: 'Batting Statistics',col:colname,data: result
  });

   });
};

exports.FetchPitchingStat = function (req, res) {
 var result = [];
    var colname=[];

    //抓取野手成績
 request({
    url: "http://www.cpbl.com.tw/stats/all.html?&game_type=01&online=1&year=2019&stat=ppit&sort=ERA&order=desc",
    method: "GET"
  }, function(e,r,b) {
    if(e || !b) { return; }
    var $ = cheerio.load(b);
    //var result = [];
    var tr = $("tr");
    var th = $("th");
    var table_row;
    var th_data;
    var td_data;
    for(var i=0;i<tr.length;i++) {
        if(i==0){
         table_row = tr.eq(i).find('th');
        }else{
         table_row = tr.eq(i).find('td');
        }

    var tr_data={};

    for(var j=1;j<table_row.length;j++){
        if(i==0){
         th_data = table_row.eq(j).text();
            colname.push(th_data);
        }else{
         td_data = table_row.eq(j).text();
            tr_data[colname[j-1]]=td_data;
        }
    }
    //console.log(tr_data);
      result.push(tr_data);
    }
     res.render('crawler', { title: 'BaseBall Statistics',subtitle: 'Pitching Statistics',col:colname,data: result
  });

   });
};