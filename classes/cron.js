// cron cannot go less that 1 minute task run times.
var cron = require('node-cron');
var nwAnimeScraper = require('../scrapers/index.js').nwAnime;
var app = require('../index.js');

var schedualTasks = function(){};

// Will scrap for anime
// Should run new update every day @ 00:00
// WORKS!!!! Tested (Aug 1)
cron.schedule('0 0 * * *', function() {
    console.log('Update New Fields');
    //update animes
        // relay to update function

    //update episodes
        // relay to update function
});

cron.schedule('0 * * * *', function() {
    console.log("fetched anime at" + new Date());
    app.scrapers.nwAnime.scrape(app.models.anime, app.models.animeEpisode);
});