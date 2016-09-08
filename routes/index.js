var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
    function(req, res) {
      console.log("IM AUTHENTICATED");
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect("/user");
    });

module.exports = router;
