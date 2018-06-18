var mongoose = require ('mongoose');
var Schema = mongoose.schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  nom: {type: String, required: true},
  prenom: {type: String, required: true},
  codePostal: {type: String, required: true},
  adresse: {type: String, required: true},
  telephone: {type: Number, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
});

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports= mongoose.model('User', userSchema);
