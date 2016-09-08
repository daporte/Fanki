var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

console.log("IM IN FILE")

router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
      console.log("IM AUTHENTICATED");
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect("/user");
    });

router.get('/user', function (req, res) {
    res.render('user', {
        user: req.user
    });
});

module.exports = router;
