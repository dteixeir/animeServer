var mongoose = require('mongoose');

// AnimeEpisode Schema
var animeEpisodeSchema = new mongoose.Schema({
    Title: String,
    Href: String,
    EpisodeNumber: Number,  
    WebsiteUrl: String,     // Website episode was found at FIRST
    Watched: Boolean,       // Watched or not
    New: Boolean,           // Recently updated (define recently?)
    FoundDate: Date,        // Date episode was found
    EmbedUrl: String        // String to show the video player locally (Probably needs to be filled in on update?)
});

// Alternate Key setup
animeEpisodeSchema.index({ Title: 1, EpisodeNumber: 1}, { unique: true });

// Creates the Schema object!
var AnimeEpisode = mongoose.model('animeEpisode', animeEpisodeSchema, 'animeEpisodes');

// Export the model schema
module.exports = AnimeEpisode;