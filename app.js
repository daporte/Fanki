var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/indexRoute.js');
var users = require('./routes/users.js');
//---
var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var session = require('express-session');
//---

var app = express();

//---
app.use(session({ secret: 'LnGKqVCxvir_G714DJWha_zfFA6TA1aaWPfiOaUZZcX4f7r23fPabnUiAgo256KP', resave: false,  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());



app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
      console.log("ZA+DAAR")
      if (!req.user) {
        throw new Error('user null');
      }


      res.redirect("/user");


      //console.log(req.user)
      //var elem = angular.element(document.querySelector('[ng-controller]'));
      //console.log("elem-------");
      //console.log(elem)
        //loginService.storage.Username = req.user.nickname;
      
    });

//---
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/callback', routes);
//app.use('/user', users);

var requiresLogin = require('./routes/requiresLogin.js');


var BS = "";

app.get('/user', function (req, res) {
    console.log(req.user);
    console.log(req.user.nickname);

    app.set('bs', req.user );
    res.render('userTemp', {

        user: req.user
    });


});





var port = process.env.PORT || 3001;
app.listen(port);


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/public/javascripts/app/Videos', express.static(__dirname + '/public/javascripts/app/Videos'));


var productCategoryRoute = require("./routes/productCategoryRouteConfig.js");
var productRoute = require("./routes/productRouteConfig.js");
var loginRoute = require("./routes/loginRouteConfig.js");

new productCategoryRoute(app, BS);
new productRoute(app, BS);
new loginRoute(app, BS);


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


