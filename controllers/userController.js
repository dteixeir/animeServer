var jwt = require('jsonwebtoken');
var mw = require('../classes/middleware.js');

module.exports = function(app, route) {
    var User = app.models.user;
    var ObjectId = app.ObjectID;

    // pre route middleware to run
    app.use('/users', mw.auth);

    // get users
    app.get('/users', function(req, res, next) {
        User.find({}, function(err, data) {
            if (err) {
                res.status(400).send();
            } else {
                res.send(data);
            }
        })
    });

    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        next();
    };
};