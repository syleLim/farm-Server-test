var mysql = require('mysql');

var client = mysql.createConnection({
	user : 'root',
	password : 'sql8439kor!A',
	database : 'test_data'
});

module.exports  = client;