var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// var passport = require('passport'); var LocalStrategy = require('passport-local').Strategy;
//  var models = require('../app/models/db-index');
// var bcrypt = require('bcrypt-nodejs'); //
// Sign Up Logic passport.use('local-signup', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
//  function(req, email, password, done){ models.User.findOne({ where: { email: email } }).then(function(existingUser)
// { if (existingUser) return done(null, false, req.flash('error', 'Email already exists.'));
//  if (req.user && password === confirmPassword) { var user = req.user; user.firstName = firstName; user.lastName = lastName; user.email = email;
//     user.password = models.User.generateHash(password);
//    user.save().catch(function(err){ throw err; }).then(function(){ done(null, user, req.flash('error', 'All fields need to be filled in'));
//   });
//  } else { var newUser = models.User.build({ firstName: req.body.firstName,
//     lastName: req.body.lastName, email: req.body.email,
//     password: models.User.generateHash(password) });
//   newUser.save().then(function(){ done(null, newUser); }).catch(function(err){ done(null, false,
//      console.log(err));
//    });
//   } }).catch(function(e){ done(null, false, req.flash('error', 'All fields need to be filled in'),
//   console.log(e.email + e.message));
//  })
// }));
