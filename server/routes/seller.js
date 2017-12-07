var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');

var client = require('./Data_Base/db.js');

//Get routing
router.get('/', function(req, res, next) {
	fs.readFile('C:/Users/syle6/Desktop/server_ver3.2/server/views/seller_.html', 'utf8', function(error, data){
		console.log('fs is OK!');


		//client,query('Select count(*) from item where orderoption = "1"', )

		client.query('Select * From item', function(err, results){
			
			if(error){
				console.log('query error : '+error);
			}else{
				console.log(results);
			}
			
			res.send(ejs.render(data, { data: results}));

		});
	});	
});


module.exports = router;
