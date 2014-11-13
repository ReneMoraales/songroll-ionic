angular.module('songroll')
.controller('TrackDetailCtrl', function($rootScope, $scope, $stateParams, $ionicActionSheet, Music, Favorites) {
  $rootScope.currentTrack = {};
  $rootScope.currentTrack.title = 'Cargando...';

  $rootScope.trackLoading = true;

  $scope.playerControls = {};

  var trackPlayer = $('#track-player')[0];

  $scope.playerControls.playPause = function(){
    if ( trackPlayer.paused ) {
      trackPlayer.play();
    } else {
      trackPlayer.pause();
    }
  };

  $scope.playerControls.seek = function() {
    trackPlayer.currentTime = Math.floor($rootScope.playerData.currentTime);
  }

  $scope.isFavoriteClass = function() {
    if ( Favorites.isFavorite($rootScope.currentTrack.id) ) {
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
        Favorites.toggleFavorite($rootScope.currentTrack);
        return true;
      }
    };

    if ( Favorites.isFavorite($rootScope.currentTrack.id) ) {
      $ionicActionSheet.show(options);
    } else {
      Favorites.toggleFavorite($rootScope.currentTrack);
    }

  }

  var trackLoaded = function(){
    $rootScope.currentTrack.loaded = true;
    $rootScope.trackLoading = false;
      if ( trackPlayer.paused || trackPlayer.src != $rootScope.currentTrack.audio_url ) {
        trackPlayer.src = $rootScope.currentTrack.audio_url;
        trackPlayer.play();
      }
  }

  if ( window.localStorage.getItem('trackInfo_' + $stateParams.trackId) ) {
    $rootScope.currentTrack = JSON.parse(window.localStorage.getItem('trackInfo_' + $stateParams.trackId));
    trackLoaded();
  } else {
    Music.getInfo($stateParams.trackId, function(response){
      $rootScope.currentTrack = response;
      window.localStorage.setItem('trackInfo_' + $stateParams.trackId, JSON.stringify(response));
      trackLoaded();
    })
  }
});