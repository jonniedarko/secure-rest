var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var validate = require('./validation');



var Schema = mongoose.Schema;

var User = new Schema({
    firstname: { type: String, required: true},
    surname:  { type: String, required: true},
    username: { type: String, required: true, index: {unique: true}},
    password: { type: String, required: true}
});

User.methods.hashPassword = function (password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

User.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);

};

User.path('username').validate(function (input){
    return validate.isAlphaNumericOnly(input) && validate.isLongEnough(input);
});
User.path('password').validate(function (input){
    return validate.isGoodPassword(input);
});

User.path('firstname').validate(function (input){
    return validate.isSafe(input);
},"You Cannot use the '$' Character");
User.path('surname').validate(function (input){
    return validate.isSafe(input);
});

var UserModel = mongoose.model("User", User);

module.exports.UserModel = UserModel;