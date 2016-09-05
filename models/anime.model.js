var mongoose = require('mongoose');

// Anime Schema
var animeSchema = new mongoose.Schema({
    Title: String,
    WebsiteUrl: String,     // Website Anime was found at FIRST!
    New: Boolean,           // Recently started (define recently)
    Following: Boolean,     // Following this anime or not
    FoundDate: Date,        // Date Anime was added
    AniListApiId : Number,  // Id in AniListApi
    AniListThumbnailLargeSrc : String, // uri string for large thumbnail
    Tv : Boolean
});

// Alternate Key setup
animeSchema.index({ Title: 1}, { unique: true });

// Creates the Schema object!
var Anime = mongoose.model('anime', animeSchema, 'animes');

// Export the model schema
module.exports = Anime;
