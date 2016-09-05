var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var mw = require('../classes/middleware.js');

module.exports = function(app, route) {
    // pre route middleware to run
    app.use('/animes', mw.auth);

    // Grabs all anime
    app.get("/animes", function(req, res, next) {
        app.models.anime.find({}, function(err, data) {
            if(err)
                res.send({status: 404, data});
            res.send(data);
        });
    });

    // Grabs list of anime you are following
    app.get("/animes/following", function(req, res, next) {
        app.models.anime.find({Following: {$eq: true}}, function(err, data) {
            if(err)
                return err;
            res.send(data);
        });
    });

        // Grabs all episodes for an anime
    app.put("/animes/following/:title/", function(req, res, next) {
        app.models.anime.findOne({Title: req.params.title}, function(err, data) {
            if(err)
                return err;
            var record = data;
            
            app.models.anime.update({Title: record.Title}, {Following: !record.Following}, function(err, data) {
                if(err)
                    return err;
                res.send(data);
            });
        });
    });

    // Grabs all episodes for an anime
    app.get("/animes/:title", function(req, res, next) {
        app.models.animeEpisode.find({Title: req.params.title}, function(err, data) {
            if(err)
                return err;
            res.send(data);
        });
    });

    // Grabs specific episode
    app.get("/animes/:title/:id", function(req, res, next) {
        app.models.animeEpisode.findOne({Title: req.params.title, _id: new ObjectId(req.params.id)}, function(err, data) {
            if(err)
                return err;
            res.send(data);
        });
    });

    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        
        next();
    };
};