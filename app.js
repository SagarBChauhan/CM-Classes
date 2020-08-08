var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exprssHbs=require("express-handlebars");
var mongoose=require('mongoose');
const keys=require('./config/keys');
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var validator=require('express-validator');
var MongoStore=require('connect-mongo')(session);
const cookieSession=require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');

var app = express();

// mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true,useUnifiedTopology: true },function () {
//   console.log("Connected to mongoDB..");
// })

mongoose.connect('mongodb://localhost:27017/cmclasses', {useNewUrlParser: true,useUnifiedTopology: true });
require('./config/passport');

// view engine setup
app.engine('.hbs',exprssHbs({defaultLayout: 'layout',extname:'.hbs'}));
// app.engine('.hbs',exprssHbs({defaultLayout: 'dashboard',extname:'.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(require('connect-flash')());
app.use(cookieParser());
app.use(cookieParser());
app.use(session({
  secret:'mysupersecret',
  resave:false,
  saveUninitialized:false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie:{maxAge: 180*60*1000}
}));

// app.use(cookieSession({
//   maxAge:24*60*60*1000,
//   keys:[keys.session.cookieKey]
// }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
