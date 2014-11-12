angular.module('starter.services', [])

.factory('Music', function($http, $timeout){
  return {
    search: function(query, callback){
      var query = encodeURIComponent(query);
      $http.get('http://localhost:4730/search/' + query).success(function(res){
        callback(res);
      });
    },

    getInfo: function(trackId, callback){
      var trackId = encodeURIComponent(trackId);
      $http.get('http://localhost:4730/track/' + trackId).success(function(res){
        callback(res);
      });
    }
  }
});
