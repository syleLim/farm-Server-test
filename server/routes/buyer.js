var express = require('express');
var router = express.Router();

//module create
var client = require('./Data_Base/db.js');
var fs = require('fs');
var ejs = require('ejs');

//checking module
var inputcheck = require('C:/Users/syle6/Desktop/server_ver3.1/server/public/javascripts/check_buyer.js');

//Get Set up
router.get('/', function(request, response, next){
	response.render('buyer.html');
});

// Post Set up
router.post('/', function(request, response, next){
	console.log('post router ok!');
	var body = request.body;

	//check all data
	if(inputcheck(body, response)){

		client.query('Insert Into test ( date, fname, fphone, tname, tphone, address, ordercount, orderoption) VALUES (now(), ?, ?, ?, ?, ?, ?, ?)',
		[ body.fname, body.fphone1+body.fphone2+body.fphone3, body.tname, body.tphone1+body.tphone2+body.tphone3, body.address, body.ordercount, body.orderoption],
	 	function(){
	 		response.redirect('/buyer');
		});	
	}else{
		//TODO: alert play , no redirect
	}
	
});

module.exports = router;
