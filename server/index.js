var http = require('http');
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

app.get('/search/:query', function(req, res){
  res.type('application/json');

  var query = encodeURIComponent(req.params.query);
  var request = http.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track='+query+'&api_key=6860075ec876c17f7167475ef65e894b&format=json', function(apiRes){
    var lastfmResults = '';
    apiRes.on('data', function(chunk){
      lastfmResults += chunk.toString();
    });
    apiRes.on('end', function(){
      var results = [];
      lastfmResults = JSON.parse(lastfmResults);

      var lastfmResultsCount = parseInt(lastfmResults.results['opensearch:totalResults']);
      var lastfmResultsArray = [];

      if ( lastfmResultsCount == 1 ) {
        lastfmResultsArray = [ lastfmResults.results.trackmatches.track ];
      } else if ( lastfmResultsCount > 1 ) {
        lastfmResultsArray = lastfmResults.results.trackmatches.track;
      }

      lastfmResultsArray.forEach(function(item, i){
        var track = {};

        track.title = item.name;
        track.artist = item.artist;

        if ( item.image ) {
          track.image_url = item.image[3]['#text'];
        }

        var trackIdBuffer = new Buffer(track.title + '<--->' + track.artist);
        var trackIdString = trackIdBuffer.toString('base64');

        track.id = trackIdString;

        results.push(track);
      });

      res.send(results);
    });
  });
});

app.listen(process.env.PORT || 4730);