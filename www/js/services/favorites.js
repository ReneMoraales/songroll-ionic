angular.module('songroll')
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