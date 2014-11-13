angular.module('starter.services', [])
.factory('Player', function($rootScope){
  var trackPlayer = $('#track-player')[0];
  return {
    setup: function(){
      trackPlayer.addEventListener('durationchange', function(){
        $rootScope.playerData.duration = trackPlayer.duration;
        $rootScope.$apply();
      });
      trackPlayer.addEventListener('timeupdate', function(){
        $rootScope.playerData.currentTime = trackPlayer.currentTime;
        $rootScope.$apply();
      });
      trackPlayer.addEventListener('playing', function(){
        $rootScope.trackPlaying = true;
        $rootScope.$apply();
      });
      trackPlayer.addEventListener('pause', function(){
        $rootScope.trackPlaying = false;
        $rootScope.$apply();
      });
    }
  }
})
.factory('Music', function($http, $timeout){
  return {
    search: function(query, callback){
      var query = encodeURIComponent(query);
      $http.get('http://songrollionic.ngrok.com/search/' + query).success(function(res){
        callback(res);
      });
    },

    getInfo: function(trackId, callback){
      var trackId = encodeURIComponent(trackId);
      $http.get('http://songrollionic.ngrok.com/track/' + trackId).success(function(res){
        callback(res);
      });
    }
  }
})
.factory('Favorites', function($rootScope){
  return {
    updateReadFavorites: function(){
      $rootScope.favorites = JSON.parse(window.localStorage.getItem('favorites'));
      $rootScope.$apply();
    },
    updateSaveFavorites: function(){
      window.localStorage.setItem('favorites', JSON.stringify($rootScope.favorites));
    },
    setup: function(){
      if ( !window.localStorage.getItem('favorites') ) {
        window.localStorage.setItem('favorites', '{}');
      }
      if ( !$rootScope.favorites ) {
        this.updateReadFavorites();
      }
    },
    isFavorite: function(trackId) {
      if ( $rootScope.favorites['track_'+trackId] ) { return true; }
      return false;
    },
    toggleFavorite: function(track) {
      var trackId = 'track_' + track.id;
      if ( $rootScope.favorites[trackId] ) {
        delete $rootScope.favorites[trackId];
        this.updateSaveFavorites();
      } else {
        $rootScope.favorites[trackId] = track;
        this.updateSaveFavorites();
      }
    }
  }
})
