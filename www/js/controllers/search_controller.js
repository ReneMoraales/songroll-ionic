angular.module('songroll')
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
});