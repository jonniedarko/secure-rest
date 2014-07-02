var mongoose = require('mongoose');
var validate = require('./validation');

mongoose.connect('mongodb://localhost/crudusers');

var db = mongoose.connection;

db.on('error', function(error){
    console.log("connection error: "+error.message);
});

db.once('open', function(){
    console.log("Connected successfull!")
});

var Schema = mongoose.Schema;

var User = new Schema({
    firstname: { type: String, required: true},
    surname:  { type: String, required: true},
    username: { type: String, required: true, index: {unique: true}},
    password: { type: String, required: true}
});

User.path('username').validate(function (input){
    return validate.isAlphaNumericOnly(input) && validate.isLongEnough(input);
});
User.path('password').validate(function (input){
    return validate.isGoodPassword(input);
},"You Cannot use the '$' Character");

User.path('firstname').validate(function (input){
    return validate.isSafe(input);
},"You Cannot use the '$' Character");
User.path('surname').validate(function (input){
    return validate.isSafe(input);
},"You Cannot use the '$' Character");
var UserModel = mongoose.model("User", User);

module.exports.UserModel = UserModel;
