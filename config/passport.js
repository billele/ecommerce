var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user,done) {
  done(null,user.id);
});

passport.deserializeUser(function (id,done) {
  User.findById(id,function (err,user) {
    done(err,user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernomField: "lastname",
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
} , function (req, email, password, done) {
  User.findOne({'email':email}, function (err,user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done (null, false,  {message: 'email deja utiliser.'});
    }
    var newUser = new User();
    newUser.nom = req.body.nom;
    newUser.prenom = req.body.prenom;
    newUser.adresse = req.body.adresse;
    newUser.codePostal = req.body.codePostal;
    newUser.telephone = req.body.telephone;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function (err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));



passport.use('local.signin', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {

  User.findOne({ 'email' :  email }, function(err, user) {
    if (err)
    return done(err);

    if (!user)
    return done(null, false, {message: 'identifiant incorect'});

    if (!user.validPassword(password))
    return done(null, false, {message: 'olalala, mauvais mdp, essaye salem123'});


    return done(null, user);
  });

}));
