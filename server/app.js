//module create
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var schedule = require('node-schedule');
var nodemail = require('nodemailer');
var excel = require('excel-export');

//custum module
var main = require('./routes/main');
var buyer = require('./routes/buyer');
var seller = require('./routes/seller');
var client = require('./routes/Data_Base/db.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// set of previous
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set router
app.use('/', main);
app.use('/buyer', buyer);
app.use('/seller', seller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});


//makeing excel _ but not work
var exceling = function(){
	var conf = {}
	conf.col = [{
		caption: 'Date',
		type: 'string',
		width: 15
	},
	{
		caption:'fname',
		type:'string',
		width : 10
	},
	{
		caption:'fphone',
		type: 'string',
		width : 15
	},
	{
		caption: 'tname',
		type: 'string',
		width: 10
	},
	{
		caption: 'tphone',
		type: 'string',
		width: 15	
	},
	{
		caption: 'address',
		type: 'string',
		width: 50
	},
	{
		caption: 'ordercount',
		type: 'number',
		width: 5
	},
	{
		caption: 'orderoption',
		type: 'number',
		width: 5
	}];

	client.query("Select * From item", function(err, rows){
		arr = [];
		for(i = 0; i<rows.length; i++ ){
			date = rows[i].date;
			fname = rows[i].fname;
			fphone = rows[i].fphone;
			tname = rows[i].tname;
			tphone = rows[i].tphone;
			address = rows[i].address;
			ordercount = rows[i].ordercount;
			orderoption = rows[i].orderoption;
			a = [date, fname, fphone, tname, tphone, address, ordercount, orderoption];
			arr.push(a);
		}
		conf.rows = arr;

		var result = excel.execute(conf);

	});
}


//for and mailing
var mail_go = schedule.scheduleJob('17 * * *', function(){
	var smtp = nodemailer.createTransport("SMTP", {
		service: 'Gmail',
		auth : {
			user : 'id',
			pass : 'password'
		}
	});

	var mail = {
		from : 'name_<mail_address>',
		to : '<to_address>',
		subject : 'mail_title',
		text : 'text',
		attachments : [
			{
				fileName : 'file_name',
				streamSource: fs.createReadStream('file_path')
			}
		]

	}

	smtp.sendMail(mail, function(error, response){
		if(error){
			console.log(error)
		}else{
			console.log("mailing is OK!");
		}
		stmp.close();

	});

});

module.exports = app;
