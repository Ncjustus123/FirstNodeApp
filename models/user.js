var mongoose = require('mongoose');
var bcrypt = require ('bcryptjs');
mongoose.connect('mongodb://localhost:27017/nodeauth');

let db = mongoose.connection;

//User Schema 
var Userschema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    password:{
        type: String 
    },
    email:{
        type: String
    },
    name:{
        type: String
    },
     profileimage:{
         type:String
     },
     created_at: {
         type: Date, 
         default: Date.now
        },
     updated_at: {
         type: Date, 
         default: Date.now}

});

var User = module.exports = mongoose.model('User',Userschema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}
module.exports.getUserByUsername = function(username, callback){
    var query = {username:username};
    User.findOne(query,callback);
}
module.exports.comparePassword = function (candidatePassword , hash,callback ){
bcrypt.compare(candidatePassword, hash, function(err, iaMatch) {
    callback(null, IsMatch);
});
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
    
        });
    });  
    
}