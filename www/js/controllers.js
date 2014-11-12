angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $timeout, Music) {
  if ( window.localStorage.getItem('searchResults') ) {
    $scope.searchResults = JSON.parse(window.localStorage.getItem('searchResults'));
  }

  $scope.searchLoading = false;
  $scope.searchData = {};

  $scope.searchTrack = function(e){
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
  $scope.trackLoading = true;

  $scope.track = {};
  $scope.track.title = 'Cargando...';

  if ( window.localStorage.getItem('trackInfo_' + $stateParams.trackId) ) {
    $scope.track = JSON.parse(window.localStorage.getItem('trackInfo_' + $stateParams.trackId));
    $scope.trackLoading = false;
  } else {
    Music.getInfo($stateParams.trackId, function(response){
      $scope.trackLoading = false;
      $scope.track = response;
      window.localStorage.setItem('trackInfo_' + $stateParams.trackId, JSON.stringify(response));
    })
  }
})

.controller('AccountCtrl', function($scope) {
});
