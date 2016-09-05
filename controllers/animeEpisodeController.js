var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var mw = require('../classes/middleware.js');

module.exports = function(app, route) {
    // pre route middleware to run
    app.use('/episode', mw.auth);

    // toggles if the episode has been seen
    app.put("/episode/watched/:id", function(req, res, next) {
        app.models.animeEpisode.findOne({_id: req.params.id}, function(err, data) {
            if(err)
                return err;
            
            var record = data;
            
            app.models.animeEpisode.update({_id: record._id}, {Watched: !record.Watched}, function(err, data) {
                if(err)
                    return err;
                res.send(data);
            });
        });
    });

    // sets the episode watched to param(true/false)
    app.put("/episode/watched/:id/:bool", function(req, res, next) {
        app.models.animeEpisode.findOne({_id: req.params.id}, function(err, data) {
            if(err)
                return err;
            
            var record = data;
            
            app.models.animeEpisode.update({_id: record._id}, {Watched: req.params.bool}, function(err, data) {
                if(err)
                    return err;
                res.send(data);
            });
        });
    });

    // returns bool of if the episode has been seen
    app.get("/episode/watched/:id", function(req, res, next) {
        app.models.animeEpisode.findOne({_id: new ObjectId(req.params.id)}, function(err, data) {
            if(err)
                return err;
            res.send(data.Watched);
        });
    });

    app.get("/episode/unseen/:title", function(req, res, next) {
        app.models.animeEpisode.count({Title: req.params.title, Watched: false}, function(err, data) {
            if(err)
                return err;
            res.send({status: 200, data});
        });
    });

    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        next();
    };
};