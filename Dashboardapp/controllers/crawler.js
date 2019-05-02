var request = require("request");
var cheerio = require("cheerio");
/*抓取野手成績 */
exports.FetchBattingStat = function(req, res) {
	var result = [];
	var colname = ["TEAM"];
	//抓取野手成績
	request({
		url: "http://www.cpbl.com.tw/stats/all.html?&game_type=01&year=2019&stat=pbat&sort=AVG&order=desc",
		method: "GET"
	}, function(e, r, b) {
		if (e || !b) {
			return;
		}
		var $ = cheerio.load(b);
		//var result = [];
		var tr = $("tr");
		var th = $("th");
		var table_row;
		var th_data;
		var td_data;
		for (var i = 0; i < tr.length; i++) {
			if (i == 0) {
				table_row = tr.eq(i).find('th');
			} else {
				table_row = tr.eq(i).find('td');
			}
			var tr_data = {};
			for (var j = 1; j < table_row.length; j++) {
				if (i == 0) {
					th_data = table_row.eq(j).text();
					colname.push(th_data);
				} else {
					if (j == 1) {
						var team = table_row.eq(j).find('img').eq(0).attr('src');
						if (team.includes("B04")) {
							tr_data["team"] = "Fubon";
						} else if (team.includes("L01")) {
							tr_data["team"] = "Uni";
						} else if (team.includes("A02")) {
							tr_data["team"] = "Lamigo";
						} else if (team.includes("E02")) {
							tr_data["team"] = "Brothers";
						}
					}
					td_data = table_row.eq(j).text();
					tr_data[colname[j - 1]] = td_data;
				}
			}
			result.push(tr_data);
		}
		res.render('crawler', {
			title: 'BaseBall Statistics',
			subtitle: 'Batting Statistics',
			col: colname,
			data: result
		});
	});
};
/*抓取投手成績 */
exports.FetchPitchingStat = function(req, res) {
	var result = [];
	var colname = ["TEAM"];
	//抓取野手成績
	request({
		url: "http://www.cpbl.com.tw/stats/all.html?&game_type=01&online=1&year=2019&stat=ppit&sort=ERA&order=desc",
		method: "GET"
	}, function(e, r, b) {
		if (e || !b) {
			return;
		}
		var $ = cheerio.load(b);
		//var result = [];
		var tr = $("tr");
		var th = $("th");
		var table_row;
		var th_data;
		var td_data;
		for (var i = 0; i < tr.length; i++) {
			if (i == 0) {
				table_row = tr.eq(i).find('th');
			} else {
				table_row = tr.eq(i).find('td');
			}
			var tr_data = {};
			for (var j = 1; j < table_row.length; j++) {
				if (i == 0) {
					th_data = table_row.eq(j).text();
					colname.push(th_data);
				} else {
					if (j == 1) {
						var team = table_row.eq(j).find('img').eq(0).attr('src');
						if (team.includes("B04")) {
							tr_data["team"] = "Fubon";
						} else if (team.includes("L01")) {
							tr_data["team"] = "Uni";
						} else if (team.includes("A02")) {
							tr_data["team"] = "Lamigo";
						} else if (team.includes("E02")) {
							tr_data["team"] = "Brothers";
						}
					}
					td_data = table_row.eq(j).text();
					tr_data[colname[j - 1]] = td_data;
				}
			}
			result.push(tr_data);
		}
		res.render('crawler', {
			title: 'BaseBall Statistics',
			subtitle: 'Pitching Statistics',
			col: colname,
			data: result
		});
	});
};
/*抓取團隊成績 */
exports.FetchTeamStat = function(req, res) {
	var results = [];
	var colname = [];
	request({
		url: "http://www.cpbl.com.tw/standing/season.html",
		method: "GET"
	}, function(e, r, b) {
		if (e || !b) {
			return;
		}
		var $ = cheerio.load(b);
		//var result = [];
		var tables = $("table");
		var table_row;
		var th_data;
		var td_data;
		for (var i = 0; i < tables.length; i++) {
			var result = [];
			table_th = tables.eq(i).find('th');
			var cols = [];
			for (var t = 0; t < table_th.length; t++) {
				cols.push(table_th.eq(t).text());
			}
			//console.log(cols);
			colname.push(cols);
			table_row = tables.eq(i).find('tr');
			for (var r = 0; r < table_row.length; r++) {
				var tr_data = {};
				var tds = table_row.eq(r).find('td');
				for (var d = 0; d < tds.length; d++) {
					tr_data[colname[i][d]] = tds.eq(d).text();
				}
				result.push(tr_data);
			}
			results.push(result);
		}
		res.render('crawler', {
			title: 'BaseBall Statistics',
			subtitle: 'Team Statistics',
			cols: colname,
			datas: results
		});
	});
};