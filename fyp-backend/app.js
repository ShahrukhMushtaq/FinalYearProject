const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser')
// var logger = require('./middleware/logger');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var modules = require('./routes/modules');

var app = express();
// mongoose.connect('mongodb://localhost:27017/auction', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connect('mongodb://shahrukh:shahrukh0auction@ds213705.mlab.com:13705/auction-base', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connection.on('connected', () => {
  console.log('Connected to M-LAB database');
});
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Error in database connection' + err);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "Origin, x-access-token, Content-Type, Accept");
  next();
});

if (app.get('env') === 'development') {
  app.use(logger('tiny'));

}
// app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', modules);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.port || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}...`) });
module.exports = app;
