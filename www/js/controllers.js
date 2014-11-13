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

.controller('TrackDetailCtrl', function($scope, $stateParams, Music) {
  $scope.track = {};
  $scope.track.title = 'Cargando...';

  $scope.trackLoading = true;
  $scope.trackPlaying = false;
  $scope.trackSeeking = false;

  $scope.playerControls = {};

  var trackPlayer = $('#track-player')[0];

  $scope.$on('trackPlayerDuration', function(event, duration){
    $scope.playerControls.duration = parseInt(duration * 1000);
    $scope.$apply();
  });

  $scope.$on('trackPlayerCurrentTime', function(event, currentTime){
    $scope.playerControls.currentTime = parseInt(currentTime * 1000);
    $scope.$apply();
  });


  $scope.playerControls.playPause = function(){
    if ( trackPlayer.paused ) {
      trackPlayer.play();
      $scope.trackPlaying = true;
    } else {
      trackPlayer.pause();
      $scope.trackPlaying = false;
    }
  };

  $scope.playerControls.seek = function() {
    console.log($scope.playerControls.currentTime);
    trackPlayer.currentTime = Math.floor($scope.playerControls.currentTime / 1000);
  }

  var trackLoaded = function(){
    $scope.trackLoading = false;
    trackPlayer.src = $scope.track.audio_url;
    trackPlayer.play();
    $scope.trackPlaying = true;
  }

  if ( window.localStorage.getItem('trackInfo_' + $stateParams.trackId) ) {
    $scope.track = JSON.parse(window.localStorage.getItem('trackInfo_' + $stateParams.trackId));
    trackLoaded();
  } else {
    Music.getInfo($stateParams.trackId, function(response){
      $scope.track = response;
      window.localStorage.setItem('trackInfo_' + $stateParams.trackId, JSON.stringify(response));
      trackLoaded();
    })
  }
})

.controller('AccountCtrl', function($scope) {
});
