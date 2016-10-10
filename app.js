if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var levels = require('./routes/levels');
var day = require('./routes/day');
var activities = require('./routes/activities');
var cheats = require('./routes/cheats');
const cookieSession = require('cookie-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieSession({
  name: 'eyc',
  secret: process.env.SESSION_SECRET,
  secureProxy: app.get('env') === 'production'
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/levels', levels);
app.use('/day', day);
app.use('/activities', activities);
app.use('/cheats', cheats);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
