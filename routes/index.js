var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');
var app = express();
var User = require('../models/user');

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
  var messages = req.flash('error')
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  console.log('rendu');
});

router.post('/user/signup',passport.authenticate("local.signup",{
  successRedirect : '/',
  failureRedirect :'/user/signup',
  failureFlash : true
}));


router.get('/user/profile', function (req,res,next) {
  console.log(req.user)
  res.render('user/profile', { user: req.user, csrfToken: req.csrfToken() })
});

router.get('/user/signin',function (req,res,next) {
  var messages = req.flash('error')
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


router.post('/user/signin', passport.authenticate("local.signin",{
  successRedirect : '/user/profile',
  badRequestMessage: 'Veuillez entrer un mdp',
  failureRedirect :'/user/signin',
  failureFlash : true
}));

router.post("/user/profile",  function(req, res, next){
  var text = ('succes update')
  User.findOneAndUpdate(
    { email: req.user.email },
    { email: req.body.email, nom: req.body.nom, prenom: req.body.prenom, adresse:req.body.adresse,codePostal: req.body.codePostal,
      telephone: req.body.telephone, password: req.body.password},
    function(err, user) {
      if(err) {
        res.render('user/profile', { user: req.user, errors: err })
      } else {
        res.render('user/profile', { user: user, csrfToken: req.csrfToken(), text: text })
      }
    });
  });

module.exports = router;
