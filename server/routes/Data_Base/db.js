var mysql = require('mysql');

var client = mysql.createConnection({
	//TODO : DB connect
	user : 'root',
	password : 'password',
	database : 'date_base_name'
});

module.exports  = client;