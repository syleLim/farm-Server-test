var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var fs = require('fs');

var client = require('./Data_Base/db.js');

var re = [  {
					date : 'None',
					fname: 'None',
					fphone: 'None',
					tname: 'None',
					tphone: 'None',
					address: 'None',
					ordercount : 0,
					orderoption : 0,
					sphone : 'None'
				}]


//Get routing
router.get('/', function(req, res, next) {
	fs.readFile('./views/seller_.html', 'utf8', function(error, data){
		console.log('fs is OK!');

		var s = new Date()
		var y = s.getFullYear().toString();
		var m = (s.getMonth()+1).toString();
		var d = s.getDate().toString();

		//client,query('Select count(*) from item where orderoption = "1"', )

		client.query('Select * From item where date ="'+y+m+d+'"', function(err, results){
			

			if(error){
				console.log('query error : '+error);
			}else{
				console.log(results);
			}
			
			res.send(ejs.render(data, { data: results}));
		});
	});	
});

router.post('/', function(req, res, next){
	fs.readFile('./views/seller_.html', 'utf8', function(error, data){

		//client,query('Select count(*) from item where orderoption = "1"', )

		client.query('Select * From item where date ="'+req.body.date+'"', function(err, results){
			
			if(error){
				console.log('query error : '+error);
			}else{
				console.log(results);
			}
			
			res.send(ejs.render(data, { data: results}));

		});
	});	
})


module.exports = router;
