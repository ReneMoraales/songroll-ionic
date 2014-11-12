angular.module('starter.services', [])

.factory('Music', function($http, $timeout){
  return {
    search: function(query, callback){
      var query = encodeURIComponent(query);
      $http.get('http://localhost:4730/search/'+query).success(function(data){
        var results = data;
        callback(results);
      });
    },
    getInfo: function(){
      return {
        id: 123456,
        artist: {
          name: 'Knife Party',
          image: 'https://d3rt1990lpmkn.cloudfront.net/640/74dddd35dcd6477bfcbefdf90a3c2eb4fd58db82'
        },
        title: 'Give It Up',
        album: 'Abandon Ship',
        image: 'http://upload.wikimedia.org/wikipedia/en/4/42/Knife_Party_-_Abandon_Ship.jpg'
      };
    }
  }
});
