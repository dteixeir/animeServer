var Bot = require('slackbots');
var User = require('../models/index.js').user;
var slackbot;
var user;

// create a bot
// temporary fix until making it an app and using push notifications
var bot = {
  /*message: function (username, message) {

    User.findOne({Username: username}, function(err, data){
      user = data._doc;
    }).then(function(user) {

      User.findOne({ Username : user.SlackBotName }, function(err, bot) {

        slackbot = new Bot({
          token: bot._doc.Password,
          name: bot._doc.Username
        });

        slackbot.on('start', function() {
          text = '@' + user.SlackUsername + ' ' + message;
          slackbot.postMessageToUser(user.SlackUsername, text);
        });
      });
    });
  }*/
};

module.exports = bot;