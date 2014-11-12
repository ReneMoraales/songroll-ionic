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
})

.controller('AccountCtrl', function($scope) {
});
