angular.module('songroll')
.factory('Music', function($http, $timeout){
  var serverHost = 'http://songrollionic.ngrok.com/';
  return {
    search: function(query, callback){
      var query = encodeURIComponent(query);
      $http.get( serverHost + 'search/' + query ).success(function(res){
        callback(res);
      });
    },

    getInfo: function(trackId, callback){
      var trackId = encodeURIComponent(trackId);
      $http.get( serverHost + 'track/' + trackId).success(function(res){
        callback(res);
      });
    }
  }
})