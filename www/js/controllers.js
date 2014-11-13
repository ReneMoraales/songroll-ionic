angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $timeout, Music) {
  if ( window.localStorage.getItem('searchResults') ) {
    $scope.searchResults = JSON.parse(window.localStorage.getItem('searchResults'));
  }

  $scope.searchLoading = false;
  $scope.searchData = {};

  $scope.searchTrack = function(e){
    $(e.target).blur();
    $scope.searchLoading = true;

    Music.search($scope.searchData.query, function(response) {
      $scope.searchResults = response;
      window.localStorage.setItem('searchResults', JSON.stringify(response));
      $scope.searchLoading = false;
    });

    $scope.searchData.query = '';
  }
})

.controller('FavoritesCtrl', function($scope) {
  // $scope.friends = Friends.all();
})

.controller('TrackDetailCtrl', function($rootScope, $scope, $stateParams, Music) {
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
