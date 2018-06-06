var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();

router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChuncks = [];
    var chunckSize = 3;
    for (var i = 0; i < docs.length; i += chunckSize) {
      productChuncks.push(docs.slice(i, i + chunckSize))
    }
    res.render('shop/index', { title: 'babysshow', products: docs });
  });
});

router.get('/user/signup',function (req,res,next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function(req, res, next) {
  if (req.body.password === req.body.confirmPassword) {
    next()
  } else {
    res.send("ereur mdp");
  }
}, passport.authenticate("local.signup",{
  successRedirect : '/user/profile',
  failureRedirect :'/user/signup',
  failureFlash : true
}));


router.get('/user/profile',function (req,res,next) {
  res.render('user/profile')
});


module.exports = router;
