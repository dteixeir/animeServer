var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    Username: String, 
    Password: String, 
    SlackUsername: String,
    SlackBotName: String,
    Admin: Boolean
});

// Alternate Primary Key
userSchema.index({ Username: 1}, { unique: true });

// create schema object
var User = mongoose.model('user', userSchema, 'users')

module.exports = User;