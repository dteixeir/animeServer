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

    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        next();
    };
};