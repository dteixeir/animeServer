var jwt = require('jsonwebtoken');
var mw = require('../classes/middleware.js');

module.exports = function(app, route) {
    var User = app.models.user;
    var ObjectId = app.ObjectID;

    // pre route middleware to run
    app.use('/users', mw.auth);

    // create and save new user
    app.post("/users", function(req, res, next) {
        /* initial set up needs to be updated
        // update to hash password ??
        var user = new User({
            Username: 'Danny Teixeira',
            Password: 'password',
            Admin: true
        });
        */
        
        user.save(function(err, data) {
            if (err) {
                res.status(409).send('That Username is already in use');
            } else {
                res.json({ success: true });
            }
        });
    });

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