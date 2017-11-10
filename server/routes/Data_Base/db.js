var mysql = require('mysql');

var client = mysql.createConnection({
	//TODO : DB connect
	user : '',
	password : ''
	database : ''
});

module.exports  = client;