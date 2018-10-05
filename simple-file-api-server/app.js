var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Max-Age', '1000');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type, Authorization, Content-Length');   
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);	
    } else {
        next();
    }
});

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cookieParser());

//Routes
var fileRoute = require('./routes/fileRoute');
app.use('/file', fileRoute);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
	console.log(`error: status=${err.status} message:${err}`);
});

var server = app.listen('8000', 'localhost', () => {
	console.log('Node server listening on address ' + 
		server.address().address + ":"+ server.address().port);
});
