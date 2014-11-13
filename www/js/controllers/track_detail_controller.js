angular.module('songroll')
.controller('TrackDetailCtrl', function($rootScope, $scope, $stateParams, $ionicActionSheet, Music, Favorites, Player) {
  $scope.player = Player;

  Player.loading = true; // trackLoading

  $scope.player.track = {};
  $scope.player.trackInfo.title = 'Cargando...';

  $scope.playerControls = {};

  $scope.isFavoriteClass = function() {
    if ( Favorites.isFavorite($scope.player.trackInfo.id) ) {
      return 'ion-ios7-star';
    }
    return 'ion-ios7-star-outline';
  }

  $scope.favoriteTrack = function(){
    var options = {
      titleText: '¿Estás seguro que quieres eliminar esta canción de tus favoritos?',
      cancelText: 'Cancelar',
      destructiveText: 'Eliminar de mis favoritos',
      destructiveButtonClicked: function() {
        Favorites.toggleFavorite($scope.player.trackInfo);
        return true;
      }
    };

    if ( Favorites.isFavorite($scope.player.trackInfo.id) ) {
      $ionicActionSheet.show(options);
    } else {
      Favorites.toggleFavorite($scope.player.trackInfo);
    }

  }

  var trackLoaded = function(){
    $scope.player.loaded = true;
    $scope.player.loading = false;
    if ( $scope.player.trackPlayer.paused || $scope.player.playerTrackURL != $scope.player.trackInfo.audio_url ) {
      $scope.player.playerTrackURL = $scope.player.trackInfo.audio_url;
      $scope.player.trackPlayer.load({
        src: $scope.player.playerTrackURL,
        type: 'audio/mpeg'
      })
      $scope.player.trackPlayer.play();
    }
  }

  if ( window.localStorage.getItem('trackInfo_' + $stateParams.trackId) ) {
    $scope.player.trackInfo = JSON.parse(window.localStorage.getItem('trackInfo_' + $stateParams.trackId));
    trackLoaded();
  } else {
    Music.getInfo($stateParams.trackId, function(response){
      $scope.player.trackInfo = response;
      window.localStorage.setItem('trackInfo_' + $stateParams.trackId, JSON.stringify(response));
      trackLoaded();
    })
  }
});