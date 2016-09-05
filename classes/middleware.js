var app = require('../index.js');

module.exports = {
  auth: function (req, res, next) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    
    if(token) {
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if(err) {
          res.status(400).send({message: 'Failed to authenticate token.'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({error: 'No Token Provided'});
      
    }
  }
};  