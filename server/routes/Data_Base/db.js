var mysql = require('mysql');

var client = mysql.createConnection({
	//TODO : DB connect
	user : 'root',
	password : 'password',
	database : 'db name'
});

module.exports  = client;