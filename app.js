// Globals
METADATA = require('./package.json');
logger = require('./app/libs/winston');
contacts = require('./app/domain/mock').contacts;
customers = require('./app/domain/mock').customers;
//var logger = require('morgan');

var express = require('express');
var session = require('express-session'); // Sessiones de express
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logRequest = require('./app/middlewares/request.logger');
var cors = require('./app/middlewares/cross.domain');

// Autentication middleware and strategy
var passportLocalConf = require('./app/libs/passport-strategies/local');
var passport = require('passport');

// ORM middleware
var models = require('./app/libs/sequelize');

// I18n utility
var i18n = require('./app/libs/i18n');

// Routes install
var customer = require('./routes/customer.routes');
var cases = require('./routes/cases.routes');
var contacts = require('./routes/contacts.routes');

var app = express();

// call socket.io to the app
app.io = require('socket.io')();
var io = require('./app/controllers/socket.controller')(app.io);

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);

// use express sessions
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));

// Install passport configuration
passportLocalConf();

  
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// Allow session and locals in views
app.use(function (req, res, next) {
  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  res.locals.title = METADATA.name;
  res.locals.version = METADATA.version;
  next();
});

app.use(i18n);


// Audit middleware
// catch 404 and forward to error handler
app.use(logRequest);


// PREFIX COMPOSITION
const PREFIX = '/' + METADATA.name + '/api';
// ROUTES INTALL
app.use(PREFIX + '/v1/', customer);
app.use(PREFIX + '/v1/', cases);
app.use(PREFIX + '/v1/', contacts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    logger.error({
      message: err.message,
      error: err
    });
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  logger.error({
    message: err.message,
    error: err
  });
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
