var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');

var client = require('./Data_Base/db.js');

//Get routing
router.get('/', function(req, res, next) {
	fs.readFile('C:/Users/syle6/Desktop/server_ver3.1/server/views/seller.html', 'utf8', function(error, data){
		console.log('fs is OK!');

		client.query('Select * From test', function(err, results){
			
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
