var request = require('request');
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

app.get('/search/:query', function(req, res){
  res.type('application/json');

  var query = encodeURIComponent(req.params.query);

  request.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track='+query+'&api_key=6860075ec876c17f7167475ef65e894b&format=json', function(error, response, body){
    var results = [];
    lastfmResults = JSON.parse(body);

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


app.get('/track/:id', function(req, res){
  res.type('application/json');

  console.log('Received request for Track ID: ' + req.params.id);

  var trackIdBuffer = new Buffer(req.params.id, 'base64');
  var trackIdString = trackIdBuffer.toString();

  var trackInfo = trackIdString.split('<--->');

  console.log('Track is "' + trackInfo[0] + '" by ' + trackInfo[1]);

  var query = trackInfo[0] + ' ' + trackInfo [1];
  var options = {
    q: query,
    sort: 'top',
    post_view: 'masonry',
    blogs_before: 1,
    num_blogs_shown: 0,
    num_posts_shown: 0,
    before: 0,
    blog_page: 2,
    post_page: 1,
    filter_nsfw: true,
    filter_post_type: 'audio',
    next_ad_offset: 0,
    ad_placement_id: 0,
    more_posts: true
  };

  var trackInfo, trackURL = false;

  var infoResponse = function(){
    if ( trackInfo && trackURL ) {
      trackInfo.audio_url = trackURL;
      res.send(JSON.stringify(trackInfo));
    }
  }

  request.post('https://www.tumblr.com/search/' + encodeURIComponent(query), { form: options }, function(error, response, body){
    var cheerio = require('cheerio'),
    $ = cheerio.load(body);

    var post = $('#search_posts article').first();
    var postId = post.attr('data-post-id');
    var postTumblelog = post.attr('data-tumblelog-name');

    request('https://api.tumblr.com/v2/blog/'+postTumblelog+'.tumblr.com/posts?id='+postId+'&api_key=HHEnu3jZpQNGOIOdlsCxRM96iww8QwjHRvnjn343BYj5f5hjr8', function(error, response, body){
      var data = JSON.parse(body);
      var audioURL = data.response.posts[0].audio_url;

      if ( audioURL.indexOf('tumblr.com/audio_file') > -1 ) {
        var pieces = audioURL.split('/');
        audioURL = 'https://a.tumblr.com/'+pieces[pieces.length-1]+'o1.mp3';
      }

      trackURL = audioURL;
      infoResponse();
    });
  });

  request.get('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6860075ec876c17f7167475ef65e894b&artist=' + encodeURIComponent(trackInfo[1]) + '&track=' + encodeURIComponent(trackInfo[0]) + '&format=json', function(error, response, body){
    var data = JSON.parse(body);

    var track = {};

    track.id = req.params.id;
    track.title = data.track.name;
    track.artist = data.track.artist.name;
    if ( data.track.album ) { 
      track.album = data.track.album.name;

      if ( data.track.album.image ) {
        track.image_url = data.track.album.image[3]['#text'];
      }
    }

    trackInfo = track;
    infoResponse();
  });

})

app.listen(process.env.PORT || 4730);