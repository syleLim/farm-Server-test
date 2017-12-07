var express = require('express');
var router = express.Router();

//module create
var client = require('./Data_Base/db.js');
var fs = require('fs');
var ejs = require('ejs');

//checking module

//Get Set up
router.get('/', function(request, response, next){
	response.render('buyer.html');
});

// Post Set up
router.post('/', function(request, response, next){
	console.log('post router ok!');
	var body = request.body;

	var s = new Date()
	var y = s.getFullYear();
	var m = s.getMonth()+1;
	var d = s.getDate();



	client.query('Insert Into item ( date, fname, fphone, tname, tphone, address, ordercount, orderoption, sphone ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
		,[ y+m+d, body.fname, body.fphone1+body.fphone2+body.fphone3, body.tname, body.tphone1+body.tphone2+body.tphone3, body.address, body.ordercount, body.orderoption, "1"],
		function(){
			response.redirect('/buyer');
	});
	
});

module.exports = router;
