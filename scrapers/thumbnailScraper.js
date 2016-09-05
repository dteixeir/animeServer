var thumbnailScraper =  function () {};
var request =  require("request");
var cheerio =  require("cheerio");
var fetch = require('node-fetch');
var fs = require('fs');

thumbnailScraper.prototype.scrape = function (app) {
    // web scraping magic!
/*
    url = 'http://www.anime-planet.com/anime/all';

    // structure of request call
    // first param = url, 
    // callback takes 3 params (error, response status code, html)
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('img').filter(function() {
                var data = $(this);
                var title = data[0].attribs.alt.toLowerCase();
                var source = data[0].attribs.src;
                source = 'http://www.anime-planet.com/' + source;

                app.models.anime.update({Title: title}, {AniListThumbnailLargeSrc: source}, function(err, record) {
                  if(err)
                    return err;

                  console.log(record);
                });
            });
        }
      });


*/
/*
    // Titles to lowerCase!
    app.models.anime.find({}, function(err, data) {

      for(var i = 0; i < data.length; i++) {
        console.log(data[i].Title);

        var lcTitle = data[i].Title.toLowerCase()
        console.log(lcTitle);

        app.models.anime.update({Title: data[i].Title}, {Title: lcTitle}, function(err, record) {
          if(err)
            return err;
          console.log(record);
        });
      }
    });*/

/*
    // Clean up job to associate animes with imageTiles
    app.models.anime.find({ "AniListThumbnailLargeSrc" : { "$exists" : false } }, function(err, data) {
      if(err)
        res.send({status: 404, data});
      console.log('hahahahahaha!');

      for(var i = 0; i < data.length; i++) {
        var url = 'https://anilist.co/api/anime/search/' + data[i]._doc.Title;

        fetch(url, { 
          method: 'GET', 
          headers: {
            'Authorization': 'Bearer TzyZeN9xn3zgYx38dCbtGKpBhLIoikOc28gDdjif'
          } 
        }).then(function(res) {
            res.json().then(function(show){
              if(!show.hasOwnProperty("error")) {

                var title = show[0].title_english.toLowerCase();


                // iterate through list of objects being returned to see if any of the synonyms match the name in the db
                if(show.length > 1) {
                  for(var i = 0; i < show.length; i++) {
                    if(show[i].type = "TV") {
                      for(var i2 = 0; i2 < show[i].synonyms.length; i2++) {
                        //console.log(show[i].synonyms[i2]);
                          checkFoShow(app, show[i].synonyms[i2]);


                      }
                    }
                  }
                }

                //title = "/^" + title + "$/i";
                var src =  show[0].image_url_lge;
                var id = show[0].id;
                //console.log(stuff);

                app.models.anime.update({Title: title}, {AniListThumbnailLargeSrc: src, AniListApiId: id}, function(err, record) {
                  if(err)
                    return err;

                  console.log(record);
                });
              }

              

            });
        });


        //console.log('hahahahahaha!');
      }
      
    }); 
*/

};

function checkFoShow(app, showName) {
   app.models.anime.find({Title: showName}, function(err, res) {         
    if(err || res.length == 0) {
      console.log(err); 
    } else {
      console.log('found' + res);
    }
  });
}

function cleanString(text) {
    text = text.toString().replace(/\//gmi, " ");
    return text;
}

module.exports = new thumbnailScraper();