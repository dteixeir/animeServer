var jwt = require('jsonwebtoken');

module.exports = function(app, route) {
    var User = app.models.user;
    var ObjectId = app.ObjectID;

    // authenticate user
    app.post('/authenticate', function (req, res, next) {
        //find user
        User.findOne({Username: req.body.username}, function(err, user) {
            if (err || !user) {
                res.status(400).send({error: 'Invalid Credentials'});
            }

            if (user) {
                if (user.Password != req.body.password) {
                    res.status(400).send({error: 'Invalid Credentials'});
                } else {
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: '1440m'
                    });

                    res.json({
                        success: true,
                        token: token
                    });
                }
            }
        });
    });

    /*
        // create and save new user
    app.post("/createuser", function(req, res, next) {
        // initial set up needs to be updated
        // update to hash password ??
        var user = new User({
            Username: 'Danny Teixeira',
            Password: 'password',
            Admin: true
        });
        
        user.save(function(err, data) {
            if (err) {
                res.status(409).send('That Username is already in use');
            } else {
                res.json({ success: true });
            }
        });
    });
    */

    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        next();
    };
};